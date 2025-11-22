import React from 'react';
import { CheckCircle, X, ShoppingBag, Calendar, DollarSign } from 'lucide-react';

interface OrderSuccessModalProps {
  isOpen: boolean;
  onClose: () => void;
  orderDetails: {
    orderNumber: string;
    gigTitle: string;
    packageType: string;
    totalAmount: number;
    expectedDelivery: string;
    sellerName: string;
  };
  onViewOrders: () => void;
  onContactSeller: () => void;
}

const OrderSuccessModal: React.FC<OrderSuccessModalProps> = ({
  isOpen,
  onClose,
  orderDetails,
  onViewOrders,
  onContactSeller
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full mx-4 relative overflow-hidden">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-gray-400 hover:text-gray-600 transition-colors z-10"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Success Header */}
        <div className="bg-gradient-to-br from-green-400 to-green-600 px-6 pt-8 pb-6 text-center">
          <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto mb-4">
            <CheckCircle className="w-8 h-8 text-green-500" />
          </div>
          <h2 className="text-2xl font-bold text-white mb-2">Order Placed Successfully!</h2>
          <p className="text-green-100">Your order has been submitted and payment processed</p>
        </div>

        {/* Order Details */}
        <div className="px-6 py-6">
          <div className="mb-6">
            <div className="flex items-center justify-between mb-3">
              <span className="text-sm text-gray-500">Order Number</span>
              <span className="font-medium text-gray-900">{orderDetails.orderNumber}</span>
            </div>
            
            <div className="bg-gray-50 rounded-lg p-4 mb-4">
              <h3 className="font-semibold text-gray-900 mb-1">{orderDetails.gigTitle}</h3>
              <p className="text-sm text-gray-600 mb-2">
                {orderDetails.packageType.toUpperCase()} Package • {orderDetails.sellerName}
              </p>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center text-sm text-gray-600">
                  <Calendar className="w-4 h-4 mr-1" />
                  <span>{orderDetails.expectedDelivery}</span>
                </div>
                <div className="flex items-center text-lg font-bold text-[#FF6B00]">
                  <DollarSign className="w-5 h-5" />
                  <span>{orderDetails.totalAmount.toFixed(2)}</span>
                </div>
              </div>
            </div>
          </div>

          {/* What's Next */}
          <div className="mb-6">
            <h4 className="font-semibold text-gray-900 mb-3">What happens next?</h4>
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 bg-[#FF6B00] text-white rounded-full flex items-center justify-center text-xs font-bold">1</div>
                <div>
                  <p className="text-sm font-medium text-gray-900">Seller receives your order</p>
                  <p className="text-xs text-gray-600">You'll get notified when work begins</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 bg-[#FF6B00] text-white rounded-full flex items-center justify-center text-xs font-bold">2</div>
                <div>
                  <p className="text-sm font-medium text-gray-900">Work in progress</p>
                  <p className="text-xs text-gray-600">Track progress and communicate directly</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 bg-[#FF6B00] text-white rounded-full flex items-center justify-center text-xs font-bold">3</div>
                <div>
                  <p className="text-sm font-medium text-gray-900">Delivery & review</p>
                  <p className="text-xs text-gray-600">Receive final work and approve completion</p>
                </div>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="space-y-3">
            <button
              onClick={onViewOrders}
              className="w-full bg-[#FF6B00] hover:bg-[#FF9F45] text-white font-medium py-3 rounded-lg transition-colors duration-200 flex items-center justify-center gap-2"
            >
              <ShoppingBag className="w-4 h-4" />
              View My Orders
            </button>
            
            <button
              onClick={onContactSeller}
              className="w-full bg-white border-2 border-[#FF6B00] text-[#FF6B00] hover:bg-[#ffeee3] font-medium py-3 rounded-lg transition-colors duration-200"
            >
              Contact {orderDetails.sellerName}
            </button>
          </div>
        </div>

        {/* Footer Note */}
        <div className="bg-gray-50 px-6 py-4 text-center">
          <p className="text-xs text-gray-600">
            💳 Your payment is secure and will be released to the freelancer only after you approve the completed work
          </p>
        </div>
      </div>
    </div>
  );
};

export default OrderSuccessModal;