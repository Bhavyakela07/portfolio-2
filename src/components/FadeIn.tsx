'use client';

import React from 'react';
import { motion } from 'framer-motion';

interface FadeInProps {
  children: React.ReactNode;
  delay?: number;
  duration?: number;
  x?: number;
  y?: number;
  blur?: number; // optional blur entrance (e.g. blur={4} for 4px)
  className?: string;
  as?: React.ElementType;
}

export const FadeIn: React.FC<FadeInProps> = ({
  children,
  delay = 0,
  duration = 0.7,
  x = 0,
  y = 30,
  blur = 0,
  className = '',
  as = 'div',
}) => {
  const Component = motion.create(as as any);

  return (
    <Component
      initial={{
        opacity: 0,
        x,
        y,
        filter: blur > 0 ? `blur(${blur}px)` : 'none',
      }}
      whileInView={{
        opacity: 1,
        x: 0,
        y: 0,
        filter: blur > 0 ? 'blur(0px)' : 'none',
      }}
      viewport={{ once: true, margin: '50px', amount: 0 }}
      transition={{
        duration,
        delay,
        ease: [0.25, 0.1, 0.25, 1],
      }}
      className={className}
    >
      {children}
    </Component>
  );
};
