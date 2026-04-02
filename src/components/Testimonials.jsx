import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Star, CheckCircle, Loader2 } from 'lucide-react';

const defaultTestimonials = [
  {
    id: "def-1",
    name: "Praven Kumar",
    role: "Instagram Reel",
    content: "“I got my Instagram reel edited and the result was amazing. Smooth transitions, perfect timing, and a very professional look. Highly recommended!”",
    rating: 5,
    avatar: "/Avtar/avtar1.png",
    header: "/Avtar/bg.jpg"
  },
  {
    id: "def-2",
    name: "Rahul Verma",
    role: "YouTube Video Editing",
    content: "“My YouTube videos look next level now. Editing quality, cuts, and effects are perfect. Delivery was fast.”",
    rating: 3,
    avatar: "/Avtar/avtar2.png",
    header: "Avtar/bg.jpg"
  },
  {
    id: "def-3",
    name: "Aisha Khan",
    role: "Social Media Content",
    content: "“Great creativity and motion graphics. My reels are getting more engagement now.”",
    rating: 5,
    avatar: "/Avtar/avtar3.png",
    header: "Avtar/bg.jpg"
  }
];

const placeholderHeaders = [
  "/Avtar/bg.jpg",
  "/Avtar/bg.jpg",
  "/Avtar/bg.jpg",
  "/Avtar/bg.jpg",
  "/Avtar/bg.jpg"
];

const TestimonialCard = ({ name, role, content, rating, avatar, header, index = 0 }) => {
  // Resolve avatar URL:
  // - /Avtar/ paths  → frontend static asset (Vite), use as-is
  // - /uploads/ paths → backend static asset (Express), prefix with backend URL
  // - http(s):// URLs → use as-is
  const avatarSrc = avatar.startsWith('/uploads/')
    ? `http://localhost:5000${avatar}`
    : avatar;

  // Stable header: use provided header or pick deterministically by index
  const resolvedHeader = header || placeholderHeaders[index % placeholderHeaders.length];

  return (
    <motion.div
      className="flex flex-col bg-white rounded-[2rem] overflow-hidden shadow-xl w-[230px] sm:w-[320px] mx-auto group h-[280px] sm:h-[350px] min-h-[280px] sm:min-h-[350px] max-h-[280px] sm:max-h-[350px] shrink-0"
    >
      <div className="h-14 sm:h-34 w-full shrink-0 relative overflow-hidden rounded-t-[2rem]">
        <img 
          src={resolvedHeader}
          alt="header" 
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000" 
        />
        <div className="absolute inset-0 bg-black/5" />
      </div>

      <div className="relative -mt-10 sm:-mt-12 ml-6 sm:ml-8 z-10 w-fit">
        <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full border-4 border-white overflow-hidden bg-white shadow-md">
          <img 
            src={avatarSrc} 
            alt={name} 
            className="w-full h-full object-cover" 
            onError={(e) => { e.currentTarget.src = '/Avtar/avtar1.png'; }}
          />
        </div>
      </div>

      <div className="px-6 sm:px-8 py-4 sm:py-6 flex flex-col flex-grow text-left">
        <div className="mb-3">
          <div className="flex items-center gap-1.5">
            <h4 className="text-black font-black text-sm sm:text-base uppercase tracking-tight truncate">{name}</h4>
            <CheckCircle size={14} fill="#3B82F6" className="text-white shrink-0" />
          </div>
          <p className="text-black/40 font-bold text-[9px] sm:text-[10px] tracking-widest uppercase">{role || "Client Feedback"}</p>
        </div>

        <p className="text-black/70 font-bold leading-tight text-[10px] sm:text-[12px] italic mb-3 line-clamp-3">
          {content}
        </p>

        <div className="mt-auto flex gap-1 sm:gap-1.5">
          {[...Array(5)].map((_, i) => (
            <Star key={i} size={18} fill={i < rating ? "#FACC15" : "#E5E7EB"} className={`sm:w-6 sm:h-6 ${i < rating ? "text-[#FACC15]" : "text-gray-200"}`} />
          ))}
        </div>
      </div>
    </motion.div>
  );
};

const Testimonials = () => {
  const [realTestimonials, setRealTestimonials] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFeedback = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/contact');
        if (response.ok) {
          const data = await response.json();
          // Map DB fields to Card fields
          const mappedData = data.map(item => ({
            id: item._id,
            name: item.userName,
            role: "Client Feedback",
            content: item.reviewText,
            rating: item.rating,
            avatar: item.avatar || "/Avtar/avtar1.png",
            header: null // Placeholder will kick in
          }));
          setRealTestimonials(mappedData);
        }
      } catch (error) {
        console.error('Error fetching testimonials:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchFeedback();
  }, []);

  // Display strategy: Use real data if available, otherwise fallback to defaults
  let displayItems = realTestimonials.length > 0 ? realTestimonials : defaultTestimonials;

  // Only use marquee animation if we have enough items to fill the screen
  const useMarquee = displayItems.length > 4;

  return (
    <section className="h-full w-full bg-[#05070F] border-t border-white/5 relative flex flex-col pt-10 sm:pt-16 lg:pt-10 pb-4 sm:pb-6 overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_-20%,#1e3a8a33,transparent_60%)] pointer-events-none" />
      
      <div className="max-w-7xl mx-auto w-full px-6 flex flex-col relative z-10">
        <div className="text-center mb-6 sm:mb-8 shrink-0">
          <motion.span 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="text-blue-500 font-bold text-[10px] sm:text-xs uppercase tracking-[0.5em] mb-3 block"
          >
            Trusted by Creators
          </motion.span>
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-display font-black text-white tracking-tighter mb-4 sm:mb-4">
            What My <span className="text-blue-500 italic">Clients Say</span>
          </h2>
          <p className="text-white/70 font-bold text-xs sm:text-lg tracking-wide max-w-2xl mx-auto">
            {loading ? "Loading feedback..." : "High-quality video editing and motion graphics that help creators grow."}
          </p>
        </div>
      </div>

      <div className={`flex-grow flex items-center w-full min-h-0 ${useMarquee ? 'marquee-container' : 'justify-center px-4 overflow-x-auto'}`}>
        <div className={useMarquee ? 'marquee-content py-4' : 'flex gap-6 sm:gap-10 py-6 sm:py-10 flex-nowrap justify-center w-full max-w-7xl mx-auto'}>
          {displayItems.map((testimonial, i) => (
            <TestimonialCard 
              key={`${testimonial.id}-${i}`} 
              {...testimonial} 
              index={i} 
            />
          ))}
        </div>
      </div>

      <div className="max-w-7xl mx-auto w-full px-6 relative z-10">
        <div className="mt-6 sm:mt-8 mb-10 sm:mb-0 flex justify-center shrink-0">
          <a 
            href="#contact"
            className="h-12 sm:h-14 px-10 sm:px-14 flex items-center justify-center bg-white text-black font-black rounded-full text-[9px] sm:text-[11px] uppercase tracking-[0.3em] hover:bg-blue-600 hover:text-white transition-all duration-300 shadow-xl"
          >
            Contact me to start your project
          </a>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
