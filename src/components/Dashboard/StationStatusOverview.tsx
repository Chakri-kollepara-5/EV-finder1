import React from 'react';
import { useTheme } from '../../context/ThemeContext';
import { useStations } from '../../context/StationContext';
import { Battery, AlertTriangle, CheckCircle } from 'lucide-react';

const StationStatusOverview: React.FC = () => {
  const { darkMode } = useTheme();
  const { stations, loading } = useStations();
  
  if (loading) {
    return (
      <div className={`p-6 rounded-lg ${darkMode ? 'bg-gray-800' : 'bg-white'} shadow-md text-center`}>
        Loading station status...
      </div>
    );
  }
  
  const availableCount = stations.filter(s => s.availability === 'available').length;
  const busyCount = stations.filter(s => s.availability === 'busy').length;
  const faultyCount = stations.filter(s => s.availability === 'faulty').length;
  
  const availablePercentage = (availableCount / stations.length) * 100;
  const busyPercentage = (busyCount / stations.length) * 100;
  const faultyPercentage = (faultyCount / stations.length) * 100;
  
  return (
    <div className={`p-6 rounded-lg ${darkMode ? 'bg-gray-800' : 'bg-white'} shadow-md`}>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Available Stations */}
        <div className={`p-4 rounded-lg ${darkMode ? 'bg-green-900/20' : 'bg-green-50'} border ${darkMode ? 'border-green-800' : 'border-green-200'}`}>
          <div className="flex items-center mb-2">
            <div className={`p-2 rounded-full ${darkMode ? 'bg-green-900/30' : 'bg-green-100'}`}>
              <CheckCircle className="h-6 w-6 text-green-500" />
            </div>
            <h4 className={`ml-2 font-medium ${darkMode ? 'text-green-400' : 'text-green-800'}`}>Available</h4>
          </div>
          <div className="flex items-end justify-between">
            <p className={`text-3xl font-bold ${darkMode ? 'text-green-400' : 'text-green-700'}`}>{availableCount}</p>
            <p className={`text-sm ${darkMode ? 'text-green-500/80' : 'text-green-600'}`}>{availablePercentage.toFixed(0)}% of total</p>
          </div>
          <div className="mt-2 h-2 w-full bg-gray-200 rounded-full overflow-hidden">
            <div className="bg-green-500 h-full rounded-full" style={{ width: `${availablePercentage}%` }}></div>
          </div>
        </div>
        
        {/* Busy Stations */}
        <div className={`p-4 rounded-lg ${darkMode ? 'bg-orange-900/20' : 'bg-orange-50'} border ${darkMode ? 'border-orange-800' : 'border-orange-200'}`}>
          <div className="flex items-center mb-2">
            <div className={`p-2 rounded-full ${darkMode ? 'bg-orange-900/30' : 'bg-orange-100'}`}>
              <Battery className="h-6 w-6 text-orange-500" />
            </div>
            <h4 className={`ml-2 font-medium ${darkMode ? 'text-orange-400' : 'text-orange-800'}`}>Busy</h4>
          </div>
          <div className="flex items-end justify-between">
            <p className={`text-3xl font-bold ${darkMode ? 'text-orange-400' : 'text-orange-700'}`}>{busyCount}</p>
            <p className={`text-sm ${darkMode ? 'text-orange-500/80' : 'text-orange-600'}`}>{busyPercentage.toFixed(0)}% of total</p>
          </div>
          <div className="mt-2 h-2 w-full bg-gray-200 rounded-full overflow-hidden">
            <div className="bg-orange-500 h-full rounded-full" style={{ width: `${busyPercentage}%` }}></div>
          </div>
        </div>
        
        {/* Faulty Stations */}
        <div className={`p-4 rounded-lg ${darkMode ? 'bg-red-900/20' : 'bg-red-50'} border ${darkMode ? 'border-red-800' : 'border-red-200'}`}>
          <div className="flex items-center mb-2">
            <div className={`p-2 rounded-full ${darkMode ? 'bg-red-900/30' : 'bg-red-100'}`}>
              <AlertTriangle className="h-6 w-6 text-red-500" />
            </div>
            <h4 className={`ml-2 font-medium ${darkMode ? 'text-red-400' : 'text-red-800'}`}>Faulty</h4>
          </div>
          <div className="flex items-end justify-between">
            <p className={`text-3xl font-bold ${darkMode ? 'text-red-400' : 'text-red-700'}`}>{faultyCount}</p>
            <p className={`text-sm ${darkMode ? 'text-red-500/80' : 'text-red-600'}`}>{faultyPercentage.toFixed(0)}% of total</p>
          </div>
          <div className="mt-2 h-2 w-full bg-gray-200 rounded-full overflow-hidden">
            <div className="bg-red-500 h-full rounded-full" style={{ width: `${faultyPercentage}%` }}></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StationStatusOverview;