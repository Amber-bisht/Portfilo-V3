import React, { createContext, useContext, useEffect, useState } from 'react';

type SoundEnabled = boolean;

interface SoundContextType {
  soundEnabled: SoundEnabled;
  setSoundEnabled: (enabled: SoundEnabled) => void;
  toggleSound: () => void;
}

const SoundContext = createContext<SoundContextType | undefined>(undefined);

export const useSound = () => {
  const context = useContext(SoundContext);
  if (context === undefined) {
    throw new Error('useSound must be used within a SoundProvider');
  }
  return context;
};

interface SoundProviderProps {
  children: React.ReactNode;
}

export const SoundProvider: React.FC<SoundProviderProps> = ({ children }) => {
  const [soundEnabled, setSoundEnabled] = useState<SoundEnabled>(true);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    // Check for saved sound preference or default to true
    const savedSoundPreference = localStorage.getItem('soundEnabled');
    if (savedSoundPreference !== null) {
      setSoundEnabled(savedSoundPreference === 'true');
    }
  }, []);

  useEffect(() => {
    if (!mounted) return;

    localStorage.setItem('soundEnabled', soundEnabled.toString());
  }, [soundEnabled, mounted]);

  const toggleSound = () => {
    setSoundEnabled(!soundEnabled);
  };

  // Prevent hydration mismatch
  if (!mounted) {
    return null;
  }

  return (
    <SoundContext.Provider value={{ soundEnabled, setSoundEnabled, toggleSound }}>
      {children}
    </SoundContext.Provider>
  );
};

