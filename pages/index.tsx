import { GetStaticProps } from 'next';
import Head from 'next/head';
import fs from 'fs';
import path from 'path';
import { SiteHeader } from '../components/layout/site-header';
import { SiteFooter } from '../components/layout/site-footer';
import { useTheme } from '../contexts/ThemeContext';
import { useEffect, useState } from 'react';
import { ArrowDown, Code, Coffee, Heart } from 'lucide-react';
import Projects from '../components/Projects';
import Experience from '../components/Experience';
import Contact from '../components/Contact';
import TechStack from '../components/TechStack';
import MetaTags from '../components/SEO/MetaTags';
import StructuredData from '../components/SEO/StructuredData';

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
            <div className="absolute top-20 right-20 w-16 h-16 bg-yellow-200 rounded-full opacity-80 shadow-lg shadow-yellow-200/50" />
            
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
          <section className="relative min-h-[70vh] sm:min-h-[80vh] md:min-h-screen flex items-center justify-center py-4 sm:py-8 px-4">
            <div className="relative z-10 text-center max-w-4xl mx-auto">
              {/* Main Title - Minecraft Style */}
              <div className="mb-4">
                <h1 className={`text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-black drop-shadow-2xl ${isDark ? 'text-white' : 'text-white'}`}
                    style={{
                      fontFamily: 'Roboto, sans-serif',
                      textShadow: isDark ? '3px 3px 0px #000000, 6px 6px 0px #333333' : '3px 3px 0px #000000, 6px 6px 0px #333333',
                      letterSpacing: '0.05em',
                      fontWeight: '900',
                      WebkitTextStroke: isDark ? 'none' : '3px #000000'
                    }}>
                  AMBER BISHT
              </h1>
              </div>
              
              {/* Subtitle */}
              <div className="mb-6 sm:mb-8">
                <h2 className={`text-lg sm:text-xl md:text-3xl lg:text-4xl drop-shadow-lg ${isDark ? 'text-white' : 'text-white'}`}
                    style={{
                      fontFamily: 'Roboto, sans-serif',
                      textShadow: isDark ? '2px 2px 0px #000000' : '2px 2px 0px #000000',
                      fontWeight: '700',
                      WebkitTextStroke: isDark ? 'none' : '2px #000000'
                    }}>
                  SOFTWARE DEVELOPER
                </h2>
              </div>

              {/* Description */}
              <div className="mb-6 sm:mb-8">
                <p className={`text-sm sm:text-base md:text-lg lg:text-xl max-w-2xl mx-auto leading-relaxed ${isDark ? 'text-gray-300' : 'text-gray-700'}`}
                   style={{
                     fontFamily: 'Roboto, sans-serif',
                     fontWeight: '400'
                   }}>
                  {portfolioData.personal.description}
                </p>
              </div>



              {/* Minecraft-style Menu Buttons */}
              <div className="space-y-3 sm:space-y-4">
                {/* Level 1 - Tech Stack + Contact */}
                <div className="flex flex-col sm:flex-row justify-center gap-3 sm:gap-6">
                  <button 
                    onClick={() => scrollToSection('tech-stack')}
                    className={`flex items-center justify-center gap-2 px-4 sm:px-8 py-3 sm:py-4 w-full sm:w-64 text-base sm:text-xl font-bold transition-all duration-150 ${isDark ? 'bg-gray-600 border-2 border-t-gray-400 border-l-gray-400 border-r-gray-800 border-b-gray-800 text-white hover:bg-gray-500 active:border-t-gray-800 active:border-l-gray-800 active:border-r-gray-400 active:border-b-gray-400' : 'bg-gray-400 border-2 border-t-gray-200 border-l-gray-200 border-r-gray-600 border-b-gray-600 text-white hover:bg-gray-300 active:border-t-gray-600 active:border-l-gray-600 active:border-r-gray-200 active:border-b-gray-200'}`}
                    style={{ borderRadius: '4px', fontFamily: 'monospace' }}>
                    <Code className="w-3 h-3 sm:w-4 sm:h-4" />
                    Tech Stack
                  </button>
                  <button 
                    onClick={() => scrollToSection('contact')}
                    className={`flex items-center justify-center gap-2 px-4 sm:px-8 py-3 sm:py-4 w-full sm:w-64 text-base sm:text-xl font-bold transition-all duration-150 ${isDark ? 'bg-gray-600 border-2 border-t-gray-400 border-l-gray-400 border-r-gray-800 border-b-gray-800 text-white hover:bg-gray-500 active:border-t-gray-800 active:border-l-gray-800 active:border-r-gray-400 active:border-b-gray-400' : 'bg-gray-400 border-2 border-t-gray-200 border-l-gray-200 border-r-gray-600 border-b-gray-600 text-white hover:bg-gray-300 active:border-t-gray-600 active:border-l-gray-600 active:border-r-gray-200 active:border-b-gray-200'}`}
                    style={{ borderRadius: '4px', fontFamily: 'monospace' }}>
                    <Heart className="w-3 h-3 sm:w-4 sm:h-4" />
                    Contact
                  </button>
                </div>
                
                {/* Level 2 - Projects (Wide Button) */}
                <div className="flex justify-center">
                  <button 
                    onClick={() => scrollToSection('projects')}
                    className={`flex items-center justify-center gap-2 px-4 sm:px-8 py-3 sm:py-4 w-full sm:w-[544px] text-base sm:text-xl font-bold transition-all duration-150 ${isDark ? 'bg-gray-600 border-2 border-t-gray-400 border-l-gray-400 border-r-gray-800 border-b-gray-800 text-white hover:bg-gray-500 active:border-t-gray-800 active:border-l-gray-800 active:border-r-gray-400 active:border-b-gray-400' : 'bg-gray-400 border-2 border-t-gray-200 border-l-gray-200 border-r-gray-600 border-b-gray-600 text-white hover:bg-gray-300 active:border-t-gray-600 active:border-l-gray-600 active:border-r-gray-200 active:border-b-gray-200'}`}
                    style={{ borderRadius: '4px', fontFamily: 'monospace' }}>
                    <Coffee className="w-3 h-3 sm:w-4 sm:h-4" />
                    Projects
                  </button>
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
