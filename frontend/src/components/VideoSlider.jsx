import React, { useRef, useEffect, useState } from "react";
import { assets } from "../assets/assets.js";

const videos = [
  assets.vid1,
  assets.vid4,
  assets.vid3,
  assets.vid2,
  assets.vid5,
];

// Responsive dimensions
const getResponsiveDimensions = () => {
  if (typeof window !== 'undefined') {
    const isMobile = window.innerWidth < 768;
    return {
      SLIDE_WIDTH: isMobile ? 200 : 340,
      SLIDE_HEIGHT: isMobile ? 320 : 540,
      GAP: isMobile ? 12 : 24,
      SLIDES_TO_SHOW: isMobile ? 1 : 3
    };
  }
  return {
    SLIDE_WIDTH: 340,
    SLIDE_HEIGHT: 540,
    GAP: 24,
    SLIDES_TO_SHOW: 3
  };
};

const VideoSlider = () => {
  const sliderRef = useRef(null);
  const [loadedVideos, setLoadedVideos] = useState(new Set());
  const [errorVideos, setErrorVideos] = useState(new Set());
  const [dimensions, setDimensions] = useState(getResponsiveDimensions());

  // Handle window resize for responsive behavior
  useEffect(() => {
    const handleResize = () => {
      setDimensions(getResponsiveDimensions());
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    let animationFrame;
    let position = 0;
    const totalWidth = (dimensions.SLIDE_WIDTH + dimensions.GAP) * videos.length;

    function animate() {
      position += 0.3; // Slightly slower for better viewing
      if (position >= totalWidth) {
        position = 0;
      }
      if (sliderRef.current) {
        sliderRef.current.style.transform = `translateX(-${position}px)`;
      }
      animationFrame = requestAnimationFrame(animate);
    }
    animationFrame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationFrame);
  }, [dimensions]);

  const handleVideoLoad = (index) => {
    setLoadedVideos(prev => new Set([...prev, index]));
  };

  const handleVideoError = (index) => {
    setErrorVideos(prev => new Set([...prev, index]));
  };

  // Duplicate videos for seamless infinite scroll
  const allVideos = [...videos, ...videos, ...videos]; // Triple for smoother loop

  return (
    <div className="w-full overflow-hidden py-4 md:py-8 flex flex-col items-center justify-center">
      {/* Heading */}
      <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold text-[#D9C27B] tracking-widest text-center mb-4 md:mb-8 drop-shadow-lg px-4">
        OUR WORKS
      </h1>

      <div
        ref={sliderRef}
        className="flex items-center"
        style={{
          width: "max-content",
          transition: "none",
          gap: `${dimensions.GAP}px`,
        }}
      >
        {allVideos.map((src, idx) => {
          const videoIndex = idx % videos.length;
          const isLoaded = loadedVideos.has(videoIndex);
          const hasError = errorVideos.has(videoIndex);
          
          return (
            <div
              key={idx}
              style={{
                minWidth: `${dimensions.SLIDE_WIDTH}px`,
                maxWidth: `${dimensions.SLIDE_WIDTH}px`,
                height: `${dimensions.SLIDE_HEIGHT}px`,
                borderRadius: window.innerWidth < 768 ? "1rem" : "1.5rem",
                overflow: "hidden",
                border: window.innerWidth < 768 ? "2px solid #D9C27B" : "3px solid #D9C27B",
                background: "#000",
                boxShadow: window.innerWidth < 768 ? "0 2px 12px #0008" : "0 4px 24px #0008",
                flex: "none",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                position: "relative",
              }}
            >
              {/* Loading Spinner */}
              {!isLoaded && !hasError && (
                <div className="absolute inset-0 flex items-center justify-center bg-black/80 z-10">
                  <div className={`${window.innerWidth < 768 ? 'w-8 h-8 border-2' : 'w-12 h-12 border-4'} border-[#D9C27B] border-t-transparent rounded-full animate-spin`}></div>
                </div>
              )}
              
              {/* Error Fallback */}
              {hasError && (
                <div className="absolute inset-0 flex flex-col items-center justify-center bg-gradient-to-br from-gray-800 to-gray-900 z-10">
                  <div className={`${window.innerWidth < 768 ? 'text-4xl mb-2' : 'text-6xl mb-4'}`}>🎬</div>
                  <p className={`text-[#D9C27B] font-semibold ${window.innerWidth < 768 ? 'text-sm' : 'text-lg'}`}>Video Loading...</p>
                  <p className={`text-gray-400 ${window.innerWidth < 768 ? 'text-xs mt-1' : 'text-sm mt-2'}`}>Please wait</p>
                </div>
              )}
              
              <video
                src={src}
                className="w-full h-full object-cover"
                autoPlay
                muted
                loop
                playsInline
                preload="metadata"
                onLoadedData={() => handleVideoLoad(videoIndex)}
                onError={() => handleVideoError(videoIndex)}
                onCanPlay={() => handleVideoLoad(videoIndex)}
                style={{ 
                  background: "#000",
                  opacity: isLoaded ? 1 : 0,
                  transition: "opacity 0.3s ease-in-out"
                }}
              />
              
              {/* Video Overlay Info */}
              <div className={`absolute ${window.innerWidth < 768 ? 'bottom-2 left-2 right-2 p-2' : 'bottom-4 left-4 right-4 p-3'} bg-black/60 backdrop-blur-sm rounded-lg opacity-0 hover:opacity-100 transition-opacity duration-300`}>
                <div className="flex items-center justify-between">
                  <span className={`text-[#D9C27B] font-semibold ${window.innerWidth < 768 ? 'text-xs' : 'text-sm'}`}>Our Work #{videoIndex + 1}</span>
                  <div className="flex items-center space-x-1">
                    <div className={`${window.innerWidth < 768 ? 'w-1.5 h-1.5' : 'w-2 h-2'} bg-red-500 rounded-full animate-pulse`}></div>
                    <span className={`text-white ${window.innerWidth < 768 ? 'text-xs' : 'text-xs'}`}>LIVE</span>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default VideoSlider;