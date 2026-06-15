'use client';

import React from 'react';
import { motion } from 'framer-motion';

interface AnimatedSectionProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  variant?: 'default' | 'slide-left' | 'slide-right';
}

export function AnimatedSection({
  children,
  className = '',
  delay = 0,
  variant = 'default',
}: AnimatedSectionProps) {
  const variants = {
    default: { initial: { opacity: 0, y: 20 }, animate: { opacity: 1, y: 0 } },
    'slide-left': { initial: { opacity: 0, x: -20 }, animate: { opacity: 1, x: 0 } },
    'slide-right': { initial: { opacity: 0, x: 20 }, animate: { opacity: 1, x: 0 } },
  };

  const selectedVariant = variants[variant];

  return (
    <motion.div
      initial={selectedVariant.initial}
      whileInView={selectedVariant.animate}
      transition={{ duration: 0.6, delay }}
      viewport={{ once: true }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
