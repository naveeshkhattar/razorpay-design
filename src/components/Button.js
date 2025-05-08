import React from 'react';
import '../App.css';

const Button = ({ children, type, onClick, className }) => {
  return (
    <button 
      className={`btn ${className ? className : ''}`}
      type={type || 'button'}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default Button; 