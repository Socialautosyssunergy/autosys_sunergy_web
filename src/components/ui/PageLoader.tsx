'use client';
import React, { useEffect, useState } from 'react';
import { useTheme } from '@/contexts/ThemeContext';
import OptimizedImageComponent from '@/components/ui/OptimizedImageComponent';


export default function PageLoader() {
  const [isLoading, setIsLoading] = useState(true);
  const [progress, setProgress] = useState(0);
  const { isDay } = useTheme();

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((oldProgress) => {
        if (oldProgress === 100) {
          clearInterval(timer);
          setTimeout(() => setIsLoading(false), 500);
          return 100;
        }
        const diff = Math.random() * 10;
        return Math.min(oldProgress + diff, 100);
      });
    }, 100);

    return () => {
      clearInterval(timer);
    };
  }, []);

  if (!isLoading) return null;

  return (
    <div className={`fixed inset-0 z-50 flex items-center justify-center transition-all duration-500 ${
      isDay ? 'bg-gradient-to-br from-blue-50 to-blue-100' : 'bg-slate-900'
    }`}>
      <div className="text-center">
        {/* Logo */}
        <div className={`w-24 h-24 mx-auto mb-8 rounded-xl overflow-hidden shadow-lg ${
          isDay ? 'bg-gradient-to-br from-blue-50 to-blue-100 border border-blue-200' : 'bg-slate-800 border border-slate-600'
        }`}>
          <OptimizedImageComponent src="/Autosys_sunergy_logo.jpg" alt="Autosys Sunergy" width={800} height={600} priority={true} />
        </div>

        {/* Company Name */}
        <h1 className={`text-2xl font-bold mb-2 ${
          isDay ? 'text-slate-800' : 'text-slate-100'
        }`}>
          Autosys Sunergy
        </h1>
        <p className={`text-sm mb-8 ${
          isDay ? 'text-slate-600' : 'text-slate-400'
        }`}>
          Solar Excellence Since 2007
        </p>

        {/* Progress Bar */}
        <div className={`w-64 h-2 rounded-full overflow-hidden ${
          isDay ? 'bg-gray-200' : 'bg-slate-700'
        }`}>
          <div 
            className={`h-full rounded-full transition-all duration-300 ${
              isDay 
                ? 'bg-gradient-to-r from-orange-500 to-amber-500' 
                : 'bg-gradient-to-r from-blue-500 to-cyan-500'
            }`}
            style={{ width: `${progress}%` }}
          />
        </div>
        <p className={`text-xs mt-2 ${
          isDay ? 'text-slate-500' : 'text-slate-400'
        }`}>
          Loading... {Math.round(progress)}%
        </p>
      </div>
    </div>
  );
}
