import { motion } from 'framer-motion';
import { useLanguage } from '@/i18n/LanguageContext';

const languages = [
  { code: 'id' as const, label: 'ID', flag: '🇮🇩' },
  { code: 'en' as const, label: 'EN', flag: '🇺🇸' },
];

export function LanguageSwitcher() {
  const { locale, setLocale } = useLanguage();

  return (
    <div className="flex items-center gap-1 p-1 rounded-full bg-muted/50 border border-border/50">
      {languages.map((language) => {
        const isActive = locale === language.code;
        return (
          <motion.button
            key={language.code}
            onClick={() => setLocale(language.code)}
            className={`relative flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm font-medium transition-colors ${
              isActive ? 'text-foreground' : 'text-muted-foreground hover:text-foreground'
            }`}
            whileTap={{ scale: 0.95 }}
          >
            {isActive && (
              <motion.div
                layoutId="language-pill"
                className="absolute inset-0 bg-background rounded-full shadow-sm"
                transition={{ type: 'spring', duration: 0.4, bounce: 0.15 }}
              />
            )}
            <span className="relative z-10 text-sm">{language.flag}</span>
            <span className="relative z-10">{language.label}</span>
          </motion.button>
        );
      })}
    </div>
  );
}
