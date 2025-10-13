'use client';
import React from 'react';
import { Sun, Moon, Sparkles } from 'lucide-react';
import { useTheme } from '@/contexts/ThemeContext';

interface ThemeToggleProps {
  isScrolled?: boolean;
  size?: 'sm' | 'md' | 'lg';
  showLabel?: boolean;
}

export const ThemeToggle: React.FC<ThemeToggleProps> = ({ 
  isScrolled = false,
  size = 'md',
  showLabel = false
}) => {
  const { theme, toggleTheme, isDay, isNight } = useTheme();

  const sizeClasses = {
    sm: 'w-8 h-8',
    md: 'w-12 h-12',
    lg: 'w-16 h-16'
  };

  const iconSizes = {
    sm: 'w-3 h-3',
    md: 'w-5 h-5',
    lg: 'w-7 h-7'
  };

  return (
    <div className="flex items-center gap-2">
      {showLabel && (
        <span className={`text-sm font-medium transition-colors duration-300 ${
          isScrolled 
            ? theme === 'day' ? 'text-slate-700' : 'text-slate-300'
            : theme === 'day' ? 'text-white' : 'text-blue-100'
        }`}>
          {isDay ? 'Day' : 'Night'}
        </span>
      )}
      
      <button
        onClick={toggleTheme}
        className={`
          relative ${sizeClasses[size]} rounded-full border-2 transition-all duration-500 
          flex items-center justify-center group overflow-hidden
          transform hover:scale-110 active:scale-95
          ${isScrolled 
            ? isDay
              ? 'border-amber-300 bg-gradient-to-br from-amber-50 to-orange-100 hover:border-amber-400 shadow-md hover:shadow-amber-200' 
              : 'border-blue-400 bg-gradient-to-br from-blue-900 to-indigo-900 hover:border-cyan-400 shadow-md hover:shadow-blue-500/20'
            : isDay
              ? 'border-white/40 bg-gradient-to-br from-white/20 to-amber-100/20 backdrop-blur-md hover:border-white/70 shadow-lg hover:shadow-amber-300/20'
              : 'border-blue-300/40 bg-gradient-to-br from-blue-500/20 to-cyan-500/10 backdrop-blur-md hover:border-cyan-300/70 shadow-lg hover:shadow-cyan-400/20'
          }
          before:absolute before:inset-0 before:rounded-full before:bg-gradient-to-br 
          ${isDay 
            ? 'before:from-amber-400/0 before:to-orange-400/0 hover:before:from-amber-400/20 hover:before:to-orange-400/20' 
            : 'before:from-blue-400/0 before:to-cyan-400/0 hover:before:from-blue-400/20 hover:before:to-cyan-400/20'
          }
          before:transition-all before:duration-300
        `}
        title={`Switch to ${isDay ? 'night' : 'day'} theme`}
        aria-label={`Switch to ${isDay ? 'night' : 'day'} theme`}
      >
        {/* Background Orb Effect */}
        <div className={`
          absolute inset-1 rounded-full transition-all duration-500 
          ${isDay 
            ? 'bg-gradient-to-br from-amber-300/30 to-orange-400/30 shadow-inner' 
            : 'bg-gradient-to-br from-blue-400/20 to-indigo-500/20 shadow-inner'
          }
          group-hover:scale-110 group-hover:opacity-80
        `} />

        {/* Day Icon (Sun) with Rays */}
        <div className={`
          absolute transition-all duration-700 ease-in-out
          ${isDay 
            ? 'opacity-100 rotate-0 scale-100' 
            : 'opacity-0 rotate-180 scale-75'
          }
        `}>
          <Sun
            className={`
              ${iconSizes[size]} text-amber-600 drop-shadow-lg relative z-10
              group-hover:text-amber-500 transition-colors duration-300
            `}
          />
          {/* Sun rays effect */}
          <div className="absolute inset-0 flex items-center justify-center">
            {[...Array(8)].map((_, i) => (
              <div
                key={i}
                className={`
                  absolute w-0.5 h-6 bg-gradient-to-t from-transparent via-amber-400/60 to-transparent
                  transition-all duration-500 group-hover:scale-110
                `}
                style={{
                  transform: `rotate(${i * 45}deg)`,
                  transformOrigin: 'center'
                }}
              />
            ))}
          </div>
        </div>
      
        {/* Night Icon (Moon) with Stars */}
        <div className={`
          absolute transition-all duration-700 ease-in-out
          ${isNight 
            ? 'opacity-100 rotate-0 scale-100' 
            : 'opacity-0 -rotate-180 scale-75'
          }
        `}>
          <Moon
            className={`
              ${iconSizes[size]} text-blue-300 drop-shadow-lg relative z-10
              group-hover:text-cyan-300 transition-colors duration-300
            `}
          />
          {/* Sparkle effects */}
          <div className="absolute inset-0 flex items-center justify-center">
            {[...Array(3)].map((_, i) => (
              <Sparkles
                key={i}
                className={`
                  absolute w-2 h-2 text-cyan-400/60 animate-pulse
                  transition-all duration-500 group-hover:scale-125
                `}
                style={{
                  transform: `translate(${i === 0 ? '-8px' : i === 1 ? '8px' : '0px'}, ${i === 2 ? '-8px' : '4px'})`,
                  animationDelay: `${i * 0.5}s`
                }}
              />
            ))}
          </div>
        </div>

        {/* Pulse effect on hover */}
        <div className={`
          absolute inset-0 rounded-full opacity-0 group-hover:opacity-30 
          transition-all duration-300 animate-pulse
          ${isDay 
            ? 'bg-gradient-to-br from-amber-400 to-orange-400' 
            : 'bg-gradient-to-br from-blue-400 to-cyan-400'
          }
        `} />
      </button>
    </div>
  );
};
