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
  const [touchStartY, setTouchStartY] = useState(null);

  useEffect(() => {
    const handleScroll = (event) => {
      const sections = document.querySelectorAll('section');
      const totalFrames = sections.length;

      const scrollToFrame = (index) => {
        if (index < 0) index = 0;
        if (index >= totalFrames) index = totalFrames - 1;
        sections[index].scrollIntoView({ behavior: 'smooth' });
        setCurrentFrame(index);
      };

      let nextFrame = currentFrame;

      if (event.deltaY > 0) {
        nextFrame = currentFrame + 1;
      } else if (event.deltaY < 0) {
        nextFrame = currentFrame - 1;
      }

      if (nextFrame >= 0 && nextFrame < totalFrames) {
        scrollToFrame(nextFrame);
      }
    };

    const handleTouchStart = (event) => {
      setTouchStartY(event.touches[0].clientY);
    };

    const handleTouchEnd = (event) => {
      if (touchStartY === null) return;

      const touchEndY = event.changedTouches[0].clientY;
      const deltaY = touchStartY - touchEndY;

      const sections = document.querySelectorAll('section');
      const totalFrames = sections.length;

      const scrollToFrame = (index) => {
        if (index < 0) index = 0;
        if (index >= totalFrames) index = totalFrames - 1;
        sections[index].scrollIntoView({ behavior: 'smooth' });
        setCurrentFrame(index);
      };

      let nextFrame = currentFrame;

      if (deltaY > 0) {
        nextFrame = currentFrame + 1;
      } else if (deltaY < 0) {
        nextFrame = currentFrame - 1;
      }

      if (nextFrame >= 0 && nextFrame < totalFrames) {
        scrollToFrame(nextFrame);
      }

      setTouchStartY(null);
    };

    window.addEventListener('wheel', handleScroll);
    window.addEventListener('touchstart', handleTouchStart);
    window.addEventListener('touchend', handleTouchEnd);

    return () => {
      window.removeEventListener('wheel', handleScroll);
      window.removeEventListener('touchstart', handleTouchStart);
      window.removeEventListener('touchend', handleTouchEnd);
    };
  }, [currentFrame, touchStartY]);

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