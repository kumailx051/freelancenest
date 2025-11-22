import React, { createContext, useContext, useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { 
  collection, 
  addDoc, 
  query, 
  where, 
  orderBy, 
  onSnapshot, 
  serverTimestamp,
  doc,
  updateDoc,
  getDocs,
  writeBatch
} from 'firebase/firestore';
import { db } from '../lib/firebase';

interface Message {
  id: string;
  senderId: string;
  senderName: string;
  senderAvatar: string;
  recipientId: string;
  recipientName: string;
  recipientAvatar: string;
  message: string;
  timestamp: any;
  isRead: boolean;
  gigId?: string;
  gigTitle?: string;
  userType: 'client' | 'freelancer';
}

interface SendMessageData {
  senderId: string;
  senderName: string;
  senderAvatar: string;
  recipientId: string;
  recipientName: string;
  recipientAvatar: string;
  message: string;
  gigId?: string;
  gigTitle?: string;
  userType: 'client' | 'freelancer';
}

interface Conversation {
  id: string;
  participants: string[];
  participantNames: { [key: string]: string };
  participantAvatars: { [key: string]: string };
  lastMessage: string;
  lastMessageTime: any;
  lastMessageSender: string;
  unreadCount: { [key: string]: number };
  gigId?: string;
  gigTitle?: string;
}

interface MessageContextType {
  messages: Message[];
  conversations: Conversation[];
  isLoading: boolean;
  unreadMessageCount: number;
  sendMessage: (data: SendMessageData) => Promise<void>;
  loadMessages: (userId: string, recipientId: string) => void;
  loadConversations: () => void;
  markMessagesAsRead: (userId: string, recipientId: string) => Promise<void>;
  getUnreadCount: (conversationId: string) => number;
  showNotification: (title: string, body: string) => void;
  requestNotificationPermission: () => Promise<boolean>;
}

const MessageContext = createContext<MessageContextType | undefined>(undefined);

export const useMessages = () => {
  const context = useContext(MessageContext);
  if (!context) {
    throw new Error('useMessages must be used within a MessageProvider');
  }
  return context;
};

export const MessageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { currentUser } = useAuth();
  const [messages, setMessages] = useState<Message[]>([]);
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [unreadMessageCount, setUnreadMessageCount] = useState(0);
  const [lastNotificationTime, setLastNotificationTime] = useState<Date>(new Date());
  const [hasRequestedNotificationPermission, setHasRequestedNotificationPermission] = useState(false);

  // Show browser notification
  const showNotification = (title: string, body: string) => {
    if ('Notification' in window && Notification.permission === 'granted') {
      new Notification(title, {
        body,
        icon: '/favicon.ico',
        badge: '/favicon.ico',
        tag: 'message-notification'
      });
    }
  };

  // Request notification permission
  const requestNotificationPermission = async () => {
    if ('Notification' in window && Notification.permission === 'default') {
      const permission = await Notification.requestPermission();
      setHasRequestedNotificationPermission(true);
      return permission === 'granted';
    }
    return Notification.permission === 'granted';
  };

  // Request notification permission on first load
  useEffect(() => {
    if (!hasRequestedNotificationPermission && currentUser) {
      requestNotificationPermission();
    }
  }, [currentUser, hasRequestedNotificationPermission]);

  // Load conversations for current user
  const loadConversations = () => {
    if (!currentUser) return;

    // Query conversations where user is either sender or recipient
    const conversationsRef = collection(db, 'conversations');
    const q1 = query(conversationsRef, where('senderId', '==', currentUser.uid));
    const q2 = query(conversationsRef, where('recipientId', '==', currentUser.uid));

    // Listen to both queries
    const unsubscribe1 = onSnapshot(q1, handleConversationsUpdate);
    const unsubscribe2 = onSnapshot(q2, handleConversationsUpdate);

    function handleConversationsUpdate() {
      Promise.all([
        getDocs(q1),
        getDocs(q2)
      ]).then(([senderSnapshot, recipientSnapshot]) => {
        const conversations = [...senderSnapshot.docs, ...recipientSnapshot.docs]
          .map(doc => ({ id: doc.id, ...doc.data() } as any))
          .filter((conv, index, self) => 
            // Remove duplicates based on conversationId
            index === self.findIndex((c: any) => c.conversationId === conv.conversationId)
          );

        const conversationData: Conversation[] = conversations.map((conv: any) => {
          const isUserSender = conv.senderId === currentUser?.uid;
          
          // Calculate unread count from the conversation data
          const unreadCount = conv.unreadCount?.[currentUser?.uid || ''] || 0;

          return {
            id: conv.conversationId || conv.id,
            participants: [conv.senderId, conv.recipientId],
            participantNames: {
              [conv.senderId]: conv.senderName,
              [conv.recipientId]: conv.recipientName
            },
            participantAvatars: {
              [conv.senderId]: conv.senderAvatar,
              [conv.recipientId]: conv.recipientAvatar
            },
            lastMessage: conv.lastMessage || 'No messages yet',
            lastMessageTime: conv.lastMessageTimestamp || conv.updatedAt,
            lastMessageSender: conv.lastMessageSender || conv.senderId,
            unreadCount: {
              [currentUser?.uid || '']: unreadCount
            },
            gigId: conv.gigId,
            gigTitle: conv.gigTitle
          };
        });

        // Sort by last message time
        conversationData.sort((a, b) => {
          const aTime = a.lastMessageTime?.toDate() || new Date(0);
          const bTime = b.lastMessageTime?.toDate() || new Date(0);
          return bTime.getTime() - aTime.getTime();
        });

        // Check for new messages and show notifications
        const previousUnreadCount = unreadMessageCount;
        const currentTotalUnread = conversationData.reduce((total, conv) => {
          return total + (conv.unreadCount[currentUser!.uid] || 0);
        }, 0);

        // Show notification if unread count increased (new message received)
        if (currentTotalUnread > previousUnreadCount && previousUnreadCount > 0) {
          const newMessages = conversationData.filter(conv => 
            (conv.unreadCount[currentUser!.uid] || 0) > 0 && 
            conv.lastMessageSender !== currentUser!.uid
          );
          
          if (newMessages.length > 0) {
            const latestMessage = newMessages[0];
            const senderName = latestMessage.participantNames[latestMessage.lastMessageSender || ''] || 'Someone';
            showNotification(
              `New message from ${senderName}`,
              latestMessage.lastMessage || 'You have a new message'
            );
            setLastNotificationTime(new Date());
          }
        }

        setConversations(conversationData);
        setUnreadMessageCount(currentTotalUnread);
      });
    }

    // Initial load
    handleConversationsUpdate();

    return () => {
      unsubscribe1();
      unsubscribe2();
    };
  };

  // Load messages for specific conversation
  const loadMessages = (userId: string, recipientId: string) => {
    setIsLoading(true);

    const messagesRef = collection(db, 'messages');
    const q = query(
      messagesRef,
      where('participants', 'array-contains-any', [
        `${userId}_${recipientId}`,
        `${recipientId}_${userId}`
      ]),
      orderBy('timestamp', 'asc')
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const messageData: Message[] = [];
      snapshot.forEach((doc) => {
        const data = doc.data();
        if (
          (data.senderId === userId && data.recipientId === recipientId) ||
          (data.senderId === recipientId && data.recipientId === userId)
        ) {
          messageData.push({
            id: doc.id,
            ...data
          } as Message);
        }
      });
      setMessages(messageData);
      setIsLoading(false);
    });

    return unsubscribe;
  };

  // Send a new message
  const sendMessage = async (data: SendMessageData) => {
    if (!currentUser) throw new Error('User not authenticated');
    
    try {
      // Add message to messages collection
      const messageData = {
        ...data,
        timestamp: serverTimestamp(),
        isRead: false,
        participants: [`${data.senderId}_${data.recipientId}`, `${data.recipientId}_${data.senderId}`]
      };

      await addDoc(collection(db, 'messages'), messageData);

      // Update or create conversation
      const conversationsRef = collection(db, 'conversations');
      const conversationQuery = query(
        conversationsRef,
        where('participants', 'array-contains-any', [data.senderId, data.recipientId])
      );

      const conversationSnapshot = await getDocs(conversationQuery);
      const existingConversation = conversationSnapshot.docs.find(doc => {
        const participants = doc.data().participants;
        return participants.includes(data.senderId) && participants.includes(data.recipientId);
      });

      const conversationData = {
        participants: [data.senderId, data.recipientId],
        participantNames: {
          [data.senderId]: data.senderName,
          [data.recipientId]: data.recipientName
        },
        participantAvatars: {
          [data.senderId]: data.senderAvatar,
          [data.recipientId]: data.recipientAvatar
        },
        lastMessage: data.message,
        lastMessageTime: serverTimestamp(),
        lastMessageSender: data.senderId,
        unreadCount: {
          [data.senderId]: 0,
          [data.recipientId]: (existingConversation?.data().unreadCount?.[data.recipientId] || 0) + 1
        },
        gigId: data.gigId,
        gigTitle: data.gigTitle
      };

      if (existingConversation) {
        await updateDoc(doc(db, 'conversations', existingConversation.id), conversationData);
      } else {
        await addDoc(collection(db, 'conversations'), conversationData);
      }

      // Show notification to sender (they just sent a message)
      if (data.senderId === currentUser?.uid) {
        console.log('Message sent successfully');
      }

    } catch (error) {
      console.error('Error sending message:', error);
      throw error;
    }
  };

  // Mark messages as read
  const markMessagesAsRead = async (userId: string, recipientId: string) => {
    if (!currentUser) return;

    try {
      // Update conversation unread count
      const conversationsRef = collection(db, 'conversations');
      const conversationQuery = query(
        conversationsRef,
        where('participants', 'array-contains-any', [userId, recipientId])
      );

      const conversationSnapshot = await getDocs(conversationQuery);
      const conversation = conversationSnapshot.docs.find(doc => {
        const participants = doc.data().participants;
        return participants.includes(userId) && participants.includes(recipientId);
      });

      if (conversation) {
        const conversationData = conversation.data();
        const updatedUnreadCount = {
          ...conversationData.unreadCount,
          [userId]: 0
        };

        await updateDoc(doc(db, 'conversations', conversation.id), {
          unreadCount: updatedUnreadCount
        });
      }

      // Mark individual messages as read
      const messagesRef = collection(db, 'messages');
      const messagesQuery = query(
        messagesRef,
        where('recipientId', '==', userId),
        where('senderId', '==', recipientId),
        where('isRead', '==', false)
      );

      const messagesSnapshot = await getDocs(messagesQuery);
      const batch = writeBatch(db);

      messagesSnapshot.docs.forEach((messageDoc) => {
        batch.update(doc(db, 'messages', messageDoc.id), { isRead: true });
      });

      await batch.commit();

    } catch (error) {
      console.error('Error marking messages as read:', error);
    }
  };

  // Get unread count for specific conversation
  const getUnreadCount = (conversationId: string): number => {
    if (!currentUser) return 0;
    const conversation = conversations.find(conv => conv.id === conversationId);
    return conversation?.unreadCount[currentUser.uid] || 0;
  };

  // Load conversations when user changes
  useEffect(() => {
    if (currentUser) {
      const unsubscribe = loadConversations();
      return unsubscribe;
    } else {
      setConversations([]);
      setMessages([]);
      setUnreadMessageCount(0);
    }
  }, [currentUser]);

  const value: MessageContextType = {
    messages,
    conversations,
    isLoading,
    unreadMessageCount,
    sendMessage,
    loadMessages,
    loadConversations,
    markMessagesAsRead,
    getUnreadCount,
    showNotification,
    requestNotificationPermission
  };

  return (
    <MessageContext.Provider value={value}>
      {children}
    </MessageContext.Provider>
  );
};

export default MessageContext;