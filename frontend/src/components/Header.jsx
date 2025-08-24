import React, { useState, useEffect } from "react";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import { assets } from "../assets/assets.js";

const images = [
  assets.img1,
  assets.img2,
  assets.img3,
  assets.img4,
  assets.img5,
];

const Header = () => {
  const [current, setCurrent] = useState(0);
  const length = images.length;

  // Auto slide every 3 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev === length - 1 ? 0 : prev + 1));
    }, 3000);
    return () => clearInterval(timer);
  }, [length]);

  // Next and Prev functions
  const nextSlide = () => {
    setCurrent(current === length - 1 ? 0 : current + 1);
  };

  const prevSlide = () => {
    setCurrent(current === 0 ? length - 1 : current - 1);
  };

  return (
    <section
      className="
        relative w-full mx-auto overflow-hidden shadow-lg bg-pink-200
        flex items-center
        h-[35vh] sm:h-[70vh] md:h-[calc(100vh-80px)]"
      // 80px = navbar height (mt-20)
      style={{ minHeight: "250px" }}
    >
      {/* Images */}
      <div
        className="flex transition-transform duration-700 ease-in-out w-full  h-[35vh] sm:h-[70vh] md:h-[calc(100vh-80px)] "
        style={{ transform: `translateX(-${current * 100}%)` }}
      >
        {images.map((img, index) => (
          <img
            key={index}
            src={img}
            alt="slide"
            className="w-full h-[35vh] sm:h-[70vh] md:h-[calc(100vh-80px)] object-cover object-center flex-shrink-0 transition-all duration-700"
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
            onClick={() => setCurrent(index)}
            className={`w-4 h-4 rounded-full border-2 border-[#D9C27B] transition-all duration-200 ${
              index === current
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

export default Header;