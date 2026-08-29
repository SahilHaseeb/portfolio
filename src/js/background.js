/**
 * background.js — Ambient Cyber Grid & Scroll Progress Engine
 *
 * Provides:
 *  1. Mouse proximity glow coordinates for interactive ambient background
 *  2. Minimalist glowing top scroll progress indicator
 *
 * Rules:
 *  - High performance: throttled via rAF
 *  - 0 external dependencies
 */

import { $ } from './utils.js';

export function initBackground() {
  const root = document.documentElement;
  const isFinePointer = window.matchMedia('(pointer: fine)').matches;

  if (isFinePointer) {
    let ticking = false;

    window.addEventListener(
      'pointermove',
      (e) => {
        if (!ticking) {
          requestAnimationFrame(() => {
            root.style.setProperty('--mouse-x', `${e.clientX}px`);
            root.style.setProperty('--mouse-y', `${e.clientY}px`);
            ticking = false;
          });
          ticking = true;
        }
      },
      { passive: true }
    );
  }
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
