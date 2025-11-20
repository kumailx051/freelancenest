import React from 'react';
import { Award, Star, Zap, CheckCircle, Clock, Sparkles } from 'lucide-react';

const FreelancerPlusPage: React.FC = () => {
  // Pricing plans
  const plans = [
    {
      name: 'Basic',
      price: 'Free',
      features: [
        'Create a profile',
        'Submit up to 10 proposals/month',
        'Access to basic jobs',
        'Standard support'
      ],
      notIncluded: [
        'Featured profile',
        'Bid priority',
        'Advanced analytics',
        'Skills certification',
        'Project insights'
      ],
      buttonText: 'Available Now',
      isPopular: false,
      disabled: true
    },
    {
      name: 'Plus',
      price: '$14.99/month',
      features: [
        'Everything in Basic',
        'Submit up to 50 proposals/month',
        'Featured profile visibility',
        'Bid priority on projects',
        'Advanced analytics dashboard',
        'Free skills certification',
        'Project insights and recommendations',
        'Priority support'
      ],
      notIncluded: [],
      buttonText: 'Coming Soon',
      isPopular: true,
      disabled: true
    },
    {
      name: 'Business',
      price: '$29.99/month',
      features: [
        'Everything in Plus',
        'Unlimited proposals',
        'Premium profile badge',
        'Custom proposal templates',
        'Client contact export',
        'Team collaboration tools',
        'Premium support with dedicated manager'
      ],
      notIncluded: [],
      buttonText: 'Coming Soon',
      isPopular: false,
      disabled: true
    }
  ];

  // Benefits data
  const benefits = [
    {
      icon: Star,
      title: 'Featured Profile',
      description: 'Your profile will be highlighted in search results, increasing visibility to potential clients by up to 300% when this feature launches.'
    },
    {
      icon: Zap,
      title: 'Bid Priority',
      description: 'Your proposals will appear at the top of client lists, giving you a competitive advantage when bidding on projects.'
    },
    {
      icon: Award,
      title: 'Skills Certification',
      description: 'Get your skills verified with our planned certification program at no extra cost, boosting client trust and confidence.'
    },
    {
      icon: CheckCircle,
      title: 'Analytics Dashboard',
      description: 'Access detailed insights about your performance, profile views, and competitive analysis to optimize your strategy.'
    }
  ];

  return (
    <div className="min-h-screen bg-[#ffeee3]/30">
      {/* Hero Section */}
      <section className="pt-40 pb-16 relative">
        {/* Background */}
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-[#2E2E2E]/90"></div>
        </div>
        
        <div className="section-container relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center bg-[#ffeee3] text-[#FF6B00] px-4 py-2 rounded-full text-sm font-medium mb-6">
              <Clock className="w-4 h-4 mr-2" />
              Coming Soon
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
              FreelanceNest <span className="bg-gradient-to-r from-[#FF6B00] to-[#FF6B00] bg-clip-text text-transparent">Plus</span>
            </h1>
            <p className="text-xl text-[#ffeee3] mb-8 max-w-3xl mx-auto">
              We're working hard to bring you premium features that will revolutionize your freelancing experience. 
              FreelanceNest Plus will include advanced tools, priority support, and exclusive benefits to help you 
              maximize your earning potential.
            </p>
            <div className="bg-[#ffeee3]/10 backdrop-blur-sm rounded-lg p-6 mb-8 max-w-2xl mx-auto">
              <p className="text-[#ffeee3] text-lg">
                <strong className="text-white">Note:</strong> The FreelanceNest platform is currently under development. 
                This premium membership tier will be available once our core platform is fully launched.
              </p>
            </div>
            <button className="bg-[#ffeee3] text-[#2E2E2E] font-bold px-8 py-4 rounded-lg text-lg transition-colors duration-200 shadow-lg cursor-not-allowed" disabled>
              <Sparkles className="w-5 h-5 inline mr-2" />
              Coming Soon
            </button>
          </div>
        </div>
      </section>

      {/* Key Benefits Section */}
      <section className="py-16 bg-white">
        <div className="section-container">
          <div className="max-w-4xl mx-auto mb-16 text-center">
            <h2 className="text-3xl font-bold mb-4 text-[#2E2E2E]">Planned <span className="bg-gradient-to-r from-[#FF6B00] to-[#FF6B00] bg-clip-text text-transparent">Features</span></h2>
            <p className="text-xl text-[#2E2E2E]">
              These premium features will be available once FreelanceNest Plus launches
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {benefits.map((benefit, index) => (
              <div key={index} className="bg-gradient-to-br from-[#ffeee3]/30 to-[#ffeee3]/50 rounded-xl p-8 flex flex-col items-start hover:from-[#ffeee3]/50 hover:to-[#ffeee3]/70 transition-all duration-300 hover:shadow-lg">
                <div className="bg-[#FF6B00]/10 text-[#FF6B00] p-3 rounded-full mb-6">
                  <benefit.icon className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold mb-3 text-[#2E2E2E]">{benefit.title}</h3>
                <p className="text-[#2E2E2E]">{benefit.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Comparison Table Section */}
      <section className="py-16">
        <div className="section-container">
          <div className="max-w-4xl mx-auto mb-16 text-center">
            <h2 className="text-3xl font-bold mb-4 text-[#2E2E2E]">Planned <span className="bg-gradient-to-r from-[#FF6B00] to-[#FF6B00] bg-clip-text text-transparent">Pricing</span></h2>
            <p className="text-xl text-[#2E2E2E] mb-4">
              Tentative pricing structure for when FreelanceNest Plus becomes available
            </p>
            <div className="bg-[#ffeee3]/20 rounded-lg p-4 max-w-2xl mx-auto">
              <p className="text-[#2E2E2E] text-sm">
                <strong>Note:</strong> These prices are preliminary and subject to change. 
                Final pricing will be announced closer to the launch date.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {plans.map((plan, index) => (
              <div 
                key={index} 
                className={`bg-white rounded-xl overflow-hidden shadow-sm transition-all duration-300 ${
                  plan.isPopular ? 'transform scale-105 shadow-xl border-2 border-[#FF6B00]' : 'hover:shadow-lg border-2 border-[#FF6B00]'
                }`}
              >
                {plan.isPopular && (
                  <div className="bg-[#FF6B00] text-white text-center py-2 font-semibold">
                    Most Popular
                  </div>
                )}
                <div className="p-8">
                  <h3 className="text-2xl font-bold mb-2 text-[#2E2E2E]">{plan.name}</h3>
                  <div className="mb-6">
                    <span className="text-3xl font-bold text-[#2E2E2E]">{plan.price}</span>
                    {plan.price !== 'Free' && (
                      <span className="text-[#FF6B00]/70 ml-1">billed monthly</span>
                    )}
                  </div>

                  <div className="space-y-4 mb-8">
                    {plan.features.map((feature, i) => (
                      <div key={i} className="flex items-start">
                        <CheckCircle className="w-5 h-5 text-[#FF6B00] mr-2 shrink-0 mt-0.5" />
                        <span className="text-[#2E2E2E]">{feature}</span>
                      </div>
                    ))}

                    {plan.notIncluded.map((feature, i) => (
                      <div key={i} className="flex items-start text-[#FF6B00]/50">
                        <svg className="w-5 h-5 mr-2 shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                        <span>{feature}</span>
                      </div>
                    ))}
                  </div>

                  <button 
                    className={`w-full py-3 rounded-lg font-medium transition-colors duration-200 ${
                      plan.isPopular
                        ? 'bg-[#FF6B00] hover:bg-[#FF6B00]/90 text-white'
                        : plan.disabled
                          ? 'bg-[#ffeee3]/50 text-[#FF6B00]/60 cursor-not-allowed'
                          : 'bg-white border border-[#FF6B00] text-[#FF6B00] hover:bg-[#FF6B00]/10'
                    }`}
                    disabled={plan.disabled}
                  >
                    {plan.buttonText}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Development Timeline Section */}
      <section className="py-16 bg-[#ffeee3]/20">
        <div className="section-container">
          <div className="max-w-4xl mx-auto mb-16 text-center">
            <h2 className="text-3xl font-bold mb-4 text-[#2E2E2E]">Development <span className="bg-gradient-to-r from-[#FF6B00] to-[#FF6B00] bg-clip-text text-transparent">Timeline</span></h2>
            <p className="text-xl text-[#2E2E2E]">
              Here's what we're working on to make FreelanceNest Plus a reality
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {/* Phase 1 */}
            <div className="bg-white p-8 rounded-xl shadow-sm hover:shadow-lg transition-shadow duration-300 border-l-4 border-[#FF6B00]">
              <div className="flex items-center mb-6">
                <div className="bg-[#FF6B00] text-white rounded-full w-8 h-8 flex items-center justify-center font-bold mr-3">
                  1
                </div>
                <h3 className="text-xl font-bold text-[#2E2E2E]">Core Platform</h3>
              </div>
              <p className="text-[#2E2E2E] mb-4">
                Building the foundational FreelanceNest platform with essential features like user profiles, project posting, and basic messaging.
              </p>
              <div className="text-sm">
                <span className="bg-[#FF6B00] text-white px-2 py-1 rounded">In Progress</span>
              </div>
            </div>

            {/* Phase 2 */}
            <div className="bg-white p-8 rounded-xl shadow-sm hover:shadow-lg transition-shadow duration-300 border-l-4 border-[#FF6B00]">
              <div className="flex items-center mb-6">
                <div className="bg-[#FF6B00] text-white rounded-full w-8 h-8 flex items-center justify-center font-bold mr-3">
                  2
                </div>
                <h3 className="text-xl font-bold text-[#2E2E2E]">Platform Launch</h3>
              </div>
              <p className="text-[#2E2E2E] mb-4">
                Official launch of FreelanceNest with core functionality, user testing, and initial community building.
              </p>
              <div className="text-sm">
                <span className="bg-[#FF6B00] text-white px-2 py-1 rounded">Coming Soon</span>
              </div>
            </div>

            {/* Phase 3 */}
            <div className="bg-white p-8 rounded-xl shadow-sm hover:shadow-lg transition-shadow duration-300 border-l-4 border-[#FF6B00]">
              <div className="flex items-center mb-6">
                <div className="bg-[#FF6B00] text-white rounded-full w-8 h-8 flex items-center justify-center font-bold mr-3">
                  3
                </div>
                <h3 className="text-xl font-bold text-[#2E2E2E]">Plus Features</h3>
              </div>
              <p className="text-[#2E2E2E] mb-4">
                Development and launch of FreelanceNest Plus with premium features, analytics, and advanced tools.
              </p>
              <div className="text-sm">
                <span className="bg-[#FF6B00] text-white px-2 py-1 rounded">Planned</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-24 bg-gradient-to-b from-white to-[#ffeee3]/30">
        <div className="section-container">
          <div className="max-w-4xl mx-auto text-center mb-16">
            <div className="inline-block px-3 py-1 bg-[#ffeee3] text-[#FF6B00] rounded-full text-sm font-semibold mb-3">
              Questions & Answers
            </div>
            <h2 className="text-4xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-[#FF6B00] to-[#FF6B00]">
              Frequently Asked Questions
            </h2>
            <p className="text-xl text-[#2E2E2E]/80 max-w-2xl mx-auto">
              Everything you need to know about FreelanceNest Plus
            </p>
          </div>

          <div className="max-w-3xl mx-auto">
            {/* Accordion Items */}
            <div className="space-y-4">
              {/* FAQ Item 1 */}
              <div className="bg-white rounded-xl shadow-sm overflow-hidden border border-[#ffeee3] hover:border-[#FF6B00] transition-all duration-300">
                <details className="group">
                  <summary className="flex items-center justify-between p-6 cursor-pointer">
                    <h3 className="text-xl font-bold text-[#2E2E2E] flex items-center">
                      <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-[#ffeee3] text-[#FF6B00] text-sm font-bold mr-4">Q</span>
                      When will FreelanceNest Plus be available?
                    </h3>
                    <div className="w-8 h-8 flex-shrink-0 bg-[#ffeee3] rounded-full flex items-center justify-center group-open:rotate-180 transition-transform duration-300">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-[#FF6B00]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </div>
                  </summary>
                  <div className="px-6 pb-6 pt-2 text-[#2E2E2E]/80">
                    <div className="bg-[#ffeee3] border-l-4 border-[#FF6B00] pl-4 py-3 mb-3">
                      <p className="font-medium text-[#2E2E2E]">FreelanceNest Plus will be launched after the core platform is operational:</p>
                    </div>
                    <p>FreelanceNest Plus will be launched after the core FreelanceNest platform is fully developed and operational. We're currently in the development phase and will announce the launch date once we get closer to completion.</p>
                  </div>
                </details>
              </div>

              {/* FAQ Item 2 */}
              <div className="bg-white rounded-xl shadow-sm overflow-hidden border border-[#ffeee3] hover:border-[#FF6B00] transition-all duration-300">
                <details className="group">
                  <summary className="flex items-center justify-between p-6 cursor-pointer">
                    <h3 className="text-xl font-bold text-[#2E2E2E] flex items-center">
                      <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-[#ffeee3] text-[#FF6B00] text-sm font-bold mr-4">Q</span>
                      Can I sign up for early access to FreelanceNest Plus?
                    </h3>
                    <div className="w-8 h-8 flex-shrink-0 bg-[#ffeee3] rounded-full flex items-center justify-center group-open:rotate-180 transition-transform duration-300">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-[#FF6B00]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </div>
                  </summary>
                  <div className="px-6 pb-6 pt-2 text-[#2E2E2E]/80">
                    <div className="bg-[#ffeee3] border-l-4 border-[#FF6B00] pl-4 py-3 mb-3">
                      <p className="font-medium text-[#2E2E2E]">Early access opportunities will be announced:</p>
                    </div>
                    <p>While we're not accepting sign-ups yet, we encourage you to stay tuned to our platform announcements. Once the core platform launches, we'll provide information about early access opportunities for Plus features.</p>
                  </div>
                </details>
              </div>

              {/* FAQ Item 3 */}
              <div className="bg-white rounded-xl shadow-sm overflow-hidden border border-[#ffeee3] hover:border-[#FF6B00] transition-all duration-300">
                <details className="group">
                  <summary className="flex items-center justify-between p-6 cursor-pointer">
                    <h3 className="text-xl font-bold text-[#2E2E2E] flex items-center">
                      <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-[#ffeee3] text-[#FF6B00] text-sm font-bold mr-4">Q</span>
                      Will the pricing change from what's shown here?
                    </h3>
                    <div className="w-8 h-8 flex-shrink-0 bg-[#ffeee3] rounded-full flex items-center justify-center group-open:rotate-180 transition-transform duration-300">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-[#FF6B00]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </div>
                  </summary>
                  <div className="px-6 pb-6 pt-2 text-[#2E2E2E]/80">
                    <div className="bg-[#ffeee3] border-l-4 border-[#FF6B00] pl-4 py-3 mb-3">
                      <p className="font-medium text-[#2E2E2E]">Pricing is preliminary and subject to change:</p>
                    </div>
                    <p>The pricing shown is preliminary and subject to change. We'll finalize the pricing structure based on market research and feature development costs. Final pricing will be announced before the official launch.</p>
                  </div>
                </details>
              </div>

              {/* FAQ Item 4 */}
              <div className="bg-white rounded-xl shadow-sm overflow-hidden border border-[#ffeee3] hover:border-[#FF6B00] transition-all duration-300">
                <details className="group">
                  <summary className="flex items-center justify-between p-6 cursor-pointer">
                    <h3 className="text-xl font-bold text-[#2E2E2E] flex items-center">
                      <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-[#ffeee3] text-[#FF6B00] text-sm font-bold mr-4">Q</span>
                      What's the current status of the FreelanceNest platform?
                    </h3>
                    <div className="w-8 h-8 flex-shrink-0 bg-[#ffeee3] rounded-full flex items-center justify-center group-open:rotate-180 transition-transform duration-300">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-[#FF6B00]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </div>
                  </summary>
                  <div className="px-6 pb-6 pt-2 text-[#2E2E2E]/80">
                    <div className="bg-[#ffeee3] border-l-4 border-[#FF6B00] pl-4 py-3 mb-3">
                      <p className="font-medium text-[#2E2E2E]">Currently under active development:</p>
                    </div>
                    <p>FreelanceNest is currently under active development. We're building the core functionality first, including user registration, project posting, and basic communication tools. Premium features will follow once the foundation is solid.</p>
                  </div>
                </details>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-[#2E2E2E] text-white">
        <div className="section-container">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-6">Stay <span className="bg-gradient-to-r from-[#FF6B00] to-[#FF6B00] bg-clip-text text-transparent">Updated</span> on Our Progress</h2>
            <p className="text-xl opacity-90 mb-8 text-white">
              We're working hard to bring you FreelanceNest and FreelanceNest Plus. Follow our development journey and be the first to know when we launch.
            </p>
            <div className="flex justify-center">
              <button className="bg-[#ffeee3] text-[#2E2E2E] font-bold px-8 py-4 rounded-lg text-lg transition-colors duration-200 shadow-lg cursor-not-allowed" disabled>
                <Clock className="w-5 h-5 inline mr-2" />
                Coming Soon
              </button>
            </div>
            <p className="mt-8 text-sm opacity-80 text-white">
              FreelanceNest platform is currently under development. Plus features will be available after the main platform launches.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default FreelancerPlusPage;












