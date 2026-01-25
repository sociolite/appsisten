import { motion, useInView } from 'framer-motion';
import { Linkedin, Twitter, Mail, ArrowUpRight } from 'lucide-react';
import { useRef } from 'react';

const links = [
  { name: 'Features', href: '#features' },
  { name: 'Pricing', href: '#pricing' },
  { name: 'FAQ', href: '#faq' },
  { name: 'Privacy', href: '#' },
  { name: 'Terms', href: '#' },
];

const socialLinks = [
  { icon: Twitter, href: '#', label: 'Twitter' },
  { icon: Linkedin, href: '#', label: 'LinkedIn' },
  { icon: Mail, href: '#', label: 'Email' },
];

export const Footer = () => {
  const footerRef = useRef(null);
  const isInView = useInView(footerRef, { once: true, margin: "-50px" });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { type: "spring" as const, stiffness: 300, damping: 24 },
    },
  };

  return (
    <footer ref={footerRef} className="py-8 bg-background/50 backdrop-blur-sm">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          className="mx-auto max-w-4xl"
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          {/* Floating Glass Card */}
          <motion.div
            className="relative rounded-2xl bg-background/80 backdrop-blur-xl border border-border/50 shadow-lg overflow-hidden"
            variants={itemVariants}
          >
            {/* Subtle gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-primary/5 pointer-events-none" />
            
            <div className="relative p-6 sm:p-8">
              {/* Top Row: Logo + Links + Social */}
              <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
                {/* Logo */}
                <motion.a
                  href="#"
                  className="flex items-center gap-2.5 group"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <motion.img
                    src="/images/logo.png"
                    alt="Appsisten"
                    className="h-9 w-auto"
                    whileHover={{ rotate: 5 }}
                  />
                </motion.a>

                {/* Navigation Links */}
                <nav className="flex flex-wrap items-center justify-center gap-1">
                  {links.map((link, index) => (
                    <motion.a
                      key={link.name}
                      href={link.href}
                      className="relative px-3 py-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors rounded-lg group"
                      variants={itemVariants}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <span className="relative z-10">{link.name}</span>
                      <motion.div
                        className="absolute inset-0 bg-primary/10 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity"
                        layoutId={`footer-hover-${index}`}
                      />
                    </motion.a>
                  ))}
                </nav>

                {/* Social Icons */}
                <div className="flex items-center gap-2">
                  {socialLinks.map((social) => (
                    <motion.a
                      key={social.label}
                      href={social.href}
                      className="relative w-9 h-9 rounded-xl border border-border/50 bg-background/50 flex items-center justify-center text-muted-foreground hover:text-primary hover:border-primary/30 transition-colors group overflow-hidden"
                      aria-label={social.label}
                      whileHover={{ scale: 1.1, y: -2 }}
                      whileTap={{ scale: 0.9 }}
                    >
                      <motion.div
                        className="absolute inset-0 bg-primary/10 opacity-0 group-hover:opacity-100 transition-opacity"
                      />
                      <social.icon className="w-4 h-4 relative z-10" />
                    </motion.a>
                  ))}
                </div>
              </div>

              {/* Divider */}
              <motion.div 
                className="my-6 h-px bg-gradient-to-r from-transparent via-border to-transparent"
                initial={{ scaleX: 0 }}
                animate={isInView ? { scaleX: 1 } : { scaleX: 0 }}
                transition={{ delay: 0.5, duration: 0.8 }}
              />

              {/* Bottom Row: Copyright + Back to top */}
              <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                <motion.p 
                  className="text-xs text-muted-foreground"
                  variants={itemVariants}
                >
                  © {new Date().getFullYear()} Appsisten. All rights reserved.
                </motion.p>

                <motion.a
                  href="#"
                  className="flex items-center gap-1.5 text-xs text-muted-foreground hover:text-primary transition-colors group"
                  whileHover={{ y: -2 }}
                  onClick={(e) => {
                    e.preventDefault();
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                >
                  <span>Back to top</span>
                  <motion.div
                    animate={{ y: [0, -3, 0] }}
                    transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
                  >
                    <ArrowUpRight className="w-3.5 h-3.5 rotate-[-45deg]" />
                  </motion.div>
                </motion.a>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </footer>
  );
};
