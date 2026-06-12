'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';

export default function ProjectsCTA() {
  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-light-surface dark:bg-dark-surface">
      <motion.div
        className="max-w-4xl mx-auto text-center"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        <h2 className="text-4xl font-bold font-display mb-6">
          Got a project in <span className="bg-gradient-to-r from-light-accent to-light-accent-secondary dark:from-dark-accent dark:to-dark-accent-secondary bg-clip-text text-transparent">mind</span>?
        </h2>
        <p className="text-lg text-light-text-secondary dark:text-dark-text-secondary max-w-2xl mx-auto mb-12">
          Let&apos;s discuss how I can help you build something amazing.
        </p>

        <Link
          href="/contact"
          className="inline-block px-8 py-3 bg-light-accent dark:bg-dark-accent text-white rounded-lg font-semibold hover:opacity-90 transition duration-300"
        >
          Get in Touch
        </Link>
      </motion.div>
    </section>
  );
}
