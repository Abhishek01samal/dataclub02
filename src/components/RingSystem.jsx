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

const CENTER_RADIUS = 150;
const RING_GAP = 100;

// Pre-compute ring layout once at module level \u2014 never changes at runtime
const RINGS = (() => {
  const rings = [];
  let currentRadius = CENTER_RADIUS + RING_GAP;
  RING_CONFIGS.slice().reverse().forEach((config) => {
    rings.unshift({ ...config, radius: currentRadius });
    currentRadius += parseInt(config.fontSize) + config.gap;
  });
  return rings;
})();

const RingSystem = memo(({ isVisible, onEnterClick }) => {
  return (
    <div className={`hero-shell ${isVisible ? 'hero-shell--visible' : ''}`}>
      {RINGS.map((ring, index) => (
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
