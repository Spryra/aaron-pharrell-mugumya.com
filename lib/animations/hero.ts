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
 * Animate hero heading with character-level reveal
 * Each character fades in and translates up in sequence
 */
export function animateHeroHeading(elementSelector: string): void {
  if (!anime) return; // Skip if anime not loaded

  const element = document.querySelector(elementSelector);
  if (!element) return;

  // Check prefers-reduced-motion
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    (element as HTMLElement).style.opacity = '1';
    return;
  }

  const text = element.textContent || '';
  element.textContent = '';

  const chars = text.split('').map((char) => {
    const span = document.createElement('span');
    span.textContent = char;
    span.style.opacity = '0';
    span.style.display = 'inline-block';
    (element as HTMLElement).appendChild(span);
    return span;
  });

  const timeline = anime.timeline();
  timeline.add({
    targets: chars,
    opacity: [0, 1],
    translateY: [20, 0],
    duration: 800,
    delay: anime.stagger(30),
    easing: 'easeOutExpo',
  });
}

/**
 * Animate counter from 0 to target value
 * Used for CGPA and project counts
 */
export function animateCounter(
  elementSelector: string,
  targetValue: number,
  duration: number = 2000
): void {
  const el = document.querySelector(elementSelector);
  if (!el) return;

  // Check prefers-reduced-motion
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    if (targetValue === 4.38) {
      el.textContent = targetValue.toFixed(2);
    } else {
      el.textContent = Math.floor(targetValue).toString();
    }
    return;
  }

  anime({
    targets: { value: 0 },
    value: targetValue,
    duration,
    easing: 'easeOutExpo',
    update(anim: any) {
      const currentValue = anim.progress * targetValue;
      if (targetValue === 4.38 || targetValue > 3) {
        el.textContent = currentValue.toFixed(2);
      } else {
        el.textContent = Math.floor(currentValue).toString();
      }
    },
  });
}

/**
 * Animate hero stats section with staggered appearance
 */
export function animateHeroStats(containerSelector: string): void {
  const container = document.querySelector(containerSelector);
  if (!container) return;

  // Check prefers-reduced-motion
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    (container as HTMLElement).style.opacity = '1';
    return;
  }

  anime({
    targets: container,
    opacity: [0, 1],
    translateY: [20, 0],
    duration: 600,
    easing: 'easeOutQuad',
    delay: 200,
  });
}
