import React, { useState } from 'react';

const LearningCertifications: React.FC = () => {
  const [activeTab, setActiveTab] = useState('browse');
  const [selectedCategory, setSelectedCategory] = useState('all');

  const categories = [
    { id: 'all', name: 'All Categories', count: 245 },
    { id: 'web-development', name: 'Web Development', count: 45 },
    { id: 'mobile-development', name: 'Mobile Development', count: 32 },
    { id: 'design', name: 'Design & UI/UX', count: 38 },
    { id: 'marketing', name: 'Digital Marketing', count: 28 },
    { id: 'data-science', name: 'Data Science', count: 25 },
    { id: 'business', name: 'Business Skills', count: 35 },
    { id: 'writing', name: 'Writing & Content', count: 22 },
    { id: 'photography', name: 'Photography & Video', count: 20 }
  ];

  const courses = [
    {
      id: 1,
      title: 'Advanced React Development',
      description: 'Master React hooks, context, and advanced patterns for modern web applications.',
      instructor: 'Sarah Johnson',
      rating: 4.8,
      students: 2543,
      duration: '8 hours',
      level: 'Advanced',
      badge: 'React Expert',
      price: 'Free',
      category: 'web-development',
      image: '🚀',
      skills: ['React', 'JavaScript', 'Hooks', 'Context API'],
      progress: 0
    },
    {
      id: 2,
      title: 'UI/UX Design Fundamentals',
      description: 'Learn the principles of user interface and user experience design.',
      instructor: 'Mike Chen',
      rating: 4.9,
      students: 3421,
      duration: '12 hours',
      level: 'Beginner',
      badge: 'UI/UX Designer',
      price: 'Free',
      category: 'design',
      image: '🎨',
      skills: ['Figma', 'Design Thinking', 'Prototyping', 'User Research'],
      progress: 0
    },
    {
      id: 3,
      title: 'Digital Marketing Strategy',
      description: 'Build comprehensive digital marketing campaigns that drive results.',
      instructor: 'Emma Rodriguez',
      rating: 4.7,
      students: 1876,
      duration: '10 hours',
      level: 'Intermediate',
      badge: 'Marketing Strategist',
      price: 'Free',
      category: 'marketing',
      image: '📈',
      skills: ['SEO', 'Social Media', 'Analytics', 'Campaign Management'],
      progress: 0
    },
    {
      id: 4,
      title: 'Python Data Analysis',
      description: 'Analyze data using Python, pandas, and visualization libraries.',
      instructor: 'Dr. Alex Kumar',
      rating: 4.8,
      students: 2109,
      duration: '15 hours',
      level: 'Intermediate',
      badge: 'Data Analyst',
      price: 'Free',
      category: 'data-science',
      image: '🐍',
      skills: ['Python', 'Pandas', 'NumPy', 'Matplotlib'],
      progress: 0
    }
  ];

  const myCourses = [
    {
      ...courses[0],
      progress: 65,
      enrolledDate: '2024-01-10',
      lastAccessed: '2024-01-15',
      certificateEarned: false
    },
    {
      ...courses[1],
      progress: 100,
      enrolledDate: '2023-12-15',
      lastAccessed: '2024-01-08',
      certificateEarned: true,
      certificateDate: '2024-01-08'
    }
  ];

  const certificates = [
    {
      id: 1,
      title: 'UI/UX Design Fundamentals',
      issuer: 'FreelanceNest Academy',
      earnedDate: '2024-01-08',
      certificateId: 'FN-CERT-2024-001',
      badge: 'UI/UX Designer',
      skills: ['Figma', 'Design Thinking', 'Prototyping'],
      image: '🏆'
    },
    {
      id: 2,
      title: 'JavaScript ES6+ Mastery',
      issuer: 'FreelanceNest Academy',
      earnedDate: '2023-12-20',
      certificateId: 'FN-CERT-2023-087',
      badge: 'JavaScript Expert',
      skills: ['JavaScript', 'ES6+', 'Async/Await'],
      image: '⭐'
    },
    {
      id: 3,
      title: 'Project Management Fundamentals',
      issuer: 'FreelanceNest Academy',
      earnedDate: '2023-11-15',
      certificateId: 'FN-CERT-2023-065',
      badge: 'Project Manager',
      skills: ['Agile', 'Scrum', 'Leadership'],
      image: '🎯'
    }
  ];

  const testHistory = [
    {
      id: 1,
      title: 'React Advanced Concepts',
      date: '2024-01-15',
      score: 88,
      passed: true,
      attempts: 1,
      maxAttempts: 3
    },
    {
      id: 2,
      title: 'CSS Grid & Flexbox',
      date: '2024-01-10',
      score: 92,
      passed: true,
      attempts: 1,
      maxAttempts: 3
    },
    {
      id: 3,
      title: 'Node.js Fundamentals',
      date: '2024-01-05',
      score: 74,
      passed: false,
      attempts: 2,
      maxAttempts: 3
    }
  ];

  const filteredCourses = selectedCategory === 'all' 
    ? courses 
    : courses.filter(course => course.category === selectedCategory);

  const getDifficultyColor = (level: string) => {
    switch (level) {
      case 'Beginner':
        return 'text-green-600 bg-green-50';
      case 'Intermediate':
        return 'text-yellow-600 bg-yellow-50';
      case 'Advanced':
        return 'text-red-600 bg-red-50';
      default:
        return 'text-gray-600 bg-gray-50';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-[#2E2E2E] mb-2">Learning & Certifications</h1>
          <p className="text-gray-600">Enhance your skills and earn certificates to boost your profile</p>
        </div>

        {/* Tabs */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 mb-8">
          <div className="border-b border-gray-200">
            <nav className="-mb-px flex space-x-8 px-6">
              {[
                { id: 'browse', name: 'Browse Courses', icon: '📚' },
                { id: 'my-courses', name: 'My Courses', icon: '🎓' },
                { id: 'certificates', name: 'Certificates', icon: '🏆' },
                { id: 'test-history', name: 'Test History', icon: '📝' }
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`py-4 px-1 border-b-2 font-medium text-sm whitespace-nowrap ${
                    activeTab === tab.id
                      ? 'border-[#FF6B00] text-[#FF6B00]'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  <span className="mr-2">{tab.icon}</span>
                  {tab.name}
                </button>
              ))}
            </nav>
          </div>

          <div className="p-6">
            {/* Browse Courses Tab */}
            {activeTab === 'browse' && (
              <div>
                {/* Categories */}
                <div className="mb-6">
                  <h3 className="text-lg font-semibold text-[#2E2E2E] mb-4">Categories</h3>
                  <div className="flex flex-wrap gap-2">
                    {categories.map((category) => (
                      <button
                        key={category.id}
                        onClick={() => setSelectedCategory(category.id)}
                        className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                          selectedCategory === category.id
                            ? 'bg-[#FF6B00] text-white'
                            : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                        }`}
                      >
                        {category.name} ({category.count})
                      </button>
                    ))}
                  </div>
                </div>

                {/* Course Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredCourses.map((course) => (
                    <div key={course.id} className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                      <div className="flex items-center justify-between mb-4">
                        <span className="text-3xl">{course.image}</span>
                        <span className={`px-2 py-1 text-xs font-semibold rounded-full ${getDifficultyColor(course.level)}`}>
                          {course.level}
                        </span>
                      </div>
                      
                      <h4 className="text-lg font-semibold text-[#2E2E2E] mb-2">{course.title}</h4>
                      <p className="text-gray-600 text-sm mb-4 line-clamp-2">{course.description}</p>
                      
                      <div className="flex items-center gap-4 text-sm text-gray-500 mb-4">
                        <span>⭐ {course.rating}</span>
                        <span>👥 {course.students.toLocaleString()}</span>
                        <span>⏱️ {course.duration}</span>
                      </div>

                      <div className="mb-4">
                        <div className="flex flex-wrap gap-1">
                          {course.skills.slice(0, 3).map((skill, index) => (
                            <span key={index} className="px-2 py-1 bg-[#ffeee3] text-[#FF6B00] text-xs rounded-md">
                              {skill}
                            </span>
                          ))}
                          {course.skills.length > 3 && (
                            <span className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-md">
                              +{course.skills.length - 3} more
                            </span>
                          )}
                        </div>
                      </div>

                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm font-medium text-[#2E2E2E]">by {course.instructor}</p>
                          <p className="text-lg font-bold text-[#FF6B00]">{course.price}</p>
                        </div>
                        <button className="bg-[#FF6B00] text-white px-4 py-2 rounded-lg hover:bg-[#FF9F45] transition-colors">
                          Enroll Now
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* My Courses Tab */}
            {activeTab === 'my-courses' && (
              <div>
                <h3 className="text-lg font-semibold text-[#2E2E2E] mb-6">My Enrolled Courses</h3>
                <div className="space-y-4">
                  {myCourses.map((course) => (
                    <div key={course.id} className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
                      <div className="flex items-start justify-between">
                        <div className="flex items-center gap-4">
                          <span className="text-3xl">{course.image}</span>
                          <div className="flex-1">
                            <h4 className="text-lg font-semibold text-[#2E2E2E] mb-1">{course.title}</h4>
                            <p className="text-gray-600 text-sm mb-2">{course.description}</p>
                            <div className="flex items-center gap-4 text-sm text-gray-500">
                              <span>Enrolled: {new Date(course.enrolledDate).toLocaleDateString()}</span>
                              <span>Last accessed: {new Date(course.lastAccessed).toLocaleDateString()}</span>
                            </div>
                          </div>
                        </div>
                        <div className="text-right">
                          {course.certificateEarned ? (
                            <div className="flex items-center gap-2 text-green-600 mb-2">
                              <span>🏆</span>
                              <span className="text-sm font-medium">Certificate Earned!</span>
                            </div>
                          ) : (
                            <div className="text-sm text-gray-500 mb-2">
                              {course.progress}% Complete
                            </div>
                          )}
                          <button className="bg-[#FF6B00] text-white px-4 py-2 rounded-lg hover:bg-[#FF9F45] transition-colors">
                            Continue Learning
                          </button>
                        </div>
                      </div>
                      
                      <div className="mt-4">
                        <div className="flex items-center justify-between text-sm text-gray-600 mb-2">
                          <span>Progress</span>
                          <span>{course.progress}%</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div 
                            className="bg-[#FF6B00] h-2 rounded-full transition-all duration-300"
                            style={{ width: `${course.progress}%` }}
                          ></div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Certificates Tab */}
            {activeTab === 'certificates' && (
              <div>
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-lg font-semibold text-[#2E2E2E]">My Certificates</h3>
                  <button className="text-[#FF6B00] hover:underline">Download All</button>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {certificates.map((cert) => (
                    <div key={cert.id} className="bg-gradient-to-br from-[#FF6B00] to-[#FF9F45] rounded-xl p-6 text-white shadow-lg">
                      <div className="flex items-center justify-between mb-4">
                        <span className="text-3xl">{cert.image}</span>
                        <span className="text-xs bg-white bg-opacity-20 px-2 py-1 rounded">
                          VERIFIED
                        </span>
                      </div>
                      
                      <h4 className="text-lg font-bold mb-2">{cert.title}</h4>
                      <p className="text-sm mb-4 opacity-90">{cert.issuer}</p>
                      
                      <div className="mb-4">
                        <div className="flex flex-wrap gap-1">
                          {cert.skills.map((skill, index) => (
                            <span key={index} className="px-2 py-1 bg-white bg-opacity-20 text-xs rounded">
                              {skill}
                            </span>
                          ))}
                        </div>
                      </div>
                      
                      <div className="border-t border-white border-opacity-20 pt-4">
                        <div className="flex items-center justify-between text-sm">
                          <span>Earned: {new Date(cert.earnedDate).toLocaleDateString()}</span>
                          <button className="bg-white text-[#FF6B00] px-3 py-1 rounded text-sm font-medium hover:bg-gray-100 transition-colors">
                            Download
                          </button>
                        </div>
                        <p className="text-xs mt-2 opacity-75">ID: {cert.certificateId}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Test History Tab */}
            {activeTab === 'test-history' && (
              <div>
                <h3 className="text-lg font-semibold text-[#2E2E2E] mb-6">Assessment History</h3>
                
                <div className="space-y-4">
                  {testHistory.map((test) => (
                    <div key={test.id} className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
                      <div className="flex items-center justify-between">
                        <div>
                          <h4 className="text-lg font-semibold text-[#2E2E2E] mb-1">{test.title}</h4>
                          <p className="text-gray-600 text-sm">
                            Taken on {new Date(test.date).toLocaleDateString()}
                          </p>
                        </div>
                        
                        <div className="text-right">
                          <div className={`text-2xl font-bold mb-1 ${
                            test.passed ? 'text-green-600' : 'text-red-600'
                          }`}>
                            {test.score}%
                          </div>
                          <div className={`px-3 py-1 rounded-full text-sm font-medium ${
                            test.passed 
                              ? 'bg-green-50 text-green-600' 
                              : 'bg-red-50 text-red-600'
                          }`}>
                            {test.passed ? 'Passed' : 'Failed'}
                          </div>
                        </div>
                      </div>
                      
                      <div className="mt-4 flex items-center justify-between">
                        <div className="text-sm text-gray-500">
                          Attempt {test.attempts} of {test.maxAttempts}
                        </div>
                        
                        {!test.passed && test.attempts < test.maxAttempts && (
                          <button className="bg-[#FF6B00] text-white px-4 py-2 rounded-lg hover:bg-[#FF9F45] transition-colors text-sm">
                            Retake Test
                          </button>
                        )}
                        
                        {test.passed && (
                          <button className="text-[#FF6B00] hover:underline text-sm">
                            View Certificate
                          </button>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default LearningCertifications;
