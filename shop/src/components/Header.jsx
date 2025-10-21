import React, { useState, useEffect } from 'react';
import { FaChevronLeft, FaChevronRight, FaPlay, FaPause } from 'react-icons/fa';
import { assets } from "../assets/assets.js";

const Header = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [isHovered, setIsHovered] = useState(false);

  const gold = '#D9C27B';

  const slides = [
    {
      image: assets.a1,
      title: "Premium Hair Care Collection",
      subtitle: "Transform Your Hair with Professional Products",
      description: "Discover our exclusive range of salon-quality hair care products designed to nourish, protect, and style your hair to perfection."
    },
    {
      image: assets.a2,
      title: "Luxury Skin Care Essentials",
      subtitle: "Radiant Skin Starts Here",
      description: "Indulge in our premium skincare collection featuring the finest ingredients for healthy, glowing skin that radiates confidence."
    },
    {
      image: assets.a3,
      title: "Professional Beauty Tools",
      subtitle: "Salon-Quality Results at Home",
      description: "Elevate your beauty routine with our professional-grade tools and accessories trusted by stylists worldwide."
    },
    {
      image: assets.a4,
      title: "Men's Grooming Excellence",
      subtitle: "Refined Style for the Modern Man",
      description: "Complete your grooming routine with our sophisticated collection of men's care products and styling essentials."
    }
  ];

  // Auto-play functionality
  useEffect(() => {
    if (isAutoPlaying && !isHovered) {
      const interval = setInterval(() => {
        setCurrentSlide((prev) => (prev + 1) % slides.length);
      }, 5000);
      return () => clearInterval(interval);
    }
  }, [isAutoPlaying, isHovered, slides.length]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const goToSlide = (index) => {
    setCurrentSlide(index);
  };

  const toggleAutoPlay = () => {
    setIsAutoPlaying(!isAutoPlaying);
  };

  return (
    <div className="relative w-full h-[60vh] md:h-[70vh] lg:h-[90vh] overflow-hidden bg-black">
      {/* Main Slider Container */}
      <div 
        className="flex transition-transform duration-700 ease-in-out h-full"
        style={{ transform: `translateX(-${currentSlide * 100}%)` }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {slides.map((slide, index) => (
          <div key={index} className="min-w-full h-full relative">
            {/* Background Image */}
            <div className="absolute inset-0">
              <img 
                src={slide.image} 
                alt={slide.title}
                className="w-full h-full object-cover"
              />
              {/* Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/40 to-transparent"></div>
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/30"></div>
            </div>

            {/* Content Overlay */}
            <div className="absolute inset-0 flex items-center justify-start px-4 sm:px-6 md:px-12 lg:px-20">
              <div className="max-w-xs sm:max-w-lg md:max-w-xl lg:max-w-2xl text-white z-10">
                {/* Animated Title */}
                <h1 
                  className={`text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold mb-3 sm:mb-4 transition-all duration-1000 leading-tight ${
                    currentSlide === index ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                  }`}
                  style={{ 
                    background: `linear-gradient(135deg, ${gold}, #F4E4A6)`,
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text'
                  }}
                >
                  {slide.title}
                </h1>

                {/* Animated Subtitle */}
                <h2 
                  className={`text-base sm:text-lg md:text-xl lg:text-2xl xl:text-3xl font-semibold mb-4 sm:mb-6 transition-all duration-1000 delay-200 leading-tight ${
                    currentSlide === index ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                  }`}
                >
                  {slide.subtitle}
                </h2>

                {/* Animated Description */}
                <p 
                  className={`text-sm sm:text-base md:text-lg lg:text-xl text-gray-300 mb-6 sm:mb-8 leading-relaxed transition-all duration-1000 delay-400 line-clamp-3 sm:line-clamp-none ${
                    currentSlide === index ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                  }`}
                >
                  {slide.description}
                </p>

                {/* Animated CTA Buttons */}
                <div 
                  className={`flex flex-col sm:flex-row gap-3 sm:gap-4 transition-all duration-1000 delay-600 ${
                    currentSlide === index ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                  }`}
                >
                  <button 
                    className="px-6 sm:px-8 py-3 sm:py-4 bg-gradient-to-r from-[#D9C27B] to-[#F4E4A6] text-black font-bold rounded-full hover:shadow-2xl hover:scale-105 transition-all duration-300 text-sm sm:text-base lg:text-lg min-h-[48px]"
                  >
                    Shop Now
                  </button>
                  <button 
                    className="px-6 sm:px-8 py-3 sm:py-4 border-2 border-[#D9C27B] text-[#D9C27B] font-bold rounded-full hover:bg-[#D9C27B] hover:text-black transition-all duration-300 text-sm sm:text-base lg:text-lg min-h-[48px]"
                  >
                    Learn More
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Navigation Arrows */}
      <button 
        onClick={prevSlide}
        className="absolute left-2 sm:left-4 top-1/2 transform -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-2 sm:p-3 rounded-full transition-all duration-300 hover:scale-110 z-20 min-h-[44px] min-w-[44px] flex items-center justify-center"
      >
        <FaChevronLeft className="text-lg sm:text-xl" />
      </button>
      
      <button 
        onClick={nextSlide}
        className="absolute right-2 sm:right-4 top-1/2 transform -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-2 sm:p-3 rounded-full transition-all duration-300 hover:scale-110 z-20 min-h-[44px] min-w-[44px] flex items-center justify-center"
      >
        <FaChevronRight className="text-lg sm:text-xl" />
      </button>

      {/* Dot Indicators */}
      <div className="absolute bottom-4 sm:bottom-6 left-1/2 transform -translate-x-1/2 flex space-x-2 sm:space-x-3 z-20">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full transition-all duration-300 min-h-[44px] min-w-[44px] flex items-center justify-center ${
              currentSlide === index 
                ? 'bg-[#D9C27B] scale-125' 
                : 'bg-white/50 hover:bg-white/70'
            }`}
          >
            <span className={`w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full ${
              currentSlide === index 
                ? 'bg-[#D9C27B]' 
                : 'bg-white/50'
            }`}></span>
          </button>
        ))}
      </div>

      {/* Auto-play Control */}
      <button 
        onClick={toggleAutoPlay}
        className="absolute top-4 sm:top-6 right-4 sm:right-6 bg-black/50 hover:bg-black/70 text-white p-2 sm:p-3 rounded-full transition-all duration-300 hover:scale-110 z-20 min-h-[44px] min-w-[44px] flex items-center justify-center"
      >
        {isAutoPlaying ? <FaPause className="text-sm sm:text-lg" /> : <FaPlay className="text-sm sm:text-lg" />}
      </button>

      {/* Progress Bar */}
      <div className="absolute bottom-0 left-0 w-full h-1 bg-black/30 z-20">
        <div 
          className="h-full bg-gradient-to-r from-[#D9C27B] to-[#F4E4A6] transition-all duration-300"
          style={{ width: `${((currentSlide + 1) / slides.length) * 100}%` }}
        />
      </div>

      {/* Slide Counter */}
      <div className="absolute top-4 sm:top-6 left-4 sm:left-6 bg-black/50 text-white px-3 sm:px-4 py-2 rounded-full font-semibold z-20 text-sm sm:text-base">
        <span style={{ color: gold }}>{currentSlide + 1}</span> / {slides.length}
      </div>
    </div>
  );
};

export default Header;
