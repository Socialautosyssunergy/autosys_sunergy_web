import { Wrench, Cable, Shield } from 'lucide-react';
import { Product } from './types';

export const mountingProducts: Product[] = [
  {
    id: 'mount-roof-kit',
    title: 'Rooftop Mounting Kit',
    shortDesc: 'Complete rooftop mounting solution for solar panels',
    description: 'Comprehensive mounting kit for installing solar panels on various roof types with all necessary hardware and weather protection.',
    category: 'mounting',
    subcategory: 'rooftop-mounting',
    brand: 'Ksolare',
    model: 'KS-RT-10P',
    specifications: {
      'Panel Capacity': '10 panels (up to 550W each)',
      'Material': 'Anodized Aluminum',
      'Roof Type': 'Tile, Metal, Concrete',
      'Tilt Angle': '15° to 45° adjustable',
      'Wind Load': 'Up to 180 kmph',
      'Snow Load': '2400 Pa',
      'Rail Length': '4.2m standard',
      'Hardware': 'Stainless steel bolts',
      'Grounding': 'Integrated EGBC',
      'Warranty': '25 years structural',
      'Installation': 'Tool-free clamps',
      'Compliance': 'IS 875, IEC 61215'
    },
    features: [
      'Pre-assembled components',
      'Universal panel compatibility',
      'Weather-resistant coating',
      'Easy installation system',
      'Integrated grounding',
      'Adjustable tilt angles'
    ],
    price: '₹8,500 - ₹10,500',
    moq: '2 kits',
    warranty: '25 years structural warranty',
    image: '/Solar_product_sample_image.jpg',
    images: [
      '/Solar_product_sample_image.jpg',
      '/sample_solar_image.jpg'
    ],
    icon: Wrench,
    rating: 4.6,
    reviews: 89,
    isPopular: true,
    isFeatured: false,
    inStock: true,
    leadTime: '5-7 days',
    certifications: ['IS 875', 'IEC 61215', 'ASTM Standards', 'Wind Load Certified'],
    applications: ['Residential rooftops', 'Commercial buildings', 'Industrial facilities'],
    compatibleWith: ['All panel sizes', 'Framed panels', 'Various roof types'],
    technicalDocs: {
      datasheet: '/docs/ksolare-mounting-kit-datasheet.pdf',
      manual: '/docs/ksolare-installation-manual.pdf',
      certifications: '/docs/ksolare-certifications.pdf'
    },
    media: {
      youtubeVideoUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
      videoTitle: 'Rooftop Mounting Kit Installation Guide',
      videoDescription: 'Complete installation process for Ksolare rooftop mounting system',
      productImages: ['/Solar_product_sample_image.jpg', '/sample_solar_image.jpg'],
      installationImages: ['/Solar_product_sample_image.jpg']
    }
  },
  {
    id: 'mount-ground-structure',
    title: 'Ground Mounting Structure',
    shortDesc: 'Heavy-duty ground mounting system for large installations',
    description: 'Robust ground mounting structure designed for utility-scale and large commercial solar installations with optimized spacing and accessibility.',
    category: 'mounting',
    subcategory: 'ground-mounting',
    brand: 'Mahindra Susten',
    model: 'MS-GMS-1MW',
    specifications: {
      'Capacity': '1MW installation',
      'Material': 'Hot-dip galvanized steel',
      'Foundation': 'Pile/concrete options',
      'Tilt Angle': '20° to 30° fixed',
      'Row Spacing': '6m standard',
      'Wind Load': 'Up to 200 kmph',
      'Corrosion Protection': 'Zinc coating 120 microns',
      'Module Orientation': 'Portrait/landscape',
      'Accessibility': '4m maintenance aisles',
      'Design Life': '25+ years',
      'Soil Conditions': 'All soil types',
      'Installation': 'Mechanical connections'
    },
    features: [
      'Pre-engineered design',
      'Optimized land utilization',
      'Easy maintenance access',
      'Modular construction',
      'Superior corrosion resistance',
      'Wind-optimized design'
    ],
    price: '₹2,50,000 - ₹3,20,000',
    moq: '1 MW capacity',
    warranty: '25 years structural warranty',
    image: '/Solar_product_sample_image.jpg',
    images: [
      '/Solar_product_sample_image.jpg',
      '/sample_solar_image.jpg'
    ],
    icon: Wrench,
    rating: 4.8,
    reviews: 34,
    isPopular: false,
    isFeatured: true,
    inStock: true,
    leadTime: '30-45 days',
    certifications: ['IS 875', 'IS 800', 'IEC 61215', 'Wind Tunnel Tested'],
    applications: ['Utility-scale projects', 'Solar parks', 'Industrial ground-mount', 'Agricultural solar'],
    compatibleWith: ['All panel types', 'Tracking systems', 'Fixed-tilt systems'],
    technicalDocs: {
      datasheet: '/docs/mahindra-ground-mount-datasheet.pdf',
      manual: '/docs/mahindra-installation-manual.pdf',
      certifications: '/docs/mahindra-certifications.pdf'
    },
    media: {
      youtubeVideoUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
      videoTitle: 'Ground Mounting System Installation',
      videoDescription: 'Professional installation of Mahindra Susten ground mounting structures',
      productImages: ['/Solar_product_sample_image.jpg', '/sample_solar_image.jpg'],
      installationImages: ['/Solar_product_sample_image.jpg']
    }
  }
];

export const accessoriesProducts: Product[] = [
  {
    id: 'acc-dc-cable-4mm',
    title: 'DC Solar Cable 4mm²',
    shortDesc: 'High-quality DC cable for solar panel connections',
    description: 'UV-resistant, weatherproof DC cable specifically designed for solar installations with excellent conductivity and durability.',
    category: 'accessories',
    subcategory: 'cables',
    brand: 'Polycab',
    model: 'Solarcab-4sq',
    specifications: {
      'Cross Section': '4mm²',
      'Conductor': 'Tinned copper',
      'Insulation': 'XLPE',
      'Jacket': 'LSZH compound',
      'Voltage Rating': '1.8kV DC',
      'Temperature Range': '-40°C to +90°C',
      'UV Resistance': '25 years',
      'Flame Retardant': 'IEC 60332-1',
      'Current Capacity': '32A @ 25°C',
      'Color': 'Red/Black',
      'Length': '100m drum',
      'Bend Radius': '5 x cable diameter'
    },
    features: [
      'TUV certified quality',
      'UV and weather resistant',
      'Halogen-free compound',
      'Excellent flexibility',
      'Low smoke emission',
      'Easy stripping and termination'
    ],
    price: '₹45 - ₹55 per meter',
    moq: '100 meters',
    warranty: '25 years performance',
    image: '/Solar_product_sample_image.jpg',
    images: [
      '/Solar_product_sample_image.jpg',
      '/sample_solar_image.jpg'
    ],
    icon: Cable,
    rating: 4.7,
    reviews: 156,
    isPopular: true,
    isFeatured: false,
    inStock: true,
    leadTime: '2-3 days',
    certifications: ['TUV Rheinland', 'IEC 62930', 'RoHS', 'CE'],
    applications: ['DC string connections', 'Panel to combiner', 'Array wiring'],
    compatibleWith: ['MC4 connectors', 'All solar panels', 'Combiner boxes'],
    technicalDocs: {
      datasheet: '/docs/polycab-dc-cable-datasheet.pdf',
      manual: '/docs/polycab-installation-guide.pdf',
      certifications: '/docs/polycab-certifications.pdf'
    },
    media: {
      youtubeVideoUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
      videoTitle: 'DC Solar Cable Installation Guide',
      videoDescription: 'Proper installation techniques for Polycab DC solar cables',
      productImages: ['/Solar_product_sample_image.jpg', '/sample_solar_image.jpg'],
      installationImages: ['/Solar_product_sample_image.jpg']
    }
  },
  {
    id: 'acc-mc4-connectors',
    title: 'MC4 Connectors Set',
    shortDesc: 'Waterproof MC4 connectors for reliable solar connections',
    description: 'High-quality MC4 connectors ensuring weatherproof and reliable electrical connections in solar panel installations.',
    category: 'accessories',
    subcategory: 'connectors',
    brand: 'Staubli',
    model: 'MC4-EVO2',
    specifications: {
      'Type': 'MC4 Male/Female pair',
      'Voltage Rating': '1500V DC',
      'Current Rating': '30A',
      'Wire Range': '2.5-6mm²',
      'Contact Material': 'Copper alloy',
      'Housing Material': 'PPO (Noryl)',
      'IP Rating': 'IP68',
      'Operating Temperature': '-40°C to +85°C',
      'Contact Resistance': '<0.5mΩ',
      'Insertion Force': '<50N',
      'Locking Mechanism': 'Snap-in design',
      'Color Coding': 'Red (positive), Black (negative)'
    },
    features: [
      'Tool-free assembly',
      'Waterproof IP68 rating',
      'Low contact resistance',
      'Secure locking mechanism',
      'Easy disconnect tool',
      'Industry standard compatibility'
    ],
    price: '₹85 - ₹125 per pair',
    moq: '50 pairs',
    warranty: '25 years performance',
    image: '/Solar_product_sample_image.jpg',
    images: [
      '/Solar_product_sample_image.jpg',
      '/sample_solar_image.jpg'
    ],
    icon: Cable,
    rating: 4.9,
    reviews: 267,
    isPopular: true,
    isFeatured: true,
    inStock: true,
    leadTime: '1-2 days',
    certifications: ['TUV Rheinland', 'IEC 62852', 'UL Listed', 'CE'],
    applications: ['Panel connections', 'String wiring', 'Extension cables'],
    compatibleWith: ['All solar panels', 'DC cables', 'Combiner boxes'],
    technicalDocs: {
      datasheet: '/docs/staubli-mc4-datasheet.pdf',
      manual: '/docs/staubli-connector-manual.pdf',
      certifications: '/docs/staubli-certifications.pdf'
    },
    media: {
      youtubeVideoUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
      videoTitle: 'MC4 Connector Installation Tutorial',
      videoDescription: 'Step-by-step guide to properly install Stäubli MC4 connectors',
      productImages: ['/Solar_product_sample_image.jpg', '/sample_solar_image.jpg'],
      installationImages: ['/Solar_product_sample_image.jpg']
    }
  },
  {
    id: 'acc-surge-protector',
    title: 'DC Surge Protector',
    shortDesc: 'Lightning and surge protection for solar systems',
    description: 'Advanced surge protection device designed to protect solar installations from lightning strikes and electrical surges.',
    category: 'accessories',
    subcategory: 'protection',
    brand: 'Phoenix Contact',
    model: 'VAL-MS-T1/T2-1000-DC',
    specifications: {
      'Type': 'Type 1+2 combined',
      'Voltage Rating': '1000V DC',
      'Current Rating': '20kA (8/20μs)',
      'Protection Level': '<2.5kV',
      'Response Time': '<25ns',
      'Operating Temperature': '-40°C to +85°C',
      'Enclosure': 'IP20',
      'Mounting': 'DIN rail',
      'Dimensions': '90 x 12.5 x 58mm',
      'Status Indication': 'Visual indicator',
      'Remote Monitoring': 'Potential-free contact',
      'Replacement': 'Pluggable modules'
    },
    features: [
      'Combined Type 1+2 protection',
      'Low protection level',
      'Fast response time',
      'Visual status indication',
      'Remote monitoring capability',
      'Easy maintenance'
    ],
    price: '₹3,500 - ₹4,200',
    moq: '5 units',
    warranty: '5 years replacement',
    image: '/Solar_product_sample_image.jpg',
    images: [
      '/Solar_product_sample_image.jpg',
      '/sample_solar_image.jpg'
    ],
    icon: Shield,
    rating: 4.8,
    reviews: 78,
    isPopular: false,
    isFeatured: false,
    inStock: true,
    leadTime: '7-10 days',
    certifications: ['IEC 61643-31', 'UL 1449', 'VDE', 'CE'],
    applications: ['DC combiner boxes', 'Inverter protection', 'Control panels'],
    compatibleWith: ['All inverter types', 'Monitoring systems', 'Combiner boxes'],
    technicalDocs: {
      datasheet: '/docs/phoenix-surge-protector-datasheet.pdf',
      manual: '/docs/phoenix-installation-manual.pdf',
      certifications: '/docs/phoenix-certifications.pdf'
    },
    media: {
      youtubeVideoUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
      videoTitle: 'DC Surge Protector Installation Guide',
      videoDescription: 'Professional installation of Phoenix Contact surge protection devices',
      productImages: ['/Solar_product_sample_image.jpg', '/sample_solar_image.jpg'],
      installationImages: ['/Solar_product_sample_image.jpg']
    }
  },
  {
    id: 'acc-monitoring-system',
    title: 'Solar Monitoring System',
    shortDesc: 'Real-time monitoring and analytics for solar installations',
    description: 'Comprehensive monitoring solution providing real-time performance data, analytics, and remote diagnostics for solar systems.',
    category: 'accessories',
    subcategory: 'monitoring',
    brand: 'SolarEdge',
    model: 'SE-MTR240-1000-S1',
    specifications: {
      'Communication': 'Zigbee, Ethernet, WiFi',
      'Monitoring': 'String/panel level',
      'Data Storage': 'Cloud-based',
      'Interface': 'Web portal, mobile app',
      'Accuracy': '±1% revenue grade',
      'Update Interval': '15 minutes',
      'Power Supply': '230V AC',
      'Operating Temperature': '-25°C to +60°C',
      'Dimensions': '165 x 124 x 68mm',
      'IP Rating': 'IP65',
      'Memory': '1GB internal storage',
      'Display': 'LED status indicators'
    },
    features: [
      'Real-time monitoring',
      'Performance analytics',
      'Fault detection and alerts',
      'Mobile app interface',
      'Historical data analysis',
      'Revenue-grade accuracy'
    ],
    price: '₹15,000 - ₹18,500',
    moq: '1 unit',
    warranty: '5 years comprehensive',
    image: '/Solar_product_sample_image.jpg',
    images: [
      '/Solar_product_sample_image.jpg',
      '/sample_solar_image.jpg'
    ],
    icon: Cable,
    rating: 4.6,
    reviews: 124,
    isPopular: true,
    isFeatured: true,
    inStock: true,
    leadTime: '5-7 days',
    certifications: ['IEC 62053', 'FCC', 'CE', 'IC'],
    applications: ['Commercial systems', 'Residential monitoring', 'O&M services'],
    compatibleWith: ['All inverter brands', 'Energy meters', 'Weather stations'],
    technicalDocs: {
      datasheet: '/docs/solaredge-monitoring-datasheet.pdf',
      manual: '/docs/solaredge-monitoring-manual.pdf',
      certifications: '/docs/solaredge-certifications.pdf'
    },
    media: {
      youtubeVideoUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
      videoTitle: 'Solar Monitoring System Setup Guide',
      videoDescription: 'Complete setup and configuration of SolarEdge monitoring system',
      productImages: ['/Solar_product_sample_image.jpg', '/sample_solar_image.jpg'],
      installationImages: ['/Solar_product_sample_image.jpg']
    }
  }
];
