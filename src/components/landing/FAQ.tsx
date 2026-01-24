import { motion, useInView, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';

const faqs = [
  {
    question: 'How quickly can we get started with HRFlow?',
    answer: 'Most teams are up and running within 24-48 hours. Our guided onboarding process walks you through importing employee data, setting up your org structure, and configuring key workflows. Enterprise clients receive dedicated implementation support.',
  },
  {
    question: 'Is HRFlow compliant with data protection regulations?',
    answer: 'Absolutely. HRFlow is SOC 2 Type II certified, GDPR compliant, and meets HIPAA requirements for healthcare organizations. We use bank-level encryption for data at rest and in transit, with regular third-party security audits.',
  },
  {
    question: 'Can HRFlow integrate with our existing tools?',
    answer: 'Yes! We offer 100+ native integrations including Slack, Microsoft Teams, Okta, ADP, QuickBooks, and major ATS platforms. Our API also allows custom integrations for enterprise needs.',
  },
  {
    question: 'What kind of support do you offer?',
    answer: 'All plans include email support with 24-hour response times. Professional plans get priority chat support, while Enterprise clients receive a dedicated customer success manager, 24/7 phone support, and custom SLA guarantees.',
  },
  {
    question: 'Can we migrate data from our current HR system?',
    answer: 'Yes, we provide free data migration assistance. Our team will help you export data from your current system and import it into HRFlow, ensuring a smooth transition with zero data loss.',
  },
  {
    question: 'Is there a free trial available?',
    answer: 'Yes! We offer a 14-day free trial with full access to all features. No credit card required. At the end of your trial, you can choose the plan that best fits your team size and needs.',
  },
];

export const FAQ = () => {
  const ref = useRef(null);
  const sectionRef = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });
  
  const bgY = useTransform(scrollYProgress, [0, 1], [0, 60]);

  return (
    <section ref={sectionRef} id="faq" className="py-24 lg:py-32 bg-white relative overflow-hidden">
      {/* Parallax background */}
      <motion.div 
        style={{ y: bgY }}
        className="absolute top-1/4 right-[5%] w-72 h-72 bg-primary/[0.03] rounded-full blur-3xl pointer-events-none"
      />
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center max-w-2xl mx-auto mb-16"
        >
          <span className="text-primary font-semibold text-sm uppercase tracking-wider">FAQ</span>
          <h2 className="mt-4 text-3xl sm:text-4xl lg:text-5xl font-heading font-bold text-foreground">
            Frequently Asked Questions
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Everything you need to know about HRFlow.
          </p>
        </motion.div>

        {/* FAQ Accordion */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="max-w-3xl mx-auto"
        >
          <Accordion type="single" collapsible className="space-y-4">
            {faqs.map((faq, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.4, delay: 0.3 + index * 0.1 }}
              >
                <AccordionItem 
                  value={`item-${index}`}
                  className="bg-muted/30 border border-border/50 rounded-xl px-6 data-[state=open]:bg-muted/50 transition-colors"
                >
                  <AccordionTrigger className="text-left text-foreground font-medium hover:text-primary hover:no-underline py-5 [&[data-state=open]>svg]:rotate-180">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground pb-5 leading-relaxed">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              </motion.div>
            ))}
          </Accordion>
        </motion.div>

        {/* Contact CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="text-center mt-12"
        >
          <p className="text-muted-foreground">
            Still have questions?{' '}
            <motion.a 
              href="#" 
              className="text-primary font-medium hover:underline inline-flex items-center gap-1"
              whileHover={{ x: 2 }}
            >
              Contact our team
            </motion.a>
          </p>
        </motion.div>
      </div>
    </section>
  );
};
