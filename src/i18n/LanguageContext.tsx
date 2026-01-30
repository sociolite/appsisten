import React, { createContext, useContext, useState, useCallback, ReactNode } from 'react';
import en from './translations/en.json';
import id from './translations/id.json';

type Locale = 'en' | 'id';
type Translations = typeof en;

interface LanguageContextType {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  t: (key: string) => string;
  tArray: <T>(key: string) => T[];
  tObject: <T>(key: string) => T;
}

const translations: Record<Locale, Translations> = { en, id };

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

// Helper to get nested value from object by dot-notation key
function getNestedValue(obj: unknown, path: string): unknown {
  return path.split('.').reduce((acc: unknown, part: string) => {
    if (acc && typeof acc === 'object' && part in acc) {
      return (acc as Record<string, unknown>)[part];
    }
    return undefined;
  }, obj);
}

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [locale, setLocale] = useState<Locale>('en');

  const t = useCallback(
    (key: string): string => {
      const value = getNestedValue(translations[locale], key);
      if (typeof value === 'string') {
        return value;
      }
      console.warn(`Translation key "${key}" not found or not a string`);
      return key;
    },
    [locale]
  );

  const tArray = useCallback(
    <T,>(key: string): T[] => {
      const value = getNestedValue(translations[locale], key);
      if (Array.isArray(value)) {
        return value as T[];
      }
      console.warn(`Translation key "${key}" not found or not an array`);
      return [];
    },
    [locale]
  );

  const tObject = useCallback(
    <T,>(key: string): T => {
      const value = getNestedValue(translations[locale], key);
      if (value && typeof value === 'object') {
        return value as T;
      }
      console.warn(`Translation key "${key}" not found or not an object`);
      return {} as T;
    },
    [locale]
  );

  return (
    <LanguageContext.Provider value={{ locale, setLocale, t, tArray, tObject }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}
