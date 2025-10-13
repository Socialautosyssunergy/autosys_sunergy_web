/**
 * Video Quality Optimizer for Autosys Sunergy
 * Handles video quality optimization based on device capabilities and network
 */
import { useEffect, RefObject } from 'react';

export interface VideoQualitySettings {
  preload: 'none' | 'metadata' | 'auto';
  quality: 'low' | 'medium' | 'high';
}

export class VideoOptimizer {
  private static instance: VideoOptimizer;
  private connectionType: string = 'unknown';
  private deviceMemory: number = 4;
  private isSlowConnection: boolean = false;

  constructor() {
    this.detectConnection();
    this.detectDeviceCapabilities();
  }

  static getInstance(): VideoOptimizer {
    if (!VideoOptimizer.instance) {
      VideoOptimizer.instance = new VideoOptimizer();
    }
    return VideoOptimizer.instance;
  }

  private detectConnection(): void {
    if (typeof window !== 'undefined') {
      // @ts-expect-error - Navigator connection API not in TypeScript types
      const connection = navigator.connection || navigator.mozConnection || navigator.webkitConnection;
      if (connection) {
        this.connectionType = connection.effectiveType || 'unknown';
        this.isSlowConnection = ['slow-2g', '2g', '3g'].includes(this.connectionType);
      }
    }
  }

  private detectDeviceCapabilities(): void {
    if (typeof window !== 'undefined') {
      // @ts-expect-error - Navigator deviceMemory API not in TypeScript types
      this.deviceMemory = navigator.deviceMemory || 4;
    }
  }

  getOptimalSettings(videoType: 'service' | 'product' | 'hero'): VideoQualitySettings {
    const baseSettings: VideoQualitySettings = {
      preload: 'auto',
      quality: 'high'
    };

    // Adjust for slow connections
    if (this.isSlowConnection || this.connectionType === '3g') {
      baseSettings.preload = 'metadata';
      baseSettings.quality = 'medium';
    }

    // Adjust for low-memory devices
    if (this.deviceMemory < 4) {
      baseSettings.preload = 'none';
      baseSettings.quality = 'low';
    }

    return baseSettings;
  }

  applyVideoOptimizations(video: HTMLVideoElement, _videoType: 'service' | 'product' | 'hero'): void {
    const settings = this.getOptimalSettings(_videoType);
    
    // Apply preload setting
    video.preload = settings.preload;
    
    // Optimize video element attributes
    video.setAttribute('playsinline', 'true');
    video.setAttribute('webkit-playsinline', 'true');
    video.setAttribute('disablepictureinpicture', 'true');
    video.setAttribute('x-webkit-airplay', 'deny');
    
    // Add poster for better perceived performance
    if (!video.poster && _videoType !== 'hero') {
      video.poster = '/sample_solar_image.jpg';
    }
    
    // Optimize for mobile
    if (typeof window !== 'undefined' && window.innerWidth < 768) {
      video.muted = true; // Ensure autoplay works on mobile
      
      // Reduce quality on mobile if needed
      if (this.isSlowConnection) {
        video.preload = 'none';
      }
    }
    
    // Add error handling
    video.addEventListener('error', (e) => {
      console.warn(`Video optimization error for ${_videoType}:`, e);
      // Fallback to poster image
      if (video.poster) {
        video.style.backgroundImage = `url(${video.poster})`;
        video.style.backgroundSize = 'cover';
        video.style.backgroundPosition = 'center';
      }
    });
  }

  shouldUseHighQuality(): boolean {
    return !this.isSlowConnection && this.deviceMemory >= 4;
  }

  getQualityIndicator(): string {
    if (this.isSlowConnection) return 'Optimized for your connection';
    if (this.deviceMemory < 4) return 'Optimized for your device';
    return 'High Quality';
  }
}

// Export singleton instance
export const videoOptimizer = VideoOptimizer.getInstance();

// Utility function for easy integration
export function optimizeVideo(video: HTMLVideoElement, type: 'service' | 'product' | 'hero'): void {
  videoOptimizer.applyVideoOptimizations(video, type);
}

// Custom hook for React components
export function useVideoOptimization(videoRef: RefObject<HTMLVideoElement>, type: 'service' | 'product' | 'hero') {
  useEffect(() => {
    if (videoRef.current) {
      optimizeVideo(videoRef.current, type);
    }
  }, [videoRef, type]);
  
  return {
    shouldUseHighQuality: videoOptimizer.shouldUseHighQuality(),
    qualityIndicator: videoOptimizer.getQualityIndicator(),
    optimalSettings: videoOptimizer.getOptimalSettings(type)
  };
}