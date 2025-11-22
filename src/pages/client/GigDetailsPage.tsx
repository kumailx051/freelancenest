import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../../lib/firebase';
import { Star, Clock, Package, Check, ChevronLeft, MessageCircle, Heart } from 'lucide-react';

interface GigPackage {
  title: string;
  description: string;
  price: string;
  delivery: string;
  revisions: string;
  features: string[];
}

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
    basic?: GigPackage;
    standard?: GigPackage;
    premium?: GigPackage;
  };
  seller?: {
    name: string;
    avatar?: string;
    level: string;
    memberSince?: string;
    responseTime?: string;
    totalOrders?: number;
  };
  gallery?: string[];
  faqs?: Array<{
    question: string;
    answer: string;
  }>;
}

const GigDetailsPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [gig, setGig] = useState<Gig | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedPackage, setSelectedPackage] = useState<'basic' | 'standard' | 'premium'>('basic');
  const [activeTab, setActiveTab] = useState<'overview' | 'faq' | 'reviews'>('overview');
  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    fetchGigDetails();
  }, [id]);

  const fetchGigDetails = async () => {
    if (!id) return;

    try {
      setIsLoading(true);
      const gigDoc = await getDoc(doc(db, 'gigs', id));
      
      if (gigDoc.exists()) {
        const gigData = gigDoc.data();
        
        // Fetch seller information
        let sellerInfo = {
          name: 'Freelancer',
          avatar: '',
          level: 'New Seller',
          memberSince: 'November 2025',
          responseTime: '1 hour',
          totalOrders: 0
        };
        
        if (gigData.userId) {
          try {
            const userDoc = await getDoc(doc(db, 'users', gigData.userId));
            if (userDoc.exists()) {
              const userData = userDoc.data();
              sellerInfo = {
                name: `${userData.firstName || ''} ${userData.lastName || ''}`.trim() || 'Freelancer',
                avatar: userData.profilePictureUrl || '',
                level: userData.level || 'New Seller',
                memberSince: userData.createdAt ? new Date(userData.createdAt).toLocaleDateString('en-US', { month: 'long', year: 'numeric' }) : 'November 2025',
                responseTime: userData.responseTime || '1 hour',
                totalOrders: userData.totalOrders || 0
              };
            }
          } catch (error) {
            console.error('Error fetching seller info:', error);
          }
        }
        
        setGig({
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
          gallery: gigData.gallery || [],
          faqs: gigData.faqs || []
        });
      } else {
        console.error('Gig not found');
        navigate('/client/hire-gig');
      }
    } catch (error) {
      console.error('Error fetching gig details:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handlePlaceOrder = () => {
    if (!gig) return;
    
    const selectedPkg = gig.packages?.[selectedPackage];
    if (!selectedPkg) return;

    // Navigate to order placement page or show order modal
    // For now, we'll just show an alert
    alert(`Placing order for ${selectedPackage.toUpperCase()} package - $${selectedPkg.price}`);
    // TODO: Implement actual order placement logic
    // navigate('/client/place-order', { state: { gigId: gig.id, package: selectedPackage } });
  };

  const handleContactSeller = () => {
    if (!gig) return;
    // Navigate to messages with seller
    alert('Contact seller feature - Coming soon!');
    // TODO: Implement messaging
    // navigate('/client/messages', { state: { sellerId: gig.userId } });
  };

  const getGigImage = (index: number = 0) => {
    if (gig?.gallery && gig.gallery.length > index) {
      return gig.gallery[index];
    }
    return 'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80';
  };

  const formatDelivery = (delivery: string | undefined) => {
    if (!delivery) return 'TBD';
    const days = parseInt(delivery);
    return days === 1 ? '1 day' : `${days} days`;
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#ffeee3] flex justify-center items-center">
        <div className="flex flex-col items-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#FF6B00]"></div>
          <span className="ml-3 mt-4 text-[#2E2E2E]">Loading gig details...</span>
        </div>
      </div>
    );
  }

  if (!gig) {
    return (
      <div className="min-h-screen bg-[#ffeee3] flex justify-center items-center">
        <div className="text-center">
          <p className="text-[#2E2E2E] text-lg mb-4">Gig not found</p>
          <Link to="/client/hire-gig" className="text-[#FF6B00] hover:underline">
            Back to Gigs
          </Link>
        </div>
      </div>
    );
  }

  const currentPackage = gig.packages?.[selectedPackage];

  return (
    <div className="min-h-screen bg-[#ffeee3]">
      {/* Back Button */}
      <div className="bg-white border-b border-[#ffeee3]">
        <div className="section-container py-4">
          <button
            onClick={() => navigate('/client/hire-gig')}
            className="flex items-center text-[#2E2E2E] hover:text-[#FF6B00] transition-colors"
          >
            <ChevronLeft className="w-5 h-5 mr-1" />
            Back to Gigs
          </button>
        </div>
      </div>

      <div className="section-container py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Gig Details */}
          <div className="lg:col-span-2">
            {/* Title and Category */}
            <div className="mb-6">
              <div className="flex items-center gap-2 mb-3">
                <span className="bg-[#FF6B00] text-white text-xs font-medium px-3 py-1 rounded-full">
                  {gig.category}
                </span>
                {gig.subcategory && (
                  <span className="bg-[#ffeee3] text-[#2E2E2E] text-xs font-medium px-3 py-1 rounded-full">
                    {gig.subcategory}
                  </span>
                )}
              </div>
              <h1 className="text-3xl font-bold text-[#2E2E2E] mb-4">{gig.title}</h1>
              
              {/* Seller Info */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  {gig.seller?.avatar ? (
                    <img 
                      src={gig.seller.avatar} 
                      alt={gig.seller.name} 
                      className="w-12 h-12 rounded-full object-cover"
                    />
                  ) : (
                    <div className="w-12 h-12 rounded-full bg-[#FF6B00] flex items-center justify-center">
                      <span className="text-white text-lg font-bold">
                        {gig.seller?.name?.charAt(0) || 'F'}
                      </span>
                    </div>
                  )}
                  <div>
                    <h3 className="font-semibold text-[#2E2E2E]">{gig.seller?.name}</h3>
                    <div className="flex items-center gap-2 text-sm">
                      <span className="text-[#FF6B00]">{gig.seller?.level}</span>
                      {gig.rating > 0 && (
                        <>
                          <span className="text-[#2E2E2E]/50">•</span>
                          <div className="flex items-center">
                            <Star className="w-4 h-4 text-[#FF6B00] fill-current mr-1" />
                            <span className="font-medium">{gig.rating.toFixed(1)}</span>
                          </div>
                        </>
                      )}
                    </div>
                  </div>
                </div>
                <button
                  onClick={() => setIsFavorite(!isFavorite)}
                  className="p-2 hover:bg-[#ffeee3] rounded-full transition-colors"
                >
                  <Heart className={`w-6 h-6 ${isFavorite ? 'fill-red-500 text-red-500' : 'text-[#2E2E2E]'}`} />
                </button>
              </div>
            </div>

            {/* Gallery */}
            <div className="mb-6">
              <div className="grid grid-cols-2 gap-4">
                {gig.gallery && gig.gallery.length > 0 ? (
                  gig.gallery.slice(0, 4).map((image, index) => (
                    <img
                      key={index}
                      src={image}
                      alt={`${gig.title} - Image ${index + 1}`}
                      className={`w-full ${index === 0 ? 'col-span-2 h-96' : 'h-48'} object-cover rounded-lg`}
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.src = 'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80';
                      }}
                    />
                  ))
                ) : (
                  <img
                    src={getGigImage(0)}
                    alt={gig.title}
                    className="col-span-2 w-full h-96 object-cover rounded-lg"
                  />
                )}
              </div>
            </div>

            {/* Tabs */}
            <div className="bg-white rounded-lg border border-[#ffeee3] overflow-hidden">
              <div className="flex border-b border-[#ffeee3]">
                <button
                  onClick={() => setActiveTab('overview')}
                  className={`flex-1 px-6 py-4 font-medium transition-colors ${
                    activeTab === 'overview'
                      ? 'text-[#FF6B00] border-b-2 border-[#FF6B00]'
                      : 'text-[#2E2E2E] hover:text-[#FF6B00]'
                  }`}
                >
                  Overview
                </button>
                {gig.faqs && gig.faqs.length > 0 && (
                  <button
                    onClick={() => setActiveTab('faq')}
                    className={`flex-1 px-6 py-4 font-medium transition-colors ${
                      activeTab === 'faq'
                        ? 'text-[#FF6B00] border-b-2 border-[#FF6B00]'
                        : 'text-[#2E2E2E] hover:text-[#FF6B00]'
                    }`}
                  >
                    FAQ
                  </button>
                )}
                <button
                  onClick={() => setActiveTab('reviews')}
                  className={`flex-1 px-6 py-4 font-medium transition-colors ${
                    activeTab === 'reviews'
                      ? 'text-[#FF6B00] border-b-2 border-[#FF6B00]'
                      : 'text-[#2E2E2E] hover:text-[#FF6B00]'
                  }`}
                >
                  Reviews
                </button>
              </div>

              <div className="p-6">
                {activeTab === 'overview' && (
                  <div>
                    <h3 className="text-xl font-bold text-[#2E2E2E] mb-4">About This Gig</h3>
                    <p className="text-[#2E2E2E]/80 mb-6 whitespace-pre-line">{gig.description}</p>
                    
                    {gig.requirements && gig.requirements.length > 0 && (
                      <div className="mb-6">
                        <h4 className="font-semibold text-[#2E2E2E] mb-3">Requirements</h4>
                        <ul className="space-y-2">
                          {gig.requirements.map((req, index) => (
                            <li key={index} className="flex items-start">
                              <Check className="w-5 h-5 text-[#FF6B00] mr-2 flex-shrink-0 mt-0.5" />
                              <span className="text-[#2E2E2E]/80">{req}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {gig.searchTags && gig.searchTags.length > 0 && (
                      <div>
                        <h4 className="font-semibold text-[#2E2E2E] mb-3">Tags</h4>
                        <div className="flex flex-wrap gap-2">
                          {gig.searchTags.map((tag, index) => (
                            <span
                              key={index}
                              className="bg-[#ffeee3] text-[#FF6B00] text-sm px-3 py-1 rounded-full"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                )}

                {activeTab === 'faq' && (
                  <div>
                    <h3 className="text-xl font-bold text-[#2E2E2E] mb-4">Frequently Asked Questions</h3>
                    {gig.faqs && gig.faqs.length > 0 ? (
                      <div className="space-y-4">
                        {gig.faqs.map((faq, index) => (
                          <div key={index} className="border-b border-[#ffeee3] pb-4 last:border-0">
                            <h4 className="font-semibold text-[#2E2E2E] mb-2">{faq.question}</h4>
                            <p className="text-[#2E2E2E]/80">{faq.answer}</p>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <p className="text-[#2E2E2E]/60">No FAQs available for this gig.</p>
                    )}
                  </div>
                )}

                {activeTab === 'reviews' && (
                  <div>
                    <h3 className="text-xl font-bold text-[#2E2E2E] mb-4">Reviews</h3>
                    <p className="text-[#2E2E2E]/60">No reviews yet. Be the first to order!</p>
                    {/* TODO: Implement reviews fetching from Firebase */}
                  </div>
                )}
              </div>
            </div>

            {/* Seller Details Card */}
            <div className="bg-white rounded-lg border border-[#ffeee3] p-6 mt-6">
              <h3 className="text-xl font-bold text-[#2E2E2E] mb-4">About The Seller</h3>
              <div className="flex items-start gap-4">
                {gig.seller?.avatar ? (
                  <img 
                    src={gig.seller.avatar} 
                    alt={gig.seller.name} 
                    className="w-16 h-16 rounded-full object-cover"
                  />
                ) : (
                  <div className="w-16 h-16 rounded-full bg-[#FF6B00] flex items-center justify-center">
                    <span className="text-white text-xl font-bold">
                      {gig.seller?.name?.charAt(0) || 'F'}
                    </span>
                  </div>
                )}
                <div className="flex-1">
                  <h4 className="font-semibold text-[#2E2E2E] text-lg">{gig.seller?.name}</h4>
                  <p className="text-[#FF6B00] text-sm mb-3">{gig.seller?.level}</p>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <p className="text-[#2E2E2E]/60">Member since</p>
                      <p className="font-medium text-[#2E2E2E]">{gig.seller?.memberSince}</p>
                    </div>
                    <div>
                      <p className="text-[#2E2E2E]/60">Avg. response time</p>
                      <p className="font-medium text-[#2E2E2E]">{gig.seller?.responseTime}</p>
                    </div>
                    <div>
                      <p className="text-[#2E2E2E]/60">Total orders</p>
                      <p className="font-medium text-[#2E2E2E]">{gig.seller?.totalOrders || 0}</p>
                    </div>
                    <div>
                      <p className="text-[#2E2E2E]/60">Rating</p>
                      <div className="flex items-center">
                        <Star className="w-4 h-4 text-[#FF6B00] fill-current mr-1" />
                        <p className="font-medium text-[#2E2E2E]">{gig.rating > 0 ? gig.rating.toFixed(1) : 'New'}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Pricing Packages */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg border border-[#ffeee3] sticky top-24">
              {/* Package Tabs */}
              <div className="flex border-b border-[#ffeee3]">
                {gig.packages?.basic && (
                  <button
                    onClick={() => setSelectedPackage('basic')}
                    className={`flex-1 px-4 py-3 font-medium text-sm transition-colors ${
                      selectedPackage === 'basic'
                        ? 'text-[#FF6B00] border-b-2 border-[#FF6B00] bg-[#ffeee3]/30'
                        : 'text-[#2E2E2E] hover:text-[#FF6B00]'
                    }`}
                  >
                    Basic
                  </button>
                )}
                {gig.packages?.standard && (
                  <button
                    onClick={() => setSelectedPackage('standard')}
                    className={`flex-1 px-4 py-3 font-medium text-sm transition-colors ${
                      selectedPackage === 'standard'
                        ? 'text-[#FF6B00] border-b-2 border-[#FF6B00] bg-[#ffeee3]/30'
                        : 'text-[#2E2E2E] hover:text-[#FF6B00]'
                    }`}
                  >
                    Standard
                  </button>
                )}
                {gig.packages?.premium && (
                  <button
                    onClick={() => setSelectedPackage('premium')}
                    className={`flex-1 px-4 py-3 font-medium text-sm transition-colors ${
                      selectedPackage === 'premium'
                        ? 'text-[#FF6B00] border-b-2 border-[#FF6B00] bg-[#ffeee3]/30'
                        : 'text-[#2E2E2E] hover:text-[#FF6B00]'
                    }`}
                  >
                    Premium
                  </button>
                )}
              </div>

              {/* Package Details */}
              {currentPackage && (
                <div className="p-6">
                  <div className="mb-6">
                    <h3 className="text-xl font-bold text-[#2E2E2E] mb-2">{currentPackage.title}</h3>
                    <p className="text-[#2E2E2E]/70 text-sm mb-4">{currentPackage.description}</p>
                    
                    <div className="flex items-baseline gap-2 mb-4">
                      <span className="text-3xl font-bold text-[#2E2E2E]">${currentPackage.price}</span>
                    </div>

                    <div className="flex items-center gap-4 text-sm text-[#2E2E2E]/80 mb-4">
                      <div className="flex items-center">
                        <Clock className="w-4 h-4 mr-1" />
                        {formatDelivery(currentPackage.delivery)}
                      </div>
                      <div className="flex items-center">
                        <Package className="w-4 h-4 mr-1" />
                        {currentPackage.revisions} Revisions
                      </div>
                    </div>
                  </div>

                  {/* Features */}
                  {currentPackage.features && currentPackage.features.length > 0 && (
                    <div className="mb-6">
                      <h4 className="font-semibold text-[#2E2E2E] mb-3">What's included:</h4>
                      <ul className="space-y-2">
                        {currentPackage.features.map((feature, index) => (
                          <li key={index} className="flex items-start text-sm">
                            <Check className="w-4 h-4 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                            <span className="text-[#2E2E2E]/80">{feature}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {/* Action Buttons */}
                  <div className="space-y-3">
                    <button
                      onClick={handlePlaceOrder}
                      className="w-full bg-[#FF6B00] hover:bg-[#FF9F45] text-white font-medium py-3 rounded-lg transition-colors duration-200"
                    >
                      Continue (${currentPackage.price})
                    </button>
                    <button
                      onClick={handleContactSeller}
                      className="w-full bg-white border-2 border-[#FF6B00] text-[#FF6B00] hover:bg-[#ffeee3] font-medium py-3 rounded-lg transition-colors duration-200 flex items-center justify-center"
                    >
                      <MessageCircle className="w-4 h-4 mr-2" />
                      Contact Seller
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GigDetailsPage;
