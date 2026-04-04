        document.addEventListener('DOMContentLoaded', () => {
            if (typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined') {
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
            }

            // --- FOUNDER SPOTLIGHT INTERACTIVE EFFECT ---
            const founderSection = document.querySelector('.founder-section');
            const spotlight = document.querySelector('.bg-founder-spotlight');

            if (founderSection && spotlight) {
                founderSection.addEventListener('mousemove', (e) => {
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
                const spawn = (count, type, minSize, maxSize, minDur, maxDur, minOp, maxOp) => {
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
                        p.style.setProperty('--max-opacity', opacity);

                        // Random movement values for float animation
                        p.style.setProperty('--move-x', `${(Math.random() - 0.5) * 200}px`);
                        p.style.setProperty('--move-y', `${(Math.random() - 0.5) * 200}px`);
                        p.style.setProperty('--scale-end', Math.random() * 0.5 + 0.5);

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
        });
        document.addEventListener('DOMContentLoaded', () => {
            const video = document.getElementById('hero-video');

            if (video) {
                // 1. FORZA IL MUTE (Doppia sicurezza per iOS)
                video.muted = true;
                video.defaultMuted = true;
                video.setAttribute('playsinline', '');
                video.setAttribute('webkit-playsinline', '');

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
        });
        // Init Lenis
        const lenis = new Lenis({
            duration: 1.2,
            easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
            direction: 'vertical',
            gestureDirection: 'vertical',
            smooth: true,
            mouseMultiplier: 1,
            smoothTouch: false,
            touchMultiplier: 2,
            infinite: false,
            damping: 0.08 // lighter feel (was 0.1)
        });

        // Initialize LOCKED (Wait for Preloader)
        lenis.stop();
        window.lenis = lenis; // EXPOSE TO WINDOW FOR PRELOADER
        window.scrollTo(0, 0); // Force top

        function raf(time) {
            lenis.raf(time);
            requestAnimationFrame(raf);
        }
        requestAnimationFrame(raf);

        // Connect GSAP ScrollTrigger to Lenis
        gsap.registerPlugin(ScrollTrigger);

        // --- SENIOR DEV: STRICT JESKO ANIMATIONS ---

        // 1. Headline & Desc Progressive Reveal
        const heroHeadline = new SplitType('.j-headline', { types: 'words, chars' });
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
            const revealElements = gsap.utils.toArray('.reveal');
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
                if (el) {
                    el.style.display = 'none';
                    el.style.visibility = 'hidden';
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
        gsap.utils.toArray('.hotel-section').forEach(section => {
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
        const selectTrigger = selectWrapper.querySelector('.custom-select-trigger');
        const customOptions = selectWrapper.querySelector('.custom-options');
        const options = selectWrapper.querySelectorAll('.custom-option');
        const selectedText = selectWrapper.querySelector('.selected-text');
        const hiddenInput = selectWrapper.querySelector('#interesse');
        const checkmark = selectWrapper.querySelector('.checkmark-icon');
        // Label logic moved to CSS ::before

        // Toggle Dropdown
        selectTrigger.addEventListener('click', () => {
            selectWrapper.classList.toggle('open');
        });

        // Handle Option Click
        options.forEach(option => {
            option.addEventListener('click', function () {
                // Update Text
                selectedText.textContent = this.textContent;
                selectTrigger.classList.add('filled');

                // Update Value
                hiddenInput.value = this.dataset.value;

                // Show Checkmark
                checkmark.style.display = 'inline-block';

                // Active State Styling (Gold Text)
                selectedText.style.color = 'white';

                // Update Label (Styles handled by CSS via .filled class on input)

                // Close
                selectWrapper.classList.remove('open');

                // Close
                selectWrapper.classList.remove('open');

                // Highlight option
                options.forEach(opt => opt.classList.remove('selected'));
                this.classList.add('selected');
            });
        });

        // Close when clicking outside
        document.addEventListener('click', (e) => {
            if (!selectWrapper.contains(e.target)) {
                selectWrapper.classList.remove('open');
            }
        });

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
        document.addEventListener('DOMContentLoaded', function () {
            if (document.getElementById('particles-contact')) {
                particlesJS('particles-contact', {
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
        });


        // FLUID DROPLET CURSOR TRACKING (Fast + Slow)
        document.addEventListener('DOMContentLoaded', () => {
            // DETECT MOBILE/TOUCH -> KILL CURSOR
            const isTouch = 'ontouchstart' in window || navigator.maxTouchPoints > 0;

            if (isTouch) {
                const wrappers = document.querySelectorAll('#cursor-wrapper, #cursor-goo-wrapper');
                wrappers.forEach(w => w.remove()); // Remove from DOM
                return; // Stop script
            }

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
        });
        document.addEventListener('DOMContentLoaded', () => {
            const trigger = document.querySelector('.mobile-toggle'); // L'icona hamburger nella navbar
            const overlay = document.getElementById('mobile-menu-overlay');
            const closeBtn = document.querySelector('.mobile-close-btn');
            const mobileLinks = document.querySelectorAll('.mobile-link, .btn-mobile-gold');

            // Funzione per aprire
            function openMenu() {
                overlay.classList.add('active');
                if (trigger) trigger.classList.add('active');
                document.body.style.overflow = 'hidden';
            }

            // Funzione per chiudere
            function closeMenu() {
                overlay.classList.remove('active');
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
                closeBtn.addEventListener('click', closeMenu);

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
        });

        // PRIVACY CONCIERGE LOGIC
        document.addEventListener('DOMContentLoaded', () => {
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
            function closeBanner(consentType) {
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
        });

        // UNIVERSAL LEGAL MODAL SYSTEM
        document.addEventListener('DOMContentLoaded', () => {
            let scrollPosition = 0;

            // Funzione Apri Modale
            function openModal(modalId) {
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
        });
        window.addEventListener('load', () => {
            // Blocca scroll
            document.body.style.overflow = 'hidden';

            const overlay = document.getElementById('zoom-preloader');
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
                        if (overlay) overlay.classList.add('finished');
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
                            if (overlay) overlay.remove();
                        }, 500);

                    }, 1000); // Timing sincronizzato col picco dello zoom

                }, 800); // Tempo di "lettura" del logo fermo

            }, 1800); // Durata totale dello shuffle iniziale
        });
        document.addEventListener('DOMContentLoaded', () => {
            const contextMenu = document.getElementById('gsa-context-menu');
            const ctxPartner = document.getElementById('ctx-partner');
            const ctxNewTab = document.getElementById('ctx-newtab');
            const ctxSubmit = document.getElementById('ctx-submit');

            // Variabili per salvare l'elemento cliccato
            let targetLink = null;
            let targetAction = null;

            // 1. ASCOLTA IL CLICK DESTRO
            document.addEventListener('contextmenu', (e) => {
                e.preventDefault(); // BLOCCA il menu nativo del browser

                // Resetta le voci dinamiche (nascondi tutto tranne Partner)
                if (ctxNewTab) ctxNewTab.classList.add('hidden');
                if (ctxSubmit) ctxSubmit.classList.add('hidden');

                // --- ANALISI CONTESTO ---

                // Caso A: L'utente ha cliccato su un LINK (o dentro un link)
                targetLink = e.target.closest('a');
                if (targetLink && ctxNewTab) {
                    ctxNewTab.classList.remove('hidden');
                }

                // Caso B: L'utente ha cliccato su un BUTTON o SUBMIT
                targetAction = e.target.closest('button, input[type="submit"], .btn');
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
        });
