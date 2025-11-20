import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Search, Bell, MessageCircle, Settings, User, LogOut, ChevronDown, Menu, X } from 'lucide-react';

const ClientHeader: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);
  const [isNotificationDropdownOpen, setIsNotificationDropdownOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const location = useLocation();

  // Mock client data
  const clientData = {
    name: 'Sarah Williams',
    email: 'sarah.williams@example.com',
    avatar: '/api/placeholder/40/40',
    company: 'TechCorp Inc.'
  };

  // Navigation items for client
  const navItems = [
    { label: 'Dashboard', href: '/client/dashboard' },
    { label: 'My Jobs', href: '/client/my-jobs' },
    { label: 'Find Talent', href: '/talent-marketplace' },
    { label: 'Messages', href: '/client/messages' },
  ];

  // Mock notifications
  const notifications = [
    { id: 1, message: 'New proposal received for "Website Redesign"', time: '2 hours ago', read: false },
    { id: 2, message: 'Milestone completed for "Mobile App"', time: '4 hours ago', read: false },
    { id: 3, message: 'Payment released successfully', time: '1 day ago', read: true },
  ];

  const unreadCount = notifications.filter(n => !n.read).length;

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Searching for:', searchQuery);
  };

  const handleLogout = () => {
    // Clear any stored auth data
    localStorage.removeItem('accountType');
    // Redirect to landing page
    window.location.href = '/';
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white shadow-sm border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center mr-8">
            <Link to="/client/dashboard" className="text-2xl font-bold">
              <span className="text-[#2E2E2E]">Freelance</span>
              <span className="text-[#FF6B00]">Nest</span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8 ml-4">
            {navItems.map((item) => (
              <Link
                key={item.href}
                to={item.href}
                className={`text-sm font-medium transition-colors ${
                  location.pathname === item.href
                    ? 'text-[#FF6B00]'
                    : 'text-[#2E2E2E] hover:text-[#FF6B00]'
                }`}
              >
                {item.label}
              </Link>
            ))}
          </nav>

          {/* Search Bar */}
          <div className="hidden lg:flex flex-1 max-w-lg mx-8">
            <form onSubmit={handleSearchSubmit} className="relative w-full">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <input
                  type="text"
                  placeholder="Search freelancers, services..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF6B00] focus:border-transparent"
                />
              </div>
            </form>
          </div>

          {/* Right side - Desktop */}
          <div className="hidden md:flex items-center space-x-4">
            {/* Post Job Button */}
            <Link
              to="/client/post-job"
              className="bg-[#FF6B00] hover:bg-[#FF9F45] text-white px-4 py-2 rounded-lg font-medium transition-colors"
            >
              Post a Job
            </Link>

            {/* Notifications */}
            <div className="relative">
              <button
                onClick={() => setIsNotificationDropdownOpen(!isNotificationDropdownOpen)}
                className="relative p-2 text-gray-600 hover:text-[#FF6B00] transition-colors"
              >
                <Bell className="w-5 h-5" />
                {unreadCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                    {unreadCount}
                  </span>
                )}
              </button>

              {/* Notifications Dropdown */}
              {isNotificationDropdownOpen && (
                <div className="absolute right-0 mt-2 w-80 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-50">
                  <div className="px-4 py-2 border-b border-gray-100">
                    <h3 className="font-semibold text-[#2E2E2E]">Notifications</h3>
                  </div>
                  <div className="max-h-64 overflow-y-auto">
                    {notifications.map((notification) => (
                      <div
                        key={notification.id}
                        className={`px-4 py-3 hover:bg-gray-50 ${!notification.read ? 'bg-blue-50' : ''}`}
                      >
                        <p className="text-sm text-[#2E2E2E]">{notification.message}</p>
                        <p className="text-xs text-gray-500 mt-1">{notification.time}</p>
                      </div>
                    ))}
                  </div>
                  <div className="px-4 py-2 border-t border-gray-100">
                    <Link to="/client/notifications" className="text-sm text-[#FF6B00] hover:underline">
                      View all notifications
                    </Link>
                  </div>
                </div>
              )}
            </div>

            {/* Messages */}
            <Link
              to="/client/messages"
              className="p-2 text-gray-600 hover:text-[#FF6B00] transition-colors"
            >
              <MessageCircle className="w-5 h-5" />
            </Link>

            {/* Profile Dropdown */}
            <div className="relative">
              <button
                onClick={() => setIsProfileDropdownOpen(!isProfileDropdownOpen)}
                className="flex items-center space-x-2 p-1 rounded-lg hover:bg-gray-50 transition-colors"
              >
                <img
                  src={clientData.avatar}
                  alt={clientData.name}
                  className="w-8 h-8 rounded-full object-cover"
                />
                <ChevronDown className="w-4 h-4 text-gray-500" />
              </button>

              {/* Profile Dropdown */}
              {isProfileDropdownOpen && (
                <div className="absolute right-0 mt-2 w-64 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-50">
                  <div className="px-4 py-3 border-b border-gray-100">
                    <div className="flex items-center space-x-3">
                      <img
                        src={clientData.avatar}
                        alt={clientData.name}
                        className="w-10 h-10 rounded-full object-cover"
                      />
                      <div>
                        <p className="font-medium text-[#2E2E2E]">{clientData.name}</p>
                        <p className="text-sm text-gray-500">{clientData.company}</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="py-2">
                    <Link
                      to="/client/profile"
                      className="flex items-center px-4 py-2 text-sm text-[#2E2E2E] hover:bg-gray-50"
                    >
                      <User className="w-4 h-4 mr-3" />
                      View Profile
                    </Link>
                    <Link
                      to="/client/settings"
                      className="flex items-center px-4 py-2 text-sm text-[#2E2E2E] hover:bg-gray-50"
                    >
                      <Settings className="w-4 h-4 mr-3" />
                      Settings
                    </Link>
                    <Link
                      to="/client/invoices-tax"
                      className="flex items-center px-4 py-2 text-sm text-[#2E2E2E] hover:bg-gray-50"
                    >
                      <svg className="w-4 h-4 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                      </svg>
                      Billing & Invoices
                    </Link>
                  </div>

                  <div className="border-t border-gray-100 pt-2">
                    <button
                      onClick={handleLogout}
                      className="flex items-center w-full px-4 py-2 text-sm text-red-600 hover:bg-red-50"
                    >
                      <LogOut className="w-4 h-4 mr-3" />
                      Sign Out
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="p-2 text-gray-600 hover:text-[#FF6B00] transition-colors"
            >
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white border-t border-gray-200">
          <div className="px-4 py-4 space-y-4">
            {/* Search */}
            <form onSubmit={handleSearchSubmit}>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <input
                  type="text"
                  placeholder="Search freelancers, services..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF6B00]"
                />
              </div>
            </form>

            {/* Navigation */}
            <nav className="space-y-2">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  to={item.href}
                  className={`block py-2 text-base font-medium ${
                    location.pathname === item.href
                      ? 'text-[#FF6B00]'
                      : 'text-[#2E2E2E]'
                  }`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.label}
                </Link>
              ))}
            </nav>

            {/* Quick Actions */}
            <div className="space-y-2 pt-4 border-t border-gray-200">
              <Link
                to="/client/post-job"
                className="block w-full bg-[#FF6B00] text-white text-center py-2 rounded-lg font-medium"
                onClick={() => setIsMenuOpen(false)}
              >
                Post a Job
              </Link>
              
              <div className="flex space-x-2">
                <Link
                  to="/client/messages"
                  className="flex-1 flex items-center justify-center py-2 border border-gray-200 rounded-lg"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <MessageCircle className="w-5 h-5 mr-2" />
                  Messages
                </Link>
                <Link
                  to="/client/profile"
                  className="flex-1 flex items-center justify-center py-2 border border-gray-200 rounded-lg"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <User className="w-5 h-5 mr-2" />
                  Profile
                </Link>
              </div>
            </div>

            {/* User Info */}
            <div className="pt-4 border-t border-gray-200">
              <div className="flex items-center space-x-3 mb-3">
                <img
                  src={clientData.avatar}
                  alt={clientData.name}
                  className="w-10 h-10 rounded-full object-cover"
                />
                <div>
                  <p className="font-medium text-[#2E2E2E]">{clientData.name}</p>
                  <p className="text-sm text-gray-500">{clientData.company}</p>
                </div>
              </div>
              <button
                onClick={handleLogout}
                className="flex items-center w-full text-left py-2 text-red-600"
              >
                <LogOut className="w-4 h-4 mr-3" />
                Sign Out
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Click outside handlers */}
      {(isProfileDropdownOpen || isNotificationDropdownOpen) && (
        <div
          className="fixed inset-0 z-40"
          onClick={() => {
            setIsProfileDropdownOpen(false);
            setIsNotificationDropdownOpen(false);
          }}
        />
      )}
    </header>
  );
};

export default ClientHeader;
