'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { 
  Phone, 
  Mail, 
  MapPin, 
  Clock,
  Shield,
  Award,
  Headphones,
  Zap
} from 'lucide-react';
import { useTheme } from '@/contexts/ThemeContext';
import Header from '@/components/home/Header';
import Footer from '@/components/home/Footer';
import ContactForm from '@/components/contact/ContactForm';

export default function ContactPage() {
  const { isDay } = useTheme();

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
  };

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
      value: 'sales@autosyssunergy.com',
      desc: 'Detailed Inquiry',
      action: 'mailto:sales@autosyssunergy.com',
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
                Connect with our solar experts for personalized consultation and detailed proposal
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
              <ContactForm
                formType="contact"
                title="Solar Quote Request"
                subtitle="Get a personalized solar proposal with detailed ROI analysis"
                showUserTypeSelection={true}
                isCompact={false}
                isDay={isDay}
                onSuccess={(data) => {
                  console.log('Contact form submitted:', data);
                }}
                onError={(error) => {
                  console.error('Contact form error:', error);
                }}
              />
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
                    { icon: Award, text: '18+ Years Experience' },
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
