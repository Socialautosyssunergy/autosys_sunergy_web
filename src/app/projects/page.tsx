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
  ArrowRight,
  Star,
  Target,
  CheckCircle2,
  Play,
  ExternalLink
} from 'lucide-react';

interface Project {
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
  image?: string;
  status: 'Completed' | 'Ongoing' | 'Planning';
  energyGenerated?: string;
  co2Saved?: string;
  featured?: boolean;
}

const projects: Project[] = [
  {
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
    featured: true
  },
  {
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
    featured: true
  },
  {
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
    featured: true
  },
  {
    id: 'ganesh-mandir',
    title: 'Shri Ganesh Mandir Solar',
    client: 'Shri Ganesh Mandir',
    capacity: '120 kW',
    location: 'Khajrana, Indore',
    type: 'Religious',
    savings: '₹14L annually',
    year: '2023',
    description: 'Religious landmark solar installation providing sustainable energy for temple operations and community facilities.',
    features: ['Cultural Integration', 'Aesthetic Design', 'Community Benefits', 'Festival Load Management', 'Devotee Education'],
    status: 'Completed',
    energyGenerated: '180 MWh/year',
    co2Saved: '144 tons/year'
  },
  {
    id: 'schon-pharma',
    title: 'Schon Pharmaceuticals',
    client: 'Schon Pharmaceuticals',
    capacity: '115 kW',
    location: 'Pitra Parwat',
    type: 'Manufacturing',
    savings: '₹13L annually',
    year: '2023',
    description: 'Pharmaceutical production facility with precision power requirements and stringent quality standards.',
    features: ['Pharmaceutical Grade', 'Precision Power', 'Clean Room Support', 'Backup Systems', 'Regulatory Compliance'],
    status: 'Completed',
    energyGenerated: '172 MWh/year',
    co2Saved: '138 tons/year'
  },
  {
    id: 'cold-storage',
    title: 'Chhatrakaran Cold Storage',
    client: 'Chhatrakaran Cold Storage',
    capacity: '110 kW',
    location: 'Datoda',
    type: 'Commercial',
    savings: '₹12L annually',
    year: '2023',
    description: 'Cold storage facility optimization with solar power reducing energy costs for temperature-controlled operations.',
    features: ['Cold Chain Support', 'Energy Optimization', 'Temperature Monitoring', 'Grid Stability', 'Cost Reduction'],
    status: 'Completed',
    energyGenerated: '165 MWh/year',
    co2Saved: '132 tons/year'
  },
  {
    id: 'nayan-udhyog',
    title: 'Nayan Udhyog Manufacturing',
    client: 'Nayan Udhyog',
    capacity: '110 kW',
    location: 'Palda, Indore',
    type: 'Manufacturing',
    savings: '₹12L annually',
    year: '2022',
    description: 'Manufacturing unit solar installation supporting production operations with sustainable energy solutions.',
    features: ['Production Support', 'Load Balancing', 'Energy Efficiency', 'Cost Optimization', 'Environmental Benefits'],
    status: 'Completed',
    energyGenerated: '165 MWh/year',
    co2Saved: '132 tons/year'
  },
  {
    id: 'ashirwad-nursing',
    title: 'Ashirwad Nursing Homes',
    client: 'Ashirwad Nursing Homes',
    capacity: '100 kW',
    location: 'Ratlam',
    type: 'Healthcare',
    savings: '₹11L annually',
    year: '2022',
    description: 'Healthcare facility solar installation ensuring reliable power supply for critical medical operations.',
    features: ['Healthcare Critical', 'Reliable Power', 'Emergency Backup', 'Medical Equipment Support', 'Cost Savings'],
    status: 'Completed',
    energyGenerated: '150 MWh/year',
    co2Saved: '120 tons/year'
  },
  {
    id: 'south-valley-school',
    title: 'New South Valley International School',
    client: 'New South Valley International School',
    capacity: '100 kW',
    location: 'Betma',
    type: 'Educational',
    savings: '₹11L annually',
    year: '2022',
    description: 'International school solar project promoting sustainable education and environmental awareness among students.',
    features: ['Educational Integration', 'Student Learning', 'Environmental Education', 'Campus Sustainability', 'Future Ready'],
    status: 'Completed',
    energyGenerated: '150 MWh/year',
    co2Saved: '120 tons/year'
  }
];

const typeIcons = {
  Industrial: Factory,
  Educational: GraduationCap,
  Manufacturing: Building2,
  Healthcare: Users,
  Religious: Sun,
  Commercial: Building2
};

const typeColors = {
  Industrial: 'from-blue-500 to-blue-600',
  Educational: 'from-green-500 to-green-600',
  Manufacturing: 'from-purple-500 to-purple-600',
  Healthcare: 'from-red-500 to-red-600',
  Religious: 'from-blue-500 to-cyan-600',
  GiCommercial: 'from-indigo-500 to -indigo-600'
};

export default function ProjectsPage() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [filterType, setFilterType] = useState<string>('All');
  const { theme, isDay, isNight } = useTheme();
  
  const themeClasses = getThemeClasses(theme);
  const hoverEffects = getThemeHover(theme);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const filteredProjects = filterType === 'All' 
    ? projects 
    : projects.filter(project => project.type === filterType);

  const featuredProjects = projects.filter(project => project.featured);
  const totalCapacity = projects.reduce((sum, project) => sum + parseFloat(project.capacity.replace(' MW', '').replace(' kW', '') || '0'), 0);
  const totalSavings = projects.reduce((sum, project) => {
    const savings = project.savings.replace('₹', '').replace('Cr', '').replace('L', '');
    const multiplier = project.savings.includes('Cr') ? 10000000 : 100000;
    return sum + (parseFloat(savings) * multiplier);
  }, 0);

  return (
    <div className={`min-h-screen transition-all duration-500 ${
      isDay ? 'bg-white' : 'bg-slate-900'
    }`}>
      <Header isScrolled={isScrolled} />

      {/* Hero Section - Compact Mobile */}
      <section className={`pt-16 sm:pt-20 pb-8 sm:pb-12 md:pb-16 transition-all duration-500 ${
        isDay 
          ? 'bg-gradient-to-br from-blue-50 to-blue-100' 
          : 'bg-gradient-to-br from-slate-900 via-blue-900/20 to-indigo-900/10'
      }`}>
        <div className="w-full max-w-none px-4 sm:px-6 md:px-8">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-6 sm:mb-8 md:mb-12">
              <div className={`inline-flex items-center gap-1 sm:gap-2 px-2 sm:px-3 md:px-4 py-1 sm:py-1.5 md:py-2 rounded-full text-xs sm:text-sm font-medium mb-3 sm:mb-4 md:mb-6 transition-all duration-500 ${
                isDay 
                  ? 'bg-blue-100 text-blue-800 border border-blue-200' 
                  : 'bg-blue-900/50 text-blue-300 border border-blue-400/30'
              }`}>
                <Award className="w-3 h-3 sm:w-4 sm:h-4" />
                Award-Winning Solar Projects
              </div>
              
              <h1 className={`text-2xl sm:text-3xl md:text-5xl lg:text-6xl font-bold mb-3 sm:mb-4 md:mb-6 transition-colors duration-500 ${
                isDay ? 'text-slate-800' : 'text-slate-100'
              }`}>
                Our <span className={`bg-gradient-to-r ${
                  isDay 
                    ? 'from-blue-600 via-blue-600 to-blue-600' 
                    : 'from-blue-400 via-cyan-400 to-indigo-400'
                } bg-clip-text text-transparent`}>
                  Success Stories
                </span>
              </h1>
              
              <p className={`text-sm sm:text-base md:text-lg lg:text-xl max-w-3xl mx-auto mb-4 sm:mb-6 md:mb-8 transition-colors duration-500 ${
                isDay ? 'text-slate-600' : 'text-slate-300'
              }`}>
                <span className="block sm:hidden">Transforming energy with solar installations from 100kW to 5.4MW.</span>
                <span className="hidden sm:block">Transforming India&apos;s and the world&apos;s energy landscape with cutting-edge solar installations. 
                From 100kW residential projects to 5.4MW industrial powerhouses.</span>
              </p>

              {/* Stats Cards - Compact Mobile */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-2 sm:gap-4 md:gap-6 max-w-4xl mx-auto">
                {[
                  { label: 'Projects Completed', value: '2000+', icon: CheckCircle2 },
                  { label: 'Total Capacity', value: `${(totalCapacity/1000).toFixed(1)}MW`, icon: Zap },
                  { label: 'Annual Savings', value: `₹${(totalSavings/10000000).toFixed(1)}Cr`, icon: TrendingUp },
                  { label: 'CO₂ Prevented', value: '8000+ tons', icon: Leaf }
                ].map((stat, index) => {
                  const Icon = stat.icon;
                  return (
                    <div key={index} className={`p-3 sm:p-4 md:p-6 rounded-lg md:rounded-xl border transition-all duration-500 hover:scale-105 ${
                      isDay 
                        ? 'bg-white/70 border-blue-200 hover:border-blue-400 hover:shadow-blue-200' 
                        : 'bg-slate-800/50 border-slate-600 hover:border-blue-400 hover:shadow-blue-500/20'
                    } hover:shadow-lg backdrop-blur-sm`}>
                      <Icon className={`w-4 h-4 sm:w-6 sm:h-6 md:w-8 md:h-8 mx-auto mb-1 sm:mb-2 md:mb-3 transition-colors duration-500 ${
                        isDay ? 'text-blue-600' : 'text-cyan-400'
                      }`} />
                      <div className={`text-sm sm:text-lg md:text-2xl font-bold mb-1 transition-colors duration-500 ${
                        isDay ? 'text-slate-800' : 'text-slate-100'
                      }`}>
                        {stat.value}
                      </div>
                      <div className={`text-xs sm:text-sm transition-colors duration-500 ${
                        isDay ? 'text-slate-600' : 'text-slate-400'
                      }`}>
                        {stat.label}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Projects - Horizontal Compact Cards */}
      <section className={`py-8 sm:py-12 md:py-16 transition-all duration-500 ${
        isDay ? 'bg-slate-50' : 'bg-slate-800'
      }`}>
        <div className="w-full max-w-none px-4 sm:px-6 md:px-8">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-6 sm:mb-8 md:mb-12">
              <h2 className={`text-xl sm:text-2xl md:text-3xl font-bold mb-2 sm:mb-3 md:mb-4 transition-colors duration-500 ${
                isDay ? 'text-slate-800' : 'text-slate-100'
              }`}>
                Featured Success Stories
              </h2>
              <p className={`text-sm sm:text-base max-w-2xl mx-auto transition-colors duration-500 ${
                isDay ? 'text-slate-600' : 'text-slate-300'
              }`}>
                Our most impactful solar installations
              </p>
            </div>

            {/* Horizontal Cards */}
            <div className="space-y-3 sm:space-y-4">
              {featuredProjects.map((project, index) => {
                const TypeIcon = typeIcons[project.type];
                return (
                  <Link
                    key={project.id}
                    href={`/projects/${project.id}`}
                    className={`group flex items-center p-3 sm:p-4 md:p-6 rounded-lg md:rounded-xl border cursor-pointer transition-all duration-500 hover:scale-[1.02] ${
                      isDay 
                        ? 'bg-white border-blue-200 hover:border-blue-400 hover:shadow-lg hover:shadow-blue-200/20' 
                        : 'bg-slate-700/50 border-slate-600 hover:border-blue-400 hover:shadow-lg hover:shadow-blue-500/20'
                    }`}
                  >
                    {/* Icon and Type */}
                    <div className={`flex-shrink-0 p-2 sm:p-3 md:p-4 rounded-lg mr-3 sm:mr-4 md:mr-6 transition-all duration-500 ${
                      isDay ? 'bg-slate-50' : 'bg-slate-800'
                    }`}>
                      <TypeIcon className={`w-6 h-6 sm:w-8 sm:h-8 md:w-10 md:h-10 transition-colors duration-500 ${
                        isDay ? 'text-blue-600' : 'text-cyan-400'
                      }`} />
                    </div>

                    {/* Content */}
                    <div className="flex-1 min-w-0">
                      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                        <div className="flex-1 min-w-0">
                          <h3 className={`text-sm sm:text-base md:text-lg lg:text-xl font-bold mb-1 transition-colors duration-500 truncate ${
                            isDay ? 'text-slate-800' : 'text-slate-100'
                          }`}>
                            {project.title}
                          </h3>
                          <div className={`flex items-center gap-2 sm:gap-3 text-xs sm:text-sm mb-2 sm:mb-0 transition-colors duration-500 ${
                            isDay ? 'text-slate-600' : 'text-slate-400'
                          }`}>
                            <MapPin className="w-3 h-3 sm:w-4 sm:h-4 flex-shrink-0" />
                            <span className="truncate">{project.location}</span>
                            <span className="hidden sm:inline">•</span>
                            <span className="hidden sm:inline">{project.year}</span>
                          </div>
                        </div>
                        
                        {/* Capacity and Savings */}
                        <div className="flex items-center gap-3 sm:gap-4 md:gap-6 flex-shrink-0">
                          <div className="text-right">
                            <div className={`text-lg sm:text-xl md:text-2xl font-bold transition-colors duration-500 ${
                              isDay ? 'text-blue-600' : 'text-cyan-400'
                            }`}>
                              {project.capacity}
                            </div>
                            <div className={`text-xs transition-colors duration-500 ${
                              isDay ? 'text-slate-500' : 'text-slate-400'
                            }`}>
                              Capacity
                            </div>
                          </div>
                          <div className="text-right">
                            <div className={`text-lg sm:text-xl md:text-2xl font-bold transition-colors duration-500 ${
                              isDay ? 'text-green-600' : 'text-green-400'
                            }`}>
                              {project.savings}
                            </div>
                            <div className={`text-xs transition-colors duration-500 ${
                              isDay ? 'text-slate-500' : 'text-slate-400'
                            }`}>
                              Savings
                            </div>
                          </div>
                          
                          {/* Arrow */}
                          <div className={`transition-colors duration-500 ${
                            isDay ? 'text-blue-600' : 'text-cyan-400'
                          }`}>
                            <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 transition-transform duration-300 group-hover:translate-x-1" />
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Featured Badge */}
                    <div className={`absolute top-2 right-2 px-2 py-1 rounded-full text-xs font-semibold transition-all duration-500 ${
                      isDay 
                        ? 'bg-blue-100 text-blue-800 border border-blue-200' 
                        : 'bg-blue-900/70 text-blue-300 border border-blue-400/30'
                    }`}>
                      <Star className="w-3 h-3 inline mr-1" />
                      <span className="hidden sm:inline">Featured</span>
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* All Projects Section - Compact Mobile */}
      <section className={`py-8 sm:py-12 md:py-16 transition-all duration-500 ${
        isDay ? 'bg-white' : 'bg-slate-900'
      }`}>
        <div className="w-full max-w-none px-4 sm:px-6 md:px-8">
          <div className="max-w-6xl mx-auto">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4 sm:mb-6 md:mb-8">
              <div>
                <h2 className={`text-xl sm:text-2xl md:text-3xl font-bold mb-1 sm:mb-2 transition-colors duration-500 ${
                  isDay ? 'text-slate-800' : 'text-slate-100'
                }`}>
                  Complete Project Portfolio
                </h2>
                <p className={`text-sm sm:text-base transition-colors duration-500 ${
                  isDay ? 'text-slate-600' : 'text-slate-300'
                }`}>
                  Browse all our successful solar installations
                </p>
              </div>

              {/* Filter Buttons - Compact Mobile */}
              <div className="flex flex-wrap gap-1 sm:gap-2 mt-3 sm:mt-4 md:mt-0">
                {['All', ...Object.keys(typeIcons)].map((type) => (
                  <button
                    key={type}
                    onClick={() => setFilterType(type)}
                    className={`px-2 sm:px-3 md:px-4 py-1 sm:py-1.5 md:py-2 rounded md:rounded-lg text-xs sm:text-sm font-medium transition-all duration-300 ${
                      filterType === type
                        ? isDay
                          ? 'bg-blue-600 text-white shadow-md'
                          : 'bg-blue-600 text-white shadow-md'
                        : isDay
                          ? 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                          : 'bg-slate-700 text-slate-300 hover:bg-slate-600'
                    }`}
                  >
                    {type}
                  </button>
                ))}
              </div>
            </div>

            {/* All Projects - Horizontal Compact Cards */}
            <div className="space-y-2 sm:space-y-3">
              {filteredProjects.map((project) => {
                const TypeIcon = typeIcons[project.type];
                return (
                  <Link
                    key={project.id}
                    href={`/projects/${project.id}`}
                    className={`group flex items-center p-3 sm:p-4 rounded-lg border cursor-pointer transition-all duration-500 hover:scale-[1.01] ${
                      isDay 
                        ? 'bg-slate-50 border-slate-200 hover:border-blue-400 hover:shadow-md hover:shadow-blue-200/20' 
                        : 'bg-slate-800/50 border-slate-600 hover:border-blue-400 hover:shadow-md hover:shadow-blue-500/20'
                    }`}
                  >
                    {/* Icon and Type Badge */}
                    <div className={`flex-shrink-0 p-2 sm:p-3 rounded-lg mr-3 sm:mr-4 transition-all duration-500 ${
                      isDay ? 'bg-white' : 'bg-slate-700'
                    }`}>
                      <TypeIcon className={`w-5 h-5 sm:w-6 sm:h-6 transition-colors duration-500 ${
                        isDay ? 'text-blue-600' : 'text-cyan-400'
                      }`} />
                    </div>

                    {/* Content */}
                    <div className="flex-1 min-w-0">
                      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                        <div className="flex-1 min-w-0">
                          <h3 className={`text-sm sm:text-base font-semibold mb-1 transition-colors duration-500 truncate ${
                            isDay ? 'text-slate-800' : 'text-slate-100'
                          }`}>
                            {project.title}
                          </h3>
                          <div className={`flex items-center gap-2 text-xs sm:text-sm mb-2 sm:mb-0 transition-colors duration-500 ${
                            isDay ? 'text-slate-600' : 'text-slate-400'
                          }`}>
                            <MapPin className="w-3 h-3 sm:w-4 sm:h-4 flex-shrink-0" />
                            <span className="truncate">{project.location}</span>
                            <span className="hidden sm:inline">•</span>
                            <span className="hidden sm:inline">{project.year}</span>
                            <span className="hidden md:inline">•</span>
                            <span className={`hidden md:inline text-xs px-2 py-1 rounded transition-all duration-500 ${
                              isDay 
                                ? 'text-blue-700 bg-blue-100' 
                                : 'text-blue-300 bg-blue-900/50'
                            }`}>
                              {project.type}
                            </span>
                          </div>
                        </div>
                        
                        {/* Stats */}
                        <div className="flex items-center gap-3 sm:gap-4 flex-shrink-0">
                          <div className="text-right">
                            <div className={`text-sm sm:text-base font-bold transition-colors duration-500 ${
                              isDay ? 'text-blue-600' : 'text-cyan-400'
                            }`}>
                              {project.capacity}
                            </div>
                            <div className={`text-xs transition-colors duration-500 ${
                              isDay ? 'text-slate-500' : 'text-slate-400'
                            }`}>
                              Capacity
                            </div>
                          </div>
                          <div className="text-right">
                            <div className={`text-sm sm:text-base font-bold transition-colors duration-500 ${
                              isDay ? 'text-green-600' : 'text-green-400'
                            }`}>
                              {project.savings}
                            </div>
                            <div className={`text-xs transition-colors duration-500 ${
                              isDay ? 'text-slate-500' : 'text-slate-400'
                            }`}>
                              Savings
                            </div>
                          </div>
                          
                          {/* Status Badge */}
                          <span className={`text-xs px-2 py-1 rounded transition-all duration-500 ${
                            project.status === 'Completed'
                              ? isDay
                                ? 'text-green-700 bg-green-100'
                                : 'text-green-300 bg-green-900/50'
                              : isDay
                                ? 'text-blue-700 bg-blue-100'
                                : 'text-blue-300 bg-blue-900/50'
                          }`}>
                            {project.status}
                          </span>
                          
                          {/* Arrow */}
                          <div className={`transition-colors duration-500 ${
                            isDay ? 'text-blue-600' : 'text-cyan-400'
                          }`}>
                            <ExternalLink className="w-3 h-3 sm:w-4 sm:h-4 transition-transform duration-300 group-hover:scale-110" />
                          </div>
                        </div>
                      </div>
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
