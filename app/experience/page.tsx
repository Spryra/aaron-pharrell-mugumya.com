import React from 'react';
import Link from 'next/link';
import { desc } from 'drizzle-orm';
import { db } from '@/lib/db/client';
import { experience } from '@/lib/db/schema';
import Navigation from '@/components/Navigation';
import { ExperienceTimeline } from '@/components/ExperienceTimeline';
import { ErrorBoundary } from '@/components/ErrorBoundary';
import { AnimatedSection } from '@/components/AnimatedSection';
import type { Experience } from '@/lib/db/schema';

// Cache for 1 hour
export const revalidate = 3600;

async function getExperiences(): Promise<Experience[]> {
  try {
    const experiences = await db
      .select()
      .from(experience)
      .orderBy(desc(experience.endDate));
    return experiences;
  } catch (error) {
    console.error('Failed to fetch experiences:', error);
    return [];
  }
}

export const metadata = {
  title: 'Experience | Aaron Pharrell Mugumya',
  description:
    'My professional journey and academic background in AI/ML and full-stack development.',
};

export default async function ExperiencePage() {
  const experiences = await getExperiences();

  return (
    <main className="min-h-screen bg-white dark:bg-dark-bg text-light-text dark:text-dark-text transition-colors">
      <Navigation />

      {/* Section 1: Experience Hero */}
      <section className="pt-32 pb-16 px-4 sm:px-6 lg:px-8">
        <AnimatedSection className="max-w-4xl mx-auto text-center">
          <h1 className="text-5xl sm:text-6xl font-bold font-display mb-6">
            Experience &<span className="bg-gradient-to-r from-light-accent to-light-accent-secondary dark:from-dark-accent dark:to-dark-accent-secondary bg-clip-text text-transparent"> Education</span>
          </h1>
          <p className="text-lg sm:text-xl text-light-text-secondary dark:text-dark-text-secondary max-w-3xl mx-auto leading-relaxed">
            A timeline of my professional journey and academic growth
          </p>
        </AnimatedSection>
      </section>

      {/* Section 2: Experience Timeline */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto">
          {experiences.length > 0 ? (
            <ErrorBoundary fallback="Failed to load experience timeline">
              <ExperienceTimeline experiences={experiences} />
            </ErrorBoundary>
          ) : (
            <div className="text-center py-12">
              <p className="text-light-text-secondary dark:text-dark-text-secondary">
                Experience data is being prepared. Check back soon!
              </p>
            </div>
          )}
        </div>
      </section>

      {/* Section 3: Call to Action */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-light-surface dark:bg-dark-surface">
        <AnimatedSection className="max-w-4xl mx-auto text-center">
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
        </AnimatedSection>
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
