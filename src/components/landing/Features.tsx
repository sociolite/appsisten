import { motion, useInView } from 'framer-motion';
import { useRef, useState } from 'react';
import { ChevronLeft, ChevronRight, Sparkles } from 'lucide-react';
import {
  AnimatedRecruiterIcon,
  AnimatedAssistantIcon,
  AnimatedDocumentIcon,
  AnimatedWorkflowIcon,
} from '@/components/ui/animated-ai-icons';

const features = [
  {
    icon: AnimatedRecruiterIcon,
    title: 'AI Recruiter',
    description: 'Intelligent candidate sourcing and screening. Our AI analyzes resumes, matches skills, and ranks applicants to find your perfect hire.',
    highlight: 'Smart Hiring',
  },
  {
    icon: AnimatedAssistantIcon,
    title: 'AI Personal Assistant',
    description: 'Your 24/7 intelligent assistant handles scheduling, reminders, and employee queries with natural language understanding.',
    highlight: 'Always On',
  },
  {
    icon: AnimatedDocumentIcon,
    title: 'AI Document Processor',
    description: 'Automatically extract, classify, and process documents. From contracts to invoices, let AI handle the paperwork.',
    highlight: 'Zero Manual Work',
  },
  {
    icon: AnimatedWorkflowIcon,
    title: 'Distributed Workflows',
    description: 'Orchestrate complex multi-step processes across teams and systems with intelligent task routing and automation.',
    highlight: 'Coming Soon',
    comingSoon: true,
  },
];

export const Features = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const [activeIndex, setActiveIndex] = useState(0);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const nextSlide = () => {
    setActiveIndex((prev) => (prev + 1) % features.length);
  };

  const prevSlide = () => {
    setActiveIndex((prev) => (prev - 1 + features.length) % features.length);
  };

  return (
    <section id="features" className="py-24 lg:py-32 bg-background relative overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ delay: 0.2 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-6"
          >
            <Sparkles className="w-4 h-4 text-primary" />
            <span className="text-primary font-semibold text-sm">AI-Powered Features</span>
          </motion.div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-heading font-bold text-foreground">
            Intelligence at Every Step
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Harness the power of AI to automate, optimize, and transform your enterprise operations.
          </p>
        </motion.div>

        {/* Desktop: Feature Cards Grid */}
        <div className="hidden lg:grid grid-cols-2 xl:grid-cols-4 gap-6 max-w-6xl mx-auto">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
              className="relative group"
            >
              <motion.div
                animate={{
                  scale: hoveredIndex === index ? 1.02 : 1,
                  y: hoveredIndex === index ? -8 : 0,
                }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
                className={`relative h-full p-8 rounded-2xl bg-background/80 backdrop-blur-xl border border-border/50 shadow-lg overflow-hidden ${
                  feature.comingSoon ? 'opacity-90' : ''
                }`}
              >
                {/* Glassmorphism gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-primary/5 pointer-events-none" />
                
                {/* Highlight Badge */}
                <motion.div
                  initial={{ opacity: 0, x: -10 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ delay: 0.3 + index * 0.1 }}
                  className={`absolute top-4 right-4 px-2.5 py-1 rounded-full text-xs font-medium ${
                    feature.comingSoon 
                      ? 'bg-muted text-muted-foreground border border-border'
                      : 'bg-primary/10 text-primary border border-primary/20'
                  }`}
                >
                  {feature.highlight}
                </motion.div>

                {/* Icon */}
                <motion.div 
                  className="relative w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center mb-6 group-hover:bg-primary/20 transition-colors"
                  whileHover={{ rotate: 5, scale: 1.1 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <feature.icon 
                    className={`w-7 h-7 ${feature.comingSoon ? 'text-muted-foreground' : 'text-primary'}`}
                    isHovered={hoveredIndex === index}
                  />
                  
                  {/* AI Glow effect */}
                  {!feature.comingSoon && (
                    <motion.div
                      className="absolute inset-0 rounded-2xl bg-primary/20 blur-xl"
                      animate={{ 
                        opacity: hoveredIndex === index ? [0.4, 0.8, 0.4] : [0.3, 0.6, 0.3],
                        scale: hoveredIndex === index ? [1, 1.3, 1] : [1, 1.2, 1],
                      }}
                      transition={{ duration: 2, repeat: Infinity }}
                    />
                  )}
                </motion.div>

                {/* Content */}
                <h3 className={`relative text-xl font-heading font-semibold mb-3 ${
                  feature.comingSoon ? 'text-muted-foreground' : 'text-foreground'
                }`}>
                  {feature.title}
                </h3>
                
                {/* Animated divider */}
                <motion.div 
                  className="h-px bg-gradient-to-r from-transparent via-border to-transparent mb-4"
                  initial={{ scaleX: 0 }}
                  animate={isInView ? { scaleX: 1 } : { scaleX: 0 }}
                  transition={{ delay: 0.4 + index * 0.1, duration: 0.6 }}
                />
                
                <p className={`relative leading-relaxed text-sm ${
                  feature.comingSoon ? 'text-muted-foreground/70' : 'text-muted-foreground'
                }`}>
                  {feature.description}
                </p>
              </motion.div>
            </motion.div>
          ))}
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
                  <div className={`p-8 rounded-2xl bg-background/80 backdrop-blur-xl border border-border/50 shadow-lg relative overflow-hidden ${
                    feature.comingSoon ? 'opacity-90' : ''
                  }`}>
                    {/* Glassmorphism gradient overlay */}
                    <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-primary/5 pointer-events-none" />
                    
                    {/* Highlight Badge */}
                    <div className={`absolute top-4 right-4 px-2.5 py-1 rounded-full text-xs font-medium ${
                      feature.comingSoon 
                        ? 'bg-muted text-muted-foreground border border-border'
                        : 'bg-primary/10 text-primary border border-primary/20'
                    }`}>
                      {feature.highlight}
                    </div>

                    <div className="relative w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center mb-6">
                      <feature.icon 
                        className={`w-7 h-7 ${feature.comingSoon ? 'text-muted-foreground' : 'text-primary'}`}
                        isHovered={activeIndex === index}
                      />
                    </div>
                    <h3 className={`relative text-xl font-heading font-semibold mb-3 ${
                      feature.comingSoon ? 'text-muted-foreground' : 'text-foreground'
                    }`}>
                      {feature.title}
                    </h3>
                    <div className="h-px bg-gradient-to-r from-transparent via-border to-transparent mb-4" />
                    <p className={`relative leading-relaxed ${
                      feature.comingSoon ? 'text-muted-foreground/70' : 'text-muted-foreground'
                    }`}>
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
              className="w-12 h-12 rounded-full border border-border/50 bg-background/80 backdrop-blur-sm flex items-center justify-center hover:border-primary/30 transition-colors"
            >
              <ChevronLeft className="w-5 h-5 text-foreground" />
            </motion.button>
            
            <div className="flex gap-2">
              {features.map((_, index) => (
                <motion.button
                  key={index}
                  onClick={() => setActiveIndex(index)}
                  className={`h-2 rounded-full transition-all duration-300 ${
                    index === activeIndex ? 'bg-primary w-6' : 'bg-border w-2'
                  }`}
                  whileHover={{ scale: 1.2 }}
                />
              ))}
            </div>

            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={nextSlide}
              className="w-12 h-12 rounded-full border border-border/50 bg-background/80 backdrop-blur-sm flex items-center justify-center hover:border-primary/30 transition-colors"
            >
              <ChevronRight className="w-5 h-5 text-foreground" />
            </motion.button>
          </div>
        </div>
      </div>
    </section>
  );
};
