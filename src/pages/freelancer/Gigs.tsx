import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Plus, Package, Users, DollarSign, Star, Eye, Share2, Pause, Play, Edit, BarChart3, Copy } from 'lucide-react';
import { collection, query, where, orderBy, getDocs } from 'firebase/firestore';
import { db } from '../../lib/firebase';
import { useAuth } from '../../contexts/AuthContext';

interface Gig {
  id: string;
  title: string;
  category: string;
  subcategory: string;
  status: 'active' | 'paused' | 'draft' | 'under_review';
  gallery: string[];
  packages: {
    basic: { price: string; delivery: string };
    standard: { price: string; delivery: string };
    premium: { price: string; delivery: string };
  };
  views: number;
  orders: number;
  rating: number;
  createdAt: any;
  updatedAt: any;
  userId: string;
}

const Gigs = () => {
  const { currentUser: user, loading: authLoading } = useAuth();
  const [selectedTab, setSelectedTab] = useState('all');
  const [gigs, setGigs] = useState<Gig[]>([]);
  const [isLoading, setIsLoading] = useState(true);



  const fetchGigs = async () => {
    if (!user?.uid) {
      setIsLoading(false);
      return;
    }

    try {
      let querySnapshot;
      try {
        // Try with orderBy first
        const gigsQuery = query(
          collection(db, 'gigs'),
          where('userId', '==', user.uid),
          orderBy('createdAt', 'desc')
        );
        
        querySnapshot = await getDocs(gigsQuery);
      } catch (orderByError) {
        // Fallback: query without orderBy in case index doesn't exist
        const simpleQuery = query(
          collection(db, 'gigs'),
          where('userId', '==', user.uid)
        );
        
        querySnapshot = await getDocs(simpleQuery);
      }
      
      const gigsData: Gig[] = [];
      
      querySnapshot.forEach((doc) => {
        const docData = doc.data();
        gigsData.push({
          id: doc.id,
          ...docData
        } as Gig);
      });
      
      setGigs(gigsData);
      
    } catch (error) {
      console.error('Error fetching gigs:', error);
    } finally {
      setIsLoading(false);
    }
  };

  // Fetch gigs from Firebase
  useEffect(() => {
    const initiateFetch = () => {
      // Wait for authentication to finish loading
      if (authLoading) {
        return;
      }
      
      if (!user?.uid) {
        setIsLoading(false);
        return;
      }

      // Call the fetchGigs function
      fetchGigs();
    };

    initiateFetch();
  }, [user, authLoading]);

  // Remove sample gigs data - now using real Firebase data


  const handleAction = (gigId: string, action: string) => {
    console.log(`Action: ${action} on gig ${gigId}`);
    // Handle gig actions here
  };



  const filteredGigs = gigs.filter(gig => 
    selectedTab === 'all' || gig.status === selectedTab
  );

  // For now, keeping these as placeholder values
  const totalEarnings = 4695;
  const totalOrders = 77;
  const avgRating = 4.8;

  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">My Gigs</h1>
            <p className="text-gray-600">Manage your service offerings and track performance</p>
          </div>
          <Link
            to="/freelancer/gigs/create"
            className="mt-4 md:mt-0 bg-[#FF6B00] hover:bg-[#FF9F45] text-white px-6 py-3 rounded-lg font-medium transition-colors flex items-center"
          >
            <Plus className="w-5 h-5 mr-2" />
            Create New Gig
          </Link>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm font-medium">Total Gigs</p>
                <p className="text-2xl font-bold text-gray-900">{gigs.length}</p>
              </div>
              <div className="bg-orange-100 p-3 rounded-lg">
                <Package className="w-6 h-6 text-[#FF6B00]" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm font-medium">Total Orders</p>
                <p className="text-2xl font-bold text-gray-900">{totalOrders}</p>
              </div>
              <div className="bg-blue-100 p-3 rounded-lg">
                <Users className="w-6 h-6 text-blue-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm font-medium">Total Earnings</p>
                <p className="text-2xl font-bold text-gray-900">${totalEarnings}</p>
              </div>
              <div className="bg-green-100 p-3 rounded-lg">
                <DollarSign className="w-6 h-6 text-green-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm font-medium">Avg. Rating</p>
                <p className="text-2xl font-bold text-gray-900">{avgRating}</p>
              </div>
              <div className="bg-yellow-100 p-3 rounded-lg">
                <Star className="w-6 h-6 text-yellow-600" />
              </div>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 mb-8">
          <div className="flex border-b border-gray-200">
            {[
              { id: 'all', label: 'All Gigs' },
              { id: 'active', label: 'Active' },
              { id: 'paused', label: 'Paused' },
              { id: 'draft', label: 'Drafts' }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setSelectedTab(tab.id)}
                className={`px-6 py-4 text-sm font-medium transition-colors ${
                  selectedTab === tab.id
                    ? 'text-[#FF6B00] border-b-2 border-[#FF6B00]'
                    : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Loading State */}
        {isLoading ? (
          <div className="flex justify-center items-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#FF6B00]"></div>
            <span className="ml-3 text-gray-600">Loading your gigs...</span>
          </div>
        ) : (
          <>
            {/* Gigs Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredGigs.map((gig) => (
                <div key={gig.id} className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow group">
                  {/* Gig Image */}
                  <div className="relative">
                    <Link to={`/freelancer/gigs/details/${gig.id}`}>
                      <img
                        src={gig.gallery && gig.gallery.length > 0 ? gig.gallery[0] : 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&h=300&fit=crop&crop=center'}
                        alt={gig.title}
                        className="w-full h-48 object-cover cursor-pointer hover:opacity-90 transition-opacity"
                        onError={(e) => {
                          const target = e.target as HTMLImageElement;
                          target.src = 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&h=300&fit=crop&crop=center';
                        }}
                      />
                    </Link>
                    <button
                      onClick={() => handleAction(gig.id, 'share')}
                      className="absolute top-3 right-3 p-2 bg-white rounded-full shadow-sm hover:bg-gray-50 transition-colors"
                    >
                      <Share2 className="w-4 h-4 text-gray-400" />
                    </button>                {/* Status Badge */}
                <div className={`absolute top-3 left-3 px-2 py-1 rounded text-xs font-medium ${
                  gig.status === 'active' ? 'bg-green-100 text-green-800' :
                  gig.status === 'paused' ? 'bg-yellow-100 text-yellow-800' :
                  'bg-gray-100 text-gray-800'
                }`}>
                  {gig.status === 'active' ? 'Active' :
                   gig.status === 'paused' ? 'Paused' : 'Draft'}
                </div>
              </div>

              {/* Gig Content */}
              <div className="p-4">
                {/* Title */}
                <Link to={`/freelancer/gigs/details/${gig.id}`}>
                  <h3 className="text-sm font-medium text-gray-900 mb-3 line-clamp-2 hover:text-[#FF6B00] transition-colors cursor-pointer">
                    {gig.title}
                  </h3>
                </Link>

                {/* Category */}
                <p className="text-xs text-gray-500 mb-3">{gig.category}</p>

                {/* Stats */}
                <div className="flex items-center justify-between mb-3 text-xs text-gray-500">
                  <div className="flex items-center gap-3">
                    <span className="flex items-center gap-1">
                      <Eye className="w-3 h-3" />
                      {gig.views || 0}
                    </span>
                    <span className="flex items-center gap-1">
                      <Package className="w-3 h-3" />
                      {gig.orders || 0}
                    </span>
                  </div>
                  {gig.rating > 0 && (
                    <div className="flex items-center gap-1">
                      <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                      <span className="text-sm font-medium text-gray-900">
                        {gig.rating}
                      </span>
                      <span className="text-xs text-gray-500">
                        (0)
                      </span>
                    </div>
                  )}
                </div>

                {/* Price */}
                <div className="text-right">
                  <p className="text-sm text-gray-600">Starting at</p>
                  <p className="text-lg font-bold text-gray-900">
                    ${gig.packages?.basic?.price || '0'}
                  </p>
                </div>
              </div>

              {/* Actions */}
              <div className="px-4 pb-4">
                <div className="flex gap-2">
                  <Link
                    to={`/freelancer/gigs/edit/${gig.id}`}
                    className="flex-1 bg-[#FF6B00] hover:bg-[#FF9F45] text-white px-3 py-2 rounded text-sm font-medium transition-colors flex items-center justify-center gap-1"
                  >
                    <Edit className="w-3 h-3" />
                    Edit
                  </Link>
                  <button
                    onClick={() => handleAction(gig.id, 'analytics')}
                    className="border border-[#FF6B00] text-[#FF6B00] hover:bg-[#ffeee3] px-3 py-2 rounded text-sm font-medium transition-colors flex items-center justify-center gap-1"
                  >
                    <BarChart3 className="w-3 h-3" />
                    Stats
                  </button>
                </div>
                <div className="flex gap-2 mt-2">
                  <button
                    onClick={() => handleAction(gig.id, gig.status === 'active' ? 'pause' : 'activate')}
                    className={`flex-1 px-3 py-2 rounded text-sm font-medium transition-colors flex items-center justify-center gap-1 ${
                      gig.status === 'active'
                        ? 'bg-gray-100 hover:bg-gray-200 text-gray-700'
                        : 'bg-green-100 hover:bg-green-200 text-green-700'
                    }`}
                  >
                    {gig.status === 'active' ? (
                      <>
                        <Pause className="w-3 h-3" />
                        Pause
                      </>
                    ) : (
                      <>
                        <Play className="w-3 h-3" />
                        Activate
                      </>
                    )}
                  </button>
                  <button
                    onClick={() => handleAction(gig.id, 'duplicate')}
                    className="border border-gray-300 text-gray-600 hover:bg-gray-50 px-3 py-2 rounded text-sm font-medium transition-colors flex items-center justify-center gap-1"
                  >
                    <Copy className="w-3 h-3" />
                    Copy
                  </button>
                </div>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}

        {!isLoading && filteredGigs.length === 0 && (
          <div className="text-center py-12">
            <Package className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No gigs found</h3>
            <p className="text-gray-500 mb-6">
              {selectedTab === 'all' 
                ? "You haven't created any gigs yet." 
                : `No ${selectedTab} gigs found.`}
            </p>
            <Link
              to="/freelancer/gigs/create"
              className="bg-[#FF6B00] hover:bg-[#FF9F45] text-white px-6 py-3 rounded-lg font-medium transition-colors inline-flex items-center"
            >
              <Plus className="w-5 h-5 mr-2" />
              Create Your First Gig
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default Gigs;
