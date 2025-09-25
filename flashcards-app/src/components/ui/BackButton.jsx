import React from 'react';
import { ArrowLeft } from 'lucide-react';

const BackButton = ({ 
  onClick, 
  title = 'Back',
  showTitle = true,
  variant = 'default',
  disabled = false,
  icon: CustomIcon,
  className = ''
}) => {
  const baseClasses = 'inline-flex items-center px-3 py-2 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed';
  
  const variants = {
    default: 'text-blue-600 hover:bg-blue-50 focus:ring-blue-500',
    primary: 'text-blue-600 hover:bg-blue-50 focus:ring-blue-500',
    secondary: 'text-gray-600 hover:bg-gray-100 focus:ring-gray-500 bg-gray-50',
    ghost: 'text-gray-600 hover:bg-gray-100 focus:ring-gray-500'
  };

  const classes = `${baseClasses} ${variants[variant]} ${className}`;
  const IconComponent = CustomIcon || ArrowLeft;

  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      className={classes}
    >
      <IconComponent className="w-4 h-4" />
      {showTitle && (
        <span className="ml-2 text-sm font-medium">
          {title}
        </span>
      )}
    </button>
  );
};

export default BackButton;