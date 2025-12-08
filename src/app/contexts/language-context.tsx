'use client'
import { createContext, useState, useEffect, ReactNode } from 'react';
import en from '@/app/locales/en.json';
import ta from '@/app/locales/ta.json';

type Language = 'en' | 'ta';

interface LanguageContextType {
  language: Language;
  setLanguage: (language: Language | string) => void;
  translations: typeof en;
}

export const LanguageContext = createContext<LanguageContextType>({
  language: 'en',
  setLanguage: () => {},
  translations: en,
});

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const [language, setLanguageState] = useState<Language>('en');

  const setLanguage = (lang: Language | string) => {
    const newLang = lang as Language;
    setLanguageState(newLang);
    if (typeof window !== 'undefined') {
      localStorage.setItem('language', newLang);
    }
  };

  useEffect(() => {
    const savedLanguage = localStorage.getItem('language') as Language;
    if (savedLanguage && (savedLanguage === 'en' || savedLanguage === 'ta')) {
      setLanguageState(savedLanguage);
    }
  }, []);

  const translations = language === 'en' ? en : ta;

  return (
    <LanguageContext.Provider value={{ language, setLanguage, translations }}>
      {children}
    </LanguageContext.Provider>
  );
};
