'use client';

import { useState, useEffect } from 'react';
import { BlogPost, Category } from '@/types/blog';
import { useTheme } from '@/contexts/ThemeContext';
import Header from '@/components/home/Header';
import Footer from '@/components/home/Footer';
import BlogCard from '@/components/blog/BlogCard';

interface BlogListingContentProps {
  posts: BlogPost[];
  featuredPosts: BlogPost[];
  categories: Category[];
}

const BlogListingContent: React.FC<BlogListingContentProps> = ({
  posts,
  featuredPosts,
  categories
}) => {
  const { isDay } = useTheme();
  const [isScrolled, setIsScrolled] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 100);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Create category options including 'All'
  const categoryOptions = ['All', ...categories.map(cat => cat.name)];

  // Filter posts based on search and category
  const filteredPosts = posts.filter(post => {
    const matchesCategory = selectedCategory === 'All' || post.category?.name === selectedCategory;
    const matchesSearch = searchTerm === '' || 
      post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (post.excerpt && post.excerpt.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (post.tags && post.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase())));
    return matchesCategory && matchesSearch;
  });

  return (
    <div className={`min-h-screen transition-all duration-500 ${
      isDay ? 'bg-gradient-to-br from-blue-50 to-blue-100' : 'bg-slate-900'
    }`}>
      <Header isScrolled={isScrolled} />

      {/* Hero Section */}
      <section className={`pt-32 pb-20 relative overflow-hidden transition-all duration-500 ${
        isDay ? 'bg-gradient-to-br from-slate-50 to-blue-50' : 'bg-gradient-to-br from-slate-900 to-blue-900'
      }`}>
        {/* Background Effects */}
        <div className="absolute inset-0">
          <div className={`absolute inset-0 ${
            isDay 
              ? 'bg-[radial-gradient(circle_at_30%_20%,_#3b82f615,transparent_70%),radial-gradient(circle_at_70%_80%,_#06b6d420,transparent_70%)]'
              : 'bg-[radial-gradient(circle_at_30%_20%,_#3b82f625,transparent_70%),radial-gradient(circle_at_70%_80%,_#06b6d430,transparent_70%)]'
          }`} />
          <div className="absolute top-20 left-20 w-96 h-96 border border-blue-300/10 rounded-full animate-spin" style={{ animationDuration: '60s' }} />
          <div className="absolute bottom-20 right-20 w-80 h-80 border border-purple-300/10 rounded-full animate-spin" style={{ animationDuration: '45s', animationDirection: 'reverse' }} />
        </div>

        <div className="relative w-full max-w-7xl mx-auto px-8 text-center">
          <div className="inline-block relative mb-8">
            <div className={`absolute inset-0 blur-3xl ${
              isDay 
                ? 'bg-gradient-to-r from-blue-500/20 via-purple-500/20 to-blue-500/20' 
                : 'bg-gradient-to-r from-blue-500/30 via-purple-500/30 to-blue-500/30'
            } rounded-full scale-150`} />
            
            <h1 className={`relative text-5xl md:text-6xl lg:text-7xl font-black mb-6 transition-colors duration-500 ${
              isDay ? 'text-slate-800' : 'text-white'
            } tracking-tight leading-none`}>
              Solar Energy 
              <span className={`block bg-gradient-to-r ${
                isDay 
                  ? 'from-blue-600 via-blue-600 to-blue-600' 
                  : 'from-blue-400 via-blue-400 to-blue-400'
              } bg-clip-text text-transparent`}>
                Insights & News
              </span>
            </h1>
          </div>
          
          <p className={`text-xl md:text-2xl max-w-4xl mx-auto mb-12 transition-colors duration-500 ${
            isDay ? 'text-slate-600' : 'text-slate-300'
          } leading-relaxed font-light`}>
            Stay updated with the latest trends, technologies, and insights from the world of solar energy and renewable solutions
          </p>

          {/* Search and Filter */}
          <div className="max-w-4xl mx-auto">
            <div className="flex flex-col md:flex-row gap-4 justify-center items-center">
              {/* Search Bar */}
              <div className="relative flex-1 max-w-md">
                <input
                  type="text"
                  placeholder="Search articles, topics, or tags..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className={`w-full px-6 py-4 rounded-2xl text-lg transition-all duration-300 ${
                    isDay 
                      ? 'bg-white/80 border-2 border-blue-200/50 text-slate-800 placeholder-slate-500 focus:border-blue-500' 
                      : 'bg-slate-800/80 border-2 border-blue-500/30 text-white placeholder-slate-400 focus:border-blue-400'
                  } backdrop-blur-xl shadow-lg focus:shadow-xl focus:outline-none`}
                />
                <div className={`absolute right-4 top-1/2 transform -translate-y-1/2 text-2xl ${
                  isDay ? 'text-slate-400' : 'text-slate-500'
                }`}>
                  🔍
                </div>
              </div>

              {/* Category Filter */}
              <div className="flex flex-wrap gap-2">
                {categoryOptions.map((category) => (
                  <button
                    key={category}
                    onClick={() => setSelectedCategory(category)}
                    className={`px-6 py-3 rounded-xl font-bold text-sm transition-all duration-300 ${
                      selectedCategory === category
                        ? isDay 
                          ? 'bg-blue-500 text-white shadow-lg shadow-blue-500/25' 
                          : 'bg-blue-400 text-slate-900 shadow-lg shadow-blue-400/25'
                        : isDay
                          ? 'bg-white/80 text-slate-700 border-2 border-blue-200/50 hover:border-blue-400'
                          : 'bg-slate-800/80 text-slate-300 border-2 border-blue-500/30 hover:border-blue-400'
                    } backdrop-blur-xl hover:scale-105 transform`}
                  >
                    {category}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Articles */}
      {selectedCategory === 'All' && searchTerm === '' && featuredPosts.length > 0 && (
        <section className={`py-20 relative transition-all duration-500 ${
          isDay ? 'bg-gradient-to-br from-blue-50 to-blue-100' : 'bg-slate-900'
        }`}>
          <div className="w-full max-w-7xl mx-auto px-8">
            <div className="text-center mb-16">
              <h2 className={`text-4xl md:text-5xl font-black mb-6 transition-colors duration-500 ${
                isDay ? 'text-slate-800' : 'text-white'
              }`}>
                Featured Articles
              </h2>
              <div className={`h-1 w-24 mx-auto bg-gradient-to-r ${
                isDay ? 'from-blue-500 to-purple-500' : 'from-blue-400 to-purple-400'
              } rounded-full`} />
            </div>

            {/* Desktop Featured Cards */}
            <div className="hidden md:grid grid-cols-1 lg:grid-cols-3 gap-8">
              {featuredPosts.slice(0, 3).map((post, index) => (
                <BlogCard 
                  key={post._id} 
                  post={post} 
                  featured={true}
                  index={index}
                />
              ))}
            </div>

            {/* Mobile Featured Cards (Horizontal Scroll) */}
            <div className="md:hidden">
              <div className="flex gap-4 overflow-x-auto pb-4 snap-x snap-mandatory">
                {featuredPosts.slice(0, 5).map((post, index) => (
                  <div key={post._id} className="flex-shrink-0 w-80 snap-start">
                    <BlogCard 
                      post={post} 
                      mobile={true}
                      index={index}
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* All Articles */}
      <section className={`py-20 relative transition-all duration-500 ${
        isDay ? 'bg-slate-50' : 'bg-slate-800'
      }`}>
        <div className="w-full max-w-7xl mx-auto px-8">
          <div className="text-center mb-16">
            <h2 className={`text-4xl md:text-5xl font-black mb-6 transition-colors duration-500 ${
              isDay ? 'text-slate-800' : 'text-white'
            }`}>
              {selectedCategory === 'All' && searchTerm === '' ? 'Latest Articles' : 'Search Results'}
            </h2>
            <div className={`h-1 w-24 mx-auto bg-gradient-to-r ${
              isDay ? 'from-blue-500 to-purple-500' : 'from-blue-400 to-purple-400'
            } rounded-full`} />
            {filteredPosts.length > 0 && (
              <p className={`text-lg mt-4 ${
                isDay ? 'text-slate-600' : 'text-slate-300'
              }`}>
                {filteredPosts.length} article{filteredPosts.length !== 1 ? 's' : ''} found
              </p>
            )}
          </div>

          {filteredPosts.length === 0 ? (
            <div className="text-center py-20">
              <div className="text-6xl mb-4">📝</div>
              <h3 className={`text-2xl font-bold mb-4 ${
                isDay ? 'text-slate-800' : 'text-white'
              }`}>
                No articles found
              </h3>
              <p className={`text-lg ${
                isDay ? 'text-slate-600' : 'text-slate-300'
              }`}>
                Try adjusting your search terms or selecting a different category.
              </p>
            </div>
          ) : (
            <>
              {/* Desktop Grid */}
              <div className="hidden md:grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredPosts.map((post, index) => (
                  <BlogCard 
                    key={post._id} 
                    post={post} 
                    index={index}
                  />
                ))}
              </div>

              {/* Mobile List */}
              <div className="md:hidden space-y-4">
                {filteredPosts.map((post, index) => (
                  <BlogCard 
                    key={post._id} 
                    post={post} 
                    mobile={true}
                    index={index}
                  />
                ))}
              </div>
            </>
          )}
        </div>
      </section>

      {/* Newsletter Subscription */}
      <section className={`py-20 relative transition-all duration-500 ${
        isDay ? 'bg-gradient-to-br from-blue-50 to-blue-100' : 'bg-slate-900'
      }`}>
        <div className="w-full max-w-4xl mx-auto px-8 text-center">
          <div className={`p-12 rounded-3xl transition-all duration-500 ${
            isDay 
              ? 'bg-gradient-to-br from-blue-50 to-purple-50 border-2 border-blue-200/30' 
              : 'bg-gradient-to-br from-blue-900/30 to-purple-900/30 border-2 border-blue-500/20'
          } backdrop-blur-xl shadow-2xl`}>
            <div className="text-5xl mb-6">📬</div>
            <h3 className={`text-3xl font-black mb-4 transition-colors duration-500 ${
              isDay ? 'text-slate-800' : 'text-white'
            }`}>
              Stay Updated with Solar Insights
            </h3>
            <p className={`text-lg mb-8 transition-colors duration-500 ${
              isDay ? 'text-slate-600' : 'text-slate-300'
            }`}>
              Get the latest articles, industry news, and exclusive insights delivered to your inbox
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Enter your email address"
                className={`flex-1 px-6 py-4 rounded-xl transition-all duration-300 ${
                  isDay 
                    ? 'bg-white border-2 border-blue-200 text-slate-800 placeholder-slate-500 focus:border-blue-500' 
                    : 'bg-slate-800 border-2 border-blue-500/30 text-white placeholder-slate-400 focus:border-blue-400'
                } focus:outline-none`}
              />
              <button className={`px-8 py-4 rounded-xl font-bold transition-all duration-300 ${
                isDay 
                  ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-lg hover:shadow-xl' 
                  : 'bg-gradient-to-r from-blue-400 to-purple-400 text-slate-900 shadow-lg hover:shadow-xl'
              } transform hover:scale-105`}>
                Subscribe
              </button>
            </div>
            
            <p className={`text-sm mt-4 ${
              isDay ? 'text-slate-500' : 'text-slate-400'
            }`}>
              Join 5,000+ subscribers. No spam, unsubscribe anytime.
            </p>
          </div>
        </div>
      </section>

      <Footer />

      {/* Global Styles */}
      <style jsx global>{`
        .snap-x {
          scroll-snap-type: x mandatory;
        }
        .snap-mandatory {
          scroll-snap-type: x mandatory;
        }
        .snap-start {
          scroll-snap-align: start;
        }
        
        /* Hide scrollbar */
        .overflow-x-auto::-webkit-scrollbar {
          height: 4px;
        }
        .overflow-x-auto::-webkit-scrollbar-track {
          background: ${isDay ? '#f1f5f9' : '#374151'};
          border-radius: 2px;
        }
        .overflow-x-auto::-webkit-scrollbar-thumb {
          background: ${isDay ? '#3b82f6' : '#60a5fa'};
          border-radius: 2px;
        }
      `}</style>
    </div>
  );
};

export default BlogListingContent;
