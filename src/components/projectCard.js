/**
 * projectCard.js — Reusable Project Showcase Card Component
 *
 * Renders an accessible, semantic HTML article element for a project.
 * Features 3D depth layers and hardware-accelerated transitions.
 */

function getCategoryIcon(category) {
  switch (category) {
    case "AI / ML":
      return "🤖";
    case "Data Science":
      return "📊";
    case "Web Development":
      return "🌐";
    case "Web Scraping":
      return "🕷️";
    default:
      return "💡";
  }
}

export function createProjectCardHTML(project) {
  const icon = getCategoryIcon(project.category);

  // High-tech Cyber Visual Header
  const visualHTML = project.image
    ? `
      <div class="project-card__image-wrap">
        <img
          src="${project.image}"
          alt="${project.title} preview screenshot"
          class="project-card__img"
          loading="lazy"
          width="480"
          height="270"
        />
      </div>
    `
    : `
      <div class="project-card__cyber-header" aria-hidden="true">
        <div class="project-card__cyber-grid"></div>
        <div class="project-card__cyber-badge">
          <span class="project-card__cyber-icon">${icon}</span>
          <span class="project-card__cyber-domain">${project.category}</span>
        </div>
      </div>
    `;

  // Status & Featured badges
  const statusBadge =
    project.status === "Completed"
      ? `<span class="badge badge--success"><span class="badge__dot" aria-hidden="true"></span>${project.status}</span>`
      : `<span class="badge badge--warning"><span class="badge__dot" aria-hidden="true"></span>${project.status}</span>`;

  const featuredBadge = project.featured
    ? `<span class="badge badge--primary"><span class="badge__dot badge__dot--pulse" aria-hidden="true"></span>Featured Project</span>`
    : "";

  // Technology tags
  const techTagsHTML = project.technologies
    .map((tech) => `<li><span class="badge">${tech}</span></li>`)
    .join("");

  // Actions
  const githubButton = project.githubUrl
    ? `
      <a
        href="${project.githubUrl}"
        class="btn btn--outline btn--sm project-card__action"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="View source code for ${project.title} on GitHub"
      >
        <svg class="project-card__btn-icon" viewBox="0 0 24 24" aria-hidden="true" width="15" height="15" fill="currentColor">
          <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"/>
        </svg>
        Code
      </a>
    `
    : "";

  const liveButton = project.liveUrl
    ? `
      <a
        href="${project.liveUrl}"
        class="btn btn--primary btn--sm btn--magnetic project-card__action"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="View live deployment for ${project.title}"
      >
        <svg class="project-card__btn-icon" viewBox="0 0 16 16" fill="none" aria-hidden="true" width="14" height="14">
          <path d="M6 3h7v7M13 3L6 10" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
        Live Demo
      </a>
    `
    : "";

  return `
    <article
      class="project-card card-tilt-3d ${project.featured ? "project-card--featured" : ""} fade-up"
      data-category="${project.category}"
      id="${project.id}"
      tabindex="0"
      aria-labelledby="title-${project.id}"
    >
      ${visualHTML}

      <div class="project-card__body">
        <div class="project-card__meta">
          <span class="badge badge--accent">${project.category}</span>
          ${featuredBadge}
          ${statusBadge}
        </div>

        <h3 id="title-${project.id}" class="project-card__title">
          ${project.title}
        </h3>

        <p class="project-card__desc">
          ${project.shortDescription}
        </p>

        <ul class="project-card__tech" aria-label="Technologies used in ${project.title}">
          ${techTagsHTML}
        </ul>

        <div class="project-card__actions">
          ${githubButton}
          ${liveButton}
        </div>
      </div>
    </article>
  `;
}
