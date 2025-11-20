import React, { useState } from 'react';
import { 
  Search,
  Send,
  Paperclip,
  Phone,
  Video,
  MoreHorizontal,
  Check,
  CheckCheck,
  Clock,
  Plus,
  User,
  Image,
  FileText,
  Smile
} from 'lucide-react';

const Messages: React.FC = () => {
  const [selectedChat, setSelectedChat] = useState(1);
  const [messageText, setMessageText] = useState('');
  const [searchQuery, setSearchQuery] = useState('');

  const conversations = [
    {
      id: 1,
      client: {
        name: 'Sarah Johnson',
        avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=100&h=100&fit=crop&crop=face&auto=format',
        online: true,
        company: 'TechCorp Solutions'
      },
      project: 'E-commerce Platform Development',
      lastMessage: 'Great! The milestone has been approved. Can you start working on the payment integration?',
      timestamp: '2 min ago',
      unread: 3,
      status: 'active',
      lastSeen: 'online'
    },
    {
      id: 2,
      client: {
        name: 'Michael Chen',
        avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face&auto=format',
        online: false,
        company: 'InnovateTech Inc'
      },
      project: 'SaaS Dashboard Creation',
      lastMessage: 'The designs look perfect! When can we schedule a call to discuss the next phase?',
      timestamp: '1 hour ago',
      unread: 0,
      status: 'active',
      lastSeen: '1 hour ago'
    },
    {
      id: 3,
      client: {
        name: 'Emily Rodriguez',
        avatar: '/api/placeholder/50/50',
        online: true,
        company: 'DataViz Solutions'
      },
      project: 'Analytics Dashboard',
      lastMessage: 'Thanks for the update. I\'ll review the charts and get back to you.',
      timestamp: '3 hours ago',
      unread: 1,
      status: 'active',
      lastSeen: 'online'
    },
    {
      id: 4,
      client: {
        name: 'David Wilson',
        avatar: '/api/placeholder/50/50',
        online: false,
        company: 'MobileFirst Co'
      },
      project: 'React Native App',
      lastMessage: 'Can you send me the latest build for testing?',
      timestamp: '1 day ago',
      unread: 0,
      status: 'active',
      lastSeen: '8 hours ago'
    },
    {
      id: 5,
      client: {
        name: 'Lisa Thompson',
        avatar: '/api/placeholder/50/50',
        online: false,
        company: 'PerformancePro Ltd'
      },
      project: 'Performance Optimization',
      lastMessage: 'The performance improvements are amazing! Great work.',
      timestamp: '2 days ago',
      unread: 0,
      status: 'completed',
      lastSeen: '1 day ago'
    }
  ];

  const messages = [
    {
      id: 1,
      sender: 'client',
      content: 'Hi! I\'ve reviewed your proposal and I\'m impressed with your portfolio. I\'d like to move forward with the project.',
      timestamp: '10:30 AM',
      status: 'read',
      type: 'text'
    },
    {
      id: 2,
      sender: 'freelancer',
      content: 'Thank you! I\'m excited to work on this project. I have a few questions about the requirements to make sure I deliver exactly what you need.',
      timestamp: '10:32 AM',
      status: 'read',
      type: 'text'
    },
    {
      id: 3,
      sender: 'freelancer',
      content: '1. What\'s your preferred tech stack for the backend?\n2. Do you have any existing design guidelines?\n3. What\'s the expected timeline for each milestone?',
      timestamp: '10:33 AM',
      status: 'read',
      type: 'text'
    },
    {
      id: 4,
      sender: 'client',
      content: 'Great questions! Let me answer them:',
      timestamp: '11:15 AM',
      status: 'read',
      type: 'text'
    },
    {
      id: 5,
      sender: 'client',
      content: 'project-requirements.pdf',
      timestamp: '11:16 AM',
      status: 'read',
      type: 'file',
      fileName: 'project-requirements.pdf',
      fileSize: '2.4 MB'
    },
    {
      id: 6,
      sender: 'client',
      content: 'I\'ve attached the detailed requirements document. For the tech stack, we prefer Node.js with Express for the backend.',
      timestamp: '11:17 AM',
      status: 'read',
      type: 'text'
    },
    {
      id: 7,
      sender: 'freelancer',
      content: 'Perfect! I\'ve downloaded the requirements. Node.js and Express are exactly what I was thinking too. I\'ll prepare a detailed project timeline and send it over.',
      timestamp: '2:45 PM',
      status: 'delivered',
      type: 'text'
    },
    {
      id: 8,
      sender: 'client',
      content: 'Great! The milestone has been approved. Can you start working on the payment integration?',
      timestamp: '3:20 PM',
      status: 'delivered',
      type: 'text'
    }
  ];

  const filteredConversations = conversations.filter(conv =>
    conv.client.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    conv.project.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const selectedConversation = conversations.find(conv => conv.id === selectedChat);

  const handleSendMessage = () => {
    if (messageText.trim()) {
      // Add message logic here
      setMessageText('');
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'sent':
        return <Check className="w-3 h-3 text-gray-400" />;
      case 'delivered':
        return <CheckCheck className="w-3 h-3 text-gray-400" />;
      case 'read':
        return <CheckCheck className="w-3 h-3 text-[#FF6B00]" />;
      default:
        return <Clock className="w-3 h-3 text-gray-400" />;
    }
  };

  return (
    <div className="min-h-screen bg-[#ffeee3]/30 pt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden h-[800px]">
          <div className="flex h-full">
            {/* Sidebar */}
            <div className="w-1/3 border-r border-gray-200 flex flex-col">
              {/* Header */}
              <div className="p-4 border-b border-gray-200">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-xl font-semibold text-[#2E2E2E]">Messages</h2>
                  <button className="bg-[#FF6B00] hover:bg-[#FF9F45] text-white p-2 rounded-lg transition-colors">
                    <Plus className="w-4 h-4" />
                  </button>
                </div>
                
                {/* Search */}
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <input
                    type="text"
                    placeholder="Search conversations..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF6B00] focus:border-transparent"
                  />
                </div>
                
                {/* Filters */}
                <div className="flex space-x-2 mt-3">
                  <button className="bg-[#ffeee3] text-[#FF6B00] px-3 py-1 rounded-full text-sm font-medium">
                    All
                  </button>
                  <button className="text-[#2E2E2E]/60 hover:text-[#FF6B00] px-3 py-1 rounded-full text-sm font-medium">
                    Unread
                  </button>
                  <button className="text-[#2E2E2E]/60 hover:text-[#FF6B00] px-3 py-1 rounded-full text-sm font-medium">
                    Active
                  </button>
                </div>
              </div>

              {/* Conversations List */}
              <div className="flex-1 overflow-y-auto">
                {filteredConversations.map((conversation) => (
                  <div
                    key={conversation.id}
                    onClick={() => setSelectedChat(conversation.id)}
                    className={`p-4 border-b border-gray-100 cursor-pointer hover:bg-gray-50 transition-colors ${
                      selectedChat === conversation.id ? 'bg-[#ffeee3] border-r-2 border-r-[#FF6B00]' : ''
                    }`}
                  >
                    <div className="flex items-start space-x-3">
                      <div className="relative">
                        <img
                          src={conversation.client.avatar}
                          alt={conversation.client.name}
                          className="w-12 h-12 rounded-full object-cover"
                        />
                        {conversation.client.online && (
                          <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></div>
                        )}
                      </div>
                      
                      <div className="flex-1 min-w-0">
                        <div className="flex justify-between items-start mb-1">
                          <h3 className="font-medium text-[#2E2E2E] truncate">
                            {conversation.client.name}
                          </h3>
                          <div className="flex items-center space-x-1">
                            {conversation.unread > 0 && (
                              <span className="bg-[#FF6B00] text-white text-xs px-2 py-1 rounded-full">
                                {conversation.unread}
                              </span>
                            )}
                            <span className="text-xs text-[#2E2E2E]/60">
                              {conversation.timestamp}
                            </span>
                          </div>
                        </div>
                        
                        <p className="text-sm text-[#2E2E2E]/60 mb-1 truncate">
                          {conversation.project}
                        </p>
                        
                        <p className="text-sm text-[#2E2E2E]/80 truncate">
                          {conversation.lastMessage}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Chat Area */}
            <div className="flex-1 flex flex-col">
              {selectedConversation ? (
                <>
                  {/* Chat Header */}
                  <div className="p-4 border-b border-gray-200 bg-gray-50">
                    <div className="flex justify-between items-center">
                      <div className="flex items-center space-x-3">
                        <div className="relative">
                          <img
                            src={selectedConversation.client.avatar}
                            alt={selectedConversation.client.name}
                            className="w-10 h-10 rounded-full object-cover"
                          />
                          {selectedConversation.client.online && (
                            <div className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-green-500 rounded-full border border-white"></div>
                          )}
                        </div>
                        <div>
                          <h3 className="font-medium text-[#2E2E2E]">
                            {selectedConversation.client.name}
                          </h3>
                          <div className="flex items-center space-x-2 text-sm text-[#2E2E2E]/60">
                            <span>{selectedConversation.client.company}</span>
                            <span>•</span>
                            <span>{selectedConversation.lastSeen}</span>
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex items-center space-x-2">
                        <button className="p-2 text-[#2E2E2E]/60 hover:text-[#FF6B00] hover:bg-[#ffeee3] rounded-lg transition-colors">
                          <Phone className="w-5 h-5" />
                        </button>
                        <button className="p-2 text-[#2E2E2E]/60 hover:text-[#FF6B00] hover:bg-[#ffeee3] rounded-lg transition-colors">
                          <Video className="w-5 h-5" />
                        </button>
                        <button className="p-2 text-[#2E2E2E]/60 hover:text-[#FF6B00] hover:bg-[#ffeee3] rounded-lg transition-colors">
                          <MoreHorizontal className="w-5 h-5" />
                        </button>
                      </div>
                    </div>
                    
                    {/* Project Info */}
                    <div className="mt-3 p-3 bg-white rounded-lg border border-gray-200">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-medium text-[#2E2E2E] text-sm">
                            {selectedConversation.project}
                          </p>
                          <p className="text-xs text-[#2E2E2E]/60">
                            Status: {selectedConversation.status}
                          </p>
                        </div>
                        <button className="text-[#FF6B00] hover:text-[#FF9F45] text-sm font-medium">
                          View Project
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Messages */}
                  <div className="flex-1 overflow-y-auto p-4 space-y-4">
                    {messages.map((message) => (
                      <div
                        key={message.id}
                        className={`flex ${message.sender === 'freelancer' ? 'justify-end' : 'justify-start'}`}
                      >
                        <div className={`max-w-sm lg:max-w-md xl:max-w-lg ${
                          message.sender === 'freelancer' 
                            ? 'bg-[#FF6B00] text-white rounded-l-lg rounded-tr-lg' 
                            : 'bg-gray-100 text-[#2E2E2E] rounded-r-lg rounded-tl-lg'
                        } p-3`}>
                          {message.type === 'file' ? (
                            <div className="flex items-center space-x-3">
                              <div className="bg-white/20 p-2 rounded">
                                <FileText className="w-5 h-5" />
                              </div>
                              <div>
                                <p className="font-medium">{message.fileName}</p>
                                <p className="text-sm opacity-75">{message.fileSize}</p>
                              </div>
                            </div>
                          ) : (
                            <p className="whitespace-pre-wrap">{message.content}</p>
                          )}
                          
                          <div className={`flex items-center justify-end space-x-1 mt-2 text-xs ${
                            message.sender === 'freelancer' ? 'text-white/70' : 'text-[#2E2E2E]/60'
                          }`}>
                            <span>{message.timestamp}</span>
                            {message.sender === 'freelancer' && getStatusIcon(message.status)}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Message Input */}
                  <div className="p-4 border-t border-gray-200 bg-gray-50">
                    <div className="flex items-end space-x-3">
                      <div className="flex-1">
                        <div className="flex items-center space-x-2 mb-2">
                          <button className="p-2 text-[#2E2E2E]/60 hover:text-[#FF6B00] hover:bg-white rounded-lg transition-colors">
                            <Paperclip className="w-4 h-4" />
                          </button>
                          <button className="p-2 text-[#2E2E2E]/60 hover:text-[#FF6B00] hover:bg-white rounded-lg transition-colors">
                            <Image className="w-4 h-4" />
                          </button>
                          <button className="p-2 text-[#2E2E2E]/60 hover:text-[#FF6B00] hover:bg-white rounded-lg transition-colors">
                            <Smile className="w-4 h-4" />
                          </button>
                        </div>
                        <textarea
                          value={messageText}
                          onChange={(e) => setMessageText(e.target.value)}
                          placeholder="Type your message..."
                          className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#FF6B00] focus:border-transparent resize-none"
                          rows={3}
                          onKeyPress={(e) => {
                            if (e.key === 'Enter' && !e.shiftKey) {
                              e.preventDefault();
                              handleSendMessage();
                            }
                          }}
                        />
                      </div>
                      <button
                        onClick={handleSendMessage}
                        disabled={!messageText.trim()}
                        className="bg-[#FF6B00] hover:bg-[#FF9F45] disabled:bg-gray-300 disabled:cursor-not-allowed text-white p-3 rounded-lg transition-colors"
                      >
                        <Send className="w-5 h-5" />
                      </button>
                    </div>
                  </div>
                </>
              ) : (
                <div className="flex-1 flex items-center justify-center bg-gray-50">
                  <div className="text-center">
                    <div className="bg-gray-200 p-4 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                      <User className="w-8 h-8 text-gray-400" />
                    </div>
                    <h3 className="text-lg font-medium text-[#2E2E2E] mb-2">Select a conversation</h3>
                    <p className="text-[#2E2E2E]/60">Choose a conversation from the sidebar to start messaging</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Messages;
