/**
 * main.js — Application bootstrap & Fast 60 FPS Orchestration
 *
 * 100% dependency-free Vanilla ES Modules architecture.
 */

import { initScrollAnimations, initPageEntrance, initOffscreenAnimationPause } from './animations.js';
import { initNavbar } from '../components/navbar.js';
import { initHero   } from '../sections/hero.js';
import { initAbout  } from '../sections/about.js';
import { initSkills } from '../sections/skills.js';
import { initProjects } from '../sections/projects.js';
import { initEducation } from '../sections/education.js';
import { initCertificates } from '../sections/certificates.js';
import { initContact } from '../sections/contact.js';
import { initFooter } from '../sections/footer.js';
import { initResumeModal } from '../components/resumeModal.js';

// Interactive engines (Performance-first)
import { initTilt } from './tilt.js';
import { initMagnetic } from './magnetic.js';
import { initScrollProgress } from './background.js';

/**
 * Bootstrap — runs after DOM is parsed.
 */
function init() {
  // 1. Scroll Progress
  initScrollProgress();

  // 2. Navigation
  initNavbar();

  // 3. Section specific logic
  initHero();
  initAbout();
  initSkills();
  initProjects();
  initEducation();
  initCertificates();
  initContact();
  initFooter();
  initResumeModal();

  // 4. Scroll & Viewport Observers
  initScrollAnimations();
  initPageEntrance();
  initOffscreenAnimationPause();

  // 5. Fast 3D Tilt & Magnetic Physics
  initTilt();
  initMagnetic();

  if (typeof console !== 'undefined') {
    console.log(
      '%c  HaseebSahil — Portfolio  ',
      [
        'background: linear-gradient(135deg, #2563EB, #0EA5E9, #14B8A6)',
        'color: #FFFFFF',
        'padding: 6px 14px',
        'border-radius: 6px',
        'font-weight: 600',
        'font-size: 12px',
      ].join(';')
    );
    console.log('%cFast 60 FPS Engine active. 0 external dependencies.', 'color:#6B6B8D;font-size:11px;');
  }
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init);
} else {
  init();
}
