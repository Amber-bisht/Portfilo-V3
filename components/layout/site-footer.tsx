import React from 'react';
import { useTheme } from '../../contexts/ThemeContext';
import { useEffect, useState } from 'react';
import { Github, Linkedin, Twitter, Mail, Heart, Code, Coffee } from 'lucide-react';

interface Contact {
  email: string;
  location: string;
  linkedin: string;
  github: string;
  twitter: string;
  telegram: string;
}

interface Personal {
  name: string;
  tagline: string;
  description: string;
}

interface SiteFooterProps {
  contact: Contact;
  personal: Personal;
}

const SiteFooter: React.FC<SiteFooterProps> = ({ contact, personal }) => {
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
              {personal.name.toUpperCase()}
            </h3>
            <p className={`text-sm ${isDark ? 'text-gray-300' : 'text-gray-600'} mb-4`}>
              {personal.description}
            </p>
            <div className="flex justify-center md:justify-start space-x-4">
              <a href={contact.github} target="_blank" rel="noopener noreferrer" 
                 aria-label="Visit Amber Bisht's GitHub profile"
                 className={`p-2 rounded-lg transition-colors ${isDark ? 'bg-gray-800 hover:bg-gray-700' : 'bg-gray-100 hover:bg-gray-200'}`}>
                <Github className="w-5 h-5 text-gray-600" aria-hidden="true" />
              </a>
              <a href={contact.linkedin} target="_blank" rel="noopener noreferrer"
                 aria-label="Visit Amber Bisht's LinkedIn profile"
                 className={`p-2 rounded-lg transition-colors ${isDark ? 'bg-gray-800 hover:bg-gray-700' : 'bg-gray-100 hover:bg-gray-200'}`}>
                <Linkedin className="w-5 h-5 text-gray-600" aria-hidden="true" />
              </a>
              <a href={contact.twitter} target="_blank" rel="noopener noreferrer"
                 aria-label="Visit Amber Bisht's Twitter profile"
                 className={`p-2 rounded-lg transition-colors ${isDark ? 'bg-gray-800 hover:bg-gray-700' : 'bg-gray-100 hover:bg-gray-200'}`}>
                <Twitter className="w-5 h-5 text-gray-600" aria-hidden="true" />
              </a>
              <a href={`mailto:${contact.email}`}
                 aria-label={`Send email to ${contact.email}`}
                 className={`p-2 rounded-lg transition-colors ${isDark ? 'bg-gray-800 hover:bg-gray-700' : 'bg-gray-100 hover:bg-gray-200'}`}>
                <Mail className="w-5 h-5 text-gray-600" aria-hidden="true" />
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
              <a href="#projects" className={`block text-sm hover:text-gray-400 transition-colors ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                Projects
              </a>
              <a href="#tech-stack" className={`block text-sm hover:text-gray-400 transition-colors ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                Tech Stack
              </a>
              <a href="#experience" className={`block text-sm hover:text-gray-400 transition-colors ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                Experience
              </a>
              <a href="#contact" className={`block text-sm hover:text-gray-400 transition-colors ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                Contact
              </a>
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
                📧 {contact.email}
              </p>
              <p className={`text-sm ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                📍 {contact.location}
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
              © 2025 {personal.name}. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export { SiteFooter };
