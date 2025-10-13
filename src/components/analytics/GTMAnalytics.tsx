// Google Tag Manager enhanced tracking component
'use client';

import { useEffect } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';

declare global {
  interface Window {
    dataLayer: unknown[];
    gtag: (...args: unknown[]) => void;
  }
}

// Types for GTM data
interface GTMItem {
  id?: string;
  sku?: string;
  name: string;
  category?: string;
  brand?: string;
  price: number;
  quantity?: number;
}

interface GTMEventData {
  event: string;
  [key: string]: unknown;
}

// Enhanced GTM tracking component
export function GTMAnalytics() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    // Track page views with enhanced data
    if (typeof window !== 'undefined' && window.gtag) {
      const url = pathname + (searchParams?.toString() ? `?${searchParams.toString()}` : '');
      
      // Enhanced page view tracking
      window.gtag('event', 'page_view', {
        page_title: document.title,
        page_location: window.location.href,
        page_path: url,
        content_group1: getContentGroup(pathname),
        content_group2: getPageType(pathname),
        custom_map: {
          'dimension1': 'page_type',
          'dimension2': 'user_type',
          'dimension3': 'traffic_source'
        }
      });

      // Track user engagement
      trackUserEngagement();
    }
  }, [pathname, searchParams]);

  return null;
}

// Utility functions for enhanced tracking
function getContentGroup(pathname: string): string {
  if (pathname.includes('/services')) return 'Services';
  if (pathname.includes('/products')) return 'Products';
  if (pathname.includes('/about')) return 'About';
  if (pathname.includes('/contact')) return 'Contact';
  if (pathname.includes('/blog')) return 'Blog';
  if (pathname.includes('/careers')) return 'Careers';
  if (pathname === '/') return 'Homepage';
  return 'Other';
}

function getPageType(pathname: string): string {
  if (pathname === '/') return 'homepage';
  if (pathname.includes('/services/')) return 'service_detail';
  if (pathname.includes('/services')) return 'services_listing';
  if (pathname.includes('/products/')) return 'product_detail';
  if (pathname.includes('/products')) return 'products_listing';
  if (pathname.includes('/blog/')) return 'blog_post';
  if (pathname.includes('/blog')) return 'blog_listing';
  return 'content_page';
}

function trackUserEngagement() {
  // Track scroll engagement
  let maxScroll = 0;
  const handleScroll = () => {
    const scrollPercent = Math.round((window.scrollY / (document.body.scrollHeight - window.innerHeight)) * 100);
    if (scrollPercent > maxScroll) {
      maxScroll = scrollPercent;
      
      // Track milestone scrolls
      if ([25, 50, 75, 90].includes(scrollPercent)) {
        window.gtag('event', 'scroll', {
          event_category: 'engagement',
          event_label: `${scrollPercent}%`,
          value: scrollPercent
        });
      }
    }
  };

  // Track time on page
  const startTime = Date.now();
  const trackTimeOnPage = () => {
    const timeSpent = Math.round((Date.now() - startTime) / 1000);
    
    // Track time milestones
    if ([30, 60, 120, 300].includes(timeSpent)) {
      window.gtag('event', 'timing_complete', {
        name: 'time_on_page',
        value: timeSpent,
        event_category: 'engagement'
      });
    }
  };

  // Set up event listeners
  window.addEventListener('scroll', handleScroll, { passive: true });
  
  const timeInterval = setInterval(trackTimeOnPage, 30000); // Check every 30 seconds
  
  // Cleanup on page leave
  const handleBeforeUnload = () => {
    const finalTimeSpent = Math.round((Date.now() - startTime) / 1000);
    window.gtag('event', 'timing_complete', {
      name: 'time_on_page_final',
      value: finalTimeSpent,
      event_category: 'engagement'
    });
  };

  window.addEventListener('beforeunload', handleBeforeUnload);

  // Cleanup function
  return () => {
    window.removeEventListener('scroll', handleScroll);
    window.removeEventListener('beforeunload', handleBeforeUnload);
    clearInterval(timeInterval);
  };
}

// E-commerce Enhanced Tracking
export const trackEnhancedEcommerce = {
  // View item list (products page)
  viewItemList: (items: GTMItem[], listName: string = 'Products') => {
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', 'view_item_list', {
        item_list_id: listName.toLowerCase().replace(' ', '_'),
        item_list_name: listName,
        items: items.map((item, index) => ({
          item_id: item.id || item.sku,
          item_name: item.name,
          item_category: item.category || 'Solar Equipment',
          item_brand: item.brand || 'Autosys Sunergy',
          price: item.price,
          quantity: 1,
          index: index
        }))
      });
    }
  },

  // View item (product detail page)
  viewItem: (item: GTMItem) => {
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', 'view_item', {
        currency: 'INR',
        value: item.price,
        items: [{
          item_id: item.id || item.sku,
          item_name: item.name,
          item_category: item.category || 'Solar Equipment',
          item_brand: item.brand || 'Autosys Sunergy',
          price: item.price,
          quantity: 1
        }]
      });
    }
  },

  // Add to cart
  addToCart: (item: GTMItem, quantity: number = 1) => {
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', 'add_to_cart', {
        currency: 'INR',
        value: item.price * quantity,
        items: [{
          item_id: item.id || item.sku,
          item_name: item.name,
          item_category: item.category || 'Solar Equipment',
          item_brand: item.brand || 'Autosys Sunergy',
          price: item.price,
          quantity: quantity
        }]
      });
    }
  },

  // Begin checkout
  beginCheckout: (items: GTMItem[], total: number) => {
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', 'begin_checkout', {
        currency: 'INR',
        value: total,
        items: items.map(item => ({
          item_id: item.id || item.sku,
          item_name: item.name,
          item_category: item.category || 'Solar Equipment',
          item_brand: item.brand || 'Autosys Sunergy',
          price: item.price,
          quantity: item.quantity
        }))
      });
    }
  },

  // Purchase
  purchase: (transactionId: string, items: GTMItem[], total: number, tax?: number, shipping?: number) => {
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', 'purchase', {
        transaction_id: transactionId,
        currency: 'INR',
        value: total,
        tax: tax || 0,
        shipping: shipping || 0,
        items: items.map(item => ({
          item_id: item.id || item.sku,
          item_name: item.name,
          item_category: item.category || 'Solar Equipment',
          item_brand: item.brand || 'Autosys Sunergy',
          price: item.price,
          quantity: item.quantity
        }))
      });
    }
  }
};

// Lead Generation Tracking
export const trackLeadGeneration = {
  // Generate lead (form submission)
  generateLead: (formData: Record<string, unknown>, leadValue?: number) => {
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', 'generate_lead', {
        currency: 'INR',
        value: leadValue || 1000, // Estimated lead value
        lead_type: formData.user_type || 'general',
        form_name: formData.form_type || 'contact',
        source: formData.source || 'website',
        custom_parameters: {
          location: formData.location,
          monthly_bill: formData.monthly_bill,
          business_type: formData.business_type
        }
      });
    }
  },

  // Quote request
  requestQuote: (productType: string, estimatedValue?: number) => {
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', 'request_quote', {
        currency: 'INR',
        value: estimatedValue || 50000,
        quote_type: productType,
        event_category: 'lead_generation'
      });
    }
  },

  // Calculator usage
  useCalculator: (calculationType: string, result: Record<string, unknown>) => {
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', 'calculator_usage', {
        calculator_type: calculationType,
        estimated_savings: result.savings,
        system_size: result.systemSize,
        event_category: 'tools'
      });
    }
  }
};

// Content Engagement Tracking
export const trackContentEngagement = {
  // File download
  downloadFile: (fileName: string, fileType: string) => {
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', 'file_download', {
        file_name: fileName,
        file_extension: fileType,
        event_category: 'content'
      });
    }
  },

  // Video interaction
  videoPlay: (videoTitle: string, duration?: number) => {
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', 'video_play', {
        video_title: videoTitle,
        video_duration: duration,
        event_category: 'content'
      });
    }
  },

  // Social share
  socialShare: (platform: string, url: string) => {
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', 'share', {
        method: platform,
        content_type: 'webpage',
        content_id: url,
        event_category: 'social'
      });
    }
  }
};

export default GTMAnalytics;
