/**
 * Performance optimization utilities for Autosys Sunergy website
 */

export interface PerformanceMetrics {
  fcp: number; // First Contentful Paint
  lcp: number; // Largest Contentful Paint
  cls: number; // Cumulative Layout Shift
  fid: number; // First Input Delay
  ttfb: number; // Time to First Byte
}

export class PerformanceMonitor {
  private static instance: PerformanceMonitor;
  private metrics: Partial<PerformanceMetrics> = {};
  private observers: PerformanceObserver[] = [];

  static getInstance(): PerformanceMonitor {
    if (!PerformanceMonitor.instance) {
      PerformanceMonitor.instance = new PerformanceMonitor();
    }
    return PerformanceMonitor.instance;
  }

  constructor() {
    if (typeof window !== 'undefined') {
      this.initializeObservers();
    }
  }

  private initializeObservers(): void {
    // Largest Contentful Paint
    if ('PerformanceObserver' in window) {
      try {
        const lcpObserver = new PerformanceObserver((list) => {
          const entries = list.getEntries();
          const lastEntry = entries[entries.length - 1] as PerformanceEntry & { startTime: number };
          this.metrics.lcp = lastEntry.startTime;
        });
        lcpObserver.observe({ entryTypes: ['largest-contentful-paint'] });
        this.observers.push(lcpObserver);
      } catch (e: unknown) {
        console.warn('LCP observer not supported');
      }

      // First Input Delay
      try {
        const fidObserver = new PerformanceObserver((list) => {
          const entries = list.getEntries();
          entries.forEach((entry) => {
            const fidEntry = entry as PerformanceEntry & { processingStart: number; startTime: number };
            this.metrics.fid = fidEntry.processingStart - fidEntry.startTime;
          });
        });
        fidObserver.observe({ entryTypes: ['first-input'] });
        this.observers.push(fidObserver);
      } catch (e: unknown) {
        console.warn('FID observer not supported');
      }

      // Cumulative Layout Shift
      try {
        let clsValue = 0;
        const clsObserver = new PerformanceObserver((list) => {
          const entries = list.getEntries();
          entries.forEach((entry) => {
            const clsEntry = entry as PerformanceEntry & { hadRecentInput: boolean; value: number };
            if (!clsEntry.hadRecentInput) {
              clsValue += clsEntry.value;
              this.metrics.cls = clsValue;
            }
          });
        });
        clsObserver.observe({ entryTypes: ['layout-shift'] });
        this.observers.push(clsObserver);
      } catch (e: unknown) {
        console.warn('CLS observer not supported');
      }
    }

    // First Contentful Paint
    if ('performance' in window && 'getEntriesByType' in performance) {
      const paintEntries = performance.getEntriesByType('paint');
      const fcpEntry = paintEntries.find(entry => entry.name === 'first-contentful-paint');
      if (fcpEntry) {
        this.metrics.fcp = fcpEntry.startTime;
      }
    }

    // Time to First Byte
    if ('performance' in window && 'timing' in performance) {
      window.addEventListener('load', () => {
        const navigationTiming = performance.timing;
        this.metrics.ttfb = navigationTiming.responseStart - navigationTiming.requestStart;
      });
    }
  }

  getMetrics(): Partial<PerformanceMetrics> {
    return { ...this.metrics };
  }

  getPerformanceScore(): number {
    const { fcp = 0, lcp = 0, cls = 0, fid = 0 } = this.metrics;
    
    // Scoring based on Google's thresholds
    let score = 100;
    
    // FCP scoring (good: <1.8s, needs improvement: 1.8-3.0s, poor: >3.0s)
    if (fcp > 3000) score -= 25;
    else if (fcp > 1800) score -= 10;
    
    // LCP scoring (good: <2.5s, needs improvement: 2.5-4.0s, poor: >4.0s)
    if (lcp > 4000) score -= 25;
    else if (lcp > 2500) score -= 10;
    
    // CLS scoring (good: <0.1, needs improvement: 0.1-0.25, poor: >0.25)
    if (cls > 0.25) score -= 25;
    else if (cls > 0.1) score -= 10;
    
    // FID scoring (good: <100ms, needs improvement: 100-300ms, poor: >300ms)
    if (fid > 300) score -= 25;
    else if (fid > 100) score -= 10;
    
    return Math.max(0, score);
  }

  logPerformanceReport(): void {
    if (process.env.NODE_ENV === 'development') {
      console.group('🚀 Performance Report - Autosys Sunergy');
      console.log('Metrics:', this.getMetrics());
      console.log('Score:', this.getPerformanceScore() + '/100');
      console.groupEnd();
    }
  }

  // Resource hints for better performance
  preloadResource(href: string, as: string, type?: string): void {
    if (typeof document !== 'undefined') {
      const link = document.createElement('link');
      link.rel = 'preload';
      link.href = href;
      link.as = as;
      if (type) link.type = type;
      document.head.appendChild(link);
    }
  }

  prefetchResource(href: string): void {
    if (typeof document !== 'undefined') {
      const link = document.createElement('link');
      link.rel = 'prefetch';
      link.href = href;
      document.head.appendChild(link);
    }
  }

  // Image optimization helpers
  generateResponsiveSizes(breakpoints: { [key: string]: number }): string {
    return Object.entries(breakpoints)
      .map(([media, width]) => `(max-width: ${media}) ${width}px`)
      .join(', ');
  }

  // Critical resource loading
  loadCriticalCSS(css: string): void {
    if (typeof document !== 'undefined') {
      const style = document.createElement('style');
      style.textContent = css;
      document.head.appendChild(style);
    }
  }

  // Lazy loading intersection observer
  createLazyLoadObserver(callback: (entries: IntersectionObserverEntry[]) => void): IntersectionObserver | null {
    if (typeof window !== 'undefined' && 'IntersectionObserver' in window) {
      return new IntersectionObserver(callback, {
        root: null,
        rootMargin: '50px',
        threshold: 0.1
      });
    }
    return null;
  }

  // Service Worker utilities
  registerServiceWorker(swPath: string = '/sw.js'): Promise<ServiceWorkerRegistration | null> {
    if (typeof navigator !== 'undefined' && 'serviceWorker' in navigator) {
      return navigator.serviceWorker.register(swPath);
    }
    return Promise.resolve(null);
  }

  // Performance budget monitoring
  checkPerformanceBudget(): {
    passed: boolean;
    issues: string[];
  } {
    const issues: string[] = [];
    const { fcp, lcp, cls, fid, ttfb } = this.metrics;

    if (fcp && fcp > 2000) issues.push(`FCP too slow: ${fcp}ms (budget: <2000ms)`);
    if (lcp && lcp > 2500) issues.push(`LCP too slow: ${lcp}ms (budget: <2500ms)`);
    if (cls && cls > 0.1) issues.push(`CLS too high: ${cls} (budget: <0.1)`);
    if (fid && fid > 100) issues.push(`FID too slow: ${fid}ms (budget: <100ms)`);
    if (ttfb && ttfb > 200) issues.push(`TTFB too slow: ${ttfb}ms (budget: <200ms)`);

    return {
      passed: issues.length === 0,
      issues
    };
  }

  cleanup(): void {
    this.observers.forEach(observer => observer.disconnect());
    this.observers = [];
  }
}

// Export singleton instance
export const performanceMonitor = PerformanceMonitor.getInstance();

// Utility functions
export function measurePerformance<T>(
  fn: () => T,
  label: string
): T {
  if (typeof performance !== 'undefined') {
    const start = performance.now();
    const result = fn();
    const end = performance.now();
    console.log(`⚡ ${label}: ${(end - start).toFixed(2)}ms`);
    return result;
  }
  return fn();
}

export function debounce<T extends (...args: unknown[]) => unknown>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timeout: NodeJS.Timeout;
  return function(this: unknown, ...args: Parameters<T>) {
    clearTimeout(timeout);
    timeout = setTimeout(() => func.apply(this, args), wait);
  };
}

export function throttle<T extends (...args: unknown[]) => unknown>(
  func: T,
  limit: number
): (...args: Parameters<T>) => void {
  let inThrottle: boolean;
  return function(this: unknown, ...args: Parameters<T>) {
    if (!inThrottle) {
      func.apply(this, args);
      inThrottle = true;
      setTimeout(() => inThrottle = false, limit);
    }
  };
}

// Critical CSS for above-the-fold content
export const criticalCSS = `
  /* Critical styles for initial paint */
  body {
    font-family: var(--font-geist-sans), system-ui, sans-serif;
    line-height: 1.6;
    margin: 0;
    padding: 0;
  }
  
  .hero-section {
    min-height: 100vh;
    background: linear-gradient(135deg, #3b82f6, #1d4ed8);
    display: flex;
    align-items: center;
    justify-content: center;
  }
  
  .loading-skeleton {
    background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%);
    background-size: 200% 100%;
    animation: loading 1.5s infinite;
  }
  
  @keyframes loading {
    0% { background-position: 200% 0; }
    100% { background-position: -200% 0; }
  }
  
  /* Hide non-critical content initially */
  .below-fold {
    visibility: hidden;
  }
  
  .below-fold.loaded {
    visibility: visible;
  }
`;

// Initialize performance monitoring
if (typeof window !== 'undefined') {
  // Start monitoring when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
      setTimeout(() => performanceMonitor.logPerformanceReport(), 2000);
    });
  } else {
    setTimeout(() => performanceMonitor.logPerformanceReport(), 2000);
  }
}