'use client'

import { useState } from 'react';
import { useHealthData } from '../app/context/HealthDataContext';

const ManualDataInput = () => {
  const { updateManualData } = useHealthData();
  const [inputData, setInputData] = useState({
    waterIntake: '',
    mood: 'neutral',
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    updateManualData('waterIntake', parseInt(inputData.waterIntake));
    updateManualData('mood', inputData.mood);
    setInputData({ waterIntake: '', mood: 'neutral' });
  };

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h2 className="text-xl font-semibold mb-4">Manual Data Input</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Water Intake (glasses)
          </label>
          <input
            type="number"
            value={inputData.waterIntake}
            onChange={(e) => setInputData({ ...inputData, waterIntake: e.target.value })}
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            min="0"
            max="20"
            placeholder="Enter number of glasses"
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Mood
          </label>
          <select
            value={inputData.mood}
            onChange={(e) => setInputData({ ...inputData, mood: e.target.value })}
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="happy">😊 Happy</option>
            <option value="neutral">😐 Neutral</option>
            <option value="sad">😔 Sad</option>
          </select>
        </div>

        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        >
          Update Data
        </button>
      </form>
    </div>
  );
};

export default ManualDataInput; 