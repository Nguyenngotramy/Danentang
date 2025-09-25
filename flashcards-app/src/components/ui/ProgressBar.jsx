import React from 'react';

const ProgressBar = ({ 
  progress = 0, // 0 to 100
  showPercentage = true,
  label,
  current,
  total,
  className = '',
  height = 'h-2',
  color = 'bg-blue-600',
  backgroundColor = 'bg-gray-200'
}) => {
  const progressPercentage = Math.min(Math.max(progress, 0), 100);
  
  return (
    <div className={`w-full ${className}`}>
      {/* Label and counter */}
      {(label || (current !== undefined && total !== undefined)) && (
        <div className="flex justify-between items-center mb-2">
          {label && (
            <span className="text-sm font-medium text-gray-700">
              {label}
            </span>
          )}
          {current !== undefined && total !== undefined && (
            <span className="text-sm text-gray-500">
              {current}/{total}
            </span>
          )}
        </div>
      )}
      
      {/* Progress bar container */}
      <div className="flex items-center space-x-3">
        {/* Progress bar */}
        <div className={`flex-1 ${backgroundColor} rounded-full overflow-hidden ${height}`}>
          <div 
            className={`${height} ${color} rounded-full transition-all duration-300 ease-out`}
            style={{ width: `${progressPercentage}%` }}
          />
        </div>
        
        {/* Percentage */}
        {showPercentage && (
          <span className="text-sm font-medium text-gray-700 min-w-[3rem] text-right">
            {Math.round(progressPercentage)}%
          </span>
        )}
      </div>
    </div>
  );
};

export default ProgressBar;