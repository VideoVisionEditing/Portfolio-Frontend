import React, { useState, useEffect } from 'react';
import { motion, useAnimation } from 'framer-motion';

const ScanSection = () => {
  return (
    <section className="relative w-full h-screen min-h-[800px] overflow-hidden bg-[#0A0A0A] flex items-center justify-center font-sans select-none border-t border-white/5 mb-10 md:mb-0">
      
      {/* Background Noise/Grain overlay */}
      <div 
        className="absolute inset-0 z-50 opacity-[0.08] mix-blend-overlay pointer-events-none" 
        style={{ 
          backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noiseFilter%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.8%22 numOctaves=%224%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%22 height=%22100%22 filter=%22url(%23noiseFilter)%22/%3E%3C/svg%3E")', 
          backgroundRepeat: 'repeat' 
        }}
      />

      {/* ========================================================= */}
      {/* DESKTOP LAYOUT (HIDDEN ON MOBILE)                           */}
      {/* ========================================================= */}
      <div className="hidden md:block w-full h-full absolute inset-0 z-10">

      {/* ========================================================= */}
      {/* SCENE 1, 2, 3: INTRO, CURSOR, CLICK                        */}
      {/* ========================================================= */}
      
      {/* Ambient Light Pulse behind Logo (0s - 3s) */}
      <motion.div 
        initial={{ opacity: 0, scale: 0.5 }}
        whileInView={{ opacity: [0, 0.4, 0.8, 0], scale: [0.5, 1, 1.2, 1.5] }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 3, ease: "easeInOut" }}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 rounded-full bg-blue-500/20 blur-[60px] pointer-events-none z-10"
      />

      {/* The Google Drive Logo Element */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        whileInView={{ 
          opacity: [0, 1, 1, 1, 1, 0, 0], 
          scale:   [0.8, 1, 1, 0.9, 1.05, 1.5, 3],
          filter:  ["blur(10px)", "blur(0px)", "blur(0px)", "blur(0px)", "blur(0px)", "blur(5px)", "blur(10px)"]
        }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ 
          duration: 3.5, 
          times: [0, 0.15, 0.65, 0.7, 0.8, 0.9, 1], // Timing markers matching SCENE 1-3
          ease: "easeInOut" 
        }}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20 pointer-events-none"
      >
        <div className="flex items-center justify-center relative">
           <div className="absolute inset-0 bg-white/10 blur-[50px] rounded-full scale-150"></div>
           <img src="/Derive page/drive logo.png" alt="Drive Logo" className="w-32 h-32 object-contain mx-2 drop-shadow-[0_0_20px_rgba(255,255,255,0.2)] relative z-10" />
        </div>
        <motion.div 
          initial={{ opacity: 0, scale: 0 }}
          whileInView={{ opacity: [0, 0, 0.8, 0], scale: [0, 0, 1.2, 2.5], borderWidth: ["2px", "2px", "4px", "0px"] }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 3.5, times: [0, 0.65, 0.75, 0.85], ease: "easeOut" }}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 rounded-full border-blue-400 z-10"
        />
      </motion.div>

      {/* The Cursor */}
      <motion.div
        initial={{ opacity: 0, x: "20vw", y: "20vh" }}
        whileInView={{ 
          opacity: [0, 0, 1, 1, 1, 0], 
          x: ["20vw", "20vw", "1vw", "1vw", "1vw", "5vw"],
          y: ["20vh", "20vh", "3vh", "3vh", "3vh", "10vh"],
          scale: [1, 1, 1, 0.8, 1, 1]
        }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ 
          duration: 3.5, 
          times: [0, 0.4, 0.65, 0.7, 0.75, 0.9], // Slides in at 1.4s, reaches center by 2.3s, clicks at 2.45s
          ease: "easeOut" 
        }}
        className="absolute top-1/2 left-1/2 z-30 pointer-events-none drop-shadow-xl"
      >
        {/* Simple stylized SVG Cursor */}
        <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M4 1.5L20 10.5L12 13L9 20V1.5Z" fill="white" stroke="black" strokeWidth="1.5" strokeLinejoin="round"/>
        </svg>
      </motion.div>


      {/* ========================================================= */}
      {/* SCENE 4: DASHBOARD OPEN (3.0s - 4.5s)                     */}
      {/* ========================================================= */}
      
      <div className="absolute inset-0 z-0 flex items-center justify-center pointer-events-none text-center">
        <motion.div 
          initial={{ opacity: 0, scale: 0.8, filter: "blur(20px)" }}
          whileInView={{ 
            opacity: [0, 0, 0, 1], 
            scale: [0.8, 0.8, 0.9, 1],
            filter: ["blur(20px)", "blur(20px)", "blur(10px)", "blur(0px)"]
          }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 4.5, times: [0, 0.6, 0.8, 1], ease: "easeOut" }}
          className="relative w-[1200px] h-[750px] shadow-2xl overflow-hidden flex items-center justify-center transform perspective-1000"
          style={{ 
            maskImage: 'radial-gradient(ellipse 80% 80% at 50% 50%, rgba(0,0,0,1) 40%, rgba(0,0,0,0.8) 60%, rgba(0,0,0,0) 90%)',
            WebkitMaskImage: 'radial-gradient(ellipse 80% 80% at 50% 50%, rgba(0,0,0,1) 50%, rgba(0,0,0,0.5) 75%, rgba(0,0,0,0) 90%)'
          }}
        >
          {/* Parallax hover movement applied after it settles */}
          <motion.div 
             animate={{ y: [-5, 5, -5] }}
             transition={{ duration: 8, repeat: Infinity, ease: "linear", delay: 4.5 }}
             className="w-full h-full"
          >
            <img 
              src="/Derive page/Screenshot 2026-03-30 135131.png" 
              alt="Google Drive Background" 
              className="w-full h-full object-cover rounded-xl"
              onError={(e) => {
                e.target.style.display = 'none';
                e.target.parentElement.innerHTML += '<div class="absolute inset-0 bg-[#222] flex flex-col items-center justify-center text-white"><span class="text-xl">Image not found</span></div>';
              }}
            />
          </motion.div>
        </motion.div>
      </div>


      {/* ========================================================= */}
      {/* SCENE 5: FOCUS SHIFT VIGNETTE (4.5s - 5.5s)               */}
      {/* ========================================================= */}
      
      <motion.div 
        initial={{ opacity: 0 }}
        whileInView={{ opacity: [0, 0, 1] }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 5.5, times: [0, 0.8, 1], ease: "easeInOut" }}
        className="absolute inset-0 z-10 pointer-events-none "
        style={{ background: "radial-gradient(ellipse at center, transparent 0%, rgba(0,0,0,0.4) 60%, rgba(0,0,0,0.85) 100%)" }}
      />


      {/* ========================================================= */}
      {/* SCENE 6 & 7: QR CARD REVEAL (5.5s+)                       */}
      {/* ========================================================= */}
      
      <div className="relative z-20 w-full h-full flex items-center justify-center pointer-events-none">
        
        {/* Container for QR and Arrow */}
        <div className="relative mt-32 ml-[600px] pointer-events-auto">
          
          {/* Pulse Light underneath QR code */}
          <motion.div 
             initial={{ opacity: 0 }}
             whileInView={{ opacity: 1 }}
             viewport={{ once: true, margin: "-100px" }}
             transition={{ delay: 6.5, duration: 2 }}
             className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] rounded-full bg-blue-500/10 blur-[60px] pointer-events-none z-10"
          />
          
          {/* Hand Drawn Arrow - Left/Top of QR */}
          <motion.div 
            initial={{ opacity: 0, pathLength: 0 }}
            whileInView={{ opacity: 1, pathLength: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ delay: 6.0, duration: 1 }}
            className="absolute -left-[140px] -top-[40px] z-30 flex flex-col items-center"
          >
            {/* The Text */}
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ delay: 6.5, duration: 0.8 }}
              className="text-white text-[32px] font-medium tracking-wide -rotate-6 mb-2 drop-shadow-[0_2px_10px_rgba(0,0,0,0.8)] whitespace-nowrap"
              style={{ fontFamily: "'Caveat', 'Segoe Script', cursive", textShadow: "0 4px 15px rgba(0,0,0,1)" }}
            >
              Scan here!
            </motion.div>
            
            {/* The Curved Arrow SVG with Draw Animation */}
            <svg width="120" height="80" viewBox="0 0 120 80" className="text-white ml-12 drop-shadow-[0_4px_10px_rgba(0,0,0,0.8)] filter drop-shadow">
              <motion.path 
                initial={{ pathLength: 0 }}
                whileInView={{ pathLength: 1 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 1, ease: "easeInOut", delay: 6.0 }}
                d="M 10 70 Q 30 20, 100 20" 
                fill="none" 
                stroke="currentColor" 
                strokeWidth="2.5" 
                strokeLinecap="round" 
              />
              <motion.path 
                initial={{ pathLength: 0 }}
                whileInView={{ pathLength: 1 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.5, ease: "easeOut", delay: 7.0 }}
                d="M 85 10 L 105 18 L 90 35" 
                fill="none" 
                stroke="currentColor" 
                strokeWidth="3" 
                strokeLinecap="round" 
                strokeLinejoin="round" 
              />
            </svg>
          </motion.div>

          {/* QR CODE BLOCK Reveal and Float */}
          <motion.div
            initial={{ opacity: 0, x: 100, rotateY: 20 }}
            whileInView={{ opacity: 1, x: 0, rotateY: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ delay: 5.5, duration: 1.2, type: "spring", stiffness: 60, damping: 15 }}
            className="relative z-20 bg-white/5 backdrop-blur-2xl p-6 rounded-[32px] shadow-[0_30px_80px_-10px_rgba(0,0,0,1)] border border-white/20"
          >
            {/* Continuous Float Animation */}
            <motion.div 
               animate={{ y: [-8, 8, -8] }}
               transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 6.7 }}
            >
              <div className="w-56 h-56 bg-white relative rounded-[20px] shadow-[0_15px_30px_rgba(0,0,0,0.4)] p-3">
                {/* Uploaded QR Code Image */}
                <img src="/Derive page/qr code.png" alt="Scan to unlock dashboard" className="w-full h-full object-contain" />
              </div>
            </motion.div>
          </motion.div>

        </div>
      </div>
      
      </div>

      {/* ========================================================= */}
      {/* MOBILE LAYOUT (HIDDEN ON DESKTOP)                           */}
      {/* ========================================================= */}
      <div className="md:hidden w-full h-full absolute inset-0 flex items-center justify-center p-6 z-20">
        <div className="relative w-full h-full flex items-center justify-center">
          
          {/* Phone Mockup Background */}
          <img 
            src="/Derive page/phone.jpeg" 
            alt="Mobile Interface Mockup" 
            className="w-full h-full object-contain max-w-[400px]" 
          />

          {/* Floating Mobile QR Scanner */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 30 }}
            whileInView={{ opacity: 1, scale: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5, duration: 1, type: "spring", stiffness: 60 }}
            className="absolute z-30 bg-white/10 backdrop-blur-xl p-4 rounded-[24px] shadow-[0_20px_40px_rgba(0,0,0,0.8)] border border-white/20 flex flex-col items-center"
          >
            {/* Ambient Pulse */}
            <motion.div 
               animate={{ opacity: [0.5, 1, 0.5] }}
               transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
               className="absolute inset-0 rounded-[24px] bg-blue-500/20 blur-xl -z-10"
            />

            {/* Arrow & Text (Scaled down for mobile) */}
            <motion.div 
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ delay: 1.2, duration: 0.8 }}
              className="absolute -top-[55px] -left-[20px] flex flex-col items-center z-40"
            >
              <span 
                className="text-white text-[22px] font-medium tracking-wide -rotate-6 mb-1 drop-shadow-md whitespace-nowrap"
                style={{ fontFamily: "'Caveat', 'Segoe Script', cursive", textShadow: "0 2px 8px rgba(0,0,0,0.8)" }}
              >
                Scan here!
              </span>
              <svg width="60" height="40" viewBox="0 0 120 80" className="text-white drop-shadow filter ml-4 relative -top-2">
                <path d="M 10 70 Q 30 20, 100 20" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round" />
                <path d="M 85 10 L 105 18 L 90 35" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </motion.div>

            {/* QR Floating Box */}
            <motion.div 
               animate={{ y: [-5, 5, -5] }}
               transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
            >
              <div className="w-40 h-40 bg-white relative rounded-[16px] shadow-[0_10px_20px_rgba(0,0,0,0.5)] p-2">
                <img src="/Derive page/qr code.png" alt="Scan to unlock" className="w-full h-full object-contain" />
              </div>
            </motion.div>
          </motion.div>

        </div>
      </div>

    </section>
  );
};

export default ScanSection;