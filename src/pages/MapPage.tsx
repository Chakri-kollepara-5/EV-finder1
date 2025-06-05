import React, { useState } from 'react';
import { useTheme } from '../context/ThemeContext';
import { useStations } from '../context/StationContext';
import { Search, Filter, MapPin } from 'lucide-react';
import StationCard from '../components/Stations/StationCard';
import MapPlaceholder from '../components/Map/MapPlaceholder';
import StationFilters from '../components/Stations/StationFilters';
import { ChargingStation } from '../types';

const MapPage: React.FC = () => {
  const { darkMode } = useTheme();
  const { stations, loading, error } = useStations();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedStation, setSelectedStation] = useState<ChargingStation | null>(null);
  const [showFilters, setShowFilters] = useState(false);
  
  const [filters, setFilters] = useState({
    availability: 'all',
    connectorTypes: [] as string[],
    minRating: 0,
    hasAmenities: false
  });
  
  const handleStationClick = (station: ChargingStation) => {
    setSelectedStation(station);
  };
  
  const filteredStations = stations.filter(station => {
    const matchesSearch = station.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                         station.location.address.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         station.location.city.toLowerCase().includes(searchQuery.toLowerCase());
                         
    const matchesAvailability = filters.availability === 'all' || station.availability === filters.availability;
    
    const matchesConnectors = filters.connectorTypes.length === 0 || 
                             station.connectorTypes.some(type => filters.connectorTypes.includes(type));
                             
    const matchesRating = station.rating >= filters.minRating;
    
    const matchesAmenities = !filters.hasAmenities || station.amenities.length > 0;
    
    return matchesSearch && matchesAvailability && matchesConnectors && matchesRating && matchesAmenities;
  });

  return (
    <div className="pt-16 h-screen flex flex-col">
      {/* Search and filter bar */}
      <div className={`${darkMode ? 'bg-gray-800' : 'bg-white'} border-b ${darkMode ? 'border-gray-700' : 'border-gray-200'} py-4 px-4 md:px-6`}>
        <div className="container mx-auto flex flex-col md:flex-row gap-4">
          <div className={`flex-1 flex items-center ${darkMode ? 'bg-gray-700' : 'bg-gray-100'} rounded-lg px-3`}>
            <Search className={`h-5 w-5 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`} />
            <input
              type="text"
              placeholder="Search for stations, addresses, or cities..."
              className={`w-full px-2 py-2 ${darkMode ? 'bg-gray-700 text-white' : 'bg-gray-100 text-gray-800'} focus:outline-none`}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <button 
            className={`px-4 py-2 ${darkMode ? 'bg-gray-700 hover:bg-gray-600' : 'bg-gray-100 hover:bg-gray-200'} rounded-lg flex items-center justify-center transition-colors`}
            onClick={() => setShowFilters(!showFilters)}
          >
            <Filter className="h-5 w-5 mr-2" />
            Filters
          </button>
        </div>
        
        {/* Filter panel */}
        {showFilters && (
          <div className="container mx-auto mt-4">
            <StationFilters filters={filters} setFilters={setFilters} />
          </div>
        )}
      </div>

      {/* Map and list view */}
      <div className="flex-1 grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-0 overflow-hidden">
        {/* Station list sidebar */}
        <div className={`md:col-span-1 overflow-y-auto ${darkMode ? 'bg-gray-900' : 'bg-gray-50'} border-r ${darkMode ? 'border-gray-700' : 'border-gray-200'}`}>
          <div className="p-4">
            <h2 className={`text-lg font-semibold mb-4 ${darkMode ? 'text-white' : 'text-gray-800'}`}>
              {filteredStations.length} Stations Found
            </h2>
            
            {loading && (
              <div className={`flex justify-center py-8 ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                Loading stations...
              </div>
            )}
            
            {error && (
              <div className="bg-red-100 text-red-800 p-4 rounded-lg">
                {error}
              </div>
            )}
            
            {!loading && !error && filteredStations.length === 0 && (
              <div className={`text-center py-8 ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                <MapPin className="h-12 w-12 mx-auto mb-4 opacity-50" />
                <p>No stations found matching your criteria.</p>
                <p className="mt-2">Try adjusting your filters or search query.</p>
              </div>
            )}
            
            <div className="space-y-4">
              {filteredStations.map(station => (
                <div 
                  key={station.id} 
                  className={`cursor-pointer ${selectedStation?.id === station.id ? `${darkMode ? 'ring-2 ring-green-500 bg-gray-800' : 'ring-2 ring-green-500 bg-white'}` : ''}`}
                  onClick={() => handleStationClick(station)}
                >
                  <StationCard station={station} compact={true} />
                </div>
              ))}
            </div>
          </div>
        </div>
        
        {/* Map view */}
        <div className="md:col-span-2 lg:col-span-3 min-h-[50vh]">
          <MapPlaceholder selectedStation={selectedStation} stations={filteredStations} />
        </div>
      </div>
    </div>
  );
};

export default MapPage;