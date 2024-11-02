import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Shield } from 'lucide-react';
import { ROUTES } from '../../config/routes';

export const Navigation = () => {
  const location = useLocation();
  
  const isActive = (path) => location.pathname === path;
  
  const navItems = [
    { label: 'Home', path: ROUTES.HOME },
    { label: 'Upload', path: ROUTES.UPLOAD },
    { label: 'Contact', path: ROUTES.CONTACT },
    { label: 'Portfolio', path: ROUTES.PORTFOLIO },
  ];

  return (
    <nav className="bg-white shadow-md">
      <div className="max-w-6xl mx-auto px-4 py-3 flex justify-between items-center">
        <Link to={ROUTES.HOME} className="flex items-center">
          <Shield className="h-8 w-8 text-blue-600 mr-2" />
          <span className="text-xl font-bold text-gray-800">PlagAI Guard</span>
        </Link>
        
        <div className="space-x-6">
          {navItems.map(({ label, path }) => (
            <Link
              key={path}
              to={path}
              className={`transition ${
                isActive(path)
                  ? 'text-blue-600 font-medium'
                  : 'text-gray-700 hover:text-blue-600'
              }`}
            >
              {label}
            </Link>
          ))}
        </div>
      </div>
    </nav>
  );
};

