'use client';
import React, { useState, useEffect } from 'react';
import { useTheme } from '@/contexts/ThemeContext';
import { Phone, MessageCircle, X, Calculator, Headphones, Calendar } from 'lucide-react';

export default function FloatingActionButton() {
  const [isOpen, setIsOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const { theme, isDay } = useTheme();

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
      setIsVisible(scrollTop > 300);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const actions = [
    {
      icon: <Phone className="w-5 h-5" />,
      label: "Call Now",
      action: () => window.open('tel:+918818880540'),
      color: "bg-green-500 hover:bg-green-600"
    },
    {
      icon: <MessageCircle className="w-5 h-5" />,
      label: "WhatsApp",
      action: () => window.open('https://wa.me/918818880540?text=Hello, I need information about solar installation'),
      color: "bg-green-600 hover:bg-green-700"
    },
    {
      icon: <Calculator className="w-5 h-5" />,
      label: "ROI Calculator",
      action: () => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' }),
      color: "bg-blue-500 hover:bg-blue-600"
    },
    {
      icon: <Calendar className="w-5 h-5" />,
      label: "Book Visit",
      action: () => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' }),
      color: "bg-purple-500 hover:bg-purple-600"
    }
  ];

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {/* Action Buttons */}
      {isOpen && (
        <div className="absolute bottom-16 right-0 space-y-3">
          {actions.map((item, index) => (
            <div
              key={index}
              className={`flex items-center space-x-3 transform transition-all duration-300 ${
                isOpen ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'
              }`}
              style={{ transitionDelay: `${index * 100}ms` }}
            >
              <span className={`px-3 py-2 rounded-lg text-sm font-medium whitespace-nowrap shadow-lg ${
                isDay ? 'bg-gradient-to-br from-blue-50 to-blue-100 text-blue-800 border border-blue-200' : 'bg-slate-800 text-white border border-slate-600'
              }`}>
                {item.label}
              </span>
              <button
                onClick={item.action}
                className={`w-12 h-12 rounded-full ${item.color} text-white shadow-lg hover:shadow-xl transform hover:scale-110 transition-all duration-300 flex items-center justify-center`}
              >
                {item.icon}
              </button>
            </div>
          ))}
        </div>
      )}

      {/* Main FAB */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`w-14 h-14 rounded-full shadow-xl hover:shadow-2xl transform hover:scale-110 transition-all duration-300 flex items-center justify-center ${
          isDay 
            ? 'bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600' 
            : 'bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600'
        } text-white`}
      >
        {isOpen ? (
          <X className="w-6 h-6" />
        ) : (
          <Headphones className="w-6 h-6" />
        )}
      </button>
      
      {/* Pulse animation */}
      {!isOpen && (
        <div className={`absolute inset-0 rounded-full animate-ping ${
          isDay ? 'bg-orange-400' : 'bg-blue-400'
        } opacity-20`} />
      )}
    </div>
  );
}
