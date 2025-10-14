import React, { useRef } from 'react';
import { gsap } from 'gsap';
import { SplitText } from 'gsap/SplitText';
import { ScrollTrigger } from 'gsap/ScrollTrigger'; // 1. Import ScrollTrigger
import { useGSAP } from '@gsap/react';
import '../styles/projects.css';

// 2. Register the GSAP plugins
gsap.registerPlugin(SplitText, ScrollTrigger);

// 3. It's much cleaner to manage your data in an array
const projectsData = [
  { 
    name: 'Project One', 
    description: 'A short description of the first project and the technologies used.', 
    imageSrc: '/images/project-1.jpg', 
    linkUrl: '#', 
    linkText: 'View on GitHub' 
  },
  { 
    name: 'Project Two', 
    description: 'A short description of the second project and the technologies used.', 
    imageSrc: '/images/project-2.jpg', 
    linkUrl: '#', 
    linkText: 'Live Demo' 
  },
  { 
    name: 'Project Three', 
    description: 'A short description of the third project and the technologies used.', 
    imageSrc: '/images/project-3.jpg', 
    linkUrl: '#', 
    linkText: 'View on GitHub' 
  },
];

function Projects() {
  const sectionRef = useRef(null); // Ref for the entire section container
  const titleRef = useRef(null);   // Ref for the title

  // 4. This hook now handles ALL animations for this section
  useGSAP(() => {
    const titleSplit = new SplitText(titleRef.current, { type: 'words' });

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current, // Use the ref as the trigger
        start: 'top 60%', // Start animation when the section is 60% down the viewport
        toggleActions: 'play none none reverse', // Play on enter, reverse on leave
      }
    });

    // Add animations to the timeline
    tl.from(titleSplit.words, {
      opacity: 0,
      yPercent: 100,
      ease: 'expo.out',
      stagger: 0.05,
      duration: 1,
    })
    .from('.project-card', { // Target the cards within the scope
      opacity: 0,
      y: 50,
      ease: 'expo.out',
      stagger: 0.1, // Animate cards one after another
      duration: 1,
    }, "-=0.8"); // Overlap with the title animation slightly

  }, { scope: sectionRef }); // Use scope for better targeting

  return (
    <section id="projects" ref={sectionRef} className="projects-section scroll-section">
      <h2 ref={titleRef} className="projects-title">My Projects</h2>
      
      {/* 5. Map over the data array to render the cards cleanly */}
      <div className="projects-grid">
        {projectsData.map((project) => (
          <div key={project.name} className="project-card">
            <img src={project.imageSrc} alt={`Screenshot of ${project.name}`} />
            <div className="project-info">
              <h3>{project.name}</h3>
              <p>{project.description}</p>
              <a href={project.linkUrl}>{project.linkText}</a>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export default Projects;