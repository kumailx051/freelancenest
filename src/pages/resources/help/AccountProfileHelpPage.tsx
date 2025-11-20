import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, User, Award, Settings, Image, FileText, CheckCircle, AlertTriangle, Shield } from 'lucide-react';

// Profile sections
const profileSections = [
  {
    title: "Basic Information",
    description: "Your identity and contact details on the platform",
    icon: <User className="w-6 h-6" />,
    fields: [
      { name: "Profile Photo", description: "A professional headshot that clearly shows your face" },
      { name: "Display Name", description: "Your professional name displayed on your profile" },
      { name: "Professional Title", description: "A concise headline describing your expertise (e.g., 'Senior Web Developer')" },
      { name: "Location", description: "Your country and city" },
      { name: "Contact Email", description: "Your professional email address for communications" }
    ]
  },
  {
    title: "Professional Profile",
    description: "Your expertise, experience, and portfolio",
    icon: <Award className="w-6 h-6" />,
    fields: [
      { name: "Overview", description: "A detailed summary of your professional background and expertise" },
      { name: "Skills", description: "Technical and soft skills relevant to your services" },
      { name: "Service Categories", description: "Primary categories your services fall under" },
      { name: "Education", description: "Degrees, certifications, and educational achievements" },
      { name: "Employment History", description: "Relevant work experience and past employment" }
    ]
  },
  {
    title: "Portfolio & Work Samples",
    description: "Showcase of your previous work and projects",
    icon: <Image className="w-6 h-6" />,
    fields: [
      { name: "Portfolio Items", description: "Examples of your best work with descriptions" },
      { name: "Case Studies", description: "Detailed analysis of successful projects" },
      { name: "Client Testimonials", description: "Feedback from previous clients" },
      { name: "Project Gallery", description: "Visual representations of your work" },
      { name: "Featured Projects", description: "Highlighted work that best represents your skills" }
    ]
  },
  {
    title: "Account Settings",
    description: "Security, notifications, and preferences",
    icon: <Settings className="w-6 h-6" />,
    fields: [
      { name: "Password Management", description: "Update and secure your account password" },
      { name: "Two-Factor Authentication", description: "Additional security for your account" },
      { name: "Notification Preferences", description: "Control which alerts and updates you receive" },
      { name: "Privacy Settings", description: "Manage what information is visible to others" },
      { name: "Connected Accounts", description: "Link other accounts and services" }
    ]
  }
];

// Profile visibility tips
const profileVisibilityTips = [
  {
    level: "Basic",
    visibility: "Limited",
    features: [
      "Name and professional title visible",
      "Country and general location shown",
      "Limited skill display",
      "No portfolio visibility"
    ]
  },
  {
    level: "Standard",
    visibility: "Balanced",
    features: [
      "Complete professional profile visible",
      "Skills with endorsements displayed",
      "Up to 3 portfolio items shown",
      "General availability status"
    ],
    recommended: true
  },
  {
    level: "Comprehensive",
    visibility: "Full",
    features: [
      "Complete profile with all details",
      "Full portfolio showcase",
      "Verified skills and badges displayed",
      "Detailed work history and testimonials",
      "Real-time availability status"
    ]
  }
];

// Best practices
const bestPractices = [
  {
    title: "Be Authentic and Honest",
    description: "Present your real skills and experience without exaggeration. Authenticity builds trust with potential clients.",
    icon: <Shield className="h-5 w-5" />
  },
  {
    title: "Update Regularly",
    description: "Keep your profile and portfolio current with your latest skills, projects, and achievements.",
    icon: <FileText className="h-5 w-5" />
  },
  {
    title: "Highlight Specializations",
    description: "Emphasize your niche skills and specialized expertise that set you apart from competitors.",
    icon: <Award className="h-5 w-5" />
  },
  {
    title: "Proofread Everything",
    description: "Ensure your profile is free of spelling and grammatical errors that can undermine professionalism.",
    icon: <CheckCircle className="h-5 w-5" />
  },
  {
    title: "Protect Personal Information",
    description: "Avoid sharing sensitive personal details like phone numbers or home address publicly.",
    icon: <AlertTriangle className="h-5 w-5" />
  }
];

const AccountProfileHelpPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-[#ffeee3]">
      {/* Hero Section */}
      <section className="pt-40 pb-16 bg-gradient-to-r from-purple-500 to-purple-700">
        <div className="section-container">
          <div className="max-w-4xl mx-auto">
            <Link 
              to="/resources/help-center" 
              className="inline-flex items-center text-[#2E2E2E] hover:text-white mb-6 transition-colors"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Help Center
            </Link>
            <div>
              <span className="bg-[#ffeee3]/30 text-white text-sm font-medium px-3 py-1 rounded-full">Help Center</span>
              <h1 className="text-4xl md:text-5xl font-bold text-white mt-3 mb-6">Account & Profile</h1>
              <p className="text-xl text-[#2E2E2E] max-w-3xl">
                Learn how to create a compelling profile that gets noticed by clients and showcases your professional expertise
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Profile Anatomy */}
      <section className="py-16 -mt-8">
        <div className="section-container">
          <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-md p-8">
            <h2 className="text-2xl font-bold text-[#2E2E2E] mb-2">Profile Anatomy</h2>
            <p className="text-[#2E2E2E] mb-8">Understanding the key components of your FreelanceNest profile</p>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div className="flex flex-col">
                <div className="flex-1 relative">
                  <img 
                    src="https://images.unsplash.com/photo-1563906267088-b029e7101114?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80" 
                    alt="Profile Example" 
                    className="w-full h-full object-cover rounded-xl"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent rounded-xl flex items-end">
                    <div className="p-6">
                      <h3 className="text-white font-bold text-2xl">Sample Profile</h3>
                      <p className="text-white/80">A well-structured professional presence</p>
                    </div>
                  </div>
                </div>
              </div>
              
              <div>
                <h3 className="text-xl font-bold mb-4">A Complete Profile Includes:</h3>
                <ul className="space-y-4">
                  <li className="flex items-start">
                    <div className="bg-[#ffeee3] p-1.5 rounded-full mr-3 flex-shrink-0 mt-1">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-[#FF6B00]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <div>
                      <span className="font-semibold text-[#2E2E2E]">Professional Photo</span>
                      <p className="text-sm text-[#2E2E2E]">Clear, professional headshot that shows your face</p>
                    </div>
                  </li>
                  <li className="flex items-start">
                    <div className="bg-[#ffeee3] p-1.5 rounded-full mr-3 flex-shrink-0 mt-1">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-[#FF6B00]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <div>
                      <span className="font-semibold text-[#2E2E2E]">Compelling Overview</span>
                      <p className="text-sm text-[#2E2E2E]">Brief, engaging summary of your skills and experience</p>
                    </div>
                  </li>
                  <li className="flex items-start">
                    <div className="bg-[#ffeee3] p-1.5 rounded-full mr-3 flex-shrink-0 mt-1">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-[#FF6B00]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <div>
                      <span className="font-semibold text-[#2E2E2E]">Relevant Skills</span>
                      <p className="text-sm text-[#2E2E2E]">Comprehensive list of your technical and professional skills</p>
                    </div>
                  </li>
                  <li className="flex items-start">
                    <div className="bg-[#ffeee3] p-1.5 rounded-full mr-3 flex-shrink-0 mt-1">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-[#FF6B00]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <div>
                      <span className="font-semibold text-[#2E2E2E]">Work Experience</span>
                      <p className="text-sm text-[#2E2E2E]">Relevant work history and accomplishments</p>
                    </div>
                  </li>
                  <li className="flex items-start">
                    <div className="bg-[#ffeee3] p-1.5 rounded-full mr-3 flex-shrink-0 mt-1">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-[#FF6B00]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <div>
                      <span className="font-semibold text-[#2E2E2E]">Portfolio Samples</span>
                      <p className="text-sm text-[#2E2E2E]">Examples of your best work with descriptions</p>
                    </div>
                  </li>
                  <li className="flex items-start">
                    <div className="bg-[#ffeee3] p-1.5 rounded-full mr-3 flex-shrink-0 mt-1">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-[#FF6B00]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <div>
                      <span className="font-semibold text-[#2E2E2E]">Education & Certifications</span>
                      <p className="text-sm text-[#2E2E2E]">Academic background and professional certifications</p>
                    </div>
                  </li>
                </ul>
                
                <div className="mt-8">
                  <Link 
                    to="#edit-profile" 
                    className="inline-flex items-center text-[#FF6B00] hover:text-[#2E2E2E] font-medium"
                  >
                    How to edit your profile
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Profile Section Details */}
      <section className="py-16">
        <div className="section-container">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold mb-12 text-center">Profile Sections in Detail</h2>
            
            <div className="space-y-8">
              {profileSections.map((section, index) => (
                <div key={index} className="bg-white rounded-xl shadow-sm overflow-hidden">
                  <div className="p-6 border-b border-[#ffeee3] flex items-center">
                    <div className={`p-3 rounded-lg mr-4 bg-[#ffeee3] text-[#FF6B00]`}>
                      {section.icon}
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-[#2E2E2E]">{section.title}</h3>
                      <p className="text-[#2E2E2E]">{section.description}</p>
                    </div>
                  </div>
                  <div className="p-6">
                    <h4 className="text-lg font-semibold mb-4">Key Fields:</h4>
                    <div className="space-y-4">
                      {section.fields.map((field, i) => (
                        <div key={i} className="flex items-start">
                          <div className="bg-[#ffeee3] p-1 rounded-full mr-3 flex-shrink-0 mt-1.5">
                            <CheckCircle className="w-4 h-4 text-[#FF6B00]" />
                          </div>
                          <div>
                            <span className="font-semibold text-[#2E2E2E]">{field.name}</span>
                            <p className="text-sm text-[#2E2E2E]">{field.description}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Profile Visibility */}
      <section className="py-16 bg-[#ffeee3]" id="profile-visibility">
        <div className="section-container">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold mb-6 text-center">Profile Visibility Options</h2>
            <p className="text-lg text-[#2E2E2E] text-center mb-12">Control how much information is visible to clients and other users</p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {profileVisibilityTips.map((option, index) => (
                <div 
                  key={index} 
                  className={`bg-white rounded-xl overflow-hidden shadow-sm border ${option.recommended ? 'border-[#FF6B00]' : 'border-transparent'}`}
                >
                  {option.recommended && (
                    <div className="bg-[#FF6B00] text-white text-center py-2 text-sm font-medium">
                      Recommended
                    </div>
                  )}
                  <div className="p-6">
                    <h3 className="text-xl font-bold mb-2 text-[#2E2E2E]">{option.level}</h3>
                    <div className="bg-[#ffeee3] text-[#2E2E2E] text-sm px-3 py-1 rounded-full inline-block mb-4">
                      Visibility: {option.visibility}
                    </div>
                    <ul className="space-y-3">
                      {option.features.map((feature, i) => (
                        <li key={i} className="flex items-start">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-[#FF6B00] mr-2 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                          <span className="text-[#2E2E2E]">{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="mt-8 bg-[#ffeee3] border border-[#FF6B00] rounded-xl p-6">
              <h3 className="text-lg font-semibold mb-3">Visibility Tip:</h3>
              <p className="text-[#2E2E2E]">
                A higher visibility profile generally attracts more client interest, but you should balance 
                visibility with privacy concerns. The Standard level provides a good balance for most freelancers, 
                while the Comprehensive level is ideal for those actively seeking many new clients.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Edit Your Profile */}
      <section className="py-16" id="edit-profile">
        <div className="section-container">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold mb-12 text-center">How to Edit Your Profile</h2>
            
            <div className="bg-white rounded-xl shadow-sm overflow-hidden">
              <div className="p-8">
                <div className="space-y-8">
                  <div className="flex items-start">
                    <div className="bg-[#ffeee3] rounded-full w-10 h-10 flex items-center justify-center text-[#FF6B00] font-bold text-lg flex-shrink-0 mt-1">
                      1
                    </div>
                    <div className="ml-4">
                      <h3 className="text-xl font-bold mb-2">Access Your Profile</h3>
                      <p className="text-[#2E2E2E] mb-4">
                        Click on your profile picture in the top-right corner of any page, then select "View Profile" 
                        from the dropdown menu. Alternatively, navigate directly to your profile via the main menu.
                      </p>
                      <div className="bg-[#ffeee3] p-4 rounded-lg">
                        <p className="text-sm text-[#2E2E2E]">
                          <strong>Tip:</strong> You can also access your profile directly by going to 
                          freelancenest.com/profile when logged in.
                        </p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="bg-[#ffeee3] rounded-full w-10 h-10 flex items-center justify-center text-[#FF6B00] font-bold text-lg flex-shrink-0 mt-1">
                      2
                    </div>
                    <div className="ml-4">
                      <h3 className="text-xl font-bold mb-2">Enter Edit Mode</h3>
                      <p className="text-[#2E2E2E] mb-4">
                        Click the "Edit Profile" button near the top of your profile page. This will allow you to 
                        modify all sections of your profile.
                      </p>
                      <div className="bg-[#ffeee3] p-4 rounded-lg">
                        <p className="text-sm text-[#2E2E2E]">
                          <strong>Note:</strong> You can also edit individual sections by clicking the "Edit" icon 
                          next to each section heading.
                        </p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="bg-[#ffeee3] rounded-full w-10 h-10 flex items-center justify-center text-[#FF6B00] font-bold text-lg flex-shrink-0 mt-1">
                      3
                    </div>
                    <div className="ml-4">
                      <h3 className="text-xl font-bold mb-2">Make Your Changes</h3>
                      <p className="text-[#2E2E2E] mb-4">
                        Update the fields you want to modify. Each section has its own editing interface with specific 
                        fields and options. Be sure to follow the guidelines provided for each field.
                      </p>
                      <div className="bg-[#ffeee3] p-4 rounded-lg">
                        <p className="text-sm text-[#2E2E2E]">
                          <strong>Important:</strong> Your changes are saved automatically in most sections, but some may 
                          require you to click a "Save Changes" button.
                        </p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="bg-[#ffeee3] rounded-full w-10 h-10 flex items-center justify-center text-[#FF6B00] font-bold text-lg flex-shrink-0 mt-1">
                      4
                    </div>
                    <div className="ml-4">
                      <h3 className="text-xl font-bold mb-2">Review Your Profile</h3>
                      <p className="text-[#2E2E2E] mb-4">
                        After making changes, review your profile by clicking "View Public Profile" to see how it 
                        appears to clients and other users.
                      </p>
                      <div className="bg-[#ffeee3] p-4 rounded-lg">
                        <p className="text-sm text-[#2E2E2E]">
                          <strong>Pro Tip:</strong> Ask a colleague to review your profile and provide feedback on 
                          how it could be improved.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Best Practices */}
      <section className="py-16 bg-[#2E2E2E] text-white">
        <div className="section-container">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold mb-12 text-center">Profile Best Practices</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {bestPractices.map((practice, index) => (
                <div key={index} className="bg-white/10 p-6 rounded-xl backdrop-blur-sm">
                  <div className="bg-white/20 p-3 rounded-full w-12 h-12 flex items-center justify-center mb-4">
                    {practice.icon}
                  </div>
                  <h3 className="text-xl font-bold mb-2">{practice.title}</h3>
                  <p className="text-white/80">{practice.description}</p>
                </div>
              ))}
            </div>
            
            <div className="mt-12 p-6 bg-white/10 rounded-xl backdrop-blur-sm">
              <h3 className="text-xl font-bold mb-4">Profile Completeness Score</h3>
              <p className="mb-6">
                Your profile completeness score impacts your visibility in search results. Profiles with higher 
                completeness scores appear more frequently in client searches.
              </p>
              <div className="w-full bg-white/20 rounded-full h-4">
                <div className="bg-white h-4 rounded-full" style={{ width: '85%' }}></div>
              </div>
              <div className="flex justify-between mt-2 text-sm">
                <span>0%</span>
                <span className="font-semibold">85% Complete</span>
                <span>100%</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Common Questions */}
      <section className="py-16 bg-white">
        <div className="section-container">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold mb-12 text-center">Frequently Asked Questions</h2>
            
            <div className="space-y-6">
              <div className="bg-[#ffeee3] rounded-xl p-6">
                <h3 className="text-xl font-bold mb-3">How often should I update my profile?</h3>
                <p className="text-[#2E2E2E]">
                  We recommend reviewing your profile at least once every 3 months to ensure information is current. 
                  Update it immediately when you gain new skills, complete significant projects, or earn certifications.
                </p>
              </div>
              
              <div className="bg-[#ffeee3] rounded-xl p-6">
                <h3 className="text-xl font-bold mb-3">Can I have different profiles for different skills?</h3>
                <p className="text-[#2E2E2E]">
                  FreelanceNest allows only one profile per user, but you can showcase multiple skill sets within that 
                  profile. Use the "Services" section to clearly define different service offerings and skill categories.
                </p>
              </div>
              
              <div className="bg-[#ffeee3] rounded-xl p-6">
                <h3 className="text-xl font-bold mb-3">Who can see my contact information?</h3>
                <p className="text-[#2E2E2E]">
                  Your email and contact details are only visible to clients you're actively working with or have proposals 
                  with. We protect this information from public view to maintain your privacy and prevent off-platform communication.
                </p>
              </div>
              
              <div className="bg-[#ffeee3] rounded-xl p-6">
                <h3 className="text-xl font-bold mb-3">How do I get my profile verified?</h3>
                <p className="text-[#2E2E2E]">
                  Profile verification involves completing identity verification (ID check) and skill verification (skill tests). 
                  Navigate to Account Settings  Verification Center to start the process. Verified profiles receive a badge and higher visibility.
                </p>
              </div>
              
              <div className="bg-[#ffeee3] rounded-xl p-6">
                <h3 className="text-xl font-bold mb-3">What should I do if I want to hide my profile temporarily?</h3>
                <p className="text-[#2E2E2E]">
                  You can set your profile to "Invisible" mode in Account Settings Privacy. This hides your profile from searches 
                  while maintaining your account and ongoing projects. To reactivate visibility, return to the same settings page.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Next Steps */}
      <section className="py-16 bg-[#ffeee3]">
        <div className="section-container">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-6">Ready to Enhance Your Profile?</h2>
            <p className="text-xl text-[#2E2E2E] mb-8">
              Apply these tips to create a standout profile that attracts more clients
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link 
                to="/account/profile/edit" 
                className="px-6 py-3 bg-[#FF6B00] hover:bg-[#2E2E2E] text-white font-medium rounded-lg transition-colors"
              >
                Edit Your Profile Now
              </Link>
              <Link 
                to="/resources/help-center" 
                className="px-6 py-3 bg-white border border-[#ffeee3] hover:bg-[#ffeee3] text-[#2E2E2E] font-medium rounded-lg transition-colors"
              >
                Explore More Help Topics
              </Link>
            </div>
            
            <div className="mt-12 flex flex-col sm:flex-row justify-center items-center gap-8">
              <Link 
                to="/resources/help/payments-finances" 
                className="flex items-center text-[#FF6B00] hover:text-[#2E2E2E] font-medium"
              >
                Next Topic: Payments & Finances
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                </svg>
              </Link>
              
              <span className="hidden sm:block text-[#ffeee3]">|</span>
              
              <Link 
                to="/resources/help/getting-started" 
                className="flex items-center text-[#FF6B00] hover:text-[#2E2E2E] font-medium"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
                Previous: Getting Started
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AccountProfileHelpPage;














