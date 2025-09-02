import React from 'react';
import { assets } from '../assets/assets.js';

const Service = () => {
  return (
    <section className="w-full min-h-[80vh] py-10 px-2 sm:px-6 flex flex-col items-center">
      {/* Title */}
      <div className="mb-8">
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-[#D9C27B] tracking-widest text-center drop-shadow-lg">
          OUR SERVICES
        </h1>
        <div className="mx-auto mt-2 w-24 h-1 bg-[#D9C27B] rounded-full shadow" />
      </div>

      {/* Service Cards */}
      <div className="flex flex-col md:flex-row gap-10 lg:gap-60 w-full max-w-5xl justify-center items-center">
        {/* Men Service */}
        <div className="bg-black/80 rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-300 flex flex-col items-center p-6 w-full max-w-xs group border border-[#D9C27B]/30">
          <div className="overflow-hidden rounded-2xl mb-4 w-full">
            <img
              className="h-64 w-full object-cover group-hover:scale-105 transition-transform duration-300"
              src={assets.men}
              alt="Men"
            />
          </div>
          <h2 className="text-2xl font-bold text-[#D9C27B] mb-2">Men</h2>
          <p className="text-gray-200 text-center mb-4">
            Modern cuts, beard styling, grooming, and more for the contemporary man.
          </p>
          <a href="/gents"><button className="bg-[#D9C27B] text-black font-semibold px-6 py-2 rounded-full shadow hover:bg-[#bfa14a] transition">
            Explore
          </button></a>
        </div>

        {/* Women Service */}
        <div className="bg-black/80 rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-300 flex flex-col items-center p-6 w-full max-w-xs group border border-[#D9C27B]/30">
          <div className="overflow-hidden rounded-2xl mb-4 w-full">
            <img
              className="h-64 w-full object-cover group-hover:scale-105 transition-transform duration-300"
              src={assets.women}
              alt="Women"
            />
          </div>
          <h2 className="text-2xl font-bold text-[#D9C27B] mb-2">Women</h2>
          <p className="text-gray-200 text-center mb-4">
            Hair styling, spa, beauty treatments, and pampering for every woman.
          </p>
          <a href="ladies"><button className="bg-[#D9C27B] text-black font-semibold px-6 py-2 rounded-full shadow hover:bg-[#bfa14a] transition">
            Explore
          </button></a>
        </div>
      </div>
    </section>
  );
};

export default Service;