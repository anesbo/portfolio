// src/hooks/useLenis.js
import { useEffect, useRef } from 'react';
import Lenis from '@studio-freight/lenis';

function useLenis() {
  const lenisRef = useRef(null);

  useEffect(() => {
    // Initialize Lenis
    const lenis = new Lenis({
      duration: 1.2, // Adjust duration for scroll speed
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // Default easing
      smoothWheel: true, // Enable smooth scrolling for mouse wheel
      smoothTouch: false, // Optional: disable for touch devices
      touchMultiplier: 2, // Optional: adjust touch scroll speed
    });

    lenisRef.current = lenis; // Store the instance

    // Animation loop
    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    // Cleanup on unmount
    return () => {
      lenis.destroy();
      lenisRef.current = null;
    };
  }, []); // Run only once

  return lenisRef; // Return the ref containing the Lenis instance
}

export default useLenis;