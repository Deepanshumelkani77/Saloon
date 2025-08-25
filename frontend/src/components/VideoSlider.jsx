import React, { useRef, useEffect } from "react";
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

  useEffect(() => {
    let animationFrame;
    let position = 0;
    const totalWidth = (SLIDE_WIDTH + GAP) * videos.length;

    function animate() {
      position += 0.5; // lower = slower, higher = faster
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

  // Duplicate videos for seamless infinite scroll
  const allVideos = [...videos, ...videos];

  return (
    <div className="w-full overflow-hidden bg-gradient-to-br from-black via-[#23211b] to-[#181818] py-8 flex flex-col items-center justify-center ">
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
        {allVideos.map((src, idx) => (
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
            }}
          >
            <video
              src={src}
              className="w-full h-full object-cover"
              autoPlay
              muted
              loop
              playsInline
              preload="auto"
              style={{ background: "#000" }}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default VideoSlider;