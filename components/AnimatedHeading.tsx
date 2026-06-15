'use client';

import React from 'react';
import { motion } from 'framer-motion';

interface AnimatedHeadingProps {
  level?: 1 | 2 | 3 | 4 | 5 | 6;
  children: React.ReactNode;
  className?: string;
  delay?: number;
}

export function AnimatedHeading({
  level = 2,
  children,
  className = '',
  delay = 0,
}: AnimatedHeadingProps) {
  const HeadingTag = (`h${level}` as const) as keyof JSX.IntrinsicElements;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay }}
      viewport={{ once: true }}
    >
      {React.createElement(HeadingTag, { className }, children)}
    </motion.div>
  );
}
