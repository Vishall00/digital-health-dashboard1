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
  const [selectedMetric, setSelectedMetric] = useState('steps');
  const [dateRange, setDateRange] = useState('week');

  // Sample data for KPI cards
  const kpiData = [
    { title: 'Daily Steps', value: '8,542', change: '+12%', icon: 'M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z' },
    { title: 'Active Minutes', value: '45', change: '+5%', icon: 'M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z' },
    { title: 'Avg Heart Rate', value: '72', change: '-2%', icon: 'M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z' },
    { title: 'Sleep Quality', value: '85%', change: '+8%', icon: 'M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z' },
    { title: 'Calories Burned', value: '2,450', change: '+15%', icon: 'M13 10V3L4 14h7v7l9-11h-7z' },
  ];

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

  return (
    <div className="p-6">
      {/* KPI Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 mb-6">
        {kpiData.map((kpi, index) => (
          <div key={index} className="bg-white rounded-lg shadow p-4">
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
              className="border rounded px-3 py-1"
            >
              <option value="steps">Steps</option>
              <option value="heartRate">Heart Rate</option>
              <option value="sleep">Sleep</option>
            </select>
            <select
              value={dateRange}
              onChange={(e) => setDateRange(e.target.value)}
              className="border rounded px-3 py-1"
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

      {/* Detailed Metrics & Insights */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Today's Detail */}
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-semibold mb-4">Today's Detail</h2>
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <span>Morning Activity</span>
              <span className="text-green-500">Completed</span>
            </div>
            <div className="flex justify-between items-center">
              <span>Water Intake</span>
              <span>2.5L / 3L</span>
            </div>
            <div className="flex justify-between items-center">
              <span>Meditation</span>
              <span className="text-yellow-500">Pending</span>
            </div>
          </div>
        </div>

        {/* Alerts & Recommendations */}
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-semibold mb-4">Alerts & Recommendations</h2>
          <div className="space-y-4">
            <div className="flex items-start space-x-3">
              <div className="bg-blue-100 p-2 rounded-full">
                <svg className="h-5 w-5 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div>
                <p className="font-medium">Stay Hydrated</p>
                <p className="text-sm text-gray-500">You're slightly below your daily water intake goal</p>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <div className="bg-green-100 p-2 rounded-full">
                <svg className="h-5 w-5 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div>
                <p className="font-medium">Great Progress!</p>
                <p className="text-sm text-gray-500">You've exceeded your daily step goal</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard; 