import React from 'react';
import '../styles/skills.css'; // Import the new CSS file

function Skills() {
  return (
    <section id='skills' className="skills-section scroll-section">
      <h2 className="skills-title">Skills</h2>
      <div className="skills-grid">
        <div className="skill-card">React</div>
        <div className="skill-card">JavaScript</div>
        <div className="skill-card">HTML & CSS</div>
        <div className="skill-card">Node.js</div>
        <div className="skill-card">Python</div>
        <div className="skill-card">Next.js</div>
      </div>
    </section>
  );
}

export default Skills;