import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { Star, Quote } from 'lucide-react';

const testimonials = [
  {
    name: 'Sarah Chen',
    role: 'VP of People',
    company: 'TechScale Inc.',
    avatar: 'SC',
    content: 'HRFlow transformed how we manage our global team of 500+. The automation features alone save us 20 hours per week.',
    rating: 5,
  },
  {
    name: 'Marcus Johnson',
    role: 'HR Director',
    company: 'Innovate Labs',
    avatar: 'MJ',
    content: 'The onboarding module is incredible. New hires are productive from day one, and our retention has improved by 40%.',
    rating: 5,
  },
  {
    name: 'Emily Rodriguez',
    role: 'CEO',
    company: 'StartupFlow',
    avatar: 'ER',
    content: 'As a startup founder, I needed something simple yet powerful. HRFlow scales with us perfectly without breaking the bank.',
    rating: 5,
  },
];

const logos = [
  'TechScale', 'Innovate Labs', 'StartupFlow', 'CloudNine', 'DataSync', 'AIFirst'
];

export const Testimonials = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section id="testimonials" className="section-padding bg-background relative">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <span className="text-primary font-semibold text-sm uppercase tracking-wider">Testimonials</span>
          <h2 className="mt-4 text-3xl sm:text-4xl lg:text-5xl font-heading font-bold text-foreground">
            Loved by HR teams worldwide
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Join thousands of companies that trust HRFlow for their HR operations.
          </p>
        </motion.div>

        {/* Testimonials Grid */}
        <div ref={ref} className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 mb-16">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.name}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.15 }}
              className="relative p-6 lg:p-8 rounded-2xl bg-card border border-border hover:border-primary/30 hover:shadow-lg transition-all duration-300 group"
            >
              {/* Quote Icon */}
              <Quote className="absolute top-6 right-6 w-8 h-8 text-primary/10 group-hover:text-primary/20 transition-colors" />

              {/* Rating */}
              <div className="flex gap-1 mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-accent text-accent" />
                ))}
              </div>

              {/* Content */}
              <p className="text-foreground mb-6 leading-relaxed">
                "{testimonial.content}"
              </p>

              {/* Author */}
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary to-[hsl(280_80%_55%)] flex items-center justify-center text-primary-foreground font-semibold">
                  {testimonial.avatar}
                </div>
                <div>
                  <p className="font-semibold text-foreground">{testimonial.name}</p>
                  <p className="text-sm text-muted-foreground">
                    {testimonial.role} at {testimonial.company}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Logo Cloud */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="text-center"
        >
          <p className="text-sm text-muted-foreground mb-6">Trusted by innovative companies</p>
          <div className="flex flex-wrap items-center justify-center gap-8 lg:gap-12">
            {logos.map((logo) => (
              <span
                key={logo}
                className="text-xl font-heading font-bold text-muted-foreground/40 hover:text-muted-foreground/60 transition-colors"
              >
                {logo}
              </span>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};
