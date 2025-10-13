'use client';
import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { useTheme } from '@/contexts/ThemeContext';
import { getThemeClasses, getThemeHover, getThemeIconColor, TRANSITION_CLASSES } from '@/utils/themeUtils';
import Header from '@/components/home/Header';
import Footer from '@/components/home/Footer';
import { PremiumCard, PremiumSection, PremiumHero } from '@/components/ui/PremiumCard';
import { 
  Heart, 
  Users, 
  TreePine,
  GraduationCap,
  Lightbulb,
  HandHeart,
  Globe,
  Target,
  Award,
  Calendar,
  MapPin,
  ArrowRight,
  CheckCircle,
  Leaf,
  School,
  Hospital,
  Home,
  Sparkles,
  Star,
  Shield,
  Zap
} from 'lucide-react';

export default function CSRPage() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeTab, setActiveTab] = useState('overview');
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

  const initiatives = [
    {
      id: 'education',
      title: 'Solar Education Initiative',
      icon: <GraduationCap className="w-8 h-8" />,
      description: 'Providing solar-powered lighting to rural schools and educational centers.',
      impact: '50+ Schools Electrified',
      beneficiaries: '5000+ Students',
      color: 'from-blue-500 to-purple-600'
    },
    {
      id: 'environment',
      title: 'Green Environment Program',
      icon: <TreePine className="w-8 h-8" />,
      description: 'Tree plantation drives and environmental awareness campaigns.',
      impact: '10,000+ Trees Planted',
      beneficiaries: '25+ Villages',
      color: 'from-green-500 to-emerald-600'
    },
    {
      id: 'healthcare',
      title: 'Healthcare Solar Support',
      icon: <Hospital className="w-8 h-8" />,
      description: 'Solar power solutions for rural healthcare centers and clinics.',
      impact: '20+ Health Centers',
      beneficiaries: '15,000+ Patients',
      color: 'from-red-500 to-pink-600'
    },
    {
      id: 'community',
      title: 'Community Empowerment',
      icon: <Users className="w-8 h-8" />,
      description: 'Skill development and solar awareness programs for local communities.',
      impact: '100+ Programs',
      beneficiaries: '2000+ Individuals',
      color: 'from-orange-500 to-yellow-600'
    }
  ];

  const projects = [
    {
      title: 'Rural School Solar Project',
      location: 'Dewas District, MP',
      date: '2024',
      description: 'Installed solar panels and LED lighting systems in 15 government schools, enabling evening classes and computer education.',
      image: '/sample_solar_image.jpg',
      beneficiaries: 1500,
      impact: '75% increase in enrollment',
      category: 'education'
    },
    {
      title: 'Village Healthcare Solar Initiative',
      location: 'Ujjain District, MP',
      date: '2024',
      description: 'Provided solar-powered refrigeration for vaccine storage and lighting for emergency services in remote health centers.',
      image: '/Solar_services_sample_image.jpg',
      beneficiaries: 5000,
      impact: '24/7 healthcare services',
      category: 'healthcare'
    },
    {
      title: 'Community Solar Training Program',
      location: 'Indore Region, MP',
      date: '2023',
      description: 'Trained local youth in solar installation and maintenance, creating employment opportunities in renewable energy sector.',
      image: '/Solar_product_sample_image.jpg',
      beneficiaries: 200,
      impact: '85% job placement rate',
      category: 'community'
    },
    {
      title: 'Green Village Initiative',
      location: 'Bhopal District, MP',
      date: '2023',
      description: 'Complete village transformation with solar street lights, water pumps, and community center electrification.',
      image: '/sample_solar_image.jpg',
      beneficiaries: 3000,
      impact: 'First carbon-neutral village',
      category: 'environment'
    }
  ];

  const impactStats = [
    { icon: <Users className="w-6 h-6" />, number: '25,000+', label: 'Lives Impacted' },
    { icon: <School className="w-6 h-6" />, number: '50+', label: 'Schools Electrified' },
    { icon: <TreePine className="w-6 h-6" />, number: '10,000+', label: 'Trees Planted' },
    { icon: <Lightbulb className="w-6 h-6" />, number: '500 kW', label: 'Green Energy Donated' },
  ];

  const tabs = [
    { id: 'overview', label: 'Overview', icon: <Globe className="w-4 h-4" /> },
    { id: 'education', label: 'Education', icon: <GraduationCap className="w-4 h-4" /> },
    { id: 'environment', label: 'Environment', icon: <TreePine className="w-4 h-4" /> },
    { id: 'healthcare', label: 'Healthcare', icon: <Hospital className="w-4 h-4" /> },
    { id: 'community', label: 'Community', icon: <Users className="w-4 h-4" /> },
  ];

  return (
    <div className={`min-h-screen ${themeClasses.background} ${TRANSITION_CLASSES.normal}`}>
      <Header isScrolled={isScrolled} />
      
      {/* Unique CSR Hero Section */}
      <div className="relative min-h-[70vh] flex items-center justify-center overflow-hidden">
        {/* CSR-themed Background */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-br from-green-900 via-emerald-900 to-teal-900" />
          <div className="absolute inset-0 bg-black/20" />
          
          {/* Community-themed animated elements */}
          <div className="absolute inset-0">
            <div className="absolute top-20 left-20 w-40 h-40 bg-green-500/30 rounded-full blur-3xl animate-pulse" />
            <div className="absolute bottom-20 right-20 w-56 h-56 bg-emerald-500/30 rounded-full blur-3xl animate-pulse delay-1000" />
            <div className="absolute top-1/3 right-1/4 w-48 h-48 bg-teal-500/30 rounded-full blur-3xl animate-pulse delay-2000" />
            <div className="absolute bottom-1/4 left-1/3 w-44 h-44 bg-green-400/30 rounded-full blur-3xl animate-pulse delay-3000" />
          </div>
        </div>

        {/* Content */}
        <div className="relative z-10 text-center max-w-5xl mx-auto px-6">
          <div className="space-y-8 animate-fade-in-up">
            {/* Heart Icon */}
            <div className="flex justify-center mb-8">
              <div className="w-24 h-24 bg-gradient-to-br from-green-500 to-emerald-600 rounded-full flex items-center justify-center animate-floating">
                <Heart className="w-12 h-12 text-white" />
              </div>
            </div>

            <h1 className="text-5xl md:text-7xl font-bold text-white mb-6">
              <span className="bg-gradient-to-r from-green-200 via-emerald-200 to-teal-200 bg-clip-text text-transparent">
                Giving Back
              </span>
            </h1>
            
            <p className="text-xl md:text-2xl text-white/90 font-medium max-w-3xl mx-auto">
              Empowering communities through sustainable energy solutions and social responsibility.
            </p>
            
            <p className="text-lg text-white/80 max-w-2xl mx-auto leading-relaxed">
              Beyond business, we&apos;re committed to creating positive change in education, healthcare, and environmental conservation.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8">
              <button className="px-8 py-4 bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-full font-semibold hover:from-green-700 hover:to-emerald-700 transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl">
                <span className="flex items-center gap-2">
                  <Heart className="w-5 h-5" />
                  Our Impact
                </span>
              </button>
              <button className="px-8 py-4 bg-white/20 text-white border border-white/30 rounded-full font-semibold hover:bg-white/30 transform hover:scale-105 transition-all duration-300 backdrop-blur-lg">
                <span className="flex items-center gap-2">
                  <HandHeart className="w-5 h-5" />
                  Get Involved
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

      {/* CSR Focus Areas */}
      <PremiumSection className={`py-16 ${themeClasses.surface}`} backgroundPattern>
        <div className="container mx-auto px-6">
          <div className="text-center mb-12 animate-fade-in-up">
            <h2 className={`text-3xl md:text-4xl font-bold ${themeClasses.textPrimary} mb-4`}>
              <span className="bg-gradient-to-r from-green-600 via-emerald-600 to-teal-600 bg-clip-text text-transparent">
                Areas of Impact
              </span>
            </h2>
            <p className={`text-lg ${themeClasses.textSecondary} max-w-2xl mx-auto`}>
              We focus our efforts where they can make the most meaningful difference in communities.
            </p>
          </div>

          <div className="grid md:grid-cols-4 gap-8 stagger-animation">
            <PremiumCard className="p-8 text-center group" glow hover>
              <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full flex items-center justify-center text-white group-hover:scale-110 transition-transform duration-300">
                <GraduationCap className="w-8 h-8" />
              </div>
              <h3 className={`text-xl font-bold ${themeClasses.textPrimary} mb-2 group-hover:text-blue-600 transition-colors duration-300`}>
                Education
              </h3>
              <p className={`text-sm ${themeClasses.textSecondary}`}>
                Solar-powered schools and learning centers
              </p>
            </PremiumCard>

            <PremiumCard className="p-8 text-center group" glow hover>
              <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-red-500 to-pink-600 rounded-full flex items-center justify-center text-white group-hover:scale-110 transition-transform duration-300">
                <Hospital className="w-8 h-8" />
              </div>
              <h3 className={`text-xl font-bold ${themeClasses.textPrimary} mb-2 group-hover:text-red-600 transition-colors duration-300`}>
                Healthcare
              </h3>
              <p className={`text-sm ${themeClasses.textSecondary}`}>
                Reliable power for medical facilities
              </p>
            </PremiumCard>

            <PremiumCard className="p-8 text-center group" glow hover>
              <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-green-500 to-emerald-600 rounded-full flex items-center justify-center text-white group-hover:scale-110 transition-transform duration-300">
                <TreePine className="w-8 h-8" />
              </div>
              <h3 className={`text-xl font-bold ${themeClasses.textPrimary} mb-2 group-hover:text-green-600 transition-colors duration-300`}>
                Environment
              </h3>
              <p className={`text-sm ${themeClasses.textSecondary}`}>
                Conservation and sustainability projects
              </p>
            </PremiumCard>

            <PremiumCard className="p-8 text-center group" glow hover>
              <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-purple-500 to-violet-600 rounded-full flex items-center justify-center text-white group-hover:scale-110 transition-transform duration-300">
                <Users className="w-8 h-8" />
              </div>
              <h3 className={`text-xl font-bold ${themeClasses.textPrimary} mb-2 group-hover:text-purple-600 transition-colors duration-300`}>
                Community
              </h3>
              <p className={`text-sm ${themeClasses.textSecondary}`}>
                Local development and empowerment
              </p>
            </PremiumCard>
          </div>
        </div>
      </PremiumSection>

      {/* Navigation Tabs */}
      <section className={`py-8 ${themeClasses.background} border-b ${themeClasses.border}`}>
        <div className="container mx-auto px-6">
          <div className="flex flex-wrap justify-center gap-2">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-6 py-3 rounded-lg font-medium transition-all duration-300 flex items-center space-x-2 ${
                  activeTab === tab.id
                    ? 'bg-gradient-to-r from-yellow-400 to-orange-500 text-white'
                    : `${themeClasses.surface} ${themeClasses.textSecondary} hover:${themeClasses.textPrimary}`
                }`}
              >
                {tab.icon}
                <span>{tab.label}</span>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className={`py-16 ${themeClasses.background}`}>
        <div className="container mx-auto px-6">
          {activeTab === 'overview' && (
            <div>
              {/* Mission Statement */}
              <div className="text-center mb-16">
                <h2 className={`text-4xl font-bold ${themeClasses.textPrimary} mb-6`}>
                  Our CSR Mission
                </h2>
                <p className={`text-xl ${themeClasses.textSecondary} max-w-4xl mx-auto mb-12`}>
                  To create sustainable impact in communities by leveraging solar technology for education, 
                  healthcare, environmental conservation, and community empowerment across Madhya Pradesh and beyond.
                </p>
              </div>

              {/* Key Initiatives */}
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
                {initiatives.map((initiative, index) => (
                  <div key={index} className={`${themeClasses.surface} rounded-xl p-8 text-center ${hoverEffects.scale}`}>
                    <div className={`w-16 h-16 bg-gradient-to-r ${initiative.color} rounded-full flex items-center justify-center text-white mx-auto mb-4`}>
                      {initiative.icon}
                    </div>
                    <h3 className={`text-xl font-semibold ${themeClasses.textPrimary} mb-4`}>
                      {initiative.title}
                    </h3>
                    <p className={`${themeClasses.textSecondary} mb-6`}>
                      {initiative.description}
                    </p>
                    <div className="space-y-2">
                      <div className={`text-sm font-semibold ${getThemeIconColor(theme, 'primary')}`}>
                        {initiative.impact}
                      </div>
                      <div className={`text-xs ${themeClasses.textSecondary}`}>
                        {initiative.beneficiaries}
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Core Values */}
              <div className={`${themeClasses.surface} rounded-xl p-12`}>
                <h3 className={`text-3xl font-bold ${themeClasses.textPrimary} text-center mb-12`}>
                  Our CSR Core Values
                </h3>
                <div className="grid md:grid-cols-3 gap-8">
                  <div className="text-center">
                    <Target className={`w-12 h-12 ${getThemeIconColor(theme, 'primary')} mx-auto mb-4`} />
                    <h4 className={`text-xl font-semibold ${themeClasses.textPrimary} mb-3`}>Sustainability</h4>
                    <p className={`${themeClasses.textSecondary}`}>
                      Creating long-term environmental and social value through renewable energy solutions.
                    </p>
                  </div>
                  <div className="text-center">
                    <HandHeart className={`w-12 h-12 ${getThemeIconColor(theme, 'primary')} mx-auto mb-4`} />
                    <h4 className={`text-xl font-semibold ${themeClasses.textPrimary} mb-3`}>Community First</h4>
                    <p className={`${themeClasses.textSecondary}`}>
                      Prioritizing community needs and ensuring inclusive development for all.
                    </p>
                  </div>
                  <div className="text-center">
                    <Award className={`w-12 h-12 ${getThemeIconColor(theme, 'primary')} mx-auto mb-4`} />
                    <h4 className={`text-xl font-semibold ${themeClasses.textPrimary} mb-3`}>Excellence</h4>
                    <p className={`${themeClasses.textSecondary}`}>
                      Delivering high-quality programs with measurable impact and transparent reporting.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab !== 'overview' && (
            <div>
              {/* Category Header */}
              <div className="text-center mb-16">
                <h2 className={`text-4xl font-bold ${themeClasses.textPrimary} mb-6`}>
                  {initiatives.find(i => i.id === activeTab)?.title || 'Our Initiatives'}
                </h2>
                <p className={`text-xl ${themeClasses.textSecondary} max-w-3xl mx-auto`}>
                  {initiatives.find(i => i.id === activeTab)?.description || 'Making a difference in communities across Madhya Pradesh.'}
                </p>
              </div>

              {/* Projects Grid */}
              <div className="grid lg:grid-cols-2 gap-8">
                {projects
                  .filter(project => activeTab === 'overview' || project.category === activeTab)
                  .map((project, index) => (
                    <div key={index} className={`${themeClasses.surface} rounded-xl overflow-hidden ${hoverEffects.scale}`}>
                      <Image
                        src={project.image}
                        alt={project.title}
                        width={400}
                        height={256}
                        className="w-full h-64 object-cover"
                      />
                      <div className="p-8">
                        <div className="flex items-center justify-between mb-4">
                          <h3 className={`text-2xl font-bold ${themeClasses.textPrimary}`}>
                            {project.title}
                          </h3>
                          <span className="px-3 py-1 bg-gradient-to-r from-yellow-400 to-orange-500 text-white text-sm rounded-full">
                            {project.date}
                          </span>
                        </div>
                        
                        <div className={`flex items-center ${themeClasses.textSecondary} mb-4`}>
                          <MapPin className="w-4 h-4 mr-2" />
                          {project.location}
                        </div>
                        
                        <p className={`${themeClasses.textSecondary} mb-6`}>
                          {project.description}
                        </p>
                        
                        <div className="grid grid-cols-2 gap-4">
                          <div className={`${themeClasses.surfaceElevated} rounded-lg p-4 text-center`}>
                            <div className={`text-2xl font-bold ${getThemeIconColor(theme, 'primary')}`}>
                              {project.beneficiaries.toLocaleString()}+
                            </div>
                            <div className={`text-sm ${themeClasses.textSecondary}`}>Beneficiaries</div>
                          </div>
                          <div className={`${themeClasses.surfaceElevated} rounded-lg p-4 text-center`}>
                            <div className={`text-sm font-semibold ${themeClasses.textPrimary}`}>
                              {project.impact}
                            </div>
                            <div className={`text-xs ${themeClasses.textSecondary}`}>Key Impact</div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Get Involved Section */}
      <section className={`py-16 ${themeClasses.surfaceElevated}`}>
        <div className="container mx-auto px-6 text-center">
          <h2 className={`text-4xl font-bold ${themeClasses.textPrimary} mb-6`}>
            Get Involved
          </h2>
          <p className={`text-xl ${themeClasses.textSecondary} mb-8 max-w-3xl mx-auto`}>
            Join us in creating a sustainable future. Whether you&apos;re an individual, organization, or community, 
            there are many ways to contribute to our CSR initiatives.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className={`px-8 py-4 bg-gradient-to-r from-yellow-400 to-orange-500 text-white font-semibold rounded-xl ${hoverEffects.scale} inline-flex items-center justify-center space-x-2`}>
              <HandHeart className="w-5 h-5" />
              <span>Volunteer With Us</span>
            </button>
            <button className={`px-8 py-4 border ${themeClasses.border} ${themeClasses.textPrimary} rounded-xl transition-all duration-300 hover:scale-105 inline-flex items-center justify-center space-x-2`}>
              <ArrowRight className="w-5 h-5" />
              <span>Partner With Us</span>
            </button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
