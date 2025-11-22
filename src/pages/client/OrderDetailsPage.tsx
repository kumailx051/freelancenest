import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { doc, getDoc, updateDoc, Timestamp, increment, collection, addDoc, query, where, getDocs } from 'firebase/firestore';
import { db } from '../../lib/firebase';
import { useAuth } from '../../contexts/AuthContext';
import Modal from '../../components/ui/Modal';
import { 
  Clock, 
  Package, 
  MessageCircle, 
  Star, 
  Calendar,
  Download,
  AlertCircle,
  CheckCircle,
  XCircle,
  FileText,
  User,
  CreditCard,
  ArrowLeft,
  Link as LinkIcon,
  X
} from 'lucide-react';

interface DeliveryFile {
  name: string;
  url: string;
  size: number;
  type: string;
  uploadedAt: any;
}

interface Order {
  id: string;
  orderNumber: string;
  gigId: string;
  gigTitle: string;
  sellerId: string;
  sellerName: string;
  packageType: string;
  packageTitle: string;
  price: number;
  serviceFee: number;
  totalAmount: number;
  status: 'pending' | 'in_progress' | 'delivered' | 'revision_requested' | 'completed' | 'cancelled';
  paymentStatus: 'paid' | 'pending' | 'failed' | 'refunded';
  paymentMethod: string;
  deliveryTime: string;
  revisions: string;
  requirements: string;
  createdAt: any;
  expectedDeliveryDate: any;
  conversationId: string;
  revisionCount: number;
  maxRevisions: number;
  features?: string[];
  source?: string;
  priority?: string;
  buyerId?: string;
  buyerEmail?: string;
  buyerName?: string;
  deliveryFiles?: DeliveryFile[];
  deliveryLinks?: string[];
  deliveryNote?: string;
  deliveredAt?: any;
  completedAt?: any;
}

const OrderDetailsPage: React.FC = () => {
  const { orderId } = useParams<{ orderId: string }>();
  const { currentUser } = useAuth();
  const navigate = useNavigate();
  const [order, setOrder] = useState<Order | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [revisionMessage, setRevisionMessage] = useState('');
  const [showReviewModal, setShowReviewModal] = useState(false);
  const [rating, setRating] = useState(0);
  const [hoveredRating, setHoveredRating] = useState(0);
  const [reviewText, setReviewText] = useState('');
  const [hasReviewed, setHasReviewed] = useState(false);
  const [modal, setModal] = useState<{
    isOpen: boolean;
    title: string;
    message: string;
    type: 'success' | 'error' | 'info' | 'warning';
    onConfirm?: () => void;
  }>({
    isOpen: false,
    title: '',
    message: '',
    type: 'info'
  });

  const showModal = (
    title: string, 
    message: string, 
    type: 'success' | 'error' | 'info' | 'warning' = 'info',
    onConfirm?: () => void
  ) => {
    setModal({ isOpen: true, title, message, type, onConfirm });
  };

  const closeModal = () => {
    setModal(prev => ({ ...prev, isOpen: false }));
  };

  useEffect(() => {
    const fetchOrder = async () => {
      if (!orderId || !currentUser) {
        setIsLoading(false);
        return;
      }

      try {
        const orderRef = doc(db, 'orders', orderId);
        const orderSnap = await getDoc(orderRef);

        if (orderSnap.exists()) {
          const orderData = { id: orderSnap.id, ...orderSnap.data() } as Order;
          
          // Verify this order belongs to the current user
          if (orderData.buyerId !== currentUser.uid) {
            setError('You do not have permission to view this order');
            setIsLoading(false);
            return;
          }

          setOrder(orderData);

          // Check if user has already reviewed this order
          const reviewsQuery = query(
            collection(db, 'reviews'),
            where('orderId', '==', orderId),
            where('clientId', '==', currentUser.uid)
          );
          const reviewsSnap = await getDocs(reviewsQuery);
          setHasReviewed(!reviewsSnap.empty);
        } else {
          setError('Order not found');
        }
      } catch (err) {
        console.error('Error fetching order:', err);
        setError('Failed to load order details');
      } finally {
        setIsLoading(false);
      }
    };

    fetchOrder();
  }, [orderId, currentUser]);

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'pending':
        return <Clock className="w-5 h-5 text-yellow-500" />;
      case 'in_progress':
        return <Package className="w-5 h-5 text-blue-500" />;
      case 'revision_requested':
        return <AlertCircle className="w-5 h-5 text-orange-500" />;
      case 'completed':
        return <CheckCircle className="w-5 h-5 text-green-500" />;
      case 'cancelled':
        return <XCircle className="w-5 h-5 text-red-500" />;
      default:
        return <Clock className="w-5 h-5 text-gray-500" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'in_progress': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'revision_requested': return 'bg-orange-100 text-orange-800 border-orange-200';
      case 'completed': return 'bg-green-100 text-green-800 border-green-200';
      case 'cancelled': return 'bg-red-100 text-red-800 border-red-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const formatStatus = (status: string) => {
    return status.split('_').map(word => 
      word.charAt(0).toUpperCase() + word.slice(1)
    ).join(' ');
  };

  const formatDate = (timestamp: any) => {
    if (!timestamp) return 'N/A';
    const date = timestamp.toDate ? timestamp.toDate() : new Date(timestamp);
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getDaysRemaining = (expectedDeliveryDate: any) => {
    if (!expectedDeliveryDate) return null;
    const deliveryDate = expectedDeliveryDate.toDate ? expectedDeliveryDate.toDate() : new Date(expectedDeliveryDate);
    const today = new Date();
    const diffTime = deliveryDate.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  const handleContactSeller = () => {
    if (!order) return;
    navigate('/client/messages', { 
      state: { 
        recipientId: order.sellerId,
        recipientName: order.sellerName,
        orderId: order.id,
        gigId: order.gigId,
        gigTitle: order.gigTitle
      } 
    });
  };

  const handleReleasePayment = async () => {
    if (!order || !orderId) return;

    showModal(
      'Release Payment',
      `Are you sure you want to release $${order.price.toFixed(2)} to ${order.sellerName}? This action cannot be undone.`,
      'warning',
      async () => {
        setIsProcessing(true);
        try {
          // Update order status to completed
          await updateDoc(doc(db, 'orders', orderId), {
            status: 'completed',
            completedAt: Timestamp.now()
          });

          // Add earnings to freelancer account
          const sellerRef = doc(db, 'users', order.sellerId);
          await updateDoc(sellerRef, {
            totalEarnings: increment(order.price),
            availableBalance: increment(order.price)
          });

          // Update local state
          setOrder({
            ...order,
            status: 'completed',
            completedAt: Timestamp.now()
          });

          showModal(
            'Payment Released!',
            `Payment of $${order.price.toFixed(2)} has been successfully released to ${order.sellerName}.`,
            'success'
          );
        } catch (error) {
          console.error('Error releasing payment:', error);
          showModal(
            'Payment Failed',
            'Failed to release payment. Please try again later.',
            'error'
          );
        } finally {
          setIsProcessing(false);
        }
      }
    );
  };

  const handleRequestRevision = async () => {
    if (!order || !orderId) return;

    if (order.revisionCount >= order.maxRevisions) {
      showModal(
        'No Revisions Left',
        `You have used all ${order.maxRevisions} revisions for this order.`,
        'warning'
      );
      return;
    }

    if (!revisionMessage.trim()) {
      showModal(
        'Message Required',
        'Please provide details about what needs to be revised.',
        'warning'
      );
      return;
    }

    setIsProcessing(true);
    try {
      await updateDoc(doc(db, 'orders', orderId), {
        status: 'revision_requested',
        revisionCount: increment(1),
        lastRevisionMessage: revisionMessage,
        lastRevisionDate: Timestamp.now()
      });

      setOrder({
        ...order,
        status: 'revision_requested',
        revisionCount: order.revisionCount + 1
      });

      setRevisionMessage('');
      showModal(
        'Revision Requested',
        'The seller has been notified about your revision request.',
        'success'
      );
    } catch (error) {
      console.error('Error requesting revision:', error);
      showModal(
        'Request Failed',
        'Failed to request revision. Please try again later.',
        'error'
      );
    } finally {
      setIsProcessing(false);
    }
  };

  const handleLeaveReview = () => {
    setShowReviewModal(true);
  };

  const handleSubmitReview = async () => {
    if (!order || !orderId || !currentUser) return;

    if (rating === 0) {
      showModal(
        'Rating Required',
        'Please select a rating before submitting your review.',
        'warning'
      );
      return;
    }

    if (!reviewText.trim()) {
      showModal(
        'Review Required',
        'Please write a review before submitting.',
        'warning'
      );
      return;
    }

    setIsProcessing(true);
    try {
      // Save review to Firebase
      await addDoc(collection(db, 'reviews'), {
        orderId: orderId,
        gigId: order.gigId,
        gigTitle: order.gigTitle,
        sellerId: order.sellerId,
        sellerName: order.sellerName,
        clientId: currentUser.uid,
        clientName: order.buyerName || currentUser.displayName || 'Anonymous',
        rating: rating,
        reviewText: reviewText.trim(),
        createdAt: Timestamp.now(),
        orderNumber: order.orderNumber,
        packageType: order.packageType
      });

      // Update seller's average rating
      const reviewsQuery = query(
        collection(db, 'reviews'),
        where('sellerId', '==', order.sellerId)
      );
      const reviewsSnap = await getDocs(reviewsQuery);
      const totalRatings = reviewsSnap.size + 1; // +1 for the new review
      let sumRatings = rating;
      reviewsSnap.forEach((doc) => {
        sumRatings += doc.data().rating;
      });
      const avgRating = sumRatings / totalRatings;

      // Update seller's profile with new average rating
      const sellerRef = doc(db, 'users', order.sellerId);
      await updateDoc(sellerRef, {
        averageRating: avgRating,
        totalReviews: totalRatings
      });

      setHasReviewed(true);
      setShowReviewModal(false);
      setRating(0);
      setReviewText('');

      showModal(
        'Review Submitted!',
        'Thank you for your feedback. Your review has been posted successfully.',
        'success'
      );
    } catch (error) {
      console.error('Error submitting review:', error);
      showModal(
        'Review Failed',
        'Failed to submit your review. Please try again later.',
        'error'
      );
    } finally {
      setIsProcessing(false);
    }
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return Math.round(bytes / Math.pow(k, i) * 100) / 100 + ' ' + sizes[i];
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#ffeee3] flex justify-center items-center">
        <div className="flex flex-col items-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#FF6B00]"></div>
          <span className="ml-3 mt-4 text-[#2E2E2E]">Loading order details...</span>
        </div>
      </div>
    );
  }

  if (error || !order) {
    return (
      <div className="min-h-screen bg-[#ffeee3] flex justify-center items-center">
        <div className="text-center">
          <XCircle className="w-16 h-16 text-red-500 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-[#2E2E2E] mb-2">{error || 'Order not found'}</h2>
          <button
            onClick={() => navigate('/client/my-orders')}
            className="mt-4 bg-[#FF6B00] hover:bg-[#FF9F45] text-white px-6 py-3 rounded-lg font-medium transition-colors"
          >
            Back to Orders
          </button>
        </div>
      </div>
    );
  }

  const daysRemaining = getDaysRemaining(order.expectedDeliveryDate);

  return (
    <div className="min-h-screen bg-[#ffeee3]">
      <div className="section-container py-8">
        {/* Back Button */}
        <button
          onClick={() => navigate('/client/my-orders')}
          className="flex items-center gap-2 text-[#2E2E2E] hover:text-[#FF6B00] mb-6 transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
          Back to Orders
        </button>

        {/* Header */}
        <div className="bg-white rounded-lg border border-[#FF6B00]/20 p-6 mb-6">
          <div className="flex items-start justify-between mb-4">
            <div>
              <h1 className="text-3xl font-bold text-[#2E2E2E] mb-2">{order.gigTitle}</h1>
              <p className="text-[#2E2E2E]/60 text-lg">Order #{order.orderNumber}</p>
            </div>
            <div className="text-right">
              <p className="text-3xl font-bold text-[#2E2E2E]">${order.totalAmount.toFixed(2)}</p>
              <p className="text-sm text-[#2E2E2E]/60 mt-1">
                ${order.price} + ${order.serviceFee.toFixed(2)} service fee
              </p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className={`flex items-center gap-2 px-3 py-2 rounded-lg border ${getStatusColor(order.status)}`}>
              {getStatusIcon(order.status)}
              <span className="font-medium">{formatStatus(order.status)}</span>
            </div>
            <div className="flex items-center gap-2 text-[#2E2E2E]/70">
              <Calendar className="w-4 h-4" />
              <span className="text-sm">Ordered on {formatDate(order.createdAt)}</span>
            </div>
            {daysRemaining !== null && order.status === 'in_progress' && (
              <div className={`flex items-center gap-2 ${daysRemaining <= 1 ? 'text-red-600' : 'text-[#2E2E2E]/70'}`}>
                <Clock className="w-4 h-4" />
                <span className="text-sm font-medium">
                  {daysRemaining > 0 ? `${daysRemaining} days remaining` : 'Overdue'}
                </span>
              </div>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Package Details */}
            <div className="bg-white rounded-lg border border-[#FF6B00]/20 p-6">
              <h2 className="text-xl font-bold text-[#2E2E2E] mb-4">Package Details</h2>
              <div className="space-y-3">
                <div className="flex items-center justify-between py-2 border-b border-[#FF6B00]/10">
                  <span className="text-[#2E2E2E]/70">Package Type</span>
                  <span className="font-medium text-[#2E2E2E] uppercase">{order.packageType}</span>
                </div>
                <div className="flex items-center justify-between py-2 border-b border-[#FF6B00]/10">
                  <span className="text-[#2E2E2E]/70">Package Title</span>
                  <span className="font-medium text-[#2E2E2E]">{order.packageTitle}</span>
                </div>
                <div className="flex items-center justify-between py-2 border-b border-[#FF6B00]/10">
                  <span className="text-[#2E2E2E]/70">Delivery Time</span>
                  <span className="font-medium text-[#2E2E2E]">{order.deliveryTime} days</span>
                </div>
                <div className="flex items-center justify-between py-2 border-b border-[#FF6B00]/10">
                  <span className="text-[#2E2E2E]/70">Revisions</span>
                  <span className="font-medium text-[#2E2E2E]">
                    {order.revisionCount}/{order.maxRevisions} used
                  </span>
                </div>
                <div className="flex items-center justify-between py-2">
                  <span className="text-[#2E2E2E]/70">Expected Delivery</span>
                  <span className="font-medium text-[#2E2E2E]">{formatDate(order.expectedDeliveryDate)}</span>
                </div>
              </div>

              {/* Features */}
              {order.features && order.features.length > 0 && (
                <div className="mt-4 pt-4 border-t border-[#FF6B00]/10">
                  <h3 className="font-medium text-[#2E2E2E] mb-3">Included Features</h3>
                  <ul className="space-y-2">
                    {order.features.map((feature, index) => (
                      <li key={index} className="flex items-start gap-2 text-[#2E2E2E]/70">
                        <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                        <span className="text-sm">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>

            {/* Requirements */}
            {order.requirements && (
              <div className="bg-white rounded-lg border border-[#FF6B00]/20 p-6">
                <h2 className="text-xl font-bold text-[#2E2E2E] mb-4 flex items-center gap-2">
                  <FileText className="w-5 h-5" />
                  Requirements
                </h2>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <p className="text-[#2E2E2E]/80 whitespace-pre-wrap">{order.requirements}</p>
                </div>
              </div>
            )}

            {/* Delivered Work */}
            {(order.status === 'delivered' || order.status === 'completed') && (
              <div className="bg-white rounded-lg border border-green-500/30 p-6">
                <div className="flex items-center gap-2 mb-4">
                  <CheckCircle className="w-6 h-6 text-green-600" />
                  <h2 className="text-xl font-bold text-[#2E2E2E]">Delivered Work</h2>
                </div>
                
                <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6">
                  <p className="text-sm text-green-800">
                    <strong>Delivered on:</strong> {order.deliveredAt && formatDate(order.deliveredAt)}
                  </p>
                  {order.status === 'completed' && order.completedAt && (
                    <p className="text-sm text-green-800 mt-1">
                      <strong>Completed on:</strong> {formatDate(order.completedAt)}
                    </p>
                  )}
                </div>

                {/* Delivered Files */}
                {order.deliveryFiles && order.deliveryFiles.length > 0 && (
                  <div className="mb-6">
                    <h3 className="font-medium text-[#2E2E2E] mb-3">Delivered Files ({order.deliveryFiles.length})</h3>
                    <div className="space-y-2">
                      {order.deliveryFiles.map((file, index) => (
                        <div key={index} className="flex items-center justify-between p-4 bg-gray-50 border border-gray-200 rounded-lg hover:bg-gray-100 transition-colors">
                          <div className="flex items-center gap-3 flex-1">
                            <FileText className="w-5 h-5 text-green-600" />
                            <div>
                              <p className="font-medium text-[#2E2E2E]">{file.name}</p>
                              <p className="text-sm text-[#2E2E2E]/60">{formatFileSize(file.size)}</p>
                            </div>
                          </div>
                          <a
                            href={file.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-2 text-[#FF6B00] hover:text-[#FF9F45] font-medium transition-colors"
                          >
                            <Download className="w-4 h-4" />
                            Download
                          </a>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Shared Links */}
                {order.deliveryLinks && order.deliveryLinks.length > 0 && (
                  <div className="mb-6">
                    <h3 className="font-medium text-[#2E2E2E] mb-3">Shared Links ({order.deliveryLinks.length})</h3>
                    <div className="space-y-2">
                      {order.deliveryLinks.map((link, index) => (
                        <div key={index} className="flex items-center gap-3 p-4 bg-gray-50 border border-gray-200 rounded-lg">
                          <LinkIcon className="w-5 h-5 text-green-600 flex-shrink-0" />
                          <a 
                            href={link} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="text-blue-600 hover:underline flex-1 truncate"
                          >
                            {link}
                          </a>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Delivery Note */}
                {order.deliveryNote && (
                  <div>
                    <h3 className="font-medium text-[#2E2E2E] mb-3">Delivery Note</h3>
                    <div className="bg-gray-50 border border-gray-200 p-4 rounded-lg">
                      <p className="text-[#2E2E2E]/80 whitespace-pre-wrap">{order.deliveryNote}</p>
                    </div>
                  </div>
                )}

                {/* Actions for Delivered Work */}
                {order.status === 'delivered' && (
                  <div className="mt-6 pt-6 border-t border-gray-200">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <button
                        onClick={handleReleasePayment}
                        disabled={isProcessing}
                        className="flex items-center justify-center gap-2 px-6 py-3 bg-green-600 hover:bg-green-700 disabled:bg-gray-300 disabled:cursor-not-allowed text-white rounded-lg font-medium transition-colors"
                      >
                        <CheckCircle className="w-5 h-5" />
                        {isProcessing ? 'Processing...' : `Release Payment ($${order.price})`}
                      </button>
                      
                      {order.revisionCount < order.maxRevisions && (
                        <button
                          onClick={() => document.getElementById('revision-section')?.scrollIntoView({ behavior: 'smooth' })}
                          className="flex items-center justify-center gap-2 px-6 py-3 border-2 border-orange-500 text-orange-600 hover:bg-orange-50 rounded-lg font-medium transition-colors"
                        >
                          <AlertCircle className="w-5 h-5" />
                          Request Revision ({order.maxRevisions - order.revisionCount} left)
                        </button>
                      )}
                    </div>

                    {/* Revision Request Section */}
                    {order.revisionCount < order.maxRevisions && (
                      <div id="revision-section" className="mt-6 p-4 bg-orange-50 border border-orange-200 rounded-lg">
                        <h4 className="font-medium text-orange-900 mb-3">Request Revision</h4>
                        <textarea
                          value={revisionMessage}
                          onChange={(e) => setRevisionMessage(e.target.value)}
                          placeholder="Describe what needs to be revised..."
                          className="w-full border border-orange-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent resize-none"
                          rows={4}
                        />
                        <button
                          onClick={handleRequestRevision}
                          disabled={isProcessing || !revisionMessage.trim()}
                          className="mt-3 w-full bg-orange-600 hover:bg-orange-700 disabled:bg-gray-300 disabled:cursor-not-allowed text-white px-6 py-3 rounded-lg font-medium transition-colors"
                        >
                          {isProcessing ? 'Sending...' : 'Submit Revision Request'}
                        </button>
                      </div>
                    )}
                  </div>
                )}
              </div>
            )}

            {/* Payment Information */}
            <div className="bg-white rounded-lg border border-[#FF6B00]/20 p-6">
              <h2 className="text-xl font-bold text-[#2E2E2E] mb-4 flex items-center gap-2">
                <CreditCard className="w-5 h-5" />
                Payment Information
              </h2>
              <div className="space-y-3">
                <div className="flex items-center justify-between py-2">
                  <span className="text-[#2E2E2E]/70">Package Price</span>
                  <span className="font-medium text-[#2E2E2E]">${order.price.toFixed(2)}</span>
                </div>
                <div className="flex items-center justify-between py-2">
                  <span className="text-[#2E2E2E]/70">Service Fee (5%)</span>
                  <span className="font-medium text-[#2E2E2E]">${order.serviceFee.toFixed(2)}</span>
                </div>
                <div className="flex items-center justify-between py-3 border-t border-[#FF6B00]/20">
                  <span className="font-bold text-[#2E2E2E]">Total Amount</span>
                  <span className="font-bold text-[#2E2E2E] text-xl">${order.totalAmount.toFixed(2)}</span>
                </div>
                <div className="flex items-center justify-between py-2 border-t border-[#FF6B00]/10">
                  <span className="text-[#2E2E2E]/70">Payment Method</span>
                  <span className="font-medium text-[#2E2E2E] capitalize">{order.paymentMethod}</span>
                </div>
                <div className="flex items-center justify-between py-2">
                  <span className="text-[#2E2E2E]/70">Payment Status</span>
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                    order.paymentStatus === 'paid' ? 'bg-green-100 text-green-800' :
                    order.paymentStatus === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                    order.paymentStatus === 'failed' ? 'bg-red-100 text-red-800' :
                    'bg-gray-100 text-gray-800'
                  }`}>
                    {order.paymentStatus.toUpperCase()}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Seller Information */}
            <div className="bg-white rounded-lg border border-[#FF6B00]/20 p-6">
              <h2 className="text-xl font-bold text-[#2E2E2E] mb-4 flex items-center gap-2">
                <User className="w-5 h-5" />
                Seller Information
              </h2>
              <div className="space-y-4">
                <div>
                  <p className="text-sm text-[#2E2E2E]/60 mb-1">Seller Name</p>
                  <p className="font-medium text-[#2E2E2E]">{order.sellerName}</p>
                </div>
                <button
                  onClick={handleContactSeller}
                  className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-[#FF6B00] hover:bg-[#FF9F45] text-white rounded-lg transition-colors font-medium"
                >
                  <MessageCircle className="w-4 h-4" />
                  Contact Seller
                </button>
                <button
                  onClick={() => navigate(`/client/gig/${order.gigId}`)}
                  className="w-full px-4 py-3 border border-[#FF6B00] text-[#FF6B00] hover:bg-[#ffeee3] rounded-lg transition-colors font-medium"
                >
                  View Gig
                </button>
              </div>
            </div>

            {/* Order Actions */}
            <div className="bg-white rounded-lg border border-[#FF6B00]/20 p-6">
              <h2 className="text-xl font-bold text-[#2E2E2E] mb-4">Actions</h2>
              <div className="space-y-3">
                {order.status === 'completed' && (
                  <>
                    <button 
                      onClick={handleLeaveReview}
                      disabled={hasReviewed}
                      className={`w-full flex items-center justify-center gap-2 px-4 py-3 rounded-lg transition-colors font-medium ${
                        hasReviewed 
                          ? 'bg-gray-300 text-gray-500 cursor-not-allowed' 
                          : 'border border-[#FF6B00] text-[#FF6B00] hover:bg-[#ffeee3]'
                      }`}
                    >
                      <Star className="w-4 h-4" />
                      {hasReviewed ? 'Review Submitted' : 'Leave Review'}
                    </button>
                    <button 
                      onClick={handleContactSeller}
                      className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-[#FF6B00] hover:bg-[#FF9F45] text-white rounded-lg transition-colors font-medium"
                    >
                      <MessageCircle className="w-4 h-4" />
                      Message Seller
                    </button>
                  </>
                )}
                {order.status !== 'delivered' && order.status !== 'completed' && (
                  <button 
                    onClick={handleContactSeller}
                    className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-[#FF6B00] hover:bg-[#FF9F45] text-white rounded-lg transition-colors font-medium"
                  >
                    <MessageCircle className="w-4 h-4" />
                    Contact Seller
                  </button>
                )}
              </div>
            </div>

            {/* Order Summary */}
            <div className="bg-white rounded-lg border border-[#FF6B00]/20 p-6">
              <h2 className="text-xl font-bold text-[#2E2E2E] mb-4">Order Summary</h2>
              <div className="space-y-3 text-sm">
                <div className="flex items-center justify-between">
                  <span className="text-[#2E2E2E]/70">Order ID</span>
                  <span className="font-medium text-[#2E2E2E]">{order.id.substring(0, 8)}...</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-[#2E2E2E]/70">Source</span>
                  <span className="font-medium text-[#2E2E2E] capitalize">{order.source || 'Web'}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-[#2E2E2E]/70">Priority</span>
                  <span className="font-medium text-[#2E2E2E] capitalize">{order.priority || 'Normal'}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Modal */}
        <Modal
          isOpen={modal.isOpen}
          onClose={closeModal}
          title={modal.title}
          message={modal.message}
          type={modal.type}
          onConfirm={modal.onConfirm}
          confirmText={modal.onConfirm ? "Confirm" : "OK"}
          cancelText="Cancel"
        />

        {/* Review Modal */}
        {showReviewModal && (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-xl shadow-2xl max-w-md w-full max-h-[90vh] overflow-y-auto">
              <div className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-2xl font-bold text-[#2E2E2E]">Leave a Review</h2>
                  <button
                    onClick={() => {
                      setShowReviewModal(false);
                      setRating(0);
                      setReviewText('');
                    }}
                    className="text-gray-400 hover:text-gray-600 transition-colors"
                  >
                    <X className="w-6 h-6" />
                  </button>
                </div>

                <div className="space-y-4">
                  {/* Order Info */}
                  <div className="bg-[#ffeee3] p-4 rounded-lg">
                    <p className="text-sm text-[#2E2E2E]/60 mb-1">Order</p>
                    <p className="font-medium text-[#2E2E2E]">{order?.gigTitle}</p>
                    <p className="text-sm text-[#2E2E2E]/60 mt-1">Seller: {order?.sellerName}</p>
                  </div>

                  {/* Rating */}
                  <div>
                    <label className="block text-sm font-medium text-[#2E2E2E] mb-2">
                      Rating <span className="text-red-500">*</span>
                    </label>
                    <div className="flex items-center gap-2">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <button
                          key={star}
                          type="button"
                          onClick={() => setRating(star)}
                          onMouseEnter={() => setHoveredRating(star)}
                          onMouseLeave={() => setHoveredRating(0)}
                          className="transition-transform hover:scale-110"
                        >
                          <Star
                            className={`w-8 h-8 ${
                              star <= (hoveredRating || rating)
                                ? 'fill-[#FF6B00] text-[#FF6B00]'
                                : 'text-gray-300'
                            }`}
                          />
                        </button>
                      ))}
                      {rating > 0 && (
                        <span className="ml-2 text-sm font-medium text-[#2E2E2E]">
                          {rating} / 5
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Review Text */}
                  <div>
                    <label className="block text-sm font-medium text-[#2E2E2E] mb-2">
                      Your Review <span className="text-red-500">*</span>
                    </label>
                    <textarea
                      value={reviewText}
                      onChange={(e) => setReviewText(e.target.value)}
                      placeholder="Share your experience with this seller..."
                      className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#FF6B00] focus:border-transparent resize-none"
                      rows={5}
                      maxLength={500}
                    />
                    <p className="text-xs text-[#2E2E2E]/60 mt-1 text-right">
                      {reviewText.length}/500 characters
                    </p>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex gap-3 pt-2">
                    <button
                      onClick={() => {
                        setShowReviewModal(false);
                        setRating(0);
                        setReviewText('');
                      }}
                      className="flex-1 px-4 py-3 border border-gray-300 text-[#2E2E2E] hover:bg-gray-50 rounded-lg font-medium transition-colors"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={handleSubmitReview}
                      disabled={isProcessing || rating === 0 || !reviewText.trim()}
                      className="flex-1 px-4 py-3 bg-[#FF6B00] hover:bg-[#FF9F45] disabled:bg-gray-300 disabled:cursor-not-allowed text-white rounded-lg font-medium transition-colors"
                    >
                      {isProcessing ? 'Submitting...' : 'Submit Review'}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default OrderDetailsPage;
