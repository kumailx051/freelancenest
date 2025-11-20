import React from 'react';

// Sample talent data
const talents = [
  {
    id: 1,
    name: 'Sarah Johnson',
    title: 'UI/UX Designer',
    rating: 4.9,
    reviews: 142,
    hourlyRate: 65,
    location: 'San Francisco, USA',
    skills: ['UI Design', 'User Research', 'Figma', 'Adobe XD', 'Prototyping'],
    avatar: 'https://randomuser.me/api/portraits/women/44.jpg'
  },
  {
    id: 2,
    name: 'Michael Chen',
    title: 'Full Stack Developer',
    rating: 4.8,
    reviews: 97,
    hourlyRate: 85,
    location: 'Toronto, Canada',
    skills: ['React', 'Node.js', 'MongoDB', 'TypeScript', 'AWS'],
    avatar: 'https://randomuser.me/api/portraits/men/32.jpg'
  },
  {
    id: 3,
    name: 'Priya Sharma',
    title: 'Digital Marketing Specialist',
    rating: 4.7,
    reviews: 78,
    hourlyRate: 55,
    location: 'London, UK',
    skills: ['SEO', 'Content Strategy', 'Google Analytics', 'Social Media', 'PPC'],
    avatar: 'https://randomuser.me/api/portraits/women/63.jpg'
  },
  {
    id: 4,
    name: 'David Wilson',
    title: 'Mobile App Developer',
    rating: 4.9,
    reviews: 124,
    hourlyRate: 90,
    location: 'Berlin, Germany',
    skills: ['Swift', 'Kotlin', 'React Native', 'Flutter', 'Firebase'],
    avatar: 'https://randomuser.me/api/portraits/men/42.jpg'
  },
  {
    id: 5,
    name: 'Emma Rodriguez',
    title: 'Graphic Designer',
    rating: 4.8,
    reviews: 86,
    hourlyRate: 60,
    location: 'Barcelona, Spain',
    skills: ['Illustration', 'Branding', 'Adobe Illustrator', 'Photoshop', 'Logo Design'],
    avatar: 'https://randomuser.me/api/portraits/women/33.jpg'
  },
  {
    id: 6,
    name: 'James Lee',
    title: 'Back-End Developer',
    rating: 4.7,
    reviews: 92,
    hourlyRate: 75,
    location: 'Sydney, Australia',
    skills: ['Python', 'Django', 'PostgreSQL', 'Docker', 'CI/CD'],
    avatar: 'https://randomuser.me/api/portraits/men/68.jpg'
  }
];

// Sample categories
const categories = [
  { name: 'Development & IT', count: '1,543 talents' },
  { name: 'Design & Creative', count: '987 talents' },
  { name: 'Sales & Marketing', count: '753 talents' },
  { name: 'Writing & Translation', count: '689 talents' },
  { name: 'Admin & Customer Support', count: '541 talents' },
  { name: 'Finance & Accounting', count: '482 talents' },
  { name: 'Legal', count: '327 talents' },
  { name: 'Engineering & Architecture', count: '415 talents' },
];

const TalentMarketplacePage: React.FC = () => {
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
            
            {/* Search Form */}
            <div className="bg-white p-1 rounded-lg shadow-sm border border-[#ffeee3] flex flex-col md:flex-row gap-2 mt-8">
              <input
                type="text"
                placeholder="Search skills, services or talents..."
                className="flex-1 px-4 py-3 rounded-md focus:outline-none focus:ring-2 focus:ring-[#FF6B00]"
              />
              <button className="bg-[#FF6B00] hover:bg-[#FF9F45] text-white font-medium px-6 py-3 rounded-md transition-colors duration-200">
                Search
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-16 bg-white border-b border-[#ffeee3]">
        <div className="section-container">
          <h2 className="text-3xl font-bold mb-12 text-center bg-clip-text text-transparent bg-gradient-to-r from-[#FF6B00] to-[#FF6B00]">Browse by Category</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {categories.map((category) => (
              <a 
                key={category.name}
                href="#" 
                className="group p-6 bg-[#ffeee3]/30 hover:bg-[#ffeee3] rounded-xl border border-[#ffeee3] hover:border-[#FF6B00] transition-all duration-200"
              >
                <h3 className="text-xl font-semibold mb-1 group-hover:text-[#FF6B00] transition-colors text-[#2E2E2E]">
                  {category.name}
                </h3>
                <p className="text-[#2E2E2E]/80">{category.count}</p>
              </a>
            ))}
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
                <select className="appearance-none w-full bg-white border border-[#ffeee3] rounded-lg px-4 py-2 pr-8 focus:outline-none focus:ring-2 focus:ring-[#FF6B00]">
                  <option>Sort by: Featured</option>
                  <option>Highest Rating</option>
                  <option>Lowest Rate</option>
                  <option>Highest Rate</option>
                  <option>Most Reviews</option>
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-[#2E2E2E]">
                  <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                    <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/>
                  </svg>
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {talents.map((talent) => (
              <div key={talent.id} className="bg-white rounded-xl overflow-hidden shadow-sm border border-[#ffeee3] hover:shadow-md transition-shadow hover:border-[#FF6B00]">
                <div className="p-6">
                  <div className="flex items-center mb-4">
                    <img
                      src={talent.avatar}
                      alt={talent.name}
                      className="w-16 h-16 rounded-full object-cover mr-4"
                    />
                    <div>
                      <h3 className="font-bold text-lg text-[#2E2E2E]">{talent.name}</h3>
                      <p className="text-[#2E2E2E]/70">{talent.title}</p>
                    </div>
                  </div>

                  <div className="flex items-center mb-3">
                    <div className="flex items-center text-[#FF6B00] mr-2">
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                      <span className="font-semibold text-[#2E2E2E]">{talent.rating}</span>
                    </div>
                    <span className="text-[#2E2E2E]/60">({talent.reviews} reviews)</span>
                  </div>

                  <div className="flex justify-between items-center mb-4">
                    <div className="text-[#2E2E2E]/70">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 inline mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                      {talent.location}
                    </div>
                    <div className="font-semibold text-[#FF6B00]">${talent.hourlyRate}/hr</div>
                  </div>

                  <div className="flex flex-wrap gap-2 mb-4">
                    {talent.skills.slice(0, 3).map((skill) => (
                      <span key={skill} className="bg-[#ffeee3] text-[#FF6B00] text-sm px-3 py-1 rounded-full">
                        {skill}
                      </span>
                    ))}
                    {talent.skills.length > 3 && (
                      <span className="bg-[#ffeee3]/50 text-[#2E2E2E]/70 text-sm px-3 py-1 rounded-full">
                        +{talent.skills.length - 3}
                      </span>
                    )}
                  </div>

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
            ))}
          </div>

          <div className="mt-12 text-center">
            <button className="bg-white border border-[#ffeee3] hover:bg-[#ffeee3]/30 text-[#2E2E2E] font-medium px-8 py-3 rounded-lg transition-colors duration-200">
              Load More Talents
            </button>
          </div>
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
              <button className="bg-[#FF6B00] hover:bg-[#FF9F45] text-white font-medium px-8 py-4 rounded-lg transition-colors duration-200 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-0.5">
                Post a Job
              </button>
              <button className="bg-white border border-[#FF6B00] hover:bg-[#ffeee3]/30 text-[#2E2E2E] font-medium px-8 py-4 rounded-lg transition-colors duration-200 shadow-md hover:shadow-lg transition-all duration-300 hover:-translate-y-0.5">
                Browse More Talents
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default TalentMarketplacePage;
