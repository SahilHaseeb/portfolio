/**
 * contactForm.js — Client-side contact form validation & static host handler
 *
 * Features:
 *  - Real-time and on-submit field validation (Name, Email, Subject, Message)
 *  - Inline accessible error messages linked with aria-describedby
 *  - Static hosting compatibility: Honest submission dialog with mailto fallback
 *  - Zero data storage or fake backend claims
 */

import { $, $$, on } from "../js/utils.js";

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/**
 * Initializes validation and submission UX for the contact form.
 */
export function initContactForm() {
  const form = $("#contact-form");
  if (!form) return;

  const fields = {
    name: $("#contact-name"),
    email: $("#contact-email"),
    subject: $("#contact-subject"),
    message: $("#contact-message"),
  };

  const statusContainer = $("#contact-form-status");

  // Real-time blur validation
  Object.keys(fields).forEach((key) => {
    const field = fields[key];
    if (!field) return;

    on(field, "input", () => {
      if (field.classList.contains("has-error")) {
        validateField(key, field);
      }
    });

    on(field, "blur", () => {
      validateField(key, field);
    });
  });

  // On form submit
  on(form, "submit", (e) => {
    e.preventDefault();

    let isValid = true;
    Object.keys(fields).forEach((key) => {
      const fieldValid = validateField(key, fields[key]);
      if (!fieldValid) isValid = false;
    });

    if (!isValid) {
      // Focus first invalid field
      const firstInvalid = $(".has-error", form);
      if (firstInvalid) firstInvalid.focus();
      return;
    }

    // Static site submission dialog
    handleStaticSubmission(form, fields, statusContainer);
  });
}

/**
 * Validates a single input field and updates its accessible error state.
 * @param {string} fieldName
 * @param {HTMLInputElement|HTMLTextAreaElement} field
 * @returns {boolean} True if valid
 */
function validateField(fieldName, field) {
  const errorEl = $(`#${field.id}-error`);
  const value = field.value.trim();
  let errorMsg = "";

  switch (fieldName) {
    case "name":
      if (!value) {
        errorMsg = "Please enter your name.";
      } else if (value.length < 2) {
        errorMsg = "Name must be at least 2 characters.";
      }
      break;

    case "email":
      if (!value) {
        errorMsg = "Please enter your email address.";
      } else if (!EMAIL_REGEX.test(value)) {
        errorMsg = "Please enter a valid email address (e.g. name@example.com).";
      }
      break;

    case "subject":
      if (!value) {
        errorMsg = "Please enter a subject.";
      } else if (value.length < 3) {
        errorMsg = "Subject must be at least 3 characters.";
      }
      break;

    case "message":
      if (!value) {
        errorMsg = "Please write a message.";
      } else if (value.length < 10) {
        errorMsg = "Message must be at least 10 characters.";
      }
      break;
  }

  if (errorMsg) {
    field.classList.add("has-error");
    field.setAttribute("aria-invalid", "true");
    if (errorEl) {
      errorEl.textContent = errorMsg;
      errorEl.classList.remove("hidden");
    }
    return false;
  } else {
    field.classList.remove("has-error");
    field.setAttribute("aria-invalid", "false");
    if (errorEl) {
      errorEl.textContent = "";
      errorEl.classList.add("hidden");
    }
    return true;
  }
}

/**
 * Handles static hosting form submission:
 * Communicates that static deployment requires form service config,
 * and offers a safe mailto alternative with pre-filled content.
 * @param {HTMLFormElement} form
 * @param {object} fields
 * @param {HTMLElement} statusContainer
 */
function handleStaticSubmission(form, fields, statusContainer) {
  if (!statusContainer) return;

  const nameVal = encodeURIComponent(fields.name.value.trim());
  const subjectVal = encodeURIComponent(
    `[Portfolio Inquiry] ${fields.subject.value.trim()}`
  );
  const messageVal = encodeURIComponent(
    `From: ${fields.name.value.trim()} (${fields.email.value.trim()})\n\n${fields.message.value.trim()}`
  );

  // Mailto fallback (uses placeholder recipient)
  const mailtoUrl = `mailto:your-email@example.com?subject=${subjectVal}&body=${messageVal}`;

  statusContainer.innerHTML = `
    <div class="form-status form-status--info fade-up" role="region" aria-label="Submission feedback">
      <div class="form-status__header">
        <span class="form-status__icon" aria-hidden="true">ℹ️</span>
        <h4 class="form-status__title">Form Ready for Configuration</h4>
      </div>
      <p class="form-status__body">
        Thank you for reaching out! Since this portfolio is statically hosted on <strong>Render</strong>,
        direct form submission can be connected to any free form service (such as <em>Formspree</em> or <em>Web3Forms</em>)
        by updating the form's <code>action</code> attribute.
      </p>
      <div class="form-status__actions">
        <a href="${mailtoUrl}" class="btn btn--primary btn--sm" id="btn-mailto-fallback">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">
            <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
            <polyline points="22,6 12,13 2,6"/>
          </svg>
          Send via Email Client
        </a>
        <button type="button" class="btn btn--outline btn--sm" id="btn-reset-form">
          Edit Message
        </button>
      </div>
    </div>
  `;

  statusContainer.classList.remove("hidden");

  // Scroll smoothly to the status feedback
  statusContainer.scrollIntoView({ behavior: "smooth", block: "nearest" });

  const resetBtn = $("#btn-reset-form");
  if (resetBtn) {
    on(resetBtn, "click", () => {
      statusContainer.innerHTML = "";
      statusContainer.classList.add("hidden");
      fields.name.focus();
    });
  }
}
