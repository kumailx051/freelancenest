import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Award, Search, CheckCircle, Star, TrendingUp, Clock, BookOpen, Shield } from 'lucide-react';

const SkillCertificationPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'browse' | 'my-certifications'>('browse');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  
  // Sample certification categories
  const certificationCategories = [
    { id: 'web-dev', name: 'Web Development', count: 24 },
    { id: 'design', name: 'Design', count: 18 },
    { id: 'marketing', name: 'Digital Marketing', count: 15 },
    { id: 'data', name: 'Data Science', count: 12 },
    { id: 'mobile', name: 'Mobile Development', count: 10 },
    { id: 'writing', name: 'Content Writing', count: 8 },
  ];
  
  // Sample popular certifications
  const popularCertifications = [
    {
      id: 1,
      title: 'React Developer Certification',
      description: 'Demonstrate your proficiency in building modern React applications, including state management, hooks, and component architecture.',
      image: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
      level: 'Intermediate',
      duration: '2.5 hours',
      questions: 45,
      passScore: '75%',
      price: 129,
      rating: 4.8,
      reviews: 243,
      certified: 1876
    },
    {
      id: 2,
      title: 'Professional UX/UI Design',
      description: 'Validate your expertise in user experience research, wireframing, prototyping, and creating intuitive user interfaces.',
      image: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
      level: 'Advanced',
      duration: '3 hours',
      questions: 50,
      passScore: '80%',
      price: 159,
      rating: 4.7,
      reviews: 178,
      certified: 1245
    },
    {
      id: 3,
      title: 'SEO Specialist Certification',
      description: 'Showcase your skills in search engine optimization techniques, on-page SEO, link building, and search analytics.',
      image: 'https://images.unsplash.com/photo-1596742578443-7682ef5251cd?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
      level: 'Intermediate',
      duration: '2 hours',
      questions: 40,
      passScore: '70%',
      price: 119,
      rating: 4.6,
      reviews: 156,
      certified: 934
    }
  ];
  
  // Sample user's certifications
  const userCertifications = [
    {
      id: 1,
      title: 'Node.js Backend Development',
      image: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
      issueDate: 'June 15, 2023',
      expiryDate: 'June 15, 2025',
      score: 92,
      credentialId: 'NODECERT-4582-78JH2',
      level: 'Advanced',
      verificationUrl: 'https://certifications.example.com/verify/NODECERT-4582-78JH2'
    },
    {
      id: 2,
      title: 'TypeScript Expert',
      image: 'https://images.unsplash.com/photo-1599507593499-a3f7d7d97667?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
      issueDate: 'March 22, 2023',
      expiryDate: 'March 22, 2025',
      score: 88,
      credentialId: 'TSCERT-7729-8KL45',
      level: 'Intermediate',
      verificationUrl: 'https://certifications.example.com/verify/TSCERT-7729-8KL45'
    }
  ];
  
  // Sample recommended certifications based on user profile
  const recommendedCertifications = [
    {
      id: 4,
      title: 'MongoDB Database Administration',
      description: 'Master MongoDB database design, indexing, optimization, and administration.',
      image: 'https://images.unsplash.com/photo-1605379399642-870262d3d051?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
      level: 'Advanced',
      duration: '3 hours',
      price: 149,
      relevance: 'Based on your Node.js certification'
    },
    {
      id: 5,
      title: 'GraphQL API Development',
      description: 'Learn to build efficient, powerful APIs using GraphQL query language and runtime.',
      image: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
      level: 'Intermediate',
      duration: '2.5 hours',
      price: 129,
      relevance: 'Based on your backend development skills'
    }
  ];

  return (
    <div className="min-h-screen bg-[#ffeee3]">
      {/* Hero Section */}
      <section className="pt-40 pb-16 bg-gradient-to-r from-primary-500 to-purple-600">
        <div className="section-container">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">Skill Certification</h1>
            <p className="text-xl text-[#ffeee3] mb-8">
              Validate your expertise with industry-recognized certifications to stand out in the freelance marketplace
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={() => setActiveTab('browse')}
                className="bg-white text-[#FF6B00] hover:bg-[#ffeee3] font-medium px-6 py-3 rounded-lg transition-colors duration-200 flex items-center justify-center"
              >
                <Search className="h-5 w-5 mr-2" />
                Browse Certifications
              </button>
              <button
                onClick={() => setActiveTab('my-certifications')}
                className="bg-transparent border border-white text-white hover:bg-white/10 font-medium px-6 py-3 rounded-lg transition-colors duration-200"
              >
                View My Certifications
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16">
        <div className="section-container">
          {/* Tabs */}
          <div className="flex justify-center mb-12">
            <div className="inline-flex bg-white p-1 rounded-lg shadow-sm">
              <button
                onClick={() => setActiveTab('browse')}
                className={`px-6 py-2 rounded-md font-medium ${
                  activeTab === 'browse'
                    ? 'bg-[#FF6B00] text-white'
                    : 'text-[#2E2E2E] hover:bg-[#ffeee3]'
                } transition-colors duration-200`}
              >
                Browse Certifications
              </button>
              <button
                onClick={() => setActiveTab('my-certifications')}
                className={`px-6 py-2 rounded-md font-medium ${
                  activeTab === 'my-certifications'
                    ? 'bg-[#FF6B00] text-white'
                    : 'text-[#2E2E2E] hover:bg-[#ffeee3]'
                } transition-colors duration-200`}
              >
                My Certifications
              </button>
            </div>
          </div>

          {/* Browse Certifications Tab */}
          {activeTab === 'browse' && (
            <div>
              {/* Search */}
              <div className="max-w-4xl mx-auto mb-12">
                <div className="relative">
                  <input
                    type="text"
                    className="w-full bg-white border border-[#ffeee3] rounded-lg pl-12 pr-4 py-3 focus:outline-none focus:ring-2 focus:ring-purple-500 placeholder-gray-400"
                    placeholder="Search for certifications..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                  <Search className="absolute left-4 top-3.5 h-5 w-5 text-[#ffeee3]" />
                </div>
                
                {/* Categories */}
                <div className="flex flex-wrap gap-3 mt-4">
                  {certificationCategories.map(category => (
                    <button
                      key={category.id}
                      onClick={() => setSelectedCategory(selectedCategory === category.id ? null : category.id)}
                      className={`px-4 py-2 rounded-full text-sm font-medium transition-colors duration-200 ${
                        selectedCategory === category.id
                          ? 'bg-[#FF6B00] text-white'
                          : 'bg-white text-[#2E2E2E] hover:bg-[#ffeee3]'
                      }`}
                    >
                      {category.name} ({category.count})
                    </button>
                  ))}
                </div>
              </div>
              
              {/* Recommended Certifications */}
              {recommendedCertifications.length > 0 && (
                <div className="max-w-5xl mx-auto mb-16">
                  <h2 className="text-xl font-bold mb-6">Recommended for You</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {recommendedCertifications.map(cert => (
                      <div key={cert.id} className="bg-white rounded-xl shadow-sm overflow-hidden border-l-4 border-[#FF6B00]">
                        <div className="flex">
                          <div className="w-1/3 h-auto relative">
                            <img
                              src={cert.image}
                              alt={cert.title}
                              className="absolute w-full h-full object-cover"
                            />
                          </div>
                          <div className="w-2/3 p-6">
                            <h3 className="text-lg font-bold mb-2">{cert.title}</h3>
                            <p className="text-[#2E2E2E] text-sm mb-3">{cert.description}</p>
                            <div className="flex items-center mb-1 text-sm">
                              <Award className="h-4 w-4 text-[#FF6B00] mr-1" />
                              <span>{cert.level}</span>
                              <span className="mx-2">â€¢</span>
                              <Clock className="h-4 w-4 text-[#FF6B00] mr-1" />
                              <span>{cert.duration}</span>
                            </div>
                            <div className="flex items-center text-sm text-[#FF6B00] mb-4">
                              <TrendingUp className="h-4 w-4 mr-1" />
                              <span>{cert.relevance}</span>
                            </div>
                            <div className="flex justify-between items-center">
                              <div className="text-lg font-bold text-[#2E2E2E]">${cert.price}</div>
                              <button className="bg-[#FF6B00] hover:bg-[#2E2E2E] text-white px-4 py-2 rounded-lg text-sm transition-colors duration-200">
                                View Details
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
              
              {/* Popular Certifications */}
              <div className="max-w-5xl mx-auto">
                <h2 className="text-xl font-bold mb-6">Popular Certifications</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {popularCertifications.map(cert => (
                    <div key={cert.id} className="bg-white rounded-xl shadow-sm overflow-hidden">
                      <div className="h-40 relative">
                        <img
                          src={cert.image}
                          alt={cert.title}
                          className="absolute w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end">
                          <div className="p-4 text-white">
                            <div className="text-sm font-medium bg-[#FF6B00] rounded-full px-3 py-1 inline-block">
                              {cert.level}
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="p-6">
                        <h3 className="text-lg font-bold mb-2">{cert.title}</h3>
                        <p className="text-[#2E2E2E] text-sm mb-4 line-clamp-2">{cert.description}</p>
                        
                        <div className="grid grid-cols-2 gap-2 mb-4">
                          <div className="flex items-center">
                            <Clock className="h-4 w-4 text-[#ffeee3] mr-1" />
                            <span className="text-sm text-[#2E2E2E]">{cert.duration}</span>
                          </div>
                          <div className="flex items-center">
                            <BookOpen className="h-4 w-4 text-[#ffeee3] mr-1" />
                            <span className="text-sm text-[#2E2E2E]">{cert.questions} questions</span>
                          </div>
                          <div className="flex items-center">
                            <CheckCircle className="h-4 w-4 text-[#ffeee3] mr-1" />
                            <span className="text-sm text-[#2E2E2E]">Pass: {cert.passScore}</span>
                          </div>
                          <div className="flex items-center">
                            <Award className="h-4 w-4 text-[#ffeee3] mr-1" />
                            <span className="text-sm text-[#2E2E2E]">{cert.certified} certified</span>
                          </div>
                        </div>
                        
                        <div className="flex items-center mb-4">
                          <div className="flex items-center">
                            <Star className="h-4 w-4 text-[#FF9F45] fill-yellow-400" />
                            <span className="text-sm ml-1 text-[#2E2E2E]">{cert.rating}</span>
                          </div>
                          <span className="mx-2 text-[#ffeee3]">|</span>
                          <span className="text-sm text-[#ffeee3]">{cert.reviews} reviews</span>
                        </div>
                        
                        <div className="flex justify-between items-center">
                          <div className="text-lg font-bold text-[#2E2E2E]">${cert.price}</div>
                          <button className="bg-[#FF6B00] hover:bg-[#2E2E2E] text-white px-4 py-2 rounded-lg text-sm transition-colors duration-200">
                            Get Certified
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                
                <div className="mt-8 text-center">
                  <button className="bg-white border border-[#ffeee3] text-[#2E2E2E] hover:bg-[#ffeee3] font-medium px-6 py-3 rounded-lg transition-colors duration-200">
                    View All Certifications
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* My Certifications Tab */}
          {activeTab === 'my-certifications' && (
            <div>
              {userCertifications.length === 0 ? (
                <div className="text-center py-12">
                  <Award className="h-16 w-16 mx-auto text-[#ffeee3] mb-4" />
                  <h3 className="text-2xl font-bold text-[#2E2E2E] mb-2">No certifications yet</h3>
                  <p className="text-[#ffeee3] mb-6">Get certified to showcase your skills and increase your earning potential</p>
                  <button
                    onClick={() => setActiveTab('browse')}
                    className="bg-[#FF6B00] text-white hover:bg-[#2E2E2E] font-medium px-6 py-3 rounded-lg transition-colors duration-200"
                  >
                    Browse Certifications
                  </button>
                </div>
              ) : (
                <div className="max-w-5xl mx-auto">
                  <div className="flex justify-between items-center mb-8">
                    <h2 className="text-xl font-bold">Your Certifications</h2>
                    <button
                      onClick={() => setActiveTab('browse')}
                      className="bg-[#FF6B00] text-white hover:bg-[#2E2E2E] font-medium px-4 py-2 rounded-lg transition-colors duration-200 flex items-center"
                    >
                      <Award className="h-4 w-4 mr-2" />
                      Get More Certifications
                    </button>
                  </div>
                  
                  <div className="space-y-6">
                    {userCertifications.map(cert => (
                      <div key={cert.id} className="bg-white rounded-xl shadow-sm overflow-hidden">
                        <div className="md:flex">
                          <div className="md:w-1/4 h-48 md:h-auto relative">
                            <img
                              src={cert.image}
                              alt={cert.title}
                              className="absolute w-full h-full object-cover"
                            />
                          </div>
                          <div className="p-6 md:w-3/4">
                            <div className="flex justify-between items-start">
                              <div>
                                <h3 className="text-xl font-bold mb-1">{cert.title}</h3>
                                <div className="flex items-center">
                                  <Award className="h-5 w-5 text-[#FF6B00] mr-1" />
                                  <span className="font-medium text-[#FF6B00]">{cert.level} Level</span>
                                </div>
                              </div>
                              <div className="bg-[#ffeee3] text-[#2E2E2E] text-xs font-medium px-3 py-1 rounded-full flex items-center">
                                <CheckCircle className="h-3 w-3 mr-1" />
                                Verified
                              </div>
                            </div>
                            
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
                              <div>
                                <div className="text-[#ffeee3] text-sm">Issue Date</div>
                                <div className="font-medium">{cert.issueDate}</div>
                              </div>
                              <div>
                                <div className="text-[#ffeee3] text-sm">Expiry Date</div>
                                <div className="font-medium">{cert.expiryDate}</div>
                              </div>
                              <div>
                                <div className="text-[#ffeee3] text-sm">Certification Score</div>
                                <div className="font-medium">{cert.score}%</div>
                              </div>
                              <div>
                                <div className="text-[#ffeee3] text-sm">Credential ID</div>
                                <div className="font-medium">{cert.credentialId}</div>
                              </div>
                            </div>
                            
                            <div className="flex justify-between items-center mt-6">
                              <a 
                                href={cert.verificationUrl} 
                                target="_blank" 
                                rel="noopener noreferrer"
                                className="text-[#FF6B00] hover:text-[#2E2E2E] text-sm flex items-center"
                              >
                                <Shield className="h-4 w-4 mr-1" />
                                Verify Certificate
                              </a>
                              <div className="flex space-x-3">
                                <button className="border border-[#ffeee3] text-[#2E2E2E] hover:bg-[#ffeee3] px-4 py-2 rounded-lg text-sm transition-colors duration-200">
                                  Share
                                </button>
                                <button className="bg-[#FF6B00] hover:bg-[#2E2E2E] text-white px-4 py-2 rounded-lg text-sm transition-colors duration-200">
                                  Download
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-16 bg-[#ffeee3]">
        <div className="section-container">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl font-bold text-center mb-12">Benefits of Skill Certification</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-white p-6 rounded-xl shadow-sm">
                <div className="text-[#FF6B00] mb-4">
                  <TrendingUp className="h-12 w-12" />
                </div>
                <h3 className="text-lg font-bold mb-2">Higher Earning Potential</h3>
                <p className="text-[#2E2E2E]">
                  Certified freelancers earn up to 20% more than their non-certified counterparts with similar experience levels.
                </p>
              </div>
              <div className="bg-white p-6 rounded-xl shadow-sm">
                <div className="text-[#FF6B00] mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 15l-2 5L9 9l11 4-5 2zm0 0l5 5M7.188 2.239l.777 2.897M5.136 7.965l-2.898-.777M13.95 4.05l-2.122 2.122m-5.657 5.656l-2.12 2.122" />
                  </svg>
                </div>
                <h3 className="text-lg font-bold mb-2">Stand Out from Competition</h3>
                <p className="text-[#2E2E2E]">
                  Certifications help you differentiate yourself in a crowded marketplace and show clients you're serious about your craft.
                </p>
              </div>
              <div className="bg-white p-6 rounded-xl shadow-sm">
                <div className="text-[#FF6B00] mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                </div>
                <h3 className="text-lg font-bold mb-2">Build Client Trust</h3>
                <p className="text-[#2E2E2E]">
                  Verified certifications give clients confidence in your abilities and increase their willingness to pay premium rates.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Employers Section */}
      <section className="py-16">
        <div className="section-container">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-2xl font-bold mb-4">Recognized by Top Companies</h2>
            <p className="text-[#2E2E2E] mb-12">
              Our certifications are valued by leading companies worldwide when hiring freelancers
            </p>
            <div className="grid grid-cols-2 md:grid-cols-6 gap-8 items-center">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <div key={i} className="grayscale hover:grayscale-0 transition-all duration-300">
                  <div className="h-12 bg-[#ffeee3] rounded-md flex items-center justify-center">
                    <span className="text-[#ffeee3]">Company {i}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-[#FF6B00] text-white">
        <div className="section-container">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-6">Ready to Boost Your Profile?</h2>
            <p className="text-xl opacity-90 mb-8">
              Get certified today and showcase your skills to potential clients worldwide.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={() => setActiveTab('browse')}
                className="bg-white text-[#FF6B00] hover:bg-[#ffeee3] font-medium px-8 py-4 rounded-lg text-lg transition-colors duration-200 flex items-center justify-center"
              >
                <Award className="h-5 w-5 mr-2" />
                Get Certified Now
              </button>
              <Link to="/ways-to-earn" className="bg-transparent border border-white text-white hover:bg-white/10 font-medium px-8 py-4 rounded-lg text-lg transition-colors duration-200 inline-block">
                Explore More Ways to Earn
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default SkillCertificationPage;















