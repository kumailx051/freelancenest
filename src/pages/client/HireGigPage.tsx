import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { collection, getDocs, query, where, doc, getDoc } from 'firebase/firestore';
import { db } from '../../lib/firebase';

interface Gig {
  id: string;
  title: string;
  category: string;
  subcategory?: string;
  description: string;
  rating: number;
  requirements?: string[];
  searchTags?: string[];
  status: string;
  userId: string;
  packages?: {
    basic?: {
      title: string;
      description: string;
      price: string;
      delivery: string;
      revisions: string;
      features: string[];
    };
    premium?: {
      title: string;
      description: string;
      price: string;
      delivery: string;
      revisions: string;
      features: string[];
    };
    standard?: {
      title: string;
      description: string;
      price: string;
      delivery: string;
      revisions: string;
      features: string[];
    };
  };
  seller?: {
    name: string;
    avatar?: string;
    level: string;
  };
  gallery?: string[];
}

// Sample categories
const categories = [
  { id: 1, name: 'Development & IT' },
  { id: 2, name: 'Design & Creative' },
  { id: 3, name: 'Sales & Marketing' },
  { id: 4, name: 'Writing & Translation' },
  { id: 5, name: 'Video & Animation' },
  { id: 6, name: 'Music & Audio' },
  { id: 7, name: 'Admin & Customer Support' },
  { id: 8, name: 'Finance & Accounting' }
];

const HireGigPage: React.FC = () => {
  // Add CSS styles for orange slider
  React.useEffect(() => {
    const style = document.createElement('style');
    style.textContent = `
      .slider-orange::-webkit-slider-thumb {
        appearance: none;
        height: 20px;
        width: 20px;
        border-radius: 50%;
        background: #FF6B00;
        cursor: pointer;
        border: 2px solid #fff;
        box-shadow: 0 2px 4px rgba(0,0,0,0.2);
      }
      .slider-orange::-moz-range-thumb {
        height: 20px;
        width: 20px;
        border-radius: 50%;
        background: #FF6B00;
        cursor: pointer;
        border: 2px solid #fff;
        box-shadow: 0 2px 4px rgba(0,0,0,0.2);
      }
    `;
    document.head.appendChild(style);
    return () => {
      document.head.removeChild(style);
    };
  }, []);

  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [priceRange, setPriceRange] = useState<number>(500);
  const [gigs, setGigs] = useState<Gig[]>([]);
  const [filteredGigs, setFilteredGigs] = useState<Gig[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [sortBy, setSortBy] = useState('featured');
  const [selectedDeliveryTime, setSelectedDeliveryTime] = useState<string>('');
  const [selectedSellerLevel, setSelectedSellerLevel] = useState<string>('');
  const [proServicesOnly, setProServicesOnly] = useState(false);

  useEffect(() => {
    fetchGigs();
  }, []);

  useEffect(() => {
    filterAndSortGigs();
  }, [gigs, activeCategory, priceRange, sortBy, selectedDeliveryTime, selectedSellerLevel, proServicesOnly]);

  const fetchGigs = async () => {
    try {
      setIsLoading(true);
      const gigsQuery = query(
        collection(db, 'gigs'),
        where('status', '==', 'active')
      );
      const querySnapshot = await getDocs(gigsQuery);
      
      const gigsData: Gig[] = [];
      
      for (const gigDoc of querySnapshot.docs) {
        const gigData = gigDoc.data();
        
        // Fetch seller information from users collection
        let sellerInfo = {
          name: 'Freelancer',
          avatar: '',
          level: 'New Seller'
        };
        
        if (gigData.userId) {
          try {
            const userDoc = await getDoc(doc(db, 'users', gigData.userId));
            if (userDoc.exists()) {
              const userData = userDoc.data();
              sellerInfo = {
                name: `${userData.firstName || ''} ${userData.lastName || ''}`.trim() || 'Freelancer',
                avatar: userData.profilePictureUrl || '',
                level: userData.level || 'New Seller'
              };
            }
          } catch (error) {
            console.error('Error fetching seller info:', error);
          }
        }
        
        gigsData.push({
          id: gigDoc.id,
          title: gigData.title || 'Untitled Gig',
          category: gigData.category || 'Other',
          subcategory: gigData.subcategory || '',
          description: gigData.description || '',
          rating: gigData.rating || 0,
          requirements: gigData.requirements || [],
          searchTags: gigData.searchTags || [],
          status: gigData.status || 'active',
          userId: gigData.userId || '',
          packages: gigData.packages || {},
          seller: sellerInfo,
          gallery: gigData.gallery || []
        });
      }
      
      setGigs(gigsData);
    } catch (error) {
      console.error('Error fetching gigs:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const filterAndSortGigs = () => {
    let filtered = [...gigs];

    // Filter by category
    if (activeCategory !== 'All' && activeCategory !== 'Trending') {
      filtered = filtered.filter(gig => 
        gig.category.toLowerCase().includes(activeCategory.toLowerCase()) ||
        gig.subcategory?.toLowerCase().includes(activeCategory.toLowerCase())
      );
    }

    // Filter by trending (high rated gigs)
    if (activeCategory === 'Trending') {
      filtered = filtered.filter(gig => gig.rating >= 4.5);
    }

    // Filter by price range
    filtered = filtered.filter(gig => {
      const basicPrice = parseInt(gig.packages?.basic?.price || '0');
      return basicPrice <= priceRange;
    });

    // Filter by delivery time
    if (selectedDeliveryTime) {
      filtered = filtered.filter(gig => {
        const delivery = parseInt(gig.packages?.basic?.delivery || '999');
        switch (selectedDeliveryTime) {
          case '1 day or less': return delivery <= 1;
          case '2-3 days': return delivery >= 2 && delivery <= 3;
          case 'Up to 7 days': return delivery <= 7;
          case 'Any time': return true;
          default: return false;
        }
      });
    }

    // Filter by seller level
    if (selectedSellerLevel) {
      filtered = filtered.filter(gig => {
        return gig.seller?.level === selectedSellerLevel;
      });
    }

    // Filter by pro services only
    if (proServicesOnly) {
      filtered = filtered.filter(gig => {
        return gig.seller?.level === 'Top Rated' || gig.rating >= 4.8;
      });
    }

    // Sort gigs
    switch (sortBy) {
      case 'price-low':
        filtered.sort((a, b) => {
          const priceA = parseInt(a.packages?.basic?.price || '0');
          const priceB = parseInt(b.packages?.basic?.price || '0');
          return priceA - priceB;
        });
        break;
      case 'price-high':
        filtered.sort((a, b) => {
          const priceA = parseInt(a.packages?.basic?.price || '0');
          const priceB = parseInt(b.packages?.basic?.price || '0');
          return priceB - priceA;
        });
        break;
      case 'rating':
        filtered.sort((a, b) => (b.rating || 0) - (a.rating || 0));
        break;
      case 'delivery':
        filtered.sort((a, b) => {
          const deliveryA = parseInt(a.packages?.basic?.delivery || '999');
          const deliveryB = parseInt(b.packages?.basic?.delivery || '999');
          return deliveryA - deliveryB;
        });
        break;
      default:
        // Keep original order for 'featured'
        break;
    }

    setFilteredGigs(filtered);
  };

  const getGigImage = (gig: Gig) => {
    if (gig.gallery && gig.gallery.length > 0) {
      return gig.gallery[0];
    }
    // Default images based on category
    const categoryImages: { [key: string]: string } = {
      'programming': 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
      'design': 'https://images.unsplash.com/photo-1626785774573-4b799315345d?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
      'writing': 'https://images.unsplash.com/photo-1586281380117-5a60ae2050cc?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
      'marketing': 'https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
      'video': 'https://images.unsplash.com/photo-1574717025058-2f8737d2e2b7?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60'
    };
    return categoryImages[gig.category.toLowerCase()] || 'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60';
  };

  const formatPrice = (price: string | undefined) => {
    if (!price) return '0';
    return parseInt(price).toString();
  };

  const formatDelivery = (delivery: string | undefined) => {
    if (!delivery) return 'TBD';
    const days = parseInt(delivery);
    return days === 1 ? '1 day' : `${days} days`;
  };

  const handleDeliveryTimeChange = (option: string) => {
    setSelectedDeliveryTime(selectedDeliveryTime === option ? '' : option);
  };

  const handleSellerLevelChange = (level: string) => {
    setSelectedSellerLevel(selectedSellerLevel === level ? '' : level);
  };

  const applyFilters = () => {
    filterAndSortGigs();
  };

  const clearAllFilters = () => {
    setActiveCategory('All');
    setPriceRange(500);
    setSelectedDeliveryTime('');
    setSelectedSellerLevel('');
    setProServicesOnly(false);
  };

  return (
    <div className="min-h-screen bg-[#ffeee3]">
      {/* Hero Section */}
      <section className="pt-8 pb-8 relative">
        {/* Background */}
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-r from-[#2E2E2E] to-[#3E3E3E]"></div>
        </div>
        
        <div className="section-container relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
              <span className="bg-gradient-to-r from-[#FF6B00] to-[#FF9F45] bg-clip-text text-transparent">Hire</span> Freelancer Gigs
            </h1>
            <p className="text-xl text-[#ffeee3] mb-4">
              Discover talented freelancers offering pre-packaged services with clear deliverables and fixed prices.
            </p>
          </div>
        </div>
      </section>

      {/* Platform Categories */}
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
              All Gigs
            </button>
            
            <button
              onClick={() => setActiveCategory('Trending')}
              className={`whitespace-nowrap font-medium flex items-center ${
                activeCategory === 'Trending'
                  ? 'text-[#FF6B00] border-b-2 border-[#FF6B00] pb-2'
                  : 'text-[#2E2E2E] hover:text-[#FF6B00]'
              }`}
            >
              🔥 Trending
            </button>
            
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
                {category.name}
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
                  className="w-full h-2 bg-[#ffeee3] rounded-lg appearance-none cursor-pointer slider-orange"
                  style={{
                    background: `linear-gradient(to right, #FF6B00 0%, #FF6B00 ${(priceRange / 1000) * 100}%, #ffeee3 ${(priceRange / 1000) * 100}%, #ffeee3 100%)`
                  }}
                />
              </div>
              
              {/* Delivery Time */}
              <div className="mb-6">
                <label className="font-medium text-[#2E2E2E] block mb-2">Delivery Time</label>
                <div className="space-y-2">
                  {['1 day or less', '2-3 days', 'Up to 7 days', 'Any time'].map((option) => (
                    <div key={option} className="flex items-center">
                      <input 
                        id={`delivery-${option}`} 
                        name="deliveryTime"
                        type="radio" 
                        checked={selectedDeliveryTime === option}
                        onChange={() => handleDeliveryTimeChange(option)}
                        className="h-4 w-4 text-[#FF6B00] border-[#ffeee3] focus:ring-[#FF6B00] accent-[#FF6B00]"
                        style={{ accentColor: '#FF6B00' }}
                      />
                      <label htmlFor={`delivery-${option}`} className="ml-2 text-[#2E2E2E] cursor-pointer">{option}</label>
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
                        id={`seller-${level}`} 
                        name="sellerLevel"
                        type="radio" 
                        checked={selectedSellerLevel === level}
                        onChange={() => handleSellerLevelChange(level)}
                        className="h-4 w-4 text-[#FF6B00] border-[#ffeee3] focus:ring-[#FF6B00] accent-[#FF6B00]"
                        style={{ accentColor: '#FF6B00' }}
                      />
                      <label htmlFor={`seller-${level}`} className="ml-2 text-[#2E2E2E] cursor-pointer">{level}</label>
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
                    checked={proServicesOnly}
                    onChange={(e) => setProServicesOnly(e.target.checked)}
                    className="h-4 w-4 text-[#FF6B00] border-[#ffeee3] rounded focus:ring-[#FF6B00] accent-[#FF6B00]"
                    style={{ accentColor: '#FF6B00' }}
                  />
                  <label htmlFor="proServices" className="ml-2 text-[#2E2E2E] font-medium">Pro Services Only</label>
                </div>
              </div>
              
              {/* Apply and Clear buttons */}
              <div className="space-y-2">
                <button 
                  onClick={applyFilters}
                  className="w-full bg-[#FF6B00] hover:bg-[#FF9F45] text-white font-medium px-4 py-2 rounded-lg transition-colors duration-200"
                >
                  Apply Filters
                </button>
                <button 
                  onClick={clearAllFilters}
                  className="w-full bg-white border border-[#FF6B00] hover:bg-[#ffeee3]/30 text-[#FF6B00] font-medium px-4 py-2 rounded-lg transition-colors duration-200"
                >
                  Clear All
                </button>
              </div>
            </div>
          </div>

          {/* Gigs Grid */}
          <div className="flex-1">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-[#2E2E2E]">
                {activeCategory === 'All' ? 'All Gigs' : activeCategory}
              </h2>
              
              <div className="relative">
                <select 
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="appearance-none bg-white border border-[#ffeee3] rounded-lg px-4 py-2 pr-8 focus:outline-none focus:ring-2 focus:ring-[#FF6B00]"
                >
                  <option value="featured">Sort by: Featured</option>
                  <option value="rating">Highest Rating</option>
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                  <option value="delivery">Fastest Delivery</option>
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-[#2E2E2E]">
                  <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                    <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/>
                  </svg>
                </div>
              </div>
            </div>

            {isLoading ? (
              <div className="flex justify-center items-center py-16">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#FF6B00]"></div>
                <span className="ml-3 text-[#2E2E2E]">Loading gigs...</span>
              </div>
            ) : filteredGigs.length === 0 ? (
              <div className="text-center py-16">
                <p className="text-[#2E2E2E]/60 text-lg">No gigs found matching your criteria.</p>
                <button 
                  onClick={clearAllFilters}
                  className="mt-4 text-[#FF6B00] hover:text-[#FF9F45] font-medium"
                >
                  Clear filters
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredGigs.map((gig) => {
                  const basicPackage = gig.packages?.basic;
                  const gigImage = getGigImage(gig);
                  
                  return (
                    <div key={gig.id} className="bg-white rounded-lg overflow-hidden shadow-sm border border-[#ffeee3] hover:shadow-md transition-shadow">
                      {/* Gig Image */}
                      <div className="h-48 overflow-hidden relative">
                        <img
                          src={gigImage}
                          alt={gig.title}
                          className="w-full h-full object-cover"
                          onError={(e) => {
                            const target = e.target as HTMLImageElement;
                            target.src = 'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60';
                          }}
                        />
                        <div className="absolute top-3 left-3">
                          <span className="bg-white text-[#2E2E2E] text-xs font-medium px-2 py-1 rounded capitalize">
                            {gig.category}
                          </span>
                        </div>
                      </div>
                      
                      {/* Gig Details */}
                      <div className="p-5">
                        <div className="flex items-center mb-3">
                          {gig.seller?.avatar ? (
                            <img 
                              src={gig.seller.avatar} 
                              alt={gig.seller.name} 
                              className="w-8 h-8 rounded-full mr-2 object-cover"
                              onError={(e) => {
                                const target = e.target as HTMLImageElement;
                                target.style.display = 'none';
                              }}
                            />
                          ) : (
                            <div className="w-8 h-8 rounded-full bg-[#FF6B00] flex items-center justify-center mr-2">
                              <span className="text-white text-xs font-bold">
                                {gig.seller?.name?.charAt(0) || 'F'}
                              </span>
                            </div>
                          )}
                          <div>
                            <h4 className="text-sm font-medium">{gig.seller?.name || 'Freelancer'}</h4>
                            <span className="text-xs text-[#FF6B00]">{gig.seller?.level || 'New Seller'}</span>
                          </div>
                        </div>
                        
                        <h3 className="text-lg font-semibold mb-2 line-clamp-2 h-14">
                          {gig.title}
                        </h3>
                        
                        <div className="flex items-center text-[#FF6B00] mb-3">
                          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                          </svg>
                          <span className="ml-1 text-sm font-medium text-[#2E2E2E]">{gig.rating > 0 ? gig.rating.toFixed(1) : 'New'}</span>
                          {gig.rating > 0 && (
                            <>
                              <span className="mx-1 text-[#2E2E2E]">·</span>
                              <span className="text-sm text-[#2E2E2E]">(Reviews)</span>
                            </>
                          )}
                        </div>
                        
                        {/* Features Preview */}
                        {basicPackage?.features && basicPackage.features.length > 0 && (
                          <div className="mb-3">
                            <div className="flex flex-wrap gap-1">
                              {basicPackage.features.slice(0, 2).map((feature, index) => (
                                <span key={index} className="bg-[#ffeee3] text-[#FF6B00] text-xs px-2 py-1 rounded">
                                  {feature}
                                </span>
                              ))}
                              {basicPackage.features.length > 2 && (
                                <span className="bg-[#ffeee3]/50 text-[#2E2E2E]/70 text-xs px-2 py-1 rounded">
                                  +{basicPackage.features.length - 2}
                                </span>
                              )}
                            </div>
                          </div>
                        )}
                        
                        <div className="border-t border-[#ffeee3] pt-3 mt-3">
                          <div className="flex items-center justify-between">
                            <span className="text-[#2E2E2E] text-sm">
                              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 inline mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                              </svg>
                              {formatDelivery(basicPackage?.delivery)}
                            </span>
                            <span className="font-bold text-lg">${formatPrice(basicPackage?.price)}</span>
                          </div>
                        </div>
                      </div>
                      
                      {/* Gig Action */}
                      <div className="px-5 pb-5">
                        <Link to={`/client/gig/${gig.id}`}>
                          <button className="w-full bg-[#FF6B00] hover:bg-[#FF9F45] text-white font-medium py-2 rounded transition-colors duration-200">
                            View Details
                          </button>
                        </Link>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
            
            {!isLoading && filteredGigs.length > 0 && (
              <div className="mt-12 text-center">
                <p className="text-[#2E2E2E]/60 mb-4">
                  Showing {filteredGigs.length} of {gigs.length} gigs
                </p>
                {filteredGigs.length < gigs.length && (
                  <button 
                    onClick={() => fetchGigs()}
                    className="bg-white border border-[#ffeee3] hover:bg-[#ffeee3]/30 text-[#2E2E2E] font-medium px-8 py-3 rounded-lg transition-colors duration-200"
                  >
                    Refresh Gigs
                  </button>
                )}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* How It Works Section */}
      <section className="py-16 bg-[#ffeee3]/30 border-t border-[#ffeee3]">
        <div className="section-container">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <h2 className="text-3xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-[#FF6B00] to-[#FF9F45]">How Hiring Gigs Works</h2>
            <p className="text-xl text-[#2E2E2E]">
              Get started with a freelancer gig in three simple steps
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-xl shadow-sm text-center hover:border-[#FF6B00] border-2 border-transparent transition-all duration-200">
              <div className="bg-[#ffeee3] text-[#FF6B00] rounded-full w-14 h-14 flex items-center justify-center mx-auto mb-6 text-2xl font-bold">
                1
              </div>
              <h3 className="text-xl font-bold mb-3 text-[#2E2E2E]">Browse Gigs</h3>
              <p className="text-[#2E2E2E]/80">
                Explore our marketplace to find a gig that matches your needs. Filter by category, budget, and delivery time.
              </p>
            </div>
            
            <div className="bg-white p-8 rounded-xl shadow-sm text-center hover:border-[#FF6B00] border-2 border-transparent transition-all duration-200">
              <div className="bg-[#ffeee3] text-[#FF6B00] rounded-full w-14 h-14 flex items-center justify-center mx-auto mb-6 text-2xl font-bold">
                2
              </div>
              <h3 className="text-xl font-bold mb-3 text-[#2E2E2E]">Purchase & Brief</h3>
              <p className="text-[#2E2E2E]/80">
                Select your package and provide the necessary details for the freelancer to get started on your project.
              </p>
            </div>
            
            <div className="bg-white p-8 rounded-xl shadow-sm text-center hover:border-[#FF6B00] border-2 border-transparent transition-all duration-200">
              <div className="bg-[#ffeee3] text-[#FF6B00] rounded-full w-14 h-14 flex items-center justify-center mx-auto mb-6 text-2xl font-bold">
                3
              </div>
              <h3 className="text-xl font-bold mb-3 text-[#2E2E2E]">Review & Approve</h3>
              <p className="text-[#2E2E2E]/80">
                Receive the completed work and request revisions if needed. Once satisfied, approve and release payment.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-[#FF6B00] to-[#FF9F45] text-white">
        <div className="section-container">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-6">Need a Custom Project?</h2>
            <p className="text-xl opacity-90 mb-8">
              Can't find the perfect gig? Post a job and get matched with talented freelancers ready to work on your specific requirements.
            </p>
            <Link 
              to="/client/post-job" 
              className="bg-white text-[#FF6B00] hover:bg-[#ffeee3] font-medium px-8 py-4 rounded-lg transition-colors duration-200 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-0.5 inline-block"
            >
              Post a Custom Job
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HireGigPage;
