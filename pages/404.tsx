import Head from 'next/head';
import Link from 'next/link';
import { useTheme } from '../contexts/ThemeContext';
import { useEffect, useState } from 'react';
import { SiteFooter } from '../components/layout/site-footer';
import { Menu, X, Sun, Moon } from 'lucide-react';
import { useSoundEffect } from '../hooks/useSoundEffect';
import SoundToggle from '../components/SoundToggle';

const Custom404 = () => {
  const { theme, toggleTheme } = useTheme();
  const { playSound } = useSoundEffect();
  const [mounted, setMounted] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const isDark = theme === 'dark';

  // Portfolio data for header and footer
  const portfolioData = {
    personal: {
      name: "Amber Bisht",
      tagline: "Software Developer",
      description: "I love creating fast, reliable, and stunning web apps — combining frontend creativity with backend power and cloud scalability."
    },
    contact: {
      email: "bishtamber0@gmail.com",
      location: "India",
      linkedin: "https://www.linkedin.com/in/amber-bisht-05a096294",
      github: "https://github.com/amber-bisht",
      twitter: "https://x.com/amber_bisht",
      telegram: "amber_bisht",
      instagram: "https://instagram.com/amber_bisht"
    }
  };

  // Navigation items that redirect to home page with anchors
  const navItems = [
    { href: '/#projects', label: 'Projects' },
    { href: '/#tech-stack', label: 'Tech Stack' },
    { href: '/#experience', label: 'Experience' },
    { href: '/#contact', label: 'Contact' },
  ];

  if (!mounted) {
    return null;
  }

  return (
    <>
      <Head>
        <title>404 - Page Not Found | Amber Bisht</title>
        <meta name="description" content="Oops! The page you're looking for doesn't exist." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" type="image/png" href="https://cdn-icons-png.flaticon.com/512/11423/11423254.png" />
      </Head>

      <div className={`min-h-screen relative ${isDark ? 'bg-gradient-to-br from-slate-900 via-blue-900 to-slate-950' : 'bg-gradient-to-br from-blue-100 via-blue-50 to-cyan-100'}`}>
        
        {/* Custom Header for 404 page */}
        <header className={`sticky top-0 z-50 w-full border-b ${isDark ? 'bg-gray-900/80 backdrop-blur-sm border-gray-700/50' : 'bg-white/80 backdrop-blur-sm border-gray-200/50'}`}>
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex h-16 items-center justify-between">
              {/* Logo */}
              <div className="flex items-center">
                <Link href="/">
                  <h1 className={`text-2xl font-bold cursor-pointer ${isDark ? 'text-white' : 'text-gray-900'}`}>
                    {portfolioData.personal.name}
                  </h1>
                </Link>
              </div>

              {/* Desktop Navigation */}
              <nav className="hidden md:flex items-center space-x-8">
                {navItems.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`text-sm font-medium transition-colors hover:text-green-500 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}
                  >
                    {item.label}
                  </Link>
                ))}
              </nav>

              {/* Theme Toggle & Mobile Menu */}
              <div className="flex items-center space-x-4">
                {/* Sound Toggle */}
                <SoundToggle />
                
                {/* Theme Toggle */}
                <button
                  onClick={() => {
                    playSound('/minecraft-cave-sound-332982.mp3', 0.5);
                    toggleTheme();
                  }}
                  className="relative w-16 h-8 border-4 border-black transition-all duration-300 hover:scale-105 active:scale-95 shadow-lg"
                  style={{ borderRadius: '6px' }}
                  aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
                >
                  <div className={`absolute inset-0 ${isDark ? 'bg-slate-700' : 'bg-green-500'}`} 
                       style={{ borderRadius: '2px' }}>
                  </div>
                  
                  <div className={`absolute top-1/2 -translate-y-1/2 w-6 h-6 transition-all duration-300 ${isDark ? 'left-1' : 'right-1'}`}>
                    <div className="absolute inset-0 bg-white border-2 border-black"
                         style={{ borderRadius: '2px' }}>
                      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3 h-3 bg-white border border-black"
                           style={{ borderRadius: '1px' }}>
                      </div>
                    </div>
                  </div>
                  
                  <div className={`absolute inset-0 transition-opacity duration-200 ${isDark ? 'bg-blue-900/20' : 'bg-green-900/20'} opacity-0 hover:opacity-100`}
                       style={{ borderRadius: '2px' }}>
                  </div>
                </button>

                {/* Mobile Menu Button */}
                <button
                  onClick={() => {
                    playSound('/minecraft-click.mp3', 0.5);
                    setIsMenuOpen(!isMenuOpen);
                  }}
                  className={`md:hidden p-2 rounded-lg transition-colors ${isDark ? 'bg-gray-800 hover:bg-gray-700 text-gray-300' : 'bg-gray-100 hover:bg-gray-200 text-gray-700'}`}
                  aria-label="Toggle menu"
                >
                  {isMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
                </button>
              </div>
            </div>

            {/* Mobile Navigation */}
            {isMenuOpen && (
              <div className={`md:hidden py-4 border-t ${isDark ? 'border-gray-700/50' : 'border-gray-200/50'}`}>
                <nav className="flex flex-col space-y-4">
                  {navItems.map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      className={`text-sm font-medium transition-colors hover:text-green-500 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}
                      onClick={() => {
                        playSound('/minecraft-click.mp3', 0.5);
                        setIsMenuOpen(false);
                      }}
                    >
                      {item.label}
                    </Link>
                  ))}
                </nav>
              </div>
            )}
          </div>
        </header>
        {/* Animated Background Elements */}
        {isDark && (
          <div className="fixed inset-0 pointer-events-none">
            {/* Moon */}
            <div className="absolute top-20 right-20 w-16 h-16 bg-yellow-200 border-2 border-yellow-300 opacity-80 shadow-lg shadow-yellow-200/50" style={{ borderRadius: '4px' }} />
            
            {/* Stars */}
            {[...Array(50)].map((_, i) => (
              <div
                key={i}
                className="absolute w-1 h-1 bg-white rounded-full animate-pulse"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                  animationDelay: `${Math.random() * 3}s`,
                  animationDuration: `${2 + Math.random() * 2}s`
                }}
              />
            ))}
          </div>
        )}

        {/* Light Theme Background Elements */}
        {!isDark && (
          <div className="fixed inset-0 pointer-events-none">
            {/* Sun */}
            <div className="absolute top-16 right-16 w-16 h-16 bg-yellow-300 opacity-90 shadow-lg shadow-yellow-300/50" />
            
            {/* Clouds */}
            <div className="absolute top-24 left-16 w-32 h-16 bg-white/90 opacity-80" />
            <div className="absolute top-32 left-32 w-24 h-12 bg-white/80 opacity-70" />
            <div className="absolute top-20 left-48 w-28 h-14 bg-white/85 opacity-75" />
          </div>
        )}

        <div className="flex flex-col items-center justify-center min-h-screen px-4">
          {/* Minecraft Creeper Face - Created with CSS Grid */}
          <div className="mb-8">
            <div className="creeper-face">
              <div className="creeper-grid">
                {/* Row 1 */}
                <div className="pixel light-green"></div>
                <div className="pixel dark-green"></div>
                <div className="pixel dark-green"></div>
                <div className="pixel light-green"></div>
                <div className="pixel light-green"></div>
                <div className="pixel light-green"></div>
                <div className="pixel light-green"></div>
                <div className="pixel dark-green"></div>
                
                {/* Row 2 */}
                <div className="pixel dark-green"></div>
                <div className="pixel dark-green"></div>
                <div className="pixel dark-green"></div>
                <div className="pixel dark-green"></div>
                <div className="pixel dark-green"></div>
                <div className="pixel light-green"></div>
                <div className="pixel dark-green"></div>
                <div className="pixel light-green"></div>
                
                {/* Row 3 - Eyes row */}
                <div className="pixel dark-green"></div>
                <div className="pixel black"></div>
                <div className="pixel black"></div>
                <div className="pixel light-green"></div>
                <div className="pixel dark-green"></div>
                <div className="pixel black"></div>
                <div className="pixel black"></div>
                <div className="pixel light-green"></div>
                
                {/* Row 4 - Eyes row */}
                <div className="pixel dark-green"></div>
                <div className="pixel black"></div>
                <div className="pixel black"></div>
                <div className="pixel dark-green"></div>
                <div className="pixel dark-green"></div>
                <div className="pixel black"></div>
                <div className="pixel black"></div>
                <div className="pixel light-green"></div>
                
                {/* Row 5 - Nose row */}
                <div className="pixel light-green"></div>
                <div className="pixel dark-green"></div>
                <div className="pixel dark-green"></div>
                <div className="pixel black"></div>
                <div className="pixel black"></div>
                <div className="pixel light-green"></div>
                <div className="pixel dark-green"></div>
                <div className="pixel dark-green"></div>
                
                {/* Row 6 - Mouth top */}
                <div className="pixel light-green"></div>
                <div className="pixel dark-green"></div>
                <div className="pixel black"></div>
                <div className="pixel black"></div>
                <div className="pixel black"></div>
                <div className="pixel black"></div>
                <div className="pixel dark-green"></div>
                <div className="pixel light-green"></div>
                
                {/* Row 7 - Mouth middle */}
                <div className="pixel light-green"></div>
                <div className="pixel dark-green"></div>
                <div className="pixel black"></div>
                <div className="pixel black"></div>
                <div className="pixel black"></div>
                <div className="pixel black"></div>
                <div className="pixel dark-green"></div>
                <div className="pixel dark-green"></div>
                
                {/* Row 8 - Mouth bottom */}
                <div className="pixel dark-green"></div>
                <div className="pixel light-green"></div>
                <div className="pixel black"></div>
                <div className="pixel dark-green"></div>
                <div className="pixel dark-green"></div>
                <div className="pixel black"></div>
                <div className="pixel dark-green"></div>
                <div className="pixel dark-green"></div>
              </div>
            </div>
          </div>

          {/* 404 Text */}
          <div className="text-center mb-8">
            <h1 className={`text-8xl md:text-9xl font-black drop-shadow-2xl mb-4 ${isDark ? 'text-white' : 'text-white'}`}
                style={{
                  fontFamily: 'Minercraftory, monospace',
                  textShadow: isDark ? '4px 4px 0px #000000, 8px 8px 0px #333333' : '4px 4px 0px #000000, 8px 8px 0px #333333',
                  letterSpacing: '0.05em',
                  fontWeight: '400',
                  WebkitTextStroke: isDark ? 'none' : '4px #000000'
                } as React.CSSProperties}>
              404
            </h1>
            
            <h2 className={`text-2xl md:text-3xl lg:text-4xl drop-shadow-lg mb-4 ${isDark ? 'text-white' : 'text-white'}`}
                style={{
                  fontFamily: 'Minercraftory, monospace',
                  textShadow: isDark ? '2px 2px 0px #000000' : '2px 2px 0px #000000',
                  fontWeight: '400',
                  WebkitTextStroke: isDark ? 'none' : '2px #000000'
                } as React.CSSProperties}>
              PAGE NOT FOUND
            </h2>
            
            <p className={`text-lg md:text-xl ${isDark ? 'text-gray-300' : 'text-gray-700'} mb-8 max-w-md mx-auto`}>
              Oops! The page you&apos;re looking for seems to have exploded like a Creeper! 💥
            </p>
          </div>

        </div>
        
        {/* Custom Footer for 404 page */}
        <footer className={`border-t ${isDark ? 'bg-gray-900/80 backdrop-blur-sm border-gray-700/50' : 'bg-white/80 backdrop-blur-sm border-gray-200/50'}`}>
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
              {/* About Section */}
              <div className="text-center md:text-left">
                <h3 className={`text-xl font-bold mb-4 ${isDark ? 'text-white' : 'text-gray-900'}`}
                    style={{
                      fontFamily: 'Minercraftory, monospace',
                      textShadow: isDark ? '2px 2px 0px #000000' : '1px 1px 0px #ffffff',
                      fontWeight: '400'
                    }}>
                  {portfolioData.personal.name.toUpperCase()}
                </h3>
                <p className={`text-sm ${isDark ? 'text-gray-300' : 'text-gray-600'} mb-4`}>
                  {portfolioData.personal.description}
                </p>
                <div className="flex justify-center md:justify-start space-x-4">
                  <a href={portfolioData.contact.github} target="_blank" rel="noopener noreferrer" 
                     className={`p-2 rounded-lg transition-colors ${isDark ? 'bg-gray-800 hover:bg-gray-700' : 'bg-gray-100 hover:bg-gray-200'}`}>
                    <svg className="w-5 h-5 text-gray-600" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                    </svg>
                  </a>
                  <a href={portfolioData.contact.linkedin} target="_blank" rel="noopener noreferrer"
                     className={`p-2 rounded-lg transition-colors ${isDark ? 'bg-gray-800 hover:bg-gray-700' : 'bg-gray-100 hover:bg-gray-200'}`}>
                    <svg className="w-5 h-5 text-gray-600" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                    </svg>
                  </a>
                  <a href={portfolioData.contact.twitter} target="_blank" rel="noopener noreferrer"
                     className={`p-2 rounded-lg transition-colors ${isDark ? 'bg-gray-800 hover:bg-gray-700' : 'bg-gray-100 hover:bg-gray-200'}`}>
                    <svg className="w-5 h-5 text-gray-600" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
                    </svg>
                  </a>
                  <a href={`mailto:${portfolioData.contact.email}`}
                     className={`p-2 rounded-lg transition-colors ${isDark ? 'bg-gray-800 hover:bg-gray-700' : 'bg-gray-100 hover:bg-gray-200'}`}>
                    <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </a>
                </div>
              </div>

              {/* Quick Links */}
              <div className="text-center">
                <h3 className={`text-lg font-semibold mb-4 ${isDark ? 'text-white' : 'text-gray-900'}`}
                    style={{
                      fontFamily: 'Minercraftory, monospace',
                      textShadow: isDark ? '1px 1px 0px #000000' : '1px 1px 0px #ffffff',
                      fontWeight: '400'
                    }}>
                  QUICK LINKS
                </h3>
                <div className="space-y-2">
                  {navItems.map((item) => (
                    <Link 
                      key={item.href}
                      href={item.href} 
                      className={`block text-sm hover:text-gray-400 transition-colors ${isDark ? 'text-gray-300' : 'text-gray-600'}`}
                    >
                      {item.label}
                    </Link>
                  ))}
                </div>
              </div>

              {/* Contact Info */}
              <div className="text-center md:text-right">
                <h3 className={`text-lg font-semibold mb-4 ${isDark ? 'text-white' : 'text-gray-900'}`}
                    style={{
                      fontFamily: 'Minercraftory, monospace',
                      textShadow: isDark ? '1px 1px 0px #000000' : '1px 1px 0px #ffffff',
                      fontWeight: '400'
                    }}>
                  GET IN TOUCH
                </h3>
                <div className="space-y-2">
                  <p className={`text-sm ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                    📧 {portfolioData.contact.email}
                  </p>
                  <p className={`text-sm ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                    📍 {portfolioData.contact.location}
                  </p>
                  <p className={`text-sm ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                    💼 Open to new opportunities
                  </p>
                </div>
              </div>
            </div>

            {/* Bottom Section */}
            <div className={`border-t pt-6 ${isDark ? 'border-gray-700' : 'border-gray-200'}`}>
              <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
                
                <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                  © 2025 {portfolioData.personal.name}. All rights reserved.
                </p>
              </div>
            </div>
          </div>
        </footer>
      </div>

      <style jsx>{`
        .creeper-face {
          position: relative;
          width: 200px;
          height: 200px;
          margin: 0 auto;
          padding: 3px;
          background-color: #222222;
          border: 2px solid #000000;
          border-radius: 2px;
          box-shadow: 4px 4px 0px #000000;
        }

        .creeper-grid {
          display: grid;
          grid-template-columns: repeat(8, 1fr);
          grid-template-rows: repeat(8, 1fr);
          gap: 0;
          width: 100%;
          height: 100%;
        }

        .pixel {
          width: 100%;
          height: 100%;
          border: none;
        }

        .dark-green {
          background-color: #66CC33;
        }

        .light-green {
          background-color: #99FF66;
        }

        .black {
          background-color: #000000;
        }

        /* Animation for the creeper */
        .creeper-face {
          animation: creeperPulse 2s ease-in-out infinite;
        }

        @keyframes creeperPulse {
          0%, 100% {
            transform: scale(1);
            box-shadow: 4px 4px 0px #000000;
          }
          50% {
            transform: scale(1.05);
            box-shadow: 6px 6px 0px #000000;
          }
        }

        /* Responsive adjustments */
        @media (max-width: 768px) {
          .creeper-face {
            width: 150px;
            height: 150px;
            padding: 6px;
          }
        }

        @media (max-width: 480px) {
          .creeper-face {
            width: 120px;
            height: 120px;
            padding: 4px;
          }
        }
      `}</style>
    </>
  );
};

export default Custom404;
