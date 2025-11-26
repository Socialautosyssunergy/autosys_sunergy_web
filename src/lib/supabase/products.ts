import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

const supabase = supabaseUrl && supabaseAnonKey
  ? createClient(supabaseUrl, supabaseAnonKey)
  : null;

// Product interfaces - Supabase-based (no Sanity integration)
export interface Product {
  id: string;
  title: string;
  slug: string;
  short_description?: string;
  description?: string;
  model?: string;
  sku?: string;
  subcategory?: string;
  efficiency?: string;
  capacity?: string;
  power_output?: string;
  price_range?: string;
  moq: string;
  warranty: string;
  lead_time: string;
  in_stock: boolean;
  rating: number;
  review_count: number;
  is_featured: boolean;
  is_popular: boolean;
  sort_order: number;
  meta_title?: string;
  meta_description?: string;
  og_image_url?: string;
  status: string;
  created_at: string;
  updated_at: string;
  
  // Related data
  category?: ProductCategory;
  brand?: ProductBrand;
  images?: ProductImage[];
  documents?: ProductDocument[];
  videos?: ProductVideo[];
  specifications?: ProductSpecification[];
  features?: ProductFeature[];
  certifications?: ProductCertification[];
  applications?: ProductApplication[];
  reviews?: ProductReview[];
  compatible_products?: Product[];
}

export interface ProductCategory {
  id: string;
  name: string;
  slug: string;
  description?: string;
  icon_name?: string;
  features?: string[];
  sort_order: number;
  is_active: boolean;
}

export interface ProductBrand {
  id: string;
  name: string;
  slug: string;
  logo_url?: string;
  description?: string;
  website_url?: string;
  country?: string;
  established_year?: number;
  is_active: boolean;
}

export interface ProductImage {
  id: string;
  product_id: string;
  image_url: string;
  alt_text?: string;
  caption?: string;
  image_type: string;
  is_primary: boolean;
  sort_order: number;
}

export interface ProductDocument {
  id: string;
  product_id: string;
  title: string;
  file_url: string;
  file_type?: string;
  document_type: string;
  file_size_kb?: number;
  description?: string;
  sort_order: number;
}

export interface ProductVideo {
  id: string;
  product_id: string;
  title: string;
  description?: string;
  youtube_url?: string;
  video_type: string;
  thumbnail_url?: string;
  duration_seconds?: number;
  sort_order: number;
}

export interface ProductSpecification {
  id: string;
  product_id: string;
  spec_key: string;
  spec_value: string;
  spec_unit?: string;
  spec_category?: string;
  sort_order: number;
}

export interface ProductFeature {
  id: string;
  product_id: string;
  feature_text: string;
  feature_description?: string;
  icon_name?: string;
  sort_order: number;
}

export interface ProductCertification {
  id: string;
  product_id: string;
  certification_name: string;
  certification_body?: string;
  certificate_url?: string;
  issue_date?: string;
  expiry_date?: string;
  sort_order: number;
}

export interface ProductApplication {
  id: string;
  product_id: string;
  application_name: string;
  application_description?: string;
  sort_order: number;
}

export interface ProductReview {
  id: string;
  product_id: string;
  customer_name: string;
  company_name?: string;
  location?: string;
  rating: number;
  review_text: string;
  review_date: string;
  avatar_url?: string;
  is_featured: boolean;
  is_verified: boolean;
  status: string;
}

// Query Functions

export const getProducts = async (options?: {
  category?: string;
  brand?: string;
  featured?: boolean;
  popular?: boolean;
  limit?: number;
  offset?: number;
  search?: string;
  sortBy?: 'featured' | 'popular' | 'rating' | 'name' | 'created';
  sortOrder?: 'asc' | 'desc';
}): Promise<{ data: Product[]; count: number }> => {
  if (!supabase) {
    console.warn('Supabase not configured');
    return { data: [], count: 0 };
  }
  
  let query = supabase
    .from('products')
    .select(`
      *,
      category:product_categories(*),
      brand:product_brands(*),
      images:product_images(*),
      specifications:product_specifications(*),
      features:product_features(*),
      certifications:product_certifications(*),
      applications:product_applications(*)
    `, { count: 'exact' })
    .eq('status', 'published');

  // Apply filters
  if (options?.category) {
    query = query.eq('category.slug', options.category);
  }

  if (options?.brand) {
    query = query.eq('brand.slug', options.brand);
  }

  if (options?.featured) {
    query = query.eq('is_featured', true);
  }

  if (options?.popular) {
    query = query.eq('is_popular', true);
  }

  if (options?.search) {
    query = query.or(`title.ilike.%${options.search}%,short_description.ilike.%${options.search}%,description.ilike.%${options.search}%`);
  }

  // Apply sorting
  if (options?.sortBy) {
    switch (options.sortBy) {
      case 'featured':
        query = query.order('is_featured', { ascending: false })
                    .order('sort_order', { ascending: true });
        break;
      case 'popular':
        query = query.order('is_popular', { ascending: false })
                    .order('rating', { ascending: false });
        break;
      case 'rating':
        query = query.order('rating', { ascending: options.sortOrder === 'asc' });
        break;
      case 'name':
        query = query.order('title', { ascending: options.sortOrder === 'asc' });
        break;
      case 'created':
        query = query.order('created_at', { ascending: options.sortOrder === 'asc' });
        break;
      default:
        query = query.order('sort_order', { ascending: true })
                    .order('title', { ascending: true });
    }
  } else {
    query = query.order('sort_order', { ascending: true })
                .order('title', { ascending: true });
  }

  // Apply pagination
  if (options?.limit) {
    query = query.limit(options.limit);
  }

  if (options?.offset) {
    query = query.range(options.offset, options.offset + (options.limit || 10) - 1);
  }

  const { data, error, count } = await query;

  if (error) {
    console.error('Error fetching products:', error);
    throw error;
  }

  return { data: data || [], count: count || 0 };
};

export const getProductBySlug = async (slug: string): Promise<Product | null> => {
  if (!supabase) {
    console.warn('Supabase not configured');
    return null;
  }
  
  const { data, error } = await supabase
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
    .eq('slug', slug)
    .eq('status', 'published')
    .single();

  if (error) {
    console.error('Error fetching product by slug:', {
      message: error.message,
      details: error.details,
      hint: error.hint,
      code: error.code,
      slug: slug
    });
    return null;
  }

  return data;
};

export const getProductById = async (id: string): Promise<Product | null> => {
  if (!supabase) {
    console.warn('Supabase not configured');
    return null;
  }
  
  const { data, error } = await supabase
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
    console.error('Error fetching product:', error);
    return null;
  }

  return data;
};

export const getRelatedProducts = async (productId: string, categoryId?: string, brandId?: string, limit: number = 4): Promise<Product[]> => {
  if (!supabase) {
    console.warn('Supabase not configured');
    return [];
  }
  
  let query = supabase
    .from('products')
    .select(`
      *,
      category:product_categories(*),
      brand:product_brands(*),
      images:product_images(*)
    `)
    .eq('status', 'published')
    .neq('id', productId);

  // Prefer same category or brand
  if (categoryId && brandId) {
    query = query.or(`category_id.eq.${categoryId},brand_id.eq.${brandId}`);
  } else if (categoryId) {
    query = query.eq('category_id', categoryId);
  } else if (brandId) {
    query = query.eq('brand_id', brandId);
  }

  const { data, error } = await query
    .order('rating', { ascending: false })
    .order('is_popular', { ascending: false })
    .limit(limit);

  if (error) {
    console.error('Error fetching related products:', error);
    return [];
  }

  return data || [];
};

export const getProductCategories = async (): Promise<ProductCategory[]> => {
  if (!supabase) {
    console.warn('Supabase not configured');
    return [];
  }
  
  const { data, error } = await supabase
    .from('product_categories')
    .select('*')
    .eq('is_active', true)
    .order('sort_order');

  if (error) {
    console.error('Error fetching categories:', error);
    return [];
  }

  return data || [];
};

export const getProductBrands = async (): Promise<ProductBrand[]> => {
  if (!supabase) {
    console.warn('Supabase not configured');
    return [];
  }
  
  const { data, error } = await supabase
    .from('product_brands')
    .select('*')
    .eq('is_active', true)
    .order('name');

  if (error) {
    console.error('Error fetching brands:', error);
    return [];
  }

  return data || [];
};

export const getProductReviews = async (productId?: string, featured?: boolean, limit?: number): Promise<ProductReview[]> => {
  if (!supabase) {
    console.warn('Supabase not configured');
    return [];
  }
  
  let query = supabase
    .from('product_reviews')
    .select('*')
    .eq('status', 'approved');

  if (productId) {
    query = query.eq('product_id', productId);
  }

  if (featured) {
    query = query.eq('is_featured', true);
  }

  if (limit) {
    query = query.limit(limit);
  }

  const { data, error } = await query
    .order('is_featured', { ascending: false })
    .order('rating', { ascending: false })
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Error fetching reviews:', error);
    return [];
  }

  return data || [];
};

export const getProductStats = async () => {
  if (!supabase) {
    console.warn('Supabase not configured');
    return {
      totalProducts: 0,
      categories: 0,
      brands: 0,
      avgRating: 0
    };
  }
  
  const [productsResult, categoriesResult, brandsResult] = await Promise.all([
    supabase.from('products').select('rating', { count: 'exact' }).eq('status', 'published'),
    supabase.from('product_categories').select('id', { count: 'exact' }).eq('is_active', true),
    supabase.from('product_brands').select('id', { count: 'exact' }).eq('is_active', true)
  ]);

  const totalProducts = productsResult.count || 0;
  const categories = categoriesResult.count || 0;
  const brands = brandsResult.count || 0;
  
  const ratings = productsResult.data?.map(p => p.rating).filter(r => r > 0) || [];
  const avgRating = ratings.length > 0 
    ? Number((ratings.reduce((sum, rating) => sum + rating, 0) / ratings.length).toFixed(1))
    : 0;

  return {
    totalProducts,
    categories,
    brands,
    avgRating
  };
};

export default supabase;
