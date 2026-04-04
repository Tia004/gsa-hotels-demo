const fs = require('fs');

let jsx = fs.readFileSync('page_raw.jsx', 'utf8');
const scripts = fs.readFileSync('extracted_scripts.js', 'utf8');

// Remove style.css link as we use globals.css
jsx = jsx.replace(/<link rel="stylesheet" href="style\.css" \/>/g, '');

const finalCode = `"use client";
import React, { useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from '@studio-freight/lenis';
import SplitType from 'split-type';
import Link from 'next/link';

export default function Home() {
  useEffect(() => {
    // Register GSAP
    gsap.registerPlugin(ScrollTrigger);

${scripts}

    // Cleanup function
    return () => {
      ScrollTrigger.getAll().forEach(t => t.kill());
      if (window.lenis) window.lenis.destroy();
    };
  }, []);

  return (
    ${jsx.trim()}
  );
}
`;

fs.writeFileSync('src/app/page.tsx', finalCode);
