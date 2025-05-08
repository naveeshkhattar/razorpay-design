import React, { useEffect, useRef } from 'react';
import './HiringSection.css';

// Define image paths from the public/img directory
const imageUrls = [
  '/img/about1.jpg',
  '/img/about2.jpg',
  '/img/about3.jpg',
  '/img/about4.jpg',
  '/img/about5.jpg',
  '/img/about6.jpg',
  '/img/about7.jpg',
  '/img/about8.jpg',
  '/img/about9.jpg',
  '/img/about10.jpg',
  '/img/about11.jpg',
  '/img/about12.jpg',
  '/img/about13.jpg',
  '/img/about14.jpg',
  '/img/about15.jpg',
  '/img/about16.jpg',
  '/img/about17.jpg',
  '/img/about18.jpg',
  '/img/about19.jpg',
  '/img/about20.jpg',
];

const HiringSection = () => {
  const imagesContainerRef = useRef(null);
  const animationRef = useRef(null);

  useEffect(() => {
    if (!imagesContainerRef.current) return;

    // Add random rotation to each image
    const images = imagesContainerRef.current.querySelectorAll('.hiring-image');
    images.forEach(img => {
      const randomRotation = Math.random() * 30 - 15; // Random value between -15 and 15
      img.style.transform = `rotate(${randomRotation}deg)`;
    });

    const container = imagesContainerRef.current;
    let isScrolling = true;
    let scrollSpeed = 0.7; // Speed in pixels per frame

    // Simple animation function
    const scroll = () => {
      if (!isScrolling || !container) return;

      // Move scroll position
      if (container.scrollLeft < container.scrollWidth - container.clientWidth) {
        container.scrollLeft += scrollSpeed;
      } else {
        container.scrollLeft = 0;
      }

      // Continue animation loop
      animationRef.current = requestAnimationFrame(scroll);
    };

    // Start scrolling immediately
    animationRef.current = requestAnimationFrame(scroll);

    // Pause on hover
    const pauseScroll = () => {
      isScrolling = false;
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };

    // Resume on mouse leave
    const resumeScroll = () => {
      isScrolling = true;
      if (!animationRef.current) {
        animationRef.current = requestAnimationFrame(scroll);
      }
    };

    // Add event listeners
    container.addEventListener('mouseenter', pauseScroll);
    container.addEventListener('mouseleave', resumeScroll);

    // Clean up on unmount
    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
      container.removeEventListener('mouseenter', pauseScroll);
      container.removeEventListener('mouseleave', resumeScroll);
    };
  }, []);

  return (
    <section className="hiring-section">
      <div className="hiring-images-container" ref={imagesContainerRef}>
        {imageUrls.map((url, index) => (
          <div className="hiring-image-wrapper" key={index}>
            <img
              src={url}
              alt={`Team member ${index + 1}`}
              className="hiring-image"
              loading="lazy"
            />
          </div>
        ))}
      </div>
      
      <div className="hiring-content">
        <h2 className="hiring-heading">Design the future of finance with us</h2>
        <a href="https://razorpay.com/jobs/" className="hiring-button">Apply Now</a>
      </div>
    </section>
  );
};

export default HiringSection; 