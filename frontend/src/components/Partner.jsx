import React from 'react';
import { assets } from '../assets/assets.js';

const logos = [
  assets.logo1,
  assets.logo2,
  assets.logo4,
  assets.logo6,
  assets.logo7,
  assets.logo8,
  assets.logo9,
  assets.logo11,
];

const Partner = () => {
  return (
    <section className="w-full min-h-[80vh] bg-gradient-to-br from-black via-[#23211b] to-[#181818] py-20 px-4 sm:px-6 lg:px-8 flex flex-col items-center justify-center">
      {/* Heading Section */}
      <div className="mb-20 text-center">
        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold text-[#D9C27B] tracking-widest mb-6 drop-shadow-lg">
          OUR PARTNER BRANDS
        </h1>
        <div className="mx-auto w-32 h-1 bg-gradient-to-r from-transparent via-[#D9C27B] to-transparent rounded-full shadow-lg mb-6" />
        <p className="text-gray-300 text-lg sm:text-xl max-w-3xl mx-auto leading-relaxed">
          Trusted partnerships with industry leaders and premium brands worldwide
        </p>
      </div>

      {/* Logos Grid */}
      <div className="w-full max-w-8xl">
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4 xl:grid-cols-4 gap-8 sm:gap-10 lg:gap-12 xl:gap-16 items-center justify-items-center">
          {logos.map((logo, idx) => (
            <div
              key={idx}
              className="group relative bg-gradient-to-br from-black/95 via-[#1a1a1a] to-black/90 rounded-3xl flex items-center justify-center shadow-2xl hover:shadow-[#D9C27B]/30 transition-all duration-500 border border-[#D9C27B]/20 hover:border-[#D9C27B]/70 backdrop-blur-sm overflow-hidden w-full aspect-[4/3] max-w-[200px] sm:max-w-[220px] md:max-w-[240px] lg:max-w-[280px] xl:max-w-[300px] hover:scale-105 hover:-translate-y-3 cursor-pointer"
            >
              {/* Animated background glow */}
              <div className="absolute inset-0 bg-gradient-to-br from-[#D9C27B]/10 via-transparent to-[#D9C27B]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              
              {/* Corner decorative elements */}
              <div className="absolute top-0 right-0 w-12 h-12 bg-gradient-to-bl from-[#D9C27B]/40 to-transparent rounded-bl-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <div className="absolute bottom-0 left-0 w-8 h-8 bg-gradient-to-tr from-[#D9C27B]/30 to-transparent rounded-tr-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              
              {/* Logo container with padding */}
              <div className="relative z-10 w-full h-full p-6 flex items-center justify-center">
                <img
                  src={logo}
                  alt={`Partner Logo ${idx + 1}`}
                  className="w-full h-full object-contain grayscale group-hover:grayscale-0 transition-all duration-500 group-hover:scale-110 filter brightness-90 group-hover:brightness-110"
                />
              </div>
              
              {/* Hover overlay with subtle gradient */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#D9C27B]/15 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              
              {/* Subtle inner glow effect */}
              <div className="absolute inset-2 rounded-2xl border border-[#D9C27B]/0 group-hover:border-[#D9C27B]/20 transition-all duration-300" />
            </div>
          ))}
        </div>
      </div>

      {/* Bottom decorative section */}
      <div className="mt-20 flex flex-col items-center space-y-6">
        {/* Decorative line with elements */}
        <div className="flex items-center justify-center space-x-3">
          <div className="w-3 h-3 bg-[#D9C27B] rounded-full animate-pulse" />
          <div className="w-20 h-0.5 bg-gradient-to-r from-[#D9C27B]/60 to-transparent" />
          <div className="w-4 h-4 border-2 border-[#D9C27B] rounded-full animate-spin-slow" />
          <div className="w-20 h-0.5 bg-gradient-to-l from-[#D9C27B]/60 to-transparent" />
          <div className="w-3 h-3 bg-[#D9C27B] rounded-full animate-pulse" style={{ animationDelay: '0.5s' }} />
        </div>
        
        {/* Additional text */}
        <p className="text-[#D9C27B]/70 text-sm tracking-wider font-medium">
          BUILDING EXCELLENCE TOGETHER
        </p>
      </div>
    </section>
  );
};

export default Partner;