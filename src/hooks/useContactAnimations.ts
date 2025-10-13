import { useEffect, useRef, useState } from 'react';
import { useInView } from 'framer-motion';

export const useContactAnimations = () => {
  const [hasAnimated, setHasAnimated] = useState({
    hero: false,
    contactInfo: false,
    form: false,
    map: false,
  });

  // Refs for different sections
  const heroRef = useRef<HTMLElement>(null);
  const contactInfoRef = useRef<HTMLElement>(null);
  const formRef = useRef<HTMLElement>(null);
  const mapRef = useRef<HTMLDivElement>(null);

  // InView hooks for each section
  const heroInView = useInView(heroRef, { once: true, amount: 0.3 });
  const contactInfoInView = useInView(contactInfoRef, { once: true, amount: 0.2 });
  const formInView = useInView(formRef, { once: true, amount: 0.1 });
  const mapInView = useInView(mapRef, { once: true, amount: 0.3 });

  // Update animation states
  useEffect(() => {
    if (heroInView && !hasAnimated.hero) {
      setHasAnimated(prev => ({ ...prev, hero: true }));
    }
  }, [heroInView, hasAnimated.hero]);

  useEffect(() => {
    if (contactInfoInView && !hasAnimated.contactInfo) {
      setHasAnimated(prev => ({ ...prev, contactInfo: true }));
    }
  }, [contactInfoInView, hasAnimated.contactInfo]);

  useEffect(() => {
    if (formInView && !hasAnimated.form) {
      setHasAnimated(prev => ({ ...prev, form: true }));
    }
  }, [formInView, hasAnimated.form]);

  useEffect(() => {
    if (mapInView && !hasAnimated.map) {
      setHasAnimated(prev => ({ ...prev, map: true }));
    }
  }, [mapInView, hasAnimated.map]);

  // Animation class generator
  const getAnimationClass = (animationType: string) => {
    const baseClass = 'transition-all duration-1000 ease-out';
    
    switch (animationType) {
      case 'fadeUp':
        return contactInfoInView 
          ? `${baseClass} opacity-100 transform translate-y-0` 
          : `${baseClass} opacity-0 transform translate-y-8`;
      
      case 'slideInLeft':
        return formInView 
          ? `${baseClass} opacity-100 transform translate-x-0` 
          : `${baseClass} opacity-0 transform -translate-x-8`;
      
      case 'slideInRight':
        return mapInView 
          ? `${baseClass} opacity-100 transform translate-x-0` 
          : `${baseClass} opacity-0 transform translate-x-8`;
      
      case 'scaleIn':
        return heroInView 
          ? `${baseClass} opacity-100 transform scale-100` 
          : `${baseClass} opacity-0 transform scale-95`;
      
      default:
        return baseClass;
    }
  };

  // Staggered animation generator
  const getStaggeredAnimation = (index: number, delay: number = 0.1) => {
    const baseDelay = index * delay;
    
    return {
      initial: { opacity: 0, y: 20 },
      animate: contactInfoInView 
        ? { opacity: 1, y: 0 } 
        : { opacity: 0, y: 20 },
      transition: { 
        duration: 0.6, 
        delay: contactInfoInView ? baseDelay : 0,
        ease: 'easeOut'
      }
    };
  };

  // Form validation states
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});
  const [isFormValid, setIsFormValid] = useState(false);

  // Form field validation
  const validateField = (name: string, value: string) => {
    const errors: Record<string, string> = {};

    switch (name) {
      case 'email':
        if (value && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
          errors.email = 'Please enter a valid email address';
        }
        break;
      
      case 'phone':
        if (value && !/^[\+]?[1-9][\d]{0,15}$/.test(value.replace(/\s/g, ''))) {
          errors.phone = 'Please enter a valid phone number';
        }
        break;
      
      case 'name':
        if (!value.trim()) {
          errors.name = 'Name is required';
        }
        break;
      
      case 'subject':
        if (!value.trim()) {
          errors.subject = 'Subject is required';
        }
        break;
      
      case 'message':
        if (!value.trim()) {
          errors.message = 'Message is required';
        } else if (value.trim().length < 10) {
          errors.message = 'Message should be at least 10 characters long';
        }
        break;
    }

    return errors;
  };

  // Contact form submission handler
  const handleContactSubmit = async (formData: Record<string, string>) => {
    // Validate all fields
    const allErrors: Record<string, string> = {};
    
    Object.entries(formData).forEach(([key, value]) => {
      const fieldErrors = validateField(key, value);
      Object.assign(allErrors, fieldErrors);
    });

    setFormErrors(allErrors);
    
    if (Object.keys(allErrors).length === 0) {
      setIsFormValid(true);
      
      // Simulate API call
      try {
        // In a real application, you would send the data to your backend
        console.log('Submitting form data:', formData);
        
        // Simulate delay
        await new Promise(resolve => setTimeout(resolve, 2000));
        
        return { success: true, message: 'Thank you for your message! We\'ll get back to you within 24 hours.' };
      } catch (error) {
        return { success: false, message: 'There was an error sending your message. Please try again.' };
      }
    } else {
      setIsFormValid(false);
      return { success: false, message: 'Please fix the errors in the form.' };
    }
  };

  // Scroll to section utility
  const scrollToSection = (sectionRef: React.RefObject<HTMLElement>) => {
    if (sectionRef.current) {
      const headerHeight = 80; // Approximate header height
      const targetPosition = sectionRef.current.offsetTop - headerHeight;
      
      window.scrollTo({
        top: targetPosition,
        behavior: 'smooth'
      });
    }
  };

  return {
    // Refs
    heroRef,
    contactInfoRef,
    formRef,
    mapRef,
    
    // Animation states
    hasAnimated,
    
    // InView states
    heroInView,
    contactInfoInView,
    formInView,
    mapInView,
    
    // Animation utilities
    getAnimationClass,
    getStaggeredAnimation,
    
    // Form utilities
    formErrors,
    isFormValid,
    validateField,
    handleContactSubmit,
    
    // Navigation utilities
    scrollToSection
  };
};
