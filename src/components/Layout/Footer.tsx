import React from 'react';
import { useTheme } from '../../context/ThemeContext';
import { Github, Twitter, Mail } from 'lucide-react';

const Footer: React.FC = () => {
  const { darkMode } = useTheme();

  return (
    <footer className={`${darkMode ? 'bg-gray-800 text-gray-300' : 'bg-gray-100 text-gray-600'} py-6`}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <p className="text-sm">
              &copy; 2025 EV Finder. Developed during internship at Unified Mentor by Chakravarthi with support from NxtWave. All rights reserved.
            </p>
          </div>
          <div className="flex space-x-6">
            <a href="https://github.com/chakravarthi" className="hover:text-green-400 transition-colors duration-200">
              <Github className="h-5 w-5" />
            </a>
            <a href="https://twitter.com/chakravarthi" className="hover:text-green-400 transition-colors duration-200">
              <Twitter className="h-5 w-5" />
            </a>
            <a href="mailto:chakravarthi@example.com" className="hover:text-green-400 transition-colors duration-200">
              <Mail className="h-5 w-5" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;