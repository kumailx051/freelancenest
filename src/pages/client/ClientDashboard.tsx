import React from 'react';
import { Link } from 'react-router-dom';

const ClientDashboard: React.FC = () => {
  // Sample data for dashboard
  const dashboardStats = [
    { title: 'Active Jobs', value: '5', change: '+2 this week', changeType: 'positive' },
    { title: 'Total Proposals', value: '24', change: '+8 new', changeType: 'positive' },
    { title: 'In Progress', value: '3', change: 'On track', changeType: 'neutral' },
    { title: 'Completed Projects', value: '12', change: '+1 this month', changeType: 'positive' }
  ];

  const recentActivity = [
    { type: 'proposal', message: 'New proposal received for "Website Redesign"', time: '2 hours ago', status: 'new' },
    { type: 'milestone', message: 'Milestone completed for "Mobile App Development"', time: '4 hours ago', status: 'completed' },
    { type: 'message', message: 'Message from Sarah Johnson', time: '6 hours ago', status: 'unread' },
    { type: 'payment', message: 'Payment released for "Logo Design"', time: '1 day ago', status: 'completed' }
  ];

  const activeJobs = [
    { title: 'Website Redesign', freelancer: 'John Smith', progress: 75, deadline: '3 days', status: 'In Progress' },
    { title: 'Mobile App Development', freelancer: 'Sarah Johnson', progress: 45, deadline: '2 weeks', status: 'In Progress' },
    { title: 'Content Writing', freelancer: 'Mike Brown', progress: 90, deadline: '1 day', status: 'Review' }
  ];

  return (
    <div className="min-h-screen bg-[#ffeee3]">
      {/* Hero Section */}
      <section className="pt-40 pb-16 bg-[#2E2E2E] text-white">
        <div className="section-container">
          <div className="max-w-6xl mx-auto">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Welcome back!</h1>
            <p className="text-xl text-[#ffeee3] mb-8">
              Manage your projects, review proposals, and track your hiring progress all in one place.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link to="/client/post-job" className="bg-[#FF6B00] hover:bg-[#FF9F45] text-white px-6 py-3 rounded-lg font-semibold transition-all">
                Post a New Job
              </Link>
              <Link to="/client/browse-freelancers" className="bg-white text-[#FF6B00] border-2 border-[#FF6B00] px-6 py-3 rounded-lg font-semibold hover:bg-[#FF6B00] hover:text-white transition-all">
                Browse Freelancers
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16">
        <div className="section-container">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
              {dashboardStats.map((stat, index) => (
                <div key={index} className="bg-white rounded-xl shadow-sm p-6 border border-[#ffeee3] hover:border-[#FF6B00] transition-colors">
                  <h3 className="text-sm font-medium text-[#2E2E2E]/60 mb-2">{stat.title}</h3>
                  <p className="text-3xl font-bold text-[#2E2E2E] mb-1">{stat.value}</p>
                  <p className={`text-sm ${stat.changeType === 'positive' ? 'text-green-600' : stat.changeType === 'negative' ? 'text-red-600' : 'text-[#2E2E2E]/60'}`}>
                    {stat.change}
                  </p>
                </div>
              ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Active Jobs */}
              <div className="bg-white rounded-xl shadow-sm p-6 border border-[#ffeee3]">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-bold text-[#2E2E2E]">Active Jobs</h2>
                  <Link to="/client/my-jobs" className="text-[#FF6B00] hover:text-[#FF9F45] font-medium text-sm">
                    View All
                  </Link>
                </div>
                <div className="space-y-4">
                  {activeJobs.map((job, index) => (
                    <div key={index} className="border border-[#ffeee3] rounded-lg p-4 hover:border-[#FF6B00] transition-colors">
                      <div className="flex items-start justify-between mb-2">
                        <h3 className="font-semibold text-[#2E2E2E]">{job.title}</h3>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                          job.status === 'In Progress' ? 'bg-blue-100 text-blue-800' : 
                          job.status === 'Review' ? 'bg-yellow-100 text-yellow-800' : 
                          'bg-green-100 text-green-800'
                        }`}>
                          {job.status}
                        </span>
                      </div>
                      <p className="text-sm text-[#2E2E2E]/60 mb-3">Freelancer: {job.freelancer}</p>
                      <div className="flex items-center justify-between">
                        <div className="flex-1 mr-4">
                          <div className="flex items-center justify-between text-sm mb-1">
                            <span className="text-[#2E2E2E]/60">Progress</span>
                            <span className="font-medium text-[#2E2E2E]">{job.progress}%</span>
                          </div>
                          <div className="w-full bg-[#ffeee3] rounded-full h-2">
                            <div 
                              className="bg-[#FF6B00] h-2 rounded-full transition-all duration-300" 
                              style={{ width: `${job.progress}%` }}
                            ></div>
                          </div>
                        </div>
                        <div className="text-sm text-[#2E2E2E]/60">
                          Due in {job.deadline}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Recent Activity */}
              <div className="bg-white rounded-xl shadow-sm p-6 border border-[#ffeee3]">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-bold text-[#2E2E2E]">Recent Activity</h2>
                  <Link to="/client/notifications" className="text-[#FF6B00] hover:text-[#FF9F45] font-medium text-sm">
                    View All
                  </Link>
                </div>
                <div className="space-y-4">
                  {recentActivity.map((activity, index) => (
                    <div key={index} className="flex items-start gap-3 p-3 rounded-lg hover:bg-[#ffeee3]/30 transition-colors">
                      <div className={`w-3 h-3 rounded-full mt-2 ${
                        activity.type === 'proposal' ? 'bg-blue-500' :
                        activity.type === 'milestone' ? 'bg-green-500' :
                        activity.type === 'message' ? 'bg-[#FF6B00]' :
                        'bg-purple-500'
                      }`}></div>
                      <div className="flex-1">
                        <p className="text-[#2E2E2E] text-sm">{activity.message}</p>
                        <p className="text-[#2E2E2E]/60 text-xs mt-1">{activity.time}</p>
                      </div>
                      {activity.status === 'new' || activity.status === 'unread' ? (
                        <div className="w-2 h-2 bg-[#FF6B00] rounded-full mt-2"></div>
                      ) : null}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Quick Actions */}
      <section className="py-16 bg-white">
        <div className="section-container">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-12 bg-clip-text text-transparent bg-gradient-to-r from-[#FF6B00] to-[#FF6B00]">
              Quick Actions
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Link to="/client/post-job" className="bg-[#ffeee3] rounded-xl p-6 hover:bg-[#FF6B00] hover:text-white transition-all group">
                <div className="text-[#FF6B00] group-hover:text-white mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                  </svg>
                </div>
                <h3 className="font-semibold text-[#2E2E2E] group-hover:text-white mb-2">Post New Job</h3>
                <p className="text-sm text-[#2E2E2E]/80 group-hover:text-white/90">Create a detailed job posting</p>
              </Link>

              <Link to="/client/my-jobs" className="bg-[#ffeee3] rounded-xl p-6 hover:bg-[#FF6B00] hover:text-white transition-all group">
                <div className="text-[#FF6B00] group-hover:text-white mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                  </svg>
                </div>
                <h3 className="font-semibold text-[#2E2E2E] group-hover:text-white mb-2">Manage Jobs</h3>
                <p className="text-sm text-[#2E2E2E]/80 group-hover:text-white/90">View and manage all your jobs</p>
              </Link>

              <Link to="/client/messages" className="bg-[#ffeee3] rounded-xl p-6 hover:bg-[#FF6B00] hover:text-white transition-all group">
                <div className="text-[#FF6B00] group-hover:text-white mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                  </svg>
                </div>
                <h3 className="font-semibold text-[#2E2E2E] group-hover:text-white mb-2">Messages</h3>
                <p className="text-sm text-[#2E2E2E]/80 group-hover:text-white/90">Chat with freelancers</p>
              </Link>

              <Link to="/client/escrow-payments" className="bg-[#ffeee3] rounded-xl p-6 hover:bg-[#FF6B00] hover:text-white transition-all group">
                <div className="text-[#FF6B00] group-hover:text-white mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                  </svg>
                </div>
                <h3 className="font-semibold text-[#2E2E2E] group-hover:text-white mb-2">Payments</h3>
                <p className="text-sm text-[#2E2E2E]/80 group-hover:text-white/90">Manage escrow & payments</p>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-[#FF6B00] text-white">
        <div className="section-container">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-6">Need Help Getting Started?</h2>
            <p className="text-xl opacity-90 mb-8">
              Our team is here to help you succeed. Get expert advice on hiring the right talent for your projects.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Link to="/how-to-hire" className="bg-white text-[#FF6B00] hover:bg-[#ffeee3] font-medium px-8 py-4 rounded-lg text-lg transition-colors duration-200">
                Learn How to Hire
              </Link>
              <Link to="/support" className="bg-[#2E2E2E] text-white border border-white hover:bg-[#2E2E2E]/80 font-medium px-8 py-4 rounded-lg text-lg transition-colors duration-200">
                Contact Support
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ClientDashboard;
