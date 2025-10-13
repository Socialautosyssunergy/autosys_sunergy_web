'use client';

import { useState, useCallback } from 'react';
import Image from 'next/image';
import { urlFor } from '@/lib/sanity';
import { SanityImageSource } from '@sanity/image-url/lib/types/types';

interface OptimizedImageProps {
  image: SanityImageSource;
  alt: string;
  aspectRatio?: '1:1' | '4:5' | '16:9' | '3:2';
  width?: number;
  height?: number;
  className?: string;
  priority?: boolean;
  quality?: number;
  sizes?: string;
  fill?: boolean;
  lazy?: boolean;
}

const OptimizedImage: React.FC<OptimizedImageProps> = ({
  image,
  alt,
  aspectRatio = '4:5',
  width = 600,
  height,
  className = '',
  priority = false,
  quality = 85,
  sizes = '(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw',
  fill = false,
  lazy = true
}) => {
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  // Calculate height based on aspect ratio
  const getHeight = useCallback(() => {
    if (height) return height;
    
    switch (aspectRatio) {
      case '1:1':
        return width;
      case '4:5':
        return Math.round(width * 1.25); // 5/4 = 1.25
      case '16:9':
        return Math.round(width * 0.5625); // 9/16 = 0.5625
      case '3:2':
        return Math.round(width * 0.667); // 2/3 = 0.667
      default:
        return width;
    }
  }, [aspectRatio, width, height]);

  const calculatedHeight = getHeight();

  // Build optimized Sanity image URL
  const getOptimizedImageUrl = useCallback((w: number, h: number) => {
    if (!image) return '';

    try {
      let imageBuilder = urlFor(image)
        .width(w)
        .height(h)
        .quality(quality)
        .format('webp')
        .fit('crop')
        .crop('entropy'); // Smart cropping

      // Apply hotspot if available (for object-type images)
      if (typeof image === 'object' && image && 'hotspot' in image && image.hotspot) {
        imageBuilder = imageBuilder.focalPoint(image.hotspot.x, image.hotspot.y);
      }

      return imageBuilder.url();
    } catch (error) {
      console.error('Error generating image URL:', error);
      return '';
    }
  }, [image, quality]);

  // Generate responsive image URLs
  const generateSrcSet = useCallback(() => {
    const breakpoints = [320, 640, 768, 1024, 1280, 1600];
    return breakpoints
      .map(bp => {
        const bpHeight = Math.round(bp * (calculatedHeight / width));
        return `${getOptimizedImageUrl(bp, bpHeight)} ${bp}w`;
      })
      .join(', ');
  }, [width, calculatedHeight, getOptimizedImageUrl]);

  const handleLoad = useCallback(() => {
    setIsLoading(false);
  }, []);

  const handleError = useCallback(() => {
    setIsLoading(false);
    setHasError(true);
  }, []);

  if (hasError) {
    return (
      <div 
        className={`flex items-center justify-center bg-gray-200 dark:bg-gray-700 ${className}`}
        style={{ 
          width: fill ? '100%' : width, 
          height: fill ? '100%' : calculatedHeight,
          aspectRatio: aspectRatio.replace(':', '/')
        }}
      >
        <div className="text-center p-4">
          <div className="text-4xl mb-2">📷</div>
          <p className="text-sm text-gray-500">Image unavailable</p>
        </div>
      </div>
    );
  }

  const imageUrl = getOptimizedImageUrl(width, calculatedHeight);
  
  if (!imageUrl) {
    return (
      <div 
        className={`animate-pulse bg-gray-300 dark:bg-gray-600 ${className}`}
        style={{ 
          width: fill ? '100%' : width, 
          height: fill ? '100%' : calculatedHeight,
          aspectRatio: aspectRatio.replace(':', '/')
        }}
      />
    );
  }

  return (
    <div 
      className={`relative overflow-hidden ${className}`}
      style={{
        width: fill ? '100%' : width,
        height: fill ? '100%' : calculatedHeight,
        aspectRatio: aspectRatio.replace(':', '/')
      }}
    >
      {/* Loading skeleton */}
      {isLoading && (
        <div 
          className="absolute inset-0 animate-pulse bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 dark:from-gray-600 dark:via-gray-500 dark:to-gray-600"
          style={{
            backgroundSize: '200% 100%',
            animation: 'shimmer 2s infinite linear'
          }}
        />
      )}
      
      <Image
        src={imageUrl}
        alt={alt || 'AutoSys Sunergy Blog Image'}
        width={fill ? undefined : width}
        height={fill ? undefined : calculatedHeight}
        fill={fill}
        sizes={sizes}
        priority={priority}
        quality={quality}
        loading={priority ? undefined : (lazy ? 'lazy' : 'eager')}
        onLoad={handleLoad}
        onError={handleError}
        className={`transition-opacity duration-300 ${
          isLoading ? 'opacity-0' : 'opacity-100'
        } ${fill ? 'object-cover' : ''}`}
        style={fill ? { objectFit: 'cover' } : {}}
      />

      {/* Aspect ratio enforcer for mobile */}
      <style jsx>{`
        @media (max-width: 768px) {
          .mobile-aspect-ratio {
            aspect-ratio: ${aspectRatio.replace(':', '/')};
          }
        }
        
        @keyframes shimmer {
          0% { background-position: -200% 0; }
          100% { background-position: 200% 0; }
        }
      `}</style>
    </div>
  );
};

export default OptimizedImage;

// Preset configurations for different use cases
export const ImagePresets = {
  // Blog list cards
  blogCard: {
    aspectRatio: '4:5' as const,
    width: 400,
    quality: 85,
    sizes: '(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw'
  },
  
  // Featured blog hero
  blogHero: {
    aspectRatio: '16:9' as const,
    width: 1200,
    quality: 90,
    sizes: '100vw',
    priority: true
  },
  
  // Mobile blog cards (horizontal)
  mobileBlogCard: {
    aspectRatio: '1:1' as const,
    width: 300,
    quality: 80,
    sizes: '(max-width: 768px) 45vw, 300px'
  },
  
  // Blog post cover
  blogCover: {
    aspectRatio: '4:5' as const,
    width: 800,
    quality: 90,
    sizes: '(max-width: 768px) 100vw, 800px',
    priority: true
  },
  
  // Author avatar
  avatar: {
    aspectRatio: '1:1' as const,
    width: 100,
    quality: 85,
    sizes: '100px'
  }
};

// Helper function to get responsive image props
export const getResponsiveImageProps = (
  image: SanityImageSource,
  preset: keyof typeof ImagePresets,
  overrides?: Partial<OptimizedImageProps>
) => {
  return {
    image,
    ...ImagePresets[preset],
    ...overrides
  };
};
