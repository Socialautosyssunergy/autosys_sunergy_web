'use client';

import React, { useState, useRef, useEffect } from 'react';

interface OptimizedVideoProps {
  src: string;
  fallbackSrc?: string;
  poster?: string;
  className?: string;
  autoPlay?: boolean;
  muted?: boolean;
  loop?: boolean;
  controls?: boolean;
  playsInline?: boolean;
  preload?: 'auto' | 'metadata' | 'none';
  onError?: () => void;
  onLoad?: () => void;
  style?: React.CSSProperties;
  id?: string;
}

export default function OptimizedVideo({
  src,
  fallbackSrc,
  poster,
  className,
  autoPlay = false,
  muted = true,
  loop = true,
  controls = false,
  playsInline = true,
  preload = 'metadata',
  onError,
  onLoad,
  style,
  id,
  ...props
}: OptimizedVideoProps) {
  const [currentSrc, setCurrentSrc] = useState(src);
  const [hasError, setHasError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const videoRef = useRef<HTMLVideoElement>(null);

  const handleError = () => {
    console.error('Video failed to load:', currentSrc);
    setHasError(true);
    
    if (fallbackSrc && currentSrc !== fallbackSrc) {
      console.log('Trying fallback video:', fallbackSrc);
      setCurrentSrc(fallbackSrc);
      setHasError(false);
    } else {
      onError?.();
    }
  };

  const handleLoad = () => {
    setIsLoading(false);
    setHasError(false);
    onLoad?.();
  };

  const handleCanPlay = () => {
    setIsLoading(false);
    if (autoPlay && videoRef.current) {
      videoRef.current.play().catch(console.error);
    }
  };

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    // Add event listeners
    video.addEventListener('loadeddata', handleLoad);
    video.addEventListener('canplay', handleCanPlay);
    video.addEventListener('error', handleError);

    return () => {
      video.removeEventListener('loadeddata', handleLoad);
      video.removeEventListener('canplay', handleCanPlay);
      video.removeEventListener('error', handleError);
    };
  }, [currentSrc, handleLoad, handleCanPlay, handleError]);

  // Reset error state when src changes
  useEffect(() => {
    setCurrentSrc(src);
    setHasError(false);
    setIsLoading(true);
  }, [src]);

  if (hasError && !fallbackSrc) {
    return (
      <div className={`${className} flex items-center justify-center bg-gray-200`} style={style}>
        <div className="text-center p-4">
          <p className="text-gray-600">Video unavailable</p>
          {poster && (
            <img 
              src={poster} 
              alt="Video poster" 
              className="w-full h-full object-cover mt-2"
              style={{ maxWidth: '100%', maxHeight: '100%' }}
            />
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="relative w-full h-full">
      {isLoading && (
        <div className={`absolute inset-0 flex items-center justify-center bg-gray-100 ${className}`}>
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
        </div>
      )}
      
      <video
        ref={videoRef}
        className={`${className} ${isLoading ? 'opacity-0' : 'opacity-100'} transition-opacity duration-300`}
        style={style}
        autoPlay={autoPlay}
        muted={muted}
        loop={loop}
        controls={controls}
        playsInline={playsInline}
        preload={preload}
        poster={poster}
        id={id}
        crossOrigin="anonymous"
        {...props}
      >
        <source src={currentSrc} type="video/mp4" />
        {fallbackSrc && currentSrc !== fallbackSrc && (
          <source src={fallbackSrc} type="video/mp4" />
        )}
        Your browser does not support the video tag.
      </video>
    </div>
  );
}
