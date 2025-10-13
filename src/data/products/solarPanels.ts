import { Zap } from 'lucide-react';
import { Product } from './types';

export const solarPanelsProducts: Product[] = [
  {
    id: 'sp-mono-550w',
    title: 'Novasys Monocrystalline Solar Panel 550W',
    shortDesc: 'High-efficiency monocrystalline solar panel with 21.5% efficiency',
    description: 'Premium monocrystalline solar panel designed for maximum energy output and long-term durability. Perfect for residential and commercial installations with limited roof space.',
    category: 'solar-panels',
    subcategory: 'monocrystalline',
    brand: 'Novasys',
    model: 'NS-550M-144-HC',
    specifications: {
      'Power Output': '550W',
      'Efficiency': '21.5%',
      'Cell Technology': 'Monocrystalline PERC',
      'Dimensions': '2274 x 1134 x 35mm',
      'Weight': '27.5 kg',
      'Voltage (Vmp)': '41.85V',
      'Current (Imp)': '13.15A',
      'Open Circuit Voltage': '49.85V',
      'Short Circuit Current': '13.95A',
      'Temperature Coefficient': '-0.35%/°C',
      'Frame': 'Anodized Aluminum',
      'Glass': 'Tempered Glass 3.2mm'
    },
    features: [
      'High module efficiency up to 21.5%',
      'Excellent weak light performance',
      'Lower temperature coefficient',
      'Better shading tolerance',
      'Reduced hotspot risk',
      'Anti-reflective coating'
    ],
    price: '₹12,500 - ₹14,000',
    moq: '20 panels',
    warranty: '25 years performance, 12 years product',
    efficiency: '21.5%',
    capacity: '550W',
    image: '/Solar_product_sample_image.jpg',
    images: [
      '/Solar_product_sample_image.jpg',
      '/sample_solar_image.jpg'
    ],
    icon: Zap,
    rating: 4.8,
    reviews: 156,
    isPopular: true,
    isFeatured: true,
    inStock: true,
    leadTime: '7-10 days',
    certifications: ['IEC 61215', 'IEC 61730', 'IS 14286', 'BIS', 'MNRE Approved'],
    applications: ['Residential rooftops', 'Commercial buildings', 'Industrial installations', 'Ground-mounted systems'],
    compatibleWith: ['MPPT charge controllers', 'Grid-tie inverters', 'Hybrid inverters'],
    technicalDocs: {
      datasheet: '/docs/novasys-550w-datasheet.pdf',
      manual: '/docs/novasys-installation-manual.pdf',
      certifications: '/docs/novasys-certifications.pdf',
      additionalDocs: [
        {
          title: 'Technical Specification Sheet',
          url: '/docs/novasys-550w-technical-specs.pdf',
          type: 'pdf'
        },
        {
          title: 'Installation Guide',
          url: '/docs/novasys-550w-installation-guide.pdf',
          type: 'pdf'
        },
        {
          title: 'Warranty Information',
          url: '/docs/novasys-warranty-terms.pdf',
          type: 'pdf'
        }
      ]
    },
    media: {
      youtubeVideoUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
      videoTitle: 'Novasys 550W Solar Panel Installation & Performance Demo',
      videoDescription: 'Complete guide on installing and testing the Novasys 550W monocrystalline solar panel. See real-world performance data and professional installation tips.',
      productImages: [
        '/Solar_product_sample_image.jpg',
        '/sample_solar_image.jpg'
      ],
      installationImages: [
        '/about_hero_section_images/About_herosection_image1.png'
      ],
      pdfs: [
        {
          name: 'Datasheet',
          filename: 'novasys-550w-datasheet.pdf',
          url: '/docs/novasys-550w-datasheet.pdf',
          type: 'datasheet'
        },
        {
          name: 'Installation Manual',
          filename: 'novasys-550w-manual.pdf',
          url: '/docs/novasys-550w-manual.pdf',
          type: 'manual'
        },
        {
          name: 'IEC Certificates',
          filename: 'novasys-550w-certificates.pdf',
          url: '/docs/novasys-550w-certificates.pdf',
          type: 'certification'
        },
        {
          name: 'Performance Test',
          filename: 'novasys-550w-performance.pdf',
          url: '/docs/novasys-550w-performance.pdf',
          type: 'specification'
        }
      ]
    }
  },
  {
    id: 'sp-poly-450w',
    title: 'Novasys Polycrystalline Solar Panel 450W',
    shortDesc: 'Cost-effective polycrystalline solar panel with reliable performance',
    description: 'Reliable and cost-effective polycrystalline solar panel suitable for large-scale installations where cost per watt is a priority.',
    category: 'solar-panels',
    subcategory: 'polycrystalline',
    brand: 'Novasys',
    model: 'NS-450P-72',
    specifications: {
      'Power Output': '450W',
      'Efficiency': '18.5%',
      'Cell Technology': 'Polycrystalline',
      'Dimensions': '2008 x 1002 x 40mm',
      'Weight': '24.5 kg',
      'Voltage (Vmp)': '37.2V',
      'Current (Imp)': '12.1A',
      'Open Circuit Voltage': '45.6V',
      'Short Circuit Current': '12.8A',
      'Temperature Coefficient': '-0.40%/°C',
      'Frame': 'Anodized Aluminum',
      'Glass': 'Tempered Glass 3.2mm'
    },
    features: [
      'Cost-effective solution',
      'Good performance in high temperature',
      'Reliable and durable',
      'Easy installation',
      'Wide temperature range operation',
      'Anti-PID treatment'
    ],
    price: '₹9,500 - ₹11,000',
    moq: '25 panels',
    warranty: '25 years performance, 10 years product',
    efficiency: '18.5%',
    capacity: '450W',
    image: '/Solar_product_sample_image.jpg',
    images: [
      '/Solar_product_sample_image.jpg',
      '/sample_solar_image.jpg'
    ],
    icon: Zap,
    rating: 4.5,
    reviews: 89,
    isPopular: false,
    isFeatured: false,
    inStock: true,
    leadTime: '5-7 days',
    certifications: ['IEC 61215', 'IEC 61730', 'IS 14286', 'BIS', 'MNRE Approved'],
    applications: ['Large commercial projects', 'Industrial installations', 'Utility-scale projects', 'Budget-conscious residential'],
    compatibleWith: ['PWM charge controllers', 'MPPT charge controllers', 'Grid-tie inverters'],
    technicalDocs: {
      datasheet: '/docs/novasys-450w-datasheet.pdf',
      manual: '/docs/novasys-installation-manual.pdf',
      certifications: '/docs/novasys-certifications.pdf',
      additionalDocs: [
        {
          title: 'Performance Report',
          url: '/docs/novasys-450w-performance.pdf',
          type: 'pdf'
        },
        {
          title: 'Mounting Instructions',
          url: '/docs/novasys-450w-mounting.pdf',
          type: 'pdf'
        }
      ]
    },
    media: {
      youtubeVideoUrl: 'https://www.youtube.com/watch?v=3JZ_D3ELwOQ',
      videoTitle: 'Novasys 450W Polycrystalline Panel Review & Testing',
      videoDescription: 'Comprehensive review of the Novasys 450W polycrystalline solar panel, including efficiency tests and cost-benefit analysis.',
      productImages: [
        '/Solar_product_sample_image.jpg',
        '/sample_solar_image.jpg'
      ],
      installationImages: [
        '/about_hero_section_images/About_herosection_image1.png'
      ],
      pdfs: [
        {
          name: 'Datasheet',
          filename: 'novasys-450w-poly-datasheet.pdf',
          url: '/docs/novasys-450w-poly-datasheet.pdf',
          type: 'datasheet'
        },
        {
          name: 'User Manual',
          filename: 'novasys-450w-poly-manual.pdf',
          url: '/docs/novasys-450w-poly-manual.pdf',
          type: 'manual'
        },
        {
          name: 'Warranties',
          filename: 'novasys-450w-poly-warranty.pdf',
          url: '/docs/novasys-450w-poly-warranty.pdf',
          type: 'other'
        }
      ]
    }
  },
  {
    id: 'sp-bifacial-600w',
    title: 'Novasys Bifacial Solar Panel 600W',
    shortDesc: 'Next-generation bifacial technology for maximum energy yield',
    description: 'Advanced bifacial solar panel that captures sunlight from both sides, delivering up to 30% more energy output compared to traditional panels.',
    category: 'solar-panels',
    subcategory: 'bifacial',
    brand: 'Novasys',
    model: 'NS-600-BF-144HC',
    specifications: {
      'Power Output': '600W (front) + up to 180W (rear)',
      'Efficiency': '22.1%',
      'Cell Technology': 'Monocrystalline PERC Bifacial',
      'Dimensions': '2384 x 1303 x 35mm',
      'Weight': '32.5 kg',
      'Voltage (Vmp)': '45.2V',
      'Current (Imp)': '13.27A',
      'Open Circuit Voltage': '53.8V',
      'Short Circuit Current': '14.12A',
      'Temperature Coefficient': '-0.34%/°C',
      'Bifaciality': '80%+',
      'Frame': 'Anodized Aluminum (Optional Frameless)',
      'Glass': 'Double Glass 2.0mm + 2.0mm'
    },
    features: [
      'Bifacial technology for extra energy',
      'Up to 30% more power generation',
      'Excellent durability with double glass',
      'Superior low light performance',
      'Reduced degradation',
      'Fire resistance Class A'
    ],
    price: '₹16,000 - ₹18,500',
    moq: '15 panels',
    warranty: '30 years performance, 15 years product',
    efficiency: '22.1%',
    capacity: '600W+',
    image: '/Solar_product_sample_image.jpg',
    images: [
      '/Solar_product_sample_image.jpg',
      '/sample_solar_image.jpg'
    ],
    icon: Zap,
    rating: 4.9,
    reviews: 67,
    isPopular: true,
    isFeatured: true,
    inStock: true,
    leadTime: '10-14 days',
    certifications: ['IEC 61215', 'IEC 61730', 'IEC 61701', 'IS 14286', 'BIS', 'MNRE Approved'],
    applications: ['Premium residential', 'Commercial rooftops', 'Ground-mounted systems', 'Floating solar'],
    compatibleWith: ['MPPT charge controllers', 'String inverters', 'Power optimizers'],
    technicalDocs: {
      datasheet: '/docs/novasys-600w-bifacial-datasheet.pdf',
      manual: '/docs/novasys-installation-manual.pdf',
      certifications: '/docs/novasys-certifications.pdf',
      additionalDocs: [
        {
          title: 'Bifacial Performance Study',
          url: '/docs/novasys-600w-bifacial-performance.pdf',
          type: 'pdf'
        },
        {
          title: 'Advanced Installation Guide',
          url: '/docs/novasys-600w-advanced-installation.pdf',
          type: 'pdf'
        },
        {
          title: 'Energy Yield Calculator',
          url: '/docs/novasys-600w-yield-calculator.pdf',
          type: 'pdf'
        }
      ]
    },
    media: {
      youtubeVideoUrl: 'https://www.youtube.com/watch?v=M7lc1UVf-VE',
      videoTitle: 'Novasys 600W Bifacial Solar Panel - Revolutionary Technology',
      videoDescription: 'Discover the power of bifacial technology with the Novasys 600W panel. See how it generates up to 30% more energy by capturing light from both sides.',
      productImages: [
        '/Solar_product_sample_image.jpg',
        '/sample_solar_image.jpg'
      ],
      installationImages: [
        '/about_hero_section_images/About_herosection_image1.png'
      ]
    }
  },
  {
    id: 'sp-flexible-100w',
    title: 'Novasys Flexible Solar Panel 100W',
    shortDesc: 'Ultra-thin flexible solar panel for curved and irregular surfaces',
    description: 'Lightweight and flexible solar panel perfect for boats, RVs, and curved installation surfaces where traditional rigid panels cannot be used.',
    category: 'solar-panels',
    subcategory: 'flexible',
    brand: 'Novasys',
    model: 'NS-100-ETFE',
    specifications: {
      'Power Output': '100W',
      'Efficiency': '19.8%',
      'Cell Technology': 'Monocrystalline',
      'Dimensions': '1020 x 540 x 2.5mm',
      'Weight': '2.1 kg',
      'Voltage (Vmp)': '18.9V',
      'Current (Imp)': '5.29A',
      'Open Circuit Voltage': '22.68V',
      'Short Circuit Current': '5.75A',
      'Temperature Coefficient': '-0.38%/°C',
      'Bend Radius': '30°',
      'Surface Material': 'ETFE',
      'Junction Box': 'IP67 Rated'
    },
    features: [
      'Ultra-lightweight design',
      'Bendable up to 30°',
      'Waterproof and durable',
      'Easy installation',
      'No frame breakage risk',
      'Marine grade materials'
    ],
    price: '₹5,500 - ₹6,500',
    moq: '10 panels',
    warranty: '10 years performance, 5 years product',
    efficiency: '19.8%',
    capacity: '100W',
    image: '/Solar_product_sample_image.jpg',
    images: [
      '/Solar_product_sample_image.jpg',
      '/sample_solar_image.jpg'
    ],
    icon: Zap,
    rating: 4.4,
    reviews: 34,
    isPopular: false,
    isFeatured: false,
    inStock: true,
    leadTime: '7-10 days',
    certifications: ['IEC 61215', 'IEC 61730', 'CE', 'RoHS'],
    applications: ['Boats and marine', 'RVs and caravans', 'Curved roofs', 'Portable systems'],
    compatibleWith: ['PWM charge controllers', 'MPPT charge controllers', 'Portable power stations'],
    technicalDocs: {
      datasheet: '/docs/novasys-flexible-100w-datasheet.pdf',
      manual: '/docs/novasys-flexible-installation-manual.pdf',
      certifications: '/docs/novasys-certifications.pdf',
      additionalDocs: [
        {
          title: 'Flexible Installation Guide',
          url: '/docs/novasys-flexible-installation.pdf',
          type: 'pdf'
        },
        {
          title: 'Marine Application Guide',
          url: '/docs/novasys-marine-guide.pdf',
          type: 'pdf'
        }
      ]
    },
    media: {
      youtubeVideoUrl: 'https://www.youtube.com/watch?v=kJQP7kiw5Fk',
      videoTitle: 'Novasys 100W Flexible Solar Panel - Perfect for Boats & RVs',
      videoDescription: 'See how the ultra-lightweight Novasys flexible solar panel can be installed on curved surfaces, boats, and RVs with ease.',
      productImages: [
        '/Solar_product_sample_image.jpg',
        '/sample_solar_image.jpg'
      ],
      installationImages: [
        '/about_hero_section_images/About_herosection_image1.png'
      ]
    }
  }
];
