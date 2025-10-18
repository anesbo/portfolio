import React, { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { SplitText } from 'gsap/SplitText';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import '../styles/tools.css';

gsap.registerPlugin(SplitText, ScrollTrigger);

const toolsData = [
  { name: 'Flask', area: 'Backend Framework', imageSrc: '/pictures/flask.jpg' },
  { name: 'Git', area: 'Version Control', imageSrc: '/pictures/git.jpg' },
  { name: 'GitHub', area: 'Collaboration', imageSrc: '/pictures/hub.jpg' },
  { name: 'Supabase', area: 'Backend Service', imageSrc: '/pictures/supabase.jpg' },
  { name: 'NPM', area: 'Package Manager', imageSrc: '/pictures/npm.svg' },
];

function Tools() {
  const sectionRef = useRef(null);
  const titleRef = useRef(null);
  const noticeRef = useRef(null); // NEW: Ref for the notice div

  useGSAP(() => {
    const titleSplit = new SplitText(titleRef.current, { type: 'words' });
    const cardTexts = gsap.utils.toArray('.tool-card').map(card => ({
      name: new SplitText(card.querySelector('.name'), { type: 'chars' }),
      area: new SplitText(card.querySelector('.area'), { type: 'chars' })
    }));

    // NEW: Split the paragraphs in the notice div
    let noticeSplits = [];
    if (noticeRef.current) {
        gsap.utils.toArray(noticeRef.current.querySelectorAll('p')).forEach(p => {
            noticeSplits.push(new SplitText(p, { type: 'words' }));
        });
    }

    // --- Initial Setup: Hide all characters/words ---
    cardTexts.forEach(split => {
      gsap.set([...split.name.chars, ...split.area.chars], { yPercent: 100, opacity: 0 });
    });
    noticeSplits.forEach(split => { // NEW: Hide notice words
        gsap.set(split.words, { yPercent: 100, opacity: 0 });
    });


    // --- Create the Master Timeline ---
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: 'top 70%',
        toggleActions: 'play none none reverse',
        // Optional: you can uncomment to see start/end markers
        // markers: true, 
      }
    });

    // Animate the main title
    tl.from(titleSplit.words, {
      opacity: 0,
      yPercent: 100,
      ease: 'expo.out',
      stagger: 0.05,
      duration: 1,
    })
    // Animate the cards entrance
    .from('.tool-card', {
      opacity: 0,
      y: 60,
      rotationX: -20,
      ease: 'expo.out',
      stagger: 0.1,
      duration: 1.2,
    }, "-=0.8"); // Overlap card animation with title

    // Add the sequential text animations for cards AFTER the cards are done
    cardTexts.forEach((split, index) => {
      tl.to(split.name.chars, {
        yPercent: 0,
        opacity: 1,
        stagger: 0.03,
        duration: 0.6,
        ease: 'expo.out'
      // Use the position parameter to sequence the animations
      }, `>-0.5`); // Start this card's text animation slightly before previous one finishes

      tl.to(split.area.chars, {
        yPercent: 0,
        opacity: 1,
        stagger: 0.02,
        duration: 0.6,
        ease: 'expo.out'
      }, "<+=0.1"); // Start this slightly after the name animation starts
    });

    // NEW: Animate the notice text AFTER all card text animations
    noticeSplits.forEach(split => {
        tl.to(split.words, {
            yPercent: 0,
            opacity: 1,
            stagger: 0.02,
            duration: 0.8,
            ease: 'expo.out'
        }, ">0.3"); // Start this paragraph's animation 0.3s after the previous one finishes
    });


  }, { scope: sectionRef });

  // This useEffect handles the 3D tilt effect (no changes needed here)
  // in src/components/Tools.jsx

useEffect(() => {
  const cards = sectionRef.current?.querySelectorAll('.tool-card');
  if (!cards) return;

  cards.forEach(card => {
      // Variable to store the GSAP tween so we can kill it if needed
      let hoverTween = null; 

      const handleMouseMove = (e) => {
          const rect = card.getBoundingClientRect();
          const x = e.clientX - rect.left - rect.width / 2;
          const y = e.clientY - rect.top - rect.height / 2;
          
          // Calculate rotations based on mouse position
          const rotateY = (x / rect.width) * 25;
          const rotateX = -(y / rect.height) * 25;

          // Use GSAP to smoothly animate to the target rotation and scale
          gsap.to(card, {
              rotationX: rotateX,
              rotationY: rotateY,
              scale: 1.05, // Apply scale on hover
              duration: 0.1, // Duration for the smooth animation
              ease: 'power1.out',
              overwrite: true // Prevent conflicting animations
          });
      };

      const handleMouseLeave = () => {
          // Use GSAP to smoothly animate back to the default state
          hoverTween = gsap.to(card, {
              rotationX: 0,
              rotationY: 0,
              scale: 1, // Return to normal scale
              duration: 0.5, // Slightly longer duration for a smooth exit
              ease: 'power1.out',
              overwrite: true
          });
      };

      card.addEventListener('mousemove', handleMouseMove);
      card.addEventListener('mouseleave', handleMouseLeave);

      // Cleanup function
      return () => {
          card.removeEventListener('mousemove', handleMouseMove);
          card.removeEventListener('mouseleave', handleMouseLeave);
          // Kill any ongoing animation when the component unmounts
          if (hoverTween) hoverTween.kill(); 
      };
  });
}, []);

  return (
    <section id="tools" ref={sectionRef} className="tools-section scroll-section">
      <h2 ref={titleRef} className="tools-title">Tools I Use</h2>
      
      <div className="tools-grid">
        {toolsData.map((tool, index) => (
          <div key={tool.name} className="tool-card" data-index={index}>
            <img src={tool.imageSrc} alt={`${tool.name} logo`} />
            <div className="name">{tool.name}</div>
            <div className="area">{tool.area}</div>
          </div>
        ))}
      </div>

      {/* NEW: Add the ref to your notice div */}
      <div className='notice' ref={noticeRef}>
        <p>most of my project are using these tools</p>
        <p>
          these tools are the main tools i use frequently there is others i didnt mentioned
        </p>
      </div>
    </section>
  );
}

export default Tools;