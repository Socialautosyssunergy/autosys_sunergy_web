import { supabase } from '@/lib/supabase';

export interface MediaAsset {
  id: string;
  name: string;
  url: string;
  type: 'image' | 'video';
  category: 'product' | 'service' | 'review' | 'hero' | 'about' | 'project' | 'team';
  size?: number;
  metadata?: {
    width?: number;
    height?: number;
    duration?: number;
    alt_text?: string;
    caption?: string;
  };
}

export interface VideoReviewData {
  id: string;
  customer_name: string;
  location: string;
  rating: number;
  system_capacity: string;
  monthly_savings: string;
  review_text: string;
  video_url: string;
  poster_url?: string;
  is_featured: boolean;
  created_at: string;
}

export class SupabaseMediaManager {
  private static instance: SupabaseMediaManager;
  private baseUrl: string;

  constructor() {
    this.baseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
  }

  static getInstance(): SupabaseMediaManager {
    if (!SupabaseMediaManager.instance) {
      SupabaseMediaManager.instance = new SupabaseMediaManager();
    }
    return SupabaseMediaManager.instance;
  }

  /**
   * Get optimized URL for Supabase storage assets
   */
  getOptimizedUrl(path: string, options?: {
    width?: number;
    height?: number;
    quality?: number;
    format?: 'webp' | 'jpeg' | 'png';
  }): string {
    if (!path) return '';
    
    // If it's already a full URL (signed URL or external), return as is
    if (path.startsWith('http')) return path;
    
    // For local public assets, return as-is and let Next.js handle optimization
    if (path.startsWith('/')) return path;
    
    // For relative paths, prepend with slash for local assets
    return `/${path}`;
  }

  /**
   * Get responsive image srcSet for different screen sizes
   */
  getResponsiveSrcSet(path: string): string {
    const baseUrl = this.getOptimizedUrl(path);
    return [
      `${this.getOptimizedUrl(path, { width: 640, quality: 75 })} 640w`,
      `${this.getOptimizedUrl(path, { width: 768, quality: 80 })} 768w`,
      `${this.getOptimizedUrl(path, { width: 1024, quality: 85 })} 1024w`,
      `${this.getOptimizedUrl(path, { width: 1280, quality: 90 })} 1280w`,
      `${this.getOptimizedUrl(path, { width: 1920, quality: 95 })} 1920w`,
    ].join(', ');
  }

  /**
   * Fetch video reviews from Supabase
   */
  async getVideoReviews(limit = 6): Promise<VideoReviewData[]> {
    try {
      if (!supabase) {
        console.warn('Supabase not configured, using fallback data');
        return this.getFallbackVideoReviews();
      }

      const { data, error } = await supabase
        .from('video_reviews')
        .select('*')
        .eq('is_featured', true)
        .order('created_at', { ascending: false })
        .limit(limit);

      if (error) {
        console.error('Error fetching video reviews:', error);
        return this.getFallbackVideoReviews();
      }

      // Transform URLs to use Supabase storage
      return data?.map(review => ({
        ...review,
        video_url: this.getOptimizedUrl(review.video_url),
        poster_url: review.poster_url ? this.getOptimizedUrl(review.poster_url) : undefined,
      })) || this.getFallbackVideoReviews();
    } catch (error) {
      console.error('Error in getVideoReviews:', error);
      return this.getFallbackVideoReviews();
    }
  }

  /**
   * Fallback data when Supabase is not available
   */
  private getFallbackVideoReviews(): VideoReviewData[] {
    return [
      {
        id: '1',
        customer_name: 'Rajesh Sharma',
        location: 'Indore, MP',
        rating: 5,
        system_capacity: '5kW Residential',
        monthly_savings: '₹2,500',
        review_text: 'Excellent service and professional installation. My electricity bills have reduced by 80%. Highly recommend Autosys Sunergy!',
        video_url: '/video_reviews/rajesh_sharma_review.mp4',
        poster_url: '/video_reviews/rajesh_sharma_poster.jpg',
        is_featured: true,
        created_at: '2024-01-15T10:00:00Z'
      },
      {
        id: '2',
        customer_name: 'Dr. Priya Mehta',
        location: 'Hospital Administrator, Bhopal',
        rating: 5,
        system_capacity: '50kW Commercial',
        monthly_savings: '₹45,000',
        review_text: 'Outstanding support throughout the project. The ROI calculations were accurate and the system performance exceeds expectations.',
        video_url: '/video_reviews/priya_mehta_review.mp4',
        poster_url: '/video_reviews/priya_mehta_poster.jpg',
        is_featured: true,
        created_at: '2024-01-10T14:30:00Z'
      },
      {
        id: '3',
        customer_name: 'Amit Industries',
        location: 'Manufacturing Unit, Dewas',
        rating: 5,
        system_capacity: '500kW Industrial',
        monthly_savings: '₹2.5L',
        review_text: 'Professional team with deep technical expertise. Zero downtime during installation and excellent after-sales service.',
        video_url: '/video_reviews/amit_industries_review.mp4',
        poster_url: '/video_reviews/amit_industries_poster.jpg',
        is_featured: true,
        created_at: '2024-01-05T09:15:00Z'
      }
    ];
  }

  /**
   * Get media assets by category
   */
  async getMediaByCategory(category: MediaAsset['category'], limit = 10): Promise<MediaAsset[]> {
    try {
      if (!supabase) {
        console.warn('Supabase not configured');
        return [];
      }

      const { data, error } = await supabase
        .from('media_assets')
        .select('*')
        .eq('category', category)
        .order('created_at', { ascending: false })
        .limit(limit);

      if (error) {
        console.error('Error fetching media assets:', error);
        return [];
      }

      return data?.map(asset => ({
        ...asset,
        url: this.getOptimizedUrl(asset.url),
      })) || [];
    } catch (error) {
      console.error('Error in getMediaByCategory:', error);
      return [];
    }
  }

  /**
   * Upload media to Supabase storage
   */
  async uploadMedia(file: File, category: string, metadata?: Record<string, unknown>): Promise<string | null> {
    try {
      if (!supabase) {
        console.warn('Supabase not configured');
        return null;
      }

      const fileExt = file.name.split('.').pop();
      const fileName = `${category}/${Date.now()}.${fileExt}`;

      const { data, error } = await supabase.storage
        .from('media')
        .upload(fileName, file);

      if (error) {
        console.error('Error uploading file:', error);
        return null;
      }

      // Save metadata to database
      await supabase
        .from('media_assets')
        .insert({
          name: file.name,
          url: data.path,
          type: file.type.startsWith('video') ? 'video' : 'image',
          category,
          size: file.size,
          metadata
        });

      return this.getOptimizedUrl(data.path);
    } catch (error) {
      console.error('Error in uploadMedia:', error);
      return null;
    }
  }

  /**
   * Get SEO-optimized image props
   */
  getSEOImageProps(path: string, alt: string, options?: {
    width?: number;
    height?: number;
    priority?: boolean;
  }) {
    return {
      src: this.getOptimizedUrl(path, options),
      alt,
      srcSet: this.getResponsiveSrcSet(path),
      sizes: options?.priority 
        ? '(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw'
        : '(max-width: 768px) 100vw, 50vw',
      loading: options?.priority ? 'eager' : ('lazy' as const),
      decoding: 'async' as const,
      ...options
    };
  }
}

// Export singleton instance
export const supabaseMedia = SupabaseMediaManager.getInstance();

// Utility functions for easy use
export function getOptimizedImageUrl(path: string, options?: Parameters<SupabaseMediaManager['getOptimizedUrl']>[1]): string {
  return supabaseMedia.getOptimizedUrl(path, options);
}

export function getResponsiveImageProps(path: string, alt: string, options?: Parameters<SupabaseMediaManager['getSEOImageProps']>[2]) {
  return supabaseMedia.getSEOImageProps(path, alt, options);
}

// Video Review utility functions
export const getVideoReviews = async (): Promise<VideoReviewData[]> => {
  try {
    // For now, return sample data directly since Supabase table may not be set up
    // You can uncomment the database query below once the video_reviews table is created
    
    /*
    const { data, error } = await supabase
      .from('video_reviews')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching video reviews:', error);
      return getSampleVideoReviews();
    }

    return data || getSampleVideoReviews();
    */
    
    return getSampleVideoReviews();
  } catch (error) {
    console.error('Error fetching video reviews:', error);
    // Return sample data if any error occurs
    return getSampleVideoReviews();
  }
};

// Sample video reviews for development and fallback
export const getSampleVideoReviews = (): VideoReviewData[] => {
  return [
    {
      id: '1',
      video_url: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
      poster_url: '/sample_solar_image.jpg',
      customer_name: 'Rajesh Kumar',
      location: 'Bhopal, Madhya Pradesh',
      rating: 5,
      system_capacity: '5 kW',
      monthly_savings: '₹3,500',
      review_text: 'Autosys Sunergy installed an excellent solar system at my home in Bhopal. The team was professional and the installation was completed on time. My electricity bills have reduced by 80%.',
      is_featured: true,
      created_at: '2024-01-15T10:00:00Z'
    },
    {
      id: '2',
      video_url: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4',
      poster_url: '/sample_solar_image.jpg',
      customer_name: 'Priya Sharma',
      location: 'Indore, Madhya Pradesh',
      rating: 5,
      system_capacity: '3 kW',
      monthly_savings: '₹2,800',
      review_text: 'Amazing service from Autosys Sunergy! The solar panels are working perfectly and the savings are exactly as promised. Highly recommend for residential solar solutions.',
      is_featured: true,
      created_at: '2024-01-20T14:30:00Z'
    },
    {
      id: '3',
      video_url: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4',
      poster_url: '/sample_solar_image.jpg',
      customer_name: 'Suresh Patel',
      location: 'Jabalpur, Madhya Pradesh',
      rating: 5,
      system_capacity: '10 kW',
      monthly_savings: '₹7,200',
      review_text: 'Autosys Sunergy provided comprehensive commercial solar solution for our business. The ROI is excellent and their after-sales service is outstanding.',
      is_featured: true,
      created_at: '2024-01-25T09:15:00Z'
    },
    {
      id: '4',
      video_url: '/sample_solar_image.jpg', // Temporary fallback - will be replaced with actual video
      poster_url: '/sample_solar_image.jpg',
      customer_name: 'Anita Verma',
      location: 'Gwalior, Madhya Pradesh',
      rating: 5,
      system_capacity: '4 kW',
      monthly_savings: '₹3,000',
      review_text: 'The solar installation process was smooth and hassle-free. Autosys Sunergy team handled all paperwork and government approvals. Very satisfied with the service.',
      is_featured: false,
      created_at: '2024-02-01T16:45:00Z'
    },
    {
      id: '5',
      video_url: '/sample_solar_image.jpg', // Temporary fallback - will be replaced with actual video
      poster_url: '/sample_solar_image.jpg',
      customer_name: 'Vikram Singh',
      location: 'Ujjain, Madhya Pradesh',
      rating: 5,
      system_capacity: '6 kW',
      monthly_savings: '₹4,500',
      review_text: 'Best decision to go solar with Autosys Sunergy! Quality equipment, professional installation, and excellent customer support. My family is very happy with the results.',
      is_featured: false,
      created_at: '2024-02-05T11:20:00Z'
    },
    {
      id: '6',
      video_url: '/sample_solar_image.jpg', // Temporary fallback - will be replaced with actual video
      poster_url: '/sample_solar_image.jpg',
      customer_name: 'Meera Agarwal',
      location: 'Ratlam, Madhya Pradesh',
      rating: 5,
      system_capacity: '8 kW',
      monthly_savings: '₹5,800',
      review_text: 'Autosys Sunergy delivered exactly what they promised. The solar system is generating more power than expected and the monitoring app is very helpful.',
      is_featured: false,
      created_at: '2024-02-10T13:10:00Z'
    }
  ];
};
