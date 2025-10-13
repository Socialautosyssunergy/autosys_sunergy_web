'use client';
import React, { useState, useEffect } from 'react';
import { useTheme } from '@/contexts/ThemeContext';
import { getThemeClasses, getThemeHover, TRANSITION_CLASSES } from '@/utils/themeUtils';
import '@/styles/serviceMobileOptimized.css';
import { 
  ArrowLeft,
  Home, 
  Building2, 
  Factory, 
  Wrench, 
  Shield, 
  Zap,
  Star,
  CheckCircle,
  Clock,
  Award,
  TrendingUp,
  Users,
  Phone,
  Mail,
  Calendar,
  Download,
  Share2,
  Heart,
  MapPin,
  ChevronRight,
  PlayCircle,
  FileText,
  Calculator,
  Lightbulb,
  BarChart3,
  Target,
  ThumbsUp,
  ArrowRight,
  Globe
} from 'lucide-react';
import Header from '@/components/home/Header';
import Footer from '@/components/home/Footer';
import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation';
import { getServiceById, allServices } from '@/data/services';
import type { Service } from '@/data/services/types';

type ServiceDetail = {
  id: string;
  title: string;
  shortDesc: string;
  fullDescription: string;
  category: string;
  subcategory: string;
  features: string[];
  detailedFeatures: {
    title: string;
    description: string;
    icon: React.ElementType;
  }[];
  capacity: string;
  duration: string;
  warranty: string;
  savings: string;
  images: string[];
  icon: React.ElementType;
  price: string;
  priceBreakdown: {
    component: string;
    cost: string;
    percentage: number;
  }[];
  projects: number;
  rating: number;
  reviews: {
    name: string;
    rating: number;
    comment: string;
    location: string;
    date: string;
  }[];
  specifications: { [key: string]: string };
  installationProcess: {
    step: number;
    title: string;
    description: string;
    duration: string;
  }[];
  benefits: string[];
  caseStudies: {
    title: string;
    location: string;
    capacity: string;
    savings: string;
    image: string;
  }[];
  faqs: {
    question: string;
    answer: string;
  }[];
  relatedServices: string[];
  isPopular?: boolean;
  isFeatured?: boolean;
};

const servicesDatabase: { [key: string]: ServiceDetail } = {
  'grid-tied-solar': {
    id: 'grid-tied-solar',
    title: 'Grid-Tied Solar Systems',
    shortDesc: 'Connected solar systems with net metering benefits',
    fullDescription: 'Grid-tied solar systems represent the most popular and cost-effective way to harness solar energy. These systems are directly connected to your local electrical grid, allowing you to feed excess power back to the utility company through net metering. At Autosys Sunergy, we have installed over 1250 grid-tied systems across India and all over the world, helping customers achieve up to 95% reduction in their electricity bills while maintaining the reliability of grid connectivity.',
    category: 'residential',
    subcategory: 'Grid Connected',
    features: ['Net Metering', 'Zero Maintenance', 'Grid Backup', 'Lower Investment', 'Instant Savings'],
    detailedFeatures: [
      {
        title: 'Net Metering Excellence',
        description: 'Advanced bi-directional meter installation with seamless grid synchronization and automatic excess power export',
        icon: Zap
      },
      {
        title: 'Grid Stability & Backup',
        description: 'Continuous power supply with instant grid backup during solar generation gaps',
        icon: Shield
      },
      {
        title: 'Cost-Effective Solution',
        description: 'Lower initial investment compared to battery-based systems with faster payback period',
        icon: TrendingUp
      },
      {
        title: 'Smart Monitoring',
        description: 'Real-time production monitoring with mobile app integration and performance analytics',
        icon: BarChart3
      }
    ],
    capacity: '1kW - 100MW',
    duration: '2-7 Days',
    warranty: '25 Years',
    savings: 'Up to 95%',
    images: ['/sample_solar_image.jpg', '/Solar_product_sample_image.jpg', '/Solar_services_sample_image.jpg'],
    icon: Home,
    price: 'Get Price on Request',
    priceBreakdown: [
      { component: 'Solar Panels (Tier-1)', cost: 'Contact for Quote', percentage: 60 },
      { component: 'Grid-Tie Inverter', cost: 'Contact for Quote', percentage: 25 },
      { component: 'Mounting & Installation', cost: 'Contact for Quote', percentage: 10 },
      { component: 'Net Meter & Documentation', cost: 'Contact for Quote', percentage: 5 }
    ],
    projects: 1250,
    rating: 4.9,
    reviews: [
      {
        name: 'Rajesh Sharma',
        rating: 5,
        comment: 'Outstanding grid-tied system! My electricity bill dropped dramatically. Net metering works perfectly and I even earn from excess generation.',
        location: 'Indore, MP',
        date: '2024-01-15'
      },
      {
        name: 'Priya Industries',
        rating: 5,
        comment: 'Autosys Sunergy delivered exactly what they promised. Our 50kW grid-tied system provides excellent monthly savings. Professional installation and excellent support.',
        location: 'Bhopal, MP',
        date: '2024-02-03'
      },
      {
        name: 'Amit Patel',
        rating: 5,
        comment: 'Best decision for my home! 5kW grid-tied system installed flawlessly. Monitoring app shows real-time generation. Highly recommend Autosys Sunergy.',
        location: 'Ujjain, MP',
        date: '2024-01-28'
      }
    ],
    specifications: {
      'Panel Technology': 'Monocrystalline PERC/Bifacial',
      'Panel Efficiency': '20-22%',
      'Inverter Type': 'String/Central Grid-Tie',
      'Grid Synchronization': 'Automatic with Anti-Islanding',
      'Net Metering': 'Bi-directional Smart Meter',
      'Monitoring': 'WiFi/4G Real-time',
      'Standards': 'IEC 61215, IEC 61730, IEEE 1547',
      'Grid Protection': 'Over/Under Voltage & Frequency Protection'
    },
    installationProcess: [
      {
        step: 1,
        title: 'Site Assessment & Design',
        description: 'Comprehensive site survey including shadow analysis, roof assessment, and electrical infrastructure evaluation',
        duration: '2-3 hours'
      },
      {
        step: 2,
        title: 'Net Metering Application',
        description: 'Complete documentation and application submission to electricity board for net metering approval',
        duration: '1-2 weeks'
      },
      {
        step: 3,
        title: 'System Installation',
        description: 'Professional installation of solar panels, inverters, and safety systems by certified technicians',
        duration: '1-3 days'
      },
      {
        step: 4,
        title: 'Grid Connection & Testing',
        description: 'Grid synchronization testing, net meter installation, and complete system commissioning',
        duration: '1-2 days'
      },
      {
        step: 5,
        title: 'Monitoring Setup & Training',
        description: 'Smart monitoring system setup and customer training on system operation and maintenance',
        duration: '2-3 hours'
      }
    ],
    benefits: [
      'Immediate electricity bill reduction up to 95%',
      'Earn money from excess power generation',
      'No battery maintenance or replacement costs',
      'Lower initial investment compared to off-grid systems',
      'Continuous power supply with grid backup',
      'Government subsidies and tax benefits available',
      'Increase property value by 10-15%',
      'Environmental impact - reduce carbon footprint',
      '25-year manufacturer warranty with performance guarantee',
      'Quick payback period of 4-6 years'
    ],
    caseStudies: [
      {
        title: 'Residential Villa - Indore',
        location: 'AB Road, Indore',
        capacity: '8kW Grid-Tied System',
        savings: '₹12,500/month bill savings',
        image: '/sample_solar_image.jpg'
      },
      {
        title: 'Commercial Building - Bhopal',
        location: 'MP Nagar, Bhopal',
        capacity: '50kW Grid-Tied System',
        savings: '₹38,000/month + export earnings',
        image: '/Solar_services_sample_image.jpg'
      },
      {
        title: 'Manufacturing Unit - Pithampur',
        location: 'Industrial Area, Pithampur',
        capacity: '200kW Grid-Tied System',
        savings: '₹1.8L/month operational cost reduction',
        image: '/Solar_product_sample_image.jpg'
      }
    ],
    faqs: [
      {
        question: 'What happens to my solar system during power cuts?',
        answer: 'Grid-tied systems automatically shut down during power cuts for safety reasons. This protects utility workers fixing the grid. Power resumes immediately when grid supply is restored.'
      },
      {
        question: 'How does net metering work and how much can I earn?',
        answer: 'Net metering allows you to export excess solar power to the grid. You get credited for exported units at applicable rates. Many customers earn ₹2,000-8,000 monthly from excess generation.'
      },
      {
        question: 'What is the payback period for grid-tied solar systems?',
        answer: 'With current electricity rates and government subsidies, the payback period is typically 4-6 years. After that, you enjoy free electricity for the next 19+ years.'
      },
      {
        question: 'Do I need any special permissions for grid-tied installation?',
        answer: 'Yes, you need net metering approval from your electricity board. We handle all documentation and approvals as part of our service.'
      },
      {
        question: 'Can I expand my grid-tied system later?',
        answer: 'Yes, grid-tied systems are easily expandable. You can add more panels and inverter capacity based on your increased energy needs and available roof space.'
      },
      {
        question: 'What maintenance is required for grid-tied systems?',
        answer: 'Minimal maintenance required - mainly periodic panel cleaning and annual electrical inspection. We provide comprehensive O&M packages for worry-free operation.'
      }
    ],
    relatedServices: ['hybrid-solar', 'solar-consulting', 'maintenance-services'],
    isPopular: true
  },
  'off-grid-solar': {
    id: 'off-grid-solar',
    title: 'Off-Grid Solar Systems',
    shortDesc: 'Complete energy independence with battery backup',
    fullDescription: 'Off-grid solar systems provide complete energy independence by storing solar power in batteries for 24/7 usage. These systems are perfect for remote locations, areas with unreliable grid supply, or for those who want complete energy autonomy. Autosys Sunergy has successfully installed 680+ off-grid systems, providing reliable power to homes, farms, and businesses in remote areas of India and all over the world where grid connectivity is poor or unavailable.',
    category: 'residential',
    subcategory: 'Independent Power',
    features: ['Battery Backup', 'Energy Independence', 'Remote Location Support', 'Uninterrupted Power', 'Scalable Design'],
    detailedFeatures: [
      {
        title: 'Advanced Battery Management',
        description: 'Intelligent battery management system with deep cycle lithium/lead-acid batteries for optimal performance and longevity',
        icon: Shield
      },
      {
        title: 'Complete Energy Independence',
        description: 'Zero dependency on grid electricity with 24/7 power availability regardless of external conditions',
        icon: Target
      },
      {
        title: 'Remote Location Expertise',
        description: 'Specialized solutions for areas without grid connectivity or with frequent power outages',
        icon: MapPin
      },
      {
        title: 'Scalable & Modular Design',
        description: 'Easily expandable system design that can grow with your power requirements',
        icon: TrendingUp
      }
    ],
    capacity: '1kW - 50kW',
    duration: '3-5 Days',
    warranty: '25 Years Solar + 5-10 Years Battery',
    savings: '100% Grid Independence',
    images: ['/Solar_product_sample_image.jpg', '/sample_solar_image.jpg', '/Solar_services_sample_image.jpg'],
    icon: Zap,
    price: 'Request Quote',
    priceBreakdown: [
      { component: 'Solar Panels', cost: 'Quote on Request', percentage: 40 },
      { component: 'Battery Bank', cost: 'Quote on Request', percentage: 35 },
      { component: 'Charge Controller & Inverter', cost: 'Quote on Request', percentage: 15 },
      { component: 'Installation & Accessories', cost: 'Quote on Request', percentage: 10 }
    ],
    projects: 680,
    rating: 4.8,
    reviews: [
      {
        name: 'Farmer Ramesh Singh',
        rating: 5,
        comment: 'Perfect solution for our remote farmhouse! No grid connection needed. Our 5kW off-grid system powers everything including water pumps and cold storage.',
        location: 'Dewas, MP',
        date: '2024-01-20'
      },
      {
        name: 'Resort Owner - Maheshwar',
        rating: 5,
        comment: 'Autosys Sunergy installed 15kW off-grid system for our eco-resort. Guests love the sustainable power, and we save massively on diesel generators.',
        location: 'Maheshwar, MP',
        date: '2023-12-15'
      },
      {
        name: 'Village School Project',
        rating: 5,
        comment: 'Excellent off-grid installation for our village school. Children can now study in the evening with proper lighting and fans. Great social impact!',
        location: 'Rural Sagar, MP',
        date: '2024-02-10'
      }
    ],
    specifications: {
      'Panel Technology': 'Monocrystalline High-Efficiency',
      'Battery Type': 'Lithium LiFePO4/Deep Cycle Lead-Acid',
      'Charge Controller': 'MPPT with Load Management',
      'Inverter Type': 'Pure Sine Wave Off-Grid',
      'Backup Capacity': '3-7 Days (depending on usage)',
      'System Voltage': '12V/24V/48V DC',
      'Monitoring': 'Battery SOC, System Performance',
      'Protection': 'Overcharge, Deep Discharge, Short Circuit'
    },
    installationProcess: [
      {
        step: 1,
        title: 'Energy Audit & Load Analysis',
        description: 'Detailed assessment of daily energy consumption patterns and critical load requirements',
        duration: '3-4 hours'
      },
      {
        step: 2,
        title: 'System Design & Sizing',
        description: 'Custom system design with optimal solar panel, battery, and inverter sizing for reliable operation',
        duration: '2-3 days'
      },
      {
        step: 3,
        title: 'Site Preparation',
        description: 'Site preparation including battery room setup, grounding, and safety installations',
        duration: '1 day'
      },
      {
        step: 4,
        title: 'Component Installation',
        description: 'Installation of solar panels, battery bank, charge controllers, and inverter systems',
        duration: '2-3 days'
      },
      {
        step: 5,
        title: 'Testing & Commissioning',
        description: 'Complete system testing, load balancing, and customer training on system operation',
        duration: '1 day'
      }
    ],
    benefits: [
      'Complete energy independence from grid',
      '24/7 power availability with battery backup',
      'Perfect for remote locations without grid access',
      'No electricity bills forever',
      'Backup power during extended outages',
      'Modular design for easy expansion',
      'Environmentally friendly with zero emissions',
      'Ideal for critical loads requiring uninterrupted power',
      'Government subsidies available for rural installations',
      'Long-term energy security and price stability'
    ],
    caseStudies: [
      {
        title: 'Remote Farmhouse - Dewas',
        location: 'Village Kankariya, Dewas',
        capacity: '8kW Off-Grid + 20kWh Battery',
        savings: 'Complete energy independence',
        image: '/Solar_product_sample_image.jpg'
      },
      {
        title: 'Eco-Resort - Maheshwar',
        location: 'Narmada Banks, Maheshwar',
        capacity: '25kW Off-Grid + 80kWh Battery',
        savings: 'Substantial diesel cost savings',
        image: '/sample_solar_image.jpg'
      },
      {
        title: 'Village Electrification Project',
        location: 'Remote Village, Sagar',
        capacity: '12kW Community Off-Grid',
        savings: 'Provided electricity to 30 families',
        image: '/Solar_services_sample_image.jpg'
      }
    ],
    faqs: [
      {
        question: 'How many days of backup power can I get with off-grid systems?',
        answer: 'Depending on battery capacity and load, typically 3-7 days of backup. We size the system based on your critical loads and desired backup duration.'
      },
      {
        question: 'What happens when batteries are fully charged and I have excess solar power?',
        answer: 'The charge controller prevents overcharging. Excess power can be diverted to water heating, pumping, or other dump loads to maximize solar utilization.'
      },
      {
        question: 'How long do off-grid system batteries last?',
        answer: 'Lithium batteries last 10-15 years, while quality lead-acid batteries last 5-8 years. We provide comprehensive battery management to maximize lifespan.'
      },
      {
        question: 'Can I run heavy appliances like AC and washing machine on off-grid systems?',
        answer: 'Yes, but the system must be sized accordingly. We design systems to handle your specific load requirements including heavy appliances.'
      },
      {
        question: 'Is off-grid solar suitable for commercial establishments?',
        answer: 'Absolutely! We have installed off-grid systems for resorts, schools, hospitals, and manufacturing units in remote locations with great success.'
      },
      {
        question: 'What maintenance is required for off-grid systems?',
        answer: 'Regular battery maintenance, cleaning of panels, and periodic system checks. We provide comprehensive maintenance packages for optimal performance.'
      }
    ],
    relatedServices: ['hybrid-solar', 'grid-tied-solar', 'maintenance-services'],
    isFeatured: true
  },
  'hybrid-solar': {
    id: 'hybrid-solar',
    title: 'Hybrid Solar Systems',
    shortDesc: 'Best of both worlds - grid connection with battery backup',
    fullDescription: 'Hybrid solar systems combine the advantages of both grid-tied and off-grid systems, offering the perfect balance of cost-effectiveness and energy security. These advanced systems remain connected to the grid for net metering benefits while providing battery backup during power outages. Autosys Sunergy has installed 420+ hybrid systems, helping customers achieve maximum energy savings while ensuring uninterrupted power supply for critical loads during grid failures.',
    category: 'commercial',
    subcategory: 'Advanced Systems',
    features: ['Grid Connection', 'Battery Backup', 'Power Outage Protection', 'Load Management', 'Smart Monitoring'],
    detailedFeatures: [
      {
        title: 'Intelligent Load Management',
        description: 'Smart load prioritization with automatic switching between solar, battery, and grid power based on availability and cost',
        icon: Lightbulb
      },
      {
        title: 'Grid-Interactive Technology',
        description: 'Seamless integration with grid including net metering while maintaining battery backup capability',
        icon: Zap
      },
      {
        title: 'Power Outage Protection',
        description: 'Automatic backup power activation during grid failures ensuring continuous operation of critical loads',
        icon: Shield
      },
      {
        title: 'Advanced Energy Management',
        description: 'Sophisticated energy management system optimizing solar usage, battery charging, and grid interaction',
        icon: BarChart3
      }
    ],
    capacity: '3kW - 100kW',
    duration: '3-7 Days',
    warranty: '25 Years Solar + 10 Years Battery',
    savings: '80-90% + Backup Security',
    images: ['/Solar_services_sample_image.jpg', '/Solar_product_sample_image.jpg', '/sample_solar_image.jpg'],
    icon: Building2,
    price: 'Request Quote',
    priceBreakdown: [
      { component: 'Solar Panels', cost: 'Quote on Request', percentage: 40 },
      { component: 'Hybrid Inverter + Battery', cost: 'Quote on Request', percentage: 45 },
      { component: 'Installation & Accessories', cost: 'Quote on Request', percentage: 10 },
      { component: 'Smart Monitoring System', cost: 'Quote on Request', percentage: 5 }
    ],
    projects: 420,
    rating: 4.9,
    reviews: [
      {
        name: 'Dr. Amit Verma',
        rating: 5,
        comment: 'Perfect solution for my clinic! During power cuts, critical equipment continues running on battery while non-essential loads are managed smartly. Excellent system design by Autosys Sunergy.',
        location: 'Indore, MP',
        date: '2024-01-18'
      },
      {
        name: 'Hotel Paradise',
        rating: 5,
        comment: 'Our 30kW hybrid system provides excellent savings on electricity bills and seamless backup during frequent power cuts. Guests never face any power issues.',
        location: 'Bhopal, MP',
        date: '2024-02-05'
      },
      {
        name: 'IT Office - TechPark',
        rating: 5,
        comment: 'Hybrid system is perfect for our office. We save on electricity bills through net metering and never lose power during outages. UPS systems are no longer needed!',
        location: 'Indore, MP',
        date: '2024-01-30'
      }
    ],
    specifications: {
      'Panel Technology': 'Monocrystalline Bifacial',
      'Inverter Type': 'Hybrid Grid-Interactive',
      'Battery Technology': 'Lithium Iron Phosphate (LiFePO4)',
      'Grid Connection': 'Net Metering Compatible',
      'Backup Switching': 'Automatic UPS Function',
      'Monitoring': 'Advanced IoT-based System',
      'Load Management': 'Smart Priority-based Switching',
      'Efficiency': 'System efficiency >95%'
    },
    installationProcess: [
      {
        step: 1,
        title: 'Comprehensive Energy Assessment',
        description: 'Detailed analysis of energy consumption, critical loads, and backup requirements',
        duration: '4-5 hours'
      },
      {
        step: 2,
        title: 'Hybrid System Design',
        description: 'Custom design integrating solar, battery, and grid components with smart load management',
        duration: '3-4 days'
      },
      {
        step: 3,
        title: 'Pre-Installation Setup',
        description: 'Site preparation, net metering application, and component procurement',
        duration: '1-2 weeks'
      },
      {
        step: 4,
        title: 'System Installation',
        description: 'Installation of solar panels, hybrid inverter, battery bank, and smart monitoring system',
        duration: '3-5 days'
      },
      {
        step: 5,
        title: 'Commissioning & Training',
        description: 'Complete system testing, grid synchronization, and comprehensive customer training',
        duration: '1-2 days'
      }
    ],
    benefits: [
      'Maximum energy savings through net metering',
      'Uninterrupted power during grid outages',
      'Smart load prioritization and management',
      'Lower battery requirement compared to off-grid',
      'Best return on investment with multiple revenue streams',
      'Suitable for both residential and commercial applications',
      'Future-ready technology with smart grid compatibility',
      'Reduced dependency on diesel generators',
      'Environmental benefits with reduced carbon footprint',
      'Enhanced property value and energy security'
    ],
    caseStudies: [
      {
        title: 'Medical Clinic - Indore',
        location: 'Vijay Nagar, Indore',
        capacity: '10kW Hybrid + 15kWh Battery',
        savings: 'Excellent monthly savings + Backup Security',
        image: '/Solar_services_sample_image.jpg'
      },
      {
        title: 'Boutique Hotel - Bhopal',
        location: 'MP Nagar, Bhopal',
        capacity: '40kW Hybrid + 60kWh Battery',
        savings: 'Significant monthly savings + Guest Satisfaction',
        image: '/Solar_product_sample_image.jpg'
      },
      {
        title: 'IT Office Complex - Indore',
        location: 'Scheme 54, Indore',
        capacity: '75kW Hybrid + 100kWh Battery',
        savings: 'Substantial monthly savings + Zero Downtime',
        image: '/sample_solar_image.jpg'
      }
    ],
    faqs: [
      {
        question: 'How does a hybrid system decide when to use battery vs grid power?',
        answer: 'The intelligent energy management system considers factors like electricity rates, battery charge level, solar generation, and load priority to optimize energy usage automatically.'
      },
      {
        question: 'Can I customize which loads run on battery during power cuts?',
        answer: 'Yes! We configure critical and non-critical load panels. During outages, only critical loads (lights, fans, computers) run on battery while heavy loads are disconnected.'
      },
      {
        question: 'What happens if battery is low and there is a power cut?',
        answer: 'The system provides backup based on available battery charge. If battery is low, it will prioritize the most critical loads and can be manually managed through the monitoring system.'
      },
      {
        question: 'Is hybrid system more expensive than grid-tied or off-grid?',
        answer: 'Initial cost is higher than grid-tied but lower than equivalent off-grid capacity. The ROI is excellent considering both energy savings and backup value.'
      },
      {
        question: 'Can I add more battery capacity to my hybrid system later?',
        answer: 'Yes, most hybrid systems are designed for battery expansion. We can add more battery banks as your backup requirements increase.'
      },
      {
        question: 'How does net metering work with hybrid systems?',
        answer: 'Hybrid systems support net metering just like grid-tied systems. Excess solar power is first used to charge batteries, then exported to grid for credits.'
      }
    ],
    relatedServices: ['grid-tied-solar', 'off-grid-solar', 'maintenance-services'],
    isFeatured: true
  },
  'commercial-solar': {
    id: 'commercial-solar',
    title: 'Commercial Solar Systems',
    shortDesc: 'Cost-effective solar solutions for businesses',
    fullDescription: 'Scale your business operations with sustainable energy solutions designed for commercial enterprises. Our commercial solar installations help businesses reduce operational costs, meet CSR goals, and demonstrate environmental responsibility. With proven expertise in 245+ commercial projects, we deliver turnkey solutions that maximize ROI while ensuring minimal business disruption during installation.',
    category: 'commercial',
    subcategory: 'Business Solutions',
    features: ['Custom Design', 'Energy Audit', 'Tax Benefits', 'Quick ROI', 'Professional Installation'],
    detailedFeatures: [
      {
        title: 'Energy Audit & Optimization',
        description: 'Comprehensive analysis of your energy consumption patterns for optimal system sizing',
        icon: BarChart3
      },
      {
        title: 'Financial Modeling',
        description: 'Detailed ROI analysis with various financing options including CAPEX and OPEX models',
        icon: Calculator
      },
      {
        title: 'Grid Stability',
        description: 'Advanced power management systems ensure stable electricity supply for critical operations',
        icon: Zap
      },
      {
        title: 'Compliance Support',
        description: 'Complete assistance with regulatory compliance and environmental certifications',
        icon: FileText
      }
    ],
    capacity: '10kW - 1MW',
    duration: '5-15 Days',
    warranty: '25 Years',
    savings: '60-80%',
    images: ['/Solar_services_sample_image.jpg', '/sample_solar_image.jpg', '/Solar_product_sample_image.jpg'],
    icon: Building2,
    price: 'Request Quote',
    priceBreakdown: [
      { component: 'Solar Panels', cost: 'Quote on Request', percentage: 60 },
      { component: 'Inverters & Electronics', cost: 'Quote on Request', percentage: 20 },
      { component: 'Structure & Installation', cost: 'Quote on Request', percentage: 15 },
      { component: 'Design & Commissioning', cost: 'Quote on Request', percentage: 5 }
    ],
    projects: 245,
    rating: 4.8,
    reviews: [
      {
        name: 'Medicap University',
        rating: 5,
        comment: 'Outstanding installation quality and excellent project management. Reduced our electricity costs significantly.',
        location: 'Indore, MP',
        date: '2023-08-20'
      }
    ],
    specifications: {
      'Panel Type': 'Poly/Monocrystalline',
      'System Efficiency': '18-22%',
      'Inverter Type': 'String/Central/Power Optimizers',
      'Mounting Structure': 'Hot-dip Galvanized Steel',
      'Grid Connection': 'LT/HT Net Metering',
      'Monitoring': 'SCADA System',
      'Standards': 'IEC 61215, IEC 61730'
    },
    installationProcess: [
      {
        step: 1,
        title: 'Business Assessment',
        description: 'Detailed analysis of energy consumption, load patterns, and business requirements',
        duration: '3-5 days'
      },
      {
        step: 2,
        title: 'Technical Design',
        description: 'Engineering design with 3D modeling and performance simulation',
        duration: '1 week'
      },
      {
        step: 3,
        title: 'Financial Proposal',
        description: 'Comprehensive financial analysis with multiple financing options',
        duration: '3-5 days'
      },
      {
        step: 4,
        title: 'Approvals & Permits',
        description: 'All regulatory approvals and utility interconnection agreements',
        duration: '2-4 weeks'
      },
      {
        step: 5,
        title: 'Installation & Commissioning',
        description: 'Professional installation with minimal business disruption',
        duration: '5-15 days'
      }
    ],
    benefits: [
      'Reduce operational costs by 60-80%',
      'Accelerated depreciation benefits',
      'Enhanced corporate image',
      'Meet sustainability goals',
      'Long-term energy price stability',
      'Improved LEED certification prospects',
      'Government incentives and subsidies'
    ],
    caseStudies: [
      {
        title: 'Medicap University',
        location: 'Indore, MP',
        capacity: '240kW System',
        savings: 'Significant monthly savings',
        image: '/Solar_services_sample_image.jpg'
      }
    ],
    faqs: [
      {
        question: 'How does commercial solar financing work?',
        answer: 'We offer multiple financing options including CAPEX (ownership), OPEX (solar leasing), and power purchase agreements (PPA).'
      },
      {
        question: 'What are the tax benefits for commercial solar?',
        answer: 'Businesses can avail accelerated depreciation up to 40% in the first year and input tax credit on GST.'
      }
    ],
    relatedServices: ['industrial-megawatt', 'solar-consulting', 'maintenance-services'],
    isFeatured: true
  },
  'industrial-megawatt': {
    id: 'industrial-megawatt',
    title: 'Industrial Megawatt Projects',
    shortDesc: 'Large-scale industrial solar installations',
    fullDescription: 'Massive solar installations engineered for industries with high energy consumption. Our megawatt-scale projects represent the pinnacle of solar engineering, combining advanced technology, comprehensive project management, and proven expertise in utility-scale installations. We have successfully delivered 15 industrial projects with capacities ranging from 1MW to 50MW+, helping industries achieve significant cost reductions while meeting their sustainability objectives.',
    category: 'industrial',
    subcategory: 'Large Scale',
    features: ['Project Management', 'Grid Integration', 'Performance Monitoring', 'O&M Services', 'Financial Modeling'],
    detailedFeatures: [
      {
        title: 'Utility-Scale Engineering',
        description: 'Advanced engineering solutions for megawatt-scale installations with grid stability features',
        icon: Factory
      },
      {
        title: 'Project Management Excellence',
        description: 'Dedicated project managers ensure on-time delivery within budget and quality standards',
        icon: Target
      },
      {
        title: 'Grid Integration Expertise',
        description: 'Seamless integration with existing electrical infrastructure and grid connectivity',
        icon: Zap
      },
      {
        title: 'Long-term O&M',
        description: 'Comprehensive operation and maintenance services to ensure optimal performance',
        icon: Wrench
      }
    ],
    capacity: '1MW - 50MW+',
    duration: '3-12 Months',
    warranty: '25 Years',
    savings: '50-70%',
    images: ['/Solar_product_sample_image.jpg', '/sample_solar_image.jpg', '/Solar_services_sample_image.jpg'],
    icon: Factory,
    price: 'Custom Quote',
    priceBreakdown: [
      { component: 'Solar Modules', cost: 'Custom', percentage: 55 },
      { component: 'Inverters & SCADA', cost: 'Custom', percentage: 20 },
      { component: 'Civil & Electrical', cost: 'Custom', percentage: 15 },
      { component: 'Project Management', cost: 'Custom', percentage: 10 }
    ],
    projects: 15,
    rating: 5.0,
    reviews: [
      {
        name: 'Trident Group',
        rating: 5,
        comment: 'Exceptional project execution for our 5.4MW installation. Professional team and excellent quality.',
        location: 'Budhni, MP',
        date: '2023-11-15'
      }
    ],
    specifications: {
      'Technology': 'Tier-1 Mono PERC/Bifacial',
      'System Efficiency': '19-23%',
      'Inverter Technology': 'Central/String with Power Optimizers',
      'Mounting': 'Fixed Tilt/Single Axis Tracking',
      'Grid Connection': 'HT/EHT with dedicated substation',
      'Monitoring': 'Advanced SCADA with AI analytics',
      'Compliance': 'CEA, CEIG, Environmental clearances'
    },
    installationProcess: [
      {
        step: 1,
        title: 'Feasibility Study',
        description: 'Comprehensive technical and financial feasibility analysis',
        duration: '2-4 weeks'
      },
      {
        step: 2,
        title: 'Detailed Engineering',
        description: 'Complete engineering design with performance modeling and simulations',
        duration: '4-8 weeks'
      },
      {
        step: 3,
        title: 'Regulatory Approvals',
        description: 'All statutory approvals, environmental clearances, and grid connectivity',
        duration: '8-16 weeks'
      },
      {
        step: 4,
        title: 'Procurement & Construction',
        description: 'Equipment procurement and systematic construction with quality control',
        duration: '12-40 weeks'
      },
      {
        step: 5,
        title: 'Testing & Commissioning',
        description: 'Comprehensive testing, commissioning, and performance validation',
        duration: '2-4 weeks'
      }
    ],
    benefits: [
      'Significant reduction in power costs',
      'Energy security and price stability',
      'Carbon footprint reduction',
      'Enhanced corporate sustainability',
      'Accelerated depreciation benefits',
      'Improved credit ratings',
      'Long-term energy contracts'
    ],
    caseStudies: [
      {
        title: 'Trident Group Industrial Complex',
        location: 'Budhni, MP',
        capacity: '5.4MW System',
        savings: 'Substantial annual savings',
        image: '/sample_solar_image.jpg'
      }
    ],
    faqs: [
      {
        question: 'What is the typical project timeline for megawatt installations?',
        answer: 'Depending on project size and complexity, industrial megawatt projects typically take 6-12 months from contract signing to commissioning.'
      },
      {
        question: 'Do you provide operation and maintenance services?',
        answer: 'Yes, we offer comprehensive O&M packages including preventive maintenance, performance monitoring, and 24/7 support.'
      }
    ],
    relatedServices: ['commercial-solar', 'maintenance-services', 'solar-consulting'],
    isFeatured: true
  },
  'solar-water-pumping': {
    id: 'solar-water-pumping',
    title: 'Solar Water Pumping',
    shortDesc: 'Agricultural solar pump solutions',
    fullDescription: 'Reliable water pumping systems powered by solar energy, specifically designed for agricultural irrigation and remote water supply needs. Our solar pumping solutions eliminate dependency on grid electricity and diesel generators, providing farmers with cost-effective, sustainable water management. With 420+ successful installations, we offer both submersible and surface pumping systems with advanced control features.',
    category: 'residential',
    subcategory: 'Agricultural',
    features: ['Variable Speed Control', 'Dry Run Protection', 'Remote Monitoring', 'Weather Resistant', 'Low Maintenance'],
    detailedFeatures: [
      {
        title: 'Smart Pump Controller',
        description: 'Advanced MPPT controller with variable frequency drive for optimal performance',
        icon: Lightbulb
      },
      {
        title: 'Water Level Sensors',
        description: 'Automatic water level detection with dry run and overflow protection',
        icon: Shield
      },
      {
        title: 'Mobile Monitoring',
        description: 'Real-time pump status monitoring through mobile app with alerts',
        icon: BarChart3
      },
      {
        title: 'Weather Protection',
        description: 'IP65 rated components designed for outdoor agricultural environments',
        icon: Award
      }
    ],
    capacity: '1HP - 25HP',
    duration: '1-2 Days',
    warranty: '5 Years',
    savings: '100%',
    images: ['/sample_solar_image.jpg', '/Solar_product_sample_image.jpg', '/Solar_services_sample_image.jpg'],
    icon: Zap,
    price: 'Request Quote',
    priceBreakdown: [
      { component: 'Solar Panels', cost: 'Quote on Request', percentage: 60 },
      { component: 'Pump & Controller', cost: 'Quote on Request', percentage: 25 },
      { component: 'Structure & Installation', cost: 'Quote on Request', percentage: 10 },
      { component: 'Accessories & Wiring', cost: 'Quote on Request', percentage: 5 }
    ],
    projects: 420,
    rating: 4.7,
    reviews: [
      {
        name: 'Ramesh Patel',
        rating: 5,
        comment: 'Excellent solar pump installation. No more diesel costs and works perfectly even in cloudy weather.',
        location: 'Dewas, MP',
        date: '2024-01-10'
      },
      {
        name: 'Suresh Farmer',
        rating: 5,
        comment: 'Best investment for my farm. Water pumping cost reduced to zero and very reliable.',
        location: 'Ujjain, MP',
        date: '2023-12-05'
      }
    ],
    specifications: {
      'Pump Type': 'Submersible/Surface',
      'Solar Panels': 'Monocrystalline',
      'Controller': 'MPPT with VFD',
      'Water Output': '10,000-50,000 L/day',
      'Head Range': '10-150 meters',
      'Protection': 'IP65 rated',
      'Monitoring': '4G/WiFi enabled'
    },
    installationProcess: [
      {
        step: 1,
        title: 'Site Assessment',
        description: 'Evaluation of water source, head requirements, and daily water needs',
        duration: '2-3 hours'
      },
      {
        step: 2,
        title: 'System Sizing',
        description: 'Custom pump and solar panel sizing based on requirements',
        duration: '1-2 days'
      },
      {
        step: 3,
        title: 'Pump Installation',
        description: 'Professional pump installation with proper grounding and safety measures',
        duration: '1 day'
      },
      {
        step: 4,
        title: 'Solar Array Setup',
        description: 'Solar panel mounting and electrical connections',
        duration: '1 day'
      },
      {
        step: 5,
        title: 'Testing & Training',
        description: 'System testing and farmer training on operation and maintenance',
        duration: '2-3 hours'
      }
    ],
    benefits: [
      'Zero operational electricity costs',
      'No diesel fuel expenses',
      'Minimal maintenance requirements',
      'Government subsidies available',
      'Environmentally friendly operation',
      'Reliable water supply',
      'Remote operation capability'
    ],
    caseStudies: [
      {
        title: 'Agriculture Farm - Dewas',
        location: 'Dewas, MP',
        capacity: '5HP Solar Pump',
        savings: 'Excellent monthly savings',
        image: '/sample_solar_image.jpg'
      },
      {
        title: 'Irrigation Project - Ujjain',
        location: 'Ujjain, MP',
        capacity: '10HP Solar Pump',
        savings: 'Substantial monthly savings',
        image: '/Solar_services_sample_image.jpg'
      }
    ],
    faqs: [
      {
        question: 'How much water can a solar pump deliver per day?',
        answer: 'Depending on pump capacity and sunlight, our systems can deliver 10,000 to 50,000 liters per day.'
      },
      {
        question: 'What happens during cloudy days?',
        answer: 'The pump operates at reduced capacity during cloudy weather. We recommend water storage tanks for consistent supply.'
      },
      {
        question: 'Is there any government subsidy available?',
        answer: 'Yes, PM-KUSUM scheme provides up to 90% subsidy for solar pumps under Component A.'
      }
    ],
    relatedServices: ['residential-rooftop', 'maintenance-services', 'solar-consulting']
  },
  'maintenance-services': {
    id: 'maintenance-services',
    title: 'Solar O&M Services',
    shortDesc: 'Comprehensive maintenance and monitoring',
    fullDescription: 'Keep your solar investment performing at peak efficiency with our comprehensive operation and maintenance services. Our O&M packages are designed to maximize system performance, extend equipment life, and ensure optimal return on investment. With 1200+ systems under maintenance, we provide preventive care, performance monitoring, and rapid response repair services.',
    category: 'maintenance',
    subcategory: 'Support Services',
    features: ['Regular Cleaning', 'Performance Monitoring', '24/7 Support', 'Preventive Maintenance', 'Repair Services'],
    detailedFeatures: [
      {
        title: 'Preventive Maintenance',
        description: 'Scheduled inspections, cleaning, and component checks to prevent failures',
        icon: Calendar
      },
      {
        title: '24/7 Monitoring',
        description: 'Continuous performance monitoring with immediate alerts for any issues',
        icon: BarChart3
      },
      {
        title: 'Rapid Response Service',
        description: 'Quick response team for emergency repairs and technical support',
        icon: Clock
      },
      {
        title: 'Performance Analytics',
        description: 'Detailed performance reports and optimization recommendations',
        icon: TrendingUp
      }
    ],
    capacity: 'All Systems',
    duration: 'Ongoing',
    warranty: 'Service Guarantee',
    savings: 'Optimized Performance',
    images: ['/Solar_services_sample_image.jpg', '/sample_solar_image.jpg', '/Solar_product_sample_image.jpg'],
    icon: Wrench,
    price: 'Request Quote',
    priceBreakdown: [
      { component: 'Regular Cleaning', cost: 'Quote on Request', percentage: 40 },
      { component: 'Technical Inspection', cost: 'Quote on Request', percentage: 30 },
      { component: 'Performance Monitoring', cost: 'Quote on Request', percentage: 20 },
      { component: 'Emergency Support', cost: 'Quote on Request', percentage: 10 }
    ],
    projects: 1200,
    rating: 4.8,
    reviews: [
      {
        name: 'Amit Industries',
        rating: 5,
        comment: 'Excellent maintenance service. Our system performance has improved by 15% after their service.',
        location: 'Indore, MP',
        date: '2024-02-15'
      },
      {
        name: 'Residential Customer',
        rating: 5,
        comment: 'Very professional team. Regular maintenance keeps our system running efficiently.',
        location: 'Bhopal, MP',
        date: '2024-01-20'
      }
    ],
    specifications: {
      'Service Frequency': 'Monthly/Quarterly',
      'Response Time': '24-48 hours',
      'Coverage': 'India and all over the world',
      'Monitoring': 'Real-time remote',
      'Reporting': 'Monthly/Quarterly',
      'Support': '24/7 helpdesk',
      'Warranty': 'Service guarantee'
    },
    installationProcess: [
      {
        step: 1,
        title: 'System Assessment',
        description: 'Initial comprehensive evaluation of existing solar installation',
        duration: '2-4 hours'
      },
      {
        step: 2,
        title: 'Service Plan Creation',
        description: 'Customized maintenance plan based on system type and requirements',
        duration: '1-2 days'
      },
      {
        step: 3,
        title: 'Monitoring Setup',
        description: 'Installation of remote monitoring system if not present',
        duration: '1 day'
      },
      {
        step: 4,
        title: 'Regular Maintenance',
        description: 'Scheduled cleaning, inspection, and preventive maintenance',
        duration: 'Ongoing'
      },
      {
        step: 5,
        title: 'Performance Reporting',
        description: 'Regular performance reports and optimization recommendations',
        duration: 'Monthly/Quarterly'
      }
    ],
    benefits: [
      'Maximize system performance',
      'Extend equipment lifespan',
      'Minimize unexpected failures',
      'Maintain warranty validity',
      'Optimize energy generation',
      'Professional technical support',
      'Cost-effective service packages'
    ],
    caseStudies: [
      {
        title: 'Commercial Complex - Indore',
        location: 'Indore, MP',
        capacity: '100kW System',
        savings: '15% improved efficiency',
        image: '/Solar_services_sample_image.jpg'
      },
      {
        title: 'Residential Maintenance',
        location: 'Bhopal, MP',
        capacity: '5kW System',
        savings: '12% improved performance',
        image: '/sample_solar_image.jpg'
      }
    ],
    faqs: [
      {
        question: 'How often should solar panels be cleaned?',
        answer: 'In dusty environments like MP, we recommend monthly cleaning for optimal performance.'
      },
      {
        question: 'What is included in preventive maintenance?',
        answer: 'Visual inspection, electrical testing, cleaning, connection tightening, and performance analysis.'
      },
      {
        question: 'Do you provide emergency repair services?',
        answer: 'Yes, we offer 24/7 emergency support with rapid response teams across India and all over the world.'
      }
    ],
    relatedServices: ['residential-rooftop', 'commercial-solar', 'industrial-megawatt']
  },
  'solar-consulting': {
    id: 'solar-consulting',
    title: 'Solar Consulting & Design',
    shortDesc: 'Expert consultation and system design',
    fullDescription: 'Professional solar consulting services including feasibility studies, system design, and project planning for optimal solar solutions. Our expert consultants bring decades of experience in solar technology, project management, and financial modeling to help clients make informed decisions about their solar investments. We have provided consulting services for 180+ projects ranging from residential to utility-scale installations.',
    category: 'commercial',
    subcategory: 'Consulting',
    features: ['Site Assessment', 'Financial Analysis', 'Custom Design', 'Permit Support', 'Project Planning'],
    detailedFeatures: [
      {
        title: 'Feasibility Analysis',
        description: 'Comprehensive technical and economic feasibility studies with ROI projections',
        icon: Calculator
      },
      {
        title: 'System Design',
        description: 'Professional engineering design with 3D modeling and performance simulations',
        icon: Lightbulb
      },
      {
        title: 'Financial Modeling',
        description: 'Detailed financial analysis with various financing options and incentive calculations',
        icon: BarChart3
      },
      {
        title: 'Regulatory Support',
        description: 'Complete assistance with permits, approvals, and compliance requirements',
        icon: FileText
      }
    ],
    capacity: 'All Projects',
    duration: '1-2 Weeks',
    warranty: 'Design Guarantee',
    savings: 'Optimized ROI',
    images: ['/Solar_product_sample_image.jpg', '/Solar_services_sample_image.jpg', '/sample_solar_image.jpg'],
    icon: Shield,
    price: 'Request Quote',
    priceBreakdown: [
      { component: 'Site Assessment', cost: 'Quote on Request', percentage: 40 },
      { component: 'System Design', cost: 'Quote on Request', percentage: 30 },
      { component: 'Financial Analysis', cost: 'Quote on Request', percentage: 20 },
      { component: 'Documentation', cost: 'Quote on Request', percentage: 10 }
    ],
    projects: 180,
    rating: 4.9,
    reviews: [
      {
        name: 'Tech Corporation',
        rating: 5,
        comment: 'Excellent consulting service. Their detailed analysis helped us make the right investment decision.',
        location: 'Indore, MP',
        date: '2024-01-25'
      },
      {
        name: 'Educational Institute',
        rating: 5,
        comment: 'Professional team with deep expertise. Great support throughout the project planning phase.',
        location: 'Bhopal, MP',
        date: '2023-12-10'
      }
    ],
    specifications: {
      'Analysis Tools': 'PVSyst, AutoCAD, PVSOL',
      'Modeling': '3D system modeling',
      'Simulations': 'Performance simulations',
      'Standards': 'IEC, IEEE compliance',
      'Documentation': 'Comprehensive reports',
      'Support': 'Project lifecycle',
      'Certification': 'Professional engineers'
    },
    installationProcess: [
      {
        step: 1,
        title: 'Initial Consultation',
        description: 'Understanding client requirements, objectives, and constraints',
        duration: '1-2 hours'
      },
      {
        step: 2,
        title: 'Site Assessment',
        description: 'Detailed site survey including shading analysis and structural evaluation',
        duration: '1-2 days'
      },
      {
        step: 3,
        title: 'Design Development',
        description: 'System design with optimization for performance and economics',
        duration: '3-5 days'
      },
      {
        step: 4,
        title: 'Financial Analysis',
        description: 'ROI calculations, financing options, and incentive analysis',
        duration: '2-3 days'
      },
      {
        step: 5,
        title: 'Report Delivery',
        description: 'Comprehensive project report with recommendations and next steps',
        duration: '1-2 days'
      }
    ],
    benefits: [
      'Informed investment decisions',
      'Optimized system design',
      'Accurate cost estimates',
      'Risk mitigation strategies',
      'Regulatory compliance assurance',
      'Professional engineering support',
      'Technology selection guidance'
    ],
    caseStudies: [
      {
        title: 'Industrial Feasibility Study',
        location: 'Pithampur, MP',
        capacity: '2MW Project',
        savings: 'Optimized design for 23% IRR',
        image: '/Solar_product_sample_image.jpg'
      },
      {
        title: 'Commercial Design Project',
        location: 'Indore, MP',
        capacity: '500kW System',
        savings: 'Enhanced ROI by 18%',
        image: '/Solar_services_sample_image.jpg'
      }
    ],
    faqs: [
      {
        question: 'What is included in a feasibility study?',
        answer: 'Site analysis, energy assessment, system design, financial modeling, ROI calculation, and risk analysis.'
      },
      {
        question: 'How accurate are your financial projections?',
        answer: 'Our projections are based on real performance data and conservative estimates, typically accurate within ±5%.'
      },
      {
        question: 'Do you assist with permits and approvals?',
        answer: 'Yes, we provide complete support for all regulatory requirements, permits, and utility approvals.'
      }
    ],
    relatedServices: ['commercial-solar', 'industrial-megawatt', 'maintenance-services']
  }
};

export default function ServiceDetailPage() {
  const params = useParams();
  const router = useRouter();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('overview');
  const [selectedImage, setSelectedImage] = useState(0);
  const [isLiked, setIsLiked] = useState(false);
  
  const { theme, isDay, isNight } = useTheme();
  const themeClasses = getThemeClasses(theme);
  const hoverEffects = getThemeHover(theme);

  const serviceId = params?.id as string;
  const baseService = getServiceById(serviceId);
  
  // Create an adapted service with all required properties
  const service = baseService ? {
    ...baseService,
    fullDescription: baseService.description,
    images: [baseService.image, '/sample_solar_image.jpg', '/Solar_product_sample_image.jpg'],
    detailedFeatures: baseService.features.map((feature, index) => ({
      title: feature,
      description: `Professional ${feature.toLowerCase()} service with industry-leading standards.`,
      icon: [Shield, Zap, TrendingUp, Award, Clock][index % 5]
    })),
    installationProcess: baseService.processSteps.map((step, index) => ({
      step: index + 1,
      title: step,
      description: `Professional ${step.toLowerCase()} with attention to detail and quality.`,
      duration: ['1-2 days', '2-3 days', '1 day', '3-5 days', '1 day'][index % 5]
    })),
    priceBreakdown: [
      { component: 'Equipment & Materials', cost: '60-70%', percentage: 65 },
      { component: 'Installation & Labor', cost: '20-25%', percentage: 22 },
      { component: 'Permits & Approvals', cost: '5-8%', percentage: 7 },
      { component: 'Project Management', cost: '5-8%', percentage: 6 }
    ],
    caseStudies: [
      {
        title: `${baseService.title} Success Story`,
        location: 'India',
        capacity: baseService.capacity,
        savings: baseService.savings,
        image: baseService.image
      }
    ],
    reviews: [
      {
        name: 'Satisfied Customer',
        rating: baseService.rating,
        comment: `Excellent ${baseService.title.toLowerCase()} installation. Highly recommended!`,
        location: 'India',
        date: '2024-01-15'
      }
    ],
    faqs: [
      {
        question: `What is included in the ${baseService.title.toLowerCase()}?`,
        answer: `Our ${baseService.title.toLowerCase()} includes all equipment, professional installation, permits, and comprehensive warranty coverage.`
      },
      {
        question: 'How long is the warranty?',
        answer: `We provide ${baseService.warranty} warranty on all our installations.`
      }
    ],
    relatedServices: allServices
      .filter(s => s.id !== baseService.id && s.userType === baseService.userType)
      .slice(0, 3)
      .map(s => s.id)
  } : null;

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 800);
    
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    
    return () => {
      clearTimeout(timer);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  if (isLoading) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900">
        <div className="text-center">
          <div className="relative">
            <div className="w-16 h-16 border-3 border-blue-200 border-t-blue-500 rounded-full animate-spin mx-auto mb-4"></div>
          </div>
          <div className="text-white text-lg font-semibold mb-2">Loading Service Details</div>
          <div className="text-blue-300 text-sm">Preparing Information...</div>
        </div>
      </div>
    );
  }

  if (!service) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4">Service Not Found</h1>
          <p className="text-xl mb-8">The requested service could not be found.</p>
          <Link href="/services">
            <button className="px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600">
              Back to Services
            </button>
          </Link>
        </div>
      </div>
    );
  }

  const tabs = [
    { id: 'overview', label: 'Overview', icon: Home },
    { id: 'features', label: 'Features', icon: Star },
    { id: 'process', label: 'Process', icon: Clock },
    { id: 'pricing', label: 'Quote', icon: Calculator },
    { id: 'reviews', label: 'Reviews', icon: ThumbsUp }
  ];

  return (
    <div className="relative min-h-screen">
      {/* Background */}
      <div className="fixed inset-0 z-0">
        <div className={`absolute inset-0 transition-all duration-1000 ${
          isDay 
            ? 'bg-gradient-to-br from-blue-50 via-blue-50 to-white' 
            : 'bg-gradient-to-br from-slate-900 via-blue-900 to-slate-800'
        }`} />
      </div>

      <div className="relative z-10">
        <Header isScrolled={isScrolled} />
        
        {/* Breadcrumb */}
        <section className="pt-16 md:pt-20 pb-4 md:pb-6">
          <div className="max-w-7xl mx-auto px-4 md:px-6">
            <div className="flex items-center gap-2 text-xs md:text-sm">
              <Link href="/" className={`${isDay ? 'text-slate-600 hover:text-blue-600' : 'text-slate-400 hover:text-blue-400'} transition-colors`}>
                Home
              </Link>
              <ChevronRight className="w-3 h-3 md:w-4 md:h-4" />
              <Link href="/services" className={`${isDay ? 'text-slate-600 hover:text-amber-600' : 'text-slate-400 hover:text-blue-400'} transition-colors`}>
                Services
              </Link>
              <ChevronRight className="w-3 h-3 md:w-4 md:h-4" />
              <span className={`${isDay ? 'text-amber-600' : 'text-blue-400'} font-medium`}>
                {service.title}
              </span>
            </div>
          </div>
        </section>

        {/* Hero Section */}
        <section className="pb-6 sm:pb-8 md:pb-12 lg:pb-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 md:gap-12 items-start">
              
              {/* Image Gallery - Enhanced Size and Styling */}
              <div className="space-y-3 sm:space-y-4">
                <div className="relative aspect-[4/3] sm:aspect-video rounded-xl sm:rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-300">
                  <img 
                    src={service.images[selectedImage]} 
                    alt={service.title}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
                    loading="eager"
                  />
                  <div className={`absolute inset-0 ${
                    isDay 
                      ? 'bg-gradient-to-t from-amber-500/20 via-transparent to-black/5' 
                      : 'bg-gradient-to-t from-blue-500/20 via-transparent to-black/10'
                  }`}></div>
                  
                  {/* Badge - Enhanced */}
                  {(service.isPopular || service.isFeatured) && (
                    <div className={`absolute top-3 right-3 sm:top-4 sm:right-4 md:top-5 md:right-5 px-3 py-1.5 sm:px-4 sm:py-2 rounded-full text-sm sm:text-base font-bold shadow-lg backdrop-blur-sm ${
                      service.isPopular 
                        ? 'bg-green-500/90 text-white border border-green-400' 
                        : 'bg-purple-500/90 text-white border border-purple-400'
                    }`}>
                      {service.isPopular ? '⭐ POPULAR' : '🏆 FEATURED'}
                    </div>
                  )}

                  {/* Image Navigation */}
                  {service.images.length > 1 && (
                    <>
                      <button
                        onClick={() => setSelectedImage(selectedImage > 0 ? selectedImage - 1 : service.images.length - 1)}
                        className={`absolute left-2 sm:left-3 top-1/2 -translate-y-1/2 p-2 sm:p-3 rounded-full backdrop-blur-md transition-all hover:scale-110 ${
                          isDay ? 'bg-white/80 text-slate-700 hover:bg-white' : 'bg-black/60 text-white hover:bg-black/80'
                        }`}
                      >
                        <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5 rotate-180" />
                      </button>
                      <button
                        onClick={() => setSelectedImage(selectedImage < service.images.length - 1 ? selectedImage + 1 : 0)}
                        className={`absolute right-2 sm:right-3 top-1/2 -translate-y-1/2 p-2 sm:p-3 rounded-full backdrop-blur-md transition-all hover:scale-110 ${
                          isDay ? 'bg-white/80 text-slate-700 hover:bg-white' : 'bg-black/60 text-white hover:bg-black/80'
                        }`}
                      >
                        <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5" />
                      </button>
                    </>
                  )}

                  {/* Image Counter */}
                  <div className={`absolute bottom-3 left-3 px-3 py-1.5 rounded-full text-sm font-medium backdrop-blur-md ${
                    isDay ? 'bg-white/80 text-slate-700' : 'bg-black/60 text-white'
                  }`}>
                    {selectedImage + 1} / {service.images.length}
                  </div>
                </div>
                
                {/* Thumbnail Gallery - Enhanced */}
                <div className="flex gap-2 sm:gap-3 overflow-x-auto scrollbar-hide pb-2">
                  {service.images.map((image, index) => (
                    <button
                      key={index}
                      onClick={() => setSelectedImage(index)}
                      className={`flex-none w-20 h-16 sm:w-24 sm:h-20 md:w-28 md:h-22 rounded-lg md:rounded-xl overflow-hidden border-2 transition-all duration-300 hover:scale-105 ${
                        selectedImage === index
                          ? isDay 
                            ? 'border-amber-500 ring-2 ring-amber-200 shadow-lg' 
                            : 'border-blue-500 ring-2 ring-blue-200 shadow-lg'
                          : 'border-slate-300 hover:border-slate-400'
                      }`}
                    >
                      <img 
                        src={image} 
                        alt={`${service.title} ${index + 1}`}
                        className="w-full h-full object-cover"
                        loading="lazy"
                      />
                    </button>
                  ))}
                </div>
              </div>

              {/* Service Info - Restructured for alignment */}
              <div className="flex flex-col justify-between h-full">
                <div className="space-y-2 sm:space-y-2 md:space-y-3">
                  <div>
                  <div className="flex items-start gap-3 sm:gap-4 mb-2 sm:mb-2 md:mb-3">
                    {/* <div className={`p-2 sm:p-2.5 md:p-3 rounded-lg sm:rounded-xl shadow-sm ${
                    isDay ? 'bg-amber-100' : 'bg-blue-900/50'
                    }`}>
                    {service.icon && (
                      <service.icon className={`w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 ${
                      isDay ? 'text-amber-600' : 'text-blue-400'
                      }`} />
                    )}
                    </div> */}
                    <div className="flex-1 min-w-0">
                    <h1 className={`text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold leading-tight ${
                      isDay ? 'text-slate-800' : 'text-white'
                    }`}>
                      {service.title}
                    </h1>
                    <p className={`text-sm sm:text-base md:text-lg mt-1 sm:mt-1 ${
                      isDay ? 'text-amber-600' : 'text-blue-400'
                    }`}>
                      {service.subcategory}
                    </p>
                    </div>
                  </div>

                  <p className={`text-xs sm:text-sm md:text-base leading-relaxed mb-1 ${
                    isDay ? 'text-slate-600' : 'text-slate-300'
                  }`}>
                    {service.shortDesc}
                  </p>
                  </div>

                  {/* Rating and Stats */}
                  <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-2 md:gap-3">
                  <div className="flex items-center gap-2">
                    <div className="flex items-center">
                    {[...Array(5)].map((_, i) => (
                      <Star
                      key={i}
                      className={`w-4 h-4 sm:w-5 sm:h-5 ${
                        i < Math.floor(service.rating)
                        ? 'text-yellow-400 fill-current'
                        : 'text-gray-300'
                      }`}
                      />
                    ))}
                    </div>
                    <span className={`font-semibold text-sm sm:text-base ${
                    isDay ? 'text-slate-800' : 'text-white'
                    }`}>
                    {service.rating}
                    </span>
                    <span className={`text-xs sm:text-sm ${
                    isDay ? 'text-slate-500' : 'text-slate-400'
                    }`}>
                    ({service.projects} projects)
                    </span>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <button
                    onClick={() => setIsLiked(!isLiked)}
                    className={`p-2 sm:p-2.5 rounded-lg transition-all shadow-sm ${
                      isLiked
                      ? 'bg-red-500 text-white shadow-red-200'
                      : isDay ? 'bg-white/80 text-slate-600 hover:bg-red-50 shadow-slate-200' : 'bg-white/10 text-slate-300 hover:bg-red-900/20'
                    }`}
                    >
                    <Heart className={`w-4 h-4 sm:w-5 sm:h-5 ${isLiked ? 'fill-current' : ''}`} />
                    </button>
                    <button className={`p-2 sm:p-2.5 rounded-lg transition-all shadow-sm ${
                    isDay ? 'bg-white/80 text-slate-600 hover:bg-slate-100 shadow-slate-200' : 'bg-white/10 text-slate-300 hover:bg-white/20'
                    }`}>
                    <Share2 className="w-4 h-4 sm:w-5 sm:h-5" />
                    </button>
                  </div>
                  </div>

                  {/* Key Specs Grid */}
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-1">
                      {[
                      { label: 'Capacity', value: service.capacity, icon: TrendingUp },
                      { label: 'Duration', value: service.duration, icon: Clock },
                      { label: 'Warranty', value: service.warranty, icon: Shield },
                      { label: 'Savings', value: service.savings, icon: Award }
                      ].map((spec, index) => (
                      <div
                        key={index}
                        className={`flex flex-col items-center text-center gap-1 p-2 rounded-md transition-all truncate min-h-0 ${
                        isDay
                          ? 'bg-white/90 border border-amber-100 shadow-sm'
                          : 'bg-white/5 border border-white/10'
                        }`}
                      >
                        <div className={`flex items-center justify-center w-8 h-8 rounded-sm flex-shrink-0 ${
                        isDay ? 'bg-amber-50' : 'bg-blue-900/30'
                        }`}>
                        <spec.icon className={`w-4 h-4 ${isDay ? 'text-amber-600' : 'text-blue-300'}`} />
                        </div>

                        <div className={`text-[11px] leading-tight ${isDay ? 'text-slate-500' : 'text-slate-400'}`}>
                        {spec.label}
                        </div>

                        <div className={`text-xs font-semibold leading-tight truncate ${isDay ? 'text-slate-800' : 'text-white'}`}>
                        {spec.value}
                        </div>
                      </div>
                      ))}
                    </div>

                    {/* Compact Offer Section */}
                    <div className={`relative p-3 rounded-lg backdrop-blur-sm border overflow-hidden ${
                      isDay 
                        ? 'bg-gradient-to-r from-amber-50 to-orange-50 border-amber-200' 
                        : 'bg-gradient-to-r from-blue-900/20 to-purple-900/20 border-blue-400/30'
                    }`}>
                      {/* Background Pattern */}
                      <div className={`absolute inset-0 opacity-10 ${
                        isDay ? 'bg-amber-100' : 'bg-blue-500'
                      }`} style={{
                        backgroundImage: `radial-gradient(circle at 1px 1px, currentColor 1px, transparent 0)`,
                        backgroundSize: '20px 20px'
                      }}></div>
                      
                      <div className="relative flex items-center justify-between gap-3">
                        <div className="flex items-center gap-2 flex-1 min-w-0">
                          <div className={`p-1.5 rounded-full ${
                            isDay ? 'bg-amber-500 text-white' : 'bg-blue-500 text-white'
                          }`}>
                            <Star className="w-3 h-3 fill-current" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className={`text-xs font-bold ${
                              isDay ? 'text-amber-800' : 'text-blue-200'
                            }`}>
                              {service.isPopular ? '🎯 MOST POPULAR CHOICE' : '🏆 PREMIUM SOLUTION'}
                            </div>
                            <div className={`text-[10px] ${
                              isDay ? 'text-amber-600' : 'text-blue-300'
                            }`}>
                              {service.isPopular ? 'Chosen by 70% of customers' : 'Advanced technology & features'}
                            </div>
                          </div>
                        </div>
                        
                        <div className="flex items-center gap-1">
                          <div className={`px-2 py-1 rounded text-[10px] font-bold ${
                            isDay 
                              ? 'bg-green-100 text-green-700' 
                              : 'bg-green-900/50 text-green-300'
                          }`}>
                            ⚡ Quick Install
                          </div>
                          <div className={`px-2 py-1 rounded text-[10px] font-bold ${
                            isDay 
                              ? 'bg-blue-100 text-blue-700' 
                              : 'bg-blue-900/50 text-blue-300'
                          }`}>
                            🛡️ 25Y Warranty
                          </div>
                        </div>
                      </div>
                    </div>
                </div>

                {/* Price Request */}
                <div style={{ transform: 'translateY(-23px)' }} className={`p-2 rounded-lg backdrop-blur-sm border shadow-sm mt-auto ${
                  isDay ? 'bg-white/90 border-amber-200' : 'bg-white/5 border-white/10'
                }`}>
                  <div className="flex items-center justify-between gap-3">
                  <div className="min-w-0">
                    <div className={`text-sm font-semibold truncate ${isDay ? 'text-amber-600' : 'text-blue-400'}`}>
                    Request Quote
                    </div>
                    <div className={`text-xs truncate ${isDay ? 'text-slate-500' : 'text-slate-400'}`}>
                    Custom pricing for your requirements
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <Link
                    href="/contact"
                    className={`inline-flex items-center gap-2 px-3 py-2 rounded-md text-sm font-medium transition ${
                      isDay ? 'bg-amber-500 text-white hover:bg-amber-600' : 'bg-blue-500 text-white hover:bg-blue-600'
                    }`}
                    >
                    Get Quote
                    </Link>

                    <a
                    href="tel:+918818880540"
                    aria-label="Call"
                    className={`inline-flex items-center justify-center w-10 h-10 rounded-md border transition ${
                      isDay ? 'border-amber-500 text-amber-600 hover:bg-amber-50' : 'border-blue-400 text-blue-400 hover:bg-white/5'
                    }`}
                    >
                    <Phone className="w-4 h-4" />
                    </a>
                  </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Tab Navigation */}
        <section className="sticky top-14 sm:top-16 z-40 py-2 sm:py-3 md:py-4">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className={`p-1 sm:p-1.5 md:p-2 rounded-lg sm:rounded-xl md:rounded-2xl backdrop-blur-sm border shadow-lg ${
              isDay 
                ? 'bg-white/95 border-amber-200 shadow-amber-100' 
                : 'bg-white/10 border-white/20'
            }`}>
              <div className="flex justify-center overflow-x-auto scrollbar-hide">
                {tabs.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex items-center justify-center gap-1 sm:gap-2 px-3 py-2 sm:px-4 sm:py-2.5 md:px-6 md:py-3 rounded sm:rounded-lg md:rounded-xl font-medium transition-all duration-300 whitespace-nowrap text-xs sm:text-sm md:text-base flex-1 sm:flex-initial min-w-0 ${
                      activeTab === tab.id
                        ? isDay
                          ? 'bg-amber-500 text-white shadow-md'
                          : 'bg-blue-500 text-white shadow-md'
                        : isDay
                          ? 'text-slate-600 hover:bg-amber-100'
                          : 'text-slate-300 hover:bg-white/10'
                    }`}
                  >
                    <tab.icon className="w-4 h-4 sm:w-5 sm:h-5 flex-shrink-0" />
                    <span className="hidden sm:inline truncate">{tab.label}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Tab Content */}
        <section className="py-4 sm:py-6 md:py-8 lg:py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            
            {/* Overview Tab */}
            {activeTab === 'overview' && (
              <div className="space-y-6 sm:space-y-8 md:space-y-10 lg:space-y-12">
                <div>
                  <h2 className={`text-xl sm:text-2xl md:text-3xl font-bold mb-4 sm:mb-5 md:mb-6 ${
                    isDay ? 'text-slate-800' : 'text-white'
                  }`}>
                    Service Overview
                  </h2>
                  <p className={`text-sm sm:text-base md:text-lg leading-relaxed ${
                    isDay ? 'text-slate-600' : 'text-slate-300'
                  }`}>
                    {service.fullDescription}
                  </p>
                </div>

                {/* Benefits */}
                <div>
                  <h3 className={`text-lg sm:text-xl md:text-2xl font-bold mb-4 sm:mb-5 md:mb-6 ${
                    isDay ? 'text-slate-800' : 'text-white'
                  }`}>
                    Key Benefits
                  </h3>
                  <div className="grid sm:grid-cols-2 gap-3 sm:gap-4">
                    {service.benefits.map((benefit, index) => (
                      <div key={index} className="flex items-start gap-3">
                        <CheckCircle className={`w-4 h-4 sm:w-5 sm:h-5 mt-0.5 flex-shrink-0 ${
                          isDay ? 'text-green-600' : 'text-green-400'
                        }`} />
                        <span className={`text-sm sm:text-base ${
                          isDay ? 'text-slate-700' : 'text-slate-300'
                        }`}>
                          {benefit}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Specifications */}
                <div>
                  <h3 className={`text-lg sm:text-xl md:text-2xl font-bold mb-4 sm:mb-5 md:mb-6 ${
                    isDay ? 'text-slate-800' : 'text-white'
                  }`}>
                    Technical Specifications
                  </h3>
                  <div className={`p-4 sm:p-5 md:p-6 rounded-xl backdrop-blur-sm border shadow-lg ${
                    isDay 
                      ? 'bg-white/80 border-amber-200 shadow-amber-100' 
                      : 'bg-white/10 border-white/20'
                  }`}>
                    <div className="grid sm:grid-cols-2 gap-3 sm:gap-4">
                      {Object.entries(service.specifications).map(([key, value]) => (
                        <div key={key} className="flex justify-between py-2 border-b border-gray-200/20 last:border-b-0">
                          <span className={`font-medium text-sm sm:text-base ${
                            isDay ? 'text-slate-700' : 'text-slate-300'
                          }`}>
                            {key}
                          </span>
                          <span className={`text-sm sm:text-base text-right ${
                            isDay ? 'text-slate-600' : 'text-slate-400'
                          }`}>
                            {value}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Features Tab */}
            {activeTab === 'features' && (
              <div className="space-y-6 sm:space-y-8 md:space-y-10">
                <h2 className={`text-xl sm:text-2xl md:text-3xl font-bold ${
                  isDay ? 'text-slate-800' : 'text-white'
                }`}>
                  Detailed Features
                </h2>
                <div className="grid gap-4 sm:gap-5 md:gap-6">
                  {service.detailedFeatures.map((feature, index) => (
                    <div key={index} className={`flex items-start gap-3 sm:gap-4 p-4 sm:p-5 md:p-6 rounded-xl backdrop-blur-sm border shadow-lg transition-all hover:shadow-xl ${
                      isDay 
                        ? 'bg-white/80 border-amber-200 shadow-amber-100 hover:shadow-amber-200' 
                        : 'bg-white/10 border-white/20 hover:bg-white/15'
                    }`}>
                      <div className={`p-2 sm:p-3 rounded-lg flex-shrink-0 ${
                        isDay ? 'bg-amber-100' : 'bg-blue-900/50'
                      }`}>
                        <feature.icon className={`w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 ${
                          isDay ? 'text-amber-600' : 'text-blue-400'
                        }`} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className={`text-base sm:text-lg md:text-xl font-semibold mb-2 ${
                          isDay ? 'text-slate-800' : 'text-white'
                        }`}>
                          {feature.title}
                        </h3>
                        <p className={`text-sm sm:text-base ${
                          isDay ? 'text-slate-600' : 'text-slate-300'
                        }`}>
                          {feature.description}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Customer Success Stories Section - Enhanced Video Styling */}
                <div>
                  <h3 className={`text-lg sm:text-xl md:text-2xl font-bold mb-4 sm:mb-5 md:mb-6 ${
                    isDay ? 'text-slate-800' : 'text-white'
                  }`}>
                    Customer Success Stories
                  </h3>
                  <div className="relative">
                    <div className="flex gap-4 sm:gap-5 md:gap-6 overflow-x-auto scroll-smooth scrollbar-hide pb-4">
                      {service.caseStudies.map((study, index) => (
                        <div key={index} className={`min-w-[320px] sm:min-w-[360px] md:min-w-[400px] flex-shrink-0 rounded-xl backdrop-blur-sm border shadow-lg transition-all hover:shadow-xl hover:scale-[1.02] ${
                          isDay 
                            ? 'bg-white/90 border-amber-200 shadow-amber-100 hover:shadow-amber-200' 
                            : 'bg-white/10 border-white/20 hover:bg-white/15'
                        }`}>
                          {/* Enhanced Video Preview Layout */}
                          <div className="relative">
                            {/* Video Thumbnail with Play Button */}
                            <div className="relative aspect-video rounded-t-xl overflow-hidden group cursor-pointer">
                              <img 
                                src={study.image} 
                                alt={study.title}
                                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                              />
                              {/* Enhanced Video Play Overlay */}
                              <div className="absolute inset-0 bg-gradient-to-r from-black/50 via-black/30 to-black/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300">
                                <div className="bg-gradient-to-r from-blue-500 to-blue-600 rounded-full p-4 shadow-2xl transform scale-0 group-hover:scale-100 transition-transform duration-300">
                                  <PlayCircle className="w-8 h-8 text-white" />
                                </div>
                              </div>
                              {/* Video Duration Badge */}
                              <div className="absolute bottom-3 right-3 bg-black/70 text-white text-xs px-2 py-1 rounded backdrop-blur-sm">
                                ▶ 2:45
                              </div>
                            </div>
                            
                            {/* Enhanced Content Section */}
                            <div className="p-4 sm:p-5">
                              <h4 className={`font-bold mb-3 text-base sm:text-lg ${
                                isDay ? 'text-slate-800' : 'text-white'
                              }`}>
                                {study.title}
                              </h4>
                              
                              {/* Enhanced Details Grid */}
                              <div className="space-y-2 mb-4">
                                <div className="flex items-center justify-between py-1 border-b border-gray-200/20">
                                  <span className={`text-sm font-medium ${isDay ? 'text-slate-600' : 'text-slate-300'}`}>
                                    📍 Location:
                                  </span>
                                  <span className={`text-sm font-semibold ${isDay ? 'text-slate-800' : 'text-white'}`}>
                                    {study.location}
                                  </span>
                                </div>
                                <div className="flex items-center justify-between py-1 border-b border-gray-200/20">
                                  <span className={`text-sm font-medium ${isDay ? 'text-slate-600' : 'text-slate-300'}`}>
                                    ⚡ System:
                                  </span>
                                  <span className={`text-sm font-semibold ${isDay ? 'text-slate-800' : 'text-white'}`}>
                                    {study.capacity}
                                  </span>
                                </div>
                                <div className="flex items-center justify-between py-1">
                                  <span className={`text-sm font-medium ${isDay ? 'text-slate-600' : 'text-slate-300'}`}>
                                    💰 Results:
                                  </span>
                                  <span className={`text-sm font-bold ${isDay ? 'text-green-600' : 'text-green-400'}`}>
                                    {study.savings}
                                  </span>
                                </div>
                              </div>

                              {/* Success Metrics Tags */}
                              <div className="flex flex-wrap gap-2 mb-4">
                                <span className="px-2 py-1 bg-green-100 text-green-700 text-xs rounded-full font-medium">
                                  ✅ Verified
                                </span>
                                <span className="px-2 py-1 bg-blue-100 text-blue-700 text-xs rounded-full font-medium">
                                  🏆 Premium Install
                                </span>
                                <span className="px-2 py-1 bg-purple-100 text-purple-700 text-xs rounded-full font-medium">
                                  ⭐ 5-Star Review
                                </span>
                              </div>

                              {/* Watch Video Button */}
                              <button className={`w-full py-3 px-4 rounded-lg font-semibold transition-all duration-300 text-sm hover:scale-[1.02] ${
                                isDay 
                                  ? 'bg-gradient-to-r from-amber-500 to-orange-500 text-white hover:from-amber-600 hover:to-orange-600 shadow-md hover:shadow-lg' 
                                  : 'bg-gradient-to-r from-blue-500 to-cyan-500 text-white hover:from-blue-600 hover:to-cyan-600 shadow-md hover:shadow-lg'
                              }`}>
                                <span className="flex items-center justify-center gap-2">
                                  <PlayCircle className="w-4 h-4" />
                                  Watch Success Story
                                </span>
                              </button>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                    
                    {/* Scroll Indicator */}
                    <div className="flex justify-center mt-3">
                      <div className={`text-xs px-3 py-1 rounded-full ${
                        isDay ? 'bg-amber-100 text-amber-600' : 'bg-blue-900/50 text-blue-300'
                      }`}>
                        ← Swipe to view more stories →
                      </div>
                    </div>
                  </div>
                </div>

                {/* INDIA AND WORLDWIDE COVERAGE Section - Compact Horizontal Cards */}
                <div>
                  <h3 className={`text-lg sm:text-xl md:text-2xl font-bold mb-4 sm:mb-5 md:mb-6 ${
                    isDay ? 'text-slate-800' : 'text-white'
                  }`}>
                    INDIA AND WORLDWIDE COVERAGE
                  </h3>
                  <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4">
                    {[
                      { label: 'States Covered', value: '28+', icon: MapPin },
                      { label: 'Cities', value: '150+', icon: Building2 },
                      { label: 'Projects', value: '2000+', icon: Factory },
                      { label: 'Countries', value: '15+', icon: Globe },
                      { label: 'Satisfied Clients', value: '1500+', icon: Users },
                      { label: 'MW Installed', value: '500+', icon: Zap }
                    ].map((coverage, index) => (
                      <div key={index} className={`p-3 sm:p-4 rounded-lg backdrop-blur-sm border text-center shadow-md transition-all hover:shadow-lg ${
                        isDay 
                          ? 'bg-white/80 border-amber-200 shadow-amber-100 hover:shadow-amber-200' 
                          : 'bg-white/10 border-white/20 hover:bg-white/15'
                      }`}>
                        <coverage.icon className={`w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 mx-auto mb-2 ${
                          isDay ? 'text-amber-600' : 'text-blue-400'
                        }`} />
                        <div className={`text-lg sm:text-xl md:text-2xl font-bold ${
                          isDay ? 'text-slate-800' : 'text-white'
                        }`}>
                          {coverage.value}
                        </div>
                        <div className={`text-xs sm:text-sm ${
                          isDay ? 'text-slate-600' : 'text-slate-300'
                        }`}>
                          {coverage.label}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Why Choose Autosys Sunergy Section */}
                <div className="service-why-choose-compact">
                  <h3 className={`text-lg md:text-xl font-bold mb-4 md:mb-6 service-why-choose-title-compact ${
                    isDay ? 'text-slate-800' : 'text-white'
                  }`}>
                    Why Choose Autosys Sunergy
                  </h3>
                  <div className="service-why-choose-container-compact">
                    {[
                      { title: 'Expert Installation', description: 'Certified technicians with 10+ years experience', icon: Award },
                      { title: 'Premium Quality', description: 'Tier-1 components with international standards', icon: Shield },
                      { title: '24/7 Support', description: 'Round-the-clock customer service and monitoring', icon: Clock },
                      { title: 'Best Warranty', description: '25-year comprehensive warranty coverage', icon: CheckCircle },
                      { title: 'Fast Installation', description: 'Quick and efficient installation process', icon: Zap },
                      { title: 'Cost Effective', description: 'Competitive pricing with maximum savings', icon: TrendingUp }
                    ].map((reason, index) => (
                      <div key={index} className={`p-4 md:p-6 rounded-xl backdrop-blur-sm border service-why-choose-card-compact ${
                        isDay 
                          ? 'bg-white/60 border-amber-200' 
                          : 'bg-white/10 border-white/20'
                      }`}>
                        <div className={`w-12 h-12 md:w-16 md:h-16 rounded-lg mb-3 md:mb-4 flex items-center justify-center service-why-choose-icon-compact ${
                          isDay ? 'bg-amber-100' : 'bg-blue-900/50'
                        }`}>
                          <reason.icon className={`w-6 h-6 md:w-8 md:h-8 ${
                            isDay ? 'text-amber-600' : 'text-blue-400'
                          }`} />
                        </div>
                        <h4 className={`font-semibold mb-2 service-why-choose-feature-title-compact ${
                          isDay ? 'text-slate-800' : 'text-white'
                        }`}>
                          {reason.title}
                        </h4>
                        <p className={`service-why-choose-feature-description-compact ${
                          isDay ? 'text-slate-600' : 'text-slate-300'
                        }`}>
                          {reason.description}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Process Tab */}
            {activeTab === 'process' && (
              <div className="space-y-6 md:space-y-8 service-content-sections-compact">
                <h2 className={`text-xl md:text-2xl font-bold service-section-title-compact ${
                  isDay ? 'text-slate-800' : 'text-white'
                }`}>
                  Installation Process
                </h2>
                <div className="space-y-4 md:space-y-6 service-process-list-compact">
                  {service.installationProcess.map((step, index) => (
                    <div key={index} className={`flex gap-4 md:gap-6 p-4 md:p-6 rounded-xl backdrop-blur-sm border service-process-item-compact ${
                      isDay 
                        ? 'bg-white/60 border-amber-200' 
                        : 'bg-white/10 border-white/20'
                    }`}>
                      <div className={`flex-shrink-0 w-8 h-8 md:w-12 md:h-12 rounded-full flex items-center justify-center font-bold text-white text-sm md:text-base service-process-number-compact ${
                        isDay ? 'bg-amber-500' : 'bg-blue-500'
                      }`}>
                        {step.step}
                      </div>
                      <div className="flex-1 service-process-content-compact">
                        <div className="flex flex-col md:flex-row md:items-center justify-between mb-2 gap-2 service-process-header-compact">
                          <h3 className={`text-base md:text-lg font-semibold service-process-title-compact ${
                            isDay ? 'text-slate-800' : 'text-white'
                          }`}>
                            {step.title}
                          </h3>
                          <span className={`text-xs md:text-sm px-2 py-1 md:px-3 md:py-1 rounded-full self-start md:self-center service-process-duration-compact ${
                            isDay 
                              ? 'bg-amber-100 text-amber-700' 
                              : 'bg-blue-900/50 text-blue-300'
                          }`}>
                            {step.duration}
                          </span>
                        </div>
                        <p className={`text-sm md:text-base service-process-description-compact ${
                          isDay ? 'text-slate-600' : 'text-slate-300'
                        }`}>
                          {step.description}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Pricing Tab */}
            {activeTab === 'pricing' && (
              <div className="space-y-6 md:space-y-8 service-content-sections-compact service-pricing-mobile">
                <h2 className={`text-xl md:text-2xl font-bold service-section-title-compact ${
                  isDay ? 'text-slate-800' : 'text-white'
                }`}>
                  Pricing Information
                </h2>
                
                {/* Price Request Section */}
                <div className={`p-6 md:p-8 rounded-xl backdrop-blur-sm border text-center service-pricing-card-compact ${
                  isDay 
                    ? 'bg-white/60 border-amber-200' 
                    : 'bg-white/10 border-white/20'
                }`}>
                  <div className={`text-2xl md:text-3xl font-bold mb-4 service-pricing-title-compact ${
                    isDay ? 'text-amber-600' : 'text-blue-400'
                  }`}>
                    Get Custom Quote
                  </div>
                  <p className={`text-base md:text-lg mb-6 service-pricing-description-compact ${
                    isDay ? 'text-slate-600' : 'text-slate-300'
                  }`}>
                    Our pricing varies based on your specific requirements, location, system size, and installation complexity. 
                    Contact us for a detailed, customized quote tailored to your needs.
                  </p>
                  
                  {/* Pricing Features */}
                  <div className="grid md:grid-cols-3 gap-4 mb-6 md:mb-8 service-pricing-features-compact">
                    <div className={`p-3 md:p-4 rounded-lg service-pricing-feature-compact ${
                      isDay ? 'bg-amber-50' : 'bg-blue-900/30'
                    }`}>
                      <Calculator className={`w-6 h-6 md:w-8 md:h-8 mx-auto mb-2 service-pricing-feature-icon-compact ${
                        isDay ? 'text-amber-600' : 'text-blue-400'
                      }`} />
                      <h4 className={`font-semibold mb-1 text-sm md:text-base service-pricing-feature-title-compact ${
                        isDay ? 'text-slate-800' : 'text-white'
                      }`}>
                        Customized Pricing
                      </h4>
                      <p className={`text-xs md:text-sm service-pricing-feature-text-compact ${
                        isDay ? 'text-slate-600' : 'text-slate-300'
                      }`}>
                        Pricing based on your specific requirements
                      </p>
                    </div>
                    
                    <div className={`p-3 md:p-4 rounded-lg service-pricing-feature-compact ${
                      isDay ? 'bg-amber-50' : 'bg-blue-900/30'
                    }`}>
                      <Award className={`w-6 h-6 md:w-8 md:h-8 mx-auto mb-2 service-pricing-feature-icon-compact ${
                        isDay ? 'text-amber-600' : 'text-blue-400'
                      }`} />
                      <h4 className={`font-semibold mb-1 text-sm md:text-base service-pricing-feature-title-compact ${
                        isDay ? 'text-slate-800' : 'text-white'
                      }`}>
                        Best Value
                      </h4>
                      <p className={`text-xs md:text-sm service-pricing-feature-text-compact ${
                        isDay ? 'text-slate-600' : 'text-slate-300'
                      }`}>
                        Competitive pricing with premium quality
                      </p>
                    </div>
                    
                    <div className={`p-3 md:p-4 rounded-lg service-pricing-feature-compact ${
                      isDay ? 'bg-amber-50' : 'bg-blue-900/30'
                    }`}>
                      <Shield className={`w-6 h-6 md:w-8 md:h-8 mx-auto mb-2 service-pricing-feature-icon-compact ${
                        isDay ? 'text-amber-600' : 'text-blue-400'
                      }`} />
                      <h4 className={`font-semibold mb-1 text-sm md:text-base service-pricing-feature-title-compact ${
                        isDay ? 'text-slate-800' : 'text-white'
                      }`}>
                        Transparent Costs
                      </h4>
                      <p className={`text-xs md:text-sm service-pricing-feature-text-compact ${
                        isDay ? 'text-slate-600' : 'text-slate-300'
                      }`}>
                        No hidden charges, all-inclusive pricing
                      </p>
                    </div>
                  </div>
                  
                  {/* CTA Buttons */}
                  <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <Link href="/contact" className={`px-6 py-3 md:px-8 md:py-4 rounded-xl font-semibold transition-all duration-300 text-center text-sm md:text-base ${
                      isDay 
                        ? 'bg-amber-500 text-white hover:bg-amber-600' 
                        : 'bg-blue-500 text-white hover:bg-blue-600'
                    }`}>
                      Request Detailed Quote
                    </Link>
                    <a href="tel:+918818880540" className={`px-6 py-3 md:px-8 md:py-4 rounded-xl font-semibold border-2 transition-all duration-300 flex items-center justify-center text-sm md:text-base ${
                      isDay 
                        ? 'border-amber-500 text-amber-600 hover:bg-amber-500 hover:text-white' 
                        : 'border-blue-400 text-blue-400 hover:bg-blue-400 hover:text-white'
                    }`}>
                      <Phone className="w-4 h-4 md:w-5 md:h-5 mr-2" />
                      Call for Pricing
                    </a>
                  </div>
                </div>

                {/* What's Included */}
                <div className="service-section-compact">
                  <h3 className={`text-lg md:text-xl font-bold mb-4 md:mb-6 service-section-subtitle-compact ${
                    isDay ? 'text-slate-800' : 'text-white'
                  }`}>
                    What&apos;s Included in Our Quote
                  </h3>
                  <div className="grid md:grid-cols-2 gap-4 md:gap-6">
                    <div className={`p-4 md:p-6 rounded-xl backdrop-blur-sm border ${
                      isDay 
                        ? 'bg-white/60 border-amber-200' 
                        : 'bg-white/10 border-white/20'
                    }`}>
                      <h4 className={`font-semibold mb-3 md:mb-4 text-sm md:text-base ${
                        isDay ? 'text-slate-800' : 'text-white'
                      }`}>
                        System Components
                      </h4>
                      <ul className="space-y-2 service-benefits-list-compact">
                        <li className="flex items-center gap-2 service-benefit-item-compact">
                          <CheckCircle className={`w-3 h-3 md:w-4 md:h-4 service-benefit-icon-compact ${
                            isDay ? 'text-green-600' : 'text-green-400'
                          }`} />
                          <span className={`text-xs md:text-sm service-benefit-text-compact ${
                            isDay ? 'text-slate-600' : 'text-slate-300'
                          }`}>
                            Premium quality solar panels
                          </span>
                        </li>
                        <li className="flex items-center gap-2 service-benefit-item-compact">
                          <CheckCircle className={`w-3 h-3 md:w-4 md:h-4 service-benefit-icon-compact ${
                            isDay ? 'text-green-600' : 'text-green-400'
                          }`} />
                          <span className={`text-xs md:text-sm service-benefit-text-compact ${
                            isDay ? 'text-slate-600' : 'text-slate-300'
                          }`}>
                            Advanced inverters and controllers
                          </span>
                        </li>
                        <li className="flex items-center gap-2 service-benefit-item-compact">
                          <CheckCircle className={`w-3 h-3 md:w-4 md:h-4 service-benefit-icon-compact ${
                            isDay ? 'text-green-600' : 'text-green-400'
                          }`} />
                          <span className={`text-xs md:text-sm service-benefit-text-compact ${
                            isDay ? 'text-slate-600' : 'text-slate-300'
                          }`}>
                            Mounting and safety equipment
                          </span>
                        </li>
                        <li className="flex items-center gap-2 service-benefit-item-compact">
                          <CheckCircle className={`w-3 h-3 md:w-4 md:h-4 service-benefit-icon-compact ${
                            isDay ? 'text-green-600' : 'text-green-400'
                          }`} />
                          <span className={`text-xs md:text-sm service-benefit-text-compact ${
                            isDay ? 'text-slate-600' : 'text-slate-300'
                          }`}>
                            Monitoring and control systems
                          </span>
                        </li>
                      </ul>
                    </div>
                    
                    <div className={`p-4 md:p-6 rounded-xl backdrop-blur-sm border ${
                      isDay 
                        ? 'bg-white/60 border-amber-200' 
                        : 'bg-white/10 border-white/20'
                    }`}>
                      <h4 className={`font-semibold mb-3 md:mb-4 text-sm md:text-base ${
                        isDay ? 'text-slate-800' : 'text-white'
                      }`}>
                        Services Included
                      </h4>
                      <ul className="space-y-2 service-benefits-list-compact">
                        <li className="flex items-center gap-2 service-benefit-item-compact">
                          <CheckCircle className={`w-3 h-3 md:w-4 md:h-4 service-benefit-icon-compact ${
                            isDay ? 'text-green-600' : 'text-green-400'
                          }`} />
                          <span className={`text-xs md:text-sm service-benefit-text-compact ${
                            isDay ? 'text-slate-600' : 'text-slate-300'
                          }`}>
                            Professional installation
                          </span>
                        </li>
                        <li className="flex items-center gap-2 service-benefit-item-compact">
                          <CheckCircle className={`w-3 h-3 md:w-4 md:h-4 service-benefit-icon-compact ${
                            isDay ? 'text-green-600' : 'text-green-400'
                          }`} />
                          <span className={`text-xs md:text-sm service-benefit-text-compact ${
                            isDay ? 'text-slate-600' : 'text-slate-300'
                          }`}>
                            Permits and approvals
                          </span>
                        </li>
                        <li className="flex items-center gap-2 service-benefit-item-compact">
                          <CheckCircle className={`w-3 h-3 md:w-4 md:h-4 service-benefit-icon-compact ${
                            isDay ? 'text-green-600' : 'text-green-400'
                          }`} />
                          <span className={`text-xs md:text-sm service-benefit-text-compact ${
                            isDay ? 'text-slate-600' : 'text-slate-300'
                          }`}>
                            System commissioning and testing
                          </span>
                        </li>
                        <li className="flex items-center gap-2 service-benefit-item-compact">
                          <CheckCircle className={`w-3 h-3 md:w-4 md:h-4 service-benefit-icon-compact ${
                            isDay ? 'text-green-600' : 'text-green-400'
                          }`} />
                          <span className={`text-xs md:text-sm service-benefit-text-compact ${
                            isDay ? 'text-slate-600' : 'text-slate-300'
                          }`}>
                            Comprehensive warranty coverage
                          </span>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>

                {/* Case Studies */}
                {service.caseStudies.length > 0 && (
                  <div className="service-section-compact">
                    <h3 className={`text-lg md:text-xl font-bold mb-4 md:mb-6 service-section-subtitle-compact ${
                      isDay ? 'text-slate-800' : 'text-white'
                    }`}>
                      Case Studies
                    </h3>
                    <div className="flex md:grid md:grid-cols-2 gap-4 md:gap-6 overflow-x-auto md:overflow-visible scroll-smooth scrollbar-hide pb-2 service-case-studies-compact">
                      {service.caseStudies.map((study, index) => (
                        <div key={index} className={`min-w-[280px] md:min-w-0 flex-shrink-0 p-3 md:p-6 rounded-xl backdrop-blur-sm border-2 md:border service-case-study-compact ${
                          isDay 
                            ? 'bg-white/60 border-blue-500 md:border-amber-200' 
                            : 'bg-white/10 border-blue-400 md:border-white/20'
                        }`}>
                          {/* Mobile: Desktop-style layout (image left, content right) */}
                          <div className="flex md:block gap-3 md:gap-0">
                            <img 
                              src={study.image} 
                              alt={study.title}
                              className="w-20 h-16 md:w-full md:h-32 object-cover rounded-lg flex-shrink-0 service-case-study-image-compact"
                            />
                            <div className="flex-1 md:mt-3 service-case-study-content-compact">
                              <h4 className={`font-semibold mb-1 md:mb-2 text-sm md:text-base line-height-tight service-case-study-title-compact ${
                                isDay ? 'text-slate-800' : 'text-white'
                              }`}>
                                {study.title}
                              </h4>
                              <div className="space-y-0.5 md:space-y-1 text-xs md:text-sm service-case-study-details-compact">
                                <div className="flex justify-between">
                                  <span className={`${isDay ? 'text-slate-600' : 'text-slate-300'}`}>Location:</span>
                                  <span className={`${isDay ? 'text-slate-800' : 'text-white'} text-right`}>{study.location}</span>
                                </div>
                                <div className="flex justify-between">
                                  <span className={`${isDay ? 'text-slate-600' : 'text-slate-300'}`}>Capacity:</span>
                                  <span className={`${isDay ? 'text-slate-800' : 'text-white'} text-right`}>{study.capacity}</span>
                                </div>
                                <div className="flex justify-between">
                                  <span className={`${isDay ? 'text-slate-600' : 'text-slate-300'}`}>Results:</span>
                                  <span className={`font-semibold text-right ${isDay ? 'text-green-600' : 'text-green-400'}`}>{study.savings}</span>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Reviews Tab */}
            {activeTab === 'reviews' && (
              <div className="space-y-6 md:space-y-8 service-content-sections-compact">
                <h2 className={`text-xl md:text-2xl font-bold service-section-title-compact ${
                  isDay ? 'text-slate-800' : 'text-white'
                }`}>
                  Customer Reviews
                </h2>
                <div className="space-y-4 md:space-y-6 service-reviews-list-compact">
                  {service.reviews.map((review, index) => (
                    <div key={index} className={`p-4 md:p-6 rounded-xl backdrop-blur-sm border service-review-compact ${
                      isDay 
                        ? 'bg-white/60 border-amber-200' 
                        : 'bg-white/10 border-white/20'
                    }`}>
                      <div className="flex flex-col md:flex-row md:items-start justify-between mb-3 md:mb-4 gap-2 service-review-header-compact">
                        <div>
                          <h4 className={`font-semibold text-sm md:text-base service-review-name-compact ${
                            isDay ? 'text-slate-800' : 'text-white'
                          }`}>
                            {review.name}
                          </h4>
                          <div className="flex items-center gap-2 mt-1 service-review-meta-compact">
                            <MapPin className={`w-3 h-3 md:w-4 md:h-4 ${
                              isDay ? 'text-slate-500' : 'text-slate-400'
                            }`} />
                            <span className={`text-xs md:text-sm ${
                              isDay ? 'text-slate-600' : 'text-slate-300'
                            }`}>
                              {review.location}
                            </span>
                          </div>
                        </div>
                        <div className="text-left md:text-right service-review-rating-compact">
                          <div className="flex items-center gap-1 service-review-stars-compact">
                            {[...Array(5)].map((_, i) => (
                              <Star
                                key={i}
                                className={`w-3 h-3 md:w-4 md:h-4 service-review-star-compact ${
                                  i < review.rating
                                    ? 'text-yellow-400 fill-current'
                                    : 'text-gray-300'
                                }`}
                              />
                            ))}
                          </div>
                          <span className={`text-xs md:text-sm service-review-date-compact ${
                            isDay ? 'text-slate-500' : 'text-slate-400'
                          }`}>
                            {review.date}
                          </span>
                        </div>
                      </div>
                      <p className={`text-sm md:text-base service-review-comment-compact ${
                        isDay ? 'text-slate-700' : 'text-slate-300'
                      }`}>
                        {review.comment}
                      </p>
                    </div>
                  ))}
                </div>

                {/* FAQ Section */}
                <div className="service-section-compact">
                  <h3 className={`text-lg md:text-xl font-bold mb-4 md:mb-6 service-section-subtitle-compact ${
                    isDay ? 'text-slate-800' : 'text-white'
                  }`}>
                    Frequently Asked Questions
                  </h3>
                  <div className="space-y-3 md:space-y-4 service-faq-list-compact">
                    {service.faqs.map((faq, index) => (
                      <div key={index} className={`p-4 md:p-6 rounded-xl backdrop-blur-sm border service-faq-item-compact ${
                        isDay 
                          ? 'bg-white/60 border-amber-200' 
                          : 'bg-white/10 border-white/20'
                      }`}>
                        <h4 className={`font-semibold mb-2 md:mb-3 text-sm md:text-base service-faq-question-compact ${
                          isDay ? 'text-slate-800' : 'text-white'
                        }`}>
                          {faq.question}
                        </h4>
                        <p className={`text-sm md:text-base service-faq-answer-compact ${
                          isDay ? 'text-slate-600' : 'text-slate-300'
                        }`}>
                          {faq.answer}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        </section>

        {/* India and Worldwide Coverage Section */}
        <section className={`py-6 md:py-12 service-coverage-section-compact ${
          isDay ? 'bg-blue-50/30' : 'bg-slate-900/30'
        }`}>
          <div className="max-w-7xl mx-auto px-4 md:px-6">
            <h2 className={`text-lg md:text-2xl font-bold mb-4 md:mb-6 text-center service-coverage-title-compact ${
              isDay ? 'text-slate-800' : 'text-white'
            }`}>
              India & Worldwide Coverage
            </h2>
            <div className="flex md:grid md:grid-cols-4 lg:grid-cols-6 gap-3 overflow-x-auto md:overflow-visible scroll-smooth scrollbar-hide pb-2 service-coverage-grid-compact">
              {['Mumbai', 'Delhi', 'Bangalore', 'Chennai', 'Hyderabad', 'Pune', 'Ahmedabad', 'Kolkata', 'Jaipur', 'Lucknow', 'Kochi', 'Coimbatore'].map((city, index) => (
                <div key={index} className={`min-w-[100px] md:min-w-0 flex-shrink-0 p-3 md:p-4 rounded-lg backdrop-blur-sm border text-center service-coverage-card-compact ${
                  isDay 
                    ? 'bg-white/60 border-blue-200' 
                    : 'bg-white/10 border-white/20'
                }`}>
                  <MapPin className={`w-5 h-5 md:w-6 md:h-6 mx-auto mb-1 md:mb-2 ${
                    isDay ? 'text-blue-600' : 'text-blue-400'
                  }`} />
                  <div className={`text-xs md:text-sm font-medium ${
                    isDay ? 'text-slate-800' : 'text-white'
                  }`}>
                    {city}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Why Choose Autosys Sunergy Section */}
        <section className={`py-6 md:py-12 service-why-choose-section-compact ${
          isDay ? 'bg-amber-50/30' : 'bg-blue-900/20'
        }`}>
          <div className="max-w-7xl mx-auto px-4 md:px-6">
            <h2 className={`text-lg md:text-2xl font-bold mb-4 md:mb-6 text-center service-why-choose-title-compact ${
              isDay ? 'text-slate-800' : 'text-white'
            }`}>
              Why Choose Autosys Sunergy
            </h2>
            <div className="flex md:grid md:grid-cols-3 lg:grid-cols-4 gap-4 overflow-x-auto md:overflow-visible scroll-smooth scrollbar-hide pb-2 service-why-choose-container-compact">
              {[
                { icon: Award, title: '25+ Years', subtitle: 'Experience' },
                { icon: Users, title: '10,000+', subtitle: 'Happy Customers' },
                { icon: Shield, title: '25 Years', subtitle: 'Warranty' },
                { icon: TrendingUp, title: '40% Avg', subtitle: 'Energy Savings' },
                { icon: Target, title: '24/7', subtitle: 'Support' },
                { icon: Globe, title: 'Pan India', subtitle: 'Presence' }
              ].map((item, index) => (
                <div key={index} className={`min-w-[160px] md:min-w-0 flex-shrink-0 p-4 md:p-6 rounded-lg backdrop-blur-sm border text-center service-why-choose-card-compact ${
                  isDay 
                    ? 'bg-white/60 border-amber-200' 
                    : 'bg-white/10 border-white/20'
                }`}>
                  <item.icon className={`w-8 h-8 md:w-10 md:h-10 mx-auto mb-2 md:mb-3 ${
                    isDay ? 'text-amber-600' : 'text-blue-400'
                  }`} />
                  <div className={`text-lg md:text-xl font-bold mb-1 ${
                    isDay ? 'text-slate-800' : 'text-white'
                  }`}>
                    {item.title}
                  </div>
                  <div className={`text-sm md:text-base ${
                    isDay ? 'text-slate-600' : 'text-slate-300'
                  }`}>
                    {item.subtitle}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Related Services */}
        <section className={`py-8 md:py-16 service-related-section-compact ${
          isDay ? 'bg-amber-50/50' : 'bg-slate-800/50'
        }`}>
          <div className="max-w-7xl mx-auto px-4 md:px-6">
            <h2 className={`text-xl md:text-2xl font-bold mb-6 md:mb-8 text-center service-related-title-compact ${
              isDay ? 'text-slate-800' : 'text-white'
            }`}>
              Related Services
            </h2>
            <div className="grid md:grid-cols-3 gap-4 md:gap-6 service-related-grid-compact">
              {service.relatedServices.map((relatedId) => {
                const relatedService = servicesDatabase[relatedId];
                if (!relatedService) return null;
                
                return (
                  <Link key={relatedId} href={`/services/${relatedId}`}>
                    <div className={`p-4 md:p-6 rounded-xl backdrop-blur-sm border transition-all duration-300 hover:scale-105 cursor-pointer service-related-card-compact ${
                      isDay 
                        ? 'bg-white/60 border-amber-200 hover:bg-white/80' 
                        : 'bg-white/10 border-white/20 hover:bg-white/20'
                    }`}>
                      <div className="flex items-center gap-3 mb-3 service-related-card-header-compact">
                        <relatedService.icon className={`w-5 h-5 md:w-6 md:h-6 service-related-card-icon-compact ${
                          isDay ? 'text-amber-600' : 'text-blue-400'
                        }`} />
                        <h3 className={`font-semibold text-sm md:text-base service-related-card-title-compact ${
                          isDay ? 'text-slate-800' : 'text-white'
                        }`}>
                          {relatedService.title}
                        </h3>
                      </div>
                      <p className={`text-xs md:text-sm service-related-card-description-compact ${
                        isDay ? 'text-slate-600' : 'text-slate-300'
                      }`}>
                        {relatedService.shortDesc}
                      </p>
                      <div className="mt-3 md:mt-4 flex items-center justify-between service-related-card-footer-compact">
                        <span className={`font-semibold text-sm md:text-base ${
                          isDay ? 'text-amber-600' : 'text-blue-400'
                        }`}>
                          {relatedService.price}
                        </span>
                        <ArrowRight className={`w-3 h-3 md:w-4 md:h-4 ${
                          isDay ? 'text-slate-400' : 'text-slate-500'
                        }`} />
                      </div>
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className={`py-12 md:py-16 service-cta-section-compact ${
          isDay ? 'bg-amber-50' : 'bg-slate-800'
        }`}>
          <div className="max-w-4xl mx-auto text-center px-4 md:px-6">
            <h2 className={`text-2xl md:text-3xl font-bold mb-4 md:mb-6 service-cta-title-compact ${
              isDay ? 'text-slate-800' : 'text-white'
            }`}>
              Ready to Get Started?
            </h2>
            <p className={`text-base md:text-lg mb-6 md:mb-8 service-cta-description-compact ${
              isDay ? 'text-slate-600' : 'text-slate-300'
            }`}>
              Contact our experts for a free consultation and customized solution
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center service-cta-buttons-compact">
              <button className={`px-6 py-3 md:px-8 md:py-4 rounded-xl font-semibold transition-all duration-300 text-sm md:text-base service-cta-button-compact ${
                isDay 
                  ? 'bg-amber-500 text-white hover:bg-amber-600' 
                  : 'bg-blue-500 text-white hover:bg-blue-600'
              }`}>
                <span className="flex items-center justify-center gap-2">
                  <Phone className="w-4 h-4 md:w-5 md:h-5 service-cta-button-icon-compact" />
                  Call Now: +91 8818880540
                </span>
              </button>
              <button className={`px-6 py-3 md:px-8 md:py-4 rounded-xl font-semibold border-2 transition-all duration-300 text-sm md:text-base service-cta-button-compact ${
                isDay 
                  ? 'border-amber-500 text-amber-600 hover:bg-amber-500 hover:text-white' 
                  : 'border-blue-400 text-blue-400 hover:bg-blue-400 hover:text-white'
              }`}>
                <span className="flex items-center justify-center gap-2">
                  <Mail className="w-4 h-4 md:w-5 md:h-5 service-cta-button-icon-compact" />
                  Get Free Quote
                </span>
              </button>
            </div>
          </div>
        </section>

        <Footer />
      </div>
    </div>
  );
}
