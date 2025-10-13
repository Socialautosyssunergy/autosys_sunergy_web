'use client';
import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { useTheme } from '@/contexts/ThemeContext';
import { getThemeClasses, getThemeHover, getThemeIconColor, TRANSITION_CLASSES } from '@/utils/themeUtils';
import Header from '@/components/home/Header';
import Footer from '@/components/home/Footer';
import { PremiumCard, PremiumSection, PremiumHero } from '@/components/ui/PremiumCard';
import { 
  Award, 
  Shield, 
  CheckCircle,
  Calendar,
  Building,
  FileText,
  Download,
  ExternalLink,
  Star,
  Trophy,
  BadgeCheck,
  Globe,
  Users,
  Zap,
  Leaf,
  Target,
  Eye,
  Lock,
  Sparkles,
  Crown
} from 'lucide-react';

export default function CertificationsPage() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeCategory, setActiveCategory] = useState('all');
  const [selectedCert, setSelectedCert] = useState<string | null>(null);
  const { theme, isDay, isNight } = useTheme();
  
  const themeClasses = getThemeClasses(theme);
  const hoverEffects = getThemeHover(theme);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const certifications = [
    {
      id: '1',
      title: 'ISO 9001:2015 - Quality Management System',
      issuer: 'International Organization for Standardization',
      category: 'quality',
      date: '2024',
      validUntil: '2027',
      description: 'Demonstrates our commitment to quality management and continuous improvement in all business processes.',
      image: '/sample_solar_image.jpg',
      certificateNumber: 'ISO-9001-AS-2024-001',
      scope: 'Design, installation, and maintenance of solar energy systems',
      verificationLink: '#',
      status: 'active'
    },
    {
      id: '2',
      title: 'ISO 14001:2015 - Environmental Management',
      issuer: 'International Organization for Standardization',
      category: 'environmental',
      date: '2024',
      validUntil: '2027',
      description: 'Certification for our environmental management system and commitment to sustainable practices.',
      image: '/Solar_services_sample_image.jpg',
      certificateNumber: 'ISO-14001-AS-2024-002',
      scope: 'Environmental impact management in solar installations',
      verificationLink: '#',
      status: 'active'
    },
    {
      id: '3',
      title: 'MNRE Approved Vendor Certificate',
      issuer: 'Ministry of New and Renewable Energy, India',
      category: 'regulatory',
      date: '2023',
      validUntil: '2026',
      description: 'Official recognition as an approved vendor for solar installations under government schemes.',
      image: '/Solar_product_sample_image.jpg',
      certificateNumber: 'MNRE-AV-MP-2023-089',
      scope: 'Residential and commercial solar installations',
      verificationLink: '#',
      status: 'active'
    },
    {
      id: '4',
      title: 'IEC 61215 - Solar Panel Testing Certification',
      issuer: 'International Electrotechnical Commission',
      category: 'technical',
      date: '2024',
      validUntil: '2029',
      description: 'Certification for crystalline silicon terrestrial photovoltaic modules design qualification.',
      image: '/sample_solar_image.jpg',
      certificateNumber: 'IEC-61215-AS-2024-003',
      scope: 'Solar panel quality and performance testing',
      verificationLink: '#',
      status: 'active'
    },
    {
      id: '5',
      title: 'NABCB Accredited Testing Laboratory',
      issuer: 'National Accreditation Board for Certification Bodies',
      category: 'accreditation',
      date: '2023',
      validUntil: '2026',
      description: 'Accreditation for our in-house testing laboratory for solar equipment verification.',
      image: '/Solar_services_sample_image.jpg',
      certificateNumber: 'NABCB-TL-2023-156',
      scope: 'Solar equipment testing and quality assurance',
      verificationLink: '#',
      status: 'active'
    },
    {
      id: '6',
      title: 'Electrical Contractor License - Class A',
      issuer: 'Madhya Pradesh Electricity Regulatory Commission',
      category: 'regulatory',
      date: '2022',
      validUntil: '2027',
      description: 'Licensed electrical contractor for high-voltage solar installations and grid connections.',
      image: '/Solar_product_sample_image.jpg',
      certificateNumber: 'MPERC-ECL-A-2022-234',
      scope: 'Electrical installations up to 11kV',
      verificationLink: '#',
      status: 'active'
    },
    {
      id: '7',
      title: 'Green Building Council Membership',
      issuer: 'Indian Green Building Council',
      category: 'environmental',
      date: '2023',
      validUntil: '2025',
      description: 'Membership recognizing our contribution to sustainable and green building practices.',
      image: '/sample_solar_image.jpg',
      certificateNumber: 'IGBC-MEM-2023-789',
      scope: 'Green building and sustainable energy solutions',
      verificationLink: '#',
      status: 'active'
    },
    {
      id: '8',
      title: 'Solar Installer Professional Certification',
      issuer: 'Solar Power International',
      category: 'professional',
      date: '2024',
      validUntil: '2026',
      description: 'Professional certification for our installation team demonstrating expertise in solar systems.',
      image: '/Solar_services_sample_image.jpg',
      certificateNumber: 'SPI-PROF-2024-456',
      scope: 'Professional solar installation competency',
      verificationLink: '#',
      status: 'active'
    }
  ];

  const categories = [
    { id: 'all', label: 'All Certifications', icon: <Award className="w-4 h-4" /> },
    { id: 'quality', label: 'Quality Management', icon: <Award className="w-4 h-4" /> },
    { id: 'environmental', label: 'Environmental', icon: <Leaf className="w-4 h-4" /> },
    { id: 'regulatory', label: 'Regulatory', icon: <Shield className="w-4 h-4" /> },
    { id: 'technical', label: 'Technical', icon: <Zap className="w-4 h-4" /> },
    { id: 'accreditation', label: 'Accreditation', icon: <BadgeCheck className="w-4 h-4" /> },
    { id: 'professional', label: 'Professional', icon: <Users className="w-4 h-4" /> },
  ];

  const achievements = [
    {
      title: 'Best Solar Installer Award 2024',
      organization: 'Solar Power Association India',
      description: 'Recognized for excellence in solar installation services and customer satisfaction.',
      year: '2024',
      icon: <Trophy className="w-6 h-6" />
    },
    {
      title: 'Green Energy Pioneer Award',
      organization: 'Madhya Pradesh Renewable Energy Development Agency',
      description: 'Honored for contribution to renewable energy adoption in Madhya Pradesh.',
      year: '2023',
      icon: <Star className="w-6 h-6" />
    },
    {
      title: 'Customer Excellence Certificate',
      organization: 'Indian Solar Association',
      description: 'Certified for maintaining highest standards of customer service and satisfaction.',
      year: '2023',
      icon: <Award className="w-6 h-6" />
    },
    {
      title: 'Innovation in Solar Technology',
      organization: 'Clean Energy Council',
      description: 'Recognition for innovative approaches in solar system design and implementation.',
      year: '2022',
      icon: <Zap className="w-6 h-6" />
    }
  ];

  const complianceStats = [
    { icon: <Shield className="w-6 h-6" />, number: '100%', label: 'Compliance Rate' },
    { icon: <CheckCircle className="w-6 h-6" />, number: '15+', label: 'Active Certifications' },
    { icon: <Award className="w-6 h-6" />, number: '10+', label: 'Industry Awards' },
    { icon: <Globe className="w-6 h-6" />, number: '5+', label: 'International Standards' },
  ];

  const filteredCertifications = activeCategory === 'all' 
    ? certifications 
    : certifications.filter(cert => cert.category === activeCategory);

  return (
    <div className={`min-h-screen ${themeClasses.background} ${TRANSITION_CLASSES.normal}`}>
      <Header isScrolled={isScrolled} />
      
      {/* Unique Certifications Hero Section */}
      <div className="relative min-h-[70vh] flex items-center justify-center overflow-hidden">
        {/* Certifications-themed Background */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-br from-amber-900 via-yellow-900 to-orange-900" />
          <div className="absolute inset-0 bg-black/30" />
          
          {/* Achievement-themed animated elements */}
          <div className="absolute inset-0">
            <div className="absolute top-20 left-20 w-36 h-36 bg-amber-500/30 rounded-full blur-3xl animate-pulse" />
            <div className="absolute bottom-20 right-20 w-52 h-52 bg-yellow-500/30 rounded-full blur-3xl animate-pulse delay-1000" />
            <div className="absolute top-1/3 right-1/3 w-44 h-44 bg-orange-500/30 rounded-full blur-3xl animate-pulse delay-2000" />
            <div className="absolute bottom-1/4 left-1/4 w-40 h-40 bg-amber-400/30 rounded-full blur-3xl animate-pulse delay-3000" />
          </div>
        </div>

        {/* Content */}
        <div className="relative z-10 text-center max-w-5xl mx-auto px-6">
          <div className="space-y-8 animate-fade-in-up">
            {/* Crown Icon */}
            <div className="flex justify-center mb-8">
              <div className="w-24 h-24 bg-gradient-to-br from-amber-500 to-yellow-600 rounded-full flex items-center justify-center animate-floating">
                <Crown className="w-12 h-12 text-white" />
              </div>
            </div>

            <h1 className="text-5xl md:text-7xl font-bold text-white mb-6">
              <span className="bg-gradient-to-r from-amber-200 via-yellow-200 to-orange-200 bg-clip-text text-transparent">
                Quality Assured
              </span>
            </h1>
            
            <p className="text-xl md:text-2xl text-white/90 font-medium max-w-3xl mx-auto">
              Trust backed by certifications. Excellence verified by standards. Quality you can count on.
            </p>
            
            <p className="text-lg text-white/80 max-w-2xl mx-auto leading-relaxed">
              Our comprehensive certifications demonstrate our unwavering commitment to the highest industry standards.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8">
              <button className="px-8 py-4 bg-gradient-to-r from-amber-600 to-yellow-600 text-white rounded-full font-semibold hover:from-amber-700 hover:to-yellow-700 transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl">
                <span className="flex items-center gap-2">
                  <Award className="w-5 h-5" />
                  View Certificates
                </span>
              </button>
              <button className="px-8 py-4 bg-white/20 text-white border border-white/30 rounded-full font-semibold hover:bg-white/30 transform hover:scale-105 transition-all duration-300 backdrop-blur-lg">
                <span className="flex items-center gap-2">
                  <Shield className="w-5 h-5" />
                  Verify Credentials
                </span>
              </button>
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center">
            <div className="w-1 h-3 bg-white/60 rounded-full mt-2 animate-pulse" />
          </div>
        </div>
      </div>

      {/* Certification Categories */}
      <PremiumSection className={`py-16 ${themeClasses.surface}`} backgroundPattern>
        <div className="container mx-auto px-6">
          <div className="text-center mb-12 animate-fade-in-up">
            <h2 className={`text-3xl md:text-4xl font-bold ${themeClasses.textPrimary} mb-4`}>
              <span className="bg-gradient-to-r from-amber-600 via-yellow-600 to-orange-600 bg-clip-text text-transparent">
                Certification Standards
              </span>
            </h2>
            <p className={`text-lg ${themeClasses.textSecondary} max-w-2xl mx-auto`}>
              We maintain certifications across multiple domains to ensure comprehensive quality assurance.
            </p>
          </div>

          <div className="grid md:grid-cols-4 gap-8 stagger-animation">
            <PremiumCard className="p-8 text-center group" glow hover>
              <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full flex items-center justify-center text-white group-hover:scale-110 transition-transform duration-300">
                <Shield className="w-8 h-8" />
              </div>
              <h3 className={`text-xl font-bold ${themeClasses.textPrimary} mb-2 group-hover:text-blue-600 transition-colors duration-300`}>
                Quality
              </h3>
              <p className={`text-sm ${themeClasses.textSecondary}`}>
                ISO standards and quality management
              </p>
            </PremiumCard>

            <PremiumCard className="p-8 text-center group" glow hover>
              <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-green-500 to-emerald-600 rounded-full flex items-center justify-center text-white group-hover:scale-110 transition-transform duration-300">
                <Leaf className="w-8 h-8" />
              </div>
              <h3 className={`text-xl font-bold ${themeClasses.textPrimary} mb-2 group-hover:text-green-600 transition-colors duration-300`}>
                Environmental
              </h3>
              <p className={`text-sm ${themeClasses.textSecondary}`}>
                Environmental management systems
              </p>
            </PremiumCard>

            <PremiumCard className="p-8 text-center group" glow hover>
              <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-red-500 to-pink-600 rounded-full flex items-center justify-center text-white group-hover:scale-110 transition-transform duration-300">
                <Target className="w-8 h-8" />
              </div>
              <h3 className={`text-xl font-bold ${themeClasses.textPrimary} mb-2 group-hover:text-red-600 transition-colors duration-300`}>
                Safety
              </h3>
              <p className={`text-sm ${themeClasses.textSecondary}`}>
                Occupational health and safety
              </p>
            </PremiumCard>

            <PremiumCard className="p-8 text-center group" glow hover>
              <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-purple-500 to-violet-600 rounded-full flex items-center justify-center text-white group-hover:scale-110 transition-transform duration-300">
                <Globe className="w-8 h-8" />
              </div>
              <h3 className={`text-xl font-bold ${themeClasses.textPrimary} mb-2 group-hover:text-purple-600 transition-colors duration-300`}>
                Regulatory
              </h3>
              <p className={`text-sm ${themeClasses.textSecondary}`}>
                Industry and government compliance
              </p>
            </PremiumCard>
          </div>
        </div>
      </PremiumSection>

      {/* Category Filter */}
      <section className={`py-8 ${themeClasses.background} border-b ${themeClasses.border}`}>
        <div className="container mx-auto px-6">
          <div className="flex flex-wrap justify-center gap-2">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setActiveCategory(category.id)}
                className={`px-4 py-2 rounded-lg font-medium transition-all duration-300 flex items-center space-x-2 ${
                  activeCategory === category.id
                    ? 'bg-gradient-to-r from-yellow-400 to-orange-500 text-white'
                    : `${themeClasses.surface} ${themeClasses.textSecondary} hover:${themeClasses.textPrimary}`
                }`}
              >
                {category.icon}
                <span>{category.label}</span>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Certifications Grid */}
      <section className={`py-16 ${themeClasses.background}`}>
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredCertifications.map((cert) => (
              <div key={cert.id} className={`${themeClasses.surface} rounded-xl overflow-hidden ${hoverEffects.scale} group`}>
                <div className="relative">
                  <Image
                    src={cert.image}
                    alt={cert.title}
                    width={400}
                    height={192}
                    className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                  <div className="absolute top-4 left-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                      cert.status === 'active' 
                        ? 'bg-green-500 text-white' 
                        : 'bg-gray-500 text-white'
                    }`}>
                      {cert.status === 'active' ? 'Active' : 'Expired'}
                    </span>
                  </div>
                  <div className="absolute top-4 right-4">
                    <div className={`p-2 rounded-full ${themeClasses.surface} bg-opacity-90`}>
                      <Award className={`w-5 h-5 ${getThemeIconColor(theme, 'primary')}`} />
                    </div>
                  </div>
                </div>
                
                <div className="p-6">
                  <h3 className={`text-xl font-bold ${themeClasses.textPrimary} mb-2 line-clamp-2`}>
                    {cert.title}
                  </h3>
                  
                  <p className={`text-sm ${themeClasses.textSecondary} mb-3`}>
                    Issued by: {cert.issuer}
                  </p>
                  
                  <p className={`${themeClasses.textSecondary} text-sm mb-4 line-clamp-3`}>
                    {cert.description}
                  </p>
                  
                  <div className="space-y-2 mb-4">
                    <div className="flex justify-between text-sm">
                      <span className={`${themeClasses.textSecondary}`}>Issued:</span>
                      <span className={`${themeClasses.textPrimary} font-medium`}>{cert.date}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className={`${themeClasses.textSecondary}`}>Valid Until:</span>
                      <span className={`${themeClasses.textPrimary} font-medium`}>{cert.validUntil}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className={`${themeClasses.textSecondary}`}>Certificate #:</span>
                      <span className={`${getThemeIconColor(theme, 'primary')} font-mono text-xs`}>
                        {cert.certificateNumber}
                      </span>
                    </div>
                  </div>
                  
                  <div className="flex gap-2">
                    <button 
                      onClick={() => setSelectedCert(selectedCert === cert.id ? null : cert.id)}
                      className={`flex-1 px-4 py-2 border ${themeClasses.border} ${themeClasses.textPrimary} rounded-lg transition-all duration-300 hover:scale-105 text-center text-sm`}
                    >
                      {selectedCert === cert.id ? 'Show Less' : 'View Details'}
                    </button>
                    <button className={`px-4 py-2 bg-gradient-to-r from-yellow-400 to-orange-500 text-white rounded-lg ${hoverEffects.scale} text-sm`}>
                      <Download className="w-4 h-4" />
                    </button>
                    <button className={`px-4 py-2 border ${themeClasses.border} ${themeClasses.textPrimary} rounded-lg transition-all duration-300 hover:scale-105 text-sm`}>
                      <ExternalLink className="w-4 h-4" />
                    </button>
                  </div>

                  {/* Expanded Details */}
                  {selectedCert === cert.id && (
                    <div className={`mt-4 pt-4 border-t ${themeClasses.border} space-y-3`}>
                      <div>
                        <h4 className={`font-semibold ${themeClasses.textPrimary} mb-1`}>Scope:</h4>
                        <p className={`${themeClasses.textSecondary} text-sm`}>{cert.scope}</p>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className={`text-sm ${themeClasses.textSecondary}`}>Verification Available</span>
                        <div className="flex items-center space-x-1">
                          <CheckCircle className="w-4 h-4 text-green-500" />
                          <span className={`text-sm ${getThemeIconColor(theme, 'primary')}`}>Verified</span>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Awards & Recognition */}
      <section className={`py-16 ${themeClasses.surfaceElevated}`}>
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className={`text-4xl font-bold ${themeClasses.textPrimary} mb-6`}>
              Awards & Recognition
            </h2>
            <p className={`text-xl ${themeClasses.textSecondary} max-w-3xl mx-auto`}>
              Our commitment to excellence has been recognized by leading industry organizations and regulatory bodies.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {achievements.map((achievement, index) => (
              <div key={index} className={`${themeClasses.surface} rounded-xl p-8 ${hoverEffects.scale}`}>
                <div className="flex items-start space-x-4">
                  <div className={`p-3 rounded-lg bg-gradient-to-r from-yellow-400 to-orange-500 text-white`}>
                    {achievement.icon}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className={`text-xl font-bold ${themeClasses.textPrimary}`}>
                        {achievement.title}
                      </h3>
                      <span className={`text-sm ${getThemeIconColor(theme, 'primary')} font-semibold`}>
                        {achievement.year}
                      </span>
                    </div>
                    <p className={`text-sm ${themeClasses.textSecondary} mb-3`}>
                      {achievement.organization}
                    </p>
                    <p className={`${themeClasses.textSecondary}`}>
                      {achievement.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Verification Section */}
      <section className={`py-16 ${themeClasses.background}`}>
        <div className="container mx-auto px-6 text-center">
          <h2 className={`text-4xl font-bold ${themeClasses.textPrimary} mb-6`}>
            Verify Our Certifications
          </h2>
          <p className={`text-xl ${themeClasses.textSecondary} mb-8 max-w-3xl mx-auto`}>
            All our certifications are genuine and can be independently verified. 
            We believe in complete transparency and accountability.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className={`px-8 py-4 bg-gradient-to-r from-yellow-400 to-orange-500 text-white font-semibold rounded-xl ${hoverEffects.scale} inline-flex items-center justify-center space-x-2`}>
              <Eye className="w-5 h-5" />
              <span>Verification Portal</span>
            </button>
            <button className={`px-8 py-4 border ${themeClasses.border} ${themeClasses.textPrimary} rounded-xl transition-all duration-300 hover:scale-105 inline-flex items-center justify-center space-x-2`}>
              <Download className="w-5 h-5" />
              <span>Download Certificates</span>
            </button>
          </div>

          {/* Trust Indicators */}
          <div className={`mt-12 ${themeClasses.surface} rounded-xl p-8`}>
            <h3 className={`text-2xl font-bold ${themeClasses.textPrimary} mb-6`}>
              Why Our Certifications Matter
            </h3>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="text-center">
                <Shield className={`w-12 h-12 ${getThemeIconColor(theme, 'primary')} mx-auto mb-4`} />
                <h4 className={`text-lg font-semibold ${themeClasses.textPrimary} mb-3`}>Quality Assurance</h4>
                <p className={`${themeClasses.textSecondary} text-sm`}>
                  Ensures all our products and services meet international quality standards.
                </p>
              </div>
              <div className="text-center">
                <Lock className={`w-12 h-12 ${getThemeIconColor(theme, 'primary')} mx-auto mb-4`} />
                <h4 className={`text-lg font-semibold ${themeClasses.textPrimary} mb-3`}>Regulatory Compliance</h4>
                <p className={`${themeClasses.textSecondary} text-sm`}>
                  Compliance with all local and international regulations and standards.
                </p>
              </div>
              <div className="text-center">
                <Target className={`w-12 h-12 ${getThemeIconColor(theme, 'primary')} mx-auto mb-4`} />
                <h4 className={`text-lg font-semibold ${themeClasses.textPrimary} mb-3`}>Continuous Improvement</h4>
                <p className={`${themeClasses.textSecondary} text-sm`}>
                  Regular audits and updates ensure we stay ahead of industry standards.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
