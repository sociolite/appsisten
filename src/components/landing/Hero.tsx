import { motion, useScroll, useTransform } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { ArrowRight, Play, CheckCircle2, Building2, Users, Shield } from 'lucide-react';
import heroDashboard from '@/assets/hero-dashboard.jpg';

const benefits = [
  'No credit card required',
  '14-day free trial',
  'SOC 2 Compliant',
];

const stats = [
  { icon: Building2, value: '2,500+', label: 'Enterprise Clients' },
  { icon: Users, value: '1M+', label: 'Employees Managed' },
  { icon: Shield, value: '99.99%', label: 'Uptime SLA' },
];

export const Hero = () => {
  const { scrollY } = useScroll();
  
  // Parallax transforms for background elements
  const bgY1 = useTransform(scrollY, [0, 500], [0, 150]);
  const bgY2 = useTransform(scrollY, [0, 500], [0, 100]);
  const bgY3 = useTransform(scrollY, [0, 500], [0, 200]);
  const bgScale = useTransform(scrollY, [0, 300], [1, 1.1]);
  const bgOpacity = useTransform(scrollY, [0, 400], [0.5, 0.2]);

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-white pt-28 pb-20">
      {/* Parallax animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          style={{ y: bgY1, scale: bgScale, opacity: bgOpacity }}
          className="absolute top-20 right-[20%] w-72 h-72 bg-primary/5 rounded-full blur-3xl"
        />
        <motion.div
          style={{ y: bgY2 }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.3 }}
          transition={{ duration: 2, delay: 0.5 }}
          className="absolute bottom-40 left-[10%] w-96 h-96 bg-primary/3 rounded-full blur-3xl"
        />
        <motion.div
          style={{ y: bgY3 }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.4 }}
          transition={{ duration: 2, delay: 1 }}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/[0.02] rounded-full blur-3xl"
        />
        {/* Floating geometric shapes */}
        <motion.div
          style={{ y: useTransform(scrollY, [0, 500], [0, -80]) }}
          className="absolute top-1/3 left-[5%] w-4 h-4 border-2 border-primary/20 rounded-full"
        />
        <motion.div
          style={{ y: useTransform(scrollY, [0, 500], [0, -120]) }}
          className="absolute top-1/2 right-[8%] w-6 h-6 border-2 border-primary/15 rotate-45"
        />
        <motion.div
          style={{ y: useTransform(scrollY, [0, 500], [0, -60]) }}
          className="absolute bottom-1/3 left-[15%] w-3 h-3 bg-primary/10 rounded-full"
        />
        <motion.div
          style={{ y: useTransform(scrollY, [0, 500], [0, -100]) }}
          className="absolute top-[40%] right-[15%] w-5 h-5 border-2 border-primary/10 rounded-lg rotate-12"
        />
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-4xl mx-auto">
          {/* Enterprise Badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/5 border border-primary/10 mb-8"
          >
            <motion.span 
              className="flex h-2 w-2 rounded-full bg-primary"
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
            <span className="text-sm font-medium text-primary">Enterprise-Grade HRIS Platform</span>
          </motion.div>

          {/* Heading */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-heading font-bold tracking-tight text-foreground mb-6 leading-[1.1]"
          >
            Human Resources,{' '}
            <motion.span
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.3 }}
              className="text-primary inline-block"
            >
              Reimagined
            </motion.span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto mb-10 leading-relaxed"
          >
            The all-in-one platform trusted by Fortune 500 companies to streamline HR operations, drive engagement, and scale globally.
          </motion.p>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-10"
          >
            <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
              <Button size="lg" className="bg-primary hover:bg-primary/90 text-white rounded-xl px-8 h-14 text-base group">
                Start Free Trial
                <motion.span
                  className="ml-2"
                  animate={{ x: [0, 4, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                >
                  <ArrowRight className="w-5 h-5" />
                </motion.span>
              </Button>
            </motion.div>
            <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
              <Button 
                variant="outline" 
                size="lg" 
                className="rounded-xl px-8 h-14 text-base border-2 border-border hover:border-primary/30 hover:bg-primary/5"
              >
                <Play className="w-5 h-5 mr-2" />
                Watch Demo
              </Button>
            </motion.div>
          </motion.div>

          {/* Benefits */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="flex flex-wrap items-center justify-center gap-6 text-sm text-muted-foreground"
          >
            {benefits.map((benefit, index) => (
              <motion.div 
                key={benefit} 
                className="flex items-center gap-2"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.7 + index * 0.1 }}
              >
                <CheckCircle2 className="w-4 h-4 text-primary" />
                <span>{benefit}</span>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* Hero Image */}
        <motion.div
          initial={{ opacity: 0, y: 60 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.7 }}
          className="mt-16 lg:mt-20 relative"
        >
          <div className="relative mx-auto max-w-5xl">
            {/* Stats floating cards */}
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, x: index === 0 ? -40 : index === 2 ? 40 : 0, y: index === 1 ? 40 : 0 }}
                animate={{ opacity: 1, x: 0, y: 0 }}
                transition={{ duration: 0.6, delay: 1 + index * 0.15 }}
                whileHover={{ scale: 1.05, y: -5 }}
                className={`absolute z-20 bg-white p-4 rounded-2xl shadow-lg border border-border/50 ${
                  index === 0 ? '-left-4 lg:-left-12 top-1/4' :
                  index === 1 ? 'left-1/2 -translate-x-1/2 -bottom-6' :
                  '-right-4 lg:-right-12 top-1/3'
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                    <stat.icon className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <p className="text-xl font-bold text-foreground">{stat.value}</p>
                    <p className="text-xs text-muted-foreground">{stat.label}</p>
                  </div>
                </div>
              </motion.div>
            ))}
            
            {/* Image container */}
            <motion.div 
              className="relative rounded-2xl lg:rounded-3xl overflow-hidden shadow-2xl border border-border/30"
              whileHover={{ scale: 1.01 }}
              transition={{ duration: 0.4 }}
            >
              <img
                src={heroDashboard}
                alt="HRFlow Dashboard"
                className="w-full h-auto"
              />
              {/* Subtle overlay */}
              <div className="absolute inset-0 bg-primary/[0.02]" />
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
