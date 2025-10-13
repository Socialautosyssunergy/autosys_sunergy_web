'use client';
import { useState, useEffect, useRef, useCallback } from 'react';
import { ANIMATION_CONFIG, createAnimationObserver, createCounterAnimation, shouldReduceMotion } from '@/utils/animationUtils';

export interface AnimationState {
  isVisible: boolean;
  hasAnimated: boolean;
  progress: number;
}

export interface CounterState {
  customers: number;
  experience: number;
  capacity: number;
  rating: number;
}

export const useHomepageAnimations = () => {
  const [animatedElements, setAnimatedElements] = useState<Set<string>>(new Set());
  const [counters, setCounters] = useState<CounterState>({ 
    customers: 0, 
    experience: 0, 
    capacity: 0, 
    rating: 0 
  });
  const [hasCounterStarted, setHasCounterStarted] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  // Refs for intersection observer
  const trustBannerRef = useRef<HTMLElement>(null);
  const valuePropRef = useRef<HTMLElement>(null);
  const solutionsRef = useRef<HTMLElement>(null);
  const projectsRef = useRef<HTMLElement>(null);
  const contactRef = useRef<HTMLElement>(null);

  // Counter animation with easing
  const animateCounters = useCallback(() => {
    if (shouldReduceMotion()) {
      setCounters({ customers: 2000, experience: 18, capacity: 50, rating: 4.9 });
      return;
    }

    const targets = { customers: 2000, experience: 18, capacity: 50, rating: 4.9 };
    
    // Animate each counter with different durations for variety
    createCounterAnimation(targets.customers, 2000, (value) => {
      setCounters(prev => ({ ...prev, customers: value }));
    });
    
    createCounterAnimation(targets.experience, 1500, (value) => {
      setCounters(prev => ({ ...prev, experience: value }));
    });
    
    createCounterAnimation(targets.capacity, 1800, (value) => {
      setCounters(prev => ({ ...prev, capacity: value }));
    });
    
    createCounterAnimation(Math.round(targets.rating * 10), 1600, (value) => {
      setCounters(prev => ({ ...prev, rating: value / 10 }));
    });
  }, []);

  // Intersection Observer setup
  useEffect(() => {
    if (shouldReduceMotion()) {
      // Skip animations if user prefers reduced motion
      setAnimatedElements(new Set(['trust-banner', 'value-prop', 'solutions', 'projects', 'contact']));
      if (!hasCounterStarted) {
        setHasCounterStarted(true);
        animateCounters();
      }
      return;
    }

    const observer = createAnimationObserver((elementId) => {
      setAnimatedElements(prev => new Set([...prev, elementId]));
      
      // Start counter animation for trust banner
      if (elementId === 'trust-banner' && !hasCounterStarted) {
        setHasCounterStarted(true);
        // Delay counter animation for better visual effect
        setTimeout(() => {
          animateCounters();
        }, 300);
      }
    });

    // Observe all elements with data-animate attribute
    const elementsToObserve = [
      trustBannerRef.current,
      valuePropRef.current,
      solutionsRef.current,
      projectsRef.current,
      contactRef.current
    ].filter(Boolean) as HTMLElement[];

    elementsToObserve.forEach((el) => {
      observer.observe(el);
    });

    return () => observer.disconnect();
  }, [hasCounterStarted, animateCounters]);

  // Scroll handler with throttling
  useEffect(() => {
    let timeoutId: NodeJS.Timeout;
    
    const handleScroll = () => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        setIsScrolled(window.scrollY > 50);
      }, 10);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', handleScroll);
      clearTimeout(timeoutId);
    };
  }, []);

  // Animation helper functions
  const getAnimationClass = useCallback((elementId: string, baseClass: string = '') => {
    const isAnimated = animatedElements.has(elementId);
    const reduceMotion = shouldReduceMotion();
    
    if (reduceMotion) {
      return `${baseClass} opacity-100 translate-y-0 scale-100`;
    }
    
    return `${baseClass} transition-all duration-1000 ease-out ${
      isAnimated 
        ? 'opacity-100 translate-y-0 scale-100' 
        : 'opacity-0 translate-y-8 scale-95'
    }`;
  }, [animatedElements]);

  const getStaggeredAnimation = useCallback((
    elementId: string, 
    index: number, 
    baseClass: string = '',
    delayMultiplier: number = 150
  ) => {
    const isAnimated = animatedElements.has(elementId);
    const reduceMotion = shouldReduceMotion();
    
    if (reduceMotion) {
      return `${baseClass} opacity-100 translate-y-0 scale-100`;
    }
    
    return `${baseClass} transition-all duration-700 ease-out ${
      isAnimated 
        ? 'opacity-100 translate-y-0 scale-100' 
        : 'opacity-0 translate-y-8 scale-95'
    }`;
  }, [animatedElements]);

  // Parallax effect for background elements
  const getParallaxOffset = useCallback((multiplier: number = 0.5) => {
    if (shouldReduceMotion()) return 0;
    return isScrolled ? window.scrollY * multiplier : 0;
  }, [isScrolled]);

  // Pulse animation for interactive elements
  const getPulseClass = useCallback((isActive: boolean = false) => {
    if (shouldReduceMotion()) return '';
    return isActive ? 'animate-pulse' : '';
  }, []);

  return {
    // State
    animatedElements,
    counters,
    hasCounterStarted,
    isScrolled,
    
    // Refs
    trustBannerRef,
    valuePropRef,
    solutionsRef,
    projectsRef,
    contactRef,
    
    // Animation helpers
    getAnimationClass,
    getStaggeredAnimation,
    getParallaxOffset,
    getPulseClass,
    
    // Actions
    animateCounters
  };
};

// Hook for element visibility tracking
export const useElementVisible = (threshold: number = 0.1) => {
  const [isVisible, setIsVisible] = useState(false);
  const elementRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
      },
      { threshold }
    );

    const currentElement = elementRef.current;
    if (currentElement) {
      observer.observe(currentElement);
    }

    return () => {
      if (currentElement) {
        observer.unobserve(currentElement);
      }
    };
  }, [threshold]);

  return { isVisible, elementRef };
};

// Hook for magnetic hover effect
export const useMagneticHover = (strength: number = 0.3) => {
  const elementRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const element = elementRef.current;
    if (!element || shouldReduceMotion()) return;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = element.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      
      const deltaX = (e.clientX - centerX) * strength;
      const deltaY = (e.clientY - centerY) * strength;
      
      element.style.transform = `translate(${deltaX}px, ${deltaY}px)`;
    };

    const handleMouseLeave = () => {
      element.style.transform = 'translate(0, 0)';
    };

    element.addEventListener('mousemove', handleMouseMove);
    element.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      element.removeEventListener('mousemove', handleMouseMove);
      element.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [strength]);

  return elementRef;
};
