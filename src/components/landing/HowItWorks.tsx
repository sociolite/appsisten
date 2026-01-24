import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { UserPlus, Settings, Rocket } from 'lucide-react';

const steps = [
  {
    number: '01',
    icon: UserPlus,
    title: 'Sign up in minutes',
    description: 'Create your account and invite your team. No complex setup required.',
  },
  {
    number: '02',
    icon: Settings,
    title: 'Configure your workspace',
    description: 'Customize workflows, set up departments, and import your existing data.',
  },
  {
    number: '03',
    icon: Rocket,
    title: 'Go live & scale',
    description: 'Start managing your HR operations immediately. Add features as you grow.',
  },
];

export const HowItWorks = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section id="how-it-works" className="py-24 lg:py-32 bg-muted/30 relative overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto mb-16 lg:mb-20"
        >
          <span className="text-primary font-semibold text-sm uppercase tracking-wider">How It Works</span>
          <h2 className="mt-4 text-3xl sm:text-4xl lg:text-5xl font-heading font-bold text-foreground">
            Get started in three simple steps
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            From sign-up to full HR automation in less than 24 hours.
          </p>
        </motion.div>

        {/* Steps */}
        <div className="relative max-w-4xl mx-auto">
          {/* Connection Line */}
          <div className="hidden lg:block absolute top-24 left-[16.5%] right-[16.5%] h-0.5 bg-border" />

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12">
            {steps.map((step, index) => (
              <motion.div
                key={step.number}
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: index * 0.2 }}
                className="relative text-center"
              >
                {/* Step Circle */}
                <motion.div 
                  className="relative inline-block mb-6"
                  whileHover={{ scale: 1.05 }}
                >
                  <motion.div 
                    className="w-20 h-20 rounded-2xl bg-primary flex items-center justify-center shadow-lg"
                    whileHover={{ rotate: 5 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <step.icon className="w-8 h-8 text-white" />
                  </motion.div>
                  <motion.span 
                    className="absolute -top-2 -right-2 w-8 h-8 rounded-full bg-white border-2 border-primary text-primary text-sm font-bold flex items-center justify-center shadow-sm"
                    initial={{ scale: 0 }}
                    animate={isInView ? { scale: 1 } : {}}
                    transition={{ delay: 0.4 + index * 0.2, type: "spring" }}
                  >
                    {step.number}
                  </motion.span>
                </motion.div>

                {/* Content */}
                <h3 className="text-xl font-heading font-semibold text-foreground mb-3">
                  {step.title}
                </h3>
                <p className="text-muted-foreground leading-relaxed max-w-sm mx-auto">
                  {step.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
