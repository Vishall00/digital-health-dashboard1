'use client';

import { HealthDataProvider } from './context/HealthDataContext';
import { InsightsProvider } from './context/InsightsContext';
import { AffiliateProvider } from './context/AffiliateContext';

export default function Providers({ children }) {
  return (
    <HealthDataProvider>
      <InsightsProvider>
        <AffiliateProvider>
          {children}
        </AffiliateProvider>
      </InsightsProvider>
    </HealthDataProvider>
  );
} 