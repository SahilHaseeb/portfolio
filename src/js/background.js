/**
 * background.js — High-Performance Scroll Progress Indicator
 *
 * Lightweight, 0-cost scroll indicator at the top of the viewport.
 * 0 CPU overhead during mouse movement.
 */

import { $ } from './utils.js';

export function initBackground() {
  // Static GPU ambient background — 0 CPU listeners required.
}

export function initScrollProgress() {
  const progressBar = $('#scroll-progress');
  if (!progressBar) return;

  let ticking = false;

  function updateProgress() {
    const scrollTop = window.scrollY || document.documentElement.scrollTop;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const progress = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;

    progressBar.style.width = `${progress.toFixed(1)}%`;
    ticking = false;
  }

  window.addEventListener(
    'scroll',
    () => {
      if (!ticking) {
        requestAnimationFrame(updateProgress);
        ticking = true;
      }
    },
    { passive: true }
  );

  updateProgress();
}
