import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import heroSamurai from '../../assets/kpr/kpr_hero_samurai.jpg';
import Folder, { FolderFront } from '../../components/Folder/Folder';
import './FolderAnimationPage.css';

gsap.registerPlugin(ScrollTrigger);

const FolderAnimationPage = () => {
  const wrapperRef = useRef(null);
  const imageRef = useRef(null);
  const folderRef = useRef(null);
  const [isOpen, setIsOpen] = useState(false);
  const [cardHidden, setCardHidden] = useState(false);
  const [folderVisible, setFolderVisible] = useState(false);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: wrapperRef.current,
          start: 'top top',
          end: '+=150%',
          scrub: 1,
          pin: true,
        }
      });

      // Phase 1: Shrink image to 50%
      tl.to(imageRef.current, {
        scale: 0.5,
        ease: 'power2.inOut',
        duration: 0.4
      }, 0);

      // Phase 3: Shrink perfectly in place (constant to the center)
      tl.to(imageRef.current, {
        scale: 0.08,
        borderRadius: '12px',
        boxShadow: '0 20px 60px rgba(0,0,0,0.3)',
        ease: 'power2.inOut',
        duration: 0.5
      }, 0.4);

      // Phase 4: Show and Open folder simultaneously (Anticipation going forward)
      tl.to({}, {
        duration: 0.1,
        onStart: () => {
          setFolderVisible(true);
          setIsOpen(true);
        },
        onReverseComplete: () => {
          setFolderVisible(false);
          setIsOpen(false);
        },
      }, 0.7);

      // Phase 4.5: Asymmetric Reverse Hook
      // Instantly kills the folder if the user scrolls backwards exactly as the image starts growing again!
      tl.to({}, {
        duration: 0.01,
        onStart: () => {
            // Keep it alive if scrubbing forward
            setFolderVisible(true);
        },
        onReverseComplete: () => {
           // Nuke it if scrubbing backward!
           setFolderVisible(false);
           setIsOpen(false);
        }
      }, 0.9);

      // Phase 5: Card solely shrinks smaller inside the pouch (no positional translation)
      tl.to(imageRef.current, {
        scale: 0.05,        // Just shrinks rigidly behind the front flap
        ease: 'power2.in',
        duration: 0.3,
      }, 1.1);

      // Phase 6: Close folder and hide image (happens instantly when Phase 5 concludes)
      tl.to({}, {
        duration: 0.1,
        onStart: () => {
          setIsOpen(false);
          if (imageRef.current) imageRef.current.style.opacity = '0';
        },
        onReverseComplete: () => {
          setIsOpen(true);
          if (imageRef.current) imageRef.current.style.opacity = '1';
        }
      }, 1.4);

    }, wrapperRef);

    return () => ctx.revert();
  }, []);

  return (
    <div className="folder-wrapper" ref={wrapperRef}>
      
      {/* Layer 1: The Back of the folder (z-index 10) */}
      <div className={`folder-box ${folderVisible ? 'visible' : ''}`} ref={folderRef} style={{ zIndex: 10 }}>
        <Folder color="#5227FF" size={1.6} isOpen={isOpen} />
      </div>

      {/* Layer 2: The sliding image (z-index 15) */}
      <div className="image-container" style={{ position: 'relative', zIndex: 15 }}>
        <img 
          ref={imageRef}
          src={heroSamurai} 
          alt="Samurai" 
          className={cardHidden ? 'hidden' : ''}
        />
      </div>

      {/* Layer 3: The cloned Front Flap Overlay (z-index 20) */}
      <div className={`folder-box ${folderVisible ? 'visible' : ''}`} style={{ zIndex: 20, pointerEvents: 'none' }}>
        <FolderFront color="#5227FF" size={1.6} isOpen={isOpen} />
      </div>
      
    </div>
  );
};

export default FolderAnimationPage;
