import React from 'react';
import { Link } from 'react-router-dom';

// Sample trust features
const trustFeatures = [
  {
    id: 1,
    title: "Identity Verification",
    description: "We verify the identity of all users through a comprehensive verification process, ensuring everyone is who they claim to be.",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10 6H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V8a2 2 0 00-2-2h-5m-4 0V5a2 2 0 114 0v1m-4 0a2 2 0 104 0m-5 8a2 2 0 100-4 2 2 0 000 4zm0 0c1.306 0 2.417.835 2.83 2M9 14a3.001 3.001 0 00-2.83 2M15 11h3m-3 4h2" />
      </svg>
    )
  },
  {
    id: 2,
    title: "Secure Payments",
    description: "Your funds are held securely in escrow until you're satisfied with the work, protecting both clients and freelancers.",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
      </svg>
    )
  },
  {
    id: 3,
    title: "Privacy Protection",
    description: "We employ industry-leading encryption and data protection measures to safeguard your personal and financial information.",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
      </svg>
    )
  },
  {
    id: 4,
    title: "Dispute Resolution",
    description: "Our dedicated support team is available to help resolve any issues that may arise between clients and freelancers.",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M20.618 5.984A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016zM12 9v2m0 4h.01" />
      </svg>
    )
  },
  {
    id: 5,
    title: "Feedback & Reviews",
    description: "Our transparent review system helps you make informed decisions based on verified past performance.",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
      </svg>
    )
  },
  {
    id: 6,
    title: "Anti-Fraud Systems",
    description: "Our advanced detection systems identify and prevent suspicious activities, protecting our community from fraud.",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
      </svg>
    )
  },
];

// Sample FAQ data
const faqs = [
  {
    id: 1,
    question: "How do you verify user identities?",
    answer: "We use a multi-step verification process that includes email verification, phone verification, and ID document checks for certain account levels. This helps ensure all users on our platform are genuine and reduces the risk of fraudulent accounts."
  },
  {
    id: 2,
    question: "What happens to my money when I pay for a project?",
    answer: "When you make a payment, the funds are held securely in escrow. The freelancer only receives payment once you've reviewed and approved the completed work, providing protection for both parties."
  },
  {
    id: 3,
    question: "What should I do if I experience a problem with a freelancer or client?",
    answer: "First, we encourage direct communication to resolve any misunderstandings. If that doesn't work, you can open a dispute through our platform, and our support team will review the case and help mediate a resolution."
  },
  {
    id: 4,
    question: "How do you protect my personal and payment information?",
    answer: "We use industry-standard encryption and security measures to protect your data. We comply with global data protection regulations and only collect information necessary to provide our services."
  },
  {
    id: 5,
    question: "Can I work with someone outside of your platform after finding them here?",
    answer: "We strongly discourage taking relationships off-platform as this bypasses our security features. Working within our platform ensures you have access to secure payments, dispute resolution, and our satisfaction guarantee."
  },
  {
    id: 6,
    question: "What happens if the delivered work doesn't meet my expectations?",
    answer: "If you're not satisfied with the delivered work, you can request revisions according to the terms agreed upon. If issues persist, you can open a dispute, and our team will review the case to help reach a fair resolution."
  }
];

// Community guidelines steps
const guidelines = [
  {
    id: 1,
    title: "Respect & Professionalism",
    description: "Treat all community members with respect and maintain professional conduct in all interactions."
  },
  {
    id: 2,
    title: "Honest Representation",
    description: "Present your skills, experience, and work accurately. Misrepresentation is a violation of our terms."
  },
  {
    id: 3,
    title: "Quality Commitment",
    description: "Deliver work that meets professional standards and aligns with what was promised."
  },
  {
    id: 4,
    title: "Clear Communication",
    description: "Maintain open and clear communication throughout projects. Respond to messages in a timely manner."
  },
  {
    id: 5,
    title: "Privacy Respect",
    description: "Respect confidentiality and protect sensitive information shared during project work."
  },
  {
    id: 6,
    title: "Payment Integrity",
    description: "Always use the platform's payment system to ensure security and compliance with our terms."
  }
];

const TrustAndSafetyPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-[#ffeee3]">
      {/* Hero Section */}
      <section className="pt-40 pb-16 bg-[#2E2E2E] text-white">
        <div className="section-container">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Trust & Safety</h1>
            <p className="text-xl mb-8 text-[#ffeee3]">
              Your security is our top priority. Learn how we protect our community and create a safe environment for clients and freelancers.
            </p>
            <button className="bg-white text-[#FF6B00] border-2 border-[#FF6B00] px-6 py-3 rounded-lg font-semibold hover:bg-[#FF6B00] hover:text-white transition-all">Learn More</button>
          </div>
        </div>
      </section>

      {/* Statistics Section */}
      <section className="py-16 bg-[#2E2E2E]">
        <div className="section-container">
          <div className="max-w-4xl mx-auto">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="text-4xl font-bold text-[#FF6B00] mb-2">2M+</div>
                <p className="text-sm text-white">Users Protected</p>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-[#FF6B00] mb-2">99.9%</div>
                <p className="text-sm text-white">Transaction Success</p>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-[#FF6B00] mb-2">24/7</div>
                <p className="text-sm text-white">Support Available</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Trust Features Grid */}
      <section className="py-20 bg-white">
        <div className="section-container">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <h2 className="text-3xl font-bold mb-4 text-[#2E2E2E]">
              <span className="bg-gradient-to-r from-[#FF6B00] to-[#FF6B00] bg-clip-text text-transparent">How We</span> Protect You
            </h2>
            <p className="text-xl text-[#2E2E2E]/80">
              Our multi-layered approach to security keeps our platform safe and trustworthy
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {trustFeatures.map((feature) => (
              <div key={feature.id} className="bg-white p-8 rounded-xl border border-[#ffeee3] hover:border-[#FF6B00] hover:shadow-md transition-all duration-300">
                <div className="text-[#FF6B00] mb-5">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-bold mb-3 text-[#2E2E2E]">{feature.title}</h3>
                <p className="text-[#2E2E2E]/80">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Security Process */}
      <section className="py-20 bg-[#ffeee3]/50">
        <div className="section-container">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <h2 className="text-3xl font-bold mb-4 text-[#2E2E2E]">
              <span className="bg-gradient-to-r from-[#FF6B00] to-[#FF6B00] bg-clip-text text-transparent">Our Security</span> Process
            </h2>
            <p className="text-xl text-[#2E2E2E]/80">
              We employ multiple security measures to protect our community
            </p>
          </div>

          <div className="flex flex-col lg:flex-row gap-12 items-center">
            <div className="lg:w-1/2 order-2 lg:order-1">
              <div className="space-y-8">
                <div className="flex gap-4">
                  <div className="bg-[#ffeee3] text-[#FF6B00] rounded-full w-10 h-10 flex items-center justify-center flex-shrink-0 mt-1">
                    1
                  </div>
                  <div>
                    <h3 className="text-xl font-bold mb-2 text-[#2E2E2E]">Prevention</h3>
                    <p className="text-[#2E2E2E]/80">
                      We use advanced verification systems and AI-powered tools to detect and prevent suspicious activities before they affect you.
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="bg-[#ffeee3] text-[#FF6B00] rounded-full w-10 h-10 flex items-center justify-center flex-shrink-0 mt-1">
                    2
                  </div>
                  <div>
                    <h3 className="text-xl font-bold mb-2 text-[#2E2E2E]">Protection</h3>
                    <p className="text-[#2E2E2E]/80">
                      Our secure escrow payment system and work verification processes protect both clients and freelancers throughout the project lifecycle.
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="bg-[#ffeee3] text-[#FF6B00] rounded-full w-10 h-10 flex items-center justify-center flex-shrink-0 mt-1">
                    3
                  </div>
                  <div>
                    <h3 className="text-xl font-bold mb-2 text-[#2E2E2E]">Resolution</h3>
                    <p className="text-[#2E2E2E]/80">
                      If issues arise, our dedicated trust and safety team provides fair dispute resolution and support to all parties involved.
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="lg:w-1/2 order-1 lg:order-2">
              <div className="bg-gradient-to-br from-[#FF6B00] to-[#FF9F45] rounded-lg p-8 text-white">
                <div className="grid grid-cols-2 gap-6">
                  <div className="text-center">
                    <div className="bg-white/20 rounded-full w-16 h-16 flex items-center justify-center mb-3 mx-auto">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                      </svg>
                    </div>
                    <h4 className="font-semibold mb-2">Secure Platform</h4>
                    <p className="text-sm opacity-90">End-to-end encryption</p>
                  </div>
                  <div className="text-center">
                    <div className="bg-white/20 rounded-full w-16 h-16 flex items-center justify-center mb-3 mx-auto">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                      </svg>
                    </div>
                    <h4 className="font-semibold mb-2">Privacy First</h4>
                    <p className="text-sm opacity-90">Data protection</p>
                  </div>
                  <div className="text-center">
                    <div className="bg-white/20 rounded-full w-16 h-16 flex items-center justify-center mb-3 mx-auto">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10 6H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V8a2 2 0 00-2-2h-5m-4 0V5a2 2 0 114 0v1m-4 0a2 2 0 104 0m-5 8a2 2 0 100-4 2 2 0 000 4zm0 0c1.306 0 2.417.835 2.83 2M9 14a3.001 3.001 0 00-2.83 2M15 11h3m-3 4h2" />
                      </svg>
                    </div>
                    <h4 className="font-semibold mb-2">Verified Users</h4>
                    <p className="text-sm opacity-90">Identity checks</p>
                  </div>
                  <div className="text-center">
                    <div className="bg-white/20 rounded-full w-16 h-16 flex items-center justify-center mb-3 mx-auto">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192L5.636 18.364M12 2.944l7.071 7.071-7.071 7.071-7.071-7.071 7.071-7.071z" />
                      </svg>
                    </div>
                    <h4 className="font-semibold mb-2">24/7 Monitoring</h4>
                    <p className="text-sm opacity-90">Always protected</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Community Guidelines */}
      <section className="py-20 bg-white">
        <div className="section-container">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <h2 className="text-3xl font-bold mb-4 text-[#2E2E2E]">
              <span className="bg-gradient-to-r from-[#FF6B00] to-[#FF6B00] bg-clip-text text-transparent">Community</span> Guidelines
            </h2>
            <p className="text-xl text-[#2E2E2E]/80">
              We expect all users to follow these principles to maintain a safe and productive environment
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {guidelines.map((guideline) => (
              <div key={guideline.id} className="bg-[#ffeee3] p-6 rounded-lg border border-[#ffeee3] hover:border-[#FF6B00] transition-all duration-300">
                <div className="flex items-center mb-4">
                  <div className="bg-[#FF6B00] text-white rounded-full w-8 h-8 flex items-center justify-center mr-3">
                    {guideline.id}
                  </div>
                  <h3 className="text-lg font-semibold text-[#2E2E2E]">{guideline.title}</h3>
                </div>
                <p className="text-[#2E2E2E]/80">{guideline.description}</p>
              </div>
            ))}
          </div>

          <div className="mt-12 text-center">
            <Link to="/community-guidelines" className="bg-[#FF6B00] hover:bg-[#FF6B00]/90 text-white font-medium px-6 py-3 rounded-lg transition-colors duration-200 inline-block">
              View Full Community Guidelines
            </Link>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 bg-[#ffeee3]/50">
        <div className="section-container">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <h2 className="text-3xl font-bold mb-4 text-[#2E2E2E]">
              <span className="bg-gradient-to-r from-[#FF6B00] to-[#FF6B00] bg-clip-text text-transparent">Frequently Asked</span> Questions
            </h2>
            <p className="text-xl text-[#2E2E2E]/80">
              Common questions about our trust and safety measures
            </p>
          </div>

          <div className="max-w-3xl mx-auto">
            <div className="space-y-6">
              {faqs.map((faq) => (
                <div key={faq.id} className="bg-white rounded-lg p-6 border border-[#ffeee3] hover:border-[#FF6B00] shadow-sm transition-all duration-300">
                  <h3 className="text-xl font-bold mb-3 text-[#2E2E2E]">{faq.question}</h3>
                  <p className="text-[#2E2E2E]/80">
                    {faq.answer}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Report Section */}
      <section className="py-20 bg-[#2E2E2E] text-white">
        <div className="section-container">
          <div className="max-w-4xl mx-auto flex flex-col md:flex-row gap-12 items-center">
            <div className="md:w-1/2">
              <h2 className="text-3xl font-bold mb-4">
                Need to <span className="text-[#FF6B00]">Report</span> an Issue?
              </h2>
              <p className="text-xl mb-8 text-[#ffeee3]/90">
                Our support team is available 24/7 to help with any security concerns or violations of our community guidelines.
              </p>
              <Link to="/report-problem" className="bg-[#FF6B00] text-white hover:bg-[#FF6B00]/90 font-medium px-6 py-3 rounded-lg transition-colors duration-200 inline-block">
                Report a Problem
              </Link>
            </div>
            <div className="md:w-1/2 bg-white/10 rounded-lg p-8 backdrop-blur-sm border border-[#ffeee3]/30">
              <h3 className="text-xl font-bold mb-4">Contact Our Trust & Safety Team</h3>
              <div className="space-y-4">
                <div className="flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-3 text-[#FF6B00]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  <span>trust@freelancenest.com</span>
                </div>
                <div className="flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-3 text-[#FF6B00]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                  <span>+1-800-NEST-HELP (available 24/7)</span>
                </div>
                <div className="flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-3 text-[#FF6B00]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  <span>Response Time: Within 24 Hours</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Trust Badges Section */}
      <section className="py-12 bg-[#ffeee3]/30">
        <div className="section-container">
          <div className="max-w-3xl mx-auto text-center mb-8">
            <h3 className="text-xl font-semibold text-[#2E2E2E]/80 mb-4">Certified & Compliant</h3>
          </div>
          <div className="flex flex-wrap justify-center items-center gap-x-12 gap-y-8">
            <div className="bg-white rounded-lg p-4 shadow-sm border border-[#ffeee3]">
              <div className="text-[#FF6B00] font-bold text-lg">SSL SECURED</div>
              <div className="text-sm text-[#2E2E2E]/60">256-bit encryption</div>
            </div>
            <div className="bg-white rounded-lg p-4 shadow-sm border border-[#ffeee3]">
              <div className="text-[#FF6B00] font-bold text-lg">PCI COMPLIANT</div>
              <div className="text-sm text-[#2E2E2E]/60">Payment security</div>
            </div>
            <div className="bg-white rounded-lg p-4 shadow-sm border border-[#ffeee3]">
              <div className="text-[#FF6B00] font-bold text-lg">GDPR READY</div>
              <div className="text-sm text-[#2E2E2E]/60">Data protection</div>
            </div>
            <div className="bg-white rounded-lg p-4 shadow-sm border border-[#ffeee3]">
              <div className="text-[#FF6B00] font-bold text-lg">ISO CERTIFIED</div>
              <div className="text-sm text-[#2E2E2E]/60">Quality standards</div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default TrustAndSafetyPage;
