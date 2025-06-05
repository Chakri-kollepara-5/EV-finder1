import React from 'react';
import { useTheme } from '../../context/ThemeContext';
import { useStations } from '../../context/StationContext';
import { ChargingSession } from '../../types';
import { Clock, Zap, DollarSign, BatteryCharging } from 'lucide-react';

interface ChargingHistoryCardProps {
  session: ChargingSession;
}

const ChargingHistoryCard: React.FC<ChargingHistoryCardProps> = ({ session }) => {
  const { darkMode } = useTheme();
  const { getStationById } = useStations();
  
  const station = getStationById(session.stationId);
  
  if (!station) {
    return null;
  }
  
  // Calculate the duration in minutes
  const startDate = new Date(session.startTime);
  const endDate = new Date(session.endTime);
  const durationMs = endDate.getTime() - startDate.getTime();
  const durationMinutes = Math.floor(durationMs / 60000);
  
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric', 
      year: 'numeric' 
    });
  };
  
  const formatTime = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleTimeString('en-US', { 
      hour: '2-digit', 
      minute: '2-digit' 
    });
  };

  return (
    <div className={`p-5 rounded-lg ${darkMode ? 'bg-gray-800' : 'bg-white'} shadow-md`}>
      <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4">
        <div>
          <h3 className={`font-semibold ${darkMode ? 'text-white' : 'text-gray-900'}`}>{station.name}</h3>
          <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
            {formatDate(session.startTime)} • {formatTime(session.startTime)}
          </p>
        </div>
        
        <div className="flex flex-wrap gap-4 md:gap-6">
          <div className="flex items-center">
            <Clock className={`h-4 w-4 mr-1.5 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`} />
            <span className={`${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>{durationMinutes} mins</span>
          </div>
          
          <div className="flex items-center">
            <Zap className={`h-4 w-4 mr-1.5 ${darkMode ? 'text-blue-400' : 'text-blue-500'}`} />
            <span className={`${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>{session.kWhCharged} kWh</span>
          </div>
          
          <div className="flex items-center">
            <DollarSign className={`h-4 w-4 mr-1.5 ${darkMode ? 'text-green-400' : 'text-green-500'}`} />
            <span className={`${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>${session.cost.toFixed(2)}</span>
          </div>
          
          <div className="flex items-center">
            <BatteryCharging className={`h-4 w-4 mr-1.5 ${darkMode ? 'text-purple-400' : 'text-purple-500'}`} />
            <span className={`${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>{session.connectorType}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChargingHistoryCard;