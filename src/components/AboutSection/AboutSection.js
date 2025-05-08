import React, { useState, useEffect } from 'react';
import './AboutSection.css';

// Sample image array - replace with your actual images
const images = [
  '/img/rituals1.jpg',
  '/img/rituals2.jpg',
  '/img/rituals3.jpg',
  '/img/rituals4.jpg',
  '/img/rituals5.jpg',
  '/img/rituals6.jpg',
  '/img/rituals7.jpg',
  '/img/rituals8.jpg',
  '/img/rituals9.jpg',
  '/img/rituals10.jpg',
];

const AboutSection = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    // Change image every 500ms
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => 
        (prevIndex + 1) % images.length
      );
    }, 500);

    // Clean up interval on component unmount
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="about-section">
      <div className="about-text">
        <h2>
        We are a culture-led team where every voice counts—driven by shared rituals like All Hands, Reading Sessions, Razor Cuts, and daily co-working hours that spark learning, inspiration, and impactful design.
        </h2>
      </div>
      <div className="about-image-container">
        <img 
          src={images[currentImageIndex]} 
          alt="Showcase" 
          className="changing-image"
        />
      </div>
    </div>
  );
};

export default AboutSection; 