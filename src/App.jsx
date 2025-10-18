// src/App.jsx
import { useState, useRef } from 'react';
import Nav from './components/Nav';
import Hero from './components/Hero';
import Skills from './components/Skills';
import Projects from './components/Projects';
import Tools from './components/Tools';
import Contact from './components/Contact';
import useSectionObserver from './hooks/useSectionObserver';
import useLenis from './hooks/useLenis';

function App() {
  const [activeSection, setActiveSection] = useState('home');
  useSectionObserver(setActiveSection);
  const lenisRef = useLenis(); // Get the Lenis ref

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