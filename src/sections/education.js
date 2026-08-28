/**
 * education.js — Education & Learning Journey section controller
 *
 * Responsibilities:
 *  - Dynamically renders the formal education degree timeline/card
 *  - Dynamically renders the progressive Learning Journey roadmap
 *  - Connects to existing animation observer for scroll reveals
 */

import { EDUCATION_DATA, LEARNING_ROADMAP } from "../data/education.js";
import { $ } from "../js/utils.js";
import { initScrollAnimations } from "../js/animations.js";

/**
 * Initializes the Education & Learning Journey section.
 */
export function initEducation() {
  const eduContainer = $("#education-cards");
  const roadmapContainer = $("#learning-roadmap");

  if (!eduContainer && !roadmapContainer) return;

  if (eduContainer) {
    renderEducation(eduContainer);
  }

  if (roadmapContainer) {
    renderRoadmap(roadmapContainer);
  }

  initScrollAnimations();
}

/**
 * Renders education timeline entries.
 * @param {HTMLElement} container
 */
function renderEducation(container) {
  container.innerHTML = EDUCATION_DATA.map((item) => {
    const courseworkList = item.coursework
      .map((course) => `<li><span class="skill-tag">${course}</span></li>`)
      .join("");

    const highlightsList = item.highlights
      .map((highlight) => `<li>${highlight}</li>`)
      .join("");

    return `
      <article class="edu-card fade-up" id="${item.id}" tabindex="0" aria-labelledby="edu-title-${item.id}">
        <div class="edu-card__header">
          <div class="edu-card__badge-wrap">
            <span class="edu-card__icon" aria-hidden="true">🎓</span>
            <div>
              <span class="badge badge--accent">${item.status}</span>
              <span class="edu-card__period">${item.period}</span>
            </div>
          </div>
          <h3 id="edu-title-${item.id}" class="edu-card__degree">${item.degree}</h3>
          <p class="edu-card__institution">${item.institution}</p>
        </div>

        <div class="edu-card__body">
          <p class="edu-card__desc">${item.description}</p>

          <div class="edu-card__highlights-wrap">
            <h4 class="edu-card__subheading">Academic Focus & Highlights</h4>
            <ul class="edu-card__highlights">
              ${highlightsList}
            </ul>
          </div>

          <div class="edu-card__coursework-wrap">
            <h4 class="edu-card__subheading">Relevant Coursework</h4>
            <ul class="edu-card__coursework" aria-label="Relevant coursework for ${item.degree}">
              ${courseworkList}
            </ul>
          </div>
        </div>
      </article>
    `;
  }).join("");
}

/**
 * Renders the progressive Learning Journey roadmap.
 * @param {HTMLElement} container
 */
function renderRoadmap(container) {
  container.innerHTML = LEARNING_ROADMAP.map((node) => {
    let badgeClass = "badge";
    if (node.status === "Completed") badgeClass = "badge badge--success";
    else if (node.status === "In Progress") badgeClass = "badge badge--accent";
    else badgeClass = "badge badge--primary";

    const topicsHTML = node.topics
      .map((topic) => `<span class="roadmap-node__tag">${topic}</span>`)
      .join("");

    return `
      <div class="roadmap-node roadmap-node--${node.status.toLowerCase().replace(" ", "-")} fade-up" tabindex="0">
        <div class="roadmap-node__marker" aria-hidden="true">
          <span class="roadmap-node__phase">${node.phase}</span>
        </div>

        <div class="roadmap-node__card">
          <div class="roadmap-node__header">
            <h3 class="roadmap-node__title">${node.title}</h3>
            <span class="${badgeClass}">${node.statusLabel}</span>
          </div>

          <p class="roadmap-node__desc">${node.description}</p>

          <div class="roadmap-node__topics" aria-label="Key topics in ${node.title}">
            ${topicsHTML}
          </div>
        </div>
      </div>
    `;
  }).join("");
}
