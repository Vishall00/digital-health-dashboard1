'use client'

// Auto-deployment test comment
import { useState } from 'react';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';
import { useHealthData } from '../app/context/HealthDataContext';
import ManualDataInput from './ManualDataInput';
import InsightsPanel from './InsightsPanel';
import AffiliateProducts from './AffiliateProducts';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const Dashboard = () => {
  const { healthData, isLoading, error } = useHealthData();
  const [selectedMetric, setSelectedMetric] = useState('steps');
  const [dateRange, setDateRange] = useState('week');

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-red-500">Error: {error}</div>
      </div>
    );
  }

  if (!healthData) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-gray-500">No health data available</div>
      </div>
    );
  }

  // Sample data for the chart
  const chartData = {
    labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    datasets: [
      {
        label: 'Steps',
        data: [6500, 5900, 8000, 8100, 5600, 5500, 4000],
        borderColor: 'rgb(75, 192, 192)',
        tension: 0.1,
      },
    ],
  };

  const kpiData = [
    { title: 'Daily Steps', value: healthData.steps.toLocaleString(), change: '+12%', icon: 'M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z' },
    { title: 'Active Minutes', value: healthData.activeMinutes, change: '+5%', icon: 'M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z' },
    { title: 'Avg Heart Rate', value: healthData.heartRate, change: '-2%', icon: 'M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z' },
    { title: 'Sleep Quality', value: `${healthData.sleepQuality}%`, change: '+8%', icon: 'M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z' },
    { title: 'Calories Burned', value: healthData.caloriesBurned.toLocaleString(), change: '+15%', icon: 'M13 10V3L4 14h7v7l9-11h-7z' },
  ];

  return (
    <div className="p-6">
      {/* KPI Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 mb-6">
        {kpiData.map((kpi, index) => (
          <div key={index} className="bg-white rounded-lg shadow p-4 hover:shadow-lg transition-shadow">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">{kpi.title}</p>
                <p className="text-2xl font-bold">{kpi.value}</p>
                <p className={`text-sm ${kpi.change.startsWith('+') ? 'text-green-500' : 'text-red-500'}`}>
                  {kpi.change}
                </p>
              </div>
              <div className="bg-gray-100 p-2 rounded-full">
                <svg className="h-6 w-6 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={kpi.icon} />
                </svg>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Health Trends Chart */}
      <div className="bg-white rounded-lg shadow p-6 mb-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Health Trends</h2>
          <div className="flex space-x-4">
            <select
              value={selectedMetric}
              onChange={(e) => setSelectedMetric(e.target.value)}
              className="border rounded px-3 py-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="steps">Steps</option>
              <option value="heartRate">Heart Rate</option>
              <option value="sleep">Sleep</option>
            </select>
            <select
              value={dateRange}
              onChange={(e) => setDateRange(e.target.value)}
              className="border rounded px-3 py-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="day">Today</option>
              <option value="week">This Week</option>
              <option value="month">This Month</option>
            </select>
          </div>
        </div>
        <div className="h-80">
          <Line data={chartData} options={{ maintainAspectRatio: false }} />
        </div>
      </div>

      {/* Insights Panel */}
      <div className="mb-6">
        <InsightsPanel />
      </div>

      {/* Affiliate Products */}
      <div className="mb-6">
        <AffiliateProducts />
      </div>

      {/* Detailed Metrics & Manual Input */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Today's Detail */}
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-semibold mb-4">Today's Detail</h2>
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <span>Water Intake</span>
              <span className="text-blue-500">{healthData.waterIntake} glasses</span>
            </div>
            <div className="flex justify-between items-center">
              <span>Mood</span>
              <span className="text-green-500">
                {healthData.mood === 'happy' ? '😊 Happy' : 
                 healthData.mood === 'neutral' ? '😐 Neutral' : '😔 Sad'}
              </span>
            </div>
            <div className="text-sm text-gray-500">
              Last updated: {new Date(healthData.lastUpdated).toLocaleTimeString()}
            </div>
          </div>
        </div>

        {/* Manual Data Input */}
        <ManualDataInput />
      </div>
    </div>
  );
};

export default Dashboard; 