import React from 'react';
import { Outlet } from 'react-router-dom';
import FreelancerHeader from './FreelancerHeader';

interface FreelancerLayoutProps {
  children?: React.ReactNode;
}

const FreelancerLayout: React.FC<FreelancerLayoutProps> = ({ children }) => {
  return (
    <div className="min-h-screen bg-[#ffeee3]/30">
      <FreelancerHeader />
      <main className="flex-1 pt-16">
        {children || <Outlet />}
      </main>
    </div>
  );
};

export default FreelancerLayout;