import { useEffect, useState } from 'react';
import type { Language } from '../types';

const STORAGE_KEY = 'unfinished-archive-language';

const readInitialLanguage = (): Language => {
  if (typeof window === 'undefined') {
    return 'en';
  }

  try {
    return window.localStorage.getItem(STORAGE_KEY) === 'zh' ? 'zh' : 'en';
  } catch {
    return 'en';
  }
};

export const useLanguage = () => {
  const [language, setLanguage] = useState<Language>(readInitialLanguage);

  useEffect(() => {
    try {
      window.localStorage.setItem(STORAGE_KEY, language);
    } catch {
      // Keep the hook usable when browser storage is unavailable.
    }

    document.documentElement.lang = language === 'zh' ? 'zh-CN' : 'en';
  }, [language]);

  const toggleLanguage = () => {
    setLanguage((currentLanguage) => (currentLanguage === 'en' ? 'zh' : 'en'));
  };

  return { language, toggleLanguage };
};
