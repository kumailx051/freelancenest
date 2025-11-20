import React, { useState } from 'react';

const PostJobPage: React.FC = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const totalSteps = 6;
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: '',
    skills: [] as string[],
    budget: '',
    budgetType: 'fixed',
    timeline: '',
    experience: '',
    projectType: '',
    attachments: [] as string[]
  });

  const categories = [
    'Web Development', 'Mobile Development', 'Design', 'Writing & Content',
    'Digital Marketing', 'Data Science', 'Video & Animation', 'Music & Audio',
    'Programming & Tech', 'Business', 'Lifestyle'
  ];

  const skills = [
    'JavaScript', 'React', 'Python', 'PHP', 'WordPress', 'Shopify',
    'UI/UX Design', 'Graphic Design', 'SEO', 'Content Writing',
    'Digital Marketing', 'Social Media', 'Video Editing', 'Animation'
  ];

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

  const handleSkillToggle = (skill: string) => {
    setFormData(prev => ({
      ...prev,
      skills: prev.skills.includes(skill)
        ? prev.skills.filter(s => s !== skill)
        : [...prev.skills, skill]
    }));
  };

  return (
    <div className="min-h-screen bg-[#ffeee3]">
      {/* Hero Section */}
      <section className="pt-40 pb-16 bg-[#2E2E2E] text-white">
        <div className="section-container">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Post a New Job</h1>
            <p className="text-xl mb-8 text-[#ffeee3]">
              Tell us what you need done and receive custom proposals from talented freelancers.
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
              
              {/* Step 1: Job Overview */}
              {currentStep === 1 && (
                <div>
                  <h2 className="text-2xl font-bold mb-6 text-[#2E2E2E]">Let's start with a strong title</h2>
                  <p className="text-[#2E2E2E]/80 mb-8">This helps your job post stand out to the right candidates. It's the first thing they'll see, so make it count!</p>
                  
                  <div className="mb-6">
                    <label className="block text-sm font-medium text-[#2E2E2E] mb-2">
                      Write a title for your job post
                    </label>
                    <input
                      type="text"
                      className="w-full px-4 py-3 border border-[#ffeee3] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF6B00] focus:border-transparent"
                      placeholder="e.g. Build responsive WordPress website with custom theme"
                      value={formData.title}
                      onChange={(e) => setFormData({...formData, title: e.target.value})}
                    />
                  </div>

                  <div className="bg-[#ffeee3]/50 rounded-lg p-4 mb-6">
                    <h3 className="font-semibold text-[#2E2E2E] mb-2">Example titles</h3>
                    <ul className="text-sm text-[#2E2E2E]/80 space-y-1">
                      <li>• Build a responsive e-commerce website using React</li>
                      <li>• Design a modern logo for tech startup</li>
                      <li>• Write SEO-optimized blog posts for SaaS company</li>
                    </ul>
                  </div>
                </div>
              )}

              {/* Step 2: Job Description */}
              {currentStep === 2 && (
                <div>
                  <h2 className="text-2xl font-bold mb-6 text-[#2E2E2E]">Tell us more about your project</h2>
                  <p className="text-[#2E2E2E]/80 mb-8">Great job posts include details about your project, what you're looking for, and how to apply.</p>
                  
                  <div className="mb-6">
                    <label className="block text-sm font-medium text-[#2E2E2E] mb-2">
                      Describe your project
                    </label>
                    <textarea
                      rows={8}
                      className="w-full px-4 py-3 border border-[#ffeee3] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF6B00] focus:border-transparent"
                      placeholder="Describe your project in detail. What are you looking to accomplish? What does success look like?"
                      value={formData.description}
                      onChange={(e) => setFormData({...formData, description: e.target.value})}
                    />
                  </div>

                  <div className="mb-6">
                    <label className="block text-sm font-medium text-[#2E2E2E] mb-2">
                      Category
                    </label>
                    <select
                      className="w-full px-4 py-3 border border-[#ffeee3] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF6B00] focus:border-transparent"
                      value={formData.category}
                      onChange={(e) => setFormData({...formData, category: e.target.value})}
                    >
                      <option value="">Select a category</option>
                      {categories.map(category => (
                        <option key={category} value={category}>{category}</option>
                      ))}
                    </select>
                  </div>
                </div>
              )}

              {/* Step 3: Skills */}
              {currentStep === 3 && (
                <div>
                  <h2 className="text-2xl font-bold mb-6 text-[#2E2E2E]">What skills are required?</h2>
                  <p className="text-[#2E2E2E]/80 mb-8">Select the skills that are most important for your project.</p>
                  
                  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
                    {skills.map(skill => (
                      <button
                        key={skill}
                        onClick={() => handleSkillToggle(skill)}
                        className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                          formData.skills.includes(skill)
                            ? 'bg-[#FF6B00] text-white'
                            : 'bg-[#ffeee3] text-[#2E2E2E] hover:bg-[#FF6B00] hover:text-white'
                        }`}
                      >
                        {skill}
                      </button>
                    ))}
                  </div>
                  
                  {formData.skills.length > 0 && (
                    <div className="mt-6 p-4 bg-[#ffeee3]/50 rounded-lg">
                      <p className="text-sm font-medium text-[#2E2E2E] mb-2">Selected skills:</p>
                      <div className="flex flex-wrap gap-2">
                        {formData.skills.map(skill => (
                          <span key={skill} className="px-3 py-1 bg-[#FF6B00] text-white text-sm rounded-full">
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* Step 4: Budget */}
              {currentStep === 4 && (
                <div>
                  <h2 className="text-2xl font-bold mb-6 text-[#2E2E2E]">Tell us about your budget</h2>
                  <p className="text-[#2E2E2E]/80 mb-8">This will help us match you with freelancers that fit your budget range.</p>
                  
                  <div className="mb-6">
                    <label className="block text-sm font-medium text-[#2E2E2E] mb-4">How do you want to pay?</label>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <button
                        onClick={() => setFormData({...formData, budgetType: 'fixed'})}
                        className={`p-6 rounded-lg border-2 text-left transition-colors ${
                          formData.budgetType === 'fixed'
                            ? 'border-[#FF6B00] bg-[#ffeee3]/30'
                            : 'border-[#ffeee3] hover:border-[#FF6B00]'
                        }`}
                      >
                        <h3 className="font-semibold text-[#2E2E2E] mb-2">Fixed price</h3>
                        <p className="text-sm text-[#2E2E2E]/80">Pay a fixed amount for the entire project</p>
                      </button>
                      
                      <button
                        onClick={() => setFormData({...formData, budgetType: 'hourly'})}
                        className={`p-6 rounded-lg border-2 text-left transition-colors ${
                          formData.budgetType === 'hourly'
                            ? 'border-[#FF6B00] bg-[#ffeee3]/30'
                            : 'border-[#ffeee3] hover:border-[#FF6B00]'
                        }`}
                      >
                        <h3 className="font-semibold text-[#2E2E2E] mb-2">Hourly rate</h3>
                        <p className="text-sm text-[#2E2E2E]/80">Pay based on hours worked</p>
                      </button>
                    </div>
                  </div>

                  <div className="mb-6">
                    <label className="block text-sm font-medium text-[#2E2E2E] mb-2">
                      {formData.budgetType === 'fixed' ? 'Set a budget range' : 'Set an hourly rate range'}
                    </label>
                    <input
                      type="text"
                      className="w-full px-4 py-3 border border-[#ffeee3] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF6B00] focus:border-transparent"
                      placeholder={formData.budgetType === 'fixed' ? 'e.g. $500 - $1000' : 'e.g. $15 - $25/hr'}
                      value={formData.budget}
                      onChange={(e) => setFormData({...formData, budget: e.target.value})}
                    />
                  </div>
                </div>
              )}

              {/* Step 5: Timeline */}
              {currentStep === 5 && (
                <div>
                  <h2 className="text-2xl font-bold mb-6 text-[#2E2E2E]">How long will your project take?</h2>
                  <p className="text-[#2E2E2E]/80 mb-8">Consider each phase of your project and be realistic about the timeline.</p>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                    {['Less than 1 week', '1-2 weeks', '2-4 weeks', '1-2 months', '2-6 months', 'More than 6 months'].map(option => (
                      <button
                        key={option}
                        onClick={() => setFormData({...formData, timeline: option})}
                        className={`p-4 rounded-lg border-2 text-left transition-colors ${
                          formData.timeline === option
                            ? 'border-[#FF6B00] bg-[#ffeee3]/30'
                            : 'border-[#ffeee3] hover:border-[#FF6B00]'
                        }`}
                      >
                        {option}
                      </button>
                    ))}
                  </div>

                  <div className="mb-6">
                    <label className="block text-sm font-medium text-[#2E2E2E] mb-2">
                      What level of experience will it need?
                    </label>
                    <div className="space-y-3">
                      {[
                        { value: 'entry', label: 'Entry Level', desc: 'Looking for someone relatively new to this field' },
                        { value: 'intermediate', label: 'Intermediate', desc: 'Looking for substantial experience in this field' },
                        { value: 'expert', label: 'Expert', desc: 'Looking for comprehensive and deep expertise in this field' }
                      ].map(option => (
                        <button
                          key={option.value}
                          onClick={() => setFormData({...formData, experience: option.value})}
                          className={`w-full p-4 rounded-lg border-2 text-left transition-colors ${
                            formData.experience === option.value
                              ? 'border-[#FF6B00] bg-[#ffeee3]/30'
                              : 'border-[#ffeee3] hover:border-[#FF6B00]'
                          }`}
                        >
                          <h3 className="font-semibold text-[#2E2E2E] mb-1">{option.label}</h3>
                          <p className="text-sm text-[#2E2E2E]/80">{option.desc}</p>
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* Step 6: Review */}
              {currentStep === 6 && (
                <div>
                  <h2 className="text-2xl font-bold mb-6 text-[#2E2E2E]">Review your job post</h2>
                  <p className="text-[#2E2E2E]/80 mb-8">Make sure everything looks good before publishing your job.</p>
                  
                  <div className="space-y-6">
                    <div className="border border-[#ffeee3] rounded-lg p-6">
                      <h3 className="font-semibold text-[#2E2E2E] mb-2">Job Title</h3>
                      <p className="text-[#2E2E2E]/80">{formData.title || 'No title entered'}</p>
                    </div>
                    
                    <div className="border border-[#ffeee3] rounded-lg p-6">
                      <h3 className="font-semibold text-[#2E2E2E] mb-2">Description</h3>
                      <p className="text-[#2E2E2E]/80">{formData.description || 'No description entered'}</p>
                    </div>
                    
                    <div className="border border-[#ffeee3] rounded-lg p-6">
                      <h3 className="font-semibold text-[#2E2E2E] mb-2">Budget</h3>
                      <p className="text-[#2E2E2E]/80">{formData.budget || 'No budget set'} ({formData.budgetType})</p>
                    </div>
                    
                    <div className="border border-[#ffeee3] rounded-lg p-6">
                      <h3 className="font-semibold text-[#2E2E2E] mb-2">Timeline</h3>
                      <p className="text-[#2E2E2E]/80">{formData.timeline || 'No timeline set'}</p>
                    </div>
                    
                    {formData.skills.length > 0 && (
                      <div className="border border-[#ffeee3] rounded-lg p-6">
                        <h3 className="font-semibold text-[#2E2E2E] mb-2">Required Skills</h3>
                        <div className="flex flex-wrap gap-2">
                          {formData.skills.map(skill => (
                            <span key={skill} className="px-3 py-1 bg-[#FF6B00] text-white text-sm rounded-full">
                              {skill}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}
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
                    Publish Job Post
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

export default PostJobPage;
