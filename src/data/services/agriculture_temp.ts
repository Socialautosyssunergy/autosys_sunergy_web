import { Sprout, Zap, Shield, Wrench, Settings, Droplets } from 'lucide-react';
import { Service } from './types';

export const agricultureServices: Service[] = [
  {
    id: 'agriculture-ongrid-rooftop',
    title: 'On-Grid Rooftop Solar Installation',
    shortDesc: 'Grid-tied solar systems for agricultural operations',
    description: 'Reduce agricultural operational costs with our farm-focused on-grid solar installations. Perfect for dairy farms, processing units, and agricultural facilities.',
    userType: 'agriculture',
    category: 'Solar Installation',
    subcategory: 'On-Grid Solar',
    features: ['Agricultural Subsidies', 'Farm Operations', 'Rural Electrification', 'Government Support', 'Agricultural Tax Benefits'],
    capacity: '5kW - 500kW',
    duration: '5-15 Days',
    warranty: '25 Years',
    savings: 'Up to 85%',
    image: '/sample_solar_image.jpg',
    icon: Sprout,
    price: '₹45,000 - ₹55,000 per kW',
    projects: 1250,
    rating: 4.9,
    isPopular: true,
    benefits: [
      'Reduce farm electricity costs by up to 85%',
      'Government subsidies up to 30-50%',
      'Support sustainable agriculture practices',
      'Improve farm profitability',
      'Rural electrification support'
    ],
    specifications: {
      'Panel Type': 'Agricultural Grade Mono PERC Panels',
      'Inverter': 'Farm-Suitable String Inverter',
      'Mounting': 'Agricultural Mounting Structure',
      'Monitoring': 'Farm Monitoring System',
      'Grid Connection': 'Agricultural Net Metering'
    },
    processSteps: [
      'Farm Energy Assessment',
      'Agricultural System Design',
      'Subsidy Application Support',
      'Farm Installation',
      'Agricultural Grid Connection'
    ],
    targetCustomers: ['Dairy Farms', 'Poultry Farms', 'Agricultural Processing Units', 'Farm Houses']
  },
  {
    id: 'agriculture-offgrid-installation',
    title: 'Off-Grid Solar Installation',
    shortDesc: 'Energy independence for remote agricultural operations',
    description: 'Perfect for remote farms and agricultural operations. Our agricultural off-grid systems provide reliable power for farming equipment, irrigation, and processing.',
    userType: 'agriculture',
    category: 'Solar Installation',
    subcategory: 'Off-Grid Solar',
    features: ['Complete Farm Independence', 'Remote Agriculture', 'Water Pumping', 'Agricultural Battery Storage', 'Rural Solutions'],
    capacity: '10kW - 1MW',
    duration: '7-20 Days',
    warranty: '25 Years Solar, 10 Years Battery',
    savings: '100% Grid Independence',
    image: '/sample_solar_image.jpg',
    icon: Shield,
    price: '₹60,000 - ₹90,000 per kW',
    projects: 450,
    rating: 4.8,
    isFeatured: true,
    benefits: [
      'Complete energy independence for farms',
      'Suitable for remote agricultural areas',
      'Reliable power for irrigation and processing',
      'No dependency on grid infrastructure',
      'Support sustainable farming practices'
    ],
    specifications: {
      'Panel Type': 'Agricultural High-Efficiency Panels',
      'Inverter': 'Farm Pure Sine Wave System',
      'Battery': 'Agricultural Battery Storage',
      'Charge Controller': 'Agricultural MPPT Controller',
      'Monitoring': 'Farm Remote Monitoring'
    },
    processSteps: [
      'Farm Load Assessment & Design',
      'Agricultural Battery Configuration',
      'Farm Solar Array Installation',
      'Agricultural Power System Setup',
      'Farm System Testing & Training'
    ],
    targetCustomers: ['Remote Farms', 'Agricultural Cooperatives', 'Rural Processing Units', 'Irrigation Systems']
  },
  {
    id: 'agriculture-hybrid-installation',
    title: 'Hybrid Solar Installation',
    shortDesc: 'Grid connection with agricultural backup power',
    description: 'Ensure continuous agricultural operations with our hybrid systems. Combine grid benefits with farm battery backup for uninterrupted farming operations.',
    userType: 'agriculture',
    category: 'Solar Installation',
    subcategory: 'Hybrid Solar',
    features: ['Farm Continuity', 'Agricultural Backup', 'Irrigation Security', 'Smart Farm Management', 'Crop Protection'],
    capacity: '15kW - 750kW',
    duration: '8-18 Days',
    warranty: '25 Years Solar, 10 Years Battery',
    savings: 'Up to 85% + Farm Backup',
    image: '/sample_solar_image.jpg',
    icon: Zap,
    price: '₹55,000 - ₹75,000 per kW',
    projects: 320,
    rating: 4.9,
    isPopular: true,
    isFeatured: true,
    benefits: [
      'Ensure uninterrupted agricultural operations',
      'Significant farm cost savings',
      'Smart irrigation and farm management',
      'Crop protection during power outages',
      'Enhanced farm productivity'
    ],
    specifications: {
      'Panel Type': 'Agricultural Grade Mono PERC Panels',
      'Inverter': 'Farm Hybrid Inverter System',
      'Battery': 'Agricultural Lithium-ion Battery',
      'Grid Connection': 'Farm Net Metering',
      'Smart Features': 'Agricultural Load Management'
    },
    processSteps: [
      'Farm Energy Audit',
      'Agricultural Hybrid System Design',
      'Farm Installation & Grid Connection',
      'Agricultural Battery Integration',
      'Farm Management System Setup'
    ],
    targetCustomers: ['Modern Farms', 'Integrated Agriculture', 'Agro-Processing Units', 'Smart Farming Operations']
  },
  {
    id: 'agriculture-solar-upgrade',
    title: 'Solar System Upgrade Services',
    shortDesc: 'Upgrade your existing agricultural solar system',
    description: 'Maximize your farm solar investment with comprehensive agricultural upgrade services. From capacity additions to technology upgrades and farm battery integration.',
    userType: 'agriculture',
    category: 'Solar Services',
    subcategory: 'System Upgrade',
    features: ['Farm Capacity Expansion', 'Agricultural Technology Upgrade', 'Farm Battery Addition', 'System Enhancement', 'Productivity Improvement'],
    capacity: 'As per existing farm system',
    duration: '3-10 Days',
    warranty: '10-25 Years (Component specific)',
    savings: 'Additional 25-50%',
    image: '/sample_solar_image.jpg',
    icon: Settings,
    price: '₹30,000 - ₹65,000',
    projects: 180,
    rating: 4.7,
    benefits: [
      'Increase farm system capacity',
      'Upgrade to latest agricultural technology',
      'Add farm backup power capability',
      'Improve farm monitoring and control',
      'Enhance overall farm energy performance'
    ],
    specifications: {
      'Upgrade Types': 'Panel Addition, Farm Inverter Upgrade, Battery Integration',
      'Compatibility': 'All Agricultural Solar Brands',
      'Technology': 'Latest Farm Solar Technology',
      'Monitoring': 'Advanced Farm Monitoring Systems',
      'Integration': 'Seamless Agricultural Integration'
    },
    processSteps: [
      'Existing Farm System Assessment',
      'Agricultural Requirements Analysis',
      'Farm Upgrade Solution Design',
      'Professional Farm Installation',
      'Agricultural System Re-commissioning'
    ],
    targetCustomers: ['Existing Solar Farms', 'Farm Capacity Expansion', 'Agricultural Technology Upgrade']
  },
  {
    id: 'agriculture-solar-maintenance',
    title: 'Solar Maintenance Services',
    shortDesc: 'Professional maintenance for agricultural solar systems',
    description: 'Keep your farm solar investment performing optimally with our comprehensive agricultural maintenance services. Ensure maximum farm productivity and system longevity.',
    userType: 'agriculture',
    category: 'Solar Services',
    subcategory: 'Maintenance',
    features: ['Farm Performance Optimization', 'Agricultural Maintenance', 'Farmer Reporting', 'Rural Support', 'Seasonal Maintenance'],
    capacity: 'All Agricultural Systems',
    duration: '3-8 Hours',
    warranty: '1 Year Service Warranty',
    savings: 'Maintain Peak Farm Performance',
    image: '/sample_solar_image.jpg',
    icon: Wrench,
    price: '₹3,000 - ₹10,000 per visit',
    projects: 1100,
    rating: 4.8,
    isPopular: true,
    benefits: [
      'Maintain optimal farm energy savings',
      'Early detection of agricultural system issues',
      'Extend farm system lifespan',
      'Ensure agricultural warranty compliance',
      'Professional farm reporting'
    ],
    specifications: {
      'Service Frequency': 'Quarterly/Seasonal Farm Service',
      'Scope': 'Complete Agricultural System Check',
      'Testing': 'Farm Electrical & Performance Testing',
      'Documentation': 'Farm Performance Reports',
      'Emergency': 'Rural Emergency Support'
    },
    processSteps: [
      'Farm System Inspection',
      'Agricultural Performance Analysis',
      'Farm Component Maintenance',
      'Agricultural Safety Check',
      'Farm Report & Recommendations'
    ],
    targetCustomers: ['All Solar Farms', 'Agricultural Operations', 'Rural Solar Users']
  },
  {
    id: 'agriculture-solar-cleaning',
    title: 'Solar Panel Cleaning Services',
    shortDesc: 'Professional cleaning for maximum agricultural energy output',
    description: 'Maximize your farm energy generation with professional agricultural solar panel cleaning services. Regular farm cleaning can increase system output by 20-35%.',
    userType: 'agriculture',
    category: 'Solar Services',
    subcategory: 'Cleaning',
    features: ['Agricultural Equipment', 'Farm Safety Team', 'Rural Scheduling', 'Performance Enhancement', 'Farm Contracts'],
    capacity: 'All Agricultural Systems',
    duration: '2-6 Hours',
    warranty: 'Service Quality Guarantee',
    savings: '20-35% Farm Performance Boost',
    image: '/sample_solar_image.jpg',
    icon: Droplets,
    price: '₹4 - ₹8 per panel',
    projects: 1250,
    rating: 4.6,
    isPopular: true,
    benefits: [
      'Increase farm energy output by 20-35%',
      'Professional agricultural cleaning service',
      'Farm safety compliant cleaning methods',
      'Flexible rural scheduling',
      'Agricultural maintenance contracts available'
    ],
    specifications: {
      'Cleaning Method': 'Farm Grade Equipment & Clean Water',
      'Safety': 'Certified Agricultural Cleaning Team',
      'Frequency': 'Monthly/Bi-monthly Farm Options',
      'Equipment': 'Specialized Farm Solar Cleaning Tools',
      'Inspection': 'Farm System Damage Assessment'
    },
    processSteps: [
      'Farm Safety Setup & Assessment',
      'Professional Agricultural Panel Cleaning',
      'Farm Rinse & Dry Process',
      'Agricultural System Inspection',
      'Farm Performance Report'
    ],
    targetCustomers: ['All Solar Farms', 'High Production Farms', 'Agricultural Cooperatives']
  }
];
