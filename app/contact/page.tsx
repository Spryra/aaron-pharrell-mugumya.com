'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Mail, Github, Linkedin, Clock } from 'lucide-react';
import Navigation from '@/components/Navigation';
import ContactForm from '@/components/ContactForm';

export default function ContactPage() {
  return (
    <main className="min-h-screen bg-white dark:bg-dark-bg text-light-text dark:text-dark-text transition-colors">
      <Navigation />

      {/* Section 1: Contact Hero */}
      <section className="pt-32 pb-16 px-4 sm:px-6 lg:px-8">
        <motion.div
          className="max-w-4xl mx-auto text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h1 className="text-5xl sm:text-6xl font-bold font-display mb-6">
            Get in <span className="bg-gradient-to-r from-light-accent to-light-accent-secondary dark:from-dark-accent dark:to-dark-accent-secondary bg-clip-text text-transparent">Touch</span>
          </h1>
          <p className="text-lg sm:text-xl text-light-text-secondary dark:text-dark-text-secondary max-w-3xl mx-auto leading-relaxed">
            Have a project in mind or just want to chat? I&apos;d love to hear from you.
            Whether it&apos;s collaboration, mentorship, or something else entirely, let&apos;s
            connect.
          </p>
        </motion.div>
      </section>

      {/* Section 2: Contact Form */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <div className="bg-light-surface dark:bg-dark-surface rounded-xl border border-light-border dark:border-dark-border p-8 sm:p-12">
              <ContactForm />
            </div>
          </motion.div>
        </div>
      </section>

      {/* Section 3: Alternative Contact Methods */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-light-surface dark:bg-dark-surface">
        <div className="max-w-6xl mx-auto">
          <motion.h2
            className="text-4xl font-bold font-display mb-12 text-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            Other Ways to <span className="bg-gradient-to-r from-light-accent to-light-accent-secondary dark:from-dark-accent dark:to-dark-accent-secondary bg-clip-text text-transparent">Connect</span>
          </motion.h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Email */}
            <motion.a
              href={`mailto:${process.env.NEXT_PUBLIC_CONTACT_EMAIL}`}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              viewport={{ once: true }}
              className="group p-8 bg-white dark:bg-dark-bg rounded-xl border border-light-border dark:border-dark-border hover:shadow-lg hover:border-light-accent dark:hover:border-dark-accent transition-all duration-300"
            >
              <div className="mb-4 inline-block p-3 bg-light-accent/10 dark:bg-dark-accent/10 rounded-lg group-hover:bg-light-accent group-hover:text-white dark:group-hover:bg-dark-accent dark:group-hover:text-dark-bg transition-colors duration-300">
                <Mail
                  size={24}
                  className="text-light-accent dark:text-dark-accent group-hover:text-white dark:group-hover:text-dark-bg transition-colors duration-300"
                />
              </div>
              <h3 className="text-xl font-bold font-display text-light-text dark:text-dark-text mb-2">
                Email
              </h3>
              <p className="text-light-text-secondary dark:text-dark-text-secondary mb-4">
                {process.env.NEXT_PUBLIC_CONTACT_EMAIL}
              </p>
              <span className="inline-block px-3 py-1 bg-light-accent/10 dark:bg-dark-accent/10 text-light-accent dark:text-dark-accent text-sm font-medium rounded-full group-hover:bg-light-accent group-hover:text-white dark:group-hover:bg-dark-accent dark:group-hover:text-dark-bg transition-colors duration-300">
                Send Email
              </span>
            </motion.a>

            {/* GitHub */}
            <motion.a
              href="https://github.com/Spryra"
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
              className="group p-8 bg-white dark:bg-dark-bg rounded-xl border border-light-border dark:border-dark-border hover:shadow-lg hover:border-light-accent dark:hover:border-dark-accent transition-all duration-300"
            >
              <div className="mb-4 inline-block p-3 bg-light-accent/10 dark:bg-dark-accent/10 rounded-lg group-hover:bg-light-accent group-hover:text-white dark:group-hover:bg-dark-accent dark:group-hover:text-dark-bg transition-colors duration-300">
                <Github
                  size={24}
                  className="text-light-accent dark:text-dark-accent group-hover:text-white dark:group-hover:text-dark-bg transition-colors duration-300"
                />
              </div>
              <h3 className="text-xl font-bold font-display text-light-text dark:text-dark-text mb-2">
                GitHub
              </h3>
              <p className="text-light-text-secondary dark:text-dark-text-secondary mb-4">
                View my projects and contributions
              </p>
              <span className="inline-block px-3 py-1 bg-light-accent/10 dark:bg-dark-accent/10 text-light-accent dark:text-dark-accent text-sm font-medium rounded-full group-hover:bg-light-accent group-hover:text-white dark:group-hover:bg-dark-accent dark:group-hover:text-dark-bg transition-colors duration-300">
                Visit Profile
              </span>
            </motion.a>

            {/* LinkedIn */}
            <motion.a
              href="https://linkedin.com/in/aaron-pharrell-mugumya"
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              viewport={{ once: true }}
              className="group p-8 bg-white dark:bg-dark-bg rounded-xl border border-light-border dark:border-dark-border hover:shadow-lg hover:border-light-accent dark:hover:border-dark-accent transition-all duration-300"
            >
              <div className="mb-4 inline-block p-3 bg-light-accent/10 dark:bg-dark-accent/10 rounded-lg group-hover:bg-light-accent group-hover:text-white dark:group-hover:bg-dark-accent dark:group-hover:text-dark-bg transition-colors duration-300">
                <Linkedin
                  size={24}
                  className="text-light-accent dark:text-dark-accent group-hover:text-white dark:group-hover:text-dark-bg transition-colors duration-300"
                />
              </div>
              <h3 className="text-xl font-bold font-display text-light-text dark:text-dark-text mb-2">
                LinkedIn
              </h3>
              <p className="text-light-text-secondary dark:text-dark-text-secondary mb-4">
                Connect with me professionally
              </p>
              <span className="inline-block px-3 py-1 bg-light-accent/10 dark:bg-dark-accent/10 text-light-accent dark:text-dark-accent text-sm font-medium rounded-full group-hover:bg-light-accent group-hover:text-white dark:group-hover:bg-dark-accent dark:group-hover:text-dark-bg transition-colors duration-300">
                Connect
              </span>
            </motion.a>
          </div>
        </div>
      </section>

      {/* Section 4: Response Time Expectations */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <motion.div
          className="max-w-3xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <div className="bg-light-surface dark:bg-dark-surface rounded-xl border border-light-border dark:border-dark-border p-8 flex gap-4">
            <div className="flex-shrink-0">
              <Clock className="text-light-accent dark:text-dark-accent" size={28} />
            </div>
            <div>
              <h3 className="text-xl font-bold font-display text-light-text dark:text-dark-text mb-2">
                What to Expect
              </h3>
              <p className="text-light-text-secondary dark:text-dark-text-secondary leading-relaxed">
                I typically respond to all messages within 24-48 hours. Whether you&apos;re
                reaching out about a project, collaboration opportunity, or just to say hi,
                I value every inquiry and will do my best to respond thoughtfully. If you
                don&apos;t hear from me within 48 hours, please feel free to reach out via
                LinkedIn or GitHub.
              </p>
            </div>
          </div>
        </motion.div>
      </section>

      {/* Footer */}
      <footer className="border-t border-light-border dark:border-dark-border py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto text-center text-light-text-secondary dark:text-dark-text-secondary text-sm">
          <p>
            Built by{' '}
            <a
              href="https://jrcom.vercel.app/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-light-accent dark:text-dark-accent hover:underline font-semibold"
            >
              Junior Reactive Company
            </a>{' '}
            · Pharrell Aaron Mugumya
          </p>
        </div>
      </footer>
    </main>
  );
}
