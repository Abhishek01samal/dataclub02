import { useEffect, useRef } from 'react';

const WaveCanvas = ({ className = '' }) => {
  const canvasRef = useRef(null);
  const animationRef = useRef(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let time = 0;
    let width = 0;
    let height = 0;

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const rect = canvas.getBoundingClientRect();
      width = rect.width;
      height = rect.height;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      ctx.scale(dpr, dpr);
    };

    resize();

    const ro = new ResizeObserver(resize);
    ro.observe(canvas.parentElement || canvas);

    // Step by 3px instead of 1px — 3× fewer iterations, visually identical
    const drawWave = (yOffset, amplitude, frequency, speed, alpha, lineWidth) => {
      ctx.beginPath();
      ctx.strokeStyle = `rgba(120, 255, 120, ${alpha})`;
      ctx.lineWidth = lineWidth;
      for (let x = 0; x < width; x += 3) {
        const t = x / width;
        const envelope = Math.sin(t * Math.PI);
        const y =
          height * yOffset +
          Math.sin(t * frequency + time * speed) * amplitude * envelope +
          Math.sin(t * frequency * 0.5 + time * speed * 1.3) * amplitude * 0.5 * envelope +
          Math.sin(t * frequency * 2 + time * speed * 0.7) * amplitude * 0.25 * envelope;
        if (x === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
      ctx.stroke();
    };

    const animate = () => {
      ctx.clearRect(0, 0, width, height);
      drawWave(0.5, 18, 8, 0.8, 0.06, 1);
      drawWave(0.48, 22, 6, 0.6, 0.08, 1.2);
      drawWave(0.52, 15, 10, 1.0, 0.12, 1.5);
      drawWave(0.5, 25, 5, 0.5, 0.15, 1.8);
      drawWave(0.46, 20, 7, 0.9, 0.2, 2);
      drawWave(0.54, 12, 12, 1.2, 0.1, 1);
      drawWave(0.5, 30, 4, 0.4, 0.25, 2.2);
      time += 0.015;
      animationRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      ro.disconnect();
      cancelAnimationFrame(animationRef.current);
    };
  }, []);

  return <canvas ref={canvasRef} className={className} style={{ width: '100%', height: '100%', display: 'block' }} />;
};

export default WaveCanvas;