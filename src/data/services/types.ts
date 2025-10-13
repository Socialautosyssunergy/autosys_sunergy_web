export interface Service {
  id: string;
  title: string;
  shortDesc: string;
  description: string;
  userType: 'homeowners' | 'small-business' | 'society' | 'company' | 'industrial' | 'agriculture';
  category: string;
  subcategory: string;
  features: string[];
  capacity: string;
  duration: string;
  warranty: string;
  savings: string;
  image: string;
  icon: React.ComponentType<{ className?: string }> | null;
  price: string;
  projects: number;
  rating: number;
  isPopular?: boolean;
  isFeatured?: boolean;
  benefits: string[];
  specifications: {
    [key: string]: string;
  };
  processSteps: string[];
  targetCustomers: string[];
}

export interface UserType {
  id: string;
  label: string;
  icon: React.ComponentType<{ className?: string }> | null;
  description: string;
  features: string[];
  mainServices: string[];
}