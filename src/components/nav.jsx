import React, { useState } from 'react'; // 1. Import useState
import { FaMobileAlt, FaTimes, FaChevronRight } from 'react-icons/fa'; // 2. Import icons for toggle
import '../styles/nav.css';

function Nav({ scrollToTarget, activeSection }) {
  // 3. Add state to track if the sidebar is open or closed
  const [isOpen, setIsOpen] = useState(false);

  const handleNavClick = (sectionId) => {
    const section = document.getElementById(sectionId);
    if (section) {
      scrollToTarget(section);
    }
    setIsOpen(false); // 4. Close the sidebar when a link is clicked
  };

  // 5. Function to toggle the sidebar state
  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    // Add class to nav-bar when sidebar is open for potential styling
    <nav className={`nav-bar ${isOpen ? 'sidebar-nav-active' : ''}`}>
      {/* 6. Add the toggle button */}
      <button
        className="menu-toggle"
        onClick={toggleMenu}
        aria-label="Toggle menu"
        aria-expanded={isOpen}
      >
        {/* Chevron Icon (>) - Visible when closed */}
        <span className={`icon-container chevron ${isOpen ? '' : 'is-visible'}`}>
          <FaChevronRight />
        </span>
        {/* Times Icon (X) - Visible when open */}
        <span className={`icon-container times ${isOpen ? 'is-visible' : ''}`}>
          <FaTimes />
        </span>
      </button>

      {/* 7. Conditionally add 'sidebar' and 'is-open' classes to the ul */}
      <ul className={`nav-links ${isOpen ? 'sidebar is-open' : 'sidebar'}`}>
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

      {/* Contact information */}
      <div className='contact-info'>
        <FaMobileAlt color='white' size="1.2rem" />
        <p>0540 43 24 58</p>
      </div>
    </nav>
  );
}

export default Nav;