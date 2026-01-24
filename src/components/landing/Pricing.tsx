import { motion, useInView, useScroll, useTransform } from 'framer-motion';
import { useRef, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Check, ArrowRight, Sparkles } from 'lucide-react';
import { useLanguage } from '@/i18n/LanguageContext';

const tierKeys = ['free', 'starter', 'professional', 'enterprise'] as const;

export const Pricing = () => {
  const { t, tArray } = useLanguage();
  const ref = useRef(null);
  const sectionRef = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const [hoveredPlan, setHoveredPlan] = useState<number | null>(2);
  const [isYearly, setIsYearly] = useState(false);
  
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });
  
  const bgY1 = useTransform(scrollYProgress, [0, 1], [0, 80]);
  const bgY2 = useTransform(scrollYProgress, [0, 1], [0, -60]);

  const getDiscountedPrice = (price: string) => {
    if (price === '0') return '0';
    const numPrice = parseInt(price.replace(/[.,]/g, ''));
    const discounted = Math.round(numPrice * 0.8);
    return discounted.toLocaleString('id-ID');
  };

  return (
    <section ref={sectionRef} id="pricing" className="py-24 lg:py-32 bg-muted/30 relative overflow-hidden">
      {/* Parallax background elements */}
      <motion.div 
        style={{ y: bgY1 }}
        className="absolute top-20 left-[10%] w-64 h-64 bg-primary/[0.03] rounded-full blur-3xl pointer-events-none"
      />
      <motion.div 
        style={{ y: bgY2 }}
        className="absolute bottom-20 right-[10%] w-80 h-80 bg-primary/[0.02] rounded-full blur-3xl pointer-events-none"
      />
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center max-w-2xl mx-auto mb-16"
        >
          <span className="text-primary font-semibold text-sm uppercase tracking-wider">{t('nav.pricing')}</span>
          <h2 className="mt-4 text-3xl sm:text-4xl lg:text-5xl font-heading font-bold text-foreground">
            {t('pricing.sectionTitle')}
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            {t('pricing.sectionSubtitle')}
          </p>
        </motion.div>

        {/* Billing Toggle */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.2 }}
          className="flex items-center justify-center gap-4 mb-12"
        >
          <div className="inline-flex items-center gap-2 p-1 bg-muted rounded-full">
            <button
              onClick={() => setIsYearly(false)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition ${
                !isYearly ? 'bg-background shadow text-foreground' : 'text-muted-foreground'
              }`}
            >
              {t('pricing.monthly')}
            </button>
            <button
              onClick={() => setIsYearly(true)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition ${
                isYearly ? 'bg-background shadow text-foreground' : 'text-muted-foreground'
              }`}
            >
              {t('pricing.yearly')}
              <span className="ml-2 text-xs text-primary font-bold">
                {t('pricing.yearlyDiscount')}
              </span>
            </button>
          </div>
        </motion.div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
          {tierKeys.map((tier, index) => {
            const isPopular = tier === 'professional';
            const hasFullAI = tier === 'professional' || tier === 'enterprise';
            const features = tArray<string>(`pricing.tiers.${tier}.features`);
            const basePrice = t(`pricing.tiers.${tier}.price`);
            const displayPrice = isYearly ? getDiscountedPrice(basePrice) : basePrice;

            return (
              <motion.div
                key={tier}
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.1 + index * 0.1 }}
                onMouseEnter={() => setHoveredPlan(index)}
                onMouseLeave={() => setHoveredPlan(2)}
                className="relative"
              >
                <motion.div
                  animate={{
                    scale: hoveredPlan === index ? 1.02 : 1,
                    y: hoveredPlan === index ? -8 : 0,
                  }}
                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
                  className={`relative p-6 rounded-2xl h-full overflow-hidden ${
                    isPopular
                      ? 'bg-primary text-white shadow-xl'
                      : 'bg-background/80 backdrop-blur-xl border border-border/50 shadow-lg'
                  }`}
                >
                  {/* Glassmorphism gradient overlay */}
                  <div className={`absolute inset-0 pointer-events-none ${
                    isPopular 
                      ? 'bg-gradient-to-br from-white/10 via-transparent to-white/5'
                      : 'bg-gradient-to-br from-primary/5 via-transparent to-primary/5'
                  }`} />

                  {/* Popular Badge */}
                  {isPopular && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-background text-primary text-sm font-semibold shadow-lg border border-border/50"
                    >
                      {t('pricing.popular')}
                    </motion.div>
                  )}

                  {/* Full AI Badge */}
                  {hasFullAI && (
                    <div className={`absolute top-4 right-4 ${isPopular ? '' : ''}`}>
                      <span className={`inline-flex items-center gap-1 px-2 py-1 text-xs font-medium rounded-full ${
                        isPopular 
                          ? 'text-white/90 bg-white/20' 
                          : 'text-primary bg-primary/10'
                      }`}>
                        <Sparkles className="w-3 h-3" />
                        Full AI
                      </span>
                    </div>
                  )}

                  {/* Plan Header */}
                  <div className="relative text-center mb-6 pt-2">
                    <h3 className={`text-xl font-heading font-semibold mb-1 ${isPopular ? 'text-white' : 'text-foreground'}`}>
                      {t(`pricing.tiers.${tier}.name`)}
                    </h3>
                    <p className={`text-sm mb-4 ${isPopular ? 'text-white/70' : 'text-muted-foreground'}`}>
                      {t(`pricing.tiers.${tier}.description`)}
                    </p>
                    <div className="flex items-baseline justify-center gap-1">
                      <span className={`text-lg ${isPopular ? 'text-white/70' : 'text-muted-foreground'}`}>
                        {t('pricing.currency')}
                      </span>
                      <span className={`text-4xl font-heading font-bold ${isPopular ? 'text-white' : 'text-foreground'}`}>
                        {displayPrice}
                      </span>
                      {basePrice !== '0' && (
                        <span className={`text-sm ${isPopular ? 'text-white/70' : 'text-muted-foreground'}`}>
                          {t('pricing.perMonth')}
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Divider */}
                  <motion.div 
                    className={`my-4 h-px ${isPopular ? 'bg-white/20' : 'bg-gradient-to-r from-transparent via-border to-transparent'}`}
                    initial={{ scaleX: 0 }}
                    animate={isInView ? { scaleX: 1 } : { scaleX: 0 }}
                    transition={{ delay: 0.4 + index * 0.1, duration: 0.6 }}
                  />

                  {/* Features */}
                  <ul className="relative space-y-3 mb-6">
                    {features.map((feature, fIndex) => (
                      <motion.li 
                        key={fIndex} 
                        className="flex items-start gap-2"
                        whileHover={{ x: 4 }}
                        transition={{ duration: 0.2 }}
                      >
                        <div className={`w-5 h-5 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5 ${
                          isPopular ? 'bg-white/20' : 'bg-primary/10'
                        }`}>
                          <Check className={`w-3 h-3 ${isPopular ? 'text-white' : 'text-primary'}`} />
                        </div>
                        <span className={`text-sm ${isPopular ? 'text-white/90' : 'text-muted-foreground'}`}>
                          {feature}
                          {feature.toLowerCase().includes('ai') && (
                            <Sparkles className="inline w-3 h-3 ml-1 text-primary" />
                          )}
                        </span>
                      </motion.li>
                    ))}
                  </ul>

                  {/* CTA */}
                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="relative"
                  >
                    <Button
                      className={`w-full rounded-xl h-11 ${
                        isPopular
                          ? 'bg-background text-primary hover:bg-background/90 shadow-md'
                          : 'bg-primary text-primary-foreground hover:bg-primary/90'
                      }`}
                    >
                      {t(`pricing.tiers.${tier}.cta`)}
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </Button>
                  </motion.div>
                </motion.div>
              </motion.div>
            );
          })}
        </div>

        {/* Guarantee */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 0.8 }}
          className="text-center text-muted-foreground mt-8"
        >
          {t('pricing.guarantee')} • {t('pricing.noCard')}
        </motion.p>
      </div>
    </section>
  );
};
