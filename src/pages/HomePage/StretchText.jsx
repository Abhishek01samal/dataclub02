import React, { useEffect, useRef } from 'react';
import './StretchText.css';

const StretchText = ({ text = "DATA SCIENCE" }) => {
  const containerRef = useRef(null);
  const rafRef = useRef(null);

  useEffect(() => {
    const rows = containerRef.current
      ? containerRef.current.querySelectorAll('.stretch-row')
      : [];

    const animate = () => {
      const time = Date.now() * 0.0008;

      rows.forEach((row, rowIndex) => {
        const spans = row.querySelectorAll('span');
        const phaseOffset = rowIndex === 0 ? 0 : Math.PI;
        const intensity = rowIndex === 0 ? 0.1 : 0.4;

        spans.forEach((el, i) => {
          const wave = Math.sin(time + i * 0.2 + phaseOffset);
          const scaleY = 1 + wave * intensity;
          const scaleX = 1 - Math.abs(wave) * (intensity * 0.3);
          const y = wave * 8;
          el.style.transform = `translateY(${y}px) scale(${scaleX}, ${scaleY})`;
        });
      });

      rafRef.current = requestAnimationFrame(animate);
    };

    rafRef.current = requestAnimationFrame(animate);

    // Cancel the loop on unmount to prevent memory leaks
    return () => cancelAnimationFrame(rafRef.current);
  }, []);

  const lines = text.split(' ');

  return (
    <div className="stretch-block" ref={containerRef} style={{ willChange: 'transform' }}>
      {lines.map((line, lineIndex) => (
        <div key={lineIndex} className="stretch-row">
          {line.split('').map((char, i) => (
            <span key={i}>{char}</span>
          ))}
        </div>
      ))}
    </div>
  );
};

export default StretchText;