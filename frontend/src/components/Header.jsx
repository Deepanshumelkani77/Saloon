import React, { useState, useEffect } from "react";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import { assets } from "../assets/assets.js";

const images = [
  assets.imgd,
  assets.imgb,
  assets.imgc,
  assets.imga,
  assets.img5,
];

const Header = () => {
  const [current, setCurrent] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);

  // Auto slide every 4 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      nextSlide();
    }, 3000);
    return () => clearInterval(timer);
  }, []);

  const nextSlide = () => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setCurrent((prev) => (prev + 1) % images.length);
    setTimeout(() => setIsTransitioning(false), 700);
  };

  const prevSlide = () => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setCurrent((prev) => (prev - 1 + images.length) % images.length);
    setTimeout(() => setIsTransitioning(false), 700);
  };

  const goToSlide = (index) => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setCurrent(index);
    setTimeout(() => setIsTransitioning(false), 700);
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
        className="flex w-full h-full transition-transform duration-700 ease-in-out"
        style={{
          transform: `translateX(-${current * 100}%)`,
        }}
      >
        {images.map((img, index) => (
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
              current === index
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