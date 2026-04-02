import React, { Suspense, lazy, useEffect, useRef, useState } from "react";
import HeroSection from "./components/HeroSection";

// Lazy load sections below the fold for "Ultra Performance Mode"
const ResumeSection = lazy(() => import("./components/ResumeSection"));
const ShortsVideoSection = lazy(() => import("./components/ShortsVideoSection"));
const FullscreenVideoSection = lazy(() => import("./components/FullscreenVideoSection"));
const MotionGraphicSection = lazy(() => import("./components/MotionGraphicSection"));
const MotionFullscreenSection = lazy(() => import("./components/MotionFullscreenSection"));
const BroadcastSection = lazy(() => import("./components/BroadcastSection"));
const BroadcastFullscreenSection = lazy(() => import("./components/BroadcastFullscreenSection"));
const TextAnimationSection = lazy(() => import("./components/TextAnimationSection"));
const TextFullscreenSection = lazy(() => import("./components/TextFullscreenSection"));
const ScanSection = lazy(() => import("./components/ScanSection"));
const VideoShowcase = lazy(() => import("./components/VideoShowcase"));
const Testimonials = lazy(() => import("./components/Testimonials"));
const Contact = lazy(() => import("./components/Contact"));

// Lightweight skeleton for seamless loading
const SectionLoader = () => (
  <div className="h-screen w-full bg-obsidian flex items-center justify-center">
    <div className="w-12 h-12 border-2 border-white/5 border-t-white/40 rounded-full animate-spin" />
  </div>
);

import ScrollSnapContainer from "./components/ScrollSnapContainer";
import MotionSection from "./components/MotionSection";

function App() {
  const [isMobile, setIsMobile] = useState(() => 
    typeof window !== "undefined" ? window.innerWidth < 768 : false
  );

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <main className="bg-obsidian selection:bg-accent/30 selection:text-white w-full overflow-x-hidden overflow-y-hidden">
      <Suspense fallback={<SectionLoader />}>
        <ScrollSnapContainer>
          <MotionSection id="home">
            <HeroSection />
          </MotionSection>

          <MotionSection id="about">
            <ResumeSection />
          </MotionSection>

          <MotionSection id="reels">
            <ShortsVideoSection />
          </MotionSection>

          {/* Fullscreen Video Sections - Expanded as standalone points for mobile */}
          {isMobile && <MotionSection><FullscreenVideoSection reelIndex={0} /></MotionSection>}
          {isMobile && <MotionSection><FullscreenVideoSection reelIndex={1} /></MotionSection>}
          {isMobile && <MotionSection><FullscreenVideoSection reelIndex={2} /></MotionSection>}
          {!isMobile && <MotionSection><FullscreenVideoSection /></MotionSection>}

          <MotionSection id="motion">
            <MotionGraphicSection />
          </MotionSection>

          {/* Motion Fullscreen Sections */}
          {isMobile && <MotionSection><MotionFullscreenSection reelIndex={0} /></MotionSection>}
          {isMobile && <MotionSection><MotionFullscreenSection reelIndex={1} /></MotionSection>}
          {isMobile && <MotionSection><MotionFullscreenSection reelIndex={2} /></MotionSection>}
          {!isMobile && <MotionSection><MotionFullscreenSection /></MotionSection>}

          <MotionSection id="broadcast">
            <BroadcastSection />
          </MotionSection>

          {/* Broadcast Fullscreen Sections */}
          {isMobile && <MotionSection><BroadcastFullscreenSection reelIndex={0} /></MotionSection>}
          {isMobile && <MotionSection><BroadcastFullscreenSection reelIndex={1} /></MotionSection>}
          {isMobile && <MotionSection><BroadcastFullscreenSection reelIndex={2} /></MotionSection>}
          {!isMobile && <MotionSection><BroadcastFullscreenSection /></MotionSection>}

          <MotionSection id="text">
            <TextAnimationSection />
          </MotionSection>

          {/* Text Fullscreen Sections */}
          {isMobile && <MotionSection><TextFullscreenSection reelIndex={0} /></MotionSection>}
          {isMobile && <MotionSection><TextFullscreenSection reelIndex={1} /></MotionSection>}
          {isMobile && <MotionSection><TextFullscreenSection reelIndex={2} /></MotionSection>}
          {!isMobile && <MotionSection><TextFullscreenSection /></MotionSection>}

          <MotionSection>
            <ScanSection />
          </MotionSection>

          <MotionSection>
            <VideoShowcase />
          </MotionSection>

          <MotionSection id="reviews">
            <Testimonials />
          </MotionSection>

          <MotionSection id="contact">
            <Contact />
          </MotionSection>
        </ScrollSnapContainer>
      </Suspense>
    </main>
  );
}

export default App;