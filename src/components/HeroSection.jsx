import { motion } from 'framer-motion';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { useEffect, useState } from 'react';
import Navbar from './Navbar';

function cn(...inputs) {
  return twMerge(clsx(inputs));
}

const Icons = {
  Premiere: () => (
    <img
      src="Home_Icons/premiere-pro.png"
      alt="Premiere Pro"
      className="w-16 h-16 md:w-36 md:h-36 object-contain transition-transform duration-300"
    />
  ),
  Photoshop: () => (
    <img
      src="Home_Icons/photoshop.png"
      alt="Photoshop"
      className="w-16 h-16 md:w-28 md:h-28 object-contain transition-transform duration-300"
    />
  ),
  AfterEffects: () => (
    <img
      src="Home_Icons/after-effects.webp"
      alt="After Effects"
      className="w-16 h-16 md:w-28 md:h-28 object-contain transition-transform duration-300"
    />
  ),
  CapCut: () => (
    <img
      src="Home_Icons/capcut.png"
      alt="CapCut"
      className="w-16 h-16 md:w-32 md:h-32 object-contain transition-transform duration-300"
    />
  )
};

const HeroSection = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const letters = [
    { char: "P", style: "hero-letter text-white hover-gradient-hero" },
    { char: "o", style: "hero-letter text-gradient-hero-accent blur-[2px] scale-90" },
    { char: "R", style: "hero-letter text-white hover-gradient-hero" },
    { char: "T", style: "hero-letter text-white hover-gradient-hero" },
    { char: "F", style: "hero-letter text-gradient-hero-accent blur-[15px] scale-125 opacity-70" },
    { char: "O", style: "hero-letter text-white hover-gradient-hero" },
    { char: "L", style: "hero-letter text-white hover-gradient-hero" },
    { char: "I", style: "hero-letter text-white hover-gradient-hero" },
    { char: "O", style: "hero-letter text-white hover-gradient-hero" },
  ];

  const softwareIcons = [
    {
      Icon: Icons.Premiere,
      delay: 1.0,
      x: isMobile ? -140 : -360, y: isMobile ? -150 : -200,
      floatX: [0, 10, 0], floatY: [0, -40, 0],
      duration: 5,
      rotate: -12
    },
    {
      Icon: Icons.Photoshop,
      delay: 1.4,
      x: isMobile ? -130 : -320, y: isMobile ? 180 : 220,
      floatX: [0, 15, 0], floatY: [0, 40, 0],
      duration: 5.5,
      rotate: 5
    },
    {
      Icon: Icons.AfterEffects,
      delay: 1.2,
      x: isMobile ? 140 : 360, y: isMobile ? -140 : -180,
      floatX: [0, -10, 0], floatY: [0, -35, 0],
      duration: 6,
      rotate: 8
    },
    {
      Icon: Icons.CapCut,
      delay: 1.6,
      x: isMobile ? 130 : 340, y: isMobile ? 160 : 200,
      floatX: [0, -15, 0], floatY: [0, 35, 0],
      duration: 5.8,
      rotate: -8
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.3 },
    },
  };

  const letterVariants = {
    hidden: { y: 20, opacity: 0, filter: "blur(10px)" },
    visible: {
      y: 0,
      opacity: 1,
      filter: "blur(0px)",
      transition: { duration: 1, ease: "easeOut" }
    },
  };



  return (
    <section className="relative h-full w-full flex flex-col items-center justify-center bg-obsidian overflow-hidden cursor-default">
      {/* Background Studio Gradients */}
      <Navbar />
      <div className="absolute inset-0 z-0 opacity-15 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-[600px] h-[600px] bg-accent/20 rounded-full blur-[160px]" />
        <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-purple-600/10 rounded-full blur-[140px]" />
      </div>

      {/* Top Subtitle */}
      <motion.div
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 1, delay: 0.2 }}
        className="text-muted tracking-[0.2em] md:tracking-[0.5em] text-[8px] md:text-sm font-bold mb-6 uppercase z-10 text-center px-4 max-w-[90vw] mx-auto"
      >
        VIDEO EDITOR | Since 2024 | VIDEO VISION
      </motion.div>

      {/* Emerging & Directional Floating Icons (Stable - No Mouse Follow) */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-50">
        {softwareIcons.map((item, i) => (
          <motion.div
            key={i}
            initial={{ x: 0, y: 0, scale: 0, opacity: 0 }}
            animate={{
              x: item.x,
              y: item.y,
              scale: 1,
              opacity: 1,
              transition: {
                delay: item.delay,
                duration: 1.5,
                type: "spring",
                stiffness: 40,
                damping: 12
              }
            }}
            className="absolute"
          >
            <motion.div
              animate={{
                x: item.floatX,
                y: item.floatY,
                rotate: [item.rotate, item.rotate + (i % 2 === 0 ? 5 : -5), item.rotate],
              }}
              transition={{
                duration: item.duration,
                repeat: Infinity,
                repeatType: "mirror",
                ease: "easeInOut",
              }}
              whileHover={{
                scale: 1.1,
                filter: "drop-shadow(0 0 15px rgba(255,255,255,0.2)) brightness(1.2)",
                cursor: "pointer"
              }}
              className="pointer-events-auto filter drop-shadow-[0_0_8px_rgba(0,0,0,0.3)]"
              style={{ willChange: "transform" }}
            >
              <item.Icon />
            </motion.div>
          </motion.div>
        ))}
      </div>

      {/* Main Title Background UI */}
      <div className="absolute top-[38%] left-1/2 -translate-x-1/2 w-[80%] max-w-[800px] opacity-10 pointer-events-none z-0">
        <svg viewBox="0 0 1000 120" className="w-full">
          <line x1="0" y1="10" x2="1000" y2="10" stroke="white" strokeWidth="1" strokeDasharray="1 10" />
          <rect x="50" y="30" width="900" height="20" fill="currentColor" className="text-white/10" rx="4" />
          <rect x="120" y="35" width="240" height="10" fill="currentColor" className="text-accent/60" rx="2" />
          <rect x="370" y="35" width="110" height="10" fill="currentColor" className="text-purple-500/60" rx="2" />
          <rect x="490" y="35" width="380" height="10" fill="currentColor" className="text-accent/60" rx="2" />
          <line x1="450" y1="0" x2="450" y2="100" stroke="currentColor" className="text-accent" strokeWidth="2" />
          <circle cx="450" cy="0" r="4" fill="currentColor" className="text-accent" />
        </svg>
      </div>

      {/* "PORTFOLIO" Text Reveal */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="relative flex items-center justify-center text-[12vw] md:text-[14vw] font-black leading-none tracking-tighter select-none font-display z-10 uppercase w-full overflow-visible"
      >
        {/* Background Shadow Text for Depth */}
        <span className="absolute inset-0 flex items-center justify-center text-accent/5 blur-[100px] scale-150 z-0 pointer-events-none">
          PORTFOLIO
        </span>

        {letters.map((item, i) => (
          <motion.span
            key={i}
            variants={letterVariants}
            className={cn(
              "relative",
              item.style
            )}
            whileHover={{
              scale: 1.1,
              filter: "blur(0px)",
              transition: { duration: 0.4, ease: [0.23, 1, 0.320, 1] }
            }}
          >
            {item.char}
          </motion.span>
        ))}
      </motion.div>

      {/* Animated Scroll Indicator (Mouse) */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 1 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 z-20 pointer-events-none"
      >
        <div className="w-6 h-10 border-2 border-white/40 rounded-full flex justify-center p-1.5 grayscale shadow-[0_0_15px_rgba(255,255,255,0.05)]">
          <motion.div
            animate={{
              y: [0, 15, 0],
              opacity: [0.4, 1, 0.4]
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut"
            }}
            className="w-1 h-2 bg-white rounded-full"
          />
        </div>
        <div className="flex flex-col items-center -space-y-2 opacity-60">
          {[0, 1].map((i) => (
            <motion.div
              key={i}
              animate={{
                opacity: [0, 1, 0],
                y: [0, 5, 10]
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                delay: i * 0.3,
                ease: "easeOut"
              }}
              className="w-4 h-4 flex items-center justify-center text-white"
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" className="w-full h-full">
                <path d="M7 10l5 5 5-5" />
              </svg>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
};

export default HeroSection;
