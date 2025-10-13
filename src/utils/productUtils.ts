import { urlFor } from '../../sanity/lib/client';

// Image optimization utilities
export const optimizeImageUrl = (
  imageUrl: string,
  options: {
    width?: number;
    height?: number;
    quality?: number;
    format?: 'webp' | 'jpg' | 'png';
    fit?: 'crop' | 'fill' | 'max' | 'min' | 'scale';
  } = {}
): string => {
  // Check if it's a Sanity image
  if (imageUrl.includes('cdn.sanity.io')) {
    try {
      const imageRef = imageUrl.split('/').pop()?.replace(/\.(jpg|jpeg|png|webp)$/i, '');
      if (imageRef) {
        let builder = urlFor({ _type: 'image', asset: { _ref: imageRef } });
        
        if (options.width) builder = builder.width(options.width);
        if (options.height) builder = builder.height(options.height);
        if (options.quality) builder = builder.quality(options.quality);
        if (options.format) builder = builder.format(options.format);
        if (options.fit) builder = builder.fit(options.fit as 'clip' | 'crop' | 'fill' | 'fillmax' | 'max' | 'scale' | 'min');
        
        return builder.url();
      }
    } catch (error) {
      console.warn('Failed to optimize Sanity image:', error);
    }
  }
  
  // For non-Sanity images, return as-is or apply basic optimizations
  return imageUrl;
};

// Responsive image srcSet generator
export const generateResponsiveImageSrcSet = (
  imageUrl: string,
  breakpoints: number[] = [320, 640, 768, 1024, 1280, 1920]
): string => {
  return breakpoints
    .map(width => {
      const optimizedUrl = optimizeImageUrl(imageUrl, { 
        width, 
        quality: 85, 
        format: 'webp' 
      });
      return `${optimizedUrl} ${width}w`;
    })
    .join(', ');
};

// Get file type icon based on extension
export const getFileTypeIcon = (fileUrl: string): string => {
  const extension = fileUrl.split('.').pop()?.toLowerCase();
  
  switch (extension) {
    case 'pdf':
      return '📄';
    case 'doc':
    case 'docx':
      return '📝';
    case 'xls':
    case 'xlsx':
      return '📊';
    case 'ppt':
    case 'pptx':
      return '📋';
    case 'zip':
    case 'rar':
      return '📦';
    case 'jpg':
    case 'jpeg':
    case 'png':
    case 'gif':
    case 'webp':
      return '🖼️';
    case 'mp4':
    case 'avi':
    case 'mov':
      return '🎥';
    default:
      return '📎';
  }
};

// Format file size
export const formatFileSize = (sizeInKB: number): string => {
  if (sizeInKB < 1024) {
    return `${sizeInKB} KB`;
  } else if (sizeInKB < 1024 * 1024) {
    return `${(sizeInKB / 1024).toFixed(1)} MB`;
  } else {
    return `${(sizeInKB / (1024 * 1024)).toFixed(1)} GB`;
  }
};

// Extract YouTube video ID from URL
export const extractYouTubeVideoId = (url: string): string | null => {
  const patterns = [
    /(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/,
    /^[a-zA-Z0-9_-]{11}$/
  ];
  
  for (const pattern of patterns) {
    const match = url.match(pattern);
    if (match) {
      return match[1] || match[0];
    }
  }
  
  return null;
};

// Generate YouTube thumbnail URL
export const getYouTubeThumbnail = (
  videoUrl: string,
  quality: 'default' | 'medium' | 'high' | 'standard' | 'maxres' = 'high'
): string => {
  const videoId = extractYouTubeVideoId(videoUrl);
  if (!videoId) {
    return '/api/placeholder/480/360';
  }
  
  const qualityMap = {
    default: 'default',
    medium: 'mqdefault',
    high: 'hqdefault',
    standard: 'sddefault',
    maxres: 'maxresdefault'
  };
  
  return `https://img.youtube.com/vi/${videoId}/${qualityMap[quality]}.jpg`;
};

// Generate YouTube embed URL
export const getYouTubeEmbedUrl = (
  videoUrl: string,
  options: {
    autoplay?: boolean;
    mute?: boolean;
    controls?: boolean;
    loop?: boolean;
    startTime?: number;
  } = {}
): string => {
  const videoId = extractYouTubeVideoId(videoUrl);
  if (!videoId) {
    return '';
  }
  
  const params = new URLSearchParams();
  
  if (options.autoplay) params.set('autoplay', '1');
  if (options.mute) params.set('mute', '1');
  if (options.controls === false) params.set('controls', '0');
  if (options.loop) params.set('loop', '1');
  if (options.startTime) params.set('start', options.startTime.toString());
  
  const queryString = params.toString();
  return `https://www.youtube.com/embed/${videoId}${queryString ? `?${queryString}` : ''}`;
};

// Validate file types for upload
export const validateFileType = (
  fileName: string,
  allowedTypes: string[]
): { isValid: boolean; error?: string } => {
  const extension = fileName.split('.').pop()?.toLowerCase();
  
  if (!extension) {
    return { isValid: false, error: 'File has no extension' };
  }
  
  if (!allowedTypes.includes(extension)) {
    return { 
      isValid: false, 
      error: `File type .${extension} not allowed. Allowed types: ${allowedTypes.join(', ')}` 
    };
  }
  
  return { isValid: true };
};

// Validate file size
export const validateFileSize = (
  fileSizeKB: number,
  maxSizeKB: number
): { isValid: boolean; error?: string } => {
  if (fileSizeKB > maxSizeKB) {
    return {
      isValid: false,
      error: `File size ${formatFileSize(fileSizeKB)} exceeds maximum allowed size of ${formatFileSize(maxSizeKB)}`
    };
  }
  
  return { isValid: true };
};

// Generate download filename with timestamp
export const generateDownloadFilename = (
  originalFilename: string,
  productTitle?: string
): string => {
  const timestamp = new Date().toISOString().split('T')[0];
  const extension = originalFilename.split('.').pop();
  const baseName = originalFilename.replace(/\.[^/.]+$/, '');
  
  if (productTitle) {
    const cleanProductTitle = productTitle
      .toLowerCase()
      .replace(/[^a-z0-9]/g, '-')
      .replace(/-+/g, '-')
      .replace(/^-|-$/g, '');
    
    return `${cleanProductTitle}-${baseName}-${timestamp}.${extension}`;
  }
  
  return `${baseName}-${timestamp}.${extension}`;
};

// Product slug generator
export const generateProductSlug = (title: string): string => {
  return title
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, '') // Remove special characters
    .replace(/\s+/g, '-') // Replace spaces with hyphens
    .replace(/-+/g, '-') // Replace multiple hyphens with single
    .replace(/^-|-$/g, ''); // Remove leading/trailing hyphens
};

// Validate product data
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const validateProductData = (data: any): { isValid: boolean; errors: string[] } => {
  const errors: string[] = [];
  
  // Required fields
  if (!data.title?.trim()) errors.push('Title is required');
  if (!data.shortDescription?.trim()) errors.push('Short description is required');
  if (!data.category) errors.push('Category is required');
  if (!data.brand) errors.push('Brand is required');
  if (!data.moq?.trim()) errors.push('MOQ is required');
  if (!data.warranty?.trim()) errors.push('Warranty is required');
  if (!data.leadTime?.trim()) errors.push('Lead time is required');
  
  // Validate rating if provided
  if (data.rating !== undefined) {
    const rating = Number(data.rating);
    if (isNaN(rating) || rating < 0 || rating > 5) {
      errors.push('Rating must be a number between 0 and 5');
    }
  }
  
  // Validate efficiency if provided
  if (data.efficiency && !/^\d+(\.\d+)?%?$/.test(data.efficiency.trim())) {
    errors.push('Efficiency must be a valid percentage (e.g., "22.5%" or "22.5")');
  }
  
  // Validate capacity if provided
  if (data.capacity && !/^\d+(\.\d+)?\s*(W|kW|Wh|kWh|Ah|V|A)?$/i.test(data.capacity.trim())) {
    errors.push('Capacity must include a valid unit (e.g., "550W", "5kWh")');
  }
  
  return {
    isValid: errors.length === 0,
    errors
  };
};

// Generate product SEO data
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const generateProductSEO = (product: any) => {
  const title = product.seoTitle || `${product.title} - ${product.brand?.name || ''} | Autosys Sunergy`;
  const description = product.seoDescription || 
    `${product.shortDescription || product.description?.substring(0, 150) || ''} Available for wholesale. Contact for pricing and technical specifications.`;
  
  return {
    title: title.substring(0, 60),
    description: description.substring(0, 160),
    keywords: [
      product.brand?.name,
      product.category?.name,
      'solar',
      'renewable energy',
      'wholesale',
      'B2B',
      ...(product.features?.slice(0, 5) || [])
    ].filter(Boolean).join(', ')
  };
};

// Cache management utilities
export const generateCacheKey = (prefix: string, ...params: (string | number)[]): string => {
  return `${prefix}:${params.join(':')}`;
};

export const setCacheItem = (key: string, data: unknown, ttlMinutes: number = 60): void => {
  try {
    const cacheData = {
      data,
      timestamp: Date.now(),
      ttl: ttlMinutes * 60 * 1000
    };
    localStorage.setItem(key, JSON.stringify(cacheData));
  } catch (error) {
    console.warn('Failed to set cache item:', error);
  }
};

export const getCacheItem = (key: string): unknown | null => {
  try {
    const cached = localStorage.getItem(key);
    if (!cached) return null;
    
    const cacheData = JSON.parse(cached);
    const now = Date.now();
    
    if (now - cacheData.timestamp > cacheData.ttl) {
      localStorage.removeItem(key);
      return null;
    }
    
    return cacheData.data;
  } catch (error) {
    console.warn('Failed to get cache item:', error);
    return null;
  }
};

export const clearCacheByPrefix = (prefix: string): void => {
  try {
    const keys = Object.keys(localStorage).filter(key => key.startsWith(prefix));
    keys.forEach(key => localStorage.removeItem(key));
  } catch (error) {
    console.warn('Failed to clear cache:', error);
  }
};
