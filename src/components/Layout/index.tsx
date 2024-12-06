import React, { ReactNode } from 'react';
import { useAuth } from '../../context/AuthContext';
import { Navbar } from './Navbar.tsx';

interface LayoutProps {
  children: ReactNode;
}

function Layout({ children }: LayoutProps) {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <main className="max-w-7xl mx-auto p-4">
        {children}
      </main>
    </div>
  );
}

export default Layout;