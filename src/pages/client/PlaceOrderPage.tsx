import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { doc, getDoc, addDoc, collection, serverTimestamp } from 'firebase/firestore';
import { db } from '../../lib/firebase';
import { useAuth } from '../../contexts/AuthContext';
import { Clock, Package, Check, CreditCard, Shield, ArrowLeft, Star } from 'lucide-react';
import OrderSuccessModal from '../../components/OrderSuccessModal';

interface OrderPackage {
  title: string;
  description: string;
  price: string;
  delivery: string;
  revisions: string;
  features: string[];
}

interface OrderDetails {
  gigId: string;
  packageType: 'basic' | 'standard' | 'premium';
  packageData: OrderPackage;
  gigTitle: string;
  sellerId: string;
  sellerName: string;
  sellerAvatar?: string;
}

const PlaceOrderPage: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { currentUser } = useAuth();
  const [orderDetails, setOrderDetails] = useState<OrderDetails | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isPlacingOrder, setIsPlacingOrder] = useState(false);
  const [requirements, setRequirements] = useState('');
  const [agreedToTerms, setAgreedToTerms] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState<'card' | 'paypal'>('card');
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [orderSuccess, setOrderSuccess] = useState<any>(null);

  useEffect(() => {
    initializeOrderDetails();
  }, [location.state]);

  const initializeOrderDetails = async () => {
    try {
      setIsLoading(true);
      const stateData = location.state as { gigId: string; packageType: 'basic' | 'standard' | 'premium' };
      
      if (!stateData || !stateData.gigId || !stateData.packageType) {
        navigate('/client/hire-gig');
        return;
      }

      // Fetch gig details
      const gigDoc = await getDoc(doc(db, 'gigs', stateData.gigId));
      if (!gigDoc.exists()) {
        navigate('/client/hire-gig');
        return;
      }

      const gigData = gigDoc.data();
      const packageData = gigData.packages?.[stateData.packageType];
      
      if (!packageData) {
        navigate('/client/hire-gig');
        return;
      }

      // Fetch seller info
      let sellerInfo = { name: 'Freelancer', avatar: '' };
      if (gigData.userId) {
        const userDoc = await getDoc(doc(db, 'users', gigData.userId));
        if (userDoc.exists()) {
          const userData = userDoc.data();
          sellerInfo = {
            name: `${userData.firstName || ''} ${userData.lastName || ''}`.trim() || 'Freelancer',
            avatar: userData.profile?.profilePictureUrl || userData.profilePictureUrl || ''
          };
        }
      }

      setOrderDetails({
        gigId: stateData.gigId,
        packageType: stateData.packageType,
        packageData: packageData,
        gigTitle: gigData.title || 'Untitled Gig',
        sellerId: gigData.userId || '',
        sellerName: sellerInfo.name,
        sellerAvatar: sellerInfo.avatar
      });
    } catch (error) {
      console.error('Error initializing order details:', error);
      navigate('/client/hire-gig');
    } finally {
      setIsLoading(false);
    }
  };

  const calculateTotal = () => {
    if (!orderDetails) return 0;
    const basePrice = parseFloat(orderDetails.packageData.price);
    const serviceFee = basePrice * 0.05; // 5% service fee
    return basePrice + serviceFee;
  };

  const handlePlaceOrder = async () => {
    if (!currentUser || !orderDetails) {
      navigate('/login');
      return;
    }

    if (!agreedToTerms) {
      alert('Please agree to the terms and conditions');
      return;
    }

    try {
      setIsPlacingOrder(true);

      // Create order in Firebase
      const orderData = {
        // Order Information
        buyerId: currentUser.uid,
        buyerName: currentUser.displayName || currentUser.email?.split('@')[0] || 'Client',
        buyerEmail: currentUser.email || '',
        sellerId: orderDetails.sellerId,
        sellerName: orderDetails.sellerName,
        
        // Gig Information
        gigId: orderDetails.gigId,
        gigTitle: orderDetails.gigTitle,
        packageType: orderDetails.packageType,
        packageTitle: orderDetails.packageData.title,
        
        // Package Details
        price: parseFloat(orderDetails.packageData.price),
        serviceFee: parseFloat(orderDetails.packageData.price) * 0.05,
        totalAmount: calculateTotal(),
        deliveryTime: orderDetails.packageData.delivery,
        revisions: orderDetails.packageData.revisions,
        features: orderDetails.packageData.features,
        
        // Order Details
        requirements: requirements.trim() || 'No specific requirements provided',
        status: 'pending', // pending, in_progress, revision_requested, completed, cancelled
        paymentStatus: 'paid', // paid, pending, failed, refunded
        paymentMethod: paymentMethod,
        
        // Timestamps
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
        expectedDeliveryDate: new Date(Date.now() + parseInt(orderDetails.packageData.delivery) * 24 * 60 * 60 * 1000),
        
        // Communication
        conversationId: `${currentUser.uid}_${orderDetails.sellerId}_${Date.now()}`,
        
        // Tracking
        milestones: [],
        revisionCount: 0,
        maxRevisions: parseInt(orderDetails.packageData.revisions) || 0,
        
        // Metadata
        orderNumber: `ORD-${Date.now()}`,
        source: 'web',
        priority: 'normal'
      };

      // Add order to Firebase
      const orderRef = await addDoc(collection(db, 'orders'), orderData);
      console.log('Order created with ID:', orderRef.id);

      // Create initial conversation for the order
      const conversationData = {
        conversationId: orderData.conversationId,
        participants: [currentUser.uid, orderDetails.sellerId],
        senderId: currentUser.uid,
        senderName: orderData.buyerName,
        senderAvatar: '', // Could be added from user profile
        recipientId: orderDetails.sellerId,
        recipientName: orderDetails.sellerName,
        recipientAvatar: orderDetails.sellerAvatar || '',
        
        // Order Context
        orderId: orderRef.id,
        gigId: orderDetails.gigId,
        gigTitle: orderDetails.gigTitle,
        
        // Message Data
        lastMessage: `Order placed for ${orderDetails.packageData.title} package`,
        lastMessageTimestamp: serverTimestamp(),
        lastMessageSender: currentUser.uid,
        
        // Status
        isOrderRelated: true,
        status: 'active',
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
        
        // Unread counts
        unreadCount: {
          [currentUser.uid]: 0,
          [orderDetails.sellerId]: 1
        }
      };

      await addDoc(collection(db, 'conversations'), conversationData);

      // Show success modal with order details
      const expectedDeliveryDays = parseInt(orderDetails.packageData.delivery);
      const expectedDeliveryText = expectedDeliveryDays === 1 ? '1 day' : `${expectedDeliveryDays} days`;
      
      setOrderSuccess({
        orderNumber: orderData.orderNumber,
        gigTitle: orderDetails.gigTitle,
        packageType: orderDetails.packageType,
        totalAmount: calculateTotal(),
        expectedDelivery: expectedDeliveryText,
        sellerName: orderDetails.sellerName,
        orderId: orderRef.id
      });
      setShowSuccessModal(true);

    } catch (error) {
      console.error('Error placing order:', error);
      alert('Failed to place order. Please try again.');
    } finally {
      setIsPlacingOrder(false);
    }
  };

  const formatDelivery = (delivery: string) => {
    const days = parseInt(delivery);
    return days === 1 ? '1 day' : `${days} days`;
  };

  const handleModalClose = () => {
    setShowSuccessModal(false);
    navigate('/client/my-orders', { 
      state: { 
        message: 'Your order has been placed successfully!',
        orderId: orderSuccess?.orderId
      }
    });
  };

  const handleViewOrders = () => {
    setShowSuccessModal(false);
    navigate('/client/my-orders', { 
      state: { 
        message: 'Your order has been placed successfully!',
        orderId: orderSuccess?.orderId
      }
    });
  };

  const handleContactSeller = () => {
    setShowSuccessModal(false);
    navigate('/client/messages', { 
      state: { 
        recipientId: orderDetails?.sellerId,
        recipientName: orderDetails?.sellerName,
        gigId: orderDetails?.gigId,
        gigTitle: orderDetails?.gigTitle
      }
    });
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

  if (!orderDetails) {
    return (
      <div className="min-h-screen bg-[#ffeee3] flex justify-center items-center">
        <div className="text-center">
          <p className="text-[#2E2E2E] text-lg mb-4">Order details not found</p>
          <button
            onClick={() => navigate('/client/hire-gig')}
            className="text-[#FF6B00] hover:underline"
          >
            Back to Gigs
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#ffeee3]">
      {/* Header */}
      <div className="bg-white border-b border-[#FF6B00]/20">
        <div className="section-container py-4">
          <div className="flex items-center justify-between">
            <button
              onClick={() => navigate(-1)}
              className="flex items-center text-[#2E2E2E] hover:text-[#FF6B00] transition-colors"
            >
              <ArrowLeft className="w-5 h-5 mr-2" />
              Back
            </button>
            <h1 className="text-2xl font-bold text-[#2E2E2E]">Place Order</h1>
            <div className="w-20"></div> {/* Spacer for centering */}
          </div>
        </div>
      </div>

      <div className="section-container py-8">
        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left Column - Order Form */}
            <div className="lg:col-span-2 space-y-6">
              {/* Seller Info */}
              <div className="bg-white rounded-lg border border-[#FF6B00]/20 p-6">
                <h2 className="text-xl font-bold text-[#2E2E2E] mb-4">Freelancer</h2>
                <div className="flex items-center gap-4">
                  {orderDetails.sellerAvatar ? (
                    <img 
                      src={orderDetails.sellerAvatar} 
                      alt={orderDetails.sellerName} 
                      className="w-16 h-16 rounded-full object-cover"
                    />
                  ) : (
                    <div className="w-16 h-16 rounded-full bg-[#FF6B00] flex items-center justify-center">
                      <span className="text-white text-xl font-bold">
                        {orderDetails.sellerName.charAt(0).toUpperCase()}
                      </span>
                    </div>
                  )}
                  <div>
                    <h3 className="font-semibold text-[#2E2E2E] text-lg">{orderDetails.sellerName}</h3>
                    <div className="flex items-center gap-2 text-sm text-[#2E2E2E]/70">
                      <Star className="w-4 h-4 text-[#FF6B00] fill-current" />
                      <span>Professional Freelancer</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Requirements */}
              <div className="bg-white rounded-lg border border-[#FF6B00]/20 p-6">
                <h2 className="text-xl font-bold text-[#2E2E2E] mb-4">Project Requirements</h2>
                <div className="space-y-4">
                  <div>
                    <label className="block text-[#2E2E2E] font-medium mb-2">
                      Describe your requirements in detail
                    </label>
                    <textarea
                      value={requirements}
                      onChange={(e) => setRequirements(e.target.value)}
                      placeholder="Please provide detailed information about your project requirements, preferences, deadlines, and any specific instructions..."
                      className="w-full p-4 border border-[#FF6B00]/20 rounded-lg focus:ring-2 focus:ring-[#FF6B00] focus:border-transparent resize-none"
                      rows={6}
                    />
                    <p className="text-sm text-[#2E2E2E]/60 mt-2">
                      The more details you provide, the better the freelancer can understand your needs.
                    </p>
                  </div>
                </div>
              </div>

              {/* Payment Method */}
              <div className="bg-white rounded-lg border border-[#FF6B00]/20 p-6">
                <h2 className="text-xl font-bold text-[#2E2E2E] mb-4">Payment Method</h2>
                <div className="space-y-3">
                  <label className="flex items-center p-4 border border-[#FF6B00]/20 rounded-lg cursor-pointer hover:bg-[#ffeee3]/30">
                    <input
                      type="radio"
                      name="payment"
                      value="card"
                      checked={paymentMethod === 'card'}
                      onChange={(e) => setPaymentMethod(e.target.value as 'card')}
                      className="text-[#FF6B00] focus:ring-[#FF6B00]"
                    />
                    <CreditCard className="w-6 h-6 text-[#FF6B00] mx-3" />
                    <div>
                      <p className="font-medium text-[#2E2E2E]">Credit/Debit Card</p>
                      <p className="text-sm text-[#2E2E2E]/60">Secure payment with SSL encryption</p>
                    </div>
                  </label>
                  <label className="flex items-center p-4 border border-[#FF6B00]/20 rounded-lg cursor-pointer hover:bg-[#ffeee3]/30">
                    <input
                      type="radio"
                      name="payment"
                      value="paypal"
                      checked={paymentMethod === 'paypal'}
                      onChange={(e) => setPaymentMethod(e.target.value as 'paypal')}
                      className="text-[#FF6B00] focus:ring-[#FF6B00]"
                    />
                    <div className="w-6 h-6 mx-3 bg-blue-600 rounded flex items-center justify-center">
                      <span className="text-white text-xs font-bold">PP</span>
                    </div>
                    <div>
                      <p className="font-medium text-[#2E2E2E]">PayPal</p>
                      <p className="text-sm text-[#2E2E2E]/60">Fast and secure PayPal checkout</p>
                    </div>
                  </label>
                </div>
              </div>

              {/* Terms and Conditions */}
              <div className="bg-white rounded-lg border border-[#FF6B00]/20 p-6">
                <label className="flex items-start gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={agreedToTerms}
                    onChange={(e) => setAgreedToTerms(e.target.checked)}
                    className="mt-1 text-[#FF6B00] focus:ring-[#FF6B00] rounded"
                  />
                  <div className="text-sm text-[#2E2E2E]">
                    <p className="mb-2">
                      I agree to the{' '}
                      <a href="/terms" className="text-[#FF6B00] hover:underline">Terms of Service</a>
                      {' '}and{' '}
                      <a href="/privacy" className="text-[#FF6B00] hover:underline">Privacy Policy</a>
                    </p>
                    <p className="text-[#2E2E2E]/60">
                      By placing this order, you agree to FreelanceNest's terms and understand that 
                      payment will be held securely until the work is completed to your satisfaction.
                    </p>
                  </div>
                </label>
              </div>
            </div>

            {/* Right Column - Order Summary */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-lg border border-[#FF6B00]/20 sticky top-24">
                <div className="p-6 border-b border-[#FF6B00]/20">
                  <h2 className="text-xl font-bold text-[#2E2E2E] mb-2">Order Summary</h2>
                </div>
                
                <div className="p-6">
                  {/* Gig Info */}
                  <div className="mb-6">
                    <h3 className="font-semibold text-[#2E2E2E] mb-2">{orderDetails.gigTitle}</h3>
                    <p className="text-[#FF6B00] text-sm font-medium mb-3">
                      {orderDetails.packageType.toUpperCase()} Package
                    </p>
                    <p className="text-[#2E2E2E]/70 text-sm">{orderDetails.packageData.description}</p>
                  </div>

                  {/* Package Details */}
                  <div className="space-y-3 mb-6 pb-6 border-b border-[#FF6B00]/20">
                    <div className="flex items-center gap-3 text-sm">
                      <Clock className="w-4 h-4 text-[#FF6B00]" />
                      <span className="text-[#2E2E2E]">{formatDelivery(orderDetails.packageData.delivery)} delivery</span>
                    </div>
                    <div className="flex items-center gap-3 text-sm">
                      <Package className="w-4 h-4 text-[#FF6B00]" />
                      <span className="text-[#2E2E2E]">{orderDetails.packageData.revisions} revisions</span>
                    </div>
                  </div>

                  {/* Features */}
                  {orderDetails.packageData.features && orderDetails.packageData.features.length > 0 && (
                    <div className="mb-6 pb-6 border-b border-[#FF6B00]/20">
                      <h4 className="font-semibold text-[#2E2E2E] mb-3">Included:</h4>
                      <ul className="space-y-2">
                        {orderDetails.packageData.features.map((feature, index) => (
                          <li key={index} className="flex items-start text-sm">
                            <Check className="w-4 h-4 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                            <span className="text-[#2E2E2E]/80">{feature}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {/* Pricing */}
                  <div className="space-y-3 mb-6">
                    <div className="flex justify-between">
                      <span className="text-[#2E2E2E]">Package price</span>
                      <span className="font-medium text-[#2E2E2E]">${orderDetails.packageData.price}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-[#2E2E2E]">Service fee</span>
                      <span className="font-medium text-[#2E2E2E]">${(parseFloat(orderDetails.packageData.price) * 0.05).toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between text-lg font-bold border-t border-[#FF6B00]/20 pt-3">
                      <span className="text-[#2E2E2E]">Total</span>
                      <span className="text-[#FF6B00]">${calculateTotal().toFixed(2)}</span>
                    </div>
                  </div>

                  {/* Security Notice */}
                  <div className="flex items-start gap-3 p-4 bg-[#ffeee3]/30 rounded-lg mb-6">
                    <Shield className="w-5 h-5 text-[#FF6B00] flex-shrink-0 mt-0.5" />
                    <div className="text-sm">
                      <p className="font-medium text-[#2E2E2E] mb-1">Secure Payment</p>
                      <p className="text-[#2E2E2E]/70">
                        Your payment is protected and will be released to the freelancer only after you approve the work.
                      </p>
                    </div>
                  </div>

                  {/* Place Order Button */}
                  <button
                    onClick={handlePlaceOrder}
                    disabled={isPlacingOrder || !agreedToTerms}
                    className="w-full bg-[#FF6B00] hover:bg-[#FF9F45] disabled:bg-[#2E2E2E]/20 disabled:cursor-not-allowed text-white font-bold py-4 rounded-lg transition-colors duration-200"
                  >
                    {isPlacingOrder ? (
                      <div className="flex items-center justify-center">
                        <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                        Placing Order...
                      </div>
                    ) : (
                      `Place Order ($${calculateTotal().toFixed(2)})`
                    )}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Order Success Modal */}
      {showSuccessModal && orderSuccess && (
        <OrderSuccessModal
          isOpen={showSuccessModal}
          onClose={handleModalClose}
          orderDetails={orderSuccess}
          onViewOrders={handleViewOrders}
          onContactSeller={handleContactSeller}
        />
      )}
    </div>
  );
};

export default PlaceOrderPage;