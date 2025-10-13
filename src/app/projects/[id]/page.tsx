'use client';
import React, { useState, useEffect } from 'react';
import { useTheme } from '@/contexts/ThemeContext';
import { getThemeClasses, getThemeHover, TRANSITION_CLASSES } from '@/utils/themeUtils';
import Header from '@/components/home/Header';
import Footer from '@/components/home/Footer';
import Link from 'next/link';
import { 
  Building2, 
  GraduationCap, 
  Factory, 
  MapPin, 
  Zap, 
  TrendingUp, 
  Calendar,
  Award,
  Users,
  Leaf,
  Sun,
  Battery,
  Gauge,
  ArrowLeft,
  Star,
  Target,
  CheckCircle2,
  Play,
  Clock,
  Globe,
  Shield,
  Lightbulb,
  Phone,
  Mail,
  ExternalLink,
  Quote,
  Camera,
  BarChart3,
  Wrench,
  Sparkles,
  TrendingDown,
  AlertCircle,
  ChevronRight,
  Download
} from 'lucide-react';

interface ProjectDetail {
  id: string;
  title: string;
  client: string;
  capacity: string;
  location: string;
  type: 'Industrial' | 'Educational' | 'Manufacturing' | 'Healthcare' | 'Religious' | 'Commercial';
  savings: string;
  year: string;
  description: string;
  features: string[];
  status: 'Completed' | 'Ongoing' | 'Planning';
  energyGenerated?: string;
  co2Saved?: string;
  featured?: boolean;
  
  // Enhanced details
  projectDuration: string;
  teamSize: number;
  totalInvestment: string;
  roiPeriod: string;
  panelCount: number;
  inverterType: string;
  mountingType: string;
  gridConnection: string;
  challenges: string[];
  solutions: string[];
  uniqueness: string[];
  results: {
    energyProduction: string;
    carbonReduction: string;
    costSavings: string;
    efficiency: string;
  };
  testimonial?: {
    quote: string;
    author: string;
    position: string;
    rating: number;
  };
  technicalSpecs: {
    panelBrand: string;
    panelWattage: string;
    inverterBrand: string;
    inverterEfficiency: string;
    systemEfficiency: string;
    expectedLifespan: string;
  };
  projectPhases: {
    phase: string;
    duration: string;
    description: string;
    status: 'Completed' | 'In Progress' | 'Planned';
  }[];
  images?: string[];
  awards?: string[];
  certifications?: string[];
}

const projectsData: Record<string, ProjectDetail> = {
  'trident-group': {
    id: 'trident-group',
    title: 'Trident Group Solar Installation',
    client: 'Trident Group',
    capacity: '5.4 MW',
    location: 'Budhni, Madhya Pradesh',
    type: 'Industrial',
    savings: '₹4.2Cr annually',
    year: '2024',
    description: 'Massive industrial solar installation powering textile manufacturing operations with grid-tied technology and maximum efficiency optimization.',
    features: ['Grid-tied System', 'Maximum Power Point Tracking', 'Remote Monitoring', 'Net Metering', 'Industrial Grade Components'],
    status: 'Completed',
    energyGenerated: '8.1 GWh/year',
    co2Saved: '6,480 tons/year',
    featured: true,
    projectDuration: '8 months',
    teamSize: 25,
    totalInvestment: '₹18.5 Cr',
    roiPeriod: '4.4 years',
    panelCount: 14850,
    inverterType: 'String Inverters',
    mountingType: '3-Purlin Mounting Structure',
    gridConnection: '33kV Grid Connection',
    challenges: [
      'Large-scale installation coordination',
      'Minimal production disruption requirement',
      'Complex grid synchronization',
      'Weather-resistant design for industrial environment'
    ],
    solutions: [
      'Phased installation approach',
      'Advanced monitoring systems',
      'Dedicated grid infrastructure',
      'Anti-corrosion materials and IP65 protection'
    ],
    uniqueness: [
      'Largest textile industry solar installation in MP',
      'Zero downtime installation methodology',
      'Integrated production monitoring',
      'Custom mounting for industrial rooftops'
    ],
    results: {
      energyProduction: '8.1 GWh annually with 99.2% uptime',
      carbonReduction: '6,480 tons CO₂ offset per year',
      costSavings: '67% reduction in electricity costs',
      efficiency: '19.8% system efficiency achieved'
    },
    testimonial: {
      quote: "AutoSys Sunergy delivered an exceptional solar solution that exceeded our expectations. The seamless installation and outstanding performance have significantly reduced our operational costs while supporting our sustainability goals.",
      author: "Mr. Rajesh Kumar",
      position: "Operations Director, Trident Group",
      rating: 5
    },
    technicalSpecs: {
      panelBrand: 'Novasys Greenergy Mono-PERC',
      panelWattage: '365W per panel',
      inverterBrand: 'Mikrotek Solar Inverters',
      inverterEfficiency: '98.5%',
      systemEfficiency: '19.8%',
      expectedLifespan: '25+ years'
    },
    projectPhases: [
      {
        phase: 'Site Survey & Design',
        duration: '3 weeks',
        description: 'Comprehensive site analysis, structural assessment, and custom system design',
        status: 'Completed'
      },
      {
        phase: 'Procurement & Logistics',
        duration: '4 weeks',
        description: 'Component sourcing, quality verification, and delivery coordination',
        status: 'Completed'
      },
      {
        phase: 'Installation & Commissioning',
        duration: '20 weeks',
        description: 'Phased installation with minimal production impact',
        status: 'Completed'
      },
      {
        phase: 'Testing & Handover',
        duration: '2 weeks',
        description: 'Performance testing, grid synchronization, and system handover',
        status: 'Completed'
      }
    ],
    awards: ['Best Industrial Project - Global Solar Expo 2025'],
    certifications: ['IEC 61215', 'IEC 61730', 'MNRE Approved', 'CEA Compliance']
  },
  'medicap-university': {
    id: 'medicap-university',
    title: 'Medicap University Campus Solar',
    client: 'Medicap University',
    capacity: '240 kW',
    location: 'Indore, Madhya Pradesh',
    type: 'Educational',
    savings: '₹28L annually',
    year: '2024',
    description: 'Educational institution solar project providing clean energy for academic buildings, hostels, and research facilities.',
    features: ['Campus-wide Coverage', 'Educational Monitoring Display', 'Grid Integration', 'Battery Backup', 'Storm-resistant Design'],
    status: 'Completed',
    energyGenerated: '360 MWh/year',
    co2Saved: '288 tons/year',
    featured: true,
    projectDuration: '4 months',
    teamSize: 12,
    totalInvestment: '₹1.2 Cr',
    roiPeriod: '4.2 years',
    panelCount: 658,
    inverterType: 'String Inverters',
    mountingType: 'Ballast Mounting System',
    gridConnection: '11kV Grid Connection',
    challenges: [
      'Multiple building integration',
      'Student safety during installation',
      'Educational display requirements',
      'Future expansion planning'
    ],
    solutions: [
      'Building-specific design approach',
      'Non-invasive installation methods',
      'Interactive monitoring displays',
      'Modular expandable design'
    ],
    uniqueness: [
      'First medical university with comprehensive solar coverage',
      'Educational monitoring system for students',
      'Research facility integration',
      'Campus sustainability showcase'
    ],
    results: {
      energyProduction: '360 MWh annually with 98.8% efficiency',
      carbonReduction: '288 tons CO₂ reduction per year',
      costSavings: '72% reduction in electricity bills',
      efficiency: '18.9% panel efficiency achieved'
    },
    testimonial: {
      quote: "The solar installation has transformed our campus into a living laboratory for renewable energy. Students now have hands-on learning opportunities while we save significantly on operational costs.",
      author: "Dr. Priya Sharma",
      position: "Vice Chancellor, Medicap University",
      rating: 5
    },
    technicalSpecs: {
      panelBrand: 'Novasys Greenergy Mono-PERC',
      panelWattage: '365W per panel',
      inverterBrand: 'Mikrotek Solar Inverters',
      inverterEfficiency: '98.2%',
      systemEfficiency: '18.9%',
      expectedLifespan: '25+ years'
    },
    projectPhases: [
      {
        phase: 'Campus Assessment',
        duration: '2 weeks',
        description: 'Multi-building analysis and integration planning',
        status: 'Completed'
      },
      {
        phase: 'Design & Approval',
        duration: '3 weeks',
        description: 'Custom design for educational requirements',
        status: 'Completed'
      },
      {
        phase: 'Installation',
        duration: '12 weeks',
        description: 'Coordinated installation across campus buildings',
        status: 'Completed'
      },
      {
        phase: 'Educational Integration',
        duration: '1 week',
        description: 'Monitoring displays and educational materials setup',
        status: 'Completed'
      }
    ],
    certifications: ['IEC 61215', 'IEC 61730', 'Educational Safety Standards', 'MNRE Approved']
  },
  'pushp-masale': {
    id: 'pushp-masale',
    title: 'Pushp Masale Manufacturing Plant',
    client: 'Pushp Masale',
    capacity: '225 kW',
    location: 'Indore, Madhya Pradesh',
    type: 'Manufacturing',
    savings: '₹26L annually',
    year: '2023',
    description: 'Spice manufacturing facility solar installation reducing operational costs and carbon footprint with advanced monitoring systems.',
    features: ['Manufacturing Integration', 'Load Management', 'Dust-resistant Panels', 'Automated Cleaning', 'Energy Analytics'],
    status: 'Completed',
    energyGenerated: '337 MWh/year',
    co2Saved: '270 tons/year',
    featured: true,
    projectDuration: '5 months',
    teamSize: 15,
    totalInvestment: '₹1.1 Cr',
    roiPeriod: '4.0 years',
    panelCount: 617,
    inverterType: 'String Inverters',
    mountingType: 'Fixed Tilt Mounting',
    gridConnection: '11kV Grid Connection',
    challenges: [
      'Spice dust management',
      'Production process integration',
      'Equipment vibration considerations',
      'Cleaning system automation'
    ],
    solutions: [
      'Dust-resistant panel coating',
      'Isolated mounting structures',
      'Vibration dampening systems',
      'Automated cleaning mechanisms'
    ],
    uniqueness: [
      'First spice manufacturing facility with solar in region',
      'Dust-resistant technology implementation',
      'Production-integrated energy management',
      'Automated maintenance systems'
    ],
    results: {
      energyProduction: '337 MWh annually with 98.5% uptime',
      carbonReduction: '270 tons CO₂ offset annually',
      costSavings: '71% reduction in energy costs',
      efficiency: '18.7% system efficiency'
    },
    testimonial: {
      quote: "AutoSys understood our unique manufacturing challenges and delivered a solution that works perfectly in our spice processing environment. The automated cleaning system is particularly impressive.",
      author: "Mr. Amit Gupta",
      position: "Plant Manager, Pushp Masale",
      rating: 5
    },
    technicalSpecs: {
      panelBrand: 'Novasys Greenergy Mono-PERC',
      panelWattage: '365W per panel',
      inverterBrand: 'Mikrotek Solar Inverters',
      inverterEfficiency: '98.0%',
      systemEfficiency: '18.7%',
      expectedLifespan: '25+ years'
    },
    projectPhases: [
      {
        phase: 'Manufacturing Analysis',
        duration: '2 weeks',
        description: 'Production process and environmental assessment',
        status: 'Completed'
      },
      {
        phase: 'Custom Design',
        duration: '4 weeks',
        description: 'Specialized design for manufacturing environment',
        status: 'Completed'
      },
      {
        phase: 'Installation & Integration',
        duration: '14 weeks',
        description: 'Installation with production continuity',
        status: 'Completed'
      },
      {
        phase: 'Automation Setup',
        duration: '2 weeks',
        description: 'Cleaning and monitoring automation',
        status: 'Completed'
      }
    ],
    certifications: ['IEC 61215', 'IEC 61730', 'Manufacturing Safety Standards', 'MNRE Approved']
  }
};

const typeIcons = {
  Industrial: Factory,
  Educational: GraduationCap,
  Manufacturing: Building2,
  Healthcare: Users,
  Religious: Sun,
  Commercial: Building2
};

interface ProjectDetailPageProps {
  params: Promise<{
    id: string;
  }>;
}

export default function ProjectDetailPage({ params }: ProjectDetailPageProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeTab, setActiveTab] = useState('overview');
  const [projectId, setProjectId] = useState<string | null>(null);
  const { theme, isDay, isNight } = useTheme();
  
  const themeClasses = getThemeClasses(theme);
  const hoverEffects = getThemeHover(theme);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    
    // Scroll to top when component mounts
    window.scrollTo(0, 0);
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    params.then(({ id }) => {
      setProjectId(id);
    });
  }, [params]);

  if (!projectId) {
    return (
      <div className={`min-h-screen flex items-center justify-center transition-all duration-500 ${
        isDay ? 'bg-gradient-to-br from-blue-50 to-blue-100' : 'bg-slate-900'
      }`}>
        <div className="text-center">
          <h1 className={`text-2xl font-bold mb-4 transition-colors duration-500 ${
            isDay ? 'text-slate-800' : 'text-slate-100'
          }`}>
            Loading...
          </h1>
        </div>
      </div>
    );
  }

  const project = projectsData[projectId];

  if (!project) {
    return (
      <div className={`min-h-screen flex items-center justify-center transition-all duration-500 ${
        isDay ? 'bg-gradient-to-br from-blue-50 to-blue-100' : 'bg-slate-900'
      }`}>
        <div className="text-center">
          <h1 className={`text-2xl font-bold mb-4 transition-colors duration-500 ${
            isDay ? 'text-slate-800' : 'text-slate-100'
          }`}>
            Project Not Found
          </h1>
          <Link href="/projects" className={`inline-flex items-center gap-2 transition-colors duration-500 ${
            isDay ? 'text-blue-600 hover:text-blue-700' : 'text-cyan-400 hover:text-cyan-300'
          }`}>
            <ArrowLeft className="w-4 h-4" />
            Back to Projects
          </Link>
        </div>
      </div>
    );
  }

  const TypeIcon = typeIcons[project.type];

  const tabs = [
    { id: 'overview', label: 'Overview', icon: Target },
    { id: 'technical', label: 'Technical Details', icon: Wrench },
    { id: 'results', label: 'Results & Impact', icon: BarChart3 },
    { id: 'testimonial', label: 'Client Feedback', icon: Quote }
  ];

  return (
    <div className={`min-h-screen transition-all duration-500 ${
      isDay ? 'bg-white' : 'bg-slate-900'
    }`}>
      <Header isScrolled={isScrolled} />

      {/* Hero Section - Compact Mobile First */}
      <section className={`pt-16 pb-4 sm:pb-6 md:pb-8 transition-all duration-500 ${
        isDay 
          ? 'bg-gradient-to-br from-blue-50 via-blue-50 to-blue-100' 
          : 'bg-gradient-to-br from-slate-900 via-blue-900/20 to-indigo-900/10'
      }`}>
        <div className="w-full max-w-none px-2 sm:px-3 md:px-6">
          <div className="max-w-6xl mx-auto">
            {/* Compact Breadcrumb */}
            <div className="flex items-center gap-1 sm:gap-2 mb-4 sm:mb-6">
              <Link href="/projects" className={`flex items-center gap-1 sm:gap-2 text-xs sm:text-sm transition-colors duration-500 ${
                isDay ? 'text-slate-600 hover:text-amber-600' : 'text-slate-400 hover:text-cyan-400'
              }`}>
                <ArrowLeft className="w-3 h-3 sm:w-4 sm:h-4" />
                Projects
              </Link>
              <ChevronRight className={`w-3 h-3 sm:w-4 sm:h-4 transition-colors duration-500 ${
                isDay ? 'text-slate-400' : 'text-slate-500'
              }`} />
              <span className={`text-xs sm:text-sm font-medium transition-colors duration-500 ${
                isDay ? 'text-slate-800' : 'text-slate-200'
              }`}>
                {project.client}
              </span>
            </div>

            {/* Horizontal Layout - Mobile First */}
            <div className="space-y-4 sm:space-y-6">
              {/* Project Header Row */}
              <div className="flex items-start gap-3 sm:gap-4">
                <div className={`p-2 sm:p-3 rounded-lg transition-all duration-500 ${
                  isDay ? 'bg-white/70 shadow-sm' : 'bg-slate-800/50 shadow-md'
                }`}>
                  <TypeIcon className={`w-5 h-5 sm:w-6 sm:h-6 transition-colors duration-500 ${
                    isDay ? 'text-amber-600' : 'text-cyan-400'
                  }`} />
                </div>
                <div className="flex-1 min-w-0">
                  <div className={`text-xs sm:text-sm font-medium px-2 py-1 rounded-full inline-block mb-2 transition-all duration-500 ${
                    isDay 
                      ? 'bg-amber-100 text-amber-800 border border-amber-200' 
                      : 'bg-blue-900/50 text-blue-300 border border-blue-400/30'
                  }`}>
                    {project.type}
                  </div>
                  <h1 className={`text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold mb-2 transition-colors duration-500 ${
                    isDay ? 'text-slate-800' : 'text-slate-100'
                  }`}>
                    {project.title}
                  </h1>
                  <div className={`flex items-center gap-1 sm:gap-2 text-xs sm:text-sm mb-3 transition-colors duration-500 ${
                    isDay ? 'text-slate-600' : 'text-slate-400'
                  }`}>
                    <MapPin className="w-3 h-3 sm:w-4 sm:h-4" />
                    {project.location}
                  </div>
                </div>
              </div>

              {/* Description - Compact */}
              <p className={`text-sm sm:text-base leading-relaxed transition-colors duration-500 ${
                isDay ? 'text-slate-600' : 'text-slate-300'
              }`}>
                {project.description}
              </p>

              {/* Key Metrics Row - Horizontal */}
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-2 sm:gap-3 md:gap-4">
                <div className={`p-2 sm:p-3 md:p-4 rounded-lg border transition-all duration-500 ${
                  isDay 
                    ? 'bg-white/70 border-amber-200 shadow-sm' 
                    : 'bg-slate-800/50 border-slate-600 shadow-md'
                }`}>
                  <Zap className={`w-4 h-4 sm:w-5 sm:h-5 mb-1 transition-colors duration-500 ${
                    isDay ? 'text-amber-600' : 'text-cyan-400'
                  }`} />
                  <div className={`text-sm sm:text-lg md:text-xl font-bold mb-1 transition-colors duration-500 ${
                    isDay ? 'text-slate-800' : 'text-slate-100'
                  }`}>
                    {project.capacity}
                  </div>
                  <div className={`text-xs sm:text-sm transition-colors duration-500 ${
                    isDay ? 'text-slate-600' : 'text-slate-400'
                  }`}>
                    Capacity
                  </div>
                </div>
                <div className={`p-2 sm:p-3 md:p-4 rounded-lg border transition-all duration-500 ${
                  isDay 
                    ? 'bg-white/70 border-green-200 shadow-sm' 
                    : 'bg-slate-800/50 border-slate-600 shadow-md'
                }`}>
                  <TrendingUp className={`w-4 h-4 sm:w-5 sm:h-5 mb-1 transition-colors duration-500 ${
                    isDay ? 'text-green-600' : 'text-green-400'
                  }`} />
                  <div className={`text-sm sm:text-lg md:text-xl font-bold mb-1 transition-colors duration-500 ${
                    isDay ? 'text-slate-800' : 'text-slate-100'
                  }`}>
                    {project.savings}
                  </div>
                  <div className={`text-xs sm:text-sm transition-colors duration-500 ${
                    isDay ? 'text-slate-600' : 'text-slate-400'
                  }`}>
                    Savings
                  </div>
                </div>
                <div className={`p-2 sm:p-3 md:p-4 rounded-lg border transition-all duration-500 ${
                  isDay 
                    ? 'bg-white/70 border-blue-200 shadow-sm' 
                    : 'bg-slate-800/50 border-slate-600 shadow-md'
                }`}>
                  <Clock className={`w-4 h-4 sm:w-5 sm:h-5 mb-1 transition-colors duration-500 ${
                    isDay ? 'text-blue-600' : 'text-blue-400'
                  }`} />
                  <div className={`text-sm sm:text-lg md:text-xl font-bold mb-1 transition-colors duration-500 ${
                    isDay ? 'text-slate-800' : 'text-slate-100'
                  }`}>
                    {project.projectDuration}
                  </div>
                  <div className={`text-xs sm:text-sm transition-colors duration-500 ${
                    isDay ? 'text-slate-600' : 'text-slate-400'
                  }`}>
                    Duration
                  </div>
                </div>
                <div className={`p-2 sm:p-3 md:p-4 rounded-lg border transition-all duration-500 ${
                  isDay 
                    ? 'bg-white/70 border-purple-200 shadow-sm' 
                    : 'bg-slate-800/50 border-slate-600 shadow-md'
                }`}>
                  <CheckCircle2 className={`w-4 h-4 sm:w-5 sm:h-5 mb-1 transition-colors duration-500 ${
                    isDay ? 'text-purple-600' : 'text-purple-400'
                  }`} />
                  <div className={`text-sm sm:text-lg md:text-xl font-bold mb-1 transition-colors duration-500 ${
                    isDay ? 'text-slate-800' : 'text-slate-100'
                  }`}>
                    {project.status}
                  </div>
                  <div className={`text-xs sm:text-sm transition-colors duration-500 ${
                    isDay ? 'text-slate-600' : 'text-slate-400'
                  }`}>
                    Status
                  </div>
                </div>
              </div>

              {/* Awards Row - If Available */}
              {project.awards && project.awards.length > 0 && (
                <div className={`p-3 sm:p-4 rounded-lg border transition-all duration-500 ${
                  isDay 
                    ? 'bg-gradient-to-r from-amber-50 to-yellow-50 border-amber-200' 
                    : 'bg-gradient-to-r from-blue-900/20 to-indigo-900/20 border-blue-400/30'
                }`}>
                  <div className="flex items-center gap-2 mb-2">
                    <Award className={`w-4 h-4 sm:w-5 sm:h-5 transition-colors duration-500 ${
                      isDay ? 'text-amber-600' : 'text-cyan-400'
                    }`} />
                    <span className={`text-sm sm:text-base font-semibold transition-colors duration-500 ${
                      isDay ? 'text-slate-800' : 'text-slate-200'
                    }`}>
                      Awards & Recognition
                    </span>
                  </div>
                  {project.awards.map((award, index) => (
                    <div key={index} className={`text-xs sm:text-sm p-2 rounded-md transition-all duration-500 ${
                      isDay ? 'bg-amber-100 text-amber-800' : 'bg-blue-900/40 text-blue-300'
                    }`}>
                      {award}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Tabs Navigation - Compact */}
      <section className={`py-1 sm:py-2 sticky top-16 z-40 backdrop-blur-md transition-all duration-500 ${
        isDay ? 'bg-white/95 border-b border-slate-200' : 'bg-slate-900/95 border-b border-slate-700'
      }`}>
        <div className="w-full max-w-none px-2 sm:px-3 md:px-6">
          <div className="max-w-6xl mx-auto">
            <div className="flex gap-1 p-1 rounded-lg overflow-x-auto scrollbar-hide">
              {tabs.map((tab) => {
                const Icon = tab.icon;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex items-center gap-1 sm:gap-2 px-2 sm:px-3 py-2 rounded-md text-xs sm:text-sm font-medium whitespace-nowrap transition-all duration-300 ${
                      activeTab === tab.id
                        ? isDay
                          ? 'bg-amber-600 text-white shadow-md'
                          : 'bg-blue-600 text-white shadow-md'
                        : isDay
                          ? 'text-slate-600 hover:bg-slate-100'
                          : 'text-slate-400 hover:bg-slate-800'
                    }`}
                  >
                    <Icon className="w-3 h-3 sm:w-4 sm:h-4" />
                    <span className="hidden sm:inline">{tab.label}</span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Tab Content - Compact */}
      <section className="py-3 sm:py-4 md:py-6">
        <div className="w-full max-w-none px-2 sm:px-3 md:px-6">
          <div className="max-w-6xl mx-auto">
            {/* Overview Tab - Horizontal Layouts */}
            {activeTab === 'overview' && (
              <div className="space-y-4 sm:space-y-6 md:space-y-8">
                {/* Project Phases - Horizontal Cards */}
                <div>
                  <h3 className={`text-base sm:text-lg md:text-xl font-bold mb-3 sm:mb-4 md:mb-6 transition-colors duration-500 ${
                    isDay ? 'text-slate-800' : 'text-slate-100'
                  }`}>
                    Project Timeline
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2 sm:gap-3 md:gap-4">
                    {project.projectPhases.map((phase, index) => (
                      <div key={index} className={`p-3 sm:p-4 rounded-lg border transition-all duration-500 hover:scale-105 ${
                        isDay 
                          ? 'bg-slate-50 border-slate-200 hover:shadow-lg' 
                          : 'bg-slate-800/50 border-slate-600 hover:shadow-xl'
                      }`}>
                        <div className="flex items-center justify-between mb-2 sm:mb-3">
                          <span className={`text-xs px-2 py-1 rounded-full transition-all duration-500 ${
                            phase.status === 'Completed'
                              ? isDay
                                ? 'bg-green-100 text-green-700'
                                : 'bg-green-900/50 text-green-300'
                              : isDay
                                ? 'bg-blue-100 text-blue-700'
                                : 'bg-blue-900/50 text-blue-300'
                          }`}>
                            {phase.status}
                          </span>
                          <span className={`text-xs sm:text-sm font-medium transition-colors duration-500 ${
                            isDay ? 'text-slate-600' : 'text-slate-400'
                          }`}>
                            {phase.duration}
                          </span>
                        </div>
                        <h4 className={`text-sm sm:text-base font-semibold mb-2 transition-colors duration-500 ${
                          isDay ? 'text-slate-800' : 'text-slate-200'
                        }`}>
                          {phase.phase}
                        </h4>
                        <p className={`text-xs sm:text-sm transition-colors duration-500 ${
                          isDay ? 'text-slate-600' : 'text-slate-400'
                        }`}>
                          {phase.description}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Challenges & Solutions - Side by Side */}
                <div className="grid md:grid-cols-2 gap-4 sm:gap-6">
                  <div>
                    <h3 className={`text-base sm:text-lg font-semibold mb-3 sm:mb-4 transition-colors duration-500 ${
                      isDay ? 'text-slate-800' : 'text-slate-100'
                    }`}>
                      Challenges
                    </h3>
                    <div className="space-y-2 sm:space-y-3">
                      {project.challenges.map((challenge, index) => (
                        <div key={index} className={`flex items-start gap-2 sm:gap-3 p-2 sm:p-3 rounded-lg transition-all duration-500 ${
                          isDay ? 'bg-red-50 border border-red-100' : 'bg-red-900/20 border border-red-400/30'
                        }`}>
                          <AlertCircle className={`w-4 h-4 sm:w-5 sm:h-5 mt-0.5 transition-colors duration-500 ${
                            isDay ? 'text-red-600' : 'text-red-400'
                          }`} />
                          <span className={`text-xs sm:text-sm transition-colors duration-500 ${
                            isDay ? 'text-red-800' : 'text-red-300'
                          }`}>
                            {challenge}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h3 className={`text-base sm:text-lg font-semibold mb-3 sm:mb-4 transition-colors duration-500 ${
                      isDay ? 'text-slate-800' : 'text-slate-100'
                    }`}>
                      Solutions
                    </h3>
                    <div className="space-y-2 sm:space-y-3">
                      {project.solutions.map((solution, index) => (
                        <div key={index} className={`flex items-start gap-2 sm:gap-3 p-2 sm:p-3 rounded-lg transition-all duration-500 ${
                          isDay ? 'bg-green-50 border border-green-100' : 'bg-green-900/20 border border-green-400/30'
                        }`}>
                          <CheckCircle2 className={`w-4 h-4 sm:w-5 sm:h-5 mt-0.5 transition-colors duration-500 ${
                            isDay ? 'text-green-600' : 'text-green-400'
                          }`} />
                          <span className={`text-xs sm:text-sm transition-colors duration-500 ${
                            isDay ? 'text-green-800' : 'text-green-300'
                          }`}>
                            {solution}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Uniqueness - Horizontal Cards */}
                <div>
                  <h3 className={`text-base sm:text-lg md:text-xl font-bold mb-3 sm:mb-4 transition-colors duration-500 ${
                    isDay ? 'text-slate-800' : 'text-slate-100'
                  }`}>
                    What Makes This Project Unique
                  </h3>
                  <div className="grid sm:grid-cols-2 gap-3 sm:gap-4">
                    {project.uniqueness.map((point, index) => (
                      <div key={index} className={`flex items-start gap-3 p-3 sm:p-4 rounded-lg border transition-all duration-500 hover:scale-105 ${
                        isDay 
                          ? 'bg-gradient-to-br from-amber-50 to-orange-50 border-amber-200 hover:shadow-lg' 
                          : 'bg-gradient-to-br from-blue-900/20 to-indigo-900/20 border-blue-400/30 hover:shadow-xl'
                      }`}>
                        <Sparkles className={`w-4 h-4 sm:w-5 sm:h-5 mt-1 transition-colors duration-500 ${
                          isDay ? 'text-amber-600' : 'text-cyan-400'
                        }`} />
                        <span className={`text-xs sm:text-sm transition-colors duration-500 ${
                          isDay ? 'text-slate-700' : 'text-slate-300'
                        }`}>
                          {point}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Technical Details Tab - Compact Grid */}
            {activeTab === 'technical' && (
              <div className="space-y-4 sm:space-y-6 md:space-y-8">
                <div>
                  <h3 className={`text-base sm:text-lg md:text-xl font-bold mb-3 sm:mb-4 md:mb-6 transition-colors duration-500 ${
                    isDay ? 'text-slate-800' : 'text-slate-100'
                  }`}>
                    Technical Specifications
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2 sm:gap-3 md:gap-4">
                    {Object.entries(project.technicalSpecs).map(([key, value]) => (
                      <div key={key} className={`p-3 sm:p-4 rounded-lg border transition-all duration-500 ${
                        isDay 
                          ? 'bg-slate-50 border-slate-200' 
                          : 'bg-slate-800/50 border-slate-600'
                      }`}>
                        <div className={`text-xs sm:text-sm font-medium mb-1 sm:mb-2 transition-colors duration-500 ${
                          isDay ? 'text-slate-600' : 'text-slate-400'
                        }`}>
                          {key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}
                        </div>
                        <div className={`text-sm sm:text-base font-semibold transition-colors duration-500 ${
                          isDay ? 'text-slate-800' : 'text-slate-200'
                        }`}>
                          {value}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* System Features - Compact Grid */}
                <div>
                  <h3 className={`text-base sm:text-lg md:text-xl font-bold mb-3 sm:mb-4 transition-colors duration-500 ${
                    isDay ? 'text-slate-800' : 'text-slate-100'
                  }`}>
                    Advanced Features
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2 sm:gap-3">
                    {project.features.map((feature, index) => (
                      <div key={index} className={`flex items-center gap-2 sm:gap-3 p-2 sm:p-3 rounded-lg transition-all duration-500 ${
                        isDay ? 'bg-white border border-slate-200' : 'bg-slate-800 border border-slate-600'
                      }`}>
                        <CheckCircle2 className={`w-4 h-4 sm:w-5 sm:h-5 transition-colors duration-500 ${
                          isDay ? 'text-green-600' : 'text-green-400'
                        }`} />
                        <span className={`text-xs sm:text-sm transition-colors duration-500 ${
                          isDay ? 'text-slate-700' : 'text-slate-300'
                        }`}>
                          {feature}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Certifications - Horizontal Row */}
                {project.certifications && (
                  <div>
                    <h3 className={`text-base sm:text-lg md:text-xl font-bold mb-3 sm:mb-4 transition-colors duration-500 ${
                      isDay ? 'text-slate-800' : 'text-slate-100'
                    }`}>
                      Certifications & Compliance
                    </h3>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-3">
                      {project.certifications.map((cert, index) => (
                        <div key={index} className={`p-2 sm:p-3 text-center rounded-lg border transition-all duration-500 ${
                          isDay 
                            ? 'bg-blue-50 border-blue-200 text-blue-800' 
                            : 'bg-blue-900/20 border-blue-400/30 text-blue-300'
                        }`}>
                          <Shield className={`w-4 h-4 sm:w-5 sm:h-5 mx-auto mb-1 sm:mb-2 transition-colors duration-500 ${
                            isDay ? 'text-blue-600' : 'text-blue-400'
                          }`} />
                          <span className="text-xs sm:text-sm font-medium">{cert}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Results & Impact Tab - Compact Cards */}
            {activeTab === 'results' && (
              <div className="space-y-4 sm:space-y-6 md:space-y-8">
                <div>
                  <h3 className={`text-base sm:text-lg md:text-xl font-bold mb-3 sm:mb-4 md:mb-6 transition-colors duration-500 ${
                    isDay ? 'text-slate-800' : 'text-slate-100'
                  }`}>
                    Project Results & Impact
                  </h3>
                  <div className="grid sm:grid-cols-2 gap-3 sm:gap-4 md:gap-6">
                    {Object.entries(project.results).map(([key, value]) => (
                      <div key={key} className={`p-4 sm:p-6 rounded-lg border transition-all duration-500 hover:scale-105 ${
                        isDay 
                          ? 'bg-gradient-to-br from-white to-slate-50 border-slate-200 hover:shadow-xl' 
                          : 'bg-gradient-to-br from-slate-800 to-slate-700 border-slate-600 hover:shadow-2xl'
                      }`}>
                        <div className={`text-xs sm:text-sm font-medium mb-2 transition-colors duration-500 ${
                          isDay ? 'text-slate-600' : 'text-slate-400'
                        }`}>
                          {key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}
                        </div>
                        <div className={`text-base sm:text-lg md:text-xl font-bold mb-2 transition-colors duration-500 ${
                          isDay ? 'text-slate-800' : 'text-slate-100'
                        }`}>
                          {value}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Environmental Impact - Horizontal Row */}
                <div className={`p-4 sm:p-6 rounded-lg border transition-all duration-500 ${
                  isDay 
                    ? 'bg-gradient-to-br from-green-50 to-emerald-50 border-green-200' 
                    : 'bg-gradient-to-br from-green-900/20 to-emerald-900/20 border-green-400/30'
                }`}>
                  <h4 className={`text-base sm:text-lg font-semibold mb-3 sm:mb-4 transition-colors duration-500 ${
                    isDay ? 'text-green-800' : 'text-green-300'
                  }`}>
                    Environmental Impact
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4">
                    <div className="text-center">
                      <Leaf className={`w-8 h-8 sm:w-10 sm:h-10 mx-auto mb-2 transition-colors duration-500 ${
                        isDay ? 'text-green-600' : 'text-green-400'
                      }`} />
                      <div className={`text-base sm:text-lg md:text-xl font-bold mb-1 transition-colors duration-500 ${
                        isDay ? 'text-green-800' : 'text-green-300'
                      }`}>
                        {project.co2Saved}
                      </div>
                      <div className={`text-xs sm:text-sm transition-colors duration-500 ${
                        isDay ? 'text-green-600' : 'text-green-400'
                      }`}>
                        CO₂ Prevented
                      </div>
                    </div>
                    <div className="text-center">
                      <Battery className={`w-8 h-8 sm:w-10 sm:h-10 mx-auto mb-2 transition-colors duration-500 ${
                        isDay ? 'text-green-600' : 'text-green-400'
                      }`} />
                      <div className={`text-base sm:text-lg md:text-xl font-bold mb-1 transition-colors duration-500 ${
                        isDay ? 'text-green-800' : 'text-green-300'
                      }`}>
                        {project.energyGenerated}
                      </div>
                      <div className={`text-xs sm:text-sm transition-colors duration-500 ${
                        isDay ? 'text-green-600' : 'text-green-400'
                      }`}>
                        Clean Energy
                      </div>
                    </div>
                    <div className="text-center">
                      <Globe className={`w-8 h-8 sm:w-10 sm:h-10 mx-auto mb-2 transition-colors duration-500 ${
                        isDay ? 'text-green-600' : 'text-green-400'
                      }`} />
                      <div className={`text-base sm:text-lg md:text-xl font-bold mb-1 transition-colors duration-500 ${
                        isDay ? 'text-green-800' : 'text-green-300'
                      }`}>
                        25+
                      </div>
                      <div className={`text-xs sm:text-sm transition-colors duration-500 ${
                        isDay ? 'text-green-600' : 'text-green-400'
                      }`}>
                        Years Lifespan
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Testimonial Tab - Compact */}
            {activeTab === 'testimonial' && project.testimonial && (
              <div className="space-y-4 sm:space-y-6 md:space-y-8">
                <div className={`p-6 sm:p-8 rounded-lg border transition-all duration-500 ${
                  isDay 
                    ? 'bg-gradient-to-br from-white to-amber-50 border-amber-200' 
                    : 'bg-gradient-to-br from-slate-800 to-blue-900/20 border-blue-400/30'
                }`}>
                  <div className="text-center mb-4 sm:mb-6">
                    <Quote className={`w-8 h-8 sm:w-12 sm:h-12 mx-auto mb-3 sm:mb-4 transition-colors duration-500 ${
                      isDay ? 'text-amber-600' : 'text-cyan-400'
                    }`} />
                    <div className="flex justify-center mb-3">
                      {[...Array(project.testimonial.rating)].map((_, i) => (
                        <Star key={i} className={`w-4 h-4 sm:w-5 sm:h-5 transition-colors duration-500 ${
                          isDay ? 'text-amber-500 fill-current' : 'text-cyan-400 fill-current'
                        }`} />
                      ))}
                    </div>
                  </div>

                  <blockquote className={`text-sm sm:text-base md:text-lg leading-relaxed text-center mb-4 sm:mb-6 transition-colors duration-500 ${
                    isDay ? 'text-slate-700' : 'text-slate-300'
                  }`}>
                    &quot;{project.testimonial.quote}&quot;
                  </blockquote>

                  <div className="text-center">
                    <div className={`font-semibold text-sm sm:text-base mb-1 transition-colors duration-500 ${
                      isDay ? 'text-slate-800' : 'text-slate-200'
                    }`}>
                      {project.testimonial.author}
                    </div>
                    <div className={`text-xs sm:text-sm transition-colors duration-500 ${
                      isDay ? 'text-slate-600' : 'text-slate-400'
                    }`}>
                      {project.testimonial.position}
                    </div>
                  </div>
                </div>

                {/* Contact CTA - Compact */}
                <div className={`text-center p-4 sm:p-6 rounded-lg border transition-all duration-500 ${
                  isDay 
                    ? 'bg-slate-50 border-slate-200' 
                    : 'bg-slate-800/50 border-slate-600'
                }`}>
                  <h4 className={`text-base sm:text-lg font-semibold mb-2 sm:mb-3 transition-colors duration-500 ${
                    isDay ? 'text-slate-800' : 'text-slate-200'
                  }`}>
                    Ready to Start Your Solar Journey?
                  </h4>
                  <p className={`mb-3 sm:mb-4 text-sm sm:text-base transition-colors duration-500 ${
                    isDay ? 'text-slate-600' : 'text-slate-400'
                  }`}>
                    Get a free consultation and custom quote
                  </p>
                  <div className="flex flex-col sm:flex-row gap-2 sm:gap-3 justify-center">
                    <a href="tel:+918818880540" className={`inline-flex items-center gap-2 px-4 py-2 sm:px-5 sm:py-3 rounded-lg text-sm font-medium transition-all duration-300 ${
                      isDay 
                        ? 'bg-blue-600 text-white hover:bg-blue-700 shadow-md hover:shadow-lg' 
                        : 'bg-blue-600 text-white hover:bg-blue-700 shadow-md hover:shadow-lg'
                    }`}>
                      <Phone className="w-3 h-3 sm:w-4 sm:h-4" />
                      Call Now
                    </a>
                    <a href="mailto:info@autosysindore.com" className={`inline-flex items-center gap-2 px-4 py-2 sm:px-5 sm:py-3 rounded-lg text-sm font-medium border transition-all duration-300 ${
                      isDay 
                        ? 'border-slate-300 text-slate-700 hover:bg-slate-50' 
                        : 'border-slate-600 text-slate-300 hover:bg-slate-800'
                    }`}>
                      <Mail className="w-3 h-3 sm:w-4 sm:h-4" />
                      Get Quote
                    </a>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
