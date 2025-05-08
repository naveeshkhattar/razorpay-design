import React from 'react';
import './BlogSection.css';

const BlogSection = () => {
  return (
    <div className="blog-section">
      <div className="blog-content">
        <div className="blog-text">
          <h2>Signals to the world</h2>
          <p>If you have a creative, curious mind, then you have what we value the most.</p>
          <a href="https://medium.com/razorpay-design" className="blog-button">
            Visit our blog
          </a>
        </div>
        <div className="blog-image">
          <img src="/img/astronaut.png" alt="Creative mind" />
        </div>
      </div>
    </div>
  );
};

export default BlogSection; 