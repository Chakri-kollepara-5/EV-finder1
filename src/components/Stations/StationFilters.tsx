import React from 'react';
import { useTheme } from '../../context/ThemeContext';
import { Star } from 'lucide-react';

interface FiltersState {
  availability: string;
  connectorTypes: string[];
  minRating: number;
  hasAmenities: boolean;
}

interface StationFiltersProps {
  filters: FiltersState;
  setFilters: React.Dispatch<React.SetStateAction<FiltersState>>;
}

const StationFilters: React.FC<StationFiltersProps> = ({ filters, setFilters }) => {
  const { darkMode } = useTheme();
  
  const connectorOptions = ['Type 2', 'CCS', 'CHAdeMO', 'Tesla'];
  
  const handleConnectorChange = (connector: string) => {
    if (filters.connectorTypes.includes(connector)) {
      setFilters({
        ...filters,
        connectorTypes: filters.connectorTypes.filter(type => type !== connector)
      });
    } else {
      setFilters({
        ...filters,
        connectorTypes: [...filters.connectorTypes, connector]
      });
    }
  };
  
  const handleClearFilters = () => {
    setFilters({
      availability: 'all',
      connectorTypes: [],
      minRating: 0,
      hasAmenities: false
    });
  };
  
  return (
    <div className={`p-4 rounded-lg ${darkMode ? 'bg-gray-800' : 'bg-white'} shadow-md`}>
      <div className="flex justify-between items-center mb-4">
        <h3 className={`font-semibold ${darkMode ? 'text-white' : 'text-gray-800'}`}>Filter Stations</h3>
        <button 
          className={`text-sm ${darkMode ? 'text-blue-400 hover:text-blue-300' : 'text-blue-600 hover:text-blue-800'}`}
          onClick={handleClearFilters}
        >
          Clear All
        </button>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {/* Availability Filter */}
        <div>
          <label className={`block mb-2 text-sm font-medium ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
            Availability
          </label>
          <select 
            className={`w-full p-2 rounded-md ${darkMode ? 'bg-gray-700 text-white border-gray-600' : 'bg-gray-50 text-gray-900 border-gray-300'} border`}
            value={filters.availability}
            onChange={(e) => setFilters({...filters, availability: e.target.value})}
          >
            <option value="all">All Stations</option>
            <option value="available">Available</option>
            <option value="busy">Busy</option>
            <option value="faulty">Faulty</option>
          </select>
        </div>
        
        {/* Connector Types Filter */}
        <div>
          <label className={`block mb-2 text-sm font-medium ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
            Connector Types
          </label>
          <div className="flex flex-wrap gap-2">
            {connectorOptions.map(connector => (
              <button
                key={connector}
                className={`px-3 py-1 text-sm rounded-full ${
                  filters.connectorTypes.includes(connector) 
                    ? 'bg-green-500 text-white' 
                    : darkMode 
                      ? 'bg-gray-700 text-gray-300 hover:bg-gray-600' 
                      : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                } transition-colors`}
                onClick={() => handleConnectorChange(connector)}
              >
                {connector}
              </button>
            ))}
          </div>
        </div>
        
        {/* Rating Filter */}
        <div>
          <label className={`block mb-2 text-sm font-medium ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
            Minimum Rating
          </label>
          <div className="flex items-center space-x-1">
            {[1, 2, 3, 4, 5].map(rating => (
              <button
                key={rating}
                className={`p-1 ${rating <= filters.minRating ? 'text-yellow-400' : darkMode ? 'text-gray-600' : 'text-gray-300'}`}
                onClick={() => setFilters({...filters, minRating: rating})}
              >
                <Star className="h-6 w-6" fill={rating <= filters.minRating ? 'currentColor' : 'none'} />
              </button>
            ))}
          </div>
        </div>
        
        {/* Amenities Filter */}
        <div>
          <label className={`block mb-2 text-sm font-medium ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
            Amenities
          </label>
          <div className="flex items-center">
            <input
              id="hasAmenities"
              type="checkbox"
              className="w-4 h-4 rounded"
              checked={filters.hasAmenities}
              onChange={(e) => setFilters({...filters, hasAmenities: e.target.checked})}
            />
            <label htmlFor="hasAmenities" className={`ml-2 text-sm ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
              Has amenities (restroom, cafe, etc.)
            </label>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StationFilters;