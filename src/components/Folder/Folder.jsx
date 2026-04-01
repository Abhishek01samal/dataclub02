import { useState } from 'react';
import './Folder.css';

const darkenColor = (hex, percent) => {
  let color = hex.startsWith('#') ? hex.slice(1) : hex;
  if (color.length === 3) {
    color = color
      .split('')
      .map(c => c + c)
      .join('');
  }
  const num = parseInt(color, 16);
  let r = (num >> 16) & 0xff;
  let g = (num >> 8) & 0xff;
  let b = num & 0xff;
  r = Math.max(0, Math.min(255, Math.floor(r * (1 - percent))));
  g = Math.max(0, Math.min(255, Math.floor(g * (1 - percent))));
  b = Math.max(0, Math.min(255, Math.floor(b * (1 - percent))));
  return '#' + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1).toUpperCase();
};

const Folder = ({ color = '#5227FF', paperColor = '#ffffff', size = 1, isOpen = false, className = '' }) => {
  const folderBackColor = darkenColor(color, 0.08);
  const paper1 = darkenColor(paperColor, 0.1);
  const paper2 = darkenColor(paperColor, 0.05);
  const paper3 = paperColor;

  const folderStyle = {
    '--folder-color': color,
    '--folder-back-color': folderBackColor,
    '--paper-1': paper1,
    '--paper-2': paper2,
    '--paper-3': paper3
  };

  const folderClassName = `folder ${isOpen ? 'open' : ''}`.trim();
  const scaleStyle = { transform: `scale(${size})` };

  return (
    <div style={scaleStyle} className={className}>
      <div className={folderClassName} style={folderStyle}>
        <div className="folder__back">
          <div className="paper paper-1"></div>
          <div className="paper paper-2"></div>
          <div className="paper paper-3"></div>
          <div className="folder__front"></div>
          <div className="folder__front right"></div>
        </div>
      </div>
    </div>
  );
};

export const FolderFront = ({ color = '#5227FF', size = 1, isOpen = false, className = '' }) => {
  const folderStyle = {
    '--folder-color': color,
  };
  const folderClassName = `folder ${isOpen ? 'open' : ''}`.trim();
  const scaleStyle = { transform: `scale(${size})` };

  return (
    <div style={scaleStyle} className={className}>
      <div className={folderClassName} style={folderStyle}>
        <div className="folder__back" style={{ background: 'transparent' }}>
          {/* We only render the front flaps here! Everything else is transparent to create the overlay. */}
          <div className="folder__front"></div>
          <div className="folder__front right"></div>
        </div>
      </div>
    </div>
  );
};

export default Folder;
