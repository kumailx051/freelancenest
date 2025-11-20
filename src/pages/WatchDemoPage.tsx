import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const WatchDemoPage: React.FC = () => {
  const [activeVideo, setActiveVideo] = useState<string>('platform-overview');
  const [formData, setFormData] = useState({
    email: '',
    fullName: '',
    notifyFuture: false
  });

  const videos = [
    {
      id: 'platform-overview',
      title: 'Platform Overview',
      duration: '5:42',
      thumbnail: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
      description: 'A comprehensive overview of our enterprise platform and its core capabilities.'
    },
    {
      id: 'talent-acquisition',
      title: 'Talent Acquisition Process',
      duration: '4:18',
      thumbnail: 'https://images.unsplash.com/photo-1600880292203-757bb62b4baf?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
      description: 'Learn how our AI-powered matching helps you find the perfect talent for your projects.'
    },
    {
      id: 'security-features',
      title: 'Enterprise Security Features',
      duration: '3:55',
      thumbnail: 'https://images.unsplash.com/photo-1563986768609-322da13575f3?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
      description: 'Discover the advanced security protocols we implement to protect your data and intellectual property.'
    },
    {
      id: 'workflow-integration',
      title: 'Workflow Integration',
      duration: '6:10',
      thumbnail: 'https://images.unsplash.com/photo-1581291518633-83b4ebd1d83e?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
      description: 'See how our platform integrates seamlessly with your existing tools and workflows.'
    },
    {
      id: 'case-studies',
      title: 'Customer Success Stories',
      duration: '8:22',
      thumbnail: 'https://images.unsplash.com/photo-1542744095-fcf48d80b0fd?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
      description: 'Real-world examples of how enterprise clients have achieved success with our platform.'
    }
  ];

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form submitted with data:', formData);
    alert('Thank you! You will receive our future product updates via email.');
  };

  return (
    <div className="min-h-screen bg-[#ffeee3]">
      {/* Hero Section */}
      <section className="pt-40 pb-16 bg-gradient-to-r from-primary-500 to-purple-600">
        <div className="section-container">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">Enterprise Solution Demo</h1>
            <p className="text-xl text-[#ffeee3] mb-8">
              Explore our enterprise platform features through interactive video demonstrations
            </p>
          </div>
        </div>
      </section>

      {/* Video Demo Section */}
      <section className="py-16">
        <div className="section-container">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Left Column - Video Thumbnails */}
              <div className="lg:col-span-1">
                <h2 className="text-2xl font-bold mb-6">Demo Videos</h2>
                <div className="space-y-4 sticky top-24">
                  {videos.map((video) => (
                    <div 
                      key={video.id}
                      onClick={() => setActiveVideo(video.id)}
                      className={`bg-white p-4 rounded-lg border cursor-pointer transition-all ${
                        activeVideo === video.id ? 'border-[#FF6B00] shadow-md' : 'border-[#ffeee3] hover:border-[#ffeee3]'
                      }`}
                    >
                      <div className="flex items-center">
                        <div className="w-20 h-12 rounded bg-[#ffeee3] overflow-hidden flex-shrink-0">
                          <img 
                            src={video.thumbnail} 
                            alt={video.title}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div className="ml-4">
                          <h3 className={`font-medium ${activeVideo === video.id ? 'text-[#FF6B00]' : 'text-[#2E2E2E]'}`}>
                            {video.title}
                          </h3>
                          <span className="text-sm text-[#ffeee3]">{video.duration}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Right Column - Main Video Player */}
              <div className="lg:col-span-2">
                <div className="bg-white p-6 rounded-xl shadow-sm">
                  {/* Video Player */}
                  <div className="aspect-w-16 aspect-h-9 mb-6 bg-[#2E2E2E] rounded-lg overflow-hidden">
                    {/* In a real implementation, this would be an actual video player */}
                    <div className="w-full h-full relative">
                      {/* Video thumbnail as placeholder */}
                      <img 
                        src={videos.find(v => v.id === activeVideo)?.thumbnail} 
                        alt="Video thumbnail" 
                        className="w-full h-full object-cover opacity-80"
                      />
                      
                      {/* Play button overlay */}
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="bg-[#FF6B00] bg-opacity-80 w-20 h-20 rounded-full flex items-center justify-center cursor-pointer hover:bg-opacity-90 transition-all">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-white" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
                          </svg>
                        </div>
                      </div>
                      
                      {/* Video controls (simplified) */}
                      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent p-4">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center text-white">
                            <button className="mr-4">
                              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                              </svg>
                            </button>
                            <span>0:00 / {videos.find(v => v.id === activeVideo)?.duration}</span>
                          </div>
                          <div className="flex text-white">
                            <button className="ml-4">
                              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15.536a5 5 0 01-.707-7.072m-2.121 9.9a9 9 0 010-12.728M12 18a6 6 0 100-12 6 6 0 000 12z" />
                              </svg>
                            </button>
                            <button className="ml-4">
                              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5v-4m0 4h-4m4 0l-5-5" />
                              </svg>
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Video Info */}
                  <h2 className="text-2xl font-bold mb-2">
                    {videos.find(v => v.id === activeVideo)?.title}
                  </h2>
                  <p className="text-[#2E2E2E] mb-6">
                    {videos.find(v => v.id === activeVideo)?.description}
                  </p>

                  {/* CTA and Info */}
                  <div className="border-t border-[#ffeee3] pt-6 mt-6">
                    <div className="flex flex-col md:flex-row gap-6">
                      <div className="flex-1">
                        <h3 className="font-semibold text-lg mb-2">Want a personalized demo?</h3>
                        <p className="text-[#2E2E2E] mb-4">
                          Schedule a call with our enterprise team for a customized walkthrough of the features most relevant to your organization.
                        </p>
                        <Link to="/talk-to-sales" className="bg-[#FF6B00] hover:bg-[#FF9F45] text-white font-medium px-5 py-2 rounded-lg transition-colors duration-200 inline-block">
                          Schedule a Call
                        </Link>
                      </div>
                      <div className="flex-1">
                        <h3 className="font-semibold text-lg mb-2">Have questions?</h3>
                        <p className="text-[#2E2E2E] mb-4">
                          Our enterprise specialists are available to answer your questions and provide additional information.
                        </p>
                        <div className="space-y-3">
                          <div className="flex items-center text-[#FF6B00]">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                            </svg>
                            <span>freelancenestteam@gmail.com</span>
                          </div>
                          <div className="flex items-center text-[#FF6B00]">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                            </svg>
                            <span>+92 316 3028236</span>
                          </div>
                          <div className="flex items-center text-[#FF6B00]">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                            </svg>
                            <span>Islamabad, Pakistan</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Resources Section */}
            <div className="mt-16">
              <h2 className="text-2xl font-bold mb-8">Additional Resources</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-white p-6 rounded-xl shadow-sm border border-[#ffeee3]">
                  <div className="bg-[#ffeee3] text-[#FF6B00] w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                  </div>
                  <h3 className="font-bold text-lg mb-2">Enterprise Whitepaper</h3>
                  <p className="text-[#2E2E2E] mb-4">
                    Download our detailed whitepaper on enterprise workforce management solutions and strategies.
                  </p>
                  <a href="#" className="text-[#FF6B00] font-medium hover:text-[#2E2E2E] flex items-center">
                    Download PDF
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                    </svg>
                  </a>
                </div>

                <div className="bg-white p-6 rounded-xl shadow-sm border border-[#ffeee3]">
                  <div className="bg-[#ffeee3] text-[#FF6B00] w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                    </svg>
                  </div>
                  <h3 className="font-bold text-lg mb-2">Case Studies</h3>
                  <p className="text-[#2E2E2E] mb-4">
                    Explore detailed case studies showing how other enterprises have leveraged our platform.
                  </p>
                  <a href="#" className="text-[#FF6B00] font-medium hover:text-[#2E2E2E] flex items-center">
                    View Case Studies
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </a>
                </div>

                <div className="bg-white p-6 rounded-xl shadow-sm border border-[#ffeee3]">
                  <div className="bg-[#ffeee3] text-[#FF6B00] w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <h3 className="font-bold text-lg mb-2">Webinar Series</h3>
                  <p className="text-[#2E2E2E] mb-4">
                    Register for our upcoming webinars or watch recordings of past enterprise solution presentations.
                  </p>
                  <a href="#" className="text-[#FF6B00] font-medium hover:text-[#2E2E2E] flex items-center">
                    Access Webinars
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="py-16 bg-[#FF6B00] text-white">
        <div className="section-container">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-4">Stay Updated</h2>
            <p className="text-xl opacity-90 mb-8">
              Subscribe to receive future product updates, demos, and enterprise resources.
            </p>
            
            <form onSubmit={handleSubmit} className="max-w-lg mx-auto">
              <div className="flex flex-col sm:flex-row gap-4 mb-4">
                <input
                  type="text"
                  name="fullName"
                  placeholder="Your full name"
                  value={formData.fullName}
                  onChange={handleChange}
                  className="flex-1 px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF6B00] text-[#2E2E2E]"
                  required
                />
                <input
                  type="email"
                  name="email"
                  placeholder="Your email address"
                  value={formData.email}
                  onChange={handleChange}
                  className="flex-1 px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF6B00] text-[#2E2E2E]"
                  required
                />
              </div>
              
              <div className="flex items-center mb-6 text-left">
                <input
                  type="checkbox"
                  id="notifyFuture"
                  name="notifyFuture"
                  checked={formData.notifyFuture}
                  onChange={handleChange}
                  className="h-4 w-4 text-[#ffeee3] border-white focus:ring-[#FF6B00]"
                />
                <label htmlFor="notifyFuture" className="ml-2 text-sm">
                  I'd like to receive notifications about new features, webinars, and enterprise resources.
                </label>
              </div>
              
              <button 
                type="submit"
                className="bg-white text-[#FF6B00] hover:bg-[#ffeee3] font-medium px-6 py-3 rounded-lg transition-colors duration-200"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
};

export default WatchDemoPage;












