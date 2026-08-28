/**
 * navbar.js — Responsive navigation bar component
 *
 * Features:
 *  - Mobile hamburger menu (open/close/Escape)
 *  - aria-expanded toggling
 *  - Menu closes on link click and Escape key
 *  - Scroll-shadow on navbar when page is scrolled
 *  - Active link tracking via IntersectionObserver
 *  - Keyboard accessible (Tab, Escape)
 *  - Focus trap: when menu open, Escape returns focus to hamburger
 *  - Works without JS (CSS fallback: all links visible at >=768px)
 */

import { $, $$, on, throttle } from '../js/utils.js';

/* ── Selectors ─────────────────────────────────────────── */
const SEL = {
  navbar:     '#navbar',
  hamburger:  '#nav-hamburger',
  mobileMenu: '#nav-mobile-menu',
  navLinks:   '.navbar__link',
  mobileLinks:'.navbar__mobile-link',
  sections:   'main [id]',     // all sections with an id
};

/* ── State ──────────────────────────────────────────────── */
let isMenuOpen = false;

/**
 * initNavbar()
 * Called from main.js once on DOMContentLoaded.
 */
export function initNavbar() {
  const navbar     = $(SEL.navbar);
  const hamburger  = $(SEL.hamburger);
  const mobileMenu = $(SEL.mobileMenu);

  if (!navbar || !hamburger || !mobileMenu) return;

  // Mark body as having a navbar (triggers padding-top offset)
  document.body.classList.add('has-navbar');

  _initScrollShadow(navbar);
  _initHamburger(hamburger, mobileMenu);
  _initMobileLinks(mobileMenu, hamburger);
  _initKeyboard(hamburger, mobileMenu);
  _initActiveTracking();
}

/* ── Scroll shadow ──────────────────────────────────────── */
function _initScrollShadow(navbar) {
  const update = throttle(() => {
    navbar.classList.toggle('is-scrolled', window.scrollY > 10);
  }, 80);

  on(window, 'scroll', update, { passive: true });
  update(); // set initial state
}

/* ── Hamburger open/close ───────────────────────────────── */
function _initHamburger(hamburger, mobileMenu) {
  on(hamburger, 'click', () => {
    isMenuOpen ? _closeMenu(hamburger, mobileMenu) : _openMenu(hamburger, mobileMenu);
  });
}

function _openMenu(hamburger, mobileMenu) {
  isMenuOpen = true;
  hamburger.setAttribute('aria-expanded', 'true');
  mobileMenu.classList.add('is-open');
  mobileMenu.removeAttribute('hidden');
  // Prevent body scroll while menu is open
  document.body.style.overflow = 'hidden';
  // Move focus to first mobile link
  const firstLink = mobileMenu.querySelector(SEL.mobileLinks);
  if (firstLink) firstLink.focus();
}

function _closeMenu(hamburger, mobileMenu) {
  isMenuOpen = false;
  hamburger.setAttribute('aria-expanded', 'false');
  mobileMenu.classList.remove('is-open');
  mobileMenu.setAttribute('hidden', '');
  document.body.style.overflow = '';
}

/* ── Mobile link clicks close the menu ─────────────────── */
function _initMobileLinks(mobileMenu, hamburger) {
  $$(SEL.mobileLinks, mobileMenu).forEach((link) => {
    on(link, 'click', () => {
      _closeMenu(hamburger, mobileMenu);
      hamburger.focus(); // return focus to trigger
    });
  });
}

/* ── Keyboard: Escape closes menu ──────────────────────── */
function _initKeyboard(hamburger, mobileMenu) {
  on(document, 'keydown', (e) => {
    if (e.key === 'Escape' && isMenuOpen) {
      _closeMenu(hamburger, mobileMenu);
      hamburger.focus();
    }
  });
}

/* ── Active section tracking (IntersectionObserver) ─────── */
function _initActiveTracking() {
  const navLinks    = $$(SEL.navLinks);
  const mobileLinks = $$(SEL.mobileLinks);
  const sections    = $$('section[id], main > *[id]');

  if (!sections.length || (!navLinks.length && !mobileLinks.length)) return;

  // Build map: section id → all matching nav links
  function getLinkMap() {
    const map = new Map();
    sections.forEach((section) => {
      const id = section.getAttribute('id');
      if (!id) return;
      const matched = [
        ...navLinks.filter((l) => l.getAttribute('href') === `#${id}`),
        ...mobileLinks.filter((l) => l.getAttribute('href') === `#${id}`),
      ];
      if (matched.length) map.set(id, matched);
    });
    return map;
  }

  const linkMap = getLinkMap();

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        const links = linkMap.get(entry.target.id);
        if (!links) return;
        links.forEach((link) => {
          link.classList.toggle('is-active', entry.isIntersecting);
          if (entry.isIntersecting) {
            link.setAttribute('aria-current', 'page');
          } else {
            link.removeAttribute('aria-current');
          }
        });
      });
    },
    {
      // Section is "active" when it occupies ≥15% of the viewport
      threshold: 0,
      rootMargin: `-${getNavbarHeight()}px 0px -55% 0px`,
    }
  );

  sections.forEach((s) => observer.observe(s));
}

function getNavbarHeight() {
  const navbar = $(SEL.navbar);
  return navbar ? navbar.offsetHeight : 68;
}
