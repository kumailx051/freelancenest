import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Shield, Lock, AlertTriangle, CheckCircle, Eye, Database, Key, FileCheck, User, MessageSquare, ExternalLink } from 'lucide-react';

// Security features data
const securityFeatures = [
  {
    title: "Two-Factor Authentication (2FA)",
    description: "Add an extra layer of security beyond just a password",
    icon: <Key className="w-6 h-6" />,
    color: "bg-[#ffeee3] text-[#FF6B00]",
    details: [
      "SMS verification codes",
      "Authentication apps (Google Authenticator, Authy)",
      "Email verification codes",
      "Hardware security keys (YubiKey, etc.)"
    ]
  },
  {
    title: "Data Encryption",
    description: "Your data is encrypted both in transit and at rest",
    icon: <Lock className="w-6 h-6" />,
    color: "bg-[#ffeee3] text-[#FF6B00]",
    details: [
      "End-to-end encryption for messages",
      "Secure payment information (PCI-DSS compliant)",
      "Encrypted file storage",
      "SSL/TLS for all data transmission"
    ]
  },
  {
    title: "Privacy Controls",
    description: "Manage what information is visible to others",
    icon: <Eye className="w-6 h-6" />,
    color: "bg-[#ffeee3] text-[#FF6B00]",
    details: [
      "Profile visibility settings",
      "Project history privacy",
      "Earning information visibility",
      "Contact information controls"
    ]
  },
  {
    title: "Data Management",
    description: "Control your personal data and how it's used",
    icon: <Database className="w-6 h-6" />,
    color: "bg-[#ffeee3] text-[#FF6B00]",
    details: [
      "Data export capability",
      "Right to be forgotten (account deletion)",
      "Usage data controls",
      "Third-party data sharing settings"
    ]
  }
];

// Security tips
const securityTips = [
  {
    tip: "Use a strong, unique password for your FreelanceNest account",
    icon: <Shield className="h-5 w-5" />
  },
  {
    tip: "Enable Two-Factor Authentication for an extra layer of security",
    icon: <Lock className="h-5 w-5" />
  },
  {
    tip: "Regularly review your recent account activity for any suspicious logins",
    icon: <AlertTriangle className="h-5 w-5" />
  },
  {
    tip: "Never share your password or verification codes with anyone, including FreelanceNest support",
    icon: <User className="h-5 w-5" />
  },
  {
    tip: "Be cautious of phishing attempts - FreelanceNest will never ask for your password via email",
    icon: <AlertTriangle className="h-5 w-5" />
  },
  {
    tip: "Log out when using shared or public computers",
    icon: <Shield className="h-5 w-5" />
  }
];

const SecurityPrivacyHelpPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-[#ffeee3]">
      {/* Hero Section */}
      <section className="pt-40 pb-16 bg-gradient-to-r from-indigo-600 to-blue-600">
        <div className="section-container">
          <div className="max-w-4xl mx-auto">
            <Link 
              to="/resources/help-center" 
              className="inline-flex items-center text-[#FF6B00] hover:text-white mb-6 transition-colors"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Help Center
            </Link>
            <div>
              <span className="bg-[#FF6B00]/30 text-white text-sm font-medium px-3 py-1 rounded-full">Help Center</span>
              <h1 className="text-4xl md:text-5xl font-bold text-white mt-3 mb-6">Security & Privacy</h1>
              <p className="text-xl text-[#FF6B00] max-w-3xl">
                Learn how we protect your data and how you can enhance your account security on FreelanceNest
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Security Overview */}
      <section className="py-16 -mt-8">
        <div className="section-container">
          <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-md p-8">
            <h2 className="text-2xl font-bold text-[#2E2E2E] mb-6">Your Security is Our Priority</h2>
            <div className="flex flex-col md:flex-row items-start gap-8">
              <div className="md:w-7/12">
                <p className="text-[#2E2E2E] mb-6">
                  At FreelanceNest, we take security and privacy seriously. Our platform is built with multiple layers 
                  of protection to keep your account, personal information, and transactions safe.
                </p>
                
                <div className="flex items-center p-4 bg-[#ffeee3] rounded-lg mb-6">
                  <Shield className="h-8 w-8 text-[#FF6B00] mr-4 flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold text-[#2E2E2E]">Our Security Promise</h3>
                    <p className="text-[#FF6B00] text-sm">
                      We implement industry-leading security practices and regularly update our systems to protect 
                      against the latest threats.
                    </p>
                  </div>
                </div>

                <h3 className="font-bold text-[#2E2E2E] mb-3">FreelanceNest Security Certifications:</h3>
                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div className="flex items-center bg-[#ffeee3] p-3 rounded">
                    <div className="bg-[#ffeee3] p-1.5 rounded-full mr-3">
                      <FileCheck className="h-4 w-4 text-[#FF6B00]" />
                    </div>
                    <span className="text-sm">ISO 27001 Certified</span>
                  </div>
                  <div className="flex items-center bg-[#ffeee3] p-3 rounded">
                    <div className="bg-[#ffeee3] p-1.5 rounded-full mr-3">
                      <FileCheck className="h-4 w-4 text-[#FF6B00]" />
                    </div>
                    <span className="text-sm">GDPR Compliant</span>
                  </div>
                  <div className="flex items-center bg-[#ffeee3] p-3 rounded">
                    <div className="bg-[#ffeee3] p-1.5 rounded-full mr-3">
                      <FileCheck className="h-4 w-4 text-[#FF6B00]" />
                    </div>
                    <span className="text-sm">PCI-DSS Compliant</span>
                  </div>
                  <div className="flex items-center bg-[#ffeee3] p-3 rounded">
                    <div className="bg-[#ffeee3] p-1.5 rounded-full mr-3">
                      <FileCheck className="h-4 w-4 text-[#FF6B00]" />
                    </div>
                    <span className="text-sm">SOC 2 Type II</span>
                  </div>
                </div>
                
                <div className="bg-[#ffeee3] border-l-4 border-[#FF9F45] p-4">
                  <div className="flex">
                    <div className="flex-shrink-0">
                      <AlertTriangle className="h-5 w-5 text-[#FF6B00]" />
                    </div>
                    <div className="ml-3">
                      <h4 className="text-sm font-medium text-[#2E2E2E]">Important Notice</h4>
                      <div className="mt-2 text-sm text-[#2E2E2E]">
                        <p>
                          FreelanceNest staff will never ask for your password, authentication codes, or personal financial 
                          information. Report any suspicious communications immediately.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="md:w-5/12">
                <div className="bg-gradient-to-br from-indigo-500 to-blue-600 rounded-2xl p-6 text-white shadow-lg">
                  <div className="flex justify-between items-start mb-6">
                    <div className="bg-white/20 p-3 rounded-lg">
                      <Shield className="h-8 w-8" />
                    </div>
                    <div className="bg-[#FF6B00] px-3 py-1 rounded-full text-xs font-semibold">Active</div>
                  </div>
                  <h3 className="text-xl font-bold mb-2">Account Security Status</h3>
                  <p className="text-[#FF6B00] text-sm mb-6">Your account security features and settings status</p>
                  
                  <div className="space-y-4">
                    <div className="flex justify-between items-center p-3 bg-white/10 backdrop-blur-sm rounded-lg">
                      <div className="flex items-center">
                        <Key className="h-5 w-5 mr-3" />
                        <span>Password Strength</span>
                      </div>
                      <div className="px-2 py-1 bg-[#ffeee3]/20 text-[#2E2E2E] rounded text-xs font-semibold">Strong</div>
                    </div>
                    
                    <div className="flex justify-between items-center p-3 bg-white/10 backdrop-blur-sm rounded-lg">
                      <div className="flex items-center">
                        <Lock className="h-5 w-5 mr-3" />
                        <span>Two-Factor Auth</span>
                      </div>
                      <div className="px-2 py-1 bg-[#ffeee3]/20 text-[#2E2E2E] rounded text-xs font-semibold">Enabled</div>
                    </div>
                    
                    <div className="flex justify-between items-center p-3 bg-white/10 backdrop-blur-sm rounded-lg">
                      <div className="flex items-center">
                        <Database className="h-5 w-5 mr-3" />
                        <span>Recent Logins</span>
                      </div>
                      <div className="px-2 py-1 bg-white/10 text-white rounded text-xs font-semibold">View All</div>
                    </div>
                    
                    <div className="flex justify-between items-center p-3 bg-white/10 backdrop-blur-sm rounded-lg">
                      <div className="flex items-center">
                        <Eye className="h-5 w-5 mr-3" />
                        <span>Privacy Settings</span>
                      </div>
                      <div className="px-2 py-1 bg-white/10 text-white rounded text-xs font-semibold">Configure</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Security Features */}
      <section className="py-16">
        <div className="section-container">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-3xl font-bold mb-12 text-center">Our Security & Privacy Features</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {securityFeatures.map((feature, index) => (
                <div key={index} className="bg-white rounded-xl shadow-sm overflow-hidden">
                  <div className={`${feature.color} p-6`}>
                    <div className="flex items-center mb-2">
                      <div className="bg-white/20 p-2 rounded-lg mr-3">
                        {feature.icon}
                      </div>
                      <h3 className="text-xl font-bold">{feature.title}</h3>
                    </div>
                    <p className="opacity-90">{feature.description}</p>
                  </div>
                  
                  <div className="p-6">
                    <h4 className="font-semibold text-[#2E2E2E] mb-4">Key Features:</h4>
                    <ul className="space-y-3">
                      {feature.details.map((detail, i) => (
                        <li key={i} className="flex items-start">
                          <CheckCircle className="h-5 w-5 text-[#FF6B00] mr-2 flex-shrink-0" />
                          <span className="text-[#2E2E2E]">{detail}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
      
      {/* Setting Up 2FA */}
      <section className="py-16 bg-gradient-to-r from-indigo-50 to-blue-50" id="two-factor-authentication">
        <div className="section-container">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold mb-8 text-center">Setting Up Two-Factor Authentication</h2>
            <p className="text-lg text-[#2E2E2E] text-center mb-10 max-w-3xl mx-auto">
              Two-factor authentication adds an extra layer of security to your account. Here's how to set it up:
            </p>
            
            <div className="bg-white rounded-xl shadow-md overflow-hidden">
              <div className="md:flex">
                <div className="md:w-1/2 bg-[#FF6B00] p-8 text-white">
                  <h3 className="text-2xl font-bold mb-4">Why Use 2FA?</h3>
                  <ul className="space-y-4">
                    <li className="flex items-start">
                      <CheckCircle className="h-5 w-5 mr-3 flex-shrink-0" />
                      <span>Protects against password theft</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="h-5 w-5 mr-3 flex-shrink-0" />
                      <span>Prevents unauthorized access even if your password is compromised</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="h-5 w-5 mr-3 flex-shrink-0" />
                      <span>Secures your earnings and personal information</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="h-5 w-5 mr-3 flex-shrink-0" />
                      <span>Protects your client relationships and professional reputation</span>
                    </li>
                  </ul>
                  
                  <div className="mt-6 p-4 bg-white/10 backdrop-blur-sm rounded-lg">
                    <div className="flex items-start">
                      <AlertTriangle className="h-5 w-5 mr-3 flex-shrink-0" />
                      <p className="text-sm">
                        Accounts with 2FA enabled are up to 99% less likely to be compromised compared to 
                        accounts protected by only a password.
                      </p>
                    </div>
                  </div>
                </div>
                
                <div className="md:w-1/2 p-8">
                  <h3 className="text-xl font-bold mb-6">Step-by-Step Setup</h3>
                  
                  <ol className="space-y-6">
                    <li className="flex items-start">
                      <div className="bg-[#ffeee3] rounded-full w-8 h-8 flex items-center justify-center text-[#FF6B00] font-bold text-lg flex-shrink-0 mt-0.5 mr-3">
                        1
                      </div>
                      <div>
                        <h4 className="font-semibold mb-1">Access Security Settings</h4>
                        <p className="text-[#2E2E2E] text-sm">
                          Go to Account Settings {'->'} Security {'->'} Two-Factor Authentication
                        </p>
                      </div>
                    </li>
                    
                    <li className="flex items-start">
                      <div className="bg-[#ffeee3] rounded-full w-8 h-8 flex items-center justify-center text-[#FF6B00] font-bold text-lg flex-shrink-0 mt-0.5 mr-3">
                        2
                      </div>
                      <div>
                        <h4 className="font-semibold mb-1">Choose Authentication Method</h4>
                        <p className="text-[#2E2E2E] text-sm">
                          Select from SMS, Authentication App, or Email verification methods
                        </p>
                      </div>
                    </li>
                    
                    <li className="flex items-start">
                      <div className="bg-[#ffeee3] rounded-full w-8 h-8 flex items-center justify-center text-[#FF6B00] font-bold text-lg flex-shrink-0 mt-0.5 mr-3">
                        3
                      </div>
                      <div>
                        <h4 className="font-semibold mb-1">Set Up Your Selected Method</h4>
                        <p className="text-[#2E2E2E] text-sm">
                          For Auth App: Scan QR code with Google Authenticator or Authy<br />
                          For SMS: Verify your phone number<br />
                          For Email: Confirm access to your email
                        </p>
                      </div>
                    </li>
                    
                    <li className="flex items-start">
                      <div className="bg-[#ffeee3] rounded-full w-8 h-8 flex items-center justify-center text-[#FF6B00] font-bold text-lg flex-shrink-0 mt-0.5 mr-3">
                        4
                      </div>
                      <div>
                        <h4 className="font-semibold mb-1">Verify & Complete</h4>
                        <p className="text-[#2E2E2E] text-sm">
                          Enter the code you receive to verify setup, then save your backup codes in a secure location
                        </p>
                      </div>
                    </li>
                  </ol>
                  
                  <div className="mt-8">
                    <Link 
                      to="/settings/security"
                      className="inline-flex items-center px-4 py-2 bg-[#FF6B00] hover:bg-[#ffeee3] text-white rounded-lg transition-colors"
                    >
                      Set Up 2FA Now
                      <ExternalLink className="ml-2 h-4 w-4" />
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Privacy Settings */}
      <section className="py-16 bg-white" id="privacy-settings">
        <div className="section-container">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold mb-8 text-center">Managing Your Privacy</h2>
            <p className="text-lg text-[#2E2E2E] text-center mb-10 max-w-3xl mx-auto">
              Control what information is visible to clients, other freelancers, and the public
            </p>
            
            <div className="bg-[#ffeee3] rounded-xl p-8 mb-10">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-xl font-bold mb-6">Profile Privacy Controls</h3>
                  
                  <div className="space-y-6">
                    <div className="bg-white p-4 rounded-lg shadow-sm">
                      <div className="flex justify-between items-center mb-3">
                        <h4 className="font-semibold text-[#2E2E2E]">Profile Visibility</h4>
                        <span className="bg-[#ffeee3] text-[#2E2E2E] px-2 py-0.5 rounded text-xs font-medium">Configurable</span>
                      </div>
                      <p className="text-[#2E2E2E] text-sm mb-3">
                        Control who can view your complete profile information, work history, and portfolio.
                      </p>
                      <div className="flex gap-2">
                        <span className="bg-[#ffeee3] text-[#FF6B00] px-3 py-1 rounded-full text-xs">Public</span>
                        <span className="bg-[#ffeee3] text-[#FF6B00] px-3 py-1 rounded-full text-xs">Clients Only</span>
                        <span className="bg-[#ffeee3] text-[#FF6B00] px-3 py-1 rounded-full text-xs">Private</span>
                      </div>
                    </div>
                    
                    <div className="bg-white p-4 rounded-lg shadow-sm">
                      <div className="flex justify-between items-center mb-3">
                        <h4 className="font-semibold text-[#2E2E2E]">Earnings Privacy</h4>
                        <span className="bg-[#ffeee3] text-[#2E2E2E] px-2 py-0.5 rounded text-xs font-medium">Configurable</span>
                      </div>
                      <p className="text-[#2E2E2E] text-sm mb-3">
                        Choose whether to show your earnings and rates publicly on your profile.
                      </p>
                      <div className="flex gap-2">
                        <span className="bg-[#ffeee3] text-[#FF6B00] px-3 py-1 rounded-full text-xs">Show</span>
                        <span className="bg-[#ffeee3] text-[#FF6B00] px-3 py-1 rounded-full text-xs">Hide</span>
                      </div>
                    </div>
                    
                    <div className="bg-white p-4 rounded-lg shadow-sm">
                      <div className="flex justify-between items-center mb-3">
                        <h4 className="font-semibold text-[#2E2E2E]">Project History</h4>
                        <span className="bg-[#ffeee3] text-[#2E2E2E] px-2 py-0.5 rounded text-xs font-medium">Configurable</span>
                      </div>
                      <p className="text-[#2E2E2E] text-sm mb-3">
                        Manage which completed projects are visible on your public profile.
                      </p>
                      <div className="flex gap-2">
                        <span className="bg-[#ffeee3] text-[#FF6B00] px-3 py-1 rounded-full text-xs">All Projects</span>
                        <span className="bg-[#ffeee3] text-[#FF6B00] px-3 py-1 rounded-full text-xs">Selected Projects</span>
                        <span className="bg-[#ffeee3] text-[#FF6B00] px-3 py-1 rounded-full text-xs">None</span>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div>
                  <h3 className="text-xl font-bold mb-6">Data & Communication Privacy</h3>
                  
                  <div className="space-y-6">
                    <div className="bg-white p-4 rounded-lg shadow-sm">
                      <div className="flex justify-between items-center mb-3">
                        <h4 className="font-semibold text-[#2E2E2E]">Contact Information</h4>
                        <span className="bg-[#ffeee3] text-[#2E2E2E] px-2 py-0.5 rounded text-xs font-medium">Configurable</span>
                      </div>
                      <p className="text-[#2E2E2E] text-sm mb-3">
                        Control who can see your email, phone number, and other contact details.
                      </p>
                      <div className="flex gap-2">
                        <span className="bg-[#ffeee3] text-[#FF6B00] px-3 py-1 rounded-full text-xs">Active Clients Only</span>
                        <span className="bg-[#ffeee3] text-[#FF6B00] px-3 py-1 rounded-full text-xs">Platform Protected</span>
                      </div>
                    </div>
                    
                    <div className="bg-white p-4 rounded-lg shadow-sm">
                      <div className="flex justify-between items-center mb-3">
                        <h4 className="font-semibold text-[#2E2E2E]">Activity Status</h4>
                        <span className="bg-[#ffeee3] text-[#2E2E2E] px-2 py-0.5 rounded text-xs font-medium">Configurable</span>
                      </div>
                      <p className="text-[#2E2E2E] text-sm mb-3">
                        Choose whether others can see when you're online or last active on the platform.
                      </p>
                      <div className="flex gap-2">
                        <span className="bg-[#ffeee3] text-[#FF6B00] px-3 py-1 rounded-full text-xs">Show to All</span>
                        <span className="bg-[#ffeee3] text-[#FF6B00] px-3 py-1 rounded-full text-xs">Clients Only</span>
                        <span className="bg-[#ffeee3] text-[#FF6B00] px-3 py-1 rounded-full text-xs">Hide</span>
                      </div>
                    </div>
                    
                    <div className="bg-white p-4 rounded-lg shadow-sm">
                      <div className="flex justify-between items-center mb-3">
                        <h4 className="font-semibold text-[#2E2E2E]">Data Usage & Tracking</h4>
                        <span className="bg-[#ffeee3] text-[#2E2E2E] px-2 py-0.5 rounded text-xs font-medium">Configurable</span>
                      </div>
                      <p className="text-[#2E2E2E] text-sm mb-3">
                        Control how your data is used for platform improvements and personalization.
                      </p>
                      <div className="flex gap-2">
                        <span className="bg-[#ffeee3] text-[#FF6B00] px-3 py-1 rounded-full text-xs">Essential Only</span>
                        <span className="bg-[#ffeee3] text-[#FF6B00] px-3 py-1 rounded-full text-xs">Performance</span>
                        <span className="bg-[#ffeee3] text-[#FF6B00] px-3 py-1 rounded-full text-xs">Personalization</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="mt-8">
                <Link 
                  to="/settings/privacy"
                  className="inline-flex items-center px-4 py-2 bg-[#FF6B00] hover:bg-[#ffeee3] text-white rounded-lg transition-colors"
                >
                  Manage Privacy Settings
                  <ExternalLink className="ml-2 h-4 w-4" />
                </Link>
              </div>
            </div>
            
            <div className="bg-[#ffeee3] border-l-4 border-[#ffeee3] p-4">
              <div className="flex">
                <div className="flex-shrink-0">
                  <AlertTriangle className="h-5 w-5 text-[#FF6B00]" />
                </div>
                <div className="ml-3">
                  <h4 className="text-sm font-medium text-[#FF6B00]">Privacy & Terms of Service</h4>
                  <div className="mt-2 text-sm text-[#FF6B00]">
                    <p>
                      Be sure to review our <Link to="/privacy-policy" className="underline font-medium">Privacy Policy</Link> and 
                      <Link to="/terms-of-service" className="underline font-medium"> Terms of Service</Link> to 
                      understand how we collect, use, and protect your data.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Security Tips */}
      <section className="py-16 bg-[#FF9F45] text-white">
        <div className="section-container">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold mb-8 text-center">Security Best Practices</h2>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              {securityTips.map((tip, index) => (
                <div key={index} className="bg-white/10 backdrop-blur-sm rounded-xl p-6 flex items-start">
                  <div className="bg-white/20 p-2 rounded-full mr-4 flex-shrink-0">
                    {tip.icon}
                  </div>
                  <p className="text-sm">{tip.tip}</p>
                </div>
              ))}
            </div>
            
            <div className="mt-10 bg-white/10 backdrop-blur-sm rounded-xl p-6">
              <h3 className="text-xl font-bold mb-4">Recognize Phishing Attempts</h3>
              <div className="space-y-4">
                <p>
                  Scammers may impersonate FreelanceNest to steal your login credentials or personal information. 
                  Always verify communications before taking action.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-[#FF6B00]/30 p-4 rounded-lg">
                    <h4 className="font-semibold mb-2 flex items-center">
                      <AlertTriangle className="h-5 w-5 mr-2" />
                      Warning Signs
                    </h4>
                    <ul className="space-y-2 text-sm">
                      <li className="flex items-start">
                        <span className="text-[#2E2E2E] mr-2">âœ•</span>
                        Urgent requests for personal information
                      </li>
                      <li className="flex items-start">
                        <span className="text-[#2E2E2E] mr-2">âœ•</span>
                        Suspicious links or attachments
                      </li>
                      <li className="flex items-start">
                        <span className="text-[#2E2E2E] mr-2">âœ•</span>
                        Poor grammar or spelling
                      </li>
                      <li className="flex items-start">
                        <span className="text-[#2E2E2E] mr-2">âœ•</span>
                        Email addresses that look similar but not identical to FreelanceNest
                      </li>
                    </ul>
                  </div>
                  
                  <div className="bg-[#FF6B00]/30 p-4 rounded-lg">
                    <h4 className="font-semibold mb-2 flex items-center">
                      <CheckCircle className="h-5 w-5 mr-2" />
                      Staying Safe
                    </h4>
                    <ul className="space-y-2 text-sm">
                      <li className="flex items-start">
                        <span className="text-[#2E2E2E] mr-2">âœ“</span>
                        Always log in directly at freelancenest.com
                      </li>
                      <li className="flex items-start">
                        <span className="text-[#2E2E2E] mr-2">âœ“</span>
                        Check email sender addresses carefully
                      </li>
                      <li className="flex items-start">
                        <span className="text-[#2E2E2E] mr-2">âœ“</span>
                        Hover over links before clicking to verify URLs
                      </li>
                      <li className="flex items-start">
                        <span className="text-[#2E2E2E] mr-2">âœ“</span>
                        Report suspicious messages to security@freelancenest.com
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Account Recovery */}
      <section className="py-16 bg-[#ffeee3]" id="account-recovery">
        <div className="section-container">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold mb-8 text-center">Account Recovery Options</h2>
            
            <div className="bg-white p-8 rounded-xl shadow-md">
              <div className="md:flex gap-8 items-start">
                <div className="md:w-1/2">
                  <h3 className="text-xl font-bold mb-4">If You Can't Log In</h3>
                  <p className="text-[#2E2E2E] mb-6">
                    If you're having trouble accessing your account, we offer several recovery methods:
                  </p>
                  
                  <div className="space-y-6">
                    <div>
                      <h4 className="font-semibold text-[#2E2E2E] mb-2">Password Reset</h4>
                      <p className="text-[#2E2E2E] text-sm mb-2">
                        Click "Forgot Password" on the login page to receive a reset link via your verified email address.
                      </p>
                      <Link 
                        to="/forgot-password"
                        className="text-[#FF6B00] font-medium text-sm hover:text-[#FF6B00] transition-colors"
                      >
                        Reset your password â†’
                      </Link>
                    </div>
                    
                    <div>
                      <h4 className="font-semibold text-[#2E2E2E] mb-2">Lost Access to 2FA</h4>
                      <p className="text-[#2E2E2E] text-sm mb-2">
                        If you've lost access to your authentication device, you can use your backup codes to regain access.
                      </p>
                      <Link 
                        to="/2fa-recovery"
                        className="text-[#FF6B00] font-medium text-sm hover:text-[#FF6B00] transition-colors"
                      >
                        Recover with backup codes â†’
                      </Link>
                    </div>
                    
                    <div>
                      <h4 className="font-semibold text-[#2E2E2E] mb-2">Account Verification</h4>
                      <p className="text-[#2E2E2E] text-sm mb-2">
                        For security issues requiring identity verification, we may ask for additional documentation.
                      </p>
                      <Link 
                        to="/account-verification"
                        className="text-[#FF6B00] font-medium text-sm hover:text-[#FF6B00] transition-colors"
                      >
                        Learn about account verification â†’
                      </Link>
                    </div>
                  </div>
                </div>
                
                <div className="md:w-1/2 mt-8 md:mt-0">
                  <div className="bg-[#ffeee3] border border-[#ffeee3] rounded-lg p-6">
                    <h3 className="text-lg font-semibold mb-4">Backup Authentication Methods</h3>
                    <p className="text-[#2E2E2E] mb-6">
                      We recommend setting up multiple recovery options to ensure you can always access your account:
                    </p>
                    
                    <div className="space-y-4">
                      <div className="flex items-start">
                        <div className="bg-[#ffeee3] p-1.5 rounded-full mr-3 flex-shrink-0">
                          <CheckCircle className="h-4 w-4 text-[#FF6B00]" />
                        </div>
                        <div>
                          <h4 className="font-medium text-[#2E2E2E]">Backup Email Address</h4>
                          <p className="text-sm text-[#2E2E2E]">Add a secondary email for recovery</p>
                        </div>
                      </div>
                      
                      <div className="flex items-start">
                        <div className="bg-[#ffeee3] p-1.5 rounded-full mr-3 flex-shrink-0">
                          <CheckCircle className="h-4 w-4 text-[#FF6B00]" />
                        </div>
                        <div>
                          <h4 className="font-medium text-[#2E2E2E]">Recovery Phone Number</h4>
                          <p className="text-sm text-[#2E2E2E]">Receive SMS codes for account verification</p>
                        </div>
                      </div>
                      
                      <div className="flex items-start">
                        <div className="bg-[#ffeee3] p-1.5 rounded-full mr-3 flex-shrink-0">
                          <CheckCircle className="h-4 w-4 text-[#FF6B00]" />
                        </div>
                        <div>
                          <h4 className="font-medium text-[#2E2E2E]">Generate Backup Codes</h4>
                          <p className="text-sm text-[#2E2E2E]">Store these securely for emergency access</p>
                        </div>
                      </div>
                      
                      <div className="flex items-start">
                        <div className="bg-[#ffeee3] p-1.5 rounded-full mr-3 flex-shrink-0">
                          <CheckCircle className="h-4 w-4 text-[#FF6B00]" />
                        </div>
                        <div>
                          <h4 className="font-medium text-[#2E2E2E]">Trusted Contacts</h4>
                          <p className="text-sm text-[#2E2E2E]">Add trusted colleagues who can verify your identity</p>
                        </div>
                      </div>
                    </div>
                    
                    <div className="mt-6">
                      <Link 
                        to="/settings/security/recovery"
                        className="inline-flex items-center px-4 py-2 bg-[#FF6B00] hover:bg-[#ffeee3] text-white rounded-lg transition-colors text-sm"
                      >
                        Set Up Recovery Options
                        <ExternalLink className="ml-2 h-4 w-4" />
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="mt-8 border-t border-[#ffeee3] pt-6">
                <div className="flex items-start bg-[#ffeee3] p-4 rounded-lg">
                  <AlertTriangle className="h-6 w-6 text-[#FF6B00] mr-4 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold text-[#2E2E2E]">Account Locked?</h4>
                    <p className="text-sm text-[#2E2E2E] mb-2">
                      If your account has been locked due to suspicious activity or multiple failed login attempts, 
                      please contact our support team for assistance.
                    </p>
                    <Link 
                      to="/contact-support"
                      className="text-[#FF6B00] font-medium text-sm hover:text-[#FF6B00] transition-colors"
                    >
                      Contact Support â†’
                    </Link>
                  </div>
                </div>
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
              <div className="bg-[#ffeee3] rounded-xl p-6 shadow-sm">
                <h3 className="text-xl font-bold mb-3">How is my payment information protected?</h3>
                <p className="text-[#2E2E2E]">
                  We use industry-standard encryption and comply with PCI-DSS requirements to protect your payment information. 
                  Your complete credit card details are never stored on our servers. Instead, we use tokenization methods through 
                  our secure payment processors to handle transactions.
                </p>
              </div>
              
              <div className="bg-[#ffeee3] rounded-xl p-6 shadow-sm">
                <h3 className="text-xl font-bold mb-3">What happens if I detect unauthorized account activity?</h3>
                <p className="text-[#2E2E2E]">
                  If you notice any suspicious activity on your account, immediately:
                </p>
                <ol className="mt-2 ml-6 list-decimal text-[#2E2E2E] space-y-1">
                  <li>Change your password</li>
                  <li>Enable two-factor authentication if not already active</li>
                  <li>Review your recent activities and transactions</li>
                  <li>Contact our support team at security@freelancenest.com</li>
                </ol>
              </div>
              
              <div className="bg-[#ffeee3] rounded-xl p-6 shadow-sm">
                <h3 className="text-xl font-bold mb-3">How does FreelanceNest handle data privacy?</h3>
                <p className="text-[#2E2E2E]">
                  FreelanceNest complies with GDPR and other regional data protection laws. We only collect data necessary 
                  for providing our services. You can view and download your personal data, and request deletion under 
                  applicable laws. Our complete data practices are detailed in our Privacy Policy.
                </p>
              </div>
              
              <div className="bg-[#ffeee3] rounded-xl p-6 shadow-sm">
                <h3 className="text-xl font-bold mb-3">Is it safe to upload my identification documents?</h3>
                <p className="text-[#2E2E2E]">
                  Yes. Any identity verification documents you upload are secured with encryption and accessible only to 
                  authorized personnel for verification purposes. Documents are stored using secure cloud infrastructure 
                  with strict access controls. You can request deletion of your documents after verification is complete.
                </p>
              </div>
              
              <div className="bg-[#ffeee3] rounded-xl p-6 shadow-sm">
                <h3 className="text-xl font-bold mb-3">Do I need to update my security settings regularly?</h3>
                <p className="text-[#2E2E2E]">
                  While not required, we recommend reviewing your security settings every 3-6 months to ensure they still 
                  meet your needs. We also recommend changing your password at least every 6 months and monitoring your login 
                  activity regularly. You'll be notified automatically when important security settings need your attention.
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
            <h2 className="text-3xl font-bold mb-6">Take Action Today</h2>
            <p className="text-xl text-[#2E2E2E] mb-8">
              Enhance your account security with these important steps
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link 
                to="/settings/security" 
                className="px-6 py-3 bg-[#FF6B00] hover:bg-[#ffeee3] text-white font-medium rounded-lg transition-colors"
              >
                Review Your Security Settings
              </Link>
              <Link 
                to="/settings/privacy" 
                className="px-6 py-3 bg-white border border-[#ffeee3] hover:bg-[#ffeee3] text-[#2E2E2E] font-medium rounded-lg transition-colors"
              >
                Update Privacy Preferences
              </Link>
            </div>
            
            <div className="mt-12 flex flex-col sm:flex-row justify-center items-center gap-8">
              <Link 
                to="/resources/help/contact-support" 
                className="flex items-center text-[#FF6B00] hover:text-[#FF6B00] font-medium"
              >
                Next Topic: Contact Support
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                </svg>
              </Link>
              
              <span className="hidden sm:block text-[#ffeee3]">|</span>
              
              <Link 
                to="/resources/help/platform-settings" 
                className="flex items-center text-[#FF6B00] hover:text-[#FF6B00] font-medium"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
                Previous: Platform Settings
              </Link>
            </div>
            
            <div className="mt-12 bg-white rounded-xl p-6 shadow-sm flex items-center justify-center">
              <MessageSquare className="h-6 w-6 text-[#FF6B00] mr-3" />
              <p className="text-[#2E2E2E]">
                Need help with security concerns? <Link to="/contact-support" className="text-[#FF6B00] font-medium">Contact our security team</Link>
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default SecurityPrivacyHelpPage;
















