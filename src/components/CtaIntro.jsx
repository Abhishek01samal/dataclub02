import React, { useEffect, useRef, useState } from 'react';
import Shuffle from './Shuffle';
import { initSCTA } from '@/reactclone/src/controllers/sctaController';
import '@clone/components/scss/sCta.scss';

const CtaIntro = () => {
  const ctaRef = useRef(null);
  const [isMobile, setIsMobile] = useState(typeof window !== 'undefined' && window.innerWidth < 768);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener('resize', handleResize);
    
    // Initialize the grid/impact animation
    const timer = setTimeout(() => {
      if (ctaRef.current) {
        initSCTA(ctaRef.current, { isFlat: true, slowImpact: true });
      }
    }, 100);

    return () => {
      window.removeEventListener('resize', handleResize);
      clearTimeout(timer);
    };
  }, [isMobile]);

  return (
    <section
      ref={ctaRef}
      className="s-cta s-cta--intro"
      data-intersect
      style={{ padding: 0, background: 'transparent', height: '100vh', position: 'relative' }}
    >
      <div className="s__inner js-container" style={{ height: '100lvh' }}>
        <div className="s__hover js-hover is-active">
          <div className="s__button js-button" style={{ display: 'none' }}>
            <div className="s__button__inner">
              <div className="s__button__text js-button-text">GO</div>
            </div>
          </div>

          <div className="s__cta js-cta">
            <div className="s__cta__stars" />
            <div className="a-dots" />

            <div 
              className="cta-text-animator" 
              style={{ 
                width: '100%', 
                height: '100%', 
                display: 'flex', 
                flexDirection: 'column', 
                alignItems: 'center', 
                justifyContent: 'center',
                willChange: 'transform'
              }}
            >
              <Shuffle
                text="DATA"
                shuffleDirection="right"
                duration={0.6}
                animationMode="evenodd"
                shuffleTimes={1}
                ease="power3.out"
                stagger={0.05}
                threshold={0.1}
                triggerOnce={true}
                triggerOnHover
                respectReducedMotion={true}
                loop={true}
                loopDelay={1}
                style={{ fontSize: isMobile ? '15vw' : '18vw', color: '#000', fontFamily: 'Anton, sans-serif' }}
              />
              <Shuffle
                text="SCIENCE"
                shuffleDirection="right"
                duration={0.6}
                animationMode="evenodd"
                shuffleTimes={1}
                ease="power3.out"
                stagger={0.05}
                threshold={0.1}
                triggerOnce={true}
                triggerOnHover
                respectReducedMotion={true}
                loop={true}
                loopDelay={1}
                style={{ fontSize: isMobile ? '9.5vw' : '11vw', color: '#000', fontFamily: 'Anton, sans-serif', marginTop: '-0.1em' }}
              />
            </div>
            
            <div className="s__cta__link"></div>
          </div>
        </div>
      </div>

      {/* Desktop original background grid - Moved outside the js-container to avoid clipping circle if necessary */}
      <div className="s__grid js-grid">
        <svg className="s__grid__svg js-grid-svg">
          <path className="s__grid__path js-grid-path" d="" />
        </svg>
      </div>
    </section>
  );
};

export default CtaIntro;
