import React from 'react';
import './SvgText.css';

const SvgText = ({ text = "DATA SCIENCE" }) => {
  return (
    <div className="svg-container">
      <svg className="text-svg-draw" xmlns="http://www.w3.org/2000/svg" width="100%" height="400" viewBox="0 0 2200 400">
        <text 
          x="50%" 
          y="50%" 
          dominantBaseline="middle" 
          textAnchor="middle" 
          className="svg-drawn-text"
        >
          {text}
        </text>
      </svg>
    </div>
  );
};

export default SvgText;
