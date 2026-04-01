import React, { forwardRef } from 'react';
import './DeviceTunnel.css';

const DEVICES = Array.from({ length: 50 }).map((_, i) => {
  // Spiral logic
  const z = -i * 120 + 400; // start ahead of the camera, go deep
  const angle = (i * 30) % 360; 
  const radius = window.innerWidth < 768 ? 400 : 700; // wider tunnel for desktop

  const isMobile = i % 3 === 0;
  // Let's add an ultrawide curve for some monitors!
  const isCurved = i % 7 === 0 && !isMobile;

  return { id: i, z, angle, radius, isMobile, isCurved };
});

const DeviceTunnel = forwardRef((props, ref) => {
  return (
    <div className="device-tunnel-viewport">
      <div className="device-tunnel-camera" ref={ref}>
        {DEVICES.map((d) => (
          <div 
            key={d.id} 
            className={`device-wrapper ${d.isMobile ? 'device-mobile' : 'device-desktop'} ${d.isCurved ? 'device-curved' : ''}`}
            style={{
              transform: `translateZ(${d.z}px) rotateZ(${d.angle}deg) translateY(${d.radius}px) rotateX(-90deg)`
            }}
          >
            <div className="device-screen">
              <img src={`https://picsum.photos/seed/${d.id * 8}/800/600`} alt="portfolio" />
              {/* Optional UI elements to match reference */}
              {d.id % 5 === 0 && (
                <div className="absolute inset-0 flex items-center justify-center bg-black/40">
                  <h1 className="text-red-500 font-black text-4xl transform -skew-x-12 uppercase mix-blend-screen">Enemy</h1>
                </div>
              )}
            </div>
            {!d.isMobile && <div className="device-chin"></div>}
            
            {/* Fake curved screen edges using before/after in CSS */}
          </div>
        ))}
      </div>
    </div>
  );
});

DeviceTunnel.displayName = 'DeviceTunnel';
export default DeviceTunnel;
