import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { 
  LayoutDashboard, 
  Users, 
  Briefcase, 
  Settings,
  LogOut,
  Shield,
  Bell,
  Search,
  AlertTriangle
} from 'lucide-react';

interface AdminLayoutProps {
  children: React.ReactNode;
}

const AdminLayout: React.FC<AdminLayoutProps> = ({ children }) => {
  const { currentUser, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const navigation = [
    { name: 'Dashboard', href: '/admin/dashboard', icon: LayoutDashboard },
    { name: 'User Management', href: '/admin/users', icon: Users },
    { name: 'Project Oversight', href: '/admin/projects', icon: Briefcase },
    { name: 'Dispute Resolution', href: '/admin/dispute-resolution', icon: AlertTriangle },
    { name: 'System Settings', href: '/admin/settings', icon: Settings },
  ];

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/');
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };

  const isCurrentPath = (path: string) => {
    return location.pathname === path;
  };

  return (
    <div className="min-h-screen bg-[#ffeee3]">
      {/* Sidebar */}
      <div className="fixed inset-y-0 left-0 w-64 bg-white shadow-lg border-r border-[#ffeee3]">
        <div className="flex flex-col h-full">
          {/* Logo */}
          <div className="flex items-center px-6 py-4 border-b border-[#ffeee3]">
            <Shield className="h-8 w-8 text-[#FF6B00]" />
            <div className="ml-3">
              <h1 className="text-xl font-bold text-[#2E2E2E]">FreelanceNest</h1>
              <p className="text-sm text-[#2E2E2E]/70">Admin Panel</p>
            </div>
          </div>

          {/* Navigation */}
          <nav className="flex-1 px-4 py-6 space-y-1 overflow-y-auto">
            {navigation.map((item) => (
              <button
                key={item.name}
                onClick={() => navigate(item.href)}
                className={`w-full flex items-center px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                  isCurrentPath(item.href)
                    ? 'bg-[#ffeee3] text-[#FF6B00] border-r-2 border-[#FF6B00]'
                    : 'text-[#2E2E2E]/70 hover:bg-[#ffeee3]/50 hover:text-[#2E2E2E]'
                }`}
              >
                <item.icon className="mr-3 h-5 w-5" />
                {item.name}
              </button>
            ))}
          </nav>

          {/* User Info */}
          <div className="px-4 py-4 border-t border-[#ffeee3]">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <div className="h-8 w-8 bg-[#FF6B00] rounded-full flex items-center justify-center">
                  <span className="text-sm font-medium text-white">
                    {currentUser?.email?.charAt(0).toUpperCase()}
                  </span>
                </div>
              </div>
              <div className="ml-3 flex-1 min-w-0">
                <p className="text-sm font-medium text-[#2E2E2E] truncate">
                  Admin User
                </p>
                <p className="text-xs text-[#2E2E2E]/50 truncate">
                  {currentUser?.email}
                </p>
              </div>
              <button
                onClick={handleLogout}
                className="ml-2 p-1 rounded-full text-[#2E2E2E]/50 hover:text-[#FF6B00]"
                title="Logout"
              >
                <LogOut className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="ml-64">
        {/* Top Bar */}
        <div className="bg-white shadow-sm border-b border-[#ffeee3]">
          <div className="px-6 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center flex-1">
                <div className="relative max-w-md w-full">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#FF6B00] w-5 h-5" />
                  <input
                    type="text"
                    placeholder="Search..."
                    className="pl-10 pr-4 py-2 w-full border border-[#ffeee3] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF6B00] focus:border-transparent"
                  />
                </div>
              </div>
              
              <div className="flex items-center space-x-4">
                <button className="relative p-2 text-[#2E2E2E]/50 hover:text-[#FF6B00]">
                  <Bell className="h-5 w-5" />
                  <span className="absolute top-0 right-0 block h-2 w-2 rounded-full bg-[#FF6B00] ring-2 ring-white"></span>
                </button>
                
                <div className="flex items-center space-x-2">
                  <span className="text-sm text-[#2E2E2E]/70">
                    {new Date().toLocaleDateString('en-US', { 
                      weekday: 'long', 
                      year: 'numeric', 
                      month: 'long', 
                      day: 'numeric' 
                    })}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Page Content */}
        <main className="flex-1">
          {children}
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;