import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { client } from '@/lib/sanity';
import { singleBlogPostQuery } from '@/lib/sanity';
import { BlogPost } from '@/types/blog';
import BlogPostContent from './BlogPostContent';

interface BlogPostPageProps {
  params: Promise<{
    slug: string;
  }>;
}

// Fetch blog post data with ISR
async function getBlogPost(slug: string): Promise<BlogPost | null> {
  try {
    const post = await client.fetch<BlogPost | null>(singleBlogPostQuery, { slug });
    return post;
  } catch (error) {
    console.error('Error fetching blog post:', error);
    return null;
  }
}

// Generate metadata for SEO
export async function generateMetadata({ params }: BlogPostPageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = await getBlogPost(slug);
  
  if (!post) {
    return {
      title: 'Blog Post Not Found | AutoSys Sunergy',
      description: 'The requested blog post was not found.'
    };
  }

  const authorName = typeof post.author === 'string' ? post.author : post.author.name;
  
  return {
    title: post.metaTitle || post.title,
    description: post.metaDescription || post.excerpt,
    keywords: post.tags,
    authors: [{ name: authorName }],
    openGraph: {
      type: 'article',
      title: post.metaTitle || post.title,
      description: post.metaDescription || post.excerpt,
      images: [
        {
          url: `https://autosynsunergy.com${post.coverImage}`,
          width: 1200,
          height: 630,
          alt: (post.coverImage as { alt?: string })?.alt || post.title,
        }
      ],
      url: `https://autosynsunergy.com/blog/${post.slug.current}`,
      siteName: 'AutoSys Sunergy',
      authors: [authorName],
      publishedTime: post.publishDate,
      modifiedTime: post.lastModified || post.publishDate,
      section: post.category?.name,
      tags: post.tags,
    },
    twitter: {
      card: 'summary_large_image',
      title: post.metaTitle || post.title,
      description: post.metaDescription || post.excerpt,
      images: [`https://autosynsunergy.com${post.coverImage}`],
    },
    alternates: {
      canonical: `https://autosynsunergy.com/blog/${post.slug.current}`,
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
}

// Generate static params for static generation
export async function generateStaticParams() {
  try {
    const posts = await client.fetch<{ slug: { current: string } }[]>(`
      *[_type == "post" && !(_id in path("drafts.**"))] {
        slug
      }
    `);
    
    return posts.map((post: { slug: { current: string } }) => ({
      slug: post.slug.current,
    }));
  } catch (error) {
    console.error('Error generating static params:', error);
    return [];
  }
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params;
  const post = await getBlogPost(slug);

  if (!post) {
    notFound();
  }

  return <BlogPostContent post={post} />;
}
