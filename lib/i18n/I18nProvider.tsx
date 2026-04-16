'use client';

import { createContext, useContext, useState, useCallback, ReactNode } from 'react';
import { translations, Language } from './translations';

type TranslationKeys = typeof translations.en;

interface I18nContextType {
  lang: Language;
  t: TranslationKeys;
  toggleLang: () => void;
  setLang: (lang: Language) => void;
}

const I18nContext = createContext<I18nContextType | null>(null);

const COOKIE_NAME = 'corewin_lang';

export function I18nProvider({ children, initialLang }: { children: ReactNode; initialLang?: Language }) {
  const [lang, setLangState] = useState<Language>(initialLang ?? 'en');

  const setLang = useCallback((l: Language) => {
    setLangState(l);
    // Persist to cookie so server-side layout can read it
    document.cookie = `${COOKIE_NAME}=${l}; path=/; max-age=31536000; SameSite=Lax`;
  }, []);

  const toggleLang = useCallback(() => {
    setLang(lang === 'en' ? 'zh' : 'en');
  }, [lang, setLang]);

  // Cast to avoid TypeScript literal string incompatibility between en/zh
  const t = translations[lang] as TranslationKeys;

  return (
    <I18nContext.Provider value={{ lang, t, toggleLang, setLang }}>
      {children}
    </I18nContext.Provider>
  );
}

export function useI18n() {
  const ctx = useContext(I18nContext);
  if (!ctx) throw new Error('useI18n must be used within I18nProvider');
  return ctx;
}
