import { motion } from 'framer-motion';
import { useLanguage } from '@/i18n/LanguageContext';

const logos = [
  { 
    name: 'Tokopedia', 
    style: 'font-bold text-lg tracking-tight',
    icon: (
      <svg viewBox="0 0 24 24" className="w-6 h-6 text-primary" fill="currentColor">
        <circle cx="12" cy="12" r="10" fillOpacity="0.2"/>
        <circle cx="12" cy="12" r="4"/>
      </svg>
    )
  },
  { 
    name: 'Gojek', 
    style: 'font-bold text-lg',
    icon: (
      <svg viewBox="0 0 24 24" className="w-6 h-6 text-primary" fill="currentColor">
        <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/>
      </svg>
    )
  },
  { 
    name: 'Bukalapak', 
    style: 'font-semibold text-lg',
    icon: (
      <svg viewBox="0 0 24 24" className="w-6 h-6 text-primary" fill="currentColor">
        <rect x="3" y="3" width="18" height="18" rx="3" fillOpacity="0.2"/>
        <rect x="7" y="7" width="10" height="10" rx="2"/>
      </svg>
    )
  },
  { 
    name: 'Traveloka', 
    style: 'font-semibold text-lg tracking-wide',
    icon: (
      <svg viewBox="0 0 24 24" className="w-6 h-6 text-primary" fill="currentColor">
        <polygon points="12,2 22,20 2,20" fillOpacity="0.2"/>
        <polygon points="12,8 17,17 7,17"/>
      </svg>
    )
  },
  { 
    name: 'Shopee', 
    style: 'font-bold text-lg',
    icon: (
      <svg viewBox="0 0 24 24" className="w-6 h-6 text-primary" fill="currentColor">
        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2z" fillOpacity="0.2"/>
        <path d="M12 6c-3.31 0-6 2.69-6 6s2.69 6 6 6 6-2.69 6-6-2.69-6-6-6zm0 9c-1.66 0-3-1.34-3-3s1.34-3 3-3 3 1.34 3 3-1.34 3-3 3z"/>
      </svg>
    )
  },
  { 
    name: 'BliBli', 
    style: 'font-bold text-lg tracking-tight',
    icon: (
      <svg viewBox="0 0 24 24" className="w-6 h-6 text-primary" fill="currentColor">
        <rect x="2" y="6" width="20" height="12" rx="2" fillOpacity="0.2"/>
        <rect x="6" y="9" width="5" height="6" rx="1"/>
        <rect x="13" y="9" width="5" height="6" rx="1"/>
      </svg>
    )
  },
  { 
    name: 'Telkom', 
    style: 'font-semibold text-lg',
    icon: (
      <svg viewBox="0 0 24 24" className="w-6 h-6 text-primary" fill="currentColor">
        <circle cx="12" cy="12" r="10" fillOpacity="0.2"/>
        <path d="M12 6v12M6 12h12"/>
      </svg>
    )
  },
  { 
    name: 'BCA', 
    style: 'font-bold text-xl tracking-widest',
    icon: (
      <svg viewBox="0 0 24 24" className="w-6 h-6 text-primary" fill="currentColor">
        <rect x="2" y="4" width="20" height="16" rx="2" fillOpacity="0.2"/>
        <rect x="5" y="8" width="14" height="2"/>
        <rect x="5" y="12" width="10" height="2"/>
      </svg>
    )
  },
];

export const LogoMarquee = () => {
  const { t } = useLanguage();

  return (
    <section className="py-16 bg-muted/20 overflow-hidden">
      <div className="container mx-auto px-4 mb-10">
        <p className="text-center text-sm text-muted-foreground font-medium uppercase tracking-wider">
          {t('logoMarquee.title')}
        </p>
      </div>
      
      <div className="relative">
        {/* Fade edges */}
        <div className="absolute left-0 top-0 bottom-0 w-40 bg-gradient-to-r from-muted/20 via-muted/20 to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-40 bg-gradient-to-l from-muted/20 via-muted/20 to-transparent z-10 pointer-events-none" />
        
        {/* Marquee container */}
        <div className="flex">
          <motion.div
            className="flex gap-16 items-center"
            animate={{ x: ['0%', '-50%'] }}
            transition={{
              x: {
                duration: 30,
                repeat: Infinity,
                ease: 'linear',
              },
            }}
          >
            {/* Double the logos for seamless loop */}
            {[...logos, ...logos].map((logo, index) => (
              <div
                key={index}
                className="flex items-center gap-3 opacity-60 hover:opacity-100 transition-opacity duration-300 flex-shrink-0 group cursor-default"
              >
                <div className="w-10 h-10 rounded-xl bg-background border border-border/50 flex items-center justify-center group-hover:border-primary/30 group-hover:shadow-sm transition-all duration-300">
                  {logo.icon}
                </div>
                <span className={`text-foreground/80 group-hover:text-foreground whitespace-nowrap transition-colors duration-300 ${logo.style}`}>
                  {logo.name}
                </span>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};