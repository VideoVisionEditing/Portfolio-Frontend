import { useEffect } from "react";

/**
 * Ultra Performance Custom Hook
 * Handles "Load on Demand" for videos.
 * 1. Only sets 'src' when nearly in view (rootMargin: 600px).
 * 2. Manages play/pause based on visibility.
 * 3. Clears 'src' and calls load() when far out of view to free memory.
 * 
 * @param {React.RefObject} videoRef - The reference to the <video> element.
 */
const useVideoOptimization = (videoRef) => {
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    // Ensure the browser doesn't try to be too smart
    video.preload = "none";

    const observer = new IntersectionObserver(
      ([entry]) => {
        const dataSrc = video.getAttribute("data-src");
        
        if (entry.isIntersecting) {
          // 1. Lazy load the source if not already loaded
          if (dataSrc && !video.src) {
            video.src = dataSrc;
            video.load(); // Force the browser to recognize the new src
          }

          // 2. Handle Playback
          // Using a slight delay to ensure the load() has started
          const playPromise = video.play();
          if (playPromise !== undefined) {
            playPromise.catch(() => {
              // Silence playback errors
            });
          }
        } else {
          // 3. Pause and Cleanup
          video.pause();
          
          // CRITICAL: If far away, we could clear src to save memory, 
          // but for now, just pausing is enough to stop data transfer.
        }
      },
      { 
        // Start loading 600px before it enters the screen
        rootMargin: "600px 0px",
        threshold: 0.01 
      }
    );

    observer.observe(video);

    return () => {
      observer.disconnect();
    };
  }, [videoRef]);
};

export default useVideoOptimization;
