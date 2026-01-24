import { motion, useInView, useScroll, useTransform } from 'framer-motion';
import { useRef, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Check, ArrowRight } from 'lucide-react';

const plans = [
  {
    name: 'Starter',
    description: 'For small teams',
    price: '29',
    features: [
      'Up to 25 employees',
      'Core HR features',
      'Time & attendance',
      'Email support',
    ],
  },
  {
    name: 'Professional',
    description: 'For growing companies',
    price: '59',
    popular: true,
    features: [
      'Up to 200 employees',
      'Everything in Starter',
      'Advanced analytics',
      'Performance management',
      'Priority support',
    ],
  },
  {
    name: 'Enterprise',
    description: 'For large organizations',
    price: 'Custom',
    features: [
      'Unlimited employees',
      'Everything in Professional',
      'Custom integrations',
      'Dedicated manager',
      'SLA guarantee',
    ],
  },
];

export const Pricing = () => {
  const ref = useRef(null);
  const sectionRef = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const [hoveredPlan, setHoveredPlan] = useState<number | null>(1);
  
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });
  
  const bgY1 = useTransform(scrollYProgress, [0, 1], [0, 80]);
  const bgY2 = useTransform(scrollYProgress, [0, 1], [0, -60]);

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
          <span className="text-primary font-semibold text-sm uppercase tracking-wider">Pricing</span>
          <h2 className="mt-4 text-3xl sm:text-4xl lg:text-5xl font-heading font-bold text-foreground">
            Simple, Transparent Pricing
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            No hidden fees. Cancel anytime.
          </p>
        </motion.div>

        {/* Pricing Toggle */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.2 }}
          className="flex items-center justify-center gap-4 mb-12"
        >
          <span className="text-foreground font-medium">Monthly</span>
          <motion.button
            className="relative w-14 h-8 rounded-full bg-primary/20 p-1"
            whileTap={{ scale: 0.95 }}
          >
            <motion.div
              className="w-6 h-6 rounded-full bg-primary"
              layout
            />
          </motion.button>
          <span className="text-muted-foreground">
            Annually <span className="text-primary font-medium">-20%</span>
          </span>
        </motion.div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 max-w-5xl mx-auto">
          {plans.map((plan, index) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.1 + index * 0.1 }}
              onMouseEnter={() => setHoveredPlan(index)}
              onMouseLeave={() => setHoveredPlan(1)}
              className="relative"
            >
              <motion.div
                animate={{
                  scale: hoveredPlan === index ? 1.02 : 1,
                  y: hoveredPlan === index ? -8 : 0,
                }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
                className={`relative p-8 rounded-2xl h-full overflow-hidden ${
                  plan.popular
                    ? 'bg-primary text-white shadow-xl'
                    : 'bg-background/80 backdrop-blur-xl border border-border/50 shadow-lg'
                }`}
              >
                {/* Glassmorphism gradient overlay */}
                <div className={`absolute inset-0 pointer-events-none ${
                  plan.popular 
                    ? 'bg-gradient-to-br from-white/10 via-transparent to-white/5'
                    : 'bg-gradient-to-br from-primary/5 via-transparent to-primary/5'
                }`} />

                {/* Popular Badge */}
                {plan.popular && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-background text-primary text-sm font-semibold shadow-lg border border-border/50"
                  >
                    Most Popular
                  </motion.div>
                )}

                {/* Plan Header */}
                <div className="relative text-center mb-8">
                  <h3 className={`text-xl font-heading font-semibold mb-1 ${plan.popular ? 'text-white' : 'text-foreground'}`}>
                    {plan.name}
                  </h3>
                  <p className={`text-sm mb-6 ${plan.popular ? 'text-white/70' : 'text-muted-foreground'}`}>
                    {plan.description}
                  </p>
                  <div className="flex items-baseline justify-center gap-1">
                    {plan.price !== 'Custom' && (
                      <span className={`text-lg ${plan.popular ? 'text-white/70' : 'text-muted-foreground'}`}>$</span>
                    )}
                    <span className={`text-5xl font-heading font-bold ${plan.popular ? 'text-white' : 'text-foreground'}`}>
                      {plan.price}
                    </span>
                    {plan.price !== 'Custom' && (
                      <span className={`text-sm ${plan.popular ? 'text-white/70' : 'text-muted-foreground'}`}>/mo</span>
                    )}
                  </div>
                </div>

                {/* Divider */}
                <motion.div 
                  className={`my-6 h-px ${plan.popular ? 'bg-white/20' : 'bg-gradient-to-r from-transparent via-border to-transparent'}`}
                  initial={{ scaleX: 0 }}
                  animate={isInView ? { scaleX: 1 } : { scaleX: 0 }}
                  transition={{ delay: 0.4 + index * 0.1, duration: 0.6 }}
                />

                {/* Features */}
                <ul className="relative space-y-4 mb-8">
                  {plan.features.map((feature) => (
                    <motion.li 
                      key={feature} 
                      className="flex items-start gap-3"
                      whileHover={{ x: 4 }}
                      transition={{ duration: 0.2 }}
                    >
                      <div className={`w-5 h-5 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5 ${
                        plan.popular ? 'bg-white/20' : 'bg-primary/10'
                      }`}>
                        <Check className={`w-3 h-3 ${plan.popular ? 'text-white' : 'text-primary'}`} />
                      </div>
                      <span className={`text-sm ${plan.popular ? 'text-white/90' : 'text-muted-foreground'}`}>
                        {feature}
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
                    className={`w-full rounded-xl h-12 ${
                      plan.popular
                        ? 'bg-background text-primary hover:bg-background/90 shadow-md'
                        : 'bg-primary text-primary-foreground hover:bg-primary/90'
                    }`}
                  >
                    {plan.price === 'Custom' ? 'Contact Sales' : 'Get Started'}
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </motion.div>
              </motion.div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
