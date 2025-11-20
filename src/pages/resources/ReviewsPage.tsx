import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Search, Star, ThumbsUp, MessageSquare, Briefcase, Award, Users, CheckCircle } from 'lucide-react';

const ReviewsPage: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedRating, setSelectedRating] = useState('All');

  // Categories for filter
  const categories = [
    "All", 
    "Development", 
    "Design", 
    "Writing", 
    "Marketing", 
    "Video & Animation", 
    "Business",
    "Data"
  ];

  // Rating options
  const ratingOptions = ["All", "5", "4+", "3+"];

  // Platform summary stats
  const platformStats = [
    {
      icon: <Star className="w-6 h-6" />,
      value: "4.8/5",
      label: "Average Rating"
    },
    {
      icon: <ThumbsUp className="w-6 h-6" />,
      value: "93%",
      label: "Client Satisfaction"
    },
    {
      icon: <MessageSquare className="w-6 h-6" />,
      value: "650K+",
      label: "Total Reviews"
    },
    {
      icon: <Briefcase className="w-6 h-6" />,
      value: "12M+",
      label: "Projects Completed"
    }
  ];

  // Featured reviews
  const featuredReviews = [
    {
      id: 1,
      clientName: "Acme Corporation",
      clientLogo: "https://via.placeholder.com/100x50?text=ACME",
      rating: 5,
      title: "Outstanding Talent and Platform Support",
      review: "We've hired over 20 freelancers through FreelanceNest for various projects. The quality of talent consistently exceeds expectations, and the platform tools make management effortless. We've reduced our hiring time by 60% and have better outcomes than with traditional staffing.",
      category: "Various",
      projectCount: 27,
      verifiedSpend: "$210,000+",
      featured: true
    },
    {
      id: 2,
      clientName: "TechStart Inc.",
      clientLogo: "https://via.placeholder.com/100x50?text=TECHSTART",
      rating: 5,
      title: "Game-Changing for Our Startup",
      review: "As a startup with limited resources, FreelanceNest has been invaluable. We've built our entire tech stack using freelancers from the platform. The quality control and payment protection give us peace of mind, while the talent delivers enterprise-level work at startup-friendly rates.",
      category: "Development",
      projectCount: 14,
      verifiedSpend: "$95,000+",
      featured: true
    }
  ];

  // Client reviews
  const clientReviews = [
    {
      id: 3,
      clientName: "Global Marketing Group",
      clientImage: "https://randomuser.me/api/portraits/men/41.jpg",
      clientPosition: "Marketing Director",
      rating: 5,
      title: "Consistent Quality Across Multiple Projects",
      review: "We've used FreelanceNest for content creation, design work, and web development. The consistency in quality across different skill categories is impressive. The platform's tools for managing multiple freelancers have streamlined our operations.",
      category: "Marketing",
      date: "August 12, 2023"
    },
    {
      id: 4,
      clientName: "Sarah Williams",
      clientImage: "https://randomuser.me/api/portraits/women/63.jpg",
      clientPosition: "Small Business Owner",
      rating: 5,
      title: "Perfect for Small Business Needs",
      review: "As a small business owner, I don't have the resources to hire full-time specialists. FreelanceNest gives me access to professional talent for specific projects. I've completed over 30 projects on the platform, and the quality has always been excellent.",
      category: "Various",
      date: "July 24, 2023"
    },
    {
      id: 5,
      clientName: "David Chen",
      clientImage: "https://randomuser.me/api/portraits/men/52.jpg",
      clientPosition: "Product Manager",
      rating: 4,
      title: "Excellent for Technical Talent",
      review: "We needed specialized developers for a complex project. FreelanceNest's advanced search and verification system helped us find exactly the right skills. The collaboration tools made working with remote talent seamless.",
      category: "Development",
      date: "August 5, 2023"
    },
    {
      id: 6,
      clientName: "Elena Kowalski",
      clientImage: "https://randomuser.me/api/portraits/women/42.jpg",
      clientPosition: "Creative Director",
      rating: 5,
      title: "Outstanding Design Talent Pool",
      review: "The quality of design talent on FreelanceNest is exceptional. We've found designers who not only execute our vision perfectly but also contribute valuable creative input. The platform's portfolio review features make finding the right stylistic match simple.",
      category: "Design",
      date: "July 18, 2023"
    },
    {
      id: 7,
      clientName: "Marcus Johnson",
      clientImage: "https://randomuser.me/api/portraits/men/33.jpg",
      clientPosition: "Content Manager",
      rating: 4,
      title: "Great for Content Creation at Scale",
      review: "We needed to produce blog content at scale without sacrificing quality. Through FreelanceNest, we built a reliable team of writers who understand our brand voice and deliver consistent results. The content management tools are particularly helpful.",
      category: "Writing",
      date: "August 15, 2023"
    },
    {
      id: 8,
      clientName: "Priya Sharma",
      clientImage: "https://randomuser.me/api/portraits/women/39.jpg",
      clientPosition: "Data Science Lead",
      rating: 5,
      title: "Specialized Technical Talent On Demand",
      review: "Finding qualified data scientists is challenging, but FreelanceNest has an impressive pool of specialized talent. The skills verification and testing features helped us identify truly qualified professionals. Our projects have been delivered ahead of schedule with outstanding quality.",
      category: "Data",
      date: "July 29, 2023"
    }
  ];

  // Freelancer testimonials
  const freelancerTestimonials = [
    {
      id: 1,
      name: "Jason Rodriguez",
      role: "Full Stack Developer",
      image: "https://randomuser.me/api/portraits/men/36.jpg",
      quote: "FreelanceNest's client verification system means I only work with serious clients who value quality work. The payment protection gives me confidence to focus on delivering my best work.",
      earnings: "Top 3% earner"
    },
    {
      id: 2,
      name: "Aisha Kahn",
      role: "UX/UI Designer",
      image: "https://randomuser.me/api/portraits/women/24.jpg",
      quote: "The clients I've connected with through FreelanceNest appreciate design expertise and are willing to invest in quality. The platform's reputation system has helped me build credibility and attract premium clients.",
      earnings: "Top 5% earner"
    },
    {
      id: 3,
      name: "Michael Chen",
      role: "Content Strategist",
      image: "https://randomuser.me/api/portraits/men/22.jpg",
      quote: "As someone who works in a competitive field, FreelanceNest has been crucial for building my client base. The review system highlights my expertise and helps me stand out from the competition.",
      earnings: "Top 10% earner"
    }
  ];

  // Handle search input change
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  // Handle category filter change
  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category);
  };

  // Handle rating filter change
  const handleRatingChange = (rating: string) => {
    setSelectedRating(rating);
  };

  return (
    <div className="min-h-screen bg-[#ffeee3]">
      {/* Hero Section */}
      <section className="pt-40 pb-20 bg-[#2E2E2E]">
        <div className="section-container">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Platform <span className="bg-gradient-to-r from-[#FF6B00] to-orange-500 bg-clip-text text-transparent">Reviews</span>
            </h1>
            <p className="text-xl text-[#ffeee3] mb-8">
              See what clients and freelancers are saying about their FreelanceNest experience
            </p>
            
            {/* Search Box */}
            <div className="relative max-w-2xl mx-auto">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-[#ffeee3]" />
              </div>
              <input
                type="text"
                placeholder="Search reviews by keyword..."
                value={searchQuery}
                onChange={handleSearchChange}
                className="pl-12 pr-4 py-4 w-full rounded-xl bg-white focus:outline-none focus:ring-2 focus:ring-[#FF6B00] shadow-lg text-[#2E2E2E]"
              />
            </div>
          </div>
        </div>
        
        {/* Platform Stats */}
        <div className="max-w-5xl mx-auto mt-16">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8">
            {platformStats.map((stat, index) => (
              <div key={index} className="bg-white/10 backdrop-blur-sm rounded-lg p-6 text-center">
                <div className="inline-flex items-center justify-center w-12 h-12 bg-[#FF6B00]/20 rounded-full mb-4">
                  <div className="text-[#FF6B00]">
                    {stat.icon}
                  </div>
                </div>
                <div className="text-3xl md:text-4xl font-bold text-[#FF6B00] mb-2">
                  {stat.value}
                </div>
                <div className="text-[#ffeee3] text-sm">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Enterprise Reviews */}
      <section className="py-16 -mt-12">
        <div className="section-container">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold text-[#2E2E2E] mb-8">Featured Enterprise Reviews</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {featuredReviews.map((review) => (
                <div key={review.id} className="bg-white rounded-xl overflow-hidden shadow-md border border-[#ffeee3] hover:border-[#FF6B00] transition-colors duration-200">
                  <div className="relative">
                    <div className="absolute top-0 left-0 bg-[#FF6B00] text-white text-xs font-bold px-3 py-1 rounded-br">
                      FEATURED
                    </div>
                    <div className="p-8">
                      <div className="flex items-start justify-between mb-6">
                        <img 
                          src={review.clientLogo} 
                          alt={review.clientName}
                          className="h-12 object-contain"
                        />
                        <div className="flex items-center">
                          {[...Array(5)].map((_, i) => (
                            <Star 
                              key={i} 
                              className={`w-5 h-5 ${i < review.rating ? 'text-[#FF6B00] fill-[#FF6B00]' : 'text-[#ffeee3]'}`}
                            />
                          ))}
                        </div>
                      </div>
                      
                      <h3 className="text-xl font-bold text-[#2E2E2E] mb-4">{review.title}</h3>
                      <p className="text-[#2E2E2E] mb-6">
                        {review.review}
                      </p>
                      
                      <div className="flex flex-wrap gap-4 text-sm">
                        <div className="bg-[#ffeee3] text-[#FF6B00] px-3 py-1 rounded-full flex items-center">
                          <Briefcase className="w-4 h-4 mr-1" />
                          <span>{review.projectCount} Projects</span>
                        </div>
                        <div className="bg-[#ffeee3] text-[#FF6B00] px-3 py-1 rounded-full flex items-center">
                          <Award className="w-4 h-4 mr-1" />
                          <span>Verified {review.verifiedSpend}</span>
                        </div>
                        <div className="bg-[#ffeee3] text-[#FF6B00] px-3 py-1 rounded-full flex items-center">
                          <Users className="w-4 h-4 mr-1" />
                          <span>{review.category}</span>
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

      {/* Review Filters */}
      <section className="py-8">
        <div className="section-container">
          <div className="max-w-6xl mx-auto">
            <div className="bg-white rounded-xl shadow-sm p-4 mb-8 border border-[#ffeee3]">
              <div className="flex flex-col md:flex-row gap-4">
                <div className="flex-1">
                  <div className="text-sm text-[#2E2E2E] mb-2">Filter by Category</div>
                  <div className="flex flex-wrap gap-2">
                    {categories.map((category) => (
                      <button
                        key={category}
                        onClick={() => handleCategoryChange(category)}
                        className={`px-3 py-1.5 text-sm rounded-md transition-colors duration-200 ${
                          selectedCategory === category
                            ? 'bg-[#FF6B00] text-white'
                            : 'bg-[#ffeee3] text-[#2E2E2E] hover:bg-[#ffeee3]'
                        }`}
                      >
                        {category}
                      </button>
                    ))}
                  </div>
                </div>
                
                <div className="md:w-48">
                  <div className="text-sm text-[#2E2E2E] mb-2">Filter by Rating</div>
                  <div className="flex flex-wrap gap-2">
                    {ratingOptions.map((rating) => (
                      <button
                        key={rating}
                        onClick={() => handleRatingChange(rating)}
                        className={`px-3 py-1.5 text-sm rounded-md transition-colors duration-200 ${
                          selectedRating === rating
                            ? 'bg-[#FF6B00] text-white'
                            : 'bg-[#ffeee3] text-[#2E2E2E] hover:bg-[#ffeee3]'
                        }`}
                      >
                        {rating === "All" ? rating : `${rating} Stars`}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Client Reviews */}
      <section className="py-8">
        <div className="section-container">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold text-[#2E2E2E] mb-8">Client Reviews</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {clientReviews.map((review) => (
                <div key={review.id} className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md border border-[#ffeee3] hover:border-[#FF6B00] transition-all duration-200">
                  <div className="p-6">
                    <div className="flex justify-between items-start mb-4">
                      <div className="flex items-start">
                        <img 
                          src={review.clientImage} 
                          alt={review.clientName}
                          className="w-12 h-12 rounded-full object-cover mr-4"
                        />
                        <div>
                          <h3 className="font-bold text-[#2E2E2E]">{review.clientName}</h3>
                          <div className="text-sm text-[#ffeee3]">{review.clientPosition}</div>
                        </div>
                      </div>
                      <div className="flex items-center">
                        {[...Array(5)].map((_, i) => (
                          <Star 
                            key={i} 
                            className={`w-4 h-4 ${i < review.rating ? 'text-[#FF6B00] fill-[#FF6B00]' : 'text-[#ffeee3]'}`}
                          />
                        ))}
                      </div>
                    </div>
                    
                    <h4 className="text-lg font-bold text-[#2E2E2E] mb-3">{review.title}</h4>
                    <p className="text-[#2E2E2E] mb-4 text-sm line-clamp-4">
                      {review.review}
                    </p>
                    
                    <div className="flex justify-between items-center text-sm">
                      <div className="flex items-center text-[#FF6B00]">
                        <CheckCircle className="w-4 h-4 mr-1" />
                        <span>Verified Review</span>
                      </div>
                      <span className="text-[#ffeee3]">{review.date}</span>
                    </div>
                    
                    <div className="mt-4 pt-4 border-t border-[#ffeee3]">
                      <div className="inline-block bg-[#ffeee3] text-[#FF6B00] px-3 py-1 rounded-full text-xs">
                        {review.category}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="mt-8 text-center">
              <button className="bg-white border border-[#FF6B00] text-[#FF6B00] hover:bg-[#ffeee3] font-medium px-6 py-3 rounded-lg transition-colors duration-200">
                Load More Reviews
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Freelancer Testimonials */}
      <section className="py-16 bg-[#2E2E2E] text-white">
        <div className="section-container">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-3xl font-bold mb-12 text-center">
              <span className="bg-gradient-to-r from-[#FF6B00] to-orange-500 bg-clip-text text-transparent">Freelancer</span> Testimonials
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {freelancerTestimonials.map((testimonial, index) => (
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
                      className="w-12 h-12 rounded-full mr-3 border-2 border-white" 
                    />
                    <div>
                      <div className="font-medium">{testimonial.name}</div>
                      <div className="text-sm opacity-80">{testimonial.role}</div>
                    </div>
                    <div className="ml-auto bg-[#FF6B00] text-white text-xs px-2 py-1 rounded">
                      {testimonial.earnings}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Review Highlights */}
      <section className="py-16 bg-white">
        <div className="section-container">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-[#2E2E2E] mb-4">What Sets Us Apart</h2>
              <p className="text-xl text-[#2E2E2E]">
                Key platform benefits consistently mentioned in reviews
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="bg-[#ffeee3] rounded-xl p-8">
                <h3 className="text-2xl font-bold text-[#2E2E2E] mb-6">For Clients</h3>
                <ul className="space-y-4">
                  <li className="flex items-start">
                    <CheckCircle className="w-6 h-6 text-[#FF6B00] mr-3 shrink-0 mt-0.5" />
                    <div>
                      <h4 className="font-bold text-lg text-[#2E2E2E]">Verified Quality Talent</h4>
                      <p className="text-[#2E2E2E]">
                        "The skill verification process ensures we only work with qualified professionals."
                      </p>
                    </div>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="w-6 h-6 text-[#FF6B00] mr-3 shrink-0 mt-0.5" />
                    <div>
                      <h4 className="font-bold text-lg text-[#2E2E2E]">Risk-Free Hiring</h4>
                      <p className="text-[#2E2E2E]">
                        "Payment protection and dispute resolution give us confidence to try new freelancers."
                      </p>
                    </div>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="w-6 h-6 text-[#FF6B00] mr-3 shrink-0 mt-0.5" />
                    <div>
                      <h4 className="font-bold text-lg text-[#2E2E2E]">Enterprise Tools</h4>
                      <p className="text-[#2E2E2E]">
                        "The collaboration and management features streamline working with multiple freelancers."
                      </p>
                    </div>
                  </li>
                </ul>
              </div>
              
              <div className="bg-[#ffeee3] rounded-xl p-8">
                <h3 className="text-2xl font-bold text-[#2E2E2E] mb-6">For Freelancers</h3>
                <ul className="space-y-4">
                  <li className="flex items-start">
                    <CheckCircle className="w-6 h-6 text-[#FF6B00] mr-3 shrink-0 mt-0.5" />
                    <div>
                      <h4 className="font-bold text-lg text-[#2E2E2E]">Quality Clients</h4>
                      <p className="text-[#2E2E2E]">
                        "Client verification means we work with serious businesses that value quality work."
                      </p>
                    </div>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="w-6 h-6 text-[#FF6B00] mr-3 shrink-0 mt-0.5" />
                    <div>
                      <h4 className="font-bold text-lg text-[#2E2E2E]">Payment Security</h4>
                      <p className="text-[#2E2E2E]">
                        "Escrow and payment protection ensure we get paid for completed work."
                      </p>
                    </div>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="w-6 h-6 text-[#FF6B00] mr-3 shrink-0 mt-0.5" />
                    <div>
                      <h4 className="font-bold text-lg text-[#2E2E2E]">Career Growth</h4>
                      <p className="text-[#2E2E2E]">
                        "The review system helps build credibility and attract higher-paying clients over time."
                      </p>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-[#ffeee3]">
        <div className="section-container">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-bold text-[#2E2E2E] mb-6">Ready to Experience FreelanceNest?</h2>
            <p className="text-xl text-[#2E2E2E] mb-8">
              Join thousands of satisfied clients and freelancers on our platform
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link 
                to="/signup" 
                className="bg-[#FF6B00] hover:bg-orange-600 text-white font-medium px-8 py-4 rounded-lg transition-colors duration-200 inline-block"
              >
                Create Your Account
              </Link>
              <Link
                to="/talent-marketplace"
                className="bg-white border border-[#FF6B00] text-[#FF6B00] hover:bg-orange-50 font-medium px-8 py-4 rounded-lg transition-colors duration-200 inline-block"
              >
                Browse Talent
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ReviewsPage;












