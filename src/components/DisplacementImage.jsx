import React, { useEffect, useMemo, useRef } from 'react'
import { gsap } from 'gsap'

const DisplacementImage = ({ src, alt, width = 400, height = 400, duration = 6 }) => {
  const circleRef = useRef(null)

  useEffect(() => {
    if (circleRef.current) {
      gsap.fromTo(
        circleRef.current,
        {
          attr: { r: 0 },
        },
        {
          attr: { r: Math.max(width, height) * 0.75 },
          repeat: -1,
          duration: duration,
          ease: 'power3.inOut',
          yoyo: true,
          delay: Math.random() * 2,
        }
      )
    }
  }, [circleRef, width, height, duration])

  const id = useMemo(() => Math.random().toString(36).substr(2, 9), [])

  return (
    <div className="displacement-wrapper" style={{ width: '100%', height: '100%', position: 'relative' }}>
      <svg
        width="100%"
        height="100%"
        viewBox={`0 0 ${width} ${height}`}
        preserveAspectRatio="xMidYMid slice"
        style={{ display: 'block' }}
      >
        <defs>
          <filter id={`displacementFilter-${id}`}>
            <feTurbulence type="fractalNoise" baseFrequency="0.03" numOctaves="3" result="noise" />
            <feDisplacementMap in="SourceGraphic" in2="noise" scale="50" xChannelSelector="R" yChannelSelector="G" />
          </filter>
          <mask id={`circleMask-${id}`}>
            <circle
              ref={circleRef}
              cx={width / 2}
              cy={height / 2}
              r="0"
              fill="white"
              style={{ filter: `url(#displacementFilter-${id})` }}
            />
          </mask>
        </defs>
        <image href={src} width={width} height={height} mask={`url(#circleMask-${id})`} />
      </svg>
    </div>
  )
}

export default DisplacementImage
