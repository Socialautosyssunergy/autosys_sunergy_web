'use client';
import React from 'react';
import { useTheme } from '@/contexts/ThemeContext';
import { getThemeClasses, getThemeHover, TRANSITION_CLASSES } from '@/utils/themeUtils';
import { 
  Shield, 
  Zap, 
  TrendingUp, 
  Clock, 
  Wrench, 
  Sun,
  Battery,
  Wifi,
  Smartphone,
  BarChart3
} from 'lucide-react';

export default function AdvancedFeatures() {
  const { theme, isDay } = useTheme();
  const themeClasses = getThemeClasses(theme);
  const hoverEffects = getThemeHover(theme);

  const technologies = [
    {
      icon: <Sun className="w-8 h-8" />,
      title: "Monocrystalline Panels",
      description: "22%+ efficiency with 25-year linear warranty",
      specs: ["540W+ capacity", "Tier-1 modules", "Anti-PID coating"]
    },
    {
      icon: <Battery className="w-8 h-8" />,
      title: "Hybrid Inverters",
      description: "Smart grid-tie with battery backup support",
      specs: ["97%+ efficiency", "WiFi monitoring", "Surge protection"]
    },
    {
      icon: <Wifi className="w-8 h-8" />,
      title: "IoT Monitoring",
      description: "Real-time performance tracking and alerts",
      specs: ["Mobile app", "Cloud analytics", "Fault detection"]
    },
    {
      icon: <Shield className="w-8 h-8" />,
      title: "Advanced Mounting",
      description: "3-Purlin structure with anti-wind clamping",
      specs: ["Wind resistant", "Corrosion proof", "25-year life"]
    }
  ];

  return (
    <>
      {/* Technology & Innovation Section */}
      <section className={`py-16 transition-all duration-500 ${
        isDay ? 'bg-white' : 'bg-slate-900'
      }`}>
        <div className="max-w-6xl mx-auto px-8">
          <div className="text-center mb-12">
            <h2 className={`text-3xl md:text-4xl font-bold mb-4 ${themeClasses.textPrimary} ${TRANSITION_CLASSES.colors}`}>
              Advanced Solar Technology
            </h2>
            <p className={`text-lg max-w-3xl mx-auto ${themeClasses.textSecondary} ${TRANSITION_CLASSES.colors}`}>
              Cutting-edge components and smart monitoring for maximum performance and reliability
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            {technologies.map((tech, index) => (
              <div key={index} className={`p-6 rounded-xl border text-center transition-all duration-300 hover:shadow-lg ${hoverEffects.scale} ${
                isDay 
                  ? 'bg-white border-gray-200 hover:border-blue-300' 
                  : 'bg-slate-800 border-slate-600 hover:border-blue-400'
              }`}>
                <div className={`inline-flex items-center justify-center w-16 h-16 rounded-xl mb-4 ${
                  isDay ? 'bg-gradient-to-br from-blue-500 to-blue-600 text-white' : 'bg-gradient-to-br from-blue-500 to-cyan-500 text-white'
                }`}>
                  {tech.icon}
                </div>
                <h3 className={`text-lg font-semibold mb-2 ${themeClasses.textPrimary} ${TRANSITION_CLASSES.colors}`}>
                  {tech.title}
                </h3>
                <p className={`text-sm mb-3 ${themeClasses.textSecondary} ${TRANSITION_CLASSES.colors}`}>
                  {tech.description}
                </p>
                <ul className="space-y-1">
                  {tech.specs.map((spec, specIndex) => (
                    <li key={specIndex} className={`text-xs ${themeClasses.textSecondary} ${TRANSITION_CLASSES.colors}`}>
                      • {spec}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Performance Guarantee Section */}
      <section className={`py-16 transition-all duration-500 ${
        isDay ? 'bg-white' : 'bg-slate-900'
      }`}>
        <div className="max-w-6xl mx-auto px-8">
          <div className="text-center mb-12">
            <h2 className={`text-3xl md:text-4xl font-bold mb-4 ${themeClasses.textPrimary} ${TRANSITION_CLASSES.colors}`}>
              Performance Guarantees
            </h2>
            <p className={`text-lg max-w-3xl mx-auto ${themeClasses.textSecondary} ${TRANSITION_CLASSES.colors}`}>
              We stand behind our installations with comprehensive warranties and performance commitments
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                icon: <Shield className="w-8 h-8" />,
                title: "25-Year Warranty",
                description: "Linear power output warranty on all solar panels",
                guarantee: "90% output after 10 years, 80% after 25 years"
              },
              {
                icon: <TrendingUp className="w-8 h-8" />,
                title: "ROI Guarantee",
                description: "Guaranteed return on investment within specified timeframe",
                guarantee: "4-6 year payback period or compensation"
              },
              {
                icon: <Wrench className="w-8 h-8" />,
                title: "O&M Support",
                description: "Comprehensive operation and maintenance packages",
                guarantee: "24/7 monitoring and rapid response service"
              },
              {
                icon: <Clock className="w-8 h-8" />,
                title: "Performance Monitoring",
                description: "Real-time system performance tracking and alerts",
                guarantee: "99%+ system uptime with proactive maintenance"
              }
            ].map((guarantee, index) => (
              <div key={index} className={`p-6 rounded-xl border text-center transition-all duration-300 hover:shadow-lg ${
                isDay 
                  ? 'bg-gradient-to-br from-green-50 to-emerald-50 border-green-200 hover:border-green-300' 
                  : 'bg-gradient-to-br from-green-900/20 to-emerald-900/20 border-green-600 hover:border-green-500'
              }`}>
                <div className={`inline-flex items-center justify-center w-16 h-16 rounded-xl mb-4 ${
                  isDay ? 'bg-gradient-to-br from-green-500 to-emerald-500 text-white' : 'bg-gradient-to-br from-green-500 to-emerald-400 text-white'
                }`}>
                  {guarantee.icon}
                </div>
                <h3 className={`text-lg font-semibold mb-2 ${themeClasses.textPrimary} ${TRANSITION_CLASSES.colors}`}>
                  {guarantee.title}
                </h3>
                <p className={`text-sm mb-3 ${themeClasses.textSecondary} ${TRANSITION_CLASSES.colors}`}>
                  {guarantee.description}
                </p>
                <p className={`text-xs font-medium ${isDay ? 'text-green-600' : 'text-green-400'}`}>
                  {guarantee.guarantee}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
