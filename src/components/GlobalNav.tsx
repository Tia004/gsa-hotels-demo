"use client";

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { UserButton, useAuth } from '@clerk/nextjs';
import { usePathname, useRouter } from 'next/navigation';
import LangSwitcher from '@/components/LangSwitcher';
import { useLang } from '@/context/LangContext';


// SignedIn / SignedOut shims
function SignedIn({ children }: { children: React.ReactNode }) {
  const { isSignedIn } = useAuth();
  return isSignedIn ? <>{children}</> : null;
}
function SignedOut({ children }: { children: React.ReactNode }) {
  const { isSignedIn, isLoaded } = useAuth();
  if (!isLoaded) return null;
  return !isSignedIn ? <>{children}</> : null;
}

interface GlobalNavProps {
  isHomePage?: boolean;
  isRevealed?: boolean;
}

const GlobalNav: React.FC<GlobalNavProps> = ({ isHomePage = false, isRevealed = true }) => {
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();
  const router = useRouter();
  const { t } = useLang();


  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const onScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', onScroll);

    const overlay = document.getElementById('liquid-glass-menu');
    const trigger = document.getElementById('menu-trigger');
    const closeTrigger = document.getElementById('menu-close-trigger');
    const glassLinks = document.querySelectorAll('.glass-link');
    const desktopTrigger = document.querySelector('.desktop-menu-trigger');
    const mobileTrigger = document.querySelector('.mobile-toggle');
    let menuScrollY = 0;

    const toggleMenu = (open: boolean) => {
      if (overlay) {
        if (open) {
          overlay.classList.add('active');
          menuScrollY = window.scrollY || window.pageYOffset || 0;
          document.documentElement.style.overflowY = 'hidden';
          document.body.style.overflowY = 'hidden';
          document.body.style.position = 'fixed';
          document.body.style.top = `-${menuScrollY}px`;
          document.body.style.width = '100%';

          gsap.fromTo('.glass-link',
            { y: 50, opacity: 0 },
            { y: 0, opacity: 1, duration: 0.8, stagger: 0.1, ease: 'power4.out', delay: 0.3 }
          );
        } else {
          // Closing animation for links
          gsap.to('.glass-link', {
            y: -30,
            opacity: 0,
            duration: 0.5,
            stagger: 0.05,
            ease: 'power4.in'
          });

          overlay.classList.remove('active');
          
          // Delay body scroll restoration to match overlay CSS transition (0.8s)
          setTimeout(() => {
            document.documentElement.style.overflowY = '';
            document.body.style.overflowY = '';
            document.body.style.position = '';
            document.body.style.top = '';
            document.body.style.width = '';
            window.scrollTo(0, menuScrollY);
          }, 800);
        }
      }

      document.querySelectorAll('.McButton').forEach(btn => {
        if (open) btn.classList.add('active');
        else btn.classList.remove('active');
      });
    };

    const handleTrigger = (e: Event) => {
      e.preventDefault();
      toggleMenu(!overlay?.classList.contains('active'));
    };

    const handleClose = () => toggleMenu(false);
    const onEsc = (e: KeyboardEvent) => { if (e.key === 'Escape') toggleMenu(false); };

    if (trigger) trigger.addEventListener('click', handleTrigger);
    if (desktopTrigger && desktopTrigger !== trigger) desktopTrigger.addEventListener('click', handleTrigger);
    if (mobileTrigger) mobileTrigger.addEventListener('click', handleTrigger);
    if (closeTrigger) closeTrigger.addEventListener('click', handleClose);
    glassLinks.forEach(link => link.addEventListener('click', handleClose));
    document.addEventListener('keydown', onEsc);

    // Spotlight logo reveal logic
    let st: ScrollTrigger | null = null;
    if (isHomePage) {
      st = ScrollTrigger.create({
        trigger: ".j-logo-container",
        start: "bottom top",
        end: 99999, // Persistent until top
        onEnter: () => {
          const navWrapper = document.querySelector('.nav-wrapper');
          if (navWrapper) navWrapper.classList.add('active');
        },
        onLeaveBack: () => {
          const navWrapper = document.querySelector('.nav-wrapper');
          if (navWrapper) navWrapper.classList.remove('active');
        },
        onUpdate: (self) => {
          // Extra safety: force active if we are scrolled past a certain point even if trigger fails
          if (self.scroll() > 500) {
            const navWrapper = document.querySelector('.nav-wrapper');
            if (navWrapper && !navWrapper.classList.contains('active')) {
              navWrapper.classList.add('active');
            }
          }
        }
      });
    }

    // Safety: if we are not on home page, remove loading class immediately
    if (pathname !== '/') {
      document.documentElement.classList.remove('loading');
      document.body.classList.remove('loading');
    }

    return () => {
      window.removeEventListener('scroll', onScroll);
      document.removeEventListener('keydown', onEsc);
      if (trigger) trigger.removeEventListener('click', handleTrigger);
      if (desktopTrigger && desktopTrigger !== trigger) desktopTrigger.removeEventListener('click', handleTrigger);
      if (mobileTrigger) mobileTrigger.removeEventListener('click', handleTrigger);
      if (closeTrigger) closeTrigger.removeEventListener('click', handleClose);
      glassLinks.forEach(link => link.removeEventListener('click', handleClose));
      if (st) st.kill();
    };
  }, [isHomePage]);

  return (
    <>
      {/* Mobile Toggle (Hidden by CSS but logic kept for compatibility) */}
      <a className="McButton mobile-toggle" data-menu="hamburger-menu" style={{ display: 'none !important' }}>
        <b /><b /><b />
      </a>

      {/* LIQUID GLASS MENU OVERLAY */}
      <div id="liquid-glass-menu" className="glass-menu-overlay">
        <div className="glass-menu-header">
          <Link href="/" className="glass-logo">
            <Image src="/assets/logo.png" alt="GSA Logo" width={120} height={40} style={{ objectFit: 'contain' }} />
          </Link>
          <div className="glass-close-btn mobile-close-btn">
            <div className="McButton active" id="menu-close-trigger">
              <b /><b /><b />
            </div>
          </div>
        </div>

        <div className="glass-menu-content" style={{ justifyContent: 'flex-end', alignItems: 'center', paddingRight: '10vw' }}>
          <nav className="glass-nav-col" style={{ width: 'auto', textAlign: 'right' }}>
            <ul className="editorial-links" style={{ padding: 0, listStyle: 'none' }}>
              <li><Link href="/#intro" className={`glass-link ${pathname === '/' ? 'active' : ''}`}>{t('menu.chiSiamo')}</Link></li>
              <li><Link href="/#services" className={`glass-link ${pathname === '/' ? 'active' : ''}`}>{t('menu.academy')}</Link></li>
              <li><Link href="/#besafe" className={`glass-link ${pathname === '/' ? 'active' : ''}`}>{t('menu.besafe')}</Link></li>
              <li><Link href="/#experiences" className={`glass-link ${pathname === '/' ? 'active' : ''}`}>{t('menu.esperienze')}</Link></li>
              <li><Link href="/#founder" className={`glass-link ${pathname === '/' ? 'active' : ''}`}>{t('menu.fondatore')}</Link></li>
              <li><Link href="/#partner" className={`glass-link ${pathname === '/' ? 'active' : ''}`}>{t('menu.partner')}</Link></li>
              <li><Link href="/#philosophy" className={`glass-link ${pathname === '/' ? 'active' : ''}`}>{t('menu.dna')}</Link></li>
              <li><Link href="/#b2b-section" className={`glass-link ${pathname === '/' ? 'active' : ''}`}>{t('menu.lavora')}</Link></li>
              <li><Link href="/blog" className={`glass-link ${pathname === '/blog' ? 'active' : ''}`}>{t('menu.blog')}</Link></li>
            </ul>

          </nav>
        </div>
      </div>

      {/* Floating Navbar Capsule */}
      <div 
        className={`nav-wrapper ${(!isHomePage || isRevealed) && !pathname.includes('/login') ? 'revealed' : ''}`}
        style={{ 
          opacity: (isRevealed || !isHomePage) ? 1 : 0,
          visibility: (isRevealed || !isHomePage) ? 'visible' : 'hidden',
          transition: 'opacity 1s ease, visibility 1s ease'
        }}
      >
        {/* SPOTLIGHT LOGO */}
        <Link href="/" className={`nav-logo spotlight-mode scroll-appear ${scrolled || !isHomePage ? 'visible' : ''}`} style={{ position: 'fixed', top: '40px', left: '40px', zIndex: 100000, height: '55px', width: '55px', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#000000', borderRadius: '50%', border: '1px solid rgba(255,255,255,0.2)' }}>
          <Image src="/assets/logo.png" alt="GSA" width={80} height={28} style={{ height: '28px', width: 'auto' }} />
        </Link>
        
        {/* Back to Experiences button (only on detail pages) */}
        {(pathname.includes('/esperienze/bologna/') || pathname.includes('/esperienze/ferrara/')) && (
          <Link 
            href={pathname.includes('/bologna/') ? '/esperienze/bologna' : '/esperienze/ferrara'}
            className={`nav-back-btn spotlight-mode scroll-appear ${scrolled || !isHomePage ? 'visible' : ''}`}
            style={{ 
              position: 'fixed', 
              top: '40px', 
              left: '110px', 
              zIndex: 100000, 
              height: '55px',
              padding: '0 24px',
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'center', 
              background: '#000000', 
              borderRadius: '100px', 
              border: '1px solid rgba(255,255,255,0.2)',
              color: 'white',
              fontSize: '11px',
              fontWeight: 500,
              letterSpacing: '0.05em',
              textTransform: 'uppercase',
              whiteSpace: 'nowrap'
            }}
          >
            {t('exp.back')}
          </Link>
        )}

        <nav className="nav-capsule navbar nav-menu" style={{ pointerEvents: 'auto', position: 'fixed', top: '40px', right: '40px', display: 'flex', flexDirection: 'row', alignItems: 'center', whiteSpace: 'nowrap', justifyContent: 'flex-end', gap: '20px', padding: '12px 24px', zIndex: 100000, background: '#000000', borderRadius: '100px', border: '1px solid rgba(255,255,255,0.2)' }}>
          <LangSwitcher />
          <Link href="/#contact" className="nav-cta">{t('nav.contatti')}</Link>
          <div className="nav-auth-inline" style={{ display: 'flex', alignItems: 'center' }}>
            <SignedOut>
              <Link href={`/login?redirect_url=${encodeURIComponent(pathname)}`} className="auth-icon-btn" title={t('nav.accedi')}>
                <svg className="auth-icon-svg" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                  <path d="M20 21a8 8 0 0 0-16 0" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" />
                  <path d="M12 13a5 5 0 1 0 0-10 5 5 0 0 0 0 10Z" stroke="currentColor" strokeWidth="1.25" strokeLinejoin="round" />
                </svg>
              </Link>
            </SignedOut>

            <SignedIn>
              <UserButton
                appearance={{
                  elements: {
                    avatarBox: 'width: 32px; height: 32px;',
                    userButtonPopoverCard: 'background: #111 !important; border: 1px solid rgba(197,160,89,0.3) !important; box-shadow: 0 20px 60px rgba(0,0,0,0.8) !important;',
                    userButtonPopoverActionButton: 'color: #fff !important;',
                    userButtonPopoverActionButtonText: 'color: #fff !important;',
                    userButtonPopoverActionButtonIcon: 'color: #C5A059 !important;',
                    userButtonPopoverFooter: 'display: none !important;',
                  }
                }}
              >
                <UserButton.MenuItems>
                  <UserButton.Action
                    label={t('nav.dashboard')}
                    labelIcon={<i className="fas fa-columns" style={{ color: '#C5A059', fontSize: '14px' }} />}
                    onClick={() => router.push('/dashboard')}
                  />
                </UserButton.MenuItems>
              </UserButton>
            </SignedIn>
          </div>
          <div className="desktop-menu-trigger McButton" id="menu-trigger" style={{ position: 'relative', width: '30px', height: '30px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <b style={{ pointerEvents: 'none' }} />
            <b style={{ pointerEvents: 'none' }} />
            <b style={{ pointerEvents: 'none' }} />
          </div>
        </nav>
      </div>
    </>
  );
};

export default GlobalNav;
