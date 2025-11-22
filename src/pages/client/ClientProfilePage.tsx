import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { FirestoreService } from '../../lib/firestoreService';
import { uploadImage } from '../../lib/imageUpload';
import { collection, query, where, getDocs, getDoc, doc } from 'firebase/firestore';
import { db } from '../../lib/firebase';

const ClientProfilePage: React.FC = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [uploadingImage, setUploadingImage] = useState(false);
  const { currentUser } = useAuth();
  const [reviews, setReviews] = useState<any[]>([]);
  const [recentProjects, setRecentProjects] = useState<any[]>([]);

  const [profile, setProfile] = useState<any>({
    personalInfo: {
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      location: '',
      timezone: 'Pacific Standard Time (PST)',
      avatar: '',
      title: '',
      company: '',
      website: ''
    },
    businessInfo: {
      companyName: '',
      industry: '',
      companySize: '50-100 employees',
      taxId: '',
      address: {
        street: '',
        city: '',
        state: '',
        zipCode: '',
        country: 'United States'
      }
    },
    stats: {
      projectsCompleted: 0,
      totalSpent: 0,
      avgProjectValue: 0,
      successRate: 96,
      onTimeCompletion: 94,
      freelancersWorkedWith: 0
    },
    preferences: {
      communicationStyle: 'Professional',
      projectTypes: ['Web Development', 'Mobile Apps', 'UI/UX Design'],
      budget: '$1,000 - $5,000',
      timeline: 'Flexible',
      workingHours: '9 AM - 6 PM PST'
    }
  });

  // Fetch profile data from Firebase
  useEffect(() => {
    const fetchProfile = async () => {
      if (!currentUser) {
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        const userData = await FirestoreService.getUser(currentUser.uid);
        
        if (userData) {
          // Map Firebase data to profile structure
          setProfile({
            personalInfo: {
              firstName: userData.firstName || '',
              lastName: userData.lastName || '',
              email: userData.email || currentUser.email || '',
              phone: userData.phone || userData.profile?.phone || '',
              location: userData.location || userData.profile?.location || '',
              timezone: userData.timezone || 'Pacific Standard Time (PST)',
              avatar: userData.profile?.profilePictureUrl || userData.profilePictureUrl || '',
              title: userData.jobTitle || userData.profile?.jobTitle || '',
              company: userData.company?.name || userData.companyName || '',
              website: userData.company?.website || userData.website || ''
            },
            businessInfo: {
              companyName: userData.company?.name || userData.companyName || '',
              industry: userData.company?.industry || userData.industry || '',
              companySize: userData.company?.size || userData.companySize || '50-100 employees',
              taxId: userData.company?.taxId || userData.taxId || '',
              address: {
                street: userData.company?.address?.street || '',
                city: userData.company?.address?.city || '',
                state: userData.company?.address?.state || '',
                zipCode: userData.company?.address?.zipCode || '',
                country: userData.company?.address?.country || 'United States'
              }
            },
            stats: {
              projectsCompleted: userData.stats?.projectsCompleted || 0,
              totalSpent: userData.stats?.totalSpent || 0,
              avgProjectValue: userData.stats?.avgProjectValue || 0,
              successRate: userData.stats?.successRate || 96,
              onTimeCompletion: userData.stats?.onTimeCompletion || 94,
              freelancersWorkedWith: userData.stats?.freelancersWorkedWith || 0
            },
            preferences: {
              communicationStyle: userData.preferences?.communicationStyle || 'Professional',
              projectTypes: userData.preferences?.projectTypes || ['Web Development', 'Mobile Apps', 'UI/UX Design'],
              budget: userData.preferences?.budget || '$1,000 - $5,000',
              timeline: userData.preferences?.timeline || 'Flexible',
              workingHours: userData.preferences?.workingHours || '9 AM - 6 PM PST'
            }
          });
        }
      } catch (error) {
        console.error('Error fetching profile:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [currentUser]);

  // Fetch client statistics from Firebase
  useEffect(() => {
    const fetchClientStats = async () => {
      if (!currentUser) return;

      try {
        // Fetch all orders for this client
        const ordersQuery = query(
          collection(db, 'orders'),
          where('buyerId', '==', currentUser.uid)
        );
        const ordersSnap = await getDocs(ordersQuery);
        
        let totalSpent = 0;
        let completedProjects = 0;
        const freelancerIds = new Set<string>();
        
        ordersSnap.forEach((doc) => {
          const orderData = doc.data();
          if (orderData.status === 'completed') {
            completedProjects++;
            totalSpent += orderData.totalAmount || orderData.price || 0;
          }
          if (orderData.sellerId) {
            freelancerIds.add(orderData.sellerId);
          }
        });

        const avgProjectValue = completedProjects > 0 ? totalSpent / completedProjects : 0;
        const successRate = ordersSnap.size > 0 ? (completedProjects / ordersSnap.size) * 100 : 0;
        
        // Calculate on-time completion (orders delivered before expected date)
        let onTimeCount = 0;
        ordersSnap.forEach((doc) => {
          const orderData = doc.data();
          if (orderData.status === 'completed' && orderData.deliveredAt && orderData.expectedDeliveryDate) {
            const deliveredDate = orderData.deliveredAt.toDate ? orderData.deliveredAt.toDate() : new Date(orderData.deliveredAt);
            const expectedDate = orderData.expectedDeliveryDate.toDate ? orderData.expectedDeliveryDate.toDate() : new Date(orderData.expectedDeliveryDate);
            if (deliveredDate <= expectedDate) {
              onTimeCount++;
            }
          }
        });
        const onTimeCompletion = completedProjects > 0 ? (onTimeCount / completedProjects) * 100 : 0;

        setProfile((prev: any) => ({
          ...prev,
          stats: {
            projectsCompleted: completedProjects,
            totalSpent: Math.round(totalSpent * 100) / 100,
            avgProjectValue: Math.round(avgProjectValue * 100) / 100,
            successRate: Math.round(successRate),
            onTimeCompletion: Math.round(onTimeCompletion),
            freelancersWorkedWith: freelancerIds.size
          }
        }));
      } catch (error) {
        console.error('Error fetching client stats:', error);
      }
    };

    fetchClientStats();
  }, [currentUser]);

  // Fetch reviews given by client
  useEffect(() => {
    const fetchReviews = async () => {
      if (!currentUser) return;

      try {
        const reviewsQuery = query(
          collection(db, 'reviews'),
          where('clientId', '==', currentUser.uid)
        );
        const reviewsSnap = await getDocs(reviewsQuery);
        const reviewsData: any[] = [];

        for (const docSnap of reviewsSnap.docs) {
          const reviewData = docSnap.data();
          let freelancerName = 'Unknown';
          let gigTitle = 'Unknown Project';

          // Fetch freelancer name
          if (reviewData.freelancerId) {
            try {
              const userDoc = await getDoc(doc(db, 'users', reviewData.freelancerId));
              if (userDoc.exists()) {
                const userData = userDoc.data();
                freelancerName = `${userData.firstName || ''} ${userData.lastName || ''}`.trim() || 'Unknown';
              }
            } catch (error) {
              console.error('Error fetching freelancer:', error);
            }
          }

          // Fetch gig title
          if (reviewData.gigId) {
            try {
              const gigDoc = await getDoc(doc(db, 'gigs', reviewData.gigId));
              if (gigDoc.exists()) {
                const gigData = gigDoc.data();
                gigTitle = gigData.title || 'Unknown Project';
              }
            } catch (error) {
              console.error('Error fetching gig:', error);
            }
          }

          reviewsData.push({
            id: docSnap.id,
            freelancer: freelancerName,
            project: gigTitle,
            rating: reviewData.rating || 0,
            date: reviewData.createdAt?.toDate ? reviewData.createdAt.toDate().toLocaleDateString() : 'Unknown',
            comment: reviewData.reviewText || ''
          });
        }

        // Sort by date (most recent first)
        reviewsData.sort((a, b) => {
          const dateA = new Date(a.date).getTime();
          const dateB = new Date(b.date).getTime();
          return dateB - dateA;
        });

        setReviews(reviewsData);
      } catch (error) {
        console.error('Error fetching reviews:', error);
      }
    };

    fetchReviews();
  }, [currentUser]);

  // Fetch recent projects/orders
  useEffect(() => {
    const fetchRecentProjects = async () => {
      if (!currentUser) return;

      try {
        const ordersQuery = query(
          collection(db, 'orders'),
          where('buyerId', '==', currentUser.uid)
        );
        const ordersSnap = await getDocs(ordersQuery);
        const projectsData: any[] = [];

        for (const docSnap of ordersSnap.docs) {
          const orderData = docSnap.data();
          let freelancerName = 'Unknown';
          let gigTitle = 'Unknown Project';

          // Fetch freelancer name
          if (orderData.sellerId) {
            try {
              const userDoc = await getDoc(doc(db, 'users', orderData.sellerId));
              if (userDoc.exists()) {
                const userData = userDoc.data();
                freelancerName = `${userData.firstName || ''} ${userData.lastName || ''}`.trim() || 'Unknown';
              }
            } catch (error) {
              console.error('Error fetching freelancer:', error);
            }
          }

          // Fetch gig title
          if (orderData.gigId) {
            try {
              const gigDoc = await getDoc(doc(db, 'gigs', orderData.gigId));
              if (gigDoc.exists()) {
                const gigData = gigDoc.data();
                gigTitle = gigData.title || 'Unknown Project';
              }
            } catch (error) {
              console.error('Error fetching gig:', error);
            }
          }

          // Calculate completion percentage
          let completion = 0;
          if (orderData.status === 'completed') {
            completion = 100;
          } else if (orderData.status === 'delivered') {
            completion = 90;
          } else if (orderData.status === 'in_progress') {
            completion = 50;
          } else if (orderData.status === 'accepted') {
            completion = 25;
          }

          projectsData.push({
            id: docSnap.id,
            title: gigTitle,
            freelancer: freelancerName,
            status: orderData.status === 'completed' ? 'Completed' : 
                    orderData.status === 'delivered' ? 'Under Review' : 
                    orderData.status === 'in_progress' ? 'In Progress' : 'Pending',
            budget: orderData.totalAmount || orderData.price || 0,
            completion: completion,
            startDate: orderData.createdAt?.toDate ? orderData.createdAt.toDate().toLocaleDateString() : 'Unknown'
          });
        }

        // Sort by date (most recent first)
        projectsData.sort((a, b) => {
          const dateA = new Date(a.startDate).getTime();
          const dateB = new Date(b.startDate).getTime();
          return dateB - dateA;
        });

        // Take only the 5 most recent
        setRecentProjects(projectsData.slice(0, 5));
      } catch (error) {
        console.error('Error fetching recent projects:', error);
      }
    };

    fetchRecentProjects();
  }, [currentUser]);

  // Handle profile image upload
  const handleImageUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file || !currentUser) return;

    try {
      setUploadingImage(true);
      const imageUrl = await uploadImage(file);
      
      // Update profile state
      setProfile({
        ...profile,
        personalInfo: {
          ...profile.personalInfo,
          avatar: imageUrl
        }
      });

      // Update Firebase immediately
      await FirestoreService.updateUser(currentUser.uid, {
        profile: {
          profilePictureUrl: imageUrl
        }
      });

      console.log('Profile picture updated successfully');
    } catch (error) {
      console.error('Error uploading profile picture:', error);
      alert('Failed to upload profile picture. Please try again.');
    } finally {
      setUploadingImage(false);
    }
  };

  // Handle profile field changes
  const handleFieldChange = (section: string, field: string, value: any) => {
    if (section === 'personalInfo' || section === 'businessInfo' || section === 'preferences') {
      setProfile({
        ...profile,
        [section]: {
          ...profile[section],
          [field]: value
        }
      });
    } else if (section === 'address') {
      setProfile({
        ...profile,
        businessInfo: {
          ...profile.businessInfo,
          address: {
            ...profile.businessInfo.address,
            [field]: value
          }
        }
      });
    }
  };

  // Handle save profile
  const handleSaveProfile = async () => {
    if (!currentUser) return;

    try {
      setSaving(true);

      // Prepare data to save to Firebase
      const updateData: any = {
        firstName: profile.personalInfo.firstName,
        lastName: profile.personalInfo.lastName,
        email: profile.personalInfo.email,
        phone: profile.personalInfo.phone,
        location: profile.personalInfo.location,
        timezone: profile.personalInfo.timezone,
        jobTitle: profile.personalInfo.title,
        website: profile.personalInfo.website,
        companyName: profile.businessInfo.companyName,
        industry: profile.businessInfo.industry,
        companySize: profile.businessInfo.companySize,
        taxId: profile.businessInfo.taxId,
        company: {
          name: profile.businessInfo.companyName,
          industry: profile.businessInfo.industry,
          size: profile.businessInfo.companySize,
          taxId: profile.businessInfo.taxId,
          website: profile.personalInfo.website,
          address: profile.businessInfo.address
        },
        profile: {
          profilePictureUrl: profile.personalInfo.avatar,
          phone: profile.personalInfo.phone,
          location: profile.personalInfo.location,
          jobTitle: profile.personalInfo.title
        },
        preferences: profile.preferences,
        updatedAt: new Date()
      };

      await FirestoreService.updateUser(currentUser.uid, updateData);
      
      setIsEditing(false);
      // Profile saved successfully (silent save, no popup)
    } catch (error) {
      console.error('Error saving profile:', error);
      // Optionally keep error alert or remove it too
    } finally {
      setSaving(false);
    }
  };

  const handleEditToggle = () => {
    if (isEditing) {
      handleSaveProfile();
    } else {
      setIsEditing(true);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Completed': return 'bg-green-100 text-green-600';
      case 'In Progress': return 'bg-blue-100 text-blue-600';
      case 'Under Review': return 'bg-yellow-100 text-yellow-600';
      default: return 'bg-gray-100 text-gray-600';
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#ffeee3] flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#FF6B00] mx-auto mb-4"></div>
          <p className="text-[#2E2E2E]/60">Loading profile...</p>
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
            <div className="flex flex-col lg:flex-row lg:items-center justify-between">
              <div className="flex items-center space-x-6 mb-6 lg:mb-0">
                <div className="relative">
                  <img
                    src={profile.personalInfo.avatar || 'https://via.placeholder.com/120'}
                    alt={`${profile.personalInfo.firstName} ${profile.personalInfo.lastName}`}
                    className="w-24 h-24 rounded-full object-cover border-4 border-white/20"
                  />
                  <label className="absolute bottom-0 right-0 bg-[#FF6B00] hover:bg-[#FF9F45] text-white p-2 rounded-full transition-colors cursor-pointer">
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageUpload}
                      className="hidden"
                      disabled={uploadingImage}
                    />
                    {uploadingImage ? (
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    ) : (
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                    )}
                  </label>
                </div>
                <div>
                  <h1 className="text-3xl md:text-4xl font-bold mb-2">
                    {profile.personalInfo.firstName} {profile.personalInfo.lastName}
                  </h1>
                  <p className="text-xl text-[#ffeee3] mb-2">{profile.personalInfo.title}</p>
                  <p className="text-[#ffeee3]/80">{profile.personalInfo.company}</p>
                  <p className="text-[#ffeee3]/60">{profile.personalInfo.location}</p>
                </div>
              </div>
              
              <button
                onClick={handleEditToggle}
                disabled={saving}
                className="bg-[#FF6B00] hover:bg-[#FF9F45] text-white px-6 py-3 rounded-lg font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {saving ? 'Saving...' : isEditing ? 'Save Changes' : 'Edit Profile'}
              </button>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8">
              <div className="bg-white/10 rounded-lg p-4 text-center">
                <div className="text-2xl font-bold text-white">{profile.stats.projectsCompleted}</div>
                <div className="text-[#ffeee3] text-sm">Projects Completed</div>
              </div>
              <div className="bg-white/10 rounded-lg p-4 text-center">
                <div className="text-2xl font-bold text-white">${profile.stats.totalSpent.toLocaleString()}</div>
                <div className="text-[#ffeee3] text-sm">Total Spent</div>
              </div>
              <div className="bg-white/10 rounded-lg p-4 text-center">
                <div className="text-2xl font-bold text-white">{profile.stats.successRate}%</div>
                <div className="text-[#ffeee3] text-sm">Success Rate</div>
              </div>
              <div className="bg-white/10 rounded-lg p-4 text-center">
                <div className="text-2xl font-bold text-white">{profile.stats.freelancersWorkedWith}</div>
                <div className="text-[#ffeee3] text-sm">Freelancers</div>
              </div>
            </div>
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
                { id: 'overview', label: 'Overview' },
                { id: 'personal', label: 'Personal Info' },
                { id: 'business', label: 'Business Info' },
                { id: 'projects', label: 'Recent Projects' },
                { id: 'reviews', label: 'Reviews Given' }
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`px-6 py-3 font-medium transition-colors ${
                    activeTab === tab.id
                      ? 'text-[#FF6B00] border-b-2 border-[#FF6B00]'
                      : 'text-[#2E2E2E] hover:text-[#FF6B00]'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            {/* Overview Tab */}
            {activeTab === 'overview' && (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Profile Summary */}
                <div className="bg-white rounded-xl shadow-sm p-6 border border-[#ffeee3]">
                  <h2 className="text-xl font-bold text-[#2E2E2E] mb-6">Profile Summary</h2>
                  <div className="space-y-4">
                    <div className="flex justify-between">
                      <span className="text-[#2E2E2E]/60">Member Since</span>
                      <span className="font-medium text-[#2E2E2E]">January 2023</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-[#2E2E2E]/60">Last Active</span>
                      <span className="font-medium text-[#2E2E2E]">2 hours ago</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-[#2E2E2E]/60">Profile Completion</span>
                      <span className="font-medium text-[#FF6B00]">95%</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-[#2E2E2E]/60">Verification Status</span>
                      <span className="flex items-center space-x-1">
                        <svg className="w-4 h-4 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/>
                        </svg>
                        <span className="font-medium text-green-600">Verified</span>
                      </span>
                    </div>
                  </div>

                  <div className="mt-6 pt-6 border-t border-[#ffeee3]">
                    <h3 className="font-semibold text-[#2E2E2E] mb-3">Preferred Project Types</h3>
                    <div className="flex flex-wrap gap-2">
                      {profile.preferences.projectTypes.map((type: string, index: number) => (
                        <span key={index} className="px-3 py-1 bg-[#ffeee3] text-[#2E2E2E] rounded-full text-sm">
                          {type}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Performance Metrics */}
                <div className="bg-white rounded-xl shadow-sm p-6 border border-[#ffeee3]">
                  <h2 className="text-xl font-bold text-[#2E2E2E] mb-6">Performance Metrics</h2>
                  <div className="space-y-4">
                    <div>
                      <div className="flex justify-between mb-2">
                        <span className="text-[#2E2E2E]/60">Project Success Rate</span>
                        <span className="font-medium text-[#2E2E2E]">{profile.stats.successRate}%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div
                          className="bg-green-500 h-2 rounded-full transition-all duration-300"
                          style={{ width: `${profile.stats.successRate}%` }}
                        ></div>
                      </div>
                    </div>
                    
                    <div>
                      <div className="flex justify-between mb-2">
                        <span className="text-[#2E2E2E]/60">On-Time Completion</span>
                        <span className="font-medium text-[#2E2E2E]">{profile.stats.onTimeCompletion}%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div
                          className="bg-blue-500 h-2 rounded-full transition-all duration-300"
                          style={{ width: `${profile.stats.onTimeCompletion}%` }}
                        ></div>
                      </div>
                    </div>

                    <div className="pt-4 border-t border-[#ffeee3]">
                      <div className="flex justify-between mb-2">
                        <span className="text-[#2E2E2E]/60">Average Project Value</span>
                        <span className="font-medium text-[#FF6B00]">${profile.stats.avgProjectValue.toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-[#2E2E2E]/60">Total Investment</span>
                        <span className="font-medium text-[#FF6B00]">${profile.stats.totalSpent.toLocaleString()}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Personal Info Tab */}
            {activeTab === 'personal' && (
              <div className="bg-white rounded-xl shadow-sm p-6 border border-[#ffeee3]">
                <h2 className="text-xl font-bold text-[#2E2E2E] mb-6">Personal Information</h2>
                <form className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-[#2E2E2E] mb-2">First Name</label>
                    <input
                      type="text"
                      value={profile.personalInfo.firstName}
                      onChange={(e) => handleFieldChange('personalInfo', 'firstName', e.target.value)}
                      disabled={!isEditing}
                      className={`w-full px-4 py-3 border border-[#ffeee3] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF6B00] focus:border-transparent ${
                        !isEditing ? 'bg-gray-50' : ''
                      }`}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-[#2E2E2E] mb-2">Last Name</label>
                    <input
                      type="text"
                      value={profile.personalInfo.lastName}
                      onChange={(e) => handleFieldChange('personalInfo', 'lastName', e.target.value)}
                      disabled={!isEditing}
                      className={`w-full px-4 py-3 border border-[#ffeee3] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF6B00] focus:border-transparent ${
                        !isEditing ? 'bg-gray-50' : ''
                      }`}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-[#2E2E2E] mb-2">Email Address</label>
                    <input
                      type="email"
                      value={profile.personalInfo.email}
                      onChange={(e) => handleFieldChange('personalInfo', 'email', e.target.value)}
                      disabled={!isEditing}
                      className={`w-full px-4 py-3 border border-[#ffeee3] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF6B00] focus:border-transparent ${
                        !isEditing ? 'bg-gray-50' : ''
                      }`}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-[#2E2E2E] mb-2">Phone Number</label>
                    <input
                      type="tel"
                      value={profile.personalInfo.phone}
                      onChange={(e) => handleFieldChange('personalInfo', 'phone', e.target.value)}
                      disabled={!isEditing}
                      className={`w-full px-4 py-3 border border-[#ffeee3] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF6B00] focus:border-transparent ${
                        !isEditing ? 'bg-gray-50' : ''
                      }`}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-[#2E2E2E] mb-2">Job Title</label>
                    <input
                      type="text"
                      value={profile.personalInfo.title}
                      onChange={(e) => handleFieldChange('personalInfo', 'title', e.target.value)}
                      disabled={!isEditing}
                      className={`w-full px-4 py-3 border border-[#ffeee3] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF6B00] focus:border-transparent ${
                        !isEditing ? 'bg-gray-50' : ''
                      }`}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-[#2E2E2E] mb-2">Website</label>
                    <input
                      type="url"
                      value={profile.personalInfo.website}
                      onChange={(e) => handleFieldChange('personalInfo', 'website', e.target.value)}
                      disabled={!isEditing}
                      className={`w-full px-4 py-3 border border-[#ffeee3] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF6B00] focus:border-transparent ${
                        !isEditing ? 'bg-gray-50' : ''
                      }`}
                    />
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-[#2E2E2E] mb-2">Location</label>
                    <input
                      type="text"
                      value={profile.personalInfo.location}
                      onChange={(e) => handleFieldChange('personalInfo', 'location', e.target.value)}
                      disabled={!isEditing}
                      className={`w-full px-4 py-3 border border-[#ffeee3] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF6B00] focus:border-transparent ${
                        !isEditing ? 'bg-gray-50' : ''
                      }`}
                    />
                  </div>
                </form>
              </div>
            )}

            {/* Business Info Tab */}
            {activeTab === 'business' && (
              <div className="bg-white rounded-xl shadow-sm p-6 border border-[#ffeee3]">
                <h2 className="text-xl font-bold text-[#2E2E2E] mb-6">Business Information</h2>
                <form className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-[#2E2E2E] mb-2">Company Name</label>
                    <input
                      type="text"
                      value={profile.businessInfo.companyName}
                      onChange={(e) => handleFieldChange('businessInfo', 'companyName', e.target.value)}
                      disabled={!isEditing}
                      className={`w-full px-4 py-3 border border-[#ffeee3] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF6B00] focus:border-transparent ${
                        !isEditing ? 'bg-gray-50' : ''
                      }`}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-[#2E2E2E] mb-2">Industry</label>
                    <input
                      type="text"
                      value={profile.businessInfo.industry}
                      onChange={(e) => handleFieldChange('businessInfo', 'industry', e.target.value)}
                      disabled={!isEditing}
                      className={`w-full px-4 py-3 border border-[#ffeee3] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF6B00] focus:border-transparent ${
                        !isEditing ? 'bg-gray-50' : ''
                      }`}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-[#2E2E2E] mb-2">Company Size</label>
                    <select
                      value={profile.businessInfo.companySize}
                      onChange={(e) => handleFieldChange('businessInfo', 'companySize', e.target.value)}
                      disabled={!isEditing}
                      className={`w-full px-4 py-3 border border-[#ffeee3] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF6B00] focus:border-transparent ${
                        !isEditing ? 'bg-gray-50' : ''
                      }`}
                    >
                      <option>1-10 employees</option>
                      <option>11-50 employees</option>
                      <option>50-100 employees</option>
                      <option>100-500 employees</option>
                      <option>500+ employees</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-[#2E2E2E] mb-2">Tax ID</label>
                    <input
                      type="text"
                      value={profile.businessInfo.taxId}
                      onChange={(e) => handleFieldChange('businessInfo', 'taxId', e.target.value)}
                      disabled={!isEditing}
                      className={`w-full px-4 py-3 border border-[#ffeee3] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF6B00] focus:border-transparent ${
                        !isEditing ? 'bg-gray-50' : ''
                      }`}
                    />
                  </div>
                  <div className="md:col-span-2">
                    <h3 className="font-semibold text-[#2E2E2E] mb-4">Business Address</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="md:col-span-2">
                        <label className="block text-sm font-medium text-[#2E2E2E] mb-2">Street Address</label>
                        <input
                          type="text"
                          value={profile.businessInfo.address.street}
                          onChange={(e) => handleFieldChange('address', 'street', e.target.value)}
                          disabled={!isEditing}
                          className={`w-full px-4 py-3 border border-[#ffeee3] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF6B00] focus:border-transparent ${
                            !isEditing ? 'bg-gray-50' : ''
                          }`}
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-[#2E2E2E] mb-2">City</label>
                        <input
                          type="text"
                          value={profile.businessInfo.address.city}
                          onChange={(e) => handleFieldChange('address', 'city', e.target.value)}
                          disabled={!isEditing}
                          className={`w-full px-4 py-3 border border-[#ffeee3] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF6B00] focus:border-transparent ${
                            !isEditing ? 'bg-gray-50' : ''
                          }`}
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-[#2E2E2E] mb-2">State</label>
                        <input
                          type="text"
                          value={profile.businessInfo.address.state}
                          onChange={(e) => handleFieldChange('address', 'state', e.target.value)}
                          disabled={!isEditing}
                          className={`w-full px-4 py-3 border border-[#ffeee3] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF6B00] focus:border-transparent ${
                            !isEditing ? 'bg-gray-50' : ''
                          }`}
                        />
                      </div>
                    </div>
                  </div>
                </form>
              </div>
            )}

            {/* Recent Projects Tab */}
            {activeTab === 'projects' && (
              <div className="bg-white rounded-xl shadow-sm border border-[#ffeee3]">
                <div className="p-6 border-b border-[#ffeee3]">
                  <h2 className="text-xl font-bold text-[#2E2E2E]">Recent Projects</h2>
                </div>
                {recentProjects.length === 0 ? (
                  <div className="p-12 text-center">
                    <svg className="w-16 h-16 mx-auto mb-4 text-[#2E2E2E]/20" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                    <h3 className="text-xl font-semibold text-[#2E2E2E] mb-2">No Projects Yet</h3>
                    <p className="text-[#2E2E2E]/60 mb-4">You haven't hired any freelancers yet. Start browsing talent to get started!</p>
                    <Link
                      to="/find-talent"
                      className="inline-block bg-[#FF6B00] hover:bg-[#FF9F45] text-white px-6 py-3 rounded-lg font-medium transition-colors"
                    >
                      Find Talent
                    </Link>
                  </div>
                ) : (
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead className="bg-[#ffeee3]/30">
                        <tr>
                          <th className="text-left p-4 font-medium text-[#2E2E2E]">Project</th>
                          <th className="text-left p-4 font-medium text-[#2E2E2E]">Freelancer</th>
                          <th className="text-left p-4 font-medium text-[#2E2E2E]">Status</th>
                          <th className="text-left p-4 font-medium text-[#2E2E2E]">Budget</th>
                          <th className="text-left p-4 font-medium text-[#2E2E2E]">Progress</th>
                          <th className="text-left p-4 font-medium text-[#2E2E2E]">Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {recentProjects.map((project) => (
                        <tr key={project.id} className="border-t border-[#ffeee3]">
                          <td className="p-4">
                            <div className="font-medium text-[#2E2E2E]">{project.title}</div>
                            <div className="text-sm text-[#2E2E2E]/60">Started: {project.startDate}</div>
                          </td>
                          <td className="p-4 text-[#2E2E2E]">{project.freelancer}</td>
                          <td className="p-4">
                            <span className={`px-2 py-1 rounded text-xs ${getStatusColor(project.status)}`}>
                              {project.status}
                            </span>
                          </td>
                          <td className="p-4 font-medium text-[#2E2E2E]">${project.budget.toLocaleString()}</td>
                          <td className="p-4">
                            <div className="flex items-center space-x-2">
                              <div className="w-20 bg-gray-200 rounded-full h-2">
                                <div
                                  className="bg-[#FF6B00] h-2 rounded-full transition-all duration-300"
                                  style={{ width: `${project.completion}%` }}
                                ></div>
                              </div>
                              <span className="text-sm text-[#2E2E2E]">{project.completion}%</span>
                            </div>
                          </td>
                          <td className="p-4">
                            <Link
                              to={`/client/job-details/${project.id}`}
                              className="text-[#FF6B00] hover:text-[#FF9F45] font-medium"
                            >
                              View Details
                            </Link>
                          </td>
                        </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
            )}

            {/* Reviews Given Tab */}
            {activeTab === 'reviews' && (
              <div className="space-y-6">
                {reviews.length === 0 ? (
                  <div className="bg-white rounded-xl shadow-sm p-12 border border-[#ffeee3] text-center">
                    <svg className="w-16 h-16 mx-auto mb-4 text-[#2E2E2E]/20" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
                    </svg>
                    <h3 className="text-xl font-semibold text-[#2E2E2E] mb-2">No Reviews Yet</h3>
                    <p className="text-[#2E2E2E]/60">You haven't given any reviews yet. Complete a project to leave a review!</p>
                  </div>
                ) : reviews.map((review) => (
                  <div key={review.id} className="bg-white rounded-xl shadow-sm p-6 border border-[#ffeee3]">
                    <div className="flex flex-col md:flex-row md:items-start justify-between mb-4">
                      <div className="mb-4 md:mb-0">
                        <h3 className="font-bold text-[#2E2E2E] mb-1">{review.project}</h3>
                        <p className="text-[#2E2E2E]/60 mb-2">Freelancer: {review.freelancer}</p>
                        <div className="flex items-center space-x-2">
                          <div className="flex">
                            {[1,2,3,4,5].map((star) => (
                              <svg
                                key={star}
                                className={`w-4 h-4 ${star <= review.rating ? 'text-yellow-400' : 'text-gray-300'}`}
                                fill="currentColor"
                                viewBox="0 0 20 20"
                              >
                                <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z"/>
                              </svg>
                            ))}
                          </div>
                          <span className="text-sm text-[#2E2E2E]/60">{review.date}</span>
                        </div>
                      </div>
                    </div>
                    <div className="p-4 bg-[#ffeee3]/30 rounded-lg">
                      <p className="text-[#2E2E2E]">{review.comment}</p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
  );
};

export default ClientProfilePage;
