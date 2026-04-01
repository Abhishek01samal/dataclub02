import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import RingSystem from '../../components/RingSystem';

const CountdownPage = () => {
  const [count, setCount] = useState(5);
  const [isFinished, setIsFinished] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // Fade in rings on mount
    const fadeInTimeout = setTimeout(() => setIsVisible(true), 100);

    if (count > 0) {
      const timer = setTimeout(() => setCount(count - 1), 1000);
      return () => clearTimeout(timer);
    } else {
      setIsFinished(true);
    }

    return () => clearTimeout(fadeInTimeout);
  }, [count]);

  const handleEnter = () => {
    navigate('/home');
  };

  return (
    <div style={{
      width: '100%',
      height: '100vh',
      position: 'relative',
      background: '#000',
      overflow: 'hidden',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    }}>
      <RingSystem 
        isVisible={isVisible} 
        onEnterClick={handleEnter} 
        showEnterButton={isFinished} 
      />
      
      {!isFinished && (
        <div style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          zIndex: 200,
          color: 'white',
          fontSize: '120px',
          fontWeight: 900,
          fontFamily: "'Space Grotesk', sans-serif",
          pointerEvents: 'none',
          opacity: 0.8,
          textShadow: '0 0 30px rgba(255,255,255,0.3)'
        }}>
          {count}
        </div>
      )}
    </div>
  );
};

export default CountdownPage;
