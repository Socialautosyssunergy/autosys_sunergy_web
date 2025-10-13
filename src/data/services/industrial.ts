import { Factory, Zap, Shield, Wrench, Settings, Droplets } from 'lucide-react';
import { Service } from './types';

export const industrialServices: Service[] = [
  {
    id: 'industrial-ongrid-rooftop',
    title: 'On-Grid Rooftop Solar Installation',
    shortDesc: 'Megawatt-scale grid-tied solar systems for industries',
    description: 'Achieve massive cost reductions with our industrial-scale on-grid solar installations. Perfect for manufacturing plants, factories, and large industrial facilities.',
    userType: 'industrial',
    category: 'Solar Installation',
    subcategory: 'On-Grid Solar',
    features: ['Megawatt Scale', 'Industrial Grid Integration', 'Process Integration', 'Heavy Industry Solutions', 'Massive Cost Reduction'],
    capacity: '500kW - 50MW',
    duration: '45-120 Days',
    warranty: '25 Years',
    savings: 'Up to 70%',
    image: '/sample_solar_image.jpg',
    icon: Factory,
    price: '₹40,000 - ₹50,000 per kW',
    projects: 65,
    rating: 4.9,
    isPopular: true,
    benefits: [
      'Massive industrial cost reductions up to 70%',
      'Seamless integration with industrial processes',
      'Long-term energy cost stability',
      'Meet industrial sustainability goals',
      'Enhanced industrial competitiveness'
    ],
    specifications: {
      'Panel Type': 'Industrial Grade High-Efficiency Panels',
      'Inverter': 'Industrial Central/String Inverter',
      'Mounting': 'Heavy-Duty Industrial Mounting',
      'Monitoring': 'Industrial SCADA Systems',
      'Grid Connection': 'Industrial HT Grid Integration'
    },
    processSteps: [
      'Industrial Energy Audit & Load Analysis',
      'Megawatt System Design',
      'Industrial Permits & Grid Approvals',
      'Industrial-Scale Installation',
      'Industrial Grid Connection & Commissioning'
    ],
    targetCustomers: ['Manufacturing Plants', 'Steel Industries', 'Chemical Plants', 'Textile Mills']
  },
  {
    id: 'industrial-offgrid-installation',
    title: 'Off-Grid Solar Installation',
    shortDesc: 'Complete energy independence for remote industrial operations',
    description: 'Perfect for industries in remote locations or those requiring complete energy independence. Our industrial off-grid systems ensure reliable power for heavy industrial operations.',
    userType: 'industrial',
    category: 'Solar Installation',
    subcategory: 'Off-Grid Solar',
    features: ['Complete Industrial Independence', 'Remote Operations', 'Heavy Industrial Loads', 'Industrial Battery Storage', 'Scalable Megawatt Systems'],
    capacity: '1MW - 100MW',
    duration: '60-180 Days',
    warranty: '25 Years Solar, 10 Years Battery',
    savings: '100% Grid Independence',
    image: '/sample_solar_image.jpg',
    icon: Shield,
    price: '₹55,000 - ₹85,000 per kW',
    projects: 25,
    rating: 4.8,
    isFeatured: true,
    benefits: [
      'Complete energy independence for industrial operations',
      'Suitable for remote industrial locations',
      'Consistent power for heavy industrial processes',
      'Zero dependency on grid infrastructure',
      'Industrial sustainability leadership'
    ],
    specifications: {
      'Panel Type': 'Industrial High-Efficiency Panel Arrays',
      'Inverter': 'Industrial Pure Sine Wave Systems',
      'Battery': 'Industrial Battery Storage Systems',
      'Charge Controller': 'Industrial MPPT Controllers',
      'Monitoring': 'Industrial Remote Monitoring'
    },
    processSteps: [
      'Industrial Load Assessment & Design',
      'Industrial Battery Bank Configuration',
      'Industrial Solar Farm Installation',
      'Industrial Power System Integration',
      'Industrial System Testing & Training'
    ],
    targetCustomers: ['Remote Mining Operations', 'Offshore Facilities', 'Industrial Campuses', 'Process Industries']
  },
  {
    id: 'industrial-hybrid-installation',
    title: 'Hybrid Solar Installation',
    shortDesc: 'Grid connection with industrial-grade backup power',
    description: 'Ensure continuous industrial operations with our hybrid systems. Combine grid benefits with industrial-scale battery backup for uninterrupted production.',
    userType: 'industrial',
    category: 'Solar Installation',
    subcategory: 'Hybrid Solar',
    features: ['Industrial Continuity', 'Megawatt Backup', 'Process Critical Loads', 'Industrial Energy Security', 'Production Reliability'],
    capacity: '750kW - 75MW',
    duration: '50-150 Days',
    warranty: '25 Years Solar, 10 Years Battery',
    savings: 'Up to 70% + Industrial Backup',
    image: '/sample_solar_image.jpg',
    icon: Zap,
    price: '₹50,000 - ₹70,000 per kW',
    projects: 35,
    rating: 4.9,
    isPopular: true,
    isFeatured: true,
    benefits: [
      'Ensure uninterrupted industrial production',
      'Massive industrial cost savings',
      'Critical process load management',
      'Industrial-grade energy security',
      'Enhanced production reliability'
    ],
    specifications: {
      'Panel Type': 'Industrial Grade Mono PERC Arrays',
      'Inverter': 'Industrial Hybrid Inverter Systems',
      'Battery': 'Industrial Lithium-ion Battery Banks',
      'Grid Connection': 'Industrial HT Net Metering',
      'Smart Features': 'Industrial Process Load Prioritization'
    },
    processSteps: [
      'Industrial Process Energy Audit',
      'Industrial Hybrid System Design',
      'Industrial Installation & Grid Integration',
      'Industrial Battery System Integration',
      'Industrial Process Management Setup'
    ],
    targetCustomers: ['Continuous Process Industries', 'Manufacturing Plants', 'Critical Production Facilities', 'Heavy Industries']
  },
  {
    id: 'industrial-solar-upgrade',
    title: 'Solar System Upgrade Services',
    shortDesc: 'Upgrade your existing industrial solar infrastructure',
    description: 'Maximize your industrial solar investment with comprehensive upgrade services. From megawatt expansions to technology upgrades and industrial battery integration.',
    userType: 'industrial',
    category: 'Solar Services',
    subcategory: 'System Upgrade',
    features: ['Megawatt Capacity Expansion', 'Industrial Technology Modernization', 'Industrial Battery Addition', 'Process Integration', 'Performance Enhancement'],
    capacity: 'As per existing industrial system',
    duration: '20-60 Days',
    warranty: '10-25 Years (Component specific)',
    savings: 'Additional 40-70%',
    image: '/sample_solar_image.jpg',
    icon: Settings,
    price: '₹50,000 - ₹90,000',
    projects: 28,
    rating: 4.7,
    benefits: [
      'Massive increase in industrial system capacity',
      'Upgrade to latest industrial technology',
      'Add industrial-scale backup power',
      'Improve industrial monitoring and control',
      'Enhance overall industrial energy performance'
    ],
    specifications: {
      'Upgrade Types': 'Megawatt Panel Addition, Industrial Inverter Upgrade, Battery Integration',
      'Compatibility': 'All Industrial Solar System Brands',
      'Technology': 'Latest Industrial Solar Technology',
      'Monitoring': 'Advanced Industrial SCADA Systems',
      'Integration': 'Seamless Industrial Process Integration'
    },
    processSteps: [
      'Existing Industrial System Assessment',
      'Industrial Requirements Analysis',
      'Industrial Upgrade Solution Design',
      'Industrial-Scale Installation',
      'Industrial System Re-commissioning'
    ],
    targetCustomers: ['Existing Industrial Solar Users', 'Capacity Expansion Industries', 'Technology Modernization']
  },
  {
    id: 'industrial-solar-maintenance',
    title: 'Solar Maintenance Services',
    shortDesc: 'Industrial maintenance for megawatt solar systems',
    description: 'Keep your industrial solar investment performing at peak levels with our comprehensive industrial maintenance services. Ensure maximum industrial ROI and system reliability.',
    userType: 'industrial',
    category: 'Solar Services',
    subcategory: 'Maintenance',
    features: ['Industrial Performance Optimization', 'Predictive Maintenance', 'Industrial Reporting', 'Emergency Response', 'Compliance Management'],
    capacity: 'All Industrial Systems',
    duration: '8-24 Hours',
    warranty: '1 Year Service Warranty',
    savings: 'Maintain Peak Industrial Performance',
    image: '/sample_solar_image.jpg',
    icon: Wrench,
    price: '₹12,000 - ₹40,000 per visit',
    projects: 65,
    rating: 4.8,
    isPopular: true,
    benefits: [
      'Maintain optimal industrial energy savings',
      'Predictive maintenance for industrial systems',
      'Extend industrial system lifespan',
      'Ensure industrial warranty compliance',
      'Comprehensive industrial reporting'
    ],
    specifications: {
      'Service Frequency': 'Weekly/Monthly Industrial Service',
      'Scope': 'Complete Industrial System Check',
      'Testing': 'Industrial Electrical & Performance Testing',
      'Documentation': 'Industrial Performance Reports',
      'Emergency': '24/7 Industrial Emergency Support'
    },
    processSteps: [
      'Industrial System Inspection',
      'Industrial Performance Analysis',
      'Industrial Component Maintenance',
      'Industrial Safety & Compliance Check',
      'Industrial Report & Recommendations'
    ],
    targetCustomers: ['All Industrial Solar Users', 'Manufacturing Operations', 'Process Industries']
  },
  {
    id: 'industrial-solar-cleaning',
    title: 'Solar Panel Cleaning Services',
    shortDesc: 'Professional cleaning for maximum industrial energy output',
    description: 'Maximize your industrial energy generation with professional megawatt solar panel cleaning services. Regular industrial cleaning can increase system output by 30-45%.',
    userType: 'industrial',
    category: 'Solar Services',
    subcategory: 'Cleaning',
    features: ['Industrial Specialized Equipment', 'Safety Certified Teams', 'Industrial Scheduling', 'Performance Enhancement', 'Industrial Contracts'],
    capacity: 'All Industrial Systems',
    duration: '6-20 Hours',
    warranty: 'Service Quality Guarantee',
    savings: '30-45% Industrial Performance Boost',
    image: '/sample_solar_image.jpg',
    icon: Droplets,
    price: '₹3 - ₹6 per panel',
    projects: 85,
    rating: 4.6,
    isPopular: true,
    benefits: [
      'Increase industrial energy output by 30-45%',
      'Professional industrial cleaning service',
      'Industrial safety compliant cleaning methods',
      'Flexible industrial scheduling',
      'Industrial maintenance contracts available'
    ],
    specifications: {
      'Cleaning Method': 'Industrial Grade Equipment & Deionized Water',
      'Safety': 'Certified Industrial Cleaning Teams',
      'Frequency': 'Weekly/Bi-weekly Industrial Options',
      'Equipment': 'Specialized Industrial Solar Cleaning Tools',
      'Inspection': 'Industrial System Damage Assessment'
    },
    processSteps: [
      'Industrial Safety Setup & Assessment',
      'Professional Industrial Panel Cleaning',
      'Advanced Industrial Rinse & Dry Process',
      'Industrial System Inspection',
      'Industrial Performance Report'
    ],
    targetCustomers: ['All Industrial Solar Users', 'High Production Industries', 'Process Critical Industries']
  }
];
