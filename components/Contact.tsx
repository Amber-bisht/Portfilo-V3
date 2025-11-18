import React, { useEffect, useState } from 'react';
import { useTheme } from '../contexts/ThemeContext';
import { Mail, MapPin, Linkedin, Github, Twitter, Send, MessageCircle } from 'lucide-react';
import { SiGmail, SiGooglemaps, SiInstagram } from 'react-icons/si';
import { useSoundEffect } from '../hooks/useSoundEffect';

interface Contact {
  email: string;
  location: string;
  linkedin: string;
  github: string;
  twitter: string;
  telegram: string;
  instagram: string;
}

interface ContactProps {
  contact: Contact;
}

const Contact: React.FC<ContactProps> = ({ contact }) => {
  const { theme } = useTheme();
  const { playSound } = useSoundEffect();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const isDark = theme === 'dark';

  if (!mounted) {
    return null;
  }

  return (
    <section id="contact" className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className={`text-4xl md:text-5xl font-bold mb-6 ${isDark ? 'text-white' : 'text-gray-900'}`}
              style={{
                fontFamily: 'Minercraftory, monospace',
                textShadow: isDark ? '3px 3px 0px #000000, 6px 6px 0px #333333' : '2px 2px 0px #000000',
                fontWeight: '400'
              }}>
            Get In Touch
          </h2>
          <p className={`text-xl ${isDark ? 'text-gray-300' : 'text-gray-600'} max-w-3xl mx-auto`}>
            Let&apos;s connect and discuss how we can work together on your next project.
          </p>
        </div>
        
        <div className="max-w-6xl mx-auto">
          <div className={`relative overflow-hidden rounded-2xl ${isDark ? 'bg-gray-900/80 backdrop-blur-sm border border-gray-700/50' : 'bg-white border border-gray-200/50'} shadow-lg`}>
            {/* Background decoration - Minecraft grass block */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-green-500/10 to-emerald-500/10 rounded-full -translate-y-16 translate-x-16"></div>
            
            <div className="relative p-8 lg:p-12">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                {/* Contact Information */}
                <div>
                  <h3 className={`text-2xl font-bold mb-8 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                    Contact Information
                  </h3>
                  <div className="space-y-6">
                    <div className={`flex items-center p-4 rounded-xl ${isDark ? 'bg-gray-800/50 border border-gray-700/50' : 'bg-gray-50 border border-gray-200/50'}`}>
                      <div className="p-3 bg-gradient-to-br from-red-500 to-red-600 rounded-lg mr-4">
                        <SiGmail className="w-5 h-5 text-white" />
                      </div>
                      <div>
                        <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>Email</p>
                        <a 
                          href={`mailto:${contact.email}`} 
                          className={`text-lg font-medium hover:text-red-500 transition-colors ${isDark ? 'text-white' : 'text-gray-900'}`}
                        >
                          {contact.email}
                        </a>
                      </div>
                    </div>
                    
                    <div className={`flex items-center p-4 rounded-xl ${isDark ? 'bg-gray-800/50 border border-gray-700/50' : 'bg-gray-50 border border-gray-200/50'}`}>
                      <div className="p-3 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg mr-4">
                        <SiGooglemaps className="w-5 h-5 text-white" />
                      </div>
                      <div>
                        <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>Location</p>
                        <p className={`text-lg font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>
                          {contact.location}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Social Links */}
                <div>
                  <h3 className={`text-2xl font-bold mb-8 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                    Connect With Me
                  </h3>
                  <div className="space-y-4">
                    <a
                      href={contact.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label="Visit Amber Bisht's LinkedIn profile"
                      className={`group flex items-center p-4 rounded-xl transition-all duration-300 hover:scale-105 ${isDark ? 'bg-gray-800/50 border border-gray-700/50 hover:bg-gray-800' : 'bg-gray-50 border border-gray-200/50 hover:bg-gray-100'}`}
                    >
                      <div className="p-3 bg-blue-600 rounded-lg mr-4 group-hover:bg-blue-700 transition-colors">
                        <Linkedin className="w-5 h-5 text-white" aria-hidden="true" />
                      </div>
                      <div>
                        <p className={`font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>LinkedIn</p>
                        <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>Professional network</p>
                      </div>
                    </a>
                    
                    <a
                      href={contact.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label="Visit Amber Bisht's GitHub profile"
                      className={`group flex items-center p-4 rounded-xl transition-all duration-300 hover:scale-105 ${isDark ? 'bg-gray-800/50 border border-gray-700/50 hover:bg-gray-800' : 'bg-gray-50 border border-gray-200/50 hover:bg-gray-100'}`}
                    >
                      <div className="p-3 bg-gray-800 rounded-lg mr-4 group-hover:bg-gray-900 transition-colors">
                        <Github className="w-5 h-5 text-white" aria-hidden="true" />
                      </div>
                      <div>
                        <p className={`font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>GitHub</p>
                        <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>Code repositories</p>
                      </div>
                    </a>
                    
                    <a
                      href={contact.twitter}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label="Visit Amber Bisht's Twitter profile"
                      className={`group flex items-center p-4 rounded-xl transition-all duration-300 hover:scale-105 ${isDark ? 'bg-gray-800/50 border border-gray-700/50 hover:bg-gray-800' : 'bg-gray-50 border border-gray-200/50 hover:bg-gray-100'}`}
                    >
                      <div className="p-3 bg-blue-400 rounded-lg mr-4 group-hover:bg-blue-500 transition-colors">
                        <Twitter className="w-5 h-5 text-white" aria-hidden="true" />
                      </div>
                      <div>
                        <p className={`font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>Twitter</p>
                        <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>Latest updates</p>
                      </div>
                    </a>
                    
                    <a
                      href={`https://t.me/${contact.telegram}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label="Contact Amber Bisht on Telegram"
                      className={`group flex items-center p-4 rounded-xl transition-all duration-300 hover:scale-105 ${isDark ? 'bg-gray-800/50 border border-gray-700/50 hover:bg-gray-800' : 'bg-gray-50 border border-gray-200/50 hover:bg-gray-100'}`}
                    >
                      <div className="p-3 bg-blue-500 rounded-lg mr-4 group-hover:bg-blue-600 transition-colors">
                        <MessageCircle className="w-5 h-5 text-white" aria-hidden="true" />
                      </div>
                      <div>
                        <p className={`font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>Telegram</p>
                        <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>@amber_bisht</p>
                      </div>
                    </a>
                    
                    <a
                      href={contact.instagram}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label="Visit Amber Bisht's Instagram profile"
                      className={`group flex items-center p-4 rounded-xl transition-all duration-300 hover:scale-105 ${isDark ? 'bg-gray-800/50 border border-gray-700/50 hover:bg-gray-800' : 'bg-gray-50 border border-gray-200/50 hover:bg-gray-100'}`}
                    >
                      <div className="p-3 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg mr-4 group-hover:from-purple-600 group-hover:to-pink-600 transition-all">
                        <SiInstagram className="w-5 h-5 text-white" aria-hidden="true" />
                      </div>
                      <div>
                        <p className={`font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>Instagram</p>
                        <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>@amber_bisht</p>
                      </div>
                    </a>
                  </div>
                  
                  {/* Quick Contact Button */}
                  <div className="mt-8">
                    <a
                      href={`mailto:${contact.email}?subject=Let's work together!`}
                      onClick={() => playSound('/minecraft-click.mp3', 0.5)}
                      aria-label={`Send email to ${contact.email}`}
                      className={`inline-flex items-center gap-2 px-6 py-3 font-medium transition-all duration-150 ${isDark ? 'bg-gray-600 border-2 border-t-gray-400 border-l-gray-400 border-r-gray-800 border-b-gray-800 text-white hover:bg-gray-500 active:border-t-gray-800 active:border-l-gray-800 active:border-r-gray-400 active:border-b-gray-400' : 'bg-gray-400 border-2 border-t-gray-200 border-l-gray-200 border-r-gray-600 border-b-gray-600 text-white hover:bg-gray-300 active:border-t-gray-600 active:border-l-gray-600 active:border-r-gray-200 active:border-b-gray-200'}`}
                      style={{ borderRadius: '4px' }}
                    >
                      <Send className="w-4 h-4" aria-hidden="true" />
                      Send Message
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
