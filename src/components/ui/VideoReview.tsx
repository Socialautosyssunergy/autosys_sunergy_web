'use client';

import React, { useState, useRef, useEffect } from 'react';
import { Play, Pause, Star, CheckCircle, Volume2, VolumeX } from 'lucide-react';

interface VideoReviewProps {
  videoUrl: string;
  posterUrl?: string;
  customerName: string;
  location: string;
  rating: number;
  systemCapacity: string;
  monthlySavings: string;
  reviewText: string;
  isDay?: boolean;
  className?: string;
}

const VideoReview: React.FC<VideoReviewProps> = ({
  videoUrl,
  posterUrl,
  customerName,
  location,
  rating,
  systemCapacity,
  monthlySavings,
  reviewText,
  isDay = true,
  className = ''
}) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (videoRef.current) {
      // Basic video setup - removed optimization for now
      videoRef.current.load();
      
      // Set up intersection observer for auto-play
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting && entry.intersectionRatio > 0.5) {
              handlePlay();
            } else {
              handlePause();
            }
          });
        },
        { threshold: 0.5 }
      );

      observer.observe(videoRef.current);

      return () => {
        if (videoRef.current) {
          observer.unobserve(videoRef.current);
        }
      };
    }
  }, []);

  const handlePlay = async () => {
    if (videoRef.current && !hasError) {
      try {
        await videoRef.current.play();
        setIsPlaying(true);
      } catch (error) {
        console.warn('Video autoplay failed:', error);
        setIsPlaying(false);
      }
    }
  };

  const handlePause = () => {
    if (videoRef.current) {
      videoRef.current.pause();
      setIsPlaying(false);
    }
  };

  const togglePlay = () => {
    if (isPlaying) {
      handlePause();
    } else {
      handlePlay();
    }
  };

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !videoRef.current.muted;
      setIsMuted(videoRef.current.muted);
    }
  };

  const handleVideoLoad = () => {
    setIsLoading(false);
    setHasError(false);
  };

  const handleVideoError = () => {
    setIsLoading(false);
    setHasError(true);
  };

  return (
    <div className={`relative rounded-xl overflow-hidden group ${className} ${
      isDay ? 'bg-gradient-to-br from-blue-50 to-blue-100 shadow-lg' : 'bg-slate-800 shadow-xl'
    }`}>
      {/* Video Container */}
      <div className="relative aspect-video">
        {!hasError ? (
          <video
            ref={videoRef}
            className="w-full h-full object-cover"
            muted={isMuted}
            loop
            playsInline
            preload="metadata"
            poster={posterUrl}
            onLoadedData={handleVideoLoad}
            onError={handleVideoError}
            onCanPlay={() => setIsLoading(false)}
          >
            <source src={videoUrl} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        ) : (
          // Fallback image when video fails
          <div 
            className="w-full h-full bg-cover bg-center flex items-center justify-center"
            style={{ 
              backgroundImage: posterUrl ? `url(${posterUrl})` : 'linear-gradient(135deg, #3b82f6, #1d4ed8)' 
            }}
          >
            <div className="text-white text-center">
              <Star className="w-12 h-12 mx-auto mb-2 fill-current" />
              <p className="text-sm font-medium">Video Review</p>
            </div>
          </div>
        )}

        {/* Loading Overlay */}
        {isLoading && !hasError && (
          <div className="absolute inset-0 bg-black/20 flex items-center justify-center">
            <div className="animate-spin rounded-full h-8 w-8 border-2 border-white border-t-transparent" />
          </div>
        )}

        {/* Video Controls Overlay */}
        {!hasError && (
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            {/* Play/Pause Button */}
            <div className="absolute inset-0 flex items-center justify-center">
              <button
                onClick={togglePlay}
                className="w-16 h-16 rounded-full bg-white/20 backdrop-blur-md border border-white/30 flex items-center justify-center text-white hover:bg-white/30 transition-all duration-300 transform hover:scale-110"
              >
                {isPlaying ? (
                  <Pause className="w-6 h-6 ml-0" />
                ) : (
                  <Play className="w-6 h-6 ml-1" />
                )}
              </button>
            </div>

            {/* Volume Control */}
            <div className="absolute top-4 right-4">
              <button
                onClick={toggleMute}
                className="w-10 h-10 rounded-full bg-black/30 backdrop-blur-md border border-white/20 flex items-center justify-center text-white hover:bg-black/50 transition-all duration-300"
              >
                {isMuted ? (
                  <VolumeX className="w-4 h-4" />
                ) : (
                  <Volume2 className="w-4 h-4" />
                )}
              </button>
            </div>

            {/* Quality Badge */}
            <div className="absolute top-4 left-4">
              <div className="px-3 py-1 rounded-full bg-black/30 backdrop-blur-md border border-white/20 text-white text-xs font-medium">
                Video Review
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Review Content */}
      <div className="p-6">
        {/* Customer Info and Rating */}
        <div className="flex items-start justify-between mb-4">
          <div>
            <h4 className={`font-semibold text-lg ${
              isDay ? 'text-gray-900' : 'text-white'
            }`}>
              {customerName}
            </h4>
            <p className={`text-sm ${
              isDay ? 'text-gray-600' : 'text-gray-400'
            }`}>
              {location}
            </p>
          </div>
          
          {/* Rating Stars */}
          <div className="flex items-center space-x-1">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={`w-4 h-4 ${
                  i < rating 
                    ? 'text-yellow-500 fill-current' 
                    : isDay ? 'text-gray-300' : 'text-gray-600'
                }`}
              />
            ))}
          </div>
        </div>

        {/* Review Text */}
        <p className={`text-sm mb-4 italic ${
          isDay ? 'text-gray-700' : 'text-gray-300'
        }`}>
          &ldquo;{reviewText}&rdquo;
        </p>

        {/* System Details */}
        <div className={`pt-4 border-t ${
          isDay ? 'border-gray-200' : 'border-gray-600'
        }`}>
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div className="flex items-center space-x-2">
              <CheckCircle className={`w-4 h-4 ${
                isDay ? 'text-blue-600' : 'text-blue-400'
              }`} />
              <span className={`${
                isDay ? 'text-gray-600' : 'text-gray-400'
              }`}>
                System: {systemCapacity}
              </span>
            </div>
            <div className="flex items-center space-x-2">
              <CheckCircle className={`w-4 h-4 ${
                isDay ? 'text-green-600' : 'text-green-400'
              }`} />
              <span className={`font-semibold ${
                isDay ? 'text-green-600' : 'text-green-400'
              }`}>
                Saves: {monthlySavings}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VideoReview;
