import React, { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { doc, getDoc, updateDoc, arrayUnion, Timestamp } from 'firebase/firestore';
import { db } from '../../lib/firebase';
import { useAuth } from '../../contexts/AuthContext';
import { uploadToCloudinary } from '../../lib/cloudinary';
import Modal from '../../components/ui/Modal';
import { 
  Play,
  Upload,
  MessageSquare,
  Calendar,
  CheckCircle,
  Clock,
  AlertCircle,
  FolderOpen,
  DollarSign,
  Star,
  X,
  Link as LinkIcon,
  FileText
} from 'lucide-react';

interface Order {
  id: string;
  orderNumber: string;
  gigId: string;
  gigTitle: string;
  buyerId: string;
  buyerName: string;
  buyerEmail: string;
  sellerId: string;
  sellerName: string;
  packageType: string;
  packageTitle: string;
  price: number;
  serviceFee: number;
  totalAmount: number;
  status: string;
  paymentStatus: string;
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
  deliveryFiles?: DeliveryFile[];
  deliveryLinks?: string[];
  deliveryNote?: string;
  deliveredAt?: any;
  lastRevisionMessage?: string;
  lastRevisionDate?: any;
  completedAt?: any;
}

interface DeliveryFile {
  name: string;
  url: string;
  size: number;
  type: string;
  uploadedAt: any;
}

const ProjectWorkspace: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { currentUser } = useAuth();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('overview');
  const [order, setOrder] = useState<Order | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  // File upload states
  const [uploadingFiles, setUploadingFiles] = useState<File[]>([]);
  const [uploadProgress, setUploadProgress] = useState<{[key: string]: number}>({});
  const [deliveryLink, setDeliveryLink] = useState('');
  const [deliveryNote, setDeliveryNote] = useState('');
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  // Modal states
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

  // Fetch order data from Firebase
  useEffect(() => {
    const fetchOrder = async () => {
      console.log('Fetching order with id:', id);
      console.log('Current user:', currentUser?.uid);
      
      if (!id || !currentUser) {
        console.log('Missing id or currentUser');
        setIsLoading(false);
        return;
      }

      try {
        const orderRef = doc(db, 'orders', id);
        const orderSnap = await getDoc(orderRef);

        console.log('Order exists:', orderSnap.exists());
        
        if (orderSnap.exists()) {
          const orderData = { id: orderSnap.id, ...orderSnap.data() } as Order;
          console.log('Order data:', orderData);
          
          // Verify this order belongs to the current freelancer
          if (orderData.sellerId !== currentUser.uid) {
            console.log('Permission denied - sellerId:', orderData.sellerId, 'currentUser:', currentUser.uid);
            setError('You do not have permission to view this order');
            setIsLoading(false);
            return;
          }

          setOrder(orderData);
        } else {
          console.log('Order not found');
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
  }, [id, currentUser]);

  const formatDate = (timestamp: any) => {
    if (!timestamp) return 'N/A';
    const date = timestamp.toDate ? timestamp.toDate() : new Date(timestamp);
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric' 
    });
  };

  const getTimeRemaining = (dueDate: any) => {
    if (!dueDate) return 'N/A';
    const now = new Date();
    const due = dueDate.toDate ? dueDate.toDate() : new Date(dueDate);
    const diff = due.getTime() - now.getTime();
    const days = Math.ceil(diff / (1000 * 60 * 60 * 24));
    
    if (days < 0) return `${Math.abs(days)} days overdue`;
    if (days === 0) return 'Due today';
    if (days === 1) return '1 day remaining';
    return `${days} days remaining`;
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    setUploadingFiles(prev => [...prev, ...files]);
  };

  const handleRemoveFile = (index: number) => {
    setUploadingFiles(prev => prev.filter((_, i) => i !== index));
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return Math.round(bytes / Math.pow(k, i) * 100) / 100 + ' ' + sizes[i];
  };

  const handleAddLink = () => {
    if (deliveryLink.trim() && id) {
      updateDoc(doc(db, 'orders', id), {
        deliveryLinks: arrayUnion(deliveryLink.trim())
      }).then(() => {
        setDeliveryLink('');
        // Refresh order data
        if (order) {
          setOrder({
            ...order,
            deliveryLinks: [...(order.deliveryLinks || []), deliveryLink.trim()]
          });
        }
      });
    }
  };

  const handleUploadFiles = async () => {
    if (!id || uploadingFiles.length === 0) return;

    setIsUploading(true);
    const uploadedFiles: DeliveryFile[] = [];

    try {
      for (const file of uploadingFiles) {
        setUploadProgress(prev => ({ ...prev, [file.name]: 0 }));
        
        const url = await uploadToCloudinary(file);
        
        uploadedFiles.push({
          name: file.name,
          url: url,
          size: file.size,
          type: file.type,
          uploadedAt: Timestamp.now()
        });

        setUploadProgress(prev => ({ ...prev, [file.name]: 100 }));
      }

      // Update Firebase with uploaded files
      await updateDoc(doc(db, 'orders', id), {
        deliveryFiles: arrayUnion(...uploadedFiles),
        ...(deliveryNote && { deliveryNote })
      });

      // Refresh order data
      if (order) {
        setOrder({
          ...order,
          deliveryFiles: [...(order.deliveryFiles || []), ...uploadedFiles],
          deliveryNote: deliveryNote || order.deliveryNote
        });
      }

      setUploadingFiles([]);
      setDeliveryNote('');
      setUploadProgress({});
      showModal(
        'Upload Successful!',
        'Your files have been uploaded successfully and are ready for delivery.',
        'success'
      );
    } catch (error) {
      console.error('Upload error:', error);
      showModal(
        'Upload Failed',
        'Failed to upload files. Please check your internet connection and try again.',
        'error'
      );
    } finally {
      setIsUploading(false);
    }
  };

  const handleDeliverOrder = async () => {
    if (!id) return;
    
    if (!order?.deliveryFiles?.length && !order?.deliveryLinks?.length) {
      showModal(
        'No Files to Deliver',
        'Please upload files or add links before delivering the order.',
        'warning'
      );
      return;
    }

    showModal(
      'Confirm Delivery',
      'Are you sure you want to deliver this order? The client will be notified and can review your work.',
      'info',
      async () => {
        try {
          await updateDoc(doc(db, 'orders', id), {
            status: 'delivered',
            deliveredAt: Timestamp.now()
          });

          if (order) {
            setOrder({
              ...order,
              status: 'delivered',
              deliveredAt: Timestamp.now()
            });
          }

          showModal(
            'Order Delivered!',
            'Your work has been successfully delivered to the client. They will review it shortly.',
            'success'
          );
          
          setTimeout(() => {
            navigate('/freelancer/orders');
          }, 2000);
        } catch (error) {
          console.error('Delivery error:', error);
          showModal(
            'Delivery Failed',
            'Failed to deliver order. Please try again later.',
            'error'
          );
        }
      }
    );
  };

  const tabs = [
    { id: 'overview', label: 'Overview' },
    { id: 'milestones', label: 'Timeline' },
    { id: 'files', label: 'Delivery' }
  ];

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#ffeee3]/30 flex justify-center items-center pt-20">
        <div className="flex flex-col items-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#FF6B00]"></div>
          <span className="ml-3 mt-4 text-[#2E2E2E]">Loading workspace...</span>
        </div>
      </div>
    );
  }

  if (error || !order) {
    return (
      <div className="min-h-screen bg-[#ffeee3]/30 flex justify-center items-center pt-20">
        <div className="text-center">
          <div className="text-6xl mb-4">⚠️</div>
          <h2 className="text-2xl font-bold text-[#2E2E2E] mb-2">{error || 'Order not found'}</h2>
          <button
            onClick={() => navigate('/freelancer/orders')}
            className="mt-4 bg-[#FF6B00] hover:bg-[#FF9F45] text-white px-6 py-3 rounded-lg font-medium transition-colors"
          >
            Back to Orders
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#ffeee3]/30 pt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 mb-6">
          <div className="flex justify-between items-start mb-4">
            <div className="flex-1">
              <h1 className="text-2xl font-bold text-[#2E2E2E] mb-2">{order.gigTitle}</h1>
              <div className="flex items-center space-x-4 text-sm text-[#2E2E2E]/60">
                <div className="flex items-center space-x-2">
                  <div className="w-6 h-6 rounded-full bg-gray-200 flex items-center justify-center text-xs">
                    {order.buyerName.charAt(0).toUpperCase()}
                  </div>
                  <span>{order.buyerName}</span>
                </div>
                <span>•</span>
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                  order.status === 'in_progress' ? 'bg-blue-100 text-blue-700' :
                  order.status === 'pending' ? 'bg-yellow-100 text-yellow-700' :
                  order.status === 'accepted' ? 'bg-green-100 text-green-700' :
                  order.status === 'completed' ? 'bg-purple-100 text-purple-700' :
                  'bg-gray-100 text-gray-700'
                }`}>
                  {order.status.replace('_', ' ').replace(/\b\w/g, l => l.toUpperCase())}
                </span>
              </div>
            </div>
            
            <div className="flex space-x-3">
              <button 
                onClick={() => navigate('/freelancer/orders')}
                className="border border-gray-300 text-[#2E2E2E] hover:bg-gray-50 px-4 py-2 rounded-lg font-medium transition-colors"
              >
                Back to Orders
              </button>
              <button 
                onClick={() => navigate('/freelancer/messages')}
                className="border border-[#FF6B00] text-[#FF6B00] hover:bg-[#ffeee3] px-4 py-2 rounded-lg font-medium transition-colors flex items-center"
              >
                <MessageSquare className="w-4 h-4 mr-2" />
                Message Client
              </button>
            </div>
          </div>

          {/* Project Stats */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="bg-[#ffeee3] p-4 rounded-lg">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-[#2E2E2E]/70">Order Amount</span>
                <DollarSign className="w-4 h-4 text-[#FF6B00]" />
              </div>
              <p className="text-xl font-bold text-[#2E2E2E]">${order.totalAmount.toFixed(2)}</p>
              <p className="text-xs text-[#2E2E2E]/60 mt-1">${order.price} + ${order.serviceFee.toFixed(2)} fee</p>
            </div>
            
            <div className="bg-green-50 p-4 rounded-lg">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-[#2E2E2E]/70">Package</span>
                <CheckCircle className="w-4 h-4 text-green-600" />
              </div>
              <p className="text-xl font-bold text-[#2E2E2E]">{order.packageType.toUpperCase()}</p>
              <p className="text-xs text-[#2E2E2E]/60 mt-1">{order.packageTitle}</p>
            </div>
            
            <div className="bg-blue-50 p-4 rounded-lg">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-[#2E2E2E]/70">Revisions</span>
                <Star className="w-4 h-4 text-blue-600" />
              </div>
              <p className="text-xl font-bold text-[#2E2E2E]">{order.revisionCount}/{order.maxRevisions}</p>
              <p className="text-xs text-[#2E2E2E]/60 mt-1">{order.maxRevisions - order.revisionCount} remaining</p>
            </div>
            
            <div className="bg-yellow-50 p-4 rounded-lg">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-[#2E2E2E]/70">Delivery</span>
                <Calendar className="w-4 h-4 text-yellow-600" />
              </div>
              <p className="text-xl font-bold text-[#2E2E2E]">{order.deliveryTime} days</p>
              <p className="text-xs text-[#2E2E2E]/60 mt-1">{getTimeRemaining(order.expectedDeliveryDate)}</p>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="border-b border-gray-200">
            <nav className="flex space-x-8 px-6">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                    activeTab === tab.id
                      ? 'border-[#FF6B00] text-[#FF6B00]'
                      : 'border-transparent text-[#2E2E2E]/60 hover:text-[#2E2E2E] hover:border-gray-300'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </nav>
          </div>

          <div className="p-6">
            {/* Overview Tab */}
            {activeTab === 'overview' && (
              <div className="space-y-6">
                {/* Order Information */}
                <div>
                  <h3 className="text-lg font-semibold text-[#2E2E2E] mb-3">Order Information</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <h4 className="font-medium text-[#2E2E2E] mb-2">Order Number</h4>
                      <p className="text-[#2E2E2E]/70">#{order.orderNumber}</p>
                    </div>
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <h4 className="font-medium text-[#2E2E2E] mb-2">Ordered On</h4>
                      <p className="text-[#2E2E2E]/70">{formatDate(order.createdAt)}</p>
                    </div>
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <h4 className="font-medium text-[#2E2E2E] mb-2">Payment Status</h4>
                      <p className="text-[#2E2E2E]/70 capitalize">{order.paymentStatus}</p>
                    </div>
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <h4 className="font-medium text-[#2E2E2E] mb-2">Due Date</h4>
                      <p className="text-[#2E2E2E]/70">{formatDate(order.expectedDeliveryDate)}</p>
                    </div>
                  </div>
                </div>

                {/* Requirements */}
                {order.requirements && (
                  <div>
                    <h3 className="text-lg font-semibold text-[#2E2E2E] mb-3">Client Requirements</h3>
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <p className="text-[#2E2E2E]/70 whitespace-pre-wrap">{order.requirements}</p>
                    </div>
                  </div>
                )}

                {/* Package Features */}
                {order.features && order.features.length > 0 && (
                  <div>
                    <h3 className="text-lg font-semibold text-[#2E2E2E] mb-3">Package Features</h3>
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <ul className="space-y-2">
                        {order.features.map((feature, index) => (
                          <li key={index} className="flex items-start gap-2 text-[#2E2E2E]/70">
                            <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                            <span>{feature}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                )}

                {/* Client Information */}
                <div>
                  <h3 className="text-lg font-semibold text-[#2E2E2E] mb-3">Client Information</h3>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-full bg-[#FF6B00] flex items-center justify-center text-white font-semibold text-lg">
                        {order.buyerName.charAt(0).toUpperCase()}
                      </div>
                      <div>
                        <h4 className="font-medium text-[#2E2E2E]">{order.buyerName}</h4>
                        <p className="text-sm text-[#2E2E2E]/60">{order.buyerEmail}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Milestones Tab */}
            {activeTab === 'milestones' && (
              <div className="space-y-4">
                <div className="bg-gray-50 p-6 rounded-lg text-center">
                  <Calendar className="w-12 h-12 text-[#2E2E2E]/40 mx-auto mb-3" />
                  <h3 className="text-lg font-semibold text-[#2E2E2E] mb-2">Order Timeline</h3>
                  <div className="space-y-4 mt-6 text-left max-w-2xl mx-auto">
                    <div className="flex items-start gap-4">
                      <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0">
                        <CheckCircle className="w-5 h-5 text-green-600" />
                      </div>
                      <div className="flex-1">
                        <h4 className="font-medium text-[#2E2E2E]">Order Placed</h4>
                        <p className="text-sm text-[#2E2E2E]/60">{formatDate(order.createdAt)}</p>
                      </div>
                    </div>
                    
                    {(order.status === 'accepted' || order.status === 'in_progress' || order.status === 'revision_requested' || order.status === 'delivered' || order.status === 'completed') && (
                      <div className="flex items-start gap-4">
                        <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0">
                          <CheckCircle className="w-5 h-5 text-green-600" />
                        </div>
                        <div className="flex-1">
                          <h4 className="font-medium text-[#2E2E2E]">Order Accepted</h4>
                          <p className="text-sm text-[#2E2E2E]/60">Work confirmed by seller</p>
                        </div>
                      </div>
                    )}

                    {(order.status === 'in_progress' || order.status === 'revision_requested' || order.status === 'delivered' || order.status === 'completed') && (
                      <div className="flex items-start gap-4">
                        <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0">
                          <Play className="w-5 h-5 text-blue-600" />
                        </div>
                        <div className="flex-1">
                          <h4 className="font-medium text-[#2E2E2E]">Work in Progress</h4>
                          <p className="text-sm text-[#2E2E2E]/60">Actively working on your order</p>
                        </div>
                      </div>
                    )}

                    {(order.status === 'delivered' || order.status === 'completed') && (
                      <div className="flex items-start gap-4">
                        <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0">
                          <CheckCircle className="w-5 h-5 text-green-600" />
                        </div>
                        <div className="flex-1">
                          <h4 className="font-medium text-[#2E2E2E]">Work Delivered</h4>
                          <p className="text-sm text-[#2E2E2E]/60">
                            {order.deliveredAt ? `Delivered on ${formatDate(order.deliveredAt)}` : 'Work delivered successfully'}
                          </p>
                        </div>
                      </div>
                    )}

                    {order.status === 'completed' && (
                      <div className="flex items-start gap-4">
                        <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0">
                          <CheckCircle className="w-5 h-5 text-green-600" />
                        </div>
                        <div className="flex-1">
                          <h4 className="font-medium text-[#2E2E2E]">Order Completed</h4>
                          <p className="text-sm text-[#2E2E2E]/60">Client approved the work</p>
                        </div>
                      </div>
                    )}

                    {order.status !== 'delivered' && order.status !== 'completed' && (
                      <div className="flex items-start gap-4">
                        <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center flex-shrink-0">
                          <Clock className="w-4 h-4 text-gray-400" />
                        </div>
                        <div className="flex-1">
                          <h4 className="font-medium text-[#2E2E2E]/60">Delivery</h4>
                          <p className="text-sm text-[#2E2E2E]/40">Expected by {formatDate(order.expectedDeliveryDate)}</p>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )}

            {/* Files Tab */}
            {activeTab === 'files' && (
              <div>
                <div className="flex justify-between items-center mb-6">
                  <h3 className="text-lg font-semibold text-[#2E2E2E]">Delivery Files</h3>
                  <button 
                    onClick={() => fileInputRef.current?.click()}
                    className="bg-[#FF6B00] hover:bg-[#FF9F45] text-white px-4 py-2 rounded-lg font-medium transition-colors flex items-center"
                  >
                    <Upload className="w-4 h-4 mr-2" />
                    Upload Deliverables
                  </button>
                  <input
                    ref={fileInputRef}
                    type="file"
                    multiple
                    onChange={handleFileSelect}
                    className="hidden"
                    accept=".zip,.pdf,.png,.jpg,.jpeg,.mp4,.psd,.ai,.fig"
                  />
                </div>

                {/* Upload Area */}
                <div 
                  onClick={() => fileInputRef.current?.click()}
                  className="border-2 border-dashed border-gray-300 rounded-lg p-12 text-center mb-6 hover:border-[#FF6B00] transition-colors cursor-pointer"
                >
                  <Upload className="w-12 h-12 text-[#2E2E2E]/40 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-[#2E2E2E] mb-2">Upload Your Work</h3>
                  <p className="text-[#2E2E2E]/60 mb-4">Drag and drop files here or click to browse</p>
                  <button 
                    onClick={(e) => {
                      e.stopPropagation();
                      fileInputRef.current?.click();
                    }}
                    className="bg-[#FF6B00] hover:bg-[#FF9F45] text-white px-6 py-2 rounded-lg font-medium transition-colors"
                  >
                    Choose Files
                  </button>
                  <p className="text-sm text-[#2E2E2E]/40 mt-4">Supported formats: ZIP, PDF, PNG, JPG, MP4, PSD, AI, FIGMA (Max 500MB)</p>
                </div>

                {/* Files to Upload */}
                {uploadingFiles.length > 0 && (
                  <div className="mb-6">
                    <h4 className="font-medium text-[#2E2E2E] mb-3">Files to Upload ({uploadingFiles.length})</h4>
                    <div className="space-y-2">
                      {uploadingFiles.map((file, index) => (
                        <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                          <div className="flex items-center gap-3 flex-1">
                            <FileText className="w-5 h-5 text-[#FF6B00]" />
                            <div className="flex-1">
                              <p className="font-medium text-[#2E2E2E]">{file.name}</p>
                              <p className="text-sm text-[#2E2E2E]/60">{formatFileSize(file.size)}</p>
                              {uploadProgress[file.name] !== undefined && (
                                <div className="mt-2 bg-gray-200 rounded-full h-2 w-full">
                                  <div 
                                    className="bg-[#FF6B00] h-2 rounded-full transition-all"
                                    style={{ width: `${uploadProgress[file.name]}%` }}
                                  />
                                </div>
                              )}
                            </div>
                          </div>
                          <button
                            onClick={() => handleRemoveFile(index)}
                            className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                          >
                            <X className="w-4 h-4" />
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Add Link Option */}
                <div className="mb-6">
                  <h4 className="font-medium text-[#2E2E2E] mb-3">Or Share via Link (Optional)</h4>
                  <div className="flex gap-3">
                    <div className="flex-1 relative">
                      <LinkIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                      <input
                        type="url"
                        value={deliveryLink}
                        onChange={(e) => setDeliveryLink(e.target.value)}
                        placeholder="Paste Google Drive, Dropbox, or any file sharing link"
                        className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF6B00] focus:border-transparent"
                      />
                    </div>
                    <button
                      onClick={handleAddLink}
                      disabled={!deliveryLink.trim()}
                      className="bg-[#FF6B00] hover:bg-[#FF9F45] disabled:bg-gray-300 disabled:cursor-not-allowed text-white px-6 py-3 rounded-lg font-medium transition-colors"
                    >
                      Add Link
                    </button>
                  </div>
                  
                  {/* Display added links */}
                  {order?.deliveryLinks && order.deliveryLinks.length > 0 && (
                    <div className="mt-4 space-y-2">
                      {order.deliveryLinks.map((link, index) => (
                        <div key={index} className="flex items-center gap-2 p-2 bg-blue-50 rounded-lg">
                          <LinkIcon className="w-4 h-4 text-blue-600" />
                          <a 
                            href={link} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="text-blue-600 hover:underline text-sm flex-1 truncate"
                          >
                            {link}
                          </a>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* Delivery Note */}
                <div className="mb-6">
                  <h4 className="font-medium text-[#2E2E2E] mb-3">Delivery Note (Optional)</h4>
                  <textarea
                    value={deliveryNote}
                    onChange={(e) => setDeliveryNote(e.target.value)}
                    placeholder="Add any notes or instructions for the client..."
                    className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#FF6B00] focus:border-transparent resize-none"
                    rows={4}
                  />
                </div>

                {/* Upload Button */}
                {uploadingFiles.length > 0 && (
                  <div className="mb-6">
                    <button
                      onClick={handleUploadFiles}
                      disabled={isUploading}
                      className="w-full bg-green-600 hover:bg-green-700 disabled:bg-gray-300 disabled:cursor-not-allowed text-white px-6 py-3 rounded-lg font-medium transition-colors flex items-center justify-center"
                    >
                      <Upload className="w-5 h-5 mr-2" />
                      {isUploading ? 'Uploading...' : `Upload ${uploadingFiles.length} File${uploadingFiles.length > 1 ? 's' : ''}`}
                    </button>
                  </div>
                )}

                {/* Uploaded Files List */}
                {order?.status === 'delivered' || order?.status === 'completed' || order?.status === 'revision_requested' ? (
                  // Show delivered work
                  <div className="space-y-6">
                    {order.status === 'revision_requested' ? (
                      <div className="bg-orange-50 border-2 border-orange-200 rounded-lg p-4">
                        <div className="flex items-center gap-2 mb-2">
                          <AlertCircle className="w-5 h-5 text-orange-600" />
                          <h4 className="font-semibold text-orange-900">Revision Requested</h4>
                        </div>
                        <p className="text-sm text-orange-700 mb-3">
                          The client has requested changes to your delivery.
                        </p>
                        {(order as any).lastRevisionMessage && (
                          <div className="bg-white border border-orange-200 rounded-lg p-3 mt-2">
                            <p className="text-sm font-medium text-orange-900 mb-1">Client's Message:</p>
                            <p className="text-sm text-[#2E2E2E]/80">{(order as any).lastRevisionMessage}</p>
                          </div>
                        )}
                        {(order as any).lastRevisionDate && (
                          <p className="text-xs text-orange-600 mt-2">
                            Requested on {formatDate((order as any).lastRevisionDate)}
                          </p>
                        )}
                      </div>
                    ) : (
                      <div className="bg-green-50 border-2 border-green-200 rounded-lg p-4">
                        <div className="flex items-center gap-2 mb-2">
                          <CheckCircle className="w-5 h-5 text-green-600" />
                          <h4 className="font-semibold text-green-900">Delivered Work</h4>
                        </div>
                        <p className="text-sm text-green-700">
                          Delivered on {order.deliveredAt && formatDate(order.deliveredAt)}
                        </p>
                        {order.status === 'completed' && order.completedAt && (
                          <p className="text-sm text-green-700 mt-1">
                            Completed on {formatDate(order.completedAt)}
                          </p>
                        )}
                      </div>
                    )}

                    {/* Delivered Files */}
                    {order?.deliveryFiles && order.deliveryFiles.length > 0 && (
                      <div>
                        <h4 className="font-medium text-[#2E2E2E] mb-3">Delivered Files ({order.deliveryFiles.length})</h4>
                        <div className="space-y-2">
                          {order.deliveryFiles.map((file, index) => (
                            <div key={index} className="flex items-center justify-between p-4 bg-white border border-green-200 rounded-lg">
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
                                className="text-[#FF6B00] hover:text-[#FF9F45] font-medium flex items-center gap-1"
                              >
                                View
                              </a>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Delivered Links */}
                    {order?.deliveryLinks && order.deliveryLinks.length > 0 && (
                      <div>
                        <h4 className="font-medium text-[#2E2E2E] mb-3">Shared Links ({order.deliveryLinks.length})</h4>
                        <div className="space-y-2">
                          {order.deliveryLinks.map((link, index) => (
                            <div key={index} className="flex items-center gap-3 p-4 bg-white border border-green-200 rounded-lg">
                              <LinkIcon className="w-5 h-5 text-green-600" />
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
                    {order?.deliveryNote && (
                      <div>
                        <h4 className="font-medium text-[#2E2E2E] mb-3">Delivery Note</h4>
                        <div className="p-4 bg-white border border-green-200 rounded-lg">
                          <p className="text-[#2E2E2E]/70 whitespace-pre-wrap">{order.deliveryNote}</p>
                        </div>
                      </div>
                    )}
                  </div>
                ) : (
                  // Show upload interface for in-progress orders
                  <div className="space-y-4">
                    <h4 className="font-medium text-[#2E2E2E]">Uploaded Files ({order?.deliveryFiles?.length || 0})</h4>
                    {order?.deliveryFiles && order.deliveryFiles.length > 0 ? (
                      <div className="space-y-2">
                        {order.deliveryFiles.map((file, index) => (
                          <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
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
                              className="text-[#FF6B00] hover:text-[#FF9F45] font-medium"
                            >
                              View
                            </a>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="text-center py-12 bg-gray-50 rounded-lg">
                        <FolderOpen className="w-12 h-12 text-[#2E2E2E]/40 mx-auto mb-3" />
                        <p className="text-[#2E2E2E]/60">No files uploaded yet</p>
                        <p className="text-sm text-[#2E2E2E]/40 mt-1">Upload your completed work to deliver the order</p>
                      </div>
                    )}
                  </div>
                )}

                {/* Deliver Order Button */}
                {order?.status === 'in_progress' && (order?.deliveryFiles?.length || order?.deliveryLinks?.length) && (
                  <div className="mt-6">
                    <button
                      onClick={handleDeliverOrder}
                      className="w-full bg-green-600 hover:bg-green-700 text-white px-6 py-4 rounded-lg font-semibold transition-colors flex items-center justify-center text-lg"
                    >
                      <CheckCircle className="w-6 h-6 mr-2" />
                      Deliver Order to Client
                    </button>
                  </div>
                )}

                {/* Resubmit Revision Button */}
                {order?.status === 'revision_requested' && (
                  <div className="mt-6">
                    <button
                      onClick={handleDeliverOrder}
                      className="w-full bg-[#FF6B00] hover:bg-[#FF9F45] text-white px-6 py-4 rounded-lg font-semibold transition-colors flex items-center justify-center text-lg"
                    >
                      <Upload className="w-6 h-6 mr-2" />
                      Resubmit Work (Address Revision)
                    </button>
                  </div>
                )}

                {/* Delivery Instructions */}
                <div className="mt-6 bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <div className="flex items-start gap-3">
                    <AlertCircle className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                    <div>
                      <h4 className="font-medium text-blue-900 mb-1">Delivery Guidelines</h4>
                      <ul className="text-sm text-blue-800 space-y-1">
                        <li>• Upload all source files and final deliverables</li>
                        <li>• You can also share files via Google Drive, Dropbox, or WeTransfer links</li>
                        <li>• Include a brief description or instructions with your delivery</li>
                        <li>• Ensure files are properly organized and named</li>
                        <li>• Client can request revisions if needed ({order.revisionCount}/{order.maxRevisions} revisions remaining)</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            )}

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
    </div>
  );
};

export default ProjectWorkspace;
