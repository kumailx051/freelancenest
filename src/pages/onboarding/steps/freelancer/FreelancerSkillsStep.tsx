import React, { useState } from 'react';
import { Search, Plus, X, Trash2 } from 'lucide-react';

interface FreelancerSkillsStepProps {
  user: any;
  onNext: (data?: any) => void;
  onBack: () => void;
}

// Sample skill categories and skills
const skillCategories = [
  { 
    id: 'development', 
    name: 'Development & IT',
    skills: ['JavaScript', 'React', 'Node.js', 'Python', 'Java', 'PHP', 'SQL', 'C#', 'Ruby', 'Swift']
  },
  { 
    id: 'design', 
    name: 'Design & Creative',
    skills: ['Graphic Design', 'UI/UX Design', 'Adobe Photoshop', 'Illustration', 'Logo Design', 'Adobe XD', 'Figma', '3D Modeling', 'Animation', 'Video Editing']
  },
  { 
    id: 'writing', 
    name: 'Writing & Translation',
    skills: ['Content Writing', 'Copywriting', 'Technical Writing', 'Translation', 'Proofreading', 'Editing', 'Creative Writing', 'Blog Writing', 'Research', 'SEO Writing']
  },
  { 
    id: 'marketing', 
    name: 'Sales & Marketing',
    skills: ['Digital Marketing', 'Social Media Marketing', 'SEO', 'Email Marketing', 'Content Marketing', 'PPC', 'Market Research', 'Lead Generation', 'Google Analytics', 'Facebook Ads']
  }
];

const FreelancerSkillsStep: React.FC<FreelancerSkillsStepProps> = ({ 
  onNext, 
  onBack 
}) => {
  const [selectedSkills, setSelectedSkills] = useState<string[]>([]);
  const [skillLevels, setSkillLevels] = useState<Record<string, number>>({});
  const [searchTerm, setSearchTerm] = useState('');
  const [activeCategory, setActiveCategory] = useState(skillCategories[0].id);
  const [customSkill, setCustomSkill] = useState('');
  const [errors, setErrors] = useState({ skills: '' });
  const [showAnimation, setShowAnimation] = useState(false);

  const handleSkillSelection = (skill: string) => {
    if (selectedSkills.includes(skill)) {
      // Remove the skill
      const updatedSkills = selectedSkills.filter(s => s !== skill);
      setSelectedSkills(updatedSkills);
      
      // Remove the skill level
      const updatedLevels = { ...skillLevels };
      delete updatedLevels[skill];
      setSkillLevels(updatedLevels);
    } else {
      // Add the skill with default level
      if (selectedSkills.length < 15) {
        setSelectedSkills([...selectedSkills, skill]);
        setSkillLevels({ ...skillLevels, [skill]: 3 }); // Default to Intermediate (3)
        
        // Show animation
        setShowAnimation(true);
        setTimeout(() => setShowAnimation(false), 500);
      }
    }
    
    // Clear any error when the user selects skills
    if (errors.skills) {
      setErrors({ ...errors, skills: '' });
    }
  };

  const handleAddCustomSkill = () => {
    if (customSkill.trim() && !selectedSkills.includes(customSkill.trim())) {
      if (selectedSkills.length < 15) {
        const trimmedSkill = customSkill.trim();
        setSelectedSkills([...selectedSkills, trimmedSkill]);
        setSkillLevels({ ...skillLevels, [trimmedSkill]: 3 }); // Default to Intermediate
        setCustomSkill('');
      }
    }
  };

  const handleSkillLevelChange = (skill: string, level: number) => {
    setSkillLevels({ ...skillLevels, [skill]: level });
  };

  const handleRemoveSkill = (skill: string) => {
    setSelectedSkills(selectedSkills.filter(s => s !== skill));
    const updatedLevels = { ...skillLevels };
    delete updatedLevels[skill];
    setSkillLevels(updatedLevels);
  };

  const handleClearAllSkills = () => {
    setSelectedSkills([]);
    setSkillLevels({});
  };

  const getFilteredSkills = () => {
    if (!searchTerm) {
      return skillCategories.find(cat => cat.id === activeCategory)?.skills || [];
    }
    
    // Search across all categories when there's a search term
    const allSkills = skillCategories.flatMap(cat => cat.skills);
    return allSkills.filter(skill => 
      skill.toLowerCase().includes(searchTerm.toLowerCase())
    );
  };

  const validateForm = () => {
    const newErrors = { skills: '' };
    
    if (selectedSkills.length === 0) {
      newErrors.skills = 'Please select at least one skill';
    }
    
    setErrors(newErrors);
    return !newErrors.skills;
  };

  const handleSubmit = () => {
    if (validateForm()) {
      const skillsData = selectedSkills.map(skill => ({
        name: skill,
        level: skillLevels[skill]
      }));
      
      onNext({ skills: skillsData });
    }
  };

  const getSkillLevelLabel = (level: number) => {
    switch(level) {
      case 1: return 'Beginner';
      case 2: return 'Basic';
      case 3: return 'Intermediate';
      case 4: return 'Advanced';
      case 5: return 'Expert';
      default: return 'Intermediate';
    }
  };

  const filteredSkills = getFilteredSkills();

  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">Add Your Skills</h2>
      <p className="text-[#2E2E2E] mb-6">
        Add your skills to help clients find you for the right projects. You can add up to 15 skills.
      </p>
      
      {/* Selected Skills Section */}
      <div className="mb-8">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-medium">Selected Skills ({selectedSkills.length}/15)</h3>
          {selectedSkills.length > 0 && (
            <button 
              type="button" 
              onClick={handleClearAllSkills}
              className="text-[#FF6B00] hover:text-[#2E2E2E] text-sm flex items-center"
            >
              <Trash2 size={14} className="mr-1" /> Clear All
            </button>
          )}
        </div>
        
        {selectedSkills.length > 0 ? (
          <div className="space-y-3 relative">
            {/* Animation overlay */}
            {showAnimation && (
              <div className="absolute inset-0 bg-[#ffeee3] bg-opacity-50 z-10 flex items-center justify-center rounded-lg">
                <div className="text-[#FF6B00] font-medium text-lg animate-pulse">Skill Added!</div>
              </div>
            )}
          
            {selectedSkills.map(skill => (
              <div 
                key={skill} 
                className="bg-white p-4 rounded-lg border border-[#ffeee3] shadow-sm"
              >
                <div className="flex justify-between items-center mb-2">
                  <div className="font-medium">{skill}</div>
                  <button 
                    onClick={() => handleRemoveSkill(skill)}
                    className="text-[#ffeee3] hover:text-[#FF6B00]"
                  >
                    <X size={18} />
                  </button>
                </div>
                
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span>Beginner</span>
                    <span>Expert</span>
                  </div>
                  <div className="flex space-x-1">
                    {[1, 2, 3, 4, 5].map(level => (
                      <button
                        key={level}
                        type="button"
                        onClick={() => handleSkillLevelChange(skill, level)}
                        className={`flex-1 h-2 rounded-full transition-colors duration-200 ${
                          level <= (skillLevels[skill] || 3) 
                            ? 'bg-[#FF6B00]' 
                            : 'bg-[#ffeee3]'
                        }`}
                        aria-label={`Set skill level to ${getSkillLevelLabel(level)}`}
                      />
                    ))}
                  </div>
                  <div className="text-right text-xs text-[#ffeee3] mt-1">
                    {getSkillLevelLabel(skillLevels[skill] || 3)}
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="bg-[#ffeee3] p-6 rounded-lg border border-dashed border-[#ffeee3] text-center">
            <p className="text-[#ffeee3]">No skills selected yet. Select skills from below or add custom skills.</p>
          </div>
        )}
        
        {errors.skills && <p className="mt-2 text-sm text-[#FF6B00]">{errors.skills}</p>}
      </div>
      
      {/* Add Skills Section */}
      <div className="bg-[#ffeee3] p-6 rounded-lg border border-[#ffeee3]">
        <h3 className="text-lg font-medium mb-4">Add Skills</h3>
        
        {/* Search Bar */}
        <div className="relative mb-6">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search size={18} className="text-[#ffeee3]" />
          </div>
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search for skills..."
            className="w-full pl-10 pr-4 py-3 border border-[#ffeee3] rounded-lg focus:ring-2 focus:ring-[#FF6B00] focus:outline-none"
          />
        </div>
        
        {/* Custom Skill Input */}
        <div className="mb-6">
          <label htmlFor="customSkill" className="block text-sm font-medium text-[#2E2E2E] mb-1">
            Add a Custom Skill
          </label>
          <div className="flex">
            <input
              type="text"
              id="customSkill"
              value={customSkill}
              onChange={(e) => setCustomSkill(e.target.value)}
              placeholder="Enter a skill not in the list"
              className="flex-1 px-4 py-2 border border-[#ffeee3] rounded-l-lg focus:ring-2 focus:ring-[#FF6B00] focus:outline-none"
            />
            <button
              type="button"
              onClick={handleAddCustomSkill}
              disabled={!customSkill.trim() || selectedSkills.includes(customSkill.trim())}
              className="bg-[#FF6B00] hover:bg-[#FF9F45] disabled:bg-[#ffeee3] text-white px-4 py-2 rounded-r-lg flex items-center"
            >
              <Plus size={18} />
            </button>
          </div>
        </div>
        
        {/* Skill Categories */}
        {!searchTerm && (
          <div className="mb-4 border-b border-[#ffeee3]">
            <div className="flex overflow-x-auto space-x-6 pb-2">
              {skillCategories.map(category => (
                <button
                  key={category.id}
                  onClick={() => setActiveCategory(category.id)}
                  className={`whitespace-nowrap py-2 border-b-2 transition-colors duration-200 ${
                    activeCategory === category.id 
                      ? 'border-[#FF6B00] text-[#FF6B00] font-medium' 
                      : 'border-transparent text-[#2E2E2E] hover:text-[#2E2E2E]'
                  }`}
                >
                  {category.name}
                </button>
              ))}
            </div>
          </div>
        )}
        
        {/* Skills Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
          {filteredSkills.map(skill => (
            <button
              key={skill}
              onClick={() => handleSkillSelection(skill)}
              disabled={selectedSkills.length >= 15 && !selectedSkills.includes(skill)}
              className={`p-3 rounded-lg text-left transition-all duration-200 ${
                selectedSkills.includes(skill)
                  ? 'bg-[#ffeee3] text-[#2E2E2E] border border-[#ffeee3]'
                  : 'bg-white hover:bg-[#ffeee3] border border-[#ffeee3]'
              } ${selectedSkills.length >= 15 && !selectedSkills.includes(skill) ? 'opacity-50 cursor-not-allowed' : ''}`}
            >
              <div className="flex items-center justify-between">
                <span>{skill}</span>
                {selectedSkills.includes(skill) && (
                  <div className="w-5 h-5 bg-[#FF6B00] rounded-full flex items-center justify-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 text-white" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                )}
              </div>
            </button>
          ))}
          
          {filteredSkills.length === 0 && (
            <div className="col-span-full py-8 text-center text-[#ffeee3]">
              No skills found matching "{searchTerm}". Try a different search term or add it as a custom skill.
            </div>
          )}
        </div>
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

export default FreelancerSkillsStep;













