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
    <section className="w-full bg-gradient-to-br from-black via-[#23211b] to-[#181818] py-16 px-2 sm:px-6 flex flex-col items-center">
      {/* Heading */}
      <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-[#D9C27B] tracking-widest text-center mb-12 drop-shadow-lg">
        OUR PARTNER BRANDS
      </h1>

      {/* Logos Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4 xl:grid-cols-5 gap-6 sm:gap-8 lg:gap-10 w-full max-w-7xl items-center justify-items-center">
        {logos.map((logo, idx) => (
          <div
            key={idx}
            className="bg-black/80 rounded-2xl flex items-center justify-center shadow-xl hover:shadow-2xl transition-all duration-300 border border-[#D9C27B]/30 group w-full aspect-[3/2] max-w-[180px] sm:max-w-[200px] lg:max-w-[240px] xl:max-w-[220px]"
          >
            <img
              src={logo}
              alt={`Partner Logo ${idx + 1}`}
              className="object-contain w-[75%] h-[65%] sm:w-[80%] sm:h-[70%] lg:w-[85%] lg:h-[75%] grayscale group-hover:grayscale-0 transition duration-300"
            />
          </div>
        ))}
      </div>
    </section>
  );
};

export default Partner;