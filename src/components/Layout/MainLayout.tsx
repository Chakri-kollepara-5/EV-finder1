import React from 'react';
import Navbar from './Navbar';
import Footer from './Footer';
import { useTheme } from '../../context/ThemeContext';

interface MainLayoutProps {
  children: React.ReactNode;
}

const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  const { darkMode } = useTheme();

  return (
    <div className={`min-h-screen flex flex-col ${darkMode ? 'bg-gray-900 text-white' : 'bg-gray-50 text-gray-900'}`}>
      <Navbar />
      <main className="flex-grow container mx-auto px-4 py-4 sm:px-6 lg:px-8">
        {children}
      </main>
      <Footer />
    </div>
  );
};

export default MainLayout;