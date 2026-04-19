"use client";

import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { translations, type Lang } from '@/lib/i18n';

interface LangContextType {
  lang: Lang;
  setLang: (lang: Lang) => void;
  t: (key: string) => string;
}

const LangContext = createContext<LangContextType>({
  lang: 'it',
  setLang: () => {},
  t: (key: string) => key,
});

export function LangProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLangState] = useState<Lang>('it');

  useEffect(() => {
    const saved = localStorage.getItem('gsa_lang') as Lang | null;
    if (saved && (saved === 'it' || saved === 'en')) {
      setLangState(saved);
    }
  }, []);

  const setLang = useCallback((newLang: Lang) => {
    setLangState(newLang);
    localStorage.setItem('gsa_lang', newLang);
    document.documentElement.lang = newLang;
  }, []);

  const t = useCallback((key: string): string => {
    const dict = translations[lang];
    return (dict as Record<string, string>)[key] || key;
  }, [lang]);

  return (
    <LangContext.Provider value={{ lang, setLang, t }}>
      {children}
    </LangContext.Provider>
  );
}

export function useLang() {
  return useContext(LangContext);
}
