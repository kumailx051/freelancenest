import React, { useState } from 'react';
import { MapPin, Clock, Building, Search, Filter, ChevronDown, Briefcase, Users, Globe, Book } from 'lucide-react';

const CareersPage: React.FC = () => {
  // State for search and filters
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDepartment, setSelectedDepartment] = useState('All');
  const [selectedLocation, setSelectedLocation] = useState('All');

  // Example job listings
  const jobListings = [
    {
      id: 1,
      title: "Senior Full Stack Developer",
      department: "Engineering",
      location: "Remote",
      type: "Full-time",
      description: "We're looking for an experienced Full Stack Developer to join our engineering team. You'll be responsible for developing and maintaining key platform features, collaborating with cross-functional teams, and contributing to our technical architecture.",
      postedDate: "2 days ago"
    },
    {
      id: 2,
      title: "Product Manager",
      department: "Product",
      location: "New York",
      type: "Full-time",
      description: "Join our Product team to drive the vision, strategy, and roadmap for key platform features. You'll work closely with users, stakeholders, and engineering teams to deliver exceptional product experiences.",
      postedDate: "1 week ago"
    },
    {
      id: 3,
      title: "UX/UI Designer",
      department: "Design",
      location: "Remote",
      type: "Full-time",
      description: "Help shape the user experience of our platform by creating intuitive, engaging designs that solve complex problems. You'll collaborate with product and engineering teams to deliver cohesive user experiences.",
      postedDate: "3 days ago"
    },
    {
      id: 4,
      title: "Customer Success Manager",
      department: "Customer Success",
      location: "London",
      type: "Full-time",
      description: "Drive client satisfaction and retention by providing exceptional support and strategic guidance. You'll work directly with enterprise clients to ensure they achieve their goals using our platform.",
      postedDate: "1 day ago"
    },
    {
      id: 5,
      title: "Growth Marketing Specialist",
      department: "Marketing",
      location: "Remote",
      type: "Full-time",
      description: "Join our marketing team to develop and execute strategies that drive user acquisition, engagement, and retention. You'll analyze data to optimize campaigns and contribute to our overall growth strategy.",
      postedDate: "2 weeks ago"
    },
    {
      id: 6,
      title: "Data Scientist",
      department: "Engineering",
      location: "Berlin",
      type: "Full-time",
      description: "Use your expertise in machine learning and data analysis to improve our matching algorithms, develop predictive models, and extract actionable insights from our platform data.",
      postedDate: "5 days ago"
    },
    {
      id: 7,
      title: "HR Business Partner",
      department: "People & Culture",
      location: "Remote",
      type: "Full-time",
      description: "Support our growing global team by developing and implementing HR strategies that foster a positive workplace culture, drive employee engagement, and support business objectives.",
      postedDate: "1 week ago"
    },
    {
      id: 8,
      title: "Financial Analyst",
      department: "Finance",
      location: "Singapore",
      type: "Full-time",
      description: "Join our finance team to analyze financial data, prepare reports, and provide insights that support strategic decision-making and business growth.",
      postedDate: "4 days ago"
    }
  ];

  // Department and location options
  const departments = ['All', 'Engineering', 'Product', 'Design', 'Marketing', 'Customer Success', 'People & Culture', 'Finance', 'Legal'];
  const locations = ['All', 'Remote', 'New York', 'London', 'Berlin', 'Singapore'];

  // Benefits data
  const benefits = [
    {
      icon: <Clock />,
      title: "Flexible Work",
      description: "Work remotely or hybrid with flexible hours to maintain your ideal work-life balance."
    },
    {
      icon: <Briefcase />,
      title: "Competitive Compensation",
      description: "Attractive salary packages with equity options to share in our success."
    },
    {
      icon: <Users />,
      title: "Health & Wellness",
      description: "Comprehensive health insurance, wellness programs, and mental health support."
    },
    {
      icon: <Globe />,
      title: "Global Team Events",
      description: "Regular virtual and in-person events to connect with teammates globally."
    },
    {
      icon: <Book />,
      title: "Learning Budget",
      description: "Dedicated budget for courses, conferences, and professional development."
    },
    {
      icon: <Building />,
      title: "Co-working Allowance",
      description: "Monthly stipend for co-working spaces if you prefer not to work from home."
    }
  ];

  // Core values data
  const values = [
    {
      title: "User-Focused",
      description: "We put our users at the center of everything we do, constantly seeking feedback to improve their experience."
    },
    {
      title: "Collaborative",
      description: "We believe great ideas come from diverse perspectives and work together across functions to achieve our goals."
    },
    {
      title: "Transparent",
      description: "We communicate openly and honestly, sharing both successes and challenges with our team."
    },
    {
      title: "Impact-Driven",
      description: "We prioritize work that drives measurable results and makes a meaningful difference."
    }
  ];

  // Filter jobs based on search and filters
  const filteredJobs = jobListings.filter(job => {
    const matchesSearch = job.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          job.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesDepartment = selectedDepartment === 'All' || job.department === selectedDepartment;
    const matchesLocation = selectedLocation === 'All' || job.location === selectedLocation;
    
    return matchesSearch && matchesDepartment && matchesLocation;
  });

  return (
    <div className="min-h-screen bg-[#ffeee3]">
      {/* Hero Section */}
      <section className="pt-40 pb-16 bg-[#2E2E2E] text-white">
        <div className="section-container">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-4xl md:text-5xl font-bold mb-6">Join Our Mission to Transform Work</h1>
              <p className="text-xl mb-8 text-[#ffeee3]">
                We're building the future of work by connecting talent with opportunity. Join our team and be part of something extraordinary.
              </p>
              <button className="bg-white text-[#FF6B00] border-2 border-[#FF6B00] px-6 py-3 rounded-lg font-semibold hover:bg-[#2E2E2E] hover:text-white transition-all">Explore Open Positions</button>
            </div>
            <div className="hidden md:block">
              <img 
                src="/src/assets/images/girlWithLaptop.PNG" 
                alt="FreelanceNest Team" 
                className="rounded-xl shadow-xl"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Our Culture */}
      <section className="py-16 bg-white">
        <div className="section-container">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Our Culture</h2>
            <p className="text-xl text-[#2E2E2E]">
              We're a global, diverse team united by a shared mission and values
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
            <div>
              <img 
                src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=800" 
                alt="Team Collaboration" 
                className="rounded-xl shadow-md mb-6 w-full h-64 object-cover"
              />
              <p className="text-[#2E2E2E]">
                At FreelanceNest, we're passionate about creating a platform that empowers freelancers and businesses alike. Our team is distributed across the globe, bringing diverse perspectives and experiences to solve complex challenges.
              </p>
            </div>
            <div>
              <img 
                src="https://images.unsplash.com/photo-1544531586-fde5298cdd40?auto=format&fit=crop&w=800" 
                alt="Team Event" 
                className="rounded-xl shadow-md mb-6 w-full h-64 object-cover"
              />
              <p className="text-[#2E2E2E]">
                We foster a culture of innovation, collaboration, and continuous learning. Whether you're working remotely or from one of our hub offices, you'll be part of a supportive environment where your ideas matter and your growth is prioritized.
              </p>
            </div>
          </div>

          {/* Values */}
          <div className="max-w-3xl mx-auto text-center mb-8">
            <h3 className="text-2xl font-bold mb-2">Our Core Values</h3>
            <p className="text-[#2E2E2E]">The principles that guide our work and decisions</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value, index) => (
              <div key={index} className="bg-[#ffeee3] rounded-xl p-6">
                <div className="w-10 h-10 bg-[#ffeee3] text-[#FF6B00] rounded-full flex items-center justify-center mb-4">
                  {index + 1}
                </div>
                <h4 className="text-xl font-bold mb-2">{value.title}</h4>
                <p className="text-[#2E2E2E]">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="py-16">
        <div className="section-container">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Why Join Us</h2>
            <p className="text-xl text-[#2E2E2E]">
              Beyond competitive salaries, we offer benefits that support your wellbeing and growth
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {benefits.map((benefit, index) => (
              <div key={index} className="bg-white shadow-sm hover:shadow-md rounded-xl p-6 transition-shadow duration-200">
                <div className="w-12 h-12 bg-[#ffeee3] text-[#FF6B00] rounded-full flex items-center justify-center mb-4">
                  {benefit.icon}
                </div>
                <h3 className="text-xl font-bold mb-2">{benefit.title}</h3>
                <p className="text-[#2E2E2E]">{benefit.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Open Positions */}
      <section className="py-16 bg-white">
        <div className="section-container">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Open Positions</h2>
            <p className="text-xl text-[#2E2E2E]">
              Find your perfect role in our growing team
            </p>
          </div>

          {/* Search and filters */}
          <div className="max-w-4xl mx-auto mb-8">
            <div className="bg-[#ffeee3] rounded-xl p-4 md:p-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="col-span-1 md:col-span-3">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#ffeee3]" />
                    <input 
                      type="text"
                      placeholder="Search positions..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="w-full pl-10 pr-4 py-3 rounded-lg border border-[#ffeee3] focus:outline-none focus:ring-2 focus:ring-[#ffeee3]0"
                    />
                  </div>
                </div>
                <div className="relative">
                  <div className="flex items-center border border-[#ffeee3] rounded-lg bg-white">
                    <Filter className="ml-3 text-[#ffeee3]" />
                    <select
                      value={selectedDepartment}
                      onChange={(e) => setSelectedDepartment(e.target.value)}
                      className="appearance-none w-full pl-2 pr-8 py-3 focus:outline-none text-[#2E2E2E] bg-transparent"
                    >
                      {departments.map((dept) => (
                        <option key={dept} value={dept}>{dept} Department</option>
                      ))}
                    </select>
                    <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-[#ffeee3] pointer-events-none" />
                  </div>
                </div>
                <div className="relative">
                  <div className="flex items-center border border-[#ffeee3] rounded-lg bg-white">
                    <MapPin className="ml-3 text-[#ffeee3]" />
                    <select
                      value={selectedLocation}
                      onChange={(e) => setSelectedLocation(e.target.value)}
                      className="appearance-none w-full pl-2 pr-8 py-3 focus:outline-none text-[#2E2E2E] bg-transparent"
                    >
                      {locations.map((loc) => (
                        <option key={loc} value={loc}>{loc} Location</option>
                      ))}
                    </select>
                    <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-[#ffeee3] pointer-events-none" />
                  </div>
                </div>
                <button
                  onClick={() => {
                    setSearchQuery('');
                    setSelectedDepartment('All');
                    setSelectedLocation('All');
                  }}
                  className="text-[#FF6B00] hover:text-[#FF9F45] font-medium"
                >
                  Clear Filters
                </button>
              </div>
            </div>
          </div>

          {/* Job listings */}
          <div className="max-w-4xl mx-auto">
            <div className="space-y-4">
              {filteredJobs.length > 0 ? (
                filteredJobs.map((job) => (
                  <div 
                    key={job.id} 
                    className="bg-white shadow-sm hover:shadow-md rounded-xl overflow-hidden transition-shadow duration-200"
                  >
                    <div className="p-6">
                      <div className="flex justify-between items-start mb-4">
                        <div>
                          <h3 className="text-xl font-bold">{job.title}</h3>
                          <div className="mt-1 flex flex-wrap gap-2">
                            <span className="inline-flex items-center text-sm text-[#2E2E2E]">
                              <Building className="w-4 h-4 mr-1" />
                              {job.department}
                            </span>
                            <span className="inline-flex items-center text-sm text-[#2E2E2E]">
                              <MapPin className="w-4 h-4 mr-1" />
                              {job.location}
                            </span>
                            <span className="inline-flex items-center text-sm text-[#2E2E2E]">
                              <Clock className="w-4 h-4 mr-1" />
                              {job.type}
                            </span>
                          </div>
                        </div>
                        <div className="text-sm text-[#ffeee3]">Posted {job.postedDate}</div>
                      </div>
                      <p className="text-[#2E2E2E] mb-4">{job.description}</p>
                      <button className="bg-[#2E2E2E] text-white px-6 py-3 rounded-lg font-semibold hover:bg-[#FF9F45] transition-all-sm">View Position</button>
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center py-12">
                  <div className="text-[#ffeee3] mb-2">No positions found matching your criteria.</div>
                  <div className="text-[#2E2E2E]">Try adjusting your search or filters.</div>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Not Finding a Role CTA */}
      <section className="py-16 bg-[#2E2E2E] text-white">
        <div className="section-container">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Don't See a Perfect Match?</h2>
            <p className="text-xl mb-8 text-[#ffeee3]">
              We're always interested in connecting with talented individuals who are passionate about our mission, even if we don't have an open role that matches your skills right now.
            </p>
            <button className="bg-white text-[#FF6B00] border-2 border-[#FF6B00] px-6 py-3 rounded-lg font-semibold hover:bg-[#2E2E2E] hover:text-white transition-all">
              Submit Open Application
            </button>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 bg-white">
        <div className="section-container">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Meet Our Team</h2>
            <p className="text-xl text-[#2E2E2E]">
              Hear from the people who make FreelanceNest an amazing place to work
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-[#ffeee3] rounded-xl p-6">
              <div className="mb-6">
                <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-[#FF6B00]">
                  <path d="M9.33333 14.6667H4V9.33333H9.33333V14.6667ZM9.33333 22.6667H4V17.3333H9.33333V22.6667ZM17.3333 14.6667H12V9.33333H17.3333V14.6667ZM17.3333 22.6667H12V17.3333H17.3333V22.6667ZM25.3333 14.6667H20V9.33333H25.3333V14.6667ZM25.3333 22.6667H20V17.3333H25.3333V22.6667Z" fill="currentColor"/>
                </svg>
              </div>
              <p className="italic mb-6 text-[#2E2E2E]">
                "Working at FreelanceNest has been the most rewarding experience of my career. The team is incredibly supportive, and I've had the opportunity to work on challenging problems that have a real impact on millions of users."
              </p>
              <div className="flex items-center">
                <img 
                  src="https://randomuser.me/api/portraits/women/45.jpg" 
                  alt="Team Member" 
                  className="w-12 h-12 rounded-full mr-4 object-cover"
                />
                <div>
                  <div className="font-bold">Sophia Chen</div>
                  <div className="text-[#ffeee3] text-sm">Senior Product Manager</div>
                </div>
              </div>
            </div>
            <div className="bg-[#ffeee3] rounded-xl p-6">
              <div className="mb-6">
                <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-[#FF6B00]">
                  <path d="M9.33333 14.6667H4V9.33333H9.33333V14.6667ZM9.33333 22.6667H4V17.3333H9.33333V22.6667ZM17.3333 14.6667H12V9.33333H17.3333V14.6667ZM17.3333 22.6667H12V17.3333H17.3333V22.6667ZM25.3333 14.6667H20V9.33333H25.3333V14.6667ZM25.3333 22.6667H20V17.3333H25.3333V22.6667Z" fill="currentColor"/>
                </svg>
              </div>
              <p className="italic mb-6 text-[#2E2E2E]">
                "I joined FreelanceNest as a junior developer three years ago and have grown tremendously both professionally and personally. The remote-first culture, learning opportunities, and talented colleagues make this the best place I've ever worked."
              </p>
              <div className="flex items-center">
                <img 
                  src="https://randomuser.me/api/portraits/men/32.jpg" 
                  alt="Team Member" 
                  className="w-12 h-12 rounded-full mr-4 object-cover"
                />
                <div>
                  <div className="font-bold">James Wilson</div>
                  <div className="text-[#ffeee3] text-sm">Software Engineer</div>
                </div>
              </div>
            </div>
            <div className="bg-[#ffeee3] rounded-xl p-6">
              <div className="mb-6">
                <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-[#FF6B00]">
                  <path d="M9.33333 14.6667H4V9.33333H9.33333V14.6667ZM9.33333 22.6667H4V17.3333H9.33333V22.6667ZM17.3333 14.6667H12V9.33333H17.3333V14.6667ZM17.3333 22.6667H12V17.3333H17.3333V22.6667ZM25.3333 14.6667H20V9.33333H25.3333V14.6667ZM25.3333 22.6667H20V17.3333H25.3333V22.6667Z" fill="currentColor"/>
                </svg>
              </div>
              <p className="italic mb-6 text-[#2E2E2E]">
                "The work-life balance at FreelanceNest is unmatched. I appreciate how the company genuinely cares about employee wellbeing while still maintaining a high-performance culture where we're constantly innovating and improving."
              </p>
              <div className="flex items-center">
                <img 
                  src="https://randomuser.me/api/portraits/women/68.jpg" 
                  alt="Team Member" 
                  className="w-12 h-12 rounded-full mr-4 object-cover"
                />
                <div>
                  <div className="font-bold">Maria Lopez</div>
                  <div className="text-[#ffeee3] text-sm">Marketing Director</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Apply CTA */}
      <section className="py-16">
        <div className="section-container">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Join Our Team?</h2>
            <p className="text-xl text-[#2E2E2E] mb-8">
              Explore our open positions and take the first step toward an exciting new career opportunity.
            </p>
            <button className="bg-[#2E2E2E] text-white px-6 py-3 rounded-lg font-semibold hover:bg-[#FF9F45] transition-all">
              View All Positions
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default CareersPage;















