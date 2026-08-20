import React, { useState, useEffect, useRef } from 'react';
import { Play, Pause, RotateCcw, Volume2, SkipForward } from 'lucide-react';

interface BlogAudioPlayerProps {
  audioSrc?: string | string[];
  trackLabels?: string[];
  initialDuration?: number;
}

export default function BlogAudioPlayer({ 
  audioSrc, 
  trackLabels = ['Part 1', 'Part 2'],
  initialDuration
}: BlogAudioPlayerProps) {
  const sources = Array.isArray(audioSrc) ? audioSrc : audioSrc ? [audioSrc] : [];
  
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [playbackSpeed, setPlaybackSpeed] = useState<number>(1);
  const [durations, setDurations] = useState<number[]>(sources.map(() => 0));
  const [trackCurrentTimes, setTrackCurrentTimes] = useState<number[]>(sources.map(() => 0));
  const [totalDuration, setTotalDuration] = useState<number>(initialDuration || 0);
  const [globalCurrentTime, setGlobalCurrentTime] = useState<number>(0);
  const [isBuffering, setIsBuffering] = useState(false);

  const audioRef = useRef<HTMLAudioElement | null>(null);

  // Preload metadata to calculate exact duration across all tracks
  useEffect(() => {
    if (sources.length === 0) return;

    const trackDurs = [...durations];
    let loadedCount = 0;

    sources.forEach((src, idx) => {
      const tempAudio = new Audio();
      tempAudio.preload = 'metadata';
      tempAudio.src = src;
      tempAudio.onloadedmetadata = () => {
        trackDurs[idx] = tempAudio.duration;
        loadedCount++;
        if (loadedCount === sources.length) {
          setDurations([...trackDurs]);
          const sum = trackDurs.reduce((acc, d) => acc + d, 0);
          setTotalDuration(sum);
        }
      };
    });
  }, [sources.join(',')]);

  // Handle track changing and audio setup
  useEffect(() => {
    if (sources.length === 0) return;

    if (!audioRef.current) {
      audioRef.current = new Audio();
    }

    const audio = audioRef.current;
    audio.src = sources[currentTrackIndex];
    audio.playbackRate = playbackSpeed;
    audio.preload = 'metadata';

    const handleTimeUpdate = () => {
      if (!audio) return;
      const curTime = audio.currentTime;
      setTrackCurrentTimes((prev) => {
        const next = [...prev];
        next[currentTrackIndex] = curTime;
        return next;
      });

      // Calculate global time
      let precedingTime = 0;
      for (let i = 0; i < currentTrackIndex; i++) {
        precedingTime += durations[i] || 0;
      }
      setGlobalCurrentTime(precedingTime + curTime);
    };

    const handleEnded = () => {
      if (currentTrackIndex < sources.length - 1) {
        // Auto advance to next track
        setCurrentTrackIndex((prev) => prev + 1);
      } else {
        // Reached end of all tracks
        setIsPlaying(false);
        setGlobalCurrentTime(0);
        setCurrentTrackIndex(0);
        audio.currentTime = 0;
      }
    };

    const handleWaiting = () => setIsBuffering(true);
    const handlePlaying = () => setIsBuffering(false);

    audio.addEventListener('timeupdate', handleTimeUpdate);
    audio.addEventListener('ended', handleEnded);
    audio.addEventListener('waiting', handleWaiting);
    audio.addEventListener('playing', handlePlaying);

    if (isPlaying) {
      audio.play().catch(() => setIsPlaying(false));
    }

    return () => {
      audio.removeEventListener('timeupdate', handleTimeUpdate);
      audio.removeEventListener('ended', handleEnded);
      audio.removeEventListener('waiting', handleWaiting);
      audio.removeEventListener('playing', handlePlaying);
    };
  }, [currentTrackIndex, sources.join(',')]);

  // Clean up on component unmount
  useEffect(() => {
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.src = '';
      }
    };
  }, []);

  const togglePlay = () => {
    if (!audioRef.current) return;

    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current.play().then(() => {
        setIsPlaying(true);
      }).catch((err) => {
        console.warn('Audio playback error:', err);
      });
    }
  };

  const changeSpeed = () => {
    const speeds = [1, 1.25, 1.5, 2];
    const currentIndex = speeds.indexOf(playbackSpeed);
    const nextSpeed = speeds[(currentIndex + 1) % speeds.length];
    setPlaybackSpeed(nextSpeed);
    if (audioRef.current) {
      audioRef.current.playbackRate = nextSpeed;
    }
  };

  const formatTime = (seconds: number): string => {
    if (isNaN(seconds) || seconds < 0) return '0:00';
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  const handleSeek = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!totalDuration || sources.length === 0) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const pct = Math.max(0, Math.min(1, clickX / rect.width));
    const targetGlobalTime = pct * totalDuration;

    // Find which track this target time falls into
    let accumulated = 0;
    for (let i = 0; i < sources.length; i++) {
      const trackDur = durations[i] || (totalDuration / sources.length);
      if (targetGlobalTime <= accumulated + trackDur || i === sources.length - 1) {
        const trackOffset = Math.max(0, targetGlobalTime - accumulated);
        if (currentTrackIndex === i) {
          if (audioRef.current) {
            audioRef.current.currentTime = trackOffset;
          }
        } else {
          setCurrentTrackIndex(i);
          // Audio will play from trackOffset once loaded
          setTimeout(() => {
            if (audioRef.current) {
              audioRef.current.currentTime = trackOffset;
              if (isPlaying) audioRef.current.play().catch(() => {});
            }
          }, 100);
        }
        setGlobalCurrentTime(targetGlobalTime);
        break;
      }
      accumulated += trackDur;
    }
  };

  const progressPct = totalDuration > 0 ? (globalCurrentTime / totalDuration) * 100 : 0;

  if (sources.length === 0) return null;

  return (
    <div className="inline-flex items-center gap-3 md:gap-4 px-4 py-2 rounded-full bg-zinc-900/90 border border-zinc-800 text-xs font-sans text-zinc-300 shadow-xl select-none">
      {/* Play/Pause Button */}
      <button 
        onClick={togglePlay}
        className="w-7 h-7 rounded-full bg-white text-black flex items-center justify-center hover:bg-zinc-200 transition-colors cursor-pointer shrink-0"
        aria-label={isPlaying ? "Pause audio" : "Play audio"}
        title={isPlaying ? "Pause audio" : "Play audio recording"}
      >
        {isPlaying ? <Pause size={13} /> : <Play size={13} className="ml-0.5" />}
      </button>

      {/* Multi-track indicator if more than 1 part */}
      {sources.length > 1 && (
        <div className="flex items-center gap-1 font-mono text-[10px] bg-zinc-800/80 px-2 py-0.5 rounded text-zinc-300">
          <span className="text-white font-semibold">{trackLabels[currentTrackIndex] || `Part ${currentTrackIndex + 1}`}</span>
          <span className="text-zinc-500">/</span>
          <span className="text-zinc-400">{sources.length}</span>
        </div>
      )}

      {/* Time Display */}
      <span className="font-mono text-[11px] text-zinc-400 shrink-0">
        {formatTime(globalCurrentTime)} / {formatTime(totalDuration)}
      </span>

      {/* Interactive Progress Scrubber */}
      <div 
        onClick={handleSeek}
        className="w-24 md:w-36 h-1.5 bg-zinc-800 rounded-full overflow-hidden cursor-pointer relative group"
        title="Seek playback"
      >
        <div 
          className="h-full bg-white rounded-full transition-all duration-150 group-hover:bg-zinc-200" 
          style={{ width: `${progressPct}%` }}
        />
      </div>

      {/* Speed Selector */}
      <button 
        onClick={changeSpeed}
        className="px-2 py-0.5 text-[11px] font-mono rounded bg-zinc-800 hover:bg-zinc-700 text-zinc-300 hover:text-white transition-colors cursor-pointer"
        title="Change playback speed"
      >
        {playbackSpeed}x
      </button>
    </div>
  );
}
