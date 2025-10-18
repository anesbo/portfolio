import React, { useRef,useEffect } from 'react';
import { gsap } from 'gsap';
import { SplitText } from 'gsap/SplitText';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import '../styles/Skills.css';

gsap.registerPlugin(SplitText, ScrollTrigger);

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
    const skillCardContents = gsap.utils.toArray('.skill-card-content'); // Get the content cards
    const skillContents = gsap.utils.toArray('.skill-content');

    const splits = skillContents.map(content => ({
      name: new SplitText(content.querySelector('.skill-name'), { type: 'chars' }),
      desc: new SplitText(content.querySelector('.skill-description'), { type: 'chars' })
    }));

    // --- Define the shadow states ---
    const defaultShadow = "0 4px 12px rgba(0, 0, 0, 0.1)";
    const glowShadow = "0 0 30px rgba(255, 255, 255, 0.5)";

    // --- Initial Setup ---
    splits.forEach(split => {
      gsap.set([...split.name.chars, ...split.desc.chars], { yPercent: 100, opacity: 0 });
    });
    gsap.set(skillPages, { zIndex: (i) => skillPages.length - i });
    
    gsap.set(skillPages.slice(1), { opacity: 0 });
    gsap.set(skillPages[0], { opacity: 1, scale: 1, yPercent: 0, rotationY: 0, rotationX: 0 });
    
    // Set the initial glow on the FIRST CONTENT card
    gsap.set(skillCardContents[0], { boxShadow: glowShadow });

    // Animate IN the text for the FIRST card
    gsap.to(splits[0].name.chars, { yPercent: 0, opacity: 1, stagger: 0.03, ease: 'expo.out' });
    gsap.to(splits[0].desc.chars, { yPercent: 0, opacity: 1, stagger: 0.02, ease: 'expo.out', delay: 0.1 });
    
    if (skillPages.length > 1) {
      gsap.set(skillPages[1], { yPercent: 25, scale: 0.9, rotationX: 25, rotationY: 10, opacity: 0.5 });
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
            const currentSplit = splits[i];
            const nextSplit = splits[i + 1];

            // Animate OUT the text of the CURRENT card
            tl.to([currentSplit.name.chars, currentSplit.desc.chars], { 
                yPercent: 100, opacity: 0, stagger: 0.01, ease: "power1.in" 
            }, `section-${i}`);
            
            // Animate the CURRENT page to the TOP position
            tl.to(skillPages[i], {
                yPercent: -16, opacity: 0.7, scale: 1, rotationX: -25, ease: "power2.inOut"
            }, `section-${i}`);
            
            // Remove the glow from the CURRENT card's CONTENT
            tl.to(skillCardContents[i], { boxShadow: defaultShadow }, `section-${i}`);
            
            if (i > 0) {
                tl.to(skillPages[i - 1], { opacity: 0 }, `section-${i}`);
            }

            // Animate the NEXT page to the CENTER position
            tl.to(skillPages[i + 1], {
                yPercent: 0, xPercent: -5, opacity: 1, scale: 1, rotationY: 15, rotationX: 10, ease: "power1.inOut"
            }, `section-${i}`);
            
            // Add the glow to the NEXT card's CONTENT
            tl.to(skillCardContents[i + 1], { boxShadow: glowShadow }, `section-${i}`);

            // Animate IN the text of the NEXT card
            tl.to(nextSplit.name.chars, { yPercent: 0, opacity: 1, stagger: 0.02, ease: "expo.out" }, `section-${i}`);
            tl.to(nextSplit.desc.chars, { yPercent: 0, opacity: 1, stagger: 0.01, ease: "expo.out", delay: 0.1 }, `section-${i}`);

            // Animate the UPCOMING card
            if (skillPages[i + 2]) {
                tl.to(skillPages[i + 2], {
                    yPercent: 20, scale: 1, rotationX: 50, rotationY: 15, opacity: 0.5, ease: "power1.inOut"
                }, `section-${i}`);
            }
        }
    });
  }, { scope: sectionRef });

  return (
    <section id="skills" ref={sectionRef} className="skills-section scroll-section">
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