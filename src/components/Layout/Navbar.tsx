import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X, MapPin, Battery, User, Moon, Sun } from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { darkMode, toggleTheme } = useTheme();

  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <nav className={`${darkMode ? 'bg-gray-800 shadow-lg' : 'bg-white shadow-md'} fixed w-full z-10`}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link 
              to="/" 
              className="flex items-center space-x-2"
              onClick={() => setIsOpen(false)}
            >
              <Battery className={`h-8 w-8 ${darkMode ? 'text-green-400' : 'text-green-500'}`} />
              <span className={`text-xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>EV Finder</span>
            </Link>
          </div>
          
          {/* Desktop navigation */}
          <div className="hidden md:flex md:items-center md:space-x-8">
            <Link to="/map" className={`text-sm font-medium hover:${darkMode ? 'text-green-400' : 'text-green-600'} transition-colors duration-200 ease-in-out flex items-center`}>
              <MapPin className="h-4 w-4 mr-1" />
              Find Stations
            </Link>
            <Link to="/dashboard" className={`text-sm font-medium hover:${darkMode ? 'text-green-400' : 'text-green-600'} transition-colors duration-200 ease-in-out flex items-center`}>
              <Battery className="h-4 w-4 mr-1" />
              Dashboard
            </Link>
            <Link to="/profile" className={`text-sm font-medium hover:${darkMode ? 'text-green-400' : 'text-green-600'} transition-colors duration-200 ease-in-out flex items-center`}>
              <User className="h-4 w-4 mr-1" />
              Profile
            </Link>
            <button 
              onClick={toggleTheme} 
              className={`p-2 rounded-full ${darkMode ? 'bg-gray-700 text-yellow-300' : 'bg-gray-100 text-gray-600'}`}
            >
              {darkMode ? <Sun size={18} /> : <Moon size={18} />}
            </button>
          </div>
          
          {/* Mobile menu button */}
          <div className="flex items-center md:hidden">
            <button
              onClick={toggleTheme}
              className={`p-2 rounded-full mr-2 ${darkMode ? 'bg-gray-700 text-yellow-300' : 'bg-gray-100 text-gray-600'}`}
            >
              {darkMode ? <Sun size={18} /> : <Moon size={18} />}
            </button>
            <button
              onClick={toggleMenu}
              className={`p-2 rounded-md ${darkMode ? 'text-white hover:bg-gray-700' : 'text-gray-600 hover:bg-gray-100'}`}
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>
      
      {/* Mobile menu */}
      <div className={`${isOpen ? 'block' : 'hidden'} md:hidden ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
        <div className="pt-2 pb-4 space-y-1 px-4">
          <Link 
            to="/map" 
            className={`block py-2 px-3 rounded-md ${darkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-100'} flex items-center`}
            onClick={toggleMenu}
          >
            <MapPin className="h-5 w-5 mr-2" />
            Find Stations
          </Link>
          <Link 
            to="/dashboard" 
            className={`block py-2 px-3 rounded-md ${darkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-100'} flex items-center`}
            onClick={toggleMenu}
          >
            <Battery className="h-5 w-5 mr-2" />
            Dashboard
          </Link>
          <Link 
            to="/profile" 
            className={`block py-2 px-3 rounded-md ${darkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-100'} flex items-center`}
            onClick={toggleMenu}
          >
            <User className="h-5 w-5 mr-2" />
            Profile
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;