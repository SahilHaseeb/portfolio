/**
 * resumeModal.js — Interactive In-Browser Resume Viewer & Downloader
 *
 * Features:
 *  - Native embedded PDF viewer iframe with automatic source lazy-mounting
 *  - Dual-mode view: Embedded PDF Document & Interactive Digital CV view
 *  - Direct PDF download with proper filename (Muhammad_Haseeb_Resume.pdf)
 *  - Full keyboard accessibility (Tab, Escape key) & focus restoration
 *  - Zero external dependencies
 */

import { $, $$, on } from "../js/utils.js";

const RESUME_PDF_URL = "/public/assets/documents/resume.pdf";
const RESUME_FILENAME = "Muhammad_Haseeb_Resume.pdf";

let lastFocusedElement = null;

/**
 * Initializes the Resume Viewer Modal and triggers.
 */
export function initResumeModal() {
  const modal = $("#resume-modal");
  if (!modal) return;

  const closeBtn = $("#resume-modal-close");
  const backdrop = $("#resume-modal-backdrop");
  const tabPdf = $("#resume-tab-pdf");
  const tabCv = $("#resume-tab-cv");
  const viewPdf = $("#resume-view-pdf");
  const viewCv = $("#resume-view-cv");
  const downloadBtns = $$(".js-download-resume");

  // Wire trigger buttons across the site
  const triggers = $$("[data-action='view-resume'], .js-open-resume");
  triggers.forEach((btn) => {
    on(btn, "click", (e) => {
      e.preventDefault();
      openResumeModal();
    });
  });

  // Wire download buttons
  downloadBtns.forEach((btn) => {
    on(btn, "click", (e) => {
      // Allow default download behavior or handle explicitly
      btn.setAttribute("download", RESUME_FILENAME);
    });
  });

  // Close actions
  if (closeBtn) {
    on(closeBtn, "click", () => closeResumeModal());
  }

  if (backdrop) {
    on(backdrop, "click", () => closeResumeModal());
  }

  // Keyboard Escape
  on(document, "keydown", (e) => {
    if (e.key === "Escape" && modal.classList.contains("is-open")) {
      closeResumeModal();
    }
  });

  // View tabs switching
  if (tabPdf && tabCv && viewPdf && viewCv) {
    on(tabPdf, "click", () => {
      tabPdf.classList.add("is-active");
      tabPdf.setAttribute("aria-selected", "true");
      tabCv.classList.remove("is-active");
      tabCv.setAttribute("aria-selected", "false");

      viewPdf.classList.remove("hidden");
      viewCv.classList.add("hidden");
      ensurePdfLoaded();
    });

    on(tabCv, "click", () => {
      tabCv.classList.add("is-active");
      tabCv.setAttribute("aria-selected", "true");
      tabPdf.classList.remove("is-active");
      tabPdf.setAttribute("aria-selected", "false");

      viewCv.classList.remove("hidden");
      viewPdf.classList.add("hidden");
    });
  }
}

/**
 * Opens the Resume Viewer Modal.
 */
export function openResumeModal() {
  const modal = $("#resume-modal");
  if (!modal) return;

  lastFocusedElement = document.activeElement;

  modal.classList.add("is-open");
  modal.removeAttribute("hidden");
  modal.setAttribute("aria-hidden", "false");
  document.body.style.overflow = "hidden";

  // Ensure iframe src is loaded
  ensurePdfLoaded();

  // Focus close button or first interactive element
  const closeBtn = $("#resume-modal-close");
  if (closeBtn) closeBtn.focus();
}

/**
 * Closes the Resume Viewer Modal.
 */
export function closeResumeModal() {
  const modal = $("#resume-modal");
  if (!modal) return;

  modal.classList.remove("is-open");
  modal.setAttribute("hidden", "");
  modal.setAttribute("aria-hidden", "true");
  document.body.style.overflow = "";

  if (lastFocusedElement && typeof lastFocusedElement.focus === "function") {
    lastFocusedElement.focus();
  }
}

/**
 * Lazy loads the PDF into the iframe when modal is first opened.
 */
function ensurePdfLoaded() {
  const iframe = $("#resume-pdf-iframe");
  if (iframe && !iframe.getAttribute("src")) {
    iframe.setAttribute("src", RESUME_PDF_URL);
  }
}
