import React, { forwardRef } from 'react';

const ModelImage = forwardRef(({...props}, ref) => {
  return (
    <div 
      ref={ref} 
      style={{
        width: '100vw',
        height: '100vh',
        backgroundColor: '#111',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'absolute',
        top: 0,
        left: 0,
        opacity: 0, 
        transform: 'scale(0.05)',
        borderRadius: '12px',
        overflow: 'hidden',
        boxShadow: '0 20px 60px rgba(0,0,0,0.3)',
      }}
      {...props}
    >
      <div style={{
        color: 'white',
        fontSize: '4rem',
        fontFamily: "'Anton', sans-serif"
      }}>
        MODEL PAGE
      </div>
    </div>
  );
});

ModelImage.displayName = 'ModelImage';

export default ModelImage;
