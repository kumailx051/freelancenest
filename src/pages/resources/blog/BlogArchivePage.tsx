import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Search, Clock, ArrowLeft, Calendar, ArrowRight } from 'lucide-react';

// Mock article data (in a real app, this would come from an API)
const allArticles = [
  {
    id: "1",
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
    id: "2",
    title: "The Future of Remote Work: Trends to Watch in 2024",
    excerpt: "Explore emerging trends in remote work and how they'll impact freelancers and independent professionals in the coming year.",
    image: "https://via.placeholder.com/800x450?text=Future+of+Remote+Work",
    category: "Industry Insights",
    author: "Sophia Chen",
    authorImage: "https://randomuser.me/api/portraits/women/44.jpg",
    date: "August 10, 2023",
    readTime: "10 min",
    featured: true
  },
  {
    id: "3",
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
    id: "4",
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
    id: "5",
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
    id: "6",
    title: "AI Tools Every Freelancer Should Be Using",
    excerpt: "Explore the latest AI-powered tools that can help you automate tasks and increase your productivity.",
    image: "https://via.placeholder.com/600x350?text=AI+Tools",
    category: "Technology",
    author: "Jasmine Patel",
    authorImage: "https://randomuser.me/api/portraits/women/26.jpg",
    date: "July 15, 2023",
    readTime: "9 min"
  },
  {
    id: "7",
    title: "Setting Your Freelance Rates: A Comprehensive Guide",
    excerpt: "Learn proven strategies for pricing your services based on value, expertise, and market dynamics.",
    image: "https://via.placeholder.com/600x350?text=Freelance+Rates",
    category: "Finance",
    author: "Thomas Wright",
    authorImage: "https://randomuser.me/api/portraits/men/39.jpg",
    date: "July 10, 2023",
    readTime: "11 min"
  },
  {
    id: "8",
    title: "How to Handle Difficult Clients (Without Losing Them)",
    excerpt: "Master the art of managing challenging client relationships while maintaining professionalism and setting boundaries.",
    image: "https://via.placeholder.com/600x350?text=Difficult+Clients",
    category: "Client Management",
    author: "Sarah Jones",
    authorImage: "https://randomuser.me/api/portraits/women/63.jpg",
    date: "July 5, 2023",
    readTime: "7 min"
  },
  {
    id: "9",
    title: "The Freelancer's Guide to Tax Deductions",
    excerpt: "Ensure you're not leaving money on the table with this comprehensive guide to tax deductions for independent professionals.",
    image: "https://via.placeholder.com/600x350?text=Tax+Deductions",
    category: "Finance",
    author: "Robert Thompson",
    authorImage: "https://randomuser.me/api/portraits/men/55.jpg",
    date: "June 28, 2023",
    readTime: "8 min"
  },
  {
    id: "10",
    title: "Creating Recurring Revenue Streams as a Freelancer",
    excerpt: "Break free from the feast-and-famine cycle by establishing reliable, recurring revenue in your freelance business.",
    image: "https://via.placeholder.com/600x350?text=Recurring+Revenue",
    category: "Business Growth",
    author: "Jennifer Miller",
    authorImage: "https://randomuser.me/api/portraits/women/17.jpg",
    date: "June 20, 2023",
    readTime: "9 min"
  },
  {
    id: "11",
    title: "Time Management Techniques for Remote Workers",
    excerpt: "Master your schedule and boost productivity with these proven time management strategies for remote professionals.",
    image: "https://via.placeholder.com/600x350?text=Time+Management",
    category: "Freelance Tips",
    author: "Daniel Lee",
    authorImage: "https://randomuser.me/api/portraits/men/11.jpg",
    date: "June 15, 2023",
    readTime: "6 min"
  },
  // Older articles
  {
    id: "12",
    title: "Navigating Contract Negotiations as a Freelancer",
    excerpt: "Learn how to confidently negotiate contracts that protect your interests and set you up for successful client relationships.",
    image: "https://via.placeholder.com/600x350?text=Contract+Negotiations",
    category: "Client Management",
    author: "Rachel Garcia",
    authorImage: "https://randomuser.me/api/portraits/women/28.jpg",
    date: "May 25, 2023",
    readTime: "8 min"
  },
  {
    id: "13",
    title: "Building a Freelance Portfolio That Converts",
    excerpt: "Transform your portfolio from a simple showcase into a powerful marketing tool that convinces clients to hire you.",
    image: "https://via.placeholder.com/600x350?text=Freelance+Portfolio",
    category: "Freelance Tips",
    author: "Jason Kim",
    authorImage: "https://randomuser.me/api/portraits/men/77.jpg",
    date: "May 12, 2023",
    readTime: "7 min"
  },
  {
    id: "14",
    title: "The Psychology of Pricing: Why Clients Choose Certain Freelancers",
    excerpt: "Understand the psychological factors that influence how clients perceive and respond to your pricing strategies.",
    image: "https://via.placeholder.com/600x350?text=Psychology+Of+Pricing",
    category: "Business Growth",
    author: "Olivia Martinez",
    authorImage: "https://randomuser.me/api/portraits/women/90.jpg",
    date: "April 30, 2023",
    readTime: "10 min"
  },
  {
    id: "15",
    title: "Health Insurance Options for Freelancers",
    excerpt: "Navigate the complex world of health insurance with this guide specifically designed for independent professionals.",
    image: "https://via.placeholder.com/600x350?text=Health+Insurance",
    category: "Finance",
    author: "Marcus Johnson",
    authorImage: "https://randomuser.me/api/portraits/men/41.jpg",
    date: "April 18, 2023",
    readTime: "9 min"
  },
  {
    id: "16",
    title: "Crafting Proposals That Win High-Value Projects",
    excerpt: "Learn how to create compelling proposals that stand out from the competition and win you lucrative client projects.",
    image: "https://via.placeholder.com/600x350?text=Winning+Proposals",
    category: "Business Growth",
    author: "Sophia Chen",
    authorImage: "https://randomuser.me/api/portraits/women/44.jpg",
    date: "March 25, 2023",
    readTime: "8 min"
  },
  {
    id: "17",
    title: "The Ultimate Guide to Remote Communication Tools",
    excerpt: "Discover the best tools and strategies for effective communication with clients and collaborators when working remotely.",
    image: "https://via.placeholder.com/600x350?text=Communication+Tools",
    category: "Technology",
    author: "David Wilson",
    authorImage: "https://randomuser.me/api/portraits/men/45.jpg",
    date: "February 15, 2023",
    readTime: "7 min"
  },
  {
    id: "18",
    title: "From Freelancer to Agency: Scaling Your Business",
    excerpt: "Explore the steps, challenges, and strategies involved in transitioning from solo freelancer to running your own agency.",
    image: "https://via.placeholder.com/600x350?text=Scaling+Your+Business",
    category: "Business Growth",
    author: "Alex Morgan",
    authorImage: "https://randomuser.me/api/portraits/men/32.jpg",
    date: "January 20, 2023",
    readTime: "12 min"
  }
];

// Group articles by year and month
const groupArticlesByDate = (articles: any[]) => {
  const grouped: Record<string, Record<string, any[]>> = {};
  
  articles.forEach(article => {
    const date = new Date(article.date);
    const year = date.getFullYear().toString();
    const month = date.toLocaleString('default', { month: 'long' });
    
    if (!grouped[year]) {
      grouped[year] = {};
    }
    
    if (!grouped[year][month]) {
      grouped[year][month] = [];
    }
    
    grouped[year][month].push(article);
  });
  
  return grouped;
};

const BlogArchivePage: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredArticles, setFilteredArticles] = useState<any[]>(allArticles);
  const [groupedArticles, setGroupedArticles] = useState<Record<string, Record<string, any[]>>>({});
  const [activeYear, setActiveYear] = useState<string | null>(null);
  
  useEffect(() => {
    // Filter articles based on search query
    const filtered = searchQuery.trim() === '' 
      ? allArticles 
      : allArticles.filter(article => {
          const query = searchQuery.toLowerCase();
          return (
            article.title.toLowerCase().includes(query) || 
            article.excerpt.toLowerCase().includes(query) ||
            article.category.toLowerCase().includes(query) ||
            article.author.toLowerCase().includes(query)
          );
        });
    
    setFilteredArticles(filtered);
    
    // Group filtered articles by date
    const grouped = groupArticlesByDate(filtered);
    setGroupedArticles(grouped);
    
    // Set active year to the most recent if not already set
    if (!activeYear && Object.keys(grouped).length > 0) {
      setActiveYear(Object.keys(grouped).sort().reverse()[0]);
    }
  }, [searchQuery]);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const handleYearClick = (year: string) => {
    setActiveYear(year);
  };

  // Get total count of articles per year
  const getYearCounts = () => {
    const counts: Record<string, number> = {};
    
    Object.entries(groupedArticles).forEach(([year, months]) => {
      counts[year] = Object.values(months).reduce((total, articles) => total + articles.length, 0);
    });
    
    return counts;
  };

  const yearCounts = getYearCounts();

  return (
    <div className="min-h-screen bg-[#ffeee3]">
      {/* Hero Section */}
      <section className="pt-40 pb-20 bg-gradient-to-r from-primary-500 to-blue-600 text-white">
        <div className="max-w-6xl mx-auto px-4">
          <Link 
            to="/resources/blog" 
            className="inline-flex items-center text-[#ffeee3] hover:text-white mb-6"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Blog
          </Link>
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
            Article Archive
          </h1>
          <p className="text-xl text-[#ffeee3] max-w-3xl">
            Browse our complete collection of articles and resources organized by date.
          </p>
        </div>
      </section>

      {/* Search Section */}
      <section className="py-8 -mt-8">
        <div className="max-w-6xl mx-auto px-4">
          <div className="bg-white rounded-xl shadow-sm p-4">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-[#ffeee3]" />
              </div>
              <input
                type="text"
                placeholder="Search the archive..."
                value={searchQuery}
                onChange={handleSearchChange}
                className="pl-10 pr-4 py-3 w-full rounded-lg border border-[#ffeee3] focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Archive Content */}
      <section className="py-12">
        <div className="max-w-6xl mx-auto px-4">
          {filteredArticles.length > 0 ? (
            <div className="flex flex-col md:flex-row gap-8">
              {/* Year Navigation */}
              <div className="w-full md:w-1/4">
                <div className="bg-white rounded-xl shadow-sm p-6">
                  <h2 className="text-xl font-bold mb-4">Browse by Year</h2>
                  <nav className="space-y-2">
                    {Object.keys(groupedArticles).sort().reverse().map((year) => (
                      <button
                        key={year}
                        onClick={() => handleYearClick(year)}
                        className={`flex justify-between items-center w-full py-2 px-3 rounded-lg transition-colors ${
                          activeYear === year
                            ? 'bg-primary-50 text-primary-600'
                            : 'text-[#2E2E2E] hover:bg-[#ffeee3]'
                        }`}
                      >
                        <span className={activeYear === year ? 'font-medium' : ''}>{year}</span>
                        <span className="bg-[#ffeee3] text-[#2E2E2E] text-xs font-medium px-2 py-1 rounded-full">
                          {yearCounts[year]}
                        </span>
                      </button>
                    ))}
                  </nav>
                </div>
              </div>
              
              {/* Articles by Month */}
              <div className="w-full md:w-3/4">
                {activeYear && groupedArticles[activeYear] ? (
                  <div className="space-y-10">
                    {Object.keys(groupedArticles[activeYear]).sort((a, b) => {
                      const months = [
                        'January', 'February', 'March', 'April', 'May', 'June',
                        'July', 'August', 'September', 'October', 'November', 'December'
                      ];
                      return months.indexOf(b) - months.indexOf(a);
                    }).map((month) => (
                      <div key={month} className="bg-white rounded-xl shadow-sm overflow-hidden">
                        <div className="bg-[#ffeee3] p-4 border-b border-[#ffeee3]">
                          <div className="flex items-center">
                            <Calendar className="w-5 h-5 text-primary-600 mr-2" />
                            <h3 className="text-lg font-bold">
                              {month} {activeYear}
                            </h3>
                            <span className="ml-2 bg-[#ffeee3] text-[#2E2E2E] text-xs font-medium px-2 py-1 rounded-full">
                              {groupedArticles[activeYear][month].length} {groupedArticles[activeYear][month].length === 1 ? 'article' : 'articles'}
                            </span>
                          </div>
                        </div>
                        <div className="divide-y divide-gray-100">
                          {groupedArticles[activeYear][month].map((article) => (
                            <div key={article.id} className="p-6 hover:bg-[#ffeee3] transition-colors">
                              <div className="flex flex-col sm:flex-row gap-6">
                                <div className="sm:w-1/4 lg:w-1/5">
                                  <Link to={`/blog/article/${article.id}`}>
                                    <img
                                      src={article.image}
                                      alt={article.title}
                                      className="w-full h-24 object-cover rounded-lg"
                                    />
                                  </Link>
                                </div>
                                <div className="sm:w-3/4 lg:w-4/5">
                                  <span className="inline-block bg-[#ffeee3] text-primary-600 text-xs font-medium px-2.5 py-0.5 rounded mb-2">
                                    {article.category}
                                  </span>
                                  <h3 className="text-lg font-bold mb-1 hover:text-primary-600 transition-colors duration-200">
                                    <Link to={`/blog/article/${article.id}`}>{article.title}</Link>
                                  </h3>
                                  <p className="text-sm text-[#2E2E2E] mb-3 line-clamp-2">{article.excerpt}</p>
                                  <div className="flex justify-between items-center">
                                    <div className="flex items-center">
                                      <img
                                        src={article.authorImage}
                                        alt={article.author}
                                        className="w-6 h-6 rounded-full object-cover mr-2"
                                      />
                                      <span className="text-sm text-[#2E2E2E]">{article.author}</span>
                                    </div>
                                    <div className="flex items-center text-[#ffeee3] text-sm">
                                      <Clock className="w-3 h-3 mr-1" />
                                      <span>{article.readTime}</span>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="bg-white rounded-xl p-8 text-center">
                    <h3 className="text-xl font-bold mb-2">No articles found</h3>
                    <p className="text-[#2E2E2E] mb-6">
                      We couldn't find any articles matching your search.
                    </p>
                    <button
                      onClick={() => setSearchQuery('')}
                      className="bg-[#FF6B00] hover:bg-[#FF9F45] text-white font-medium py-2 px-6 rounded-lg transition-colors"
                    >
                      Clear Search
                    </button>
                  </div>
                )}
              </div>
            </div>
          ) : (
            <div className="bg-white rounded-xl p-8 text-center">
              <div className="mb-4">
                <Search className="h-12 w-12 text-[#ffeee3] mx-auto" />
              </div>
              <h3 className="text-xl font-bold mb-2">No articles found</h3>
              <p className="text-[#2E2E2E] mb-6">
                We couldn't find any articles matching your search.
              </p>
              <button
                onClick={() => setSearchQuery('')}
                className="bg-[#FF6B00] hover:bg-[#FF9F45] text-white font-medium py-2 px-6 rounded-lg transition-colors"
              >
                Clear Search
              </button>
            </div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-primary-500 to-blue-600 text-white">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6">Explore More Content</h2>
          <p className="text-xl opacity-90 mb-8">
            Dive deeper into specific topics or browse our latest articles for more insights and tips.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link 
              to="/resources/blog" 
              className="inline-flex items-center justify-center bg-white text-primary-600 hover:bg-[#ffeee3] font-medium px-6 py-3 rounded-lg transition-colors duration-200"
            >
              Latest Articles
              <ArrowRight className="ml-2 w-4 h-4" />
            </Link>
            <Link 
              to="/resources/library" 
              className="inline-flex items-center justify-center bg-transparent text-white border border-white hover:bg-white/10 font-medium px-6 py-3 rounded-lg transition-colors duration-200"
            >
              Resource Library
              <ArrowRight className="ml-2 w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default BlogArchivePage;











