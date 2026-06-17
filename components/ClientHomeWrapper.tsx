'use client';

import React, { useEffect } from 'react';
import { animateHeroHeading, animateCounter, animateHeroStats } from '@/lib/animations/hero';

interface ClientHomeWrapperProps {
  children: React.ReactNode;
}

export default function ClientHomeWrapper({ children }: ClientHomeWrapperProps) {
  useEffect(() => {
    // Animate hero heading with character reveal on page load
    animateHeroHeading('[data-hero-heading]').catch(() => {
      // Silently fail if anime not loaded
    });

    // Read the real targets from the server-rendered data attributes so the
    // counters always animate to the values shown in the DOM.
    const readTarget = (selector: string, fallback: number) => {
      const el = document.querySelector(selector);
      const raw = el?.getAttribute('data-target');
      const parsed = raw != null ? parseFloat(raw) : NaN;
      return Number.isFinite(parsed) ? parsed : fallback;
    };

    // Animate stats when stats container enters viewport
    const handleStatsAnimation = async () => {
      await animateHeroStats('[data-stats-container]');
      const cgpaTarget = readTarget('[data-counter-cgpa]', 4.38);
      const projectsTarget = readTarget('[data-counter-projects]', 0);
      setTimeout(async () => {
        await animateCounter('[data-counter-cgpa]', cgpaTarget, 2000).catch(() => {});
        await animateCounter('[data-counter-projects]', projectsTarget, 1500).catch(() => {});
      }, 100);
    };

    const statsContainer = document.querySelector('[data-stats-container]');
    if (statsContainer) {
      const observer = new IntersectionObserver(([entry]) => {
        if (entry.isIntersecting) {
          const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
          if (!prefersReducedMotion) {
            handleStatsAnimation();
          }
          observer.unobserve(entry.target);
        }
      }, { threshold: 0.5 });

      observer.observe(statsContainer);

      return () => observer.disconnect();
    }

    return undefined;
  }, []);

  return <>{children}</>;
}
