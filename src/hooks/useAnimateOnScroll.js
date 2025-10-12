import { useEffect } from 'react';

function useAnimateOnScroll(containerRef) {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          // If the element is on screen, add the 'is-visible' class
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
          } else {
            // If it's NOT on screen, remove the class to reset the animation
            entry.target.classList.remove('is-visible');
          }
        });
      },
      {
        threshold: 0.2, // Start animation when 20% of the element is visible
      }
    );

    const elements = containerRef.current?.querySelectorAll('.fade-in-up');
    if (elements) {
      elements.forEach((el) => observer.observe(el));
    }

    // Cleanup function
    return () => {
      if (elements) {
        elements.forEach((el) => observer.unobserve(el));
      }
    };
  }, [containerRef]);
}

export default useAnimateOnScroll;