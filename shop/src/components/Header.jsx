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
            <div className="absolute inset-0 flex items-center justify-start px-6 sm:px-12 lg:px-20">
              <div className="max-w-2xl text-white z-10">
                {/* Animated Title */}
                <h1 
                  className={`text-4xl sm:text-5xl lg:text-6xl font-bold mb-4 transition-all duration-1000 ${
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
                  className={`text-xl sm:text-2xl lg:text-3xl font-semibold mb-6 transition-all duration-1000 delay-200 ${
                    currentSlide === index ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                  }`}
                >
                  {slide.subtitle}
                </h2>

                {/* Animated Description */}
                <p 
                  className={`text-base sm:text-lg lg:text-xl text-gray-300 mb-8 leading-relaxed transition-all duration-1000 delay-400 ${
                    currentSlide === index ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                  }`}
                >
                  {slide.description}
                </p>

                {/* Animated CTA Buttons */}
                <div 
                  className={`flex flex-col sm:flex-row gap-4 transition-all duration-1000 delay-600 ${
                    currentSlide === index ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                  }`}
                >
                  <button 
                    className="px-8 py-4 bg-gradient-to-r from-[#D9C27B] to-[#F4E4A6] text-black font-bold rounded-full hover:shadow-2xl hover:scale-105 transition-all duration-300 text-lg"
                  >
                    Shop Now
                  </button>
                  <button 
                    className="px-8 py-4 border-2 border-[#D9C27B] text-[#D9C27B] font-bold rounded-full hover:bg-[#D9C27B] hover:text-black transition-all duration-300 text-lg"
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
        className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-3 rounded-full transition-all duration-300 hover:scale-110 z-20"
      >
        <FaChevronLeft className="text-xl" />
      </button>
      
      <button 
        onClick={nextSlide}
        className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-3 rounded-full transition-all duration-300 hover:scale-110 z-20"
      >
        <FaChevronRight className="text-xl" />
      </button>

      {/* Dot Indicators */}
      <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex space-x-3 z-20">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              currentSlide === index 
                ? 'bg-[#D9C27B] scale-125' 
                : 'bg-white/50 hover:bg-white/70'
            }`}
          />
        ))}
      </div>

      {/* Auto-play Control */}
      <button 
        onClick={toggleAutoPlay}
        className="absolute top-6 right-6 bg-black/50 hover:bg-black/70 text-white p-3 rounded-full transition-all duration-300 hover:scale-110 z-20"
      >
        {isAutoPlaying ? <FaPause className="text-lg" /> : <FaPlay className="text-lg" />}
      </button>

      {/* Progress Bar */}
      <div className="absolute bottom-0 left-0 w-full h-1 bg-black/30 z-20">
        <div 
          className="h-full bg-gradient-to-r from-[#D9C27B] to-[#F4E4A6] transition-all duration-300"
          style={{ width: `${((currentSlide + 1) / slides.length) * 100}%` }}
        />
      </div>

      {/* Slide Counter */}
      <div className="absolute top-6 left-6 bg-black/50 text-white px-4 py-2 rounded-full font-semibold z-20">
        <span style={{ color: gold }}>{currentSlide + 1}</span> / {slides.length}
      </div>
    </div>
  );
};

export default Header;
