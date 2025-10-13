'use client';
import React, { useState, useEffect } from 'react';
import { useTheme } from '@/contexts/ThemeContext';
import { getThemeClasses } from '@/utils/themeUtils';
import Header from '@/components/home/Header';
import Footer from '@/components/home/Footer';
import { FileText, Scale, AlertTriangle, Mail, Phone } from 'lucide-react';

export default function TermsPage() {
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
            <Scale className={`w-16 h-16 mx-auto mb-6 ${
              isDay ? 'text-blue-600' : 'text-blue-400'
            }`} />
            <h1 className={`text-4xl md:text-5xl font-bold mb-6 transition-colors duration-500 ${
              isDay ? 'text-slate-800' : 'text-white'
            }`}>
              Terms of Service
            </h1>
            <p className={`text-xl transition-colors duration-500 ${
              isDay ? 'text-slate-600' : 'text-slate-300'
            }`}>
              Please read these terms carefully before using our services.
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
            
            {/* Acceptance */}
            <div className="mb-8">
              <h2 className={`text-2xl font-bold mb-4 ${themeClasses.textPrimary}`}>
                1. Acceptance of Terms
              </h2>
              <p className={`mb-4 leading-relaxed ${themeClasses.textSecondary}`}>
                By accessing and using the Autosys Sunergy website and services, you accept and agree to be bound by the terms and provision of this agreement. If you do not agree to abide by the above, please do not use this service.
              </p>
            </div>

            {/* Services */}
            <div className="mb-8">
              <h2 className={`text-2xl font-bold mb-4 ${themeClasses.textPrimary}`}>
                2. Services Provided
              </h2>
              <p className={`mb-4 leading-relaxed ${themeClasses.textSecondary}`}>
                Autosys Sunergy provides solar energy solutions including:
              </p>
              <ul className={`list-disc pl-6 space-y-2 ${themeClasses.textSecondary}`}>
                <li>Solar panel installation and maintenance</li>
                <li>Energy consultation and system design</li>
                <li>Equipment supply and procurement</li>
                <li>Project management and commissioning</li>
                <li>After-sales support and warranty services</li>
              </ul>
            </div>

            {/* User Responsibilities */}
            <div className="mb-8">
              <h2 className={`text-2xl font-bold mb-4 ${themeClasses.textPrimary}`}>
                3. User Responsibilities
              </h2>
              <p className={`mb-4 leading-relaxed ${themeClasses.textSecondary}`}>
                Users of our website and services agree to:
              </p>
              <ul className={`list-disc pl-6 space-y-2 ${themeClasses.textSecondary}`}>
                <li>Provide accurate and complete information</li>
                <li>Maintain the confidentiality of account credentials</li>
                <li>Use services only for lawful purposes</li>
                <li>Respect intellectual property rights</li>
                <li>Not engage in any activity that may harm our systems</li>
              </ul>
            </div>

            {/* Payment Terms */}
            <div className="mb-8">
              <h2 className={`text-2xl font-bold mb-4 ${themeClasses.textPrimary}`}>
                4. Payment Terms
              </h2>
              <ul className={`list-disc pl-6 space-y-2 ${themeClasses.textSecondary}`}>
                <li>All prices are quoted in Indian Rupees (INR) unless otherwise specified</li>
                <li>Payment schedules are defined in individual service agreements</li>
                <li>Late payments may incur additional charges as specified in contracts</li>
                <li>Refunds are subject to the terms of individual service agreements</li>
                <li>We accept various payment methods including bank transfers and financing options</li>
              </ul>
            </div>

            {/* Warranties */}
            <div className="mb-8">
              <h2 className={`text-2xl font-bold mb-4 ${themeClasses.textPrimary}`}>
                5. Warranties and Guarantees
              </h2>
              <ul className={`list-disc pl-6 space-y-2 ${themeClasses.textSecondary}`}>
                <li>Solar panels: 25-year performance warranty</li>
                <li>Inverters: 5-10 year manufacturer warranty</li>
                <li>Installation: 2-year workmanship warranty</li>
                <li>System performance guarantees as specified in contracts</li>
                <li>Maintenance services with defined response times</li>
              </ul>
            </div>

            {/* Limitations */}
            <div className="mb-8">
              <h2 className={`text-2xl font-bold mb-4 flex items-center gap-2 ${themeClasses.textPrimary}`}>
                <AlertTriangle className="w-6 h-6" />
                6. Limitation of Liability
              </h2>
              <p className={`mb-4 leading-relaxed ${themeClasses.textSecondary}`}>
                In no event shall Autosys Sunergy be liable for any indirect, incidental, special, consequential, or punitive damages, including without limitation, loss of profits, data, use, goodwill, or other intangible losses, resulting from:
              </p>
              <ul className={`list-disc pl-6 space-y-2 ${themeClasses.textSecondary}`}>
                <li>Your use or inability to use our services</li>
                <li>Unauthorized access to or alteration of your data</li>
                <li>Statements or conduct of any third party on the service</li>
                <li>Any other matter relating to the service</li>
              </ul>
            </div>

            {/* Intellectual Property */}
            <div className="mb-8">
              <h2 className={`text-2xl font-bold mb-4 ${themeClasses.textPrimary}`}>
                7. Intellectual Property
              </h2>
              <p className={`mb-4 leading-relaxed ${themeClasses.textSecondary}`}>
                The content, organization, graphics, design, compilation, magnetic translation, digital conversion, and other matters related to the site are protected under applicable copyrights, trademarks, and other proprietary rights. All rights are reserved by Autosys Sunergy.
              </p>
            </div>

            {/* Termination */}
            <div className="mb-8">
              <h2 className={`text-2xl font-bold mb-4 ${themeClasses.textPrimary}`}>
                8. Termination
              </h2>
              <p className={`mb-4 leading-relaxed ${themeClasses.textSecondary}`}>
                We may terminate or suspend access to our service immediately, without prior notice or liability, for any reason whatsoever, including without limitation if you breach the Terms. Upon termination, your right to use the service will cease immediately.
              </p>
            </div>

            {/* Governing Law */}
            <div className="mb-8">
              <h2 className={`text-2xl font-bold mb-4 ${themeClasses.textPrimary}`}>
                9. Governing Law
              </h2>
              <p className={`leading-relaxed ${themeClasses.textSecondary}`}>
                These Terms shall be interpreted and governed by the laws of India. Any disputes arising under these terms shall be subject to the exclusive jurisdiction of the courts in [Your City], India.
              </p>
            </div>

            {/* Privacy */}
            <div className="mb-8">
              <h2 className={`text-2xl font-bold mb-4 ${themeClasses.textPrimary}`}>
                10. Privacy Policy
              </h2>
              <p className={`leading-relaxed ${themeClasses.textSecondary}`}>
                Your privacy is important to us. Please review our Privacy Policy, which also governs your use of the service, to understand our practices.
              </p>
            </div>

            {/* Changes */}
            <div className="mb-8">
              <h2 className={`text-2xl font-bold mb-4 ${themeClasses.textPrimary}`}>
                11. Changes to Terms
              </h2>
              <p className={`leading-relaxed ${themeClasses.textSecondary}`}>
                We reserve the right, at our sole discretion, to modify or replace these Terms at any time. If a revision is material, we will try to provide at least 30 days notice prior to any new terms taking effect.
              </p>
            </div>

            {/* Contact */}
            <div className={`p-6 rounded-lg ${
              isDay ? 'bg-blue-50 border-l-4 border-blue-500' : 'bg-blue-900/20 border-l-4 border-blue-400'
            }`}>
              <h2 className={`text-xl font-bold mb-4 ${themeClasses.textPrimary}`}>
                Contact Information
              </h2>
              <p className={`mb-4 ${themeClasses.textSecondary}`}>
                If you have any questions about these Terms of Service, please contact us:
              </p>
              <div className="space-y-2">
                <div className={`flex items-center gap-2 ${themeClasses.textSecondary}`}>
                  <Mail className="w-4 h-4" />
                  <span>legal@autosyssunergy.com</span>
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
