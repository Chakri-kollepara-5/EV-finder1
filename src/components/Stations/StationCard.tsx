import React from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Zap, Clock, Star } from 'lucide-react';
import { ChargingStation } from '../../types';
import { useTheme } from '../../context/ThemeContext';

interface StationCardProps {
  station: ChargingStation;
  compact?: boolean;
}

const StationCard: React.FC<StationCardProps> = ({ station, compact = false }) => {
  const { darkMode } = useTheme();

  const getAvailabilityColor = (status: string) => {
    switch (status) {
      case 'available':
        return 'text-green-500';
      case 'busy':
        return 'text-orange-500';
      case 'faulty':
        return 'text-red-500';
      default:
        return 'text-gray-500';
    }
  };

  const getAvailabilityBg = (status: string) => {
    switch (status) {
      case 'available':
        return darkMode ? 'bg-green-900/30' : 'bg-green-100';
      case 'busy':
        return darkMode ? 'bg-orange-900/30' : 'bg-orange-100';
      case 'faulty':
        return darkMode ? 'bg-red-900/30' : 'bg-red-100';
      default:
        return darkMode ? 'bg-gray-700' : 'bg-gray-100';
    }
  };

  const getAvailabilityText = (status: string) => {
    switch (status) {
      case 'available':
        return 'Available';
      case 'busy':
        return 'Busy';
      case 'faulty':
        return 'Faulty';
      default:
        return 'Unknown';
    }
  };

  if (compact) {
    return (
      <div className={`p-4 rounded-lg ${darkMode ? 'bg-gray-800 hover:bg-gray-750' : 'bg-white hover:bg-gray-50'} shadow-md transition-colors`}>
        <div className="flex justify-between items-start">
          <div className="flex-1">
            <h3 className={`font-semibold ${darkMode ? 'text-white' : 'text-gray-900'}`}>{station.name}</h3>
            <div className={`flex items-center text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
              <MapPin className="h-3 w-3 mr-1" />
              <span className="truncate">{station.location.address}</span>
            </div>
          </div>
          <span className={`${getAvailabilityColor(station.availability)} ${getAvailabilityBg(station.availability)} text-xs font-medium px-2.5 py-0.5 rounded-full`}>
            {getAvailabilityText(station.availability)}
          </span>
        </div>
        
        <div className="mt-2 flex flex-wrap gap-2">
          {station.connectorTypes.map((type, index) => (
            <span 
              key={index} 
              className={`text-xs ${darkMode ? 'bg-gray-700 text-gray-300' : 'bg-gray-200 text-gray-700'} px-2 py-0.5 rounded-full`}
            >
              {type}
            </span>
          ))}
        </div>
        
        <div className="mt-2 flex justify-between items-center">
          <div className="flex items-center">
            <Zap className="h-3 w-3 mr-1 text-blue-500" />
            <span className={`text-xs ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>{station.chargingSpeed}</span>
          </div>
          <div className="flex items-center">
            <Star className="h-3 w-3 mr-1 text-yellow-500" fill="currentColor" />
            <span className={`text-xs ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>{station.rating}</span>
          </div>
        </div>

        <Link 
          to={`/station/${station.id}`} 
          className={`mt-3 text-xs font-medium text-center block w-full py-1.5 rounded ${darkMode ? 'bg-gray-700 text-white hover:bg-gray-600' : 'bg-gray-100 text-gray-800 hover:bg-gray-200'} transition-colors`}
        >
          View Details
        </Link>
      </div>
    );
  }

  return (
    <div className={`p-6 rounded-lg ${darkMode ? 'bg-gray-800' : 'bg-white'} shadow-lg`}>
      <div className="flex justify-between items-start mb-4">
        <h3 className={`text-xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>{station.name}</h3>
        <span className={`${getAvailabilityColor(station.availability)} ${getAvailabilityBg(station.availability)} text-xs font-medium px-2.5 py-0.5 rounded-full flex items-center`}>
          <span className={`w-2 h-2 ${getAvailabilityColor(station.availability)} rounded-full mr-1.5 animate-pulse`}></span>
          {getAvailabilityText(station.availability)}
        </span>
      </div>
      
      <div className="mb-4">
        <div className={`flex items-center mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
          <MapPin className="h-4 w-4 mr-2" />
          <span>{station.location.address}, {station.location.city}</span>
        </div>
        <div className={`flex items-center ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
          <Clock className="h-4 w-4 mr-2" />
          <span>{station.operatingHours}</span>
        </div>
      </div>
      
      <div className="flex flex-wrap gap-2 mb-4">
        {station.connectorTypes.map((type, index) => (
          <span 
            key={index} 
            className={`text-sm ${darkMode ? 'bg-gray-700 text-gray-300' : 'bg-gray-200 text-gray-700'} px-2.5 py-1 rounded-full`}
          >
            {type}
          </span>
        ))}
      </div>
      
      <div className="grid grid-cols-2 gap-4 mb-4">
        <div>
          <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>Price</p>
          <p className={`text-lg font-semibold ${darkMode ? 'text-white' : 'text-gray-800'}`}>${station.pricePerKWh}/kWh</p>
        </div>
        <div>
          <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>Rating</p>
          <div className="flex items-center">
            <Star className="h-5 w-5 text-yellow-500" fill="currentColor" />
            <span className={`ml-1 ${darkMode ? 'text-white' : 'text-gray-800'}`}>
              {station.rating} <span className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>({station.totalRatings})</span>
            </span>
          </div>
        </div>
        <div>
          <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>Charging Speed</p>
          <p className={`${darkMode ? 'text-white' : 'text-gray-800'}`}>{station.chargingSpeed}</p>
        </div>
        <div>
          <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>Last Updated</p>
          <p className={`${darkMode ? 'text-white' : 'text-gray-800'}`}>{new Date(station.lastUpdated).toLocaleTimeString()}</p>
        </div>
      </div>
      
      <div className="mb-4">
        <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'} mb-1`}>Amenities</p>
        <div className="flex flex-wrap gap-2">
          {station.amenities.map((amenity, index) => (
            <span 
              key={index} 
              className={`text-xs ${darkMode ? 'bg-gray-700 text-gray-300' : 'bg-gray-200 text-gray-700'} px-2 py-1 rounded-full`}
            >
              {amenity}
            </span>
          ))}
        </div>
      </div>
      
      <div className="flex space-x-3">
        <Link 
          to={`/station/${station.id}`} 
          className="flex-1 py-2 px-4 bg-green-500 text-white text-center font-medium rounded-lg hover:bg-green-600 transition-colors"
        >
          View Details
        </Link>
        <button 
          className={`py-2 px-4 ${darkMode ? 'bg-gray-700 text-white hover:bg-gray-600' : 'bg-gray-200 text-gray-800 hover:bg-gray-300'} font-medium rounded-lg transition-colors`}
        >
          Get Directions
        </button>
      </div>
    </div>
  );
};

export default StationCard;