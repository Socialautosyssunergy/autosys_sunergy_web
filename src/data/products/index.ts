// Removed unused imports

// Use Supabase-powered data layer
import {
  getProductCategories,
  getProductsByCategory,
  getFeaturedProducts,
  getPopularProducts,
  getInStockProducts,
  searchProducts,
  filterProducts,
  sortProducts,
  getProductStatsData,
  getBrands,
  getProductById,
  getRelatedProducts,
  getProductTestimonials,
  getAllProducts,
  productCategories,
  allProducts,
  clearCache
} from './supabase';

// Re-export everything for backward compatibility
export {
  productCategories,
  allProducts,
  getProductsByCategory,
  getFeaturedProducts,
  getPopularProducts,
  getInStockProducts,
  searchProducts,
  filterProducts,
  sortProducts,
  getBrands,
  getProductById,
  getRelatedProducts,
  getProductTestimonials,
  getAllProducts,
  clearCache
};

// Export async versions with clearer names
export {
  getProductCategories as fetchProductCategories,
  getProductStatsData as fetchProductStats
};

// Legacy exports (sync versions that will populate over time)
export { getProductStatsData as getProductStats };

// Legacy testimonials export
export const productTestimonials = getProductTestimonials();

// Static exports from the original implementation for fallback
export { solarPanelsProducts } from './solarPanels';
export { invertersProducts } from './inverters';
