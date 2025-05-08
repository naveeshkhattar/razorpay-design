import React, { useRef, useEffect, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import './BladeSection.css';

// Image imports
const images = [
  '/img/ImageTrail1.png',
  '/img/ImageTrail2.png',
  '/img/ImageTrail3.png'
];

const BladeSection = () => {
  const sectionRef = useRef(null);
  const container = useRef(null);
  
  useEffect(() => {
    // Function to calculate section visibility
    const calculateScrollRange = () => {
      if (container.current) {
        const rect = container.current.getBoundingClientRect();
        const windowHeight = window.innerHeight;
        const offsetTop = rect.top + window.scrollY;
        const start = offsetTop - windowHeight;
        const end = offsetTop + rect.height;

      }
    };
    
    // Calculate initially
    calculateScrollRange();
    
    // Recalculate on resize
    window.addEventListener('resize', calculateScrollRange);
    
    return () => {
      window.removeEventListener('resize', calculateScrollRange);
    };
  }, []);
  
  const { scrollYProgress } = useScroll({
    target: container,
    offset: ['start end', 'end start'],
  });

  return (
    <div className="blade-section" ref={sectionRef}>
      <div className="parallax-container" ref={container}>
        <Slide 
          src={images[0]} 
          direction={'left'} 
          left={"15%"} 
          texts={["11K Downloads", "30+ Products", "60+ Components"]}
          progress={scrollYProgress}
        />
        <Slide 
          src={images[1]} 
          direction={'right'} 
          left={"-20%"} 
          texts={["Complete design toolkit", "Crafted tokens", "Modular components"]}
          progress={scrollYProgress}
        />
        <Slide 
          src={images[2]} 
          direction={'left'} 
          left={"5%"} 
          texts={["Developer Friendly", "Detailed documentation", "Easy to Implement"]}
          progress={scrollYProgress}
        />
      </div>
    </div>
  );
};

const Slide = (props) => {
  const direction = props.direction === 'left' ? -1 : 1;
  const translateX = useTransform(props.progress, [0, 1], [0, 700 * direction]);
  
  return (
    <motion.div 
      style={{ x: translateX, left: props.left }} 
      className="parallax-slide"
    >
      <Phrase src={props.src} text={props.texts[0]} />
      <Phrase src={props.src} text={props.texts[1]} />
      <Phrase src={props.src} text={props.texts[2]} />
    </motion.div>
  );
};

const Phrase = ({ src, text }) => {
  return (
    <div className="phrase">
      <p>{text}</p>
      <span className="image-container">
        <img src={src} alt="Blade design" />
      </span>
    </div>
  );
};

export default BladeSection; 