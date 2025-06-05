import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';
import { useStations } from '../context/StationContext';
import { useUser } from '../context/UserContext';
import { 
  MapPin, 
  Clock, 
  Zap, 
  Star, 
  DollarSign, 
  Coffee, 
  Wifi, 
  ShoppingBag,
  AlertTriangle,
  Heart,
  Navigation
} from 'lucide-react';
import { CostEstimate } from '../types';

const StationDetailPage: React.FC = () => {
  const { darkMode } = useTheme();
  const { stationId } = useParams<{ stationId: string }>();
  const navigate = useNavigate();
  const { getStationById, loading } = useStations();
  const { user } = useUser();
  
  const [batteryStart, setBatteryStart] = useState(20);
  const [batteryTarget, setBatteryTarget] = useState(80);
  
  const station = stationId ? getStationById(stationId) : undefined;
  
  if (loading) {
    return (
      <div className="pt-20 min-h-screen flex items-center justify-center">
        <p className={darkMode ? 'text-white' : 'text-gray-800'}>Loading station information...</p>
      </div>
    );
  }
  
  if (!station) {
    return (
      <div className="pt-20 min-h-screen flex items-center justify-center">
        <div className={`text-center p-8 rounded-lg ${darkMode ? 'bg-gray-800' : 'bg-white'} shadow-lg max-w-md mx-auto`}>
          <AlertTriangle className={`h-16 w-16 mx-auto mb-4 ${darkMode ? 'text-yellow-400' : 'text-yellow-500'}`} />
          <h2 className={`text-2xl font-bold mb-4 ${darkMode ? 'text-white' : 'text-gray-800'}`}>Station Not Found</h2>
          <p className={`mb-6 ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
            The charging station you're looking for doesn't exist or has been removed.
          </p>
          <button 
            onClick={() => navigate('/map')}
            className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
          >
            Back to Map
          </button>
        </div>
      </div>
    );
  }
  
  // Calculate cost estimate based on user vehicle and inputs
  const calculateCostEstimate = (): CostEstimate | null => {
    if (!user?.vehicle) return null;
    
    const batteryCapacityKwh = user.vehicle.batteryCapacity;
    const kwhNeeded = (batteryCapacityKwh * (batteryTarget - batteryStart)) / 100;
    
    if (kwhNeeded <= 0) return null;
    
    const estimatedCost = kwhNeeded * station.pricePerKWh;
    
    // Estimate charging speed based on station type
    let chargingRateKw = 7; // Default slow charging
    if (station.chargingSpeed.includes('Fast')) {
      chargingRateKw = 50;
    } else if (station.chargingSpeed.includes('Super')) {
      chargingRateKw = 150;
    } else if (station.chargingSpeed.includes('Ultra')) {
      chargingRateKw = 250;
    }
    
    // Calculate time in minutes
    const estimatedMinutes = Math.ceil((kwhNeeded / chargingRateKw) * 60);
    
    return {
      stationId: station.id,
      batteryLevelStart: batteryStart,
      batteryLevelEnd: batteryTarget,
      estimatedKWh: kwhNeeded,
      estimatedCost,
      estimatedDuration: estimatedMinutes
    };
  };
  
  const costEstimate = calculateCostEstimate();

  return (
    <div className="pt-20 pb-10">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          {/* Station header with status */}
          <div className="mb-8 flex justify-between items-start">
            <div>
              <h1 className={`text-3xl font-bold ${darkMode ? 'text-white' : 'text-gray-800'}`}>
                {station.name}
              </h1>
              <div className="flex items-center mt-1">
                <MapPin className={`h-4 w-4 mr-1.5 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`} />
                <p className={`${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                  {station.location.address}, {station.location.city}
                </p>
              </div>
            </div>
            <div className="flex space-x-3">
              <button className={`p-2 rounded-full ${darkMode ? 'bg-gray-700 hover:bg-gray-600' : 'bg-gray-100 hover:bg-gray-200'} transition-colors`}>
                <Heart className="h-5 w-5 text-red-400" />
              </button>
              <button className={`p-2 rounded-full ${darkMode ? 'bg-gray-700 hover:bg-gray-600' : 'bg-gray-100 hover:bg-gray-200'} transition-colors`}>
                <Navigation className="h-5 w-5 text-blue-400" />
              </button>
            </div>
          </div>
          
          {/* Station status */}
          <div className={`p-4 rounded-lg mb-8 flex items-center ${
            station.availability === 'available' 
              ? darkMode ? 'bg-green-900/20 border border-green-800' : 'bg-green-50 border border-green-200'
              : station.availability === 'busy'
                ? darkMode ? 'bg-orange-900/20 border border-orange-800' : 'bg-orange-50 border border-orange-200'
                : darkMode ? 'bg-red-900/20 border border-red-800' : 'bg-red-50 border border-red-200'
          }`}>
            <div className={`h-3 w-3 rounded-full mr-3 ${
              station.availability === 'available' 
                ? 'bg-green-500 animate-pulse' 
                : station.availability === 'busy' 
                  ? 'bg-orange-500 animate-pulse' 
                  : 'bg-red-500 animate-pulse'
            }`}></div>
            <p className={`font-medium ${
              station.availability === 'available' 
                ? darkMode ? 'text-green-400' : 'text-green-700'
                : station.availability === 'busy' 
                  ? darkMode ? 'text-orange-400' : 'text-orange-700'
                  : darkMode ? 'text-red-400' : 'text-red-700'
            }`}>
              This station is currently {
                station.availability === 'available' 
                  ? 'Available' 
                  : station.availability === 'busy' 
                    ? 'Busy' 
                    : 'Experiencing Technical Issues'
              }
            </p>
            <p className={`ml-auto text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
              Last updated: {new Date(station.lastUpdated).toLocaleTimeString()}
            </p>
          </div>
          
          {/* Station details */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
            {/* Left side - Station info */}
            <div className="lg:col-span-2">
              <div className={`p-6 rounded-lg ${darkMode ? 'bg-gray-800' : 'bg-white'} shadow-md mb-6`}>
                <h2 className={`text-xl font-semibold mb-4 ${darkMode ? 'text-white' : 'text-gray-800'}`}>
                  Station Details
                </h2>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
                  <div>
                    <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>Charging Speed</p>
                    <p className={`font-medium flex items-center ${darkMode ? 'text-white' : 'text-gray-800'}`}>
                      <Zap className="h-4 w-4 mr-2 text-blue-500" />
                      {station.chargingSpeed}
                    </p>
                  </div>
                  
                  <div>
                    <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>Price</p>
                    <p className={`font-medium flex items-center ${darkMode ? 'text-white' : 'text-gray-800'}`}>
                      <DollarSign className="h-4 w-4 mr-2 text-green-500" />
                      ${station.pricePerKWh}/kWh
                    </p>
                  </div>
                  
                  <div>
                    <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>Operating Hours</p>
                    <p className={`font-medium flex items-center ${darkMode ? 'text-white' : 'text-gray-800'}`}>
                      <Clock className="h-4 w-4 mr-2 text-purple-500" />
                      {station.operatingHours}
                    </p>
                  </div>
                  
                  <div>
                    <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>Rating</p>
                    <p className={`font-medium flex items-center ${darkMode ? 'text-white' : 'text-gray-800'}`}>
                      <Star className="h-4 w-4 mr-2 text-yellow-500" fill="currentColor" />
                      {station.rating} ({station.totalRatings} reviews)
                    </p>
                  </div>
                </div>
                
                <h3 className={`font-medium mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                  Available Connectors
                </h3>
                <div className="flex flex-wrap gap-2 mb-6">
                  {station.connectorTypes.map((type, index) => (
                    <span 
                      key={index} 
                      className={`px-3 py-1 text-sm rounded-full ${darkMode ? 'bg-blue-900/30 text-blue-400' : 'bg-blue-100 text-blue-700'}`}
                    >
                      {type}
                    </span>
                  ))}
                </div>
                
                <h3 className={`font-medium mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                  Amenities
                </h3>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  {station.amenities.includes('Restrooms') && (
                    <div className={`p-2 rounded flex items-center ${darkMode ? 'bg-gray-700' : 'bg-gray-100'}`}>
                      <div className={`p-1 rounded ${darkMode ? 'bg-gray-600' : 'bg-gray-200'} mr-2`}>
                        <MapPin className="h-4 w-4 text-blue-500" />
                      </div>
                      <span className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>Restrooms</span>
                    </div>
                  )}
                  
                  {station.amenities.includes('Cafe') && (
                    <div className={`p-2 rounded flex items-center ${darkMode ? 'bg-gray-700' : 'bg-gray-100'}`}>
                      <div className={`p-1 rounded ${darkMode ? 'bg-gray-600' : 'bg-gray-200'} mr-2`}>
                        <Coffee className="h-4 w-4 text-orange-500" />
                      </div>
                      <span className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>Cafe</span>
                    </div>
                  )}
                  
                  {station.amenities.includes('Wi-Fi') && (
                    <div className={`p-2 rounded flex items-center ${darkMode ? 'bg-gray-700' : 'bg-gray-100'}`}>
                      <div className={`p-1 rounded ${darkMode ? 'bg-gray-600' : 'bg-gray-200'} mr-2`}>
                        <Wifi className="h-4 w-4 text-green-500" />
                      </div>
                      <span className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>Wi-Fi</span>
                    </div>
                  )}
                  
                  {station.amenities.includes('Shopping') && (
                    <div className={`p-2 rounded flex items-center ${darkMode ? 'bg-gray-700' : 'bg-gray-100'}`}>
                      <div className={`p-1 rounded ${darkMode ? 'bg-gray-600' : 'bg-gray-200'} mr-2`}>
                        <ShoppingBag className="h-4 w-4 text-purple-500" />
                      </div>
                      <span className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>Shopping</span>
                    </div>
                  )}
                </div>
              </div>
            </div>
            
            {/* Right side - Cost estimator */}
            <div className="lg:col-span-1">
              <div className={`p-6 rounded-lg ${darkMode ? 'bg-gray-800' : 'bg-white'} shadow-md mb-6`}>
                <h2 className={`text-xl font-semibold mb-4 ${darkMode ? 'text-white' : 'text-gray-800'}`}>
                  Cost Estimator
                </h2>
                
                {!user?.vehicle ? (
                  <div className={`p-4 rounded-lg ${darkMode ? 'bg-gray-700' : 'bg-gray-100'} text-center`}>
                    <p className={`${darkMode ? 'text-gray-300' : 'text-gray-600'} mb-3`}>
                      Add your vehicle details in your profile to see cost estimates.
                    </p>
                    <button 
                      onClick={() => navigate('/profile')}
                      className="px-4 py-2 bg-blue-500 text-white text-sm rounded-lg hover:bg-blue-600 transition-colors"
                    >
                      Update Profile
                    </button>
                  </div>
                ) : (
                  <>
                    <div className="mb-4">
                      <label className={`block text-sm font-medium mb-1 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                        Current Battery: {batteryStart}%
                      </label>
                      <input
                        type="range"
                        min="0"
                        max="100"
                        value={batteryStart}
                        onChange={(e) => setBatteryStart(Number(e.target.value))}
                        className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                      />
                    </div>
                    
                    <div className="mb-6">
                      <label className={`block text-sm font-medium mb-1 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                        Target Battery: {batteryTarget}%
                      </label>
                      <input
                        type="range"
                        min="0"
                        max="100"
                        value={batteryTarget}
                        onChange={(e) => setBatteryTarget(Number(e.target.value))}
                        className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                      />
                    </div>
                    
                    {costEstimate ? (
                      <div className={`p-4 rounded-lg ${darkMode ? 'bg-gray-700' : 'bg-gray-100'}`}>
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <p className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>Estimated kWh</p>
                            <p className={`font-semibold ${darkMode ? 'text-white' : 'text-gray-800'}`}>
                              {costEstimate.estimatedKWh.toFixed(1)} kWh
                            </p>
                          </div>
                          
                          <div>
                            <p className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>Estimated Cost</p>
                            <p className={`font-semibold ${darkMode ? 'text-white' : 'text-gray-800'}`}>
                              ${costEstimate.estimatedCost.toFixed(2)}
                            </p>
                          </div>
                          
                          <div>
                            <p className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>Charging Time</p>
                            <p className={`font-semibold ${darkMode ? 'text-white' : 'text-gray-800'}`}>
                              {costEstimate.estimatedDuration < 60 
                                ? `${costEstimate.estimatedDuration} min` 
                                : `${Math.floor(costEstimate.estimatedDuration / 60)}h ${costEstimate.estimatedDuration % 60}min`
                              }
                            </p>
                          </div>
                          
                          <div>
                            <p className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>Range Added</p>
                            <p className={`font-semibold ${darkMode ? 'text-white' : 'text-gray-800'}`}>
                              ~{Math.round(user.vehicle.range * (batteryTarget - batteryStart) / 100)} km
                            </p>
                          </div>
                        </div>
                      </div>
                    ) : (
                      <div className={`p-4 rounded-lg ${darkMode ? 'bg-yellow-900/20' : 'bg-yellow-50'} border ${darkMode ? 'border-yellow-800' : 'border-yellow-200'} text-center`}>
                        <p className={`${darkMode ? 'text-yellow-400' : 'text-yellow-700'}`}>
                          Please select valid battery levels (target must be higher than current).
                        </p>
                      </div>
                    )}
                  </>
                )}
              </div>
              
              <div className="flex space-x-3">
                <button 
                  className={`flex-1 py-2 px-4 ${station.availability === 'available' 
                    ? 'bg-green-500 hover:bg-green-600' 
                    : darkMode ? 'bg-gray-700 cursor-not-allowed' : 'bg-gray-300 cursor-not-allowed'
                  } text-white text-center font-medium rounded-lg transition-colors`}
                  disabled={station.availability !== 'available'}
                >
                  {station.availability === 'available' ? 'Reserve Charger' : 'Currently Unavailable'}
                </button>
                <button 
                  className={`py-2 px-4 ${darkMode ? 'bg-gray-700 hover:bg-gray-600' : 'bg-gray-200 hover:bg-gray-300'} font-medium rounded-lg transition-colors`}
                >
                  Get Directions
                </button>
              </div>
            </div>
          </div>
          
          {/* Reviews section placeholder */}
          <div className={`p-6 rounded-lg ${darkMode ? 'bg-gray-800' : 'bg-white'} shadow-md`}>
            <h2 className={`text-xl font-semibold mb-6 ${darkMode ? 'text-white' : 'text-gray-800'}`}>
              User Reviews
            </h2>
            <div className="flex items-center justify-center py-12">
              <div className="text-center">
                <Star className={`h-12 w-12 mx-auto mb-4 ${darkMode ? 'text-gray-600' : 'text-gray-400'}`} />
                <p className={`${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                  Review system coming soon!
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StationDetailPage;