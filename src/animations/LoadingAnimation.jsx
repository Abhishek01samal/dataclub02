import React, { useEffect, useRef, useState, useMemo } from 'react';

// OPTIMIZED: single RAF loop, memoized dimensions to avoid layout thrash
const LoadingAnimation = ({ onComplete }) => {
  const [progress, setProgress] = useState(0);
  const [hasEntered, setHasEntered] = useState(false);
  const rafRef = useRef(null);
  const lastTimeRef = useRef(null);

  // Compute once on mount — avoids forced reflow on every render
  const introCircleInitialSize = useMemo(() => window.innerWidth * 1.5, []);
  const introCircleFinalSize = 350;

  useEffect(() => {
    if (hasEntered) return;

    const tick = (timestamp) => {
      if (lastTimeRef.current === null) lastTimeRef.current = timestamp;
      const elapsed = timestamp - lastTimeRef.current;

      if (elapsed >= 30) {
        lastTimeRef.current = timestamp;
        setProgress(prev => {
          const next = prev + 1;
          if (next >= 100) {
            setTimeout(() => {
              setHasEntered(true);
              onComplete && onComplete();
            }, 800);
            return 100;
          }
          return next;
        });
      }
      rafRef.current = requestAnimationFrame(tick);
    };

    rafRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafRef.current);
  }, [hasEntered, onComplete]);

  const progressFraction = Math.min(progress, 100) / 100;
  const circleDiameter = introCircleInitialSize - (introCircleInitialSize - introCircleFinalSize) * progressFraction;

  const valueFontStart = 300;
  const valueFontEnd = 64;
  const valueFontSize = valueFontStart - (valueFontStart - valueFontEnd) * progressFraction;

  const valueStyle = {
    fontSize: `${valueFontSize}px`,
    letterSpacing: '0.1em',
  };

  return (
    <div className={`intro-overlay ${hasEntered ? 'intro-overlay--hidden' : ''}`}>
      <div
        className={`intro-shape ${progress >= 100 ? 'intro-shape--circle' : ''}`}
        style={{
          width: `${circleDiameter}px`,
          height: `${circleDiameter}px`,
          opacity: progress >= 100 ? 0 : 1,
          transition: 'opacity 0.8s ease',
          willChange: 'width, height, opacity',
        }}
      >
        <span className="intro-circle__value" style={valueStyle}>
          {progress.toString().padStart(2, '0')}
        </span>
      </div>
    </div>
  );
};

export default LoadingAnimation;