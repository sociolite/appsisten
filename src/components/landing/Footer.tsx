import { motion } from 'framer-motion';
import { Linkedin, Twitter } from 'lucide-react';

const links = [
  { name: 'Features', href: '#features' },
  { name: 'Pricing', href: '#pricing' },
  { name: 'About', href: '#' },
  { name: 'Blog', href: '#' },
  { name: 'Privacy', href: '#' },
  { name: 'Terms', href: '#' },
];

const socialLinks = [
  { icon: Twitter, href: '#', label: 'Twitter' },
  { icon: Linkedin, href: '#', label: 'LinkedIn' },
];

export const Footer = () => {
  return (
    <footer className="py-12 bg-white border-t border-border">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8">
          {/* Logo */}
          <motion.a
            href="#"
            className="flex items-center gap-2.5"
            whileHover={{ scale: 1.02 }}
          >
            <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
              <span className="text-white font-bold text-sm">H</span>
            </div>
            <span className="font-heading font-bold text-lg text-foreground">HRFlow</span>
          </motion.a>

          {/* Links */}
          <nav className="flex flex-wrap items-center justify-center gap-6 lg:gap-8">
            {links.map((link) => (
              <motion.a
                key={link.name}
                href={link.href}
                className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                whileHover={{ y: -1 }}
              >
                {link.name}
              </motion.a>
            ))}
          </nav>

          {/* Social */}
          <div className="flex items-center gap-4">
            {socialLinks.map((social) => (
              <motion.a
                key={social.label}
                href={social.href}
                className="w-10 h-10 rounded-full border border-border flex items-center justify-center text-muted-foreground hover:text-foreground hover:border-primary/30 transition-colors"
                aria-label={social.label}
                whileHover={{ scale: 1.1, y: -2 }}
                whileTap={{ scale: 0.95 }}
              >
                <social.icon className="w-4 h-4" />
              </motion.a>
            ))}
          </div>
        </div>

        {/* Copyright */}
        <motion.div 
          className="mt-10 pt-6 border-t border-border text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} HRFlow. All rights reserved.
          </p>
        </motion.div>
      </div>
    </footer>
  );
};
