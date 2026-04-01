import React, { useEffect, useRef, useState } from 'react';
import { initSCTA } from '@/reactclone/src/controllers/sctaController';
import '@clone/components/scss/sCta.scss';

const ctaLines = [
  ['D', 'A', 'T', 'A'],
  ['S', 'C', 'I', 'E', 'N', 'C', 'E'],
];

const CtaIntro = () => {
  const ctaRef = useRef(null);
  const [isMobile, setIsMobile] = useState(typeof window !== 'undefined' && window.innerWidth < 768);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener('resize', handleResize);
    
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
            {ctaLines.map((line, i) => (
              <div
                key={i}
                className={
                  's__cta__line s__cta__line--' + (i === 0 ? 'top' : 'bottom')
                }
              >
                <div className="s__cta__text">
                  {line.map((char, j) => (
                    <span key={j} className="s__cta__char">
                      {[0, 1, 2, 3].map((k) => (
                        <span
                          key={k}
                          className="s__cta__char__slice"
                          dangerouslySetInnerHTML={{ __html: char }}
                        />
                      ))}
                    </span>
                  ))}
                </div>
              </div>
            ))}
            <div className="s__cta__link"></div>
            <div className="s__cta__stars">
              {[1, 2, 3, 4].map((i) => (
                <svg
                  key={i}
                  className="s__cta__star"
                  width="49"
                  height="49"
                  viewBox="0 0 49 49"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="m24.5 0 3.3 21.2L49 24.5l-21.2 3.3L24.5 49l-3.3-21.2L0 24.5l21.2-3.3L24.5 0z" />
                </svg>
              ))}
            </div>
            <div className="a-dots" />
          </div>
        </div>
      </div>

      <div className="s__grid js-grid">
        <svg className="s__grid__svg js-grid-svg">
          <path className="s__grid__path js-grid-path" d="" />
        </svg>
      </div>
    </section>
  );
};

export default CtaIntro;
