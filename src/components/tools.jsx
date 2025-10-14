import React, { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { SplitText } from 'gsap/SplitText';
import { ScrollTrigger } from 'gsap/ScrollTrigger'; // 1. Import ScrollTrigger
import { useGSAP } from '@gsap/react';
import '../styles/tools.css';

// 2. Register the GSAP plugins
gsap.registerPlugin(SplitText, ScrollTrigger);

// 3. It's much cleaner to manage your data in an array
const toolsData = [
  { name: 'Flask', area: 'Backend Framework', imageSrc: '/pictures/flask.jpg' },
  { name: 'Git', area: 'Version Control', imageSrc: '/pictures/git.jpg' },
  { name: 'GitHub', area: 'Collaboration', imageSrc: '/pictures/hub.jpg' },
  { name: 'Supabase', area: 'Backend Service', imageSrc: '/pictures/supabase.jpg' },
  { name: 'NPM', area: 'Package Manager', imageSrc: '/pictures/npm.svg' },
];

function Tools() {
  const sectionRef = useRef(null); // Ref for the entire section
  const titleRef = useRef(null);   // Ref for the title

  // 4. This useGSAP hook handles the scroll-in animations
  useGSAP(() => {
    const titleSplit = new SplitText(titleRef.current, { type: 'words' });

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: 'top 60%',
        toggleActions: 'play none none reverse',
      }
    });

    tl.from(titleSplit.words, {
      opacity: 0,
      yPercent: 100,
      ease: 'expo.out',
      stagger: 0.05,
      duration: 1,
    })
    .from('.tool-card', {
      opacity: 0,
      y: 50,
      ease: 'expo.out',
      stagger: 0.1,
      duration: 1,
    }, "-=0.8");

  }, { scope: sectionRef });

  // 5. This useEffect handles the 3D tilt effect and remains unchanged
  useEffect(() => {
    const cards = sectionRef.current?.querySelectorAll('.tool-card');
    if (!cards) return;

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

      return () => {
        card.removeEventListener('mousemove', handleMouseMove);
        card.removeEventListener('mouseleave', handleMouseLeave);
      };
    });
  }, []);

  return (
    <section id="tools" ref={sectionRef} className="tools-section scroll-section">
      <h2 ref={titleRef} className="tools-title">Tools I Use</h2>
      
      {/* 6. Map over the data array to render the cards cleanly */}
      <div className="tools-grid">
        {toolsData.map((tool) => (
          <div key={tool.name} className="tool-card">
            <img src={tool.imageSrc} alt={`${tool.name} logo`} />
            <div className="name">{tool.name}</div>
            <div className="area">{tool.area}</div>
          </div>
        ))}
      </div>
    </section>
  );
}

export default Tools;