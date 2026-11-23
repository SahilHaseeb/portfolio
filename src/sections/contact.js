/**
 * contact.js — Contact section controller
 *
 * Responsibilities:
 *  - Initializes client-side contact form validation
 *  - Handles email copy-to-clipboard helper
 *  - Handles resume document placeholder helper
 */

import { initContactForm } from "../components/contactForm.js";
import { $, on } from "../js/utils.js";
import { initScrollAnimations } from "../js/animations.js";

/**
 * Initializes the Contact section.
 */
export function initContact() {
  initContactForm();
  initCopyEmail();
  initScrollAnimations();
}

/**
 * Provides a copy-to-clipboard helper on the contact email button.
 */
function initCopyEmail() {
  const copyBtn = $("#btn-copy-email");
  const emailText = $("#contact-email-val");

  if (!copyBtn || !emailText) return;

  on(copyBtn, "click", async () => {
    const textToCopy = emailText.textContent.trim();
    try {
      if (navigator.clipboard && window.isSecureContext) {
        await navigator.clipboard.writeText(textToCopy);
      } else {
        // Fallback for non-https / testing environments
        const textArea = document.createElement("textarea");
        textArea.value = textToCopy;
        textArea.style.position = "fixed";
        textArea.style.opacity = "0";
        document.body.appendChild(textArea);
        textArea.select();
        document.execCommand("copy");
        document.body.removeChild(textArea);
      }

      const originalHTML = copyBtn.innerHTML;
      copyBtn.innerHTML = `
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">
          <polyline points="20 6 9 17 4 12"></polyline>
        </svg>
        Copied!
      `;
      copyBtn.classList.add("btn--copied");

      setTimeout(() => {
        copyBtn.innerHTML = originalHTML;
        copyBtn.classList.remove("btn--copied");
      }, 2000);
    } catch (err) {
      console.warn("Could not copy email to clipboard", err);
    }
  });
}


