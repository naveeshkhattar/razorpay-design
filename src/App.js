import React, { useEffect, createRef } from 'react';
import './App.css';
import NavBar from './components/NavBar/NavBar';
import ImageTrailEffect from './components/ImageTrail/ImageTrailEffect';
import AboutSection from './components/AboutSection/AboutSection';
import BladeSection from './components/BladeSection/BladeSection';
import BlogSection from './components/BlogSection/BlogSection';
import HiringSection from './components/HiringSection/HiringSection';
import { Cover } from './components/ui/cover';

// Sample image paths - these are stored in public/img folder // Don't change the image format or path
const sampleImages = [
  '/img/ImageTrail1.png',
  '/img/ImageTrail2.png',
  '/img/ImageTrail3.png',
  '/img/ImageTrail4.png',
  '/img/ImageTrail5.png',
  '/img/ImageTrail6.png',
  '/img/ImageTrail7.png',
  '/img/ImageTrail8.png',
  '/img/ImageTrail9.png',
  '/img/ImageTrail10.png',
  '/img/ImageTrail11.png',
  '/img/ImageTrail12.png',
  '/img/ImageTrail13.png',
  '/img/ImageTrail14.png',
];

function App() {
  // Create a ref for scroll container
  const scrollRef = createRef();

  useEffect(() => {
    // Add loading and breathe-animation classes to the body
    document.body.classList.add('loading');
    document.body.classList.add('breathe-animation');
    
    // Cleanup function to remove the classes when component unmounts
    return () => {
      document.body.classList.remove('breathe-animation');
      document.body.classList.remove('loading');
    };
  }, []);


  return (
    <div className="App" ref={scrollRef}>
      {/* Navbar */}
      <NavBar />
      
      {/* Hero Section with Image Trail */}
      <div className="hero-section">
        <ImageTrailEffect images={sampleImages} />
        <span className="hero-text">tHE dEsign Lab</span>
      </div>
      
      {/* About Section with changing images */}
      <AboutSection />
      
      {/* Blade Logo */}
      <div className="blade-logo-container">
        <img src="/img/BladeLogo.svg" alt="Blade Logo" className="blade-logo" />
        <div className="blade-tagline">
          <span>Build amazing products at </span>
          <Cover>warp speed</Cover>
        </div>
      </div>
      
      {/* Blade Section with Parallax Effect */}
      <BladeSection />
      
      {/* Blog Link Section */}
      <BlogSection />
      
      {/* Hiring Section */}
      <HiringSection />
      
    </div>
  );
}

export default App;
