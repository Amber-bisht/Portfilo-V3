import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';

const Mascot = () => {
    const [isPlaying, setIsPlaying] = useState(false);
    const keysDown = useRef<Set<string>>(new Set());

    const audioRef = useRef<HTMLAudioElement | null>(null);

    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            // Ignore repetitive keydown events when holding a key
            if (e.repeat) return;

            keysDown.current.add(e.code);
            setIsPlaying(true);

            // If the special audio is currently playing, don't interrupt it
            if (audioRef.current && !audioRef.current.paused && audioRef.current.src.includes('makima.mp3')) {
                return;
            }

            let audioSrc = '';
            if (e.key >= '0' && e.key <= '9') {
                audioSrc = '/makima.mp3';
            } else {
                const randomSoundIndex = Math.floor(Math.random() * 10);
                audioSrc = `/sounds/keyboard${randomSoundIndex}.mp3`;
            }

            if (audioRef.current) {
                audioRef.current.pause();
            }

            audioRef.current = new Audio(audioSrc);
            audioRef.current.volume = 0.6;
            audioRef.current.play().catch(err => {
                // Autoplay policy might block audio before first user interaction
                console.warn("Audio playback prevented:", err);
            });
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

    // Ensure we don't render on the server to avoid hydration mismatch if needed
    const [isMounted, setIsMounted] = useState(false);
    useEffect(() => {
        setIsMounted(true);
    }, []);

    if (!isMounted) return null;

    return (
        <div className="fixed -bottom-2 -right-4 md:-bottom-4 md:-right-8 z-50 pointer-events-none">
            <div className="relative w-32 h-32 md:w-56 md:h-56 drop-shadow-xl animate-in fade-in slide-in-from-bottom-5 duration-700">
                <Image
                    src="/notplaying.png"
                    alt="Mascot Idle"
                    fill
                    priority
                    sizes="(max-width: 768px) 128px, 224px"
                    className={`object-contain object-bottom transition-opacity duration-150 ease-in-out ${isPlaying ? 'opacity-0' : 'opacity-100'}`}
                />
                <Image
                    src="/playing.png"
                    alt="Mascot Playing"
                    fill
                    priority
                    sizes="(max-width: 768px) 128px, 224px"
                    className={`object-contain object-bottom transition-opacity duration-150 ease-in-out ${isPlaying ? 'opacity-100' : 'opacity-0'}`}
                />
            </div>
        </div>
    );
};

export default Mascot;
