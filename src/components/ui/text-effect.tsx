"use client";

import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { cn } from "@/lib/utils";

type Props = {
  text?: string;
  className?: string;
  speed?: number;
  onAnimationComplete?: () => void;
};

/**
 * A tech-styled text effect that uses GSAP to animate SVG stroke and opacity.
 * This is a drop-in replacement that avoids external animation dependencies like framer-motion.
 */
function TechStringEffect({
  text = "DATA SCIENCE",
  className,
  speed = 1,
  onAnimationComplete,
}: Props) {
  const textRef = useRef<SVGTextElement>(null);
  const lineRef = useRef<SVGPathElement>(null);
  const containerRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    if (!textRef.current || !lineRef.current) return;

    const tl = gsap.timeline({
      onComplete: onAnimationComplete
    });

    const duration = (2.5 / speed);

    // Initial state
    gsap.set(textRef.current, { strokeDasharray: 1000, strokeDashoffset: 1000, opacity: 0 });
    gsap.set(lineRef.current, { strokeDasharray: 1000, strokeDashoffset: 1000, opacity: 0 });

    tl.to(textRef.current, {
      opacity: 1,
      duration: 0.5,
      ease: "power2.out"
    })
    .to(textRef.current, {
      strokeDashoffset: 0,
      duration: duration,
      ease: "power2.inOut"
    }, 0.2)
    .to(lineRef.current, {
      opacity: 0.5,
      strokeDashoffset: 0,
      duration: 1.0,
      ease: "power1.inOut"
    }, "-=1.0");

    return () => {
      tl.kill();
    };
  }, [text, speed, onAnimationComplete]);

  return (
    <svg
      ref={containerRef}
      className={cn("h-40 w-full overflow-visible", className)}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 1000 200"
      fill="none"
      stroke="currentColor"
    >
      <title>Samsung Tech Style - {text}</title>
      
      <text
        ref={textRef}
        x="50%"
        y="50%"
        textAnchor="middle"
        dominantBaseline="middle"
        style={{ 
          fontSize: "80px",
          fontFamily: "'Anton', sans-serif",
          fontWeight: 900,
          letterSpacing: "0.1em",
          strokeWidth: "2",
          paintOrder: "stroke"
        }}
      >
        {text}
      </text>
      
      <path
        ref={lineRef}
        d="M200 160 L800 160"
        strokeWidth="2"
        className="stroke-blue-500"
      />
      
      {/* Visual brackets to match tech aesthetic */}
      <g className="stroke-blue-500 opacity-40" strokeWidth="2">
        <path d="M100 40 L100 20 L130 20" />
        <path d="M870 40 L900 20 L900 40" />
      </g>
    </svg>
  );
}

export { TechStringEffect };
