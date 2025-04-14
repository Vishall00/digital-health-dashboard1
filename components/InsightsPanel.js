'use client';

import { useInsights } from '../app/context/InsightsContext';
import { useState } from 'react';

const InsightsPanel = () => {
  const { insights, recommendations, goals, updateGoal } = useInsights();
  const [activeTab, setActiveTab] = useState('insights');

  const getSeverityColor = (severity) => {
    switch (severity) {
      case 'warning': return 'text-yellow-500';
      case 'info': return 'text-blue-500';
      case 'error': return 'text-red-500';
      default: return 'text-gray-500';
    }
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high': return 'bg-red-100 text-red-800';
      case 'medium': return 'bg-yellow-100 text-yellow-800';
      case 'low': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold">Health Insights</h2>
        <div className="flex space-x-2">
          <button
            onClick={() => setActiveTab('insights')}
            className={`px-4 py-2 rounded-lg ${
              activeTab === 'insights' ? 'bg-blue-500 text-white' : 'bg-gray-100'
            }`}
          >
            Insights
          </button>
          <button
            onClick={() => setActiveTab('recommendations')}
            className={`px-4 py-2 rounded-lg ${
              activeTab === 'recommendations' ? 'bg-blue-500 text-white' : 'bg-gray-100'
            }`}
          >
            Recommendations
          </button>
          <button
            onClick={() => setActiveTab('goals')}
            className={`px-4 py-2 rounded-lg ${
              activeTab === 'goals' ? 'bg-blue-500 text-white' : 'bg-gray-100'
            }`}
          >
            Goals
          </button>
        </div>
      </div>

      {activeTab === 'insights' && (
        <div className="space-y-4">
          {insights.map((insight, index) => (
            <div key={index} className="border-l-4 border-blue-500 pl-4 py-2">
              <div className="flex items-center justify-between">
                <p className="text-gray-700">{insight.message}</p>
                <span className={`text-sm ${getSeverityColor(insight.severity)}`}>
                  {insight.severity}
                </span>
              </div>
              <p className="text-sm text-gray-500">
                {new Date(insight.timestamp).toLocaleTimeString()}
              </p>
            </div>
          ))}
        </div>
      )}

      {activeTab === 'recommendations' && (
        <div className="space-y-4">
          {recommendations.map((rec, index) => (
            <div key={index} className={`p-4 rounded-lg ${getPriorityColor(rec.priority)}`}>
              <p className="font-medium">{rec.message}</p>
            </div>
          ))}
        </div>
      )}

      {activeTab === 'goals' && (
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Daily Steps</label>
              <input
                type="number"
                value={goals.steps}
                onChange={(e) => updateGoal('steps', parseInt(e.target.value))}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Water Intake (glasses)</label>
              <input
                type="number"
                value={goals.waterIntake}
                onChange={(e) => updateGoal('waterIntake', parseInt(e.target.value))}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Sleep Hours</label>
              <input
                type="number"
                value={goals.sleepHours}
                onChange={(e) => updateGoal('sleepHours', parseInt(e.target.value))}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Active Minutes</label>
              <input
                type="number"
                value={goals.activeMinutes}
                onChange={(e) => updateGoal('activeMinutes', parseInt(e.target.value))}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default InsightsPanel; 