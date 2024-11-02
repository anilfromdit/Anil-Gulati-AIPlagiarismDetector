import React from 'react';
import { Link } from 'react-router-dom';
import { ROUTES } from '../../config/routes';


export const Footer = () => (
  <footer className="bg-gray-800 text-white py-8">
  <div className="container mx-auto px-4">
    <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
      <div className="text-center md:text-left">
        © 2024 PlagAI Guard. All Rights Reserved.
      </div>
      <div className="flex flex-wrap justify-center md:justify-end gap-4">
        <Link to="/" className="hover:text-blue-400 text-sm">Privacy Policy</Link>
        <Link to="/" className="hover:text-blue-400 text-sm">Terms of Service</Link>
        <Link to={ROUTES.PORTFOLIO} className="hover:text-blue-400 text-sm">Portfolio</Link>
        <Link to={ROUTES.CONTACT} className="hover:text-blue-400 text-sm">Contact</Link>
      </div>
    </div>
  </div>
</footer>
);