import React from 'react';
import { Link } from 'react-router-dom';

const HowToHirePage: React.FC = () => {
  return (
    <div className="min-h-screen bg-[#ffeee3]">
      {/* Hero Section */}
      <section className="pt-40 pb-16 bg-[#2E2E2E] text-white">
        <div className="section-container">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">How to Hire Top Talent</h1>
            <p className="text-xl mb-8 text-[#ffeee3]">
              Find, hire, and collaborate with the best freelancers around the world on FreelanceNest.
            </p>
            <Link to="/login" className="bg-white text-[#FF6B00] border-2 border-[#FF6B00] px-6 py-3 rounded-lg font-semibold hover:bg-[#FF6B00] hover:text-white transition-all inline-block">Start Hiring Today</Link>
          </div>
        </div>
      </section>

      {/* Hiring Options Section */}
      <section className="py-16">
        <div className="section-container">
          <div className="max-w-4xl mx-auto text-center mb-12">
            <h2 className="text-3xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-[#FF6B00] to-[#FF6B00]">Two Ways to Hire</h2>
            <p className="text-xl text-[#2E2E2E]">
              Choose the hiring method that works best for your needs
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
            {/* Bid-Based Option */}
            <div className="bg-white rounded-xl shadow-sm p-8 border-2 border-[#FF6B00]">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-2xl font-bold text-[#2E2E2E]">Bid-Based Hiring</h3>
                <span className="bg-[#ffeee3] text-[#FF6B00] px-3 py-1 rounded-full text-sm font-medium">Custom Projects</span>
              </div>
              <p className="text-[#2E2E2E] mb-6">
                Post your project and receive custom proposals from freelancers. Perfect for unique projects with specific requirements.
              </p>
              <ul className="space-y-3 mb-8">
                <li className="flex items-start">
                  <svg className="h-5 w-5 text-[#FF6B00] mt-1 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-[#2E2E2E]">Tailored proposals for your specific needs</span>
                </li>
                <li className="flex items-start">
                  <svg className="h-5 w-5 text-[#FF6B00] mt-1 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-[#2E2E2E]">Compare quotes and approaches</span>
                </li>
                <li className="flex items-start">
                  <svg className="h-5 w-5 text-[#FF6B00] mt-1 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-[#2E2E2E]">Negotiate terms directly with freelancers</span>
                </li>
              </ul>
              <Link to="/login" className="w-full bg-[#FF6B00] hover:bg-[#FF9F45] text-white font-medium py-3 rounded-lg transition-colors duration-200 inline-block text-center">
                Post a Job
              </Link>
            </div>

            {/* Gig-Based Option */}
            <div className="bg-white rounded-xl shadow-sm p-8 border-2 border-[#FF6B00]">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-2xl font-bold text-[#2E2E2E]">Gig-Based Hiring</h3>
                <span className="bg-[#ffeee3] text-[#FF6B00] px-3 py-1 rounded-full text-sm font-medium">Ready-to-Go</span>
              </div>
              <p className="text-[#2E2E2E] mb-6">
                Browse pre-packaged services with clear deliverables and fixed prices. Ideal for standard projects with quick turnaround times.
              </p>
              <ul className="space-y-3 mb-8">
                <li className="flex items-start">
                  <svg className="h-5 w-5 text-[#FF6B00] mt-1 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-[#2E2E2E]">Fixed prices and clear deliverables</span>
                </li>
                <li className="flex items-start">
                  <svg className="h-5 w-5 text-[#FF6B00] mt-1 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-[#2E2E2E]">Quicker to start - no waiting for proposals</span>
                </li>
                <li className="flex items-start">
                  <svg className="h-5 w-5 text-[#FF6B00] mt-1 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-[#2E2E2E]">See reviews and samples before purchasing</span>
                </li>
              </ul>
              <Link to="/login" className="w-full bg-[#FF6B00] hover:bg-[#FF9F45] text-white font-medium py-3 rounded-lg transition-colors duration-200 inline-block text-center">
                Browse Gigs
              </Link>
            </div>
          </div>

          {/* Steps Section Title */}
          <div className="max-w-3xl mx-auto text-center mb-12">
            <h2 className="text-3xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-[#FF6B00] to-[#FF6B00]">How It Works</h2>
            <p className="text-xl text-[#2E2E2E]">
              The hiring process is simple no matter which option you choose
            </p>
          </div>
          
          {/* Steps Row */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Step 1 */}
            <div className="bg-[#ffeee3] rounded-xl shadow-sm p-8 transition-transform hover:-translate-y-1">
              <div className="bg-[#FF6B00] text-white rounded-full w-12 h-12 flex items-center justify-center text-xl font-bold mb-6">
                1
              </div>
              <h3 className="text-xl font-bold mb-3 text-[#2E2E2E]">Post a Job or Browse Gigs</h3>
              <p className="text-[#2E2E2E]/80">
                Create a detailed job posting or browse through ready-made gigs offered by freelancers. Choose the option that best fits your needs.
              </p>
            </div>

            {/* Step 2 */}
            <div className="bg-[#ffeee3] rounded-xl shadow-sm p-8 transition-transform hover:-translate-y-1">
              <div className="bg-[#FF6B00] text-white rounded-full w-12 h-12 flex items-center justify-center text-xl font-bold mb-6">
                2
              </div>
              <h3 className="text-xl font-bold mb-3 text-[#2E2E2E]">Review Options</h3>
              <p className="text-[#2E2E2E]/80">
                Browse through proposals, review profiles, portfolios, and ratings. Or compare different gig packages to find the perfect match.
              </p>
            </div>

            {/* Step 3 */}
            <div className="bg-[#ffeee3] rounded-xl shadow-sm p-8 transition-transform hover:-translate-y-1">
              <div className="bg-[#FF6B00] text-white rounded-full w-12 h-12 flex items-center justify-center text-xl font-bold mb-6">
                3
              </div>
              <h3 className="text-xl font-bold mb-3 text-[#2E2E2E]">Collaborate & Pay</h3>
              <p className="text-[#2E2E2E]/80">
                Hire your chosen freelancer and use our platform to collaborate, share files, and make secure payments for completed work.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Tips Section */}
      <section className="py-16 bg-white">
        <div className="section-container">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-12 bg-clip-text text-transparent bg-gradient-to-r from-[#FF6B00] to-[#FF6B00]">Hiring Tips from Experts</h2>

            <div className="space-y-8">
              <div className="flex gap-4">
                <div className="bg-[#ffeee3] text-[#FF6B00] rounded-full w-8 h-8 flex items-center justify-center shrink-0 mt-1">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2 text-[#2E2E2E]">Write a Clear Job Description</h3>
                  <p className="text-[#2E2E2E]/80">Be specific about what you're looking for. Include details about your project, required skills, experience level, and budget range.</p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="bg-[#ffeee3] text-[#FF6B00] rounded-full w-8 h-8 flex items-center justify-center shrink-0 mt-1">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2 text-[#2E2E2E]">Review Portfolios Carefully</h3>
                  <p className="text-[#2E2E2E]/80">Look for freelancers whose previous work aligns with your project requirements. Don't just focus on price—quality and experience matter.</p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="bg-[#ffeee3] text-[#FF6B00] rounded-full w-8 h-8 flex items-center justify-center shrink-0 mt-1">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2 text-[#2E2E2E]">Conduct Video Interviews</h3>
                  <p className="text-[#2E2E2E]/80">Schedule video calls with promising candidates to assess communication skills and cultural fit. Prepare questions in advance.</p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="bg-[#ffeee3] text-[#FF6B00] rounded-full w-8 h-8 flex items-center justify-center shrink-0 mt-1">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2 text-[#2E2E2E]">Start with a Small Project</h3>
                  <p className="text-[#2E2E2E]/80">For new relationships, begin with a small test project before committing to a larger engagement to ensure compatibility.</p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="bg-[#ffeee3] text-[#FF6B00] rounded-full w-8 h-8 flex items-center justify-center shrink-0 mt-1">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2 text-[#2E2E2E]">Use Screening References</h3>
                  <p className="text-[#2E2E2E]/80 mb-4">Access our comprehensive screening tools and reference checks to validate freelancer credentials and past work history.</p>
                  <Link to="/login" className="bg-[#FF6B00] hover:bg-[#FF9F45] text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-200 inline-block">
                    Access Screening Tools
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-[#FF6B00] text-white">
        <div className="section-container">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-6">Ready to Find Your Perfect Match?</h2>
            <p className="text-xl opacity-90 mb-8">
              Start your project today and connect with talented freelancers ready to help your business grow.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Link to="/login" className="bg-[#ffeee3] text-[#2E2E2E] hover:bg-white font-medium px-8 py-4 rounded-lg text-lg transition-colors duration-200 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-0.5 inline-block text-center">
                Post a Job
              </Link>
              <Link to="/login" className="bg-[#2E2E2E] text-white border border-white hover:bg-[#2E2E2E]/80 font-medium px-8 py-4 rounded-lg text-lg transition-colors duration-200 shadow-md hover:shadow-lg transition-all duration-300 hover:-translate-y-0.5 inline-block text-center">
                Browse Gigs
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 bg-[#ffeee3]/30">
        <div className="section-container">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-12 bg-clip-text text-transparent bg-gradient-to-r from-[#FF6B00] to-[#FF6B00]">Frequently Asked Questions</h2>

            <div className="space-y-6">
              <div className="bg-white rounded-lg shadow-sm p-6 border-l-4 border-[#FF6B00]">
                <h3 className="text-xl font-semibold mb-2 text-[#2E2E2E]">How much does it cost to hire a freelancer?</h3>
                <p className="text-[#2E2E2E]/80">
                  Freelancer rates vary depending on expertise, experience, and project complexity. On FreelanceNest, you can find talented professionals for every budget.
                </p>
              </div>

              <div className="bg-white rounded-lg shadow-sm p-6 border-l-4 border-[#FF6B00]">
                <h3 className="text-xl font-semibold mb-2 text-[#2E2E2E]">What if I'm not satisfied with the work?</h3>
                <p className="text-[#2E2E2E]/80">
                  Our platform includes milestone-based payments and dispute resolution services to ensure quality work. You only release payment when you're fully satisfied.
                </p>
              </div>

              <div className="bg-white rounded-lg shadow-sm p-6 border-l-4 border-[#FF6B00]">
                <h3 className="text-xl font-semibold mb-2 text-[#2E2E2E]">How do I protect my intellectual property?</h3>
                <p className="text-[#2E2E2E]/80">
                  We recommend using our standard contracts that include NDA clauses. For additional protection, you can create custom agreements through our platform.
                </p>
              </div>

              <div className="bg-white rounded-lg shadow-sm p-6 border-l-4 border-[#FF6B00]">
                <h3 className="text-xl font-semibold mb-2 text-[#2E2E2E]">Can I hire freelancers for ongoing work?</h3>
                <p className="text-[#2E2E2E]/80">
                  Absolutely! Many clients establish long-term relationships with freelancers. You can set up recurring contracts or hire freelancers on a retainer basis.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HowToHirePage;
