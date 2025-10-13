import { Home, Zap, Wrench, Battery, Settings, Droplets } from 'lucide-react';
import { Service } from './types';

export const homeownersServices: Service[] = [
  {
    id: 'home-ongrid-rooftop',
    title: 'On-Grid Rooftop Solar Installation',
    shortDesc: 'Complete grid-tied solar system for maximum savings',
    description: 'Connect to the electricity grid and reduce your bills dramatically with our on-grid rooftop solar installations. Perfect for homeowners looking to maximize savings through net metering.',
    userType: 'homeowners',
    category: 'Solar Installation',
    subcategory: 'On-Grid Solar',
    features: ['Net Metering', 'Grid Backup', 'Zero Electricity Bills', 'Tax Benefits', 'Property Value Increase'],
    capacity: '1kW - 10kW',
    duration: '2-3 Days',
    warranty: '25 Years',
    savings: 'Up to 90%',
    image: '/sample_solar_image.jpg',
    icon: Home,
    price: '₹55,000 - ₹65,000 per kW',
    projects: 1200,
    rating: 4.9,
    isPopular: true,
    benefits: [
      'Reduce electricity bills by up to 90%',
      'Earn money through net metering',
      'Increase property value by 15-20%',
      'Government subsidies available',
      'Zero pollution, green energy'
    ],
    specifications: {
      'Panel Type': 'Mono PERC 540W+',
      'Inverter': 'String Inverter',
      'Mounting': 'Galvanized Iron Structure',
      'Monitoring': 'Smart App Monitoring',
      'Grid Connection': 'Bi-directional Meter'
    },
    processSteps: [
      'Site Survey & Assessment',
      'System Design & Approval',
      'Net Metering Application',
      'Professional Installation',
      'Grid Connection & Commissioning'
    ],
    targetCustomers: ['Villa Owners', 'Independent Houses', 'Apartment Owners']
  },
  {
    id: 'home-offgrid-installation',
    title: 'Off-Grid Solar Installation',
    shortDesc: 'Complete energy independence with battery storage',
    description: 'Achieve complete energy independence with our off-grid solar installations. Perfect for remote locations or homeowners who want complete backup power during outages.',
    userType: 'homeowners',
    category: 'Solar Installation',
    subcategory: 'Off-Grid Solar',
    features: ['Complete Energy Independence', '24/7 Power Supply', 'Battery Backup', 'Remote Monitoring', 'Expandable System'],
    capacity: '2kW - 15kW',
    duration: '3-5 Days',
    warranty: '25 Years Solar, 10 Years Battery',
    savings: '100% Grid Independence',
    image: '/sample_solar_image.jpg',
    icon: Battery,
    price: '₹85,000 - ₹1,20,000 per kW',
    projects: 450,
    rating: 4.8,
    isFeatured: true,
    benefits: [
      'Complete energy independence',
      '24/7 power supply even during outages',
      'Perfect for remote locations',
      'No electricity bills',
      'Environmentally friendly'
    ],
    specifications: {
      'Panel Type': 'Mono PERC 540W+',
      'Inverter': 'Pure Sine Wave Inverter',
      'Battery': 'Lithium/Gel Battery Bank',
      'Charge Controller': 'MPPT Controller',
      'Monitoring': 'Remote Monitoring System'
    },
    processSteps: [
      'Load Assessment & Design',
      'Battery Bank Configuration',
      'Solar Array Installation',
      'Power Electronics Setup',
      'System Testing & Handover'
    ],
    targetCustomers: ['Remote Homes', 'Weekend Homes', 'Backup Power Seekers']
  },
  {
    id: 'home-hybrid-installation',
    title: 'Hybrid Solar Installation',
    shortDesc: 'Best of both worlds - grid connection with battery backup',
    description: 'Get the benefits of grid-tied systems with the security of battery backup. Our hybrid systems provide savings through net metering while ensuring power during outages.',
    userType: 'homeowners',
    category: 'Solar Installation',
    subcategory: 'Hybrid Solar',
    features: ['Net Metering', 'Battery Backup', 'Grid Independence During Outages', 'Smart Energy Management', 'Load Prioritization'],
    capacity: '3kW - 12kW',
    duration: '3-4 Days',
    warranty: '25 Years Solar, 10 Years Battery',
    savings: 'Up to 90% + Backup Power',
    image: '/sample_solar_image.jpg',
    icon: Zap,
    price: '₹70,000 - ₹90,000 per kW',
    projects: 680,
    rating: 4.9,
    isPopular: true,
    isFeatured: true,
    benefits: [
      'Electricity bill reduction up to 90%',
      'Uninterrupted power during outages',
      'Smart load management',
      'Future-ready expandable system',
      'Maximum energy utilization'
    ],
    specifications: {
      'Panel Type': 'Mono PERC 540W+',
      'Inverter': 'Hybrid Inverter',
      'Battery': 'Lithium-ion Battery',
      'Grid Connection': 'Bi-directional Meter',
      'Smart Features': 'App-based Monitoring'
    },
    processSteps: [
      'Energy Audit & Load Analysis',
      'Hybrid System Design',
      'Installation & Grid Connection',
      'Battery Integration',
      'Smart System Commissioning'
    ],
    targetCustomers: ['Modern Families', 'Tech-Savvy Homeowners', 'Backup Power Requirements']
  },
  {
    id: 'home-solar-upgrade',
    title: 'Solar System Upgrade Services',
    shortDesc: 'Upgrade your existing solar system for better performance',
    description: 'Maximize the performance of your existing solar installation with our comprehensive upgrade services. From adding more panels to upgrading inverters and adding battery storage.',
    userType: 'homeowners',
    category: 'Solar Services',
    subcategory: 'System Upgrade',
    features: ['Capacity Addition', 'Technology Upgrade', 'Battery Addition', 'Inverter Upgrade', 'Monitoring Upgrade'],
    capacity: 'As per existing system',
    duration: '1-2 Days',
    warranty: '10-25 Years (Component specific)',
    savings: 'Additional 20-40%',
    image: '/sample_solar_image.jpg',
    icon: Settings,
    price: '₹35,000 - ₹75,000',
    projects: 320,
    rating: 4.7,
    benefits: [
      'Increase system capacity and output',
      'Upgrade to latest technology',
      'Add battery backup capability',
      'Improve system monitoring',
      'Extend system life'
    ],
    specifications: {
      'Upgrade Types': 'Panel Addition, Inverter Upgrade, Battery Addition',
      'Compatibility': 'All Major Brands',
      'New Technology': 'Latest Solar Technology Integration',
      'Monitoring': 'Advanced Monitoring Systems',
      'Integration': 'Seamless System Integration'
    },
    processSteps: [
      'Existing System Assessment',
      'Upgrade Options Analysis',
      'Component Selection',
      'Professional Installation',
      'System Re-commissioning'
    ],
    targetCustomers: ['Existing Solar Customers', 'System Performance Issues', 'Capacity Expansion Needs']
  },
  {
    id: 'home-solar-maintenance',
    title: 'Solar Maintenance Services',
    shortDesc: 'Professional maintenance to ensure optimal performance',
    description: 'Keep your solar system running at peak performance with our comprehensive maintenance services. Regular maintenance ensures maximum output and extends system life.',
    userType: 'homeowners',
    category: 'Solar Services',
    subcategory: 'Maintenance',
    features: ['Performance Monitoring', 'Preventive Maintenance', 'Component Testing', 'Fault Diagnosis', 'Performance Reports'],
    capacity: 'All System Sizes',
    duration: '2-4 Hours',
    warranty: '1 Year Service Warranty',
    savings: 'Maintain 100% Performance',
    image: '/sample_solar_image.jpg',
    icon: Wrench,
    price: '₹2,500 - ₹8,000 per visit',
    projects: 850,
    rating: 4.8,
    isPopular: true,
    benefits: [
      'Maintain optimal system performance',
      'Early detection of issues',
      'Extend system lifespan',
      'Ensure warranty compliance',
      'Peace of mind operation'
    ],
    specifications: {
      'Service Frequency': 'Quarterly/Half-yearly',
      'Scope': 'Complete System Check',
      'Testing': 'Electrical & Mechanical Testing',
      'Documentation': 'Detailed Service Reports',
      'Emergency': '24/7 Support Available'
    },
    processSteps: [
      'Visual Inspection',
      'Electrical Testing',
      'Performance Analysis',
      'Component Maintenance',
      'Service Report & Recommendations'
    ],
    targetCustomers: ['All Solar System Owners', 'Commercial Properties', 'Performance Conscious Users']
  },
  {
    id: 'home-solar-cleaning',
    title: 'Solar Panel Cleaning Services',
    shortDesc: 'Professional cleaning to maximize energy output',
    description: 'Regular professional cleaning of solar panels can increase energy output by 15-25%. Our specialized cleaning services ensure your panels operate at maximum efficiency.',
    userType: 'homeowners',
    category: 'Solar Services',
    subcategory: 'Cleaning',
    features: ['Specialized Cleaning Equipment', 'Eco-friendly Process', 'Safety Compliant', 'Performance Improvement', 'Regular Service Packages'],
    capacity: 'All System Sizes',
    duration: '1-2 Hours',
    warranty: 'Service Guarantee',
    savings: '15-25% Performance Boost',
    image: '/sample_solar_image.jpg',
    icon: Droplets,
    price: '₹8 - ₹15 per panel',
    projects: 1500,
    rating: 4.6,
    isPopular: true,
    benefits: [
      'Increase energy output by 15-25%',
      'Extend panel lifespan',
      'Remove dust, bird droppings, debris',
      'Professional safe cleaning',
      'Regular maintenance packages available'
    ],
    specifications: {
      'Cleaning Method': 'Soft Brush & Deionized Water',
      'Safety': 'Trained Safety-certified Team',
      'Frequency': 'Monthly/Bi-monthly Options',
      'Equipment': 'Specialized Solar Cleaning Tools',
      'Inspection': 'Visual Damage Assessment'
    },
    processSteps: [
      'Safety Setup & Assessment',
      'Gentle Panel Cleaning',
      'Rinse & Dry Process',
      'Visual Inspection',
      'Performance Check & Report'
    ],
    targetCustomers: ['All Solar Panel Owners', 'High Dust Areas', 'Maximum Performance Seekers']
  }
];
