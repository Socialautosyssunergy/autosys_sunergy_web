import { Metadata } from 'next';
import { client } from '@/lib/sanity';
import { blogPostsQuery, featuredBlogPostsQuery, categoriesQuery } from '@/lib/sanity';
import { BlogPost, Category } from '@/types/blog';
import BlogListingContent from './BlogListingContent';

// Generate metadata for SEO
export const metadata: Metadata = {
  title: 'Solar Energy Blog | Latest News & Insights | AutoSys Sunergy',
  description: 'Stay updated with the latest solar energy trends, technologies, and insights. Expert articles on solar installation, maintenance, government policies, and ROI analysis.',
  keywords: [
    'solar energy blog',
    'renewable energy news',
    'solar installation guides',
    'solar maintenance tips',
    'government solar policies',
    'solar ROI analysis',
    'AutoSys Sunergy',
    'solar technology updates'
  ],
  authors: [{ name: 'AutoSys Sunergy Team' }],
  openGraph: {
    type: 'website',
    title: 'Solar Energy Blog | Latest News & Insights | AutoSys Sunergy',
    description: 'Expert insights on solar energy, installation guides, maintenance tips, and industry updates from AutoSys Sunergy.',
    images: [
      {
        url: 'https://autosynsunergy.com/solar_services_sample_image.jpg',
        width: 1200,
        height: 630,
        alt: 'AutoSys Sunergy Solar Blog - Latest Solar Energy Insights',
      }
    ],
    url: 'https://autosynsunergy.com/blog',
    siteName: 'AutoSys Sunergy',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Solar Energy Blog | AutoSys Sunergy',
    description: 'Expert insights on solar energy, installation guides, and industry updates.',
    images: ['https://autosynsunergy.com/solar_services_sample_image.jpg'],
  },
  alternates: {
    canonical: 'https://autosynsunergy.com/blog',
  },
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
};

// Fetch data with ISR (Incremental Static Regeneration)
async function getBlogData() {
  try {
    // Fetch all blog posts
    const posts: BlogPost[] = await client.fetch(blogPostsQuery);
    
    // Fetch featured posts
    const featuredPosts: BlogPost[] = await client.fetch(featuredBlogPostsQuery);
    
    // Fetch categories
    const categories: Category[] = await client.fetch(categoriesQuery);

    return {
      posts,
      featuredPosts,
      categories
    };
  } catch (error) {
    console.error('Error fetching blog data:', error);
    return {
      posts: [],
      featuredPosts: [],
      categories: []
    };
  }
}

export default async function BlogPage() {
  const { posts, featuredPosts, categories } = await getBlogData();

  // Generate structured data for the blog listing page
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'Blog',
    name: 'AutoSys Sunergy Solar Energy Blog',
    description: 'Expert insights on solar energy, installation guides, maintenance tips, and industry updates.',
    url: 'https://autosynsunergy.com/blog',
    publisher: {
      '@type': 'Organization',
      name: 'AutoSys Sunergy',
      url: 'https://autosynsunergy.com',
      logo: {
        '@type': 'ImageObject',
        url: 'https://autosynsunergy.com/Autosys_sunergy_logo.jpg'
      }
    },
    mainEntity: {
      '@type': 'ItemList',
      itemListElement: posts.slice(0, 10).map((post, index) => ({
        '@type': 'BlogPosting',
        position: index + 1,
        headline: post.title,
        description: post.excerpt,
        url: `https://autosynsunergy.com/blog/${post.slug.current}`,
        datePublished: post.publishDate,
        author: {
          '@type': 'Person',
          name: typeof post.author === 'string' ? post.author : post.author?.name || 'AutoSys Sunergy Team'
        }
      }))
    }
  };

  return (
    <>
      {/* JSON-LD Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(structuredData)
        }}
      />
      
      <BlogListingContent
        posts={posts}
        featuredPosts={featuredPosts}
        categories={categories}
      />
    </>
  );
}
