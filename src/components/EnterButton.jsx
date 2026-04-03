import React from 'react';
import Shuffle from './Shuffle';

const EnterButton = ({ onClick }) => {
  const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;

  return (
    <div 
      onClick={onClick}
      style={{
        width: isMobile ? '320px' : '260px',
        height: isMobile ? '320px' : '260px',
        backgroundColor: 'white',
        borderRadius: '50%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        cursor: 'pointer',
        zIndex: 100,
        position: 'relative',
        border: isMobile ? '12px solid #020202' : '8px solid #020202',
        boxShadow: '0 0 45px rgba(255, 255, 255, 0.25)',
        transition: 'all 0.05s ease'
      }}
    >
      {isMobile ? (
        <div style={{ 
          position: 'relative',
          width: '100%',
          height: '100%',
          fontFamily: "'Anton', sans-serif",
          color: '#000'
        }}>
          <div style={{ 
            position: 'absolute', 
            top: '62%', 
            left: '50%', 
            transform: 'translate(-50%, -50%)',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            width: '100%',
            willChange: 'transform'
          }}>
            <Shuffle
              text="DATA"
              shuffleDirection="right"
              duration={0.6}
              animationMode="evenodd"
              shuffleTimes={1}
              ease="power3.out"
              stagger={0.05}
              threshold={0.1}
              triggerOnce={false}
              triggerOnHover={false}
              loop={true}
              loopDelay={3.0}
              style={{ fontSize: '110px', fontWeight: 900, letterSpacing: '-0.02em', lineHeight: 0.7, pointerEvents: 'none', marginTop: '-25px' }}
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
              triggerOnce={false}
              triggerOnHover={false}
              loop={true}
              loopDelay={3.0}
              style={{ fontSize: '85px', fontWeight: 900, letterSpacing: '0.01em', marginTop: '-115px', lineHeight: 0.2, pointerEvents: 'none' }}
            />
          </div>
        </div>
      ) : (
        <span style={{ 
          color: '#050505', 
          fontWeight: 900, 
          fontSize: '32px',
          textTransform: 'uppercase',
          letterSpacing: '0.45em',
          fontFamily: "'Anton', 'Space Grotesk', 'Inter', sans-serif"
        }}>
          ENTER
        </span>
      )}
    </div>
  );
};

export default EnterButton;