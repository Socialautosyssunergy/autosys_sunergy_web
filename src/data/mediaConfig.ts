/**
 * Centralized Media Configuration for Autosys Sunergy Website
 * All Supabase storage URLs and media assets are managed here
 */

export const MEDIA_CONFIG = {
  // Main homepage videos
  hero: {
    main: 'https://nvwqkpwakpujlmgowmdb.supabase.co/storage/v1/object/sign/Autosys%20Sunergy/Autosys%20web%20videos/Home_page/Hero_section_video.mp4?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV8yYzg4ODU4YS0wMzk4LTQ2NWQtYTY1Yy03ZWE2YTgzMWUwODciLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJBdXRvc3lzIFN1bmVyZ3kvQXV0b3N5cyB3ZWIgdmlkZW9zL0hvbWVfcGFnZS9IZXJvX3NlY3Rpb25fdmlkZW8ubXA0IiwiaWF0IjoxNzU1MzI3NDEwLCJleHAiOjE5MTMwMDc0MTB9.4rXZLq6TWlKeARvSt5RZH-EulOYioIUDbCp8q3flwMk',
    fallback: '/Hero_section_video_1.mov'
  },

  footer: {
    background: 'https://nvwqkpwakpujlmgowmdb.supabase.co/storage/v1/object/sign/Autosys%20Sunergy/Autosys%20web%20videos/Home_page/Footer_background_video.mp4?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV8yYzg4ODU4YS0wMzk4LTQ2NWQtYTY1Yy03ZWE2YTgzMWUwODciLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJBdXRvc3lzIFN1bmVyZ3kvQXV0b3N5cyB3ZWIgdmlkZW9zL0hvbWVfcGFnZS9Gb290ZXJfYmFja2dyb3VuZF92aWRlby5tcDQiLCJpYXQiOjE3NTUzMjc0NDQsImV4cCI6MTkxMzAwNzQ0NH0.TBMi4lJT_rU5A-XKOm8EDEDav-4KYaDb3sRdfIDjN1c',
    fallback: '/Footer_background_video.mp4'
  },

  // Product showcase videos
  products: {
    gi_structure: 'https://nvwqkpwakpujlmgowmdb.supabase.co/storage/v1/object/sign/Autosys%20Sunergy/Autosys%20web%20videos/Home_page/product%20showcase%20videos/Gi_structure.mp4?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV8yYzg4ODU4YS0wMzk4LTQ2NWQtYTY1Yy03ZWE2YTgzMWUwODciLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJBdXRvc3lzIFN1bmVyZ3kvQXV0b3N5cyB3ZWIgdmlkZW9zL0hvbWVfcGFnZS9wcm9kdWN0IHNob3djYXNlIHZpZGVvcy9HaV9zdHJ1Y3R1cmUubXA0IiwiaWF0IjoxNzU1MzI3NTEzLCJleHAiOjE5MTMwMDc1MTN9.853FV88120SwPOaonZwQFwLyRlYGlC8fBHJcm9-haZA',
    microtek_inverter: 'https://nvwqkpwakpujlmgowmdb.supabase.co/storage/v1/object/sign/Autosys%20Sunergy/Autosys%20web%20videos/Home_page/product%20showcase%20videos/Microtek_solar_inverter_video.mp4?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV8yYzg4ODU4YS0wMzk4LTQ2NWQtYTY1Yy03ZWE2YTgzMWUwODciLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJBdXRvc3lzIFN1bmVyZ3kvQXV0b3N5cyB3ZWIgdmlkZW9zL0hvbWVfcGFnZS9wcm9kdWN0IHNob3djYXNlIHZpZGVvcy9NaWNyb3Rla19zb2xhcl9pbnZlcnRlcl92aWRlby5tcDQiLCJpYXQiOjE3NTUzMjc1MzQsImV4cCI6MTkxMzAwNzUzNH0.nPmgiFI6kxf3cfqp64FsQ0QX0kb4Bk9deWxTNBq8_nA',
    novasys_panels: 'https://nvwqkpwakpujlmgowmdb.supabase.co/storage/v1/object/sign/Autosys%20Sunergy/Autosys%20web%20videos/Home_page/product%20showcase%20videos/Novasys_panels_video.mp4?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV8yYzg4ODU4YS0wMzk4LTQ2NWQtYTY1Yy03ZWE2YTgzMWUwODciLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJBdXRvc3lzIFN1bmVyZ3kvQXV0b3N5cyB3ZWIgdmlkZW9zL0hvbWVfcGFnZS9wcm9kdWN0IHNob3djYXNlIHZpZGVvcy9Ob3Zhc3lzX3BhbmVsc192aWRlby5tcDQiLCJpYXQiOjE3NTUzMjc1NjIsImV4cCI6MTkxMzAwNzU2Mn0.OgSkjzwadvaX6P2J0_FAeIs8HH47VT2eX7_dcjuR43Q',
    solar_battery: '/solar_product_video/Solar_battery.mp4', // Fallback for now
  },

  // Services showcase videos
  services: {
    residential: 'https://nvwqkpwakpujlmgowmdb.supabase.co/storage/v1/object/sign/Autosys%20Sunergy/Autosys%20web%20videos/Home_page/services%20showcase%20videos/resedential_solar.mp4?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV8yYzg4ODU4YS0wMzk4LTQ2NWQtYTY1Yy03ZWE2YTgzMWUwODciLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJBdXRvc3lzIFN1bmVyZ3kvQXV0b3N5cyB3ZWIgdmlkZW9zL0hvbWVfcGFnZS9zZXJ2aWNlcyBzaG93Y2FzZSB2aWRlb3MvcmVzZWRlbnRpYWxfc29sYXIubXA0IiwiaWF0IjoxNzU1MzI3NjE0LCJleHAiOjE5MTMwMDc2MTR9.VnrSVz5xjlfSyWOif8wd0qz0RgJi57lDKul7ijaaa04',
    commercial: 'https://nvwqkpwakpujlmgowmdb.supabase.co/storage/v1/object/sign/Autosys%20Sunergy/Autosys%20web%20videos/Home_page/services%20showcase%20videos/commercial_solar.mp4?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV8yYzg4ODU4YS0wMzk4LTQ2NWQtYTY1Yy03ZWE2YTgzMWUwODciLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJBdXRvc3lzIFN1bmVyZ3kvQXV0b3N5cyB3ZWIgdmlkZW9zL0hvbWVfcGFnZS9zZXJ2aWNlcyBzaG93Y2FzZSB2aWRlb3MvY29tbWVyY2lhbF9zb2xhci5tcDQiLCJpYXQiOjE3NTUzMjc1OTEsImV4cCI6MTkxMzAwNzU5MX0.gTsYmB3xz0gVDfjfdb1leYUQuKsbUs8jIZjaIzD90eA',
    industrial: 'https://nvwqkpwakpujlmgowmdb.supabase.co/storage/v1/object/sign/Autosys%20Sunergy/Autosys%20web%20videos/Home_page/services%20showcase%20videos/Industrial_solar.mp4?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV8yYzg4ODU4YS0wMzk4LTQ2NWQtYTY1Yy03ZWE2YTgzMWUwODciLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJBdXRvc3lzIFN1bmVyZ3kvQXV0b3N5cyB3ZWIgdmlkZW9zL0hvbWVfcGFnZS9zZXJ2aWNlcyBzaG93Y2FzZSB2aWRlb3MvSW5kdXN0cmlhbF9zb2xhci5tcDQiLCJpYXQiOjE3NTUzMjc4MzIsImV4cCI6MTkxMzAwNzgzMn0.Ot-EdNk1QsLCe5wGNh15qGNP5zbW72TN5mwRMcwju9s',
  },

  // AI Support Avatar
  ai: {
    avatar: '/Autosys_sunergy_AI_Support_Avatar.mp4'
  },

  // Logo and images
  images: {
    logo: '/Autosys_sunergy_logo.jpg',
    microtek_logo: '/microtek_solar_inverter_logo.png',
    novasys_logo: '/novasys_logo.png',
    sample_solar: '/sample_solar_image.jpg',
    solar_product_sample: '/Solar_product_sample_image.jpg',
    solar_services_sample: '/Solar_services_sample_image.jpg',
    about_hero: '/about_hero_section_images/About_herosection_image1.png'
  }
};

// Utility functions for media management
export const getVideoUrl = (category: keyof typeof MEDIA_CONFIG, key: string, fallback?: string): string => {
  const categoryMedia = MEDIA_CONFIG[category] as Record<string, string>;
  return categoryMedia?.[key] || fallback || '';
};

export const getImageUrl = (key: keyof typeof MEDIA_CONFIG.images): string => {
  return MEDIA_CONFIG.images[key];
};

// Performance optimized video configuration
export const VIDEO_CONFIG = {
  // Preload settings
  preload: {
    hero: 'metadata', // Load hero video metadata first
    showcase: 'none', // Load showcase videos on demand
    background: 'none' // Load background videos on demand
  },

  // Quality settings for different video types
  quality: {
    hero: { width: 1920, height: 1080, bitrate: '2M' },
    showcase: { width: 1280, height: 720, bitrate: '1.5M' },
    background: { width: 1920, height: 1080, bitrate: '1M' }
  },

  // Optimization flags
  optimization: {
    lazyLoad: true,
    autoplay: false, // Respect user preferences
    muted: true, // Required for autoplay
    loop: true,
    controls: true,
    playsInline: true // Important for mobile
  }
};

export default MEDIA_CONFIG;
