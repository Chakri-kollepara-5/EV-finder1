// User Types
export interface UserVehicle {
  make: string;
  model: string;
  batteryCapacity: number; // in kWh
  range: number; // in km
}

export interface ChargingSession {
  id: string;
  stationId: string;
  startTime: string;
  endTime: string;
  kWhCharged: number;
  cost: number;
  connectorType: string;
}

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  preferredConnectorTypes: string[];
  favoriteBunks: string[]; // station IDs
  chargingHistory: ChargingSession[];
  vehicle?: UserVehicle;
}

// Station Types
export interface Location {
  address: string;
  city: string;
  lat: number;
  lng: number;
}

export type AvailabilityStatus = 'available' | 'busy' | 'faulty';

export interface ChargingStation {
  id: string;
  name: string;
  location: Location;
  connectorTypes: string[];
  pricePerKWh: number;
  availability: AvailabilityStatus;
  rating: number;
  totalRatings: number;
  amenities: string[];
  operatingHours: string;
  chargingSpeed: string; // e.g., "Fast (50kW)", "Standard (22kW)"
  lastUpdated: string; // ISO date string
}

export interface UserReview {
  id: string;
  userId: string;
  stationId: string;
  rating: number;
  comment: string;
  createdAt: string;
}

// Cost Estimation
export interface CostEstimate {
  stationId: string;
  batteryLevelStart: number; // percentage
  batteryLevelEnd: number; // percentage
  estimatedKWh: number;
  estimatedCost: number;
  estimatedDuration: number; // in minutes
}