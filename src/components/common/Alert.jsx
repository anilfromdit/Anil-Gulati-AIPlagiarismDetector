import React from 'react';

export const Alert = ({ 
  message, 
  type = 'info',
  onClose
}) => {
  const types = {
    success: 'bg-green-100 text-green-800 border-green-500',
    error: 'bg-red-100 text-red-800 border-red-500',
    info: 'bg-blue-100 text-blue-800 border-blue-500',
    warning: 'bg-yellow-100 text-yellow-800 border-yellow-500'
  };

  return (
    <div className={`p-4 rounded-lg border-l-4 ${types[type]} relative`}>
      {message}
      {onClose && (
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
        >
          ×
        </button>
      )}
    </div>
  );
};