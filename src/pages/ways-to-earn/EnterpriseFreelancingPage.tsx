import React from 'react';
import { Link } from 'react-router-dom';
import { Building, Shield, CreditCard, Users, CheckCircle, FileText, Award, ArrowRight, Clock } from 'lucide-react';

const EnterpriseFreelancingPage: React.FC = () => {
  // Sample enterprise clients
  const enterpriseClients = [
    { id: 1, name: 'Acme Corporation', logo: 'https://via.placeholder.com/150x50?text=ACME' },
    { id: 2, name: 'Globex', logo: 'https://via.placeholder.com/150x50?text=GLOBEX' },
    { id: 3, name: 'Initech', logo: 'https://via.placeholder.com/150x50?text=INITECH' },
    { id: 4, name: 'Massive Dynamic', logo: 'https://via.placeholder.com/150x50?text=MASSIVE' },
    { id: 5, name: 'Stark Industries', logo: 'https://via.placeholder.com/150x50?text=STARK' },
    { id: 6, name: 'Umbrella Corp', logo: 'https://via.placeholder.com/150x50?text=UMBRELLA' }
  ];
  
  // Sample enterprise opportunities
  const enterpriseOpportunities = [
    {
      id: 1,
      title: 'Senior Full Stack Developer',
      company: 'Global Tech Solutions',
      duration: '6-12 months',
      rate: '$85-110/hr',
      location: 'Remote (EST timezone)',
      skills: ['React', 'Node.js', 'AWS', 'TypeScript', 'GraphQL'],
      featured: true
    },
    {
      id: 2,
      title: 'UX/UI Lead Designer',
      company: 'Financial Services Group',
      duration: '4-6 months',
      rate: '$75-95/hr',
      location: 'Hybrid (New York)',
      skills: ['Figma', 'Design Systems', 'User Research', 'Prototyping'],
      featured: false
    },
    {
      id: 3,
      title: 'DevOps Engineer',
      company: 'Healthcare Innovation',
      duration: '3 months',
      rate: '$90-120/hr',
      location: 'Remote (Global)',
      skills: ['Kubernetes', 'Docker', 'CI/CD', 'AWS', 'Terraform'],
      featured: false
    }
  ];
  
  // Sample requirements
  const enterpriseRequirements = [
    {
      title: '5+ Years Experience',
      description: 'Professional experience in your primary skill area'
    },
    {
      title: 'Advanced Expertise',
      description: 'Proven track record in senior or lead roles'
    },
    {
      title: 'Enterprise Experience',
      description: 'Previous work with large organizations'
    },
    {
      title: 'Background Check',
      description: 'Ability to pass required security verifications'
    }
  ];
  
  // Sample benefits
  const enterpriseBenefits = [
    {
      icon: 'credit-card',
      title: 'Premium Rates',
      description: 'Enterprise projects typically pay 30-50% higher rates than standard freelance work'
    },
    {
      icon: 'clock',
      title: 'Long-Term Engagements',
      description: 'Projects typically last 3-12 months with potential for extensions'
    },
    {
      icon: 'shield',
      title: 'Guaranteed Payment',
      description: 'Secure payment terms with established organizations'
    },
    {
      icon: 'users',
      title: 'Professional Network',
      description: 'Connect with industry leaders and expand your professional network'
    }
  ];
  
  // Sample testimonials
  const testimonials = [
    {
      quote: "Joining the enterprise program transformed my freelance career. I now work with Fortune 500 clients at premium rates while maintaining my independence.",
      author: "Sarah M.",
      role: "Senior Software Architect",
      image: "https://randomuser.me/api/portraits/women/32.jpg"
    },
    {
      quote: "The vetting process was thorough, but completely worth it. Enterprise clients trust me immediately because of my verified status, and the projects are consistently high-quality.",
      author: "David K.",
      role: "UX/UI Design Lead",
      image: "https://randomuser.me/api/portraits/men/41.jpg"
    }
  ];

  return (
    <div className="min-h-screen bg-[#ffeee3]">
      {/* Hero Section */}
      <section className="pt-40 pb-20 bg-gradient-to-r from-primary-500 to-purple-600">
        <div className="section-container">
          <div className="max-w-3xl mx-auto text-center">
            <div className="inline-flex items-center px-4 py-2 bg-white/20 rounded-full text-white backdrop-blur-sm mb-4">
              <Shield className="h-5 w-5 mr-2" />
              <span className="font-medium">Enterprise Verified Program</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">Enterprise Freelancing</h1>
            <p className="text-xl text-[#ffeee3] mb-8">
              Access exclusive high-value opportunities with Fortune 500 companies and leading organizations
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link 
                to="/login" 
                className="bg-white text-[#FF6B00] hover:bg-[#ffeee3] font-medium px-6 py-3 rounded-lg transition-colors duration-200 flex items-center justify-center"
              >
                Apply to Program
              </Link>
              <Link
                to="/talk-to-sales"
                className="bg-transparent border border-white text-white hover:bg-white/10 font-medium px-6 py-3 rounded-lg transition-colors duration-200"
              >
                Learn More
              </Link>
            </div>
          </div>
        </div>
        
        {/* Enterprise Clients */}
        <div className="max-w-5xl mx-auto mt-16">
          <div className="text-center mb-6">
            <p className="text-white text-opacity-80 font-medium">Trusted by leading global organizations</p>
          </div>
          <div className="flex flex-wrap justify-center gap-8">
            {enterpriseClients.map(client => (
              <div key={client.id} className="grayscale hover:grayscale-0 transition-all duration-300">
                <img src={client.logo} alt={client.name} className="h-10" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Opportunities */}
      <section className="py-16">
        <div className="section-container">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">Featured Enterprise Opportunities</h2>
              <p className="text-xl text-[#2E2E2E]">
                Exclusive high-rate projects with leading organizations
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {enterpriseOpportunities.map(opportunity => (
                <div 
                  key={opportunity.id}
                  className={`rounded-xl shadow-sm overflow-hidden ${
                    opportunity.featured 
                      ? 'border-2 border-[#FF6B00] relative' 
                      : 'border border-[#ffeee3]'
                  }`}
                >
                  {opportunity.featured && (
                    <div className="absolute top-0 right-0 bg-[#FF6B00] text-white text-xs font-bold px-3 py-1 rounded-bl-lg">
                      FEATURED
                    </div>
                  )}
                  <div className="bg-white p-6">
                    <h3 className="text-xl font-bold mb-2">{opportunity.title}</h3>
                    <div className="flex items-center mb-4">
                      <Building className="h-4 w-4 text-[#ffeee3] mr-2" />
                      <span className="text-[#2E2E2E]">{opportunity.company}</span>
                    </div>
                    <div className="grid grid-cols-2 gap-2 mb-4">
                      <div className="flex flex-col">
                        <span className="text-sm text-[#ffeee3]">Duration</span>
                        <span className="font-medium">{opportunity.duration}</span>
                      </div>
                      <div className="flex flex-col">
                        <span className="text-sm text-[#ffeee3]">Rate</span>
                        <span className="font-medium text-[#FF6B00]">{opportunity.rate}</span>
                      </div>
                      <div className="flex flex-col col-span-2">
                        <span className="text-sm text-[#ffeee3]">Location</span>
                        <span className="font-medium">{opportunity.location}</span>
                      </div>
                    </div>
                    <div className="mb-4">
                      <div className="text-sm text-[#ffeee3] mb-2">Required Skills</div>
                      <div className="flex flex-wrap gap-2">
                        {opportunity.skills.map((skill, index) => (
                          <span 
                            key={index}
                            className="bg-[#ffeee3] text-[#2E2E2E] text-xs px-2 py-1 rounded-full"
                          >
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>
                    <div className="mt-6 pt-4 border-t border-[#ffeee3] flex justify-between items-center">
                      <div className="flex items-center">
                        <Shield className="h-4 w-4 text-[#FF6B00] mr-1" />
                        <span className="text-sm text-[#FF6B00] font-medium">
                          Verified Client
                        </span>
                      </div>
                      <Link
                        to="/login"
                        className="text-sm font-medium text-[#FF6B00] hover:text-[#2E2E2E] flex items-center"
                      >
                        View Details
                        <ArrowRight className="h-3 w-3 ml-1" />
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="mt-8 text-center">
              <Link
                to="/login"
                className="bg-[#ffeee3] text-[#2E2E2E] hover:bg-[#ffeee3] font-medium px-6 py-3 rounded-lg transition-colors duration-200 inline-block"
              >
                View All Enterprise Opportunities
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-16 bg-[#2E2E2E] text-white">
        <div className="section-container">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">How Enterprise Freelancing Works</h2>
              <p className="text-xl text-[#ffeee3]">
                Join our exclusive program to access premium opportunities
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <div className="relative">
                <div className="bg-[#2E2E2E]/50 h-16 w-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <div className="text-2xl font-bold">1</div>
                </div>
                <h3 className="text-lg font-bold text-center mb-2">Apply</h3>
                <p className="text-[#ffeee3] text-center text-sm">
                  Submit your application with portfolio and credentials
                </p>
                {/* Connector line */}
                <div className="hidden md:block absolute top-8 left-full w-full h-0.5 bg-[#2E2E2E] -z-10"></div>
              </div>
              
              <div className="relative">
                <div className="bg-[#2E2E2E]/50 h-16 w-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <div className="text-2xl font-bold">2</div>
                </div>
                <h3 className="text-lg font-bold text-center mb-2">Verification</h3>
                <p className="text-[#ffeee3] text-center text-sm">
                  Complete thorough vetting and skill assessment
                </p>
                {/* Connector line */}
                <div className="hidden md:block absolute top-8 left-full w-full h-0.5 bg-[#2E2E2E] -z-10"></div>
              </div>
              
              <div className="relative">
                <div className="bg-[#2E2E2E]/50 h-16 w-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <div className="text-2xl font-bold">3</div>
                </div>
                <h3 className="text-lg font-bold text-center mb-2">Approval</h3>
                <p className="text-[#ffeee3] text-center text-sm">
                  Receive enterprise badge and access to exclusive projects
                </p>
                {/* Connector line */}
                <div className="hidden md:block absolute top-8 left-full w-full h-0.5 bg-[#2E2E2E] -z-10"></div>
              </div>
              
              <div>
                <div className="bg-[#2E2E2E]/50 h-16 w-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <div className="text-2xl font-bold">4</div>
                </div>
                <h3 className="text-lg font-bold text-center mb-2">Engagement</h3>
                <p className="text-[#ffeee3] text-center text-sm">
                  Apply for premium projects with Fortune 500 companies
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Requirements */}
      <section className="py-16">
        <div className="section-container">
          <div className="max-w-5xl mx-auto">
            <div className="md:flex justify-between items-start gap-12">
              <div className="md:w-1/2 mb-8 md:mb-0">
                <h2 className="text-3xl font-bold mb-6">Program Requirements</h2>
                <p className="text-[#2E2E2E] mb-8">
                  Enterprise freelancing requires a proven track record of excellence. We maintain strict standards to ensure our enterprise clients receive the highest quality talent.
                </p>
                <div className="space-y-4">
                  {enterpriseRequirements.map((req, index) => (
                    <div key={index} className="flex items-start">
                      <div className="bg-[#ffeee3] p-2 rounded-full mr-4">
                        <CheckCircle className="h-5 w-5 text-[#FF6B00]" />
                      </div>
                      <div>
                        <h3 className="font-bold">{req.title}</h3>
                        <p className="text-[#2E2E2E] text-sm">{req.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="mt-8">
                  <Link
                    to="/talk-to-sales"
                    className="text-[#FF6B00] font-medium hover:text-[#2E2E2E] inline-flex items-center"
                  >
                    View detailed requirements
                    <ArrowRight className="h-4 w-4 ml-1" />
                  </Link>
                </div>
              </div>
              
              <div className="md:w-1/2">
                <div className="bg-white rounded-xl border border-[#ffeee3] shadow-sm overflow-hidden">
                  <div className="p-6 border-b border-[#ffeee3]">
                    <h3 className="text-xl font-bold">Verification Process</h3>
                    <p className="text-[#2E2E2E] text-sm mt-2">
                      Our comprehensive verification process ensures only top-tier professionals join the enterprise program.
                    </p>
                  </div>
                  <div className="p-6 space-y-4">
                    <div className="flex items-center">
                      <div className="bg-[#ffeee3] rounded-full p-2 mr-4">
                        <FileText className="h-5 w-5 text-[#2E2E2E]" />
                      </div>
                      <div>
                        <h4 className="font-medium">Skills Assessment</h4>
                        <p className="text-[#ffeee3] text-sm">Technical evaluation in your area of expertise</p>
                      </div>
                    </div>
                    <div className="flex items-center">
                      <div className="bg-[#ffeee3] rounded-full p-2 mr-4">
                        <Users className="h-5 w-5 text-[#2E2E2E]" />
                      </div>
                      <div>
                        <h4 className="font-medium">Professional Reference Check</h4>
                        <p className="text-[#ffeee3] text-sm">Verification with past clients and employers</p>
                      </div>
                    </div>
                    <div className="flex items-center">
                      <div className="bg-[#ffeee3] rounded-full p-2 mr-4">
                        <Shield className="h-5 w-5 text-[#2E2E2E]" />
                      </div>
                      <div>
                        <h4 className="font-medium">Background Verification</h4>
                        <p className="text-[#ffeee3] text-sm">Identity and professional history confirmation</p>
                      </div>
                    </div>
                    <div className="flex items-center">
                      <div className="bg-[#ffeee3] rounded-full p-2 mr-4">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-[#2E2E2E]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 9l3 3-3 3m5 0h3M5 20h14a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                      </div>
                      <div>
                        <h4 className="font-medium">Interview</h4>
                        <p className="text-[#ffeee3] text-sm">Final discussion with program managers</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="py-16 bg-[#ffeee3]">
        <div className="section-container">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">Enterprise Program Benefits</h2>
              <p className="text-xl text-[#2E2E2E]">
                Accelerate your freelance career with premium opportunities
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {enterpriseBenefits.map((benefit, index) => (
                <div key={index} className="bg-white p-6 rounded-xl shadow-sm">
                  <div className="text-[#FF6B00] mb-4">
                    {benefit.icon === 'credit-card' && <CreditCard className="h-12 w-12" />}
                    {benefit.icon === 'clock' && <Clock className="h-12 w-12" />}
                    {benefit.icon === 'shield' && <Shield className="h-12 w-12" />}
                    {benefit.icon === 'users' && <Users className="h-12 w-12" />}
                  </div>
                  <h3 className="text-lg font-bold mb-2">{benefit.title}</h3>
                  <p className="text-[#2E2E2E]">
                    {benefit.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16">
        <div className="section-container">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">Success Stories</h2>
              <p className="text-xl text-[#2E2E2E]">
                Hear from freelancers in our enterprise program
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {testimonials.map((testimonial, index) => (
                <div key={index} className="bg-white p-8 rounded-xl shadow-sm">
                  <div className="mb-6">
                    <svg className="h-8 w-8 text-[#ffeee3]" fill="currentColor" viewBox="0 0 32 32">
                      <path d="M9.352 4C4.456 7.456 1 13.12 1 19.36c0 5.088 3.072 8.064 6.624 8.064 3.36 0 5.856-2.688 5.856-5.856 0-3.168-2.208-5.472-5.088-5.472-.576 0-1.344.096-1.536.192.48-3.264 3.552-7.104 6.624-9.024L9.352 4zm16.512 0c-4.8 3.456-8.256 9.12-8.256 15.36 0 5.088 3.072 8.064 6.624 8.064 3.264 0 5.856-2.688 5.856-5.856 0-3.168-2.304-5.472-5.184-5.472-.576 0-1.248.096-1.44.192.48-3.264 3.456-7.104 6.528-9.024L25.864 4z" />
                    </svg>
                  </div>
                  <p className="text-[#2E2E2E] mb-6">"{testimonial.quote}"</p>
                  <div className="flex items-center">
                    <div className="h-12 w-12 rounded-full overflow-hidden mr-4">
                      <img src={testimonial.image} alt={testimonial.author} className="h-full w-full object-cover" />
                    </div>
                    <div>
                      <h4 className="font-bold">{testimonial.author}</h4>
                      <p className="text-[#2E2E2E] text-sm">{testimonial.role}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Application CTA */}
      <section className="py-16 bg-gradient-to-r from-purple-600 to-indigo-700 text-white">
        <div className="section-container">
          <div className="max-w-3xl mx-auto text-center">
            <Award className="h-16 w-16 mx-auto mb-6" />
            <h2 className="text-3xl font-bold mb-6">Ready to Elevate Your Freelancing?</h2>
            <p className="text-xl mb-8 opacity-90">
              Apply to join our Enterprise Freelancing Program today and gain access to exclusive high-value projects with leading organizations.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link 
                to="/login" 
                className="bg-white text-[#FF6B00] hover:bg-[#ffeee3] font-medium px-8 py-4 rounded-lg transition-colors duration-200 text-lg"
              >
                Apply Now
              </Link>
              <Link
                to="/talk-to-sales"
                className="bg-transparent border border-white text-white hover:bg-white/10 font-medium px-8 py-4 rounded-lg transition-colors duration-200 text-lg"
              >
                Talk to an Advisor
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* FAQs */}
      <section className="py-16">
        <div className="section-container">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-12">Frequently Asked Questions</h2>
            <div className="space-y-6">
              <div className="bg-white rounded-lg shadow-sm p-6">
                <h3 className="text-lg font-bold mb-2">What is the Enterprise Freelancing Program?</h3>
                <p className="text-[#2E2E2E]">
                  Our Enterprise Freelancing Program is a selective community of top-tier freelance professionals who get exclusive access to high-value projects from Fortune 500 companies and other leading organizations.
                </p>
              </div>
              <div className="bg-white rounded-lg shadow-sm p-6">
                <h3 className="text-lg font-bold mb-2">How long does the application process take?</h3>
                <p className="text-[#2E2E2E]">
                  The typical application process takes 2-3 weeks, including skills assessment, reference checks, and final interview. Some specialized positions may require additional verification steps.
                </p>
              </div>
              <div className="bg-white rounded-lg shadow-sm p-6">
                <h3 className="text-lg font-bold mb-2">What types of projects are available?</h3>
                <p className="text-[#2E2E2E]">
                  Enterprise projects cover a wide range of fields including software development, design, marketing, project management, and consulting. Most projects are long-term (3+ months) and offer competitive rates.
                </p>
              </div>
              <div className="bg-white rounded-lg shadow-sm p-6">
                <h3 className="text-lg font-bold mb-2">How are payment terms structured?</h3>
                <p className="text-[#2E2E2E]">
                  Enterprise clients typically work on weekly or bi-weekly payment schedules. All payments are secured through our platform's protection system, and we handle all invoicing and payment processing.
                </p>
              </div>
            </div>
            <div className="mt-8 text-center">
              <Link
                to="/talk-to-sales"
                className="text-[#FF6B00] hover:text-[#2E2E2E] font-medium inline-flex items-center"
              >
                View all FAQs
                <ArrowRight className="h-4 w-4 ml-1" />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default EnterpriseFreelancingPage;














