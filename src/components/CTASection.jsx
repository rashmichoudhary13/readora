import React from 'react';
import { Book, Heart, Sparkles } from 'lucide-react';

const CTASection = () => {
  return (
    <>
      {/* Top Curve Separator */}
      <div className="relative -mb-1 overflow-hidden leading-[0] rotate-180">
        <svg className="relative block w-full h-20" viewBox="0 0 1440 320" preserveAspectRatio="none">
          <path
            fill="#f0f4ff"
            d="M0,160 C480,280 960,0 1440,160 L1440,0 L0,0 Z"
            fillOpacity="1"
          ></path>
        </svg>
      </div>

      <section className="relative py-24 bg-gradient-to-br from-[#f0f4ff] via-[#e5e0ff] to-[#ffe9f3] overflow-hidden">
        {/* Background glowing blobs */}
        <div className="absolute -top-20 -left-20 w-[400px] h-[400px] bg-pink-300 opacity-30 rounded-full blur-3xl animate-blob"></div>
        <div
          className="absolute top-40 right-10 w-[300px] h-[300px] bg-violet-300 opacity-30 rounded-full blur-2xl animate-blob"
          style={{ animationDelay: '2s' }}
        ></div>
        <div className="absolute bottom-0 left-1/3 w-[500px] h-[500px] bg-purple-100 opacity-20 rounded-full blur-3xl animate-pulse"></div>

        {/* Floating Icons */}
        <div className="absolute top-10 left-10 animate-float-slow opacity-30">
          <Book className="h-16 w-16 text-purple-500" />
        </div>
        <div
          className="absolute bottom-12 right-12 animate-float-slow opacity-30"
          style={{ animationDelay: '1s' }}
        >
          <Heart className="h-14 w-14 text-pink-400" />
        </div>
        <div className="absolute top-1/3 left-1/4 animate-pulse">
          <Sparkles className="h-10 w-10 text-purple-300" />
        </div>

        <div className="relative z-10 container mx-auto px-6 text-center">
          {/* Badge */}
          <div className="inline-flex items-center bg-white/20 backdrop-blur-sm border border-white/30 rounded-full px-5 py-2 mb-8 shadow-md">
            <Sparkles className="h-5 w-5 text-purple-700 mr-2" />
            <span className="text-purple-900 font-medium text-sm">Join 25,000+ Happy Readers</span>
          </div>

          {/* Heading */}
          <h2 className="text-4xl md:text-6xl font-extrabold text-gray-900 mb-6 leading-tight tracking-tight">
            Start Your Reading <br />
            <span className="bg-gradient-to-r from-pink-500 to-violet-600 bg-clip-text text-transparent">
              Journey Today
            </span>
          </h2>

          {/* Description */}
          <p className="text-lg md:text-xl text-gray-700 mb-12 max-w-2xl mx-auto leading-relaxed">
            Discover your next favorite book, connect with fellow readers, and unlock a world of
            endless stories. Your literary adventure begins now.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <button className="relative group overflow-hidden px-8 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white font-semibold rounded-full shadow-lg hover:scale-105 transition transform duration-300">
              <span className="relative z-10">Start Reading Now</span>
              <span className="absolute inset-0 bg-gradient-to-r from-white/30 via-white/70 to-white/30 opacity-0 group-hover:opacity-100 animate-shine bg-[length:200%_100%]"></span>
            </button>

            <button className="px-8 py-3 bg-white/70 text-purple-700 font-medium rounded-full backdrop-blur-md border border-purple-200 hover:bg-white hover:scale-105 transition transform duration-300">
              Try Premium Free
            </button>
          </div>

          {/* Trust indicators */}
          <div className="flex flex-wrap justify-center gap-6 mt-16 text-gray-600 text-sm">
            <div className="flex items-center">
              <span className="mr-2 text-green-600">✓</span>
              <span>No credit card required</span>
            </div>
            <div className="flex items-center">
              <span className="mr-2 text-green-600">✓</span>
              <span>Cancel anytime</span>
            </div>
            <div className="flex items-center">
              <span className="mr-2 text-green-600">✓</span>
              <span>30-day money back guarantee</span>
            </div>
          </div>
        </div>
      </section>

      {/* Bottom Curve Separator */}
      <div className="relative -mt-1 overflow-hidden leading-[0]">
        <svg className="relative block w-full h-20" viewBox="0 0 1440 320" preserveAspectRatio="none">
          <path
            fill="#ffffff"
            d="M0,64 C480,160 960,0 1440,96 L1440,320 L0,320 Z"
            fillOpacity="1"
          ></path>
        </svg>
      </div>
    </>
  );
};

export default CTASection;
