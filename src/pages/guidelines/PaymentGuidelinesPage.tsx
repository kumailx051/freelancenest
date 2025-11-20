import React from 'react';
import { Link } from 'react-router-dom';

// Payment policies
const paymentPolicies = [
  {
    title: "Platform Payments Only",
    description: "All payments must be processed through our platform. Taking payments off-platform violates our terms of service and removes your protection.",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
      </svg>
    )
  },
  {
    title: "Clear Payment Terms",
    description: "All payment terms including rates, milestones, and deliverables must be clearly documented and agreed upon before work begins.",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
      </svg>
    )
  },
  {
    title: "Milestone Payments",
    description: "We recommend using milestone payments for larger projects to ensure both parties are protected and to maintain project momentum.",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
      </svg>
    )
  },
  {
    title: "Fair Pricing",
    description: "Set rates that fairly reflect the value of your work and expertise. Avoid underpricing your services or attempting to overcharge clients.",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3" />
      </svg>
    )
  }
];

// Payment methods
const paymentMethods = [
  {
    type: "Fixed-Price",
    description: "Client deposits the full project amount into escrow before work begins. Funds are released upon project completion and approval.",
    bestFor: "Small to medium-sized projects with clearly defined deliverables and scope",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
      </svg>
    )
  },
  {
    type: "Milestone Payments",
    description: "The project is broken into phases, with payment released after completion of each milestone.",
    bestFor: "Larger projects that can be divided into clear phases or deliverables",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
      </svg>
    )
  },
  {
    type: "Hourly Rate",
    description: "Payment based on tracked hours worked on the project, with regular billing periods.",
    bestFor: "Projects with evolving requirements or ongoing work where scope is difficult to define",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    )
  },
  {
    type: "Package Rate",
    description: "Pre-defined service packages with clear deliverables and fixed pricing.",
    bestFor: "Standardized services that follow a consistent process",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
      </svg>
    )
  }
];

// Frequently asked payment questions
const paymentFAQs = [
  {
    question: "When do I get paid for my work?",
    answer: "For fixed-price projects and milestones, payment is released once the client approves the delivered work. For hourly projects, payments are processed according to the billing cycle specified in your contract."
  },
  {
    question: "What if a client doesn't release payment for approved work?",
    answer: "If a client has approved your work but hasn't released payment within 14 days, you can raise a payment dispute through our Resolution Center. Our team will review the case and may release payment from escrow if the work meets the agreed-upon requirements."
  },
  {
    question: "Can I request a deposit before starting work?",
    answer: "Yes, you can request milestone payments with the first milestone functioning as a deposit. However, you should deliver proportionate value for each milestone payment."
  },
  {
    question: "What payment methods are supported?",
    answer: "We support various withdrawal options including direct bank transfers, PayPal, and other digital payment platforms depending on your country. Check the Payments section of your account settings for specific options available to you."
  },
  {
    question: "Are there any fees for receiving payments?",
    answer: "Our platform charges a service fee on payments you receive. The fee structure is tiered based on your lifetime earnings with each client. Please refer to our fee schedule for current rates."
  }
];

const PaymentGuidelinesPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-[#ffeee3]">
      {/* Hero Section */}
      <section className="pt-40 pb-16 bg-gradient-to-r from-primary-500 to-purple-600">
        <div className="section-container">
          <div className="max-w-3xl mx-auto text-center">
            <div className="inline-block px-3 py-1 bg-white/10 text-white rounded-full text-sm font-semibold mb-3">
              Community Guidelines
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">Payment & Billing</h1>
            <p className="text-xl text-[#ffeee3] mb-8">
              Understanding our payment policies ensures secure transactions and
              protects both clients and freelancers throughout the project lifecycle.
            </p>
          </div>
        </div>
      </section>

      {/* Payment Protection Section */}
      <section className="py-16 bg-white">
        <div className="section-container">
          <div className="max-w-4xl mx-auto">
            <div className="flex flex-col md:flex-row gap-12 items-center">
              <div className="md:w-1/2 order-2 md:order-1">
                <div className="inline-block px-3 py-1 bg-[#ffeee3] text-[#FF6B00] rounded-full text-sm font-semibold mb-3">
                  Protection For All
                </div>
                <h2 className="text-3xl font-bold mb-6 text-[#2E2E2E]">How Our Payment System Protects You</h2>
                <div className="space-y-6 text-[#2E2E2E]">
                  <div className="flex items-start">
                    <div className="bg-primary-100 p-2 rounded-full mr-4 mt-1 flex-shrink-0">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-primary-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg mb-1">Secure Escrow System</h3>
                      <p>
                        Funds are held securely in escrow until work is delivered and approved, 
                        protecting both parties from payment and delivery risks.
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="bg-primary-100 p-2 rounded-full mr-4 mt-1 flex-shrink-0">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-primary-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg mb-1">Dispute Resolution</h3>
                      <p>
                        Our dedicated support team mediates any payment disputes, 
                        ensuring fair resolution based on contract terms.
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="bg-primary-100 p-2 rounded-full mr-4 mt-1 flex-shrink-0">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-primary-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg mb-1">Fraud Prevention</h3>
                      <p>
                        Our platform employs advanced security measures to detect and 
                        prevent fraudulent transactions and protect user accounts.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="md:w-1/2 order-1 md:order-2">
                <img 
                  src="https://images.unsplash.com/photo-1554224155-6726b3ff858f?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80" 
                  alt="Secure Payments" 
                  className="rounded-xl shadow-lg w-full"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Payment Policies Section */}
      <section className="py-16 bg-gradient-to-b from-gray-50 to-white">
        <div className="section-container">
          <div className="max-w-4xl mx-auto text-center mb-12">
            <div className="inline-block px-3 py-1 bg-[#ffeee3] text-[#FF6B00] rounded-full text-sm font-semibold mb-3">
              Key Requirements
            </div>
            <h2 className="text-3xl font-bold mb-4 text-[#2E2E2E]">Core Payment Policies</h2>
            <p className="text-xl text-[#2E2E2E] max-w-2xl mx-auto">
              These fundamental payment guidelines ensure fair and secure transactions for all users
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {paymentPolicies.map((policy, index) => (
              <div key={index} className="bg-white p-8 rounded-xl border border-[#ffeee3] shadow-sm hover:shadow-md transition-shadow">
                <div className="flex items-center mb-4">
                  <div className="bg-primary-100 p-3 rounded-lg mr-4 text-primary-600">
                    {policy.icon}
                  </div>
                  <h3 className="text-xl font-bold text-[#2E2E2E]">{policy.title}</h3>
                </div>
                <p className="text-[#2E2E2E]">{policy.description}</p>
              </div>
            ))}
          </div>

          {/* Warning Box */}
          <div className="max-w-4xl mx-auto mt-12">
            <div className="bg-[#ffeee3] border-l-4 border-[#FF6B00] p-5 rounded-r-lg">
              <div className="flex">
                <div className="flex-shrink-0">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-[#FF6B00]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                  </svg>
                </div>
                <div className="ml-4">
                  <h4 className="text-lg font-semibold text-[#2E2E2E] mb-1">Warning: Off-Platform Payments</h4>
                  <p className="text-[#2E2E2E]">
                    Taking payments outside our platform violates our terms of service and can result in account suspension. 
                    More importantly, it removes all protections offered by our escrow system and dispute resolution process.
                    Always keep your transactions on the platform to ensure you're protected.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Payment Methods Section */}
      <section className="py-16 bg-white">
        <div className="section-container">
          <div className="max-w-4xl mx-auto text-center mb-12">
            <div className="inline-block px-3 py-1 bg-[#ffeee3] text-[#FF6B00] rounded-full text-sm font-semibold mb-3">
              Payment Options
            </div>
            <h2 className="text-3xl font-bold mb-4 text-[#2E2E2E]">Payment Methods</h2>
            <p className="text-xl text-[#2E2E2E] max-w-2xl mx-auto">
              Choose the payment method that best suits your project needs
            </p>
          </div>

          <div className="space-y-6 max-w-4xl mx-auto">
            {paymentMethods.map((method, index) => (
              <div key={index} className="bg-[#ffeee3] rounded-xl overflow-hidden border border-[#ffeee3]">
                <div className="flex flex-col md:flex-row">
                  <div className="bg-gradient-to-br from-primary-500 to-primary-700 p-6 text-white md:w-1/3 flex items-center">
                    <div>
                      <div className="bg-white/20 p-3 rounded-full inline-block mb-4">
                        {method.icon}
                      </div>
                      <h3 className="text-xl font-bold mb-1">{method.type}</h3>
                      <p className="opacity-80 text-sm">Payment Method</p>
                    </div>
                  </div>
                  <div className="p-6 md:w-2/3">
                    <p className="text-[#2E2E2E] mb-4">{method.description}</p>
                    <div className="bg-white p-4 rounded-lg border border-[#ffeee3]">
                      <p className="text-sm text-[#ffeee3] mb-1">Best for:</p>
                      <p className="text-[#2E2E2E] font-medium">{method.bestFor}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQs Section */}
      <section className="py-16 bg-[#ffeee3]">
        <div className="section-container">
          <div className="max-w-4xl mx-auto text-center mb-12">
            <div className="inline-block px-3 py-1 bg-[#ffeee3] text-[#FF6B00] rounded-full text-sm font-semibold mb-3">
              Common Questions
            </div>
            <h2 className="text-3xl font-bold mb-4 text-[#2E2E2E]">Payment FAQs</h2>
            <p className="text-xl text-[#2E2E2E] max-w-2xl mx-auto">
              Answers to common questions about our payment system
            </p>
          </div>

          <div className="max-w-4xl mx-auto">
            <div className="space-y-6">
              {paymentFAQs.map((faq, index) => (
                <div key={index}>
                  <details className="group bg-white rounded-xl overflow-hidden border border-[#ffeee3] hover:shadow-md transition-shadow">
                    <summary className="flex items-center justify-between p-6 cursor-pointer">
                      <h3 className="text-lg font-semibold text-[#2E2E2E]">{faq.question}</h3>
                      <div className="w-8 h-8 flex-shrink-0 bg-[#ffeee3] rounded-full flex items-center justify-center group-open:rotate-180 transition-transform duration-300">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-[#ffeee3]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                      </div>
                    </summary>
                    <div className="px-6 pb-6 pt-0">
                      <div className="bg-[#ffeee3] p-4 rounded-lg text-[#2E2E2E]">
                        {faq.answer}
                      </div>
                    </div>
                  </details>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 bg-primary-600">
        <div className="section-container">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-4 text-white">Need Further Payment Assistance?</h2>
            <p className="text-xl text-[#ffeee3] mb-8 max-w-2xl mx-auto">
              Our support team is ready to help with any payment-related questions or issues.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/community-guidelines" className="px-6 py-3 bg-white text-primary-600 hover:bg-[#ffeee3] rounded-lg font-medium transition-colors">
                Return to Guidelines
              </Link>
              <Link to="/resources/help-center" className="px-6 py-3 bg-primary-700 text-white hover:bg-primary-800 rounded-lg font-medium transition-colors">
                Payment Help Center
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Related Guidelines */}
      <section className="py-16 bg-white">
        <div className="section-container">
          <div className="max-w-4xl mx-auto text-center mb-12">
            <h2 className="text-2xl font-bold mb-4 text-[#2E2E2E]">Related Guidelines</h2>
            <p className="text-[#2E2E2E]">
              Explore other community guidelines to ensure a successful experience
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <Link to="/guidelines/conduct" className="group">
              <div className="bg-[#ffeee3] p-6 rounded-xl border border-[#ffeee3] hover:border-[#FF6B00] hover:shadow-md transition-all h-full">
                <div className="bg-[#ffeee3] p-3 rounded-lg inline-block mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-[#FF6B00]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                  </svg>
                </div>
                <h3 className="text-lg font-bold text-[#2E2E2E] mb-2">Conduct & Communication</h3>
                <p className="text-[#2E2E2E] mb-4">Guidelines for professional interactions and communication</p>
                <span className="text-primary-600 font-medium group-hover:translate-x-2 inline-block transition-transform">Learn more â†’</span>
              </div>
            </Link>
            <Link to="/guidelines/work-quality" className="group">
              <div className="bg-[#ffeee3] p-6 rounded-xl border border-[#ffeee3] hover:border-[#FF6B00] hover:shadow-md transition-all h-full">
                <div className="bg-[#ffeee3] p-3 rounded-lg inline-block mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-[#FF6B00]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                </div>
                <h3 className="text-lg font-bold text-[#2E2E2E] mb-2">Work Quality & Delivery</h3>
                <p className="text-[#2E2E2E] mb-4">Standards for quality, deadlines, and professional deliverables</p>
                <span className="text-primary-600 font-medium group-hover:translate-x-2 inline-block transition-transform">Learn more â†’</span>
              </div>
            </Link>
            <Link to="/guidelines/privacy" className="group">
              <div className="bg-[#ffeee3] p-6 rounded-xl border border-[#ffeee3] hover:border-[#FF6B00] hover:shadow-md transition-all h-full">
                <div className="bg-[#ffeee3] p-3 rounded-lg inline-block mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-[#FF6B00]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                </div>
                <h3 className="text-lg font-bold text-[#2E2E2E] mb-2">Privacy & Confidentiality</h3>
                <p className="text-[#2E2E2E] mb-4">Protocols for protecting sensitive information and intellectual property</p>
                <span className="text-primary-600 font-medium group-hover:translate-x-2 inline-block transition-transform">Learn more â†’</span>
              </div>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default PaymentGuidelinesPage;













