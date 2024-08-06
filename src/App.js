import React from 'react';
import Navbar from './komponen/Navbar';
import Home from './komponen/Home';
import About from './komponen/About';
import Skill from './komponen/Skills';
import Portfolio from './komponen/Portofolio';
import Contact from './komponen/Contact';
import {useEffect, useState} from 'react';
import './App.css';

function App() {
  const [currentFrame, setCurrentFrame] = useState(0);
  useEffect(() => {
    const handleScroll = (event) => {
      const sections = document.querySelectorAll('section');
      const totalFrames = sections.length;

      const scrollToFrame = (index) => {
        if (index < 0) index = 0;
        if (index >= totalFrames) index = totalFrames - 1;
        sections[index].scrollIntoView({ behavior: 'smooth' });
        setCurrentFrame(index); // Update currentFrame state
      };

      let nextFrame = currentFrame;
      if (event.deltaY > 0) {
        nextFrame = currentFrame + 1;
      } else {
        nextFrame = currentFrame - 1;
      }
      if (nextFrame >= 0 && nextFrame < totalFrames) {
        scrollToFrame(nextFrame);
      }
    };

    window.addEventListener('wheel', handleScroll);

    return () => {
      window.removeEventListener('wheel', handleScroll);
    };
  }, [currentFrame]);

  return (
    <div>
      <Navbar />
      <Home />
      <About />
      <Skill />
      <Portfolio />
      <Contact />
    </div>
  );
}

export default App;