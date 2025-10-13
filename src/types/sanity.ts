// Sanity CMS Types for Blog System

export interface SanityImageAsset {
  _ref: string;
  _type: 'reference';
}

export interface SanityImage {
  _type: 'image';
  asset: SanityImageAsset;
  alt?: string;
  hotspot?: {
    x: number;
    y: number;
    height: number;
    width: number;
  };
  crop?: {
    top: number;
    bottom: number;
    left: number;
    right: number;
  };
}

export interface Author {
  _id: string;
  name: string;
  role: string;
  bio: string;
  image?: SanityImage;
}

export interface Category {
  _id: string;
  name: string;
  slug: {
    current: string;
  };
  description?: string;
}

export interface BlogPost {
  _id: string;
  title: string;
  slug: {
    current: string;
  };
  excerpt: string;
  content: Array<Record<string, unknown>>; // Rich text blocks
  coverImage: SanityImage;
  publishDate: string;
  lastModified?: string;
  category: Category;
  tags: string[];
  metaTitle: string;
  metaDescription: string;
  featured: boolean;
  author: Author;
  relatedPosts?: BlogPost[];
}

export interface BlogListItem {
  _id: string;
  title: string;
  slug: {
    current: string;
  };
  excerpt: string;
  coverImage: SanityImage;
  publishDate: string;
  category: Category;
  tags: string[];
  featured: boolean;
  author: {
    name: string;
    role: string;
  };
}

// Schema for JSON-LD structured data
export interface BlogPostSchema {
  '@context': string;
  '@type': string;
  headline: string;
  description: string;
  image: string;
  author: {
    '@type': string;
    name: string;
    jobTitle: string;
    worksFor: {
      '@type': string;
      name: string;
      url: string;
    };
  };
  publisher: {
    '@type': string;
    name: string;
    url: string;
    logo: {
      '@type': string;
      url: string;
    };
  };
  datePublished: string;
  dateModified: string;
  mainEntityOfPage: {
    '@type': string;
    '@id': string;
  };
  keywords?: string[];
  articleSection?: string;
}

// Props for blog components
export interface BlogPostPageProps {
  post: BlogPost;
  relatedPosts: BlogListItem[];
}

export interface BlogListPageProps {
  posts: BlogListItem[];
  featuredPosts: BlogListItem[];
  categories: Category[];
  currentCategory?: string;
}

// Image optimization settings
export interface ImageConfig {
  width?: number;
  height?: number;
  quality?: number;
  format?: 'jpg' | 'png' | 'webp' | 'auto';
  fit?: 'clip' | 'crop' | 'fill' | 'fillmax' | 'max' | 'scale' | 'min';
  aspectRatio?: '1:1' | '4:5' | '16:9' | '3:2';
}

// SEO configuration
export interface SEOConfig {
  title: string;
  description: string;
  keywords: string[];
  canonical: string;
  openGraph: {
    type: string;
    title: string;
    description: string;
    images: Array<{
      url: string;
      width: number;
      height: number;
      alt: string;
    }>;
    url: string;
    siteName: string;
    publishedTime?: string;
    modifiedTime?: string;
    section?: string;
    tags?: string[];
  };
  twitter: {
    card: 'summary_large_image';
    title: string;
    description: string;
    images: string[];
  };
}
