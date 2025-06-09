import React, { createContext, useContext, useState } from 'react';
import { UserProfile } from '../types';

interface UserContextType {
  user: UserProfile | null;
  isLoggedIn: boolean;
  login: (userData: UserProfile) => void;
  logout: () => void;
  updateUserProfile: (updates: Partial<UserProfile>) => void;
}

const defaultUser: UserProfile = {
  id: '1',
  name: 'kollepara chakravarthi',
  email: 'chakri@example.com',
  preferredConnectorTypes: ['Type 2', 'CCS'],
  favoriteBunks: [],
  chargingHistory: [],
  vehicle: {
    make: 'Tesla',
    model: 'Model 3',
    batteryCapacity: 75, // in kWh
    range: 350, // in km
  }
};

const UserContext = createContext<UserContextType>({
  user: null,
  isLoggedIn: false,
  login: () => {},
  logout: () => {},
  updateUserProfile: () => {},
});

export const useUser = () => useContext(UserContext);

interface UserProviderProps {
  children: React.ReactNode;
}

export const UserProvider: React.FC<UserProviderProps> = ({ children }) => {
  const [user, setUser] = useState<UserProfile | null>(defaultUser); // Using demo user for now
  
  const login = (userData: UserProfile) => {
    setUser(userData);
  };

  const logout = () => {
    setUser(null);
  };

  const updateUserProfile = (updates: Partial<UserProfile>) => {
    setUser(prev => prev ? { ...prev, ...updates } : null);
  };

  return (
    <UserContext.Provider 
      value={{ 
        user, 
        isLoggedIn: !!user, 
        login, 
        logout,
        updateUserProfile
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
