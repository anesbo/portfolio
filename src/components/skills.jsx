import React, { useRef } from 'react';
import '../styles/Skills.css';
import '../styles/animations.css'; // 1. Import the animation styles
import useAnimateOnScroll from '../hooks/useAnimateOnScroll'; // 2. Import the new hook

function Skills() {
  const gridRef = useRef(null); // 3. Create a ref for the grid container
  useAnimateOnScroll(gridRef); // 4. Call the hook with the ref

  return (
    <section id="skills" className="skills-section scroll-section">
      <h2 className="skills-title">Skills</h2>
      {/* 5. Attach the ref to the grid */}
      <div ref={gridRef} className="skills-grid">
        <div className="skill-card fade-in-up">
          <img src="/public/pictures/react.jpg" alt="React logo" className="skill-icon" />
          <div className='container'>
            <h3 className="skill-name">React</h3>
            <p className="skill-description">Building dynamic and responsive user interfaces.</p>
          </div>
          <div className='area'>skill grade 9/10</div>
        </div>

        <div className="skill-card fade-in-up">
          <img src="/public/pictures/html.jpg" alt="React logo" className="skill-icon" />
          <div className='container'>
            <h3 className="skill-name">html</h3>
            <p className="skill-description">Building dynamic and responsive user interfaces.</p>
          </div>
          <div className='area'>skill grade 9/10</div>
        </div>

        <div className="skill-card fade-in-up">
          <img src="/public/pictures/js.jpg" alt="React logo" className="skill-icon" />
          <div className='container'>
            <h3 className="skill-name">java script</h3>
            <p className="skill-description">Building dynamic and responsive user interfaces.</p>
          </div>
          <div className='area'>skill grade 9/10</div>
        </div>

        <div className="skill-card fade-in-up">
          <img src="/public/pictures/python.jpg" alt="React logo" className="skill-icon" />
          <div className='container'>
            <h3 className="skill-name">python</h3>
            <p className="skill-description">Building dynamic and responsive user interfaces.</p>
          </div>
          <div className='area'>skill grade 9/10</div>
        </div>

        <div className="skill-card fade-in-up">
          <img src="/public/pictures/sql.jpg" alt="React logo" className="skill-icon" />
          <div className='container'>
            <h3 className="skill-name">my sql</h3>
            <p className="skill-description">Building dynamic and responsive user interfaces.</p>
          </div>
          <div className='area'>skill grade 9/10</div>
        </div>

        <div className="skill-card fade-in-up">
          <img src="/public/pictures/tailwind.jpg" alt="React logo" className="skill-icon" />
          <div className='container'>
            <h3 className="skill-name">Tail wind</h3>
            <p className="skill-description">Building dynamic and responsive user interfaces.</p>
          </div>
          <div className='area'>skill grade 9/10</div>
        </div>

        <div className="skill-card fade-in-up">
          <img src="/public/pictures/ts.jpg" alt="React logo" className="skill-icon" />
          <div className='container'>
            <h3 className="skill-name">typescript</h3>
            <p className="skill-description">Building dynamic and responsive user interfaces.</p>
          </div>
          <div className='area'>skill grade 9/10</div>
        </div>
        <div className="skill-card fade-in-up">
          <img src="/public/pictures/next.jpg" alt="React logo" className="skill-icon" />
          <div className='container'>
            <h3 className="skill-name">Nextjs.</h3>
            <p className="skill-description">Building dynamic and responsive user interfaces.</p>
          </div>
          <div className='area'>skill grade 9/10</div>
        </div>
      </div>
    </section>
  );
}

export default Skills;