import React from 'react';
import { Linkedin, Twitter, ExternalLink } from 'lucide-react';

const LeadershipPage: React.FC = () => {
  // Executive team data
  const executiveTeam = [
    {
      name: 'Iqra Shaikh',
      role: 'CEO, Founder',
      image: 'https://randomuser.me/api/portraits/women/23.jpg',
      bio: 'Iqra is the Founder & CEO of FreelanceNest, a platform built to empower freelancers. Currently a university student, Iqra brings 5 years of design experience and over 6 years as a freelancer. Having experienced the freelancing journey firsthand, she created FreelanceNest to make freelancing simpler, more accessible, and rewarding for everyone.',
      linkedin: '#',
      twitter: '#'
    },
    {
      name: 'Samana Hassan',
      role: 'Developer',
      image: 'https://randomuser.me/api/portraits/women/28.jpg',
      bio: 'Samana is the Co-Founder & Developer at FreelanceNest. A university student with strong technical expertise, she focuses on building scalable, user-friendly solutions. Passionate about technology and problem-solving, Samana is dedicated to making FreelanceNest a reliable and seamless platform for freelancers.',
      linkedin: '#',
      twitter: '#'
    }
  ];

  return (
    <div className="min-h-screen bg-[#ffeee3]">
      {/* Hero Section */}
      <section className="pt-40 pb-16 bg-[#2E2E2E] text-white">
        <div className="section-container">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Our <span className="text-[#FF6B00]">Leadership</span></h1>
            <p className="text-xl mb-8 text-[#ffeee3]">
              Meet the team driving FreelanceNest's mission to transform how the world works. Our leaders bring diverse expertise and a shared passion for empowering freelancers and businesses.
            </p>
          </div>
        </div>
      </section>

      {/* CEO Message */}
      <section className="py-16 bg-white">
        <div className="section-container">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <img 
                src={executiveTeam[0].image} 
                alt={executiveTeam[0].name} 
                className="rounded-xl shadow-lg max-w-full h-auto"
              />
            </div>
            <div>
              <div className="inline-block bg-[#ffeee3] text-[#FF6B00] px-3 py-1 rounded-full text-sm font-medium mb-4">
                A Message from our CEO
              </div>
              <h2 className="text-3xl font-bold mb-6">"We're Building the Future of Work"</h2>
              <div className="space-y-4 text-[#2E2E2E]">
                <p>
                  "At FreelanceNest, we believe that talent should be able to work without boundaries, and businesses should be able to find the perfect expertise regardless of geography."
                </p>
                <p>
                  "Our platform is designed to empower independent professionals to build sustainable careers while enabling businesses of all sizes to access exceptional talent on demand."
                </p>
                <p>
                  "As we continue to grow and evolve, our focus remains on creating value for our community through innovative tools, transparent practices, and unwavering support for our users' success."
                </p>
              </div>
              <div className="mt-6 font-bold">
                Iqra Shaikh, CEO & Founder
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Executive Team */}
      <section className="py-16">
        <div className="section-container">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Executive Team</h2>
            <p className="text-xl text-[#2E2E2E]">
              Our experienced leaders driving innovation and growth
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {executiveTeam.map((executive, index) => (
              <div key={index} className="bg-white shadow-md rounded-xl overflow-hidden">
                <div className="md:flex">
                  <div className="md:w-1/3">
                    <img 
                      src={executive.image} 
                      alt={executive.name} 
                      className="h-full w-full object-cover"
                    />
                  </div>
                  <div className="p-6 md:w-2/3">
                    <h3 className="text-xl font-bold mb-1">{executive.name}</h3>
                    <p className="text-[#FF6B00] font-medium mb-4">{executive.role}</p>
                    <p className="text-[#2E2E2E] mb-4">{executive.bio}</p>
                    <div className="flex space-x-3">
                      <a href={executive.linkedin} className="text-[#ffeee3] hover:text-[#FF6B00] transition-colors">
                        <Linkedin className="w-5 h-5" />
                      </a>
                      <a href={executive.twitter} className="text-[#ffeee3] hover:text-[#FF6B00] transition-colors">
                        <Twitter className="w-5 h-5" />
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Culture Section */}
      <section className="py-16 bg-[#2E2E2E] text-white">
        <div className="section-container">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Our Culture</h2>
            <p className="text-xl text-[#ffeee3]">
              What it's like working at FreelanceNest
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white/10 backdrop-blur-sm p-6 rounded-xl">
              <h3 className="text-xl font-bold mb-4">Innovation-Driven</h3>
              <p className="text-[#ffeee3]">
                We encourage creative thinking and bold ideas. Our team constantly experiments with new approaches to better serve our global community of freelancers and clients.
              </p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm p-6 rounded-xl">
              <h3 className="text-xl font-bold mb-4">Remote-First</h3>
              <p className="text-[#ffeee3]">
                We practice what we preach. Our team works remotely across multiple time zones, embracing the same flexible work model that our platform enables for millions of users.
              </p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm p-6 rounded-xl">
              <h3 className="text-xl font-bold mb-4">User-Centered</h3>
              <p className="text-[#ffeee3]">
                Every decision we make starts with our users. We continuously gather feedback from our community to improve our platform and build features that truly matter.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Join Us CTA */}
      <section className="py-16 bg-white">
        <div className="section-container">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Join Our Team</h2>
            <p className="text-xl text-[#2E2E2E] mb-8">
              We're always looking for talented individuals who are passionate about transforming how the world works. Check out our open positions and become part of our mission.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <a href="/company/careers" className="bg-[#2E2E2E] text-white px-6 py-3 rounded-lg font-semibold hover:bg-[#FF9F45] transition-all flex items-center">
                <span>View Open Positions</span>
                <ExternalLink className="w-4 h-4 ml-2" />
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default LeadershipPage;















