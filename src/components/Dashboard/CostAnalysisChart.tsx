import React from 'react';
import { useTheme } from '../../context/ThemeContext';

const CostAnalysisChart: React.FC = () => {
  const { darkMode } = useTheme();
  
  // This would be replaced with actual chart implementation
  // For now, just a placeholder showing where the chart would be
  
  return (
    <div className="w-full h-64 flex items-center justify-center">
      <div className="text-center">
        <BarChartPlaceholder darkMode={darkMode} />
        <p className={`mt-4 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
          This would be a bar chart showing your charging costs over time.
        </p>
      </div>
    </div>
  );
};

// Simple placeholder visualization
const BarChartPlaceholder: React.FC<{ darkMode: boolean }> = ({ darkMode }) => {
  const barColors = [
    darkMode ? 'bg-blue-600' : 'bg-blue-500',
    darkMode ? 'bg-blue-500' : 'bg-blue-400',
    darkMode ? 'bg-green-600' : 'bg-green-500',
    darkMode ? 'bg-green-500' : 'bg-green-400',
    darkMode ? 'bg-blue-600' : 'bg-blue-500',
    darkMode ? 'bg-blue-500' : 'bg-blue-400'
  ];
  
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'];
  const values = [65, 40, 85, 55, 70, 45];
  
  return (
    <div className="flex items-end space-x-2 h-40">
      {months.map((month, i) => (
        <div key={i} className="flex flex-col items-center">
          <div 
            className={`w-12 ${barColors[i % barColors.length]} rounded-t-md transition-all duration-500 ease-out`} 
            style={{ height: `${values[i]}%` }}
          ></div>
          <span className={`text-xs mt-2 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>{month}</span>
        </div>
      ))}
    </div>
  );
};

export default CostAnalysisChart;