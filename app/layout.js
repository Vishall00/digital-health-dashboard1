'use client';

import { Inter } from 'next/font/google';
import './globals.css'
import { HealthDataProvider } from './context/HealthDataContext';
import { InsightsProvider } from './context/InsightsContext';
import { AffiliateProvider } from './context/AffiliateContext';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'Digital Health Dashboard',
  description: 'Track and analyze your health metrics in real-time',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <HealthDataProvider>
          <InsightsProvider>
            <AffiliateProvider>
              {children}
            </AffiliateProvider>
          </InsightsProvider>
        </HealthDataProvider>
      </body>
    </html>
  )
} 