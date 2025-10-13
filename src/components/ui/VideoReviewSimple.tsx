'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { Star, CheckCircle } from 'lucide-react';

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
  const [imageError, setImageError] = useState(false);

  // Check if the URL is actually a video or an image
  const isVideoFile = videoUrl.includes('.mp4') || videoUrl.includes('.webm') || videoUrl.includes('.mov');
  
  // Use appropriate source URL
  const displayUrl = !imageError ? (posterUrl || videoUrl) : '/sample_solar_image.jpg';

  return (
    <div className={`bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl shadow-lg overflow-hidden transition-all duration-300 hover:shadow-xl hover:scale-105 ${className}`}>
      {/* Media Section */}
      <div className="relative aspect-video bg-gradient-to-br from-blue-50 to-blue-100">
        {isVideoFile && !imageError ? (
          <video
            className="w-full h-full object-cover"
            poster={posterUrl || '/sample_solar_image.jpg'}
            preload="metadata"
            onError={() => setImageError(true)}
          >
            <source src={videoUrl} type="video/mp4" />
            {/* Fallback to image if video fails */}
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img 
              src={posterUrl || '/sample_solar_image.jpg'} 
              alt={`Review by ${customerName}`}
              className="w-full h-full object-cover"
              onError={() => setImageError(true)}
            />
          </video>
        ) : (
          <Image
            src={displayUrl}
            alt={`Review by ${customerName}`}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 400px"
            className="object-cover"
            onError={() => setImageError(true)}
            priority={false}
          />
        )}
        
        {/* Overlay with rating */}
        <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm rounded-full px-3 py-1 flex items-center space-x-1">
          <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
          <span className="text-sm font-semibold text-gray-800">{rating}</span>
        </div>

        {/* Video play indicator */}
        {isVideoFile && (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="bg-white/20 backdrop-blur-sm rounded-full p-4">
              <div className="w-8 h-8 border-l-2 border-l-white border-l-solid ml-1" 
                   style={{ clipPath: 'polygon(0% 0%, 100% 50%, 0% 100%)' }} />
            </div>
          </div>
        )}
      </div>

      {/* Content Section */}
      <div className="p-6">
        {/* Customer Info */}
        <div className="flex items-center space-x-3 mb-4">
          <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center">
            <CheckCircle className="w-6 h-6 text-white" />
          </div>
          <div>
            <h3 className="font-bold text-gray-900">{customerName}</h3>
            <p className="text-sm text-gray-600">{location}</p>
          </div>
        </div>

        {/* System Details */}
        <div className="grid grid-cols-2 gap-4 mb-4">
          <div className="bg-blue-50 rounded-lg p-3">
            <p className="text-xs text-blue-600 font-medium uppercase tracking-wide">System Capacity</p>
            <p className="text-lg font-bold text-blue-900">{systemCapacity}</p>
          </div>
          <div className="bg-green-50 rounded-lg p-3">
            <p className="text-xs text-green-600 font-medium uppercase tracking-wide">Monthly Savings</p>
            <p className="text-lg font-bold text-green-900">{monthlySavings}</p>
          </div>
        </div>

        {/* Review Text */}
        <blockquote className="text-gray-700 italic leading-relaxed">
          &ldquo;{reviewText}&rdquo;
        </blockquote>

        {/* Rating Stars */}
        <div className="flex items-center space-x-1 mt-4">
          {[...Array(5)].map((_, i) => (
            <Star
              key={i}
              className={`w-4 h-4 ${
                i < rating 
                  ? 'fill-yellow-400 text-yellow-400' 
                  : 'text-gray-300'
              }`}
            />
          ))}
          <span className="ml-2 text-sm text-gray-600">({rating}/5)</span>
        </div>
      </div>
    </div>
  );
};

export default VideoReview;
