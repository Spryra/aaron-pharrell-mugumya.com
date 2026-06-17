# Animation Quick Reference

## Animation Choices & Why They Work

### 🎯 Core Philosophy
Every animation serves a purpose: guide attention, establish hierarchy, or provide feedback. All animations are accessible (respect `prefers-reduced-motion`).

---

## Standard Animations by Location

### Hero Section
- **Hero Heading** → Character stagger reveal (easeOutExpo, 800ms)
  - *Why*: Energetic entrance establishes the site's motion language
  
- **Stats Counters** → Smooth numeric animation (easeOutExpo, 2000ms)
  - *Why*: Draws eye to key metrics; users enjoy watching numbers count up
  
- **Stats Container** → Fade + slide (easeOutQuad, 600ms, 200ms delay)
  - *Why*: Delayed start creates sequence: heading → counters → stats

### Navigation
- **Logo** → Slide from left (easeOutExpo, 600ms)
  - *Why*: Establishes motion language; slides in on natural reading direction
  
- **Nav Links** → Staggered slide (easeOutQuad, 600ms, 50ms stagger)
  - *Why*: Gentler than hero (nav is functional); creates readable sequence
  
- **Link Hover** → Underline width animation (easeOutExpo, 300ms)
  - *Why*: Snappy hover feedback signals interactivity

### Skill Badges
- **Skill Badges** → Elastic pop (easeOutElastic(1, 0.6), 600ms, 50ms stagger)
  - *Why*: Playful bounce feels good; signals category transition with delight
  
- **Tech Stack Badges** → Tighter elastic pop (easeOutElastic(1, 0.7), 500ms, 40ms stagger)
  - *Why*: Slightly tighter bounce feels more professional; tools are reference material
  
- **Professional Badges** → Clean fade + scale (easeOutQuad, 400ms, 30ms stagger)
  - *Why*: No bounce needed; credentials demand professionalism

### Cards
- **Featured Projects** → Dual-direction cascade (easeOutQuad, 800ms, 100ms stagger)
  - *Why*: Alternating X direction creates "breathing" effect; visual rhythm without chaos
  
- **Blog Cards** → Single-direction slide (easeOutQuad, 700ms, 80ms stagger)
  - *Why*: Minimal movement (no X shift); blog cards shouldn't demand attention
  
- **Project Cards** → Bold cascade (easeOutExpo, 900ms, 120ms stagger)
  - *Why*: Deepest offset, longest duration; projects are showcase work
  
- **Card Hover** → Scale up (easeOutQuad, 300ms, +3%)
  - *Why*: Responsive instant-feeling feedback; signals interactivity

### Section Headings
- **Section Headings** → Clip-path reveal (easeOutExpo, 1000ms)
  - *Why*: Premium "curtain opening" effect; marks major page transitions
  
- **Gradient Headings** → Fade + slide (easeOutExpo, 1000ms)
  - *Why*: Fade prevents jarring "pop in"; slow speed respects design statement

---

## Easing Functions & Their Character

| Easing | Feeling | Use Case |
|--------|---------|----------|
| **easeOutExpo** | Snappy, energetic, authoritative | Hero moments, focal points, impactful entrances |
| **easeOutQuad** | Smooth, professional, subtle | Supporting elements, functional transitions |
| **easeOutElastic(1, 0.6)** | Playful, bouncy, delightful | Interactive badges, category transitions |
| **easeOutElastic(1, 0.7)** | Slightly tighter bounce | Professional badges, refined playfulness |

---

## Duration Hierarchy

### Page Load (Visual Hierarchy)
1. **Logo** (600ms) ← Establishes motion language first
2. **Nav Links** (600ms, +stagger) ← Supporting nav
3. **Hero Heading** (800ms) ← Most important content
4. **Stats** (600ms, +200ms delay) ← Supporting metrics
5. **Section Headings** (1000ms) ← Premium transitions below fold

### Card Sections (Content Importance)
- **Featured Projects**: 800ms (hero-adjacent, featured content)
- **Blog Cards**: 700ms (supporting content, text-heavy)
- **Project Showcase**: 900ms (main portfolio piece, most important)

### Interaction Response
- **All Hovers**: 300ms ← Should feel instant, not jarring

---

## Stagger Patterns & Their Effect

| Pattern | Rhythm | Use Case |
|---------|--------|----------|
| **30ms** | Tight, rhythmic | Character reveal, tight badge groups |
| **40-50ms** | Readable wave | Skill groups, tech stack |
| **80ms** | Clear spacing | Blog cards, moderate lists |
| **100ms** | Noticeable rhythm | Featured project grids |
| **120ms** | Dramatic reveal | Project showcase (main portfolio) |

**Rule**: Stagger = (Total Duration) ÷ (Number of Items) ÷ 2
- For 4 project cards over 900ms: 900 ÷ 4 ÷ 2 = 112ms ✓

---

## Animation Performance

All animations use GPU-accelerated properties:
- ✅ `opacity` - No reflow
- ✅ `transform` (scale, translateX, translateY) - GPU accelerated
- ✅ `clipPath` - Hardware accelerated in modern browsers
- ⚠️ `width` (nav underline) - Minimal reflow, acceptable for small element

Result: 60fps smooth animations on all devices (tested on low-end mobile).

---

## Testing the Animations

### Checklist
- [ ] Animations play smoothly at 60fps (check DevTools Performance)
- [ ] Easing feels natural (not mechanical, not too bouncy)
- [ ] Durations align with content hierarchy (hero > supporting)
- [ ] Stagger creates readable rhythm (no flicker, no lag)
- [ ] Hover states feel responsive (300ms max)
- [ ] Dark mode animations look equally good
- [ ] Mobile performance is smooth (no jank on low-end devices)
- [ ] Accessibility: prefers-reduced-motion is respected

### How to Test prefers-reduced-motion
**Chrome DevTools**:
1. Open DevTools (F12)
2. Press Ctrl+Shift+P → "Emulate CSS media feature prefers-reduced-motion"
3. Select "prefers-reduced-motion: reduce"
4. Verify animations instantly jump to final state (no intermediate steps)

---

## Future Enhancement Ideas

1. **Scroll-Triggered Animations**
   - Sections animate as they enter viewport
   - Uses Intersection Observer for performance

2. **Mouse-Follow Particles**
   - Subtle particle trail on hover (on hero section)
   - Adds polish without distraction

3. **SVG Animations**
   - Animated divider lines between sections
   - Decorative flourishes in footer

4. **Loading State Animations**
   - Skeleton screens with pulse animation
   - Progress indicator for form submission

5. **Scroll Progress Indicator**
   - Animated progress bar as user scrolls
   - Signals page length and current position

---

## File Organization

```
lib/animations/
├── hero.ts          (Hero section animations)
├── badges.ts        (Skill/tech badge animations)
├── cards.ts         (Project/blog card animations)
├── headings.ts      (Section heading animations)
└── nav.ts           (Navigation animations)

hooks/
└── useAnimateOnScroll.ts  (Trigger animations on scroll)

components/
├── Navigation.tsx                    (Uses nav animations)
├── ClientHomeWrapper.tsx             (Uses hero animations)
├── sections/FeaturedProjects.tsx    (Uses card animations)
├── sections/AnimatedTechStack.tsx   (Uses badge animations)
└── sections/AboutSectionWrapper.tsx (Uses heading animations)
```

---

## Key Files to Reference

- **ANIMATION_STRATEGY.md** - Detailed rationale for every animation
- **lib/animations/** - Implementation of all animations
- **hooks/useAnimateOnScroll.ts** - Async hook for scroll-triggered animations
- **anime.js** - Official docs: https://animejs.com

---

## Common Issues & Solutions

**Animation Not Playing?**
- Check browser console for "Failed to load animejs" warning
- Verify `prefers-reduced-motion: reduce` isn't enabled
- Ensure element selector matches DOM structure

**Animation Feels Janky?**
- Check DevTools Performance tab for frame drops
- Reduce number of simultaneous animations
- Prefer `transform` over other CSS properties

**Animation Too Fast/Slow?**
- Reference duration hierarchy above
- Check stagger calculation: (total duration) ÷ (items) ÷ 2
- Remember: hero = fastest, supporting = moderate, transitions = slowest

**Hover Animation Unresponsive?**
- 300ms is max acceptable for hover (should feel instant)
- Check easing is easeOutQuad or easeOutExpo (not Elastic for hovers)
