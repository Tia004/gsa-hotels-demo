"use client";

import React from 'react';
import { SignIn } from '@clerk/nextjs';
import Link from 'next/link';

export default function LoginPage() {
  return (
    <div className="login-page-container">
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
          margin: 0 auto 24px;
          background: #fff;
          padding: 12px 24px;
          border-radius: 12px;
          width: fit-content;
          box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
        }

        .card-logo img {
          height: 42px;
          width: auto;
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

      <div className="bg-ambient"></div>

      <Link href="/" className="back-link">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="14" height="14">
          <path d="M19 12H5M12 5l-7 7 7 7" />
        </svg>
        Torna al sito
      </Link>

      <div className="card">
        <div className="card-logo">
          <img src="/assets/logo.png" alt="GSA Hotels" />
        </div>
        <h1 className="card-title">Bentornato</h1>
        <p className="card-subtitle">Accedi al portale GSA Hotels</p>
        <div className="gold-line"></div>

        <div className="clerk-wrapper">
          <SignIn 
            routing="path"
            path="/login"
            fallbackRedirectUrl="/dashboard"
            appearance={{
              variables: {
                colorPrimary: '#C5A059',
                colorBackground: '#0a0a0a',
                colorInputBackground: '#111111',
                colorText: '#ffffff',
                colorTextSecondary: 'rgba(255,255,255,0.5)',
                colorInputText: '#ffffff',
                borderRadius: '10px',
                fontFamily: 'Montserrat, sans-serif',
              },
              elements: {
                card: 'background: transparent; box-shadow: none; border: none; width: 100%;',
                headerTitle: 'display: none;',
                headerSubtitle: 'display: none;',
                socialButtonsBlockButton: 'display: none;',
                socialButtons: 'display: none;',
                dividerRow: 'display: none;',
                socialButtonsBlockButtonText: 'font-weight: 500;',
                socialButtonsBlockButtonIcon: 'filter: drop-shadow(0 0 1px rgba(255,255,255,0.5));',
                formButtonPrimary: 'background: #C5A059; color: #000; font-weight: 700; letter-spacing: 0.08em; height: 48px;',
                footerActionLink: 'display: none;', 
                footer: 'display: none;',
                formFieldInput: 'background: rgba(255,255,255,0.05); border: 1px solid rgba(197,160,89,0.2); color: white;',
                formFieldLabel: 'color: rgba(255,255,255,0.6); font-size: 0.75rem; text-transform: uppercase; letter-spacing: 0.05em;',
                formFieldInputShowPasswordButton: 'color: #C5A059; opacity: 1;',
                formFieldInputShowPasswordIcon: 'filter: invert(1) brightness(2); width: 20px; height: 20px;',
                identityPreviewText: 'color: white;',
                identityPreviewEditButtonIcon: 'color: #C5A059;',
                dividerLine: 'background: rgba(197,160,89,0.2);',
                dividerText: 'color: rgba(255,255,255,0.4); font-size: 0.65rem; text-transform: uppercase;',
              }
            }}
          />
        </div>
      </div>
    </div>
  );
}
