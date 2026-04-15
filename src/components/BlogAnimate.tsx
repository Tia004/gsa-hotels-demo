"use client";

import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

const BlogAnimate: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const cards = containerRef.current.querySelectorAll('.blog-card-container');
    
    gsap.fromTo(cards, 
      { 
        opacity: 0, 
        y: 40,
        scale: 0.98
      }, 
      { 
        opacity: 1, 
        y: 0, 
        scale: 1,
        duration: 1.2, 
        stagger: 0.2, 
        ease: "expo.out",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 80%",
        }
      }
    );
  }, []);

  return <div ref={containerRef}>{children}</div>;
};

export default BlogAnimate;
