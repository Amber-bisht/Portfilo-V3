import React, { useEffect, useState } from 'react';
import { useTheme } from '../contexts/ThemeContext';
import { Building2, Calendar, Award, TrendingUp } from 'lucide-react';

interface Experience {
  company: string;
  position: string;
  duration: string;
  description: string;
  achievements: string[];
}

interface ExperienceProps {
  experience: Experience[];
}

const Experience: React.FC<ExperienceProps> = ({ experience }) => {
  const { theme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const isDark = theme === 'dark';

  if (!mounted) {
    return null;
  }

  return (
    <section id="experience" className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className={`text-4xl md:text-5xl font-bold mb-6 ${isDark ? 'text-white' : 'text-gray-900'}`}
              style={{
                fontFamily: 'Minercraftory, monospace',
                textShadow: isDark ? '3px 3px 0px #000000, 6px 6px 0px #333333' : '2px 2px 0px #000000',
                fontWeight: '400'
              }}>
            Professional Experience
          </h2>
          <p className={`text-xl ${isDark ? 'text-gray-300' : 'text-gray-600'} max-w-3xl mx-auto`}>
            My professional journey and the impact I&apos;ve made along the way.
          </p>
        </div>
        
        <div className="space-y-8">
          {experience.map((exp, index) => (
            <div
              key={index}
              className={`relative overflow-hidden rounded-2xl ${isDark ? 'bg-gray-900/80 backdrop-blur-sm border border-gray-700/50' : 'bg-white border border-gray-200/50'} shadow-lg hover:shadow-xl transition-all duration-300`}
            >
              {/* Background decoration */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-gray-500/10 to-gray-600/10 rounded-full -translate-y-16 translate-x-16"></div>
              
              <div className="relative p-8">
                <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between mb-6">
                  <div className="mb-6 lg:mb-0 lg:flex-1">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="p-2 bg-gradient-to-br from-gray-500 to-gray-600 rounded-lg">
                        <Building2 className="w-5 h-5 text-white" />
                      </div>
                      <h3 className={`text-2xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                        {exp.position}
                      </h3>
                    </div>
                    <p className="text-gray-600 font-semibold text-lg mb-3">
                      {exp.company}
                    </p>
                    <p className={`text-sm ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                      {exp.description}
                    </p>
                  </div>
                  
                  <div className={`flex items-center gap-2 px-4 py-2 rounded-lg ${isDark ? 'bg-gray-800 border border-gray-700' : 'bg-gray-100 border border-gray-200'}`}>
                    <Calendar className="w-4 h-4 text-gray-600" />
                    <span className={`text-sm font-medium ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                      {exp.duration}
                    </span>
                  </div>
                </div>
                
                <div className={`border-t ${isDark ? 'border-gray-700' : 'border-gray-200'} pt-6`}>
                  <div className="flex items-center gap-2 mb-4">
                    <Award className="w-5 h-5 text-gray-600" />
                    <h4 className={`text-lg font-semibold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                      Key Achievements
                    </h4>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {exp.achievements.map((achievement, achievementIndex) => (
                      <div
                        key={achievementIndex}
                        className={`flex items-start gap-3 p-4 rounded-lg ${isDark ? 'bg-gray-800/50 border border-gray-700/50' : 'bg-gray-50 border border-gray-200/50'}`}
                      >
                        <div className="p-1 bg-gradient-to-br from-gray-500 to-gray-600 rounded-full mt-0.5">
                          <TrendingUp className="w-3 h-3 text-white" />
                        </div>
                        <span className={`text-sm ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                          {achievement}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Experience;
