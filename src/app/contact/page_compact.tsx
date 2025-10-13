'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Phone, 
  Mail, 
  MapPin, 
  Clock,
  CheckCircle,
  Send,
  Home,
  Building2,
  Factory,
  Calculator,
  ChevronDown,
  Shield,
  Award,
  Headphones,
  Zap
} from 'lucide-react';
import { useTheme } from '@/contexts/ThemeContext';
import Header from '@/components/home/Header';
import Footer from '@/components/home/Footer';

type UserType = 'residential' | 'commercial' | 'industrial';

interface ContactForm {
  userType: UserType;
  name: string;
  email: string;
  phone: string;
  location: string;
  propertySize?: string;
  monthlyBill?: string;
  businessType?: string;
  facilitySize?: string;
  powerConsumption?: string;
  industrialScale?: string;
  message: string;
}

export default function ContactPage() {
  const { theme, isDay } = useTheme();
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [formData, setFormData] = useState<ContactForm>({
    userType: 'residential',
    name: '',
    email: '',
    phone: '',
    location: '',
    message: ''
  });

  const themeClasses = {
    bg: isDay 
      ? 'bg-gradient-to-br from-blue-50 via-white to-cyan-50' 
      : 'bg-gradient-to-br from-slate-900 via-slate-800 to-blue-900',
    text: isDay ? 'text-slate-900' : 'text-white',
    textSecondary: isDay ? 'text-slate-600' : 'text-slate-300',
    card: isDay 
      ? 'bg-white/80 backdrop-blur-sm' 
      : 'bg-slate-800/80 backdrop-blur-sm',
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

  const contactMethods = [
    {
      icon: Phone,
      title: 'Call Us',
      value: '+91 8818880540',
      desc: 'Instant Support',
      action: 'tel:+918818880540',
      color: isDay ? 'text-green-600' : 'text-green-400'
    },
    {
      icon: Mail,
      title: 'Email Us',
      value: 'info@autosysindore.com',
      desc: 'Detailed Inquiry',
      action: 'mailto:info@autosysindore.com',
      color: isDay ? 'text-blue-600' : 'text-blue-400'
    },
    {
      icon: MapPin,
      title: 'Visit Us',
      value: 'A-1/C, Pologround Road, Indore',
      desc: 'Showroom & Office',
      action: '#',
      color: isDay ? 'text-purple-600' : 'text-purple-400'
    }
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
  };

  const handleInputChange = (field: keyof ContactForm, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const renderUserTypeSpecificFields = () => {
    const commonClasses = `w-full px-3 py-2.5 text-sm rounded-lg border transition-all duration-300 focus:ring-2 focus:outline-none ${themeClasses.input}`;
    
    switch (formData.userType) {
      case 'residential':
        return (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className={`block text-xs font-medium mb-1 ${themeClasses.text}`}>
                Property Size
              </label>
              <select 
                className={commonClasses}
                value={formData.propertySize || ''}
                onChange={(e) => handleInputChange('propertySize', e.target.value)}
              >
                <option value="">Select property size</option>
                <option value="small">Small (1-2 BHK)</option>
                <option value="medium">Medium (3-4 BHK)</option>
                <option value="large">Large (5+ BHK)</option>
                <option value="villa">Villa/Bungalow</option>
              </select>
            </div>
            <div>
              <label className={`block text-xs font-medium mb-1 ${themeClasses.text}`}>
                Monthly Electricity Bill
              </label>
              <select 
                className={commonClasses}
                value={formData.monthlyBill || ''}
                onChange={(e) => handleInputChange('monthlyBill', e.target.value)}
              >
                <option value="">Select bill range</option>
                <option value="2-5k">₹2,000 - ₹5,000</option>
                <option value="5-15k">₹5,000 - ₹15,000</option>
                <option value="15-50k">₹15,000 - ₹50,000</option>
                <option value="50k+">₹50,000+</option>
              </select>
            </div>
          </div>
        );
      
      case 'commercial':
        return (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className={`block text-xs font-medium mb-1 ${themeClasses.text}`}>
                Business Type
              </label>
              <select 
                className={commonClasses}
                value={formData.businessType || ''}
                onChange={(e) => handleInputChange('businessType', e.target.value)}
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
            <div>
              <label className={`block text-xs font-medium mb-1 ${themeClasses.text}`}>
                Facility Size
              </label>
              <select 
                className={commonClasses}
                value={formData.facilitySize || ''}
                onChange={(e) => handleInputChange('facilitySize', e.target.value)}
              >
                <option value="">Select facility size</option>
                <option value="small">Small (up to 5,000 sq ft)</option>
                <option value="medium">Medium (5,000 - 20,000 sq ft)</option>
                <option value="large">Large (20,000 - 100,000 sq ft)</option>
                <option value="enterprise">Enterprise (100,000+ sq ft)</option>
              </select>
            </div>
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
                value={formData.powerConsumption || ''}
                onChange={(e) => handleInputChange('powerConsumption', e.target.value)}
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
                value={formData.industrialScale || ''}
                onChange={(e) => handleInputChange('industrialScale', e.target.value)}
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

  return (
    <div className={`min-h-screen ${themeClasses.bg}`}>
      <Header isScrolled={true} />
      
      {/* Compact Hero Section */}
      <section className="pt-20 pb-6">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h1 className={`text-2xl md:text-4xl font-bold ${themeClasses.text} mb-3`}>
                Get Your Free Solar Quote
              </h1>
              <p className={`text-sm md:text-lg ${themeClasses.textSecondary} max-w-2xl mx-auto`}>
                Connect with our solar experts for personalized consultation
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Main Content - Compact Layout */}
      <section className="pb-12">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-5 gap-6">
            
            {/* Contact Form - Takes 3 columns */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="lg:col-span-3"
            >
              <div className={`${themeClasses.card} ${themeClasses.border} border rounded-xl p-4 md:p-6 shadow-lg`}>
                {isSubmitted ? (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5 }}
                    className="text-center py-8"
                  >
                    <CheckCircle className="w-12 h-12 text-green-500 mx-auto mb-4" />
                    <h3 className={`text-xl font-bold ${themeClasses.text} mb-3`}>
                      Thank You!
                    </h3>
                    <p className={`text-sm ${themeClasses.textSecondary} mb-6`}>
                      We&apos;ve received your inquiry and will contact you within 24 hours.
                    </p>
                    <button
                      onClick={() => setIsSubmitted(false)}
                      className={`px-4 py-2 ${themeClasses.button} text-white font-semibold rounded-lg transition-all duration-300 text-sm`}
                    >
                      Submit Another Inquiry
                    </button>
                  </motion.div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="flex items-center space-x-2 mb-4">
                      <Calculator className="w-5 h-5 text-blue-600" />
                      <h2 className={`text-lg md:text-xl font-bold ${themeClasses.text}`}>
                        Solar Quote Request
                      </h2>
                    </div>

                    {/* User Type Selection - Compact Dropdown */}
                    <div>
                      <label className={`block text-xs font-medium mb-1 ${themeClasses.text}`}>
                        Select Your Category *
                      </label>
                      <div className="relative">
                        <select 
                          className={`w-full px-3 py-2.5 text-sm rounded-lg border appearance-none transition-all duration-300 focus:ring-2 focus:outline-none ${themeClasses.input}`}
                          value={formData.userType}
                          onChange={(e) => handleInputChange('userType', e.target.value as UserType)}
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

                    {/* Basic Information - Compact Grid */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
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

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div>
                        <label className={`block text-xs font-medium mb-1 ${themeClasses.text}`}>
                          Email Address *
                        </label>
                        <input
                          type="email"
                          required
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

                    {/* Conditional Fields Based on User Type */}
                    {renderUserTypeSpecificFields()}

                    {/* Message */}
                    <div>
                      <label className={`block text-xs font-medium mb-1 ${themeClasses.text}`}>
                        Additional Requirements
                      </label>
                      <textarea
                        rows={3}
                        className={`w-full px-3 py-2.5 text-sm rounded-lg border transition-all duration-300 focus:ring-2 focus:outline-none ${themeClasses.input}`}
                        placeholder="Tell us about your specific requirements..."
                        value={formData.message}
                        onChange={(e) => handleInputChange('message', e.target.value)}
                      />
                    </div>

                    {/* Submit Button */}
                    <button
                      type="submit"
                      className={`w-full py-3 ${themeClasses.button} text-white font-bold rounded-lg transition-all duration-300 hover:shadow-lg flex items-center justify-center space-x-2 group text-sm`}
                    >
                      <Send className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
                      <span>Get Free Solar Quote</span>
                    </button>

                    {/* Benefits - Compact */}
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
                )}
              </div>
            </motion.div>

            {/* Contact Information & Features - Compact Sidebar */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="lg:col-span-2 space-y-4"
            >
              {/* Contact Methods */}
              <div className={`${themeClasses.card} ${themeClasses.border} border rounded-xl p-4 shadow-lg`}>
                <h3 className={`text-lg font-bold ${themeClasses.text} mb-3`}>
                  Get In Touch
                </h3>
                <div className="space-y-3">
                  {contactMethods.map((method, index) => (
                    <a
                      key={index}
                      href={method.action}
                      className={`flex items-start space-x-2 p-2 rounded-lg transition-all duration-300 hover:shadow-md ${isDay ? 'hover:bg-slate-50' : 'hover:bg-slate-700/50'}`}
                    >
                      <method.icon className={`w-4 h-4 mt-0.5 ${method.color} flex-shrink-0`} />
                      <div className="flex-1 min-w-0">
                        <p className={`text-xs font-medium ${themeClasses.text}`}>
                          {method.title}
                        </p>
                        <p className={`text-xs ${themeClasses.textSecondary} truncate`}>
                          {method.value}
                        </p>
                        <p className={`text-xs ${method.color} font-medium`}>
                          {method.desc}
                        </p>
                      </div>
                    </a>
                  ))}
                </div>
              </div>

              {/* Business Hours */}
              <div className={`${themeClasses.card} ${themeClasses.border} border rounded-xl p-4 shadow-lg`}>
                <div className="flex items-center space-x-2 mb-3">
                  <Clock className="w-4 h-4 text-blue-600" />
                  <h3 className={`text-sm font-bold ${themeClasses.text}`}>
                    Business Hours
                  </h3>
                </div>
                <div className="space-y-1 text-xs">
                  <div className="flex justify-between">
                    <span className={themeClasses.textSecondary}>Mon - Sat</span>
                    <span className={themeClasses.text}>9:00 AM - 6:00 PM</span>
                  </div>
                  <div className="flex justify-between">
                    <span className={themeClasses.textSecondary}>Sunday</span>
                    <span className={themeClasses.text}>10:00 AM - 4:00 PM</span>
                  </div>
                </div>
              </div>

              {/* Why Choose Us - Compact */}
              <div className={`${themeClasses.card} ${themeClasses.border} border rounded-xl p-4 shadow-lg`}>
                <h3 className={`text-sm font-bold ${themeClasses.text} mb-3`}>
                  Why Choose Us?
                </h3>
                <div className="space-y-2">
                  {[
                    { icon: Award, text: '15+ Years Experience' },
                    { icon: Shield, text: '25-Year Warranty' },
                    { icon: Zap, text: 'Premium Components' },
                    { icon: Headphones, text: '24/7 Support' }
                  ].map((feature, index) => (
                    <div key={index} className="flex items-center space-x-2">
                      <feature.icon className="w-3 h-3 text-blue-600 flex-shrink-0" />
                      <span className={`text-xs ${themeClasses.text}`}>
                        {feature.text}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
