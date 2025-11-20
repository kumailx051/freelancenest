import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const CreateEditGig: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEditing = Boolean(id);
  
  const [currentStep, setCurrentStep] = useState(1);
  const [gigData, setGigData] = useState({
    title: '',
    category: '',
    subcategory: '',
    searchTags: [] as string[],
    description: '',
    packages: {
      basic: { title: '', description: '', price: '', delivery: '', revisions: '', features: [] as string[] },
      standard: { title: '', description: '', price: '', delivery: '', revisions: '', features: [] as string[] },
      premium: { title: '', description: '', price: '', delivery: '', revisions: '', features: [] as string[] }
    },
    gallery: [] as string[],
    faqs: [] as { question: string; answer: string }[],
    requirements: [] as { question: string; type: string; required: boolean }[],
    extras: [] as { title: string; description: string; price: string; delivery: string }[]
  });

  const categories = [
    { id: 'programming', name: 'Programming & Tech', subcategories: ['Website Development', 'Mobile Apps', 'Desktop Applications', 'APIs & Integrations'] },
    { id: 'design', name: 'Graphics & Design', subcategories: ['Logo Design', 'Web Design', 'UI/UX Design', 'Print Design'] },
    { id: 'marketing', name: 'Digital Marketing', subcategories: ['Social Media Marketing', 'SEO', 'Content Marketing', 'Email Marketing'] },
    { id: 'writing', name: 'Writing & Translation', subcategories: ['Content Writing', 'Copywriting', 'Technical Writing', 'Translation'] },
    { id: 'video', name: 'Video & Animation', subcategories: ['Video Editing', 'Animation', 'Whiteboard Videos', 'Intro Videos'] }
  ];

  const steps = [
    { number: 1, title: 'Gig Overview', description: 'Tell us about your service' },
    { number: 2, title: 'Pricing & Packages', description: 'Set your pricing structure' },
    { number: 3, title: 'Description & FAQ', description: 'Describe your service in detail' },
    { number: 4, title: 'Requirements & Extras', description: 'What do you need from buyers?' },
    { number: 5, title: 'Gallery & Media', description: 'Showcase your work' },
    { number: 6, title: 'Publish', description: 'Review and publish your gig' }
  ];

  const handleNext = () => {
    if (currentStep < 6) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSave = (asDraft = false) => {
    console.log('Saving gig...', { gigData, asDraft });
    // Save logic here
  };

  const handlePublish = () => {
    console.log('Publishing gig...', gigData);
    // Publish logic here
    navigate('/freelancer/gigs');
  };

  const addTag = (tag: string) => {
    if (tag && !gigData.searchTags.includes(tag)) {
      setGigData({
        ...gigData,
        searchTags: [...gigData.searchTags, tag]
      });
    }
  };

  const removeTag = (tagToRemove: string) => {
    setGigData({
      ...gigData,
      searchTags: gigData.searchTags.filter(tag => tag !== tagToRemove)
    });
  };

  const addFAQ = () => {
    setGigData({
      ...gigData,
      faqs: [...gigData.faqs, { question: '', answer: '' }]
    });
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-[#2E2E2E] mb-2">
                {isEditing ? 'Edit Gig' : 'Create New Gig'}
              </h1>
              <p className="text-gray-600">
                {isEditing ? 'Update your service offering' : 'Create a service to offer your skills'}
              </p>
            </div>
            <div className="flex items-center gap-4">
              <button 
                onClick={() => handleSave(true)}
                className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Save as Draft
              </button>
              <button 
                onClick={() => navigate('/freelancer/gigs')}
                className="px-4 py-2 text-[#FF6B00] hover:underline"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>

        {/* Progress Steps */}
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 mb-8">
          <div className="flex items-center justify-between">
            {steps.map((step, index) => (
              <div key={step.number} className="flex items-center">
                <div className={`flex items-center gap-3 ${index < steps.length - 1 ? 'mr-4' : ''}`}>
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold ${
                    currentStep >= step.number 
                      ? 'bg-[#FF6B00] text-white' 
                      : 'bg-gray-200 text-gray-600'
                  }`}>
                    {step.number}
                  </div>
                  <div className="hidden sm:block">
                    <div className={`font-medium ${
                      currentStep >= step.number ? 'text-[#FF6B00]' : 'text-gray-600'
                    }`}>
                      {step.title}
                    </div>
                    <div className="text-xs text-gray-500">{step.description}</div>
                  </div>
                </div>
                {index < steps.length - 1 && (
                  <div className={`hidden sm:block w-8 h-px mx-4 ${
                    currentStep > step.number ? 'bg-[#FF6B00]' : 'bg-gray-200'
                  }`}></div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Step Content */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100">
          {/* Step 1: Gig Overview */}
          {currentStep === 1 && (
            <div className="p-6">
              <h3 className="text-xl font-semibold text-[#2E2E2E] mb-6">Gig Overview</h3>
              
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-[#2E2E2E] mb-2">
                    Gig Title *
                  </label>
                  <input
                    type="text"
                    value={gigData.title}
                    onChange={(e) => setGigData({...gigData, title: e.target.value})}
                    placeholder="I will..."
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FF6B00] focus:border-transparent"
                    maxLength={80}
                  />
                  <p className="text-xs text-gray-500 mt-1">{gigData.title.length}/80 characters</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-[#2E2E2E] mb-2">
                      Category *
                    </label>
                    <select
                      value={gigData.category}
                      onChange={(e) => setGigData({...gigData, category: e.target.value, subcategory: ''})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FF6B00] focus:border-transparent"
                    >
                      <option value="">Select a category</option>
                      {categories.map((cat) => (
                        <option key={cat.id} value={cat.id}>{cat.name}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-[#2E2E2E] mb-2">
                      Subcategory *
                    </label>
                    <select
                      value={gigData.subcategory}
                      onChange={(e) => setGigData({...gigData, subcategory: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FF6B00] focus:border-transparent"
                      disabled={!gigData.category}
                    >
                      <option value="">Select a subcategory</option>
                      {gigData.category && categories.find(c => c.id === gigData.category)?.subcategories.map((sub) => (
                        <option key={sub} value={sub}>{sub}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-[#2E2E2E] mb-2">
                    Search Tags
                  </label>
                  <div className="flex flex-wrap gap-2 mb-2">
                    {gigData.searchTags.map((tag, index) => (
                      <span key={index} className="inline-flex items-center gap-1 px-3 py-1 bg-[#ffeee3] text-[#FF6B00] rounded-full text-sm">
                        {tag}
                        <button onClick={() => removeTag(tag)} className="hover:text-red-600">×</button>
                      </span>
                    ))}
                  </div>
                  <input
                    type="text"
                    placeholder="Add tags that describe your service"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FF6B00] focus:border-transparent"
                    onKeyPress={(e) => {
                      if (e.key === 'Enter') {
                        e.preventDefault();
                        addTag(e.currentTarget.value);
                        e.currentTarget.value = '';
                      }
                    }}
                  />
                  <p className="text-xs text-gray-500 mt-1">Press Enter to add tags. Maximum 5 tags.</p>
                </div>
              </div>
            </div>
          )}

          {/* Step 2: Pricing & Packages */}
          {currentStep === 2 && (
            <div className="p-6">
              <h3 className="text-xl font-semibold text-[#2E2E2E] mb-6">Pricing & Packages</h3>
              
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {['basic', 'standard', 'premium'].map((packageType) => (
                  <div key={packageType} className="border border-gray-200 rounded-lg p-4">
                    <h4 className="text-lg font-semibold text-[#2E2E2E] mb-4 capitalize">
                      {packageType} Package
                    </h4>
                    
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-[#2E2E2E] mb-1">
                          Package Title
                        </label>
                        <input
                          type="text"
                          value={gigData.packages[packageType as keyof typeof gigData.packages].title}
                          onChange={(e) => setGigData({
                            ...gigData,
                            packages: {
                              ...gigData.packages,
                              [packageType]: {
                                ...gigData.packages[packageType as keyof typeof gigData.packages],
                                title: e.target.value
                              }
                            }
                          })}
                          placeholder="Name your package"
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FF6B00] focus:border-transparent text-sm"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-[#2E2E2E] mb-1">
                          Description
                        </label>
                        <textarea
                          value={gigData.packages[packageType as keyof typeof gigData.packages].description}
                          onChange={(e) => setGigData({
                            ...gigData,
                            packages: {
                              ...gigData.packages,
                              [packageType]: {
                                ...gigData.packages[packageType as keyof typeof gigData.packages],
                                description: e.target.value
                              }
                            }
                          })}
                          placeholder="Describe what's included"
                          rows={3}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FF6B00] focus:border-transparent text-sm"
                        />
                      </div>

                      <div className="grid grid-cols-2 gap-3">
                        <div>
                          <label className="block text-sm font-medium text-[#2E2E2E] mb-1">
                            Price ($)
                          </label>
                          <input
                            type="number"
                            value={gigData.packages[packageType as keyof typeof gigData.packages].price}
                            onChange={(e) => setGigData({
                              ...gigData,
                              packages: {
                                ...gigData.packages,
                                [packageType]: {
                                  ...gigData.packages[packageType as keyof typeof gigData.packages],
                                  price: e.target.value
                                }
                              }
                            })}
                            placeholder="0"
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FF6B00] focus:border-transparent text-sm"
                          />
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-[#2E2E2E] mb-1">
                            Delivery (days)
                          </label>
                          <input
                            type="number"
                            value={gigData.packages[packageType as keyof typeof gigData.packages].delivery}
                            onChange={(e) => setGigData({
                              ...gigData,
                              packages: {
                                ...gigData.packages,
                                [packageType]: {
                                  ...gigData.packages[packageType as keyof typeof gigData.packages],
                                  delivery: e.target.value
                                }
                              }
                            })}
                            placeholder="1"
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FF6B00] focus:border-transparent text-sm"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-[#2E2E2E] mb-1">
                          Revisions
                        </label>
                        <select
                          value={gigData.packages[packageType as keyof typeof gigData.packages].revisions}
                          onChange={(e) => setGigData({
                            ...gigData,
                            packages: {
                              ...gigData.packages,
                              [packageType]: {
                                ...gigData.packages[packageType as keyof typeof gigData.packages],
                                revisions: e.target.value
                              }
                            }
                          })}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FF6B00] focus:border-transparent text-sm"
                        >
                          <option value="">Select revisions</option>
                          <option value="1">1 Revision</option>
                          <option value="2">2 Revisions</option>
                          <option value="3">3 Revisions</option>
                          <option value="unlimited">Unlimited Revisions</option>
                        </select>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Step 3: Description & FAQ */}
          {currentStep === 3 && (
            <div className="p-6">
              <h3 className="text-xl font-semibold text-[#2E2E2E] mb-6">Description & FAQ</h3>
              
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-[#2E2E2E] mb-2">
                    Gig Description *
                  </label>
                  <textarea
                    value={gigData.description}
                    onChange={(e) => setGigData({...gigData, description: e.target.value})}
                    placeholder="Describe your service in detail..."
                    rows={8}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FF6B00] focus:border-transparent"
                  />
                  <p className="text-xs text-gray-500 mt-1">Minimum 120 characters required</p>
                </div>

                <div>
                  <div className="flex items-center justify-between mb-4">
                    <h4 className="text-lg font-semibold text-[#2E2E2E]">Frequently Asked Questions</h4>
                    <button 
                      onClick={addFAQ}
                      className="bg-[#FF6B00] text-white px-4 py-2 rounded-lg hover:bg-[#FF9F45] transition-colors"
                    >
                      Add FAQ
                    </button>
                  </div>
                  
                  <div className="space-y-4">
                    {gigData.faqs.map((faq, index) => (
                      <div key={index} className="border border-gray-200 rounded-lg p-4">
                        <div className="space-y-3">
                          <input
                            type="text"
                            placeholder="Question"
                            value={faq.question}
                            onChange={(e) => {
                              const newFaqs = [...gigData.faqs];
                              newFaqs[index].question = e.target.value;
                              setGigData({...gigData, faqs: newFaqs});
                            }}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FF6B00] focus:border-transparent"
                          />
                          <textarea
                            placeholder="Answer"
                            value={faq.answer}
                            onChange={(e) => {
                              const newFaqs = [...gigData.faqs];
                              newFaqs[index].answer = e.target.value;
                              setGigData({...gigData, faqs: newFaqs});
                            }}
                            rows={2}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FF6B00] focus:border-transparent"
                          />
                        </div>
                        <button 
                          onClick={() => {
                            const newFaqs = gigData.faqs.filter((_, i) => i !== index);
                            setGigData({...gigData, faqs: newFaqs});
                          }}
                          className="mt-2 text-red-600 hover:underline text-sm"
                        >
                          Remove FAQ
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Navigation Buttons */}
          <div className="px-6 py-4 border-t border-gray-100 flex items-center justify-between">
            <button 
              onClick={handlePrevious}
              disabled={currentStep === 1}
              className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Previous
            </button>
            
            <div className="flex items-center gap-4">
              {currentStep === 6 ? (
                <button 
                  onClick={handlePublish}
                  className="bg-[#FF6B00] text-white px-6 py-2 rounded-lg hover:bg-[#FF9F45] transition-colors"
                >
                  Publish Gig
                </button>
              ) : (
                <button 
                  onClick={handleNext}
                  className="bg-[#FF6B00] text-white px-4 py-2 rounded-lg hover:bg-[#FF9F45] transition-colors"
                >
                  Next
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateEditGig;
