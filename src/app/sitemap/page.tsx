'use client';
import React, { useState, useEffect } from 'react';
import { useTheme } from '@/contexts/ThemeContext';
import { getThemeClasses } from '@/utils/themeUtils';
import Header from '@/components/home/Header';
import Footer from '@/components/home/Footer';
import { Map, Home, Briefcase, Users, Calendar, FileText, Phone, Mail } from 'lucide-react';
import Link from 'next/link';

export default function SitemapPage() {
  const { theme, isDay, isNight } = useTheme();
  const themeClasses = getThemeClasses(theme);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const siteMap = [
    {
      category: 'Main Pages',
      icon: Home,
      links: [
        { name: 'Home', href: '/', description: 'Welcome to Autosys Sunergy' },
        { name: 'About Us', href: '/about', description: 'Learn about our company and mission' },
        { name: 'Contact', href: '/contact', description: 'Get in touch with our team' },
      ]
    },
    {
      category: 'Services',
      icon: Briefcase,
      links: [
        { name: 'All Services', href: '/services', description: 'Comprehensive solar solutions' },
        { name: 'Residential Solar', href: '/services/residential', description: 'Home solar installations' },
        { name: 'Commercial Solar', href: '/services/commercial', description: 'Business solar solutions' },
        { name: 'Industrial Solar', href: '/services/industrial', description: 'Large-scale installations' },
        { name: 'Maintenance', href: '/services/maintenance', description: 'System maintenance and support' },
      ]
    },
    {
      category: 'Products',
      icon: FileText,
      links: [
        { name: 'All Products', href: '/products', description: 'Solar equipment and components' },
        { name: 'Solar Panels', href: '/products/solar-panels', description: 'High-efficiency solar panels' },
        { name: 'Inverters', href: '/products/inverters', description: 'Power conversion systems' },
        { name: 'Batteries', href: '/products/batteries', description: 'Energy storage solutions' },
        { name: 'Accessories', href: '/products/accessories', description: 'Mounting and accessories' },
      ]
    },
    {
      category: 'Projects & Gallery',
      icon: Map,
      links: [
        { name: 'Projects', href: '/projects', description: 'Our completed installations' },
        { name: 'Gallery', href: '/gallery', description: 'Photo gallery of our work' },
        { name: 'Case Studies', href: '/projects/case-studies', description: 'Detailed project analysis' },
      ]
    },
    {
      category: 'Company',
      icon: Users,
      links: [
        { name: 'Careers', href: '/careers', description: 'Join our team' },
        { name: 'CSR', href: '/csr', description: 'Corporate social responsibility' },
        { name: 'Certifications', href: '/certifications', description: 'Our certifications and awards' },
        { name: 'Unique Features', href: '/unique', description: 'What makes us different' },
      ]
    },
    {
      category: 'Resources',
      icon: Calendar,
      links: [
        { name: 'Blog', href: '/blog', description: 'Solar industry insights and tips' },
        { name: 'Privacy Policy', href: '/privacy', description: 'How we protect your data' },
        { name: 'Terms of Service', href: '/terms', description: 'Terms and conditions' },
        { name: 'Sitemap', href: '/sitemap', description: 'Site navigation overview' },
      ]
    }
  ];

  return (
    <div className={`min-h-screen transition-all duration-500 ${themeClasses.background}`}>
      <Header isScrolled={isScrolled} />
      
      {/* Hero Section */}
      <section className={`pt-20 pb-16 transition-all duration-500 ${
        isDay 
          ? 'bg-gradient-to-br from-blue-50 via-white to-blue-50/30' 
          : 'bg-gradient-to-br from-slate-900 via-blue-900/50 to-slate-800'
      }`}>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <Map className={`w-16 h-16 mx-auto mb-6 ${
              isDay ? 'text-blue-600' : 'text-blue-400'
            }`} />
            <h1 className={`text-4xl md:text-5xl font-bold mb-6 transition-colors duration-500 ${
              isDay ? 'text-slate-800' : 'text-white'
            }`}>
              Sitemap
            </h1>
            <p className={`text-xl transition-colors duration-500 ${
              isDay ? 'text-slate-600' : 'text-slate-300'
            }`}>
              Navigate through all pages and sections of our website
            </p>
          </div>
        </div>
      </section>

      {/* Site Map Grid */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {siteMap.map((section, index) => (
              <div 
                key={index}
                className={`rounded-2xl shadow-lg p-6 transition-all duration-300 hover:shadow-xl ${
                  isDay ? 'bg-white border border-gray-200' : 'bg-slate-800 border border-slate-700'
                }`}
              >
                {/* Section Header */}
                <div className="flex items-center gap-3 mb-4">
                  <div className={`p-2 rounded-lg ${
                    isDay ? 'bg-blue-100 text-blue-600' : 'bg-blue-900/30 text-blue-400'
                  }`}>
                    <section.icon className="w-5 h-5" />
                  </div>
                  <h2 className={`text-lg font-bold ${themeClasses.textPrimary}`}>
                    {section.category}
                  </h2>
                </div>

                {/* Links */}
                <div className="space-y-3">
                  {section.links.map((link, linkIndex) => (
                    <Link 
                      key={linkIndex}
                      href={link.href}
                      className={`block p-3 rounded-lg transition-all duration-300 hover:scale-105 ${
                        isDay 
                          ? 'hover:bg-blue-50 border border-gray-100 hover:border-blue-200' 
                          : 'hover:bg-slate-700 border border-slate-600 hover:border-blue-400'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <div>
                          <h3 className={`font-medium mb-1 ${themeClasses.textPrimary}`}>
                            {link.name}
                          </h3>
                          <p className={`text-sm ${themeClasses.textSecondary}`}>
                            {link.description}
                          </p>
                        </div>
                        <div className={`text-sm font-medium ${
                          isDay ? 'text-blue-600' : 'text-blue-400'
                        }`}>
                          →
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Quick Stats */}
          <div className={`mt-12 rounded-2xl shadow-lg p-8 ${
            isDay ? 'bg-white border border-gray-200' : 'bg-slate-800 border border-slate-700'
          }`}>
            <h2 className={`text-2xl font-bold text-center mb-8 ${themeClasses.textPrimary}`}>
              Website Overview
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              <div className="text-center">
                <div className={`text-3xl font-bold mb-2 ${
                  isDay ? 'text-blue-600' : 'text-blue-400'
                }`}>
                  25+
                </div>
                <div className={`text-sm ${themeClasses.textSecondary}`}>
                  Total Pages
                </div>
              </div>
              <div className="text-center">
                <div className={`text-3xl font-bold mb-2 ${
                  isDay ? 'text-green-600' : 'text-green-400'
                }`}>
                  6
                </div>
                <div className={`text-sm ${themeClasses.textSecondary}`}>
                  Main Categories
                </div>
              </div>
              <div className="text-center">
                <div className={`text-3xl font-bold mb-2 ${
                  isDay ? 'text-purple-600' : 'text-purple-400'
                }`}>
                  15+
                </div>
                <div className={`text-sm ${themeClasses.textSecondary}`}>
                  Services
                </div>
              </div>
              <div className="text-center">
                <div className={`text-3xl font-bold mb-2 ${
                  isDay ? 'text-amber-600' : 'text-amber-400'
                }`}>
                  50+
                </div>
                <div className={`text-sm ${themeClasses.textSecondary}`}>
                  Products
                </div>
              </div>
            </div>
          </div>

          {/* Contact Section */}
          <div className={`mt-8 rounded-2xl shadow-lg p-8 text-center ${
            isDay 
              ? 'bg-gradient-to-r from-blue-600 to-purple-600' 
              : 'bg-gradient-to-r from-blue-500 to-purple-500'
          }`}>
            <h2 className="text-2xl font-bold text-white mb-4">
              Can&apos;t Find What You&apos;re Looking For?
            </h2>
            <p className="text-white/90 mb-6">
              Our team is here to help you navigate our services and find the perfect solar solution.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link 
                href="/contact"
                className="flex items-center justify-center gap-2 px-6 py-3 bg-white text-blue-600 font-semibold rounded-lg hover:bg-gray-100 transition-all duration-300"
              >
                <Mail className="w-4 h-4" />
                Contact Us
              </Link>
              <a 
                href="tel:+918818880540"
                className="flex items-center justify-center gap-2 px-6 py-3 border-2 border-white text-white font-semibold rounded-lg hover:bg-white/10 transition-all duration-300"
              >
                <Phone className="w-4 h-4" />
                Call Now
              </a>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
