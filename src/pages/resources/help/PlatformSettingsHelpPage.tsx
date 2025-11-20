import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Settings, Bell, Lock, Eye, Globe, Moon, Sun, Monitor, AlertTriangle, CheckCircle, MessageSquare } from 'lucide-react';

// Platform settings categories
const settingsCategories = [
  {
    title: "Account Preferences",
    description: "Customize your account settings and defaults",
    icon: <Settings className="w-6 h-6" />,
    color: "bg-[#ffeee3] text-[#FF6B00]",
    settings: [
      {
        name: "Profile Visibility",
        description: "Control who can see your profile information and work history",
        options: ["Public", "Clients Only", "Private"]
      },
      {
        name: "Time Zone",
        description: "Set your preferred time zone for deadlines and scheduling",
        options: ["Local Time", "UTC", "Client's Time Zone"]
      },
      {
        name: "Currency Display",
        description: "Choose which currency to display throughout the platform",
        options: ["USD", "EUR", "GBP", "Local Currency"]
      },
      {
        name: "Language",
        description: "Change the platform language and content translations",
        options: ["English", "Spanish", "French", "German", "More..."]
      }
    ]
  },
  {
    title: "Notification Settings",
    description: "Manage how and when you receive alerts",
    icon: <Bell className="w-6 h-6" />,
    color: "bg-[#ffeee3] text-[#FF6B00]",
    settings: [
      {
        name: "Email Notifications",
        description: "Choose which updates are sent to your email address",
        options: ["All Notifications", "Important Only", "None"]
      },
      {
        name: "Push Notifications",
        description: "Manage alerts on your mobile devices and browsers",
        options: ["Enabled", "Quiet Hours", "Disabled"]
      },
      {
        name: "Notification Frequency",
        description: "Select how often you receive grouped notifications",
        options: ["Real-time", "Hourly Digest", "Daily Digest"]
      },
      {
        name: "Project Updates",
        description: "Get notified about changes to your active projects",
        options: ["All Updates", "Client Messages Only", "Payments Only"]
      }
    ]
  },
  {
    title: "Privacy & Security",
    description: "Protect your account and manage data settings",
    icon: <Lock className="w-6 h-6" />,
    color: "bg-[#ffeee3] text-[#FF6B00]",
    settings: [
      {
        name: "Two-Factor Authentication",
        description: "Add an extra layer of security to your login process",
        options: ["SMS Verification", "Authenticator App", "Email Codes"]
      },
      {
        name: "Session Management",
        description: "View and control your active login sessions",
        options: ["Current Devices", "Login History", "Sign Out All"]
      },
      {
        name: "Data Privacy",
        description: "Manage how your data is used and shared on the platform",
        options: ["Essential Only", "Performance Improvement", "Personalization"]
      },
      {
        name: "Connected Apps",
        description: "Control third-party applications with access to your account",
        options: ["View Permissions", "Revoke Access"]
      }
    ]
  },
  {
    title: "Display Settings",
    description: "Customize your visual experience",
    icon: <Eye className="w-6 h-6" />,
    color: "bg-[#ffeee3] text-[#FF6B00]",
    settings: [
      {
        name: "Theme",
        description: "Choose between light, dark, or system-based theme",
        options: ["Light", "Dark", "System Default"]
      },
      {
        name: "Compact Mode",
        description: "Display more content with reduced spacing",
        options: ["Standard", "Compact", "Very Compact"]
      },
      {
        name: "Font Size",
        description: "Adjust text size for better readability",
        options: ["Small", "Medium", "Large", "Extra Large"]
      },
      {
        name: "Dashboard Layout",
        description: "Customize the arrangement of your dashboard widgets",
        options: ["Default", "Activity Focus", "Project Focus", "Custom"]
      }
    ]
  }
];

// Theme modes with previews
const themeModes = [
  {
    name: "Light Mode",
    description: "Classic light appearance with dark text on light background",
    icon: <Sun className="h-6 w-6" />,
    previewClass: "bg-white border border-[#ffeee3]"
  },
  {
    name: "Dark Mode",
    description: "Easier on the eyes in low-light environments",
    icon: <Moon className="h-6 w-6" />,
    previewClass: "bg-[#2E2E2E]"
  },
  {
    name: "System Default",
    description: "Automatically matches your device theme settings",
    icon: <Monitor className="h-6 w-6" />,
    previewClass: "bg-gradient-to-r from-white to-gray-900 border border-[#ffeee3]"
  }
];

// Setting up tips
const settingUpTips = [
  {
    tip: "Review notification settings first to ensure you don't miss important messages and opportunities",
    icon: <Bell className="h-5 w-5" />
  },
  {
    tip: "Enable two-factor authentication immediately for enhanced account security",
    icon: <Lock className="h-5 w-5" />
  },
  {
    tip: "Set your correct time zone to ensure deadlines and meeting times are accurate",
    icon: <Globe className="h-5 w-5" />
  },
  {
    tip: "Customize your dashboard layout to prioritize the information most relevant to you",
    icon: <Settings className="h-5 w-5" />
  }
];

const PlatformSettingsHelpPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-[#ffeee3]">
      {/* Hero Section */}
      <section className="pt-40 pb-16 bg-gradient-to-r from-amber-500 to-amber-600">
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
              <h1 className="text-4xl md:text-5xl font-bold text-white mt-3 mb-6">Platform Settings</h1>
              <p className="text-xl text-[#2E2E2E] max-w-3xl">
                Customize your FreelanceNest experience by configuring your account settings and preferences
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Accessing Settings */}
      <section className="py-16 -mt-8">
        <div className="section-container">
          <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-md p-8">
            <h2 className="text-2xl font-bold text-[#2E2E2E] mb-6">How to Access Your Settings</h2>
            <div className="flex flex-col md:flex-row items-start gap-8">
              <div className="md:w-7/12">
                <ol className="space-y-6">
                  <li className="flex items-start">
                    <div className="bg-[#ffeee3] rounded-full w-8 h-8 flex items-center justify-center text-[#FF6B00] font-bold text-lg flex-shrink-0 mt-0.5 mr-3">
                      1
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold mb-1">Access Your Profile Menu</h3>
                      <p className="text-[#2E2E2E]">
                        Click on your profile picture or icon in the top-right corner of any page on FreelanceNest
                      </p>
                    </div>
                  </li>
                  
                  <li className="flex items-start">
                    <div className="bg-[#ffeee3] rounded-full w-8 h-8 flex items-center justify-center text-[#FF6B00] font-bold text-lg flex-shrink-0 mt-0.5 mr-3">
                      2
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold mb-1">Select "Settings"</h3>
                      <p className="text-[#2E2E2E]">
                        From the dropdown menu, click on "Settings" to navigate to your account settings dashboard
                      </p>
                    </div>
                  </li>
                  
                  <li className="flex items-start">
                    <div className="bg-[#ffeee3] rounded-full w-8 h-8 flex items-center justify-center text-[#FF6B00] font-bold text-lg flex-shrink-0 mt-0.5 mr-3">
                      3
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold mb-1">Choose a Settings Category</h3>
                      <p className="text-[#2E2E2E]">
                        Navigate through the settings sidebar to find specific categories like Notifications, Privacy, Display, etc.
                      </p>
                    </div>
                  </li>
                </ol>
                
                <div className="mt-8 bg-[#ffeee3] border-l-4 border-[#FF6B00] p-4">
                  <div className="flex">
                    <div className="flex-shrink-0">
                      <AlertTriangle className="h-5 w-5 text-[#2E2E2E]" />
                    </div>
                    <div className="ml-3">
                      <h4 className="text-sm font-medium text-[#2E2E2E]">Pro Tip</h4>
                      <div className="mt-2 text-sm text-[#2E2E2E]">
                        <p>
                          You can also access settings directly by going to <strong>freelancenest.com/settings</strong> when logged in.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="md:w-5/12">
                <div className="bg-[#2E2E2E] rounded-xl overflow-hidden">
                  <div className="px-4 py-2 flex items-center">
                    <div className="flex space-x-1 mr-4">
                      <div className="w-3 h-3 bg-[#FF6B00] rounded-full"></div>
                      <div className="w-3 h-3 bg-[#FF9F45] rounded-full"></div>
                      <div className="w-3 h-3 bg-[#FF6B00] rounded-full"></div>
                    </div>
                    <div className="text-xs text-[#ffeee3] w-full text-center">Account Menu</div>
                  </div>
                  <div className="bg-white p-4 border-t border-[#ffeee3]">
                    <div className="bg-[#ffeee3] rounded-lg p-3 shadow-sm">
                      <div className="flex items-center p-2 bg-white rounded shadow-sm mb-2">
                        <div className="w-8 h-8 bg-[#ffeee3] rounded-full mr-3"></div>
                        <div className="text-sm font-medium">Jane Doe</div>
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-auto text-[#ffeee3]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                      </div>
                      <div className="space-y-1 bg-white rounded p-2 shadow-sm">
                        <div className="px-2 py-1.5 hover:bg-[#ffeee3] rounded text-sm">View Profile</div>
                        <div className="px-2 py-1.5 hover:bg-[#ffeee3] rounded text-sm">Notifications</div>
                        <div className="px-2 py-1.5 bg-[#ffeee3] text-[#2E2E2E] rounded text-sm font-medium">Settings</div>
                        <div className="px-2 py-1.5 hover:bg-[#ffeee3] rounded text-sm">Help Center</div>
                        <div className="px-2 py-1.5 hover:bg-[#ffeee3] rounded text-sm">Log Out</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Settings Categories */}
      <section className="py-16">
        <div className="section-container">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-3xl font-bold mb-12 text-center">Platform Settings Categories</h2>
            
            <div className="space-y-12">
              {settingsCategories.map((category, index) => (
                <div key={index} className="bg-white rounded-xl shadow-sm overflow-hidden">
                  <div className="md:flex">
                    <div className={`${category.color} p-8 md:w-1/3 flex items-center`}>
                      <div>
                        <div className="bg-white/20 p-3 inline-block rounded-lg mb-4">
                          {category.icon}
                        </div>
                        <h3 className="text-xl font-bold">{category.title}</h3>
                        <p className="mt-2 opacity-90">{category.description}</p>
                      </div>
                    </div>
                    
                    <div className="p-8 md:w-2/3">
                      <h4 className="text-lg font-semibold mb-4">Key Settings:</h4>
                      <div className="space-y-6">
                        {category.settings.map((setting, i) => (
                          <div key={i}>
                            <div className="flex justify-between items-start mb-2">
                              <div>
                                <h5 className="font-semibold text-[#2E2E2E]">{setting.name}</h5>
                                <p className="text-sm text-[#2E2E2E]">{setting.description}</p>
                              </div>
                              <div className="bg-[#ffeee3] px-3 py-1 rounded-full text-xs text-[#ffeee3]">
                                {setting.options.length} options
                              </div>
                            </div>
                            <div className="flex flex-wrap gap-2 mt-2">
                              {setting.options.map((option, j) => (
                                <span key={j} className="text-xs bg-[#ffeee3] text-[#2E2E2E] px-3 py-1 rounded-full">
                                  {option}
                                </span>
                              ))}
                            </div>
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
      </section>

      {/* Theme Settings */}
      <section className="py-16 bg-[#ffeee3]" id="theme-settings">
        <div className="section-container">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold mb-6 text-center">Display Themes</h2>
            <p className="text-lg text-[#2E2E2E] text-center mb-12">
              Choose the theme that suits your preference and working environment
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {themeModes.map((theme, index) => (
                <div key={index} className="bg-white rounded-xl overflow-hidden shadow-sm">
                  <div className={`h-32 ${theme.previewClass}`}></div>
                  <div className="p-6">
                    <div className="flex items-center mb-3">
                      <div className="bg-[#ffeee3] p-2 rounded-full mr-3">
                        {theme.icon}
                      </div>
                      <h3 className="text-lg font-bold">{theme.name}</h3>
                    </div>
                    <p className="text-[#2E2E2E] text-sm mb-4">
                      {theme.description}
                    </p>
                    <button className="w-full py-2 bg-[#ffeee3] hover:bg-[#ffeee3] text-[#2E2E2E] rounded-lg transition-colors text-sm font-medium">
                      Select {theme.name}
                    </button>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="mt-10 bg-white p-6 rounded-xl shadow-sm">
              <h3 className="text-xl font-bold mb-4">Accessibility Settings</h3>
              <p className="text-[#2E2E2E] mb-6">
                FreelanceNest offers several accessibility options to make the platform more usable for everyone:
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="flex items-start">
                  <div className="mt-1 bg-[#ffeee3] p-1.5 rounded-full mr-3 flex-shrink-0">
                    <CheckCircle className="w-4 h-4 text-[#FF6B00]" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-[#2E2E2E]">High Contrast Mode</h4>
                    <p className="text-sm text-[#2E2E2E]">
                      Increases text contrast for better readability. Enable this in Display Settings.
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="mt-1 bg-[#ffeee3] p-1.5 rounded-full mr-3 flex-shrink-0">
                    <CheckCircle className="w-4 h-4 text-[#FF6B00]" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-[#2E2E2E]">Text Scaling</h4>
                    <p className="text-sm text-[#2E2E2E]">
                      Adjust text size independently from other interface elements.
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="mt-1 bg-[#ffeee3] p-1.5 rounded-full mr-3 flex-shrink-0">
                    <CheckCircle className="w-4 h-4 text-[#FF6B00]" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-[#2E2E2E]">Screen Reader Support</h4>
                    <p className="text-sm text-[#2E2E2E]">
                      The platform is optimized for compatibility with screen readers.
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="mt-1 bg-[#ffeee3] p-1.5 rounded-full mr-3 flex-shrink-0">
                    <CheckCircle className="w-4 h-4 text-[#FF6B00]" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-[#2E2E2E]">Reduced Motion</h4>
                    <p className="text-sm text-[#2E2E2E]">
                      Minimize animations and transitions for those sensitive to motion.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Setting Up Tips */}
      <section className="py-16 bg-[#ffeee3] text-white">
        <div className="section-container">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold mb-8 text-center">Tips for Setting Up Your Account</h2>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {settingUpTips.map((tip, index) => (
                <div key={index} className="bg-white/10 backdrop-blur-sm rounded-xl p-6 flex items-start">
                  <div className="bg-white/20 p-2 rounded-full mr-4 flex-shrink-0">
                    {tip.icon}
                  </div>
                  <p>{tip.tip}</p>
                </div>
              ))}
            </div>
            
            <div className="mt-10 bg-white/10 backdrop-blur-sm rounded-xl p-6">
              <h3 className="text-xl font-bold mb-4">Save Your Changes</h3>
              <div className="flex items-start">
                <AlertTriangle className="w-6 h-6 mr-4 flex-shrink-0" />
                <p>
                  Remember to click the "Save" or "Apply Changes" button after modifying any settings. 
                  Some settings may require you to confirm changes via email or re-enter your password 
                  for security reasons.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mobile App Settings */}
      <section className="py-16 bg-white">
        <div className="section-container">
          <div className="max-w-4xl mx-auto">
            <div className="flex flex-col lg:flex-row gap-10 items-center">
              <div className="lg:w-1/2">
                <h2 className="text-3xl font-bold mb-6">Mobile App Settings</h2>
                <p className="text-[#2E2E2E] mb-6">
                  The FreelanceNest mobile app has its own settings that can be configured independently 
                  from the web platform. However, most account settings will sync automatically.
                </p>
                
                <div className="space-y-4">
                  <div className="bg-[#ffeee3] p-4 rounded-lg">
                    <h4 className="font-semibold text-[#2E2E2E] mb-2">App-Specific Settings</h4>
                    <ul className="space-y-2">
                      <li className="flex items-start">
                        <CheckCircle className="w-5 h-5 text-[#FF6B00] mr-2 flex-shrink-0" />
                        <span className="text-[#2E2E2E]">Offline Mode Access</span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle className="w-5 h-5 text-[#FF6B00] mr-2 flex-shrink-0" />
                        <span className="text-[#2E2E2E]">Data Usage Controls</span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle className="w-5 h-5 text-[#FF6B00] mr-2 flex-shrink-0" />
                        <span className="text-[#2E2E2E]">Mobile-Specific Notifications</span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle className="w-5 h-5 text-[#FF6B00] mr-2 flex-shrink-0" />
                        <span className="text-[#2E2E2E]">Biometric Authentication</span>
                      </li>
                    </ul>
                  </div>
                  
                  <p className="text-[#2E2E2E]">
                    To access settings in the mobile app, tap on your profile icon in the bottom navigation 
                    bar and select "Settings" from the menu.
                  </p>
                  
                  <div className="flex space-x-4">
                    <button className="flex items-center px-4 py-2 bg-black text-white rounded-lg">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M17.6 9.48l1.84-3.18c.16-.31.04-.69-.26-.79-.29-.14-.68-.03-.84.29l-1.88 3.24c-2.86-1.21-6.08-1.21-8.94 0L5.65 5.67c-.19-.33-.58-.44-.87-.3-.28.13-.37.49-.22.8l1.85 3.18c-2.55 1.4-4.21 4.16-4.21 7.28h17.6c0-3.32-1.75-6.14-4.4-7.15zm-8.5 5.27c-.44 0-.8-.36-.8-.8 0-.44.36-.8.8-.8.44 0 .8.36.8.8 0 .44-.36.8-.8.8zm6.8 0c-.44 0-.8-.36-.8-.8 0-.44.36-.8.8-.8.44 0 .8.36.8.8 0 .44-.36.8-.8.8z"/>
                      </svg>
                      Android App
                    </button>
                    <button className="flex items-center px-4 py-2 bg-black text-white rounded-lg">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/>
                      </svg>
                      iOS App
                    </button>
                  </div>
                </div>
              </div>
              
              <div className="lg:w-1/2">
                <div className="bg-[#2E2E2E] rounded-3xl overflow-hidden shadow-xl p-2 w-64 mx-auto">
                  <div className="bg-[#2E2E2E] rounded-2xl overflow-hidden">
                    <div className="h-10 bg-[#2E2E2E] flex items-center justify-center">
                      <div className="w-20 h-4 bg-black rounded-full"></div>
                    </div>
                    
                    <div className="bg-white h-96 pt-6 pb-2 px-4">
                      <div className="text-center mb-4">
                        <h5 className="font-bold text-sm">Settings</h5>
                      </div>
                      
                      <div className="space-y-3">
                        <div className="flex items-center justify-between p-2 bg-[#ffeee3] rounded">
                          <div className="flex items-center">
                            <div className="bg-[#ffeee3] p-1.5 rounded-full">
                              <Bell className="w-4 h-4 text-[#FF6B00]" />
                            </div>
                            <span className="text-xs ml-2">Notifications</span>
                          </div>
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-[#ffeee3]" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                          </svg>
                        </div>
                        
                        <div className="flex items-center justify-between p-2 bg-[#ffeee3] rounded">
                          <div className="flex items-center">
                            <div className="bg-[#ffeee3] p-1.5 rounded-full">
                              <Settings className="w-4 h-4 text-[#FF6B00]" />
                            </div>
                            <span className="text-xs ml-2 font-medium text-[#2E2E2E]">Account Preferences</span>
                          </div>
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-[#FF6B00]" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                          </svg>
                        </div>
                        
                        <div className="flex items-center justify-between p-2 bg-[#ffeee3] rounded">
                          <div className="flex items-center">
                            <div className="bg-[#ffeee3] p-1.5 rounded-full">
                              <Lock className="w-4 h-4 text-[#FF6B00]" />
                            </div>
                            <span className="text-xs ml-2">Privacy & Security</span>
                          </div>
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-[#ffeee3]" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                          </svg>
                        </div>
                        
                        <div className="flex items-center justify-between p-2 bg-[#ffeee3] rounded">
                          <div className="flex items-center">
                            <div className="bg-[#ffeee3] p-1.5 rounded-full">
                              <Eye className="w-4 h-4 text-[#FF6B00]" />
                            </div>
                            <span className="text-xs ml-2">Appearance</span>
                          </div>
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-[#ffeee3]" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                          </svg>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Common Questions */}
      <section className="py-16 bg-[#ffeee3]">
        <div className="section-container">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold mb-12 text-center">Frequently Asked Questions</h2>
            
            <div className="space-y-6">
              <div className="bg-white rounded-xl p-6 shadow-sm">
                <h3 className="text-xl font-bold mb-3">How do I change my password?</h3>
                <p className="text-[#2E2E2E]">
                  Go to Settings {'->'} Privacy & Security {'->'} Password Management. You'll need to enter your current 
                  password before setting a new one. For security reasons, password changes will trigger an email 
                  notification to your registered email address.
                </p>
              </div>
              
              <div className="bg-white rounded-xl p-6 shadow-sm">
                <h3 className="text-xl font-bold mb-3">Can I change my username or URL?</h3>
                <p className="text-[#2E2E2E]">
                  Yes, you can change your display name and username once every 30 days. Go to Settings {'->'} Account 
                  Preferences {'->'} Profile Information. Note that changing your username will also change your profile URL, 
                  so previous links to your profile may no longer work.
                </p>
              </div>
              
              <div className="bg-white rounded-xl p-6 shadow-sm">
                <h3 className="text-xl font-bold mb-3">How do I connect third-party accounts?</h3>
                <p className="text-[#2E2E2E]">
                  Navigate to Settings {'->'} Account Connections. Here you can connect various accounts like Google, 
                  LinkedIn, GitHub, and others. This allows for easier login and can help showcase your work from 
                  these platforms on your FreelanceNest profile.
                </p>
              </div>
              
              <div className="bg-white rounded-xl p-6 shadow-sm">
                <h3 className="text-xl font-bold mb-3">How can I disable email notifications?</h3>
                <p className="text-[#2E2E2E]">
                  Go to Settings {'->'} Notification Preferences {'->'} Email Notifications. You can disable all emails, 
                  or selectively choose which types of notifications to receive by email. Note that some critical 
                  security notifications cannot be disabled.
                </p>
              </div>
              
              <div className="bg-white rounded-xl p-6 shadow-sm">
                <h3 className="text-xl font-bold mb-3">Can I permanently delete my account?</h3>
                <p className="text-[#2E2E2E]">
                  Yes, go to Settings {'->'} Account Preferences {'->'} Account Management {'->'} Delete Account. You'll need to 
                  confirm your decision and may need to complete ongoing projects or resolve any account balances 
                  before deletion can be processed. Account deletion is permanent and cannot be undone.
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
            <h2 className="text-3xl font-bold mb-6">Ready to Customize Your Experience?</h2>
            <p className="text-xl text-[#2E2E2E] mb-8">
              Configure your settings to make FreelanceNest work perfectly for you
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link 
                to="/settings" 
                className="px-6 py-3 bg-[#ffeee3] hover:bg-[#ffeee3] text-white font-medium rounded-lg transition-colors"
              >
                Update Your Settings
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
                to="/resources/help/security-privacy" 
                className="flex items-center text-[#FF6B00] hover:text-[#2E2E2E] font-medium"
              >
                Next Topic: Security & Privacy
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                </svg>
              </Link>
              
              <span className="hidden sm:block text-[#ffeee3]">|</span>
              
              <Link 
                to="/resources/help/payments-finances" 
                className="flex items-center text-[#FF6B00] hover:text-[#2E2E2E] font-medium"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
                Previous: Payments & Finances
              </Link>
            </div>
            
            <div className="mt-12 bg-white rounded-xl p-6 shadow-sm flex items-center justify-center">
              <MessageSquare className="h-6 w-6 text-[#2E2E2E] mr-3" />
              <p className="text-[#2E2E2E]">
                Need help with specific settings? <Link to="/contact-support" className="text-[#FF6B00] font-medium">Contact our support team</Link>
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default PlatformSettingsHelpPage;














