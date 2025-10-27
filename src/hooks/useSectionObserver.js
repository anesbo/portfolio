// src/hooks/useSectionObserver.js
import { useEffect, useRef } from 'react';

function useSectionObserver(setActiveSection) {
  const observer = useRef(null);
  const timeoutRef = useRef(null); // Ref to store the timeout ID

  useEffect(() => {
    observer.current = new IntersectionObserver(
      (entries) => {
        const intersectingEntry = entries.find((entry) => entry.isIntersecting);

        if (intersectingEntry) {
          // Clear any previous timeout
          clearTimeout(timeoutRef.current);

          // Set a new timeout to update the active section after a short delay
          timeoutRef.current = setTimeout(() => {
            setActiveSection(intersectingEntry.target.id);
          }, 100); // Delay in milliseconds (adjust 100-200ms if needed)
        }
      },
      {
        threshold: 0.7, // Keep the higher threshold
      }
    );

    const sections = document.querySelectorAll('.scroll-section');
    sections.forEach((section) => {
      if(observer.current) {
         observer.current.observe(section);
      }
    });

    // Cleanup function
    return () => {
      clearTimeout(timeoutRef.current); // Clear timeout on unmount
      sections.forEach((section) => {
          if(observer.current) {
             observer.current.unobserve(section);
          }
      });
      if (observer.current) {
        observer.current.disconnect();
      }
    };
  }, [setActiveSection]);
}

export default useSectionObserver;