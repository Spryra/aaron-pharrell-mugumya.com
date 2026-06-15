import anime from 'animejs';

/**
 * Animate skill badges with pop-in elastic overshoot effect
 */
export function animateBadges(containerSelector: string): void {
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

  anime({
    targets: badges,
    opacity: [0, 1],
    scale: [0.5, 1],
    duration: 600,
    delay: anime.stagger(50),
    easing: 'easeOutElastic(1, 0.6)',
  });
}

/**
 * Animate tech stack badges with sequential pop effect
 */
export function animateTechBadges(containerSelector: string): void {
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

  anime({
    targets: badges,
    opacity: [0, 1],
    scale: [0.3, 1],
    duration: 500,
    delay: anime.stagger(40),
    easing: 'easeOutElastic(1, 0.7)',
  });
}

/**
 * Animate badges with fade and scale effect (less elastic, more professional)
 */
export function animateProfessionalBadges(containerSelector: string): void {
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

  anime({
    targets: badges,
    opacity: [0, 1],
    scale: [0.7, 1],
    duration: 400,
    delay: anime.stagger(30),
    easing: 'easeOutQuad',
  });
}
