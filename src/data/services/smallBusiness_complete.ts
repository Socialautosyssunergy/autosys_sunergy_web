import { Building2, Zap, Shield, Wrench, Settings, Droplets } from 'lucide-react';
import { Service } from './types';

export const smallBusinessServices: Service[] = [
  {
    id: 'business-ongrid-rooftop',
    title: 'On-Grid Rooftop Solar Installation',
    shortDesc: 'Commercial grid-tied solar system for businesses',
    description: 'Reduce your business operational costs with our commercial on-grid solar installations. Perfect for small and medium businesses looking to achieve significant cost savings through solar energy.',
    userType: 'small-business',
    category: 'Solar Installation',
    subcategory: 'On-Grid Solar',
    features: ['Tax Benefits', 'Accelerated Depreciation', 'Quick ROI', 'Net Metering', 'Green Business Image'],
    capacity: '5kW - 100kW',
    duration: '5-10 Days',
    warranty: '25 Years',
    savings: 'Up to 80%',
    image: '/sample_solar_image.jpg',
    icon: Building2,
    price: '₹50,000 - ₹60,000 per kW',
    projects: 850,
    rating: 4.9,
    isPopular: true,
    benefits: [
      'Reduce electricity costs by up to 80%',
      'Tax benefits and accelerated depreciation',
      'Quick return on investment (2-3 years)',
      'Enhance green business credentials',
      'Stable energy costs for 25+ years'
    ],
    specifications: {
      'Panel Type': 'Mono PERC 540W+',
      'Inverter': 'Three-Phase String Inverter',
      'Mounting': 'Commercial Mounting Structure',
      'Monitoring': 'Advanced Monitoring System',
      'Grid Connection': 'Commercial Net Metering'
    },
    processSteps: [
      'Site Assessment & Load Analysis',
      'System Design & Financial Analysis',
      'Permits & Net Metering Application',
      'Professional Installation',
      'Grid Connection & Commissioning'
    ],
    targetCustomers: ['Small Offices', 'Retail Stores', 'Restaurants', 'Manufacturing Units']
  },
  {
    id: 'business-offgrid-installation',
    title: 'Off-Grid Solar Installation',
    shortDesc: 'Energy independence for remote business locations',
    description: 'Ideal for businesses in remote locations or those seeking complete energy independence. Our off-grid systems provide reliable power for your operations without grid dependency.',
    userType: 'small-business',
    category: 'Solar Installation',
    subcategory: 'Off-Grid Solar',
    features: ['Complete Energy Independence', '24/7 Operations', 'Remote Location Suitable', 'Battery Backup', 'Scalable System'],
    capacity: '10kW - 200kW',
    duration: '7-15 Days',
    warranty: '25 Years Solar, 10 Years Battery',
    savings: '100% Grid Independence',
    image: '/sample_solar_image.jpg',
    icon: Shield,
    price: '₹75,000 - ₹1,10,000 per kW',
    projects: 280,
    rating: 4.8,
    isFeatured: true,
    benefits: [
      'Complete energy independence',
      'Suitable for remote locations',
      'Consistent power for operations',
      'No electricity bills',
      'Environmentally sustainable operations'
    ],
    specifications: {
      'Panel Type': 'High-Efficiency Mono PERC',
      'Inverter': 'Pure Sine Wave Inverter',
      'Battery': 'Commercial Grade Battery Bank',
      'Charge Controller': 'MPPT Controller',
      'Monitoring': 'Remote Monitoring System'
    },
    processSteps: [
      'Load Assessment & System Design',
      'Battery Bank Configuration',
      'Solar Array Installation',
      'Power Electronics Setup',
      'System Testing & Training'
    ],
    targetCustomers: ['Remote Offices', 'Telecom Towers', 'Mining Operations', 'Agricultural Processing']
  },
  {
    id: 'business-hybrid-installation',
    title: 'Hybrid Solar Installation',
    shortDesc: 'Grid connection with backup power for business continuity',
    description: 'Ensure business continuity with our hybrid solar systems. Get grid-tied benefits during normal operations and battery backup during power outages to keep your business running.',
    userType: 'small-business',
    category: 'Solar Installation',
    subcategory: 'Hybrid Solar',
    features: ['Business Continuity', 'Grid + Battery Backup', 'Load Prioritization', 'Smart Energy Management', 'Tax Benefits'],
    capacity: '10kW - 150kW',
    duration: '7-12 Days',
    warranty: '25 Years Solar, 10 Years Battery',
    savings: 'Up to 80% + Backup',
    image: '/sample_solar_image.jpg',
    icon: Zap,
    price: '₹65,000 - ₹85,000 per kW',
    projects: 520,
    rating: 4.9,
    isPopular: true,
    isFeatured: true,
    benefits: [
      'Ensure uninterrupted business operations',
      'Significant cost savings on electricity',
      'Smart load management during outages',
      'Tax benefits and depreciation advantages',
      'Enhanced business reputation'
    ],
    specifications: {
      'Panel Type': 'Commercial Grade Mono PERC',
      'Inverter': 'Commercial Hybrid Inverter',
      'Battery': 'Lithium-ion Battery Bank',
      'Grid Connection': 'Three-Phase Net Metering',
      'Smart Features': 'Load Prioritization System'
    },
    processSteps: [
      'Business Energy Audit',
      'Hybrid System Design',
      'Installation & Grid Connection',
      'Battery Integration',
      'Business Continuity Testing'
    ],
    targetCustomers: ['Critical Operations', 'Data Centers', 'Hospitals', 'Manufacturing Units']
  },
  {
    id: 'business-solar-upgrade',
    title: 'Solar System Upgrade Services',
    shortDesc: 'Upgrade your existing commercial solar system',
    description: 'Maximize your business solar investment with comprehensive upgrade services. From capacity additions to technology upgrades and battery integration for existing systems.',
    userType: 'small-business',
    category: 'Solar Services',
    subcategory: 'System Upgrade',
    features: ['Capacity Expansion', 'Technology Upgrade', 'Battery Addition', 'Inverter Replacement', 'Monitoring Enhancement'],
    capacity: 'As per existing system',
    duration: '3-7 Days',
    warranty: '10-25 Years (Component specific)',
    savings: 'Additional 20-50%',
    image: '/sample_solar_image.jpg',
    icon: Settings,
    price: '₹40,000 - ₹80,000',
    projects: 180,
    rating: 4.7,
    benefits: [
      'Increase system capacity and output',
      'Upgrade to latest solar technology',
      'Add backup power capability',
      'Improve system monitoring and control',
      'Extend overall system performance life'
    ],
    specifications: {
      'Upgrade Types': 'Panel Addition, Inverter Upgrade, Battery Integration',
      'Compatibility': 'All Commercial Solar Brands',
      'Technology': 'Latest Commercial Solar Technology',
      'Monitoring': 'Advanced Business Monitoring Systems',
      'Integration': 'Seamless Business System Integration'
    },
    processSteps: [
      'Existing System Assessment',
      'Business Requirements Analysis',
      'Upgrade Solution Design',
      'Professional Installation',
      'System Re-commissioning & Testing'
    ],
    targetCustomers: ['Existing Solar Businesses', 'Capacity Expansion Needs', 'Technology Upgrade Requirements']
  },
  {
    id: 'business-solar-maintenance',
    title: 'Solar Maintenance Services',
    shortDesc: 'Professional maintenance for commercial solar systems',
    description: 'Keep your business solar investment performing at peak levels with our comprehensive commercial maintenance services. Ensure maximum ROI and system longevity.',
    userType: 'small-business',
    category: 'Solar Services',
    subcategory: 'Maintenance',
    features: ['Performance Optimization', 'Preventive Maintenance', 'Business Reporting', 'Emergency Support', 'Warranty Compliance'],
    capacity: 'All Commercial Systems',
    duration: '4-8 Hours',
    warranty: '1 Year Service Warranty',
    savings: 'Maintain Peak Performance',
    image: '/sample_solar_image.jpg',
    icon: Wrench,
    price: '₹5,000 - ₹15,000 per visit',
    projects: 650,
    rating: 4.8,
    isPopular: true,
    benefits: [
      'Maintain optimal business energy savings',
      'Early detection and prevention of issues',
      'Extend commercial system lifespan',
      'Ensure warranty compliance',
      'Professional business reporting'
    ],
    specifications: {
      'Service Frequency': 'Monthly/Quarterly',
      'Scope': 'Complete Commercial System Check',
      'Testing': 'Advanced Electrical & Performance Testing',
      'Documentation': 'Business Performance Reports',
      'Emergency': 'Priority Business Support'
    },
    processSteps: [
      'Comprehensive System Inspection',
      'Performance Analysis & Testing',
      'Commercial Component Maintenance',
      'Safety & Compliance Check',
      'Business Report & Recommendations'
    ],
    targetCustomers: ['All Commercial Solar Owners', 'Performance Critical Businesses', 'Long-term Operations']
  },
  {
    id: 'business-solar-cleaning',
    title: 'Solar Panel Cleaning Services',
    shortDesc: 'Professional cleaning for maximum business energy output',
    description: 'Maximize your business energy generation with professional solar panel cleaning services. Regular cleaning can increase your commercial system output by 20-30%.',
    userType: 'small-business',
    category: 'Solar Services',
    subcategory: 'Cleaning',
    features: ['Specialized Commercial Equipment', 'Safety Certified Team', 'Business Scheduling', 'Performance Improvement', 'Service Contracts'],
    capacity: 'All Commercial Systems',
    duration: '2-6 Hours',
    warranty: 'Service Quality Guarantee',
    savings: '20-30% Performance Boost',
    image: '/sample_solar_image.jpg',
    icon: Droplets,
    price: '₹6 - ₹12 per panel',
    projects: 850,
    rating: 4.6,
    isPopular: true,
    benefits: [
      'Increase energy output by 20-30%',
      'Professional commercial cleaning',
      'Safety compliant cleaning methods',
      'Flexible business scheduling',
      'Regular maintenance contracts available'
    ],
    specifications: {
      'Cleaning Method': 'Commercial Grade Equipment & Deionized Water',
      'Safety': 'Certified Commercial Cleaning Team',
      'Frequency': 'Bi-weekly/Monthly Business Options',
      'Equipment': 'Specialized Commercial Solar Cleaning Tools',
      'Inspection': 'Commercial System Damage Assessment'
    },
    processSteps: [
      'Business Safety Setup & Assessment',
      'Professional Commercial Panel Cleaning',
      'Advanced Rinse & Dry Process',
      'Commercial System Inspection',
      'Business Performance Report'
    ],
    targetCustomers: ['All Commercial Solar Owners', 'High Production Requirements', 'Maximum ROI Seekers']
  }
];
