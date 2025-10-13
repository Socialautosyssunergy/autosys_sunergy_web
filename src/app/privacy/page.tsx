'use client';
import React, { useState, useEffect } from 'react';
import { useTheme } from '@/contexts/ThemeContext';
import { getThemeClasses } from '@/utils/themeUtils';
import Header from '@/components/home/Header';
import Footer from '@/components/home/Footer';
import { Shield, Eye, Lock, Database, Mail, Phone } from 'lucide-react';

export default function PrivacyPage() {
  const { theme, isDay, isNight } = useTheme();
  const themeClasses = getThemeClasses(theme);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className={`min-h-screen transition-all duration-500 ${themeClasses.background}`}>
      <Header isScrolled={isScrolled} />
      
      {/* Hero Section */}
      <section className={`pt-20 pb-16 transition-all duration-500 ${
        isDay 
          ? 'bg-gradient-to-br from-blue-50 via-white to-blue-50/30' 
          : 'bg-gradient-to-br from-slate-900 via-blue-900/50 to-slate-800'
      }`}>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <Shield className={`w-16 h-16 mx-auto mb-6 ${
              isDay ? 'text-blue-600' : 'text-blue-400'
            }`} />
            <h1 className={`text-4xl md:text-5xl font-bold mb-6 transition-colors duration-500 ${
              isDay ? 'text-slate-800' : 'text-white'
            }`}>
              Privacy Policy
            </h1>
            <p className={`text-xl transition-colors duration-500 ${
              isDay ? 'text-slate-600' : 'text-slate-300'
            }`}>
              Your privacy is important to us. Learn how we collect, use, and protect your information.
            </p>
            <p className={`text-sm mt-4 ${
              isDay ? 'text-slate-500' : 'text-slate-400'
            }`}>
              Last updated: {new Date().toLocaleDateString()}
            </p>
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className={`rounded-2xl shadow-lg p-8 ${
            isDay ? 'bg-white border border-gray-200' : 'bg-slate-800 border border-slate-700'
          }`}>
            
            {/* Introduction */}
            <div className="mb-8">
              <h2 className={`text-2xl font-bold mb-4 ${themeClasses.textPrimary}`}>
                Introduction
              </h2>
              <p className={`mb-4 leading-relaxed ${themeClasses.textSecondary}`}>
                Autosys Sunergy (&quot;we,&quot; &quot;our,&quot; or &quot;us&quot;) is committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website or use our services.
              </p>
            </div>

            {/* Information We Collect */}
            <div className="mb-8">
              <h2 className={`text-2xl font-bold mb-4 flex items-center gap-2 ${themeClasses.textPrimary}`}>
                <Database className="w-6 h-6" />
                Information We Collect
              </h2>
              
              <h3 className={`text-lg font-semibold mb-3 ${themeClasses.textPrimary}`}>
                Personal Information
              </h3>
              <ul className={`list-disc pl-6 mb-4 space-y-2 ${themeClasses.textSecondary}`}>
                <li>Name and contact information (email, phone number, address)</li>
                <li>Property details for solar installation assessments</li>
                <li>Energy consumption data and utility bills</li>
                <li>Payment and billing information</li>
                <li>Communication preferences</li>
              </ul>

              <h3 className={`text-lg font-semibold mb-3 ${themeClasses.textPrimary}`}>
                Technical Information
              </h3>
              <ul className={`list-disc pl-6 mb-4 space-y-2 ${themeClasses.textSecondary}`}>
                <li>IP address and browser information</li>
                <li>Website usage data and analytics</li>
                <li>Cookies and tracking technologies</li>
                <li>Device and operating system information</li>
              </ul>
            </div>

            {/* How We Use Information */}
            <div className="mb-8">
              <h2 className={`text-2xl font-bold mb-4 flex items-center gap-2 ${themeClasses.textPrimary}`}>
                <Eye className="w-6 h-6" />
                How We Use Your Information
              </h2>
              <ul className={`list-disc pl-6 space-y-2 ${themeClasses.textSecondary}`}>
                <li>Provide solar installation services and customer support</li>
                <li>Process payments and manage billing</li>
                <li>Send service updates and maintenance notifications</li>
                <li>Improve our website and services</li>
                <li>Comply with legal obligations</li>
                <li>Marketing communications (with your consent)</li>
              </ul>
            </div>

            {/* Information Sharing */}
            <div className="mb-8">
              <h2 className={`text-2xl font-bold mb-4 ${themeClasses.textPrimary}`}>
                Information Sharing and Disclosure
              </h2>
              <p className={`mb-4 leading-relaxed ${themeClasses.textSecondary}`}>
                We do not sell, trade, or rent your personal information to third parties. We may share information in the following circumstances:
              </p>
              <ul className={`list-disc pl-6 space-y-2 ${themeClasses.textSecondary}`}>
                <li>With service providers who assist in our operations</li>
                <li>To comply with legal requirements or court orders</li>
                <li>To protect our rights and prevent fraud</li>
                <li>In connection with a business transaction (merger, acquisition)</li>
                <li>With your explicit consent</li>
              </ul>
            </div>

            {/* Data Security */}
            <div className="mb-8">
              <h2 className={`text-2xl font-bold mb-4 flex items-center gap-2 ${themeClasses.textPrimary}`}>
                <Lock className="w-6 h-6" />
                Data Security
              </h2>
              <p className={`mb-4 leading-relaxed ${themeClasses.textSecondary}`}>
                We implement appropriate technical and organizational measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction. These measures include:
              </p>
              <ul className={`list-disc pl-6 space-y-2 ${themeClasses.textSecondary}`}>
                <li>Encryption of sensitive data in transit and at rest</li>
                <li>Regular security assessments and updates</li>
                <li>Access controls and employee training</li>
                <li>Secure data centers and infrastructure</li>
              </ul>
            </div>

            {/* Your Rights */}
            <div className="mb-8">
              <h2 className={`text-2xl font-bold mb-4 ${themeClasses.textPrimary}`}>
                Your Rights and Choices
              </h2>
              <p className={`mb-4 leading-relaxed ${themeClasses.textSecondary}`}>
                You have the right to:
              </p>
              <ul className={`list-disc pl-6 space-y-2 ${themeClasses.textSecondary}`}>
                <li>Access and review your personal information</li>
                <li>Request corrections to inaccurate data</li>
                <li>Request deletion of your personal information</li>
                <li>Opt-out of marketing communications</li>
                <li>Object to certain processing activities</li>
                <li>Data portability where applicable</li>
              </ul>
            </div>

            {/* Cookies */}
            <div className="mb-8">
              <h2 className={`text-2xl font-bold mb-4 ${themeClasses.textPrimary}`}>
                Cookies and Tracking Technologies
              </h2>
              <p className={`mb-4 leading-relaxed ${themeClasses.textSecondary}`}>
                We use cookies and similar technologies to enhance your browsing experience, analyze website traffic, and understand visitor preferences. You can control cookie settings through your browser preferences.
              </p>
            </div>

            {/* Updates */}
            <div className="mb-8">
              <h2 className={`text-2xl font-bold mb-4 ${themeClasses.textPrimary}`}>
                Policy Updates
              </h2>
              <p className={`leading-relaxed ${themeClasses.textSecondary}`}>
                We may update this Privacy Policy from time to time. We will notify you of any significant changes by posting the new policy on our website and updating the &quot;Last updated&quot; date.
              </p>
            </div>

            {/* Contact */}
            <div className={`p-6 rounded-lg ${
              isDay ? 'bg-blue-50 border-l-4 border-blue-500' : 'bg-blue-900/20 border-l-4 border-blue-400'
            }`}>
              <h2 className={`text-xl font-bold mb-4 ${themeClasses.textPrimary}`}>
                Contact Us
              </h2>
              <p className={`mb-4 ${themeClasses.textSecondary}`}>
                If you have any questions about this Privacy Policy or our data practices, please contact us:
              </p>
              <div className="space-y-2">
                <div className={`flex items-center gap-2 ${themeClasses.textSecondary}`}>
                  <Mail className="w-4 h-4" />
                  <span>privacy@autosyssunergy.com</span>
                </div>
                <div className={`flex items-center gap-2 ${themeClasses.textSecondary}`}>
                  <Phone className="w-4 h-4" />
                  <span>+91 8818880540</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
