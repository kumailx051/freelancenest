import React, { useState } from 'react';
import { Search, Filter, Grid, List, TrendingUp } from 'lucide-react';
import Header from '../components/common/Header';
import Footer from '../components/common/Footer';
import { Button } from '../components/ui/Button';

const BrowseCategoriesPage: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  const categories = [
    {
      id: 1,
      name: 'Web Development',
      description: 'Build websites and web applications',
      projectCount: '12,500+',
      startingPrice: '$25',
      icon: 'ðŸ’»',
      trending: true
    },
    {
      id: 2,
      name: 'Mobile Development',
      description: 'iOS and Android app development',
      projectCount: '8,200+',
      startingPrice: '$30',
      icon: 'ðŸ“±',
      trending: false
    },
    {
      id: 3,
      name: 'UI/UX Design',
      description: 'User interface and experience design',
      projectCount: '9,800+',
      startingPrice: '$20',
      icon: 'ðŸŽ¨',
      trending: true
    },
    {
      id: 4,
      name: 'Digital Marketing',
      description: 'SEO, social media, and online marketing',
      projectCount: '15,300+',
      startingPrice: '$15',
      icon: 'ðŸ“ˆ',
      trending: false
    },
    {
      id: 5,
      name: 'Content Writing',
      description: 'Articles, blogs, and copywriting',
      projectCount: '18,700+',
      startingPrice: '$10',
      icon: 'âœï¸',
      trending: true
    },
    {
      id: 6,
      name: 'Data Science',
      description: 'Analytics, machine learning, and AI',
      projectCount: '6,400+',
      startingPrice: '$40',
      icon: 'ðŸ“Š',
      trending: false
    },
    {
      id: 7,
      name: 'Video Editing',
      description: 'Video production and post-processing',
      projectCount: '5,600+',
      startingPrice: '$35',
      icon: 'ðŸŽ¬',
      trending: false
    },
    {
      id: 8,
      name: 'Graphic Design',
      description: 'Logos, branding, and visual design',
      projectCount: '11,200+',
      startingPrice: '$18',
      icon: 'ðŸŽ­',
      trending: true
    }
  ];

  const popularTags = [
    'React', 'Node.js', 'Python', 'WordPress', 'Shopify', 'Logo Design', 
    'SEO', 'Social Media', 'iOS', 'Android'
  ];

  const filteredCategories = categories.filter(category =>
    category.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    category.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-[#ffeee3]">
      <Header />
      
      {/* Hero Section */}
      <section className="pt-40 pb-16 bg-gradient-to-r from-primary-500 to-purple-600">
        <div className="section-container">
          <div className="text-center text-white">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Browse Categories
            </h1>
            <p className="text-xl text-[#ffeee3] mb-8 max-w-2xl mx-auto">
              Discover thousands of services and find the perfect freelancer for your project
            </p>
            
            {/* Search Bar */}
            <div className="max-w-2xl mx-auto relative">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-[#ffeee3] w-5 h-5" />
                <input
                  type="text"
                  placeholder="What service are you looking for?"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-12 pr-4 py-4 text-lg rounded-xl border-0 focus:outline-none focus:ring-2 focus:ring-white text-[#2E2E2E]"
                />
              </div>
            </div>

            {/* Popular Tags */}
            <div className="mt-6">
              <p className="text-[#ffeee3] mb-3">Popular:</p>
              <div className="flex flex-wrap justify-center gap-2">
                {popularTags.map((tag) => (
                  <button
                    key={tag}
                    className="px-4 py-2 bg-white/20 hover:bg-white/30 rounded-full text-sm font-medium transition-colors duration-200"
                  >
                    {tag}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-12">
        <div className="section-container">
          {/* Filters and View Controls */}
          <div className="flex flex-col sm:flex-row justify-between items-center mb-8 gap-4">
            <div className="flex items-center gap-4">
              <Button variant="outline" size="sm" icon={Filter}>
                Filters
              </Button>
              <span className="text-[#2E2E2E]">
                {filteredCategories.length} categories found
              </span>
            </div>
            
            <div className="flex items-center gap-2">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-2 rounded-lg transition-colors duration-200 ${
                  viewMode === 'grid' ? 'bg-primary-500 text-white' : 'text-[#2E2E2E] hover:bg-[#ffeee3]'
                }`}
              >
                <Grid className="w-5 h-5" />
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`p-2 rounded-lg transition-colors duration-200 ${
                  viewMode === 'list' ? 'bg-primary-500 text-white' : 'text-[#2E2E2E] hover:bg-[#ffeee3]'
                }`}
              >
                <List className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Categories Grid */}
          <div className={`grid gap-6 ${
            viewMode === 'grid' 
              ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4' 
              : 'grid-cols-1'
          }`}>
            {filteredCategories.map((category) => (
              <div
                key={category.id}
                className={`bg-white rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden group cursor-pointer border border-[#ffeee3] hover:border-primary-200 ${
                  viewMode === 'list' ? 'flex items-center p-6' : 'p-6'
                }`}
              >
                {/* Category Icon & Trending Badge */}
                <div className={`relative ${viewMode === 'list' ? 'mr-6' : 'mb-4'}`}>
                  <div className="text-4xl mb-2">{category.icon}</div>
                  {category.trending && (
                    <div className="absolute -top-2 -right-2 bg-success-500 text-white text-xs px-2 py-1 rounded-full flex items-center">
                      <TrendingUp className="w-3 h-3 mr-1" />
                      Hot
                    </div>
                  )}
                </div>

                {/* Content */}
                <div className={`flex-1 ${viewMode === 'list' ? '' : ''}`}>
                  <h3 className="text-xl font-bold text-[#2E2E2E] mb-2 group-hover:text-primary-600 transition-colors duration-200">
                    {category.name}
                  </h3>
                  <p className="text-[#2E2E2E] mb-4 text-sm leading-relaxed">
                    {category.description}
                  </p>
                  
                  <div className={`flex items-center justify-between ${viewMode === 'list' ? 'flex-row' : 'flex-col sm:flex-row'} gap-2`}>
                    <div className="text-sm text-[#ffeee3]">
                      {category.projectCount} active projects
                    </div>
                    <div className="font-semibold text-primary-600">
                      Starting at {category.startingPrice}
                    </div>
                  </div>
                </div>

                {/* Hover Effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-primary-500/5 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
              </div>
            ))}
          </div>

          {/* No Results */}
          {filteredCategories.length === 0 && (
            <div className="text-center py-12">
              <div className="text-6xl mb-4">ðŸ”</div>
              <h3 className="text-xl font-semibold text-[#2E2E2E] mb-2">
                No categories found
              </h3>
              <p className="text-[#2E2E2E]">
                Try adjusting your search terms or browse all categories
              </p>
            </div>
          )}
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default BrowseCategoriesPage;











