"use client";

import React, { useEffect } from 'react';
import { useLang } from '@/context/LangContext';

const LegalModals: React.FC = () => {
  const { t } = useLang();

  useEffect(() => {
    // 1. MODAL LOGIC (Event Delegation)
    const handleGlobalClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const link = target.closest('a');
      
      if (link) {
        const text = link.innerText.toLowerCase();
        const isPrivacy = text.includes('privacy policy') || link.id === 'open-privacy' || (link.getAttribute('href') === '#' && text.includes(t('footer.legal.privacy').toLowerCase()));
        const isCookie = text.includes('cookie policy') || link.id === 'open-cookie-policy' || (link.getAttribute('href') === '#' && text.includes(t('footer.legal.cookie').toLowerCase()));
        const isTerms = text.includes('termini') || text.includes('terms') || link.id === 'open-terms' || (link.getAttribute('href') === '#' && text.includes(t('footer.legal.terms').toLowerCase()));

        if (isPrivacy) {
          e.preventDefault();
          document.getElementById('privacy-modal')?.classList.add('active');
          document.body.style.overflow = 'hidden';
        } else if (isCookie) {
          e.preventDefault();
          document.getElementById('cookie-policy-modal')?.classList.add('active');
          document.body.style.overflow = 'hidden';
        } else if (isTerms) {
          e.preventDefault();
          document.getElementById('terms-modal')?.classList.add('active');
          document.body.style.overflow = 'hidden';
        }
      }

      // Close buttons
      if (target.closest('.legal-close-btn') || target.closest('.legal-modal-backdrop')) {
        const modal = target.closest('.legal-modal');
        if (modal) {
          modal.classList.remove('active');
          document.body.style.overflow = '';
        }
      }
    };

    document.addEventListener('click', handleGlobalClick);

    // 2. COOKIE BANNER LOGIC
    const banner = document.getElementById('cookie-banner');
    const acceptBtn = document.getElementById('cookie-accept');
    const declineBtn = document.getElementById('cookie-decline');

    const alreadyAccepted = localStorage.getItem('gsa_cookies_accepted');
    if (!alreadyAccepted && banner) {
      setTimeout(() => banner.classList.add('active'), 2000);
    }

    if (acceptBtn && banner) {
      acceptBtn.onclick = () => {
        localStorage.setItem('gsa_cookies_accepted', 'true');
        banner.classList.remove('active');
      };
    }
    if (declineBtn && banner) {
      declineBtn.onclick = () => {
        localStorage.setItem('gsa_cookies_accepted', 'false');
        banner.classList.remove('active');
      };
    }

    return () => document.removeEventListener('click', handleGlobalClick);
  }, [t]);

  return (
    <>
      {/* COOKIE BANNER (Privacy Concierge) */}
      <div id="cookie-banner" className="cookie-banner">
        <div className="cookie-content">
          <h4 className="cookie-title">Privacy Concierge</h4>
          <p className="cookie-text">
            {t('cookie.text')} <a href="#" id="open-cookie-policy" className="cookie-link">{t('footer.legal.cookie')}</a>.
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
    </>
  );
};

export default LegalModals;
