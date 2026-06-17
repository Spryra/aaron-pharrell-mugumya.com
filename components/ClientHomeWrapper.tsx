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

    // Animate stats when stats container enters viewport
    const handleStatsAnimation = async () => {
      await animateHeroStats('[data-stats-container]');
      setTimeout(async () => {
        await animateCounter('[data-counter-cgpa]', 4.38, 2000).catch(() => {});
        await animateCounter('[data-counter-projects]', 2, 1500).catch(() => {});
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
  }, []);

  return <>{children}</>;
}
