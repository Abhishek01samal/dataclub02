import React, { memo, useMemo } from 'react';
import CircularText from './CircularText';
import EnterButton from './EnterButton';

const RING_CONFIGS = [
  {
    text: 'START WITH CURIOSITY END WITH INSIGHT ',
    fontSize: '55px',
    letterSpacing: 60,
    rotationSpeed: 48,
    direction: -1,
    verticalStretch: 1.8,
    gap: 50,
  },
  {
    text: 'BEHIND   EVERY   GREAT   DECISION   IS   DATA  ',
    fontSize: '55px',
    letterSpacing: 60,
    rotationSpeed: 40,
    direction: 1,
    verticalStretch: 1.7,
    gap: 50,
  },
  {
    text: 'EXPLORE       DATA       GROW      SHARPER     ',
    fontSize: '55px',
    letterSpacing: 60,
    rotationSpeed: 34,
    direction: -1,
    verticalStretch: 1.6,
    gap: 50,
  },
];

const RingSystem = memo(({ isVisible, onEnterClick }) => {
  const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;

  const rings = useMemo(() => {
    const centerRadius = isMobile ? 180 : 150;
    const ringGap = isMobile ? 120 : 100;
    const currentRings = [];
    let radius = centerRadius + ringGap;

    // Mobile optimization: Use only 2 rings to reduce load
    const configsToUse = isMobile ? RING_CONFIGS.slice(0, 2) : RING_CONFIGS;

    configsToUse.slice().reverse().forEach((config) => {
      const fontSize = isMobile ? 65 : parseInt(config.fontSize);
      currentRings.unshift({ 
        ...config, 
        radius, 
        fontSize: `${fontSize}px` 
      });
      radius += fontSize + (isMobile ? 80 : config.gap);
    });
    return currentRings;
  }, [isMobile]);

  return (
    <div className={`hero-shell ${isVisible ? 'hero-shell--visible' : ''}`}>
      {rings.map((ring, index) => (
        <CircularText
          key={index}
          text={ring.text}
          radius={ring.radius}
          rotationSpeed={ring.rotationSpeed}
          direction={ring.direction}
          fontSize={ring.fontSize}
          letterSpacing={ring.letterSpacing}
          fontWeight={ring.fontWeight || 900}
          verticalStretch={ring.verticalStretch || 1}
          isVisible={isVisible}
          delay={index * 0.15}
        />
      ))}
      {isVisible && <EnterButton onClick={onEnterClick} />}
    </div>
  );
});

RingSystem.displayName = 'RingSystem';

export default RingSystem;
