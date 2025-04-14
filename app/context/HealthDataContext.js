'use client'

import { createContext, useContext, useState, useEffect } from 'react';

const HealthDataContext = createContext();

export function HealthDataProvider({ children }) {
  const [healthData, setHealthData] = useState({
    steps: 0,
    heartRate: 0,
    sleepQuality: 0,
    activeMinutes: 0,
    caloriesBurned: 0,
    waterIntake: 0,
    mood: 'neutral',
    lastUpdated: new Date(),
  });

  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  // Simulate real-time data updates
  useEffect(() => {
    const fetchData = async () => {
      try {
        // In a real app, this would be an API call to your backend
        const mockData = {
          steps: Math.floor(Math.random() * 10000),
          heartRate: Math.floor(Math.random() * 40) + 60,
          sleepQuality: Math.floor(Math.random() * 100),
          activeMinutes: Math.floor(Math.random() * 120),
          caloriesBurned: Math.floor(Math.random() * 1000),
          waterIntake: Math.floor(Math.random() * 8),
          mood: ['happy', 'neutral', 'sad'][Math.floor(Math.random() * 3)],
          lastUpdated: new Date(),
        };

        setHealthData(mockData);
        setIsLoading(false);
      } catch (err) {
        setError(err.message);
        setIsLoading(false);
      }
    };

    // Initial fetch
    fetchData();

    // Set up polling interval (every 5 minutes in this example)
    const interval = setInterval(fetchData, 5 * 60 * 1000);

    return () => clearInterval(interval);
  }, []);

  const updateManualData = (metric, value) => {
    setHealthData(prev => ({
      ...prev,
      [metric]: value,
      lastUpdated: new Date(),
    }));
  };

  return (
    <HealthDataContext.Provider value={{ healthData, isLoading, error, updateManualData }}>
      {children}
    </HealthDataContext.Provider>
  );
}

export function useHealthData() {
  const context = useContext(HealthDataContext);
  if (!context) {
    throw new Error('useHealthData must be used within a HealthDataProvider');
  }
  return context;
} 