import { Cpu } from 'lucide-react';
import { Product } from './types';

export const invertersProducts: Product[] = [
  {
    id: 'inv-string-5kw',
    title: 'Microtek String Inverter 5kW',
    shortDesc: 'High-efficiency string inverter for residential solar systems',
    description: 'Reliable and efficient string inverter designed for residential solar installations with advanced monitoring capabilities and built-in safety features.',
    category: 'inverters',
    subcategory: 'string-inverter',
    brand: 'Microtek',
    model: 'MSI-5000-TL-PLUS',
    specifications: {
      'Power Output': '5000W',
      'Max DC Power': '5500W',
      'Efficiency': '97.3%',
      'Input Voltage Range': '125-950V',
      'Max Input Current': '16A',
      'MPPT Trackers': '2',
      'Output Voltage': '230V AC',
      'Output Frequency': '50Hz',
      'Dimensions': '506 x 770 x 255mm',
      'Weight': '25.5 kg',
      'Protection Rating': 'IP65',
      'Operating Temperature': '-25°C to +60°C',
      'Cooling': 'Natural convection',
      'Display': 'LED indicators'
    },
    features: [
      'Dual MPPT for flexible design',
      'High efficiency up to 97.3%',
      'Transformerless technology',
      'Integrated DC switch',
      'Wide input voltage range',
      'Advanced monitoring capabilities'
    ],
    price: '₹45,000 - ₹52,000',
    moq: '5 units',
    warranty: '5 years standard, extendable to 20 years',
    efficiency: '97.3%',
    capacity: '5kW',
    image: '/microtek_solar_inverter_logo.png',
    images: [
      '/microtek_solar_inverter_logo.png',
      '/Solar_product_sample_image.jpg'
    ],
    icon: Cpu,
    rating: 4.7,
    reviews: 124,
    isPopular: true,
    isFeatured: true,
    inStock: true,
    leadTime: '3-5 days',
    certifications: ['IEC 62109', 'IS 61683', 'MNRE Approved', 'CE', 'VDE'],
    applications: ['Residential rooftops', 'Small commercial', 'Off-grid cabins', 'Agricultural pumping'],
    compatibleWith: ['Monocrystalline panels', 'Polycrystalline panels', 'Bifacial panels'],
    technicalDocs: {
      datasheet: '/docs/microtek-5kw-string-datasheet.pdf',
      manual: '/docs/microtek-installation-manual.pdf',
      certifications: '/docs/microtek-certifications.pdf',
      additionalDocs: [
        {
          title: 'MPPT Configuration Guide',
          url: '/docs/microtek-5kw-mppt-config.pdf',
          type: 'pdf'
        },
        {
          title: 'Monitoring Setup Guide',
          url: '/docs/microtek-monitoring-setup.pdf',
          type: 'pdf'
        }
      ]
    },
    media: {
      youtubeVideoUrl: 'https://www.youtube.com/watch?v=2Vv-BfVoq4g',
      videoTitle: 'Microtek 5kW String Inverter Installation & Setup',
      videoDescription: 'Complete installation guide for the Microtek 5kW string inverter including MPPT configuration and system monitoring setup.',
      productImages: [
        '/microtek_solar_inverter_logo.png',
        '/Solar_product_sample_image.jpg'
      ],
      installationImages: [
        '/about_hero_section_images/About_herosection_image1.png'
      ]
    }
  },
  {
    id: 'inv-hybrid-10kw',
    title: 'Microtek Hybrid Inverter 10kW',
    shortDesc: 'Advanced hybrid inverter with battery backup capability',
    description: 'Intelligent hybrid inverter that seamlessly switches between solar, battery, and grid power for maximum energy independence and backup protection.',
    category: 'inverters',
    subcategory: 'hybrid-inverter',
    brand: 'Microtek',
    model: 'MHI-10KW-48V',
    specifications: {
      'Power Output': '10000W',
      'Max DC Power': '13000W',
      'Efficiency': '97.5%',
      'Battery Voltage': '48V',
      'Charging Current': '140A',
      'Input Voltage Range': '150-850V',
      'MPPT Trackers': '2',
      'Output Voltage': '230V AC',
      'Output Frequency': '50Hz',
      'Dimensions': '580 x 460 x 280mm',
      'Weight': '45 kg',
      'Protection Rating': 'IP54',
      'Operating Temperature': '-10°C to +55°C',
      'Display': '7" Color Touch Screen',
      'Communication': 'WiFi, RS485, USB'
    },
    features: [
      'Hybrid solar + battery + grid',
      'Advanced battery management',
      'Smart load management',
      'Remote monitoring via app',
      'Generator backup support',
      'Time-of-use optimization'
    ],
    price: '₹85,000 - ₹95,000',
    moq: '3 units',
    warranty: '5 years comprehensive',
    efficiency: '97.5%',
    capacity: '10kW',
    image: '/microtek_solar_inverter_logo.png',
    images: [
      '/microtek_solar_inverter_logo.png',
      '/Solar_product_sample_image.jpg'
    ],
    icon: Cpu,
    rating: 4.8,
    reviews: 89,
    isPopular: true,
    isFeatured: true,
    inStock: true,
    leadTime: '7-10 days',
    certifications: ['IEC 62109', 'IS 61683', 'MNRE Approved', 'CE', 'UL'],
    applications: ['Residential backup', 'Commercial buildings', 'Healthcare facilities', 'Critical loads'],
    compatibleWith: ['Lithium batteries', 'Lead-acid batteries', 'All panel types'],
    technicalDocs: {
      datasheet: '/docs/microtek-10kw-hybrid-datasheet.pdf',
      manual: '/docs/microtek-hybrid-manual.pdf',
      certifications: '/docs/microtek-certifications.pdf',
      additionalDocs: [
        {
          title: 'Battery Configuration Guide',
          url: '/docs/microtek-10kw-battery-config.pdf',
          type: 'pdf'
        },
        {
          title: 'Smart Home Integration',
          url: '/docs/microtek-smart-home.pdf',
          type: 'pdf'
        },
        {
          title: 'Load Management Settings',
          url: '/docs/microtek-load-management.pdf',
          type: 'pdf'
        }
      ]
    },
    media: {
      youtubeVideoUrl: 'https://www.youtube.com/watch?v=HIcSWuKMwOw',
      videoTitle: 'Microtek 10kW Hybrid Inverter - Complete System Overview',
      videoDescription: 'Learn how the Microtek 10kW hybrid inverter manages solar, battery, and grid power automatically. Includes app setup and configuration.',
      productImages: [
        '/microtek_solar_inverter_logo.png',
        '/Solar_product_sample_image.jpg'
      ],
      installationImages: [
        '/about_hero_section_images/About_herosection_image1.png'
      ]
    }
  },
  {
    id: 'inv-micro-300w',
    title: 'Microtek Microinverter 300W',
    shortDesc: 'Module-level power optimization with individual panel monitoring',
    description: 'Advanced microinverter technology that maximizes energy harvest from each solar panel with individual MPPT and real-time monitoring.',
    category: 'inverters',
    subcategory: 'microinverter',
    brand: 'Microtek',
    model: 'MMI-300-2-INT',
    specifications: {
      'Power Output': '300W',
      'Peak AC Power': '320W',
      'Efficiency': '96.5%',
      'Input Voltage Range': '16-60V',
      'Max Input Current': '15A',
      'Output Voltage': '230V AC',
      'Output Frequency': '50Hz',
      'Dimensions': '175 x 175 x 30mm',
      'Weight': '0.65 kg',
      'Protection Rating': 'IP67',
      'Operating Temperature': '-40°C to +65°C',
      'Communication': 'Power Line Communication',
      'Monitoring': 'Panel-level monitoring'
    },
    features: [
      'Panel-level MPPT optimization',
      'Individual panel monitoring',
      'No single point of failure',
      'Easy system expansion',
      'Shade tolerance',
      'Rapid shutdown compliance'
    ],
    price: '₹8,500 - ₹9,500',
    moq: '10 units',
    warranty: '25 years limited warranty',
    efficiency: '96.5%',
    capacity: '300W',
    image: '/microtek_solar_inverter_logo.png',
    images: [
      '/microtek_solar_inverter_logo.png',
      '/Solar_product_sample_image.jpg'
    ],
    icon: Cpu,
    rating: 4.9,
    reviews: 156,
    isPopular: false,
    isFeatured: true,
    inStock: true,
    leadTime: '5-7 days',
    certifications: ['IEC 62109', 'UL 1741', 'IEEE 1547', 'CE', 'VDE'],
    applications: ['Residential rooftops', 'Complex roof layouts', 'Partial shading areas', 'Premium installations'],
    compatibleWith: ['All panel types', 'Microtek monitoring', 'Battery storage systems'],
    technicalDocs: {
      datasheet: '/docs/microtek-microinverter-datasheet.pdf',
      manual: '/docs/microtek-installation-manual.pdf',
      certifications: '/docs/microtek-certifications.pdf',
      additionalDocs: [
        {
          title: 'Panel-Level Monitoring Guide',
          url: '/docs/microtek-panel-monitoring.pdf',
          type: 'pdf'
        },
        {
          title: 'Rapid Shutdown Compliance',
          url: '/docs/microtek-rapid-shutdown.pdf',
          type: 'pdf'
        }
      ]
    },
    media: {
      youtubeVideoUrl: 'https://www.youtube.com/watch?v=6n3pFFPSlW4',
      videoTitle: 'Microtek 300W Microinverter - Panel Level Power Electronics',
      videoDescription: 'See how microinverters optimize each panel individually and provide detailed monitoring for maximum system performance.',
      productImages: [
        '/microtek_solar_inverter_logo.png',
        '/Solar_product_sample_image.jpg'
      ],
      installationImages: [
        '/about_hero_section_images/About_herosection_image1.png'
      ]
    }
  },
  {
    id: 'inv-central-50kw',
    title: 'Microtek Central Inverter 50kW',
    shortDesc: 'High-power central inverter for commercial and utility applications',
    description: 'Robust central inverter designed for large-scale commercial and utility solar installations with advanced grid management features.',
    category: 'inverters',
    subcategory: 'central-inverter',
    brand: 'Microtek',
    model: 'MCI-50KW-3PH',
    specifications: {
      'Power Output': '50000W',
      'Max DC Power': '52500W',
      'Efficiency': '98.2%',
      'Input Voltage Range': '600-1000V',
      'Max Input Current': '100A',
      'MPPT Trackers': '4',
      'Output Voltage': '400V AC',
      'Output Frequency': '50Hz',
      'Dimensions': '800 x 1200 x 400mm',
      'Weight': '85 kg',
      'Protection Rating': 'IP54',
      'Operating Temperature': '-25°C to +60°C',
      'Cooling': 'Forced air cooling',
      'Display': 'LCD with communication'
    },
    features: [
      'High efficiency up to 98.2%',
      'Four independent MPPT trackers',
      'Advanced grid support functions',
      'Remote monitoring and control',
      'Robust outdoor design',
      'Easy maintenance access'
    ],
    price: '₹3,50,000 - ₹4,00,000',
    moq: '1 unit',
    warranty: '5 years standard, extendable',
    efficiency: '98.2%',
    capacity: '50kW',
    image: '/microtek_solar_inverter_logo.png',
    images: [
      '/microtek_solar_inverter_logo.png',
      '/Solar_product_sample_image.jpg'
    ],
    icon: Cpu,
    rating: 4.6,
    reviews: 23,
    isPopular: false,
    isFeatured: false,
    inStock: true,
    leadTime: '14-21 days',
    certifications: ['IEC 62109', 'IEEE 1547', 'UL 1741', 'CE', 'VDE'],
    applications: ['Commercial rooftops', 'Utility-scale projects', 'Industrial installations', 'Ground-mounted systems'],
    compatibleWith: ['High-voltage panels', 'String combiners', 'Monitoring systems'],
    technicalDocs: {
      datasheet: '/docs/microtek-50kw-central-datasheet.pdf',
      manual: '/docs/microtek-installation-manual.pdf',
      certifications: '/docs/microtek-certifications.pdf',
      additionalDocs: [
        {
          title: 'High Power Installation Guide',
          url: '/docs/microtek-50kw-installation.pdf',
          type: 'pdf'
        },
        {
          title: 'Grid Compliance Documentation',
          url: '/docs/microtek-grid-compliance.pdf',
          type: 'pdf'
        },
        {
          title: 'Maintenance Schedule',
          url: '/docs/microtek-50kw-maintenance.pdf',
          type: 'pdf'
        }
      ]
    },
    media: {
      youtubeVideoUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
      videoTitle: 'Microtek 50kW Central Inverter - Commercial Grade Power',
      videoDescription: 'Discover the features of our heavy-duty 50kW central inverter designed for commercial and utility-scale solar installations.',
      productImages: [
        '/microtek_solar_inverter_logo.png',
        '/Solar_product_sample_image.jpg'
      ],
      installationImages: [
        '/about_hero_section_images/About_herosection_image1.png'
      ]
    }
  }
];
