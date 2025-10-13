'use client';
import React, { useState, useEffect } from 'react';
import { Volume2, MessageCircle, X } from 'lucide-react';
import { useTheme } from '@/contexts/ThemeContext';
import { getThemeClasses } from '@/utils/themeUtils';

interface WelcomePopupProps {
  onAccept: () => void;
  onDecline: () => void;
}

export default function WelcomePopup({ onAccept, onDecline }: WelcomePopupProps) {
  const { theme } = useTheme();
  const themeClasses = getThemeClasses(theme);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Show popup after 3 seconds
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  const handleAccept = () => {
    setIsVisible(false);
    onAccept();
  };

  const handleDecline = () => {
    setIsVisible(false);
    onDecline();
  };

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className={`w-full max-w-md rounded-2xl shadow-2xl transition-all duration-300 ${themeClasses.card}`}>
        {/* Header */}
        <div className={`p-6 border-b ${themeClasses.border}`}>
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className={`w-12 h-12 rounded-full flex items-center justify-center ${
                theme === 'day' 
                  ? 'bg-gradient-to-r from-pink-400 to-purple-500' 
                  : 'bg-gradient-to-r from-purple-500 to-pink-400'
              }`}>
                <MessageCircle className="w-6 h-6 text-white" />
              </div>
              <div>
                <h2 className={`text-lg font-bold ${themeClasses.textPrimary}`}>
                  सुनीता - AI सोलर असिस्टेंट
                </h2>
                <p className={`text-sm ${themeClasses.textSecondary}`}>
                  आपकी सोलर एनर्जी सलाहकार
                </p>
              </div>
            </div>
            <button
              onClick={handleDecline}
              className={`p-2 rounded-lg transition-colors hover:bg-gray-100 dark:hover:bg-gray-700`}
            >
              <X className={`w-5 h-5 ${themeClasses.textSecondary}`} />
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="p-6">
          <div className="text-center space-y-4">
            <div className="space-y-2">
              <h3 className={`text-base font-semibold ${themeClasses.textPrimary}`}>
                नमस्कार! 🙏
              </h3>
              <p className={`text-sm ${themeClasses.textSecondary}`}>
                मैं सुनीता हूँ, आपकी AI सोलर एनर्जी सलाहकार। मैं आपको सोलर पैनल, कीमत, सब्सिडी और installation के बारे में सभी जानकारी दे सकती हूँ।
              </p>
            </div>

            <div className={`p-4 rounded-lg ${
              theme === 'day' ? 'bg-blue-50' : 'bg-blue-900/20'
            }`}>
              <div className="flex items-start space-x-3">
                <Volume2 className={`w-5 h-5 mt-0.5 ${
                  theme === 'day' ? 'text-blue-600' : 'text-blue-400'
                }`} />
                <div className="space-y-1">
                  <p className={`text-sm font-medium ${
                    theme === 'day' ? 'text-blue-800' : 'text-blue-300'
                  }`}>
                    Voice सुविधा के लिए
                  </p>
                  <p className={`text-xs ${
                    theme === 'day' ? 'text-blue-600' : 'text-blue-400'
                  }`}>
                    आप मुझसे हिंदी में बात कर सकते हैं। मैं आपकी आवाज़ सुनूंगी और जवाब भी बोलकर दूंगी।
                  </p>
                </div>
              </div>
            </div>

            <div className="text-xs text-gray-500 space-y-1">
              <p>• माइक्रोफोन की अनुमति चाहिए</p>
              <p>• यह बिल्कुल फ्री सेवा है</p>
              <p>• आपकी privacy सुरक्षित है</p>
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className={`p-6 pt-0 space-y-3`}>
          <button
            onClick={handleAccept}
            className={`w-full py-3 px-4 rounded-lg font-medium transition-all duration-300 ${
              theme === 'day' 
                ? 'bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white shadow-lg hover:shadow-pink-200' 
                : 'bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white shadow-lg hover:shadow-purple-300'
            }`}
          >
            हाँ, सुनीता से बात करें! 🎤
          </button>
          
          <button
            onClick={handleDecline}
            className={`w-full py-2 px-4 rounded-lg font-medium transition-all duration-300 ${
              theme === 'day' 
                ? 'bg-gray-100 hover:bg-gray-200 text-gray-700' 
                : 'bg-gray-700 hover:bg-gray-600 text-gray-300'
            }`}
          >
            बाद में
          </button>
        </div>
      </div>
    </div>
  );
}
