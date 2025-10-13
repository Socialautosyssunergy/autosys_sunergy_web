'use client';

import { useState, useEffect } from 'react';
import { useTheme } from '@/contexts/ThemeContext';
import Header from '@/components/home/Header';
import Footer from '@/components/home/Footer';
import Link from 'next/link';
import { BlogPost, ContentChild } from '@/types/blog';
import OptimizedImage from '@/components/blog/OptimizedImage';
import RichText from '@/components/blog/RichText';

interface BlogPostContentProps {
  post: BlogPost;
}

export default function BlogPostContent({ post }: BlogPostContentProps) {
  const { isDay } = useTheme();
  const [isScrolled, setIsScrolled] = useState(false);
  const [readingProgress, setReadingProgress] = useState(0);
  const [estimatedReadTime, setEstimatedReadTime] = useState(0);
  const [isSharing, setIsSharing] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrolled = window.scrollY > 100;
      setIsScrolled(scrolled);

      // Calculate reading progress
      const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
      const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      const scrolled_percentage = (winScroll / height) * 100;
      setReadingProgress(scrolled_percentage);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (post && post.content) {
      // Calculate estimated read time based on content length
      let wordCount = 0;
      if (Array.isArray(post.content)) {
        post.content.forEach((block) => {
          if (block._type === 'block' && block.children && Array.isArray(block.children)) {
            block.children.forEach((child: ContentChild) => {
              if (child.text && typeof child.text === 'string') {
                wordCount += child.text.split(/\s+/).filter((word: string) => word.length > 0).length;
              }
            });
          }
        });
      }
      const readTime = Math.ceil(wordCount / 200); // Average reading speed
      setEstimatedReadTime(readTime);
    }
  }, [post]);

  // Get related posts data
  const relatedPosts = post.relatedPosts || [];

  // Share functionality
  const sharePost = async (platform: string) => {
    setIsSharing(true);
    const url = `https://autosynsunergy.com/blog/${post.slug.current}`;
    const text = `${post.title} - ${post.excerpt}`;

    try {
      switch (platform) {
        case 'twitter':
          window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`, '_blank');
          break;
        case 'facebook':
          window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`, '_blank');
          break;
        case 'linkedin':
          window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`, '_blank');
          break;
        case 'whatsapp':
          window.open(`https://wa.me/?text=${encodeURIComponent(text + ' ' + url)}`, '_blank');
          break;
        case 'copy':
          await navigator.clipboard.writeText(url);
          alert('Link copied to clipboard!');
          break;
      }
    } catch (error) {
      console.error('Sharing failed:', error);
    } finally {
      setTimeout(() => setIsSharing(false), 1000);
    }
  };

  return (
    <div className={`min-h-screen transition-all duration-500 ${
      isDay ? 'bg-white' : 'bg-slate-900'
    }`}>
      <Header isScrolled={isScrolled} />

      {/* Reading Progress Bar */}
      <div className="fixed top-0 left-0 w-full h-1 z-50">
        <div 
          className={`h-full transition-all duration-300 ${
            isDay 
              ? 'bg-gradient-to-r from-blue-500 to-purple-500' 
              : 'bg-gradient-to-r from-blue-400 to-purple-400'
          }`}
          style={{ width: `${readingProgress}%` }}
        />
      </div>

      {/* Hero Section */}
      <article className={`pt-32 pb-16 relative overflow-hidden transition-all duration-500 ${
        isDay ? 'bg-gradient-to-br from-slate-50 via-blue-50/30 to-purple-50/20' : 'bg-gradient-to-br from-slate-900 via-blue-900/30 to-purple-900/20'
      }`}>
        {/* Enhanced Background Effects */}
        <div className="absolute inset-0">
          <div className={`absolute inset-0 ${
            isDay 
              ? 'bg-[radial-gradient(circle_at_30%_20%,_#3b82f620,transparent_70%)]'
              : 'bg-[radial-gradient(circle_at_30%_20%,_#3b82f635,transparent_70%)]'
          }`} />
          <div className={`absolute inset-0 ${
            isDay 
              ? 'bg-[radial-gradient(circle_at_70%_80%,_#8b5cf615,transparent_60%)]'
              : 'bg-[radial-gradient(circle_at_70%_80%,_#8b5cf625,transparent_60%)]'
          }`} />
          {/* Subtle Pattern Overlay */}
          <div className={`absolute inset-0 opacity-10 ${
            isDay ? 'bg-[url("data:image/svg+xml,%3Csvg width="20" height="20" xmlns="http://www.w3.org/2000/svg"%3E%3Cdefs%3E%3Cpattern id="grid" width="20" height="20" patternUnits="userSpaceOnUse"%3E%3Cpath d="M 20 0 L 0 0 0 20" fill="none" stroke="%23000" stroke-width="0.5"/%3E%3C/pattern%3E%3C/defs%3E%3Crect width="100%25" height="100%25" fill="url(%23grid)" /%3E%3C/svg%3E")]' : 'bg-[url("data:image/svg+xml,%3Csvg width="20" height="20" xmlns="http://www.w3.org/2000/svg"%3E%3Cdefs%3E%3Cpattern id="grid" width="20" height="20" patternUnits="userSpaceOnUse"%3E%3Cpath d="M 20 0 L 0 0 0 20" fill="none" stroke="%23fff" stroke-width="0.5"/%3E%3C/pattern%3E%3C/defs%3E%3Crect width="100%25" height="100%25" fill="url(%23grid)" /%3E%3C/svg%3E")]'
          }`} />
        </div>

        <div className="relative w-full max-w-7xl mx-auto px-8">
          {/* Breadcrumb */}
            <nav className="mb-8" aria-label="Breadcrumb">
              <div className={`flex items-center space-x-2 text-sm ${
                isDay ? 'text-slate-600' : 'text-slate-300'
              }`}>
                <Link href="/" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">Home</Link>
                <span className="opacity-50">›</span>
                <Link href="/blog" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">Blog</Link>
                <span className="opacity-50">›</span>
                <span className={`font-medium ${isDay ? 'text-slate-800' : 'text-white'}`}>{post.category?.name}</span>
              </div>
            </nav>          {/* Main Content Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            {/* Content Column */}
            <div className="lg:col-span-7 xl:col-span-8">
              {/* Category Badge */}
              <div className="mb-6">
                <span className={`inline-flex items-center px-6 py-3 rounded-2xl text-sm font-bold shadow-lg transition-all duration-300 ${
                  isDay 
                    ? 'bg-gradient-to-r from-blue-500 to-blue-600 text-white shadow-blue-500/25' 
                    : 'bg-gradient-to-r from-blue-400 to-blue-500 text-slate-900 shadow-blue-400/25'
                } hover:scale-105 transform`}>
                  <span className="mr-2">📂</span>
                  {post.category?.name}
                </span>
              </div>

              {/* Title */}
              <h1 className={`text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-black mb-6 transition-colors duration-500 ${
                isDay ? 'text-slate-800' : 'text-white'
              } leading-[1.1] tracking-tight`}>
                {post.title}
              </h1>

              {/* Excerpt */}
              <p className={`text-lg md:text-xl lg:text-2xl mb-8 transition-colors duration-500 ${
                isDay ? 'text-slate-600' : 'text-slate-300'
              } leading-relaxed font-light`}>
                {post.excerpt}
              </p>

              {/* Quick Info */}
              {/* Removed author, date, and reading time info below the blog title and description as requested */}
            </div>

            {/* Image Column */}
            <div className="lg:col-span-5 xl:col-span-4">
              <div className={`sticky top-32 rounded-3xl overflow-hidden shadow-2xl transition-all duration-500 group ${
                isDay 
                  ? 'shadow-slate-200/50 hover:shadow-xl hover:shadow-blue-500/20' 
                  : 'shadow-black/50 hover:shadow-2xl hover:shadow-blue-500/30'
              }`}>
                <div className="relative aspect-[4/5] overflow-hidden">
                  <OptimizedImage
                    image={post.coverImage!}
                    alt={(post.coverImage as { alt?: string })?.alt || post.title}
                    aspectRatio="4:5"
                    width={500}
                    className="w-full h-full transform group-hover:scale-105 transition-transform duration-700"
                    priority={true}
                    quality={95}
                  />
                  {/* Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent opacity-60" />
                  
                  {/* Floating Elements */}
                  <div className="absolute top-4 left-4">
                    <div className={`px-3 py-1 rounded-xl text-xs font-bold backdrop-blur-sm ${
                      isDay 
                        ? 'bg-white/90 text-slate-800' 
                        : 'bg-slate-900/90 text-white'
                    }`}>
                      Featured Article
                    </div>
                  </div>
                  
                  {/* Bottom Info */}
                  <div className="absolute bottom-4 left-4 right-4">
                    <div className="flex items-center justify-between text-white text-sm">
                      <div className="flex items-center space-x-4">
                        <span className="backdrop-blur-sm bg-black/30 px-2 py-1 rounded-lg">
                          📸 High Quality
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </article>

      {/* Article Content */}
      <section className={`py-20 transition-all duration-500 ${
        isDay ? 'bg-gradient-to-b from-white to-slate-50' : 'bg-gradient-to-b from-slate-900 to-slate-800'
      }`}>
        <div className="w-full max-w-5xl mx-auto px-8">
          {/* Content Container with Enhanced Design */}
          <div className={`relative p-8 md:p-12 rounded-3xl transition-all duration-500 ${
            isDay 
              ? 'bg-white/80 backdrop-blur-xl border border-slate-200/50 shadow-xl shadow-slate-200/20' 
              : 'bg-slate-800/80 backdrop-blur-xl border border-slate-700/50 shadow-2xl shadow-black/20'
          }`}>
            {/* Decorative Elements */}
            <div className="absolute top-0 left-8 w-16 h-1 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full" />
            
            <div className={`prose prose-lg xl:prose-xl max-w-none transition-colors duration-500 ${
              isDay 
                ? 'prose-slate prose-headings:text-slate-800 prose-p:text-slate-700 prose-strong:text-slate-800 prose-li:text-slate-700 prose-a:text-blue-600 hover:prose-a:text-blue-700' 
                : 'prose-invert prose-headings:text-white prose-p:text-slate-300 prose-strong:text-white prose-li:text-slate-300 prose-a:text-blue-400 hover:prose-a:text-blue-300'
            }`}>
              <RichText content={post.content} />
            </div>
          </div>

          {/* Article Metadata - Enhanced Design */}
          <div className={`mt-12 p-8 rounded-3xl border-2 transition-all duration-500 transform hover:scale-[1.02] ${
            isDay 
              ? 'bg-gradient-to-br from-blue-50 to-purple-50 border-blue-200/50 shadow-lg shadow-blue-500/5' 
              : 'bg-gradient-to-br from-blue-900/20 to-purple-900/20 border-blue-500/30 shadow-xl shadow-blue-500/10'
          }`}>
            {/* Enhanced Header */}
            <div className="flex items-center mb-6">
              <div className={`w-12 h-12 rounded-full flex items-center justify-center mr-4 ${
                isDay ? 'bg-blue-500 text-white' : 'bg-blue-400 text-slate-900'
              }`}>
                <span className="text-lg">📊</span>
              </div>
              <h3 className={`text-xl font-bold ${
                isDay ? 'text-slate-800' : 'text-white'
              }`}>
                Article Information
              </h3>
            </div>

            {/* Article Meta Information with Icons */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              <div className={`flex items-center p-4 rounded-2xl transition-all duration-300 ${
                isDay ? 'bg-white/70 hover:bg-white' : 'bg-slate-700/50 hover:bg-slate-700'
              }`}>
                <div className={`w-10 h-10 rounded-full flex items-center justify-center mr-3 ${
                  isDay ? 'bg-blue-100 text-blue-600' : 'bg-blue-900/50 text-blue-400'
                }`}>
                  <span className="text-sm">📅</span>
                </div>
                <div>
                  <div className={`text-xs font-medium ${
                    isDay ? 'text-slate-500' : 'text-slate-400'
                  }`}>
                    Published
                  </div>
                  <div className={`font-semibold ${
                    isDay ? 'text-slate-800' : 'text-white'
                  }`}>
                    {new Date(post.publishDate).toLocaleDateString('en-US', { 
                      year: 'numeric', 
                      month: 'long', 
                      day: 'numeric' 
                    })}
                  </div>
                </div>
              </div>
              
              <div className={`flex items-center p-4 rounded-2xl transition-all duration-300 ${
                isDay ? 'bg-white/70 hover:bg-white' : 'bg-slate-700/50 hover:bg-slate-700'
              }`}>
                <div className={`w-10 h-10 rounded-full flex items-center justify-center mr-3 ${
                  isDay ? 'bg-purple-100 text-purple-600' : 'bg-purple-900/50 text-purple-400'
                }`}>
                  <span className="text-sm">⏱️</span>
                </div>
                <div>
                  <div className={`text-xs font-medium ${
                    isDay ? 'text-slate-500' : 'text-slate-400'
                  }`}>
                    Reading Time
                  </div>
                  <div className={`font-semibold ${
                    isDay ? 'text-slate-800' : 'text-white'
                  }`}>
                    {`${estimatedReadTime} min read`}
                  </div>
                </div>
              </div>
            </div>

            {/* Enhanced Tags */}
            <div className="mb-8">
              <h4 className={`text-sm font-bold mb-4 ${
                isDay ? 'text-slate-600' : 'text-slate-300'
              }`}>
                Topics & Tags
              </h4>
              <div className="flex flex-wrap gap-3">
                {post.tags?.map((tag, index) => (
                  <span 
                    key={index}
                    className={`px-4 py-2 rounded-xl text-sm font-medium transition-all duration-300 hover:scale-105 cursor-pointer ${
                      isDay 
                        ? 'bg-gradient-to-r from-blue-100 to-purple-100 text-slate-700 hover:from-blue-200 hover:to-purple-200' 
                        : 'bg-gradient-to-r from-blue-900/50 to-purple-900/50 text-slate-200 hover:from-blue-800/50 hover:to-purple-800/50'
                    } shadow-sm hover:shadow-md`}
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            </div>

            {/* Enhanced Share Buttons */}
            <div>
              <h4 className={`text-sm font-bold mb-4 ${
                isDay ? 'text-slate-600' : 'text-slate-300'
              }`}>
                Share This Article
              </h4>
              <div className="flex flex-wrap gap-3">
                {[
                  { name: 'Twitter', icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" className="inline-block align-middle"><path d="M24 4.557a9.93 9.93 0 0 1-2.828.775 4.932 4.932 0 0 0 2.165-2.724c-.951.564-2.005.974-3.127 1.195a4.916 4.916 0 0 0-8.38 4.482C7.691 8.095 4.066 6.13 1.64 3.161c-.543.929-.855 2.006-.855 3.163 0 2.18 1.11 4.104 2.797 5.232a4.904 4.904 0 0 1-2.229-.616c-.054 2.281 1.581 4.415 3.949 4.89a4.936 4.936 0 0 1-2.224.084c.627 1.956 2.444 3.377 4.6 3.417A9.867 9.867 0 0 1 0 19.54a13.94 13.94 0 0 0 7.548 2.212c9.058 0 14.009-7.513 14.009-14.009 0-.213-.005-.425-.014-.636A10.025 10.025 0 0 0 24 4.557z"/></svg>, platform: 'twitter', color: 'from-blue-400 to-blue-500' },
                  { name: 'Facebook', icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" className="inline-block align-middle"><path d="M22.675 0h-21.35C.595 0 0 .592 0 1.326v21.348C0 23.408.595 24 1.326 24h11.495v-9.294H9.691v-3.622h3.13V8.413c0-3.1 1.893-4.788 4.659-4.788 1.325 0 2.463.099 2.797.143v3.24l-1.918.001c-1.504 0-1.797.715-1.797 1.763v2.313h3.587l-.467 3.622h-3.12V24h6.116C23.405 24 24 23.408 24 22.674V1.326C24 .592 23.405 0 22.675 0"/></svg>, platform: 'facebook', color: 'from-blue-600 to-blue-700' },
                  { name: 'LinkedIn', icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" className="inline-block align-middle"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.761 0 5-2.239 5-5v-14c0-2.761-2.239-5-5-5zm-11.75 20h-3v-10h3v10zm-1.5-11.268c-.966 0-1.75-.784-1.75-1.75s.784-1.75 1.75-1.75 1.75.784 1.75 1.75-.784 1.75-1.75 1.75zm13.25 11.268h-3v-5.604c0-1.337-.026-3.063-1.868-3.063-1.868 0-2.154 1.459-2.154 2.967v5.7h-3v-10h2.881v1.367h.041c.401-.761 1.379-1.563 2.838-1.563 3.036 0 3.6 2.001 3.6 4.601v5.595z"/></svg>, platform: 'linkedin', color: 'from-blue-500 to-blue-600' },
                  { name: 'WhatsApp', icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" className="inline-block align-middle"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.029-.967-.272-.099-.471-.149-.67.149-.198.297-.767.966-.941 1.164-.173.198-.347.223-.644.075-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.149-.669-1.611-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.372-.01-.571-.01-.198 0-.52.075-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.076 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.075-.124-.272-.198-.57-.347zM12.004 2c-5.514 0-9.997 4.483-9.997 9.997 0 1.762.463 3.479 1.341 4.991l-1.419 5.197 5.334-1.404c1.471.805 3.13 1.237 4.741 1.237 5.514 0 9.997-4.483 9.997-9.997s-4.483-9.997-9.997-9.997zm5.93 15.275c-.243.686-1.417 1.299-1.998 1.383-.506.075-1.145.108-1.849-.115-.423-.134-.968-.313-1.676-.617-2.976-1.282-4.918-4.281-5.064-4.479-.146-.198-1.213-1.611-1.213-3.073 0-1.462.768-2.181 1.04-2.479.272-.297.594-.372.792-.372.199 0 .398.002.571.01.182.01.427-.069.669.51.247.596.841 2.058.916 2.207.075.149.124.323.025.521-.1.199-.149.323-.3.495-.148.173-.312.387-.446.52-.148.148-.303.309-.13.606.173.298.77 1.271 1.653 2.059 1.135 1.013 2.093 1.326 2.39 1.475.297.148.471.123.644-.075.174-.198.743-.867.941-1.164.199-.298.398-.248.67-.149.271.1 1.732.818 2.029.967.297.149.495.223.57.347.075.124.075.719-.173 1.413z"/></svg>, platform: 'whatsapp', color: 'from-green-500 to-green-600' },
                  { name: 'Copy Link', icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" className="inline-block align-middle"><path d="M17 7a7 7 0 0 0-7 7v3a7 7 0 0 0 7 7h3a7 7 0 0 0 7-7v-3a7 7 0 0 0-7-7h-3zm0 2h3a5 5 0 0 1 5 5v3a5 5 0 0 1-5 5h-3a5 5 0 0 1-5-5v-3a5 5 0 0 1 5-5zm-10-2a5 5 0 0 1 5-5h3a5 5 0 0 1 5 5v3a5 5 0 0 1-5 5h-3a5 5 0 0 1-5-5v-3zm2 0v3a3 3 0 0 0 3 3h3a3 3 0 0 0 3-3v-3a3 3 0 0 0-3-3h-3a3 3 0 0 0-3 3z"/></svg>, platform: 'copy', color: 'from-slate-500 to-slate-600' }
                ].map((social) => (
                  <button
                    key={social.platform}
                    onClick={() => sharePost(social.platform)}
                    disabled={isSharing}
                    className={`group flex items-center px-4 py-3 rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl ${
                      isDay 
                        ? 'bg-white hover:bg-gradient-to-r hover:text-white border border-slate-200' 
                        : 'bg-slate-700 hover:bg-gradient-to-r hover:text-white border border-slate-600'
                    } hover:${social.color} disabled:opacity-50 disabled:cursor-not-allowed`}
                    title={`Share on ${social.name}`}
                  >
                    <span className="text-lg mr-2">{social.icon}</span>
                    <span className="text-sm font-medium">{social.name}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Related Posts */}
      {relatedPosts && relatedPosts.length > 0 && (
        <section className={`py-16 ${
          isDay ? 'bg-slate-50' : 'bg-slate-800'
        }`}>
          <div className="w-full max-w-6xl mx-auto px-8">
            <h2 className={`text-3xl font-black mb-12 text-center ${
              isDay ? 'text-slate-800' : 'text-white'
            }`}>
              Related Articles
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {relatedPosts.slice(0, 3).map((relatedPost) => (
                <Link 
                  key={relatedPost._id}
                  href={`/blog/${relatedPost.slug.current}`}
                  className={`group block rounded-3xl overflow-hidden transition-all duration-500 ${
                    isDay 
                      ? 'bg-white border-2 border-slate-200 hover:shadow-xl hover:shadow-blue-500/10' 
                      : 'bg-slate-700 border-2 border-slate-600 hover:shadow-xl hover:shadow-blue-500/20'
                  } transform hover:scale-105 hover:-translate-y-2`}
                >
                  <div className="relative h-48 overflow-hidden">
                    <OptimizedImage
                      image={relatedPost.coverImage!}
                      alt={relatedPost.title}
                      aspectRatio="4:5"
                      width={400}
                      className="w-full h-full transform group-hover:scale-110 transition-transform duration-700"
                      quality={85}
                    />
                    <div className="absolute top-4 right-4">
                      <span className={`px-3 py-1 rounded-xl text-xs font-bold ${
                        isDay 
                          ? 'bg-blue-500 text-white' 
                          : 'bg-blue-400 text-slate-900'
                      }`}>
                        {relatedPost.category?.name}
                      </span>
                    </div>
                  </div>
                  
                  <div className="p-6">
                    <h3 className={`text-xl font-bold mb-3 leading-tight transition-colors duration-500 ${
                      isDay ? 'text-slate-800' : 'text-white'
                    } group-hover:text-blue-600 dark:group-hover:text-blue-400`}>
                      {relatedPost.title}
                    </h3>
                    
                    <p className={`text-sm mb-4 leading-relaxed ${
                      isDay ? 'text-slate-600' : 'text-slate-300'
                    }`}>
                      {relatedPost.excerpt}
                    </p>
                    
                    <div className="flex items-center justify-between">
                      <span className={`text-xs ${
                        isDay ? 'text-slate-500' : 'text-slate-400'
                      }`}>
                        {new Date(relatedPost.publishDate).toLocaleDateString('en-US', { 
                          year: 'numeric', 
                          month: 'short', 
                          day: 'numeric' 
                        })}
                      </span>
                      <span className={`text-sm font-semibold ${
                        isDay ? 'text-blue-600' : 'text-blue-400'
                      }`}>
                        Read More →
                      </span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Newsletter & CTA */}
      <section className={`py-16 ${
        isDay ? 'bg-white' : 'bg-slate-900'
      }`}>
        <div className="w-full max-w-4xl mx-auto px-8 text-center">
          <div className={`p-12 rounded-3xl transition-all duration-500 ${
            isDay 
              ? 'bg-gradient-to-br from-blue-50 to-purple-50 border-2 border-blue-200/30' 
              : 'bg-gradient-to-br from-blue-900/30 to-purple-900/30 border-2 border-blue-500/20'
          }`}>
            <h3 className={`text-3xl font-black mb-4 ${
              isDay ? 'text-slate-800' : 'text-white'
            }`}>
              Ready to Go Solar?
            </h3>
            <p className={`text-lg mb-8 ${
              isDay ? 'text-slate-600' : 'text-slate-300'
            }`}>
              Get a free consultation and personalized solar solution for your property
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className={`px-8 py-4 rounded-xl font-bold transition-all duration-300 ${
                isDay 
                  ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white hover:from-blue-600 hover:to-purple-600' 
                  : 'bg-gradient-to-r from-blue-400 to-purple-400 text-slate-900 hover:from-blue-300 hover:to-purple-300'
              } transform hover:scale-105 shadow-lg hover:shadow-xl`}>
                Get Free Quote
              </button>
              
              <Link 
                href="/blog"
                className={`px-8 py-4 rounded-xl font-bold transition-all duration-300 border-2 ${
                  isDay 
                    ? 'border-blue-500 text-blue-600 hover:bg-blue-500 hover:text-white' 
                    : 'border-blue-400 text-blue-400 hover:bg-blue-400 hover:text-slate-900'
                } transform hover:scale-105`}
              >
                More Articles
              </Link>
            </div>
          </div>
        </div>
      </section>

      <Footer />

      {/* Enhanced CSS for Article Content */}
      <style jsx global>{`
        .article-content h2 {
          @apply text-2xl md:text-3xl lg:text-4xl font-bold mt-16 mb-8 text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400;
          position: relative;
        }
        .article-content h2::before {
          content: '';
          position: absolute;
          bottom: -4px;
          left: 0;
          width: 60px;
          height: 3px;
          background: linear-gradient(to right, #3b82f6, #8b5cf6);
          border-radius: 2px;
        }
        .article-content h3 {
          @apply text-xl md:text-2xl lg:text-3xl font-bold mt-12 mb-6 relative;
        }
        .article-content h3::before {
          content: '●';
          @apply text-blue-500 dark:text-blue-400 mr-3;
        }
        .article-content h4 {
          @apply text-lg md:text-xl lg:text-2xl font-bold mt-10 mb-5 flex items-center;
        }
        .article-content h4::before {
          content: '▶';
          @apply text-purple-500 dark:text-purple-400 mr-2 text-sm;
        }
        .article-content p {
          @apply mb-6 leading-relaxed text-lg lg:text-xl;
          text-align: justify;
        }
        .article-content ul, .article-content ol {
          @apply mb-8 pl-8;
        }
        .article-content li {
          @apply mb-3 relative;
          padding-left: 0.5rem;
        }
        .article-content ul li::before {
          content: '●';
          @apply text-blue-500 dark:text-blue-400 absolute left-0 top-0 font-bold;
          transform: translateX(-100%);
        }
        .article-content ol li {
          @apply ml-0;
          counter-increment: item;
        }
        .article-content ol {
          counter-reset: item;
        }
        .article-content ol li::before {
          content: counter(item) '.';
          @apply text-purple-500 dark:text-purple-400 font-bold absolute left-0 top-0;
          transform: translateX(-100%);
        }
        .article-content blockquote {
          @apply border-l-4 border-blue-500 dark:border-blue-400 pl-8 py-6 my-12 relative;
          @apply bg-gradient-to-r from-blue-50 via-blue-50/50 to-transparent dark:from-blue-900/20 dark:via-blue-900/10 dark:to-transparent;
          @apply rounded-r-2xl shadow-lg;
        }
        .article-content blockquote::before {
          content: '"';
          @apply text-6xl text-blue-500 dark:text-blue-400 absolute -top-2 left-2 font-serif leading-none;
        }
        .article-content blockquote p {
          @apply text-lg lg:text-xl font-medium italic;
        }
        .article-content table {
          @apply w-full border-collapse mb-12 rounded-2xl overflow-hidden shadow-xl;
          @apply bg-white dark:bg-slate-800;
        }
        .article-content th, .article-content td {
          @apply border-0 px-6 py-4 text-left;
        }
        .article-content th {
          @apply bg-gradient-to-r from-blue-500 to-purple-500 text-white font-bold text-sm uppercase tracking-wider;
        }
        .article-content td {
          @apply border-b border-slate-200 dark:border-slate-700;
        }
        .article-content tbody tr:hover {
          @apply bg-blue-50 dark:bg-blue-900/20 transition-colors duration-200;
        }
        .article-content strong {
          @apply font-bold text-blue-600 dark:text-blue-400;
        }
        .article-content a {
          @apply text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 underline underline-offset-2 transition-colors duration-200;
        }
        .article-content code {
          @apply bg-slate-100 dark:bg-slate-800 px-2 py-1 rounded text-sm font-mono text-purple-600 dark:text-purple-400;
        }
        .article-content pre {
          @apply bg-slate-900 dark:bg-slate-800 p-6 rounded-2xl overflow-x-auto my-8;
        }
        .article-content pre code {
          @apply bg-transparent text-slate-300 p-0;
        }
        
        /* Smooth scroll behavior */
        html {
          scroll-behavior: smooth;
        }
        
        /* Custom scrollbar */
        .article-content::-webkit-scrollbar {
          width: 8px;
        }
        .article-content::-webkit-scrollbar-track {
          @apply bg-slate-100 dark:bg-slate-800 rounded-full;
        }
        .article-content::-webkit-scrollbar-thumb {
          @apply bg-gradient-to-b from-blue-500 to-purple-500 rounded-full;
        }
        .article-content::-webkit-scrollbar-thumb:hover {
          @apply from-blue-600 to-purple-600;
        }
      `}</style>
    </div>
  );
}
