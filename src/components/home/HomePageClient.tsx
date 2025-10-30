'use client';

import React, { Suspense } from 'react';
import Link from 'next/link';
import dynamic from 'next/dynamic';
import { useTheme } from '@/contexts/ThemeContext';
import { getThemeClasses, getThemeHover, TRANSITION_CLASSES } from '@/utils/themeUtils';
import { useHomepageAnimations } from '@/hooks/useHomepageAnimations';
import { useAnalytics, useScrollTracking } from '@/hooks/useAnalytics';
import { Star, CheckCircle, Users, Award, Shield, Zap, ArrowRight, Phone, Mail, MapPin, Globe, Home, Building, Factory, Play, Calculator } from 'lucide-react';
import { supabaseMedia } from '@/utils/supabaseMedia';
import { MEDIA_CONFIG } from '@/data/mediaConfig';

// ============================================================================
// CRITICAL PATH COMPONENTS - Load immediately, needed for initial render
// ============================================================================
import Header from '@/components/home/Header';
import Hero from '@/components/home/Hero';
import PageLoader from '@/components/ui/PageLoader';
import OptimizedImage from '@/components/ui/OptimizedImage';
import OptimizedVideo from '@/components/ui/OptimizedVideo';

// ============================================================================
// BELOW-FOLD COMPONENTS - Dynamic imports with SSR for better performance
// ============================================================================

// Footer - Below fold, can be dynamically loaded but SSR for SEO
const Footer = dynamic(() => import('@/components/home/Footer'), {
  ssr: true,
  loading: () => (
    <div className="h-96 bg-gradient-to-br from-slate-900 to-slate-800 animate-pulse" />
  )
});

// Floating Action Button - Interactive element, no SSR needed
const FloatingActionButton = dynamic(() => import('@/components/ui/FloatingActionButton'), {
  ssr: false,
  loading: () => null // No loading state needed, appears later
});

// Video Review Section - Heavy component, far below fold
const VideoReviewSection = dynamic(() => import('@/components/home/VideoReviewSection'), {
  ssr: false,
  loading: () => (
    <div className="animate-pulse bg-gray-200 h-64 rounded-lg flex items-center justify-center">
      <span className="text-gray-500">Loading video reviews...</span>
    </div>
  )
});

// FAQ Section - Good for SEO, but can be loaded dynamically
const FAQ = dynamic(() => import('@/components/home/FAQ'), {
  ssr: true,
  loading: () => (
    <div className="animate-pulse bg-gray-200 h-32 rounded-lg flex items-center justify-center">
      <span className="text-gray-500">Loading FAQ...</span>
    </div>
  )
});

// Contact Form - Heavy interactive component, no SSR needed
const ContactForm = dynamic(() => import('@/components/contact/ContactForm'), {
  ssr: false,
  loading: () => (
    <div className="animate-pulse bg-gray-200 h-96 rounded-lg flex items-center justify-center">
      <span className="text-gray-500">Loading contact form...</span>
    </div>
  )
});

export default function HomePageClient() {
  const { theme, isDay } = useTheme();
  const themeClasses = getThemeClasses(theme);
  const hoverEffects = getThemeHover(theme);
  
  // Initialize analytics and tracking
  const { trackServiceInteraction, trackProductInterest } = useAnalytics();
  useScrollTracking();
  
  const {
    counters,
    hasCounterStarted,
    isScrolled,
    trustBannerRef,
    projectsRef,
    contactRef,
    getAnimationClass,
    getStaggeredAnimation
  } = useHomepageAnimations();

  // Generate service structured data
  // Video scroll control
  React.useEffect(() => {
    const videos = document.querySelectorAll('video[id*="-video"]') as NodeListOf<HTMLVideoElement>;
    
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const video = entry.target as HTMLVideoElement;
          
          if (entry.isIntersecting && entry.intersectionRatio > 0.7) {
            video.play().catch(console.error);
          } else {
            video.pause();
          }
        });
      },
      {
        threshold: [0, 0.7, 1],
        rootMargin: '-80px 0px 0px 0px'
      }
    );

    videos.forEach((video) => observer.observe(video));
    return () => videos.forEach((video) => observer.unobserve(video));
  }, []);

  return (
    <>
      <PageLoader />
      <div className={`min-h-screen transition-all duration-500 overflow-x-hidden ${
        isDay ? 'bg-gradient-to-br from-blue-50 to-blue-100' : 'bg-slate-900'
      }`}>
      <Header isScrolled={isScrolled} />
      <Hero />

      {/* Product Highlight Section */}
      <section 
        aria-labelledby="products-heading"
        className={`py-6 sm:py-8 lg:py-12 transition-all duration-500 ${
          isDay ? 'bg-gradient-to-br from-blue-50 to-blue-100' : 'bg-gradient-to-br from-slate-900 to-slate-800'
        }`}
        data-aos="fade-up"
        data-aos-duration="1000"
      >
        <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-4 sm:gap-6 lg:gap-12 items-center">
            {/* Left Column - Visual */}
            <div className="relative order-1" data-aos="fade-right" data-aos-duration="1200">
              <div className="relative w-full max-w-xs sm:max-w-md lg:max-w-2xl mx-auto">
                <div className={`absolute inset-0 rounded-full border-2 sm:border-4 border-dashed opacity-20 animate-spin-slow ${
                  isDay ? 'border-blue-400' : 'border-blue-400'
                }`} style={{ animationDuration: '20s' }} />
                <div className={`absolute inset-2 sm:inset-4 rounded-full border-1 sm:border-2 opacity-30 ${
                  isDay ? 'border-blue-500' : 'border-blue-400'
                }`} />
                
                <div className={`relative aspect-square rounded-full overflow-hidden shadow-lg sm:shadow-2xl ${
                  isDay ? 'shadow-blue-300/30' : 'shadow-blue-900/50'
                }`}>
                  <div className={`absolute inset-0 bg-gradient-to-br ${
                    isDay ? 'from-blue-500 to-blue-600' : 'from-blue-700 to-blue-600'
                  } opacity-10`} />
                  <OptimizedImage 
                    src="about_hero_section_images/About_herosection_image1.png" 
                    alt="Solar installation on a modern Indian rooftop with a clear blue sky"
                    fill={true}
                    className="object-cover"
                    priority={true}
                    useSupabase={true}
                  />
                  
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent" />
                  
                  <div className={`absolute top-3 right-3 sm:top-6 sm:right-6 w-8 h-8 sm:w-12 sm:h-12 rounded-full flex items-center justify-center ${
                    isDay ? 'bg-blue-50/90 text-blue-600' : 'bg-slate-800/90 text-blue-400'
                  } shadow-lg backdrop-blur-sm`}>
                    <Zap className="w-4 h-4 sm:w-6 sm:h-6" />
                  </div>
                  
                  <div className={`absolute bottom-3 left-3 sm:bottom-6 sm:left-6 w-12 h-12 sm:w-16 sm:h-16 rounded-full flex items-center justify-center ${
                    isDay ? 'bg-blue-600 text-white' : 'bg-blue-600 text-white'
                  } shadow-lg`}>
                    <span className="text-xs font-bold text-center leading-tight">
                      25+<br />Years
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column - Content */}
            <div className="space-y-3 sm:space-y-4 lg:space-y-6 order-2" data-aos="fade-left" data-aos-duration="1200" data-aos-delay="200">
              <div className="space-y-1 sm:space-y-2 lg:space-y-3">
                <h2 id="products-heading" className={`text-xl sm:text-2xl lg:text-4xl font-bold leading-tight ${themeClasses.textPrimary} ${TRANSITION_CLASSES.colors}`}>
                  Trusted Solar Products for{' '}
                  <span className={`${isDay ? 'text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-blue-800' : 'text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-blue-600'}`}>
                    Every Home & Industry
                  </span>
                </h2>
                <p className={`text-sm sm:text-base lg:text-lg ${themeClasses.textSecondary} ${TRANSITION_CLASSES.colors} max-w-xl`}>
                  Explore Autosys Sunergy&apos;s certified range of high-performance solar components, engineered for reliability and maximum energy output.
                </p>
              </div>

              {/* Product Cards - Horizontal Layout for Mobile */}
              <div className="grid grid-cols-3 gap-2 sm:gap-3 lg:gap-4">
                {[
                  {
                    name: "Solar Panels",
                    description: "540W+ Monocrystalline",
                    icon: (
                      <svg className="w-4 h-4 sm:w-5 lg:w-6 sm:h-5 lg:h-6" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                        <path d="M2 3h8v8H2V3zm0 10h8v8H2v-8zm10-10h8v8h-8V3zm0 10h8v8h-8v-8z"/>
                        <path d="M4 5v4h4V5H4zm0 10v4h4v-4H4zm10-10v4h4V5h-4zm0 10v4h4v-4h-4z"/>
                      </svg>
                    ),
                    color: "blue",
                    gradient: "from-blue-500 to-blue-600"
                  },
                  {
                    name: "Inverters",
                    description: "Smart Grid-Tie",
                    icon: (
                      <svg className="w-4 h-4 sm:w-5 lg:w-6 sm:h-5 lg:h-6" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                        <rect x="2" y="3" width="20" height="14" rx="2" ry="2"/>
                        <line x1="8" y1="21" x2="16" y2="21"/>
                        <line x1="12" y1="17" x2="12" y2="21"/>
                        <path d="M7 11h2v2H7v-2zm4-2h2v4h-2V9zm4 1h2v2h-2v-2z"/>
                      </svg>
                    ),
                    color: "blue",
                    gradient: "from-blue-600 to-blue-700"
                  },
                  {
                    name: "Solar Structures",
                    description: "3 Purlin Mounting",
                    icon: (
                      <svg className="w-4 h-4 sm:w-5 lg:w-6 sm:h-5 lg:h-6" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                        <rect x="1" y="6" width="18" height="12" rx="2" ry="2"/>
                        <line x1="22" y1="13" x2="22" y2="11"/>
                        <path d="M5 10v4m3-4v4m3-4v4m3-4v4"/>
                      </svg>
                    ),
                    color: "blue",
                    gradient: "from-blue-700 to-blue-800"
                  }
                ].map((product, index) => (
                  <div 
                    key={index}
                    className={`group relative p-2 sm:p-3 lg:p-4 rounded-lg sm:rounded-xl border-2 transition-all duration-300 cursor-pointer hover:shadow-lg sm:hover:shadow-xl ${hoverEffects.scale} ${
                      isDay 
                        ? 'bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200 hover:border-blue-300 shadow-md sm:shadow-lg' 
                        : 'bg-slate-800 border-slate-600 hover:border-slate-500 shadow-md sm:shadow-lg'
                    }`}
                    data-aos="zoom-in"
                    data-aos-duration="600"
                    data-aos-delay={`${index * 100}`}
                  >
                    <div className={`absolute inset-0 rounded-lg sm:rounded-xl bg-gradient-to-br ${product.gradient} opacity-0 group-hover:opacity-5 transition-all duration-300`} />
                    
                    <div className="relative space-y-1 sm:space-y-2">
                      <div className={`w-6 h-6 sm:w-8 lg:w-12 sm:h-8 lg:h-12 mx-auto rounded-md sm:rounded-lg flex items-center justify-center bg-gradient-to-br ${product.gradient} text-white shadow-md sm:shadow-lg group-hover:shadow-xl group-hover:scale-110 transition-all duration-300`}>
                        {product.icon}
                      </div>
                      
                      <div className="text-center">
                        <h3 className={`font-bold text-xs sm:text-sm lg:text-sm ${themeClasses.textPrimary} ${TRANSITION_CLASSES.colors} group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-blue-600 group-hover:to-blue-700 transition-all duration-300 leading-tight`}>
                          {product.name}
                        </h3>
                        <p className={`text-xs sm:text-xs ${themeClasses.textSecondary} ${TRANSITION_CLASSES.colors} leading-tight mt-0.5`}>
                          {product.description}
                        </p>
                      </div>
                    </div>

                    <div className={`absolute inset-0 rounded-lg sm:rounded-xl border-2 border-transparent bg-gradient-to-r ${product.gradient} opacity-0 group-hover:opacity-20 blur-sm transition-all duration-300 scale-110`} />
                  </div>
                ))}
              </div>

              <div className="space-y-2 sm:space-y-3 lg:space-y-4">
                <div className="text-center lg:text-left">
                  <p className={`text-xs sm:text-sm lg:text-base font-semibold ${
                    isDay ? 'text-blue-600' : 'text-blue-400'
                  } mb-1`}>
                    1st Choice of Progressive India
                  </p>
                  <div className="flex flex-wrap items-center justify-center lg:justify-start gap-1 sm:gap-2 text-xs">
                    <div className="flex items-center space-x-1">
                      <CheckCircle className={`w-3 h-3 ${isDay ? 'text-blue-600' : 'text-blue-400'}`} />
                      <span className={`${themeClasses.textSecondary} ${TRANSITION_CLASSES.colors}`}>MNRE Approved</span>
                    </div>
                    <span className={`${themeClasses.textSecondary} ${TRANSITION_CLASSES.colors} hidden sm:inline`}>•</span>
                    <div className="flex items-center space-x-1">
                      <Award className={`w-3 h-3 ${isDay ? 'text-blue-600' : 'text-blue-400'}`} />
                      <span className={`${themeClasses.textSecondary} ${TRANSITION_CLASSES.colors}`}>ISO Certified</span>
                    </div>
                    <span className={`${themeClasses.textSecondary} ${TRANSITION_CLASSES.colors} hidden sm:inline`}>•</span>
                    <div className="flex items-center space-x-1">
                      <Shield className={`w-3 h-3 ${isDay ? 'text-blue-600' : 'text-blue-400'}`} />
                      <span className={`${themeClasses.textSecondary} ${TRANSITION_CLASSES.colors}`}>30+ Years Warranty</span>
                    </div>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-2 sm:gap-3">
                  <Link 
                    href="/products"
                    className={`group px-3 sm:px-4 lg:px-6 py-2 sm:py-3 rounded-lg sm:rounded-xl font-semibold text-xs sm:text-sm lg:text-base transition-all duration-300 inline-flex items-center justify-center space-x-1 sm:space-x-2 ${hoverEffects.scale} ${
                    isDay 
                      ? 'bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white shadow-lg sm:shadow-xl hover:shadow-xl sm:hover:shadow-2xl' 
                      : 'bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white shadow-lg sm:shadow-xl hover:shadow-xl sm:hover:shadow-2xl'
                  }`}>
                    <span>Explore Our Products</span>
                    <ArrowRight className="w-3 h-3 sm:w-4 lg:w-5 sm:h-4 lg:h-5 group-hover:translate-x-1 transition-transform duration-300" />
                  </Link>
                  
                  <a 
                    href="tel:+918818880540"
                    className={`px-3 sm:px-4 lg:px-6 py-2 sm:py-3 rounded-lg sm:rounded-xl font-semibold text-xs sm:text-sm lg:text-base border-2 transition-all duration-300 inline-flex items-center justify-center space-x-1 sm:space-x-2 ${hoverEffects.scale} ${
                    isDay 
                      ? 'border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white' 
                      : 'border-blue-400 text-blue-400 hover:bg-blue-400 hover:text-slate-900'
                  }`}
                    onClick={() => trackServiceInteraction('general', 'phone_call')}
                  >
                    <Phone className="w-3 h-3 sm:w-4 sm:h-4" />
                    <span className="hidden sm:inline">Get Quote: +91 8818880540</span>
                    <span className="sm:hidden">Call Now</span>
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Full Width Statistics Row - Below Both Columns */}
          <div className="mt-6 sm:mt-8 lg:mt-12 pt-4 sm:pt-6 lg:pt-8 border-t border-opacity-20 border-blue-300">
            <div className="flex items-center justify-center space-x-6 sm:space-x-8 lg:space-x-12">
              <div className="text-center">
                <div className={`text-lg sm:text-xl lg:text-2xl font-bold ${isDay ? 'text-blue-600' : 'text-blue-400'}`}>
                  2000+
                </div>
                <div className={`text-xs sm:text-sm ${themeClasses.textSecondary} ${TRANSITION_CLASSES.colors} leading-tight`}>
                  Happy Customers
                </div>
              </div>
              <div className="text-center">
                <div className={`text-lg sm:text-xl lg:text-2xl font-bold ${isDay ? 'text-blue-600' : 'text-blue-400'}`}>
                  20+
                </div>
                <div className={`text-xs sm:text-sm ${themeClasses.textSecondary} ${TRANSITION_CLASSES.colors} leading-tight`}>
                  MW Installed
                </div>
              </div>
              <div className="text-center">
                <div className={`text-lg sm:text-xl lg:text-2xl font-bold ${isDay ? 'text-blue-600' : 'text-blue-400'}`}>
                  4.9★
                </div>
                <div className={`text-xs sm:text-sm ${themeClasses.textSecondary} ${TRANSITION_CLASSES.colors} leading-tight`}>
                  Customer Rating
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Visual-First Solar Services Section */}
      <section 
        aria-labelledby="services-heading"
        className={`relative py-8 sm:py-12 lg:py-20 overflow-hidden transition-all duration-500 ${
          isDay ? 'bg-gradient-to-br from-blue-50 via-blue-100 to-blue-150' : 'bg-gradient-to-br from-slate-900 via-slate-800 to-blue-900'
        }`}
        data-aos="fade-up"
        data-aos-duration="1000"
      >
        <div className="absolute inset-0 opacity-5">
          <div className={`absolute inset-0 ${
            isDay ? 'bg-[radial-gradient(circle_at_50%_50%,rgba(59,130,246,0.1),transparent_70%)]' : 'bg-[radial-gradient(circle_at_50%_50%,rgba(59,130,246,0.2),transparent_70%)]'
          }`} />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-6 sm:mb-8 lg:mb-12" data-aos="fade-up" data-aos-duration="800">
            <div className={`inline-block px-3 sm:px-4 lg:px-6 py-1.5 sm:py-2 rounded-full mb-2 sm:mb-4 ${
              isDay ? 'bg-blue-100 text-blue-800' : 'bg-blue-900/50 text-blue-300'
            }`}>
              <span className="text-xs sm:text-sm font-semibold tracking-wide">OUR SERVICES</span>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-2 sm:gap-4 lg:gap-3 service-video-grid" data-aos="fade-up" data-aos-duration="1000" data-aos-delay="300">
            {[
              {
                type: "Residential",
                tag: "For Homes",
                image: "Solar_services_sample_image.jpg",
                video: MEDIA_CONFIG.services.residential,
                gradient: "from-blue-500/20 to-blue-600/20",
                borderGradient: "from-blue-500 to-blue-600",
                stats: "2000+ Homes",
                icon: <Home className="w-5 h-5" />
              },
              {
                type: "Commercial", 
                tag: "For Business",
                image: "sample_solar_image.jpg",
                video: MEDIA_CONFIG.services.commercial,
                gradient: "from-blue-600/20 to-blue-700/20",
                borderGradient: "from-blue-600 to-blue-700",
                stats: "500+ Businesses",
                icon: <Building className="w-5 h-5" />
              },
              {
                type: "Industrial",
                tag: "For Industry",
                image: "Solar_product_sample_image.jpg", 
                video: MEDIA_CONFIG.services.industrial,
                gradient: "from-blue-700/20 to-blue-800/20",
                borderGradient: "from-blue-700 to-blue-800",
                stats: "50+ industries",
                icon: <Factory className="w-5 h-5" />
              }
            ].map((service, index) => (
              <Link 
                key={index}
                href={`/services/${service.type.toLowerCase()}`}
                className="relative block group"
                aria-label={`Learn more about our ${service.type} solar services`}
                data-aos="fade-up"
                data-aos-duration="800"
                data-aos-delay={`${index * 200}`}
                onClick={() => trackServiceInteraction(service.type.toLowerCase(), 'click_learn_more')}
              >
                <div className={`relative aspect-[3/4] sm:aspect-[3/4] lg:aspect-[4/5] rounded-lg sm:rounded-2xl lg:rounded-3xl overflow-hidden cursor-pointer transition-all duration-300 ${
                  isDay ? 'shadow-lg sm:shadow-2xl shadow-gray-300/50 hover:shadow-blue-300/30' : 'shadow-lg sm:shadow-2xl shadow-black/50 hover:shadow-blue-900/30'
                }`}>
                  
                  <div className="absolute inset-0">
                    {service.video ? (
                      <OptimizedVideo
                        src={service.video}
                        fallbackSrc={`/Solar_services_video/${service.type.toLowerCase()}_solar.mp4`}
                        poster={supabaseMedia.getOptimizedUrl(service.image)}
                        autoPlay={true}
                        muted={true}
                        loop={true}
                        playsInline={true}
                        preload="metadata"
                        className="w-full h-full object-cover"
                        style={{
                          width: '100%',
                          height: '100%',
                          objectFit: 'cover'
                        }}
                      />
                    ) : (
                      <OptimizedImage 
                        src={service.image} 
                        alt={`${service.type} solar panel installation`}
                        fill={true}
                        className="object-cover"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        priority={index < 2}
                        useSupabase={true}
                      />
                    )}
                  </div>

                  {/* Simple light overlay on hover */}
                  <div className={`absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent group-hover:from-black/40 transition-all duration-300`} />
                  <div className={`absolute inset-0 bg-white/0 group-hover:bg-white/10 transition-all duration-300`} />

                  <div className="absolute inset-0 flex flex-col justify-between p-2 sm:p-4 lg:p-6">
                    {/* Top section with tag */}
                    <div className="flex justify-between items-start">
                      <div className={`inline-flex items-center space-x-1 px-1.5 sm:px-2 lg:px-3 py-0.5 sm:py-1 lg:py-1.5 rounded-full backdrop-blur-md border ${
                        isDay 
                          ? 'bg-white/20 border-white/30 text-white' 
                          : 'bg-black/20 border-white/20 text-white'
                      } text-xs font-medium shadow-lg`}>
                        <div className="w-3 h-3 sm:w-4 sm:h-4 lg:w-5 lg:h-5">
                          {service.icon}
                        </div>
                        <span className="hidden sm:inline">{service.tag}</span>
                      </div>
                    </div>

                    {/* Bottom section with service type */}
                    <div className="space-y-1 sm:space-y-2">
                      <h3 className="text-sm sm:text-xl lg:text-2xl font-bold text-white leading-tight">
                        {service.type}
                        <span className="block text-xs sm:text-sm lg:text-base font-normal text-white/80">Solar Solutions</span>
                      </h3>
                    </div>
                  </div>
                </div>

                {/* Simple stats badge */}
                <div className={`absolute -bottom-0.45 sm:-bottom-2 lg:-bottom-4 left-1/2 transform -translate-x-1/2 px-1.5 sm:px-2 lg:px-4 py-0.5 sm:py-1 lg:py-2 rounded-md sm:rounded-lg lg:rounded-full border border-opacity-50 sm:border-2 transition-all duration-300 backdrop-blur-md ${
                  isDay 
                    ? 'bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200 text-blue-800 shadow-sm sm:shadow-lg group-hover:border-blue-300' 
                    : 'bg-slate-800 border-slate-600 text-white shadow-sm sm:shadow-xl group-hover:border-blue-500'
                }`}>
                  <span className="text-xs sm:text-xs lg:text-sm font-semibold whitespace-nowrap">{service.stats}</span>
                </div>
              </Link>
            ))}
          </div>

            <div className="text-center mt-10 sm:mt-12 lg:mt-16">
            <Link href="/services" className={`group px-4 sm:px-6 lg:px-8 py-2 sm:py-3 lg:py-4 rounded-lg sm:rounded-xl lg:rounded-2xl font-semibold text-sm sm:text-base lg:text-lg transition-all duration-500 inline-flex items-center space-x-2 sm:space-x-3 ${hoverEffects.scale} bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white shadow-lg sm:shadow-xl lg:shadow-2xl hover:shadow-xl sm:hover:shadow-2xl lg:hover:shadow-3xl relative overflow-hidden`}>
              <span className="relative z-10">Explore All Services</span>
              <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6 group-hover:translate-x-1 transition-transform duration-300 relative z-10" />
              
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12 transform -translate-x-full group-hover:translate-x-full transition-all duration-1000 ease-out" />
            </Link>
          </div>
        </div>
      </section>

      {/* Cinematic Solar Technology Showcase */}
      <section className="relative overflow-hidden w-full" aria-label="Solar Technology Showcase">
        <div className="relative w-full">
          
          <div 
            className="relative w-full h-[40vh] sm:h-[50vh] lg:h-[90vh] overflow-hidden group" 
            style={{ paddingTop: '40px' }}
            data-aos="fade-in"
            data-aos-duration="1500"
          >
            <div className="absolute inset-0 w-full h-full" style={{ top: '40px' }}>
              <OptimizedVideo
                src={MEDIA_CONFIG.products.novasys_panels}
                fallbackSrc="/solar_product_video/Novasys_panels_video.mp4"
                poster="/sample_solar_image.jpg"
                autoPlay={true}
                muted={true}
                loop={true}
                playsInline={true}
                preload="metadata"
                className="w-full h-full object-cover transition-transform duration-[3000ms] group-hover:scale-105 cinematic-video product-showcase-video"
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  maxWidth: '100%'
                }}
                id="solar-panel-video"
              />
            </div>

            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" style={{ top: '40px' }} />

            <div className="absolute bottom-0 left-0 right-0 p-2 sm:p-3 lg:p-6">
              <div className="max-w-xl lg:max-w-2xl">
                <h3 className="text-sm sm:text-lg lg:text-3xl font-bold text-white leading-tight mb-1">
                  Novasys 540Wp <span className="font-light text-blue-300">Bi-Facial</span>
                </h3>
                
                <div className="flex flex-wrap items-center gap-1 sm:gap-2 text-white/80 text-xs sm:text-sm mb-1 sm:mb-2">
                  <span>25-Year Warranty</span>
                  <div className="w-1 h-1 bg-white/60 rounded-full hidden sm:block" />
                  <span>Mono PERC</span>
                  <div className="w-1 h-1 bg-white/60 rounded-full hidden sm:block" />
                  <span>540Wp</span>
                </div>

                <div className="flex items-center space-x-1">
                  <div className="w-2 sm:w-3 lg:w-6 h-0.5 bg-white rounded-full" />
                  <div className="w-1 sm:w-1.5 lg:w-3 h-0.5 bg-white/40 rounded-full" />
                  <div className="w-1 sm:w-1.5 lg:w-3 h-0.5 bg-white/40 rounded-full" />
                  <div className="w-1 sm:w-1.5 lg:w-3 h-0.5 bg-white/40 rounded-full" />
                </div>
              </div>
            </div>

            {/* Click to play overlay */}
            <div 
              className="absolute inset-0 bg-transparent cursor-pointer group/play"
              onClick={(event) => {
                const video = document.getElementById('solar-panel-video') as HTMLVideoElement;
                if (video) {
                  video.muted = false;
                  video.play();
                  // Track video interaction
                  trackServiceInteraction('solar_installation', 'video_play');
                }
              }}
            >
              <div className="absolute inset-0 bg-black/0 group-hover/play:bg-black/10 transition-all duration-300" />
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 opacity-0 group-hover/play:opacity-100 transition-all duration-300">
                <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-full bg-white/20 backdrop-blur-md border border-white/30 flex items-center justify-center">
                  <div className="w-0 h-0 border-l-[8px] sm:border-l-[12px] border-l-white border-y-[6px] sm:border-y-[8px] border-y-transparent ml-1"></div>
                </div>
              </div>
            </div>

            <div className="absolute bottom-2 sm:bottom-4 lg:bottom-8 left-1/2 transform -translate-x-1/2">
              <div className="flex flex-col items-center space-y-1 text-white/60">
                <span className="text-xs font-medium tracking-wider uppercase hidden sm:block">Scroll</span>
                <div className="w-2 h-3 sm:w-3 sm:h-5 lg:w-4 lg:h-6 border border-white/40 rounded-full flex justify-center">
                  <div className="w-0.5 h-1 sm:h-1.5 lg:h-2 bg-white/60 rounded-full mt-0.5 sm:mt-1 animate-pulse" />
                </div>
              </div>
            </div>
          </div>

          <div className="w-full h-px bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>

          <div 
            className="relative w-full h-[40vh] sm:h-[50vh] lg:h-[90vh] overflow-hidden group" 
            style={{ paddingTop: '40px' }}
            data-aos="fade-in"
            data-aos-duration="1500"
          >
            <div className="absolute inset-0" style={{ top: '40px' }}>
              <OptimizedVideo
                src={MEDIA_CONFIG.products.microtek_inverter}
                fallbackSrc="/solar_product_video/Microtek_solar_inverter_video.mp4"
                poster="/sample_solar_image.jpg"
                autoPlay={true}
                muted={true}
                loop={true}
                playsInline={true}
                preload="metadata"
                className="w-full h-full object-cover transition-transform duration-[3000ms] group-hover:scale-105 cinematic-video product-showcase-video"
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  maxWidth: '100%'
                }}
                id="inverter-video"
              />
            </div>

            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" style={{ top: '40px' }} />

            <div className="absolute bottom-0 right-0 p-2 sm:p-3 lg:p-6 text-right">
              <div className="max-w-xl lg:max-w-2xl">
                <h3 className="text-sm sm:text-lg lg:text-3xl font-bold text-white leading-tight mb-1">
                  Smart Solar <span className="font-light text-blue-300">Inverter</span>
                </h3>
                
                <div className="flex items-center justify-end space-x-1 sm:space-x-2 text-white/80 text-xs sm:text-sm mb-1 sm:mb-2">
                  <span>MPPT Technology</span>
                  <div className="w-1 h-1 bg-white/60 rounded-full hidden sm:block" />
                  <span>Grid-Tie Ready</span>
                  <div className="w-1 h-1 bg-white/60 rounded-full hidden sm:block" />
                  <span>Wi-Fi Monitoring</span>
                </div>

                <div className="flex items-center justify-end space-x-1">
                  <div className="w-1 sm:w-1.5 lg:w-3 h-0.5 bg-white/40 rounded-full" />
                  <div className="w-2 sm:w-3 lg:w-6 h-0.5 bg-white rounded-full" />
                  <div className="w-1 sm:w-1.5 lg:w-3 h-0.5 bg-white/40 rounded-full" />
                  <div className="w-1 sm:w-1.5 lg:w-3 h-0.5 bg-white/40 rounded-full" />
                </div>
              </div>
            </div>

            {/* Click to play overlay */}
            <div 
              className="absolute inset-0 bg-transparent cursor-pointer group/play"
              onClick={(event) => {
                const video = document.getElementById('inverter-video') as HTMLVideoElement;
                if (video) {
                  video.muted = false;
                  video.play();
                  // Track video interaction
                  trackProductInterest('solar_inverter', 'video_play');
                }
              }}
            >
              <div className="absolute inset-0 bg-black/0 group-hover/play:bg-black/10 transition-all duration-300" />
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 opacity-0 group-hover/play:opacity-100 transition-all duration-300">
                <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-full bg-white/20 backdrop-blur-md border border-white/30 flex items-center justify-center">
                  <div className="w-0 h-0 border-l-[8px] sm:border-l-[12px] border-l-white border-y-[6px] sm:border-y-[8px] border-y-transparent ml-1"></div>
                </div>
              </div>
            </div>
          </div>

          <div className="w-full h-px bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>

          <div 
            className="relative w-full h-[40vh] sm:h-[50vh] lg:h-[90vh] overflow-hidden group" 
            style={{ paddingTop: '40px' }}
            data-aos="fade-in"
            data-aos-duration="1500"
          >
            <div className="absolute inset-0" style={{ top: '40px' }}>
              <OptimizedVideo
                src={MEDIA_CONFIG.products.gi_structure}
                fallbackSrc="/solar_product_video/Gi_structure.mp4"
                poster="/Solar_services_sample_image.jpg"
                autoPlay={true}
                muted={true}
                loop={true}
                playsInline={true}
                preload="metadata"
                className="w-full h-full object-cover transition-transform duration-[3000ms] group-hover:scale-105 cinematic-video product-showcase-video"
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  maxWidth: '100%'
                }}
                id="accessories-video"
              />
            </div>

            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" style={{ top: '40px' }} />

            <div className="absolute bottom-0 right-0 p-2 sm:p-3 lg:p-6 text-right">
              <div className="max-w-xl lg:max-w-2xl">
                <h3 className="text-sm sm:text-lg lg:text-3xl font-bold text-white leading-tight mb-1">
                  Premium <span className="font-light text-blue-300">Accessories</span>
                </h3>
                
                <div className="flex items-center justify-end space-x-1 sm:space-x-2 text-white/80 text-xs sm:text-sm mb-1 sm:mb-2">
                  <span>GI Mounting</span>
                  <div className="w-1 h-1 bg-white/60 rounded-full hidden sm:block" />
                  <span>MC4 Connectors</span>
                  <div className="w-1 h-1 bg-white/60 rounded-full hidden sm:block" />
                  <span>DC Cables</span>
                </div>

                <div className="flex items-center justify-end space-x-1 mb-2 sm:mb-3">
                  <div className="w-1 sm:w-1.5 lg:w-3 h-0.5 bg-white/40 rounded-full" />
                  <div className="w-1 sm:w-1.5 lg:w-3 h-0.5 bg-white/40 rounded-full" />
                  <div className="w-1 sm:w-1.5 lg:w-3 h-0.5 bg-white/40 rounded-full" />
                  <div className="w-2 sm:w-3 lg:w-6 h-0.5 bg-white rounded-full" />
                </div>

                <button className="group px-2 sm:px-3 lg:px-6 py-1 sm:py-1.5 bg-white/10 backdrop-blur-md border border-white/20 rounded-full text-white font-medium text-xs sm:text-sm hover:bg-white/20 transition-all duration-500 flex items-center space-x-1 sm:space-x-2">
                  <span className="hidden sm:inline">Explore Our Solar Technology</span>
                  <span className="sm:hidden">Explore</span>
                  <ArrowRight className="w-3 h-3 sm:w-4 sm:h-4 group-hover:translate-x-1 transition-transform duration-300" />
                </button>
              </div>
            </div>

            {/* Click to play overlay */}
            <div 
              className="absolute inset-0 bg-transparent cursor-pointer group/play"
              onClick={(event) => {
                const video = document.getElementById('accessories-video') as HTMLVideoElement;
                if (video) {
                  video.muted = false;
                  video.play();
                }
              }}
            >
              <div className="absolute inset-0 bg-black/0 group-hover/play:bg-black/10 transition-all duration-300" />
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 opacity-0 group-hover/play:opacity-100 transition-all duration-300">
                <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-full bg-white/20 backdrop-blur-md border border-white/30 flex items-center justify-center">
                  <div className="w-0 h-0 border-l-[8px] sm:border-l-[12px] border-l-white border-y-[6px] sm:border-y-[8px] border-y-transparent ml-1"></div>
                </div>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* Video Customer Reviews */}
      <section 
        aria-labelledby="testimonials-heading"
        className={`py-8 sm:py-16 transition-all duration-500 ${
          isDay ? 'bg-gradient-to-br from-blue-50 to-blue-100' : 'bg-slate-900'
        }`}
        data-aos="fade-up"
        data-aos-duration="1000"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-6 sm:mb-8 lg:mb-12" data-aos="fade-up" data-aos-duration="800">
            <div className={`inline-block px-3 sm:px-4 lg:px-6 py-1.5 sm:py-2 rounded-full mb-3 sm:mb-4 ${
              isDay ? 'bg-blue-100 text-blue-800' : 'bg-blue-900/50 text-blue-300'
            }`}>
              <span className="text-xs sm:text-sm font-semibold tracking-wide">VIDEO TESTIMONIALS</span>
            </div>
            <h2 id="testimonials-heading" className={`text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold mb-2 sm:mb-4 ${themeClasses.textPrimary} ${TRANSITION_CLASSES.colors}`}>
              Real Stories from Our Customers
            </h2>
            <p className={`text-sm sm:text-base lg:text-lg max-w-3xl mx-auto ${themeClasses.textSecondary} ${TRANSITION_CLASSES.colors}`}>
              Watch authentic video reviews from satisfied customers across Madhya Pradesh who have embraced solar energy with us.
            </p>
          </div>
          <Suspense fallback={<div className="text-center">Loading reviews...</div>}>
            <VideoReviewSection isDay={isDay} />
          </Suspense>
        </div>
      </section>

      {/* Enhanced Projects Showcase */}
      <section 
        ref={projectsRef}
        data-animate="projects"
        id="projects" 
        aria-labelledby="projects-heading"
        className={`py-8 sm:py-16 transition-all duration-500 ${
          isDay ? 'bg-gradient-to-br from-blue-50 to-blue-100' : 'bg-slate-800'
        }`}
        data-aos="fade-up"
        data-aos-duration="1000"
      >
        <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className={getAnimationClass('projects', 'text-center mb-6 sm:mb-8 lg:mb-12')}>
            <h2 id="projects-heading" className={`text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold mb-2 sm:mb-4 transition-colors duration-500 ${
              isDay ? 'text-slate-800' : 'text-slate-100'
            }`}>
              Featured Projects & Success Stories
            </h2>
            <p className={`max-w-3xl mx-auto text-sm sm:text-base lg:text-lg transition-colors duration-500 ${
              isDay ? 'text-slate-600' : 'text-slate-300'
            }`}>
              Delivering excellence across India with enterprise-grade solar installations and measurable results.
            </p>
          </div>

          {/* Mobile: Horizontal scroll, Desktop: Grid */}
          <div className="md:hidden mb-6 sm:mb-8" data-aos="fade-up" data-aos-duration="1000" data-aos-delay="300">
            <div className="flex gap-4 overflow-x-auto pb-4 px-2">
              {[
                {
                  title: 'Trident Group Industrial Complex',
                  capacity: '5.4 MW',
                  location: 'Budhni, MP',
                  type: 'Industrial',
                  savings: '₹4.2Cr annually',
                  carbonReduction: '5,400 tons CO₂/year',
                  paybackPeriod: '4.2 years',
                  image: 'sample_solar_image.jpg',
                  status: 'Operational',
                  description: 'Large-scale rooftop installation with advanced monitoring systems'
                },
                {
                  title: 'Medicap University Campus',
                  capacity: '240 kW',
                  location: 'Indore, MP',
                  type: 'Educational',
                  savings: '₹28L annually',
                  carbonReduction: '240 tons CO₂/year',
                  paybackPeriod: '5.1 years',
                  image: 'sample_solar_image.jpg',
                  status: 'Operational',
                  description: 'Grid-tied system powering academic facilities and hostels'
                },
                {
                  title: 'Pushp Masale Manufacturing',
                  capacity: '225 kW',
                  location: 'Indore, MP',
                  type: 'Manufacturing',
                  savings: '₹26L annually',
                  carbonReduction: '225 tons CO₂/year',
                  paybackPeriod: '4.8 years',
                  image: 'sample_solar_image.jpg',
                  status: 'Operational',
                  description: 'Hybrid system with battery backup for continuous operations'
                }
              ].map((project, index) => (
                <Link 
                  key={index} 
                  href={`/projects/${index + 1}`}
                  aria-label={`View details for project: ${project.title}`}
                  className="flex-shrink-0 w-64 block rounded-xl shadow-lg border hover:shadow-xl cursor-pointer transition-all duration-300 overflow-hidden group"
                  style={{ transitionDelay: `${index * 150}ms` }}
                >
                  <div className="relative h-24 overflow-hidden">
                    <OptimizedImage 
                      src={project.image} 
                      alt={`Solar installation for ${project.title}`}
                      fill={true}
                      className="object-cover transition-transform duration-500 group-hover:scale-110"
                      sizes="256px"
                      useSupabase={true}
                    />
                    <div className="absolute top-2 left-2">
                      <span className={`px-2 py-0.5 rounded-full text-xs font-semibold ${
                        project.status === 'Operational' 
                          ? 'bg-blue-100 text-blue-800' 
                          : 'bg-yellow-100 text-yellow-800'
                      }`}>
                        {project.status}
                      </span>
                    </div>
                    <div className="absolute top-2 right-2">
                      <span className={`px-2 py-0.5 rounded-full text-xs font-semibold ${
                        isDay 
                          ? 'bg-white/90 text-gray-800' 
                          : 'bg-slate-800/90 text-gray-200'
                      }`}>
                        {project.type}
                      </span>
                    </div>
                    
                    <div className={`absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-all duration-300`} />
                  </div>
                  
                  <div className="p-3">
                    <div className="flex items-center justify-between mb-2">
                      <div className={`text-lg font-bold ${TRANSITION_CLASSES.colors} ${
                        isDay ? 'text-blue-600' : 'text-blue-400'
                      } group-hover:scale-105 transition-transform duration-300`}>
                        {project.capacity}
                      </div>
                      <div className={`text-xs px-2 py-1 rounded ${TRANSITION_CLASSES.normal} ${
                        isDay 
                          ? 'text-amber-700 bg-amber-100' 
                          : 'text-blue-300 bg-blue-900/50'
                      }`}>
                        ROI: {project.paybackPeriod}
                      </div>
                    </div>
                    
                    <h3 className={`text-sm font-semibold mb-1 line-clamp-2 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r ${
                      isDay ? 'group-hover:from-blue-600 group-hover:to-blue-700' : 'group-hover:from-blue-400 group-hover:to-blue-600'
                    } transition-all duration-300 ${themeClasses.textPrimary} ${TRANSITION_CLASSES.colors}`}>
                      {project.title}
                    </h3>
                    <p className={`text-xs mb-2 ${themeClasses.textSecondary} ${TRANSITION_CLASSES.colors}`}>
                      {project.location}
                    </p>
                    
                    <div className={`space-y-1 border-t pt-2 ${isDay ? 'border-gray-200' : 'border-slate-600'} ${TRANSITION_CLASSES.normal}`}>
                      <div className="flex justify-between text-xs">
                        <span className={`${themeClasses.textSecondary} ${TRANSITION_CLASSES.colors}`}>
                          Savings
                        </span>
                        <span className={`font-semibold ${TRANSITION_CLASSES.colors} ${
                          isDay ? 'text-blue-600' : 'text-blue-400'
                        }`}>
                          {project.savings}
                        </span>
                      </div>
                      <div className="flex justify-between text-xs">
                        <span className={`${themeClasses.textSecondary} ${TRANSITION_CLASSES.colors}`}>
                          CO₂ Saved
                        </span>
                        <span className={`font-semibold ${TRANSITION_CLASSES.colors} ${
                          isDay ? 'text-blue-600' : 'text-blue-400'
                        }`}>
                          {project.carbonReduction.split(' ')[0]} tons/yr
                        </span>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>

          {/* Desktop: Grid layout */}
          <div className="hidden md:grid md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 max-w-6xl mx-auto mb-8 sm:mb-12" data-aos="fade-up" data-aos-duration="1000" data-aos-delay="300">
            {[
              {
                title: 'Trident Group Industrial Complex',
                capacity: '5.4 MW',
                location: 'Budhni, MP',
                type: 'Industrial',
                savings: '₹4.2Cr annually',
                carbonReduction: '5,400 tons CO₂/year',
                paybackPeriod: '4.2 years',
                image: 'sample_solar_image.jpg',
                status: 'Operational',
                description: 'Large-scale rooftop installation with advanced monitoring systems'
              },
              {
                title: 'Medicap University Campus',
                capacity: '240 kW',
                location: 'Indore, MP',
                type: 'Educational',
                savings: '₹28L annually',
                carbonReduction: '240 tons CO₂/year',
                paybackPeriod: '5.1 years',
                image: 'sample_solar_image.jpg',
                status: 'Operational',
                description: 'Grid-tied system powering academic facilities and hostels'
              },
              {
                title: 'Pushp Masale Manufacturing',
                capacity: '225 kW',
                location: 'Indore, MP',
                type: 'Manufacturing',
                savings: '₹26L annually',
                carbonReduction: '225 tons CO₂/year',
                paybackPeriod: '4.8 years',
                image: 'sample_solar_image.jpg',
                status: 'Operational',
                description: 'Hybrid system with battery backup for continuous operations'
              }
            ].map((project, index) => (
              <Link 
                key={index} 
                href={`/projects/${index + 1}`}
                aria-label={`View details for project: ${project.title}`}
                className={getStaggeredAnimation('projects', index, `block rounded-xl shadow-lg border hover:shadow-xl cursor-pointer transition-all duration-300 overflow-hidden group`)}
                style={{ transitionDelay: `${index * 150}ms` }}
              >
                <div className="relative h-40 sm:h-48 overflow-hidden">
                  <OptimizedImage 
                    src={project.image} 
                    alt={`Solar installation for ${project.title}`}
                    fill={true}
                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    useSupabase={true}
                  />
                  <div className="absolute top-3 sm:top-4 left-3 sm:left-4">
                    <span className={`px-2 sm:px-3 py-1 rounded-full text-xs font-semibold ${
                      project.status === 'Operational' 
                        ? 'bg-blue-100 text-blue-800' 
                        : 'bg-yellow-100 text-yellow-800'
                    }`}>
                      {project.status}
                    </span>
                  </div>
                  <div className="absolute top-3 sm:top-4 right-3 sm:right-4">
                    <span className={`px-2 sm:px-3 py-1 rounded-full text-xs font-semibold ${
                      isDay 
                        ? 'bg-white/90 text-gray-800' 
                        : 'bg-slate-800/90 text-gray-200'
                    }`}>
                      {project.type}
                    </span>
                  </div>
                  
                  <div className={`absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-all duration-300`} />
                </div>
                
                <div className="p-4 sm:p-6">
                  <div className="flex items-center justify-between mb-3">
                    <div className={`text-xl sm:text-2xl font-bold ${TRANSITION_CLASSES.colors} ${
                      isDay ? 'text-blue-600' : 'text-blue-400'
                    } group-hover:scale-105 transition-transform duration-300`}>
                      {project.capacity}
                    </div>
                    <div className={`text-xs sm:text-sm px-2 py-1 rounded ${TRANSITION_CLASSES.normal} ${
                      isDay 
                        ? 'text-amber-700 bg-amber-100' 
                        : 'text-blue-300 bg-blue-900/50'
                    }`}>
                      ROI: {project.paybackPeriod}
                    </div>
                  </div>
                  
                  <h3 className={`text-base sm:text-lg font-semibold mb-2 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r ${
                    isDay ? 'group-hover:from-blue-600 group-hover:to-blue-700' : 'group-hover:from-blue-400 group-hover:to-blue-600'
                  } transition-all duration-300 ${themeClasses.textPrimary} ${TRANSITION_CLASSES.colors}`}>
                    {project.title}
                  </h3>
                  <p className={`text-xs sm:text-sm mb-3 ${themeClasses.textSecondary} ${TRANSITION_CLASSES.colors}`}>
                    {project.location}
                  </p>
                  <p className={`text-xs sm:text-sm mb-4 ${themeClasses.textSecondary} ${TRANSITION_CLASSES.colors}`}>
                    {project.description}
                  </p>
                  
                  <div className={`space-y-2 sm:space-y-3 border-t pt-3 sm:pt-4 ${isDay ? 'border-gray-200' : 'border-slate-600'} ${TRANSITION_CLASSES.normal}`}>
                    <div className="flex justify-between text-xs sm:text-sm">
                      <span className={`${themeClasses.textSecondary} ${TRANSITION_CLASSES.colors}`}>
                        Annual Savings
                      </span>
                      <span className={`font-semibold ${TRANSITION_CLASSES.colors} ${
                        isDay ? 'text-blue-600' : 'text-blue-400'
                      }`}>
                        {project.savings}
                      </span>
                    </div>
                    <div className="flex justify-between text-xs sm:text-sm">
                      <span className={`${themeClasses.textSecondary} ${TRANSITION_CLASSES.colors}`}>
                        CO₂ Reduction
                      </span>
                      <span className={`font-semibold ${TRANSITION_CLASSES.colors} ${
                        isDay ? 'text-blue-600' : 'text-blue-400'
                      }`}>
                        {project.carbonReduction}
                      </span>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>

          <div className={getAnimationClass('projects', 'text-center')} data-aos="fade-up" data-aos-duration="800" data-aos-delay="400">
            <Link href="/projects" className={`px-6 sm:px-8 py-2 sm:py-3 rounded-lg font-semibold text-white transition-all duration-300 inline-flex items-center space-x-2 group ${hoverEffects.scale} ${
              isDay 
                ? 'bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 shadow-lg hover:shadow-xl' 
                : 'bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 shadow-lg hover:shadow-xl'
            }`}>
              <span className="text-sm sm:text-base">View All Projects</span>
              <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 group-hover:translate-x-1 transition-transform duration-300" />
            </Link>
          </div>
        </div>
      </section>

      {/* Ready to Go Solar Section - Completely Restructured */}
      <section 
        ref={contactRef}
        data-animate="contact"
        id="contact" 
        aria-labelledby="contact-heading"
        className={`py-6 sm:py-12 lg:py-20 transition-all duration-500 ${
          isDay ? 'bg-gradient-to-br from-blue-50 via-blue-100 to-cyan-50' : 'bg-gradient-to-br from-slate-900 via-slate-800 to-blue-900'
        }`}
        data-aos="fade-up"
        data-aos-duration="1000"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Section Header */}
          <div className="text-center mb-4 sm:mb-8 lg:mb-16" data-aos="fade-up" data-aos-duration="800">
            <div className={`inline-flex items-center space-x-1 lg:space-x-2 px-3 lg:px-4 py-1.5 lg:py-2 rounded-full mb-2 lg:mb-4 ${
              isDay ? 'bg-blue-200 text-blue-900' : 'bg-blue-800/30 text-blue-300'
            }`}>
              <Zap className="w-3 h-3 lg:w-4 lg:h-4" />
              <span className="text-xs lg:text-sm font-bold tracking-wide">SOLAR SOLUTIONS</span>
            </div>
            <h2 id="contact-heading" className={`text-2xl sm:text-3xl md:text-4xl xl:text-5xl font-bold mb-2 lg:mb-4 ${
              isDay ? 'text-transparent bg-clip-text bg-gradient-to-r from-blue-700 to-blue-900' : 'text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400'
            }`}>
              Ready to Go Solar?
            </h2>
            <p className={`text-sm sm:text-lg md:text-xl max-w-3xl mx-auto leading-relaxed ${
              isDay ? 'text-slate-700' : 'text-slate-300'
            }`}>
              Transform your energy costs with professional solar solutions. Get expert consultation and guaranteed performance.
            </p>
          </div>

          {/* Main Content Grid */}
          <div className="grid lg:grid-cols-12 gap-4 sm:gap-8 lg:gap-12">
            
            {/* Left Column - Contact Information */}
            <div className="lg:col-span-4" data-aos="fade-right" data-aos-duration="1000" data-aos-delay="200">
              <div className={`h-full p-3 sm:p-6 lg:p-8 rounded-xl lg:rounded-2xl border lg:border-2 shadow-lg lg:shadow-xl ${
                isDay 
                  ? 'bg-gradient-to-br from-white to-blue-50 border-blue-200 shadow-blue-200/20' 
                  : 'bg-gradient-to-br from-slate-800 to-blue-900/20 border-slate-600 shadow-blue-900/30'
              }`}>
                {/* Contact Header */}
                <div className="text-center mb-3 lg:mb-6">
                  <div className={`inline-flex items-center space-x-1 lg:space-x-2 px-2 lg:px-3 py-1 lg:py-1.5 rounded-full mb-2 lg:mb-4 ${
                    isDay ? 'bg-blue-100 text-blue-800' : 'bg-blue-900/50 text-blue-300'
                  }`}>
                    <Phone className="w-3 h-3 lg:w-4 lg:h-4" />
                    <span className="text-xs font-semibold tracking-wide">CONTACT INFO</span>
                  </div>
                  <h3 className={`text-lg lg:text-2xl font-bold mb-1 lg:mb-2 ${
                    isDay ? 'text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-blue-800' : 'text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400'
                  }`}>
                    Get in Touch
                  </h3>
                  <p className={`text-xs lg:text-sm ${isDay ? 'text-slate-600' : 'text-slate-400'}`}>
                    Multiple ways to reach our solar experts
                  </p>
                </div>

                {/* Contact Methods */}
                <div className="space-y-2 lg:space-y-4 mb-4 lg:mb-8">
                  {[
                    { 
                      icon: <Phone className="w-5 h-5" />, 
                      title: 'Phone Support', 
                      value: '+91 8818880540', 
                      desc: 'Direct technical consultation',
                      action: 'tel:+918818880540',
                      color: 'text-green-600'
                    },
                    { 
                      icon: <Mail className="w-5 h-5" />, 
                      title: 'Email Consultation', 
                      value: 'info@autosysindore.com', 
                      desc: 'Detailed project discussions',
                      action: 'mailto:info@autosysindore.com',
                      color: 'text-blue-600'
                    },
                    { 
                      icon: <MapPin className="w-5 h-5" />, 
                      title: 'Visit Our Office', 
                      value: 'A-1/C, Pologround Road, Indore', 
                      desc: 'Experience center & showroom',
                      action: '#',
                      color: 'text-purple-600'
                    }
                  ].map((contact, index) => (
                    <a 
                      key={index} 
                      href={contact.action}
                      className={`block p-2 lg:p-4 rounded-lg lg:rounded-xl border transition-all duration-300 hover:shadow-lg hover:-translate-y-1 cursor-pointer group ${
                        isDay 
                          ? 'bg-gradient-to-r from-white to-blue-50 border-blue-200 hover:border-blue-300 hover:shadow-blue-200/30' 
                          : 'bg-slate-700 border-slate-600 hover:bg-slate-600 hover:border-slate-500'
                      }`}
                    >
                      <div className="flex items-start space-x-2 lg:space-x-4">
                        <div className={`w-8 h-8 lg:w-12 lg:h-12 rounded-lg lg:rounded-xl flex items-center justify-center ${contact.color} ${
                          isDay ? 'bg-white shadow-md' : 'bg-slate-800'
                        } group-hover:scale-110 transition-transform duration-300`}>
                          <div className="w-4 h-4 lg:w-5 lg:h-5">{contact.icon}</div>
                        </div>
                        <div className="flex-1 min-w-0">
                          <h4 className={`font-semibold text-sm lg:text-base mb-0.5 lg:mb-1 ${
                            isDay ? 'text-slate-900' : 'text-white'
                          }`}>
                            {contact.title}
                          </h4>
                          <p className={`font-medium text-xs lg:text-sm mb-0.5 lg:mb-1 ${contact.color}`}>
                            {contact.value}
                          </p>
                          <p className={`text-xs ${
                            isDay ? 'text-slate-600' : 'text-slate-400'
                          }`}>
                            {contact.desc}
                          </p>
                        </div>
                        <div className={`p-1.5 lg:p-2 rounded-md lg:rounded-lg ${
                          isDay ? 'bg-blue-100 text-blue-600' : 'bg-blue-900/50 text-blue-400'
                        } group-hover:scale-110 transition-transform duration-300`}>
                          <ArrowRight className="w-3 h-3 lg:w-4 lg:h-4" />
                        </div>
                      </div>
                    </a>
                  ))}
                </div>

                {/* Company Stats */}
                <div className={`p-2 lg:p-4 rounded-lg lg:rounded-xl ${
                  isDay ? 'bg-gradient-to-r from-blue-50 to-cyan-50' : 'bg-gradient-to-r from-blue-900/30 to-cyan-900/30'
                }`}>
                  <div className="grid grid-cols-3 gap-2 lg:gap-4 text-center">
                    {[
                      { number: '18+', label: 'Years Experience', icon: <Award className="w-3 h-3 lg:w-4 lg:h-4" /> },
                      { number: '2000+', label: 'Happy Customers', icon: <Users className="w-3 h-3 lg:w-4 lg:h-4" /> },
                      { number: '24/7', label: 'Support Available', icon: <Shield className="w-3 h-3 lg:w-4 lg:h-4" /> }
                    ].map((stat, index) => (
                      <div key={index} className="space-y-1 lg:space-y-2">
                        <div className={`inline-flex items-center justify-center w-6 h-6 lg:w-10 lg:h-10 rounded-full ${
                          isDay ? 'bg-blue-100 text-blue-600' : 'bg-blue-800 text-blue-300'
                        }`}>
                          {stat.icon}
                        </div>
                        <div className={`text-sm lg:text-xl font-bold ${
                          isDay ? 'text-blue-700' : 'text-blue-300'
                        }`}>
                          {stat.number}
                        </div>
                        <div className={`text-xs leading-tight ${
                          isDay ? 'text-slate-600' : 'text-slate-400'
                        }`}>
                          {stat.label}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Center Column - Solar Quote Form */}
            <div className="lg:col-span-5" data-aos="fade-up" data-aos-duration="1000" data-aos-delay="400">
              <ContactForm
                formType="homepage"
                title="Get Your Solar Quote"
                subtitle="Personalized proposal with detailed ROI analysis"
                showUserTypeSelection={true}
                isCompact={false}
                isDay={isDay}
                onSuccess={(data) => {
                  console.log('Homepage contact form submitted:', data);
                }}
                onError={(error) => {
                  console.error('Homepage contact form error:', error);
                }}
              />
            </div>

            {/* Right Column - Call to Action */}
            <div className="lg:col-span-3" data-aos="fade-left" data-aos-duration="1000" data-aos-delay="600">
              <div className={`h-full p-3 sm:p-6 lg:p-8 rounded-xl lg:rounded-2xl border lg:border-2 shadow-lg lg:shadow-xl text-center ${
                isDay 
                  ? 'bg-gradient-to-br from-blue-600 to-blue-800 border-blue-400 text-white' 
                  : 'bg-gradient-to-br from-blue-800 to-purple-900 border-blue-600 text-white'
              }`}>
                {/* CTA Header */}
                <div className="mb-3 lg:mb-6">
                  <div className="inline-flex items-center space-x-1 lg:space-x-2 px-2 lg:px-3 py-1 lg:py-1.5 rounded-full mb-2 lg:mb-4 bg-white/20 backdrop-blur-sm">
                    <Star className="w-3 h-3 lg:w-4 lg:h-4" />
                    <span className="text-xs font-semibold tracking-wide">START TODAY</span>
                  </div>
                  <h3 className="text-lg lg:text-2xl font-bold mb-2 lg:mb-3 text-white">
                    Start Saving Today
                  </h3>
                  <p className="text-blue-100 leading-relaxed text-xs lg:text-sm">
                    Join 2000+ satisfied customers who are already saving with solar energy
                  </p>
                </div>

                {/* Action Buttons */}
                <div className="space-y-2 lg:space-y-4 mb-3 lg:mb-6">
                  <a 
                    href="tel:+918818880540" 
                    className="w-full px-3 lg:px-6 py-2.5 lg:py-4 rounded-lg lg:rounded-xl font-bold bg-white text-blue-700 hover:bg-blue-50 transition-all duration-300 flex items-center justify-center space-x-2 lg:space-x-3 shadow-md lg:shadow-lg hover:shadow-lg lg:hover:shadow-xl group"
                  >
                    <Phone className="w-4 h-4 lg:w-5 lg:h-5 group-hover:scale-110 transition-transform duration-300" />
                    <span className="text-sm lg:text-base">Call Now: +91 8818880540</span>
                  </a>
                  
                  <Link 
                    href="/video-test" 
                    className="w-full px-3 lg:px-6 py-2.5 lg:py-4 rounded-lg lg:rounded-xl font-bold border lg:border-2 border-white text-white hover:bg-white/10 transition-all duration-300 flex items-center justify-center space-x-2 lg:space-x-3 group"
                  >
                    <Play className="w-4 h-4 lg:w-5 lg:h-5 group-hover:scale-110 transition-transform duration-300" />
                    <span className="text-sm lg:text-base">Watch Demo</span>
                  </Link>
                </div>

                {/* Quick Features */}
                <div className="space-y-1.5 lg:space-y-3">
                  {[
                    'Free site assessment',
                    '25-year warranty',
                    'Government subsidy support',
                    'EMI options available'
                  ].map((feature, index) => (
                    <div key={index} className="flex items-center space-x-2 lg:space-x-3 text-blue-100">
                      <CheckCircle className="w-3 h-3 lg:w-4 lg:h-4 text-green-400 flex-shrink-0" />
                      <span className="text-xs lg:text-sm">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section 
        aria-labelledby="faq-heading"
        className={`py-8 sm:py-12 transition-all duration-500 ${
          isDay ? 'bg-gradient-to-br from-blue-50 to-blue-100' : 'bg-gradient-to-br from-slate-800 to-slate-700'
        }`}
        data-aos="fade-up"
        data-aos-duration="1000"
      >
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-4 sm:mb-6" data-aos="fade-up" data-aos-duration="800">
            <h2 id="faq-heading" className={`text-xl sm:text-2xl md:text-3xl font-bold mb-2 sm:mb-3 ${themeClasses.textPrimary} ${TRANSITION_CLASSES.colors}`}>
              Frequently Asked Questions
            </h2>
            <p className={`text-sm sm:text-base ${themeClasses.textSecondary} ${TRANSITION_CLASSES.colors}`}>
              Get answers to common questions about solar installation and benefits.
            </p>
          </div>

          <div data-aos="fade-up" data-aos-duration="1000" data-aos-delay="200">
            <Suspense fallback={<div className="text-center">Loading FAQ...</div>}>
              <FAQ />
            </Suspense>
          </div>

          <div className="text-center mt-4 sm:mt-6">
            <p className={`mb-3 sm:mb-4 text-xs sm:text-sm ${themeClasses.textSecondary} ${TRANSITION_CLASSES.colors}`}>
              Still have questions? Our experts are here to help!
            </p>
            <Link href="/contact" className={`px-4 sm:px-6 py-2 sm:py-3 rounded-lg font-semibold text-white transition-all duration-300 text-xs sm:text-sm ${hoverEffects.scale} ${
              isDay 
                ? 'bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800' 
                : 'bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700'
            }`}>
              Contact Our Experts
            </Link>
          </div>
        </div>
      </section>

      <Footer />
      <FloatingActionButton />
      </div>
    </>
  );
}
