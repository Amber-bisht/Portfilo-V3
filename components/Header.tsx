import React from 'react';
import ThemeToggle from './ThemeToggle';

interface HeaderProps {
  name: string;
  tagline: string;
}

const Header: React.FC<HeaderProps> = ({ name, tagline }) => {
  return (
    <header className="postman-header px-6 py-4">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="w-10 h-10 bg-postman-orange rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-lg">
                {name.split(' ').map(n => n[0]).join('')}
              </span>
            </div>
            <div>
              <h1 className="text-xl font-semibold">{name}</h1>
              <p className="text-gray-300 text-sm">{tagline}</p>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <nav className="hidden md:flex space-x-6">
              <a href="#projects" className="text-gray-300 hover:text-white transition-colors">
                Projects
              </a>
              <a href="#experience" className="text-gray-300 hover:text-white transition-colors">
                Experience
              </a>
              <a href="#contact" className="text-gray-300 hover:text-white transition-colors">
                Contact
              </a>
            </nav>
            <ThemeToggle />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
