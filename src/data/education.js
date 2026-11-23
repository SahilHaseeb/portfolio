/**
 * education.js — Academic background & Learning Journey data
 *
 * Single source of truth for formal education and self-directed learning roadmap.
 * Aligned with Muhammad Haseeb's professional resume.
 */

export const EDUCATION_DATA = [
  {
    id: "degree-1",
    degree: "Bachelor of Science in Computer Science (BSCS)",
    institution: "COMSATS University Islamabad",
    period: "Expected 2028",
    cgpa: "3.45",
    status: "In Progress",
    description:
      "Pursuing a Bachelor of Science in Computer Science at COMSATS University Islamabad with a strong academic record (CGPA: 3.45). Specializing in Python programming, Artificial Intelligence, Machine Learning, and Data Science.",
    coursework: [
      "Python Programming",
      "Artificial Intelligence",
      "Data Structures & Algorithms",
      "Database Systems",
      "Machine Learning",
      "Object-Oriented Programming",
      "Software Engineering",
      "Operating Systems",
    ],
    highlights: [
      "Current Academic Standing: CGPA 3.45 / 4.00",
      "Relevant Core Coursework: Python Programming, Artificial Intelligence",
      "Hands-on expertise in exploratory data analysis, predictive modeling, and machine learning pipelines",
      "Building practical solutions across Data Science, Machine Learning, Deep Learning, and Web Scraping",
    ],
  },
];

export const LEARNING_ROADMAP = [
  {
    phase: "01",
    title: "Core Computing & Python Programming",
    status: "Completed",
    statusLabel: "Solid Foundation",
    description:
      "Python programming fundamentals, object-oriented design, algorithms, and computational problem solving.",
    topics: ["Python", "Data Structures", "Algorithms", "OOP Principles", "Problem Solving"],
  },
  {
    phase: "02",
    title: "Data Science & Exploratory Analysis (EDA)",
    status: "Completed",
    statusLabel: "Active Practice",
    description:
      "Data wrangling, matrix manipulation, data cleaning, feature engineering, and statistical visualization.",
    topics: ["NumPy", "Pandas", "Matplotlib", "Seaborn", "Data Cleaning", "Feature Engineering"],
  },
  {
    phase: "03",
    title: "Machine Learning & Predictive Modeling",
    status: "In Progress",
    statusLabel: "Active Focus",
    description:
      "Supervised & unsupervised learning, regression, classification, model evaluation, and Scikit-learn workflows.",
    topics: ["Scikit-learn", "TensorFlow & Keras", "Regression", "Classification", "Predictive Modeling"],
  },
  {
    phase: "04",
    title: "Web Scraping & Automated Data Extraction",
    status: "In Progress",
    statusLabel: "Working Knowledge",
    description:
      "Automated DOM scraping, dynamic browser interaction, SQL data pipelines, and dataset collection.",
    topics: ["BeautifulSoup", "Selenium", "SQL", "Requests", "Automated Extraction"],
  },
  {
    phase: "05",
    title: "RAG & Modern AI Systems",
    status: "In Progress",
    statusLabel: "Currently Exploring",
    description:
      "Retrieval-Augmented Generation, vector embeddings, semantic vector search, and neural systems.",
    topics: ["RAG", "Embeddings & Vector Search", "Deep Learning", "Generative AI"],
  },
];
