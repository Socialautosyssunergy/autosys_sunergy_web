'use client';

import React, { useState, useRef } from 'react';
import Image from 'next/image';
import { Star } from 'lucide-react';

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
  className = '',
}) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [showPlayButton, setShowPlayButton] = useState(true);
  const videoRef = useRef<HTMLVideoElement>(null);

  const togglePlay = async () => {
    if (videoRef.current) {
      try {
        if (isPlaying) {
          videoRef.current.pause();
          setIsPlaying(false);
          setShowPlayButton(true);
        } else {
          await videoRef.current.play();
          setIsPlaying(true);
          setShowPlayButton(false);
        }
      } catch (error) {
        console.error('Error playing video:', error);
      }
    }
  };

  const handleVideoClick = () => {
    if (videoUrl && (videoUrl.includes('.mp4') || videoUrl.includes('.webm'))) {
      togglePlay();
    }
  };

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, index) => (
      <Star
        key={index}
        className={`w-3 h-3 sm:w-4 sm:h-4 ${
          index < rating
            ? 'fill-yellow-400 text-yellow-400'
            : 'text-gray-300'
        }`}
      />
    ));
  };

  return (
    <div className={`bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 ${className}`}>
      {/* Video/Image Section */}
      <div className="relative aspect-video cursor-pointer" onClick={handleVideoClick}>
        {videoUrl && (videoUrl.includes('.mp4') || videoUrl.includes('.webm')) ? (
          <video
            ref={videoRef}
            className="w-full h-full object-cover"
            poster={posterUrl || '/sample_solar_image.jpg'}
            playsInline
            muted
            onPlay={() => {
              setIsPlaying(true);
              setShowPlayButton(false);
            }}
            onPause={() => {
              setIsPlaying(false);
              setShowPlayButton(true);
            }}
            onEnded={() => {
              setIsPlaying(false);
              setShowPlayButton(true);
            }}
          >
            <source src={videoUrl} type="video/mp4" />
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={posterUrl || '/sample_solar_image.jpg'}
              alt={`${customerName} review`}
              className="w-full h-full object-cover"
            />
          </video>
        ) : (
          <Image
            src={posterUrl || videoUrl || '/sample_solar_image.jpg'}
            alt={`${customerName} review`}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 400px"
            className="object-cover"
            priority={false}
          />
        )}
        
        {/* Play Button Overlay */}
        {showPlayButton && videoUrl && (videoUrl.includes('.mp4') || videoUrl.includes('.webm')) && (
          <div className="absolute inset-0 flex items-center justify-center">
            <button
              onClick={(e) => {
                e.stopPropagation();
                togglePlay();
              }}
              className="bg-blue-600 hover:bg-blue-700 text-white rounded-full p-3 sm:p-4 shadow-lg transition-all duration-300 hover:scale-110"
            >
              <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M8 5v14l11-7z"/>
              </svg>
            </button>
          </div>
        )}
      </div>

      {/* Content Section */}
      <div className="p-3 sm:p-6">
        {/* Customer Info */}
        <div className="flex items-center justify-between mb-2 sm:mb-3">
          <div>
            <h3 className="font-semibold text-gray-900 text-sm sm:text-base">{customerName}</h3>
            <p className="text-xs sm:text-sm text-gray-600">{location}</p>
          </div>
          <div className="flex items-center space-x-1">
            {renderStars(rating)}
          </div>
        </div>

        {/* System Details */}
        <div className="grid grid-cols-2 gap-2 sm:gap-4 mb-2 sm:mb-4">
          <div className="text-center p-2 sm:p-3 bg-blue-50 rounded-lg">
            <p className="text-xs sm:text-sm text-gray-600">System Size</p>
            <p className="font-semibold text-blue-600 text-xs sm:text-base">{systemCapacity}</p>
          </div>
          <div className="text-center p-2 sm:p-3 bg-green-50 rounded-lg">
            <p className="text-xs sm:text-sm text-gray-600">Monthly Savings</p>
            <p className="font-semibold text-green-600 text-xs sm:text-base">{monthlySavings}</p>
          </div>
        </div>

        {/* Review Text */}
        <p className="text-gray-700 text-xs sm:text-sm line-clamp-3">{reviewText}</p>
      </div>
    </div>
  );
};

export default VideoReview;
