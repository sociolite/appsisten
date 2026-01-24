import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { 
  Users, 
  Calendar, 
  BarChart3, 
  Shield, 
  Zap, 
  Globe,
  FileText,
  Clock
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

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

export const Features = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section id="features" className="section-padding bg-background relative">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto mb-16 lg:mb-20"
        >
          <span className="text-primary font-semibold text-sm uppercase tracking-wider">Features</span>
          <h2 className="mt-4 text-3xl sm:text-4xl lg:text-5xl font-heading font-bold text-foreground">
            Everything you need to manage your workforce
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            A comprehensive suite of HR tools designed to streamline operations and empower your team.
          </p>
        </motion.div>

        {/* Features Grid */}
        <motion.div
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8"
        >
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              variants={itemVariants}
              whileHover={{ y: -5, transition: { duration: 0.2 } }}
              className="group relative p-6 rounded-2xl bg-card border border-border hover:border-primary/30 hover:shadow-lg transition-all duration-300"
            >
              {/* Icon */}
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                <feature.icon className="w-6 h-6 text-primary" />
              </div>

              {/* Content */}
              <h3 className="text-lg font-heading font-semibold text-foreground mb-2">
                {feature.title}
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {feature.description}
              </p>

              {/* Hover gradient */}
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};
