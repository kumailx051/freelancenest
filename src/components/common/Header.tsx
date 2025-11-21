import React, { useState } from 'react';
import { Menu, X } from 'lucide-react';
import { Link } from 'react-router-dom';

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

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
