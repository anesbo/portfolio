import React, { useRef } from 'react';
import { gsap } from 'gsap';
import { SplitText } from 'gsap/SplitText';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import '../styles/Skills.css';

gsap.registerPlugin(SplitText, ScrollTrigger);

// Data uses percentages (e.g., 85 = 85% fill)
const skillsData = [
  { name: 'React', description: 'Dynamic user interfaces.', level: 10 },
  { name: 'HTML & CSS', description: 'Modern, beautiful websites.', level: 95 },
  { name: 'JavaScript', description: 'Complex web interactivity.', level: 80 },
  { name: 'Python', description: 'Powerful server-side logic.', level: 70 },
  { name: 'Next.js', description: 'Production-ready React apps.', level: 75 },
];

function Skills() {
  const sectionRef = useRef(null);
  const titleRef = useRef(null);

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
      opacity: 0, yPercent: 100, ease: 'expo.out', stagger: 0.05, duration: 1,
    })
    .from('.skill-card', {
      opacity: 0, y: 50, ease: 'expo.out', stagger: 0.1, duration: 1,
    }, "-=0.8")
    // Target each card's fill and animate its height
    .to('.skill-level-fill', {
      height: (i, target) => target.getAttribute('data-level') + '%', // Get level from data attribute
      ease: 'power2.inOut',
      stagger: 0.1,
      duration: 1.2,
    }, "-=1.2");

  }, { scope: sectionRef });

  return (
    <section id="skills" ref={sectionRef} className="skills-section scroll-section">
      <h2 ref={titleRef} className="skills-title">My Technical Proficiency</h2>
      
      <div className="skills-grid">
        {skillsData.map((skill) => (
          <div key={skill.name} className="skill-card">
            {/* The fill is now a background element */}
            <div 
              className="skill-level-fill"
              data-level={skill.level} // Store the level in a data attribute for GSAP
            ></div>
            
            {/* The content sits on top */}
            <div className='skill-content'>
              <h3 className="skill-name">{skill.name}</h3>
              <p className="skill-description">{skill.description}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export default Skills;