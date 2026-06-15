'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';

export default function BlogCTA() {
  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 border-t border-light-border dark:border-dark-border">
      <motion.div
        className="max-w-4xl mx-auto text-center"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
      >
        <h2 className="text-3xl sm:text-4xl font-bold font-display text-light-text dark:text-dark-text mb-4">
          Share your thoughts?
        </h2>
        <p className="text-lg text-light-text-secondary dark:text-dark-text-secondary mb-8">
          Interested in discussing AI, development, or tech topics? I&apos;d love to hear from you.
        </p>
        <Link
          href="/contact"
          className="inline-block px-8 py-3 bg-light-accent dark:bg-dark-accent text-white font-semibold rounded-lg hover:opacity-90 transition-opacity"
        >
          Get in Touch
        </Link>
      </motion.div>
    </section>
  );
}
