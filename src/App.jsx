import Hero from './components/hero';
import { useState } from 'react';
import Skills from './components/skills';
import Projects from './components/projects';
import Tools from './components/tools';
import useSnapScrolling from './hooks/useSnapScrolling';
import Contact from './components/contact'
import Nav from './components/nav';
import useSectionObserver from './hooks/useSectionObserver';
import './styles/hero.css'; // <-- Import the new CSS file here

function App() {
  const [activeSection, setActiveSection] = useState('home');
  const { scrollToTarget } = useSnapScrolling(); // Get the new function

  useSectionObserver(setActiveSection);
  return ( <>
    {/* 3. Pass the state and the updater function to the Nav component */}
    <Nav scrollToTarget={scrollToTarget} activeSection={activeSection} />

    {/* We will need to pass setActiveSection to the main content later */}
    <main>
      <Hero setActiveSection={setActiveSection} />
      <Skills setActiveSection={setActiveSection} />
      <Projects setActiveSection={setActiveSection} />
      <Tools setActiveSection={setActiveSection} />
      <Contact setActiveSection={setActiveSection} />
    </main>
  </>
  );
}

export default App;