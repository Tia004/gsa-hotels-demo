"use client";

import React from 'react';
import Link from 'next/link';
import { useLang } from '@/context/LangContext';

const Footer: React.FC = () => {
  const { t } = useLang();

  return (
    <footer className="luxury-footer">
      <div className="container">
        <div className="footer-grid">
          {/* Category 1: GSA Hotels Socials */}
          <div className="footer-col social-col">
            <h4 className="footer-heading">GSA HOTELS</h4>
            <div className="social-links-grid">
              <a href="https://instagram.com/gsahotels" target="_blank" className="social-link-item" rel="noopener noreferrer">
                <i className="fab fa-instagram" /> <span>Instagram</span>
              </a>
              <a href="https://facebook.com/gsahotels" target="_blank" className="social-link-item" rel="noopener noreferrer">
                <i className="fab fa-facebook-f" /> <span>Facebook</span>
              </a>
              <a href="https://youtube.com/@gsahotels" target="_blank" className="social-link-item" rel="noopener noreferrer">
                <i className="fab fa-youtube" /> <span>YouTube</span>
              </a>
            </div>
          </div>

          {/* Category 2: Duchessa Isabella Socials */}
          <div className="footer-col social-col">
            <h4 className="footer-heading">DUCHESSA ISABELLA</h4>
            <div className="social-links-grid">
              <a href="https://facebook.com/duchessaisabellaferrara" target="_blank" className="social-link-item" rel="noopener noreferrer">
                <i className="fab fa-facebook-f" /> <span>Facebook</span>
              </a>
              <a href="https://instagram.com/duchessaisabella" target="_blank" className="social-link-item" rel="noopener noreferrer">
                <i className="fab fa-instagram" /> <span>Instagram</span>
              </a>
              <a href="https://www.tripadvisor.it/Hotel_Review-g187803-d232851-Reviews-Duchessa_Isabella_Hotel-Ferrara_Province_of_Ferrara_Emilia_Romagna.html" target="_blank" className="social-link-item" rel="noopener noreferrer">
                <svg viewBox="0 0 512 512" width="18" height="18" xmlns="http://www.w3.org/2000/svg" fill="currentColor" style={{ display: 'inline-block', verticalAlign: 'middle' }}>
                  <path d="M175.335 281.334c0 24.483-19.853 44.336-44.336 44.336-24.484 0-44.337-19.853-44.337-44.336 0-24.484 19.853-44.337 44.337-44.337 24.483 0 44.336 19.853 44.336 44.337zm205.554-44.337c-24.48 0-44.336 19.853-44.336 44.337 0 24.483 19.855 44.336 44.336 44.336 24.481 0 44.334-19.853 44.334-44.336-.006-24.47-19.839-44.31-44.309-44.323l-.025-.01v-.004zm125.002 44.337c0 68.997-55.985 124.933-124.999 124.933a124.466 124.466 0 01-84.883-33.252l-40.006 43.527-40.025-43.576a124.45 124.45 0 01-84.908 33.3c-68.968 0-124.933-55.937-124.933-124.932A124.586 124.586 0 0146.889 189L6 144.517h90.839c96.116-65.411 222.447-65.411 318.557 0H506l-40.878 44.484a124.574 124.574 0 0140.769 92.333zm-290.31 0c0-46.695-37.858-84.55-84.55-84.55-46.691 0-84.55 37.858-84.55 84.55 0 46.691 37.859 84.55 84.55 84.55 46.692 0 84.545-37.845 84.55-84.54v-.013.003zM349.818 155.1a244.01 244.01 0 00-187.666 0C215.532 175.533 256 223.254 256 278.893c0-55.634 40.463-103.362 93.826-123.786l-.005-.006h-.003zm115.64 126.224c0-46.694-37.858-84.55-84.55-84.55-46.691 0-84.552 37.859-84.552 84.55 0 46.692 37.855 84.55 84.553 84.55 46.697 0 84.55-37.858 84.55-84.55z" fill="currentColor" fillRule="nonzero"/>
                </svg> <span>TripAdvisor</span>
              </a>
            </div>
          </div>

          {/* Category 3: Quick Links */}
          <div className="footer-col">
            <h4 className="footer-heading">{t('footer.navigazione')}</h4>
            <ul className="footer-links">
              <li><Link href="/#intro">{t('menu.chiSiamo')}</Link></li>
              <li><Link href="/#services">{t('menu.academy')}</Link></li>
              <li><Link href="/#besafe">{t('menu.besafe')}</Link></li>
              <li><Link href="/#experiences">{t('menu.esperienze')}</Link></li>
              <li><Link href="/#founder">{t('menu.fondatore')}</Link></li>
              <li><Link href="/#partner">{t('menu.partner')}</Link></li>
              <li><Link href="/#b2b-section">{t('menu.lavora')}</Link></li>
              <li><Link href="/#philosophy">{t('menu.dna')}</Link></li>
              <li><Link href="/blog">{t('menu.blog')}</Link></li>
            </ul>
          </div>
        </div>

        <div className="footer-bottom-line">
          <div className="j-line" />
          <span className="footer-brand">GSA HOTELS</span>
          <div className="j-line" />
        </div>

        <div className="footer-legal" style={{ display: 'flex', justifyContent: 'flex-start', alignItems: 'center', flexWrap: 'wrap', gap: '30px', width: '100%', marginTop: '5px' }}>
          <div className="legal-left" style={{ display: 'flex', alignItems: 'center', gap: '15px', flexWrap: 'wrap' }}>
            <a href="#" className="cookie-link" id="open-privacy">{t('footer.legal.privacy')}</a>
            <a href="#" className="cookie-link" id="open-cookie-policy">{t('footer.legal.cookie')}</a>
            <a href="#" className="cookie-link" id="open-terms">{t('footer.legal.terms')}</a>
            <span style={{ opacity: 0.5 }}>|</span>
            <p style={{ margin: 0 }}>&copy; {new Date().getFullYear()} GSA Hotels. All Rights Reserved.</p>
          </div>
          <p className="footer-credits" style={{ margin: 10, textAlign: 'start' }}>
            Powered by: <a href="mailto:tiachinaglia@gmail.com" style={{ color: '#C5A059', textDecoration: 'none' }}>tiachinaglia@gmail.com</a>
          </p>
        </div>
      </div>

      <div className="footer-signature" style={{ color: 'transparent', WebkitTextStroke: '1px #C5A059' }}>
        GSA HOTELS
      </div>
    </footer>
  );
};

export default Footer;
