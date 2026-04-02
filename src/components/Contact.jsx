import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useMotionValue, useTransform, useSpring, animate } from 'framer-motion';
import {
  Star,
  CheckCircle,
  Loader2,
  ChevronRight,
  Phone,
  Mail,
  X,
  Camera,
  User
} from 'lucide-react';

const CountUp = ({ to, decimal = 0, suffix = "" }) => {
  const count = useMotionValue(0);
  const rounded = useTransform(count, (latest) =>
    latest.toLocaleString(undefined, {
      minimumFractionDigits: decimal,
      maximumFractionDigits: decimal
    }) + suffix
  );

  useEffect(() => {
    const controls = animate(count, to, {
      duration: 2,
      ease: "easeOut"
    });
    return () => controls.stop();
  }, [to, count]);

  return <motion.span>{rounded}</motion.span>;
};

// Liquid Background Blob (Reference Spheres style)
const LiquidBlob = ({ color, size, duration, delay, x, y }) => (
  <motion.div
    animate={{
      x: [0, 80, -40, 0],
      y: [0, -100, 40, 0],
      scale: [1, 1.2, 0.8, 1],
    }}
    transition={{
      duration,
      repeat: Infinity,
      delay,
      ease: "easeInOut",
    }}
    className="absolute rounded-full blur-[120px] opacity-25 pointer-events-none"
    style={{
      backgroundColor: color,
      width: size,
      height: size,
      left: x,
      top: y,
    }}
  />
);

const Contact = () => {
  // Parallax Logic - DISABLED FOR STABILITY
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    mouseX.set(e.clientX - centerX);
    mouseY.set(e.clientY - centerY);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  // Review Form States
  const [reviewData, setReviewData] = useState({
    rating: 5,
    userName: '',
    reviewText: '',
    isAnonymous: false
  });

  const [avatarFile, setAvatarFile] = useState(null);
  const [avatarPreview, setAvatarPreview] = useState(null);
  const fileInputRef = useRef(null);

  const [status, setStatus] = useState('idle'); // idle, loading, error
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleRating = (val) => {
    setReviewData(prev => ({ ...prev, rating: val }));
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setReviewData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        alert("File is too large! Please upload under 5MB.");
        return;
      }
      setAvatarFile(file);
      const reader = new FileReader();
      reader.onloadend = () => setAvatarPreview(reader.result);
      reader.readAsDataURL(file);
    }
  };

  const removeAvatar = () => {
    setAvatarFile(null);
    setAvatarPreview(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const handleSubmit = async (e) => {
    if (e) e.preventDefault();

    // Validation
    if (!reviewData.userName || !reviewData.reviewText) {
      alert("Please fill in your name and feedback.");
      return;
    }

    setStatus('loading');

    try {
      const formData = new FormData();
      formData.append('rating', reviewData.rating);
      formData.append('userName', reviewData.userName);
      formData.append('reviewText', reviewData.reviewText);
      if (avatarFile) {
        formData.append('avatar', avatarFile);
      }

      const response = await fetch('http://localhost:5000/api/contact', {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        setStatus('idle');
        setIsSubmitted(true);
        setReviewData({ rating: 5, userName: '', reviewText: '', isAnonymous: false });
        setAvatarFile(null);
        setAvatarPreview(null);
        if (fileInputRef.current) fileInputRef.current.value = "";

        // Optional: Reset after a few seconds
        setTimeout(() => setIsSubmitted(false), 8000);
      } else {
        setStatus('error');
        setTimeout(() => setStatus('idle'), 5000);
      }
    } catch (error) {
      setStatus('error');
      setTimeout(() => setStatus('idle'), 5000);
    }
  };

  return (
    <section
      id="contact"
      className="allow-wheel-scroll h-[100dvh] w-full bg-[#05070F] border-t border-white/5 overflow-x-hidden overflow-y-auto lg:overflow-hidden snap-y snap-mandatory lg:snap-none block lg:flex lg:items-center lg:justify-center relative selection:bg-blue-500/30 scroll-smooth mb-30 md:mb-0"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {/* CSS Injection for Liquid Shine */}
      <style>{`
        @keyframes liquidShine {
          0% { transform: translateX(-100%) skewX(-15deg); opacity: 0; }
          20% { opacity: 0.1; }
          50% { opacity: 0.2; }
          80% { opacity: 0.1; }
          100% { transform: translateX(200%) skewX(-15deg); opacity: 0; }
        }
        .liquid-overlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(90deg, transparent, rgba(255,255,255,0.08), transparent);
          animation: liquidShine 12s infinite linear;
          pointer-events: none;
          z-index: 1;
        }
      `}</style>

      {/* Atmospheric Radial Glows */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80%] h-[80%] bg-blue-900/10 rounded-full blur-[180px]" />
        <div className="absolute top-0 right-0 w-[40%] h-[40%] bg-indigo-900/10 rounded-full blur-[150px]" />
      </div>

      {/* Floating Background Spheres */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <LiquidBlob color="#1E40AF" size="45vw" duration={20} delay={0} x="5%" y="-5%" />
        <LiquidBlob color="#4C1D95" size="35vw" duration={25} delay={5} x="65%" y="45%" />
        <LiquidBlob color="#064E3B" size="40vw" duration={22} delay={2} x="-15%" y="40%" />
      </div>

      {/* Main Responsive Container */}
      <div className="max-w-full w-full mx-auto lg:max-w-[1260px] flex flex-col lg:flex-row items-stretch h-auto lg:h-full lg:max-h-[90vh] relative z-20 lg:px-10 lg:gap-8 lg:py-0">

        {/* Left Card: Profile Glass */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="w-full h-[100dvh] lg:h-auto lg:w-[35%] flex justify-center shrink-0 snap-start px-4 sm:px-6 lg:px-0 pt-10 pb-6 lg:py-0"
        >
          <div className="backdrop-blur-[35px] bg-white/[0.04] w-full max-w-sm lg:max-w-none rounded-[2.5rem] sm:rounded-[3rem] shadow-[0_40px_100px_rgba(0,0,0,0.6)] border border-white/10 overflow-hidden group h-full flex flex-col relative">
            <div className="liquid-overlay" />

            {/* Photo */}
            <div className="relative shrink-0 overflow-hidden rounded-[1.8rem] sm:rounded-[2.2rem] m-3 sm:m-4" style={{ height: 'clamp(200px, 52%, 320px)' }}>
              <img
                src="/photo.jpeg"
                alt="Shriram Saini"
                className="w-full h-full object-cover object-top transition-transform duration-1000 group-hover:scale-105"
              />
            </div>

            {/* Info — justify-between fills card evenly */}
            <div className="flex flex-col flex-grow px-5 sm:px-6 pb-5 sm:pb-6 z-10 justify-between">

              {/* Name + Bio */}
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="text-2xl sm:text-[1.7rem] font-display font-black text-white tracking-tight leading-none">Shriram Saini</h3>
                  <motion.div
                    animate={{ scale: [1, 1.1, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                    className="w-6 h-6 rounded-full bg-blue-500 flex items-center justify-center shadow-[0_0_12px_rgba(59,130,246,0.8)] shrink-0"
                  >
                    <CheckCircle size={13} className="text-white" />
                  </motion.div>
                </div>
                <p className="text-white/50 font-medium font-sans text-xs sm:text-[13px] leading-relaxed mt-2">
                  I enjoy turning raw footage into something creative and meaningful through storytelling and clean editing.
                </p>
              </div>

              {/* Stats */}
              <div className="flex items-center justify-between py-3 border-y border-white/[0.07]">
                {[
                  { label: "Rating", to: 4.2, decimal: 1, icon: "⭐" },
                  { label: "Projects", to: 120, suffix: "+", icon: "🎬" },
                  { label: "Experience", to: 2, suffix: "+", icon: "💼" },
                ].map((stat, i) => (
                  <div key={i} className="flex items-center gap-2">
                    <span className="text-xl leading-none">{stat.icon}</span>
                    <div>
                      <div className="font-black text-white text-base sm:text-lg leading-none tracking-tight">
                        <CountUp to={stat.to} decimal={stat.decimal} suffix={stat.suffix} />
                      </div>
                      <div className="text-[9px] sm:text-[10px] text-white/35 font-semibold">{stat.label}</div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Contact Me label + bouncing arrow */}
              <div className="flex flex-col items-center gap-1">
                <span className="text-[9px] sm:text-[10px] font-black text-white/30 uppercase tracking-[0.3em]">Contact Me</span>
                <motion.div
                  animate={{ y: [0, 5, 0] }}
                  transition={{ duration: 1.2, repeat: Infinity, ease: "easeInOut" }}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="text-white/30">
                    <polyline points="6 9 12 15 18 9" />
                  </svg>
                </motion.div>
              </div>

              {/* Buttons */}
              <div className="flex items-center justify-between gap-3">
                {[
                  { id: 'tel', href: 'tel:8233453302', icon: <Phone size={20} /> },
                  { id: 'mail', href: 'mailto:videovision0202@gmail.com', icon: <Mail size={20} /> },
                  { id: 'wa', href: 'https://wa.me/918233453302', icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" /></svg> },
                ].map((btn, i) => (
                  <React.Fragment key={btn.id}>
                    <motion.a
                      href={btn.href}
                      whileHover={{ backgroundColor: "rgba(255,255,255,0.15)" }}
                      whileTap={{ scale: 0.95 }}
                      className="flex-1 h-12 sm:h-14 rounded-full bg-white/[0.07] border border-white/10 flex items-center justify-center text-white transition-all"
                    >
                      {btn.icon}
                    </motion.a>
                    {i < 2 && <div className="h-6 w-[1px] bg-white/10 shrink-0" />}
                  </React.Fragment>
                ))}
              </div>
            </div>
          </div>
        </motion.div>

        {/* Right Card: Feedback Glass Panel */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="w-full h-[100dvh] lg:h-auto lg:w-[65%] relative min-w-0 snap-start px-4 sm:px-6 lg:px-0 py-6 lg:py-0"
        >
          <motion.div
            className="backdrop-blur-[35px] bg-white/[0.03] rounded-[2.5rem] sm:rounded-[3.5rem] shadow-[0_40px_100px_rgba(0,0,0,0.6)] border border-white/10 h-full flex flex-col relative overflow-hidden"
          >
            <div className="liquid-overlay" />

            {/* Header */}
            <div className="px-6 sm:px-12 py-5 sm:py-7 flex items-center justify-between border-b border-white/5 z-20 shrink-0 relative">
              <div className="flex gap-3 sm:gap-5 items-center">
                <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl sm:rounded-2xl bg-blue-500/10 flex items-center justify-center border border-blue-500/20 shadow-[0_0_20px_rgba(59,130,246,0.15)] shrink-0">
                  <Star size={18} className="text-blue-400" />
                </div>
                <div className="min-w-0">
                  <h2 className="text-xl sm:text-2xl font-display font-black text-white tracking-tight truncate">Client Feedback</h2>
                  <p className="text-white/30 font-bold text-[8px] sm:text-[10px] uppercase tracking-[0.25em] mt-0.5 truncate">Leave your review</p>
                </div>
              </div>

              {/* Avatar Upload (Top Right) */}
              <div className="absolute right-6 sm:right-12 top-1/2 -translate-y-1/2 flex items-center">
                <div className="relative group/avatar">
                  <input
                    type="file"
                    ref={fileInputRef}
                    onChange={handleFileChange}
                    accept="image/*"
                    className="hidden"
                  />
                  <motion.button
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                    whileTap={{ scale: 0.95 }}
                    className="w-12 h-12 sm:w-16 sm:h-16 rounded-full bg-white/[0.03] border border-white/10 flex items-center justify-center overflow-hidden relative transition-all hover:border-blue-500/50 hover:bg-blue-500/10 group shadow-lg"
                  >
                    {avatarPreview ? (
                      <img src={avatarPreview} alt="preview" className="w-full h-full object-cover" />
                    ) : (
                      <div className="flex flex-col items-center text-white/20 group-hover:text-blue-400">
                        <Camera size={14} className="sm:size-5" />
                      </div>
                    )}
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity">
                      <Camera size={14} className="text-white" />
                    </div>
                  </motion.button>

                  {avatarPreview && (
                    <motion.button
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      type="button"
                      onClick={removeAvatar}
                      className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 rounded-full flex items-center justify-center text-white shadow-lg border-2 border-[#0A0E1A]"
                    >
                      <X size={10} />
                    </motion.button>
                  )}
                </div>
              </div>
            </div>

            {/* Form Content */}
            <form onSubmit={handleSubmit} className="px-6 sm:px-12 py-6 sm:py-8 space-y-6 sm:space-y-8 flex-grow flex flex-col z-10 overflow-hidden">
              {/* Rating Section */}
              <div className="space-y-3 sm:space-y-4">
                <span className="text-[8px] sm:text-[10px] font-black text-white/30 uppercase tracking-[0.4em] block text-center truncate">How would you rate my work?</span>
                <div className="flex gap-3 sm:gap-5 justify-center">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <motion.button
                      key={star}
                      type="button"
                      onClick={() => handleRating(star)}
                      whileTap={{ scale: 0.95 }}
                      className={`w-10 h-10 sm:w-14 sm:h-14 rounded-full border flex items-center justify-center transition-all duration-500 relative group overflow-hidden shrink-0 ${reviewData.rating >= star
                        ? 'bg-blue-500/10 border-blue-500/50 shadow-[0_0_30px_rgba(59,130,246,0.4)]'
                        : 'bg-white/[0.03] border-white/5'
                        }`}
                    >
                      <Star
                        size={reviewData.rating >= star ? 20 : 18}
                        fill={reviewData.rating >= star ? '#3B82F6' : 'transparent'}
                        className={reviewData.rating >= star ? 'text-blue-400 drop-shadow-[0_0_12px_rgba(59,130,246,0.8)]' : 'text-white/10 group-hover:text-white/30'}
                      />
                    </motion.button>
                  ))}
                </div>
              </div>

              {/* Inputs */}
              <div className="space-y-6 sm:space-y-8 min-h-0 flex-grow flex flex-col pt-2">
                <div className="space-y-2 sm:space-y-3 shrink-0">
                  <span className="text-[8px] sm:text-[10px] font-black text-white/30 uppercase tracking-[0.4em] block pl-1 truncate">Your Name</span>
                  <div className="relative group">
                    <input
                      name="userName"
                      value={reviewData.userName}
                      onChange={handleChange}
                      placeholder="What should I call you?"
                      className="w-full h-12 sm:h-14 bg-white/[0.03] border border-white/5 rounded-full px-6 sm:px-8 font-sans text-sm sm:text-[15px] text-white placeholder:text-white/10 focus:outline-none focus:bg-white/[0.06] focus:border-blue-500/50 shadow-inner group-hover:border-white/20 transition-all font-medium"
                    />
                  </div>
                </div>

                <div className="space-y-2 sm:space-y-3 flex-grow flex flex-col min-h-0">
                  <span className="text-[8px] sm:text-[10px] font-black text-white/30 uppercase tracking-[0.4em] block pl-1 truncate">Your Feedback</span>
                  <div className="relative group flex-grow min-h-0">
                    <textarea
                      name="reviewText"
                      value={reviewData.reviewText}
                      onChange={handleChange}
                      maxLength={200}
                      placeholder="Tell me about your experience..."
                      className="w-full h-full min-h-[120px] bg-white/[0.03] border border-white/5 rounded-[2rem] p-4 sm:p-5 font-sans text-sm sm:text-[15px] text-white placeholder:text-white/10 focus:outline-none focus:bg-white/[0.06] focus:border-blue-500/50 shadow-inner group-hover:border-white/20 transition-all resize-none font-medium leading-relaxed break-all overflow-y-auto overflow-x-hidden [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
                    />
                    <div className="absolute bottom-4 right-6 sm:bottom-6 sm:right-8">
                      <span className={`text-[9px] sm:text-[11px] font-black tracking-widest ${reviewData.reviewText.length >= 200 ? 'text-red-500' : 'text-blue-500/60'}`}>
                        {reviewData.reviewText.length} <span className="text-white/10">/</span> 200
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </form>

            {/* Submit Section */}
            <div className="px-6 sm:px-12 py-6 sm:py-8 bg-white/[0.02] border-t border-white/5 flex justify-center items-center z-10 shrink-0 min-h-[100px]">
              <AnimatePresence mode="wait">
                {!isSubmitted ? (
                  <motion.button
                    key="submitBtn"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, y: -20, scale: 0.9 }}
                    transition={{ duration: 0.4 }}
                    onClick={handleSubmit}
                    disabled={status === 'loading'}
                    whileTap={{ scale: 0.98 }}
                    className="w-full h-14 sm:h-16 relative rounded-full bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 text-white font-black font-sans uppercase tracking-[0.2em] sm:tracking-[0.3em] text-[9px] sm:text-[11px] shadow-[0_15px_30px_rgba(59,130,246,0.3)] disabled:opacity-70 group/btn overflow-hidden"
                  >
                    <div className="absolute inset-0 bg-white/20 translate-x-[-100%] group-hover/btn:translate-x-[100%] transition-transform duration-1000 ease-in-out skew-x-[30deg]" />
                    <div className="relative flex items-center justify-center gap-3 sm:gap-4 truncate px-4">
                      {status === 'loading' ? (
                        <>
                          <Loader2 className="animate-spin shrink-0" size={16} />
                          <span>Finalizing...</span>
                        </>
                      ) : (
                        <>
                          <span className="truncate">Submit Your Feedback</span>
                          <ChevronRight size={16} className="group-hover/btn:translate-x-2 transition-transform duration-300 shrink-0" />
                        </>
                      )}
                    </div>
                  </motion.button>
                ) : (
                  <motion.div
                    key="successMsg"
                    initial={{ opacity: 0, y: 15, scale: 0.9 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                    className="flex items-center justify-center gap-3 text-white font-bold tracking-widest uppercase text-[10px] sm:text-[12px]"
                  >
                    <div className="w-8 h-8 rounded-full bg-blue-500/20 flex items-center justify-center border border-blue-500/50">
                      <CheckCircle size={16} className="text-blue-400" />
                    </div>
                    <span className="text-blue-400 drop-shadow-[0_0_10px_rgba(59,130,246,0.5)]">Review Submitted Successfully</span>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default Contact;
