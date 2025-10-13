'use client';
import React, { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { Search, Grid3X3, List, Star, TrendingUp, Filter } from 'lucide-react';
import { useTheme } from '@/contexts/ThemeContext';
import { getThemeClasses, getThemeGradient, getThemeShadow, getThemeHover, TRANSITION_CLASSES } from '@/utils/themeUtils';

export default function PremiumServices() {
  const [activeFilter, setActiveFilter] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');
  const [hoveredService, setHoveredService] = useState<number | null>(null);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const { theme, isDay, isNight } = useTheme();
  
  const themeClasses = getThemeClasses(theme);
  const hoverEffects = getThemeHover(theme);

  const services = [
    {
      id: 1,
      title: 'Residential Solar',
      shortDescription: 'Complete home solar solutions with net metering support',
      category: 'Residential',
      capacity: '1kW - 10kW',
      startingPrice: '₹45,000',
      features: ['Net Metering', 'MNRE Subsidy', '0% EMI', 'Free Insurance'],
      icon: 'house',
      gradient: 'from-blue-500 to-blue-600',
      bgGradient: 'from-blue-50 to-slate-50',
      image: '/api/placeholder/300/200',
      trending: true,
      rating: 4.9,
      installations: '1200+'
    },
    {
      id: 2,
      title: 'Commercial Solar',
      shortDescription: 'Large-scale installations for businesses and industries',
      category: 'Commercial',
      capacity: '10kW - 1MW+',
      startingPrice: '₹35,000/kW',
      features: ['Industrial Scale', 'ROI Guarantee', 'Performance Monitoring', 'O&M Support'],
      icon: 'building',
      gradient: 'from-slate-500 to-slate-600',
      bgGradient: 'from-slate-50 to-gray-50',
      image: '/api/placeholder/300/200',
      trending: false,
      rating: 4.8,
      installations: '500+'
    },
    {
      id: 3,
      title: 'Solar Water Pumping',
      shortDescription: 'Agricultural and domestic water pumping solutions',
      category: 'Agricultural',
      capacity: '1HP - 50HP',
      startingPrice: '₹75,000',
      features: ['DC Solar Pumps', 'AC Solar Pumps', 'Auto Controllers', 'Bore Well Compatible'],
      icon: 'water',
      gradient: 'from-blue-600 to-cyan-600',
      bgGradient: 'from-blue-50 to-cyan-50',
      image: '/api/placeholder/300/200',
      trending: true,
      rating: 4.7,
      installations: '800+'
    },
    {
      id: 4,
      title: 'Street Lighting',
      shortDescription: 'Intelligent solar street lighting with smart controls',
      category: 'Infrastructure',
      capacity: '20W - 150W',
      startingPrice: '₹12,000',
      features: ['Smart Controllers', 'Motion Sensors', 'LED Technology', 'Weather Resistant'],
      icon: 'light',
      gradient: 'from-gray-500 to-gray-600',
      bgGradient: 'from-gray-50 to-slate-50',
      image: '/api/placeholder/300/200',
      trending: false,
      rating: 4.6,
      installations: '300+'
    },
    {
      id: 5,
      title: 'EV Charging Stations',
      shortDescription: 'Solar-powered electric vehicle charging infrastructure',
      category: 'Infrastructure',
      capacity: '7kW - 50kW',
      startingPrice: '₹1,25,000',
      features: ['Fast Charging', 'Solar Integration', 'Smart Billing', 'Multiple Connectors'],
      icon: 'charging',
      gradient: 'from-indigo-500 to-indigo-600',
      bgGradient: 'from-indigo-50 to-blue-50',
      image: '/api/placeholder/300/200',
      trending: true,
      rating: 4.8,
      installations: '150+'
    },
    {
      id: 6,
      title: 'O&M Services',
      shortDescription: 'Comprehensive maintenance and monitoring services',
      category: 'Maintenance',
      capacity: 'All Systems',
      startingPrice: '₹2,000/month',
      features: ['24/7 Monitoring', 'Preventive Maintenance', 'Performance Analytics', 'Technical Support'],
      icon: 'maintenance',
      gradient: 'from-slate-600 to-gray-600',
      bgGradient: 'from-slate-50 to-gray-50',
      image: '/api/placeholder/300/200',
      trending: false,
      rating: 4.9,
      installations: '2000+'
    }
  ];

  const categories = ['All', 'Residential', 'Commercial', 'Agricultural', 'Infrastructure', 'Maintenance'];

  // Filter services based on active filter and search term
  const filteredServices = services.filter(service => {
    const matchesCategory = activeFilter === 'All' || service.category === activeFilter;
    const matchesSearch = service.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         service.shortDescription.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

const router = useRouter();

const handleServiceClick = (serviceId: number) => {
  // Navigate to contact page with the selected service as a query param
  const service = services.find(s => s.id === serviceId);
  if (service) {
      const query = `service=${encodeURIComponent(service.title)}`;
      router.push(`/contact?${query}&source=services`);
    }
  };

  return (
    <section id="services" className={`py-16 ${TRANSITION_CLASSES.normal} ${
      isDay 
        ? 'bg-gradient-to-br from-amber-50 via-orange-50 to-amber-100' 
        : 'bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900'
    }`}>
      <div className="w-full max-w-none px-8">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className={`text-4xl font-bold mb-4 ${themeClasses.textPrimary} ${TRANSITION_CLASSES.colors}`}>
            Professional Solar Services
          </h2>
          <p className={`text-lg max-w-2xl mx-auto mb-6 ${themeClasses.textSecondary} ${TRANSITION_CLASSES.colors}`}>
            Enterprise-grade solar solutions engineered for optimal performance
          </p>
          
          {/* Services Badge */}
          <div className={`inline-flex items-center space-x-2 px-6 py-2 rounded-lg ${TRANSITION_CLASSES.normal} ${
            isDay 
              ? 'bg-gradient-to-r from-amber-500 to-orange-500 text-white shadow-lg shadow-amber-500/25' 
              : 'bg-gradient-to-r from-blue-600 to-cyan-600 text-white shadow-lg shadow-blue-500/25'
          }`}>
            <span className="font-semibold text-sm">8 Professional Services</span>
          </div>
        </div>

        {/* Category Filter - Compact */}
        <div className="flex justify-center gap-2 mb-8">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setActiveFilter(category)}
              className={`px-4 py-2 rounded-lg font-medium text-sm ${TRANSITION_CLASSES.normal} ${hoverEffects.scale} ${
                activeFilter === category
                  ? isDay
                    ? 'bg-gradient-to-r from-amber-500 to-orange-500 text-white shadow-md shadow-amber-500/25'
                    : 'bg-gradient-to-r from-blue-600 to-cyan-600 text-white shadow-md shadow-blue-500/25'
                  : isDay
                    ? 'bg-white/80 text-slate-700 border border-amber-200 hover:border-amber-400 hover:bg-amber-50'
                    : 'bg-slate-800/50 text-slate-200 border border-slate-600 hover:border-blue-400 hover:bg-slate-700/50'
              }`}
            >
              {category}
              {category !== 'All' && (
                <span className={`ml-1 text-xs px-1 py-0.5 rounded ${
                  activeFilter === category 
                    ? 'bg-white/20' 
                    : isDay 
                      ? 'bg-amber-100 text-amber-700' 
                      : 'bg-blue-900/50 text-blue-300'
                }`}>
                  {services.filter(s => s.category === category).length}
                </span>
              )}
            </button>
          ))}
        </div>

        {/* Horizontal Scrollable Services */}
        <div className="relative">
          <div className="overflow-x-auto pb-4">
            <div className="flex space-x-6 w-max">
              {filteredServices.map((service, index) => (
                <div
                  key={service.id}
                  className={`group relative rounded-xl overflow-hidden shadow-lg hover:shadow-xl cursor-pointer w-80 flex-shrink-0 border ${TRANSITION_CLASSES.normal} ${hoverEffects.scale} ${hoverEffects.glow} ${
                    isDay 
                      ? 'bg-white/80 backdrop-blur-sm border-amber-200 hover:border-amber-400' 
                      : 'bg-slate-800/80 backdrop-blur-sm border-slate-600 hover:border-blue-400'
                  }`}
                  onMouseEnter={() => setHoveredService(service.id)}
                  onMouseLeave={() => setHoveredService(null)}
                  onClick={() => handleServiceClick(service.id)}
                >

                  {/* Service Image - Professional */}
                  <div className={`relative h-32 overflow-hidden ${TRANSITION_CLASSES.normal} ${
                    isDay 
                      ? `bg-gradient-to-br from-amber-100 to-orange-200` 
                      : `bg-gradient-to-br from-slate-700 to-blue-800`
                  }`}>
                    {/* Sample Image Only (optimized) */}
                    <Image
                      src="/sample_solar_image.jpg"
                      alt={service.title}
                      fill
                      sizes="(max-width: 640px) 100vw, 320px"
                      priority={index < 2}
                      className="object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
                  </div>

                  {/* Service Content - Professional */}
                  <div className="p-4">
                    <h3 className={`text-lg font-bold mb-2 line-clamp-1 ${TRANSITION_CLASSES.colors} ${
                      isDay 
                        ? 'text-slate-900 group-hover:text-amber-600' 
                        : 'text-slate-100 group-hover:text-cyan-400'
                    }`}>
                      {service.title}
                    </h3>
                    
                    {/* Capacity & Installations Row */}
                    <div className="flex justify-between items-center text-sm mb-4">
                      <span className={`${themeClasses.textSecondary} ${TRANSITION_CLASSES.colors}`}>
                        {service.capacity}
                      </span>
                      <span className={`font-medium ${TRANSITION_CLASSES.colors} ${
                        isDay ? 'text-amber-600' : 'text-cyan-400'
                      }`}>
                        {service.installations}
                      </span>
                    </div>

                    {/* Professional Action Button */}
                    <button 
                      className={`w-full py-2.5 rounded-lg font-semibold text-sm text-white ${TRANSITION_CLASSES.normal} ${hoverEffects.scale} ${
                        isDay 
                          ? 'bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 shadow-md hover:shadow-amber-500/25' 
                          : 'bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 shadow-md hover:shadow-blue-500/25'
                      }`}
                      onClick={(e) => {
                        e.stopPropagation();
                        handleServiceClick(service.id);
                      }}
                    >
                      Request Quote
                    </button>
                  </div>

                  {/* Hover Effect */}
                  <div className={`absolute inset-0 opacity-0 group-hover:opacity-5 rounded-xl ${TRANSITION_CLASSES.normal} ${
                    isDay 
                      ? 'bg-gradient-to-br from-amber-400 to-orange-500' 
                      : 'bg-gradient-to-br from-blue-500 to-cyan-600'
                  }`}></div>
                </div>
              ))}
            </div>
          </div>
          
          {/* Scroll Indicators */}
          <div className="flex justify-center mt-4 space-x-1">
            {Array.from({ length: Math.ceil(filteredServices.length / 4) }).map((_, index) => (
              <div key={index} className={`w-2 h-2 rounded-full ${TRANSITION_CLASSES.normal} ${
                isDay ? 'bg-amber-300' : 'bg-blue-400'
              }`}></div>
            ))}
          </div>
        </div>

        {/* No Results */}
        {filteredServices.length === 0 && (
          <div className="text-center py-12">
            <div className={`text-4xl mb-3 ${themeClasses.textSecondary} ${TRANSITION_CLASSES.colors}`}>⚠</div>
            <h3 className={`text-xl font-bold mb-2 ${themeClasses.textPrimary} ${TRANSITION_CLASSES.colors}`}>
              No Services Found
            </h3>
            <p className={`mb-4 ${themeClasses.textSecondary} ${TRANSITION_CLASSES.colors}`}>
              Try adjusting your filter criteria
            </p>
            <button 
              onClick={() => {
                setActiveFilter('All');
                setSearchTerm('');
              }}
              className={`px-4 py-2 rounded-lg font-semibold text-sm text-white ${TRANSITION_CLASSES.normal} ${hoverEffects.scale} ${
                isDay 
                  ? 'bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600' 
                  : 'bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700'
              }`}
            >
              Clear Filters
            </button>
          </div>
        )}

        {/* Professional Service Stats */}
        <div className="mt-12 grid grid-cols-4 gap-6 max-w-3xl mx-auto">
          <div className={`rounded-xl p-4 shadow-md hover:shadow-lg text-center group border ${TRANSITION_CLASSES.normal} ${hoverEffects.glow} ${
            isDay 
              ? 'bg-white/80 border-amber-200 hover:bg-amber-50' 
              : 'bg-slate-800/50 border-slate-600 hover:bg-slate-700/50'
          }`}>
            <div className={`text-2xl font-bold mb-1 group-hover:scale-110 ${TRANSITION_CLASSES.transform} ${
              isDay ? 'text-amber-600' : 'text-cyan-400'
            }`}>8+</div>
            <div className={`text-sm ${themeClasses.textSecondary} ${TRANSITION_CLASSES.colors}`}>Services</div>
          </div>
          <div className={`rounded-xl p-4 shadow-md hover:shadow-lg text-center group border ${TRANSITION_CLASSES.normal} ${hoverEffects.glow} ${
            isDay 
              ? 'bg-white/80 border-amber-200 hover:bg-amber-50' 
              : 'bg-slate-800/50 border-slate-600 hover:bg-slate-700/50'
          }`}>
            <div className={`text-2xl font-bold mb-1 group-hover:scale-110 ${TRANSITION_CLASSES.transform} ${
              isDay ? 'text-orange-600' : 'text-blue-400'
            }`}>24/7</div>
            <div className={`text-sm ${themeClasses.textSecondary} ${TRANSITION_CLASSES.colors}`}>Support</div>
          </div>
          <div className={`rounded-xl p-4 shadow-md hover:shadow-lg text-center group border ${TRANSITION_CLASSES.normal} ${hoverEffects.glow} ${
            isDay 
              ? 'bg-white/80 border-amber-200 hover:bg-amber-50' 
              : 'bg-slate-800/50 border-slate-600 hover:bg-slate-700/50'
          }`}>
            <div className={`text-2xl font-bold mb-1 group-hover:scale-110 ${TRANSITION_CLASSES.transform} ${
              isDay ? 'text-amber-600' : 'text-cyan-400'
            }`}>4.8★</div>
            <div className={`text-sm ${themeClasses.textSecondary} ${TRANSITION_CLASSES.colors}`}>Rating</div>
          </div>
          <div className={`rounded-xl p-4 shadow-md hover:shadow-lg text-center group border ${TRANSITION_CLASSES.normal} ${hoverEffects.glow} ${
            isDay 
              ? 'bg-white/80 border-amber-200 hover:bg-amber-50' 
              : 'bg-slate-800/50 border-slate-600 hover:bg-slate-700/50'
          }`}>
            <div className={`text-2xl font-bold mb-1 group-hover:scale-110 ${TRANSITION_CLASSES.transform} ${
              isDay ? 'text-orange-600' : 'text-blue-400'
            }`}>5000+</div>
            <div className={`text-sm ${themeClasses.textSecondary} ${TRANSITION_CLASSES.colors}`}>Customers</div>
          </div>
        </div>
      </div>
    </section>
  );
}
