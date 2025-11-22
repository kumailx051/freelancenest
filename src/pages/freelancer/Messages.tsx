import React, { useState, useEffect } from 'react';
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
import { useAuth } from '../../contexts/AuthContext';

import { collection, query, where, onSnapshot, serverTimestamp, getDocs, doc, getDoc, setDoc, updateDoc, arrayUnion } from 'firebase/firestore';
import { db } from '../../lib/firebase';

const Messages: React.FC = () => {
  const { currentUser } = useAuth();
  const [selectedChat, setSelectedChat] = useState<string | null>(null);
  const [messageText, setMessageText] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [conversations, setConversations] = useState<any[]>([]);
  const [messages, setMessages] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

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
        
        const allConversations = [...senderConversations.docs, ...recipientConversations.docs]
          .map(doc => ({ id: doc.id, ...doc.data() }));
        
        // Fetch user profile pictures for all conversations
        const conversationList = await Promise.all(allConversations.map(async (conv) => {
          const isUserSender = conv.senderId === currentUser.uid;
          const otherUserName = isUserSender ? conv.recipientName : conv.senderName;
          const otherUserId = isUserSender ? conv.recipientId : conv.senderId;
          
          // Get avatar from conversation first, then try to fetch fresh one
          let otherUserAvatar = isUserSender ? conv.recipientAvatar : conv.senderAvatar;
          console.log('Avatar from conversation document:', otherUserAvatar);
          
          // Debug logging
          console.log('Conversation data:', conv);
          console.log('Is user sender:', isUserSender);
          console.log('Other user ID:', otherUserId);
          console.log('Other user name:', otherUserName);
          console.log('Initial avatar from conversation:', otherUserAvatar);
          
          // Always fetch fresh profile picture from users collection
          try {
            console.log('Fetching user document for ID:', otherUserId);
            const userDoc = await getDoc(doc(db, 'users', otherUserId));
            if (userDoc.exists()) {
              const userData = userDoc.data();
              console.log('Found user document, data:', userData);
              console.log('profilePictureUrl:', userData.profilePictureUrl);
              console.log('photoURL:', userData.photoURL);
              
              // Check nested profile.profilePictureUrl first
              if (userData.profile?.profilePictureUrl && userData.profile.profilePictureUrl.trim() !== '') {
                otherUserAvatar = userData.profile.profilePictureUrl;
                console.log('✓ Using profile.profilePictureUrl:', otherUserAvatar);
              } else if (userData.profilePictureUrl && userData.profilePictureUrl.trim() !== '') {
                otherUserAvatar = userData.profilePictureUrl;
                console.log('✓ Using direct profilePictureUrl:', otherUserAvatar);
              } else if (userData.photoURL && userData.photoURL.trim() !== '') {
                otherUserAvatar = userData.photoURL;
                console.log('✓ Using photoURL:', otherUserAvatar);
              } else {
                console.log('✗ No profile picture found in user data, available fields:', Object.keys(userData));
                console.log('Profile object:', userData.profile);
              }
            } else {
              console.log('✗ User document does not exist for:', otherUserId);
              // Try checking if the user ID is correct
              console.log('Available user documents might be different. Check Firebase console.');
            }
          } catch (error) {
            console.log('✗ Error fetching user profile for:', otherUserId, error);
          }
          
          // Final fallback logic
          if (!otherUserAvatar || otherUserAvatar === '') {
            // Try using the stored avatar from conversation as last resort
            const conversationStoredAvatar = isUserSender ? conv.recipientAvatar : conv.senderAvatar;
            if (conversationStoredAvatar && conversationStoredAvatar !== '') {
              otherUserAvatar = conversationStoredAvatar;
              console.log('✓ Using conversation stored avatar:', otherUserAvatar);
            } else {
              otherUserAvatar = '/api/placeholder/50/50';
              console.log('✗ Using placeholder avatar');
            }
          }
          
          console.log('Final avatar URL for', otherUserName, ':', otherUserAvatar);
          console.log('---');
          
          return {
            id: conv.conversationId,
            client: {
              name: otherUserName,
              avatar: otherUserAvatar,
              online: false,
              company: 'Client'
            },
            project: conv.gigTitle || 'General Discussion',
            lastMessage: conv.lastMessage || 'No messages yet',
            timestamp: formatTimestamp(conv.lastMessageTimestamp?.toDate() || conv.updatedAt?.toDate()),
            unread: 0,
            status: 'active',
            lastSeen: 'recently',
            otherUserId,
            conversationData: conv
          };
        }));
        
        setConversations(conversationList.sort((a, b) => {
          const aTime = a.conversationData.lastMessageTimestamp?.toDate() || a.conversationData.updatedAt?.toDate() || new Date(0);
          const bTime = b.conversationData.lastMessageTimestamp?.toDate() || b.conversationData.updatedAt?.toDate() || new Date(0);
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

  // Force refresh conversations every 30 seconds to get latest profile pictures
  useEffect(() => {
    if (!currentUser) return;

    const interval = setInterval(async () => {
      try {
        const conversationsRef = collection(db, 'conversations');
        const q1 = query(conversationsRef, where('senderId', '==', currentUser.uid));
        const q2 = query(conversationsRef, where('recipientId', '==', currentUser.uid));
        
        const [senderConversations, recipientConversations] = await Promise.all([
          getDocs(q1),
          getDocs(q2)
        ]);
        
        const allConversations = [...senderConversations.docs, ...recipientConversations.docs]
          .map(doc => ({ id: doc.id, ...doc.data() }));
        
        // Fetch user profile pictures for all conversations
        const conversationList = await Promise.all(allConversations.map(async (conv) => {
          const isUserSender = conv.senderId === currentUser.uid;
          const otherUserName = isUserSender ? conv.recipientName : conv.senderName;
          const otherUserId = isUserSender ? conv.recipientId : conv.senderId;
          
          // Always fetch fresh profile picture
          let otherUserAvatar = '/api/placeholder/50/50';
          try {
            const userDoc = await getDoc(doc(db, 'users', otherUserId));
            if (userDoc.exists()) {
              const userData = userDoc.data();
              // Check nested profile.profilePictureUrl first
              if (userData.profile?.profilePictureUrl && userData.profile.profilePictureUrl.trim() !== '') {
                otherUserAvatar = userData.profile.profilePictureUrl;
              } else if (userData.profilePictureUrl && userData.profilePictureUrl.trim() !== '') {
                otherUserAvatar = userData.profilePictureUrl;
              } else if (userData.photoURL && userData.photoURL.trim() !== '') {
                otherUserAvatar = userData.photoURL;
              }
            }
          } catch (error) {
            console.log('Could not fetch user profile for:', otherUserId);
          }
          
          return {
            id: conv.conversationId,
            client: {
              name: otherUserName,
              avatar: otherUserAvatar,
              online: false,
              company: 'Client'
            },
            project: conv.gigTitle || 'General Discussion',
            lastMessage: conv.lastMessage || 'No messages yet',
            timestamp: formatTimestamp(conv.lastMessageTimestamp?.toDate() || conv.updatedAt?.toDate()),
            unread: 0,
            status: 'active',
            lastSeen: 'recently',
            otherUserId,
            conversationData: conv
          };
        }));
        
        setConversations(conversationList.sort((a, b) => {
          const aTime = a.conversationData.lastMessageTimestamp?.toDate() || a.conversationData.updatedAt?.toDate() || new Date(0);
          const bTime = b.conversationData.lastMessageTimestamp?.toDate() || b.conversationData.updatedAt?.toDate() || new Date(0);
          return bTime.getTime() - aTime.getTime();
        }));
      } catch (error) {
        console.error('Error refreshing conversations:', error);
      }
    }, 30000); // Refresh every 30 seconds

    return () => clearInterval(interval);
  }, [currentUser]);

  // Load messages for selected conversation
  useEffect(() => {
    if (!selectedChat || !currentUser) return;

    const conversationRef = doc(db, 'conversations', selectedChat);

    const unsubscribe = onSnapshot(conversationRef, (docSnap) => {
      if (docSnap.exists()) {
        const data = docSnap.data();
        const allMessages: any[] = [];
        
        // Combine sender and receiver messages
        if (data.senderMessages) {
          data.senderMessages.forEach((msg: any, index: number) => {
            allMessages.push({
              id: `sender_${index}`,
              sender: data.senderId === currentUser.uid ? 'freelancer' : 'client',
              content: msg.message,
              timestamp: formatTime(msg.timestamp?.toDate() || new Date(msg.timestamp)),
              status: 'read',
              type: 'text',
              rawTimestamp: msg.timestamp?.toDate() || new Date(msg.timestamp)
            });
          });
        }
        
        if (data.receiverMessages) {
          data.receiverMessages.forEach((msg: any, index: number) => {
            allMessages.push({
              id: `receiver_${index}`,
              sender: data.recipientId === currentUser.uid ? 'freelancer' : 'client',
              content: msg.message,
              timestamp: formatTime(msg.timestamp?.toDate() || new Date(msg.timestamp)),
              status: 'read',
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
  }, [selectedChat, currentUser]);

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

  const staticConversations = [
  ];



  const filteredConversations = conversations.filter(conv =>
    conv.client.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    conv.project.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const selectedConversation = conversations.find(conv => conv.id === selectedChat);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#ffeee3]/30 pt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden h-[800px] flex items-center justify-center">
            <div className="text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#FF6B00] mx-auto mb-4"></div>
              <p className="text-[#2E2E2E]/60">Loading conversations...</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  const handleSendMessage = async () => {
    if (!messageText.trim() || !currentUser || !selectedChat) return;

    try {
      const selectedConversation = conversations.find(conv => conv.id === selectedChat);
      if (!selectedConversation) return;

      const conversationRef = doc(db, 'conversations', selectedChat);
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
                {conversations.length === 0 ? (
                  <div className="p-4 text-center text-[#2E2E2E]/60">
                    <p>No conversations yet</p>
                  </div>
                ) : (
                  filteredConversations.map((conversation) => (
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
                ))
                )}
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
