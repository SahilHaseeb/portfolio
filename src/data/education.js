/**
 * education.js — Academic background & Learning Journey data
 *
 * Single source of truth for formal education and self-directed learning roadmap.
 */

export const EDUCATION_DATA = [
  {
    id: "degree-1",
    degree: "BS Computer Science",
    institution: "COMSATS University Islamabad",
    period: "2024 — 2028",
    status: "In Progress",
    description:
      "Pursuing a Bachelor of Science in Computer Science at COMSATS University Islamabad with an academic focus on core computing fundamentals, data structures, algorithmic problem solving, and modern AI technologies.",
    coursework: [
      "Data Structures & Algorithms",
      "Database Systems",
      "Artificial Intelligence",
      "Computer Networks",
      "Object-Oriented Programming",
      "Software Engineering",
      "Discrete Mathematics",
      "Operating Systems",
    ],
    highlights: [
      "Relevant Learning: Full Stack Python with AI",
      "Building practical solutions across Data Science, Machine Learning, Deep Learning, and Web Scraping",
      "Applying coursework concepts directly through hands-on project implementations",
    ],
  },
];

export const LEARNING_ROADMAP = [
  {
    phase: "01",
    title: "Core Computing Foundations",
    status: "Completed",
    statusLabel: "Solid Foundation",
    description:
      "Object-oriented programming, data structures, algorithmic thinking, and discrete mathematics.",
    topics: ["Python", "Data Structures", "Algorithms", "OOP Principles", "Problem Solving"],
  },
  {
    phase: "02",
    title: "Full Stack Python & Workflow",
    status: "Completed",
    statusLabel: "Working Knowledge",
    description:
      "Modular Python development, web fundamentals, version control with Git/GitHub, and development workflows.",
    topics: ["Python", "HTML", "CSS", "JavaScript", "Git", "GitHub", "VS Code"],
  },
  {
    phase: "03",
    title: "Data Science & Analysis",
    status: "In Progress",
    statusLabel: "Active Focus",
    description:
      "Data wrangling, matrix computation, exploratory data analysis, and visual storytelling.",
    topics: ["NumPy", "Pandas", "Data Analysis", "Data Visualization", "Matplotlib", "Seaborn"],
  },
  {
    phase: "04",
    title: "Machine Learning & AI",
    status: "In Progress",
    statusLabel: "Currently Exploring",
    description:
      "Supervised & unsupervised learning algorithms, model training, evaluation metrics, and feature engineering.",
    topics: ["Machine Learning", "Deep Learning", "Scikit-learn", "Classification", "Regression"],
  },
  {
    phase: "05",
    title: "Web Scraping & Automation",
    status: "In Progress",
    statusLabel: "Active Practice",
    description:
      "Automated web scraping, DOM parsing, browser automation, and structured dataset curation.",
    topics: ["Web Scraping", "BeautifulSoup", "Selenium", "Requests", "Data Extraction"],
  },
];
