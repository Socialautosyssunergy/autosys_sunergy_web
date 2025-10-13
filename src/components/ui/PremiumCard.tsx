'use client';
import React, { ReactNode } from 'react';
import { useTheme } from '@/contexts/ThemeContext';
import { getThemeClasses, getThemeHover } from '@/utils/themeUtils';

interface PremiumCardProps {
  children: ReactNode;
  className?: string;
  hover?: boolean;
  glow?: boolean;
  gradient?: boolean;
  onClick?: () => void;
}

export const PremiumCard = ({ 
  children, 
  className = '', 
  hover = true, 
  glow = false, 
  gradient = false,
  onClick 
}: PremiumCardProps) => {
  const { theme } = useTheme();
  const themeClasses = getThemeClasses(theme);
  const hoverEffects = getThemeHover(theme);

  const baseClasses = `
    relative overflow-hidden backdrop-blur-lg border
    ${themeClasses.card} ${themeClasses.border}
    ${hover ? `${hoverEffects.lift} cursor-pointer` : ''}
    ${glow ? 'shadow-2xl ring-1 ring-white/10' : 'shadow-lg'}
    ${gradient ? 'bg-gradient-to-br from-white/10 to-white/5' : ''}
  `;

  return (
    <div 
      className={`${baseClasses} ${className}`}
      onClick={onClick}
    >
      {glow && (
        <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 via-purple-500/20 to-emerald-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      )}
      <div className="relative z-10">
        {children}
      </div>
    </div>
  );
};

interface PremiumSectionProps {
  children: ReactNode;
  className?: string;
  backgroundPattern?: boolean;
}

export const PremiumSection = ({ 
  children, 
  className = '', 
  backgroundPattern = false 
}: PremiumSectionProps) => {
  const { theme } = useTheme();
  const themeClasses = getThemeClasses(theme);

  return (
    <section className={`relative ${className}`}>
      {backgroundPattern && (
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-500 via-purple-500 to-emerald-500" />
          <div 
            className="absolute inset-0" 
            style={{
              backgroundImage: `radial-gradient(circle at 25% 25%, rgba(255,255,255,0.2) 0%, transparent 50%), 
                               radial-gradient(circle at 75% 75%, rgba(255,255,255,0.2) 0%, transparent 50%)`,
            }}
          />
        </div>
      )}
      <div className="relative z-10">
        {children}
      </div>
    </section>
  );
};

interface PremiumHeroProps {
  title: string;
  subtitle: string;
  description?: string;
  backgroundImage?: string;
  children?: ReactNode;
}

export const PremiumHero = ({ 
  title, 
  subtitle, 
  description, 
  backgroundImage,
  children 
}: PremiumHeroProps) => {
  const { theme } = useTheme();
  const themeClasses = getThemeClasses(theme);

  return (
    <div className="relative min-h-[60vh] flex items-center justify-center overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0">
        {backgroundImage ? (
          <div 
            className="absolute inset-0 bg-cover bg-center bg-no-repeat"
            style={{ backgroundImage: `url(${backgroundImage})` }}
          />
        ) : (
          <div className="absolute inset-0 bg-gradient-to-br from-blue-600 via-purple-600 to-emerald-600" />
        )}
        <div className="absolute inset-0 bg-black/40" />
        
        {/* Animated background elements */}
        <div className="absolute inset-0">
          <div className="absolute top-20 left-20 w-72 h-72 bg-white/10 rounded-full blur-3xl animate-pulse" />
          <div className="absolute bottom-20 right-20 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl animate-pulse delay-1000" />
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-purple-500/20 rounded-full blur-3xl animate-pulse delay-2000" />
        </div>
      </div>

      {/* Content */}
      <div className="relative z-10 text-center max-w-4xl mx-auto px-6">
        <div className="space-y-6 animate-fade-in-up">
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-6">
            <span className="bg-gradient-to-r from-white via-blue-100 to-emerald-100 bg-clip-text text-transparent">
              {title}
            </span>
          </h1>
          <p className="text-xl md:text-2xl text-white/90 font-medium">
            {subtitle}
          </p>
          {description && (
            <p className="text-lg text-white/80 max-w-2xl mx-auto leading-relaxed">
              {description}
            </p>
          )}
          {children}
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center">
          <div className="w-1 h-3 bg-white/60 rounded-full mt-2 animate-pulse" />
        </div>
      </div>
    </div>
  );
};
