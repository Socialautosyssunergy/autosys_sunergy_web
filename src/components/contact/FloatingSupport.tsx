'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from '@/contexts/ThemeContext';
import { getThemeClasses, TRANSITION_CLASSES } from '@/utils/themeUtils';
import { 
  Phone, 
  Mail, 
  MessageCircle, 
  X, 
  Headphones,
  Video,
  Calendar,
  ChevronRight,
  Clock
} from 'lucide-react';

interface FloatingSupportProps {
  className?: string;
}

const FloatingSupport: React.FC<FloatingSupportProps> = ({ className = '' }) => {
  const { theme, isDay } = useTheme();
  const themeClasses = getThemeClasses(theme);
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);

  const supportOptions = [
    {
      id: 'call',
      icon: Phone,
      title: 'Call Now',
      description: '+1 (555) 123-4567',
      color: isDay ? 'from-green-400 to-green-600' : 'from-green-500 to-green-700',
      action: () => window.open('tel:+15551234567')
    },
    {
      id: 'email',
      icon: Mail,
      title: 'Send Email',
      description: 'info@autosynsunergy.com',
      color: isDay ? 'from-blue-400 to-blue-600' : 'from-blue-500 to-blue-700',
      action: () => window.open('mailto:info@autosynsunergy.com')
    },
    {
      id: 'chat',
      icon: MessageCircle,
      title: 'Live Chat',
      description: 'Start conversation',
      color: isDay ? 'from-purple-400 to-purple-600' : 'from-purple-500 to-purple-700',
      action: () => console.log('Start chat')
    },
    {
      id: 'consultation',
      icon: Video,
      title: 'Video Call',
      description: 'Schedule consultation',
      color: isDay ? 'from-orange-400 to-orange-600' : 'from-orange-500 to-orange-700',
      action: () => console.log('Schedule video call')
    }
  ];

  const quickActions = [
    { icon: Calendar, label: 'Schedule', action: () => console.log('Schedule') },
    { icon: Headphones, label: 'Support', action: () => console.log('Support') },
    { icon: Clock, label: 'Hours', action: () => console.log('Hours') }
  ];

  return (
    <div className={`fixed bottom-6 right-6 z-50 ${className}`}>
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/20 backdrop-blur-sm"
              onClick={() => setIsOpen(false)}
            />

            {/* Support Panel */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.8, y: 20 }}
              transition={{ type: 'spring', stiffness: 300, damping: 20 }}
              className={`absolute bottom-20 right-0 w-80 max-w-[90vw] rounded-2xl shadow-2xl border overflow-hidden ${
                isDay 
                  ? 'bg-white/95 backdrop-blur-md border-amber-200' 
                  : 'bg-slate-800/95 backdrop-blur-md border-slate-600'
              }`}
            >
              {/* Header */}
              <div className={`p-4 border-b ${
                isDay ? 'border-amber-200' : 'border-slate-600'
              }`}>
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className={`font-semibold ${themeClasses.textPrimary} ${TRANSITION_CLASSES.colors}`}>
                      Need Help?
                    </h3>
                    <p className={`text-sm ${themeClasses.textSecondary} ${TRANSITION_CLASSES.colors}`}>
                      Choose how you&apos;d like to connect
                    </p>
                  </div>
                  <button
                    onClick={() => setIsOpen(false)}
                    className={`p-2 rounded-full transition-colors ${
                      isDay ? 'hover:bg-amber-100' : 'hover:bg-slate-700'
                    } ${themeClasses.textSecondary}`}
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Support Options */}
              <div className="p-4 space-y-3">
                {supportOptions.map((option, index) => (
                  <motion.button
                    key={option.id}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    onClick={option.action}
                    className={`w-full p-3 rounded-xl transition-all duration-300 flex items-center gap-3 ${
                      isDay 
                        ? 'hover:bg-amber-50 border border-amber-200' 
                        : 'hover:bg-slate-700 border border-slate-600'
                    } hover:scale-105 hover:shadow-lg`}
                  >
                    <div className={`w-10 h-10 rounded-full bg-gradient-to-r ${option.color} flex items-center justify-center flex-shrink-0`}>
                      <option.icon className="w-5 h-5 text-white" />
                    </div>
                    <div className="flex-1 text-left">
                      <p className={`font-medium ${themeClasses.textPrimary} ${TRANSITION_CLASSES.colors}`}>
                        {option.title}
                      </p>
                      <p className={`text-sm ${themeClasses.textSecondary} ${TRANSITION_CLASSES.colors}`}>
                        {option.description}
                      </p>
                    </div>
                    <ChevronRight className={`w-4 h-4 ${themeClasses.textSecondary}`} />
                  </motion.button>
                ))}
              </div>

              {/* Quick Actions */}
              <div className={`p-4 border-t ${
                isDay ? 'border-amber-200 bg-amber-50/50' : 'border-slate-600 bg-slate-700/50'
              }`}>
                <p className={`text-sm font-medium mb-3 ${themeClasses.textPrimary} ${TRANSITION_CLASSES.colors}`}>
                  Quick Actions
                </p>
                <div className="flex gap-2">
                  {quickActions.map((action, index) => (
                    <motion.button
                      key={index}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.3 + index * 0.1 }}
                      onClick={action.action}
                      className={`flex-1 p-2 rounded-lg transition-all duration-300 flex flex-col items-center gap-1 ${
                        isDay 
                          ? 'bg-white hover:bg-amber-100 border border-amber-200' 
                          : 'bg-slate-800 hover:bg-slate-600 border border-slate-600'
                      } hover:scale-105`}
                    >
                      <action.icon className={`w-4 h-4 ${
                        isDay ? 'text-amber-600' : 'text-blue-400'
                      }`} />
                      <span className={`text-xs ${themeClasses.textSecondary} ${TRANSITION_CLASSES.colors}`}>
                        {action.label}
                      </span>
                    </motion.button>
                  ))}
                </div>
              </div>

              {/* Footer */}
              <div className={`p-3 text-center ${
                isDay ? 'bg-amber-50/50' : 'bg-slate-700/50'
              }`}>
                <p className={`text-xs ${themeClasses.textSecondary} ${TRANSITION_CLASSES.colors}`}>
                  Available 24/7 • Response within 2 hours
                </p>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Floating Button */}
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        className={`w-14 h-14 rounded-full shadow-lg flex items-center justify-center transition-all duration-300 ${
          isDay
            ? 'bg-gradient-to-r from-amber-400 to-orange-500 hover:from-amber-500 hover:to-orange-600'
            : 'bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600'
        } text-white hover:scale-110 hover:shadow-xl`}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        animate={{ 
          rotate: isOpen ? 180 : 0,
          backgroundColor: isOpen 
            ? (isDay ? '#ef4444' : '#dc2626')
            : undefined
        }}
        transition={{ type: 'spring', stiffness: 200, damping: 15 }}
      >
        <AnimatePresence mode="wait">
          {isOpen ? (
            <motion.div
              key="close"
              initial={{ opacity: 0, rotate: -90 }}
              animate={{ opacity: 1, rotate: 0 }}
              exit={{ opacity: 0, rotate: 90 }}
            >
              <X className="w-6 h-6" />
            </motion.div>
          ) : (
            <motion.div
              key="headphones"
              initial={{ opacity: 0, rotate: -90 }}
              animate={{ opacity: 1, rotate: 0 }}
              exit={{ opacity: 0, rotate: 90 }}
            >
              <Headphones className="w-6 h-6" />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.button>

      {/* Status Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
        className="absolute -top-1 -right-1 w-4 h-4 bg-green-400 rounded-full border-2 border-white"
      >
        <motion.div
          animate={{ scale: [1, 1.2, 1] }}
          transition={{ repeat: Infinity, duration: 2 }}
          className="w-full h-full bg-green-400 rounded-full"
        />
      </motion.div>
    </div>
  );
};

export default FloatingSupport;
