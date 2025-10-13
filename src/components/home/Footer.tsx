'use client';

import React, { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { motion, useInView, useAnimation } from 'framer-motion';
import { 
  MapPinIcon, 
  PhoneIcon, 
  EnvelopeIcon, 
  ChevronUpIcon,
  ArrowTopRightOnSquareIcon,
  SunIcon,
  BoltIcon,
  HomeIcon,
  BuildingOfficeIcon,
  CogIcon,
  ChartBarIcon
} from '@heroicons/react/24/outline';
import {
  FaFacebookF,
  FaInstagram,
  FaLinkedinIn,
  FaTwitter,
  FaYoutube,
  FaWhatsapp,
  FaTelegramPlane
} from 'react-icons/fa';
import { companyProfile } from '@/data/company/profile';
import { MEDIA_CONFIG } from '@/data/mediaConfig';

const Footer = () => {
  const [activeSection, setActiveSection] = useState<string | null>(null);
  const [statsAnimated, setStatsAnimated] = useState(false);
  const footerRef = useRef<HTMLElement>(null);
  const isInView = useInView(footerRef, { once: true, margin: "-100px" });
  const videoRef = useRef<HTMLVideoElement>(null);
  const controls = useAnimation();

  // Auto-play video with error handling
  useEffect(() => {
    const video = videoRef.current;
    if (video) {
      const playVideo = async () => {
        try {
          await video.play();
        } catch (error) {
          console.log('Video autoplay failed:', error);
        }
      };
      playVideo();
    }
  }, []);

  // Animate stats when in view
  useEffect(() => {
    if (isInView && !statsAnimated) {
      setStatsAnimated(true);
      controls.start("visible");
    }
  }, [isInView, statsAnimated, controls]);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const quickLinks = [
    { name: 'Home', href: '/', icon: HomeIcon },
    { name: 'About Us', href: '/about', icon: BuildingOfficeIcon },
    { name: 'Products', href: '/products', icon: BoltIcon },
    { name: 'Services', href: '/services', icon: CogIcon },
    { name: 'Projects', href: '/projects', icon: ChartBarIcon },
    { name: 'Blog', href: '/blog', icon: SunIcon },
  ];

  const services = [
    'On-Grid Solar Systems',
    'Off-Grid Solar Systems',
    'Hybrid Solar Systems',
    'Solar Pumps',
    'Solar Street Lighting',
    'EV Charging Stations',
    'AMC & Maintenance',
    'System Integration'
  ];

  const socialLinks = [
    { name: 'Facebook', icon: FaFacebookF, href: companyProfile.social.facebook, color: '#1877F2' },
    { name: 'Instagram', icon: FaInstagram, href: `https://instagram.com/${companyProfile.social.instagram}`, color: '#E4405F' },
    { name: 'LinkedIn', icon: FaLinkedinIn, href: companyProfile.social.linkedin, color: '#0A66C2' },
    { name: 'Twitter', icon: FaTwitter, href: '#', color: '#1DA1F2' },
    { name: 'YouTube', icon: FaYoutube, href: '#', color: '#FF0000' },
    { name: 'WhatsApp', icon: FaWhatsapp, href: `https://wa.me/91${companyProfile.contact.phone.replace(/\D/g, '')}`, color: '#25D366' },
    { name: 'Telegram', icon: FaTelegramPlane, href: '#', color: '#0088CC' }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        duration: 0.6
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: [0.4, 0, 0.2, 1] as [number, number, number, number]
      }
    }
  };

  const socialVariants = {
    hover: {
      scale: 1.1,
      y: -3,
      transition: {
        type: "spring" as const,
        stiffness: 400,
        damping: 10
      }
    },
    tap: {
      scale: 0.95
    }
  };

  return (
    <footer ref={footerRef} className="relative overflow-hidden bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      {/* Video Background */}
      <div className="absolute inset-0 z-0">
        <video
          ref={videoRef}
          autoPlay
          muted
          loop
          playsInline
          className="w-full h-full object-cover opacity-60"
        >
          <source src={MEDIA_CONFIG.footer.background} type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 via-slate-900/60 to-slate-900/40" />
      </div>

      {/* Animated Particles */}
      <div className="absolute inset-0 z-10">
        {[...Array(10)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-0.5 h-0.5 bg-amber-400/40 rounded-full"
            animate={{
              x: [0, Math.random() * 50 - 25],
              y: [0, Math.random() * 50 - 25],
              opacity: [0, 1, 0],
            }}
            transition={{
              duration: 4 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 3,
            }}
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
          />
        ))}
      </div>

      <div className="relative z-20">
        {/* Main Footer Content */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 sm:pt-12 pb-6"
        >
          {/* Mobile: Stack all sections vertically with height constraint */}
          <div className="block sm:hidden h-[35vh] overflow-y-auto space-y-3">
            
            {/* Mobile Company Info */}
            <motion.div variants={itemVariants}>
              <div className="text-center mb-2">
                <div className="inline-flex items-center mb-2">
                  <div className="w-8 h-8 bg-gradient-to-br from-amber-400 to-orange-500 rounded flex items-center justify-center mr-2">
                    <SunIcon className="w-5 h-5 text-white" />
                  </div>
                  <div className="text-left">
                    <h3 className="text-base font-bold text-white">{companyProfile.name}</h3>
                    <p className="text-amber-400 text-xs font-medium">{companyProfile.tagline}</p>
                  </div>
                </div>
                
                <p className="text-gray-300 text-xs leading-relaxed max-w-xs mx-auto mb-2">
                  Leading solar energy solutions provider since {companyProfile.founded}, 
                  delivering cutting-edge renewable energy systems across India.
                </p>
              </div>

              {/* Mobile Contact Info - Ultra Compact Grid */}
              <div className="grid grid-cols-1 gap-0.5 mb-2">
                <motion.div 
                  className="flex items-center justify-center space-x-1 text-gray-300 hover:text-amber-400 transition-colors duration-300 text-xs p-1 rounded footer-glass-effect border border-white/10"
                  whileHover={{ scale: 1.02 }}
                >
                  <MapPinIcon className="w-3 h-3 flex-shrink-0" />
                  <span className="text-center truncate">Indore, Madhya Pradesh, India</span>
                </motion.div>
                
                <motion.a
                  href="tel:+918818880540"
                  className="flex items-center justify-center space-x-1 text-gray-300 hover:text-amber-400 transition-colors duration-300 text-xs p-1 rounded footer-glass-effect border border-white/10"
                  whileHover={{ scale: 1.02 }}
                >
                  <PhoneIcon className="w-3 h-3 flex-shrink-0" />
                  <span>+91 8818880540</span>
                </motion.a>
                
                <motion.a
                  href="mailto:info@autosysindore.com"
                  className="flex items-center justify-center space-x-1 text-gray-300 hover:text-amber-400 transition-colors duration-300 text-xs p-1 rounded footer-glass-effect border border-white/10"
                  whileHover={{ scale: 1.02 }}
                >
                  <EnvelopeIcon className="w-3 h-3 flex-shrink-0" />
                  <span className="truncate">info@autosysindore.com</span>
                </motion.a>
              </div>

              {/* Mobile Stats Grid - Ultra Compact */}
              <div className="grid grid-cols-4 gap-1 mb-2">
                <div className="text-center p-1 footer-glass-effect rounded border border-amber-400/20">
                  <div className="footer-gradient-text font-bold text-xs">{companyProfile.statistics.customersServed}</div>
                  <div className="text-gray-400 text-xs">Customers</div>
                </div>
                <div className="text-center p-1 footer-glass-effect rounded border border-amber-400/20">
                  <div className="footer-gradient-text font-bold text-xs">{companyProfile.statistics.yearsOfExperience}</div>
                  <div className="text-gray-400 text-xs">Years</div>
                </div>
                <div className="text-center p-1 footer-glass-effect rounded border border-amber-400/20">
                  <div className="footer-gradient-text font-bold text-xs">{companyProfile.statistics.totalCapacityInstalled}</div>
                  <div className="text-gray-400 text-xs">Capacity</div>
                </div>
                <div className="text-center p-1 footer-glass-effect rounded border border-amber-400/20">
                  <div className="footer-gradient-text font-bold text-xs">{companyProfile.statistics.awardsReceived}</div>
                  <div className="text-gray-400 text-xs">Awards</div>
                </div>
              </div>

              {/* Mobile Social Links - Ultra Compact */}
              <div className="text-center">
                <h4 className="text-white font-semibold mb-1 text-xs">Connect With Us</h4>
                <div className="flex justify-center flex-wrap gap-1">
                  {socialLinks.slice(0, 6).map((social, index) => (
                    <motion.a
                      key={index}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-6 h-6 rounded footer-glass-effect flex items-center justify-center text-white transition-all duration-300 footer-social-icon border border-white/10"
                      variants={socialVariants}
                      whileHover="hover"
                      whileTap="tap"
                      onMouseEnter={(e) => {
                        e.currentTarget.style.backgroundColor = social.color;
                        e.currentTarget.style.borderColor = social.color;
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.05)';
                        e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.1)';
                      }}
                    >
                      <social.icon className="w-3 h-3" />
                    </motion.a>
                  ))}
                </div>
              </div>
            </motion.div>

            {/* Mobile Quick Links - Ultra Compact */}
            <motion.div variants={itemVariants}>
              <h3 className="text-xs font-semibold text-white mb-1 text-center flex items-center justify-center">
                <span className="w-4 h-0.5 bg-gradient-to-r from-amber-400 to-orange-500 mr-1"></span>
                Quick Links
                <span className="w-4 h-0.5 bg-gradient-to-r from-amber-400 to-orange-500 ml-1"></span>
              </h3>
              <div className="grid grid-cols-3 gap-0.5">
                {quickLinks.slice(0, 6).map((link, index) => (
                  <motion.a
                    key={index}
                    href={link.href}
                    className="flex flex-col items-center justify-center space-y-0.5 text-gray-300 hover:text-amber-400 transition-all duration-300 group text-xs p-1 rounded footer-glass-effect border border-white/10"
                    whileHover={{ scale: 1.02 }}
                    onMouseEnter={() => setActiveSection(link.name)}
                    onMouseLeave={() => setActiveSection(null)}
                  >
                    <link.icon className="w-3 h-3 group-hover:scale-110 transition-transform duration-300" />
                    <span className="group-hover:translate-x-1 transition-transform duration-300 text-center text-xs leading-tight">
                      {link.name}
                    </span>
                  </motion.a>
                ))}
              </div>
            </motion.div>

            {/* Mobile Services - Ultra Compact */}
            <motion.div variants={itemVariants}>
              <h3 className="text-xs font-semibold text-white mb-1 text-center flex items-center justify-center">
                <span className="w-4 h-0.5 bg-gradient-to-r from-amber-400 to-orange-500 mr-1"></span>
                Services
                <span className="w-4 h-0.5 bg-gradient-to-r from-amber-400 to-orange-500 ml-1"></span>
              </h3>
              <div className="grid grid-cols-2 gap-0.5">
                {services.slice(0, 4).map((service, index) => (  
                  <motion.div 
                    key={index}
                    className="text-gray-300 hover:text-amber-400 transition-colors duration-300 text-xs cursor-pointer flex items-center group p-1 rounded footer-glass-effect border border-white/10"
                    whileHover={{ scale: 1.02 }}
                  >
                    <div className="w-1 h-1 bg-amber-400 rounded-full mr-1 group-hover:scale-150 transition-transform duration-300"></div>
                    <span className="truncate text-xs">{service}</span>
                  </motion.div>
                ))}
              </div>
              
              {/* View All Services Button - Ultra Compact */}
              <motion.div className="mt-1 text-center">
                <Link href="/services" passHref legacyBehavior>
                  <motion.a
                    className="inline-flex items-center space-x-1 px-2 py-1 bg-gradient-to-r from-amber-400 to-orange-500 text-white rounded font-medium text-xs hover:from-amber-500 hover:to-orange-600 transition-all duration-300"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <span>View All</span>
                    <ArrowTopRightOnSquareIcon className="w-3 h-3" />
                  </motion.a>
                </Link>
              </motion.div>
            </motion.div>
          </div>

          {/* Desktop & Tablet: Grid layout */}
          <div className="hidden sm:grid sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
            
            {/* Desktop Company Info */}
            <motion.div variants={itemVariants} className="lg:col-span-1">
              <div className="flex items-center mb-4">
                <div className="w-10 h-10 bg-gradient-to-br from-amber-400 to-orange-500 rounded-lg flex items-center justify-center mr-3">
                  <SunIcon className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-white">{companyProfile.name}</h3>
                  <p className="text-amber-400 text-xs font-medium">{companyProfile.tagline}</p>
                </div>
              </div>
              
              <p className="text-gray-300 text-sm leading-relaxed mb-4">
                Leading solar energy solutions provider since {companyProfile.founded}, 
                delivering cutting-edge renewable energy systems across India.
              </p>

              <div className="grid grid-cols-1 gap-1">
                <motion.div 
                  className="flex items-start space-x-2 text-gray-300 hover:text-amber-400 transition-colors duration-300 text-sm p-1"
                  whileHover={{ x: 3 }}
                >
                  <MapPinIcon className="w-4 h-4 mt-0.5 flex-shrink-0" />
                  <span>Indore, Madhya Pradesh, India</span>
                </motion.div>
                
                <motion.a
                  href="tel:+918818880540"
                  className="flex items-center space-x-2 text-gray-300 hover:text-amber-400 transition-colors duration-300 text-sm p-1"
                  whileHover={{ x: 3 }}
                >
                  <PhoneIcon className="w-4 h-4 flex-shrink-0" />
                  <span>+91 8818880540</span>
                </motion.a>
                
                <motion.a
                  href="mailto:info@autosysindore.com"
                  className="flex items-center space-x-2 text-gray-300 hover:text-amber-400 transition-colors duration-300 text-sm p-1"
                  whileHover={{ x: 3 }}
                >
                  <EnvelopeIcon className="w-4 h-4 flex-shrink-0" />
                  <span>info@autosysindore.com</span>
                </motion.a>
              </div>
            </motion.div>

            {/* Desktop Quick Links */}
            <motion.div variants={itemVariants} className="lg:col-span-1">
              <h3 className="text-lg font-semibold text-white mb-4 flex items-center">
                <span className="w-6 h-0.5 bg-gradient-to-r from-amber-400 to-orange-500 mr-2"></span>
                Quick Links
              </h3>
              <ul className="space-y-2">
                {quickLinks.map((link, index) => (
                  <motion.li key={index}>
                    <a
                      href={link.href}
                      className="flex items-center space-x-2 text-gray-300 hover:text-amber-400 transition-all duration-300 group text-sm"
                      onMouseEnter={() => setActiveSection(link.name)}
                      onMouseLeave={() => setActiveSection(null)}
                    >
                      <link.icon className="w-3 h-3 group-hover:scale-110 transition-transform duration-300" />
                      <span className="group-hover:translate-x-1 transition-transform duration-300">
                        {link.name}
                      </span>
                      <ArrowTopRightOnSquareIcon className="w-2 h-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    </a>
                  </motion.li>
                ))}
              </ul>
            </motion.div>

            {/* Desktop Services */}
            <motion.div variants={itemVariants} className="lg:col-span-1">
              <h3 className="text-lg font-semibold text-white mb-4 flex items-center">
                <span className="w-6 h-0.5 bg-gradient-to-r from-amber-400 to-orange-500 mr-2"></span>
                Our Services
              </h3>
              <ul className="space-y-1.5">
                {services.slice(0, 6).map((service, index) => (  
                  <motion.li 
                    key={index}
                    className="text-gray-300 hover:text-amber-400 transition-colors duration-300 text-sm cursor-pointer flex items-center group"
                    whileHover={{ x: 3 }}
                  >
                    <div className="w-1 h-1 bg-amber-400 rounded-full mr-2 group-hover:scale-150 transition-transform duration-300"></div>
                    {service}
                  </motion.li>
                ))}
              </ul>
            </motion.div>

            {/* Desktop Impact & Social */}
            <motion.div variants={itemVariants} className="lg:col-span-1">
              <h3 className="text-lg font-semibold text-white mb-4 flex items-center">
                <span className="w-6 h-0.5 bg-gradient-to-r from-amber-400 to-orange-500 mr-2"></span>
                Our Impact
              </h3>
              
              {/* Desktop Stats Grid */}
              <div className="grid grid-cols-2 gap-2 mb-4">
                <div className="text-center p-2 footer-glass-effect rounded border border-amber-400/20">
                  <div className="footer-gradient-text font-bold text-sm">{companyProfile.statistics.customersServed}</div>
                  <div className="text-gray-400 text-xs">Customers</div>
                </div>
                <div className="text-center p-2 footer-glass-effect rounded border border-amber-400/20">
                  <div className="footer-gradient-text font-bold text-sm">{companyProfile.statistics.yearsOfExperience}</div>
                  <div className="text-gray-400 text-xs">Experience</div>
                </div>
                <div className="text-center p-2 footer-glass-effect rounded border border-amber-400/20">
                  <div className="footer-gradient-text font-bold text-sm">{companyProfile.statistics.totalCapacityInstalled}</div>
                  <div className="text-gray-400 text-xs">Capacity</div>
                </div>
                <div className="text-center p-2 footer-glass-effect rounded border border-amber-400/20">
                  <div className="footer-gradient-text font-bold text-sm">{companyProfile.statistics.awardsReceived}</div>
                  <div className="text-gray-400 text-xs">Awards</div>
                </div>
              </div>

              {/* Recent Achievement */}
              <div className="mb-4 p-3 footer-glass-effect rounded border border-amber-400/10">
                <div className="flex items-center mb-1">
                  <div className="w-2 h-2 bg-amber-400 rounded-full mr-2"></div>
                  <span className="text-amber-400 text-xs font-semibold">Latest Achievement</span>
                </div>
                <p className="text-gray-300 text-xs leading-relaxed">
                  Best Industrial Project - Trident Group (5.4 MW) at Global Solar Expo 2025
                </p>
              </div>

              {/* Desktop Social Links */}
              <div>
                <h4 className="text-white font-semibold mb-3 text-sm">Connect With Us</h4>
                <div className="flex flex-wrap gap-2">
                  {socialLinks.slice(0, 6).map((social, index) => (
                    <motion.a
                      key={index}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-8 h-8 rounded footer-glass-effect flex items-center justify-center text-white transition-all duration-300 footer-social-icon border border-white/10"
                      variants={socialVariants}
                      whileHover="hover"
                      whileTap="tap"
                      onMouseEnter={(e) => {
                        e.currentTarget.style.backgroundColor = social.color;
                        e.currentTarget.style.borderColor = social.color;
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.05)';
                        e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.1)';
                      }}
                    >
                      <social.icon className="w-3 h-3" />
                    </motion.a>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </motion.div>

        {/* Bottom Bar - Ultra Compact */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ delay: 0.8, duration: 0.5 }}
          className="border-t border-white/10 bg-black/20 backdrop-blur-sm"
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2">
            {/* Mobile Bottom Bar - Ultra Compact */}
            <div className="block sm:hidden">
              <div className="flex flex-col items-center space-y-1">
                <p className="text-xs text-gray-400">
                  &copy; {new Date().getFullYear()} {companyProfile.name}. All rights reserved.
                </p>
                <div className="flex items-center space-x-2 text-xs text-gray-400">
                  <Link href="/privacy" className="hover:text-amber-400 transition-colors duration-300">Privacy</Link>
                  <span>•</span>
                  <Link href="/terms" className="hover:text-amber-400 transition-colors duration-300">Terms</Link>
                  <span>•</span>
                  <Link href="/sitemap" className="hover:text-amber-400 transition-colors duration-300">Sitemap</Link>
                </div>
                
                <motion.button
                  onClick={scrollToTop}
                  className="w-6 h-6 rounded footer-scroll-to-top flex items-center justify-center text-white"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <ChevronUpIcon className="w-3 h-3" />
                </motion.button>
              </div>
            </div>

            {/* Desktop Bottom Bar - Ultra Compact */}
            <div className="hidden sm:flex justify-between items-center">
              <div className="flex items-center space-x-4 text-xs text-gray-400">
                <p>&copy; {new Date().getFullYear()} {companyProfile.name}. All rights reserved.</p>
                <div className="flex items-center space-x-3">
                  <Link href="/privacy" className="hover:text-amber-400 transition-colors duration-300">Privacy Policy</Link>
                  <span>•</span>
                  <Link href="/terms" className="hover:text-amber-400 transition-colors duration-300">Terms of Service</Link>
                  <span>•</span>
                  <Link href="/sitemap" className="hover:text-amber-400 transition-colors duration-300">Sitemap</Link>
                </div>
              </div>
              
              <motion.button
                onClick={scrollToTop}
                className="w-6 h-6 rounded footer-scroll-to-top flex items-center justify-center text-white"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <ChevronUpIcon className="w-3 h-3" />
              </motion.button>
            </div>
          </div>
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer;
