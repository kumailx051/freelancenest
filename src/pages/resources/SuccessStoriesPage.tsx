import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Search, Star, ArrowRight, ChevronRight, Globe } from 'lucide-react';

const SuccessStoriesPage: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');

  // Featured success stories
  const featuredStories = [
    {
      id: 1,
      name: "Sarah Johnson",
      title: "From Corporate Employee to Six-Figure Freelancer",
      image: "https://randomuser.me/api/portraits/women/23.jpg",
      category: "Web Development",
      rating: 5,
      excerpt: "After 8 years in corporate IT, I took the leap to freelance web development. Within a year, I was earning more than my old salary with half the working hours.",
      quote: "FreelanceNest gave me the tools and connections to build a thriving business that works around my life, not the other way around.",
      readTime: "5 min",
      revenue: "$135,000",
      featured: true
    },
    {
      id: 2,
      name: "Michael Chen",
      title: "Building a Design Agency from Scratch",
      image: "https://randomuser.me/api/portraits/men/34.jpg",
      category: "Graphic Design",
      rating: 5,
      excerpt: "Starting as a solo designer taking small projects, I grew my freelance business into a boutique agency with five team members in just 18 months.",
      quote: "The enterprise connections I made through FreelanceNest became the foundation of my agency's client roster.",
      readTime: "6 min",
      revenue: "$240,000",
      featured: true
    }
  ];

  // Regular success stories
  const regularStories = [
    {
      id: 3,
      name: "Elena Rodriguez",
      title: "Finding Work-Life Balance Through Freelancing",
      image: "https://randomuser.me/api/portraits/women/65.jpg",
      category: "Content Writing",
      rating: 5,
      excerpt: "As a new mom, traditional employment wasn't working for me. Freelancing let me continue my writing career while being present for my family.",
      quote: "I earn more now working 25 hours a week than I did working 40+ hours in my old job.",
      readTime: "4 min",
      revenue: "$85,000"
    },
    {
      id: 4,
      name: "David Okafor",
      title: "From Local Market to Global Clients",
      image: "https://randomuser.me/api/portraits/men/54.jpg",
      category: "Video Production",
      rating: 4.5,
      excerpt: "Based in Lagos, I was limited to local video production work until I joined FreelanceNest. Now I create content for clients around the world.",
      quote: "The platform removed geographic barriers, giving me access to opportunities I never thought possible.",
      readTime: "5 min",
      revenue: "$65,000"
    },
    {
      id: 5,
      name: "Sophia Patel",
      title: "Turning Specialized Knowledge Into a Business",
      image: "https://randomuser.me/api/portraits/women/45.jpg",
      category: "Marketing Strategy",
      rating: 5,
      excerpt: "My background in pharmaceutical marketing was niche, but through FreelanceNest, I found clients who value my specific industry expertise.",
      quote: "I've become known as the go-to consultant in my field, commanding premium rates for specialized knowledge.",
      readTime: "7 min",
      revenue: "$180,000"
    },
    {
      id: 6,
      name: "James Wilson",
      title: "Career Transition Success Story",
      image: "https://randomuser.me/api/portraits/men/22.jpg",
      category: "Software Development",
      rating: 5,
      excerpt: "After 15 years in finance, I retrained as a developer. FreelanceNest helped me build a portfolio and find my first clients during my career transition.",
      quote: "Starting over in a new field was intimidating, but the platform made it possible to gain traction quickly.",
      readTime: "6 min",
      revenue: "$95,000"
    }
  ];

  // Success metrics
  const successMetrics = [
    {
      number: "1.2M+",
      label: "Freelancers Earning"
    },
    {
      number: "$4.8B",
      label: "Annual Earnings"
    },
    {
      number: "190+",
      label: "Countries Represented"
    },
    {
      number: "92%",
      label: "Satisfaction Rate"
    }
  ];

  // Testimonial carousel items
  const testimonials = [
    {
      quote: "FreelanceNest has completely transformed how I think about work. I now earn more than I ever did in traditional employment, and I control when and how I work.",
      name: "Taylor Reid",
      role: "UX/UI Designer",
      image: "https://randomuser.me/api/portraits/women/28.jpg"
    },
    {
      quote: "The quality of clients on this platform is outstanding. I've built relationships with Fortune 500 companies that I couldn't have accessed otherwise.",
      name: "Marcus Johnson",
      role: "Business Consultant",
      image: "https://randomuser.me/api/portraits/men/32.jpg"
    },
    {
      quote: "As someone living in a rural area, FreelanceNest opened up opportunities that simply didn't exist locally. Now I work with clients around the world.",
      name: "Emma Davis",
      role: "Content Strategist",
      image: "https://randomuser.me/api/portraits/women/33.jpg"
    }
  ];

  // Handle search input change
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  return (
    <div className="min-h-screen bg-[#ffeee3]">
      {/* Hero Section */}
      <section className="pt-40 pb-20 bg-[#2E2E2E]">
        <div className="section-container">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Success <span className="bg-gradient-to-r from-[#FF6B00] to-orange-500 bg-clip-text text-transparent">Stories</span>
            </h1>
            <p className="text-xl text-[#ffeee3] mb-8">
              Discover how freelancers are transforming their careers and achieving their goals on FreelanceNest
            </p>
            
            {/* Search Box */}
            <div className="relative max-w-2xl mx-auto">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-[#ffeee3]" />
              </div>
              <input
                type="text"
                placeholder="Search success stories..."
                value={searchQuery}
                onChange={handleSearchChange}
                className="pl-12 pr-4 py-4 w-full rounded-xl bg-white focus:outline-none focus:ring-2 focus:ring-[#FF6B00] shadow-lg text-[#2E2E2E]"
              />
            </div>
          </div>
        </div>
        
        {/* Success Metrics */}
        <div className="max-w-5xl mx-auto mt-16">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8">
            {successMetrics.map((metric, index) => (
              <div key={index} className="bg-white/10 backdrop-blur-sm rounded-lg p-6 text-center">
                <div className="text-3xl md:text-4xl font-bold text-[#FF6B00] mb-2">
                  {metric.number}
                </div>
                <div className="text-[#ffeee3]">
                  {metric.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Stories */}
      <section className="py-24 -mt-12">
        <div className="section-container">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold text-[#2E2E2E] mb-12 text-center">Featured Success Stories</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              {featuredStories.map((story) => (
                <div key={story.id} className="bg-white rounded-xl overflow-hidden shadow-md border border-[#ffeee3] hover:border-[#FF6B00] transition-colors duration-200">
                  <div className="relative">
                    <div className="absolute top-0 left-0 bg-[#FF6B00] text-white text-xs font-bold px-3 py-1 rounded-br">
                      FEATURED
                    </div>
                    <div className="p-12 flex flex-col md:flex-row gap-8">
                      <div className="md:w-1/3 flex flex-col items-center text-center">
                        <img 
                          src={story.image} 
                          alt={story.name}
                          className="w-32 h-32 rounded-full object-cover border-4 border-white shadow mb-4"
                        />
                        <h3 className="font-bold text-lg text-[#2E2E2E]">{story.name}</h3>
                        <div className="text-sm text-[#2E2E2E] mb-2">{story.category}</div>
                        <div className="flex items-center mb-4">
                          {[...Array(5)].map((_, i) => (
                            <Star 
                              key={i} 
                              className={`w-4 h-4 ${i < Math.floor(story.rating) ? 'text-[#FF6B00] fill-[#FF6B00]' : 'text-[#ffeee3]'}`}
                            />
                          ))}
                        </div>
                        <div className="text-sm bg-[#ffeee3] text-[#FF6B00] px-3 py-1 rounded-full font-medium">
                          {story.revenue}/year
                        </div>
                      </div>
                      
                      <div className="md:w-2/3">
                        <h2 className="text-xl font-bold text-[#2E2E2E] mb-4">{story.title}</h2>
                        <p className="text-[#2E2E2E] mb-4">
                          {story.excerpt}
                        </p>
                        <blockquote className="border-l-4 border-[#FF6B00] pl-4 italic text-[#2E2E2E] mb-6">
                          "{story.quote}"
                        </blockquote>
                        <div className="flex justify-between items-center">
                          <span className="text-sm text-[#ffeee3]">{story.readTime} read</span>
                          <Link 
                            to={`/success-story/${story.id}`}
                            className="text-[#FF6B00] hover:text-orange-600 font-medium flex items-center"
                          >
                            Read Full Story
                            <ArrowRight className="ml-1 w-4 h-4" />
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Category Filter and Regular Stories */}
      <section className="py-16">
        <div className="section-container">
          <div className="max-w-6xl mx-auto">
            {/* Centered Title */}
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-[#2E2E2E]">More Success Stories</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {regularStories.map((story) => (
                <div key={story.id} className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md border border-[#ffeee3] hover:border-[#FF6B00] transition-all duration-200">
                  <div className="p-6">
                    <div className="flex items-center mb-4">
                      <img 
                        src={story.image} 
                        alt={story.name}
                        className="w-12 h-12 rounded-full object-cover mr-4"
                      />
                      <div>
                        <h3 className="font-bold text-[#2E2E2E]">{story.name}</h3>
                        <div className="text-sm text-[#2E2E2E]">{story.category}</div>
                      </div>
                    </div>
                    
                    <h2 className="text-xl font-bold text-[#2E2E2E] mb-3">{story.title}</h2>
                    <p className="text-[#2E2E2E] mb-4 line-clamp-3">
                      {story.excerpt}
                    </p>
                    
                    <div className="flex justify-between items-center mb-4">
                      <div className="flex items-center">
                        <div className="text-sm bg-[#ffeee3] text-[#FF6B00] px-2 py-0.5 rounded-full font-medium">
                          {story.revenue}/year
                        </div>
                      </div>
                      <span className="text-sm text-[#ffeee3]">{story.readTime} read</span>
                    </div>
                    
                    <Link 
                      to={`/success-story/${story.id}`}
                      className="w-full bg-white border border-[#FF6B00] text-[#FF6B00] hover:bg-[#ffeee3] font-medium py-2 rounded-lg transition-colors duration-200 inline-block text-center"
                    >
                      Read Story
                    </Link>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="mt-10 text-center">
              <button className="bg-white border border-[#FF6B00] text-[#FF6B00] hover:bg-[#ffeee3] font-medium px-6 py-3 rounded-lg transition-colors duration-200 inline-flex items-center">
                Load More Stories
                <ChevronRight className="ml-1 w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Carousel */}
      <section className="py-16 bg-[#2E2E2E] text-white">
        <div className="section-container">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold mb-12 text-center">
              What <span className="bg-gradient-to-r from-[#FF6B00] to-orange-500 bg-clip-text text-transparent">Freelancers</span> Are Saying
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {testimonials.map((testimonial, index) => (
                <div key={index} className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-[#ffeee3] hover:border-[#FF6B00] transition-colors duration-200">
                  <div className="mb-6">
                    <svg className="h-8 w-8 text-[#FF6B00]" fill="currentColor" viewBox="0 0 32 32">
                      <path d="M9.352 4C4.456 7.456 1 13.12 1 19.36c0 5.088 3.072 8.064 6.624 8.064 3.36 0 5.856-2.688 5.856-5.856 0-3.168-2.208-5.472-5.088-5.472-.576 0-1.344.096-1.536.192.48-3.264 3.552-7.104 6.624-9.024L9.352 4zm16.512 0c-4.8 3.456-8.256 9.12-8.256 15.36 0 5.088 3.072 8.064 6.624 8.064 3.264 0 5.856-2.688 5.856-5.856 0-3.168-2.304-5.472-5.184-5.472-.576 0-1.248.096-1.44.192.48-3.264 3.456-7.104 6.528-9.024L25.864 4z" />
                    </svg>
                  </div>
                  <p className="italic mb-6 text-[#ffeee3]">{testimonial.quote}</p>
                  <div className="flex items-center">
                    <img 
                      src={testimonial.image} 
                      alt={testimonial.name} 
                      className="w-10 h-10 rounded-full mr-3" 
                    />
                    <div>
                      <div className="font-medium">{testimonial.name}</div>
                      <div className="text-sm opacity-80">{testimonial.role}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Global Map Section */}
      <section className="py-16 bg-white">
        <div className="section-container">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-[#2E2E2E] mb-4">Success Around the World</h2>
              <p className="text-xl text-[#2E2E2E]">
                FreelanceNest freelancers are succeeding in over 190 countries
              </p>
            </div>
            
            <div className="relative">
              <div className="bg-[#ffeee3] rounded-xl p-8 flex items-center justify-center">
                <Globe className="w-full h-auto text-[#FF6B00] max-h-80" />
                {/* This is a placeholder. In a real implementation, you would use a proper map visualization library */}
              </div>
              
              <div className="absolute inset-0 flex items-center justify-center">
                <p className="text-[#2E2E2E] text-center max-w-md">
                  This would be an interactive map showing success stories from around the world. 
                  You could click on regions to see local success stories.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-[#ffeee3]">
        <div className="section-container">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-bold text-[#2E2E2E] mb-6">Ready to Write Your Success Story?</h2>
            <p className="text-xl text-[#2E2E2E] mb-8">
              Join thousands of freelancers who are building successful careers on FreelanceNest
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link 
                to="/signup" 
                className="bg-[#FF6B00] hover:bg-orange-600 text-white font-medium px-8 py-4 rounded-lg transition-colors duration-200 inline-block"
              >
                Create Your Account
              </Link>
              <Link
                to="/how-to-find-work"
                className="bg-white border border-[#FF6B00] text-[#FF6B00] hover:bg-orange-50 font-medium px-8 py-4 rounded-lg transition-colors duration-200 inline-block"
              >
                Learn How It Works
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default SuccessStoriesPage;










