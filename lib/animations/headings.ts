let anime: any;

// Load anime.js dynamically with a small delay to ensure it's available
const animePromise = typeof window !== 'undefined'
  ? import('animejs').then((module: any) => {
      anime = module.default || module;
      if (typeof anime !== 'function') {
        console.warn('anime.js loaded but is not a function', anime);
        return null;
      }
      return anime;
    }).catch((error) => {
      console.warn('Failed to load animejs:', error);
      return null;
    })
  : Promise.resolve(null);

/**
 * Animate section heading with horizontal clip-path reveal
 * Creates a professional "curtain opening" effect
 * Text slides in from right, stops at full visibility
 */
export async function animateSectionHeading(elementSelector: string): Promise<void> {
  const animeLib = await animePromise;
  if (!animeLib) return;

  const element = document.querySelector(elementSelector);
  if (!element) return;

  // Check prefers-reduced-motion
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    (element as HTMLElement).style.clipPath = 'inset(0 0% 0 0)';
    return;
  }

  // Initial state: text hidden from right
  (element as HTMLElement).style.clipPath = 'inset(0 100% 0 0)';

  // Animate clip-path from hidden to visible
  animeLib({
    targets: element,
    clipPath: 'inset(0 0% 0 0)',
    duration: 1000,
    easing: 'easeOutExpo',
  });
}

/**
 * Animate multiple headings with staggered reveal
 */
export async function animateSectionHeadings(containerSelector: string): Promise<void> {
  const animeLib = await animePromise;
  if (!animeLib) return;

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

  animeLib({
    targets: headings,
    clipPath: 'inset(0 0% 0 0)',
    duration: 1000,
    delay: animeLib.stagger(100),
    easing: 'easeOutExpo',
  });
}

/**
 * Animate heading with gradient slide effect
 */
export async function animateGradientHeading(elementSelector: string): Promise<void> {
  const animeLib = await animePromise;
  if (!animeLib) return;

  const element = document.querySelector(elementSelector);
  if (!element) return;

  // Check prefers-reduced-motion
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    (element as HTMLElement).style.opacity = '1';
    return;
  }

  animeLib({
    targets: element,
    opacity: [0, 1],
    translateY: [30, 0],
    duration: 1000,
    easing: 'easeOutExpo',
  });
}
