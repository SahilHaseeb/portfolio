/**
 * tilt.js — High-Performance 3D Tilt & Local Border-Light Engine
 *
 * Optimizations:
 *  - Caches bounding rect on pointerenter (zero layout thrashing on pointermove)
 *  - Dynamically promotes will-change only during active interaction
 *  - Updates --card-x / --card-y inside rAF loop only when dirty
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
  let localX = 0;
  let localY = 0;
  let coordsDirty = false;
  let cachedRect = null;

  const MAX_TILT = parseFloat(card.dataset.tiltMax) || 4.5;

  function onPointerEnter() {
    cachedRect = card.getBoundingClientRect();
    card.style.willChange = 'transform';
  }

  function onPointerMove(e) {
    if (!cachedRect || cachedRect.width === 0) {
      cachedRect = card.getBoundingClientRect();
    }

    const x = e.clientX - cachedRect.left;
    const y = e.clientY - cachedRect.top;

    const normX = (x / cachedRect.width) * 2 - 1;
    const normY = (y / cachedRect.height) * 2 - 1;

    targetRotX = -normY * MAX_TILT;
    targetRotY = normX * MAX_TILT;

    localX = x;
    localY = y;
    coordsDirty = true;

    if (!isHovered) {
      isHovered = true;
      if (!rafId) _loop();
    }
  }

  function onPointerLeave() {
    isHovered = false;
    targetRotX = 0;
    targetRotY = 0;
    cachedRect = null;
  }

  function _loop() {
    currentRotX += (targetRotX - currentRotX) * 0.22;
    currentRotY += (targetRotY - currentRotY) * 0.22;

    if (coordsDirty) {
      card.style.setProperty('--card-x', `${localX.toFixed(0)}px`);
      card.style.setProperty('--card-y', `${localY.toFixed(0)}px`);
      coordsDirty = false;
    }

    card.style.transform = `perspective(900px) rotateX(${currentRotX.toFixed(2)}deg) rotateY(${currentRotY.toFixed(2)}deg) translate3d(0, 0, ${isHovered ? '5px' : '0'})`;

    if (isHovered || Math.abs(currentRotX) > 0.05 || Math.abs(currentRotY) > 0.05) {
      rafId = requestAnimationFrame(_loop);
    } else {
      card.style.transform = '';
      card.style.willChange = '';
      rafId = null;
    }
  }

  card.addEventListener('pointerenter', onPointerEnter, { passive: true });
  card.addEventListener('pointermove', onPointerMove, { passive: true });
  card.addEventListener('pointerleave', onPointerLeave, { passive: true });
}
