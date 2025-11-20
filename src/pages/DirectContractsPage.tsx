import React from 'react';
import { Shield, FileText, CreditCard, Clock } from 'lucide-react';

const DirectContractsPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-[#ffeee3]/30">
      {/* Hero Section */}
      <section className="pt-40 pb-16 relative">
        {/* Background */}
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-[#2E2E2E]/90"></div>
        </div>
        
        <div className="section-container relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
              <span className="bg-gradient-to-r from-[#FF6B00] to-[#FF6B00] bg-clip-text text-transparent">Direct</span> Contracts
            </h1>
            <p className="text-xl text-[#ffeee3] mb-4">
              Simple, protected agreements for work with your own clients on FreelanceNest.
            </p>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-gradient-to-b from-white to-[#ffeee3]/30">
        <div className="section-container">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <span className="px-4 py-1 bg-[#ffeee3] text-[#FF6B00] rounded-full text-sm font-medium mb-4 inline-block">PLATFORM BENEFITS</span>
              <h2 className="text-3xl md:text-4xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-[#FF6B00] to-[#FF6B00]">Why Use Direct Contracts?</h2>
              <p className="text-xl text-[#2E2E2E] max-w-2xl mx-auto">
                Bring your existing clients to FreelanceNest and enjoy all the benefits of our platform.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-4 md:grid-cols-2 gap-6">
              {/* Card 1 */}
              <div className="bg-white p-8 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 border border-gray-100 group hover:border-[#FF6B00]/20">
                <div className="mb-6 inline-flex p-3 bg-[#ffeee3] rounded-xl group-hover:bg-[#FF6B00]/10 transition-colors duration-300">
                  <Shield className="w-8 h-8 text-[#FF6B00]" />
                </div>
                <h3 className="text-xl font-bold mb-3 text-[#2E2E2E] group-hover:text-[#FF6B00] transition-colors duration-300">Payment Protection</h3>
                <p className="text-gray-600">
                  Secure escrow payments, clear terms, and protected disputes resolution to ensure you always get paid.
                </p>
                <div className="h-1 w-12 bg-[#FF6B00] mt-4 group-hover:w-20 transition-all duration-300"></div>
              </div>

              {/* Card 2 */}
              <div className="bg-white p-8 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 border border-gray-100 group hover:border-[#FF6B00]/20">
                <div className="mb-6 inline-flex p-3 bg-[#ffeee3] rounded-xl group-hover:bg-[#FF6B00]/10 transition-colors duration-300">
                  <FileText className="w-8 h-8 text-[#FF6B00]" />
                </div>
                <h3 className="text-xl font-bold mb-3 text-[#2E2E2E] group-hover:text-[#FF6B00] transition-colors duration-300">Professional Contracts</h3>
                <p className="text-gray-600">
                  Legally binding agreements with clear terms, deadlines, and deliverables for both parties.
                </p>
                <div className="h-1 w-12 bg-[#FF6B00] mt-4 group-hover:w-20 transition-all duration-300"></div>
              </div>

              {/* Card 3 */}
              <div className="bg-white p-8 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 border border-gray-100 group hover:border-[#FF6B00]/20">
                <div className="mb-6 inline-flex p-3 bg-[#ffeee3] rounded-xl group-hover:bg-[#FF6B00]/10 transition-colors duration-300">
                  <CreditCard className="w-8 h-8 text-[#FF6B00]" />
                </div>
                <h3 className="text-xl font-bold mb-3 text-[#2E2E2E] group-hover:text-[#FF6B00] transition-colors duration-300">Multiple Payment Options</h3>
                <p className="text-gray-600">
                  Choose from hourly, fixed-price, or milestone-based payments to suit your project needs.
                </p>
                <div className="h-1 w-12 bg-[#FF6B00] mt-4 group-hover:w-20 transition-all duration-300"></div>
              </div>

              {/* Card 4 */}
              <div className="bg-white p-8 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 border border-gray-100 group hover:border-[#FF6B00]/20">
                <div className="mb-6 inline-flex p-3 bg-[#ffeee3] rounded-xl group-hover:bg-[#FF6B00]/10 transition-colors duration-300">
                  <Clock className="w-8 h-8 text-[#FF6B00]" />
                </div>
                <h3 className="text-xl font-bold mb-3 text-[#2E2E2E] group-hover:text-[#FF6B00] transition-colors duration-300">Lower Fees</h3>
                <p className="text-gray-600">
                  Enjoy reduced platform fees when you bring existing client relationships to FreelanceNest.
                </p>
                <div className="h-1 w-12 bg-[#FF6B00] mt-4 group-hover:w-20 transition-all duration-300"></div>
              </div>
            </div>
            
            <div className="mt-16 text-center">
              <a href="#" className="inline-flex items-center text-[#FF6B00] font-medium hover:text-[#2E2E2E] transition-colors duration-300">
                <span>Learn more about our platform benefits</span>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-1" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-16 bg-white">
        <div className="section-container">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold mb-4 text-[#2E2E2E]">How It <span className="bg-gradient-to-r from-[#FF6B00] to-[#FF6B00] bg-clip-text text-transparent">Works</span></h2>
              <p className="text-xl text-gray-600">
                Set up a direct contract in three simple steps
              </p>
            </div>

            <div className="relative">
              {/* Connection Line */}
              <div className="hidden md:block absolute top-1/2 left-0 right-0 h-1 bg-[#ffeee3] -translate-y-1/2 z-0"></div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative z-10">
                {/* Step 1 */}
                <div className="bg-white rounded-xl shadow-sm p-8 text-center hover:shadow-lg transition-all duration-300 border-2 border-[#FF6B00]/20 hover:border-[#FF6B00]/40">
                  <div className="bg-[#ffeee3] text-[#FF6B00] rounded-full w-12 h-12 flex items-center justify-center text-xl font-bold mb-6 mx-auto">
                    1
                  </div>
                  <h3 className="text-xl font-bold mb-3 text-[#2E2E2E]">Invite Your Client</h3>
                  <p className="text-gray-600">
                    Send a professional invitation to your client through our platform. They'll receive an email with instructions.
                  </p>
                </div>

                {/* Step 2 */}
                <div className="bg-white rounded-xl shadow-sm p-8 text-center hover:shadow-lg transition-all duration-300 border-2 border-[#FF6B00]/20 hover:border-[#FF6B00]/40">
                  <div className="bg-[#ffeee3] text-[#FF6B00] rounded-full w-12 h-12 flex items-center justify-center text-xl font-bold mb-6 mx-auto">
                    2
                  </div>
                  <h3 className="text-xl font-bold mb-3 text-[#2E2E2E]">Define Terms</h3>
                  <p className="text-gray-600">
                    Set up project details, payment terms, milestones, and deliverables for clear expectations.
                  </p>
                </div>

                {/* Step 3 */}
                <div className="bg-white rounded-xl shadow-sm p-8 text-center hover:shadow-lg transition-all duration-300 border-2 border-[#FF6B00]/20 hover:border-[#FF6B00]/40">
                  <div className="bg-[#ffeee3] text-[#FF6B00] rounded-full w-12 h-12 flex items-center justify-center text-xl font-bold mb-6 mx-auto">
                    3
                  </div>
                  <h3 className="text-xl font-bold mb-3 text-[#2E2E2E]">Start Working</h3>
                  <p className="text-gray-600">
                    Once your client accepts, you're ready to begin work with all platform protections in place.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 bg-[#ffeee3]/30">
        <div className="section-container">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-12 text-[#2E2E2E]">What <span className="bg-gradient-to-r from-[#FF6B00] to-[#FF6B00] bg-clip-text text-transparent">Freelancers</span> Say</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Testimonial 1 */}
              <div className="bg-white p-8 rounded-xl shadow-sm hover:shadow-lg transition-shadow duration-300">
                <div className="flex items-center mb-4">
                  <img 
                    src="https://randomuser.me/api/portraits/men/54.jpg" 
                    alt="James Wilson"
                    className="w-12 h-12 rounded-full mr-4" 
                  />
                  <div>
                    <h4 className="font-bold text-[#2E2E2E]">James Wilson</h4>
                    <p className="text-sm text-[#FF6B00]">Web Developer</p>
                  </div>
                </div>
                <p className="text-gray-600">
                  "Direct Contracts has been a game-changer for my freelance business. I've brought over five long-term clients and we all appreciate the security and professionalism it adds to our working relationship."
                </p>
              </div>
              
              {/* Testimonial 2 */}
              <div className="bg-white p-8 rounded-xl shadow-sm hover:shadow-lg transition-shadow duration-300">
                <div className="flex items-center mb-4">
                  <img 
                    src="https://randomuser.me/api/portraits/women/28.jpg" 
                    alt="Sophia Chen"
                    className="w-12 h-12 rounded-full mr-4" 
                  />
                  <div>
                    <h4 className="font-bold text-[#2E2E2E]">Sophia Chen</h4>
                    <p className="text-sm text-[#FF6B00]">Content Strategist</p>
                  </div>
                </div>
                <p className="text-gray-600">
                  "I was hesitant to bring my existing clients onto a platform, but the reduced fees and payment protection made it worth it. Now I don't have to worry about chasing payments anymore."
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 bg-white">
        <div className="section-container">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-12 text-[#2E2E2E]">Frequently Asked <span className="bg-gradient-to-r from-[#FF6B00] to-[#FF6B00] bg-clip-text text-transparent">Questions</span></h2>

            <div className="space-y-6">
              <div className="bg-[#ffeee3]/50 rounded-lg p-6 hover:bg-[#ffeee3]/70 transition-colors duration-300">
                <h3 className="text-xl font-semibold mb-2 text-[#2E2E2E]">What fees apply to Direct Contracts?</h3>
                <p className="text-gray-600">
                  Direct Contracts have a reduced fee of only 3.5% per transaction, compared to our standard 5% for platform-sourced clients.
                </p>
              </div>

              <div className="bg-[#ffeee3]/50 rounded-lg p-6 hover:bg-[#ffeee3]/70 transition-colors duration-300">
                <h3 className="text-xl font-semibold mb-2 text-[#2E2E2E]">Can I convert existing FreelanceNest clients to Direct Contracts?</h3>
                <p className="text-gray-600">
                  No, Direct Contracts are specifically for clients you bring to the platform from outside FreelanceNest. Converting existing platform relationships violates our terms of service.
                </p>
              </div>

              <div className="bg-[#ffeee3]/50 rounded-lg p-6 hover:bg-[#ffeee3]/70 transition-colors duration-300">
                <h3 className="text-xl font-semibold mb-2 text-[#2E2E2E]">What happens if there's a dispute?</h3>
                <p className="text-gray-600">
                  Our dedicated dispute resolution team will review the contract terms, communications, and submitted work to help reach a fair resolution for both parties.
                </p>
              </div>

              <div className="bg-[#ffeee3]/50 rounded-lg p-6 hover:bg-[#ffeee3]/70 transition-colors duration-300">
                <h3 className="text-xl font-semibold mb-2 text-[#2E2E2E]">Can I create multiple contracts with the same client?</h3>
                <p className="text-gray-600">
                  Yes, you can create as many contracts as needed with the same client for different projects or phases of work.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-[#2E2E2E] text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-[#2E2E2E] to-[#2E2E2E]/80"></div>
        <div className="section-container relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-6">Ready to <span className="bg-gradient-to-r from-[#FF6B00] to-[#FF6B00] bg-clip-text text-transparent">Secure</span> Your Client Relationships?</h2>
            <p className="text-xl opacity-90 mb-8 text-[#ffeee3]">
              Start creating professional contracts and enjoy secure payments today.
            </p>
            <button className="bg-[#FF6B00] text-white hover:bg-[#FF6B00]/90 font-medium px-8 py-4 rounded-lg text-lg transition-colors duration-200 shadow-lg hover:shadow-xl">
              Create a Direct Contract
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default DirectContractsPage;
