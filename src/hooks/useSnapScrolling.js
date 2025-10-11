import { useEffect, useRef, useCallback } from 'react';
import Lenis from '@studio-freight/lenis';

function useSnapScrolling() {
  const lenisRef = useRef(null);
  const isClickScrolling = useRef(false); // Flag to pause auto-snap

  useEffect(() => {
    const lenis = new Lenis({ duration: 0.8 });
    lenisRef.current = lenis;

    // Animation loop
    const raf = (time) => {
      lenis.raf(time);
      requestAnimationFrame(raf);
    };
    requestAnimationFrame(raf);

    // --- Auto-Snap Logic ---
    let timeout;
    const handleScroll = () => {
      // If a link was clicked, do not auto-snap
      if (isClickScrolling.current) return;

      clearTimeout(timeout);
      timeout = setTimeout(() => {
        const sections = document.querySelectorAll('.scroll-section');
        const currentScroll = lenis.scroll;
        let closestSection = sections[0];
        let smallestDistance = Math.abs(closestSection.offsetTop - currentScroll);

        sections.forEach(section => {
          const distance = Math.abs(section.offsetTop - currentScroll);
          if (distance < smallestDistance) {
            smallestDistance = distance;
            closestSection = section;
          }
        });
        lenis.scrollTo(closestSection);
      }, 250); // Keep this slightly longer delay
    };

    lenis.on('scroll', handleScroll);

    // Cleanup
    return () => {
      lenis.destroy();
    };
  }, []);

  // --- Updated Function to Handle Clicks ---
  const scrollToTarget = useCallback((target) => {
    if (!lenisRef.current) return;
    
    // 1. Set the flag to true to disable the auto-snap
    isClickScrolling.current = true;
    
    // 2. Scroll to the target and provide an onComplete callback
    lenisRef.current.scrollTo(target, {
      onComplete: () => {
        // 3. This function runs ONLY when the scroll animation is finished.
        // We can now safely reset the flag.
        isClickScrolling.current = false;
      }
    });
  }, []);

  // Return the function so other components can use it
  return { scrollToTarget };
}

export default useSnapScrolling;