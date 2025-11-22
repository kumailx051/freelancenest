import React, { useState, useEffect, useRef } from 'react';
import { X, Send, Paperclip, Smile } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { onSnapshot, doc, getDoc, setDoc, updateDoc, arrayUnion } from 'firebase/firestore';
import { db } from '../lib/firebase';
import './MessageModal.css';

interface MessageModalProps {
  isOpen: boolean;
  onClose: () => void;
  recipientId: string;
  recipientName: string;
  recipientAvatar?: string;
  gigId?: string;
  gigTitle?: string;
}

const MessageModal: React.FC<MessageModalProps> = ({
  isOpen,
  onClose,
  recipientId,
  recipientName,
  recipientAvatar,
  gigId,
  gigTitle
}) => {
  const { currentUser } = useAuth();
  const [messageText, setMessageText] = useState('');
  const [isSending, setIsSending] = useState(false);
  const [messages, setMessages] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    if (!isOpen || !currentUser || !recipientId) return;

    setIsLoading(true);
    
    // Create conversation ID (consistent ordering)
    const conversationId = [currentUser.uid, recipientId].sort().join('_');
    
    // Listen to conversation document in real-time
    const conversationRef = doc(db, 'conversations', conversationId);

    const unsubscribe = onSnapshot(conversationRef, (docSnap) => {
      if (docSnap.exists()) {
        const data = docSnap.data();
        const allMessages: any[] = [];
        
        // Combine sender and receiver messages
        if (data.senderMessages) {
          data.senderMessages.forEach((msg: any, index: number) => {
            allMessages.push({
              id: `sender_${index}`,
              senderId: data.senderId,
              senderName: data.senderName,
              senderAvatar: data.senderAvatar,
              recipientId: data.recipientId,
              recipientName: data.recipientName,
              recipientAvatar: data.recipientAvatar,
              message: msg.message,
              timestamp: msg.timestamp?.toDate() || new Date(msg.timestamp),
              isRead: msg.isRead || false,
              gigId: data.gigId,
              gigTitle: data.gigTitle
            });
          });
        }
        
        if (data.receiverMessages) {
          data.receiverMessages.forEach((msg: any, index: number) => {
            allMessages.push({
              id: `receiver_${index}`,
              senderId: data.recipientId,
              senderName: data.recipientName,
              senderAvatar: data.recipientAvatar,
              recipientId: data.senderId,
              recipientName: data.senderName,
              recipientAvatar: data.senderAvatar,
              message: msg.message,
              timestamp: msg.timestamp?.toDate() || new Date(msg.timestamp),
              isRead: msg.isRead || false,
              gigId: data.gigId,
              gigTitle: data.gigTitle
            });
          });
        }
        
        // Sort all messages by timestamp
        allMessages.sort((a, b) => {
          return a.timestamp.getTime() - b.timestamp.getTime();
        });
        
        setMessages(allMessages);
      } else {
        setMessages([]);
      }
      setIsLoading(false);
      
      // Scroll to bottom when new messages arrive
      setTimeout(scrollToBottom, 100);
    }, (error) => {
      console.error('Error listening to conversation:', error);
      setIsLoading(false);
    });

    return () => unsubscribe();
  }, [isOpen, currentUser, recipientId]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleSendMessage = async () => {
    if (!messageText.trim() || !currentUser || isSending) return;

    try {
      setIsSending(true);
      
      // Create conversation ID (consistent ordering)
      const conversationId = [currentUser.uid, recipientId].sort().join('_');
      const conversationRef = doc(db, 'conversations', conversationId);
      
      // Check if conversation exists
      const conversationSnap = await getDoc(conversationRef);
      
      const newMessage = {
        message: messageText.trim(),
        timestamp: new Date(),
        isRead: false
      };
      
      if (conversationSnap.exists()) {
        // Update existing conversation
        const data = conversationSnap.data();
        const isSender = currentUser.uid === data.senderId;
        
        // Fetch fresh profile pictures for both users
        let senderAvatar = data.senderAvatar || '';
        let recipientAvatar = data.recipientAvatar || '';
        
        try {
          console.log('Updating conversation - fetching sender profile for:', data.senderId);
          const senderDoc = await getDoc(doc(db, 'users', data.senderId));
          if (senderDoc.exists()) {
            const senderData = senderDoc.data();
            // Check nested profile.profilePictureUrl first
            if (senderData.profile?.profilePictureUrl && senderData.profile.profilePictureUrl.trim() !== '') {
              senderAvatar = senderData.profile.profilePictureUrl;
              console.log('✓ Updated sender avatar from profile:', senderAvatar);
            } else if (senderData.profilePictureUrl && senderData.profilePictureUrl.trim() !== '') {
              senderAvatar = senderData.profilePictureUrl;
              console.log('✓ Updated sender avatar direct:', senderAvatar);
            } else if (senderData.photoURL && senderData.photoURL.trim() !== '') {
              senderAvatar = senderData.photoURL;
              console.log('✓ Updated sender avatar from photoURL:', senderAvatar);
            }
          }
        } catch (error) {
          console.log('Could not fetch sender profile:', error);
        }
        
        try {
          console.log('Updating conversation - fetching recipient profile for:', data.recipientId);
          const recipientDoc = await getDoc(doc(db, 'users', data.recipientId));
          if (recipientDoc.exists()) {
            const recipientData = recipientDoc.data();
            // Check nested profile.profilePictureUrl first for recipient
            if (recipientData.profile?.profilePictureUrl && recipientData.profile.profilePictureUrl.trim() !== '') {
              recipientAvatar = recipientData.profile.profilePictureUrl;
              console.log('✓ Updated recipient avatar from profile:', recipientAvatar);
            } else if (recipientData.profilePictureUrl && recipientData.profilePictureUrl.trim() !== '') {
              recipientAvatar = recipientData.profilePictureUrl;
              console.log('✓ Updated recipient avatar direct:', recipientAvatar);
            } else if (recipientData.photoURL && recipientData.photoURL.trim() !== '') {
              recipientAvatar = recipientData.photoURL;
              console.log('✓ Updated recipient avatar from photoURL:', recipientAvatar);
            }
          }
        } catch (error) {
          console.log('Could not fetch recipient profile:', error);
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
      } else {
        // Fetch current user profile picture from Firebase
        let senderAvatar = currentUser.photoURL || '';
        console.log('Initial sender avatar from currentUser:', senderAvatar);
        
        try {
          console.log('Fetching sender profile for user ID:', currentUser.uid);
          const senderDoc = await getDoc(doc(db, 'users', currentUser.uid));
          console.log('Sender document exists:', senderDoc.exists());
          
          if (senderDoc.exists()) {
            const senderData = senderDoc.data();
            console.log('Full sender user data:', JSON.stringify(senderData, null, 2));
            console.log('profilePictureUrl field:', senderData.profilePictureUrl);
            console.log('photoURL field:', senderData.photoURL);
            
            // Check nested profile.profilePictureUrl first, then direct fields
            if (senderData.profile?.profilePictureUrl && senderData.profile.profilePictureUrl.trim() !== '') {
              senderAvatar = senderData.profile.profilePictureUrl;
              console.log('✓ Using profile.profilePictureUrl:', senderAvatar);
            } else if (senderData.profilePictureUrl && senderData.profilePictureUrl.trim() !== '') {
              senderAvatar = senderData.profilePictureUrl;
              console.log('✓ Using direct profilePictureUrl:', senderAvatar);
            } else if (senderData.photoURL && senderData.photoURL.trim() !== '') {
              senderAvatar = senderData.photoURL;
              console.log('✓ Using photoURL:', senderAvatar);
            } else {
              console.log('✗ No valid profile picture found in user data');
              console.log('Available fields:', Object.keys(senderData));
              console.log('Profile object:', senderData.profile);
            }
          } else {
            console.log('✗ Sender user document does not exist for ID:', currentUser.uid);
          }
        } catch (error) {
          console.log('Error fetching sender profile:', error);
        }
        
        console.log('Final sender avatar before saving:', senderAvatar);
        
        // Ensure we don't save empty strings
        if (!senderAvatar || senderAvatar.trim() === '') {
          senderAvatar = currentUser.photoURL || 'https://via.placeholder.com/50';
          console.log('Using fallback sender avatar:', senderAvatar);
        }
        
        // Fetch recipient profile picture from Firebase
        let finalRecipientAvatar = recipientAvatar || '';
        try {
          console.log('Fetching recipient profile for user ID:', recipientId);
          const recipientDoc = await getDoc(doc(db, 'users', recipientId));
          if (recipientDoc.exists()) {
            const recipientData = recipientDoc.data();
            console.log('Recipient user data:', recipientData);
            // Check nested profile.profilePictureUrl first for recipient too
            if (recipientData.profile?.profilePictureUrl && recipientData.profile.profilePictureUrl.trim() !== '') {
              finalRecipientAvatar = recipientData.profile.profilePictureUrl;
              console.log('✓ Using recipient profile.profilePictureUrl:', finalRecipientAvatar);
            } else if (recipientData.profilePictureUrl && recipientData.profilePictureUrl.trim() !== '') {
              finalRecipientAvatar = recipientData.profilePictureUrl;
              console.log('✓ Using recipient direct profilePictureUrl:', finalRecipientAvatar);
            } else if (recipientData.photoURL && recipientData.photoURL.trim() !== '') {
              finalRecipientAvatar = recipientData.photoURL;
              console.log('✓ Using recipient photoURL:', finalRecipientAvatar);
            } else {
              console.log('✗ No profile picture found for recipient');
            }
          } else {
            console.log('✗ Recipient user document does not exist');
          }
        } catch (error) {
          console.log('Could not fetch recipient profile:', error);
        }
        
        // Ensure we don't save empty strings for recipient either
        if (!finalRecipientAvatar || finalRecipientAvatar.trim() === '') {
          finalRecipientAvatar = recipientAvatar || 'https://via.placeholder.com/50';
          console.log('Using fallback recipient avatar:', finalRecipientAvatar);
        }
        
        console.log('About to create conversation with:');
        console.log('- senderAvatar:', senderAvatar);
        console.log('- recipientAvatar:', finalRecipientAvatar);
        
        // Create new conversation
        const conversationData = {
          conversationId,
          senderId: currentUser.uid,
          senderName: currentUser.displayName || currentUser.email || 'User',
          senderAvatar,
          recipientId,
          recipientName,
          recipientAvatar: finalRecipientAvatar,
          gigId: gigId || null,
          gigTitle: gigTitle || null,
          senderMessages: [newMessage],
          receiverMessages: [],
          lastMessage: messageText.trim(),
          lastMessageTimestamp: new Date(),
          createdAt: new Date(),
          updatedAt: new Date()
        };
        
        console.log('Creating new conversation:', conversationData);
        await setDoc(conversationRef, conversationData);
      }
      
      setMessageText('');
      
    } catch (error: any) {
      console.error('Detailed error sending message:', error);
      console.error('Error code:', error?.code);
      console.error('Error message:', error?.message);
      alert(`Failed to send message: ${error?.message || 'Unknown error'}. Please try again.`);
    } finally {
      setIsSending(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const formatTime = (timestamp: any) => {
    if (!timestamp) return '';
    const date = timestamp instanceof Date ? timestamp : new Date(timestamp);
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  const formatDate = (timestamp: any) => {
    if (!timestamp) return '';
    const date = timestamp instanceof Date ? timestamp : new Date(timestamp);
    const today = new Date();
    const messageDate = new Date(date);
    
    if (messageDate.toDateString() === today.toDateString()) {
      return 'Today';
    } else if (messageDate.toDateString() === new Date(today.getTime() - 86400000).toDateString()) {
      return 'Yesterday';
    } else {
      return messageDate.toLocaleDateString();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="message-modal-overlay">
      <div className="message-modal">
        {/* Header */}
        <div className="message-modal-header">
          <div className="recipient-info">
            {recipientAvatar ? (
              <img src={recipientAvatar} alt={recipientName} className="recipient-avatar" />
            ) : (
              <div className="recipient-avatar-placeholder">
                {recipientName.charAt(0).toUpperCase()}
              </div>
            )}
            <div>
              <h3>{recipientName}</h3>
              {gigTitle && (
                <p className="gig-context">About: {gigTitle}</p>
              )}
            </div>
          </div>
          <button onClick={onClose} className="close-button">
            <X size={24} />
          </button>
        </div>

        {/* Messages */}
        <div className="messages-container">
          {isLoading ? (
            <div className="loading-messages">
              <div className="loading-spinner"></div>
              <span>Loading messages...</span>
            </div>
          ) : messages.length === 0 ? (
            <div className="no-messages">
              <Smile size={48} />
              <p>No messages yet. Start the conversation!</p>
              <p className="text-sm text-gray-500 mt-2">
                Send a message to {recipientName} about "{gigTitle}"
              </p>
            </div>
          ) : (
            <div className="messages-list">
              {messages.map((message, index) => {
                const isCurrentUser = message.senderId === currentUser?.uid;
                const showDate = index === 0 || 
                  formatDate(messages[index - 1]?.timestamp) !== formatDate(message.timestamp);

                return (
                  <div key={message.id}>
                    {showDate && (
                      <div className="date-separator">
                        <span>{formatDate(message.timestamp)}</span>
                      </div>
                    )}
                    <div className={`message ${isCurrentUser ? 'own-message' : 'other-message'}`}>
                      {!isCurrentUser && (
                        <div className="message-avatar">
                          {message.senderAvatar ? (
                            <img src={message.senderAvatar} alt={message.senderName} />
                          ) : (
                            <div className="avatar-placeholder">
                              {message.senderName.charAt(0).toUpperCase()}
                            </div>
                          )}
                        </div>
                      )}
                      <div className="message-content">
                        <div className="message-bubble">
                          <p>{message.message}</p>
                        </div>
                        <div className="message-time">
                          {formatTime(message.timestamp)}
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
              <div ref={messagesEndRef} />
            </div>
          )}
        </div>

        {/* Input */}
        <div className="message-input-container">
          <div className="message-input-wrapper">
            <textarea
              value={messageText}
              onChange={(e) => setMessageText(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder={`Message ${recipientName}...`}
              rows={1}
              disabled={isSending}
            />
            <div className="message-actions">
              <button className="attachment-button" disabled={isSending}>
                <Paperclip size={20} />
              </button>
              <button 
                onClick={handleSendMessage}
                disabled={!messageText.trim() || isSending}
                className="send-button"
              >
                <Send size={20} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MessageModal;