let anime: any;

// Load anime.js dynamically
if (typeof window !== 'undefined') {
  import('animejs').then((module: any) => {
    anime = module.default || module;
  }).catch(() => {
    console.warn('Failed to load animejs');
  });
}

/**
 * Animate section heading with horizontal clip-path reveal
 * Creates a professional "text sliding in" effect
 */
export function animateSectionHeading(elementSelector: string): void {
  if (!anime) return; // Skip if anime not loaded

  const element = document.querySelector(elementSelector);
  if (!element) return;

  // Check prefers-reduced-motion
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    (element as HTMLElement).style.clipPath = 'inset(0 0% 0 0)';
    return;
  }

  // Initial clip-path (text hidden from right)
  (element as HTMLElement).style.clipPath = 'inset(0 100% 0 0)';

  anime({
    targets: element,
    clipPath: 'inset(0 0% 0 0)',
    duration: 1000,
    easing: 'easeOutExpo',
  });
}

/**
 * Animate multiple headings with staggered reveal
 */
export function animateSectionHeadings(containerSelector: string): void {
  const container = document.querySelector(containerSelector);
  if (!container) return;

  // Check prefers-reduced-motion
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    const headings = container.querySelectorAll('[data-animate-heading]');
    headings.forEach((heading) => {
      (heading as HTMLElement).style.clipPath = 'inset(0 0% 0 0)';
    });
    return;
  }

  const headings = container.querySelectorAll('[data-animate-heading]');

  headings.forEach((heading) => {
    (heading as HTMLElement).style.clipPath = 'inset(0 100% 0 0)';
  });

  anime({
    targets: headings,
    clipPath: 'inset(0 0% 0 0)',
    duration: 1000,
    delay: anime.stagger(100),
    easing: 'easeOutExpo',
  });
}

/**
 * Animate heading with gradient slide effect
 */
export function animateGradientHeading(elementSelector: string): void {
  const element = document.querySelector(elementSelector);
  if (!element) return;

  // Check prefers-reduced-motion
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    (element as HTMLElement).style.opacity = '1';
    return;
  }

  anime({
    targets: element,
    opacity: [0, 1],
    translateY: [30, 0],
    duration: 1000,
    easing: 'easeOutExpo',
  });
}
