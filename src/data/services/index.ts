import { Home, Building2, Factory, Users, Sprout } from 'lucide-react';
import { Service, UserType } from './types';
import { homeownersServices } from './homeowners';
import { smallBusinessServices } from './smallBusiness';
import { societyServices } from './society';
import { corporateServices } from './corporate';
import { industrialServices } from './industrial';
import { agricultureServices } from './agriculture';

// User Types Configuration
export const userTypes: UserType[] = [
  { 
    id: 'homeowners', 
    label: 'Homeowners', 
    icon: Home, 
    description: 'Residential solar solutions for homes and families',
    features: ['Net Metering', 'Home Backup', 'Energy Savings', 'Property Value Increase'],
    mainServices: ['home-rooftop-solar', 'home-battery-backup', 'home-hybrid-solar', 'home-off-grid-solar']
  },
  { 
    id: 'small-business', 
    label: 'Small Business', 
    icon: Building2, 
    description: 'Cost-effective business solutions for SMEs',
    features: ['Lower Operating Costs', 'Tax Benefits', 'Green Image', 'Quick ROI'],
    mainServices: ['business-rooftop-solar', 'business-hybrid-solar', 'business-energy-audit', 'business-financing-solutions']
  },
  { 
    id: 'society', 
    label: 'Society/Community', 
    icon: Users, 
    description: 'Community solar projects and shared solutions',
    features: ['Shared Benefits', 'Lower Individual Costs', 'Community Development', 'Sustainability'],
    mainServices: ['society-common-area-solar', 'society-individual-solar', 'society-group-purchase', 'society-community-battery']
  },
  { 
    id: 'company', 
    label: 'Corporate', 
    icon: Building2, 
    description: 'Enterprise solar solutions for large organizations',
    features: ['CSR Goals', 'Significant Cost Reduction', 'Energy Security', 'Carbon Neutrality'],
    mainServices: ['corporate-rooftop-solar', 'corporate-open-access', 'corporate-captive-solar', 'corporate-carbon-neutral']
  },
  { 
    id: 'industrial', 
    label: 'Industrial', 
    icon: Factory, 
    description: 'Large-scale industrial and utility projects',
    features: ['Megawatt Scale', 'Grid Integration', 'Process Integration', 'Heavy Industry Solutions'],
    mainServices: ['industrial-megawatt-solar', 'industrial-captive-power', 'industrial-floating-solar', 'industrial-process-heat']
  },
  { 
    id: 'agriculture', 
    label: 'Agriculture', 
    icon: Sprout, 
    description: 'Farming and rural solar solutions',
    features: ['Water Pumping', 'Rural Solutions', 'Government Subsidies', 'Sustainable Farming'],
    mainServices: ['agri-solar-pumping', 'agri-solar-fencing', 'agri-solar-greenhouse', 'agri-solar-cold-storage']
  }
];

// Consolidated Services Data
export const allServices: Service[] = [
  ...homeownersServices,
  ...smallBusinessServices,
  ...societyServices,
  ...corporateServices,
  ...industrialServices,
  ...agricultureServices
];

// Helper Functions
export const getServicesByUserType = (userType: string): Service[] => {
  return allServices.filter(service => service.userType === userType);
};

export const getServiceById = (id: string): Service | undefined => {
  return allServices.find(service => service.id === id);
};

export const getUserTypeById = (id: string): UserType | undefined => {
  return userTypes.find(userType => userType.id === id);
};

export const getPopularServices = (userType?: string): Service[] => {
  const services = userType ? getServicesByUserType(userType) : allServices;
  return services.filter(service => service.isPopular).slice(0, 6);
};

export const getFeaturedServices = (userType?: string): Service[] => {
  const services = userType ? getServicesByUserType(userType) : allServices;
  return services.filter(service => service.isFeatured).slice(0, 4);
};

export const searchServices = (searchTerm: string, userType?: string): Service[] => {
  const services = userType ? getServicesByUserType(userType) : allServices;
  
  if (!searchTerm.trim()) return services;
  
  const term = searchTerm.toLowerCase();
  return services.filter(service => 
    service.title.toLowerCase().includes(term) ||
    service.shortDesc.toLowerCase().includes(term) ||
    service.description.toLowerCase().includes(term) ||
    service.category.toLowerCase().includes(term) ||
    service.subcategory.toLowerCase().includes(term) ||
    service.features.some(feature => feature.toLowerCase().includes(term)) ||
    service.benefits.some(benefit => benefit.toLowerCase().includes(term))
  );
};

export const sortServices = (services: Service[], sortBy: string): Service[] => {
  const sortedServices = [...services];
  
  switch (sortBy) {
    case 'rating':
      return sortedServices.sort((a, b) => b.rating - a.rating);
    case 'projects':
      return sortedServices.sort((a, b) => b.projects - a.projects);
    case 'popular':
      return sortedServices.sort((a, b) => {
        if (a.isPopular && !b.isPopular) return -1;
        if (!a.isPopular && b.isPopular) return 1;
        return b.projects - a.projects;
      });
    case 'featured':
      return sortedServices.sort((a, b) => {
        if (a.isFeatured && !b.isFeatured) return -1;
        if (!a.isFeatured && b.isFeatured) return 1;
        return b.rating - a.rating;
      });
    case 'alphabetical':
      return sortedServices.sort((a, b) => a.title.localeCompare(b.title));
    case 'recommended':
    case 'default':
      // Maintain original file order: on-grid, off-grid, hybrid, upgrade, maintenance, cleaning
      return sortedServices; // Return services in their original order
    default:
      // Default to recommended order (original file order)
      return sortedServices;
  }
};

// Service Categories for filtering
export const serviceCategories = [
  'Solar Installation',
  'Energy Storage',
  'Solar Products',
  'Solar Thermal',
  'Services'
];

export const getServicesByCategory = (category: string, userType?: string): Service[] => {
  const services = userType ? getServicesByUserType(userType) : allServices;
  return services.filter(service => service.category === category);
};

// Statistics
export const getServiceStats = () => {
  return {
    totalServices: allServices.length,
    totalProjects: allServices.reduce((sum, service) => sum + service.projects, 0),
    averageRating: allServices.reduce((sum, service) => sum + service.rating, 0) / allServices.length,
    userTypes: userTypes.length,
    servicesByUserType: userTypes.map(userType => ({
      userType: userType.label,
      count: getServicesByUserType(userType.id).length
    }))
  };
};

export default allServices;
