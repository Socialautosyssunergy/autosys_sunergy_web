'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { useTheme } from '@/contexts/ThemeContext';
import Header from '@/components/home/Header';
import Footer from '@/components/home/Footer';

export default function UniquePage() {
  const { isDay } = useTheme();
  const [isScrolled, setIsScrolled] = useState(false);
  const [selectedFeature, setSelectedFeature] = useState(0);
  const [activeTab, setActiveTab] = useState('overview');

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 100);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const uniqueFeatures = [
    {
      title: "Revolutionary 3-Purlin Mounting System",
      subtitle: "Industry-First Advanced Mounting Technology",
      description: "Our proprietary 3-purlin mounting system represents a breakthrough in solar installation engineering, delivering unmatched structural integrity and installation efficiency.",
      icon: "🏗️",
      image: "/solar_product_sample_image.jpg",
      category: "Engineering Innovation",
      keyBenefits: [
        "Superior wind resistance up to 200 km/h",
        "25% faster installation time",
        "Reduced material costs by 15%",
        "Enhanced structural longevity (30+ years)",
        "Compatible with all roof types"
      ],
      technicalSpecs: {
        "Wind Load Capacity": "200 km/h (Category 5 Cyclone)",
        "Material": "6063-T6 Aluminum Alloy",
        "Corrosion Resistance": "Marine Grade (C5-M)",
        "Installation Time": "40% faster than traditional systems",
        "Warranty": "25 years structural warranty"
      },
      certifications: [
        "IS 2062:2011 certified",
        "BIS approval for Indian conditions",
        "IEC 61215 compliant",
        "CE marking for European standards"
      ],
      caseStudy: {
        title: "Trident Group Industrial Installation",
        details: "Successfully deployed 5.4 MW installation using our 3-purlin system, withstanding Cyclone Tauktae with zero structural damage.",
        results: ["Zero maintenance in 3 years", "15% cost savings", "Completed 30 days ahead of schedule"]
      }
    },
    {
      title: "Complete Insurance Protection",
      subtitle: "Comprehensive Coverage Worth ₹50 Lakhs",
      description: "Industry's most comprehensive insurance package covering natural disasters, equipment failure, and performance degradation at zero additional cost for the first year.",
      icon: "🛡️",
      image: "/sample_solar_image.jpg",
      category: "Risk Management",
      keyBenefits: [
        "₹50 lakhs coverage value",
        "Natural disaster protection",
        "Equipment failure coverage",
        "Performance degradation insurance",
        "24/7 claim support"
      ],
      technicalSpecs: {
        "Coverage Amount": "₹50,00,000",
        "Coverage Period": "12 months (extendable)",
        "Claim Processing": "48-72 hours",
        "Natural Disasters": "Cyclone, Flood, Earthquake, Hail",
        "Equipment Coverage": "100% replacement cost"
      },
      certifications: [
        "Underwritten by HDFC ERGO",
        "IRDA approved policies",
        "ISO 9001:2015 claim process",
        "24/7 emergency support"
      ],
      caseStudy: {
        title: "Monsoon Damage Recovery - Medicap University",
        details: "Complete system restoration after severe hail damage within 72 hours, zero cost to customer.",
        results: ["Full system restoration in 3 days", "Zero downtime costs", "100% claim settlement"]
      }
    },
    {
      title: "Flexible Finance Solutions",
      subtitle: "0% Down Payment with EMIs from ₹2,999",
      description: "Revolutionary financing options with partnerships across 15+ leading banks and NBFCs, making solar energy accessible to every household and business.",
      icon: "💳",
      image: "/microtek_solar_inverter_logo.png",
      category: "Financial Innovation",
      keyBenefits: [
        "Zero down payment option",
        "EMIs starting at ₹2,999",
        "Loan approval in 24 hours",
        "Tenure up to 10 years",
        "Partnership with 15+ financial institutions"
      ],
      technicalSpecs: {
        "Interest Rates": "Starting from 9.99% p.a.",
        "Loan Amount": "Up to ₹50 lakhs",
        "Processing Time": "24-48 hours",
        "Documentation": "Minimal paperwork",
        "Tenure Options": "3-10 years"
      },
      certifications: [
        "RBI approved lending partners",
        "CIBIL score flexibility",
        "Transparent pricing policy",
        "No hidden charges guarantee"
      ],
      caseStudy: {
        title: "Residential Solar Financing - Vijay Nagar",
        details: "Enabled 200+ families to adopt solar with customized financing solutions, average payback period of 4.5 years.",
        results: ["200% increase in residential adoption", "Average savings: ₹15,000/year", "Customer satisfaction: 98%"]
      }
    },
    {
      title: "Anti-Wind Clamping Technology",
      subtitle: "Weather-Shield System for Extreme Conditions",
      description: "Proprietary anti-wind clamping system with aerodynamic design, tested for Category 5 cyclones and engineered for 30+ year durability.",
      icon: "🌪️",
      image: "/novasys_logo.png",
      category: "Weather Engineering",
      keyBenefits: [
        "Category 5 cyclone tested",
        "316-grade stainless steel construction",
        "Aerodynamic design principles",
        "30+ year durability guarantee",
        "Zero maintenance requirement"
      ],
      technicalSpecs: {
        "Material Grade": "SS 316L (Marine Grade)",
        "Wind Resistance": "Up to 250 km/h",
        "Corrosion Resistance": "1000+ hours salt spray test",
        "Design Life": "30+ years",
        "Testing Standard": "AS/NZS 1170.2"
      },
      certifications: [
        "Cyclone tested by IIT Bombay",
        "ASTM B117 salt spray certified",
        "IS 1570 stainless steel grade",
        "Weather resistance certification"
      ],
      caseStudy: {
        title: "Coastal Installation - Paradip Port",
        details: "Successfully withstood Cyclone Fani (Category 4) with zero damage, while conventional systems failed.",
        results: ["Zero structural damage", "100% operational post-cyclone", "Insurance claim: ₹0"]
      }
    },
    {
      title: "AI-Powered Thermal Scanning",
      subtitle: "Predictive Maintenance with ML Algorithms",
      description: "Advanced infrared diagnostic system powered by machine learning algorithms for real-time performance monitoring and predictive maintenance.",
      icon: "🔬",
      image: "/solar_services_sample_image.jpg",
      category: "Smart Technology",
      keyBenefits: [
        "Real-time performance monitoring",
        "99.8% fault detection accuracy",
        "Predictive maintenance alerts",
        "ML-powered analytics",
        "Automated reporting system"
      ],
      technicalSpecs: {
        "Detection Accuracy": "99.8%",
        "Thermal Resolution": "0.1°C",
        "Response Time": "Real-time monitoring",
        "AI Algorithm": "Deep learning neural networks",
        "Data Analytics": "Cloud-based processing"
      },
      certifications: [
        "IEC 62446-1 thermal imaging",
        "ISO 9712 thermography certification",
        "NETA certified procedures",
        "IEEE standards compliant"
      ],
      caseStudy: {
        title: "Preventive Maintenance Success - Pushp Masale",
        details: "Detected potential inverter failure 6 months before critical failure, preventing ₹2.5 lakh loss.",
        results: ["6 months early detection", "₹2.5 lakh loss prevention", "Zero downtime achieved"]
      }
    },
    {
      title: "State Excellence Award Winner",
      subtitle: "Platinum Recognition for Industry Leadership",
      description: "Dual Platinum awards for 'Best Solar EPC Company' and 'Maximum Rooftop Capacity Achievement' by Madhya Pradesh Government, setting industry benchmarks.",
      icon: "🥇",
      image: "/Autosys_sunergy_logo.jpg",
      category: "Industry Recognition",
      keyBenefits: [
        "Dual Platinum awards winner",
        "State government recognition",
        "Industry benchmark setter",
        "Quality assurance guarantee",
        "Proven track record"
      ],
      technicalSpecs: {
        "Award Category": "Best Solar EPC Company",
        "Recognition Level": "Platinum",
        "Capacity Achievement": "1000+ kW rooftop installations",
        "Quality Score": "98.5% customer satisfaction",
        "Industry Ranking": "#1 in Madhya Pradesh"
      },
      certifications: [
        "MP Government Platinum Award 2024",
        "SolarQuarter EPC Company of Year",
        "ISO 9001:2015 quality certification",
        "Customer excellence award"
      ],
      caseStudy: {
        title: "Award-Winning Project Portfolio",
        details: "Recognized for delivering 1000+ kW rooftop capacity with 98.5% customer satisfaction across 500+ installations.",
        results: ["500+ successful installations", "98.5% customer satisfaction", "Zero safety incidents"]
      }
    }
  ];

  const feature = uniqueFeatures[selectedFeature];

  return (
    <div className={`min-h-screen transition-all duration-500 ${
      isDay ? 'bg-gradient-to-br from-blue-50 to-blue-100' : 'bg-slate-900'
    }`}>
      <Header isScrolled={isScrolled} />

      {/* Hero Section */}
      <section className={`pt-32 pb-20 relative overflow-hidden transition-all duration-500 ${
        isDay ? 'bg-gradient-to-br from-slate-50 to-blue-50' : 'bg-gradient-to-br from-slate-900 to-blue-900'
      }`}>
        {/* Background Effects */}
        <div className="absolute inset-0">
          <div className={`absolute inset-0 ${
            isDay 
              ? 'bg-[radial-gradient(circle_at_30%_20%,_#3b82f615,transparent_70%),radial-gradient(circle_at_70%_80%,_#06b6d420,transparent_70%)]'
              : 'bg-[radial-gradient(circle_at_30%_20%,_#3b82f625,transparent_70%),radial-gradient(circle_at_70%_80%,_#06b6d430,transparent_70%)]'
          }`} />
          <div className="absolute top-20 left-20 w-96 h-96 border border-blue-300/10 rounded-full animate-spin" style={{ animationDuration: '60s' }} />
          <div className="absolute bottom-20 right-20 w-80 h-80 border border-purple-300/10 rounded-full animate-spin" style={{ animationDuration: '45s', animationDirection: 'reverse' }} />
        </div>

        <div className="relative w-full max-w-7xl mx-auto px-8 text-center">
          <div className="inline-block relative mb-8">
            <div className={`absolute inset-0 blur-3xl ${
              isDay 
                ? 'bg-gradient-to-r from-blue-500/20 via-purple-500/20 to-amber-500/20' 
                : 'bg-gradient-to-r from-blue-500/30 via-purple-500/30 to-amber-500/30'
            } rounded-full scale-150`} />
            
            <h1 className={`relative text-5xl md:text-6xl lg:text-7xl font-black mb-6 transition-colors duration-500 ${
              isDay ? 'text-slate-800' : 'text-white'
            } tracking-tight leading-none`}>
              What Makes Us 
              <span className={`block bg-gradient-to-r ${
                isDay 
                  ? 'from-blue-600 via-purple-600 to-amber-600' 
                  : 'from-blue-400 via-purple-400 to-amber-400'
              } bg-clip-text text-transparent`}>
                EXTRAORDINARY
              </span>
            </h1>
          </div>
          
          <p className={`text-xl md:text-2xl max-w-4xl mx-auto mb-12 transition-colors duration-500 ${
            isDay ? 'text-slate-600' : 'text-slate-300'
          } leading-relaxed font-light`}>
            Dive deep into the revolutionary innovations and unmatched expertise that sets AutoSys Sunergy apart as India&apos;s leading solar energy pioneer
          </p>

          {/* Feature Navigation */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 max-w-6xl mx-auto">
            {uniqueFeatures.map((feat, index) => (
              <button
                key={index}
                onClick={() => setSelectedFeature(index)}
                className={`group relative p-4 rounded-2xl transition-all duration-500 ${
                  selectedFeature === index
                    ? isDay 
                      ? 'bg-gradient-to-br from-blue-500 to-purple-500 text-white shadow-2xl shadow-blue-500/25' 
                      : 'bg-gradient-to-br from-blue-400 to-purple-400 text-white shadow-2xl shadow-blue-400/25'
                    : isDay
                      ? 'bg-white/80 border-2 border-blue-200/50 text-slate-700 hover:shadow-lg hover:shadow-blue-500/10'
                      : 'bg-slate-800/80 border-2 border-blue-500/30 text-slate-300 hover:shadow-xl hover:shadow-blue-500/20'
                } backdrop-blur-xl transform hover:scale-105 hover:-translate-y-1`}
              >
                <div className="text-3xl mb-2">{feat.icon}</div>
                <div className="text-sm font-bold">{feat.title.split(' ')[0]}</div>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Main Content Section */}
      <section className={`py-20 relative transition-all duration-500 ${
        isDay ? 'bg-gradient-to-br from-blue-50 to-blue-100' : 'bg-slate-900'
      }`}>
        <div className="w-full max-w-7xl mx-auto px-8">
          {/* Feature Header */}
          <div className={`mb-16 p-12 rounded-3xl transition-all duration-500 ${
            isDay 
              ? 'bg-gradient-to-br from-blue-50/80 to-purple-50/80 border-2 border-blue-200/30' 
              : 'bg-gradient-to-br from-blue-900/30 to-purple-900/30 border-2 border-blue-500/20'
          } backdrop-blur-xl shadow-2xl`}>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <div className={`inline-block px-4 py-2 rounded-2xl mb-4 ${
                  isDay ? 'bg-blue-100 text-blue-700' : 'bg-blue-900/50 text-blue-300'
                } font-bold text-sm`}>
                  {feature.category}
                </div>
                <h2 className={`text-4xl md:text-5xl font-black mb-4 transition-colors duration-500 ${
                  isDay ? 'text-slate-800' : 'text-white'
                } leading-tight`}>
                  {feature.title}
                </h2>
                <h3 className={`text-xl md:text-2xl mb-6 transition-colors duration-500 ${
                  isDay ? 'text-blue-600' : 'text-blue-400'
                } font-semibold`}>
                  {feature.subtitle}
                </h3>
                <p className={`text-lg leading-relaxed transition-colors duration-500 ${
                  isDay ? 'text-slate-600' : 'text-slate-300'
                }`}>
                  {feature.description}
                </p>
              </div>
              <div className="relative">
                <div className="relative overflow-hidden rounded-3xl shadow-2xl">
                  <Image 
                    src={feature.image} 
                    alt={feature.title}
                    width={400}
                    height={320}
                    className="w-full h-80 object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                  <div className="absolute bottom-6 left-6 text-8xl opacity-80">
                    {feature.icon}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Tab Navigation */}
          <div className="mb-12">
            <div className={`flex flex-wrap gap-4 p-2 rounded-2xl ${
              isDay ? 'bg-slate-100' : 'bg-slate-800'
            }`}>
              {['overview', 'technical', 'certifications', 'case-study'].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-6 py-3 rounded-xl font-bold text-sm transition-all duration-300 ${
                    activeTab === tab
                      ? isDay 
                        ? 'bg-blue-500 text-white shadow-lg' 
                        : 'bg-blue-400 text-slate-900 shadow-lg'
                      : isDay
                        ? 'text-slate-600 hover:bg-white'
                        : 'text-slate-300 hover:bg-slate-700'
                  }`}
                >
                  {tab.charAt(0).toUpperCase() + tab.slice(1).replace('-', ' ')}
                </button>
              ))}
            </div>
          </div>

          {/* Tab Content */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2">
              {activeTab === 'overview' && (
                <div className={`p-8 rounded-3xl transition-all duration-500 ${
                  isDay 
                    ? 'bg-white border-2 border-slate-200/50 shadow-xl' 
                    : 'bg-slate-800 border-2 border-slate-700/50 shadow-2xl'
                }`}>
                  <h3 className={`text-2xl font-black mb-6 transition-colors duration-500 ${
                    isDay ? 'text-slate-800' : 'text-white'
                  }`}>
                    Key Benefits & Advantages
                  </h3>
                  <div className="space-y-4">
                    {feature.keyBenefits.map((benefit, index) => (
                      <div key={index} className="flex items-start space-x-4">
                        <div className={`w-6 h-6 rounded-full flex items-center justify-center ${
                          isDay ? 'bg-blue-100 text-blue-600' : 'bg-blue-900/50 text-blue-400'
                        } font-bold text-sm mt-1`}>
                          ✓
                        </div>
                        <p className={`text-lg transition-colors duration-500 ${
                          isDay ? 'text-slate-700' : 'text-slate-300'
                        }`}>
                          {benefit}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {activeTab === 'technical' && (
                <div className={`p-8 rounded-3xl transition-all duration-500 ${
                  isDay 
                    ? 'bg-white border-2 border-slate-200/50 shadow-xl' 
                    : 'bg-slate-800 border-2 border-slate-700/50 shadow-2xl'
                }`}>
                  <h3 className={`text-2xl font-black mb-6 transition-colors duration-500 ${
                    isDay ? 'text-slate-800' : 'text-white'
                  }`}>
                    Technical Specifications
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {Object.entries(feature.technicalSpecs).map(([key, value], index) => (
                      <div key={index} className={`p-4 rounded-2xl ${
                        isDay ? 'bg-slate-50 border border-slate-200' : 'bg-slate-700 border border-slate-600'
                      }`}>
                        <div className={`text-sm font-semibold mb-1 ${
                          isDay ? 'text-blue-600' : 'text-blue-400'
                        }`}>
                          {key}
                        </div>
                        <div className={`text-lg font-bold ${
                          isDay ? 'text-slate-800' : 'text-white'
                        }`}>
                          {value}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {activeTab === 'certifications' && (
                <div className={`p-8 rounded-3xl transition-all duration-500 ${
                  isDay 
                    ? 'bg-white border-2 border-slate-200/50 shadow-xl' 
                    : 'bg-slate-800 border-2 border-slate-700/50 shadow-2xl'
                }`}>
                  <h3 className={`text-2xl font-black mb-6 transition-colors duration-500 ${
                    isDay ? 'text-slate-800' : 'text-white'
                  }`}>
                    Certifications & Standards
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {feature.certifications.map((cert, index) => (
                      <div key={index} className={`p-4 rounded-2xl ${
                        isDay ? 'bg-green-50 border-2 border-green-200' : 'bg-green-900/20 border-2 border-green-500/30'
                      }`}>
                        <div className="flex items-center space-x-3">
                          <div className={`text-2xl ${
                            isDay ? 'text-green-600' : 'text-green-400'
                          }`}>
                            ✅
                          </div>
                          <p className={`font-semibold ${
                            isDay ? 'text-green-700' : 'text-green-300'
                          }`}>
                            {cert}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {activeTab === 'case-study' && (
                <div className={`p-8 rounded-3xl transition-all duration-500 ${
                  isDay 
                    ? 'bg-white border-2 border-slate-200/50 shadow-xl' 
                    : 'bg-slate-800 border-2 border-slate-700/50 shadow-2xl'
                }`}>
                  <h3 className={`text-2xl font-black mb-6 transition-colors duration-500 ${
                    isDay ? 'text-slate-800' : 'text-white'
                  }`}>
                    {feature.caseStudy.title}
                  </h3>
                  <p className={`text-lg mb-6 leading-relaxed transition-colors duration-500 ${
                    isDay ? 'text-slate-600' : 'text-slate-300'
                  }`}>
                    {feature.caseStudy.details}
                  </p>
                  <h4 className={`text-xl font-bold mb-4 transition-colors duration-500 ${
                    isDay ? 'text-slate-800' : 'text-white'
                  }`}>
                    Key Results:
                  </h4>
                  <div className="space-y-3">
                    {feature.caseStudy.results.map((result, index) => (
                      <div key={index} className="flex items-center space-x-3">
                        <div className={`w-2 h-2 rounded-full ${
                          isDay ? 'bg-blue-500' : 'bg-blue-400'
                        }`} />
                        <p className={`text-lg font-medium ${
                          isDay ? 'text-slate-700' : 'text-slate-300'
                        }`}>
                          {result}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Sidebar */}
            <div className="space-y-8">
              {/* Quick Stats */}
              <div className={`p-6 rounded-3xl transition-all duration-500 ${
                isDay 
                  ? 'bg-gradient-to-br from-blue-50 to-purple-50 border-2 border-blue-200/30' 
                  : 'bg-gradient-to-br from-blue-900/30 to-purple-900/30 border-2 border-blue-500/20'
              } backdrop-blur-xl`}>
                <h4 className={`text-xl font-black mb-4 transition-colors duration-500 ${
                  isDay ? 'text-slate-800' : 'text-white'
                }`}>
                  Quick Stats
                </h4>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className={`font-medium ${isDay ? 'text-slate-600' : 'text-slate-300'}`}>
                      Category:
                    </span>
                    <span className={`font-bold ${isDay ? 'text-blue-600' : 'text-blue-400'}`}>
                      {feature.category}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className={`font-medium ${isDay ? 'text-slate-600' : 'text-slate-300'}`}>
                      Impact:
                    </span>
                    <span className={`font-bold ${isDay ? 'text-green-600' : 'text-green-400'}`}>
                      High
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className={`font-medium ${isDay ? 'text-slate-600' : 'text-slate-300'}`}>
                      Innovation:
                    </span>
                    <div className="flex space-x-1">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <div
                          key={i}
                          className={`w-2 h-2 rounded-full ${
                            i < 5 ? (isDay ? 'bg-amber-500' : 'bg-amber-400') : (isDay ? 'bg-slate-300' : 'bg-slate-600')
                          }`}
                        />
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Contact CTA */}
              <div className={`p-6 rounded-3xl transition-all duration-500 ${
                isDay 
                  ? 'bg-gradient-to-br from-amber-50 to-orange-50 border-2 border-amber-200/30' 
                  : 'bg-gradient-to-br from-amber-900/30 to-orange-900/30 border-2 border-amber-500/20'
              } backdrop-blur-xl text-center`}>
                <div className="text-4xl mb-4">💡</div>
                <h4 className={`text-xl font-black mb-3 transition-colors duration-500 ${
                  isDay ? 'text-slate-800' : 'text-white'
                }`}>
                  Want to Learn More?
                </h4>
                <p className={`text-sm mb-4 transition-colors duration-500 ${
                  isDay ? 'text-slate-600' : 'text-slate-300'
                }`}>
                  Get detailed technical specifications and pricing for this innovation.
                </p>
                <button className={`w-full py-3 rounded-xl font-bold text-sm transition-all duration-300 ${
                  isDay 
                    ? 'bg-gradient-to-r from-amber-500 to-orange-500 text-white shadow-lg hover:shadow-xl' 
                    : 'bg-gradient-to-r from-amber-400 to-orange-400 text-slate-900 shadow-lg hover:shadow-xl'
                } transform hover:scale-105`}>
                  Contact Our Experts
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* All Features Overview */}
      <section className={`py-20 relative transition-all duration-500 ${
        isDay ? 'bg-slate-50' : 'bg-slate-800'
      }`}>
        <div className="w-full max-w-7xl mx-auto px-8">
          <div className="text-center mb-16">
            <h2 className={`text-4xl md:text-5xl font-black mb-6 transition-colors duration-500 ${
              isDay ? 'text-slate-800' : 'text-white'
            }`}>
              All Our Unique Features
            </h2>
            <p className={`text-xl max-w-3xl mx-auto transition-colors duration-500 ${
              isDay ? 'text-slate-600' : 'text-slate-300'
            }`}>
              Explore the complete range of innovations that make AutoSys Sunergy the leader in solar technology
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {uniqueFeatures.map((feat, index) => (
              <button
                key={index}
                onClick={() => setSelectedFeature(index)}
                className={`group relative p-8 rounded-3xl text-left transition-all duration-700 ${
                  selectedFeature === index
                    ? isDay 
                      ? 'bg-gradient-to-br from-blue-500 to-purple-500 text-white shadow-2xl shadow-blue-500/25 scale-105' 
                      : 'bg-gradient-to-br from-blue-400 to-purple-400 text-white shadow-2xl shadow-blue-400/25 scale-105'
                    : isDay
                      ? 'bg-white border-2 border-slate-200/50 shadow-lg hover:shadow-xl hover:shadow-blue-500/10'
                      : 'bg-slate-700 border-2 border-slate-600/50 shadow-xl hover:shadow-2xl hover:shadow-blue-500/20'
                } backdrop-blur-xl transform hover:scale-105 hover:-translate-y-2`}
              >
                <div className="text-4xl mb-4">{feat.icon}</div>
                <h3 className={`text-xl font-black mb-3 leading-tight ${
                  selectedFeature === index ? 'text-white' : isDay ? 'text-slate-800' : 'text-white'
                }`}>
                  {feat.title}
                </h3>
                <p className={`text-sm ${
                  selectedFeature === index ? 'text-white/90' : isDay ? 'text-slate-600' : 'text-slate-300'
                }`}>
                  {feat.subtitle}
                </p>
                <div className={`mt-4 text-xs font-semibold px-3 py-1 rounded-full inline-block ${
                  selectedFeature === index 
                    ? 'bg-white/20 text-white' 
                    : isDay 
                      ? 'bg-blue-100 text-blue-600' 
                      : 'bg-blue-900/50 text-blue-300'
                }`}>
                  {feat.category}
                </div>
              </button>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
