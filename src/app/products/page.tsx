'use client';
import React, { useState, useEffect, useMemo } from 'react';
import { useTheme } from '@/contexts/ThemeContext';
import { getThemeClasses, getThemeHover, TRANSITION_CLASSES } from '@/utils/themeUtils';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { 
  Search,
  Star,
  CheckCircle,
  ArrowRight,
  TrendingUp,
  Award,
  Clock,
  Users,
  Grid3X3,
  List,
  MapPin,
  Phone,
  Play,
  ChevronDown,
  ChevronUp,
  Shield,
  Zap,
  Target,
  Globe,
  Filter,
  SortAsc,
  Package,
  ShoppingCart,
  Download,
  Eye,
  Heart,
  Share2,
  Truck,
  BadgeCheck,
  AlertCircle,
  ThumbsUp
} from 'lucide-react';
import Header from '@/components/home/Header';
import Footer from '@/components/home/Footer';
import Link from 'next/link';
import { 
  fetchProductCategories,
  fetchProductStats,
  getBrands,
  getProductTestimonials,
  getAllProducts,
  searchProducts,
  sortProducts,
  filterProducts
} from '@/data/products';
import { Product, ProductCategory } from '@/data/products/types';

interface ProductTestimonial {
  id: number;
  customerName: string;
  company: string;
  location: string;
  product: string;
  testimonial: string;
  rating: number;
  date: string;
  avatar: string;
}

const ProductsPage = () => {
  const { theme, isDay } = useTheme();
  const themeClasses = getThemeClasses(theme);
  const hoverClasses = getThemeHover(theme);

  // State management
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedBrand, setSelectedBrand] = useState('all');
  const [sortBy, setSortBy] = useState('featured');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [showFilters, setShowFilters] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [showQuickView, setShowQuickView] = useState(false);
  const [expandedSpecs, setExpandedSpecs] = useState<{ [key: string]: boolean }>({});
  const [isScrolled, setIsScrolled] = useState(false);

  // Async data state
  const [categories, setCategories] = useState<ProductCategory[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [brands, setBrands] = useState<string[]>([]);
  const [stats, setStats] = useState({ totalProducts: 0, categories: 0, brands: 0, avgRating: 0 });
  const [testimonials, setTestimonials] = useState<ProductTestimonial[]>([]);
  const [loading, setLoading] = useState(true);

  // Load data on component mount
  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);
        
        // Load all data in parallel
        const [
          categoriesData,
          allProductsData,
          brandsData,
          statsData,
          testimonialsData
        ] = await Promise.all([
          fetchProductCategories(),
          getAllProducts(),
          getBrands(),
          fetchProductStats(),
          getProductTestimonials()
        ]);

        setCategories(categoriesData as ProductCategory[]);
        setProducts(allProductsData as Product[]);
        setBrands(brandsData);
        setStats(statsData);
        setTestimonials(testimonialsData as ProductTestimonial[]);
      } catch (error) {
        console.error('Error loading product data:', error);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  // Handle scroll for header
  useEffect(() => {
    // Initialize AOS
    AOS.init({
      duration: 800,
      once: true,
      offset: 100,
      easing: 'ease-out-cubic'
    });
    
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Get filtered and sorted products
  const filteredProducts = useMemo(() => {
    let filteredList = [...products];

    // Apply search filter
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      filteredList = filteredList.filter((product: Product) =>
        product.title?.toLowerCase().includes(query) ||
        product.shortDesc?.toLowerCase().includes(query) ||
        product.description?.toLowerCase().includes(query) ||
        product.brand?.toLowerCase().includes(query) ||
        product.features?.some((feature: string) => feature.toLowerCase().includes(query)) ||
        product.applications?.some((app: string) => app.toLowerCase().includes(query))
      );
    }

    // Apply category filter
    if (selectedCategory !== 'all') {
      filteredList = filteredList.filter((product: Product) => product.category === selectedCategory);
    }

    // Apply brand filter
    if (selectedBrand !== 'all') {
      filteredList = filteredList.filter((product: Product) => product.brand === selectedBrand);
    }

    // Apply sorting
    return sortProducts(filteredList, sortBy);
  }, [products, searchQuery, selectedCategory, selectedBrand, sortBy]);

  // Helper to shorten long warranty strings for compact display (kept consistent with detail page)
  const shortenWarranty = (w?: string) => {
    if (!w) return 'N/A';
    const t = w.trim();
    if (!t) return 'N/A';
    const tokens = t.split(/\s+/);
    if (/\d/.test(tokens[0]) || tokens[0].includes('-')) return tokens[0];
    return tokens.slice(0, 2).join(' ');
  };

  // Helper to shorten lead time strings (e.g. "4-6 weeks" -> "4-6")
  const shortenLeadTime = (l?: string) => {
    if (!l) return 'N/A';
    const t = l.trim();
    if (!t) return 'N/A';
    const tokens = t.split(/\s+/);
    return tokens[0];
  };

  const renderStars = (rating: number) => {
    return (
      <div className="flex items-center space-x-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            className={`w-4 h-4 ${
              star <= rating ? 'text-yellow-400 fill-current' : 'text-gray-300'
            }`}
          />
        ))}
      </div>
    );
  };

  const ProductCard = ({ product }: { product: Product }) => {
    const IconComponent = product.icon;
    
    return (
      <div className={`group relative overflow-hidden rounded-xl transition-all duration-300 hover:scale-105 ${
        isDay 
          ? 'bg-white/90 border border-blue-200 hover:shadow-lg' 
          : 'bg-white/10 border border-white/20 hover:shadow-xl hover:shadow-blue-500/20'
      } backdrop-blur-sm cursor-pointer h-full flex flex-col`}>
        {/* Image - Very Compact Mobile, Full Desktop */}
        <div className="relative w-full h-20 sm:h-48 md:h-56 lg:aspect-video overflow-hidden rounded-t-xl flex-shrink-0">
          <img 
            src={product.image} 
            alt={product.title}
            className="w-full h-full object-cover object-center group-hover:scale-110 transition-transform duration-300"
          />
          <div className={`absolute inset-0 ${
            isDay 
              ? 'bg-gradient-to-t from-black/20 to-transparent' 
              : 'bg-gradient-to-t from-blue-500/20 to-transparent'
          }`}></div>
          
          {/* Quick action buttons - Hidden on mobile, Desktop only */}
          <div className="hidden sm:flex absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex-col space-y-2">
            <button 
              onClick={(e) => {
                e.stopPropagation();
                setSelectedProduct(product);
                setShowQuickView(true);
              }}
              className="p-2 bg-white rounded-full shadow-lg hover:bg-gray-50 transition-colors"
            >
              <Eye className="w-4 h-4 text-gray-600" />
            </button>
            <button className="p-2 bg-white rounded-full shadow-lg hover:bg-gray-50 transition-colors">
              <Heart className="w-4 h-4 text-gray-600" />
            </button>
            <button className="p-2 bg-white rounded-full shadow-lg hover:bg-gray-50 transition-colors">
              <Share2 className="w-4 h-4 text-gray-600" />
            </button>
          </div>
        </div>

        {/* Content - Mobile: Only Title + Button, Desktop: Full Content */}
        <div className="p-2 sm:p-3 md:p-4 lg:p-6 flex flex-col flex-grow">
          {/* Mobile View: Compact Title + Button Only */}
          <div className="flex sm:hidden flex-col h-full">
            <h3 className={`font-bold text-xs leading-tight mb-2 ${
              isDay ? 'text-slate-800' : 'text-white'
            } line-clamp-1`}>
              {product.title}
            </h3>
            
            {/* Mobile Brand */}
            <p className={`text-xs mb-2 ${
              isDay ? 'text-blue-600' : 'text-blue-400'
            } font-medium`}>
              {product.brand}
            </p>
            
            {/* Spacer to push button to bottom */}
            <div className="flex-grow"></div>
            
            <Link
              href={`/products/${product.id}`}
              className={`w-full py-1.5 rounded-lg text-xs font-semibold text-center transition-all duration-300 ${
                isDay 
                  ? 'bg-blue-600 text-white hover:bg-blue-700' 
                  : 'bg-blue-500 text-white hover:bg-blue-600'
              }`}
            >
              View Details
            </Link>
          </div>

          {/* Desktop View: Full Content (Hidden on Mobile) */}
          <div className="hidden sm:block flex-grow">
            <div className="flex items-center gap-2 mb-2">
              {IconComponent && <IconComponent className={`w-4 h-4 sm:w-5 sm:h-5 ${
                isDay ? 'text-blue-600' : 'text-blue-400'
              }`} />}
              <h3 className={`font-bold text-sm sm:text-base ${
                isDay ? 'text-slate-800' : 'text-white'
              } line-clamp-2`}>
                {product.title}
              </h3>
            </div>

            {/* Brand and Category - Desktop */}
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-blue-600 font-medium">{product.brand}</span>
              <span className="text-xs text-gray-500">{product.category.replace('-', ' ')}</span>
            </div>

            {/* Description - Desktop Only */}
            <p className={`text-xs sm:text-sm mb-3 line-clamp-2 ${
              isDay ? 'text-slate-600' : 'text-slate-300'
            }`}>
              {product.shortDesc}
            </p>

            {/* Key Specs - Desktop Only */}
            <div className="grid grid-cols-2 gap-2 mb-3 text-xs">
              {product.capacity && (
                <div>
                  <span className="text-gray-500">Capacity:</span>
                  <span className={`ml-1 font-medium ${isDay ? 'text-slate-700' : 'text-slate-300'}`}>{product.capacity.split(' ')[0]}</span>
                </div>
              )}
              {product.efficiency && (
                <div>
                  <span className="text-gray-500">Power:</span>
                  <span className={`ml-1 font-medium ${isDay ? 'text-slate-700' : 'text-slate-300'}`}>{product.efficiency.split(' ')[0]}</span>
                </div>
              )}
              <div>
                <span className="text-gray-500">MOQ:</span>
                <span className={`ml-1 font-medium ${isDay ? 'text-slate-700' : 'text-slate-300'}`}>{product.moq.split(' ')[0]}</span>
              </div>
              <div>
                <span className="text-gray-500">Time:</span>
                <span className={`ml-1 font-medium ${isDay ? 'text-slate-700' : 'text-slate-300'}`}>{shortenLeadTime(product.leadTime)}</span>
              </div>
            </div>

            {/* Rating and Stock Status - Desktop Only */}
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-1">
                <Star className="w-3 h-3 text-yellow-400 fill-current" />
                <span className={`text-xs font-medium ${
                  isDay ? 'text-slate-700' : 'text-slate-300'
                }`}>
                  {product.rating}
                </span>
                <span className={`text-xs ${
                  isDay ? 'text-slate-500' : 'text-slate-400'
                }`}>
                  ({product.reviews})
                </span>
              </div>
              <div className="flex items-center space-x-1">
                {product.inStock ? (
                  <CheckCircle className="w-3 h-3 text-green-500" />
                ) : (
                  <AlertCircle className="w-3 h-3 text-red-500" />
                )}
                <span className={`text-xs ${product.inStock ? 'text-green-500' : 'text-red-500'}`}>
                  {product.inStock ? 'In Stock' : 'Out of Stock'}
                </span>
              </div>
            </div>

            {/* Spacer to push buttons to bottom */}
            <div className="flex-grow"></div>

            {/* Action Buttons - Desktop Only */}
            <div className="flex flex-col gap-2 mt-auto">
              <button 
                className={`w-full py-2.5 sm:py-3 rounded-xl font-semibold text-center text-sm transition-all duration-300 transform hover:scale-105 hover:shadow-lg ${
                  isDay 
                    ? 'bg-gradient-to-r from-blue-600 to-blue-700 text-white hover:from-blue-700 hover:to-blue-800 shadow-md hover:shadow-blue-500/25' 
                    : 'bg-gradient-to-r from-blue-500 to-blue-600 text-white hover:from-blue-600 hover:to-blue-700 shadow-md hover:shadow-blue-400/25'
                }`}>
                Request Price
              </button>
              <Link 
                href={`/products/${product.id}`}
                className={`w-full py-2.5 sm:py-3 rounded-xl font-semibold text-center text-sm transition-all duration-300 transform hover:scale-105 hover:shadow-lg ${
                  isDay 
                    ? 'bg-gradient-to-r from-slate-100 to-slate-200 text-slate-700 hover:from-slate-200 hover:to-slate-300 border border-slate-300 hover:border-slate-400 shadow-md hover:shadow-slate-300/25' 
                    : 'bg-gradient-to-r from-slate-700 to-slate-800 text-slate-200 hover:from-slate-600 hover:to-slate-700 border border-slate-600 hover:border-slate-500 shadow-md hover:shadow-slate-500/25'
                }`}>
                View Details
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const ProductListItem = ({ product }: { product: Product }) => {
    const IconComponent = product.icon;
    
    return (
      <div className={`${themeClasses.card} rounded-xl p-6 ${TRANSITION_CLASSES.normal} ${hoverClasses.glow}`}>
        <div className="flex space-x-6">
          {/* Product Image */}
          <div className="relative w-32 h-32 flex-shrink-0">
            <img
              src={product.image}
              alt={product.title}
              className="w-full h-full object-cover rounded-lg"
            />
          </div>

          {/* Product Info */}
          <div className="flex-1">
            <div className="flex items-start justify-between mb-2">
              <div>
                <div className="flex items-center space-x-2 mb-1">
                  <span className="text-sm text-blue-600 font-medium">{product.brand}</span>
                  <span className="text-xs text-gray-400">•</span>
                  <span className="text-xs text-gray-500">{product.category.replace('-', ' ')}</span>
                </div>
                <h3 className={`text-lg font-semibold ${themeClasses.textPrimary} mb-2`}>
                  {product.title}
                </h3>
                <p className={`text-sm ${themeClasses.textSecondary} mb-3`}>
                  {product.shortDesc}
                </p>
              </div>
              <div className="flex flex-col gap-2 min-w-[140px]">
                <button className={`px-4 py-2.5 rounded-xl text-sm font-semibold transition-all duration-300 transform hover:scale-105 hover:shadow-lg ${
                  'bg-gradient-to-r from-blue-600 to-blue-700 text-white hover:from-blue-700 hover:to-blue-800 shadow-md hover:shadow-blue-500/25'
                }`}>
                  Request Price
                </button>
                <Link 
                  href={`/products/${product.id}`}
                  className={`px-4 py-2.5 rounded-xl text-sm font-semibold transition-all duration-300 transform hover:scale-105 hover:shadow-lg text-center ${
                    'bg-gradient-to-r from-slate-100 to-slate-200 text-slate-700 hover:from-slate-200 hover:to-slate-300 border border-slate-300 hover:border-slate-400 shadow-md hover:shadow-slate-300/25'
                  }`}
                >
                  View Details
                </Link>
              </div>
            </div>

            {/* Specifications Grid */}
            <div className="grid grid-cols-4 gap-4 mb-4">
              {product.capacity && (
                <div>
                  <span className="text-xs text-gray-500">Power</span>
                  <div className={`font-medium text-sm ${themeClasses.textPrimary}`}>{product.capacity.split(' ')[0]}</div>
                </div>
              )}
              {product.efficiency && (
                <div>
                  <span className="text-xs text-gray-500">Efficiency</span>
                  <div className={`font-medium text-sm ${themeClasses.textPrimary}`}>{product.efficiency.split(' ')[0]}</div>
                </div>
              )}
              <div>
                <span className="text-xs text-gray-500">MOQ</span>
                <div className={`font-medium text-sm ${themeClasses.textPrimary}`}>{product.moq.split(' ')[0]}</div>
              </div>
              <div>
                <span className="text-xs text-gray-500">Time</span>
                <div className={`font-medium text-sm ${themeClasses.textPrimary}`}>{shortenLeadTime(product.leadTime)}</div>
              </div>
            </div>

            {/* Features */}
            <div className="mb-4">
              <div className="flex flex-wrap gap-2">
                {product.features.slice(0, 4).map((feature, index) => (
                  <span key={index} className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-md">
                    {feature}
                  </span>
                ))}
                {product.features.length > 4 && (
                  <span className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-md">
                    +{product.features.length - 4} more
                  </span>
                )}
              </div>
            </div>

            {/* Bottom Row */}
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-2">
                  {renderStars(product.rating)}
                  <span className="text-sm text-gray-500">({product.reviews})</span>
                </div>
                <div className="flex items-center space-x-1">
                  {product.inStock ? (
                    <CheckCircle className="w-4 h-4 text-green-500" />
                  ) : (
                    <AlertCircle className="w-4 h-4 text-red-500" />
                  )}
                  <span className={`text-xs ${product.inStock ? 'text-green-500' : 'text-red-500'}`}>
                    {product.inStock ? 'In Stock' : 'Out of Stock'}
                  </span>
                </div>
              </div>
              <div className="flex gap-2">
                <Link 
                  href={`/products/${product.id}`}
                  className={`px-4 py-2.5 rounded-xl text-sm font-semibold transition-all duration-300 transform hover:scale-105 hover:shadow-lg text-center ${
                    'bg-gradient-to-r from-slate-100 to-slate-200 text-slate-700 hover:from-slate-200 hover:to-slate-300 border border-slate-300 hover:border-slate-400 shadow-md hover:shadow-slate-300/25'
                  }`}
                >
                  View Details
                </Link>
                <Link 
                  href="/contact"
                  className={`px-4 py-2.5 rounded-xl transition-all duration-300 transform hover:scale-105 hover:shadow-lg flex items-center justify-center ${
                    'bg-gradient-to-r from-emerald-100 to-emerald-200 text-emerald-700 hover:from-emerald-200 hover:to-emerald-300 border border-emerald-300 hover:border-emerald-400 shadow-md hover:shadow-emerald-300/25'
                  }`}
                  title="Get Quote for this product"
                >
                  <ShoppingCart className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className={`min-h-screen transition-all duration-500 ${
      isDay ? 'bg-gradient-to-br from-blue-50 to-blue-100' : 'bg-slate-900'
    }`}>
      <Header isScrolled={isScrolled} nonSticky={true} />
      
      {/* Hero Section - Ultra Compact Mobile */}
      <section className="pt-4 pb-6 sm:pt-8 sm:pb-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-6 sm:mb-12" data-aos="fade-up">
            <div className={`inline-block px-3 py-1 sm:px-6 sm:py-2 rounded-full text-xs sm:text-sm font-semibold mb-3 sm:mb-6 ${
              isDay 
                ? 'bg-blue-100 text-blue-800 border border-blue-200' 
                : 'bg-blue-900/50 text-blue-300 border border-blue-400/30'
            }`} data-aos="zoom-in" data-aos-delay="100">
              COMPREHENSIVE SOLAR PRODUCTS
            </div>
            
            <h1 className={`text-2xl sm:text-4xl md:text-6xl font-black mb-3 sm:mb-6 ${
              isDay ? 'text-slate-800' : 'text-white'
            }`} data-aos="fade-up" data-aos-delay="200">
              Solar Products for
              <span className={`block bg-gradient-to-r ${
                isDay 
                  ? 'from-blue-600 via-blue-500 to-blue-500' 
                  : 'from-blue-400 to-cyan-400'
              } bg-clip-text text-transparent`}>
                B2B Partners
              </span>
            </h1>
            
            <p className={`text-sm sm:text-xl max-w-3xl mx-auto ${
              isDay ? 'text-slate-600' : 'text-slate-300'
            }`} data-aos="fade-up" data-aos-delay="300">
              Comprehensive range of premium solar products for dealers, installers, and system integrators. 
              Competitive wholesale pricing with technical support and fast delivery.
            </p>
          </div>

          {/* Quick Stats - Compact Mobile */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-6 mb-6 sm:mb-12" data-aos="fade-up" data-aos-delay="400">
            {[
              { label: 'Products', value: `${stats.totalProducts}+`, icon: Package },
              { label: 'Brands', value: `${stats.brands}+`, icon: Award },
              { label: 'Categories', value: `${stats.categories}`, icon: Grid3X3 },
              { label: 'Avg Rating', value: `${stats.avgRating}★`, icon: Star }
            ].map((stat, index) => (
              <div key={index} className={`text-center p-3 sm:p-6 rounded-xl sm:rounded-2xl backdrop-blur-sm border ${
                isDay 
                  ? 'bg-white/60 border-blue-200' 
                  : 'bg-white/10 border-white/20'
              }`} data-aos="zoom-in" data-aos-delay={`${500 + index * 100}`}>
                <stat.icon className={`w-5 h-5 sm:w-8 sm:h-8 mx-auto mb-1 sm:mb-3 ${
                  isDay ? 'text-blue-600' : 'text-blue-400'
                }`} />
                <div className={`text-lg sm:text-2xl font-bold ${
                  isDay ? 'text-slate-800' : 'text-white'
                }`}>
                  {stat.value}
                </div>
                <div className={`text-xs sm:text-sm ${
                  isDay ? 'text-slate-600' : 'text-slate-300'
                }`}>
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Product Categories - Ultra Compact Mobile Navigation */}
      <div className="sticky top-0 z-40 bg-blue-600 border-b border-blue-700 shadow-lg">
        <div className="max-w-7xl mx-auto px-2 sm:px-4 lg:px-8">
          <div className="flex items-center h-8 sm:h-12">
            {/* Categories Scroll - Ultra Compact Mobile */}
            <div className="flex-1 overflow-x-auto scrollbar-hide">
              <div className="flex space-x-0.5 sm:space-x-1 min-w-max">
                <button
                  onClick={() => setSelectedCategory('all')}
                  className={`px-2 py-1 sm:px-3 sm:py-1.5 rounded-sm sm:rounded-md font-medium whitespace-nowrap transition-all duration-200 ${
                    selectedCategory === 'all'
                      ? 'bg-white text-blue-600 shadow-md'
                      : 'text-white hover:bg-blue-500 hover:shadow-md'
                  }`}
                >
                  <div className="flex items-center space-x-0.5 sm:space-x-1.5">
                    <Package className="w-2.5 h-2.5 sm:w-3.5 sm:h-3.5" />
                    <span className="text-xs sm:text-sm">All</span>
                    <span className="text-xs bg-blue-800 text-white px-1 py-0.5 sm:px-1.5 rounded-full">
                      {products.length}
                    </span>
                  </div>
                </button>
                
                {categories.map((category) => {
                  const IconComponent = category.icon;
                  return (
                    <button
                      key={category.id}
                      onClick={() => setSelectedCategory(category.id)}
                      className={`px-2 py-1 sm:px-3 sm:py-1.5 rounded-sm sm:rounded-md font-medium whitespace-nowrap transition-all duration-200 ${
                        selectedCategory === category.id
                          ? 'bg-white text-blue-600 shadow-md'
                          : 'text-white hover:bg-blue-500 hover:shadow-md'
                      }`}
                    >
                      <div className="flex items-center space-x-0.5 sm:space-x-1.5">
                        {IconComponent && <IconComponent className="w-2.5 h-2.5 sm:w-3.5 sm:h-3.5" />}
                        <span className="text-xs sm:text-sm">{category.label}</span>
                        <span className="text-xs bg-blue-800 text-white px-1 py-0.5 sm:px-1.5 rounded-full">
                          {category.totalProducts}
                        </span>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Search and Filters - Removed for Mobile, Hidden for Desktop */}
            <div className="hidden lg:flex items-center space-x-2 ml-4">
              {/* Search */}
              <div className="relative">
                <Search className="absolute left-2.5 top-1/2 transform -translate-y-1/2 text-blue-300 w-3.5 h-3.5" />
                <input
                  type="text"
                  placeholder="Search products..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-48 pl-8 pr-3 py-1.5 text-sm bg-blue-700 text-white placeholder-blue-300 border border-blue-500 rounded-md focus:ring-2 focus:ring-white focus:border-transparent"
                />
              </div>

              {/* Brand Filter */}
              <select
                value={selectedBrand}
                onChange={(e) => setSelectedBrand(e.target.value)}
                className="px-2.5 py-1.5 text-sm bg-blue-700 text-white border border-blue-500 rounded-md focus:ring-2 focus:ring-white"
              >
                <option value="all">All Brands</option>
                {brands.map((brand) => (
                  <option key={brand} value={brand}>{brand}</option>
                ))}
              </select>

              {/* Sort */}
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="px-2.5 py-1.5 text-sm bg-blue-700 text-white border border-blue-500 rounded-md focus:ring-2 focus:ring-white"
              >
                <option value="featured">Featured</option>
                <option value="popular">Popular</option>
                <option value="rating-desc">Highest Rated</option>
                <option value="name-asc">Name A-Z</option>
                <option value="name-desc">Name Z-A</option>
              </select>

              {/* View Mode */}
              <div className="flex bg-blue-700 rounded-md overflow-hidden border border-blue-500">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`p-1.5 transition-colors ${
                    viewMode === 'grid' 
                      ? 'bg-white text-blue-600' 
                      : 'text-white hover:bg-blue-500'
                  }`}
                >
                  <Grid3X3 className="w-3.5 h-3.5" />
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={`p-1.5 transition-colors ${
                    viewMode === 'list' 
                      ? 'bg-white text-blue-600' 
                      : 'text-white hover:bg-blue-500'
                  }`}
                >
                  <List className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            {/* Mobile View Mode Toggle Only */}
            <div className="flex lg:hidden items-center ml-1">
              <div className="flex bg-blue-700 rounded-sm overflow-hidden border border-blue-500">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`p-1 transition-colors ${
                    viewMode === 'grid' 
                      ? 'bg-white text-blue-600' 
                      : 'text-white hover:bg-blue-500'
                  }`}
                >
                  <Grid3X3 className="w-3 h-3" />
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={`p-1 transition-colors ${
                    viewMode === 'list' 
                      ? 'bg-white text-blue-600' 
                      : 'text-white hover:bg-blue-500'
                  }`}
                >
                  <List className="w-3 h-3" />
                </button>
              </div>
            </div>
          </div>

          {/* Results Summary */}
          <div className="pb-2">
            {/* <p className="text-blue-100 text-sm">
              Showing {filteredProducts.length} of {allProducts.length} products
              {selectedCategory !== 'all' && (
                <span> in {productCategories.find(c => c.id === selectedCategory)?.label}</span>
              )}
              {searchQuery && (
                <span> for "{searchQuery}"</span>
              )}
            </p> */}
          </div>
        </div>
      </div>

      {/* Products Grid/List - Compact Mobile */}
      <section className="pb-20 pt-3 sm:pt-0">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {filteredProducts.length === 0 ? (
            <div className="text-center py-16">
              <Package className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <h3 className={`text-xl font-semibold ${themeClasses.textPrimary} mb-2`}>No products found</h3>
              <p className={`${themeClasses.textSecondary}`}>
                Try adjusting your search criteria or browse all categories
              </p>
            </div>
          ) : (
            <div className={
              viewMode === 'grid' 
                ? "grid grid-cols-2 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-2 sm:gap-6"
                : "space-y-2 sm:space-y-6"
            }>
              {filteredProducts.map((product) => (
                viewMode === 'grid' ? (
                  <ProductCard key={product.id} product={product} />
                ) : (
                  <ProductListItem key={product.id} product={product} />
                )
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Customer Testimonials - Compact Mobile */}
      <section className="py-8 sm:py-16 bg-gradient-to-br from-blue-50 to-blue-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-6 sm:mb-12">
            <h2 className={`text-xl sm:text-3xl font-bold ${themeClasses.textPrimary} mb-2 sm:mb-4`}>What Our B2B Partners Say</h2>
            <p className={`text-sm sm:text-lg ${themeClasses.textSecondary}`}>Trusted by solar dealers and installers across India</p>
          </div>
          
          {/* Mobile: Horizontal Scroll, Desktop: Grid */}
          <div className="block sm:hidden">
            <div className="overflow-x-auto scrollbar-hide pb-4">
              <div className="flex space-x-4 min-w-max">
                {testimonials.map((testimonial) => (
                  <div key={testimonial.id} className={`${themeClasses.card} rounded-xl p-4 w-72 flex-shrink-0`}>
                    <div className="flex items-center mb-3">
                      <img
                        src={testimonial.avatar}
                        alt={testimonial.customerName}
                        className="w-10 h-10 rounded-full mr-3"
                      />
                      <div>
                        <h4 className={`font-semibold text-sm ${themeClasses.textPrimary}`}>{testimonial.customerName}</h4>
                        <p className={`text-xs ${themeClasses.textSecondary}`}>{testimonial.company}</p>
                        <p className="text-xs text-gray-500">{testimonial.location}</p>
                      </div>
                    </div>
                    
                    <div className="mb-3">
                      {renderStars(testimonial.rating)}
                    </div>
                    
                    <p className={`${themeClasses.textSecondary} mb-3 italic text-sm line-clamp-3`}>
                      &quot;{testimonial.testimonial}&quot;
                    </p>
                    
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-blue-600 font-medium truncate">{testimonial.product}</span>
                      <span className="text-gray-500">{testimonial.date}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Desktop: Original Grid */}
          <div className="hidden sm:grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial) => (
              <div key={testimonial.id} className={`${themeClasses.card} rounded-xl p-6`}>
                <div className="flex items-center mb-4">
                  <img
                    src={testimonial.avatar}
                    alt={testimonial.customerName}
                    className="w-12 h-12 rounded-full mr-4"
                  />
                  <div>
                    <h4 className={`font-semibold ${themeClasses.textPrimary}`}>{testimonial.customerName}</h4>
                    <p className={`text-sm ${themeClasses.textSecondary}`}>{testimonial.company}</p>
                    <p className="text-xs text-gray-500">{testimonial.location}</p>
                  </div>
                </div>
                
                <div className="mb-4">
                  {renderStars(testimonial.rating)}
                </div>
                
                <p className={`${themeClasses.textSecondary} mb-4 italic`}>
                  &quot;{testimonial.testimonial}&quot;
                </p>
                
                <div className="flex items-center justify-between text-sm">
                  <span className="text-blue-600 font-medium">{testimonial.product}</span>
                  <span className="text-gray-500">{testimonial.date}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section - Compact Mobile */}
      <section className="py-8 sm:py-16 bg-blue-600">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-xl sm:text-3xl font-bold text-white mb-2 sm:mb-4">
            Ready to Partner with Us?
          </h2>
          <p className="text-sm sm:text-xl text-blue-100 mb-4 sm:mb-8">
            Join hundreds of dealers and installers who trust Autosys Sunergy for their solar product needs
          </p>
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
            <Link
              href="/contact"
              className="bg-white text-blue-600 px-6 py-2.5 sm:px-8 sm:py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors inline-flex items-center justify-center text-sm sm:text-base"
            >
              <Phone className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
              Contact Our Sales Team
            </Link>
            <Link
              href="/catalog"
              className="border-2 border-white text-white px-6 py-2.5 sm:px-8 sm:py-3 rounded-lg font-semibold hover:bg-white hover:text-blue-600 transition-colors inline-flex items-center justify-center text-sm sm:text-base"
            >
              <Download className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
              Download Catalog
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default ProductsPage;
