import React, { useState } from 'react';

const Notifications: React.FC = () => {
  const [activeFilter, setActiveFilter] = useState('all');
  const [notificationSettings, setNotificationSettings] = useState({
    email: true,
    push: true,
    sms: false
  });

  const notifications = [
    {
      id: 1,
      type: 'proposal',
      title: 'Proposal Accepted',
      message: 'Your proposal for "E-commerce Website Development" has been accepted by TechStart Inc.',
      time: '2 minutes ago',
      read: false,
      action: 'View Project',
      icon: '✅',
      priority: 'high'
    },
    {
      id: 2,
      type: 'message',
      title: 'New Message',
      message: 'Sarah from Creative Agency sent you a message about the ongoing project.',
      time: '15 minutes ago',
      read: false,
      action: 'Reply',
      icon: '💬',
      priority: 'medium'
    },
    {
      id: 3,
      type: 'payment',
      title: 'Payment Received',
      message: 'You received $2,500 for "Mobile App UI Design" project.',
      time: '1 hour ago',
      read: true,
      action: 'View Details',
      icon: '💰',
      priority: 'high'
    },
    {
      id: 4,
      type: 'invitation',
      title: 'Project Invitation',
      message: 'BigCorp Ltd. invited you to submit a proposal for their new project.',
      time: '2 hours ago',
      read: false,
      action: 'View Invitation',
      icon: '📩',
      priority: 'medium'
    },
    {
      id: 5,
      type: 'milestone',
      title: 'Milestone Approved',
      message: 'Milestone 2 of "Website Redesign" has been approved by the client.',
      time: '3 hours ago',
      read: true,
      action: 'Continue Work',
      icon: '🎯',
      priority: 'medium'
    },
    {
      id: 6,
      type: 'system',
      title: 'Profile Verification Complete',
      message: 'Your profile verification has been completed successfully.',
      time: '1 day ago',
      read: true,
      action: 'View Profile',
      icon: '✨',
      priority: 'low'
    },
    {
      id: 7,
      type: 'deadline',
      title: 'Project Deadline Reminder',
      message: 'Project "Logo Design" is due tomorrow. Make sure to submit on time.',
      time: '1 day ago',
      read: false,
      action: 'View Project',
      icon: '⏰',
      priority: 'high'
    },
    {
      id: 8,
      type: 'review',
      title: 'New Review Received',
      message: 'StartupCo left a 5-star review for your recent work.',
      time: '2 days ago',
      read: true,
      action: 'View Review',
      icon: '⭐',
      priority: 'medium'
    }
  ];

  const filterOptions = [
    { id: 'all', name: 'All Notifications', count: notifications.length },
    { id: 'unread', name: 'Unread', count: notifications.filter(n => !n.read).length },
    { id: 'proposal', name: 'Proposals', count: notifications.filter(n => n.type === 'proposal').length },
    { id: 'message', name: 'Messages', count: notifications.filter(n => n.type === 'message').length },
    { id: 'payment', name: 'Payments', count: notifications.filter(n => n.type === 'payment').length },
    { id: 'system', name: 'System', count: notifications.filter(n => n.type === 'system').length }
  ];

  const filteredNotifications = activeFilter === 'all' 
    ? notifications 
    : activeFilter === 'unread'
    ? notifications.filter(n => !n.read)
    : notifications.filter(n => n.type === activeFilter);

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high':
        return 'border-l-red-500';
      case 'medium':
        return 'border-l-yellow-500';
      case 'low':
        return 'border-l-green-500';
      default:
        return 'border-l-gray-300';
    }
  };

  const markAsRead = (id: number) => {
    // In a real app, this would update the notification status
    console.log(`Marking notification ${id} as read`);
  };

  const markAllAsRead = () => {
    // In a real app, this would mark all notifications as read
    console.log('Marking all notifications as read');
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h1 className="text-3xl font-bold text-[#2E2E2E] mb-2">Notifications</h1>
              <p className="text-gray-600">Stay updated with your freelancing activities</p>
            </div>
            <div className="flex items-center gap-4">
              <button 
                onClick={markAllAsRead}
                className="text-[#FF6B00] hover:underline font-medium"
              >
                Mark all as read
              </button>
              <button className="px-4 py-2 bg-[#FF6B00] text-white rounded-lg hover:bg-[#FF9F45] transition-colors">
                Settings
              </button>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Filters Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 mb-6">
              <h3 className="text-lg font-semibold text-[#2E2E2E] mb-4">Filter by Type</h3>
              <div className="space-y-2">
                {filterOptions.map((option) => (
                  <button
                    key={option.id}
                    onClick={() => setActiveFilter(option.id)}
                    className={`w-full flex items-center justify-between p-3 rounded-lg text-left transition-colors ${
                      activeFilter === option.id
                        ? 'bg-[#ffeee3] text-[#FF6B00]'
                        : 'hover:bg-gray-50 text-gray-600'
                    }`}
                  >
                    <span className="font-medium">{option.name}</span>
                    <span className={`px-2 py-1 text-xs rounded-full ${
                      activeFilter === option.id
                        ? 'bg-[#FF6B00] text-white'
                        : 'bg-gray-100 text-gray-600'
                    }`}>
                      {option.count}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* Notification Settings */}
            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
              <h3 className="text-lg font-semibold text-[#2E2E2E] mb-4">Notification Preferences</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium text-[#2E2E2E]">Email Notifications</p>
                    <p className="text-sm text-gray-500">Receive notifications via email</p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={notificationSettings.email}
                      onChange={(e) => setNotificationSettings({...notificationSettings, email: e.target.checked})}
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-orange-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#FF6B00]"></div>
                  </label>
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium text-[#2E2E2E]">Push Notifications</p>
                    <p className="text-sm text-gray-500">Receive browser notifications</p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={notificationSettings.push}
                      onChange={(e) => setNotificationSettings({...notificationSettings, push: e.target.checked})}
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-orange-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#FF6B00]"></div>
                  </label>
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium text-[#2E2E2E]">SMS Notifications</p>
                    <p className="text-sm text-gray-500">Receive text messages</p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={notificationSettings.sms}
                      onChange={(e) => setNotificationSettings({...notificationSettings, sms: e.target.checked})}
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-orange-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#FF6B00]"></div>
                  </label>
                </div>
              </div>
            </div>
          </div>

          {/* Notifications List */}
          <div className="lg:col-span-3">
            <div className="bg-white rounded-xl shadow-sm border border-gray-100">
              <div className="p-6 border-b border-gray-100">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold text-[#2E2E2E]">
                    {activeFilter === 'all' ? 'All Notifications' : 
                     activeFilter === 'unread' ? 'Unread Notifications' :
                     filterOptions.find(f => f.id === activeFilter)?.name}
                  </h3>
                  <span className="text-sm text-gray-500">
                    {filteredNotifications.length} notifications
                  </span>
                </div>
              </div>

              <div className="divide-y divide-gray-100">
                {filteredNotifications.length === 0 ? (
                  <div className="p-12 text-center">
                    <span className="text-6xl mb-4 block">📭</span>
                    <h3 className="text-lg font-semibold text-[#2E2E2E] mb-2">No Notifications</h3>
                    <p className="text-gray-600">
                      {activeFilter === 'unread' 
                        ? "You're all caught up! No unread notifications."
                        : "No notifications found for this filter."}
                    </p>
                  </div>
                ) : (
                  filteredNotifications.map((notification) => (
                    <div
                      key={notification.id}
                      className={`p-6 hover:bg-gray-50 transition-colors border-l-4 ${getPriorityColor(notification.priority)} ${
                        !notification.read ? 'bg-blue-50' : ''
                      }`}
                    >
                      <div className="flex items-start gap-4">
                        <div className="flex-shrink-0">
                          <span className="text-2xl">{notification.icon}</span>
                        </div>
                        
                        <div className="flex-1 min-w-0">
                          <div className="flex items-start justify-between gap-4">
                            <div>
                              <h4 className="text-base font-semibold text-[#2E2E2E] mb-1">
                                {notification.title}
                                {!notification.read && (
                                  <span className="ml-2 w-2 h-2 bg-[#FF6B00] rounded-full inline-block"></span>
                                )}
                              </h4>
                              <p className="text-gray-600 text-sm mb-2">{notification.message}</p>
                              <p className="text-xs text-gray-500">{notification.time}</p>
                            </div>
                            
                            <div className="flex items-center gap-2">
                              <button 
                                className="text-[#FF6B00] hover:underline text-sm font-medium"
                                onClick={() => markAsRead(notification.id)}
                              >
                                {notification.action}
                              </button>
                              {!notification.read && (
                                <button
                                  onClick={() => markAsRead(notification.id)}
                                  className="text-gray-400 hover:text-gray-600 text-sm"
                                >
                                  Mark as read
                                </button>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>

              {filteredNotifications.length > 0 && (
                <div className="p-6 border-t border-gray-100">
                  <div className="flex items-center justify-center">
                    <button className="text-[#FF6B00] hover:underline font-medium">
                      Load more notifications
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Notifications;
