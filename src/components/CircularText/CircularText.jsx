import { useEffect, useRef, useState } from 'react';
import './CircularText.css';

const CircularText = ({ text, spinDuration = 20, onHover = 'speedUp', className = '' }) => {
  const letters = Array.from(text);
  const containerRef = useRef(null);
  const [isHovered, setIsHovered] = useState(false);

  // We use CSS animations for the rotation - much cheaper for 100+ instances than Framer Motion
  const animationDuration = isHovered && onHover === 'speedUp' ? spinDuration / 4 : spinDuration;

  return (
    <div
      ref={containerRef}
      className={`circular-text ${className}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{
        animation: `dg-rotate ${animationDuration}s linear infinite`,
      }}
    >
      {letters.map((letter, i) => {
        const rotationDeg = (360 / letters.length) * i;
        const radius = 110; 
        const transform = `rotateZ(${rotationDeg}deg) translateY(-${radius}px)`;

        return (
          <span key={i} style={{ transform, WebkitTransform: transform }}>
            {letter}
          </span>
        );
      })}
    </div>
  );
};

export default CircularText;
