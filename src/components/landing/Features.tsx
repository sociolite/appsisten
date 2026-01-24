import { motion, useInView } from 'framer-motion';
import { useRef, useState } from 'react';
import { 
  Users, 
  Calendar, 
  BarChart3, 
  Shield, 
  Zap, 
  Globe,
  FileText,
  Clock,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';

const features = [
  {
    icon: Users,
    title: 'Employee Management',
    description: 'Centralize all employee data, track performance, and manage your entire workforce from one intuitive dashboard.',
  },
  {
    icon: Calendar,
    title: 'Time & Attendance',
    description: 'Automated time tracking, PTO management, and smart scheduling that syncs with your teams calendar.',
  },
  {
    icon: BarChart3,
    title: 'Analytics & Insights',
    description: 'Real-time workforce analytics powered by AI to help you make data-driven HR decisions.',
  },
  {
    icon: Shield,
    title: 'Compliance & Security',
    description: 'Stay compliant with built-in regulatory features and enterprise-grade security.',
  },
  {
    icon: Zap,
    title: 'Workflow Automation',
    description: 'Automate repetitive HR tasks with smart workflows that save hours every week.',
  },
  {
    icon: Globe,
    title: 'Global Payroll',
    description: 'Pay your team anywhere in the world with multi-currency support and local compliance.',
  },
  {
    icon: FileText,
    title: 'Document Management',
    description: 'Secure digital storage for all HR documents with e-signature and version control.',
  },
  {
    icon: Clock,
    title: 'Onboarding',
    description: 'Create memorable onboarding experiences with automated task assignments and progress tracking.',
  },
];

export const Features = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const [activeIndex, setActiveIndex] = useState(0);

  const nextSlide = () => {
    setActiveIndex((prev) => (prev + 1) % features.length);
  };

  const prevSlide = () => {
    setActiveIndex((prev) => (prev - 1 + features.length) % features.length);
  };

  return (
    <section id="features" className="py-24 lg:py-32 bg-white relative overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <motion.span 
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ delay: 0.2 }}
            className="text-primary font-semibold text-sm uppercase tracking-wider"
          >
            Platform Capabilities
          </motion.span>
          <h2 className="mt-4 text-3xl sm:text-4xl lg:text-5xl font-heading font-bold text-foreground">
            Built for Enterprise Scale
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Comprehensive HR tools designed to handle millions of employees across global organizations.
          </p>
        </motion.div>

        {/* Desktop: Horizontal Scroll Cards */}
        <div className="hidden lg:block relative">
          <div className="flex gap-6 overflow-x-auto pb-4 snap-x snap-mandatory scrollbar-hide">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, x: 50 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ y: -8, scale: 1.02 }}
                className="flex-shrink-0 w-80 p-8 rounded-2xl bg-white border-2 border-border/50 hover:border-primary/30 transition-all duration-300 snap-start cursor-pointer group"
              >
                <motion.div 
                  className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center mb-6 group-hover:bg-primary/20 transition-colors"
                  whileHover={{ rotate: 5, scale: 1.1 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <feature.icon className="w-7 h-7 text-primary" />
                </motion.div>
                <h3 className="text-xl font-heading font-semibold text-foreground mb-3">
                  {feature.title}
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </div>
          
          {/* Scroll Hint */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ delay: 0.8 }}
            className="flex items-center justify-center gap-2 mt-6 text-sm text-muted-foreground"
          >
            <motion.span
              animate={{ x: [0, 8, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            >
              ←
            </motion.span>
            <span>Scroll to explore</span>
            <motion.span
              animate={{ x: [0, 8, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            >
              →
            </motion.span>
          </motion.div>
        </div>

        {/* Mobile: Swipeable Carousel */}
        <div className="lg:hidden relative">
          <div className="overflow-hidden">
            <motion.div
              animate={{ x: `-${activeIndex * 100}%` }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              className="flex"
            >
              {features.map((feature, index) => (
                <motion.div
                  key={feature.title}
                  className="flex-shrink-0 w-full px-4"
                >
                  <div className="p-8 rounded-2xl bg-white border-2 border-border/50">
                    <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center mb-6">
                      <feature.icon className="w-7 h-7 text-primary" />
                    </div>
                    <h3 className="text-xl font-heading font-semibold text-foreground mb-3">
                      {feature.title}
                    </h3>
                    <p className="text-muted-foreground leading-relaxed">
                      {feature.description}
                    </p>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>

          {/* Navigation */}
          <div className="flex items-center justify-center gap-4 mt-8">
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={prevSlide}
              className="w-12 h-12 rounded-full border-2 border-border flex items-center justify-center hover:border-primary/30 transition-colors"
            >
              <ChevronLeft className="w-5 h-5 text-foreground" />
            </motion.button>
            
            <div className="flex gap-2">
              {features.map((_, index) => (
                <motion.button
                  key={index}
                  onClick={() => setActiveIndex(index)}
                  className={`w-2 h-2 rounded-full transition-all duration-300 ${
                    index === activeIndex ? 'bg-primary w-6' : 'bg-border'
                  }`}
                  whileHover={{ scale: 1.2 }}
                />
              ))}
            </div>

            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={nextSlide}
              className="w-12 h-12 rounded-full border-2 border-border flex items-center justify-center hover:border-primary/30 transition-colors"
            >
              <ChevronRight className="w-5 h-5 text-foreground" />
            </motion.button>
          </div>
        </div>
      </div>
    </section>
  );
};
