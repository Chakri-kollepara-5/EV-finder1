import React from 'react';
import { useTheme } from '../../context/ThemeContext';
import { MapPin } from 'lucide-react';
import { ChargingStation } from '../../types';

interface MapPlaceholderProps {
  stations: ChargingStation[];
  selectedStation: ChargingStation | null;
}

const MapPlaceholder: React.FC<MapPlaceholderProps> = ({ stations, selectedStation }) => {
  const { darkMode } = useTheme();
  
  // This would be replaced with an actual map implementation
  // For now, it's just a placeholder showing where the map would be
  
  return (
    <div className={`w-full h-full flex items-center justify-center ${darkMode ? 'bg-gray-800' : 'bg-gray-200'}`}>
      <div className="text-center max-w-lg p-6">
        <MapPin className={`h-16 w-16 mx-auto mb-4 ${darkMode ? 'text-blue-400' : 'text-blue-500'}`} />
        <h3 className={`text-2xl font-bold mb-2 ${darkMode ? 'text-white' : 'text-gray-800'}`}>
          Map Integration Coming Soon
        </h3>
        <p className={`${darkMode ? 'text-gray-300' : 'text-gray-600'} mb-4`}>
          This is where the interactive map will be displayed, showing {stations.length} charging stations.
          {selectedStation && (
            <span> Currently focused on: <strong>{selectedStation.name}</strong></span>
          )}
        </p>
        <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
          In the full implementation, this would be an interactive map with station markers.
        </p>
      </div>
    </div>
  );
};

export default MapPlaceholder;