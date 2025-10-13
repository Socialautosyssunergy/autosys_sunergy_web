import { Users, Zap, Shield, Wrench, Settings, Droplets } from 'lucide-react';
import { Service } from './types';

export const societyServices: Service[] = [
  {
    id: 'society-ongrid-rooftop',
    title: 'On-Grid Rooftop Solar Installation',
    shortDesc: 'Community solar system for societies and housing complexes',
    description: 'Reduce common area electricity costs and individual unit bills with our society solar installations. Perfect for residential societies, housing complexes, and apartment buildings.',
    userType: 'society',
    category: 'Solar Installation',
    subcategory: 'On-Grid Solar',
    features: ['Shared Benefits', 'Lower Individual Costs', 'Net Metering', 'Property Value Increase', 'Community Development'],
    capacity: '10kW - 500kW',
    duration: '7-20 Days',
    warranty: '25 Years',
    savings: 'Up to 85%',
    image: '/sample_solar_image.jpg',
    icon: Users,
    price: '₹48,000 - ₹58,000 per kW',
    projects: 420,
    rating: 4.9,
    isPopular: true,
    benefits: [
      'Reduce common area electricity bills by 85%',
      'Lower individual maintenance costs',
      'Increase property values for all residents',
      'Green community certification',
      'Shared investment model reduces individual costs'
    ],
    specifications: {
      'Panel Type': 'High-Efficiency Mono PERC 540W+',
      'Inverter': 'Three-Phase String/Central Inverter',
      'Mounting': 'Community Building Mounting Structure',
      'Monitoring': 'Community Monitoring System',
      'Grid Connection': 'Society Net Metering Setup'
    },
    processSteps: [
      'Society Energy Audit & Consensus',
      'Community System Design',
      'Society Approvals & Permits',
      'Professional Community Installation',
      'Grid Connection & Benefit Sharing Setup'
    ],
    targetCustomers: ['Housing Societies', 'Apartment Complexes', 'Gated Communities', 'Residential Associations']
  },
  {
    id: 'society-offgrid-installation',
    title: 'Off-Grid Solar Installation',
    shortDesc: 'Energy independence for remote communities',
    description: 'Perfect for societies and communities in remote areas or those seeking complete energy independence. Our community off-grid systems provide reliable power for all residents.',
    userType: 'society',
    category: 'Solar Installation',
    subcategory: 'Off-Grid Solar',
    features: ['Complete Community Independence', 'Shared Battery Storage', 'Remote Area Suitable', 'Community Load Management', 'Scalable System'],
    capacity: '50kW - 1MW',
    duration: '15-30 Days',
    warranty: '25 Years Solar, 10 Years Battery',
    savings: '100% Grid Independence',
    image: '/sample_solar_image.jpg',
    icon: Shield,
    price: '₹70,000 - ₹1,00,000 per kW',
    projects: 85,
    rating: 4.8,
    isFeatured: true,
    benefits: [
      'Complete energy independence for entire community',
      'Suitable for remote location societies',
      'Consistent power for all community needs',
      'No electricity bills for common areas',
      'Sustainable community development'
    ],
    specifications: {
      'Panel Type': 'High-Efficiency Community Grade Panels',
      'Inverter': 'Community Grade Pure Sine Wave System',
      'Battery': 'Community Battery Storage Bank',
      'Charge Controller': 'Central MPPT Controller System',
      'Monitoring': 'Community-wide Monitoring System'
    },
    processSteps: [
      'Community Load Assessment & Design',
      'Shared Battery Bank Configuration',
      'Community Solar Array Installation',
      'Community Power Distribution Setup',
      'System Testing & Community Training'
    ],
    targetCustomers: ['Remote Communities', 'Hill Station Societies', 'Island Communities', 'Off-Grid Developments']
  },
  {
    id: 'society-hybrid-installation',
    title: 'Hybrid Solar Installation',
    shortDesc: 'Grid connection with community backup power',
    description: 'Ensure community-wide power security with our hybrid solar systems. Get grid benefits during normal operations and community battery backup during power outages.',
    userType: 'society',
    category: 'Solar Installation',
    subcategory: 'Hybrid Solar',
    features: ['Community Backup', 'Grid + Battery', 'Load Sharing', 'Smart Management', 'Shared Investment'],
    capacity: '25kW - 750kW',
    duration: '10-25 Days',
    warranty: '25 Years Solar, 10 Years Battery',
    savings: 'Up to 85% + Community Backup',
    image: '/sample_solar_image.jpg',
    icon: Zap,
    price: '₹60,000 - ₹80,000 per kW',
    projects: 180,
    rating: 4.9,
    isPopular: true,
    isFeatured: true,
    benefits: [
      'Ensure uninterrupted community power supply',
      'Significant community cost savings',
      'Smart community load management',
      'Shared investment reduces individual burden',
      'Enhanced community reputation and value'
    ],
    specifications: {
      'Panel Type': 'Community Grade Mono PERC Panels',
      'Inverter': 'Community Hybrid Inverter System',
      'Battery': 'Community Lithium-ion Battery Bank',
      'Grid Connection': 'Society Three-Phase Net Metering',
      'Smart Features': 'Community Load Prioritization'
    },
    processSteps: [
      'Community Energy Audit',
      'Hybrid System Design for Society',
      'Installation & Grid Connection',
      'Community Battery Integration',
      'Community Power Management Setup'
    ],
    targetCustomers: ['Modern Societies', 'Premium Communities', 'Critical Infrastructure Communities', 'Smart Communities']
  },
  {
    id: 'society-solar-upgrade',
    title: 'Solar System Upgrade Services',
    shortDesc: 'Upgrade your existing community solar system',
    description: 'Maximize your community solar investment with comprehensive upgrade services. From capacity additions to technology upgrades and community battery integration.',
    userType: 'society',
    category: 'Solar Services',
    subcategory: 'System Upgrade',
    features: ['Community Capacity Expansion', 'Technology Upgrade', 'Battery Addition', 'System Enhancement', 'Community Benefits Optimization'],
    capacity: 'As per existing community system',
    duration: '5-15 Days',
    warranty: '10-25 Years (Component specific)',
    savings: 'Additional 25-50%',
    image: '/sample_solar_image.jpg',
    icon: Settings,
    price: '₹35,000 - ₹70,000',
    projects: 95,
    rating: 4.7,
    benefits: [
      'Increase community system capacity',
      'Upgrade to latest technology for society',
      'Add community backup power capability',
      'Improve community monitoring and control',
      'Enhance overall community energy benefits'
    ],
    specifications: {
      'Upgrade Types': 'Panel Addition, Inverter Upgrade, Community Battery Integration',
      'Compatibility': 'All Community Solar System Brands',
      'Technology': 'Latest Community Solar Technology',
      'Monitoring': 'Advanced Community Monitoring Systems',
      'Integration': 'Seamless Community System Integration'
    },
    processSteps: [
      'Existing Community System Assessment',
      'Community Requirements Analysis',
      'Upgrade Solution Design',
      'Professional Community Installation',
      'Community System Re-commissioning'
    ],
    targetCustomers: ['Existing Solar Communities', 'Capacity Expansion Societies', 'Technology Upgrade Communities']
  },
  {
    id: 'society-solar-maintenance',
    title: 'Solar Maintenance Services',
    shortDesc: 'Professional maintenance for community solar systems',
    description: 'Keep your community solar investment performing optimally with our comprehensive society maintenance services. Ensure maximum community benefits and system longevity.',
    userType: 'society',
    category: 'Solar Services',
    subcategory: 'Maintenance',
    features: ['Community Performance Optimization', 'Preventive Maintenance', 'Community Reporting', 'Resident Support', 'Society Compliance'],
    capacity: 'All Community Systems',
    duration: '4-12 Hours',
    warranty: '1 Year Service Warranty',
    savings: 'Maintain Peak Community Performance',
    image: '/sample_solar_image.jpg',
    icon: Wrench,
    price: '₹4,000 - ₹12,000 per visit',
    projects: 380,
    rating: 4.8,
    isPopular: true,
    benefits: [
      'Maintain optimal community energy savings',
      'Early detection of community system issues',
      'Extend community system lifespan',
      'Ensure community warranty compliance',
      'Professional community reporting'
    ],
    specifications: {
      'Service Frequency': 'Monthly/Quarterly Community Service',
      'Scope': 'Complete Community System Check',
      'Testing': 'Community Electrical & Performance Testing',
      'Documentation': 'Community Performance Reports',
      'Emergency': 'Priority Community Support'
    },
    processSteps: [
      'Community System Inspection',
      'Community Performance Analysis',
      'Community Component Maintenance',
      'Community Safety & Compliance Check',
      'Community Report & Recommendations'
    ],
    targetCustomers: ['All Solar Communities', 'Society Management Committees', 'Community Associations']
  },
  {
    id: 'society-solar-cleaning',
    title: 'Solar Panel Cleaning Services',
    shortDesc: 'Professional cleaning for maximum community energy output',
    description: 'Maximize your community energy generation with professional solar panel cleaning services. Regular community cleaning can increase system output by 20-35%.',
    userType: 'society',
    category: 'Solar Services',
    subcategory: 'Cleaning',
    features: ['Community Specialized Equipment', 'Safety Certified Team', 'Society Scheduling', 'Performance Improvement', 'Community Contracts'],
    capacity: 'All Community Systems',
    duration: '3-8 Hours',
    warranty: 'Service Quality Guarantee',
    savings: '20-35% Community Performance Boost',
    image: '/sample_solar_image.jpg',
    icon: Droplets,
    price: '₹5 - ₹10 per panel',
    projects: 420,
    rating: 4.6,
    isPopular: true,
    benefits: [
      'Increase community energy output by 20-35%',
      'Professional community cleaning service',
      'Safety compliant community cleaning methods',
      'Flexible community scheduling',
      'Community maintenance contracts available'
    ],
    specifications: {
      'Cleaning Method': 'Community Grade Equipment & Deionized Water',
      'Safety': 'Certified Community Cleaning Team',
      'Frequency': 'Monthly/Bi-monthly Community Options',
      'Equipment': 'Specialized Community Solar Cleaning Tools',
      'Inspection': 'Community System Damage Assessment'
    },
    processSteps: [
      'Community Safety Setup & Assessment',
      'Professional Community Panel Cleaning',
      'Advanced Community Rinse & Dry Process',
      'Community System Inspection',
      'Community Performance Report'
    ],
    targetCustomers: ['All Solar Communities', 'High Performance Communities', 'Premium Society Developments']
  }
];
