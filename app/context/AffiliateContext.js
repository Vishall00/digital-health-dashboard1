'use client';

import { createContext, useContext, useState, useEffect } from 'react';
import { useHealthData } from './HealthDataContext';

const AffiliateContext = createContext();

export const useAffiliate = () => useContext(AffiliateContext);

const affiliateProducts = {
  sleep: [
    {
      id: 1,
      name: 'Premium Sleep Mask',
      description: 'Light-blocking sleep mask for better sleep quality',
      price: '$29.99',
      affiliateLink: 'https://example.com/sleep-mask',
      image: '/images/sleep-mask.jpg',
      rating: 4.8
    },
    {
      id: 2,
      name: 'White Noise Machine',
      description: 'Helps create a peaceful sleep environment',
      price: '$49.99',
      affiliateLink: 'https://example.com/white-noise',
      image: '/images/white-noise.jpg',
      rating: 4.6
    }
  ],
  fitness: [
    {
      id: 3,
      name: 'Smart Fitness Tracker',
      description: 'Track your steps, heart rate, and sleep patterns',
      price: '$99.99',
      affiliateLink: 'https://example.com/fitness-tracker',
      image: '/images/fitness-tracker.jpg',
      rating: 4.7
    },
    {
      id: 4,
      name: 'Resistance Bands Set',
      description: 'Portable workout equipment for home exercises',
      price: '$39.99',
      affiliateLink: 'https://example.com/resistance-bands',
      image: '/images/resistance-bands.jpg',
      rating: 4.5
    }
  ],
  wellness: [
    {
      id: 5,
      name: 'NAD+ Supplement',
      description: 'Support cellular health and energy levels',
      price: '$79.99',
      affiliateLink: 'https://example.com/nad-supplement',
      image: '/images/nad-supplement.jpg',
      rating: 4.9
    },
    {
      id: 6,
      name: 'Smart Water Bottle',
      description: 'Track your hydration throughout the day',
      price: '$34.99',
      affiliateLink: 'https://example.com/water-bottle',
      image: '/images/water-bottle.jpg',
      rating: 4.4
    }
  ]
};

export const AffiliateProvider = ({ children }) => {
  const { healthData } = useHealthData();
  const [recommendedProducts, setRecommendedProducts] = useState([]);

  useEffect(() => {
    if (!healthData) return;

    const recommendations = [];

    // Sleep quality recommendations
    if (healthData.sleepQuality < 70) {
      recommendations.push(...affiliateProducts.sleep);
    }

    // Activity recommendations
    if (healthData.steps < 5000) {
      recommendations.push(...affiliateProducts.fitness);
    }

    // General wellness recommendations
    recommendations.push(...affiliateProducts.wellness);

    // Remove duplicates and limit to 4 recommendations
    const uniqueRecommendations = [...new Map(recommendations.map(item => [item.id, item])).values()]
      .slice(0, 4);

    setRecommendedProducts(uniqueRecommendations);
  }, [healthData]);

  const trackAffiliateClick = (productId) => {
    // Implement affiliate click tracking
    console.log(`Affiliate link clicked for product ${productId}`);
  };

  const value = {
    recommendedProducts,
    trackAffiliateClick
  };

  return (
    <AffiliateContext.Provider value={value}>
      {children}
    </AffiliateContext.Provider>
  );
}; 