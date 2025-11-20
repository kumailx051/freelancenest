import React, { useState } from 'react';

const MeetingsPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState('upcoming');
  const [showScheduleModal, setShowScheduleModal] = useState(false);

  const upcomingMeetings = [
    {
      id: '1',
      title: 'Project Kickoff Meeting',
      freelancer: {
        name: 'John Smith',
        avatar: '/api/placeholder/40/40'
      },
      project: 'E-commerce Website Development',
      date: '2024-02-01',
      time: '10:00 AM',
      duration: '60 min',
      timezone: 'EST',
      type: 'video',
      status: 'scheduled',
      agenda: 'Discuss project requirements, timeline, and milestones',
      meetingLink: 'https://meet.freelancenest.com/room/abc123'
    },
    {
      id: '2',
      title: 'Design Review',
      freelancer: {
        name: 'Sarah Johnson',
        avatar: '/api/placeholder/40/40'
      },
      project: 'Mobile App UI Design',
      date: '2024-02-03',
      time: '2:00 PM',
      duration: '45 min',
      timezone: 'EST',
      type: 'video',
      status: 'scheduled',
      agenda: 'Review wireframes and discuss design feedback',
      meetingLink: 'https://meet.freelancenest.com/room/def456'
    },
    {
      id: '3',
      title: 'Weekly Check-in',
      freelancer: {
        name: 'Mike Chen',
        avatar: '/api/placeholder/40/40'
      },
      project: 'Brand Identity Package',
      date: '2024-02-05',
      time: '11:30 AM',
      duration: '30 min',
      timezone: 'EST',
      type: 'audio',
      status: 'pending_confirmation',
      agenda: 'Progress update and next steps discussion',
      meetingLink: null
    }
  ];

  const pastMeetings = [
    {
      id: '4',
      title: 'Initial Consultation',
      freelancer: {
        name: 'John Smith',
        avatar: '/api/placeholder/40/40'
      },
      project: 'E-commerce Website Development',
      date: '2024-01-15',
      time: '3:00 PM',
      duration: '45 min',
      timezone: 'EST',
      type: 'video',
      status: 'completed',
      recording: 'https://recordings.freelancenest.com/abc123',
      notes: 'Discussed project scope, technology stack (React, Node.js), and timeline. Agreed on 4 milestones.'
    },
    {
      id: '5',
      title: 'Design Presentation',
      freelancer: {
        name: 'Sarah Johnson',
        avatar: '/api/placeholder/40/40'
      },
      project: 'Mobile App UI Design',
      date: '2024-01-20',
      time: '1:00 PM',
      duration: '60 min',
      timezone: 'EST',
      type: 'video',
      status: 'completed',
      recording: 'https://recordings.freelancenest.com/def456',
      notes: 'Presented initial design concepts. Client requested changes to color scheme and navigation.'
    }
  ];

  const [newMeeting, setNewMeeting] = useState({
    title: '',
    freelancer: '',
    date: '',
    time: '',
    duration: '30',
    type: 'video',
    agenda: '',
    timezone: 'EST'
  });

  const freelancers = [
    { id: '1', name: 'John Smith', project: 'E-commerce Website Development' },
    { id: '2', name: 'Sarah Johnson', project: 'Mobile App UI Design' },
    { id: '3', name: 'Mike Chen', project: 'Brand Identity Package' }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'scheduled': return 'bg-green-100 text-green-600';
      case 'pending_confirmation': return 'bg-yellow-100 text-yellow-600';
      case 'completed': return 'bg-blue-100 text-blue-600';
      case 'cancelled': return 'bg-red-100 text-red-600';
      default: return 'bg-gray-100 text-gray-600';
    }
  };

  const getMeetingTypeIcon = (type: string) => {
    if (type === 'video') {
      return (
        <svg className="w-5 h-5 text-blue-500" fill="currentColor" viewBox="0 0 20 20">
          <path d="M2 6a2 2 0 012-2h6a2 2 0 012 2v8a2 2 0 01-2 2H4a2 2 0 01-2-2V6zM14.553 7.106A1 1 0 0014 8v4a1 1 0 00.553.894l2 1A1 1 0 0018 13V7a1 1 0 00-1.447-.894l-2 1z"/>
        </svg>
      );
    } else {
      return (
        <svg className="w-5 h-5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M7 4a3 3 0 016 0v4a3 3 0 11-6 0V4zm4 10.93A7.001 7.001 0 0017 8a1 1 0 10-2 0A5 5 0 015 8a1 1 0 00-2 0 7.001 7.001 0 006 6.93V17H6a1 1 0 100 2h8a1 1 0 100-2h-3v-2.07z" clipRule="evenodd"/>
        </svg>
      );
    }
  };

  return (
    <div className="min-h-screen bg-[#ffeee3]">
      {/* Hero Section */}
      <section className="pt-40 pb-16 bg-[#2E2E2E] text-white">
        <div className="section-container">
          <div className="max-w-6xl mx-auto">
            <div className="flex flex-col lg:flex-row lg:items-center justify-between">
              <div>
                <h1 className="text-4xl md:text-5xl font-bold mb-6">Meetings</h1>
                <p className="text-xl mb-8 text-[#ffeee3]">
                  Schedule and manage meetings with your freelancers to keep projects on track.
                </p>
              </div>
              <button
                onClick={() => setShowScheduleModal(true)}
                className="bg-[#FF6B00] hover:bg-[#FF9F45] text-white px-6 py-3 rounded-lg font-medium transition-colors"
              >
                Schedule Meeting
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16">
        <div className="section-container">
          <div className="max-w-6xl mx-auto">
            {/* Navigation Tabs */}
            <div className="flex flex-wrap border-b border-[#ffeee3] mb-8">
              {[
                { id: 'upcoming', label: 'Upcoming', count: upcomingMeetings.length },
                { id: 'past', label: 'Past Meetings', count: pastMeetings.length }
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`px-6 py-3 font-medium transition-colors ${
                    activeTab === tab.id
                      ? 'text-[#FF6B00] border-b-2 border-[#FF6B00]'
                      : 'text-[#2E2E2E] hover:text-[#FF6B00]'
                  }`}
                >
                  {tab.label} ({tab.count})
                </button>
              ))}
            </div>

            {/* Upcoming Meetings */}
            {activeTab === 'upcoming' && (
              <div className="space-y-6">
                {upcomingMeetings.length > 0 ? (
                  upcomingMeetings.map((meeting) => (
                    <div key={meeting.id} className="bg-white rounded-xl shadow-sm p-6 border border-[#ffeee3]">
                      <div className="flex flex-col lg:flex-row lg:items-center justify-between">
                        <div className="flex-1 mb-4 lg:mb-0">
                          <div className="flex items-start justify-between mb-3">
                            <div>
                              <h3 className="text-lg font-bold text-[#2E2E2E] mb-1">{meeting.title}</h3>
                              <p className="text-[#2E2E2E]/60 mb-2">{meeting.project}</p>
                              <div className="flex items-center space-x-4 text-sm text-[#2E2E2E]/80">
                                <div className="flex items-center space-x-2">
                                  <img
                                    src={meeting.freelancer.avatar}
                                    alt={meeting.freelancer.name}
                                    className="w-6 h-6 rounded-full"
                                  />
                                  <span>{meeting.freelancer.name}</span>
                                </div>
                                <div className="flex items-center space-x-1">
                                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                  </svg>
                                  <span>{meeting.date} at {meeting.time} {meeting.timezone}</span>
                                </div>
                                <div className="flex items-center space-x-1">
                                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                  </svg>
                                  <span>{meeting.duration}</span>
                                </div>
                                <div className="flex items-center space-x-1">
                                  {getMeetingTypeIcon(meeting.type)}
                                  <span className="capitalize">{meeting.type}</span>
                                </div>
                              </div>
                            </div>
                            <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(meeting.status)}`}>
                              {meeting.status.replace('_', ' ')}
                            </span>
                          </div>
                          
                          {meeting.agenda && (
                            <div className="mb-3">
                              <p className="text-sm text-[#2E2E2E]/80">
                                <span className="font-medium">Agenda:</span> {meeting.agenda}
                              </p>
                            </div>
                          )}
                        </div>

                        <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-3">
                          {meeting.status === 'scheduled' && meeting.meetingLink && (
                            <a
                              href={meeting.meetingLink}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="px-4 py-2 bg-[#FF6B00] hover:bg-[#FF9F45] text-white rounded-lg font-medium transition-colors text-center"
                            >
                              Join Meeting
                            </a>
                          )}
                          <button className="px-4 py-2 bg-[#ffeee3] hover:bg-[#FF6B00] hover:text-white text-[#2E2E2E] rounded-lg font-medium transition-colors">
                            Edit
                          </button>
                          <button className="px-4 py-2 text-red-500 hover:bg-red-50 rounded-lg font-medium transition-colors">
                            Cancel
                          </button>
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="text-center py-12">
                    <svg className="w-16 h-16 text-[#2E2E2E]/20 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    <h3 className="text-lg font-medium text-[#2E2E2E] mb-2">No upcoming meetings</h3>
                    <p className="text-[#2E2E2E]/60 mb-4">Schedule a meeting with your freelancers to discuss project progress.</p>
                    <button
                      onClick={() => setShowScheduleModal(true)}
                      className="px-6 py-3 bg-[#FF6B00] hover:bg-[#FF9F45] text-white rounded-lg font-medium transition-colors"
                    >
                      Schedule Your First Meeting
                    </button>
                  </div>
                )}
              </div>
            )}

            {/* Past Meetings */}
            {activeTab === 'past' && (
              <div className="space-y-6">
                {pastMeetings.map((meeting) => (
                  <div key={meeting.id} className="bg-white rounded-xl shadow-sm p-6 border border-[#ffeee3]">
                    <div className="flex flex-col lg:flex-row lg:items-start justify-between">
                      <div className="flex-1 mb-4 lg:mb-0">
                        <div className="flex items-start justify-between mb-3">
                          <div>
                            <h3 className="text-lg font-bold text-[#2E2E2E] mb-1">{meeting.title}</h3>
                            <p className="text-[#2E2E2E]/60 mb-2">{meeting.project}</p>
                            <div className="flex items-center space-x-4 text-sm text-[#2E2E2E]/80">
                              <div className="flex items-center space-x-2">
                                <img
                                  src={meeting.freelancer.avatar}
                                  alt={meeting.freelancer.name}
                                  className="w-6 h-6 rounded-full"
                                />
                                <span>{meeting.freelancer.name}</span>
                              </div>
                              <span>{meeting.date} at {meeting.time} {meeting.timezone}</span>
                              <span>{meeting.duration}</span>
                            </div>
                          </div>
                          <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(meeting.status)}`}>
                            {meeting.status}
                          </span>
                        </div>
                        
                        {meeting.notes && (
                          <div className="mb-3 p-3 bg-[#ffeee3]/30 rounded-lg">
                            <p className="text-sm text-[#2E2E2E]">
                              <span className="font-medium">Meeting Notes:</span> {meeting.notes}
                            </p>
                          </div>
                        )}
                      </div>

                      <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-3">
                        {meeting.recording && (
                          <a
                            href={meeting.recording}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="px-4 py-2 bg-[#FF6B00] hover:bg-[#FF9F45] text-white rounded-lg font-medium transition-colors text-center"
                          >
                            View Recording
                          </a>
                        )}
                        <button className="px-4 py-2 bg-[#ffeee3] hover:bg-[#FF6B00] hover:text-white text-[#2E2E2E] rounded-lg font-medium transition-colors">
                          Download Notes
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Schedule Meeting Modal */}
      {showScheduleModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 w-full max-w-2xl mx-4 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold text-[#2E2E2E]">Schedule New Meeting</h3>
              <button
                onClick={() => setShowScheduleModal(false)}
                className="text-[#2E2E2E]/60 hover:text-[#2E2E2E]"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <form className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-[#2E2E2E] mb-2">Meeting Title</label>
                <input
                  type="text"
                  value={newMeeting.title}
                  onChange={(e) => setNewMeeting({...newMeeting, title: e.target.value})}
                  className="w-full px-4 py-3 border border-[#ffeee3] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF6B00] focus:border-transparent"
                  placeholder="e.g., Project Kickoff Meeting"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-[#2E2E2E] mb-2">Select Freelancer</label>
                <select
                  value={newMeeting.freelancer}
                  onChange={(e) => setNewMeeting({...newMeeting, freelancer: e.target.value})}
                  className="w-full px-4 py-3 border border-[#ffeee3] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF6B00] focus:border-transparent"
                >
                  <option value="">Choose a freelancer</option>
                  {freelancers.map((freelancer) => (
                    <option key={freelancer.id} value={freelancer.id}>
                      {freelancer.name} - {freelancer.project}
                    </option>
                  ))}
                </select>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-[#2E2E2E] mb-2">Date</label>
                  <input
                    type="date"
                    value={newMeeting.date}
                    onChange={(e) => setNewMeeting({...newMeeting, date: e.target.value})}
                    className="w-full px-4 py-3 border border-[#ffeee3] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF6B00] focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-[#2E2E2E] mb-2">Time</label>
                  <input
                    type="time"
                    value={newMeeting.time}
                    onChange={(e) => setNewMeeting({...newMeeting, time: e.target.value})}
                    className="w-full px-4 py-3 border border-[#ffeee3] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF6B00] focus:border-transparent"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-[#2E2E2E] mb-2">Duration</label>
                  <select
                    value={newMeeting.duration}
                    onChange={(e) => setNewMeeting({...newMeeting, duration: e.target.value})}
                    className="w-full px-4 py-3 border border-[#ffeee3] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF6B00] focus:border-transparent"
                  >
                    <option value="15">15 minutes</option>
                    <option value="30">30 minutes</option>
                    <option value="45">45 minutes</option>
                    <option value="60">1 hour</option>
                    <option value="90">1.5 hours</option>
                    <option value="120">2 hours</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-[#2E2E2E] mb-2">Meeting Type</label>
                  <select
                    value={newMeeting.type}
                    onChange={(e) => setNewMeeting({...newMeeting, type: e.target.value})}
                    className="w-full px-4 py-3 border border-[#ffeee3] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF6B00] focus:border-transparent"
                  >
                    <option value="video">Video Call</option>
                    <option value="audio">Audio Call</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-[#2E2E2E] mb-2">Agenda (Optional)</label>
                <textarea
                  value={newMeeting.agenda}
                  onChange={(e) => setNewMeeting({...newMeeting, agenda: e.target.value})}
                  className="w-full px-4 py-3 border border-[#ffeee3] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF6B00] focus:border-transparent"
                  rows={3}
                  placeholder="What would you like to discuss in this meeting?"
                />
              </div>

              <div className="flex space-x-3">
                <button
                  type="button"
                  onClick={() => setShowScheduleModal(false)}
                  className="flex-1 px-4 py-3 border border-[#ffeee3] text-[#2E2E2E] rounded-lg hover:bg-[#ffeee3] transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 px-4 py-3 bg-[#FF6B00] hover:bg-[#FF9F45] text-white rounded-lg transition-colors"
                >
                  Schedule Meeting
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default MeetingsPage;
