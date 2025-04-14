'use client'

import dynamic from 'next/dynamic';

// Dynamically import the Dashboard component with no SSR
const Dashboard = dynamic(() => import('../components/Dashboard'), {
  ssr: false
});

export default function Home() {
  return (
    <main>
      <Dashboard />
    </main>
  );
} 