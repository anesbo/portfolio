import React, { useRef, useState, useEffect } from 'react';
import { gsap } from 'gsap';
import { SplitText } from 'gsap/SplitText';      // Import SplitText
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa'; // Icons for buttons
import '../styles/projects.css';

// Register GSAP plugins
gsap.registerPlugin(SplitText, ScrollTrigger);

const projectsData = [
  { name: 'Project One', description: 'A short description of the first project.', imageSrc: '/pictures/hub.jpg', linkUrl: '#', linkText: 'View on GitHub' },
  { name: 'Project Two', description: 'A short description of the second project.', imageSrc: '/pictures/git.jpg', linkUrl: '#', linkText: 'Live Demo' },
  { name: 'Project Three', description: 'A short description of the third project.', imageSrc: '/pictures/galaxy.png', linkUrl: '#', linkText: 'View on GitHub' },
];

function Projects() {
  const sectionRef = useRef(null);
  const titleRef = useRef(null);
  const sliderTrackRef = useRef(null);
  const noticeRef = useRef(null);
  const splitsRef = useRef([]); // Ref to store SplitText instances

  const [currentSlide, setCurrentSlide] = useState(0); // State to track active slide index
  const [previousSlide, setPreviousSlide] = useState(null); // State to track previous slide index for animation

  // GSAP hook for section entrance animation
  useGSAP(() => {
    const titleSplit = new SplitText(titleRef.current, { type: 'words' });
    const noticePs = noticeRef.current ? gsap.utils.toArray(noticeRef.current.querySelectorAll('p')) : [];
    let noticeSplits = [];
    if (noticePs.length > 0) {
        noticeSplits = noticePs.map(p => new SplitText(p, { type: 'words' }));
        noticeSplits.forEach(split => gsap.set(split.words, { yPercent: 100, opacity: 0 }));
    }

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: 'top 70%',
        toggleActions: 'play none none reverse',
      }
    });

    // Animate title and the whole slider container entrance
    tl.from(titleSplit.words, {
      opacity: 0, yPercent: 100, ease: 'expo.out', stagger: 0.05, duration: 1,
    })
    .from('.projects-slider', { // Animate the slider container
      opacity: 0, y: 50, ease: 'expo.out', duration: 1,
    }, "-=0.8");

    // Animate notice text after slider appears
    if (noticeSplits.length > 0) {
        noticeSplits.forEach(split => {
            tl.to(split.words, {
                yPercent: 0, opacity: 1, stagger: 0.05, duration: 2, ease: 'expo.out'
            }, ">-0.1");
        });
    }

  }, { scope: sectionRef });

useEffect(() => {
  const allProjectInfos = gsap.utils.toArray('.project-info');
  splitsRef.current = allProjectInfos.map(info => ({
      h3: new SplitText(info.querySelector('h3'), { type: 'chars' }),
      p: new SplitText(info.querySelector('p'), { type: 'chars' }),
      a: info.querySelector('a')
  }));

  // Function to set text state instantly (used for hiding)
  const setTextState = (index, direction) => {
      const split = splitsRef.current[index];
      if (!split) return;
      const chars = [...split.h3.chars, ...split.p.chars];
      if (direction === 'out') {
          gsap.set(chars, { yPercent: -100, opacity: 0 }); // Instantly hide by moving up
          gsap.set(split.a, { y: -20, opacity: 0 });
      } else { // 'in' (initial state before animating in)
           gsap.set(chars, { yPercent: 100, opacity: 0 }); // Set ready to slide up
           gsap.set(split.a, { y: 20, opacity: 0 });
      }
  };

  // Set initial state for all text except the first slide
  splitsRef.current.forEach((split, index) => {
      if (index > 0) {
          setTextState(index, 'in'); // Set non-visible slides ready to animate in
      }
  });
   // Set the very first slide's text to be visible initially
   gsap.set([...splitsRef.current[0].h3.chars, ...splitsRef.current[0].p.chars], { yPercent: 0, opacity: 1 });
   gsap.set(splitsRef.current[0].a, { y: 0, opacity: 1 });


  // Cleanup function for SplitText
  return () => {
      splitsRef.current.forEach(split => {
          split.h3.revert();
          split.p.revert();
      });
  };
}, []);


const slideTo = (index) => {
  if (!sliderTrackRef.current || index < 0 || index >= projectsData.length || index === currentSlide) return;

  const previousIndex = currentSlide;
  setCurrentSlide(index);

  const slideWidth = sliderTrackRef.current.children[0].offsetWidth;
  const scrollAmount = -slideWidth * index;

  // Get references to the DOM elements for the slides and cards
  const slides = gsap.utils.toArray('.project-slide');
  const previousSlideElement = slides[previousIndex];
  const currentSlideElement = slides[index];
  const previousCardElement = previousSlideElement?.querySelector('.project-card'); // Target the card
  const currentCardElement = currentSlideElement?.querySelector('.project-card');   // Target the card

  // Helper function to animate text IN (remains the same)
  const animateTextIn = (idx) => {
      const split = splitsRef.current[idx];
      if (!split) return;
      gsap.fromTo([...split.h3.chars, ...split.p.chars], { yPercent: 100, opacity: 0 }, { yPercent: 0, opacity: 1, stagger: 0.02, duration: 0.6, ease: 'expo.out', overwrite: true });
      gsap.fromTo(split.a, { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.6, ease: 'expo.out', delay: 0.1, overwrite: true });
  };
  // Helper function to animate text OUT (remains the same)
  const animateTextOut = (idx) => {
     const split = splitsRef.current[idx];
     if (!split) return;
      gsap.to([...split.h3.chars, ...split.p.chars], { yPercent: -100, opacity: 0, stagger: 0.01, duration: 0.4, ease: 'power1.in', overwrite: true });
      gsap.to(split.a, { y: -20, opacity: 0, duration: 0.4, ease: 'power1.in', overwrite: true });
  };

  // --- Animation Logic ---

  // 1. Animate OUT the text of the PREVIOUS slide IMMEDIATELY
  animateTextOut(previousIndex);

  // 2. Fade OUT the PREVIOUS card (not the whole slide)
  if (previousCardElement) {
      gsap.to(previousCardElement, { opacity: 0.5, scale: 0.95, duration: 0.5, ease: 'power1.inOut' });
  }

  // 3. Animate the slider track horizontally
  gsap.to(sliderTrackRef.current, {
      x: scrollAmount,
      duration: 0.7,
      ease: 'power2.inOut',
      onComplete: () => {
           // 4. Fade IN the CURRENT card AFTER it arrives
           if (currentCardElement) {
              // Ensure it starts from a slightly faded/scaled state if needed
              gsap.fromTo(currentCardElement,
                  { opacity: 0.5, scale: 0.95 },
                  { opacity: 1, scale: 1, duration: 0.5, ease: 'power1.inOut' }
              );
           }
           // 5. Animate IN the text of the CURRENT slide
          animateTextIn(index);
      }
  });
};

  return (
    <section id="projects" ref={sectionRef} className="projects-section scroll-section">
      <h2 ref={titleRef} className="projects-title">My Projects</h2>
      
      <div className="projects-slider">
        <button className="slider-button left" onClick={() => slideTo(currentSlide - 1)} disabled={currentSlide === 0}>
          <FaChevronLeft />
        </button>

        <div ref={sliderTrackRef} className="slider-track">
          {projectsData.map((project, index) => ( // Pass index here
            <div key={project.name} className="project-slide" data-index={index}> {/* Add index as data attribute */}
              <div className="project-card">
                <img src={project.imageSrc} alt={`Screenshot of ${project.name}`} />
                <div className="project-info">
                  <h3>{project.name}</h3>
                  <p>{project.description}</p>
                  <a href={project.linkUrl}>{project.linkText}</a>
                </div>
              </div>
            </div>
          ))}
        </div>

        <button className="slider-button right" onClick={() => slideTo(currentSlide + 1)} disabled={currentSlide === projectsData.length - 1}>
          <FaChevronRight />
        </button>
      </div>

      <div ref={noticeRef} className='notice'>
        <p>some of my project are public and free to use</p>
        <p>and some other are for commercial use they are available for sell </p>
      </div>
    </section>
  );
}

export default Projects;