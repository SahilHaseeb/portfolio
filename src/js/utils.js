/**
 * utils.js — Shared utility functions
 * Pure helpers with no side effects. Importable anywhere.
 */

/**
 * Throttle a function to run at most once per `limit` ms.
 * @param {Function} fn
 * @param {number} limit
 */
export function throttle(fn, limit = 100) {
  let lastRun = 0;
  return function (...args) {
    const now = Date.now();
    if (now - lastRun >= limit) {
      lastRun = now;
      fn.apply(this, args);
    }
  };
}

/**
 * Debounce a function — only fires after `delay` ms of silence.
 * @param {Function} fn
 * @param {number} delay
 */
export function debounce(fn, delay = 200) {
  let timer;
  return function (...args) {
    clearTimeout(timer);
    timer = setTimeout(() => fn.apply(this, args), delay);
  };
}

/**
 * Query selector shorthand.
 * @param {string} selector
 * @param {Element} [root=document]
 */
export function $(selector, root = document) {
  return root.querySelector(selector);
}

/**
 * Query selector all shorthand — returns real Array.
 * @param {string} selector
 * @param {Element} [root=document]
 */
export function $$(selector, root = document) {
  return Array.from(root.querySelectorAll(selector));
}

/**
 * Add an event listener with optional cleanup.
 * @param {EventTarget} target
 * @param {string} event
 * @param {Function} handler
 * @param {object} [options]
 * @returns {Function} cleanup function
 */
export function on(target, event, handler, options) {
  target.addEventListener(event, handler, options);
  return () => target.removeEventListener(event, handler, options);
}

/**
 * Check if an element is in the viewport.
 * @param {Element} el
 * @param {number} [threshold=0.15]
 */
export function isInViewport(el, threshold = 0.15) {
  const rect = el.getBoundingClientRect();
  const windowHeight = window.innerHeight || document.documentElement.clientHeight;
  return rect.top <= windowHeight * (1 - threshold) && rect.bottom >= 0;
}

/**
 * Generate a unique ID string.
 */
export function uid() {
  return Math.random().toString(36).slice(2, 9);
}
