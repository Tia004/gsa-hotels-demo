"use client";

import React, { useState, useRef, useEffect } from 'react';
import { useLang } from '@/context/LangContext';
import type { Lang } from '@/lib/i18n';

const flags: { [K in Lang]: string } = {
  it: '🇮🇹',
  en: '🇬🇧',
};

const LangSwitcher: React.FC = () => {
  const { lang, setLang } = useLang();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const other: Lang = lang === 'it' ? 'en' : 'it';

  return (
    <div className="lang-switcher" ref={ref}>
      <button
        className="lang-switcher-trigger"
        onClick={() => setOpen(!open)}
        aria-label="Switch language"
      >
        <span className="lang-flag">{flags[lang as keyof typeof flags]}</span>
        <span className="lang-code">{lang.toUpperCase()}</span>
        <svg className={`lang-chevron ${open ? 'open' : ''}`} viewBox="0 0 10 6" width="10" height="6" fill="none" stroke="currentColor" strokeWidth="1.5">
          <path d="M1 1l4 4 4-4" />
        </svg>
      </button>
      {open && (
        <div className="lang-dropdown">
          <button
            className="lang-option"
            onClick={() => { setLang(other); setOpen(false); }}
          >
            <span className="lang-flag">{flags[other as keyof typeof flags]}</span>
            <span className="lang-code">{other.toUpperCase()}</span>
          </button>
        </div>
      )}
    </div>
  );
};

export default LangSwitcher;
