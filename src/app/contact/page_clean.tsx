'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useTheme } from '@/contexts/ThemeContext';
import { getThemeClasses, getThemeHover, TRANSITION_CLASSES } from '@/utils/themeUtils';
import { useContactAnimations } from '@/hooks/useContactAnimations';
import { 
  Phone, 
  Mail, 
  MapPin, 
  Clock, 
  Send, 
  User, 
  Building, 
  MessageSquare, 
  ChevronRight,
  Award,
  Shield,
  Users,
  Headphones,
  CheckCircle2,
  ArrowRight,
  Calendar,
  Video,
  FileText,
  Zap
} from 'lucide-react';
import Header from '@/components/home/Header';
import Footer from '@/components/home/Footer';
import FloatingActionButton from '@/components/ui/FloatingActionButton';
import FloatingSupport from '@/components/contact/FloatingSupport';
import PageLoader from '@/components/ui/PageLoader';
import OptimizedImage from '@/components/ui/OptimizedImage';
import ProductionContactForm from '@/components/contact/ProductionContactForm';
import '@/styles/contact3d.css';

// Contact Info Card Component
const ContactInfoCard = ({ 
  icon: Icon, 
  title, 
  info, 
  action, 
  themeClasses, 
  isDay 
}: { 
  icon: React.ElementType; 
  title: string; 
  info: string; 
  action?: string;
  themeClasses: Record<string, string>; 
  isDay: boolean 
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      whileInView={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
      className={`contact-card-float p-6 rounded-2xl backdrop-blur-md border transform transition-all duration-500 hover:scale-105 cursor-pointer group ${
        isDay 
          ? 'bg-white/80 border-amber-200 shadow-xl hover:shadow-2xl' 
          : 'bg-slate-800/80 border-slate-600 shadow-2xl hover:shadow-3xl'
      }`}
    >
      <div className="flex items-center space-x-4">
        <div className={`p-3 rounded-xl transition-all duration-300 group-hover:scale-110 ${
          isDay 
            ? 'bg-gradient-to-br from-amber-100 to-orange-100 text-amber-600' 
            : 'bg-gradient-to-br from-blue-500/20 to-purple-500/20 text-blue-400'
        }`}>
          <Icon className="w-6 h-6" />
        </div>
        <div className="flex-1">
          <h3 className={`font-semibold mb-1 ${themeClasses.textPrimary} ${TRANSITION_CLASSES.colors}`}>
            {title}
          </h3>
          <p className={`text-sm ${themeClasses.textSecondary} ${TRANSITION_CLASSES.colors}`}>
            {info}
          </p>
          {action && (
            <p className={`text-xs mt-1 ${
              isDay ? 'text-amber-600' : 'text-blue-400'
            } group-hover:underline`}>
              {action}
            </p>
          )}
        </div>
        <ChevronRight className={`w-5 h-5 transition-transform duration-300 group-hover:translate-x-1 ${
          themeClasses.textSecondary
        }`} />
      </div>
    </motion.div>
  );
};

// Service Card Component  
const ServiceCard = ({ 
  icon: Icon, 
  title, 
  description, 
  features, 
  themeClasses, 
  isDay 
}: { 
  icon: React.ElementType; 
  title: string; 
  description: string; 
  features: string[];
  themeClasses: Record<string, string>; 
  isDay: boolean 
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className={`service-card-hover p-6 rounded-2xl backdrop-blur-md border transition-all duration-500 hover:scale-105 ${
        isDay 
          ? 'bg-white/80 border-amber-200 shadow-xl hover:shadow-2xl' 
          : 'bg-slate-800/80 border-slate-600 shadow-2xl hover:shadow-3xl'
      }`}
    >
      <div className={`inline-flex p-3 rounded-xl mb-4 ${
        isDay 
          ? 'bg-gradient-to-br from-amber-100 to-orange-100 text-amber-600' 
          : 'bg-gradient-to-br from-blue-500/20 to-purple-500/20 text-blue-400'
      }`}>
        <Icon className="w-8 h-8" />
      </div>
      
      <h3 className={`text-xl font-bold mb-3 ${themeClasses.textPrimary} ${TRANSITION_CLASSES.colors}`}>
        {title}
      </h3>
      
      <p className={`mb-4 ${themeClasses.textSecondary} ${TRANSITION_CLASSES.colors}`}>
        {description}
      </p>
      
      <ul className="space-y-2">
        {features.map((feature, index) => (
          <li key={index} className="flex items-center space-x-2">
            <CheckCircle2 className={`w-4 h-4 ${
              isDay ? 'text-amber-500' : 'text-blue-400'
            }`} />
            <span className={`text-sm ${themeClasses.textSecondary} ${TRANSITION_CLASSES.colors}`}>
              {feature}
            </span>
          </li>
        ))}
      </ul>
    </motion.div>
  );
};

export default function ContactPage() {
  const { theme } = useTheme();
  const [isLoading, setIsLoading] = useState(true);
  const [mounted, setMounted] = useState(false);
  
  // Use the custom animations hook
  const {
    heroRef,
    formRef,
    contactInfoRef,
    mapRef,
    heroInView,
    formInView,
    contactInfoInView,
    mapInView
  } = useContactAnimations();

  useEffect(() => {
    setMounted(true);
    // Simulate loading delay
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  if (!mounted) return null;

  if (isLoading) {
    return <PageLoader />;
  }

  const isDay = theme === 'day';
  const themeClasses = getThemeClasses(theme);
  const hoverClass = getThemeHover(theme);

  const contactInfo = [
    {
      icon: Phone,
      title: "Call Us",
      info: "+91 98765 43210",
      action: "Available 24/7"
    },
    {
      icon: Mail,
      title: "Email Us",
      info: "contact@autosyssunergy.com",
      action: "Quick response within 24 hours"
    },
    {
      icon: MapPin,
      title: "Visit Us",
      info: "Solar Energy Hub, Green City",
      action: "Schedule a visit"
    },
    {
      icon: Clock,
      title: "Business Hours",
      info: "Mon - Sat: 9 AM - 6 PM",
      action: "Sunday appointments available"
    }
  ];

  const services = [
    {
      icon: Zap,
      title: "Free Solar Consultation",
      description: "Get expert advice on solar solutions tailored to your needs.",
      features: [
        "Site assessment and energy audit",
        "Custom system design",
        "ROI analysis and financing options",
        "Government incentives guidance"
      ]
    },
    {
      icon: Calendar,
      title: "Installation Scheduling",
      description: "Professional installation by certified solar technicians.",
      features: [
        "Flexible scheduling options",
        "Minimal disruption guarantee",
        "Quality installation standards",
        "Complete system commissioning"
      ]
    },
    {
      icon: Headphones,
      title: "24/7 Support",
      description: "Round-the-clock support for all your solar energy needs.",
      features: [
        "Emergency response team",
        "Remote monitoring support",
        "Maintenance scheduling",
        "Performance optimization"
      ]
    },
    {
      icon: FileText,
      title: "Documentation & Permits",
      description: "Complete handling of paperwork and regulatory compliance.",
      features: [
        "Permit applications",
        "Grid interconnection",
        "Insurance documentation",
        "Warranty registration"
      ]
    }
  ];

  return (
    <div className={`min-h-screen ${themeClasses.background} ${TRANSITION_CLASSES.colors}`}>
      <Header isScrolled={false} />
      
      {/* Hero Section */}
      <motion.section 
        ref={heroRef}
        className={`relative py-20 lg:py-32 overflow-hidden ${themeClasses.background}`}
      >
        {/* Animated Background */}
        <div className="absolute inset-0 z-0">
          <div className={`absolute inset-0 ${
            isDay 
              ? 'bg-gradient-to-br from-amber-50 via-orange-50 to-yellow-50' 
              : 'bg-gradient-to-br from-slate-900 via-blue-900 to-purple-900'
          }`} />
          
          {/* Floating Elements */}
          <div className="contact-float-elements absolute inset-0">
            {[...Array(6)].map((_, i) => (
              <motion.div
                key={i}
                className={`absolute w-20 h-20 rounded-full ${
                  isDay 
                    ? 'bg-gradient-to-br from-amber-200/30 to-orange-200/30' 
                    : 'bg-gradient-to-br from-blue-500/20 to-purple-500/20'
                } blur-xl`}
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                }}
                animate={{
                  y: [0, -20, 0],
                  x: [0, 10, 0],
                  scale: [1, 1.1, 1],
                }}
                transition={{
                  duration: 4 + Math.random() * 2,
                  repeat: Infinity,
                  delay: Math.random() * 2,
                }}
              />
            ))}
          </div>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={heroInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8 }}
              className="mb-6"
            >
              <span className={`inline-flex items-center px-4 py-2 rounded-full text-sm font-medium ${
                isDay 
                  ? 'bg-amber-100 text-amber-800 border border-amber-200' 
                  : 'bg-blue-500/20 text-blue-300 border border-blue-500/30'
              }`}>
                <Headphones className="w-4 h-4 mr-2" />
                Premium Solar Support
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={heroInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.2 }}
              className={`text-4xl md:text-6xl lg:text-7xl font-bold mb-6 ${themeClasses.textPrimary} ${TRANSITION_CLASSES.colors}`}
            >
              Get In{' '}
              <span className={`${
                isDay 
                  ? 'bg-gradient-to-r from-amber-600 to-orange-600' 
                  : 'bg-gradient-to-r from-blue-400 to-purple-400'
              } bg-clip-text text-transparent`}>
                Touch
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={heroInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.4 }}
              className={`text-xl md:text-2xl mb-8 max-w-3xl mx-auto leading-relaxed ${themeClasses.textSecondary} ${TRANSITION_CLASSES.colors}`}
            >
              Ready to transform your energy future? Our solar experts are here to guide you every step of the way. 
              From consultation to installation and beyond.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={heroInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="flex flex-col sm:flex-row gap-4 justify-center items-center"
            >
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`px-8 py-4 rounded-xl font-semibold text-white transition-all duration-300 flex items-center gap-2 shadow-lg hover:shadow-xl ${
                  isDay
                    ? 'bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600'
                    : 'bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600'
                }`}
                onClick={() => {
                  document.getElementById('contact-form')?.scrollIntoView({ 
                    behavior: 'smooth' 
                  });
                }}
              >
                <Send className="w-5 h-5" />
                Start Your Journey
              </motion.button>
              
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`px-8 py-4 rounded-xl font-semibold transition-all duration-300 flex items-center gap-2 border-2 ${
                  isDay
                    ? 'border-amber-300 text-amber-700 hover:bg-amber-50'
                    : 'border-blue-400 text-blue-300 hover:bg-blue-500/10'
                }`}
              >
                <Video className="w-5 h-5" />
                Schedule Video Call
              </motion.button>
            </motion.div>
          </div>
        </div>
      </motion.section>

      {/* Contact Info Cards */}
      <motion.section 
        ref={contactInfoRef}
        className={`py-20 ${themeClasses.background}`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={contactInfoInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className={`text-3xl md:text-4xl font-bold mb-4 ${themeClasses.textPrimary} ${TRANSITION_CLASSES.colors}`}>
              Multiple Ways to Connect
            </h2>
            <p className={`text-lg ${themeClasses.textSecondary} ${TRANSITION_CLASSES.colors}`}>
              Choose the most convenient way to reach our solar experts
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {contactInfo.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                animate={contactInfoInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <ContactInfoCard
                  icon={item.icon}
                  title={item.title}
                  info={item.info}
                  action={item.action}
                  themeClasses={themeClasses}
                  isDay={isDay}
                />
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* Contact Form Section */}
      <motion.section 
        ref={formRef}
        id="contact-form"
        className={`py-20 ${themeClasses.background}`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={formInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className={`text-3xl md:text-4xl font-bold mb-4 ${themeClasses.textPrimary} ${TRANSITION_CLASSES.colors}`}>
              Ready to Go Solar?
            </h2>
            <p className={`text-lg ${themeClasses.textSecondary} ${TRANSITION_CLASSES.colors}`}>
              Fill out the form below and our solar experts will get back to you within 24 hours
            </p>
          </motion.div>

          <div className="max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={formInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <ProductionContactForm />
            </motion.div>
          </div>
        </div>
      </motion.section>

      {/* Services Section */}
      <motion.section 
        ref={mapRef}
        className={`py-20 ${themeClasses.background}`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={mapInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className={`text-3xl md:text-4xl font-bold mb-4 ${themeClasses.textPrimary} ${TRANSITION_CLASSES.colors}`}>
              What We Offer
            </h2>
            <p className={`text-lg ${themeClasses.textSecondary} ${TRANSITION_CLASSES.colors}`}>
              Comprehensive solar solutions with exceptional support
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {services.map((service, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                animate={mapInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <ServiceCard
                  icon={service.icon}
                  title={service.title}
                  description={service.description}
                  features={service.features}
                  themeClasses={themeClasses}
                  isDay={isDay}
                />
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* Trust Indicators */}
      <motion.section className={`py-16 border-t ${
        isDay ? 'border-amber-200 bg-amber-50/50' : 'border-slate-700 bg-slate-800/50'
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              className="flex flex-col items-center"
            >
              <div className={`p-4 rounded-full mb-4 ${
                isDay 
                  ? 'bg-amber-100 text-amber-600' 
                  : 'bg-blue-500/20 text-blue-400'
              }`}>
                <Award className="w-8 h-8" />
              </div>
              <h3 className={`text-xl font-bold mb-2 ${themeClasses.textPrimary}`}>
                Industry Leading
              </h3>
              <p className={`${themeClasses.textSecondary}`}>
                Award-winning solar solutions with proven track record
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="flex flex-col items-center"
            >
              <div className={`p-4 rounded-full mb-4 ${
                isDay 
                  ? 'bg-amber-100 text-amber-600' 
                  : 'bg-blue-500/20 text-blue-400'
              }`}>
                <Shield className="w-8 h-8" />
              </div>
              <h3 className={`text-xl font-bold mb-2 ${themeClasses.textPrimary}`}>
                25-Year Warranty
              </h3>
              <p className={`${themeClasses.textSecondary}`}>
                Comprehensive coverage for complete peace of mind
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="flex flex-col items-center"
            >
              <div className={`p-4 rounded-full mb-4 ${
                isDay 
                  ? 'bg-amber-100 text-amber-600' 
                  : 'bg-blue-500/20 text-blue-400'
              }`}>
                <Users className="w-8 h-8" />
              </div>
              <h3 className={`text-xl font-bold mb-2 ${themeClasses.textPrimary}`}>
                10,000+ Happy Customers
              </h3>
              <p className={`${themeClasses.textSecondary}`}>
                Trusted by families and businesses across the region
              </p>
            </motion.div>
          </div>
        </div>
      </motion.section>

      <Footer />
      <FloatingActionButton />
      <FloatingSupport />
    </div>
  );
}
