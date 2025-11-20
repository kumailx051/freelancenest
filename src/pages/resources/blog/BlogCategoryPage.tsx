import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Search, Clock, Filter, ArrowLeft } from 'lucide-react';

// Mock article data (in a real app, this would come from an API)
const articles = [
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
  }
];

// Blog categories
const allCategories = [
  "All",
  "Freelance Tips",
  "Client Management",
  "Business Growth",
  "Industry Insights",
  "Technology",
  "Success Stories",
  "Finance"
];

// Sort options
const sortOptions = [
  "Newest First",
  "Oldest First",
  "Most Popular",
  "A-Z",
  "Z-A"
];

const BlogCategoryPage: React.FC = () => {
  const { category } = useParams<{ category: string }>();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>(category || 'All');
  const [filteredArticles, setFilteredArticles] = useState<any[]>([]);
  const [sortBy, setSortBy] = useState("Newest First");
  const [showFilters, setShowFilters] = useState(false);

  // Display friendly category name
  const displayCategory = category 
    ? category.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ') 
    : 'All Categories';

  useEffect(() => {
    // Filter and sort articles
    let filtered = [...articles];
    
    // Apply category filter if not "All"
    if (selectedCategory !== "All") {
      filtered = filtered.filter(article => 
        article.category.toLowerCase() === selectedCategory.toLowerCase()
      );
    }
    
    // Apply search filter if query exists
    if (searchQuery.trim() !== '') {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(article => 
        article.title.toLowerCase().includes(query) || 
        article.excerpt.toLowerCase().includes(query) ||
        article.category.toLowerCase().includes(query) ||
        article.author.toLowerCase().includes(query)
      );
    }
    
    // Apply sorting
    switch (sortBy) {
      case "Newest First":
        filtered.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
        break;
      case "Oldest First":
        filtered.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
        break;
      case "Most Popular":
        // In a real app, this would sort by view count or some popularity metric
        // Here we're just randomizing for demonstration
        filtered.sort(() => Math.random() - 0.5);
        break;
      case "A-Z":
        filtered.sort((a, b) => a.title.localeCompare(b.title));
        break;
      case "Z-A":
        filtered.sort((a, b) => b.title.localeCompare(a.title));
        break;
      default:
        break;
    }
    
    setFilteredArticles(filtered);
  }, [selectedCategory, searchQuery, sortBy, category]);

  useEffect(() => {
    // Update selected category when route param changes
    if (category) {
      const formattedCategory = category.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
      setSelectedCategory(formattedCategory);
    } else {
      setSelectedCategory("All");
    }
  }, [category]);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category);
  };

  const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSortBy(e.target.value);
  };

  const toggleFilters = () => {
    setShowFilters(!showFilters);
  };

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
            Back to Main Blog
          </Link>
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
            {displayCategory}
          </h1>
          <p className="text-xl text-[#ffeee3] max-w-3xl">
            {category 
              ? `Browse our articles about ${displayCategory} to level up your freelancing skills.`
              : 'Browse our complete collection of freelancing articles, tips, and insights.'
            }
          </p>
        </div>
      </section>

      {/* Search and Filter Section */}
      <section className="py-8 -mt-8">
        <div className="max-w-6xl mx-auto px-4">
          <div className="bg-white rounded-xl shadow-sm p-4">
            <div className="flex flex-col md:flex-row gap-4">
              {/* Search Box */}
              <div className="relative flex-grow">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Search className="h-5 w-5 text-[#ffeee3]" />
                </div>
                <input
                  type="text"
                  placeholder="Search articles..."
                  value={searchQuery}
                  onChange={handleSearchChange}
                  className="pl-10 pr-4 py-2 w-full rounded-lg border border-[#ffeee3] focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                />
              </div>
              
              {/* Sort By (Desktop) */}
              <div className="hidden md:flex items-center">
                <label htmlFor="sortBy" className="mr-2 text-[#2E2E2E]">Sort by:</label>
                <select
                  id="sortBy"
                  value={sortBy}
                  onChange={handleSortChange}
                  className="py-2 px-3 rounded-lg border border-[#ffeee3] focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                >
                  {sortOptions.map((option) => (
                    <option key={option} value={option}>{option}</option>
                  ))}
                </select>
              </div>
              
              {/* Filter Button (Mobile) */}
              <button
                className="md:hidden flex items-center justify-center py-2 px-4 rounded-lg border border-[#ffeee3] bg-white"
                onClick={toggleFilters}
              >
                <Filter className="h-5 w-5 mr-2 text-[#2E2E2E]" />
                <span>Filter & Sort</span>
              </button>
            </div>
            
            {/* Mobile Filters */}
            {showFilters && (
              <div className="md:hidden mt-4 border-t pt-4">
                <div className="mb-4">
                  <label htmlFor="mobileSortBy" className="block mb-2 text-[#2E2E2E]">Sort by:</label>
                  <select
                    id="mobileSortBy"
                    value={sortBy}
                    onChange={handleSortChange}
                    className="w-full py-2 px-3 rounded-lg border border-[#ffeee3] focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  >
                    {sortOptions.map((option) => (
                      <option key={option} value={option}>{option}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block mb-2 text-[#2E2E2E]">Categories:</label>
                  <div className="flex flex-wrap gap-2">
                    {allCategories.map((cat) => (
                      <button
                        key={cat}
                        onClick={() => handleCategoryChange(cat)}
                        className={`px-3 py-1 text-sm rounded-md whitespace-nowrap transition-colors duration-200 ${
                          selectedCategory === cat
                            ? 'bg-primary-600 text-white'
                            : 'bg-[#ffeee3] text-[#2E2E2E] hover:bg-[#ffeee3]'
                        }`}
                      >
                        {cat}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )}
            
            {/* Desktop Categories */}
            <div className="hidden md:block mt-4 border-t pt-4">
              <div className="flex flex-wrap gap-2">
                {allCategories.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => handleCategoryChange(cat)}
                    className={`px-4 py-2 text-sm rounded-md whitespace-nowrap transition-colors duration-200 ${
                      selectedCategory === cat
                        ? 'bg-primary-600 text-white'
                        : 'bg-[#ffeee3] text-[#2E2E2E] hover:bg-[#ffeee3]'
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Articles Grid */}
      <section className="py-12">
        <div className="max-w-6xl mx-auto px-4">
          <div className="mb-6 flex justify-between items-center">
            <h2 className="text-xl font-bold">
              {filteredArticles.length} {filteredArticles.length === 1 ? 'Article' : 'Articles'} {selectedCategory !== "All" ? `in ${selectedCategory}` : ''}
            </h2>
          </div>
          
          {filteredArticles.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredArticles.map((article) => (
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
                      <span className="bg-[#ffeee3] text-primary-600 text-xs font-medium px-2.5 py-0.5 rounded">
                        {article.category}
                      </span>
                      <div className="ml-auto flex items-center text-[#ffeee3] text-sm">
                        <Clock className="w-3 h-3 mr-1" />
                        <span>{article.readTime}</span>
                      </div>
                    </div>
                    <h3 className="text-lg font-bold mb-3 line-clamp-2 hover:text-primary-600 transition-colors duration-200">
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
          ) : (
            <div className="bg-white rounded-xl p-8 text-center">
              <div className="mb-4">
                <Search className="h-12 w-12 text-[#ffeee3] mx-auto" />
              </div>
              <h3 className="text-xl font-bold mb-2">No articles found</h3>
              <p className="text-[#2E2E2E] mb-6">
                We couldn't find any articles matching your search. Try adjusting your filters or search term.
              </p>
              <button
                onClick={() => {
                  setSearchQuery('');
                  setSelectedCategory('All');
                  setSortBy('Newest First');
                }}
                className="bg-[#FF6B00] hover:bg-[#FF9F45] text-white font-medium py-2 px-6 rounded-lg transition-colors"
              >
                Clear All Filters
              </button>
            </div>
          )}
          
          {/* Pagination - Basic Example */}
          {filteredArticles.length > 0 && (
            <div className="mt-12 flex justify-center">
              <nav className="inline-flex rounded-md shadow-sm -space-x-px" aria-label="Pagination">
                <button className="px-3 py-2 rounded-l-md border border-[#ffeee3] bg-white text-sm font-medium text-[#ffeee3] hover:bg-[#ffeee3]">
                  Previous
                </button>
                <button className="px-4 py-2 border border-primary-500 bg-primary-50 text-sm font-medium text-primary-600">
                  1
                </button>
                <button className="px-4 py-2 border border-[#ffeee3] bg-white text-sm font-medium text-[#ffeee3] hover:bg-[#ffeee3]">
                  2
                </button>
                <button className="px-4 py-2 border border-[#ffeee3] bg-white text-sm font-medium text-[#ffeee3] hover:bg-[#ffeee3]">
                  3
                </button>
                <button className="px-3 py-2 rounded-r-md border border-[#ffeee3] bg-white text-sm font-medium text-[#ffeee3] hover:bg-[#ffeee3]">
                  Next
                </button>
              </nav>
            </div>
          )}
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="py-16 bg-gradient-to-r from-primary-500 to-blue-600 text-white">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6">Stay Updated with Our Newsletter</h2>
          <p className="text-xl opacity-90 mb-8">
            Get the latest articles, tips, and resources delivered directly to your inbox.
          </p>
          <div className="flex flex-col md:flex-row max-w-lg mx-auto gap-4">
            <input
              type="email"
              placeholder="Your email address"
              className="flex-grow px-4 py-3 rounded-lg bg-white/20 backdrop-blur-sm border border-white/30 text-white placeholder-blue-100 focus:outline-none focus:ring-2 focus:ring-white/50"
            />
            <button className="bg-white text-primary-600 hover:bg-[#ffeee3] font-medium px-6 py-3 rounded-lg transition-colors duration-200">
              Subscribe
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default BlogCategoryPage;












