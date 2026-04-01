import { useRef } from 'react';
import { gsap } from 'gsap';

const MagneticButton = ({ children, className = '', onClick }) => {
  const btnRef = useRef(null);
  const textRef = useRef(null);

  const handleMouseMove = (e) => {
    const btn = btnRef.current;
    if (!btn) return;
    const rect = btn.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    gsap.to(btn, { x: x * 0.3, y: y * 0.3, duration: 0.4, ease: 'power2.out' });
    if (textRef.current) {
      gsap.to(textRef.current, { x: x * 0.15, y: y * 0.15, duration: 0.4, ease: 'power2.out' });
    }
  };

  const handleMouseLeave = () => {
    gsap.to(btnRef.current, { x: 0, y: 0, duration: 0.6, ease: 'elastic.out(1, 0.3)' });
    if (textRef.current) {
      gsap.to(textRef.current, { x: 0, y: 0, duration: 0.6, ease: 'elastic.out(1, 0.3)' });
    }
  };

  return (
    <button
      ref={btnRef}
      className={className}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
    >
      <span ref={textRef} className="inline-block">{children}</span>
    </button>
  );
};

export default MagneticButton;