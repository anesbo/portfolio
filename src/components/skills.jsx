import React, { useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import '../styles/Skills.css';

// Register the GSAP plugin
gsap.registerPlugin(ScrollTrigger);

const skillsData = [
  { name: 'React', description: 'Dynamic user interfaces.', imageSrc: '/pictures/react.jpg' },
  { name: 'HTML & CSS', description: 'Modern, beautiful websites.', imageSrc: '/pictures/html.jpg' },
  { name: 'JavaScript', description: 'Complex web interactivity.', imageSrc: '/pictures/js.jpg' },
  { name: 'Python', description: 'Powerful server-side logic.', imageSrc: '/pictures/python.jpg' },
  { name: 'Next.js', description: 'Production-ready React apps.', imageSrc: '/pictures/next.jpg' },
];

function Skills() {
  const sectionRef = useRef(null);

  useGSAP(() => {
    const skillPages = gsap.utils.toArray('.skill-page');

    // --- Initial Setup ---
    skillPages.forEach((page, i) => {
        gsap.set(page, { zIndex: skillPages.length - i });
    });

    // Set initial state for all text content to be invisible
    gsap.set(gsap.utils.toArray('.skill-content'), { opacity: 0 });

    // Set the first card to be active (center) and its text to be visible
    gsap.set(skillPages[0], { opacity: 1, scale: 1, yPercent: 0, rotationY: 0, rotationX: 0 });
    gsap.set(skillPages[0].querySelector('.skill-content'), { opacity: 1 });

    // Set the initial state for all other cards
    gsap.set(skillPages.slice(1), { opacity: 0, scale: 0.9, yPercent: 30, rotationY: 0, rotationX: 0 });
    
    // If there's a second card, make it semi-visible in the upcoming position
    if (skillPages.length > 1) {
        gsap.set(skillPages[1], {
            yPercent: 25,
            scale: 0.9,
            rotationX: 25,
            rotationY: 10,
            opacity: 0.5
        });
    }

    // --- Create the Master Timeline ---
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        pin: true,
        scrub: 1,
        end: `+=${skillPages.length * 100}%`,
        snap: 1 / (skillPages.length - 1),
      }
    });

    // --- Create animations for each transition ---
    skillPages.forEach((page, i) => {
        if (i < skillPages.length - 1) {
            const current = skillPages[i];
            const next = skillPages[i + 1];
            const upcoming = skillPages[i + 2];
            
            const currentText = current.querySelector('.skill-content');
            const nextText = next.querySelector('.skill-content');

            // Animate CURRENT page to the TOP position using your values
            tl.to(current, {
                yPercent: -20,
                opacity: 0.7,
                scale: 0.9,
                rotationX: -25, // Your value
                ease: "power1.inOut"
            }, `section-${i}`);
            
            // Fade OUT the text of the CURRENT card
            tl.to(currentText, { opacity: 0, ease: "power1.inOut" }, `section-${i}`);
            
            // Hide the previous card that has moved off-screen
            if (i > 0) {
                const previous = skillPages[i - 1];
                tl.to(previous, { opacity: 0, ease: "power1.inOut" }, `section-${i}`);
            }

            // Animate NEXT page to the CENTER position using your values
            tl.to(next, {
                yPercent: 0,
                opacity: 1,
                scale: 1,
                rotationY: 10,  // Your value
                rotationX: 20,  // Your value
                ease: "power1.inOut"
            }, `section-${i}`);

            // Fade IN the text of the NEXT card
            tl.to(nextText, { opacity: 1, ease: "power1.inOut" }, `section-${i}`);

            // Animate UPCOMING page into view using your values
            if (upcoming) {
                tl.to(upcoming, {
                    yPercent: 25,
                    scale: 0.9,
                    rotationX: 25,    // Your value
                    rotationY: 10,    // Your value
                    opacity: 0.5,
                    ease: "power1.inOut"
                }, `section-${i}`);
            }
        }
    });
  }, { scope: sectionRef });

  return (
    <section id="skills" ref={sectionRef} className="skills-section scroll-section">
      {/* All skill pages are stacked inside the main section */}
      {skillsData.map((skill) => (
        <div key={skill.name} className="skill-page">
          <div className="skill-card-content">
            <img src={skill.imageSrc} alt="" className="skill-icon" />
            <div className='skill-content'>
              <h3 className="skill-name">{skill.name}</h3>
              <p className="skill-description">{skill.description}</p>
            </div>
          </div>
        </div>
      ))}
    </section>
  );
}

export default Skills;