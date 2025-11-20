import React, { useState } from 'react';
import { 
  User,
  Mail,
  Globe,
  Lock,
  Bell,
  CreditCard,
  Shield,
  Eye,
  Camera,
  Edit,
  Save,
  X,
  Check,
  AlertTriangle,
  Trash2,
  Plus,
  Settings as SettingsIcon,
  Smartphone,
  Clock,
  DollarSign
} from 'lucide-react';

const Settings: React.FC = () => {
  const [activeTab, setActiveTab] = useState('profile');
  const [isEditing, setIsEditing] = useState(false);
  const [notifications, setNotifications] = useState({
    email: {
      newMessages: true,
      jobMatches: true,
      proposalUpdates: true,
      payments: true,
      marketing: false
    },
    push: {
      newMessages: true,
      jobMatches: false,
      proposalUpdates: true,
      payments: true
    },
    sms: {
      payments: true,
      security: true
    }
  });

  const [privacy, setPrivacy] = useState({
    profileVisibility: 'public',
    showEarnings: false,
    showLocation: true,
    allowDirectContact: true,
    showOnlineStatus: true
  });

  const [preferences, setPreferences] = useState({
    theme: 'system',
    language: 'en',
    timezone: 'America/New_York',
    currency: 'USD',
    autoAcceptInvites: false,
    weeklyDigest: true
  });

  const tabs = [
    { id: 'profile', label: 'Profile', icon: User },
    { id: 'account', label: 'Account & Security', icon: Shield },
    { id: 'notifications', label: 'Notifications', icon: Bell },
    { id: 'payments', label: 'Payment Methods', icon: CreditCard },
    { id: 'privacy', label: 'Privacy', icon: Eye },
    { id: 'preferences', label: 'Preferences', icon: SettingsIcon }
  ];

  const paymentMethods = [
    {
      id: 1,
      type: 'bank',
      name: 'Bank Account',
      details: 'Chase Bank ••••4567',
      primary: true,
      verified: true
    },
    {
      id: 2,
      type: 'paypal',
      name: 'PayPal',
      details: 'alex.johnson@email.com',
      primary: false,
      verified: true
    },
    {
      id: 3,
      type: 'wise',
      name: 'Wise',
      details: 'alex.johnson@email.com',
      primary: false,
      verified: false
    }
  ];

  const securityLog = [
    {
      id: 1,
      action: 'Login',
      device: 'MacBook Pro - Chrome',
      location: 'San Francisco, CA',
      timestamp: '2025-08-30 09:15 AM',
      status: 'success'
    },
    {
      id: 2,
      action: 'Password Changed',
      device: 'iPhone - Safari',
      location: 'San Francisco, CA',
      timestamp: '2025-08-28 06:30 PM',
      status: 'success'
    },
    {
      id: 3,
      action: 'Failed Login Attempt',
      device: 'Unknown Device',
      location: 'New York, NY',
      timestamp: '2025-08-25 11:45 PM',
      status: 'failed'
    }
  ];

  const getPaymentIcon = (type: string) => {
    switch (type) {
      case 'bank':
        return <CreditCard className="w-5 h-5" />;
      case 'paypal':
        return <Globe className="w-5 h-5" />;
      case 'wise':
        return <DollarSign className="w-5 h-5" />;
      default:
        return <CreditCard className="w-5 h-5" />;
    }
  };

  return (
    <div className="min-h-screen bg-[#ffeee3]/30 pt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-[#2E2E2E]">Settings</h1>
            <p className="text-[#2E2E2E]/70">Manage your account and preferences</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4">
              <nav className="space-y-2">
                {tabs.map((tab) => {
                  const Icon = tab.icon;
                  return (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg font-medium transition-colors ${
                        activeTab === tab.id
                          ? 'bg-[#ffeee3] text-[#FF6B00]'
                          : 'text-[#2E2E2E] hover:bg-gray-50'
                      }`}
                    >
                      <Icon className="w-5 h-5" />
                      <span>{tab.label}</span>
                    </button>
                  );
                })}
              </nav>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
              {/* Profile Tab */}
              {activeTab === 'profile' && (
                <div className="space-y-6">
                  <div className="flex justify-between items-center">
                    <h2 className="text-xl font-semibold text-[#2E2E2E]">Profile Information</h2>
                    <button
                      onClick={() => setIsEditing(!isEditing)}
                      className="border border-[#FF6B00] text-[#FF6B00] hover:bg-[#ffeee3] px-4 py-2 rounded-lg font-medium transition-colors flex items-center"
                    >
                      <Edit className="w-4 h-4 mr-2" />
                      {isEditing ? 'Cancel' : 'Edit'}
                    </button>
                  </div>

                  {/* Avatar */}
                  <div className="flex items-center space-x-6">
                    <div className="relative">
                      <img
                        src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop&crop=face&auto=format"
                        alt="Profile"
                        className="w-24 h-24 rounded-full object-cover"
                      />
                      {isEditing && (
                        <button className="absolute bottom-0 right-0 bg-[#FF6B00] hover:bg-[#FF9F45] text-white p-2 rounded-full shadow-lg transition-colors">
                          <Camera className="w-4 h-4" />
                        </button>
                      )}
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-[#2E2E2E]">Alex Johnson</h3>
                      <p className="text-[#2E2E2E]/70">Senior Full Stack Developer</p>
                      <p className="text-sm text-[#2E2E2E]/60">Member since January 2024</p>
                    </div>
                  </div>

                  {/* Form Fields */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-[#2E2E2E] mb-2">First Name</label>
                      <input
                        type="text"
                        value="Alex"
                        disabled={!isEditing}
                        className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#FF6B00] focus:border-transparent disabled:bg-gray-50 disabled:text-gray-500"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-[#2E2E2E] mb-2">Last Name</label>
                      <input
                        type="text"
                        value="Johnson"
                        disabled={!isEditing}
                        className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#FF6B00] focus:border-transparent disabled:bg-gray-50 disabled:text-gray-500"
                      />
                    </div>
                    
                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium text-[#2E2E2E] mb-2">Professional Title</label>
                      <input
                        type="text"
                        value="Senior Full Stack Developer"
                        disabled={!isEditing}
                        className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#FF6B00] focus:border-transparent disabled:bg-gray-50 disabled:text-gray-500"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-[#2E2E2E] mb-2">Location</label>
                      <input
                        type="text"
                        value="San Francisco, CA"
                        disabled={!isEditing}
                        className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#FF6B00] focus:border-transparent disabled:bg-gray-50 disabled:text-gray-500"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-[#2E2E2E] mb-2">Website</label>
                      <input
                        type="url"
                        value="https://alexjohnson.dev"
                        disabled={!isEditing}
                        className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#FF6B00] focus:border-transparent disabled:bg-gray-50 disabled:text-gray-500"
                      />
                    </div>
                    
                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium text-[#2E2E2E] mb-2">Bio</label>
                      <textarea
                        value="Passionate full-stack developer with 5+ years of experience building scalable web applications."
                        disabled={!isEditing}
                        rows={4}
                        className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#FF6B00] focus:border-transparent disabled:bg-gray-50 disabled:text-gray-500 resize-none"
                      />
                    </div>
                  </div>

                  {isEditing && (
                    <div className="flex justify-end space-x-3 pt-6 border-t border-gray-200">
                      <button
                        onClick={() => setIsEditing(false)}
                        className="border border-gray-300 text-[#2E2E2E] hover:bg-gray-50 px-6 py-2 rounded-lg font-medium transition-colors flex items-center"
                      >
                        <X className="w-4 h-4 mr-2" />
                        Cancel
                      </button>
                      <button
                        onClick={() => setIsEditing(false)}
                        className="bg-[#FF6B00] hover:bg-[#FF9F45] text-white px-6 py-2 rounded-lg font-medium transition-colors flex items-center"
                      >
                        <Save className="w-4 h-4 mr-2" />
                        Save Changes
                      </button>
                    </div>
                  )}
                </div>
              )}

              {/* Account & Security Tab */}
              {activeTab === 'account' && (
                <div className="space-y-6">
                  <h2 className="text-xl font-semibold text-[#2E2E2E]">Account & Security</h2>

                  {/* Email & Password */}
                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                      <div className="flex items-center space-x-3">
                        <Mail className="w-5 h-5 text-[#FF6B00]" />
                        <div>
                          <p className="font-medium text-[#2E2E2E]">Email Address</p>
                          <p className="text-sm text-[#2E2E2E]/60">alex.johnson@email.com</p>
                        </div>
                      </div>
                      <button className="text-[#FF6B00] hover:text-[#FF9F45] font-medium">Change</button>
                    </div>
                    
                    <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                      <div className="flex items-center space-x-3">
                        <Lock className="w-5 h-5 text-[#FF6B00]" />
                        <div>
                          <p className="font-medium text-[#2E2E2E]">Password</p>
                          <p className="text-sm text-[#2E2E2E]/60">Last changed 2 days ago</p>
                        </div>
                      </div>
                      <button className="text-[#FF6B00] hover:text-[#FF9F45] font-medium">Change</button>
                    </div>
                  </div>

                  {/* Two-Factor Authentication */}
                  <div className="border border-gray-200 rounded-lg p-4">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center space-x-3">
                        <Shield className="w-5 h-5 text-green-600" />
                        <div>
                          <p className="font-medium text-[#2E2E2E]">Two-Factor Authentication</p>
                          <p className="text-sm text-[#2E2E2E]/60">Add an extra layer of security to your account</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <span className="text-sm text-green-600 font-medium">Enabled</span>
                        <button className="text-[#FF6B00] hover:text-[#FF9F45] font-medium">Manage</button>
                      </div>
                    </div>
                  </div>

                  {/* Security Log */}
                  <div>
                    <h3 className="text-lg font-semibold text-[#2E2E2E] mb-4">Recent Security Activity</h3>
                    <div className="space-y-3">
                      {securityLog.map((log) => (
                        <div key={log.id} className="flex items-center justify-between p-3 border border-gray-200 rounded-lg">
                          <div className="flex items-center space-x-3">
                            <div className={`w-2 h-2 rounded-full ${
                              log.status === 'success' ? 'bg-green-500' : 'bg-red-500'
                            }`}></div>
                            <div>
                              <p className="font-medium text-[#2E2E2E]">{log.action}</p>
                              <p className="text-sm text-[#2E2E2E]/60">{log.device} • {log.location}</p>
                            </div>
                          </div>
                          <span className="text-sm text-[#2E2E2E]/60">{log.timestamp}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Danger Zone */}
                  <div className="border border-red-200 rounded-lg p-4 bg-red-50">
                    <h3 className="text-lg font-semibold text-red-800 mb-2 flex items-center">
                      <AlertTriangle className="w-5 h-5 mr-2" />
                      Danger Zone
                    </h3>
                    <p className="text-red-700 mb-4">
                      These actions are permanent and cannot be undone.
                    </p>
                    <div className="space-y-3">
                      <button className="border border-red-300 text-red-700 hover:bg-red-100 px-4 py-2 rounded-lg font-medium transition-colors">
                        Deactivate Account
                      </button>
                      <button className="border border-red-500 bg-red-500 text-white hover:bg-red-600 px-4 py-2 rounded-lg font-medium transition-colors flex items-center">
                        <Trash2 className="w-4 h-4 mr-2" />
                        Delete Account
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {/* Notifications Tab */}
              {activeTab === 'notifications' && (
                <div className="space-y-6">
                  <h2 className="text-xl font-semibold text-[#2E2E2E]">Notification Preferences</h2>

                  {/* Email Notifications */}
                  <div>
                    <h3 className="text-lg font-medium text-[#2E2E2E] mb-4 flex items-center">
                      <Mail className="w-5 h-5 mr-2" />
                      Email Notifications
                    </h3>
                    <div className="space-y-3">
                      {Object.entries(notifications.email).map(([key, value]) => (
                        <div key={key} className="flex items-center justify-between p-3 border border-gray-200 rounded-lg">
                          <div>
                            <p className="font-medium text-[#2E2E2E] capitalize">
                              {key.replace(/([A-Z])/g, ' $1').trim()}
                            </p>
                            <p className="text-sm text-[#2E2E2E]/60">
                              {key === 'newMessages' && 'Get notified when you receive new messages'}
                              {key === 'jobMatches' && 'Receive job recommendations based on your skills'}
                              {key === 'proposalUpdates' && 'Updates on your proposal status and client responses'}
                              {key === 'payments' && 'Payment confirmations and earning updates'}
                              {key === 'marketing' && 'Tips, best practices, and platform updates'}
                            </p>
                          </div>
                          <label className="relative inline-flex items-center cursor-pointer">
                            <input
                              type="checkbox"
                              checked={value}
                              onChange={(e) => setNotifications(prev => ({
                                ...prev,
                                email: { ...prev.email, [key]: e.target.checked }
                              }))}
                              className="sr-only peer"
                            />
                            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-[#FF6B00]/20 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#FF6B00]"></div>
                          </label>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Push Notifications */}
                  <div>
                    <h3 className="text-lg font-medium text-[#2E2E2E] mb-4 flex items-center">
                      <Smartphone className="w-5 h-5 mr-2" />
                      Push Notifications
                    </h3>
                    <div className="space-y-3">
                      {Object.entries(notifications.push).map(([key, value]) => (
                        <div key={key} className="flex items-center justify-between p-3 border border-gray-200 rounded-lg">
                          <div>
                            <p className="font-medium text-[#2E2E2E] capitalize">
                              {key.replace(/([A-Z])/g, ' $1').trim()}
                            </p>
                          </div>
                          <label className="relative inline-flex items-center cursor-pointer">
                            <input
                              type="checkbox"
                              checked={value}
                              onChange={(e) => setNotifications(prev => ({
                                ...prev,
                                push: { ...prev.push, [key]: e.target.checked }
                              }))}
                              className="sr-only peer"
                            />
                            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-[#FF6B00]/20 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#FF6B00]"></div>
                          </label>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* Payment Methods Tab */}
              {activeTab === 'payments' && (
                <div className="space-y-6">
                  <div className="flex justify-between items-center">
                    <h2 className="text-xl font-semibold text-[#2E2E2E]">Payment Methods</h2>
                    <button className="bg-[#FF6B00] hover:bg-[#FF9F45] text-white px-4 py-2 rounded-lg font-medium transition-colors flex items-center">
                      <Plus className="w-4 h-4 mr-2" />
                      Add Payment Method
                    </button>
                  </div>

                  <div className="space-y-4">
                    {paymentMethods.map((method) => (
                      <div key={method.id} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                        <div className="flex items-center space-x-4">
                          <div className="bg-[#ffeee3] p-3 rounded-lg">
                            {getPaymentIcon(method.type)}
                          </div>
                          <div>
                            <div className="flex items-center space-x-2">
                              <p className="font-medium text-[#2E2E2E]">{method.name}</p>
                              {method.primary && (
                                <span className="bg-[#FF6B00] text-white px-2 py-1 rounded-full text-xs font-medium">
                                  Primary
                                </span>
                              )}
                              {method.verified ? (
                                <span className="text-green-600 flex items-center">
                                  <Check className="w-4 h-4 mr-1" />
                                  Verified
                                </span>
                              ) : (
                                <span className="text-yellow-600 flex items-center">
                                  <Clock className="w-4 h-4 mr-1" />
                                  Pending
                                </span>
                              )}
                            </div>
                            <p className="text-sm text-[#2E2E2E]/60">{method.details}</p>
                          </div>
                        </div>
                        <div className="flex space-x-2">
                          <button className="text-[#FF6B00] hover:text-[#FF9F45] font-medium">
                            Edit
                          </button>
                          {!method.primary && (
                            <button className="text-red-600 hover:text-red-700 font-medium">
                              Remove
                            </button>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Privacy Tab */}
              {activeTab === 'privacy' && (
                <div className="space-y-6">
                  <h2 className="text-xl font-semibold text-[#2E2E2E]">Privacy Settings</h2>

                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                      <div>
                        <p className="font-medium text-[#2E2E2E]">Profile Visibility</p>
                        <p className="text-sm text-[#2E2E2E]/60">Control who can see your full profile</p>
                      </div>
                      <select
                        value={privacy.profileVisibility}
                        onChange={(e) => setPrivacy(prev => ({ ...prev, profileVisibility: e.target.value }))}
                        className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#FF6B00] focus:border-transparent"
                      >
                        <option value="public">Public</option>
                        <option value="clients-only">Clients Only</option>
                        <option value="private">Private</option>
                      </select>
                    </div>

                    {Object.entries(privacy).slice(1).map(([key, value]) => (
                      <div key={key} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                        <div>
                          <p className="font-medium text-[#2E2E2E] capitalize">
                            {key.replace(/([A-Z])/g, ' $1').trim()}
                          </p>
                          <p className="text-sm text-[#2E2E2E]/60">
                            {key === 'showEarnings' && 'Display your earnings and rates publicly'}
                            {key === 'showLocation' && 'Show your location on your profile'}
                            {key === 'allowDirectContact' && 'Allow clients to contact you directly'}
                            {key === 'showOnlineStatus' && 'Show when you\'re online'}
                          </p>
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input
                            type="checkbox"
                            checked={typeof value === 'boolean' ? value : false}
                            onChange={(e) => setPrivacy(prev => ({ ...prev, [key]: e.target.checked }))}
                            className="sr-only peer"
                          />
                          <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-[#FF6B00]/20 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#FF6B00]"></div>
                        </label>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Preferences Tab */}
              {activeTab === 'preferences' && (
                <div className="space-y-6">
                  <h2 className="text-xl font-semibold text-[#2E2E2E]">Preferences</h2>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-[#2E2E2E] mb-2">Theme</label>
                      <select
                        value={preferences.theme}
                        onChange={(e) => setPreferences(prev => ({ ...prev, theme: e.target.value }))}
                        className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#FF6B00] focus:border-transparent"
                      >
                        <option value="system">System</option>
                        <option value="light">Light</option>
                        <option value="dark">Dark</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-[#2E2E2E] mb-2">Language</label>
                      <select
                        value={preferences.language}
                        onChange={(e) => setPreferences(prev => ({ ...prev, language: e.target.value }))}
                        className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#FF6B00] focus:border-transparent"
                      >
                        <option value="en">English</option>
                        <option value="es">Spanish</option>
                        <option value="fr">French</option>
                        <option value="de">German</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-[#2E2E2E] mb-2">Timezone</label>
                      <select
                        value={preferences.timezone}
                        onChange={(e) => setPreferences(prev => ({ ...prev, timezone: e.target.value }))}
                        className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#FF6B00] focus:border-transparent"
                      >
                        <option value="America/New_York">Eastern Time (EST)</option>
                        <option value="America/Chicago">Central Time (CST)</option>
                        <option value="America/Los_Angeles">Pacific Time (PST)</option>
                        <option value="Europe/London">London (GMT)</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-[#2E2E2E] mb-2">Currency</label>
                      <select
                        value={preferences.currency}
                        onChange={(e) => setPreferences(prev => ({ ...prev, currency: e.target.value }))}
                        className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#FF6B00] focus:border-transparent"
                      >
                        <option value="USD">USD ($)</option>
                        <option value="EUR">EUR (€)</option>
                        <option value="GBP">GBP (£)</option>
                        <option value="CAD">CAD (C$)</option>
                      </select>
                    </div>
                  </div>

                  {/* Additional Preferences */}
                  <div className="space-y-4 pt-4 border-t border-gray-200">
                    <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                      <div>
                        <p className="font-medium text-[#2E2E2E]">Auto-accept project invitations</p>
                        <p className="text-sm text-[#2E2E2E]/60">Automatically accept invitations from verified clients</p>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input
                          type="checkbox"
                          checked={preferences.autoAcceptInvites}
                          onChange={(e) => setPreferences(prev => ({ ...prev, autoAcceptInvites: e.target.checked }))}
                          className="sr-only peer"
                        />
                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-[#FF6B00]/20 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#FF6B00]"></div>
                      </label>
                    </div>

                    <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                      <div>
                        <p className="font-medium text-[#2E2E2E]">Weekly digest email</p>
                        <p className="text-sm text-[#2E2E2E]/60">Get a summary of your activity and opportunities</p>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input
                          type="checkbox"
                          checked={preferences.weeklyDigest}
                          onChange={(e) => setPreferences(prev => ({ ...prev, weeklyDigest: e.target.checked }))}
                          className="sr-only peer"
                        />
                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-[#FF6B00]/20 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#FF6B00]"></div>
                      </label>
                    </div>
                  </div>
                </div>
              )}

              {/* Save Button */}
              <div className="flex justify-end pt-6 border-t border-gray-200">
                <button className="bg-[#FF6B00] hover:bg-[#FF9F45] text-white px-6 py-2 rounded-lg font-medium transition-colors flex items-center">
                  <Save className="w-4 h-4 mr-2" />
                  Save Changes
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;
