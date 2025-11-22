import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { doc, getDoc, collection, query, where, getDocs } from 'firebase/firestore';
import { db } from '../../lib/firebase';
import { useAuth } from '../../contexts/AuthContext';
import { 
  ArrowLeft, 
  Edit, 
  Share2, 
  Eye, 
  Package, 
  Clock, 
  RefreshCcw,
  CheckCircle,
  Star,
  Calendar,
  ChevronLeft,
  ChevronRight,
  User
} from 'lucide-react';

interface Gig {
  id: string;
  title: string;
  category: string;
  subcategory: string;
  status: 'active' | 'paused' | 'draft' | 'under_review';
  gallery: string[];
  description: string;
  searchTags: string[];
  packages: {
    basic: {
      title: string;
      description: string;
      price: string;
      delivery: string;
      revisions: string;
      features: string[];
    };
    standard: {
      title: string;
      description: string;
      price: string;
      delivery: string;
      revisions: string;
      features: string[];
    };
    premium: {
      title: string;
      description: string;
      price: string;
      delivery: string;
      revisions: string;
      features: string[];
    };
  };
  views: number;
  orders: number;
  rating: number;
  createdAt: any;
  updatedAt: any;
  userId: string;
  requirements?: string[];
  faqs?: { question: string; answer: string }[];
}

interface Review {
  id: string;
  clientId: string;
  clientName: string;
  rating: number;
  reviewText: string;
  createdAt: any;
  orderNumber: string;
  clientAvatar?: string;
}

const GigDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { currentUser: user } = useAuth();
  const [gig, setGig] = useState<Gig | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedPackage, setSelectedPackage] = useState<'basic' | 'standard' | 'premium'>('basic');
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [isLoadingReviews, setIsLoadingReviews] = useState(false);
  const [orderCount, setOrderCount] = useState(0);
  const [viewCount, setViewCount] = useState(0);

  const nextImage = () => {
    if (gig?.gallery && gig.gallery.length > 1) {
      setCurrentImageIndex((prev) => (prev + 1) % gig.gallery.length);
    }
  };

  const prevImage = () => {
    if (gig?.gallery && gig.gallery.length > 1) {
      setCurrentImageIndex((prev) => (prev - 1 + gig.gallery.length) % gig.gallery.length);
    }
  };

  // Keyboard navigation
  useEffect(() => {
    const handleKeyPress = (event: KeyboardEvent) => {
      if (gig?.gallery && gig.gallery.length > 1) {
        if (event.key === 'ArrowLeft') {
          prevImage();
        } else if (event.key === 'ArrowRight') {
          nextImage();
        }
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [gig?.gallery]);

  useEffect(() => {
    const fetchGig = async () => {
      if (!id || !user?.uid) {
        setIsLoading(false);
        return;
      }

      try {
        const gigDoc = await getDoc(doc(db, 'gigs', id));
        
        if (gigDoc.exists()) {
          const gigData = { id: gigDoc.id, ...gigDoc.data() } as Gig;
          
          // Verify that this gig belongs to the current user
          if (gigData.userId === user.uid) {
            setGig(gigData);
          } else {
            // Redirect if user doesn't own this gig
            navigate('/freelancer/gigs');
          }
        } else {
          navigate('/freelancer/gigs');
        }
      } catch (error) {
        console.error('Error fetching gig:', error);
        navigate('/freelancer/gigs');
      } finally {
        setIsLoading(false);
      }
    };

    fetchGig();
  }, [id, user, navigate]);

  useEffect(() => {
    if (gig) {
      fetchReviews();
      fetchOrderStats();
    }
  }, [gig]);

  const fetchOrderStats = async () => {
    if (!gig) return;

    try {
      // Fetch orders for this gig
      const ordersQuery = query(
        collection(db, 'orders'),
        where('gigId', '==', gig.id)
      );
      const ordersSnap = await getDocs(ordersQuery);
      setOrderCount(ordersSnap.size);
      
      // Get views from gig data
      setViewCount(gig.views || 0);
    } catch (error) {
      console.error('Error fetching order stats:', error);
    }
  };

  const fetchReviews = async () => {
    if (!gig) return;

    setIsLoadingReviews(true);
    try {
      const reviewsQuery = query(
        collection(db, 'reviews'),
        where('gigId', '==', gig.id)
      );
      const reviewsSnap = await getDocs(reviewsQuery);
      const reviewsData: Review[] = [];
      
      // Fetch reviews with client avatars
      for (const docSnap of reviewsSnap.docs) {
        const reviewData = docSnap.data();
        let clientAvatar = '';
        
        // Fetch client's avatar from users collection
        if (reviewData.clientId) {
          try {
            const userDoc = await getDoc(doc(db, 'users', reviewData.clientId));
            if (userDoc.exists()) {
              const userData = userDoc.data();
              clientAvatar = userData.profilePictureUrl || userData.profile?.profilePictureUrl || '';
            }
          } catch (error) {
            console.error('Error fetching client avatar:', error);
          }
        }
        
        reviewsData.push({
          id: docSnap.id,
          ...reviewData,
          clientAvatar
        } as Review);
      }
      
      // Sort by createdAt in JavaScript
      reviewsData.sort((a, b) => {
        const aTime = a.createdAt?.toDate ? a.createdAt.toDate() : new Date(a.createdAt || 0);
        const bTime = b.createdAt?.toDate ? b.createdAt.toDate() : new Date(b.createdAt || 0);
        return bTime.getTime() - aTime.getTime();
      });
      
      setReviews(reviewsData);
    } catch (error) {
      console.error('Error fetching reviews:', error);
    } finally {
      setIsLoadingReviews(false);
    }
  };

  const formatDate = (timestamp: any) => {
    if (!timestamp) return 'N/A';
    const date = timestamp.toDate ? timestamp.toDate() : new Date(timestamp);
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  };

  const renderStars = (rating: number) => {
    return (
      <div className="flex items-center gap-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            className={`w-4 h-4 ${
              star <= rating
                ? 'fill-[#FF6B00] text-[#FF6B00]'
                : 'text-gray-300'
            }`}
          />
        ))}
      </div>
    );
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 pt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex items-center justify-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#FF6B00]"></div>
            <span className="ml-3 text-gray-600">Loading gig details...</span>
          </div>
        </div>
      </div>
    );
  }

  if (!gig) {
    return (
      <div className="min-h-screen bg-gray-50 pt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center py-12">
            <Package className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">Gig not found</h3>
            <p className="text-gray-500 mb-6">The gig you're looking for doesn't exist or has been removed.</p>
            <Link
              to="/freelancer/gigs"
              className="bg-[#FF6B00] hover:bg-[#FF9F45] text-white px-6 py-3 rounded-lg font-medium transition-colors inline-flex items-center"
            >
              <ArrowLeft className="w-5 h-5 mr-2" />
              Back to Gigs
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const currentPackage = gig.packages[selectedPackage];

  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center">
            <button
              onClick={() => navigate('/freelancer/gigs')}
              className="mr-4 p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">{gig.title}</h1>
              <div className="flex items-center mt-2 space-x-4">
                <span className={`px-2 py-1 rounded text-xs font-medium ${
                  gig.status === 'active' ? 'bg-green-100 text-green-800' :
                  gig.status === 'paused' ? 'bg-yellow-100 text-yellow-800' :
                  gig.status === 'draft' ? 'bg-gray-100 text-gray-800' :
                  'bg-blue-100 text-blue-800'
                }`}>
                  {gig.status === 'active' ? 'Active' :
                   gig.status === 'paused' ? 'Paused' :
                   gig.status === 'draft' ? 'Draft' : 'Under Review'}
                </span>
                <span className="text-sm text-gray-500">{gig.category} • {gig.subcategory}</span>
              </div>
            </div>
          </div>
          
          <div className="flex items-center space-x-3">
            <button className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors">
              <Share2 className="w-5 h-5" />
            </button>
            <Link
              to={`/freelancer/gigs/edit/${gig.id}`}
              className="bg-[#FF6B00] hover:bg-[#FF9F45] text-white px-6 py-2 rounded-lg font-medium transition-colors flex items-center"
            >
              <Edit className="w-4 h-4 mr-2" />
              Edit Gig
            </Link>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Gallery */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
              {gig.gallery && gig.gallery.length > 0 ? (
                <div>
                  <div className="aspect-video bg-gray-100 relative group">
                    <img
                      src={gig.gallery[currentImageIndex]}
                      alt={gig.title}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.src = 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=450&fit=crop&crop=center';
                      }}
                    />
                    
                    {/* Navigation Arrows */}
                    {gig.gallery.length > 1 && (
                      <>
                        <button
                          onClick={prevImage}
                          className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/80 hover:bg-white text-gray-700 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200 shadow-lg hover:shadow-xl"
                          aria-label="Previous image"
                        >
                          <ChevronLeft className="w-5 h-5" />
                        </button>
                        <button
                          onClick={nextImage}
                          className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/80 hover:bg-white text-gray-700 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200 shadow-lg hover:shadow-xl"
                          aria-label="Next image"
                        >
                          <ChevronRight className="w-5 h-5" />
                        </button>
                        
                        {/* Image Counter */}
                        <div className="absolute bottom-4 right-4 bg-black/50 text-white text-sm px-3 py-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                          {currentImageIndex + 1} / {gig.gallery.length}
                        </div>
                      </>
                    )}
                  </div>
                  {gig.gallery.length > 1 && (
                    <div className="p-4 flex space-x-2 overflow-x-auto">
                      {gig.gallery.map((image, index) => (
                        <button
                          key={index}
                          onClick={() => setCurrentImageIndex(index)}
                          className={`flex-shrink-0 w-16 h-16 rounded-lg overflow-hidden border-2 transition-colors ${
                            index === currentImageIndex ? 'border-[#FF6B00]' : 'border-gray-200'
                          }`}
                        >
                          <img
                            src={image}
                            alt={`${gig.title} ${index + 1}`}
                            className="w-full h-full object-cover"
                          />
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              ) : (
                <div className="aspect-video bg-gray-100 flex items-center justify-center">
                  <div className="text-center">
                    <Package className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                    <p className="text-gray-500">No images uploaded</p>
                  </div>
                </div>
              )}
            </div>

            {/* Description */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">About This Gig</h2>
              <div className="prose max-w-none">
                <p className="text-gray-600 whitespace-pre-wrap">{gig.description}</p>
              </div>
              
              {/* Tags */}
              {gig.searchTags && gig.searchTags.length > 0 && (
                <div className="mt-6">
                  <h3 className="text-sm font-medium text-gray-900 mb-3">Search Tags</h3>
                  <div className="flex flex-wrap gap-2">
                    {gig.searchTags.map((tag, index) => (
                      <span
                        key={index}
                        className="px-3 py-1 bg-gray-100 text-gray-700 text-sm rounded-full"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* FAQs */}
            {gig.faqs && gig.faqs.length > 0 && (
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-4">Frequently Asked Questions</h2>
                <div className="space-y-4">
                  {gig.faqs.map((faq, index) => (
                    <div key={index} className="border-b border-gray-200 pb-4 last:border-b-0 last:pb-0">
                      <h4 className="font-medium text-gray-900 mb-2">{faq.question}</h4>
                      <p className="text-gray-600">{faq.answer}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Reviews */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Reviews</h2>
              
              {isLoadingReviews ? (
                <div className="flex justify-center py-8">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#FF6B00]"></div>
                </div>
              ) : reviews.length > 0 ? (
                <div className="space-y-6">
                  {/* Reviews Summary */}
                  <div className="bg-gray-50 rounded-lg p-4">
                    <div className="flex items-center gap-4">
                      <div className="text-center">
                        <p className="text-4xl font-bold text-gray-900">
                          {(reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length).toFixed(1)}
                        </p>
                        {renderStars(Math.round(reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length))}
                      </div>
                      <div className="flex-1">
                        <p className="text-gray-900 font-medium">
                          {reviews.length} {reviews.length === 1 ? 'Review' : 'Reviews'}
                        </p>
                        <p className="text-sm text-gray-600">
                          Based on client feedback
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Individual Reviews */}
                  <div className="space-y-4">
                    {reviews.map((review) => (
                      <div key={review.id} className="border-b border-gray-200 pb-4 last:border-0">
                        <div className="flex items-start gap-3 mb-3">
                          <div className="w-10 h-10 rounded-full bg-[#FF6B00] flex items-center justify-center flex-shrink-0 overflow-hidden">
                            {review.clientAvatar ? (
                              <img 
                                src={review.clientAvatar} 
                                alt={review.clientName}
                                className="w-full h-full object-cover"
                              />
                            ) : (
                              <span className="text-white font-bold">
                                {review.clientName?.charAt(0)?.toUpperCase() || 'U'}
                              </span>
                            )}
                          </div>
                          <div className="flex-1">
                            <div className="flex items-center justify-between mb-1">
                              <h4 className="font-semibold text-gray-900">{review.clientName}</h4>
                              <span className="text-xs text-gray-500">
                                {formatDate(review.createdAt)}
                              </span>
                            </div>
                            {renderStars(review.rating)}
                          </div>
                        </div>
                        <p className="text-gray-600 ml-13">
                          {review.reviewText}
                        </p>
                        <p className="text-xs text-gray-500 mt-2 ml-13">
                          Order #{review.orderNumber}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              ) : (
                <div className="text-center py-8">
                  <User className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                  <p className="text-gray-500">No reviews yet</p>
                  <p className="text-sm text-gray-400 mt-1">Reviews will appear here once clients leave feedback</p>
                </div>
              )}
            </div>
          </div>

          {/* Right Column - Sidebar */}
          <div className="space-y-6">
            {/* Stats Card */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Performance</h3>
              <div className="grid grid-cols-2 gap-4">
                <div className="text-center">
                  <div className="flex items-center justify-center w-12 h-12 bg-blue-100 rounded-lg mx-auto mb-2">
                    <Eye className="w-6 h-6 text-blue-600" />
                  </div>
                  <p className="text-2xl font-bold text-gray-900">{viewCount}</p>
                  <p className="text-sm text-gray-500">Views</p>
                </div>
                <div className="text-center">
                  <div className="flex items-center justify-center w-12 h-12 bg-green-100 rounded-lg mx-auto mb-2">
                    <Package className="w-6 h-6 text-green-600" />
                  </div>
                  <p className="text-2xl font-bold text-gray-900">{orderCount}</p>
                  <p className="text-sm text-gray-500">Orders</p>
                </div>
              </div>
              
              {reviews.length > 0 && (
                <div className="mt-4 pt-4 border-t border-gray-200">
                  <div className="flex items-center justify-center">
                    <Star className="w-5 h-5 text-yellow-400 fill-current mr-1" />
                    <span className="text-lg font-semibold text-gray-900">
                      {(reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length).toFixed(1)}
                    </span>
                    <span className="text-sm text-gray-500 ml-1">({reviews.length} {reviews.length === 1 ? 'review' : 'reviews'})</span>
                  </div>
                </div>
              )}
            </div>

            {/* Package Selection */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <div className="flex space-x-1 mb-6">
                {(['basic', 'standard', 'premium'] as const).map((packageType) => (
                  <button
                    key={packageType}
                    onClick={() => setSelectedPackage(packageType)}
                    className={`flex-1 px-3 py-2 text-sm font-medium rounded-lg transition-colors ${
                      selectedPackage === packageType
                        ? 'bg-[#FF6B00] text-white'
                        : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                    }`}
                  >
                    {packageType.charAt(0).toUpperCase() + packageType.slice(1)}
                  </button>
                ))}
              </div>

              <div className="space-y-4">
                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">{currentPackage.title}</h4>
                  <p className="text-gray-600 text-sm mb-4">{currentPackage.description}</p>
                </div>

                <div className="flex justify-between items-center">
                  <div className="flex items-center text-sm text-gray-500">
                    <Clock className="w-4 h-4 mr-1" />
                    {currentPackage.delivery} day delivery
                  </div>
                  <div className="flex items-center text-sm text-gray-500">
                    <RefreshCcw className="w-4 h-4 mr-1" />
                    {currentPackage.revisions} revisions
                  </div>
                </div>

                {currentPackage.features && currentPackage.features.length > 0 && (
                  <div>
                    <p className="text-sm font-medium text-gray-900 mb-2">What's included:</p>
                    <ul className="space-y-1">
                      {currentPackage.features.map((feature, index) => (
                        <li key={index} className="flex items-center text-sm text-gray-600">
                          <CheckCircle className="w-4 h-4 text-green-500 mr-2 flex-shrink-0" />
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                <div className="pt-4 border-t border-gray-200">
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-2xl font-bold text-gray-900">${currentPackage.price}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Requirements */}
            {gig.requirements && gig.requirements.length > 0 && (
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Requirements</h3>
                <ul className="space-y-2">
                  {gig.requirements.map((requirement, index) => (
                    <li key={index} className="flex items-start text-sm text-gray-600">
                      <span className="w-2 h-2 bg-[#FF6B00] rounded-full mr-3 mt-2 flex-shrink-0"></span>
                      {requirement}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Creation Date */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Gig Information</h3>
              <div className="space-y-3">
                <div className="flex items-center text-sm text-gray-600">
                  <Calendar className="w-4 h-4 mr-2" />
                  Created: {gig.createdAt?.toDate?.()?.toLocaleDateString() || 'Unknown'}
                </div>
                <div className="flex items-center text-sm text-gray-600">
                  <Calendar className="w-4 h-4 mr-2" />
                  Updated: {gig.updatedAt?.toDate?.()?.toLocaleDateString() || 'Unknown'}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GigDetails;