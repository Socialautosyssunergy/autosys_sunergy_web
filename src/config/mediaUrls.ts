/**
 * Centralized media URL configuration for Autosys Sunergy website
 * All Supabase storage URLs are managed here for easy maintenance
 */

export const SUPABASE_MEDIA_URLS = {
  // Homepage Videos
  HERO_VIDEO: "https://nvwqkpwakpujlmgowmdb.supabase.co/storage/v1/object/sign/Autosys%20Sunergy/Autosys%20web%20videos/Home_page/Hero_section_video.mp4?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV8yYzg4ODU4YS0wMzk4LTQ2NWQtYTY1Yy03ZWE2YTgzMWUwODciLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJBdXRvc3lzIFN1bmVyZ3kvQXV0b3N5cyB3ZWIgdmlkZW9zL0hvbWVfcGFnZS9IZXJvX3NlY3Rpb25fdmlkZW8ubXA0IiwiaWF0IjoxNzU1MzI3NDEwLCJleHAiOjE5MTMwMDc0MTB9.4rXZLq6TWlKeARvSt5RZH-EulOYioIUDbCp8q3flwMk",
  
  FOOTER_VIDEO: "https://nvwqkpwakpujlmgowmdb.supabase.co/storage/v1/object/sign/Autosys%20Sunergy/Autosys%20web%20videos/Home_page/Footer_background_video.mp4?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV8yYzg4ODU4YS0wMzk4LTQ2NWQtYTY1Yy03ZWE2YTgzMWUwODciLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJBdXRvc3lzIFN1bmVyZ3kvQXV0b3N5cyB3ZWIgdmlkZW9zL0hvbWVfcGFnZS9Gb290ZXJfYmFja2dyb3VuZF92aWRlby5tcDQiLCJpYXQiOjE3NTUzMjc0NDQsImV4cCI6MTkxMzAwNzQ0NH0.TBMi4lJT_rU5A-XKOm8EDEDav-4KYaDb3sRdfIDjN1c",

  // Video Reviews (sample structure - add your actual video review URLs here)
  VIDEO_REVIEWS: {
    BHOPAL_CUSTOMER: "video-reviews/customer-review-bhopal-1.mp4",
    INDORE_CUSTOMER: "video-reviews/customer-review-indore-2.mp4",
    JABALPUR_CUSTOMER: "video-reviews/customer-review-jabalpur-3.mp4",
    GWALIOR_CUSTOMER: "video-reviews/customer-review-gwalior-4.mp4",
    UJJAIN_CUSTOMER: "video-reviews/customer-review-ujjain-5.mp4",
    RATLAM_CUSTOMER: "video-reviews/customer-review-ratlam-6.mp4"
  },

  // Video Review Thumbnails
  VIDEO_THUMBNAILS: {
    BHOPAL_THUMB: "video-reviews/thumbnails/customer-review-bhopal-1-thumb.jpg",
    INDORE_THUMB: "video-reviews/thumbnails/customer-review-indore-2-thumb.jpg",
    JABALPUR_THUMB: "video-reviews/thumbnails/customer-review-jabalpur-3-thumb.jpg",
    GWALIOR_THUMB: "video-reviews/thumbnails/customer-review-gwalior-4-thumb.jpg",
    UJJAIN_THUMB: "video-reviews/thumbnails/customer-review-ujjain-5-thumb.jpg",
    RATLAM_THUMB: "video-reviews/thumbnails/customer-review-ratlam-6-thumb.jpg"
  },

  // Product Images
  PRODUCTS: {
    SOLAR_PANELS: "products/solar-panels/",
    INVERTERS: "products/inverters/",
    BATTERIES: "products/batteries/",
    STRUCTURE: "products/structure/"
  },

  // Service Images
  SERVICES: {
    RESIDENTIAL: "services/residential/",
    COMMERCIAL: "services/commercial/",
    INDUSTRIAL: "services/industrial/",
    MAINTENANCE: "services/maintenance/"
  },

  // Company Images
  COMPANY: {
    TEAM: "company/team/",
    OFFICE: "company/office/",
    PROJECTS: "company/projects/",
    CERTIFICATIONS: "company/certifications/"
  }
};

// Base Supabase storage URL
export const SUPABASE_STORAGE_BASE = "https://nvwqkpwakpujlmgowmdb.supabase.co/storage/v1/object/public";

// Bucket name
export const SUPABASE_BUCKET = "Autosys Sunergy";

/**
 * Generate optimized Supabase URL with transformation parameters
 */
export const getOptimizedSupabaseUrl = (
  path: string,
  options: {
    width?: number;
    height?: number;
    quality?: number;
    format?: 'webp' | 'jpeg' | 'png';
  } = {}
): string => {
  const { width, height, quality = 80, format = 'webp' } = options;
  
  if (path.startsWith('http')) {
    return path; // Already a full URL
  }
  
  let url = `${SUPABASE_STORAGE_BASE}/${SUPABASE_BUCKET}/${path}`;
  
  // Add transformation parameters if supported
  const params = new URLSearchParams();
  if (width) params.set('width', width.toString());
  if (height) params.set('height', height.toString());
  if (quality !== 80) params.set('quality', quality.toString());
  if (format !== 'webp') params.set('format', format);
  
  if (params.toString()) {
    url += `?${params.toString()}`;
  }
  
  return url;
};

/**
 * Get responsive image URLs for different screen sizes
 */
export const getResponsiveSupabaseUrls = (path: string) => {
  return {
    mobile: getOptimizedSupabaseUrl(path, { width: 480, quality: 75 }),
    tablet: getOptimizedSupabaseUrl(path, { width: 768, quality: 80 }),
    desktop: getOptimizedSupabaseUrl(path, { width: 1200, quality: 85 }),
    original: getOptimizedSupabaseUrl(path, { quality: 90 })
  };
};

/**
 * Create srcSet string for responsive images
 */
export const createSupabaseSourceSet = (path: string): string => {
  const urls = getResponsiveSupabaseUrls(path);
  return [
    `${urls.mobile} 480w`,
    `${urls.tablet} 768w`,
    `${urls.desktop} 1200w`,
    `${urls.original} 1920w`
  ].join(', ');
};
