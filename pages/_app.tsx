import type { AppProps } from 'next/app'
import { ThemeProvider } from '../contexts/ThemeContext'
import { SoundProvider } from '../contexts/SoundContext'
import { useEffect } from 'react'
import { useSound } from '../contexts/SoundContext'
import '../styles/globals.css'

function SoundEffects({ children }: { children: React.ReactNode }) {
  const { soundEnabled } = useSound();

  useEffect(() => {
    if (!soundEnabled) return;

    let selectionTimeout: ReturnType<typeof setTimeout>;
    let lastSelection = '';

    const playVillagerSound = () => {
      const audio = new Audio('/minecraft-villager-289282.mp3');
      audio.volume = 0.5;
      audio.play().catch(() => {
        // Handle autoplay restrictions gracefully
      });
    };

    // Handle text selection with debounce
    const handleSelection = () => {
      clearTimeout(selectionTimeout);
      selectionTimeout = setTimeout(() => {
        const selection = window.getSelection();
        if (selection && selection.toString().length > 0) {
          const selectedText = selection.toString();
          // Only play if selection changed
          if (selectedText !== lastSelection) {
            lastSelection = selectedText;
            playVillagerSound();
          }
        } else {
          lastSelection = '';
        }
      }, 100);
    };

    // Handle copy event
    const handleCopy = () => {
      playVillagerSound();
    };

    // Add event listeners
    document.addEventListener('mouseup', handleSelection);
    document.addEventListener('copy', handleCopy);

    // Cleanup
    return () => {
      clearTimeout(selectionTimeout);
      document.removeEventListener('mouseup', handleSelection);
      document.removeEventListener('copy', handleCopy);
    };
  }, [soundEnabled]);

  return <>{children}</>;
}

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider>
      <SoundProvider>
        <SoundEffects>
          <Component {...pageProps} />
        </SoundEffects>
      </SoundProvider>
    </ThemeProvider>
  )
}
