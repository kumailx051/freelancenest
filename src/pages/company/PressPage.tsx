import React, { useState } from 'react';
import { Calendar, Download, ChevronDown, ExternalLink, Filter, Search, Clock } from 'lucide-react';
import { Link } from 'react-router-dom';

const PressPage: React.FC = () => {
  // State for search and filters
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  
  // Press release categories
  const categories = ['All', 'Company News', 'Product Updates', 'Financial News', 'Awards', 'Partnerships'];

  // Press releases data
  const pressReleases = [
    {
      id: 1,
      title: "FreelanceNest Raises $50M in Series C Funding",
      category: "Financial News",
      date: "August 10, 2025",
      summary: "Funding will accelerate international expansion and enhance platform capabilities to meet growing demand for remote talent.",
      featured: true,
      image: "https://images.unsplash.com/photo-1553729459-efe14ef6055d?auto=format&fit=crop&w=800"
    },
    {
      id: 2,
      title: "FreelanceNest Named to Fast Company's Most Innovative Companies List",
      category: "Awards",
      date: "July 25, 2025",
      summary: "Recognized for transformative impact on the future of work and innovative features that connect global talent with opportunity.",
      featured: true,
      image: "https://images.unsplash.com/photo-1589829545856-d10d557cf95f?auto=format&fit=crop&w=800"
    },
    {
      id: 3,
      title: "FreelanceNest Launches Enterprise Solution for Fortune 500 Companies",
      category: "Product Updates",
      date: "June 18, 2025",
      summary: "New enterprise offering provides large organizations with enhanced tools for managing freelance talent at scale."
    },
    {
      id: 4,
      title: "FreelanceNest Expands Operations to 15 New Countries",
      category: "Company News",
      date: "May 30, 2025",
      summary: "Platform now available in 50+ countries with localized features and payment options to support global freelance economy."
    },
    {
      id: 5,
      title: "FreelanceNest Partners with Global Skills Alliance to Provide Certification Programs",
      category: "Partnerships",
      date: "May 15, 2025",
      summary: "Strategic partnership will offer freelancers access to industry-recognized certifications to validate skills and increase earning potential."
    },
    {
      id: 6,
      title: "FreelanceNest Reaches 2.5 Million Registered Users",
      category: "Company News",
      date: "April 22, 2025",
      summary: "Platform achieves significant growth milestone, with freelancers earning over $1 billion collectively through the platform."
    },
    {
      id: 7,
      title: "FreelanceNest Introduces AI-Powered Matching Technology",
      category: "Product Updates",
      date: "March 30, 2025",
      summary: "New feature uses advanced algorithms to match freelancers with projects based on skills, experience, and project requirements."
    },
    {
      id: 8,
      title: "FreelanceNest CEO Named to Bloomberg's Top 50 People to Watch",
      category: "Company News",
      date: "March 10, 2025",
      summary: "Sarah Johnson recognized for leadership in transforming the global freelance marketplace and advocating for remote work policies."
    }
  ];

  // Media coverage data
  const mediaCoverage = [
    {
      id: 1,
      outlet: "TechCrunch",
      title: "How FreelanceNest Is Transforming the Future of Work",
      date: "July 15, 2025",
      link: "#",
      logo: "https://via.placeholder.com/150x50?text=TechCrunch"
    },
    {
      id: 2,
      outlet: "Forbes",
      title: "FreelanceNest: The Platform Revolutionizing Freelance Work",
      date: "June 28, 2025",
      link: "#",
      logo: "https://via.placeholder.com/150x50?text=Forbes"
    },
    {
      id: 3,
      outlet: "The Wall Street Journal",
      title: "Remote Work Revolution: FreelanceNest Leads the Charge",
      date: "May 22, 2025",
      link: "#",
      logo: "https://via.placeholder.com/150x50?text=WSJ"
    },
    {
      id: 4,
      outlet: "Bloomberg",
      title: "FreelanceNest's $50M Funding Round Signals Growing Investor Confidence",
      date: "August 12, 2025",
      link: "#",
      logo: "https://via.placeholder.com/150x50?text=Bloomberg"
    }
  ];

  // Media kit resources
  const mediaKitResources = [
    {
      title: "Brand Guidelines",
      description: "Complete guide to FreelanceNest's visual identity, including logo usage, color palette, typography, and brand voice.",
      fileType: "PDF",
      fileSize: "2.4 MB"
    },
    {
      title: "Logo Package",
      description: "High-resolution logo files in various formats (PNG, SVG, EPS) for light and dark backgrounds.",
      fileType: "ZIP",
      fileSize: "8.5 MB"
    },
    {
      title: "Leadership Photos",
      description: "Professional headshots and action photos of FreelanceNest's executive team for media use.",
      fileType: "ZIP",
      fileSize: "12.3 MB"
    },
    {
      title: "Product Screenshots",
      description: "High-resolution screenshots of the FreelanceNest platform showing key features and user interface.",
      fileType: "ZIP",
      fileSize: "15.7 MB"
    },
    {
      title: "Company Fact Sheet",
      description: "Key statistics, milestones, and information about FreelanceNest for quick reference.",
      fileType: "PDF",
      fileSize: "1.2 MB"
    }
  ];

  // Filter press releases based on search and category
  const filteredPressReleases = pressReleases.filter(release => {
    const matchesSearch = release.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          release.summary.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || release.category === selectedCategory;
    
    return matchesSearch && matchesCategory;
  });

  // Featured press releases
  const featuredReleases = filteredPressReleases.filter(release => release.featured);

  // Regular press releases
  const regularReleases = filteredPressReleases.filter(release => !release.featured);

  return (
    <div className="min-h-screen bg-[#ffeee3]">
      {/* Hero Section */}
      <section className="pt-40 pb-16 bg-[#2E2E2E] text-white">
        <div className="section-container">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Press & Media</h1>
            <p className="text-xl mb-8 text-[#ffeee3]">
              Latest news, press releases, and resources from FreelanceNest. For press inquiries, please contact our media relations team.
            </p>
            <div className="flex flex-wrap gap-4">
              <button className="bg-white text-[#FF6B00] border-2 border-[#FF6B00] px-6 py-3 rounded-lg font-semibold hover:bg-[#2E2E2E] hover:text-white transition-all flex items-center">
                <Download className="w-5 h-5 mr-2" />
                Media Kit
              </button>
              <button className="bg-[#FF9F45] hover:bg-[#2E2E2E] text-white px-6 py-3 rounded-lg font-medium transition-colors duration-200">
                Contact Press Team
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Press Releases */}
      {featuredReleases.length > 0 && (
        <section className="py-16 bg-white">
          <div className="section-container">
            <div className="max-w-3xl mx-auto text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-6">Featured News</h2>
              <p className="text-xl text-[#2E2E2E]">
                Our latest and most significant announcements
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {featuredReleases.map((release) => (
                <div key={release.id} className="bg-[#ffeee3] rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-200">
                  {release.image && (
                    <div className="h-48 overflow-hidden">
                      <img 
                        src={release.image} 
                        alt={release.title} 
                        className="w-full h-full object-cover"
                      />
                    </div>
                  )}
                  <div className="p-6">
                    <div className="flex justify-between items-center mb-4">
                      <span className="inline-block bg-[#ffeee3] text-[#FF9F45] px-3 py-1 rounded-full text-sm font-medium">
                        {release.category}
                      </span>
                      <span className="text-[#ffeee3] text-sm flex items-center">
                        <Calendar className="w-4 h-4 mr-1" />
                        {release.date}
                      </span>
                    </div>
                    <h3 className="text-xl font-bold mb-3">{release.title}</h3>
                    <p className="text-[#2E2E2E] mb-6">{release.summary}</p>
                    <Link 
                      to={`#`} 
                      className="text-[#FF6B00] hover:text-[#FF9F45] font-medium flex items-center"
                    >
                      Read Full Release
                      <ChevronDown className="w-4 h-4 ml-1 transform rotate-270" />
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Press Releases */}
      <section className="py-16">
        <div className="section-container">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Press Releases</h2>
            <p className="text-xl text-[#2E2E2E] mb-8">
              Official announcements from FreelanceNest
            </p>

            {/* Search and Filter */}
            <div className="max-w-2xl mx-auto mb-12">
              <div className="flex flex-col md:flex-row gap-4">
                <div className="flex-1 relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#ffeee3]" />
                  <input 
                    type="text"
                    placeholder="Search press releases..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 rounded-lg border border-[#ffeee3] focus:outline-none focus:ring-2 focus:ring-[#ffeee3]0"
                  />
                </div>
                <div className="relative md:w-48">
                  <div className="flex items-center border border-[#ffeee3] rounded-lg bg-white">
                    <Filter className="ml-3 text-[#ffeee3]" />
                    <select
                      value={selectedCategory}
                      onChange={(e) => setSelectedCategory(e.target.value)}
                      className="appearance-none w-full pl-2 pr-8 py-3 focus:outline-none text-[#2E2E2E] bg-transparent"
                    >
                      {categories.map((category) => (
                        <option key={category} value={category}>{category}</option>
                      ))}
                    </select>
                    <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-[#ffeee3] pointer-events-none" />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Press Release List */}
          <div className="max-w-4xl mx-auto">
            {regularReleases.length > 0 ? (
              <div className="space-y-4">
                {regularReleases.map((release) => (
                  <div 
                    key={release.id} 
                    className="bg-white shadow-sm hover:shadow-md rounded-xl overflow-hidden transition-shadow duration-200"
                  >
                    <div className="p-6">
                      <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4 mb-4">
                        <div>
                          <div className="flex items-center mb-2 text-sm text-[#ffeee3]">
                            <Calendar className="w-4 h-4 mr-1" />
                            <span className="mr-3">{release.date}</span>
                            <span className="inline-block bg-[#ffeee3] text-[#2E2E2E] px-3 py-1 rounded-full text-xs font-medium">
                              {release.category}
                            </span>
                          </div>
                          <h3 className="text-xl font-bold">{release.title}</h3>
                        </div>
                        <div className="flex gap-3 self-start md:self-center">
                          <button className="px-4 py-2 bg-[#ffeee3] text-[#FF9F45] hover:bg-[#ffeee3] rounded-lg text-sm font-medium transition-colors duration-200">
                            Read More
                          </button>
                        </div>
                      </div>
                      <p className="text-[#2E2E2E]">{release.summary}</p>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-12 bg-white rounded-xl shadow-sm">
                <div className="text-[#ffeee3] mb-2">No press releases found matching your criteria.</div>
                <div className="text-[#2E2E2E]">Try adjusting your search or filter.</div>
              </div>
            )}

            <div className="mt-8 text-center">
              <button className="px-6 py-3 bg-[#ffeee3] hover:bg-[#ffeee3] text-[#2E2E2E] rounded-lg font-medium transition-colors duration-200">
                Load More
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Media Coverage */}
      <section className="py-16 bg-white">
        <div className="section-container">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Media Coverage</h2>
            <p className="text-xl text-[#2E2E2E]">
              Recent articles and features about FreelanceNest in the press
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {mediaCoverage.map((article) => (
              <a 
                key={article.id}
                href={article.link}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-[#ffeee3] rounded-xl p-6 hover:shadow-md transition-shadow duration-200 flex flex-col"
              >
                <div className="flex items-center justify-between mb-6">
                  <img 
                    src={article.logo} 
                    alt={article.outlet} 
                    className="h-8 object-contain"
                  />
                  <div className="flex items-center text-[#ffeee3] text-sm">
                    <Clock className="w-4 h-4 mr-1" />
                    {article.date}
                  </div>
                </div>
                <h3 className="text-xl font-bold mb-4">{article.title}</h3>
                <div className="mt-auto flex items-center text-[#FF6B00] font-medium">
                  <span>Read Article</span>
                  <ExternalLink className="w-4 h-4 ml-1" />
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Media Kit */}
      <section className="py-16 bg-[#ffeee3]">
        <div className="section-container">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Media Kit</h2>
            <p className="text-xl text-[#2E2E2E]">
              Download official FreelanceNest assets for media use
            </p>
          </div>

          <div className="max-w-4xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {mediaKitResources.map((resource, index) => (
                <div 
                  key={index} 
                  className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow duration-200"
                >
                  <div className="flex justify-between items-start mb-4">
                    <h3 className="text-xl font-bold">{resource.title}</h3>
                    <div className="bg-[#ffeee3] text-[#2E2E2E] px-3 py-1 rounded-md text-sm font-medium">
                      {resource.fileType}
                    </div>
                  </div>
                  <p className="text-[#2E2E2E] mb-6">{resource.description}</p>
                  <div className="flex justify-between items-center">
                    <span className="text-[#ffeee3] text-sm">{resource.fileSize}</span>
                    <button className="flex items-center text-[#FF6B00] hover:text-[#FF9F45] font-medium">
                      <Download className="w-4 h-4 mr-1" />
                      Download
                    </button>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-12 text-center">
              <p className="text-[#2E2E2E] mb-6">
                Need something specific that's not included here? Contact our press team for additional resources.
              </p>
              <button className="bg-[#2E2E2E] text-white px-6 py-3 rounded-lg font-semibold hover:bg-[#FF9F45] transition-all-sm">
                Contact Press Team
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Press Contact */}
      <section className="py-16 bg-[#2E2E2E] text-white">
        <div className="section-container">
          <div className="max-w-4xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h2 className="text-3xl font-bold mb-6">Press Contact</h2>
                <p className="mb-8 text-[#ffeee3]">
                  For press inquiries, interview requests, or additional information about FreelanceNest, please contact our media relations team.
                </p>
                
                <div className="space-y-4">
                  <div>
                    <div className="font-medium">Media Relations</div>
                    <div className="text-[#ffeee3]">press@freelancenest.com</div>
                  </div>
                  <div>
                    <div className="font-medium">Press Office</div>
                    <div className="text-[#ffeee3]">+1 (555) 234-5678</div>
                  </div>
                </div>
              </div>
              
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6">
                <h3 className="text-xl font-bold mb-4">Stay Updated</h3>
                <p className="mb-6 text-[#ffeee3]">
                  Subscribe to our press distribution list to receive the latest news and announcements directly to your inbox.
                </p>
                
                <form>
                  <div className="mb-4">
                    <label className="block text-sm font-medium mb-2">Name</label>
                    <input 
                      type="text" 
                      className="w-full px-4 py-2 rounded-lg bg-white/5 border border-white/10 text-white placeholder-blue-200 focus:outline-none focus:ring-2 focus:ring-white/20"
                      placeholder="Your name"
                    />
                  </div>
                  <div className="mb-4">
                    <label className="block text-sm font-medium mb-2">Email</label>
                    <input 
                      type="email" 
                      className="w-full px-4 py-2 rounded-lg bg-white/5 border border-white/10 text-white placeholder-blue-200 focus:outline-none focus:ring-2 focus:ring-white/20"
                      placeholder="Your email address"
                    />
                  </div>
                  <div className="mb-6">
                    <label className="block text-sm font-medium mb-2">Organization</label>
                    <input 
                      type="text" 
                      className="w-full px-4 py-2 rounded-lg bg-white/5 border border-white/10 text-white placeholder-blue-200 focus:outline-none focus:ring-2 focus:ring-white/20"
                      placeholder="Your publication or organization"
                    />
                  </div>
                  <button 
                    type="submit"
                    className="w-full bg-white text-[#FF9F45] hover:bg-[#ffeee3] py-3 rounded-lg font-medium transition-colors duration-200"
                  >
                    Subscribe to Press Updates
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default PressPage;

















