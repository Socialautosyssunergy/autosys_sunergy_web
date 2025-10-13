export interface Product {
  id: string;
  title: string;
  shortDesc: string;
  description: string;
  category: 'solar-panels' | 'inverters' | 'batteries' | 'mounting' | 'accessories' | 'monitoring';
  subcategory: string;
  brand: string;
  model: string;
  specifications: {
    [key: string]: string;
  };
  features: string[];
  price: string;
  moq: string; // Minimum Order Quantity
  warranty: string;
  efficiency?: string;
  capacity?: string;
  image: string;
  images: string[];
  icon: React.ComponentType<{ className?: string }> | null;
  rating: number;
  reviews: number;
  isPopular?: boolean;
  isFeatured?: boolean;
  inStock: boolean;
  leadTime: string;
  certifications: string[];
  applications: string[];
  compatibleWith?: string[];
  technicalDocs: {
    datasheet?: string;
    manual?: string;
    certifications?: string;
    additionalDocs?: {
      title: string;
      url: string;
      type: 'pdf' | 'doc' | 'other';
    }[];
  };
  media: {
    youtubeVideoUrl?: string;
    videoTitle?: string;
    videoDescription?: string;
    productImages?: string[];
    installationImages?: string[];
    pdfs?: {
      name: string;
      filename: string;
      url: string;
      type: 'datasheet' | 'manual' | 'certification' | 'specification' | 'installation' | 'other';
    }[];
  };
}

export interface ProductCategory {
  id: string;
  label: string;
  icon: React.ComponentType<{ className?: string }> | null;
  description: string;
  features: string[];
  mainProducts: string[];
  totalProducts: number;
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
