'use client';

import { HealthDataProvider } from '../app/context/HealthDataContext';
import { InsightsProvider } from '../app/context/InsightsContext';
import { AffiliateProvider } from '../app/context/AffiliateContext';

export default function ClientWrapper({ children }) {
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