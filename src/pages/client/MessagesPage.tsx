import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { collection, query, where, onSnapshot, getDocs, doc, getDoc, updateDoc, arrayUnion } from 'firebase/firestore';
import { db } from '../../lib/firebase';

const MessagesPage: React.FC = () => {
  const { currentUser } = useAuth();
  const location = useLocation();
  const [selectedConversation, setSelectedConversation] = useState<string | null>(null);
  const [messageText, setMessageText] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  // Define a type for conversation data
  type FirestoreConversation = {
    id: string;
    conversationId?: string;
    senderId?: string;
    senderName?: string;
    senderAvatar?: string;
    recipientId?: string;
    recipientName?: string;
    recipientAvatar?: string;
    gigTitle?: string;
    lastMessage?: string;
    lastMessageTimestamp?: any;
    updatedAt?: any;
    [key: string]: any;
  };
  const [conversations, setConversations] = useState<FirestoreConversation[]>([]);
  const [messages, setMessages] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  // Delete menu states
  const [showMessageDeleteMenu, setShowMessageDeleteMenu] = useState<string | null>(null);
  const [showConversationDeleteMenu, setShowConversationDeleteMenu] = useState<string | null>(null);
  const [longPressTimer, setLongPressTimer] = useState<NodeJS.Timeout | null>(null);
  // --- Long Press Handlers for Messages ---
  const handleMessageMouseDown = (messageId: string) => {
    const timer = setTimeout(() => {
      if (showMessageDeleteMenu === messageId) {
        setShowMessageDeleteMenu(null);
      } else {
        setShowMessageDeleteMenu(messageId);
      }
    }, 500); // 500ms long press
    setLongPressTimer(timer);
  };

  const handleMessageMouseUp = () => {
    if (longPressTimer) {
      clearTimeout(longPressTimer);
      setLongPressTimer(null);
    }
  };

  const handleMessageContextMenu = (e: React.MouseEvent, messageId: string) => {
    e.preventDefault();
    if (showMessageDeleteMenu === messageId) {
      setShowMessageDeleteMenu(null);
    } else {
      setShowMessageDeleteMenu(messageId);
    }
  };

  // --- Long Press Handlers for Conversations ---
  const handleConversationMouseDown = (conversationId: string) => {
    const timer = setTimeout(() => {
      if (showConversationDeleteMenu === conversationId) {
        setShowConversationDeleteMenu(null);
      } else {
        setShowConversationDeleteMenu(conversationId);
      }
    }, 500); // 500ms long press
    setLongPressTimer(timer);
  };

  const handleConversationMouseUp = () => {
    if (longPressTimer) {
      clearTimeout(longPressTimer);
      setLongPressTimer(null);
    }
  };

  const handleConversationContextMenu = (e: React.MouseEvent, conversationId: string) => {
    e.preventDefault();
    if (showConversationDeleteMenu === conversationId) {
      setShowConversationDeleteMenu(null);
    } else {
      setShowConversationDeleteMenu(conversationId);
    }
  };

  // --- Delete Handlers ---
  const handleDeleteMessage = (messageId: string) => {
    // Remove message from UI only (for demo)
    setMessages((prev) => prev.filter((msg) => msg.id !== messageId));
    // TODO: Remove from Firestore if needed
  };

  const handleDeleteConversation = async (conversationId: string) => {
    setConversations((prev) => prev.filter((conv) => conv.id !== conversationId));
    // TODO: Remove from Firestore if needed
    if (selectedConversation === conversationId) {
      setSelectedConversation(null);
    }
  };

  // Handle navigation state to select conversation
  useEffect(() => {
    if (location.state?.recipientId && conversations.length > 0) {
      const recipientId = location.state.recipientId;
      
      // Find existing conversation with this recipient
      const existingConversation = conversations.find(conv => 
        conv.otherUserId === recipientId
      );
      
      if (existingConversation) {
        setSelectedConversation(existingConversation.id);
        console.log('Found existing conversation:', existingConversation.id);
      } else {
        console.log('No existing conversation found with recipient:', recipientId);
      }
    }
  }, [location.state, conversations]);

  // Load conversations from Firebase
  useEffect(() => {
    if (!currentUser) return;

    const loadConversations = async () => {
      try {
        // Get all conversations where current user is involved
        const conversationsRef = collection(db, 'conversations');
        const q1 = query(conversationsRef, where('senderId', '==', currentUser.uid));
        const q2 = query(conversationsRef, where('recipientId', '==', currentUser.uid));
        
        const [senderConversations, recipientConversations] = await Promise.all([
          getDocs(q1),
          getDocs(q2)
        ]);
        
        const allConversations: FirestoreConversation[] = [...senderConversations.docs, ...recipientConversations.docs]
          .map(doc => {
            const data = doc.data() as FirestoreConversation;
            return { ...data, id: doc.id };
          })
          .filter((conv, index, self) => 
            conv.conversationId
              ? index === self.findIndex(c => c.conversationId === conv.conversationId)
              : index === self.findIndex(c => c.id === conv.id)
          );
        
        // Fetch user profile pictures for all conversations
        const conversationList = await Promise.all(allConversations.map(async (conv) => {
          const isUserSender = conv.senderId === currentUser.uid;
          const otherUserName = isUserSender ? conv.recipientName : conv.senderName;
          const otherUserId = isUserSender ? conv.recipientId : conv.senderId;

          // Fetch user profile from Firebase users collection
          let otherUserAvatar = isUserSender ? conv.recipientAvatar : conv.senderAvatar;
          try {
            if (otherUserId) {
              const userDoc = await getDoc(doc(db, 'users', otherUserId));
              if (userDoc.exists()) {
                const userData = userDoc.data();
                otherUserAvatar = userData.profilePictureUrl || userData.photoURL || otherUserAvatar;
              }
            }
          } catch (error) {
            console.log('Could not fetch user profile for:', otherUserId);
          }

          return {
            id: conv.conversationId || conv.id,
            freelancer: {
              name: otherUserName || 'Unknown',
              avatar: otherUserAvatar || '/api/placeholder/40/40',
              status: 'online'
            },
            project: conv.gigTitle || 'General Discussion',
            lastMessage: conv.lastMessage || 'No messages yet',
            timestamp: formatTimestamp(conv.lastMessageTimestamp?.toDate ? conv.lastMessageTimestamp?.toDate() : conv.updatedAt?.toDate ? conv.updatedAt?.toDate() : undefined),
            unread: 0,
            isActive: true,
            otherUserId,
            conversationData: conv
          };
        }));
        
        setConversations(conversationList.sort((a, b) => {
          const aTime = a.conversationData.lastMessageTimestamp?.toDate ? a.conversationData.lastMessageTimestamp?.toDate() : a.conversationData.updatedAt?.toDate ? a.conversationData.updatedAt?.toDate() : new Date(0);
          const bTime = b.conversationData.lastMessageTimestamp?.toDate ? b.conversationData.lastMessageTimestamp?.toDate() : b.conversationData.updatedAt?.toDate ? b.conversationData.updatedAt?.toDate() : new Date(0);
          return bTime.getTime() - aTime.getTime();
        }));
        setIsLoading(false);
      } catch (error) {
        console.error('Error loading conversations:', error);
        setIsLoading(false);
      }
    };

    loadConversations();
    
    // Also reload when page becomes visible to get fresh profile pictures
    const handleVisibilityChange = () => {
      if (document.visibilityState === 'visible') {
        loadConversations();
      }
    };
    
    document.addEventListener('visibilitychange', handleVisibilityChange);
    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, [currentUser]);

  // Load messages for selected conversation
  useEffect(() => {
    if (!selectedConversation || !currentUser) return;

    // Find the actual document ID for this conversation
    const selectedConvData = conversations.find(conv => conv.id === selectedConversation);
    const documentId = selectedConvData?.conversationData?.id || selectedConversation;
    
    const conversationRef = doc(db, 'conversations', documentId);

    const unsubscribe = onSnapshot(conversationRef, (docSnap) => {
      if (docSnap.exists()) {
        const data = docSnap.data();
        const allMessages: any[] = [];
        
        // Combine sender and receiver messages
        if (data.senderMessages) {
          data.senderMessages.forEach((msg: any, index: number) => {
            allMessages.push({
              id: `sender_${index}`,
              sender: data.senderId === currentUser.uid ? 'You' : data.senderName,
              content: msg.message,
              timestamp: formatTime(msg.timestamp?.toDate() || new Date(msg.timestamp)),
              isOwn: data.senderId === currentUser.uid,
              type: 'text',
              rawTimestamp: msg.timestamp?.toDate() || new Date(msg.timestamp)
            });
          });
        }
        
        if (data.receiverMessages) {
          data.receiverMessages.forEach((msg: any, index: number) => {
            allMessages.push({
              id: `receiver_${index}`,
              sender: data.recipientId === currentUser.uid ? 'You' : data.recipientName,
              content: msg.message,
              timestamp: formatTime(msg.timestamp?.toDate() || new Date(msg.timestamp)),
              isOwn: data.recipientId === currentUser.uid,
              type: 'text',
              rawTimestamp: msg.timestamp?.toDate() || new Date(msg.timestamp)
            });
          });
        }
        
        // Sort all messages by timestamp
        allMessages.sort((a, b) => {
          return a.rawTimestamp.getTime() - b.rawTimestamp.getTime();
        });
        
        setMessages(allMessages);
      } else {
        setMessages([]);
      }
    }, (error) => {
      console.error('Error loading messages:', error);
    });

    return () => unsubscribe();
  }, [selectedConversation, currentUser]);

  const formatTimestamp = (timestamp: any) => {
    if (!timestamp) return 'now';
    const date = timestamp instanceof Date ? timestamp : new Date(timestamp);
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    const minutes = Math.floor(diff / 60000);
    const hours = Math.floor(diff / 3600000);
    const days = Math.floor(diff / 86400000);
    
    if (minutes < 1) return 'now';
    if (minutes < 60) return `${minutes} min ago`;
    if (hours < 24) return `${hours} hour${hours > 1 ? 's' : ''} ago`;
    return `${days} day${days > 1 ? 's' : ''} ago`;
  };

  const formatTime = (timestamp: any) => {
    if (!timestamp) return '';
    const date = timestamp instanceof Date ? timestamp : new Date(timestamp);
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  const handleSendMessage = async () => {
    if (!messageText.trim() || !currentUser || !selectedConversation) return;

    try {
      const selectedConv = conversations.find(conv => conv.id === selectedConversation);
      if (!selectedConv) return;

      // Use the actual document ID from Firebase
      const documentId = selectedConv.conversationData?.id || selectedConversation;
      const conversationRef = doc(db, 'conversations', documentId);
      const conversationSnap = await getDoc(conversationRef);
      
      const newMessage = {
        message: messageText.trim(),
        timestamp: new Date(),
        isRead: false
      };
      
      if (conversationSnap.exists()) {
        const data = conversationSnap.data();
        const isSender = currentUser.uid === data.senderId;
        
        // Fetch fresh profile pictures for both users
        let senderAvatar = data.senderAvatar || '';
        let recipientAvatar = data.recipientAvatar || '';
        
        try {
          const senderDoc = await getDoc(doc(db, 'users', data.senderId));
          if (senderDoc.exists()) {
            const senderData = senderDoc.data();
            senderAvatar = senderData.profilePictureUrl || senderData.photoURL || senderAvatar;
          }
        } catch (error) {
          console.log('Could not fetch sender profile');
        }
        
        try {
          const recipientDoc = await getDoc(doc(db, 'users', data.recipientId));
          if (recipientDoc.exists()) {
            const recipientData = recipientDoc.data();
            recipientAvatar = recipientData.profilePictureUrl || recipientData.photoURL || recipientAvatar;
          }
        } catch (error) {
          console.log('Could not fetch recipient profile');
        }
        
        if (isSender) {
          // Add to sender messages
          await updateDoc(conversationRef, {
            senderMessages: arrayUnion(newMessage),
            senderAvatar: senderAvatar,
            recipientAvatar: recipientAvatar,
            lastMessage: messageText.trim(),
            lastMessageTimestamp: new Date(),
            updatedAt: new Date()
          });
        } else {
          // Add to receiver messages
          await updateDoc(conversationRef, {
            receiverMessages: arrayUnion(newMessage),
            senderAvatar: senderAvatar,
            recipientAvatar: recipientAvatar,
            lastMessage: messageText.trim(),
            lastMessageTimestamp: new Date(),
            updatedAt: new Date()
          });
        }
      }
      
      setMessageText('');
      
    } catch (error) {
      console.error('Error sending message:', error);
      alert('Failed to send message. Please try again.');
    }
  };



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

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#ffeee3] flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#FF6B00] mx-auto mb-4"></div>
          <p className="text-[#2E2E2E]/60">Loading conversations...</p>
        </div>
      </div>
    );
  }

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
                  <div className="flex-1 overflow-y-auto" onClick={() => setShowConversationDeleteMenu(null)}>
                    {conversations.length === 0 ? (
                      <div className="p-4 text-center text-[#2E2E2E]/60">
                        <p>No conversations yet</p>
                      </div>
                    ) : (
                      filteredConversations.map((conversation) => (
                      <div
                        key={conversation.id}
                        className="relative"
                        onMouseDown={() => handleConversationMouseDown(conversation.id)}
                        onMouseUp={handleConversationMouseUp}
                        onMouseLeave={handleConversationMouseUp}
                        onTouchStart={() => handleConversationMouseDown(conversation.id)}
                        onTouchEnd={handleConversationMouseUp}
                        onContextMenu={(e) => handleConversationContextMenu(e, conversation.id)}
                      >
                        <div
                          onClick={() => setSelectedConversation(conversation.id)}
                          className={`p-4 border-b border-[#ffeee3] cursor-pointer hover:bg-[#ffeee3]/30 transition-colors ${
                            selectedConversation === conversation.id ? 'bg-[#ffeee3]/50' : ''
                          }`}
                        >
                          {/* Delete button */}
                          {showConversationDeleteMenu === conversation.id && (
                            <div className="absolute right-2 top-1/2 transform -translate-y-1/2 z-10">
                              <button
                                onClick={(e) => {
                                  e.stopPropagation();
                                  handleDeleteConversation(conversation.id);
                                  setShowConversationDeleteMenu(null);
                                }}
                                className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded-lg shadow-lg flex items-center space-x-1 text-sm"
                              >
                                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                                  <path fillRule="evenodd" d="M9 2a1 1 0 00-2 0v1H4a1 1 0 000 2h1v10a2 2 0 002 2h6a2 2 0 002-2V5h1a1 1 0 100-2h-3V2a1 1 0 00-2 0H9zM7 5h6v10H7V5zm2 2a1 1 0 012 0v6a1 1 0 11-2 0V7z" clipRule="evenodd" />
                                </svg>
                                <span>Delete</span>
                              </button>
                            </div>
                          )}
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
                      </div>
                    ))
                    )}
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
                      <div className="flex-1 overflow-y-auto p-4 space-y-4" onClick={() => setShowMessageDeleteMenu(null)}>
                        {messages.map((message) => (
                          <div
                            key={message.id}
                            className={`flex ${message.isOwn ? 'justify-end' : 'justify-start'} relative group`}
                            onMouseDown={() => handleMessageMouseDown(message.id)}
                            onMouseUp={handleMessageMouseUp}
                            onMouseLeave={handleMessageMouseUp}
                            onTouchStart={() => handleMessageMouseDown(message.id)}
                            onTouchEnd={handleMessageMouseUp}
                            onContextMenu={(e) => handleMessageContextMenu(e, message.id)}
                          >
                            {/* Delete button */}
                            {showMessageDeleteMenu === message.id && (
                              <div className={`absolute top-0 ${message.isOwn ? 'left-0' : 'right-0'} z-10`}>
                                <button
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    handleDeleteMessage(message.id);
                                    setShowMessageDeleteMenu(null);
                                  }}
                                  className="bg-red-500 hover:bg-red-600 text-white px-2 py-1 rounded-lg shadow-lg text-xs flex items-center space-x-1"
                                >
                                  <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                                    <path fillRule="evenodd" d="M9 2a1 1 0 00-2 0v1H4a1 1 0 000 2h1v10a2 2 0 002 2h6a2 2 0 002-2V5h1a1 1 0 100-2h-3V2a1 1 0 00-2 0H9zM7 5h6v10H7V5zm2 2a1 1 0 012 0v6a1 1 0 11-2 0V7z" clipRule="evenodd" />
                                  </svg>
                                  <span>Delete</span>
                                </button>
                              </div>
                            )}
                            <div 
                              className={`max-w-[70%] ${message.isOwn ? 'order-2' : 'order-1'}`}
                            >
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
                              onKeyPress={(e) => {
                                if (e.key === 'Enter' && !e.shiftKey) {
                                  e.preventDefault();
                                  handleSendMessage();
                                }
                              }}
                              placeholder="Type your message..."
                              className="w-full px-4 py-3 border border-[#ffeee3] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF6B00] focus:border-transparent resize-none"
                              rows={2}
                            />
                          </div>
                          <button
                            onClick={handleSendMessage}
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
