'use client';

import { useState } from 'react';
import Link from 'next/link';
import { BlogPost } from '@/types/blog';
import OptimizedImage from './OptimizedImage';
import { useTheme } from '@/contexts/ThemeContext';

interface BlogCardProps {
  post: BlogPost;
  featured?: boolean;
  mobile?: boolean;
  className?: string;
  index?: number;
}

const BlogCard: React.FC<BlogCardProps> = ({ 
  post, 
  featured = false, 
  mobile = false,
  className = '',
  index = 0
}) => {
  const { isDay } = useTheme();
  const [isHovered, setIsHovered] = useState(false);

  // Format date
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  // Calculate reading time from excerpt length
  const calculateReadingTime = (text?: string) => {
    if (!text) return '1 min read';
    const wordsPerMinute = 200;
    const words = text.split(' ').length;
    const readingTime = Math.ceil(words / wordsPerMinute);
    return `${readingTime} min read`;
  };

  // Mobile horizontal card layout
  if (mobile) {
    return (
      <Link 
        href={`/blog/${post.slug.current}`}
        className={`group flex gap-4 p-4 rounded-2xl transition-all duration-500 transform hover:scale-[1.02] hover:-translate-y-1 cursor-pointer ${
          isDay
            ? 'bg-white/80 border border-slate-200/50 shadow-lg hover:shadow-xl hover:shadow-blue-500/10'
            : 'bg-slate-800/80 border border-slate-700/50 shadow-xl hover:shadow-blue-500/20'
        } backdrop-blur-xl ${className}`}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        style={{ 
          animation: `fadeInUp 0.6s ease-out ${index * 0.1}s both`
        }}
      >
        {/* Image */}
        <div className="flex-shrink-0">
            {post.coverImage && (
              <OptimizedImage
                image={post.coverImage}
                alt={post.title}
                aspectRatio="1:1"
                width={120}
                className="rounded-xl overflow-hidden"
                quality={85}
                sizes="120px"
              />
            )}
          </div>

          {/* Content */}
          <div className="flex-1 min-w-0">
            {/* Category */}
            {post.category && (
              <div className={`inline-block px-2 py-1 rounded-lg text-xs font-bold mb-2 ${
                isDay ? 'bg-blue-100 text-blue-700' : 'bg-blue-900/50 text-blue-300'
              }`}>
                {post.category.name}
              </div>
            )}

            {/* Title */}
            <h3 className={`font-bold mb-2 leading-tight line-clamp-2 transition-colors duration-300 ${
              isDay ? 'text-slate-800' : 'text-white'
            } group-hover:text-blue-600 dark:group-hover:text-blue-400 text-sm sm:text-base`}>
              {post.title}
            </h3>

            {/* Excerpt */}
            <p className={`text-sm mb-3 leading-relaxed line-clamp-2 ${
              isDay ? 'text-slate-600' : 'text-slate-300'
            }`}>
              {post.excerpt}
            </p>

            {/* Meta */}
            <div className="flex items-center justify-between text-xs">
              <span className={isDay ? 'text-slate-500' : 'text-slate-400'}>
                {formatDate(post.publishDate)}
              </span>
              <span className={isDay ? 'text-slate-500' : 'text-slate-400'}>
                {calculateReadingTime(post.excerpt)}
              </span>
            </div>
          </div>
      </Link>
    );
  }

  // Desktop card layout
  return (
    <Link 
      href={`/blog/${post.slug.current}`}
      className={`group relative rounded-3xl overflow-hidden transition-all duration-700 transform hover:scale-105 hover:-translate-y-2 cursor-pointer ${
        isDay
          ? 'bg-white border-2 border-slate-200/50 shadow-xl hover:shadow-2xl hover:shadow-blue-500/10'
          : 'bg-slate-800 border-2 border-slate-700/50 shadow-2xl hover:shadow-blue-500/20'
      } backdrop-blur-xl ${className}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{ 
        animation: `fadeInUp 0.8s ease-out ${index * 0.2}s both`
      }}
    >
        {/* Featured Badge */}
        {featured && (
          <div className={`absolute top-4 left-4 z-10 px-3 py-1 rounded-xl text-xs font-bold ${
            isDay 
              ? 'bg-gradient-to-r from-blue-500 to-blue-600 text-white' 
              : 'bg-gradient-to-r from-blue-400 to-blue-500 text-slate-900'
          } shadow-lg`}>
            FEATURED
          </div>
        )}

        {/* Cover Image */}
        <div className="relative overflow-hidden">
          {post.coverImage && (
            <OptimizedImage
              image={post.coverImage}
              alt={post.title}
              aspectRatio="4:5"
              width={400}
              className="w-full transform group-hover:scale-110 transition-transform duration-700"
              quality={85}
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
          )}
          
          {/* Gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          
          {/* Category badge */}
          {post.category && (
            <div className={`absolute bottom-4 right-4 px-3 py-1 rounded-xl text-xs font-bold transition-all duration-300 ${
              isDay 
                ? 'bg-blue-500 text-white' 
                : 'bg-blue-400 text-slate-900'
            } backdrop-blur-sm ${isHovered ? 'scale-105' : 'scale-100'}`}>
              {post.category.name}
            </div>
          )}
        </div>

        {/* Content */}
        <div className="p-6">
          {/* Title */}
          <h3 className={`text-xl font-bold mb-3 leading-tight transition-colors duration-500 line-clamp-2 ${
            isDay ? 'text-slate-800' : 'text-white'
          } group-hover:text-blue-600 dark:group-hover:text-blue-400`}>
            {post.title}
          </h3>
          
          {/* Excerpt */}
          <p className={`text-sm mb-4 leading-relaxed transition-colors duration-500 line-clamp-3 ${
            isDay ? 'text-slate-600' : 'text-slate-300'
          }`}>
            {post.excerpt}
          </p>

          {/* Author & Meta */}
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
                isDay ? 'bg-blue-100 text-blue-700' : 'bg-blue-900/50 text-blue-300'
              }`}>
                {(typeof post.author === 'string' ? post.author : post.author?.name || 'A')?.charAt(0)}
              </div>
              <div>
                <p className={`text-sm font-medium ${
                  isDay ? 'text-slate-800' : 'text-white'
                }`}>
                  {typeof post.author === 'string' ? post.author : post.author?.name || 'AutoSys Sunergy Team'}
                </p>
                <p className={`text-xs ${
                  isDay ? 'text-slate-500' : 'text-slate-400'
                }`}>
                  {typeof post.author === 'string' ? 'Solar Expert' : post.author?.role || 'Solar Expert'}
                </p>
              </div>
            </div>
            <div className="text-right">
              <p className={`text-xs ${
                isDay ? 'text-slate-500' : 'text-slate-400'
              }`}>
                {formatDate(post.publishDate)}
              </p>
              <p className={`text-xs ${
                isDay ? 'text-slate-500' : 'text-slate-400'
              }`}>
                {calculateReadingTime(post.excerpt)}
              </p>
            </div>
          </div>

          {/* Tags */}
          {post.tags && post.tags.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {post.tags.slice(0, 3).map((tag, tagIndex) => (
                <span 
                  key={tagIndex}
                  className={`px-2 py-1 rounded-lg text-xs font-medium transition-colors duration-300 ${
                    isDay 
                      ? 'bg-blue-100 text-blue-700 hover:bg-blue-200' 
                      : 'bg-blue-900/50 text-blue-300 hover:bg-blue-800/50'
                  }`}
                >
                  #{tag}
                </span>
              ))}
              {post.tags.length > 3 && (
                <span className={`px-2 py-1 rounded-lg text-xs font-medium ${
                  isDay ? 'text-slate-500' : 'text-slate-400'
                }`}>
                  +{post.tags.length - 3} more
                </span>
              )}
            </div>
          )}

          {/* Read more indicator */}
          <div className={`mt-4 flex items-center text-sm font-medium transition-all duration-300 ${
            isDay ? 'text-blue-600' : 'text-blue-400'
          } group-hover:translate-x-2`}>
            Read More 
            <svg 
              className="ml-2 w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </div>
        </div>

        {/* Hover effect border */}
        <div className={`absolute inset-0 rounded-3xl border-2 border-transparent transition-all duration-500 ${
          isHovered 
            ? isDay 
              ? 'border-blue-300/50 shadow-[0_0_30px_rgba(59,130,246,0.3)]' 
              : 'border-blue-500/30 shadow-[0_0_30px_rgba(59,130,246,0.2)]'
            : ''
        }`} />
    </Link>
  );
};

// CSS for line clamping
const lineClampStyles = `
  .line-clamp-2 {
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }
  
  .line-clamp-3 {
    display: -webkit-box;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }

  @keyframes fadeInUp {
    from {
      opacity: 0;
      transform: translateY(30px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
`;

export default BlogCard;

// Add global styles
if (typeof document !== 'undefined') {
  const styleSheet = document.createElement('style');
  styleSheet.textContent = lineClampStyles;
  document.head.appendChild(styleSheet);
}
