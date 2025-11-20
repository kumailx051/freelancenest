import React, { useState, useRef, useEffect } from 'react';

const Meetings: React.FC = () => {
  const [activeTab, setActiveTab] = useState('upcoming');
  const [isMeetingActive, setIsMeetingActive] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [isCameraOff, setIsCameraOff] = useState(false);
  const [isScreenSharing, setIsScreenSharing] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  const upcomingMeetings = [
    {
      id: 1,
      title: 'Project Kickoff - E-commerce Website',
      client: 'TechStart Inc.',
      date: '2024-01-16',
      time: '10:00 AM - 11:00 AM',
      duration: '60 min',
      type: 'video',
      status: 'confirmed',
      agenda: 'Discuss project requirements, timeline, and initial wireframes',
      joinUrl: 'https://meet.freelancenest.com/meeting/abc123'
    },
    {
      id: 2,
      title: 'Weekly Progress Review',
      client: 'Creative Agency',
      date: '2024-01-17',
      time: '2:00 PM - 2:30 PM',
      duration: '30 min',
      type: 'video',
      status: 'pending',
      agenda: 'Review completed work and discuss next milestones',
      joinUrl: 'https://meet.freelancenest.com/meeting/def456'
    },
    {
      id: 3,
      title: 'Design Consultation',
      client: 'StartupCo',
      date: '2024-01-18',
      time: '3:00 PM - 4:00 PM',
      duration: '60 min',
      type: 'video',
      status: 'confirmed',
      agenda: 'Present design concepts and gather feedback',
      joinUrl: 'https://meet.freelancenest.com/meeting/ghi789'
    }
  ];

  const pastMeetings = [
    {
      id: 4,
      title: 'Project Planning Session',
      client: 'BigCorp Ltd.',
      date: '2024-01-12',
      time: '11:00 AM - 12:00 PM',
      duration: '60 min',
      type: 'video',
      status: 'completed',
      recording: true,
      notes: 'Discussed project scope, deliverables, and timeline. Client approved the proposed approach.'
    },
    {
      id: 5,
      title: 'Final Presentation',
      client: 'Digital Solutions',
      date: '2024-01-10',
      time: '4:00 PM - 5:00 PM',
      duration: '60 min',
      type: 'video',
      status: 'completed',
      recording: true,
      notes: 'Presented final deliverables. Client was satisfied with the results.'
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'confirmed':
        return 'text-green-600 bg-green-50';
      case 'pending':
        return 'text-yellow-600 bg-yellow-50';
      case 'completed':
        return 'text-blue-600 bg-blue-50';
      case 'cancelled':
        return 'text-red-600 bg-red-50';
      default:
        return 'text-gray-600 bg-gray-50';
    }
  };

  const startMeeting = () => {
    setIsMeetingActive(true);
    // Initialize camera and microphone
    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
      navigator.mediaDevices.getUserMedia({ video: true, audio: true })
        .then((stream) => {
          if (videoRef.current) {
            videoRef.current.srcObject = stream;
          }
        })
        .catch((error) => {
          console.error('Error accessing media devices:', error);
        });
    }
  };

  const endMeeting = () => {
    setIsMeetingActive(false);
    if (videoRef.current?.srcObject) {
      const stream = videoRef.current.srcObject as MediaStream;
      stream.getTracks().forEach(track => track.stop());
    }
  };

  useEffect(() => {
    return () => {
      // Cleanup on unmount
      if (videoRef.current?.srcObject) {
        const stream = videoRef.current.srcObject as MediaStream;
        stream.getTracks().forEach(track => track.stop());
      }
    };
  }, []);

  if (isMeetingActive) {
    return (
      <div className="fixed inset-0 bg-black z-50">
        {/* Meeting Interface */}
        <div className="h-full flex flex-col">
          {/* Video Area */}
          <div className="flex-1 relative">
            <video
              ref={videoRef}
              autoPlay
              muted
              className="w-full h-full object-cover"
            />
            
            {/* Remote participant window */}
            <div className="absolute top-4 right-4 w-64 h-48 bg-gray-800 rounded-lg overflow-hidden">
              <div className="w-full h-full flex items-center justify-center text-white">
                <div className="text-center">
                  <div className="w-16 h-16 bg-[#FF6B00] rounded-full flex items-center justify-center text-white font-bold text-xl mb-2 mx-auto">
                    TC
                  </div>
                  <p className="text-sm">TechStart Inc.</p>
                </div>
              </div>
            </div>

            {/* Screen sharing indicator */}
            {isScreenSharing && (
              <div className="absolute top-4 left-4 bg-red-600 text-white px-3 py-1 rounded-lg text-sm">
                🖥️ You are sharing your screen
              </div>
            )}

            {/* Meeting info */}
            <div className="absolute top-4 left-1/2 transform -translate-x-1/2 bg-black bg-opacity-50 text-white px-4 py-2 rounded-lg">
              <p className="text-sm">Project Kickoff - E-commerce Website</p>
              <p className="text-xs opacity-75">45:32 elapsed</p>
            </div>
          </div>

          {/* Controls */}
          <div className="bg-gray-900 p-4">
            <div className="flex items-center justify-center gap-4">
              <button
                onClick={() => setIsMuted(!isMuted)}
                className={`w-12 h-12 rounded-full flex items-center justify-center transition-colors ${
                  isMuted ? 'bg-red-600 hover:bg-red-700' : 'bg-gray-600 hover:bg-gray-700'
                }`}
              >
                <span className="text-white text-xl">{isMuted ? '🎤❌' : '🎤'}</span>
              </button>

              <button
                onClick={() => setIsCameraOff(!isCameraOff)}
                className={`w-12 h-12 rounded-full flex items-center justify-center transition-colors ${
                  isCameraOff ? 'bg-red-600 hover:bg-red-700' : 'bg-gray-600 hover:bg-gray-700'
                }`}
              >
                <span className="text-white text-xl">{isCameraOff ? '📹❌' : '📹'}</span>
              </button>

              <button
                onClick={() => setIsScreenSharing(!isScreenSharing)}
                className={`w-12 h-12 rounded-full flex items-center justify-center transition-colors ${
                  isScreenSharing ? 'bg-[#FF6B00] hover:bg-[#FF9F45]' : 'bg-gray-600 hover:bg-gray-700'
                }`}
              >
                <span className="text-white text-xl">🖥️</span>
              </button>

              <button className="w-12 h-12 rounded-full bg-gray-600 hover:bg-gray-700 flex items-center justify-center">
                <span className="text-white text-xl">💬</span>
              </button>

              <button className="w-12 h-12 rounded-full bg-gray-600 hover:bg-gray-700 flex items-center justify-center">
                <span className="text-white text-xl">⚙️</span>
              </button>

              <button
                onClick={endMeeting}
                className="w-12 h-12 rounded-full bg-red-600 hover:bg-red-700 flex items-center justify-center"
              >
                <span className="text-white text-xl">📞</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h1 className="text-3xl font-bold text-[#2E2E2E] mb-2">Meetings</h1>
              <p className="text-gray-600">Schedule and manage video meetings with clients</p>
            </div>
            <button className="px-4 py-2 bg-[#FF6B00] text-white rounded-lg hover:bg-[#FF9F45] transition-colors">
              Schedule Meeting
            </button>
          </div>
        </div>

        {/* Tabs */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 mb-8">
          <div className="border-b border-gray-200">
            <nav className="-mb-px flex space-x-8 px-6">
              {[
                { id: 'upcoming', name: 'Upcoming Meetings', count: upcomingMeetings.length },
                { id: 'past', name: 'Past Meetings', count: pastMeetings.length },
                { id: 'recordings', name: 'Recordings', count: pastMeetings.filter(m => m.recording).length }
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
                  {tab.name}
                  <span className={`ml-2 px-2 py-1 text-xs rounded-full ${
                    activeTab === tab.id 
                      ? 'bg-[#FF6B00] text-white' 
                      : 'bg-gray-100 text-gray-600'
                  }`}>
                    {tab.count}
                  </span>
                </button>
              ))}
            </nav>
          </div>

          <div className="p-6">
            {/* Upcoming Meetings Tab */}
            {activeTab === 'upcoming' && (
              <div>
                {upcomingMeetings.length === 0 ? (
                  <div className="text-center py-12">
                    <span className="text-6xl mb-4 block">📅</span>
                    <h3 className="text-lg font-semibold text-[#2E2E2E] mb-2">No Upcoming Meetings</h3>
                    <p className="text-gray-600">Schedule a meeting with your clients to discuss projects</p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {upcomingMeetings.map((meeting) => (
                      <div key={meeting.id} className="bg-gray-50 rounded-xl p-6 border border-gray-200">
                        <div className="flex items-start justify-between mb-4">
                          <div>
                            <h3 className="text-lg font-semibold text-[#2E2E2E] mb-2">{meeting.title}</h3>
                            <div className="flex items-center gap-4 text-sm text-gray-600 mb-2">
                              <span>📅 {new Date(meeting.date).toLocaleDateString()}</span>
                              <span>⏰ {meeting.time}</span>
                              <span>👥 with {meeting.client}</span>
                            </div>
                            <p className="text-sm text-gray-600">{meeting.agenda}</p>
                          </div>
                          <div className="text-right">
                            <span className={`px-3 py-1 text-xs font-semibold rounded-full ${getStatusColor(meeting.status)}`}>
                              {meeting.status.charAt(0).toUpperCase() + meeting.status.slice(1)}
                            </span>
                          </div>
                        </div>

                        <div className="flex items-center justify-between">
                          <div className="text-sm text-gray-500">
                            Duration: {meeting.duration}
                          </div>
                          <div className="flex items-center gap-3">
                            <button className="text-[#FF6B00] hover:underline text-sm font-medium">
                              Edit Meeting
                            </button>
                            <button className="text-[#FF6B00] hover:underline text-sm font-medium">
                              Copy Link
                            </button>
                            <button 
                              onClick={startMeeting}
                              className="bg-[#FF6B00] text-white px-4 py-2 rounded-lg hover:bg-[#FF9F45] transition-colors text-sm"
                            >
                              Join Meeting
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* Past Meetings Tab */}
            {activeTab === 'past' && (
              <div>
                <div className="space-y-4">
                  {pastMeetings.map((meeting) => (
                    <div key={meeting.id} className="bg-gray-50 rounded-xl p-6 border border-gray-200">
                      <div className="flex items-start justify-between mb-4">
                        <div>
                          <h3 className="text-lg font-semibold text-[#2E2E2E] mb-2">{meeting.title}</h3>
                          <div className="flex items-center gap-4 text-sm text-gray-600 mb-2">
                            <span>📅 {new Date(meeting.date).toLocaleDateString()}</span>
                            <span>⏰ {meeting.time}</span>
                            <span>👥 with {meeting.client}</span>
                            {meeting.recording && <span className="text-[#FF6B00]">🎥 Recorded</span>}
                          </div>
                          {meeting.notes && (
                            <p className="text-sm text-gray-600">{meeting.notes}</p>
                          )}
                        </div>
                        <div className="text-right">
                          <span className={`px-3 py-1 text-xs font-semibold rounded-full ${getStatusColor(meeting.status)}`}>
                            {meeting.status.charAt(0).toUpperCase() + meeting.status.slice(1)}
                          </span>
                        </div>
                      </div>

                      <div className="flex items-center justify-between">
                        <div className="text-sm text-gray-500">
                          Duration: {meeting.duration}
                        </div>
                        <div className="flex items-center gap-3">
                          <button className="text-[#FF6B00] hover:underline text-sm font-medium">
                            View Summary
                          </button>
                          {meeting.recording && (
                            <button className="text-[#FF6B00] hover:underline text-sm font-medium">
                              Watch Recording
                            </button>
                          )}
                          <button className="text-[#FF6B00] hover:underline text-sm font-medium">
                            Download Notes
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Recordings Tab */}
            {activeTab === 'recordings' && (
              <div>
                <div className="space-y-4">
                  {pastMeetings.filter(m => m.recording).map((meeting) => (
                    <div key={meeting.id} className="bg-gray-50 rounded-xl p-6 border border-gray-200">
                      <div className="flex items-start gap-4">
                        <div className="w-32 h-20 bg-gray-800 rounded-lg flex items-center justify-center">
                          <span className="text-white text-2xl">▶️</span>
                        </div>
                        <div className="flex-1">
                          <h3 className="text-lg font-semibold text-[#2E2E2E] mb-2">{meeting.title}</h3>
                          <div className="flex items-center gap-4 text-sm text-gray-600 mb-2">
                            <span>📅 {new Date(meeting.date).toLocaleDateString()}</span>
                            <span>⏰ {meeting.duration}</span>
                            <span>👥 {meeting.client}</span>
                          </div>
                          <div className="flex items-center gap-3">
                            <button className="bg-[#FF6B00] text-white px-4 py-2 rounded-lg hover:bg-[#FF9F45] transition-colors text-sm">
                              Play Recording
                            </button>
                            <button className="text-[#FF6B00] hover:underline text-sm font-medium">
                              Download
                            </button>
                            <button className="text-[#FF6B00] hover:underline text-sm font-medium">
                              Share Link
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 text-center">
            <span className="text-3xl mb-4 block">📅</span>
            <h3 className="text-lg font-semibold text-[#2E2E2E] mb-2">Schedule Meeting</h3>
            <p className="text-gray-600 text-sm mb-4">Plan a meeting with your client</p>
            <button className="bg-[#FF6B00] text-white px-4 py-2 rounded-lg hover:bg-[#FF9F45] transition-colors">
              Schedule Now
            </button>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 text-center">
            <span className="text-3xl mb-4 block">⚙️</span>
            <h3 className="text-lg font-semibold text-[#2E2E2E] mb-2">Meeting Settings</h3>
            <p className="text-gray-600 text-sm mb-4">Configure your meeting preferences</p>
            <button className="bg-gray-100 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-200 transition-colors">
              Open Settings
            </button>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 text-center">
            <span className="text-3xl mb-4 block">📊</span>
            <h3 className="text-lg font-semibold text-[#2E2E2E] mb-2">Meeting Analytics</h3>
            <p className="text-gray-600 text-sm mb-4">View your meeting statistics</p>
            <button className="bg-gray-100 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-200 transition-colors">
              View Analytics
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Meetings;
