import React, { useRef } from 'react';
import '../styles/projects.css';
import '../styles/animations.css'; // 1. Import the animation styles
import useAnimateOnScroll from '../hooks/useAnimateOnScroll'; // 2. Import the animation hook

function Projects() {
  const gridRef = useRef(null); // 3. Create a ref for the grid container
  useAnimateOnScroll(gridRef); // 4. Call the hook with the ref

  return (
    <section id='projects' className="projects-section scroll-section">
      <h2 className="projects-title">My Projects</h2>
      {/* 5. Attach the ref to the grid */}
      <div ref={gridRef} className="projects-grid">
        
        {/* 6. Add the 'fade-in-up' class to each project card */}
        <div className="project-card fade-in-up">
          <img src="/images/project-1.jpg" alt="Screenshot of Project One" />
          <div className="project-info">
            <h3>Project One</h3>
            <p>A short description of the first project and the technologies used.</p>
            <a href="#">View on GitHub</a>
          </div>
        </div>

        <div className="project-card fade-in-up">
          <img src="/images/project-2.jpg" alt="Screenshot of Project Two" />
          <div className="project-info">
            <h3>Project Two</h3>
            <p>A short description of the second project and the technologies used.</p>
            <a href="#">Live Demo</a>
          </div>
        </div>

        <div className="project-card fade-in-up">
          <img src="/images/project-3.jpg" alt="Screenshot of Project Three" />
          <div className="project-info">
            <h3>Project Three</h3>
            <p>A short description of the third project and the technologies used.</p>
            <a href="#">View on GitHub</a>
          </div>
        </div>
        
      </div>
    </section>
  );
}

export default Projects;