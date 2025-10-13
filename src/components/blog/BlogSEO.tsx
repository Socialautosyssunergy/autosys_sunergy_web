'use client';

import Head from 'next/head';
import { BlogPost } from '@/types/sanity';
import { urlFor } from '@/lib/sanity';

interface BlogSEOProps {
  post: BlogPost;
  url: string;
}

const BlogSEO: React.FC<BlogSEOProps> = ({ post, url }) => {
  // Generate image URLs for different sizes
  const getImageUrl = (width: number, height: number) => {
    return urlFor(post.coverImage)
      .width(width)
      .height(height)
      .quality(90)
      .format('jpg')
      .url();
  };

  // Generate structured data for blog post
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.title,
    description: post.metaDescription || post.excerpt,
    image: {
      '@type': 'ImageObject',
      url: getImageUrl(1200, 630),
      width: 1200,
      height: 630,
      caption: post.coverImage.alt || post.title
    },
    author: {
      '@type': 'Person',
      name: post.author.name,
      jobTitle: post.author.role,
      description: post.author.bio,
      image: post.author.image ? urlFor(post.author.image).width(400).height(400).url() : undefined,
      worksFor: {
        '@type': 'Organization',
        name: 'AutoSys Sunergy',
        url: 'https://autosynsunergy.com',
        description: 'Leading solar energy solutions provider in Madhya Pradesh, India'
      }
    },
    publisher: {
      '@type': 'Organization',
      name: 'AutoSys Sunergy',
      url: 'https://autosynsunergy.com',
      description: 'Premier solar energy installation and consulting company',
      logo: {
        '@type': 'ImageObject',
        url: 'https://autosynsunergy.com/Autosys_sunergy_logo.jpg',
        width: 300,
        height: 150
      },
      sameAs: [
        'https://www.facebook.com/autosynsunergy',
        'https://www.linkedin.com/company/autosynsunergy',
        'https://twitter.com/autosynsunergy',
        'https://www.instagram.com/autosynsunergy'
      ]
    },
    datePublished: new Date(post.publishDate).toISOString(),
    dateModified: new Date(post.lastModified || post.publishDate).toISOString(),
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': url
    },
    keywords: post.tags,
    articleSection: post.category.name,
    articleBody: extractTextFromContent(post.content),
    wordCount: estimateWordCount(post.content),
    timeRequired: `PT${Math.ceil(estimateWordCount(post.content) / 200)}M`,
    inLanguage: 'en-IN',
    isAccessibleForFree: true,
    url: url,
    about: {
      '@type': 'Thing',
      name: 'Solar Energy',
      description: 'Renewable energy solutions and solar technology'
    },
    mentions: extractMentions(post.content, post.tags),
    speakable: {
      '@type': 'SpeakableSpecification',
      xpath: [
        '/html/head/title',
        '/html/head/meta[@name="description"]/@content'
      ]
    }
  };

  // Add organization structured data
  const organizationData = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    '@id': 'https://autosynsunergy.com/#organization',
    name: 'AutoSys Sunergy',
    url: 'https://autosynsunergy.com',
    logo: 'https://autosynsunergy.com/Autosys_sunergy_logo.jpg',
    description: 'Leading provider of solar energy solutions in Madhya Pradesh, India',
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'Your Street Address',
      addressLocality: 'Indore',
      addressRegion: 'Madhya Pradesh',
      postalCode: 'Your Postal Code',
      addressCountry: 'IN'
    },
    contactPoint: {
      '@type': 'ContactPoint',
      telephone: '+91-your-phone-number',
      contactType: 'Customer Service',
      availableLanguage: ['English', 'Hindi']
    },
    sameAs: [
      'https://www.facebook.com/autosynsunergy',
      'https://www.linkedin.com/company/autosynsunergy',
      'https://twitter.com/autosynsunergy',
      'https://www.instagram.com/autosynsunergy'
    ]
  };

  // Generate breadcrumb structured data
  const breadcrumbStructuredData = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Home',
        item: 'https://autosynsunergy.com'
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: 'Blog',
        item: 'https://autosynsunergy.com/blog'
      },
      {
        '@type': 'ListItem',
        position: 3,
        name: post.category.name,
        item: `https://autosynsunergy.com/blog?category=${post.category.slug.current}`
      },
      {
        '@type': 'ListItem',
        position: 4,
        name: post.title,
        item: url
      }
    ]
  };

  // Calculate reading time
  const wordCount = estimateWordCount(post.content);
  const readingTime = Math.ceil(wordCount / 200); // Average reading speed: 200 words per minute

  return (
    <Head>
      {/* Basic Meta Tags */}
      <title>{post.metaTitle || post.title}</title>
      <meta name="description" content={post.metaDescription || post.excerpt} />
      <meta name="keywords" content={post.tags.join(', ')} />
      <meta name="author" content={post.author.name} />
      <link rel="canonical" href={url} />
      
      {/* Open Graph / Facebook */}
      <meta property="og:type" content="article" />
      <meta property="og:title" content={post.metaTitle || post.title} />
      <meta property="og:description" content={post.metaDescription || post.excerpt} />
      <meta property="og:image" content={getImageUrl(1200, 630)} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:image:alt" content={post.coverImage.alt || post.title} />
      <meta property="og:url" content={url} />
      <meta property="og:site_name" content="AutoSys Sunergy" />
      <meta property="og:locale" content="en_IN" />
      <meta property="article:published_time" content={new Date(post.publishDate).toISOString()} />
      <meta property="article:modified_time" content={new Date(post.lastModified || post.publishDate).toISOString()} />
      <meta property="article:author" content={post.author.name} />
      <meta property="article:section" content={post.category.name} />
      {post.tags.map((tag, index) => (
        <meta key={index} property="article:tag" content={tag} />
      ))}

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={post.metaTitle || post.title} />
      <meta name="twitter:description" content={post.metaDescription || post.excerpt} />
      <meta name="twitter:image" content={getImageUrl(1200, 630)} />
      <meta name="twitter:image:alt" content={post.coverImage.alt || post.title} />
      <meta name="twitter:creator" content="@AutoSysSunergy" />
      <meta name="twitter:site" content="@AutoSysSunergy" />

      {/* Additional Meta Tags */}
      <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" />
      <meta name="googlebot" content="index, follow" />
      <meta name="bingbot" content="index, follow" />
      
      {/* Advanced SEO Meta Tags */}
      <meta name="theme-color" content="#3B82F6" />
      <meta name="msapplication-TileColor" content="#3B82F6" />
      <meta name="apple-mobile-web-app-capable" content="yes" />
      <meta name="apple-mobile-web-app-status-bar-style" content="default" />
      <meta name="format-detection" content="telephone=no" />
      
      {/* Content Quality Indicators */}
      <meta name="news_keywords" content={post.tags.join(', ')} />
      <meta name="article:opinion" content="false" />
      <meta name="article:content_tier" content="free" />
      
      {/* Language and Region */}
      <meta httpEquiv="content-language" content="en-IN" />
      <meta name="geo.region" content="IN-MP" />
      <meta name="geo.placename" content="Indore, Madhya Pradesh" />
      <meta name="geo.position" content="22.7196;75.8577" />
      <meta name="ICBM" content="22.7196, 75.8577" />

      {/* Reading Time */}
      <meta name="twitter:label1" content="Reading time" />
      <meta name="twitter:data1" content={`${readingTime} min read`} />
      
      {/* Category */}
      <meta name="twitter:label2" content="Category" />
      <meta name="twitter:data2" content={post.category.name} />

      {/* Favicon and App Icons */}
      <link rel="icon" href="/favicon.ico" />
      <link rel="apple-touch-icon" href="/Autosys_sunergy_logo.jpg" />

      {/* Preconnect to external domains */}
      <link rel="preconnect" href="https://cdn.sanity.io" />
      <link rel="dns-prefetch" href="https://cdn.sanity.io" />

      {/* JSON-LD Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(structuredData)
        }}
      />
      
      {/* Organization Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(organizationData)
        }}
      />
      
      {/* Breadcrumb Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(breadcrumbStructuredData)
        }}
      />
    </Head>
  );
};

// Helper function to estimate word count from Sanity content
function estimateWordCount(content: Record<string, unknown>[]): number {
  let wordCount = 0;
  
  if (!Array.isArray(content)) return 0;
  
  content.forEach((block) => {
    if (block._type === 'block' && block.children && Array.isArray(block.children)) {
      block.children.forEach((child: Record<string, unknown>) => {
        if (child.text && typeof child.text === 'string') {
          wordCount += child.text.split(/\s+/).filter((word: string) => word.length > 0).length;
        }
      });
    }
  });
  
  return wordCount;
}

// Helper function to extract text content from Sanity portable text
function extractTextFromContent(content: Record<string, unknown>[]): string {
  if (!Array.isArray(content)) return '';
  
  let text = '';
  content.forEach((block) => {
    if (block._type === 'block' && block.children && Array.isArray(block.children)) {
      block.children.forEach((child: Record<string, unknown>) => {
        if (child.text && typeof child.text === 'string') {
          text += child.text + ' ';
        }
      });
    }
  });
  
  return text.trim().slice(0, 5000); // Limit for structured data
}

// Helper function to extract mentions from content and tags
function extractMentions(content: Record<string, unknown>[], tags: string[]): Record<string, unknown>[] {
  const mentions: Record<string, unknown>[] = [];
  
  // Add common solar industry entities
  const solarEntities = [
    { '@type': 'Thing', name: 'Solar Panel', sameAs: 'https://en.wikipedia.org/wiki/Solar_panel' },
    { '@type': 'Thing', name: 'Photovoltaic', sameAs: 'https://en.wikipedia.org/wiki/Photovoltaics' },
    { '@type': 'Thing', name: 'Renewable Energy', sameAs: 'https://en.wikipedia.org/wiki/Renewable_energy' },
    { '@type': 'Place', name: 'Madhya Pradesh', sameAs: 'https://en.wikipedia.org/wiki/Madhya_Pradesh' },
    { '@type': 'Place', name: 'Indore', sameAs: 'https://en.wikipedia.org/wiki/Indore' }
  ];
  
  // Add relevant entities based on tags
  tags.forEach(tag => {
    const tagLower = tag.toLowerCase();
    if (tagLower.includes('solar') || tagLower.includes('energy') || tagLower.includes('panel')) {
      mentions.push({
        '@type': 'Thing',
        name: tag,
        description: `Information about ${tag} in solar energy context`
      });
    }
  });
  
  return [...mentions, ...solarEntities];
}

export default BlogSEO;
