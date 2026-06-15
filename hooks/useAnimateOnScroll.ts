'use client';

import { useEffect, useRef, RefObject } from 'react';

interface UseAnimateOnScrollOptions {
  threshold?: number | number[];
  rootMargin?: string;
  once?: boolean;
}

/**
 * Custom hook to trigger animations when element enters viewport
 * Respects prefers-reduced-motion media query
 *
 * @param callback - Function to call when element enters viewport
 * @param options - IntersectionObserver options
 * @returns Ref to attach to the element
 *
 * @example
 * const ref = useAnimateOnScroll(() => {
 *   animateSectionHeading('[data-heading]');
 * }, { threshold: 0.3 });
 *
 * return <div ref={ref} data-heading>My Heading</div>;
 */
export function useAnimateOnScroll<T extends HTMLElement>(
  callback: () => void,
  options: UseAnimateOnScrollOptions = {}
): RefObject<T> {
  const ref = useRef<T>(null);
  const hasAnimated = useRef(false);

  const { threshold = 0.3, rootMargin = '0px', once = true } = options;

  useEffect(() => {
    if (!ref.current) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && (!once || !hasAnimated.current)) {
          // Check prefers-reduced-motion
          const prefersReducedMotion = window.matchMedia(
            '(prefers-reduced-motion: reduce)'
          ).matches;

          if (!prefersReducedMotion) {
            callback();
            hasAnimated.current = true;
          }

          if (once) {
            observer.unobserve(entry.target);
          }
        }
      },
      {
        threshold,
        rootMargin,
      }
    );

    observer.observe(ref.current);

    return () => {
      observer.disconnect();
    };
  }, [callback, threshold, rootMargin, once]);

  return ref;
}

/**
 * Hook to trigger animation on element visibility without ref management
 * Useful when you have direct control over the element
 *
 * @param selector - CSS selector for the element
 * @param callback - Function to call when element becomes visible
 * @param options - IntersectionObserver options
 */
export function useAnimateElementOnScroll(
  selector: string,
  callback: () => void,
  options: UseAnimateOnScrollOptions = {}
): void {
  const { threshold = 0.3, rootMargin = '0px', once = true } = options;
  const hasAnimated = useRef(false);

  useEffect(() => {
    const element = document.querySelector(selector);
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && (!once || !hasAnimated.current)) {
          // Check prefers-reduced-motion
          const prefersReducedMotion = window.matchMedia(
            '(prefers-reduced-motion: reduce)'
          ).matches;

          if (!prefersReducedMotion) {
            callback();
            hasAnimated.current = true;
          }

          if (once) {
            observer.unobserve(entry.target);
          }
        }
      },
      {
        threshold,
        rootMargin,
      }
    );

    observer.observe(element);

    return () => {
      observer.disconnect();
    };
  }, [selector, callback, threshold, rootMargin, once]);
}
