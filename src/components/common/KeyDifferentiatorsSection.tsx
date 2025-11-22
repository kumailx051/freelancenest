import React from 'react';
import { Brain, DollarSign, Shield, Award, Zap, Users } from 'lucide-react';

const KeyDifferentiatorsSection: React.FC = () => {
  const differentiators = [
    {
      icon: Brain,
      title: 'AI-Powered Matching',
      description: 'Our advanced algorithm matches you with the perfect talent based on skills, experience, and project requirements',
      color: 'from-[#2E2E2E] to-[#2E2E2E]'
    },
    {
      icon: DollarSign,
      title: 'Transparent 5% Fee',
      description: 'No hidden costs. Pay only 5% platform fee with complete transparency in all transactions',
      color: 'from-[#FF6B00] to-[#FF6B00]'
    },
    {
      icon: Shield,
      title: 'Secure Escrow System',
      description: 'Your payments are protected with our secure escrow system. Pay only when you\'re satisfied',
      color: 'from-[#2E2E2E] to-[#2E2E2E]'
    },
    {
      icon: Award,
      title: 'Professional Certifications',
      description: 'All freelancers undergo skill verification and certification to ensure quality work',
      color: 'from-[#FF6B00] to-[#FF6B00]'
    },
    {
      icon: Zap,
      title: 'Lightning Fast',
      description: 'Get matched with qualified talent in minutes, not days. Start your project faster',
      color: 'from-[#2E2E2E] to-[#2E2E2E]'
    },
    {
      icon: Users,
      title: '24/7 Support',
      description: 'Our dedicated support team is available around the clock to help with any issues',
      color: 'from-[#FF6B00] to-[#FF6B00]'
    }
  ];

  return (
    <section className="py-20 bg-white">
      <div className="section-container">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-[#2E2E2E] mb-6">
            Why Choose Our Platform?
          </h2>
          <p className="text-xl text-[#2E2E2E]/80 max-w-3xl mx-auto">
            We've built the most advanced freelancing platform with features that matter most to you
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {differentiators.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <div
                key={index}
                style={{ backgroundColor: '#ffeee3' }}
                className="group p-8 rounded-2xl border border-[#ffeee3] hover:border-[#ffeee3] hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
              >
                {/* Icon */}
                <div className={`w-16 h-16 rounded-xl bg-gradient-to-r ${feature.color} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                  <Icon className="w-8 h-8 text-white" />
                </div>

                {/* Content */}
                <div className="space-y-4">
                  <h3 className="text-xl font-bold text-[#2E2E2E] transition-colors duration-200">
                    {feature.title}
                  </h3>
                  <p className="text-[#2E2E2E]/70 leading-relaxed">
                    {feature.description}
                  </p>
                </div>

                {/* Hover Effect - removed opacity change to keep background visible */}
                <div className="absolute inset-0 rounded-2xl opacity-0 transition-opacity duration-300 pointer-events-none" />
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default KeyDifferentiatorsSection;
