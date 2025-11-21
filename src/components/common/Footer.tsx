import React from 'react';
import { Link } from 'react-router-dom';
import { Facebook, Twitter, Instagram, Linkedin, Mail, Phone, MapPin } from 'lucide-react';

const Footer: React.FC = () => {
  const footerLinks = {
    'For Clients': [
      { label: 'How to Hire', href: '/how-to-hire' },
      { label: 'Talent Marketplace', href: '/talent-marketplace' },
      { label: 'Project Catalog', href: '/project-catalog' },
      { label: 'Enterprise Solutions', href: '/enterprise' },
      { label: 'Trust & Safety', href: '/trust-safety' }
    ],
    'For Freelancers': [
      { label: 'How to Find Work', href: '/how-to-find-work' },
      { label: 'Direct Contracts', href: '/direct-contracts' },
      { label: 'Ways to Earn', href: '/ways-to-earn' },
      { label: 'Freelancer Plus', href: '/freelancer-plus' }
    ],
    'Support': [
      { label: 'Help Center', href: '/resources/help-center' }
    ],
    'Company': [
      { label: 'About Us', href: '/company/about' }
    ]
  };

  const socialLinks = [
    { icon: Facebook, href: '#', label: 'Facebook' },
    { icon: Twitter, href: '#', label: 'Twitter' },
    { icon: Instagram, href: '#', label: 'Instagram' },
    { icon: Linkedin, href: '#', label: 'LinkedIn' }
  ];

  return (
    <footer className="bg-[#2E2E2E] text-white">
      {/* Main Footer Content */}
      <div className="section-container py-16">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8">
          {/* Company Info */}
          <div className="col-span-2 lg:col-span-2">
            <div className="flex items-center mb-6">
              <span className="text-xl font-bold">
                <span className="text-white">Freelance</span>
                <span className="text-[#FF6B00]">Nest</span>
              </span>
            </div>
            <p className="text-[#ffeee3] mb-6 leading-relaxed">
              The world's largest freelancing marketplace. Connect with top talent and find amazing opportunities.
            </p>
            
            {/* Contact Info */}
            <div className="space-y-3">
              <div className="flex items-center text-[#ffeee3]">
                <Mail className="w-5 h-5 mr-3" />
                <span>freelancenestteam@gmail.com</span>
              </div>
              <div className="flex items-center text-[#ffeee3]">
                <Phone className="w-5 h-5 mr-3" />
                <span>+92 316 3028236</span>
              </div>
              <div className="flex items-center text-[#ffeee3]">
                <MapPin className="w-5 h-5 mr-3" />
                <span>Islamabad, Pakistan</span>
              </div>
            </div>
          </div>

          {/* For Clients */}
          <div>
            <h3 className="font-semibold text-lg mb-4 text-[#FF6B00]">For Clients</h3>
            <ul className="space-y-3">
              {footerLinks['For Clients'].map((link: any) => (
                <li key={link.label}>
                  <Link
                    to={link.href}
                    className="text-[#ffeee3] hover:text-[#FF6B00] transition-colors duration-200"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* For Freelancers */}
          <div>
            <h3 className="font-semibold text-lg mb-4 text-[#FF6B00]">For Freelancers</h3>
            <ul className="space-y-3">
              {footerLinks['For Freelancers'].map((link: any) => (
                <li key={link.label}>
                  <Link
                    to={link.href}
                    className="text-[#ffeee3] hover:text-[#FF6B00] transition-colors duration-200"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Support - Centered between Freelancers and Company */}
          <div>
            <h3 className="font-semibold text-lg mb-4 text-[#FF6B00]">Support</h3>
            <ul className="space-y-3">
              {footerLinks['Support'].map((link: any) => (
                <li key={link.label}>
                  <Link
                    to={link.href}
                    className="text-[#ffeee3] hover:text-[#FF6B00] transition-colors duration-200"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="font-semibold text-lg mb-4 text-[#FF6B00]">Company</h3>
            <ul className="space-y-3">
              {footerLinks['Company'].map((link: any) => (
                <li key={link.label}>
                  <Link
                    to={link.href}
                    className="text-[#ffeee3] hover:text-[#FF6B00] transition-colors duration-200"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Newsletter Signup */}
        <div className="mt-12 pt-8 border-t border-[#FF9F45]">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            <div>
              <h3 className="text-xl font-semibold mb-2 text-[#FF6B00]">Stay Updated</h3>
              <p className="text-[#ffeee3]">
                Get the latest news, tips, and exclusive offers delivered to your inbox.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-4">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-3 bg-[#2E2E2E] border border-[#FF9F45] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF6B00] text-white placeholder-[#ffeee3]"
              />
              <button className="bg-[#FF6B00] text-white font-semibold rounded-lg px-8 py-3.5 shadow-lg hover:bg-[#FF9F45] transition-all duration-300">
                Subscribe
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Footer */}
      <div className="border-t border-[#FF9F45]">
        <div className="section-container py-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            {/* Copyright */}
            <div className="text-[#ffeee3] text-sm">
              @<span className="text-white">Freelance</span><span className="text-[#FF6B00]">Nest</span> 2025. All rights reserved.
            </div>

            {/* Legal Links */}
            <div className="flex items-center space-x-6 text-sm">
              <a href="#" className="text-[#ffeee3] hover:text-[#FF6B00] transition-colors duration-200">
                Privacy Policy
              </a>
              <a href="#" className="text-[#ffeee3] hover:text-[#FF6B00] transition-colors duration-200">
                Terms of Service
              </a>
              <a href="#" className="text-[#ffeee3] hover:text-[#FF6B00] transition-colors duration-200">
                Cookie Policy
              </a>
            </div>

            {/* Social Links */}
            <div className="flex items-center space-x-4">
              {socialLinks.map(({ icon: Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  className="w-10 h-10 bg-[#FF6B00] hover:bg-[#FF9F45] rounded-lg flex items-center justify-center transition-colors duration-200"
                >
                  <Icon className="w-5 h-5 text-white" />
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
