import React, { useState } from 'react';
import Image from 'next/image';
import { getOptimizedImageUrl, getResponsiveImageProps } from '@/utils/supabaseMedia';

interface OptimizedImageProps {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  fill?: boolean;
  className?: string;
  priority?: boolean;
  sizes?: string;
  quality?: number;
  useSupabase?: boolean;
  fallbackSrc?: string;
}

const OptimizedImage: React.FC<OptimizedImageProps> = ({
  src,
  alt,
  width,
  height,
  fill = false,
  className = '',
  priority = false,
  sizes,
  quality = 85,
  useSupabase = true,
  fallbackSrc = '/sample_solar_image.jpg',
  ...props
}) => {
  const [hasError, setHasError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // Determine the actual source URL
  const getImageSrc = () => {
    if (hasError && fallbackSrc) return fallbackSrc;
    
    if (useSupabase && !src.startsWith('http') && !src.startsWith('/')) {
      return getOptimizedImageUrl(src, {
        width: width,
        height: height,
        quality,
        format: 'webp'
      });
    }
    
    return src;
  };

  // Get SEO-optimized props when using Supabase
  const getSEOProps = () => {
    if (useSupabase && !src.startsWith('http') && !src.startsWith('/')) {
      const seoProps = getResponsiveImageProps(src, alt, {
        width,
        height,
        priority
      });
      // Remove conflicting properties
      const { src: _src, loading, decoding, ...rest } = seoProps;
      return rest;
    }
    return {};
  };

  const handleError = () => {
    setHasError(true);
    setIsLoading(false);
  };

  const handleLoad = () => {
    setIsLoading(false);
  };

  const imageProps = {
    src: getImageSrc(),
    alt,
    className: `${className} ${isLoading ? 'opacity-0' : 'opacity-100'} transition-opacity duration-300`,
    priority,
    quality,
    onError: handleError,
    onLoad: handleLoad,
    ...getSEOProps(),
    ...props,
  };

  if (fill) {
    return (
      <div className="relative w-full h-full">
        <Image
          {...imageProps}
          fill
          sizes={sizes || '100vw'}
          style={{ objectFit: 'cover' }}
        />
        {/* Loading skeleton */}
        {isLoading && (
          <div className="absolute inset-0 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 animate-pulse" />
        )}
      </div>
    );
  }

  return (
    <div className="relative" style={{ width: width || 'auto', height: height || 'auto' }}>
      <Image
        {...imageProps}
        width={width || 500}
        height={height || 300}
        sizes={sizes || '(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw'}
      />
      {/* Loading skeleton */}
      {isLoading && (
        <div 
          className="absolute inset-0 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 animate-pulse rounded"
          style={{ width: width || 500, height: height || 300 }}
        />
      )}
    </div>
  );
};

export default OptimizedImage;
