import React from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Zap, BarChart3, Battery } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import StationStatusOverview from '../components/Dashboard/StationStatusOverview';

const HomePage: React.FC = () => {
  const { darkMode } = useTheme();
  
  return (
    <div className="pt-20 pb-10">
      {/* Hero Section */}
      <section className="relative mb-16">
        <div className={`absolute inset-0 ${darkMode ? 'bg-black/40' : 'bg-black/20'} rounded-2xl`}></div>
        <div 
          className="h-[60vh] rounded-2xl bg-cover bg-center flex items-center"
          style={{ backgroundImage: 'url(https://images.pexels.com/photos/7350428/pexels-photo-7350428.jpeg)' }}
        >
          <div className="container mx-auto px-6 relative z-10">
            <div className="max-w-lg">
              <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
                Find Your Next <span className="text-green-400">Charge</span> Instantly
              </h1>
              <p className="text-lg text-gray-200 mb-8">
                Locate, reserve and navigate to EV charging stations in real-time.
                Never worry about finding a charge again.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link 
                  to="/map" 
                  className="px-6 py-3 bg-green-500 text-white font-medium rounded-lg hover:bg-green-600 transition-all duration-200 text-center"
                >
                  Find Stations
                </Link>
                <Link 
                  to="/dashboard" 
                  className={`px-6 py-3 ${darkMode ? 'bg-gray-700 text-white hover:bg-gray-600' : 'bg-white text-gray-800 hover:bg-gray-100'} font-medium rounded-lg transition-all duration-200 text-center`}
                >
                  View Dashboard
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="mb-16">
        <div className="container mx-auto px-4">
          <h2 className={`text-3xl font-bold mb-10 text-center ${darkMode ? 'text-white' : 'text-gray-800'}`}>
            Smart Features for EV Drivers
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Feature 1 */}
            <div className={`${darkMode ? 'bg-gray-800' : 'bg-white'} p-6 rounded-xl shadow-lg transition-transform duration-300 hover:transform hover:scale-105`}>
              <div className="flex justify-center mb-4">
                <div className={`w-16 h-16 rounded-full flex items-center justify-center ${darkMode ? 'bg-blue-900/50' : 'bg-blue-100'}`}>
                  <MapPin className="h-8 w-8 text-blue-500" />
                </div>
              </div>
              <h3 className={`text-xl font-semibold mb-3 text-center ${darkMode ? 'text-white' : 'text-gray-800'}`}>
                Live Availability
              </h3>
              <p className={`text-center ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                See charging station status in real-time, avoiding wasted trips to occupied stations.
              </p>
            </div>
            
            {/* Feature 2 */}
            <div className={`${darkMode ? 'bg-gray-800' : 'bg-white'} p-6 rounded-xl shadow-lg transition-transform duration-300 hover:transform hover:scale-105`}>
              <div className="flex justify-center mb-4">
                <div className={`w-16 h-16 rounded-full flex items-center justify-center ${darkMode ? 'bg-green-900/50' : 'bg-green-100'}`}>
                  <Zap className="h-8 w-8 text-green-500" />
                </div>
              </div>
              <h3 className={`text-xl font-semibold mb-3 text-center ${darkMode ? 'text-white' : 'text-gray-800'}`}>
                Smart Recommendations
              </h3>
              <p className={`text-center ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                Get personalized charging station suggestions based on your location and battery level.
              </p>
            </div>
            
            {/* Feature 3 */}
            <div className={`${darkMode ? 'bg-gray-800' : 'bg-white'} p-6 rounded-xl shadow-lg transition-transform duration-300 hover:transform hover:scale-105`}>
              <div className="flex justify-center mb-4">
                <div className={`w-16 h-16 rounded-full flex items-center justify-center ${darkMode ? 'bg-purple-900/50' : 'bg-purple-100'}`}>
                  <BarChart3 className="h-8 w-8 text-purple-500" />
                </div>
              </div>
              <h3 className={`text-xl font-semibold mb-3 text-center ${darkMode ? 'text-white' : 'text-gray-800'}`}>
                Cost Estimator
              </h3>
              <p className={`text-center ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                Calculate expected charging costs before you arrive based on your vehicle and charging needs.
              </p>
            </div>
            
            {/* Feature 4 */}
            <div className={`${darkMode ? 'bg-gray-800' : 'bg-white'} p-6 rounded-xl shadow-lg transition-transform duration-300 hover:transform hover:scale-105`}>
              <div className="flex justify-center mb-4">
                <div className={`w-16 h-16 rounded-full flex items-center justify-center ${darkMode ? 'bg-orange-900/50' : 'bg-orange-100'}`}>
                  <Battery className="h-8 w-8 text-orange-500" />
                </div>
              </div>
              <h3 className={`text-xl font-semibold mb-3 text-center ${darkMode ? 'text-white' : 'text-gray-800'}`}>
                Charging History
              </h3>
              <p className={`text-center ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                Track all your charging sessions, costs, and preferred locations in one place.
              </p>
            </div>
          </div>
        </div>
      </section>
      
      {/* Live Status Section */}
      <section className="mb-16">
        <div className="container mx-auto px-4">
          <h2 className={`text-3xl font-bold mb-8 text-center ${darkMode ? 'text-white' : 'text-gray-800'}`}>
            Current Station Status
          </h2>
          <StationStatusOverview />
        </div>
      </section>

      {/* Developer Info Section */}
      <section className="mb-16">
        <div className="container mx-auto px-4">
          <div className={`${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-xl p-8 shadow-lg`}>
            <div className="flex flex-col md:flex-row items-center gap-8">
              <img 
                src="https://i.imgur.com/1whoCM3.jpeg" 
                alt="Chakravarthi" 
                className="w-32 h-32 rounded-full object-cover"
              />
              <div>
                <h3 className={`text-2xl font-bold mb-2 ${darkMode ? 'text-white' : 'text-gray-800'}`}>
                  Developed by Chakravarthi
                </h3>
                <div className="flex flex-wrap gap-2 mb-4">
                  <span className={`text-sm px-3 py-1 rounded-full ${darkMode ? 'bg-blue-900/30 text-blue-400' : 'bg-blue-100 text-blue-700'}`}>
                    Unified Mentor Intern
                  </span>
                  <span className={`text-sm px-3 py-1 rounded-full ${darkMode ? 'bg-green-900/30 text-green-400' : 'bg-green-100 text-green-700'}`}>
                    NxtWave Student
                  </span>
                </div>
                <p className={`${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                  This project was developed during my internship at Unified Mentor, with support and guidance from NxtWave. 
                  It showcases the implementation of modern web technologies and real-time features for EV charging station management.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section 
        className="relative mb-16 rounded-xl overflow-hidden"
        style={{
          backgroundImage: 'url(https://images.pexels.com/photos/3608542/pexels-photo-3608542.jpeg)',
          backgroundSize: 'cover',
          backgroundPosition: 'center'
        }}
      >
        <div className={`absolute inset-0 ${darkMode ? 'bg-gray-900/90' : 'bg-gray-800/80'}`}></div>
        <div className="relative container mx-auto text-center max-w-3xl py-16 px-4">
          <h2 className="text-3xl font-bold mb-6 text-white">
            Ready to Simplify Your EV Charging?
          </h2>
          <p className="text-lg mb-8 text-gray-300 max-w-2xl mx-auto">
            Join thousands of EV drivers who save time and reduce range anxiety with our real-time charging station finder.
          </p>
          <Link 
            to="/map" 
            className="px-8 py-4 bg-green-500 text-white font-medium rounded-lg hover:bg-green-600 transition-all duration-200 inline-block"
          >
            Start Finding Stations
          </Link>
        </div>
      </section>
    </div>
  );
};

export default HomePage;