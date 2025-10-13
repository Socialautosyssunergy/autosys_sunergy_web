'use client';
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

export type Theme = 'day' | 'night';

interface ThemeContextType {
  theme: Theme;
  toggleTheme: () => void;
  setTheme: (theme: Theme) => void;
  isDay: boolean;
  isNight: boolean;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};

interface ThemeProviderProps {
  children: ReactNode;
}

export const ThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
  const [theme, setThemeState] = useState<Theme>('day');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Load theme from localStorage on mount
    const savedTheme = localStorage.getItem('autosys-theme') as Theme;
    if (savedTheme && (savedTheme === 'day' || savedTheme === 'night')) {
      setThemeState(savedTheme);
    }
    setIsLoading(false);
  }, []);

  useEffect(() => {
    if (isLoading) return;
    
    // Apply theme to document and save to localStorage
    const root = document.documentElement;
    const body = document.body;
    
    // Remove previous theme classes
    root.classList.remove('theme-day', 'theme-night');
    body.classList.remove('theme-day', 'theme-night');
    
    // Add current theme class to both html and body
    root.classList.add(`theme-${theme}`);
    body.classList.add(`theme-${theme}`);
    
    // Add data attribute for CSS selectors
    root.setAttribute('data-theme', theme);
    
    // Save to localStorage with app-specific key
    localStorage.setItem('autosys-theme', theme);
    
    // Dispatch custom event for other components that might need it
    window.dispatchEvent(new CustomEvent('themeChange', { detail: { theme } }));
  }, [theme, isLoading]);

  const toggleTheme = () => {
    setThemeState(prev => prev === 'day' ? 'night' : 'day');
  };

  const setTheme = (newTheme: Theme) => {
    setThemeState(newTheme);
  };

  // Helper computed values
  const isDay = theme === 'day';
  const isNight = theme === 'night';

  // Don't render children until theme is loaded to prevent flash
  if (isLoading) {
    return <div className="fixed inset-0 bg-white dark:bg-slate-900" />;
  }

  return (
    <ThemeContext.Provider value={{ 
      theme, 
      toggleTheme, 
      setTheme, 
      isDay, 
      isNight 
    }}>
      {children}
    </ThemeContext.Provider>
  );
};
