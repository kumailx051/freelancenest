import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { 
  Bell, 
  MessageSquare, 
  User, 
  ChevronDown,
  Home,
  Briefcase,
  Users,
  Settings,
  LogOut,
  Menu,
  X,
  FileText,
  CreditCard,
  CheckCircle,
  Package
} from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { FreelanceFirestoreService } from '../../lib/firestoreService';

const ClientHeader: React.FC = () => {
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
  const [isNotificationMenuOpen, setIsNotificationMenuOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { currentUser, logout } = useAuth();
  const [clientData, setClientData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  // Load client data from Firebase
  useEffect(() => {
    const loadClientData = async () => {
      try {
        if (currentUser) {
          const users = await FreelanceFirestoreService.getUserProfile(currentUser.uid);
          if (users.length > 0) {
            setClientData(users[0]);
          }
        }
      } catch (error) {
        console.error('Error loading client data:', error);
      } finally {
        setLoading(false);
      }
    };

    loadClientData();
  }, [currentUser]);

  // Sample notifications data
  const notifications = [
    {
      id: 1,
      title: 'New Proposal Received',
      message: 'Sarah Johnson submitted a proposal for your React project',
      time: '5 minutes ago',
      read: false,
      type: 'proposal'
    },
    {
      id: 2,
      title: 'Project Milestone Completed',
      message: 'Mike Brown completed milestone 2 of your website project',
      time: '2 hours ago',
      read: false,
      type: 'milestone'
    },
    {
      id: 3,
      title: 'Payment Processed',
      message: 'Your payment of $500 has been processed successfully',
      time: '1 day ago',
      read: true,
      type: 'payment'
    },
    {
      id: 4,
      title: 'New Message',
      message: 'Alex Thompson sent you a message about the logo design',
      time: '2 days ago',
      read: true,
      type: 'message'
    }
  ];

  const unreadCount = notifications.filter(n => !n.read).length;

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case 'proposal':
        return <FileText className="w-4 h-4 text-[#FF6B00]" />;
      case 'milestone':
        return <CheckCircle className="w-4 h-4 text-green-500" />;
      case 'payment':
        return <CreditCard className="w-4 h-4 text-blue-500" />;
      case 'message':
        return <MessageSquare className="w-4 h-4 text-purple-500" />;
      default:
        return <Bell className="w-4 h-4 text-gray-500" />;
    }
  };

  // Navigation items for client
  const navigation = [
    { name: 'Dashboard', href: '/client/dashboard', icon: Home },
    { name: 'My Jobs', href: '/client/my-jobs', icon: Briefcase },
    { name: 'Find Talent', href: '/client/browse-freelancers', icon: Users },
    { name: 'Hire Gig', href: '/client/hire-gig', icon: Package },
  ];

  const profileMenuItems = [
    { name: 'Profile', href: '/client/profile', icon: User },
    { name: 'Settings', href: '/client/settings', icon: Settings },
    { name: 'Sign Out', href: '#', icon: LogOut, onClick: true },
  ];

  const isActive = (path: string) => location.pathname === path;

  const getDisplayName = () => {
    if (clientData?.profile?.fullName) return clientData.profile.fullName;
    if (clientData?.profile?.firstName && clientData?.profile?.lastName) {
      return `${clientData.profile.firstName} ${clientData.profile.lastName}`;
    }
    if (clientData?.profile?.displayName) return clientData.profile.displayName;
    if (clientData?.fullName) return clientData.fullName;
    if (clientData?.firstName && clientData?.lastName) {
      return `${clientData.firstName} ${clientData.lastName}`;
    }
    if (clientData?.displayName) return clientData.displayName;
    return currentUser?.displayName || currentUser?.email?.split('@')[0] || 'Client';
  };

  const getJobTitle = () => {
    return clientData?.profile?.jobTitle || clientData?.profile?.companyName || clientData?.jobTitle || clientData?.companyName || 'Client';
  };

  const handleSignOut = async () => {
    try {
      setIsProfileMenuOpen(false);
      await logout();
      navigate('/login');
    } catch (error) {
      console.error('Error signing out:', error);
      // Still navigate to login page even if logout fails
      navigate('/login');
    }
  };

  const handleProfileMenuClick = (item: any) => {
    setIsProfileMenuOpen(false);
    if (item.onClick) {
      handleSignOut();
    }
  };

  return (
    <header className="bg-white border-b border-gray-200 fixed top-0 left-0 right-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Brand Name */}
          <div className="flex items-center">
            <Link to="/client/dashboard" className="flex items-center">
              <span className="text-2xl font-bold text-[#FF6B00] tracking-tight">
                FreelanceNest
              </span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-6">
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
          <div className="flex items-center space-x-3">
            {/* Notifications */}
            <div className="relative">
              <button
                onClick={() => setIsNotificationMenuOpen(!isNotificationMenuOpen)}
                className="p-2 text-gray-600 hover:text-[#FF6B00] hover:bg-[#ffeee3] rounded-md transition-colors relative"
              >
                <Bell className="w-5 h-5" />
                {unreadCount > 0 && (
                  <span className="absolute top-1 right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                    {unreadCount}
                  </span>
                )}
              </button>

              {/* Notifications Dropdown */}
              {isNotificationMenuOpen && (
                <div className="absolute right-0 mt-2 w-80 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-50">
                  <div className="px-4 py-2 border-b border-gray-100">
                    <div className="flex items-center justify-between">
                      <h3 className="font-semibold text-[#2E2E2E]">Notifications</h3>
                      {unreadCount > 0 && (
                        <span className="text-xs text-[#FF6B00] bg-[#ffeee3] px-2 py-1 rounded-full">
                          {unreadCount} new
                        </span>
                      )}
                    </div>
                  </div>
                  <div className="max-h-64 overflow-y-auto">
                    {notifications.map((notification) => (
                      <div
                        key={notification.id}
                        className={`px-4 py-3 hover:bg-gray-50 cursor-pointer ${!notification.read ? 'bg-blue-50' : ''}`}
                      >
                        <div className="flex items-start space-x-3">
                          <div className="flex items-center space-x-2">
                            {getNotificationIcon(notification.type)}
                            <div className={`w-2 h-2 rounded-full ${!notification.read ? 'bg-[#FF6B00]' : 'bg-transparent'}`}></div>
                          </div>
                          <div className="flex-1">
                            <p className="text-sm font-medium text-[#2E2E2E]">{notification.title}</p>
                            <p className="text-xs text-[#2E2E2E]/80 mt-1">{notification.message}</p>
                            <p className="text-xs text-gray-500 mt-1">{notification.time}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="px-4 py-2 border-t border-gray-100">
                    <Link 
                      to="/client/notifications" 
                      className="text-sm text-[#FF6B00] hover:underline"
                      onClick={() => setIsNotificationMenuOpen(false)}
                    >
                      View all notifications
                    </Link>
                  </div>
                </div>
              )}
            </div>

            {/* Messages */}
            <Link
              to="/client/messages"
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
                {loading ? (
                  <div className="w-8 h-8 rounded-full bg-gray-200 animate-pulse"></div>
                ) : (
                  <img
                    src={clientData?.profile?.profilePictureUrl || `https://ui-avatars.com/api/?name=${encodeURIComponent(getDisplayName())}&background=FF6B00&color=fff&size=32`}
                    alt="Profile"
                    className="w-8 h-8 rounded-full object-cover border-2 border-[#FF6B00]"
                  />
                )}
                <ChevronDown className="w-4 h-4" />
              </button>

              {isProfileMenuOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg border border-gray-200 py-1 z-50">
                  <div className="px-4 py-2 border-b border-gray-200">
                    <p className="text-sm font-medium text-[#2E2E2E]">{getDisplayName()}</p>
                    <p className="text-xs text-gray-500">{getJobTitle()}</p>
                  </div>
                  {profileMenuItems.map((item) => {
                    const Icon = item.icon;
                    if (item.onClick) {
                      return (
                        <button
                          key={item.name}
                          onClick={() => handleProfileMenuClick(item)}
                          className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-[#ffeee3] hover:text-[#FF6B00] transition-colors text-left"
                        >
                          <Icon className="w-4 h-4 mr-2" />
                          {item.name}
                        </button>
                      );
                    }
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
          </div>
        )}
      </div>

      {/* Click outside to close menus */}
      {(isProfileMenuOpen || isNotificationMenuOpen) && (
        <div
          className="fixed inset-0 z-40"
          onClick={() => {
            setIsProfileMenuOpen(false);
            setIsNotificationMenuOpen(false);
          }}
        />
      )}
    </header>
  );
};

export default ClientHeader;
