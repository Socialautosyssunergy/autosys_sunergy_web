import supabase, { 
  getProducts, 
  getProductBySlug,
  getProductCategories as fetchProductCategories,
  getProductBrands as fetchProductBrands,
  getProductReviews as fetchProductReviews,
  getProductStats as fetchProductStats,
  getRelatedProducts as getRelatedProductsFromDB
} from '@/lib/supabase/products';
import { createClient } from '@supabase/supabase-js';
import { 
  Product,
  ProductCategory,
  ProductBrand,
  ProductReview,
  ProductFilter,
  ProductStats,
  transformProductForLegacy,
  transformCategoryForLegacy,
  transformReviewForLegacy
} from '@/types/product';

// Create Supabase client for direct queries
const supabaseClient = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

// Import Lucide icons for categories
import { Zap, Cpu, Battery, Wrench, Cable, Monitor, Package } from 'lucide-react';

// Icon mapping for categories
const categoryIcons: { [key: string]: React.ComponentType } = {
  'solar-panels': Zap,
  'inverters': Cpu,
  'batteries': Battery,
  'mounting': Wrench,
  'accessories': Cable,
  'monitoring': Monitor,
  'all': Package
};

// Cache for better performance
// eslint-disable-next-line @typescript-eslint/no-explicit-any
let cachedCategories: any[] | null = null;
let cachedBrands: string[] | null = null;
let cachedStats: ProductStats | null = null;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const allProducts: any[] = []; // Legacy export, will be populated dynamically

// Product Categories - Enhanced with real data
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const getProductCategories = async (): Promise<any[]> => {
  if (cachedCategories) {
    return cachedCategories;
  }

  try {
    const categories = await fetchProductCategories();
    cachedCategories = categories.map((category: ProductCategory) => ({
      ...transformCategoryForLegacy(category),
      icon: categoryIcons[category.slug] || Package
    }));
    return cachedCategories;
  } catch (error) {
    console.error('Error fetching categories:', error);
    // Return fallback categories
    return [
      {
        id: 'solar-panels',
        label: 'Solar Panels',
        icon: Zap,
        description: 'High-efficiency solar panels for all applications',
        features: ['High Efficiency', 'Long Warranty', 'Weather Resistant', 'Various Technologies'],
        mainProducts: [],
        totalProducts: 0
      },
      {
        id: 'inverters',
        label: 'Inverters',
        icon: Cpu,
        description: 'Advanced inverters for optimal power conversion',
        features: ['High Efficiency', 'MPPT Technology', 'Grid Integration', 'Remote Monitoring'],
        mainProducts: [],
        totalProducts: 0
      },
      {
        id: 'batteries',
        label: 'Batteries',
        icon: Battery,
        description: 'Reliable energy storage solutions',
        features: ['Long Life', 'Fast Charging', 'Safety Features', 'High Capacity'],
        mainProducts: [],
        totalProducts: 0
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
        mainProducts: [],
        totalProducts: 0
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
  }
};

// Legacy export for categories
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const productCategories: any[] = [];

// Initialize categories
// eslint-disable-next-line @typescript-eslint/no-explicit-any
getProductCategories().then((categories: any[]) => {
  productCategories.splice(0, productCategories.length, ...categories);
});

// Helper Functions with Supabase backend
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const getProductsByCategory = async (category: string): Promise<any[]> => {
  try {
    const { data: products } = await getProducts({ category });
    return products.map(transformProductForLegacy);
  } catch (error) {
    console.error('Error fetching products by category:', error);
    return [];
  }
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const getFeaturedProducts = async (): Promise<any[]> => {
  try {
    const { data: products } = await getProducts({ featured: true, limit: 8 });
    return products.map(transformProductForLegacy);
  } catch (error) {
    console.error('Error fetching featured products:', error);
    return [];
  }
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const getPopularProducts = async (): Promise<any[]> => {
  try {
    const { data: products } = await getProducts({ popular: true, limit: 8 });
    return products.map(transformProductForLegacy);
  } catch (error) {
    console.error('Error fetching popular products:', error);
    return [];
  }
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const getInStockProducts = async (): Promise<any[]> => {
  try {
    const { data: products } = await getProducts({ limit: 50 });
    return products.filter(p => p.in_stock).map(transformProductForLegacy);
  } catch (error) {
    console.error('Error fetching in-stock products:', error);
    return [];
  }
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const searchProducts = async (query: string): Promise<any[]> => {
  try {
    const { data: products } = await getProducts({ search: query, limit: 50 });
    return products.map(transformProductForLegacy);
  } catch (error) {
    console.error('Error searching products:', error);
    return [];
  }
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const filterProducts = (products: any[], filters: ProductFilter): any[] => {
  let filtered = [...products];

  if (filters.category && filters.category !== 'all') {
    filtered = filtered.filter(product => product.category === filters.category);
  }

  if (filters.brand && filters.brand !== 'all') {
    filtered = filtered.filter(product => product.brand === filters.brand);
  }

  if (filters.inStock !== undefined) {
    filtered = filtered.filter(product => product.inStock === filters.inStock);
  }

  if (filters.rating !== undefined) {
    filtered = filtered.filter(product => product.rating >= filters.rating!);
  }

  return filtered;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const sortProducts = (products: any[], sortBy: string): any[] => {
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

export const getProductStatsData = async (): Promise<ProductStats> => {
  if (cachedStats) {
    return cachedStats;
  }

  try {
    cachedStats = await fetchProductStats();
    return cachedStats;
  } catch (error) {
    console.error('Error fetching product stats:', error);
    return {
      totalProducts: 0,
      categories: 6,
      brands: 0,
      avgRating: 4.5
    };
  }
};

export const getBrands = async (): Promise<string[]> => {
  if (cachedBrands) {
    return cachedBrands;
  }

  try {
    const brands = await fetchProductBrands();
    cachedBrands = brands.map((brand: ProductBrand) => brand.name).sort();
    return cachedBrands;
  } catch (error) {
    console.error('Error fetching brands:', error);
    return ['Novasys', 'Microtek', 'Luminous', 'Tata Solar', 'Waaree'];
  }
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const getProductById = async (id: string): Promise<any | undefined> => {
  try {
    // Check if the id is actually a slug (contains hyphens) or a UUID
    let product;
    
    if (id.includes('-') && id.length > 36) {
      // Likely a slug, use getProductBySlug
      product = await getProductBySlug(id);
    } else {
      // Likely a UUID, fetch by ID directly
      const { data, error } = await supabaseClient
        .from('products')
        .select(`
          *,
          category:product_categories(*),
          brand:product_brands(*),
          images:product_images(*),
          documents:product_documents(*),
          videos:product_videos(*),
          specifications:product_specifications(*),
          features:product_features(*),
          certifications:product_certifications(*),
          applications:product_applications(*),
          reviews:product_reviews(*)
        `)
        .eq('id', id)
        .eq('status', 'published')
        .single();

      if (error) {
        console.error('Error fetching product by ID:', {
          message: error.message,
          details: error.details,
          hint: error.hint,
          code: error.code,
          productId: id
        });
        return undefined;
      }
      
      product = data;
    }
    
    return product ? transformProductForLegacy(product) : undefined;
  } catch (error) {
    console.error('Error fetching product by ID:', {
      message: error instanceof Error ? error.message : 'Unknown error',
      stack: error instanceof Error ? error.stack : undefined,
      productId: id
    });
    return undefined;
  }
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const getRelatedProducts = async (product: any, limit: number = 4): Promise<any[]> => {
  try {
    // Add validation for product data
    if (!product || !product.id) {
      console.warn('Invalid product data for related products:', product);
      return [];
    }

    const related = await getRelatedProductsFromDB(
      product.id, 
      product.category?.id, 
      product.brand?.id, 
      limit
    );
    return related.map(transformProductForLegacy);
  } catch (error) {
    console.error('Error fetching related products:', {
      message: error instanceof Error ? error.message : 'Unknown error',
      stack: error instanceof Error ? error.stack : undefined,
      productId: product?.id,
      categoryId: product?.category?.id,
      brandId: product?.brand?.id
    });
    return [];
  }
};

// Product testimonials/reviews
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const getProductTestimonials = async (limit: number = 6): Promise<any[]> => {
  try {
    const reviews = await fetchProductReviews(undefined, true, limit);
    return reviews.map(transformReviewForLegacy);
  } catch (error) {
    console.error('Error fetching testimonials:', error);
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
  }
};

// Legacy compatibility exports
export { getProductStatsData as getProductStats };
export const productTestimonials = getProductTestimonials();

// Get all products for compatibility
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const getAllProducts = async (): Promise<any[]> => {
  try {
    const { data: products } = await getProducts({ limit: 1000 });
    return products.map(transformProductForLegacy);
  } catch (error) {
    console.error('Error fetching all products:', error);
    return [];
  }
};

// Initialize allProducts array (for legacy compatibility)
getAllProducts().then(products => {
  allProducts.splice(0, allProducts.length, ...products);
});

// Clear cache function for refreshing data
export const clearCache = () => {
  cachedCategories = null;
  cachedBrands = null;
  cachedStats = null;
};
