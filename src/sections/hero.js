/**
 * hero.js — Hero section enhancements
 *
 * Features:
 *  - Staggered entrance animation for hero elements
 *  - Typewriter effect for the profession subtitle (subtle, optional)
 *  - Respects prefers-reduced-motion
 *
 * NOTE: The entrance animation system uses data-entrance attributes
 * with staggered delays. initPageEntrance() in animations.js handles
 * the generic version; this module handles hero-specific ordering.
 */

import { $$, $ } from '../js/utils.js';

/**
 * initHero()
 * Wires up hero-specific JS behaviour.
 * Called from main.js once on DOMContentLoaded.
 */
export function initHero() {
  _initStaggeredEntrance();
  _initTypewriter();
}

/* ── Staggered entrance ─────────────────────────────────── */
function _initStaggeredEntrance() {
  const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // All elements in the hero with data-entrance attribute, in DOM order
  const elements = $$('[data-entrance]', $('#hero'));
  if (!elements.length) return;

  if (prefersReduced) {
    elements.forEach((el) => el.classList.add('is-visible'));
    return;
  }

  // Stagger each element with an incremental delay
  elements.forEach((el, index) => {
    const baseDelay = 80; // ms between each element
    const delay = index * baseDelay;
    setTimeout(() => {
      requestAnimationFrame(() => el.classList.add('is-visible'));
    }, delay);
  });
}

/* ── Typewriter effect ──────────────────────────────────── */
/**
 * Cycles through profession titles on the .hero__profession--typewriter element.
 * If element or data-titles attribute is missing, silently skips.
 */
function _initTypewriter() {
  const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (prefersReduced) return;

  const el = $('.hero__profession--typewriter');
  if (!el) return;

  const titlesAttr = el.dataset.titles;
  if (!titlesAttr) return;

  let titles;
  try {
    titles = JSON.parse(titlesAttr);
  } catch {
    return;
  }

  if (!Array.isArray(titles) || titles.length === 0) return;

  let titleIndex = 0;
  let charIndex = 0;
  let isDeleting = false;

  const TYPING_SPEED   = 65;  // ms per char
  const DELETE_SPEED   = 35;  // ms per char when deleting
  const PAUSE_COMPLETE = 2200; // pause at end of word
  const PAUSE_EMPTY    = 400;  // pause at empty

  function tick() {
    const current = titles[titleIndex];
    const displayed = current.slice(0, charIndex);
    el.textContent = displayed;

    let delay = isDeleting ? DELETE_SPEED : TYPING_SPEED;

    if (!isDeleting && charIndex === current.length) {
      // Finished typing — pause then delete
      isDeleting = true;
      delay = PAUSE_COMPLETE;
    } else if (isDeleting && charIndex === 0) {
      // Finished deleting — move to next
      isDeleting = false;
      titleIndex = (titleIndex + 1) % titles.length;
      delay = PAUSE_EMPTY;
    } else {
      charIndex += isDeleting ? -1 : 1;
    }

    setTimeout(tick, delay);
  }

  // Start after entrance animation completes
  setTimeout(tick, titles[0].length * TYPING_SPEED + 1200);
}
