'use client';
import React, { useState, useEffect } from 'react';
import { useTheme } from '@/contexts/ThemeContext';
import { getThemeClasses, getThemeHover, TRANSITION_CLASSES } from '@/utils/themeUtils';
import { Product } from '@/types/product';
import { 
  ArrowLeft,
  Home, 
  Building2, 
  Factory, 
  Wrench, 
  Shield, 
  Zap,
  Star,
  CheckCircle,
  Clock,
  Award,
  TrendingUp,
  Users,
  Phone,
  Mail,
  Calendar,
  Download,
  Share2,
  Heart,
  MapPin,
  ChevronRight,
  PlayCircle,
  FileText,
  Calculator,
  Lightbulb,
  BarChart3,
  Target,
  ThumbsUp,
  ArrowRight,
  ShoppingCart,
  Package,
  AlertCircle,
  BadgeCheck,
  Play,
  FileDown,
  ExternalLink,
  Youtube,
  Monitor,
  Smartphone
} from 'lucide-react';
import Header from '@/components/home/Header';
import Footer from '@/components/home/Footer';
import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation';
import { getProductById, getRelatedProducts } from '@/data/products';
import { notFound } from 'next/navigation';

export default function ProductDetailPage() {
  const params = useParams();
  const router = useRouter();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('overview');
  const [selectedImage, setSelectedImage] = useState(0);
  const [isLiked, setIsLiked] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const [showImageModal, setShowImageModal] = useState(false);
  const [product, setProduct] = useState<Product | null>(null);
  const [relatedProducts, setRelatedProducts] = useState<Product[]>([]);
  
  const { theme, isDay, isNight } = useTheme();
  const themeClasses = getThemeClasses(theme);
  const hoverEffects = getThemeHover(theme);

  const productId = params?.id as string;

  useEffect(() => {
    const fetchProductData = async () => {
      try {
        setIsLoading(true);
        const productData = await getProductById(productId);
        
        if (!productData) {
          notFound();
          return;
        }

        setProduct(productData);
        
        // Fetch related products
        const related = await getRelatedProducts(productData, 4);
        setRelatedProducts(related);
      } catch (error) {
        console.error('Error fetching product:', error);
        notFound();
      } finally {
        setIsLoading(false);
      }
    };

    if (productId) {
      fetchProductData();
    }
  }, [productId]);

  // Helper to extract YouTube video ID from URL
  const getYouTubeVideoId = (url: string): string | null => {
    if (!url) return null;
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
    const match = url.match(regExp);
    return (match && match[2].length === 11) ? match[2] : null;
  };

  // Helper to shorten long warranty strings for compact display (e.g. "25-Year Performance Warranty" -> "25-Year")
  const shortenWarranty = (w?: string) => {
    if (!w) return 'N/A';
    const t = w.trim();
    if (!t) return 'N/A';
    const tokens = t.split(/\s+/);
    // if first token contains digits or a hyphen (e.g. "25-Year" or "25"), prefer it
    if (/\d/.test(tokens[0]) || tokens[0].includes('-')) return tokens[0];
    // otherwise, return first two tokens to keep it short but meaningful
    return tokens.slice(0, 2).join(' ');
  };

  // Helper to shorten lead time strings (e.g. "4-6 weeks" -> "4-6" or "6 weeks" -> "6")
  const shortenLeadTime = (l?: string) => {
    if (!l) return 'N/A';
    const t = l.trim();
    if (!t) return 'N/A';
    const tokens = t.split(/\s+/);
    // prefer first token which often contains numeric or numeric-range
    if (tokens.length > 0) return tokens[0];
    return t;
  };

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 800);
    
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    
    return () => {
      clearTimeout(timer);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  if (isLoading) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900">
        <div className="text-center">
          <div className="relative">
            <div className="w-16 h-16 border-3 border-blue-200 border-t-blue-500 rounded-full animate-spin mx-auto mb-4"></div>
          </div>
          <div className="text-white text-lg font-semibold mb-2">Loading Product Details</div>
          <div className="text-blue-300 text-sm">Preparing Information...</div>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900">
        <div className="text-center">
          <div className="text-white text-lg font-semibold mb-2">Product Not Found</div>
          <div className="text-blue-300 text-sm">The requested product could not be found.</div>
        </div>
      </div>
    );
  }

  const tabs = [
    { id: 'overview', label: 'Overview', icon: Home },
    { id: 'specifications', label: 'Specifications', icon: Star },
    { id: 'media', label: 'Media', icon: Play },
    { id: 'documents', label: 'Documents', icon: FileText },
    { id: 'applications', label: 'Applications', icon: Target },
    { id: 'quote', label: 'Quote', icon: Calculator }
  ];

  return (
    <div className="relative min-h-screen">
      {/* Background */}
      <div className="fixed inset-0 z-0">
        <div className={`absolute inset-0 transition-all duration-1000 ${
          isDay 
            ? 'bg-gradient-to-br from-blue-50 via-blue-50 to-white' 
            : 'bg-gradient-to-br from-slate-900 via-blue-900 to-slate-800'
        }`} />
      </div>

      <div className="relative z-10">
        <Header isScrolled={isScrolled} />
        
        {/* Breadcrumb */}
        <section className="pt-20 pb-6 sm:pb-8 md:pb-12 lg:pb-16">
          <div className="max-w-7xl mx-auto px-6">
            <div className="flex items-center gap-2 text-xs md:text-sm">
              <Link href="/" className={`${isDay ? 'text-slate-600 hover:text-blue-600' : 'text-slate-400 hover:text-blue-400'} transition-colors`}>
                Home
              </Link>
              <ChevronRight className="w-3 h-3 md:w-4 md:h-4" />
              <Link href="/products" className={`${isDay ? 'text-slate-600 hover:text-amber-600' : 'text-slate-400 hover:text-blue-400'} transition-colors`}>
                Products
              </Link>
              <ChevronRight className="w-3 h-3 md:w-4 md:h-4" />
              <span className={`${isDay ? 'text-amber-600' : 'text-blue-400'} font-medium`}>
                {product.title}
              </span>
            </div>
          </div>
        </section>

        {/* Hero Section */}
        <section className="pb-4 sm:pb-6 md:pb-12 lg:pb-16">
          <div className="max-w-7xl mx-auto px-6">
            <div className="grid lg:grid-cols-2 gap-4 md:gap-8 lg:gap-12">
              
              {/* Image Gallery */}
              <div className="flex flex-col h-full">
                {/* Main Image */}
                <div className="relative aspect-video rounded-lg md:rounded-2xl overflow-hidden flex-shrink-0">
                  <img 
                    src={product.images?.[selectedImage]?.image_url || ''} 
                    alt={product.title}
                    className="w-full h-full object-cover"
                  />
                  <div className={`absolute inset-0 ${
                    isDay 
                      ? 'bg-gradient-to-t from-amber-500/20 to-transparent' 
                      : 'bg-gradient-to-t from-blue-500/20 to-transparent'
                  }`}></div>
                  
                  {/* Badge */}
                  {(product.is_popular || product.is_featured) && (
                    <div className={`absolute top-2 md:top-4 right-2 md:right-4 px-2 md:px-3 py-1 rounded-full text-xs font-bold ${
                      product.is_popular 
                        ? 'bg-green-500 text-white' 
                        : 'bg-purple-500 text-white'
                    }`}>
                      {product.is_popular ? 'POPULAR' : 'FEATURED'}
                    </div>
                  )}    
                </div>
                
                {/* Thumbnail Gallery - Compact Design */}
                <div className="mt-2 sm:mt-3 md:mt-4 flex-1 flex flex-col justify-start">
                  <div className="grid grid-cols-3 gap-1 sm:gap-1.5 md:gap-2 max-w-sm">
                    {(() => {
                      const displayItems = [];
                      const maxVisible = 3;
                      
                      // First item: always first image
                      displayItems.push(
                        <button
                          key={0}
                          onClick={() => setSelectedImage(0)}
                          className={`aspect-video rounded-sm sm:rounded md:rounded-lg overflow-hidden border-2 transition-all ${
                            selectedImage === 0
                              ? isDay ? 'border-amber-500' : 'border-blue-500'
                              : 'border-transparent'
                          }`}
                        >
                          <img 
                            src={product.images?.[0]?.image_url || ''} 
                            alt={`${product.title} 1`}
                            className="w-full h-full object-cover"
                          />
                        </button>  
                      );
                      
                      // Second item: video if available, otherwise second image
                      if (product.videos && product.videos.length > 0 && product.videos[0].youtube_url) {
                        const videoId = getYouTubeVideoId(product.videos[0].youtube_url);
                        displayItems.push(
                          <button
                            key="video"
                            onClick={() => {
                              // Set to video preview mode or handle video click
                              const videoModal = document.createElement('div');
                              videoModal.className = 'fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-75 p-2';
                              videoModal.innerHTML = `
                                <div class="relative w-full max-w-4xl">
                                  <iframe 
                                    width="100%" 
                                    height="250" 
                                    src="https://www.youtube.com/embed/${videoId}?autoplay=1" 
                                    frameborder="0" 
                                    allowfullscreen
                                    class="rounded-lg sm:h-80 md:h-96"
                                    style="height: 250px; min-height: 250px;"
                                  ></iframe>
                                  <button 
                                    onclick="this.parentElement.parentElement.remove()" 
                                    class="absolute -top-8 right-0 text-white text-2xl hover:text-red-500 p-2"
                                    style="right: -8px; top: -40px;"
                                  >×</button>
                                </div>
                              `;
                              document.body.appendChild(videoModal);
                              videoModal.addEventListener('click', (e) => {
                                if (e.target === videoModal) videoModal.remove();
                              });
                            }}
                            className={`relative aspect-video rounded-sm sm:rounded md:rounded-lg overflow-hidden border-2 transition-all ${
                              'border-transparent hover:border-red-500'
                            }`}
                          >
                            <img 
                              src={`https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`}
                              alt="Product Video"
                              className="w-full h-full object-cover"
                            />
                            <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-30">
                              <Play className="w-4 h-4 sm:w-6 sm:h-6 md:w-8 md:h-8 text-white" />
                            </div>
                          </button>
                        );
                      } else if (product.images && product.images.length > 1) {
                        displayItems.push(
                          <button
                            key={1}
                            onClick={() => setSelectedImage(1)}
                            className={`aspect-video rounded-sm sm:rounded md:rounded-lg overflow-hidden border-2 transition-all ${
                              selectedImage === 1
                                ? isDay ? 'border-amber-500' : 'border-blue-500'
                                : 'border-transparent'
                            }`}
                          >
                            <img 
                              src={product.images[1]?.image_url || ''} 
                              alt={`${product.title} 2`}
                              className="w-full h-full object-cover"
                            />
                          </button>
                        );
                      }
                      
                      // Third item: third image or "more" indicator
                      if (product.images && product.images.length > maxVisible) {
                        displayItems.push(
                          <button
                            key="more"
                            onClick={() => setShowImageModal(true)}
                            className={`relative aspect-video rounded-sm sm:rounded md:rounded-lg overflow-hidden border-2 transition-all border-transparent hover:border-blue-500`}
                          >
                            <img 
                              src={product.images[2]?.image_url || ''} 
                              alt={`${product.title} 3`}
                              className="w-full h-full object-cover"
                            />
                            <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50">
                              <div className="text-center text-white">
                                <div className="text-sm sm:text-lg font-bold">+{product.images.length - maxVisible}</div>
                                <div className="text-[10px] sm:text-xs">more</div>
                              </div>
                            </div>
                          </button>
                        );
                      } else if (product.images && product.images.length > 2) {
                        displayItems.push(
                          <button
                            key={2}
                            onClick={() => setSelectedImage(2)}
                            className={`aspect-video rounded-sm sm:rounded md:rounded-lg overflow-hidden border-2 transition-all ${
                              selectedImage === 2
                                ? isDay ? 'border-amber-500' : 'border-blue-500'
                                : 'border-transparent'
                            }`}
                          >
                            <img 
                              src={product.images[2]?.image_url || ''} 
                              alt={`${product.title} 3`}
                              className="w-full h-full object-cover"
                            />
                          </button>
                        );
                      }
                      
                      return displayItems;
                    })()}
                  </div>
                </div>
              </div>

              {/* Product Info - Balanced Height */}
              <div className="flex flex-col h-full">
                <div className="flex-1 space-y-1.5 md:space-y-2.5">
                  <div>
                    <div className="flex items-center gap-2 mb-1 md:mb-2">
                      <div className={`p-1.5 md:p-2.5 rounded md:rounded-lg ${
                        isDay ? 'bg-amber-100' : 'bg-blue-900/50'
                      }`}>
                        <Zap className={`w-4 h-4 md:w-6 md:h-6 ${
                          isDay ? 'text-amber-600' : 'text-blue-400'
                        }`} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h1 className={`text-sm md:text-xl lg:text-2xl font-bold leading-tight ${
                          isDay ? 'text-slate-800' : 'text-white'
                        }`}>
                          {product.title.replace(/\s*(POPULAR|FEATURED|NEW|HOT|SALE)\s*/gi, '').trim()}
                        </h1>
                        <p className={`text-xs md:text-base ${
                          isDay ? 'text-amber-600' : 'text-blue-400'
                        }`}>
                          {product.brand?.name} - {product.model}
                        </p>
                      </div>
                    </div>

                    <p className={`text-xs md:text-sm leading-tight ${
                      isDay ? 'text-slate-600' : 'text-slate-300'
                    } line-clamp-2`}>
                      {product.short_description || product.description}
                    </p>
                  </div>

                  {/* Rating and Stats - Balanced */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1 md:gap-2">
                      <div className="flex items-center">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`w-3 h-3 md:w-4 md:h-4 ${
                              i < Math.floor(product.rating)
                                ? 'text-yellow-400 fill-current'
                                : 'text-gray-300'
                            }`}
                          />
                        ))}
                      </div>
                      <span className={`text-xs md:text-sm font-semibold ${
                        isDay ? 'text-slate-800' : 'text-white'
                      }`}>
                        {product.rating}
                      </span>
                      <span className={`text-[10px] md:text-xs ${
                        isDay ? 'text-slate-500' : 'text-slate-400'
                      }`}>
                        ({product.review_count})
                      </span>
                    </div>
                    
                    <div className="flex items-center gap-1 md:gap-2">
                      <button
                        onClick={() => setIsLiked(!isLiked)}
                        className={`p-1 md:p-1.5 rounded transition-all ${
                          isLiked
                            ? 'bg-red-500 text-white'
                            : isDay ? 'bg-white/50 text-slate-600 hover:bg-red-50' : 'bg-white/10 text-slate-300 hover:bg-red-900/20'
                        }`}
                      >
                        <Heart className={`w-3 h-3 md:w-4 md:h-4 ${isLiked ? 'fill-current' : ''}`} />
                      </button>
                      <button className={`p-1 md:p-1.5 rounded transition-all ${
                        isDay ? 'bg-white/50 text-slate-600 hover:bg-slate-100' : 'bg-white/10 text-slate-300 hover:bg-white/20'
                      }`}>
                        <Share2 className="w-3 h-3 md:w-4 md:h-4" />
                      </button>
                    </div>
                  </div>

                  {/* Key Specs Grid - Balanced */}
                  <div className="grid grid-cols-4 gap-1 md:gap-2">
                    {[
    { label: 'Capacity', value: product.capacity || 'N/A', icon: TrendingUp },
    { label: 'Efficiency', value: product.efficiency || 'N/A', icon: Zap },
    { label: 'Warranty', value: product.warranty, icon: Shield },
    { label: 'Lead Time', value: product.lead_time, icon: Clock }
                    ].map((spec, index) => (
                      <div key={index} className={`p-0.5 md:p-2 rounded md:rounded-lg border ${
                        isDay 
                          ? 'bg-white/50 border-amber-200' 
                          : 'bg-white/5 border-white/20'
                      }`}>
                        <div className="flex flex-col items-center text-center gap-0.5 md:gap-1">
                          <spec.icon className={`w-2 h-2 md:w-4 md:h-4 ${
                            isDay ? 'text-amber-600' : 'text-blue-400'
                          }`} />
                          <div className="mt-0.5">
                            <div className={`text-[8px] md:text-[10px] ${
                              isDay ? 'text-slate-500' : 'text-slate-400'
                            }`}>
                              {spec.label}
                            </div>
                            <div className={`text-[8px] md:text-xs font-semibold leading-tight ${
                              isDay ? 'text-slate-800' : 'text-white'
                            }`}>
            {spec.label === 'Warranty' ? shortenWarranty(spec.value as string) : spec.label === 'Lead Time' ? shortenLeadTime(spec.value as string) : spec.value}
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Downloadable Documents - Balanced */}
                  {product.documents && product.documents.length > 0 && (
                    <div className={`p-1 md:p-2 rounded md:rounded-lg border ${
                      isDay 
                        ? 'bg-white/55 border-amber-200' 
                        : 'bg-white/5 border-white/20'
                    }`}>
                      <div className="flex items-center gap-1 md:gap-2 mb-1 md:mb-2">
                        <FileText className={`w-2.5 h-2.5 md:w-4 md:h-4 ${
                          isDay ? 'text-amber-600' : 'text-blue-400'
                        }`} />
                        <div className={`text-[8px] md:text-sm font-semibold ${
                          isDay ? 'text-slate-800' : 'text-white'
                        }`}>
                          Documents
                        </div>
                      </div>
                      <div className="grid grid-cols-4 gap-0.5 md:gap-1.5">
                        {product.documents.map((doc, index) => (
                          <a
                            key={index}
                            href={doc.file_url}
                            download={doc.title}
                            target="_blank"
                            rel="noopener noreferrer"
                            className={`flex flex-col items-center gap-0.5 md:gap-1 p-1 md:p-2 rounded border transition-all hover:scale-[1.02] ${
                              isDay 
                                ? 'bg-white/40 border-amber-300 hover:bg-amber-50 hover:border-amber-400' 
                                : 'bg-white/5 border-white/30 hover:bg-white/10 hover:border-blue-400'
                            }`}
                          >
                            <Download className={`w-2 h-2 md:w-4 md:h-4 flex-shrink-0 ${
                              isDay ? 'text-amber-600' : 'text-blue-400'
                            }`} />
                            <span className={`text-[7px] md:text-[10px] font-medium text-center leading-tight ${
                              isDay ? 'text-slate-700' : 'text-slate-300'
                            }`}>
                              {doc.title}
                            </span>
                          </a>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                {/* Stock Status & Quote Request - Balanced */}
                <div className={`mt-1 md:mt-2 p-1 md:p-3 rounded md:rounded-lg border ${
                  isDay 
                    ? 'bg-white/55 border-amber-200' 
                    : 'bg-white/5 border-white/20'
                }`}>
                  <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-1 md:gap-3">
                    {/* Stock Status */}
                    <div className="flex items-center gap-1 md:gap-2">
                      {product.in_stock ? (
                        <>
                          <CheckCircle className="w-2.5 h-2.5 md:w-6 md:h-6 text-green-500" />
                          <div className="min-w-0">
                            <div className={`text-[8px] md:text-base font-semibold ${isDay ? 'text-slate-800' : 'text-white'}`}>
                              In Stock
                            </div>
                            <div className={`text-[7px] md:text-sm ${isDay ? 'text-slate-500' : 'text-slate-400'}`}>
                              MOQ: {product.moq}
                            </div>
                          </div>
                        </>
                      ) : (
                        <>
                          <AlertCircle className="w-2.5 h-2.5 md:w-6 md:h-6 text-red-500" />
                          <div className="min-w-0">
                            <div className={`text-[8px] md:text-base font-semibold ${isDay ? 'text-slate-800' : 'text-white'}`}>
                              Out of Stock
                            </div>
                            <div className={`text-[7px] md:text-sm ${isDay ? 'text-slate-500' : 'text-slate-400'}`}>
                              Contact us
                            </div>
                          </div>
                        </>
                      )}
                    </div>

                    {/* Quote Request */}
                    <div className="flex items-center gap-1 md:gap-3 w-full md:w-auto">
                      <div className="flex-1 md:flex-none min-w-0">
                        <div className={`text-[8px] md:text-base font-bold ${
                          isDay ? 'text-amber-600' : 'text-blue-400'
                        }`}>
                          Request Quote
                        </div>
                        <div className={`text-[7px] md:text-sm ${
                          isDay ? 'text-slate-500' : 'text-slate-400'
                        }`}>
                          Get competitive pricing
                        </div>
                      </div>
                      <div className="flex gap-1 md:gap-3">
                        <Link href="/contact" className={`px-2 md:px-6 py-1 md:py-3 rounded md:rounded-lg text-[8px] md:text-sm font-semibold transition-all duration-300 text-center ${
                          isDay 
                            ? 'bg-amber-500 text-white hover:bg-amber-600' 
                            : 'bg-blue-500 text-white hover:bg-blue-600'
                        }`}>
                          Get Quote
                        </Link>
                        <a href="tel:+918818880540" className={`px-1.5 md:px-4 py-1 md:py-3 rounded md:rounded-lg font-semibold border transition-all duration-300 flex items-center justify-center ${
                          isDay 
                            ? 'border-amber-500 text-amber-600 hover:bg-amber-500 hover:text-white' 
                            : 'border-blue-400 text-blue-400 hover:bg-blue-400 hover:text-white'
                        }`}>
                          <Phone className="w-2.5 h-2.5 md:w-5 md:h-5" />
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Tab Navigation */}
        <section className="sticky top-16 z-40 py-1 md:py-4">
          <div className="max-w-7xl mx-auto px-6">
            <div className={`p-1 md:p-2 rounded-lg md:rounded-2xl backdrop-blur-sm border ${
              isDay 
                ? 'bg-white/80 border-amber-200' 
                : 'bg-white/10 border-white/20'
            }`}>
              <div className="flex overflow-x-auto scrollbar-hide">
                {tabs.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex items-center gap-1 md:gap-2 px-2 md:px-6 py-1.5 md:py-3 rounded md:rounded-xl text-[10px] md:text-base font-medium transition-all duration-300 whitespace-nowrap flex-shrink-0 ${
                      activeTab === tab.id
                        ? isDay
                          ? 'bg-amber-500 text-white'
                          : 'bg-blue-500 text-white'
                        : isDay
                          ? 'text-slate-600 hover:bg-amber-100'
                          : 'text-slate-300 hover:bg-white/10'
                    }`}
                  >
                    <tab.icon className="w-3 h-3 md:w-5 md:h-5" />
                    <span className="hidden sm:inline md:inline">{tab.label}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Tab Content */}
        <section className="py-4 md:py-8 lg:py-12">
          <div className="max-w-7xl mx-auto px-6">
            
            {/* Overview Tab */}
            {activeTab === 'overview' && (
              <div className="space-y-4 md:space-y-8 lg:space-y-12">
                <div>
                  <h2 className={`text-sm md:text-xl lg:text-2xl font-bold mb-2 md:mb-6 ${
                    isDay ? 'text-slate-800' : 'text-white'
                  }`}>
                    Product Overview
                  </h2>
                  <p className={`text-xs md:text-base lg:text-lg leading-tight md:leading-relaxed ${
                    isDay ? 'text-slate-600' : 'text-slate-300'
                  }`}>
                    {product.description}
                  </p>
                </div>

                {/* Features */}
                <div>
                  <h3 className={`text-sm md:text-lg lg:text-xl font-bold mb-2 md:mb-6 ${
                    isDay ? 'text-slate-800' : 'text-white'
                  }`}>
                    Key Features
                  </h3>
                  <div className="grid md:grid-cols-2 gap-2 md:gap-4">
                    {product.features?.map((feature, index) => (
                      <div key={index} className="flex items-center gap-2 md:gap-3">
                        <CheckCircle className={`w-3 h-3 md:w-5 md:h-5 flex-shrink-0 ${
                          isDay ? 'text-green-600' : 'text-green-400'
                        }`} />
                        <span className={`text-xs md:text-base ${
                          isDay ? 'text-slate-700' : 'text-slate-300'
                        }`}>
                          {feature.feature_text}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Certifications */}
                <div>
                  <h3 className={`text-sm md:text-lg lg:text-xl font-bold mb-2 md:mb-6 ${
                    isDay ? 'text-slate-800' : 'text-white'
                  }`}>
                    Certifications & Standards
                  </h3>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-2 md:gap-4">
                    {product.certifications?.map((cert, index) => (
                      <div key={index} className={`p-2 md:p-4 rounded md:rounded-xl backdrop-blur-sm border ${
                        isDay 
                          ? 'bg-white/60 border-amber-200' 
                          : 'bg-white/10 border-white/20'
                      }`}>
                        <div className="flex flex-col md:flex-row items-center gap-1 md:gap-3">
                          <BadgeCheck className={`w-4 h-4 md:w-6 md:h-6 ${
                            isDay ? 'text-green-600' : 'text-green-400'
                          }`} />
                          <span className={`text-xs md:text-base font-medium text-center md:text-left ${
                            isDay ? 'text-slate-700' : 'text-slate-300'
                          }`}>
                            {cert.certification_name}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Specifications Tab */}
            {activeTab === 'specifications' && (
              <div className="space-y-4 md:space-y-8">
                <h2 className={`text-sm md:text-xl lg:text-2xl font-bold ${
                  isDay ? 'text-slate-800' : 'text-white'
                }`}>
                  Technical Specifications
                </h2>
                <div className={`p-3 md:p-6 rounded md:rounded-xl backdrop-blur-sm border ${
                  isDay 
                    ? 'bg-white/60 border-amber-200' 
                    : 'bg-white/10 border-white/20'
                }`}>
                  <div className="grid md:grid-cols-2 gap-3 md:gap-6">
                    {product.specifications?.map((spec, index) => (
                      <div key={index} className="flex justify-between py-1.5 md:py-3 border-b border-gray-200/20 last:border-b-0">
                        <span className={`text-xs md:text-base font-medium ${
                          isDay ? 'text-slate-700' : 'text-slate-300'
                        }`}>
                          {spec.spec_key}
                        </span>
                        <span className={`text-xs md:text-base ${
                          isDay ? 'text-slate-600' : 'text-slate-400'
                        }`}>
                          {spec.spec_value} {spec.spec_unit && spec.spec_unit}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Media Tab */}
            {activeTab === 'media' && (
              <div className="space-y-6 md:space-y-8">
                <h2 className={`text-lg md:text-xl lg:text-2xl font-bold ${
                  isDay ? 'text-slate-800' : 'text-white'
                }`}>
                  Product Media
                </h2>
                
                {/* YouTube Video Section */}
                {product.videos && product.videos.length > 0 && product.videos[0].youtube_url && (
                  <div className="space-y-4">
                    <h3 className={`text-base md:text-lg font-semibold ${
                      isDay ? 'text-slate-800' : 'text-white'
                    }`}>
                      Product Video
                    </h3>
                    
                    {/* Mobile View - Responsive Video */}
                    <div className="block md:hidden">
                      <div className={`p-4 rounded-lg backdrop-blur-sm border ${
                        isDay 
                          ? 'bg-white/60 border-amber-200' 
                          : 'bg-white/10 border-white/20'
                      }`}>
                        <div className="aspect-video rounded-lg overflow-hidden mb-3">
                          <iframe
                            src={`https://www.youtube.com/embed/${getYouTubeVideoId(product.videos[0].youtube_url)}?rel=0&modestbranding=1`}
                            title={product.videos[0].title}
                            className="w-full h-full"
                            allowFullScreen
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                          />
                        </div>
                        <div className="space-y-2">
                          <h4 className={`text-sm font-semibold ${
                            isDay ? 'text-slate-800' : 'text-white'
                          }`}>
                            {product.videos[0].title}
                          </h4>
                          <p className={`text-xs ${
                            isDay ? 'text-slate-600' : 'text-slate-300'
                          }`}>
                            {product.videos[0].description}
                          </p>
                        </div>
                      </div>
                    </div>
                    
                    {/* Desktop View - Enhanced Layout */}
                    <div className="hidden md:block">
                      <div className={`p-6 rounded-xl backdrop-blur-sm border ${
                        isDay 
                          ? 'bg-white/60 border-amber-200' 
                          : 'bg-white/10 border-white/20'
                      }`}>
                        <div className="grid lg:grid-cols-3 gap-6">
                          <div className="lg:col-span-2">
                            <div className="aspect-video rounded-lg overflow-hidden">
                              <iframe
                                src={`https://www.youtube.com/embed/${getYouTubeVideoId(product.videos[0].youtube_url)}?rel=0&modestbranding=1`}
                                title={product.videos[0].title}
                                className="w-full h-full"
                                allowFullScreen
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                              />
                            </div>
                          </div>
                          <div className="space-y-4">
                            <div className="flex items-center gap-3">
                              <Youtube className={`w-6 h-6 ${
                                isDay ? 'text-red-600' : 'text-red-500'
                              }`} />
                              <h4 className={`text-lg font-semibold ${
                                isDay ? 'text-slate-800' : 'text-white'
                              }`}>
                                Video Overview
                              </h4>
                            </div>
                            <h5 className={`text-base font-medium ${
                              isDay ? 'text-slate-700' : 'text-slate-200'
                            }`}>
                              {product.videos[0].title}
                            </h5>
                            <p className={`text-sm ${
                              isDay ? 'text-slate-600' : 'text-slate-300'
                            }`}>
                              {product.videos[0].description}
                            </p>
                            <div className="flex gap-3 pt-4">
                              <a
                                href={product.videos[0].youtube_url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all duration-300 ${
                                  isDay 
                                    ? 'bg-red-600 text-white hover:bg-red-700' 
                                    : 'bg-red-500 text-white hover:bg-red-600'
                                }`}
                              >
                                <ExternalLink className="w-4 h-4" />
                                Watch on YouTube
                              </a>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
                
                {/* Product Images Gallery */}
                <div className="space-y-4">
                  <h3 className={`text-base md:text-lg font-semibold ${
                    isDay ? 'text-slate-800' : 'text-white'
                  }`}>
                    Product Gallery
                  </h3>
                  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-4">
                    {product.images?.map((image, index) => (
                      <div key={index} className={`aspect-square rounded-lg overflow-hidden border ${
                        isDay ? 'border-amber-200' : 'border-white/20'
                      }`}>
                        <img
                          src={image.image_url}
                          alt={`${product.title} - Image ${index + 1}`}
                          className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                        />
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Documents Tab */}
            {activeTab === 'documents' && (
              <div className="space-y-6 md:space-y-8">
                <h2 className={`text-lg md:text-xl lg:text-2xl font-bold ${
                  isDay ? 'text-slate-800' : 'text-white'
                }`}>
                  Technical Documents
                </h2>
                
                {/* Mobile View - Compact Document List */}
                <div className="block md:hidden space-y-3">
                  {/* Primary Documents */}
                  {product.documents?.find(doc => doc.document_type === 'datasheet') && (
                    <a
                      href={product.documents.find(doc => doc.document_type === 'datasheet')?.file_url}
                      className={`flex items-center gap-3 p-3 rounded-lg backdrop-blur-sm border transition-all duration-300 ${
                        isDay 
                          ? 'bg-white/60 border-amber-200 hover:bg-white/80' 
                          : 'bg-white/10 border-white/20 hover:bg-white/20'
                      }`}
                    >
                      <FileDown className={`w-5 h-5 ${
                        isDay ? 'text-red-600' : 'text-red-400'
                      }`} />
                      <div className="flex-1">
                        <h4 className={`text-sm font-semibold ${
                          isDay ? 'text-slate-800' : 'text-white'
                        }`}>
                          Product Datasheet
                        </h4>
                        <p className={`text-xs ${
                          isDay ? 'text-slate-600' : 'text-slate-300'
                        }`}>
                          Technical specifications and performance data
                        </p>
                      </div>
                      <ExternalLink className={`w-4 h-4 ${
                        isDay ? 'text-slate-400' : 'text-slate-500'
                      }`} />
                    </a>
                  )}
                  
                  {product.documents?.find(doc => doc.document_type === 'manual') && (
                    <a
                      href={product.documents.find(doc => doc.document_type === 'manual')?.file_url}
                      className={`flex items-center gap-3 p-3 rounded-lg backdrop-blur-sm border transition-all duration-300 ${
                        isDay 
                          ? 'bg-white/60 border-amber-200 hover:bg-white/80' 
                          : 'bg-white/10 border-white/20 hover:bg-white/20'
                      }`}
                    >
                      <FileText className={`w-5 h-5 ${
                        isDay ? 'text-blue-600' : 'text-blue-400'
                      }`} />
                      <div className="flex-1">
                        <h4 className={`text-sm font-semibold ${
                          isDay ? 'text-slate-800' : 'text-white'
                        }`}>
                          Installation Manual
                        </h4>
                        <p className={`text-xs ${
                          isDay ? 'text-slate-600' : 'text-slate-300'
                        }`}>
                          Step-by-step installation instructions
                        </p>
                      </div>
                      <ExternalLink className={`w-4 h-4 ${
                        isDay ? 'text-slate-400' : 'text-slate-500'
                      }`} />
                    </a>
                  )}
                  
                  {product.documents?.find(doc => doc.document_type === 'certification') && (
                    <a
                      href={product.documents.find(doc => doc.document_type === 'certification')?.file_url}
                      className={`flex items-center gap-3 p-3 rounded-lg backdrop-blur-sm border transition-all duration-300 ${
                        isDay 
                          ? 'bg-white/60 border-amber-200 hover:bg-white/80' 
                          : 'bg-white/10 border-white/20 hover:bg-white/20'
                      }`}
                    >
                      <BadgeCheck className={`w-5 h-5 ${
                        isDay ? 'text-green-600' : 'text-green-400'
                      }`} />
                      <div className="flex-1">
                        <h4 className={`text-sm font-semibold ${
                          isDay ? 'text-slate-800' : 'text-white'
                        }`}>
                          Certifications
                        </h4>
                        <p className={`text-xs ${
                          isDay ? 'text-slate-600' : 'text-slate-300'
                        }`}>
                          Quality and safety certifications
                        </p>
                      </div>
                      <ExternalLink className={`w-4 h-4 ${
                        isDay ? 'text-slate-400' : 'text-slate-500'
                      }`} />
                    </a>
                  )}
                  
                  {/* Additional Documents */}
                  {product.documents?.filter(doc => !['datasheet', 'manual', 'certification'].includes(doc.document_type)).map((doc, index) => (
                    <a
                      key={index}
                      href={doc.file_url}
                      className={`flex items-center gap-3 p-3 rounded-lg backdrop-blur-sm border transition-all duration-300 ${
                        isDay 
                          ? 'bg-white/60 border-amber-200 hover:bg-white/80' 
                          : 'bg-white/10 border-white/20 hover:bg-white/20'
                      }`}
                    >
                      <FileDown className={`w-5 h-5 ${
                        isDay ? 'text-purple-600' : 'text-purple-400'
                      }`} />
                      <div className="flex-1">
                        <h4 className={`text-sm font-semibold ${
                          isDay ? 'text-slate-800' : 'text-white'
                        }`}>
                          {doc.title}
                        </h4>
                        <p className={`text-xs ${
                          isDay ? 'text-slate-600' : 'text-slate-300'
                        }`}>
                          {doc.document_type.toUpperCase()} Document
                        </p>
                      </div>
                      <ExternalLink className={`w-4 h-4 ${
                        isDay ? 'text-slate-400' : 'text-slate-500'
                      }`} />
                    </a>
                  ))}
                </div>
                
                {/* Desktop View - Grid Layout */}
                <div className="hidden md:grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {/* Primary Documents */}
                  {product.documents?.find(doc => doc.document_type === 'datasheet') && (
                    <a
                      href={product.documents.find(doc => doc.document_type === 'datasheet')?.file_url}
                      className={`p-6 rounded-xl backdrop-blur-sm border transition-all duration-300 group ${
                        isDay 
                          ? 'bg-white/60 border-amber-200 hover:bg-white/80 hover:shadow-lg' 
                          : 'bg-white/10 border-white/20 hover:bg-white/20 hover:shadow-xl'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-4">
                        <FileDown className={`w-8 h-8 ${
                          isDay ? 'text-red-600' : 'text-red-400'
                        } group-hover:scale-110 transition-transform`} />
                        <ExternalLink className={`w-5 h-5 ${
                          isDay ? 'text-slate-400' : 'text-slate-500'
                        } group-hover:scale-110 transition-transform`} />
                      </div>
                      <h3 className={`text-base font-semibold mb-2 ${
                        isDay ? 'text-slate-800' : 'text-white'
                      }`}>
                        Product Datasheet
                      </h3>
                      <p className={`text-sm ${
                        isDay ? 'text-slate-600' : 'text-slate-300'
                      }`}>
                        Technical specifications and performance data
                      </p>
                    </a>
                  )}
                  
                  {product.documents?.find(doc => doc.document_type === 'manual') && (
                    <a
                      href={product.documents.find(doc => doc.document_type === 'manual')?.file_url}
                      className={`p-6 rounded-xl backdrop-blur-sm border transition-all duration-300 group ${
                        isDay 
                          ? 'bg-white/60 border-amber-200 hover:bg-white/80 hover:shadow-lg' 
                          : 'bg-white/10 border-white/20 hover:bg-white/20 hover:shadow-xl'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-4">
                        <FileText className={`w-8 h-8 ${
                          isDay ? 'text-blue-600' : 'text-blue-400'
                        } group-hover:scale-110 transition-transform`} />
                        <ExternalLink className={`w-5 h-5 ${
                          isDay ? 'text-slate-400' : 'text-slate-500'
                        } group-hover:scale-110 transition-transform`} />
                      </div>
                      <h3 className={`text-base font-semibold mb-2 ${
                        isDay ? 'text-slate-800' : 'text-white'
                      }`}>
                        Installation Manual
                      </h3>
                      <p className={`text-sm ${
                        isDay ? 'text-slate-600' : 'text-slate-300'
                      }`}>
                        Step-by-step installation instructions
                      </p>
                    </a>
                  )}
                  
                  {product.documents?.find(doc => doc.document_type === 'certification') && (
                    <a
                      href={product.documents.find(doc => doc.document_type === 'certification')?.file_url}
                      className={`p-6 rounded-xl backdrop-blur-sm border transition-all duration-300 group ${
                        isDay 
                          ? 'bg-white/60 border-amber-200 hover:bg-white/80 hover:shadow-lg' 
                          : 'bg-white/10 border-white/20 hover:bg-white/20 hover:shadow-xl'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-4">
                        <BadgeCheck className={`w-8 h-8 ${
                          isDay ? 'text-green-600' : 'text-green-400'
                        } group-hover:scale-110 transition-transform`} />
                        <ExternalLink className={`w-5 h-5 ${
                          isDay ? 'text-slate-400' : 'text-slate-500'
                        } group-hover:scale-110 transition-transform`} />
                      </div>
                      <h3 className={`text-base font-semibold mb-2 ${
                        isDay ? 'text-slate-800' : 'text-white'
                      }`}>
                        Certifications
                      </h3>
                      <p className={`text-sm ${
                        isDay ? 'text-slate-600' : 'text-slate-300'
                      }`}>
                        Quality and safety certifications
                      </p>
                    </a>
                  )}
                  
                  {/* Additional Documents */}
                  {product.documents?.filter(doc => !['datasheet', 'manual', 'certification'].includes(doc.document_type)).map((doc, index) => (
                    <a
                      key={index}
                      href={doc.file_url}
                      className={`p-6 rounded-xl backdrop-blur-sm border transition-all duration-300 group ${
                        isDay 
                          ? 'bg-white/60 border-amber-200 hover:bg-white/80 hover:shadow-lg' 
                          : 'bg-white/10 border-white/20 hover:bg-white/20 hover:shadow-xl'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-4">
                        <FileDown className={`w-8 h-8 ${
                          isDay ? 'text-purple-600' : 'text-purple-400'
                        } group-hover:scale-110 transition-transform`} />
                        <ExternalLink className={`w-5 h-5 ${
                          isDay ? 'text-slate-400' : 'text-slate-500'
                        } group-hover:scale-110 transition-transform`} />
                      </div>
                      <h3 className={`text-base font-semibold mb-2 ${
                        isDay ? 'text-slate-800' : 'text-white'
                      }`}>
                        {doc.title}
                      </h3>
                      <p className={`text-sm ${
                        isDay ? 'text-slate-600' : 'text-slate-300'
                      }`}>
                        {doc.document_type.toUpperCase()} Document
                      </p>
                    </a>
                  ))}
                </div>
              </div>
            )}

            {/* Applications Tab */}
            {activeTab === 'applications' && (
              <div className="space-y-4 md:space-y-8">
                <h2 className={`text-sm md:text-xl lg:text-2xl font-bold ${
                  isDay ? 'text-slate-800' : 'text-white'
                }`}>
                  Applications
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-6">
                  {product.applications?.map((application, index) => (
                    <div key={index} className={`p-3 md:p-6 rounded md:rounded-xl backdrop-blur-sm border ${
                      isDay 
                        ? 'bg-white/60 border-amber-200' 
                        : 'bg-white/10 border-white/20'
                    }`}>
                      <div className="flex items-center gap-2 md:gap-4">
                        <Target className={`w-4 h-4 md:w-6 md:h-6 ${
                          isDay ? 'text-amber-600' : 'text-blue-400'
                        }`} />
                        <span className={`text-xs md:text-base font-medium ${
                          isDay ? 'text-slate-700' : 'text-slate-300'
                        }`}>
                          {application.application_name}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Quote Tab */}
            {activeTab === 'quote' && (
              <div className="space-y-6 md:space-y-8">
                <h2 className={`text-lg md:text-xl lg:text-2xl font-bold ${
                  isDay ? 'text-slate-800' : 'text-white'
                }`}>
                  Request Quote
                </h2>
                
                {/* Quote Request Section */}
                <div className={`p-4 md:p-6 lg:p-8 rounded-lg md:rounded-xl backdrop-blur-sm border text-center ${
                  isDay 
                    ? 'bg-white/60 border-amber-200' 
                    : 'bg-white/10 border-white/20'
                }`}>
                  <div className={`text-xl md:text-2xl lg:text-3xl font-bold mb-3 md:mb-4 ${
                    isDay ? 'text-amber-600' : 'text-blue-400'
                  }`}>
                    Get Custom Quote
                  </div>
                  <p className={`text-sm md:text-base lg:text-lg mb-4 md:mb-6 ${
                    isDay ? 'text-slate-600' : 'text-slate-300'
                  }`}>
                    Our pricing varies based on quantity, specifications, and delivery requirements. 
                    Contact us for competitive quotes tailored to your project needs.
                  </p>
                  
                  {/* Quantity Input */}
                  <div className="mb-4 md:mb-6">
                    <label className={`block text-xs md:text-sm font-medium mb-2 ${
                      isDay ? 'text-slate-700' : 'text-slate-300'
                    }`}>
                      Quantity Required
                    </label>
                    <input
                      type="number"
                      min="1"
                      value={quantity}
                      onChange={(e) => setQuantity(parseInt(e.target.value) || 1)}
                      className={`w-28 md:w-32 px-3 md:px-4 py-2 border rounded-lg text-center text-sm md:text-base ${
                        isDay 
                          ? 'bg-white border-gray-300 text-slate-800' 
                          : 'bg-slate-800 border-slate-600 text-white'
                      }`}
                      placeholder="Enter quantity"
                    />
                    <p className={`text-xs md:text-sm mt-1 ${
                      isDay ? 'text-slate-500' : 'text-slate-400'
                    }`}>
                      Minimum Order: {product.moq}
                    </p>
                  </div>
                  
                  {/* Quote Features */}
                  <div className="grid md:grid-cols-3 gap-3 md:gap-4 mb-6 md:mb-8">
                    <div className={`p-3 md:p-4 rounded-lg ${
                      isDay ? 'bg-amber-50' : 'bg-blue-900/30'
                    }`}>
                      <Calculator className={`w-6 h-6 md:w-8 md:h-8 mx-auto mb-1 md:mb-2 ${
                        isDay ? 'text-amber-600' : 'text-blue-400'
                      }`} />
                      <h4 className={`text-sm md:text-base font-semibold mb-1 ${
                        isDay ? 'text-slate-800' : 'text-white'
                      }`}>
                        Volume Discounts
                      </h4>
                      <p className={`text-xs md:text-sm ${
                        isDay ? 'text-slate-600' : 'text-slate-300'
                      }`}>
                        Better pricing for larger quantities
                      </p>
                    </div>
                    
                    <div className={`p-3 md:p-4 rounded-lg ${
                      isDay ? 'bg-amber-50' : 'bg-blue-900/30'
                    }`}>
                      <Award className={`w-6 h-6 md:w-8 md:h-8 mx-auto mb-1 md:mb-2 ${
                        isDay ? 'text-amber-600' : 'text-blue-400'
                      }`} />
                      <h4 className={`text-sm md:text-base font-semibold mb-1 ${
                        isDay ? 'text-slate-800' : 'text-white'
                      }`}>
                        Technical Support
                      </h4>
                      <p className={`text-xs md:text-sm ${
                        isDay ? 'text-slate-600' : 'text-slate-300'
                      }`}>
                        Expert guidance and support included
                      </p>
                    </div>
                    
                    <div className={`p-3 md:p-4 rounded-lg ${
                      isDay ? 'bg-amber-50' : 'bg-blue-900/30'
                    }`}>
                      <Shield className={`w-6 h-6 md:w-8 md:h-8 mx-auto mb-1 md:mb-2 ${
                        isDay ? 'text-amber-600' : 'text-blue-400'
                      }`} />
                      <h4 className={`text-sm md:text-base font-semibold mb-1 ${
                        isDay ? 'text-slate-800' : 'text-white'
                      }`}>
                        Warranty Coverage
                      </h4>
                      <p className={`text-xs md:text-sm ${
                        isDay ? 'text-slate-600' : 'text-slate-300'
                      }`}>
                        {shortenWarranty(product.warranty)} comprehensive warranty
                      </p>
                    </div>
                  </div>
                  
                  {/* CTA Buttons */}
                  <div className="flex flex-col sm:flex-row gap-3 md:gap-4 justify-center">
                    <Link href="/contact" className={`px-6 md:px-8 py-3 md:py-4 rounded-lg md:rounded-xl text-sm md:text-base font-semibold transition-all duration-300 text-center ${
                      isDay 
                        ? 'bg-amber-500 text-white hover:bg-amber-600' 
                        : 'bg-blue-500 text-white hover:bg-blue-600'
                    }`}>
                      Request Detailed Quote
                    </Link>
                    <a href="tel:+918818880540" className={`px-6 md:px-8 py-3 md:py-4 rounded-lg md:rounded-xl text-sm md:text-base font-semibold border-2 transition-all duration-300 flex items-center justify-center ${
                      isDay 
                        ? 'border-amber-500 text-amber-600 hover:bg-amber-500 hover:text-white' 
                        : 'border-blue-400 text-blue-400 hover:bg-blue-400 hover:text-white'
                    }`}>
                      <Phone className="w-4 h-4 md:w-5 md:h-5 mr-2" />
                      Call for Pricing
                    </a>
                  </div>
                </div>
              </div>
            )}

            {/* Downloads Tab */}
            {activeTab === 'downloads' && (
              <div className="space-y-6 md:space-y-8">
                <h2 className={`text-lg md:text-xl lg:text-2xl font-bold ${
                  isDay ? 'text-slate-800' : 'text-white'
                }`}>
                  Technical Documents
                </h2>
                <div className="grid md:grid-cols-3 gap-4 md:gap-6">
                  {product.documents?.find(doc => doc.document_type === 'datasheet') && (
                    <a
                      href={product.documents.find(doc => doc.document_type === 'datasheet')?.file_url}
                      className={`p-4 md:p-6 rounded-lg md:rounded-xl backdrop-blur-sm border transition-all duration-300 ${
                        isDay 
                          ? 'bg-white/60 border-amber-200 hover:bg-white/80' 
                          : 'bg-white/10 border-white/20 hover:bg-white/20'
                      }`}
                    >
                      <Download className={`w-6 h-6 md:w-8 md:h-8 mb-3 md:mb-4 ${
                        isDay ? 'text-amber-600' : 'text-blue-400'
                      }`} />
                      <h3 className={`text-sm md:text-base font-semibold mb-1 md:mb-2 ${
                        isDay ? 'text-slate-800' : 'text-white'
                      }`}>
                        Datasheet
                      </h3>
                      <p className={`text-xs md:text-sm ${
                        isDay ? 'text-slate-600' : 'text-slate-300'
                      }`}>
                        Technical specifications and performance data
                      </p>
                    </a>
                  )}
                  {product.documents?.find(doc => doc.document_type === 'manual') && (
                    <a
                      href={product.documents.find(doc => doc.document_type === 'manual')?.file_url}
                      className={`p-4 md:p-6 rounded-lg md:rounded-xl backdrop-blur-sm border transition-all duration-300 ${
                        isDay 
                          ? 'bg-white/60 border-amber-200 hover:bg-white/80' 
                          : 'bg-white/10 border-white/20 hover:bg-white/20'
                      }`}
                    >
                      <FileText className={`w-6 h-6 md:w-8 md:h-8 mb-3 md:mb-4 ${
                        isDay ? 'text-amber-600' : 'text-blue-400'
                      }`} />
                      <h3 className={`text-sm md:text-base font-semibold mb-1 md:mb-2 ${
                        isDay ? 'text-slate-800' : 'text-white'
                      }`}>
                        Installation Manual
                      </h3>
                      <p className={`text-xs md:text-sm ${
                        isDay ? 'text-slate-600' : 'text-slate-300'
                      }`}>
                        Step-by-step installation instructions
                      </p>
                    </a>
                  )}
                  {product.documents?.find(doc => doc.document_type === 'certification') && (
                    <a
                      href={product.documents.find(doc => doc.document_type === 'certification')?.file_url}
                      className={`p-4 md:p-6 rounded-lg md:rounded-xl backdrop-blur-sm border transition-all duration-300 ${
                        isDay 
                          ? 'bg-white/60 border-amber-200 hover:bg-white/80' 
                          : 'bg-white/10 border-white/20 hover:bg-white/20'
                      }`}
                    >
                      <BadgeCheck className={`w-6 h-6 md:w-8 md:h-8 mb-3 md:mb-4 ${
                        isDay ? 'text-amber-600' : 'text-blue-400'
                      }`} />
                      <h3 className={`text-sm md:text-base font-semibold mb-1 md:mb-2 ${
                        isDay ? 'text-slate-800' : 'text-white'
                      }`}>
                        Certifications
                      </h3>
                      <p className={`text-xs md:text-sm ${
                        isDay ? 'text-slate-600' : 'text-slate-300'
                      }`}>
                        Quality and safety certifications
                      </p>
                    </a>
                  )}
                </div>
              </div>
            )}
          </div>
        </section>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <section className={`py-6 md:py-12 lg:py-16 ${isDay ? 'bg-slate-50' : 'bg-slate-800/50'}`}>
            <div className="max-w-7xl mx-auto px-6">
              <h2 className={`text-base md:text-2xl lg:text-3xl font-bold mb-4 md:mb-8 ${
                isDay ? 'text-slate-800' : 'text-white'
              }`}>
                Related Products
              </h2>
              <div className="grid grid-cols-3 md:grid-cols-2 lg:grid-cols-4 gap-2 md:gap-6">
                {relatedProducts.map((relatedProduct) => (
                  <Link
                    key={relatedProduct.id}
                    href={`/products/${relatedProduct.id}`}
                    className={`p-2 md:p-6 rounded md:rounded-xl backdrop-blur-sm border transition-all duration-300 ${
                      isDay 
                        ? 'bg-white/60 border-amber-200 hover:bg-white/80' 
                        : 'bg-white/10 border-white/20 hover:bg-white/20'
                    }`}
                  >
                    <div className="h-16 md:h-32 bg-gray-100 rounded md:rounded-lg mb-1 md:mb-4 overflow-hidden">
                      <img
                        src={relatedProduct.images?.[0]?.image_url || ''}
                        alt={relatedProduct.title}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <h3 className={`text-[10px] md:text-base font-semibold mb-1 md:mb-2 line-clamp-2 leading-tight ${
                      isDay ? 'text-slate-800' : 'text-white'
                    }`}>
                      {relatedProduct.title}
                    </h3>
                    <div className="flex items-center gap-1 md:gap-2 mb-1 md:mb-2">
                      <div className="flex items-center">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`w-2 h-2 md:w-4 md:h-4 ${
                              i < Math.floor(relatedProduct.rating)
                                ? 'text-yellow-400 fill-current'
                                : 'text-gray-300'
                            }`}
                          />
                        ))}
                      </div>
                      <span className={`text-[8px] md:text-sm ${
                        isDay ? 'text-slate-500' : 'text-slate-400'
                      }`}>
                        ({relatedProduct.review_count})
                      </span>
                    </div>
                    <div className={`text-[10px] md:text-base font-bold ${
                      isDay ? 'text-amber-600' : 'text-blue-400'
                    }`}>
                      Request Quote
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* CTA Section - compact on mobile */}
        <section className="py-4 sm:py-6 md:py-12 bg-blue-600">
          <div className="max-w-4xl mx-auto text-center px-4 sm:px-6">
            <h2 className="text-lg sm:text-xl md:text-2xl font-bold text-white mb-2 sm:mb-3 md:mb-4">
              Need Help Choosing the Right Product?
            </h2>
            <p className="text-sm sm:text-base md:text-lg text-blue-100 mb-4 sm:mb-6">
              <span className="block md:hidden">Our experts can help you choose the right product.</span>
              <span className="hidden md:block">Our technical experts are here to help you find the perfect solution for your project</span>
            </p>
            <div className="flex flex-col sm:flex-row gap-2 sm:gap-3 md:gap-4 justify-center">
              <a
                href="tel:+917415100300"
                className="bg-white text-blue-600 px-4 md:px-8 py-2 md:py-3 rounded-md md:rounded-lg font-semibold hover:bg-gray-100 transition-colors inline-flex items-center justify-center text-sm md:text-base"
              >
                <Phone className="w-4 h-4 md:w-5 md:h-5 mr-2" />
                <span className="hidden sm:inline">Call: </span>
                <span className="font-medium">+91 8818880540</span>
              </a>
              <a
                href="mailto:sales@autosyssunergy.com"
                className="border-2 border-white text-white px-4 md:px-8 py-2 md:py-3 rounded-md md:rounded-lg font-semibold hover:bg-white hover:text-blue-600 transition-colors inline-flex items-center justify-center text-sm md:text-base"
              >
                <Mail className="w-4 h-4 md:w-5 md:h-5 mr-2" />
                <span className="hidden sm:inline">Email </span>
                <span className="font-medium">Us</span>
              </a>
            </div>
          </div>
        </section>

        <Footer />
      </div>

      {/* Image Modal */}
      {showImageModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-75 p-2 sm:p-4">
          <div className="relative max-w-6xl w-full bg-white rounded-lg sm:rounded-xl overflow-hidden max-h-[90vh] flex flex-col">
            {/* Modal Header */}
            <div className="flex items-center justify-between p-3 sm:p-4 border-b flex-shrink-0">
              <h3 className="text-sm sm:text-lg font-semibold text-gray-900">
                Gallery ({product.images?.length || 0} images)
              </h3>
              <button
                onClick={() => setShowImageModal(false)}
                className="p-1 sm:p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <span className="text-xl sm:text-2xl text-gray-500">×</span>
              </button>
            </div>
            
            {/* Modal Content */}
            <div className="p-3 sm:p-4 flex-1 overflow-y-auto">
              {/* Main Selected Image */}
              <div className="mb-3 sm:mb-4">
                <img
                  src={product.images?.[selectedImage]?.image_url || ''}
                  alt={`${product.title} ${selectedImage + 1}`}
                  className="w-full max-h-64 sm:max-h-96 object-contain rounded-lg"
                />
              </div>
              
              {/* Thumbnail Grid */}
              <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-1 sm:gap-2 max-h-24 sm:max-h-32 overflow-y-auto">
                {product.images?.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImage(index)}
                    className={`aspect-video rounded-sm sm:rounded-lg overflow-hidden border-2 transition-all ${
                      selectedImage === index
                        ? 'border-blue-500'
                        : 'border-transparent hover:border-gray-300'
                    }`}
                  >
                    <img
                      src={image.image_url}
                      alt={`${product.title} ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
              
              {/* Video Section if available */}
              {product.videos && product.videos.length > 0 && product.videos[0].youtube_url && (
                <div className="mt-3 sm:mt-4 border-t pt-3 sm:pt-4">
                  <h4 className="text-sm sm:text-md font-semibold text-gray-900 mb-2">Product Video</h4>
                  <div className="aspect-video max-w-sm sm:max-w-md">
                    <iframe
                      width="100%"
                      height="100%"
                      src={`https://www.youtube.com/embed/${getYouTubeVideoId(product.videos[0].youtube_url)}`}
                      frameBorder="0"
                      allowFullScreen
                      className="rounded-lg"
                    ></iframe>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
