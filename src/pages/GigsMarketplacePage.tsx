import React, { useState } from 'react';
import { Search, Filter, Star, Clock, Heart, Grid, List } from 'lucide-react';
import Header from '../components/common/Header';
import Footer from '../components/common/Footer';
import { Button } from '../components/ui/Button';

const GigsMarketplacePage: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [sortBy, setSortBy] = useState('relevance');

  const gigs = [
    {
      id: 1,
      title: 'I will create a modern responsive website for your business',
      seller: {
        name: 'John Developer',
        avatar: 'ðŸ‘¨â€ðŸ’»',
        level: 'Top Rated Seller',
        rating: 4.9,
        reviewCount: 247,
        isOnline: true
      },
      images: ['ðŸ–¥ï¸', 'ðŸ“±', 'ðŸ’»'],
      startingPrice: 299,
      deliveryTime: '7 days',
      features: ['Responsive Design', 'SEO Optimized', '3 Revisions'],
      badges: ['Choice', 'Fast Delivery'],
      category: 'Web Development'
    },
    {
      id: 2,
      title: 'I will design professional logo and brand identity',
      seller: {
        name: 'Sarah Designer',
        avatar: 'ðŸ‘©â€ðŸŽ¨',
        level: 'Level 2 Seller',
        rating: 4.8,
        reviewCount: 189,
        isOnline: false
      },
      images: ['ðŸŽ¨', 'ðŸ–Œï¸', 'âœ¨'],
      startingPrice: 49,
      deliveryTime: '3 days',
      features: ['Unlimited Revisions', 'Vector Files', 'Brand Guidelines'],
      badges: ['Best Seller'],
      category: 'Graphic Design'
    },
    {
      id: 3,
      title: 'I will write engaging blog posts and articles',
      seller: {
        name: 'Alex Writer',
        avatar: 'ðŸ‘¨â€ðŸ“',
        level: 'New Seller',
        rating: 4.7,
        reviewCount: 67,
        isOnline: true
      },
      images: ['ðŸ“', 'ðŸ“š', 'âœï¸'],
      startingPrice: 25,
      deliveryTime: '2 days',
      features: ['SEO Optimized', '500+ Words', 'Plagiarism Free'],
      badges: ['Rising Star'],
      category: 'Content Writing'
    },
    {
      id: 4,
      title: 'I will create a mobile app with React Native',
      seller: {
        name: 'Mike Mobile',
        avatar: 'ðŸ‘¨â€ðŸ’¼',
        level: 'Top Rated Seller',
        rating: 5.0,
        reviewCount: 156,
        isOnline: true
      },
      images: ['ðŸ“±', 'âš›ï¸', 'ðŸš€'],
      startingPrice: 599,
      deliveryTime: '14 days',
      features: ['iOS & Android', 'Source Code', 'App Store Submission'],
      badges: ['Pro Verified', 'Express'],
      category: 'Mobile Development'
    },
    {
      id: 5,
      title: 'I will edit your videos professionally',
      seller: {
        name: 'Lisa Editor',
        avatar: 'ðŸ‘©â€ðŸŽ¬',
        level: 'Level 2 Seller',
        rating: 4.9,
        reviewCount: 134,
        isOnline: false
      },
      images: ['ðŸŽ¬', 'âœ‚ï¸', 'ðŸŽžï¸'],
      startingPrice: 75,
      deliveryTime: '5 days',
      features: ['Color Correction', 'Sound Enhancement', 'Transitions'],
      badges: ['Quality Choice'],
      category: 'Video Editing'
    },
    {
      id: 6,
      title: 'I will boost your social media presence',
      seller: {
        name: 'Tom Marketer',
        avatar: 'ðŸ‘¨â€ðŸ’»',
        level: 'Level 1 Seller',
        rating: 4.6,
        reviewCount: 98,
        isOnline: true
      },
      images: ['ðŸ“ˆ', 'ðŸ“±', 'ðŸ’¬'],
      startingPrice: 89,
      deliveryTime: '7 days',
      features: ['Content Strategy', 'Analytics Report', '30 Posts'],
      badges: ['Growth Expert'],
      category: 'Digital Marketing'
    }
  ];

  const filterOptions = {
    priceRange: ['Under $50', '$50-$100', '$100-$500', '$500+'],
    deliveryTime: ['1 day', '3 days', '7 days', '14+ days'],
    sellerLevel: ['New Seller', 'Level 1', 'Level 2', 'Top Rated'],
    category: ['Web Development', 'Graphic Design', 'Content Writing', 'Mobile Development', 'Video Editing', 'Digital Marketing']
  };

  const filteredGigs = gigs.filter(gig =>
    gig.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    gig.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-[#ffeee3]">
      <Header />
      
      {/* Search Header */}
      <section className="pt-24 pb-8 bg-white border-b border-[#ffeee3]">
        <div className="section-container">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-3xl md:text-4xl font-bold text-[#2E2E2E] mb-6 text-center">
              Find the Perfect Service
            </h1>
            
            {/* Search Bar */}
            <div className="relative mb-6">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-[#ffeee3] w-5 h-5" />
              <input
                type="text"
                placeholder="Search for any service..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-4 text-lg rounded-xl border border-[#ffeee3] focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              />
            </div>

            {/* Quick Filters */}
            <div className="flex flex-wrap gap-2 justify-center">
              {['Web Development', 'Logo Design', 'Content Writing', 'Video Editing', 'SEO'].map((filter) => (
                <button
                  key={filter}
                  className="px-4 py-2 bg-[#ffeee3] hover:bg-primary-100 text-[#2E2E2E] hover:text-primary-700 rounded-full text-sm font-medium transition-colors duration-200"
                >
                  {filter}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-8">
        <div className="section-container">
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Sidebar Filters */}
            <div className="lg:w-64 flex-shrink-0">
              <div className="bg-white rounded-xl p-6 shadow-sm border border-[#ffeee3] sticky top-24">
                <h3 className="font-semibold text-[#2E2E2E] mb-4 flex items-center">
                  <Filter className="w-5 h-5 mr-2" />
                  Filters
                </h3>

                {/* Price Range */}
                <div className="mb-6">
                  <h4 className="font-medium text-[#2E2E2E] mb-3">Price Range</h4>
                  <div className="space-y-2">
                    {filterOptions.priceRange.map((price) => (
                      <label key={price} className="flex items-center">
                        <input type="checkbox" className="rounded border-[#ffeee3] text-primary-600 focus:ring-primary-500" />
                        <span className="ml-2 text-sm text-[#2E2E2E]">{price}</span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Delivery Time */}
                <div className="mb-6">
                  <h4 className="font-medium text-[#2E2E2E] mb-3">Delivery Time</h4>
                  <div className="space-y-2">
                    {filterOptions.deliveryTime.map((time) => (
                      <label key={time} className="flex items-center">
                        <input type="checkbox" className="rounded border-[#ffeee3] text-primary-600 focus:ring-primary-500" />
                        <span className="ml-2 text-sm text-[#2E2E2E]">{time}</span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Seller Level */}
                <div className="mb-6">
                  <h4 className="font-medium text-[#2E2E2E] mb-3">Seller Level</h4>
                  <div className="space-y-2">
                    {filterOptions.sellerLevel.map((level) => (
                      <label key={level} className="flex items-center">
                        <input type="checkbox" className="rounded border-[#ffeee3] text-primary-600 focus:ring-primary-500" />
                        <span className="ml-2 text-sm text-[#2E2E2E]">{level}</span>
                      </label>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Gigs List */}
            <div className="flex-1">
              {/* Sort and View Controls */}
              <div className="flex flex-col sm:flex-row justify-between items-center mb-6 gap-4">
                <div className="flex items-center gap-4">
                  <span className="text-[#2E2E2E]">
                    {filteredGigs.length} services available
                  </span>
                </div>
                
                <div className="flex items-center gap-4">
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="px-4 py-2 border border-[#ffeee3] rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                  >
                    <option value="relevance">Most Relevant</option>
                    <option value="price-low">Price: Low to High</option>
                    <option value="price-high">Price: High to Low</option>
                    <option value="rating">Highest Rated</option>
                    <option value="newest">Newest</option>
                  </select>
                  
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
              </div>

              {/* Gigs Grid */}
              <div className={`grid gap-6 ${
                viewMode === 'grid' 
                  ? 'grid-cols-1 md:grid-cols-2 xl:grid-cols-3' 
                  : 'grid-cols-1'
              }`}>
                {filteredGigs.map((gig) => (
                  <div
                    key={gig.id}
                    className={`bg-white rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden group cursor-pointer border border-[#ffeee3] hover:border-primary-200 ${
                      viewMode === 'list' ? 'flex' : ''
                    }`}
                  >
                    {/* Gig Images */}
                    <div className={`relative ${viewMode === 'list' ? 'w-48 flex-shrink-0' : 'h-48'} bg-gradient-to-br from-primary-50 to-purple-50 flex items-center justify-center`}>
                      <div className="text-4xl">{gig.images[0]}</div>
                      <button className="absolute top-3 right-3 p-2 bg-white/80 hover:bg-white rounded-full transition-colors duration-200">
                        <Heart className="w-4 h-4 text-[#2E2E2E]" />
                      </button>
                      {gig.badges.length > 0 && (
                        <div className="absolute bottom-3 left-3">
                          <span className="bg-success-500 text-white text-xs px-2 py-1 rounded-full font-medium">
                            {gig.badges[0]}
                          </span>
                        </div>
                      )}
                    </div>

                    {/* Content */}
                    <div className="p-4 flex-1">
                      {/* Seller Info */}
                      <div className="flex items-center mb-3">
                        <div className="text-lg mr-2">{gig.seller.avatar}</div>
                        <div className="flex-1">
                          <div className="flex items-center gap-2">
                            <span className="text-sm font-medium text-[#2E2E2E]">{gig.seller.name}</span>
                            {gig.seller.isOnline && (
                              <div className="w-2 h-2 bg-success-500 rounded-full"></div>
                            )}
                          </div>
                          <div className="text-xs text-[#ffeee3]">{gig.seller.level}</div>
                        </div>
                      </div>

                      {/* Title */}
                      <h3 className="font-semibold text-[#2E2E2E] mb-3 line-clamp-2 group-hover:text-primary-600 transition-colors duration-200">
                        {gig.title}
                      </h3>

                      {/* Rating */}
                      <div className="flex items-center mb-3">
                        <Star className="w-4 h-4 text-[#FF9F45] fill-current" />
                        <span className="text-sm font-medium text-[#2E2E2E] ml-1">
                          {gig.seller.rating}
                        </span>
                        <span className="text-sm text-[#ffeee3] ml-1">
                          ({gig.seller.reviewCount})
                        </span>
                      </div>

                      {/* Features */}
                      <div className="mb-4">
                        <div className="flex flex-wrap gap-1">
                          {gig.features.slice(0, 2).map((feature) => (
                            <span
                              key={feature}
                              className="text-xs bg-[#ffeee3] text-[#2E2E2E] px-2 py-1 rounded"
                            >
                              {feature}
                            </span>
                          ))}
                        </div>
                      </div>

                      {/* Bottom */}
                      <div className="flex items-center justify-between">
                        <div className="flex items-center text-sm text-[#ffeee3]">
                          <Clock className="w-4 h-4 mr-1" />
                          {gig.deliveryTime}
                        </div>
                        <div className="text-right">
                          <div className="text-xs text-[#ffeee3]">Starting at</div>
                          <div className="font-bold text-lg text-[#2E2E2E]">
                            ${gig.startingPrice}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Load More */}
              <div className="text-center mt-12">
                <Button variant="outline" size="lg">
                  Load More Results
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default GigsMarketplacePage;











