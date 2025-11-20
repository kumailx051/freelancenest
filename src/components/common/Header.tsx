import React, { useState } from 'react';
import { Menu, X, Search } from 'lucide-react';
import { useLocation, Link } from 'react-router-dom';

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  const [searchQuery, setSearchQuery] = useState('');
  
  // Check if we're on specific pages
  const isProjectCatalog = location.pathname === '/project-catalog';
  const isLandingPage = location.pathname === '/';
  
  // Handle search submission
  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Implement search functionality here
    console.log('Searching for:', searchQuery);
    // You could redirect to search results page or filter the current page
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 transition-all duration-200 border-0 border-b-0 bg-white/95 backdrop-blur-md shadow-sm scrolled" style={{borderBottom: 'none'}}>
      <div className="section-container border-0">
        <div className="flex items-center justify-between h-16 lg:h-20 border-0">
          {/* Logo Text */}
          <div className="flex items-center">
            <Link to="/" className="text-2xl font-bold transition-colors duration-200">
              <span className="text-[#2E2E2E]">Freelance</span>
              <span className="text-[#FF6B00]">Nest</span>
            </Link>
          </div>

          {/* Desktop Navigation with Search Bar - hidden on landing page */}
          <div className="hidden md:flex flex-1">
            {!isLandingPage && (
              <div className="w-full max-w-xl mx-4 relative">
                <form onSubmit={handleSearchSubmit} className="relative flex items-center">
                  <input
                    type="text"
                    placeholder={isProjectCatalog ? "Search projects..." : "What service are you looking for today?"}
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full px-4 py-2 pl-10 bg-[#ffeee3]/30 border border-[#ffeee3] rounded-md outline-none focus:outline-none focus:ring-2 focus:ring-[#FF6B00] shadow-sm"
                  />
                  <Search className="absolute left-3 w-4 h-4 text-[#2E2E2E]/70" />
                  <button 
                    type="submit" 
                    className="absolute right-2 bg-[#FF6B00] hover:bg-[#FF9F45] text-white px-3 py-1 rounded text-sm transition-colors"
                  >
                    Search
                  </button>
                </form>
              </div>
            )}
          </div>

          {/* Desktop Auth Buttons */}
          <div className="hidden md:flex items-center space-x-4">
            <Link to="/login" className="font-medium px-4 py-2 rounded-lg transition-all duration-200 text-[#2E2E2E] hover:text-[#FF6B00] hover:bg-[#ffeee3]/50">
              Log In
            </Link>
            <Link to="/signup">
              <button className="bg-[#FF6B00] hover:bg-[#FF9F45] text-white font-medium px-4 py-2 rounded-lg transition-all duration-200">
                Sign Up
              </button>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 rounded-md transition-all duration-200 text-[#2E2E2E] hover:text-[#FF6B00] hover:bg-[#ffeee3]/50"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white border-t border-[#ffeee3]">
          <div className="section-container py-4">
            <nav className="flex flex-col space-y-4">
              {/* Search bar - hidden on landing page */}
              {!isLandingPage && (
                <form onSubmit={handleSearchSubmit} className="relative mb-2">
                  <input
                    type="text"
                    placeholder={isProjectCatalog ? "Search projects..." : "What service are you looking for today?"}
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full px-4 py-2 pl-10 bg-[#ffeee3]/30 border border-[#ffeee3] rounded-md outline-none focus:outline-none focus:ring-2 focus:ring-[#FF6B00] shadow-sm"
                  />
                  <Search className="absolute left-3 top-2.5 w-4 h-4 text-[#2E2E2E]/70" />
                  <button 
                    type="submit" 
                    className="absolute right-2 top-1.5 bg-[#FF6B00] hover:bg-[#FF9F45] text-white px-3 py-1 rounded text-sm transition-colors"
                  >
                    Search
                  </button>
                </form>
              )}
              {/* Navigation links removed as requested */}
              <div className="flex flex-col space-y-2 border-[#ffeee3]">
                <Link to="/login" className="text-[#2E2E2E] hover:text-[#FF6B00] font-medium px-4 py-2 rounded-lg hover:bg-[#ffeee3]/50 transition-all duration-200 text-left">
                  Log In
                </Link>
                <Link to="/signup">
                  <button className="bg-[#FF6B00] hover:bg-[#FF9F45] text-white font-medium px-4 py-2 rounded-lg transition-all duration-200 w-full">
                    Sign Up
                  </button>
                </Link>
              </div>
            </nav>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
