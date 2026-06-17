let anime: any;

// Load anime.js dynamically
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
 * Enhanced logo animation with subtle glow and scale
 */
export async function animateNavLogoEnhanced(logoSelector: string = '[data-nav-logo]'): Promise<void> {
  const animeLib = await animePromise;
  if (!animeLib) return;

  const logo = document.querySelector(logoSelector);
  if (!logo) return;

  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    (logo as HTMLElement).style.opacity = '1';
    return;
  }

  // Logo slides in from left with slight scale-up
  animeLib({
    targets: logo,
    opacity: [0, 1],
    translateX: [-40, 0],
    scale: [0.9, 1],
    duration: 700,
    easing: 'easeOutExpo',
  });
}

/**
 * Enhanced nav links entrance with staggered horizontal slide
 */
export async function animateNavLinksEnhanced(): Promise<void> {
  const animeLib = await animePromise;
  if (!animeLib) return;

  const navLinks = document.querySelectorAll('[data-nav-link]');
  if (!navLinks.length) return;

  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    navLinks.forEach((link) => {
      (link as HTMLElement).style.opacity = '1';
    });
    return;
  }

  // Staggered entrance with slight scale for emphasis
  animeLib({
    targets: navLinks,
    opacity: [0, 1],
    translateX: [-30, 0],
    scale: [0.95, 1],
    duration: 600,
    delay: animeLib.stagger(50, { start: 100 }),
    easing: 'easeOutQuad',
  });
}

/**
 * Enhanced theme toggle animation with rotation
 */
export async function animateThemeToggle(buttonSelector: string = '[aria-label="Toggle theme"]'): Promise<void> {
  const animeLib = await animePromise;
  if (!animeLib) return;

  const button = document.querySelector(buttonSelector);
  if (!button) return;

  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    return;
  }

  // Animate the button entrance with rotation
  animeLib({
    targets: button,
    opacity: [0, 1],
    rotate: [0, 360],
    scale: [0.8, 1],
    duration: 800,
    delay: 400,
    easing: 'easeOutExpo',
  });

  // Add hover rotation effect
  button?.addEventListener('mouseenter', () => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    animeLib({
      targets: button,
      rotate: [0, 45],
      duration: 400,
      easing: 'easeOutQuad',
    });
  });

  button?.addEventListener('mouseleave', () => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    animeLib({
      targets: button,
      rotate: [45, 0],
      duration: 300,
      easing: 'easeOutQuad',
    });
  });
}

/**
 * The nav-link hover underline is handled with a pure-CSS `::after`
 * pseudo-element + `scale-x` transition in Navigation.tsx. CSS is more
 * reliable than driving per-link hover state through anime.js (which races
 * with React StrictMode / Fast Refresh re-running the initializer), so this
 * function is intentionally a no-op kept for backwards compatibility.
 */
export async function animateNavLinkHoverEnhanced(): Promise<void> {
  return;
}

/**
 * Mobile menu slide-in animation
 */
export async function animateMobileMenu(isOpen: boolean, menuSelector: string = '[role="menu"]'): Promise<void> {
  const animeLib = await animePromise;
  if (!animeLib) return;

  const menu = document.querySelector(menuSelector);
  if (!menu) return;

  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    return;
  }

  if (isOpen) {
    // Slide in from top
    animeLib({
      targets: menu,
      opacity: [0, 1],
      translateY: [-20, 0],
      duration: 300,
      easing: 'easeOutQuad',
    });

    // Animate menu items
    animeLib({
      targets: menu.querySelectorAll('[data-nav-link]'),
      opacity: [0, 1],
      translateX: [-20, 0],
      duration: 300,
      delay: animeLib.stagger(50),
      easing: 'easeOutQuad',
    });
  } else {
    // Slide out
    animeLib({
      targets: menu,
      opacity: [1, 0],
      translateY: [0, -20],
      duration: 200,
      easing: 'easeOutQuad',
    });
  }
}

/**
 * Active link highlight with pulse effect
 */
export async function animateActiveLink(selector: string): Promise<void> {
  const animeLib = await animePromise;
  if (!animeLib) return;

  const activeLink = document.querySelector(selector);
  if (!activeLink) return;

  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    return;
  }

  // Subtle pulse to show it's active
  animeLib({
    targets: activeLink,
    scale: [1, 1.05, 1],
    duration: 600,
    delay: 200,
    easing: 'easeInOutQuad',
  });
}

/**
 * Initialize all nav animations
 */
export async function initNavAnimationsEnhanced(): Promise<void> {
  await animateNavLogoEnhanced();
  await animateNavLinksEnhanced();
  await animateThemeToggle();
  await animateNavLinkHoverEnhanced();
}
