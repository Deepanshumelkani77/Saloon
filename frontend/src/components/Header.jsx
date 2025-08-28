import React, { useState, useEffect, useRef } from "react";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import { assets } from "../assets/assets.js";

const images = [
  assets.imgd,
  assets.imgb,
  assets.imgc,
  assets.imga,
  assets.img5,
];

// Create extended array with cloned first and last images for seamless infinite loop
const extendedImages = [images[images.length - 1], ...images, images[0]];

const Header = () => {
  const [current, setCurrent] = useState(1); // Start at first real image
  const [isTransitioning, setIsTransitioning] = useState(true);
  const sliderRef = useRef(null);

  // Auto slide every 3 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      nextSlide();
    }, 3000);
    return () => clearInterval(timer);
  }, []);

  // Handle seamless infinite loop
  useEffect(() => {
    const handleTransitionEnd = () => {
      if (current === 0) {
        // At cloned last image, jump to real last image
        setIsTransitioning(false);
        setCurrent(images.length);
      } else if (current === images.length + 1) {
        // At cloned first image, jump to real first image
        setIsTransitioning(false);
        setCurrent(1);
      }
    };

    const slider = sliderRef.current;
    if (slider) {
      slider.addEventListener('transitionend', handleTransitionEnd);
      return () => slider.removeEventListener('transitionend', handleTransitionEnd);
    }
  }, [current]);

  // Re-enable transition after jumping
  useEffect(() => {
    if (!isTransitioning) {
      const timer = setTimeout(() => setIsTransitioning(true), 50);
      return () => clearTimeout(timer);
    }
  }, [isTransitioning]);

  const nextSlide = () => {
    setCurrent(prev => prev + 1);
  };

  const prevSlide = () => {
    setCurrent(prev => prev - 1);
  };

  const goToSlide = (index) => {
    setCurrent(index + 1); // +1 because of cloned first image
  };

  return (
    <section
      className="
        relative w-full mx-auto overflow-hidden shadow-lg bg-black
        flex items-center
        h-[35vh] sm:h-[70vh] md:h-[calc(100vh-80px)]"
      style={{ minHeight: "250px" }}
    >
      {/* Images */}
      <div
        ref={sliderRef}
        className="flex w-full h-full transition-transform duration-700 ease-in-out"
        style={{
          transform: `translateX(-${current * 100}%)`,
          transitionProperty: isTransitioning ? 'transform' : 'none',
        }}
      >
        {extendedImages.map((img, index) => (
          <img
            key={index}
            src={img}
            alt={`Slide ${index + 1}`}
            className="w-full h-full object-cover object-center flex-shrink-0"
            draggable={false}
          />
        ))}
      </div>

      {/* Overlay gradient for better text/visuals */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent pointer-events-none" />

      {/* Prev Button */}
      <button
        onClick={prevSlide}
        className="absolute top-1/2 left-5 transform -translate-y-1/2 bg-[#D9C27B] text-black p-3 rounded-full shadow-lg opacity-80 hover:scale-110 hover:bg-[#bfa14a] transition-all duration-200"
        aria-label="Previous Slide"
      >
        <FaArrowLeft />
      </button>

      {/* Next Button */}
      <button
        onClick={nextSlide}
        className="absolute top-1/2 right-5 transform -translate-y-1/2 bg-[#D9C27B] text-black p-3 rounded-full shadow-lg opacity-80 hover:scale-110 hover:bg-[#bfa14a] transition-all duration-200"
        aria-label="Next Slide"
      >
        <FaArrowRight />
      </button>

      {/* Dots */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2 z-10">
        {images.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`w-4 h-4 rounded-full border-2 border-[#D9C27B] transition-all duration-200 ${
              current === index + 1
                ? "bg-[#D9C27B] scale-125 shadow-lg"
                : "bg-white/70 hover:bg-[#D9C27B]/80"
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </section>
  );
};

export default Header