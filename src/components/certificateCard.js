/**
 * certificateCard.js — Reusable certificate & credential card component
 *
 * Renders an accessible, semantic HTML article element for a certificate entry.
 * Gracefully handles optional fields (credential ID, PDF document, verification link).
 */

/**
 * Creates the HTML string for a single certificate card.
 * @param {import('../data/certificates.js').CERTIFICATES[0]} cert
 * @returns {string} HTML markup
 */
export function createCertificateCardHTML(cert) {
  // Status badge
  const statusBadge =
    cert.status === "Completed"
      ? `<span class="badge badge--success"><span class="badge__dot" aria-hidden="true"></span>Verified</span>`
      : `<span class="badge badge--warning"><span class="badge__dot" aria-hidden="true"></span>${cert.status}</span>`;

  // Credential ID pill (if available)
  const credentialIdHTML = cert.credentialId
    ? `<span class="cert-card__id" title="Credential ID"><span class="text-muted">ID:</span> <code>${cert.credentialId}</code></span>`
    : "";

  // Skills tags
  const skillsHTML =
    cert.skills && cert.skills.length > 0
      ? `
        <ul class="cert-card__skills" aria-label="Topics validated by this certificate">
          ${cert.skills.map((skill) => `<li><span class="badge">${skill}</span></li>`).join("")}
        </ul>
      `
      : "";

  // Action buttons (verification link and/or document PDF)
  const verifyBtn = cert.verifyUrl
    ? `
      <a
        href="${cert.verifyUrl}"
        class="btn btn--outline btn--sm cert-card__action"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Verify ${cert.title} credential externally"
      >
        <svg class="cert-card__btn-icon" viewBox="0 0 16 16" fill="none" aria-hidden="true" width="14" height="14">
          <path d="M6 3h7v7M13 3L6 10" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
        Verify Credential
      </a>
    `
    : "";

  const pdfBtn = cert.pdfUrl
    ? `
      <a
        href="${cert.pdfUrl}"
        class="btn btn--ghost btn--sm cert-card__action"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="View or download ${cert.title} PDF certificate"
      >
        <svg class="cert-card__btn-icon" viewBox="0 0 16 16" fill="none" aria-hidden="true" width="14" height="14">
          <path d="M8 2v8M5 7l3 3 3-3M3 13h10" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
        View PDF
      </a>
    `
    : "";

  const actionsHTML =
    verifyBtn || pdfBtn
      ? `<div class="cert-card__actions">${verifyBtn}${pdfBtn}</div>`
      : "";

  // Visual header: Image preview or stylized credential badge
  const visualHTML = cert.image
    ? `
      <div class="cert-card__visual">
        <img
          src="${cert.image}"
          alt="${cert.title} certificate preview"
          class="cert-card__img"
          loading="lazy"
          width="400"
          height="220"
        />
      </div>
    `
    : `
      <div class="cert-card__header-graphic" aria-hidden="true">
        <span class="cert-card__icon">📜</span>
        <span class="cert-card__issuer-tag">${cert.issuer}</span>
      </div>
    `;

  return `
    <article
      class="cert-card fade-up"
      id="${cert.id}"
      tabindex="0"
      aria-labelledby="title-${cert.id}"
    >
      ${visualHTML}

      <div class="cert-card__body">
        <div class="cert-card__meta">
          <span class="cert-card__date">${cert.date}</span>
          ${statusBadge}
        </div>

        <h3 id="title-${cert.id}" class="cert-card__title">
          ${cert.title}
        </h3>

        <p class="cert-card__issuer">
          Issued by <strong>${cert.issuer}</strong>
        </p>

        ${credentialIdHTML}
        ${skillsHTML}
        ${actionsHTML}
      </div>
    </article>
  `;
}
