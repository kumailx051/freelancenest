import React, { useState, useEffect } from 'react';
import { doc, getDoc, setDoc, updateDoc } from 'firebase/firestore';
import { db } from '../../lib/firebase';
import { 
  Settings, 
  Save, 
  Shield, 
  Bell, 
  Users, 
  DollarSign,
  AlertTriangle,
  Database,
  Server
} from 'lucide-react';

interface SettingsSection {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
}

const AdminSettings: React.FC = () => {
  const [activeSection, setActiveSection] = useState('general');
  const [hasChanges, setHasChanges] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [lastSavedTime, setLastSavedTime] = useState<Date | null>(null);
  
  // General Settings
  const [generalSettings, setGeneralSettings] = useState({
    platformName: 'FreelanceNest',
    platformDescription: 'Connect with top freelancers and find quality projects',
    supportEmail: 'support@freelancenest.com',
    adminEmail: 'admin@freelancenest.com',
    timezone: 'UTC',
    defaultLanguage: 'en',
    maintenanceMode: false
  });

  // Security Settings
  const [securitySettings, setSecuritySettings] = useState({
    requireEmailVerification: true,
    enableTwoFactorAuth: false,
    passwordMinLength: 8,
    sessionTimeout: 24,
    maxLoginAttempts: 5,
    requirePhoneVerification: false,
    ipWhitelist: '',
    enableAuditLog: true
  });

  // User Management Settings
  const [userSettings, setUserSettings] = useState({
    autoApproveUsers: false,
    requireProfileCompletion: true,
    maxProjects: 100,
    maxGigs: 50,
    enableUserReviews: true,
    enableUserReports: true,
    minProfileScore: 60,
    allowGuestBrowsing: true
  });

  // Payment Settings
  const [paymentSettings, setPaymentSettings] = useState({
    platformFee: 10,
    freelancerFee: 8,
    clientFee: 2,
    minimumWithdrawal: 50,
    paymentProcessingTime: 3,
    autoReleasePayment: true,
    escrowEnabled: true,
    refundPolicy: 'Standard 30-day policy'
  });

  // Notification Settings
  const [notificationSettings, setNotificationSettings] = useState({
    emailNotifications: true,
    pushNotifications: true,
    smsNotifications: false,
    adminAlerts: true,
    systemAlerts: true,
    userActivityAlerts: false,
    paymentAlerts: true,
    disputeAlerts: true
  });

  // Load settings from Firebase on component mount
  useEffect(() => {
    loadSettingsFromFirebase();
  }, []);

  const loadSettingsFromFirebase = async () => {
    try {
      setIsLoading(true);
      const adminSettingsRef = doc(db, 'admin', 'settings');
      const docSnap = await getDoc(adminSettingsRef);
      
      if (docSnap.exists()) {
        const data = docSnap.data();
        
        // Update states with Firebase data or keep defaults
        if (data.general) setGeneralSettings({ ...generalSettings, ...data.general });
        if (data.security) setSecuritySettings({ ...securitySettings, ...data.security });
        if (data.users) setUserSettings({ ...userSettings, ...data.users });
        if (data.payments) setPaymentSettings({ ...paymentSettings, ...data.payments });
        if (data.notifications) setNotificationSettings({ ...notificationSettings, ...data.notifications });
      }
    } catch (error) {
      console.error('Error loading settings from Firebase:', error);
      alert('Failed to load settings. Please refresh the page.');
    } finally {
      setIsLoading(false);
    }
  };

  const settingsSections: SettingsSection[] = [
    {
      id: 'general',
      title: 'General Settings',
      description: 'Basic platform configuration and information',
      icon: <Settings className="w-5 h-5" />
    },
    {
      id: 'security',
      title: 'Security & Privacy',
      description: 'Security policies and authentication settings',
      icon: <Shield className="w-5 h-5" />
    },
    {
      id: 'users',
      title: 'User Management',
      description: 'User registration and profile settings',
      icon: <Users className="w-5 h-5" />
    },
    {
      id: 'payments',
      title: 'Payment Settings',
      description: 'Fee structure and payment processing',
      icon: <DollarSign className="w-5 h-5" />
    },
    {
      id: 'notifications',
      title: 'Notifications',
      description: 'Email, push, and alert configurations',
      icon: <Bell className="w-5 h-5" />
    },
    {
      id: 'system',
      title: 'System Settings',
      description: 'Database and server configurations',
      icon: <Server className="w-5 h-5" />
    }
  ];

  const handleSaveSettings = async () => {
    try {
      setIsSaving(true);
      
      const settingsData = {
        general: generalSettings,
        security: securitySettings,
        users: userSettings,
        payments: paymentSettings,
        notifications: notificationSettings,
        updatedAt: new Date(),
        updatedBy: 'admin' // You can replace this with actual admin user ID
      };
      
      const adminSettingsRef = doc(db, 'admin', 'settings');
      
      // Check if document exists
      const docSnap = await getDoc(adminSettingsRef);
      
      if (docSnap.exists()) {
        // Update existing document
        await updateDoc(adminSettingsRef, settingsData);
      } else {
        // Create new document
        await setDoc(adminSettingsRef, {
          ...settingsData,
          createdAt: new Date(),
          createdBy: 'admin'
        });
      }
      
      setHasChanges(false);
      setLastSavedTime(new Date());
      setShowSuccessMessage(true);
      
      // Hide success message after 3 seconds
      setTimeout(() => setShowSuccessMessage(false), 3000);
    } catch (error) {
      console.error('Error saving settings to Firebase:', error);
      alert('Failed to save settings. Please try again.');
    } finally {
      setIsSaving(false);
    }
  };

  const renderGeneralSettings = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-[#2E2E2E] mb-2">Platform Name</label>
          <input
            type="text"
            value={generalSettings.platformName}
            onChange={(e) => {
              setGeneralSettings({ ...generalSettings, platformName: e.target.value });
              setHasChanges(true);
            }}
            className="w-full px-3 py-2 border border-[#ffeee3] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF6B00]"
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-[#2E2E2E] mb-2">Support Email</label>
          <input
            type="email"
            value={generalSettings.supportEmail}
            onChange={(e) => {
              setGeneralSettings({ ...generalSettings, supportEmail: e.target.value });
              setHasChanges(true);
            }}
            className="w-full px-3 py-2 border border-[#ffeee3] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF6B00]"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-[#2E2E2E] mb-2">Admin Email</label>
          <input
            type="email"
            value={generalSettings.adminEmail}
            onChange={(e) => {
              setGeneralSettings({ ...generalSettings, adminEmail: e.target.value });
              setHasChanges(true);
            }}
            className="w-full px-3 py-2 border border-[#ffeee3] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF6B00]"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-[#2E2E2E] mb-2">Timezone</label>
          <select
            value={generalSettings.timezone}
            onChange={(e) => {
              setGeneralSettings({ ...generalSettings, timezone: e.target.value });
              setHasChanges(true);
            }}
            className="w-full px-3 py-2 border border-[#ffeee3] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF6B00]"
          >
            <option value="UTC">UTC</option>
            <option value="America/New_York">Eastern Time</option>
            <option value="America/Chicago">Central Time</option>
            <option value="America/Denver">Mountain Time</option>
            <option value="America/Los_Angeles">Pacific Time</option>
            <option value="Europe/London">London</option>
            <option value="Europe/Paris">Paris</option>
            <option value="Asia/Tokyo">Tokyo</option>
          </select>
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-[#2E2E2E] mb-2">Platform Description</label>
        <textarea
          value={generalSettings.platformDescription}
          onChange={(e) => {
            setGeneralSettings({ ...generalSettings, platformDescription: e.target.value });
            setHasChanges(true);
          }}
          rows={3}
          className="w-full px-3 py-2 border border-[#ffeee3] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF6B00]"
        />
      </div>

      <div className="flex items-center">
        <input
          type="checkbox"
          id="maintenanceMode"
          checked={generalSettings.maintenanceMode}
          onChange={(e) => {
            setGeneralSettings({ ...generalSettings, maintenanceMode: e.target.checked });
            setHasChanges(true);
          }}
          className="rounded border-[#ffeee3] text-[#FF6B00] focus:ring-[#FF6B00]"
        />
        <label htmlFor="maintenanceMode" className="ml-2 text-sm text-[#2E2E2E]">
          Enable Maintenance Mode
        </label>
      </div>
    </div>
  );

  const renderSecuritySettings = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-[#2E2E2E] mb-2">Password Min Length</label>
          <input
            type="number"
            value={securitySettings.passwordMinLength}
            onChange={(e) => {
              setSecuritySettings({ ...securitySettings, passwordMinLength: Number(e.target.value) });
              setHasChanges(true);
            }}
            className="w-full px-3 py-2 border border-[#ffeee3] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF6B00]"
            min="6"
            max="32"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-[#2E2E2E] mb-2">Session Timeout (hours)</label>
          <input
            type="number"
            value={securitySettings.sessionTimeout}
            onChange={(e) => {
              setSecuritySettings({ ...securitySettings, sessionTimeout: Number(e.target.value) });
              setHasChanges(true);
            }}
            className="w-full px-3 py-2 border border-[#ffeee3] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF6B00]"
            min="1"
            max="168"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-[#2E2E2E] mb-2">Max Login Attempts</label>
          <input
            type="number"
            value={securitySettings.maxLoginAttempts}
            onChange={(e) => {
              setSecuritySettings({ ...securitySettings, maxLoginAttempts: Number(e.target.value) });
              setHasChanges(true);
            }}
            className="w-full px-3 py-2 border border-[#ffeee3] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF6B00]"
            min="3"
            max="10"
          />
        </div>
      </div>

      <div className="space-y-4">
        <div className="flex items-center">
          <input
            type="checkbox"
            id="requireEmailVerification"
            checked={securitySettings.requireEmailVerification}
            onChange={(e) => {
              setSecuritySettings({ ...securitySettings, requireEmailVerification: e.target.checked });
              setHasChanges(true);
            }}
            className="rounded border-[#ffeee3] text-[#FF6B00] focus:ring-[#FF6B00]"
          />
          <label htmlFor="requireEmailVerification" className="ml-2 text-sm text-[#2E2E2E]">
            Require Email Verification
          </label>
        </div>

        <div className="flex items-center">
          <input
            type="checkbox"
            id="enableTwoFactorAuth"
            checked={securitySettings.enableTwoFactorAuth}
            onChange={(e) => {
              setSecuritySettings({ ...securitySettings, enableTwoFactorAuth: e.target.checked });
              setHasChanges(true);
            }}
            className="rounded border-[#ffeee3] text-[#FF6B00] focus:ring-[#FF6B00]"
          />
          <label htmlFor="enableTwoFactorAuth" className="ml-2 text-sm text-[#2E2E2E]">
            Enable Two-Factor Authentication
          </label>
        </div>

        <div className="flex items-center">
          <input
            type="checkbox"
            id="requirePhoneVerification"
            checked={securitySettings.requirePhoneVerification}
            onChange={(e) => {
              setSecuritySettings({ ...securitySettings, requirePhoneVerification: e.target.checked });
              setHasChanges(true);
            }}
            className="rounded border-[#ffeee3] text-[#FF6B00] focus:ring-[#FF6B00]"
          />
          <label htmlFor="requirePhoneVerification" className="ml-2 text-sm text-[#2E2E2E]">
            Require Phone Verification
          </label>
        </div>

        <div className="flex items-center">
          <input
            type="checkbox"
            id="enableAuditLog"
            checked={securitySettings.enableAuditLog}
            onChange={(e) => {
              setSecuritySettings({ ...securitySettings, enableAuditLog: e.target.checked });
              setHasChanges(true);
            }}
            className="rounded border-[#ffeee3] text-[#FF6B00] focus:ring-[#FF6B00]"
          />
          <label htmlFor="enableAuditLog" className="ml-2 text-sm text-[#2E2E2E]">
            Enable Audit Logging
          </label>
        </div>
      </div>
    </div>
  );

  const renderUserSettings = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-[#2E2E2E] mb-2">Max Projects per User</label>
          <input
            type="number"
            value={userSettings.maxProjects}
            onChange={(e) => {
              setUserSettings({ ...userSettings, maxProjects: Number(e.target.value) });
              setHasChanges(true);
            }}
            className="w-full px-3 py-2 border border-[#ffeee3] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF6B00]"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-[#2E2E2E] mb-2">Max Gigs per Freelancer</label>
          <input
            type="number"
            value={userSettings.maxGigs}
            onChange={(e) => {
              setUserSettings({ ...userSettings, maxGigs: Number(e.target.value) });
              setHasChanges(true);
            }}
            className="w-full px-3 py-2 border border-[#ffeee3] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF6B00]"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-[#2E2E2E] mb-2">Minimum Profile Score</label>
          <input
            type="number"
            value={userSettings.minProfileScore}
            onChange={(e) => {
              setUserSettings({ ...userSettings, minProfileScore: Number(e.target.value) });
              setHasChanges(true);
            }}
            className="w-full px-3 py-2 border border-[#ffeee3] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF6B00]"
            min="0"
            max="100"
          />
        </div>
      </div>

      <div className="space-y-4">
        <div className="flex items-center">
          <input
            type="checkbox"
            id="autoApproveUsers"
            checked={userSettings.autoApproveUsers}
            onChange={(e) => {
              setUserSettings({ ...userSettings, autoApproveUsers: e.target.checked });
              setHasChanges(true);
            }}
            className="rounded border-[#ffeee3] text-[#FF6B00] focus:ring-[#FF6B00]"
          />
          <label htmlFor="autoApproveUsers" className="ml-2 text-sm text-[#2E2E2E]">
            Auto-approve User Registrations
          </label>
        </div>

        <div className="flex items-center">
          <input
            type="checkbox"
            id="requireProfileCompletion"
            checked={userSettings.requireProfileCompletion}
            onChange={(e) => {
              setUserSettings({ ...userSettings, requireProfileCompletion: e.target.checked });
              setHasChanges(true);
            }}
            className="rounded border-[#ffeee3] text-[#FF6B00] focus:ring-[#FF6B00]"
          />
          <label htmlFor="requireProfileCompletion" className="ml-2 text-sm text-[#2E2E2E]">
            Require Profile Completion
          </label>
        </div>

        <div className="flex items-center">
          <input
            type="checkbox"
            id="enableUserReviews"
            checked={userSettings.enableUserReviews}
            onChange={(e) => {
              setUserSettings({ ...userSettings, enableUserReviews: e.target.checked });
              setHasChanges(true);
            }}
            className="rounded border-[#ffeee3] text-[#FF6B00] focus:ring-[#FF6B00]"
          />
          <label htmlFor="enableUserReviews" className="ml-2 text-sm text-[#2E2E2E]">
            Enable User Reviews
          </label>
        </div>

        <div className="flex items-center">
          <input
            type="checkbox"
            id="allowGuestBrowsing"
            checked={userSettings.allowGuestBrowsing}
            onChange={(e) => {
              setUserSettings({ ...userSettings, allowGuestBrowsing: e.target.checked });
              setHasChanges(true);
            }}
            className="rounded border-[#ffeee3] text-[#FF6B00] focus:ring-[#FF6B00]"
          />
          <label htmlFor="allowGuestBrowsing" className="ml-2 text-sm text-[#2E2E2E]">
            Allow Guest Browsing
          </label>
        </div>
      </div>
    </div>
  );

  const renderPaymentSettings = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-[#2E2E2E] mb-2">Platform Fee (%)</label>
          <input
            type="number"
            value={paymentSettings.platformFee}
            onChange={(e) => {
              setPaymentSettings({ ...paymentSettings, platformFee: Number(e.target.value) });
              setHasChanges(true);
            }}
            className="w-full px-3 py-2 border border-[#ffeee3] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF6B00]"
            min="0"
            max="20"
            step="0.1"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-[#2E2E2E] mb-2">Freelancer Fee (%)</label>
          <input
            type="number"
            value={paymentSettings.freelancerFee}
            onChange={(e) => {
              setPaymentSettings({ ...paymentSettings, freelancerFee: Number(e.target.value) });
              setHasChanges(true);
            }}
            className="w-full px-3 py-2 border border-[#ffeee3] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF6B00]"
            min="0"
            max="15"
            step="0.1"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-[#2E2E2E] mb-2">Client Fee (%)</label>
          <input
            type="number"
            value={paymentSettings.clientFee}
            onChange={(e) => {
              setPaymentSettings({ ...paymentSettings, clientFee: Number(e.target.value) });
              setHasChanges(true);
            }}
            className="w-full px-3 py-2 border border-[#ffeee3] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF6B00]"
            min="0"
            max="10"
            step="0.1"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-[#2E2E2E] mb-2">Minimum Withdrawal ($)</label>
          <input
            type="number"
            value={paymentSettings.minimumWithdrawal}
            onChange={(e) => {
              setPaymentSettings({ ...paymentSettings, minimumWithdrawal: Number(e.target.value) });
              setHasChanges(true);
            }}
            className="w-full px-3 py-2 border border-[#ffeee3] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF6B00]"
            min="10"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-[#2E2E2E] mb-2">Payment Processing Time (days)</label>
          <input
            type="number"
            value={paymentSettings.paymentProcessingTime}
            onChange={(e) => {
              setPaymentSettings({ ...paymentSettings, paymentProcessingTime: Number(e.target.value) });
              setHasChanges(true);
            }}
            className="w-full px-3 py-2 border border-[#ffeee3] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF6B00]"
            min="1"
            max="14"
          />
        </div>
      </div>

      <div className="space-y-4">
        <div className="flex items-center">
          <input
            type="checkbox"
            id="autoReleasePayment"
            checked={paymentSettings.autoReleasePayment}
            onChange={(e) => {
              setPaymentSettings({ ...paymentSettings, autoReleasePayment: e.target.checked });
              setHasChanges(true);
            }}
            className="rounded border-[#ffeee3] text-[#FF6B00] focus:ring-[#FF6B00]"
          />
          <label htmlFor="autoReleasePayment" className="ml-2 text-sm text-[#2E2E2E]">
            Auto-release Payments
          </label>
        </div>

        <div className="flex items-center">
          <input
            type="checkbox"
            id="escrowEnabled"
            checked={paymentSettings.escrowEnabled}
            onChange={(e) => {
              setPaymentSettings({ ...paymentSettings, escrowEnabled: e.target.checked });
              setHasChanges(true);
            }}
            className="rounded border-[#ffeee3] text-[#FF6B00] focus:ring-[#FF6B00]"
          />
          <label htmlFor="escrowEnabled" className="ml-2 text-sm text-[#2E2E2E]">
            Enable Escrow System
          </label>
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-[#2E2E2E] mb-2">Refund Policy</label>
        <textarea
          value={paymentSettings.refundPolicy}
          onChange={(e) => {
            setPaymentSettings({ ...paymentSettings, refundPolicy: e.target.value });
            setHasChanges(true);
          }}
          rows={3}
          className="w-full px-3 py-2 border border-[#ffeee3] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF6B00]"
        />
      </div>
    </div>
  );

  const renderNotificationSettings = () => (
    <div className="space-y-6">
      <div className="space-y-4">
        <div className="flex items-center">
          <input
            type="checkbox"
            id="emailNotifications"
            checked={notificationSettings.emailNotifications}
            onChange={(e) => {
              setNotificationSettings({ ...notificationSettings, emailNotifications: e.target.checked });
              setHasChanges(true);
            }}
            className="rounded border-[#ffeee3] text-[#FF6B00] focus:ring-[#FF6B00]"
          />
          <label htmlFor="emailNotifications" className="ml-2 text-sm text-[#2E2E2E]">
            Enable Email Notifications
          </label>
        </div>

        <div className="flex items-center">
          <input
            type="checkbox"
            id="pushNotifications"
            checked={notificationSettings.pushNotifications}
            onChange={(e) => {
              setNotificationSettings({ ...notificationSettings, pushNotifications: e.target.checked });
              setHasChanges(true);
            }}
            className="rounded border-[#ffeee3] text-[#FF6B00] focus:ring-[#FF6B00]"
          />
          <label htmlFor="pushNotifications" className="ml-2 text-sm text-[#2E2E2E]">
            Enable Push Notifications
          </label>
        </div>

        <div className="flex items-center">
          <input
            type="checkbox"
            id="adminAlerts"
            checked={notificationSettings.adminAlerts}
            onChange={(e) => {
              setNotificationSettings({ ...notificationSettings, adminAlerts: e.target.checked });
              setHasChanges(true);
            }}
            className="rounded border-[#ffeee3] text-[#FF6B00] focus:ring-[#FF6B00]"
          />
          <label htmlFor="adminAlerts" className="ml-2 text-sm text-[#2E2E2E]">
            Enable Admin Alerts
          </label>
        </div>

        <div className="flex items-center">
          <input
            type="checkbox"
            id="systemAlerts"
            checked={notificationSettings.systemAlerts}
            onChange={(e) => {
              setNotificationSettings({ ...notificationSettings, systemAlerts: e.target.checked });
              setHasChanges(true);
            }}
            className="rounded border-[#ffeee3] text-[#FF6B00] focus:ring-[#FF6B00]"
          />
          <label htmlFor="systemAlerts" className="ml-2 text-sm text-[#2E2E2E]">
            Enable System Alerts
          </label>
        </div>

        <div className="flex items-center">
          <input
            type="checkbox"
            id="paymentAlerts"
            checked={notificationSettings.paymentAlerts}
            onChange={(e) => {
              setNotificationSettings({ ...notificationSettings, paymentAlerts: e.target.checked });
              setHasChanges(true);
            }}
            className="rounded border-[#ffeee3] text-[#FF6B00] focus:ring-[#FF6B00]"
          />
          <label htmlFor="paymentAlerts" className="ml-2 text-sm text-[#2E2E2E]">
            Enable Payment Alerts
          </label>
        </div>

        <div className="flex items-center">
          <input
            type="checkbox"
            id="disputeAlerts"
            checked={notificationSettings.disputeAlerts}
            onChange={(e) => {
              setNotificationSettings({ ...notificationSettings, disputeAlerts: e.target.checked });
              setHasChanges(true);
            }}
            className="rounded border-[#ffeee3] text-[#FF6B00] focus:ring-[#FF6B00]"
          />
          <label htmlFor="disputeAlerts" className="ml-2 text-sm text-[#2E2E2E]">
            Enable Dispute Alerts
          </label>
        </div>
      </div>
    </div>
  );

  const renderSystemSettings = () => (
    <div className="space-y-6">
      <div className="bg-[#ffeee3] border border-[#FF6B00] rounded-lg p-4">
        <div className="flex items-center">
          <AlertTriangle className="w-5 h-5 text-[#FF6B00] mr-2" />
          <div>
            <h4 className="text-sm font-medium text-[#2E2E2E]">System Configuration</h4>
            <p className="text-xs text-[#2E2E2E]/70 mt-1">
              These settings affect core system functionality. Changes may require system restart.
            </p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-[#2E2E2E] mb-2">Database Connection Pool Size</label>
          <input
            type="number"
            value="50"
            readOnly
            className="w-full px-3 py-2 border border-[#ffeee3] rounded-lg bg-gray-50 text-gray-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-[#2E2E2E] mb-2">API Rate Limit (requests/minute)</label>
          <input
            type="number"
            value="1000"
            readOnly
            className="w-full px-3 py-2 border border-[#ffeee3] rounded-lg bg-gray-50 text-gray-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-[#2E2E2E] mb-2">File Upload Limit (MB)</label>
          <input
            type="number"
            value="50"
            readOnly
            className="w-full px-3 py-2 border border-[#ffeee3] rounded-lg bg-gray-50 text-gray-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-[#2E2E2E] mb-2">Cache TTL (minutes)</label>
          <input
            type="number"
            value="60"
            readOnly
            className="w-full px-3 py-2 border border-[#ffeee3] rounded-lg bg-gray-50 text-gray-500"
          />
        </div>
      </div>

      <div className="space-y-4">
        <div className="flex items-center">
          <Database className="w-5 h-5 text-[#FF6B00] mr-2" />
          <div>
            <p className="text-sm font-medium text-[#2E2E2E]">Database Status: Connected</p>
            <p className="text-xs text-[#2E2E2E]/70">Last backup: 2 hours ago</p>
          </div>
        </div>

        <div className="flex items-center">
          <Server className="w-5 h-5 text-[#FF6B00] mr-2" />
          <div>
            <p className="text-sm font-medium text-[#2E2E2E]">Server Status: Healthy</p>
            <p className="text-xs text-[#2E2E2E]/70">Uptime: 99.9%</p>
          </div>
        </div>
      </div>
    </div>
  );

  const renderActiveSection = () => {
    switch (activeSection) {
      case 'general':
        return renderGeneralSettings();
      case 'security':
        return renderSecuritySettings();
      case 'users':
        return renderUserSettings();
      case 'payments':
        return renderPaymentSettings();
      case 'notifications':
        return renderNotificationSettings();
      case 'system':
        return renderSystemSettings();
      default:
        return renderGeneralSettings();
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#ffeee3] pt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex items-center justify-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#FF6B00]"></div>
            <span className="ml-3 text-[#2E2E2E]">Loading settings...</span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#ffeee3] pt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="flex justify-between items-start mb-8">
          <div>
            <h1 className="text-3xl font-bold text-[#2E2E2E]">Admin Settings</h1>
            <p className="text-[#2E2E2E]/70">Configure platform settings and system preferences</p>
            {lastSavedTime && (
              <p className="text-sm text-[#2E2E2E]/50 mt-1">
                Last saved: {lastSavedTime.toLocaleString()}
              </p>
            )}
          </div>
          <div className="flex flex-col items-end space-y-2">
            {hasChanges && (
              <button
                onClick={handleSaveSettings}
                disabled={isSaving}
                className="flex items-center px-6 py-3 bg-[#FF6B00] text-white rounded-lg hover:bg-[#FF6B00]/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed font-medium shadow-lg"
              >
                {isSaving ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                    Saving Changes...
                  </>
                ) : (
                  <>
                    <Save className="w-4 h-4 mr-2" />
                    Save All Changes
                  </>
                )}
              </button>
            )}
            {!hasChanges && !isSaving && lastSavedTime && (
              <div className="flex items-center text-sm text-[#2E2E2E]/50">
                <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
                All changes saved
              </div>
            )}
          </div>
        </div>

        {/* Success Message Banner */}
        {showSuccessMessage && (
          <div className="mb-6 bg-green-50 border border-green-200 rounded-lg p-4 flex items-center">
            <div className="flex-shrink-0">
              <div className="w-5 h-5 bg-green-500 rounded-full flex items-center justify-center">
                <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
              </div>
            </div>
            <div className="ml-3">
              <h3 className="text-sm font-medium text-green-800">
                Settings Saved Successfully!
              </h3>
              <p className="text-sm text-green-700 mt-1">
                All your configuration changes have been saved to the database.
              </p>
            </div>
          </div>
        )}

        <div className="flex gap-8">
          {/* Settings Navigation */}
          <div className="w-1/4">
            <div className="bg-white rounded-lg shadow-sm border border-[#ffeee3] p-4">
              <nav className="space-y-2">
                {settingsSections.map((section) => (
                  <button
                    key={section.id}
                    onClick={() => setActiveSection(section.id)}
                    className={`w-full flex items-center justify-between px-3 py-2 text-left rounded-lg transition-colors ${
                      activeSection === section.id
                        ? 'bg-[#ffeee3] text-[#FF6B00] border border-[#FF6B00]'
                        : 'text-[#2E2E2E] hover:bg-[#ffeee3]'
                    }`}
                  >
                    <div className="flex items-center">
                      {section.icon}
                      <div className="ml-3">
                        <div className="font-medium text-sm">{section.title}</div>
                        <div className="text-xs opacity-70">{section.description}</div>
                      </div>
                    </div>
                    {hasChanges && (
                      <div className="w-2 h-2 bg-[#FF6B00] rounded-full animate-pulse"></div>
                    )}
                  </button>
                ))}
              </nav>
            </div>
          </div>

          {/* Settings Content */}
          <div className="flex-1">
            <div className="bg-white rounded-lg shadow-sm border border-[#ffeee3] p-6">
              <h2 className="text-xl font-semibold text-[#2E2E2E] mb-6">
                {settingsSections.find(s => s.id === activeSection)?.title}
              </h2>
              {renderActiveSection()}
              
              {/* Bottom Save Section */}
              {hasChanges && (
                <div className="mt-8 pt-6 border-t border-[#ffeee3]">
                  <div className="flex items-center justify-between">
                    <div className="text-sm text-[#2E2E2E]/70">
                      <span className="inline-flex items-center">
                        <div className="w-2 h-2 bg-[#FF6B00] rounded-full mr-2 animate-pulse"></div>
                        You have unsaved changes
                      </span>
                    </div>
                    <button
                      onClick={handleSaveSettings}
                      disabled={isSaving}
                      className="flex items-center px-6 py-3 bg-[#FF6B00] text-white rounded-lg hover:bg-[#FF6B00]/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed font-medium"
                    >
                      {isSaving ? (
                        <>
                          <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                          Saving...
                        </>
                      ) : (
                        <>
                          <Save className="w-4 h-4 mr-2" />
                          Save Changes
                        </>
                      )}
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

export default AdminSettings;