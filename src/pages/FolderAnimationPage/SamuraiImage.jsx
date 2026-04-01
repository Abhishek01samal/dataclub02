import React, { forwardRef } from 'react';
import heroSamurai from '../../assets/kpr/kpr_hero_samurai.jpg';
import './SamuraiImage.css';

const SamuraiImage = forwardRef((props, ref) => {
  return (
    <img 
      ref={ref}
      src={heroSamurai} 
      alt="Samurai" 
      className="samurai-image"
      {...props}
    />
  );
});

SamuraiImage.displayName = 'SamuraiImage';

export default SamuraiImage;
