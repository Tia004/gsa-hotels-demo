"use client";

import { SignIn } from '@clerk/nextjs';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { itIT } from '@clerk/localizations';
import Script from 'next/script';
import { useEffect } from 'react';
import { useLang } from '@/context/LangContext';



export default function LoginPage() {
  const searchParams = useSearchParams();
  const redirectUrl = searchParams.get('redirect_url') || '/dashboard';
  const { t } = useLang();

  useEffect(() => {
    // Initialize particles for login background
    const initParticles = () => {
      if ((window as any).particlesJS) {
        (window as any).particlesJS('particles-login', {
          "particles": {
            "number": { "value": 80, "density": { "enable": true, "value_area": 800 } },
            "color": { "value": "#C5A059" },
            "shape": { "type": "circle" },
            "opacity": {
              "value": 0.5, "random": true,
              "anim": { "enable": true, "speed": 0.8, "opacity_min": 0.2, "sync": false }
            },
            "size": { "value": 3, "random": true },
            "line_linked": {
              "enable": true, "distance": 150, "color": "#C5A059", "opacity": 0.3, "width": 1
            },
            "move": {
              "enable": true, "speed": 1.5, "direction": "none", "random": true, "straight": false, "out_mode": "out", "bounce": false,
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
              "grab": { "distance": 140, "line_linked": { "opacity": 0.5 } }
            }
          },
          "retina_detect": true
        });
      }
    };

    if ((window as any).particlesJS) {
      initParticles();
    } else {
      // If script not yet loaded, wait a bit
      const checkInterval = setInterval(() => {
        if ((window as any).particlesJS) {
          initParticles();
          clearInterval(checkInterval);
        }
      }, 100);
      return () => clearInterval(checkInterval);
    }
    return () => {
      const pJS = (window as any).pJSDom;
      if (Array.isArray(pJS)) {
        for (let i = 0; i < pJS.length; i++) {
          const instance = pJS[i];
          if (instance && instance.pJS && instance.pJS.fn && instance.pJS.fn.vendors) {
            try {
              instance.pJS.fn.vendors.destroypJS();
            } catch (e) {
              console.warn("ParticlesJS cleanup error (login):", e);
            }
          }
        }
        (window as any).pJSDom = [];
      }
    };
  }, []);

  return (
    <div className="login-page-container">
      <Script 
        src="https://cdn.jsdelivr.net/particles.js/2.0.0/particles.min.js"
        strategy="lazyOnload"
      />

      <style jsx global>{`
        :root {
          --gold: #C5A059;
          --gold-light: #d4b57a;
          --bg: #080808;
          --bg-card: rgba(10, 10, 10, 0.92);
        }

        body {
          background: var(--bg);
          min-height: 100vh;
          margin: 0;
          font-family: 'Montserrat', sans-serif;
          overflow: hidden;
        }

        .login-page-container {
          min-height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
          position: relative;
        }

        .bg-ambient {
          position: fixed;
          inset: 0;
          z-index: 0;
          pointer-events: none;
        }

        .bg-ambient::before {
          content: '';
          position: absolute;
          width: 600px;
          height: 600px;
          border-radius: 50%;
          background: radial-gradient(circle, rgba(197, 160, 89, 0.12) 0%, transparent 70%);
          top: -150px;
          left: -150px;
          animation: drift1 18s ease-in-out infinite alternate;
        }

        .bg-ambient::after {
          content: '';
          position: absolute;
          width: 500px;
          height: 500px;
          border-radius: 50%;
          background: radial-gradient(circle, rgba(197, 160, 89, 0.08) 0%, transparent 70%);
          bottom: -100px;
          right: -100px;
          animation: drift2 22s ease-in-out infinite alternate;
        }

        @keyframes drift1 {
          0% { transform: translate(0, 0) }
          100% { transform: translate(60px, 80px) }
        }

        @keyframes drift2 {
          0% { transform: translate(0, 0) }
          100% { transform: translate(-50px, -60px) }
        }

        .card {
          position: relative;
          z-index: 10;
          width: 100%;
          max-width: 500px;
          background: var(--bg-card);
          border: 1px solid rgba(197, 160, 89, 0.18);
          border-radius: 20px;
          padding: 56px 44px 48px;
          backdrop-filter: blur(24px);
          -webkit-backdrop-filter: blur(24px);
          box-shadow:
            0 0 0 1px rgba(255, 255, 255, 0.03),
            0 40px 80px rgba(0, 0, 0, 0.6),
            0 0 60px rgba(197, 160, 89, 0.05);
        }

        .card-logo {
          display: flex;
          align-items: center;
          justify-content: center;
          margin: 0 auto 32px;
          background: transparent;
          padding: 0;
          border-radius: 0;
          width: fit-content;
        }

        .card-logo img {
          height: 80px;
          width: auto;
          filter: drop-shadow(0 0 10px rgba(197, 160, 89, 0.3));
        }

        /* HARD OVERRIDES FOR CLERK ELEMENTS */
        :global(.cl-headerTitle) {
          color: #ffffff !important;
          font-weight: 800 !important;
          font-size: 1.6rem !important;
          letter-spacing: -0.02em !important;
        }

        :global(.cl-headerSubtitle) {
          color: #ffffff !important;
          opacity: 0.9 !important;
          font-size: 1rem !important;
        }

        :global(.cl-formFieldLabel) {
          color: #ffffff !important;
          font-weight: 700 !important;
          font-size: 0.95rem !important;
          margin-bottom: 12px !important;
          opacity: 1 !important;
        }

        :global(.cl-formButtonPrimary) {
          text-transform: uppercase !important;
          letter-spacing: 0.15em !important;
          font-weight: 800 !important;
          font-size: 0.95rem !important;
          transition: all 0.3s ease !important;
        }

        :global(.cl-formButtonPrimary:hover) {
          transform: translateY(-2px);
          box-shadow: 0 8px 25px rgba(197, 160, 89, 0.5) !important;
        }

        :global(.cl-otpCodeFieldInput) {
          border: 2px solid #C5A059 !important;
          background: rgba(255,255,255,0.12) !important;
          color: white !important;
          font-weight: 800 !important;
          font-size: 2rem !important;
          border-radius: 12px !important;
        }

        :global(.cl-otpCodeFieldInput:focus) {
          border-color: #ffffff !important;
          background: rgba(255,255,255,0.2) !important;
        }

        :global(.cl-identityPreviewText) {
          color: #ffffff !important;
          font-weight: 700 !important;
        }

        :global(.cl-formResendCodeLink) {
          color: #C5A059 !important;
          font-weight: 800 !important;
        }

        :global(.cl-formFieldInput) {
          border: 1px solid rgba(197, 160, 89, 0.6) !important;
          background: rgba(255, 255, 255, 0.1) !important;
          color: white !important;
        }

        :global(.cl-alertText) {
          color: #ffadad !important;
          font-weight: 700 !important;
        }

        .card-title {
          font-family: 'Cormorant Garamond', serif;
          font-size: 2rem;
          font-weight: 300;
          color: #fff;
          text-align: center;
          letter-spacing: 0.04em;
          margin-bottom: 4px;
        }

        .card-subtitle {
          font-size: 0.72rem;
          text-align: center;
          color: rgba(255, 255, 255, 0.35);
          letter-spacing: 0.18em;
          text-transform: uppercase;
          margin-bottom: 32px;
        }

        .gold-line {
          width: 48px;
          height: 1px;
          background: var(--gold);
          margin: 0 auto 28px;
          opacity: 0.5;
        }

        .back-link {
          position: fixed;
          top: 2rem;
          left: 2rem;
          z-index: 20;
          display: flex;
          align-items: center;
          gap: 8px;
          color: rgba(255, 255, 255, 0.4);
          font-size: 0.72rem;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          text-decoration: none;
          transition: color 0.2s;
        }

        .back-link:hover {
          color: rgba(255, 255, 255, 0.8);
        }

        .clerk-wrapper {
          display: flex;
          justify-content: center;
        }
      `}</style>

      <div id="particles-login" className="bg-ambient"></div>


      <Link href="/" className="back-link">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="14" height="14">
          <path d="M19 12H5M12 5l-7 7 7 7" />
        </svg>
        {t('login.back')}
      </Link>

      <div className="card">
        <div className="card-logo">
          <img src="/assets/logo.png" alt="GSA Hotels" />
        </div>
        <h1 className="card-title">{t('login.title')}</h1>
        <p className="card-subtitle">{t('login.subtitle')}</p>
        <div className="gold-line"></div>

        <div className="clerk-wrapper">
          <SignIn 
            routing="path"
            path="/login"
            fallbackRedirectUrl={redirectUrl}
            appearance={{

              variables: {
                colorPrimary: '#C5A059',
                colorBackground: '#0a0a0a',
                colorInputBackground: '#111111',
                colorText: '#ffffff',
                colorTextSecondary: '#ffffff',
                colorInputText: '#ffffff',
                borderRadius: '12px',
                fontFamily: 'Montserrat, sans-serif',
                colorDanger: '#ff4d4d',
                colorSuccess: '#C5A059',
              },
              elements: {
                card: 'background: transparent; box-shadow: none; border: none; width: 100%;',
                headerTitle: 'color: #ffffff !important; font-size: 1.5rem !important; font-weight: 700 !important; text-align: center; margin-bottom: 8px;',
                headerSubtitle: 'color: #ffffff !important; opacity: 0.8 !important; font-size: 1rem !important; text-align: center; margin-bottom: 32px;',
                socialButtonsBlockButton: 'display: none;',
                socialButtons: 'display: none;',
                dividerRow: 'display: none;',
                formButtonPrimary: 'background: linear-gradient(135deg, #C5A059 0%, #B38E46 100%) !important; color: #000 !important; font-weight: 800 !important; letter-spacing: 0.15em !important; height: 56px !important; text-transform: uppercase !important; border: none !important; box-shadow: 0 4px 20px rgba(197, 160, 89, 0.4) !important; margin-top: 15px !important; font-size: 0.95rem !important;',
                footerActionLink: 'display: none;', 
                footer: 'display: none;',
                formFieldInput: 'background: rgba(255,255,255,0.08) !important; border: 1px solid rgba(197,160,89,0.5) !important; color: #ffffff !important; height: 52px !important; font-size: 1.05rem !important; padding: 0 16px !important;',
                formFieldLabel: 'color: #ffffff !important; font-size: 0.9rem !important; font-weight: 700 !important; margin-bottom: 12px !important; display: block !important;',
                formFieldInputShowPasswordButton: 'color: #C5A059 !important; opacity: 1 !important;',
                formFieldInputShowPasswordIcon: 'filter: invert(1) brightness(2); width: 22px; height: 22px;',
                identityPreviewText: 'color: #ffffff !important; font-weight: 700 !important; font-size: 1.1rem !important;',
                identityPreviewEditButtonIcon: 'color: #C5A059 !important;',
                dividerLine: 'background: rgba(197,160,89,0.3) !important;',
                dividerText: 'color: #ffffff !important; opacity: 0.6 !important; font-size: 0.75rem !important; text-transform: uppercase !important;',
                otpCodeFieldInputs: 'gap: 12px !important; justify-content: center !important; margin: 20px 0 !important;',
                otpCodeFieldInput: 'background: rgba(255,255,255,0.1) !important; border: 2px solid #C5A059 !important; color: #ffffff !important; font-size: 1.8rem !important; height: 64px !important; width: 50px !important; border-radius: 12px !important; font-weight: 800 !important; text-align: center !important; line-height: 64px !important;',
                formResendCodeLink: 'color: #C5A059 !important; font-weight: 700 !important; text-decoration: none !important; margin-top: 20px !important; font-size: 0.95rem !important; display: block; text-align: center;',
                alert: 'background: rgba(255,77,77,0.15) !important; border: 1px solid #ff4d4d !important; border-radius: 12px !important; padding: 14px !important;',
                alertText: 'color: #ffadad !important; font-weight: 600 !important;',
              }
            }}


          />
        </div>
      </div>
    </div>
  );
}

