import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';

interface AnimatedTextProps {
  text: string;
  className?: string;
  delay?: number;
  once?: boolean;
}

export const AnimatedText = ({
  text,
  className = '',
  delay = 0,
  once = true,
}: AnimatedTextProps) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once, margin: '-50px' });

  const words = text.split(' ');

  return (
    <span ref={ref} className={`inline-flex flex-wrap ${className}`}>
      {words.map((word, i) => (
        <motion.span
          key={i}
          initial={{ opacity: 0, y: 20, filter: 'blur(4px)' }}
          animate={isInView ? { opacity: 1, y: 0, filter: 'blur(0px)' } : {}}
          transition={{
            duration: 0.5,
            delay: delay + i * 0.05,
            ease: [0.22, 1, 0.36, 1],
          }}
          className="mr-[0.25em] inline-block"
        >
          {word}
        </motion.span>
      ))}
    </span>
  );
};

interface AnimatedLettersProps {
  text: string;
  className?: string;
  delay?: number;
  staggerDelay?: number;
  once?: boolean;
}

export const AnimatedLetters = ({
  text,
  className = '',
  delay = 0,
  staggerDelay = 0.03,
  once = true,
}: AnimatedLettersProps) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once, margin: '-50px' });

  return (
    <span ref={ref} className={`inline-block ${className}`}>
      {text.split('').map((char, i) => (
        <motion.span
          key={i}
          initial={{ opacity: 0, y: 30, rotateX: -90 }}
          animate={isInView ? { opacity: 1, y: 0, rotateX: 0 } : {}}
          transition={{
            duration: 0.6,
            delay: delay + i * staggerDelay,
            ease: [0.22, 1, 0.36, 1],
          }}
          className="inline-block"
          style={{ transformOrigin: 'bottom' }}
        >
          {char === ' ' ? '\u00A0' : char}
        </motion.span>
      ))}
    </span>
  );
};
