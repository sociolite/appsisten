import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';

interface GridPatternProps {
  className?: string;
}

export const GridPattern = ({ className = '' }: GridPatternProps) => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end start'],
  });

  const opacity = useTransform(scrollYProgress, [0, 0.5], [0.4, 0]);
  const y = useTransform(scrollYProgress, [0, 1], [0, 100]);

  return (
    <motion.div
      ref={ref}
      style={{ opacity, y }}
      className={`absolute inset-0 pointer-events-none ${className}`}
    >
      <svg className="absolute inset-0 w-full h-full" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
            <path
              d="M 40 0 L 0 0 0 40"
              fill="none"
              stroke="currentColor"
              strokeWidth="0.5"
              className="text-primary/[0.08]"
            />
          </pattern>
          <linearGradient id="fade" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="white" stopOpacity="1" />
            <stop offset="100%" stopColor="white" stopOpacity="0" />
          </linearGradient>
          <mask id="fadeMask">
            <rect width="100%" height="100%" fill="url(#fade)" />
          </mask>
        </defs>
        <rect width="100%" height="100%" fill="url(#grid)" mask="url(#fadeMask)" />
      </svg>
    </motion.div>
  );
};
