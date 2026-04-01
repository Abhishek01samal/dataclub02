import React, { useEffect, useRef, useMemo } from 'react';

const CircularText = ({
  text,
  radius,
  fontSize = '20px',
  rotationSpeed = 20,
  direction = 1,
  fontWeight = 900,
  letterSpacing = 0,
  verticalStretch = 1,
  isVisible = false,
  delay = 0,
}) => {
  const chars = text.split('');
  const angle = 360 / chars.length;

  const size = (radius + 60) * 2;
  const height = size * verticalStretch;

  const wrapperRef = useRef(null);

  // Compute a scale factor once so the rings fit any screen width.
  // The design was built for ~1440 px wide; clamp between 0.25 and 1.
  const { viewScale, isMob } = useMemo(() => {
    const vw = window.innerWidth;
    const isM = vw < 768;
    let scaleVal = 1;
    if (vw >= 1024) scaleVal = 1;
    else if (vw >= 768) scaleVal = 0.8;
    else if (vw >= 480) scaleVal = 0.65;
    else scaleVal = 0.5;

    return { viewScale: scaleVal, isMob: isM };
  }, []);

  useEffect(() => {
    if (wrapperRef.current) {
      const scaleVal = isVisible ? viewScale : 0;
      wrapperRef.current.style.opacity = isVisible ? '1' : '0';
      wrapperRef.current.style.transform = `translate(-50%, -50%) scale(${scaleVal})`;
      wrapperRef.current.style.transition = `transform 1.2s cubic-bezier(0.34, 1.56, 0.64, 1) ${delay}s, opacity 0.8s ease ${delay}s`;
    }
  }, [isVisible, delay, viewScale]);

  return (
    <div
      ref={wrapperRef}
      className="ring-wrapper"
      style={{
        width: `${size}px`,
        height: `${height}px`,
        pointerEvents: 'none',
        opacity: 0,
        transform: 'translate(-50%, -50%) scale(0)',
        transformOrigin: 'center center',
        top: '50%',
        left: '50%',
      }}
    >
      <div
        className="ring-letters"
        style={{
          width: '100%',
          height: '100%',
          transform: 'rotate(-90deg)',
          animation: isVisible 
            ? `${direction === -1 ? 'mrot' : 'rot'} ${rotationSpeed}s linear infinite`
            : 'none',
        }}
      >
        {chars.map((char, i) => {
          const rotation = i * angle;

          return (
            <span
              key={`${char}-${i}`}
              className="ring-letter"
              style={{
                fontSize,
                fontWeight,
                letterSpacing: `${letterSpacing}px`,
                position: 'absolute',
                left: '50%',
                top: '50%',
                transformOrigin: '0 0',
                color: 'white',
                WebkitTextStroke: '1px black',
                transform: `
                  rotate(${rotation}deg)
                  translate(${radius}px)
                  rotate(90deg)
                  scaleY(${verticalStretch})
                `,
              }}
            >
              {char}
            </span>
          );
        })}
      </div>
    </div>
  );
};

export default CircularText;