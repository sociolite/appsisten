import { motion, useScroll, useTransform } from 'framer-motion';

export const AnimatedBackground = () => {
  const { scrollYProgress } = useScroll();
  
  // Parallax transforms for floating elements
  const y1 = useTransform(scrollYProgress, [0, 1], [0, -200]);
  const y2 = useTransform(scrollYProgress, [0, 1], [0, -400]);
  const y3 = useTransform(scrollYProgress, [0, 1], [0, -300]);
  const rotate1 = useTransform(scrollYProgress, [0, 1], [0, 360]);
  const rotate2 = useTransform(scrollYProgress, [0, 1], [0, -180]);

  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
      {/* Large gradient orbs */}
      <motion.div
        style={{ y: y1 }}
        className="absolute -top-40 -right-40 w-[600px] h-[600px] rounded-full bg-primary/[0.03] blur-3xl"
        animate={{ 
          scale: [1, 1.1, 1],
          opacity: [0.3, 0.5, 0.3],
        }}
        transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div
        style={{ y: y2 }}
        className="absolute top-1/3 -left-40 w-[500px] h-[500px] rounded-full bg-primary/[0.04] blur-3xl"
        animate={{ 
          scale: [1, 1.15, 1],
          opacity: [0.2, 0.4, 0.2],
        }}
        transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
      />
      <motion.div
        style={{ y: y3 }}
        className="absolute top-2/3 right-1/4 w-[400px] h-[400px] rounded-full bg-primary/[0.02] blur-3xl"
        animate={{ 
          scale: [1, 1.2, 1],
          opacity: [0.3, 0.5, 0.3],
        }}
        transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut', delay: 4 }}
      />

      {/* Floating geometric shapes */}
      <motion.div
        style={{ y: y1, rotate: rotate1 }}
        className="absolute top-[15%] left-[10%] w-16 h-16 border-2 border-primary/10 rounded-2xl"
      />
      <motion.div
        style={{ y: y2, rotate: rotate2 }}
        className="absolute top-[45%] right-[8%] w-12 h-12 border-2 border-primary/15 rounded-full"
      />
      <motion.div
        style={{ y: y3 }}
        animate={{ rotate: 360 }}
        transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
        className="absolute top-[70%] left-[5%] w-8 h-8 border-2 border-primary/10"
      />
      <motion.div
        style={{ y: y1 }}
        animate={{ rotate: -360 }}
        transition={{ duration: 25, repeat: Infinity, ease: 'linear' }}
        className="absolute top-[30%] right-[15%] w-6 h-6 bg-primary/5 rounded-full"
      />
      <motion.div
        style={{ y: y2 }}
        animate={{ scale: [1, 1.3, 1] }}
        transition={{ duration: 4, repeat: Infinity }}
        className="absolute top-[55%] left-[20%] w-4 h-4 bg-primary/10 rounded-full"
      />
      <motion.div
        style={{ y: y3 }}
        className="absolute top-[80%] right-[25%] w-10 h-10 border-2 border-primary/8 rotate-45"
        animate={{ rotate: [45, 225, 45] }}
        transition={{ duration: 15, repeat: Infinity, ease: 'easeInOut' }}
      />

      {/* Subtle grid overlay */}
      <div 
        className="absolute inset-0 opacity-[0.015]"
        style={{
          backgroundImage: `
            linear-gradient(hsl(var(--primary)) 1px, transparent 1px),
            linear-gradient(90deg, hsl(var(--primary)) 1px, transparent 1px)
          `,
          backgroundSize: '80px 80px',
        }}
      />

      {/* Animated dots */}
      {[...Array(6)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-2 h-2 rounded-full bg-primary/20"
          style={{
            left: `${15 + i * 15}%`,
            top: `${20 + (i % 3) * 25}%`,
          }}
          animate={{
            y: [0, -30, 0],
            opacity: [0.2, 0.5, 0.2],
          }}
          transition={{
            duration: 3 + i * 0.5,
            repeat: Infinity,
            delay: i * 0.3,
          }}
        />
      ))}
    </div>
  );
};
