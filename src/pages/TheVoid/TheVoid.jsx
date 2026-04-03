import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import FolderWrapper from '../FolderAnimationPage/FolderWrapper';
import FireTunnelShader from '@/components/ui/fire-tunnel-shader';
import CtaIntro from '../../components/CtaIntro';
import CtaIntroMobile from '../../components/CtaIntroMobile';
import './TheVoid.css';

const TheVoid = () => {
  const wrapperRef = useRef(null);
  const imageRef = useRef(null);
  const textRef = useRef(null);
  const whitePageRef = useRef(null);
  const scrollProgressRef = useRef(0);
  const [isOpen, setIsOpen] = useState(false);
  const [folderVisible, setFolderVisible] = useState(false);
  const [paper3Exiting, setPaper3Exiting] = useState(false);
  const [middlePageUp, setMiddlePageUp] = useState(false);
  const [started, setStarted] = useState(false);
  const [isMobile, setIsMobile] = useState(typeof window !== 'undefined' && window.innerWidth < 768);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const onInteract = () => {
    if (!started) setStarted(true);
  };

  useEffect(() => {
    const handleScroll = () => {
      const windowHeight = window.innerHeight;
      const startScroll = windowHeight * 2;
      const maxScroll = windowHeight * 6;
      let progress = 0;
      if (window.scrollY > startScroll) {
        progress = (window.scrollY - startScroll) / (maxScroll - startScroll);
      }
      scrollProgressRef.current = progress * 2.5;
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const isMob = window.innerWidth < 768;
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: wrapperRef.current,
          start: 'top top',
          end: isMob ? '+=450%' : '+=600%',
          scrub: isMob ? 2 : 1,
          pin: true,
          fastScrollEnd: true,
          anticipatePin: 1
        }
      });

      const targetRef = imageRef.current;

      // 1. Initial Scale Down
      tl.fromTo(targetRef, 
        { scale: 1, rotateY: 0, yPercent: 0, opacity: 1, borderRadius: '0px', boxShadow: 'none' },
        {
          scale: 0.5,
          ease: 'power1.inOut',
          duration: 0.4,
          force3D: true
        }, 0);

      // 2. Folder Spin-up
      tl.to(imageRef.current, {
        scale: 0.08,
        rotateY: 360,
        yPercent: -40,
        borderRadius: '12px',
        boxShadow: '0 20px 60px rgba(0,0,0,0.3)',
        ease: 'power1.inOut',
        duration: 0.4,
        immediateRender: false,
        force3D: true
      }, 0.4);

      // 3. Open Folder
      tl.to({}, {
        duration: 0.05,
        onStart: () => {
          setFolderVisible(true);
          setIsOpen(true);
          setMiddlePageUp(true);
        },
        onReverseComplete: () => {
          setFolderVisible(false);
          setIsOpen(false);
          setPaper3Exiting(false);
          setMiddlePageUp(false);
        },
      }, 0.6);

      // 4. Shrink Original Image
      tl.to(targetRef, {
        scale: 0.05,
        yPercent: 0,
        ease: 'power2.in',
        duration: 0.3,
        force3D: true
      }, 0.8);

      // 5. Reveal Content Paper
      tl.to({}, {
        duration: 0.1,
        onStart: () => {
          if (imageRef.current) imageRef.current.style.opacity = '0';
          setPaper3Exiting(true);
        },
        onReverseComplete: () => {
          if (imageRef.current) imageRef.current.style.opacity = '1';
          setPaper3Exiting(false);
        }
      }, 1.1);

      // 6. Extraction of the card
      tl.to(".folder-back-wrapper .paper:nth-child(2)", {
        yPercent: -130,
        scale: 1.2,
        rotateY: 180,
        ease: "power2.out",
        duration: 0.4
      }, 1.15);

      tl.to(".folder-back-wrapper .paper:nth-child(2)", {
        xPercent: -50,
        yPercent: -150,
        scale: 4,
        rotateZ: 45,
        rotateX: 60,
        rotateY: "+=0",
        ease: "power2.inOut",
        duration: 0.6
      }, 1.2);

      // 7. CARD COVERS THE WHOLE PAGE
      tl.to(".folder-back-wrapper .paper:nth-child(2)", {
        scale: 250, // Massive scale to cover everything
        rotateZ: 0,
        rotateX: 0,
        yPercent: -50,
        xPercent: 0,
        ease: "power2.in",
        duration: 0.8,
        force3D: true
      }, 2.2);

      // 8. CARD FADES OUT
      tl.to(".folder-back-wrapper .paper:nth-child(2)", {
        opacity: 0,
        duration: 0.4,
        ease: "power1.out"
      }, 3.0);

      if (isMob) {
        tl.to(wrapperRef.current, {
          opacity: 0,
          pointerEvents: 'none',
          duration: 1.0,
          ease: 'power2.inOut'
        }, 3.4);

        const clubReg = document.querySelector('.clubreg-page');
        if (clubReg) {
           tl.fromTo(clubReg, 
             { opacity: 0, visibility: 'hidden' },
             { opacity: 1, visibility: 'visible', duration: 1.2, ease: 'power2.inOut' }, 3.4);
        }
      } else {
        // 9. REVEAL VOID TUNNEL (AFTER FADE)
        if (whitePageRef.current) {
          tl.to({}, {
            duration: 0.1,
            onStart: () => setFolderVisible(false),
            onReverseComplete: () => setFolderVisible(true)
          }, 3.4);

          tl.to(whitePageRef.current, {
            yPercent: -100,
            ease: "power4.inOut",
            duration: 1.2
          }, 3.5);

          tl.to(whitePageRef.current, {
            scale: 8.0,
            opacity: 0,
            duration: 1.0,
            ease: "power2.in"
          }, 8.0);
        }

        tl.to(wrapperRef.current, {
          opacity: 0,
          pointerEvents: 'none',
          duration: 0.8,
          ease: 'power1.out'
        }, 8.4);

        const clubReg = document.querySelector('.clubreg-page');
        if (clubReg) {
           tl.fromTo(clubReg, 
             { opacity: 0, visibility: 'hidden' },
             { opacity: 1, visibility: 'visible', duration: 1.0, ease: 'power2.out' }, 8.5);
        }
      }

    }, wrapperRef);

    return () => ctx.revert();
  }, [isMobile]);

  return (
    <div 
      className="void-container" 
      ref={wrapperRef}
      onMouseMove={onInteract}
      onTouchStart={onInteract}
      style={{ height: '100dvh', overflow: 'clip' }}
    >
      <FolderWrapper 
        isVisible={folderVisible} 
        isOpen={isOpen} 
        paper3Exiting={paper3Exiting}
        middlePageUp={middlePageUp}
        color="#5227FF"
        paperColor="#ffffff"
      />
      <div className="image-container" style={{ position: 'relative', zIndex: 15 }}>
        <div 
          ref={imageRef}
          style={{
            width: '100%',
            height: '100%',
            position: 'absolute',
            top: 0,
            left: 0,
            overflow: 'hidden'
          }}
        >
          {isMobile ? <CtaIntroMobile textRef={textRef} /> : <CtaIntro />}
        </div>
      </div>

      {(!isMobile) && (
        <div 
          ref={whitePageRef}
          className="white-page"
          style={{ top: '100vh' }}
        >
                    <FireTunnelShader 
            scrollProgressRef={scrollProgressRef} 
            images={[
              '/EventPic/WhatsApp Image 2026-04-03 at 18.21.41.jpeg',
              '/EventPic/WhatsApp Image 2026-04-03 at 18.21.42 (1).jpeg',
              '/EventPic/WhatsApp Image 2026-04-03 at 18.21.42.jpeg',
              '/EventPic/WhatsApp Image 2026-04-03 at 18.21.43 (1).jpeg',
              '/EventPic/WhatsApp Image 2026-04-03 at 18.21.43 (2).jpeg',
              '/EventPic/WhatsApp Image 2026-04-03 at 18.21.43.jpeg',
              '/EventPic/WhatsApp Image 2026-04-03 at 18.21.44 (1).jpeg',
              '/EventPic/WhatsApp Image 2026-04-03 at 18.21.44.jpeg',
              '/EventPic/WhatsApp Image 2026-04-03 at 18.21.45 (1).jpeg',
              '/EventPic/WhatsApp Image 2026-04-03 at 18.21.45 (2).jpeg',
              '/EventPic/WhatsApp Image 2026-04-03 at 18.21.45.jpeg',
              '/EventPic/WhatsApp Image 2026-04-03 at 18.21.47.jpeg',
              '/EventPic/WhatsApp Image 2026-04-03 at 18.21.49 (1).jpeg',
              '/EventPic/WhatsApp Image 2026-04-03 at 18.21.49 (2).jpeg',
              '/EventPic/WhatsApp Image 2026-04-03 at 18.21.49.jpeg',
              '/EventPic/WhatsApp Image 2026-04-03 at 18.21.50.jpeg',
              '/EventPic/WhatsApp Image 2026-04-03 at 18.21.56 (1).jpeg',
              '/EventPic/WhatsApp Image 2026-04-03 at 18.21.56.jpeg',
              '/EventPic/WhatsApp Image 2026-04-03 at 18.21.57.jpeg',
              '/EventPic/WhatsApp Image 2026-04-03 at 18.25.45.jpeg',
              '/EventPic/WhatsApp Image 2026-04-03 at 18.25.46.jpeg'
            ]} 
          />
        </div>
      )}
    </div>
  );
};

export default TheVoid;