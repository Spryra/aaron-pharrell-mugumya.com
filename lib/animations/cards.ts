let anime: any;

// Load anime.js dynamically
if (typeof window !== 'undefined') {
  import('animejs').then(module => {
    anime = module.default || module;
  }).catch(() => {
    console.warn('Failed to load animejs');
  });
}

/**
 * Animate cards with staggered cascade effect
 * Cards slide in with slight left/right offset and fade in
 */
export function animateCardsCascade(containerSelector: string): void {
  if (!anime) return; // Skip if anime not loaded

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

  anime({
    targets: cards,
    opacity: [0, 1],
    translateY: [40, 0],
    translateX: ((_el: any, i: number) => {
      return i % 2 === 0 ? [20, 0] : [-20, 0];
    }) as any,
    duration: 800,
    delay: anime.stagger(100),
    easing: 'easeOutQuad',
  });
}

/**
 * Animate blog cards with fade and slide effect
 */
export function animateBlogCards(containerSelector: string): void {
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

  anime({
    targets: cards,
    opacity: [0, 1],
    translateY: [30, 0],
    duration: 700,
    delay: anime.stagger(80),
    easing: 'easeOutQuad',
  });
}

/**
 * Animate project cards with more prominent cascade
 */
export function animateProjectCards(containerSelector: string): void {
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

  anime({
    targets: cards,
    opacity: [0, 1],
    translateY: [50, 0],
    duration: 900,
    delay: anime.stagger(120),
    easing: 'easeOutExpo',
  });
}

/**
 * Animate cards with hover effect setup
 */
export function setupCardHoverAnimation(containerSelector: string): void {
  const container = document.querySelector(containerSelector);
  if (!container) return;

  const cards = container.querySelectorAll('[data-animate-card], [data-blog-card], [data-project-card]');

  cards.forEach((card) => {
    (card as HTMLElement).addEventListener('mouseenter', () => {
      anime({
        targets: card,
        scale: [1, 1.03],
        duration: 300,
        easing: 'easeOutQuad',
      });
    });

    (card as HTMLElement).addEventListener('mouseleave', () => {
      anime({
        targets: card,
        scale: [1.03, 1],
        duration: 300,
        easing: 'easeOutQuad',
      });
    });
  });
}
