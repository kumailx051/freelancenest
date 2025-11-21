import React, { useState, useEffect } from 'react';
import { 
  Camera,
  MapPin,
  Mail,
  Phone,
  Globe,
  Star,
  DollarSign,
  Edit,
  Save,
  X,
  Plus,
  Trash2,
  ExternalLink,
  Clock,
  Users,
  CheckCircle,
  Settings,
  Eye,
  Share2,
  Loader
} from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { FreelanceFirestoreService } from '../../lib/firestoreService';
import { uploadImage } from '../../lib/imageUpload';

const Profile: React.FC = () => {
  const { currentUser } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [activeTab, setActiveTab] = useState('overview');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);
  const [uploadingImage, setUploadingImage] = useState(false);
  const [newLanguage, setNewLanguage] = useState('');
  const [newSkill, setNewSkill] = useState({ name: '', level: 50, category: 'Frontend' });
  const [newEducation, setNewEducation] = useState({ degree: '', institution: '', year: '', description: '' });
  const [newCertification, setNewCertification] = useState({ name: '', issuer: '', date: '', credentialId: '', verified: false });
  const [newExperience, setNewExperience] = useState({ position: '', company: '', duration: '', description: '' });

  const [profile, setProfile] = useState({
    name: '',
    title: '',
    avatar: '',
    location: '',
    email: '',
    phone: '',
    website: '',
    timezone: '',
    bio: '',
    hourlyRate: 0,
    availability: 'Available',
    languages: [] as string[],
    responseTime: '',
    completionRate: 0
  });

  const [skills, setSkills] = useState<Array<{name: string; level: number; category: string}>>([]);

  const [certifications, setCertifications] = useState<Array<any>>([]);
  const [education, setEducation] = useState<Array<any>>([]);
  const [workExperience, setWorkExperience] = useState<Array<any>>([]);
  const [stats, setStats] = useState({
    totalEarnings: 0,
    completedProjects: 0,
    clientSatisfaction: 0,
    repeatClients: 0,
    onTimeDelivery: 0,
    avgProjectValue: 0
  });

  // Fetch user profile data from Firebase
  useEffect(() => {
    const fetchProfileData = async () => {
      if (!currentUser) {
        setError('User not authenticated');
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        const userProfile = await FreelanceFirestoreService.getUserProfile(currentUser.uid);
        
        if (userProfile && userProfile.length > 0) {
          const userData = userProfile[0];
          
          // Update profile data
          setProfile({
            name: userData.profile?.fullName || userData.firstName || currentUser.displayName || '',
            title: userData.profile?.title || userData.profileTitle || '',
            avatar: userData.profile?.profilePictureUrl || currentUser.photoURL || '',
            location: userData.profile?.location || '',
            email: userData.email || currentUser.email || '',
            phone: userData.profile?.phone || '',
            website: userData.profile?.website || '',
            timezone: userData.profile?.timezone || '',
            bio: userData.profile?.bio || userData.profile?.description || '',
            hourlyRate: userData.hourlyRate || 0,
            availability: userData.profile?.availability || 'Available',
            languages: userData.profile?.languages || [],
            responseTime: userData.profile?.responseTime || '',
            completionRate: userData.profile?.completionRate || 0
          });

          // Update skills
          if (userData.skills && Array.isArray(userData.skills)) {
            setSkills(userData.skills);
          }

          // Update certifications
          if (userData.certifications && Array.isArray(userData.certifications)) {
            setCertifications(userData.certifications);
          }

          // Update education
          if (userData.education && Array.isArray(userData.education)) {
            setEducation(userData.education);
          }

          // Update work experience
          if (userData.experience && Array.isArray(userData.experience)) {
            setWorkExperience(userData.experience);
          }

          // Update stats
          if (userData.stats) {
            setStats({
              totalEarnings: userData.stats.totalEarnings || 0,
              completedProjects: userData.stats.completedProjects || 0,
              clientSatisfaction: userData.stats.clientSatisfaction || 0,
              repeatClients: userData.stats.repeatClients || 0,
              onTimeDelivery: userData.stats.onTimeDelivery || 0,
              avgProjectValue: userData.stats.avgProjectValue || 0
            });
          }
        } else {
          // Set default values if no profile exists
          setProfile(prev => ({
            ...prev,
            name: currentUser.displayName || '',
            email: currentUser.email || '',
            avatar: currentUser.photoURL || ''
          }));
        }
      } catch (err) {
        console.error('Error fetching profile data:', err);
        setError('Failed to load profile data');
      } finally {
        setLoading(false);
      }
    };

    fetchProfileData();
  }, [currentUser]);

  const handleSaveProfile = async () => {
    if (!currentUser) return;

    try {
      setSaving(true);
      setError(null);

      const profileData = {
        profile: {
          fullName: profile.name,
          title: profile.title,
          profilePictureUrl: profile.avatar,
          location: profile.location,
          phone: profile.phone,
          website: profile.website,
          timezone: profile.timezone,
          bio: profile.bio,
          availability: profile.availability,
          languages: profile.languages,
          responseTime: profile.responseTime,
          completionRate: profile.completionRate
        },
        hourlyRate: profile.hourlyRate,
        skills: skills,
        education: education,
        experience: workExperience,
        certifications: certifications,
        stats: stats,
        updatedAt: new Date().toISOString()
      };

      await FreelanceFirestoreService.updateUserProfile(currentUser.uid, profileData);
      setIsEditing(false);
    } catch (err) {
      console.error('Error saving profile:', err);
      setError('Failed to save profile changes');
    } finally {
      setSaving(false);
    }
  };

  const handleImageUpload = async (file: File) => {
    if (!currentUser) return;

    try {
      setUploadingImage(true);
      setError(null);
      
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
      
      setProfile(prev => ({ ...prev, avatar: uploadResult.url }));
    } catch (err: any) {
      console.error('Error uploading image:', err);
      setError(err.message || 'Failed to upload image. Please try again.');
    } finally {
      setUploadingImage(false);
    }
  };

  const addLanguage = () => {
    if (newLanguage.trim() && !profile.languages.includes(newLanguage.trim())) {
      setProfile(prev => ({
        ...prev,
        languages: [...prev.languages, newLanguage.trim()]
      }));
      setNewLanguage('');
    }
  };

  const removeLanguage = (language: string) => {
    setProfile(prev => ({
      ...prev,
      languages: prev.languages.filter(lang => lang !== language)
    }));
  };

  const addSkill = () => {
    if (newSkill.name.trim()) {
      const skillExists = skills.some(skill => skill.name.toLowerCase() === newSkill.name.toLowerCase());
      if (!skillExists) {
        setSkills(prev => [...prev, { ...newSkill, name: newSkill.name.trim() }]);
        setNewSkill({ name: '', level: 50, category: 'Frontend' });
      }
    }
  };

  const removeSkill = (index: number) => {
    setSkills(prev => prev.filter((_, i) => i !== index));
  };

  const addEducation = () => {
    if (newEducation.degree.trim() && newEducation.institution.trim()) {
      setEducation(prev => [...prev, { ...newEducation, id: Date.now() }]);
      setNewEducation({ degree: '', institution: '', year: '', description: '' });
    }
  };



  const addCertification = () => {
    if (newCertification.name.trim() && newCertification.issuer.trim()) {
      setCertifications(prev => [...prev, { ...newCertification, id: Date.now() }]);
      setNewCertification({ name: '', issuer: '', date: '', credentialId: '', verified: false });
    }
  };

  const removeCertification = (id: number) => {
    setCertifications(prev => prev.filter(cert => cert.id !== id));
  };

  const addExperience = () => {
    if (newExperience.position.trim() && newExperience.company.trim()) {
      setWorkExperience(prev => [...prev, { ...newExperience, id: Date.now() }]);
      setNewExperience({ position: '', company: '', duration: '', description: '' });
    }
  };



  const getSkillColor = (category: string) => {
    switch (category) {
      case 'Frontend':
        return 'bg-blue-100 text-blue-700';
      case 'Backend':
        return 'bg-green-100 text-green-700';
      case 'Language':
        return 'bg-purple-100 text-purple-700';
      case 'Database':
        return 'bg-yellow-100 text-yellow-700';
      case 'Cloud':
        return 'bg-cyan-100 text-cyan-700';
      case 'DevOps':
        return 'bg-orange-100 text-orange-700';
      default:
        return 'bg-gray-100 text-gray-700';
    }
  };

  const tabs = [
    { id: 'overview', label: 'Overview' },
    { id: 'skills', label: 'Skills & Expertise' },
    { id: 'experience', label: 'Experience' },
    { id: 'education', label: 'Education' },
    { id: 'certifications', label: 'Certifications' }
  ];

  // Loading state
  if (loading) {
    return (
      <div className="min-h-screen bg-[#ffeee3]/30 pt-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-8">
            <div className="flex items-center justify-center">
              <Loader className="w-8 h-8 animate-spin text-[#FF6B00]" />
              <span className="ml-2 text-[#2E2E2E]/70">Loading profile...</span>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="min-h-screen bg-[#ffeee3]/30 pt-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-8">
            <div className="text-center">
              <X className="w-12 h-12 text-red-500 mx-auto mb-4" />
              <h2 className="text-xl font-semibold text-[#2E2E2E] mb-2">Error Loading Profile</h2>
              <p className="text-[#2E2E2E]/70 mb-4">{error}</p>
              <button 
                onClick={() => window.location.reload()} 
                className="bg-[#FF6B00] hover:bg-[#FF9F45] text-white px-4 py-2 rounded-lg font-medium transition-colors"
              >
                Try Again
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#ffeee3]/30 pt-20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden mb-6">
          {/* Cover Photo */}
          <div className="h-48 bg-gradient-to-r from-[#FF6B00] to-[#FF9F45] relative">
            <div className="absolute top-4 right-4 flex space-x-2 z-10">
              <button className="bg-white/20 backdrop-blur-sm text-white hover:bg-white/30 px-4 py-2 rounded-lg font-medium transition-colors flex items-center shadow-lg">
                <Eye className="w-4 h-4 mr-2" />
                Preview
              </button>
              <button className="bg-white/20 backdrop-blur-sm text-white hover:bg-white/30 px-4 py-2 rounded-lg font-medium transition-colors flex items-center shadow-lg">
                <Share2 className="w-4 h-4 mr-2" />
                Share Profile
              </button>
            </div>
          </div>

          {/* Profile Info */}
          <div className="px-6 pb-6">
            {/* Avatar Section */}
            <div className="flex justify-center lg:justify-start -mt-16 mb-6">
              <div className="relative flex-shrink-0">
                {profile.avatar ? (
                  <img
                    src={profile.avatar}
                    alt={profile.name}
                    className="w-32 h-32 rounded-xl border-4 border-white shadow-lg object-cover"
                  />
                ) : (
                  <div className="w-32 h-32 rounded-xl border-4 border-white shadow-lg bg-gray-200 flex items-center justify-center">
                    <Users className="w-12 h-12 text-gray-400" />
                  </div>
                )}
                {isEditing ? (
                  <label className="absolute bottom-2 right-2 bg-[#FF6B00] hover:bg-[#FF9F45] text-white p-2 rounded-lg shadow-lg transition-colors cursor-pointer">
                    {uploadingImage ? (
                      <div className="flex flex-col items-center">
                        <Loader className="w-4 h-4 animate-spin" />
                        <span className="text-xs mt-1">Uploading...</span>
                      </div>
                    ) : (
                      <div className="flex flex-col items-center">
                        <Camera className="w-4 h-4" />
                        <span className="text-xs mt-1">Change</span>
                      </div>
                    )}
                    <input
                      type="file"
                      accept="image/jpeg,image/jpg,image/png,image/webp"
                      onChange={(e) => {
                        const file = e.target.files?.[0];
                        if (file) {
                          // Reset any previous errors
                          setError(null);
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
                ) : (
                  <button className="absolute bottom-2 right-2 bg-[#FF6B00] hover:bg-[#FF9F45] text-white p-2 rounded-lg shadow-lg transition-colors">
                    <Camera className="w-4 h-4" />
                  </button>
                )}
              </div>
              {isEditing && (
                <div className="text-center lg:text-left mt-2 text-xs text-[#2E2E2E]/60">
                  <p>• Max size: 5MB</p>
                  <p>• Formats: JPEG, PNG, WebP</p>
                  <p>• Images uploaded via ImageBB</p>
                </div>
              )}
            </div>

            {/* Profile Content */}
            <div className="w-full">
              <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between mb-6 space-y-4 lg:space-y-0">
                <div className="text-center lg:text-left">
                  {isEditing ? (
                    <div className="space-y-2">
                      <input
                        type="text"
                        value={profile.name}
                        onChange={(e) => setProfile(prev => ({ ...prev, name: e.target.value }))}
                        className="text-3xl font-bold text-[#2E2E2E] bg-transparent border-b-2 border-gray-200 focus:border-[#FF6B00] outline-none mb-1 text-center lg:text-left w-full"
                        placeholder="Your full name"
                      />
                      <input
                        type="text"
                        value={profile.title}
                        onChange={(e) => setProfile(prev => ({ ...prev, title: e.target.value }))}
                        className="text-xl text-[#2E2E2E]/70 bg-transparent border-b-2 border-gray-200 focus:border-[#FF6B00] outline-none mb-2 text-center lg:text-left w-full"
                        placeholder="Your professional title"
                      />
                    </div>
                  ) : (
                    <div>
                      <h1 className="text-3xl font-bold text-[#2E2E2E] mb-1">{profile.name || 'Freelancer Name'}</h1>
                      <p className="text-xl text-[#2E2E2E]/70 mb-2">{profile.title || 'Professional Title'}</p>
                    </div>
                  )}
                  <div className="flex items-center justify-center lg:justify-start space-x-4 text-sm text-[#2E2E2E]/60">
                      {profile.location && (
                        <div className="flex items-center">
                          <MapPin className="w-4 h-4 mr-1" />
                          {profile.location}
                        </div>
                      )}
                      {(profile.timezone || isEditing) && (
                        <div className="flex items-center">
                          <Clock className="w-4 h-4 mr-1" />
                          {isEditing ? (
                            <select
                              value={profile.timezone}
                              onChange={(e) => setProfile(prev => ({ ...prev, timezone: e.target.value }))}
                              className="bg-transparent border-b border-gray-300 focus:border-[#FF6B00] outline-none text-sm"
                            >
                              <option value="">Select timezone</option>
                              <option value="UTC-12:00">UTC-12:00</option>
                              <option value="UTC-11:00">UTC-11:00</option>
                              <option value="UTC-10:00">UTC-10:00</option>
                              <option value="UTC-09:00">UTC-09:00</option>
                              <option value="UTC-08:00">UTC-08:00 (PST)</option>
                              <option value="UTC-07:00">UTC-07:00 (MST)</option>
                              <option value="UTC-06:00">UTC-06:00 (CST)</option>
                              <option value="UTC-05:00">UTC-05:00 (EST)</option>
                              <option value="UTC-04:00">UTC-04:00</option>
                              <option value="UTC-03:00">UTC-03:00</option>
                              <option value="UTC-02:00">UTC-02:00</option>
                              <option value="UTC-01:00">UTC-01:00</option>
                              <option value="UTC+00:00">UTC+00:00 (GMT)</option>
                              <option value="UTC+01:00">UTC+01:00 (CET)</option>
                              <option value="UTC+02:00">UTC+02:00</option>
                              <option value="UTC+03:00">UTC+03:00</option>
                              <option value="UTC+04:00">UTC+04:00</option>
                              <option value="UTC+05:00">UTC+05:00</option>
                              <option value="UTC+05:30">UTC+05:30 (IST)</option>
                              <option value="UTC+06:00">UTC+06:00</option>
                              <option value="UTC+07:00">UTC+07:00</option>
                              <option value="UTC+08:00">UTC+08:00</option>
                              <option value="UTC+09:00">UTC+09:00 (JST)</option>
                              <option value="UTC+10:00">UTC+10:00</option>
                              <option value="UTC+11:00">UTC+11:00</option>
                              <option value="UTC+12:00">UTC+12:00</option>
                            </select>
                          ) : (
                            profile.timezone
                          )}
                        </div>
                      )}
                      <div className="flex items-center">
                        <Star className="w-4 h-4 text-yellow-400 fill-current mr-1" />
                        {stats.clientSatisfaction || 0} ({stats.completedProjects || 0} reviews)
                      </div>
                    </div>
                  </div>
                  
                <div className="flex justify-center lg:justify-end space-x-3 mt-4 lg:mt-0 relative z-20 lg:flex-shrink-0">
                    <button
                      onClick={() => setIsEditing(!isEditing)}
                      className="border border-[#FF6B00] text-[#FF6B00] hover:bg-[#ffeee3] px-4 py-2 rounded-lg font-medium transition-colors flex items-center shadow-sm bg-white"
                    >
                      <Edit className="w-4 h-4 mr-2" />
                      {isEditing ? 'Cancel' : 'Edit Profile'}
                    </button>
                    <button className="bg-[#FF6B00] hover:bg-[#FF9F45] text-white px-4 py-2 rounded-lg font-medium transition-colors flex items-center shadow-sm">
                      <Settings className="w-4 h-4 mr-2" />
                      Settings
                    </button>
                  </div>
              </div>

              {/* Quick Stats */}
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mt-6">
                  <div className="bg-[#ffeee3] p-3 rounded-lg text-center">
                    {isEditing ? (
                      <div className="flex items-center space-x-1">
                        <span className="text-xl font-bold text-[#2E2E2E]">$</span>
                        <input
                          type="number"
                          value={profile.hourlyRate || 0}
                          onChange={(e) => setProfile(prev => ({ ...prev, hourlyRate: parseInt(e.target.value) || 0 }))}
                          className="text-xl font-bold text-[#2E2E2E] bg-transparent border-b border-gray-300 focus:border-[#FF6B00] outline-none w-20"
                          min="0"
                          max="1000"
                        />
                      </div>
                    ) : (
                      <div className="text-xl font-bold text-[#2E2E2E]">${profile.hourlyRate || 0}</div>
                    )}
                    <div className="text-sm text-[#2E2E2E]/60">Hourly Rate</div>
                  </div>
                  <div className="bg-green-50 p-3 rounded-lg text-center">
                    <div className="text-xl font-bold text-[#2E2E2E]">{profile.completionRate}%</div>
                    <div className="text-sm text-[#2E2E2E]/60">Job Success</div>
                  </div>
                  <div className="bg-blue-50 p-3 rounded-lg text-center">
                    <div className="text-xl font-bold text-[#2E2E2E]">{stats.completedProjects}</div>
                    <div className="text-sm text-[#2E2E2E]/60">Projects</div>
                  </div>
                  <div className="bg-purple-50 p-3 rounded-lg text-center">
                    <div className="text-xl font-bold text-[#2E2E2E]">{profile.responseTime}</div>
                    <div className="text-sm text-[#2E2E2E]/60">Response Time</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="border-b border-gray-200">
            <nav className="flex space-x-8 px-6">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                    activeTab === tab.id
                      ? 'border-[#FF6B00] text-[#FF6B00]'
                      : 'border-transparent text-[#2E2E2E]/60 hover:text-[#2E2E2E] hover:border-gray-300'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </nav>
          </div>

          <div className="p-6">
            {/* Overview Tab */}
            {activeTab === 'overview' && (
              <div className="space-y-6">
                {/* Bio */}
                <div>
                  <h3 className="text-lg font-semibold text-[#2E2E2E] mb-3">About Me</h3>
                  {isEditing ? (
                    <textarea
                      value={profile.bio}
                      onChange={(e) => setProfile(prev => ({ ...prev, bio: e.target.value }))}
                      className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#FF6B00] focus:border-transparent resize-none"
                      rows={4}
                    />
                  ) : (
                    <p className="text-[#2E2E2E]/70 leading-relaxed">
                      {profile.bio || 'No bio available. Add your professional summary to help clients understand your expertise and experience.'}
                    </p>
                  )}
                </div>

                {/* Contact Info */}
                <div>
                  <h3 className="text-lg font-semibold text-[#2E2E2E] mb-3">Contact Information</h3>
                  {isEditing ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-[#2E2E2E] mb-2">Email</label>
                        <div className="w-full border border-gray-200 bg-gray-50 rounded-lg px-4 py-3 text-[#2E2E2E]/60">
                          {profile.email}
                          <span className="ml-2 text-xs text-[#2E2E2E]/40">(Cannot be changed)</span>
                        </div>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-[#2E2E2E] mb-2">Phone</label>
                        <input
                          type="tel"
                          value={profile.phone}
                          onChange={(e) => setProfile(prev => ({ ...prev, phone: e.target.value }))}
                          className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#FF6B00] focus:border-transparent"
                          placeholder="+1 (555) 123-4567"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-[#2E2E2E] mb-2">Website</label>
                        <input
                          type="url"
                          value={profile.website}
                          onChange={(e) => setProfile(prev => ({ ...prev, website: e.target.value }))}
                          className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#FF6B00] focus:border-transparent"
                          placeholder="https://yourwebsite.com"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-[#2E2E2E] mb-2">Location</label>
                        <div className="w-full border border-gray-200 bg-gray-50 rounded-lg px-4 py-3 text-[#2E2E2E]/60">
                          {profile.location || 'No location set'}
                          <span className="ml-2 text-xs text-[#2E2E2E]/40">(Set during registration)</span>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                        <Mail className="w-5 h-5 text-[#FF6B00]" />
                        <span className="text-[#2E2E2E]">{profile.email || 'No email provided'}</span>
                      </div>
                      <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                        <Phone className="w-5 h-5 text-[#FF6B00]" />
                        <span className="text-[#2E2E2E]">{profile.phone || 'No phone provided'}</span>
                      </div>
                      <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                        <Globe className="w-5 h-5 text-[#FF6B00]" />
                        <span className="text-[#2E2E2E]">{profile.website || 'No website provided'}</span>
                      </div>
                      <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                        <MapPin className="w-5 h-5 text-[#FF6B00]" />
                        <span className="text-[#2E2E2E]">{profile.location || 'No location provided'}</span>
                      </div>
                    </div>
                  )}
                </div>

                {/* Languages */}
                <div>
                  <div className="flex justify-between items-center mb-3">
                    <h3 className="text-lg font-semibold text-[#2E2E2E]">Languages</h3>
                    {isEditing && (
                      <div className="flex space-x-2">
                        <input
                          type="text"
                          value={newLanguage}
                          onChange={(e) => setNewLanguage(e.target.value)}
                          placeholder="Add language"
                          className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#FF6B00] focus:border-transparent"
                          onKeyPress={(e) => e.key === 'Enter' && addLanguage()}
                        />
                        <button
                          onClick={addLanguage}
                          className="bg-[#FF6B00] hover:bg-[#FF9F45] text-white px-3 py-2 rounded-lg text-sm font-medium transition-colors flex items-center"
                        >
                          <Plus className="w-4 h-4" />
                        </button>
                      </div>
                    )}
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {profile.languages.length > 0 ? profile.languages.map((language, index) => (
                      <div key={index} className="flex items-center space-x-2 bg-[#ffeee3] text-[#FF6B00] px-3 py-1 rounded-full text-sm font-medium">
                        <span>{language}</span>
                        {isEditing && (
                          <button
                            onClick={() => removeLanguage(language)}
                            className="text-[#FF6B00] hover:text-red-600 transition-colors"
                          >
                            <X className="w-3 h-3" />
                          </button>
                        )}
                      </div>
                    )) : (
                      <p className="text-[#2E2E2E]/60">No languages specified</p>
                    )}
                  </div>
                </div>

                {/* Performance Stats */}
                <div>
                  <h3 className="text-lg font-semibold text-[#2E2E2E] mb-3">Performance</h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="bg-[#ffeee3] p-4 rounded-lg">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm font-medium text-[#2E2E2E]/70">Total Earnings</span>
                        <DollarSign className="w-4 h-4 text-[#FF6B00]" />
                      </div>
                      <p className="text-2xl font-bold text-[#2E2E2E]">${stats.totalEarnings.toLocaleString()}</p>
                    </div>
                    
                    <div className="bg-green-50 p-4 rounded-lg">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm font-medium text-[#2E2E2E]/70">On-Time Delivery</span>
                        <CheckCircle className="w-4 h-4 text-green-600" />
                      </div>
                      <p className="text-2xl font-bold text-[#2E2E2E]">{stats.onTimeDelivery}%</p>
                    </div>
                    
                    <div className="bg-blue-50 p-4 rounded-lg">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm font-medium text-[#2E2E2E]/70">Repeat Clients</span>
                        <Users className="w-4 h-4 text-blue-600" />
                      </div>
                      <p className="text-2xl font-bold text-[#2E2E2E]">{stats.repeatClients}%</p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Skills Tab */}
            {activeTab === 'skills' && (
              <div className="space-y-6">
                <div className="flex justify-between items-center">
                  <h3 className="text-lg font-semibold text-[#2E2E2E]">Skills & Expertise</h3>
                </div>

                {isEditing && (
                  <div className="bg-gray-50 p-4 rounded-lg mb-4">
                    <h4 className="font-medium text-[#2E2E2E] mb-3">Add New Skill</h4>
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
                      <input
                        type="text"
                        value={newSkill.name}
                        onChange={(e) => setNewSkill(prev => ({ ...prev, name: e.target.value }))}
                        placeholder="Skill name"
                        className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#FF6B00] focus:border-transparent"
                      />
                      <select
                        value={newSkill.category}
                        onChange={(e) => setNewSkill(prev => ({ ...prev, category: e.target.value }))}
                        className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#FF6B00] focus:border-transparent"
                      >
                        <option value="Frontend">Frontend</option>
                        <option value="Backend">Backend</option>
                        <option value="Language">Language</option>
                        <option value="Database">Database</option>
                        <option value="Cloud">Cloud</option>
                        <option value="DevOps">DevOps</option>
                      </select>
                      <div className="flex items-center space-x-2">
                        <input
                          type="range"
                          min="1"
                          max="100"
                          value={newSkill.level}
                          onChange={(e) => setNewSkill(prev => ({ ...prev, level: parseInt(e.target.value) }))}
                          className="flex-1"
                        />
                        <span className="text-sm font-medium text-[#2E2E2E] w-10">{newSkill.level}%</span>
                      </div>
                      <button
                        onClick={addSkill}
                        className="bg-[#FF6B00] hover:bg-[#FF9F45] text-white px-4 py-2 rounded-lg font-medium transition-colors flex items-center justify-center"
                      >
                        <Plus className="w-4 h-4 mr-2" />
                        Add
                      </button>
                    </div>
                  </div>
                )}

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {skills.length > 0 ? (
                    skills.map((skill, index) => (
                      <div key={index} className="p-4 border border-gray-200 rounded-lg">
                        <div className="flex justify-between items-center mb-2">
                          <div className="flex items-center space-x-3">
                            <span className="font-medium text-[#2E2E2E]">{skill.name}</span>
                            <span className={`px-2 py-1 rounded-full text-xs font-medium ${getSkillColor(skill.category)}`}>
                              {skill.category}
                            </span>
                          </div>
                          <div className="flex items-center space-x-2">
                            <span className="text-sm font-medium text-[#2E2E2E]">{skill.level}%</span>
                            {isEditing && (
                              <button
                                onClick={() => removeSkill(index)}
                                className="p-1 text-red-600 hover:bg-red-50 rounded transition-colors"
                              >
                                <Trash2 className="w-4 h-4" />
                              </button>
                            )}
                          </div>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div 
                            className="bg-gradient-to-r from-[#FF6B00] to-[#FF9F45] h-2 rounded-full transition-all duration-500"
                            style={{ width: `${skill.level}%` }}
                          ></div>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="col-span-2 text-center py-8">
                      <p className="text-[#2E2E2E]/60">No skills added yet. Add your skills to showcase your expertise to potential clients.</p>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Experience Tab */}
            {activeTab === 'experience' && (
              <div className="space-y-6">
                <div className="flex justify-between items-center">
                  <h3 className="text-lg font-semibold text-[#2E2E2E]">Work Experience</h3>
                </div>

                {isEditing && (
                  <div className="bg-gray-50 p-4 rounded-lg mb-4">
                    <h4 className="font-medium text-[#2E2E2E] mb-3">Add New Experience</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-3">
                      <input
                        type="text"
                        value={newExperience.position}
                        onChange={(e) => setNewExperience(prev => ({ ...prev, position: e.target.value }))}
                        placeholder="Position title"
                        className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#FF6B00] focus:border-transparent"
                      />
                      <input
                        type="text"
                        value={newExperience.company}
                        onChange={(e) => setNewExperience(prev => ({ ...prev, company: e.target.value }))}
                        placeholder="Company name"
                        className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#FF6B00] focus:border-transparent"
                      />
                      <input
                        type="text"
                        value={newExperience.duration}
                        onChange={(e) => setNewExperience(prev => ({ ...prev, duration: e.target.value }))}
                        placeholder="Duration (e.g., 2020 - Present)"
                        className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#FF6B00] focus:border-transparent"
                      />
                      <button
                        onClick={addExperience}
                        className="bg-[#FF6B00] hover:bg-[#FF9F45] text-white px-4 py-2 rounded-lg font-medium transition-colors flex items-center justify-center"
                      >
                        <Plus className="w-4 h-4 mr-2" />
                        Add Experience
                      </button>
                    </div>
                    <textarea
                      value={newExperience.description}
                      onChange={(e) => setNewExperience(prev => ({ ...prev, description: e.target.value }))}
                      placeholder="Description of your role and achievements"
                      className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#FF6B00] focus:border-transparent resize-none"
                      rows={3}
                    />
                  </div>
                )}

                <div className="space-y-4">
                  {workExperience.length > 0 ? workExperience.map((exp) => (
                    <div key={exp.id} className="border border-gray-200 rounded-lg p-6">
                      <div className="flex justify-between items-start mb-3">
                        <div>
                          <h4 className="text-lg font-semibold text-[#2E2E2E]">{exp.position}</h4>
                          <p className="text-[#FF6B00] font-medium">{exp.company}</p>
                          <p className="text-sm text-[#2E2E2E]/60">{exp.duration}</p>
                        </div>
                        {isEditing && (
                          <div className="flex space-x-2">
                            <button className="p-2 text-[#2E2E2E]/60 hover:text-[#FF6B00] hover:bg-[#ffeee3] rounded-lg transition-colors">
                              <Edit className="w-4 h-4" />
                            </button>
                            <button className="p-2 text-[#2E2E2E]/60 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors">
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        )}
                      </div>
                      <p className="text-[#2E2E2E]/70">{exp.description}</p>
                    </div>
                  )) : (
                    <div className="text-center py-8">
                      <p className="text-[#2E2E2E]/60">No work experience added yet. Add your professional experience to showcase your background.</p>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Education Tab */}
            {activeTab === 'education' && (
              <div className="space-y-6">
                <div className="flex justify-between items-center">
                  <h3 className="text-lg font-semibold text-[#2E2E2E]">Education</h3>
                </div>

                {isEditing && (
                  <div className="bg-gray-50 p-4 rounded-lg mb-4">
                    <h4 className="font-medium text-[#2E2E2E] mb-3">Add New Education</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-3">
                      <input
                        type="text"
                        value={newEducation.degree}
                        onChange={(e) => setNewEducation(prev => ({ ...prev, degree: e.target.value }))}
                        placeholder="Degree/Certification"
                        className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#FF6B00] focus:border-transparent"
                      />
                      <input
                        type="text"
                        value={newEducation.institution}
                        onChange={(e) => setNewEducation(prev => ({ ...prev, institution: e.target.value }))}
                        placeholder="Institution name"
                        className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#FF6B00] focus:border-transparent"
                      />
                      <input
                        type="text"
                        value={newEducation.year}
                        onChange={(e) => setNewEducation(prev => ({ ...prev, year: e.target.value }))}
                        placeholder="Year (e.g., 2015-2019)"
                        className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#FF6B00] focus:border-transparent"
                      />
                      <button
                        onClick={addEducation}
                        className="bg-[#FF6B00] hover:bg-[#FF9F45] text-white px-4 py-2 rounded-lg font-medium transition-colors flex items-center justify-center"
                      >
                        <Plus className="w-4 h-4 mr-2" />
                        Add Education
                      </button>
                    </div>
                    <textarea
                      value={newEducation.description}
                      onChange={(e) => setNewEducation(prev => ({ ...prev, description: e.target.value }))}
                      placeholder="Description of your studies or achievements"
                      className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#FF6B00] focus:border-transparent resize-none"
                      rows={3}
                    />
                  </div>
                )}

                <div className="space-y-4">
                  {education.length > 0 ? education.map((edu) => (
                    <div key={edu.id} className="border border-gray-200 rounded-lg p-6">
                      <div className="flex justify-between items-start mb-3">
                        <div>
                          <h4 className="text-lg font-semibold text-[#2E2E2E]">{edu.degree}</h4>
                          <p className="text-[#FF6B00] font-medium">{edu.institution}</p>
                          <p className="text-sm text-[#2E2E2E]/60">{edu.year}</p>
                        </div>
                        {isEditing && (
                          <div className="flex space-x-2">
                            <button className="p-2 text-[#2E2E2E]/60 hover:text-[#FF6B00] hover:bg-[#ffeee3] rounded-lg transition-colors">
                              <Edit className="w-4 h-4" />
                            </button>
                            <button className="p-2 text-[#2E2E2E]/60 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors">
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        )}
                      </div>
                      <p className="text-[#2E2E2E]/70">{edu.description}</p>
                    </div>
                  )) : (
                    <div className="text-center py-8">
                      <p className="text-[#2E2E2E]/60">No education information added yet. Add your educational background to strengthen your profile.</p>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Certifications Tab */}
            {activeTab === 'certifications' && (
              <div className="space-y-6">
                <div className="flex justify-between items-center">
                  <h3 className="text-lg font-semibold text-[#2E2E2E]">Certifications</h3>
                </div>

                {isEditing && (
                  <div className="bg-gray-50 p-4 rounded-lg mb-4">
                    <h4 className="font-medium text-[#2E2E2E] mb-3">Add New Certification</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      <input
                        type="text"
                        value={newCertification.name}
                        onChange={(e) => setNewCertification(prev => ({ ...prev, name: e.target.value }))}
                        placeholder="Certification name"
                        className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#FF6B00] focus:border-transparent"
                      />
                      <input
                        type="text"
                        value={newCertification.issuer}
                        onChange={(e) => setNewCertification(prev => ({ ...prev, issuer: e.target.value }))}
                        placeholder="Issuing organization"
                        className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#FF6B00] focus:border-transparent"
                      />
                      <input
                        type="date"
                        value={newCertification.date}
                        onChange={(e) => setNewCertification(prev => ({ ...prev, date: e.target.value }))}
                        className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#FF6B00] focus:border-transparent"
                      />
                      <input
                        type="text"
                        value={newCertification.credentialId}
                        onChange={(e) => setNewCertification(prev => ({ ...prev, credentialId: e.target.value }))}
                        placeholder="Credential ID (optional)"
                        className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#FF6B00] focus:border-transparent"
                      />
                      <div className="flex items-center space-x-3">
                        <input
                          type="checkbox"
                          id="verified"
                          checked={newCertification.verified}
                          onChange={(e) => setNewCertification(prev => ({ ...prev, verified: e.target.checked }))}
                          className="rounded border-gray-300 text-[#FF6B00] focus:ring-[#FF6B00]"
                        />
                        <label htmlFor="verified" className="text-sm text-[#2E2E2E]">Verified certification</label>
                      </div>
                      <button
                        onClick={addCertification}
                        className="bg-[#FF6B00] hover:bg-[#FF9F45] text-white px-4 py-2 rounded-lg font-medium transition-colors flex items-center justify-center"
                      >
                        <Plus className="w-4 h-4 mr-2" />
                        Add Certification
                      </button>
                    </div>
                  </div>
                )}

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {certifications.length > 0 ? certifications.map((cert) => (
                    <div key={cert.id} className="border border-gray-200 rounded-lg p-6">
                      <div className="flex justify-between items-start mb-3">
                        <div className="flex-1">
                          <div className="flex items-center space-x-2 mb-2">
                            <h4 className="font-semibold text-[#2E2E2E]">{cert.name}</h4>
                            {cert.verified && (
                              <CheckCircle className="w-4 h-4 text-green-600" />
                            )}
                          </div>
                          <p className="text-[#FF6B00] font-medium mb-1">{cert.issuer}</p>
                          <p className="text-sm text-[#2E2E2E]/60 mb-1">Issued: {cert.date}</p>
                          <p className="text-xs text-[#2E2E2E]/50">ID: {cert.credentialId}</p>
                        </div>
                        <div className="flex space-x-2">
                          <button className="p-2 text-[#2E2E2E]/60 hover:text-[#FF6B00] hover:bg-[#ffeee3] rounded-lg transition-colors">
                            <ExternalLink className="w-4 h-4" />
                          </button>
                          {isEditing && (
                            <>
                              <button className="p-2 text-[#2E2E2E]/60 hover:text-[#FF6B00] hover:bg-[#ffeee3] rounded-lg transition-colors">
                                <Edit className="w-4 h-4" />
                              </button>
                              <button 
                                onClick={() => removeCertification(cert.id)}
                                className="p-2 text-[#2E2E2E]/60 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                              >
                                <Trash2 className="w-4 h-4" />
                              </button>
                            </>
                          )}
                        </div>
                      </div>
                    </div>
                  )) : (
                    <div className="col-span-2 text-center py-8">
                      <p className="text-[#2E2E2E]/60">No certifications added yet. Add your professional certifications to enhance your credibility.</p>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Save Button when editing */}
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
                  onClick={handleSaveProfile}
                  disabled={saving}
                  className="bg-[#FF6B00] hover:bg-[#FF9F45] text-white px-6 py-2 rounded-lg font-medium transition-colors flex items-center disabled:opacity-50"
                >
                  {saving ? (
                    <Loader className="w-4 h-4 mr-2 animate-spin" />
                  ) : (
                    <Save className="w-4 h-4 mr-2" />
                  )}
                  {saving ? 'Saving to Firebase...' : 'Save Changes'}
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
