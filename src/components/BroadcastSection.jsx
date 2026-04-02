import { useRef } from "react";
import { motion } from "framer-motion";
import useVideoOptimization from "../hooks/useVideoOptimization";

const BroadcastSection = () => {
  const phoneVideoRef = useRef(null);
  const timelineVideoRef = useRef(null);

  useVideoOptimization(phoneVideoRef);
  useVideoOptimization(timelineVideoRef);

  return (
    <section className="min-h-[100dvh] h-auto w-full bg-black text-white flex items-start lg:items-center justify-center relative border-y border-white/5 pt-[50px] pb-[30px] lg:py-0">

      {/* Background Decorative Accents (Gold/Orange Theme) */}
      <div className="absolute inset-0 pointer-events-none opacity-20">
        <div className="absolute top-0 left-0 w-[40vw] h-[40vw] bg-[#FFD700] rounded-full blur-[150px] -translate-y-1/2 -translate-x-1/2 opacity-30" />
        <div className="absolute bottom-0 right-0 w-[40vw] h-[40vw] bg-[#FF8C00] rounded-full blur-[150px] translate-y-1/2 translate-x-1/2 opacity-25" />
      </div>

      <div className="max-w-[1400px] w-full px-4 sm:px-6 lg:px-16 flex flex-col lg:flex-row items-center justify-between gap-0 sm:gap-6 lg:gap-16 relative z-10 h-auto">

        {/* Left Side: Text & Timeline (Constrained Height) */}
        <div className="flex flex-col justify-center items-center lg:items-start text-center lg:text-left gap-4 sm:gap-6 lg:gap-10 w-full lg:w-[55%] order-1 animate-fadeIn overflow-hidden">

          {/* Headings & Text */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            viewport={{ once: true, amount: 0.2 }}
            className="space-y-4 sm:space-y-5 lg:space-y-6 flex flex-col items-center lg:items-start"
          >
            <h2
              className="text-[clamp(3.5rem,8vw,8.5rem)] font-gampolins uppercase tracking-tighter leading-[0.8] italic select-none bg-gradient-to-b from-[#FFFFFF] via-[#FFD700] to-[#B8860B] bg-clip-text text-transparent origin-left drop-shadow-[0_0_25px_rgba(255,215,0,0.35)] pr-4 sm:pr-6 lg:pr-8"
              style={{
                WebkitTextStroke: "1px rgba(255,255,255,0.3)",
              }}
            >
              BROADCAST
            </h2>
            <div className="space-y-2 sm:space-y-3 lg:space-y-4">
              <h3 className="hidden md:block text-[clamp(1.5rem,3vw,2.5rem)] font-black uppercase tracking-tight leading-tight text-white/90">
                Television & Media
              </h3>
              <p className="text-gray-400 text-[clamp(0.85rem,1.1vw,1rem)] font-medium tracking-wide leading-relaxed max-w-[550px]">
                I have extensive experience in high-end broadcast editing, ensuring professional-grade transitions, color grading, and timing for television and corporate media.
              </p>
            </div>
          </motion.div>

          {/* Timeline Video Overlay (Limited Height) */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
            viewport={{ once: true, amount: 0.1 }}
            className="w-full relative group max-w-[600px] lg:max-w-none"
          >
            <div className="rounded-[2rem] p-[2px] bg-gradient-to-r from-[#FFD700] via-[#FF8C00] to-[#FFD700] shadow-[0_0_40px_rgba(255,215,0,0.2)] transition-all group-hover:shadow-[0_0_60px_rgba(255,215,0,0.3)]">
              <div className="relative w-full h-[clamp(90px,12vh,110px)] lg:h-[220px] overflow-hidden rounded-[1.9rem] bg-black">
                <video
                  ref={timelineVideoRef}
                  data-src="/Website/broadcast/Time line broadcast.mp4"
                  className="absolute inset-0 w-full h-full object-cover scale-[1.35]"
                  autoPlay
                  loop
                  muted
                  playsInline
                  preload="none"
                  style={{ willChange: "transform", transform: "translateZ(0)" }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />
                <div className="absolute top-4 left-4 flex items-center gap-2">
                  <div className="w-1.5 h-1.5 bg-[#FFD700] rounded-full animate-pulse" />
                  <span className="text-[10px] font-bold text-white/90 tracking-widest uppercase">Broadcast Sequence</span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Right Side: Phone Mockup (Constrained Verticality) */}
        <div className="flex justify-center items-center order-2 w-full lg:w-[40%] h-auto max-h-[90vh] lg:max-h-[100vh] relative pt-0 -mt-4 lg:mt-0 lg:py-0">
          <motion.div
            initial={{ scale: 0.9, opacity: 0, y: 40 }}
            whileInView={{ scale: 1, opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, type: "spring", stiffness: 45 }}
            className="h-auto flex justify-center items-center relative"
          >
            <motion.div
              animate={{ y: [-10, 10, -10] }}
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
              className="relative w-full max-w-[160px] sm:max-w-[240px] lg:max-w-[280px] xl:max-w-[340px] aspect-[9/19.5] flex justify-center items-center mx-auto"
            >
              <video
                ref={phoneVideoRef}
                className="w-full h-full object-contain drop-shadow-[0_30px_60px_rgba(0,0,0,0.8)]"
                data-src="/Website/broadcast/Iphone Mockup broadcast.mp4"
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

      </div>
    </section>
  );
};

export default BroadcastSection;
