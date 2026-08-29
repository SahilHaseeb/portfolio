/**
 * cursor.js — Modern Custom Interactive Cursor
 *
 * Implements a refined dual-element cursor (center dot + spring-lag glow ring)
 * for desktop pointer devices with magnetic scale states on interactive elements.
 *
 * Rules:
 *  - Disabled on touch screens and prefers-reduced-motion
 *  - Pointer-events: none (never interferes with clicks or accessibility)
 *  - 0 external dependencies
 */

import { $$, $ } from './utils.js';

export function initCursor() {
  const isFinePointer = window.matchMedia('(pointer: fine)').matches;
  const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  if (!isFinePointer || prefersReduced) return;

  const dot = $('#custom-cursor');
  const ring = $('#cursor-ring');

  if (!dot || !ring) return;

  let mouseX = -100;
  let mouseY = -100;
  let ringX = -100;
  let ringY = -100;
  let isVisible = false;
  let isHovered = false;
  let isClicking = false;

  // Track pointer movement
  window.addEventListener(
    'pointermove',
    (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;

      if (!isVisible) {
        isVisible = true;
        dot.style.opacity = '1';
        ring.style.opacity = '1';
      }

      // Dot moves instantly
      dot.style.transform = `translate3d(${mouseX}px, ${mouseY}px, 0)`;
    },
    { passive: true }
  );

  // Hide when leaving window
  document.addEventListener('mouseleave', () => {
    isVisible = false;
    dot.style.opacity = '0';
    ring.style.opacity = '0';
  });

  // Mouse down/up micro-action
  window.addEventListener('mousedown', () => {
    isClicking = true;
    ring.classList.add('cursor--clicking');
  });

  window.addEventListener('mouseup', () => {
    isClicking = false;
    ring.classList.remove('cursor--clicking');
  });

  // Attach hover expand states on interactive elements
  const interactiveTargets = 'a, button, input, textarea, select, .card-tilt-3d, .skill-tag, .btn';
  
  document.addEventListener('mouseover', (e) => {
    if (e.target.closest(interactiveTargets)) {
      isHovered = true;
      ring.classList.add('cursor--hover');
    }
  });

  document.addEventListener('mouseout', (e) => {
    if (e.target.closest(interactiveTargets)) {
      isHovered = false;
      ring.classList.remove('cursor--hover');
    }
  });

  // Spring animation loop for outer ring
  function renderLoop() {
    // Smooth lerp (0.16 interpolation for fluid lag)
    ringX += (mouseX - ringX) * 0.16;
    ringY += (mouseY - ringY) * 0.16;

    ring.style.transform = `translate3d(${ringX}px, ${ringY}px, 0)`;
    requestAnimationFrame(renderLoop);
  }

  requestAnimationFrame(renderLoop);
}
