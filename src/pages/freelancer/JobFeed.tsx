import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Search, 
  Star, 
  Heart,
  ChevronDown
} from 'lucide-react';

const JobFeed: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [sortBy, setSortBy] = useState('best-selling');
  const [bookmarkedJobs, setBookmarkedJobs] = useState<number[]>([]);

  const categories = [
    { value: 'all', label: 'All Categories' },
    { value: 'web-development', label: 'Web Development' },
    { value: 'mobile-development', label: 'Mobile Development' },
    { value: 'design', label: 'Design & Creative' },
    { value: 'writing', label: 'Writing & Content' },
    { value: 'marketing', label: 'Digital Marketing' },
    { value: 'data-science', label: 'Data Science & Analytics' },
    { value: 'video-animation', label: 'Video & Animation' }
  ];

  const jobs = [
    {
      id: 1,
      title: 'I will build, design, redesign, develop, update, clone, or fix WordPress website',
      image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&h=250&fit=crop&auto=format',
      freelancer: {
        name: 'Manik Uzzaman',
        avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=50&h=50&fit=crop&crop=face&auto=format',
        level: 'Level 2',
        rating: 4.8,
        reviewsCount: 355,
        badge: "Fiverr's Choice",
        isChoice: true
      },
      pricing: {
        currency: 'PKR',
        startingPrice: 39927
      },
      category: 'web-development',
      tags: ['WordPress', 'Website Development', 'PHP'],
      featured: true
    },
    {
      id: 2,
      title: 'I will build, rebuild full stack website development front end, backend, database',
      image: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=400&h=250&fit=crop&auto=format',
      freelancer: {
        name: 'Mohin Uddin',
        avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=50&h=50&fit=crop&crop=face&auto=format',
        level: 'Level 2',
        rating: 5.0,
        reviewsCount: 403,
        isChoice: false
      },
      pricing: {
        currency: 'PKR',
        startingPrice: 44363
      },
      category: 'web-development',
      tags: ['Full Stack', 'React', 'Node.js'],
      featured: false,
      videoConsultation: true
    },
    {
      id: 3,
      title: 'I will build or rebuild website development, business website, full stack website',
      image: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=400&h=250&fit=crop&auto=format',
      freelancer: {
        name: 'Md Toki Osmani',
        avatar: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=50&h=50&fit=crop&crop=face&auto=format',
        level: 'Level 2',
        rating: 5.0,
        reviewsCount: 135,
        isChoice: false
      },
      pricing: {
        currency: 'PKR',
        startingPrice: 35491
      },
      category: 'web-development',
      tags: ['Business Website', 'Full Stack'],
      featured: false
    },
    {
      id: 4,
      title: 'I will build, rebuild website development as full stack web developer',
      image: 'https://images.unsplash.com/photo-1504639725590-34d0984388bd?w=400&h=250&fit=crop&auto=format',
      freelancer: {
        name: 'Mohammad Safilid',
        avatar: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=50&h=50&fit=crop&crop=face&auto=format',
        level: 'Level 2',
        rating: 4.9,
        reviewsCount: 363,
        isChoice: false
      },
      pricing: {
        currency: 'PKR',
        startingPrice: 44363
      },
      category: 'web-development',
      tags: ['Full Stack', 'Web Development'],
      featured: false,
      videoConsultation: true
    },
    {
      id: 5,
      title: 'I will develop modern framer website, framer landing page, figma to framer',
      image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&h=250&fit=crop&auto=format',
      freelancer: {
        name: 'Akibur Rahman',
        avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=50&h=50&fit=crop&crop=face&auto=format',
        level: 'Vetted Pro',
        rating: 4.9,
        reviewsCount: 278,
        isChoice: false,
        isVettedPro: true
      },
      pricing: {
        currency: 'PKR',
        startingPrice: 29000
      },
      category: 'design',
      tags: ['Framer', 'Landing Page', 'Figma'],
      featured: false
    },
    {
      id: 6,
      title: 'I will do website development as full stack developer PHP laravel react js node js',
      image: 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=400&h=250&fit=crop&auto=format',
      freelancer: {
        name: 'Yeasir Arafat',
        avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=50&h=50&fit=crop&crop=face&auto=format',
        level: 'Level 2',
        rating: 4.8,
        reviewsCount: 192,
        isChoice: false
      },
      pricing: {
        currency: 'PKR',
        startingPrice: 25000
      },
      category: 'web-development',
      tags: ['PHP', 'Laravel', 'React', 'Node.js'],
      featured: false
    },
    {
      id: 7,
      title: 'I will do custom website development as full stack developer, front end and backend',
      image: 'https://images.unsplash.com/photo-1487058792275-0ad4aaf24ca7?w=400&h=250&fit=crop&auto=format',
      freelancer: {
        name: 'Ibrahim K.',
        avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=50&h=50&fit=crop&crop=face&auto=format',
        level: 'Level 2',
        rating: 4.9,
        reviewsCount: 89,
        isChoice: false
      },
      pricing: {
        currency: 'PKR',
        startingPrice: 38000
      },
      category: 'web-development',
      tags: ['Custom Website', 'Full Stack'],
      featured: false
    },
    {
      id: 8,
      title: 'I will do website development as full stack web developer, front end and backend',
      image: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=400&h=250&fit=crop&auto=format',
      freelancer: {
        name: 'Joy',
        avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=50&h=50&fit=crop&crop=face&auto=format',
        level: 'Level 2',
        rating: 4.7,
        reviewsCount: 156,
        isChoice: false
      },
      pricing: {
        currency: 'PKR',
        startingPrice: 32000
      },
      category: 'web-development',
      tags: ['Full Stack', 'Frontend', 'Backend'],
      featured: false
    }
  ];

  const handleBookmark = (jobId: number) => {
    setBookmarkedJobs(prev => 
      prev.includes(jobId) 
        ? prev.filter(id => id !== jobId)
        : [...prev, jobId]
    );
  };

  const formatPrice = (price: number, currency: string) => {
    return `${currency} ${price.toLocaleString()}`;
  };

  const filteredJobs = jobs.filter(job => {
    const matchesSearch = job.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         job.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    const matchesCategory = selectedCategory === 'all' || job.category === selectedCategory;
    
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Find Your Next Project</h1>
          <p className="text-gray-600">Discover opportunities that match your skills</p>
        </div>

        {/* Search and Filters */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-8">
          <div className="flex flex-col lg:flex-row gap-4">
            {/* Search Bar */}
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search for jobs..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FF6B00] focus:border-transparent"
              />
            </div>

            {/* Category Filter */}
            <div className="w-full lg:w-64">
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FF6B00] focus:border-transparent"
              >
                {categories.map(category => (
                  <option key={category.value} value={category.value}>
                    {category.label}
                  </option>
                ))}
              </select>
            </div>

            {/* Sort By */}
            <div className="w-full lg:w-48">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FF6B00] focus:border-transparent"
              >
                <option value="best-selling">Best Selling</option>
                <option value="newest">Newest</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="rating">Highest Rated</option>
              </select>
            </div>
          </div>
        </div>

        {/* Results Header */}
        <div className="flex items-center justify-between mb-6">
          <p className="text-gray-600">
            {filteredJobs.length.toLocaleString()}+ results
          </p>
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <span>Sort by:</span>
            <button className="flex items-center gap-1 font-medium">
              Best selling
              <ChevronDown className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Job Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredJobs.map((job) => (
            <div key={job.id} className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow group">
              {/* Job Image */}
              <div className="relative">
                <img
                  src={job.image}
                  alt={job.title}
                  className="w-full h-48 object-cover"
                />
                <button
                  onClick={() => handleBookmark(job.id)}
                  className="absolute top-3 right-3 p-2 bg-white rounded-full shadow-sm hover:bg-gray-50 transition-colors"
                >
                  <Heart 
                    className={`w-4 h-4 ${bookmarkedJobs.includes(job.id) ? 'fill-red-500 text-red-500' : 'text-gray-400'}`} 
                  />
                </button>
                
                {/* Badges */}
                {job.freelancer.isChoice && (
                  <div className="absolute top-3 left-3 bg-[#FF6B00] text-white px-2 py-1 rounded text-xs font-medium">
                    Fiverr's Choice
                  </div>
                )}
                
                {job.freelancer.isVettedPro && (
                  <div className="absolute top-3 left-3 bg-purple-600 text-white px-2 py-1 rounded text-xs font-medium">
                    Vetted Pro
                  </div>
                )}
                
                {job.videoConsultation && (
                  <div className="absolute bottom-3 left-3 bg-black/50 text-white px-2 py-1 rounded text-xs">
                    🎥 Offers video consultations
                  </div>
                )}
              </div>

              {/* Job Content */}
              <div className="p-4">
                {/* Freelancer Info */}
                <div className="flex items-center gap-2 mb-3">
                  <img
                    src={job.freelancer.avatar}
                    alt={job.freelancer.name}
                    className="w-6 h-6 rounded-full object-cover"
                  />
                  <span className="text-sm font-medium text-gray-900">{job.freelancer.name}</span>
                  <span className="text-xs text-gray-500">{job.freelancer.level}</span>
                </div>

                {/* Job Title */}
                <Link 
                  to={`/freelancer/job-details/${job.id}`}
                  className="block"
                >
                  <h3 className="text-sm font-medium text-gray-900 mb-3 line-clamp-2 hover:text-[#FF6B00] transition-colors">
                    {job.title}
                  </h3>
                </Link>

                {/* Rating */}
                <div className="flex items-center gap-1 mb-3">
                  <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                  <span className="text-sm font-medium text-gray-900">
                    {job.freelancer.rating}
                  </span>
                  <span className="text-sm text-gray-500">
                    ({job.freelancer.reviewsCount})
                  </span>
                </div>

                {/* Price */}
                <div className="text-right">
                  <p className="text-sm text-gray-600">From</p>
                  <p className="text-lg font-bold text-gray-900">
                    {formatPrice(job.pricing.startingPrice, job.pricing.currency)}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Load More */}
        <div className="flex justify-center mt-12">
          <button className="bg-[#FF6B00] hover:bg-[#FF9F45] text-white px-8 py-3 rounded-lg font-medium transition-colors">
            Load More Jobs
          </button>
        </div>
      </div>
    </div>
  );
};

export default JobFeed;
