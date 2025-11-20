import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  Search, 
  Bell, 
  MessageSquare, 
  User, 
  ChevronDown,
  Home,
  Briefcase,
  Star,
  DollarSign,
  BookOpen,
  Settings,
  LogOut,
  Menu,
  X
} from 'lucide-react';

const FreelancerHeader: React.FC = () => {
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  const navigation = [
    { name: 'Dashboard', href: '/freelancer/dashboard', icon: Home },
    { name: 'Find Work', href: '/freelancer/job-feed', icon: Search },
    { name: 'My Jobs', href: '/freelancer/orders', icon: Briefcase },
    { name: 'Proposals', href: '/freelancer/my-proposals', icon: Star },
    { name: 'Earnings', href: '/freelancer/earnings', icon: DollarSign },
  ];

  const profileMenuItems = [
    { name: 'Profile', href: '/freelancer/profile', icon: User },
    { name: 'Portfolio', href: '/freelancer/portfolio', icon: Briefcase },
    { name: 'Learning', href: '/freelancer/learning', icon: BookOpen },
    { name: 'Settings', href: '/freelancer/settings', icon: Settings },
    { name: 'Sign Out', href: '/login', icon: LogOut },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <header className="bg-white border-b border-gray-200 fixed top-0 left-0 right-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center">
            <Link to="/freelancer/dashboard" className="flex items-center">
              <img
                src="/src/assets/Logo/logo.png"
                alt="FreelanceNest"
                className="h-8 w-auto"
              />
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-8">
            {navigation.map((item) => {
              const Icon = item.icon;
              return (
                <Link
                  key={item.name}
                  to={item.href}
                  className={`flex items-center px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                    isActive(item.href)
                      ? 'text-[#FF6B00] bg-[#ffeee3]'
                      : 'text-[#2E2E2E] hover:text-[#FF6B00] hover:bg-[#ffeee3]'
                  }`}
                >
                  <Icon className="w-4 h-4 mr-2" />
                  {item.name}
                </Link>
              );
            })}
          </nav>

          {/* Right side */}
          <div className="flex items-center space-x-4">
            {/* Search Bar */}
            <div className="hidden lg:block relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                placeholder="Search jobs..."
                className="block w-80 pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-[#FF6B00] focus:border-[#FF6B00] text-sm"
              />
            </div>

            {/* Notifications */}
            <Link
              to="/freelancer/notifications"
              className="p-2 text-gray-600 hover:text-[#FF6B00] hover:bg-[#ffeee3] rounded-md transition-colors relative"
            >
              <Bell className="w-5 h-5" />
              <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
            </Link>

            {/* Messages */}
            <Link
              to="/freelancer/messages"
              className="p-2 text-gray-600 hover:text-[#FF6B00] hover:bg-[#ffeee3] rounded-md transition-colors relative"
            >
              <MessageSquare className="w-5 h-5" />
              <span className="absolute top-1 right-1 w-2 h-2 bg-blue-500 rounded-full"></span>
            </Link>

            {/* Profile Dropdown */}
            <div className="relative">
              <button
                onClick={() => setIsProfileMenuOpen(!isProfileMenuOpen)}
                className="flex items-center space-x-2 p-2 text-gray-600 hover:text-[#FF6B00] hover:bg-[#ffeee3] rounded-md transition-colors"
              >
                <img
                  src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=64&h=64&fit=crop&crop=face&auto=format"
                  alt="Profile"
                  className="w-8 h-8 rounded-full object-cover border-2 border-[#FF6B00]"
                />
                <ChevronDown className="w-4 h-4" />
              </button>

              {isProfileMenuOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg border border-gray-200 py-1 z-50">
                  <div className="px-4 py-2 border-b border-gray-200">
                    <p className="text-sm font-medium text-[#2E2E2E]">Alex Thompson</p>
                    <p className="text-xs text-gray-500">Full Stack Developer</p>
                  </div>
                  {profileMenuItems.map((item) => {
                    const Icon = item.icon;
                    return (
                      <Link
                        key={item.name}
                        to={item.href}
                        className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-[#ffeee3] hover:text-[#FF6B00] transition-colors"
                        onClick={() => setIsProfileMenuOpen(false)}
                      >
                        <Icon className="w-4 h-4 mr-2" />
                        {item.name}
                      </Link>
                    );
                  })}
                </div>
              )}
            </div>

            {/* Mobile menu button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden p-2 text-gray-600 hover:text-[#FF6B00] hover:bg-[#ffeee3] rounded-md transition-colors"
            >
              {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden border-t border-gray-200 bg-white">
            <div className="px-2 pt-2 pb-3 space-y-1">
              {navigation.map((item) => {
                const Icon = item.icon;
                return (
                  <Link
                    key={item.name}
                    to={item.href}
                    className={`flex items-center px-3 py-2 rounded-md text-base font-medium transition-colors ${
                      isActive(item.href)
                        ? 'text-[#FF6B00] bg-[#ffeee3]'
                        : 'text-[#2E2E2E] hover:text-[#FF6B00] hover:bg-[#ffeee3]'
                    }`}
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    <Icon className="w-5 h-5 mr-3" />
                    {item.name}
                  </Link>
                );
              })}
            </div>
            {/* Mobile Search */}
            <div className="px-4 py-3 border-t border-gray-200">
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Search className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="text"
                  placeholder="Search jobs..."
                  className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-[#FF6B00] focus:border-[#FF6B00] text-sm"
                />
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Click outside to close profile menu */}
      {isProfileMenuOpen && (
        <div
          className="fixed inset-0 z-40"
          onClick={() => setIsProfileMenuOpen(false)}
        />
      )}
    </header>
  );
};

export default FreelancerHeader;