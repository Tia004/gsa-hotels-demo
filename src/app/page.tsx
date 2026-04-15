"use client";
/* eslint-disable */
// @ts-nocheck

import React, { useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from 'lenis';
import SplitType from 'split-type';
import Link from 'next/link';
import { SignInButton, SignUpButton, UserButton, useAuth } from '@clerk/nextjs';
import Image from 'next/image';


declare const particlesJS: any;

// SignedIn / SignedOut shims using useAuth (replaces removed v7 components)
function SignedIn({ children }: { children: React.ReactNode }) {
  const { isSignedIn } = useAuth();
  return isSignedIn ? <>{children}</> : null;
}
function SignedOut({ children }: { children: React.ReactNode }) {
  const { isSignedIn, isLoaded } = useAuth();
  if (!isLoaded) return null;
  return !isSignedIn ? <>{children}</> : null;
}


export default function Home() {
  const [activeVideo, setActiveVideo] = React.useState(0);
  const [activeVisionImage, setActiveVisionImage] = React.useState(0);
  const [isVisionLightboxOpen, setIsVisionLightboxOpen] = React.useState(false);
  const [scrubberHoverValue, setScrubberHoverValue] = React.useState<number | null>(null);
  const [isScrubbing, setIsScrubbing] = React.useState(false);

  const videos = [
    {
      id: "rzLIWEaDbuc",
      title: "IL CORVO PODCAST",
      badge: "FEATURING",
      description: "Stefano Golisano racconta la genesi di GSA Hotels e la sua visione imprenditoriale.",
      url: "https://www.youtube.com/watch?v=rzLIWEaDbuc"
    },
    {
      id: "cYublCdofos",
      title: "GSA Hotel e Istituto Oficina",
      badge: "JOB MEETING",
      description: "GSA Hotels ha preso parte al progetto Job Meeting Experience promosso da Angelo Golisano, questa volta con l’Istituto Oficina di Bologna.",
      url: "https://www.youtube.com/watch?v=cYublCdofos"
    },
    {
      id: "UOwRwARrSiY",
      title: "Triennale FenImprese Bologna",
      badge: "FENIMPRESE",
      description: "Presentazione dei risultati raggiunti e i progetti futuri verso una crescita internazionale del network.",
      url: "https://www.youtube.com/watch?v=UOwRwARrSiY"
    },
    {
      id: "GVVnU6k9Jjg",
      title: "Rilancio Duchessa Isabella",
      badge: "CASE STUDY",
      description: "Il rilancio dell'unico hotel 5 stelle di Ferrara attraverso l'eccellenza gestionale e il turismo internazionale.",
      url: "https://www.youtube.com/watch?v=GVVnU6k9Jjg"
    },
    {
      id: "mAvvATDQBvY",
      title: "GSA e Formazione Scolastica",
      badge: "EDUCATION",
      description: "Il successo di un corso scolastico innovativo: marketing, pricing e benessere aziendale.",
      url: "https://www.youtube.com/watch?v=mAvvATDQBvY"
    },
    {
      id: "ylUr5gn1XHQ",
      title: "Opportunità per i Giovani",
      badge: "TALENT",
      description: "Il nostro approccio unisce teoria ed esperienza diretta per stimolare la partecipazione e la crescita personale.",
      url: "https://www.youtube.com/watch?v=ylUr5gn1XHQ"
    }
  ];

  const [visionImages, setVisionImages] = React.useState<string[]>([]);

  React.useEffect(() => {
    fetch('/api/vision-images')
      .then(res => res.json())
      .then(data => setVisionImages(data))
      .catch(err => console.error('Error fetching vision images:', err));
  }, []);

  const academyImages = [
    "assets/formazione/1.jpg",
    "assets/formazione/2.jpg",
    "assets/formazione/3.jpg",
    "assets/formazione/4.jpg",
    "assets/formazione/5.jpg",
    "assets/formazione/6.png",
    "assets/formazione/7.jpeg",
    "assets/formazione/8.jpeg"
  ];

  const [activeAcademyImage, setActiveAcademyImage] = React.useState(0);

  const nextAcademyImage = () => {
    setActiveAcademyImage((prev) => (prev + 1) % academyImages.length);
  };

  const prevAcademyImage = () => {
    setActiveAcademyImage((prev) => (prev - 1 + academyImages.length) % academyImages.length);
  };

  /* EXPERIENCES DATA */
  const bolognaExperiences = [
    {
      title: "Bologna: Centro Storico",
      desc: "Torri, piazze e i sapori autentici della tradizione bolognese.",
      img: "https://images.unsplash.com/photo-1516483642775-9a3ac20c54ea?q=80&w=800&auto=format&fit=crop"
    },
    {
      title: "Bologna: San Luca",
      desc: "Una camminata panoramica sotto il portico più lungo del mondo.",
      img: "https://images.unsplash.com/photo-1523906834658-6e24ef2386f9?q=80&w=800&auto=format&fit=crop"
    },
    {
      title: "Bologna: Alternativa",
      desc: "Arte contemporanea e angoli nascosti fuori dai circuiti classici.",
      img: "https://images.unsplash.com/photo-1520175480921-4edfa0683a2f?q=80&w=800&auto=format&fit=crop"
    }
  ];

  const ferraraExperiences = [
    {
      title: "Ferrara: Icone Estensi",
      desc: "Un viaggio tra i simboli del Rinascimento ferrarese.",
      img: "https://images.unsplash.com/photo-1467269204594-9661b134dd2b?q=80&w=800&auto=format&fit=crop"
    },
    {
      title: "Ferrara: Schifanoia",
      desc: "Il Salone dei Mesi e l'astrologia rinascimentale.",
      img: "https://images.unsplash.com/photo-1548574906-7d46c503c457?q=80&w=800&auto=format&fit=crop"
    },
    {
      title: "Ferrara: Ombre e Luci",
      desc: "Atmosfere magiche tra i vicoli del ghetto e le mura.",
      img: "https://images.unsplash.com/photo-1525874684015-58379d421a52?q=80&w=800&auto=format&fit=crop"
    },
    {
      title: "Ferrara: Comacchio",
      desc: "55km di natura incontaminata e silenzi d'acqua.",
      img: "https://images.unsplash.com/photo-1552528148-03820ac188f5?q=80&w=800&auto=format&fit=crop"
    },
    {
      title: "Ferrara: Food Tour",
      desc: "Degustazione itinerante dei tesori gastronomici locali.",
      img: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?q=80&w=800&auto=format&fit=crop"
    },
    {
      title: "Ferrara: Bike Tour",
      desc: "La città delle biciclette vista da una prospettiva unica.",
      img: "https://images.unsplash.com/photo-1517649763962-0c623066013b?q=80&w=800&auto=format&fit=crop"
    }
  ];

  const [activeBologna, setActiveBologna] = React.useState(0);
  const [activeFerrara, setActiveFerrara] = React.useState(0);

  const [formData, setFormData] = React.useState({
    nome: '',
    azienda: '',
    email: '',
    telefono: '',
    messaggio: '',
    interesse: ''
  });
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [submitStatus, setSubmitStatus] = React.useState<'success' | 'error' | null>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { id, value } = e.target;
    setFormData(prev => ({ ...prev, [id]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus(null);

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setSubmitStatus('success');
        setFormData({ nome: '', azienda: '', email: '', telefono: '', messaggio: '', interesse: '' });
      } else {
        setSubmitStatus('error');
      }
    } catch (error) {
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  const nextVideo = () => setActiveVideo((prev) => (prev + 1) % videos.length);
  const prevVideo = () => setActiveVideo((prev) => (prev - 1 + videos.length) % videos.length);

  const nextVisionImage = () => {
    if (visionImages.length === 0) return;
    setActiveVisionImage((prev) => (prev + 1) % visionImages.length);
  };
  const prevVisionImage = () => {
    if (visionImages.length === 0) return;
    setActiveVisionImage((prev) => (prev - 1 + visionImages.length) % visionImages.length);
  };

  // Close lightbox on Escape
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setIsVisionLightboxOpen(false);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  useEffect(() => {
    // Register GSAP
    gsap.registerPlugin(ScrollTrigger);

    gsap.registerPlugin(ScrollTrigger);

    // 1. Animazione Testo (Sinistra)
    gsap.from(".besafe-text-col > *", {
      scrollTrigger: {
        trigger: ".besafe-section",
        start: "top 70%", // Parte quando la sezione è al 70% del viewport
        toggleActions: "play none none reverse"
      },
      y: 30,
      opacity: 0,
      duration: 1,
      stagger: 0.2, // Ritardo tra un elemento e l'altro
      ease: "power3.out"
    });

    // 2. Animazione Cards (Destra) - Effetto Cascata
    gsap.to(".safety-card", {
      scrollTrigger: {
        trigger: ".besafe-cards-col",
        start: "top 80%",
      },
      y: 0, // Torna alla posizione originale
      opacity: 1,
      duration: 0.8,
      stagger: 0.15, // Una dopo l'altra veloce
      ease: "back.out(1.7)" // Leggero rimbalzo elegante
    });

    // --- FOUNDER SPOTLIGHT INTERACTIVE EFFECT ---
    const founderSection = document.querySelector('.founder-section') as HTMLElement;
    const spotlight = document.querySelector('.bg-founder-spotlight') as HTMLElement;

    if (founderSection && spotlight) {
      founderSection.addEventListener('mousemove', (e: MouseEvent) => {
        const rect = founderSection.getBoundingClientRect();
        const x = ((e.clientX - rect.left) / rect.width) * 100;
        const y = ((e.clientY - rect.top) / rect.height) * 100;

        // Muove il centro del gradiente
        spotlight.style.background = `radial-gradient(circle at ${x}% ${y}%, rgba(40, 40, 40, 1) 0%, rgba(0,0,0,1) 60%)`;
      });

      // Reset on leave (optional, but clean)
      founderSection.addEventListener('mouseleave', () => {
        spotlight.style.background = `radial-gradient(circle at center, rgba(30, 30, 30, 1) 0%, rgba(0,0,0,1) 70%)`;
      });
    }

    // --- CONTACT GOLDEN BOKEH STORM GENERATOR ---
    const embersContainer = document.getElementById('embers-container');
    if (embersContainer) {

      // Helper function to spawn particles
      const spawn = (count: number, type: string, minSize: number, maxSize: number, minDur: number, maxDur: number, minOp: number, maxOp: number) => {
        for (let i = 0; i < count; i++) {
          const p = document.createElement('div');
          p.classList.add('ember', type);

          const size = Math.random() * (maxSize - minSize) + minSize;
          const left = Math.random() * 100;
          const duration = Math.random() * (maxDur - minDur) + minDur;
          const delay = Math.random() * 20;
          const opacity = Math.random() * (maxOp - minOp) + minOp;

          // Custom props for animations
          p.style.width = `${size}px`;
          p.style.height = `${size}px`;
          p.style.left = `${left}%`;
          p.style.animationDuration = `${duration}s`;
          p.style.animationDelay = `-${delay}s`;
          p.style.setProperty('--max-opacity', opacity.toString());

          // Random movement values for float animation
          p.style.setProperty('--move-x', `${(Math.random() - 0.5) * 200}px`);
          p.style.setProperty('--move-y', `${(Math.random() - 0.5) * 200}px`);
          p.style.setProperty('--scale-end', (Math.random() * 0.5 + 0.5).toString());

          embersContainer.appendChild(p);
        }
      };

      // 1. BOKEH (Background, Large, Blur)
      spawn(25, 'bokeh', 40, 120, 20, 40, 0.1, 0.3);

      // 2. STARS (Midground, Steady)
      spawn(40, 'star', 3, 6, 10, 20, 0.4, 0.8);

      // 3. SPARKS (Foreground, Fast, Twinkle)
      spawn(50, 'spark', 1, 3, 5, 10, 0.5, 1.0);
    }
    const video = document.getElementById('hero-video') as HTMLVideoElement;

    if (video) {
      // 1. FORZA IL MUTE (Doppia sicurezza per iOS)
      video.muted = true;
      video.defaultMuted = true;
      video.setAttribute('playsinline', '');

      // 2. TENTA IL PLAY CON GESTIONE ERRORE
      const playPromise = video.play();

      if (playPromise !== undefined) {
        playPromise.then(_ => {
          // Autoplay avviato con successo
          console.log("Video playing via JS force.");
        })
          .catch(error => {
            // Autoplay bloccato (es. Risparmio Energetico attivo)
            console.log("Autoplay preventer (Low Power Mode?):", error);
            // Fallback: L'immagine 'poster' resta visibile.
          });
      }
    }
    // Init Lenis
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 2,
      infinite: false,
    } as any);

    // Initialize LOCKED (Wait for Preloader)
    lenis.stop();
    (window as any).lenis = lenis; // EXPOSE TO WINDOW FOR PRELOADER
    window.scrollTo(0, 0); // Force top

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    // Connect GSAP ScrollTrigger to Lenis
    gsap.registerPlugin(ScrollTrigger);

    // --- SENIOR DEV: STRICT JESKO ANIMATIONS ---

    // 1. Headline & Desc Progressive Reveal
    const heroHeadline = new SplitType('.j-headline', { types: 'words,chars' });
    const heroDesc = new SplitType('.j-desc', { types: 'lines' });

    gsap.from(heroHeadline.chars, {
      y: 50,
      opacity: 0,
      stagger: 0.03,
      duration: 1.2,
      ease: "power4.out",
      delay: 0.5
    });

    gsap.from(heroDesc.lines, {
      y: 20,
      opacity: 0,
      stagger: 0.1,
      duration: 1,
      ease: "power3.out",
      delay: 1.2
    });

    // --- 2. GENERIC LUXURY REVEAL SYSTEM (Academy, Founder, Philosophy) ---
    // Targets any element with class .reveal
    // Wrapped in timeout to ensure layout is settled
    setTimeout(() => {
      const revealElements = gsap.utils.toArray('.reveal') as HTMLElement[];
      revealElements.forEach(elem => {
        gsap.fromTo(elem,
          { y: 60, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 1.4,
            ease: "power3.out",
            scrollTrigger: {
              trigger: elem,
              start: "top 90%",
              toggleActions: "play none none reverse"
            }
          }
        );
      });
      ScrollTrigger.refresh();
    }, 100);

    // 2. Window Reveal Animation (Pin & Expand)
    // We pin the hero so the expansion happens "in place" before scrolling down
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: ".jesko-hero-final",
        start: "top top",
        end: "+=100%", // Scroll distance to complete expansion (reduced for speed)
        pin: true,
        scrub: 1,
        anticipatePin: 1
      }
    });

    // Step A: Expand the Window
    tl.to(".jesko-bg-layer", {
      clipPath: "inset(0vh 0vw round 0px)",
      ease: "none",
      duration: 1
    })
      // Step B: Fade Out Hero Text (Optional but cleaner) & Reduce Blur
      .to(".jesko-ui-layer", {
        opacity: 0,
        y: -50,
        duration: 0.5
      }, "<") // Start with previous
      .to(".jesko-bg-video", {
        filter: "blur(0px)", // Focus the video as it opens
        scale: 1.0, // Existing zoom out
        duration: 1
      });

    // 3. Info & CTA Fade In
    gsap.from(".j-info-container, .j-cta-container", {
      y: 50,
      opacity: 0,
      duration: 1.5,
      stagger: 0.2,
      ease: "power3.out",
      delay: 1.0
    });

    // 4. Logo Fade In
    gsap.from(".j-logo", {
      opacity: 0,
      duration: 1,
      delay: 0.5
    });





    // OS DETECTION: Show cursor only on Mac/PC (Windows/Linux)
    const userAgent = navigator.userAgent.toLowerCase();
    const platform = navigator.platform.toLowerCase();

    // --- UI HARDENING: Prevent Image Dragging ---
    document.querySelectorAll('img').forEach(img => {
      img.setAttribute('draggable', 'false');
      img.addEventListener('contextmenu', e => e.preventDefault()); // Optional: Disable right-click save
    });

    const isMac = platform.includes('mac');
    const isWindows = platform.includes('win');
    const isLinux = platform.includes('linux') && !userAgent.includes('android');

    const isDesktopOS = isMac || isWindows || isLinux;

    if (!isDesktopOS) {
      // Nascondi cursore custom su dispositivi non-desktop
      const cursorElements = document.querySelectorAll('#webgl-canvas, canvas, #glitch-lens, .cursor-dot, #cursor-blob, .luxury-cursor');
      cursorElements.forEach(el => {
        const htmlEl = el as HTMLElement;
        if (htmlEl) {
          htmlEl.style.display = 'none';
          htmlEl.style.visibility = 'hidden';
        }
      });

      // Ripristina cursore nativo
      document.body.style.cursor = 'auto';
    }

    // MOBILE FIX: Remove nav-wrapper completely on touch devices
    if (window.matchMedia("(hover: none) and (pointer: coarse)").matches) {
      const navWrapper = document.querySelector('.nav-wrapper');
      const navCapsule = document.querySelector('.nav-capsule');
      const navLogo = document.querySelector('.nav-logo');
      const gooContainer = document.querySelector('.goo-container');

      if (navWrapper) navWrapper.remove();
      if (navCapsule) navCapsule.remove();
      if (navLogo) navLogo.remove();
      if (gooContainer) gooContainer.remove();
    }

    // Custom Cursor Logic - REMOVED (Replaced by WebGL Canvas)

    document.querySelectorAll('a, button, .slide').forEach(el => {
      el.addEventListener('mouseenter', () => document.body.classList.add('hover-active'));
      el.addEventListener('mouseleave', () => document.body.classList.remove('hover-active'));
    });

    // GSAP Animations

    // GSAP Animations

    // Hero Reveal (Updated Class)
    // const heroTitle = new SplitType('.j-headline', { types: 'chars' }); // Skipping SplitType for robustness/performance

    // Jesko Text Statement Reveal
    // Jesko Text Statement Reveal (Progressive)
    const textStats = new SplitType('.jesko-statement', { types: 'words' });

    gsap.fromTo(textStats.words,
      {
        opacity: 0.2,
        color: "rgba(255, 255, 255, 0.2)"
      },
      {
        opacity: 1,
        color: "#FFFFFF",
        stagger: 0.1,
        scrollTrigger: {
          trigger: ".jesko-statement-container",
          start: "top 70%",
          end: "center 50%", // Slightly adjusted for better flow
          scrub: 1
        }
      }
    );

    // Navbar Animation - REMOVED for Visibility Assurance
    gsap.set('.nav-capsule', { opacity: 1, y: 0 });

    // Parallax Images - Removed Conflicting Loop


    // Hotel Parallax & Reveal
    (gsap.utils.toArray('.hotel-section') as HTMLElement[]).forEach(section => {
      const bg = section.querySelector('.hotel-bg');
      const content = section.querySelector('.hotel-content');

      // Parallax BG
      gsap.to(bg, {
        y: "20%",
        ease: "none",
        scrollTrigger: {
          trigger: section,
          start: "top bottom",
          end: "bottom top",
          scrub: 1
        }
      });

      // GOOEY LOGO REVEAL (CSS Keyframes Trigger)
      ScrollTrigger.create({
        trigger: ".jesko-statement-container",
        start: "top bottom",
        onEnter: () => {
          const nav = document.querySelector('.nav-wrapper');
          if (nav) nav.classList.add('active');
        },
        onLeaveBack: () => {
          const nav = document.querySelector('.nav-wrapper');
          if (nav) nav.classList.remove('active');
        }
      });

      // Content Fade Up
      gsap.from(content, {
        y: 100,
        opacity: 0,
        duration: 1.5,
        ease: "power4.out",
        scrollTrigger: {
          trigger: section,
          start: "top 70%",
          end: "top 20%",
          scrub: 1
        }
      });
    });



    // CUSTOM SELECT LOGIC
    const selectWrapper = document.querySelector('.custom-select-wrapper');
    if (selectWrapper) {
      const selectTrigger = selectWrapper.querySelector('.custom-select-trigger');
      const options = selectWrapper.querySelectorAll('.custom-option');
      const selectedText = selectWrapper.querySelector('.selected-text') as HTMLElement;
      const hiddenInput = selectWrapper.querySelector('#interesse') as HTMLInputElement;
      const checkmark = selectWrapper.querySelector('.checkmark-icon') as HTMLElement;

      if (selectTrigger && options.length > 0 && selectedText && hiddenInput && checkmark) {
        // Toggle Dropdown
        selectTrigger.addEventListener('click', () => {
          selectWrapper.classList.toggle('open');
        });

        // Handle Option Click
        options.forEach(option => {
          option.addEventListener('click', function (this: HTMLElement) {
            // Update Text
            selectedText.textContent = this.textContent;
            selectTrigger.classList.add('filled');

            // Update Value
            if (this.dataset.value) {
              hiddenInput.value = this.dataset.value;
            }

            // Show Checkmark
            checkmark.style.display = 'inline-block';

            // Active State Styling (White Text)
            selectedText.style.color = 'white';

            // Close
            selectWrapper.classList.remove('open');

            // Highlight option
            options.forEach(opt => (opt as HTMLElement).classList.remove('selected'));
            this.classList.add('selected');
          });
        });

        // Close when clicking outside
        document.addEventListener('click', (e) => {
          if (!selectWrapper.contains(e.target as Node)) {
            selectWrapper.classList.remove('open');
          }
        });
      }
    }

    // 5. Vision Section Reveal (Bugatti Style)
    const visionTimeline = gsap.timeline({
      scrollTrigger: {
        trigger: ".vision-section-bugatti",
        start: "top 75%", // Triggers when top of section hits 75% of viewport
        toggleActions: "play none none reverse"
      }
    });

    visionTimeline
      .from(".vision-headline", { y: 100, opacity: 0, duration: 1, ease: "power4.out" })
      .from(".vision-desc", { y: 50, opacity: 0, duration: 1, ease: "power3.out" }, "-=0.8")
      .from(".visual-frame", { scale: 0.9, opacity: 0, duration: 1.2, ease: "expo.out" }, "-=0.8")
      .from(".vision-data", { y: 50, opacity: 0, duration: 1, ease: "power3.out" }, "-=0.8");


    // 6. Contact Form Reveal (Luxury Split)
    const contactTimeline = gsap.timeline({
      scrollTrigger: {
        trigger: ".luxury-form-section",
        start: "top 70%",
        toggleActions: "play none none reverse"
      }
    });

    contactTimeline
      .from(".form-intro", { x: -50, opacity: 0, duration: 1, ease: "power3.out" })
      .from(".form-wrapper", { x: 50, opacity: 0, duration: 1, ease: "power3.out" }, "-=0.8");


    // 7. PARTICLES JS CONFIG (Golden Network)
    if (document.getElementById('particles-contact')) {
      (window as any).particlesJS('particles-contact', {
        "particles": {
          "number": { "value": 100, "density": { "enable": true, "value_area": 800 } },
          "color": { "value": "#C5A059" },
          "shape": { "type": "circle" },
          "opacity": {
            "value": 0.7, "random": true,
            "anim": { "enable": true, "speed": 0.5, "opacity_min": 0.3, "sync": false }
          },
          "size": { "value": 4, "random": true },
          "line_linked": {
            "enable": true, "distance": 150, "color": "#C5A059", "opacity": 0.6, "width": 1.5
          },
          "move": {
            "enable": true, "speed": 1, "direction": "none", "random": false, "straight": false, "out_mode": "out", "bounce": false,
            "attract": { "enable": false, "rotateX": 600, "rotateY": 1200 }
          }
        },
        "interactivity": {
          "detect_on": "canvas",
          "events": {
            "onhover": { "enable": true, "mode": "grab" },
            "onclick": { "enable": true, "mode": "push" },
            "resize": true
          },
          "modes": {
            "grab": { "distance": 200, "line_linked": { "opacity": 0.8 } }
          }
        },
        "retina_detect": true
      });
    }


    // FLUID DROPLET CURSOR TRACKING (Fast + Slow)
    // FLUID DROPLET CURSOR TRACKING (Fast + Slow)
    // DETECT MOBILE/TOUCH -> KILL CURSOR
    const isTouch = 'ontouchstart' in window || navigator.maxTouchPoints > 0;

    if (isTouch) {
      const wrappers = document.querySelectorAll('#cursor-wrapper, #cursor-goo-wrapper');
      wrappers.forEach(w => (w as HTMLElement).remove()); // Remove from DOM
    } else {
      // Select GLASS cursors
      const cursorFast = document.getElementById('cursor-fast');
      const cursorSlow = document.getElementById('cursor-slow');

      // Select GOO cursors
      const gooFast = document.getElementById('goo-fast');
      const gooSlow = document.getElementById('goo-slow');

      // Variables
      let mouseX = 0;
      let mouseY = 0;
      let slowX = 0;
      let slowY = 0;

      // 1. Track Mouse Input
      document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;

        // Fast cursors follow immediately
        if (cursorFast) {
          cursorFast.style.left = mouseX + 'px';
          cursorFast.style.top = mouseY + 'px';
        }
        if (gooFast) {
          gooFast.style.left = mouseX + 'px';
          gooFast.style.top = mouseY + 'px';
        }
      });

      // 2. Animation Loop for Smooth Trail
      function animateCursor() {
        // LERP for delay (0.15 = fluid lag)
        slowX += (mouseX - slowX) * 0.15;
        slowY += (mouseY - slowY) * 0.15;

        // Move Slow Glass
        if (cursorSlow) {
          cursorSlow.style.left = slowX + 'px';
          cursorSlow.style.top = slowY + 'px';
        }
        // Move Slow Goo
        if (gooSlow) {
          gooSlow.style.left = slowX + 'px';
          gooSlow.style.top = slowY + 'px';
        }

        requestAnimationFrame(animateCursor);
      }
      animateCursor();

      // 3. Hover Management
      const interactives = document.querySelectorAll('a, button, input, textarea, .category-stripe, .slide');
      interactives.forEach(el => {
        el.addEventListener('mouseenter', () => document.body.classList.add('hover-active'));
        el.addEventListener('mouseleave', () => document.body.classList.remove('hover-active'));
      });
    }
    // --- LIQUID GLASS MENU LOGIC ---
    const overlay = document.getElementById('liquid-glass-menu');
    const trigger = document.getElementById('menu-trigger'); // Main floating trigger (McButton)
    const closeTrigger = document.getElementById('menu-close-trigger'); // Close button inside overlay
    const glassLinks = document.querySelectorAll('.glass-link');
    const previewImg = document.getElementById('glass-preview-img') as HTMLImageElement;
    const desktopTrigger = document.querySelector('.desktop-menu-trigger');

    // Simple Open/Close with Body Scroll Lock + GSAP Choreography
    const toggleMenu = (open: boolean) => {
      if (overlay) {
        if (open) {
          overlay.classList.add('active');
          document.body.style.overflow = 'hidden';

          // GSAP Reveal for Links (Editorial Entrance)
          gsap.fromTo('.glass-link',
            { y: 50, opacity: 0 },
            { y: 0, opacity: 0.4, duration: 0.8, stagger: 0.1, ease: 'power4.out', delay: 0.3 }
          );
        } else {
          overlay.classList.remove('active');
          document.body.style.overflow = '';
        }
      }

      // Update all McButtons state for morphing animation (Hamburger -> X)
      document.querySelectorAll('.McButton').forEach(btn => {
        if (open) btn.classList.add('active');
        else btn.classList.remove('active');
      });
    };

    // Event Listeners
    if (trigger) {
      trigger.addEventListener('click', (e) => {
        e.preventDefault();
        const isActive = overlay?.classList.contains('active');
        toggleMenu(!isActive);
      });
    }

    if (desktopTrigger) {
      desktopTrigger.addEventListener('click', (e) => {
        e.preventDefault();
        toggleMenu(true);
      });
    }

    if (closeTrigger) {
      closeTrigger.addEventListener('click', () => toggleMenu(false));
    }

    // Dynamic Hover Preview System
    glassLinks.forEach(link => {
      link.addEventListener('mouseenter', () => {
        const parent = link.closest('li');
        const nextImg = parent?.getAttribute('data-img');

        if (nextImg && previewImg) {
          // Subtle Cross-fade for the high-end preview
          gsap.to(previewImg, {
            opacity: 0.2, // Quick dim before change
            duration: 0.2,
            onComplete: () => {
              previewImg.src = nextImg;
              gsap.to(previewImg, { opacity: 1, duration: 0.6, ease: 'power2.inOut' });
              // Also add a slight scale effect for depth
              gsap.fromTo(previewImg, { scale: 1.05 }, { scale: 1, duration: 1.5, ease: 'power2.out' });
            }
          });
        }
      });

      // Close menu upon navigation
      link.addEventListener('click', () => toggleMenu(false));
    });

    // SPOTLIGHT LOGO REVEAL (Apple Style)
    ScrollTrigger.create({
      trigger: ".jesko-statement-container", // Trigger based on the TEXT section entering
      start: "top bottom", // As soon as it enters the viewport (Early)
      onEnter: () => {
        const logo = document.querySelector('.spotlight-mode');
        if (logo) logo.classList.add('visible');
      },
      onLeaveBack: () => {
        const logo = document.querySelector('.spotlight-mode');
        if (logo) logo.classList.remove('visible');
      }
    });

    // PRIVACY CONCIERGE LOGIC
    const banner = document.getElementById('cookie-banner');
    const acceptBtn = document.getElementById('cookie-accept');
    const declineBtn = document.getElementById('cookie-decline');

    // Chiave per il LocalStorage
    const COOKIE_KEY = 'gsa_hotels_consent';

    // 1. Controlla se abbiamo già il consenso
    if (!localStorage.getItem(COOKIE_KEY)) {
      // Aspetta un attimo per estetica, poi mostra (1.5s delay)
      setTimeout(() => {
        if (banner) banner.classList.add('visible');
      }, 1500);
    }

    // 2. Funzione per chiudere e salvare
    function closeBanner(consentType: string) {
      // Salva la preferenza ('full' o 'necessary')
      localStorage.setItem(COOKIE_KEY, consentType);

      // Nascondi il banner
      if (banner) banner.classList.remove('visible');

      // Opzionale: attiva script di terze parti
      if (consentType === 'full') {
        console.log('Cookie Marketing Attivati');
      }
    }

    // 3. Event Listeners
    if (acceptBtn) {
      acceptBtn.addEventListener('click', () => closeBanner('full'));
    }

    if (declineBtn) {
      declineBtn.addEventListener('click', () => closeBanner('necessary'));
    }

    // UNIVERSAL LEGAL MODAL SYSTEM
    let scrollPosition = 0;

    // Funzione Apri Modale
    function openModal(modalId: string) {
      const modal = document.getElementById(modalId);
      if (modal) {
        // Salva posizione scroll corrente
        scrollPosition = window.pageYOffset || document.documentElement.scrollTop;

        modal.classList.add('active');

        // Blocco scroll mantenendo posizione
        document.body.style.overflow = 'hidden';
        document.documentElement.style.overflow = 'hidden';
        document.body.style.position = 'fixed';
        document.body.style.top = `-${scrollPosition}px`;
        document.body.style.width = '100%';
      }
    }

    // Funzione Chiudi Modale (Universale)
    function closeModal() {
      document.querySelectorAll('.legal-modal').forEach(m => m.classList.remove('active'));

      // Sblocco scroll e ripristino posizione
      document.body.style.overflow = '';
      document.documentElement.style.overflow = '';
      document.body.style.position = '';
      document.body.style.top = '';
      document.body.style.width = '';

      // Ripristina scroll alla posizione originale
      window.scrollTo(0, scrollPosition);
    }

    // Auto-Detect: Collega tutti i link con parole chiave
    const allLinks = document.querySelectorAll('a');
    allLinks.forEach(link => {
      const href = link.getAttribute('href') || '';
      const text = link.innerText.toLowerCase();

      // Privacy Policy (include cookie banner link)
      if (text.includes('privacy') || href.includes('privacy')) {
        link.addEventListener('click', (e) => {
          e.preventDefault();
          openModal('privacy-modal');
        });
      }
      // Termini e Condizioni
      else if (text.includes('termini') || text.includes('condizioni') || href.includes('terms')) {
        link.addEventListener('click', (e) => {
          e.preventDefault();
          openModal('terms-modal');
        });
      }
      // Cookie Policy
      else if (text.includes('cookie')) {
        link.addEventListener('click', (e) => {
          e.preventDefault();
          openModal('cookie-policy-modal');
        });
      }
    });

    // Chiudi con X e Backdrop
    document.querySelectorAll('.legal-close-btn, .legal-modal-backdrop').forEach(el => {
      el.addEventListener('click', closeModal);
    });

    // Chiudi con ESC
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') closeModal();
    });

    // EXPLICIT HANDLER per cookie banner privacy link
    const cookieBannerLink = document.querySelector('.cookie-link');
    if (cookieBannerLink) {
      cookieBannerLink.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        openModal('privacy-modal');
      });
    }


    // Blocca scroll
    document.body.style.overflow = 'hidden';

    const preloaderOverlay = document.getElementById('zoom-preloader');
    const shuffler = document.getElementById('shuffling-text');
    const logoGold = document.getElementById('logo-gold');
    const logoHole = document.getElementById('logo-hole');

    // Le "Robe diverse" che compongono il caricamento (Italiano)
    const words = [
      "VISIONE",
      "ASSET",
      "VALORE",
      "FUTURO",
      "PRESTIGIO",
      "RENDIMENTO",
      "STRATEGIA"
    ];

    let wordIndex = 0;

    // 1. FASE SHUFFLE (Composizione veloce)
    // Cambia parola ogni 100ms
    const shuffleInterval = setInterval(() => {
      if (shuffler) {
        shuffler.innerText = words[wordIndex];
        wordIndex++;
        if (wordIndex >= words.length) wordIndex = 0;
      }
    }, 120);

    // Dopo 1.5 secondi, stoppa lo shuffle e mostra GSA
    setTimeout(() => {
      clearInterval(shuffleInterval);
      if (shuffler) shuffler.classList.add('hidden'); // Via le parole

      // Appare GSA (Assemblaggio) - ENTRAMBI (Il Gold copre il Buco che è già pronto sotto)
      if (logoGold) logoGold.classList.add('visible');
      if (logoHole) logoHole.classList.add('visible');

      // 2. FASE ZOOM (L'entrata nel sito)
      // Aspetta un attimo che l'utente legga GSA (0.8s), poi ZOOM
      setTimeout(() => {
        // Trigger Zoom su entrambi
        if (logoGold) logoGold.classList.add('zoom-in');
        if (logoHole) logoHole.classList.add('zoom-in');

        // Mentre zooma, possiamo già sbloccare lo scroll o far partire la hero
        // Ma aspettiamo che il nero svanisca per pulizia

        // 3. FASE REVEAL (Pulizia finale)
        // Aspetta la fine della transizione di zoom (1.2s)
        setTimeout(() => {
          if (preloaderOverlay) preloaderOverlay.classList.add('finished');
          document.body.style.overflow = ''; // Sblocca sito (CSS Fallback)

          // UNLOCK LENIS (Resume Scroll)
          if ((window as any).lenis) {
            (window as any).lenis.start();
          }

          // REMOVE LOADING CLASS (CSS LOCK)
          document.documentElement.classList.remove('loading');
          document.body.classList.remove('loading');

          // RECALCULATE ANIMATIONS (Crucial for Contact Section visibility)
          setTimeout(() => {
            ScrollTrigger.refresh();
          }, 100);

          // Rimuovi dal DOM per performance
          setTimeout(() => {
            if (preloaderOverlay) preloaderOverlay.remove();
          }, 500);

        }, 1000); // Timing sincronizzato col picco dello zoom

      }, 800); // Tempo di "lettura" del logo fermo

    }, 1800); // Durata totale dello shuffle iniziale
    const contextMenu = document.getElementById('gsa-context-menu');
    const ctxPartner = document.getElementById('ctx-partner');
    const ctxNewTab = document.getElementById('ctx-newtab');
    const ctxSubmit = document.getElementById('ctx-submit');

    // Variabili per salvare l'elemento cliccato
    let targetLink: HTMLAnchorElement | null = null;
    let targetAction: HTMLElement | null = null;

    // 1. ASCOLTA IL CLICK DESTRO
    document.addEventListener('contextmenu', (e: MouseEvent) => {
      e.preventDefault(); // BLOCCA il menu nativo del browser

      // Resetta le voci dinamiche (nascondi tutto tranne Partner)
      if (ctxNewTab) ctxNewTab.classList.add('hidden');
      if (ctxSubmit) ctxSubmit.classList.add('hidden');

      // --- ANALISI CONTESTO ---

      // Caso A: L'utente ha cliccato su un LINK (o dentro un link)
      targetLink = (e.target as HTMLElement).closest('a');
      if (targetLink && ctxNewTab) {
        ctxNewTab.classList.remove('hidden');
      }

      // Caso B: L'utente ha cliccato su un BUTTON o SUBMIT
      targetAction = (e.target as HTMLElement).closest('button, input[type="submit"], .btn');
      if (targetAction && ctxSubmit) {
        ctxSubmit.classList.remove('hidden');
      }

      // --- POSIZIONAMENTO MENU ---
      if (contextMenu) {
        // Calcola posizione per non uscire dallo schermo
        let x = e.clientX;
        let y = e.clientY;

        const menuWidth = contextMenu.offsetWidth || 260; // Fallback se nascosto
        const menuHeight = contextMenu.offsetHeight || 150;
        const windowWidth = window.innerWidth;
        const windowHeight = window.innerHeight;

        // Se esce a destra, spostalo a sinistra
        if (x + menuWidth > windowWidth) x -= menuWidth;
        // Se esce sotto, spostalo sopra
        if (y + menuHeight > windowHeight) y -= menuHeight;

        contextMenu.style.left = `${x}px`;
        contextMenu.style.top = `${y}px`;

        // MOSTRA IL MENU
        contextMenu.classList.add('active');
      }
    });

    // 2. CHIUDI IL MENU (Al click ovunque o scroll)
    document.addEventListener('click', () => { if (contextMenu) contextMenu.classList.remove('active') });
    window.addEventListener('scroll', () => { if (contextMenu) contextMenu.classList.remove('active') });

    // 3. AZIONI DEL MENU

    // Azione 1: Diventa Partner (Vai al form)
    if (ctxPartner) {
      ctxPartner.addEventListener('click', () => {
        // Si può fare scroll o redirect
        const formSection = document.getElementById('features'); // Usiamo una sezione esistente come target
        if (formSection) formSection.scrollIntoView({ behavior: 'smooth' });
      });
    }

    // Azione 2: Apri in Nuova Scheda
    if (ctxNewTab) {
      ctxNewTab.addEventListener('click', () => {
        if (targetLink) {
          window.open(targetLink.href, '_blank');
        }
      });
    }

    // Azione 3: Invia / Clicca Bottone
    if (ctxSubmit) {
      ctxSubmit.addEventListener('click', () => {
        if (targetAction) {
          targetAction.click(); // Simula il click sinistro sull'elemento
        }
      });
    }



    // Cleanup function
    return () => {
      ScrollTrigger.getAll().forEach(t => t.kill());
      if ((window as any).lenis) (window as any).lenis.destroy();
    };
  }, []);

  return (
    <div>
      <meta charSet="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <title>GSA Hotels | The Art of Hosting</title>
      {/* SVG Filter for Fisheye Lens (Physical Refraction) */}
      <svg style={{ position: 'absolute', width: 0, height: 0, overflow: 'hidden' }} aria-hidden="true">
        <defs>
          <filter id="lensFilter" colorInterpolationFilters="sRGB">
            {/* Liquid Noise for subtle organic movement */}
            <feTurbulence type="fractalNoise" baseFrequency="0.015" numOctaves={2} result="liquidNoise" />
            {/* Radial Displacement Map (Responsive & Centered) */}
            <feImage xlinkHref="data:image/svg+xml;charset=utf-8,%3Csvg xmlns='http://www.w3.org/2000/svg' width='100%25' height='100%25'%3E%3CradialGradient id='g' cx='50%25' cy='50%25' r='50%25'%3E%3Cstop offset='0%25' stop-color='rgb(128,128,128)'/%3E%3Cstop offset='100%25' stop-color='rgb(255,255,255)'/%3E%3C/radialGradient%3E%3Crect width='100%25' height='100%25' fill='url(%23g)'/%3E%3C/svg%3E" result="lensMap" x={0} y={0} width="100%" height="100%" preserveAspectRatio="none" />
            {/* 1. Apply Fisheye Bulge (Reduced scale for stability) */}
            <feDisplacementMap in="SourceGraphic" in2="lensMap" scale={15} xChannelSelector="R" yChannelSelector="G" result="lensDistortion" />
            {/* 2. Apply Liquid Noise to the distorted result */}
            <feDisplacementMap in="lensDistortion" in2="liquidNoise" scale={10} result="finalDistortion" />
            {/* Composite to blend if needed, though usually standard filter chain is enough */}
            <feComposite in="finalDistortion" in2="SourceGraphic" operator="in" />
          </filter>
        </defs>
      </svg>
      <svg width={0} height={0}>
        <filter id="kill">
          <feColorMatrix type="matrix" result="red_" values="4 0 0 0 0
        0 0 0 0 0 
        0 0 0 0 0 
        0 0 0 1 0" />
          <feOffset in="red_" dx={2} dy={0} result="red" />
          <feColorMatrix type="matrix" in="SourceGraphic" result="blue_" values="0 0 0 0 0
        0 3 0 0 0 
        0 0 10 0 0 
        0 0 0 1 0" />
          <feOffset in="blue_" dx={-3} dy={0} result="blue" />
          <feBlend mode="screen" in="red" in2="blue" />
        </filter>
      </svg>
      {/* SVG Filter for Metaball (Gooey Effect) */}
      <svg style={{ position: 'absolute', width: 0, height: 0, overflow: 'hidden' }} aria-hidden="true">
        <filter id="goo">
          <feGaussianBlur in="SourceGraphic" stdDeviation={5} result="blur" />
          <feColorMatrix in="blur" mode="matrix" values="2 0 0 0 0  
                                                     0 2 0 0 0  
                                                     0 0 2 0 0  
                                                     0 0 0 18 -7" result="goo" />
          <feComposite in="SourceGraphic" in2="goo" operator="atop" />
        </filter>
      </svg>
      {/* Styles */}

      <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css" />
      {/* PRELOADER: THE GSA REVEAL (Typographic) */}
      {/* PRELOADER: THE ZOOM-THROUGH REVEAL (Cutout Mask Edition) */}
      <div id="zoom-preloader" className="zoom-overlay">
        <div className="zoom-bg" />
        <div className="zoom-content">
          <div id="shuffling-text" className="shuffle-word">VISIONE</div>
          {/* Layer 1: GOLD (Visible initially) */}
          <div id="logo-gold" className="gsa-huge-logo gsa-logo-layer gold">
            <Image src="/assets/logo.png" alt="GSA Hotels" width={800} height={300} priority />
          </div>
          {/* Layer 2: HOLE (Visible during zoom to cut the mask) */}
          <div id="logo-hole" className="gsa-huge-logo gsa-logo-layer hole">
            <Image src="/assets/logo.png" alt="GSA Hotels" width={800} height={300} priority />
          </div>
        </div>
      </div>
      {/* SVG FILTER (User Snippet) */}
      <svg style={{ width: 0, height: 0, position: 'absolute', pointerEvents: 'none' }}>
        <defs>
          <filter id="goo">
            <feGaussianBlur in="SourceGraphic" stdDeviation={12} result="blur" />
            <feColorMatrix in="blur" mode="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 19 -9" result="goo" />
            <feBlend in="SourceGraphic" in2="goo" />
          </filter>
        </defs>
      </svg>
      {/* Custom Cursor */}
      {/* Mobile Toggle (Moved to Body for Z-Index Safety) */}
      <a className="McButton mobile-toggle" data-menu="hamburger-menu">
        <b />
        <b />
        <b />
      </a>
      {/* LIQUID GLASS MENU OVERLAY (Editorial Full-Screen) */}
      <div id="liquid-glass-menu" className="glass-menu-overlay">
        <div className="glass-menu-header">
          <Link href="/" className="glass-logo"><Image src="/assets/logo.png" alt="GSA Logo" width={120} height={40} /></Link>
          <div className="glass-close-btn mobile-close-btn">
            <div className="McButton active" id="menu-close-trigger">
              <b /><b /><b />
            </div>
          </div>
        </div>

        <div className="glass-menu-content">
          {/* LEFT: Navigation Links */}
          <nav className="glass-nav-col">
            <ul className="editorial-links">
              <li data-img="assets/academy_white_glove.png"><a href="#services" className="glass-link">ACADEMY</a></li>
              <li data-img="assets/BeSafe.png"><a href="#besafe" className="glass-link">BESAFE</a></li>
              <li data-img="assets/duchessa_isabella.png"><a href="#experiences" className="glass-link">ESPERIENZE</a></li>
              <li data-img="assets/BeSafe.png"><a href="#fleet-section" className="glass-link">PARTNER</a></li>
              <li data-img="assets/duchessa_isabella.png"><a href="#founder" className="glass-link">STRATEGIA</a></li>
              <li data-img="assets/wellness.png"><a href="#career" className="glass-link">CARRIERE</a></li>
              <li data-img="assets/duchessa_isabella.png"><a href="#philosophy" className="glass-link">VISION</a></li>
            </ul>
          </nav>

          {/* RIGHT: Luxury Preview Image */}
          <div className="glass-preview-col">
            <div className="preview-image-container">
              <Image 
                src="/assets/duchessa_isabella.png" 
                alt="Preview" 
                id="glass-preview-img" 
                fill
                style={{ objectFit: 'cover' }}
                sizes="(max-width: 768px) 100vw, 33vw"
              />
              <div className="preview-overlay" />
            </div>
          </div>
        </div>

        <div className="glass-menu-footer">
          <div className="footer-links">
            <a href="mailto:info@gsahotels.com">info@gsahotels.com</a>
            <div className="glass-socials">
              <a href="#"><i className="fab fa-linkedin" /></a>
              <a href="https://www.instagram.com/gsahotels/"><i className="fab fa-instagram" /></a>
            </div>
          </div>
        </div>
      </div>
      {/* LAYER 1: LIQUID GHOST (Solid White, Goo Filter) */}
      <div id="cursor-goo-wrapper">
        <div id="goo-fast" className="goo-blob"></div>
        <div id="goo-slow" className="goo-blob"></div>
      </div>
      {/* LAYER 2: GLASS SHELL - solo il ring (cursor-slow) */}
      <div id="cursor-wrapper">
        <div id="cursors">
          <div id="cursor-slow" className="cursor-dot" />
        </div>
      </div>
      {/* Page Transition Curtain */}
      <div className="transition-curtain" />
      {/* GLOBAL BACKGROUND LAYER (Moved out of Hero) */}
      <div className="jesko-bg-layer">
        <video id="hero-video" className="jesko-bg-video" autoPlay muted loop playsInline poster="assets/hero-fallback.png">
          <source src="assets/wallpaperherosection.mp4" type="video/mp4" />
        </video>
        <div className="jesko-overlay-layer" />
      </div>
      {/* Floating Navbar (Default Visible) */}
      <div className="nav-wrapper">
        {/* GOOEY BACKDROP */}
        <div className="goo-container">
          <div className="goo-cursor" id="goo-logo-blob" />
          <div className="goo-base" id="goo-capsule-blob" />
        </div>
        {/* Spotlight Logo (Content) */}
        <a href="/" className="nav-logo spotlight-mode">
          <Image src="/assets/logo.png" alt="GSA" width={100} height={35} />
        </a>
        <nav className="nav-capsule navbar nav-menu">
          {/* MODO MINIMALISTA - SOLO LOGO E MENU PER ELIMINARE CLUTTER */}
          <div className="desktop-menu-trigger">
            <div className="hamburger-icon">
              <span />
              <span />
              <span />
            </div>
            <span>MENU</span>
          </div>

          <div className="nav-links">
            <a href="#services" className="nav-link" data-text="ACADEMY"><span>ACADEMY</span></a>
            <a href="#besafe" className="nav-link" data-text="BESAFE"><span>BESAFE</span></a>
            <a href="#experiences" className="nav-link" data-text="ESPERIENZE"><span>ESPERIENZE</span></a>
            <a href="#founder" className="nav-link" data-text="STRATEGIA"><span>STRATEGIA</span></a>
            <a href="#fleet-section" className="nav-link" data-text="PARTNER"><span>PARTNER</span></a>
            <a href="#career" className="nav-link" data-text="CARRIERE"><span>CARRIERE</span></a>
            <a href="#philosophy" className="nav-link" data-text="VISION"><span>VISION</span></a>
            <Link href="/blog" className="nav-link" data-text="BLOG"><span>BLOG</span></Link>
          </div>
          {/* CTA - solo Diventa Partner nella capsule */}
          <a href="#contact" className="nav-cta">CONTATTI</a>
        </nav>
      </div>
      {/* AUTH BUTTONS - Floating a destra, fuori dalla navbar capsule */}
      <div className="nav-auth-floating">
        <SignedOut>
          <Link href="/login" className="auth-icon-btn" title="Accedi">
            <i className="far fa-user" />
          </Link>
        </SignedOut>
        <SignedIn>
          <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
            <UserButton />
            <Link href="/dashboard" className="auth-icon-btn" title="Dashboard">
              <i className="fas fa-columns" />
            </Link>
          </div>
        </SignedIn>
      </div>
      {/* Main Content */}
      <main>
        {/* Hero Section (Jesko Clone) */}
        {/* Hero Section (Senior Dev Repair) */}
        <section className="jesko-hero-final">
          {/* Background Layer (Removed - Global now) */}
          {/* Content Layer */}
          <div className="jesko-ui-layer">
            {/* TOP LEFT: Logo */}
            <div className="j-logo-container">
              <Link href="/" onClick={() => window.location.reload()}><Image src="/assets/logo.png" alt="GSA Logo" className="j-logo" style={{ transform: 'scale(1.1)', transformOrigin: 'left center' }} width={140} height={50} priority /></Link>
            </div>
            {/* CENTER LEFT: Headline */}
            <div className="j-headline-container">
              <h1 className="j-headline">
                IL FUTURO<br />
                <span className="j-italic"> DELL'OSPITALITÀ</span>
              </h1>
            </div>
            {/* BOTTOM LEFT: Info */}
            <div className="j-info-container">
              <div className="j-separator" />
              <p className="j-desc">Uniamo imprenditori visionari e strutture d'eccellenza. GSA Hotels
                ridefinisce il concetto di gestione alberghiera, massimizzando il valore del tuo asset
                attraverso strategie innovative e un network esclusivo.</p>
            </div>
            {/* BOTTOM RIGHT: CTA */}
            <div className="j-cta-container">
              <div className="j-scroll-in">
                <span>SCOPRI I VANTAGGI</span>
                <i className="fas fa-chevron-down j-arrow-down" />
                <div className="j-line" />
              </div>
            </div>
          </div>
        </section>
        {/* Pillars Section (Nuclear Insert) */}
        <section id="features" className="pillars-section">
          <div className="jesko-statement-container">
            <p className="jesko-statement">
              Unisciti a noi: <br /><br />
              Entrare in GSA Hotels significa accedere ad un know-how condiviso e una forza
              commerciale che il singolo hotel non può raggiungere.<br /><br />
            </p>
          </div>
        </section>

        {/* Refined Corporate Spotlight Area */}
        <section className="corporate-spotlight-section">
          <div className="container spotlight-container">
            <div className="spotlight-content reveal">
              <span className="label-gold">CORPORATE VISION</span>
              <h2 className="vision-headline">L'Eccellenza nell'Asset Management</h2>
              <div className="vision-divider" />
              <p className="vision-body">
                GSA Hotels non si limita alla gestione: noi eleviamo il potenziale di ogni struttura attraverso un'ingegneria dei processi impeccabile e una visione lungimirante che garantisce rendimenti superiori e un prestigio senza tempo.
              </p>
              <div className="vision-footnote">
                Un approccio sartoriale per patrimoni immobiliari d'eccezione.
              </div>
            </div>

            <div className="spotlight-visual reveal">
              <div className="video-preview-wrapper-luxury">
                <a href="https://www.youtube.com/watch?v=MFyef0yMQsY" target="_blank" rel="noopener noreferrer" className="video-preview-card">
                  <div className="video-overlay" />
                  <Image 
                    src="https://img.youtube.com/vi/MFyef0yMQsY/maxresdefault.jpg" 
                    alt="GSA Corporate Video" 
                    fill
                    className="video-thumbnail" 
                    style={{ objectFit: 'cover' }}
                  />
                  <div className="play-btn-luxury">
                    <i className="fas fa-play" />
                  </div>
                  <div className="video-card-badge">
                    WATCH FILM
                  </div>
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* 1. INTRODUCTION BANNER (NEW) */}
        <section className="intro-banner-section" style={{ padding: '120px 0', background: 'linear-gradient(to bottom, #050505, #0a0a0a)' }}>
          <div className="container">
            <div className="intro-banner-content reveal" style={{ textAlign: 'center' }}>
              <span className="label-gold" style={{ letterSpacing: '0.3em' }}>LA NOSTRA FILOSOFIA</span>
              <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(2.5rem, 5vw, 4.5rem)', color: 'white', marginTop: '20px', lineHeight: '1.1' }}>
                L'Eccellenza è uno <span style={{ color: 'var(--gold)', fontStyle: 'italic' }}>Standard</span>,<br />
                l'Emozione è la nostra Firma.
              </h2>
              <div className="gold-line" style={{ margin: '40px auto' }}></div>
              <p style={{ maxWidth: '700px', margin: '0 auto', fontSize: '1.1rem', opacity: 0.8 }}>
                GSA Hotels trasforma la gestione alberghiera in una forma d'arte digitale e operativa, dove ogni dettaglio è progettato per elevare il valore dell'asset e l'esperienza dell'ospite.
              </p>
            </div>
          </div>
        </section>

        {/* GSA ACADEMY SECTION (The Certificate) */}
        <section id="services" className="academy-section">
          <div className="bg-academy-grid" />
          <div className="container academy-container">
            <div className="academy-content reveal">
              <span className="label-gold">Formazione Certificata: GSA ACADEMY</span>
              <h2 className="academy-title">Costruire il Futuro</h2>
              <div className="separator-line" />
              <p className="academy-desc">
                GSA Hotels non è solo gestione, è opportunità.
                Offriamo percorsi certificati che uniscono competenze concrete e visione manageriale, trasformando il talento in professione.
              </p>
              <a href="mailto:stefanogolisano@gsa-hotels.com" className="btn-jesko">
                <i className="fas fa-envelope" /> FORMATI INSIEME A NOI
              </a>
            </div>
            <div className="academy-visual reveal">
              <div className="academy-slider-wrapper">
                <div className="academy-image-wrapper">
                  <Image 
                    src={`/${academyImages[activeAcademyImage]}`} 
                    alt="GSA Academy Highlight" 
                    key={activeAcademyImage} 
                    fill
                    className="academy-slide-img"
                    style={{ objectFit: 'cover' }}
                    sizes="(max-width: 768px) 100vw, 80vw"
                  />

                  {/* Internal Arrows */}
                  <button onClick={prevAcademyImage} className="academy-arrow prev" aria-label="Precedente">
                    <i className="fas fa-chevron-left" />
                  </button>
                  <button onClick={nextAcademyImage} className="academy-arrow next" aria-label="Successiva">
                    <i className="fas fa-chevron-right" />
                  </button>
                </div>

                {/* Dots Pagination */}
                <div className="academy-slider-dots">
                  {academyImages.map((_, index) => (
                    <div
                      key={index}
                      className={`academy-dot ${index === activeAcademyImage ? 'active' : ''}`}
                      onClick={() => setActiveAcademyImage(index)}
                    />
                  ))}
                </div>
              </div>

              <div className="academy-badge">
                <svg viewBox="0 0 200 200" className="rotating-text">
                  <defs>
                    <path id="circlePath" d="M 100, 100 m -75, 0 a 75,75 0 1,1 150,0 a 75,75 0 1,1 -150,0" />
                  </defs>
                  <text fill="#C5A059" fontSize={18} letterSpacing={3} fontFamily="var(--font-body)" fontWeight={600}>
                    <textPath href="#circlePath" startOffset="0%">
                      GSA CERTIFIED • EXCELLENCE • TRAINING •
                    </textPath>
                  </text>
                </svg>
                <div className="badge-center"><Image src="/assets/logo.png" alt="GSA Logo" width={80} height={30} /></div>
              </div>
            </div>
          </div>
        </section>
        {/* 3. BESAFE RATE SECTION */}
        <section id="besafe" className="besafe-section">
          <div className="bg-besafe-aurora">
            <div className="orb orb-1" />
            <div className="orb orb-2" />
          </div>
          <div className="container besafe-container">
            <div className="besafe-text-col">
              <span className="label-gold">PREMIUM PROTECTION</span>
              <div className="besafe-header-flex" style={{ display: 'flex', alignItems: 'center', gap: '20px', marginBottom: '10px' }}>
                <Image 
                  src="/assets/BeSafe.png" 
                  alt="BeSafe Rate" 
                  width={150} 
                  height={45} 
                  style={{ height: '45px', width: 'auto', filter: 'brightness(1.2)' }} 
                />
                <h2 className="besafe-title" style={{ margin: 0 }}>BeSafe Rate</h2>
              </div>
              <h3 className="besafe-subtitle">Il lusso della serenità.</h3>
              <p className="besafe-desc">
                Prenotare una struttura d'eccellenza richiede garanzie d'eccellenza.
                Con <strong>BeSafe Rate</strong>, la tariffa include un'assicurazione completa che protegge il
                tuo investimento e la tua esperienza, prima e durante il soggiorno.
              </p>
            </div>
            <div className="besafe-cards-col">
              <div className="safety-card glass-effect">
                <div className="card-icon"><i className="fas fa-undo" /></div>
                <div className="card-info">
                  <h4>Rimborso Garantito</h4>
                  <p>Fino al 100% dell’importo prepagato in caso di cancellazione per eventi imprevisti.</p>
                </div>
              </div>
              <div className="safety-card glass-effect">
                <div className="card-icon"><i className="fas fa-user-md" /></div>
                <div className="card-info">
                  <h4>Copertura Sanitaria</h4>
                  <p>Assistenza completa per spese mediche e farmaceutiche dovute a infortuni o malattie.</p>
                </div>
              </div>
              <div className="safety-card glass-effect">
                <div className="card-icon"><i className="fas fa-suitcase" /></div>
                <div className="card-info">
                  <h4>Protezione Bagaglio</h4>
                  <p>Garanzia totale in caso di furto o mancata consegna dei tuoi effetti personali.</p>
                </div>
              </div>
              <div className="safety-card glass-effect">
                <div className="card-icon"><i className="fas fa-road" /></div>
                <div className="card-info">
                  <h4>Assistenza Stradale</h4>
                  <p>Supporto immediato sul posto per viaggiare senza pensieri verso la tua destinazione.</p>
                </div>
              </div>
              {/* Button added below the cards */}
              <div style={{ textAlign: 'center', marginTop: '20px' }}>
                <a href="https://www.besafesuite.com/besaferate/" target="_blank" className="btn-besafe-site">
                  SCOPRI DI PIÙ <i className="fas fa-external-link-alt" style={{ marginLeft: '10px', fontSize: '0.8rem' }} />
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* 4. ESPERIENZE MEMORABILI: TERRITORIAL DUAL SHOWCASE */}
        <section id="experiences" className="experiences-section">
          <div className="container">
            <div className="section-header reveal" style={{ textAlign: 'center', marginBottom: '80px' }}>
              <span className="label-gold">TERRITORI D'AUTORE</span>
              <h2 className="vision-headline">Esperienze Memorabili</h2>
              <div className="vision-divider" style={{ margin: '20px auto' }} />
              <p className="vision-body" style={{ maxWidth: '800px', margin: '0 auto' }}>
                Dalle torri medievali di Bologna al fascino rinascimentale di Ferrara. 
                Abbiamo selezionato percorsi esclusivi per farvi vivere l'anima più autentica dei nostri territori.
              </p>
            </div>

            <div className="experience-dual-columns">
              {/* BOLOGNA SLIDER */}
              <div className="experience-col reveal">
                <div className="exp-city-label">BOLOGNA</div>
                <div className="exp-slider-luxury">
                  <div className="exp-image-wrapper">
                    <Image 
                      src={bolognaExperiences[activeBologna].img} 
                      alt={bolognaExperiences[activeBologna].title} 
                      key={`bo-${activeBologna}`} 
                      fill
                      className="exp-slide-img"
                      style={{ objectFit: 'cover' }}
                      sizes="(max-width: 768px) 100vw, 50vw"
                    />
                    <div className="exp-overlay-luxury">
                      <div className="exp-content-box">
                        <span className="exp-count">0{activeBologna + 1} / 03</span>
                        <h3>{bolognaExperiences[activeBologna].title}</h3>
                        <p>{bolognaExperiences[activeBologna].desc}</p>
                        <a href="/esperienze" className="exp-link-btn">SCOPRI DI PIÙ <i className="fas fa-arrow-right" /></a>
                      </div>
                    </div>
                    
                    {/* Internal Controls */}
                    <div className="exp-controls-internal">
                      <button onClick={() => setActiveBologna((prev) => (prev - 1 + bolognaExperiences.length) % bolognaExperiences.length)} className="exp-arrow-btn">
                        <i className="fas fa-chevron-left" />
                      </button>
                      <button onClick={() => setActiveBologna((prev) => (prev + 1) % bolognaExperiences.length)} className="exp-arrow-btn">
                        <i className="fas fa-chevron-right" />
                      </button>
                    </div>
                  </div>
                  {/* Dots */}
                  <div className="exp-dots-pagination">
                    {bolognaExperiences.map((_, i) => (
                      <div key={i} className={`exp-dot ${i === activeBologna ? 'active' : ''}`} onClick={() => setActiveBologna(i)} />
                    ))}
                  </div>
                </div>
              </div>

              {/* FERRARA SLIDER */}
              <div className="experience-col reveal">
                <div className="exp-city-label">FERRARA</div>
                <div className="exp-slider-luxury">
                  <div className="exp-image-wrapper">
                    <Image 
                      src={ferraraExperiences[activeFerrara].img} 
                      alt={ferraraExperiences[activeFerrara].title} 
                      key={`fe-${activeFerrara}`} 
                      fill
                      className="exp-slide-img"
                      style={{ objectFit: 'cover' }}
                      sizes="(max-width: 768px) 100vw, 50vw"
                    />
                    <div className="exp-overlay-luxury">
                      <div className="exp-content-box">
                        <span className="exp-count">0{activeFerrara + 1} / 06</span>
                        <h3>{ferraraExperiences[activeFerrara].title}</h3>
                        <p>{ferraraExperiences[activeFerrara].desc}</p>
                        <a href="/esperienze" className="exp-link-btn">SCOPRI DI PIÙ <i className="fas fa-arrow-right" /></a>
                      </div>
                    </div>
                    
                    {/* Internal Controls */}
                    <div className="exp-controls-internal">
                      <button onClick={() => setActiveFerrara((prev) => (prev - 1 + ferraraExperiences.length) % ferraraExperiences.length)} className="exp-arrow-btn">
                        <i className="fas fa-chevron-left" />
                      </button>
                      <button onClick={() => setActiveFerrara((prev) => (prev + 1) % ferraraExperiences.length)} className="exp-arrow-btn">
                        <i className="fas fa-chevron-right" />
                      </button>
                    </div>
                  </div>
                  {/* Dots */}
                  <div className="exp-dots-pagination">
                    {ferraraExperiences.map((_, i) => (
                      <div key={i} className={`exp-dot ${i === activeFerrara ? 'active' : ''}`} onClick={() => setActiveFerrara(i)} />
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <div className="experience-footer reveal" style={{ textAlign: 'center', marginTop: '60px' }}>
              <a href="/esperienze" className="btn-jesko">
                <i className="fas fa-map-marked-alt" /> ESPLORA TUTTE LE ESPERIENZE
              </a>
            </div>
          </div>
        </section>

        {/* FOUNDER SPOTLIGHT (Editorial Style) */}
        <section id="founder" className="founder-section">
          <div className="bg-founder-spotlight" />
          <div className="bg-noise" />
          <div className="container founder-container">
            <div className="founder-bio reveal">
              <span className="label-gold">La mente dietro GSA Hotels</span>
              <h2 className="founder-name">Stefano Golisano</h2>
              <div className="separator-line" />
              <p className="founder-text">
                Un decennio di esperienza nel settore alberghiero ha forgiato una visione chiara:
                l'ospitalità non è solo servizio, è un'esperienza.
              </p>
              <p className="founder-text">
                Stefano ha fondato GSA Hotels per colmare il divario tra la gestione tradizionale e le moderne
                esigenze di ricettività.
                <br /><br />
                Se vuoi approfondire il mondo GSA Hotels e conoscere la persona che ne guida la strategia guarda i suoi interventi.
              </p>
              <div className="founder-signature">
                Stefano Golisano
              </div>
            </div>
            <div className="founder-media reveal">
              <div className="video-slider-wrapper">
                <div className="slider-video-container">
                  <a href={videos[activeVideo].url} target="_blank" className="video-preview-card">
                    <div className="video-overlay" />
                    <Image 
                      src={`https://img.youtube.com/vi/${videos[activeVideo].id}/maxresdefault.jpg`} 
                      alt={videos[activeVideo].title} 
                      fill
                      className="video-thumbnail"
                      style={{ objectFit: 'cover' }}
                    />
                    <div className="podcast-badge">
                      <span>{videos[activeVideo].badge}</span>
                      <strong>{videos[activeVideo].title}</strong>
                    </div>
                    <div className="play-btn-luxury">
                      <i className="fas fa-play" />
                    </div>
                  </a>
                </div>

                <p className="video-description-text">
                  {videos[activeVideo].description}
                </p>

                <div className="video-slider-controls">
                  <button onClick={prevVideo} className="slider-arrow" aria-label="Annulla">
                    <i className="fas fa-chevron-left" />
                  </button>

                  <div className="slider-dots">
                    {videos.map((_, index) => (
                      <div
                        key={index}
                        className={`slider-dot ${index === activeVideo ? 'active' : ''}`}
                        onClick={() => setActiveVideo(index)}
                      />
                    ))}
                  </div>

                  <button onClick={nextVideo} className="slider-arrow" aria-label="Avanti">
                    <i className="fas fa-chevron-right" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 5. I NOSTRI PARTNER (HOTEL SECTION) */}
        <section id="fleet-section" style={{ padding: '80px 0 0', background: '#080808' }}>
          <div className="container" style={{ marginBottom: '60px', textAlign: 'center' }}>
            <span className="label-gold">STRUTTURE D'ECCELLENZA</span>
            <h2 className="academy-title" style={{ marginTop: '10px' }}>I nostri partners</h2>
            <p style={{ color: 'rgba(255,255,255,0.6)', maxWidth: '600px', margin: '15px auto 0', fontSize: '1.1rem' }}>
              Modelli di ospitalità autentica coordinati dalla nostra visione strategica.
            </p>
          </div>
          <div id="fleet">
            {/* Duchessa Isabella */}
            <section className="hotel-section">
              <div className="hotel-bg-wrapper">
                <Image 
                  src="/assets/duchessa_isabella.png" 
                  alt="Hotel Duchessa Isabella" 
                  fill 
                  className="hotel-bg" 
                  style={{ objectFit: 'cover' }}
                  sizes="(max-width: 768px) 100vw, 50vw"
                  loading="lazy" 
                />
              </div>
              <div className="hotel-overlay" />
              <div className="hotel-content">
                <span className="hotel-location">Ferrara</span>
                <h2 className="hotel-name">Hotel Duchessa Isabella</h2>
                <a href="https://duchessaisabella.com" target="_blank" className="btn-explore">Esplora Dimora</a>
              </div>
            </section>
            {/* Hotel Blumen */}
            <section className="hotel-section">
              <div className="hotel-bg-wrapper">
                <Image 
                  src="/assets/hotel_blumen.jpg" 
                  alt="Hotel Blumen" 
                  fill 
                  className="hotel-bg" 
                  style={{ objectFit: 'cover' }}
                  sizes="(max-width: 768px) 100vw, 50vw"
                  loading="lazy" 
                />
              </div>
              <div className="hotel-overlay" />
              <div className="hotel-content">
                <span className="hotel-location">Bologna</span>
                <h2 className="hotel-name">Hotel Blumen</h2>
                <a href="https://hotelblumen.it" target="_blank" className="btn-explore">Esplora Dimora</a>
              </div>
            </section>
            {/* Hotel Sant'Orsola */}
            <section className="hotel-section">
              <div className="hotel-bg-wrapper">
                <Image 
                  src="/assets/santorsola.png" 
                  alt="Hotel Sant'Orsola" 
                  fill 
                  className="hotel-bg" 
                  style={{ objectFit: 'cover' }}
                  sizes="(max-width: 768px) 100vw, 50vw"
                  loading="lazy" 
                />
              </div>
              <div className="hotel-overlay" />
              <div className="hotel-content">
                <span className="hotel-location">Bologna</span>
                <h2 className="hotel-name">Hotel Sant'Orsola</h2>
                <a href="https://hotelsantorsola.it" target="_blank" className="btn-explore">Esplora Dimora</a>
              </div>
            </section>
            {/* Oasi Isabella Wellness SPA */}
            <section className="hotel-section">
              <div className="hotel-bg-wrapper">
                <Image 
                  src="/assets/wellness.png" 
                  alt="Oasi Isabella Wellness SPA" 
                  fill 
                  className="hotel-bg" 
                  style={{ objectFit: 'cover' }}
                  sizes="(max-width: 768px) 100vw, 50vw"
                  loading="lazy" 
                />
              </div>
              <div className="hotel-overlay" />
              <div className="hotel-content">
                <span className="hotel-location">Ferrara</span>
                <h2 className="hotel-name">Oasi Isabella Wellness SPA</h2>
                <a href="https://www.duchessaisabella.com/wellness/" target="_blank" className="btn-explore">Vivi il Benessere</a>
              </div>
            </section>

            {/* Duchessa Isabella Eventi */}
            <section className="hotel-section">
              <div className="hotel-bg-wrapper">
                <Image 
                  src="/assets/eventi.jpg" 
                  alt="Duchessa Isabella Eventi" 
                  fill 
                  className="hotel-bg" 
                  style={{ objectFit: 'cover' }}
                  sizes="(max-width: 768px) 100vw, 50vw"
                  loading="lazy" 
                />
              </div>
              <div className="hotel-overlay" />
              <div className="hotel-content">
                <span className="hotel-location">Ferrara</span>
                <h2 className="hotel-name">Duchessa Isabella Eventi</h2>
                <a href="https://www.duchessaisabella.com/meeting-eventi/" target="_blank" className="btn-explore">Celebra la Storia</a>
              </div>
            </section>
          </div>
        </section>

        {/* CAREER SECTION - Talent Acquisition */}
        <section id="career" className="career-section">
          <div className="container career-container">
            <div className="career-content reveal">
              <span className="label-gold">UNISCITI ALL'ELITE</span>
              <h2 className="career-headline">Il tuo futuro in GSA Hotels</h2>
              <div className="career-divider" />
              <p className="career-body">
                Questa sezione è dedicata alla ricerca e valutazione di profili d'eccellenza per le realtà che orbitano attorno al marchio GSA Hotels.
                <strong> GSA Hotels non è un gruppo</strong>, è un ecosistema di valori, strategia e identità. Siamo costantemente alla ricerca di talenti dinamici che amino l'ospitalità autentica e desiderino contribuire all'ingegnerizzazione di modelli di accoglienza senza tempo.
              </p>
              <p className="career-subtext">
                Di seguito potrai inviare la tua candidatura e il tuo curriculum vitae seguendo la procedura dedicata. Valutiamo ogni profilo con il massimo riserbo e attenzione al potenziale individuale.
              </p>
              <div className="career-cta-wrapper">
                <a href="#contact" className="btn-bugatti" onClick={() => setFormData(p => ({ ...p, interesse: 'Candidatura Lavorativa' }))}>
                  <span className="btn-text">INVIA LA TUA CANDIDATURA</span>
                  <span className="btn-line" />
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* Philosophy Section */}
        {/* Bugatti Vision Section (L'Autenticità) */}
        <section id="philosophy" className="vision-section-bugatti">
          <div className="bg-watermark">AUTHENTICITY</div>
          <div className="container vision-container">
            <div className="vision-content reveal">
              <span className="vision-kicker">IL NOSTRO DNA</span>
              <h2 className="vision-headline">L'Autenticità</h2>
              <div className="vision-divider" />
              <p className="vision-body">
                Il nostro approccio fonde l'inimitabile ospitalità italiana con l'autenticità delle persone che ogni giorno animano le nostre aziende.
              </p>
              <a href="#metodo" className="btn-bugatti">
                <span className="btn-text">SCOPRI DI PIÙ</span>
                <span className="btn-line" />
              </a>
            </div>
            <div className="vision-visual reveal">
              <div className="video-slider-wrapper">
                <div className="slider-video-container" onClick={() => visionImages.length > 0 && setIsVisionLightboxOpen(true)} style={{ cursor: visionImages.length > 0 ? 'zoom-in' : 'wait' }}>
                  <div className="visual-frame slider-frame" style={{ height: '600px' }}>
                    {visionImages.length > 0 ? (
                      <Image
                        key={activeVisionImage}
                        src={visionImages[activeVisionImage]}
                        alt="Authenticity Highlight"
                        fill
                        className="vision-slide-img"
                        style={{ objectFit: 'cover', objectPosition: 'top' }}
                        sizes="(max-width: 768px) 100vw, 70vw"
                        priority={activeVisionImage === 0}
                      />
                    ) : (
                      <div className="loading-placeholder" style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#111' }}>
                        <i className="fas fa-spinner fa-spin" style={{ color: 'var(--gold-accent)' }} />
                      </div>
                    )}
                    <div className="frame-border" />
                  </div>
                </div>

                <div className="video-slider-controls">
                  <button onClick={prevVisionImage} className="slider-arrow" aria-label="Annulla" disabled={visionImages.length === 0}>
                    <i className="fas fa-chevron-left" />
                  </button>

                  <div className="vision-scrubber-wrapper">
                    {/* Floating Tooltip */}
                    {(visionImages.length > 0 && (scrubberHoverValue !== null || isScrubbing)) && (
                      <div
                        className="vision-scrubber-tooltip"
                        style={{
                          left: `${((scrubberHoverValue !== null ? scrubberHoverValue : activeVisionImage) / (visionImages.length - 1)) * 100}%`
                        }}
                      >
                        {String((scrubberHoverValue !== null ? scrubberHoverValue : activeVisionImage) + 1).padStart(2, '0')} / {visionImages.length}
                      </div>
                    )}
                    <input
                      type="range"
                      min="0"
                      max={visionImages.length > 0 ? visionImages.length - 1 : 0}
                      value={activeVisionImage}
                      disabled={visionImages.length === 0}
                      onChange={(e) => setActiveVisionImage(parseInt(e.target.value))}
                      onMouseEnter={() => visionImages.length > 0 && setScrubberHoverValue(activeVisionImage)}
                      onMouseLeave={() => setScrubberHoverValue(null)}
                      onMouseMove={(e) => {
                        if (visionImages.length === 0) return;
                        const rect = e.currentTarget.getBoundingClientRect();
                        const x = e.clientX - rect.left;
                        const val = Math.round((x / rect.width) * (visionImages.length - 1));
                        setScrubberHoverValue(Math.max(0, Math.min(visionImages.length - 1, val)));
                      }}
                      onMouseDown={() => visionImages.length > 0 && setIsScrubbing(true)}
                      onMouseUp={() => setIsScrubbing(false)}
                      className="vision-scrubber"
                    />
                  </div>

                  <button onClick={nextVisionImage} className="slider-arrow" aria-label="Avanti" disabled={visionImages.length === 0}>
                    <i className="fas fa-chevron-right" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* PARTNER SECTION - Dynamic Business Models */}
        <section id="partner" className="partner-section">
          <div className="container partner-container">
            <div className="partner-header reveal">
              <span className="label-gold">COLLABORAZIONE STRATEGICA</span>
              <h2 className="partner-headline">Diventa un Partner</h2>
              <p className="partner-subline">
                Non gestiamo semplici immobili, <strong>noi ingegnerizziamo asset</strong>.
              </p>
              <p className="partner-intro">
                Eleviamo l'identità della tua struttura, trasformandola in un modello di eccellenza, valore e profittabilità sostenibile.
                <strong> Contenuti esclusivi che possono agevolare la tua attività</strong>, accesso prioritario al nostro network di fornitori certificati e strumenti di marketing d'élite.
              </p>
            </div>

            <div className="partner-grid">
              {/* Modality 1: Royalty / Marchio */}
              <div className="partner-card reveal">
                <div className="card-bg-glow" />
                <div className="partner-card-content">
                  <div className="card-icon-wrapper">
                    <i className="fas fa-certificate" />
                  </div>
                  <h3 className="card-title">Affiliazione GSA</h3>
                  <p className="card-tagline">Lend the Prestige (Royalty Model)</p>
                  <p className="card-description">
                    Ti concediamo l'uso del nostro marchio d'eccellenza come royalty.
                    Mantieni la tua gestione operativa beneficiando della nostra forza commerciale, dei sistemi di pricing avanzati e del prestigio del network GSA Hotels.
                  </p>
                  <a href="#contact" className="btn-card-action">RICHIEDI AFFILIAZIONE</a>
                </div>
              </div>

              {/* Modality 2: Gestione Diretta */}
              <div className="partner-card reveal">
                <div className="card-bg-glow" />
                <div className="partner-card-content">
                  <div className="card-icon-wrapper">
                    <i className="fas fa-key" />
                  </div>
                  <h3 className="card-title">Gestione GSA</h3>
                  <p className="card-tagline">Total Management Solutions</p>
                  <p className="card-description">
                    Affidaci la gestione completa del tuo hotel. Trasformiamo la tua proprietà in un asset performante a 360°, liberandoti dalla complessità operativa e garantendo risultati certi attraverso i nostri standard pluripremiati.
                  </p>
                  <a href="#contact" className="btn-card-action">AFFIDA LA GESTIONE</a>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Luxury Contact Form (Liquid Gold Embers) */}
        <section id="contact" className="luxury-form-section">
          <div id="embers-container" className="embers-container" />
          <div className="container luxury-form-container">
            {/* Intro Column - Now on the LEFT */}
            <div className="form-intro reveal">
              <h2 className="form-title">Contattaci</h2>
              <p className="form-desc">
                Valutiamo esclusivamente strutture con alto potenziale di crescita.
                Lascia i tuoi recapiti per una conversazione riservata.
              </p>
              <div className="contact-direct-info">
                <div className="info-row">
                  <span className="info-label">HEADQUARTERS</span>
                  <span className="info-value">Emilia Romagna, Italia</span>
                </div>
              </div>
            </div>

            {/* Form Column - Now on the RIGHT */}
            <div className="form-wrapper reveal">
              <form className="minimal-form" onSubmit={handleSubmit}>
                <div className="input-group">
                  <input
                    type="text"
                    id="nome"
                    required
                    placeholder=" "
                    className="minimal-input"
                    value={formData.nome}
                    onChange={handleInputChange}
                  />
                  <label htmlFor="nome" className="floating-label">NOME E COGNOME</label>
                  <span className="focus-border" />
                </div>
                <div className="input-group">
                  <input
                    type="text"
                    id="azienda"
                    required
                    placeholder=" "
                    className="minimal-input"
                    value={formData.azienda}
                    onChange={handleInputChange}
                  />
                  <label htmlFor="azienda" className="floating-label">AZIENDA / HOTEL</label>
                  <span className="focus-border" />
                </div>
                <div className="input-group">
                  <input
                    type="email"
                    id="email"
                    required
                    placeholder=" "
                    className="minimal-input"
                    value={formData.email}
                    onChange={handleInputChange}
                  />
                  <label htmlFor="email" className="floating-label">EMAIL AZIENDALE</label>
                  <span className="focus-border" />
                </div>
                <div className="input-group">
                  <input
                    type="tel"
                    id="telefono"
                    placeholder=" "
                    className="minimal-input"
                    value={formData.telefono}
                    onChange={handleInputChange}
                  />
                  <label htmlFor="telefono" className="floating-label">TELEFONO</label>
                  <span className="focus-border" />
                </div>
                <div className="input-group">
                  <textarea
                    id="messaggio"
                    placeholder=" "
                    className="minimal-input"
                    rows={5}
                    value={formData.messaggio}
                    onChange={handleInputChange}
                  />
                  <label htmlFor="messaggio" className="floating-label">MESSAGGIO</label>
                  <span className="focus-border" />
                </div>
                <div className="input-group custom-select-wrapper" id="customSelectWrapper">
                  <input type="hidden" id="interesse" name="interesse" value={formData.interesse} />
                  <div 
                    className={`minimal-input custom-select-trigger ${formData.interesse ? 'has-value' : ''}`} 
                    tabIndex={0}
                  >
                    <span className="selected-text">{formData.interesse}</span>
                    <span className="select-arrow-custom">
                      <i className="fas fa-chevron-down" />
                    </span>
                  </div>
                  <label className="floating-label select-label">MOTIVO DEL CONTATTO</label>
                  <div className="custom-options">
                    <div className="custom-option" onClick={() => setFormData(p => ({ ...p, interesse: 'Affiliazione Brand' }))}>Affiliazione Brand</div>
                    <div className="custom-option" onClick={() => setFormData(p => ({ ...p, interesse: 'Gestione Diretta' }))}>Gestione Diretta</div>
                    <div className="custom-option" onClick={() => setFormData(p => ({ ...p, interesse: 'Academy & Formazione' }))}>Academy & Formazione</div>
                    <div className="custom-option" onClick={() => setFormData(p => ({ ...p, interesse: 'Altro' }))}>Altro</div>
                  </div>
                  <span className="focus-border" />
                </div>

                <div className="form-footer">
                  <button type="submit" className="btn-bugatti" disabled={isSubmitting}>
                    <span className="btn-text">{isSubmitting ? 'INVIO IN CORSO...' : 'INVIA RICHIESTA'}</span>
                    <span className="btn-line" />
                  </button>
                  {submitStatus === 'success' && (
                    <p className="submit-feedback success" style={{ color: '#C5A059', marginTop: '15px' }}>Richiesta inviata con successo.</p>
                  )}
                  {submitStatus === 'error' && (
                    <p className="submit-feedback error" style={{ color: '#ff4d4d', marginTop: '15px' }}>Errore nell'invio. Riprova più tardi.</p>
                  )}
                </div>
              </form>
            </div>
          </div>
        </section>
        <footer className="luxury-footer">
          <div className="container">
            <div className="footer-grid">
              {/* Category 1: GSA Hotels Socials */}
              <div className="footer-col social-col">
                <h4 className="footer-heading">GSA HOTELS</h4>
                <div className="social-links-grid">
                  <a href="https://instagram.com/gsahotels" target="_blank" className="social-link-item">
                    <i className="fab fa-instagram" /> <span>Instagram</span>
                  </a>
                  <a href="https://facebook.com/gsahotels" target="_blank" className="social-link-item">
                    <i className="fab fa-facebook-f" /> <span>Facebook</span>
                  </a>
                  <a href="https://youtube.com/@gsahotels" target="_blank" className="social-link-item">
                    <i className="fab fa-youtube" /> <span>YouTube</span>
                  </a>
                </div>
              </div>

              {/* Category 2: Duchessa Isabella Socials */}
              <div className="footer-col social-col">
                <h4 className="footer-heading">DUCHESSA ISABELLA</h4>
                <div className="social-links-grid">
                  <a href="https://facebook.com/duchessaisabellaferrara" target="_blank" className="social-link-item">
                    <i className="fab fa-facebook-f" /> <span>Facebook</span>
                  </a>
                  <a href="https://instagram.com/duchessaisabella" target="_blank" className="social-link-item">
                    <i className="fab fa-instagram" /> <span>Instagram</span>
                  </a>
                  <a href="https://www.tripadvisor.it/Hotel_Review-g187803-d232537-Reviews-Hotel_Duchessa_Isabella-Ferrara_Province_of_Ferrara_Emilia_Romagna.html" target="_blank" className="social-link-item">
                    <i className="fab fa-tripadvisor" /> <span>TripAdvisor</span>
                  </a>
                </div>
              </div>

              {/* Category 3: Quick Links */}
              <div className="footer-col">
                <h4 className="footer-heading">NAVIGAZIONE</h4>
                <ul className="footer-links">
                  <li><a href="#fleet">Soggiorni</a></li>
                  <li><a href="#services">Servizi</a></li>
                  <li><a href="#philosophy">Identità</a></li>
                  <li><a href="#contact">Contatti</a></li>
                </ul>
              </div>
            </div> {/* Closes footer-grid */}

            <div className="footer-bottom-line">
              <div className="j-line" />
              <span className="footer-brand">GSA HOTELS</span>
              <div className="j-line" />
            </div>

            <div className="footer-legal">
              <p>&copy; {new Date().getFullYear()} GSA Hotels. All Rights Reserved.</p>
              <div className="legal-links">
                <span>Designed and coded by <a href="mailto:tiachinaglia@gmail.com">Mattia Chinaglia</a></span>
                <a href="#" className="cookie-link">Privacy Policy</a>
                <a href="#">Cookie Policy</a>
              </div>
            </div>
          </div> {/* Closes container */}

          <div className="footer-signature">
            GSA HOTELS
          </div>
        </footer>
        {/* Fullscreen Lightbox Portal */}
        {isVisionLightboxOpen && visionImages.length > 0 && (
          <div className="vision-lightbox-overlay">
            <button className="lightbox-close" onClick={() => setIsVisionLightboxOpen(false)}>
              <i className="fas fa-times" />
            </button>
            <div className="lightbox-content">
              <div className="lightbox-image-container">
                <Image
                  src={visionImages[activeVisionImage]}
                  alt="Vision Fullscreen"
                  fill
                  className="lightbox-img"
                  style={{ objectFit: 'contain' }}
                  priority
                />
              </div>

              <div className="lightbox-controls">
                <button onClick={prevVisionImage} className="slider-arrow large" aria-label="Precedente">
                  <i className="fas fa-chevron-left" />
                </button>

                <div className="vision-scrubber-wrapper lightbox-scrubber">
                  {(scrubberHoverValue !== null || isScrubbing) && (
                    <div
                      className="vision-scrubber-tooltip"
                      style={{
                        left: `${((scrubberHoverValue !== null ? scrubberHoverValue : activeVisionImage) / (visionImages.length - 1)) * 100}%`
                      }}
                    >
                      {String((scrubberHoverValue !== null ? scrubberHoverValue : activeVisionImage) + 1).padStart(2, '0')} / {visionImages.length}
                    </div>
                  )}
                  <input
                    type="range"
                    min="0"
                    max={visionImages.length - 1}
                    value={activeVisionImage}
                    onChange={(e) => setActiveVisionImage(parseInt(e.target.value))}
                    onMouseEnter={() => setScrubberHoverValue(activeVisionImage)}
                    onMouseLeave={() => setScrubberHoverValue(null)}
                    onMouseMove={(e) => {
                      const rect = e.currentTarget.getBoundingClientRect();
                      const x = e.clientX - rect.left;
                      const val = Math.round((x / rect.width) * (visionImages.length - 1));
                      setScrubberHoverValue(Math.max(0, Math.min(visionImages.length - 1, val)));
                    }}
                    onMouseDown={() => setIsScrubbing(true)}
                    onMouseUp={() => setIsScrubbing(false)}
                    className="vision-scrubber"
                  />
                </div>

                <button onClick={nextVisionImage} className="slider-arrow large" aria-label="Successiva">
                  <i className="fas fa-chevron-right" />
                </button>
              </div>
            </div>
          </div>
        )}
      </main>
      {/* Scripts */}
      {/* GSAP Core */}
      {/* WebGL Shaders for Liquid Glass Cursor */}
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      <link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;0,700;1,300;1,400;1,500;1,600;1,700&family=Montserrat:wght@200;300;400;500;600&display=swap" rel="stylesheet" />
      {/* ScrollTrigger */}
      {/* BESAFE RATE GSAP ANIMATION */}
      {/* iOS VIDEO AUTOPLAY ENFORCER */}
      {/* Lenis Smooth Scroll */}
      {/* SplitType for Text Animation */}
      {/* --- MOBILE HAMBURGER MENU JS (Overlay Logic) --- */}
      {/* PRIVACY CONCIERGE (Cookie Banner) */}
      <div id="cookie-banner" className="cookie-banner">
        <div className="cookie-content">
          <h4 className="cookie-title">Privacy &amp; Eccellenza</h4>
          <p className="cookie-text">
            Utilizziamo i cookie per garantire un'esperienza di navigazione all'altezza dei nostri standard.
            Continuando, accetti la nostra <a href="#" className="cookie-link">Privacy Policy</a>.
          </p>
        </div>
        <div className="cookie-actions">
          <button id="cookie-decline" className="btn-cookie-ghost">Solo Necessari</button>
          <button id="cookie-accept" className="btn-cookie-gold">Accetta Tutto</button>
        </div>
      </div>
      {/* LEGAL MODAL (Privacy Policy) */}
      <div id="privacy-modal" className="legal-modal">
        <div className="legal-modal-backdrop" />
        <div className="legal-modal-content">
          <div className="legal-header">
            <h2 className="legal-title">Privacy Policy</h2>
            <button className="legal-close-btn" aria-label="Chiudi">
              <i className="fas fa-times" />
            </button>
          </div>
          <div className="legal-body">
            <h3>1. Titolare del Trattamento</h3>
            <p>Il Titolare del trattamento è <strong>GSA Hotels S.r.l.</strong>, con sede in Italia. Per qualsiasi
              richiesta relativa alla privacy, puoi contattarci all'indirizzo: <a href="mailto:info@gsahotels.com">info@gsahotels.com</a>.</p>
            <h3>2. Tipologia di Dati Raccolti</h3>
            <p>Raccogliamo dati per finalità di business e partnership strategiche:</p>
            <ul>
              <li><strong>Dati di Contatto:</strong> Nome, email aziendale, telefono, nome dell'hotel (tramite
                form).</li>
              <li><strong>Dati Tecnici:</strong> Indirizzo IP, dati di navigazione e preferenze (tramite cookie).
              </li>
            </ul>
            <h3>3. Finalità e Base Giuridica</h3>
            <p>I tuoi dati vengono trattati per:</p>
            <ul>
              <li>Gestire richieste di affiliazione e valutazione asset (Esecuzione precontrattuale).</li>
              <li>Comunicazioni commerciali relative ai servizi GSA (Legittimo interesse).</li>
              <li>Obblighi di legge amministrativi e fiscali.</li>
            </ul>
            <h3>4. Conservazione dei Dati</h3>
            <p>I dati verranno conservati per il tempo strettamente necessario a gestire la tua richiesta o per la
              durata del rapporto commerciale, salvo diversi obblighi di legge.</p>
            <h3>5. I Tuoi Diritti (GDPR)</h3>
            <p>Hai il diritto di accedere ai tuoi dati, chiederne la rettifica, la cancellazione o la limitazione
              del trattamento in qualsiasi momento contattando il Titolare.</p>
            <p className="legal-footer-note">Ultimo aggiornamento: Gennaio 2026</p>
          </div>
        </div>
      </div>
      {/* LEGAL MODAL (Termini e Condizioni) */}
      <div id="terms-modal" className="legal-modal">
        <div className="legal-modal-backdrop" />
        <div className="legal-modal-content">
          <div className="legal-header">
            <h2 className="legal-title">Termini e Condizioni</h2>
            <button className="legal-close-btn" aria-label="Chiudi">
              <i className="fas fa-times" />
            </button>
          </div>
          <div className="legal-body">
            <h3>1. Proprietà del Sito</h3>
            <p>Il sito è gestito da <strong>GSA Hotels S.r.l.</strong>. L'accesso implica l'accettazione di questi
              termini. Il servizio è riservato a utenti business (B2B).</p>
            <h3>2. Copyright e Proprietà Intellettuale</h3>
            <p>Tutti i contenuti, il design, il codice e il marchio "GSA Hotels" sono protetti da copyright. È
              vietata la copia o l'uso non autorizzato del materiale presente.</p>
            <h3>3. Limitazione di Responsabilità</h3>
            <p>Le informazioni sul sito sono fornite a titolo informativo. GSA Hotels non risponde di eventuali
              inesattezze o di decisioni prese basandosi esclusivamente su tali informazioni senza una consulenza
              diretta.</p>
            <h3>4. Foro Competente</h3>
            <p>Per qualsiasi controversia legale è competente in via esclusiva il Foro di Bologna, Italia.</p>
            <p className="legal-footer-note">Ultimo aggiornamento: Gennaio 2026</p>
          </div>
        </div>
      </div>
      {/* LEGAL MODAL (Cookie Policy) */}
      <div id="cookie-policy-modal" className="legal-modal">
        <div className="legal-modal-backdrop" />
        <div className="legal-modal-content">
          <div className="legal-header">
            <h2 className="legal-title">Cookie Policy</h2>
            <button className="legal-close-btn" aria-label="Chiudi">
              <i className="fas fa-times" />
            </button>
          </div>
          <div className="legal-body">
            <h3>1. Uso dei Cookie</h3>
            <p>Questo sito utilizza cookie per migliorare l'esperienza di navigazione e analizzare il traffico.
              Gestiamo i cookie tramite il sistema proprietario <em>GSA Cookie Engine</em>.</p>
            <h3>2. Tipologie</h3>
            <ul>
              <li><strong>Tecnici:</strong> Necessari per il funzionamento (es. ricordare se hai accettato i
                cookie).</li>
              <li><strong>Analitici:</strong> (Google Analytics) Usati per statistiche anonime. Attivi solo col
                tuo consenso.</li>
              <li><strong>Marketing:</strong> (Pixel Meta/LinkedIn) Usati per campagne pubblicitarie mirate.
                Attivi solo col tuo consenso.</li>
            </ul>
            <h3>3. I Tuoi Diritti</h3>
            <p>Puoi revocare il consenso in qualsiasi momento cancellando i cookie dal browser o usando il tasto
              "Gestisci Preferenze" (se presente).</p>
            <p className="legal-footer-note">Ultimo aggiornamento: Gennaio 2026</p>
          </div>
        </div>
      </div>
      {/* PRELOADER LOGIC (The Zoom-Through Reveal) */}
      {/* CUSTOM LUXURY CONTEXT MENU */}
      <div id="gsa-context-menu" className="context-menu">
        <ul className="context-menu-list">
          <li className="ctx-item" id="ctx-partner">
            <span className="ctx-icon">✦</span>
            <a href="#contact"><span className="ctx-text">DIVENTA PARTNER</span></a>
          </li>
          <li className="ctx-item ctx-dynamic" id="ctx-newtab">
            <span className="ctx-icon"><i className="fas fa-external-link-alt" /></span>
            <span className="ctx-text">APRI IN ALTRA SCHEDA</span>
          </li>
          <li className="ctx-item ctx-dynamic" id="ctx-submit">
            <span className="ctx-icon"><i className="fas fa-paper-plane" /></span>
            <span className="ctx-text">INVIA</span>
          </li>
        </ul>
      </div>
      {/* CONTEXT MENU LOGIC */}
    </div>
  );
}
