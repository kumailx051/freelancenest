import React, { useState } from 'react';

// Sample project data
const projects = [
  {
    id: 1,
    title: 'Professional Logo Design',
    category: 'Design & Creative',
    price: 99,
    deliveryTime: '2 days',
    rating: 4.9,
    reviews: 853,
    image: 'https://images.unsplash.com/photo-1626785774573-4b799315345d?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
    seller: {
      name: 'Creative Designs Pro',
      avatar: 'https://randomuser.me/api/portraits/women/44.jpg',
      level: 'Top Rated'
    }
  },
  {
    id: 2,
    title: 'WordPress Website Development',
    category: 'Development & IT',
    price: 299,
    deliveryTime: '7 days',
    rating: 4.8,
    reviews: 621,
    image: 'https://images.unsplash.com/photo-1561736778-92e52a7769ef?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
    seller: {
      name: 'WebDevMasters',
      avatar: 'https://randomuser.me/api/portraits/men/32.jpg',
      level: 'Level 2'
    }
  },
  {
    id: 3,
    title: 'SEO Website Audit & Strategy',
    category: 'Sales & Marketing',
    price: 149,
    deliveryTime: '3 days',
    rating: 4.7,
    reviews: 438,
    image: 'https://images.unsplash.com/photo-1533750349088-cd871a92f312?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
    seller: {
      name: 'SEO Experts',
      avatar: 'https://randomuser.me/api/portraits/women/63.jpg',
      level: 'Top Rated'
    }
  },
  {
    id: 4,
    title: 'Social Media Content Creation',
    category: 'Sales & Marketing',
    price: 129,
    deliveryTime: '5 days',
    rating: 4.6,
    reviews: 372,
    image: 'https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
    seller: {
      name: 'Social Media Hub',
      avatar: 'https://randomuser.me/api/portraits/men/42.jpg',
      level: 'Level 2'
    }
  },
  {
    id: 5,
    title: 'Animated Explainer Video',
    category: 'Video & Animation',
    price: 349,
    deliveryTime: '10 days',
    rating: 4.9,
    reviews: 284,
    image: 'https://images.unsplash.com/photo-1574717025058-2f8737d2e2b7?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
    seller: {
      name: 'Motion Arts Studio',
      avatar: 'https://randomuser.me/api/portraits/women/33.jpg',
      level: 'Top Rated'
    }
  },
  {
    id: 6,
    title: 'Professional Resume Writing',
    category: 'Writing & Translation',
    price: 79,
    deliveryTime: '2 days',
    rating: 4.8,
    reviews: 527,
    image: 'https://images.unsplash.com/photo-1586281380117-5a60ae2050cc?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
    seller: {
      name: 'Resume Craft',
      avatar: 'https://randomuser.me/api/portraits/men/68.jpg',
      level: 'Level 2'
    }
  },
  {
    id: 7,
    title: 'Mobile App UI/UX Design',
    category: 'Design & Creative',
    price: 199,
    deliveryTime: '6 days',
    rating: 4.7,
    reviews: 315,
    image: 'https://images.unsplash.com/photo-1609921212029-bb5a28e60960?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
    seller: {
      name: 'Mobile UX Studio',
      avatar: 'https://randomuser.me/api/portraits/women/58.jpg',
      level: 'Top Rated'
    }
  },
  {
    id: 8,
    title: 'E-commerce Store Setup',
    category: 'Development & IT',
    price: 299,
    deliveryTime: '8 days',
    rating: 4.8,
    reviews: 392,
    image: 'https://images.unsplash.com/photo-1556742502-ec7c0e9f34b1?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
    seller: {
      name: 'E-commerce Experts',
      avatar: 'https://randomuser.me/api/portraits/men/22.jpg',
      level: 'Level 2'
    }
  }
];

// Sample categories
const categories = [
  { id: 1, name: 'Development & IT', icon: '💻' },
  { id: 2, name: 'Design & Creative', icon: '🎨' },
  { id: 3, name: 'Sales & Marketing', icon: '📊' },
  { id: 4, name: 'Writing & Translation', icon: '✍️' },
  { id: 5, name: 'Video & Animation', icon: '🎬' },
  { id: 6, name: 'Music & Audio', icon: '🎵' },
  { id: 7, name: 'Admin & Customer Support', icon: '🤝' },
  { id: 8, name: 'Finance & Accounting', icon: '💰' }
];

const ProjectCatalogPage: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [priceRange, setPriceRange] = useState<number>(500);

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
              <span className="bg-gradient-to-r from-[#FF6B00] to-[#FF6B00] bg-clip-text text-transparent">Project</span> Catalog
            </h1>
            <p className="text-xl text-[#ffeee3] mb-4">
              Explore pre-packaged projects with clear deliverables and fixed prices for quick solutions.
            </p>
          </div>
        </div>
      </section>

      {/* Platform Categories with padding - removed sticky positioning */}
      <div className="bg-white border-b border-[#ffeee3]">
        <div className="section-container overflow-x-auto">
          <div className="flex space-x-8 py-3 min-w-max">
            <button
              onClick={() => setActiveCategory('All')}
              className={`whitespace-nowrap font-medium flex items-center ${
                activeCategory === 'All'
                  ? 'text-[#FF6B00] border-b-2 border-[#FF6B00] pb-2'
                  : 'text-[#2E2E2E] hover:text-[#FF6B00]'
              }`}
            >
              All Projects
            </button>
            
            <a href="#" className="text-[#2E2E2E] hover:text-[#FF6B00] whitespace-nowrap font-medium flex items-center">
              Trending 🔥
            </a>
            
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setActiveCategory(category.name)}
                className={`whitespace-nowrap font-medium flex items-center ${
                  activeCategory === category.name
                    ? 'text-[#FF6B00] border-b-2 border-[#FF6B00] pb-2'
                    : 'text-[#2E2E2E] hover:text-[#FF6B00]'
                }`}
              >
                {category.icon} <span className="ml-1">{category.name}</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="section-container py-8">
        <div className="flex flex-col md:flex-row gap-8">
          {/* Filters Sidebar */}
          <div className="md:w-64 flex-shrink-0">
            <div className="bg-white p-6 rounded-lg border border-[#ffeee3] sticky top-32">
              <h3 className="font-bold text-lg mb-4 text-[#2E2E2E]">Filters</h3>
              
              {/* Price Range */}
              <div className="mb-6">
                <label className="font-medium text-[#2E2E2E] block mb-2">Price Range</label>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[#2E2E2E]/70">$0</span>
                  <span className="text-[#2E2E2E]/70">${priceRange}</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="1000"
                  value={priceRange}
                  onChange={(e) => setPriceRange(parseInt(e.target.value))}
                  className="w-full h-2 bg-[#ffeee3] rounded-lg appearance-none cursor-pointer"
                />
              </div>
              
              {/* Delivery Time */}
              <div className="mb-6">
                <label className="font-medium text-[#2E2E2E] block mb-2">Delivery Time</label>
                <div className="space-y-2">
                  {['1 day or less', '2-3 days', 'Up to 7 days', 'Any time'].map((option) => (
                    <div key={option} className="flex items-center">
                      <input 
                        id={option} 
                        type="checkbox" 
                        className="h-4 w-4 text-[#FF6B00] border-[#ffeee3] rounded"
                      />
                      <label htmlFor={option} className="ml-2 text-[#2E2E2E]">{option}</label>
                    </div>
                  ))}
                </div>
              </div>
              
              {/* Seller Level */}
              <div className="mb-6">
                <label className="font-medium text-[#2E2E2E] block mb-2">Seller Level</label>
                <div className="space-y-2">
                  {['Top Rated', 'Level 2', 'Level 1', 'New Seller'].map((level) => (
                    <div key={level} className="flex items-center">
                      <input 
                        id={level} 
                        type="checkbox" 
                        className="h-4 w-4 text-[#FF6B00] border-[#ffeee3] rounded"
                      />
                      <label htmlFor={level} className="ml-2 text-[#2E2E2E]">{level}</label>
                    </div>
                  ))}
                </div>
              </div>
              
              {/* Pro Services */}
              <div className="mb-6">
                <div className="flex items-center">
                  <input 
                    id="proServices" 
                    type="checkbox" 
                    className="h-4 w-4 text-[#FF6B00] border-[#ffeee3] rounded"
                  />
                  <label htmlFor="proServices" className="ml-2 text-[#2E2E2E] font-medium">Pro Services Only</label>
                </div>
              </div>
              
              {/* Apply button */}
              <button className="w-full bg-[#FF6B00] hover:bg-[#FF9F45] text-white font-medium px-4 py-2 rounded-lg transition-colors duration-200">
                Apply Filters
              </button>
            </div>
          </div>

          {/* Projects Grid */}
          <div className="flex-1">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-[#2E2E2E]">
                {activeCategory === 'All' ? 'All Projects' : activeCategory}
              </h2>
              
              <div className="relative">
                <select className="appearance-none bg-white border border-[#ffeee3] rounded-lg px-4 py-2 pr-8 focus:outline-none focus:ring-2 focus:ring-[#FF6B00]">
                  <option>Sort by: Featured</option>
                  <option>Highest Rating</option>
                  <option>Price: Low to High</option>
                  <option>Price: High to Low</option>
                  <option>Fastest Delivery</option>
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-[#2E2E2E]">
                  <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                    <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/>
                  </svg>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {projects.map((project) => (
                <div key={project.id} className="bg-white rounded-lg overflow-hidden shadow-sm border border-[#ffeee3] hover:shadow-md transition-shadow">
                  {/* Project Image */}
                  <div className="h-48 overflow-hidden relative">
                    <img
                      src={project.image}
                      alt={project.title}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute top-3 left-3">
                      <span className="bg-white text-[#2E2E2E] text-xs font-medium px-2 py-1 rounded">
                        {project.category}
                      </span>
                    </div>
                  </div>
                  
                  {/* Project Details */}
                  <div className="p-5">
                    <div className="flex items-center mb-3">
                      <img 
                        src={project.seller.avatar} 
                        alt={project.seller.name} 
                        className="w-8 h-8 rounded-full mr-2"
                      />
                      <div>
                        <h4 className="text-sm font-medium">{project.seller.name}</h4>
                        <span className="text-xs text-[#FF6B00]">{project.seller.level}</span>
                      </div>
                    </div>
                    
                    <h3 className="text-lg font-semibold mb-2 line-clamp-2 h-14">
                      {project.title}
                    </h3>
                    
                    <div className="flex items-center text-[#FF6B00] mb-3">
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                      <span className="ml-1 text-sm font-medium text-[#2E2E2E]">{project.rating}</span>
                      <span className="mx-1 text-[#2E2E2E]">·</span>
                      <span className="text-sm text-[#2E2E2E]">({project.reviews})</span>
                    </div>
                    
                    <div className="border-t border-[#ffeee3] pt-3 mt-3">
                      <div className="flex items-center justify-between">
                        <span className="text-[#2E2E2E] text-sm">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 inline mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                          {project.deliveryTime}
                        </span>
                        <span className="font-bold text-lg">${project.price}</span>
                      </div>
                    </div>
                  </div>
                  
                  {/* Project Action */}
                  <div className="px-5 pb-5">
                    <button className="w-full bg-[#FF6B00] hover:bg-[#FF9F45] text-white font-medium py-2 rounded transition-colors duration-200">
                      View Details
                    </button>
                  </div>
                </div>
              ))}
            </div>
            
            {/* Pagination */}
            <div className="mt-12 flex justify-center">
              <nav className="flex items-center">
                <button className="px-3 py-1 rounded-md mr-1 bg-white border border-[#ffeee3] text-[#2E2E2E] hover:bg-[#ffeee3]">
                  Previous
                </button>
                {[1, 2, 3, 4, 5].map((page) => (
                  <button
                    key={page}
                    className={`px-3 py-1 rounded-md mx-1 ${
                      page === 1
                        ? 'bg-[#FF6B00] text-white'
                        : 'bg-white border border-[#ffeee3] text-[#2E2E2E] hover:bg-[#ffeee3]'
                    }`}
                  >
                    {page}
                  </button>
                ))}
                <button className="px-3 py-1 rounded-md ml-1 bg-white border border-[#ffeee3] text-[#2E2E2E] hover:bg-[#ffeee3]">
                  Next
                </button>
              </nav>
            </div>
          </div>
        </div>
      </div>

      {/* How It Works Section */}
      <section className="py-16 bg-[#ffeee3]/30 border-t border-[#ffeee3]">
        <div className="section-container">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <h2 className="text-3xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-[#FF6B00] to-[#FF6B00]">How Project Catalog Works</h2>
            <p className="text-xl text-[#2E2E2E]">
              Get started with a pre-packaged project in three simple steps
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-xl shadow-sm text-center hover:border-[#FF6B00] border-2 border-transparent transition-all duration-200">
              <div className="bg-[#ffeee3] text-[#FF6B00] rounded-full w-14 h-14 flex items-center justify-center mx-auto mb-6 text-2xl font-bold">
                1
              </div>
              <h3 className="text-xl font-bold mb-3 text-[#2E2E2E]">Browse Projects</h3>
              <p className="text-[#2E2E2E]/80">
                Explore our catalog to find a project that matches your needs. Filter by category, budget, and delivery time.
              </p>
            </div>
            
            <div className="bg-white p-8 rounded-xl shadow-sm text-center hover:border-[#FF6B00] border-2 border-transparent transition-all duration-200">
              <div className="bg-[#ffeee3] text-[#FF6B00] rounded-full w-14 h-14 flex items-center justify-center mx-auto mb-6 text-2xl font-bold">
                2
              </div>
              <h3 className="text-xl font-bold mb-3 text-[#2E2E2E]">Purchase & Brief</h3>
              <p className="text-[#2E2E2E]/80">
                Buy your selected project and provide the necessary details for the freelancer to get started.
              </p>
            </div>
            
            <div className="bg-white p-8 rounded-xl shadow-sm text-center hover:border-[#FF6B00] border-2 border-transparent transition-all duration-200">
              <div className="bg-[#ffeee3] text-[#FF6B00] rounded-full w-14 h-14 flex items-center justify-center mx-auto mb-6 text-2xl font-bold">
                3
              </div>
              <h3 className="text-xl font-bold mb-3 text-[#2E2E2E]">Review & Approve</h3>
              <p className="text-[#2E2E2E]/80">
                Receive the work and request revisions if needed. Once satisfied, approve the delivery.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-[#FF6B00] text-white">
        <div className="section-container">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-6">Don't see what you're looking for?</h2>
            <p className="text-xl opacity-90 mb-8">
              Create a custom job and get matched with talented freelancers ready to work on your specific project.
            </p>
            <button className="bg-[#ffeee3] text-[#2E2E2E] hover:bg-white font-medium px-8 py-4 rounded-lg transition-colors duration-200 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-0.5">
              Post a Custom Job
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ProjectCatalogPage;
