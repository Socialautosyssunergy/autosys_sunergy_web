/**
 * Theme Utilities for Autosys Sunergy Website
 * 
 * This file provides utility functions and constants for working with the dual-theme system.
 * Use these utilities to ensure consistent theming across your application.
 */

import { Theme } from '@/contexts/ThemeContext';

// Theme-specific color palettes
export const THEME_COLORS = {
  day: {
    primary: '#f59e0b',
    primaryDark: '#d97706',
    primaryLight: '#fbbf24',
    secondary: '#fb923c',
    accent: '#ef4444',
    background: '#ffffff',
    surface: '#fefefe',
    surfaceSecondary: '#f9fafb',
    textPrimary: '#111827',
    textSecondary: '#6b7280',
    border: '#e5e7eb',
  },
  night: {
    primary: '#3b82f6',
    primaryDark: '#1d4ed8',
    primaryLight: '#60a5fa',
    secondary: '#06b6d4',
    accent: '#8b5cf6',
    background: '#0f172a',
    surface: '#1e293b',
    surfaceSecondary: '#334155',
    textPrimary: '#f1f5f9',
    textSecondary: '#cbd5e1',
    border: '#475569',
  },
} as const;

// Theme-specific gradients
export const THEME_GRADIENTS = {
  day: {
    primary: 'from-amber-400 via-orange-400 to-amber-500',
    secondary: 'from-orange-300 via-amber-400 to-orange-500',
    background: 'from-amber-50 via-orange-50 to-amber-100',
    hero: 'from-amber-400/10 via-orange-400/10 to-amber-500/10',
  },
  night: {
    primary: 'from-blue-500 via-cyan-500 to-blue-600',
    secondary: 'from-blue-600 via-indigo-600 to-purple-600',
    background: 'from-slate-900 via-blue-900 to-slate-900',
    hero: 'from-blue-500/10 via-cyan-500/10 to-purple-500/10',
  },
} as const;

// Animation classes for different themes
export const THEME_ANIMATIONS = {
  day: {
    glow: 'animate-sun-glow',
    float: 'animate-float-day',
    pulse: 'animate-pulse',
  },
  night: {
    glow: 'animate-night-pulse',
    float: 'animate-float-night',
    pulse: 'animate-pulse',
  },
} as const;

/**
 * Get theme-specific Tailwind classes
 */
export const getThemeClasses = (theme: Theme) => ({
  // Background classes
  background: theme === 'day' ? 'bg-gradient-to-br from-blue-50 to-blue-100' : 'bg-slate-900',
  surface: theme === 'day' ? 'bg-blue-50/50' : 'bg-slate-800',
  surfaceElevated: theme === 'day' ? 'bg-white/80' : 'bg-slate-700',
  
  // Text classes
  textPrimary: theme === 'day' ? 'text-slate-900' : 'text-slate-100',
  textSecondary: theme === 'day' ? 'text-slate-600' : 'text-slate-300',
  textMuted: theme === 'day' ? 'text-slate-500' : 'text-slate-400',
  
  // Border classes
  border: theme === 'day' ? 'border-slate-200' : 'border-slate-600',
  borderLight: theme === 'day' ? 'border-slate-100' : 'border-slate-700',
  
  // Button classes
  buttonPrimary: theme === 'day' 
    ? 'bg-gradient-to-r from-amber-500 to-orange-500 text-white hover:from-amber-600 hover:to-orange-600'
    : 'bg-gradient-to-r from-blue-600 to-cyan-600 text-white hover:from-blue-700 hover:to-cyan-700',
    
  buttonSecondary: theme === 'day'
    ? 'bg-slate-100 text-slate-700 hover:bg-slate-200'
    : 'bg-slate-700 text-slate-200 hover:bg-slate-600',
    
  // Card classes
  card: theme === 'day'
    ? 'bg-white border-slate-200 shadow-sm hover:shadow-md'
    : 'bg-slate-800 border-slate-600 shadow-lg hover:shadow-xl',
    
  // Glass morphism classes
  glass: theme === 'day'
    ? 'bg-white/20 backdrop-blur-md border-white/30'
    : 'bg-slate-900/30 backdrop-blur-md border-blue-400/20',
});

/**
 * Get theme-specific icon color
 */
export const getThemeIconColor = (theme: Theme, variant: 'primary' | 'secondary' | 'accent' = 'primary') => {
  const colors = {
    day: {
      primary: 'text-amber-600',
      secondary: 'text-orange-500',
      accent: 'text-red-500',
    },
    night: {
      primary: 'text-blue-400',
      secondary: 'text-cyan-400',
      accent: 'text-purple-400',
    },
  };
  
  return colors[theme][variant];
};

/**
 * Get theme-specific gradient background
 */
export const getThemeGradient = (theme: Theme, variant: 'primary' | 'secondary' | 'background' | 'hero' = 'primary') => {
  return `bg-gradient-to-br ${THEME_GRADIENTS[theme][variant]}`;
};

/**
 * Get theme-specific shadow
 */
export const getThemeShadow = (theme: Theme, intensity: 'sm' | 'md' | 'lg' | 'xl' = 'md') => {
  const shadows = {
    day: {
      sm: 'shadow-sm shadow-amber-500/10',
      md: 'shadow-md shadow-amber-500/20',
      lg: 'shadow-lg shadow-amber-500/25',
      xl: 'shadow-xl shadow-amber-500/30',
    },
    night: {
      sm: 'shadow-sm shadow-blue-500/10',
      md: 'shadow-md shadow-blue-500/20',
      lg: 'shadow-lg shadow-blue-500/25',
      xl: 'shadow-xl shadow-blue-500/30',
    },
  };
  
  return shadows[theme][intensity];
};

/**
 * Get theme-aware hover effects
 */
export const getThemeHover = (theme: Theme) => ({
  scale: 'hover:scale-105 active:scale-95',
  glow: theme === 'day' 
    ? 'hover:shadow-amber-500/20 hover:shadow-lg'
    : 'hover:shadow-blue-500/20 hover:shadow-lg',
  lift: 'hover:-translate-y-1',
  brightness: theme === 'day' 
    ? 'hover:brightness-110'
    : 'hover:brightness-125',
});

/**
 * Check if current theme is day
 */
export const isDay = (theme: Theme): boolean => theme === 'day';

/**
 * Check if current theme is night
 */
export const isNight = (theme: Theme): boolean => theme === 'night';

/**
 * Get opposite theme
 */
export const getOppositeTheme = (theme: Theme): Theme => theme === 'day' ? 'night' : 'day';

/**
 * Theme transition classes
 */
export const TRANSITION_CLASSES = {
  fast: 'transition-all duration-300 ease-in-out',
  normal: 'transition-all duration-500 ease-in-out',
  slow: 'transition-all duration-700 ease-in-out',
  colors: 'transition-colors duration-500 ease-in-out',
  transform: 'transition-transform duration-300 ease-in-out',
} as const;

/**
 * Responsive breakpoint helpers for theme-specific styles
 */
export const RESPONSIVE_THEME_CLASSES = {
  mobile: {
    padding: 'px-4 sm:px-6',
    text: 'text-sm sm:text-base',
    spacing: 'space-y-4 sm:space-y-6',
  },
  tablet: {
    padding: 'px-6 md:px-8',
    text: 'text-base md:text-lg',
    spacing: 'space-y-6 md:space-y-8',
  },
  desktop: {
    padding: 'px-8 lg:px-12',
    text: 'text-lg lg:text-xl',
    spacing: 'space-y-8 lg:space-y-12',
  },
} as const;

export default {
  THEME_COLORS,
  THEME_GRADIENTS,
  THEME_ANIMATIONS,
  getThemeClasses,
  getThemeIconColor,
  getThemeGradient,
  getThemeShadow,
  getThemeHover,
  isDay,
  isNight,
  getOppositeTheme,
  TRANSITION_CLASSES,
  RESPONSIVE_THEME_CLASSES,
};
