import { ContentBlockType, ReadingTimeResult } from '@/types/blog';

// Calculate reading time for blog post content
export const calculateReadingTime = (content: ContentBlockType[]): ReadingTimeResult => {
  const wordsPerMinute = 200; // Average reading speed
  
  // Extract text from all content blocks
  const textContent = content.map(block => {
    if (block._type === 'block' && 'children' in block) {
      return block.children?.map(child => child.text).join(' ') || '';
    } else if (block._type === 'code' && 'code' in block) {
      // Code blocks take longer to read
      return block.code;
    } else if (block._type === 'blockquote' && 'quote' in block) {
      return block.quote;
    }
    return '';
  }).join(' ');
  
  const words = textContent.trim().split(/\s+/).length;
  const minutes = Math.ceil(words / wordsPerMinute);
  
  return {
    text: `${minutes} min read`,
    minutes,
    time: minutes * 60 * 1000, // in milliseconds
    words
  };
};

// Extract plain text from Sanity content blocks
export const extractTextFromBlocks = (blocks: ContentBlockType[]): string => {
  return blocks.map(block => {
    if (block._type === 'block' && 'children' in block) {
      return block.children?.map(child => child.text).join(' ') || '';
    } else if (block._type === 'code' && 'code' in block) {
      return block.code;
    } else if (block._type === 'blockquote' && 'quote' in block) {
      return block.quote;
    }
    return '';
  }).join('\n');
};

// Generate excerpt from content blocks
export const generateExcerpt = (content: ContentBlockType[], maxLength: number = 160): string => {
  const text = extractTextFromBlocks(content);
  if (text.length <= maxLength) return text;
  
  return text.slice(0, maxLength).replace(/\s+\S*$/, '') + '...';
};

// Format date for display
export const formatDate = (dateString: string, options?: Intl.DateTimeFormatOptions): string => {
  const date = new Date(dateString);
  const defaultOptions: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  };
  
  return date.toLocaleDateString('en-US', { ...defaultOptions, ...options });
};

// Format relative time (e.g., "2 days ago")
export const formatRelativeTime = (dateString: string): string => {
  const date = new Date(dateString);
  const now = new Date();
  const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);
  
  const intervals = [
    { label: 'year', seconds: 31536000 },
    { label: 'month', seconds: 2592000 },
    { label: 'week', seconds: 604800 },
    { label: 'day', seconds: 86400 },
    { label: 'hour', seconds: 3600 },
    { label: 'minute', seconds: 60 }
  ];
  
  for (const interval of intervals) {
    const count = Math.floor(diffInSeconds / interval.seconds);
    if (count >= 1) {
      return `${count} ${interval.label}${count > 1 ? 's' : ''} ago`;
    }
  }
  
  return 'Just now';
};

// Generate blog post URL
export const getBlogPostUrl = (slug: string): string => {
  return `/blog/${slug}`;
};

// Generate category URL
export const getCategoryUrl = (slug: string): string => {
  return `/blog/category/${slug}`;
};

// Generate author URL
export const getAuthorUrl = (slug: string): string => {
  return `/blog/author/${slug}`;
};

// Generate tag URL
export const getTagUrl = (tag: string): string => {
  const tagSlug = tag.toLowerCase().replace(/\s+/g, '-');
  return `/blog/tag/${tagSlug}`;
};

// Generate social share URLs
export const getSocialShareUrls = (url: string, title: string, description?: string) => {
  const encodedUrl = encodeURIComponent(url);
  const encodedTitle = encodeURIComponent(title);
  const encodedDescription = encodeURIComponent(description || title);
  
  return {
    twitter: `https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedTitle}`,
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`,
    linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}&title=${encodedTitle}&summary=${encodedDescription}`,
    whatsapp: `https://wa.me/?text=${encodedTitle}%20${encodedUrl}`,
    telegram: `https://t.me/share/url?url=${encodedUrl}&text=${encodedTitle}`,
    email: `mailto:?subject=${encodedTitle}&body=${encodedDescription}%0A%0A${encodedUrl}`
  };
};

// Validate blog post data
export const validateBlogPost = (post: Record<string, unknown>): boolean => {
  // Narrow the slug type before accessing `.current`
  const slugCurrent = (post.slug as { current?: unknown } | undefined)?.current;

  return !!(
    post._id &&
    post.title &&
    typeof slugCurrent === 'string' &&
    post.content &&
    post.publishDate &&
    post.author
  );
};

// Sort blog posts by date
export const sortPostsByDate = <T extends { publishDate: string }>(
  posts: T[], 
  order: 'asc' | 'desc' = 'desc'
): T[] => {
  return [...posts].sort((a, b) => {
    const dateA = new Date(a.publishDate).getTime();
    const dateB = new Date(b.publishDate).getTime();
    return order === 'desc' ? dateB - dateA : dateA - dateB;
  });
};

// Filter posts by category
export const filterPostsByCategory = <T extends { category?: { slug: { current: string } } }>(
  posts: T[],
  categorySlug: string
): T[] => {
  return posts.filter(post => post.category?.slug.current === categorySlug);
};

// Filter posts by tag
export const filterPostsByTag = <T extends { tags?: string[] }>(
  posts: T[],
  tag: string
): T[] => {
  return posts.filter(post => 
    post.tags?.some(postTag => 
      postTag.toLowerCase() === tag.toLowerCase()
    )
  );
};

// Search posts by title and content
export const searchPosts = <T extends { title: string; excerpt?: string }>(
  posts: T[],
  query: string
): T[] => {
  const searchTerm = query.toLowerCase();
  return posts.filter(post => 
    post.title.toLowerCase().includes(searchTerm) ||
    post.excerpt?.toLowerCase().includes(searchTerm)
  );
};

// Get unique tags from posts
export const getUniqueTags = <T extends { tags?: string[] }>(posts: T[]): string[] => {
  const allTags = posts.flatMap(post => post.tags || []);
  return [...new Set(allTags)].sort();
};

// Paginate posts
export const paginatePosts = <T>(
  posts: T[], 
  page: number, 
  pageSize: number = 10
) => {
  const startIndex = (page - 1) * pageSize;
  const endIndex = startIndex + pageSize;
  const paginatedPosts = posts.slice(startIndex, endIndex);
  
  return {
    posts: paginatedPosts,
    currentPage: page,
    totalPages: Math.ceil(posts.length / pageSize),
    totalPosts: posts.length,
    hasNextPage: endIndex < posts.length,
    hasPrevPage: page > 1
  };
};
