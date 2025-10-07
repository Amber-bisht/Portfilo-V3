import React, { useEffect, useState } from 'react';
import { useTheme } from '../contexts/ThemeContext';
import { Github, ExternalLink, Code, Database, Globe, ChevronDown, ChevronUp } from 'lucide-react';

interface Project {
  id: number;
  title: string;
  description: string;
  technologies: string[];
  image: string;
  github: string;
  live: string;
}

interface ProjectsProps {
  projects: Project[];
}

const Projects: React.FC<ProjectsProps> = ({ projects }) => {
  const { theme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [showAllProjects, setShowAllProjects] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const isDark = theme === 'dark';
  
  // Get featured projects from JSON (first 3 projects with images)
  const featuredProjects = projects.filter(project => project.image).slice(0, 3);
  
  // Get additional projects (remaining projects with images + projects without images)
  const remainingFeaturedProjects = projects.filter(project => project.image).slice(3);
  const projectsWithoutImages = projects.filter(project => !project.image);
  const allAdditionalProjects = [...remainingFeaturedProjects, ...projectsWithoutImages];

  const getTechIcon = (tech: string) => {
    const techLower = tech.toLowerCase();
    if (techLower.includes('react') || techLower.includes('next')) return <Globe className="w-3 h-3" />;
    if (techLower.includes('node') || techLower.includes('express')) return <Code className="w-3 h-3" />;
    if (techLower.includes('database') || techLower.includes('sql') || techLower.includes('mongo')) return <Database className="w-3 h-3" />;
    return <Code className="w-3 h-3" />;
  };

  const renderProjectCard = (project: Project, showImage: boolean = true) => (
    <div
      key={project.id}
      className={`group relative overflow-hidden rounded-2xl ${isDark ? 'bg-gray-900/80 backdrop-blur-sm border border-gray-700/50' : 'bg-white border border-gray-200/50'} shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2`}
    >
      {/* Project Image - only show if showImage is true */}
      {showImage && (
        <div className="relative h-48 overflow-hidden">
          <img 
            src={project.image} 
            alt={project.title}
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
            onLoad={(e) => {
              console.log(`✅ Successfully loaded image: ${project.image}`);
            }}
            onError={(e) => {
              console.error(`❌ Failed to load image: ${project.image}`, e);
              // Try to set a fallback image
              const target = e.target as HTMLImageElement;
              
              // Hide the broken image and show placeholder
              target.style.display = 'none';
              const placeholder = target.parentElement?.querySelector('.fallback-placeholder') as HTMLElement;
              if (placeholder) {
                placeholder.style.display = 'flex';
              }
            }}
          />
          {/* Fallback placeholder */}
          <div className={`fallback-placeholder absolute inset-0 ${isDark ? 'bg-gradient-to-br from-gray-800 to-gray-700' : 'bg-gradient-to-br from-gray-100 to-gray-200'} flex items-center justify-center ${project.image ? 'hidden' : 'flex'}`}>
            <div className="text-center">
              <div className={`w-16 h-16 mx-auto mb-4 rounded-full ${isDark ? 'bg-gray-700' : 'bg-gray-300'} flex items-center justify-center`}>
                <Code className={`w-8 h-8 ${isDark ? 'text-gray-400' : 'text-gray-600'}`} />
              </div>
              <span className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                Project Screenshot
              </span>
            </div>
          </div>
          
          {/* Hover Overlay */}
          <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center space-x-4">
            <a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 bg-white/20 backdrop-blur-sm rounded-full hover:bg-white/30 transition-colors"
            >
              <Github className="w-6 h-6 text-white" />
            </a>
            {project.live && (
              <a
                href={project.live}
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 bg-white/20 backdrop-blur-sm rounded-full hover:bg-white/30 transition-colors"
              >
                <ExternalLink className="w-6 h-6 text-white" />
              </a>
            )}
          </div>
        </div>
      )}

      <div className="p-6">
        <h3 className={`text-xl font-bold mb-3 ${isDark ? 'text-white' : 'text-gray-900'}`}>
          {project.title}
        </h3>
        <p className={`text-sm mb-4 ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
          {project.description}
        </p>
        
        {/* Technologies */}
        <div className="flex flex-wrap gap-2 mb-6">
          {project.technologies.map((tech, techIndex) => (
            <span
              key={techIndex}
              className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium ${isDark ? 'bg-gray-800 text-gray-300 border border-gray-700' : 'bg-gray-100 text-gray-700 border border-gray-200'}`}
            >
              {getTechIcon(tech)}
              {tech}
            </span>
          ))}
        </div>
        
        {/* Action Buttons */}
        <div className={`flex ${project.live ? 'space-x-3' : 'justify-center'}`}>
          <a
            href={project.github}
            target="_blank"
            rel="noopener noreferrer"
            className={`${project.live ? 'flex-1' : 'w-full max-w-xs'} flex items-center justify-center gap-2 px-4 py-2 text-sm font-medium transition-all duration-150 ${isDark ? 'bg-gray-600 border-2 border-t-gray-400 border-l-gray-400 border-r-gray-800 border-b-gray-800 text-white hover:bg-gray-500 active:border-t-gray-800 active:border-l-gray-800 active:border-r-gray-400 active:border-b-gray-400' : 'bg-gray-400 border-2 border-t-gray-200 border-l-gray-200 border-r-gray-600 border-b-gray-600 text-white hover:bg-gray-300 active:border-t-gray-600 active:border-l-gray-600 active:border-r-gray-200 active:border-b-gray-200'}`}
            style={{ borderRadius: '4px' }}
          >
            <Github className="w-4 h-4" />
            {project.live ? 'Code' : 'View on GitHub'}
          </a>
          {project.live && (
            <a
              href={project.live}
              target="_blank"
              rel="noopener noreferrer"
              className={`flex-1 flex items-center justify-center gap-2 px-4 py-2 text-sm font-medium transition-all duration-150 ${isDark ? 'bg-gray-600 border-2 border-t-gray-400 border-l-gray-400 border-r-gray-800 border-b-gray-800 text-white hover:bg-gray-500 active:border-t-gray-800 active:border-l-gray-800 active:border-r-gray-400 active:border-b-gray-400' : 'bg-gray-400 border-2 border-t-gray-200 border-l-gray-200 border-r-gray-600 border-b-gray-600 text-white hover:bg-gray-300 active:border-t-gray-600 active:border-l-gray-600 active:border-r-gray-200 active:border-b-gray-200'}`}
              style={{ borderRadius: '4px' }}
            >
              <ExternalLink className="w-4 h-4" />
              Live Demo
            </a>
          )}
        </div>
      </div>
    </div>
  );

  if (!mounted) {
    return null;
  }

  return (
    <section id="projects" className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className={`text-4xl md:text-5xl font-bold mb-6 ${isDark ? 'text-white' : 'text-gray-900'}`}
              style={{
                fontFamily: 'Minercraftory, monospace',
                textShadow: isDark ? '3px 3px 0px #000000, 6px 6px 0px #333333' : '2px 2px 0px #000000',
                fontWeight: '400'
              }}>
            Featured Projects
          </h2>
          <p className={`text-xl ${isDark ? 'text-gray-300' : 'text-gray-600'} max-w-3xl mx-auto`}>
            Here are some of my recent projects that showcase my skills and experience in modern web development.
          </p>
        </div>
        
        {/* Featured Projects with Images */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {featuredProjects.map((project) => renderProjectCard(project, true))}
        </div>

        {/* See More Projects Button */}
        {allAdditionalProjects.length > 0 && (
          <div className="text-center mt-12">
            <button
              onClick={() => setShowAllProjects(!showAllProjects)}
              className={`inline-flex items-center gap-2 px-8 py-4 text-lg font-bold transition-all duration-150 ${isDark ? 'bg-gray-600 border-2 border-t-gray-400 border-l-gray-400 border-r-gray-800 border-b-gray-800 text-white hover:bg-gray-500 active:border-t-gray-800 active:border-l-gray-800 active:border-r-gray-400 active:border-b-gray-400' : 'bg-gray-400 border-2 border-t-gray-200 border-l-gray-200 border-r-gray-600 border-b-gray-600 text-white hover:bg-gray-300 active:border-t-gray-600 active:border-l-gray-600 active:border-r-gray-200 active:border-b-gray-200'}`}
              style={{ borderRadius: '4px', fontFamily: 'monospace' }}
            >
              {showAllProjects ? (
                <>
                  <ChevronUp className="w-5 h-5" />
                  Show Less Projects
                </>
              ) : (
                <>
                  <ChevronDown className="w-5 h-5" />
                  See More Projects
                </>
              )}
            </button>
          </div>
        )}

        {/* Additional Projects - shown when "See More" is clicked */}
        {showAllProjects && allAdditionalProjects.length > 0 && (
          <div className="mt-12">
            <div className="text-center mb-8">
              <h3 className={`text-2xl md:text-3xl font-bold mb-4 ${isDark ? 'text-white' : 'text-gray-900'}`}
                  style={{
                    fontFamily: 'Minercraftory, monospace',
                    textShadow: isDark ? '2px 2px 0px #000000' : '1px 1px 0px #000000',
                    fontWeight: '400'
                  }}>
                Additional Projects
              </h3>
              <p className={`text-lg ${isDark ? 'text-gray-300' : 'text-gray-600'} max-w-2xl mx-auto`}>
                More projects showcasing my development skills and experience.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {allAdditionalProjects.map((project) => renderProjectCard(project, false))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default Projects;
