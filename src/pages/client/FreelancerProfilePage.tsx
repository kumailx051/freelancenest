import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { 
  Star, 
  MapPin, 
  Calendar, 
  Clock, 
  ArrowLeft,
  ExternalLink,
  CheckCircle
} from 'lucide-react';
import { FreelanceFirestoreService } from '../../lib/firestoreService';

interface FreelancerProfile {
  id: string;
  uid: string;
  firstName: string;
  lastName: string;
  displayName: string;
  email: string;
  profilePictureUrl?: string;
  bio?: string;
  location?: string;
  hourlyRate?: number;
  profileTitle?: string;
  profileStep?: string;
  skills?: Array<{
    name: string;
    level: number;
    levelLabel: string;
  }>;
  skillCategories?: Array<{
    id: string;
    name: string;
    selectedSkills: number;
    skills: Array<{
      name: string;
      level: number;
      levelLabel: string;
    }>;
  }>;
  education?: Array<{
    degree: string;
    school: string;
    fieldOfStudy: string;
    graduationYear: string;
  }>;
  experience?: Array<{
    company: string;
    title: string;
    description: string;
    from: string;
    to: string;
    current: boolean;
    location: string;
  }>;
  portfolio?: Array<{
    id: string;
    title: string;
    description: string;
    category: string;
    images: Array<{ id: string; url: string }>;
    link?: string;
  }>;
  createdAt: any;
  updatedAt: any;
  emailVerified?: boolean;
  profileCompleted?: boolean;
  termsAccepted?: boolean;
  marketingOptIn?: boolean;
}

const FreelancerProfilePage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [freelancer, setFreelancer] = useState<FreelancerProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [activeTab, setActiveTab] = useState('overview');

  // Mock data for demonstration (in real app, fetch from reviews/ratings service)
  const [mockStats] = useState({
    rating: 4.8,
    reviewCount: 53,
    completedProjects: 42,
    responseTime: '2 hours',
    successRate: 98,
    repeatClients: 85
  });

  useEffect(() => {
    const loadFreelancerProfile = async () => {
      if (!id) {
        setError('No freelancer ID provided');
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        setError('');

        // Try to get user by document ID first
        let freelancerData = await FreelanceFirestoreService.get('users', id);
        
        // If not found by document ID, try to find by UID
        if (!freelancerData) {
          const users = await FreelanceFirestoreService.getWhere('users', 'uid', '==', id);
          if (users.length > 0) {
            freelancerData = users[0];
          }
        }

        if (!freelancerData) {
          setError('Freelancer not found');
          setLoading(false);
          return;
        }

        // Ensure the user is a freelancer
        if (freelancerData.accountType !== 'freelancer') {
          setError('User is not a freelancer');
          setLoading(false);
          return;
        }

        setFreelancer(freelancerData as FreelancerProfile);
      } catch (err) {
        console.error('Error loading freelancer profile:', err);
        setError('Failed to load freelancer profile. Please try again.');
      } finally {
        setLoading(false);
      }
    };

    loadFreelancerProfile();
  }, [id]);

  const getDisplayName = (freelancer: FreelancerProfile) => {
    if (freelancer.displayName) return freelancer.displayName;
    if (freelancer.firstName && freelancer.lastName) {
      return `${freelancer.firstName} ${freelancer.lastName}`;
    }
    return freelancer.firstName || 'Freelancer';
  };

  const renderStars = (rating: number) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;

    for (let i = 0; i < fullStars; i++) {
      stars.push(<Star key={i} size={16} className="fill-yellow-400 text-yellow-400" />);
    }
    
    if (hasHalfStar) {
      stars.push(<Star key="half" size={16} className="fill-yellow-400 text-yellow-400" style={{ clipPath: 'inset(0 50% 0 0)' }} />);
    }
    
    const emptyStars = 5 - Math.ceil(rating);
    for (let i = 0; i < emptyStars; i++) {
      stars.push(<Star key={`empty-${i}`} size={16} className="text-gray-300" />);
    }

    return stars;
  };

  const formatDate = (dateValue: any) => {
    if (!dateValue) return '';
    
    try {
      const date = dateValue.toDate ? dateValue.toDate() : new Date(dateValue);
      return date.toLocaleDateString('en-US', { 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric' 
      });
    } catch (error) {
      return '';
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#ffeee3] p-6">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center justify-center min-h-[400px]">
            <div className="text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#FF6B00] mx-auto mb-4"></div>
              <p className="text-[#2E2E2E]">Loading freelancer profile...</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error || !freelancer) {
    return (
      <div className="min-h-screen bg-[#ffeee3] p-6">
        <div className="max-w-6xl mx-auto">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center text-[#FF6B00] hover:underline mb-6"
          >
            <ArrowLeft size={20} className="mr-2" />
            Back to Browse
          </button>
          <div className="text-center py-12">
            <p className="text-red-600 mb-4">{error}</p>
            <button 
              onClick={() => navigate('/client/browse-freelancers')} 
              className="bg-[#FF6B00] text-white px-6 py-2 rounded-lg hover:bg-[#FF9F45] transition-colors"
            >
              Browse Freelancers
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#ffeee3]">
      <div className="max-w-6xl mx-auto p-6">
        {/* Back Button */}
        <button
          onClick={() => navigate(-1)}
          className="flex items-center text-[#FF6B00] hover:underline mb-6"
        >
          <ArrowLeft size={20} className="mr-2" />
          Back to Browse
        </button>

        {/* Profile Header */}
        <div className="bg-white rounded-lg shadow-sm p-8 mb-6">
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Profile Picture and Basic Info */}
            <div className="flex flex-col items-center lg:items-start">
              <div className="w-32 h-32 rounded-full bg-[#ffeee3] flex items-center justify-center overflow-hidden mb-4">
                {freelancer.profilePictureUrl ? (
                  <img
                    src={freelancer.profilePictureUrl}
                    alt={getDisplayName(freelancer)}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <span className="text-[#FF6B00] text-4xl font-semibold">
                    {getDisplayName(freelancer).charAt(0).toUpperCase()}
                  </span>
                )}
              </div>
              
              {freelancer.emailVerified && (
                <div className="flex items-center text-green-600 text-sm mb-2">
                  <CheckCircle size={16} className="mr-1" />
                  Verified Profile
                </div>
              )}

              <div className="text-center lg:text-left">
                <h1 className="text-2xl font-bold text-[#2E2E2E] mb-2">
                  {getDisplayName(freelancer)}
                </h1>
                <p className="text-lg text-[#2E2E2E] opacity-80 mb-2">
                  {freelancer.profileTitle || 'Professional Freelancer'}
                </p>
                {freelancer.location && (
                  <div className="flex items-center justify-center lg:justify-start text-[#2E2E2E] opacity-60 mb-4">
                    <MapPin size={16} className="mr-1" />
                    {freelancer.location}
                  </div>
                )}
                
                {/* Rating */}
                <div className="flex items-center justify-center lg:justify-start gap-2 mb-4">
                  <div className="flex items-center gap-1">
                    {renderStars(mockStats.rating)}
                  </div>
                  <span className="font-semibold text-[#2E2E2E]">{mockStats.rating}</span>
                  <span className="text-[#2E2E2E] opacity-60">({mockStats.reviewCount} reviews)</span>
                </div>

                {/* Hourly Rate */}
                <div className="text-2xl font-bold text-[#FF6B00] mb-4">
                  ${freelancer.hourlyRate || 50}/hr
                </div>
              </div>
            </div>

            {/* Stats and Actions */}
            <div className="flex-1">
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-6">
                <div className="text-center p-4 bg-[#ffeee3] rounded-lg">
                  <div className="text-2xl font-bold text-[#2E2E2E]">{mockStats.completedProjects}</div>
                  <div className="text-sm text-[#2E2E2E] opacity-70">Projects Completed</div>
                </div>
                <div className="text-center p-4 bg-[#ffeee3] rounded-lg">
                  <div className="text-2xl font-bold text-[#2E2E2E]">{mockStats.successRate}%</div>
                  <div className="text-sm text-[#2E2E2E] opacity-70">Success Rate</div>
                </div>
                <div className="text-center p-4 bg-[#ffeee3] rounded-lg">
                  <div className="text-2xl font-bold text-[#2E2E2E]">{mockStats.responseTime}</div>
                  <div className="text-sm text-[#2E2E2E] opacity-70">Response Time</div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-4">
                <button className="flex-1 bg-[#FF6B00] hover:bg-[#FF9F45] text-white px-6 py-3 rounded-lg font-semibold transition-colors">
                  Contact Freelancer
                </button>
                <button className="flex-1 border border-[#FF6B00] text-[#FF6B00] hover:bg-[#FF6B00] hover:text-white px-6 py-3 rounded-lg font-semibold transition-colors">
                  Invite to Job
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="bg-white rounded-lg shadow-sm mb-6">
          <div className="border-b border-gray-200">
            <nav className="flex space-x-8 px-8">
              {[
                { id: 'overview', label: 'Overview' },
                { id: 'portfolio', label: 'Portfolio' },
                { id: 'experience', label: 'Experience' },
                { id: 'skills', label: 'Skills' }
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                    activeTab === tab.id
                      ? 'border-[#FF6B00] text-[#FF6B00]'
                      : 'border-transparent text-gray-500 hover:text-gray-700'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </nav>
          </div>

          <div className="p-8">
            {/* Overview Tab */}
            {activeTab === 'overview' && (
              <div className="space-y-6">
                {/* Bio */}
                {freelancer.bio && (
                  <div>
                    <h3 className="text-lg font-semibold text-[#2E2E2E] mb-3">About</h3>
                    <p className="text-[#2E2E2E] opacity-80 leading-relaxed">{freelancer.bio}</p>
                  </div>
                )}

                {/* Education */}
                {freelancer.education && freelancer.education.length > 0 && (
                  <div>
                    <h3 className="text-lg font-semibold text-[#2E2E2E] mb-3">Education</h3>
                    <div className="space-y-4">
                      {freelancer.education.map((edu, index) => (
                        <div key={index} className="border-l-2 border-[#FF6B00] pl-4">
                          <h4 className="font-semibold text-[#2E2E2E]">{edu.degree}</h4>
                          <p className="text-[#2E2E2E] opacity-80">{edu.school}</p>
                          <p className="text-sm text-[#2E2E2E] opacity-60">
                            {edu.fieldOfStudy} • Class of {edu.graduationYear}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Basic Info */}
                <div>
                  <h3 className="text-lg font-semibold text-[#2E2E2E] mb-3">Profile Information</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="flex items-center gap-3">
                      <Calendar size={16} className="text-[#FF6B00]" />
                      <span className="text-[#2E2E2E] opacity-80">
                        Member since {formatDate(freelancer.createdAt)}
                      </span>
                    </div>
                    <div className="flex items-center gap-3">
                      <Clock size={16} className="text-[#FF6B00]" />
                      <span className="text-[#2E2E2E] opacity-80">
                        Last active {formatDate(freelancer.updatedAt)}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Portfolio Tab */}
            {activeTab === 'portfolio' && (
              <div>
                <h3 className="text-lg font-semibold text-[#2E2E2E] mb-6">Portfolio</h3>
                {freelancer.portfolio && freelancer.portfolio.length > 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {freelancer.portfolio.map((item) => (
                      <div key={item.id} className="border border-gray-200 rounded-lg overflow-hidden">
                        {item.images.length > 0 && (
                          <img
                            src={item.images[0].url}
                            alt={item.title}
                            className="w-full h-48 object-cover"
                          />
                        )}
                        <div className="p-4">
                          <h4 className="font-semibold text-[#2E2E2E] mb-2">{item.title}</h4>
                          <p className="text-sm text-[#2E2E2E] opacity-70 mb-3 line-clamp-3">
                            {item.description}
                          </p>
                          <div className="flex items-center justify-between">
                            <span className="text-xs bg-[#ffeee3] text-[#2E2E2E] px-2 py-1 rounded-full">
                              {item.category}
                            </span>
                            {item.link && (
                              <a
                                href={item.link}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-[#FF6B00] hover:underline text-sm flex items-center"
                              >
                                View <ExternalLink size={12} className="ml-1" />
                              </a>
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-[#2E2E2E] opacity-60">No portfolio items available.</p>
                )}
              </div>
            )}

            {/* Experience Tab */}
            {activeTab === 'experience' && (
              <div>
                <h3 className="text-lg font-semibold text-[#2E2E2E] mb-6">Work Experience</h3>
                {freelancer.experience && freelancer.experience.length > 0 ? (
                  <div className="space-y-6">
                    {freelancer.experience.map((exp, index) => (
                      <div key={index} className="border-l-2 border-[#FF6B00] pl-6">
                        <h4 className="font-semibold text-[#2E2E2E] text-lg">{exp.title}</h4>
                        <p className="text-[#FF6B00] font-medium mb-2">{exp.company}</p>
                        <p className="text-sm text-[#2E2E2E] opacity-60 mb-3">
                          {exp.from} - {exp.current ? 'Present' : exp.to} • {exp.location}
                        </p>
                        <p className="text-[#2E2E2E] opacity-80">{exp.description}</p>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-[#2E2E2E] opacity-60">No work experience listed.</p>
                )}
              </div>
            )}

            {/* Skills Tab */}
            {activeTab === 'skills' && (
              <div>
                <h3 className="text-lg font-semibold text-[#2E2E2E] mb-6">Skills & Expertise</h3>
                {freelancer.skills && freelancer.skills.length > 0 ? (
                  <div className="space-y-6">
                    {freelancer.skillCategories && freelancer.skillCategories.length > 0 ? (
                      freelancer.skillCategories.map((category) => (
                        <div key={category.id}>
                          <h4 className="font-medium text-[#2E2E2E] mb-3">{category.name}</h4>
                          <div className="space-y-3">
                            {category.skills.map((skill, index) => (
                              <div key={index} className="flex items-center justify-between">
                                <span className="text-[#2E2E2E]">{skill.name}</span>
                                <div className="flex items-center gap-2">
                                  <span className="text-sm text-[#2E2E2E] opacity-70">
                                    {skill.levelLabel}
                                  </span>
                                  <div className="w-20 h-2 bg-gray-200 rounded-full overflow-hidden">
                                    <div
                                      className="h-full bg-[#FF6B00] transition-all duration-300"
                                      style={{ width: `${(skill.level / 5) * 100}%` }}
                                    />
                                  </div>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      ))
                    ) : (
                      <div className="flex flex-wrap gap-2">
                        {freelancer.skills.map((skill, index) => (
                          <div key={index} className="flex items-center justify-between bg-[#ffeee3] px-3 py-2 rounded-lg">
                            <span className="text-[#2E2E2E] mr-3">{skill.name}</span>
                            <span className="text-sm text-[#2E2E2E] opacity-70">
                              {skill.levelLabel}
                            </span>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                ) : (
                  <p className="text-[#2E2E2E] opacity-60">No skills listed.</p>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FreelancerProfilePage;
