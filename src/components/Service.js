import React from 'react';
import '../App.css';

const Service = ({ title, description }) => {
  return (
    <div className="service-card">
      <h3>{title}</h3>
      <p>{description}</p>
    </div>
  );
};

export default Service; 