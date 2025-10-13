import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Send, 
  CheckCircle, 
  AlertCircle, 
  Loader2,
  Phone,
  Mail,
  Home,
  Building2,
  Factory,
  Calculator,
  ChevronDown
} from 'lucide-react';
import { useFormTracking } from '@/hooks/useAnalytics';

export interface ContactFormData {
  name: string;
  email: string;
  phone: string;
  company?: string;
  form_type: 'general' | 'homepage' | 'contact' | 'product_inquiry' | 'service_inquiry';
  user_type?: 'residential' | 'commercial' | 'industrial';
  subject: string;
  message: string;
  location?: string;
  system_type?: string;
  monthly_bill?: string;
  business_type?: string;
  power_consumption?: string;
  industrial_scale?: string;
  source?: string;
}

interface ContactFormProps {
  formType?: 'general' | 'homepage' | 'contact';
  title?: string;
  subtitle?: string;
  showUserTypeSelection?: boolean;
  isCompact?: boolean;
  onSuccess?: (data: Record<string, unknown>) => void;
  onError?: (error: string) => void;
  className?: string;
  isDay?: boolean;
}

export default function ContactForm({
  formType = 'general',
  title = 'Get Your Free Solar Quote',
  subtitle = 'Connect with our solar experts for personalized consultation',
  showUserTypeSelection = true,
  isCompact = false,
  onSuccess,
  onError,
  className = '',
  isDay = true
}: ContactFormProps) {
  const { trackFormStart, trackFormError, trackFormSuccess } = useFormTracking();
  
  const [formData, setFormData] = useState<ContactFormData>({
    name: '',
    email: '',
    phone: '',
    company: '',
    form_type: formType,
    user_type: 'residential',
    subject: '',
    message: '',
    location: '',
    source: formType === 'homepage' ? 'homepage' : 'contact_form'
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [hasStarted, setHasStarted] = useState(false);

  const themeClasses = {
    bg: isDay 
      ? 'bg-white/90 backdrop-blur-sm' 
      : 'bg-slate-800/90 backdrop-blur-sm',
    text: isDay ? 'text-slate-900' : 'text-white',
    textSecondary: isDay ? 'text-slate-600' : 'text-slate-300',
    border: isDay ? 'border-slate-200' : 'border-slate-700',
    input: isDay 
      ? 'bg-white border-slate-300 text-slate-900 focus:border-blue-500 focus:ring-blue-500/20' 
      : 'bg-slate-700 border-slate-600 text-white focus:border-cyan-400 focus:ring-cyan-400/20',
    button: isDay
      ? 'bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700'
      : 'bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-700 hover:to-cyan-600'
  };

  const userTypeOptions = [
    { value: 'residential', label: 'Residential', icon: Home, desc: 'Home & Personal Use' },
    { value: 'commercial', label: 'Commercial', icon: Building2, desc: 'Business & Office' },
    { value: 'industrial', label: 'Industrial', icon: Factory, desc: 'Manufacturing & Large Scale' }
  ];

  const handleInputChange = (field: keyof ContactFormData, value: string) => {
    // Track form start on first interaction
    if (!hasStarted) {
      setHasStarted(true);
      trackFormStart(`${formType}_form`);
    }
    
    setFormData(prev => ({ ...prev, [field]: value }));
    if (error) setError(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    try {
      const submissionData = {
        ...formData,
        subject: formData.subject || `${formData.user_type} Solar Inquiry from ${formData.name}`,
        form_type: formType,
        source: `${formType}_form`,
        metadata: {
          timestamp: new Date().toISOString(),
          userAgent: navigator.userAgent,
          screenResolution: `${screen.width}x${screen.height}`,
          language: navigator.language,
        }
      };

      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(submissionData),
      });

      const result = await response.json();

      if (!response.ok) {
        // Handle validation errors specifically
        if (result.details && Array.isArray(result.details)) {
          const errorMsg = `Please fix the following:\n• ${result.details.join('\n• ')}`;
          trackFormError(`${formType}_form`, result.details.join(', '));
          throw new Error(errorMsg);
        }
        const errorMsg = result.error || 'Something went wrong';
        trackFormError(`${formType}_form`, errorMsg);
        throw new Error(errorMsg);
      }

      setIsSubmitted(true);
      
      // Track successful form submission
      trackFormSuccess(`${formType}_form`, formData.user_type);
      
      // Enhanced success callback with email status
      if (onSuccess) {
        onSuccess({
          ...result,
          formData: submissionData,
          emailStatus: {
            teamNotified: result.details?.team_notified || false,
            customerEmailSent: result.details?.customer_email_sent || false,
            emailProvider: result.details?.email_provider || 'none'
          }
        });
      }

    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Something went wrong';
      setError(errorMessage);
      trackFormError(`${formType}_form`, errorMessage);
      if (onError) {
        onError(errorMessage);
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const renderUserTypeSpecificFields = () => {
    if (!showUserTypeSelection) return null;

    const commonClasses = `w-full px-3 py-2.5 text-sm rounded-lg border transition-all duration-300 focus:ring-2 focus:outline-none ${themeClasses.input}`;
    
    switch (formData.user_type) {
      case 'residential':
        return (
          <div>
            <label className={`block text-xs font-medium mb-1 ${themeClasses.text}`}>
              Monthly Electricity Bill
            </label>
            <select 
              className={commonClasses}
              value={formData.monthly_bill || ''}
              onChange={(e) => handleInputChange('monthly_bill', e.target.value)}
            >
              <option value="">Select bill range</option>
              <option value="2-5k">₹2,000 - ₹5,000</option>
              <option value="5-15k">₹5,000 - ₹15,000</option>
              <option value="15-50k">₹15,000 - ₹50,000</option>
              <option value="50k+">₹50,000+</option>
            </select>
          </div>
        );
      
      case 'commercial':
        return (
          <div>
            <label className={`block text-xs font-medium mb-1 ${themeClasses.text}`}>
              Business Type
            </label>
            <select 
              className={commonClasses}
              value={formData.business_type || ''}
              onChange={(e) => handleInputChange('business_type', e.target.value)}
            >
              <option value="">Select business type</option>
              <option value="office">Office Building</option>
              <option value="retail">Retail Store</option>
              <option value="warehouse">Warehouse</option>
              <option value="hospital">Hospital/Healthcare</option>
              <option value="school">School/Educational</option>
              <option value="hotel">Hotel/Hospitality</option>
              <option value="other">Other</option>
            </select>
          </div>
        );
      
      case 'industrial':
        return (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className={`block text-xs font-medium mb-1 ${themeClasses.text}`}>
                Power Consumption (Monthly)
              </label>
              <select 
                className={commonClasses}
                value={formData.power_consumption || ''}
                onChange={(e) => handleInputChange('power_consumption', e.target.value)}
              >
                <option value="">Select consumption range</option>
                <option value="100-500">100 - 500 kWh</option>
                <option value="500-2000">500 - 2,000 kWh</option>
                <option value="2000-10000">2,000 - 10,000 kWh</option>
                <option value="10000+">10,000+ kWh</option>
              </select>
            </div>
            <div>
              <label className={`block text-xs font-medium mb-1 ${themeClasses.text}`}>
                Industrial Scale
              </label>
              <select 
                className={commonClasses}
                value={formData.industrial_scale || ''}
                onChange={(e) => handleInputChange('industrial_scale', e.target.value)}
              >
                <option value="">Select scale</option>
                <option value="small">Small Scale (1-100 kW)</option>
                <option value="medium">Medium Scale (100 kW - 1 MW)</option>
                <option value="large">Large Scale (1 MW - 10 MW)</option>
                <option value="mega">Mega Scale (10 MW+)</option>
              </select>
            </div>
          </div>
        );
      
      default:
        return null;
    }
  };

  if (isSubmitted) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className={`${themeClasses.bg} ${themeClasses.border} border rounded-xl p-6 shadow-lg text-center ${className}`}
      >
        <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
        <h3 className={`text-xl font-bold ${themeClasses.text} mb-3`}>
          Thank You!
        </h3>
        <p className={`text-sm ${themeClasses.textSecondary} mb-6`}>
          We&apos;ve received your inquiry and will contact you within 24 hours with a detailed proposal.
        </p>
        <button
          onClick={() => {
            setIsSubmitted(false);
            setFormData({
              name: '',
              email: '',
              phone: '',
              company: '',
              form_type: formType,
              user_type: 'residential',
              subject: '',
              message: '',
              location: '',
              source: formType === 'homepage' ? 'homepage' : 'contact_form'
            });
          }}
          className={`px-4 py-2 ${themeClasses.button} text-white font-semibold rounded-lg transition-all duration-300 text-sm`}
        >
          Submit Another Inquiry
        </button>
      </motion.div>
    );
  }

  return (
    <div className={`${themeClasses.bg} ${themeClasses.border} border rounded-xl ${isCompact ? 'p-4' : 'p-6'} shadow-lg ${className}`}>
      {/* Header */}
      <div className={`${isCompact ? 'mb-4' : 'mb-6'}`}>
        <div className="flex items-center space-x-2 mb-2">
          <Calculator className="w-5 h-5 text-blue-600" />
          <h2 className={`${isCompact ? 'text-lg' : 'text-xl'} font-bold ${themeClasses.text}`}>
            {title}
          </h2>
        </div>
        <p className={`text-xs ${themeClasses.textSecondary}`}>
          {subtitle}
        </p>
      </div>

      {/* Error Display */}
      <AnimatePresence>
        {error && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg flex items-center space-x-2"
          >
            <AlertCircle className="w-4 h-4 text-red-500 flex-shrink-0" />
            <span className="text-sm text-red-700">{error}</span>
          </motion.div>
        )}
      </AnimatePresence>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* User Type Selection */}
        {showUserTypeSelection && (
          <div>
            <label className={`block text-xs font-medium mb-1 ${themeClasses.text}`}>
              Select Your Category *
            </label>
            <div className="relative">
              <select 
                className={`w-full px-3 py-2.5 text-sm rounded-lg border appearance-none transition-all duration-300 focus:ring-2 focus:outline-none ${themeClasses.input}`}
                value={formData.user_type}
                onChange={(e) => handleInputChange('user_type', e.target.value)}
                required
              >
                {userTypeOptions.map(option => (
                  <option key={option.value} value={option.value}>
                    {option.label} - {option.desc}
                  </option>
                ))}
              </select>
              <ChevronDown className="absolute right-2 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
            </div>
          </div>
        )}

        {/* Basic Information */}
        <div className={`grid grid-cols-1 ${isCompact ? 'gap-3' : 'sm:grid-cols-2 gap-4'}`}>
          <div>
            <label className={`block text-xs font-medium mb-1 ${themeClasses.text}`}>
              Full Name *
            </label>
            <input
              type="text"
              required
              className={`w-full px-3 py-2.5 text-sm rounded-lg border transition-all duration-300 focus:ring-2 focus:outline-none ${themeClasses.input}`}
              placeholder="Enter your name"
              value={formData.name}
              onChange={(e) => handleInputChange('name', e.target.value)}
            />
          </div>
          <div>
            <label className={`block text-xs font-medium mb-1 ${themeClasses.text}`}>
              Phone Number *
            </label>
            <input
              type="tel"
              required
              className={`w-full px-3 py-2.5 text-sm rounded-lg border transition-all duration-300 focus:ring-2 focus:outline-none ${themeClasses.input}`}
              placeholder="+91 98XXXXXXXX"
              value={formData.phone}
              onChange={(e) => handleInputChange('phone', e.target.value)}
            />
          </div>
        </div>

        <div className={`grid grid-cols-1 ${isCompact ? 'gap-3' : 'sm:grid-cols-2 gap-4'}`}>
          <div>
            <label className={`block text-xs font-medium mb-1 ${themeClasses.text}`}>
              Email Address
            </label>
            <input
              type="email"
              className={`w-full px-3 py-2.5 text-sm rounded-lg border transition-all duration-300 focus:ring-2 focus:outline-none ${themeClasses.input}`}
              placeholder="your.email@example.com"
              value={formData.email}
              onChange={(e) => handleInputChange('email', e.target.value)}
            />
          </div>
          <div>
            <label className={`block text-xs font-medium mb-1 ${themeClasses.text}`}>
              Location
            </label>
            <input
              type="text"
              className={`w-full px-3 py-2.5 text-sm rounded-lg border transition-all duration-300 focus:ring-2 focus:outline-none ${themeClasses.input}`}
              placeholder="City, State"
              value={formData.location}
              onChange={(e) => handleInputChange('location', e.target.value)}
            />
          </div>
        </div>

        {!isCompact && formData.user_type && (
          <div>
            <label className={`block text-xs font-medium mb-1 ${themeClasses.text}`}>
              Company/Organization
            </label>
            <input
              type="text"
              className={`w-full px-3 py-2.5 text-sm rounded-lg border transition-all duration-300 focus:ring-2 focus:outline-none ${themeClasses.input}`}
              placeholder="Company name (optional)"
              value={formData.company}
              onChange={(e) => handleInputChange('company', e.target.value)}
            />
          </div>
        )}

        {/* Conditional Fields Based on User Type */}
        {renderUserTypeSpecificFields()}

        {/* Subject */}
        <div>
          <label className={`block text-xs font-medium mb-1 ${themeClasses.text}`}>
            Subject
          </label>
          <input
            type="text"
            className={`w-full px-3 py-2.5 text-sm rounded-lg border transition-all duration-300 focus:ring-2 focus:outline-none ${themeClasses.input}`}
            placeholder="What can we help you with?"
            value={formData.subject}
            onChange={(e) => handleInputChange('subject', e.target.value)}
          />
        </div>

        {/* Message */}
        <div>
          <label className={`block text-xs font-medium mb-1 ${themeClasses.text}`}>
            Message *
          </label>
          <textarea
            rows={isCompact ? 3 : 4}
            required
            className={`w-full px-3 py-2.5 text-sm rounded-lg border transition-all duration-300 focus:ring-2 focus:outline-none ${themeClasses.input}`}
            placeholder="Tell us about your solar requirements..."
            value={formData.message}
            onChange={(e) => handleInputChange('message', e.target.value)}
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={isSubmitting}
          className={`w-full py-3 ${themeClasses.button} text-white font-bold rounded-lg transition-all duration-300 hover:shadow-lg flex items-center justify-center space-x-2 group text-sm disabled:opacity-50 disabled:cursor-not-allowed`}
        >
          {isSubmitting ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" />
              <span>Submitting...</span>
            </>
          ) : (
            <>
              <Send className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
              <span>Get Free Solar Quote</span>
            </>
          )}
        </button>

        {/* Benefits */}
        <div className={`p-3 rounded-lg ${isDay ? 'bg-green-50 border border-green-200' : 'bg-green-900/20 border border-green-800/50'}`}>
          <div className="flex flex-wrap items-center justify-center gap-3 text-xs">
            {[
              'Free Consultation',
              'No Hidden Costs',
              '24hr Response',
              'Expert Analysis'
            ].map((benefit, index) => (
              <div key={index} className={`flex items-center space-x-1 ${isDay ? 'text-green-700' : 'text-green-400'}`}>
                <CheckCircle className="w-3 h-3" />
                <span className="font-medium">{benefit}</span>
              </div>
            ))}
          </div>
        </div>
      </form>
    </div>
  );
}
