import React, { useEffect, useRef, useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";

const ScrollSnapContainer = ({ children, onSectionChange }) => {
  const containerRef = useRef(null);
  const [activeSection, setActiveSection] = useState(0);
  const isScrolling = useRef(false);
  const validChildren = React.Children.toArray(children).filter(React.isValidElement);
  const totalSections = validChildren.length;

  const scrollToSection = useCallback((index) => {
    if (index < 0 || index >= totalSections || isScrolling.current) return;

    isScrolling.current = true;
    setActiveSection(index);

    const sections = containerRef.current.children;
    if (sections[index]) {
      sections[index].scrollIntoView({ behavior: "smooth" });
    }

    // Cooldown matches the smooth scroll duration
    setTimeout(() => {
      isScrolling.current = false;
    }, 1000); // Slightly longer for clean completion
  }, [totalSections]);

  useEffect(() => {
    const handleWheel = (e) => {
      const scrollable = e.target.closest('.allow-wheel-scroll');
      if (scrollable) {
        const isAtTop = scrollable.scrollTop <= 0;
        const isAtBottom = Math.abs(scrollable.scrollHeight - scrollable.scrollTop - scrollable.clientHeight) <= 1;
        if (e.deltaY > 0 && !isAtBottom) return;
        if (e.deltaY < 0 && !isAtTop) return;
      }

      // Prevent default to stop partial stops and native momentum
      e.preventDefault();
      
      if (isScrolling.current) return;

      const threshold = 30; // Sensitive but filtered
      if (e.deltaY > threshold) {
        // Scroll Down
        scrollToSection(activeSection + 1);
      } else if (e.deltaY < -threshold) {
        // Scroll Up
        scrollToSection(activeSection - 1);
      }
    };

    const container = containerRef.current;
    if (container) {
      container.addEventListener("wheel", handleWheel, { passive: false });
    }

    return () => {
      if (container) {
        container.removeEventListener("wheel", handleWheel);
      }
    };
  }, [activeSection, scrollToSection]);

  const handleKeyDown = useCallback((e) => {
    if (isScrolling.current) return;

    if (e.key === "ArrowDown") {
      scrollToSection(activeSection + 1);
    } else if (e.key === "ArrowUp") {
      scrollToSection(activeSection - 1);
    }
  }, [activeSection, scrollToSection]);

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    
    const container = containerRef.current;
    const observerOptions = {
      root: null,
      threshold: 0.6,
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting && !isScrolling.current) {
          const index = Array.from(container.children).indexOf(entry.target);
          if (index !== -1 && index !== activeSection) {
            setActiveSection(index);
          }
        }
      });
    }, observerOptions);

    Array.from(container.children).forEach((child) => observer.observe(child));

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      observer.disconnect();
    };
  }, [activeSection, handleKeyDown]);

  useEffect(() => {
    if (onSectionChange) {
      onSectionChange(activeSection);
    }
  }, [activeSection, onSectionChange]);

  return (
    <div
      ref={containerRef}
      className="h-screen w-full overflow-x-hidden overflow-y-scroll snap-y snap-mandatory scroll-smooth hide-scrollbar selection:bg-accent/30"
      style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
    >
      {validChildren.map((child, index) => {
        return React.cloneElement(child, {
          isActive: activeSection === index,
          index
        });
      })}

      {/* Side Navigation Dots */}
      <div className="fixed right-6 top-1/2 -translate-y-1/2 hidden md:flex flex-col gap-4 z-[9999] pointer-events-none md:pointer-events-auto">
        {Array.from({ length: totalSections }).map((_, i) => (
          <button
            key={i}
            onClick={() => scrollToSection(i)}
            className={`w-2 h-2 rounded-full transition-all duration-500 ${activeSection === i
              ? "bg-accent scale-150 shadow-[0_0_10px_rgba(226,28,52,0.8)]"
              : "bg-white/20 hover:bg-white/40"
              }`}
            aria-label={`Go to section ${i + 1}`}
          />
        ))}
      </div>
    </div>
  );
};

export default ScrollSnapContainer;
