import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

export function Navbar() {
  const { signOut } = useAuth();

  return (
    <nav className="bg-white shadow-sm p-4">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <Link to="/" className="text-xl font-bold text-primary-600">
          Plant Care
        </Link>
        <div className="flex items-center gap-4">
          <Link to="/plants" className="text-gray-600 hover:text-gray-900">
            My Plants
          </Link>
          <button 
            onClick={() => signOut()} 
            className="text-gray-600 hover:text-gray-900"
          >
            Sign Out
          </button>
        </div>
      </div>
    </nav>
  );
}