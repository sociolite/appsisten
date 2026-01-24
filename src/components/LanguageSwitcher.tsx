import { motion } from 'framer-motion';
import { Globe } from 'lucide-react';
import { useLanguage } from '@/i18n/LanguageContext';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';

const languages = [
  { code: 'id' as const, label: 'Bahasa Indonesia', flag: '🇮🇩' },
  { code: 'en' as const, label: 'English', flag: '🇺🇸' },
];

export function LanguageSwitcher() {
  const { locale, setLocale } = useLanguage();

  const currentLanguage = languages.find((l) => l.code === locale);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button 
          variant="ghost" 
          size="sm" 
          className="gap-2 h-9 px-3 rounded-full border border-border/50 bg-background/50 backdrop-blur-sm hover:bg-background/80"
        >
          <Globe className="h-4 w-4 text-muted-foreground" />
          <span className="text-base">{currentLanguage?.flag}</span>
          <span className="hidden md:inline text-sm font-medium">
            {currentLanguage?.code.toUpperCase()}
          </span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent 
        align="end" 
        className="bg-background/95 backdrop-blur-xl border-border/50"
      >
        {languages.map((language) => (
          <DropdownMenuItem
            key={language.code}
            onClick={() => setLocale(language.code)}
            className={`gap-2 cursor-pointer ${locale === language.code ? 'bg-primary/10 text-primary' : ''}`}
          >
            <motion.span 
              className="text-base"
              whileHover={{ scale: 1.2 }}
            >
              {language.flag}
            </motion.span>
            <span>{language.label}</span>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
