import React, { useState } from 'react';

const CandidateProfilePage: React.FC = () => {
  const [activeTab, setActiveTab] = useState('overview');

  // Sample freelancer data
  const freelancer = {
    id: '1',
    name: 'John Smith',
    title: 'Full-Stack Developer & UI/UX Designer',
    avatar: '/api/placeholder/150/150',
    location: 'San Francisco, CA',
    timezone: 'PST (UTC-8)',
    memberSince: 'January 2020',
    verified: true,
    online: true,
    rating: 4.9,
    totalReviews: 127,
    totalEarnings: '$250,000+',
    jobSuccess: 98,
    responseTime: '1 hour',
    languages: ['English (Native)', 'Spanish (Conversational)'],
    hourlyRate: '$75-$100/hr',
    availability: 'Available now',
    overview: 'Experienced full-stack developer with 8+ years of expertise in React, Node.js, and modern web technologies. I specialize in building scalable web applications and have worked with startups and Fortune 500 companies.',
    skills: [
      { name: 'React', level: 95 },
      { name: 'Node.js', level: 92 },
      { name: 'TypeScript', level: 88 },
      { name: 'Python', level: 85 },
      { name: 'AWS', level: 80 },
      { name: 'UI/UX Design', level: 78 }
    ],
    portfolio: [
      {
        id: '1',
        title: 'E-commerce Platform',
        description: 'Full-stack e-commerce solution with React and Node.js',
        image: '/api/placeholder/300/200',
        tech: ['React', 'Node.js', 'MongoDB'],
        client: 'TechCorp Inc.'
      },
      {
        id: '2',
        title: 'SaaS Dashboard',
        description: 'Analytics dashboard for SaaS platform',
        image: '/api/placeholder/300/200',
        tech: ['React', 'D3.js', 'PostgreSQL'],
        client: 'DataFlow Ltd.'
      },
      {
        id: '3',
        title: 'Mobile Banking App',
        description: 'React Native banking application',
        image: '/api/placeholder/300/200',
        tech: ['React Native', 'Redux', 'Firebase'],
        client: 'FinanceSecure'
      }
    ],
    workHistory: [
      {
        id: '1',
        title: 'E-commerce Website Development',
        client: 'TechCorp Inc.',
        duration: 'Mar 2024 - May 2024',
        budget: '$5,000',
        rating: 5.0,
        feedback: 'Excellent work! John delivered a high-quality e-commerce platform that exceeded our expectations.',
        skills: ['React', 'Node.js', 'Stripe Integration']
      },
      {
        id: '2',
        title: 'SaaS Dashboard Development',
        client: 'DataFlow Ltd.',
        duration: 'Jan 2024 - Feb 2024',
        budget: '$3,500',
        rating: 4.9,
        feedback: 'Great communication and technical skills. The dashboard is exactly what we needed.',
        skills: ['React', 'D3.js', 'REST APIs']
      }
    ],
    reviews: [
      {
        id: '1',
        client: 'TechCorp Inc.',
        rating: 5.0,
        date: 'May 2024',
        project: 'E-commerce Website Development',
        feedback: 'John is an exceptional developer. His attention to detail and ability to understand complex requirements made our project a huge success.',
        avatar: '/api/placeholder/40/40'
      },
      {
        id: '2',
        client: 'DataFlow Ltd.',
        rating: 4.9,
        date: 'Feb 2024',
        project: 'SaaS Dashboard Development',
        feedback: 'Professional, reliable, and technically excellent. Would definitely work with John again.',
        avatar: '/api/placeholder/40/40'
      }
    ],
    certifications: [
      'AWS Certified Solutions Architect',
      'Google Cloud Professional Developer',
      'React Developer Certification'
    ],
    education: [
      {
        degree: 'Bachelor of Computer Science',
        school: 'Stanford University',
        year: '2016'
      }
    ]
  };

  return (
    <div className="min-h-screen bg-[#ffeee3]">
      {/* Hero Section */}
      <section className="pt-40 pb-16 bg-[#2E2E2E] text-white">
        <div className="section-container">
          <div className="max-w-6xl mx-auto">
            <div className="flex flex-col lg:flex-row lg:items-start lg:space-x-8">
              <div className="flex-1">
                <div className="flex items-start space-x-6 mb-6">
                  <div className="relative">
                    <img
                      src={freelancer.avatar}
                      alt={freelancer.name}
                      className="w-24 h-24 rounded-full object-cover border-4 border-[#FF6B00]"
                    />
                    {freelancer.online && (
                      <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-green-500 rounded-full border-2 border-white"></div>
                    )}
                  </div>
                  <div>
                    <div className="flex items-center space-x-3 mb-2">
                      <h1 className="text-3xl font-bold">{freelancer.name}</h1>
                      {freelancer.verified && (
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-green-400" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.259.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                        </svg>
                      )}
                    </div>
                    <p className="text-xl text-[#ffeee3] mb-3">{freelancer.title}</p>
                    <div className="flex items-center space-x-6 text-sm text-[#ffeee3]/80">
                      <span>📍 {freelancer.location}</span>
                      <span>🕒 {freelancer.timezone}</span>
                      <span>📅 Member since {freelancer.memberSince}</span>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="lg:w-80">
                <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-[#ffeee3]/30">
                  <div className="text-center mb-6">
                    <div className="text-3xl font-bold text-[#FF6B00] mb-1">{freelancer.hourlyRate}</div>
                    <div className="text-sm text-[#ffeee3]/80">Hourly Rate</div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4 mb-6 text-center">
                    <div>
                      <div className="font-bold text-white text-lg">{freelancer.rating}</div>
                      <div className="text-xs text-[#ffeee3]/80">Rating</div>
                    </div>
                    <div>
                      <div className="font-bold text-white text-lg">{freelancer.jobSuccess}%</div>
                      <div className="text-xs text-[#ffeee3]/80">Success Rate</div>
                    </div>
                  </div>
                  
                  <div className="space-y-3 mb-6">
                    <div className="flex justify-between text-sm">
                      <span className="text-[#ffeee3]/80">Total Reviews:</span>
                      <span className="text-white font-medium">{freelancer.totalReviews}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-[#ffeee3]/80">Response Time:</span>
                      <span className="text-white font-medium">{freelancer.responseTime}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-[#ffeee3]/80">Availability:</span>
                      <span className="text-green-400 font-medium">{freelancer.availability}</span>
                    </div>
                  </div>
                  
                  <div className="space-y-3">
                    <button className="w-full bg-[#FF6B00] hover:bg-[#FF9F45] text-white py-3 rounded-lg font-semibold transition-colors">
                      Hire Now
                    </button>
                    <button className="w-full bg-white/20 hover:bg-white/30 text-white py-3 rounded-lg font-semibold transition-colors">
                      Send Message
                    </button>
                    <button className="w-full bg-transparent border border-white/30 hover:border-white/50 text-white py-3 rounded-lg font-semibold transition-colors">
                      Add to Shortlist
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Tabs Navigation */}
      <section className="py-0 bg-white border-b border-[#ffeee3]">
        <div className="section-container">
          <div className="max-w-6xl mx-auto">
            <div className="flex space-x-8 overflow-x-auto">
              {[
                { id: 'overview', label: 'Overview' },
                { id: 'portfolio', label: 'Portfolio' },
                { id: 'work-history', label: 'Work History' },
                { id: 'reviews', label: 'Reviews' },
                { id: 'skills', label: 'Skills' }
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`py-4 px-2 border-b-2 font-medium text-sm whitespace-nowrap transition-colors ${
                    activeTab === tab.id
                      ? 'border-[#FF6B00] text-[#FF6B00]'
                      : 'border-transparent text-[#2E2E2E]/60 hover:text-[#2E2E2E] hover:border-[#2E2E2E]/30'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Tab Content */}
      <section className="py-16">
        <div className="section-container">
          <div className="max-w-6xl mx-auto">
            
            {/* Overview Tab */}
            {activeTab === 'overview' && (
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2 space-y-8">
                  <div className="bg-white rounded-xl shadow-sm p-6 border border-[#ffeee3]">
                    <h2 className="text-xl font-bold text-[#2E2E2E] mb-4">About</h2>
                    <p className="text-[#2E2E2E]/80 leading-relaxed">{freelancer.overview}</p>
                  </div>

                  <div className="bg-white rounded-xl shadow-sm p-6 border border-[#ffeee3]">
                    <h2 className="text-xl font-bold text-[#2E2E2E] mb-4">Top Skills</h2>
                    <div className="space-y-4">
                      {freelancer.skills.slice(0, 4).map((skill) => (
                        <div key={skill.name}>
                          <div className="flex justify-between text-sm mb-2">
                            <span className="font-medium text-[#2E2E2E]">{skill.name}</span>
                            <span className="text-[#2E2E2E]/60">{skill.level}%</span>
                          </div>
                          <div className="w-full bg-[#ffeee3] rounded-full h-2">
                            <div 
                              className="bg-[#FF6B00] h-2 rounded-full transition-all duration-300" 
                              style={{ width: `${skill.level}%` }}
                            ></div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="bg-white rounded-xl shadow-sm p-6 border border-[#ffeee3]">
                    <h2 className="text-xl font-bold text-[#2E2E2E] mb-4">Recent Work</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {freelancer.portfolio.slice(0, 2).map((item) => (
                        <div key={item.id} className="border border-[#ffeee3] rounded-lg overflow-hidden hover:border-[#FF6B00] transition-colors">
                          <img src={item.image} alt={item.title} className="w-full h-32 object-cover" />
                          <div className="p-4">
                            <h3 className="font-semibold text-[#2E2E2E] mb-1">{item.title}</h3>
                            <p className="text-sm text-[#2E2E2E]/60 mb-3">{item.description}</p>
                            <div className="flex flex-wrap gap-1">
                              {item.tech.map((tech) => (
                                <span key={tech} className="px-2 py-1 bg-[#ffeee3] text-[#FF6B00] text-xs rounded-full">
                                  {tech}
                                </span>
                              ))}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="space-y-6">
                  <div className="bg-white rounded-xl shadow-sm p-6 border border-[#ffeee3]">
                    <h3 className="font-semibold text-[#2E2E2E] mb-4">Languages</h3>
                    <div className="space-y-2">
                      {freelancer.languages.map((language) => (
                        <div key={language} className="text-sm text-[#2E2E2E]/80">{language}</div>
                      ))}
                    </div>
                  </div>

                  <div className="bg-white rounded-xl shadow-sm p-6 border border-[#ffeee3]">
                    <h3 className="font-semibold text-[#2E2E2E] mb-4">Education</h3>
                    <div className="space-y-3">
                      {freelancer.education.map((edu, index) => (
                        <div key={index}>
                          <div className="font-medium text-[#2E2E2E]">{edu.degree}</div>
                          <div className="text-sm text-[#2E2E2E]/60">{edu.school} • {edu.year}</div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="bg-white rounded-xl shadow-sm p-6 border border-[#ffeee3]">
                    <h3 className="font-semibold text-[#2E2E2E] mb-4">Certifications</h3>
                    <div className="space-y-2">
                      {freelancer.certifications.map((cert) => (
                        <div key={cert} className="text-sm text-[#2E2E2E]/80 flex items-start">
                          <span className="text-[#FF6B00] mr-2">•</span>
                          {cert}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Portfolio Tab */}
            {activeTab === 'portfolio' && (
              <div>
                <h2 className="text-2xl font-bold text-[#2E2E2E] mb-8">Portfolio</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {freelancer.portfolio.map((item) => (
                    <div key={item.id} className="bg-white rounded-xl shadow-sm border border-[#ffeee3] overflow-hidden hover:border-[#FF6B00] transition-colors">
                      <img src={item.image} alt={item.title} className="w-full h-48 object-cover" />
                      <div className="p-6">
                        <h3 className="font-semibold text-[#2E2E2E] mb-2">{item.title}</h3>
                        <p className="text-sm text-[#2E2E2E]/60 mb-4">{item.description}</p>
                        <div className="flex flex-wrap gap-2 mb-4">
                          {item.tech.map((tech) => (
                            <span key={tech} className="px-2 py-1 bg-[#ffeee3] text-[#FF6B00] text-xs rounded-full">
                              {tech}
                            </span>
                          ))}
                        </div>
                        <div className="text-sm text-[#2E2E2E]/60">Client: {item.client}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Work History Tab */}
            {activeTab === 'work-history' && (
              <div>
                <h2 className="text-2xl font-bold text-[#2E2E2E] mb-8">Work History</h2>
                <div className="space-y-6">
                  {freelancer.workHistory.map((work) => (
                    <div key={work.id} className="bg-white rounded-xl shadow-sm p-6 border border-[#ffeee3]">
                      <div className="flex items-start justify-between mb-4">
                        <div>
                          <h3 className="font-semibold text-[#2E2E2E] mb-1">{work.title}</h3>
                          <p className="text-sm text-[#2E2E2E]/60">{work.client} • {work.duration}</p>
                        </div>
                        <div className="text-right">
                          <div className="font-semibold text-[#2E2E2E]">{work.budget}</div>
                          <div className="flex items-center text-sm">
                            <span className="text-[#2E2E2E]/60 mr-1">Rating:</span>
                            <span className="font-medium text-[#2E2E2E]">{work.rating}</span>
                            <svg className="w-4 h-4 text-yellow-400 fill-current ml-1" viewBox="0 0 20 20">
                              <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z"/>
                            </svg>
                          </div>
                        </div>
                      </div>
                      <p className="text-[#2E2E2E]/80 mb-4">"{work.feedback}"</p>
                      <div className="flex flex-wrap gap-2">
                        {work.skills.map((skill) => (
                          <span key={skill} className="px-2 py-1 bg-[#ffeee3] text-[#FF6B00] text-xs rounded-full">
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Reviews Tab */}
            {activeTab === 'reviews' && (
              <div>
                <h2 className="text-2xl font-bold text-[#2E2E2E] mb-8">Client Reviews</h2>
                <div className="space-y-6">
                  {freelancer.reviews.map((review) => (
                    <div key={review.id} className="bg-white rounded-xl shadow-sm p-6 border border-[#ffeee3]">
                      <div className="flex items-start space-x-4">
                        <img src={review.avatar} alt={review.client} className="w-12 h-12 rounded-full object-cover" />
                        <div className="flex-1">
                          <div className="flex items-center justify-between mb-2">
                            <div>
                              <h3 className="font-semibold text-[#2E2E2E]">{review.client}</h3>
                              <p className="text-sm text-[#2E2E2E]/60">{review.project}</p>
                            </div>
                            <div className="text-right">
                              <div className="flex items-center">
                                <span className="font-medium text-[#2E2E2E] mr-1">{review.rating}</span>
                                {[1,2,3,4,5].map((star) => (
                                  <svg key={star} className="w-4 h-4 text-yellow-400 fill-current" viewBox="0 0 20 20">
                                    <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z"/>
                                  </svg>
                                ))}
                              </div>
                              <div className="text-sm text-[#2E2E2E]/60">{review.date}</div>
                            </div>
                          </div>
                          <p className="text-[#2E2E2E]/80">"{review.feedback}"</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Skills Tab */}
            {activeTab === 'skills' && (
              <div>
                <h2 className="text-2xl font-bold text-[#2E2E2E] mb-8">Skills & Expertise</h2>
                <div className="bg-white rounded-xl shadow-sm p-6 border border-[#ffeee3]">
                  <div className="space-y-6">
                    {freelancer.skills.map((skill) => (
                      <div key={skill.name}>
                        <div className="flex justify-between text-sm mb-3">
                          <span className="font-medium text-[#2E2E2E]">{skill.name}</span>
                          <span className="text-[#2E2E2E]/60">{skill.level}% proficiency</span>
                        </div>
                        <div className="w-full bg-[#ffeee3] rounded-full h-3">
                          <div 
                            className="bg-[#FF6B00] h-3 rounded-full transition-all duration-500" 
                            style={{ width: `${skill.level}%` }}
                          ></div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
  );
};

export default CandidateProfilePage;
