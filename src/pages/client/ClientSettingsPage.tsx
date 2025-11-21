import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { FirestoreService } from '../../lib/firestoreService';

const ClientSettingsPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState('general');
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showDeactivateModal, setShowDeactivateModal] = useState(false);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const { currentUser } = useAuth();

  const [settings, setSettings] = useState({
    general: {
      language: 'English',
      timezone: 'Pacific Standard Time (PST)',
      currency: 'USD',
      dateFormat: 'MM/DD/YYYY',
      theme: 'light'
    },
    privacy: {
      profileVisibility: 'public',
      showEmail: false,
      showPhone: false,
      showLocation: true
    },
    security: {
      loginAlerts: true,
      sessionTimeout: '30'
    },
    billing: {
      autoPayEnabled: true,
      defaultPaymentMethod: 'Credit Card',
      billingEmail: '',
      invoiceDelivery: 'email',
      taxExempt: false
    }
  });

  // Fetch settings from Firebase
  useEffect(() => {
    const fetchSettings = async () => {
      if (!currentUser) {
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        const settingsData = await FirestoreService.getClientSettings(currentUser.uid);
        
        if (settingsData) {
          setSettings({
            general: {
              language: settingsData.general?.language || 'English',
              timezone: settingsData.general?.timezone || 'Pacific Standard Time (PST)',
              currency: settingsData.general?.currency || 'USD',
              dateFormat: settingsData.general?.dateFormat || 'MM/DD/YYYY',
              theme: settingsData.general?.theme || 'light'
            },
            privacy: {
              profileVisibility: settingsData.privacy?.profileVisibility || 'public',
              showEmail: settingsData.privacy?.showEmail || false,
              showPhone: settingsData.privacy?.showPhone || false,
              showLocation: settingsData.privacy?.showLocation !== undefined ? settingsData.privacy.showLocation : true
            },
            security: {
              loginAlerts: settingsData.security?.loginAlerts !== undefined ? settingsData.security.loginAlerts : true,
              sessionTimeout: settingsData.security?.sessionTimeout || '30'
            },
            billing: {
              autoPayEnabled: settingsData.billing?.autoPayEnabled !== undefined ? settingsData.billing.autoPayEnabled : true,
              defaultPaymentMethod: settingsData.billing?.defaultPaymentMethod || 'Credit Card',
              billingEmail: settingsData.billing?.billingEmail || currentUser.email || '',
              invoiceDelivery: settingsData.billing?.invoiceDelivery || 'email',
              taxExempt: settingsData.billing?.taxExempt || false
            }
          });
        } else {
          // Set default billing email if no settings exist
          setSettings(prev => ({
            ...prev,
            billing: {
              ...prev.billing,
              billingEmail: currentUser.email || ''
            }
          }));
        }
      } catch (error) {
        console.error('Error fetching settings:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchSettings();
  }, [currentUser]);

  const handleSettingChange = (category: string, setting: string, value: any) => {
    setSettings(prev => ({
      ...prev,
      [category]: {
        ...prev[category as keyof typeof prev],
        [setting]: value
      }
    }));
  };

  const saveSettings = async () => {
    if (!currentUser) return;

    try {
      setSaving(true);
      await FirestoreService.saveClientSettings(currentUser.uid, settings);
      console.log('Settings saved successfully');
    } catch (error) {
      console.error('Error saving settings:', error);
    } finally {
      setSaving(false);
    }
  };

  const handleDeactivateAccount = async () => {
    if (!currentUser) return;

    try {
      await FirestoreService.updateUser(currentUser.uid, {
        deactivated: true,
        deactivatedAt: new Date()
      });
      setShowDeactivateModal(false);
      // Optionally sign out the user
      window.location.href = '/login';
    } catch (error) {
      console.error('Error deactivating account:', error);
    }
  };

  const handleDeleteAccount = async () => {
    if (!currentUser) return;

    try {
      await FirestoreService.updateUser(currentUser.uid, {
        deleted: true,
        deletedAt: new Date()
      });
      setShowDeleteModal(false);
      // Optionally sign out the user
      window.location.href = '/login';
    } catch (error) {
      console.error('Error deleting account:', error);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#ffeee3] flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#FF6B00] mx-auto mb-4"></div>
          <p className="text-[#2E2E2E]/60">Loading settings...</p>
        </div>
      </div>
    );
  }

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
                  <button 
                    onClick={saveSettings}
                    disabled={saving}
                    className="bg-[#FF6B00] hover:bg-[#FF9F45] text-white px-6 py-3 rounded-lg font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {saving ? 'Saving...' : 'Save General Settings'}
                  </button>
                </div>

                {/* Danger Zone - Only in General Tab */}
                <div className="mt-8 p-6 border border-red-200 rounded-lg bg-red-50">
                  <h3 className="text-lg font-bold text-red-600 mb-4">Danger Zone</h3>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-4 bg-white border border-red-200 rounded-lg">
                      <div>
                        <span className="font-medium text-[#2E2E2E]">Deactivate Account</span>
                        <p className="text-sm text-[#2E2E2E]/60">Temporarily disable your account (can be reactivated)</p>
                      </div>
                      <button 
                        onClick={() => setShowDeactivateModal(true)}
                        className="text-yellow-600 hover:text-yellow-700 font-medium"
                      >
                        Deactivate
                      </button>
                    </div>

                    <div className="flex items-center justify-between p-4 bg-white border border-red-200 rounded-lg">
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
                </div>

                <div className="mt-8 pt-6 border-t border-[#ffeee3]">
                  <button 
                    onClick={saveSettings}
                    disabled={saving}
                    className="bg-[#FF6B00] hover:bg-[#FF9F45] text-white px-6 py-3 rounded-lg font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {saving ? 'Saving...' : 'Save Privacy Settings'}
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
                    <h3 className="font-semibold text-[#2E2E2E] mb-4">Password</h3>
                    <div className="space-y-4">
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
                </div>

                <div className="mt-8 pt-6 border-t border-[#ffeee3]">
                  <button 
                    onClick={saveSettings}
                    disabled={saving}
                    className="bg-[#FF6B00] hover:bg-[#FF9F45] text-white px-6 py-3 rounded-lg font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {saving ? 'Saving...' : 'Save Security Settings'}
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
                  <button 
                    onClick={saveSettings}
                    disabled={saving}
                    className="bg-[#FF6B00] hover:bg-[#FF9F45] text-white px-6 py-3 rounded-lg font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {saving ? 'Saving...' : 'Save Billing Settings'}
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Deactivate Account Modal */}
      {showDeactivateModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 w-full max-w-md mx-4">
            <div className="text-center">
              <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.96-.833-2.73 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
                </svg>
              </div>
              <h3 className="text-lg font-bold text-[#2E2E2E] mb-2">Deactivate Account</h3>
              <p className="text-[#2E2E2E]/60 mb-6">
                Your account will be temporarily deactivated. You can reactivate it by logging in again.
              </p>
              <div className="flex space-x-3">
                <button
                  onClick={() => setShowDeactivateModal(false)}
                  className="flex-1 px-4 py-2 border border-[#ffeee3] text-[#2E2E2E] rounded-lg hover:bg-[#ffeee3] transition-colors"
                >
                  Cancel
                </button>
                <button 
                  onClick={handleDeactivateAccount}
                  className="flex-1 px-4 py-2 bg-yellow-600 hover:bg-yellow-700 text-white rounded-lg transition-colors"
                >
                  Deactivate
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

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
                Your account will be marked as deleted. You can contact support to restore it within 30 days.
              </p>
              <div className="flex space-x-3">
                <button
                  onClick={() => setShowDeleteModal(false)}
                  className="flex-1 px-4 py-2 border border-[#ffeee3] text-[#2E2E2E] rounded-lg hover:bg-[#ffeee3] transition-colors"
                >
                  Cancel
                </button>
                <button 
                  onClick={handleDeleteAccount}
                  className="flex-1 px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors"
                >
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
