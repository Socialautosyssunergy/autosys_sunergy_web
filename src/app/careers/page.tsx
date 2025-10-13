'use client';
import React, { useState, useEffect } from 'react';
import { useTheme } from '@/contexts/ThemeContext';
import { getThemeHover } from '@/utils/themeUtils';
import Header from '@/components/home/Header';
import Footer from '@/components/home/Footer';
import '@/styles/careers.css';
import { 
  Briefcase, 
  MapPin, 
  Clock, 
  Users, 
  GraduationCap,
  Star,
  Send,
  Upload,
  CheckCircle,
  ArrowRight,
  Zap,
  Award,
  Heart,
  TrendingUp,
  Rocket,
  Coffee,
  Sparkles
} from 'lucide-react';

export default function CareersPage() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [selectedJob, setSelectedJob] = useState<string | null>(null);
  const { theme } = useTheme();
  const hoverEffects = getThemeHover(theme);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const jobOpenings = [
    {
      id: '1',
      title: 'Solar Installation Engineer',
      department: 'Engineering',
      location: 'Indore, MP',
      type: 'Full-time',
      experience: '2-4 years',
      salary: '₹3.5-5.5 LPA',
      description: 'Design and oversee solar panel installations for residential and commercial projects.',
      requirements: [
        'B.Tech/Diploma in Electrical/Electronics Engineering',
        'Experience in solar PV systems',
        'Knowledge of electrical safety standards',
        'Project management skills'
      ],
      responsibilities: [
        'Site survey and technical assessment',
        'System design and layout planning',
        'Installation supervision and quality control',
        'Client interaction and technical support'
      ]
    },
    {
      id: '2',
      title: 'Sales Executive - Solar Solutions',
      department: 'Sales',
      location: 'Indore, MP',
      type: 'Full-time',
      experience: '1-3 years',
      salary: '₹2.5-4 LPA + Incentives',
      description: 'Drive sales growth by promoting solar energy solutions to residential and commercial clients.',
      requirements: [
        'Graduate in any field',
        'Excellent communication skills',
        'Sales experience preferred',
        'Knowledge of solar products is a plus'
      ],
      responsibilities: [
        'Generate leads and convert prospects',
        'Product demonstrations and presentations',
        'Client relationship management',
        'Achieve monthly and quarterly sales targets'
      ]
    },
    {
      id: '3',
      title: 'Project Manager - Solar',
      department: 'Operations',
      location: 'Indore, MP',
      type: 'Full-time',
      experience: '3-6 years',
      salary: '₹5-8 LPA',
      description: 'Lead end-to-end project execution for large-scale solar installations.',
      requirements: [
        'B.Tech/MBA with project management experience',
        'PMP certification preferred',
        'Experience in renewable energy projects',
        'Strong leadership and communication skills'
      ],
      responsibilities: [
        'Project planning and resource allocation',
        'Team coordination and vendor management',
        'Quality assurance and timeline management',
        'Client communication and reporting'
      ]
    },
    {
      id: '4',
      title: 'Maintenance Technician',
      department: 'Service',
      location: 'Indore, MP',
      type: 'Full-time',
      experience: '1-2 years',
      salary: '₹2-3 LPA',
      description: 'Perform routine maintenance and troubleshooting of solar energy systems.',
      requirements: [
        'ITI/Diploma in Electrical',
        'Basic electrical troubleshooting skills',
        'Willingness to travel for field work',
        'Safety-conscious mindset'
      ],
      responsibilities: [
        'Preventive maintenance of solar systems',
        'System performance monitoring',
        'Troubleshooting and repairs',
        'Customer service and support'
      ]
    }
  ];

  const benefits = [
    {
      icon: <Heart className="w-6 h-6" />,
      title: 'Health & Wellness',
      description: 'Comprehensive health insurance and wellness programs'
    },
    {
      icon: <GraduationCap className="w-6 h-6" />,
      title: 'Learning & Development',
      description: 'Continuous training and skill development opportunities'
    },
    {
      icon: <TrendingUp className="w-6 h-6" />,
      title: 'Career Growth',
      description: 'Clear career progression paths and performance-based promotions'
    },
    {
      icon: <Award className="w-6 h-6" />,
      title: 'Recognition',
      description: 'Regular recognition programs and performance incentives'
    }
  ];

  // const companyStats = [
  //   { number: '17+', label: 'Years of Excellence' },
  //   { number: '500+', label: 'Projects Completed' },
  //   { number: '50+', label: 'Team Members' },
  //   { number: '98%', label: 'Employee Satisfaction' }
  // ];

  return (
    <div className={`min-h-screen transition-all duration-500 ${
      theme === 'day' ? 'bg-gradient-to-br from-blue-50 to-blue-100' : 'bg-slate-900'
    }`}>
      <Header isScrolled={isScrolled} />
      
      {/* Compact Hero Section */}
      <section className={`relative py-20 overflow-hidden transition-all duration-500 ${
        theme === 'day' ? 'bg-gradient-to-br from-blue-50 to-blue-100' : 'bg-slate-900'
      }`}>
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23000000' fill-opacity='0.1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }} />
        </div>

        <div className="relative max-w-7xl mx-auto px-6 text-center">
          <div className={`inline-block px-6 py-2 rounded-full mb-6 ${
            theme === 'day' ? 'bg-blue-100 text-blue-800' : 'bg-blue-900/50 text-blue-300'
          }`}>
            <span className="text-sm font-semibold tracking-wide">CAREERS AT AUTOSYS SUNERGY</span>
          </div>
          
          <h1 className={`text-4xl md:text-6xl font-bold leading-tight mb-6 ${
            theme === 'day' ? 'text-slate-900' : 'text-slate-100'
          }`}>
            Build Your Future in
            <span className={`block ${
              theme === 'day' ? 'text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-blue-800' : 'text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-blue-600'
            }`}>
              Solar Energy
            </span>
          </h1>
          
          <p className={`text-xl max-w-3xl mx-auto leading-relaxed mb-8 ${
            theme === 'day' ? 'text-slate-600' : 'text-slate-300'
          }`}>
            Join India&apos;s leading solar energy company and be part of the renewable energy revolution. 
            Build your career while building a sustainable future.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <button className={`px-8 py-4 rounded-xl font-semibold transition-all duration-300 flex items-center justify-center gap-2 ${hoverEffects.scale} ${
              theme === 'day' 
                ? 'bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white shadow-lg hover:shadow-xl' 
                : 'bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white shadow-lg hover:shadow-xl'
            }`}>
              <Briefcase className="w-5 h-5" />
              View Open Positions
            </button>
            
            <button className={`px-8 py-4 rounded-xl font-semibold border-2 transition-all duration-300 flex items-center justify-center gap-2 ${hoverEffects.scale} ${
              theme === 'day' 
                ? 'border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white' 
                : 'border-blue-400 text-blue-400 hover:bg-blue-400 hover:text-slate-900'
            }`}>
              <Users className="w-5 h-5" />
              Our Culture
            </button>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
            {[
              { number: '18+', label: 'Years of Excellence', icon: <Award className="w-4 h-4" /> },
              { number: '50+', label: 'Team Members', icon: <Users className="w-4 h-4" /> },
              { number: '2000+', label: 'Happy Customers', icon: <Star className="w-4 h-4" /> },
              { number: '98%', label: 'Employee Satisfaction', icon: <Heart className="w-4 h-4" /> }
            ].map((stat, index) => (
              <div key={index} className={`text-center p-4 rounded-lg ${
                theme === 'day' ? 'bg-white/50 border border-blue-200' : 'bg-slate-800/50 border border-slate-600'
              }`}>
                <div className={`inline-flex items-center justify-center w-8 h-8 rounded-full mb-2 ${
                  theme === 'day' ? 'bg-blue-100 text-blue-600' : 'bg-blue-800 text-blue-300'
                }`}>
                  {stat.icon}
                </div>
                <div className={`text-2xl font-bold ${theme === 'day' ? 'text-blue-600' : 'text-blue-400'}`}>
                  {stat.number}
                </div>
                <div className={`text-sm ${theme === 'day' ? 'text-slate-600' : 'text-slate-300'}`}>
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Compact Why Join Us Section */}
      <section className={`py-16 transition-all duration-500 ${
        theme === 'day' ? 'bg-gradient-to-br from-blue-50 to-blue-100' : 'bg-slate-900'
      }`}>
        <div className="container mx-auto px-6">
          <div className="text-center mb-12">
            <div className={`inline-block px-6 py-2 rounded-full mb-4 ${
              theme === 'day' ? 'bg-blue-100 text-blue-800' : 'bg-blue-900/50 text-blue-300'
            }`}>
              <span className="text-sm font-semibold tracking-wide">WHY CHOOSE US</span>
            </div>
            <h2 className={`text-3xl md:text-4xl font-bold mb-4 ${
              theme === 'day' ? 'text-slate-900' : 'text-slate-100'
            }`}>
              Experience Excellence in Every Aspect
            </h2>
            <p className={`text-lg max-w-3xl mx-auto leading-relaxed ${
              theme === 'day' ? 'text-slate-600' : 'text-slate-300'
            }`}>
              Join a company that&apos;s not just creating jobs, but building a sustainable future. We invest in our people because they are our greatest asset.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {benefits.map((benefit, index) => (
              <div 
                key={index} 
                className={`p-6 text-center group transition-all duration-300 rounded-xl border ${hoverEffects.scale} ${
                  theme === 'day' ? 'bg-white border-blue-200 hover:border-blue-300 shadow-md hover:shadow-lg' : 'bg-slate-800 border-slate-600 hover:border-slate-500 shadow-lg hover:shadow-xl'
                }`}
              >
                <div className="relative mb-4">
                  <div className={`w-12 h-12 mx-auto rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300 ${
                    theme === 'day' ? 'bg-gradient-to-br from-blue-500 to-blue-600 text-white' : 'bg-gradient-to-br from-blue-500 to-purple-600 text-white'
                  }`}>
                    {benefit.icon}
                  </div>
                </div>
                <h3 className={`text-lg font-bold mb-3 transition-colors duration-300 ${
                  theme === 'day' ? 'text-slate-900 group-hover:text-blue-600' : 'text-slate-100 group-hover:text-blue-400'
                }`}>
                  {benefit.title}
                </h3>
                <p className={`leading-relaxed ${
                  theme === 'day' ? 'text-slate-600' : 'text-slate-300'
                }`}>
                  {benefit.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Compact Life at Autosys Sunergy Section */}
      <section className={`py-20 relative overflow-hidden transition-all duration-500 ${
        theme === 'day' ? 'bg-gradient-to-br from-blue-50 via-white to-blue-50' : 'bg-gradient-to-br from-slate-900 via-slate-800 to-blue-900'
      }`}>
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23000000' fill-opacity='0.1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }} />
        </div>

        <div className="container mx-auto px-6 relative z-10">
          {/* Section Header */}
          <div className="text-center mb-16">
            <div className={`inline-block px-6 py-2 rounded-full mb-4 ${
              theme === 'day' ? 'bg-blue-100 text-blue-800' : 'bg-blue-900/50 text-blue-300'
            }`}>
              <span className="text-sm font-semibold tracking-wide">LIFE AT AUTOSYS SUNERGY</span>
            </div>
            <h2 className={`text-4xl md:text-5xl font-bold mb-6 leading-tight ${
              theme === 'day' ? 'text-slate-900' : 'text-slate-100'
            }`}>
              Where Innovation
              <span className={`block ${
                theme === 'day' ? 'text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-blue-700 to-blue-800' : 'text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-blue-500 to-blue-600'
              }`}>
                Meets Purpose
              </span>
            </h2>
            <p className={`text-lg max-w-3xl mx-auto leading-relaxed ${
              theme === 'day' ? 'text-slate-600' : 'text-slate-300'
            }`}>
              Discover what makes Autosys Sunergy more than just a workplace. It&apos;s where passionate minds come together to create sustainable solutions for tomorrow.
            </p>
          </div>

          {/* Culture Highlights Grid */}
          <div className="grid md:grid-cols-3 gap-6 mb-16">
            {/* Innovation Hub */}
            <div className={`group relative overflow-hidden rounded-2xl p-6 text-white transform transition-all duration-500 ${hoverEffects.scale} ${
              theme === 'day' ? 'bg-gradient-to-br from-blue-500 to-blue-600' : 'bg-gradient-to-br from-blue-500 to-purple-600'
            }`}>
              <div className="absolute top-0 right-0 w-24 h-24 bg-white/10 rounded-full -translate-y-12 translate-x-12"></div>
              <Rocket className="w-10 h-10 mb-4 text-white/90" />
              <h3 className="text-xl font-bold mb-3">Innovation Hub</h3>
              <p className="text-white/90 leading-relaxed text-sm">
                State-of-the-art R&D facilities where breakthrough solar technologies are born. Access to cutting-edge equipment and collaborative spaces.
              </p>
            </div>

            {/* Learning Culture */}
            <div className={`group relative overflow-hidden rounded-2xl p-6 text-white transform transition-all duration-500 ${hoverEffects.scale} ${
              theme === 'day' ? 'bg-gradient-to-br from-emerald-500 to-teal-600' : 'bg-gradient-to-br from-emerald-500 to-teal-600'
            }`}>
              <div className="absolute top-0 right-0 w-24 h-24 bg-white/10 rounded-full -translate-y-12 translate-x-12"></div>
              <GraduationCap className="w-10 h-10 mb-4 text-white/90" />
              <h3 className="text-xl font-bold mb-3">Continuous Learning</h3>
              <p className="text-white/90 leading-relaxed text-sm">
                Unlimited access to training programs, certifications, and conferences. We invest ₹50,000+ annually in each employee&apos;s growth.
              </p>
            </div>

            {/* Work-Life Balance */}
            <div className={`group relative overflow-hidden rounded-2xl p-6 text-white transform transition-all duration-500 ${hoverEffects.scale} ${
              theme === 'day' ? 'bg-gradient-to-br from-orange-500 to-red-500' : 'bg-gradient-to-br from-orange-500 to-red-500'
            }`}>
              <div className="absolute top-0 right-0 w-24 h-24 bg-white/10 rounded-full -translate-y-12 translate-x-12"></div>
              <Coffee className="w-10 h-10 mb-4 text-white/90" />
              <h3 className="text-xl font-bold mb-3">Perfect Balance</h3>
              <p className="text-white/90 leading-relaxed text-sm">
                Flexible working hours, remote work options, and unlimited vacation policy. Your well-being is our priority.
              </p>
            </div>
          </div>

          {/* Team & Culture Content */}
          <div className="grid md:grid-cols-2 gap-8 mb-16">
            {/* Team Diversity */}
            <div className={`relative rounded-2xl p-8 ${
              theme === 'day' ? 'bg-white border border-blue-200 shadow-lg' : 'bg-slate-800 border border-slate-600 shadow-xl'
            }`}>
              <div className="flex items-center mb-6">
                <Users className={`w-12 h-12 mr-4 ${
                  theme === 'day' ? 'text-blue-600' : 'text-blue-400'
                }`} />
                <div>
                  <h3 className={`text-2xl font-bold ${
                    theme === 'day' ? 'text-slate-900' : 'text-slate-100'
                  }`}>Diverse Team</h3>
                  <p className={`${
                    theme === 'day' ? 'text-slate-600' : 'text-slate-300'
                  }`}>50+ talented individuals from 15+ states across India</p>
                </div>
              </div>
              <div className="flex -space-x-2 mb-4">
                {[...Array(8)].map((_, i) => (
                  <div key={i} className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-semibold border-2 ${
                    theme === 'day' ? 'bg-blue-100 text-blue-600 border-white' : 'bg-blue-900 text-blue-300 border-slate-800'
                  }`}>
                    {String.fromCharCode(65 + i)}
                  </div>
                ))}
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-semibold border-2 ${
                  theme === 'day' ? 'bg-blue-200 text-blue-700 border-white' : 'bg-blue-800 text-blue-200 border-slate-800'
                }`}>
                  +42
                </div>
              </div>
              <p className={`text-sm ${
                theme === 'day' ? 'text-slate-600' : 'text-slate-300'
              }`}>
                Our team represents the diversity of India, bringing unique perspectives and innovative solutions to every project we undertake.
              </p>
            </div>

            {/* Company Culture */}
            <div className={`relative rounded-2xl p-8 ${
              theme === 'day' ? 'bg-gradient-to-br from-blue-500 to-blue-600 text-white' : 'bg-gradient-to-br from-blue-600 to-cyan-600 text-white'
            }`}>
              <Zap className="w-12 h-12 mb-4 text-white/90" />
              <h3 className="text-2xl font-bold mb-4">Innovation Culture</h3>
              <p className="text-white/90 mb-6 leading-relaxed">
                We foster an environment where creativity flourishes and bold ideas become breakthrough solutions. Every team member is empowered to contribute to India&apos;s renewable energy transformation.
              </p>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div className="flex items-center">
                  <CheckCircle className="w-4 h-4 mr-2" />
                  Open Communication
                </div>
                <div className="flex items-center">
                  <CheckCircle className="w-4 h-4 mr-2" />
                  Innovation Time
                </div>
                <div className="flex items-center">
                  <CheckCircle className="w-4 h-4 mr-2" />
                  Team Collaboration
                </div>
                <div className="flex items-center">
                  <CheckCircle className="w-4 h-4 mr-2" />
                  Growth Mindset
                </div>
              </div>
            </div>
          </div>

          {/* Employee Testimonials */}
          <div className="mb-16">
            <h3 className={`text-3xl font-bold text-center mb-12 ${
              theme === 'day' ? 'text-slate-900' : 'text-slate-100'
            }`}>What Our Team Says</h3>
            
            <div className="grid md:grid-cols-3 gap-6">
              {[
                {
                  name: "Priya Sharma",
                  role: "Solar Engineer",
                  quote: "The innovation culture here is incredible. I&apos;ve grown more in 2 years than I did in my previous 5 years elsewhere.",
                  rating: 5
                },
                {
                  name: "Rajesh Kumar",
                  role: "Project Manager",
                  quote: "Work-life balance is real here. Flexible hours and supportive leadership make all the difference.",
                  rating: 5
                },
                {
                  name: "Anita Patel",
                  role: "Sales Director",
                  quote: "Being part of India&apos;s renewable energy transformation while building my career has been incredibly fulfilling.",
                  rating: 5
                }
              ].map((testimonial, index) => (
                <div key={index} className={`p-6 rounded-xl transition-all duration-300 ${hoverEffects.scale} ${
                  theme === 'day' ? 'bg-white border border-blue-200 shadow-md hover:shadow-lg' : 'bg-slate-800 border border-slate-600 shadow-lg hover:shadow-xl'
                }`}>
                  <div className="flex items-center mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 text-yellow-400 fill-current" />
                    ))}
                  </div>
                  <p className={`mb-4 leading-relaxed italic text-sm ${
                    theme === 'day' ? 'text-slate-700' : 'text-slate-300'
                  }`}>&quot;{testimonial.quote}&quot;</p>
                  <div>
                    <div className={`font-semibold ${
                      theme === 'day' ? 'text-slate-900' : 'text-slate-100'
                    }`}>{testimonial.name}</div>
                    <div className={`text-sm ${
                      theme === 'day' ? 'text-blue-600' : 'text-blue-400'
                    }`}>{testimonial.role}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* CTA Section */}
          <div className="text-center">
            <button className={`inline-flex items-center px-8 py-4 rounded-xl font-semibold transition-all duration-300 transform ${hoverEffects.scale} ${
              theme === 'day' 
                ? 'bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white shadow-lg hover:shadow-xl' 
                : 'bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white shadow-lg hover:shadow-xl'
            }`}>
              <Sparkles className="w-5 h-5 mr-2" />
              Join Our Amazing Team
              <ArrowRight className="w-5 h-5 ml-2" />
            </button>
          </div>
        </div>
      </section>

      {/* Compact Job Openings Section */}
      <section className={`py-16 transition-all duration-500 ${
        theme === 'day' ? 'bg-gradient-to-br from-blue-50 to-blue-100' : 'bg-slate-800'
      }`}>
        <div className="container mx-auto px-6">
          <div className="text-center mb-12">
            <div className={`inline-block px-6 py-2 rounded-full mb-4 ${
              theme === 'day' ? 'bg-blue-100 text-blue-800' : 'bg-blue-900/50 text-blue-300'
            }`}>
              <span className="text-sm font-semibold tracking-wide">CAREER OPPORTUNITIES</span>
            </div>
            <h2 className={`text-3xl md:text-4xl font-bold mb-4 ${
              theme === 'day' ? 'text-slate-900' : 'text-slate-100'
            }`}>
              <span className={`${
                theme === 'day' ? 'text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-blue-700 to-blue-800' : 'text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-blue-500 to-blue-600'
              }`}>
                Current Openings
              </span>
            </h2>
            <p className={`text-lg max-w-3xl mx-auto leading-relaxed ${
              theme === 'day' ? 'text-slate-600' : 'text-slate-300'
            }`}>
              Discover exciting opportunities to grow your career in the renewable energy sector. Join us in building a sustainable tomorrow.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-6">
            {jobOpenings.map((job) => (
              <div key={job.id} className={`rounded-xl p-6 transition-all duration-300 ${hoverEffects.scale} ${
                theme === 'day' ? 'bg-white border border-blue-200 shadow-md hover:shadow-lg' : 'bg-slate-700 border border-slate-600 shadow-lg hover:shadow-xl'
              }`}>
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className={`text-xl font-bold mb-2 ${
                      theme === 'day' ? 'text-slate-900' : 'text-slate-100'
                    }`}>
                      {job.title}
                    </h3>
                    <div className="flex flex-wrap gap-3 text-sm">
                      <span className={`flex items-center ${
                        theme === 'day' ? 'text-slate-600' : 'text-slate-300'
                      }`}>
                        <Briefcase className="w-4 h-4 mr-1" />
                        {job.department}
                      </span>
                      <span className={`flex items-center ${
                        theme === 'day' ? 'text-slate-600' : 'text-slate-300'
                      }`}>
                        <MapPin className="w-4 h-4 mr-1" />
                        {job.location}
                      </span>
                      <span className={`flex items-center ${
                        theme === 'day' ? 'text-slate-600' : 'text-slate-300'
                      }`}>
                        <Clock className="w-4 h-4 mr-1" />
                        {job.type}
                      </span>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className={`text-lg font-semibold ${
                      theme === 'day' ? 'text-blue-600' : 'text-blue-400'
                    }`}>
                      {job.salary}
                    </div>
                    <div className={`text-sm ${
                      theme === 'day' ? 'text-slate-600' : 'text-slate-300'
                    }`}>
                      {job.experience}
                    </div>
                  </div>
                </div>

                <p className={`mb-4 ${
                  theme === 'day' ? 'text-slate-600' : 'text-slate-300'
                }`}>
                  {job.description}
                </p>

                <div className="space-y-3 mb-4">
                  <div>
                    <h4 className={`font-semibold mb-2 ${
                      theme === 'day' ? 'text-slate-900' : 'text-slate-100'
                    }`}>Key Requirements:</h4>
                    <ul className="space-y-1">
                      {job.requirements.slice(0, 2).map((req, index) => (
                        <li key={index} className={`flex items-start text-sm ${
                          theme === 'day' ? 'text-slate-600' : 'text-slate-300'
                        }`}>
                          <CheckCircle className="w-4 h-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                          {req}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="flex gap-3">
                  <button 
                    onClick={() => setSelectedJob(selectedJob === job.id ? null : job.id)}
                    className={`flex-1 px-4 py-2 border rounded-lg transition-all duration-300 text-center text-sm font-medium ${
                      theme === 'day' 
                        ? 'border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white' 
                        : 'border-blue-400 text-blue-400 hover:bg-blue-400 hover:text-slate-900'
                    } ${hoverEffects.scale}`}
                  >
                    {selectedJob === job.id ? 'Show Less' : 'View Details'}
                  </button>
                  <button className={`px-6 py-2 font-semibold rounded-lg text-sm transition-all duration-300 ${hoverEffects.scale} ${
                    theme === 'day' 
                      ? 'bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white' 
                      : 'bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white'
                  }`}>
                    Apply Now
                  </button>
                </div>

                {/* Expanded Details */}
                {selectedJob === job.id && (
                  <div className={`mt-4 pt-4 border-t space-y-3 ${
                    theme === 'day' ? 'border-blue-200' : 'border-slate-600'
                  }`}>
                    <div>
                      <h4 className={`font-semibold mb-2 ${
                        theme === 'day' ? 'text-slate-900' : 'text-slate-100'
                      }`}>All Requirements:</h4>
                      <ul className="space-y-1">
                        {job.requirements.map((req, index) => (
                          <li key={index} className={`flex items-start text-sm ${
                            theme === 'day' ? 'text-slate-600' : 'text-slate-300'
                          }`}>
                            <CheckCircle className="w-4 h-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                            {req}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <h4 className={`font-semibold mb-2 ${
                        theme === 'day' ? 'text-slate-900' : 'text-slate-100'
                      }`}>Key Responsibilities:</h4>
                      <ul className="space-y-1">
                        {job.responsibilities.map((resp, index) => (
                          <li key={index} className={`flex items-start text-sm ${
                            theme === 'day' ? 'text-slate-600' : 'text-slate-300'
                          }`}>
                            <Zap className="w-4 h-4 text-yellow-500 mr-2 mt-0.5 flex-shrink-0" />
                            {resp}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Compact Application Process Section */}
      <section className={`py-16 transition-all duration-500 ${
        theme === 'day' ? 'bg-gradient-to-br from-blue-50 to-blue-100' : 'bg-slate-900'
      }`}>
        <div className="container mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className={`text-3xl md:text-4xl font-bold mb-4 ${
              theme === 'day' ? 'text-slate-900' : 'text-slate-100'
            }`}>
              Application Process
            </h2>
            <p className={`text-lg ${
              theme === 'day' ? 'text-slate-600' : 'text-slate-300'
            }`}>
              Simple and transparent hiring process designed to find the best talent.
            </p>
          </div>

          <div className="grid md:grid-cols-4 gap-6">
            {[
              { step: '1', title: 'Apply Online', description: 'Submit your application through our career portal', icon: <Send className="w-5 h-5" /> },
              { step: '2', title: 'Initial Screening', description: 'HR team reviews your profile and experience', icon: <Users className="w-5 h-5" /> },
              { step: '3', title: 'Technical Interview', description: 'Technical assessment with our engineering team', icon: <CheckCircle className="w-5 h-5" /> },
              { step: '4', title: 'Final Interview', description: 'Meet with leadership team and get your offer', icon: <Award className="w-5 h-5" /> }
            ].map((process, index) => (
              <div key={index} className="text-center">
                <div className={`w-16 h-16 mx-auto mb-4 rounded-full flex items-center justify-center font-bold text-white ${
                  theme === 'day' 
                    ? 'bg-gradient-to-r from-blue-600 to-blue-700' 
                    : 'bg-gradient-to-r from-blue-600 to-blue-700'
                }`}>
                  {process.icon}
                </div>
                <h3 className={`text-xl font-semibold mb-3 ${
                  theme === 'day' ? 'text-slate-900' : 'text-slate-100'
                }`}>
                  {process.title}
                </h3>
                <p className={`${
                  theme === 'day' ? 'text-slate-600' : 'text-slate-300'
                }`}>
                  {process.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Compact CTA Section */}
      <section className={`py-16 transition-all duration-500 ${
        theme === 'day' ? 'bg-gradient-to-br from-blue-50 to-blue-100' : 'bg-slate-800'
      }`}>
        <div className="container mx-auto px-6 text-center">
          <h2 className={`text-3xl md:text-4xl font-bold mb-4 ${
            theme === 'day' ? 'text-slate-900' : 'text-slate-100'
          }`}>
            Ready to Power Your Career?
          </h2>
          <p className={`text-lg mb-8 max-w-3xl mx-auto ${
            theme === 'day' ? 'text-slate-600' : 'text-slate-300'
          }`}>
            Join Autosys Sunergy and be part of India&apos;s renewable energy transformation. 
            Your career in solar energy starts here.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className={`px-8 py-4 font-semibold rounded-xl transition-all duration-300 inline-flex items-center justify-center space-x-2 ${hoverEffects.scale} ${
              theme === 'day' 
                ? 'bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white shadow-lg hover:shadow-xl' 
                : 'bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white shadow-lg hover:shadow-xl'
            }`}>
              <Upload className="w-5 h-5" />
              <span>Upload Resume</span>
            </button>
            <button className={`px-8 py-4 border-2 font-semibold rounded-xl transition-all duration-300 inline-flex items-center justify-center space-x-2 ${hoverEffects.scale} ${
              theme === 'day' 
                ? 'border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white' 
                : 'border-blue-400 text-blue-400 hover:bg-blue-400 hover:text-slate-900'
            }`}>
              <Send className="w-5 h-5" />
              <span>Contact HR</span>
            </button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
