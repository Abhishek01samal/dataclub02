import React, { useEffect, useMemo, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const DisplacementReveal = ({ children }) => {
  const circleRef = useRef(null)
  const containerRef = useRef(null)
  const contentRef = useRef(null)
  const id = useMemo(() => Math.random().toString(36).substr(2, 9), [])

  useEffect(() => {
    if (circleRef.current && containerRef.current && contentRef.current) {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top top',    // Start pinning when this section hits the top
          end: '+=100%',       // Pin for 100% of the viewport height (the reveal duration)
          scrub: 1,           // Smooth scrub for the scale + mask
          pin: true,           // PIN everything during the reveal
          anticipatePin: 1,
        }
      })

      // Reveal the mask
      tl.fromTo(circleRef.current, {
        attr: { r: 0 },
      }, {
        attr: { r: 1800 },
        ease: 'none',
      }, 0)

      // Scale up the content as it "comes out"
      tl.fromTo(contentRef.current, {
        scale: 0.6,
        opacity: 0
      }, {
        scale: 1,
        opacity: 1,
        ease: 'power2.out',
      }, 0)
    }
  }, [])

  return (
    <div ref={containerRef} className="displacement-reveal-outer" style={{ width: '100%', background: '#000' }}>
      {/* The SVG Mask Definition */}
      <svg width="0" height="0" style={{ position: 'absolute' }}>
        <defs>
          <filter id={`displacementFilter-${id}`}>
            <feTurbulence type="fractalNoise" baseFrequency="0.03" numOctaves="3" result="noise" />
            <feDisplacementMap in="SourceGraphic" in2="noise" scale="100" xChannelSelector="R" yChannelSelector="G" />
          </filter>
          <mask id={`scrollCircleMask-${id}`} maskUnits="userSpaceOnUse" maskContentUnits="userSpaceOnUse">
             <rect width="100%" height="100%" fill="black" />
             <circle 
                ref={circleRef} 
                cx="50vw" 
                cy="50vh" 
                r="0" 
                fill="white" 
                style={{ filter: `url(#displacementFilter-${id})` }} 
             />
          </mask>
        </defs>
      </svg>

      {/* The Content with the mask applied */}
      <div ref={contentRef} style={{ 
        WebkitMaskImage: `url(#scrollCircleMask-${id})`,
        maskImage: `url(#scrollCircleMask-${id})`,
        width: '100%',
        willChange: 'transform, mask-image'
      }}>
        {children}
      </div>
    </div>
  )
}

export default DisplacementReveal
