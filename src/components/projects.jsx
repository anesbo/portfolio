import React from 'react';
import '../styles/projects.css'; // Import the new CSS file

function Projects() {
  return (
    <section id='projects' className="projects-section scroll-section">
      <h2 className="projects-title">My Projects</h2>
      <div className="projects-grid">
        {/* Project Card 1 */}
        <div className="project-card">
          <img src="/images/project-1.jpg" alt="Screenshot of Project One" />
          <div className="project-info">
            <h3>Project One</h3>
            <p>A short description of the first project and the technologies used.</p>
            <a href="#">View on GitHub</a>
          </div>
        </div>

        {/* Project Card 2 */}
        <div className="project-card">
          <img src="/images/project-2.jpg" alt="Screenshot of Project Two" />
          <div className="project-info">
            <h3>Project Two</h3>
            <p>A short description of the second project and the technologies used.</p>
            <a href="#">Live Demo</a>
          </div>
        </div>

        {/* Project Card 3 */}
        <div className="project-card">
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