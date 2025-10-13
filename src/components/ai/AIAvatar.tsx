'use client';
import React, { useState, useRef } from 'react';
import { Send, X, MessageCircle } from 'lucide-react';
import { useTheme } from '@/contexts/ThemeContext';
import { getThemeClasses, getThemeHover } from '@/utils/themeUtils';
import { SolarAIService } from './SolarAIService';
import styles from './AIAvatar.module.css';

interface AIAvatarProps {
  className?: string;
}

interface ChatMessage {
  id: string;
  text: string;
  isUser: boolean;
  timestamp: Date;
}

export default function AIAvatar({ className = '' }: AIAvatarProps) {
  const { theme } = useTheme();
  const themeClasses = getThemeClasses(theme);
  const hoverEffects = getThemeHover(theme);
  
  const [isOpen, setIsOpen] = useState(false);
  const [isActive, setIsActive] = useState(true);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [inputMessage, setInputMessage] = useState('');
  const [videoError, setVideoError] = useState(false);
  
  const aiService = useRef(new SolarAIService());
  const videoRef = useRef<HTMLVideoElement>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // API key placeholder for demo purposes
  const API_KEY = process.env.NEXT_PUBLIC_CHAT_API_KEY || 'demo-key-placeholder';

  // Scroll to bottom of messages
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  // Handle sending a text message
  const handleSendMessage = async () => {
    if (!inputMessage.trim()) return;
    
    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      text: inputMessage,
      isUser: true,
      timestamp: new Date()
    };
    
    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');
    
    try {
      // Use demo functionality for now (API_KEY is placeholder)
      let response: string;
      
      if (API_KEY === 'demo-key-placeholder') {
        // Demo mode - use local AI service
        response = aiService.current.generateResponse(inputMessage);
      } else {
        // Future: Real API integration would go here
        response = "API integration coming soon. Using demo responses for now.";
      }
      
      const aiMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        text: response,
        isUser: false,
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, aiMessage]);
      scrollToBottom();
    } catch (error) {
      console.error('Error generating response:', error);
      
      // Fallback response
      const fallbackMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        text: "Sorry, I'm having trouble responding right now. Please try again or contact our support team at +91 8818880540.",
        isUser: false,
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, fallbackMessage]);
    }
  };

  // Handle enter key press
  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleSendMessage();
    }
  };

  // Handle video error
  const handleVideoError = () => {
    setVideoError(true);
  };

  // Handle video load success
  const handleVideoLoad = () => {
    setVideoError(false);
  };

  // Initialize with welcome message
  React.useEffect(() => {
    if (isOpen && messages.length === 0) {
      const welcomeMessage: ChatMessage = {
        id: 'welcome',
        text: "Hello! I'm Autosys Assistant. I can help you with frequently asked questions about solar energy, pricing, installation, and subsidies. How can I assist you today?",
        isUser: false,
        timestamp: new Date()
      };
      setMessages([welcomeMessage]);
    }
  }, [isOpen, messages.length]);

  // Scroll to bottom when messages change
  React.useEffect(() => {
    scrollToBottom();
  }, [messages]);

  if (!isActive) return null;

  return (
    <>
      {/* Floating Avatar Button */}
      <div className={`fixed bottom-6 right-6 z-50 ${className}`}>
        <div className="relative">
          {/* Avatar Button with Video */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Chat with Autosys Assistant"
            title="Click to start chatting with our AI assistant"
            className={`${styles['ai-avatar-container']} relative w-20 h-20 rounded-full shadow-xl transition-all duration-300 overflow-hidden border-4 focus:outline-none focus:ring-4 focus:ring-blue-300/50 ${
              hoverEffects.scale
            } ${
              theme === 'day' 
                ? 'border-blue-300 shadow-blue-200 hover:border-blue-400' 
                : 'border-purple-400 shadow-purple-300 hover:border-purple-300'
            }`}
            style={{ 
              background: 'transparent !important',
              backgroundColor: 'transparent !important',
              backdropFilter: 'blur(10px)',
              WebkitBackdropFilter: 'blur(10px)',
              boxShadow: videoError ? 'none' : undefined
            }}
          >
            {/* Video Avatar - Clean and Premium */}
            <div className="absolute inset-0 rounded-full overflow-hidden">
              <video
                ref={videoRef}
                className={`w-full h-full object-cover ${videoError ? 'opacity-0' : 'opacity-100'}`}
                autoPlay
                loop
                muted
                playsInline
                preload="auto"
                onError={handleVideoError}
                onLoadedData={handleVideoLoad}
                style={{
                  objectFit: 'cover',
                  objectPosition: 'center',
                  background: 'transparent'
                }}
              >
                <source src="/Autosys_sunergy_AI_Support_Avatar.mp4" type="video/mp4" />
                Your browser does not support the video tag.
              </video>
              
              {/* Clean loading state - fallback gradient */}
              {videoError && (
                <div className="absolute inset-0 rounded-full bg-gradient-to-br from-blue-400 via-purple-500 to-blue-500 opacity-80 flex items-center justify-center">
                  <MessageCircle className="w-8 h-8 text-white" />
                </div>
              )}
            </div>
          </button>
          
          {/* Status indicator */}
          <div className={`absolute -top-1 -left-1 w-5 h-5 rounded-full border-2 border-white bg-green-400 ${isActive ? 'animate-pulse' : ''}`}>
            <div className="w-full h-full flex items-center justify-center">
              <div className="w-2 h-2 bg-white rounded-full"></div>
            </div>
          </div>
          
          {/* Floating name tag */}
          {!isOpen && (
            <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2">
              <div className={`px-3 py-1 rounded-lg text-xs font-medium transition-all duration-300 ${
                theme === 'day'
                  ? 'bg-white/90 text-gray-800 shadow-lg border border-gray-200'
                  : 'bg-gray-800/90 text-white shadow-lg border border-gray-600'
              }`}>
                Autosys Assistant
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Chat Interface */}
      {isOpen && (
        <div className={`fixed bottom-24 right-6 w-96 h-96 rounded-2xl shadow-2xl transition-all duration-300 z-40 ${themeClasses.card}`}>
          {/* Header */}
          <div className={`flex items-center justify-between p-4 border-b ${themeClasses.border}`}>
            <div className="flex items-center space-x-3">
              <div className={`w-12 h-12 rounded-full overflow-hidden border-2 relative ${
                theme === 'day' 
                  ? 'border-blue-300' 
                  : 'border-purple-400'
              }`}>
                <video
                  className={`w-full h-full object-cover ${videoError ? 'hidden' : 'block'}`}
                  autoPlay
                  loop
                  muted
                  playsInline
                  onError={handleVideoError}
                >
                  <source src="/Autosys_sunergy_AI_Support_Avatar.mp4" type="video/mp4" />
                </video>
                {videoError && (
                  <div className="w-full h-full bg-gradient-to-br from-blue-400 to-purple-500 flex items-center justify-center">
                    <MessageCircle className="w-6 h-6 text-white" />
                  </div>
                )}
              </div>
              <div>
                <h3 className={`font-semibold ${themeClasses.textPrimary}`}>Autosys Assistant</h3>
                <p className={`text-xs ${themeClasses.textSecondary}`}>AI Solar FAQ Helper</p>
              </div>
            </div>
            
            <button
              onClick={() => setIsOpen(false)}
              className={`p-2 rounded-lg transition-colors hover:bg-gray-100 dark:hover:bg-gray-700`}
            >
              <X className={`w-4 h-4 ${themeClasses.textSecondary}`} />
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 p-4 overflow-y-auto max-h-64">
            <div className="space-y-3">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${message.isUser ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-xs px-3 py-2 rounded-lg text-sm ${
                      message.isUser
                        ? theme === 'day' 
                          ? 'bg-blue-500 text-white' 
                          : 'bg-cyan-500 text-white'
                        : theme === 'day'
                          ? 'bg-gray-100 text-gray-800 border border-gray-200'
                          : 'bg-gray-700 text-gray-200 border border-gray-600'
                    }`}
                  >
                    {message.text.split('\n').map((line, index) => (
                      <div key={index}>{line}</div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
            <div ref={messagesEndRef} />
          </div>

          {/* Input Area */}
          <div className={`p-4 border-t ${themeClasses.border}`}>
            <div className="flex items-center space-x-2">
              <input
                type="text"
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Ask about solar energy, pricing, subsidies..."
                className={`flex-1 px-3 py-2 rounded-lg border text-sm focus:outline-none focus:ring-2 ${
                  theme === 'day'
                    ? 'border-gray-300 focus:ring-blue-500 bg-white text-gray-900'
                    : 'border-gray-600 focus:ring-purple-500 bg-gray-700 text-white'
                }`}
              />
              <button
                onClick={handleSendMessage}
                disabled={!inputMessage.trim()}
                className={`p-2 rounded-lg font-medium transition-all ${
                  inputMessage.trim()
                    ? theme === 'day'
                      ? 'bg-blue-500 hover:bg-blue-600 text-white'
                      : 'bg-purple-500 hover:bg-purple-600 text-white'
                    : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                }`}
              >
                <Send className="w-4 h-4" />
              </button>
            </div>
            
            {/* Demo indicator */}
            <div className={`text-xs mt-2 text-center ${themeClasses.textSecondary}`}>
              {API_KEY === 'demo-key-placeholder' ? 'Demo Mode • FAQ Responses' : 'Connected'}
            </div>
          </div>
        </div>
      )}
    </>
  );
}

// No TypeScript interfaces needed for this simplified version
