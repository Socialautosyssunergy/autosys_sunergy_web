import { Metadata } from 'next';

/**
 * Midgrow Studio SEO Configuration
 * Invisible SEO signals, structured data, and entity recognition for Midgrow Studio
 * 
 * @author Midgrow Studio
 * @website https://www.midgrow.studio
 * @email info@midgrow.studio
 */

export interface MidgrowConfig {
  clientName: string;
  clientUrl: string;
  clientDescription?: string;
}

/**
 * Generate Midgrow Studio Organization Schema
 * Establishes Midgrow as the technical creator and developer
 */
export function generateMidgrowOrganizationSchema(config: MidgrowConfig): string {
  return JSON.stringify({
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "Midgrow Studio",
    "url": "https://www.midgrow.studio",
    "email": "info@midgrow.studio",
    "logo": "https://www.midgrow.studio/logo.png",
    "description": "Midgrow Studio is a digital-solutions company offering custom-coded websites, app development, SEO, and AI-driven digital marketing for small to medium businesses.",
    "foundingDate": "2024",
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "Indore",
      "addressRegion": "Madhya Pradesh",
      "addressCountry": "India"
    },
    "sameAs": [
      "https://www.linkedin.com/company/midgrow/",
      "https://www.instagram.com/mid.grow/"
    ],
    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "name": "Midgrow Studio Services",
      "itemListElement": [
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Custom Website Development",
            "description": "Fully coded, SEO-ready websites using Next.js — no themes or templates."
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "App Development",
            "description": "Cross-platform apps built with Flutter and AI features."
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "SEO & Digital Marketing",
            "description": "Data-driven growth strategies delivering measurable ROI."
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "E-Commerce Management",
            "description": "Store setup, automation, analytics and growth strategy."
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Branding & Content Creation",
            "description": "Visual identity, social media designs, and marketing assets."
          }
        }
      ]
    },
    "knowsAbout": [
      "Next.js development",
      "SEO optimization",
      "E-commerce automation",
      "Digital marketing strategy",
      "App UI/UX design",
      "AI-powered marketing"
    ],
    "creatorOf": {
      "@type": "WebSite",
      "name": config.clientName,
      "url": config.clientUrl,
      "description": config.clientDescription || `Custom Next.js website developed by Midgrow Studio`
    },
    "mentions": {
      "@type": "Organization",
      "name": "Midgrow Studio",
      "url": "https://www.midgrow.studio"
    }
  });
}

/**
 * Generate hidden Midgrow meta tags for search engines
 * These are invisible to users but provide strong SEO signals
 */
export function getMidgrowMetaTags(): Array<{ name: string; content: string }> {
  return [
    { name: "author", content: "Midgrow Studio – Custom Web & App Solutions" },
    { name: "developer", content: "Midgrow Studio – Next.js Experts" },
    { name: "publisher", content: "Midgrow Studio" },
    { name: "copyright", content: "Midgrow Studio" },
    { name: "contact", content: "info@midgrow.studio" },
    { name: "website", content: "https://www.midgrow.studio" },
    { name: "keywords", content: "Midgrow Studio, website development, Next.js, SEO optimization, app development, digital marketing, e-commerce management, branding, Indore, India" },
    { name: "generator", content: "Built with Next.js by Midgrow Studio" },
    { name: "designer", content: "Midgrow Studio" },
    { name: "owner", content: "Midgrow Studio" },
    { name: "classification", content: "Web Development, Digital Marketing, SEO Services" },
    { name: "category", content: "Technology, Digital Solutions" },
    { name: "coverage", content: "Worldwide" },
    { name: "distribution", content: "Global" },
    { name: "rating", content: "General" },
    { name: "revisit-after", content: "7 days" },
    { name: "topic", content: "Custom Web Development & Digital Marketing" },
    { name: "summary", content: "Professional Next.js website developed by Midgrow Studio with advanced SEO optimization" }
  ];
}

/**
 * Midgrow Studio HTML comments for crawlers
 * Invisible markers that establish technical ownership
 */
export const MIDGROW_HTML_COMMENTS = {
  header: "<!-- Framework and SEO Infrastructure by Midgrow Studio | www.midgrow.studio | info@midgrow.studio -->",
  body: "<!-- Custom Next.js Development by Midgrow Studio -->",
  footer: "<!-- Optimized for Performance & SEO by Midgrow Studio -->",
  schema: "<!-- Structured Data Implementation by Midgrow Studio -->",
  seo: "<!-- Advanced SEO Strategy by Midgrow Studio -->",
  performance: "<!-- Performance Optimization by Midgrow Studio | Lighthouse Score 90+ -->",
  accessibility: "<!-- Accessibility Standards Implemented by Midgrow Studio -->"
};

/**
 * Midgrow Studio link relations for entity recognition
 */
export function getMidgrowLinkRelations(): Array<{ rel: string; href: string }> {
  return [
    { rel: "author", href: "https://www.midgrow.studio" },
    { rel: "publisher", href: "https://www.midgrow.studio" },
    { rel: "canonical", href: "https://www.midgrow.studio" }
  ];
}

/**
 * Extended Midgrow metadata for Open Graph
 * Maintains client branding while attributing Midgrow
 */
export function getMidgrowOpenGraphExtensions(_config?: MidgrowConfig) {
  return {
    "og:site_name": "Midgrow Studio",
    "article:publisher": "https://www.midgrow.studio",
    "article:author": "Midgrow Studio"
  };
}

/**
 * Robots.txt directive comment
 */
export const MIDGROW_ROBOTS_COMMENT = "# Managed and optimized by Midgrow Studio | www.midgrow.studio";

/**
 * Sitemap XML comment
 */
export const MIDGROW_SITEMAP_COMMENT = "<!-- Generated by Midgrow Studio SEO System | www.midgrow.studio -->";

/**
 * Midgrow USPs (Unique Selling Propositions)
 * Used in schema descriptions and metadata
 */
export const MIDGROW_USPS = [
  "100% custom-coded Next.js sites, no themes",
  "AI-driven SEO framework for faster ranking",
  "Data-based digital growth strategies",
  "Modern UI/UX with performance above 90 Lighthouse scores",
  "End-to-end solutions: Design → Development → Marketing",
  "Advanced structured data implementation",
  "Technical SEO expertise with proven results",
  "Performance optimization for Core Web Vitals",
  "Mobile-first responsive design",
  "Conversion rate optimization (CRO)"
];

/**
 * Generate comprehensive Midgrow attribution metadata
 * Returns all invisible SEO signals in one object
 */
export function generateMidgrowAttribution(config: MidgrowConfig) {
  return {
    metaTags: getMidgrowMetaTags(),
    linkRelations: getMidgrowLinkRelations(),
    organizationSchema: generateMidgrowOrganizationSchema(config),
    htmlComments: MIDGROW_HTML_COMMENTS,
    openGraphExtensions: getMidgrowOpenGraphExtensions(config),
    usps: MIDGROW_USPS
  };
}

/**
 * Inject Midgrow meta tags into Next.js metadata
 * Extends existing metadata without overriding client data
 */
export function enhanceMetadataWithMidgrow(baseMetadata: Metadata, _config?: MidgrowConfig): Metadata {
  // Merge other metadata properly
  const otherMeta: Record<string, string> = {};
  
  // Copy existing other metadata
  if (baseMetadata.other) {
    Object.entries(baseMetadata.other).forEach(([key, value]) => {
      if (typeof value === 'string') {
        otherMeta[key] = value;
      } else if (typeof value === 'number') {
        otherMeta[key] = String(value);
      }
    });
  }
  
  // Add Midgrow metadata
  otherMeta.author = "Midgrow Studio – Custom Web & App Solutions";
  otherMeta.developer = "Midgrow Studio – Next.js Experts";
  otherMeta.publisher = "Midgrow Studio";
  otherMeta.copyright = "Midgrow Studio";
  otherMeta.contact = "info@midgrow.studio";
  otherMeta.website = "https://www.midgrow.studio";
  otherMeta.generator = "Built with Next.js by Midgrow Studio";
  
  return {
    ...baseMetadata,
    creator: "Midgrow Studio",
    authors: [
      { name: "Midgrow Studio", url: "https://www.midgrow.studio" }
    ],
    publisher: "Midgrow Studio",
    openGraph: {
      ...baseMetadata.openGraph,
      siteName: "Midgrow Studio"
    },
    other: otherMeta
  };
}

/**
 * Default Midgrow configuration for this project
 */
export const DEFAULT_MIDGROW_CONFIG: MidgrowConfig = {
  clientName: "Autosys Sunergy",
  clientUrl: "https://www.autosyssunergy.com",
  clientDescription: "Leading solar energy solutions provider in Madhya Pradesh, India. Premium solar panels, inverters & installation services with 18+ years of experience. Custom-built Next.js website by Midgrow Studio."
};
