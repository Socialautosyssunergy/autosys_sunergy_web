import { Battery } from 'lucide-react';
import { Product } from './types';

export const batteriesProducts: Product[] = [
  {
    id: 'bat-lithium-10kwh',
    title: 'Lithium Battery 10kWh',
    shortDesc: 'High-performance lithium iron phosphate battery system',
    description: 'Advanced lithium iron phosphate (LiFePO4) battery system with built-in BMS for residential and commercial energy storage applications.',
    category: 'batteries',
    subcategory: 'lithium-battery',
    brand: 'Exide',
    model: 'LiFePO4-10kWh-Pro',
    specifications: {
      'Capacity': '10kWh (200Ah @ 48V)',
      'Battery Type': 'Lithium Iron Phosphate (LiFePO4)',
      'Voltage': '48V DC',
      'Discharge Depth': '95%',
      'Cycle Life': '6000+ cycles @ 80% DOD',
      'Efficiency': '96%',
      'Dimensions': '600 x 400 x 300mm',
      'Weight': '85 kg',
      'Operating Temperature': '-20°C to +55°C',
      'BMS': 'Integrated Battery Management System',
      'Communication': 'CAN Bus, RS485',
      'IP Rating': 'IP54',
      'Mounting': 'Wall/Floor mountable'
    },
    features: [
      '6000+ cycle life',
      'Fast charging capability',
      'Integrated BMS protection',
      'Modular design',
      'Zero maintenance',
      'Wide temperature range'
    ],
    price: '₹4,50,000 - ₹5,20,000',
    moq: '1 unit',
    warranty: '10 years performance warranty',
    capacity: '10kWh',
    image: '/Solar_product_sample_image.jpg',
    images: [
      '/Solar_product_sample_image.jpg',
      '/sample_solar_image.jpg'
    ],
    icon: Battery,
    rating: 4.8,
    reviews: 67,
    isPopular: true,
    isFeatured: true,
    inStock: true,
    leadTime: '10-15 days',
    certifications: ['IEC 62619', 'UL 1973', 'UN38.3', 'CE', 'BIS'],
    applications: ['Residential backup', 'Commercial energy storage', 'Off-grid systems', 'Peak shaving'],
    compatibleWith: ['Hybrid inverters', 'Battery inverters', 'Solar charge controllers'],
    technicalDocs: {
      datasheet: '/docs/exide-lithium-10kwh-datasheet.pdf',
      manual: '/docs/exide-battery-manual.pdf',
      certifications: '/docs/exide-certifications.pdf'
    },
    media: {
      youtubeVideoUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
      videoTitle: 'Lithium Battery Installation Guide',
      videoDescription: 'Complete installation and setup of Exide 10kWh lithium battery system',
      productImages: ['/Solar_product_sample_image.jpg', '/sample_solar_image.jpg'],
      installationImages: ['/Solar_product_sample_image.jpg']
    }
  },
  {
    id: 'bat-gel-150ah',
    title: 'Gel Battery 150Ah',
    shortDesc: 'Deep cycle gel battery for reliable solar energy storage',
    description: 'Maintenance-free gel battery designed for deep cycle applications with excellent performance in extreme temperatures and long service life.',
    category: 'batteries',
    subcategory: 'gel-battery',
    brand: 'Luminous',
    model: 'LGS-150-12V',
    specifications: {
      'Capacity': '150Ah @ C20',
      'Battery Type': 'Sealed Gel',
      'Voltage': '12V DC',
      'Discharge Depth': '80%',
      'Cycle Life': '1200+ cycles @ 50% DOD',
      'Float Life': '8-10 years',
      'Dimensions': '485 x 172 x 240mm',
      'Weight': '45 kg',
      'Operating Temperature': '-20°C to +50°C',
      'Terminal Type': 'M8 threaded',
      'Maintenance': 'Maintenance-free',
      'Self Discharge': '<3% per month',
      'Case Material': 'ABS plastic'
    },
    features: [
      'Maintenance-free operation',
      'Deep discharge recovery',
      'Excellent temperature performance',
      'Leak-proof design',
      'Low self-discharge',
      'Extended service life'
    ],
    price: '₹12,500 - ₹14,500',
    moq: '4 units',
    warranty: '5 years replacement warranty',
    capacity: '150Ah',
    image: '/Solar_product_sample_image.jpg',
    images: [
      '/Solar_product_sample_image.jpg',
      '/sample_solar_image.jpg'
    ],
    icon: Battery,
    rating: 4.5,
    reviews: 134,
    isPopular: true,
    isFeatured: false,
    inStock: true,
    leadTime: '3-5 days',
    certifications: ['IEC 60896', 'IS 1651', 'CE', 'RoHS'],
    applications: ['Solar home systems', 'UPS backup', 'Telecom towers', 'Remote monitoring'],
    compatibleWith: ['PWM controllers', 'MPPT controllers', 'Inverters'],
    technicalDocs: {
      datasheet: '/docs/luminous-gel-150ah-datasheet.pdf',
      manual: '/docs/luminous-gel-manual.pdf',
      certifications: '/docs/luminous-gel-certifications.pdf'
    },
    media: {
      youtubeVideoUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
      videoTitle: 'Gel Battery Installation Guide',
      videoDescription: 'Proper installation and maintenance of Luminous gel batteries',
      productImages: ['/Solar_product_sample_image.jpg', '/sample_solar_image.jpg'],
      installationImages: ['/Solar_product_sample_image.jpg']
    }
  },
  {
    id: 'bat-tubular-220ah',
    title: 'Tubular Battery 220Ah',
    shortDesc: 'High-capacity tubular battery for extended backup requirements',
    description: 'Tall tubular battery with advanced technology for maximum backup time and durability in solar and inverter applications.',
    category: 'batteries',
    subcategory: 'tubular-battery',
    brand: 'Exide',
    model: 'Inva Tubular IT750',
    specifications: {
      'Capacity': '220Ah @ C20',
      'Battery Type': 'Tall Tubular',
      'Voltage': '12V DC',
      'Discharge Depth': '70%',
      'Cycle Life': '1500+ cycles',
      'Float Life': '5-7 years',
      'Dimensions': '508 x 191 x 435mm',
      'Weight': '65 kg',
      'Operating Temperature': '15°C to 45°C',
      'Terminal Type': 'Top terminals',
      'Electrolyte': 'Liquid acid',
      'Maintenance': 'Low maintenance',
      'Warranty': '60 months'
    },
    features: [
      'High backup capacity',
      'Robust tubular construction',
      'Excellent charge acceptance',
      'Superior overcharge tolerance',
      'Long service life',
      'Proven technology'
    ],
    price: '₹16,500 - ₹18,500',
    moq: '2 units',
    warranty: '5 years pro-rata warranty',
    capacity: '220Ah',
    image: '/Solar_product_sample_image.jpg',
    images: [
      '/Solar_product_sample_image.jpg',
      '/sample_solar_image.jpg'
    ],
    icon: Battery,
    rating: 4.4,
    reviews: 198,
    isPopular: false,
    isFeatured: false,
    inStock: true,
    leadTime: '2-4 days',
    certifications: ['IS 1651', 'BIS', 'ISO 9001'],
    applications: ['Home inverters', 'Solar systems', 'Industrial UPS', 'Rural electrification'],
    compatibleWith: ['All inverter types', 'Charge controllers', 'UPS systems'],
    technicalDocs: {
      datasheet: '/docs/exide-tubular-220ah-datasheet.pdf',
      manual: '/docs/exide-tubular-manual.pdf',
      certifications: '/docs/exide-tubular-certifications.pdf'
    },
    media: {
      youtubeVideoUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
      videoTitle: 'Tubular Battery Installation Guide',
      videoDescription: 'Professional installation of Exide tubular battery systems',
      productImages: ['/Solar_product_sample_image.jpg', '/sample_solar_image.jpg'],
      installationImages: ['/Solar_product_sample_image.jpg']
    }
  },
  {
    id: 'bat-commercial-100kwh',
    title: 'Commercial Battery System 100kWh',
    shortDesc: 'Large-scale commercial battery storage system',
    description: 'Modular commercial-grade battery storage system designed for large commercial and industrial applications with advanced monitoring and control.',
    category: 'batteries',
    subcategory: 'commercial-battery',
    brand: 'TATA Power Solar',
    model: 'EnerStore-100kWh',
    specifications: {
      'Capacity': '100kWh',
      'Battery Type': 'Lithium Iron Phosphate',
      'Voltage': '800V DC',
      'Discharge Depth': '95%',
      'Cycle Life': '8000+ cycles',
      'Efficiency': '95%',
      'Dimensions': '2000 x 1000 x 2200mm',
      'Weight': '1200 kg',
      'Operating Temperature': '-10°C to +50°C',
      'Enclosure': 'IP54 outdoor rated',
      'Monitoring': 'Cloud-based SCADA',
      'Communication': 'Ethernet, Modbus',
      'Safety': 'Fire suppression system'
    },
    features: [
      'Modular scalable design',
      'Advanced fire safety',
      'Remote monitoring',
      'Peak shaving capability',
      'Grid services ready',
      'Professional installation'
    ],
    price: '₹45,00,000 - ₹55,00,000',
    moq: '1 system',
    warranty: '10 years comprehensive',
    capacity: '100kWh',
    image: '/Solar_product_sample_image.jpg',
    images: [
      '/Solar_product_sample_image.jpg',
      '/sample_solar_image.jpg'
    ],
    icon: Battery,
    rating: 4.7,
    reviews: 12,
    isPopular: false,
    isFeatured: true,
    inStock: false,
    leadTime: '45-60 days',
    certifications: ['IEC 62619', 'UL 9540', 'IEEE 1547', 'CE', 'FCC'],
    applications: ['Commercial buildings', 'Industrial facilities', 'Microgrids', 'Utility services'],
    compatibleWith: ['Commercial inverters', 'Grid-tie systems', 'Energy management systems'],
    technicalDocs: {
      datasheet: '/docs/tata-commercial-100kwh-datasheet.pdf',
      manual: '/docs/tata-commercial-manual.pdf',
      certifications: '/docs/tata-commercial-certifications.pdf'
    },
    media: {
      youtubeVideoUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
      videoTitle: 'Commercial Battery System Installation',
      videoDescription: 'Large-scale installation of Tata Power commercial battery systems',
      productImages: ['/Solar_product_sample_image.jpg', '/sample_solar_image.jpg'],
      installationImages: ['/Solar_product_sample_image.jpg']
    }
  }
];
