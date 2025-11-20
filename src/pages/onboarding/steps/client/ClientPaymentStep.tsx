import React, { useState } from 'react';
import { CreditCard, Lock, Plus, X } from 'lucide-react';

interface ClientPaymentStepProps {
  user: any;
  onNext: (data?: any) => void;
  onBack: () => void;
}

interface PaymentMethod {
  id: string;
  type: 'credit_card' | 'paypal';
  name: string;
  isDefault: boolean;
  last4?: string;
  expiryMonth?: string;
  expiryYear?: string;
  brand?: string;
  email?: string;
}

const ClientPaymentStep: React.FC<ClientPaymentStepProps> = ({ 
  onNext, 
  onBack 
}) => {
  // Demo payment methods
  const [paymentMethods, setPaymentMethods] = useState<PaymentMethod[]>([]);
  const [showAddCard, setShowAddCard] = useState(paymentMethods.length === 0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  // New card form state
  const [newCard, setNewCard] = useState({
    cardNumber: '',
    cardholderName: '',
    expiryMonth: '',
    expiryYear: '',
    cvv: '',
    saveCard: true
  });
  
  // Card form validation
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleCardInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    
    if (name === 'cardNumber') {
      // Format card number with spaces
      const formattedValue = value
        .replace(/\s/g, '')
        .replace(/(\d{4})/g, '$1 ')
        .trim()
        .slice(0, 19);
      
      setNewCard({ ...newCard, [name]: formattedValue });
    } else if (name === 'saveCard') {
      setNewCard({ ...newCard, [name]: (e.target as HTMLInputElement).checked });
    } else {
      setNewCard({ ...newCard, [name]: value });
    }
    
    // Clear error when field is edited
    if (errors[name]) {
      setErrors({ ...errors, [name]: '' });
    }
  };

  const validateCardForm = () => {
    const newErrors: Record<string, string> = {};
    
    // Basic validation - in a real app this would be more sophisticated
    if (!newCard.cardNumber.replace(/\s/g, '').match(/^\d{16}$/)) {
      newErrors.cardNumber = 'Please enter a valid 16-digit card number';
    }
    
    if (!newCard.cardholderName) {
      newErrors.cardholderName = 'Please enter the cardholder name';
    }
    
    if (!newCard.expiryMonth) {
      newErrors.expiryMonth = 'Required';
    }
    
    if (!newCard.expiryYear) {
      newErrors.expiryYear = 'Required';
    }
    
    if (!newCard.cvv.match(/^\d{3,4}$/)) {
      newErrors.cvv = 'Enter a valid CVV';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleAddCard = () => {
    if (!validateCardForm()) return;
    
    setIsSubmitting(true);
    
    // In a real app, this would make an API call to a payment processor
    setTimeout(() => {
      // Create a new payment method
      const newPaymentMethod: PaymentMethod = {
        id: `card_${Date.now()}`,
        type: 'credit_card',
        name: newCard.cardholderName,
        isDefault: paymentMethods.length === 0 ? true : false,
        last4: newCard.cardNumber.replace(/\s/g, '').slice(-4),
        expiryMonth: newCard.expiryMonth,
        expiryYear: newCard.expiryYear,
        brand: getCardBrand(newCard.cardNumber)
      };
      
      setPaymentMethods([...paymentMethods, newPaymentMethod]);
      setShowAddCard(false);
      setIsSubmitting(false);
      
      // Reset form
      setNewCard({
        cardNumber: '',
        cardholderName: '',
        expiryMonth: '',
        expiryYear: '',
        cvv: '',
        saveCard: true
      });
    }, 1500);
  };

  const handleAddPayPal = () => {
    // In a real app, this would integrate with PayPal
    alert('PayPal integration would be implemented here');
  };

  const handleRemovePaymentMethod = (id: string) => {
    const updatedMethods = paymentMethods.filter(method => method.id !== id);
    setPaymentMethods(updatedMethods);
    
    // If we removed the default method, set the first one as default
    if (paymentMethods.find(method => method.id === id)?.isDefault && updatedMethods.length > 0) {
      setPaymentMethods(updatedMethods.map((method, index) => 
        index === 0 ? { ...method, isDefault: true } : method
      ));
    }
    
    // If no payment methods left, show add card form
    if (updatedMethods.length === 0) {
      setShowAddCard(true);
    }
  };

  const handleSetDefault = (id: string) => {
    setPaymentMethods(paymentMethods.map(method => ({
      ...method,
      isDefault: method.id === id
    })));
  };

  const getCardBrand = (cardNumber: string): string => {
    const firstDigit = cardNumber.replace(/\s/g, '').charAt(0);
    
    switch (firstDigit) {
      case '4':
        return 'Visa';
      case '5':
        return 'Mastercard';
      case '3':
        return 'American Express';
      case '6':
        return 'Discover';
      default:
        return 'Unknown';
    }
  };

  const getYears = () => {
    const currentYear = new Date().getFullYear();
    const years = [];
    for (let i = 0; i < 10; i++) {
      years.push(currentYear + i);
    }
    return years;
  };

  const handleSubmit = () => {
    // This step is technically optional
    onNext({ paymentMethods });
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-2">Payment Setup</h2>
      <p className="text-[#2E2E2E] mb-8">
        Add a payment method to easily pay freelancers for their services.
        <br />
        <span className="text-sm text-[#FF6B00]">(You can skip this step and add payment methods later)</span>
      </p>
      
      {/* Payment Methods List */}
      {paymentMethods.length > 0 && (
        <div className="bg-white border border-[#ffeee3] rounded-lg p-6 mb-6">
          <h3 className="text-lg font-medium mb-4">Your Payment Methods</h3>
          
          <div className="space-y-4">
            {paymentMethods.map(method => (
              <div 
                key={method.id} 
                className="border border-[#ffeee3] rounded-lg p-4 flex items-center justify-between"
              >
                <div className="flex items-center">
                  {method.type === 'credit_card' && (
                    <>
                      <div className="w-12 h-8 bg-[#ffeee3] rounded-md flex items-center justify-center mr-4">
                        {method.brand === 'Visa' && <span className="text-[#2E2E2E] font-bold text-sm">VISA</span>}
                        {method.brand === 'Mastercard' && <span className="text-[#FF6B00] font-bold text-sm">MC</span>}
                        {method.brand === 'American Express' && <span className="text-[#FF6B00] font-bold text-sm">AMEX</span>}
                        {method.brand === 'Discover' && <span className="text-[#FF6B00] font-bold text-sm">DISC</span>}
                        {(!method.brand || method.brand === 'Unknown') && <CreditCard size={20} className="text-[#2E2E2E]" />}
                      </div>
                      <div>
                        <div className="flex items-center">
                          <span className="font-medium">â€¢â€¢â€¢â€¢  â€¢â€¢â€¢â€¢  â€¢â€¢â€¢â€¢  {method.last4}</span>
                          {method.isDefault && (
                            <span className="ml-2 bg-[#ffeee3] text-[#2E2E2E] text-xs px-2 py-0.5 rounded-full">
                              Default
                            </span>
                          )}
                        </div>
                        <div className="text-sm text-[#2E2E2E]">
                          Expires {method.expiryMonth}/{method.expiryYear}
                        </div>
                      </div>
                    </>
                  )}
                  
                  {method.type === 'paypal' && (
                    <>
                      <div className="w-12 h-8 bg-[#ffeee3] rounded-md flex items-center justify-center mr-4">
                        <span className="text-[#2E2E2E] font-bold text-sm">PP</span>
                      </div>
                      <div>
                        <div className="flex items-center">
                          <span className="font-medium">PayPal - {method.email}</span>
                          {method.isDefault && (
                            <span className="ml-2 bg-[#ffeee3] text-[#2E2E2E] text-xs px-2 py-0.5 rounded-full">
                              Default
                            </span>
                          )}
                        </div>
                      </div>
                    </>
                  )}
                </div>
                
                <div className="flex items-center">
                  {!method.isDefault && (
                    <button 
                      onClick={() => handleSetDefault(method.id)}
                      className="text-[#FF6B00] hover:text-[#2E2E2E] text-sm mr-4"
                    >
                      Set as default
                    </button>
                  )}
                  <button 
                    onClick={() => handleRemovePaymentMethod(method.id)}
                    className="text-[#FF6B00] hover:text-[#2E2E2E]"
                  >
                    <X size={18} />
                  </button>
                </div>
              </div>
            ))}
          </div>
          
          <button
            onClick={() => setShowAddCard(!showAddCard)}
            className="mt-4 text-[#FF6B00] hover:text-[#2E2E2E] flex items-center text-sm font-medium"
          >
            <Plus size={16} className="mr-1" />
            {showAddCard ? 'Cancel' : 'Add Payment Method'}
          </button>
        </div>
      )}
      
      {/* Add Payment Method Form */}
      {showAddCard && (
        <div className="bg-white border border-[#ffeee3] rounded-lg p-6 mb-6">
          <h3 className="text-lg font-medium mb-4">Add Payment Method</h3>
          
          <div className="flex space-x-4 mb-6">
            <button
              className="flex-1 bg-[#ffeee3] border border-[#ffeee3] rounded-md py-3 text-[#FF6B00] font-medium flex items-center justify-center"
              disabled
            >
              <CreditCard size={18} className="mr-2" />
              Credit Card
            </button>
            <button
              onClick={handleAddPayPal}
              className="flex-1 border border-[#ffeee3] rounded-md py-3 text-[#2E2E2E] font-medium flex items-center justify-center hover:bg-[#ffeee3] transition-colors"
            >
              <svg className="w-4 h-4 mr-2" viewBox="0 0 24 24" fill="#003087">
                <path d="M19.554 9.488c.121.563.106 1.246-.04 2.051-.582 2.978-2.477 4.466-5.683 4.466h-.442a.666.666 0 0 0-.444.166.72.72 0 0 0-.224.425l-.02.083-.205 1.285-.009.06-.09.572a.647.647 0 0 1-.143.315.476.476 0 0 1-.333.14H8.154a.264.264 0 0 1-.147-.37.264.264 0 0 1-.076-.129l.004-.003.717-4.54.1.1a.735.735 0 0 1 .182-.425.705.705 0 0 1 .466-.2h.97c1.16 0 2.108-.251 2.826-.754.716-.503 1.208-1.261 1.475-2.276a4.316 4.316 0 0 0 .157-1.676 3.308 3.308 0 0 0-.068-.5.651.651 0 0 0-.12-.24l.002.001a.865.865 0 0 1-.126-.27c.49.046 1.04.225 1.373.413.415.234.696.57.784 1.017zm-7.628 1.214l.008-.049.073-.396.029-.222v-.118a.656.656 0 0 0-.12-.388.495.495 0 0 0-.373-.17h-2.63a.522.522 0 0 0-.344.114.812.812 0 0 0-.232.332l-.775 4.932v.022a.192.192 0 0 1-.055.098.144.144 0 0 1-.11.044h-1.65l-.326 2.024a.169.169 0 0 1-.063.114.184.184 0 0 1-.118.044H3.156a.15.15 0 0 1-.095-.027.116.116 0 0 1-.04-.095l.85-5.383c.015-.101.05-.19.1-.267a.55.55 0 0 1 .215-.184l.072-.03.061-.017h2.49a7.04 7.04 0 0 1 .95-.062c.323-.002.6.027.84.088a2.217 2.217 0 0 1 .7.274c.208.144.362.345.457.599.086.236.13.521.13.855v.27c0 .042-.005.125-.016.249zm-1.433-3.858c1.657 0 2.895.285 3.68.848.586.429.883 1.078.883 1.949 0 .517-.049.983-.157 1.417-.103.434-.265.871-.487 1.311-.236.448-.481.838-.736 1.158-.259.325-.587.622-.984.889-.32.214-.705.398-1.144.548-.452.149-.933.223-1.453.223h-.238a2.59 2.59 0 0 1-.435.039H5.733l-.92 5.847H2L4.394 6.843H10.493zM21 4.563v.013l-.014-.007A.75.75 0 0 0 20.387 4c-.058-.003-.538-.026-1.194.107-.656.132-1.238.45-1.738.95-.498.498-.853 1.187-1.05 2.07-.193.86-.193 1.765.003 2.714.198.95.555 1.74 1.07 2.376.516.632 1.137 1.106 1.868 1.416.753.315 1.53.47 2.337.47.68 0 1.425-.114 2.233-.349L24 13.763c.005-.23.02-.01.016-.005a.775.775 0 0 0 .432-.589c.01-.021.014-.044.017-.067L26 4.563H21zm.364 2.22.008.029-.006-.015a.375.375 0 0 0-.272-.294.8.8 0 0 0-.565.037c-.162.076-.308.195-.434.352-.115.151-.207.331-.274.532-.064.191-.11.387-.141.586a3.69 3.69 0 0 0-.05.63c0 .203.017.391.05.565.035.183.094.346.177.5.081.143.198.269.345.374.148.107.334.18.56.214.15 0 .304-.05.46-.151a1.24 1.24 0 0 0 .37-.396c.098-.161.176-.35.23-.558.059-.214.094-.43.107-.65.015-.025.02-.05.026-.076h1.486a3.22 3.22 0 0 1-.524 1.657c-.161.239-.35.454-.567.645-.212.188-.465.336-.752.446-.28.108-.592.164-.934.17h-.054c-.377 0-.71-.055-1.003-.164a2.195 2.195 0 0 1-.793-.467 2.206 2.206 0 0 1-.527-.734 2.425 2.425 0 0 1-.192-.972c0-.4.05-.77.155-1.113.101-.333.246-.632.437-.899.192-.264.424-.495.698-.69.27-.193.574-.342.911-.446.332-.102.693-.153 1.082-.153h.054c.28 0 .537.03.773.088.246.07.458.155.643.264.176.102.33.23.459.386.12.149.21.314.277.5.067.18.11.382.131.607l-.15.042h-1.485z" />
              </svg>
              PayPal
            </button>
          </div>
          
          <div className="space-y-4">
            <div>
              <label htmlFor="cardNumber" className="block text-sm font-medium text-[#2E2E2E] mb-1">
                Card Number
              </label>
              <input
                type="text"
                id="cardNumber"
                name="cardNumber"
                value={newCard.cardNumber}
                onChange={handleCardInputChange}
                placeholder="1234 5678 9012 3456"
                maxLength={19}
                className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#FF6B00] focus:outline-none ${
                  errors.cardNumber ? 'border-[#FF6B00]' : 'border-[#ffeee3]'
                }`}
                aria-invalid={!!errors.cardNumber}
              />
              {errors.cardNumber && <p className="mt-1 text-sm text-[#FF6B00]">{errors.cardNumber}</p>}
            </div>
            
            <div>
              <label htmlFor="cardholderName" className="block text-sm font-medium text-[#2E2E2E] mb-1">
                Cardholder Name
              </label>
              <input
                type="text"
                id="cardholderName"
                name="cardholderName"
                value={newCard.cardholderName}
                onChange={handleCardInputChange}
                placeholder="John Smith"
                className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#FF6B00] focus:outline-none ${
                  errors.cardholderName ? 'border-[#FF6B00]' : 'border-[#ffeee3]'
                }`}
                aria-invalid={!!errors.cardholderName}
              />
              {errors.cardholderName && <p className="mt-1 text-sm text-[#FF6B00]">{errors.cardholderName}</p>}
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-[#2E2E2E] mb-1">
                  Expiration Date
                </label>
                <div className="flex gap-2">
                  <div className="w-1/2">
                    <select
                      name="expiryMonth"
                      value={newCard.expiryMonth}
                      onChange={handleCardInputChange}
                      className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-[#FF6B00] focus:outline-none ${
                        errors.expiryMonth ? 'border-[#FF6B00]' : 'border-[#ffeee3]'
                      }`}
                      aria-invalid={!!errors.expiryMonth}
                    >
                      <option value="">Month</option>
                      {Array.from({ length: 12 }, (_, i) => {
                        const month = i + 1;
                        return (
                          <option key={month} value={month.toString().padStart(2, '0')}>
                            {month.toString().padStart(2, '0')}
                          </option>
                        );
                      })}
                    </select>
                    {errors.expiryMonth && <p className="mt-1 text-xs text-[#FF6B00]">{errors.expiryMonth}</p>}
                  </div>
                  <div className="w-1/2">
                    <select
                      name="expiryYear"
                      value={newCard.expiryYear}
                      onChange={handleCardInputChange}
                      className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-[#FF6B00] focus:outline-none ${
                        errors.expiryYear ? 'border-[#FF6B00]' : 'border-[#ffeee3]'
                      }`}
                      aria-invalid={!!errors.expiryYear}
                    >
                      <option value="">Year</option>
                      {getYears().map(year => (
                        <option key={year} value={year.toString().substr(-2)}>
                          {year}
                        </option>
                      ))}
                    </select>
                    {errors.expiryYear && <p className="mt-1 text-xs text-[#FF6B00]">{errors.expiryYear}</p>}
                  </div>
                </div>
              </div>
              
              <div>
                <label htmlFor="cvv" className="block text-sm font-medium text-[#2E2E2E] mb-1">
                  Security Code (CVV)
                </label>
                <input
                  type="text"
                  id="cvv"
                  name="cvv"
                  value={newCard.cvv}
                  onChange={handleCardInputChange}
                  placeholder="123"
                  maxLength={4}
                  className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#FF6B00] focus:outline-none ${
                    errors.cvv ? 'border-[#FF6B00]' : 'border-[#ffeee3]'
                  }`}
                  aria-invalid={!!errors.cvv}
                />
                {errors.cvv && <p className="mt-1 text-sm text-[#FF6B00]">{errors.cvv}</p>}
              </div>
            </div>
            
            <div className="flex items-center mt-4">
              <input
                type="checkbox"
                id="saveCard"
                name="saveCard"
                checked={newCard.saveCard}
                onChange={handleCardInputChange}
                className="h-4 w-4 text-[#FF6B00] border-[#ffeee3] rounded"
              />
              <label htmlFor="saveCard" className="ml-2 block text-sm text-[#2E2E2E]">
                Save this card for future payments
              </label>
            </div>
            
            <div className="flex items-center text-sm text-[#2E2E2E] mt-4">
              <Lock size={16} className="mr-2 text-[#ffeee3]" /> 
              Your payment information is securely encrypted
            </div>
            
            <button
              onClick={handleAddCard}
              disabled={isSubmitting}
              className="w-full mt-4 bg-[#FF6B00] hover:bg-[#FF9F45] disabled:bg-[#FF6B00] text-white font-medium py-3 rounded-lg transition-colors duration-200 flex items-center justify-center"
            >
              {isSubmitting ? (
                <>
                  <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Processing...
                </>
              ) : (
                'Add Card'
              )}
            </button>
          </div>
        </div>
      )}
      
      {/* Navigation buttons */}
      <div className="mt-8 flex flex-col md:flex-row gap-4">
        <button
          onClick={onBack}
          className="order-2 md:order-1 w-full md:w-auto border border-[#ffeee3] text-[#2E2E2E] hover:bg-[#ffeee3] font-medium px-8 py-3 rounded-lg transition-colors duration-300"
        >
          Back
        </button>
        <button
          onClick={handleSubmit}
          className="order-1 md:order-2 w-full md:flex-1 bg-[#FF6B00] hover:bg-[#FF9F45] text-white font-medium px-8 py-3 rounded-lg transition-colors duration-300"
        >
          {paymentMethods.length > 0 ? 'Save & Continue' : 'Skip for Now'}
        </button>
      </div>
    </div>
  );
};

export default ClientPaymentStep;













