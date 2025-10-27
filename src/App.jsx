// src/App.jsx
import { useState, useRef } from 'react';
import Nav from './components/nav';
import Hero from './components/hero';
import Skills from './components/skills';
import Projects from './components/projects';
import Tools from './components/tools';
import Contact from './components/contact';
import useSectionObserver from './hooks/useSectionObserver';
import useLenis from './hooks/useLenis';

function App() {
  const [activeSection, setActiveSection] = useState('home');
  useSectionObserver(setActiveSection);
  const lenisRef = useLenis();

  const handleScrollToTarget = (targetElement) => {
    if (lenisRef.current && targetElement) {
      lenisRef.current.scrollTo(targetElement, { duration: 1.5 });
    }
  };

  return (
    <>
      <Nav scrollToTarget={handleScrollToTarget} activeSection={activeSection} />

      <main>
        {/* Pass lenisRef to all sections */}
        <Hero scrollToTarget={handleScrollToTarget} lenisRef={lenisRef} />
        <Skills lenisRef={lenisRef} />
        <Tools lenisRef={lenisRef} />
        <Projects lenisRef={lenisRef} />
        <Contact lenisRef={lenisRef} />
      </main>
    </>
  );
}

export default App;