/**
 * animations.js
 *
 * Scroll-triggered reveal animations using a single shared IntersectionObserver.
 * Supports: .fade-up, .fade-in, .slide-in-left, .slide-in-right
 * Also pauses offscreen infinite CSS animations (Hero 3D core & Skills constellation).
 */

import { $, $$ } from './utils.js';

const ANIMATED_SELECTORS = [
  '.fade-up',
  '.fade-in',
  '.slide-in-left',
  '.slide-in-right',
].join(', ');

let sharedObserver = null;

function prefersReducedMotion() {
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

function getSharedObserver() {
  if (sharedObserver) return sharedObserver;

  sharedObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          sharedObserver.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.08,
      rootMargin: '0px 0px -36px 0px',
    }
  );

  return sharedObserver;
}

/**
 * Finds unobserved animated elements and attaches them to the single shared observer.
 * Safe to call repeatedly after dynamic DOM renders (e.g. project filters).
 */
export function initScrollAnimations() {
  const targets = $$(ANIMATED_SELECTORS);
  if (!targets.length) return;

  if (prefersReducedMotion()) {
    targets.forEach((el) => el.classList.add('is-visible'));
    return;
  }

  const observer = getSharedObserver();
  targets.forEach((el) => {
    if (el.dataset.animObserved === '1' || el.classList.contains('is-visible')) return;
    el.dataset.animObserved = '1';
    observer.observe(el);
  });
}

/**
 * Triggers above-the-fold entrance animations smoothly.
 */
export function initPageEntrance() {
  const entranceEls = $$('[data-entrance]');
  if (!entranceEls.length) return;

  if (prefersReducedMotion()) {
    entranceEls.forEach((el) => el.classList.add('is-visible'));
    return;
  }

  requestAnimationFrame(() => {
    entranceEls.forEach((el, i) => {
      if (el.classList.contains('is-visible')) return;
      setTimeout(() => el.classList.add('is-visible'), i * 65);
    });
  });
}

/**
 * Pauses infinite CSS animations on #hero and #skills whenever scrolled offscreen
 * to eliminate unnecessary background GPU/CPU work.
 */
export function initOffscreenAnimationPause() {
  if (prefersReducedMotion()) return;

  const sections = ['#hero', '#skills'].map((sel) => $(sel)).filter(Boolean);
  if (!sections.length) return;

  const pauseObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        entry.target.classList.toggle('is-paused', !entry.isIntersecting);
      });
    },
    { threshold: 0.01 }
  );

  sections.forEach((sec) => pauseObserver.observe(sec));
}
