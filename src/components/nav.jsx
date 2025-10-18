import React from 'react';
import { FaMobileAlt } from 'react-icons/fa'; // Icon for the phone
import '../styles/nav.css';                   // Styles for this component

// The component receives two props from App.jsx:
// 1. scrollToTarget: The function that handles smooth scrolling.
// 2. activeSection: A string that tells us which section is currently visible.
function Nav({ scrollToTarget, activeSection }) {

  // This function finds the section by its ID and calls the scroll function
  const handleNavClick = (sectionId) => {
    const section = document.getElementById(sectionId);
    if (section) {
      scrollToTarget(section); // Pass the element to the function
    }
  };

  return (
    <nav className="nav-bar">
      {/* List of navigation links */}
      <ul className="nav-links">
        {/* Home Link */}
        <li
          className={`nav-link-item ${activeSection === 'home' ? 'active-link' : ''}`}
          onClick={() => handleNavClick('home')}
        >
          <span className="circle" aria-hidden="true"></span>
          <span className="button-text">Home</span>
        </li>

        {/* Skills Link */}
        <li
          className={`nav-link-item ${activeSection === 'skills' ? 'active-link' : ''}`}
          onClick={() => handleNavClick('skills')}
        >
          <span className="circle" aria-hidden="true"></span>
          <span className="button-text">Skills</span>
        </li>

        {/* Tools Link */}
        <li
          className={`nav-link-item ${activeSection === 'tools' ? 'active-link' : ''}`}
          onClick={() => handleNavClick('tools')}
        >
          <span className="circle" aria-hidden="true"></span>
          <span className="button-text">Tools</span>
        </li>

        {/* Projects Link */}
        <li
          className={`nav-link-item ${activeSection === 'projects' ? 'active-link' : ''}`}
          onClick={() => handleNavClick('projects')}
        >
          <span className="circle" aria-hidden="true"></span>
          <span className="button-text">Projects</span>
        </li>

        {/* Contact Link */}
        <li
          className={`nav-link-item ${activeSection === 'contact' ? 'active-link' : ''}`}
          onClick={() => handleNavClick('contact')}
        >
          <span className="circle" aria-hidden="true"></span>
          <span className="button-text">Contact</span>
        </li>
      </ul>

      {/* Contact information on the right side of the navbar */}
      <div className='contact-info'>
        <FaMobileAlt color='white' size="1.2rem" />
        <p>0540 43 24 58</p>
      </div>
    </nav>
  );
}

export default Nav;