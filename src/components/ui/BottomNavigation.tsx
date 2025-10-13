'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useTheme } from '@/contexts/ThemeContext';
import { 
  Home, 
  Wrench, 
  Package, 
  MoreHorizontal,
  X,
  Phone,
  Mail,
  MapPin,
  BookOpen,
  Award,
  Users,
  Camera,
  Building,
  Heart,
  Shield
} from 'lucide-react';

interface NavigationItem {
  name: string;
  href: string;
  icon: React.ReactNode;
  activeColor: string;
  bgColor: string;
}

interface MoreItem {
  name: string;
  href: string;
  icon: React.ReactNode;
  description: string;
  color: string;
}

const BottomNavigation: React.FC = () => {
  const { theme, isDay } = useTheme();
  const pathname = usePathname();
  const [isMoreOpen, setIsMoreOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  // Main navigation items
  const mainNavItems: NavigationItem[] = [
    {
      name: 'Home',
      href: '/',
      icon: <Home className="w-5 h-5" />,
      activeColor: 'text-blue-600',
      bgColor: 'bg-blue-50'
    },
    {
      name: 'Services',
      href: '/services',
      icon: <Wrench className="w-5 h-5" />,
      activeColor: 'text-green-600',
      bgColor: 'bg-green-50'
    },
    {
      name: 'Products',
      href: '/products',
      icon: <Package className="w-5 h-5" />,
      activeColor: 'text-purple-600',
      bgColor: 'bg-purple-50'
    },
    {
      name: 'More',
      href: '#',
      icon: <MoreHorizontal className="w-5 h-5" />,
      activeColor: 'text-orange-600',
      bgColor: 'bg-orange-50'
    }
  ];

  // More dropdown items
  const moreItems: MoreItem[] = [
    {
      name: 'About',
      href: '/about',
      icon: <Building className="w-5 h-5" />,
      description: 'Our company story',
      color: 'text-blue-600'
    },
    {
      name: 'Projects',
      href: '/projects',
      icon: <Award className="w-5 h-5" />,
      description: 'Our success stories',
      color: 'text-green-600'
    },
    {
      name: 'Blog',
      href: '/blog',
      icon: <BookOpen className="w-5 h-5" />,
      description: 'Solar insights & tips',
      color: 'text-purple-600'
    },
    {
      name: 'Contact',
      href: '/contact',
      icon: <Phone className="w-5 h-5" />,
      description: 'Get in touch',
      color: 'text-red-600'
    },
    {
      name: 'Gallery',
      href: '/gallery',
      icon: <Camera className="w-5 h-5" />,
      description: 'Project photos',
      color: 'text-indigo-600'
    },
    {
      name: 'Careers',
      href: '/careers',
      icon: <Users className="w-5 h-5" />,
      description: 'Join our team',
      color: 'text-cyan-600'
    },
    {
      name: 'CSR',
      href: '/csr',
      icon: <Heart className="w-5 h-5" />,
      description: 'Social responsibility',
      color: 'text-pink-600'
    },
    {
      name: 'Certifications',
      href: '/certifications',
      icon: <Shield className="w-5 h-5" />,
      description: 'Quality assurance',
      color: 'text-yellow-600'
    }
  ];

  // Auto-hide navigation on scroll
  useEffect(() => {
    const controlNavbar = () => {
      if (typeof window !== 'undefined') {
        if (window.scrollY > lastScrollY && window.scrollY > 100) {
          // Scrolling down & past 100px
          setIsVisible(false);
          setIsMoreOpen(false); // Close more menu when hiding
        } else {
          // Scrolling up
          setIsVisible(true);
        }
        setLastScrollY(window.scrollY);
      }
    };

    if (typeof window !== 'undefined') {
      window.addEventListener('scroll', controlNavbar);
      return () => {
        window.removeEventListener('scroll', controlNavbar);
      };
    }
  }, [lastScrollY]);

  // Close more menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Element;
      if (isMoreOpen && !target.closest('.more-menu-container')) {
        setIsMoreOpen(false);
      }
    };

    if (isMoreOpen) {
      document.addEventListener('click', handleClickOutside);
      // Add class to body to prevent scrolling
      document.body.classList.add('bottom-nav-more-open');
      return () => {
        document.removeEventListener('click', handleClickOutside);
        document.body.classList.remove('bottom-nav-more-open');
      };
    } else {
      // Remove class when more menu is closed
      document.body.classList.remove('bottom-nav-more-open');
    }
  }, [isMoreOpen]);

  // Don't show on desktop (md and up)
  const isActive = (href: string) => {
    if (href === '/') return pathname === '/';
    return pathname.startsWith(href);
  };

  const handleMoreClick = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsMoreOpen(!isMoreOpen);
  };

  return (
    <>
      {/* Bottom Navigation - Mobile Only */}
      <div className="md:hidden">
        {/* More Items Overlay */}
        {isMoreOpen && (
          <div className="fixed inset-0 z-40 bg-black/40 backdrop-blur-sm transition-opacity duration-200">
            <div className="absolute bottom-0 left-0 right-0">
              {/* More Items Grid */}
              <div className={`mx-4 mb-16 p-5 rounded-t-3xl transition-all duration-300 transform more-menu-slide ${
                isDay 
                  ? 'bg-white/98 backdrop-blur-xl border-t border-gray-100 shadow-2xl' 
                  : 'bg-slate-900/98 backdrop-blur-xl border-t border-slate-700 shadow-2xl'
              }`}>
                <div className="flex items-center justify-between mb-5">
                  <h3 className={`text-lg font-bold ${
                    isDay ? 'text-gray-900' : 'text-white'
                  }`}>
                    More Options
                  </h3>
                  <button
                    onClick={() => setIsMoreOpen(false)}
                    className={`p-2 rounded-full transition-colors duration-200 ${
                      isDay 
                        ? 'hover:bg-gray-100 text-gray-500' 
                        : 'hover:bg-slate-800 text-gray-400'
                    }`}
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
                
                <div className="grid grid-cols-4 gap-4 mb-5">
                  {moreItems.map((item) => {
                    const isItemActive = isActive(item.href);
                    return (
                      <Link
                        key={item.name}
                        href={item.href}
                        onClick={() => setIsMoreOpen(false)}
                        className={`group flex flex-col items-center p-3 rounded-2xl transition-all duration-200 hover:scale-105 active:scale-95 ${
                          isItemActive
                            ? isDay
                              ? 'bg-blue-50 shadow-sm'
                              : 'bg-blue-900/20 shadow-sm'
                            : isDay
                              ? 'hover:bg-gray-50'
                              : 'hover:bg-slate-800'
                        }`}
                      >
                        <div className={`p-2.5 rounded-xl transition-colors duration-200 mb-2 ${
                          isItemActive 
                            ? `${item.color} bg-white shadow-sm`
                            : isDay 
                              ? 'text-gray-600 group-hover:text-gray-800 bg-gray-100' 
                              : 'text-gray-300 group-hover:text-white bg-slate-700'
                        }`}>
                          {item.icon}
                        </div>
                        <span className={`text-xs font-medium text-center leading-tight ${
                          isItemActive
                            ? isDay ? 'text-blue-700' : 'text-blue-300'
                            : isDay ? 'text-gray-700' : 'text-gray-300'
                        }`}>
                          {item.name}
                        </span>
                      </Link>
                    );
                  })}
                </div>
                
                {/* Quick Contact Section */}
                <div className={`pt-4 border-t ${
                  isDay ? 'border-gray-100' : 'border-slate-700'
                }`}>
                  <h4 className={`text-sm font-semibold mb-3 ${
                    isDay ? 'text-gray-700' : 'text-gray-300'
                  }`}>
                    Quick Contact
                  </h4>
                  <div className="flex space-x-3">
                    <a
                      href="tel:+918818880540"
                      className={`flex-1 flex items-center justify-center space-x-2 py-3 px-4 rounded-xl transition-all duration-200 active:scale-95 ${
                        isDay 
                          ? 'bg-green-50 hover:bg-green-100 text-green-700 border border-green-100' 
                          : 'bg-green-900/20 hover:bg-green-900/30 text-green-400 border border-green-800/50'
                      }`}
                    >
                      <Phone className="w-4 h-4" />
                      <span className="text-sm font-medium">Call</span>
                    </a>
                    <a
                      href="mailto:info@autosysindore.com"
                      className={`flex-1 flex items-center justify-center space-x-2 py-3 px-4 rounded-xl transition-all duration-200 active:scale-95 ${
                        isDay 
                          ? 'bg-blue-50 hover:bg-blue-100 text-blue-700 border border-blue-100' 
                          : 'bg-blue-900/20 hover:bg-blue-900/30 text-blue-400 border border-blue-800/50'
                      }`}
                    >
                      <Mail className="w-4 h-4" />
                      <span className="text-sm font-medium">Email</span>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Bottom Navigation Bar */}
        <nav 
          className={`more-menu-container fixed bottom-0 left-0 right-0 z-50 bottom-nav-container transition-all duration-300 ease-in-out ${
            isVisible ? 'translate-y-0' : 'translate-y-full'
          }`}
        >
          <div className={`mx-0 mb-0 transition-all duration-300 bottom-nav-backdrop bottom-nav-safe-area bottom-nav-shadow ${
            isDay 
              ? 'bg-white/98 backdrop-blur-xl border-t border-gray-100' 
              : 'bg-slate-900/98 backdrop-blur-xl border-t border-slate-700'
          }`}>
            <div className="flex items-center justify-around px-4 py-2 bottom-nav-bar">
              {mainNavItems.map((item) => {
                const isItemActive = item.href === '#' 
                  ? isMoreOpen 
                  : isActive(item.href);

                if (item.href === '#') {
                  return (
                    <button
                      key={item.name}
                      onClick={handleMoreClick}
                      className={`group bottom-nav-item flex flex-col items-center justify-center min-w-[60px] h-12 rounded-xl transition-all duration-200 active:scale-95 ${
                        isItemActive
                          ? `${item.bgColor} ${item.activeColor} shadow-sm`
                          : isDay 
                            ? 'text-gray-500 hover:text-gray-700 hover:bg-gray-50' 
                            : 'text-gray-400 hover:text-gray-200 hover:bg-slate-800'
                      }`}
                    >
                      <div className={`relative transition-transform duration-200 ${
                        isItemActive ? 'scale-110' : 'group-hover:scale-105'
                      }`}>
                        {item.icon}
                        {/* Active indicator dot */}
                        {isItemActive && (
                          <div className={`absolute -top-1 -right-1 w-1.5 h-1.5 rounded-full ${
                            item.activeColor.replace('text-', 'bg-')
                          }`} />
                        )}
                      </div>
                      <span className={`text-xs font-medium mt-0.5 transition-colors duration-200 ${
                        isItemActive 
                          ? item.activeColor
                          : isDay ? 'text-gray-500 group-hover:text-gray-700' : 'text-gray-400 group-hover:text-gray-200'
                      }`}>
                        {item.name}
                      </span>
                    </button>
                  );
                } else {
                  return (
                    <Link
                      key={item.name}
                      href={item.href}
                      className={`group bottom-nav-item flex flex-col items-center justify-center min-w-[60px] h-12 rounded-xl transition-all duration-200 active:scale-95 ${
                        isItemActive
                          ? `${item.bgColor} ${item.activeColor} shadow-sm`
                          : isDay 
                            ? 'text-gray-500 hover:text-gray-700 hover:bg-gray-50' 
                            : 'text-gray-400 hover:text-gray-200 hover:bg-slate-800'
                      }`}
                    >
                      <div className={`relative transition-transform duration-200 ${
                        isItemActive ? 'scale-110' : 'group-hover:scale-105'
                      }`}>
                        {item.icon}
                        {/* Active indicator dot */}
                        {isItemActive && (
                          <div className={`absolute -top-1 -right-1 w-1.5 h-1.5 rounded-full ${
                            item.activeColor.replace('text-', 'bg-')
                          }`} />
                        )}
                      </div>
                      <span className={`text-xs font-medium mt-0.5 transition-colors duration-200 ${
                        isItemActive 
                          ? item.activeColor
                          : isDay ? 'text-gray-500 group-hover:text-gray-700' : 'text-gray-400 group-hover:text-gray-200'
                      }`}>
                        {item.name}
                      </span>
                    </Link>
                  );
                }
              })}
            </div>
          </div>
        </nav>
      </div>
    </>
  );
};

export default BottomNavigation;
