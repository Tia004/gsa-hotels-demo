"use client";

import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';

const Cursor: React.FC = () => {
  const cursorRef = useRef<HTMLDivElement>(null);
  const followerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // OS Detection: Hide on touch devices
    const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    if (isTouchDevice) {
      document.body.style.cursor = 'auto';
      return;
    }

    const cursor = cursorRef.current;
    const follower = followerRef.current;

    if (!cursor || !follower) return;

    // Movement tracking + Interaction states (Event Delegation)
    const onMouseMove = (e: MouseEvent) => {
      const { clientX: x, clientY: y, target } = e;
      
      // Event Delegation for hover states
      const isInteractive = (target as HTMLElement)?.closest('a, button, [role="button"], input, textarea, .interactive, select, .custom-select-trigger, .category-stripe, .slide');
      
      if (isInteractive) {
        document.body.classList.add('cursor-hover-active');
      } else {
        document.body.classList.remove('cursor-hover-active');
      }

      // Fast dot
      gsap.to(cursor, {
        top: y,
        left: x,
        duration: 0.1,
        ease: 'power2.out',
        overwrite: 'auto'
      });

      // Slower follower (Bloom/Blur/Aberration)
      gsap.to(follower, {
        top: y,
        left: x,
        duration: 0.5,
        ease: 'power3.out',
        overwrite: 'auto'
      });
    };

    window.addEventListener('mousemove', onMouseMove);
    
    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      document.body.classList.remove('cursor-hover-active');
      document.body.style.cursor = 'auto';
    };
  }, []);

  return (
    <>
      <div id="luxury-cursor-container" style={{ position: 'fixed', top: 0, left: 0, pointerEvents: 'none', zIndex: 99999999 }}>
        {/* Fine center dot - Fast */}
        <div 
          ref={cursorRef} 
          className="luxury-cursor-dot" 
          style={{ 
            position: 'fixed', 
            width: '6px', 
            height: '6px', 
            background: '#C5A059', 
            borderRadius: '50%', 
            transform: 'translate(-50%, -50%)',
            zIndex: 99999999,
            pointerEvents: 'none'
          }} 
        />
        
        {/* Luxury follower - Slow, Gradient, Blur */}
        <div 
          ref={followerRef} 
          className="luxury-cursor-follower" 
          style={{ 
            position: 'fixed', 
            width: '40px', 
            height: '40px', 
            borderRadius: '50%', 
            transform: 'translate(-50%, -50%)',
            background: 'radial-gradient(circle, transparent 20%, rgba(197, 160, 89, 0.4) 70%, rgba(197, 160, 89, 0) 100%)',
            border: '1px solid rgba(197, 160, 89, 0.3)',
            backdropFilter: 'blur(8px)',
            WebkitBackdropFilter: 'blur(8px)',
            zIndex: 99999998,
            pointerEvents: 'none'
          }}
        >
          {/* Subtle Aberration Rings */}
          <div className="aberration r" />
          <div className="aberration b" />
        </div>
      </div>

      {/* Gooey Filter SVG */}
      <svg style={{ position: 'absolute', width: 0, height: 0, overflow: 'hidden' }} aria-hidden="true">
        <defs>
          <filter id="cursor-goo">
            <feGaussianBlur in="SourceGraphic" stdDeviation="5" result="blur" />
            <feColorMatrix in="blur" mode="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 18 -7" result="goo" />
            <feComposite in="SourceGraphic" in2="goo" operator="atop" />
          </filter>
        </defs>
      </svg>
    </>
  );
};

export default Cursor;
