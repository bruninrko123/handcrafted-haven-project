import React from 'react';
import Link from 'next/link';
import { ArrowRight, Sparkles } from 'lucide-react';

const HeroSection = () => {
  return (
    <section className="relative bg-gradient-to-br from-amber-50 to-orange-50 py-20 md:py-32 overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-10 left-10 w-24 h-24 bg-amber-200 rounded-full opacity-20"></div>
      <div className="absolute bottom-20 right-20 w-32 h-32 bg-orange-200 rounded-full opacity-20"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-3xl mx-auto text-center">
          
          {/* Tag with icon */}
          <div className="inline-flex items-center space-x-2 bg-white/80 backdrop-blur-sm px-4 py-2 rounded-full mb-6">
            <Sparkles size={16} className="text-amber-500" />
            <span className="text-amber-700 font-medium">Where Creativity Meets Community</span>
          </div>

          {/* Main Heading */}
          <h1 className="text-5xl md:text-7xl font-serif font-bold text-gray-900 mb-6 leading-tight">
            Discover Unique <span className="text-amber-600">Handcrafted</span> Treasures
          </h1>

          {/* Tagline */}
          <p className="text-xl text-gray-600 mb-10 max-w-2xl mx-auto">
            Handcrafted Haven connects passionate artisans with discerning buyers who appreciate the beauty, 
            quality, and story behind every handmade creation. Join our thriving community of makers and collectors.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link 
              href="/marketplace" 
              className="group bg-amber-500 hover:bg-amber-600 text-white font-semibold px-8 py-4 rounded-full flex items-center space-x-2 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
            >
              <span>Explore Marketplace</span>
              <ArrowRight className="group-hover:translate-x-1 transition-transform" />
            </Link>
            
            <Link 
              href="/join-artisan" 
              className="bg-white/80 hover:bg-white text-gray-800 font-semibold px-8 py-4 rounded-full border-2 border-amber-200 transition-all duration-300 hover:border-amber-300"
            >
              Become an Artisan
            </Link>
          </div>

          {/* Stats */}
          <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-3xl font-bold text-amber-600">500+</div>
              <div className="text-gray-600">Artisans</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-amber-600">10K+</div>
              <div className="text-gray-600">Unique Items</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-amber-600">50K+</div>
              <div className="text-gray-600">Happy Customers</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-amber-600">4.9★</div>
              <div className="text-gray-600">Average Rating</div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom wave divider */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
          <path fill="#ffffff" fillOpacity="1" d="M0,224L48,213.3C96,203,192,181,288,181.3C384,181,480,203,576,192C672,181,768,139,864,138.7C960,139,1056,181,1152,186.7C1248,192,1344,160,1392,144L1440,128L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"></path>
        </svg>
      </div>
    </section>
  );
};

export default HeroSection;