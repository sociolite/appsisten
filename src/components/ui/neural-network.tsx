import { motion, useScroll, useTransform } from 'framer-motion';
import { useMemo } from 'react';

interface Node {
  id: number;
  x: number;
  y: number;
  delay: number;
  size: number;
}

interface Connection {
  from: Node;
  to: Node;
  delay: number;
}

export const NeuralNetwork = () => {
  const { scrollY } = useScroll();
  const networkOpacity = useTransform(scrollY, [0, 400], [0.6, 0.15]);
  const networkY = useTransform(scrollY, [0, 500], [0, 50]);

  // Generate network nodes
  const nodes = useMemo<Node[]>(() => {
    const nodeList: Node[] = [];
    const nodeCount = 12;

    for (let i = 0; i < nodeCount; i++) {
      nodeList.push({
        id: i,
        x: 10 + (i % 4) * 25 + Math.random() * 10,
        y: 15 + Math.floor(i / 4) * 30 + Math.random() * 10,
        delay: i * 0.15,
        size: 3 + Math.random() * 3,
      });
    }
    return nodeList;
  }, []);

  // Generate connections between nearby nodes
  const connections = useMemo<Connection[]>(() => {
    const conns: Connection[] = [];
    for (let i = 0; i < nodes.length; i++) {
      for (let j = i + 1; j < nodes.length; j++) {
        const dx = nodes[i].x - nodes[j].x;
        const dy = nodes[i].y - nodes[j].y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        if (distance < 35) {
          conns.push({
            from: nodes[i],
            to: nodes[j],
            delay: (i + j) * 0.1,
          });
        }
      }
    }
    return conns;
  }, [nodes]);

  return (
    <motion.div
      style={{ y: networkY, opacity: networkOpacity }}
      className="absolute inset-0 overflow-hidden pointer-events-none"
    >
      <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid slice">
        <defs>
          {/* Gradient for connections */}
          <linearGradient id="connectionGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="hsl(var(--primary))" stopOpacity="0.1" />
            <stop offset="50%" stopColor="hsl(var(--primary))" stopOpacity="0.3" />
            <stop offset="100%" stopColor="hsl(var(--primary))" stopOpacity="0.1" />
          </linearGradient>

          {/* Glow filter for nodes */}
          <filter id="nodeGlow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="0.5" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* Connection lines with animated data flow */}
        {connections.map((conn, index) => (
          <g key={`conn-${index}`}>
            {/* Base connection line */}
            <motion.line
              x1={conn.from.x}
              y1={conn.from.y}
              x2={conn.to.x}
              y2={conn.to.y}
              stroke="url(#connectionGradient)"
              strokeWidth="0.15"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: 1 }}
              transition={{ duration: 1.5, delay: conn.delay }}
            />

            {/* Animated data particle */}
            <motion.circle
              r="0.4"
              fill="hsl(var(--primary))"
              filter="url(#nodeGlow)"
              initial={{ opacity: 0 }}
              animate={{
                cx: [conn.from.x, conn.to.x],
                cy: [conn.from.y, conn.to.y],
                opacity: [0, 0.8, 0.8, 0],
              }}
              transition={{
                duration: 2 + Math.random(),
                delay: conn.delay + 1,
                repeat: Infinity,
                repeatDelay: 3 + Math.random() * 4,
                ease: 'easeInOut',
              }}
            />
          </g>
        ))}

        {/* Network nodes */}
        {nodes.map((node) => (
          <g key={`node-${node.id}`}>
            {/* Outer pulse ring */}
            <motion.circle
              cx={node.x}
              cy={node.y}
              r={node.size}
              fill="none"
              stroke="hsl(var(--primary))"
              strokeWidth="0.1"
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{
                opacity: [0, 0.3, 0],
                scale: [1, 2, 2.5],
              }}
              transition={{
                duration: 3,
                delay: node.delay + 2,
                repeat: Infinity,
                repeatDelay: 4 + Math.random() * 3,
              }}
            />

            {/* Main node */}
            <motion.circle
              cx={node.x}
              cy={node.y}
              r={node.size * 0.4}
              fill="hsl(var(--primary))"
              filter="url(#nodeGlow)"
              initial={{ opacity: 0, scale: 0 }}
              animate={{
                opacity: [0.4, 0.8, 0.4],
                scale: [1, 1.1, 1],
              }}
              transition={{
                opacity: {
                  duration: 2 + Math.random(),
                  delay: node.delay,
                  repeat: Infinity,
                },
                scale: {
                  duration: 2 + Math.random(),
                  delay: node.delay,
                  repeat: Infinity,
                },
              }}
            />

            {/* Inner core */}
            <motion.circle
              cx={node.x}
              cy={node.y}
              r={node.size * 0.15}
              fill="hsl(var(--background))"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: node.delay + 0.3 }}
            />
          </g>
        ))}
      </svg>

      {/* Floating particles */}
      {[...Array(8)].map((_, i) => (
        <motion.div
          key={`particle-${i}`}
          className="absolute w-1 h-1 rounded-full bg-primary/30"
          style={{
            left: `${15 + i * 10}%`,
            top: `${20 + (i % 3) * 25}%`,
          }}
          animate={{
            y: [0, -20, 0],
            x: [0, i % 2 === 0 ? 10 : -10, 0],
            opacity: [0.2, 0.6, 0.2],
            scale: [1, 1.5, 1],
          }}
          transition={{
            duration: 4 + i * 0.5,
            delay: i * 0.3,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
      ))}
    </motion.div>
  );
};
