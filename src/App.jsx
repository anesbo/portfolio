import { useState } from 'react';
import Nav from './components/nav';
import Hero from './components/hero';
import Skills from './components/Skills';
import Projects from './components/Projects';
import Tools from './components/Tools';
import Contact from './components/Contact';
import useSnapScrolling from './hooks/useSnapScrolling';
import useSectionObserver from './hooks/useSectionObserver';

function App() {
  const [activeSection, setActiveSection] = useState('home');
  const { scrollToTarget } = useSnapScrolling(); // Get the smart scroll function

  // This hook automatically updates which link is active in the nav
  useSectionObserver(setActiveSection);

  return (
    <>
      {/* The Nav component needs both of these props to work */}
      <Nav scrollToTarget={scrollToTarget} activeSection={activeSection} />

      <main>
        {/* The Hero component needs the scrollToTarget function for its button */}
        <Hero scrollToTarget={scrollToTarget} />
        
        {/* The other sections don't need any props */}
        <Skills />
        <Tools />
        <Projects />
        <Contact />
      </main>
    </>
  );
}

export default App;