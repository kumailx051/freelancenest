import React from 'react';
import { Globe, Users, Award, TrendingUp, Briefcase, CheckCircle } from 'lucide-react';

const AboutUsPage: React.FC = () => {
  // Stats data
  const stats = [
    { value: '2.5M+', label: 'Freelancers' },
    { value: '350K+', label: 'Clients' },
    { value: '12M+', label: 'Projects Completed' },
    { value: '$3B+', label: 'Payments Processed' }
  ];

  // Values data
  const values = [
    {
      icon: <Users className="w-6 h-6" />,
      title: 'Community First',
      description: 'We believe in the power of community and put our users at the center of everything we do.'
    },
    {
      icon: <Award className="w-6 h-6" />,
      title: 'Quality Work',
      description: 'We maintain high standards and promote quality work across all categories and skill levels.'
    },
    {
      icon: <Globe className="w-6 h-6" />,
      title: 'Global Opportunity',
      description: 'We connect talent with opportunity across borders, enabling work without boundaries.'
    },
    {
      icon: <TrendingUp className="w-6 h-6" />,
      title: 'Continuous Growth',
      description: 'We constantly innovate and improve our platform to help freelancers and clients succeed.'
    }
  ];

  // Timeline data
  const timeline = [
    {
      year: '2025',
      title: 'FreelanceNest Launches',
      description: 'Founded with a mission to transform how the world works, FreelanceNest platform is launched with cutting-edge technology.'
    },
    {
      year: '2026',
      title: 'International Expansion',
      description: 'Extended operations to 20+ countries, supporting multiple languages and payment methods worldwide.'
    },
    {
      year: '2027',
      title: 'Skill Certification Program',
      description: 'Introduced industry-standard skill verification to ensure quality talent for clients across all sectors.'
    },
    {
      year: '2028',
      title: 'Enterprise Solutions',
      description: 'Launched dedicated enterprise services for Fortune 500 companies seeking specialized talent and project management.'
    },
    {
      year: '2029',
      title: 'AI-Powered Matching',
      description: 'Implemented advanced AI algorithms for perfect talent-project matching and enhanced user experience.'
    }
  ];

  return (
    <div className="min-h-screen bg-[#ffeee3]">
      {/* Hero Section */}
      <section className="pt-40 pb-16 bg-[#2E2E2E] text-white">
        <div className="section-container">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Our Mission is to <span className="text-[#FF6B00]">Connect Talent</span> with <span className="text-[#FF6B00]">Opportunity</span></h1>
            <p className="text-xl mb-8 text-[#ffeee3]">
              We're building the future of work by empowering freelancers and businesses to connect, collaborate, and succeed together.
            </p>
            <button className="bg-white text-[#FF6B00] border-2 border-[#FF6B00] px-6 py-3 rounded-lg font-semibold hover:bg-[#2E2E2E] hover:text-white transition-all">Join Our Journey</button>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-white">
        <div className="section-container">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-4xl md:text-5xl font-bold text-[#FF6B00] mb-2">{stat.value}</div>
                <div className="text-[#2E2E2E]">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-20 bg-gradient-to-br from-[#ffeee3] via-white to-[#ffeee3]">
        <div className="section-container">
          {/* Header */}
          <div className="max-w-4xl mx-auto text-center mb-16">
            <div className="inline-block px-4 py-2 bg-[#2E2E2E] rounded-full text-white font-semibold text-sm mb-4">
              Our Story
            </div>
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-[#2E2E2E]">
              Building the Future of Work
            </h2>
            <p className="text-xl text-[#2E2E2E]/80 leading-relaxed">
              Founded in <span className="font-bold text-[#FF6B00]">2025</span>, FreelanceNest began with a revolutionary vision: create a platform that truly empowers freelancers while providing businesses access to exceptional talent worldwide.
            </p>
          </div>

          {/* Story Cards Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
            {/* The Challenge Card */}
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 border border-[#FF6B00]/10">
              <div className="w-12 h-12 bg-gradient-to-r from-[#FF6B00] to-[#FF9F45] rounded-xl flex items-center justify-center mb-6">
                <Users className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-[#2E2E2E] mb-4">The Challenge We Saw</h3>
              <p className="text-[#2E2E2E]/80 mb-4 leading-relaxed">
                Our founders, experienced freelancers themselves, understood the challenges faced by independent professionals in finding quality clients, securing reliable payment, and building sustainable careers.
              </p>
              <p className="text-[#2E2E2E]/80 leading-relaxed">
                Meanwhile, businesses struggled to find qualified talent, manage remote work efficiently, and ensure quality deliverables in an increasingly digital world.
              </p>
            </div>

            {/* The Solution Card */}
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 border border-[#FF6B00]/10">
              <div className="w-12 h-12 bg-gradient-to-r from-[#FF6B00] to-[#FF9F45] rounded-xl flex items-center justify-center mb-6">
                <Globe className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-[#2E2E2E] mb-4">Our Solution</h3>
              <p className="text-[#2E2E2E]/80 mb-4 leading-relaxed">
                FreelanceNest was created to bridge this gap by building a comprehensive ecosystem where talent and opportunity connect seamlessly.
              </p>
              <p className="text-[#2E2E2E]/80 leading-relaxed">
                We provide the tools, protections, and support needed for both freelancers and businesses to thrive in the modern economy.
              </p>
            </div>
          </div>

          {/* Vision & Mission Cards */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
            <div className="group relative">
              <div className="absolute inset-0 bg-gradient-to-r from-[#FF6B00] to-[#FF9F45] rounded-2xl blur-sm group-hover:blur-md transition-all duration-300 opacity-20"></div>
              <div className="relative bg-white rounded-2xl p-8 shadow-lg">
                <div className="flex items-center mb-4">
                  <div className="w-10 h-10 bg-[#FF6B00] rounded-lg flex items-center justify-center mr-4">
                    <TrendingUp className="w-5 h-5 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-[#FF6B00]">Our Vision</h3>
                </div>
                <p className="text-[#2E2E2E]/80 leading-relaxed">
                  A world where anyone, anywhere can build a successful career through their skills, and where businesses can find the perfect talent for any project, regardless of location.
                </p>
              </div>
            </div>

            <div className="group relative">
              <div className="absolute inset-0 bg-gradient-to-r from-[#FF6B00] to-[#FF9F45] rounded-2xl blur-sm group-hover:blur-md transition-all duration-300 opacity-20"></div>
              <div className="relative bg-white rounded-2xl p-8 shadow-lg">
                <div className="flex items-center mb-4">
                  <div className="w-10 h-10 bg-[#FF6B00] rounded-lg flex items-center justify-center mr-4">
                    <Award className="w-5 h-5 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-[#FF6B00]">Our Mission</h3>
                </div>
                <p className="text-[#2E2E2E]/80 leading-relaxed">
                  To empower freelancers and businesses by creating the most trusted platform for connecting talent with opportunity, supported by innovative tools and resources that enable success.
                </p>
              </div>
            </div>
          </div>

          {/* Impact Statement */}
          <div className="max-w-4xl mx-auto text-center">
            <div className="bg-[#2E2E2E] rounded-2xl p-8 md:p-12 text-white relative overflow-hidden">
              <div className="relative">
                <h3 className="text-2xl md:text-3xl font-bold mb-4">Today's Impact</h3>
                <p className="text-lg text-white/90 leading-relaxed">
                  We're proud to serve millions of users across the globe, facilitating work that crosses borders and empowering professionals to build careers on their own terms. Every connection made on our platform represents a step toward a more flexible, inclusive future of work.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Core Values Section */}
      <section className="py-16 bg-white">
        <div className="section-container">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Our Core Values</h2>
            <p className="text-xl text-[#2E2E2E]">
              These principles guide everything we do at FreelanceNest
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {values.map((value, index) => (
              <div key={index} className="bg-[#ffeee3] rounded-xl p-6 flex items-start">
                <div className="bg-[#ffeee3] p-3 rounded-full mr-4">
                  {value.icon}
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-2">{value.title}</h3>
                  <p className="text-[#2E2E2E]">{value.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline Section */}
      <section className="py-16">
        <div className="section-container">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Our Journey</h2>
            <p className="text-xl text-[#2E2E2E]">
              From startup to industry leader, the key milestones in our growth
            </p>
          </div>

          <div className="relative">
            {/* Timeline line - more prominent connection */}
            <div className="hidden md:block absolute left-1/2 transform -translate-x-1/2 h-full w-0.5 bg-gradient-to-b from-[#FF6B00] via-[#FF9F45] to-[#FF6B00]"></div>

            {/* Timeline events */}
            <div className="space-y-12">
              {timeline.map((event, index) => (
                <div key={index} className="relative">
                  <div className="md:grid md:grid-cols-2 md:gap-8 items-center">
                    {/* Timeline dot - better connected */}
                    <div className="hidden md:block absolute left-1/2 transform -translate-x-1/2 w-4 h-4 rounded-full bg-[#FF6B00] border-3 border-white shadow-lg z-10"></div>
                    
                    {/* Content positioning based on even/odd */}
                    <div className={`mb-6 md:mb-0 ${index % 2 === 0 ? 'md:text-right md:pr-12' : 'md:col-start-2 md:pl-12'}`}>
                      <div className="bg-white shadow-lg rounded-xl p-6 border border-[#FF6B00]/10 hover:shadow-xl transition-all duration-300">
                        <div className="inline-block px-3 py-1 rounded-full bg-[#FF6B00] text-white font-semibold text-sm mb-3">
                          {event.year}
                        </div>
                        <h3 className="text-xl font-bold mb-2 text-[#2E2E2E]">{event.title}</h3>
                        <p className="text-[#2E2E2E]/80">{event.description}</p>
                      </div>
                    </div>
                    
                    {/* Empty div for layout on even/odd positioning */}
                    {index % 2 === 0 ? <div></div> : <div className="hidden md:block"></div>}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="py-16 bg-[#2E2E2E] text-white">
        <div className="section-container">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Why Choose FreelanceNest</h2>
            <p className="text-xl text-[#ffeee3]">
              What makes us different from other freelancing platforms
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: <CheckCircle className="w-6 h-6" />,
                title: "Verified Skills",
                description: "Our certification program ensures freelancers have the skills they claim."
              },
              {
                icon: <Briefcase className="w-6 h-6" />,
                title: "Quality Assurance",
                description: "We maintain high standards through our rating system and client feedback."
              },
              {
                icon: <Users className="w-6 h-6" />,
                title: "Community Support",
                description: "Our active community provides mentorship and growth opportunities."
              },
              {
                icon: <Award className="w-6 h-6" />,
                title: "Fair Pricing",
                description: "Transparent fees and payment protection for both clients and freelancers."
              },
              {
                icon: <Globe className="w-6 h-6" />,
                title: "Global Reach",
                description: "Connect with clients and talent from over 180 countries worldwide."
              },
              {
                icon: <TrendingUp className="w-6 h-6" />,
                title: "Career Growth",
                description: "Resources and tools to help freelancers build sustainable careers."
              }
            ].map((feature, index) => (
              <div key={index} className="bg-white/10 backdrop-blur-sm p-6 rounded-xl">
                <div className="bg-white/20 w-12 h-12 rounded-full flex items-center justify-center mb-4">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
                <p className="text-[#ffeee3]">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-white">
        <div className="section-container">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Join Our Growing Community</h2>
            <p className="text-xl text-[#2E2E2E] mb-8">
              Whether you're looking to hire top talent or build your freelance career, FreelanceNest provides the tools and support you need to succeed.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <button className="bg-[#2E2E2E] text-white px-6 py-3 rounded-lg font-semibold hover:bg-[#FF9F45] transition-all">Sign Up as Freelancer</button>
              <button className="btn-outline-primary">Hire Talent</button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutUsPage;
















