import React, { useRef, useEffect } from 'react'; // 1. Import useEffect
import { gsap } from 'gsap';
import { SplitText } from 'gsap/SplitText';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import '../styles/tools.css';

// Register GSAP plugins
gsap.registerPlugin(SplitText, ScrollTrigger);

const toolsData = [
  // Standardized image paths (assuming they are all in /pictures/)
  { name: 'Flask', area: 'Backend Framework', imageSrc: '/pictures/flask.jpg' },
  { name: 'Git', area: 'Version Control', imageSrc: '/pictures/git.jpg' },
  { name: 'GitHub', area: 'Collaboration', imageSrc: '/pictures/hub.jpg' },
  { name: 'Supabase', area: 'Backend Service', imageSrc: '/pictures/supabase.jpg' },
];

function Tools() {
  const sectionRef = useRef(null);
  const titleRef = useRef(null);
  const noticeRef = useRef(null);

  // Hook 1: Scroll-triggered entrance animations
  useGSAP(() => {
    // Wrap animations in a function for delayed call
    const initScrollAnimations = () => {
        const titleSplit = new SplitText(titleRef.current, { type: 'words' });
        const cardTexts = gsap.utils.toArray('.tool-card').map(card => ({
          name: new SplitText(card.querySelector('.name'), { type: 'chars' }),
          area: new SplitText(card.querySelector('.area'), { type: 'chars' })
        }));
        let noticeSplits = [];
        if (noticeRef.current) {
            gsap.utils.toArray(noticeRef.current.querySelectorAll('p')).forEach(p => {
                noticeSplits.push(new SplitText(p, { type: 'words' }));
            });
        }

        // Initial Setup: Hide elements
        cardTexts.forEach(split => gsap.set([...split.name.chars, ...split.area.chars], { yPercent: 100, opacity: 0 }));
        noticeSplits.forEach(split => gsap.set(split.words, { yPercent: 100, opacity: 0 }));

        // Master Timeline for entrance
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 70%',
            toggleActions: 'play none none none',
          }
        });

        // Animate Title
        tl.from(titleSplit.words, {
          opacity: 0, yPercent: 100, ease: 'expo.out', stagger: 0.05, duration: 1,
        })
        // Animate Cards
        .from('.tool-card', {
          opacity: 0, y: 60, rotationX: -20, ease: 'expo.out', stagger: 0.1, duration: 1.2,
        }, "-=0.8");

        // Animate Card Text sequentially
        cardTexts.forEach((split) => {
          tl.to(split.name.chars, {
            yPercent: 0, opacity: 1, stagger: 0.03, duration: 0.6, ease: 'expo.out'
          }, ">-0.5")
          .to(split.area.chars, {
            yPercent: 0, opacity: 1, stagger: 0.02, duration: 0.6, ease: 'expo.out'
          }, "<+=0.1");
        });

        // Animate Notice Text
        noticeSplits.forEach(split => {
            tl.to(split.words, {
                yPercent: 0, opacity: 1, stagger: 0.02, duration: 0.8, ease: 'expo.out'
            }, ">0.3");
        });

        // Add subtle scroll parallax effect for cards
        gsap.to('.tool-card', {
            y: "10vh", // Moves down as you scroll through section
            ease: "none",
            scrollTrigger: {
                trigger: sectionRef.current,
                start: "top bottom",
                end: "bottom top",
                scrub: 1.5 // Slightly slower scrub for smoother parallax
            }
        });
    }; // End of initScrollAnimations

    // 4. Use delayedCall to prevent font loading issues
    gsap.delayedCall(0.1, initScrollAnimations);

  }, { scope: sectionRef });

  // Hook 2: 3D Tilt Hover Effect for Cards
  useEffect(() => {
    const cards = sectionRef.current?.querySelectorAll('.tool-card');
    if (!cards || cards.length === 0) return;

    // 5. Correct cleanup function structure
    const cleanups = Array.from(cards).map(card => {
        const handleMouseMove = (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;
            const rotateY = (x / rect.width) * 40; // Your value
            const rotateX = -(y / rect.height) * 40; // Your value
            const moveX = (x / rect.width) * 50; // Your value
            const moveY = (y / rect.height) * 50; // Your value

            gsap.to(card, {
                rotationX: rotateX,
                rotationY: rotateY,
                x: moveX,
                y: moveY,
                duration: 5, // Your value
                ease: 'power2.out',
            });
        };

        // --- No handleMouseLeave needed for persistence ---

        card.addEventListener('mousemove', handleMouseMove);

        // Return cleanup function for this specific card
        return () => {
            card.removeEventListener('mousemove', handleMouseMove);
            // Reset position smoothly when effect is cleaned up
            gsap.to(card, { rotationX: 0, rotationY: 0, x: 0, y: 0, duration: 0.8 });
        };
    });

    // Return a single master cleanup function
    return () => {
      cleanups.forEach(cleanup => cleanup());
    };
  }, []); // Run only once

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