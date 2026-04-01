import React from 'react';
import './KeyboardText.css';

const KeyboardText = ({ text = "DATA SCIENCE", className = "" }) => {
  const words = text.split(' ');
  let globalCharIndex = 0;

  return (
    <div className={`keyboard-container ${className}`}>
      {words.map((word, wordIndex) => (
        <div key={wordIndex} className="keyboard-word">
          {word.split('').map((char) => {
            const index = globalCharIndex++;
            return (
              <span 
                key={index} 
                className="key" 
                style={{ 
                  animationName: `pressDown${(index % 8) + 1}`,
                  animationDuration: `${[2, 3, 4, 2.5, 2.5, 3.5, 2.2, 3.2][index % 8]}s`
                }}
              >
                {char}
              </span>
            );
          })}
        </div>
      ))}
    </div>
  );
};

export default KeyboardText;
