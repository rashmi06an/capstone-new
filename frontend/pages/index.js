import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { getAuthToken } from '../lib/auth';
import Link from 'next/link';

export default function Home() {
  const router = useRouter();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;
    
    const token = getAuthToken();
    if (token) {
      router.push('/dashboard');
    }

    // Auth tab switching functionality
    const authTabs = document.querySelectorAll('.auth-tab');
    const authForms = document.querySelectorAll('.auth-form');

    const switchTab = (targetTab) => {
      // Remove active class from all tabs and forms
      authTabs.forEach(tab => tab.classList.remove('active'));
      authForms.forEach(form => form.classList.remove('active'));

      // Add active class to clicked tab
      const clickedTab = document.querySelector(`[data-tab="${targetTab}"]`);
      const targetForm = document.getElementById(`${targetTab}-form`);
      
      if (clickedTab && targetForm) {
        clickedTab.classList.add('active');
        targetForm.classList.add('active');
      }
    };

    authTabs.forEach(tab => {
      tab.addEventListener('click', (e) => {
        e.preventDefault();
        const tabType = tab.getAttribute('data-tab');
        switchTab(tabType);
      });
    });

    // Cleanup event listeners
    return () => {
      authTabs.forEach(tab => {
        tab.removeEventListener('click', () => {});
      });
    };
  }, [mounted, router]);

  const features = [
    {
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
        </svg>
      ),
      title: "Client Management",
      description: "Keep track of all your clients and their contact information in one organized place.",
      color: "neon-blue"
    },
    {
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
        </svg>
      ),
      title: "Project Tracking",
      description: "Monitor project progress, deadlines, and deliverables with intuitive dashboards.",
      color: "silver"
    },
    {
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
        </svg>
      ),
      title: "Task Organization",
      description: "Break down projects into manageable tasks and track completion status.",
      color: "neon-blue"
    },
    {
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      title: "Invoice Generation",
      description: "Create professional invoices and track payments effortlessly.",
      color: "silver"
    },
    {
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 8v8m-4-5v5m-4-2v2m-2 4h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
        </svg>
      ),
      title: "Analytics & Reports",
      description: "Get insights into your business performance with detailed analytics.",
      color: "neon-blue"
    },
    {
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
      ),
      title: "Streamlined Workflow",
      description: "Automate repetitive tasks and focus on what matters most - your work.",
      color: "silver"
    }
  ];

  const testimonials = [
    {
      name: "Sarah Johnson",
      role: "Freelance Designer",
      avatar: "SJ",
      content: "Freelanch transformed my business. I've increased my productivity by 40% and never miss a deadline anymore.",
      rating: 5
    },
    {
      name: "Mike Chen",
      role: "Web Developer",
      avatar: "MC",
      content: "The invoice generation feature alone saved me 10 hours per week. Absolutely game-changing!",
      rating: 5
    },
    {
      name: "Emma Davis",
      role: "Content Writer",
      avatar: "ED",
      content: "Managing multiple clients has never been easier. The dashboard gives me everything I need at a glance.",
      rating: 5
    }
  ];

  return (
    <div className="min-h-screen bg-gray-900 overflow-hidden relative">
      {/* Enhanced Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Animated gradient orbs */}
        <div className="absolute -top-40 -right-40 w-80 h-80 rounded-full bg-gradient-to-br from-neon-blue to-transparent opacity-20 blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 rounded-full bg-gradient-to-tr from-silver to-transparent opacity-20 blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/4 w-60 h-60 rounded-full bg-gradient-to-bl from-neon-blue to-transparent opacity-10 blur-2xl animate-pulse delay-500"></div>
        
        {/* Floating geometric shapes */}
        <div className="absolute top-20 right-1/4 w-4 h-4 bg-neon-blue rounded-full animate-bounce delay-300"></div>
        <div className="absolute top-1/3 right-10 w-6 h-6 border-2 border-silver rotate-45 animate-spin-slow"></div>
        <div className="absolute bottom-1/4 left-10 w-8 h-8 bg-gradient-to-r from-neon-blue to-silver rounded-full animate-pulse delay-700"></div>
        
        {/* Grid pattern overlay */}
        <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
      </div>

      {/* Hero Section */}
      <div className="relative z-10 min-h-screen">
        {/* Modern Navigation */}
        <nav className="relative z-20 px-6 py-4">
          <div className="max-w-7xl mx-auto flex justify-between items-center">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-br from-neon-blue to-silver rounded-lg flex items-center justify-center">
                <span className="text-black font-bold text-sm">F</span>
              </div>
              <span className="text-2xl font-bold text-white">Freelanch</span>
            </div>
            
            {/* Navigation Menu */}
            <div className="hidden md:flex items-center space-x-8">
              <Link href="#auth" className="text-gray-300 hover:text-neon-blue transition-colors duration-200">
                Sign In
              </Link>
              <Link href="#auth" className="bg-neon-blue text-black px-6 py-2 rounded-full font-semibold hover:bg-opacity-90 transition-all duration-200">
                Get Started
              </Link>
            </div>

            {/* Mobile Menu Button */}
            <div className="md:hidden">
              <button className="text-gray-300 hover:text-white">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </button>
            </div>
          </div>
        </nav>

        {/* Hero Content */}
        <div className="px-6 pt-20 pb-32">
          <div className="max-w-7xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              {/* Left Content */}
              <div className="space-y-8 animate-fade-in">
                <div className="inline-flex items-center px-4 py-2 bg-gray-800/50 rounded-full border border-gray-700">
                  <span className="w-2 h-2 bg-neon-blue rounded-full mr-3 animate-pulse"></span>
                  <span className="text-sm text-gray-300">Trusted by 10,000+ freelancers worldwide</span>
                </div>
                
                <h1 className="text-5xl lg:text-7xl font-bold leading-tight">
                  <span className="text-white">Manage Your</span>
                  <br />
                  <span className="bg-gradient-to-r from-neon-blue via-silver to-neon-blue bg-clip-text text-transparent">
                    Freelance Business
                  </span>
                  <br />
                  <span className="text-white">Like a Pro</span>
        </h1>
                
                <p className="text-xl text-gray-300 leading-relaxed max-w-xl">
                  Streamline your entire freelance workflow with our comprehensive platform. 
                  From client management to invoice generation, we've got you covered.
                </p>

                <div className="flex flex-col sm:flex-row gap-4 pt-4">
                  <Link href="#auth" className="group relative inline-flex items-center justify-center px-8 py-4 bg-neon-blue text-black font-semibold rounded-xl hover:bg-opacity-90 transition-all duration-200 transform hover:scale-105">
                    <span>Get Started Free</span>
                    <svg className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </Link>
                  
                  <Link href="#auth" className="group inline-flex items-center justify-center px-8 py-4 border border-gray-600 text-white font-semibold rounded-xl hover:border-neon-blue hover:text-neon-blue transition-all duration-200">
                    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
                    </svg>
                    Sign In
                  </Link>
                </div>

              </div>

              {/* Right Content - Freelancer Journey Animation */}
              <div className="relative animate-slide-up">
                <div className="relative w-full max-w-lg mx-auto">
                  {/* Animation Container */}
                  <div className="freelancer-journey-container relative h-96 overflow-hidden">
                    
                    {/* Background Elements */}
                    <div className="absolute inset-0 bg-gradient-to-br from-gray-800/30 to-gray-900/30 rounded-3xl"></div>
                    
                    {/* Stressed Freelancer (Initial State) */}
                    <div className="stressed-freelancer absolute inset-0 flex items-center justify-center opacity-100 transition-all duration-2000">
                      <div className="relative">
                        {/* Messy Desk */}
                        <div className="absolute -bottom-20 left-1/2 transform -translate-x-1/2 w-48 h-16 bg-gray-700/50 rounded-lg">
                          {/* Scattered Papers */}
                          <div className="absolute -top-2 left-4 w-8 h-10 bg-white/20 rounded transform rotate-12 animate-pulse"></div>
                          <div className="absolute -top-1 left-12 w-6 h-8 bg-white/15 rounded transform -rotate-6 animate-pulse delay-300"></div>
                          <div className="absolute -top-3 right-8 w-7 h-9 bg-white/25 rounded transform rotate-45 animate-pulse delay-600"></div>
                          
                          {/* Coffee Cups */}
                          <div className="absolute -top-4 right-4 w-4 h-6 bg-yellow-600/40 rounded-b-full animate-bounce delay-1000"></div>
                          <div className="absolute -top-2 right-12 w-3 h-5 bg-yellow-700/30 rounded-b-full animate-bounce delay-1500"></div>
                        </div>
                        
                        {/* Stressed Person */}
                        <div className="relative">
                          {/* Head */}
                          <div className="w-16 h-16 bg-gradient-to-b from-orange-200 to-orange-300 rounded-full mx-auto relative">
                            {/* Stressed Expression */}
                            <div className="absolute top-4 left-3 w-2 h-2 bg-gray-800 rounded-full"></div>
                            <div className="absolute top-4 right-3 w-2 h-2 bg-gray-800 rounded-full"></div>
                            <div className="absolute top-8 left-1/2 transform -translate-x-1/2 w-4 h-2 bg-gray-800 rounded-full"></div>
                            
                            {/* Messy Hair */}
                            <div className="absolute -top-2 left-2 w-3 h-6 bg-gray-800 rounded transform rotate-12 animate-pulse"></div>
                            <div className="absolute -top-1 right-3 w-2 h-5 bg-gray-800 rounded transform -rotate-20 animate-pulse delay-200"></div>
                          </div>
                          
                          {/* Body */}
                          <div className="w-12 h-20 bg-red-600/60 rounded-lg mx-auto mt-2 relative">
                            {/* Arms (pulling hair) */}
                            <div className="absolute -left-3 top-2 w-6 h-3 bg-orange-200 rounded-full transform -rotate-45 animate-bounce"></div>
                            <div className="absolute -right-3 top-2 w-6 h-3 bg-orange-200 rounded-full transform rotate-45 animate-bounce delay-300"></div>
                          </div>
                        </div>
                        
                        {/* Stress Indicators */}
                        <div className="absolute -top-8 -left-8 text-red-400 animate-bounce">
                          <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                          </svg>
                        </div>
                        <div className="absolute -top-6 -right-6 text-yellow-400 animate-bounce delay-500">
                          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                          </svg>
                        </div>
                      </div>
                    </div>

                    {/* Transformation Arrow */}
                    <div className="transformation-arrow absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 opacity-0 animate-fade-in-delayed">
                      <div className="flex items-center space-x-2">
                        <div className="w-8 h-0.5 bg-gradient-to-r from-neon-blue to-silver"></div>
                        <svg className="w-6 h-6 text-neon-blue animate-pulse" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                        </svg>
                        <div className="w-8 h-0.5 bg-gradient-to-r from-silver to-neon-blue"></div>
                      </div>
                    </div>

                    {/* Happy Successful Freelancer (Final State) */}
                    <div className="happy-freelancer absolute inset-0 flex items-center justify-center opacity-0 transition-all duration-2000 delay-3000">
                      <div className="relative">
                        {/* Organized Desk */}
                        <div className="absolute -bottom-20 left-1/2 transform -translate-x-1/2 w-48 h-16 bg-gradient-to-r from-neon-blue/20 to-silver/20 rounded-lg border border-neon-blue/30">
                          {/* Organized Items */}
                          <div className="absolute -top-3 left-6 w-6 h-8 bg-neon-blue/40 rounded shadow-lg"></div>
                          <div className="absolute -top-3 left-14 w-6 h-8 bg-silver/40 rounded shadow-lg"></div>
                          <div className="absolute -top-3 left-22 w-6 h-8 bg-neon-blue/30 rounded shadow-lg"></div>
                          
                          {/* Success Indicators */}
                          <div className="absolute -top-4 right-6 w-8 h-8 bg-green-500/60 rounded-full flex items-center justify-center">
                            <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24">
                              <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
                            </svg>
                          </div>
                        </div>
                        
                        {/* Happy Person */}
                        <div className="relative">
                          {/* Head */}
                          <div className="w-16 h-16 bg-gradient-to-b from-orange-200 to-orange-300 rounded-full mx-auto relative">
                            {/* Happy Expression */}
                            <div className="absolute top-4 left-3 w-2 h-2 bg-gray-800 rounded-full"></div>
                            <div className="absolute top-4 right-3 w-2 h-2 bg-gray-800 rounded-full"></div>
                            <div className="absolute top-7 left-1/2 transform -translate-x-1/2 w-6 h-3 bg-gray-800 rounded-full"></div>
                            
                            {/* Neat Hair */}
                            <div className="absolute -top-1 left-1/2 transform -translate-x-1/2 w-12 h-8 bg-gray-800 rounded-t-full"></div>
                          </div>
                          
                          {/* Body */}
                          <div className="w-12 h-20 bg-gradient-to-b from-neon-blue/60 to-silver/60 rounded-lg mx-auto mt-2 relative">
                            {/* Arms (celebrating) */}
                            <div className="absolute -left-4 top-1 w-6 h-3 bg-orange-200 rounded-full transform -rotate-12 animate-bounce"></div>
                            <div className="absolute -right-4 top-1 w-6 h-3 bg-orange-200 rounded-full transform rotate-12 animate-bounce delay-200"></div>
                          </div>
                        </div>
                        
                        {/* Success Indicators */}
                        <div className="absolute -top-8 -left-8 text-neon-blue animate-bounce">
                          <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                          </svg>
                        </div>
                        <div className="absolute -top-6 -right-6 text-silver animate-bounce delay-300">
                          <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                          </svg>
                        </div>
                        <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 text-green-400 animate-bounce delay-600">
                          <svg className="w-7 h-7" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
                          </svg>
                        </div>
                      </div>
                    </div>

                    {/* Floating Success Elements */}
                    <div className="absolute top-4 right-4 w-12 h-12 bg-neon-blue/20 rounded-full blur-lg animate-pulse"></div>
                    <div className="absolute bottom-8 left-6 w-8 h-8 bg-silver/20 rounded-full blur-lg animate-pulse delay-1000"></div>
                    <div className="absolute top-1/3 left-4 w-6 h-6 bg-green-400/20 rounded-full blur-lg animate-pulse delay-2000"></div>
                  </div>

                  {/* Journey Labels */}
                  <div className="mt-8 text-center">
                    <div className="journey-label opacity-100 transition-all duration-1000">
                      <p className="text-red-400 font-semibold mb-2">Before Freelanch</p>
                      <p className="text-gray-400 text-sm">Stressed • Disorganized • Overwhelmed</p>
                    </div>
                    <div className="journey-label-after opacity-0 transition-all duration-1000 delay-3000 absolute inset-x-0">
                      <p className="text-neon-blue font-semibold mb-2">After Freelanch</p>
                      <p className="text-gray-300 text-sm">Organized • Successful • Peace of Mind</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="relative z-10 py-32 px-6">
        <div className="max-w-7xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-20">
            <div className="inline-flex items-center px-4 py-2 bg-gray-800/50 rounded-full border border-gray-700 mb-6">
              <span className="text-sm text-neon-blue font-semibold">POWERFUL FEATURES</span>
            </div>
            <h2 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
              <span className="text-white">Everything You Need to</span>
              <br />
              <span className="bg-gradient-to-r from-neon-blue to-silver bg-clip-text text-transparent">
                Scale Your Business
              </span>
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
              Powerful features designed specifically for freelancers who want to focus on their craft, not paperwork
            </p>
          </div>

          {/* Features Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
            {features.map((feature, index) => (
              <div 
                key={index} 
                className="group relative"
              >
                <div className="glass-card p-8 h-full hover:border-neon-blue/30 transition-all duration-500 transform hover:-translate-y-4 hover:shadow-2xl hover:shadow-neon-blue/10">
                  {/* Icon with animated background */}
                  <div className="relative mb-6">
                    <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${feature.color === 'neon-blue' ? 'from-neon-blue/20 to-neon-blue/5' : 'from-silver/20 to-silver/5'} flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
                      <div className={`${feature.color === 'neon-blue' ? 'text-neon-blue' : 'text-silver'} group-hover:scale-110 transition-transform duration-200`}>
                        {feature.icon}
                      </div>
                    </div>
                    <div className={`absolute -inset-2 rounded-2xl bg-gradient-to-r ${feature.color === 'neon-blue' ? 'from-neon-blue' : 'from-silver'} opacity-0 group-hover:opacity-20 blur-xl transition-opacity duration-300`}></div>
                  </div>
                  
                  <h3 className={`text-xl font-bold mb-4 text-white group-hover:${feature.color === 'neon-blue' ? 'text-neon-blue' : 'text-silver'} transition-colors duration-300`}>
                    {feature.title}
                  </h3>
                  <p className="text-gray-400 leading-relaxed group-hover:text-gray-300 transition-colors duration-300">
                    {feature.description}
                  </p>

                  {/* Hover arrow */}
                  <div className="absolute bottom-6 right-6 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <svg className={`w-5 h-5 ${feature.color === 'neon-blue' ? 'text-neon-blue' : 'text-silver'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </div>
                </div>
              </div>
            ))}
          </div>

        </div>
      </div>

      {/* Testimonials Section */}
      <div className="relative z-10 py-20 px-6 bg-gray-800/30">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <div className="inline-flex items-center px-4 py-2 bg-gray-800/50 rounded-full border border-gray-700 mb-6">
              <span className="text-sm text-silver font-semibold">TESTIMONIALS</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-silver to-neon-blue bg-clip-text text-transparent">
              Loved by Freelancers Worldwide
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="glass-card p-8 hover:border-silver/30 transition-all duration-300 transform hover:-translate-y-2">
                <div className="flex items-center mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <svg key={i} className="w-5 h-5 text-neon-blue" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                    </svg>
                  ))}
                </div>
                <p className="text-gray-300 mb-6 leading-relaxed italic">
                  "{testimonial.content}"
                </p>
                <div className="flex items-center">
                  <div className="w-12 h-12 bg-gradient-to-br from-neon-blue to-silver rounded-full flex items-center justify-center text-black font-bold mr-4">
                    {testimonial.avatar}
                  </div>
                  <div>
                    <div className="font-semibold text-white">{testimonial.name}</div>
                    <div className="text-gray-400 text-sm">{testimonial.role}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Animated Auth Section */}
      <div id="auth" className="relative z-10 py-32 px-6">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
              <span className="text-white">Ready to</span>
              <br />
              <span className="bg-gradient-to-r from-neon-blue via-silver to-neon-blue bg-clip-text text-transparent">
                Get Started?
              </span>
            </h2>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto leading-relaxed">
              Join thousands of successful freelancers managing their business with Freelanch
            </p>
          </div>

          {/* Animated Login/Signup Container */}
          <div className="relative max-w-md mx-auto">
            <div className="auth-container glass-card p-8 rounded-2xl overflow-hidden">
              {/* Background Animation */}
              <div className="absolute inset-0 bg-gradient-to-br from-neon-blue/5 via-transparent to-silver/5"></div>
              <div className="absolute -top-10 -right-10 w-20 h-20 bg-neon-blue/20 rounded-full blur-xl animate-pulse"></div>
              <div className="absolute -bottom-10 -left-10 w-16 h-16 bg-silver/20 rounded-full blur-xl animate-pulse delay-1000"></div>
              
              <div className="relative z-10">
                {/* Toggle Buttons */}
                <div className="flex bg-gray-800/50 rounded-xl p-1 mb-8">
                  <button 
                    className="auth-tab active flex-1 py-3 px-4 rounded-lg font-semibold transition-all duration-300"
                    data-tab="login"
                  >
                    Sign In
                  </button>
                  <button 
                    className="auth-tab flex-1 py-3 px-4 rounded-lg font-semibold transition-all duration-300"
                    data-tab="signup"
                  >
                    Sign Up
                  </button>
                </div>

                {/* Login Form */}
                <div className="auth-form active" id="login-form">
                  <div className="space-y-6">
                    <div className="relative">
                      <input 
                        type="email" 
                        placeholder="Email Address"
                        className="w-full bg-gray-800/50 border border-gray-700 rounded-xl px-4 py-4 text-white placeholder-gray-400 focus:outline-none focus:border-neon-blue focus:ring-2 focus:ring-neon-blue/20 transition-all duration-200"
                      />
                      <div className="absolute inset-y-0 right-0 flex items-center pr-4">
                        <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207" />
                        </svg>
                      </div>
                    </div>
                    
                    <div className="relative">
                      <input 
                        type="password" 
                        placeholder="Password"
                        className="w-full bg-gray-800/50 border border-gray-700 rounded-xl px-4 py-4 text-white placeholder-gray-400 focus:outline-none focus:border-neon-blue focus:ring-2 focus:ring-neon-blue/20 transition-all duration-200"
                      />
                      <div className="absolute inset-y-0 right-0 flex items-center pr-4">
                        <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                        </svg>
                      </div>
                    </div>

                    <Link href="/dashboard" className="w-full bg-gradient-to-r from-neon-blue to-neon-blue/80 text-black font-semibold py-4 px-6 rounded-xl hover:from-neon-blue/90 hover:to-neon-blue/70 transition-all duration-200 transform hover:scale-105 shadow-lg hover:shadow-neon-blue/25 block text-center">
                      Sign In
          </Link>

                    <div className="text-center">
                      <a href="#" className="text-gray-400 hover:text-neon-blue transition-colors duration-200 text-sm">
                        Forgot your password?
                      </a>
                    </div>
                  </div>
                </div>

                {/* Signup Form */}
                <div className="auth-form" id="signup-form">
                  <div className="space-y-6">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="relative">
                        <input 
                          type="text" 
                          placeholder="First Name"
                          className="w-full bg-gray-800/50 border border-gray-700 rounded-xl px-4 py-4 text-white placeholder-gray-400 focus:outline-none focus:border-silver focus:ring-2 focus:ring-silver/20 transition-all duration-200"
                        />
                      </div>
                      <div className="relative">
                        <input 
                          type="text" 
                          placeholder="Last Name"
                          className="w-full bg-gray-800/50 border border-gray-700 rounded-xl px-4 py-4 text-white placeholder-gray-400 focus:outline-none focus:border-silver focus:ring-2 focus:ring-silver/20 transition-all duration-200"
                        />
                      </div>
                    </div>
                    
                    <div className="relative">
                      <input 
                        type="email" 
                        placeholder="Email Address"
                        className="w-full bg-gray-800/50 border border-gray-700 rounded-xl px-4 py-4 text-white placeholder-gray-400 focus:outline-none focus:border-silver focus:ring-2 focus:ring-silver/20 transition-all duration-200"
                      />
                      <div className="absolute inset-y-0 right-0 flex items-center pr-4">
                        <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207" />
                        </svg>
                      </div>
                    </div>
                    
                    <div className="relative">
                      <input 
                        type="password" 
                        placeholder="Create Password"
                        className="w-full bg-gray-800/50 border border-gray-700 rounded-xl px-4 py-4 text-white placeholder-gray-400 focus:outline-none focus:border-silver focus:ring-2 focus:ring-silver/20 transition-all duration-200"
                      />
                      <div className="absolute inset-y-0 right-0 flex items-center pr-4">
                        <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                        </svg>
                      </div>
                    </div>

                    <Link href="/dashboard" className="w-full bg-gradient-to-r from-silver to-silver/80 text-black font-semibold py-4 px-6 rounded-xl hover:from-silver/90 hover:to-silver/70 transition-all duration-200 transform hover:scale-105 shadow-lg hover:shadow-silver/25 block text-center">
                      Create Account
          </Link>

                    <div className="text-center">
                      <p className="text-gray-400 text-sm">
                        By signing up, you agree to our 
                        <a href="#" className="text-silver hover:text-white transition-colors duration-200"> Terms of Service</a>
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="relative z-10 py-8 px-6 border-t border-gray-800">
        <div className="max-w-7xl mx-auto text-center">
          <div className="text-2xl font-bold mb-4 bg-gradient-to-r from-neon-blue to-silver bg-clip-text text-transparent">
            Freelanch
          </div>
          <p className="text-gray-400">
            © 2024 Freelanch. Empowering freelancers worldwide.
          </p>
        </div>
      </footer>
    </div>
  );
}

