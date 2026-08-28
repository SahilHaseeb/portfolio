/**
 * footer.js — Footer & Back-to-Top controller
 *
 * Responsibilities:
 *  - Dynamically sets the current copyright year
 *  - Controls the floating "Back to Top" button visibility on scroll
 *  - Handles smooth keyboard-accessible scroll-to-top action
 */

import { $, on, throttle } from "../js/utils.js";

/**
 * Initializes footer and back-to-top interactions.
 */
export function initFooter() {
  initCopyrightYear();
  initBackToTop();
}

/**
 * Ensures copyright year stays current.
 */
function initCopyrightYear() {
  const yearEl = $("#footer-year");
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }
}

/**
 * Wires the floating Back-to-Top button.
 */
function initBackToTop() {
  const btn = $("#back-to-top");
  if (!btn) return;

  const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  // Toggle button visibility based on scroll position (past 350px)
  const toggleVisibility = throttle(() => {
    if (window.scrollY > 350) {
      btn.classList.add("is-visible");
      btn.removeAttribute("tabindex");
    } else {
      btn.classList.remove("is-visible");
      btn.setAttribute("tabindex", "-1");
    }
  }, 100);

  on(window, "scroll", toggleVisibility, { passive: true });
  toggleVisibility(); // initial check

  // Scroll to top on click
  on(btn, "click", () => {
    window.scrollTo({
      top: 0,
      behavior: prefersReduced ? "auto" : "smooth",
    });

    // Move focus to skip link / top of page for screen readers
    const skipLink = $("#skip-link");
    if (skipLink) skipLink.focus();
  });
}
