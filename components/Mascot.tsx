import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';

const Mascot = () => {
    const [isPlaying, setIsPlaying] = useState(false);
    const [isSpecialAudioPlaying, setIsSpecialAudioPlaying] = useState(false);
    const keysDown = useRef<Set<string>>(new Set());

    const audioRef = useRef<HTMLAudioElement | null>(null);

    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.repeat) return;

            keysDown.current.add(e.code);
            setIsPlaying(true);

            // Special handling for number keys
            if (e.key >= '0' && e.key <= '9') {
                // If already playing makima.mp3, don't interrupt it.
                // But do trigger the visual states if we just started typing again.
                if (audioRef.current && !audioRef.current.paused && audioRef.current.src.includes('makima.mp3')) {
                    return;
                }

                if (audioRef.current) {
                    audioRef.current.pause();
                }

                setIsSpecialAudioPlaying(true);
                audioRef.current = new Audio('/makima.mp3');
                audioRef.current.volume = 0.6;
                audioRef.current.play().catch(err => {
                    console.warn("Audio playback prevented:", err);
                    setIsSpecialAudioPlaying(false);
                });

                audioRef.current.onended = () => {
                    setIsSpecialAudioPlaying(false);
                };
            } else {
                // For non-number keys:
                // Don't interrupt if makima audio is playing
                if (audioRef.current && !audioRef.current.paused && audioRef.current.src.includes('makima.mp3')) {
                    return;
                }

                // Play normal keyboard sound
                if (audioRef.current) {
                    // We don't want strict lock of previous normal keystrokes if typing fast, 
                    // so we restart or let it overlap. 
                    // Re-using same audio element but changing src might cause clipping if fast typing.
                    // The requirement says: "the key locks first play first then play next fix it"
                    // This could mean we want polyphony (multiple overlapping sounds) or we want strict sequencing.
                    // A simple way to get 'overlapping' keyboard clacks is to use a new Audio object for fast typing:
                }

                const randomSoundIndex = Math.floor(Math.random() * 10);
                const currentClack = new Audio(`/sounds/keyboard${randomSoundIndex}.mp3`);
                currentClack.volume = 0.6;
                currentClack.play().catch(console.warn);

                // We don't set it to audioRef because we don't want to track/pause these tight clacks
                // But wait, the previous code *did* set it. If the requirement is actually "don't cut off previous keystroke", using fresh Audio objects works best.
            }
        };

        const handleKeyUp = (e: KeyboardEvent) => {
            keysDown.current.delete(e.code);
            if (keysDown.current.size === 0) {
                setIsPlaying(false);
            }
        };

        const handleBlur = () => {
            keysDown.current.clear();
            setIsPlaying(false);
        };

        window.addEventListener('keydown', handleKeyDown);
        window.addEventListener('keyup', handleKeyUp);
        window.addEventListener('blur', handleBlur);

        return () => {
            window.removeEventListener('keydown', handleKeyDown);
            window.removeEventListener('keyup', handleKeyUp);
            window.removeEventListener('blur', handleBlur);
        };
    }, []);

    const [isMounted, setIsMounted] = useState(false);
    useEffect(() => {
        setIsMounted(true);
    }, []);

    if (!isMounted) return null;

    // Determine which image to show based on state priorities
    const showSpecialImage = isSpecialAudioPlaying;
    const showPlayingImage = isPlaying && !showSpecialImage;
    const showIdleImage = !isPlaying && !showSpecialImage;

    return (
        <div className="fixed -bottom-2 -right-4 md:-bottom-4 md:-right-8 z-50 pointer-events-none">
            <div className="relative w-32 h-32 md:w-56 md:h-56 drop-shadow-xl animate-in fade-in slide-in-from-bottom-5 duration-700 pointer-events-auto group">

                {/* Tooltip */}
                <div className="absolute bottom-[80%] right-4 md:right-16 mb-2 bg-black/80 backdrop-blur-sm text-white text-xs md:text-sm px-4 py-2 rounded-xl opacity-0 group-hover:opacity-100 transition-all duration-300 pointer-events-none w-max max-w-[150px] md:max-w-[250px] shadow-lg border border-gray-800 text-left">
                    This is Makima, Amber&apos;s Assistant. <br /> Press keys to interact with me!
                </div>

                <Image
                    src="/notplaying.webp"
                    alt="Mascot Idle"
                    fill
                    priority
                    sizes="(max-width: 768px) 128px, 224px"
                    className={`object-contain object-bottom transition-opacity duration-150 ease-in-out ${showIdleImage ? 'opacity-100 z-10' : 'opacity-0 z-0'}`}
                />
                <Image
                    src="/playing.webp"
                    alt="Mascot Playing"
                    fill
                    sizes="(max-width: 768px) 128px, 224px"
                    className={`object-contain object-bottom transition-opacity duration-150 ease-in-out ${showPlayingImage ? 'opacity-100 z-10' : 'opacity-0 z-0'}`}
                />
                <Image
                    src="/sayingownname.webp"
                    alt="Mascot Special"
                    fill
                    sizes="(max-width: 768px) 128px, 224px"
                    className={`object-contain object-bottom transition-opacity duration-150 ease-in-out ${showSpecialImage ? 'opacity-100 z-10' : 'opacity-0 z-0'}`}
                />
            </div>
        </div>
    );
};

export default Mascot;
