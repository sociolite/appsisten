import { motion, useMotionValue, useSpring } from 'framer-motion';
import { useEffect, useRef } from 'react';

interface SpotlightProps {
  className?: string;
  size?: number;
}

export const Spotlight = ({ className = '', size = 400 }: SpotlightProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  
  const springX = useSpring(mouseX, { stiffness: 300, damping: 30 });
  const springY = useSpring(mouseY, { stiffness: 300, damping: 30 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      mouseX.set(e.clientX - rect.left);
      mouseY.set(e.clientY - rect.top);
    };

    const container = containerRef.current?.parentElement;
    container?.addEventListener('mousemove', handleMouseMove);
    return () => container?.removeEventListener('mousemove', handleMouseMove);
  }, [mouseX, mouseY]);

  return (
    <div ref={containerRef} className={`absolute inset-0 overflow-hidden pointer-events-none ${className}`}>
      <motion.div
        className="absolute rounded-full bg-primary/[0.08] blur-3xl"
        style={{
          x: springX,
          y: springY,
          width: size,
          height: size,
          translateX: '-50%',
          translateY: '-50%',
        }}
      />
    </div>
  );
};
