/**
 * main.js — Application bootstrap & 3D Motion Orchestration
 *
 * Imports and initialises all JS modules and interactive engines.
 * 100% dependency-free Vanilla ES Modules architecture.
 */

import { initScrollAnimations, initPageEntrance } from './animations.js';
import { initNavbar } from '../components/navbar.js';
import { initHero   } from '../sections/hero.js';
import { initAbout  } from '../sections/about.js';
import { initSkills } from '../sections/skills.js';
import { initProjects } from '../sections/projects.js';
import { initEducation } from '../sections/education.js';
import { initCertificates } from '../sections/certificates.js';
import { initContact } from '../sections/contact.js';
import { initFooter } from '../sections/footer.js';

// Interactive 3D & Motion engines
import { initTilt } from './tilt.js';
import { initCursor } from './cursor.js';
import { initMagnetic } from './magnetic.js';
import { initBackground, initScrollProgress } from './background.js';

/**
 * Bootstrap — runs after DOM is parsed.
 */
function init() {
  // 1. Interactive Ambient Background & Scroll Progress
  initBackground();
  initScrollProgress();

  // 2. Navigation
  initNavbar();

  // 3. Section specific logic & entrance
  initHero();
  initAbout();
  initSkills();
  initProjects();
  initEducation();
  initCertificates();
  initContact();
  initFooter();

  // 4. Scroll & Viewport Observers
  initScrollAnimations();
  initPageEntrance();

  // 5. 3D Tilt, Magnetic Physics, & Custom Cursor
  initTilt();
  initMagnetic();
  initCursor();

  // Developer console signature
  if (typeof console !== 'undefined') {
    console.log(
      '%c  HaseebSahil Portfolio  ',
      [
        'background: linear-gradient(135deg, #6C63FF, #00E5D1)',
        'color: #fff',
        'padding: 6px 16px',
        'border-radius: 20px',
        'font-weight: 700',
        'font-size: 13px',
        'letter-spacing: 1px',
      ].join(';')
    );
    console.log('%cModern 3D & Motion System active. 0 dependencies.', 'color:#6B6B8D;font-size:11px;');
  }
}

// Run after DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init);
} else {
  init();
}
