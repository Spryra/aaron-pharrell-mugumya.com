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
 * Animate cards with staggered cascade effect
 * Cards slide in with slight left/right offset and fade in
 */
export async function animateCardsCascade(containerSelector: string): Promise<void> {
  const animeLib = await animePromise;
  if (!animeLib) return;

  const container = document.querySelector(containerSelector);
  if (!container) return;

  // Check prefers-reduced-motion
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    const cards = container.querySelectorAll('[data-animate-card]');
    cards.forEach((card) => {
      (card as HTMLElement).style.opacity = '1';
      (card as HTMLElement).style.transform = 'translateY(0) translateX(0)';
    });
    return;
  }

  const cards = container.querySelectorAll('[data-animate-card]');

  animeLib({
    targets: cards,
    opacity: [0, 1],
    translateY: [40, 0],
    translateX: ((_el: any, i: number) => {
      return i % 2 === 0 ? [20, 0] : [-20, 0];
    }) as any,
    duration: 800,
    delay: animeLib.stagger(100),
    easing: 'easeOutQuad',
  });
}

/**
 * Animate blog cards with fade and slide effect
 */
export async function animateBlogCards(containerSelector: string): Promise<void> {
  const animeLib = await animePromise;
  if (!animeLib) return;

  const container = document.querySelector(containerSelector);
  if (!container) return;

  // Check prefers-reduced-motion
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    const cards = container.querySelectorAll('[data-blog-card]');
    cards.forEach((card) => {
      (card as HTMLElement).style.opacity = '1';
      (card as HTMLElement).style.transform = 'translateY(0)';
    });
    return;
  }

  const cards = container.querySelectorAll('[data-blog-card]');

  animeLib({
    targets: cards,
    opacity: [0, 1],
    translateY: [30, 0],
    duration: 700,
    delay: animeLib.stagger(80),
    easing: 'easeOutQuad',
  });
}

/**
 * Animate project cards with prominent cascade
 * Projects are the showcase work, so they get the most dramatic entrance
 * Deepest offset (50px), longest duration (900ms), widest stagger (120ms)
 */
export async function animateProjectCards(containerSelector: string): Promise<void> {
  const animeLib = await animePromise;
  if (!animeLib) return;

  const container = document.querySelector(containerSelector);
  if (!container) return;

  // Check prefers-reduced-motion
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    const cards = container.querySelectorAll('[data-project-card]');
    cards.forEach((card) => {
      (card as HTMLElement).style.opacity = '1';
      (card as HTMLElement).style.transform = 'translateY(0)';
    });
    return;
  }

  const cards = container.querySelectorAll('[data-project-card]');

  animeLib({
    targets: cards,
    opacity: [0, 1],
    translateY: [50, 0],
    duration: 900,
    delay: animeLib.stagger(120),
    easing: 'easeOutExpo',
  });
}

/**
 * Animate cards with hover effect setup
 */
export async function setupCardHoverAnimation(containerSelector: string): Promise<void> {
  const animeLib = await animePromise;
  if (!animeLib) return;

  const container = document.querySelector(containerSelector);
  if (!container) return;

  const cards = container.querySelectorAll('[data-animate-card], [data-blog-card], [data-project-card]');

  cards.forEach((card) => {
    (card as HTMLElement).addEventListener('mouseenter', () => {
      animeLib({
        targets: card,
        scale: [1, 1.03],
        duration: 300,
        easing: 'easeOutQuad',
      });
    });

    (card as HTMLElement).addEventListener('mouseleave', () => {
      animeLib({
        targets: card,
        scale: [1.03, 1],
        duration: 300,
        easing: 'easeOutQuad',
      });
    });
  });
}
