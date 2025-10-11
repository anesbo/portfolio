import { useEffect, useRef } from 'react';

function useSectionObserver(setActiveSection) {
  const observer = useRef(null);

  useEffect(() => {
    // Initialize the observer
    observer.current = new IntersectionObserver(
      (entries) => {
        // Find the entry that is currently intersecting the most
        const intersectingEntry = entries.find((entry) => entry.isIntersecting);
        if (intersectingEntry) {
          setActiveSection(intersectingEntry.target.id);
        }
      },
      {
        // The section is considered "visible" if 50% of it is in the viewport
        threshold: 0.5,
      }
    );

    // Observe all elements with the .scroll-section class
    const sections = document.querySelectorAll('.scroll-section');
    sections.forEach((section) => {
      observer.current.observe(section);
    });

    // Cleanup function to disconnect the observer
    return () => {
      if (observer.current) {
        observer.current.disconnect();
      }
    };
  }, [setActiveSection]);
}

export default useSectionObserver;