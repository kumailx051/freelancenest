import React from 'react';

const HowToFindWorkPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-[#ffeee3]">
      {/* Hero Section */}
      <section className="pt-40 pb-16 bg-[#2E2E2E] text-white">
        <div className="section-container">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">How to Find Work</h1>
            <p className="text-xl mb-8 text-[#ffeee3]">
              Discover opportunities and build your freelance career on FreelanceNest.
            </p>
            <button className="bg-white text-[#FF6B00] border-2 border-[#FF6B00] px-6 py-3 rounded-lg font-semibold hover:bg-[#FF6B00] hover:text-white transition-all">Start Your Journey</button>
          </div>
        </div>
      </section>

      {/* Path to Freelance Success Section */}
      <section className="py-16">
        <div className="section-container">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4 text-[#2E2E2E]">
                Your Path to <span className="bg-gradient-to-r from-[#FF6B00] to-[#FF6B00] bg-clip-text text-transparent">Freelance Success</span>
              </h2>
              <p className="text-lg text-[#2E2E2E]/80 max-w-3xl mx-auto">
                Follow these proven steps to build a thriving freelance career and secure 
                consistent work on our platform.
              </p>
            </div>
            
            <div className="mt-16 relative">
              {/* Path connecting steps (desktop only) */}
              <div className="hidden md:block absolute top-14 left-10 right-10 h-0.5 bg-[#ffeee3]"></div>
              
              <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
                {/* Step 1 */}
                <div className="flex flex-col items-center text-center">
                  <div className="relative z-10 bg-[#FF6B00] text-white rounded-full w-20 h-20 flex items-center justify-center text-3xl font-bold mb-6">
                    1
                  </div>
                  <h3 className="text-xl font-bold mb-3 text-[#2E2E2E]">Create Your Profile</h3>
                  <p className="text-[#2E2E2E]/80 text-sm px-4">
                    Build a compelling profile that showcases your expertise, portfolio, and 
                    professional experience.
                  </p>
                  <div className="mt-5">
                    <svg className="h-12 w-12 mx-auto text-[#FF6B00]" viewBox="0 0 24 24" fill="none">
                      <path d="M12 12.75C8.83 12.75 6.25 10.17 6.25 7C6.25 3.83 8.83 1.25 12 1.25C15.17 1.25 17.75 3.83 17.75 7C17.75 10.17 15.17 12.75 12 12.75ZM12 2.75C9.66 2.75 7.75 4.66 7.75 7C7.75 9.34 9.66 11.25 12 11.25C14.34 11.25 16.25 9.34 16.25 7C16.25 4.66 14.34 2.75 12 2.75Z" fill="currentColor"/>
                      <path d="M20.5901 22.75C20.1801 22.75 19.8401 22.41 19.8401 22C19.8401 18.55 16.3601 15.75 12.0001 15.75C7.64012 15.75 4.16012 18.55 4.16012 22C4.16012 22.41 3.82012 22.75 3.41012 22.75C3.00012 22.75 2.66012 22.41 2.66012 22C2.66012 17.73 6.85012 14.25 12.0001 14.25C17.1501 14.25 21.3401 17.73 21.3401 22C21.3401 22.41 21.0001 22.75 20.5901 22.75Z" fill="currentColor"/>
                    </svg>
                  </div>
                </div>

                {/* Step 2 */}
                <div className="flex flex-col items-center text-center">
                  <div className="relative z-10 bg-[#FF6B00] text-white rounded-full w-20 h-20 flex items-center justify-center text-3xl font-bold mb-6">
                    2
                  </div>
                  <h3 className="text-xl font-bold mb-3 text-[#2E2E2E]">Discover Projects</h3>
                  <p className="text-[#2E2E2E]/80 text-sm px-4">
                    Find opportunities that match your skills using our advanced search filters and
                    recommendations.
                  </p>
                  <div className="mt-5">
                    <svg className="h-12 w-12 mx-auto text-[#FF6B00]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                      <path d="M11 19C15.4183 19 19 15.4183 19 11C19 6.58172 15.4183 3 11 3C6.58172 3 3 6.58172 3 11C3 15.4183 6.58172 19 11 19Z" strokeLinecap="round" strokeLinejoin="round"/>
                      <path d="M21 21L16.65 16.65" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                </div>

                {/* Step 3 */}
                <div className="flex flex-col items-center text-center">
                  <div className="relative z-10 bg-[#FF6B00] text-white rounded-full w-20 h-20 flex items-center justify-center text-3xl font-bold mb-6">
                    3
                  </div>
                  <h3 className="text-xl font-bold mb-3 text-[#2E2E2E]">Submit Proposals</h3>
                  <p className="text-[#2E2E2E]/80 text-sm px-4">
                    Craft personalized proposals that demonstrate your understanding and 
                    unique value proposition.
                  </p>
                  <div className="mt-5">
                    <svg className="h-12 w-12 mx-auto text-[#FF6B00]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                      <path d="M21.3 12.23c.46-.17.7-.68.52-1.15l-3.18-8.5c-.17-.46-.68-.7-1.15-.52l-14.4 5.38c-.46.17-.7.68-.52 1.15l3.18 8.5c.17.46.68.7 1.15.52l14.4-5.38z" fill="none"/>
                      <path d="M7.5 15.5l4.5-10.5" strokeLinecap="round"/>
                    </svg>
                  </div>
                </div>
                
                {/* Step 4 */}
                <div className="flex flex-col items-center text-center">
                  <div className="relative z-10 bg-[#FF6B00] text-white rounded-full w-20 h-20 flex items-center justify-center text-3xl font-bold mb-6">
                    4
                  </div>
                  <h3 className="text-xl font-bold mb-3 text-[#2E2E2E]">Deliver Excellence</h3>
                  <p className="text-[#2E2E2E]/80 text-sm px-4">
                    Complete projects with high quality, meeting deadlines and exceeding 
                    client expectations.
                  </p>
                  <div className="mt-5">
                    <svg className="h-12 w-12 mx-auto text-[#FF6B00]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                      <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" />
                    </svg>
                  </div>
                </div>

                {/* Step 5 */}
                <div className="flex flex-col items-center text-center">
                  <div className="relative z-10 bg-[#FF6B00] text-white rounded-full w-20 h-20 flex items-center justify-center text-3xl font-bold mb-6">
                    5
                  </div>
                  <h3 className="text-xl font-bold mb-3 text-[#2E2E2E]">Grow Your Reputation</h3>
                  <p className="text-[#2E2E2E]/80 text-sm px-4">
                    Build a stellar reputation through reviews, ratings, and long-term client 
                    relationships.
                  </p>
                  <div className="mt-5">
                    <svg className="h-12 w-12 mx-auto text-[#FF6B00]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                      <path d="M17 4C18.1046 4 19 4.89543 19 6V21L12 18L5 21V6C5 4.89543 5.89543 4 7 4H17Z" />
                    </svg>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Success Tips Section */}
      <section className="py-16 bg-white">
        <div className="section-container">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-12 text-[#2E2E2E]">
              <span className="bg-gradient-to-r from-[#FF6B00] to-[#FF6B00] bg-clip-text text-transparent">Tips for</span> Success
            </h2>

            <div className="space-y-8">
              <div className="flex gap-4">
                <div className="bg-[#ffeee3] text-[#FF6B00] rounded-full w-8 h-8 flex items-center justify-center shrink-0 mt-1">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2 text-[#2E2E2E]">Perfect Your Profile</h3>
                  <p className="text-[#2E2E2E]/80">Add a professional photo, showcase your best work, and highlight specific skills. Be clear about your expertise and experience.</p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="bg-[#ffeee3] text-[#FF6B00] rounded-full w-8 h-8 flex items-center justify-center shrink-0 mt-1">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2 text-[#2E2E2E]">Personalize Your Proposals</h3>
                  <p className="text-[#2E2E2E]/80">Generic proposals rarely succeed. Show clients you understand their specific needs and explain how your skills match their requirements.</p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="bg-[#ffeee3] text-[#FF6B00] rounded-full w-8 h-8 flex items-center justify-center shrink-0 mt-1">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2 text-[#2E2E2E]">Develop In-Demand Skills</h3>
                  <p className="text-[#2E2E2E]/80">Keep learning and stay current with industry trends. Clients are willing to pay more for specialized, up-to-date expertise.</p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="bg-[#ffeee3] text-[#FF6B00] rounded-full w-8 h-8 flex items-center justify-center shrink-0 mt-1">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2 text-[#2E2E2E]">Communicate Professionally</h3>
                  <p className="text-[#2E2E2E]/80">Respond promptly, be clear and courteous in all communications. Setting expectations and maintaining regular updates builds client trust.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Success Stories Section */}
      <section className="py-16 bg-[#ffeee3]/50">
        <div className="section-container">
          <h2 className="text-3xl font-bold text-center mb-12 text-[#2E2E2E]">
            <span className="bg-gradient-to-r from-[#FF6B00] to-[#FF6B00] bg-clip-text text-transparent">Success</span> Stories
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Success Story 1 */}
            <div className="bg-white p-8 rounded-xl shadow-sm border border-[#ffeee3] hover:border-[#FF6B00] transition-all duration-300">
              <div className="flex items-center mb-6">
                <img
                  src="https://randomuser.me/api/portraits/women/33.jpg"
                  alt="Sarah J."
                  className="w-16 h-16 rounded-full mr-4 border-2 border-[#ffeee3]"
                />
                <div>
                  <h3 className="font-bold text-lg text-[#2E2E2E]">Sarah J.</h3>
                  <p className="text-[#FF6B00]">UX Designer</p>
                </div>
              </div>
              <p className="text-[#2E2E2E]/80 mb-4">
                "I started on FreelanceNest with zero clients. Within 3 months, I was fully booked with UI/UX projects and have since been able to increase my rates by 40%."
              </p>
              <p className="text-sm text-[#2E2E2E]/60">Freelancing for 2 years • $85k earned</p>
            </div>
            
            {/* Success Story 2 */}
            <div className="bg-white p-8 rounded-xl shadow-sm border border-[#ffeee3] hover:border-[#FF6B00] transition-all duration-300">
              <div className="flex items-center mb-6">
                <img
                  src="https://randomuser.me/api/portraits/men/45.jpg"
                  alt="Michael T."
                  className="w-16 h-16 rounded-full mr-4 border-2 border-[#ffeee3]"
                />
                <div>
                  <h3 className="font-bold text-lg text-[#2E2E2E]">Michael T.</h3>
                  <p className="text-[#FF6B00]">Full Stack Developer</p>
                </div>
              </div>
              <p className="text-[#2E2E2E]/80 mb-4">
                "The platform's advanced matching algorithm connected me with clients who perfectly matched my skill set. I'm now working with clients from three continents."
              </p>
              <p className="text-sm text-[#2E2E2E]/60">Freelancing for 3 years • $120k earned</p>
            </div>
            
            {/* Success Story 3 */}
            <div className="bg-white p-8 rounded-xl shadow-sm border border-[#ffeee3] hover:border-[#FF6B00] transition-all duration-300">
              <div className="flex items-center mb-6">
                <img
                  src="https://randomuser.me/api/portraits/women/64.jpg"
                  alt="Priya S."
                  className="w-16 h-16 rounded-full mr-4 border-2 border-[#ffeee3]"
                />
                <div>
                  <h3 className="font-bold text-lg text-[#2E2E2E]">Priya S.</h3>
                  <p className="text-[#FF6B00]">Content Strategist</p>
                </div>
              </div>
              <p className="text-[#2E2E2E]/80 mb-4">
                "I transitioned from a corporate job to freelancing through FreelanceNest. The secure payment system and client vetting process gave me the confidence to make the leap."
              </p>
              <p className="text-sm text-[#2E2E2E]/60">Freelancing for 1 year • $65k earned</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-[#2E2E2E] text-white">
        <div className="section-container">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-6">
              Ready to <span className="text-[#FF6B00]">Start Earning</span>?
            </h2>
            <p className="text-xl text-[#ffeee3]/90 mb-8">
              Join thousands of successful freelancers who have built thriving careers on FreelanceNest.
            </p>
            <button className="bg-[#FF6B00] text-white hover:bg-[#FF6B00]/90 font-medium px-8 py-4 rounded-lg text-lg transition-colors duration-200">
              Create Your Profile
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HowToFindWorkPage;


