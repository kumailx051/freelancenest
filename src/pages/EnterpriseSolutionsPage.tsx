import React from 'react';
import { Link } from 'react-router-dom';

// Sample enterprise client logos
const clientLogos = [
  {
    id: 1,
    name: 'Microsoft',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/44/Microsoft_logo.svg/2048px-Microsoft_logo.svg.png',
  },
  {
    id: 2,
    name: 'Google',
    logo: 'https://www.vectorlogo.zone/logos/google/google-ar21.svg',
  },
  {
    id: 3,
    name: 'Airbnb',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/69/Airbnb_Logo_B%C3%A9lo.svg/2560px-Airbnb_Logo_B%C3%A9lo.svg.png',
  },
  {
    id: 4,
    name: 'Spotify',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/26/Spotify_logo_with_text.svg/2560px-Spotify_logo_with_text.svg.png',
  },
  {
    id: 5,
    name: 'Samsung',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/24/Samsung_Logo.svg/2560px-Samsung_Logo.svg.png',
  },
  {
    id: 6,
    name: 'Netflix',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/08/Netflix_2015_logo.svg/2560px-Netflix_2015_logo.svg.png',
  },
];

// Sample testimonials
const testimonials = [
  {
    id: 1,
    quote: "Working with the Enterprise Solutions team helped us scale our development capacity by 40% while maintaining the highest quality standards. The transition was seamless and the results have been outstanding.",
    author: "Sarah Johnson",
    title: "CTO at TechInnovate",
    avatar: "https://randomuser.me/api/portraits/women/32.jpg"
  },
  {
    id: 2,
    quote: "The Enterprise team understood our complex requirements from day one. They matched us with specialized talent that integrated perfectly with our internal teams, resulting in faster time-to-market for our products.",
    author: "Michael Chen",
    title: "VP of Engineering, DataFlow Systems",
    avatar: "https://randomuser.me/api/portraits/men/41.jpg"
  },
  {
    id: 3,
    quote: "As a rapidly growing company, we needed flexible access to top talent. The Enterprise Solutions program provided exactly what we needed, with streamlined processes and outstanding support from day one.",
    author: "Emily Rodriguez",
    title: "Head of Product, Fintech Solutions",
    avatar: "https://randomuser.me/api/portraits/women/63.jpg"
  }
];

// Sample solution offerings
const solutions = [
  {
    id: 1,
    title: "Talent Management",
    description: "Access to our curated network of pre-vetted, enterprise-ready talent across all skill categories.",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
      </svg>
    )
  },
  {
    id: 2,
    title: "Project Management",
    description: "End-to-end project oversight with dedicated account managers and project coordinators.",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
      </svg>
    )
  },
  {
    id: 3,
    title: "Compliance & Security",
    description: "Enterprise-grade security protocols, IP protection, and compliance with industry regulations.",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
      </svg>
    )
  },
  {
    id: 4,
    title: "Custom Workflows",
    description: "Tailored processes that integrate with your existing systems and meet your specific business needs.",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z" />
      </svg>
    )
  },
  {
    id: 5,
    title: "Consolidated Billing",
    description: "Streamlined invoicing, flexible payment options, and detailed expense reporting.",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" />
      </svg>
    )
  },
  {
    id: 6,
    title: "Strategic Consulting",
    description: "Expert guidance on workforce strategy, technology adoption, and digital transformation initiatives.",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
      </svg>
    )
  }
];

const EnterpriseSolutionsPage: React.FC = () => {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="pt-40 pb-16 relative">
        {/* Background */}
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-[#2E2E2E]/90"></div>
        </div>
        
        <div className="section-container relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
              <span className="bg-gradient-to-r from-[#FF6B00] to-[#FF6B00] bg-clip-text text-transparent">Enterprise</span> Solutions
            </h1>
            <p className="text-xl text-[#ffeee3] mb-8">
              Scale your workforce flexibly with our managed talent solutions. Access top professionals with enterprise-grade security and compliance.
            </p>
            <div className="flex justify-center">
              <Link to="/talk-to-sales" className="bg-[#ffeee3] text-[#2E2E2E] hover:bg-white font-medium px-6 py-3 rounded-lg transition-colors duration-200 text-center">
                Talk to Sales
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Trusted By Section */}
      <section className="bg-[#ffeee3] py-10">
        <div className="section-container">
          <p className="text-center text-[#2E2E2E] font-medium mb-8">TRUSTED BY INDUSTRY LEADERS</p>
          <div className="flex flex-wrap justify-center items-center gap-x-12 gap-y-8">
            {clientLogos.map((client) => (
              <div key={client.id} className="h-12">
                <img 
                  src={client.logo} 
                  alt={client.name} 
                  className="h-full object-contain opacity-70 hover:opacity-100 transition-opacity duration-200"
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Solutions Section */}
      <section className="py-20 bg-white">
        <div className="section-container">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <h2 className="text-3xl font-bold mb-4 text-[#2E2E2E]">
              <span className="bg-gradient-to-r from-[#FF6B00] to-[#FF6B00] bg-clip-text text-transparent">Comprehensive</span> Enterprise Solutions
            </h2>
            <p className="text-xl text-[#2E2E2E]/80">
              Our enterprise program is designed to address the complex needs of large organizations with customizable solutions.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {solutions.map((solution) => (
              <div key={solution.id} className="bg-white p-8 rounded-xl border border-[#ffeee3] hover:border-[#FF6B00] hover:shadow-md transition-all duration-300">
                <div className="text-[#FF6B00] mb-5">
                  {solution.icon}
                </div>
                <h3 className="text-xl font-bold mb-3 text-[#2E2E2E]">{solution.title}</h3>
                <p className="text-[#2E2E2E]/80">{solution.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-[#2E2E2E] text-white">
        <div className="section-container">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">
              <span className="bg-gradient-to-r from-[#FF6B00] to-[#FF6B00] bg-clip-text text-transparent">Enterprise</span> Impact
            </h2>
            <p className="text-xl text-[#ffeee3]/90">
              Delivering measurable results for organizations around the world
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 text-center">
            <div className="p-6">
              <div className="text-4xl md:text-5xl font-bold mb-2 text-[#FF6B00]">500+</div>
              <p className="text-lg text-[#ffeee3]/90">Enterprise Clients</p>
            </div>
            <div className="p-6">
              <div className="text-4xl md:text-5xl font-bold mb-2 text-[#FF6B00]">90%</div>
              <p className="text-lg text-[#ffeee3]/90">Retention Rate</p>
            </div>
            <div className="p-6">
              <div className="text-4xl md:text-5xl font-bold mb-2 text-[#FF6B00]">40%</div>
              <p className="text-lg text-[#ffeee3]/90">Cost Savings</p>
            </div>
            <div className="p-6">
              <div className="text-4xl md:text-5xl font-bold mb-2 text-[#FF6B00]">75%</div>
              <p className="text-lg text-[#ffeee3]/90">Faster Time to Hire</p>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 bg-white">
        <div className="section-container">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <h2 className="text-3xl font-bold mb-4 text-[#2E2E2E]">
              <span className="bg-gradient-to-r from-[#FF6B00] to-[#FF6B00] bg-clip-text text-transparent">How</span> It Works
            </h2>
            <p className="text-xl text-[#2E2E2E]/80">
              Our streamlined process ensures you get the talent and solutions your enterprise needs
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="relative">
              <div className="bg-[#ffeee3] text-[#FF6B00] rounded-full w-14 h-14 flex items-center justify-center mx-auto mb-6 text-2xl font-bold relative z-10">
                1
              </div>
              <div className="hidden md:block absolute top-7 left-1/2 w-full h-1 bg-[#ffeee3] -z-0"></div>
              <div className="text-center">
                <h3 className="text-xl font-bold mb-3 text-[#2E2E2E]">Consultation</h3>
                <p className="text-[#2E2E2E]/80">
                  Meet with our enterprise team to discuss your workforce needs, challenges, and goals.
                </p>
              </div>
            </div>
            
            <div className="relative">
              <div className="bg-[#ffeee3] text-[#FF6B00] rounded-full w-14 h-14 flex items-center justify-center mx-auto mb-6 text-2xl font-bold relative z-10">
                2
              </div>
              <div className="hidden md:block absolute top-7 left-1/2 w-full h-1 bg-[#ffeee3] -z-0"></div>
              <div className="text-center">
                <h3 className="text-xl font-bold mb-3 text-[#2E2E2E]">Custom Solution</h3>
                <p className="text-[#2E2E2E]/80">
                  Receive a tailored program designed to address your specific requirements and integration needs.
                </p>
              </div>
            </div>
            
            <div className="relative">
              <div className="bg-[#ffeee3] text-[#FF6B00] rounded-full w-14 h-14 flex items-center justify-center mx-auto mb-6 text-2xl font-bold z-10">
                3
              </div>
              <div className="text-center">
                <h3 className="text-xl font-bold mb-3 text-[#2E2E2E]">Implementation</h3>
                <p className="text-[#2E2E2E]/80">
                  Your dedicated account team handles onboarding, talent matching, and ongoing management.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-[#ffeee3]/50">
        <div className="section-container">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <h2 className="text-3xl font-bold mb-4 text-[#2E2E2E]">
              <span className="bg-gradient-to-r from-[#FF6B00] to-[#FF6B00] bg-clip-text text-transparent">What Our</span> Enterprise Clients Say
            </h2>
            <p className="text-xl text-[#2E2E2E]/80">
              Hear from organizations that have transformed their workforce strategy
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial) => (
              <div key={testimonial.id} className="bg-white p-8 rounded-xl shadow-sm border border-[#ffeee3] hover:border-[#FF6B00] transition-all duration-300">
                <div className="flex items-center mb-6">
                  <img 
                    src={testimonial.avatar} 
                    alt={testimonial.author} 
                    className="w-14 h-14 rounded-full object-cover mr-4"
                  />
                  <div>
                    <h4 className="font-bold text-[#2E2E2E]">{testimonial.author}</h4>
                    <p className="text-[#2E2E2E]/70">{testimonial.title}</p>
                  </div>
                </div>
                <blockquote className="text-[#2E2E2E]/80 italic">
                  "{testimonial.quote}"
                </blockquote>
              </div>
            ))}
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
              Everything you need to know about our Enterprise Solutions
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
                      What makes your enterprise solution different?
                    </h3>
                    <div className="w-8 h-8 flex-shrink-0 bg-[#ffeee3] rounded-full flex items-center justify-center group-open:rotate-180 transition-transform duration-300">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-[#FF6B00]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </div>
                  </summary>
                  <div className="px-6 pb-6 pt-2 text-[#2E2E2E]/80">
                    <div className="bg-[#ffeee3] border-l-4 border-[#FF6B00] pl-4 py-3 mb-3">
                      <p className="font-medium text-[#2E2E2E]">Our enterprise solution offers a comprehensive approach:</p>
                    </div>
                    <ul className="space-y-2">
                      <li className="flex items-start">
                        <svg className="h-5 w-5 text-[#FF6B00] mt-0.5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                        </svg>
                        <span>Access to pre-vetted elite talent across all skill categories</span>
                      </li>
                      <li className="flex items-start">
                        <svg className="h-5 w-5 text-[#FF6B00] mt-0.5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                        </svg>
                        <span>Robust security measures with enterprise-grade protection</span>
                      </li>
                      <li className="flex items-start">
                        <svg className="h-5 w-5 text-[#FF6B00] mt-0.5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                        </svg>
                        <span>Dedicated account management and customized workflows</span>
                      </li>
                      <li className="flex items-start">
                        <svg className="h-5 w-5 text-[#FF6B00] mt-0.5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                        </svg>
                        <span>Seamless integration with your existing systems and infrastructure</span>
                      </li>
                      <li className="flex items-start">
                        <svg className="h-5 w-5 text-[#FF6B00] mt-0.5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                        </svg>
                        <span>Comprehensive compliance and IP protection protocols</span>
                      </li>
                    </ul>
                  </div>
                </details>
              </div>

              {/* FAQ Item 2 */}
              <div className="bg-white rounded-xl shadow-sm overflow-hidden border border-[#ffeee3] hover:border-[#FF6B00] transition-all duration-300">
                <details className="group">
                  <summary className="flex items-center justify-between p-6 cursor-pointer">
                    <h3 className="text-xl font-bold text-[#2E2E2E] flex items-center">
                      <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-[#ffeee3] text-[#FF6B00] text-sm font-bold mr-4">Q</span>
                      How do you ensure quality and security?
                    </h3>
                    <div className="w-8 h-8 flex-shrink-0 bg-[#ffeee3] rounded-full flex items-center justify-center group-open:rotate-180 transition-transform duration-300">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-[#FF6B00]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </div>
                  </summary>
                  <div className="px-6 pb-6 pt-2 text-[#2E2E2E]/80">
                    <div className="bg-[#ffeee3] border-l-4 border-[#FF6B00] pl-4 py-3 mb-3">
                      <p className="font-medium text-[#2E2E2E]">We implement multiple layers of security and quality control:</p>
                    </div>
                    <ul className="space-y-2">
                      <li className="flex items-start">
                        <svg className="h-5 w-5 text-[#FF6B00] mt-0.5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                        </svg>
                        <span>Rigorous screening and vetting processes for all talent</span>
                      </li>
                      <li className="flex items-start">
                        <svg className="h-5 w-5 text-[#FF6B00] mt-0.5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                        </svg>
                        <span>SOC 2 compliance and industry-standard security protocols</span>
                      </li>
                      <li className="flex items-start">
                        <svg className="h-5 w-5 text-[#FF6B00] mt-0.5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                        </svg>
                        <span>Background checks and required NDAs for all enterprise engagements</span>
                      </li>
                      <li className="flex items-start">
                        <svg className="h-5 w-5 text-[#FF6B00] mt-0.5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                        </svg>
                        <span>Customized compliance programs specific to your industry requirements</span>
                      </li>
                    </ul>
                  </div>
                </details>
              </div>

              {/* FAQ Item 3 */}
              <div className="bg-white rounded-xl shadow-sm overflow-hidden border border-[#ffeee3] hover:border-[#FF6B00] transition-all duration-300">
                <details className="group">
                  <summary className="flex items-center justify-between p-6 cursor-pointer">
                    <h3 className="text-xl font-bold text-[#2E2E2E] flex items-center">
                      <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-[#ffeee3] text-[#FF6B00] text-sm font-bold mr-4">Q</span>
                      Can we scale our team up or down as needed?
                    </h3>
                    <div className="w-8 h-8 flex-shrink-0 bg-[#ffeee3] rounded-full flex items-center justify-center group-open:rotate-180 transition-transform duration-300">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-[#FF6B00]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </div>
                  </summary>
                  <div className="px-6 pb-6 pt-2 text-[#2E2E2E]/80">
                    <p className="mb-3">
                      <span className="font-semibold text-[#FF6B00]">Absolutely.</span> Our enterprise model is designed for maximum flexibility to adapt to your changing needs.
                    </p>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                      <div className="bg-[#ffeee3] p-4 rounded-lg">
                        <h4 className="font-semibold mb-2 text-[#2E2E2E]">Scaling Up</h4>
                        <p className="text-sm">Quickly add talent for peak periods or special projects with minimal onboarding friction.</p>
                      </div>
                      <div className="bg-[#ffeee3] p-4 rounded-lg">
                        <h4 className="font-semibold mb-2 text-[#2E2E2E]">Scaling Down</h4>
                        <p className="text-sm">Reduce your workforce during slower periods without the typical HR complexities.</p>
                      </div>
                    </div>
                    <p className="mt-4">
                      Your dedicated account manager will help manage these transitions seamlessly, ensuring continuity in your operations regardless of scale changes.
                    </p>
                  </div>
                </details>
              </div>

              {/* FAQ Item 4 */}
              <div className="bg-white rounded-xl shadow-sm overflow-hidden border border-[#ffeee3] hover:border-[#FF6B00] transition-all duration-300">
                <details className="group">
                  <summary className="flex items-center justify-between p-6 cursor-pointer">
                    <h3 className="text-xl font-bold text-[#2E2E2E] flex items-center">
                      <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-[#ffeee3] text-[#FF6B00] text-sm font-bold mr-4">Q</span>
                      How is billing handled for enterprise clients?
                    </h3>
                    <div className="w-8 h-8 flex-shrink-0 bg-[#ffeee3] rounded-full flex items-center justify-center group-open:rotate-180 transition-transform duration-300">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-[#FF6B00]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </div>
                  </summary>
                  <div className="px-6 pb-6 pt-2 text-[#2E2E2E]/80">
                    <p className="mb-4">
                      We offer flexible and consolidated billing options tailored specifically to enterprise needs:
                    </p>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                      <div className="bg-[#ffeee3] p-3 rounded-lg text-center">
                        <div className="text-[#FF6B00] mb-1">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                          </svg>
                        </div>
                        <p className="text-xs font-medium">Consolidated Invoicing</p>
                      </div>
                      <div className="bg-[#ffeee3] p-3 rounded-lg text-center">
                        <div className="text-[#FF6B00] mb-1">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                          </svg>
                        </div>
                        <p className="text-xs font-medium">Detailed Reporting</p>
                      </div>
                      <div className="bg-[#ffeee3] p-3 rounded-lg text-center">
                        <div className="text-[#FF6B00] mb-1">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2z" />
                          </svg>
                        </div>
                        <p className="text-xs font-medium">Flexible Payment Terms</p>
                      </div>
                      <div className="bg-[#ffeee3] p-3 rounded-lg text-center">
                        <div className="text-[#FF6B00] mb-1">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 4a2 2 0 114 0v1a1 1 0 001 1h3a1 1 0 011 1v3a1 1 0 01-1 1h-1a2 2 0 100 4h1a1 1 0 011 1v3a1 1 0 01-1 1h-3a1 1 0 01-1-1v-1a2 2 0 10-4 0v1a1 1 0 01-1 1H7a1 1 0 01-1-1v-3a1 1 0 00-1-1H4a2 2 0 110-4h1a1 1 0 001-1V7a1 1 0 011-1h3a1 1 0 001-1V4z" />
                          </svg>
                        </div>
                        <p className="text-xs font-medium">System Integration</p>
                      </div>
                    </div>
                    <p className="mt-4">
                      We can also work directly with your procurement system to create a seamless billing experience that aligns with your internal processes.
                    </p>
                  </div>
                </details>
              </div>
              
              {/* FAQ Item 5 - New FAQ */}
              <div className="bg-white rounded-xl shadow-sm overflow-hidden border border-[#ffeee3] hover:border-[#FF6B00] transition-all duration-300">
                <details className="group">
                  <summary className="flex items-center justify-between p-6 cursor-pointer">
                    <h3 className="text-xl font-bold text-[#2E2E2E] flex items-center">
                      <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-[#ffeee3] text-[#FF6B00] text-sm font-bold mr-4">Q</span>
                      What types of businesses do you work with?
                    </h3>
                    <div className="w-8 h-8 flex-shrink-0 bg-[#ffeee3] rounded-full flex items-center justify-center group-open:rotate-180 transition-transform duration-300">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-[#FF6B00]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </div>
                  </summary>
                  <div className="px-6 pb-6 pt-2 text-[#2E2E2E]/80">
                    <p className="mb-4">
                      Our enterprise solutions are designed to serve organizations across various industries and sizes:
                    </p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="flex items-start">
                        <div className="bg-[#ffeee3] p-2 rounded-lg mr-3">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-[#FF6B00]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                          </svg>
                        </div>
                        <div>
                          <h4 className="font-semibold mb-1 text-[#2E2E2E]">Enterprise Companies</h4>
                          <p className="text-sm">Fortune 500 and large multinational corporations</p>
                        </div>
                      </div>
                      <div className="flex items-start">
                        <div className="bg-[#ffeee3] p-2 rounded-lg mr-3">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-[#FF6B00]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                          </svg>
                        </div>
                        <div>
                          <h4 className="font-semibold mb-1 text-[#2E2E2E]">Mid-Market Businesses</h4>
                          <p className="text-sm">Growing companies with established processes</p>
                        </div>
                      </div>
                      <div className="flex items-start">
                        <div className="bg-[#ffeee3] p-2 rounded-lg mr-3">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-[#FF6B00]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                          </svg>
                        </div>
                        <div>
                          <h4 className="font-semibold mb-1 text-[#2E2E2E]">Scale-Ups</h4>
                          <p className="text-sm">Fast-growing companies that need flexible talent solutions</p>
                        </div>
                      </div>
                      <div className="flex items-start">
                        <div className="bg-[#ffeee3] p-2 rounded-lg mr-3">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-[#FF6B00]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                          </svg>
                        </div>
                        <div>
                          <h4 className="font-semibold mb-1 text-[#2E2E2E]">Public Sector</h4>
                          <p className="text-sm">Government agencies with specialized compliance needs</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </details>
              </div>
            </div>
            
            {/* Have more questions */}
            <div className="mt-12 text-center">
              <p className="text-[#2E2E2E]/80 mb-4">Have more questions about our Enterprise Solutions?</p>
              <Link to="/talk-to-sales" className="inline-flex items-center text-[#FF6B00] font-semibold hover:text-[#FF6B00]/80 transition-colors">
                Contact our enterprise team
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-[#2E2E2E] text-white">
        <div className="section-container">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Ready to <span className="text-[#FF6B00]">transform</span> your workforce strategy?
            </h2>
            <p className="text-xl mb-8 text-[#ffeee3]/90">
              Schedule a consultation with our enterprise team to discuss your organization's specific needs.
            </p>
            <div className="flex justify-center">
              <Link to="/talk-to-sales" className="bg-[#FF6B00] text-white hover:bg-[#FF6B00]/90 font-medium px-8 py-4 rounded-lg transition-colors duration-200 text-center">
                Request a Consultation
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default EnterpriseSolutionsPage;
