/**
 * Products Data - STATIC DATA ONLY
 * 
 * ⚠️ All product data is now managed via static files (NO Supabase)
 * Supabase is used ONLY for form submissions (contact, inquiries)
 */

import { Zap, Cpu, Battery, Wrench, Cable, Monitor, Package } from 'lucide-react';
import { Product, ProductCategory, ProductFilter } from './types';

// Import static product data
import { solarPanelsProducts } from './solarPanels';
import { invertersProducts } from './inverters';
import { batteriesProducts } from './batteries';
import { mountingProducts } from './accessories'; // Accessories file exports mounting products

// ============================================================================
// STATIC PRODUCT DATA (No Supabase)
// ============================================================================

// All products combined
export const allProducts: Product[] = [
  ...solarPanelsProducts,
  ...invertersProducts,
  ...batteriesProducts,
  ...mountingProducts
];

// Product Categories with icons
export const productCategories: ProductCategory[] = [
  {
    id: 'solar-panels',
    label: 'Solar Panels',
    icon: Zap,
    description: 'High-efficiency solar panels for all applications',
    features: ['High Efficiency', 'Long Warranty', 'Weather Resistant', 'Various Technologies'],
    mainProducts: solarPanelsProducts.slice(0, 3),
    totalProducts: solarPanelsProducts.length
  },
  {
    id: 'inverters',
    label: 'Inverters',
    icon: Cpu,
    description: 'Advanced inverters for optimal power conversion',
    features: ['High Efficiency', 'MPPT Technology', 'Grid Integration', 'Remote Monitoring'],
    mainProducts: invertersProducts.slice(0, 3),
    totalProducts: invertersProducts.length
  },
  {
    id: 'batteries',
    label: 'Batteries',
    icon: Battery,
    description: 'Reliable energy storage solutions',
    features: ['Long Life', 'Fast Charging', 'Safety Features', 'High Capacity'],
    mainProducts: batteriesProducts.slice(0, 3),
    totalProducts: batteriesProducts.length
  },
  {
    id: 'mounting',
    label: 'Mounting Systems',
    icon: Wrench,
    description: 'Robust mounting and tracking systems',
    features: ['Easy Installation', 'Weather Resistant', 'Adjustable', 'Durable'],
    mainProducts: [],
    totalProducts: 0
  },
  {
    id: 'accessories',
    label: 'Accessories',
    icon: Cable,
    description: 'Essential solar accessories and components',
    features: ['Quality Components', 'Easy Installation', 'Weather Proof', 'Certified'],
    mainProducts: mountingProducts.slice(0, 3),
    totalProducts: mountingProducts.length
  },
  {
    id: 'monitoring',
    label: 'Monitoring Systems',
    icon: Monitor,
    description: 'Smart monitoring and control systems',
    features: ['Real-time Data', 'Remote Access', 'Analytics', 'Alerts'],
    mainProducts: [],
    totalProducts: 0
  }
];

// ============================================================================
// HELPER FUNCTIONS (Pure JavaScript - No Async)
// ============================================================================

/**
 * Get products by category
 */
export const getProductsByCategory = (category: string): Product[] => {
  return allProducts.filter(product => product.category === category);
};

/**
 * Get featured products
 */
export const getFeaturedProducts = (): Product[] => {
  return allProducts.filter(product => product.isFeatured);
};

/**
 * Get popular products
 */
export const getPopularProducts = (): Product[] => {
  return allProducts.filter(product => product.isPopular);
};

/**
 * Get in-stock products
 */
export const getInStockProducts = (): Product[] => {
  return allProducts.filter(product => product.inStock);
};

/**
 * Search products by query
 */
export const searchProducts = (query: string): Product[] => {
  const lowerQuery = query.toLowerCase();
  return allProducts.filter(product =>
    product.title?.toLowerCase().includes(lowerQuery) ||
    product.shortDesc?.toLowerCase().includes(lowerQuery) ||
    product.description?.toLowerCase().includes(lowerQuery) ||
    product.brand?.toLowerCase().includes(lowerQuery) ||
    product.features?.some(f => f.toLowerCase().includes(lowerQuery))
  );
};

/**
 * Filter products based on criteria
 */
export const filterProducts = (products: Product[], filters: ProductFilter): Product[] => {
  let filtered = [...products];

  if (filters.category && filters.category !== 'all') {
    filtered = filtered.filter(p => p.category === filters.category);
  }

  if (filters.brand && filters.brand !== 'all') {
    filtered = filtered.filter(p => p.brand === filters.brand);
  }

  if (filters.inStock !== undefined) {
    filtered = filtered.filter(p => p.inStock === filters.inStock);
  }

  if (filters.rating !== undefined) {
    filtered = filtered.filter(p => p.rating >= filters.rating!);
  }

  return filtered;
};

/**
 * Sort products
 */
export const sortProducts = (products: Product[], sortBy: string): Product[] => {
  const sorted = [...products];

  switch (sortBy) {
    case 'name-asc':
      return sorted.sort((a, b) => a.title.localeCompare(b.title));
    case 'name-desc':
      return sorted.sort((a, b) => b.title.localeCompare(a.title));
    case 'rating-desc':
      return sorted.sort((a, b) => b.rating - a.rating);
    case 'rating-asc':
      return sorted.sort((a, b) => a.rating - b.rating);
    case 'popular':
      return sorted.sort((a, b) => (b.isPopular ? 1 : 0) - (a.isPopular ? 1 : 0));
    case 'featured':
      return sorted.sort((a, b) => (b.isFeatured ? 1 : 0) - (a.isFeatured ? 1 : 0));
    case 'reviews-desc':
      return sorted.sort((a, b) => b.reviews - a.reviews);
    default:
      return sorted;
  }
};

/**
 * Get all unique brands
 */
export const getBrands = (): string[] => {
  const brands = new Set(allProducts.map(p => p.brand));
  return Array.from(brands).sort();
};

/**
 * Get product by ID
 */
export const getProductById = (id: string): Product | undefined => {
  return allProducts.find(p => p.id === id);
};

/**
 * Get related products
 */
export const getRelatedProducts = (product: Product, limit: number = 4): Product[] => {
  return allProducts
    .filter(p =>
      p.id !== product.id &&
      (p.category === product.category || p.brand === product.brand)
    )
    .sort((a, b) => b.rating - a.rating)
    .slice(0, limit);
};

/**
 * Get product statistics
 */
export const getProductStats = () => {
  const categories = productCategories.filter(c => c.totalProducts > 0).length;
  const brands = getBrands().length;
  const avgRating = allProducts.reduce((sum, p) => sum + p.rating, 0) / allProducts.length;

  return {
    totalProducts: allProducts.length,
    categories,
    brands,
    avgRating: Number(avgRating.toFixed(1))
  };
};

/**
 * Get product testimonials/reviews
 */
export const getProductTestimonials = () => {
  return [
    {
      id: 1,
      customerName: "Rajesh Kumar",
      company: "Kumar Electronics",
      location: "Indore, MP",
      product: "Solar Panels & Inverters",
      testimonial: "Excellent quality products with competitive pricing. The technical support team is very knowledgeable and responsive.",
      rating: 5,
      date: "2024-12-15",
      avatar: "/api/placeholder/50/50"
    },
    {
      id: 2,
      customerName: "Priya Sharma",
      company: "Green Energy Solutions",
      location: "Bhopal, MP",
      product: "Complete Solar Kit",
      testimonial: "Fast delivery and genuine products. The mounting systems are robust and easy to install. Highly recommended for B2B purchases.",
      rating: 5,
      date: "2024-12-10",
      avatar: "/api/placeholder/50/50"
    },
    {
      id: 3,
      customerName: "Amit Patel",
      company: "Solar Tech Services",
      location: "Jabalpur, MP",
      product: "Lithium Batteries",
      testimonial: "Great quality batteries with excellent warranty terms. The BMS system works perfectly and provides good protection.",
      rating: 4,
      date: "2024-12-05",
      avatar: "/api/placeholder/50/50"
    }
  ];
};

// ============================================================================
// ASYNC WRAPPERS (For Compatibility with Existing Code)
// ============================================================================

/**
 * Async wrappers return promises for backward compatibility
 * but data is served from static files instantly
 */

export const fetchProductCategories = async () => {
  return Promise.resolve(productCategories);
};

export const fetchProductStats = async () => {
  return Promise.resolve(getProductStats());
};

export const getAllProducts = async () => {
  return Promise.resolve(allProducts);
};

// Export static products for direct import
export { solarPanelsProducts, invertersProducts, batteriesProducts, mountingProducts };

// Legacy compatibility
export const productTestimonials = getProductTestimonials();
export { productCategories as default };
export const clearCache = () => {
  // No-op since we're using static data
  console.log('Using static data - no cache to clear');
};
