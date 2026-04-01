import { useRef, useEffect, useState } from 'react';
import FireTunnelShader from '@/components/ui/fire-tunnel-shader';

const FireNightmarePage = () => {
  const [started, setStarted] = useState(false);

  const onInteract = () => {
    if (!started) setStarted(true);
  };

  return (
    <div
      className="relative w-screen h-screen bg-black text-white font-sans"
      onMouseMove={onInteract}
      onTouchStart={onInteract}
    >
      {!started && (
        <div className="absolute inset-0 z-20 flex flex-col items-center justify-center bg-black/75 text-white p-4">
          <h2 className="text-3xl font-bold">A Firefighter's Nightmare</h2>
          <p className="mt-2">Move your pointer to explore the tunnel</p>
        </div>
      )}

      <FireTunnelShader />

      {started && (
        <div className="absolute bottom-4 left-4 text-sm text-gray-400 pointer-events-none">
          Speed: 3 | Turbulence: 0.2
        </div>
      )}
    </div>
  );
};

export default FireNightmarePage;
