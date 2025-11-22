import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../../lib/firebase';
import { 
  Users, 
  Briefcase, 
  DollarSign, 
  AlertTriangle,
  Settings
} from 'lucide-react';

interface DashboardStats {
  totalUsers: number;
  totalFreelancers: number;
  totalClients: number;
  totalProjects: number;
  pendingApprovals: number;
  totalRevenue: number;
  activeDisputes: number;
  monthlyGrowth: number;
}

const AdminDashboard: React.FC = () => {
  const [stats, setStats] = useState<DashboardStats>({
    totalUsers: 0,
    totalFreelancers: 0,
    totalClients: 0,
    totalProjects: 0,
    pendingApprovals: 0,
    totalRevenue: 0,
    activeDisputes: 0,
    monthlyGrowth: 0
  });
  const [isLoading, setIsLoading] = useState(true);
  const [recentActivity, setRecentActivity] = useState<any[]>([]);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      setIsLoading(true);
      
      // Fetch users count
      const usersSnapshot = await getDocs(collection(db, 'users'));
      const totalUsers = usersSnapshot.size;
      
      // Count freelancers and clients
      let freelancers = 0, clients = 0;
      usersSnapshot.forEach(doc => {
        const userData = doc.data();
        if (userData.role === 'freelancer') freelancers++;
        if (userData.role === 'client') clients++;
      });

      // Fetch projects count
      const projectsSnapshot = await getDocs(collection(db, 'portfolio_project'));
      const totalProjects = projectsSnapshot.size;

      // Mock data for other stats (would be real Firebase queries in production)
      setStats({
        totalUsers,
        totalFreelancers: freelancers,
        totalClients: clients,
        totalProjects,
        pendingApprovals: 12,
        totalRevenue: 485000,
        activeDisputes: 3,
        monthlyGrowth: 18
      });

      // Mock recent activity
      setRecentActivity([
        { type: 'user', message: 'New freelancer registered: John Doe', time: '2 mins ago', status: 'new' },
        { type: 'project', message: 'Project completed: E-commerce Website', time: '15 mins ago', status: 'completed' },
        { type: 'dispute', message: 'Dispute raised: Payment Issue #1247', time: '1 hour ago', status: 'pending' },
        { type: 'revenue', message: 'Payment processed: $2,500', time: '2 hours ago', status: 'success' },
        { type: 'user', message: 'Client verification completed', time: '3 hours ago', status: 'verified' }
      ]);

    } catch (error) {
      console.error('Error fetching dashboard data:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const quickActions = [
    { title: 'User Management', icon: Users, path: '/admin/users', color: 'bg-blue-500' },
    { title: 'Project Oversight', icon: Briefcase, path: '/admin/projects', color: 'bg-green-500' },
    { title: 'Dispute Resolution', icon: AlertTriangle, path: '/admin/dispute-resolution', color: 'bg-red-500' },
    { title: 'System Settings', icon: Settings, path: '/admin/settings', color: 'bg-gray-500' }
  ];

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#ffeee3] pt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex items-center justify-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#FF6B00]"></div>
            <span className="ml-3 text-[#2E2E2E]">Loading admin dashboard...</span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#ffeee3] pt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-[#2E2E2E]">Admin Dashboard</h1>
          <p className="text-[#2E2E2E]/70">Overview of platform performance and management tools</p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow-sm border border-[#ffeee3] p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-[#2E2E2E]/70">Total Users</p>
                <p className="text-2xl font-bold text-[#2E2E2E]">{stats.totalUsers.toLocaleString()}</p>
                <p className="text-sm text-[#FF6B00]">+{stats.monthlyGrowth}% this month</p>
              </div>
              <Users className="w-8 h-8 text-[#FF6B00]" />
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm border border-[#ffeee3] p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-[#2E2E2E]/70">Active Projects</p>
                <p className="text-2xl font-bold text-[#2E2E2E]">{stats.totalProjects.toLocaleString()}</p>
                <p className="text-sm text-[#2E2E2E]/60">+12 this week</p>
              </div>
              <Briefcase className="w-8 h-8 text-[#FF6B00]" />
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm border border-[#ffeee3] p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-[#2E2E2E]/70">Total Revenue</p>
                <p className="text-2xl font-bold text-[#2E2E2E]">${stats.totalRevenue.toLocaleString()}</p>
                <p className="text-sm text-[#FF6B00]">Platform earnings</p>
              </div>
              <DollarSign className="w-8 h-8 text-[#FF6B00]" />
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm border border-[#ffeee3] p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-[#2E2E2E]/70">Pending Issues</p>
                <p className="text-2xl font-bold text-[#2E2E2E]">{stats.pendingApprovals + stats.activeDisputes}</p>
                <p className="text-sm text-[#FF6B00]">{stats.activeDisputes} disputes active</p>
              </div>
              <AlertTriangle className="w-8 h-8 text-[#FF6B00]" />
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Quick Actions */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-sm border border-[#ffeee3]">
              <div className="p-6 border-b border-[#ffeee3]">
                <h2 className="text-lg font-semibold text-[#2E2E2E]">Quick Actions</h2>
              </div>
              <div className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {quickActions.map((action, index) => (
                    <Link
                      key={index}
                      to={action.path}
                      className="p-4 border border-[#ffeee3] rounded-lg hover:border-[#FF6B00] hover:shadow-md transition-all group"
                    >
                      <div className="flex items-center space-x-3">
                        <div className="p-2 rounded-lg bg-[#FF6B00] text-white group-hover:scale-110 transition-transform">
                          <action.icon className="w-5 h-5" />
                        </div>
                        <span className="font-medium text-[#2E2E2E]">{action.title}</span>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Recent Activity */}
          <div className="bg-white rounded-lg shadow-sm border border-[#ffeee3]">
            <div className="p-6 border-b border-[#ffeee3]">
              <h2 className="text-lg font-semibold text-[#2E2E2E]">Recent Activity</h2>
            </div>
            <div className="p-6">
              <div className="space-y-4">
                {recentActivity.map((activity, index) => (
                  <div key={index} className="flex items-start space-x-3">
                    <div className="w-2 h-2 rounded-full mt-2 bg-[#FF6B00]"></div>
                    <div className="flex-1">
                      <p className="text-sm text-[#2E2E2E]">{activity.message}</p>
                      <p className="text-xs text-[#2E2E2E]/50 mt-1">{activity.time}</p>
                    </div>
                  </div>
                ))}
              </div>
              <Link 
                to="/admin/activity" 
                className="block text-center text-[#FF6B00] hover:text-[#2E2E2E] text-sm font-medium mt-4"
              >
                View All Activity
              </Link>
            </div>
          </div>
        </div>

        {/* System Health */}
        <div className="mt-8 bg-white rounded-lg shadow-sm border border-[#ffeee3]">
          <div className="p-6 border-b border-[#ffeee3]">
            <h2 className="text-lg font-semibold text-[#2E2E2E]">System Overview</h2>
          </div>
          <div className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="text-2xl font-bold text-[#FF6B00]">99.9%</div>
                <p className="text-sm text-[#2E2E2E]/70">Uptime</p>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-[#FF6B00]">1.2s</div>
                <p className="text-sm text-[#2E2E2E]/70">Avg Response Time</p>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-[#FF6B00]">850GB</div>
                <p className="text-sm text-[#2E2E2E]/70">Storage Used</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;