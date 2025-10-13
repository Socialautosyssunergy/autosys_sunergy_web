// React hook for Google Analytics tracking
'use client';

import { useEffect, useCallback } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';
import * as analytics from '@/utils/analytics';

// Types for analytics
interface Product {
  name: string;
  price: number;
  id?: string;
  category?: string;
  brand?: string;
}

export function useAnalytics() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  // Track page views on route changes
  useEffect(() => {
    const url = pathname + (searchParams?.toString() ? `?${searchParams.toString()}` : '');
    analytics.trackPageView(url);
  }, [pathname, searchParams]);

  // Memoized tracking functions
  const trackEvent = useCallback((event: Parameters<typeof analytics.trackEvent>[0]) => {
    analytics.trackEvent(event);
  }, []);

  const trackConversion = useCallback((eventName: string, data?: Record<string, unknown>) => {
    analytics.trackConversion(eventName, data);
  }, []);

  const trackFormSubmission = useCallback((formName: string, formType?: string) => {
    analytics.trackFormSubmission(formName, formType);
  }, []);

  const trackPhoneCall = useCallback((phoneNumber: string) => {
    analytics.trackPhoneCall(phoneNumber);
  }, []);

  const trackEmailClick = useCallback((emailAddress: string) => {
    analytics.trackEmailClick(emailAddress);
  }, []);

  const trackWhatsAppClick = useCallback((phoneNumber: string) => {
    analytics.trackWhatsAppClick(phoneNumber);
  }, []);

  const trackCalculatorUsage = useCallback((calculationType: string, result: Record<string, unknown>) => {
    analytics.trackCalculatorUsage(calculationType, result);
  }, []);

  const trackQuoteRequest = useCallback((productType: string, projectSize?: string) => {
    analytics.trackQuoteRequest(productType, projectSize);
  }, []);

  const trackVideoPlay = useCallback((videoTitle: string, videoId?: string) => {
    analytics.trackVideoPlay(videoTitle, videoId);
  }, []);

  const trackFileDownload = useCallback((fileName: string, fileType: string) => {
    analytics.trackFileDownload(fileName, fileType);
  }, []);

  const trackSocialClick = useCallback((platform: string, action?: string) => {
    analytics.trackSocialClick(platform, action);
  }, []);

  const trackScrollDepth = useCallback((percentage: number) => {
    analytics.trackScrollDepth(percentage);
  }, []);

  const trackSiteSearch = useCallback((searchTerm: string, resultsCount: number) => {
    analytics.trackSiteSearch(searchTerm, resultsCount);
  }, []);

  const trackAIInteraction = useCallback((interactionType: string, message?: string) => {
    analytics.trackAIInteraction(interactionType, message);
  }, []);

  const trackServiceInteraction = useCallback((serviceName: string, action: string) => {
    analytics.trackServiceInteraction(serviceName, action);
  }, []);

  const trackProductInterest = useCallback((productName: string, action?: string) => {
    analytics.trackProductInterest(productName, action);
  }, []);

  return {
    trackEvent,
    trackConversion,
    trackFormSubmission,
    trackPhoneCall,
    trackEmailClick,
    trackWhatsAppClick,
    trackCalculatorUsage,
    trackQuoteRequest,
    trackVideoPlay,
    trackFileDownload,
    trackSocialClick,
    trackScrollDepth,
    trackSiteSearch,
    trackAIInteraction,
    trackServiceInteraction,
    trackProductInterest,
  };
}

// Hook for scroll depth tracking
export function useScrollTracking() {
  useEffect(() => {
    let ticking = false;
    const trackedDepths = new Set<number>();

    const handleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          const scrollTop = window.pageYOffset;
          const docHeight = document.documentElement.scrollHeight - window.innerHeight;
          const scrollPercent = Math.floor((scrollTop / docHeight) * 100);

          // Track scroll milestones
          [25, 50, 75, 100].forEach(depth => {
            if (scrollPercent >= depth && !trackedDepths.has(depth)) {
              trackedDepths.add(depth);
              analytics.trackScrollDepth(depth);
            }
          });

          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
}

// Hook for form tracking
export function useFormTracking() {
  const { trackFormSubmission, trackEvent } = useAnalytics();

  const trackFormStart = useCallback((formName: string) => {
    trackEvent({
      action: 'form_start',
      category: 'engagement',
      label: formName,
    });
  }, [trackEvent]);

  const trackFormError = useCallback((formName: string, errorField: string) => {
    trackEvent({
      action: 'form_error',
      category: 'engagement',
      label: `${formName} - ${errorField}`,
    });
  }, [trackEvent]);

  const trackFormSuccess = useCallback((formName: string, formType?: string) => {
    trackFormSubmission(formName, formType);
  }, [trackFormSubmission]);

  return {
    trackFormStart,
    trackFormError,
    trackFormSuccess,
  };
}

// Hook for video tracking
export function useVideoTracking() {
  const { trackVideoPlay, trackEvent } = useAnalytics();

  const trackVideoStart = useCallback((videoTitle: string, videoId?: string) => {
    trackVideoPlay(videoTitle, videoId);
  }, [trackVideoPlay]);

  const trackVideoProgress = useCallback((videoTitle: string, percentage: number) => {
    if (percentage === 25 || percentage === 50 || percentage === 75 || percentage === 100) {
      trackEvent({
        action: 'video_progress',
        category: 'engagement',
        label: `${videoTitle} - ${percentage}%`,
        value: percentage,
      });
    }
  }, [trackEvent]);

  const trackVideoComplete = useCallback((videoTitle: string) => {
    trackEvent({
      action: 'video_complete',
      category: 'engagement',
      label: videoTitle,
    });
  }, [trackEvent]);

  return {
    trackVideoStart,
    trackVideoProgress,
    trackVideoComplete,
  };
}

// Hook for ecommerce tracking
export function useEcommerceTracking() {
  const { trackEvent, trackConversion } = useAnalytics();

  const trackAddToCart = useCallback((product: Product) => {
    trackEvent({
      action: 'add_to_cart',
      category: 'ecommerce',
      label: product.name,
      value: product.price,
    });
  }, [trackEvent]);

  const trackRemoveFromCart = useCallback((product: Product) => {
    trackEvent({
      action: 'remove_from_cart',
      category: 'ecommerce',
      label: product.name,
      value: product.price,
    });
  }, [trackEvent]);

  const trackBeginCheckout = useCallback((cartValue: number, itemCount: number) => {
    trackEvent({
      action: 'begin_checkout',
      category: 'ecommerce',
      value: cartValue,
    });
    
    trackConversion('begin_checkout', {
      cart_value: cartValue,
      item_count: itemCount,
    });
  }, [trackEvent, trackConversion]);

  const trackPurchase = useCallback((transactionId: string, items: Product[]) => {
    analytics.trackPurchase(transactionId, items);
  }, []);

  return {
    trackAddToCart,
    trackRemoveFromCart,
    trackBeginCheckout,
    trackPurchase,
  };
}
