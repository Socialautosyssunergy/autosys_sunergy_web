import { SanityImageSource } from '@sanity/image-url/lib/types/types';

// Author type
export interface Author {
  _id: string;
  name: string;
  slug: {
    current: string;
  };
  role: string;
  bio?: string;
  image?: SanityImageSource;
  socialMedia?: {
    twitter?: string;
    linkedin?: string;
    github?: string;
    website?: string;
  };
}

// Category type
export interface Category {
  _id: string;
  name: string;
  slug: {
    current: string;
  };
  description?: string;
  color?: string;
}

// Content block types for rich text
export interface ContentBlock {
  _type: string;
  _key: string;
  children?: ContentChild[];
  markDefs?: MarkDef[];
  style?: string;
  listItem?: string;
  level?: number;
}

export interface ContentChild {
  _type: 'span';
  _key: string;
  text: string;
  marks?: string[];
}

export interface MarkDef {
  _type: string;
  _key: string;
  href?: string;
}

// Image content block
export interface ImageBlock {
  _type: 'image';
  _key: string;
  asset: {
    _ref: string;
    _type: 'reference';
  };
  alt?: string;
  caption?: string;
}

// Code block
export interface CodeBlock {
  _type: 'code';
  _key: string;
  language?: string;
  code: string;
  filename?: string;
}

// Quote block
export interface QuoteBlock {
  _type: 'blockquote';
  _key: string;
  quote: string;
  author?: string;
}

// Video block
export interface VideoBlock {
  _type: 'video';
  _key: string;
  url: string;
  title?: string;
  description?: string;
}

// Union type for all content blocks
export type ContentBlockType = ContentBlock | ImageBlock | CodeBlock | QuoteBlock | VideoBlock;

// Main blog post interface
export interface BlogPost {
  _id: string;
  _type: 'post';
  title: string;
  slug: {
    current: string;
  };
  excerpt?: string;
  content: ContentBlockType[];
  coverImage?: SanityImageSource;
  publishDate: string;
  lastModified?: string;
  category?: Category;
  tags?: string[];
  metaTitle?: string;
  metaDescription?: string;
  featured?: boolean;
  author: string | Author; // Support both string and Author object
  relatedPosts?: BlogPost[];
  readingTime?: number;
  views?: number;
  likes?: number;
}

// Simplified blog post for listings
export interface BlogPostPreview {
  _id: string;
  title: string;
  slug: {
    current: string;
  };
  excerpt?: string;
  coverImage?: SanityImageSource;
  publishDate: string;
  category?: Category;
  tags?: string[];
  author: string | Pick<Author, '_id' | 'name' | 'role'>; // Support both string and Author object
  readingTime?: number;
}

// Blog pagination
export interface BlogPagination {
  posts: BlogPostPreview[];
  currentPage: number;
  totalPages: number;
  totalPosts: number;
  hasNextPage: boolean;
  hasPrevPage: boolean;
}

// Blog filters
export interface BlogFilters {
  category?: string;
  tag?: string;
  author?: string;
  search?: string;
  featured?: boolean;
}

// SEO metadata for blog posts
export interface BlogSEO {
  title: string;
  description: string;
  keywords: string[];
  ogImage?: string;
  canonical?: string;
  structuredData?: Record<string, unknown>;
}

// Reading time calculation utility type
export interface ReadingTimeResult {
  text: string;
  minutes: number;
  time: number;
  words: number;
}
