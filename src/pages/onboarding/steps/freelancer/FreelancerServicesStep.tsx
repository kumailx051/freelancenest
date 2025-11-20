import React, { useState } from 'react';
import { Plus, Trash2, Edit2, Clock, DollarSign } from 'lucide-react';

interface FreelancerServicesStepProps {
  user: any;
  onNext: (data?: any) => void;
  onBack: () => void;
}

interface Service {
  id: string;
  title: string;
  description: string;
  category: string;
  packages: {
    basic: {
      title: string;
      description: string;
      deliveryTime: number;
      price: number;
      revisions: number;
    };
    standard: {
      title: string;
      description: string;
      deliveryTime: number;
      price: number;
      revisions: number;
    };
    premium: {
      title: string;
      description: string;
      deliveryTime: number;
      price: number;
      revisions: number;
    };
  };
}

const FreelancerServicesStep: React.FC<FreelancerServicesStepProps> = ({ 
  onNext, 
  onBack 
}) => {
  const [services, setServices] = useState<Service[]>([{
    id: '1',
    title: '',
    description: '',
    category: 'web-development',
    packages: {
      basic: {
        title: 'Basic Package',
        description: '',
        deliveryTime: 3,
        price: 25,
        revisions: 1
      },
      standard: {
        title: 'Standard Package',
        description: '',
        deliveryTime: 5,
        price: 50,
        revisions: 2
      },
      premium: {
        title: 'Premium Package',
        description: '',
        deliveryTime: 7,
        price: 100,
        revisions: 5
      }
    }
  }]);
  
  const [activeService, setActiveService] = useState<string>(services[0].id);
  const [activePackage, setActivePackage] = useState<'basic' | 'standard' | 'premium'>('basic');
  const [errors, setErrors] = useState<Record<string, string>>({});
  
  // Categories for services
  const categories = [
    { id: 'web-development', name: 'Web Development' },
    { id: 'mobile-app', name: 'Mobile App Development' },
    { id: 'ui-design', name: 'UI/UX Design' },
    { id: 'graphic-design', name: 'Graphic Design' },
    { id: 'writing', name: 'Writing & Content' },
    { id: 'marketing', name: 'Marketing & SEO' },
    { id: 'video', name: 'Video & Animation' },
    { id: 'other', name: 'Other' }
  ];

  const getCurrentService = () => {
    return services.find(service => service.id === activeService) || services[0];
  };

  const handleServiceChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    
    setServices(prevServices => 
      prevServices.map(service => 
        service.id === activeService ? { ...service, [name]: value } : service
      )
    );
    
    // Clear error
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handlePackageChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    const fieldName = name.split('.')[1];
    let processedValue: string | number = value;
    
    // Convert to number for numeric fields
    if (['deliveryTime', 'price', 'revisions'].includes(fieldName)) {
      processedValue = value === '' ? 0 : Number(value);
    }
    
    setServices(prevServices => 
      prevServices.map(service => 
        service.id === activeService 
          ? { 
              ...service, 
              packages: {
                ...service.packages,
                [activePackage]: {
                  ...service.packages[activePackage],
                  [fieldName]: processedValue
                }
              }
            } 
          : service
      )
    );
    
    // Clear error
    const errorKey = `${activeService}.${activePackage}.${fieldName}`;
    if (errors[errorKey]) {
      setErrors(prev => ({ ...prev, [errorKey]: '' }));
    }
  };

  const addService = () => {
    if (services.length >= 3) return; // Limit to 3 services
    
    const newService: Service = {
      id: `service_${Date.now()}`,
      title: '',
      description: '',
      category: 'web-development',
      packages: {
        basic: {
          title: 'Basic Package',
          description: '',
          deliveryTime: 3,
          price: 25,
          revisions: 1
        },
        standard: {
          title: 'Standard Package',
          description: '',
          deliveryTime: 5,
          price: 50,
          revisions: 2
        },
        premium: {
          title: 'Premium Package',
          description: '',
          deliveryTime: 7,
          price: 100,
          revisions: 5
        }
      }
    };
    
    setServices([...services, newService]);
    setActiveService(newService.id);
    setActivePackage('basic');
  };

  const removeService = (id: string) => {
    const updatedServices = services.filter(service => service.id !== id);
    setServices(updatedServices);
    
    // If we're removing the active service, select the first remaining service
    if (id === activeService && updatedServices.length > 0) {
      setActiveService(updatedServices[0].id);
    }
  };

  const validateServices = () => {
    const newErrors: Record<string, string> = {};
    let isValid = true;
    
    // Check each service
    services.forEach((service, index) => {
      if (!service.title) {
        newErrors[`service_${index}_title`] = `Title is required for service ${index + 1}`;
        isValid = false;
      }
      
      if (!service.description) {
        newErrors[`service_${index}_description`] = `Description is required for service ${index + 1}`;
        isValid = false;
      }
      
      // Check each package
      ['basic', 'standard', 'premium'].forEach(pkg => {
        const currentPkg = service.packages[pkg as keyof typeof service.packages];
        
        if (!currentPkg.description) {
          newErrors[`${service.id}.${pkg}.description`] = `Description required for ${pkg} package`;
          isValid = false;
        }
        
        if (!currentPkg.price) {
          newErrors[`${service.id}.${pkg}.price`] = `Price required for ${pkg} package`;
          isValid = false;
        }
      });
    });
    
    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = () => {
    // Services are optional, so we can continue even without validation
    // But we still validate to show any errors
    validateServices();
    
    // Submit the data
    onNext({ services });
  };

  const currentService = getCurrentService();

  return (
    <div>
      <h2 className="text-2xl font-bold mb-2">Set Up Your Services</h2>
      <p className="text-[#2E2E2E] mb-8">
        Create service packages that clients can purchase directly from your profile.
        <br />
        <span className="text-sm text-[#FF6B00]">(This step is optional, you can add services later)</span>
      </p>
      
      {/* Services Tabs */}
      <div className="mb-6 flex items-center">
        <div className="flex space-x-2 overflow-x-auto pb-2 flex-grow">
          {services.map((service, index) => (
            <button
              key={service.id}
              onClick={() => setActiveService(service.id)}
              className={`px-4 py-2 rounded-lg whitespace-nowrap transition-colors duration-200 ${
                service.id === activeService 
                ? 'bg-[#FF6B00] text-white' 
                : 'bg-[#ffeee3] hover:bg-[#ffeee3] text-[#2E2E2E]'
              }`}
            >
              {service.title || `Service ${index + 1}`}
            </button>
          ))}
        </div>
        
        {services.length < 3 && (
          <button
            onClick={addService}
            className="ml-2 p-2 bg-[#ffeee3] text-[#FF6B00] rounded-lg hover:bg-[#ffeee3] transition-colors"
            title="Add Service"
          >
            <Plus size={20} />
          </button>
        )}
      </div>
      
      {/* Service Details */}
      <div className="bg-white border border-[#ffeee3] rounded-lg p-6 mb-6">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-medium">
            Service Information
          </h3>
          {services.length > 1 && (
            <button
              onClick={() => removeService(currentService.id)}
              className="text-[#FF6B00] hover:text-[#2E2E2E] flex items-center text-sm"
            >
              <Trash2 size={16} className="mr-1" /> Remove Service
            </button>
          )}
        </div>
        
        <div className="space-y-6">
          <div>
            <label htmlFor="title" className="block text-sm font-medium text-[#2E2E2E] mb-1">
              Service Title *
            </label>
            <input
              type="text"
              id="title"
              name="title"
              value={currentService.title}
              onChange={handleServiceChange}
              className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#FF6B00] focus:outline-none ${
                errors[`service_${services.findIndex(s => s.id === currentService.id)}_title`] 
                  ? 'border-[#FF6B00]' 
                  : 'border-[#ffeee3]'
              }`}
              placeholder="e.g. Professional Web Development"
            />
            {errors[`service_${services.findIndex(s => s.id === currentService.id)}_title`] && (
              <p className="mt-1 text-sm text-[#FF6B00]">
                {errors[`service_${services.findIndex(s => s.id === currentService.id)}_title`]}
              </p>
            )}
          </div>
          
          <div>
            <label htmlFor="category" className="block text-sm font-medium text-[#2E2E2E] mb-1">
              Category *
            </label>
            <select
              id="category"
              name="category"
              value={currentService.category}
              onChange={handleServiceChange}
              className="w-full px-4 py-2 border border-[#ffeee3] rounded-lg focus:ring-2 focus:ring-[#FF6B00] focus:outline-none"
            >
              {categories.map(category => (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              ))}
            </select>
          </div>
          
          <div>
            <label htmlFor="description" className="block text-sm font-medium text-[#2E2E2E] mb-1">
              Service Description *
            </label>
            <textarea
              id="description"
              name="description"
              value={currentService.description}
              onChange={handleServiceChange}
              rows={4}
              className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#FF6B00] focus:outline-none ${
                errors[`service_${services.findIndex(s => s.id === currentService.id)}_description`] 
                  ? 'border-[#FF6B00]' 
                  : 'border-[#ffeee3]'
              }`}
              placeholder="Describe what you offer, the process, and what clients can expect..."
            />
            {errors[`service_${services.findIndex(s => s.id === currentService.id)}_description`] && (
              <p className="mt-1 text-sm text-[#FF6B00]">
                {errors[`service_${services.findIndex(s => s.id === currentService.id)}_description`]}
              </p>
            )}
          </div>
        </div>
      </div>
      
      {/* Package Tabs */}
      <div className="grid grid-cols-3 gap-2 mb-4">
        <button
          onClick={() => setActivePackage('basic')}
          className={`py-2 px-4 rounded-t-lg text-center transition-colors duration-200 ${
            activePackage === 'basic' 
            ? 'bg-white border border-[#ffeee3] border-b-transparent font-medium' 
            : 'bg-[#ffeee3] text-[#2E2E2E] hover:bg-[#ffeee3]'
          }`}
        >
          Basic
        </button>
        <button
          onClick={() => setActivePackage('standard')}
          className={`py-2 px-4 rounded-t-lg text-center transition-colors duration-200 ${
            activePackage === 'standard' 
            ? 'bg-white border border-[#ffeee3] border-b-transparent font-medium' 
            : 'bg-[#ffeee3] text-[#2E2E2E] hover:bg-[#ffeee3]'
          }`}
        >
          Standard
        </button>
        <button
          onClick={() => setActivePackage('premium')}
          className={`py-2 px-4 rounded-t-lg text-center transition-colors duration-200 ${
            activePackage === 'premium' 
            ? 'bg-white border border-[#ffeee3] border-b-transparent font-medium' 
            : 'bg-[#ffeee3] text-[#2E2E2E] hover:bg-[#ffeee3]'
          }`}
        >
          Premium
        </button>
      </div>
      
      {/* Package Details */}
      <div className="bg-white border border-[#ffeee3] rounded-lg p-6">
        <h3 className="text-lg font-medium mb-4">
          {currentService.packages[activePackage].title}
        </h3>
        
        <div className="space-y-6">
          <div>
            <label htmlFor="package.title" className="block text-sm font-medium text-[#2E2E2E] mb-1">
              Package Name *
            </label>
            <input
              type="text"
              id="package.title"
              name="package.title"
              value={currentService.packages[activePackage].title}
              onChange={handlePackageChange}
              className="w-full px-4 py-2 border border-[#ffeee3] rounded-lg focus:ring-2 focus:ring-[#FF6B00] focus:outline-none"
              placeholder={`${activePackage.charAt(0).toUpperCase() + activePackage.slice(1)} Package`}
            />
          </div>
          
          <div>
            <label htmlFor="package.description" className="block text-sm font-medium text-[#2E2E2E] mb-1">
              Package Description *
            </label>
            <textarea
              id="package.description"
              name="package.description"
              value={currentService.packages[activePackage].description}
              onChange={handlePackageChange}
              rows={3}
              className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#FF6B00] focus:outline-none ${
                errors[`${currentService.id}.${activePackage}.description`] 
                  ? 'border-[#FF6B00]' 
                  : 'border-[#ffeee3]'
              }`}
              placeholder="Describe what's included in this package..."
            />
            {errors[`${currentService.id}.${activePackage}.description`] && (
              <p className="mt-1 text-sm text-[#FF6B00]">
                {errors[`${currentService.id}.${activePackage}.description`]}
              </p>
            )}
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <label htmlFor="package.deliveryTime" className="block text-sm font-medium text-[#2E2E2E] mb-1">
                Delivery Time (days) *
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Clock size={16} className="text-[#ffeee3]" />
                </div>
                <input
                  type="number"
                  id="package.deliveryTime"
                  name="package.deliveryTime"
                  value={currentService.packages[activePackage].deliveryTime}
                  onChange={handlePackageChange}
                  min="1"
                  className="w-full pl-10 pr-4 py-2 border border-[#ffeee3] rounded-lg focus:ring-2 focus:ring-[#FF6B00] focus:outline-none"
                />
              </div>
            </div>
            
            <div>
              <label htmlFor="package.price" className="block text-sm font-medium text-[#2E2E2E] mb-1">
                Price (USD) *
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <DollarSign size={16} className="text-[#ffeee3]" />
                </div>
                <input
                  type="number"
                  id="package.price"
                  name="package.price"
                  value={currentService.packages[activePackage].price}
                  onChange={handlePackageChange}
                  min="5"
                  step="5"
                  className={`w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#FF6B00] focus:outline-none ${
                    errors[`${currentService.id}.${activePackage}.price`] 
                      ? 'border-[#FF6B00]' 
                      : 'border-[#ffeee3]'
                  }`}
                />
                {errors[`${currentService.id}.${activePackage}.price`] && (
                  <p className="mt-1 text-sm text-[#FF6B00]">
                    {errors[`${currentService.id}.${activePackage}.price`]}
                  </p>
                )}
              </div>
            </div>
            
            <div>
              <label htmlFor="package.revisions" className="block text-sm font-medium text-[#2E2E2E] mb-1">
                Revisions *
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Edit2 size={16} className="text-[#ffeee3]" />
                </div>
                <input
                  type="number"
                  id="package.revisions"
                  name="package.revisions"
                  value={currentService.packages[activePackage].revisions}
                  onChange={handlePackageChange}
                  min="0"
                  className="w-full pl-10 pr-4 py-2 border border-[#ffeee3] rounded-lg focus:ring-2 focus:ring-[#FF6B00] focus:outline-none"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Package Comparison Preview */}
      <div className="mt-8">
        <h3 className="text-lg font-medium mb-4">Package Comparison Preview</h3>
        
        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr>
                <th className="p-3 text-left bg-[#ffeee3] border border-[#ffeee3]"></th>
                <th className="p-3 text-center bg-[#ffeee3] border border-[#ffeee3]">Basic</th>
                <th className="p-3 text-center bg-[#ffeee3] border border-[#ffeee3]">Standard</th>
                <th className="p-3 text-center bg-[#ffeee3] border border-[#ffeee3]">Premium</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="p-3 border border-[#ffeee3] bg-[#ffeee3] font-medium">Price</td>
                <td className="p-3 border border-[#ffeee3] text-center">${currentService.packages.basic.price}</td>
                <td className="p-3 border border-[#ffeee3] text-center">${currentService.packages.standard.price}</td>
                <td className="p-3 border border-[#ffeee3] text-center">${currentService.packages.premium.price}</td>
              </tr>
              <tr>
                <td className="p-3 border border-[#ffeee3] bg-[#ffeee3] font-medium">Delivery Time</td>
                <td className="p-3 border border-[#ffeee3] text-center">{currentService.packages.basic.deliveryTime} days</td>
                <td className="p-3 border border-[#ffeee3] text-center">{currentService.packages.standard.deliveryTime} days</td>
                <td className="p-3 border border-[#ffeee3] text-center">{currentService.packages.premium.deliveryTime} days</td>
              </tr>
              <tr>
                <td className="p-3 border border-[#ffeee3] bg-[#ffeee3] font-medium">Revisions</td>
                <td className="p-3 border border-[#ffeee3] text-center">{currentService.packages.basic.revisions}</td>
                <td className="p-3 border border-[#ffeee3] text-center">{currentService.packages.standard.revisions}</td>
                <td className="p-3 border border-[#ffeee3] text-center">{currentService.packages.premium.revisions}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      
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
          {services.some(service => service.title && service.description) ? 'Save & Continue' : 'Skip for Now'}
        </button>
      </div>
    </div>
  );
};

export default FreelancerServicesStep;














