import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Search, Clock, Tag, ChevronRight, ArrowRight, Calendar, BookOpen } from 'lucide-react';

const BlogPage: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  // Blog categories
  const categories = [
    "All",
    "Freelance Tips",
    "Client Management",
    "Business Growth",
    "Industry Insights",
    "Technology",
    "Success Stories",
    "Finance"
  ];

  // Featured articles
  const featuredArticles = [
    {
      id: 1,
      title: "10 Strategies to Double Your Freelance Income in 2023",
      excerpt: "Learn actionable techniques that can help you scale your freelance business and increase your revenue this year.",
      image: "https://via.placeholder.com/800x450?text=Freelance+Income+Strategies",
      category: "Business Growth",
      author: "Alex Morgan",
      authorImage: "https://randomuser.me/api/portraits/men/32.jpg",
      date: "August 15, 2023",
      readTime: "8 min",
      featured: true
    },
    {
      id: 2,
      title: "The Future of Remote Work: Trends to Watch in 2024",
      excerpt: "Explore emerging trends in remote work and how they'll impact freelancers and independent professionals in the coming year.",
      image: "https://via.placeholder.com/800x450?text=Future+of+Remote+Work",
      category: "Industry Insights",
      author: "Sophia Chen",
      authorImage: "https://randomuser.me/api/portraits/women/44.jpg",
      date: "August 10, 2023",
      readTime: "10 min",
      featured: true
    }
  ];

  // Recent articles
  const recentArticles = [
    {
      id: 3,
      title: "How to Create a Client Onboarding Process That Impresses",
      excerpt: "A smooth onboarding process sets the tone for successful client relationships. Learn how to create one that stands out.",
      image: "https://via.placeholder.com/600x350?text=Client+Onboarding",
      category: "Client Management",
      author: "David Wilson",
      authorImage: "https://randomuser.me/api/portraits/men/45.jpg",
      date: "August 5, 2023",
      readTime: "6 min"
    },
    {
      id: 4,
      title: "7 Invoicing Mistakes That Delay Your Payments",
      excerpt: "Are you making these common invoicing errors? Learn how to optimize your invoicing process to get paid faster.",
      image: "https://via.placeholder.com/600x350?text=Invoicing+Mistakes",
      category: "Finance",
      author: "Emma Johnson",
      authorImage: "https://randomuser.me/api/portraits/women/33.jpg",
      date: "July 28, 2023",
      readTime: "5 min"
    },
    {
      id: 5,
      title: "Building Your Personal Brand as a Freelancer",
      excerpt: "Discover how to develop a compelling personal brand that attracts your ideal clients and commands premium rates.",
      image: "https://via.placeholder.com/600x350?text=Personal+Branding",
      category: "Freelance Tips",
      author: "Michael Rodriguez",
      authorImage: "https://randomuser.me/api/portraits/men/22.jpg",
      date: "July 22, 2023",
      readTime: "7 min"
    },
    {
      id: 6,
      title: "AI Tools Every Freelancer Should Be Using",
      excerpt: "Explore the latest AI-powered tools that can help you automate tasks and increase your productivity.",
      image: "https://via.placeholder.com/600x350?text=AI+Tools",
      category: "Technology",
      author: "Jasmine Patel",
      authorImage: "https://randomuser.me/api/portraits/women/26.jpg",
      date: "July 15, 2023",
      readTime: "9 min"
    }
  ];

  // Popular articles
  const popularArticles = [
    {
      id: 7,
      title: "Setting Your Freelance Rates: A Comprehensive Guide",
      category: "Finance",
      readTime: "11 min",
      views: "125K+"
    },
    {
      id: 8,
      title: "How to Handle Difficult Clients (Without Losing Them)",
      category: "Client Management",
      readTime: "7 min",
      views: "98K+"
    },
    {
      id: 9,
      title: "The Freelancer's Guide to Tax Deductions",
      category: "Finance",
      readTime: "8 min",
      views: "112K+"
    },
    {
      id: 10,
      title: "Creating Recurring Revenue Streams as a Freelancer",
      category: "Business Growth",
      readTime: "9 min",
      views: "87K+"
    },
    {
      id: 11,
      title: "Time Management Techniques for Remote Workers",
      category: "Freelance Tips",
      readTime: "6 min",
      views: "79K+"
    }
  ];

  // Upcoming webinars
  const upcomingWebinars = [
    {
      id: 1,
      title: "Mastering Client Negotiations",
      date: "September 15, 2023",
      time: "11:00 AM EST",
      host: "Daniel Carter",
      hostTitle: "Business Coach"
    },
    {
      id: 2,
      title: "Creating Compelling Portfolios",
      date: "September 22, 2023",
      time: "1:00 PM EST",
      host: "Olivia Martinez",
      hostTitle: "Design Director"
    },
    {
      id: 3,
      title: "Freelance Finance Fundamentals",
      date: "October 5, 2023",
      time: "10:00 AM EST",
      host: "James Wilson",
      hostTitle: "Financial Advisor"
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

  return (
    <div className="min-h-screen bg-[#ffeee3]">
      {/* Hero Section */}
      <section className="pt-40 pb-20 bg-[#2E2E2E]">
        <div className="section-container">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
              FreelanceNest <span className="bg-gradient-to-r from-[#FF6B00] to-orange-500 bg-clip-text text-transparent">Blog</span>
            </h1>
            <p className="text-xl text-[#ffeee3] mb-8">
              Insights, tips, and strategies to help you succeed as a freelancer
            </p>
            
            {/* Search Box */}
            <div className="relative max-w-2xl mx-auto">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-[#ffeee3]" />
              </div>
              <input
                type="text"
                placeholder="Search articles..."
                value={searchQuery}
                onChange={handleSearchChange}
                className="pl-12 pr-4 py-4 w-full rounded-xl bg-white focus:outline-none focus:ring-2 focus:ring-[#FF6B00] shadow-lg text-[#2E2E2E]"
              />
              <button 
                className="absolute inset-y-0 right-0 px-4 text-white bg-[#FF6B00] hover:bg-orange-600 rounded-r-xl transition-colors duration-200"
              >
                Search
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Category Filters */}
      <section className="py-8 -mt-8">
        <div className="section-container">
          <div className="max-w-6xl mx-auto">
            <div className="bg-white rounded-xl shadow-sm p-4 overflow-x-auto">
              <div className="flex gap-2">
                {categories.map((category) => (
                  <button
                    key={category}
                    onClick={() => handleCategoryChange(category)}
                    className={`px-4 py-2 text-sm rounded-md whitespace-nowrap transition-colors duration-200 ${
                      selectedCategory === category
                        ? 'bg-[#FF6B00] text-white'
                        : 'bg-white text-[#2E2E2E] hover:bg-[#FF6B00] hover:text-white border border-orange-200 hover:border-[#FF6B00]'
                    }`}
                  >
                    {category}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Articles */}
      <section className="py-12">
        <div className="section-container">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold mb-8">Featured Articles</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {featuredArticles.map((article) => (
                <div key={article.id} className="bg-white rounded-xl overflow-hidden shadow-md">
                  <div className="relative">
                    <img 
                      src={article.image} 
                      alt={article.title}
                      className="w-full h-64 object-cover"
                    />
                    <div className="absolute top-4 right-4 bg-[#FF6B00] text-white text-xs font-bold px-2 py-1 rounded">
                      FEATURED
                    </div>
                    <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm text-[#FF6B00] text-xs font-medium px-3 py-1 rounded-full">
                      {article.category}
                    </div>
                  </div>
                  <div className="p-6">
                    <h3 className="text-2xl font-bold mb-3 hover:text-[#FF6B00] transition-colors duration-200">
                      <Link to={`/blog/article/${article.id}`}>{article.title}</Link>
                    </h3>
                    <p className="text-[#2E2E2E] mb-6">{article.excerpt}</p>
                    <div className="flex justify-between items-center">
                      <div className="flex items-center">
                        <img 
                          src={article.authorImage} 
                          alt={article.author}
                          className="w-10 h-10 rounded-full object-cover mr-3"
                        />
                        <div>
                          <div className="font-medium">{article.author}</div>
                          <div className="text-sm text-[#ffeee3]">{article.date}</div>
                        </div>
                      </div>
                      <div className="flex items-center text-[#ffeee3] text-sm">
                        <Clock className="w-4 h-4 mr-1" />
                        <span>{article.readTime} read</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Recent Articles */}
      <section className="py-12">
        <div className="section-container">
          <div className="max-w-6xl mx-auto">
            <div className="flex justify-between items-center mb-8">
              <h2 className="text-3xl font-bold">Recent Articles</h2>
              <Link 
                to="/blog/archive" 
                className="text-[#FF6B00] hover:text-orange-600 font-medium flex items-center"
              >
                View All Articles
                <ChevronRight className="ml-1 w-5 h-5" />
              </Link>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {recentArticles.map((article) => (
                <div key={article.id} className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-200">
                  <Link to={`/blog/article/${article.id}`} className="block">
                    <img 
                      src={article.image} 
                      alt={article.title}
                      className="w-full h-48 object-cover"
                    />
                  </Link>
                  <div className="p-6">
                    <div className="flex items-center mb-3">
                      <span className="bg-[#ffeee3] text-[#FF6B00] text-xs font-medium px-2.5 py-0.5 rounded">
                        {article.category}
                      </span>
                      <div className="ml-auto flex items-center text-[#ffeee3] text-sm">
                        <Clock className="w-3 h-3 mr-1" />
                        <span>{article.readTime}</span>
                      </div>
                    </div>
                    <h3 className="text-lg font-bold mb-3 line-clamp-2 hover:text-[#FF6B00] transition-colors duration-200">
                      <Link to={`/blog/article/${article.id}`}>{article.title}</Link>
                    </h3>
                    <p className="text-[#2E2E2E] mb-4 text-sm line-clamp-3">{article.excerpt}</p>
                    <div className="flex items-center">
                      <img 
                        src={article.authorImage} 
                        alt={article.author}
                        className="w-8 h-8 rounded-full object-cover mr-2"
                      />
                      <div className="text-sm">
                        <span className="font-medium">{article.author}</span>
                        <span className="mx-1 text-[#ffeee3]">â€¢</span>
                        <span className="text-[#ffeee3]">{article.date}</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Sidebar Section - Popular and Webinars */}
      <section className="py-12 bg-white">
        <div className="section-container">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Popular Articles */}
              <div className="lg:col-span-2">
                <h2 className="text-2xl font-bold mb-6">Most Popular Articles</h2>
                <div className="bg-[#ffeee3] rounded-xl p-6">
                  <div className="space-y-6">
                    {popularArticles.map((article, index) => (
                      <div key={article.id} className={`flex items-start ${index !== popularArticles.length - 1 ? 'pb-6 border-b border-orange-200' : ''}`}>
                        <div className="bg-white rounded-full w-8 h-8 flex items-center justify-center font-bold text-[#FF6B00] mr-4">
                          {index + 1}
                        </div>
                        <div className="flex-1">
                          <h3 className="font-bold mb-2 hover:text-[#FF6B00] transition-colors duration-200">
                            <Link to={`/blog/article/${article.id}`}>{article.title}</Link>
                          </h3>
                          <div className="flex flex-wrap gap-3 text-sm">
                            <div className="flex items-center text-[#ffeee3]">
                              <Tag className="w-3 h-3 mr-1" />
                              <span>{article.category}</span>
                            </div>
                            <div className="flex items-center text-[#ffeee3]">
                              <Clock className="w-3 h-3 mr-1" />
                              <span>{article.readTime}</span>
                            </div>
                            <div className="flex items-center text-[#ffeee3]">
                              <Eye className="w-3 h-3 mr-1" />
                              <span>{article.views} views</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              
              {/* Upcoming Webinars */}
              <div>
                <h2 className="text-2xl font-bold mb-6">Upcoming Webinars</h2>
                <div className="bg-[#ffeee3] rounded-xl p-6">
                  <div className="space-y-6">
                    {upcomingWebinars.map((webinar) => (
                      <div key={webinar.id} className="bg-white rounded-lg p-4 shadow-sm">
                        <div className="flex items-center text-[#FF6B00] text-sm mb-2">
                          <Calendar className="w-4 h-4 mr-1" />
                          <span>{webinar.date}</span>
                        </div>
                        <h3 className="font-bold mb-2">{webinar.title}</h3>
                        <div className="flex justify-between items-center text-sm">
                          <span className="text-[#ffeee3]">{webinar.time}</span>
                          <span className="text-[#2E2E2E]">Host: {webinar.host}</span>
                        </div>
                        <Link 
                          to="#" 
                          className="mt-3 inline-flex items-center text-[#FF6B00] hover:text-orange-600 font-medium text-sm"
                        >
                          Register Now
                          <ArrowRight className="ml-1 w-3 h-3" />
                        </Link>
                      </div>
                    ))}
                  </div>
                  <div className="mt-4 text-center">
                    <Link 
                      to="/resources" 
                      className="text-[#FF6B00] hover:text-orange-600 font-medium inline-flex items-center"
                    >
                      View All Webinars
                      <ArrowRight className="ml-1 w-4 h-4" />
                    </Link>
                  </div>
                </div>
                
                {/* Newsletter Signup */}
                <div className="mt-8 bg-[#2E2E2E] rounded-xl p-6 text-white">
                  <div className="mb-4">
                    <BookOpen className="w-8 h-8 text-[#FF6B00]" />
                  </div>
                  <h3 className="text-xl font-bold mb-2">Subscribe to Our Newsletter</h3>
                  <p className="text-[#ffeee3] mb-4">
                    Get the latest articles and resources sent straight to your inbox
                  </p>
                  <div className="flex flex-col gap-3">
                    <input
                      type="email"
                      placeholder="Your email address"
                      className="w-full px-4 py-2 rounded bg-white/20 backdrop-blur-sm border border-white/30 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-[#FF6B00]"
                    />
                    <button className="w-full bg-[#FF6B00] text-white hover:bg-orange-600 font-medium py-2 rounded transition-colors duration-200">
                      Subscribe
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Topics Section */}
      <section className="py-16">
        <div className="section-container">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-12 text-[#2E2E2E]">Browse by Topic</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {categories.filter(cat => cat !== "All").map((category) => (
                <Link 
                  key={category} 
                  to={`/blog/category/${category.toLowerCase().replace(/\s+/g, '-')}`}
                  className="bg-white rounded-xl p-8 text-center shadow-sm hover:shadow-lg transition-all duration-300 hover:text-[#FF6B00] hover:border-[#FF6B00] border border-orange-200 hover:transform hover:scale-105 group"
                >
                  <div className="mb-3">
                    <div className="w-12 h-12 bg-[#ffeee3] rounded-lg flex items-center justify-center mx-auto mb-4 group-hover:bg-[#FF6B00] transition-colors duration-300">
                      <span className="text-[#FF6B00] font-bold text-lg group-hover:text-white transition-colors duration-300">
                        {category.charAt(0)}
                      </span>
                    </div>
                  </div>
                  <span className="font-semibold text-[#2E2E2E] group-hover:text-[#FF6B00] transition-colors duration-300">
                    {category}
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-[#2E2E2E] text-white">
        <div className="section-container">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-6">
              Want to Contribute to Our <span className="bg-gradient-to-r from-[#FF6B00] to-orange-500 bg-clip-text text-transparent">Blog</span>?
            </h2>
            <p className="text-xl text-[#ffeee3] mb-8">
              Share your expertise with our community of freelancers. We're looking for insightful articles on freelancing, business growth, and industry trends.
            </p>
            <Link 
              to="#" 
              className="bg-[#FF6B00] text-white hover:bg-orange-600 font-medium px-8 py-4 rounded-lg transition-colors duration-200 inline-block"
            >
              Become a Contributor
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

const Eye = (props: any) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7z"></path>
    <circle cx="12" cy="12" r="3"></circle>
  </svg>
);

export default BlogPage;










