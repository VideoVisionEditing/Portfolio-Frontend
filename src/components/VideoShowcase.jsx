import React, { useRef } from 'react';
import useVideoOptimization from '../hooks/useVideoOptimization';

const VideoShowcase = () => {
  const desktopVideoRef = useRef(null);
  const mobileVideoRef = useRef(null);
  
  useVideoOptimization(desktopVideoRef);
  useVideoOptimization(mobileVideoRef);

  const togglePlay = (ref) => {
    if (ref && ref.current) {
      if (ref.current.paused) {
        ref.current.play();
      } else {
        ref.current.pause();
      }
    }
  };

  return (
    <section className="relative w-full h-[100dvh] overflow-hidden bg-black flex items-center justify-center">

      {/* 
        Full-screen video, edge-to-edge. 
        Auto-plays, muted, loops, covers entire layout.
      */}
      {/* Desktop Video */}
      <video
        ref={desktopVideoRef}
        className="hidden md:block absolute inset-0 w-full h-full object-cover cursor-pointer outline-none"
        data-src="/Website/Comp 1.mp4"
        autoPlay
        muted
        playsInline
        preload="none"
        style={{ willChange: "transform", transform: "translateZ(0)" }}
        onClick={() => togglePlay(desktopVideoRef)}
      />

      {/* Mobile Video */}
      <video
        ref={mobileVideoRef}
        className="md:hidden absolute inset-0 w-full h-full object-fill cursor-pointer outline-none z-10"
        data-src="/Website/Phone ratio editing flow.mp4"
        autoPlay
        muted
        playsInline
        preload="none"
        style={{ willChange: "transform", transform: "translateZ(0)" }}
        onClick={() => togglePlay(mobileVideoRef)}
      />

      {/* Soft Blurred Top Icon (Mobile Only) */}
      <img 
        src="/icons/img1.png"
        alt=""
        className="md:hidden absolute z-20 top-[0%] left-[5%] -translate-x-1/2 w-20 h-20 object-contain opacity-45 blur-[1px] pointer-events-none" 
      />

      <img 
        src="/icons/img2.jpg"
        alt=""
        className="md:hidden absolute z-20 top-[2%] right-[15%] -translate-x-1/2 w-30 h-30 object-contain opacity-45 blur-[1px] pointer-events-none" 
      />

      {/* Soft Blurred Bottom Icon (Mobile Only) */}
      <img 
        src="/icons/img3.jpg" 
        alt=""
        className="md:hidden absolute z-20 top-[-3%] right-[-10%] -translate-x-1/2 w-20 h-20 object-contain opacity-45 blur-[1px] pointer-events-none" 
      />

      <img 
        src="/icons/img7.jpg" 
        alt=""
        className="md:hidden absolute z-20 bottom-[14%] right-[-18%] -translate-x-1/2 w-20 h-20 object-contain opacity-45 blur-[1px] pointer-events-none" 
      />

      <img 
        src="/icons/img4.jpg" 
        alt=""
        className="md:hidden absolute z-20 bottom-[7%] left-[10%] -translate-x-1/2 w-20 h-20 object-contain opacity-45 blur-[1px] pointer-events-none" 
      />

      <img 
        src="/icons/img5.jpg" 
        alt=""
        className="md:hidden absolute z-20 bottom-[1%] right-[31%] -translate-x-1/2 w-20 h-20 object-contain opacity-45 blur-[1px] pointer-events-none" 
      />

    </section>
  );
};

export default VideoShowcase;