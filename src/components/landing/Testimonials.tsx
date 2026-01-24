import { motion, useInView, useScroll, useTransform } from 'framer-motion';
import { useRef, useState } from 'react';
import { Star, ChevronLeft, ChevronRight } from 'lucide-react';

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
  {
    name: 'David Kim',
    role: 'Chief People Officer',
    company: 'GlobalTech',
    avatar: 'DK',
    content: 'Managing 10,000+ employees across 30 countries was a nightmare. HRFlow made it seamless with their global compliance features.',
    rating: 5,
  },
];

const logos = ['Stripe', 'Airbnb', 'Notion', 'Figma', 'Linear', 'Vercel'];

export const Testimonials = () => {
  const ref = useRef(null);
  const sectionRef = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const [activeIndex, setActiveIndex] = useState(0);
  
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });
  
  const bgY = useTransform(scrollYProgress, [0, 1], [0, 100]);
  const decorY = useTransform(scrollYProgress, [0, 1], [0, -50]);

  const nextSlide = () => setActiveIndex((prev) => (prev + 1) % testimonials.length);
  const prevSlide = () => setActiveIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);

  return (
    <section ref={sectionRef} id="testimonials" className="py-24 lg:py-32 bg-white relative overflow-hidden">
      {/* Parallax background decorations */}
      <motion.div 
        style={{ y: bgY }}
        className="absolute top-0 right-0 w-96 h-96 bg-primary/[0.03] rounded-full blur-3xl pointer-events-none"
      />
      <motion.div 
        style={{ y: decorY }}
        className="absolute bottom-0 left-0 w-72 h-72 bg-primary/[0.02] rounded-full blur-3xl pointer-events-none"
      />
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <span className="text-primary font-semibold text-sm uppercase tracking-wider">Testimonials</span>
          <h2 className="mt-4 text-3xl sm:text-4xl lg:text-5xl font-heading font-bold text-foreground">
            Trusted by Industry Leaders
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            See why thousands of HR professionals choose HRFlow.
          </p>
        </motion.div>

        {/* Testimonial Carousel */}
        <div className="max-w-4xl mx-auto relative">
          <div className="overflow-hidden">
            <motion.div
              animate={{ x: `-${activeIndex * 100}%` }}
              transition={{ type: "spring", stiffness: 200, damping: 25 }}
              className="flex"
            >
              {testimonials.map((testimonial, index) => (
                <motion.div
                  key={testimonial.name}
                  className="flex-shrink-0 w-full px-4"
                >
                  <div className="text-center py-12 px-8">
                    {/* Rating */}
                    <motion.div 
                      className="flex justify-center gap-1 mb-8"
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={isInView ? { opacity: 1, scale: 1 } : {}}
                      transition={{ delay: 0.2 }}
                    >
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <Star key={i} className="w-5 h-5 fill-primary text-primary" />
                      ))}
                    </motion.div>

                    {/* Content */}
                    <motion.p 
                      className="text-2xl lg:text-3xl font-heading text-foreground leading-relaxed mb-10"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.3 }}
                    >
                      "{testimonial.content}"
                    </motion.p>

                    {/* Author */}
                    <div className="flex items-center justify-center gap-4">
                      <motion.div 
                        className="w-14 h-14 rounded-full bg-primary flex items-center justify-center text-white font-semibold text-lg"
                        whileHover={{ scale: 1.1, rotate: 5 }}
                      >
                        {testimonial.avatar}
                      </motion.div>
                      <div className="text-left">
                        <p className="font-semibold text-foreground text-lg">{testimonial.name}</p>
                        <p className="text-muted-foreground">
                          {testimonial.role}, {testimonial.company}
                        </p>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>

          {/* Navigation */}
          <div className="flex items-center justify-center gap-6 mt-8">
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={prevSlide}
              className="w-12 h-12 rounded-full border-2 border-border flex items-center justify-center hover:border-primary transition-colors"
            >
              <ChevronLeft className="w-5 h-5 text-foreground" />
            </motion.button>
            
            <div className="flex gap-3">
              {testimonials.map((_, index) => (
                <motion.button
                  key={index}
                  onClick={() => setActiveIndex(index)}
                  className={`h-2 rounded-full transition-all duration-300 ${
                    index === activeIndex ? 'bg-primary w-8' : 'bg-border w-2'
                  }`}
                  whileHover={{ scale: 1.2 }}
                />
              ))}
            </div>

            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={nextSlide}
              className="w-12 h-12 rounded-full border-2 border-border flex items-center justify-center hover:border-primary transition-colors"
            >
              <ChevronRight className="w-5 h-5 text-foreground" />
            </motion.button>
          </div>
        </div>

        {/* Logo Cloud */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="mt-20 text-center"
        >
          <p className="text-sm text-muted-foreground mb-8">Trusted by teams at</p>
          <div className="flex flex-wrap items-center justify-center gap-x-12 gap-y-6">
            {logos.map((logo, index) => (
              <motion.span
                key={logo}
                initial={{ opacity: 0 }}
                animate={isInView ? { opacity: 1 } : {}}
                transition={{ delay: 0.6 + index * 0.1 }}
                whileHover={{ scale: 1.1, color: 'hsl(215 90% 50%)' }}
                className="text-2xl font-heading font-bold text-muted-foreground/30 cursor-default transition-colors"
              >
                {logo}
              </motion.span>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};
