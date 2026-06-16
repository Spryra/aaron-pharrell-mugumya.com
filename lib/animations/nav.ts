let anime: any;

// Load anime.js dynamically with a small delay to ensure it's available
const animePromise = typeof window !== 'undefined'
  ? import('animejs').then((module: any) => {
      anime = module.default || module;
      return anime;
    }).catch(() => {
      console.warn('Failed to load animejs');
      return null;
    })
  : Promise.resolve(null);

/**
 * Initialize nav link hover animations with underline slide effect
 */
export async function initNavLinkAnimation(): Promise<void> {
  const animeLib = await animePromise;
  if (!animeLib) return;

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
      if (!prefersReducedMotion && animeLib) {
        animeLib.set(underline, {
          width: '100%',
          duration: 300,
          easing: 'easeOutExpo',
        });
      } else {
        underline.style.width = '100%';
      }
    });

    (link as HTMLElement).addEventListener('mouseleave', () => {
      if (!prefersReducedMotion && animeLib) {
        animeLib.set(underline, {
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
export async function animateNavLinksEntrance(): Promise<void> {
  const animeLib = await animePromise;
  if (!animeLib) return;

  const navLinks = document.querySelectorAll('[data-nav-link]');

  // Check prefers-reduced-motion
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    navLinks.forEach((link) => {
      (link as HTMLElement).style.opacity = '1';
    });
    return;
  }

  animeLib({
    targets: navLinks,
    opacity: [0, 1],
    translateX: [-20, 0],
    duration: 600,
    delay: animeLib.stagger(50),
    easing: 'easeOutQuad',
  });
}

/**
 * Animate nav logo entrance
 */
export async function animateNavLogo(logoSelector: string = '[data-nav-logo]'): Promise<void> {
  const animeLib = await animePromise;
  if (!animeLib) return;

  const logo = document.querySelector(logoSelector);
  if (!logo) return;

  // Check prefers-reduced-motion
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    (logo as HTMLElement).style.opacity = '1';
    return;
  }

  animeLib({
    targets: logo,
    opacity: [0, 1],
    translateX: [-30, 0],
    duration: 600,
    easing: 'easeOutExpo',
  });
}
