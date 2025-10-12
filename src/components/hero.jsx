import React, { useRef, useEffect } from 'react';
import '../styles/hero.css';

function Hero({ scrollToTarget }) {
  // Create refs to get direct access to the DOM elements
  const heroRef = useRef(null);
  const imageRef = useRef(null);

  useEffect(() => {
    const hero = heroRef.current;
    const image = imageRef.current;
    if (!hero || !image) return;

    const handleMouseMove = (e) => {
      // Get the position and size of the hero container
      const rect = hero.getBoundingClientRect();
      
      // Calculate the mouse position relative to the center of the container
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;
      
      // Define how much the image should rotate (lower number = more effect)
      const rotateY = (x / rect.width) * 3;
      const rotateX = -(y / rect.height) * 3;

      // Apply the 3D transform to the image
      image.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.1)`;
    };

    const handleMouseLeave = () => {
      // Reset the image to its default state when the mouse leaves
      image.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale(1.1)';
    };

    // Add the event listeners
    hero.addEventListener('mousemove', handleMouseMove);
    hero.addEventListener('mouseleave', handleMouseLeave);

    // Cleanup function to remove listeners when the component unmounts
    return () => {
      hero.removeEventListener('mousemove', handleMouseMove);
      hero.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  const handleScrollToContact = () => {
    const contactSection = document.getElementById('contact');
    if (contactSection) {
      scrollToTarget(contactSection);
    }
  };

  return (
    <main id='home' ref={heroRef} className="hero-container scroll-section">
      <img 
        ref={imageRef}
        src="/pictures/galaxy.png"
        alt="A vibrant, abstract background image"
        className="hero-background-image"
      />
      <div className='content-container'>
        <div className="content-overlay">
          <h1 className='nameA'>ANES</h1>
          <h1 className='nameB'><span className="gradient-letters">BOU</span>ZIAD</h1>
          <h2 className='nameC'>Full Stack Dev</h2>
          <a className="fancy" onClick={handleScrollToContact}>
            <span className="top-key"></span>
            <span className="text">contact me</span>
            <span className="bottom-key-1"></span>
            <span className="bottom-key-2"></span>
          </a>
        </div>
      </div>
    </main>
  );
}

export default Hero;