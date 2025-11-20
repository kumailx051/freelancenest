import React, { useState } from 'react';
import { Check, X } from 'lucide-react';

interface ClientPreferencesStepProps {
  user: any;
  onNext: (data?: any) => void;
  onBack: () => void;
}

interface Category {
  id: string;
  name: string;
  skills: string[];
}

const ClientPreferencesStep: React.FC<ClientPreferencesStepProps> = ({ 
  onNext, 
  onBack 
}) => {
  // Sample categories and skills
  const categories: Category[] = [
    { 
      id: 'development', 
      name: 'Development & IT',
      skills: ['Web Development', 'Mobile Development', 'Full Stack Development', 'Frontend Development', 'Backend Development', 'DevOps', 'QA & Testing', 'Database Design']
    },
    { 
      id: 'design', 
      name: 'Design & Creative',
      skills: ['UI/UX Design', 'Graphic Design', 'Logo Design', 'Brand Identity', 'Illustration', 'Animation', 'Video Production', 'Photo Editing']
    },
    { 
      id: 'writing', 
      name: 'Writing & Translation',
      skills: ['Content Writing', 'Copywriting', 'Technical Writing', 'Translation', 'Editing & Proofreading', 'Research & Summaries', 'Creative Writing', 'UX Writing']
    },
    { 
      id: 'marketing', 
      name: 'Sales & Marketing',
      skills: ['Social Media Marketing', 'SEO', 'Email Marketing', 'Content Marketing', 'PPC & SEM', 'Market Research', 'Brand Strategy', 'Marketing Analytics']
    }
  ];
  
  // Skill levels data
  const budgetRanges = [
    { id: 'micro', name: 'Micro Projects', min: 5, max: 100, description: 'Small, quick tasks or minor updates' },
    { id: 'small', name: 'Small Projects', min: 100, max: 500, description: 'Detailed tasks, simple websites, or basic designs' },
    { id: 'medium', name: 'Medium Projects', min: 500, max: 2000, description: 'Complex projects with multiple deliverables' },
    { id: 'large', name: 'Large Projects', min: 2000, max: 10000, description: 'Comprehensive projects requiring expertise' },
    { id: 'enterprise', name: 'Enterprise Projects', min: 10000, max: null, description: 'Large-scale, business-critical implementations' },
  ];

  const projectTypes = [
    'One-time project',
    'Ongoing work',
    'Full-time contract',
    'Part-time contract'
  ];
  
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedSkills, setSelectedSkills] = useState<string[]>([]);
  const [selectedBudgetRanges, setSelectedBudgetRanges] = useState<string[]>([]);
  const [selectedProjectTypes, setSelectedProjectTypes] = useState<string[]>([]);
  const [customRequirements, setCustomRequirements] = useState('');
  const [activeCategory, setActiveCategory] = useState(categories[0].id);

  // Handle category selection
  const handleCategorySelect = (categoryId: string) => {
    if (selectedCategories.includes(categoryId)) {
      // Remove the category
      setSelectedCategories(selectedCategories.filter(id => id !== categoryId));
      
      // Also remove any skills from that category
      const categorySkills = categories.find(cat => cat.id === categoryId)?.skills || [];
      setSelectedSkills(selectedSkills.filter(skill => !categorySkills.includes(skill)));
    } else {
      // Add the category
      setSelectedCategories([...selectedCategories, categoryId]);
    }
  };

  // Handle skill selection
  const handleSkillSelect = (skill: string) => {
    if (selectedSkills.includes(skill)) {
      // Remove the skill
      setSelectedSkills(selectedSkills.filter(s => s !== skill));
    } else {
      // Add the skill
      setSelectedSkills([...selectedSkills, skill]);
      
      // Ensure the parent category is selected
      for (const category of categories) {
        if (category.skills.includes(skill) && !selectedCategories.includes(category.id)) {
          setSelectedCategories([...selectedCategories, category.id]);
          break;
        }
      }
    }
  };

  // Handle budget range selection
  const handleBudgetRangeSelect = (budgetId: string) => {
    if (selectedBudgetRanges.includes(budgetId)) {
      setSelectedBudgetRanges(selectedBudgetRanges.filter(id => id !== budgetId));
    } else {
      setSelectedBudgetRanges([...selectedBudgetRanges, budgetId]);
    }
  };

  // Handle project type selection
  const handleProjectTypeSelect = (projectType: string) => {
    if (selectedProjectTypes.includes(projectType)) {
      setSelectedProjectTypes(selectedProjectTypes.filter(type => type !== projectType));
    } else {
      setSelectedProjectTypes([...selectedProjectTypes, projectType]);
    }
  };

  // Get skills for the active category
  const getActiveCategorySkills = () => {
    return categories.find(cat => cat.id === activeCategory)?.skills || [];
  };

  const handleSubmit = () => {
    const preferences = {
      categories: selectedCategories.map(catId => categories.find(cat => cat.id === catId)?.name),
      skills: selectedSkills,
      budgetRanges: selectedBudgetRanges.map(budgetId => budgetRanges.find(budget => budget.id === budgetId)),
      projectTypes: selectedProjectTypes,
      customRequirements
    };
    
    onNext(preferences);
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-2">Project Preferences</h2>
      <p className="text-[#2E2E2E] mb-8">
        Tell us about the types of projects you typically need help with.
        <br />
        <span className="text-sm text-[#FF6B00]">(This will help us suggest the right freelancers for your projects)</span>
      </p>
      
      {/* Categories and Skills */}
      <div className="bg-white border border-[#ffeee3] rounded-lg p-6 mb-8">
        <h3 className="text-lg font-medium mb-4">Categories & Skills</h3>
        
        {/* Categories List */}
        <div className="mb-6">
          <p className="text-sm text-[#2E2E2E] mb-3">Select categories that match your project needs:</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {categories.map(category => (
              <div 
                key={category.id}
                onClick={() => handleCategorySelect(category.id)}
                className={`flex items-center justify-between p-3 rounded-lg cursor-pointer border transition-all duration-200 ${
                  selectedCategories.includes(category.id)
                    ? 'border-[#ffeee3] bg-[#ffeee3]'
                    : 'border-[#ffeee3] hover:bg-[#ffeee3]'
                }`}
              >
                <span className="font-medium">{category.name}</span>
                {selectedCategories.includes(category.id) && (
                  <span className="bg-[#FF6B00] text-white rounded-full p-1">
                    <Check size={14} />
                  </span>
                )}
              </div>
            ))}
          </div>
        </div>
        
        {/* Skills Selection */}
        <div>
          <p className="text-sm text-[#2E2E2E] mb-3">Select specific skills you're looking for:</p>
          
          {/* Category Tabs */}
          <div className="flex space-x-2 overflow-x-auto mb-4">
            {categories.map(category => (
              <button
                key={category.id}
                onClick={() => setActiveCategory(category.id)}
                className={`px-3 py-2 rounded-lg whitespace-nowrap text-sm transition-colors duration-200 ${
                  category.id === activeCategory
                    ? 'bg-[#FF6B00] text-white'
                    : 'bg-[#ffeee3] text-[#2E2E2E] hover:bg-[#ffeee3]'
                }`}
              >
                {category.name}
              </button>
            ))}
          </div>
          
          {/* Skills Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
            {getActiveCategorySkills().map(skill => (
              <div
                key={skill}
                onClick={() => handleSkillSelect(skill)}
                className={`p-2 rounded-lg text-sm cursor-pointer transition-all duration-200 flex items-center justify-between ${
                  selectedSkills.includes(skill)
                    ? 'bg-[#ffeee3] border border-[#ffeee3]'
                    : 'bg-[#ffeee3] border border-[#ffeee3] hover:border-[#ffeee3]'
                }`}
              >
                <span>{skill}</span>
                {selectedSkills.includes(skill) && (
                  <Check size={14} className="text-[#FF6B00]" />
                )}
              </div>
            ))}
          </div>
          
          {/* Selected Skills Display */}
          {selectedSkills.length > 0 && (
            <div className="mt-4">
              <p className="text-sm text-[#2E2E2E] mb-2">Selected skills:</p>
              <div className="flex flex-wrap gap-2">
                {selectedSkills.map(skill => (
                  <div 
                    key={skill}
                    className="bg-[#ffeee3] text-[#2E2E2E] px-3 py-1 rounded-full text-sm flex items-center"
                  >
                    {skill}
                    <button 
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleSkillSelect(skill);
                      }}
                      className="ml-1 text-[#FF6B00] hover:text-[#2E2E2E]"
                    >
                      <X size={14} />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
      
      {/* Budget Ranges */}
      <div className="bg-white border border-[#ffeee3] rounded-lg p-6 mb-8">
        <h3 className="text-lg font-medium mb-4">Typical Budget Ranges</h3>
        <p className="text-sm text-[#2E2E2E] mb-4">Select the budget ranges that typically match your project needs:</p>
        
        <div className="space-y-3">
          {budgetRanges.map(budget => (
            <div 
              key={budget.id}
              onClick={() => handleBudgetRangeSelect(budget.id)}
              className={`p-4 rounded-lg cursor-pointer border transition-all duration-200 ${
                selectedBudgetRanges.includes(budget.id)
                  ? 'border-[#ffeee3] bg-[#ffeee3]'
                  : 'border-[#ffeee3] hover:bg-[#ffeee3]'
              }`}
            >
              <div className="flex items-center justify-between mb-1">
                <span className="font-medium">{budget.name}</span>
                <span className="text-[#2E2E2E] font-medium">
                  {budget.min === null ? `Up to $${budget.max}` : 
                   budget.max === null ? `$${budget.min}+` : 
                   `$${budget.min} - $${budget.max}`}
                </span>
              </div>
              <p className="text-sm text-[#2E2E2E]">{budget.description}</p>
            </div>
          ))}
        </div>
      </div>
      
      {/* Project Types */}
      <div className="bg-white border border-[#ffeee3] rounded-lg p-6 mb-8">
        <h3 className="text-lg font-medium mb-4">Project Types</h3>
        <p className="text-sm text-[#2E2E2E] mb-4">What type of working relationships are you looking for?</p>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {projectTypes.map(type => (
            <div 
              key={type}
              onClick={() => handleProjectTypeSelect(type)}
              className={`flex items-center justify-between p-3 rounded-lg cursor-pointer border transition-all duration-200 ${
                selectedProjectTypes.includes(type)
                  ? 'border-[#ffeee3] bg-[#ffeee3]'
                  : 'border-[#ffeee3] hover:bg-[#ffeee3]'
              }`}
            >
              <span>{type}</span>
              {selectedProjectTypes.includes(type) && (
                <span className="bg-[#FF6B00] text-white rounded-full p-1">
                  <Check size={14} />
                </span>
              )}
            </div>
          ))}
        </div>
      </div>
      
      {/* Additional Requirements */}
      <div className="bg-white border border-[#ffeee3] rounded-lg p-6 mb-8">
        <h3 className="text-lg font-medium mb-4">Additional Requirements</h3>
        <p className="text-sm text-[#2E2E2E] mb-4">Any other specific preferences or requirements you typically have for your projects?</p>
        
        <textarea
          value={customRequirements}
          onChange={(e) => setCustomRequirements(e.target.value)}
          placeholder="E.g., preferred communication frequency, working hours, collaboration tools, etc."
          className="w-full px-4 py-3 border border-[#ffeee3] rounded-lg focus:ring-2 focus:ring-[#FF6B00] focus:outline-none"
          rows={4}
        />
      </div>
      
      {/* Navigation buttons */}
      <div className="mt-8 flex flex-col md:flex-row gap-4">
        <button
          onClick={onBack}
          className="order-2 md:order-1 w-full md:w-auto border border-[#ffeee3] text-[#2E2E2E] hover:bg-[#ffeee3] font-medium px-8 py-3 rounded-lg transition-colors duration-300"
        >
          Back
        </button>
        <button
          onClick={handleSubmit}
          className="order-1 md:order-2 w-full md:flex-1 bg-[#FF6B00] hover:bg-[#FF9F45] text-white font-medium px-8 py-3 rounded-lg transition-colors duration-300"
        >
          Save & Continue
        </button>
      </div>
    </div>
  );
};

export default ClientPreferencesStep;











