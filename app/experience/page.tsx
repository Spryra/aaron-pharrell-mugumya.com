'use client'

import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { ExperienceTimeline } from '@/components/ExperienceTimeline'
import { ThemeToggle } from '@/components/ThemeToggle'
import { ErrorBoundary } from '@/components/ErrorBoundary'
import type { Experience } from '@/lib/db/schema'

export default function ExperiencePage() {
  const [experiences, setExperiences] = useState<Experience[]>([])
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchExperiences = async () => {
      try {
        const response = await fetch('/api/experience')
        if (!response.ok) throw new Error('Failed to fetch')
        const data = await response.json()
        setExperiences(data)
      } catch (err) {
        setError('Failed to load experiences. Please refresh the page.')
        console.error('Experience fetch error:', err)
      } finally {
        setLoading(false)
      }
    }
    fetchExperiences()
  }, [])

  if (loading) {
    return (
      <main className="min-h-screen bg-white dark:bg-dark-bg text-light-text dark:text-dark-text transition-colors flex items-center justify-center">
        <p>Loading...</p>
      </main>
    )
  }
  return (
    <main className="min-h-screen bg-white dark:bg-dark-bg text-light-text dark:text-dark-text transition-colors">
      {/* Navigation */}
      <nav className="fixed w-full top-0 z-50 bg-white/80 dark:bg-dark-bg/80 backdrop-blur-md border-b border-light-border dark:border-dark-border">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <Link href="/" className="text-xl font-bold bg-gradient-to-r from-light-accent to-light-accent-secondary dark:from-dark-accent dark:to-dark-accent-secondary bg-clip-text text-transparent hover:opacity-80 transition">
            Aaron
          </Link>
          <div className="flex gap-6 items-center">
            <Link href="/about" className="hover:text-light-accent dark:hover:text-dark-accent transition font-medium">
              About
            </Link>
            <Link href="/experience" className="hover:text-light-accent dark:hover:text-dark-accent transition font-medium">
              Experience
            </Link>
            <Link href="/projects" className="hover:text-light-accent dark:hover:text-dark-accent transition">
              Projects
            </Link>
            <Link href="/blog" className="hover:text-light-accent dark:hover:text-dark-accent transition">
              Blog
            </Link>
            <Link href="/contact" className="hover:text-light-accent dark:hover:text-dark-accent transition">
              Contact
            </Link>
            <ThemeToggle />
          </div>
        </div>
      </nav>

      {/* Section 1: Experience Hero */}
      <section className="pt-32 pb-16 px-4 sm:px-6 lg:px-8">
        <motion.div
          className="max-w-4xl mx-auto text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h1 className="text-5xl sm:text-6xl font-bold font-display mb-6">
            Experience &<span className="bg-gradient-to-r from-light-accent to-light-accent-secondary dark:from-dark-accent dark:to-dark-accent-secondary bg-clip-text text-transparent"> Education</span>
          </h1>
          <p className="text-lg sm:text-xl text-light-text-secondary dark:text-dark-text-secondary max-w-3xl mx-auto leading-relaxed">
            A timeline of my professional journey and academic growth
          </p>
        </motion.div>
      </section>

      {/* Section 2: Experience Timeline */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto">
          {error ? (
            <div className="bg-red-50 dark:bg-red-950 p-4 rounded text-red-800 dark:text-red-200">
              {error}
            </div>
          ) : experiences.length > 0 ? (
            <ErrorBoundary fallback="Failed to load experience timeline">
              <ExperienceTimeline experiences={experiences} />
            </ErrorBoundary>
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-12"
            >
              <p className="text-light-text-secondary dark:text-dark-text-secondary">
                Experience data is being prepared. Check back soon!
              </p>
            </motion.div>
          )}
        </div>
      </section>

      {/* Section 3: Call to Action */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-light-surface dark:bg-dark-surface">
        <motion.div
          className="max-w-4xl mx-auto text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl font-bold font-display mb-6">
            Open to <span className="bg-gradient-to-r from-light-accent to-light-accent-secondary dark:from-dark-accent dark:to-dark-accent-secondary bg-clip-text text-transparent">Opportunities</span>
          </h2>
          <p className="text-lg text-light-text-secondary dark:text-dark-text-secondary max-w-2xl mx-auto mb-12">
            Let&apos;s collaborate on AI/ML projects or discuss career opportunities that make an impact.
          </p>

          <Link
            href="/contact"
            className="inline-block px-8 py-3 bg-light-accent dark:bg-dark-accent text-white rounded-lg font-semibold hover:opacity-90 transition duration-300"
          >
            Get in Touch
          </Link>
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
  )
}
