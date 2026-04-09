"use client";
/* eslint-disable */
// @ts-nocheck

import React, { useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from '@studio-freight/lenis';
import SplitType from 'split-type';
import Link from 'next/link';
import { SignInButton, SignUpButton, UserButton, useAuth } from '@clerk/nextjs';

// Extend Window interface for Lenis global access
declare global {
  interface Window {
    lenis?: any;
  }
}

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
        window.lenis = lenis; // EXPOSE TO WINDOW FOR PRELOADER
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
        const trigger = document.querySelector('.mobile-toggle'); // L'icona hamburger nella navbar
        const overlay = document.getElementById('mobile-menu-overlay');
        const closeBtn = document.querySelector('.mobile-close-btn');
        const mobileLinks = document.querySelectorAll('.mobile-link, .btn-mobile-gold');

        // Funzione per aprire
        function openMenu() {
            if (overlay) overlay.classList.add('active');
            if (trigger) trigger.classList.add('active');
            document.body.style.overflow = 'hidden';
        }

        // Funzione per chiudere
        function closeMenu() {
            if (overlay) overlay.classList.remove('active');
            if (trigger) trigger.classList.remove('active');
            document.body.style.overflow = '';
        }

        if (trigger && overlay) {
            // Toggle Logic
            trigger.addEventListener('click', () => {
                if (overlay.classList.contains('active')) closeMenu();
                else openMenu();
            });

            // Click su X (Chiudi)
            if (closeBtn) closeBtn.addEventListener('click', closeMenu);

            // Click su un link (Chiudi e vai alla sezione)
            mobileLinks.forEach(link => {
                link.addEventListener('click', closeMenu);
            });
        }

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
                        if (window.lenis) {
                            window.lenis.start();
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
      if (window.lenis) window.lenis.destroy();
    };
  }, []);

  return (
    <div>
  <meta charSet="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>GSA Hotels | The Art of Hosting</title>
  {/* SVG Filter for Fisheye Lens (Physical Refraction) */}
  <svg style={{position: 'absolute', width: 0, height: 0, overflow: 'hidden'}} aria-hidden="true">
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
  <svg style={{position: 'absolute', width: 0, height: 0, overflow: 'hidden'}} aria-hidden="true">
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
      <h1 id="logo-gold" className="gsa-huge-logo gsa-logo-layer gold">GSA</h1>
      {/* Layer 2: HOLE (Visible during zoom to cut the mask) */}
      <h1 id="logo-hole" className="gsa-huge-logo gsa-logo-layer hole">GSA</h1>
    </div>
  </div>
  {/* SVG FILTER (User Snippet) */}
  <svg style={{width: 0, height: 0, position: 'absolute', pointerEvents: 'none'}}>
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
  {/* MOBILE MENU OVERLAY (The Black Curtain) */}
  {/* MOBILE MENU OVERLAY (The Black Curtain) */}
  <div id="mobile-menu-overlay" className="mobile-overlay">
    <div className="mobile-menu-header">
      <a href="index.html"><img src="assets/logo.png" alt="GSA Logo" className="mobile-logo" /></a>
      <div className="mobile-close-btn">
        <i className="fas fa-times" />
      </div>
    </div>
    <nav className="mobile-nav-content">
      <ul className="mobile-links-list">
        <li style={{'--delay': '0.1s'} as React.CSSProperties}><a href="#fleet" className="mobile-link">SOGGIORNI</a></li>
        <li style={{'--delay': '0.15s'} as React.CSSProperties}><a href="#services" className="mobile-link">SERVIZI</a></li>
        <li style={{'--delay': '0.2s'} as React.CSSProperties}><a href="#founder" className="mobile-link">LA MENTE</a></li>
        <li style={{'--delay': '0.25s'} as React.CSSProperties}><a href="#philosophy" className="mobile-link">IL NOSTRO DNA</a></li>
      </ul>
      <div className="mobile-cta-wrapper" style={{'--delay': '0.5s'} as React.CSSProperties}>
        <a href="#contact" className="btn-mobile-gold">DIVENTA PARTNER</a>
      </div>
    </nav>
    <div className="mobile-menu-footer">
      <a href="mailto:info@gsahotels.com">info@gsahotels.com</a>
      <div className="mobile-socials">
        <a href="#" target="_blank"><i className="fab fa-linkedin" /></a>
        <a href="https://www.instagram.com/gsahotels/" target="_blank"><i className="fab fa-instagram" /></a>
      </div>
    </div>
  </div>
  {/* LAYER 1: LIQUID GHOST (Solid White, Goo Filter) */}
  <div id="cursor-goo-wrapper">
    <div id="goo-fast" className="goo-blob"></div>
    <div id="goo-slow" className="goo-blob"></div>
  </div>
  {/* LAYER 2: GLASS SHELL (Transparent, No Filter) */}
  <div id="cursor-wrapper">
    <div id="cursors">
      <div id="cursor-fast" className="cursor-dot" />
      <div id="cursor-slow" className="cursor-dot" />
    </div>
  </div>
  {/* Page Transition Curtain */}
  <div className="transition-curtain" />
  {/* GLOBAL BACKGROUND LAYER (Moved out of Hero) */}
  <div className="jesko-bg-layer">
    <video id="hero-video" className="jesko-bg-video" autoPlay muted loop playsInline  poster="assets/hero-fallback.png">
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
    <a href="index.html" className="nav-logo spotlight-mode">
      <img src="assets/logo.png" alt="GSA" />
    </a>
    <nav className="nav-capsule navbar nav-menu">
      {/* Logo moved out */}
      <div className="nav-links">
        <a href="#fleet" className="nav-link" data-text="Soggiorni"><span>Soggiorni</span></a>
        <a href="#services" className="nav-link" data-text="Servizi"><span>Servizi</span></a>
        <a href="#founder" className="nav-link" data-text="La Mente"><span>La Mente</span></a>
        <a href="#philosophy" className="nav-link" data-text="Il Nostro DNA"><span>Il Nostro DNA</span></a>
      </div>
      {/* CTA moved to Bottom Right in Hero, but kept in nav for scroll utility */}
      {/* CTA and Auth Buttons */}
      <div style={{ display: 'flex', gap: '0.8rem', alignItems: 'center' }}>
        <a href="#contact" className="nav-cta">DIVENTA PARTNER</a>
        <SignedOut>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <SignInButton mode="modal">
              <button className="nav-cta" style={{ 
                background: 'rgba(197, 160, 89, 0.1)', 
                border: '1px solid #C5A059', 
                color: '#C5A059',
                padding: '0.5rem 1.2rem'
              }}>
                <span style={{ color: '#C5A059' }}>ACCEDI</span>
              </button>
            </SignInButton>
            <span style={{ fontSize: '10px', color: 'rgba(255,255,255,0.4)', textTransform: 'uppercase', letterSpacing: '0.1em', fontWeight: 'bold' }}>oppure</span>
            <SignUpButton mode="modal">
              <button className="nav-cta" style={{ 
                background: 'transparent', 
                border: '1px solid rgba(255,255,255,0.3)',
                padding: '0.5rem 1.2rem'
              }}>
                <span style={{ color: '#fff' }}>REGISTRATI</span>
              </button>
            </SignUpButton>
          </div>
        </SignedOut>
        <SignedIn>
          <UserButton />
        </SignedIn>
      </div>
    </nav>
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
          <a href="index.html"><img src="assets/logo.png" alt="GSA Logo" className="j-logo" fetchPriority="high" /></a>
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
          <h3 className="j-subhead">GSA HOTELS GROUP</h3>
          <p className="j-desc">Uniamo imprenditori visionari e strutture d'eccellenza. GSA Hotels
            ridefinisce il concetto di gestione alberghiera, massimizzando il valore del tuo asset
            attraverso strategie innovative e un network esclusivo.</p>
        </div>
        {/* BOTTOM RIGHT: CTA */}
        <div className="j-cta-container">
          <div className="j-scroll-in">
            <span>SCOPRI I VANTAGGI</span>
            <div className="j-line" />
          </div>
          <a href="#contact" className="j-btn">INVIA CANDIDATURA</a>
        </div>
      </div>
    </section>
    {/* Pillars Section (Nuclear Insert) */}
    <section id="features" className="pillars-section">
      <div className="jesko-statement-container">
        <p className="jesko-statement">
          Non sei più solo.<br /><br />
          Entrare in GSA Hotels significa accedere a economie di scala, know-how condiviso e una forza
          commerciale che il singolo hotel non può raggiungere.<br /><br />
          Trasformiamo potenziali in profitti.
        </p>
      </div>
    </section>
    {/* Fleet Section (Horizontal Scroll) */}
    {/* Hotel Sections (Vertical Stack) */}
    <div id="fleet">
      {/* Duchessa Isabella */}
      <section className="hotel-section">
        <div className="hotel-bg-wrapper">
          <img src="assets/duchessa_isabella.png" alt="Duchessa Isabella" className="hotel-bg" data-speed="0.3" loading="lazy" />
        </div>
        <div className="hotel-overlay" />
        <div className="hotel-content">
          <span className="hotel-location">Ferrara</span>
          <h2 className="hotel-name">Duchessa Isabella</h2>
          <a href="#" className="btn-explore">Esplora Dimora</a>
        </div>
      </section>
      {/* Hotel Blumen */}
      <section className="hotel-section">
        <div className="hotel-bg-wrapper">
          <img src="assets/hotel_blumen.jpg" alt="Hotel Blumen" className="hotel-bg" data-speed="0.3" loading="lazy" />
        </div>
        <div className="hotel-overlay" />
        <div className="hotel-content">
          <span className="hotel-location">Bologna</span>
          <h2 className="hotel-name">Hotel Blumen</h2>
          <a href="#" className="btn-explore">Esplora Dimora</a>
        </div>
      </section>
      {/* Hotel Sant'Orsola */}
      <section className="hotel-section">
        <div className="hotel-bg-wrapper">
          <img src="assets/santorsola.png" alt="Hotel Sant'Orsola" className="hotel-bg" data-speed="0.3" loading="lazy" />
        </div>
        <div className="hotel-overlay" />
        <div className="hotel-content">
          <span className="hotel-location">Bologna</span>
          <h2 className="hotel-name">Sant'Orsola</h2>
          <a href="#" className="btn-explore">Esplora Dimora</a>
        </div>
      </section>
    </div>
    {/* GSA ACADEMY SECTION (The Certificate) */}
    <section id="services" className="academy-section">
      <div className="bg-academy-grid" />
      <div className="container academy-container">
        <div className="academy-content reveal">
          <span className="label-gold">ACADEMY</span>
          <h2 className="academy-title">Costruire il Futuro</h2>
          <div className="separator-line" />
          <p className="academy-desc">
            GSA Hotels non è solo gestione, è opportunità.
            In collaborazione con <strong>Oficina I.S.</strong>, offriamo percorsi certificati che uniscono
            competenze concrete e visione manageriale, trasformando il talento in professione.
          </p>
          <ul className="academy-list">
            <li>
              <i className="fas fa-check-circle" />
              <span><strong>Certificazione Valida:</strong> Rilascio di attestato certificato per
                l'inserimento professionale in Italia.</span>
            </li>
            <li>
              <i className="fas fa-check-circle" />
              <span><strong>Connessione Reale:</strong> 45 studenti già inseriti operativamente negli
                staff per la stagione estiva.</span>
            </li>
            <li>
              <i className="fas fa-check-circle" />
              <span><strong>Mentorship:</strong> Corsi tenuti da professionisti del settore con esperienza
                diretta sul campo.</span>
            </li>
          </ul>
          <a href="mailto:stefanogolisano@gsa-hotels.com" className="btn-jesko">
            <i className="fas fa-envelope" /> SCRIVI AL RESPONSABILE
          </a>
        </div>
        <div className="academy-visual reveal">
          <div className="academy-image-wrapper">
            <img src="assets/academy_white_glove.png" alt="GSA Certified Service" />
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
            <div className="badge-center"><img src="assets/logo.png" alt="GSA Logo" /></div>
          </div>
        </div>
      </div>
    </section>
    {/* BESAFE RATE SECTION (Floating Glass Cards) */}
    <section id="besafe" className="besafe-section">
      <div className="bg-besafe-aurora">
        <div className="orb orb-1" />
        <div className="orb orb-2" />
      </div>
      <div className="container besafe-container">
        <div className="besafe-text-col">
          <span className="label-gold">PREMIUM PROTECTION</span>
          <h2 className="besafe-title">BeSafe Rate</h2>
          <h3 className="besafe-subtitle">Il lusso della serenità.</h3>
          <p className="besafe-desc">
            Prenotare una struttura d'eccellenza richiede garanzie d'eccellenza.
            Con <strong>BeSafe Rate</strong>, la tariffa include un'assicurazione completa che protegge il
            tuo investimento e la tua esperienza, prima e durante il soggiorno.
          </p>
          <div className="besafe-seal">
            <i className="fas fa-shield-alt" />
            <span>COPERTURA INCLUSA</span>
          </div>
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
        </div>
      </div>
    </section>
    {/* FOUNDER SPOTLIGHT (Editorial Style) */}
    <section id="founder" className="founder-section">
      <div className="bg-founder-spotlight" />
      <div className="bg-noise" />
      <div className="container founder-container">
        <div className="founder-bio reveal">
          <span className="label-gold">THE MIND BEHIND GSA</span>
          <h2 className="founder-name">Stefano Golisano</h2>
          <h3 className="founder-role">Founder &amp; CEO</h3>
          <div className="separator-line" />
          <p className="founder-text">
            Un decennio di esperienza nel settore alberghiero ha forgiato una visione chiara:
            l'ospitalità non è solo servizio, è una scienza esatta.
          </p>
          <p className="founder-text">
            Stefano ha fondato GSA Hotels per colmare il divario tra la gestione tradizionale e le moderne
            esigenze di investimento.
            Se vuoi capire la realtà dietro il brand e conoscere la persona che guida la strategia, guarda
            il dietro le quinte.
          </p>
          <div className="founder-signature">
            Stefano Golisano
          </div>
        </div>
        <div className="founder-media reveal">
          <a href="https://www.youtube.com/watch?v=rzLIWEaDbuc" target="_blank" className="video-preview-card">
            <div className="video-overlay" />
            <img src="assets/thumbnail.jpg" alt="Stefano Golisano Interview" className="video-thumbnail" />
            <div className="podcast-badge">
              <span>FEATURING</span>
              <strong>IL CORVO PODCAST</strong>
            </div>
            <div className="play-btn-luxury">
              <i className="fas fa-play" />
            </div>
          </a>
          <p className="video-caption">GUARDA L'INTERVISTA COMPLETA</p>
        </div>
      </div>
    </section>
    {/* Philosophy Section */}
    {/* Bugatti Vision Section (Engineering Excellence) */}
    <section id="philosophy" className="vision-section-bugatti">
      <div className="bg-watermark">EXCELLENCE</div>
      <div className="container vision-container">
        <div className="vision-content reveal">
          <span className="vision-kicker">IL NOSTRO DNA</span>
          <h2 className="vision-headline">VISION</h2>
          <div className="vision-divider" />
          <p className="vision-body">
            Non gestiamo semplici immobili. <strong>Noi ingegnerizziamo asset.</strong><br />
            Come in una macchina perfetta, ogni ingranaggio deve generare valore. Il nostro approccio fonde
            l'eleganza dell'ospitalità italiana con la precisione della gestione finanziaria. Trasformiamo
            le
            strutture in icone di profitto.
          </p>
          <a href="#metodo" className="btn-bugatti">
            <span className="btn-text">SCOPRI L'APPROCCIO</span>
            <span className="btn-line" />
          </a>
        </div>
        <div className="vision-visual reveal">
          <div className="visual-frame">
            <img src="https://images.unsplash.com/photo-1600607686527-6fb886090705?q=80&w=1200&auto=format&fit=crop" alt="Luxury Asset Architecture" />
            <div className="frame-border" />
          </div>
        </div>
      </div>
    </section>
    {/* Luxury Contact Form (Liquid Gold Embers) */}
    <section id="contact" className="luxury-form-section">
      <div id="embers-container" className="embers-container" />
      <div className="container luxury-form-container">
        <div className="form-intro reveal">
          <span className="label-gold">CONTATTO DIRETTO</span>
          <h2 className="form-title">Parla con noi</h2>
          <p className="form-desc">
            Valutiamo esclusivamente strutture con alto potenziale di crescita.
            Lascia i tuoi recapiti per una conversazione riservata.
          </p>
          <div className="contact-direct-info">
            <div className="info-row">
              <span className="info-label">HEADQUARTERS</span>
              <span className="info-value">Emilia Romagna, Italia</span>
            </div>
            <div className="info-row">
              <span className="info-label">EMAIL</span>
              <a href="mailto:info@gsahotels.com" className="info-value link">info@gsahotels.com</a>
            </div>
          </div>
        </div>
        <div className="form-wrapper reveal">
          <form className="minimal-form">
            <div className="input-group">
              <input type="text" id="nome" required placeholder=" " className="minimal-input" />
              <label htmlFor="nome" className="floating-label">NOME E COGNOME</label>
              <span className="focus-border" />
            </div>
            <div className="input-group">
              <input type="text" id="azienda" required placeholder=" " className="minimal-input" />
              <label htmlFor="azienda" className="floating-label">AZIENDA / HOTEL</label>
              <span className="focus-border" />
            </div>
            <div className="input-group">
              <input type="email" id="email" required placeholder=" " className="minimal-input" />
              <label htmlFor="email" className="floating-label">EMAIL AZIENDALE</label>
              <span className="focus-border" />
            </div>
            <div className="input-group">
              <input type="tel" id="telefono" placeholder=" " className="minimal-input" />
              <label htmlFor="telefono" className="floating-label">TELEFONO</label>
              <span className="focus-border" />
            </div>
            <div className="input-group">
              <textarea id="messaggio" placeholder=" " className="minimal-input" rows={5} defaultValue={""} />
              <label htmlFor="messaggio" className="floating-label">MESSAGGIO</label>
              <span className="focus-border" />
            </div>
            <div className="input-group custom-select-wrapper" id="customSelectWrapper">
              <input type="hidden" id="interesse" name="interesse" />
              {/* Trigger (The "Input") */}
              <div className="minimal-input custom-select-trigger" tabIndex={0} data-label="MOTIVO DEL CONTATTO">
                <span className="checkmark-icon" style={{display: 'none', marginRight: 10, color: '#C5A059'}}>✓</span>
                <span className="selected-text" />
              </div>
              {/* Dropdown Options */}
              <div className="custom-options">
                <div className="custom-option" data-value="valutazione">Richiesta Valutazione Asset</div>
                <div className="custom-option" data-value="partnership">Proposta Partnership</div>
                <div className="custom-option" data-value="investimento">Investor Relations</div>
              </div>
              {/* Label handled via CSS pseudo-element ::before on trigger */}
              {/* Label hidden initially, shown if needed or replaced by UI logic */}
            </div>
            <button type="submit" className="btn-submit-luxury" style={{borderRadius: 50}}>
              INVIA RICHIESTA <i className="fas fa-long-arrow-alt-right" />
            </button>
          </form>
        </div>
      </div>
    </section>
    {/* Luxury Footer (The Foundation) */}
    <footer className="luxury-footer">
      <div className="container">
        <div className="footer-grid">
          <div className="footer-col brand-col">
            {/* Img Placeholder text if no logo */}
            <h4 className="footer-heading" style={{marginBottom: 10}}>GSA HOTELS</h4>
            <p className="footer-address">
              Via Placeholder<br />
              00000 Placeholder (Placeholder)<br />
              Placeholder
            </p>
            <p className="footer-vat">
              P.IVA / C.F. Placeholder<br />
              REA: Placeholder
            </p>
          </div>
          <div className="footer-col">
            <h4 className="footer-heading">NAVIGAZIONE</h4>
            <ul className="footer-links">
              <li><a href="#fleet">Soggiorni</a></li>
              <li><a href="#services">Servizi</a></li>
              <li><a href="#founder">La Mente</a></li>
              <li><a href="#philosophy">Il Nostro DNA</a></li>
              <li><a href="#contact">Contatti</a></li>
            </ul>
          </div>
          <div className="footer-col">
            <h4 className="footer-heading">LEGAL</h4>
            <ul className="footer-links">
              <li id="privacypolicy"><a href="#privacy">Privacy Policy</a></li>
              <li id="cookiepolicy"><a href="#cookiepolicy">Cookie Policy</a></li>
              <li id="terms"><a href="#terms">Termini &amp; Condizioni</a></li>
              <li><a href="#contact">Lavora con noi</a></li>
            </ul>
          </div>
          <div className="footer-col">
            <h4 className="footer-heading">CONNECT</h4>
            <div className="social-links">
              <a href="#" target="_blank" className="social-btn"><i className="fab fa-linkedin" /> LINKEDIN</a>
              <a href="https://www.instagram.com/gsahotels/" target="_blank" className="social-btn"><i className="fab fa-instagram" /> INSTAGRAM</a>
            </div>
            <a href="mailto:info@gsahotels.com" className="footer-mail">info@gsahotels.com</a>
          </div>
        </div>
        <div className="footer-bottom-line">
          <span>© 2026 GSA HOTELS S.r.l. - All Rights Reserved.</span>
          <span>Designed and coded by <a href="mailto:tiachinaglia@gmail.com">Mattia Chinaglia</a></span>
        </div>
      </div>
      <div className="footer-signature">
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
