import { motion, useInView } from 'framer-motion';
import { useRef, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Check, Sparkles } from 'lucide-react';
import { useLanguage } from '@/i18n/LanguageContext';

const tierKeys = ['free', 'starter', 'professional', 'enterprise'] as const;

export const Pricing = () => {
  const { t, tArray } = useLanguage();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const [isYearly, setIsYearly] = useState(false);

  const getDiscountedPrice = (price: string) => {
    if (price === '0') return '0';
    const numPrice = parseInt(price.replace(/[.,]/g, ''));
    const discounted = Math.round(numPrice * 0.8);
    return discounted.toLocaleString('id-ID');
  };

  return (
    <section id="pricing" className="py-24 lg:py-32 bg-background relative overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center max-w-2xl mx-auto mb-12"
        >
          <span className="inline-block px-3 py-1 rounded-full bg-primary/10 text-primary font-medium text-sm mb-4">
            {t('nav.pricing')}
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-heading font-bold text-foreground">
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
          className="flex items-center justify-center mb-12"
        >
          <div className="inline-flex items-center p-1.5 bg-muted/50 rounded-full border border-border/50">
            <button
              onClick={() => setIsYearly(false)}
              className={`px-5 py-2.5 rounded-full text-sm font-medium transition-all duration-200 ${
                !isYearly 
                  ? 'bg-background shadow-sm text-foreground' 
                  : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              {t('pricing.monthly')}
            </button>
            <button
              onClick={() => setIsYearly(true)}
              className={`px-5 py-2.5 rounded-full text-sm font-medium transition-all duration-200 flex items-center gap-2 ${
                isYearly 
                  ? 'bg-background shadow-sm text-foreground' 
                  : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              {t('pricing.yearly')}
              <span className="px-2 py-0.5 rounded-full bg-primary/10 text-primary text-xs font-bold">
                {t('pricing.yearlyDiscount')}
              </span>
            </button>
          </div>
        </motion.div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 max-w-6xl mx-auto">
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
                transition={{ duration: 0.5, delay: 0.1 + index * 0.08 }}
                className={`relative rounded-2xl ${isPopular ? 'lg:-mt-4 lg:mb-4' : ''}`}
              >
                <div
                  className={`relative h-full rounded-2xl transition-all duration-300 ${
                    isPopular
                      ? 'bg-primary shadow-2xl shadow-primary/20'
                      : 'bg-background border border-border/60 hover:border-primary/30 hover:shadow-lg'
                  }`}
                >
                  {/* Popular Badge */}
                  {isPopular && (
                    <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 z-10">
                      <span className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-background text-primary text-sm font-semibold shadow-md border border-primary/20">
                        <Sparkles className="w-3.5 h-3.5" />
                        {t('pricing.popular')}
                      </span>
                    </div>
                  )}

                  <div className="p-6 pt-8">
                    {/* Plan Header */}
                    <div className="mb-6">
                      <div className="flex items-center justify-between mb-2">
                        <h3 className={`text-lg font-heading font-semibold ${isPopular ? 'text-white' : 'text-foreground'}`}>
                          {t(`pricing.tiers.${tier}.name`)}
                        </h3>
                        {hasFullAI && (
                          <span className={`inline-flex items-center gap-1 px-2 py-0.5 text-xs font-medium rounded-full ${
                            isPopular 
                              ? 'text-white/90 bg-white/15' 
                              : 'text-primary bg-primary/10'
                          }`}>
                            <Sparkles className="w-3 h-3" />
                            AI
                          </span>
                        )}
                      </div>
                      <p className={`text-sm leading-relaxed ${isPopular ? 'text-white/70' : 'text-muted-foreground'}`}>
                        {t(`pricing.tiers.${tier}.description`)}
                      </p>
                    </div>

                    {/* Price */}
                    <div className="mb-6">
                      <div className="flex items-baseline gap-1">
                        <span className={`text-sm font-medium ${isPopular ? 'text-white/60' : 'text-muted-foreground'}`}>
                          {t('pricing.currency')}
                        </span>
                        <span className={`text-4xl font-heading font-bold tracking-tight ${isPopular ? 'text-white' : 'text-foreground'}`}>
                          {displayPrice}
                        </span>
                        {basePrice !== '0' && (
                          <span className={`text-sm ${isPopular ? 'text-white/60' : 'text-muted-foreground'}`}>
                            {t('pricing.perMonth')}
                          </span>
                        )}
                      </div>
                    </div>

                    {/* CTA */}
                    <Button
                      className={`w-full rounded-xl h-11 font-medium transition-all duration-200 ${
                        isPopular
                          ? 'bg-white text-primary hover:bg-white/90 shadow-sm'
                          : 'bg-primary text-white hover:bg-primary/90'
                      }`}
                    >
                      {t(`pricing.tiers.${tier}.cta`)}
                    </Button>

                    {/* Divider */}
                    <div className={`my-6 h-px ${isPopular ? 'bg-white/15' : 'bg-border'}`} />

                    {/* Features */}
                    <ul className="space-y-3">
                      {features.map((feature, fIndex) => (
                        <li 
                          key={fIndex} 
                          className="flex items-start gap-3"
                        >
                          <div className={`w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 ${
                            isPopular ? 'bg-white/15' : 'bg-primary/10'
                          }`}>
                            <Check className={`w-3 h-3 ${isPopular ? 'text-white' : 'text-primary'}`} />
                          </div>
                          <span className={`text-sm leading-relaxed ${isPopular ? 'text-white/85' : 'text-muted-foreground'}`}>
                            {feature}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Guarantee */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 0.6 }}
          className="text-center text-sm text-muted-foreground mt-10"
        >
          {t('pricing.guarantee')} • {t('pricing.noCard')}
        </motion.p>
      </div>
    </section>
  );
};