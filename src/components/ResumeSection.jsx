import { motion, useScroll, useTransform, useSpring, useInView } from "framer-motion";
import { useEffect, useState, useRef } from "react";

// CountUp Component for stats
const CountUp = ({ end, duration = 2, suffix = "" }) => {
  const [displayValue, setDisplayValue] = useState(0);
  const nodeRef = useRef(null);
  const isInView = useInView(nodeRef, { once: true, amount: 0.3 });

  const springValue = useSpring(0, {
    stiffness: 40,
    damping: 20,
    duration: duration * 1000,
  });

  useEffect(() => {
    if (isInView) {
      springValue.set(end);
    }
  }, [isInView, end, springValue]);

  useEffect(() => {
    return springValue.on("change", (latest) => {
      setDisplayValue(Math.floor(latest));
    });
  }, [springValue]);

  return <span ref={nodeRef}>{displayValue}{suffix}</span>;
};

const SkillBar = ({ name, icon, percentage, delay }) => (
  <motion.div
    initial={{ opacity: 0, y: 15 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    whileHover={{ scale: 1.02, y: -2 }}
    transition={{ duration: 0.4, delay }}
    className="bg-white/90 backdrop-blur-md p-3 xl:p-4 w-full rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-all group relative overflow-hidden flex flex-col justify-between min-w-0"
  >
    {/* Top: Icon + Name + Percentage */}
    <div className="flex items-center gap-3 w-full relative z-10 mb-2.5 min-w-0">
      <div className="w-8 h-8 md:w-9 md:h-9 bg-gray-50 rounded-xl group-hover:scale-105 transition-transform duration-300 border border-gray-100/80 shrink-0 flex items-center justify-center overflow-hidden">
        <img src={icon} alt={name} className="w-full h-full object-contain scale-125 drop-shadow-sm" />
      </div>
      <div className="flex flex-col min-w-0">
        <h4 className="font-extrabold text-gray-800 text-[0.75rem] md:text-[0.85rem] tracking-tight leading-tight whitespace-normal">
          {name}
        </h4>
        <span className="text-[0.75rem] md:text-[0.8rem] font-black text-rose-500 mt-0.5">
          {percentage}%
        </span>
      </div>
    </div>

    {/* Bottom: Progress bar */}
    <div className="h-1.5 w-full bg-gray-100/80 rounded-full overflow-hidden relative z-10 shrink-0">
      <motion.div
        initial={{ width: 0 }}
        whileInView={{ width: `${percentage}%` }}
        viewport={{ once: true }}
        transition={{ duration: 1.2, delay: delay + 0.2, ease: [0.22, 1, 0.36, 1] }}
        className="h-full bg-gradient-to-r from-rose-400 via-rose-500 to-rose-600 rounded-full"
      />
    </div>
  </motion.div>
);

const FloatingIcon = ({ src, top, left, delay, blur = "0px", opacity = 0.4, scale = 1, duration = 8 }) => {
  const { scrollYProgress } = useScroll();
  const yParallax = useTransform(scrollYProgress, [0, 1], [0, -100 * scale]);

  return (
    <motion.div
      initial={{ opacity: 0, scale: scale * 0.8 }}
      whileInView={{ opacity: 1, scale: scale }}
      viewport={{ once: true }}
      className="absolute pointer-events-none select-none z-[1] overflow-visible"
      style={{ top, left, y: yParallax }}
    >
      <motion.div
        animate={{
          y: [0, -20, 0],
          x: [0, 10, 0],
        }}
        transition={{
          duration: duration,
          repeat: Infinity,
          ease: "easeInOut",
          delay: delay
        }}
      >
        <img
          src={src}
          alt="bg-icon"
          className="w-20 h-20 md:w-40 md:h-40 object-contain grayscale invert mix-blend-multiply transition-all contrast-125"
          style={{ filter: `blur(${blur})` }}
          onError={(e) => {
            console.error("Failed to load icon:", src);
            e.target.style.display = 'none';
          }}
        />
      </motion.div>
    </motion.div>
  );
};

const FlightAnimation = ({ isMobile }) => {
  const desktopPath = "M 100 230 Q 600 -80 1100 200";
  const mobilePath = "M 50 300 Q 150 0 350 250";
  const path = isMobile ? mobilePath : desktopPath;

  // Shared timing for perfect synchronization
  const sharedTransition = {
    duration: 5,
    delay: 1.2,
    ease: "easeInOut"
  };

  return (
    <div className="absolute inset-0 z-[20] pointer-events-none overflow-visible">
      <svg viewBox={isMobile ? "0 0 400 800" : "0 0 1400 1000"} className="w-full h-full fill-none">

        {/* Synchronized Rose Flight Line */}
        <motion.path
          d={path}
          stroke="#f43f5e"
          strokeWidth="2"
          strokeLinecap="round"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{
            pathLength: 1,
            opacity: [0, 1, 1, 0]
          }}
          transition={{
            ...sharedTransition,
            opacity: { duration: 5.5, delay: 1.2 }
          }}
        />

        {/* Synchronized Airplane */}
        <motion.g
          initial={{ opacity: 0, scale: 0 }}
          animate={{
            opacity: [0, 1, 1, 0],
            scale: [0.3, 1, 1, 0.3],
            offsetDistance: "100%"
          }}
          transition={sharedTransition}
          style={{
            offsetPath: `path("${path}")`,
            offsetRotate: "auto 45deg"
          }}
        >
          {/* Subtle Plane Glow */}
          <circle r="30" fill="white" filter="blur(20px)" opacity="0.4" />

          <image
            href="/icons/img6.jpg"
            width="80"
            height="80"
            x="-40"
            y="-40"
            className="invert grayscale contrast-150"
            style={{
              filter: "drop-shadow(0 0 15px rgba(244, 63, 94, 0.15))"
            }}
          />
        </motion.g>
      </svg>
    </div>
  );
};

const ResumeSection = () => {
  const [isMobile, setIsMobile] = useState(false);
  const containerRef = useRef(null);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 1024);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const skills = [
    { name: "After Effects", icon: "/logo/after-effects.webp", percentage: 85 },
    { name: "Premiere Pro", icon: "/logo/premiere-pro.png", percentage: 80 },
    { name: "Photoshop", icon: "/logo/photoshop.png", percentage: 70 },
    { name: "CapCut", icon: "/logo/capcut.png", percentage: 98 },
    { name: "Canva", icon: "/logo/canva.png", percentage: 80 },
    { name: "Lightroom", icon: "/logo/lightroom.png", percentage: 80 }
  ];

  const floatingIcons = [
    { src: "/icons/img1.png", top: "15%", left: "0%", delay: 0, blur: "2px", opacity: 0.6, scale: 1.5, duration: 10 },
    { src: "/icons/img2.jpg", top: "60%", left: "85%", delay: 1.5, blur: "2px", opacity: 0.4, scale: 1.8, duration: 12 },
    { src: "/icons/img3.jpg", top: "5%", left: "80%", delay: 0.8, blur: "0px", opacity: 0.35, scale: 1.6, duration: 9 },
    { src: "/icons/img4.jpg", top: "85%", left: "15%", delay: 2, blur: "1px", opacity: 0.5, scale: 1.4, duration: 11 },
    { src: "/icons/img5.jpg", top: "60%", left: "35%", delay: 2.5, blur: "3px", opacity: 0.3, scale: 1.3, duration: 14 },
    { src: "/icons/img6.jpg", top: "0%", left: "45%", delay: 3.5, blur: "3px", opacity: 0.25, scale: 1.8, duration: 18 },
    { src: "/icons/img7.jpg", top: "90%", left: "70%", delay: 5, blur: "1px", opacity: 0.45, scale: 1.1, duration: 8 },
  ];

  return (
    <section
      ref={containerRef}
      className="relative w-full min-h-[100dvh] h-auto flex flex-col items-center justify-center bg-white pt-12 pb-20 md:py-20"
    >
      {/* Background Decorative Gradient */}
      <div className="absolute inset-0 z-0 pointer-events-none opacity-50">
        <div className="absolute top-0 right-0 w-[60vw] h-[60vw] bg-rose-50 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/2" />
        <div className="absolute bottom-0 left-0 w-[50vw] h-[50vw] bg-gray-50 rounded-full blur-[100px] translate-y-1/2 -translate-x-1/2" />
      </div>

      {/* Floating Background Icons */}
      {floatingIcons.map((icon, idx) => (
        <FloatingIcon key={idx} {...icon} />
      ))}

      <div className="relative z-10 w-full max-w-[1400px] mx-auto px-4 sm:px-8 xl:px-12 flex flex-col h-auto items-center justify-center">
        {/* Airplane Sandwich Layer: z-20 (Between Text z-10 and Image z-30) */}
        <FlightAnimation isMobile={isMobile} />

        <div className="flex flex-col lg:flex-row gap-2 lg:gap-12 xl:gap-16 items-center justify-center w-full min-h-0 relative">

          {/* Left Side: Profile Image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="flex-shrink-0 w-full max-w-[140px] sm:max-w-[280px] lg:max-w-[340px] xl:max-w-[380px] perspective-1000 mt-20 md:mt-10 lg:mt-0 relative z-[30]"
          >
            <motion.div
              whileHover={{ scale: 1.03 }}
              transition={{ type: "spring", stiffness: 300, damping: 25 }}
              className="relative aspect-[3/3] md:aspect-[4/5] bg-gray-100 rounded-[2.5rem] overflow-hidden shadow-2xl group border-[10px] border-white ring-1 ring-gray-100"
            >
              <img
                src="/photo.jpeg"
                alt="Shriram Saini"
                className="w-full h-full object-cover object-[center_20%] transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-black/50 via-transparent to-transparent pointer-events-none" />
              <div className="absolute bottom-6 left-6">
                <div className="flex items-center gap-2">
                  <div className="h-0.5 w-8 bg-rose-500" />
                  <span className="text-white text-[8px] sm:text-[9px] font-black tracking-[0.3em] uppercase opacity-80">Video Editor</span>
                </div>
              </div>
            </motion.div>
          </motion.div>

          {/* Right Side: Primary Content with Glassmorphic Anchor */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="flex flex-col justify-center gap-6 lg:gap-8 min-w-0 w-full lg:flex-1 px-5 pt-2 pb-2 sm:p-6 lg:p-10 bg-white/20 backdrop-blur-md rounded-[2.5rem] border border-white/40 shadow-[0_20px_50px_-20px_rgba(0,0,0,0.05)] relative z-[10]"
          >

            {/* Name & Title */}
            <div className="space-y-3 sm:space-y-4">
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="inline-flex items-center gap-2 bg-rose-50 px-3 py-0 rounded-full border border-rose-100/50"
              >
                <div className="w-1.5 h-1.5 bg-rose-500 rounded-full animate-pulse" />
                <span className="text-rose-600 text-[10px] font-bold tracking-widest uppercase">Professional Portfolio</span>
              </motion.div>

              <motion.h2
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="text-[clamp(2rem,5vw,4rem)] font-crazy text-gray-900 leading-[1] tracking-tighter"
              >
                SHRIRAM <span className="text-rose-600">SAINI</span>
              </motion.h2>

              <motion.p
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
                className="text-[clamp(0.9rem,1.2vw,1.1rem)] font-qanelas font-medium text-gray-500 leading-relaxed max-w-[800px]"
              >
                <span className="md:hidden">
                  Passionate Video Editor with 2+ years of experience. I transform raw footage into cinematic stories through creative storytelling and professional editing.
                </span>
                <span className="hidden md:block">
                  I’m a passionate Video Editor with 2+ years of experience in YouTube and Social Media content. I turn raw footage into cinematic stories using motion graphics and modern visual effects. I enjoy turning raw footage into something creative and meaningful through storytelling and clean editing. My focus is to create content that connects with the audience and looks professional.
                </span>
              </motion.p>
            </div>

            {/* Stats Block (Premium Glassmorphism) */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="relative p-3.5 sm:p-6 bg-white/60 backdrop-blur-xl rounded-[2rem] flex gap-4 sm:gap-0 items-center justify-between overflow-hidden"
              style={{
                border: "2px solid transparent",
                backgroundImage: "linear-gradient(white, white), linear-gradient(135deg, #FF94B2, #FFEBF2, #FF94B2)",
                backgroundOrigin: "border-box",
                backgroundClip: "padding-box, border-box",
                backgroundSize: "200% 200%",
                boxShadow: "0 10px 40px rgba(244, 63, 94, 0.05)"
              }}
              animate={{
                backgroundPosition: ["0% 0%", "100% 100%", "0% 0%"],
              }}
              transition={{
                delay: 0.4,
                backgroundPosition: { duration: 6, repeat: Infinity, ease: "linear" }
              }}
            >
              {[
                { label: "Experience", value: 2, suffix: "+" },
                { label: "Projects", value: 120, suffix: "+" },
                { label: "Satisfaction", value: 93, suffix: "%" },
              ].map((stat, i) => (
                <div key={i} className="flex flex-1 items-center justify-center gap-6 xl:gap-8">
                  <div className="flex flex-col items-center text-center">
                    <div className="flex items-baseline justify-center gap-1.5 mb-0.5">
                      <span className="text-[clamp(1.5rem,3vw,2.5rem)] font-black text-gray-900 tracking-tighter leading-none">
                        <CountUp end={stat.value} suffix={stat.suffix} />
                      </span>
                      {stat.label === "Experience" && (
                        <span className="text-[10px] sm:text-xs font-bold text-gray-400">Yrs</span>
                      )}
                    </div>
                    <span className="text-[8.5px] sm:text-[11px] uppercase font-bold tracking-wider sm:tracking-[0.2em] text-gray-500 break-words text-center">
                      {stat.label}
                    </span>
                  </div>
                  {i < 2 && (
                    <div className="h-10 w-px bg-rose-50 hidden sm:block" />
                  )}
                </div>
              ))}
            </motion.div>
          </motion.div>
        </div>

        {/* Bottom Section: Software Grid (Compacted) */}
        <div className="w-full mt-0 sm:mt-8 lg:mt-12 space-y-4 sm:space-y-5 lg:space-y-6">
          <div className="flex items-center gap-4">
            <span className="text-xl sm:text-2xl lg:text-3xl font-crazy uppercase tracking-[0.2em] text-black">Software</span>
            <div className="flex-1 h-px bg-gray-100" />
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-6 gap-3 sm:gap-4 w-full">
            {skills.map((skill, index) => (
              <SkillBar
                key={skill.name}
                {...skill}
                delay={index * 0.05}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ResumeSection;
