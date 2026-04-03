import React, { useRef } from 'react';
import Shuffle from './Shuffle';
import '@clone/components/scss/sCta.scss';
import './CtaIntroMobile.css';
import CircularText from './CircularText/CircularText';

import LogoLoop from './LogoLoop';
import { 
  SiReact, 
  SiTypescript, 
  SiTailwindcss,
  SiPython,
  SiGithub,
  SiVite,
  SiPostgresql,
  SiMongodb,
  SiGraphql,
  SiFigma,
  SiTensorflow,
  SiScikitlearn,
  SiPandas,
  SiNvidia,
  SiKeras,
  SiKaggle,
  SiJupyter
} from 'react-icons/si';

const techLogos = [
  { node: <SiReact />, title: "React", href: "https://react.dev" },
  { node: <SiTypescript />, title: "TypeScript", href: "https://www.typescriptlang.org" },
  { node: <SiTailwindcss />, title: "Tailwind CSS", href: "https://tailwindcss.com" },
  { node: <SiPython />, title: "Python", href: "https://www.python.org" },
  { node: <SiGithub />, title: "GitHub", href: "https://github.com" },
  { node: <SiVite />, title: "Vite", href: "https://vitejs.dev" },
  { node: <SiPostgresql />, title: "PostgreSQL", href: "https://www.postgresql.org" },
  { node: <SiMongodb />, title: "MongoDB", href: "https://www.mongodb.com" },
  { node: <SiGraphql />, title: "GraphQL", href: "https://graphql.org" },
  { node: <SiFigma />, title: "Figma", href: "https://www.figma.com" },
  { node: <SiTensorflow />, title: "TensorFlow", href: "https://www.tensorflow.org" },
  { node: <SiScikitlearn />, title: "Scikit-Learn", href: "https://scikit-learn.org" },
  { node: <SiPandas />, title: "Pandas", href: "https://pandas.pydata.org" },
  { node: <SiNvidia />, title: "NVIDIA", href: "https://www.nvidia.com" },
  { node: <SiKeras />, title: "Keras", href: "https://keras.io" },
  { node: <SiJupyter />, title: "Jupyter", href: "https://jupyter.org" }
];

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


          <div className="s__cta js-cta" style={{ '--size': '105vmin' }}>
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
                willChange: 'transform',
                position: 'relative',
                background: 'radial-gradient(circle, #ccc 1px, transparent 1px) center / 28px 28px repeat', // Hardware accelerated grid
                borderRadius: '50%'
              }}
            >
              {/* Logo Loop perfectly orbiting inside the circle */}
              <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', zIndex: 1, color: '#000', pointerEvents: 'none', willChange: 'transform' }}>
                <CircularText 
                  text={techLogos.map(logo => logo.node)} 
                  spinDuration={25} 
                  className="mobile-ring-text"
                  radius="44vmin"
                  itemStyle={{ fontSize: '3rem', margin: '0 1rem' }}
                  isStarPattern={true}
                />
              </div>

              {/* Static DATA SCIENCE text */}
              <div style={{ zIndex: 2, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <div style={{ fontSize: '11rem', color: '#000', fontFamily: 'Anton, sans-serif', lineHeight: 1 }}>
                  DATA
                </div>
                <div style={{ fontSize: '7.5rem', color: '#000', fontFamily: 'Anton, sans-serif', marginTop: '-0.1em', lineHeight: 1 }}>
                  SCIENCE
                </div>
              </div>
            </div>
            
            <div className="s__cta__link"></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CtaIntroMobile;
