import { motion } from 'framer-motion';
import { useLanguage } from '@/i18n/LanguageContext';

const logos = [
  {
    name: 'Kharismaworld',
    logo: 'https://kharismaworld.co.id/Logo.png'
  },
  {
    name: 'Dus Kemasan Cantik',
    logo: '/logo/dus-kemasan-cantik.png'
  },
  {
    name: 'SPPG',
    logo: 'https://www.bgn.go.id/BGN_LOGO.png'
  },
  {
    name: 'Dido Link',
    logo: '/logo/dido-link.png'
  },
  {
    name: 'Merdeka Fotocopy',
    logo: '/logo/merdeka-fc.png'
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
                className="flex items-center opacity-60 hover:opacity-100 transition-opacity duration-300 flex-shrink-0 cursor-default"
              >
                <img
                  src={logo.logo}
                  alt={logo.name}
                  className="h-12 w-auto object-contain"
                />
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};