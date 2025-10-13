import { Building2, Zap, Shield, Wrench, Settings, Droplets } from 'lucide-react';
import { Service } from './types';

export const corporateServices: Service[] = [
  {
    id: 'corporate-ongrid-rooftop',
    title: 'On-Grid Rooftop Solar Installation',
    shortDesc: 'Enterprise-grade grid-tied solar systems for corporations',
    description: 'Achieve significant cost reduction and meet CSR goals with our corporate on-grid solar installations. Perfect for large offices, headquarters, and corporate facilities.',
    userType: 'company',
    category: 'Solar Installation',
    subcategory: 'On-Grid Solar',
    features: ['CSR Achievement', 'Significant Cost Reduction', 'Carbon Neutrality', 'Tax Benefits', 'Brand Enhancement'],
    capacity: '100kW - 5MW',
    duration: '15-45 Days',
    warranty: '25 Years',
    savings: 'Up to 75%',
    image: '/sample_solar_image.jpg',
    icon: Building2,
    price: '₹45,000 - ₹55,000 per kW',
    projects: 185,
    rating: 4.9,
    isPopular: true,
    benefits: [
      'Achieve corporate sustainability goals',
      'Reduce operational costs by up to 75%',
      'Enhance corporate brand image',
      'Meet ESG compliance requirements',
      'Long-term energy cost stability'
    ],
    specifications: {
      'Panel Type': 'Enterprise Grade Mono PERC 540W+',
      'Inverter': 'Enterprise String/Central Inverter',
      'Mounting': 'Corporate Mounting Structure',
      'Monitoring': 'Enterprise Monitoring System',
      'Grid Connection': 'Corporate HT/LT Connection'
    },
    processSteps: [
      'Corporate Energy Audit & Analysis',
      'Enterprise System Design',
      'Corporate Approvals & Permits',
      'Professional Enterprise Installation',
      'Corporate Grid Connection & Commissioning'
    ],
    targetCustomers: ['Corporate Headquarters', 'Large Offices', 'Corporate Facilities', 'Enterprise Buildings']
  },
  {
    id: 'corporate-offgrid-installation',
    title: 'Off-Grid Solar Installation',
    shortDesc: 'Energy independence for remote corporate facilities',
    description: 'Ideal for corporate facilities in remote locations or those seeking complete energy independence. Our enterprise off-grid systems ensure reliable operations.',
    userType: 'company',
    category: 'Solar Installation',
    subcategory: 'Off-Grid Solar',
    features: ['Complete Energy Independence', 'Remote Operations', 'Corporate Reliability', 'Enterprise Battery Storage', 'Scalable Infrastructure'],
    capacity: '200kW - 10MW',
    duration: '30-60 Days',
    warranty: '25 Years Solar, 10 Years Battery',
    savings: '100% Grid Independence',
    image: '/sample_solar_image.jpg',
    icon: Shield,
    price: '₹65,000 - ₹95,000 per kW',
    projects: 45,
    rating: 4.8,
    isFeatured: true,
    benefits: [
      'Complete energy independence for corporate operations',
      'Suitable for remote corporate facilities',
      'Consistent power for critical operations',
      'Zero dependency on grid infrastructure',
      'Corporate sustainability leadership'
    ],
    specifications: {
      'Panel Type': 'Enterprise High-Efficiency Panels',
      'Inverter': 'Enterprise Pure Sine Wave System',
      'Battery': 'Enterprise Battery Storage System',
      'Charge Controller': 'Enterprise MPPT Controller',
      'Monitoring': 'Corporate Remote Monitoring'
    },
    processSteps: [
      'Corporate Load Assessment & Design',
      'Enterprise Battery Bank Configuration',
      'Corporate Solar Array Installation',
      'Enterprise Power System Setup',
      'Corporate System Testing & Training'
    ],
    targetCustomers: ['Remote Corporate Facilities', 'Mining Companies', 'Telecom Infrastructure', 'Corporate Campuses']
  },
  {
    id: 'corporate-hybrid-installation',
    title: 'Hybrid Solar Installation',
    shortDesc: 'Grid connection with enterprise backup power',
    description: 'Ensure business continuity with our corporate hybrid systems. Combine grid benefits with enterprise-grade battery backup for uninterrupted corporate operations.',
    userType: 'company',
    category: 'Solar Installation',
    subcategory: 'Hybrid Solar',
    features: ['Business Continuity', 'Enterprise Backup', 'Critical Load Management', 'Corporate Energy Security', 'ESG Compliance'],
    capacity: '150kW - 7.5MW',
    duration: '20-50 Days',
    warranty: '25 Years Solar, 10 Years Battery',
    savings: 'Up to 75% + Enterprise Backup',
    image: '/sample_solar_image.jpg',
    icon: Zap,
    price: '₹55,000 - ₹75,000 per kW',
    projects: 95,
    rating: 4.9,
    isPopular: true,
    isFeatured: true,
    benefits: [
      'Ensure uninterrupted corporate operations',
      'Significant enterprise cost savings',
      'Corporate-grade load management',
      'Meet corporate sustainability goals',
      'Enhanced corporate energy security'
    ],
    specifications: {
      'Panel Type': 'Corporate Grade Mono PERC Panels',
      'Inverter': 'Enterprise Hybrid Inverter System',
      'Battery': 'Enterprise Lithium-ion Battery Bank',
      'Grid Connection': 'Corporate HT Net Metering',
      'Smart Features': 'Enterprise Load Prioritization'
    },
    processSteps: [
      'Corporate Energy Audit',
      'Enterprise Hybrid System Design',
      'Corporate Installation & Grid Connection',
      'Enterprise Battery Integration',
      'Corporate Power Management Setup'
    ],
    targetCustomers: ['Data Centers', 'Corporate Headquarters', 'Mission-Critical Facilities', 'Enterprise Operations']
  },
  {
    id: 'corporate-solar-upgrade',
    title: 'Solar System Upgrade Services',
    shortDesc: 'Upgrade your existing corporate solar infrastructure',
    description: 'Maximize your corporate solar investment with comprehensive enterprise upgrade services. From capacity expansions to technology upgrades and enterprise battery integration.',
    userType: 'company',
    category: 'Solar Services',
    subcategory: 'System Upgrade',
    features: ['Enterprise Capacity Expansion', 'Technology Modernization', 'Corporate Battery Addition', 'System Enhancement', 'Performance Optimization'],
    capacity: 'As per existing corporate system',
    duration: '10-30 Days',
    warranty: '10-25 Years (Component specific)',
    savings: 'Additional 30-60%',
    image: '/sample_solar_image.jpg',
    icon: Settings,
    price: '₹45,000 - ₹85,000',
    projects: 65,
    rating: 4.7,
    benefits: [
      'Increase corporate system capacity significantly',
      'Upgrade to latest enterprise technology',
      'Add enterprise backup power capability',
      'Improve corporate monitoring and control',
      'Enhance overall corporate energy performance'
    ],
    specifications: {
      'Upgrade Types': 'Panel Addition, Enterprise Inverter Upgrade, Battery Integration',
      'Compatibility': 'All Enterprise Solar System Brands',
      'Technology': 'Latest Enterprise Solar Technology',
      'Monitoring': 'Advanced Corporate Monitoring Systems',
      'Integration': 'Seamless Enterprise System Integration'
    },
    processSteps: [
      'Existing Corporate System Assessment',
      'Enterprise Requirements Analysis',
      'Corporate Upgrade Solution Design',
      'Professional Enterprise Installation',
      'Corporate System Re-commissioning'
    ],
    targetCustomers: ['Existing Corporate Solar Users', 'Enterprise Expansion Needs', 'Technology Modernization']
  },
  {
    id: 'corporate-solar-maintenance',
    title: 'Solar Maintenance Services',
    shortDesc: 'Enterprise maintenance for corporate solar systems',
    description: 'Keep your corporate solar investment performing at peak levels with our comprehensive enterprise maintenance services. Ensure maximum corporate ROI and system reliability.',
    userType: 'company',
    category: 'Solar Services',
    subcategory: 'Maintenance',
    features: ['Enterprise Performance Optimization', 'Corporate Preventive Maintenance', 'Executive Reporting', 'Priority Support', 'Compliance Management'],
    capacity: 'All Corporate Systems',
    duration: '6-16 Hours',
    warranty: '1 Year Service Warranty',
    savings: 'Maintain Peak Corporate Performance',
    image: '/sample_solar_image.jpg',
    icon: Wrench,
    price: '₹8,000 - ₹25,000 per visit',
    projects: 185,
    rating: 4.8,
    isPopular: true,
    benefits: [
      'Maintain optimal corporate energy savings',
      'Early detection of enterprise system issues',
      'Extend corporate system lifespan',
      'Ensure corporate warranty compliance',
      'Professional executive reporting'
    ],
    specifications: {
      'Service Frequency': 'Monthly/Quarterly Corporate Service',
      'Scope': 'Complete Enterprise System Check',
      'Testing': 'Enterprise Electrical & Performance Testing',
      'Documentation': 'Executive Performance Reports',
      'Emergency': 'Priority Corporate Support'
    },
    processSteps: [
      'Enterprise System Inspection',
      'Corporate Performance Analysis',
      'Enterprise Component Maintenance',
      'Corporate Safety & Compliance Check',
      'Executive Report & Recommendations'
    ],
    targetCustomers: ['All Corporate Solar Users', 'Enterprise Operations', 'Corporate Facility Management']
  },
  {
    id: 'corporate-solar-cleaning',
    title: 'Solar Panel Cleaning Services',
    shortDesc: 'Professional cleaning for maximum corporate energy output',
    description: 'Maximize your corporate energy generation with professional enterprise solar panel cleaning services. Regular corporate cleaning can increase system output by 25-40%.',
    userType: 'company',
    category: 'Solar Services',
    subcategory: 'Cleaning',
    features: ['Enterprise Specialized Equipment', 'Corporate Safety Team', 'Executive Scheduling', 'Performance Enhancement', 'Corporate Contracts'],
    capacity: 'All Corporate Systems',
    duration: '4-12 Hours',
    warranty: 'Service Quality Guarantee',
    savings: '25-40% Corporate Performance Boost',
    image: '/sample_solar_image.jpg',
    icon: Droplets,
    price: '₹4 - ₹8 per panel',
    projects: 220,
    rating: 4.6,
    isPopular: true,
    benefits: [
      'Increase corporate energy output by 25-40%',
      'Professional enterprise cleaning service',
      'Corporate safety compliant cleaning methods',
      'Flexible executive scheduling',
      'Enterprise maintenance contracts available'
    ],
    specifications: {
      'Cleaning Method': 'Enterprise Grade Equipment & Deionized Water',
      'Safety': 'Certified Corporate Cleaning Team',
      'Frequency': 'Bi-weekly/Monthly Corporate Options',
      'Equipment': 'Specialized Enterprise Solar Cleaning Tools',
      'Inspection': 'Corporate System Damage Assessment'
    },
    processSteps: [
      'Corporate Safety Setup & Assessment',
      'Professional Enterprise Panel Cleaning',
      'Advanced Corporate Rinse & Dry Process',
      'Enterprise System Inspection',
      'Corporate Performance Report'
    ],
    targetCustomers: ['All Corporate Solar Users', 'Enterprise High Performance Requirements', 'Corporate Sustainability Leaders']
  }
];
