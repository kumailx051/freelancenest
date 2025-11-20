import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Package, Plus, Check, Star, Clock, PenTool } from 'lucide-react';

const ServicePackagesPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'overview' | 'create' | 'analytics'>('overview');

  // Sample service packages
  const servicePackages = [
    {
      id: 1,
      title: 'Professional Website Design',
      description: 'Custom website design with modern UI/UX principles. Includes responsive layouts and brand integration.',
      image: 'https://images.unsplash.com/photo-1499951360447-b19be8fe80f5?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
      tiers: [
        {
          name: 'Basic',
          price: 399,
          deliveryDays: 7,
          features: [
            '3 Page Design',
            'Responsive Layout',
            '1 Revision Round',
            'Source Files'
          ]
        },
        {
          name: 'Standard',
          price: 699,
          deliveryDays: 10,
          features: [
            '5 Page Design',
            'Responsive Layout',
            '3 Revision Rounds',
            'Source Files',
            'Interactive Elements'
          ]
        },
        {
          name: 'Premium',
          price: 999,
          deliveryDays: 14,
          features: [
            '8 Page Design',
            'Responsive Layout',
            'Unlimited Revisions',
            'Source Files',
            'Interactive Elements',
            'SEO Optimization',
            '30 Days Support'
          ]
        }
      ],
      rating: 4.9,
      reviews: 128,
      orders: 214
    },
    {
      id: 2,
      title: 'Logo Design Package',
      description: 'Professional logo design with brand guidelines and multiple formats for all your branding needs.',
      image: 'https://images.unsplash.com/photo-1558655146-d09347e92766?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
      tiers: [
        {
          name: 'Basic',
          price: 199,
          deliveryDays: 3,
          features: [
            '2 Logo Concepts',
            '1 Revision Round',
            'JPG & PNG Files'
          ]
        },
        {
          name: 'Standard',
          price: 299,
          deliveryDays: 5,
          features: [
            '4 Logo Concepts',
            '3 Revision Rounds',
            'All File Formats',
            'Brand Guidelines'
          ]
        },
        {
          name: 'Premium',
          price: 499,
          deliveryDays: 7,
          features: [
            '8 Logo Concepts',
            'Unlimited Revisions',
            'All File Formats',
            'Brand Guidelines',
            'Social Media Kit',
            'Business Card Design'
          ]
        }
      ],
      rating: 4.8,
      reviews: 94,
      orders: 167
    }
  ];

  return (
    <div className="min-h-screen bg-[#ffeee3]">
      {/* Hero Section */}
      <section className="pt-40 pb-16 bg-gradient-to-r from-primary-500 to-purple-600">
        <div className="section-container">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">Service Packages</h1>
            <p className="text-xl text-[#ffeee3] mb-8">
              Create pre-defined service offerings with transparent pricing and deliverables
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={() => setActiveTab('create')}
                className="bg-white text-[#FF6B00] hover:bg-[#ffeee3] font-medium px-6 py-3 rounded-lg transition-colors duration-200 flex items-center justify-center"
              >
                <Plus className="h-5 w-5 mr-2" />
                Create New Package
              </button>
              <button
                onClick={() => setActiveTab('analytics')}
                className="bg-transparent border border-white text-white hover:bg-white/10 font-medium px-6 py-3 rounded-lg transition-colors duration-200"
              >
                View Analytics
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16">
        <div className="section-container">
          {/* Tabs */}
          <div className="flex justify-center mb-12">
            <div className="inline-flex bg-white p-1 rounded-lg shadow-sm">
              <button
                onClick={() => setActiveTab('overview')}
                className={`px-6 py-2 rounded-md font-medium ${
                  activeTab === 'overview'
                    ? 'bg-[#FF6B00] text-white'
                    : 'text-[#2E2E2E] hover:bg-[#ffeee3]'
                } transition-colors duration-200`}
              >
                My Packages
              </button>
              <button
                onClick={() => setActiveTab('create')}
                className={`px-6 py-2 rounded-md font-medium ${
                  activeTab === 'create'
                    ? 'bg-[#FF6B00] text-white'
                    : 'text-[#2E2E2E] hover:bg-[#ffeee3]'
                } transition-colors duration-200`}
              >
                Create Package
              </button>
              <button
                onClick={() => setActiveTab('analytics')}
                className={`px-6 py-2 rounded-md font-medium ${
                  activeTab === 'analytics'
                    ? 'bg-[#FF6B00] text-white'
                    : 'text-[#2E2E2E] hover:bg-[#ffeee3]'
                } transition-colors duration-200`}
              >
                Analytics
              </button>
            </div>
          </div>

          {/* Tab Content */}
          {activeTab === 'overview' && (
            <div>
              <div className="max-w-5xl mx-auto mb-12">
                <div className="flex justify-between items-center mb-8">
                  <h2 className="text-2xl font-bold">Your Service Packages</h2>
                  <div className="flex gap-3">
                    <select className="border border-[#ffeee3] rounded-lg py-2 px-3 bg-white text-[#2E2E2E]">
                      <option>Sort by: Newest</option>
                      <option>Sort by: Most Popular</option>
                      <option>Sort by: Highest Rated</option>
                      <option>Sort by: Most Revenue</option>
                    </select>
                    <button
                      onClick={() => setActiveTab('create')}
                      className="bg-[#FF6B00] text-white hover:bg-[#2E2E2E] font-medium px-4 py-2 rounded-lg transition-colors duration-200 flex items-center"
                    >
                      <Plus className="h-4 w-4 mr-1" />
                      New
                    </button>
                  </div>
                </div>

                {/* Package Cards */}
                <div className="space-y-8">
                  {servicePackages.map(pkg => (
                    <div key={pkg.id} className="bg-white rounded-xl shadow-sm overflow-hidden">
                      <div className="md:flex">
                        {/* Package Image */}
                        <div className="md:w-1/4 h-48 md:h-auto relative">
                          <img 
                            src={pkg.image}
                            alt={pkg.title}
                            className="absolute w-full h-full object-cover"
                          />
                        </div>

                        {/* Package Info */}
                        <div className="p-6 md:w-3/4">
                          <div className="flex justify-between items-start mb-2">
                            <div>
                              <h3 className="text-xl font-bold text-[#2E2E2E]">{pkg.title}</h3>
                              <div className="flex items-center mt-1">
                                <Star className="w-4 h-4 text-[#FF9F45] fill-yellow-400" />
                                <span className="text-sm text-[#2E2E2E] ml-1">{pkg.rating}</span>
                                <span className="text-sm text-[#ffeee3] ml-1">({pkg.reviews} reviews)</span>
                                <span className="text-sm text-[#ffeee3] mx-2">â€¢</span>
                                <span className="text-sm text-[#ffeee3]">{pkg.orders} orders completed</span>
                              </div>
                            </div>
                            <div className="flex space-x-2">
                              <button className="p-2 text-[#ffeee3] hover:text-[#FF6B00] rounded-full hover:bg-[#ffeee3]">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                                </svg>
                              </button>
                              <button className="p-2 text-[#ffeee3] hover:text-[#FF6B00] rounded-full hover:bg-[#ffeee3]">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                                </svg>
                              </button>
                              <button className="p-2 text-[#ffeee3] hover:text-[#FF6B00] rounded-full hover:bg-[#ffeee3]">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                </svg>
                              </button>
                            </div>
                          </div>
                          
                          <p className="text-[#2E2E2E] mb-4">{pkg.description}</p>
                          
                          {/* Package Tiers */}
                          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
                            {pkg.tiers.map((tier, idx) => (
                              <div key={idx} className={`border ${idx === 1 ? 'border-[#ffeee3] bg-[#ffeee3]' : 'border-[#ffeee3]'} rounded-lg p-4`}>
                                <div className="flex justify-between items-center mb-2">
                                  <h4 className="font-semibold">{tier.name}</h4>
                                  {idx === 1 && (
                                    <span className="bg-[#ffeee3] text-[#2E2E2E] text-xs font-medium px-2.5 py-0.5 rounded-full">
                                      Popular
                                    </span>
                                  )}
                                </div>
                                <div className="text-2xl font-bold mb-2">${tier.price}</div>
                                <div className="text-sm text-[#ffeee3] mb-3 flex items-center">
                                  <Clock className="w-4 h-4 mr-1" />
                                  {tier.deliveryDays} days delivery
                                </div>
                                <ul className="space-y-1 mb-4">
                                  {tier.features.map((feature, i) => (
                                    <li key={i} className="text-sm flex items-start">
                                      <Check className="w-4 h-4 text-[#FF6B00] mr-2 shrink-0 mt-0.5" />
                                      <span>{feature}</span>
                                    </li>
                                  ))}
                                </ul>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {activeTab === 'create' && (
            <div className="max-w-4xl mx-auto">
              <div className="bg-white p-8 rounded-xl shadow-sm">
                <h2 className="text-2xl font-bold mb-6">Create New Service Package</h2>
                
                <form>
                  <div className="mb-6">
                    <label htmlFor="package-title" className="block text-[#2E2E2E] font-medium mb-2">Package Title*</label>
                    <input
                      type="text"
                      id="package-title"
                      placeholder="E.g. Professional Logo Design, WordPress Website Development"
                      className="w-full px-4 py-3 border border-[#ffeee3] rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                    />
                  </div>
                  
                  <div className="mb-6">
                    <label htmlFor="package-description" className="block text-[#2E2E2E] font-medium mb-2">Package Description*</label>
                    <textarea
                      id="package-description"
                      rows={4}
                      placeholder="Describe your service package in detail. What will clients receive? What makes your service unique?"
                      className="w-full px-4 py-3 border border-[#ffeee3] rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                    ></textarea>
                  </div>
                  
                  <div className="mb-6">
                    <label className="block text-[#2E2E2E] font-medium mb-2">Select Category*</label>
                    <select className="w-full px-4 py-3 border border-[#ffeee3] rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 bg-white">
                      <option>Graphic Design</option>
                      <option>Web Development</option>
                      <option>Content Writing</option>
                      <option>Digital Marketing</option>
                      <option>Video Editing</option>
                      <option>Voice Over</option>
                      <option>Translation</option>
                      <option>Data Entry</option>
                    </select>
                  </div>
                  
                  <div className="mb-6">
                    <label className="block text-[#2E2E2E] font-medium mb-2">Package Image*</label>
                    <div className="border-2 border-dashed border-[#ffeee3] rounded-lg p-8 text-center">
                      <div className="mb-4">
                        <svg xmlns="http://www.w3.org/2000/svg" className="mx-auto h-12 w-12 text-[#ffeee3]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                      </div>
                      <p className="text-[#ffeee3] mb-2">Drag and drop an image here, or click to browse</p>
                      <p className="text-[#ffeee3] text-sm">Recommended size: 1200 x 800px (JPG, PNG, GIF)</p>
                      <input type="file" className="hidden" />
                      <button className="mt-4 px-4 py-2 bg-[#ffeee3] hover:bg-[#ffeee3] text-[#2E2E2E] rounded-lg transition-colors duration-200">
                        Select Image
                      </button>
                    </div>
                  </div>
                  
                  <div className="mb-8">
                    <h3 className="text-xl font-bold mb-4">Package Tiers</h3>
                    <p className="text-[#2E2E2E] mb-6">Create up to 3 service tiers with different features and pricing</p>
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      {/* Basic Tier */}
                      <div className="border border-[#ffeee3] rounded-lg p-4">
                        <div className="mb-4">
                          <label className="block text-[#2E2E2E] font-medium mb-2">Basic Package Name</label>
                          <input
                            type="text"
                            defaultValue="Basic"
                            className="w-full px-3 py-2 border border-[#ffeee3] rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                          />
                        </div>
                        
                        <div className="mb-4">
                          <label className="block text-[#2E2E2E] font-medium mb-2">Price ($)*</label>
                          <input
                            type="number"
                            defaultValue="99"
                            className="w-full px-3 py-2 border border-[#ffeee3] rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                          />
                        </div>
                        
                        <div className="mb-4">
                          <label className="block text-[#2E2E2E] font-medium mb-2">Delivery Time (days)*</label>
                          <input
                            type="number"
                            defaultValue="3"
                            className="w-full px-3 py-2 border border-[#ffeee3] rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                          />
                        </div>
                        
                        <div>
                          <label className="block text-[#2E2E2E] font-medium mb-2">Features</label>
                          <div className="space-y-2">
                            <div className="flex items-center">
                              <input
                                type="text"
                                placeholder="Add a feature"
                                className="w-full px-3 py-2 border border-[#ffeee3] rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                              />
                              <button className="ml-2 p-2 bg-[#ffeee3] text-[#FF6B00] rounded-lg">
                                <Plus className="h-4 w-4" />
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                      
                      {/* Standard Tier */}
                      <div className="border-2 border-[#ffeee3] rounded-lg p-4 bg-[#ffeee3] relative">
                        <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-[#FF6B00] text-white text-xs px-3 py-1 rounded-full">
                          Recommended
                        </div>
                        
                        <div className="mb-4">
                          <label className="block text-[#2E2E2E] font-medium mb-2">Standard Package Name</label>
                          <input
                            type="text"
                            defaultValue="Standard"
                            className="w-full px-3 py-2 border border-[#ffeee3] rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                          />
                        </div>
                        
                        <div className="mb-4">
                          <label className="block text-[#2E2E2E] font-medium mb-2">Price ($)*</label>
                          <input
                            type="number"
                            defaultValue="199"
                            className="w-full px-3 py-2 border border-[#ffeee3] rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                          />
                        </div>
                        
                        <div className="mb-4">
                          <label className="block text-[#2E2E2E] font-medium mb-2">Delivery Time (days)*</label>
                          <input
                            type="number"
                            defaultValue="5"
                            className="w-full px-3 py-2 border border-[#ffeee3] rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                          />
                        </div>
                        
                        <div>
                          <label className="block text-[#2E2E2E] font-medium mb-2">Features</label>
                          <div className="space-y-2">
                            <div className="flex items-center">
                              <input
                                type="text"
                                placeholder="Add a feature"
                                className="w-full px-3 py-2 border border-[#ffeee3] rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                              />
                              <button className="ml-2 p-2 bg-[#ffeee3] text-[#FF6B00] rounded-lg">
                                <Plus className="h-4 w-4" />
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                      
                      {/* Premium Tier */}
                      <div className="border border-[#ffeee3] rounded-lg p-4">
                        <div className="mb-4">
                          <label className="block text-[#2E2E2E] font-medium mb-2">Premium Package Name</label>
                          <input
                            type="text"
                            defaultValue="Premium"
                            className="w-full px-3 py-2 border border-[#ffeee3] rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                          />
                        </div>
                        
                        <div className="mb-4">
                          <label className="block text-[#2E2E2E] font-medium mb-2">Price ($)*</label>
                          <input
                            type="number"
                            defaultValue="299"
                            className="w-full px-3 py-2 border border-[#ffeee3] rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                          />
                        </div>
                        
                        <div className="mb-4">
                          <label className="block text-[#2E2E2E] font-medium mb-2">Delivery Time (days)*</label>
                          <input
                            type="number"
                            defaultValue="7"
                            className="w-full px-3 py-2 border border-[#ffeee3] rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                          />
                        </div>
                        
                        <div>
                          <label className="block text-[#2E2E2E] font-medium mb-2">Features</label>
                          <div className="space-y-2">
                            <div className="flex items-center">
                              <input
                                type="text"
                                placeholder="Add a feature"
                                className="w-full px-3 py-2 border border-[#ffeee3] rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                              />
                              <button className="ml-2 p-2 bg-[#ffeee3] text-[#FF6B00] rounded-lg">
                                <Plus className="h-4 w-4" />
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="border-t border-[#ffeee3] pt-6 flex justify-end">
                    <button
                      type="button"
                      className="bg-[#ffeee3] text-[#2E2E2E] hover:bg-[#ffeee3] font-medium px-6 py-3 rounded-lg transition-colors duration-200 mr-4"
                    >
                      Save as Draft
                    </button>
                    <button
                      type="submit"
                      className="bg-[#FF6B00] text-white hover:bg-[#2E2E2E] font-medium px-6 py-3 rounded-lg transition-colors duration-200"
                    >
                      Publish Package
                    </button>
                  </div>
                </form>
              </div>
            </div>
          )}

          {activeTab === 'analytics' && (
            <div className="max-w-5xl mx-auto">
              <div className="bg-white p-8 rounded-xl shadow-sm mb-8">
                <h2 className="text-2xl font-bold mb-6">Package Performance Overview</h2>
                
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                  <div className="bg-[#ffeee3] p-6 rounded-lg">
                    <div className="text-lg font-semibold text-[#ffeee3]">Total Orders</div>
                    <div className="text-3xl font-bold">381</div>
                    <div className="text-sm text-[#FF6B00] mt-2 flex items-center">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
                      </svg>
                      12.5% from last month
                    </div>
                  </div>
                  
                  <div className="bg-[#ffeee3] p-6 rounded-lg">
                    <div className="text-lg font-semibold text-[#ffeee3]">Total Revenue</div>
                    <div className="text-3xl font-bold">$27,495</div>
                    <div className="text-sm text-[#FF6B00] mt-2 flex items-center">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
                      </svg>
                      8.3% from last month
                    </div>
                  </div>
                  
                  <div className="bg-[#ffeee3] p-6 rounded-lg">
                    <div className="text-lg font-semibold text-[#ffeee3]">Avg. Order Value</div>
                    <div className="text-3xl font-bold">$72.16</div>
                    <div className="text-sm text-[#FF6B00] mt-2 flex items-center">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                      </svg>
                      3.2% from last month
                    </div>
                  </div>
                  
                  <div className="bg-[#ffeee3] p-6 rounded-lg">
                    <div className="text-lg font-semibold text-[#ffeee3]">Avg. Rating</div>
                    <div className="text-3xl font-bold">4.8</div>
                    <div className="text-sm text-[#FF6B00] mt-2 flex items-center">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
                      </svg>
                      0.2 from last month
                    </div>
                  </div>
                </div>
                
                <div className="mt-8">
                  <h3 className="text-lg font-semibold mb-4">Monthly Revenue</h3>
                  <div className="h-64 bg-[#ffeee3] rounded-lg flex items-center justify-center">
                    <p className="text-[#ffeee3]">Revenue chart would appear here</p>
                  </div>
                </div>
              </div>
              
              <div className="bg-white p-8 rounded-xl shadow-sm">
                <h3 className="text-xl font-bold mb-6">Top Performing Packages</h3>
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead>
                      <tr>
                        <th className="px-6 py-3 bg-[#ffeee3] text-left text-xs font-medium text-[#ffeee3] uppercase tracking-wider">Package</th>
                        <th className="px-6 py-3 bg-[#ffeee3] text-left text-xs font-medium text-[#ffeee3] uppercase tracking-wider">Orders</th>
                        <th className="px-6 py-3 bg-[#ffeee3] text-left text-xs font-medium text-[#ffeee3] uppercase tracking-wider">Revenue</th>
                        <th className="px-6 py-3 bg-[#ffeee3] text-left text-xs font-medium text-[#ffeee3] uppercase tracking-wider">Rating</th>
                        <th className="px-6 py-3 bg-[#ffeee3] text-left text-xs font-medium text-[#ffeee3] uppercase tracking-wider">Conversion Rate</th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      <tr>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <div className="h-10 w-10 flex-shrink-0 bg-[#ffeee3] rounded">
                              <PenTool className="w-full h-full text-[#2E2E2E] p-2" />
                            </div>
                            <div className="ml-4">
                              <div className="text-sm font-medium text-[#2E2E2E]">Logo Design Package</div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-[#2E2E2E]">167</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-[#2E2E2E]">$14,286</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <span className="text-sm text-[#2E2E2E] mr-1">4.8</span>
                            <Star className="w-4 h-4 text-[#FF9F45] fill-yellow-400" />
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-[#2E2E2E]">36.4%</div>
                        </td>
                      </tr>
                      <tr>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <div className="h-10 w-10 flex-shrink-0 bg-[#ffeee3] rounded">
                              <svg xmlns="http://www.w3.org/2000/svg" className="w-full h-full text-[#2E2E2E] p-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
                              </svg>
                            </div>
                            <div className="ml-4">
                              <div className="text-sm font-medium text-[#2E2E2E]">Professional Website Design</div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-[#2E2E2E]">214</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-[#2E2E2E]">$13,209</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <span className="text-sm text-[#2E2E2E] mr-1">4.9</span>
                            <Star className="w-4 h-4 text-[#FF9F45] fill-yellow-400" />
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-[#2E2E2E]">29.8%</div>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Tips Section */}
      <section className="py-16 bg-[#ffeee3]">
        <div className="section-container">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl font-bold text-center mb-8">Tips for Creating Successful Service Packages</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-white p-6 rounded-xl shadow-sm">
                <div className="text-[#FF6B00] mb-4">
                  <Package className="h-10 w-10" />
                </div>
                <h3 className="text-lg font-bold mb-2">Clear Deliverables</h3>
                <p className="text-[#2E2E2E]">
                  Be specific about what clients will receive in each tier. Well-defined deliverables set clear expectations and reduce scope creep.
                </p>
              </div>
              <div className="bg-white p-6 rounded-xl shadow-sm">
                <div className="text-[#FF6B00] mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
                  </svg>
                </div>
                <h3 className="text-lg font-bold mb-2">Strategic Pricing</h3>
                <p className="text-[#2E2E2E]">
                  Price your packages competitively while ensuring profitability. Make your middle tier the most attractive with the best value proposition.
                </p>
              </div>
              <div className="bg-white p-6 rounded-xl shadow-sm">
                <div className="text-[#FF6B00] mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                </div>
                <h3 className="text-lg font-bold mb-2">Quality Visuals</h3>
                <p className="text-[#2E2E2E]">
                  Use high-quality images and portfolio samples that showcase your work. Visual appeal can significantly increase your package's conversion rate.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-[#FF6B00] text-white">
        <div className="section-container">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-6">Ready to Showcase Your Services?</h2>
            <p className="text-xl opacity-90 mb-8">
              Create a compelling service package today and start attracting new clients to your freelance business.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={() => setActiveTab('create')}
                className="bg-white text-[#FF6B00] hover:bg-[#ffeee3] font-medium px-8 py-4 rounded-lg text-lg transition-colors duration-200 flex items-center justify-center"
              >
                <Plus className="h-5 w-5 mr-2" />
                Create Your First Package
              </button>
              <Link to="/ways-to-earn" className="bg-transparent border border-white text-white hover:bg-white/10 font-medium px-8 py-4 rounded-lg text-lg transition-colors duration-200 inline-block">
                Explore More Ways to Earn
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ServicePackagesPage;














