// Advanced Animation Configurations for Homepage
export const ANIMATION_CONFIG = {
  // Duration settings
  durations: {
    fast: 300,
    normal: 500,
    slow: 700,
    extraSlow: 1000
  },
  
  // Easing functions
  easings: {
    easeOut: 'ease-out',
    easeIn: 'ease-in',
    easeInOut: 'ease-in-out',
    bounceOut: 'cubic-bezier(0.68, -0.55, 0.265, 1.55)',
    smoothOut: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)'
  },
  
  // Stagger delays for sequential animations
  staggerDelays: {
    stats: 150,
    features: 200,
    projects: 180,
    testimonials: 120
  },
  
  // Scroll trigger thresholds
  scrollTriggers: {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  },
  
  // Counter animation settings
  counter: {
    duration: 2000,
    steps: 60,
    easing: (progress: number) => 1 - Math.pow(1 - progress, 4) // easeOutQuart
  },
  
  // Particle effects configuration
  particles: {
    count: 6,
    minDuration: 2,
    maxDuration: 4,
    colors: {
      day: ['#f59e0b', '#fb923c', '#ef4444'],
      night: ['#3b82f6', '#06b6d4', '#8b5cf6']
    }
  },
  
  // Hover effects configuration
  hoverEffects: {
    scale: 'hover:scale-105',
    lift: 'hover:-translate-y-2',
    glow: 'hover:shadow-xl',
    rotate: 'hover:rotate-3'
  }
};

// Advanced animation utilities
export const createStaggeredAnimation = (
  elementId: string, 
  index: number, 
  baseClass: string = '',
  isAnimated: boolean = false,
  delay: number = ANIMATION_CONFIG.staggerDelays.features
) => {
  const animationDelay = isAnimated ? index * delay : 0;
  return `${baseClass} transition-all duration-${ANIMATION_CONFIG.durations.slow} ${ANIMATION_CONFIG.easings.bounceOut} ${
    isAnimated 
      ? 'opacity-100 translate-y-0 scale-100' 
      : 'opacity-0 translate-y-8 scale-95'
  }`;
};

export const createCounterAnimation = (
  target: number,
  duration: number = ANIMATION_CONFIG.counter.duration,
  callback: (value: number) => void
) => {
  const steps = ANIMATION_CONFIG.counter.steps;
  const stepTime = duration / steps;
  let currentStep = 0;
  
  const interval = setInterval(() => {
    currentStep++;
    const progress = currentStep / steps;
    const easedProgress = ANIMATION_CONFIG.counter.easing(progress);
    const currentValue = Math.floor(target * easedProgress);
    
    callback(currentValue);
    
    if (currentStep >= steps) {
      clearInterval(interval);
      callback(target);
    }
  }, stepTime);
  
  return interval;
};

export const createParticleAnimation = (
  theme: 'day' | 'night',
  count: number = ANIMATION_CONFIG.particles.count
) => {
  const colors = ANIMATION_CONFIG.particles.colors[theme];
  return Array.from({ length: count }, (_, i) => ({
    id: i,
    color: colors[Math.floor(Math.random() * colors.length)],
    left: `${Math.random() * 100}%`,
    top: `${Math.random() * 100}%`,
    duration: ANIMATION_CONFIG.particles.minDuration + Math.random() * (ANIMATION_CONFIG.particles.maxDuration - ANIMATION_CONFIG.particles.minDuration),
    delay: i * 200
  }));
};

// Intersection Observer with animation triggers
export const createAnimationObserver = (
  callback: (elementId: string) => void,
  options = ANIMATION_CONFIG.scrollTriggers
) => {
  return new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const elementId = entry.target.getAttribute('data-animate');
        if (elementId) {
          callback(elementId);
        }
      }
    });
  }, options);
};

// Theme-aware animation classes
export const getThemeAnimationClasses = (theme: 'day' | 'night') => ({
  glow: theme === 'day' 
    ? 'hover:shadow-amber-200/50 hover:shadow-xl' 
    : 'hover:shadow-blue-500/30 hover:shadow-xl',
  gradient: theme === 'day'
    ? 'bg-gradient-to-r from-amber-500 to-orange-500'
    : 'bg-gradient-to-r from-blue-500 to-cyan-500',
  textGradient: theme === 'day'
    ? 'bg-gradient-to-r from-amber-600 to-orange-600'
    : 'bg-gradient-to-r from-blue-400 to-cyan-400',
  border: theme === 'day'
    ? 'border-amber-300'
    : 'border-blue-400'
});

// Performance optimized animation frame
export const requestAnimationFrame = (callback: () => void) => {
  if (typeof window !== 'undefined') {
    return window.requestAnimationFrame(callback);
  }
  return setTimeout(callback, 16);
};

// Prefers reduced motion check
export const shouldReduceMotion = () => {
  if (typeof window !== 'undefined') {
    return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  }
  return false;
};

// Advanced scroll animations with momentum
export const createScrollAnimation = (
  element: HTMLElement,
  options: {
    translateY?: number;
    opacity?: number;
    scale?: number;
    rotate?: number;
    duration?: number;
  } = {}
) => {
  const {
    translateY = 20,
    opacity = 0,
    scale = 0.95,
    rotate = 0,
    duration = ANIMATION_CONFIG.durations.normal
  } = options;

  if (shouldReduceMotion()) {
    return;
  }

  element.style.transform = `translateY(${translateY}px) scale(${scale}) rotate(${rotate}deg)`;
  element.style.opacity = opacity.toString();
  element.style.transition = `all ${duration}ms ${ANIMATION_CONFIG.easings.smoothOut}`;

  // Trigger animation
  requestAnimationFrame(() => {
    element.style.transform = 'translateY(0) scale(1) rotate(0deg)';
    element.style.opacity = '1';
  });
};

// Magnetic effect for interactive elements
export const createMagneticEffect = (element: HTMLElement, strength: number = 0.3) => {
  if (shouldReduceMotion()) return;

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
};
