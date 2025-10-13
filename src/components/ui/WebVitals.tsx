'use client';

import { useEffect } from 'react';
import { Metric } from 'web-vitals';

export function WebVitals() {
  useEffect(() => {
    // Only run in production
    if (process.env.NODE_ENV !== 'production') return;

    async function trackWebVitals() {
      try {
        const { onCLS, onINP, onFCP, onLCP, onTTFB } = await import('web-vitals');
        
        // Function to send metrics to analytics
        function sendToAnalytics(metric: Metric) {
          // Send to Google Analytics if available
          if (
            typeof window !== 'undefined' &&
            typeof (window as unknown as { gtag?: unknown }).gtag === 'function'
          ) {
            (window as unknown as { gtag: (...args: unknown[]) => void }).gtag(
              'event',
              metric.name,
              {
                event_category: 'Web Vitals',
                event_label: metric.id,
                value: Math.round(
                  metric.name === 'CLS' ? metric.value * 1000 : metric.value
                ),
                non_interaction: true,
              }
            );
          }

          // Log to console for debugging
          console.log('Web Vital:', metric);

          // Send to performance monitoring service
          if (process.env.NEXT_PUBLIC_PERFORMANCE_API) {
            fetch('/api/web-vitals', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({
                name: metric.name,
                value: metric.value,
                id: metric.id,
                url: window.location.href,
                userAgent: navigator.userAgent,
                timestamp: Date.now(),
              }),
            }).catch(console.error);
          }
        }

        // Track all Core Web Vitals (using the correct functions for v5)
        onCLS(sendToAnalytics);
        onINP(sendToAnalytics); // INP replaced FID in v4+
        onFCP(sendToAnalytics);
        onLCP(sendToAnalytics);
        onTTFB(sendToAnalytics);
      } catch (error) {
        console.error('Failed to load web-vitals:', error);
      }
    }

    // Track on initial load
    trackWebVitals();

    // Track on page visibility change (for SPA navigation)
    const handleVisibilityChange = () => {
      if (document.visibilityState === 'hidden') {
        trackWebVitals();
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);
    
    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, []);

  return null;
}

export default WebVitals;
