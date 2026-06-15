'use client';

import { motion } from 'framer-motion';

export default function BlogHero() {
  return (
    <section className="pt-32 pb-12 px-4 sm:px-6 lg:px-8">
      <motion.div
        className="max-w-6xl mx-auto text-center"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h1 className="text-5xl sm:text-6xl font-bold font-display text-light-text dark:text-dark-text mb-4 bg-gradient-to-r from-light-accent to-light-accent-secondary dark:from-dark-accent dark:to-dark-accent-secondary bg-clip-text text-transparent">
          Blog
        </h1>
        <p className="text-lg sm:text-xl text-light-text-secondary dark:text-dark-text-secondary max-w-3xl mx-auto">
          Thoughts on AI, full-stack development, and building at scale
        </p>
      </motion.div>
    </section>
  );
}
