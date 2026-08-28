/**
 * education.js — Academic background & Learning Journey data
 *
 * Single source of truth for formal education and self-directed learning roadmap.
 * All entries use clear placeholders ready to be customized.
 */

export const EDUCATION_DATA = [
  {
    id: "degree-1",
    degree: "Bachelor of Science in Computer Science",
    institution: "University Name",
    period: "20XX — Present",
    status: "In Progress",
    description:
      "Comprehensive Computer Science curriculum with a strong emphasis on core computing fundamentals, algorithmic problem solving, database architecture, and applied artificial intelligence.",
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
      "Focusing on data science pipelines, statistical modeling, and machine learning techniques",
      "Building practical hands-on projects alongside core university coursework",
      "Active participant in technical student clubs and developer communities",
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
      "Programming fundamentals, algorithm design, data structures, and computational mathematics.",
    topics: ["C++", "Java", "Data Structures", "Algorithms", "OOP Principles"],
  },
  {
    phase: "02",
    title: "Python & Development Workflow",
    status: "Completed",
    statusLabel: "Working Knowledge",
    description:
      "Modern Python scripting, modular programming, version control with Git/GitHub, and clean code practices.",
    topics: ["Python 3", "Git & GitHub", "VS Code", "Virtual Environments", "ES Modules"],
  },
  {
    phase: "03",
    title: "Data Analysis & Visualisation",
    status: "In Progress",
    statusLabel: "Active Focus",
    description:
      "Exploratory data analysis, matrix manipulation, data wrangling, and statistical visual storytelling.",
    topics: ["NumPy", "Pandas", "Matplotlib", "Seaborn", "Data Cleaning"],
  },
  {
    phase: "04",
    title: "Machine Learning & Modeling",
    status: "In Progress",
    statusLabel: "Currently Exploring",
    description:
      "Supervised & unsupervised learning pipelines, model training, evaluation metrics, and feature engineering.",
    topics: ["Scikit-learn", "Regression", "Classification", "Clustering", "Model Validation"],
  },
  {
    phase: "05",
    title: "Applied AI, Scraping & Beyond",
    status: "Planned",
    statusLabel: "Next Horizons",
    description:
      "Automated web scraping, deep learning fundamentals, Natural Language Processing, and cloud deployments.",
    topics: ["BeautifulSoup", "Selenium", "NLP Basics", "Neural Networks", "API Integration"],
  },
];
