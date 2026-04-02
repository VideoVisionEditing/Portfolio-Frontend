import { useRef, useState, useEffect } from "react";
import { motion } from "framer-motion";
import useVideoOptimization from "../hooks/useVideoOptimization";

// Sub-component for individual Reel videos to handle its own optimization
const ReelVideo = ({ src }) => {
  const videoRef = useRef(null);

  return (
    <div className="h-[100dvh] w-full flex-shrink-0 snap-start relative bg-black flex items-center justify-center overflow-hidden">
      <video
        ref={videoRef}
        src={src}
        className="w-full h-full object-contain"
        autoPlay
        loop
        muted
        playsInline
        preload="auto"
      />
      {/* Subtle cinematic overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/40 pointer-events-none" />
    </div>
  );
};

const MotionFullscreenSection = ({ reelIndex }) => {
  const [isMobile, setIsMobile] = useState(() => 
    typeof window !== "undefined" ? window.innerWidth < 768 : false
  );
  const bgVideoRef = useRef(null);
  const mainVideoRef = useRef(null);

  useVideoOptimization(bgVideoRef);
  useVideoOptimization(mainVideoRef);

  // Monitor screen size
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const mobileVideos = [
    "/Website/Motion Graphic/Iphone Video Mockup 1.mp4",
    "/Website/Motion Graphic/Iphone Video Mockup 2.mp4",
    "/Website/Motion Graphic/Iphone Video Mockup 3.mp4"
  ];

  // Mobile 'One by One' View (Flattened for App.jsx ScrollSnapContainer)
  if (isMobile && reelIndex !== undefined) {
    return <ReelVideo src={mobileVideos[reelIndex]} />;
  }

  // Desktop 'Cinematic' View (or Fallback)
  return (
    <section className="h-screen w-full relative overflow-hidden bg-black flex items-center justify-center">
      {/* Background layer: Blurred, zoomed version to fill any empty space (Responsive for Desktop/Laptop) */}
      <div className="absolute inset-0 opacity-40 blur-3xl scale-110 pointer-events-none overflow-hidden">
        <video
          ref={bgVideoRef}
          data-src="/Website/Motion Graphic/Motion Graphic Mochups.mp4"
          className="w-full h-full object-cover"
          autoPlay
          loop
          muted
          playsInline
          preload="none"
          style={{ willChange: "transform", transform: "translateZ(0)" }}
        />
      </div>

      {/* Foreground layer: Actual Video with NO CROPPING (Responsive for all screens) */}
      <motion.div
        initial={{ opacity: 0, y: 30, scale: 0.98 }}
        whileInView={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 1.2, ease: "easeOut" }}
        viewport={{ once: true }}
        className="relative z-10 w-full h-full flex items-center justify-center p-4 md:p-8"
      >
        <video
          ref={mainVideoRef}
          src="/Website/Motion Graphic/Motion Graphic Mochups.mp4"
          className="max-w-full max-h-full object-contain shadow-[0_0_80px_rgba(0,0,0,0.8)]"
          autoPlay
          loop
          muted
          playsInline
          preload="auto"
          style={{ willChange: "transform", transform: "translateZ(0)" }}
        />

        {/* Subtle cinematic overlays */}
        <div className="absolute inset-0 pointer-events-none bg-gradient-to-b from-black/20 via-transparent to-black/40" />
      </motion.div>

      {/* Decorative gradients for smooth blending with top/bottom sections */}
      <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-black to-transparent z-20 pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-black to-transparent z-20 pointer-events-none" />
    </section>
  );
};

export default MotionFullscreenSection;
