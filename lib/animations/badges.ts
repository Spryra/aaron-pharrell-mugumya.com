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
 * Animate skill badges with playful pop-in elastic overshoot effect
 * Elastic(1, 0.6) creates satisfying bounce - signals category transition with delight
 */
export async function animateBadges(containerSelector: string): Promise<void> {
  const animeLib = await animePromise;
  if (!animeLib) return;

  const container = document.querySelector(containerSelector);
  if (!container) return;

  // Check prefers-reduced-motion
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    const badges = container.querySelectorAll('[data-animate-badge]');
    badges.forEach((badge) => {
      (badge as HTMLElement).style.opacity = '1';
      (badge as HTMLElement).style.transform = 'scale(1)';
    });
    return;
  }

  const badges = container.querySelectorAll('[data-animate-badge]');

  animeLib({
    targets: badges,
    opacity: [0, 1],
    scale: [0.5, 1],
    duration: 600,
    delay: animeLib.stagger(50),
    easing: 'easeOutElastic(1, 0.6)',
  });
}

/**
 * Animate tech stack badges with sequential pop effect
 */
export async function animateTechBadges(containerSelector: string): Promise<void> {
  const animeLib = await animePromise;
  if (!animeLib) return;

  const container = document.querySelector(containerSelector);
  if (!container) return;

  // Check prefers-reduced-motion
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    const badges = container.querySelectorAll('[data-tech-badge]');
    badges.forEach((badge) => {
      (badge as HTMLElement).style.opacity = '1';
      (badge as HTMLElement).style.transform = 'scale(1)';
    });
    return;
  }

  const badges = container.querySelectorAll('[data-tech-badge]');

  animeLib({
    targets: badges,
    opacity: [0, 1],
    scale: [0.3, 1],
    duration: 500,
    delay: animeLib.stagger(40),
    easing: 'easeOutElastic(1, 0.7)',
  });
}

/**
 * Animate badges with fade and scale effect (less elastic, more professional)
 */
export async function animateProfessionalBadges(containerSelector: string): Promise<void> {
  const animeLib = await animePromise;
  if (!animeLib) return;

  const container = document.querySelector(containerSelector);
  if (!container) return;

  // Check prefers-reduced-motion
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    const badges = container.querySelectorAll('[data-badge]');
    badges.forEach((badge) => {
      (badge as HTMLElement).style.opacity = '1';
      (badge as HTMLElement).style.transform = 'scale(1)';
    });
    return;
  }

  const badges = container.querySelectorAll('[data-badge]');

  animeLib({
    targets: badges,
    opacity: [0, 1],
    scale: [0.7, 1],
    duration: 400,
    delay: animeLib.stagger(30),
    easing: 'easeOutQuad',
  });
}
