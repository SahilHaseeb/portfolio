/**
 * projects.js — Project data repository
 *
 * Single source of truth for all projects showcased on the portfolio.
 * To add, edit, or remove projects, simply update this array.
 * The UI automatically renders cards and handles category filtering.
 *
 * Supported fields:
 *  - id: {string} Unique identifier
 *  - title: {string} Project name
 *  - category: {string} Must match one of the defined CATEGORIES
 *  - shortDescription: {string} Concise summary for the card (1-2 sentences)
 *  - description: {string} Extended summary for future detail modal/page
 *  - technologies: {string[]} List of tech stack tags
 *  - image: {string|null} Path to project preview screenshot (e.g. "/public/assets/images/project-1.webp")
 *  - githubUrl: {string|null} URL to GitHub repository (use safe placeholder or null)
 *  - liveUrl: {string|null} URL to live deployment (use null if no live demo exists)
 *  - featured: {boolean} Whether to display the "Featured" badge
 *  - status: {string} "Completed" | "In Progress" | "Planned"
 */

export const CATEGORIES = [
  "All",
  "AI / ML",
  "Data Science",
  "Web Development",
  "Web Scraping",
  "Other",
];

export const PROJECTS = [
  {
    id: "project-1",
    title: "Predictive Housing Price Model",
    category: "Data Science",
    shortDescription:
      "Exploratory data analysis and regression modeling on housing market datasets to predict property values with feature engineering.",
    description:
      "A comprehensive end-to-end data science project utilizing NumPy, Pandas, and Matplotlib to clean, preprocess, and visualize housing market trends. Implemented linear regression and random forest models to evaluate prediction accuracy with RMSE and R2 metrics.",
    technologies: ["Python", "Pandas", "NumPy", "Matplotlib", "Scikit-learn"],
    image: null,
    githubUrl: "https://github.com/placeholder-username/housing-price-prediction",
    liveUrl: null,
    featured: true,
    status: "Completed",
  },
  {
    id: "project-2",
    title: "Customer Churn Classifier",
    category: "AI / ML",
    shortDescription:
      "Supervised machine learning pipeline to classify customer retention risks and analyze contributing behavioral drivers.",
    description:
      "Trained and compared classification algorithms including Logistic Regression, Decision Trees, and Random Forests. Handled class imbalance using SMOTE and evaluated performance through ROC-AUC curves and precision-recall metrics.",
    technologies: ["Python", "Scikit-learn", "Pandas", "Seaborn"],
    image: null,
    githubUrl: "https://github.com/placeholder-username/customer-churn-classifier",
    liveUrl: null,
    featured: true,
    status: "Completed",
  },
  {
    id: "project-3",
    title: "E-Commerce Price Tracker & Scraper",
    category: "Web Scraping",
    shortDescription:
      "Automated web scraper collecting periodic product pricing data with anti-bot handling and structured CSV exports.",
    description:
      "Engineered automated scraping scripts utilizing BeautifulSoup and Requests to track dynamic product pricing across multiple online retailers. Includes rate limiting, error handling, and structured data persistence.",
    technologies: ["Python", "BeautifulSoup", "Requests", "Pandas"],
    image: null,
    githubUrl: "https://github.com/placeholder-username/ecommerce-price-tracker",
    liveUrl: null,
    featured: false,
    status: "Completed",
  },
  {
    id: "project-4",
    title: "Developer Portfolio Website",
    category: "Web Development",
    shortDescription:
      "Fast, responsive, dependency-free developer portfolio built with semantic HTML5, modern CSS tokens, and ES Modules.",
    description:
      "Crafted from the ground up prioritizing web performance, accessibility (WCAG 2.1 AA standards), fluid typography, and clean dark-mode aesthetics. Fully responsive across all devices and deployed on Render.",
    technologies: ["HTML5", "CSS3", "JavaScript", "Render"],
    githubUrl: "https://github.com/SahilHaseeb/portfolio",
    liveUrl: "https://haseebsahil-portfolio.onrender.com",
    featured: true,
    status: "Completed",
  },
  {
    id: "project-5",
    title: "Sentiment Analysis on Product Reviews",
    category: "AI / ML",
    shortDescription:
      "Natural Language Processing pipeline extracting positive/negative sentiment polarities from unstructured user reviews.",
    description:
      "Preprocessed textual datasets with tokenization, stop-word removal, and TF-IDF vectorization. Built classification models to accurately tag customer sentiment with detailed confusion matrix visualization.",
    technologies: ["Python", "NLTK", "Scikit-learn", "Matplotlib"],
    image: null,
    githubUrl: "https://github.com/placeholder-username/sentiment-analysis-nlp",
    liveUrl: null,
    featured: false,
    status: "In Progress",
  },
  {
    id: "project-6",
    title: "Automated Job Listing Scraper & Analyzer",
    category: "Web Scraping",
    shortDescription:
      "Selenium-based web scraping workflow gathering tech job postings to analyze in-demand skills and framework frequencies.",
    description:
      "Automated dynamic page interaction, infinite-scroll navigation, and pagination handling via Selenium WebDriver. Aggregated job posting requirements to compute keyword frequency distributions across tech roles.",
    technologies: ["Python", "Selenium", "BeautifulSoup", "Pandas"],
    image: null,
    githubUrl: "https://github.com/placeholder-username/job-scraper-analyzer",
    liveUrl: null,
    featured: false,
    status: "Completed",
  },
];
