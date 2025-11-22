import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { 
  Bell, 
  MessageSquare, 
  User, 
  ChevronDown,
  Home,
  Briefcase,
  Star,
  DollarSign,
  Settings,
  LogOut,
  Menu,
  X,
  CreditCard,
  CheckCircle,
  Search
} from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { useMessages } from '../../contexts/MessageContext';
import { FreelanceFirestoreService } from '../../lib/firestoreService';

const FreelancerHeader: React.FC = () => {
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
  const [isNotificationMenuOpen, setIsNotificationMenuOpen] = useState(false);
  const [isMessageMenuOpen, setIsMessageMenuOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { currentUser, logout } = useAuth();
  const { unreadMessageCount, conversations } = useMessages();
  const [freelancerData, setFreelancerData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  // Load freelancer data from Firebase
  useEffect(() => {
    const loadFreelancerData = async () => {
      try {
        if (currentUser) {
          const users = await FreelanceFirestoreService.getUserProfile(currentUser.uid);
          if (users.length > 0) {
            setFreelancerData(users[0]);
          }
        }
      } catch (error) {
        console.error('Error loading freelancer data:', error);
      } finally {
        setLoading(false);
      }
    };

    loadFreelancerData();
  }, [currentUser]);

  // Handle click outside to close dropdowns
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Element;
      if (!target.closest('.dropdown-container')) {
        setIsProfileMenuOpen(false);
        setIsNotificationMenuOpen(false);
        setIsMessageMenuOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Sample notifications data
  const notifications = [
    {
      id: 1,
      title: 'New Job Opportunity',
      message: 'A new project matches your skills in React Development',
      time: '2 minutes ago',
      read: false,
      type: 'job'
    },
    {
      id: 2,
      title: 'Payment Received',
      message: 'You received $500 for "E-commerce Website" project',
      time: '1 hour ago',
      read: false,
      type: 'payment'
    },
    {
      id: 3,
      title: 'Project Update',
      message: 'Client approved your milestone submission',
      time: '3 hours ago',
      read: true,
      type: 'project'
    },
    {
      id: 4,
      title: 'New Message',
      message: 'John Smith sent you a message about the project',
      time: '5 hours ago',
      read: true,
      type: 'message'
    }
  ];

  const unreadCount = notifications.filter(n => !n.read).length;

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case 'job':
        return <Briefcase className="w-4 h-4 text-[#FF6B00]" />;
      case 'payment':
        return <CreditCard className="w-4 h-4 text-green-500" />;
      case 'project':
        return <CheckCircle className="w-4 h-4 text-blue-500" />;
      case 'message':
        return <MessageSquare className="w-4 h-4 text-purple-500" />;
      default:
        return <Bell className="w-4 h-4 text-gray-500" />;
    }
  };

  const navigation = [
    { name: 'Dashboard', href: '/freelancer/dashboard', icon: Home },
    { name: 'Job Feed', href: '/freelancer/job-feed', icon: Search },
    { name: 'My Orders', href: '/freelancer/orders', icon: Briefcase },
    { name: 'Proposals', href: '/freelancer/my-proposals', icon: Star },
    { name: 'Earnings', href: '/freelancer/earnings', icon: DollarSign },
  ];

  const profileMenuItems = [
    { name: 'Profile', href: '/freelancer/profile', icon: User },
    { name: 'Portfolio', href: '/freelancer/portfolio', icon: Briefcase },
    { name: 'Settings', href: '/freelancer/settings', icon: Settings },
    { name: 'Sign Out', href: '#', icon: LogOut, onClick: true },
  ];

  const isActive = (path: string) => location.pathname === path;

  const getDisplayName = () => {
    if (freelancerData?.profile?.fullName) return freelancerData.profile.fullName;
    if (freelancerData?.profile?.firstName && freelancerData?.profile?.lastName) {
      return `${freelancerData.profile.firstName} ${freelancerData.profile.lastName}`;
    }
    if (freelancerData?.profile?.displayName) return freelancerData.profile.displayName;
    if (freelancerData?.fullName) return freelancerData.fullName;
    if (freelancerData?.firstName && freelancerData?.lastName) {
      return `${freelancerData.firstName} ${freelancerData.lastName}`;
    }
    if (freelancerData?.displayName) return freelancerData.displayName;
    return currentUser?.displayName || currentUser?.email?.split('@')[0] || 'Freelancer';
  };

  const getJobTitle = () => {
    return freelancerData?.profile?.jobTitle || freelancerData?.jobTitle || 'Freelancer';
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
            <Link to="/freelancer/dashboard" className="flex items-center">
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
            <div className="relative dropdown-container">
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
                      to="/freelancer/notifications" 
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
            <div className="relative dropdown-container">
              <button
                onClick={() => setIsMessageMenuOpen(!isMessageMenuOpen)}
                className="p-2 text-gray-600 hover:text-[#FF6B00] hover:bg-[#ffeee3] rounded-md transition-colors relative"
              >
                <MessageSquare className="w-5 h-5" />
                {unreadMessageCount > 0 && (
                  <span className="absolute top-1 right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                    {unreadMessageCount > 99 ? '99+' : unreadMessageCount}
                  </span>
                )}
              </button>

              {/* Messages Dropdown */}
              {isMessageMenuOpen && (
                <div className="absolute right-0 mt-2 w-80 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-50">
                  <div className="px-4 py-2 border-b border-gray-100">
                    <div className="flex items-center justify-between">
                      <h3 className="font-semibold text-[#2E2E2E]">Messages</h3>
                      {unreadMessageCount > 0 && (
                        <span className="text-xs text-[#FF6B00] bg-[#ffeee3] px-2 py-1 rounded-full">
                          {unreadMessageCount} new
                        </span>
                      )}
                    </div>
                  </div>
                  <div className="max-h-64 overflow-y-auto">
                    {conversations.length === 0 ? (
                      <div className="px-4 py-8 text-center text-gray-500">
                        <MessageSquare className="w-8 h-8 mx-auto mb-2 text-gray-400" />
                        <p>No messages yet</p>
                      </div>
                    ) : (
                      conversations.slice(0, 5).map((conversation) => {
                        const otherParticipantId = conversation.participants.find(id => id !== currentUser?.uid);
                        const otherParticipantName = otherParticipantId ? conversation.participantNames[otherParticipantId] : 'Unknown';
                        const otherParticipantAvatar = otherParticipantId ? conversation.participantAvatars[otherParticipantId] : '';
                        const unreadCount = conversation.unreadCount[currentUser?.uid || ''] || 0;
                        
                        return (
                          <div
                            key={conversation.id}
                            className={`px-4 py-3 hover:bg-gray-50 cursor-pointer border-b border-gray-50 ${unreadCount > 0 ? 'bg-blue-50' : ''}`}
                            onClick={() => {
                              setIsMessageMenuOpen(false);
                              navigate('/freelancer/messages');
                            }}
                          >
                            <div className="flex items-start space-x-3">
                              <div className="flex-shrink-0">
                                {otherParticipantAvatar ? (
                                  <img src={otherParticipantAvatar} alt={otherParticipantName} className="w-10 h-10 rounded-full" />
                                ) : (
                                  <div className="w-10 h-10 rounded-full bg-[#FF6B00] flex items-center justify-center text-white font-medium">
                                    {otherParticipantName.charAt(0).toUpperCase()}
                                  </div>
                                )}
                              </div>
                              <div className="flex-1 min-w-0">
                                <div className="flex items-center justify-between">
                                  <p className="text-sm font-medium text-[#2E2E2E] truncate">{otherParticipantName}</p>
                                  {unreadCount > 0 && (
                                    <span className="bg-[#FF6B00] text-white text-xs rounded-full w-5 h-5 flex items-center justify-center ml-2">
                                      {unreadCount}
                                    </span>
                                  )}
                                </div>
                                <p className="text-xs text-gray-500 truncate mt-1">{conversation.lastMessage}</p>
                                {conversation.gigTitle && (
                                  <p className="text-xs text-[#FF6B00] truncate mt-1">About: {conversation.gigTitle}</p>
                                )}
                              </div>
                            </div>
                          </div>
                        );
                      })
                    )}
                  </div>
                  <div className="px-4 py-2 border-t border-gray-100">
                    <Link
                      to="/freelancer/messages"
                      className="text-sm text-[#FF6B00] hover:underline"
                      onClick={() => setIsMessageMenuOpen(false)}
                    >
                      View all messages
                    </Link>
                  </div>
                </div>
              )}
            </div>

            {/* Profile Dropdown */}
            <div className="relative dropdown-container">
              <button
                onClick={() => setIsProfileMenuOpen(!isProfileMenuOpen)}
                className="flex items-center space-x-2 p-2 text-gray-600 hover:text-[#FF6B00] hover:bg-[#ffeee3] rounded-md transition-colors"
              >
                {loading ? (
                  <div className="w-8 h-8 rounded-full bg-gray-200 animate-pulse"></div>
                ) : (
                  <img
                    src={freelancerData?.profile?.profilePictureUrl || `https://ui-avatars.com/api/?name=${encodeURIComponent(getDisplayName())}&background=FF6B00&color=fff&size=32`}
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
    </header>
  );
};

export default FreelancerHeader;