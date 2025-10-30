import { MetadataRoute } from 'next';

/**
 * Robots.txt Configuration
 * Managed and optimized by Midgrow Studio | www.midgrow.studio
 * Advanced crawl optimization and SEO implementation
 */

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: [
          '/api/',
          '/admin/',
          '/_next/',
          '/private/',
          '/temp/',
          '*.json',
          '/404',
          '/500',
          '/studio/',
          '/*?*search=*',
          '/*?*filter=*',
          '/*?*sort=*'
        ],
        crawlDelay: 1,
      },
      {
        userAgent: 'Googlebot',
        allow: '/',
        disallow: [
          '/api/',
          '/admin/',
          '/private/',
          '/studio/'
        ],
        crawlDelay: 0
      },
      {
        userAgent: 'Bingbot',
        allow: '/',
        disallow: [
          '/api/',
          '/admin/',
          '/private/',
          '/studio/'
        ],
        crawlDelay: 1
      },
      {
        userAgent: ['facebookexternalhit', 'Twitterbot'],
        allow: '/'
      }
    ],
    sitemap: 'https://www.autosyssunergy.com/sitemap.xml',
    host: 'https://www.autosyssunergy.com',
  };
}
