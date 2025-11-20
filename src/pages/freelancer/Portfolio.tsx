import React, { useState } from 'react';
import { 
  Plus,
  Edit,
  Trash2,
  ExternalLink,
  Eye,
  Star,
  Calendar,
  Code,
  Share2,
  Search,
  Award,
  Heart
} from 'lucide-react';

const Portfolio: React.FC = () => {
  const [activeFilter, setActiveFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [viewMode, setViewMode] = useState('grid'); // grid, list

  const portfolioItems = [
    {
      id: 1,
      title: 'E-commerce Platform with React & Node.js',
      description: 'A full-featured e-commerce platform with shopping cart, payment integration, and admin dashboard. Built with React, Node.js, MongoDB, and Stripe.',
      category: 'Web Development',
      tags: ['React', 'Node.js', 'MongoDB', 'Stripe', 'Redux'],
      thumbnail: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800&h=600&fit=crop&auto=format',
      images: [
        'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=1600&h=1200&fit=crop&auto=format',
        'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1600&h=1200&fit=crop&auto=format',
        'https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=1600&h=1200&fit=crop&auto=format'
      ],
      liveUrl: 'https://ecommerce-demo.com',
      githubUrl: 'https://github.com/alexjohnson/ecommerce-platform',
      client: 'TechCorp Solutions',
      completedDate: '2024-01-15',
      duration: '3 months',
      budget: '$5,000',
      rating: 5.0,
      testimonial: 'Outstanding work! Alex delivered exactly what we needed and went above and beyond our expectations.',
      technologies: ['React', 'Node.js', 'Express', 'MongoDB', 'Stripe API', 'JWT', 'Material-UI'],
      features: [
        'User authentication and authorization',
        'Product catalog with search and filtering',
        'Shopping cart and wishlist functionality',
        'Secure payment processing with Stripe',
        'Admin dashboard for inventory management',
        'Order tracking and email notifications',
        'Responsive design for all devices'
      ],
      views: 245,
      likes: 18,
      featured: true
    },
    {
      id: 2,
      title: 'SaaS Dashboard with Real-time Analytics',
      description: 'Modern analytics dashboard with real-time data visualization, custom reports, and user management. Features interactive charts and responsive design.',
      category: 'Dashboard',
      tags: ['React', 'TypeScript', 'D3.js', 'WebSocket', 'Chart.js'],
      thumbnail: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=600&fit=crop&auto=format',
      images: [
        'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1600&h=1200&fit=crop&auto=format',
        'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1600&h=1200&fit=crop&auto=format'
      ],
      liveUrl: 'https://saas-dashboard-demo.com',
      githubUrl: 'https://github.com/alexjohnson/saas-dashboard',
      client: 'InnovateTech Inc',
      completedDate: '2024-02-20',
      duration: '2 months',
      budget: '$3,500',
      rating: 4.9,
      testimonial: 'The dashboard exceeded our expectations. The real-time features work flawlessly.',
      technologies: ['React', 'TypeScript', 'D3.js', 'WebSocket', 'Node.js', 'PostgreSQL'],
      features: [
        'Real-time data visualization',
        'Interactive charts and graphs',
        'Custom report generation',
        'User role management',
        'Export functionality (PDF, CSV)',
        'Dark/light theme toggle',
        'Mobile-responsive design'
      ],
      views: 189,
      likes: 14,
      featured: false
    },
    {
      id: 3,
      title: 'React Native Mobile App for Logistics',
      description: 'Cross-platform mobile app for logistics management with GPS tracking, real-time notifications, and offline capabilities.',
      category: 'Mobile Development',
      tags: ['React Native', 'JavaScript', 'Firebase', 'GPS', 'Push Notifications'],
      thumbnail: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=800&h=600&fit=crop&auto=format',
      images: [
        'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=1600&h=1200&fit=crop&auto=format',
        'https://images.unsplash.com/photo-1555774698-0b77e0d5fac6?w=1600&h=1200&fit=crop&auto=format',
        'https://images.unsplash.com/photo-1563203369-26f2e4a5ccf7?w=1600&h=1200&fit=crop&auto=format'
      ],
      liveUrl: null,
      githubUrl: null,
      client: 'MobileFirst Co',
      completedDate: '2024-03-10',
      duration: '4 months',
      budget: '$4,200',
      rating: 4.8,
      testimonial: 'Perfect execution of our mobile app requirements. Great communication throughout.',
      technologies: ['React Native', 'Firebase', 'Google Maps API', 'Redux', 'AsyncStorage'],
      features: [
        'GPS tracking and route optimization',
        'Real-time push notifications',
        'Offline data synchronization',
        'Barcode scanning functionality',
        'Driver performance analytics',
        'Customer delivery notifications',
        'Cross-platform compatibility (iOS/Android)'
      ],
      views: 156,
      likes: 11,
      featured: true
    },
    {
      id: 4,
      title: 'Data Visualization Dashboard',
      description: 'Interactive data visualization platform with complex charts, filters, and export capabilities. Built for financial data analysis.',
      category: 'Data Visualization',
      tags: ['React', 'D3.js', 'Python', 'FastAPI', 'PostgreSQL'],
      thumbnail: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=600&fit=crop&auto=format',
      images: [
        'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1600&h=1200&fit=crop&auto=format'
      ],
      liveUrl: 'https://dataviz-demo.com',
      githubUrl: 'https://github.com/alexjohnson/data-viz',
      client: 'DataViz Solutions',
      completedDate: '2023-12-05',
      duration: '6 weeks',
      budget: '$2,800',
      rating: 5.0,
      testimonial: 'Incredible attention to detail and perfect implementation of our design requirements.',
      technologies: ['React', 'D3.js', 'Python', 'FastAPI', 'PostgreSQL', 'Redis'],
      features: [
        'Complex data visualization with D3.js',
        'Interactive filtering and drill-down',
        'Real-time data updates',
        'Custom chart types',
        'Export to multiple formats',
        'Performance optimization for large datasets',
        'Responsive and accessible design'
      ],
      views: 98,
      likes: 8,
      featured: false
    },
    {
      id: 5,
      title: 'AI-Powered Content Management System',
      description: 'Modern CMS with AI-powered content suggestions, automated SEO optimization, and intuitive content editing experience.',
      category: 'CMS',
      tags: ['Next.js', 'AI', 'SEO', 'Headless CMS', 'TypeScript'],
      thumbnail: 'https://images.unsplash.com/photo-1504639725590-34d0984388bd?w=800&h=600&fit=crop&auto=format',
      images: [
        'https://images.unsplash.com/photo-1504639725590-34d0984388bd?w=1600&h=1200&fit=crop&auto=format',
        'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1600&h=1200&fit=crop&auto=format'
      ],
      liveUrl: 'https://ai-cms-demo.com',
      githubUrl: null,
      client: 'ContentTech Ltd',
      completedDate: '2024-01-30',
      duration: '2.5 months',
      budget: '$4,800',
      rating: 4.9,
      testimonial: 'Revolutionary CMS solution. The AI features are game-changing for our content team.',
      technologies: ['Next.js', 'TypeScript', 'OpenAI API', 'Prisma', 'PostgreSQL', 'Tailwind CSS'],
      features: [
        'AI-powered content suggestions',
        'Automated SEO optimization',
        'Rich text editor with AI assistance',
        'Multi-language support',
        'Advanced user permissions',
        'Content scheduling and workflows',
        'Analytics and performance tracking'
      ],
      views: 67,
      likes: 5,
      featured: false
    }
  ];

  const categories = ['all', 'Web Development', 'Mobile Development', 'Dashboard', 'Data Visualization', 'CMS'];

  const filteredItems = portfolioItems.filter(item => {
    const matchesCategory = activeFilter === 'all' || item.category === activeFilter;
    const matchesSearch = item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         item.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         item.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  const stats = {
    totalProjects: portfolioItems.length,
    totalViews: portfolioItems.reduce((acc, item) => acc + item.views, 0),
    totalLikes: portfolioItems.reduce((acc, item) => acc + item.likes, 0),
    avgRating: (portfolioItems.reduce((acc, item) => acc + item.rating, 0) / portfolioItems.length).toFixed(1),
    featuredProjects: portfolioItems.filter(item => item.featured).length
  };

  return (
    <div className="min-h-screen bg-[#ffeee3]/30 pt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-[#2E2E2E]">Portfolio</h1>
            <p className="text-[#2E2E2E]/70">Showcase your best work and achievements</p>
          </div>
          <div className="flex space-x-3">
            <button className="border border-[#FF6B00] text-[#FF6B00] hover:bg-[#ffeee3] px-4 py-2 rounded-lg font-medium transition-colors flex items-center">
              <Share2 className="w-4 h-4 mr-2" />
              Share Portfolio
            </button>
            <button className="bg-[#FF6B00] hover:bg-[#FF9F45] text-white px-4 py-2 rounded-lg font-medium transition-colors flex items-center">
              <Plus className="w-4 h-4 mr-2" />
              Add Project
            </button>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-8">
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-[#2E2E2E]/70">Projects</span>
              <Code className="w-4 h-4 text-[#FF6B00]" />
            </div>
            <p className="text-2xl font-bold text-[#2E2E2E]">{stats.totalProjects}</p>
          </div>
          
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-[#2E2E2E]/70">Total Views</span>
              <Eye className="w-4 h-4 text-blue-600" />
            </div>
            <p className="text-2xl font-bold text-[#2E2E2E]">{stats.totalViews}</p>
          </div>
          
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-[#2E2E2E]/70">Likes</span>
              <Heart className="w-4 h-4 text-red-500" />
            </div>
            <p className="text-2xl font-bold text-[#2E2E2E]">{stats.totalLikes}</p>
          </div>
          
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-[#2E2E2E]/70">Avg Rating</span>
              <Star className="w-4 h-4 text-yellow-500" />
            </div>
            <p className="text-2xl font-bold text-[#2E2E2E]">{stats.avgRating}</p>
          </div>
          
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-[#2E2E2E]/70">Featured</span>
              <Award className="w-4 h-4 text-purple-600" />
            </div>
            <p className="text-2xl font-bold text-[#2E2E2E]">{stats.featuredProjects}</p>
          </div>
        </div>

        {/* Filters and Search */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 mb-8">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
            <div className="flex flex-wrap gap-2">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setActiveFilter(category)}
                  className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                    activeFilter === category
                      ? 'bg-[#FF6B00] text-white'
                      : 'bg-gray-100 text-[#2E2E2E] hover:bg-gray-200'
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
            
            <div className="flex items-center space-x-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <input
                  type="text"
                  placeholder="Search projects..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF6B00] focus:border-transparent"
                />
              </div>
              
              <div className="flex border border-gray-300 rounded-lg overflow-hidden">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`p-2 ${viewMode === 'grid' ? 'bg-[#FF6B00] text-white' : 'text-[#2E2E2E] hover:bg-gray-50'}`}
                >
                  <div className="grid grid-cols-2 gap-1">
                    <div className="w-2 h-2 bg-current rounded-sm"></div>
                    <div className="w-2 h-2 bg-current rounded-sm"></div>
                    <div className="w-2 h-2 bg-current rounded-sm"></div>
                    <div className="w-2 h-2 bg-current rounded-sm"></div>
                  </div>
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={`p-2 ${viewMode === 'list' ? 'bg-[#FF6B00] text-white' : 'text-[#2E2E2E] hover:bg-gray-50'}`}
                >
                  <div className="space-y-1">
                    <div className="w-4 h-1 bg-current rounded"></div>
                    <div className="w-4 h-1 bg-current rounded"></div>
                    <div className="w-4 h-1 bg-current rounded"></div>
                  </div>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Portfolio Items */}
        {viewMode === 'grid' ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredItems.map((item) => (
              <div key={item.id} className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-shadow">
                {/* Thumbnail */}
                <div className="relative">
                  <img
                    src={item.thumbnail}
                    alt={item.title}
                    className="w-full h-48 object-cover"
                  />
                  {item.featured && (
                    <div className="absolute top-3 left-3 bg-[#FF6B00] text-white px-2 py-1 rounded-full text-xs font-medium">
                      Featured
                    </div>
                  )}
                  <div className="absolute top-3 right-3 flex space-x-2">
                    {item.liveUrl && (
                      <a
                        href={item.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="bg-white/90 hover:bg-white text-[#2E2E2E] p-2 rounded-lg transition-colors"
                      >
                        <ExternalLink className="w-4 h-4" />
                      </a>
                    )}
                    {item.githubUrl && (
                      <a
                        href={item.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="bg-white/90 hover:bg-white text-[#2E2E2E] p-2 rounded-lg transition-colors"
                      >
                        <Code className="w-4 h-4" />
                      </a>
                    )}
                  </div>
                </div>

                <div className="p-6">
                  {/* Header */}
                  <div className="mb-3">
                    <h3 className="text-lg font-semibold text-[#2E2E2E] mb-1 line-clamp-2">
                      {item.title}
                    </h3>
                    <span className="text-sm text-[#FF6B00] font-medium">{item.category}</span>
                  </div>

                  {/* Description */}
                  <p className="text-[#2E2E2E]/70 text-sm mb-4 line-clamp-3">
                    {item.description}
                  </p>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    {item.tags.slice(0, 3).map((tag, index) => (
                      <span 
                        key={index}
                        className="px-2 py-1 bg-[#ffeee3] text-[#FF6B00] text-xs rounded-full"
                      >
                        {tag}
                      </span>
                    ))}
                    {item.tags.length > 3 && (
                      <span className="text-xs text-[#2E2E2E]/60 self-center">
                        +{item.tags.length - 3} more
                      </span>
                    )}
                  </div>

                  {/* Stats */}
                  <div className="flex items-center justify-between text-sm text-[#2E2E2E]/60 mb-4">
                    <div className="flex items-center space-x-4">
                      <span className="flex items-center">
                        <Eye className="w-3 h-3 mr-1" />
                        {item.views}
                      </span>
                      <span className="flex items-center">
                        <Heart className="w-3 h-3 mr-1" />
                        {item.likes}
                      </span>
                      <span className="flex items-center">
                        <Star className="w-3 h-3 mr-1 text-yellow-400 fill-current" />
                        {item.rating}
                      </span>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex justify-between items-center">
                    <span className="text-xs text-[#2E2E2E]/60">
                      {new Date(item.completedDate).toLocaleDateString()}
                    </span>
                    <div className="flex space-x-2">
                      <button className="p-2 text-[#2E2E2E]/60 hover:text-[#FF6B00] hover:bg-[#ffeee3] rounded-lg transition-colors">
                        <Edit className="w-4 h-4" />
                      </button>
                      <button className="p-2 text-[#2E2E2E]/60 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="space-y-6">
            {filteredItems.map((item) => (
              <div key={item.id} className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                <div className="flex space-x-6">
                  {/* Thumbnail */}
                  <div className="relative flex-shrink-0">
                    <img
                      src={item.thumbnail}
                      alt={item.title}
                      className="w-32 h-24 object-cover rounded-lg"
                    />
                    {item.featured && (
                      <div className="absolute -top-2 -right-2 bg-[#FF6B00] text-white px-2 py-1 rounded-full text-xs font-medium">
                        Featured
                      </div>
                    )}
                  </div>

                  {/* Content */}
                  <div className="flex-1">
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <h3 className="text-xl font-semibold text-[#2E2E2E] mb-1">
                          {item.title}
                        </h3>
                        <span className="text-sm text-[#FF6B00] font-medium">{item.category}</span>
                      </div>
                      <div className="flex space-x-2">
                        {item.liveUrl && (
                          <a
                            href={item.liveUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-2 text-[#2E2E2E]/60 hover:text-[#FF6B00] hover:bg-[#ffeee3] rounded-lg transition-colors"
                          >
                            <ExternalLink className="w-4 h-4" />
                          </a>
                        )}
                        {item.githubUrl && (
                          <a
                            href={item.githubUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-2 text-[#2E2E2E]/60 hover:text-[#FF6B00] hover:bg-[#ffeee3] rounded-lg transition-colors"
                          >
                            <Code className="w-4 h-4" />
                          </a>
                        )}
                        <button className="p-2 text-[#2E2E2E]/60 hover:text-[#FF6B00] hover:bg-[#ffeee3] rounded-lg transition-colors">
                          <Edit className="w-4 h-4" />
                        </button>
                        <button className="p-2 text-[#2E2E2E]/60 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors">
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>

                    <p className="text-[#2E2E2E]/70 mb-4">
                      {item.description}
                    </p>

                    <div className="flex flex-wrap gap-2 mb-4">
                      {item.tags.map((tag, index) => (
                        <span 
                          key={index}
                          className="px-2 py-1 bg-[#ffeee3] text-[#FF6B00] text-xs rounded-full"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>

                    <div className="flex items-center justify-between text-sm">
                      <div className="flex items-center space-x-6 text-[#2E2E2E]/60">
                        <span className="flex items-center">
                          <Eye className="w-4 h-4 mr-1" />
                          {item.views} views
                        </span>
                        <span className="flex items-center">
                          <Heart className="w-4 h-4 mr-1" />
                          {item.likes} likes
                        </span>
                        <span className="flex items-center">
                          <Star className="w-4 h-4 mr-1 text-yellow-400 fill-current" />
                          {item.rating}
                        </span>
                        <span className="flex items-center">
                          <Calendar className="w-4 h-4 mr-1" />
                          {new Date(item.completedDate).toLocaleDateString()}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Empty State */}
        {filteredItems.length === 0 && (
          <div className="text-center py-20">
            <Code className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-[#2E2E2E] mb-2">No projects found</h3>
            <p className="text-[#2E2E2E]/60 mb-6">
              {searchQuery || activeFilter !== 'all' 
                ? 'Try adjusting your search or filters'
                : 'Start building your portfolio by adding your first project'
              }
            </p>
            <button className="bg-[#FF6B00] hover:bg-[#FF9F45] text-white px-6 py-3 rounded-lg font-medium transition-colors flex items-center mx-auto">
              <Plus className="w-5 h-5 mr-2" />
              Add Your First Project
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Portfolio;
