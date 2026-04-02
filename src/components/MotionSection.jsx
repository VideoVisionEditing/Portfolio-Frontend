import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useRef } from "react";

const MotionSection = ({ id, children, isActive, index }) => {
  const videoRef = useRef(null);
  const sectionId = id || `section-${index}`;

  // Play/Pause videos based on active state
  useEffect(() => {
    const videoElements = document.querySelectorAll('video');
    videoElements.forEach(video => {
      const parentSection = video.closest('section');
      if (parentSection && parentSection.parentElement.id === sectionId) {
        if (isActive) {
          video.play().catch(() => {}); // Catch play errors (e.g. user hasn't interacted)
        } else {
          video.pause();
        }
      }
    });
  }, [isActive, sectionId]);

  return (
    <section
      id={sectionId}
      className="relative h-screen w-full snap-start overflow-x-hidden overflow-y-hidden flex flex-col items-center justify-center bg-obsidian"
    >
      <div className="w-full h-full flex flex-col items-center justify-center p-0 m-0">
        {children}
      </div>
    </section>
  );
};

export default MotionSection;
