import { GetStaticProps } from 'next';
import Head from 'next/head';
import Image from 'next/image';
import fs from 'fs';
import path from 'path';
import { SiteHeader } from '../components/layout/site-header';
import { SiteFooter } from '../components/layout/site-footer';
import { useTheme } from '../contexts/ThemeContext';
import { useEffect, useState } from 'react';
import Projects from '../components/Projects';
import Experience from '../components/Experience';
import Contact from '../components/Contact';
import TechStack from '../components/TechStack';
import MetaTags from '../components/SEO/MetaTags';
import StructuredData from '../components/SEO/StructuredData';
import { useSoundEffect } from '../hooks/useSoundEffect';
import { Download } from 'lucide-react';

interface PortfolioData {
  personal: {
    name: string;
    tagline: string;
    description: string;
  };
  projects: Array<{
    id: number;
    title: string;
    description: string;
    technologies: string[];
    image: string;
    github: string;
    live: string;
    'system architecture'?: string;
  }>;
  experience: Array<{
    company: string;
    position: string;
    duration: string;
    description: string;
    achievements: string[];
  }>;
  contact: {
    email: string;
    location: string;
    linkedin: string;
    github: string;
    twitter: string;
    telegram: string;
    instagram: string;
  };
}

interface HomeProps {
  portfolioData: PortfolioData;
}

const Home: React.FC<HomeProps> = ({ portfolioData }) => {
  const { theme } = useTheme();
  const { playSound } = useSoundEffect();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const isDark = theme === 'dark';

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  if (!mounted) {
    return null;
  }

  return (
    <>
      <MetaTags 
        portfolioData={portfolioData}
        pageType="profile"
      />
      <StructuredData 
        portfolioData={portfolioData}
        pageType="homepage"
      />

      <div className={`min-h-screen relative ${isDark ? 'bg-gradient-to-br from-slate-900 via-blue-900 to-slate-950' : 'bg-gradient-to-br from-blue-100 via-blue-50 to-cyan-100'}`}>
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
            
            {/* Twinkling stars */}
            {[...Array(20)].map((_, i) => (
              <div
                key={`twinkle-${i}`}
                className="absolute w-0.5 h-0.5 bg-yellow-300 rounded-full animate-ping"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                  animationDelay: `${Math.random() * 4}s`,
                  animationDuration: `${1 + Math.random() * 2}s`
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
            
            {/* Additional clouds */}
            <div className="absolute top-40 right-32 w-20 h-10 bg-white/70 opacity-60" />
            <div className="absolute top-36 right-48 w-16 h-8 bg-white/60 opacity-55" />
          </div>
        )}

        <SiteHeader 
          name={portfolioData.personal.name}
          tagline={portfolioData.personal.tagline}
        />
        
        <main className="flex-1">
          {/* Minecraft-Style Hero Section */}
          <section className="relative min-h-[calc(100vh-120px)] sm:min-h-[calc(100vh-120px)] flex items-center justify-center py-4 sm:py-8 px-4 sm:px-6 md:px-8 pt-16 sm:pt-20 md:pt-24 lg:pt-28 pb-2 sm:pb-12">
            <div className="relative z-10 max-w-7xl mx-auto w-full">
              <div className="flex flex-col lg:flex-row items-center justify-between gap-4 sm:gap-6 lg:gap-12">
                {/* Left Side - Text Content */}
                <div className="flex-1 text-left px-2 sm:px-4 md:px-6 lg:ml-16 lg:pl-16 lg:pr-8 order-1 lg:order-none mt-8 sm:mt-10 md:mt-12">
              {/* Main Title - Minecraft Style */}
                  <div className="mb-3 flex items-center justify-start gap-1 lg:gap-2">
                    <h1 className={`text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-black drop-shadow-2xl whitespace-nowrap ${isDark ? 'text-white' : 'text-gray-400'}`}
                    style={{
                      fontFamily: '"Times New Roman", Times, serif',
                      textShadow: isDark ? '0px 4px 20px rgba(0, 0, 0, 0.5), 0px 2px 8px rgba(0, 0, 0, 0.3)' : '0px 4px 20px rgba(0, 0, 0, 0.3), 0px 2px 8px rgba(0, 0, 0, 0.2)',
                      letterSpacing: '0.02em',
                      fontWeight: '700',
                      WebkitTextStroke: 'none'
                    }}>
                  AMBER BISHT
              </h1>
              </div>

              {/* Description */}
              <div className="mb-4 sm:mb-5 md:mb-6">
                    <p className={`text-sm sm:text-base md:text-lg lg:text-xl max-w-full sm:max-w-md md:max-w-2xl leading-relaxed text-left pr-2 sm:pr-0 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}
                   style={{
                     fontFamily: 'Roboto, sans-serif',
                     fontWeight: '400'
                   }}>
                  {portfolioData.personal.description}
                </p>
              </div>

              {/* Download Resume Button */}
              <div className="flex justify-center lg:justify-start mt-8 sm:mt-10 md:mt-12 mb-6 sm:mb-0">
                <a
                  href="https://drive.google.com/file/d/19zMENnr9VWC_zIm4cc2kh-NE4bBi_je7/view"
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => playSound('/minecraft-click.mp3', 0.5)}
                  className={`inline-flex items-center justify-center gap-2 px-6 py-3 text-base sm:text-lg font-bold transition-all duration-150 ${isDark ? 'bg-gray-600 border-2 border-t-gray-400 border-l-gray-400 border-r-gray-800 border-b-gray-800 text-white hover:bg-gray-500 active:border-t-gray-800 active:border-l-gray-800 active:border-r-gray-400 active:border-b-gray-400' : 'bg-gray-400 border-2 border-t-gray-200 border-l-gray-200 border-r-gray-600 border-b-gray-600 text-white hover:bg-gray-300 active:border-t-gray-600 active:border-l-gray-600 active:border-r-gray-200 active:border-b-gray-200'}`}
                  style={{ borderRadius: '4px', fontFamily: 'monospace' }}
                >
                  <Download className="w-4 h-4 sm:w-5 sm:h-5" />
                  Download Resume
                </a>
              </div>
                </div>
                
                {/* Right Side - Image */}
                <div className="flex-1 flex items-center justify-center lg:justify-end order-2 lg:order-none">
                  <div className="relative w-full max-w-[120px] sm:max-w-[180px] md:max-w-[240px] lg:max-w-[300px]">
                    <Image 
                      src="/images/Bee_JE1.gif"
                      alt="Minecraft Bee"
                      width={300}
                      height={300}
                      className="w-full h-auto object-contain drop-shadow-2xl"
                      style={{ mixBlendMode: 'normal' }}
                      unoptimized
                    />
                  </div>
                </div>
              </div>
            </div>
          </section>

          <Projects projects={portfolioData.projects} />
          <TechStack />
          <Experience experience={portfolioData.experience} />
          <Contact contact={portfolioData.contact} />
        </main>

        <SiteFooter 
          contact={portfolioData.contact}
          personal={portfolioData.personal}
        />
      </div>
    </>
  );
};

export const getStaticProps: GetStaticProps = async () => {
  try {
    // Load data from JSON
    let portfolioData: PortfolioData;

    try {
      const jsonPath = path.join(process.cwd(), 'data', 'portfolio.json');
      const jsonData = fs.readFileSync(jsonPath, 'utf8');
      portfolioData = JSON.parse(jsonData);
    } catch (jsonError) {
      // Fallback to default data if JSON file is not found or invalid
      portfolioData = {
        personal: {
          name: "Amber Bisht",
          tagline: "Software Developer",
          description: "I love creating fast, reliable, and stunning web apps — combining frontend creativity with backend power and cloud scalability."
        },
        projects: [],
        experience: [],
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
    }

    return {
      props: {
        portfolioData,
      },
    };
  } catch (error) {
    console.error('Error loading portfolio data:', error);
    
    // Return fallback data
    const fallbackData: PortfolioData = {
      personal: {
        name: "Amber Bisht",
        tagline: "Software Developer",
        description: "I love creating fast, reliable, and stunning web apps — combining frontend creativity with backend power and cloud scalability."
      },
      projects: [],
      experience: [],
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

    return {
      props: {
        portfolioData: fallbackData,
      },
    };
  }
};

export default Home;
