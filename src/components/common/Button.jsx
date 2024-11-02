import React from 'react';

export const Button = ({ 
  children, 
  onClick, 
  disabled = false, 
  variant = 'primary',
  className = '',
  type = 'button'
}) => {
  const baseClasses = 'px-6 py-3 rounded-lg transition duration-200 font-medium';
  const variants = {
    primary: 'bg-blue-600 text-white hover:bg-blue-700 disabled:bg-blue-300',
    secondary: 'bg-gray-200 text-gray-800 hover:bg-gray-300 disabled:bg-gray-100'
  };

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`${baseClasses} ${variants[variant]} ${className}`}
    >
      {children}
    </button>
  );
};