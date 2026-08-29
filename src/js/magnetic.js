/**
 * magnetic.js — Subtle Magnetic Attraction for Primary CTAs
 *
 * Pulls buttons gently toward the cursor within their hover bounding box
 * and springs back smoothly on exit.
 *
 * Rules:
 *  - Micro-displacement: 4-6px max
 *  - Disabled on touch and prefers-reduced-motion
 *  - 0 external dependencies
 */

import { $$ } from './utils.js';

export function initMagnetic() {
  const isFinePointer = window.matchMedia('(pointer: fine)').matches;
  const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  if (!isFinePointer || prefersReduced) return;

  const magneticElements = $$('.btn--primary, .btn--magnetic, #hero-cta-projects, #nav-cta');
  if (!magneticElements.length) return;

  magneticElements.forEach((btn) => {
    _attachMagnetic(btn);
  });
}

function _attachMagnetic(el) {
  const STRENGTH = 0.28; // Pull multiplier
  const MAX_MOVE = 6;    // Max px displacement

  let isHovering = false;

  el.addEventListener(
    'pointermove',
    (e) => {
      const rect = el.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;

      const moveX = Math.max(-MAX_MOVE, Math.min(MAX_MOVE, x * STRENGTH));
      const moveY = Math.max(-MAX_MOVE, Math.min(MAX_MOVE, y * STRENGTH));

      isHovering = true;
      el.style.transform = `translate3d(${moveX.toFixed(1)}px, ${moveY.toFixed(1)}px, 0)`;
      el.style.transition = 'transform 0.1s ease-out';
    },
    { passive: true }
  );

  el.addEventListener(
    'pointerleave',
    () => {
      isHovering = false;
      el.style.transform = 'translate3d(0, 0, 0)';
      el.style.transition = 'transform 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)';
    },
    { passive: true }
  );
}
