'use client';
import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { useTheme } from '@/contexts/ThemeContext';
import { getThemeClasses } from '@/utils/themeUtils';
import Header from '@/components/home/Header';
import Footer from '@/components/home/Footer';
import { Search, Grid3X3, List, MapPin, Calendar, Users, ArrowRight, Filter, SortAsc } from 'lucide-react';
import Link from 'next/link';

// Gallery data
const galleryCategories = [
  { id: 'all', name: 'All Projects', count: 24 },
  { id: 'residential', name: 'Residential', count: 12 },
  { id: 'commercial', name: 'Commercial', count: 8 },
  { id: 'industrial', name: 'Industrial', count: 4 }
];

const galleryItems = [
  {
    id: 1,
    title: 'Modern Residential Installation',
    category: 'residential',
    location: 'Mumbai, Maharashtra',
    capacity: '5 kW',
    completedDate: '2024-03-15',
    images: ['/sample_solar_image.jpg', '/Solar_product_sample_image.jpg'],
    description: 'Premium rooftop solar installation for a modern home.',
    client: 'Private Residence',
    features: ['Grid-tied System', 'Net Metering', 'Smart Monitoring']
  },
  {
    id: 2,
    title: 'Corporate Office Complex',
    category: 'commercial',
    location: 'Delhi, NCR',
    capacity: '50 kW',
    completedDate: '2024-02-28',
    images: ['/Solar_services_sample_image.jpg', '/sample_solar_image.jpg'],
    description: 'Large-scale commercial solar solution for office building.',
    client: 'Tech Corporation',
    features: ['High Efficiency Panels', 'Battery Storage', 'Remote Monitoring']
  },
  {
    id: 3,
    title: 'Industrial Manufacturing Plant',
    category: 'industrial',
    location: 'Pune, Maharashtra',
    capacity: '200 kW',
    completedDate: '2024-01-20',
    images: ['/Solar_product_sample_image.jpg', '/Solar_services_sample_image.jpg'],
    description: 'Mega-scale industrial solar installation for manufacturing.',
    client: 'Manufacturing Company',
    features: ['Grid-tied System', 'Power Purchase Agreement', 'Maintenance Contract']
  },
  {
    id: 4,
    title: 'Villa Solar Rooftop',
    category: 'residential',
    location: 'Bangalore, Karnataka',
    capacity: '8 kW',
    completedDate: '2024-03-10',
    images: ['/sample_solar_image.jpg', '/Solar_product_sample_image.jpg'],
    description: 'Luxury villa solar installation with aesthetic integration.',
    client: 'Private Villa',
    features: ['Premium Panels', 'Micro Inverters', 'App Monitoring']
  },
  {
    id: 5,
    title: 'Shopping Mall Solar',
    category: 'commercial',
    location: 'Gurgaon, Haryana',
    capacity: '100 kW',
    completedDate: '2024-02-15',
    images: ['/Solar_services_sample_image.jpg', '/sample_solar_image.jpg'],
    description: 'Commercial solar installation for large shopping complex.',
    client: 'Mall Management',
    features: ['Bifacial Panels', 'String Inverters', 'Energy Analytics']
  },
  {
    id: 6,
    title: 'Apartment Complex',
    category: 'residential',
    location: 'Chennai, Tamil Nadu',
    capacity: '25 kW',
    completedDate: '2024-03-05',
    images: ['/Solar_product_sample_image.jpg', '/Solar_services_sample_image.jpg'],
    description: 'Community solar project for residential apartment complex.',
    client: 'Residential Society',
    features: ['Shared Solar', 'Individual Metering', 'Community Benefits']
  }
];

export default function GalleryPage() {
  const { theme, isDay, isNight } = useTheme();
  const themeClasses = getThemeClasses(theme);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeCategory, setActiveCategory] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [sortBy, setSortBy] = useState('date');
  const [selectedItem, setSelectedItem] = useState<number | null>(null);

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Filter gallery items
  const filteredItems = galleryItems.filter(item => {
    const matchesCategory = activeCategory === 'all' || item.category === activeCategory;
    const matchesSearch = item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.location.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  // Sort gallery items
  const sortedItems = [...filteredItems].sort((a, b) => {
    switch (sortBy) {
      case 'date':
        return new Date(b.completedDate).getTime() - new Date(a.completedDate).getTime();
      case 'capacity':
        return parseInt(b.capacity) - parseInt(a.capacity);
      case 'name':
        return a.title.localeCompare(b.title);
      default:
        return 0;
    }
  });

  return (
    <div className={`min-h-screen transition-all duration-500 ${themeClasses.background}`}>
      <Header isScrolled={isScrolled} />
      
      {/* Hero Section */}
      <section className={`pt-20 pb-16 transition-all duration-500 ${
        isDay 
          ? 'bg-gradient-to-br from-blue-50 via-white to-blue-50/30' 
          : 'bg-gradient-to-br from-slate-900 via-blue-900/50 to-slate-800'
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className={`text-4xl md:text-6xl font-bold mb-6 transition-colors duration-500 ${
              isDay ? 'text-slate-800' : 'text-white'
            }`}>
              Project <span className={`bg-gradient-to-r ${
                isDay 
                  ? 'from-blue-600 to-purple-600' 
                  : 'from-blue-400 to-purple-400'
              } bg-clip-text text-transparent`}>Gallery</span>
            </h1>
            <p className={`text-xl max-w-3xl mx-auto transition-colors duration-500 ${
              isDay ? 'text-slate-600' : 'text-slate-300'
            }`}>
              Explore our extensive portfolio of successful solar installations across India. 
              From residential rooftops to large industrial complexes.
            </p>
          </div>
        </div>
      </section>

      {/* Filter Section */}
      <section className={`py-8 sticky top-14 z-30 backdrop-blur-lg border-b transition-all duration-500 ${
        isDay 
          ? 'bg-white/90 border-gray-200' 
          : 'bg-slate-900/90 border-slate-700'
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row gap-4 items-center justify-between">
            
            {/* Category Filters */}
            <div className="flex flex-wrap gap-2">
              {galleryCategories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => setActiveCategory(category.id)}
                  className={`px-4 py-2 rounded-lg font-medium transition-all duration-300 ${
                    activeCategory === category.id
                      ? isDay 
                        ? 'bg-blue-600 text-white shadow-lg' 
                        : 'bg-blue-500 text-white shadow-lg'
                      : isDay
                        ? 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                        : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                  }`}
                >
                  {category.name}
                  <span className="ml-2 text-sm opacity-75">({category.count})</span>
                </button>
              ))}
            </div>

            {/* Search and Controls */}
            <div className="flex items-center gap-4">
              {/* Search */}
              <div className="relative">
                <Search className={`absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 ${
                  isDay ? 'text-gray-400' : 'text-slate-400'
                }`} />
                <input
                  type="text"
                  placeholder="Search projects..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className={`pl-10 pr-4 py-2 rounded-lg border transition-all duration-300 ${
                    isDay 
                      ? 'bg-white border-gray-300 text-gray-900 focus:border-blue-500' 
                      : 'bg-slate-800 border-slate-600 text-white focus:border-blue-400'
                  } focus:outline-none focus:ring-2 focus:ring-blue-500/20`}
                />
              </div>

              {/* Sort */}
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className={`px-3 py-2 rounded-lg border transition-all duration-300 ${
                  isDay 
                    ? 'bg-white border-gray-300 text-gray-900' 
                    : 'bg-slate-800 border-slate-600 text-white'
                } focus:outline-none focus:border-blue-500`}
              >
                <option value="date">Latest First</option>
                <option value="capacity">Capacity</option>
                <option value="name">Name A-Z</option>
              </select>

              {/* View Mode */}
              <div className={`flex rounded-lg overflow-hidden border ${
                isDay ? 'border-gray-300' : 'border-slate-600'
              }`}>
                <button
                  onClick={() => setViewMode('grid')}
                  className={`p-2 transition-colors ${
                    viewMode === 'grid' 
                      ? isDay ? 'bg-blue-600 text-white' : 'bg-blue-500 text-white'
                      : isDay ? 'bg-white text-gray-700 hover:bg-gray-50' : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                  }`}
                >
                  <Grid3X3 className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={`p-2 transition-colors ${
                    viewMode === 'list' 
                      ? isDay ? 'bg-blue-600 text-white' : 'bg-blue-500 text-white'
                      : isDay ? 'bg-white text-gray-700 hover:bg-gray-50' : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                  }`}
                >
                  <List className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>

          {/* Results Summary */}
          <div className="mt-4">
            <p className={`text-sm ${isDay ? 'text-gray-600' : 'text-slate-400'}`}>
              Showing {sortedItems.length} of {galleryItems.length} projects
            </p>
          </div>
        </div>
      </section>

      {/* Gallery Grid/List */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {viewMode === 'grid' ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {sortedItems.map((item) => (
                <div 
                  key={item.id}
                  className={`group rounded-2xl overflow-hidden shadow-lg transition-all duration-300 hover:shadow-2xl hover:scale-105 ${
                    isDay ? 'bg-white border border-gray-200' : 'bg-slate-800 border border-slate-700'
                  }`}
                >
                  {/* Image */}
                  <div className="relative h-48 overflow-hidden">
                    <Image
                      src={item.images[0]}
                      alt={item.title}
                      fill
                      className="object-cover transform group-hover:scale-110 transition-transform duration-500"
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      priority={item.id <= 6}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <div className="absolute bottom-4 left-4 text-white">
                        <div className="flex items-center gap-2 text-sm">
                          <Calendar className="w-4 h-4" />
                          {new Date(item.completedDate).toLocaleDateString()}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-6">
                    <div className="flex items-center justify-between mb-2">
                      <span className={`text-xs font-medium px-2 py-1 rounded-full ${
                        item.category === 'residential' ? 'bg-green-100 text-green-700' :
                        item.category === 'commercial' ? 'bg-blue-100 text-blue-700' :
                        'bg-purple-100 text-purple-700'
                      }`}>
                        {item.category.charAt(0).toUpperCase() + item.category.slice(1)}
                      </span>
                      <span className={`text-sm font-bold ${
                        isDay ? 'text-blue-600' : 'text-blue-400'
                      }`}>
                        {item.capacity}
                      </span>
                    </div>

                    <h3 className={`text-lg font-bold mb-2 ${themeClasses.textPrimary}`}>
                      {item.title}
                    </h3>

                    <div className={`flex items-center gap-1 mb-3 text-sm ${themeClasses.textSecondary}`}>
                      <MapPin className="w-4 h-4" />
                      {item.location}
                    </div>

                    <p className={`text-sm mb-4 line-clamp-2 ${themeClasses.textSecondary}`}>
                      {item.description}
                    </p>

                    <div className="flex items-center justify-between">
                      <div className={`text-xs ${themeClasses.textSecondary}`}>
                        {item.client}
                      </div>
                      <button
                        onClick={() => setSelectedItem(item.id)}
                        className={`flex items-center gap-1 text-sm font-medium transition-colors ${
                          isDay ? 'text-blue-600 hover:text-blue-700' : 'text-blue-400 hover:text-blue-300'
                        }`}
                      >
                        View Details
                        <ArrowRight className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="space-y-6">
              {sortedItems.map((item) => (
                <div 
                  key={item.id}
                  className={`rounded-2xl overflow-hidden shadow-lg transition-all duration-300 hover:shadow-xl ${
                    isDay ? 'bg-white border border-gray-200' : 'bg-slate-800 border border-slate-700'
                  }`}
                >
                  <div className="flex flex-col md:flex-row">
                    {/* Image */}
                    <div className="md:w-1/3 h-48 md:h-auto relative">
                      <Image
                        src={item.images[0]}
                        alt={item.title}
                        fill
                        className="object-cover"
                        sizes="(max-width: 768px) 100vw, 33vw"
                      />
                    </div>

                    {/* Content */}
                    <div className="md:w-2/3 p-6">
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center gap-4">
                          <span className={`text-xs font-medium px-2 py-1 rounded-full ${
                            item.category === 'residential' ? 'bg-green-100 text-green-700' :
                            item.category === 'commercial' ? 'bg-blue-100 text-blue-700' :
                            'bg-purple-100 text-purple-700'
                          }`}>
                            {item.category.charAt(0).toUpperCase() + item.category.slice(1)}
                          </span>
                          <span className={`text-sm ${themeClasses.textSecondary}`}>
                            Completed: {new Date(item.completedDate).toLocaleDateString()}
                          </span>
                        </div>
                        <span className={`text-lg font-bold ${
                          isDay ? 'text-blue-600' : 'text-blue-400'
                        }`}>
                          {item.capacity}
                        </span>
                      </div>

                      <h3 className={`text-xl font-bold mb-2 ${themeClasses.textPrimary}`}>
                        {item.title}
                      </h3>

                      <div className={`flex items-center gap-1 mb-3 ${themeClasses.textSecondary}`}>
                        <MapPin className="w-4 h-4" />
                        {item.location}
                      </div>

                      <p className={`mb-4 ${themeClasses.textSecondary}`}>
                        {item.description}
                      </p>

                      <div className="flex items-center justify-between">
                        <div className="flex flex-wrap gap-2">
                          {item.features.slice(0, 3).map((feature, index) => (
                            <span 
                              key={index}
                              className={`text-xs px-2 py-1 rounded ${
                                isDay ? 'bg-blue-50 text-blue-700' : 'bg-blue-900/30 text-blue-300'
                              }`}
                            >
                              {feature}
                            </span>
                          ))}
                        </div>
                        <button
                          onClick={() => setSelectedItem(item.id)}
                          className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-colors ${
                            isDay 
                              ? 'bg-blue-600 text-white hover:bg-blue-700' 
                              : 'bg-blue-500 text-white hover:bg-blue-600'
                          }`}
                        >
                          View Details
                          <ArrowRight className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* No Results */}
          {sortedItems.length === 0 && (
            <div className="text-center py-12">
              <div className={`text-6xl mb-4 ${themeClasses.textSecondary}`}>🔍</div>
              <h3 className={`text-xl font-bold mb-2 ${themeClasses.textPrimary}`}>
                No Projects Found
              </h3>
              <p className={themeClasses.textSecondary}>
                Try adjusting your search criteria or category filter.
              </p>
            </div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className={`py-20 ${
        isDay 
          ? 'bg-gradient-to-r from-blue-600 to-purple-600' 
          : 'bg-gradient-to-r from-blue-500 to-purple-500'
      }`}>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Ready to Start Your Solar Journey?
          </h2>
          <p className="text-xl text-white/90 mb-8">
            Join hundreds of satisfied customers who have made the switch to clean, renewable energy.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              href="/contact"
              className="px-8 py-3 bg-white text-blue-600 font-semibold rounded-lg hover:bg-gray-100 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
            >
              Get Free Quote
            </Link>
            <Link 
              href="/projects"
              className="px-8 py-3 border-2 border-white text-white font-semibold rounded-lg hover:bg-white/10 transition-all duration-300"
            >
              View All Projects
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
