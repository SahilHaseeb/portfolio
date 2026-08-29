/**
 * tilt.js — High-Performance 3D Tilt & Local Border-Light Engine
 *
 * Fast 60 FPS transform-only 3D interaction.
 * Updates local --card-x and --card-y strictly on the active hovered card.
 * Bounded rotation (4-6 deg), 0 global event listeners, instant response.
 */

import { $$ } from './utils.js';

export function initTilt() {
  const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const isFinePointer = window.matchMedia('(pointer: fine)').matches;

  if (prefersReduced || !isFinePointer) return;

  const tiltCards = $$('.card-tilt-3d, [data-tilt]');
  if (!tiltCards.length) return;

  tiltCards.forEach((card) => {
    if (card._tiltAttached) return;
    card._tiltAttached = true;
    _attachTilt(card);
  });
}

function _attachTilt(card) {
  let isHovered = false;
  let rafId = null;
  let targetRotX = 0;
  let targetRotY = 0;
  let currentRotX = 0;
  let currentRotY = 0;
  let localX = 50;
  let localY = 50;

  const MAX_TILT = parseFloat(card.dataset.tiltMax) || 5;

  function onPointerMove(e) {
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const normX = (x / rect.width) * 2 - 1;  // -1 to 1
    const normY = (y / rect.height) * 2 - 1; // -1 to 1

    targetRotX = -normY * MAX_TILT;
    targetRotY = normX * MAX_TILT;

    localX = x;
    localY = y;

    // Set local mouse coordinates directly on this card only (for border glow)
    card.style.setProperty('--card-x', `${localX.toFixed(0)}px`);
    card.style.setProperty('--card-y', `${localY.toFixed(0)}px`);

    if (!isHovered) {
      isHovered = true;
      _loop();
    }
  }

  function onPointerLeave() {
    isHovered = false;
    targetRotX = 0;
    targetRotY = 0;
  }

  function _loop() {
    // Fast snappy lerp
    currentRotX += (targetRotX - currentRotX) * 0.22;
    currentRotY += (targetRotY - currentRotY) * 0.22;

    card.style.transform = `perspective(900px) rotateX(${currentRotX.toFixed(2)}deg) rotateY(${currentRotY.toFixed(2)}deg) translate3d(0, 0, ${isHovered ? '6px' : '0'})`;

    if (isHovered || Math.abs(currentRotX) > 0.05 || Math.abs(currentRotY) > 0.05) {
      rafId = requestAnimationFrame(_loop);
    } else {
      card.style.transform = 'perspective(900px) rotateX(0deg) rotateY(0deg) translate3d(0,0,0)';
      cancelAnimationFrame(rafId);
    }
  }

  card.addEventListener('pointermove', onPointerMove, { passive: true });
  card.addEventListener('pointerleave', onPointerLeave, { passive: true });
}
