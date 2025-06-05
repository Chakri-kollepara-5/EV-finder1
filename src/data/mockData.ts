import { ChargingStation, ChargingSession } from '../types';

export const mockStations: ChargingStation[] = [
  {
    id: '1',
    name: 'Central City EV Hub',
    location: {
      address: '123 Main St, Downtown',
      city: 'Metropolis',
      lat: 40.7128,
      lng: -74.0060
    },
    connectorTypes: ['Type 2', 'CCS', 'CHAdeMO'],
    pricePerKWh: 0.35,
    availability: 'available',
    rating: 4.7,
    totalRatings: 241,
    amenities: ['Restrooms', 'Cafe', 'Wi-Fi'],
    operatingHours: '24/7',
    chargingSpeed: 'Fast (50kW)',
    lastUpdated: new Date().toISOString()
  },
  {
    id: '2',
    name: 'GreenCharge Station',
    location: {
      address: '456 Park Ave, Uptown',
      city: 'Metropolis',
      lat: 40.7148,
      lng: -74.0028
    },
    connectorTypes: ['Type 2', 'CCS'],
    pricePerKWh: 0.40,
    availability: 'busy',
    rating: 4.2,
    totalRatings: 158,
    amenities: ['Restrooms', 'Shopping'],
    operatingHours: '6:00 AM - 10:00 PM',
    chargingSpeed: 'Super Fast (150kW)',
    lastUpdated: new Date().toISOString()
  },
  {
    id: '3',
    name: 'EcoCharge Plus',
    location: {
      address: '789 Broadway, Midtown',
      city: 'Metropolis',
      lat: 40.7168,
      lng: -74.0090
    },
    connectorTypes: ['Type 2'],
    pricePerKWh: 0.30,
    availability: 'available',
    rating: 3.9,
    totalRatings: 92,
    amenities: ['Wi-Fi'],
    operatingHours: '7:00 AM - 9:00 PM',
    chargingSpeed: 'Standard (22kW)',
    lastUpdated: new Date().toISOString()
  },
  {
    id: '4',
    name: 'TeslaSupercharge',
    location: {
      address: '321 Highway Dr, East Side',
      city: 'Metropolis',
      lat: 40.7220,
      lng: -73.9950
    },
    connectorTypes: ['Tesla'],
    pricePerKWh: 0.32,
    availability: 'faulty',
    rating: 4.9,
    totalRatings: 387,
    amenities: ['Restrooms', 'Cafe', 'Wi-Fi', 'Shopping'],
    operatingHours: '24/7',
    chargingSpeed: 'Ultra Fast (250kW)',
    lastUpdated: new Date().toISOString()
  },
  {
    id: '5',
    name: 'Community Charging Hub',
    location: {
      address: '555 Residential Ln, Suburbs',
      city: 'Metropolis',
      lat: 40.7048,
      lng: -74.0134
    },
    connectorTypes: ['Type 2', 'CCS'],
    pricePerKWh: 0.28,
    availability: 'available',
    rating: 4.1,
    totalRatings: 63,
    amenities: ['Restrooms'],
    operatingHours: '6:00 AM - 11:00 PM',
    chargingSpeed: 'Fast (50kW)',
    lastUpdated: new Date().toISOString()
  }
];

export const mockChargingSessions: ChargingSession[] = [
  {
    id: '1',
    stationId: '1',
    startTime: '2025-01-15T10:30:00Z',
    endTime: '2025-01-15T11:45:00Z',
    kWhCharged: 35.4,
    cost: 12.39,
    connectorType: 'CCS'
  },
  {
    id: '2',
    stationId: '4',
    startTime: '2025-01-12T14:15:00Z',
    endTime: '2025-01-12T15:00:00Z',
    kWhCharged: 42.7,
    cost: 13.66,
    connectorType: 'Tesla'
  },
  {
    id: '3',
    stationId: '2',
    startTime: '2025-01-08T09:00:00Z',
    endTime: '2025-01-08T09:45:00Z',
    kWhCharged: 18.9,
    cost: 7.56,
    connectorType: 'Type 2'
  }
];