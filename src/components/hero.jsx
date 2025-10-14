import React, { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { useGSAP } from '@gsap/react';
import { SplitText } from "gsap/SplitText"; // Correct import path
import '../styles/hero.css';

// Register the GSAP plugin
gsap.registerPlugin(SplitText);

function Hero({ scrollToTarget }) {
  // Refs for the mouse parallax effect
  const heroRef = useRef(null);
  const imageRef = useRef(null);

  // Refs for the GSAP text animations
  const nameARef = useRef(null);
  const nameBRef = useRef(null);
  const nameCRef = useRef(null);
  const fancyBtnRef = useRef(null);
  const taglineH2Ref = useRef(null); // Ref for the tagline heading
  const taglinePRef = useRef(null);  // Ref for the tagline paragraph

  // This useEffect for the mouse parallax can stay as is
  useEffect(() => {
    const hero = heroRef.current;
    const image = imageRef.current;
    if (!hero || !image) return;

    const handleMouseMove = (e) => {
      const rect = hero.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;
      const rotateY = (x / rect.width) * 3;
      const rotateX = -(y / rect.height) * 3;
      image.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.1)`;
    };

    const handleMouseLeave = () => {
      image.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale(1.1)';
    };

    hero.addEventListener('mousemove', handleMouseMove);
    hero.addEventListener('mouseleave', handleMouseLeave);

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

  // This hook contains the full animation timeline
  // in src/components/Hero.jsx

useGSAP(() => {
  const nameASplit = new SplitText(nameARef.current, { type: 'chars,words' });
  const nameBSplit = new SplitText(nameBRef.current, { type: 'chars,words' });
  
  // Split the tagline paragraph into lines
  const taglinePSplit = new SplitText(taglinePRef.current, { type: 'lines' });
  
  // Create the main timeline
  const tl = gsap.timeline({ defaults: { ease: 'expo.out' } });

  // Animate the main content first
  tl.from(nameASplit.chars, { opacity:0, yPercent: 100, stagger: 0.05, duration: 1.8 }) // Removed opacity: 0
    .from(nameBSplit.chars, { opacity:0, yPercent: 100, stagger: 0.05, duration: 1.8 }, "-=1.6") // Removed opacity: 0
    .from(nameCRef.current, { opacity: 0, y: 20, duration: 1.5 }, "-=1.5")

  // Set the initial state for tagline H2
  gsap.set(taglineH2Ref.current, { opacity: 0, y: 20 });
  
  // Set initial state for tagline P lines: opacity 0 and slightly down
  // IMPORTANT: Target taglinePSplit.lines directly, not taglinePRef.current
  gsap.set(taglinePSplit.lines, { opacity: 0, y: 20 });

  // Animate the tagline line-by-line after the main timeline is complete
  tl.eventCallback("onComplete", () => {
    // Animate tagline H2
    gsap.to(taglineH2Ref.current, { opacity: 1, y: 0, duration: 1, ease: 'expo.out' });

    // Animate tagline P lines (staggered)
    gsap.to(taglinePSplit.lines, {
      opacity: 1,
      y: 0,
      duration: 1,
      ease: 'expo.out',
      stagger: 0.1, // Adjust stagger for desired effect
      delay: 0 // Delay after H2 animation starts
    });
  });

}, []);

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
          <h1 ref={nameARef} className='nameA'>ANES</h1>
          <h1 ref={nameBRef} className='nameB'>BOUZIAD</h1>
          <h2 ref={nameCRef} className='nameC'>Full Stack Dev</h2>
          <a ref={fancyBtnRef} className="fancy" onClick={handleScrollToContact}>
            <span className="top-key"></span>
            <span className="text">contact me</span>
            <span className="bottom-key-1"></span>
            <span className="bottom-key-2"></span>
          </a>
        </div>
        <div className='tagline'>
          <h2 ref={taglineH2Ref} className='our-service'>our services</h2>
          <p ref={taglinePRef} className='para'>Premium web design, development and seo services to help your business stand out</p>
        </div>
      </div>
    </main>
  );
}

export default Hero;