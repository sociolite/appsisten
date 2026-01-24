import { motion, useInView, useScroll, useTransform } from 'framer-motion';
import { useRef, useState } from 'react';
import { Star, ChevronLeft, ChevronRight } from 'lucide-react';
import { useLanguage } from '@/i18n/LanguageContext';

interface Testimonial {
  quote: string;
  author: string;
  role: string;
  company: string;
}

export const Testimonials = () => {
  const { t, tArray } = useLanguage();
  const ref = useRef(null);
  const sectionRef = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const [activeIndex, setActiveIndex] = useState(0);
  
  const testimonials = tArray<Testimonial>('testimonials.items');
  
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });
  
  const bgY = useTransform(scrollYProgress, [0, 1], [0, 100]);

  const nextSlide = () => setActiveIndex((prev) => (prev + 1) % testimonials.length);
  const prevSlide = () => setActiveIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);

  return (
    <section ref={sectionRef} id="testimonials" className="py-24 lg:py-32 bg-white relative overflow-hidden">
      <motion.div style={{ y: bgY }} className="absolute top-0 right-0 w-96 h-96 bg-primary/[0.03] rounded-full blur-3xl pointer-events-none" />
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div ref={ref} initial={{ opacity: 0, y: 20 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6 }} className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-primary font-semibold text-sm uppercase tracking-wider">Testimonials</span>
          <h2 className="mt-4 text-3xl sm:text-4xl lg:text-5xl font-heading font-bold text-foreground">{t('testimonials.sectionTitle')}</h2>
          <p className="mt-4 text-lg text-muted-foreground">{t('testimonials.sectionSubtitle')}</p>
        </motion.div>

        <div className="max-w-4xl mx-auto relative">
          <div className="overflow-hidden">
            <motion.div animate={{ x: `-${activeIndex * 100}%` }} transition={{ type: "spring", stiffness: 200, damping: 25 }} className="flex">
              {testimonials.map((testimonial, index) => (
                <div key={index} className="flex-shrink-0 w-full px-4">
                  <div className="text-center py-12 px-8">
                    <div className="flex justify-center gap-1 mb-8">
                      {[...Array(5)].map((_, i) => (<Star key={i} className="w-5 h-5 fill-primary text-primary" />))}
                    </div>
                    <p className="text-2xl lg:text-3xl font-heading text-foreground leading-relaxed mb-10">"{testimonial.quote}"</p>
                    <div className="flex items-center justify-center gap-4">
                      <div className="w-14 h-14 rounded-full bg-primary flex items-center justify-center text-white font-semibold text-lg">
                        {testimonial.author.split(' ').map(n => n[0]).join('')}
                      </div>
                      <div className="text-left">
                        <p className="font-semibold text-foreground text-lg">{testimonial.author}</p>
                        <p className="text-muted-foreground">{testimonial.role}, {testimonial.company}</p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </motion.div>
          </div>
          <div className="flex items-center justify-center gap-6 mt-8">
            <motion.button whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }} onClick={prevSlide} className="w-12 h-12 rounded-full border-2 border-border flex items-center justify-center hover:border-primary transition-colors">
              <ChevronLeft className="w-5 h-5 text-foreground" />
            </motion.button>
            <div className="flex gap-3">
              {testimonials.map((_, index) => (
                <motion.button key={index} onClick={() => setActiveIndex(index)} className={`h-2 rounded-full transition-all duration-300 ${index === activeIndex ? 'bg-primary w-8' : 'bg-border w-2'}`} whileHover={{ scale: 1.2 }} />
              ))}
            </div>
            <motion.button whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }} onClick={nextSlide} className="w-12 h-12 rounded-full border-2 border-border flex items-center justify-center hover:border-primary transition-colors">
              <ChevronRight className="w-5 h-5 text-foreground" />
            </motion.button>
          </div>
        </div>
      </div>
    </section>
  );
};
