'use client';

import React, { useEffect } from 'react';
import { animateHeroHeading, animateCounter, animateHeroStats } from '@/lib/animations/hero';
import { useAnimateOnScroll } from '@/hooks/useAnimateOnScroll';

interface ClientHomeWrapperProps {
  children: React.ReactNode;
}

export default function ClientHomeWrapper({ children }: ClientHomeWrapperProps) {
  // Use the hook for stats animation on scroll
  useAnimateOnScroll<HTMLDivElement>(async () => {
    // Animate stats and counters
    await animateHeroStats('[data-stats-container]');
    setTimeout(async () => {
      await animateCounter('[data-counter-cgpa]', 4.38, 2000);
      await animateCounter('[data-counter-projects]', 2, 1500);
    }, 100);
  }, { threshold: 0.5 });

  useEffect(() => {
    // Animate hero heading with character reveal on page load
    animateHeroHeading('[data-hero-heading]').catch(() => {
      // Silently fail if anime not loaded
    });
  }, []);

  return <>{children}</>;
}
