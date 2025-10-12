import React, { useRef, useEffect } from 'react';
import '../styles/tools.css';
import '../styles/animations.css';
import useAnimateOnScroll from '../hooks/useAnimateOnScroll';

function Tools() {
  // This ref is for the fade-in-on-scroll animation
  const gridRef = useRef(null);
  useAnimateOnScroll(gridRef);

  // This useEffect handles the 3D tilt effect for ALL cards
  useEffect(() => {
    // Find all the tool cards within the grid
    const cards = gridRef.current?.querySelectorAll('.tool-card');
    if (!cards) return;

    // Apply the logic to EACH card
    cards.forEach(card => {
      const handleMouseMove = (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;

        const rotateY = (x / rect.width) * 20;
        const rotateX = -(y / rect.height) * 20;

        card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
      };

      const handleMouseLeave = () => {
        card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0)';
      };

      card.addEventListener('mousemove', handleMouseMove);
      card.addEventListener('mouseleave', handleMouseLeave);

      // Cleanup: remove listeners when the component is unmounted
      return () => {
        card.removeEventListener('mousemove', handleMouseMove);
        card.removeEventListener('mouseleave', handleMouseLeave);
      };
    });
  }, []); // The empty array ensures this runs only once

  return (
    <section id='tools' className="tools-section scroll-section">
      <h2 className="tools-title">Tools I Use</h2>
      <div ref={gridRef} className="tools-grid">
        {/* Card 1: Flask */}
        <div className="tool-card fade-in-up">
          <img src="/pictures/flask.jpg" alt="Flask logo" />
          <div className="name">Flask</div>
          <div className="area">Backend Framework</div>
        </div>

        {/* Card 2: Git */}
        <div className="tool-card fade-in-up">
          <img src="/pictures/git.jpg" alt="Git logo" />
          <div className="name">Git</div>
          <div className="area">Version Control</div>
        </div>

        {/* Card 3: GitHub */}
        <div className="tool-card fade-in-up">
          <img src="/pictures/hub.jpg" alt="GitHub logo" />
          <div className="name">GitHub</div>
          <div className="area">Collaboration</div>
        </div>

        {/* Card 4: Supabase */}
        <div className="tool-card fade-in-up">
          <img src="/pictures/supabase.jpg" alt="Supabase logo" />
          <div className="name">Supabase</div>
          <div className="area">Backend Service</div>
        </div>
        
        {/* Card 5: NPM */}
        <div className="tool-card fade-in-up">
          <img src="/pictures/npm.svg" alt="NPM logo" />
          <div className="name">NPM</div>
          <div className="area">Package Manager</div>
        </div>
      </div>
    </section>
  );
}

export default Tools;