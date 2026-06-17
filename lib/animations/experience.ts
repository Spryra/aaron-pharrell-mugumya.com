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
 * Animate experience logos with enhanced hover effect
 * Logos pulse, scale, and glow on hover for interactive feel
 */
export async function animateExperienceLogos(): Promise<void> {
  const animeLib = await animePromise;
  if (!animeLib) return;

  const logos = document.querySelectorAll('[data-experience-logo]');
  if (!logos.length) return;

  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    return;
  }

  // Add entrance animation to each logo
  animeLib({
    targets: logos,
    opacity: [0, 1],
    scale: [0.8, 1],
    duration: 600,
    delay: animeLib.stagger(100),
    easing: 'easeOutQuad',
  });

  // Add hover effects to logos
  logos.forEach((logo) => {
    const container = logo.closest('[data-experience-item]');
    if (!container) return;

    container.addEventListener('mouseenter', () => {
      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

      // Logo bounces and glows on hover
      animeLib({
        targets: logo,
        scale: [1, 1.15],
        duration: 300,
        easing: 'easeOutElastic(1, 0.7)',
      });

      // Add glow effect via shadow
      animeLib({
        targets: logo,
        boxShadow: [
          '0 4px 6px rgba(0,0,0,0.1)',
          `0 0 20px rgba(59, 130, 246, 0.5)`, // Light accent glow
        ],
        duration: 300,
        easing: 'easeOutQuad',
      });
    });

    container.addEventListener('mouseleave', () => {
      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

      // Return to normal size
      animeLib({
        targets: logo,
        scale: [1.15, 1],
        duration: 300,
        easing: 'easeOutQuad',
      });

      // Remove glow
      animeLib({
        targets: logo,
        boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
        duration: 300,
        easing: 'easeOutQuad',
      });
    });
  });
}

/**
 * Animate experience content (company name, role, description)
 * Staggered entrance with fade and slide
 */
export async function animateExperienceContent(): Promise<void> {
  const animeLib = await animePromise;
  if (!animeLib) return;

  const items = document.querySelectorAll('[data-experience-item]');
  if (!items.length) return;

  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    items.forEach((item) => {
      (item as HTMLElement).style.opacity = '1';
    });
    return;
  }

  // Animate each experience item
  animeLib({
    targets: items,
    opacity: [0, 1],
    translateY: [40, 0],
    duration: 700,
    delay: animeLib.stagger(150),
    easing: 'easeOutQuad',
  });

  // Animate company names with color accent
  const companyNames = document.querySelectorAll('[data-company-name]');
  if (companyNames.length) {
    animeLib({
      targets: companyNames,
      opacity: [0.5, 1],
      duration: 700,
      delay: animeLib.stagger(150, { start: 100 }),
      easing: 'easeOutQuad',
    });
  }
}

/**
 * Animate timeline lines that connect experience items
 * Lines grow from top to bottom
 */
export async function animateTimelineLines(): Promise<void> {
  const animeLib = await animePromise;
  if (!animeLib) return;

  const lines = document.querySelectorAll('[data-timeline-line]');
  if (!lines.length) return;

  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    return;
  }

  // Animate line height from 0 to full
  lines.forEach((line) => {
    const height = (line as HTMLElement).offsetHeight;
    (line as HTMLElement).style.height = '0';

    animeLib({
      targets: line,
      height: [0, height],
      duration: 800,
      delay: animeLib.stagger(200),
      easing: 'easeOutQuad',
    });
  });
}

/**
 * Initialize all experience animations
 */
export async function initExperienceAnimations(): Promise<void> {
  // Wait for elements to be in DOM
  await new Promise((resolve) => setTimeout(resolve, 100));

  await Promise.all([
    animateExperienceLogos(),
    animateExperienceContent(),
    animateTimelineLines(),
  ]);
}
