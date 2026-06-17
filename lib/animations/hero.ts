let anime: any;

// Load anime.js dynamically with a small delay to ensure it's available
const animePromise = typeof window !== 'undefined'
  ? import('animejs').then((module: any) => {
      // anime.js default export is the anime function
      anime = module.default || module;
      // Verify it's callable
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
 * Animate hero heading with character-level reveal
 * Each character fades in and translates up in sequence
 */
export async function animateHeroHeading(elementSelector: string): Promise<void> {
  const animeLib = await animePromise;
  if (!animeLib) return;

  const element = document.querySelector(elementSelector);
  if (!element) return;

  // Check prefers-reduced-motion
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    (element as HTMLElement).style.opacity = '1';
    return;
  }

  // Animate the heading's line spans (preserving the gradient markup and
  // line breaks) rather than rebuilding it character-by-character, which
  // would strip spaces, line breaks, and the gradient styling.
  const lines = element.querySelectorAll('[data-hero-line]');
  const targets = lines.length ? lines : [element];

  animeLib({
    targets,
    opacity: [0, 1],
    translateY: [24, 0],
    duration: 800,
    delay: animeLib.stagger(120),
    easing: 'easeOutExpo',
  });
}

/**
 * Animate counter from 0 to target value
 * Used for CGPA and project counts
 */
export async function animateCounter(
  elementSelector: string,
  targetValue: number,
  duration: number = 2000
): Promise<void> {
  const animeLib = await animePromise;
  if (!animeLib) return;

  const el = document.querySelector(elementSelector);
  if (!el) return;

  // Whole numbers (project counts) render as integers; values with a
  // fractional part (e.g. CGPA 4.38) keep two decimals.
  const isDecimal = !Number.isInteger(targetValue);
  const format = (v: number) =>
    isDecimal ? v.toFixed(2) : Math.round(v).toString();

  // Check prefers-reduced-motion — show the final value immediately.
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    el.textContent = format(targetValue);
    return;
  }

  // Animate a plain object's `value` and read it back in update(). In
  // anime.js v3, `anim.progress` is 0–100, so reading the eased target
  // value directly is the reliable way to drive the counter.
  const counter = { value: 0 };
  animeLib({
    targets: counter,
    value: targetValue,
    duration,
    easing: 'easeOutExpo',
    update() {
      el.textContent = format(counter.value);
    },
    complete() {
      el.textContent = format(targetValue);
    },
  });
}

/**
 * Animate hero stats section with staggered appearance
 */
export async function animateHeroStats(containerSelector: string): Promise<void> {
  const animeLib = await animePromise;
  if (!animeLib) return;

  const container = document.querySelector(containerSelector);
  if (!container) return;

  // Check prefers-reduced-motion
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    (container as HTMLElement).style.opacity = '1';
    return;
  }

  animeLib({
    targets: container,
    opacity: [0, 1],
    translateY: [20, 0],
    duration: 600,
    easing: 'easeOutQuad',
    delay: 200,
  });
}
