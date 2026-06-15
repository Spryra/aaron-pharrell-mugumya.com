'use client';

import React from 'react';
import { motion } from 'framer-motion';

interface AnimatedParagraphProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}

export function AnimatedParagraph({
  children,
  className = '',
  delay = 0,
}: AnimatedParagraphProps) {
  return (
    <motion.p
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay }}
      viewport={{ once: true }}
      className={className}
    >
      {children}
    </motion.p>
  );
}
