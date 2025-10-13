'use client';
import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ShoppingCart, Star, Badge, TrendingUp, Filter, Grid3X3 } from 'lucide-react';
import { useTheme } from '@/contexts/ThemeContext';
import { getThemeClasses, getThemeGradient, getThemeShadow, getThemeHover, TRANSITION_CLASSES } from '@/utils/themeUtils';

export default function EcommerceProducts() {
  const [selectedCategory, setSelectedCategory] = useState('panels');
  const [sortBy, setSortBy] = useState('popularity');
  const { theme, isDay, isNight } = useTheme();
  
  const themeClasses = getThemeClasses(theme);
  const hoverEffects = getThemeHover(theme);

  const categories = [
    { id: 'panels', name: 'Solar Panels', icon: '⬜' },
    { id: 'inverters', name: 'Solar Inverters', icon: '⬜' },
    { id: 'batteries', name: 'Solar Batteries', icon: '⬜' },
    { id: 'accessories', name: 'Accessories', icon: '⬜' }
  ];

  const solarPanels = [
    {
      id: 1,
      name: 'Novasys Mono-PERC 540W',
      brand: 'Novasys Greenergy',
      power: '540W',
      efficiency: '21.5%',
      technology: 'Mono-PERC',
      warranty: '25 Years',
      price: 18500,
      originalPrice: 22000,
      discount: '16%',
      minOrder: 10,
      inStock: true,
      rating: 4.8,
      reviews: 234,
      features: ['Grade A+ Cells', 'Anti-Reflective Coating', 'Weather Resistant', 'High Efficiency'],
      image: '⬜',
      badge: 'Best Seller'
    },
    {
      id: 2,
      name: 'Novasys Bifacial 580W',
      brand: 'Novasys Greenergy',
      power: '580W',
      efficiency: '22.8%',
      technology: 'Bifacial',
      warranty: '25 Years',
      price: 22500,
      originalPrice: 26000,
      discount: '13%',
      minOrder: 5,
      inStock: true,
      rating: 4.9,
      reviews: 189,
      features: ['Bifacial Technology', 'Up to 30% More Power', 'Dual Glass', 'Premium Quality'],
      image: '⬜',
      badge: 'Premium'
    },
    {
      id: 3,
      name: 'Novasys TopCon 600W',
      brand: 'Novasys Greenergy',
      power: '600W',
      efficiency: '23.2%',
      technology: 'TopCon',
      warranty: '25 Years',
      price: 24500,
      originalPrice: 28000,
      discount: '12%',
      minOrder: 5,
      inStock: true,
      rating: 4.9,
      reviews: 156,
      features: ['Latest TopCon Tech', 'Highest Efficiency', 'Premium Grade', 'Future Ready'],
      image: '⬜',
      badge: 'Latest Tech'
    },
    {
      id: 4,
      name: 'Novasys Poly 450W',
      brand: 'Novasys Greenergy',
      power: '450W',
      efficiency: '19.8%',
      technology: 'Polycrystalline',
      warranty: '25 Years',
      price: 14500,
      originalPrice: 17000,
      discount: '15%',
      minOrder: 15,
      inStock: true,
      rating: 4.6,
      reviews: 345,
      features: ['Cost Effective', 'Reliable Performance', 'Proven Technology', 'Budget Friendly'],
      image: '⬜',
      badge: 'Budget Pick'
    },
    {
      id: 5,
      name: 'Novasys Half Cut 520W',
      brand: 'Novasys Greenergy',
      power: '520W',
      efficiency: '21.2%',
      technology: 'Half Cut',
      warranty: '25 Years',
      price: 19500,
      originalPrice: 23000,
      discount: '15%',
      minOrder: 8,
      inStock: true,
      rating: 4.7,
      reviews: 278,
      features: ['Half Cut Design', 'Lower Hot Spots', 'Better Shading Performance', 'Reliable'],
      image: '⬜',
      badge: 'Hot Pick'
    },
    {
      id: 6,
      name: 'Novasys Flexible 200W',
      brand: 'Novasys Greenergy',
      power: '200W',
      efficiency: '20.1%',
      technology: 'Flexible',
      warranty: '15 Years',
      price: 12500,
      originalPrice: 15000,
      discount: '17%',
      minOrder: 10,
      inStock: false,
      rating: 4.5,
      reviews: 123,
      features: ['Bendable Design', 'Lightweight', 'Marine Grade', 'RV Compatible'],
      image: '🌊',
      badge: 'Special Use'
    }
  ];

  const inverters = [
    {
      id: 7,
      name: 'Mikrotek On-Grid 10kW',
      brand: 'Mikrotek Solar',
      power: '10kW',
      efficiency: '98.5%',
      technology: 'On-Grid',
      warranty: '5 Years',
      price: 45000,
      originalPrice: 52000,
      discount: '13%',
      minOrder: 1,
      inStock: true,
      rating: 4.8,
      reviews: 167,
      features: ['MPPT Technology', 'Grid Synchronization', 'Remote Monitoring', 'WiFi Enabled'],
      image: '🔌',
      badge: 'Professional'
    },
    {
      id: 8,
      name: 'Mikrotek Hybrid 5kW',
      brand: 'Mikrotek Solar',
      power: '5kW',
      efficiency: '97.8%',
      technology: 'Hybrid',
      warranty: '5 Years',
      price: 38000,
      originalPrice: 44000,
      discount: '14%',
      minOrder: 1,
      inStock: true,
      rating: 4.9,
      reviews: 234,
      features: ['Battery Compatible', 'Grid Tie', 'Load Management', 'Smart Features'],
      image: '🔄',
      badge: 'Versatile'
    }
  ];

  const getCurrentProducts = () => {
    switch (selectedCategory) {
      case 'panels':
        return solarPanels;
      case 'inverters':
        return inverters;
      default:
        return solarPanels;
    }
  };

  const handleAddToCart = (product: typeof solarPanels[0]) => {
    alert(`Added ${product.name} to cart for bulk quote!`);
  };

  const handleGetQuote = (product: typeof solarPanels[0]) => {
    alert(`Requesting bulk quote for ${product.name}`);
  };

  return (
    <section id="products" className={`py-24 ${TRANSITION_CLASSES.normal} ${
      isDay 
        ? 'bg-gradient-to-br from-orange-50 via-amber-50 to-orange-100' 
        : 'bg-gradient-to-br from-slate-800 via-blue-900 to-slate-800'
    }`}>
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className={`text-5xl font-bold mb-6 ${themeClasses.textPrimary} ${TRANSITION_CLASSES.colors}`}>
            Professional Solar Products
          </h2>
          <p className={`text-xl max-w-3xl mx-auto ${themeClasses.textSecondary} ${TRANSITION_CLASSES.colors}`}>
            Enterprise-grade solar products for professional installations. 
            Certified components with competitive pricing and guaranteed quality.
          </p>
        </div>

        {/* Category Filters */}
        <div className="flex justify-center mb-12">
          <div className={`rounded-xl p-2 shadow-lg border ${TRANSITION_CLASSES.normal} ${
            isDay 
              ? 'bg-white/80 backdrop-blur-sm border-amber-200' 
              : 'bg-slate-800/80 backdrop-blur-sm border-slate-600'
          }`}>
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`px-8 py-4 rounded-lg font-semibold ${TRANSITION_CLASSES.normal} ${hoverEffects.scale} ${
                  selectedCategory === category.id
                    ? isDay
                      ? 'bg-gradient-to-r from-amber-500 to-orange-500 text-white shadow-lg shadow-amber-500/25'
                      : 'bg-gradient-to-r from-blue-600 to-cyan-600 text-white shadow-lg shadow-blue-500/25'
                    : isDay
                      ? 'text-slate-600 hover:text-amber-600 hover:bg-amber-50'
                      : 'text-slate-300 hover:text-cyan-400 hover:bg-slate-700/50'
                }`}
              >
                <span className={`mr-2 ${
                  selectedCategory === category.id 
                    ? 'text-white' 
                    : isDay ? 'text-amber-600' : 'text-cyan-400'
                }`}>
                  {category.icon === '⬜' ? (category.id === 'panels' ? '☀️' : category.id === 'inverters' ? '⚡' : category.id === 'batteries' ? '🔋' : '🔧') : category.icon}
                </span>
                {category.name}
              </button>
            ))}
          </div>
        </div>

        {/* Sort and Filter Bar */}
        <div className={`flex flex-col md:flex-row justify-between items-center mb-8 rounded-xl p-6 shadow-sm border ${TRANSITION_CLASSES.normal} ${
          isDay 
            ? 'bg-white/80 border-amber-200' 
            : 'bg-slate-800/50 border-slate-600'
        }`}>
          <div className="flex items-center space-x-4 mb-4 md:mb-0">
            <span className={`font-semibold ${themeClasses.textPrimary} ${TRANSITION_CLASSES.colors}`}>Sort by:</span>
            <select 
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className={`border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 ${TRANSITION_CLASSES.normal} ${
                isDay 
                  ? 'bg-white border-amber-200 focus:ring-amber-300 text-slate-700' 
                  : 'bg-slate-700 border-slate-500 focus:ring-blue-300 text-slate-200'
              }`}
            >
              <option value="popularity">Popularity</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="efficiency">Efficiency</option>
              <option value="power">Power Output</option>
            </select>
          </div>
          <div className={`${themeClasses.textSecondary} ${TRANSITION_CLASSES.colors}`}>
            Showing {getCurrentProducts().length} products
          </div>
        </div>

        {/* Products Grid */}
        <div className="grid lg:grid-cols-3 md:grid-cols-2 gap-8">
          {getCurrentProducts().map((product) => (
            <div key={product.id} className={`group relative rounded-xl border overflow-hidden shadow-lg hover:shadow-xl cursor-pointer ${TRANSITION_CLASSES.normal} ${hoverEffects.scale} ${hoverEffects.glow} ${
              isDay 
                ? 'bg-white/80 backdrop-blur-sm border-amber-200 hover:border-amber-400' 
                : 'bg-slate-800/80 backdrop-blur-sm border-slate-600 hover:border-blue-400'
            }`}>

              {/* Product Image */}
              <div className={`h-40 flex items-center justify-center relative overflow-hidden ${TRANSITION_CLASSES.normal} ${
                isDay 
                  ? 'bg-gradient-to-br from-amber-100 to-orange-200' 
                  : 'bg-gradient-to-br from-slate-700 to-blue-800'
              }`}>
                {/* Sample Image Only (optimized) */}
                <Image
                  src={selectedCategory === 'panels' ? '/Solar_product_sample_image.jpg' : '/sample_solar_image.jpg'}
                  alt={product.name}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 400px"
                  priority={product.id <= 3}
                  className="object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
              </div>

              {/* Compact Product Info */}
              <div className="p-4">
                <div className="mb-3">
                  <h3 className={`text-lg font-bold mb-1 line-clamp-1 ${themeClasses.textPrimary} ${TRANSITION_CLASSES.colors}`}>
                    {product.name}
                  </h3>
                  <p className={`font-medium text-sm ${TRANSITION_CLASSES.colors} ${
                    isDay ? 'text-amber-600' : 'text-cyan-400'
                  }`}>
                    {product.brand}
                  </p>
                </div>

                {/* Compact Specifications */}
                <div className="grid grid-cols-2 gap-2 mb-3 text-xs">
                  <div className="flex justify-between">
                    <span className={`${themeClasses.textSecondary} ${TRANSITION_CLASSES.colors}`}>Power:</span>
                    <span className={`font-semibold ${themeClasses.textPrimary} ${TRANSITION_CLASSES.colors}`}>
                      {product.power}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className={`${themeClasses.textSecondary} ${TRANSITION_CLASSES.colors}`}>Efficiency:</span>
                    <span className={`font-semibold ${themeClasses.textPrimary} ${TRANSITION_CLASSES.colors}`}>
                      {product.efficiency}
                    </span>
                  </div>
                </div>

                {/* Compact Price & Rating */}
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <span className={`text-lg font-bold ${TRANSITION_CLASSES.colors} ${
                      isDay ? 'text-amber-600' : 'text-cyan-400'
                    }`}>
                      ₹{product.price.toLocaleString()}
                    </span>
                    {product.originalPrice && (
                      <span className="text-xs text-gray-400 line-through">
                        ₹{product.originalPrice.toLocaleString()}
                      </span>
                    )}
                  </div>
                  <div className="flex items-center gap-1 text-xs">
                    <span className="text-yellow-500">★</span>
                    <span className={`${themeClasses.textSecondary} ${TRANSITION_CLASSES.colors}`}>
                      {product.rating}
                    </span>
                  </div>
                </div>

                {/* Compact Action Button */}
                <Link 
                  href={product.inStock ? "/contact" : "#"}
                  className={`w-full py-2 px-3 rounded-lg font-medium text-sm text-center block ${TRANSITION_CLASSES.normal} ${
                    product.inStock
                      ? `${themeClasses.buttonPrimary} hover:shadow-lg`
                      : `cursor-not-allowed opacity-50 ${isDay ? 'bg-gray-200 text-gray-500' : 'bg-gray-700 text-gray-400'}`
                  }`}
                  onClick={!product.inStock ? (e: React.MouseEvent) => e.preventDefault() : undefined}
                >
                  {product.inStock ? 'Get Quote' : 'Out of Stock'}
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* Professional Bulk Order CTA */}
        <div className="mt-16 bg-gradient-to-r from-blue-600 to-slate-700 rounded-xl p-12 text-center text-white">
          <h3 className="text-4xl font-bold mb-4">Enterprise Solutions</h3>
          <p className="text-xl mb-8 opacity-90">
            Professional pricing for large-scale installations. Our engineering team will design the optimal solution for your project.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-white text-blue-600 px-8 py-4 rounded-lg font-bold text-lg hover:bg-slate-100 transition-all duration-300 transform hover:scale-105">
              Contact Engineering Team
            </button>
            <button className="border-2 border-white text-white px-8 py-4 rounded-lg font-bold text-lg hover:bg-white hover:text-blue-600 transition-all duration-300 transform hover:scale-105">
              Request Professional Quote
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
