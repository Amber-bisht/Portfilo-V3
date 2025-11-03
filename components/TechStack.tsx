import React, { useEffect, useState } from 'react';
import { useTheme } from '../contexts/ThemeContext';
import { useSoundEffect } from '../hooks/useSoundEffect';
import { 
  SiHtml5,
  SiCss3,
  SiJavascript,
  SiTypescript,
  SiNodedotjs,
  SiExpress,
  SiMongodb,
  SiPostgresql,
  SiPrisma,
  SiNextdotjs,
  SiReact,
  SiDocker,
  SiKubernetes,
  SiGit,
  SiRedis,
  SiAmazon,
  SiApachekafka,
  SiGooglecloud,
  SiNginx,
  SiJenkins
} from 'react-icons/si';

interface TechStackProps {}

const TechStack: React.FC<TechStackProps> = () => {
  const { theme } = useTheme();
  const { playSound } = useSoundEffect();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const isDark = theme === 'dark';

  // Function to get original brand colors for icons
  const getIconColor = (techName: string) => {
    const colors: { [key: string]: string } = {
      'HTML5': '#E34F26',
      'CSS3': '#1572B6',
      'JavaScript': '#F7DF1E',
      'TypeScript': '#3178C6',
      'Node.js': '#339933',
      'Express.js': '#000000',
      'PostgreSQL': '#336791',
      'MongoDB': '#47A248',
      'Prisma': '#2D3748',
      'Redis': '#DC382D',
      'React.js': '#61DAFB',
      'Next.js': '#000000',
      'OAuth': '#4285F4',
      'Kafka': '#231F20',
      'Pub/Sub': '#4285F4',
      'AWS': '#FF9900',
      'Docker': '#2496ED',
      'Kubernetes': '#326CE5',
      'Rate Limiting': '#009639',
      'CI/CD': '#F05032',
      'Jenkins': '#D33833'
    };
    return colors[techName] || '#6B7280';
  };

  const techStack = [
    // Frontend Fundamentals
    {
      name: 'HTML5',
      icon: SiHtml5,
      color: 'from-cyan-400 to-cyan-600',
      description: 'Semantic markup'
    },
    {
      name: 'CSS3',
      icon: SiCss3,
      color: 'from-cyan-300 to-cyan-500',
      description: 'Styling & animations'
    },
    {
      name: 'JavaScript',
      icon: SiJavascript,
      color: 'from-cyan-500 to-blue-500',
      description: 'Dynamic programming'
    },
    {
      name: 'TypeScript',
      icon: SiTypescript,
      color: 'from-cyan-600 to-blue-600',
      description: 'Typed JavaScript'
    },
    
    // Backend Development
    {
      name: 'Node.js',
      icon: SiNodedotjs,
      color: 'from-cyan-400 to-cyan-700',
      description: 'Backend runtime'
    },
    {
      name: 'Express.js',
      icon: SiExpress,
      color: 'from-cyan-500 to-cyan-800',
      description: 'Web framework'
    },
    
    // Databases
    {
      name: 'PostgreSQL',
      icon: SiPostgresql,
      color: 'from-cyan-300 to-cyan-600',
      description: 'SQL database'
    },
    {
      name: 'MongoDB',
      icon: SiMongodb,
      color: 'from-cyan-400 to-cyan-700',
      description: 'NoSQL database'
    },
    {
      name: 'Prisma',
      icon: SiPrisma,
      color: 'from-cyan-500 to-blue-500',
      description: 'Database toolkit'
    },
    {
      name: 'Redis',
      icon: SiRedis,
      color: 'from-cyan-600 to-blue-600',
      description: 'In-memory database'
    },
    
    // Frontend Frameworks
    {
      name: 'React.js',
      icon: SiReact,
      color: 'from-cyan-300 to-cyan-500',
      description: 'UI library'
    },
    {
      name: 'Next.js',
      icon: SiNextdotjs,
      color: 'from-cyan-400 to-cyan-700',
      description: 'React framework'
    },
    
    // Authentication & Security
    {
      name: 'OAuth',
      icon: SiGooglecloud,
      color: 'from-cyan-500 to-blue-500',
      description: 'Authentication'
    },
    
    // Message Queues & Streaming
    {
      name: 'Kafka',
      icon: SiApachekafka,
      color: 'from-cyan-600 to-blue-700',
      description: 'Event streaming'
    },
    {
      name: 'Pub/Sub',
      icon: SiGooglecloud,
      color: 'from-cyan-400 to-cyan-600',
      description: 'Message queuing'
    },
    
    // Serverless & Cloud
    {
      name: 'AWS',
      icon: SiAmazon,
      color: 'from-cyan-500 to-blue-600',
      description: 'Cloud platform'
    },
    
    // DevOps & Infrastructure
    {
      name: 'Docker',
      icon: SiDocker,
      color: 'from-cyan-300 to-cyan-600',
      description: 'Containerization'
    },
    {
      name: 'Kubernetes',
      icon: SiKubernetes,
      color: 'from-cyan-400 to-blue-500',
      description: 'Container orchestration'
    },
    {
      name: 'Rate Limiting',
      icon: SiNginx,
      color: 'from-cyan-500 to-cyan-700',
      description: 'Traffic control'
    },
    {
      name: 'CI/CD',
      icon: SiGit,
      color: 'from-cyan-600 to-blue-600',
      description: 'DevOps pipeline'
    },
    {
      name: 'Jenkins',
      icon: SiJenkins,
      color: 'from-red-400 to-red-600',
      description: 'CI/CD automation'
    }
  ];

  if (!mounted) {
    return null;
  }

  return (
    <section id="tech-stack" className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className={`text-4xl md:text-5xl font-bold mb-6 ${isDark ? 'text-white' : 'text-gray-900'}`}
              style={{
                fontFamily: 'Minercraftory, monospace',
                textShadow: isDark ? '3px 3px 0px #000000, 6px 6px 0px #333333' : '2px 2px 0px #000000',
                fontWeight: '400'
              }}>
            Tech Stack
          </h2>
          <p className={`text-xl ${isDark ? 'text-gray-300' : 'text-gray-600'} max-w-3xl mx-auto`}>
            Technologies and tools I use to build modern, scalable applications.
          </p>
        </div>
        
        <div className={`relative overflow-hidden rounded-2xl ${isDark ? 'bg-gray-900/80 backdrop-blur-sm border border-gray-700/50' : 'bg-white border border-gray-200/50'} shadow-lg`}>
          {/* Background decoration - Minecraft grass block */}
          <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-green-500/10 to-emerald-500/10 rounded-full -translate-y-16 translate-x-16"></div>
          
          <div className="relative p-8 lg:p-12">
            {/* Inventory-style grid - responsive grid */}
            <div className="grid grid-cols-3 sm:grid-cols-6 lg:grid-cols-9 gap-2 max-w-4xl mx-auto">
              {Array.from({ length: 27 }, (_, index) => {
                const tech = techStack[index];
                const isEmpty = !tech;
                
                return (
                  <div
                    key={index}
                    onMouseEnter={() => {
                      if (!isEmpty) {
                        playSound('/minecraft-chest-open-made-with-Voicemod.mp3', 0.5);
                      }
                    }}
                    onClick={() => {
                      if (!isEmpty) {
                        playSound('/minecraft-chest-open-made-with-Voicemod.mp3', 0.5);
                      }
                    }}
                    className={`group relative aspect-square ${isDark ? 'bg-gray-800 border-2 border-gray-600' : 'bg-gray-200 border-2 border-gray-400'} ${!isEmpty ? 'hover:border-cyan-400 cursor-pointer' : ''} transition-all duration-200`}
                    style={{ 
                      borderRadius: '4px',
                      backgroundImage: isDark 
                        ? 'linear-gradient(135deg, #374151 0%, #1f2937 100%)'
                        : 'linear-gradient(135deg, #e5e7eb 0%, #d1d5db 100%)',
                      boxShadow: !isEmpty 
                        ? isDark 
                          ? '0 0 10px rgba(34, 211, 238, 0.3)' 
                          : '0 0 8px rgba(34, 211, 238, 0.2)'
                        : 'none'
                    }}
                  >
                    {!isEmpty ? (
                      <>
                        {/* Tech Icon and Name */}
                        <div className="absolute inset-0 flex flex-col items-center justify-center p-1">
                          <tech.icon className="w-8 h-8 group-hover:scale-110 transition-transform duration-200 drop-shadow-lg mb-1" 
                            style={{
                              filter: 'brightness(1.2) contrast(1.1)',
                              textShadow: '0 0 8px rgba(34, 211, 238, 0.5)',
                              color: getIconColor(tech.name)
                            }} />
                          <span className={`text-xs font-medium ${isDark ? 'text-cyan-400' : 'text-cyan-600'} text-center leading-tight`}>
                            {tech.name}
                          </span>
                        </div>
                        
                        {/* Tooltip */}
                        <div className={`absolute z-50 opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none ${
                          (index % 3 >= 2) || (index % 6 >= 4 && (index % 3 >= 2) || (index % 6 >= 4 && index % 9 >= 6)) ? 'right-full mr-2' : 'left-full ml-2'
                        } top-1/2 transform -translate-y-1/2`}>
                          <div className={`px-3 py-2 rounded text-sm font-medium whitespace-nowrap ${
                            isDark 
                              ? 'bg-gray-900/95 border border-cyan-400 text-cyan-400' 
                              : 'bg-gray-800/95 border border-cyan-300 text-cyan-300'
                          } backdrop-blur-sm`}>
                            <div className="font-semibold">{tech.name}</div>
                            <div className={`text-xs ${isDark ? 'text-gray-300' : 'text-gray-400'}`}>
                              {tech.description}
                            </div>
                          </div>
                          {/* Tooltip arrow */}
                          <div className={`absolute top-1/2 transform -translate-y-1/2 w-0 h-0 ${
                            (index % 3 >= 2) || (index % 6 >= 4 && index % 9 >= 6) 
                              ? 'right-0 translate-x-full border-l-4 border-l-gray-900/95 border-t-4 border-t-transparent border-b-4 border-b-transparent'
                              : 'left-0 -translate-x-full border-r-4 border-r-gray-900/95 border-t-4 border-t-transparent border-b-4 border-b-transparent'
                          }`}></div>
                        </div>
                      </>
                    ) : (
                      <>
                        {/* Empty slot with cooking hover effect */}
                        <div className="absolute inset-0 flex items-center justify-center">
                          <span className={`text-xs font-medium ${isDark ? 'text-gray-500' : 'text-gray-400'} opacity-0 group-hover:opacity-100 transition-opacity duration-200`}
                                style={{ fontFamily: 'Minercraftory, monospace' }}>
                            cooking...
                          </span>
                        </div>
                        
                        {/* Cooking tooltip */}
                        <div className={`absolute z-50 opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none ${
                          (index % 3 >= 2) || (index % 6 >= 4 && index % 9 >= 6) ? 'right-full mr-2' : 'left-full ml-2'
                        } top-1/2 transform -translate-y-1/2`}>
                          <div className={`px-3 py-2 rounded text-sm font-medium whitespace-nowrap ${
                            isDark 
                              ? 'bg-gray-900/95 border border-orange-400 text-orange-400' 
                              : 'bg-gray-800/95 border border-orange-300 text-orange-300'
                          } backdrop-blur-sm`}>
                            <div className="font-semibold">Coming Soon</div>
                            <div className={`text-xs ${isDark ? 'text-gray-300' : 'text-gray-400'}`}>
                              New technology in development
                            </div>
                          </div>
                          {/* Tooltip arrow */}
                          <div className={`absolute top-1/2 transform -translate-y-1/2 w-0 h-0 ${
                            (index % 3 >= 2) || (index % 6 >= 4 && index % 9 >= 6) 
                              ? 'right-0 translate-x-full border-l-4 border-l-gray-900/95 border-t-4 border-t-transparent border-b-4 border-b-transparent'
                              : 'left-0 -translate-x-full border-r-4 border-r-gray-900/95 border-t-4 border-t-transparent border-b-4 border-b-transparent'
                          }`}></div>
                        </div>
                      </>
                    )}
                  </div>
                );
              })}
            </div>
            
          </div>
        </div>
      </div>
    </section>
  );
};

export default TechStack;
