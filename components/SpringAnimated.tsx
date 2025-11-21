'use client';

import { motion, HTMLMotionProps } from 'framer-motion';
import { ReactNode } from 'react';

interface SpringAnimatedProps extends HTMLMotionProps<"div"> {
  children: ReactNode;
  className?: string;
  hoverScale?: number;
  tapScale?: number;
}

export default function SpringAnimated({ 
  children, 
  className = "",
  hoverScale = 1.05,
  tapScale = 0.95,
  ...props
}: SpringAnimatedProps) {
  return (
    <motion.div
      className={className}
      whileHover={{ scale: hoverScale }}
      whileTap={{ scale: tapScale }}
      transition={{
        type: "spring",
        stiffness: 400,
        damping: 17
      }}
      {...props}
    >
      {children}
    </motion.div>
  );
}
