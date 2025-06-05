import React, { useState } from 'react';
import { useTheme } from '../context/ThemeContext';
import { useUser } from '../context/UserContext';
import { User, Settings, Car, Clock, Save } from 'lucide-react';

const ProfilePage: React.FC = () => {
  const { darkMode } = useTheme();
  const { user, updateUserProfile } = useUser();
  const [isEditing, setIsEditing] = useState(false);
  
  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    vehicleMake: user?.vehicle?.make || '',
    vehicleModel: user?.vehicle?.model || '',
    batteryCapacity: user?.vehicle?.batteryCapacity || 0,
    vehicleRange: user?.vehicle?.range || 0,
    connectorTypes: user?.preferredConnectorTypes || []
  });
  
  if (!user) {
    return (
      <div className="pt-20 min-h-screen flex items-center justify-center">
        <div className={`text-center p-8 rounded-lg ${darkMode ? 'bg-gray-800 text-white' : 'bg-white text-gray-800'} shadow-lg max-w-md mx-auto`}>
          <h2 className="text-2xl font-bold mb-4">You need to be logged in</h2>
          <p className="mb-6">Please log in to access your profile.</p>
          <button className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors">
            Log In
          </button>
        </div>
      </div>
    );
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };
  
  const handleConnectorChange = (connectorType: string) => {
    setFormData(prev => {
      const updatedConnectors = prev.connectorTypes.includes(connectorType)
        ? prev.connectorTypes.filter(type => type !== connectorType)
        : [...prev.connectorTypes, connectorType];
      
      return {
        ...prev,
        connectorTypes: updatedConnectors
      };
    });
  };
  
  const handleSave = () => {
    updateUserProfile({
      name: formData.name,
      email: formData.email,
      preferredConnectorTypes: formData.connectorTypes,
      vehicle: {
        make: formData.vehicleMake,
        model: formData.vehicleModel,
        batteryCapacity: Number(formData.batteryCapacity),
        range: Number(formData.vehicleRange)
      }
    });
    
    setIsEditing(false);
  };

  return (
    <div className="pt-20 pb-10">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <div className="mb-8 flex justify-between items-center">
            <h1 className={`text-3xl font-bold ${darkMode ? 'text-white' : 'text-gray-800'}`}>
              My Profile
            </h1>
            <button 
              className={`px-4 py-2 rounded-lg ${darkMode ? 'bg-gray-700 hover:bg-gray-600' : 'bg-gray-200 hover:bg-gray-300'} flex items-center`}
              onClick={() => setIsEditing(!isEditing)}
            >
              {isEditing ? (
                <>
                  <Save className="h-4 w-4 mr-2" />
                  <span>View Mode</span>
                </>
              ) : (
                <>
                  <Settings className="h-4 w-4 mr-2" />
                  <span>Edit Profile</span>
                </>
              )}
            </button>
          </div>

          <div className={`p-8 rounded-lg ${darkMode ? 'bg-gray-800' : 'bg-white'} shadow-lg mb-8`}>
            <div className="flex flex-col md:flex-row">
              <div className={`w-full md:w-1/3 mb-6 md:mb-0 md:pr-8 ${darkMode ? 'md:border-r border-gray-700' : 'md:border-r border-gray-200'}`}>
                <div className="text-center">
                  <div className={`h-32 w-32 rounded-full flex items-center justify-center mx-auto ${darkMode ? 'bg-gray-700' : 'bg-gray-200'}`}>
                    <User className={`h-16 w-16 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`} />
                  </div>
                  <h2 className={`text-xl font-semibold mt-4 ${darkMode ? 'text-white' : 'text-gray-800'}`}>
                    {user.name}
                  </h2>
                  <p className={`${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>{user.email}</p>
                  
                  <div className="mt-6">
                    <h3 className={`font-medium mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                      Preferred Connectors
                    </h3>
                    <div className="flex flex-wrap justify-center gap-2">
                      {user.preferredConnectorTypes.map((type, index) => (
                        <span 
                          key={index} 
                          className={`px-2 py-1 text-xs rounded-full ${darkMode ? 'bg-blue-900/30 text-blue-400' : 'bg-blue-100 text-blue-700'}`}
                        >
                          {type}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="w-full md:w-2/3 md:pl-8">
                {isEditing ? (
                  <div className="space-y-6">
                    <div>
                      <label className={`block text-sm font-medium mb-1 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                        Full Name
                      </label>
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        className={`w-full px-3 py-2 rounded-md ${darkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-gray-50 border-gray-300 text-gray-900'} border`}
                      />
                    </div>
                    
                    <div>
                      <label className={`block text-sm font-medium mb-1 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                        Email
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        className={`w-full px-3 py-2 rounded-md ${darkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-gray-50 border-gray-300 text-gray-900'} border`}
                      />
                    </div>
                    
                    <div>
                      <label className={`block text-sm font-medium mb-1 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                        Preferred Connector Types
                      </label>
                      <div className="flex flex-wrap gap-2">
                        {['Type 2', 'CCS', 'CHAdeMO', 'Tesla'].map((type) => (
                          <button
                            key={type}
                            type="button"
                            onClick={() => handleConnectorChange(type)}
                            className={`px-3 py-1.5 text-sm rounded-full ${
                              formData.connectorTypes.includes(type)
                                ? 'bg-blue-500 text-white' 
                                : darkMode 
                                  ? 'bg-gray-700 text-gray-300 hover:bg-gray-600' 
                                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                            }`}
                          >
                            {type}
                          </button>
                        ))}
                      </div>
                    </div>
                    
                    <div>
                      <h3 className={`text-lg font-medium mb-3 ${darkMode ? 'text-white' : 'text-gray-800'} flex items-center`}>
                        <Car className="h-5 w-5 mr-2" />
                        Vehicle Information
                      </h3>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label className={`block text-sm font-medium mb-1 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                            Make
                          </label>
                          <input
                            type="text"
                            name="vehicleMake"
                            value={formData.vehicleMake}
                            onChange={handleInputChange}
                            className={`w-full px-3 py-2 rounded-md ${darkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-gray-50 border-gray-300 text-gray-900'} border`}
                          />
                        </div>
                        
                        <div>
                          <label className={`block text-sm font-medium mb-1 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                            Model
                          </label>
                          <input
                            type="text"
                            name="vehicleModel"
                            value={formData.vehicleModel}
                            onChange={handleInputChange}
                            className={`w-full px-3 py-2 rounded-md ${darkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-gray-50 border-gray-300 text-gray-900'} border`}
                          />
                        </div>
                        
                        <div>
                          <label className={`block text-sm font-medium mb-1 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                            Battery Capacity (kWh)
                          </label>
                          <input
                            type="number"
                            name="batteryCapacity"
                            value={formData.batteryCapacity}
                            onChange={handleInputChange}
                            className={`w-full px-3 py-2 rounded-md ${darkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-gray-50 border-gray-300 text-gray-900'} border`}
                          />
                        </div>
                        
                        <div>
                          <label className={`block text-sm font-medium mb-1 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                            Range (km)
                          </label>
                          <input
                            type="number"
                            name="vehicleRange"
                            value={formData.vehicleRange}
                            onChange={handleInputChange}
                            className={`w-full px-3 py-2 rounded-md ${darkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-gray-50 border-gray-300 text-gray-900'} border`}
                          />
                        </div>
                      </div>
                    </div>
                    
                    <div className="mt-8">
                      <button 
                        onClick={handleSave}
                        className="px-6 py-2 bg-green-500 text-white font-medium rounded-lg hover:bg-green-600 transition-colors"
                      >
                        Save Changes
                      </button>
                    </div>
                  </div>
                ) : (
                  <div>
                    <h3 className={`text-lg font-medium mb-4 ${darkMode ? 'text-white' : 'text-gray-800'} flex items-center`}>
                      <Car className="h-5 w-5 mr-2" />
                      Vehicle Information
                    </h3>
                    <div className={`grid grid-cols-2 gap-4 p-4 rounded-lg mb-6 ${darkMode ? 'bg-gray-700' : 'bg-gray-100'}`}>
                      <div>
                        <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>Make</p>
                        <p className={`font-medium ${darkMode ? 'text-white' : 'text-gray-800'}`}>{user.vehicle?.make || 'Not specified'}</p>
                      </div>
                      <div>
                        <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>Model</p>
                        <p className={`font-medium ${darkMode ? 'text-white' : 'text-gray-800'}`}>{user.vehicle?.model || 'Not specified'}</p>
                      </div>
                      <div>
                        <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>Battery Capacity</p>
                        <p className={`font-medium ${darkMode ? 'text-white' : 'text-gray-800'}`}>{user.vehicle?.batteryCapacity || 0} kWh</p>
                      </div>
                      <div>
                        <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>Range</p>
                        <p className={`font-medium ${darkMode ? 'text-white' : 'text-gray-800'}`}>{user.vehicle?.range || 0} km</p>
                      </div>
                    </div>
                    
                    <h3 className={`text-lg font-medium mb-4 ${darkMode ? 'text-white' : 'text-gray-800'} flex items-center`}>
                      <Clock className="h-5 w-5 mr-2" />
                      Charging Stats
                    </h3>
                    <div className={`grid grid-cols-3 gap-4 p-4 rounded-lg ${darkMode ? 'bg-gray-700' : 'bg-gray-100'}`}>
                      <div>
                        <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>Total Sessions</p>
                        <p className={`font-medium ${darkMode ? 'text-white' : 'text-gray-800'}`}>{user.chargingHistory.length}</p>
                      </div>
                      <div>
                        <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>Favorite Stations</p>
                        <p className={`font-medium ${darkMode ? 'text-white' : 'text-gray-800'}`}>{user.favoriteBunks.length}</p>
                      </div>
                      <div>
                        <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>Total kWh Charged</p>
                        <p className={`font-medium ${darkMode ? 'text-white' : 'text-gray-800'}`}>
                          {user.chargingHistory.reduce((sum, session) => sum + session.kWhCharged, 0).toFixed(1)} kWh
                        </p>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;