import React, { useRef } from 'react';
import Shuffle from './Shuffle';
import '@clone/components/scss/sCta.scss';
import './CtaIntroMobile.css';

const CtaIntroMobile = ({ textRef }) => {
  const ctaRef = useRef(null);

  return (
    <section
      ref={ctaRef}
      className="s-cta s-cta--intro is-mobile-only-hero"
      data-intersect
      style={{ 
        padding: 0, 
        background: 'transparent', 
        height: '100%',
        contain: 'layout style paint' 
      }}
    >
      <div className="s__inner js-container" style={{ height: '100dvh' }}>
        <div className="s__hover js-hover is-active">
          <div className="s__button js-button" style={{ display: 'none' }}>
            <div className="s__button__inner">
              <div className="s__button__text js-button-text">GO</div>
            </div>
          </div>

          <div className="s__cta js-cta" style={{ '--size': '110vmax' }}>
            <div className="s__cta__stars" />
            <div className="a-dots" />

            <div 
              ref={textRef} 
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
                style={{ fontSize: '11rem', color: '#000', fontFamily: 'Anton, sans-serif' }}
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
                style={{ fontSize: '7.5rem', color: '#000', fontFamily: 'Anton, sans-serif', marginTop: '-0.1em' }}
              />
            </div>
            
            <div className="s__cta__link"></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CtaIntroMobile;
