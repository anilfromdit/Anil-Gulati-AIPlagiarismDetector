import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { ROUTES } from '../../config/routes';
import { Footer } from './Footer';

export const Layout = ({ children }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  return (
    <div className="min-h-screen flex flex-col">
      {/* Navigation */}
      <nav className="bg-white shadow-md">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <Link to={ROUTES.HOME} className="flex items-center">
              <span className="text-xl font-bold text-gray-800">PlagAI Guard</span>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex space-x-8">
              <Link to={ROUTES.HOME} className="text-gray-600 hover:text-gray-900">Home</Link>
              <Link to={ROUTES.UPLOAD} className="text-gray-600 hover:text-gray-900">Upload</Link>
              <Link to={ROUTES.PORTFOLIO} className="text-gray-600 hover:text-gray-900">Portfolio</Link>
              <Link to={ROUTES.CONTACT} className="text-gray-600 hover:text-gray-900">Contact</Link>
            </div>

            {/* Mobile Menu Button */}
            <button 
              onClick={toggleMenu}
              className="md:hidden p-2 rounded-md text-gray-600 hover:text-gray-900"
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>

          {/* Mobile Menu */}
          {isMenuOpen && (
            <div className="md:hidden">
              <div className="px-2 pt-2 pb-3 space-y-1">
                <Link 
                  to={ROUTES.HOME}
                  className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50"
                  onClick={toggleMenu}
                >
                  Home
                </Link>
                <Link 
                  to={ROUTES.UPLOAD}
                  className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50"
                  onClick={toggleMenu}
                >
                  Upload
                </Link>
                <Link 
                  to={ROUTES.PORTFOLIO}
                  className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50"
                  onClick={toggleMenu}
                >
                  Portfolio
                </Link>
                <Link 
                  to={ROUTES.CONTACT}
                  className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50"
                  onClick={toggleMenu}
                >
                  Contact
                </Link>
              </div>
            </div>
          )}
        </div>
      </nav>

      {/* Main Content */}
      <main className="flex-grow">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          {children}
        </div>
      </main>

      {/* Footer */}
      <Footer/>
    </div>
  );
};