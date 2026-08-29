/**
 * certificates.js — Certificates & achievements section controller
 *
 * Responsibilities:
 *  - Dynamically renders certificate cards from data/certificates.js
 *  - Handles empty state when no certificates exist
 *  - Triggers scroll animations on newly mounted cards
 */

import { CERTIFICATES } from "../data/certificates.js";
import { createCertificateCardHTML } from "../components/certificateCard.js";
import { $ } from "../js/utils.js";
import { initScrollAnimations } from "../js/animations.js";
import { initTilt } from "../js/tilt.js";

/**
 * Initializes the Certificates section.
 */
export function initCertificates() {
  const container = $("#certificates-grid");
  if (!container) return;

  if (!CERTIFICATES || CERTIFICATES.length === 0) {
    container.innerHTML = `
      <div class="certificates__empty fade-up">
        <span class="certificates__empty-icon" aria-hidden="true">📜</span>
        <h3 class="certificates__empty-title">Certificates will be added here</h3>
        <p class="certificates__empty-desc">
          Verified certificates, course specializations, and credentials will be displayed as they are completed.
        </p>
      </div>
    `;
  } else {
    container.innerHTML = CERTIFICATES.map((cert) =>
      createCertificateCardHTML(cert)
    ).join("");
  }

  initScrollAnimations();
  initTilt();
}
