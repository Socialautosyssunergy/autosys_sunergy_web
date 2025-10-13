'use client';
import React, { useState, useEffect, useMemo } from 'react';
import { useTheme } from '@/contexts/ThemeContext';
import { getThemeClasses, getThemeHover, TRANSITION_CLASSES } from '@/utils/themeUtils';
import AOS from 'aos';
import 'aos/dist/aos.css';
import '@/styles/servicesCoverage.css';
import { 
  Star,
  CheckCircle,
  ArrowRight,
  TrendingUp,
  Award,
  Clock,
  Users,
  Grid3X3,
  List,
  MapPin,
  Phone,
  Play,
  ChevronDown,
  ChevronUp,
  Shield,
  Zap,
  Target,
  Globe,
  MessageCircle
} from 'lucide-react';
import Header from '@/components/home/Header';
import Footer from '@/components/home/Footer';
import Link from 'next/link';
import { 
  userTypes, 
  getServicesByUserType, 
  sortServices,
  getServiceStats 
} from '@/data/services';

interface Service {
  id: string;
  title: string;
  shortDesc: string;
  description: string;
  category: 'residential' | 'commercial' | 'industrial' | 'maintenance';
  subcategory: string;
  features: string[];
  capacity: string;
  duration: string;
  warranty: string;
  savings: string;
  image: string;
  icon: React.ComponentType<{ className?: string }> | null;
  projects: number;
  rating: number;
  isPopular?: boolean;
  isFeatured?: boolean;
}

export default function ServicesPage() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeUserType, setActiveUserType] = useState('homeowners');
  const [sortBy, setSortBy] = useState('recommended');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('list');
  const [isLoading, setIsLoading] = useState(true);
  const [expandedFAQ, setExpandedFAQ] = useState<number | null>(null);
  const [activeVideoIndex, setActiveVideoIndex] = useState(0);
  
  const { theme, isDay, isNight } = useTheme();
  const themeClasses = getThemeClasses(theme);
  const hoverEffects = getThemeHover(theme);

  // User type specific data with multiple video testimonials
  const userTypeVideos = {
    homeowners: [
      {
        id: 1,
        url: "https://youtu.be/jyZndDfsgEk?si=p4VPWkOqFpK9fqVx",
        title: "Family Saves ₹15,000 Monthly",
        customer: "Rajesh & Priya Sharma",
        location: "Bhopal",
        system: "5kW Residential",
        thumbnail: "/api/placeholder/300/200",
        highlights: ["85% Bill Reduction", "2 Year ROI", "Zero Maintenance"]
      },
      {
        id: 2,
        url: "https://www.youtube.com/embed/dQw4w9WgXcQ",
        title: "Complete Energy Independence",
        customer: "Amit Verma",
        location: "Indore",
        system: "7kW Grid-Tied",
        thumbnail: "/api/placeholder/300/200",
        highlights: ["100% Self Sufficient", "Net Metering", "Tax Benefits"]
      },
      {
        id: 3,
        url: "https://youtu.be/zuhMEVA8GWI",
        title: "Best Investment Decision",
        customer: "Sunita Agarwal",
        location: "Jabalpur",
        system: "3kW Hybrid",
        thumbnail: "/api/placeholder/300/200",
        highlights: ["Quick Installation", "24/7 Support", "Government Subsidy"]
      },
      {
        id: 4,
        url: "https://www.youtube.com/embed/dQw4w9WgXcQ",
        title: "Smart Home Solar Integration",
        customer: "Vikash & Neha Gupta",
        location: "Gwalior",
        system: "6kW Smart Grid",
        thumbnail: "/api/placeholder/300/200",
        highlights: ["Smart Monitoring", "App Control", "Future Ready"]
      },
      {
        id: 5,
        url: "https://www.youtube.com/embed/dQw4w9WgXcQ",
        title: "Retirement Savings with Solar",
        customer: "Dr. R.K. Tiwari",
        location: "Ujjain",
        system: "4kW Residential",
        thumbnail: "/api/placeholder/300/200",
        highlights: ["Fixed Income", "Long Term Benefits", "Peace of Mind"]
      }
    ],
    'small-business': [
      {
        id: 1,
        url: "https://www.youtube.com/embed/dQw4w9WgXcQ",
        title: "Restaurant Cuts Power Bills by 90%",
        customer: "Hotel Raj Palace",
        location: "Bhopal",
        system: "15kW Commercial",
        thumbnail: "/api/placeholder/300/200",
        highlights: ["₹25,000 Monthly Savings", "1.8 Year Payback", "Green Certification"]
      },
      {
        id: 2,
        url: "https://www.youtube.com/embed/dQw4w9WgXcQ",
        title: "Manufacturing Unit Goes Solar",
        customer: "Precision Tools Ltd",
        location: "Indore",
        system: "25kW Industrial",
        thumbnail: "/api/placeholder/300/200",
        highlights: ["Reduced Operating Cost", "Carbon Neutral", "Tax Advantages"]
      },
      {
        id: 3,
        url: "https://www.youtube.com/embed/dQw4w9WgXcQ",
        title: "Retail Chain Success Story",
        customer: "Fashion Hub Stores",
        location: "Gwalior",
        system: "12kW Multi-site",
        thumbnail: "/api/placeholder/300/200",
        highlights: ["Multiple Locations", "Centralized Monitoring", "Brand Image"]
      },
      {
        id: 4,
        url: "https://www.youtube.com/embed/dQw4w9WgXcQ",
        title: "Medical Clinic Solar Success",
        customer: "HealthCare Center",
        location: "Ujjain",
        system: "8kW Medical",
        thumbnail: "/api/placeholder/300/200",
        highlights: ["Reliable Power", "Patient Comfort", "Cost Savings"]
      },
      {
        id: 5,
        url: "https://www.youtube.com/embed/dQw4w9WgXcQ",
        title: "Gym & Fitness Solar Story",
        customer: "FitZone Gym",
        location: "Sagar",
        system: "10kW Commercial",
        thumbnail: "/api/placeholder/300/200",
        highlights: ["High Power Usage", "Member Benefits", "Green Branding"]
      }
    ],
    society: [
      {
        id: 1,
        url: "https://www.youtube.com/embed/dQw4w9WgXcQ",
        title: "Society Reduces Common Area Bills",
        customer: "Green Valley Apartments",
        location: "Bhopal",
        system: "20kW Community",
        thumbnail: "/api/placeholder/300/200",
        highlights: ["Shared Benefits", "Lower Maintenance", "Property Value Boost"]
      },
      {
        id: 2,
        url: "https://www.youtube.com/embed/dQw4w9WgXcQ",
        title: "100 Families Go Solar Together",
        customer: "Royal Gardens Society",
        location: "Indore",
        system: "50kW Large Community",
        thumbnail: "/api/placeholder/300/200",
        highlights: ["Bulk Installation", "Group Financing", "Collective Savings"]
      },
      {
        id: 3,
        url: "https://www.youtube.com/embed/dQw4w9WgXcQ",
        title: "Eco-Friendly Housing Project",
        customer: "Sunrise Residency",
        location: "Jabalpur",
        system: "30kW Integrated",
        thumbnail: "/api/placeholder/300/200",
        highlights: ["Sustainable Living", "Modern Infrastructure", "Future Ready"]
      },
      {
        id: 4,
        url: "https://www.youtube.com/embed/dQw4w9WgXcQ",
        title: "Gated Community Solar",
        customer: "Elite Heights Society",
        location: "Gwalior",
        system: "35kW Premium",
        thumbnail: "/api/placeholder/300/200",
        highlights: ["Premium Housing", "Common Area Power", "Luxury Living"]
      },
      {
        id: 5,
        url: "https://www.youtube.com/embed/dQw4w9WgXcQ",
        title: "Senior Citizen Housing",
        customer: "Golden Years Society",
        location: "Ujjain",
        system: "18kW Community",
        thumbnail: "/api/placeholder/300/200",
        highlights: ["Senior Friendly", "Fixed Income Benefits", "Community Care"]
      }
    ],
    company: [
      {
        id: 1,
        url: "https://www.youtube.com/embed/dQw4w9WgXcQ",
        title: "Corporate HQ Achieves Net Zero",
        customer: "TechCorp Solutions",
        location: "Bhopal",
        system: "100kW Corporate",
        thumbnail: "/api/placeholder/300/200",
        highlights: ["CSR Goals Met", "Employee Satisfaction", "Cost Optimization"]
      },
      {
        id: 2,
        url: "https://www.youtube.com/embed/dQw4w9WgXcQ",
        title: "Banking Sector Goes Green",
        customer: "Regional Bank",
        location: "Indore",
        system: "75kW Multi-branch",
        thumbnail: "/api/placeholder/300/200",
        highlights: ["Multiple Branches", "Brand Leadership", "Regulatory Compliance"]
      },
      {
        id: 3,
        url: "https://www.youtube.com/embed/dQw4w9WgXcQ",
        title: "Educational Institution Success",
        customer: "Modern University",
        location: "Gwalior",
        system: "150kW Campus",
        thumbnail: "/api/placeholder/300/200",
        highlights: ["Campus Wide", "Student Engagement", "Research Opportunities"]
      },
      {
        id: 4,
        url: "https://www.youtube.com/embed/dQw4w9WgXcQ",
        title: "IT Company Solar Transformation",
        customer: "DevTech Solutions",
        location: "Ujjain",
        system: "80kW Tech Park",
        thumbnail: "/api/placeholder/300/200",
        highlights: ["Tech Infrastructure", "24/7 Operations", "Innovation Leader"]
      },
      {
        id: 5,
        url: "https://www.youtube.com/embed/dQw4w9WgXcQ",
        title: "Pharmaceutical Company Success",
        customer: "MediCorp Pharma",
        location: "Sagar",
        system: "120kW Medical",
        thumbnail: "/api/placeholder/300/200",
        highlights: ["Critical Operations", "Quality Standards", "Sustainability Goals"]
      }
    ],
    industrial: [
      {
        id: 1,
        url: "https://www.youtube.com/embed/dQw4w9WgXcQ",
        title: "Textile Mill Mega Installation",
        customer: "Industrial Textiles Ltd",
        location: "Indore",
        system: "500kW Industrial",
        thumbnail: "/api/placeholder/300/200",
        highlights: ["Megawatt Scale", "24/7 Operation", "Grid Integration"]
      },
      {
        id: 2,
        url: "https://www.youtube.com/embed/dQw4w9WgXcQ",
        title: "Chemical Plant Solar Success",
        customer: "ChemTech Industries",
        location: "Bhopal",
        system: "750kW Process",
        thumbnail: "/api/placeholder/300/200",
        highlights: ["Process Integration", "Safety Compliance", "Efficiency Gains"]
      },
      {
        id: 3,
        url: "https://www.youtube.com/embed/dQw4w9WgXcQ",
        title: "Steel Plant Solar Farm",
        customer: "MetalWorks Corporation",
        location: "Jabalpur",
        system: "1MW Captive",
        thumbnail: "/api/placeholder/300/200",
        highlights: ["Captive Power", "Heavy Industry", "Cost Reduction"]
      },
      {
        id: 4,
        url: "https://www.youtube.com/embed/dQw4w9WgXcQ",
        title: "Auto Manufacturing Solar",
        customer: "AutoTech Industries",
        location: "Gwalior",
        system: "600kW Assembly",
        thumbnail: "/api/placeholder/300/200",
        highlights: ["Manufacturing Line", "Automation Ready", "Export Quality"]
      },
      {
        id: 5,
        url: "https://www.youtube.com/embed/dQw4w9WgXcQ",
        title: "Food Processing Solar Success",
        customer: "FoodTech Processing",
        location: "Ujjain",
        system: "300kW Food Grade",
        thumbnail: "/api/placeholder/300/200",
        highlights: ["Food Safety", "Cold Chain", "Process Efficiency"]
      }
    ],
    agriculture: [
      {
        id: 1,
        url: "https://www.youtube.com/embed/dQw4w9WgXcQ",
        title: "Farmer Transforms with Solar Pumps",
        customer: "Krishak Cooperative",
        location: "Rural Bhopal",
        system: "10kW Solar Pumping",
        thumbnail: "/api/placeholder/300/200",
        highlights: ["Zero Pumping Cost", "90% Subsidy", "Increased Yield"]
      },
      {
        id: 2,
        url: "https://www.youtube.com/embed/dQw4w9WgXcQ",
        title: "Dairy Farm Solar Success",
        customer: "Gau Seva Dairy",
        location: "Rural Indore",
        system: "25kW Farm Solar",
        thumbnail: "/api/placeholder/300/200",
        highlights: ["Dairy Operations", "Cold Storage", "Rural Electrification"]
      },
      {
        id: 3,
        url: "https://www.youtube.com/embed/dQw4w9WgXcQ",
        title: "Agro Processing Unit",
        customer: "FarmFresh Processing",
        location: "Rural Jabalpur",
        system: "40kW Agro Solar",
        thumbnail: "/api/placeholder/300/200",
        highlights: ["Food Processing", "Value Addition", "Community Impact"]
      },
      {
        id: 4,
        url: "https://www.youtube.com/embed/dQw4w9WgXcQ",
        title: "Poultry Farm Solar Success",
        customer: "Sunrise Poultry",
        location: "Rural Gwalior",
        system: "15kW Farm Solar",
        thumbnail: "/api/placeholder/300/200",
        highlights: ["Automated Systems", "Climate Control", "Cost Reduction"]
      },
      {
        id: 5,
        url: "https://www.youtube.com/embed/dQw4w9WgXcQ",
        title: "Organic Farm Solar Story",
        customer: "Green Fields Organic",
        location: "Rural Ujjain",
        system: "20kW Organic",
        thumbnail: "/api/placeholder/300/200",
        highlights: ["Organic Certification", "Sustainable Farming", "Premium Pricing"]
      }
    ]
  };

  const userTypeStats = {
    homeowners: { installations: 2000, locations: 15, satisfaction: "98%" },
    'small-business': { installations: 680, locations: 12, satisfaction: "96%" },
    society: { installations: 420, locations: 12, satisfaction: "99%" },
    company: { installations: 185, locations: 10, satisfaction: "97%" },
    industrial: { installations: 65, locations: 4, satisfaction: "100%" },
    agriculture: { installations: 1250, locations: 10, satisfaction: "95%" }
  };

  const userTypeUniquePoints = {
    homeowners: [
      { icon: Shield, title: "25-Year Performance Warranty", desc: "Complete peace of mind with industry-leading warranty" },
      { icon: TrendingUp, title: "90% Bill Reduction", desc: "Dramatic savings on monthly electricity costs" },
      { icon: Award, title: "Government Subsidies", desc: "Help with subsidy applications and approvals" },
      { icon: Target, title: "Net Metering Benefits", desc: "Earn money by selling excess power back to grid" }
    ],
    'small-business': [
      { icon: TrendingUp, title: "Quick ROI (2-3 Years)", desc: "Fast payback period for business investments" },
      { icon: Shield, title: "Tax Benefits & Depreciation", desc: "Accelerated depreciation and tax advantages" },
      { icon: Award, title: "Green Business Certification", desc: "Enhance brand image with sustainability credentials" },
      { icon: Target, title: "Scalable Solutions", desc: "Expand system as your business grows" }
    ],
    society: [
      { icon: Users, title: "Shared Investment Model", desc: "Lower individual costs through community participation" },
      { icon: Shield, title: "Common Area Coverage", desc: "Power all society amenities with solar energy" },
      { icon: Award, title: "Property Value Increase", desc: "Enhance society value with green infrastructure" },
      { icon: Target, title: "Maintenance Coordination", desc: "Professional bulk maintenance services" }
    ],
    company: [
      { icon: Globe, title: "CSR & ESG Goals", desc: "Achieve corporate sustainability objectives" },
      { icon: TrendingUp, title: "Significant Cost Reduction", desc: "Reduce operational expenses substantially" },
      { icon: Shield, title: "Energy Security", desc: "Hedge against rising electricity tariffs" },
      { icon: Award, title: "Carbon Neutral Certification", desc: "Professional carbon footprint reduction" }
    ],
    industrial: [
      { icon: Zap, title: "Megawatt Scale Projects", desc: "Large-scale installations for heavy industries" },
      { icon: Shield, title: "Grid Integration", desc: "Seamless integration with existing infrastructure" },
      { icon: Award, title: "Process Heat Solutions", desc: "Solar thermal for industrial processes" },
      { icon: Target, title: "Captive Power Plants", desc: "Dedicated solar farms for industrial use" }
    ],
    agriculture: [
      { icon: Zap, title: "Solar Water Pumping", desc: "Zero cost irrigation with solar-powered pumps" },
      { icon: Shield, title: "Government Subsidies", desc: "Up to 90% subsidy for agricultural solar" },
      { icon: Award, title: "Crop Protection Systems", desc: "Solar fencing and protection solutions" },
      { icon: Target, title: "Rural Electrification", desc: "Complete power solutions for remote farms" }
    ]
  };

  const generalFAQs = [
    {
      question: "What is the typical payback period for solar installations?",
      answer: "The payback period varies by user type: Homeowners typically see 4-6 years, small businesses 2-3 years, and industrial installations 3-5 years. Factors include system size, local electricity rates, and available subsidies."
    },
    {
      question: "What maintenance is required for solar systems?",
      answer: "Solar systems require minimal maintenance. We recommend quarterly cleaning, annual electrical checks, and performance monitoring. Our O&M services handle all maintenance requirements professionally."
    },
    {
      question: "How much roof space is needed for solar installation?",
      answer: "Typically, 100 sq ft of roof space generates 1kW of solar power. For a typical home system of 5kW, you need about 500 sq ft of unshaded roof area."
    },
    {
      question: "What happens during power outages with grid-tied systems?",
      answer: "Standard grid-tied systems shut down during outages for safety. However, hybrid systems with battery backup continue to provide power to essential loads during outages."
    },
    {
      question: "Are there financing options available?",
      answer: "Yes, we offer multiple financing options including zero down payment plans, solar loans, lease models, and power purchase agreements (PPA) to make solar accessible for all budgets."
    },
    {
      question: "How long does installation take?",
      answer: "Installation timeline depends on system size: Residential (1-3 days), Commercial (5-15 days), Industrial (1-6 months). This includes permits, approvals, and grid connection."
    }
  ];

  useEffect(() => {
    // Initialize AOS
    AOS.init({
      duration: 800,
      once: true,
      offset: 100,
      easing: 'ease-out-cubic'
    });
    
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

  const filteredAndSortedServices = useMemo(() => {
    // Get services for the active user type
    const userTypeServices = getServicesByUserType(activeUserType);
    
    // Sort the services
    return sortServices(userTypeServices, sortBy);
  }, [sortBy, activeUserType]);

  // Get statistics
  const stats = getServiceStats();

  if (isLoading) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900">
        <div className="text-center">
          <div className="relative">
            <div className="w-16 h-16 border-3 border-blue-200 border-t-blue-500 rounded-full animate-spin mx-auto mb-4"></div>
          </div>
          <div className="text-white text-lg font-semibold mb-2">Loading Services</div>
          <div className="text-blue-300 text-sm">Preparing Solar Solutions...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="relative min-h-screen">
      {/* Blue Background - Same as Homepage */}
      <div className="fixed inset-0 z-0">
        <div className={`absolute inset-0 transition-all duration-1000 ${
          isDay 
            ? 'bg-gradient-to-br from-blue-50 to-blue-100' 
            : 'bg-gradient-to-br from-slate-900 via-blue-900 to-slate-800'
        }`} />
      </div>

      <div className="relative z-10">
        <Header isScrolled={isScrolled} nonSticky={true} />
        
        {/* Hero Section - Ultra Compact */}
        <section className="pt-4 pb-6 sm:pt-6 sm:pb-8">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <div className="text-center mb-6 sm:mb-8" data-aos="fade-up">
              <div className={`inline-block px-3 py-1 sm:px-4 sm:py-1.5 rounded-full text-xs sm:text-sm font-semibold mb-3 sm:mb-4 ${
                isDay 
                  ? 'bg-blue-100 text-blue-800 border border-blue-200' 
                  : 'bg-blue-900/50 text-blue-300 border border-blue-400/30'
              }`} data-aos="zoom-in" data-aos-delay="100">
                SOLAR SERVICES
              </div>
              
              <h1 className={`text-2xl sm:text-3xl md:text-4xl font-black mb-3 sm:mb-4 ${
                isDay ? 'text-slate-800' : 'text-white'
              }`} data-aos="fade-up" data-aos-delay="200">
                Solar Solutions for
                <span className={`block bg-gradient-to-r ${
                  isDay 
                    ? 'from-blue-600 via-blue-500 to-blue-500' 
                    : 'from-blue-400 to-cyan-400'
                } bg-clip-text text-transparent`}>
                  Every Need
                </span>
              </h1>
              
              <p className={`text-sm sm:text-base max-w-2xl mx-auto ${
                isDay ? 'text-slate-600' : 'text-slate-300'
              }`} data-aos="fade-up" data-aos-delay="300">
                Premium solar solutions with 17+ years expertise and 2000+ installations.
              </p>
            </div>

            {/* Quick Stats - Compact */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 mb-6 sm:mb-8" data-aos="fade-up" data-aos-delay="400">
              {[
                { label: 'Services', value: `${stats.totalServices}+`, icon: Grid3X3 },
                { label: 'Projects', value: `${Math.floor(stats.totalProjects/100)*10}+`, icon: Award },
                { label: 'Experience', value: '17+', icon: Clock },
                { label: 'Rating', value: `${stats.averageRating.toFixed(1)}★`, icon: Star }
              ].map((stat, index) => (
                <div key={index} className={`text-center p-3 sm:p-4 rounded-xl backdrop-blur-sm border ${
                  isDay 
                    ? 'bg-white/60 border-blue-200' 
                    : 'bg-white/10 border-white/20'
                }`} data-aos="zoom-in" data-aos-delay={`${500 + index * 100}`}>
                  <stat.icon className={`w-5 h-5 sm:w-6 sm:h-6 mx-auto mb-1 sm:mb-2 ${
                    isDay ? 'text-blue-600' : 'text-blue-400'
                  }`} />
                  <div className={`text-lg sm:text-xl font-bold ${
                    isDay ? 'text-slate-800' : 'text-white'
                  }`}>
                    {stat.value}
                  </div>
                  <div className={`text-xs sm:text-sm ${
                    isDay ? 'text-slate-600' : 'text-slate-300'
                  }`}>
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* User Type Tabs - Ultra Compact Mobile, Standard Desktop */}
        <div className="sticky top-0 z-40 bg-blue-600 border-b border-blue-700 shadow-lg">
          <div className="max-w-7xl mx-auto px-2 sm:px-4 lg:px-6">
            <div className="flex items-center h-8 sm:h-12">
              {/* User Type Tabs - Ultra Compact Mobile + Desktop */}
              <div className="flex-1 overflow-x-auto scrollbar-hide">
                <div className="flex space-x-0.5 sm:space-x-1 min-w-max">
                  {userTypes.map((userType) => (
                    <button
                      key={userType.id}
                      onClick={() => setActiveUserType(userType.id)}
                      className={`px-1 py-1 sm:px-3 sm:py-1.5 rounded-sm sm:rounded-md font-medium whitespace-nowrap transition-all duration-200 ${
                        activeUserType === userType.id
                          ? 'bg-white text-blue-600 shadow-md'
                          : 'text-white hover:bg-blue-500 hover:shadow-md'
                      }`}
                    >
                      <div className="flex items-center space-x-0.5 sm:space-x-1.5">
                        {userType.icon && <userType.icon className="w-2.5 h-2.5 sm:w-3.5 sm:h-3.5" />}
                        <span className="text-[10px] sm:text-sm font-semibold">
                          {/* Ultra compact labels for mobile */}
                          <span className="block sm:hidden">
                            {userType.id === 'homeowners' ? 'Home' :
                             userType.id === 'small-business' ? 'Business' :
                             userType.id === 'society' ? 'Society' :
                             userType.id === 'company' ? 'Corporate' :
                             userType.id === 'industrial' ? 'Industry' :
                             userType.id === 'agriculture' ? 'Agriculture' :
                             userType.label}
                          </span>
                          {/* Full labels for desktop */}
                          <span className="hidden sm:block">{userType.label}</span>
                        </span>
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              {/* View Mode Only - No Search */}
              <div className="flex items-center ml-1 sm:ml-4">
                <div className="flex bg-blue-700 rounded-sm sm:rounded-md overflow-hidden border border-blue-500">
                  <button
                    onClick={() => setViewMode('grid')}
                    className={`p-1 sm:p-2 transition-colors ${
                      viewMode === 'grid' 
                        ? 'bg-white text-blue-600' 
                        : 'text-white hover:bg-blue-500'
                    }`}
                    title="Grid View"
                  >
                    <Grid3X3 className="w-3 h-3 sm:w-4 sm:h-4" />
                  </button>
                  <button
                    onClick={() => setViewMode('list')}
                    className={`p-1 sm:p-2 transition-colors ${
                      viewMode === 'list' 
                        ? 'bg-white text-blue-600' 
                        : 'text-white hover:bg-blue-500'
                    }`}
                    title="List View"
                  >
                    <List className="w-3 h-3 sm:w-4 sm:h-4" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Services Grid/List */}
        <section className="pb-20 pt-3 sm:pt-0">
          <div className="max-w-7xl mx-auto px-6">
            {filteredAndSortedServices.length === 0 ? (
              <div className="text-center py-16" data-aos="fade-up">
                <div className={`text-6xl mb-4 ${isDay ? 'text-slate-300' : 'text-slate-600'}`}>
                  �
                </div>
                <h3 className={`text-xl font-semibold mb-2 ${
                  isDay ? 'text-slate-800' : 'text-white'
                }`}>
                  No services available
                </h3>
                <p className={`${isDay ? 'text-slate-600' : 'text-slate-300'}`}>
                  Try selecting a different user type
                </p>
              </div>
            ) : (
              <div className={viewMode === 'grid' 
                ? 'grid grid-cols-2 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-2 sm:gap-4 md:gap-6' 
                : 'space-y-2 sm:space-y-6 md:space-y-8'
              }>
                {filteredAndSortedServices.map((service, index) => (
                  viewMode === 'grid' ? (
                    // Grid View - Compact Mobile (2 per row) + Full Desktop
                    <Link
                      key={service.id}
                      href={`/services/${service.id}`}
                      className={`group relative overflow-hidden rounded-xl transition-all duration-300 hover:scale-105 ${
                        isDay 
                          ? 'bg-white/90 border border-blue-200 hover:shadow-lg' 
                          : 'bg-white/10 border border-white/20 hover:shadow-xl hover:shadow-blue-500/20'
                      } backdrop-blur-sm cursor-pointer`}
                      data-aos="fade-up"
                      data-aos-delay={`${index * 100}`}
                    >
                      {/* Popular/Featured Badge - Compact on Mobile */}
                      {(service.isPopular || service.isFeatured) && (
                        <div className={`absolute top-1 right-1 sm:top-2 sm:right-2 z-10 px-1.5 py-0.5 sm:px-2 sm:py-1 rounded-full text-xs font-bold ${
                          service.isPopular 
                            ? 'bg-green-500 text-white' 
                            : 'bg-purple-500 text-white'
                        }`}>
                          <span className="hidden sm:inline">{service.isPopular ? 'POPULAR' : 'FEATURED'}</span>
                          <span className="sm:hidden">★</span>
                        </div>
                      )}

                      {/* Image - Very Compact Mobile, Full Desktop */}
                      <div className="relative w-full h-20 sm:h-48 md:h-56 lg:aspect-video overflow-hidden rounded-t-xl">
                        <img 
                          src={service.image} 
                          alt={service.title}
                          className="w-full h-full object-cover object-center group-hover:scale-110 transition-transform duration-300"
                        />
                        <div className={`absolute inset-0 ${
                          isDay 
                            ? 'bg-gradient-to-t from-black/20 to-transparent' 
                            : 'bg-gradient-to-t from-blue-500/20 to-transparent'
                        }`}></div>
                      </div>

                      {/* Content - Mobile: Only Title + Button, Desktop: Full Content */}
                      <div className="p-2 sm:p-3 md:p-4 lg:p-6">
                        {/* Mobile View: Compact Title + Button Only */}
                        <div className="block sm:hidden">
                          <h3 className={`font-bold text-xs leading-tight mb-2 ${
                            isDay ? 'text-slate-800' : 'text-white'
                          } line-clamp-1`}>
                            {service.title}
                          </h3>
                          <button
                            className={`w-full py-1.5 rounded-lg text-xs font-semibold text-center transition-all duration-300 ${
                              isDay 
                                ? 'bg-blue-600 text-white hover:bg-blue-700' 
                                : 'bg-blue-500 text-white hover:bg-blue-600'
                            }`}
                          >
                            View Details
                          </button>
                        </div>

                        {/* Desktop View: Full Content (Hidden on Mobile) */}
                        <div className="hidden sm:block">
                          <div className="flex items-center gap-2 mb-2">
                            {service.icon && <service.icon className={`w-4 h-4 sm:w-5 sm:h-5 ${
                              isDay ? 'text-blue-600' : 'text-blue-400'
                            }`} />}
                            <h3 className={`font-bold text-sm sm:text-base ${
                              isDay ? 'text-slate-800' : 'text-white'
                            } line-clamp-2`}>
                              {service.title}
                            </h3>
                          </div>

                          {/* Description - Desktop Only */}
                          <p className={`text-xs sm:text-sm mb-3 line-clamp-2 ${
                            isDay ? 'text-slate-600' : 'text-slate-300'
                          }`}>
                            {service.shortDesc}
                          </p>

                          {/* Features Tags - Desktop Only */}
                          <div className="flex flex-wrap gap-1 sm:gap-2 mb-3">
                            {service.features.slice(0, 2).map((feature, idx) => (
                              <span key={idx} className={`px-2 py-1 rounded-full text-xs font-medium ${
                                isDay 
                                  ? 'bg-blue-100 text-blue-700' 
                                  : 'bg-blue-900/50 text-blue-300'
                              }`}>
                                {feature}
                              </span>
                            ))}
                            {service.features.length > 2 && (
                              <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                                isDay 
                                  ? 'bg-slate-100 text-slate-600' 
                                  : 'bg-slate-700 text-slate-300'
                              }`}>
                                +{service.features.length - 2}
                              </span>
                            )}
                          </div>

                          {/* Rating and Projects - Desktop Only */}
                          <div className="flex items-center justify-between mb-3">
                            <div className="flex items-center gap-1">
                              <Star className="w-3 h-3 text-yellow-400 fill-current" />
                              <span className={`text-xs font-medium ${
                                isDay ? 'text-slate-700' : 'text-slate-300'
                              }`}>
                                {service.rating}
                              </span>
                            </div>
                            <span className={`text-xs ${
                              isDay ? 'text-slate-500' : 'text-slate-400'
                            }`}>
                              {service.projects} projects
                            </span>
                          </div>

                          {/* Action Buttons - Desktop Only */}
                          <div className="flex flex-col gap-2">
                            <button 
                              onClick={(e) => e.preventDefault()}
                              className={`w-full py-2.5 sm:py-3 rounded-xl font-semibold text-center text-sm transition-all duration-300 transform hover:scale-105 hover:shadow-lg ${
                                isDay 
                                  ? 'bg-gradient-to-r from-blue-600 to-blue-700 text-white hover:from-blue-700 hover:to-blue-800 shadow-md hover:shadow-blue-500/25' 
                                  : 'bg-gradient-to-r from-blue-500 to-blue-600 text-white hover:from-blue-600 hover:to-blue-700 shadow-md hover:shadow-blue-400/25'
                              }`}>
                              Request Price
                            </button>
                            <div className={`w-full py-2.5 sm:py-3 rounded-xl font-semibold text-center text-sm transition-all duration-300 transform hover:scale-105 hover:shadow-lg ${
                              isDay 
                                ? 'bg-gradient-to-r from-slate-100 to-slate-200 text-slate-700 hover:from-slate-200 hover:to-slate-300 border border-slate-300 hover:border-slate-400 shadow-md hover:shadow-slate-300/25' 
                                : 'bg-gradient-to-r from-slate-700 to-slate-800 text-slate-200 hover:from-slate-600 hover:to-slate-700 border border-slate-600 hover:border-slate-500 shadow-md hover:shadow-slate-500/25'
                            }`}>
                              View Details
                            </div>
                          </div>
                        </div>
                      </div>
                    </Link>
                  ) : (
                    // Compact List View - Mobile Optimized for Short Height
                    <div
                      key={service.id}
                      className={`group relative overflow-hidden transition-all duration-300 ${
                        isDay 
                          ? 'bg-gradient-to-r from-white via-white to-blue-50/30 border border-blue-200/60 hover:border-blue-400 hover:shadow-lg' 
                          : 'bg-gradient-to-r from-slate-900/80 via-slate-800/80 to-blue-900/40 border border-slate-600/50 hover:border-blue-400/80 hover:shadow-lg'
                      } backdrop-blur-sm rounded-xl shadow-md hover:shadow-xl`}
                      data-aos="fade-left" 
                      data-aos-delay={`${index * 100}`}
                    >
                        {/* Mobile: Larger Card Layout, Desktop: Standard Layout */}
                        <div className="flex flex-row sm:flex-row items-center gap-4 sm:gap-6 p-4 sm:p-6">
                        
                        {/* Service Image - Larger Mobile, Standard Desktop */}
                        <div className="relative w-28 h-24 sm:w-64 sm:h-40 flex-shrink-0 overflow-hidden rounded-lg sm:rounded-xl">
                          <img 
                            src={service.image} 
                            alt={service.title}
                            className="w-full h-full object-cover object-center group-hover:scale-105 transition-all duration-300"
                          />
                          {/* Compact Badge for Mobile */}
                          {(service.isPopular || service.isFeatured) && (
                            <div className={`absolute -top-1 -right-1 sm:top-2 sm:right-2 w-3 h-3 sm:w-auto sm:h-auto sm:px-2 sm:py-1 rounded-full sm:rounded-lg ${
                              service.isPopular 
                                ? 'bg-green-500' 
                                : 'bg-purple-500'
                            }`}>
                              <span className="hidden sm:block text-xs font-bold text-white">
                                {service.isPopular ? 'POPULAR' : 'FEATURED'}
                              </span>
                            </div>
                          )}
                        </div>

                        {/* Service Details - Compact Mobile Layout */}
                        <div className="flex-1 min-w-0">
                          {/* Header - Compact for Mobile */}
                          <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-1 sm:gap-4">
                            <div className="flex-1 min-w-0">
                              {/* Title and Category - Larger Mobile Text */}
                              <div className="flex items-center gap-2 mb-1.5 sm:mb-2">
                                {service.icon && (
                                  <service.icon className={`w-4 h-4 sm:w-4 sm:h-4 flex-shrink-0 ${
                                    isDay ? 'text-blue-600' : 'text-blue-400'
                                  }`} />
                                )}
                                <h3 className={`font-bold text-base sm:text-lg leading-tight truncate ${
                                  isDay ? 'text-slate-800' : 'text-white'
                                }`}>
                                  {service.title}
                                </h3>
                              </div>
                              
                              {/* Description - Hidden on Mobile, Shown on Desktop */}
                              <p className={`hidden sm:block text-sm leading-relaxed line-clamp-1 ${
                                isDay ? 'text-slate-600' : 'text-slate-300'
                              }`}>
                                {service.shortDesc}
                              </p>

                              {/* Mobile Metrics Row - Larger spacing */}
                              <div className="flex items-center gap-3 sm:hidden mt-1">
                                {/* Rating */}
                                <div className="flex items-center gap-1">
                                  <Star className="w-3.5 h-3.5 text-yellow-400 fill-current" />
                                  <span className={`text-sm font-medium ${
                                    isDay ? 'text-slate-700' : 'text-slate-300'
                                  }`}>
                                    {service.rating}
                                  </span>
                                </div>
                                
                                {/* Capacity */}
                                <span className={`text-sm ${
                                  isDay ? 'text-slate-600' : 'text-slate-400'
                                }`}>
                                  •
                                </span>
                                <span className={`text-sm ${
                                  isDay ? 'text-slate-600' : 'text-slate-400'
                                }`}>
                                  {service.capacity}
                                </span>
                              </div>
                            </div>
                            
                            {/* Action Buttons - Larger Mobile, Standard Desktop */}
                            <div className="flex flex-row sm:flex-col gap-2 sm:gap-2 sm:min-w-[120px] mt-2 sm:mt-0">
                              <button className={`flex-1 sm:w-full px-3 py-2 sm:px-3 sm:py-2.5 rounded-lg sm:rounded-xl text-sm sm:text-sm font-semibold transition-all duration-300 ${
                                isDay 
                                  ? 'bg-blue-600 text-white hover:bg-blue-700' 
                                  : 'bg-blue-500 text-white hover:bg-blue-600'
                              }`}>
                                <span className="sm:hidden">Price</span>
                                <span className="hidden sm:inline">Request Price</span>
                              </button>
                              <Link 
                                href={`/services/${service.id}`}
                                className={`flex-1 sm:w-full px-3 py-2 sm:px-3 sm:py-2.5 rounded-lg sm:rounded-xl text-sm sm:text-sm font-semibold transition-all duration-300 text-center ${
                                  isDay 
                                    ? 'bg-slate-100 text-slate-700 hover:bg-slate-200 border border-slate-300' 
                                    : 'bg-slate-700 text-slate-200 hover:bg-slate-600 border border-slate-600'
                                }`}
                              >
                                <span className="sm:hidden">Details</span>
                                <span className="hidden sm:inline">View Details</span>
                              </Link>
                            </div>
                          </div>

                          {/* Desktop Features and Metrics (Hidden on Mobile) */}
                          <div className="hidden sm:block space-y-3 mt-3">
                            {/* Key Features */}
                            <div className="flex flex-wrap gap-2">
                              {service.features.slice(0, 3).map((feature, idx) => (
                                <span key={idx} className={`px-2 py-1 rounded-full text-xs font-medium ${
                                  isDay 
                                    ? 'bg-blue-100 text-blue-700' 
                                    : 'bg-blue-900/50 text-blue-300'
                                }`}>
                                  {feature}
                                </span>
                              ))}
                              {service.features.length > 3 && (
                                <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                                  isDay 
                                    ? 'bg-slate-100 text-slate-600' 
                                    : 'bg-slate-700 text-slate-300'
                                }`}>
                                  +{service.features.length - 3} more
                                </span>
                              )}
                            </div>

                            {/* Desktop Metrics */}
                            <div className="flex items-center justify-between">
                              <div className="flex items-center gap-4">
                                {/* Rating */}
                                <div className="flex items-center gap-1">
                                  <Star className="w-4 h-4 text-yellow-500 fill-current" />
                                  <span className={`text-sm font-semibold ${
                                    isDay ? 'text-slate-700' : 'text-slate-300'
                                  }`}>
                                    {service.rating}
                                  </span>
                                  <span className={`text-sm ${
                                    isDay ? 'text-slate-500' : 'text-slate-400'
                                  }`}>
                                    ({service.projects} projects)
                                  </span>
                                </div>

                                {/* Warranty */}
                                <div className="flex items-center gap-1">
                                  <Shield className="w-4 h-4 text-green-500" />
                                  <span className={`text-sm ${
                                    isDay ? 'text-slate-600' : 'text-slate-400'
                                  }`}>
                                    {service.warranty}
                                  </span>
                                </div>
                              </div>

                              {/* Status Badge */}
                              <div className={`px-3 py-1 rounded-lg text-xs font-semibold ${
                                isDay 
                                  ? 'bg-green-100 text-green-700 border border-green-200' 
                                  : 'bg-green-900/50 text-green-300 border border-green-700/50'
                              }`}>
                                Available
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  )
                ))}
              </div>
            )}
          </div>
        </section>



        {/* Premium Multiple Video Testimonials Section */}
        <section className="py-20 relative overflow-hidden">
          {/* Advanced Background */}
          <div className={`absolute inset-0 ${
            isDay 
              ? 'bg-gradient-to-br from-white via-amber-50/30 to-blue-50/50' 
              : 'bg-gradient-to-br from-slate-900 via-blue-900/50 to-slate-800'
          }`}>
            <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
            {/* Dynamic Floating Elements */}
            <div className={`absolute top-20 left-10 w-72 h-72 ${
              isDay ? 'bg-blue-200/20' : 'bg-blue-400/10'
            } rounded-full blur-3xl animate-pulse`}></div>
            <div className={`absolute bottom-20 right-10 w-96 h-96 ${
              isDay ? 'bg-orange-200/15' : 'bg-cyan-400/10'
            } rounded-full blur-3xl animate-pulse`} style={{ animationDelay: '2s' }}></div>
            <div className={`absolute top-1/2 left-1/2 w-64 h-64 ${
              isDay ? 'bg-red-200/10' : 'bg-purple-400/10'
            } rounded-full blur-3xl animate-pulse`} style={{ animationDelay: '4s' }}></div>
          </div>

          <div className="max-w-7xl mx-auto px-6 relative z-10">
            {/* Compact Section Header */}
            <div className="text-center mb-8">
              <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-full mb-4 ${
                isDay 
                  ? 'bg-blue-100 text-blue-800 border border-blue-200/50' 
                  : 'bg-blue-900/30 text-blue-300 border border-blue-400/30'
              } backdrop-blur-sm`}>
                <Play className="w-4 h-4" />
                <span className="font-semibold text-sm">REAL SUCCESS STORIES</span>
                <Play className="w-4 h-4" />
              </div>
              
              <h2 className={`text-2xl md:text-3xl font-bold mb-4 ${
                isDay ? 'text-slate-800' : 'text-white'
              }`}>
                Customer Success Stories
              </h2>
              
              <p className={`text-base max-w-2xl mx-auto ${
                isDay ? 'text-slate-600' : 'text-slate-300'
              }`}>
                Real stories from {userTypes.find(ut => ut.id === activeUserType)?.label.toLowerCase()} who transformed with solar
              </p>
            </div>

            {/* Mobile Layout - Compact & Organized */}
            <div className="block lg:hidden mb-6">
              {/* Main Video - Mobile Compact */}
              <div className={`relative rounded-xl overflow-hidden shadow-lg mb-4 ${
                isDay ? 'bg-white/90 border border-blue-200/50' : 'bg-white/10 border border-white/20'
              } backdrop-blur-sm`}>
                
                {/* Video Player - Smaller aspect ratio for mobile */}
                <div className="aspect-[16/10] relative">
                  <iframe
                    src={userTypeVideos[activeUserType as keyof typeof userTypeVideos][activeVideoIndex]?.url}
                    title="Customer Success Story"
                    className="w-full h-full"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  ></iframe>
                  
                  {/* Video Navigation */}
                  <div className="absolute top-2 right-2 flex gap-1">
                    <button 
                      onClick={() => setActiveVideoIndex(prev => prev > 0 ? prev - 1 : userTypeVideos[activeUserType as keyof typeof userTypeVideos].length - 1)}
                      className={`p-1.5 rounded-full ${
                        isDay ? 'bg-white/90 text-slate-700 hover:bg-white' : 'bg-white/20 text-white hover:bg-white/30'
                      } backdrop-blur-sm transition-all duration-300`}
                    >
                      <ArrowRight className="w-3 h-3 rotate-180" />
                    </button>
                    <button 
                      onClick={() => setActiveVideoIndex(prev => prev < userTypeVideos[activeUserType as keyof typeof userTypeVideos].length - 1 ? prev + 1 : 0)}
                      className={`p-1.5 rounded-full ${
                        isDay ? 'bg-white/90 text-slate-700 hover:bg-white' : 'bg-white/20 text-white hover:bg-white/30'
                      } backdrop-blur-sm transition-all duration-300`}
                    >
                      <ArrowRight className="w-3 h-3" />
                    </button>
                  </div>
                </div>

                {/* Video Details - Compact */}
                <div className={`p-3 ${
                  isDay ? 'bg-white/95' : 'bg-slate-900/95'
                } backdrop-blur-sm`}>
                  <div className="flex flex-col gap-2">
                    <div>
                      <h3 className={`text-base font-bold mb-1 ${
                        isDay ? 'text-slate-800' : 'text-white'
                      }`}>
                        {userTypeVideos[activeUserType as keyof typeof userTypeVideos][activeVideoIndex]?.title}
                      </h3>
                      <div className="flex items-center gap-2 text-sm">
                        <span className={`${isDay ? 'text-slate-600' : 'text-slate-300'}`}>
                          {userTypeVideos[activeUserType as keyof typeof userTypeVideos][activeVideoIndex]?.customer}
                        </span>
                        <span className={`px-2 py-1 rounded-full text-xs ${
                          isDay ? 'bg-green-100 text-green-700' : 'bg-green-900/50 text-green-300'
                        }`}>
                          {userTypeVideos[activeUserType as keyof typeof userTypeVideos][activeVideoIndex]?.system}
                        </span>
                      </div>
                    </div>
                    <div className="flex flex-wrap gap-1">
                      {userTypeVideos[activeUserType as keyof typeof userTypeVideos][activeVideoIndex]?.highlights.slice(0, 2).map((highlight, idx) => (
                        <div key={idx} className={`text-xs px-2 py-1 rounded-full ${
                          isDay ? 'bg-blue-100 text-blue-700' : 'bg-blue-900/50 text-blue-300'
                        }`}>
                          {highlight}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* More Success Stories - Mobile Horizontal Swipe */}
              <div className={`relative rounded-xl overflow-hidden shadow-lg ${
                isDay ? 'bg-white/90 border border-blue-200/50' : 'bg-white/10 border border-white/20'
              } backdrop-blur-sm`}>
                
                {/* Header Section - Compact */}
                <div className={`p-2 border-b ${
                  isDay ? 'border-blue-100 bg-white/95' : 'border-white/10 bg-slate-900/95'
                } backdrop-blur-sm`}>
                  <div className="flex justify-between items-center">
                    <div>
                      <h4 className={`text-xs font-bold ${
                        isDay ? 'text-slate-800' : 'text-white'
                      }`}>
                        More Success Stories
                      </h4>
                      <p className={`text-xs ${
                        isDay ? 'text-slate-600' : 'text-slate-400'
                      }`}>
                        Swipe to view more
                      </p>
                    </div>
                    <div className={`text-xs px-1.5 py-0.5 rounded-full ${
                      isDay ? 'bg-blue-100 text-blue-700' : 'bg-blue-900/50 text-blue-300'
                    }`}>
                      {userTypeVideos[activeUserType as keyof typeof userTypeVideos].length}
                    </div>
                  </div>
                </div>

                {/* Horizontal Scrollable Video Cards */}
                <div className="overflow-x-auto scrollbar-hide">
                  <div className="flex gap-2 p-2" style={{ width: 'max-content' }}>
                    {userTypeVideos[activeUserType as keyof typeof userTypeVideos].map((video, index) => (
                      <div 
                        key={video.id}
                        onClick={() => setActiveVideoIndex(index)}
                        className={`cursor-pointer rounded-lg overflow-hidden transition-all duration-300 flex-shrink-0 w-40 ${
                          activeVideoIndex === index
                            ? isDay 
                              ? 'ring-2 ring-blue-400 shadow-md bg-blue-50/80 scale-105' 
                              : 'ring-2 ring-blue-400 shadow-md bg-blue-900/30 scale-105'
                            : 'hover:scale-[1.02] hover:shadow-sm'
                        } ${
                          isDay ? 'bg-white/80 border border-slate-200/80' : 'bg-white/5 border border-white/10'
                        } backdrop-blur-sm`}
                      >
                        {/* Larger YouTube Preview Thumbnail */}
                        <div className="relative w-full h-20 overflow-hidden">
                          {/* YouTube Thumbnail with proper URL */}
                          <img 
                            src={`https://img.youtube.com/vi/${video.url.split('/').pop()?.split('?')[0] || 'dQw4w9WgXcQ'}/mqdefault.jpg`}
                            alt={video.title}
                            className="w-full h-full object-cover"
                            onError={(e) => {
                              // Fallback to default thumbnail if YouTube thumbnail fails
                              e.currentTarget.src = video.thumbnail;
                            }}
                          />
                          <div className="absolute inset-0 flex items-center justify-center bg-black/20">
                            <div className={`w-8 h-8 rounded-full ${
                              isDay ? 'bg-red-600' : 'bg-red-600'
                            } flex items-center justify-center shadow-lg transition-transform duration-300 hover:scale-110`}>
                              <Play className="w-4 h-4 text-white ml-0.5" />
                            </div>
                          </div>
                          {activeVideoIndex === index && (
                            <div className="absolute top-0 left-0 w-full h-full bg-blue-500/25 border-2 border-blue-400"></div>
                          )}
                          {/* Video Number Badge */}
                          <div className={`absolute top-0.5 left-0.5 w-4 h-4 rounded-full text-xs font-bold flex items-center justify-center ${
                            isDay ? 'bg-slate-800 text-white' : 'bg-white text-slate-800'
                          }`}>
                            {index + 1}
                          </div>
                        </div>

                        {/* Compact Video Info - Smaller Text, No Owner Name */}
                        <div className="p-1">
                          <h5 className={`font-bold text-xs mb-0.5 line-clamp-2 leading-tight ${
                            isDay ? 'text-slate-800' : 'text-white'
                          }`}>
                            {video.title}
                          </h5>
                          <div className="flex gap-0.5 mb-0.5">
                            <div className={`text-xs px-0.5 py-0.5 rounded text-center flex-1 ${
                              isDay ? 'bg-green-100 text-green-700' : 'bg-green-900/50 text-green-300'
                            }`}>
                              {video.system}
                            </div>
                          </div>
                          <div className={`text-xs ${
                            isDay ? 'text-slate-500' : 'text-slate-400'
                          }`}>
                            {video.location}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Desktop Layout - Original */}
            <div className="hidden lg:grid lg:grid-cols-3 gap-6 mb-8">
              {/* Main Video - Left Side */}
              <div className="lg:col-span-2">
                <div className={`relative rounded-xl overflow-hidden shadow-lg ${
                  isDay ? 'bg-white/90 border border-blue-200/50' : 'bg-white/10 border border-white/20'
                } backdrop-blur-sm`}>
                  
                  {/* Video Player */}
                  <div className="aspect-video relative">
                    <iframe
                      src={userTypeVideos[activeUserType as keyof typeof userTypeVideos][activeVideoIndex]?.url}
                      title="Customer Success Story"
                      className="w-full h-full"
                      frameBorder="0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    ></iframe>
                    
                    {/* Video Navigation */}
                    <div className="absolute top-2 right-2 flex gap-1">
                      <button 
                        onClick={() => setActiveVideoIndex(prev => prev > 0 ? prev - 1 : userTypeVideos[activeUserType as keyof typeof userTypeVideos].length - 1)}
                        className={`p-1.5 rounded-full ${
                          isDay ? 'bg-white/90 text-slate-700 hover:bg-white' : 'bg-white/20 text-white hover:bg-white/30'
                        } backdrop-blur-sm transition-all duration-300`}
                      >
                        <ArrowRight className="w-3 h-3 rotate-180" />
                      </button>
                      <button 
                        onClick={() => setActiveVideoIndex(prev => prev < userTypeVideos[activeUserType as keyof typeof userTypeVideos].length - 1 ? prev + 1 : 0)}
                        className={`p-1.5 rounded-full ${
                          isDay ? 'bg-white/90 text-slate-700 hover:bg-white' : 'bg-white/20 text-white hover:bg-white/30'
                        } backdrop-blur-sm transition-all duration-300`}
                      >
                        <ArrowRight className="w-3 h-3" />
                      </button>
                    </div>
                  </div>

                  {/* Video Details Row Below */}
                  <div className={`p-4 ${
                    isDay ? 'bg-white/95' : 'bg-slate-900/95'
                  } backdrop-blur-sm`}>
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className={`text-lg font-bold mb-1 ${
                          isDay ? 'text-slate-800' : 'text-white'
                        }`}>
                          {userTypeVideos[activeUserType as keyof typeof userTypeVideos][activeVideoIndex]?.title}
                        </h3>
                        <div className="flex items-center gap-2 text-sm">
                          <span className={`${isDay ? 'text-slate-600' : 'text-slate-300'}`}>
                            {userTypeVideos[activeUserType as keyof typeof userTypeVideos][activeVideoIndex]?.customer}
                          </span>
                          <span className={`px-2 py-1 rounded-full text-xs ${
                            isDay ? 'bg-green-100 text-green-700' : 'bg-green-900/50 text-green-300'
                          }`}>
                            {userTypeVideos[activeUserType as keyof typeof userTypeVideos][activeVideoIndex]?.system}
                          </span>
                        </div>
                      </div>
                      <div className="flex flex-wrap gap-1">
                        {userTypeVideos[activeUserType as keyof typeof userTypeVideos][activeVideoIndex]?.highlights.slice(0, 2).map((highlight, idx) => (
                          <div key={idx} className={`text-xs px-2 py-1 rounded-full ${
                            isDay ? 'bg-blue-100 text-blue-700' : 'bg-blue-900/50 text-blue-300'
                          }`}>
                            {highlight}
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Video Thumbnails - Right Side */}
              <div className={`relative rounded-xl overflow-hidden shadow-lg ${
                isDay ? 'bg-white/90 border border-blue-200/50' : 'bg-white/10 border border-white/20'
              } backdrop-blur-sm h-fit`}>
                
                {/* Header Section */}
                <div className={`p-4 border-b ${
                  isDay ? 'border-blue-100 bg-white/95' : 'border-white/10 bg-slate-900/95'
                } backdrop-blur-sm`}>
                  <h4 className={`text-base font-bold ${
                    isDay ? 'text-slate-800' : 'text-white'
                  }`}>
                    More Success Stories 
                  </h4>
                  <p className={`text-xs mt-1 ${
                    isDay ? 'text-slate-600' : 'text-slate-400'
                  }`}>
                    Click to view different customer experiences
                  </p>
                </div>

                {/* Scrollable Video List */}
                <div className="max-h-105 overflow-y-auto scrollbar-thin scrollbar-thumb-blue-400 scrollbar-track-transparent hover:scrollbar-thumb-blue-500">
                  <div className="space-y-2 p-3">
                    {userTypeVideos[activeUserType as keyof typeof userTypeVideos].map((video, index) => (
                      <div 
                        key={video.id}
                        onClick={() => setActiveVideoIndex(index)}
                        className={`cursor-pointer rounded-lg overflow-hidden transition-all duration-300 ${
                          activeVideoIndex === index
                            ? isDay 
                              ? 'ring-2 ring-blue-400 shadow-md bg-blue-50/80' 
                              : 'ring-2 ring-blue-400 shadow-md bg-blue-900/30'
                            : 'hover:scale-[1.02] hover:shadow-sm'
                        } ${
                          isDay ? 'bg-white/80 border border-slate-200/80' : 'bg-white/5 border border-white/10'
                        } backdrop-blur-sm`}
                      >
                        <div className="flex gap-3 p-3">
                          {/* Enhanced Thumbnail */}
                          <div className="relative w-24 h-16 flex-shrink-0 rounded-md overflow-hidden">
                            <img 
                              src={video.thumbnail}
                              alt={video.title}
                              className="w-full h-full object-cover"
                            />
                            <div className="absolute inset-0 flex items-center justify-center">
                              <div className={`w-8 h-8 rounded-full ${
                                isDay ? 'bg-blue-500' : 'bg-blue-500'
                              } flex items-center justify-center shadow-lg transition-transform duration-300 hover:scale-110`}>
                                <Play className="w-4 h-4 text-white ml-0.5" />
                              </div>
                            </div>
                            {activeVideoIndex === index && (
                              <div className="absolute top-0 left-0 w-full h-full bg-blue-500/25 border-2 border-blue-400 rounded-md"></div>
                            )}
                            {/* Video Number Badge */}
                            <div className={`absolute top-1 left-1 w-5 h-5 rounded-full text-xs font-bold flex items-center justify-center ${
                              isDay ? 'bg-slate-800 text-white' : 'bg-white text-slate-800'
                            }`}>
                              {index + 1}
                            </div>
                          </div>

                          {/* Enhanced Video Info */}
                          <div className="flex-1 min-w-0">
                            <h5 className={`font-bold text-sm mb-1 line-clamp-2 leading-tight ${
                              isDay ? 'text-slate-800' : 'text-white'
                            }`}>
                              {video.title}
                            </h5>
                            <p className={`text-xs mb-2 font-medium ${
                              isDay ? 'text-slate-600' : 'text-slate-300'
                            }`}>
                              {video.customer}
                            </p>
                            <div className="flex flex-wrap gap-1">
                              <div className={`text-xs px-2 py-0.5 rounded-full font-semibold ${
                                isDay ? 'bg-green-100 text-green-700' : 'bg-green-900/50 text-green-300'
                              }`}>
                                {video.location}
                              </div>
                              <div className={`text-xs px-2 py-0.5 rounded-full font-semibold ${
                                isDay ? 'bg-blue-100 text-blue-700' : 'bg-blue-900/50 text-blue-300'
                              }`}>
                                {video.system}
                              </div>
                            </div>
                            {/* Highlights Preview */}
                            <div className="mt-1">
                              <div className={`text-xs ${
                                isDay ? 'text-amber-600' : 'text-amber-400'
                              }`}>
                                ⭐ {video.highlights[0]}
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Footer Section */}
                <div className={`p-3 border-t text-center ${
                  isDay ? 'border-blue-100 bg-white/95' : 'border-white/10 bg-slate-900/95'
                } backdrop-blur-sm`}>
                  <div className={`text-xs ${
                    isDay ? 'text-slate-600' : 'text-slate-400'
                  }`}>
                    {userTypeVideos[activeUserType as keyof typeof userTypeVideos].length} Success Stories Available
                  </div>
                </div>
              </div>
            </div>

            {/* Call to Action */}
            <div className="text-center">
              <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-lg ${
                isDay ? 'bg-blue-500 hover:bg-blue-600' : 'bg-blue-500 hover:bg-blue-600'
              } text-white font-semibold text-sm transition-all duration-300 hover:scale-105 cursor-pointer`}>
                <Play className="w-4 h-4" />
                <span>Share Your Story</span>
              </div>
            </div>
          </div>
        </section>

        {/* Compact Service Coverage - India and Worldwide */}
        <section className="py-8 sm:py-16 relative">
          {/* Premium Background */}
          <div className={`absolute inset-0 ${
            isDay 
              ? 'bg-gradient-to-br from-slate-50 via-white to-amber-50/30' 
              : 'bg-gradient-to-br from-slate-900 via-slate-800 to-blue-900/50'
          }`}>
            <div className="absolute inset-0 bg-dot-pattern opacity-5"></div>
          </div>

          <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
            {/* Section Header - Compact for Mobile */}
            <div className="text-center mb-6 sm:mb-10">
              <div className={`inline-flex items-center gap-2 px-3 py-1.5 sm:px-4 sm:py-2 rounded-full mb-3 sm:mb-4 ${
                isDay 
                  ? 'bg-green-100/80 text-green-800 border border-green-200/50' 
                  : 'bg-green-900/30 text-green-300 border border-green-400/30'
              } backdrop-blur-sm`}>
                <MapPin className="w-3 h-3 sm:w-4 sm:h-4" />
                <span className="font-semibold text-xs sm:text-sm">INDIA AND WORLDWIDE COVERAGE</span>
              </div>
              
              <h2 className={`text-xl sm:text-2xl md:text-3xl font-bold mb-3 sm:mb-4 ${
                isDay ? 'text-slate-800' : 'text-white'
              }`}>
                Nationwide Service Coverage
                <span className={`block bg-gradient-to-r ${
                  isDay ? 'from-green-600 to-blue-600' : 'from-green-400 to-blue-400'
                } bg-clip-text text-transparent`}>
                  for {userTypes.find(ut => ut.id === activeUserType)?.label}
                </span>
              </h2>
              
              <p className={`text-sm sm:text-base max-w-2xl mx-auto ${
                isDay ? 'text-slate-600' : 'text-slate-300'
              }`}>
                Professional solar installations across India with international service capabilities
              </p>
            </div>

            {/* Mobile Compact Horizontal Row + Desktop Grid */}
            <div className="block sm:hidden mb-6">
              {/* Mobile: Horizontal Scroll Row */}
              <div className="overflow-x-auto scrollbar-hide pb-2">
                <div className="flex gap-3 min-w-max px-2">
                  {/* Coverage Stats - Mobile */}
                  <div className={`flex-shrink-0 w-28 p-3 rounded-lg text-center ${
                    isDay ? 'bg-gradient-to-br from-green-50 to-emerald-50 border border-green-200/50 shadow-sm' : 'bg-gradient-to-br from-green-900/20 to-emerald-900/20 border border-green-400/30 shadow-sm'
                  } backdrop-blur-sm`}>
                    <div className={`w-8 h-8 mx-auto mb-2 rounded-full flex items-center justify-center ${
                      isDay ? 'bg-green-500' : 'bg-green-600'
                    }`}>
                      <MapPin className="w-4 h-4 text-white" />
                    </div>
                    <h3 className={`text-lg font-bold mb-1 ${
                      isDay ? 'text-green-700' : 'text-green-300'
                    }`}>
                      {userTypeStats[activeUserType as keyof typeof userTypeStats].locations}+
                    </h3>
                    <p className={`font-semibold text-xs ${
                      isDay ? 'text-slate-700' : 'text-slate-300'
                    }`}>
                      Cities
                    </p>
                  </div>

                  {/* Installation Count - Mobile */}
                  <div className={`flex-shrink-0 w-28 p-3 rounded-lg text-center ${
                    isDay ? 'bg-gradient-to-br from-blue-50 to-cyan-50 border border-blue-200/50 shadow-sm' : 'bg-gradient-to-br from-blue-900/20 to-cyan-900/20 border border-blue-400/30 shadow-sm'
                  } backdrop-blur-sm`}>
                    <div className={`w-8 h-8 mx-auto mb-2 rounded-full flex items-center justify-center ${
                      isDay ? 'bg-blue-500' : 'bg-blue-600'
                    }`}>
                      <Award className="w-4 h-4 text-white" />
                    </div>
                    <h3 className={`text-lg font-bold mb-1 ${
                      isDay ? 'text-blue-700' : 'text-blue-300'
                    }`}>
                      {userTypeStats[activeUserType as keyof typeof userTypeStats].installations}+
                    </h3>
                    <p className={`font-semibold text-xs ${
                      isDay ? 'text-slate-700' : 'text-slate-300'
                    }`}>
                      Projects
                    </p>
                  </div>

                  {/* Customer Satisfaction - Mobile */}
                  <div className={`flex-shrink-0 w-28 p-3 rounded-lg text-center ${
                    isDay ? 'bg-gradient-to-br from-purple-50 to-violet-50 border border-purple-200/50 shadow-sm' : 'bg-gradient-to-br from-purple-900/20 to-violet-900/20 border border-purple-400/30 shadow-sm'
                  } backdrop-blur-sm`}>
                    <div className={`w-8 h-8 mx-auto mb-2 rounded-full flex items-center justify-center ${
                      isDay ? 'bg-purple-500' : 'bg-purple-600'
                    }`}>
                      <CheckCircle className="w-4 h-4 text-white" />
                    </div>
                    <h3 className={`text-lg font-bold mb-1 ${
                      isDay ? 'text-purple-700' : 'text-purple-300'
                    }`}>
                      {userTypeStats[activeUserType as keyof typeof userTypeStats].satisfaction}
                    </h3>
                    <p className={`font-semibold text-xs ${
                      isDay ? 'text-slate-700' : 'text-slate-300'
                    }`}>
                      Rating
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Desktop: Original Grid Layout (Hidden on Mobile) */}
            <div className="hidden sm:grid md:grid-cols-3 gap-6 mb-10">
              {/* Coverage Stats */}
              <div className={`p-6 rounded-xl text-center ${
                isDay ? 'bg-gradient-to-br from-green-50 to-emerald-50 border border-green-200/50 shadow-md' : 'bg-gradient-to-br from-green-900/20 to-emerald-900/20 border border-green-400/30 shadow-md'
              } backdrop-blur-sm`}>
                <div className={`w-12 h-12 mx-auto mb-3 rounded-full flex items-center justify-center ${
                  isDay ? 'bg-green-500' : 'bg-green-600'
                }`}>
                  <MapPin className="w-6 h-6 text-white" />
                </div>
                <h3 className={`text-3xl font-bold mb-2 ${
                  isDay ? 'text-green-700' : 'text-green-300'
                }`}>
                  {userTypeStats[activeUserType as keyof typeof userTypeStats].locations}+
                </h3>
                <p className={`font-semibold text-sm ${
                  isDay ? 'text-slate-700' : 'text-slate-300'
                }`}>
                  Cities Served
                </p>
                <p className={`text-xs mt-1 ${
                  isDay ? 'text-slate-600' : 'text-slate-400'
                }`}>
                  Pan-India Coverage
                </p>
              </div>

              {/* Installation Count */}
              <div className={`p-6 rounded-xl text-center ${
                isDay ? 'bg-gradient-to-br from-blue-50 to-cyan-50 border border-blue-200/50 shadow-md' : 'bg-gradient-to-br from-blue-900/20 to-cyan-900/20 border border-blue-400/30 shadow-md'
              } backdrop-blur-sm`}>
                <div className={`w-12 h-12 mx-auto mb-3 rounded-full flex items-center justify-center ${
                  isDay ? 'bg-blue-500' : 'bg-blue-600'
                }`}>
                  <Award className="w-6 h-6 text-white" />
                </div>
                <h3 className={`text-3xl font-bold mb-2 ${
                  isDay ? 'text-blue-700' : 'text-blue-300'
                }`}>
                  {userTypeStats[activeUserType as keyof typeof userTypeStats].installations}+
                </h3>
                <p className={`font-semibold text-sm ${
                  isDay ? 'text-slate-700' : 'text-slate-300'
                }`}>
                  Installations
                </p>
                <p className={`text-xs mt-1 ${
                  isDay ? 'text-slate-600' : 'text-slate-400'
                }`}>
                  Completed Projects
                </p>
              </div>

              {/* Customer Satisfaction */}
              <div className={`p-6 rounded-xl text-center ${
                isDay ? 'bg-gradient-to-br from-purple-50 to-violet-50 border border-purple-200/50 shadow-md' : 'bg-gradient-to-br from-purple-900/20 to-violet-900/20 border border-purple-400/30 shadow-md'
              } backdrop-blur-sm`}>
                <div className={`w-12 h-12 mx-auto mb-3 rounded-full flex items-center justify-center ${
                  isDay ? 'bg-purple-500' : 'bg-purple-600'
                }`}>
                  <CheckCircle className="w-6 h-6 text-white" />
                </div>
                <h3 className={`text-3xl font-bold mb-2 ${
                  isDay ? 'text-purple-700' : 'text-purple-300'
                }`}>
                  {userTypeStats[activeUserType as keyof typeof userTypeStats].satisfaction}
                </h3>
                <p className={`font-semibold text-sm ${
                  isDay ? 'text-slate-700' : 'text-slate-300'
                }`}>
                  Satisfaction Rate
                </p>
                <p className={`text-xs mt-1 ${
                  isDay ? 'text-slate-600' : 'text-slate-400'
                }`}>
                  Happy Customers
                </p>
              </div>
            </div>

            {/* Service Regions - Mobile Compact + Desktop Full */}
            <div className={`p-4 sm:p-6 rounded-xl ${
              isDay ? 'bg-white/90 border border-amber-200/50 shadow-md' : 'bg-white/10 border border-white/20 shadow-md'
            } backdrop-blur-sm mb-6 sm:mb-8`}>
              <div className="flex items-center gap-2 mb-3 sm:mb-4">
                <Globe className={`w-4 h-4 sm:w-5 sm:h-5 ${
                  isDay ? 'text-blue-600' : 'text-amber-400'
                }`} />
                <h3 className={`text-base sm:text-lg font-bold ${
                  isDay ? 'text-slate-800' : 'text-white'
                }`}>
                  Service Regions
                </h3>
              </div>
              
              {/* Mobile: Horizontal Scroll Row */}
              <div className="block sm:hidden">
                <div className="overflow-x-auto scrollbar-hide pb-2">
                  <div className="flex gap-3 min-w-max px-1">
                    {[
                      { region: 'North India', coverage: '95%', color: 'blue' },
                      { region: 'South India', coverage: '90%', color: 'green' },
                      { region: 'West India', coverage: '88%', color: 'purple' },
                      { region: 'East India', coverage: '85%', color: 'orange' }
                    ].map((area, index) => (
                      <div key={index} className={`flex-shrink-0 w-24 p-3 rounded-lg text-center ${
                        isDay ? 'bg-white/80 border border-slate-200' : 'bg-white/5 border border-white/20'
                      } transition-all duration-300 hover:scale-105`}>
                        <h4 className={`font-bold text-xs mb-1 ${
                          isDay ? 'text-slate-800' : 'text-white'
                        }`}>
                          {area.region.split(' ')[0]}
                        </h4>
                        <div className={`text-lg font-bold mb-1 ${
                          isDay ? `text-${area.color}-600` : `text-${area.color}-400`
                        }`}>
                          {area.coverage}
                        </div>
                        <p className={`text-xs ${
                          isDay ? 'text-slate-600' : 'text-slate-300'
                        }`}>
                          Coverage
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Desktop: Original Grid Layout (Hidden on Mobile) */}
              <div className="hidden sm:grid grid-cols-2 md:grid-cols-4 gap-4">
                {[
                  { region: 'North India', coverage: '95%', color: 'blue' },
                  { region: 'South India', coverage: '90%', color: 'green' },
                  { region: 'West India', coverage: '88%', color: 'purple' },
                  { region: 'East India', coverage: '85%', color: 'orange' }
                ].map((area, index) => (
                  <div key={index} className={`p-4 rounded-lg text-center ${
                    isDay ? 'bg-white/80 border border-slate-200' : 'bg-white/5 border border-white/20'
                  } transition-all duration-300 hover:scale-105`}>
                    <h4 className={`font-bold text-sm mb-1 ${
                      isDay ? 'text-slate-800' : 'text-white'
                    }`}>
                      {area.region}
                    </h4>
                    <div className={`text-xl font-bold mb-1 ${
                      isDay ? `text-${area.color}-600` : `text-${area.color}-400`
                    }`}>
                      {area.coverage}
                    </div>
                    <p className={`text-xs ${
                      isDay ? 'text-slate-600' : 'text-slate-300'
                    }`}>
                      Coverage
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Performance Metrics - Mobile Horizontal + Desktop Grid */}
            <div className="mb-6 sm:mb-8">
              {/* Mobile: Horizontal Scroll */}
              <div className="block sm:hidden">
                <div className="overflow-x-auto scrollbar-hide pb-2">
                  <div className="flex gap-3 min-w-max px-2">
                    <div className={`flex-shrink-0 w-20 p-3 rounded-lg text-center ${
                      isDay ? 'bg-gradient-to-br from-emerald-50 to-green-50 border border-emerald-200/50 shadow-sm' : 'bg-gradient-to-br from-emerald-900/20 to-green-900/20 border border-emerald-400/30 shadow-sm'
                    } backdrop-blur-sm`}>
                      <div className={`text-lg font-bold mb-1 ${
                        isDay ? 'text-emerald-600' : 'text-emerald-400'
                      }`}>
                        24/7
                      </div>
                      <p className={`text-xs font-semibold ${
                        isDay ? 'text-emerald-700' : 'text-emerald-300'
                      }`}>
                        Support
                      </p>
                    </div>

                    <div className={`flex-shrink-0 w-20 p-3 rounded-lg text-center ${
                      isDay ? 'bg-gradient-to-br from-blue-50 to-cyan-50 border border-blue-200/50 shadow-sm' : 'bg-gradient-to-br from-blue-900/20 to-cyan-900/20 border border-blue-400/30 shadow-sm'
                    } backdrop-blur-sm`}>
                      <div className={`text-lg font-bold mb-1 ${
                        isDay ? 'text-blue-600' : 'text-blue-400'
                      }`}>
                        50+
                      </div>
                      <p className={`text-xs font-semibold ${
                        isDay ? 'text-blue-700' : 'text-blue-300'
                      }`}>
                        Engineers
                      </p>
                    </div>

                    <div className={`flex-shrink-0 w-20 p-3 rounded-lg text-center ${
                      isDay ? 'bg-gradient-to-br from-purple-50 to-violet-50 border border-purple-200/50 shadow-sm' : 'bg-gradient-to-br from-purple-900/20 to-violet-900/20 border border-purple-400/30 shadow-sm'
                    } backdrop-blur-sm`}>
                      <div className={`text-lg font-bold mb-1 ${
                        isDay ? 'text-purple-600' : 'text-purple-400'
                      }`}>
                        17+
                      </div>
                      <p className={`text-xs font-semibold ${
                        isDay ? 'text-purple-700' : 'text-purple-300'
                      }`}>
                        Years
                      </p>
                    </div>

                    <div className={`flex-shrink-0 w-20 p-3 rounded-lg text-center ${
                      isDay ? 'bg-gradient-to-br from-orange-50 to-red-50 border border-orange-200/50 shadow-sm' : 'bg-gradient-to-br from-orange-900/20 to-red-900/20 border border-orange-400/30 shadow-sm'
                    } backdrop-blur-sm`}>
                      <div className={`text-lg font-bold mb-1 ${
                        isDay ? 'text-orange-600' : 'text-orange-400'
                      }`}>
                        98%
                      </div>
                      <p className={`text-xs font-semibold ${
                        isDay ? 'text-orange-700' : 'text-orange-300'
                      }`}>
                        On-Time
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Desktop: Grid Layout (Hidden on Mobile) */}
              <div className="hidden sm:grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className={`p-4 rounded-xl text-center ${
                  isDay ? 'bg-gradient-to-br from-emerald-50 to-green-50 border border-emerald-200/50 shadow-md' : 'bg-gradient-to-br from-emerald-900/20 to-green-900/20 border border-emerald-400/30 shadow-md'
                } backdrop-blur-sm`}>
                  <div className={`text-xl font-bold mb-1 ${
                    isDay ? 'text-emerald-600' : 'text-emerald-400'
                  }`}>
                    24/7
                  </div>
                  <p className={`text-xs font-semibold ${
                    isDay ? 'text-emerald-700' : 'text-emerald-300'
                  }`}>
                    Support Available
                  </p>
                </div>

                <div className={`p-4 rounded-xl text-center ${
                  isDay ? 'bg-gradient-to-br from-blue-50 to-cyan-50 border border-blue-200/50 shadow-md' : 'bg-gradient-to-br from-blue-900/20 to-cyan-900/20 border border-blue-400/30 shadow-md'
                } backdrop-blur-sm`}>
                  <div className={`text-xl font-bold mb-1 ${
                    isDay ? 'text-blue-600' : 'text-blue-400'
                  }`}>
                    50+
                  </div>
                  <p className={`text-xs font-semibold ${
                    isDay ? 'text-blue-700' : 'text-blue-300'
                  }`}>
                    Service Engineers
                  </p>
                </div>

                <div className={`p-4 rounded-xl text-center ${
                  isDay ? 'bg-gradient-to-br from-purple-50 to-violet-50 border border-purple-200/50 shadow-md' : 'bg-gradient-to-br from-purple-900/20 to-violet-900/20 border border-purple-400/30 shadow-md'
                } backdrop-blur-sm`}>
                  <div className={`text-xl font-bold mb-1 ${
                    isDay ? 'text-purple-600' : 'text-purple-400'
                  }`}>
                    17+
                  </div>
                  <p className={`text-xs font-semibold ${
                    isDay ? 'text-purple-700' : 'text-purple-300'
                  }`}>
                    Years Experience
                  </p>
                </div>

                <div className={`p-4 rounded-xl text-center ${
                  isDay ? 'bg-gradient-to-br from-orange-50 to-red-50 border border-orange-200/50 shadow-md' : 'bg-gradient-to-br from-orange-900/20 to-red-900/20 border border-orange-400/30 shadow-md'
                } backdrop-blur-sm`}>
                  <div className={`text-xl font-bold mb-1 ${
                    isDay ? 'text-orange-600' : 'text-orange-400'
                  }`}>
                    98%
                  </div>
                  <p className={`text-xs font-semibold ${
                    isDay ? 'text-orange-700' : 'text-orange-300'
                  }`}>
                    On-Time Delivery
                  </p>
                </div>
              </div>
            </div>

            {/* Call to Action */}
            <div className="text-center">
              <div className={`inline-flex items-center gap-2 px-6 py-3 rounded-xl ${
                isDay ? 'bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600' : 'bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600'
              } text-white font-semibold text-sm transition-all duration-300 hover:scale-105 shadow-md cursor-pointer`}>
                <MapPin className="w-4 h-4" />
                <span>Find Service Near You</span>
                <ArrowRight className="w-4 h-4" />
              </div>
            </div>
          </div>
        </section>

        {/* Compact Unique Value Propositions */}
        <section className="py-8 sm:py-16 relative">
          {/* Background */}
          <div className={`absolute inset-0 ${
            isDay 
              ? 'bg-gradient-to-br from-blue-50 via-white to-blue-50/30' 
              : 'bg-gradient-to-br from-slate-900 via-blue-900/50 to-slate-800'
          }`}>
            <div className="absolute inset-0 bg-hexagon-pattern opacity-5"></div>
          </div>

          <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
            {/* Compact Section Header */}
            <div className="text-center mb-6 sm:mb-10">
              <div className={`inline-flex items-center gap-2 px-3 py-1.5 sm:px-4 sm:py-2 rounded-full mb-3 sm:mb-4 ${
                isDay 
                  ? 'bg-blue-100 text-blue-800 border border-blue-200/50' 
                  : 'bg-blue-900/30 text-blue-300 border border-blue-400/30'
              } backdrop-blur-sm`}>
                <Award className="w-3 h-3 sm:w-4 sm:h-4" />
                <span className="font-semibold text-xs sm:text-sm">EXCLUSIVE ADVANTAGES</span>
                <Award className="w-3 h-3 sm:w-4 sm:h-4" />
              </div>
              
              <h2 className={`text-xl sm:text-2xl md:text-3xl font-bold mb-3 sm:mb-4 ${
                isDay ? 'text-slate-800' : 'text-white'
              }`}>
                Why Choose Autosys Sunergy
              </h2>
              
              <p className={`text-sm sm:text-base max-w-2xl mx-auto ${
                isDay ? 'text-slate-600' : 'text-slate-300'
              }`}>
                Unmatched expertise and personalized solutions for {userTypes.find(ut => ut.id === activeUserType)?.label.toLowerCase()}
              </p>
            </div>

            {/* Mobile: Very Compact Vertical Style */}
            <div className="block sm:hidden mb-4">
              <div className="space-y-2 px-2">
                {userTypeUniquePoints[activeUserType as keyof typeof userTypeUniquePoints]?.map((point, index) => (
                  <div key={index} className={`group relative p-2.5 rounded-lg transition-all duration-200 ${
                    isDay ? 'bg-white/70 border border-blue-200/40' : 'bg-white/10 border border-white/20'
                  } backdrop-blur-sm`}>
                    <div className="flex items-center gap-2.5">
                      <div className={`w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0 ${
                        isDay ? 'bg-blue-500' : 'bg-blue-600'
                      }`}>
                        <point.icon className="w-3.5 h-3.5 text-white" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className={`text-xs font-bold mb-0.5 ${
                          isDay ? 'text-slate-800' : 'text-white'
                        }`}>
                          {point.title}
                        </h3>
                        <p className={`text-xs leading-snug ${
                          isDay ? 'text-slate-600' : 'text-slate-300'
                        }`}>
                          {point.desc}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Desktop: Original Grid Layout (Hidden on Mobile) */}
            <div className="hidden sm:grid md:grid-cols-2 gap-6 mb-10">
              {userTypeUniquePoints[activeUserType as keyof typeof userTypeUniquePoints]?.map((point, index) => (
                <div key={index} className={`group relative p-6 rounded-xl ${
                  isDay ? 'bg-white/90 border border-blue-200/50 hover:shadow-lg' : 'bg-white/10 border border-white/20 hover:shadow-lg'
                } backdrop-blur-sm transition-all duration-300 hover:scale-105`}>
                  
                  {/* Content */}
                  <div className="flex gap-4">
                    {/* Compact Icon */}
                    <div className={`w-12 h-12 rounded-lg flex-shrink-0 ${
                      isDay ? 'bg-blue-100' : 'bg-blue-900/50'
                    } flex items-center justify-center`}>
                      <point.icon className={`w-6 h-6 ${
                        isDay ? 'text-blue-600' : 'text-blue-400'
                      }`} />
                    </div>
                    
                    <div className="flex-1">
                      {/* Compact Title */}
                      <h3 className={`font-bold text-lg mb-2 ${
                        isDay ? 'text-slate-800' : 'text-white'
                      }`}>
                        {point.title}
                      </h3>
                      
                      {/* Compact Description */}
                      <p className={`text-sm leading-relaxed mb-3 ${
                        isDay ? 'text-slate-600' : 'text-slate-300'
                      }`}>
                        {point.desc}
                      </p>
                      
                      {/* Compact Badge */}
                      <div className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-semibold ${
                        isDay ? 'bg-green-100 text-green-700' : 'bg-green-900/50 text-green-300'
                      }`}>
                        <CheckCircle className="w-3 h-3" />
                        <span>Guaranteed</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Compact Trust Indicators */}
            <div className={`grid grid-cols-2 md:grid-cols-4 gap-4 p-6 rounded-xl ${
              isDay ? 'bg-gradient-to-r from-green-50 to-blue-50 border border-green-200/50' : 'bg-gradient-to-r from-green-900/20 to-blue-900/20 border border-green-400/30'
            } backdrop-blur-sm`}>
              <div className="text-center">
                <div className={`text-2xl font-bold mb-1 ${
                  isDay ? 'text-green-600' : 'text-green-400'
                }`}>
                  100%
                </div>
                <div className={`text-xs font-semibold ${
                  isDay ? 'text-green-700' : 'text-green-300'
                }`}>
                  Money Back Guarantee
                </div>
              </div>
              
              <div className="text-center">
                <div className={`text-2xl font-bold mb-1 ${
                  isDay ? 'text-blue-600' : 'text-blue-400'
                }`}>
                  25+
                </div>
                <div className={`text-xs font-semibold ${
                  isDay ? 'text-blue-700' : 'text-blue-300'
                }`}>
                  Year Warranty
                </div>
              </div>
              
              <div className="text-center">
                <div className={`text-2xl font-bold mb-1 ${
                  isDay ? 'text-purple-600' : 'text-purple-400'
                }`}>
                  24/7
                </div>
                <div className={`text-xs font-semibold ${
                  isDay ? 'text-purple-700' : 'text-purple-300'
                }`}>
                  Premium Support
                </div>
              </div>
              
              <div className="text-center">
                <div className={`text-2xl font-bold mb-1 ${
                  isDay ? 'text-orange-600' : 'text-orange-400'
                }`}>
                  ₹0
                </div>
                <div className={`text-xs font-semibold ${
                  isDay ? 'text-orange-700' : 'text-orange-300'
                }`}>
                  Down Payment*
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Organized FAQ Section */}
        <section className="py-8 sm:py-16 relative">
          {/* Background */}
          <div className={`absolute inset-0 ${
            isDay 
              ? 'bg-gradient-to-br from-slate-50 via-white to-blue-50/30' 
              : 'bg-gradient-to-br from-slate-900 via-slate-800 to-blue-900/50'
          }`}>
            <div className="absolute inset-0 bg-wave-pattern opacity-5"></div>
          </div>

          <div className="max-w-6xl mx-auto px-4 sm:px-6 relative z-10">
            {/* Compact Header */}
            <div className="text-center mb-6 sm:mb-10">
              <div className={`inline-flex items-center gap-2 px-3 py-1.5 sm:px-4 sm:py-2 rounded-full mb-3 sm:mb-4 ${
                isDay 
                  ? 'bg-blue-100 text-blue-800 border border-blue-200/50' 
                  : 'bg-blue-900/30 text-blue-300 border border-blue-400/30'
              } backdrop-blur-sm`}>
                <Shield className="w-3 h-3 sm:w-4 sm:h-4" />
                <span className="font-semibold text-xs sm:text-sm">EXPERT ANSWERS</span>
                <Shield className="w-3 h-3 sm:w-4 sm:h-4" />
              </div>
              
              <h2 className={`text-xl sm:text-2xl md:text-3xl font-bold mb-3 sm:mb-4 ${
                isDay ? 'text-slate-800' : 'text-white'
              }`}>
                Frequently Asked Questions
              </h2>
              
              <p className={`text-sm sm:text-base max-w-2xl mx-auto ${
                isDay ? 'text-slate-600' : 'text-slate-300'
              }`}>
                Get expert answers to common questions about solar installations and services
              </p>
            </div>

            {/* Mobile: Very Compact Vertical FAQs */}
            <div className="block sm:hidden mb-6">
              <div className="space-y-2 px-2">
                {generalFAQs.map((faq, index) => (
                  <div key={index} className={`rounded-lg overflow-hidden transition-all duration-300 ${
                    expandedFAQ === index 
                      ? isDay 
                        ? 'bg-gradient-to-r from-blue-50 to-cyan-50 border border-blue-200 shadow-md' 
                        : 'bg-gradient-to-r from-blue-900/30 to-cyan-900/30 border border-blue-400/50 shadow-md'
                      : isDay 
                        ? 'bg-white/80 border border-slate-200/60 hover:border-blue-300' 
                        : 'bg-white/5 border border-white/10 hover:border-blue-400/50'
                  } backdrop-blur-sm`}>
                    <button
                      onClick={() => setExpandedFAQ(expandedFAQ === index ? null : index)}
                      className={`w-full p-3 text-left flex items-center justify-between transition-all duration-300 ${
                        expandedFAQ === index 
                          ? isDay ? 'bg-blue-50/50' : 'bg-blue-900/20'
                          : 'hover:bg-blue-50/30'
                      }`}
                    >
                      <div className="flex items-center gap-3 flex-1">
                        {/* Question Icon */}
                        <div className={`w-6 h-6 rounded-full flex-shrink-0 flex items-center justify-center ${
                          expandedFAQ === index 
                            ? isDay ? 'bg-blue-500 text-white' : 'bg-blue-600 text-white'
                            : isDay ? 'bg-blue-100 text-blue-600' : 'bg-blue-900/50 text-blue-400'
                        } transition-all duration-300`}>
                          <span className="text-xs font-bold">{index + 1}</span>
                        </div>
                        
                        {/* Question Text */}
                        <h3 className={`font-semibold text-sm leading-tight ${
                          isDay ? 'text-slate-800' : 'text-white'
                        }`}>
                          {faq.question}
                        </h3>
                      </div>
                      
                      {/* Expand/Collapse Icon */}
                      <div className={`ml-2 p-1 rounded-full transition-all duration-300 ${
                        expandedFAQ === index 
                          ? isDay ? 'bg-blue-500 text-white' : 'bg-blue-600 text-white'
                          : isDay ? 'bg-slate-100 text-slate-600' : 'bg-slate-800 text-slate-400'
                      }`}>
                        {expandedFAQ === index ? (
                          <ChevronUp className="w-4 h-4" />
                        ) : (
                          <ChevronDown className="w-4 h-4" />
                        )}
                      </div>
                    </button>
                    
                    {/* Answer Content */}
                    {expandedFAQ === index && (
                      <div className={`px-3 pb-3 border-t ${
                        isDay ? 'border-blue-100' : 'border-blue-700/50'
                      }`}>
                        <div className="pt-3">
                          <p className={`text-sm leading-relaxed mb-3 ${
                            isDay ? 'text-slate-700' : 'text-slate-300'
                          }`}>
                            {faq.answer}
                          </p>
                          
                          {/* Action Buttons */}
                          <div className="flex gap-2">
                            <div className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${
                              isDay ? 'bg-green-100 text-green-700' : 'bg-green-900/50 text-green-300'
                            }`}>
                              <CheckCircle className="w-3 h-3" />
                              <span>Helpful</span>
                            </div>
                            <div className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${
                              isDay ? 'bg-blue-100 text-blue-700' : 'bg-blue-900/50 text-blue-300'
                            }`}>
                              <MessageCircle className="w-3 h-3" />
                              <span>Ask More</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Desktop: Original Grid Layout (Hidden on Mobile) */}
            <div className="hidden sm:grid lg:grid-cols-2 gap-6 mb-10">
              {/* Left Column */}
              <div className="space-y-4">
                {generalFAQs.slice(0, Math.ceil(generalFAQs.length / 2)).map((faq, index) => (
                  <div key={index} className={`group rounded-xl overflow-hidden ${
                    isDay ? 'bg-white/90 border border-blue-200/50 shadow-md hover:shadow-lg' : 'bg-white/10 border border-white/20 shadow-md hover:shadow-lg'
                  } backdrop-blur-sm transition-all duration-300`}>
                    <button
                      onClick={() => setExpandedFAQ(expandedFAQ === index ? null : index)}
                      className={`w-full p-6 text-left flex items-start justify-between hover:${
                        isDay ? 'bg-blue-50/50' : 'bg-white/5'
                      } transition-all duration-300`}
                    >
                      <div className="flex-1 pr-4">
                        <h3 className={`font-bold text-base mb-2 ${
                          isDay ? 'text-slate-800' : 'text-white'
                        } group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-300`}>
                          {faq.question}
                        </h3>
                        {expandedFAQ !== index && (
                          <p className={`text-sm ${
                            isDay ? 'text-slate-500' : 'text-slate-400'
                          }`}>
                            Click to view answer
                          </p>
                        )}
                      </div>
                      
                      <div className={`ml-4 p-2 rounded-lg ${
                        isDay ? 'bg-blue-100' : 'bg-blue-900/50'
                      } transition-transform duration-300 group-hover:scale-110`}>
                        {expandedFAQ === index ? (
                          <ChevronUp className={`w-5 h-5 ${
                            isDay ? 'text-blue-600' : 'text-blue-400'
                          }`} />
                        ) : (
                          <ChevronDown className={`w-5 h-5 ${
                            isDay ? 'text-blue-600' : 'text-blue-400'
                          }`} />
                        )}
                      </div>
                    </button>
                    
                    {expandedFAQ === index && (
                      <div className={`px-6 pb-6 border-t ${
                        isDay ? 'border-blue-100 bg-blue-50/30' : 'border-white/10 bg-white/5'
                      }`}>
                        <p className={`text-sm leading-relaxed pt-4 mb-3 ${
                          isDay ? 'text-slate-700' : 'text-slate-300'
                        }`}>
                          {faq.answer}
                        </p>
                        
                        {/* Expert Badge */}
                        <div className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-semibold ${
                          isDay ? 'bg-green-100 text-green-700' : 'bg-green-900/50 text-green-300'
                        }`}>
                          <Award className="w-3 h-3" />
                          <span>Expert Answer</span>
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>

              {/* Right Column */}
              <div className="space-y-4">
                {generalFAQs.slice(Math.ceil(generalFAQs.length / 2)).map((faq, index) => {
                  const actualIndex = index + Math.ceil(generalFAQs.length / 2);
                  return (
                    <div key={actualIndex} className={`group rounded-xl overflow-hidden ${
                      isDay ? 'bg-white/90 border border-blue-200/50 shadow-md hover:shadow-lg' : 'bg-white/10 border border-white/20 shadow-md hover:shadow-lg'
                    } backdrop-blur-sm transition-all duration-300`}>
                      <button
                        onClick={() => setExpandedFAQ(expandedFAQ === actualIndex ? null : actualIndex)}
                        className={`w-full p-6 text-left flex items-start justify-between hover:${
                          isDay ? 'bg-blue-50/50' : 'bg-white/5'
                        } transition-all duration-300`}
                      >
                        <div className="flex-1 pr-4">
                          <h3 className={`font-bold text-base mb-2 ${
                            isDay ? 'text-slate-800' : 'text-white'
                          } group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-300`}>
                            {faq.question}
                          </h3>
                          {expandedFAQ !== actualIndex && (
                            <p className={`text-sm ${
                              isDay ? 'text-slate-500' : 'text-slate-400'
                            }`}>
                              Click to view answer
                            </p>
                          )}
                        </div>
                        
                        <div className={`ml-4 p-2 rounded-lg ${
                          isDay ? 'bg-blue-100' : 'bg-blue-900/50'
                        } transition-transform duration-300 group-hover:scale-110`}>
                          {expandedFAQ === actualIndex ? (
                            <ChevronUp className={`w-5 h-5 ${
                              isDay ? 'text-blue-600' : 'text-blue-400'
                            }`} />
                          ) : (
                            <ChevronDown className={`w-5 h-5 ${
                              isDay ? 'text-blue-600' : 'text-blue-400'
                            }`} />
                          )}
                        </div>
                      </button>
                      
                      {expandedFAQ === actualIndex && (
                        <div className={`px-6 pb-6 border-t ${
                          isDay ? 'border-blue-100 bg-blue-50/30' : 'border-white/10 bg-white/5'
                        }`}>
                          <p className={`text-sm leading-relaxed pt-4 mb-3 ${
                            isDay ? 'text-slate-700' : 'text-slate-300'
                          }`}>
                            {faq.answer}
                          </p>
                          
                          {/* Expert Badge */}
                          <div className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-semibold ${
                            isDay ? 'bg-green-100 text-green-700' : 'bg-green-900/50 text-green-300'
                          }`}>
                            <Award className="w-3 h-3" />
                            <span>Expert Answer</span>
                          </div>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Contact Section */}
            <div className={`relative p-8 rounded-xl ${
              isDay ? 'bg-gradient-to-br from-blue-50 to-cyan-50 border border-blue-200/50 shadow-md' : 'bg-gradient-to-br from-blue-900/20 to-cyan-900/20 border border-blue-400/30 shadow-md'
            } backdrop-blur-sm text-center`}>
              
              <div className="relative z-10">
                <h3 className={`text-xl font-bold mb-3 ${
                  isDay ? 'text-slate-800' : 'text-white'
                }`}>
                  Still Have Questions?
                </h3>
                
                <p className={`text-sm mb-6 max-w-xl mx-auto ${
                  isDay ? 'text-slate-600' : 'text-slate-300'
                }`}>
                  Our solar experts are ready to provide personalized answers for your specific needs
                </p>
                
                <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                  <div className={`flex items-center gap-2 px-6 py-3 rounded-lg ${
                    isDay ? 'bg-blue-500 text-white hover:bg-blue-600' : 'bg-blue-500 text-white hover:bg-blue-600'
                  } transition-all duration-300 hover:scale-105 shadow-sm cursor-pointer`}>
                    <Phone className="w-4 h-4" />
                    <div>
                      <div className="font-semibold text-sm">Call Now</div>
                      <div className="text-xs opacity-90">+91 8818880540</div>
                    </div>
                  </div>
                  
                  <div className={`flex items-center gap-2 px-6 py-3 rounded-lg border ${
                    isDay ? 'border-blue-500 text-blue-600 hover:bg-blue-500 hover:text-white' : 'border-blue-400 text-blue-400 hover:bg-blue-400 hover:text-white'
                  } transition-all duration-300 hover:scale-105 cursor-pointer`}>
                    <Globe className="w-4 h-4" />
                    <div>
                      <div className="font-semibold text-sm">Get Quote</div>
                      <div className="text-xs opacity-75">Free Consultation</div>
                    </div>
                  </div>
                </div>
                
                {/* Trust Indicators */}
                <div className="mt-6 flex justify-center items-center gap-6 text-xs">
                  <div className={`flex items-center gap-1 ${
                    isDay ? 'text-green-600' : 'text-green-400'
                  }`}>
                    <CheckCircle className="w-3 h-3" />
                    <span className="font-semibold">Free Consultation</span>
                  </div>
                  <div className={`flex items-center gap-1 ${
                    isDay ? 'text-blue-600' : 'text-blue-400'
                  }`}>
                    <CheckCircle className="w-3 h-3" />
                    <span className="font-semibold">Expert Guidance</span>
                  </div>
                  <div className={`flex items-center gap-1 ${
                    isDay ? 'text-purple-600' : 'text-purple-400'
                  }`}>
                    <CheckCircle className="w-3 h-3" />
                    <span className="font-semibold">No Obligation</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <Footer />
      </div>
    </div>
  );
}
