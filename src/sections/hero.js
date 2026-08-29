/**
 * hero.js — Hero Section & 3D Interactive Workspace
 *
 * Features:
 *  - Staggered entrance animation for hero elements
 *  - Interactive 3D Perspective Parallax on the Hero Cyber-Workspace
 *  - Smooth lerp physics and multi-layer depth response
 *  - Respects prefers-reduced-motion & touch devices
 */

import { $$, $ } from '../js/utils.js';

export function initHero() {
  _initStaggeredEntrance();
  _init3DParallax();
}

/* ── Staggered entrance ─────────────────────────────────── */
function _initStaggeredEntrance() {
  const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  const elements = $$('[data-entrance]', $('#hero'));
  if (!elements.length) return;

  if (prefersReduced) {
    elements.forEach((el) => el.classList.add('is-visible'));
    return;
  }

  elements.forEach((el, index) => {
    const baseDelay = 70;
    const delay = index * baseDelay;
    setTimeout(() => {
      requestAnimationFrame(() => el.classList.add('is-visible'));
    }, delay);
  });
}

/* ── 3D Perspective Parallax Workspace ───────────────────── */
function _init3DParallax() {
  const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const isFinePointer = window.matchMedia('(pointer: fine)').matches;

  if (prefersReduced || !isFinePointer) return;

  const heroSection = $('#hero');
  const workspace = $('.hero-3d-workspace');
  const depthElements = $$('[data-depth]', heroSection);

  if (!heroSection || !workspace) return;

  let mouseX = 0;
  let mouseY = 0;
  let currentRotX = 0;
  let currentRotY = 0;
  let isHovered = false;
  let rafId = null;

  const MAX_ROT_X = 6;  // Max deg pitch
  const MAX_ROT_Y = 8;  // Max deg yaw

  heroSection.addEventListener(
    'pointermove',
    (e) => {
      const rect = heroSection.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;

      mouseX = (x / (rect.width / 2));
      mouseY = (y / (rect.height / 2));

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
    const targetRotX = -mouseY * MAX_ROT_X;
    const targetRotY = mouseX * MAX_ROT_Y;

    // Smooth Lerp
    currentRotX += (targetRotX - currentRotX) * 0.08;
    currentRotY += (targetRotY - currentRotY) * 0.08;

    workspace.style.transform = `perspective(1200px) rotateX(${currentRotX.toFixed(2)}deg) rotateY(${currentRotY.toFixed(2)}deg)`;

    // Multi-layer depth parallax on child items
    depthElements.forEach((el) => {
      const depth = parseFloat(el.dataset.depth) || 0.04;
      const transX = mouseX * depth * 80;
      const transY = mouseY * depth * 80;
      el.style.transform = `translate3d(${transX.toFixed(1)}px, ${transY.toFixed(1)}px, 0)`;
    });

    if (isHovered || Math.abs(currentRotX) > 0.05 || Math.abs(currentRotY) > 0.05) {
      rafId = requestAnimationFrame(_loop);
    } else {
      workspace.style.transform = 'perspective(1200px) rotateX(0deg) rotateY(0deg)';
      depthElements.forEach((el) => {
        el.style.transform = 'translate3d(0, 0, 0)';
      });
      cancelAnimationFrame(rafId);
    }
  }
}
