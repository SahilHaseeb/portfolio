/**
 * tilt.js — Vanilla 3D Tilt & Dynamic Glare Engine
 *
 * Provides subtle, high-performance 3D perspective rotation and cursor glare
 * on cards and interactive panels using pure CSS transforms and rAF.
 *
 * Rules:
 *  - Max rotation: 5-7 degrees (never impairs readability)
 *  - Disabled on touch devices and prefers-reduced-motion
 *  - 0 external dependencies
 */

import { $$ } from './utils.js';

export function initTilt() {
  // Guard: reduced motion & non-pointer devices
  const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const isFinePointer = window.matchMedia('(pointer: fine)').matches;

  if (prefersReduced || !isFinePointer) return;

  const tiltCards = $$('.card-tilt-3d, [data-tilt]');
  if (!tiltCards.length) return;

  tiltCards.forEach((card) => {
    _attachTiltEffect(card);
  });
}

function _attachTiltEffect(card) {
  let isHovered = false;
  let rafId = null;
  let targetX = 0;
  let targetY = 0;
  let currentX = 0;
  let currentY = 0;
  let glareX = 50;
  let glareY = 50;

  const MAX_TILT = parseFloat(card.dataset.tiltMax) || 6; // Max 6 degrees
  const SCALE = parseFloat(card.dataset.tiltScale) || 1.02; // Subtle scale

  // Ensure card has depth container style
  card.style.transformStyle = 'preserve-3d';

  // Inject glare layer if not present
  let glare = card.querySelector('.card-glare');
  if (!glare) {
    glare = document.createElement('div');
    glare.className = 'card-glare';
    glare.setAttribute('aria-hidden', 'true');
    card.appendChild(glare);
  }

  function onPointerMove(e) {
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    // Normalize between -1 and 1
    const normX = (x - centerX) / centerX;
    const normY = (y - centerY) / centerY;

    targetX = -normY * MAX_TILT;
    targetY = normX * MAX_TILT;

    glareX = (x / rect.width) * 100;
    glareY = (y / rect.height) * 100;

    if (!isHovered) {
      isHovered = true;
      _loop();
    }
  }

  function onPointerLeave() {
    isHovered = false;
    targetX = 0;
    targetY = 0;
    card.style.setProperty('--glare-opacity', '0');
  }

  function _loop() {
    // Lerp towards target
    currentX += (targetX - currentX) * 0.14;
    currentY += (targetY - currentY) * 0.14;

    card.style.transform = `perspective(1000px) rotateX(${currentX.toFixed(2)}deg) rotateY(${currentY.toFixed(2)}deg) scale3d(${isHovered ? SCALE : 1}, ${isHovered ? SCALE : 1}, 1)`;
    card.style.setProperty('--glare-x', `${glareX.toFixed(1)}%`);
    card.style.setProperty('--glare-y', `${glareY.toFixed(1)}%`);
    card.style.setProperty('--glare-opacity', isHovered ? '0.45' : '0');

    // Continue animation loop if moving or not at rest
    if (isHovered || Math.abs(currentX) > 0.05 || Math.abs(currentY) > 0.05) {
      rafId = requestAnimationFrame(_loop);
    } else {
      card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)';
      cancelAnimationFrame(rafId);
    }
  }

  card.addEventListener('pointermove', onPointerMove, { passive: true });
  card.addEventListener('pointerleave', onPointerLeave, { passive: true });
}
