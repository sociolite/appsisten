import { motion } from 'framer-motion';

interface AnimatedIconProps {
  className?: string;
  isHovered?: boolean;
}

// AI Recruiter - Scanning/searching animation with orbiting dots
export const AnimatedRecruiterIcon = ({ className, isHovered }: AnimatedIconProps) => {
  return (
    <motion.svg
      viewBox="0 0 24 24"
      fill="none"
      className={className}
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      {/* Head */}
      <motion.circle
        cx="10"
        cy="7"
        r="4"
        animate={isHovered ? { scale: [1, 1.1, 1] } : {}}
        transition={{ duration: 0.5 }}
      />
      {/* Body */}
      <motion.path
        d="M4 21v-2a4 4 0 0 1 4-4h4a4 4 0 0 1 4 4v2"
        animate={isHovered ? { pathLength: [1, 0.8, 1] } : {}}
        transition={{ duration: 0.6 }}
      />
      {/* Magnifying glass */}
      <motion.circle
        cx="18"
        cy="11"
        r="3"
        animate={{
          scale: isHovered ? [1, 1.2, 1] : 1,
          opacity: [0.8, 1, 0.8],
        }}
        transition={{ duration: 1.5, repeat: Infinity }}
      />
      <motion.line x1="20.5" y1="13.5" x2="22" y2="15" strokeWidth="2" />
      {/* Scanning line */}
      <motion.line
        x1="16"
        y1="9"
        x2="20"
        y2="9"
        stroke="currentColor"
        strokeOpacity={0.6}
        animate={{
          y1: [9, 13, 9],
          y2: [9, 13, 9],
          opacity: [0.3, 0.8, 0.3],
        }}
        transition={{ duration: 1.2, repeat: Infinity, ease: 'easeInOut' }}
      />
    </motion.svg>
  );
};

// AI Assistant - Pulsing brain/chat animation
export const AnimatedAssistantIcon = ({ className, isHovered }: AnimatedIconProps) => {
  return (
    <motion.svg
      viewBox="0 0 24 24"
      fill="none"
      className={className}
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      {/* Bot head */}
      <motion.rect
        x="3"
        y="6"
        width="18"
        height="12"
        rx="3"
        animate={isHovered ? { scale: [1, 1.05, 1] } : {}}
        transition={{ duration: 0.4 }}
      />
      {/* Left eye */}
      <motion.circle
        cx="8.5"
        cy="12"
        r="1.5"
        fill="currentColor"
        animate={{
          scale: [1, 1.3, 1],
          opacity: [0.7, 1, 0.7],
        }}
        transition={{ duration: 1.5, repeat: Infinity, delay: 0 }}
      />
      {/* Right eye */}
      <motion.circle
        cx="15.5"
        cy="12"
        r="1.5"
        fill="currentColor"
        animate={{
          scale: [1, 1.3, 1],
          opacity: [0.7, 1, 0.7],
        }}
        transition={{ duration: 1.5, repeat: Infinity, delay: 0.2 }}
      />
      {/* Antenna */}
      <motion.line x1="12" y1="6" x2="12" y2="3" />
      {/* Antenna tip */}
      <motion.circle
        cx="12"
        cy="2"
        r="1"
        fill="currentColor"
        animate={{
          scale: [1, 1.5, 1],
          opacity: [0.5, 1, 0.5],
        }}
        transition={{ duration: 0.8, repeat: Infinity }}
      />
      {/* Signal waves */}
      <motion.path
        d="M8 2.5C9 1.5 11 1 12 1"
        strokeOpacity={0.5}
        animate={{
          pathLength: [0, 1, 0],
          opacity: [0, 0.6, 0],
        }}
        transition={{ duration: 1.5, repeat: Infinity, delay: 0.3 }}
      />
      <motion.path
        d="M16 2.5C15 1.5 13 1 12 1"
        strokeOpacity={0.5}
        animate={{
          pathLength: [0, 1, 0],
          opacity: [0, 0.6, 0],
        }}
        transition={{ duration: 1.5, repeat: Infinity, delay: 0.6 }}
      />
    </motion.svg>
  );
};

// AI Document Processor - Scanning document animation
export const AnimatedDocumentIcon = ({ className, isHovered }: AnimatedIconProps) => {
  return (
    <motion.svg
      viewBox="0 0 24 24"
      fill="none"
      className={className}
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      {/* Document */}
      <motion.path
        d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"
        animate={isHovered ? { scale: [1, 1.02, 1] } : {}}
        transition={{ duration: 0.3 }}
      />
      {/* Fold corner */}
      <motion.polyline points="14 2 14 8 20 8" />
      {/* Text lines */}
      <motion.line x1="8" y1="13" x2="16" y2="13" strokeOpacity={0.6} />
      <motion.line x1="8" y1="17" x2="14" y2="17" strokeOpacity={0.6} />
      {/* Scanning beam */}
      <motion.rect
        x="5"
        y="10"
        width="14"
        height="2"
        fill="currentColor"
        fillOpacity={0.2}
        stroke="none"
        animate={{
          y: [10, 18, 10],
          opacity: [0.1, 0.4, 0.1],
        }}
        transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
      />
      {/* AI sparkle */}
      <motion.circle
        cx="18"
        cy="5"
        r="2"
        fill="currentColor"
        fillOpacity={0.3}
        stroke="none"
        animate={{
          scale: [0.8, 1.2, 0.8],
          opacity: [0.3, 0.7, 0.3],
        }}
        transition={{ duration: 1.2, repeat: Infinity }}
      />
    </motion.svg>
  );
};

// Distributed Workflows - Connected nodes animation
export const AnimatedWorkflowIcon = ({ className, isHovered }: AnimatedIconProps) => {
  return (
    <motion.svg
      viewBox="0 0 24 24"
      fill="none"
      className={className}
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      {/* Center node */}
      <motion.circle
        cx="12"
        cy="12"
        r="3"
        animate={isHovered ? { scale: [1, 1.2, 1] } : { scale: [1, 1.1, 1] }}
        transition={{ duration: 1.5, repeat: Infinity }}
      />
      {/* Top node */}
      <motion.circle
        cx="12"
        cy="4"
        r="2"
        animate={{
          opacity: [0.5, 1, 0.5],
        }}
        transition={{ duration: 1.5, repeat: Infinity, delay: 0 }}
      />
      {/* Bottom left node */}
      <motion.circle
        cx="5"
        cy="18"
        r="2"
        animate={{
          opacity: [0.5, 1, 0.5],
        }}
        transition={{ duration: 1.5, repeat: Infinity, delay: 0.3 }}
      />
      {/* Bottom right node */}
      <motion.circle
        cx="19"
        cy="18"
        r="2"
        animate={{
          opacity: [0.5, 1, 0.5],
        }}
        transition={{ duration: 1.5, repeat: Infinity, delay: 0.6 }}
      />
      {/* Connection lines */}
      <motion.line
        x1="12"
        y1="9"
        x2="12"
        y2="6"
        animate={{
          pathLength: [0.5, 1, 0.5],
          opacity: [0.3, 0.8, 0.3],
        }}
        transition={{ duration: 1.5, repeat: Infinity, delay: 0 }}
      />
      <motion.line
        x1="9.5"
        y1="14"
        x2="6.5"
        y2="16.5"
        animate={{
          pathLength: [0.5, 1, 0.5],
          opacity: [0.3, 0.8, 0.3],
        }}
        transition={{ duration: 1.5, repeat: Infinity, delay: 0.3 }}
      />
      <motion.line
        x1="14.5"
        y1="14"
        x2="17.5"
        y2="16.5"
        animate={{
          pathLength: [0.5, 1, 0.5],
          opacity: [0.3, 0.8, 0.3],
        }}
        transition={{ duration: 1.5, repeat: Infinity, delay: 0.6 }}
      />
      {/* Data flow particles */}
      <motion.circle
        cx="12"
        cy="7"
        r="0.5"
        fill="currentColor"
        animate={{
          cy: [9, 6, 9],
          opacity: [0, 1, 0],
        }}
        transition={{ duration: 1, repeat: Infinity }}
      />
    </motion.svg>
  );
};
