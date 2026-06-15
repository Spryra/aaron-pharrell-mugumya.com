'use client';

import { ReactNode } from 'react';
import { animateSectionHeading } from '@/lib/animations/headings';
import { useAnimateOnScroll } from '@/hooks/useAnimateOnScroll';

interface AboutSectionWrapperProps {
  children: ReactNode;
  headingSelector?: string;
  className?: string;
}

export default function AboutSectionWrapper({
  children,
  headingSelector = '[data-section-heading]',
  className = '',
}: AboutSectionWrapperProps) {
  const sectionRef = useAnimateOnScroll<HTMLDivElement>(() => {
    animateSectionHeading(headingSelector);
  }, { threshold: 0.3 });

  return (
    <div ref={sectionRef} className={className}>
      {children}
    </div>
  );
}
