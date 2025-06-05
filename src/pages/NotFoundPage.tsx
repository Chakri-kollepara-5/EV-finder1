import React from 'react';
import { useTheme } from '../context/ThemeContext';
import { Link } from 'react-router-dom';
import { AlertCircle } from 'lucide-react';

const NotFoundPage: React.FC = () => {
  const { darkMode } = useTheme();
  
  return (
    <div className="pt-20 min-h-screen flex items-center justify-center">
      <div className={`text-center p-8 rounded-lg ${darkMode ? 'bg-gray-800' : 'bg-white'} shadow-lg max-w-md mx-auto`}>
        <AlertCircle className={`h-20 w-20 mx-auto mb-6 ${darkMode ? 'text-yellow-400' : 'text-yellow-500'}`} />
        <h1 className={`text-4xl font-bold mb-4 ${darkMode ? 'text-white' : 'text-gray-800'}`}>404</h1>
        <h2 className={`text-2xl font-semibold mb-4 ${darkMode ? 'text-white' : 'text-gray-800'}`}>Page Not Found</h2>
        <p className={`mb-8 ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
          The page you're looking for doesn't exist or has been moved.
        </p>
        <Link 
          to="/" 
          className="px-6 py-3 bg-blue-500 text-white font-medium rounded-lg hover:bg-blue-600 transition-colors"
        >
          Back to Home
        </Link>
      </div>
    </div>
  );
};

export default NotFoundPage;