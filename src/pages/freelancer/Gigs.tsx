import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Plus, Package, Users, DollarSign, Star, Eye, Share2, Pause, Play, Edit, BarChart3, Copy } from 'lucide-react';

const Gigs = () => {
  const [selectedTab, setSelectedTab] = useState('all');

  // Sample gigs data with real images
  const gigs = [
    {
      id: 1,
      title: "I will create a professional responsive website design",
      category: "Web Design",
      subcategory: "Landing Pages",
      status: "active",
      images: [
        "https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?w=400&h=300&fit=crop&crop=center",
        "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=400&h=300&fit=crop&crop=center"
      ],
      packages: {
        basic: { price: 50, delivery: 3 },
        standard: { price: 100, delivery: 5 },
        premium: { price: 200, delivery: 7 }
      },
      stats: {
        views: 1247,
        orders: 23,
        rating: 4.9,
        reviews: 18
      }
    },
    {
      id: 2,
      title: "I will design modern mobile app UI/UX with figma",
      category: "UI/UX Design",
      subcategory: "Mobile App Design",
      status: "active",
      images: [
        "https://images.unsplash.com/photo-1551650975-87deedd944c3?w=400&h=300&fit=crop&crop=center",
        "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=400&h=300&fit=crop&crop=center"
      ],
      packages: {
        basic: { price: 75, delivery: 5 },
        standard: { price: 150, delivery: 7 },
        premium: { price: 300, delivery: 10 }
      },
      stats: {
        views: 892,
        orders: 15,
        rating: 4.8,
        reviews: 12
      }
    },
    {
      id: 3,
      title: "I will develop custom react components and animations",
      category: "Programming",
      subcategory: "Frontend Development",
      status: "paused",
      images: [
        "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=400&h=300&fit=crop&crop=center",
        "https://images.unsplash.com/photo-1627398242454-45a1465c2479?w=400&h=300&fit=crop&crop=center"
      ],
      packages: {
        basic: { price: 100, delivery: 7 },
        standard: { price: 200, delivery: 10 },
        premium: { price: 400, delivery: 14 }
      },
      stats: {
        views: 634,
        orders: 8,
        rating: 5.0,
        reviews: 6
      }
    },
    {
      id: 4,
      title: "I will create engaging social media graphics and posts",
      category: "Graphic Design",
      subcategory: "Social Media Design",
      status: "draft",
      images: [
        "https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=400&h=300&fit=crop&crop=center",
        "https://images.unsplash.com/photo-1614935151651-0bea6508db6b?w=400&h=300&fit=crop&crop=center"
      ],
      packages: {
        basic: { price: 25, delivery: 2 },
        standard: { price: 50, delivery: 3 },
        premium: { price: 100, delivery: 5 }
      },
      stats: {
        views: 0,
        orders: 0,
        rating: 0,
        reviews: 0
      }
    },
    {
      id: 5,
      title: "I will write compelling copy for your website or marketing",
      category: "Writing & Translation",
      subcategory: "Copywriting",
      status: "active",
      images: [
        "https://images.unsplash.com/photo-1455390582262-044cdead277a?w=400&h=300&fit=crop&crop=center",
        "https://images.unsplash.com/photo-1586953208448-b95a79798f07?w=400&h=300&fit=crop&crop=center"
      ],
      packages: {
        basic: { price: 40, delivery: 3 },
        standard: { price: 80, delivery: 5 },
        premium: { price: 160, delivery: 7 }
      },
      stats: {
        views: 543,
        orders: 12,
        rating: 4.7,
        reviews: 9
      }
    },
    {
      id: 6,
      title: "I will create professional business presentations",
      category: "Business",
      subcategory: "Presentations",
      status: "active",
      images: [
        "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=400&h=300&fit=crop&crop=center",
        "https://images.unsplash.com/photo-1551818255-e6e10975bc17?w=400&h=300&fit=crop&crop=center"
      ],
      packages: {
        basic: { price: 60, delivery: 4 },
        standard: { price: 120, delivery: 6 },
        premium: { price: 240, delivery: 8 }
      },
      stats: {
        views: 721,
        orders: 19,
        rating: 4.9,
        reviews: 14
      }
    }
  ];

  const handleAction = (gigId: number, action: string) => {
    console.log(`Action: ${action} on gig ${gigId}`);
    // Handle gig actions here
  };

  const filteredGigs = gigs.filter(gig => 
    selectedTab === 'all' || gig.status === selectedTab
  );

  const totalEarnings = gigs.reduce((sum, gig) => 
    sum + (gig.stats.orders * gig.packages.basic.price), 0
  );

  const totalOrders = gigs.reduce((sum, gig) => sum + gig.stats.orders, 0);

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
                <p className="text-2xl font-bold text-gray-900">4.8</p>
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

        {/* Gigs Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredGigs.map((gig) => (
            <div key={gig.id} className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow group">
              {/* Gig Image */}
              <div className="relative">
                <img
                  src={gig.images[0]}
                  alt={gig.title}
                  className="w-full h-48 object-cover"
                />
                <button
                  onClick={() => handleAction(gig.id, 'share')}
                  className="absolute top-3 right-3 p-2 bg-white rounded-full shadow-sm hover:bg-gray-50 transition-colors"
                >
                  <Share2 className="w-4 h-4 text-gray-400" />
                </button>
                
                {/* Status Badge */}
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
                <h3 className="text-sm font-medium text-gray-900 mb-3 line-clamp-2 hover:text-[#FF6B00] transition-colors cursor-pointer">
                  {gig.title}
                </h3>

                {/* Category */}
                <p className="text-xs text-gray-500 mb-3">{gig.category}</p>

                {/* Stats */}
                <div className="flex items-center justify-between mb-3 text-xs text-gray-500">
                  <div className="flex items-center gap-3">
                    <span className="flex items-center gap-1">
                      <Eye className="w-3 h-3" />
                      {gig.stats.views}
                    </span>
                    <span className="flex items-center gap-1">
                      <Package className="w-3 h-3" />
                      {gig.stats.orders}
                    </span>
                  </div>
                  {gig.stats.rating > 0 && (
                    <div className="flex items-center gap-1">
                      <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                      <span className="text-sm font-medium text-gray-900">
                        {gig.stats.rating}
                      </span>
                      <span className="text-xs text-gray-500">
                        ({gig.stats.reviews})
                      </span>
                    </div>
                  )}
                </div>

                {/* Price */}
                <div className="text-right">
                  <p className="text-sm text-gray-600">Starting at</p>
                  <p className="text-lg font-bold text-gray-900">
                    ${gig.packages.basic.price}
                  </p>
                </div>
              </div>

              {/* Actions */}
              <div className="px-4 pb-4">
                <div className="flex gap-2">
                  <button
                    onClick={() => handleAction(gig.id, 'edit')}
                    className="flex-1 bg-[#FF6B00] hover:bg-[#FF9F45] text-white px-3 py-2 rounded text-sm font-medium transition-colors flex items-center justify-center gap-1"
                  >
                    <Edit className="w-3 h-3" />
                    Edit
                  </button>
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

        {filteredGigs.length === 0 && (
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
