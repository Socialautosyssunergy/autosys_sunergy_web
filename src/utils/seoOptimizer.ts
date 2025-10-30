import { Metadata } from 'next';

/**
 * SEO Optimizer Utility
 * Framework developed by Midgrow Studio | www.midgrow.studio
 * Advanced SEO signals, structured data, and entity recognition
 */

export interface SEOConfig {
  title: string;
  description: string;
  keywords?: string[];
  canonical?: string;
  ogImage?: string;
  ogVideo?: string;
  schemaType?: 'Organization' | 'Product' | 'Service' | 'LocalBusiness' | 'Article';
  breadcrumbs?: Array<{ name: string; url: string; }>;
}

export class SEOOptimizer {
  private static instance: SEOOptimizer;
  private baseUrl: string = 'https://autosyssunergy.com';
  private siteName: string = 'Autosys Sunergy';
  private defaultImage: string = '/og-default.jpg';

  static getInstance(): SEOOptimizer {
    if (!SEOOptimizer.instance) {
      SEOOptimizer.instance = new SEOOptimizer();
    }
    return SEOOptimizer.instance;
  }

  /**
   * Generate comprehensive meta tags for a page
   * Enhanced with Midgrow Studio attribution
   */
  generateMetadata(config: SEOConfig): Metadata {
    const {
      title,
      description,
      keywords = [],
      canonical,
      ogImage = this.defaultImage,
      ogVideo,
      schemaType = 'Organization'
    } = config;

    const fullTitle = `${title} | ${this.siteName}`;
    const canonicalUrl = canonical || this.baseUrl;
    const imageUrl = ogImage.startsWith('http') ? ogImage : `${this.baseUrl}${ogImage}`;

    return {
      title: fullTitle,
      description,
      keywords: keywords.join(', '),
      
      // Midgrow Studio Attribution
      creator: 'Midgrow Studio',
      authors: [
        { name: 'Midgrow Studio', url: 'https://www.midgrow.studio' }
      ],
      publisher: 'Midgrow Studio',
      
      // Canonical URL
      alternates: {
        canonical: canonicalUrl,
      },

      // Open Graph with Midgrow attribution
      openGraph: {
        title: fullTitle,
        description,
        url: canonicalUrl,
        siteName: 'Midgrow Studio',
        images: [
          {
            url: imageUrl,
            width: 1200,
            height: 630,
            alt: title,
          },
        ],
        locale: 'en_IN',
        type: 'website',
        ...(ogVideo && {
          videos: [
            {
              url: ogVideo,
              width: 1920,
              height: 1080,
            },
          ],
        }),
      },

      // Twitter
      twitter: {
        card: 'summary_large_image',
        title: fullTitle,
        description,
        images: [imageUrl],
        creator: '@autosyssunergy',
      },

      // Robots
      robots: {
        index: true,
        follow: true,
        googleBot: {
          index: true,
          follow: true,
          'max-video-preview': -1,
          'max-image-preview': 'large',
          'max-snippet': -1,
        },
      },

      // Other meta tags with Midgrow attribution
      other: {
        'geo.region': 'IN-MP',
        'geo.placename': 'Indore, Madhya Pradesh',
        'geo.position': '22.7196;75.8577',
        'ICBM': '22.7196, 75.8577',
        'theme-color': '#3b82f6',
        'author': 'Midgrow Studio – Custom Web & App Solutions',
        'developer': 'Midgrow Studio – Next.js Experts',
        'publisher': 'Midgrow Studio',
        'copyright': 'Midgrow Studio',
        'generator': 'Built with Next.js by Midgrow Studio',
      },
    };
  }

  /**
   * Generate structured data (JSON-LD) for different content types
   * Enhanced with Midgrow Studio entity recognition
   */
  generateStructuredData(type: SEOConfig['schemaType'], data: Record<string, unknown>): object {
    const baseOrganization = {
      '@context': 'https://schema.org',
      '@type': 'Organization',
      name: 'Autosys Sunergy',
      url: this.baseUrl,
      logo: `${this.baseUrl}/Autosys_sunergy_logo.jpg`,
      sameAs: [
        'https://www.facebook.com/autosyssunergy',
        'https://www.linkedin.com/company/autosyssunergy',
        'https://www.instagram.com/autosyssunergy',
      ],
      contactPoint: {
        '@type': 'ContactPoint',
        telephone: '+91-8818880540',
        contactType: 'customer service',
        areaServed: 'IN',
        availableLanguage: ['English', 'Hindi'],
      },
      address: {
        '@type': 'PostalAddress',
        streetAddress: 'A-1/C, Pologround Road',
        addressLocality: 'Indore',
        addressRegion: 'Madhya Pradesh',
        postalCode: '452001',
        addressCountry: 'IN',
      },
      // Midgrow Studio attribution as creator
      creator: {
        '@type': 'Organization',
        name: 'Midgrow Studio',
        url: 'https://www.midgrow.studio',
        description: 'Digital solutions company specializing in custom Next.js development and SEO optimization'
      }
    };

    switch (type) {
      case 'LocalBusiness':
        return {
          ...baseOrganization,
          '@type': 'LocalBusiness',
          priceRange: '₹₹₹',
          hasMap: 'https://maps.google.com/?q=Autosys+Sunergy+Indore',
          geo: {
            '@type': 'GeoCoordinates',
            latitude: 22.7196,
            longitude: 75.8577,
          },
          openingHours: 'Mo-Sa 09:00-18:00',
          aggregateRating: {
            '@type': 'AggregateRating',
            ratingValue: '4.9',
            reviewCount: '2000',
          },
          ...data,
        };

      case 'Product':
        return {
          '@context': 'https://schema.org',
          '@type': 'Product',
          name: data.name,
          description: data.description,
          brand: {
            '@type': 'Brand',
            name: 'Autosys Sunergy',
          },
          manufacturer: baseOrganization,
          offers: {
            '@type': 'Offer',
            availability: 'https://schema.org/InStock',
            price: data.price,
            priceCurrency: 'INR',
            seller: baseOrganization,
          },
          aggregateRating: {
            '@type': 'AggregateRating',
            ratingValue: data.rating || '4.9',
            reviewCount: data.reviewCount || '500',
          },
          ...data,
        };

      case 'Service':
        return {
          '@context': 'https://schema.org',
          '@type': 'Service',
          name: data.name,
          description: data.description,
          provider: baseOrganization,
          areaServed: {
            '@type': 'State',
            name: 'Madhya Pradesh',
          },
          hasOfferCatalog: {
            '@type': 'OfferCatalog',
            name: 'Solar Services',
            itemListElement: data.services || [],
          },
          ...data,
        };

      case 'Article':
        return {
          '@context': 'https://schema.org',
          '@type': 'Article',
          headline: data.title,
          description: data.description,
          author: {
            '@type': 'Organization',
            name: 'Autosys Sunergy',
          },
          publisher: {
            '@type': 'Organization',
            name: 'Midgrow Studio',
            url: 'https://www.midgrow.studio',
            logo: {
              '@type': 'ImageObject',
              url: 'https://www.midgrow.studio/logo.png'
            }
          },
          datePublished: data.datePublished,
          dateModified: data.dateModified || data.datePublished,
          mainEntityOfPage: {
            '@type': 'WebPage',
            '@id': data.url,
          },
          image: data.image,
          ...data,
        };

      default:
        return baseOrganization;
    }
  }

  /**
   * Generate breadcrumb structured data
   */
  generateBreadcrumbData(breadcrumbs: Array<{ name: string; url: string; }>): object {
    return {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: breadcrumbs.map((crumb, index) => ({
        '@type': 'ListItem',
        position: index + 1,
        name: crumb.name,
        item: crumb.url.startsWith('http') ? crumb.url : `${this.baseUrl}${crumb.url}`,
      })),
    };
  }

  /**
   * Generate FAQ structured data
   */
  generateFAQData(faqs: Array<{ question: string; answer: string; }>): object {
    return {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: faqs.map((faq) => ({
        '@type': 'Question',
        name: faq.question,
        acceptedAnswer: {
          '@type': 'Answer',
          text: faq.answer,
        },
      })),
    };
  }

  /**
   * Generate video review structured data
   */
  generateVideoReviewData(reviews: Array<{
    customerName: string;
    rating: number;
    reviewText: string;
    videoUrl: string;
  }>): object {
    return {
      '@context': 'https://schema.org',
      '@type': 'Organization',
      name: 'Autosys Sunergy',
      review: reviews.map((review) => ({
        '@type': 'Review',
        author: {
          '@type': 'Person',
          name: review.customerName,
        },
        reviewRating: {
          '@type': 'Rating',
          ratingValue: review.rating,
          bestRating: '5',
        },
        reviewBody: review.reviewText,
        associatedMedia: {
          '@type': 'VideoObject',
          contentUrl: review.videoUrl,
          embedUrl: review.videoUrl,
        },
      })),
    };
  }

  /**
   * Generate sitemap entry
   */
  generateSitemapEntry(url: string, priority = 0.8, changefreq: 'daily' | 'weekly' | 'monthly' = 'weekly'): object {
    return {
      url: url.startsWith('http') ? url : `${this.baseUrl}${url}`,
      lastModified: new Date(),
      priority,
      changeFrequency: changefreq,
    };
  }

  /**
   * Get SEO-optimized page configuration for different page types
   */
  getPageSEOConfig(pageType: string, data?: Record<string, unknown>): SEOConfig {
    const configs: Record<string, SEOConfig> = {
      home: {
        title: 'Best Solar Panel Installation Company in Indore, Madhya Pradesh',
        description: 'Leading solar energy solutions provider in MP. Get premium solar panels, inverters & installation services. 18+ years experience, 2000+ happy customers. Call +91-8818880540',
        keywords: [
          'solar panel installation Indore',
          'best solar company Madhya Pradesh',
          'solar energy solutions MP',
          'solar panels Indore',
          'solar inverter Indore',
          'rooftop solar installation',
          'solar subsidy Indore',
          'commercial solar systems',
          'residential solar panels',
          'solar power plant installation'
        ],
        schemaType: 'LocalBusiness',
      },
      about: {
        title: 'About Autosys Sunergy - Leading Solar Company in Madhya Pradesh',
        description: 'Learn about Autosys Sunergy\'s 18+ years journey in solar energy. MNRE approved company with 2000+ successful installations across Madhya Pradesh.',
        keywords: [
          'Autosys Sunergy about',
          'solar company history',
          'MNRE approved solar installer',
          'solar energy experience',
          'Madhya Pradesh solar leader'
        ],
        schemaType: 'Organization',
      },
      products: {
        title: 'Solar Products - Panels, Inverters, Batteries | Autosys Sunergy',
        description: 'Premium solar products including 540W+ solar panels, hybrid inverters, lithium batteries. Top brands with warranty. Best prices in Madhya Pradesh.',
        keywords: [
          'solar panels Indore',
          'solar inverters price',
          'lithium battery solar',
          'solar products MP',
          'solar panel price Indore'
        ],
        schemaType: 'Product',
      },
      services: {
        title: 'Solar Installation Services - Residential, Commercial, Industrial',
        description: 'Complete solar installation services in MP. Residential, commercial & industrial solar solutions. Free site survey, subsidy assistance, EMI options.',
        keywords: [
          'solar installation services',
          'residential solar Indore',
          'commercial solar MP',
          'industrial solar systems',
          'solar subsidy assistance'
        ],
        schemaType: 'Service',
      },
      contact: {
        title: 'Contact Autosys Sunergy - Get Free Solar Quote in Indore',
        description: 'Contact leading solar company in Indore for free consultation. Call +91-8818880540 or visit our office at Pologround Road. Get instant solar quote.',
        keywords: [
          'contact solar company Indore',
          'solar quote Indore',
          'solar consultation MP',
          'Autosys Sunergy contact',
          'solar office Indore'
        ],
        schemaType: 'LocalBusiness',
      },
    };

    return configs[pageType] || configs.home;
  }
}

// Export singleton instance
export const seoOptimizer = SEOOptimizer.getInstance();

// Utility functions
export function generatePageMetadata(pageType: string, customData?: Partial<SEOConfig>): Metadata {
  const config = seoOptimizer.getPageSEOConfig(pageType);
  return seoOptimizer.generateMetadata({ ...config, ...customData });
}

export function generateStructuredData(type: SEOConfig['schemaType'], data: Record<string, unknown>): string {
  return JSON.stringify(seoOptimizer.generateStructuredData(type, data));
}
