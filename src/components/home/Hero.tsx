'use client';
import React from 'react';
import { motion } from 'framer-motion';
import { ArrowDown, Sun, Shield, TrendingUp, Clock } from 'lucide-react';
import { useTheme } from '@/contexts/ThemeContext';
import { MEDIA_CONFIG } from '@/data/mediaConfig';
import OptimizedVideo from '@/components/ui/OptimizedVideo';

const Hero: React.FC = () => {
  const { theme, isDay } = useTheme();

  // Cards data for the bottom section
  const cards = [
    {
      icon: <Sun className="w-8 h-8" />,
      title: "Clean Energy",
      description: "100% renewable solar power",
      gradient: "from-orange-500 to-yellow-500",
      bgGradient: "from-orange-50 to-yellow-50",
      borderGradient: "from-orange-200 to-yellow-200",
      darkBgGradient: "from-orange-950/20 to-yellow-950/20",
      darkBorderGradient: "from-orange-700/50 to-yellow-700/50"
    },
    {
      icon: <Shield className="w-8 h-8" />,
      title: "25 Year Warranty",
      description: "Guaranteed performance & protection",
      gradient: "from-blue-500 to-cyan-500",
      bgGradient: "from-blue-50 to-cyan-50",
      borderGradient: "from-blue-200 to-cyan-200",
      darkBgGradient: "from-blue-950/20 to-cyan-950/20",
      darkBorderGradient: "from-blue-700/50 to-cyan-700/50"
    },
    {
      icon: <TrendingUp className="w-8 h-8" />,
      title: "Save Money",
      description: "Up to 90% reduction in bills",
      gradient: "from-green-500 to-emerald-500",
      bgGradient: "from-green-50 to-emerald-50",
      borderGradient: "from-green-200 to-emerald-200",
      darkBgGradient: "from-green-950/20 to-emerald-950/20",
      darkBorderGradient: "from-green-700/50 to-emerald-700/50"
    },
    {
      icon: <Clock className="w-8 h-8" />,
      title: "Quick Installation",
      description: "Professional setup in 1-3 days",
      gradient: "from-purple-500 to-pink-500",
      bgGradient: "from-purple-50 to-pink-50",
      borderGradient: "from-purple-200 to-pink-200",
      darkBgGradient: "from-purple-950/20 to-pink-950/20",
      darkBorderGradient: "from-purple-700/50 to-pink-700/50"
    }
  ];

  return (
    <section className="relative h-screen overflow-hidden hero-section">
      {/* Full-screen Video Background */}
      <div className="absolute inset-0">
        <OptimizedVideo
          src={MEDIA_CONFIG.hero.main}
          fallbackSrc={MEDIA_CONFIG.hero.fallback}
          poster="/sample_solar_image.jpg"
          autoPlay={true}
          muted={true}
          loop={true}
          playsInline={true}
          preload="metadata"
          className="w-full h-full object-cover hero-video"
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover'
          }}
        />
        
        {/* Blended Gradient Overlay for text visibility */}
        <div className={`absolute inset-0 ${
          theme === 'day' 
            ? 'bg-gradient-to-t from-black/70 via-black/30 to-transparent' 
            : 'bg-gradient-to-t from-black/80 via-black/50 to-black/20'
        }`}></div>
      </div>

      {/* Hero Content - Add a main content area for mobile */}
      <div className="absolute inset-0 flex flex-col justify-center items-center z-10 px-4 sm:px-6 lg:px-8">
        {/* Main Hero Text - Add prominent hero text for mobile */}
        <div className="text-center mb-8 sm:mb-12 lg:mb-16 max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.3 }}
          >
            <h1 className={`
              text-3xl sm:text-4xl lg:text-6xl font-bold mb-4 sm:mb-6 leading-tight
              ${isDay ? 'text-white drop-shadow-2xl' : 'text-white drop-shadow-2xl'}
            `}>
              <span className="block sm:inline">Solar Energy </span>
              <span className="block sm:inline text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 via-orange-500 to-red-500">
                Solutions
              </span>
            </h1>
            <p className={`
              text-base sm:text-lg lg:text-xl mb-6 sm:mb-8 leading-relaxed
              ${isDay ? 'text-white/90 drop-shadow-lg' : 'text-white/90 drop-shadow-lg'}
              max-w-2xl mx-auto px-4
            `}>
              Transform your home with clean, renewable energy. Save up to 90% on electricity bills.
            </p>
            
            {/* CTA Buttons - Mobile Optimized */}
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-center">
              <motion.a
                href="tel:+918818880540"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.6 }}
                className="group px-6 py-3 sm:px-8 sm:py-4 bg-gradient-to-r from-orange-500 to-yellow-500 hover:from-orange-600 hover:to-yellow-600 text-white font-semibold rounded-full shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300 text-sm sm:text-base w-full sm:w-auto"
              >
                Get Free Quote
              </motion.a>
              <motion.a
                href="#contact"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.7 }}
                className="group px-6 py-3 sm:px-8 sm:py-4 border-2 border-white/80 text-white font-semibold rounded-full hover:bg-white/10 backdrop-blur-sm shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 text-sm sm:text-base w-full sm:w-auto"
              >
                Learn More
              </motion.a>
            </div>
          </motion.div>
        </div>
      </div>

      {/* 4 Attractive Cards at Bottom - Single Row Compact */}
      <div className="absolute bottom-0 left-0 right-0 z-20">
        <div className="max-w-7xl mx-auto px-2 sm:px-4 lg:px-6 pb-3 sm:pb-6 hero-cards-mobile hero-cards-tablet">
          <motion.div
            initial={{ opacity: 0, y: 100 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.5 }}
            className="grid grid-cols-4 gap-1 sm:gap-2 lg:gap-3"
          >
            {cards.map((card, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ 
                  duration: 0.8, 
                  delay: 0.7 + (index * 0.1),
                  ease: "easeOut"
                }}
                className="group relative h-16 sm:h-20 lg:h-32 w-full hero-card-mobile hero-card-tablet"
              >
                {/* Card Container with Compact Responsive Dimensions */}
                <div className={`
                  relative h-full w-full p-1.5 sm:p-2 lg:p-4 rounded-md sm:rounded-lg lg:rounded-xl backdrop-blur-sm border transition-all duration-500
                  ${isDay ? 
                    `bg-white/20 border-white/40 shadow-lg shadow-black/5` :
                    `bg-black/25 border-white/20 shadow-xl shadow-black/30`
                  }
                  hover:scale-105 hover:backdrop-blur-md cursor-pointer
                  transform-gpu flex flex-col justify-between
                `}>
                  
                  {/* Subtle Gradient Background on Hover */}
                  <div className={`
                    absolute inset-0 rounded-md sm:rounded-lg lg:rounded-xl opacity-0 group-hover:opacity-30 
                    transition-all duration-500 bg-gradient-to-br ${card.gradient}
                  `} />
                  
                  {/* Beautiful Border on Hover */}
                  <div className={`
                    absolute inset-0 rounded-md sm:rounded-lg lg:rounded-xl opacity-0 group-hover:opacity-100 
                    transition-all duration-500 
                    border-2 border-transparent bg-gradient-to-r ${card.gradient}
                    p-[1px]
                  `}>
                    <div className={`
                      w-full h-full rounded-md sm:rounded-lg lg:rounded-xl ${
                        isDay ? 'bg-white/25' : 'bg-black/30'
                      } backdrop-blur-sm
                    `} />
                  </div>

                  {/* Content */}
                  <div className="relative z-10 flex flex-col h-full">
                    {/* Icon and Title Row - Compact Mobile */}
                    <div className="flex items-center space-x-1 sm:space-x-2 lg:space-x-3 mb-0.5 sm:mb-1 lg:mb-2">
                      <div className={`
                        flex items-center justify-center w-4 h-4 sm:w-6 lg:w-10 sm:h-6 lg:h-10 rounded-sm sm:rounded-md lg:rounded-lg hero-card-icon-mobile
                        bg-gradient-to-r ${card.gradient} text-white shadow-md
                        group-hover:scale-110 transition-all duration-300
                        flex-shrink-0
                      `}>
                        <div className="w-2.5 h-2.5 sm:w-3 lg:w-5 sm:h-3 lg:h-5">
                          {React.cloneElement(card.icon, { className: "w-2.5 h-2.5 sm:w-3 lg:w-5 sm:h-3 lg:h-5" })}
                        </div>
                      </div>

                      <h3 className={`
                        hero-card-title-mobile text-xs sm:text-sm lg:text-sm font-bold transition-all duration-300 leading-tight
                        ${isDay ? 'text-white drop-shadow-md' : 'text-white'}
                        group-hover:text-transparent group-hover:bg-clip-text 
                        group-hover:bg-gradient-to-r ${card.gradient}
                        group-hover:drop-shadow-none
                        hidden sm:block
                      `}>
                        {card.title}
                      </h3>
                      
                      {/* Mobile-only shorter title */}
                      <h3 className={`
                        text-xs font-bold transition-all duration-300 leading-tight
                        ${isDay ? 'text-white drop-shadow-md' : 'text-white'}
                        group-hover:text-transparent group-hover:bg-clip-text 
                        group-hover:bg-gradient-to-r ${card.gradient}
                        group-hover:drop-shadow-none
                        block sm:hidden
                      `}>
                        {card.title.split(' ')[0]}
                      </h3>
                    </div>

                    {/* Description - Compact Mobile */}
                    <p className={`
                      hero-card-description-mobile text-xs sm:text-xs lg:text-xs transition-all duration-300 leading-relaxed flex-1
                      ${isDay ? 'text-white/90 drop-shadow-sm' : 'text-white/80'}
                      group-hover:${isDay ? 'text-white' : 'text-white/90'}
                      hidden sm:block
                    `}>
                      {card.description}
                    </p>

                    {/* Animated Bottom Line */}
                    <div className={`
                      mt-0.5 sm:mt-1 lg:mt-2 h-0.5 w-0 group-hover:w-full transition-all duration-500 
                      bg-gradient-to-r ${card.gradient} rounded-full
                    `} />
                  </div>

                  {/* Subtle Glow Effect */}
                  <div className={`
                    absolute inset-0 rounded-md sm:rounded-lg lg:rounded-xl opacity-0 group-hover:opacity-20 
                    transition-all duration-700 blur-sm
                    bg-gradient-to-r ${card.gradient} scale-105
                  `} />
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Premium Scroll Down Icon - Mobile Responsive */}
      <div className="absolute bottom-20 sm:bottom-24 lg:bottom-36 left-1/2 transform -translate-x-1/2 z-10 flex flex-col items-center hero-scroll-mobile hero-scroll-landscape">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 1.1 }}
          className="flex flex-col items-center"
        >
          <span className="text-xs font-semibold tracking-widest text-blue-200 mb-1 sm:mb-2 select-none drop-shadow-lg">Scroll</span>
          <motion.div
            animate={{ y: [0, 12, 0] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
            className="rounded-full p-1.5 sm:p-2 bg-gradient-to-b from-blue-500 via-blue-600 to-cyan-400 shadow-lg shadow-blue-400/30"
          >
            <ArrowDown className="w-5 h-5 sm:w-6 lg:w-7 sm:h-6 lg:h-7 text-white drop-shadow-lg" />
          </motion.div>
        </motion.div>
      </div>

    </section>
  );
};

export default Hero;
