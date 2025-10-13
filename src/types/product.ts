export interface Product {
  id: string;
  sanity_id?: string;
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
  sanity_id?: string;
  name: string;
  slug: string;
  description?: string;
  icon_name?: string;
  features?: string[];
  sort_order: number;
  is_active: boolean;
  totalProducts?: number;
  label?: string; // For backward compatibility
  icon?: React.ComponentType<{ className?: string }> | null; // For backward compatibility
}

export interface ProductBrand {
  id: string;
  sanity_id?: string;
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
  sanity_id?: string;
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

export interface ProductFilter {
  category?: string;
  brand?: string;
  priceRange?: [number, number];
  inStock?: boolean;
  rating?: number;
  capacity?: string;
  efficiency?: string;
}

export interface ProductStats {
  totalProducts: number;
  categories: number;
  brands: number;
  avgRating: number;
}

// Legacy interfaces for backward compatibility
export interface ProductTestimonial extends ProductReview {
  customerName: string;
  company: string;
  testimonial: string;
  date: string;
  avatar: string;
  product: string;
}

// Transform functions for backward compatibility
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const transformProductForLegacy = (product: Product): any => {
  const primaryImage = product.images?.find(img => img.is_primary);
  const allImages = product.images?.map(img => img.image_url) || [];
  
  return {
    id: product.id,
    title: product.title,
    shortDesc: product.short_description || '',
    description: product.description || '',
    category: product.category?.slug || '',
    subcategory: product.subcategory || '',
    brand: product.brand?.name || '',
    model: product.model || '',
    specifications: product.specifications?.reduce((acc, spec) => {
      acc[spec.spec_key] = `${spec.spec_value}${spec.spec_unit ? ` ${spec.spec_unit}` : ''}`;
      return acc;
    }, {} as { [key: string]: string }) || {},
    features: product.features?.map(f => f.feature_text) || [],
    price: product.price_range || 'Contact for pricing',
    moq: product.moq,
    warranty: product.warranty,
    efficiency: product.efficiency,
    capacity: product.capacity,
    image: primaryImage?.image_url || allImages[0] || '/api/placeholder/400/300',
    images: allImages,
    icon: null, // Icons will be handled by the frontend
    rating: product.rating,
    reviews: product.review_count,
    isPopular: product.is_popular,
    isFeatured: product.is_featured,
    inStock: product.in_stock,
    leadTime: product.lead_time,
    certifications: product.certifications?.map(c => c.certification_name) || [],
    applications: product.applications?.map(a => a.application_name) || [],
    compatibleWith: [], // Will need to be populated separately if needed
    technicalDocs: {
      datasheet: product.documents?.find(d => d.document_type === 'datasheet')?.file_url,
      manual: product.documents?.find(d => d.document_type === 'manual')?.file_url,
      certifications: product.documents?.find(d => d.document_type === 'certification')?.file_url,
      additionalDocs: product.documents?.map(doc => ({
        title: doc.title,
        url: doc.file_url,
        type: doc.file_type === 'pdf' ? 'pdf' as const : 'other' as const
      })) || []
    },
    media: {
      youtubeVideoUrl: product.videos?.[0]?.youtube_url,
      videoTitle: product.videos?.[0]?.title,
      videoDescription: product.videos?.[0]?.description,
      productImages: product.images?.filter(img => img.image_type === 'product').map(img => img.image_url) || [],
      installationImages: product.images?.filter(img => img.image_type === 'installation').map(img => img.image_url) || [],
      pdfs: product.documents?.map(doc => ({
        name: doc.title,
        filename: doc.title,
        url: doc.file_url,
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        type: doc.document_type as any
      })) || []
    }
  };
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const transformCategoryForLegacy = (category: ProductCategory): any => {
  return {
    id: category.slug,
    label: category.name,
    icon: null, // Will be handled by frontend
    description: category.description || '',
    features: category.features || [],
    mainProducts: [], // This would need to be populated separately
    totalProducts: category.totalProducts || 0
  };
};

export const transformReviewForLegacy = (review: ProductReview): ProductTestimonial => {
  return {
    ...review,
    customerName: review.customer_name,
    company: review.company_name || '',
    testimonial: review.review_text,
    date: review.review_date,
    avatar: review.avatar_url || '/api/placeholder/50/50',
    product: '', // This would need to be populated with product title
  };
};
