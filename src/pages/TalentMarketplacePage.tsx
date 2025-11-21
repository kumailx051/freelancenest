import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { db } from '../lib/firebase';

interface Freelancer {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  profileTitle?: string;
  bio?: string;
  location?: string;
  hourlyRate?: number;
  profilePictureUrl?: string;
  skillCategories?: {
    [key: string]: {
      name: string;
      skills: string[];
    }
  };
  stats?: {
    avgProjectValue: number;
    clientSatisfaction: number;
    completedProjects: number;
    onTimeDelivery: number;
    repeatClients: number;
    totalEarnings: number;
  };
  availability?: string;
  completionRate?: number;
}

const TalentMarketplacePage: React.FC = () => {
  const [freelancers, setFreelancers] = useState<Freelancer[]>([]);
  const [filteredFreelancers, setFilteredFreelancers] = useState<Freelancer[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [sortBy, setSortBy] = useState('featured');

  useEffect(() => {
    fetchFreelancers();
  }, []);

  useEffect(() => {
    filterAndSortFreelancers();
  }, [freelancers, searchTerm, selectedCategory, sortBy]);

  const fetchFreelancers = async () => {
    try {
      setIsLoading(true);
      const freelancersQuery = query(
        collection(db, 'users'),
        where('accountType', '==', 'freelancer')
      );
      const querySnapshot = await getDocs(freelancersQuery);
      
      const freelancersData: Freelancer[] = [];
      querySnapshot.forEach((doc) => {
        const data = doc.data();
        freelancersData.push({
          id: doc.id,
          firstName: data.firstName || '',
          lastName: data.lastName || '',
          email: data.email || '',
          profileTitle: data.profileTitle || data.title || 'Freelancer',
          bio: data.bio || '',
          location: data.location || '',
          hourlyRate: data.hourlyRate || 0,
          profilePictureUrl: data.profilePictureUrl || '',
          skillCategories: data.skillCategories || {},
          stats: data.stats || {
            avgProjectValue: 0,
            clientSatisfaction: 0,
            completedProjects: 0,
            onTimeDelivery: 0,
            repeatClients: 0,
            totalEarnings: 0
          },
          availability: data.availability || 'Available',
          completionRate: data.completionRate || 0
        });
      });
      
      setFreelancers(freelancersData);
    } catch (error) {
      console.error('Error fetching freelancers:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const filterAndSortFreelancers = () => {
    let filtered = [...freelancers];

    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter(freelancer => {
        const fullName = `${freelancer.firstName} ${freelancer.lastName}`.toLowerCase();
        const title = freelancer.profileTitle?.toLowerCase() || '';
        const skills = Object.values(freelancer.skillCategories || {})
          .flatMap(category => category.skills)
          .join(' ').toLowerCase();
        
        return fullName.includes(searchTerm.toLowerCase()) ||
               title.includes(searchTerm.toLowerCase()) ||
               skills.includes(searchTerm.toLowerCase());
      });
    }

    // Filter by category
    if (selectedCategory !== 'all') {
      filtered = filtered.filter(freelancer => {
        return Object.keys(freelancer.skillCategories || {}).some(categoryId => {
          const category = freelancer.skillCategories?.[categoryId];
          return category?.name.toLowerCase().includes(selectedCategory.toLowerCase());
        });
      });
    }

    // Sort freelancers
    switch (sortBy) {
      case 'rate-low':
        filtered.sort((a, b) => (a.hourlyRate || 0) - (b.hourlyRate || 0));
        break;
      case 'rate-high':
        filtered.sort((a, b) => (b.hourlyRate || 0) - (a.hourlyRate || 0));
        break;
      case 'rating':
        filtered.sort((a, b) => (b.stats?.clientSatisfaction || 0) - (a.stats?.clientSatisfaction || 0));
        break;
      case 'projects':
        filtered.sort((a, b) => (b.stats?.completedProjects || 0) - (a.stats?.completedProjects || 0));
        break;
      default:
        // Keep original order for 'featured'
        break;
    }

    setFilteredFreelancers(filtered);
  };

  const getFreelancerSkills = (skillCategories: any) => {
    if (!skillCategories) return [];
    return Object.values(skillCategories)
      .flatMap((category: any) => category.skills || [])
      .slice(0, 5); // Show first 5 skills
  };

  const getAverageRating = (stats: any) => {
    if (!stats || !stats.clientSatisfaction) return 0;
    return Math.round((stats.clientSatisfaction / 10) * 5 * 10) / 10; // Convert to 5-star scale
  };

  return (
    <div className="min-h-screen bg-[#ffeee3]">
      {/* Hero Section */}
      <section className="pt-40 pb-16 relative">
        {/* Background */}
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-[#2E2E2E]/90"></div>
        </div>
        
        <div className="section-container relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
              <span className="bg-gradient-to-r from-[#FF6B00] to-[#FF6B00] bg-clip-text text-transparent">Talent</span> Marketplace
            </h1>
            <p className="text-xl text-[#ffeee3] mb-8">
              Find the perfect freelance talent for your business needs. Browse portfolios and hire top professionals.
            </p>
          </div>
        </div>
      </section>



      {/* Featured Talents */}
      <section className="py-16">
        <div className="section-container">
          <div className="flex flex-col md:flex-row justify-between items-center mb-12">
            <div>
              <h2 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-[#FF6B00] to-[#FF6B00]">Featured Talents</h2>
              <p className="text-[#2E2E2E] mt-2">Top rated freelancers ready to help with your project</p>
            </div>
            
            <div className="flex items-center mt-4 md:mt-0">
              <div className="relative w-64">
                <select 
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="appearance-none w-full bg-white border border-[#ffeee3] rounded-lg px-4 py-2 pr-8 focus:outline-none focus:ring-2 focus:ring-[#FF6B00]"
                >
                  <option value="featured">Sort by: Featured</option>
                  <option value="rating">Highest Rating</option>
                  <option value="rate-low">Lowest Rate</option>
                  <option value="rate-high">Highest Rate</option>
                  <option value="projects">Most Projects</option>
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-[#2E2E2E]">
                  <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                    <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/>
                  </svg>
                </div>
              </div>
            </div>
          </div>

          {isLoading ? (
            <div className="flex justify-center items-center py-16">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#FF6B00]"></div>
              <span className="ml-3 text-[#2E2E2E]">Loading talents...</span>
            </div>
          ) : filteredFreelancers.length === 0 ? (
            <div className="text-center py-16">
              <p className="text-[#2E2E2E]/60 text-lg">No freelancers found matching your criteria.</p>
              <button 
                onClick={() => {
                  setSearchTerm('');
                  setSelectedCategory('all');
                }}
                className="mt-4 text-[#FF6B00] hover:text-[#FF9F45] font-medium"
              >
                Clear filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredFreelancers.map((freelancer) => {
                const skills = getFreelancerSkills(freelancer.skillCategories);
                const rating = getAverageRating(freelancer.stats);
                const completedProjects = freelancer.stats?.completedProjects || 0;
                
                return (
                  <div key={freelancer.id} className="bg-white rounded-xl overflow-hidden shadow-sm border border-[#ffeee3] hover:shadow-md transition-shadow hover:border-[#FF6B00]">
                    <div className="p-6">
                      <div className="flex items-center mb-4">
                        {freelancer.profilePictureUrl ? (
                          <img
                            src={freelancer.profilePictureUrl}
                            alt={`${freelancer.firstName} ${freelancer.lastName}`}
                            className="w-16 h-16 rounded-full object-cover mr-4"
                          />
                        ) : (
                          <div className="w-16 h-16 rounded-full bg-[#FF6B00] flex items-center justify-center mr-4">
                            <span className="text-white text-xl font-bold">
                              {freelancer.firstName?.charAt(0)}{freelancer.lastName?.charAt(0)}
                            </span>
                          </div>
                        )}
                        <div>
                          <h3 className="font-bold text-lg text-[#2E2E2E]">
                            {freelancer.firstName} {freelancer.lastName}
                          </h3>
                          <p className="text-[#2E2E2E]/70">{freelancer.profileTitle}</p>
                        </div>
                      </div>

                      <div className="flex items-center mb-3">
                        <div className="flex items-center text-[#FF6B00] mr-2">
                          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                          </svg>
                          <span className="font-semibold text-[#2E2E2E]">{rating.toFixed(1)}</span>
                        </div>
                        <span className="text-[#2E2E2E]/60">({completedProjects} projects)</span>
                      </div>

                      <div className="flex justify-between items-center mb-4">
                        <div className="text-[#2E2E2E]/70">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 inline mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                          </svg>
                          {freelancer.location || 'Location not specified'}
                        </div>
                        <div className="font-semibold text-[#FF6B00]">
                          ${freelancer.hourlyRate || 0}/hr
                        </div>
                      </div>

                      <div className="flex flex-wrap gap-2 mb-4">
                        {skills.slice(0, 3).map((skill, index) => (
                          <span key={index} className="bg-[#ffeee3] text-[#FF6B00] text-sm px-3 py-1 rounded-full">
                            {skill}
                          </span>
                        ))}
                        {skills.length > 3 && (
                          <span className="bg-[#ffeee3]/50 text-[#2E2E2E]/70 text-sm px-3 py-1 rounded-full">
                            +{skills.length - 3}
                          </span>
                        )}
                      </div>

                      {freelancer.bio && (
                        <p className="text-[#2E2E2E]/70 text-sm mb-4 line-clamp-2">{freelancer.bio}</p>
                      )}

                      <div className="mt-4 flex justify-between">
                        <button className="text-[#FF6B00] hover:text-[#FF9F45] font-medium">
                          View Profile
                        </button>
                        <button className="bg-[#FF6B00] hover:bg-[#FF9F45] text-white font-medium px-4 py-2 rounded-lg text-sm transition-colors duration-200">
                          Invite to Job
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}

          {!isLoading && filteredFreelancers.length > 0 && (
            <div className="mt-12 text-center">
              <p className="text-[#2E2E2E]/60 mb-4">
                Showing {filteredFreelancers.length} of {freelancers.length} freelancers
              </p>
              {filteredFreelancers.length < freelancers.length && searchTerm === '' && selectedCategory === 'all' && (
                <button 
                  onClick={() => fetchFreelancers()}
                  className="bg-white border border-[#ffeee3] hover:bg-[#ffeee3]/30 text-[#2E2E2E] font-medium px-8 py-3 rounded-lg transition-colors duration-200"
                >
                  Refresh Talents
                </button>
              )}
            </div>
          )}
        </div>
      </section>

      {/* Why Choose Section */}
      <section className="py-16 bg-[#FF6B00] text-white">
        <div className="section-container">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Why Choose Our Talent Marketplace</h2>
            <p className="text-xl opacity-90">
              Access a global network of professionals with the right skills for your business.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-[#2E2E2E]/20 p-8 rounded-xl">
              <div className="bg-white text-[#FF6B00] rounded-full w-12 h-12 flex items-center justify-center mb-6">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-3">Quality Guaranteed</h3>
              <p className="opacity-90">
                All freelancers are pre-screened and verified. We maintain high standards to ensure top quality work.
              </p>
            </div>

            <div className="bg-[#2E2E2E]/20 p-8 rounded-xl">
              <div className="bg-white text-[#FF6B00] rounded-full w-12 h-12 flex items-center justify-center mb-6">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-3">Fast & Efficient</h3>
              <p className="opacity-90">
                Find and hire talent in hours, not weeks. Start your projects quickly and efficiently.
              </p>
            </div>

            <div className="bg-[#2E2E2E]/20 p-8 rounded-xl">
              <div className="bg-white text-[#FF6B00] rounded-full w-12 h-12 flex items-center justify-center mb-6">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-3">Secure Payments</h3>
              <p className="opacity-90">
                Pay only when you're satisfied with the work. All transactions are secure and protected.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-[#ffeee3]/30">
        <div className="section-container">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-bold text-[#2E2E2E] mb-6">Ready to Find Your Perfect Match?</h2>
            <p className="text-xl text-[#2E2E2E]/80 mb-8">
              Join thousands of businesses that have found their ideal talent through our marketplace.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Link 
                to="/login" 
                className="bg-[#FF6B00] hover:bg-[#FF9F45] text-white font-medium px-8 py-4 rounded-lg transition-colors duration-200 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-0.5 inline-block text-center"
              >
                Post a Job
              </Link>
              <Link 
                to="/login" 
                className="bg-white border border-[#FF6B00] hover:bg-[#ffeee3]/30 text-[#2E2E2E] font-medium px-8 py-4 rounded-lg transition-colors duration-200 shadow-md hover:shadow-lg transition-all duration-300 hover:-translate-y-0.5 inline-block text-center"
              >
                Browse More Talents
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default TalentMarketplacePage;
