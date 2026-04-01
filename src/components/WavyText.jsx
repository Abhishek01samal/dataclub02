import React from 'react';
import './WavyText.css';

const WavyText = ({ text = "DATA SCIENCE", className = "" }) => {
  const words = text.split(' ');

  return (
    <div className={`wavy-container ${className}`}>
      {words.map((word, wordIndex) => (
        <div key={wordIndex} className={`wavy-word word-${wordIndex + 1}`}>
          {word.split('').map((char, charIndex) => (
            <span 
              key={charIndex} 
              style={{ animationDelay: `${charIndex * 0.5}s` }}
            >
              {char}
            </span>
          ))}
        </div>
      ))}
    </div>
  );
};

export default WavyText;
