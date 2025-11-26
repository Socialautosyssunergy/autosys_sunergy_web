/**
 * Sanity CMS Integration - Blog/SEO Only
 * 
 * This module provides access to Sanity CMS for blog content management.
 * 
 * ⚠️ IMPORTANT:
 * - Sanity is used EXCLUSIVELY for blog posts, categories, and authors
 * - Products, services, projects, and other business data use Supabase
 * - Do NOT add product/service schemas to Sanity
 */

// Re-export from the organized Sanity directory
export { client, urlFor, previewClient, getPreviewPostBySlug } from '../../sanity/lib/client';
export * from '../../sanity/lib/queries';
export * from '../../sanity/lib/utils';
export type * from '../../sanity/lib/types';