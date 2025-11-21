import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Star, MapPin, Search, ChevronDown } from 'lucide-react';
import { FreelanceFirestoreService } from '../../lib/firestoreService';

interface Freelancer {
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
  skills?: Array<{
    name: string;
    level: number;
    levelLabel: string;
  }>;
  experience?: Array<{
    company: string;
    title: string;
    description: string;
    from: string;
    to: string;
    current: boolean;
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
  rating?: number;
  reviewCount?: number;
  completedProjects?: number;
}

const BrowseFreelancersPage: React.FC = () => {
  const navigate = useNavigate();
  const [freelancers, setFreelancers] = useState<Freelancer[]>([]);
  const [filteredFreelancers, setFilteredFreelancers] = useState<Freelancer[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSkill, setSelectedSkill] = useState('');
  const [sortBy, setSortBy] = useState('newest');

  // Get unique skills from all freelancers
  const getAllSkills = () => {
    const skillsSet = new Set<string>();
    freelancers.forEach(freelancer => {
      freelancer.skills?.forEach(skill => {
        skillsSet.add(skill.name);
      });
    });
    return Array.from(skillsSet).sort();
  };

  // Load freelancers from Firebase
  useEffect(() => {
    const loadFreelancers = async () => {
      try {
        setLoading(true);
        setError('');

        // Get all users with accountType 'freelancer'
        const users = await FreelanceFirestoreService.getWhere('users', 'accountType', '==', 'freelancer');
        
        // Filter only completed profiles
        const completedFreelancers = users.filter(user => 
          user.profileCompleted === true || 
          (user.firstName && user.lastName && user.profileTitle)
        );

        // Transform data for display
        const transformedFreelancers: Freelancer[] = completedFreelancers.map(user => ({
          ...user,
          id: user.id || user.uid,
          rating: user.rating || (4 + Math.random()), // Mock rating if not available
          reviewCount: user.reviewCount || Math.floor(Math.random() * 50) + 5,
          completedProjects: user.completedProjects || Math.floor(Math.random() * 20) + 1,
          hourlyRate: user.hourlyRate || (25 + Math.floor(Math.random() * 75))
        } as Freelancer));

        setFreelancers(transformedFreelancers);
        setFilteredFreelancers(transformedFreelancers);
      } catch (err) {
        console.error('Error loading freelancers:', err);
        setError('Failed to load freelancers. Please try again.');
      } finally {
        setLoading(false);
      }
    };

    loadFreelancers();
  }, []);

  // Filter and search freelancers
  useEffect(() => {
    let filtered = [...freelancers];

    // Search by name, title, or skills
    if (searchTerm) {
      filtered = filtered.filter(freelancer => 
        freelancer.firstName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        freelancer.lastName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        freelancer.displayName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        freelancer.profileTitle?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        freelancer.skills?.some(skill => 
          skill.name.toLowerCase().includes(searchTerm.toLowerCase())
        )
      );
    }

    // Filter by skill
    if (selectedSkill) {
      filtered = filtered.filter(freelancer =>
        freelancer.skills?.some(skill => skill.name === selectedSkill)
      );
    }

    // Sort
    switch (sortBy) {
      case 'newest':
        filtered.sort((a, b) => new Date(b.createdAt?.toDate?.() || b.createdAt).getTime() - new Date(a.createdAt?.toDate?.() || a.createdAt).getTime());
        break;
      case 'rating':
        filtered.sort((a, b) => (b.rating || 0) - (a.rating || 0));
        break;
      case 'rate-low':
        filtered.sort((a, b) => (a.hourlyRate || 0) - (b.hourlyRate || 0));
        break;
      case 'rate-high':
        filtered.sort((a, b) => (b.hourlyRate || 0) - (a.hourlyRate || 0));
        break;
    }

    setFilteredFreelancers(filtered);
  }, [freelancers, searchTerm, selectedSkill, sortBy]);

  const getDisplayName = (freelancer: Freelancer) => {
    if (freelancer.displayName) return freelancer.displayName;
    if (freelancer.firstName && freelancer.lastName) {
      return `${freelancer.firstName} ${freelancer.lastName}`;
    }
    return freelancer.firstName || freelancer.email?.split('@')[0] || 'Freelancer';
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

  if (loading) {
    return (
      <div className="min-h-screen bg-[#ffeee3] p-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-center min-h-[400px]">
            <div className="text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#FF6B00] mx-auto mb-4"></div>
              <p className="text-[#2E2E2E]">Loading freelancers...</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-[#ffeee3] p-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center py-12">
            <p className="text-red-600 mb-4">{error}</p>
            <button 
              onClick={() => window.location.reload()} 
              className="bg-[#FF6B00] text-white px-6 py-2 rounded-lg hover:bg-[#FF9F45] transition-colors"
            >
              Try Again
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#ffeee3]">
      <div className="max-w-7xl mx-auto p-6">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-[#2E2E2E] mb-2">Browse Freelancers</h1>
          <p className="text-[#2E2E2E] opacity-70">
            Find the perfect freelancer for your project from our talented community
          </p>
        </div>

        {/* Search and Filters */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
          <div className="flex flex-col lg:flex-row gap-4">
            {/* Search */}
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              <input
                type="text"
                placeholder="Search by name, title, or skills..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FF6B00] focus:border-[#FF6B00] outline-none"
              />
            </div>

            {/* Skill Filter */}
            <div className="relative">
              <select
                value={selectedSkill}
                onChange={(e) => setSelectedSkill(e.target.value)}
                className="appearance-none bg-white border border-gray-300 rounded-lg px-4 py-2 pr-8 focus:ring-2 focus:ring-[#FF6B00] focus:border-[#FF6B00] outline-none"
              >
                <option value="">All Skills</option>
                {getAllSkills().map(skill => (
                  <option key={skill} value={skill}>{skill}</option>
                ))}
              </select>
              <ChevronDown className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
            </div>

            {/* Sort */}
            <div className="relative">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="appearance-none bg-white border border-gray-300 rounded-lg px-4 py-2 pr-8 focus:ring-2 focus:ring-[#FF6B00] focus:border-[#FF6B00] outline-none"
              >
                <option value="newest">Newest First</option>
                <option value="rating">Highest Rated</option>
                <option value="rate-low">Lowest Rate</option>
                <option value="rate-high">Highest Rate</option>
              </select>
              <ChevronDown className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
            </div>
          </div>

          {/* Results count */}
          <div className="mt-4 text-sm text-[#2E2E2E] opacity-70">
            {filteredFreelancers.length} freelancer{filteredFreelancers.length !== 1 ? 's' : ''} found
          </div>
        </div>

        {/* Freelancers Grid */}
        {filteredFreelancers.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-[#2E2E2E] opacity-70 mb-4">No freelancers found matching your criteria.</p>
            <button
              onClick={() => {
                setSearchTerm('');
                setSelectedSkill('');
              }}
              className="text-[#FF6B00] hover:underline"
            >
              Clear filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredFreelancers.map((freelancer) => (
              <div key={freelancer.id} className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow p-6">
                {/* Profile Header */}
                <div className="flex items-start gap-4 mb-4">
                  <div className="w-16 h-16 rounded-full bg-[#ffeee3] flex items-center justify-center overflow-hidden">
                    {freelancer.profilePictureUrl ? (
                      <img
                        src={freelancer.profilePictureUrl}
                        alt={getDisplayName(freelancer)}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <span className="text-[#FF6B00] text-xl font-semibold">
                        {getDisplayName(freelancer).charAt(0).toUpperCase()}
                      </span>
                    )}
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-[#2E2E2E] mb-1">
                      {getDisplayName(freelancer)}
                    </h3>
                    <p className="text-sm text-[#2E2E2E] opacity-70 mb-2">
                      {freelancer.profileTitle || 'Professional Freelancer'}
                    </p>
                    {freelancer.location && (
                      <div className="flex items-center text-xs text-[#2E2E2E] opacity-60">
                        <MapPin size={12} className="mr-1" />
                        {freelancer.location}
                      </div>
                    )}
                  </div>
                </div>

                {/* Bio */}
                {freelancer.bio && (
                  <p className="text-sm text-[#2E2E2E] opacity-70 mb-4 line-clamp-3">
                    {freelancer.bio}
                  </p>
                )}

                {/* Skills */}
                {freelancer.skills && freelancer.skills.length > 0 && (
                  <div className="mb-4">
                    <div className="flex flex-wrap gap-1">
                      {freelancer.skills.slice(0, 5).map((skill, index) => (
                        <span
                          key={index}
                          className="px-2 py-1 bg-[#ffeee3] text-[#2E2E2E] text-xs rounded-full"
                        >
                          {skill.name}
                        </span>
                      ))}
                      {freelancer.skills.length > 5 && (
                        <span className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full">
                          +{freelancer.skills.length - 5}
                        </span>
                      )}
                    </div>
                  </div>
                )}

                {/* Stats */}
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-1">
                    {renderStars(freelancer.rating || 0)}
                    <span className="text-sm text-[#2E2E2E] opacity-70 ml-1">
                      ({freelancer.reviewCount || 0})
                    </span>
                  </div>
                  <div className="text-sm text-[#2E2E2E] opacity-70">
                    {freelancer.completedProjects || 0} projects
                  </div>
                </div>

                {/* Rate and Action */}
                <div className="flex items-center justify-between">
                  <div className="text-lg font-semibold text-[#2E2E2E]">
                    ${freelancer.hourlyRate || 0}/hr
                  </div>
                  <button 
                    onClick={() => navigate(`/client/freelancer/${freelancer.id}`)}
                    className="bg-[#FF6B00] hover:bg-[#FF9F45] text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors"
                  >
                    View Profile
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default BrowseFreelancersPage;
