import { useState } from 'react';
import Nav from './components/nav';
import Hero from './components/hero';
import Skills from './components/skills';
import Projects from './components/projects';
import Tools from './components/tools';
import Contact from './components/contact';
import useSectionObserver from './hooks/useSectionObserver';

function App() {
  const [activeSection, setActiveSection] = useState('home');

  // This hook automatically updates which link is active in the nav
  useSectionObserver(setActiveSection);

  // 1. Create a smooth-scrolling function
  const handleScrollToTarget = (targetElement) => {
    if (targetElement) {
      targetElement.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      {/* 2. Pass the new function as the scrollToTarget prop */}
      <Nav scrollToTarget={handleScrollToTarget} activeSection={activeSection} />

      <main>
        {/* Pass the function to the Hero component as well */}
        <Hero scrollToTarget={handleScrollToTarget} />
        
        <Skills />
        <Tools />
        <Projects />
        <Contact />
      </main>
    </>
  );
}

export default App;