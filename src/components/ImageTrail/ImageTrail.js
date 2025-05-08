import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import './ImageTrail.css';

const ImageTrail = ({ images, numberOfImages = 7 }) => {
  const trailRef = useRef(null);
  const imagesRef = useRef([]);
  const mousePos = useRef({ x: 0, y: 0 });
  const cursorRef = useRef(null);

  useEffect(() => {
    // Install GSAP if not already in your project
    if (!window.gsap) {
      const script = document.createElement('script');
      script.src = 'https://cdnjs.cloudflare.com/ajax/libs/gsap/3.11.5/gsap.min.js';
      script.async = true;
      document.body.appendChild(script);
    }

    // Create the image elements
    const trail = trailRef.current;
    const cursor = document.createElement('div');
    cursor.className = 'cursor';
    trail.appendChild(cursor);
    cursorRef.current = cursor;

    // Create the images for the trail
    for (let i = 0; i < numberOfImages; i++) {
      const img = document.createElement('img');
      img.className = 'trail-image';
      img.src = images[Math.floor(Math.random() * images.length)];
      img.style.opacity = 0;
      trail.appendChild(img);
      imagesRef.current.push(img);
    }

    // Track mouse movement
    const handleMouseMove = (ev) => {
      mousePos.current.x = ev.clientX;
      mousePos.current.y = ev.clientY;
      cursor.style.left = `${ev.clientX}px`;
      cursor.style.top = `${ev.clientY}px`;
    };

    // Animation function
    const animateTrail = () => {
      let x = mousePos.current.x;
      let y = mousePos.current.y;

      imagesRef.current.forEach((img, i) => {
        // Calculate position with delay
        const delay = i * 0.08;
        gsap.to(img, {
          duration: 0.9,
          x: x,
          y: y,
          opacity: 1,
          scale: 1 - (i * 0.05),
          ease: "power3.out",
          delay: delay,
          onComplete: () => {
            // Fade out after showing
            gsap.to(img, {
              duration: 0.5,
              opacity: 0,
              scale: 0.8,
              ease: "power2.in",
            });
            
            // Replace with a new random image
            setTimeout(() => {
              img.src = images[Math.floor(Math.random() * images.length)];
            }, 500);
          }
        });
      });
    };

    // Timer for animation
    let animationTimer;
    
    const throttleAnimation = () => {
      if (!animationTimer) {
        animationTimer = setTimeout(() => {
          animateTrail();
          animationTimer = null;
        }, 100);
      }
    };

    // Add event listeners
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mousemove', throttleAnimation);

    // Cleanup
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mousemove', throttleAnimation);
      clearTimeout(animationTimer);
      
      // Clean up the DOM
      trail.innerHTML = '';
      imagesRef.current = [];
    };
  }, [images, numberOfImages]);

  return <div ref={trailRef} className="image-trail"></div>;
};

export default ImageTrail; 