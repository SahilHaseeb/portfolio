/**
 * projects.js — Project data repository
 *
 * Single source of truth for all projects showcased on the portfolio.
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
    id: "project-expense-tracker",
    title: "Expense Tracker",
    category: "Web Development",
    shortDescription:
      "A web-based expense tracking project for managing and monitoring personal expenses with an intuitive, responsive interface.",
    description:
      "A clean, responsive web application designed for logging, categorizing, and monitoring personal expenses in real time. Features structured financial tracking and a clear user interface.",
    technologies: ["HTML", "CSS", "JavaScript", "Render"],
    image: null,
    githubUrl: null,
    liveUrl: "https://expensive-tracker-sfev.onrender.com",
    featured: true,
    status: "Completed",
  },
  {
    id: "project-portfolio",
    title: "Developer Portfolio Website",
    category: "Web Development",
    shortDescription:
      "Fast, responsive, dependency-free developer portfolio built with semantic HTML5, modern CSS design tokens, and ES Modules.",
    description:
      "Crafted from the ground up prioritizing web performance, accessibility (WCAG 2.1 AA standards), fluid typography, and clean dark-mode aesthetics. Fully responsive across all devices and deployed on Render.",
    technologies: ["HTML5", "CSS3", "JavaScript", "Render"],
    image: null,
    githubUrl: "https://github.com/SahilHaseeb/portfolio",
    liveUrl: "https://haseebsahil-portfolio.onrender.com",
    featured: true,
    status: "Completed",
  },
  {
    id: "project-housing-price",
    title: "Predictive Housing Price Model",
    category: "Data Science",
    shortDescription:
      "Exploratory data analysis and regression modeling on housing market datasets to analyze property price dynamics.",
    description:
      "A data science project utilizing NumPy, Pandas, and Matplotlib to clean, preprocess, and visualize market trends. Implemented linear regression algorithms to evaluate prediction accuracy with RMSE and R2 metrics.",
    technologies: ["Python", "Pandas", "NumPy", "Matplotlib", "Scikit-learn"],
    image: null,
    githubUrl: "https://github.com/SahilHaseeb",
    liveUrl: null,
    featured: false,
    status: "Completed",
  },
  {
    id: "project-customer-churn",
    title: "Customer Churn Classifier",
    category: "AI / ML",
    shortDescription:
      "Machine learning classification model exploring customer retention patterns and behavioral predictive indicators.",
    description:
      "Trained and evaluated classification models including Logistic Regression and Decision Trees using Scikit-learn. Explored feature importance and classification metrics.",
    technologies: ["Python", "Scikit-learn", "Pandas", "Seaborn"],
    image: null,
    githubUrl: "https://github.com/SahilHaseeb",
    liveUrl: null,
    featured: false,
    status: "Completed",
  },
  {
    id: "project-price-scraper",
    title: "E-Commerce Price Tracker & Scraper",
    category: "Web Scraping",
    shortDescription:
      "Automated Python web scraper collecting periodic product pricing data with structured CSV data exports.",
    description:
      "Engineered automated scraping scripts utilizing BeautifulSoup and Requests to extract structured pricing details with rate limiting and structured persistence.",
    technologies: ["Python", "BeautifulSoup", "Requests", "Pandas"],
    image: null,
    githubUrl: "https://github.com/SahilHaseeb",
    liveUrl: null,
    featured: false,
    status: "Completed",
  },
  {
    id: "project-sentiment-analysis",
    title: "Sentiment Analysis on Text Reviews",
    category: "AI / ML",
    shortDescription:
      "Text processing and sentiment classification exploring Natural Language Processing basics on user review datasets.",
    description:
      "Preprocessed textual datasets with tokenization and feature vectorization to classify polarity with evaluation metrics.",
    technologies: ["Python", "Scikit-learn", "Pandas", "Matplotlib"],
    image: null,
    githubUrl: "https://github.com/SahilHaseeb",
    liveUrl: null,
    featured: false,
    status: "In Progress",
  },
];
