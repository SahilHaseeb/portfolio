/**
 * hero.js — Hero Section & 3D Interactive AI Data Core
 *
 * Fast 60 FPS transform-only parallax on the 3D Data Core.
 * Caches section bounds on pointerenter and stops rAF cleanly when settled.
 */

import { $ } from '../js/utils.js';

export function initHero() {
  _init3DCoreParallax();
}

function _init3DCoreParallax() {
  const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const isFinePointer = window.matchMedia('(pointer: fine)').matches;

  if (prefersReduced || !isFinePointer) return;

  const heroSection = $('#hero');
  const core = $('#hero-data-core');
  if (!heroSection || !core) return;

  let mouseX = 0;
  let mouseY = 0;
  let currentRotX = 0;
  let currentRotY = 0;
  let isHovered = false;
  let rafId = null;
  let cachedRect = null;

  const MAX_ROT = 6; // Bounded 6 degrees max

  heroSection.addEventListener(
    'pointerenter',
    () => {
      cachedRect = heroSection.getBoundingClientRect();
    },
    { passive: true }
  );

  heroSection.addEventListener(
    'pointermove',
    (e) => {
      if (!cachedRect || cachedRect.width === 0) {
        cachedRect = heroSection.getBoundingClientRect();
      }

      const x = e.clientX - cachedRect.left - cachedRect.width / 2;
      const y = e.clientY - cachedRect.top - cachedRect.height / 2;

      mouseX = x / (cachedRect.width / 2);
      mouseY = y / (cachedRect.height / 2);

      if (!isHovered) {
        isHovered = true;
        if (!rafId) _loop();
      }
    },
    { passive: true }
  );

  heroSection.addEventListener('pointerleave', () => {
    isHovered = false;
    mouseX = 0;
    mouseY = 0;
    cachedRect = null;
  });

  function _loop() {
    const targetX = -mouseY * MAX_ROT;
    const targetY = mouseX * MAX_ROT;

    currentRotX += (targetX - currentRotX) * 0.18;
    currentRotY += (targetY - currentRotY) * 0.18;

    core.style.transform = `perspective(1000px) rotateX(${currentRotX.toFixed(2)}deg) rotateY(${currentRotY.toFixed(2)}deg)`;

    if (isHovered || Math.abs(currentRotX) > 0.05 || Math.abs(currentRotY) > 0.05) {
      rafId = requestAnimationFrame(_loop);
    } else {
      core.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg)';
      rafId = null;
    }
  }
}
