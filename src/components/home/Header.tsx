'use client';
import React, { useState, useEffect, useRef } from 'react';
import { Phone, Menu, X, ChevronDown } from 'lucide-react';
import { ThemeToggle } from '@/components/ui/ThemeToggle';
import { useTheme } from '@/contexts/ThemeContext';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import OptimizedImageComponent from '@/components/ui/OptimizedImageComponent';


interface HeaderProps {
  isScrolled: boolean;
  nonSticky?: boolean;
}

export default function Header({ isScrolled, nonSticky = false }: HeaderProps) {
  const { theme, isDay, isNight } = useTheme();
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMoreMenuOpen, setIsMoreMenuOpen] = useState(false);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      if (!target.closest('.more-dropdown') && isMoreMenuOpen) {
        setIsMoreMenuOpen(false);
      }
    };

    if (isMoreMenuOpen) {
      document.addEventListener('click', handleClickOutside);
      return () => document.removeEventListener('click', handleClickOutside);
    }
  }, [isMoreMenuOpen]);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsMoreMenuOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // Close mobile menu when route changes
  useEffect(() => {
    setIsMobileMenuOpen(false);
    setIsMoreMenuOpen(false);
  }, [pathname]);

  const navItems = [
    { name: 'Home', href: '/' },
    { name: 'Services', href: '/services' },
    { name: 'Products', href: '/products' },
    { name: 'Projects', href: '/projects' },
    { name: 'About', href: '/about' },
    { name: 'Blog', href: '/blog' },
  ];

  const moreItems = [
    { name: 'Careers', href: '/careers' },
    { name: 'Gallery', href: '/gallery' },
    { name: 'Contact', href: '/contact' },
    { name: 'CSR', href: '/csr' },
    { name: 'Certifications', href: '/certifications' },
  ];

  return (
    <header className={`${nonSticky ? 'relative' : 'fixed top-0'} w-full z-50 transition-all duration-500 ${
      isScrolled 
        ? 'bg-gradient-to-r from-blue-50/95 to-blue-100/95 backdrop-blur-lg shadow-lg border-b border-blue-200/20'
        : 'bg-black/40 backdrop-blur-sm'
    }`}>
      <div className="w-full max-w-none px-6">
        <div className="flex items-center justify-between h-14">
          {/* Compact Logo Section */}
          <div className="flex flex-col justify-start items-start space-y-1">
            <div className={`w-20 h-8 rounded-lg overflow-hidden border transition-all duration-300 hover:scale-105 ${
              isScrolled
                ? 'bg-gradient-to-br from-blue-50 to-blue-100 border-blue-300 shadow-sm'
                : 'bg-blue-50/90 border-blue-50/50 shadow-lg'
            }`}>
              <OptimizedImageComponent src="/Autosys_sunergy_logo.jpg" alt="Autosys Sunergy Logo" width={800} height={600} priority={true} />
            </div>
            <p className={`text-xs font-semibold leading-tight transition-colors duration-300 ${
              isScrolled 
                ? 'text-gray-800' 
                : 'text-white drop-shadow-md'
            }`}>
              Solar Excellence Since 2007
            </p>
          </div>

          {/* Compact Navigation */}
          <nav className="hidden md:flex items-center space-x-9">
            {navItems.map((item) => {
              const isActive = pathname === item.href || (item.href.startsWith('#') && pathname === '/');
              const isExternalLink = item.href.startsWith('#');
              
              const linkContent = (
                <span
                  className={`relative text-sm font-medium px-3 py-1.5 rounded-lg transition-all duration-300 hover:scale-105 ${
                    isActive 
                      ? isScrolled
                        ? 'text-amber-600 bg-blue-50'
                        : 'text-yellow-300 bg-white/10'
                      : isScrolled
                        ? 'text-gray-700 hover:text-amber-600 hover:bg-gray-50'
                        : 'text-white/90 hover:text-white hover:bg-white/10'
                  }`}
                >
                  {item.name}
                  {isActive && (
                    <span className={`absolute left-1 right-1 -bottom-0.5 h-0.5 rounded-full ${
                      isScrolled ? 'bg-blue-600' : 'bg-yellow-300'
                    }`}></span>
                  )}
                </span>
              );

              return isExternalLink ? (
                <a key={item.name} href={item.href}>
                  {linkContent}
                </a>
              ) : (
                <Link key={item.name} href={item.href}>
                  {linkContent}
                </Link>
              );
            })}
            
            {/* More Dropdown */}
            <div className="relative" ref={dropdownRef}>
              <button
                onClick={() => setIsMoreMenuOpen(!isMoreMenuOpen)}
                className={`relative text-sm font-medium px-3 py-1.5 rounded-lg transition-all duration-300 hover:scale-105 flex items-center space-x-1 ${
                  moreItems.some(item => pathname === item.href)
                    ? isScrolled
                      ? 'text-amber-600 bg-blue-50'
                      : 'text-yellow-300 bg-white/10'
                    : isScrolled
                      ? 'text-gray-700 hover:text-amber-600 hover:bg-gray-50'
                      : 'text-white/90 hover:text-white hover:bg-white/10'
                }`}
              >
                <span>More</span>
                <ChevronDown className={`w-4 h-4 transition-transform duration-300 ${isMoreMenuOpen ? 'rotate-180' : ''}`} />
                {moreItems.some(item => pathname === item.href) && (
                  <span className={`absolute left-1 right-1 -bottom-0.5 h-0.5 rounded-full ${
                    isScrolled ? 'bg-blue-600' : 'bg-yellow-300'
                  }`}></span>
                )}
              </button>
              
              {/* Dropdown Menu */}
              {isMoreMenuOpen && (
                <div className={`absolute top-full right-0 mt-2 w-48 rounded-lg shadow-lg border z-50 ${
                  isScrolled 
                    ? 'bg-gradient-to-br from-blue-50/95 to-blue-100/95 backdrop-blur-lg border-blue-200/20'
                    : 'bg-black/80 backdrop-blur-lg border-white/10'
                }`}>
                  <div className="py-2">
                    {moreItems.map((item) => {
                      const isActive = pathname === item.href;
                      return (
                        <Link key={item.name} href={item.href} onClick={() => setIsMoreMenuOpen(false)}>
                          <span
                            className={`block px-4 py-2 text-sm font-medium transition-all duration-300 ${
                              isActive 
                                ? isScrolled
                                  ? 'text-amber-600 bg-blue-50'
                                  : 'text-yellow-300 bg-white/10'
                                : isScrolled
                                  ? 'text-gray-700 hover:text-amber-600 hover:bg-gray-50'
                                  : 'text-white/90 hover:text-white hover:bg-white/10'
                            }`}
                          >
                            {item.name}
                          </span>
                        </Link>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>
          </nav>

          {/* Compact CTA Section */}
          <div className="flex items-center space-x-3">
            {/* Phone Number */}
            <a
              href="tel:+918818880540"
              className={`hidden lg:flex items-center space-x-1.5 text-xs font-medium px-2.5 py-1.5 rounded-lg transition-all duration-300 hover:scale-105 ${
                isScrolled 
                  ? 'text-gray-700 hover:text-amber-600 hover:bg-gray-50'
                  : 'text-white/90 hover:text-white hover:bg-white/10'
              }`}
            >
              <Phone className="w-3 h-3" />
              <span>+91 8818880540</span>
            </a>
            
            {/* Theme Toggle */}
            <ThemeToggle isScrolled={isScrolled} />
            
            {/* Compact Get Quote Button */}
            <Link href="/contact" className={`hidden sm:block px-4 py-1.5 rounded-lg text-xs font-semibold transition-all duration-300 hover:scale-105 shadow-md hover:shadow-lg ${
              isScrolled
                ? 'bg-blue-600 hover:bg-blue-700 text-white'
                : 'bg-yellow-500 hover:bg-yellow-600 text-gray-900'
            }`}>
              Get Quote
            </Link>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className={`md:hidden p-2 rounded-lg transition-all duration-300 ${
                isScrolled 
                  ? 'text-gray-700 hover:bg-gray-100'
                  : 'text-white hover:bg-white/10'
              }`}
            >
              {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className={`md:hidden border-t transition-all duration-300 ${
            isScrolled 
              ? 'bg-gradient-to-br from-blue-50/95 to-blue-100/95 border-blue-200/20'
              : 'bg-black/60 border-white/10'
          }`}>
            <nav className="py-4 space-y-2">
              {navItems.map((item) => {
                const isActive = pathname === item.href || (item.href.startsWith('#') && pathname === '/');
                const isExternalLink = item.href.startsWith('#');
                
                const linkContent = (
                  <span
                    onClick={() => setIsMobileMenuOpen(false)}
                    className={`block px-6 py-2 text-sm font-medium transition-all duration-300 ${
                      isActive 
                        ? isScrolled
                          ? 'text-amber-600 bg-blue-50'
                          : 'text-yellow-300 bg-white/10'
                        : isScrolled
                          ? 'text-gray-700 hover:text-amber-600 hover:bg-gray-50'
                          : 'text-white/90 hover:text-white hover:bg-white/10'
                    }`}
                  >
                    {item.name}
                  </span>
                );

                return isExternalLink ? (
                  <a key={item.name} href={item.href}>
                    {linkContent}
                  </a>
                ) : (
                  <Link key={item.name} href={item.href}>
                    {linkContent}
                  </Link>
                );
              })}
              
              {/* Mobile More Items */}
              <div className="border-t border-gray-200/20 pt-2 mt-2">
                <div className={`px-6 py-1 text-xs font-semibold uppercase tracking-wide ${
                  isScrolled ? 'text-gray-500' : 'text-white/60'
                }`}>
                  More
                </div>
                {moreItems.map((item) => {
                  const isActive = pathname === item.href;
                  return (
                    <Link key={item.name} href={item.href}>
                      <span
                        onClick={() => setIsMobileMenuOpen(false)}
                        className={`block px-6 py-2 text-sm font-medium transition-all duration-300 ${
                          isActive 
                            ? isScrolled
                              ? 'text-amber-600 bg-blue-50'
                              : 'text-yellow-300 bg-white/10'
                            : isScrolled
                              ? 'text-gray-700 hover:text-amber-600 hover:bg-gray-50'
                              : 'text-white/90 hover:text-white hover:bg-white/10'
                        }`}
                      >
                        {item.name}
                      </span>
                    </Link>
                  );
                })}
              </div>
              
              {/* Mobile CTA Buttons */}
              <div className="px-6 pt-4 space-y-3 border-t border-gray-200/20">
                <a
                  href="tel:+918818880540"
                  className={`flex items-center justify-center space-x-2 w-full py-2 rounded-lg text-sm font-medium transition-all duration-300 ${
                    isScrolled 
                      ? 'text-gray-700 bg-gray-100 hover:bg-gray-200'
                      : 'text-white bg-white/10 hover:bg-white/20'
                  }`}
                >
                  <Phone className="w-4 h-4" />
                  <span>+91 8818880540</span>
                </a>
                
                <Link 
                  href="/contact"
                  className={`w-full py-2 rounded-lg text-sm font-semibold transition-all duration-300 text-center block ${
                    isScrolled
                      ? 'bg-blue-600 hover:bg-blue-700 text-white'
                      : 'bg-yellow-500 hover:bg-yellow-600 text-gray-900'
                  }`}
                >
                  Get Quote
                </Link>
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}
