import React from 'react';

const DashboardPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-[#ffeee3] p-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold text-[#2E2E2E] mb-6">Dashboard</h1>
        
        <div className="bg-white shadow-sm rounded-lg p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-semibold">Welcome to FreelanceNest</h2>
            <span className="bg-[#ffeee3] text-[#2E2E2E] text-xs font-medium px-3 py-1 rounded-full">
              Account Setup Complete
            </span>
          </div>
          
          <p className="text-[#2E2E2E] mb-4">
            This is a placeholder for your dashboard. In a complete implementation, 
            this page would display personalized content based on your user type (client or freelancer).
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
            <div className="border border-[#ffeee3] rounded-lg p-4">
              <h3 className="font-medium mb-2">Get Started</h3>
              <p className="text-sm text-[#2E2E2E]">Complete your profile and explore the platform features.</p>
            </div>
            <div className="border border-[#ffeee3] rounded-lg p-4">
              <h3 className="font-medium mb-2">Recent Activity</h3>
              <p className="text-sm text-[#2E2E2E]">No recent activity to display.</p>
            </div>
            <div className="border border-[#ffeee3] rounded-lg p-4">
              <h3 className="font-medium mb-2">Quick Actions</h3>
              <p className="text-sm text-[#2E2E2E]">Customize your experience with quick actions.</p>
            </div>
          </div>
          
          <div className="bg-[#ffeee3] border border-[#ffeee3] rounded-lg p-4">
            <h3 className="text-[#2E2E2E] font-medium mb-2">Next Steps</h3>
            <ul className="list-disc pl-5 text-sm text-[#2E2E2E] space-y-1">
              <li>Complete your profile to increase visibility</li>
              <li>Explore available projects or talent</li>
              <li>Set up notifications for relevant opportunities</li>
              <li>Customize your dashboard preferences</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;












