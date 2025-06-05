import React, { createContext, useContext, useState, useEffect } from 'react';
import { ChargingStation } from '../types';
import { mockStations } from '../data/mockData';

interface StationContextType {
  stations: ChargingStation[];
  loading: boolean;
  error: string | null;
  refreshStations: () => void;
  getStationById: (id: string) => ChargingStation | undefined;
  getNearbyStations: (lat: number, lng: number, radius: number) => ChargingStation[];
  updateStationAvailability: (stationId: string, availability: 'available' | 'busy' | 'faulty') => void;
}

const StationContext = createContext<StationContextType>({
  stations: [],
  loading: false,
  error: null,
  refreshStations: () => {},
  getStationById: () => undefined,
  getNearbyStations: () => [],
  updateStationAvailability: () => {},
});

export const useStations = () => useContext(StationContext);

interface StationProviderProps {
  children: React.ReactNode;
}

export const StationProvider: React.FC<StationProviderProps> = ({ children }) => {
  const [stations, setStations] = useState<ChargingStation[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Simulate fetching stations from an API
  const fetchStations = () => {
    setLoading(true);
    setError(null);
    
    // Simulate API call with timeout
    setTimeout(() => {
      try {
        setStations(mockStations);
        setLoading(false);
      } catch (err) {
        setError('Failed to load charging stations');
        setLoading(false);
      }
    }, 1000);
  };

  useEffect(() => {
    fetchStations();
  }, []);

  const refreshStations = () => {
    fetchStations();
  };

  const getStationById = (id: string): ChargingStation | undefined => {
    return stations.find(station => station.id === id);
  };

  const getNearbyStations = (lat: number, lng: number, radius: number): ChargingStation[] => {
    // Simple distance calculation (not accounting for Earth's curvature)
    return stations.filter(station => {
      const distance = Math.sqrt(
        Math.pow(station.location.lat - lat, 2) + 
        Math.pow(station.location.lng - lng, 2)
      );
      // Convert to approximate kilometers (very rough approximation)
      const kmDistance = distance * 111;
      return kmDistance <= radius;
    });
  };

  const updateStationAvailability = (stationId: string, availability: 'available' | 'busy' | 'faulty') => {
    setStations(prevStations => 
      prevStations.map(station => 
        station.id === stationId 
          ? { ...station, availability } 
          : station
      )
    );
  };

  return (
    <StationContext.Provider 
      value={{ 
        stations, 
        loading, 
        error, 
        refreshStations,
        getStationById,
        getNearbyStations,
        updateStationAvailability
      }}
    >
      {children}
    </StationContext.Provider>
  );
};