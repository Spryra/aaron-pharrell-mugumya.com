'use client';

import { motion } from 'framer-motion';

export default function ProjectsHero() {
  return (
    <section className="pt-32 pb-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto text-center">
        <motion.h1
          className="text-5xl sm:text-6xl font-bold font-display mb-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          My <span className="bg-gradient-to-r from-light-accent to-light-accent-secondary dark:from-dark-accent dark:to-dark-accent-secondary bg-clip-text text-transparent">Projects</span>
        </motion.h1>
        <motion.p
          className="text-lg sm:text-xl text-light-text-secondary dark:text-dark-text-secondary max-w-3xl mx-auto leading-relaxed"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1 }}
        >
          A collection of AI/ML and full-stack projects I&apos;ve built, from voice cloning platforms to intelligent game AI.
        </motion.p>
      </div>
    </section>
  );
}
