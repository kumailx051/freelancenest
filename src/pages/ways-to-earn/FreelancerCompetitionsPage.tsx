import React from 'react';
import { Link } from 'react-router-dom';
import { Trophy, Calendar, Users, DollarSign, Clock, CheckCircle, Star, ArrowRight, Award } from 'lucide-react';

const FreelancerCompetitionsPage: React.FC = () => {
  // Sample current competitions
  const currentCompetitions = [
    {
      id: 1,
      title: "Web Design Challenge 2023",
      category: "UI/UX Design",
      prize: "$5,000",
      participants: 324,
      deadline: "Nov 15, 2023",
      image: "https://via.placeholder.com/400x250?text=Web+Design+Challenge",
      sponsor: "Adobe",
      featured: true
    },
    {
      id: 2,
      title: "Mobile App Innovation Contest",
      category: "Mobile Development",
      prize: "$3,500",
      participants: 215,
      deadline: "Dec 1, 2023",
      image: "https://via.placeholder.com/400x250?text=Mobile+App+Contest",
      sponsor: "Google",
      featured: false
    },
    {
      id: 3,
      title: "Content Marketing Excellence",
      category: "Writing & Content",
      prize: "$2,000",
      participants: 178,
      deadline: "Nov 20, 2023",
      image: "https://via.placeholder.com/400x250?text=Content+Marketing",
      sponsor: "HubSpot",
      featured: false
    }
  ];

  // Sample past winners
  const pastWinners = [
    {
      id: 1,
      name: "Sarah Chen",
      competition: "Logo Design Championship",
      prize: "$3,500",
      year: "2022",
      image: "https://randomuser.me/api/portraits/women/33.jpg",
      work: "https://via.placeholder.com/400x250?text=Winning+Design",
      testimonial: "The competition pushed me to refine my skills and create something truly unique. The exposure from winning has led to numerous client opportunities."
    },
    {
      id: 2,
      name: "Miguel Rodriguez",
      competition: "Web Animation Challenge",
      prize: "$4,200",
      year: "2023",
      image: "https://randomuser.me/api/portraits/men/45.jpg",
      work: "https://via.placeholder.com/400x250?text=Winning+Animation",
      testimonial: "Participating in this competition gave me a deadline and a reason to push my creativity to new limits. The prize money was great, but the career advancement was even better."
    }
  ];
  
  // Benefits of competitions
  const competitionBenefits = [
    {
      icon: <DollarSign className="h-8 w-8 text-[#FF6B00]" />,
      title: "Cash Prizes",
      description: "Win substantial monetary rewards for your creativity and skills"
    },
    {
      icon: <Users className="h-8 w-8 text-[#FF6B00]" />,
      title: "Industry Recognition",
      description: "Get noticed by industry leaders and potential clients"
    },
    {
      icon: <Star className="h-8 w-8 text-[#FF6B00]" />,
      title: "Portfolio Enhancement",
      description: "Add award-winning projects to your professional portfolio"
    },
    {
      icon: <Award className="h-8 w-8 text-[#FF6B00]" />,
      title: "Skill Development",
      description: "Sharpen your abilities by competing against top talent"
    }
  ];
  
  // Competition categories
  const categories = [
    "Web Design", "Mobile Development", "Logo Design", "Content Writing", 
    "Illustration", "UX Design", "Video Production", "Social Media", "E-commerce"
  ];

  return (
    <div className="min-h-screen bg-[#ffeee3]">
      {/* Hero Section */}
      <section className="pt-40 pb-20 bg-gradient-to-r from-primary-500 to-purple-600">
        <div className="section-container">
          <div className="max-w-3xl mx-auto text-center">
            <div className="inline-flex items-center px-4 py-2 bg-white/20 rounded-full text-white backdrop-blur-sm mb-4">
              <Trophy className="h-5 w-5 mr-2" />
              <span className="font-medium">Creative Competitions</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">Freelancer Competitions</h1>
            <p className="text-xl text-[#ffeee3] mb-8">
              Showcase your skills, compete with peers, and win prizes that boost your career and income
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link 
                to="/login" 
                className="bg-white text-[#FF6B00] hover:bg-[#ffeee3] font-medium px-6 py-3 rounded-lg transition-colors duration-200 flex items-center justify-center"
              >
                Browse Competitions
              </Link>
              <Link
                to="/login"
                className="bg-transparent border border-white text-white hover:bg-white/10 font-medium px-6 py-3 rounded-lg transition-colors duration-200"
              >
                Submit Your Entry
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Current Competitions */}
      <section className="py-16">
        <div className="section-container">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">Current Competitions</h2>
              <p className="text-xl text-[#2E2E2E]">
                Participate in these active competitions to showcase your talent
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {currentCompetitions.map(competition => (
                <div 
                  key={competition.id} 
                  className={`bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300 ${
                    competition.featured ? 'ring-2 ring-purple-500' : ''
                  }`}
                >
                  <div className="relative">
                    <img 
                      src={competition.image} 
                      alt={competition.title}
                      className="w-full h-48 object-cover"
                    />
                    {competition.featured && (
                      <div className="absolute top-4 right-4 bg-[#FF6B00] text-white text-xs font-bold px-2 py-1 rounded">
                        FEATURED
                      </div>
                    )}
                  </div>
                  <div className="p-6">
                    <div className="flex justify-between items-start mb-3">
                      <span className="bg-[#ffeee3] text-[#2E2E2E] text-xs font-medium px-2.5 py-1 rounded">
                        {competition.category}
                      </span>
                      <div className="flex items-center">
                        <DollarSign className="h-4 w-4 text-[#FF6B00] mr-1" />
                        <span className="font-bold text-[#FF6B00]">{competition.prize}</span>
                      </div>
                    </div>
                    <h3 className="text-xl font-bold mb-3">{competition.title}</h3>
                    <div className="space-y-2 mb-4">
                      <div className="flex items-center text-[#2E2E2E]">
                        <Calendar className="h-4 w-4 mr-2" />
                        <span className="text-sm">Deadline: {competition.deadline}</span>
                      </div>
                      <div className="flex items-center text-[#2E2E2E]">
                        <Users className="h-4 w-4 mr-2" />
                        <span className="text-sm">{competition.participants} participants</span>
                      </div>
                      <div className="flex items-center text-[#2E2E2E]">
                        <Award className="h-4 w-4 mr-2" />
                        <span className="text-sm">Sponsored by {competition.sponsor}</span>
                      </div>
                    </div>
                    <Link
                      to="/login"
                      className="w-full bg-[#FF6B00] hover:bg-[#2E2E2E] text-white font-medium py-2 rounded-lg transition-colors duration-200 inline-block text-center"
                    >
                      View Competition
                    </Link>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="mt-10 text-center">
              <Link
                to="/login"
                className="bg-white border border-[#ffeee3] text-[#2E2E2E] hover:bg-[#ffeee3] font-medium px-6 py-3 rounded-lg transition-colors duration-200 inline-block"
              >
                View All Competitions
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
              <h2 className="text-3xl font-bold mb-4">How Competitions Work</h2>
              <p className="text-xl text-[#ffeee3]">
                Simple steps to participate and potentially win
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <div className="relative">
                <div className="bg-[#2E2E2E]/50 h-16 w-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <div className="text-2xl font-bold">1</div>
                </div>
                <h3 className="text-lg font-bold text-center mb-2">Browse</h3>
                <p className="text-[#ffeee3] text-center text-sm">
                  Find competitions that match your skills and interests
                </p>
                {/* Connector line */}
                <div className="hidden md:block absolute top-8 left-full w-full h-0.5 bg-[#2E2E2E] -z-10"></div>
              </div>
              
              <div className="relative">
                <div className="bg-[#2E2E2E]/50 h-16 w-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <div className="text-2xl font-bold">2</div>
                </div>
                <h3 className="text-lg font-bold text-center mb-2">Register</h3>
                <p className="text-[#ffeee3] text-center text-sm">
                  Sign up for the competition and review requirements
                </p>
                {/* Connector line */}
                <div className="hidden md:block absolute top-8 left-full w-full h-0.5 bg-[#2E2E2E] -z-10"></div>
              </div>
              
              <div className="relative">
                <div className="bg-[#2E2E2E]/50 h-16 w-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <div className="text-2xl font-bold">3</div>
                </div>
                <h3 className="text-lg font-bold text-center mb-2">Submit</h3>
                <p className="text-[#ffeee3] text-center text-sm">
                  Create and submit your entry before the deadline
                </p>
                {/* Connector line */}
                <div className="hidden md:block absolute top-8 left-full w-full h-0.5 bg-[#2E2E2E] -z-10"></div>
              </div>
              
              <div>
                <div className="bg-[#2E2E2E]/50 h-16 w-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <div className="text-2xl font-bold">4</div>
                </div>
                <h3 className="text-lg font-bold text-center mb-2">Win</h3>
                <p className="text-[#ffeee3] text-center text-sm">
                  Winners receive prizes, recognition, and portfolio exposure
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Competition Benefits */}
      <section className="py-16 bg-white">
        <div className="section-container">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">Benefits of Participating</h2>
              <p className="text-xl text-[#2E2E2E]">
                Competitions offer multiple advantages beyond just winning
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {competitionBenefits.map((benefit, index) => (
                <div key={index} className="text-center">
                  <div className="bg-[#ffeee3] rounded-full p-4 inline-flex items-center justify-center mb-4">
                    {benefit.icon}
                  </div>
                  <h3 className="text-xl font-bold mb-3">{benefit.title}</h3>
                  <p className="text-[#2E2E2E]">
                    {benefit.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
      
      {/* Competition Categories */}
      <section className="py-16 bg-[#ffeee3]">
        <div className="section-container">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">Competition Categories</h2>
              <p className="text-xl text-[#2E2E2E]">
                Find opportunities in your area of expertise
              </p>
            </div>
            
            <div className="flex flex-wrap justify-center gap-3">
              {categories.map((category, index) => (
                <Link
                  key={index}
                  to="/login"
                  className="bg-white border border-[#ffeee3] hover:border-[#FF6B00] px-4 py-2 rounded-full text-[#2E2E2E] hover:text-[#FF6B00] transition-colors duration-200"
                >
                  {category}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Success Stories */}
      <section className="py-16">
        <div className="section-container">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">Winner Showcase</h2>
              <p className="text-xl text-[#2E2E2E]">
                Success stories from our competition winners
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {pastWinners.map(winner => (
                <div key={winner.id} className="bg-white rounded-xl overflow-hidden shadow-sm">
                  <div className="md:flex">
                    <div className="md:w-1/3 p-6 flex flex-col items-center justify-center bg-[#ffeee3]">
                      <div className="mb-4">
                        <img 
                          src={winner.image} 
                          alt={winner.name}
                          className="w-24 h-24 rounded-full object-cover border-4 border-white shadow"
                        />
                      </div>
                      <h4 className="font-bold text-center">{winner.name}</h4>
                      <p className="text-sm text-center text-[#ffeee3]">{winner.competition}</p>
                      <div className="mt-2 flex items-center text-[#FF6B00]">
                        <Trophy className="h-4 w-4 mr-1" />
                        <span className="text-sm font-medium">{winner.year} Winner</span>
                      </div>
                    </div>
                    <div className="md:w-2/3 p-6">
                      <div className="flex justify-between items-start mb-4">
                        <h3 className="text-xl font-bold">{winner.competition}</h3>
                        <span className="font-bold text-[#FF6B00]">{winner.prize}</span>
                      </div>
                      <p className="text-[#2E2E2E] mb-4 italic">
                        "{winner.testimonial}"
                      </p>
                      <div className="mt-4">
                        <Link
                          to="/login"
                          className="text-[#FF6B00] hover:text-[#2E2E2E] font-medium flex items-center"
                        >
                          View Winning Entry
                          <ArrowRight className="h-4 w-4 ml-1" />
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Judging Process */}
      <section className="py-16 bg-[#ffeee3]">
        <div className="section-container">
          <div className="max-w-5xl mx-auto">
            <div className="md:flex items-start gap-12">
              <div className="md:w-1/2 mb-8 md:mb-0">
                <h2 className="text-3xl font-bold mb-4">Judging Process</h2>
                <p className="text-[#2E2E2E] mb-6">
                  Our competitions are judged by industry experts and professionals who evaluate entries based on creativity, technical execution, and adherence to brief.
                </p>
                <div className="space-y-4">
                  <div className="flex items-start">
                    <div className="bg-[#ffeee3] p-2 rounded-full mr-4">
                      <CheckCircle className="h-5 w-5 text-[#FF6B00]" />
                    </div>
                    <div>
                      <h3 className="font-bold">Transparent Criteria</h3>
                      <p className="text-[#2E2E2E] text-sm">Clear evaluation metrics provided for each competition</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <div className="bg-[#ffeee3] p-2 rounded-full mr-4">
                      <CheckCircle className="h-5 w-5 text-[#FF6B00]" />
                    </div>
                    <div>
                      <h3 className="font-bold">Expert Judges</h3>
                      <p className="text-[#2E2E2E] text-sm">Panels include industry leaders and professional freelancers</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <div className="bg-[#ffeee3] p-2 rounded-full mr-4">
                      <CheckCircle className="h-5 w-5 text-[#FF6B00]" />
                    </div>
                    <div>
                      <h3 className="font-bold">Feedback Provided</h3>
                      <p className="text-[#2E2E2E] text-sm">All participants receive constructive feedback on their entries</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <div className="bg-[#ffeee3] p-2 rounded-full mr-4">
                      <CheckCircle className="h-5 w-5 text-[#FF6B00]" />
                    </div>
                    <div>
                      <h3 className="font-bold">Community Voting</h3>
                      <p className="text-[#2E2E2E] text-sm">Some competitions include a public voting component</p>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="md:w-1/2">
                <div className="bg-white rounded-xl border border-[#ffeee3] shadow-sm overflow-hidden">
                  <div className="p-6 border-b border-[#ffeee3]">
                    <h3 className="text-xl font-bold">Competition Timeline</h3>
                  </div>
                  <div className="p-6 space-y-6">
                    <div className="relative pl-8 pb-6 border-l-2 border-[#ffeee3]">
                      <div className="absolute left-[-8px] top-0 bg-[#FF6B00] rounded-full h-4 w-4"></div>
                      <div className="flex items-center text-[#FF6B00] mb-1">
                        <Clock className="h-4 w-4 mr-2" />
                        <span className="font-medium">Registration Phase</span>
                      </div>
                      <p className="text-[#2E2E2E] text-sm">
                        Competition is announced and participants can register
                      </p>
                    </div>
                    
                    <div className="relative pl-8 pb-6 border-l-2 border-[#ffeee3]">
                      <div className="absolute left-[-8px] top-0 bg-[#FF6B00] rounded-full h-4 w-4"></div>
                      <div className="flex items-center text-[#FF6B00] mb-1">
                        <Clock className="h-4 w-4 mr-2" />
                        <span className="font-medium">Submission Period</span>
                      </div>
                      <p className="text-[#2E2E2E] text-sm">
                        Participants work on and submit their entries
                      </p>
                    </div>
                    
                    <div className="relative pl-8 pb-6 border-l-2 border-[#ffeee3]">
                      <div className="absolute left-[-8px] top-0 bg-[#FF6B00] rounded-full h-4 w-4"></div>
                      <div className="flex items-center text-[#FF6B00] mb-1">
                        <Clock className="h-4 w-4 mr-2" />
                        <span className="font-medium">Judging Period</span>
                      </div>
                      <p className="text-[#2E2E2E] text-sm">
                        Expert panel reviews all submissions
                      </p>
                    </div>
                    
                    <div className="relative pl-8">
                      <div className="absolute left-[-8px] top-0 bg-[#FF6B00] rounded-full h-4 w-4"></div>
                      <div className="flex items-center text-[#FF6B00] mb-1">
                        <Clock className="h-4 w-4 mr-2" />
                        <span className="font-medium">Winners Announcement</span>
                      </div>
                      <p className="text-[#2E2E2E] text-sm">
                        Winners are announced and prizes awarded
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-purple-600 to-indigo-700 text-white">
        <div className="section-container">
          <div className="max-w-3xl mx-auto text-center">
            <Trophy className="h-16 w-16 mx-auto mb-6" />
            <h2 className="text-3xl font-bold mb-6">Ready to Compete and Win?</h2>
            <p className="text-xl mb-8 opacity-90">
              Join thousands of freelancers who are showcasing their skills and winning prizes on our platform.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link 
                to="/login" 
                className="bg-white text-[#FF6B00] hover:bg-[#ffeee3] font-medium px-8 py-4 rounded-lg transition-colors duration-200 text-lg"
              >
                Browse Competitions
              </Link>
              <Link
                to="/signup"
                className="bg-transparent border border-white text-white hover:bg-white/10 font-medium px-8 py-4 rounded-lg transition-colors duration-200 text-lg"
              >
                Create Account
              </Link>
            </div>
          </div>
        </div>
      </section>
      
      {/* FAQ Section */}
      <section className="py-16">
        <div className="section-container">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-12">Frequently Asked Questions</h2>
            <div className="space-y-6">
              <div className="bg-white rounded-lg shadow-sm p-6">
                <h3 className="text-lg font-bold mb-2">Is there a fee to enter competitions?</h3>
                <p className="text-[#2E2E2E]">
                  Most competitions on our platform are free to enter. Some specialized or high-prize competitions may have a nominal entry fee, which is always clearly stated before registration.
                </p>
              </div>
              <div className="bg-white rounded-lg shadow-sm p-6">
                <h3 className="text-lg font-bold mb-2">Who owns the rights to submitted work?</h3>
                <p className="text-[#2E2E2E]">
                  You retain ownership of your work until/unless you win and the prize includes rights transfer. Each competition clearly outlines the intellectual property terms before you enter.
                </p>
              </div>
              <div className="bg-white rounded-lg shadow-sm p-6">
                <h3 className="text-lg font-bold mb-2">How are winners selected?</h3>
                <p className="text-[#2E2E2E]">
                  Winners are selected by a panel of expert judges based on criteria specific to each competition. Some competitions may also include community voting as part of the selection process.
                </p>
              </div>
              <div className="bg-white rounded-lg shadow-sm p-6">
                <h3 className="text-lg font-bold mb-2">When and how are prizes awarded?</h3>
                <p className="text-[#2E2E2E]">
                  Prize distribution typically occurs within 30 days of winner announcement. Cash prizes are awarded through your platform payment method, while other prizes (like client introductions) are coordinated directly.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default FreelancerCompetitionsPage;














