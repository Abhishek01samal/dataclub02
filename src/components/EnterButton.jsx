import React from 'react';

const EnterButton = ({ onClick }) => {
  return (
    <div 
      onClick={onClick}
      style={{
        width: '260px',
        height: '260px',
        backgroundColor: 'white',
        borderRadius: '50%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        cursor: 'pointer',
        zIndex: 100,
        position: 'relative',
        border: '8px solid #020202',
        boxShadow: '0 0 45px rgba(255, 255, 255, 0.25)',
        transition: 'box-shadow 0.05s ease'
      }}
    >
      <span style={{ 
        color: '#050505', 
        fontWeight: 700, 
        fontSize: '32px',
        textTransform: 'uppercase',
        letterSpacing: '0.45em',
        fontFamily: "'Anton', 'Space Grotesk', 'Inter', sans-serif"
      }}>
        ENTER
      </span>
    </div>
  );
};

export default EnterButton;