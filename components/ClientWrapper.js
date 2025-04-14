'use client';

import { HealthDataProvider } from '../app/context/HealthDataContext';
import { InsightsProvider } from '../app/context/InsightsContext';

export default function ClientWrapper({ children }) {
  return (
    <HealthDataProvider>
      <InsightsProvider>
        {children}
      </InsightsProvider>
    </HealthDataProvider>
  );
} 