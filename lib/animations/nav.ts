import anime from 'animejs/lib/anime.es.js';

/**
 * Initialize nav link hover animations with underline slide effect
 */
export function initNavLinkAnimation(): void {
  const navLinks = document.querySelectorAll('[data-nav-link]');

  navLinks.forEach((link) => {
    // Check if underline already exists
    let underline = link.querySelector('[data-nav-underline]') as HTMLElement;

    if (!underline) {
      underline = document.createElement('div');
      underline.setAttribute('data-nav-underline', '');
      underline.className =
        'absolute bottom-0 left-0 h-0.5 bg-light-accent dark:bg-dark-accent';
      underline.style.width = '0%';
      underline.style.transition = 'none';

      (link as HTMLElement).style.position = 'relative';
      (link as HTMLElement).appendChild(underline);
    }

    // Check prefers-reduced-motion
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    (link as HTMLElement).addEventListener('mouseenter', () => {
      if (!prefersReducedMotion) {
        anime.set(underline, {
          width: '100%',
          duration: 300,
          easing: 'easeOutExpo',
        });
      } else {
        underline.style.width = '100%';
      }
    });

    (link as HTMLElement).addEventListener('mouseleave', () => {
      if (!prefersReducedMotion) {
        anime.set(underline, {
          width: '0%',
          duration: 300,
          easing: 'easeOutExpo',
        });
      } else {
        underline.style.width = '0%';
      }
    });
  });
}

/**
 * Animate nav links entrance on page load
 */
export function animateNavLinksEntrance(): void {
  const navLinks = document.querySelectorAll('[data-nav-link]');

  // Check prefers-reduced-motion
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    navLinks.forEach((link) => {
      (link as HTMLElement).style.opacity = '1';
    });
    return;
  }

  anime({
    targets: navLinks,
    opacity: [0, 1],
    translateX: [-20, 0],
    duration: 600,
    delay: anime.stagger(50),
    easing: 'easeOutQuad',
  });
}

/**
 * Animate nav logo entrance
 */
export function animateNavLogo(logoSelector: string = '[data-nav-logo]'): void {
  const logo = document.querySelector(logoSelector);
  if (!logo) return;

  // Check prefers-reduced-motion
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    (logo as HTMLElement).style.opacity = '1';
    return;
  }

  anime({
    targets: logo,
    opacity: [0, 1],
    translateX: [-30, 0],
    duration: 600,
    easing: 'easeOutExpo',
  });
}
