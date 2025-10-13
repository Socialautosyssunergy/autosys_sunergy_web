// Performance Optimization Utilities
export class PerformanceOptimizer {
  private static instance: PerformanceOptimizer;

  public static getInstance(): PerformanceOptimizer {
    if (!PerformanceOptimizer.instance) {
      PerformanceOptimizer.instance = new PerformanceOptimizer();
    }
    return PerformanceOptimizer.instance;
  }

  // Preload critical resources
  preloadResource(href: string, as: 'script' | 'style' | 'font' | 'image' | 'video', crossorigin?: boolean) {
    if (typeof window === 'undefined') return;

    const link = document.createElement('link');
    link.rel = 'preload';
    link.href = href;
    link.as = as;
    
    if (crossorigin) {
      link.crossOrigin = 'anonymous';
    }
    
    if (as === 'font') {
      link.type = 'font/woff2';
      link.crossOrigin = 'anonymous';
    }
    
    document.head.appendChild(link);
  }

  // Lazy load images with Intersection Observer
  lazyLoadImages() {
    if (typeof window === 'undefined' || !('IntersectionObserver' in window)) return;

    const images = document.querySelectorAll('img[data-src]');
    
    const imageObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const img = entry.target as HTMLImageElement;
          img.src = img.dataset.src!;
          img.removeAttribute('data-src');
          imageObserver.unobserve(img);
        }
      });
    }, {
      rootMargin: '50px 0px'
    });

    images.forEach(img => imageObserver.observe(img));
  }

  // Defer non-critical scripts
  deferScript(src: string, onLoad?: () => void) {
    if (typeof window === 'undefined') return;

    const script = document.createElement('script');
    script.src = src;
    script.defer = true;
    script.async = true;
    
    if (onLoad) {
      script.onload = onLoad;
    }
    
    document.body.appendChild(script);
  }

  // Monitor Core Web Vitals thresholds
  checkWebVitals() {
    if (typeof window === 'undefined') return;

    // LCP should be < 2.5s
    const observer = new PerformanceObserver((list) => {
      const entries = list.getEntries();
      entries.forEach((entry) => {
        if (entry.entryType === 'largest-contentful-paint') {
          const lcp = entry.startTime;
          if (lcp > 2500) {
            console.warn('LCP is slow:', lcp);
          }
        }
      });
    });

    observer.observe({ entryTypes: ['largest-contentful-paint'] });
  }

  // Optimize images based on device capabilities
  getOptimizedImageFormat(): 'webp' | 'avif' | 'jpeg' {
    if (typeof window === 'undefined') return 'jpeg';

    // Check for AVIF support
    const canvas = document.createElement('canvas');
    canvas.width = 1;
    canvas.height = 1;
    
    if (canvas.toDataURL('image/avif').startsWith('data:image/avif')) {
      return 'avif';
    }
    
    // Check for WebP support
    if (canvas.toDataURL('image/webp').startsWith('data:image/webp')) {
      return 'webp';
    }
    
    return 'jpeg';
  }

  // Remove unused CSS (client-side cleanup)
  removeUnusedCSS() {
    if (typeof window === 'undefined' || process.env.NODE_ENV !== 'production') return;

    const allRules: string[] = [];
    
    // Collect all used classes
    const usedClasses = new Set<string>();
    const elements = document.querySelectorAll('*');
    
    elements.forEach(el => {
      if (el.className && typeof el.className === 'string') {
        el.className.split(' ').forEach(cls => {
          if (cls.trim()) usedClasses.add(cls.trim());
        });
      }
    });

    // This is a simplified version - in production you'd want more sophisticated CSS parsing
    console.log('Used classes:', Array.from(usedClasses).length);
  }

  // Measure and log performance metrics
  measurePerformance(label: string, fn: () => void | Promise<void>) {
    if (typeof window === 'undefined') return fn();

    const start = performance.now();
    
    const result = fn();
    
    if (result instanceof Promise) {
      return result.then(res => {
        const end = performance.now();
        console.log(`${label} took ${end - start} milliseconds`);
        return res;
      });
    } else {
      const end = performance.now();
      console.log(`${label} took ${end - start} milliseconds`);
      return result;
    }
  }

  // Service Worker utilities
  registerServiceWorker() {
    if (typeof window === 'undefined' || !('serviceWorker' in navigator)) return;

    window.addEventListener('load', () => {
      navigator.serviceWorker.register('/sw.js')
        .then(registration => {
          console.log('SW registered: ', registration);
          
          // Check for updates
          registration.addEventListener('updatefound', () => {
            const newWorker = registration.installing;
            if (newWorker) {
              newWorker.addEventListener('statechange', () => {
                if (newWorker.state === 'installed' && navigator.serviceWorker.controller) {
                  // New content is available, prompt user to refresh
                  console.log('New content available, refresh page');
                }
              });
            }
          });
        })
        .catch(error => {
          console.log('SW registration failed: ', error);
        });
    });
  }
}

// Export singleton instance
export const performanceOptimizer = PerformanceOptimizer.getInstance();

// Auto-initialize on client
if (typeof window !== 'undefined') {
  // Initialize performance optimizations
  window.addEventListener('DOMContentLoaded', () => {
    performanceOptimizer.lazyLoadImages();
    performanceOptimizer.checkWebVitals();
    
    // Preload critical resources
    performanceOptimizer.preloadResource('/fonts/GeistVF.woff2', 'font', true);
    
    // Register service worker in production
    if (process.env.NODE_ENV === 'production') {
      performanceOptimizer.registerServiceWorker();
    }
  });
}
