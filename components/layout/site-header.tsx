import React from 'react';
import { useTheme } from '../../contexts/ThemeContext';
import { useEffect, useState } from 'react';
import { Menu, X, Sun, Moon, Monitor } from 'lucide-react';
import SoundToggle from '../SoundToggle';
import { useSoundEffect } from '../../hooks/useSoundEffect';

interface SiteHeaderProps {
  name?: string;
  tagline?: string;
}

const SiteHeader: React.FC<SiteHeaderProps> = ({ name = "John Developer", tagline = "Full-Stack Developer & UI/UX Enthusiast" }) => {
  const { theme, setTheme, toggleTheme } = useTheme();
  const { playSound } = useSoundEffect();
  const [mounted, setMounted] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const isDark = theme === 'dark';

  const getThemeIcon = () => {
    return theme === 'light' ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />;
  };

  const navItems = [
    { href: '#projects', label: 'Projects' },
    { href: '#tech-stack', label: 'Tech Stack' },
    { href: '#experience', label: 'Experience' },
    { href: '#contact', label: 'Contact' },
  ];

  if (!mounted) {
    return null;
  }

  return (
    <header className={`sticky top-0 z-50 w-full border-b ${isDark ? 'bg-gray-900/80 backdrop-blur-sm border-gray-700/50' : 'bg-white/80 backdrop-blur-sm border-gray-200/50'}`}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <div className="flex items-center">
            <div>
              <h1 className={`text-xl sm:text-2xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                {name}
              </h1>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className={`text-sm font-medium transition-colors hover:text-green-500 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}
              >
                {item.label}
              </a>
            ))}
          </nav>

          {/* Theme Toggle & Mobile Menu */}
          <div className="flex items-center space-x-4">
            {/* Sound Toggle */}
            <SoundToggle />
            
            {/* Enhanced Pixelated Theme Toggle */}
            <button
              onClick={() => {
                playSound('/minecraft-cave-sound-332982.mp3', 0.5);
                toggleTheme();
              }}
              className="relative w-16 h-8 border-4 border-black transition-all duration-300 hover:scale-105 active:scale-95 shadow-lg"
              style={{ borderRadius: '6px' }}
              aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
            >
              {/* Toggle Background */}
              <div className={`absolute inset-0 ${isDark ? 'bg-slate-700' : 'bg-green-500'}`} 
                   style={{ borderRadius: '2px' }}>
              </div>
              
              {/* Active State Indicator - Nested White Squares */}
              <div className={`absolute top-1/2 -translate-y-1/2 w-6 h-6 transition-all duration-300 ${isDark ? 'left-1' : 'right-1'}`}>
                {/* Outer White Square */}
                <div className="absolute inset-0 bg-white border-2 border-black"
                     style={{ borderRadius: '2px' }}>
                  {/* Inner White Square */}
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3 h-3 bg-white border border-black"
                       style={{ borderRadius: '1px' }}>
                  </div>
                </div>
              </div>
              
              {/* Visual Feedback Overlay */}
              <div className={`absolute inset-0 transition-opacity duration-200 ${isDark ? 'bg-blue-900/20' : 'bg-green-900/20'} opacity-0 hover:opacity-100`}
                   style={{ borderRadius: '2px' }}>
              </div>
            </button>

            {/* Mobile Menu Button */}
            <button
              onClick={() => {
                playSound('/stone-effect-254998.mp3', 0.5);
                setIsMenuOpen(!isMenuOpen);
              }}
              className={`md:hidden p-2 rounded-lg transition-colors ${isDark ? 'bg-gray-800 hover:bg-gray-700 text-gray-300' : 'bg-gray-100 hover:bg-gray-200 text-gray-700'}`}
              aria-label="Toggle menu"
            >
              {isMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

      </div>

      {/* Mobile Navigation Sidebar */}
      <div className={`fixed inset-0 z-[9999] md:hidden ${isMenuOpen ? 'block' : 'hidden'}`}>
        {/* Background Overlay */}
        <div 
          className="fixed inset-0 bg-black/80 backdrop-blur-sm transition-opacity"
          onClick={() => setIsMenuOpen(false)}
        />
        
        {/* Sidebar */}
        <div className={`fixed top-0 right-0 h-full w-80 max-w-[80vw] transform transition-transform duration-300 ease-in-out ${
          isMenuOpen ? 'translate-x-0' : 'translate-x-full'
        } ${isDark ? 'bg-gray-900' : 'bg-white'} shadow-xl`}>
          {/* Sidebar Header */}
          <div className={`flex items-center justify-between p-4 border-b ${isDark ? 'border-gray-700' : 'border-gray-200'}`}>
            <h2 className={`text-lg font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
              Menu
            </h2>
            <button
              onClick={() => {
                playSound('/stone-effect-254998.mp3', 0.5);
                setIsMenuOpen(false);
              }}
              className={`p-2 rounded-lg transition-colors ${isDark ? 'bg-gray-800 hover:bg-gray-700 text-gray-300' : 'bg-gray-100 hover:bg-gray-200 text-gray-700'}`}
            >
              <X className="w-5 h-5" />
            </button>
          </div>
          
          {/* Navigation Links */}
          <nav className="p-4">
            <div className="flex flex-col space-y-4">
              {navItems.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  className={`text-base font-medium py-3 px-4 rounded-lg transition-colors hover:text-green-500 ${isDark ? 'text-gray-300 hover:bg-gray-800' : 'text-gray-700 hover:bg-gray-100'}`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.label}
                </a>
              ))}
            </div>
          </nav>
        </div>
      </div>
    </header>
  );
};

export { SiteHeader };
