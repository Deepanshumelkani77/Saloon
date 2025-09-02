import React, { useRef, useEffect, useState } from "react";
import { assets } from "../assets/assets.js";

const videos = [
  assets.vid1,
  assets.vid4,
  assets.vid3,
  assets.vid2,
  assets.vid5,
];

const SLIDES_TO_SHOW = 3; // Number of videos visible at once
const SLIDE_WIDTH = 340; // px, adjust as needed for your design
const SLIDE_HEIGHT = 540; // px, increased for "reel" style
const GAP = 24; // px, gap between videos

const VideoSlider = () => {
  const sliderRef = useRef(null);
  const [loadedVideos, setLoadedVideos] = useState(new Set());
  const [errorVideos, setErrorVideos] = useState(new Set());

  useEffect(() => {
    let animationFrame;
    let position = 0;
    const totalWidth = (SLIDE_WIDTH + GAP) * videos.length;

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
  }, []);

  const handleVideoLoad = (index) => {
    setLoadedVideos(prev => new Set([...prev, index]));
  };

  const handleVideoError = (index) => {
    setErrorVideos(prev => new Set([...prev, index]));
  };

  // Duplicate videos for seamless infinite scroll
  const allVideos = [...videos, ...videos, ...videos]; // Triple for smoother loop

  return (
    <div className="w-full overflow-hidden py-8 flex flex-col items-center justify-center ">
      {/* Heading */}
      <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-[#D9C27B] tracking-widest text-center mb-8 drop-shadow-lg">
        OUR WORKS
      </h1>

      <div
        ref={sliderRef}
        className="flex items-center gap-6"
        style={{
          width: "max-content",
          transition: "none",
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
                minWidth: `${SLIDE_WIDTH}px`,
                maxWidth: `${SLIDE_WIDTH}px`,
                height: `${SLIDE_HEIGHT}px`,
                borderRadius: "1.5rem",
                overflow: "hidden",
                border: "3px solid #D9C27B",
                background: "#000",
                boxShadow: "0 4px 24px #0008",
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
                  <div className="w-12 h-12 border-4 border-[#D9C27B] border-t-transparent rounded-full animate-spin"></div>
                </div>
              )}
              
              {/* Error Fallback */}
              {hasError && (
                <div className="absolute inset-0 flex flex-col items-center justify-center bg-gradient-to-br from-gray-800 to-gray-900 z-10">
                  <div className="text-6xl mb-4">🎬</div>
                  <p className="text-[#D9C27B] font-semibold text-lg">Video Loading...</p>
                  <p className="text-gray-400 text-sm mt-2">Please wait</p>
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
              <div className="absolute bottom-4 left-4 right-4 bg-black/60 backdrop-blur-sm rounded-lg p-3 opacity-0 hover:opacity-100 transition-opacity duration-300">
                <div className="flex items-center justify-between">
                  <span className="text-[#D9C27B] font-semibold text-sm">Our Work #{videoIndex + 1}</span>
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
                    <span className="text-white text-xs">LIVE</span>
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