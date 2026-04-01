import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import FolderWrapper from '../FolderAnimationPage/FolderWrapper';
import CtaIntroMobile from '../../components/CtaIntroMobile';
import './TheVoid.css';

const TheVoidMobile = () => {
  const wrapperRef = useRef(null);
  const imageRef = useRef(null);
  const scrollProgressRef = useRef(0);
  const [isOpen, setIsOpen] = useState(false);
  const [folderVisible, setFolderVisible] = useState(false);
  const [paper3Exiting, setPaper3Exiting] = useState(false);
  const [middlePageUp, setMiddlePageUp] = useState(false);
  const [started, setStarted] = useState(false);

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
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: wrapperRef.current,
          start: 'top top',
          end: '+=300%',
          scrub: 1,
          pin: true,
        }
      });

      // 0. RESET exactly like PC
      tl.fromTo(imageRef.current, 
        { scale: 1, rotateY: 0, yPercent: 0, opacity: 1, borderRadius: '0px', boxShadow: 'none' },
        {
          scale: 0.5,
          ease: 'power1.inOut',
          duration: 0.4
        }, 0);

      tl.to(imageRef.current, {
        scale: 0.08,
        rotateY: 360,
        yPercent: -40,
        borderRadius: '12px',
        boxShadow: '0 20px 60px rgba(0,0,0,0.3)',
        ease: 'power1.inOut',
        duration: 0.4,
        immediateRender: false
      }, 0.4);

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

      tl.to(imageRef.current, {
        scale: 0.05,
        yPercent: 0,
        ease: 'power2.in',
        duration: 0.3,
      }, 0.8);

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

      tl.to(".folder-back-wrapper .paper:nth-child(2)", {
        scale: 200,
        rotateZ: 0,
        yPercent: -50,
        ease: "power3.in",
        duration: 0.8
      }, 2.2);

      const clubReg = document.querySelector('.clubreg-page');
      if (clubReg) {
         tl.fromTo(clubReg, 
           { opacity: 0, visibility: 'hidden' },
           { 
             opacity: 1, 
             visibility: 'visible',
             duration: 1.5, 
             ease: 'power2.inOut' 
           }, 2.8);
      }

    }, wrapperRef);

    return () => ctx.revert();
  }, []);

  return (
    <div 
      className="void-container mobile-version" 
      ref={wrapperRef}
      onMouseMove={onInteract}
      onTouchStart={onInteract}
      style={{ height: '100vh', overflow: 'hidden' }}
    >
      <FolderWrapper 
        isVisible={folderVisible} 
        isOpen={isOpen} 
        paper3Exiting={paper3Exiting}
        middlePageUp={middlePageUp}
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
          <CtaIntroMobile />
        </div>
      </div>

    </div>
  );
};

export default TheVoidMobile;
