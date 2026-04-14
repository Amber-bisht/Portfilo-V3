import React, { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { Play, Pause, SkipForward, SkipBack, Volume2, Music, Loader2 } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

declare global {
  interface Window {
    onYouTubeIframeAPIReady: () => void;
    YT: any;
  }
}

export interface Track {
    videoId: string;
    title: string;
    artist: string;
    startTime?: number;
}

interface MusicPlayerProps {
    tracks: Track[];
}

const MusicPlayer = ({ tracks }: MusicPlayerProps) => {
    const { isCinematicMode } = useTheme();
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isPlaying, setIsPlaying] = useState(false);
    const isFirstMount = useRef(true);
    const hasRestoredPosition = useRef(false);
    const [progress, setProgress] = useState(0);
    const [duration, setDuration] = useState(0);
    const [currentTime, setCurrentTime] = useState(0);
    const [isPlayerReady, setIsPlayerReady] = useState(false);
    const [isBuffering, setIsBuffering] = useState(false);
    const [shouldLoadYT, setShouldLoadYT] = useState(false);
    
    const playerRef = useRef<any>(null);
    const containerRef = useRef<HTMLDivElement>(null);
    const observerRef = useRef<IntersectionObserver | null>(null);

    // Initial load from localStorage
    useEffect(() => {
        if (typeof window !== 'undefined') {
            const savedIndex = localStorage.getItem('music-current-index');
            if (savedIndex !== null) {
                const idx = parseInt(savedIndex);
                if (idx >= 0 && idx < tracks.length) {
                    setCurrentIndex(idx);
                }
            }
        }
    }, [tracks.length]);

    // Intersection Observer to load YT when visible
    useEffect(() => {
        if (shouldLoadYT) return;

        observerRef.current = new IntersectionObserver((entries) => {
            if (entries[0].isIntersecting) {
                setShouldLoadYT(true);
                observerRef.current?.disconnect();
            }
        }, { threshold: 0.1 });

        if (containerRef.current) {
            observerRef.current.observe(containerRef.current);
        }

        return () => observerRef.current?.disconnect();
    }, [shouldLoadYT]);

    const currentTrack = tracks[currentIndex];

    // YT API Loading Logic
    useEffect(() => {
        if (!shouldLoadYT || !tracks || tracks.length === 0) return;

        const initializePlayer = () => {
            if (playerRef.current && playerRef.current.loadVideoById) {
                playerRef.current.loadVideoById({
                    videoId: currentTrack.videoId,
                    startSeconds: currentTrack.startTime || 0
                });
                if (!isPlaying) playerRef.current.pauseVideo();
                return;
            }

            playerRef.current = new window.YT.Player(`youtube-player-shared`, {
                host: 'https://www.youtube-nocookie.com',
                videoId: currentTrack.videoId,
                playerVars: {
                    autoplay: 0,
                    controls: 0,
                    disablekb: 1,
                    fs: 0,
                    iv_load_policy: 3,
                    modestbranding: 1,
                    rel: 0,
                    showinfo: 0,
                    start: currentTrack.startTime || 0,
                    enablejsapi: 1,
                    origin: typeof window !== 'undefined' ? window.location.origin : ''
                },
                events: {
                    onReady: (event: any) => {
                        const iframe = event.target.getIframe();
                        if (iframe) {
                            iframe.setAttribute('allow', 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share; compute-pressure');
                            iframe.setAttribute('title', 'YouTube Music Player');
                        }
                        setDuration(event.target.getDuration());
                        setIsPlayerReady(true);
                    },
                    onStateChange: (event: any) => {
                        setIsPlaying(event.data === 1);
                        setIsBuffering(event.data === 3);
                        if (event.data === 0) handleNext();
                    }
                }
            });
        };

        if (!window.YT) {
            const tag = document.createElement('script');
            tag.src = 'https://www.youtube.com/iframe_api';
            const firstScriptTag = document.getElementsByTagName('script')[0];
            firstScriptTag.parentNode?.insertBefore(tag, firstScriptTag);

            window.onYouTubeIframeAPIReady = initializePlayer;
        } else if (window.YT && window.YT.Player) {
            initializePlayer();
        }
    }, [shouldLoadYT, tracks]);

    // Handle track changes
    useEffect(() => {
        if (isPlayerReady && playerRef.current && playerRef.current.loadVideoById) {
            playerRef.current.loadVideoById({
                videoId: currentTrack.videoId,
                startSeconds: currentTrack.startTime || 0
            });
            setIsPlaying(true);
            setProgress(0);
            setCurrentTime(0);
        }
    }, [currentIndex]);

    // Update progress bar and save state
    useEffect(() => {
        let interval: NodeJS.Timeout;
        if (isPlaying && playerRef.current && playerRef.current.getCurrentTime) {
            interval = setInterval(() => {
                const current = playerRef.current.getCurrentTime();
                const total = playerRef.current.getDuration();
                if (total > 0) {
                    setDuration(total);
                    setCurrentTime(current);
                    setProgress((current / total) * 100);
                    
                    // Persist state
                    localStorage.setItem('music-current-index', currentIndex.toString());
                    localStorage.setItem('music-current-time', current.toString());
                }
            }, 1000);
        }
        return () => clearInterval(interval);
    }, [isPlaying, currentIndex]);

    // Initial Seek once ready
    useEffect(() => {
        if (isPlayerReady && !hasRestoredPosition.current && playerRef.current && playerRef.current.seekTo) {
            const savedTime = localStorage.getItem('music-current-time');
            if (savedTime) {
                const time = parseFloat(savedTime);
                playerRef.current.seekTo(time, true);
                if (isCinematicMode) {
                    playerRef.current.playVideo();
                }
            }
            hasRestoredPosition.current = true;
        }
    }, [isPlayerReady, isCinematicMode]);

    const togglePlay = () => {
        if (!isPlayerReady || !playerRef.current) return;
        
        if (isPlaying) {
            playerRef.current.pauseVideo();
        } else {
            playerRef.current.playVideo();
        }
    };

    const handleNext = () => {
        setCurrentIndex((prev) => (prev + 1) % tracks.length);
    };

    const handlePrev = () => {
        setCurrentIndex((prev) => (prev - 1 + tracks.length) % tracks.length);
    };

    const handleProgressClick = (e: React.MouseEvent<HTMLDivElement>) => {
        if (!isPlayerReady || !playerRef.current || !containerRef.current) return;
        
        const rect = e.currentTarget.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const clickedProgress = x / rect.width;
        const newTime = clickedProgress * duration;
        
        playerRef.current.seekTo(newTime, true);
        setCurrentTime(newTime);
        setProgress(clickedProgress * 100);
    };

    const formatTime = (time: number) => {
        if (!time) return "0:00";
        const minutes = Math.floor(time / 60);
        const seconds = Math.floor(time % 60);
        return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
    };

    // Sync with Cinematic Mode transitions - SEAMLESS
    useEffect(() => {
        if (isFirstMount.current) {
            isFirstMount.current = false;
            return;
        }

        if (isPlayerReady && playerRef.current) {
            try {
                if (isCinematicMode) {
                    playerRef.current.unMute();
                    playerRef.current.playVideo();
                } else {
                    playerRef.current.pauseVideo();
                }
            } catch (err) {
                // Silently handle if player state is not ready for playback commands
            }
        }
    }, [isCinematicMode, isPlayerReady]);

    // Global Command Listener for Mascot interaction
    useEffect(() => {
        const handleCommand = (e: any) => {
            const { action } = e.detail;
            if (!isPlayerReady || !playerRef.current) return;

            switch (action) {
                case 'play':
                    playerRef.current.playVideo();
                    break;
                case 'pause':
                    playerRef.current.pauseVideo();
                    break;
                case 'next':
                    handleNext();
                    break;
                case 'prev':
                    handlePrev();
                    break;
            }
        };

        window.addEventListener('music-command', handleCommand);
        return () => window.removeEventListener('music-command', handleCommand);
    }, [isPlayerReady, currentIndex]); // currentIndex needed because handleNext/Prev use closure

    // Broadcast status for Mascot awareness
    useEffect(() => {
        if (typeof window !== 'undefined') {
            window.dispatchEvent(new CustomEvent('music-status-update', { 
                detail: { 
                    title: currentTrack.title, 
                    artist: currentTrack.artist,
                    isPlaying,
                    trackIndex: currentIndex + 1,
                    totalTracks: tracks.length
                } 
            }));
        }
    }, [currentIndex, isPlaying, currentTrack, tracks.length]);

    const thumbnailUrl = `https://img.youtube.com/vi/${currentTrack.videoId}/maxresdefault.jpg`;

    return (
        <div className="flex h-full w-full bg-neutral-900/40 backdrop-blur-xl overflow-hidden relative group border border-white/5 transition-all duration-500 hover:border-red-500/20">
            {/* Hidden Player */}
            <div id="youtube-player-shared" className="hidden opacity-0 pointer-events-none absolute h-0 w-0"></div>

            {/* Gradient Background Overlay */}
            <div className="absolute inset-0 z-0 bg-gradient-to-br from-red-500/5 via-transparent to-black/40 pointer-events-none" />

            <div className="relative z-10 flex w-full h-full p-4 gap-4 items-center">
                {/* Album Art */}
                <div className={`relative h-24 w-24 md:h-28 md:w-28 flex-shrink-0 rounded-full overflow-hidden shadow-2xl transition-all duration-1000 border-2 border-white/5 ${isPlaying ? 'animate-spin-slow ring-4 ring-red-500/10' : 'scale-[0.95]'}`}>
                    <Image 
                        src={thumbnailUrl} 
                        alt={currentTrack.title} 
                        fill 
                        sizes="(max-width: 768px) 100px, 120px"
                        className="object-cover"
                        onError={(e: any) => {
                            e.target.src = `https://img.youtube.com/vi/${currentTrack.videoId}/0.jpg`;
                        }}
                    />
                    {/* Vinyl Center Hole Decor */}
                    <div className="absolute inset-0 flex items-center justify-center">
                         <div className="w-6 h-6 bg-neutral-900 rounded-full border-2 border-white/10 shadow-inner" />
                    </div>
                </div>

                {/* Controls Area */}
                <div className="flex flex-col flex-1 min-w-0 justify-center gap-2 pr-4">
                    <div className="flex items-center gap-2 overflow-hidden whitespace-nowrap">
                        <h3 className="text-white font-cinzel font-bold text-base md:text-lg truncate tracking-wider uppercase">{currentTrack.title}</h3>
                        <span className="text-white/20">—</span>
                        <p className="text-gray-200 text-xs md:text-sm font-medium truncate italic">{currentTrack.artist}</p>
                    </div>

                    {/* Progress Bar */}
                    <div className="flex flex-col gap-1.5 w-full max-w-md">
                        <div 
                            ref={containerRef}
                            className="h-1.5 w-full bg-white/10 rounded-full cursor-pointer relative overflow-hidden group/bar transition-all"
                            onClick={handleProgressClick}
                        >
                            <div 
                                className="absolute top-0 left-0 h-full bg-gradient-to-r from-red-700 to-red-500 transition-all duration-300 shadow-[0_0_10px_rgba(220,38,38,0.5)]" 
                                style={{ width: `${progress}%` }} 
                            />
                            <div className="absolute top-0 left-0 h-full w-1 bg-white opacity-0 group-hover/bar:opacity-100 transition-opacity" />
                        </div>
                        <div className="flex justify-between text-[10px] md:text-xs font-mono text-gray-300 uppercase tracking-tighter">
                            <span className={isPlaying ? 'text-red-300' : ''}>{formatTime(currentTime)}</span>
                            <span>{formatTime(duration)}</span>
                        </div>
                    </div>

                    {/* Buttons */}
                    <div className="flex items-center justify-center gap-4 w-full">
                        <button 
                            onClick={handlePrev}
                            className="p-3 text-gray-200 hover:text-white hover:bg-white/10 rounded-xl transition-all active:scale-90"
                            aria-label="Previous track"
                        >
                            <SkipBack size={20} fill={currentIndex > 0 ? "currentColor" : "none"} aria-hidden="true" />
                        </button>
                        
                        <button 
                            onClick={togglePlay}
                            className="relative group/play px-8 py-3 bg-white/10 border border-white/20 rounded-2xl text-white transition-all active:scale-95 flex items-center justify-center min-w-[100px] hover:bg-white/20 hover:border-red-500/50 hover:shadow-[0_0_20px_rgba(239,68,68,0.1)]"
                            aria-label={isPlaying ? "Pause music" : "Play music"}
                        >
                            <div className="absolute inset-0 bg-red-600/20 blur-xl opacity-0 group-hover/play:opacity-100 transition-opacity pointer-events-none" />
                            {isBuffering ? (
                                <Loader2 size={18} className="animate-spin" />
                            ) : (
                                isPlaying ? (
                                    <div className="flex items-center gap-2">
                                        <Pause size={18} fill="currentColor" aria-hidden="true" />
                                        <span className="text-[10px] font-bold uppercase tracking-[0.2em]">Pause</span>
                                    </div>
                                ) : (
                                    <div className="flex items-center gap-2">
                                        <Play size={18} fill="currentColor" className="ml-0.5" aria-hidden="true" />
                                        <span className="text-[10px] font-bold uppercase tracking-[0.2em]">Play</span>
                                    </div>
                                )
                            )}
                        </button>

                        <button 
                            onClick={handleNext}
                            className="p-3 text-gray-400 hover:text-white hover:bg-white/5 rounded-xl transition-all active:scale-90"
                            aria-label="Next track"
                        >
                            <SkipForward size={20} fill={currentIndex < tracks.length - 1 ? "currentColor" : "none"} aria-hidden="true" />
                        </button>
                    </div>
                </div>
            </div>

        </div>
    );

};

export default MusicPlayer;
