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
    title: 'AI Recruiter Agent',
    description:
      'Automate candidate sourcing, screening, and engagement. Our AI interviews candidates 24/7 and highlights deeper insights.',
    highlight: 'Most Popular',
  },
  {
    icon: AnimatedAssistantIcon,
    title: 'Intelligent Assistant',
    description:
      'A personal AI assistant that understands your business context, manages schedules, handles emails, and prepares meeting briefs.',
    highlight: 'Always On',
  },
  {
    icon: AnimatedDocumentIcon,
    title: 'Enterprise-Grade Security',
    description:
      'Bank-level encryption, role-based access control, and comprehensive audit logs keep your data safe and compliant.',
    highlight: 'SOC2 Ready',
  },
  {
    icon: AnimatedDocumentIcon,
    title: 'AI Document Processor',
    description:
      'Automatically extract data from invoices, contracts, and receipts. Turn unstructured documents into structured data instantly.',
  },
  {
    icon: AnimatedWorkflowIcon,
    title: 'Distributed Workflows',
    description:
      'Orchestrate complex multi-step processes across teams and systems with intelligent task routing and automation.',
  },
  {
    icon: AnimatedRecruiterIcon,
    title: 'Predictive Analytics',
    description:
      'Forecast trends and identify opportunities with AI that analyzes your historical data and market signals.',
  },
  {
    icon: AnimatedWorkflowIcon,
    title: '300+ Integrations',
    description:
      'Seamlessly connect with your existing tech stack including Slack, Salesforce, HubSpot, Jira, and Microsoft 365.',
  },
  {
    icon: AnimatedAssistantIcon,
    title: 'Knowledge Brain',
    description:
      'Centralize your team knowledge. AI instantly answers questions based on your internal documentation and history.',
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
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="group relative p-8 rounded-3xl bg-background border border-border/50 hover:border-primary/50 transition-all duration-300 hover:shadow-2xl hover:shadow-primary/5 flex flex-col h-full overflow-hidden"
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-primary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

              <div className="relative flex-1 flex flex-col">
                <div className="flex justify-between items-start mb-6">
                  <div className="relative w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors duration-300">
                    <feature.icon
                      className="w-7 h-7 text-primary"
                      isHovered={hoveredIndex === index}
                    />
                  </div>
                  {feature.highlight && (
                    <div className="px-3 py-1 rounded-full text-xs font-medium bg-primary/10 text-primary border border-primary/20">
                      {feature.highlight}
                    </div>
                  )}
                </div>

                <h3 className="text-xl font-heading font-semibold mb-3 text-foreground group-hover:text-primary transition-colors duration-300">
                  {feature.title}
                </h3>
                
                <p className="text-muted-foreground leading-relaxed group-hover:text-foreground/80 transition-colors duration-300">
                  {feature.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Mobile: Swipeable Carousel */}
        <div className="lg:hidden relative">
          <div className="overflow-hidden">
            <motion.div
              animate={{ x: `-${activeIndex * 100}%` }}
              transition={{ type: 'spring', stiffness: 300, damping: 30 }}
              className="flex"
            >
              {features.map((feature, index) => (
                <motion.div key={feature.title} className="flex-shrink-0 w-full px-4">
                  <div
                    className="p-8 rounded-2xl bg-background/80 backdrop-blur-xl border border-border/50 shadow-lg relative overflow-hidden"
                  >
                    {/* Glassmorphism gradient overlay */}
                    <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-primary/5 pointer-events-none" />

                    {/* Highlight Badge */}
                    {feature.highlight && (
                      <div className="absolute top-4 right-4 px-2.5 py-1 rounded-full text-xs font-medium bg-primary/10 text-primary border border-primary/20">
                        {feature.highlight}
                      </div>
                    )}

                    <div className="relative w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center mb-6">
                    <feature.icon
                      className="w-7 h-7 text-primary"
                      isHovered={activeIndex === index}
                    />
                  </div>

                  <div className="text-left">
                    <h3 className="relative text-xl font-heading font-semibold mb-3 text-foreground">
                      {feature.title}
                    </h3>
                    <div className="h-px bg-gradient-to-r from-transparent via-border to-transparent mb-4" />
                    <p className="relative leading-relaxed text-muted-foreground">
                      {feature.description}
                    </p>
                  </div>
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
