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
import GlobalNav from '@/components/GlobalNav';
import { useLang } from '@/context/LangContext';


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
  const { t, lang } = useLang();
  const [activeVideo, setActiveVideo] = React.useState(0);
  const [activeVisionImage, setActiveVisionImage] = React.useState(0);
  const [scrubberHoverValue, setScrubberHoverValue] = React.useState<number | null>(null);
  const [isScrubbing, setIsScrubbing] = React.useState(false);

  const videos = [
    {
      id: "rzLIWEaDbuc",
      title: t('video.1.title'),
      badge: "FEATURING",
      description: t('video.1.desc'),
      url: "https://www.youtube.com/watch?v=rzLIWEaDbuc"
    },
    {
      id: "cYublCdofos",
      title: t('video.2.title'),
      badge: "JOB MEETING",
      description: t('video.2.desc'),
      url: "https://www.youtube.com/watch?v=cYublCdofos"
    },
    {
      id: "UOwRwARrSiY",
      title: t('video.3.title'),
      badge: "FENIMPRESE",
      description: t('video.3.desc'),
      url: "https://www.youtube.com/watch?v=UOwRwARrSiY"
    },
    {
      id: "GVVnU6k9Jjg",
      title: t('video.4.title'),
      badge: "CASE STUDY",
      description: t('video.4.desc'),
      url: "https://www.youtube.com/watch?v=GVVnU6k9Jjg"
    },
    {
      id: "mAvvATDQBvY",
      title: t('video.5.title'),
      badge: "EDUCATION",
      description: t('video.5.desc'),
      url: "https://www.youtube.com/watch?v=mAvvATDQBvY"
    },
    {
      id: "ylUr5gn1XHQ",
      title: t('video.6.title'),
      badge: "TALENT",
      description: t('video.6.desc'),
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
  const [isPlayingIntro, setIsPlayingIntro] = React.useState(false);
  const [isMobile, setIsMobile] = React.useState(false);
  const [isRevealed, setIsRevealed] = React.useState(false);

  const nextAcademyImage = () => {
    setActiveAcademyImage((prev) => (prev + 1) % academyImages.length);
  };

  const prevAcademyImage = () => {
    setActiveAcademyImage((prev) => (prev - 1 + academyImages.length) % academyImages.length);
  };

  /* EXPERIENCES DATA */
  const bolognaExperiences = [
    {
      title: t('exp.bo1.title'),
      desc: t('exp.bo1.desc'),
      img: "/assets/esperienze/bologna/1.jpg"
    },
    {
      title: t('exp.bo2.title'),
      desc: t('exp.bo2.desc'),
      img: "/assets/esperienze/bologna/2.jpg"
    },
    {
      title: t('exp.bo3.title'),
      desc: t('exp.bo3.desc'),
      img: "/assets/esperienze/bologna/3.jpg"
    }
  ];

  const ferraraExperiences = [
    {
      title: t('exp.fe1.title'),
      desc: t('exp.fe1.desc'),
      img: "/assets/esperienze/ferrara/1.jpg"
    },
    {
      title: t('exp.fe2.title'),
      desc: t('exp.fe2.desc'),
      img: "/assets/esperienze/ferrara/2.jpg"
    },
    {
      title: t('exp.fe3.title'),
      desc: t('exp.fe3.desc'),
      img: "/assets/esperienze/ferrara/3.jpg"
    },
    {
      title: t('exp.fe4.title'),
      desc: t('exp.fe4.desc'),
      img: "/assets/esperienze/ferrara/4.png"
    },
    {
      title: t('exp.fe5.title'),
      desc: t('exp.fe5.desc'),
      img: "/assets/esperienze/ferrara/5.png"
    },
    {
      title: t('exp.fe6.title'),
      desc: t('exp.fe6.desc'),
      img: "/assets/esperienze/ferrara/6.jpg"
    }
  ];

  const [activeBologna, setActiveBologna] = React.useState(0);
  const [activeFerrara, setActiveFerrara] = React.useState(0);
  const [scrolled, setScrolled] = React.useState(false);
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
  const [isSelectOpen, setIsSelectOpen] = React.useState(false);

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

  useEffect(() => {
    const bolognaTimer = setInterval(() => {
      setActiveBologna((prev) => (prev + 1) % bolognaExperiences.length);
    }, 4000);
    const ferraraTimer = setInterval(() => {
      setActiveFerrara((prev) => (prev + 1) % ferraraExperiences.length);
    }, 4500);
    const videoTimer = setInterval(() => {
      setActiveVideo((prev) => (prev + 1) % videos.length);
    }, 5000);
    const academyTimer = setInterval(() => {
      setActiveAcademyImage((prev) => (prev + 1) % academyImages.length);
    }, 3000);

    const handleScroll = () => {
      // Logic moved to GlobalNav or kept local if needed for other things
    };
    window.addEventListener('scroll', handleScroll);

    return () => {
      clearInterval(bolognaTimer);
      clearInterval(ferraraTimer);
      clearInterval(videoTimer);
      clearInterval(academyTimer);
      window.removeEventListener('scroll', handleScroll);
    };
  }, [bolognaExperiences.length, ferraraExperiences.length, videos.length, academyImages.length]);

  useEffect(() => {
    if (visionImages.length === 0) return;
    const visionTimer = setInterval(() => {
      setActiveVisionImage((prev) => (prev + 1) % visionImages.length);
    }, 3500);
    return () => clearInterval(visionTimer);
  }, [visionImages.length]);



  useEffect(() => {
    const createdEmbers: HTMLDivElement[] = [];

    // Register GSAP
    // Register GSAP once
    gsap.registerPlugin(ScrollTrigger);


    // 1. Animazione Testo (Sinistra)
    gsap.from(".besafe-text-col > *", {
      scrollTrigger: {
        trigger: ".besafe-section",
        start: "top 70%",
        toggleActions: "play none none none" // Stay visible after reveal
      },
      y: 30,
      opacity: 0,
      duration: 1,
      stagger: 0.2,
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
          createdEmbers.push(p);
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

    let rafId: number;
    function raf(time: number) {
      lenis.raf(time);
      ScrollTrigger.update(); // CRITICAL: Keep ScrollTrigger in sync with Lenis
      rafId = requestAnimationFrame(raf);
    }
    rafId = requestAnimationFrame(raf);

    // Refresh ScrollTrigger on window resize to fix misalignments
    const handleResize = () => ScrollTrigger.refresh();
    window.addEventListener('resize', handleResize);

    // Also refresh when images load (important for lazy-loaded content)
    window.addEventListener('load', handleResize);

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

    gsap.from(".j-desc", {
      y: 20,
      opacity: 0,
      duration: 1.2,
      ease: "power3.out",
      delay: 1.2
    });

    // --- 2. GENERIC LUXURY REVEAL SYSTEM ---
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
              toggleActions: "play none none none" // Changed from reverse to none for stability
            }
          }
        );
      });
      ScrollTrigger.refresh();
    }, 500); // Increased timeout for better stability

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





    // UI HARDENING: Prevent Image Dragging
    document.querySelectorAll('img').forEach(img => {
      img.setAttribute('draggable', 'false');
      img.addEventListener('contextmenu', e => e.preventDefault());
    });

    // MOBILE FIX: Remove nav-wrapper completely on touch devices
    const isCoarse = window.matchMedia("(hover: none) and (pointer: coarse)").matches;
    if (isCoarse) {
      setIsMobile(true);
    }

    // Cursore custom ora gestito globalmente in layout.tsx via Cursor.tsx

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
        start: "top 75%",
        toggleActions: "play none none none" // Stay visible after reveal
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
        toggleActions: "play none none none" // Stay visible
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


    // Cursore gestito globalmente da Cursor.tsx
    // --- LIQUID GLASS MENU LOGIC ---
    // Navigation and Menu logic moved to GlobalNav.tsx

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
    const onEscKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeModal();
    };
    document.addEventListener('keydown', onEscKey);

    // EXPLICIT HANDLER per cookie banner privacy link
    const cookieBannerLink = document.querySelector('.cookie-link');
    if (cookieBannerLink) {
      cookieBannerLink.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        openModal('privacy-modal');
      });
    }


    // Timing tracking for cleanup
    let phase1Timeout: any, phase2Timeout: any, revealTimeout: any, recalculateTimeout: any, removeTimeout: any, shuffleInterval: any;

    // 0. CHECK IF PRELOADER ALREADY SHOWN IN THIS SESSION (FOR BACK BUTTON STABILITY)
    const alreadyShown = sessionStorage.getItem('gsa_preloader_shown') === 'true';
    
    if (alreadyShown) {
      setIsRevealed(true);
      if ((window as any).lenis) (window as any).lenis.start();
      document.body.style.overflow = '';
      document.body.classList.add('revealed');
      document.body.classList.remove('loading');
      document.documentElement.classList.remove('loading');
      setTimeout(() => ScrollTrigger.refresh(), 100);
    } else {
      // Blocca scroll
      document.body.style.overflow = 'hidden';

      const preloaderOverlay = document.getElementById('zoom-preloader');
      const shuffler = document.getElementById('shuffling-text');
      const logoGold = document.getElementById('logo-gold');
      const logoHole = document.getElementById('logo-hole');

      // Le "Robe diverse" che compongono il caricamento (Italiano)
      const words = [
        t('preloader.w1'),
        t('preloader.w2'),
        t('preloader.w3'),
        t('preloader.w4'),
        t('preloader.w5'),
        t('preloader.w6'),
        t('preloader.w7')
      ];

      let wordIndex = 0;

      // 1. FASE SHUFFLE (Composizione veloce)
      shuffleInterval = setInterval(() => {
        if (shuffler) {
          shuffler.innerText = words[wordIndex];
          wordIndex++;
          if (wordIndex >= words.length) wordIndex = 0;
        }
      }, 280);

      // Dopo 1.8 secondi, stoppa lo shuffle e mostra GSA
      phase1Timeout = setTimeout(() => {
        clearInterval(shuffleInterval);
        if (shuffler) shuffler.classList.add('hidden'); // Via le parole

        // Appare GSA (Assemblaggio)
        if (logoGold) logoGold.classList.add('visible');
        if (logoHole) logoHole.classList.add('visible');

        // 2. FASE ZOOM (L'entrata nel sito)
        phase2Timeout = setTimeout(() => {
          if (logoGold) logoGold.classList.add('zoom-in');
          if (logoHole) logoHole.classList.add('zoom-in');

          // 3. FASE REVEAL (Pulizia finale)
          revealTimeout = setTimeout(() => {
            if (preloaderOverlay) preloaderOverlay.classList.add('finished');
            document.body.style.overflow = ''; 

            if ((window as any).lenis) {
              (window as any).lenis.start();
            }

            document.documentElement.classList.remove('loading');
            document.body.classList.remove('loading');
            document.body.classList.add('revealed');
            
            // Persistent flag for session
            sessionStorage.setItem('gsa_preloader_shown', 'true');
            setIsRevealed(true);

            recalculateTimeout = setTimeout(() => {
              ScrollTrigger.refresh();
            }, 100);

          }, 1000); 

        }, 800); 

      }, 1800); 
    }
    const contextMenu = document.getElementById('gsa-context-menu');
    const ctxPartner = document.getElementById('ctx-partner');
    const ctxNewTab = document.getElementById('ctx-newtab');
    const ctxSubmit = document.getElementById('ctx-submit');

    // Variabili per salvare l'elemento cliccato
    let targetLink: HTMLAnchorElement | null = null;
    let targetAction: HTMLElement | null = null;

    // 1. ASCOLTA IL CLICK DESTRO
    const onContextMenu = (e: MouseEvent) => {
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
    };
    document.addEventListener('contextmenu', onContextMenu);

    // 2. CHIUDI IL MENU (Al click ovunque o scroll)
    const onDocClick = () => { if (contextMenu) contextMenu.classList.remove('active') };
    const onWinScroll = () => { if (contextMenu) contextMenu.classList.remove('active') };
    document.addEventListener('click', onDocClick);
    window.addEventListener('scroll', onWinScroll);

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
      // Clear all timers
      clearInterval(shuffleInterval);
      clearTimeout(phase1Timeout);
      clearTimeout(phase2Timeout);
      clearTimeout(revealTimeout);
      clearTimeout(recalculateTimeout);
      clearTimeout(removeTimeout);

      cancelAnimationFrame(rafId);
      ScrollTrigger.getAll().forEach(t => t.kill());
      lenis.destroy();
      delete (window as any).lenis;

      // REVERT SPLIT TYPE (Avoid DOM corruption on re-navigation)
      if (heroHeadline) heroHeadline.revert();
      if (heroDesc) heroDesc.revert();
      if (textStats) textStats.revert();

      // Ensure loading classes are gone
      document.documentElement.classList.remove('loading');
      document.body.classList.remove('loading');
      document.body.style.overflow = '';

      // Clean up global listeners
      document.removeEventListener('keydown', onEscKey);
      document.removeEventListener('contextmenu', onContextMenu);
      window.removeEventListener('scroll', onWinScroll);
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('load', handleResize);
      document.removeEventListener('click', onDocClick);

      // Clean up embers
      createdEmbers.forEach((emp: HTMLDivElement) => emp.remove());

      // Clean up ParticlesJS
      const pJS = (window as any).pJSDom;
      if (Array.isArray(pJS)) {
        for (let i = 0; i < pJS.length; i++) {
          const instance = pJS[i];
          if (instance && instance.pJS && instance.pJS.fn && instance.pJS.fn.vendors) {
            try {
              instance.pJS.fn.vendors.destroypJS();
            } catch (e) {
              console.warn("ParticlesJS cleanup error:", e);
            }
          }
        }
        (window as any).pJSDom = [];
      }
    };

  }, [lang]);

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
      <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css" />
      {/* PRELOADER: THE GSA REVEAL (Typographic) */}
      {/* PRELOADER: THE ZOOM-THROUGH REVEAL (Cutout Mask Edition) */}
      {!isRevealed && (
        <div id="zoom-preloader" className="zoom-overlay">
          <div className="zoom-bg" />
          <div className="zoom-content">
            <div id="shuffling-text" className="shuffle-word">{t('preloader.w1')}</div>
            {/* Layer 1: GOLD (Visible initially) */}
            <div id="logo-gold" className="gsa-huge-logo gsa-logo-layer gold">
              <Image src="/assets/logo.png" alt="GSA Hotels" width={1200} height={450} priority style={{ width: '35vw', height: 'auto' }} />
            </div>
            {/* Layer 2: HOLE (Visible during zoom to cut the mask) */}
            <div id="logo-hole" className="gsa-huge-logo gsa-logo-layer hole">
              <Image src="/assets/logo.png" alt="GSA Hotels" width={1200} height={450} priority style={{ width: '35vw', height: 'auto' }} />
            </div>
          </div>
        </div>
      )}
      <svg style={{ width: 0, height: 0, position: 'absolute', pointerEvents: 'none' }}>
        <defs>
          <filter id="goo">
            <feGaussianBlur in="SourceGraphic" stdDeviation={12} result="blur" />
            <feColorMatrix in="blur" mode="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 19 -9" result="goo" />
            <feBlend in="SourceGraphic" in2="goo" />
          </filter>
        </defs>
      </svg>


      <GlobalNav isHomePage={true} />

      {/* GLOBAL BACKGROUND LAYER */}
      <div className="jesko-bg-layer">
        <video id="hero-video" className="jesko-bg-video" autoPlay muted loop playsInline>
          <source src="assets/wallpaperherosection.mp4" type="video/mp4" />
        </video>
        <div className="jesko-overlay-layer" />
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
              <h1 className="j-headline" key={lang}>
                {t('hero.title1')}<br />
                <span className="j-italic"> {t('hero.title2')}</span>
              </h1>
            </div>
            {/* BOTTOM LEFT: Info */}
            <div className="j-info-container">
              <div className="j-separator" />
              <p className="j-desc" key={lang}>{t('hero.desc')}</p>
            </div>
            {/* BOTTOM RIGHT: CTA */}
            <div className="j-cta-container">
              <div className="j-scroll-in">
                <span>{t('hero.cta')}</span>
                <i className="fas fa-chevron-down j-arrow-down" />
                <div className="j-line" />
              </div>
            </div>
          </div>
        </section>
        {/* Pillars Section (Nuclear Insert) */}
        <section id="features" className="pillars-section">
          <div className="jesko-statement-container">
            <p className="jesko-statement" key={lang}>
              {t('statement.text')}
            </p>
          </div>
        </section>

        {/* Refined Corporate Spotlight Area */}
        <section id="intro" className="corporate-spotlight-section">
          <div className="spotlight-code-bg" aria-hidden="true" />
          <div className="spotlight-gold-glow" aria-hidden="true" />
          <div className="container spotlight-container">
            <div className="spotlight-content reveal" style={{ flex: 1, textAlign: 'left' }}>
              <div className="section-label-chip">{t('corporate.label')}</div>
              <h2 className="academy-title" style={{ fontSize: '3.5rem', marginBottom: '20px', lineHeight: '1.2', fontFamily: 'var(--font-display)' }}>
                {t('corporate.title').split('\n').map((line: string, i: number) => <React.Fragment key={i}>{line}{i === 0 && <br />}</React.Fragment>)}
              </h2>
              <div className="vision-divider" style={{ margin: '20px 0' }} />
              <p className="vision-body" style={{ fontSize: '1.1rem', maxWidth: '100%' }}>
                {t('corporate.desc')}
              </p>
              <div className="vision-footnote" style={{ marginTop: '20px' }}>
                {t('corporate.footnote')}
              </div>
            </div>

            <div className="spotlight-video-wrapper" style={{ flex: 1.2 }}>
              <div className="video-preview-card" style={{ cursor: 'pointer', height: '100%' }} onClick={() => setIsPlayingIntro(true)} id="section1-video-container">
                {isPlayingIntro ? (
                  <iframe width="100%" height="100%" src="https://www.youtube.com/embed/MFyef0yMQsY?autoplay=1" title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowFullScreen style={{ borderRadius: '12px' }}></iframe>
                ) : (
                  <>
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
                  </>
                )}
              </div>
            </div>
          </div>
        </section>

        {/* 1. INTRODUCTION BANNER (NEW) */}
        <section className="intro-banner-section" style={{ padding: '120px 0', background: 'rgba(5, 5, 5, 0.7)', position: 'relative' }}>
          <div className="container">
            <div className="intro-banner-content reveal" style={{ textAlign: 'center' }}>
              <span className="label-gold" style={{ letterSpacing: '0.3em' }}>{t('philosophy.label')}</span>
              <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(2.5rem, 5vw, 4.5rem)', color: 'white', marginTop: '20px', lineHeight: '1.1' }}>
                {t('philosophy.title1')}<span style={{ color: 'var(--gold)', fontStyle: 'italic' }}>{t('philosophy.titleHighlight')}</span>,<br />
                {t('philosophy.title2').split(',\n')[1]}
              </h2>
              <div className="gold-line" style={{ margin: '40px auto' }}></div>
              <p style={{ maxWidth: '700px', margin: '0 auto', fontSize: '1.1rem', opacity: 0.8 }}>
                {t('philosophy.desc')}
              </p>
            </div>
          </div>
        </section>

        {/* GSA ACADEMY SECTION (The Certificate) */}
        <section id="services" className="academy-section">
          <div className="bg-academy-grid" />
          <div className="container academy-container">
            <div className="academy-content reveal">
              <span className="label-gold">{t('academy.label')}</span>
              <h2 className="academy-title">{t('academy.title')}</h2>
              <div className="separator-line" />
              <p className="academy-desc">
                {t('academy.desc')}
              </p>
              <a href="mailto:stefanogolisano@gsa-hotels.com" className="btn-jesko">
                <i className="fas fa-envelope" /> {t('academy.cta')}
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
                <div className="slider-dots" aria-label="Seleziona slide GSA Academy">
                  {academyImages.map((_, index) => (
                    <div
                      key={index}
                      className={`slider-dot ${index === activeAcademyImage ? 'active' : ''}`}
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
                <div className="badge-center"><Image src="/assets/logo.png" alt="GSA Logo" fill style={{ objectFit: 'contain' }} /></div>
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
                  src="/assets/besafe-logo.png"
                  alt="BeSafe Rate"
                  width={150}
                  height={45}
                  style={{ height: '45px', width: 'auto', filter: 'brightness(1.2)' }}
                />
                <h2 className="besafe-title" style={{ margin: 0 }}>BeSafe Rate</h2>
              </div>
              <h3 className="besafe-subtitle">{t('besafe.subtitle')}</h3>
              <p className="besafe-desc">
                {t('besafe.desc').split('BeSafe Rate')[0]}
                <strong>BeSafe Rate</strong>{t('besafe.desc').split('BeSafe Rate')[1]}
              </p>
            </div>
            <div className="besafe-cards-col">
              <div className="safety-card glass-effect">
                <div className="card-icon"><i className="fas fa-undo" /></div>
                <div className="card-info">
                  <h4>{t('besafe.card1.title')}</h4>
                  <p>{t('besafe.card1.desc')}</p>
                </div>
              </div>
              <div className="safety-card glass-effect">
                <div className="card-icon"><i className="fas fa-user-md" /></div>
                <div className="card-info">
                  <h4>{t('besafe.card2.title')}</h4>
                  <p>{t('besafe.card2.desc')}</p>
                </div>
              </div>
              <div className="safety-card glass-effect">
                <div className="card-icon"><i className="fas fa-suitcase" /></div>
                <div className="card-info">
                  <h4>{t('besafe.card3.title')}</h4>
                  <p>{t('besafe.card3.desc')}</p>
                </div>
              </div>
              <div className="safety-card glass-effect">
                <div className="card-icon"><i className="fas fa-road" /></div>
                <div className="card-info">
                  <h4>{t('besafe.card4.title')}</h4>
                  <p>{t('besafe.card4.desc')}</p>
                </div>
              </div>
              {/* Button added below the cards */}
              <div style={{ textAlign: 'center', marginTop: '20px' }}>
                <a href={t('besafe.link')} target="_blank" className="btn-besafe-site">
                  {t('besafe.cta')} <i className="fas fa-external-link-alt" style={{ marginLeft: '10px', fontSize: '0.8rem' }} />
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* 4. ESPERIENZE MEMORABILI: TERRITORIAL DUAL SHOWCASE */}
        <section id="experiences" className="experiences-section">
          <div className="container">
            <div className="section-header reveal" style={{ textAlign: 'center', marginBottom: '80px' }}>
              <span className="label-gold">{t('exp.label')}</span>
              <h2 className="academy-title" style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(2.5rem, 5vw, 4.5rem)', marginBottom: '20px' }}>{t('exp.title')}</h2>
              <div className="vision-divider" style={{ margin: '20px auto' }} />
              <p className="vision-body" style={{ maxWidth: '800px', margin: '0 auto' }}>
                {t('exp.desc')}
              </p>
            </div>

            <div className="experience-dual-columns">
              {/* BOLOGNA SLIDER */}
              <div className="experience-col reveal">
                <div className="exp-city-label">BOLOGNA</div>
                <div className="exp-slider-luxury">
                  <div className="exp-image-wrapper">
                    <a href={`/esperienze/bologna/${encodeURIComponent(bolognaExperiences[activeBologna].title.split(': ')[1]?.toLowerCase().replace(/ /g, '-') || '')}`} className="exp-image-link" style={{ position: 'absolute', inset: 0, zIndex: 2 }}>
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
                          <span className="exp-link-btn">{t('exp.scopri')} <i className="fas fa-arrow-right" /></span>
                        </div>
                      </div>
                    </a>

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
                  <div className="slider-dots" aria-label="Seleziona esperienza Bologna">
                    {bolognaExperiences.map((_, i) => (
                      <div key={i} className={`slider-dot ${i === activeBologna ? 'active' : ''}`} onClick={() => setActiveBologna(i)} />
                    ))}
                  </div>
                  {/* Bologna Button */}
                  <div className="city-pill-wrapper" style={{ marginTop: '30px', textAlign: 'center' }}>
                    <a href="/esperienze/bologna" className="btn btn-partner-gold pill-btn">BOLOGNA</a>
                  </div>
                </div>
              </div>

              {/* FERRARA SLIDER */}
              <div className="experience-col reveal">
                <div className="exp-city-label">FERRARA</div>
                <div className="exp-slider-luxury">
                  <div className="exp-image-wrapper">
                    <a href={`/esperienze/ferrara/${encodeURIComponent(ferraraExperiences[activeFerrara].title.split(': ')[1]?.toLowerCase().replace(/ /g, '-') || '')}`} className="exp-image-link" style={{ position: 'absolute', inset: 0, zIndex: 2 }}>
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
                          <span className="exp-link-btn">SCOPRI DI PIÙ <i className="fas fa-arrow-right" /></span>
                        </div>
                      </div>
                    </a>

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
                  <div className="slider-dots" aria-label="Seleziona esperienza Ferrara">
                    {ferraraExperiences.map((_, i) => (
                      <div key={i} className={`slider-dot ${i === activeFerrara ? 'active' : ''}`} onClick={() => setActiveFerrara(i)} />
                    ))}
                  </div>
                  {/* Ferrara Button */}
                  <div className="city-pill-wrapper" style={{ marginTop: '30px', textAlign: 'center' }}>
                    <a href="/esperienze/ferrara" className="btn btn-partner-gold pill-btn">FERRARA</a>
                  </div>
                </div>
              </div>
            </div>

            <div className="experience-footer reveal" style={{ textAlign: 'center', marginTop: '60px', display: 'flex', justifyContent: 'center', gap: '14px', flexWrap: 'wrap' }}>
            </div>
          </div>
        </section>

        {/* FOUNDER SPOTLIGHT (Editorial Style) */}
        <section id="founder" className="founder-section">
          <div className="bg-founder-spotlight" />
          <div className="bg-noise" />
          <div className="container founder-container">
            <div className="founder-bio reveal">
              <span className="label-gold">{t('founder.label')}</span>
              <h2 className="founder-name">Stefano Golisano</h2>
              <div className="separator-line" />
              <p className="founder-text">
                {t('founder.text1')}
              </p>
              <p className="founder-text">
                {t('founder.text2')}
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
        <section id="partner" style={{ padding: '80px 0 0', background: '#080808' }}>
          <div className="container" style={{ marginBottom: '60px', textAlign: 'center' }}>
            <span className="label-gold">{t('partners.label')}</span>
            <h2 className="academy-title" style={{ marginTop: '10px' }}>{t('partners.title')}</h2>
            <p style={{ color: 'rgba(255,255,255,0.6)', maxWidth: '600px', margin: '15px auto 0', fontSize: '1.1rem' }}>
              {t('partners.desc')}
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
                <a href="https://duchessaisabella.com" target="_blank" className="btn-explore">{t('hotel.esplora')}</a>
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
                <a href="https://hotelblumen.it" target="_blank" className="btn-explore">{t('hotel.esplora')}</a>
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
                <a href="https://hotelsantorsola.it" target="_blank" className="btn-explore">{t('hotel.esplora')}</a>
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
                <a href="https://www.duchessaisabella.com/wellness/" target="_blank" className="btn-explore">{t('hotel.wellness')}</a>
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
                <a href="https://www.duchessaisabella.com/meeting-eventi/" target="_blank" className="btn-explore">{t('hotel.eventi')}</a>
              </div>
            </section>
          </div>
        </section>

        {/* Philosophy Section */}
        {/* Bugatti Vision Section (L'Autenticità) */}
        <section id="philosophy" className="vision-section-bugatti">
          <div className="bg-watermark">AUTHENTICITY</div>
          <div className="container vision-container">
            <div className="vision-content reveal">
              <span className="vision-kicker">{t('dna.kicker')}</span>
              <h2 className="vision-headline">{t('dna.title')}</h2>
              <div className="vision-divider" />
              <div className="vision-body-wrapper" style={{ marginBottom: '40px' }}>
                <p className="vision-body">
                  {t('dna.body')}
                </p>
              </div>
            </div>
            <div className="vision-visual reveal">
              <div className="video-slider-wrapper">
                <div className="slider-video-container" style={{ height: '100%', width: '100%' }}>
                  <div className="visual-frame slider-frame" style={{ height: '70vh', border: 'none' }}>
                    {visionImages.length > 0 ? (
                      <Image
                        key={activeVisionImage}
                        src={visionImages[activeVisionImage].startsWith('assets/') ? `/${visionImages[activeVisionImage]}` : visionImages[activeVisionImage]}
                        alt="Authenticity Highlight"
                        fill
                        className="vision-slide-img"
                        style={{ objectFit: 'cover', objectPosition: 'center' }}
                        sizes="100vw"
                        priority={activeVisionImage === 0}
                      />
                    ) : (
                      <div className="loading-placeholder" style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#111' }}>
                        <i className="fas fa-spinner fa-spin" style={{ color: 'var(--gold-accent)' }} />
                      </div>
                    )}
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

        {/* PARTNER SECTION - Dynamic Business Models (B2B EXPERTISE) */}
        <section id="b2b-section" className="partner-section">
          <div className="container partner-container">
            <div className="partner-header reveal">
              <span className="label-gold">{t('b2b.label')}</span>
              <h2 className="partner-headline">{t('b2b.title')}</h2>
              <p className="partner-subline">
                {t('b2b.subtitle')}
              </p>
              <p className="partner-intro">
                {t('b2b.desc')}
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
                  <h3 className="card-title">{t('b2b.card1.title')}</h3>
                  <p className="card-tagline">{t('b2b.card1.tagline')}</p>
                  <p className="card-description">
                    {t('b2b.card1.desc')}
                  </p>
                  <a href="#contact" className="btn-partner-gold pill-btn" onClick={(e) => {
                    setFormData(p => ({ ...p, interesse: t('contact.opt1') }));
                    document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
                  }}>{t('b2b.card1.cta')}</a>
                </div>
              </div>

              {/* Modality 2: Gestione Diretta */}
              <div className="partner-card reveal">
                <div className="card-bg-glow" />
                <div className="partner-card-content">
                  <div className="card-icon-wrapper">
                    <i className="fas fa-key" />
                  </div>
                  <h3 className="card-title">{t('b2b.card2.title')}</h3>
                  <p className="card-tagline">{t('b2b.card2.tagline')}</p>
                  <p className="card-description">
                    {t('b2b.card2.desc')}
                  </p>
                  <a href="#contact" className="btn-partner-gold pill-btn" onClick={(e) => {
                    setFormData(p => ({ ...p, interesse: t('contact.opt2') }));
                    document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
                  }}>{t('b2b.card2.cta')}</a>
                </div>
              </div>
            </div>
          </div>
        </section>


        {/* CAREER SECTION - Talent Acquisition */}
        <section id="career" className="career-section">
          <div className="container career-container">
            <div className="career-content reveal">
              <span className="label-gold">{t('career.label')}</span>
              <h2 className="career-headline">{t('career.title')}</h2>
              <div className="career-divider" />
              <p className="career-body">
                {t('career.body')}
              </p>
              <p className="career-subtext">
                {t('career.subtext')}
              </p>
              <div className="career-cta-wrapper" style={{ marginTop: '40px' }}>
                <a href="#contact" className="btn-partner-gold pill-btn" onClick={() => { setFormData(p => ({ ...p, interesse: t('contact.opt4') })); document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' }); }}>
                  {t('career.cta')}
                </a>
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
              <h2 className="form-title">{t('contact.title')}</h2>
              <p className="form-desc">
                {t('contact.desc')}
              </p>
              <div className="contact-direct-info">
                <div className="info-row">
                  <span className="info-label">HEADQUARTERS</span>
                  <span className="info-value">{t('contact.hq')}</span>
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
                  <label htmlFor="nome" className="floating-label">{t('contact.nome')}</label>
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
                  <label htmlFor="azienda" className="floating-label">{t('contact.azienda')}</label>
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
                  <label htmlFor="email" className="floating-label">{t('contact.email')}</label>
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
                  <label htmlFor="telefono" className="floating-label">{t('contact.telefono')}</label>
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
                  <label htmlFor="messaggio" className="floating-label">{t('contact.messaggio')}</label>
                  <span className="focus-border" />
                </div>
                <div className={`input-group custom-select-wrapper ${isSelectOpen ? 'open' : ''}`} id="customSelectWrapper">
                  <input type="hidden" id="interesse" name="interesse" value={formData.interesse} />
                  <div
                    className={`minimal-input custom-select-trigger ${formData.interesse ? 'has-value' : ''}`}
                    tabIndex={0}
                    onClick={() => setIsSelectOpen(!isSelectOpen)}
                  >
                    <span className="selected-text">{formData.interesse}</span>
                    <span className="select-arrow-custom">
                      <i className="fas fa-chevron-down" style={{ transition: 'transform 0.3s', transform: isSelectOpen ? 'rotate(180deg)' : 'rotate(0deg)' }} />
                    </span>
                  </div>
                  <label className="floating-label select-label">{t('contact.motivo')}</label>
                  <div className="custom-options" style={{ display: isSelectOpen ? 'block' : 'none' }}>
                    <div className="custom-option" onClick={() => { setFormData(p => ({ ...p, interesse: t('contact.opt1') })); setIsSelectOpen(false); }}>{t('contact.opt1')}</div>
                    <div className="custom-option" onClick={() => { setFormData(p => ({ ...p, interesse: t('contact.opt2') })); setIsSelectOpen(false); }}>{t('contact.opt2')}</div>
                    <div className="custom-option" onClick={() => { setFormData(p => ({ ...p, interesse: t('contact.opt3') })); setIsSelectOpen(false); }}>{t('contact.opt3')}</div>
                    <div className="custom-option" onClick={() => { setFormData(p => ({ ...p, interesse: t('contact.opt4') })); setIsSelectOpen(false); }}>{t('contact.opt4')}</div>
                    <div className="custom-option" onClick={() => { setFormData(p => ({ ...p, interesse: t('contact.opt5') })); setIsSelectOpen(false); }}>{t('contact.opt5')}</div>
                  </div>
                  <span className="focus-border" />
                </div>

                <div className="form-footer">
                  <button type="submit" className="btn-bugatti" disabled={isSubmitting}>
                    <span className="btn-text">{isSubmitting ? t('contact.sending') : t('contact.submit')}</span>
                    <span className="btn-line" />
                  </button>
                  {submitStatus === 'success' && (
                    <p className="submit-feedback success" style={{ color: '#C5A059', marginTop: '15px' }}>{t('contact.success')}</p>
                  )}
                  {submitStatus === 'error' && (
                    <p className="submit-feedback error" style={{ color: '#ff4d4d', marginTop: '15px' }}>{t('contact.error')}</p>
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
                  <a href="https://www.tripadvisor.it/Hotel_Review-g187803-d232851-Reviews-Duchessa_Isabella_Hotel-Ferrara_Province_of_Ferrara_Emilia_Romagna.html" target="_blank" className="social-link-item">
                    <i className="fa fa-tripadvisor" /> <span>TripAdvisor</span>
                  </a>
                </div>
              </div>

              {/* Category 3: Quick Links */}
              <div className="footer-col">
                <h4 className="footer-heading">{t('footer.navigazione')}</h4>
                <ul className="footer-links">
                  <li><a href="#intro">{t('menu.chiSiamo')}</a></li>
                  <li><a href="#services">{t('menu.academy')}</a></li>
                  <li><a href="#besafe">{t('menu.besafe')}</a></li>
                  <li><a href="#experiences">{t('menu.esperienze')}</a></li>
                  <li><a href="#founder">{t('menu.fondatore')}</a></li>
                  <li><a href="#partner">{t('menu.partner')}</a></li>
                  <li><a href="#b2b-section">{t('menu.lavora')}</a></li>
                  <li><a href="#philosophy">{t('menu.dna')}</a></li>
                  <li><a href="/blog">{t('menu.blog')}</a></li>
                </ul>
              </div>
            </div> {/* Closes footer-grid */}

            <div className="footer-bottom-line">
              <div className="j-line" />
              <span className="footer-brand">GSA HOTELS</span>
              <div className="j-line" />
            </div>

            <div className="footer-legal" style={{ display: 'flex', justifyContent: 'flex-start', alignItems: 'center', flexWrap: 'wrap', gap: '30px', width: '100%', marginTop: '5px' }}>
              <div className="legal-left" style={{ display: 'flex', alignItems: 'center', gap: '15px', flexWrap: 'wrap' }}>
                <a href="#" className="cookie-link">{t('footer.legal.privacy')}</a>
                <a href="#" className="cookie-link">{t('footer.legal.cookie')}</a>
                <a href="#" className="cookie-link">{t('footer.legal.terms')}</a>
                <span style={{ opacity: 0.5 }}>|</span>
                <p style={{ margin: 0 }}>&copy; 2026 GSA Hotels. All Rights Reserved.</p>
              </div>
              <p className="footer-credits" style={{ margin: 10, textAlign: 'start' }}>
                Powered by: <a href="mailto:tiachinaglia@gmail.com" style={{ color: '#C5A059', textDecoration: 'none' }}>tiachinaglia@gmail.com</a>
              </p>
            </div>
          </div> {/* Closes container */}

          <div className="footer-signature" style={{ color: 'transparent', WebkitTextStroke: '1px #C5A059' }}>
            GSA HOTELS
          </div>
        </footer>

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
          <h4 className="cookie-title">{t('cookie.title')}</h4>
          <p className="cookie-text">
            {t('cookie.text')} <a href="#" className="cookie-link">{t('footer.legal.privacy')}</a>.
          </p>
        </div>
        <div className="cookie-actions">
          <button id="cookie-decline" className="btn-cookie-ghost">{t('cookie.necessary')}</button>
          <button id="cookie-accept" className="btn-cookie-gold">{t('cookie.accept')}</button>
        </div>
      </div>
      {/* LEGAL MODAL (Privacy Policy) */}
      <div id="privacy-modal" className="legal-modal">
        <div className="legal-modal-backdrop" />
        <div className="legal-modal-content">
          <div className="legal-header">
            <h2 className="legal-title">{t('footer.legal.privacy')}</h2>
            <button className="legal-close-btn" aria-label={t('legal.close')}>
              <i className="fas fa-times" />
            </button>
          </div>
          <div className="legal-body" dangerouslySetInnerHTML={{ __html: t('legal.privacy.html') }} />
        </div>
      </div>
      {/* LEGAL MODAL (Terms) */}
      <div id="terms-modal" className="legal-modal">
        <div className="legal-modal-backdrop" />
        <div className="legal-modal-content">
          <div className="legal-header">
            <h2 className="legal-title">{t('footer.legal.terms')}</h2>
            <button className="legal-close-btn" aria-label={t('legal.close')}>
              <i className="fas fa-times" />
            </button>
          </div>
          <div className="legal-body" dangerouslySetInnerHTML={{ __html: t('legal.terms.html') }} />
        </div>
      </div>
      {/* LEGAL MODAL (Cookie Policy) */}
      <div id="cookie-policy-modal" className="legal-modal">
        <div className="legal-modal-backdrop" />
        <div className="legal-modal-content">
          <div className="legal-header">
            <h2 className="legal-title">{t('footer.legal.cookie')}</h2>
            <button className="legal-close-btn" aria-label={t('legal.close')}>
              <i className="fas fa-times" />
            </button>
          </div>
          <div className="legal-body" dangerouslySetInnerHTML={{ __html: t('legal.cookie.html') }} />
        </div>
      </div>
      {/* PRELOADER LOGIC (The Zoom-Through Reveal) */}
      {/* CUSTOM LUXURY CONTEXT MENU */}
      <div id="gsa-context-menu" className="context-menu">
        <ul className="context-menu-list">
          <li className="ctx-item" id="ctx-partner">
            <span className="ctx-icon">✦</span>
            <a href="#contact"><span className="ctx-text">{t('ctx.partner')}</span></a>
          </li>
          <li className="ctx-item ctx-dynamic" id="ctx-newtab">
            <span className="ctx-icon"><i className="fas fa-external-link-alt" /></span>
            <span className="ctx-text">{t('ctx.newtab')}</span>
          </li>
          <li className="ctx-item ctx-dynamic" id="ctx-submit">
            <span className="ctx-icon"><i className="fas fa-paper-plane" /></span>
            <span className="ctx-text">{t('ctx.submit')}</span>
          </li>
        </ul>
      </div>
      {/* CONTEXT MENU LOGIC */}
    </div>
  );
}
