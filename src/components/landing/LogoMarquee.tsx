import { motion } from 'framer-motion';
import { useLanguage } from '@/i18n/LanguageContext';

const logos = [
  { name: 'TechCorp', abbr: 'TC' },
  { name: 'InnovateCo', abbr: 'IC' },
  { name: 'GlobalTech', abbr: 'GT' },
  { name: 'FutureLabs', abbr: 'FL' },
  { name: 'DataFlow', abbr: 'DF' },
  { name: 'CloudSync', abbr: 'CS' },
  { name: 'SmartBiz', abbr: 'SB' },
  { name: 'NextGen', abbr: 'NG' },
];

export const LogoMarquee = () => {
  const { t } = useLanguage();

  return (
    <section className="py-12 bg-background border-y border-border/30 overflow-hidden">
      <div className="container mx-auto px-4 mb-8">
        <p className="text-center text-sm text-muted-foreground font-medium">
          {t('logoMarquee.title')}
        </p>
      </div>
      
      <div className="relative">
        {/* Fade edges */}
        <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-background to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-background to-transparent z-10 pointer-events-none" />
        
        {/* Marquee container */}
        <div className="flex">
          <motion.div
            className="flex gap-12 items-center"
            animate={{ x: ['0%', '-50%'] }}
            transition={{
              x: {
                duration: 25,
                repeat: Infinity,
                ease: 'linear',
              },
            }}
          >
            {/* Double the logos for seamless loop */}
            {[...logos, ...logos].map((logo, index) => (
              <div
                key={index}
                className="flex items-center gap-3 px-6 py-3 rounded-xl bg-muted/30 border border-border/40 hover:border-primary/30 hover:bg-muted/50 transition-all duration-300 flex-shrink-0"
              >
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                  <span className="text-primary font-bold text-sm">{logo.abbr}</span>
                </div>
                <span className="text-foreground font-medium whitespace-nowrap">{logo.name}</span>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};