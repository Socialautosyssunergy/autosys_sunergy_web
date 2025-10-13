'use client';
import React from 'react';
import { Sun, Moon, Zap, Shield, Award, Users } from 'lucide-react';
import { useTheme } from '@/contexts/ThemeContext';
import { ThemeToggle } from '@/components/ui/ThemeToggle';
import { 
  getThemeClasses, 
  getThemeGradient, 
  getThemeShadow, 
  getThemeHover,
  TRANSITION_CLASSES 
} from '@/utils/themeUtils';

/**
 * Demo Component showcasing all theme features
 * This component demonstrates how to use the dual-theme system effectively
 */
export default function ThemeDemo() {
  const { theme, isDay, isNight, toggleTheme } = useTheme();
  const themeClasses = getThemeClasses(theme);
  const hoverEffects = getThemeHover(theme);

  const features = [
    {
      icon: Zap,
      title: 'High Performance',
      description: 'Optimized solar panels with 22% efficiency rating',
      color: isDay ? 'text-amber-600' : 'text-cyan-400',
    },
    {
      icon: Shield,
      title: 'Reliability',
      description: '25-year warranty with comprehensive coverage',
      color: isDay ? 'text-orange-600' : 'text-blue-400',
    },
    {
      icon: Award,
      title: 'Award Winning',
      description: 'Recognized excellence in solar installation',
      color: isDay ? 'text-red-600' : 'text-purple-400',
    },
    {
      icon: Users,
      title: 'Expert Support',
      description: '24/7 customer service and maintenance',
      color: isDay ? 'text-amber-700' : 'text-indigo-400',
    },
  ];

  return (
    <section className={`py-16 ${themeClasses.background} ${TRANSITION_CLASSES.normal}`}>
      <div className="container mx-auto px-6">
        {/* Header Section */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-4 mb-6">
            <h1 className={`text-4xl font-bold ${themeClasses.textPrimary} ${TRANSITION_CLASSES.colors}`}>
              Theme System Demo
            </h1>
            <ThemeToggle size="lg" showLabel />
          </div>
          
          <p className={`text-lg max-w-2xl mx-auto ${themeClasses.textSecondary} ${TRANSITION_CLASSES.colors}`}>
            Experience our premium dual-theme system designed for solar energy websites. 
            Toggle between day (sun-inspired) and night (futuristic blue) themes.
          </p>
        </div>

        {/* Theme Showcase Cards */}
        <div className="grid md:grid-cols-2 gap-8 mb-12">
          {/* Day Theme Card */}
          <div className={`p-8 rounded-2xl border-2 ${TRANSITION_CLASSES.normal} ${hoverEffects.scale} ${
            isDay 
              ? 'bg-gradient-to-br from-amber-50 to-orange-100 border-amber-300 shadow-lg shadow-amber-500/20' 
              : 'bg-slate-800/50 border-slate-600 shadow-lg'
          }`}>
            <div className="flex items-center gap-3 mb-4">
              <Sun className={`w-8 h-8 ${isDay ? 'text-amber-600' : 'text-slate-400'} ${TRANSITION_CLASSES.colors}`} />
              <h3 className={`text-2xl font-bold ${isDay ? 'text-amber-800' : 'text-slate-300'} ${TRANSITION_CLASSES.colors}`}>
                Day Theme
              </h3>
            </div>
            <p className={`${isDay ? 'text-amber-700' : 'text-slate-400'} ${TRANSITION_CLASSES.colors}`}>
              Inspired by sunlight and solar energy. Features warm amber and orange colors that 
              evoke the feeling of clean, renewable solar power.
            </p>
          </div>

          {/* Night Theme Card */}
          <div className={`p-8 rounded-2xl border-2 ${TRANSITION_CLASSES.normal} ${hoverEffects.scale} ${
            isNight 
              ? 'bg-gradient-to-br from-blue-900/50 to-indigo-900/50 border-blue-400 shadow-lg shadow-blue-500/20' 
              : 'bg-slate-50 border-slate-200 shadow-lg'
          }`}>
            <div className="flex items-center gap-3 mb-4">
              <Moon className={`w-8 h-8 ${isNight ? 'text-cyan-400' : 'text-slate-400'} ${TRANSITION_CLASSES.colors}`} />
              <h3 className={`text-2xl font-bold ${isNight ? 'text-cyan-300' : 'text-slate-600'} ${TRANSITION_CLASSES.colors}`}>
                Night Theme
              </h3>
            </div>
            <p className={`${isNight ? 'text-blue-200' : 'text-slate-600'} ${TRANSITION_CLASSES.colors}`}>
              Futuristic blue-night style with modern tech aesthetics. Perfect for showcasing 
              advanced solar technology and smart energy solutions.
            </p>
          </div>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {features.map((feature, index) => (
            <div
              key={index}
              className={`p-6 rounded-xl border ${themeClasses.card} ${TRANSITION_CLASSES.normal} ${hoverEffects.scale} ${hoverEffects.glow}`}
            >
              <feature.icon className={`w-12 h-12 mb-4 ${feature.color} ${TRANSITION_CLASSES.colors}`} />
              <h4 className={`text-lg font-semibold mb-2 ${themeClasses.textPrimary} ${TRANSITION_CLASSES.colors}`}>
                {feature.title}
              </h4>
              <p className={`text-sm ${themeClasses.textSecondary} ${TRANSITION_CLASSES.colors}`}>
                {feature.description}
              </p>
            </div>
          ))}
        </div>

        {/* Interactive Buttons */}
        <div className="flex flex-wrap items-center justify-center gap-4 mb-12">
          <button
            className={`px-8 py-3 rounded-lg font-semibold ${themeClasses.buttonPrimary} ${TRANSITION_CLASSES.normal} ${hoverEffects.scale} ${getThemeShadow(theme, 'lg')}`}
          >
            Primary Button
          </button>
          
          <button
            className={`px-8 py-3 rounded-lg font-semibold ${themeClasses.buttonSecondary} ${TRANSITION_CLASSES.normal} ${hoverEffects.scale}`}
          >
            Secondary Button
          </button>
          
          <button
            onClick={toggleTheme}
            className={`px-8 py-3 rounded-lg font-semibold border-2 ${TRANSITION_CLASSES.normal} ${hoverEffects.scale} ${
              isDay 
                ? 'border-amber-400 text-amber-600 hover:bg-amber-50' 
                : 'border-cyan-400 text-cyan-400 hover:bg-cyan-400/10'
            }`}
          >
            Toggle Theme
          </button>
        </div>

        {/* Glass Morphism Example */}
        <div className={`p-8 rounded-2xl ${themeClasses.glass} ${TRANSITION_CLASSES.normal} ${hoverEffects.scale}`}>
          <h3 className={`text-2xl font-bold mb-4 ${themeClasses.textPrimary} ${TRANSITION_CLASSES.colors}`}>
            Glass Morphism Effect
          </h3>
          <p className={`${themeClasses.textSecondary} ${TRANSITION_CLASSES.colors}`}>
            This card demonstrates the glass morphism effect that adapts to both themes. 
            The backdrop blur and transparency create a modern, premium feel that works 
            perfectly with both day and night color schemes.
          </p>
        </div>

        {/* Gradient Showcase */}
        <div className="mt-12 grid md:grid-cols-3 gap-6">
          <div className={`p-6 rounded-xl ${getThemeGradient(theme, 'primary')} ${TRANSITION_CLASSES.normal} ${hoverEffects.scale}`}>
            <h4 className="text-white font-semibold mb-2">Primary Gradient</h4>
            <p className="text-white/80 text-sm">Main brand gradient</p>
          </div>
          
          <div className={`p-6 rounded-xl ${getThemeGradient(theme, 'secondary')} ${TRANSITION_CLASSES.normal} ${hoverEffects.scale}`}>
            <h4 className="text-white font-semibold mb-2">Secondary Gradient</h4>
            <p className="text-white/80 text-sm">Accent gradient</p>
          </div>
          
          <div className={`p-6 rounded-xl ${getThemeGradient(theme, 'background')} ${TRANSITION_CLASSES.normal} ${hoverEffects.scale}`}>
            <h4 className={`font-semibold mb-2 ${themeClasses.textPrimary} ${TRANSITION_CLASSES.colors}`}>
              Background Gradient
            </h4>
            <p className={`text-sm ${themeClasses.textSecondary} ${TRANSITION_CLASSES.colors}`}>
              Subtle background
            </p>
          </div>
        </div>

        {/* Code Example */}
        <div className="mt-12">
          <h3 className={`text-2xl font-bold mb-6 text-center ${themeClasses.textPrimary} ${TRANSITION_CLASSES.colors}`}>
            Usage Example
          </h3>
          <div className={`p-6 rounded-lg ${themeClasses.surface} ${themeClasses.border} border ${TRANSITION_CLASSES.normal}`}>
            <pre className={`text-sm ${themeClasses.textSecondary} ${TRANSITION_CLASSES.colors} overflow-x-auto`}>
{`// Using the theme system
import { useTheme } from '@/contexts/ThemeContext';
import { getThemeClasses, getThemeGradient } from '@/utils/themeUtils';

const MyComponent = () => {
  const { theme, isDay, toggleTheme } = useTheme();
  const themeClasses = getThemeClasses(theme);
  
  return (
    <div className={\`\${themeClasses.background} \${themeClasses.textPrimary}\`}>
      <button 
        onClick={toggleTheme}
        className={\`\${themeClasses.buttonPrimary} \${getThemeGradient(theme)}\`}
      >
        {isDay ? 'Switch to Night' : 'Switch to Day'}
      </button>
    </div>
  );
};`}
            </pre>
          </div>
        </div>
      </div>
    </section>
  );
}
