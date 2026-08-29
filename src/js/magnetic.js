/**
 * magnetic.js — Fast Magnetic Interaction for Primary CTA Buttons
 *
 * Micro-displacement (3-4px max) with fast return animation.
 * 0 lag, disabled on touch/reduced motion.
 */

import { $$ } from './utils.js';

export function initMagnetic() {
  const isFinePointer = window.matchMedia('(pointer: fine)').matches;
  const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  if (!isFinePointer || prefersReduced) return;

  const magneticElements = $$('#hero-cta-projects, #nav-cta, #btn-submit-contact');
  if (!magneticElements.length) return;

  magneticElements.forEach((btn) => {
    _attachMagnetic(btn);
  });
}

function _attachMagnetic(el) {
  const STRENGTH = 0.2;
  const MAX_MOVE = 4;

  el.addEventListener(
    'pointermove',
    (e) => {
      const rect = el.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;

      const moveX = Math.max(-MAX_MOVE, Math.min(MAX_MOVE, x * STRENGTH));
      const moveY = Math.max(-MAX_MOVE, Math.min(MAX_MOVE, y * STRENGTH));

      el.style.transform = `translate3d(${moveX.toFixed(1)}px, ${moveY.toFixed(1)}px, 0)`;
      el.style.transition = 'transform 0.08s ease-out';
    },
    { passive: true }
  );

  el.addEventListener(
    'pointerleave',
    () => {
      el.style.transform = 'translate3d(0, 0, 0)';
      el.style.transition = 'transform 0.2s cubic-bezier(0.16, 1, 0.3, 1)';
    },
    { passive: true }
  );
}
