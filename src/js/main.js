/**
 * main.js — Application bootstrap
 *
 * Imports and initialises all JS modules.
 * Future sections wire up here — one import + one init() call.
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

// Future imports (added per step):
// import { initTheme }    from '../components/themeToggle.js';

/**
 * Bootstrap — runs after DOM is parsed.
 */
function init() {
  // 1. Navigation (must be first — sets body padding)
  initNavbar();

  // 2. Hero entrance animations (section-specific stagger)
  initHero();

  // 3. About section
  initAbout();

  // 4. Skills section
  initSkills();

  // 5. Projects showcase & dynamic filtering
  initProjects();

  // 6. Education & Learning Journey
  initEducation();

  // 7. Certificates & Achievements
  initCertificates();

  // 8. Contact section & form validation
  initContact();

  // 9. Footer & Back-to-Top
  initFooter();

  // 10. Generic scroll-triggered animations (IntersectionObserver)
  initScrollAnimations();

  // 11. Generic above-fold entrance (non-hero)
  initPageEntrance();

  // Developer console signature
  if (typeof console !== 'undefined') {
    console.log(
      '%c  Portfolio  ',
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
    console.log('%cNavbar + Hero + About + Skills loaded. Step 4 complete.', 'color:#6B6B8D;font-size:11px;');
  }
}

// Run after DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init);
} else {
  init();
}

