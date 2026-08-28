/**
 * projects.js — Projects section controller & dynamic filter engine
 *
 * Responsibilities:
 *  - Dynamically renders category filter buttons from data/projects.js
 *  - Filters and renders project cards into the responsive grid
 *  - Handles empty state when no projects match a filter
 *  - Updates aria-pressed attributes for accessibility
 *  - Triggers scroll reveal animations on dynamically rendered cards
 */

import { CATEGORIES, PROJECTS } from "../data/projects.js";
import { createProjectCardHTML } from "../components/projectCard.js";
import { $, $$, on } from "../js/utils.js";
import { initScrollAnimations } from "../js/animations.js";

let currentFilter = "All";

/**
 * Initializes the projects showcase section.
 */
export function initProjects() {
  const filterContainer = $("#projects-filter");
  const gridContainer = $("#projects-grid");

  if (!filterContainer || !gridContainer) return;

  // 1. Render Category Filter Navigation
  renderFilters(filterContainer, gridContainer);

  // 2. Initial Render of All Projects
  renderProjects(gridContainer, currentFilter);
}

/**
 * Renders category filter buttons into the container.
 * @param {HTMLElement} filterContainer
 * @param {HTMLElement} gridContainer
 */
function renderFilters(filterContainer, gridContainer) {
  filterContainer.innerHTML = CATEGORIES.map((category) => {
    const isActive = category === currentFilter;
    return `
      <button
        type="button"
        class="projects-filter__btn ${isActive ? "is-active" : ""}"
        data-category="${category}"
        aria-pressed="${isActive ? "true" : "false"}"
      >
        ${category}
      </button>
    `;
  }).join("");

  // Attach event delegation for filter clicks
  const filterButtons = $$(".projects-filter__btn", filterContainer);
  filterButtons.forEach((btn) => {
    on(btn, "click", () => {
      const selectedCategory = btn.dataset.category;
      if (selectedCategory === currentFilter) return;

      currentFilter = selectedCategory;

      // Update button states
      filterButtons.forEach((b) => {
        const active = b.dataset.category === currentFilter;
        b.classList.toggle("is-active", active);
        b.setAttribute("aria-pressed", active ? "true" : "false");
      });

      // Filter and render cards
      renderProjects(gridContainer, currentFilter);
    });
  });
}

/**
 * Renders project cards matching the selected filter.
 * @param {HTMLElement} gridContainer
 * @param {string} filter
 */
function renderProjects(gridContainer, filter) {
  const filtered =
    filter === "All"
      ? PROJECTS
      : PROJECTS.filter((p) => p.category === filter);

  if (filtered.length === 0) {
    gridContainer.innerHTML = `
      <div class="projects__empty fade-up">
        <span class="projects__empty-icon" aria-hidden="true">📂</span>
        <h3 class="projects__empty-title">No projects in this category yet</h3>
        <p class="projects__empty-desc">
          Check back soon or select another category above to view ongoing work.
        </p>
      </div>
    `;
  } else {
    gridContainer.innerHTML = filtered
      .map((project) => createProjectCardHTML(project))
      .join("");
  }

  // Re-initialize intersection observer for freshly rendered cards
  initScrollAnimations();
}
