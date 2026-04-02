import { useRef } from "react";
import { motion } from "framer-motion";
import useVideoOptimization from "../hooks/useVideoOptimization";

const TextAnimationSection = () => {
  const phoneVideoRef = useRef(null);
  const timelineVideoRef = useRef(null);

  useVideoOptimization(phoneVideoRef);
  useVideoOptimization(timelineVideoRef);

  return (
    <section className="min-h-[100dvh] h-auto w-full bg-black text-white flex items-start lg:items-center justify-center relative border-y border-white/5 pt-[50px] pb-[30px] lg:py-0">

      {/* Background Decorative Accents */}
      <div className="absolute inset-0 pointer-events-none opacity-20">
        <div className="absolute top-0 right-0 w-[40vw] h-[40vw] bg-[#00FFFF] rounded-full blur-[150px] -translate-y-1/2 translate-x-1/2 opacity-30" />
        <div className="absolute bottom-0 left-0 w-[40vw] h-[40vw] bg-[#007FFF] rounded-full blur-[150px] translate-y-1/2 -translate-x-1/2 opacity-20" />
      </div>

      <div className="max-w-[1400px] w-full px-4 sm:px-6 lg:px-16 flex flex-col lg:flex-row items-center justify-between gap-0 sm:gap-6 lg:gap-16 relative z-10 h-auto">

        {/* Left Side: Phone Mockup (Constrained Verticality) */}
        <div className="flex justify-center items-center order-2 lg:order-1 w-full lg:w-[40%] h-auto max-h-[90vh] lg:max-h-[100vh] relative pt-0 -mt-4 lg:mt-0 lg:py-0">
          <motion.div
            initial={{ scale: 0.9, opacity: 0, y: 40 }}
            whileInView={{ scale: 1, opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, type: "spring", stiffness: 45 }}
            className="h-auto flex justify-center items-center relative"
          >
            <motion.div
              animate={{ y: [-10, 10, -10] }}
              transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
              className="relative w-full max-w-[160px] sm:max-w-[240px] lg:max-w-[280px] xl:max-w-[340px] aspect-[9/19.5] flex justify-center items-center mx-auto"
            >
              <video
                ref={phoneVideoRef}
                className="w-full h-full object-contain drop-shadow-[0_30px_60px_rgba(0,0,0,0.8)]"
                data-src="/Website/Text Animation/Iphone Mockup Text Animation.mp4"
                autoPlay
                loop
                muted
                playsInline
                preload="none"
                style={{ willChange: "transform", transform: "translateZ(0)" }}
              />
            </motion.div>
          </motion.div>
        </div>

        {/* Right Side: Text & Timeline (Constrained Height) */}
        <div className="flex flex-col justify-center items-center lg:items-end text-center lg:text-right gap-8 lg:gap-10 w-full lg:w-[55%] order-1 lg:order-2 animate-fadeIn overflow-hidden">

          {/* Headings & Text */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            viewport={{ once: true, amount: 0.2 }}
            className="space-y-4 sm:space-y-5 lg:space-y-6 flex flex-col items-center lg:items-end lg:pr-4"
          >
            <h2
              className="text-[clamp(3.2rem,8.5vw,8.5rem)] font-gampolins uppercase tracking-tighter leading-[0.8] italic select-none bg-gradient-to-b from-[#FFFFFF] via-[#00F2FF] to-[#0060FF] bg-clip-text text-transparent origin-right drop-shadow-[0_0_25px_rgba(0,242,255,0.35)] pr-4 sm:pr-6 lg:pr-0"
              style={{
                WebkitTextStroke: "1px rgba(255,255,255,0.3)",
              }}
            >
              TEXT ANIMATION
            </h2>
            <div className="space-y-2 sm:space-y-3 lg:space-y-4">
              <h3 className="hidden md:block text-[clamp(1.5rem,3vw,2.5rem)] font-black uppercase tracking-tight leading-tight text-white/95">
                Dynamic Typography
              </h3>
              <p className="text-gray-400 text-[clamp(0.85rem,1.1vw,1rem)] font-qanelas font-medium tracking-wide leading-relaxed max-w-[550px]">
                I create kinetic typography and expressive text animations that communicate messages with rhythm and style, ensuring every frame tells a story.
              </p>
            </div>
          </motion.div>

          {/* Timeline Video Overlay (Limited Height) */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
            viewport={{ once: true, amount: 0.1 }}
            className="w-full relative group lg:self-end max-w-[600px] lg:max-w-none"
          >
            <div className="rounded-[2rem] p-[2px] bg-gradient-to-r from-[#00FFFF] via-[#007FFF] to-[#00FFFF] shadow-[0_0_40px_rgba(0, 255, 255, 0.15)] transition-all group-hover:shadow-[0_0_60px_rgba(0, 255, 255, 0.25)]">
              <div className="relative w-full h-[clamp(90px,12vh,110px)] lg:h-[220px] overflow-hidden rounded-[1.9rem] bg-black">
                <video
                  ref={timelineVideoRef}
                  data-src="/Website/Text Animation/Time line Text Animation.mp4"
                  className="absolute inset-0 w-full h-full object-cover scale-[1.3]"
                  autoPlay
                  loop
                  muted
                  playsInline
                  preload="none"
                  style={{ willChange: "transform", transform: "translateZ(0)" }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />
                <div className="absolute top-4 right-4 flex items-center gap-2">
                  <span className="text-[10px] font-qanelas font-bold text-white/40 tracking-widest uppercase">Motion Workspace</span>
                  <div className="w-1.5 h-1.5 bg-[#00FFFF] rounded-full animate-pulse" />
                </div>
              </div>
            </div>
          </motion.div>
        </div>

      </div>
    </section>
  );
};

export default TextAnimationSection;
