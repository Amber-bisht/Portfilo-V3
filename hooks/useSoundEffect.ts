import { useSound } from '../contexts/SoundContext';
import { useRef } from 'react';

export const useSoundEffect = () => {
  const { soundEnabled } = useSound();
  const audioRefs = useRef<{ [key: string]: HTMLAudioElement }>({});

  const playSound = (soundPath: string, volume: number = 0.5) => {
    if (!soundEnabled) return;

    // Reuse existing audio element if available, otherwise create new one
    if (!audioRefs.current[soundPath]) {
      const audio = new Audio(soundPath);
      audio.volume = volume;
      audioRefs.current[soundPath] = audio;
    }

    const audio = audioRefs.current[soundPath];
    
    // Reset audio to start and play
    audio.currentTime = 0;
    audio.play().catch((error) => {
      // Handle autoplay restrictions gracefully
      console.warn('Could not play sound:', error);
    });
  };

  return { playSound };
};

