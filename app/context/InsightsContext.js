'use client';

import { createContext, useContext, useState, useEffect } from 'react';
import { useHealthData } from './HealthDataContext';

const InsightsContext = createContext();

export const useInsights = () => useContext(InsightsContext);

export const InsightsProvider = ({ children }) => {
  const { healthData } = useHealthData();
  const [insights, setInsights] = useState([]);
  const [recommendations, setRecommendations] = useState([]);
  const [goals, setGoals] = useState({
    steps: 10000,
    waterIntake: 8,
    sleepHours: 8,
    activeMinutes: 30
  });

  // Analyze health data and generate insights
  useEffect(() => {
    if (!healthData) return;

    const newInsights = [];
    const newRecommendations = [];

    // Analyze steps
    if (healthData.steps < goals.steps * 0.7) {
      newInsights.push({
        type: 'activity',
        message: 'Your step count is below 70% of your daily goal',
        severity: 'warning',
        timestamp: new Date()
      });
      newRecommendations.push({
        type: 'activity',
        message: 'Try taking a 15-minute walk to boost your step count',
        priority: 'medium'
      });
    }

    // Analyze water intake
    if (healthData.waterIntake < goals.waterIntake) {
      newInsights.push({
        type: 'hydration',
        message: 'You haven\'t met your daily water intake goal',
        severity: 'info',
        timestamp: new Date()
      });
      newRecommendations.push({
        type: 'hydration',
        message: 'Drink a glass of water now to stay hydrated',
        priority: 'high'
      });
    }

    // Analyze sleep
    if (healthData.sleepQuality < 70) {
      newInsights.push({
        type: 'sleep',
        message: 'Your sleep quality has been below optimal levels',
        severity: 'warning',
        timestamp: new Date()
      });
      newRecommendations.push({
        type: 'sleep',
        message: 'Consider establishing a regular bedtime routine',
        priority: 'medium'
      });
    }

    // Analyze heart rate
    if (healthData.heartRate > 100) {
      newInsights.push({
        type: 'heart',
        message: 'Your heart rate is elevated',
        severity: 'warning',
        timestamp: new Date()
      });
      newRecommendations.push({
        type: 'heart',
        message: 'Take a moment to relax and practice deep breathing',
        priority: 'high'
      });
    }

    setInsights(prev => [...newInsights, ...prev].slice(0, 10));
    setRecommendations(prev => [...newRecommendations, ...prev].slice(0, 5));
  }, [healthData, goals]);

  const updateGoal = (goalType, value) => {
    setGoals(prev => ({
      ...prev,
      [goalType]: value
    }));
  };

  const value = {
    insights,
    recommendations,
    goals,
    updateGoal
  };

  return (
    <InsightsContext.Provider value={value}>
      {children}
    </InsightsContext.Provider>
  );
}; 