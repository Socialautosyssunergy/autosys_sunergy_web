'use client';

import React, { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { motion, useInView, useAnimation } from 'framer-motion';
import { 
  SunIcon, 
  LightBulbIcon,
  SparklesIcon,
  TrophyIcon,
  UsersIcon,
  BuildingOfficeIcon,
  ChartBarIcon,
  ShieldCheckIcon,
  HeartIcon,
  BoltIcon,
  CalendarIcon,
  CheckBadgeIcon
} from '@heroicons/react/24/outline';
import Header from '@/components/home/Header';
import Footer from '@/components/home/Footer';
import { companyProfile } from '@/data/company/profile';

export default function AboutPage() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeTimelineItem, setActiveTimelineItem] = useState<number | null>(null);
  const heroRef = useRef<HTMLDivElement>(null);
  
  const isHeroInView = useInView(heroRef, { once: true, margin: "-50px" });
  
  const controls = useAnimation();

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Animate sections when in view
  useEffect(() => {
    if (isHeroInView) controls.start("visible");
  }, [isHeroInView, controls]);

  // Timeline data with 4-year gaps starting from 2007
  const timelineData = [
    {
      year: "2007",
      title: "Foundation & Vision",
      description: "Autosys Sunergy was established in Indore, Madhya Pradesh, with a revolutionary vision to transform solar energy adoption across India.",
      icon: SunIcon,
      color: "from-blue-400 to-blue-600",
      achievements: ["Company established", "First solar installations", "Team of 5 pioneers"]
    },
    {
      year: "2011",
      title: "Growth & Expansion",
      description: "Expanded operations across Madhya Pradesh, building strong foundations in residential and commercial solar markets.",
      icon: ChartBarIcon,
      color: "from-green-400 to-green-600",
      achievements: ["50+ installations", "Regional expansion", "Technology partnerships"]
    },
    {
      year: "2015",
      title: "Strategic Partnerships",
      description: "Became authorized distributor of Novasys Greenergy Panels and Mikrotek Solar Inverters, ensuring premium quality solutions.",
      icon: BuildingOfficeIcon,
      color: "from-purple-400 to-purple-600",
      achievements: ["Authorized partnerships", "Premium product portfolio", "Quality certifications"]
    },
    {
      year: "2019",
      title: "Market Leadership",
      description: "Established as a leading solar EPC company with innovative mounting structures and comprehensive service offerings.",
      icon: TrophyIcon,
      color: "from-amber-400 to-amber-600",
      achievements: ["500+ customers", "Industrial projects", "Innovation leadership"]
    },
    {
      year: "2023",
      title: "Excellence Recognition",
      description: "Achieved maximum rooftop solar capacity recognition and state-level awards for outstanding performance and innovation.",
      icon: SparklesIcon,
      color: "from-red-400 to-red-600",
      achievements: ["State recognition", "1000+ kW capacity", "Multiple awards"]
    },
    {
      year: "2024",
      title: "Platinum Achievements",
      description: "Won dual Platinum awards for Solar EPC Company and System Integrator of the Year, cementing industry leadership.",
      icon: CheckBadgeIcon,
      color: "from-indigo-400 to-indigo-600",
      achievements: ["Platinum awards", "2000+ customers", "5.4 MW projects"]
    }
  ];

  const heroVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-blue-25 to-blue-100">
      {/* Header */}
      <Header isScrolled={isScrolled} />

      {/* Hero Section */}
      <section 
        ref={heroRef}
        className="relative pt-20 pb-16 overflow-hidden bg-gradient-to-br from-blue-600 via-blue-700 to-blue-800"
      >
        {/* Animated Background Elements */}
        <div className="absolute inset-0">
          {[...Array(20)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 bg-white/20 rounded-full"
              animate={{
                x: [0, Math.random() * 100 - 50],
                y: [0, Math.random() * 100 - 50],
                opacity: [0, 1, 0],
              }}
              transition={{
                duration: 6 + Math.random() * 4,
                repeat: Infinity,
                delay: Math.random() * 5,
              }}
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
            />
          ))}
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            variants={heroVariants}
            initial="hidden"
            animate={isHeroInView ? "visible" : "hidden"}
            className="text-center"
          >
            <motion.div
              variants={itemVariants}
              className="flex justify-center mb-6"
            >
              <div className="w-24 h-24 bg-white/10 backdrop-blur-sm rounded-2xl flex items-center justify-center border border-white/20">
                <SunIcon className="w-12 h-12 text-yellow-300" />
              </div>
            </motion.div>

            <motion.h1
              variants={itemVariants}
              className="text-4xl md:text-6xl font-bold text-white mb-6"
            >
              About <span className="text-yellow-300">Autosys Sunergy</span>
            </motion.h1>

            <motion.p
              variants={itemVariants}
              className="text-xl md:text-2xl text-blue-100 mb-8 max-w-3xl mx-auto leading-relaxed"
            >
              {companyProfile.tagline} - Pioneering solar energy solutions across India with 
              innovation, excellence, and unwavering commitment to a sustainable future.
            </motion.p>

            <motion.div
              variants={itemVariants}
              className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto"
            >
              {[
                { label: "Years of Excellence", value: companyProfile.statistics.yearsOfExperience, icon: CalendarIcon },
                { label: "Happy Customers", value: companyProfile.statistics.customersServed, icon: UsersIcon },
                { label: "Capacity Installed", value: companyProfile.statistics.totalCapacityInstalled, icon: BoltIcon },
                { label: "Awards Won", value: companyProfile.statistics.awardsReceived, icon: TrophyIcon }
              ].map((stat, index) => (
                <div key={index} className="text-center">
                  <div className="w-12 h-12 bg-white/10 backdrop-blur-sm rounded-lg flex items-center justify-center mx-auto mb-3 border border-white/20">
                    <stat.icon className="w-6 h-6 text-yellow-300" />
                  </div>
                  <div className="text-2xl md:text-3xl font-bold text-white">{stat.value}</div>
                  <div className="text-sm text-blue-100">{stat.label}</div>
                </div>
              ))}
            </motion.div>
          </motion.div>
        </div>

        {/* Wave Separator */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg className="w-full h-12 fill-blue-50" viewBox="0 0 1440 120" preserveAspectRatio="none">
            <path d="M0,96L48,112C96,128,192,160,288,160C384,160,480,128,576,112C672,96,768,96,864,112C960,128,1056,160,1152,160C1248,160,1344,128,1392,112L1440,96L1440,120L1392,120C1344,120,1248,120,1152,120C1056,120,960,120,864,120C768,120,672,120,576,120C480,120,384,120,288,120C192,120,96,120,48,120L0,120Z"></path>
          </svg>
        </div>
      </section>

      {/* Mission & Vision Section */}
      <section className="py-16 bg-gradient-to-br from-blue-100 to-blue-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="bg-blue-50/80 backdrop-blur-sm rounded-2xl p-8 shadow-lg border border-blue-200/50"
            >
              <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center mb-6">
                <LightBulbIcon className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-gray-800 mb-4">Our Vision</h3>
              <p className="text-gray-700 leading-relaxed text-lg">
                {companyProfile.vision}
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="bg-blue-50/80 backdrop-blur-sm rounded-2xl p-8 shadow-lg border border-blue-200/50"
            >
              <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-green-600 rounded-xl flex items-center justify-center mb-6">
                <HeartIcon className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-gray-800 mb-4">Our Mission</h3>
              <p className="text-gray-700 leading-relaxed text-lg">
                {companyProfile.mission}
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Timeline Section */}
      <section className="py-20 bg-gradient-to-br from-blue-50 via-blue-75 to-blue-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-6">
              Our Journey of <span className="text-blue-600">Excellence</span>
            </h2>
            <p className="text-xl text-gray-700 max-w-3xl mx-auto">
              From a small startup in 2007 to India&apos;s leading solar solutions provider - 
              witness our remarkable transformation over the years.
            </p>
          </motion.div>

          <div className="relative">
            {/* Central Timeline Line */}
            <div className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-gradient-to-b from-blue-200 via-blue-400 to-blue-600 rounded-full"></div>

            {/* Timeline Items */}
            <div className="space-y-12">
              {timelineData.map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className={`relative flex items-center ${
                    index % 2 === 0 ? 'flex-row' : 'flex-row-reverse'
                  }`}
                  onMouseEnter={() => setActiveTimelineItem(index)}
                  onMouseLeave={() => setActiveTimelineItem(null)}
                >
                  {/* Content Card */}
                  <div className={`w-5/12 ${index % 2 === 0 ? 'pr-8' : 'pl-8'}`}>
                    <div className={`bg-blue-50/90 backdrop-blur-sm rounded-2xl p-6 shadow-lg border-2 transition-all duration-300 ${
                      activeTimelineItem === index 
                        ? 'border-blue-400 shadow-xl scale-105' 
                        : 'border-blue-200/60 hover:border-blue-300'
                    }`}>
                      <div className="flex items-center mb-4">
                        <div className={`w-12 h-12 rounded-xl flex items-center justify-center bg-gradient-to-br ${item.color} mr-4`}>
                          <item.icon className="w-6 h-6 text-white" />
                        </div>
                        <div>
                          <div className="text-2xl font-bold text-blue-600">{item.year}</div>
                          <div className="text-lg font-semibold text-gray-800">{item.title}</div>
                        </div>
                      </div>
                      <p className="text-gray-700 mb-4 leading-relaxed">{item.description}</p>
                      <div className="space-y-2">
                        {item.achievements.map((achievement, achIndex) => (
                          <div key={achIndex} className="flex items-center text-sm text-gray-600">
                            <div className="w-1.5 h-1.5 bg-blue-400 rounded-full mr-2"></div>
                            {achievement}
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Central Timeline Node */}
                  <div className="absolute left-1/2 transform -translate-x-1/2 z-10">
                    <div className={`w-6 h-6 rounded-full bg-gradient-to-br ${item.color} border-4 border-white shadow-lg transition-all duration-300 ${
                      activeTimelineItem === index ? 'scale-125' : 'scale-100'
                    }`}></div>
                  </div>

                  {/* Empty Space */}
                  <div className="w-5/12"></div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Core Values Section */}
      <section className="py-16 bg-gradient-to-br from-blue-75 to-blue-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl font-bold text-gray-800 mb-6">Our Core Values</h2>
            <p className="text-xl text-gray-700 max-w-3xl mx-auto">
              The principles that guide every decision and drive our commitment to excellence.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {companyProfile.coreValues.map((value, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-gradient-to-br from-blue-50/90 to-blue-100/90 backdrop-blur-sm rounded-xl p-6 hover:shadow-lg transition-all duration-300 border border-blue-200/50"
              >
                <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg flex items-center justify-center mb-4">
                  <ShieldCheckIcon className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-lg font-semibold text-gray-800 mb-2">{value}</h3>
                <div className="w-8 h-1 bg-gradient-to-r from-blue-400 to-blue-600 rounded-full"></div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Awards & Recognition */}
      <section className="py-16 bg-gradient-to-br from-blue-100 to-blue-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl font-bold text-gray-800 mb-6">Awards & Recognition</h2>
            <p className="text-xl text-gray-700 max-w-3xl mx-auto">
              Our commitment to excellence has been recognized by industry leaders and government bodies.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {companyProfile.awards.slice(0, 6).map((award, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-blue-50/90 backdrop-blur-sm rounded-xl p-6 shadow-lg border border-blue-200/50 hover:shadow-xl transition-all duration-300"
              >
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-yellow-400 to-yellow-600 rounded-lg flex items-center justify-center mr-4">
                    <TrophyIcon className="w-6 h-6 text-white" />
                  </div>
                  <div className="text-2xl font-bold text-yellow-600">{award.year}</div>
                </div>
                <h3 className="text-lg font-semibold text-gray-800 mb-2">{award.title}</h3>
                <p className="text-gray-700 mb-2">{award.description}</p>
                <div className="inline-block px-3 py-1 bg-blue-200/60 text-blue-800 text-sm rounded-full">
                  {award.category}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Unique Features */}
      <section className="py-16 bg-gradient-to-br from-blue-50 to-blue-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl font-bold text-gray-800 mb-6">What Makes Us Unique</h2>
            <p className="text-xl text-gray-700 max-w-3xl mx-auto">
              Innovative features and services that set us apart in the solar industry.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {companyProfile.uniqueFeatures.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-gradient-to-br from-blue-50/90 via-blue-25/80 to-blue-100/90 backdrop-blur-sm rounded-xl p-6 shadow-lg border border-blue-200/50 hover:shadow-xl transition-all duration-300 group"
              >
                <div className="text-4xl mb-4 group-hover:scale-110 transition-transform duration-300">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold text-gray-800 mb-3">{feature.title}</h3>
                <p className="text-gray-700 leading-relaxed">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-blue-600 to-blue-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-4xl font-bold text-white mb-6">
              Ready to Join Our Solar Revolution?
            </h2>
            <p className="text-xl text-blue-100 mb-8 max-w-3xl mx-auto">
              Let&apos;s work together to create a sustainable future with clean, renewable solar energy.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="/contact"
                className="px-8 py-4 bg-yellow-500 hover:bg-yellow-600 text-gray-900 font-semibold rounded-lg transition-all duration-300 transform hover:scale-105 shadow-lg"
              >
                Get Free Consultation
              </a>
              <Link
                href="/projects"
                className="px-8 py-4 bg-white/10 hover:bg-white/20 text-white font-semibold rounded-lg transition-all duration-300 transform hover:scale-105 backdrop-blur-sm border border-white/20"
              >
                View Our Projects
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </div>
  );
}
