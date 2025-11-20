import React, { useState } from 'react';

const ContractSetupPage: React.FC = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const totalSteps = 4;
  const [contractData, setContractData] = useState({
    freelancer: {
      name: 'John Smith',
      avatar: '/api/placeholder/50/50',
      rating: 4.9,
      reviews: 127
    },
    projectTitle: 'E-commerce Website Development',
    contractType: 'fixed',
    budget: 2500,
    milestones: [
      { title: 'Project Setup & Planning', amount: 500, description: 'Initial setup and project planning phase', dueDate: '2024-01-15' },
      { title: 'Frontend Development', amount: 1000, description: 'Complete frontend development with React', dueDate: '2024-01-30' },
      { title: 'Backend Development', amount: 700, description: 'Backend API development with Node.js', dueDate: '2024-02-10' },
      { title: 'Testing & Deployment', amount: 300, description: 'Final testing and deployment', dueDate: '2024-02-20' }
    ],
    startDate: '',
    endDate: '',
    terms: '',
    nda: false,
    revisions: 3,
    communicationPreference: 'platform'
  });

  const handleNext = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrev = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const addMilestone = () => {
    setContractData(prev => ({
      ...prev,
      milestones: [...prev.milestones, {
        title: '',
        amount: 0,
        description: '',
        dueDate: ''
      }]
    }));
  };

  const removeMilestone = (index: number) => {
    setContractData(prev => ({
      ...prev,
      milestones: prev.milestones.filter((_, i) => i !== index)
    }));
  };

  const updateMilestone = (index: number, field: string, value: any) => {
    setContractData(prev => ({
      ...prev,
      milestones: prev.milestones.map((milestone, i) => 
        i === index ? { ...milestone, [field]: value } : milestone
      )
    }));
  };

  return (
    <div className="min-h-screen bg-[#ffeee3]">
      {/* Hero Section */}
      <section className="pt-40 pb-16 bg-[#2E2E2E] text-white">
        <div className="section-container">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Contract Setup</h1>
            <p className="text-xl mb-8 text-[#ffeee3]">
              Set up your contract terms and milestones to ensure a smooth project collaboration.
            </p>
            
            {/* Progress Indicator */}
            <div className="flex justify-center items-center space-x-4 mb-8">
              {Array.from({ length: totalSteps }).map((_, index) => (
                <div key={index} className="flex items-center">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                    index + 1 <= currentStep ? 'bg-[#FF6B00] text-white' : 'bg-white/20 text-white/60'
                  }`}>
                    {index + 1}
                  </div>
                  {index < totalSteps - 1 && (
                    <div className={`w-12 h-0.5 ${
                      index + 1 < currentStep ? 'bg-[#FF6B00]' : 'bg-white/20'
                    }`}></div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Form Section */}
      <section className="py-16">
        <div className="section-container">
          <div className="max-w-4xl mx-auto">
            <div className="bg-white rounded-xl shadow-sm p-8 border border-[#ffeee3]">
              
              {/* Step 1: Contract Overview */}
              {currentStep === 1 && (
                <div>
                  <h2 className="text-2xl font-bold mb-6 text-[#2E2E2E]">Contract Overview</h2>
                  
                  {/* Freelancer Info */}
                  <div className="bg-[#ffeee3]/30 rounded-lg p-6 mb-6">
                    <h3 className="font-semibold text-[#2E2E2E] mb-4">Working with</h3>
                    <div className="flex items-center space-x-4">
                      <img
                        src={contractData.freelancer.avatar}
                        alt={contractData.freelancer.name}
                        className="w-16 h-16 rounded-full object-cover"
                      />
                      <div>
                        <h4 className="font-semibold text-[#2E2E2E] text-lg">{contractData.freelancer.name}</h4>
                        <div className="flex items-center space-x-1 text-sm">
                          <span className="font-medium text-[#2E2E2E]">{contractData.freelancer.rating}</span>
                          <div className="flex">
                            {[1,2,3,4,5].map((star) => (
                              <svg key={star} className="w-4 h-4 text-yellow-400 fill-current" viewBox="0 0 20 20">
                                <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z"/>
                              </svg>
                            ))}
                          </div>
                          <span className="text-[#2E2E2E]/60">({contractData.freelancer.reviews} reviews)</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="mb-6">
                    <label className="block text-sm font-medium text-[#2E2E2E] mb-2">
                      Project Title
                    </label>
                    <input
                      type="text"
                      className="w-full px-4 py-3 border border-[#ffeee3] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF6B00] focus:border-transparent"
                      value={contractData.projectTitle}
                      onChange={(e) => setContractData({...contractData, projectTitle: e.target.value})}
                    />
                  </div>

                  <div className="mb-6">
                    <label className="block text-sm font-medium text-[#2E2E2E] mb-4">Contract Type</label>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <button
                        onClick={() => setContractData({...contractData, contractType: 'fixed'})}
                        className={`p-6 rounded-lg border-2 text-left transition-colors ${
                          contractData.contractType === 'fixed'
                            ? 'border-[#FF6B00] bg-[#ffeee3]/30'
                            : 'border-[#ffeee3] hover:border-[#FF6B00]'
                        }`}
                      >
                        <h3 className="font-semibold text-[#2E2E2E] mb-2">Fixed Price</h3>
                        <p className="text-sm text-[#2E2E2E]/80">Pay a fixed amount for the entire project with defined milestones</p>
                      </button>
                      
                      <button
                        onClick={() => setContractData({...contractData, contractType: 'hourly'})}
                        className={`p-6 rounded-lg border-2 text-left transition-colors ${
                          contractData.contractType === 'hourly'
                            ? 'border-[#FF6B00] bg-[#ffeee3]/30'
                            : 'border-[#ffeee3] hover:border-[#FF6B00]'
                        }`}
                      >
                        <h3 className="font-semibold text-[#2E2E2E] mb-2">Hourly Rate</h3>
                        <p className="text-sm text-[#2E2E2E]/80">Pay based on hours worked with time tracking</p>
                      </button>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-[#2E2E2E] mb-2">
                        Project Start Date
                      </label>
                      <input
                        type="date"
                        className="w-full px-4 py-3 border border-[#ffeee3] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF6B00] focus:border-transparent"
                        value={contractData.startDate}
                        onChange={(e) => setContractData({...contractData, startDate: e.target.value})}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-[#2E2E2E] mb-2">
                        Expected End Date
                      </label>
                      <input
                        type="date"
                        className="w-full px-4 py-3 border border-[#ffeee3] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF6B00] focus:border-transparent"
                        value={contractData.endDate}
                        onChange={(e) => setContractData({...contractData, endDate: e.target.value})}
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* Step 2: Milestones */}
              {currentStep === 2 && (
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="text-2xl font-bold text-[#2E2E2E]">Project Milestones</h2>
                    <button
                      onClick={addMilestone}
                      className="bg-[#FF6B00] hover:bg-[#FF9F45] text-white px-4 py-2 rounded-lg font-medium transition-colors"
                    >
                      Add Milestone
                    </button>
                  </div>
                  
                  <p className="text-[#2E2E2E]/80 mb-8">
                    Break down your project into manageable milestones with clear deliverables and payment amounts.
                  </p>

                  <div className="space-y-6">
                    {contractData.milestones.map((milestone, index) => (
                      <div key={index} className="border border-[#ffeee3] rounded-lg p-6">
                        <div className="flex items-center justify-between mb-4">
                          <h3 className="font-semibold text-[#2E2E2E]">Milestone {index + 1}</h3>
                          {contractData.milestones.length > 1 && (
                            <button
                              onClick={() => removeMilestone(index)}
                              className="text-red-500 hover:text-red-700"
                            >
                              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                              </svg>
                            </button>
                          )}
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                          <div>
                            <label className="block text-sm font-medium text-[#2E2E2E] mb-2">
                              Milestone Title
                            </label>
                            <input
                              type="text"
                              className="w-full px-4 py-3 border border-[#ffeee3] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF6B00] focus:border-transparent"
                              value={milestone.title}
                              onChange={(e) => updateMilestone(index, 'title', e.target.value)}
                              placeholder="e.g., Project Setup & Planning"
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-[#2E2E2E] mb-2">
                              Payment Amount ($)
                            </label>
                            <input
                              type="number"
                              className="w-full px-4 py-3 border border-[#ffeee3] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF6B00] focus:border-transparent"
                              value={milestone.amount}
                              onChange={(e) => updateMilestone(index, 'amount', parseFloat(e.target.value))}
                              placeholder="500"
                            />
                          </div>
                        </div>

                        <div className="mb-4">
                          <label className="block text-sm font-medium text-[#2E2E2E] mb-2">
                            Description
                          </label>
                          <textarea
                            className="w-full px-4 py-3 border border-[#ffeee3] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF6B00] focus:border-transparent"
                            rows={3}
                            value={milestone.description}
                            onChange={(e) => updateMilestone(index, 'description', e.target.value)}
                            placeholder="Describe what will be delivered in this milestone"
                          />
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-[#2E2E2E] mb-2">
                            Due Date
                          </label>
                          <input
                            type="date"
                            className="w-full px-4 py-3 border border-[#ffeee3] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF6B00] focus:border-transparent"
                            value={milestone.dueDate}
                            onChange={(e) => updateMilestone(index, 'dueDate', e.target.value)}
                          />
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="mt-6 p-4 bg-[#ffeee3]/50 rounded-lg">
                    <div className="flex justify-between items-center">
                      <span className="font-semibold text-[#2E2E2E]">Total Project Value:</span>
                      <span className="text-2xl font-bold text-[#FF6B00]">
                        ${contractData.milestones.reduce((sum, milestone) => sum + (milestone.amount || 0), 0)}
                      </span>
                    </div>
                  </div>
                </div>
              )}

              {/* Step 3: Terms & Conditions */}
              {currentStep === 3 && (
                <div>
                  <h2 className="text-2xl font-bold mb-6 text-[#2E2E2E]">Terms & Conditions</h2>
                  
                  <div className="space-y-6">
                    <div>
                      <label className="block text-sm font-medium text-[#2E2E2E] mb-2">
                        Additional Terms & Requirements
                      </label>
                      <textarea
                        className="w-full px-4 py-3 border border-[#ffeee3] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF6B00] focus:border-transparent"
                        rows={6}
                        value={contractData.terms}
                        onChange={(e) => setContractData({...contractData, terms: e.target.value})}
                        placeholder="Add any specific terms, requirements, or conditions for this project..."
                      />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-[#2E2E2E] mb-2">
                          Number of Revisions Included
                        </label>
                        <select
                          className="w-full px-4 py-3 border border-[#ffeee3] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF6B00] focus:border-transparent"
                          value={contractData.revisions}
                          onChange={(e) => setContractData({...contractData, revisions: parseInt(e.target.value)})}
                        >
                          <option value={1}>1 Revision</option>
                          <option value={2}>2 Revisions</option>
                          <option value={3}>3 Revisions</option>
                          <option value={5}>5 Revisions</option>
                          <option value={-1}>Unlimited Revisions</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-[#2E2E2E] mb-2">
                          Communication Preference
                        </label>
                        <select
                          className="w-full px-4 py-3 border border-[#ffeee3] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF6B00] focus:border-transparent"
                          value={contractData.communicationPreference}
                          onChange={(e) => setContractData({...contractData, communicationPreference: e.target.value})}
                        >
                          <option value="platform">Through Platform Only</option>
                          <option value="email">Email Allowed</option>
                          <option value="phone">Phone Calls Allowed</option>
                          <option value="video">Video Calls Preferred</option>
                        </select>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <label className="flex items-center space-x-3">
                        <input
                          type="checkbox"
                          checked={contractData.nda}
                          onChange={(e) => setContractData({...contractData, nda: e.target.checked})}
                          className="h-5 w-5 text-[#FF6B00] border-[#ffeee3] rounded focus:ring-[#FF6B00]"
                        />
                        <span className="text-[#2E2E2E]">Require Non-Disclosure Agreement (NDA)</span>
                      </label>
                    </div>

                    <div className="bg-[#ffeee3]/50 rounded-lg p-4">
                      <h3 className="font-semibold text-[#2E2E2E] mb-2">Standard Terms Include:</h3>
                      <ul className="text-sm text-[#2E2E2E]/80 space-y-1">
                        <li>• Payment protection through escrow</li>
                        <li>• Intellectual property rights transfer upon payment</li>
                        <li>• Dispute resolution through platform mediation</li>
                        <li>• Confidentiality of project information</li>
                      </ul>
                    </div>
                  </div>
                </div>
              )}

              {/* Step 4: Review & Send */}
              {currentStep === 4 && (
                <div>
                  <h2 className="text-2xl font-bold mb-6 text-[#2E2E2E]">Review & Send Contract</h2>
                  
                  <div className="space-y-6">
                    {/* Contract Summary */}
                    <div className="border border-[#ffeee3] rounded-lg p-6">
                      <h3 className="font-semibold text-[#2E2E2E] mb-4">Contract Summary</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                        <div>
                          <span className="text-[#2E2E2E]/60">Project:</span>
                          <div className="font-medium text-[#2E2E2E]">{contractData.projectTitle}</div>
                        </div>
                        <div>
                          <span className="text-[#2E2E2E]/60">Freelancer:</span>
                          <div className="font-medium text-[#2E2E2E]">{contractData.freelancer.name}</div>
                        </div>
                        <div>
                          <span className="text-[#2E2E2E]/60">Contract Type:</span>
                          <div className="font-medium text-[#2E2E2E] capitalize">{contractData.contractType} Price</div>
                        </div>
                        <div>
                          <span className="text-[#2E2E2E]/60">Total Value:</span>
                          <div className="font-medium text-[#FF6B00] text-lg">
                            ${contractData.milestones.reduce((sum, milestone) => sum + (milestone.amount || 0), 0)}
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Milestones Summary */}
                    <div className="border border-[#ffeee3] rounded-lg p-6">
                      <h3 className="font-semibold text-[#2E2E2E] mb-4">Milestones ({contractData.milestones.length})</h3>
                      <div className="space-y-3">
                        {contractData.milestones.map((milestone, index) => (
                          <div key={index} className="flex items-center justify-between p-3 bg-[#ffeee3]/30 rounded-lg">
                            <div>
                              <div className="font-medium text-[#2E2E2E]">{milestone.title}</div>
                              <div className="text-sm text-[#2E2E2E]/60">Due: {milestone.dueDate}</div>
                            </div>
                            <div className="font-semibold text-[#FF6B00]">${milestone.amount}</div>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Terms Summary */}
                    <div className="border border-[#ffeee3] rounded-lg p-6">
                      <h3 className="font-semibold text-[#2E2E2E] mb-4">Terms & Conditions</h3>
                      <div className="text-sm space-y-2">
                        <div className="flex justify-between">
                          <span className="text-[#2E2E2E]/60">Revisions Included:</span>
                          <span className="text-[#2E2E2E]">
                            {contractData.revisions === -1 ? 'Unlimited' : contractData.revisions}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-[#2E2E2E]/60">Communication:</span>
                          <span className="text-[#2E2E2E] capitalize">{contractData.communicationPreference.replace('_', ' ')}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-[#2E2E2E]/60">NDA Required:</span>
                          <span className="text-[#2E2E2E]">{contractData.nda ? 'Yes' : 'No'}</span>
                        </div>
                      </div>
                      {contractData.terms && (
                        <div className="mt-4">
                          <div className="text-[#2E2E2E]/60 text-sm mb-2">Additional Terms:</div>
                          <div className="text-[#2E2E2E] text-sm bg-[#ffeee3]/30 p-3 rounded-lg">
                            {contractData.terms}
                          </div>
                        </div>
                      )}
                    </div>

                    <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                      <h4 className="font-medium text-blue-900 mb-2">Important Notes:</h4>
                      <ul className="text-sm text-blue-800 space-y-1">
                        <li>• Funds will be held in escrow until milestones are completed</li>
                        <li>• Both parties can request modifications before signing</li>
                        <li>• Contract becomes legally binding once both parties accept</li>
                        <li>• All communication should happen through the platform</li>
                      </ul>
                    </div>
                  </div>
                </div>
              )}

              {/* Navigation Buttons */}
              <div className="flex justify-between items-center mt-8 pt-6 border-t border-[#ffeee3]">
                <button
                  onClick={handlePrev}
                  disabled={currentStep === 1}
                  className={`px-6 py-3 rounded-lg font-medium transition-colors ${
                    currentStep === 1
                      ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                      : 'bg-[#ffeee3] text-[#2E2E2E] hover:bg-[#FF6B00] hover:text-white'
                  }`}
                >
                  Previous
                </button>
                
                <div className="text-sm text-[#2E2E2E]/60">
                  Step {currentStep} of {totalSteps}
                </div>
                
                {currentStep === totalSteps ? (
                  <button className="px-8 py-3 bg-[#FF6B00] hover:bg-[#FF9F45] text-white rounded-lg font-medium transition-colors">
                    Send Contract
                  </button>
                ) : (
                  <button
                    onClick={handleNext}
                    className="px-6 py-3 bg-[#FF6B00] hover:bg-[#FF9F45] text-white rounded-lg font-medium transition-colors"
                  >
                    Next
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ContractSetupPage;
