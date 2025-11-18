import React, { useEffect, useState, useRef } from 'react';
import Image from 'next/image';
import OptimizedImage from './OptimizedImage';
import { useTheme } from '../contexts/ThemeContext';
import { Github, ExternalLink, Code, Database, Globe, X, Network } from 'lucide-react';
import { useSoundEffect } from '../hooks/useSoundEffect';
import mermaid from 'mermaid';

interface Project {
  id: number;
  title: string;
  description: string;
  technologies: string[];
  image: string;
  github: string;
  live: string;
  'system architecture'?: string;
}

interface ProjectsProps {
  projects: Project[];
}

const Projects: React.FC<ProjectsProps> = ({ projects }) => {
  const { theme } = useTheme();
  const { playSound } = useSoundEffect();
  const [mounted, setMounted] = useState(false);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const mermaidRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setMounted(true);
    // Initialize mermaid
    mermaid.initialize({ 
      startOnLoad: false,
      theme: theme === 'dark' ? 'dark' : 'default',
      securityLevel: 'loose',
      flowchart: {
        useMaxWidth: true,
        htmlLabels: true,
        curve: 'basis'
      }
    });
  }, [theme]);

  useEffect(() => {
    // Render mermaid diagram when modal opens
    if (isModalOpen && selectedProject && selectedProject['system architecture'] && mermaidRef.current) {
      let diagram = selectedProject['system architecture'];
      mermaidRef.current.innerHTML = '';
      
      // Clean up the diagram - remove frontmatter and extract just the diagram
      diagram = diagram.trim();
      
      // Remove frontmatter (---\nconfig: ... \n---\n)
      if (diagram.includes('---')) {
        const parts = diagram.split('---');
        // Find the flowchart/graph part
        for (let i = 0; i < parts.length; i++) {
          if (parts[i].trim().startsWith('flowchart') || parts[i].trim().startsWith('graph')) {
            diagram = parts[i].trim();
            break;
          }
        }
        // If we still have frontmatter, try to extract after the last ---
        if (diagram.includes('---')) {
          const lastDashIndex = diagram.lastIndexOf('---');
          if (lastDashIndex !== -1) {
            diagram = diagram.substring(lastDashIndex + 3).trim();
          }
        }
      }
      
      // Remove any remaining incorrect prefixes
      if (diagram.startsWith('--\n')) {
        diagram = diagram.replace(/^--\n/, '');
      }
      
      // Ensure we have a valid mermaid diagram
      if (!diagram.startsWith('flowchart') && !diagram.startsWith('graph')) {
        console.error('Invalid mermaid diagram format');
        if (mermaidRef.current) {
          mermaidRef.current.innerHTML = `<div class="p-4 text-center"><p class="text-red-500">Invalid diagram format</p></div>`;
        }
        return;
      }
      
      // Use async/await for mermaid rendering
      const renderDiagram = async () => {
        try {
          const { svg } = await mermaid.render(`mermaid-${selectedProject.id}`, diagram);
          if (mermaidRef.current) {
            mermaidRef.current.innerHTML = svg;
          }
        } catch (error) {
          console.error('Error rendering mermaid diagram:', error);
          if (mermaidRef.current) {
            mermaidRef.current.innerHTML = `<div class="p-4 text-center"><p class="text-red-500 mb-2">Error rendering diagram</p><p class="text-sm text-gray-500">${error instanceof Error ? error.message : String(error)}</p></div>`;
          }
        }
      };
      
      renderDiagram();
    }
  }, [isModalOpen, selectedProject]);

  const openMermaidModal = (project: Project) => {
    playSound('/minecraft-click.mp3', 0.5);
    setSelectedProject(project);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    playSound('/minecraft-click.mp3', 0.5);
    setIsModalOpen(false);
    setSelectedProject(null);
  };

  const isDark = theme === 'dark';
  
  // Get featured projects from JSON (first 3 projects with images)
  const featuredProjects = projects.filter(project => project.image).slice(0, 3);

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
          {project.image ? (
            project.image.endsWith('.png') ? (
              <OptimizedImage 
                src={project.image} 
                alt={project.title}
                width={768}
                height={336}
                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                unoptimized
              />
            ) : (
              <Image 
                src={project.image} 
                alt={project.title}
                width={768}
                height={336}
                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                unoptimized
              />
            )
          ) : (
            <div className={`absolute inset-0 ${isDark ? 'bg-gradient-to-br from-gray-800 to-gray-700' : 'bg-gradient-to-br from-gray-100 to-gray-200'} flex items-center justify-center`}>
              <div className="text-center">
                <div className={`w-16 h-16 mx-auto mb-4 rounded-full ${isDark ? 'bg-gray-700' : 'bg-gray-300'} flex items-center justify-center`}>
                  <Code className={`w-8 h-8 ${isDark ? 'text-gray-400' : 'text-gray-600'}`} />
                </div>
                <span className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                  Project Screenshot
                </span>
              </div>
            </div>
          )}
          
          {/* Hover Overlay */}
          <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center space-x-4">
            <a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => playSound('/minecraft-click.mp3', 0.5)}
              className="p-3 bg-white/20 backdrop-blur-sm rounded-full hover:bg-white/30 transition-colors"
              aria-label={`View ${project.title} on GitHub`}
            >
              <Github className="w-6 h-6 text-white" />
            </a>
            {project.live && (
              <a
                href={project.live}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => playSound('/minecraft-click.mp3', 0.5)}
                className="p-3 bg-white/20 backdrop-blur-sm rounded-full hover:bg-white/30 transition-colors"
                aria-label={`View ${project.title} live demo`}
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
        <div className={`flex flex-wrap gap-3 ${project.live || project['system architecture'] ? '' : 'justify-center'}`}>
          <a
            href={project.github}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => playSound('/minecraft-click.mp3', 0.5)}
            className={`${project.live || project['system architecture'] ? 'flex-1' : 'w-full max-w-xs'} flex items-center justify-center gap-2 px-4 py-2 text-sm font-medium transition-all duration-150 ${isDark ? 'bg-gray-600 border-2 border-t-gray-400 border-l-gray-400 border-r-gray-800 border-b-gray-800 text-white hover:bg-gray-500 active:border-t-gray-800 active:border-l-gray-800 active:border-r-gray-400 active:border-b-gray-400' : 'bg-gray-400 border-2 border-t-gray-200 border-l-gray-200 border-r-gray-600 border-b-gray-600 text-white hover:bg-gray-300 active:border-t-gray-600 active:border-l-gray-600 active:border-r-gray-200 active:border-b-gray-200'}`}
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
              onClick={() => playSound('/minecraft-click.mp3', 0.5)}
              className={`flex-1 flex items-center justify-center gap-2 px-4 py-2 text-sm font-medium transition-all duration-150 ${isDark ? 'bg-gray-600 border-2 border-t-gray-400 border-l-gray-400 border-r-gray-800 border-b-gray-800 text-white hover:bg-gray-500 active:border-t-gray-800 active:border-l-gray-800 active:border-r-gray-400 active:border-b-gray-400' : 'bg-gray-400 border-2 border-t-gray-200 border-l-gray-200 border-r-gray-600 border-b-gray-600 text-white hover:bg-gray-300 active:border-t-gray-600 active:border-l-gray-600 active:border-r-gray-200 active:border-b-gray-200'}`}
              style={{ borderRadius: '4px' }}
            >
              <ExternalLink className="w-4 h-4" />
              Live Demo
            </a>
          )}
          {project['system architecture'] && (
            <button
              onClick={() => openMermaidModal(project)}
              className={`flex-1 flex items-center justify-center gap-2 px-4 py-2 text-sm font-medium transition-all duration-150 ${isDark ? 'bg-gray-600 border-2 border-t-gray-400 border-l-gray-400 border-r-gray-800 border-b-gray-800 text-white hover:bg-gray-500 active:border-t-gray-800 active:border-l-gray-800 active:border-r-gray-400 active:border-b-gray-400' : 'bg-gray-400 border-2 border-t-gray-200 border-l-gray-200 border-r-gray-600 border-b-gray-600 text-white hover:bg-gray-300 active:border-t-gray-600 active:border-l-gray-600 active:border-r-gray-200 active:border-b-gray-200'}`}
              style={{ borderRadius: '4px' }}
            >
              <Network className="w-4 h-4" />
              Architecture
            </button>
          )}
        </div>
      </div>
    </div>
  );

  if (!mounted) {
    return null;
  }

  return (
    <section id="projects" className="pt-8 sm:pt-20 pb-20 px-4 sm:px-6 lg:px-8">
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

        {/* View More Projects Button - Redirects to GitHub */}
        <div className="text-center mt-12">
          <a
            href="https://github.com/amber-bisht"
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => playSound('/minecraft-click.mp3', 0.5)}
            className={`inline-flex items-center gap-2 px-8 py-4 text-lg font-bold transition-all duration-150 ${isDark ? 'bg-gray-600 border-2 border-t-gray-400 border-l-gray-400 border-r-gray-800 border-b-gray-800 text-white hover:bg-gray-500 active:border-t-gray-800 active:border-l-gray-800 active:border-r-gray-400 active:border-b-gray-400' : 'bg-gray-400 border-2 border-t-gray-200 border-l-gray-200 border-r-gray-600 border-b-gray-600 text-white hover:bg-gray-300 active:border-t-gray-600 active:border-l-gray-600 active:border-r-gray-200 active:border-b-gray-200'}`}
            style={{ borderRadius: '4px', fontFamily: 'monospace' }}
          >
            <Github className="w-5 h-5" />
            View More Projects on GitHub
          </a>
        </div>
      </div>

      {/* Mermaid Diagram Modal */}
      {isModalOpen && selectedProject && selectedProject['system architecture'] && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          onClick={closeModal}
        >
          {/* Backdrop */}
          <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" />
          
          {/* Modal Content */}
          <div 
            className={`relative w-full max-w-6xl max-h-[90vh] ${isDark ? 'bg-gray-900 border-4 border-gray-700' : 'bg-white border-4 border-gray-300'} shadow-2xl overflow-hidden`}
            style={{ borderRadius: '4px' }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className={`flex items-center justify-between p-6 border-b-4 ${isDark ? 'border-gray-700 bg-gray-800' : 'border-gray-300 bg-gray-100'}`}>
              <h3 className={`text-2xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}
                  style={{
                    fontFamily: 'Minercraftory, monospace',
                    textShadow: isDark ? '2px 2px 0px #000000' : '1px 1px 0px #000000',
                    fontWeight: '400'
                  }}>
                {selectedProject.title} - System Architecture
              </h3>
              <button
                onClick={closeModal}
                className={`p-2 transition-all duration-150 ${isDark ? 'bg-gray-600 border-2 border-t-gray-400 border-l-gray-400 border-r-gray-800 border-b-gray-800 text-gray-300 hover:bg-gray-500 active:border-t-gray-800 active:border-l-gray-800 active:border-r-gray-400 active:border-b-gray-400' : 'bg-gray-400 border-2 border-t-gray-200 border-l-gray-200 border-r-gray-600 border-b-gray-600 text-white hover:bg-gray-300 active:border-t-gray-600 active:border-l-gray-600 active:border-r-gray-200 active:border-b-gray-200'}`}
                style={{ borderRadius: '4px' }}
                aria-label="Close modal"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            
            {/* Modal Body - Mermaid Diagram */}
            <div className={`p-6 overflow-auto max-h-[calc(90vh-120px)] ${isDark ? 'bg-gray-900' : 'bg-white'}`}>
              <div 
                ref={mermaidRef}
                className="mermaid-diagram flex items-center justify-center"
                style={{ minHeight: '400px' }}
              />
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default Projects;
