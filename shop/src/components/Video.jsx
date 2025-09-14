import React, { useState, useRef } from 'react';
import { FaPlay, FaPause, FaVolumeUp, FaVolumeMute, FaExpand, FaStar, FaQuoteLeft } from 'react-icons/fa';
import { assets } from "../assets/assets.js";

const Video = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const videoRef = useRef(null);

  const gold = '#D9C27B';

  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  const handleTimeUpdate = () => {
    if (videoRef.current) {
      setCurrentTime(videoRef.current.currentTime);
    }
  };

  const handleLoadedMetadata = () => {
    if (videoRef.current) {
      setDuration(videoRef.current.duration);
    }
  };

  const handleProgressClick = (e) => {
    if (videoRef.current) {
      const rect = e.currentTarget.getBoundingClientRect();
      const clickX = e.clientX - rect.left;
      const newTime = (clickX / rect.width) * duration;
      videoRef.current.currentTime = newTime;
      setCurrentTime(newTime);
    }
  };

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  const testimonials = [
    {
      name: "Priya Sharma",
      text: "Amazing products! My hair has never looked better since I started using Me & Guys products.",
      rating: 5
    },
    {
      name: "Rahul Verma", 
      text: "Professional quality at home. The grooming kit is fantastic!",
      rating: 5
    },
    {
      name: "Anita Singh",
      text: "Love the skincare range. My skin feels so smooth and radiant now.",
      rating: 5
    }
  ];

  return (
    <div className="w-full py-16 md:py-20 lg:py-24">
      <div className="w-full mx-auto px-4 sm:px-6 lg:px-20">
        
        {/* Header Section */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-[#D9C27B]/20 to-[#F4E4A6]/20 border border-[#D9C27B]/30 rounded-full px-6 py-2 mb-6">
            <FaPlay className="text-[#D9C27B] text-sm" />
            <span className="text-[#D9C27B] font-semibold text-sm">EXPERIENCE THE DIFFERENCE</span>
            <FaStar className="text-[#D9C27B] text-sm animate-pulse" />
          </div>
          
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6">
            <span className="bg-gradient-to-r from-[#D9C27B] to-[#F4E4A6] bg-clip-text text-transparent">
              See Our Products
            </span>
            <br />
            <span className="text-white">In Action</span>
          </h1>
          
          <p className="text-gray-300 text-lg md:text-xl max-w-3xl mx-auto leading-relaxed">
            Watch how our premium salon products transform your daily beauty routine. 
            <span className="text-[#D9C27B] font-semibold"> Professional results</span> you can achieve at home.
          </p>
        </div>

        {/* Video Section */}
        <div className="max-w-6xl mx-auto">
          <div className="relative rounded-3xl overflow-hidden bg-gradient-to-br from-gray-900/80 to-black/80 backdrop-blur-sm border border-[#D9C27B]/20 shadow-2xl">
            
            {/* Video Container */}
            <div className="relative aspect-video bg-black">
              <video
                ref={videoRef}
                src={assets.video}
                className="w-full h-full object-cover"
                onTimeUpdate={handleTimeUpdate}
                onLoadedMetadata={handleLoadedMetadata}
                onEnded={() => setIsPlaying(false)}
                poster="/api/placeholder/1200/675"
              />
              
              {/* Video Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/30 pointer-events-none" />
              
              {/* Play Button Overlay */}
              {!isPlaying && (
                <div className="absolute inset-0 flex items-center justify-center">
                  <button
                    onClick={togglePlay}
                    className="group bg-gradient-to-r from-[#D9C27B] to-[#F4E4A6] text-black p-6 rounded-full hover:scale-110 transition-all duration-300 shadow-2xl"
                  >
                    <FaPlay className="text-3xl md:text-4xl ml-1 group-hover:ml-2 transition-all duration-300" />
                  </button>
                </div>
              )}
              
              {/* Video Controls */}
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4 md:p-6">
                
                {/* Progress Bar */}
                <div className="mb-4">
                  <div 
                    className="w-full h-2 bg-gray-600 rounded-full cursor-pointer"
                    onClick={handleProgressClick}
                  >
                    <div 
                      className="h-full bg-gradient-to-r from-[#D9C27B] to-[#F4E4A6] rounded-full transition-all duration-300"
                      style={{ width: `${duration ? (currentTime / duration) * 100 : 0}%` }}
                    />
                  </div>
                </div>
                
                {/* Control Buttons */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <button
                      onClick={togglePlay}
                      className="text-white hover:text-[#D9C27B] transition-colors duration-300 p-2"
                    >
                      {isPlaying ? <FaPause className="text-xl" /> : <FaPlay className="text-xl" />}
                    </button>
                    
                    <button
                      onClick={toggleMute}
                      className="text-white hover:text-[#D9C27B] transition-colors duration-300 p-2"
                    >
                      {isMuted ? <FaVolumeMute className="text-xl" /> : <FaVolumeUp className="text-xl" />}
                    </button>
                    
                    <span className="text-white text-sm">
                      {formatTime(currentTime)} / {formatTime(duration)}
                    </span>
                  </div>
                  
                  <button
                    onClick={() => videoRef.current?.requestFullscreen()}
                    className="text-white hover:text-[#D9C27B] transition-colors duration-300 p-2"
                  >
                    <FaExpand className="text-xl" />
                  </button>
                </div>
              </div>
            </div>
            
            {/* Video Info */}
            <div className="p-6 md:p-8">
              <div className="grid md:grid-cols-2 gap-8 items-center">
                <div>
                  <h3 className="text-2xl md:text-3xl font-bold text-white mb-4">
                    <span className="text-[#D9C27B]">Professional Quality</span> Beauty Products
                  </h3>
                  <p className="text-gray-300 text-lg leading-relaxed mb-6">
                    Discover the secret behind salon-perfect results. Our premium collection brings 
                    professional-grade beauty and grooming essentials directly to your home.
                  </p>
                  <div className="flex gap-4">
                    <button className="bg-gradient-to-r from-[#D9C27B] to-[#F4E4A6] text-black font-bold py-3 px-6 rounded-full hover:shadow-xl hover:scale-105 transition-all duration-300">
                      Shop Collection
                    </button>
                    <button className="border-2 border-[#D9C27B] text-[#D9C27B] font-bold py-3 px-6 rounded-full hover:bg-[#D9C27B] hover:text-black transition-all duration-300">
                      Learn More
                    </button>
                  </div>
                </div>
                
                {/* Stats */}
                <div className="grid grid-cols-2 gap-6">
                  <div className="text-center p-4 bg-gradient-to-br from-[#D9C27B]/10 to-[#F4E4A6]/10 rounded-2xl border border-[#D9C27B]/20">
                    <div className="text-3xl font-bold text-[#D9C27B] mb-2">500+</div>
                    <div className="text-gray-300 text-sm">Premium Products</div>
                  </div>
                  <div className="text-center p-4 bg-gradient-to-br from-[#D9C27B]/10 to-[#F4E4A6]/10 rounded-2xl border border-[#D9C27B]/20">
                    <div className="text-3xl font-bold text-[#D9C27B] mb-2">50K+</div>
                    <div className="text-gray-300 text-sm">Happy Customers</div>
                  </div>
                  <div className="text-center p-4 bg-gradient-to-br from-[#D9C27B]/10 to-[#F4E4A6]/10 rounded-2xl border border-[#D9C27B]/20">
                    <div className="text-3xl font-bold text-[#D9C27B] mb-2">4.9★</div>
                    <div className="text-gray-300 text-sm">Average Rating</div>
                  </div>
                  <div className="text-center p-4 bg-gradient-to-br from-[#D9C27B]/10 to-[#F4E4A6]/10 rounded-2xl border border-[#D9C27B]/20">
                    <div className="text-3xl font-bold text-[#D9C27B] mb-2">15+</div>
                    <div className="text-gray-300 text-sm">Years Experience</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Customer Testimonials */}
        <div className="mt-20">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              What Our <span className="text-[#D9C27B]">Customers Say</span>
            </h2>
            <p className="text-gray-300 text-lg">Real reviews from real customers</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div
                key={index}
                className="group relative p-6 md:p-8 bg-gradient-to-br from-gray-900/80 to-black/80 backdrop-blur-sm border border-[#D9C27B]/20 rounded-2xl hover:border-[#D9C27B]/40 transition-all duration-500 hover:transform hover:scale-105"
              >
                <div className="absolute top-4 left-4 text-[#D9C27B]/30">
                  <FaQuoteLeft className="text-2xl" />
                </div>
                
                <div className="flex items-center gap-1 mb-4 justify-center">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <FaStar key={i} className="text-[#D9C27B] text-lg" />
                  ))}
                </div>
                
                <p className="text-gray-300 text-center mb-6 leading-relaxed">
                  "{testimonial.text}"
                </p>
                
                <div className="text-center">
                  <h4 className="text-[#D9C27B] font-semibold text-lg">
                    {testimonial.name}
                  </h4>
                  <p className="text-gray-400 text-sm">Verified Customer</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Video;
