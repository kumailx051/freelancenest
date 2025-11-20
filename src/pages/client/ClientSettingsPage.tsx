import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const ClientSettingsPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState('general');
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const [settings, setSettings] = useState({
    general: {
      language: 'English',
      timezone: 'Pacific Standard Time (PST)',
      currency: 'USD',
      dateFormat: 'MM/DD/YYYY',
      theme: 'light'
    },
    notifications: {
      emailNotifications: true,
      smsNotifications: false,
      pushNotifications: true,
      projectUpdates: true,
      milestoneReminders: true,
      messageNotifications: true,
      marketingEmails: false,
      weeklyDigest: true,
      freelancerApplications: true,
      paymentConfirmations: true
    },
    privacy: {
      profileVisibility: 'public',
      showEmail: false,
      showPhone: false,
      showLocation: true,
      allowDirectContact: true,
      dataSharing: false,
      analyticsOptOut: false
    },
    security: {
      twoFactorAuth: false,
      loginAlerts: true,
      sessionTimeout: '30',
      passwordChangeRequired: false,
      apiAccess: false
    },
    billing: {
      autoPayEnabled: true,
      defaultPaymentMethod: 'Credit Card',
      billingEmail: 'sarah.williams@example.com',
      invoiceDelivery: 'email',
      taxExempt: false
    }
  });

  const handleSettingChange = (category: string, setting: string, value: any) => {
    setSettings(prev => ({
      ...prev,
      [category]: {
        ...prev[category as keyof typeof prev],
        [setting]: value
      }
    }));
  };

  return (
    <div className="min-h-screen bg-[#ffeee3]">
      {/* Hero Section */}
      <section className="pt-40 pb-16 bg-[#2E2E2E] text-white">
        <div className="section-container">
          <div className="max-w-6xl mx-auto">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Account Settings</h1>
            <p className="text-xl mb-8 text-[#ffeee3]">
              Manage your account preferences, security settings, and notification options.
            </p>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16">
        <div className="section-container">
          <div className="max-w-6xl mx-auto">
            {/* Navigation Tabs */}
            <div className="flex flex-wrap border-b border-[#ffeee3] mb-8">
              {[
                { id: 'general', label: 'General', icon: '⚙️' },
                { id: 'notifications', label: 'Notifications', icon: '🔔' },
                { id: 'privacy', label: 'Privacy', icon: '🔒' },
                { id: 'security', label: 'Security', icon: '🛡️' },
                { id: 'billing', label: 'Billing', icon: '💳' }
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`px-6 py-3 font-medium transition-colors flex items-center space-x-2 ${
                    activeTab === tab.id
                      ? 'text-[#FF6B00] border-b-2 border-[#FF6B00]'
                      : 'text-[#2E2E2E] hover:text-[#FF6B00]'
                  }`}
                >
                  <span>{tab.icon}</span>
                  <span>{tab.label}</span>
                </button>
              ))}
            </div>

            {/* General Settings */}
            {activeTab === 'general' && (
              <div className="bg-white rounded-xl shadow-sm p-6 border border-[#ffeee3]">
                <h2 className="text-xl font-bold text-[#2E2E2E] mb-6">General Settings</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-[#2E2E2E] mb-2">Language</label>
                    <select
                      value={settings.general.language}
                      onChange={(e) => handleSettingChange('general', 'language', e.target.value)}
                      className="w-full px-4 py-3 border border-[#ffeee3] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF6B00] focus:border-transparent"
                    >
                      <option value="English">English</option>
                      <option value="Spanish">Spanish</option>
                      <option value="French">French</option>
                      <option value="German">German</option>
                      <option value="Chinese">Chinese</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-[#2E2E2E] mb-2">Timezone</label>
                    <select
                      value={settings.general.timezone}
                      onChange={(e) => handleSettingChange('general', 'timezone', e.target.value)}
                      className="w-full px-4 py-3 border border-[#ffeee3] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF6B00] focus:border-transparent"
                    >
                      <option value="Pacific Standard Time (PST)">Pacific Standard Time (PST)</option>
                      <option value="Mountain Standard Time (MST)">Mountain Standard Time (MST)</option>
                      <option value="Central Standard Time (CST)">Central Standard Time (CST)</option>
                      <option value="Eastern Standard Time (EST)">Eastern Standard Time (EST)</option>
                      <option value="Greenwich Mean Time (GMT)">Greenwich Mean Time (GMT)</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-[#2E2E2E] mb-2">Currency</label>
                    <select
                      value={settings.general.currency}
                      onChange={(e) => handleSettingChange('general', 'currency', e.target.value)}
                      className="w-full px-4 py-3 border border-[#ffeee3] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF6B00] focus:border-transparent"
                    >
                      <option value="USD">USD - US Dollar</option>
                      <option value="EUR">EUR - Euro</option>
                      <option value="GBP">GBP - British Pound</option>
                      <option value="CAD">CAD - Canadian Dollar</option>
                      <option value="AUD">AUD - Australian Dollar</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-[#2E2E2E] mb-2">Date Format</label>
                    <select
                      value={settings.general.dateFormat}
                      onChange={(e) => handleSettingChange('general', 'dateFormat', e.target.value)}
                      className="w-full px-4 py-3 border border-[#ffeee3] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF6B00] focus:border-transparent"
                    >
                      <option value="MM/DD/YYYY">MM/DD/YYYY (US)</option>
                      <option value="DD/MM/YYYY">DD/MM/YYYY (International)</option>
                      <option value="YYYY-MM-DD">YYYY-MM-DD (ISO)</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-[#2E2E2E] mb-2">Theme</label>
                    <select
                      value={settings.general.theme}
                      onChange={(e) => handleSettingChange('general', 'theme', e.target.value)}
                      className="w-full px-4 py-3 border border-[#ffeee3] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF6B00] focus:border-transparent"
                    >
                      <option value="light">Light</option>
                      <option value="dark">Dark</option>
                      <option value="auto">Auto (System)</option>
                    </select>
                  </div>
                </div>

                <div className="mt-8 pt-6 border-t border-[#ffeee3]">
                  <button className="bg-[#FF6B00] hover:bg-[#FF9F45] text-white px-6 py-3 rounded-lg font-medium transition-colors">
                    Save General Settings
                  </button>
                </div>
              </div>
            )}

            {/* Notification Settings */}
            {activeTab === 'notifications' && (
              <div className="bg-white rounded-xl shadow-sm p-6 border border-[#ffeee3]">
                <h2 className="text-xl font-bold text-[#2E2E2E] mb-6">Notification Preferences</h2>
                
                <div className="space-y-8">
                  {/* Notification Methods */}
                  <div>
                    <h3 className="font-semibold text-[#2E2E2E] mb-4">Notification Methods</h3>
                    <div className="space-y-4">
                      <label className="flex items-center justify-between">
                        <div>
                          <span className="font-medium text-[#2E2E2E]">Email Notifications</span>
                          <p className="text-sm text-[#2E2E2E]/60">Receive notifications via email</p>
                        </div>
                        <input
                          type="checkbox"
                          checked={settings.notifications.emailNotifications}
                          onChange={(e) => handleSettingChange('notifications', 'emailNotifications', e.target.checked)}
                          className="h-5 w-5 text-[#FF6B00] border-[#ffeee3] rounded focus:ring-[#FF6B00]"
                        />
                      </label>

                      <label className="flex items-center justify-between">
                        <div>
                          <span className="font-medium text-[#2E2E2E]">SMS Notifications</span>
                          <p className="text-sm text-[#2E2E2E]/60">Receive notifications via text message</p>
                        </div>
                        <input
                          type="checkbox"
                          checked={settings.notifications.smsNotifications}
                          onChange={(e) => handleSettingChange('notifications', 'smsNotifications', e.target.checked)}
                          className="h-5 w-5 text-[#FF6B00] border-[#ffeee3] rounded focus:ring-[#FF6B00]"
                        />
                      </label>

                      <label className="flex items-center justify-between">
                        <div>
                          <span className="font-medium text-[#2E2E2E]">Push Notifications</span>
                          <p className="text-sm text-[#2E2E2E]/60">Receive browser push notifications</p>
                        </div>
                        <input
                          type="checkbox"
                          checked={settings.notifications.pushNotifications}
                          onChange={(e) => handleSettingChange('notifications', 'pushNotifications', e.target.checked)}
                          className="h-5 w-5 text-[#FF6B00] border-[#ffeee3] rounded focus:ring-[#FF6B00]"
                        />
                      </label>
                    </div>
                  </div>

                  {/* Project Notifications */}
                  <div>
                    <h3 className="font-semibold text-[#2E2E2E] mb-4">Project Notifications</h3>
                    <div className="space-y-4">
                      <label className="flex items-center justify-between">
                        <span className="font-medium text-[#2E2E2E]">Project Updates</span>
                        <input
                          type="checkbox"
                          checked={settings.notifications.projectUpdates}
                          onChange={(e) => handleSettingChange('notifications', 'projectUpdates', e.target.checked)}
                          className="h-5 w-5 text-[#FF6B00] border-[#ffeee3] rounded focus:ring-[#FF6B00]"
                        />
                      </label>

                      <label className="flex items-center justify-between">
                        <span className="font-medium text-[#2E2E2E]">Milestone Reminders</span>
                        <input
                          type="checkbox"
                          checked={settings.notifications.milestoneReminders}
                          onChange={(e) => handleSettingChange('notifications', 'milestoneReminders', e.target.checked)}
                          className="h-5 w-5 text-[#FF6B00] border-[#ffeee3] rounded focus:ring-[#FF6B00]"
                        />
                      </label>

                      <label className="flex items-center justify-between">
                        <span className="font-medium text-[#2E2E2E]">Freelancer Applications</span>
                        <input
                          type="checkbox"
                          checked={settings.notifications.freelancerApplications}
                          onChange={(e) => handleSettingChange('notifications', 'freelancerApplications', e.target.checked)}
                          className="h-5 w-5 text-[#FF6B00] border-[#ffeee3] rounded focus:ring-[#FF6B00]"
                        />
                      </label>
                    </div>
                  </div>

                  {/* Other Notifications */}
                  <div>
                    <h3 className="font-semibold text-[#2E2E2E] mb-4">Other Notifications</h3>
                    <div className="space-y-4">
                      <label className="flex items-center justify-between">
                        <span className="font-medium text-[#2E2E2E]">Message Notifications</span>
                        <input
                          type="checkbox"
                          checked={settings.notifications.messageNotifications}
                          onChange={(e) => handleSettingChange('notifications', 'messageNotifications', e.target.checked)}
                          className="h-5 w-5 text-[#FF6B00] border-[#ffeee3] rounded focus:ring-[#FF6B00]"
                        />
                      </label>

                      <label className="flex items-center justify-between">
                        <span className="font-medium text-[#2E2E2E]">Payment Confirmations</span>
                        <input
                          type="checkbox"
                          checked={settings.notifications.paymentConfirmations}
                          onChange={(e) => handleSettingChange('notifications', 'paymentConfirmations', e.target.checked)}
                          className="h-5 w-5 text-[#FF6B00] border-[#ffeee3] rounded focus:ring-[#FF6B00]"
                        />
                      </label>

                      <label className="flex items-center justify-between">
                        <span className="font-medium text-[#2E2E2E]">Weekly Digest</span>
                        <input
                          type="checkbox"
                          checked={settings.notifications.weeklyDigest}
                          onChange={(e) => handleSettingChange('notifications', 'weeklyDigest', e.target.checked)}
                          className="h-5 w-5 text-[#FF6B00] border-[#ffeee3] rounded focus:ring-[#FF6B00]"
                        />
                      </label>

                      <label className="flex items-center justify-between">
                        <span className="font-medium text-[#2E2E2E]">Marketing Emails</span>
                        <input
                          type="checkbox"
                          checked={settings.notifications.marketingEmails}
                          onChange={(e) => handleSettingChange('notifications', 'marketingEmails', e.target.checked)}
                          className="h-5 w-5 text-[#FF6B00] border-[#ffeee3] rounded focus:ring-[#FF6B00]"
                        />
                      </label>
                    </div>
                  </div>
                </div>

                <div className="mt-8 pt-6 border-t border-[#ffeee3]">
                  <button className="bg-[#FF6B00] hover:bg-[#FF9F45] text-white px-6 py-3 rounded-lg font-medium transition-colors">
                    Save Notification Settings
                  </button>
                </div>
              </div>
            )}

            {/* Privacy Settings */}
            {activeTab === 'privacy' && (
              <div className="bg-white rounded-xl shadow-sm p-6 border border-[#ffeee3]">
                <h2 className="text-xl font-bold text-[#2E2E2E] mb-6">Privacy Settings</h2>
                
                <div className="space-y-8">
                  <div>
                    <h3 className="font-semibold text-[#2E2E2E] mb-4">Profile Visibility</h3>
                    <div className="space-y-3">
                      <label className="flex items-center space-x-3">
                        <input
                          type="radio"
                          name="profileVisibility"
                          value="public"
                          checked={settings.privacy.profileVisibility === 'public'}
                          onChange={(e) => handleSettingChange('privacy', 'profileVisibility', e.target.value)}
                          className="h-4 w-4 text-[#FF6B00] border-[#ffeee3] focus:ring-[#FF6B00]"
                        />
                        <div>
                          <span className="font-medium text-[#2E2E2E]">Public</span>
                          <p className="text-sm text-[#2E2E2E]/60">Your profile is visible to all freelancers</p>
                        </div>
                      </label>
                      <label className="flex items-center space-x-3">
                        <input
                          type="radio"
                          name="profileVisibility"
                          value="private"
                          checked={settings.privacy.profileVisibility === 'private'}
                          onChange={(e) => handleSettingChange('privacy', 'profileVisibility', e.target.value)}
                          className="h-4 w-4 text-[#FF6B00] border-[#ffeee3] focus:ring-[#FF6B00]"
                        />
                        <div>
                          <span className="font-medium text-[#2E2E2E]">Private</span>
                          <p className="text-sm text-[#2E2E2E]/60">Only freelancers you contact can see your profile</p>
                        </div>
                      </label>
                    </div>
                  </div>

                  <div>
                    <h3 className="font-semibold text-[#2E2E2E] mb-4">Contact Information</h3>
                    <div className="space-y-4">
                      <label className="flex items-center justify-between">
                        <span className="font-medium text-[#2E2E2E]">Show Email Address</span>
                        <input
                          type="checkbox"
                          checked={settings.privacy.showEmail}
                          onChange={(e) => handleSettingChange('privacy', 'showEmail', e.target.checked)}
                          className="h-5 w-5 text-[#FF6B00] border-[#ffeee3] rounded focus:ring-[#FF6B00]"
                        />
                      </label>

                      <label className="flex items-center justify-between">
                        <span className="font-medium text-[#2E2E2E]">Show Phone Number</span>
                        <input
                          type="checkbox"
                          checked={settings.privacy.showPhone}
                          onChange={(e) => handleSettingChange('privacy', 'showPhone', e.target.checked)}
                          className="h-5 w-5 text-[#FF6B00] border-[#ffeee3] rounded focus:ring-[#FF6B00]"
                        />
                      </label>

                      <label className="flex items-center justify-between">
                        <span className="font-medium text-[#2E2E2E]">Show Location</span>
                        <input
                          type="checkbox"
                          checked={settings.privacy.showLocation}
                          onChange={(e) => handleSettingChange('privacy', 'showLocation', e.target.checked)}
                          className="h-5 w-5 text-[#FF6B00] border-[#ffeee3] rounded focus:ring-[#FF6B00]"
                        />
                      </label>
                    </div>
                  </div>

                  <div>
                    <h3 className="font-semibold text-[#2E2E2E] mb-4">Data & Analytics</h3>
                    <div className="space-y-4">
                      <label className="flex items-center justify-between">
                        <div>
                          <span className="font-medium text-[#2E2E2E]">Allow Direct Contact</span>
                          <p className="text-sm text-[#2E2E2E]/60">Let freelancers contact you directly</p>
                        </div>
                        <input
                          type="checkbox"
                          checked={settings.privacy.allowDirectContact}
                          onChange={(e) => handleSettingChange('privacy', 'allowDirectContact', e.target.checked)}
                          className="h-5 w-5 text-[#FF6B00] border-[#ffeee3] rounded focus:ring-[#FF6B00]"
                        />
                      </label>

                      <label className="flex items-center justify-between">
                        <div>
                          <span className="font-medium text-[#2E2E2E]">Data Sharing</span>
                          <p className="text-sm text-[#2E2E2E]/60">Share anonymized data for platform improvement</p>
                        </div>
                        <input
                          type="checkbox"
                          checked={settings.privacy.dataSharing}
                          onChange={(e) => handleSettingChange('privacy', 'dataSharing', e.target.checked)}
                          className="h-5 w-5 text-[#FF6B00] border-[#ffeee3] rounded focus:ring-[#FF6B00]"
                        />
                      </label>

                      <label className="flex items-center justify-between">
                        <div>
                          <span className="font-medium text-[#2E2E2E]">Opt-out of Analytics</span>
                          <p className="text-sm text-[#2E2E2E]/60">Disable usage analytics tracking</p>
                        </div>
                        <input
                          type="checkbox"
                          checked={settings.privacy.analyticsOptOut}
                          onChange={(e) => handleSettingChange('privacy', 'analyticsOptOut', e.target.checked)}
                          className="h-5 w-5 text-[#FF6B00] border-[#ffeee3] rounded focus:ring-[#FF6B00]"
                        />
                      </label>
                    </div>
                  </div>
                </div>

                <div className="mt-8 pt-6 border-t border-[#ffeee3]">
                  <button className="bg-[#FF6B00] hover:bg-[#FF9F45] text-white px-6 py-3 rounded-lg font-medium transition-colors">
                    Save Privacy Settings
                  </button>
                </div>
              </div>
            )}

            {/* Security Settings */}
            {activeTab === 'security' && (
              <div className="bg-white rounded-xl shadow-sm p-6 border border-[#ffeee3]">
                <h2 className="text-xl font-bold text-[#2E2E2E] mb-6">Security Settings</h2>
                
                <div className="space-y-8">
                  <div>
                    <h3 className="font-semibold text-[#2E2E2E] mb-4">Authentication</h3>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between p-4 border border-[#ffeee3] rounded-lg">
                        <div>
                          <span className="font-medium text-[#2E2E2E]">Two-Factor Authentication</span>
                          <p className="text-sm text-[#2E2E2E]/60">Add an extra layer of security to your account</p>
                        </div>
                        <div className="flex items-center space-x-3">
                          <input
                            type="checkbox"
                            checked={settings.security.twoFactorAuth}
                            onChange={(e) => handleSettingChange('security', 'twoFactorAuth', e.target.checked)}
                            className="h-5 w-5 text-[#FF6B00] border-[#ffeee3] rounded focus:ring-[#FF6B00]"
                          />
                          {!settings.security.twoFactorAuth && (
                            <button className="text-[#FF6B00] hover:text-[#FF9F45] font-medium text-sm">
                              Set Up
                            </button>
                          )}
                        </div>
                      </div>

                      <div className="flex items-center justify-between p-4 border border-[#ffeee3] rounded-lg">
                        <div>
                          <span className="font-medium text-[#2E2E2E]">Password</span>
                          <p className="text-sm text-[#2E2E2E]/60">Last changed 3 months ago</p>
                        </div>
                        <button className="text-[#FF6B00] hover:text-[#FF9F45] font-medium">
                          Change Password
                        </button>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h3 className="font-semibold text-[#2E2E2E] mb-4">Session Management</h3>
                    <div className="space-y-4">
                      <label className="flex items-center justify-between">
                        <div>
                          <span className="font-medium text-[#2E2E2E]">Login Alerts</span>
                          <p className="text-sm text-[#2E2E2E]/60">Get notified of new logins</p>
                        </div>
                        <input
                          type="checkbox"
                          checked={settings.security.loginAlerts}
                          onChange={(e) => handleSettingChange('security', 'loginAlerts', e.target.checked)}
                          className="h-5 w-5 text-[#FF6B00] border-[#ffeee3] rounded focus:ring-[#FF6B00]"
                        />
                      </label>

                      <div>
                        <label className="block text-sm font-medium text-[#2E2E2E] mb-2">Session Timeout</label>
                        <select
                          value={settings.security.sessionTimeout}
                          onChange={(e) => handleSettingChange('security', 'sessionTimeout', e.target.value)}
                          className="w-full px-4 py-3 border border-[#ffeee3] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF6B00] focus:border-transparent max-w-xs"
                        >
                          <option value="15">15 minutes</option>
                          <option value="30">30 minutes</option>
                          <option value="60">1 hour</option>
                          <option value="240">4 hours</option>
                          <option value="480">8 hours</option>
                        </select>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h3 className="font-semibold text-[#2E2E2E] mb-4">API Access</h3>
                    <div className="p-4 border border-[#ffeee3] rounded-lg">
                      <div className="flex items-center justify-between mb-3">
                        <div>
                          <span className="font-medium text-[#2E2E2E]">API Access</span>
                          <p className="text-sm text-[#2E2E2E]/60">Enable API access for third-party integrations</p>
                        </div>
                        <input
                          type="checkbox"
                          checked={settings.security.apiAccess}
                          onChange={(e) => handleSettingChange('security', 'apiAccess', e.target.checked)}
                          className="h-5 w-5 text-[#FF6B00] border-[#ffeee3] rounded focus:ring-[#FF6B00]"
                        />
                      </div>
                      {settings.security.apiAccess && (
                        <button className="text-[#FF6B00] hover:text-[#FF9F45] font-medium text-sm">
                          Generate API Key
                        </button>
                      )}
                    </div>
                  </div>
                </div>

                <div className="mt-8 pt-6 border-t border-[#ffeee3]">
                  <button className="bg-[#FF6B00] hover:bg-[#FF9F45] text-white px-6 py-3 rounded-lg font-medium transition-colors">
                    Save Security Settings
                  </button>
                </div>
              </div>
            )}

            {/* Billing Settings */}
            {activeTab === 'billing' && (
              <div className="bg-white rounded-xl shadow-sm p-6 border border-[#ffeee3]">
                <h2 className="text-xl font-bold text-[#2E2E2E] mb-6">Billing Settings</h2>
                
                <div className="space-y-8">
                  <div>
                    <h3 className="font-semibold text-[#2E2E2E] mb-4">Payment Preferences</h3>
                    <div className="space-y-4">
                      <label className="flex items-center justify-between">
                        <div>
                          <span className="font-medium text-[#2E2E2E]">Auto-Pay</span>
                          <p className="text-sm text-[#2E2E2E]/60">Automatically pay approved milestones</p>
                        </div>
                        <input
                          type="checkbox"
                          checked={settings.billing.autoPayEnabled}
                          onChange={(e) => handleSettingChange('billing', 'autoPayEnabled', e.target.checked)}
                          className="h-5 w-5 text-[#FF6B00] border-[#ffeee3] rounded focus:ring-[#FF6B00]"
                        />
                      </label>

                      <div>
                        <label className="block text-sm font-medium text-[#2E2E2E] mb-2">Default Payment Method</label>
                        <select
                          value={settings.billing.defaultPaymentMethod}
                          onChange={(e) => handleSettingChange('billing', 'defaultPaymentMethod', e.target.value)}
                          className="w-full px-4 py-3 border border-[#ffeee3] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF6B00] focus:border-transparent max-w-xs"
                        >
                          <option value="Credit Card">Credit Card</option>
                          <option value="PayPal">PayPal</option>
                          <option value="Bank Transfer">Bank Transfer</option>
                        </select>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h3 className="font-semibold text-[#2E2E2E] mb-4">Invoice Settings</h3>
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-[#2E2E2E] mb-2">Billing Email</label>
                        <input
                          type="email"
                          value={settings.billing.billingEmail}
                          onChange={(e) => handleSettingChange('billing', 'billingEmail', e.target.value)}
                          className="w-full px-4 py-3 border border-[#ffeee3] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF6B00] focus:border-transparent max-w-md"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-[#2E2E2E] mb-2">Invoice Delivery</label>
                        <select
                          value={settings.billing.invoiceDelivery}
                          onChange={(e) => handleSettingChange('billing', 'invoiceDelivery', e.target.value)}
                          className="w-full px-4 py-3 border border-[#ffeee3] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF6B00] focus:border-transparent max-w-xs"
                        >
                          <option value="email">Email</option>
                          <option value="platform">Platform Only</option>
                          <option value="both">Email & Platform</option>
                        </select>
                      </div>

                      <label className="flex items-center justify-between">
                        <div>
                          <span className="font-medium text-[#2E2E2E]">Tax Exempt</span>
                          <p className="text-sm text-[#2E2E2E]/60">Mark organization as tax exempt</p>
                        </div>
                        <input
                          type="checkbox"
                          checked={settings.billing.taxExempt}
                          onChange={(e) => handleSettingChange('billing', 'taxExempt', e.target.checked)}
                          className="h-5 w-5 text-[#FF6B00] border-[#ffeee3] rounded focus:ring-[#FF6B00]"
                        />
                      </label>
                    </div>
                  </div>

                  <div>
                    <h3 className="font-semibold text-[#2E2E2E] mb-4">Quick Actions</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <Link
                        to="/client/escrow-payments"
                        className="p-4 border border-[#ffeee3] rounded-lg hover:bg-[#ffeee3]/30 transition-colors"
                      >
                        <div className="font-medium text-[#2E2E2E] mb-1">Payment Methods</div>
                        <div className="text-sm text-[#2E2E2E]/60">Manage cards and payment options</div>
                      </Link>

                      <Link
                        to="/client/invoices"
                        className="p-4 border border-[#ffeee3] rounded-lg hover:bg-[#ffeee3]/30 transition-colors"
                      >
                        <div className="font-medium text-[#2E2E2E] mb-1">Invoices & Tax</div>
                        <div className="text-sm text-[#2E2E2E]/60">View invoices and tax documents</div>
                      </Link>
                    </div>
                  </div>
                </div>

                <div className="mt-8 pt-6 border-t border-[#ffeee3]">
                  <button className="bg-[#FF6B00] hover:bg-[#FF9F45] text-white px-6 py-3 rounded-lg font-medium transition-colors">
                    Save Billing Settings
                  </button>
                </div>
              </div>
            )}

            {/* Danger Zone */}
            <div className="bg-white rounded-xl shadow-sm p-6 border border-red-200 mt-8">
              <h2 className="text-xl font-bold text-red-600 mb-6">Danger Zone</h2>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 border border-red-200 rounded-lg">
                  <div>
                    <span className="font-medium text-[#2E2E2E]">Export Account Data</span>
                    <p className="text-sm text-[#2E2E2E]/60">Download all your account data and project history</p>
                  </div>
                  <button className="text-blue-600 hover:text-blue-700 font-medium">
                    Request Export
                  </button>
                </div>

                <div className="flex items-center justify-between p-4 border border-red-200 rounded-lg">
                  <div>
                    <span className="font-medium text-[#2E2E2E]">Deactivate Account</span>
                    <p className="text-sm text-[#2E2E2E]/60">Temporarily disable your account (can be reactivated)</p>
                  </div>
                  <button className="text-yellow-600 hover:text-yellow-700 font-medium">
                    Deactivate
                  </button>
                </div>

                <div className="flex items-center justify-between p-4 border border-red-200 rounded-lg">
                  <div>
                    <span className="font-medium text-[#2E2E2E]">Delete Account</span>
                    <p className="text-sm text-[#2E2E2E]/60">Permanently delete your account and all data (cannot be undone)</p>
                  </div>
                  <button
                    onClick={() => setShowDeleteModal(true)}
                    className="text-red-600 hover:text-red-700 font-medium"
                  >
                    Delete Account
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Delete Account Modal */}
      {showDeleteModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 w-full max-w-md mx-4">
            <div className="text-center">
              <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.96-.833-2.73 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
                </svg>
              </div>
              <h3 className="text-lg font-bold text-[#2E2E2E] mb-2">Delete Account</h3>
              <p className="text-[#2E2E2E]/60 mb-6">
                This action cannot be undone. All your data, projects, and account information will be permanently deleted.
              </p>
              <div className="flex space-x-3">
                <button
                  onClick={() => setShowDeleteModal(false)}
                  className="flex-1 px-4 py-2 border border-[#ffeee3] text-[#2E2E2E] rounded-lg hover:bg-[#ffeee3] transition-colors"
                >
                  Cancel
                </button>
                <button className="flex-1 px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors">
                  Delete Account
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ClientSettingsPage;
