import React, { useEffect, useRef, useState } from 'react';

const TravelToAnimation = ({ isActive, onComplete, children }) => {
  const ringsRef = useRef(null);
  const voidRef = useRef(null);
  const overlayRef = useRef(null);
  const animationRef = useRef(null);
  const startTimeRef = useRef(null);
  const [isAnimating, setIsAnimating] = useState(false);

  const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;

  const TIMING = isMobile ? {
    zoom: 400,
    expand: 200,
    total: 600
  } : {
    zoom: 800,
    expand: 400,
    total: 1200
  };

  useEffect(() => {
    if (isActive && !isAnimating) {
      setIsAnimating(true);
      startTimeRef.current = Date.now();
      runAnimation();
    }
  }, [isActive]);

  const runAnimation = () => {
    const animate = () => {
      const elapsed = Date.now() - startTimeRef.current;
      const progress = Math.min(elapsed / TIMING.total, 1);

      if (ringsRef.current && voidRef.current && overlayRef.current) {
        const centerX = window.innerWidth / 2;
        const centerY = window.innerHeight / 2;

        const zoomEnd = TIMING.zoom / TIMING.total;
        const expandEnd = (TIMING.zoom + TIMING.expand) / TIMING.total;

        if (progress < zoomEnd) {
          // Phase 1: Zoom into center
          const phaseProgress = progress / zoomEnd;
          const easeIn = phaseProgress * phaseProgress * phaseProgress;
          
          ringsRef.current.style.transformOrigin = 'center center';
          const cameraZoom = 1 + (easeIn * 80);
          ringsRef.current.style.transform = `scale(${cameraZoom})`;

          // Small void grows as zoom progresses
          const voidSize = 10 + (easeIn * 100);
          voidRef.current.style.left = `${centerX}px`;
          voidRef.current.style.top = `${centerY}px`;
          voidRef.current.style.transform = 'translate(-50%, -50%)';
          voidRef.current.style.width = `${voidSize}px`;
          voidRef.current.style.height = `${voidSize}px`;
          voidRef.current.style.opacity = 0.8;
          
          const glowSize = 30 + (easeIn * 200);
          const isMobile = window.innerWidth < 768;
          if (!isMobile) {
            voidRef.current.style.boxShadow = `
              0 0 ${glowSize}px ${glowSize}px rgba(0, 0, 0, 1),
              0 0 ${glowSize * 2}px ${glowSize * 2}px rgba(0, 0, 0, 0.9)
            `;
          } else {
            // Mobile: skip shadows, just use solid black expansion
            voidRef.current.style.boxShadow = 'none';
          }
          
          overlayRef.current.style.opacity = 0;
        } 
        else if (progress < expandEnd) {
          // Phase 2: Void expands BIG to cover page
          const phaseProgress = (progress - zoomEnd) / (expandEnd - zoomEnd);
          const easeOut = 1 - Math.pow(1 - phaseProgress, 2);
          
          // Void grows MASSIVELY
          const voidSize = 110 + (easeOut * window.innerWidth * 2);
          voidRef.current.style.left = `${centerX}px`;
          voidRef.current.style.top = `${centerY}px`;
          voidRef.current.style.width = `${voidSize}px`;
          voidRef.current.style.height = `${voidSize}px`;
          voidRef.current.style.opacity = 1;
          
          // Shadow only for desktop
          const isMobile = window.innerWidth < 768;
          if (!isMobile) {
            const glowSize = 230 + (phaseProgress * 500);
            voidRef.current.style.boxShadow = `
              0 0 ${glowSize}px ${glowSize}px rgba(0, 0, 0, 1),
              0 0 ${glowSize * 2}px ${glowSize * 2}px rgba(0, 0, 0, 1),
              0 0 ${glowSize * 4}px ${glowSize * 4}px rgba(0, 0, 0, 1)
            `;
          }
          
          // Black overlay for complete coverage
          overlayRef.current.style.opacity = phaseProgress * 0.7;
          
          // Rings fade
          ringsRef.current.style.opacity = 1 - phaseProgress;
        }
        else {
          // Phase 3: Full black
          overlayRef.current.style.opacity = 1;
          voidRef.current.style.width = '400vw';
          voidRef.current.style.height = '400vh';
          ringsRef.current.style.opacity = 0;
        }
      }

      if (progress < 1) {
        animationRef.current = requestAnimationFrame(animate);
      } else {
        onComplete && onComplete();
      }
    };

    animationRef.current = requestAnimationFrame(animate);
  };

  useEffect(() => {
    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, []);

  return (
    <>
      <div 
        ref={overlayRef}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100vw',
          height: '100vh',
          backgroundColor: '#000',
          opacity: 0,
          pointerEvents: 'none',
          zIndex: 550,
        }}
      />
      
      <div 
        ref={ringsRef}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100vw',
          height: '100vh',
          zIndex: 500,
          pointerEvents: isAnimating ? 'none' : 'auto',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        {children}
      </div>
      
      <div 
        ref={voidRef}
        style={{
          position: 'fixed',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: '10px',
          height: '10px',
          borderRadius: '50%',
          backgroundColor: '#000',
          opacity: 0,
          pointerEvents: 'none',
          zIndex: 600,
        }}
      />
    </>
  );
};

export default TravelToAnimation;