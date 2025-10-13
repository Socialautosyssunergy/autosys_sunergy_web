'use client';

import React, { useState, memo } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { getThemeClasses } from '@/utils/themeUtils';
import { useTheme } from '@/contexts/ThemeContext';

interface FAQItemProps {
  faq: { question: string; answer: string };
  isDay: boolean;
}

const FAQItem = ({ faq, isDay }: FAQItemProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const themeClasses = getThemeClasses(useTheme().theme);
  const panelId = `faq-panel-${faq.question.replace(/\s+/g, '-')}`;

  return (
    <div className={`rounded-lg border transition-all duration-300 mb-2 sm:mb-3 ${
      isDay ? 'bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200' : 'bg-slate-800 border-slate-600'
    }`}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`w-full p-3 sm:p-4 text-left flex items-center justify-between transition-all duration-300 hover:bg-opacity-50 ${
          isDay ? 'hover:bg-blue-50' : 'hover:bg-slate-700'
        }`}
        aria-expanded={isOpen}
        aria-controls={panelId}
      >
        <h3 className={`text-sm sm:text-base font-semibold pr-3 leading-tight ${themeClasses.textPrimary} transition-colors`}>
          {faq.question}
        </h3>
        <div className={`flex-shrink-0 ${isDay ? 'text-blue-600' : 'text-gray-400'}`}>
          {isOpen ? (
            <ChevronUp className="w-4 h-4 sm:w-5 sm:h-5" />
          ) : (
            <ChevronDown className="w-4 h-4 sm:w-5 sm:h-5" />
          )}
        </div>
      </button>
      
      {isOpen && (
        <div 
          id={panelId}
          role="region"
          aria-labelledby={`faq-question-${faq.question.replace(/\s+/g, '-')}`}
          className={`px-3 sm:px-4 pb-3 sm:pb-4 border-t ${isDay ? 'border-blue-200' : 'border-slate-600'}`}
        >
          <p className={`pt-3 text-xs sm:text-sm leading-relaxed ${themeClasses.textSecondary} transition-colors`}>
            {faq.answer}
          </p>
        </div>
      )}
    </div>
  );
};

export default memo(FAQItem);
