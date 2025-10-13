'use client';

import React, { useState, useEffect, memo } from 'react';
import VideoReview from '@/components/ui/SimpleVideoReview';
import { getVideoReviews, VideoReviewData } from '@/utils/supabaseMedia';

interface VideoReviewSectionProps {
  isDay: boolean;
}

const VideoReviewSection = ({ isDay }: VideoReviewSectionProps) => {
  const [videoReviews, setVideoReviews] = useState<VideoReviewData[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadVideoReviews = async () => {
      try {
        const reviews = await getVideoReviews();
        setVideoReviews(reviews.slice(0, 6)); // Show first 6 reviews
      } catch (error) {
        console.error('Error loading video reviews:', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadVideoReviews();
  }, []);

  if (isLoading) {
    return (
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        <div className="col-span-full text-center text-blue-600 py-8">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p>Loading video reviews...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-row gap-3 sm:gap-6 overflow-x-auto pb-4" role="region" aria-label="Customer video reviews">
      {videoReviews.length === 0 ? (
        <div className="w-full text-center text-gray-600 py-8">
          <p>No video reviews available at the moment.</p>
        </div>
      ) : (
        videoReviews.map((review) => (
          <div key={review.id} className="flex-shrink-0 w-64 sm:w-80">
            <VideoReview
              videoUrl={review.video_url}
              posterUrl={review.poster_url}
              customerName={review.customer_name}
              location={review.location}
              rating={review.rating}
              systemCapacity={review.system_capacity}
              monthlySavings={review.monthly_savings}
              reviewText={review.review_text}
              isDay={isDay}
              className="transform hover:scale-105 transition-transform duration-300"
            />
          </div>
        ))
      )}
    </div>
  );
};

export default memo(VideoReviewSection);
