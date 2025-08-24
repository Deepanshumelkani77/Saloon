import React from 'react'
import {useState,useEffect} from 'react';
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import {assets} from '../assets/assets.js';


const images = [
  assets.img1,
  assets.img2,
  assets.img4,
  assets.img3,
  assets.img5
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
   
 <div className="relative w-full max-w-4xl mx-auto overflow-hidden rounded-2xl shadow-lg">
      {/* Images */}
      <div
        className="flex transition-transform duration-700"
        style={{ transform: `translateX(-${current * 100}%)` }}
      >
        {images.map((img, index) => (
          <img key={index} src={img} alt="slide" className="w-full flex-shrink-0" />
        ))}
      </div>

      {/* Prev Button */}
      <button
        onClick={prevSlide}
        className="absolute top-1/2 left-5 transform -translate-y-1/2 bg-black/40 text-white p-3 rounded-full hover:bg-black/60"
      >
        <FaArrowLeft />
      </button>

      {/* Next Button */}
      <button
        onClick={nextSlide}
        className="absolute top-1/2 right-5 transform -translate-y-1/2 bg-black/40 text-white p-3 rounded-full hover:bg-black/60"
      >
        <FaArrowRight />
      </button>

      {/* Dots (optional) */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2">
        {images.map((_, index) => (
          <div
            key={index}
            onClick={() => setCurrent(index)}
            className={`w-3 h-3 rounded-full cursor-pointer ${
              index === current ? "bg-white" : "bg-gray-400"
            }`}
          />
        ))}
      </div>
    </div>

  )
}

export default Header
