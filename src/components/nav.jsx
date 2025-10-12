import React from 'react';
import { FaMobileAlt } from 'react-icons/fa';
import '../styles/nav.css'; // We'll create this CSS file next

function Nav({ scrollToTarget, activeSection }) {

  const handleNavClick = (sectionId) => {
    const section = document.getElementById(sectionId);
    if (section) {
      // Use the new, smarter scroll function
      scrollToTarget(section);
    }
  };
  return (
    <nav className="nav-bar">
      <ul className="nav-links">
        <li
          className={`nav-link-item ${activeSection === 'home' ? 'active-link' : ''}`}
          onClick={() => handleNavClick('home')}
        >
          <span className="circle" aria-hidden="true">
          </span>
          <span className="button-text">Home</span>
        </li>

        <li
          className={`nav-link-item ${activeSection === 'skills' ? 'active-link' : ''}`}
          onClick={() => handleNavClick('skills')}
        >
          <span className="circle" aria-hidden="true">
          </span>
          <span className="button-text">Skills</span>
        </li>

        <li
          className={`nav-link-item ${activeSection === 'tools' ? 'active-link' : ''}`}
          onClick={() => handleNavClick('tools')}
        >
          <span className="circle" aria-hidden="true">
          </span>
          <span className="button-text">Tools</span>
        </li>

        
        <li
          className={`nav-link-item ${activeSection === 'projects' ? 'active-link' : ''}`}
          onClick={() => handleNavClick('projects')}
        >
          <span className="circle" aria-hidden="true">

          </span>
          <span className="button-text">Projects</span>
        </li>
        <li
          className={`nav-link-item ${activeSection === 'contact' ? 'active-link' : ''}`}
          onClick={() => handleNavClick('contact')}
        >
          <span className="circle" aria-hidden="true">
          </span>
          <span className="button-text">Contact</span>
        </li>
      </ul>
      <div className='contact-info'>
        <FaMobileAlt className='phone-icon' color='white' />
        <p>0540 43 24 58</p>
      </div>
    </nav>
  );
}

export default Nav;