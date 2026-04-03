import { useEffect, useRef, useState } from 'react';
import './CircularText.css';

const CircularText = ({ text, spinDuration = 20, onHover = 'speedUp', className = '', radius = 110, itemStyle = {}, isStarPattern = false }) => {
  const letters = Array.isArray(text) ? text : Array.from(text);
  const containerRef = useRef(null);
  const [isHovered, setIsHovered] = useState(false);

  // Use a constant duration to prevent "pausing/restarting" when the duration changes on touch
  const animationDuration = spinDuration;

  return (
    <div
      ref={containerRef}
      className={`circular-text ${className}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{
        animation: `dg-rotate ${animationDuration}s linear infinite`,
        willChange: 'transform'
      }}
    >
      {letters.map((letter, i) => {
        const rotationDeg = (360 / letters.length) * i;
        const baseRadius = typeof radius === 'string' ? radius : radius + 'px';
        const currentRadius = isStarPattern && (i % 2 !== 0) 
          ? `calc(${baseRadius} - 12vmin)` 
          : baseRadius;
        const transform = `rotateZ(${rotationDeg}deg) translateY(calc(-1 * ${currentRadius}))`;

        return (
          <span key={i} style={{ ...itemStyle, transform, WebkitTransform: transform, display: 'inline-flex', justifyContent: 'center', alignItems: 'center' }}>
            {letter}
          </span>
        );
      })}
    </div>
  );
};

export default CircularText;
