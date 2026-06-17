'use client'

import React, { useEffect } from 'react'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { initExperienceAnimations } from '@/lib/animations/experience'
import type { Experience } from '@/lib/db/schema'

interface ExperienceTimelineProps {
  experiences: Experience[]
}

export function ExperienceTimeline({ experiences }: ExperienceTimelineProps) {
  // Initialize animations on mount
  useEffect(() => {
    initExperienceAnimations().catch(() => {
      // Silently fail if animations fail to load
    });
  }, []);

  // Data is already sorted server-side, but keep sorting for client-side safety
  const sortedExperiences = [...experiences].sort((a, b) => {
    const aOrder = a.sortOrder ?? 0
    const bOrder = b.sortOrder ?? 0
    return bOrder - aOrder
  })

  return (
    <div className="space-y-12">
      {sortedExperiences.map((exp, index) => (
        <motion.div
          key={exp.id}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: index * 0.1 }}
          viewport={{ once: true }}
          className="relative"
          data-experience-item
        >
          {/* Desktop: 2-column layout */}
          <div className="hidden md:grid md:grid-cols-[120px_1fr] gap-8">
            {/* Left: Logo and Timeline Line */}
            <div className="flex flex-col items-center">
              {/* Logo */}
              <div className="mb-6 relative">
                <div
                  data-experience-logo
                  className="w-20 h-20 rounded-[12px] overflow-hidden bg-light-surface dark:bg-dark-surface shadow-md hover:shadow-lg transition-shadow"
                >
                  <Image
                    src={exp.logoUrl}
                    alt={exp.logoAlt}
                    width={80}
                    height={80}
                    className="w-full h-full object-cover"
                    quality={85}
                  />
                </div>
              </div>

              {/* Timeline line */}
              {index < sortedExperiences.length - 1 && (
                <div className="w-1 h-24 bg-gradient-to-b from-light-accent to-transparent dark:from-dark-accent dark:to-transparent" data-timeline-line />
              )}
            </div>

            {/* Right: Content */}
            <div className="pt-2 pb-8">
              <h3 className="text-2xl font-bold text-light-accent dark:text-dark-accent mb-1" data-company-name>
                {exp.company}
              </h3>
              <p className="text-lg text-light-text dark:text-dark-text font-semibold mb-2">
                {exp.role}
              </p>
              <p className="text-sm text-light-text-secondary dark:text-dark-text-secondary italic mb-4">
                {exp.startDate} — {exp.endDate || 'Present'}
              </p>
              <p className="text-base text-light-text-secondary dark:text-dark-text-secondary leading-relaxed mb-4">
                {exp.description}
              </p>

              {/* Bullet points */}
              {exp.descriptionBullets && exp.descriptionBullets.length > 0 && (
                <ul className="space-y-2 text-sm text-light-text-secondary dark:text-dark-text-secondary">
                  {exp.descriptionBullets.map((bullet, bulletIndex) => (
                    <li key={bulletIndex} className="flex gap-3">
                      <span className="text-light-accent dark:text-dark-accent flex-shrink-0 mt-1">•</span>
                      <span>{bullet}</span>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>

          {/* Mobile: Single column layout */}
          <div className="md:hidden">
            {/* Vertical timeline line */}
            <div className="relative ml-10">
              {index < sortedExperiences.length - 1 && (
                <div className="absolute left-0 top-0 w-0.5 h-full -ml-[13px] bg-gradient-to-b from-light-accent to-transparent dark:from-dark-accent dark:to-transparent" data-timeline-line />
              )}

              {/* Logo */}
              <div className="mb-6 relative -ml-10">
                <div
                  data-experience-logo
                  className="w-16 h-16 rounded-[12px] overflow-hidden bg-light-surface dark:bg-dark-surface shadow-md hover:shadow-lg transition-shadow"
                >
                  <Image
                    src={exp.logoUrl}
                    alt={exp.logoAlt}
                    width={60}
                    height={60}
                    className="w-full h-full object-cover"
                    quality={85}
                  />
                </div>
              </div>

              {/* Content */}
              <div className="space-y-2">
                <h3 className="text-xl font-bold text-light-accent dark:text-dark-accent" data-company-name>
                  {exp.company}
                </h3>
                <p className="text-base text-light-text dark:text-dark-text font-semibold">
                  {exp.role}
                </p>
                <p className="text-xs text-light-text-secondary dark:text-dark-text-secondary italic">
                  {exp.startDate} — {exp.endDate || 'Present'}
                </p>
                <p className="text-sm text-light-text-secondary dark:text-dark-text-secondary leading-relaxed pt-2">
                  {exp.description}
                </p>

                {/* Bullet points */}
                {exp.descriptionBullets && exp.descriptionBullets.length > 0 && (
                  <ul className="space-y-1.5 text-xs text-light-text-secondary dark:text-dark-text-secondary pt-2">
                    {exp.descriptionBullets.map((bullet, bulletIndex) => (
                      <li key={bulletIndex} className="flex gap-2">
                        <span className="text-light-accent dark:text-dark-accent flex-shrink-0">•</span>
                        <span>{bullet}</span>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  );
}
