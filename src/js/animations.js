/**
 * animations.js
 *
 * Scroll-triggered reveal animations using IntersectionObserver.
 * Supports all animation utility classes:
 *   .fade-up, .fade-in, .slide-in-left, .slide-in-right
 *
 * Performance:
 *   - Uses IntersectionObserver (no scroll event polling)
 *   - Unobserves elements after reveal (one-shot)
 *   - Full prefers-reduced-motion support
 *   - GPU-promoted via will-change in CSS
 */

import { $$ } from './utils.js';

/** Selects all animated elements across all animation classes */
const ANIMATED_SELECTORS = [
  '.fade-up',
  '.fade-in',
  '.slide-in-left',
  '.slide-in-right',
].join(', ');

/**
 * Returns true if the user prefers reduced motion.
 * When true, we skip animation setup entirely — CSS also
 * handles this via @media (prefers-reduced-motion: reduce).
 */
function prefersReducedMotion() {
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

/**
 * initScrollAnimations()
 *
 * Finds all animated elements and wires up IntersectionObserver.
 * If reduced motion is preferred, marks all elements visible immediately.
 */
export function initScrollAnimations() {
  const targets = $$(ANIMATED_SELECTORS);
  if (!targets.length) return;

  // Immediately reveal everything if motion is reduced
  if (prefersReducedMotion()) {
    targets.forEach((el) => el.classList.add('is-visible'));
    return;
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          // One-shot: stop observing after the element has appeared
          observer.unobserve(entry.target);
        }
      });
    },
    {
      // Start reveal when element is 10% visible from bottom
      threshold: 0.10,
      // Add a small bottom margin — reveals slightly before element enters viewport
      rootMargin: '0px 0px -48px 0px',
    }
  );

  targets.forEach((el) => observer.observe(el));
}

/**
 * initPageEntrance()
 *
 * Adds a single CSS class to <body> after a short delay
 * to trigger above-the-fold elements that don't need scroll.
 * Respects reduced motion.
 */
export function initPageEntrance() {
  if (prefersReducedMotion()) {
    // Immediately reveal all above-fold animated elements
    $$('[data-entrance]').forEach((el) => el.classList.add('is-visible'));
    return;
  }

  // Small rAF delay ensures CSS has applied initial opacity:0 state
  requestAnimationFrame(() => {
    requestAnimationFrame(() => {
      $$('[data-entrance]').forEach((el, i) => {
        setTimeout(() => el.classList.add('is-visible'), i * 80);
      });
    });
  });
}
