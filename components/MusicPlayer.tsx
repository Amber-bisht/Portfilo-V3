import React, { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { Play, Pause, SkipForward, SkipBack, Loader2 } from 'lucide-react';

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
    isGlobal?: boolean;
}

const MusicPlayer = ({ tracks, isGlobal = false }: MusicPlayerProps) => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isPlaying, setIsPlaying] = useState(false);
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

    useEffect(() => {
        if (isGlobal) console.log('Global MusicPlayer mounted');
        return () => {
            if (isGlobal) console.log('Global MusicPlayer unmounted');
        };
    }, [isGlobal]);

    // Initial load from localStorage
    useEffect(() => {
        if (typeof window !== 'undefined') {
            const savedIndex = localStorage.getItem('music-current-index');
            const savedPlaying = localStorage.getItem('music-is-playing') === 'true';
            
            if (savedIndex !== null) {
                const idx = parseInt(savedIndex);
                if (idx >= 0 && idx < tracks.length) {
                    setCurrentIndex(idx);
                }
            }
            // We don't auto-play on new tab due to browser policies, 
            // but we sync the UI state
            setIsPlaying(savedPlaying);
        }
    }, [tracks.length]);

    // Cross-tab synchronization
    useEffect(() => {
        const handleStorageChange = (e: StorageEvent) => {
            if (e.key === 'music-current-index' && e.newValue !== null) {
                setCurrentIndex(parseInt(e.newValue));
            }
            if (e.key === 'music-is-playing') {
                setIsPlaying(e.newValue === 'true');
            }
        };

        window.addEventListener('storage', handleStorageChange);
        return () => window.removeEventListener('storage', handleStorageChange);
    }, []);

    // Broadcast play state
    useEffect(() => {
        if (isGlobal && typeof window !== 'undefined') {
            localStorage.setItem('music-is-playing', isPlaying.toString());
        }
    }, [isPlaying, isGlobal]);

    // Intersection Observer to load YT when visible (only for global or if we want to load it early)
    useEffect(() => {
        if (!isGlobal && !shouldLoadYT) {
            observerRef.current = new IntersectionObserver((entries) => {
                if (entries[0].isIntersecting) {
                    setShouldLoadYT(true);
                    observerRef.current?.disconnect();
                }
            }, { threshold: 0.1 });

            if (containerRef.current) {
                observerRef.current.observe(containerRef.current);
            }
        } else if (isGlobal) {
            setShouldLoadYT(true);
        }

        return () => observerRef.current?.disconnect();
    }, [shouldLoadYT, isGlobal]);

    const currentTrack = tracks[currentIndex];

    // YT API Loading Logic (ONLY FOR GLOBAL)
    useEffect(() => {
        if (!isGlobal || !shouldLoadYT || !tracks || tracks.length === 0) return;

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
                        // Signal ready to UI components
                        window.dispatchEvent(new CustomEvent('music-status-update', { 
                            detail: { isPlayerReady: true } 
                        }));
                    },
                    onStateChange: (event: any) => {
                        setIsPlaying(event.data === 1);
                        setIsBuffering(event.data === 3);
                        if (event.data === 0) handleNext();
                    }
                }
            });
        };

        const loadYT = () => {
            if (!window.YT) {
                const tag = document.createElement('script');
                tag.src = 'https://www.youtube.com/iframe_api';
                const firstScriptTag = document.getElementsByTagName('script')[0];
                firstScriptTag.parentNode?.insertBefore(tag, firstScriptTag);
                window.onYouTubeIframeAPIReady = initializePlayer;
            } else if (window.YT && window.YT.Player) {
                initializePlayer();
            }
        };

        // Defer YouTube loading to improve LCP
        const timer = setTimeout(loadYT, 2000);
        return () => clearTimeout(timer);
    }, [shouldLoadYT, tracks, isGlobal]);

    // Handle track changes (ONLY FOR GLOBAL)
    const lastVideoId = useRef<string | null>(null);
    useEffect(() => {
        if (isGlobal && isPlayerReady && playerRef.current && playerRef.current.loadVideoById) {
            if (lastVideoId.current !== currentTrack.videoId) {
                const savedTime = localStorage.getItem('music-current-time');
                const savedIndex = localStorage.getItem('music-current-index');
                let startTime = currentTrack.startTime || 0;
                
                // If it's the same track index as saved, try to resume
                if (savedIndex !== null && parseInt(savedIndex) === currentIndex && savedTime) {
                    startTime = parseFloat(savedTime);
                }

                playerRef.current.loadVideoById({
                    videoId: currentTrack.videoId,
                    startSeconds: startTime
                });
                setIsPlaying(true);
                setProgress(0);
                setCurrentTime(startTime);
                lastVideoId.current = currentTrack.videoId;
            }
        }
    }, [currentIndex, isGlobal, isPlayerReady, currentTrack.videoId, currentTrack.startTime]);

    // Update progress bar and save state (ONLY FOR GLOBAL)
    useEffect(() => {
        let interval: NodeJS.Timeout;
        if (isGlobal && isPlaying && playerRef.current && playerRef.current.getCurrentTime) {
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
    }, [isPlaying, currentIndex, isGlobal]);

    // Initial Seek once ready (ONLY FOR GLOBAL)
    useEffect(() => {
        if (isGlobal && isPlayerReady && !hasRestoredPosition.current && playerRef.current && playerRef.current.seekTo) {
            const savedTime = localStorage.getItem('music-current-time');
                if (savedTime) {
                    const time = parseFloat(savedTime);
                    playerRef.current.seekTo(time, true);
                }
                hasRestoredPosition.current = true;
            }
        }, [isPlayerReady, isGlobal]);

    const togglePlay = () => {
        if (isGlobal) {
            if (!isPlayerReady || !playerRef.current) return;
            if (isPlaying) playerRef.current.pauseVideo();
            else playerRef.current.playVideo();
        } else {
            const action = isPlaying ? 'pause' : 'play';
            window.dispatchEvent(new CustomEvent('music-command', { detail: { action } }));
        }
    };

    const handleNext = () => {
        if (isGlobal) {
            setCurrentIndex((prev) => (prev + 1) % tracks.length);
        } else {
            window.dispatchEvent(new CustomEvent('music-command', { detail: { action: 'next' } }));
        }
    };

    const handlePrev = () => {
        if (isGlobal) {
            setCurrentIndex((prev) => (prev - 1 + tracks.length) % tracks.length);
        } else {
            window.dispatchEvent(new CustomEvent('music-command', { detail: { action: 'prev' } }));
        }
    };

    const handleProgressClick = (e: React.MouseEvent<HTMLDivElement>) => {
        if (isGlobal) {
            if (!isPlayerReady || !playerRef.current || !containerRef.current) return;
            const rect = e.currentTarget.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const clickedProgress = x / rect.width;
            const newTime = clickedProgress * duration;
            playerRef.current.seekTo(newTime, true);
            setCurrentTime(newTime);
            setProgress(clickedProgress * 100);
        } else {
            // UI only - send seek command if we had one, but let's keep it simple for now
        }
    };

    const formatTime = (time: number) => {
        if (!time) return "0:00";
        const minutes = Math.floor(time / 60);
        const seconds = Math.floor(time % 60);
        return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
    };

    // Listen for commands (GLOBAL) or status updates (UI)
    useEffect(() => {
        if (isGlobal) {
            const handleCommand = (e: any) => {
                const { action } = e.detail;
                if (!isPlayerReady || !playerRef.current) return;
                switch (action) {
                    case 'play': playerRef.current.playVideo(); break;
                    case 'pause': playerRef.current.pauseVideo(); break;
                    case 'next': handleNext(); break;
                    case 'prev': handlePrev(); break;
                }
            };
            window.addEventListener('music-command', handleCommand);
            return () => window.removeEventListener('music-command', handleCommand);
        } else {
            const handleStatus = (e: any) => {
                const { title, artist, isPlaying, progress, currentTime, duration, trackIndex, isPlayerReady, isBuffering } = e.detail;
                if (isPlaying !== undefined) setIsPlaying(isPlaying);
                if (progress !== undefined) setProgress(progress);
                if (currentTime !== undefined) setCurrentTime(currentTime);
                if (duration !== undefined) setDuration(duration);
                if (trackIndex !== undefined) setCurrentIndex(trackIndex - 1);
                if (isPlayerReady !== undefined) setIsPlayerReady(isPlayerReady);
                if (isBuffering !== undefined) setIsBuffering(isBuffering);
            };
            window.addEventListener('music-status-update', handleStatus);
            return () => window.removeEventListener('music-status-update', handleStatus);
        }
    }, [isGlobal, isPlayerReady, currentIndex]);

    // Broadcast status (GLOBAL)
    useEffect(() => {
        if (isGlobal && typeof window !== 'undefined') {
            window.dispatchEvent(new CustomEvent('music-status-update', { 
                detail: { 
                    title: currentTrack.title, 
                    artist: currentTrack.artist,
                    isPlaying,
                    progress,
                    currentTime,
                    duration,
                    trackIndex: currentIndex + 1,
                    totalTracks: tracks.length,
                    isPlayerReady,
                    isBuffering
                } 
            }));
        }
    }, [isGlobal, currentIndex, isPlaying, progress, currentTime, duration, currentTrack, tracks.length, isPlayerReady, isBuffering]);

    // If global, only render the hidden player on client
    const [mounted, setMounted] = useState(false);
    useEffect(() => {
        setMounted(true);
    }, []);

    if (isGlobal) {
        if (!mounted) return null;
        return (
            <div className="hidden h-0 w-0 overflow-hidden pointer-events-none" aria-hidden="true">
                <div id="youtube-player-shared"></div>
            </div>
        );
    }

    const thumbnailUrl = `https://img.youtube.com/vi/${currentTrack.videoId}/maxresdefault.jpg`;

    return (
        <div ref={containerRef} className="flex h-full w-full bg-neutral-900/40 backdrop-blur-xl overflow-hidden relative group border border-white/5 transition-all duration-500 hover:border-red-500/20">
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
