import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { collection, query, where, getDocs, orderBy, deleteDoc, doc } from 'firebase/firestore';
import { db } from '../../lib/firebase';
import { useAuth } from '../../contexts/AuthContext';
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
  Heart,
  RefreshCw
} from 'lucide-react';

interface PortfolioItem {
  id: string;
  title: string;
  description: string;
  category: string;
  tags: string[];
  thumbnail: string;
  images: string[];
  liveUrl?: string;
  githubUrl?: string;
  client?: string;
  completedDate: string;
  duration: string;
  budget?: string;
  rating: number;
  testimonial?: string;
  technologies: string[];
  features: string[];
  userId: string;
  createdAt: any;
  status: 'published' | 'draft';
  views?: number;
  likes?: number;
  featured?: boolean;
}

const Portfolio: React.FC = () => {
  const { currentUser } = useAuth();
  const [activeFilter, setActiveFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [viewMode, setViewMode] = useState('grid'); // grid, list
  const [portfolioItems, setPortfolioItems] = useState<PortfolioItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [deleteLoading, setDeleteLoading] = useState<string | null>(null);

  // Fetch portfolio projects from Firebase
  const fetchProjects = async () => {
    if (!currentUser?.uid) {
      setIsLoading(false);
      return;
    }

    try {
      const q = query(
        collection(db, 'portfolio_projects'),
        where('userId', '==', currentUser.uid),
        orderBy('createdAt', 'desc')
      );
      
      const querySnapshot = await getDocs(q);
      const projects: PortfolioItem[] = [];
      
      querySnapshot.forEach((doc) => {
        projects.push({
          id: doc.id,
          ...doc.data()
        } as PortfolioItem);
      });
      
      setPortfolioItems(projects);
      console.log(`Fetched ${projects.length} portfolio projects from Firebase`);
    } catch (error) {
      console.error('Error fetching portfolio projects:', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, [currentUser]);

  // Add focus event listener to refresh data when returning to the page
  useEffect(() => {
    const handleFocus = () => {
      if (currentUser?.uid) {
        fetchProjects();
      }
    };

    window.addEventListener('focus', handleFocus);
    return () => window.removeEventListener('focus', handleFocus);
  }, [currentUser]);

  const handleDeleteProject = async (projectId: string) => {
    if (!confirm('Are you sure you want to delete this project?')) return;

    setDeleteLoading(projectId);
    try {
      await deleteDoc(doc(db, 'portfolio_projects', projectId));
      setPortfolioItems(prev => prev.filter(item => item.id !== projectId));
    } catch (error) {
      console.error('Error deleting project:', error);
      alert('Failed to delete project. Please try again.');
    } finally {
      setDeleteLoading(null);
    }
  };

  // Portfolio data is fetched from Firebase

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
    totalViews: portfolioItems.reduce((acc, item) => acc + (item.views || 0), 0),
    totalLikes: portfolioItems.reduce((acc, item) => acc + (item.likes || 0), 0),
    avgRating: portfolioItems.length > 0 ? (portfolioItems.reduce((acc, item) => acc + item.rating, 0) / portfolioItems.length).toFixed(1) : '0.0',
    featuredProjects: portfolioItems.filter(item => item.featured).length
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#ffeee3]/30 pt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex items-center justify-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#FF6B00]"></div>
            <span className="ml-3 text-gray-600">Loading portfolio...</span>
          </div>
        </div>
      </div>
    );
  }

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
            <button 
              onClick={fetchProjects}
              disabled={isLoading}
              className="border border-gray-300 text-gray-700 hover:bg-gray-50 px-4 py-2 rounded-lg font-medium transition-colors flex items-center disabled:opacity-50"
            >
              <RefreshCw className={`w-4 h-4 mr-2 ${isLoading ? 'animate-spin' : ''}`} />
              Refresh
            </button>
            <button className="border border-[#FF6B00] text-[#FF6B00] hover:bg-[#ffeee3] px-4 py-2 rounded-lg font-medium transition-colors flex items-center">
              <Share2 className="w-4 h-4 mr-2" />
              Share Portfolio
            </button>
            <Link
              to="/freelancer/portfolio/add"
              className="bg-[#FF6B00] hover:bg-[#FF9F45] text-white px-4 py-2 rounded-lg font-medium transition-colors flex items-center"
            >
              <Plus className="w-4 h-4 mr-2" />
              Add Project
            </Link>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-8">
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-[#2E2E2E]/70">Total Projects</span>
              <Code className="w-4 h-4 text-[#FF6B00]" />
            </div>
            <p className="text-2xl font-bold text-[#FF6B00]">{stats.totalProjects}</p>
            <p className="text-xs text-[#2E2E2E]/50 mt-1">From Firebase</p>
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
                      <Link
                        to={`/freelancer/portfolio/edit/${item.id}`}
                        className="p-2 text-[#2E2E2E]/60 hover:text-[#FF6B00] hover:bg-[#ffeee3] rounded-lg transition-colors"
                      >
                        <Edit className="w-4 h-4" />
                      </Link>
                      <button 
                        onClick={() => handleDeleteProject(item.id)}
                        disabled={deleteLoading === item.id}
                        className="p-2 text-[#2E2E2E]/60 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors disabled:opacity-50"
                      >
                        {deleteLoading === item.id ? (
                          <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-red-600"></div>
                        ) : (
                          <Trash2 className="w-4 h-4" />
                        )}
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
                        <Link
                          to={`/freelancer/portfolio/edit/${item.id}`}
                          className="p-2 text-[#2E2E2E]/60 hover:text-[#FF6B00] hover:bg-[#ffeee3] rounded-lg transition-colors"
                        >
                          <Edit className="w-4 h-4" />
                        </Link>
                        <button 
                          onClick={() => handleDeleteProject(item.id)}
                          disabled={deleteLoading === item.id}
                          className="p-2 text-[#2E2E2E]/60 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors disabled:opacity-50"
                        >
                          {deleteLoading === item.id ? (
                            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-red-600"></div>
                          ) : (
                            <Trash2 className="w-4 h-4" />
                          )}
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
            <Link
              to="/freelancer/portfolio/add"
              className="bg-[#FF6B00] hover:bg-[#FF9F45] text-white px-6 py-3 rounded-lg font-medium transition-colors flex items-center mx-auto"
            >
              <Plus className="w-5 h-5 mr-2" />
              Add Your First Project
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default Portfolio;
