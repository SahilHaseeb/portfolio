/**
 * hero.js — Hero Section & 3D Interactive AI Data Core
 *
 * Fast 60 FPS transform-only parallax on the 3D Data Core.
 * Disabled on touch & reduced-motion.
 */

import { $$, $ } from '../js/utils.js';

export function initHero() {
  _initEntrance();
  _init3DCoreParallax();
}

function _initEntrance() {
  const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const elements = $$('[data-entrance]', $('#hero'));
  if (!elements.length) return;

  if (prefersReduced) {
    elements.forEach((el) => el.classList.add('is-visible'));
    return;
  }

  elements.forEach((el, index) => {
    setTimeout(() => {
      requestAnimationFrame(() => el.classList.add('is-visible'));
    }, index * 60);
  });
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

  const MAX_ROT = 6; // Bounded 6 degrees max

  heroSection.addEventListener(
    'pointermove',
    (e) => {
      const rect = heroSection.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;

      mouseX = x / (rect.width / 2);
      mouseY = y / (rect.height / 2);

      if (!isHovered) {
        isHovered = true;
        _loop();
      }
    },
    { passive: true }
  );

  heroSection.addEventListener('pointerleave', () => {
    isHovered = false;
    mouseX = 0;
    mouseY = 0;
  });

  function _loop() {
    const targetX = -mouseY * MAX_ROT;
    const targetY = mouseX * MAX_ROT;

    // Fast responsive lerp (0.18 factor)
    currentRotX += (targetX - currentRotX) * 0.18;
    currentRotY += (targetY - currentRotY) * 0.18;

    core.style.transform = `perspective(1000px) rotateX(${currentRotX.toFixed(2)}deg) rotateY(${currentRotY.toFixed(2)}deg)`;

    if (isHovered || Math.abs(currentRotX) > 0.05 || Math.abs(currentRotY) > 0.05) {
      rafId = requestAnimationFrame(_loop);
    } else {
      core.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg)';
      cancelAnimationFrame(rafId);
    }
  }
}
