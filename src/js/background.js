/**
 * background.js — High-Performance Scroll Progress Indicator
 *
 * Uses compositor-only transform: scaleX() with cached document height
 * so scrolling triggers zero layout recalculations or reflows.
 */

import { $, on } from './utils.js';

export function initBackground() {
  // Static ambient background — 0 CPU listeners required.
}

export function initScrollProgress() {
  const progressBar = $('#scroll-progress');
  if (!progressBar) return;

  let ticking = false;
  let maxScroll = Math.max(0, document.documentElement.scrollHeight - window.innerHeight);

  function updateMetrics() {
    maxScroll = Math.max(0, document.documentElement.scrollHeight - window.innerHeight);
  }

  function updateProgress() {
    const scrollTop = window.scrollY || document.documentElement.scrollTop;
    const ratio = maxScroll > 0 ? Math.min(1, Math.max(0, scrollTop / maxScroll)) : 0;

    progressBar.style.transform = `scaleX(${ratio.toFixed(4)}) translateZ(0)`;
    ticking = false;
  }

  // Keep cached maxScroll accurate without querying scrollHeight during scroll
  if (typeof ResizeObserver !== 'undefined') {
    const ro = new ResizeObserver(() => {
      updateMetrics();
      if (!ticking) {
        requestAnimationFrame(updateProgress);
        ticking = true;
      }
    });
    ro.observe(document.documentElement);
  } else {
    on(window, 'resize', updateMetrics, { passive: true });
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

  updateMetrics();
  updateProgress();
}
