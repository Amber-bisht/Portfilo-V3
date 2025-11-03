import React, { useEffect, useState } from 'react';
import { useSound } from '../contexts/SoundContext';
import { Volume2, VolumeX } from 'lucide-react';

const SoundToggle: React.FC = () => {
  const { soundEnabled, toggleSound } = useSound();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  return (
    <button
      onClick={toggleSound}
      className={`p-2 rounded-lg transition-colors duration-200 ${soundEnabled ? 'bg-gray-800 hover:bg-gray-700 text-gray-300' : 'bg-gray-100 hover:bg-gray-200 text-gray-700'}`}
      aria-label={soundEnabled ? 'Disable sound' : 'Enable sound'}
    >
      {soundEnabled ? (
        <Volume2 className="w-4 h-4" />
      ) : (
        <VolumeX className="w-4 h-4" />
      )}
    </button>
  );
};

export default SoundToggle;

