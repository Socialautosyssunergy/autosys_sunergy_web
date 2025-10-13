'use client';
import React, { useState, useEffect } from 'react';
import Image from 'next/image';

const AboutHero = () => {
  const [activeYear, setActiveYear] = useState(0);
  const [visibleStartIndex, setVisibleStartIndex] = useState(0);
  const visibleYears = 5;

  const yearlyAchievements = [
    {
      year: "2007",
      achievement: "Founded Autosys Sunergy with a vision to revolutionize solar energy adoption across India",
      image: "/sample_solar_image.jpg"
    },
    {
      year: "2008",
      achievement: "Established first solar installation team and completed initial residential projects",
      image: "/Solar_product_sample_image.jpg"
    },
    {
      year: "2009",
      achievement: "Expanded operations to commercial sector with first industrial solar installation",
      image: "/Solar_services_sample_image.jpg"
    },
    {
      year: "2010",
      achievement: "Achieved 50+ successful solar installations across Madhya Pradesh region",
      image: "/sample_solar_image.jpg"
    },
    {
      year: "2011",
      achievement: "Introduced advanced solar mounting systems and energy storage solutions",
      image: "/Solar_product_sample_image.jpg"
    },
    {
      year: "2012",
      achievement: "Reached milestone of 100+ satisfied customers with quality installations",
      image: "/Solar_services_sample_image.jpg"
    },
    {
      year: "2013",
      achievement: "Expanded team and technical capabilities for large-scale solar projects",
      image: "/sample_solar_image.jpg"
    },
    {
      year: "2014",
      achievement: "Completed first major commercial installation exceeding 100kW capacity",
      image: "/Solar_product_sample_image.jpg"
    },
    {
      year: "2015",
      achievement: "Became authorized distributor of Novasys Greenergy Panels and Mikrotek Solar Inverters",
      image: "/Solar_services_sample_image.jpg"
    },
    {
      year: "2016",
      achievement: "Achieved 500+ installations with enhanced customer satisfaction ratings",
      image: "/sample_solar_image.jpg"
    },
    {
      year: "2017",
      achievement: "Introduced innovative financing options making solar accessible to more customers",
      image: "/Solar_product_sample_image.jpg"
    },
    {
      year: "2018",
      achievement: "Expanded service area across multiple districts in Madhya Pradesh",
      image: "/Solar_services_sample_image.jpg"
    },
    {
      year: "2019",
      achievement: "Completed 750+ installations with advanced monitoring and maintenance services",
      image: "/sample_solar_image.jpg"
    },
    {
      year: "2020",
      achievement: "Reached milestone of 1000+ satisfied residential and commercial customers",
      image: "/Solar_product_sample_image.jpg"
    },
    {
      year: "2021",
      achievement: "Introduced thermal imaging diagnostics and preventive maintenance programs",
      image: "/Solar_services_sample_image.jpg"
    },
    {
      year: "2022",
      achievement: "Won Solar Developer of the Year and Solar Acumen awards at State Leadership Awards",
      image: "/sample_solar_image.jpg"
    },
    {
      year: "2023",
      achievement: "Achieved maximum rooftop solar capacity (~1,000 kW) in state government competitive tender",
      image: "/Solar_product_sample_image.jpg"
    },
    {
      year: "2024",
      achievement: "Won dual Platinum awards for Solar EPC Company and System Integrator of the Year",
      image: "/Solar_services_sample_image.jpg"
    },
    {
      year: "2025",
      achievement: "Honored at Global Solar Expo for Best Industrial Project - Trident Group (5.4 MW installation)",
      image: "/sample_solar_image.jpg"
    }
  ];

  // Auto-advance years every 3 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveYear((prev) => {
        const newActiveYear = (prev + 1) % yearlyAchievements.length;
        // Update visible window if active year goes outside current view
        if (newActiveYear < visibleStartIndex || newActiveYear >= visibleStartIndex + visibleYears) {
          setVisibleStartIndex(Math.max(0, Math.min(newActiveYear, yearlyAchievements.length - visibleYears)));
        }
        return newActiveYear;
      });
    }, 3000);

    return () => clearInterval(interval);
  }, [yearlyAchievements.length, visibleStartIndex, visibleYears]);

  const handleYearClick = (index: number) => {
    setActiveYear(index);
    // Update visible window if clicked year is outside current view
    if (index < visibleStartIndex || index >= visibleStartIndex + visibleYears) {
      setVisibleStartIndex(Math.max(0, Math.min(index, yearlyAchievements.length - visibleYears)));
    }
  };

  const slideLeft = () => {
    if (visibleStartIndex > 0) {
      setVisibleStartIndex(prev => prev - 1);
    }
  };

  const slideRight = () => {
    if (visibleStartIndex < yearlyAchievements.length - visibleYears) {
      setVisibleStartIndex(prev => prev + 1);
    }
  };

  return (
    <section className="relative h-screen overflow-hidden pt-20">
      {/* Large Background Image - Covers most of the screen */}
      <div className="absolute inset-0 pt-20">
        <Image
          src={yearlyAchievements[activeYear].image}
          alt={`${yearlyAchievements[activeYear].year} Achievement`}
          fill
          className="object-cover transition-all duration-1000"
          priority
        />
        {/* Dark overlay for text readability */}
        <div className="absolute inset-0 bg-black/60" />
      </div>

      {/* Content Overlay */}
      <div className="relative z-10 h-full flex flex-col justify-end pb-2">
        <div className="max-w-7xl mx-auto px-4 w-full">
          {/* Slidable Timeline Section - Positioned at Bottom */}
          <div className="relative">
            {/* Slidable Year Navigation */}
            <div className="relative flex items-center justify-center">
              {/* Left Arrow */}
              <button 
                onClick={slideLeft}
                disabled={visibleStartIndex === 0}
                className={`absolute left-0 z-30 w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300 backdrop-blur-sm ${
                  visibleStartIndex === 0 
                    ? 'bg-gray-700/60 text-gray-400 cursor-not-allowed' 
                    : 'bg-gradient-to-r from-orange-500 to-yellow-500 hover:from-orange-400 hover:to-yellow-400 text-white hover:scale-110 shadow-lg'
                }`}
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M15 19l-7-7 7-7" />
                </svg>
              </button>

              {/* Timeline Line with Glow */}
              <div className="absolute top-1/2 left-10 right-10 h-0.5 bg-gradient-to-r from-transparent via-orange-400 to-transparent rounded-full transform -translate-y-1/2 shadow-lg shadow-orange-500/30" />
              
              {/* Visible Year Markers (4 at a time) */}
              <div className="flex justify-center items-center gap-48 relative mx-auto w-fit">
                {yearlyAchievements.slice(visibleStartIndex, visibleStartIndex + visibleYears).map((item, index) => {
                  const actualIndex = visibleStartIndex + index;
                  return (
                    <div 
                      key={actualIndex}
                      className={`relative cursor-pointer transition-all duration-500 transform ${
                        actualIndex === activeYear 
                          ? 'scale-110 z-20' 
                          : 'scale-100 z-10 hover:scale-105'
                      }`}
                      onClick={() => handleYearClick(actualIndex)}
                      style={{ 
                        animation: `yearPulse 0.8s ease-out ${index * 0.1}s both`
                      }}
                    >
                      {/* Year Circle with Enhanced Styling */}
                      <div className={`w-12 h-12 rounded-full border-2 flex items-center justify-center font-bold text-xs transition-all duration-500 backdrop-blur-sm ${
                        actualIndex === activeYear
                          ? 'bg-gradient-to-br from-orange-500 via-yellow-500 to-orange-600 border-white text-white shadow-xl shadow-orange-500/60 ring-2 ring-white/30'
                          : 'bg-black/70 border-orange-300/50 text-orange-100 hover:bg-black/80 hover:border-orange-400/70 hover:text-white shadow-md'
                      }`}>
                        {item.year}
                      </div>

                      {/* Active Year Enhanced Glow Effect */}
                      {actualIndex === activeYear && (
                        <>
                          <div className="absolute inset-0 w-12 h-12 rounded-full bg-gradient-to-br from-orange-400 to-yellow-400 opacity-20 animate-ping" />
                          <div className="absolute inset-0 w-12 h-12 rounded-full bg-gradient-to-br from-orange-500 to-yellow-500 opacity-10 animate-pulse" />
                        </>
                      )}
                    </div>
                  );
                })}
              </div>

              {/* Right Arrow */}
              <button 
                onClick={slideRight}
                disabled={visibleStartIndex >= yearlyAchievements.length - visibleYears}
                className={`absolute right-0 z-30 w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300 backdrop-blur-sm ${
                  visibleStartIndex >= yearlyAchievements.length - visibleYears
                    ? 'bg-gray-700/60 text-gray-400 cursor-not-allowed' 
                    : 'bg-gradient-to-r from-orange-500 to-yellow-500 hover:from-orange-400 hover:to-yellow-400 text-white hover:scale-110 shadow-lg'
                }`}
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>

            {/* Compact Achievement Info Container */}
            <div className="mt-2">
              <div className="bg-gradient-to-r from-black/80 via-black/70 to-black/80 backdrop-blur-lg rounded-lg border border-orange-300/30 p-3 shadow-2xl shadow-black/50">
                <div className="flex justify-center">
                  <p className="text-sm md:text-base text-orange-100 font-light max-w-4xl mx-auto text-center whitespace-nowrap overflow-x-auto scrollbar-hide">
                    {yearlyAchievements[activeYear].achievement}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Add CSS Animation Keyframes */}
        <style jsx>{`
          @keyframes yearPulse {
            from {
              opacity: 0;
              transform: translateY(20px) scale(0.8);
            }
            to {
              opacity: 1;
              transform: translateY(0) scale(1);
            }
          }
          
          .scrollbar-hide {
            -ms-overflow-style: none;
            scrollbar-width: none;
          }
          
          .scrollbar-hide::-webkit-scrollbar {
            display: none;
          }
        `}</style>
      </div>
    </section>
  );
};

export default AboutHero;
