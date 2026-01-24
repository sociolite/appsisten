import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';

export const CTA = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section className="section-padding bg-background relative overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, scale: 0.95 }}
          animate={isInView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.6 }}
          className="relative rounded-3xl overflow-hidden"
        >
          {/* Gradient Background */}
          <div className="absolute inset-0 bg-gradient-to-r from-primary via-[hsl(280_80%_55%)] to-[hsl(320_85%_60%)]" />
          
          {/* Pattern Overlay */}
          <div className="absolute inset-0 opacity-10">
            <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
              <defs>
                <pattern id="grid" width="10" height="10" patternUnits="userSpaceOnUse">
                  <path d="M 10 0 L 0 0 0 10" fill="none" stroke="white" strokeWidth="0.5"/>
                </pattern>
              </defs>
              <rect width="100" height="100" fill="url(#grid)" />
            </svg>
          </div>

          {/* Glow Effects */}
          <div className="absolute top-0 left-1/4 w-64 h-64 bg-white/20 rounded-full blur-3xl" />
          <div className="absolute bottom-0 right-1/4 w-64 h-64 bg-white/10 rounded-full blur-3xl" />

          {/* Content */}
          <div className="relative z-10 py-16 lg:py-24 px-8 lg:px-16 text-center">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-3xl sm:text-4xl lg:text-5xl font-heading font-bold text-primary-foreground mb-6"
            >
              Ready to transform your HR?
            </motion.h2>
            
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="text-lg text-primary-foreground/80 max-w-2xl mx-auto mb-8"
            >
              Join thousands of companies already using HRFlow to streamline their HR operations. Start your free trial today.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="flex flex-col sm:flex-row items-center justify-center gap-4"
            >
              <Button
                size="xl"
                className="bg-background text-foreground hover:bg-background/90 shadow-lg group w-full sm:w-auto"
              >
                Start Free Trial
                <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
              </Button>
              <Button
                size="xl"
                variant="ghost"
                className="text-primary-foreground border-2 border-primary-foreground/30 hover:bg-primary-foreground/10 w-full sm:w-auto"
              >
                Talk to Sales
              </Button>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
