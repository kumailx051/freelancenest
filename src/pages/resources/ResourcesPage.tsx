import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Search, Download, BookOpen, FileText, Video, Users, Coffee, ArrowRight, ExternalLink } from 'lucide-react';

const ResourcesPage: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  // Resource categories
  const categories = [
    "All", 
    "Guides", 
    "Templates", 
    "Tutorials", 
    "Case Studies", 
    "Webinars", 
    "Checklists",
    "Reports"
  ];

  // Featured resources
  const featuredResources = [
    {
      id: 1,
      title: "The Complete Guide to Freelancing in 2023",
      description: "Everything you need to know about starting and growing your freelance business in today's market.",
      image: "https://via.placeholder.com/600x350?text=Freelancing+Guide",
      category: "Guides",
      downloadCount: "32K+",
      type: "ebook",
      typeIcon: <BookOpen className="w-5 h-5" />,
      featured: true
    },
    {
      id: 2,
      title: "Client Communication Templates",
      description: "Professional templates for every client interaction from pitching to project completion.",
      image: "https://via.placeholder.com/600x350?text=Templates",
      category: "Templates",
      downloadCount: "45K+",
      type: "template",
      typeIcon: <FileText className="w-5 h-5" />,
      featured: true
    },
    {
      id: 3,
      title: "Pricing Your Freelance Services Webinar",
      description: "Learn effective strategies for pricing your services to maximize both client acquisition and profitability.",
      image: "https://via.placeholder.com/600x350?text=Pricing+Webinar",
      category: "Webinars",
      downloadCount: "18K+",
      type: "video",
      typeIcon: <Video className="w-5 h-5" />,
      featured: true
    }
  ];

  // Regular resources
  const resources = [
    {
      id: 4,
      title: "Freelancer Invoicing Best Practices",
      description: "Tips and templates for professional invoicing that improves payment times.",
      category: "Guides",
      type: "ebook",
      typeIcon: <BookOpen className="w-5 h-5" />,
      downloadCount: "12K+"
    },
    {
      id: 5,
      title: "Client Discovery Questionnaire",
      description: "Ask the right questions to fully understand project requirements from the start.",
      category: "Templates",
      type: "document",
      typeIcon: <FileText className="w-5 h-5" />,
      downloadCount: "28K+"
    },
    {
      id: 6,
      title: "Building Your Freelance Portfolio",
      description: "A step-by-step guide to creating a portfolio that converts prospects into clients.",
      category: "Tutorials",
      type: "video",
      typeIcon: <Video className="w-5 h-5" />,
      downloadCount: "15K+"
    },
    {
      id: 7,
      title: "Social Media Growth for Freelancers",
      description: "Strategies for using social platforms to attract clients and establish authority.",
      category: "Guides",
      type: "ebook",
      typeIcon: <BookOpen className="w-5 h-5" />,
      downloadCount: "9K+"
    },
    {
      id: 8,
      title: "Freelancer Tax Checklist",
      description: "Ensure you're tracking the right financial information throughout the year.",
      category: "Checklists",
      type: "document",
      typeIcon: <FileText className="w-5 h-5" />,
      downloadCount: "34K+"
    },
    {
      id: 9,
      title: "Client Onboarding Process",
      description: "Create a smooth onboarding experience that sets projects up for success.",
      category: "Tutorials",
      type: "video",
      typeIcon: <Video className="w-5 h-5" />,
      downloadCount: "11K+"
    },
    {
      id: 10,
      title: "Freelance Market Trends 2023",
      description: "Analysis of in-demand skills and emerging opportunities across industries.",
      category: "Reports",
      type: "document",
      typeIcon: <FileText className="w-5 h-5" />,
      downloadCount: "21K+"
    },
    {
      id: 11,
      title: "How to Find Your Freelance Niche",
      description: "Strategies for identifying and positioning yourself in profitable market segments.",
      category: "Guides",
      type: "ebook",
      typeIcon: <BookOpen className="w-5 h-5" />,
      downloadCount: "18K+"
    }
  ];

  // Resource collections
  const resourceCollections = [
    {
      title: "Getting Started",
      description: "Essential resources for new freelancers",
      icon: <Users className="w-6 h-6" />,
      color: "bg-[#ffeee3] text-[#FF6B00]",
      count: 12
    },
    {
      title: "Business Growth",
      description: "Scale your freelance business",
      icon: <Coffee className="w-6 h-6" />,
      color: "bg-[#ffeee3] text-[#FF6B00]",
      count: 9
    },
    {
      title: "Client Management",
      description: "Improve client relationships",
      icon: <Users className="w-6 h-6" />,
      color: "bg-[#ffeee3] text-[#FF6B00]",
      count: 14
    },
    {
      title: "Financial Success",
      description: "Pricing, invoicing, and taxes",
      icon: <FileText className="w-6 h-6" />,
      color: "bg-[#ffeee3] text-[#FF6B00]",
      count: 10
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
              Resource <span className="bg-gradient-to-r from-[#FF6B00] to-orange-500 bg-clip-text text-transparent">Library</span>
            </h1>
            <p className="text-xl text-[#ffeee3] mb-8">
              Free guides, templates, and tools to help you succeed as a freelancer
            </p>
            
            {/* Search Box */}
            <div className="relative max-w-2xl mx-auto">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-[#ffeee3]" />
              </div>
              <input
                type="text"
                placeholder="Search resources..."
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
            <div className="bg-white rounded-xl shadow-sm p-4 border border-[#ffeee3]">
              <div className="flex flex-wrap justify-center gap-2">
                {categories.map((category) => (
                  <button
                    key={category}
                    onClick={() => handleCategoryChange(category)}
                    className={`px-4 py-2 text-sm rounded-md transition-colors duration-200 ${
                      selectedCategory === category
                        ? 'bg-[#FF6B00] text-white'
                        : 'bg-white text-[#2E2E2E] hover:bg-[#FF6B00] hover:text-white border border-[#ffeee3] hover:border-[#FF6B00]'
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

      {/* Featured Resources */}
      <section className="py-12">
        <div className="section-container">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold text-[#2E2E2E] mb-8">Featured Resources</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {featuredResources.map((resource) => (
                <div key={resource.id} className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md border border-[#ffeee3] hover:border-[#FF6B00] transition-all duration-200">
                  <div className="relative">
                    <img 
                      src={resource.image} 
                      alt={resource.title}
                      className="w-full h-48 object-cover"
                    />
                    <div className="absolute top-4 right-4 bg-[#FF6B00] text-white text-xs font-bold px-2 py-1 rounded">
                      FEATURED
                    </div>
                    <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm text-[#2E2E2E] text-xs font-medium px-3 py-1 rounded-full flex items-center">
                      {resource.typeIcon}
                      <span className="ml-1 capitalize">{resource.type}</span>
                    </div>
                  </div>
                  <div className="p-6">
                    <div className="flex justify-between items-center mb-3">
                      <span className="text-sm font-medium text-[#FF6B00]">{resource.category}</span>
                      <div className="flex items-center text-[#ffeee3] text-sm">
                        <Download className="w-4 h-4 mr-1" />
                        <span>{resource.downloadCount}</span>
                      </div>
                    </div>
                    <h3 className="text-xl font-bold text-[#2E2E2E] mb-3">{resource.title}</h3>
                    <p className="text-[#2E2E2E] mb-6 line-clamp-2">{resource.description}</p>
                    <Link 
                      to="#" 
                      className="w-full bg-[#FF6B00] hover:bg-orange-600 text-white font-medium py-2 rounded-lg transition-colors duration-200 inline-block text-center"
                    >
                      Download Resource
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Resource Collections */}
      <section className="py-12 bg-white">
        <div className="section-container">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold text-[#2E2E2E] mb-8">Resource Collections</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {resourceCollections.map((collection, index) => (
                <Link 
                  to="#"
                  key={index}
                  className="bg-[#ffeee3] rounded-xl p-6 hover:shadow-md border border-[#ffeee3] hover:border-[#FF6B00] transition-all duration-200 group"
                >
                  <div className={`p-3 rounded-lg ${collection.color} mb-4 inline-block`}>
                    {collection.icon}
                  </div>
                  <h3 className="text-xl font-bold text-[#2E2E2E] mb-2 group-hover:text-[#FF6B00] transition-colors duration-200">{collection.title}</h3>
                  <p className="text-[#2E2E2E] mb-4">{collection.description}</p>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-[#ffeee3]">{collection.count} resources</span>
                    <ArrowRight className="w-5 h-5 text-[#FF6B00]" />
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* All Resources */}
      <section className="py-12">
        <div className="section-container">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold text-[#2E2E2E] mb-8">All Resources</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {resources.map((resource) => (
                <div key={resource.id} className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md border border-[#ffeee3] hover:border-[#FF6B00] transition-all duration-200">
                  <div className="p-6">
                    <div className="flex justify-between items-center mb-4">
                      <span className="text-sm font-medium px-3 py-1 rounded-full bg-[#ffeee3] text-[#FF6B00]">{resource.category}</span>
                      <div className="flex items-center text-[#ffeee3] text-sm">
                        <Download className="w-4 h-4 mr-1" />
                        <span>{resource.downloadCount}</span>
                      </div>
                    </div>
                    <div className="mb-4 text-[#FF6B00]">
                      {resource.typeIcon}
                    </div>
                    <h3 className="text-lg font-bold text-[#2E2E2E] mb-3 line-clamp-2">{resource.title}</h3>
                    <p className="text-[#2E2E2E] mb-4 text-sm line-clamp-3">{resource.description}</p>
                    <Link 
                      to="#" 
                      className="text-[#FF6B00] hover:text-orange-600 font-medium flex items-center text-sm"
                    >
                      Download Resource
                      <ArrowRight className="ml-1 w-4 h-4" />
                    </Link>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="mt-10 text-center">
              <button className="bg-white border border-[#FF6B00] text-[#FF6B00] hover:bg-[#ffeee3] font-medium px-6 py-3 rounded-lg transition-colors duration-200">
                Load More Resources
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="py-16 bg-[#2E2E2E] text-white">
        <div className="section-container">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-6">
              Get <span className="bg-gradient-to-r from-[#FF6B00] to-orange-500 bg-clip-text text-transparent">Resources</span> Delivered to Your Inbox
            </h2>
            <p className="text-xl text-[#ffeee3] mb-8">
              Subscribe to receive the latest guides, templates, and tools to help you succeed as a freelancer.
            </p>
            <div className="max-w-2xl mx-auto flex flex-col sm:flex-row gap-4">
              <input
                type="email"
                placeholder="Enter your email address"
                className="flex-1 px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF6B00] bg-white/20 backdrop-blur-sm text-white placeholder-white/60"
              />
              <button className="bg-[#FF6B00] text-white hover:bg-orange-600 font-medium px-6 py-3 rounded-lg transition-colors duration-200 whitespace-nowrap">
                Subscribe Now
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Upcoming Webinars */}
      <section className="py-16 bg-white">
        <div className="section-container">
          <div className="max-w-6xl mx-auto">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
              <h2 className="text-3xl font-bold text-[#2E2E2E] mb-4 md:mb-0">Upcoming Webinars</h2>
              <Link
                to="#"
                className="text-[#FF6B00] hover:text-orange-600 font-medium flex items-center"
              >
                View All Webinars
                <ArrowRight className="ml-1 w-4 h-4" />
              </Link>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="bg-[#ffeee3] rounded-xl overflow-hidden shadow-sm border border-[#ffeee3] hover:border-[#FF6B00] transition-colors duration-200">
                <div className="p-6">
                  <div className="mb-4">
                    <span className="text-sm font-medium px-3 py-1 rounded-full bg-orange-100 text-[#FF6B00]">Sep 15, 2023</span>
                  </div>
                  <h3 className="text-xl font-bold text-[#2E2E2E] mb-3">Mastering Client Negotiations</h3>
                  <p className="text-[#2E2E2E] mb-4">
                    Learn proven techniques for negotiating better rates and terms with clients.
                  </p>
                  <div className="flex items-center text-[#ffeee3] mb-6">
                    <Video className="w-4 h-4 mr-2" />
                    <span>Live Webinar â€¢ 60 minutes</span>
                  </div>
                  <Link 
                    to="#" 
                    className="w-full bg-[#FF6B00] hover:bg-orange-600 text-white font-medium py-2 rounded-lg transition-colors duration-200 inline-block text-center"
                  >
                    Register Now
                  </Link>
                </div>
              </div>
              
              <div className="bg-[#ffeee3] rounded-xl overflow-hidden shadow-sm border border-[#ffeee3] hover:border-[#FF6B00] transition-colors duration-200">
                <div className="p-6">
                  <div className="mb-4">
                    <span className="text-sm font-medium px-3 py-1 rounded-full bg-orange-100 text-[#FF6B00]">Sep 22, 2023</span>
                  </div>
                  <h3 className="text-xl font-bold text-[#2E2E2E] mb-3">Building Your Personal Brand</h3>
                  <p className="text-[#2E2E2E] mb-4">
                    Strategies for creating a standout personal brand that attracts premium clients.
                  </p>
                  <div className="flex items-center text-[#ffeee3] mb-6">
                    <Video className="w-4 h-4 mr-2" />
                    <span>Live Webinar â€¢ 45 minutes</span>
                  </div>
                  <Link 
                    to="#" 
                    className="w-full bg-[#FF6B00] hover:bg-orange-600 text-white font-medium py-2 rounded-lg transition-colors duration-200 inline-block text-center"
                  >
                    Register Now
                  </Link>
                </div>
              </div>
              
              <div className="bg-[#ffeee3] rounded-xl overflow-hidden shadow-sm border border-[#ffeee3] hover:border-[#FF6B00] transition-colors duration-200">
                <div className="p-6">
                  <div className="mb-4">
                    <span className="text-sm font-medium px-3 py-1 rounded-full bg-orange-100 text-[#FF6B00]">Oct 5, 2023</span>
                  </div>
                  <h3 className="text-xl font-bold text-[#2E2E2E] mb-3">Tax Strategies for Freelancers</h3>
                  <p className="text-[#2E2E2E] mb-4">
                    Expert advice on managing taxes and maximizing deductions as a freelancer.
                  </p>
                  <div className="flex items-center text-[#ffeee3] mb-6">
                    <Video className="w-4 h-4 mr-2" />
                    <span>Live Webinar â€¢ 75 minutes</span>
                  </div>
                  <Link 
                    to="#" 
                    className="w-full bg-[#FF6B00] hover:bg-orange-600 text-white font-medium py-2 rounded-lg transition-colors duration-200 inline-block text-center"
                  >
                    Register Now
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-[#ffeee3]">
        <div className="section-container">
          <div className="max-w-4xl mx-auto">
            <div className="bg-white rounded-xl shadow-sm border border-[#ffeee3] p-8 md:p-12">
              <div className="md:flex items-center justify-between gap-8">
                <div className="md:w-2/3 mb-6 md:mb-0">
                  <h2 className="text-3xl font-bold text-[#2E2E2E] mb-4">Need Custom Resources?</h2>
                  <p className="text-[#2E2E2E] mb-6">
                    Our team can develop personalized resources tailored to your specific freelancing needs and goals.
                  </p>
                  <Link 
                    to="/talk-to-sales" 
                    className="inline-flex items-center bg-[#FF6B00] hover:bg-orange-600 text-white font-medium px-6 py-3 rounded-lg transition-colors duration-200"
                  >
                    Contact Our Team
                    <ExternalLink className="ml-2 w-4 h-4" />
                  </Link>
                </div>
                <div className="md:w-1/3 flex justify-center">
                  <div className="w-full max-w-xs">
                    <div className="bg-[#ffeee3] rounded-lg p-8 text-center">
                      <FileText className="w-16 h-16 text-[#FF6B00] mx-auto mb-4" />
                      <h3 className="text-lg font-semibold text-[#2E2E2E] mb-2">Custom Resources</h3>
                      <p className="text-sm text-[#2E2E2E]">Tailored guides and templates for your specific needs</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ResourcesPage;










