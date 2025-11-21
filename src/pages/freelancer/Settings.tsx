import React, { useState, useEffect } from 'react';
import { doc, getDoc, updateDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '../../lib/firebase';
import { useAuth } from '../../contexts/AuthContext';
import { uploadImage } from '../../lib/imageUpload';
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
  Smartphone,
  Clock,
  DollarSign
} from 'lucide-react';

interface UserProfile {
  firstName: string;
  lastName: string;
  email: string;
  title: string;
  location: string;
  website: string;
  bio: string;
  avatar: string;
  memberSince: string;
}

const Settings: React.FC = () => {
  const { currentUser } = useAuth();
  const [activeTab, setActiveTab] = useState('profile');
  const [isEditing, setIsEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [uploadingImage, setUploadingImage] = useState(false);
  const [changingPassword, setChangingPassword] = useState(false);
  const [showPasswordForm, setShowPasswordForm] = useState(false);
  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });
  const [userProfile, setUserProfile] = useState<UserProfile>({
    firstName: '',
    lastName: '',
    email: '',
    title: '',
    location: '',
    website: '',
    bio: '',
    avatar: '',
    memberSince: ''
  });
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

  // Fetch user data from Firebase
  useEffect(() => {
    const fetchUserData = async () => {
      if (!currentUser?.uid) {
        setIsLoading(false);
        return;
      }

      try {
        const userDoc = await getDoc(doc(db, 'users', currentUser.uid));
        if (userDoc.exists()) {
          const userData = userDoc.data();
          setUserProfile({
            firstName: userData.firstName || '',
            lastName: userData.lastName || '',
            email: userData.email || currentUser.email || '',
            title: userData.title || userData.profileTitle || '',
            location: userData.location || '',
            website: userData.website || '',
            bio: userData.bio || '',
            avatar: userData.profilePictureUrl || userData.avatar || '',
            memberSince: userData.createdAt ? new Date(userData.createdAt.toDate()).toLocaleDateString() : 'Recently'
          });

          // Update preferences if they exist
          if (userData.preferences) {
            setPreferences(prev => ({ ...prev, ...userData.preferences }));
          }

          // Update notifications if they exist
          if (userData.notifications) {
            setNotifications(prev => ({ ...prev, ...userData.notifications }));
          }

          // Update privacy settings if they exist
          if (userData.privacy) {
            setPrivacy(prev => ({ ...prev, ...userData.privacy }));
          }
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchUserData();
  }, [currentUser]);

  // Save user data to Firebase
  const saveUserData = async () => {
    if (!currentUser?.uid) return;

    setIsSaving(true);
    try {
      await updateDoc(doc(db, 'users', currentUser.uid), {
        firstName: userProfile.firstName,
        lastName: userProfile.lastName,
        title: userProfile.title,
        profileTitle: userProfile.title,
        location: userProfile.location,
        website: userProfile.website,
        bio: userProfile.bio,
        avatar: userProfile.avatar,
        profilePictureUrl: userProfile.avatar, // Save to both fields for compatibility
        preferences,
        notifications,
        privacy,
        updatedAt: serverTimestamp()
      });
      
      setIsEditing(false);
      console.log('User data saved successfully');
    } catch (error) {
      console.error('Error saving user data:', error);
      alert('Failed to save changes. Please try again.');
    } finally {
      setIsSaving(false);
    }
  };

  // Handle profile image upload
  const handleImageUpload = async (file: File) => {
    if (!currentUser) return;

    try {
      setUploadingImage(true);
      
      // Validate file before upload
      if (file.size > 5 * 1024 * 1024) { // 5MB limit
        throw new Error('Image size must be less than 5MB');
      }
      
      if (!file.type.startsWith('image/')) {
        throw new Error('Please select a valid image file');
      }
      
      // Upload to ImageBB using helper function
      const uploadResult = await uploadImage(file, {
        maxSizeInMB: 5,
        allowedTypes: ['image/jpeg', 'image/jpg', 'image/png', 'image/webp']
      });
      
      // Update profile state with new image
      setUserProfile(prev => ({ ...prev, avatar: uploadResult.url }));
      
      // Automatically save the new profile picture to Firebase
      try {
        await updateDoc(doc(db, 'users', currentUser.uid), {
          profilePictureUrl: uploadResult.url,
          avatar: uploadResult.url,
          updatedAt: serverTimestamp()
        });
        console.log('Profile picture saved to Firebase:', uploadResult.url);
      } catch (saveError) {
        console.error('Error saving profile picture to Firebase:', saveError);
        alert('Image uploaded but failed to save to profile. Please save your profile to update.');
      }
    } catch (err: any) {
      console.error('Error uploading image:', err);
      if (err.code === 'MISSING_API_KEY') {
        alert('Image upload service not configured. Please contact support.');
      } else if (err.code === 'FILE_TOO_LARGE') {
        alert('Image is too large. Please select an image smaller than 5MB.');
      } else if (err.code === 'INVALID_FILE_TYPE') {
        alert('Invalid file type. Please select a JPEG, PNG, or WebP image.');
      } else {
        alert(err.message || 'Failed to upload image. Please check your internet connection and try again.');
      }
    } finally {
      setUploadingImage(false);
    }
  };

  // Handle password change
  const handlePasswordChange = async () => {
    if (!currentUser) return;

    // Validate password inputs
    if (!passwordData.currentPassword || !passwordData.newPassword || !passwordData.confirmPassword) {
      alert('Please fill in all password fields.');
      return;
    }

    if (passwordData.newPassword !== passwordData.confirmPassword) {
      alert('New passwords do not match.');
      return;
    }

    if (passwordData.newPassword.length < 6) {
      alert('New password must be at least 6 characters long.');
      return;
    }

    try {
      setChangingPassword(true);
      
      // Import Firebase Auth functions dynamically
      const { updatePassword, reauthenticateWithCredential, EmailAuthProvider } = await import('firebase/auth');
      
      // Re-authenticate user with current password
      const credential = EmailAuthProvider.credential(
        currentUser.email!,
        passwordData.currentPassword
      );
      
      await reauthenticateWithCredential(currentUser, credential);
      
      // Update password
      await updatePassword(currentUser, passwordData.newPassword);
      
      // Update user document in Firestore with password change timestamp
      await updateDoc(doc(db, 'users', currentUser.uid), {
        passwordChangedAt: serverTimestamp(),
        updatedAt: serverTimestamp()
      });
      
      // Reset form
      setPasswordData({
        currentPassword: '',
        newPassword: '',
        confirmPassword: ''
      });
      setShowPasswordForm(false);
      
      alert('Password updated successfully!');
    } catch (error: any) {
      console.error('Error changing password:', error);
      if (error.code === 'auth/wrong-password') {
        alert('Current password is incorrect.');
      } else if (error.code === 'auth/weak-password') {
        alert('New password is too weak. Please choose a stronger password.');
      } else {
        alert('Failed to update password. Please try again.');
      }
    } finally {
      setChangingPassword(false);
    }
  };

  const tabs = [
    { id: 'profile', label: 'Profile', icon: User },
    { id: 'account', label: 'Account & Security', icon: Shield },
    { id: 'notifications', label: 'Notifications', icon: Bell },
    { id: 'payments', label: 'Payment Methods', icon: CreditCard },
    { id: 'privacy', label: 'Privacy', icon: Eye }
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

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#ffeee3]/30 pt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex items-center justify-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#FF6B00]"></div>
            <span className="ml-3 text-gray-600">Loading settings...</span>
          </div>
        </div>
      </div>
    );
  }

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
                      <div className="relative">
                        {userProfile.avatar ? (
                          <img
                            src={userProfile.avatar}
                            alt="Profile"
                            className={`w-24 h-24 rounded-full object-cover transition-opacity duration-300 ${
                              uploadingImage ? 'opacity-50' : 'opacity-100'
                            }`}
                            onError={() => {
                              console.error('Failed to load profile image:', userProfile.avatar);
                              // Fallback to default avatar on image load error
                              setUserProfile(prev => ({ ...prev, avatar: '' }));
                            }}
                          />
                        ) : (
                          <div className={`w-24 h-24 rounded-full bg-gradient-to-br from-[#FF6B00] to-[#FF9F45] flex items-center justify-center transition-opacity duration-300 ${
                            uploadingImage ? 'opacity-50' : 'opacity-100'
                          }`}>
                            <User className="w-8 h-8 text-white" />
                          </div>
                        )}
                        {uploadingImage && (
                          <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 rounded-full">
                            <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-white"></div>
                          </div>
                        )}
                      </div>
                      {isEditing && (
                        <label className="absolute bottom-0 right-0 bg-[#FF6B00] hover:bg-[#FF9F45] text-white p-2 rounded-full shadow-lg transition-colors cursor-pointer">
                          {uploadingImage ? (
                            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                          ) : (
                            <Camera className="w-4 h-4" />
                          )}
                          <input
                            type="file"
                            accept="image/jpeg,image/jpg,image/png,image/webp"
                            onChange={(e) => {
                              const file = e.target.files?.[0];
                              if (file) {
                                handleImageUpload(file);
                              }
                              // Reset the input value so the same file can be selected again
                              e.target.value = '';
                            }}
                            className="hidden"
                            disabled={uploadingImage}
                            title="Upload profile picture (Max 5MB, JPEG/PNG/WebP)"
                          />
                        </label>
                      )}
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-[#2E2E2E]">{userProfile.firstName} {userProfile.lastName}</h3>
                      <p className="text-[#2E2E2E]/70">{userProfile.title || 'Professional'}</p>
                      <p className="text-sm text-[#2E2E2E]/60">Member since {userProfile.memberSince}</p>
                    </div>
                  </div>

                  {/* Form Fields */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-[#2E2E2E] mb-2">First Name</label>
                      <input
                        type="text"
                        value={userProfile.firstName}
                        onChange={(e) => setUserProfile(prev => ({ ...prev, firstName: e.target.value }))}
                        disabled={!isEditing}
                        className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#FF6B00] focus:border-transparent disabled:bg-gray-50 disabled:text-gray-500"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-[#2E2E2E] mb-2">Last Name</label>
                      <input
                        type="text"
                        value={userProfile.lastName}
                        onChange={(e) => setUserProfile(prev => ({ ...prev, lastName: e.target.value }))}
                        disabled={!isEditing}
                        className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#FF6B00] focus:border-transparent disabled:bg-gray-50 disabled:text-gray-500"
                      />
                    </div>
                    
                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium text-[#2E2E2E] mb-2">Professional Title</label>
                      <input
                        type="text"
                        value={userProfile.title}
                        onChange={(e) => setUserProfile(prev => ({ ...prev, title: e.target.value }))}
                        disabled={!isEditing}
                        className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#FF6B00] focus:border-transparent disabled:bg-gray-50 disabled:text-gray-500"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-[#2E2E2E] mb-2">Location</label>
                      <input
                        type="text"
                        value={userProfile.location}
                        onChange={(e) => setUserProfile(prev => ({ ...prev, location: e.target.value }))}
                        disabled={!isEditing}
                        className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#FF6B00] focus:border-transparent disabled:bg-gray-50 disabled:text-gray-500"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-[#2E2E2E] mb-2">Website</label>
                      <input
                        type="url"
                        value={userProfile.website}
                        onChange={(e) => setUserProfile(prev => ({ ...prev, website: e.target.value }))}
                        disabled={!isEditing}
                        className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#FF6B00] focus:border-transparent disabled:bg-gray-50 disabled:text-gray-500"
                      />
                    </div>
                    
                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium text-[#2E2E2E] mb-2">Bio</label>
                      <textarea
                        value={userProfile.bio}
                        onChange={(e) => setUserProfile(prev => ({ ...prev, bio: e.target.value }))}
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
                        disabled={isSaving}
                        className="border border-gray-300 text-[#2E2E2E] hover:bg-gray-50 px-6 py-2 rounded-lg font-medium transition-colors flex items-center disabled:opacity-50"
                      >
                        <X className="w-4 h-4 mr-2" />
                        Cancel
                      </button>
                      <button
                        onClick={saveUserData}
                        disabled={isSaving}
                        className="bg-[#FF6B00] hover:bg-[#FF9F45] text-white px-6 py-2 rounded-lg font-medium transition-colors flex items-center disabled:opacity-50"
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
                  )}
                </div>
              )}

              {/* Account & Security Tab */}
              {activeTab === 'account' && (
                <div className="space-y-6">
                  <h2 className="text-xl font-semibold text-[#2E2E2E]">Account & Security</h2>

                  {/* Email & Password */}
                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg bg-gray-50">
                      <div className="flex items-center space-x-3">
                        <Mail className="w-5 h-5 text-gray-500" />
                        <div>
                          <p className="font-medium text-[#2E2E2E]">Email Address</p>
                          <p className="text-sm text-[#2E2E2E]/60">{userProfile.email}</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Lock className="w-4 h-4 text-gray-400" />
                        <span className="text-sm text-gray-500 font-medium">Locked</span>
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                      <div className="flex items-center space-x-3">
                        <Lock className="w-5 h-5 text-[#FF6B00]" />
                        <div>
                          <p className="font-medium text-[#2E2E2E]">Password</p>
                          <p className="text-sm text-[#2E2E2E]/60">••••••••••••</p>
                        </div>
                      </div>
                      <button 
                        onClick={() => setShowPasswordForm(!showPasswordForm)}
                        className="text-[#FF6B00] hover:text-[#FF9F45] font-medium transition-colors"
                      >
                        {showPasswordForm ? 'Cancel' : 'Change'}
                      </button>
                    </div>

                    {/* Password Change Form */}
                    {showPasswordForm && (
                      <div className="p-4 border border-[#FF6B00]/20 bg-[#ffeee3]/30 rounded-lg space-y-4">
                        <h4 className="font-medium text-[#2E2E2E] mb-3">Change Password</h4>
                        
                        <div>
                          <label className="block text-sm font-medium text-[#2E2E2E] mb-2">Current Password</label>
                          <input
                            type="password"
                            value={passwordData.currentPassword}
                            onChange={(e) => setPasswordData(prev => ({ ...prev, currentPassword: e.target.value }))}
                            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#FF6B00] focus:border-transparent"
                            placeholder="Enter current password"
                            disabled={changingPassword}
                          />
                        </div>
                        
                        <div>
                          <label className="block text-sm font-medium text-[#2E2E2E] mb-2">New Password</label>
                          <input
                            type="password"
                            value={passwordData.newPassword}
                            onChange={(e) => setPasswordData(prev => ({ ...prev, newPassword: e.target.value }))}
                            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#FF6B00] focus:border-transparent"
                            placeholder="Enter new password (min 6 characters)"
                            disabled={changingPassword}
                          />
                        </div>
                        
                        <div>
                          <label className="block text-sm font-medium text-[#2E2E2E] mb-2">Confirm New Password</label>
                          <input
                            type="password"
                            value={passwordData.confirmPassword}
                            onChange={(e) => setPasswordData(prev => ({ ...prev, confirmPassword: e.target.value }))}
                            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#FF6B00] focus:border-transparent"
                            placeholder="Confirm new password"
                            disabled={changingPassword}
                          />
                        </div>
                        
                        <div className="flex justify-end space-x-3 pt-2">
                          <button
                            onClick={() => {
                              setShowPasswordForm(false);
                              setPasswordData({ currentPassword: '', newPassword: '', confirmPassword: '' });
                            }}
                            disabled={changingPassword}
                            className="border border-gray-300 text-[#2E2E2E] hover:bg-gray-50 px-4 py-2 rounded-lg font-medium transition-colors disabled:opacity-50"
                          >
                            Cancel
                          </button>
                          <button
                            onClick={handlePasswordChange}
                            disabled={changingPassword || !passwordData.currentPassword || !passwordData.newPassword || !passwordData.confirmPassword}
                            className="bg-[#FF6B00] hover:bg-[#FF9F45] text-white px-4 py-2 rounded-lg font-medium transition-colors disabled:opacity-50 flex items-center"
                          >
                            {changingPassword ? (
                              <>
                                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                                Updating...
                              </>
                            ) : (
                              'Update Password'
                            )}
                          </button>
                        </div>
                      </div>
                    )}
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

              {/* Save Button */}
              <div className="flex justify-end pt-6 border-t border-gray-200">
                <button 
                  onClick={saveUserData}
                  disabled={isSaving}
                  className="bg-[#FF6B00] hover:bg-[#FF9F45] text-white px-6 py-2 rounded-lg font-medium transition-colors flex items-center disabled:opacity-50"
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
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;
