// Google Analytics utility functions for tracking events and page views

declare global {
  interface Window {
    gtag: (...args: unknown[]) => void;
    dataLayer: unknown[];
  }
}

// Types for Google Analytics events
export interface GAEvent {
  action: string;
  category: string;
  label?: string;
  value?: number;
  event_category?: string;
  event_label?: string;
}

// Initialize Google Analytics
export const GA_MEASUREMENT_ID = process.env.NEXT_PUBLIC_GA_ID;

// Track page views
export const trackPageView = (url: string) => {
  if (!GA_MEASUREMENT_ID || !window.gtag) return;
  
  window.gtag('config', GA_MEASUREMENT_ID, {
    page_path: url,
    page_title: document.title,
    page_location: window.location.href,
  });
};

// Track custom events
export const trackEvent = ({ action, category, label, value }: GAEvent) => {
  if (!GA_MEASUREMENT_ID || !window.gtag) return;
  
  window.gtag('event', action, {
    event_category: category,
    event_label: label,
    value: value,
  });
};

// Track conversions (leads, inquiries, etc.)
export const trackConversion = (eventName: string, data: Record<string, unknown> = {}) => {
  if (!GA_MEASUREMENT_ID || !window.gtag) return;
  
  window.gtag('event', eventName, {
    event_category: 'conversion',
    ...data,
  });
};

// Types for analytics
interface PurchaseItem {
  price: number;
  item_name?: string;
  item_category?: string;
  quantity?: number;
}

// E-commerce tracking for solar products
export const trackPurchase = (transactionId: string, items: PurchaseItem[]) => {
  if (!GA_MEASUREMENT_ID || !window.gtag) return;
  
  window.gtag('event', 'purchase', {
    transaction_id: transactionId,
    value: items.reduce((sum, item) => sum + item.price, 0),
    currency: 'INR',
    items: items,
  });
};

// Track form submissions
export const trackFormSubmission = (formName: string, formType: string = 'contact') => {
  trackEvent({
    action: 'form_submit',
    category: 'engagement',
    label: formName,
  });
  
  // Also track as conversion
  trackConversion('generate_lead', {
    form_name: formName,
    form_type: formType,
  });
};

// Track phone calls
export const trackPhoneCall = (phoneNumber: string) => {
  trackEvent({
    action: 'click_to_call',
    category: 'engagement',
    label: phoneNumber,
  });
  
  trackConversion('phone_call', {
    phone_number: phoneNumber,
  });
};

// Track email clicks
export const trackEmailClick = (emailAddress: string) => {
  trackEvent({
    action: 'click_to_email',
    category: 'engagement',
    label: emailAddress,
  });
};

// Track WhatsApp clicks
export const trackWhatsAppClick = (phoneNumber: string) => {
  trackEvent({
    action: 'click_whatsapp',
    category: 'engagement',
    label: phoneNumber,
  });
};

// Track solar calculator usage
export const trackCalculatorUsage = (calculationType: string, result: Record<string, unknown>) => {
  trackEvent({
    action: 'calculator_use',
    category: 'tools',
    label: calculationType,
  });
  
  trackConversion('calculator_completion', {
    calculator_type: calculationType,
    estimated_savings: result.savings,
    system_size: result.systemSize,
  });
};

// Track quote requests
export const trackQuoteRequest = (productType: string, projectSize?: string) => {
  trackEvent({
    action: 'quote_request',
    category: 'conversion',
    label: productType,
  });
  
  trackConversion('request_quote', {
    product_type: productType,
    project_size: projectSize,
  });
};

// Track video plays
export const trackVideoPlay = (videoTitle: string, videoId?: string) => {
  trackEvent({
    action: 'video_play',
    category: 'engagement',
    label: videoTitle,
  });
};

// Track file downloads (brochures, catalogs, etc.)
export const trackFileDownload = (fileName: string, fileType: string) => {
  trackEvent({
    action: 'file_download',
    category: 'engagement',
    label: fileName,
  });
  
  trackConversion('download_resource', {
    file_name: fileName,
    file_type: fileType,
  });
};

// Track social media clicks
export const trackSocialClick = (platform: string, action: string = 'click') => {
  trackEvent({
    action: `social_${action}`,
    category: 'social',
    label: platform,
  });
};

// Track scroll depth
export const trackScrollDepth = (percentage: number) => {
  if (percentage === 25 || percentage === 50 || percentage === 75 || percentage === 100) {
    trackEvent({
      action: 'scroll_depth',
      category: 'engagement',
      label: `${percentage}%`,
      value: percentage,
    });
  }
};

// Track search usage
export const trackSiteSearch = (searchTerm: string, resultsCount: number) => {
  trackEvent({
    action: 'site_search',
    category: 'engagement',
    label: searchTerm,
    value: resultsCount,
  });
};

// Track AI Avatar interactions
export const trackAIInteraction = (interactionType: string, message?: string) => {
  trackEvent({
    action: 'ai_interaction',
    category: 'ai_assistant',
    label: interactionType,
  });
  
  if (interactionType === 'question_answered') {
    trackConversion('ai_engagement', {
      interaction_type: interactionType,
      message_length: message?.length || 0,
    });
  }
};

// Track service page interactions
export const trackServiceInteraction = (serviceName: string, action: string) => {
  trackEvent({
    action: `service_${action}`,
    category: 'services',
    label: serviceName,
  });
};

// Track product interest
export const trackProductInterest = (productName: string, action: string = 'view') => {
  trackEvent({
    action: `product_${action}`,
    category: 'products',
    label: productName,
  });
};

// Enhanced consent mode for GDPR compliance
export const updateConsentMode = (
  analytics: boolean = true,
  advertising: boolean = true,
  functionality: boolean = true,
  personalization: boolean = true
) => {
  if (!window.gtag) return;
  
  window.gtag('consent', 'update', {
    analytics_storage: analytics ? 'granted' : 'denied',
    ad_storage: advertising ? 'granted' : 'denied',
    functionality_storage: functionality ? 'granted' : 'denied',
    personalization_storage: personalization ? 'granted' : 'denied',
  });
};

// Set user properties
export const setUserProperties = (properties: Record<string, unknown>) => {
  if (!window.gtag) return;
  
  window.gtag('config', GA_MEASUREMENT_ID!, {
    user_properties: properties,
  });
};

// Track timing events (page load, etc.)
export const trackTiming = (category: string, variable: string, value: number, label?: string) => {
  if (!window.gtag) return;
  
  window.gtag('event', 'timing_complete', {
    name: variable,
    value: value,
    event_category: category,
    event_label: label,
  });
};

export default {
  trackPageView,
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
  updateConsentMode,
  setUserProperties,
  trackTiming,
};
