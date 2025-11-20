import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const MessagesPage: React.FC = () => {
  const [selectedConversation, setSelectedConversation] = useState<string | null>('1');
  const [messageText, setMessageText] = useState('');
  const [searchQuery, setSearchQuery] = useState('');

  const conversations = [
    {
      id: '1',
      freelancer: {
        name: 'John Smith',
        avatar: '/api/placeholder/40/40',
        status: 'online'
      },
      project: 'E-commerce Website Development',
      lastMessage: 'I\'ve completed the frontend development milestone and uploaded the files to the workspace.',
      timestamp: '2 min ago',
      unread: 2,
      isActive: true
    },
    {
      id: '2',
      freelancer: {
        name: 'Sarah Johnson',
        avatar: '/api/placeholder/40/40',
        status: 'away'
      },
      project: 'Mobile App UI Design',
      lastMessage: 'Thank you for the feedback! I\'ll incorporate those changes and have the final designs ready by tomorrow.',
      timestamp: '1 hour ago',
      unread: 0,
      isActive: true
    },
    {
      id: '3',
      freelancer: {
        name: 'Mike Chen',
        avatar: '/api/placeholder/40/40',
        status: 'offline'
      },
      project: 'Brand Identity Package',
      lastMessage: 'Perfect! The logo concepts look great. I especially like option 2.',
      timestamp: '3 hours ago',
      unread: 1,
      isActive: true
    },
    {
      id: '4',
      freelancer: {
        name: 'Emma Wilson',
        avatar: '/api/placeholder/40/40',
        status: 'offline'
      },
      project: 'Blog Content Creation',
      lastMessage: 'All articles have been delivered. Thank you for working with me!',
      timestamp: '2 days ago',
      unread: 0,
      isActive: false
    }
  ];

  const messages = [
    {
      id: '1',
      sender: 'John Smith',
      content: 'Hi! I wanted to update you on the progress. I\'ve completed the frontend development milestone.',
      timestamp: '10:30 AM',
      isOwn: false,
      type: 'text'
    },
    {
      id: '2',
      sender: 'You',
      content: 'That\'s great news! How long did it take you to complete?',
      timestamp: '10:32 AM',
      isOwn: true,
      type: 'text'
    },
    {
      id: '3',
      sender: 'John Smith',
      content: 'It took about 2 weeks as planned. I\'ve also uploaded all the files to the project workspace.',
      timestamp: '10:35 AM',
      isOwn: false,
      type: 'text'
    },
    {
      id: '4',
      sender: 'John Smith',
      content: 'Here are some screenshots of the key pages:',
      timestamp: '10:36 AM',
      isOwn: false,
      type: 'text'
    },
    {
      id: '5',
      sender: 'John Smith',
      content: 'homepage-screenshot.png',
      timestamp: '10:36 AM',
      isOwn: false,
      type: 'file',
      fileInfo: {
        name: 'homepage-screenshot.png',
        size: '2.4 MB',
        type: 'image'
      }
    },
    {
      id: '6',
      sender: 'You',
      content: 'Looks fantastic! The design is exactly what we discussed. Ready to move to the next milestone?',
      timestamp: '11:15 AM',
      isOwn: true,
      type: 'text'
    },
    {
      id: '7',
      sender: 'John Smith',
      content: 'Yes, I\'m ready to start the backend development. I\'ll begin working on the API endpoints tomorrow.',
      timestamp: '11:20 AM',
      isOwn: false,
      type: 'text'
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'online': return 'bg-green-400';
      case 'away': return 'bg-yellow-400';
      case 'offline': return 'bg-gray-400';
      default: return 'bg-gray-400';
    }
  };

  const filteredConversations = conversations.filter(conv =>
    conv.freelancer.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    conv.project.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const selectedConv = conversations.find(conv => conv.id === selectedConversation);

  return (
    <div className="min-h-screen bg-[#ffeee3]">
      {/* Hero Section */}
      <section className="pt-40 pb-16 bg-[#2E2E2E] text-white">
        <div className="section-container">
          <div className="max-w-6xl mx-auto">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Messages</h1>
            <p className="text-xl mb-8 text-[#ffeee3]">
              Communicate with your freelancers and manage all project conversations in one place.
            </p>
          </div>
        </div>
      </section>

      {/* Messages Interface */}
      <section className="py-16">
        <div className="section-container">
          <div className="max-w-6xl mx-auto">
            <div className="bg-white rounded-xl shadow-sm border border-[#ffeee3] overflow-hidden">
              <div className="flex h-[600px]">
                {/* Conversations Sidebar */}
                <div className="w-1/3 border-r border-[#ffeee3] flex flex-col">
                  {/* Search */}
                  <div className="p-4 border-b border-[#ffeee3]">
                    <div className="relative">
                      <input
                        type="text"
                        placeholder="Search conversations..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full pl-10 pr-4 py-2 border border-[#ffeee3] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF6B00] focus:border-transparent"
                      />
                      <svg className="absolute left-3 top-2.5 h-5 w-5 text-[#2E2E2E]/40" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                      </svg>
                    </div>
                  </div>

                  {/* Conversations List */}
                  <div className="flex-1 overflow-y-auto">
                    {filteredConversations.map((conversation) => (
                      <div
                        key={conversation.id}
                        onClick={() => setSelectedConversation(conversation.id)}
                        className={`p-4 border-b border-[#ffeee3] cursor-pointer hover:bg-[#ffeee3]/30 transition-colors ${
                          selectedConversation === conversation.id ? 'bg-[#ffeee3]/50' : ''
                        }`}
                      >
                        <div className="flex items-start space-x-3">
                          <div className="relative">
                            <img
                              src={conversation.freelancer.avatar}
                              alt={conversation.freelancer.name}
                              className="w-12 h-12 rounded-full object-cover"
                            />
                            <div className={`absolute -bottom-1 -right-1 w-4 h-4 rounded-full border-2 border-white ${getStatusColor(conversation.freelancer.status)}`}></div>
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center justify-between mb-1">
                              <h4 className="font-medium text-[#2E2E2E] truncate">{conversation.freelancer.name}</h4>
                              <div className="flex items-center space-x-2">
                                {conversation.unread > 0 && (
                                  <span className="bg-[#FF6B00] text-white text-xs rounded-full px-2 py-1 min-w-[20px] text-center">
                                    {conversation.unread}
                                  </span>
                                )}
                                <span className="text-xs text-[#2E2E2E]/60">{conversation.timestamp}</span>
                              </div>
                            </div>
                            <p className="text-sm text-[#2E2E2E]/80 mb-1 truncate">{conversation.project}</p>
                            <p className="text-sm text-[#2E2E2E]/60 truncate">{conversation.lastMessage}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Chat Area */}
                <div className="flex-1 flex flex-col">
                  {selectedConv ? (
                    <>
                      {/* Chat Header */}
                      <div className="p-4 border-b border-[#ffeee3] bg-[#ffeee3]/30">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-3">
                            <div className="relative">
                              <img
                                src={selectedConv.freelancer.avatar}
                                alt={selectedConv.freelancer.name}
                                className="w-10 h-10 rounded-full object-cover"
                              />
                              <div className={`absolute -bottom-1 -right-1 w-3 h-3 rounded-full border-2 border-white ${getStatusColor(selectedConv.freelancer.status)}`}></div>
                            </div>
                            <div>
                              <h3 className="font-medium text-[#2E2E2E]">{selectedConv.freelancer.name}</h3>
                              <p className="text-sm text-[#2E2E2E]/60">{selectedConv.project}</p>
                            </div>
                          </div>
                          <div className="flex space-x-2">
                            <button className="p-2 text-[#2E2E2E]/60 hover:text-[#FF6B00] hover:bg-[#ffeee3] rounded-lg transition-colors">
                              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                              </svg>
                            </button>
                            <button className="p-2 text-[#2E2E2E]/60 hover:text-[#FF6B00] hover:bg-[#ffeee3] rounded-lg transition-colors">
                              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                              </svg>
                            </button>
                            <Link
                              to="/client/project-workspace"
                              className="p-2 text-[#2E2E2E]/60 hover:text-[#FF6B00] hover:bg-[#ffeee3] rounded-lg transition-colors"
                            >
                              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                              </svg>
                            </Link>
                          </div>
                        </div>
                      </div>

                      {/* Messages */}
                      <div className="flex-1 overflow-y-auto p-4 space-y-4">
                        {messages.map((message) => (
                          <div
                            key={message.id}
                            className={`flex ${message.isOwn ? 'justify-end' : 'justify-start'}`}
                          >
                            <div className={`max-w-[70%] ${message.isOwn ? 'order-2' : 'order-1'}`}>
                              {message.type === 'text' ? (
                                <div className={`p-3 rounded-lg ${
                                  message.isOwn
                                    ? 'bg-[#FF6B00] text-white'
                                    : 'bg-[#ffeee3] text-[#2E2E2E]'
                                }`}>
                                  <p className="text-sm">{message.content}</p>
                                </div>
                              ) : (
                                <div className={`p-3 rounded-lg border ${
                                  message.isOwn
                                    ? 'bg-[#FF6B00] text-white border-[#FF6B00]'
                                    : 'bg-white text-[#2E2E2E] border-[#ffeee3]'
                                }`}>
                                  <div className="flex items-center space-x-3">
                                    <svg className="w-8 h-8 text-blue-500" fill="currentColor" viewBox="0 0 20 20">
                                      <path fillRule="evenodd" d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" clipRule="evenodd" />
                                    </svg>
                                    <div>
                                      <p className="font-medium text-sm">{message.fileInfo?.name}</p>
                                      <p className="text-xs opacity-75">{message.fileInfo?.size}</p>
                                    </div>
                                  </div>
                                </div>
                              )}
                              <p className={`text-xs mt-1 ${
                                message.isOwn ? 'text-right text-[#2E2E2E]/60' : 'text-left text-[#2E2E2E]/60'
                              }`}>
                                {message.timestamp}
                              </p>
                            </div>
                          </div>
                        ))}
                      </div>

                      {/* Message Input */}
                      <div className="p-4 border-t border-[#ffeee3]">
                        <div className="flex items-end space-x-3">
                          <button className="p-2 text-[#2E2E2E]/60 hover:text-[#FF6B00] transition-colors">
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13" />
                            </svg>
                          </button>
                          <div className="flex-1">
                            <textarea
                              value={messageText}
                              onChange={(e) => setMessageText(e.target.value)}
                              placeholder="Type your message..."
                              className="w-full px-4 py-3 border border-[#ffeee3] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF6B00] focus:border-transparent resize-none"
                              rows={2}
                            />
                          </div>
                          <button
                            disabled={!messageText.trim()}
                            className={`p-3 rounded-lg transition-colors ${
                              messageText.trim()
                                ? 'bg-[#FF6B00] hover:bg-[#FF9F45] text-white'
                                : 'bg-[#ffeee3] text-[#2E2E2E]/40 cursor-not-allowed'
                            }`}
                          >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                            </svg>
                          </button>
                        </div>
                      </div>
                    </>
                  ) : (
                    <div className="flex-1 flex items-center justify-center">
                      <div className="text-center">
                        <svg className="w-16 h-16 text-[#2E2E2E]/20 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                        </svg>
                        <p className="text-[#2E2E2E]/60">Select a conversation to start messaging</p>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default MessagesPage;
