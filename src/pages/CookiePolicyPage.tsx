import React from 'react';
import { ArrowLeft, Cookie, Settings, Eye, ToggleLeft, ToggleRight, Trash2 } from 'lucide-react';
import { Link } from 'react-router-dom';

const CookiePolicyPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="bg-[#2E2E2E] py-20">
        <div className="section-container">
          <div className="max-w-4xl mx-auto text-center">
            <Link 
              to="/" 
              className="inline-flex items-center text-[#FF6B00] hover:text-[#FF9F45] transition-colors duration-200 mb-6"
            >
              <ArrowLeft className="w-5 h-5 mr-2" />
              Back to Home
            </Link>
            <div className="flex justify-center mb-6">
              <div className="bg-[#FF6B00] p-4 rounded-full">
                <Cookie className="w-8 h-8 text-white" />
              </div>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Cookie Policy
            </h1>
            <p className="text-xl text-[#ffeee3]">
              Learn about how we use cookies and similar technologies on our platform.
            </p>
            <div className="text-[#ffeee3] mt-4">
              Last updated: November 22, 2025
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="section-container py-16">
        <div className="max-w-4xl mx-auto">
          <div className="prose prose-lg max-w-none">
            
            {/* Introduction */}
            <div className="mb-12">
              <h2 className="text-2xl font-bold text-[#2E2E2E] mb-4 flex items-center">
                <Cookie className="w-6 h-6 text-[#FF6B00] mr-3" />
                What Are Cookies?
              </h2>
              <p className="text-[#2E2E2E]/80 leading-relaxed mb-4">
                Cookies are small text files that are placed on your device when you visit our website. They help us provide you with a better experience by remembering your preferences, analyzing how you use our site, and personalizing content and advertisements.
              </p>
              <p className="text-[#2E2E2E]/80 leading-relaxed">
                This Cookie Policy explains what cookies are, how we use them, and how you can manage your cookie preferences.
              </p>
            </div>

            {/* Types of Cookies */}
            <div className="mb-12">
              <h2 className="text-2xl font-bold text-[#2E2E2E] mb-4 flex items-center">
                <Settings className="w-6 h-6 text-[#FF6B00] mr-3" />
                Types of Cookies We Use
              </h2>
              
              <div className="space-y-6">
                <div className="bg-[#ffeee3] p-6 rounded-lg">
                  <h3 className="text-xl font-semibold text-[#2E2E2E] mb-3 flex items-center">
                    <div className="w-3 h-3 bg-green-500 rounded-full mr-3"></div>
                    Essential Cookies
                  </h3>
                  <p className="text-[#2E2E2E]/80 mb-3">
                    These cookies are necessary for the website to function properly and cannot be switched off.
                  </p>
                  <ul className="list-disc list-inside space-y-1 text-[#2E2E2E]/80 text-sm">
                    <li>User authentication and session management</li>
                    <li>Shopping cart functionality</li>
                    <li>Security and fraud prevention</li>
                    <li>Load balancing and website performance</li>
                  </ul>
                </div>

                <div className="bg-[#ffeee3] p-6 rounded-lg">
                  <h3 className="text-xl font-semibold text-[#2E2E2E] mb-3 flex items-center">
                    <div className="w-3 h-3 bg-blue-500 rounded-full mr-3"></div>
                    Performance Cookies
                  </h3>
                  <p className="text-[#2E2E2E]/80 mb-3">
                    These cookies help us understand how visitors interact with our website.
                  </p>
                  <ul className="list-disc list-inside space-y-1 text-[#2E2E2E]/80 text-sm">
                    <li>Page visit statistics and analytics</li>
                    <li>Error reporting and debugging</li>
                    <li>Website performance monitoring</li>
                    <li>User behavior analysis</li>
                  </ul>
                </div>

                <div className="bg-[#ffeee3] p-6 rounded-lg">
                  <h3 className="text-xl font-semibold text-[#2E2E2E] mb-3 flex items-center">
                    <div className="w-3 h-3 bg-purple-500 rounded-full mr-3"></div>
                    Functional Cookies
                  </h3>
                  <p className="text-[#2E2E2E]/80 mb-3">
                    These cookies enable enhanced functionality and personalization.
                  </p>
                  <ul className="list-disc list-inside space-y-1 text-[#2E2E2E]/80 text-sm">
                    <li>Language and region preferences</li>
                    <li>Theme and display settings</li>
                    <li>Remember your choices and preferences</li>
                    <li>Social media integration</li>
                  </ul>
                </div>

                <div className="bg-[#ffeee3] p-6 rounded-lg">
                  <h3 className="text-xl font-semibold text-[#2E2E2E] mb-3 flex items-center">
                    <div className="w-3 h-3 bg-orange-500 rounded-full mr-3"></div>
                    Marketing Cookies
                  </h3>
                  <p className="text-[#2E2E2E]/80 mb-3">
                    These cookies are used to deliver relevant advertisements and track campaign effectiveness.
                  </p>
                  <ul className="list-disc list-inside space-y-1 text-[#2E2E2E]/80 text-sm">
                    <li>Targeted advertising and retargeting</li>
                    <li>Ad performance measurement</li>
                    <li>Cross-site tracking prevention</li>
                    <li>Third-party advertising services</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Third-Party Cookies */}
            <div className="mb-12">
              <h2 className="text-2xl font-bold text-[#2E2E2E] mb-4 flex items-center">
                <Eye className="w-6 h-6 text-[#FF6B00] mr-3" />
                Third-Party Services
              </h2>
              <p className="text-[#2E2E2E]/80 leading-relaxed mb-6">
                We work with trusted third-party services that may also place cookies on your device:
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-[#2E2E2E] p-6 rounded-lg text-white">
                  <h3 className="text-lg font-semibold text-[#FF6B00] mb-3">Analytics Services</h3>
                  <ul className="space-y-2 text-[#ffeee3] text-sm">
                    <li>• Google Analytics</li>
                    <li>• Hotjar User Behavior</li>
                    <li>• Mixpanel Events</li>
                  </ul>
                </div>
                <div className="bg-[#2E2E2E] p-6 rounded-lg text-white">
                  <h3 className="text-lg font-semibold text-[#FF6B00] mb-3">Payment Processing</h3>
                  <ul className="space-y-2 text-[#ffeee3] text-sm">
                    <li>• Stripe Payment Gateway</li>
                    <li>• PayPal Services</li>
                    <li>• Fraud Detection Systems</li>
                  </ul>
                </div>
                <div className="bg-[#2E2E2E] p-6 rounded-lg text-white">
                  <h3 className="text-lg font-semibold text-[#FF6B00] mb-3">Communication</h3>
                  <ul className="space-y-2 text-[#ffeee3] text-sm">
                    <li>• Intercom Chat Support</li>
                    <li>• Email Marketing Tools</li>
                    <li>• Push Notification Services</li>
                  </ul>
                </div>
                <div className="bg-[#2E2E2E] p-6 rounded-lg text-white">
                  <h3 className="text-lg font-semibold text-[#FF6B00] mb-3">Social Media</h3>
                  <ul className="space-y-2 text-[#ffeee3] text-sm">
                    <li>• Facebook Social Plugins</li>
                    <li>• LinkedIn Integration</li>
                    <li>• Twitter Widgets</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Managing Cookies */}
            <div className="mb-12">
              <h2 className="text-2xl font-bold text-[#2E2E2E] mb-4 flex items-center">
                <ToggleLeft className="w-6 h-6 text-[#FF6B00] mr-3" />
                Managing Your Cookie Preferences
              </h2>
              
              <div className="bg-[#ffeee3] p-6 rounded-lg mb-6">
                <h3 className="text-xl font-semibold text-[#2E2E2E] mb-4">Cookie Preference Center</h3>
                <p className="text-[#2E2E2E]/80 mb-4">
                  You can manage your cookie preferences through our Cookie Preference Center, which allows you to:
                </p>
                <div className="space-y-3">
                  <div className="flex items-center justify-between p-3 bg-white rounded border">
                    <span className="text-[#2E2E2E] font-medium">Essential Cookies</span>
                    <div className="flex items-center">
                      <span className="text-sm text-[#2E2E2E]/60 mr-2">Always Active</span>
                      <ToggleRight className="w-5 h-5 text-green-500" />
                    </div>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-white rounded border">
                    <span className="text-[#2E2E2E] font-medium">Performance Cookies</span>
                    <ToggleRight className="w-5 h-5 text-[#FF6B00]" />
                  </div>
                  <div className="flex items-center justify-between p-3 bg-white rounded border">
                    <span className="text-[#2E2E2E] font-medium">Functional Cookies</span>
                    <ToggleRight className="w-5 h-5 text-[#FF6B00]" />
                  </div>
                  <div className="flex items-center justify-between p-3 bg-white rounded border">
                    <span className="text-[#2E2E2E] font-medium">Marketing Cookies</span>
                    <ToggleLeft className="w-5 h-5 text-gray-400" />
                  </div>
                </div>
              </div>

              <div className="bg-[#2E2E2E] p-6 rounded-lg text-white">
                <h3 className="text-xl font-semibold text-[#FF6B00] mb-4">Browser Settings</h3>
                <p className="text-[#ffeee3] mb-4">
                  You can also control cookies through your browser settings:
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <h4 className="font-semibold text-[#ffeee3] mb-2">Chrome</h4>
                    <p className="text-[#ffeee3]/80 text-sm">Settings → Privacy and Security → Cookies</p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-[#ffeee3] mb-2">Firefox</h4>
                    <p className="text-[#ffeee3]/80 text-sm">Options → Privacy & Security → Cookies</p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-[#ffeee3] mb-2">Safari</h4>
                    <p className="text-[#ffeee3]/80 text-sm">Preferences → Privacy → Cookies</p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-[#ffeee3] mb-2">Edge</h4>
                    <p className="text-[#ffeee3]/80 text-sm">Settings → Cookies and Site Permissions</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Cookie Retention */}
            <div className="mb-12">
              <h2 className="text-2xl font-bold text-[#2E2E2E] mb-4 flex items-center">
                <Trash2 className="w-6 h-6 text-[#FF6B00] mr-3" />
                Cookie Retention and Deletion
              </h2>
              <div className="space-y-4">
                <div className="border-l-4 border-[#FF6B00] pl-4">
                  <h3 className="font-semibold text-[#2E2E2E] mb-2">Session Cookies</h3>
                  <p className="text-[#2E2E2E]/80">Automatically deleted when you close your browser.</p>
                </div>
                <div className="border-l-4 border-[#FF6B00] pl-4">
                  <h3 className="font-semibold text-[#2E2E2E] mb-2">Persistent Cookies</h3>
                  <p className="text-[#2E2E2E]/80">Remain on your device for a set period or until manually deleted.</p>
                </div>
                <div className="border-l-4 border-[#FF6B00] pl-4">
                  <h3 className="font-semibold text-[#2E2E2E] mb-2">Analytics Cookies</h3>
                  <p className="text-[#2E2E2E]/80">Typically expire after 24 months of inactivity.</p>
                </div>
              </div>
            </div>

            {/* Contact Information */}
            <div className="bg-[#FF6B00] p-8 rounded-lg text-white">
              <h2 className="text-2xl font-bold mb-4">Questions About Cookies</h2>
              <p className="mb-4">
                If you have any questions about our use of cookies, please contact us:
              </p>
              <div className="space-y-2">
                <p><strong>Email:</strong> freelancenestteam@gmail.com</p>
                <p><strong>Phone:</strong> +92 316 3028236</p>
                <p><strong>Address:</strong> Islamabad, Pakistan</p>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};

export default CookiePolicyPage;