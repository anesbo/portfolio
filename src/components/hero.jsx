import React from 'react';
import '../styles/hero.css';

function Hero() {
  return (
    <main id='home' className="hero-container scroll-section">
      {/* The image element now acts as the background */}
      <img 
        // The path should start from the root, not include "public"
        src="/pictures/galaxy.png" // <-- This line is fixed
        alt="A vibrant, abstract background image for the portfolio hero section"
        className="hero-background-image"
      />
      <div className='content-container'>
        <div className="content-overlay">
          <h1 className='nameA'>ANES</h1>
          <h1 className='nameB'><span className="gradient-letters">BOU</span>ZIAD</h1>
          <h2 className='nameC'>Full Stack Dev</h2>
          <a class="fancy" href="#">
            <span class="top-key"></span>
            <span class="text">contact me</span>
            <span class="bottom-key-1"></span>
            <span class="bottom-key-2"></span>
          </a>
        </div>
      </div>
    </main>
  );
}

export default Hero;