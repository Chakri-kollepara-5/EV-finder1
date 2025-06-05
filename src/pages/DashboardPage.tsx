import React from 'react';
import { useTheme } from '../context/ThemeContext';
import { useUser } from '../context/UserContext';
import { useStations } from '../context/StationContext';
import { BarChart3, Zap, MapPin, Clock } from 'lucide-react';
import ChargingHistoryCard from '../components/Dashboard/ChargingHistoryCard';
import StationStatusOverview from '../components/Dashboard/StationStatusOverview';
import CostAnalysisChart from '../components/Dashboard/CostAnalysisChart';

const DashboardPage: React.FC = () => {
  const { darkMode } = useTheme();
  const { user } = useUser();
  const { stations } = useStations();

  if (!user) {
    return (
      <div className="pt-20 min-h-screen flex items-center justify-center">
        <div className={`text-center p-8 rounded-lg ${darkMode ? 'bg-gray-800 text-white' : 'bg-white text-gray-800'} shadow-lg max-w-md mx-auto`}>
          <h2 className="text-2xl font-bold mb-4">You need to be logged in</h2>
          <p className="mb-6">Please log in to access your dashboard.</p>
          <button className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors">
            Log In
          </button>
        </div>
      </div>
    );
  }

  // This would normally be calculated from actual data
  const stats = {
    totalSessions: user.chargingHistory.length,
    totalSpent: user.chargingHistory.reduce((sum, session) => sum + session.cost, 0),
    kwhCharged: user.chargingHistory.reduce((sum, session) => sum + session.kWhCharged, 0),
    favoriteStation: stations.length > 0 ? stations[0].name : 'Not available'
  };

  return (
    <div className="pt-20 pb-10">
      <div className="container mx-auto px-4">
        <div className="mb-8">
          <h1 className={`text-3xl font-bold mb-2 ${darkMode ? 'text-white' : 'text-gray-800'}`}>
            Dashboard
          </h1>
          <p className={`${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
            Welcome back, {user.name}! Here's your charging overview.
          </p>
        </div>

        {/* Stats cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className={`p-6 rounded-lg ${darkMode ? 'bg-gray-800' : 'bg-white'} shadow-md`}>
            <div className="flex items-center justify-between mb-4">
              <h3 className={`font-medium ${darkMode ? 'text-gray-300' : 'text-gray-500'}`}>Total Sessions</h3>
              <Zap className="h-5 w-5 text-blue-500" />
            </div>
            <p className={`text-2xl font-bold ${darkMode ? 'text-white' : 'text-gray-800'}`}>{stats.totalSessions}</p>
            <p className={`text-sm ${darkMode ? 'text-green-400' : 'text-green-600'}`}>+3 from last month</p>
          </div>
          
          <div className={`p-6 rounded-lg ${darkMode ? 'bg-gray-800' : 'bg-white'} shadow-md`}>
            <div className="flex items-center justify-between mb-4">
              <h3 className={`font-medium ${darkMode ? 'text-gray-300' : 'text-gray-500'}`}>Total Spent</h3>
              <BarChart3 className="h-5 w-5 text-purple-500" />
            </div>
            <p className={`text-2xl font-bold ${darkMode ? 'text-white' : 'text-gray-800'}`}>${stats.totalSpent.toFixed(2)}</p>
            <p className={`text-sm ${darkMode ? 'text-green-400' : 'text-green-600'}`}>-8% from last month</p>
          </div>
          
          <div className={`p-6 rounded-lg ${darkMode ? 'bg-gray-800' : 'bg-white'} shadow-md`}>
            <div className="flex items-center justify-between mb-4">
              <h3 className={`font-medium ${darkMode ? 'text-gray-300' : 'text-gray-500'}`}>kWh Charged</h3>
              <Clock className="h-5 w-5 text-orange-500" />
            </div>
            <p className={`text-2xl font-bold ${darkMode ? 'text-white' : 'text-gray-800'}`}>{stats.kwhCharged.toFixed(1)} kWh</p>
            <p className={`text-sm ${darkMode ? 'text-red-400' : 'text-red-600'}`}>+12% from last month</p>
          </div>
          
          <div className={`p-6 rounded-lg ${darkMode ? 'bg-gray-800' : 'bg-white'} shadow-md`}>
            <div className="flex items-center justify-between mb-4">
              <h3 className={`font-medium ${darkMode ? 'text-gray-300' : 'text-gray-500'}`}>Favorite Station</h3>
              <MapPin className="h-5 w-5 text-green-500" />
            </div>
            <p className={`text-lg font-bold ${darkMode ? 'text-white' : 'text-gray-800'}`}>{stats.favoriteStation}</p>
            <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>5 visits this month</p>
          </div>
        </div>
        
        {/* Cost analysis chart */}
        <div className={`p-6 rounded-lg ${darkMode ? 'bg-gray-800' : 'bg-white'} shadow-md mb-8`}>
          <h3 className={`text-xl font-bold mb-4 ${darkMode ? 'text-white' : 'text-gray-800'}`}>
            Charging Cost Analysis
          </h3>
          <CostAnalysisChart />
        </div>
        
        {/* Station status */}
        <div className="mb-8">
          <h3 className={`text-xl font-bold mb-4 ${darkMode ? 'text-white' : 'text-gray-800'}`}>
            Station Status Overview
          </h3>
          <StationStatusOverview />
        </div>
        
        {/* Recent charging history */}
        <div>
          <h3 className={`text-xl font-bold mb-4 ${darkMode ? 'text-white' : 'text-gray-800'}`}>
            Recent Charging History
          </h3>
          <div className="space-y-4">
            {user.chargingHistory.length > 0 ? (
              user.chargingHistory.map(session => (
                <ChargingHistoryCard key={session.id} session={session} />
              ))
            ) : (
              <div className={`text-center p-6 rounded-lg ${darkMode ? 'bg-gray-800' : 'bg-gray-100'}`}>
                <p className={`${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                  No charging history available yet.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;