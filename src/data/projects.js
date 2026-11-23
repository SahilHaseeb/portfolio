/**
 * projects.js — Project data repository
 *
 * Single source of truth for all projects showcased on the portfolio.
 * Aligned with Muhammad Haseeb's professional resume.
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
    title: "Expense Tracker Web Application",
    category: "Web Development",
    shortDescription:
      "A web-based expense tracker that integrates an API to fetch and manage financial data with machine learning visualizations.",
    description:
      "Built a web-based expense tracker that integrates an API to fetch and manage financial data. Applied Python machine learning and generated interactive graphs to visualize spending patterns, category breakdowns, and predictive financial trends.",
    technologies: ["Python", "Machine Learning", "API Integration", "Data Visualization", "JavaScript", "Render"],
    image: null,
    githubUrl: null,
    liveUrl: "https://expensive-tracker-sfev.onrender.com",
    featured: true,
    status: "Completed",
  },
  {
    id: "project-diamond-analysis",
    title: "Diamond Dataset Analysis & Price Modeling",
    category: "Data Science",
    shortDescription:
      "Data cleaning, exploratory data analysis, and predictive machine learning models to forecast diamond market prices.",
    description:
      "Performed comprehensive data cleaning, feature engineering, and exploratory data analysis on a real-world diamond dataset. Built predictive machine learning regression models and rich Seaborn visualizations to identify key price determinants.",
    technologies: ["Python", "Pandas", "Scikit-learn", "Seaborn", "NumPy"],
    image: null,
    githubUrl: "https://github.com/SahilHaseeb",
    liveUrl: null,
    featured: true,
    status: "Completed",
  },
  {
    id: "project-real-estate-analysis",
    title: "Real Estate Market Dataset Analysis",
    category: "Data Science",
    shortDescription:
      "Exploratory data analysis and regression modeling on real estate market data to identify pricing trends.",
    description:
      "Analyzed multidimensional real estate market metrics with exploratory data analysis, correlation matrices, and Scikit-learn regression models to discover key drivers of property valuations.",
    technologies: ["Python", "Pandas", "Scikit-learn", "Matplotlib", "NumPy"],
    image: null,
    githubUrl: "https://github.com/SahilHaseeb",
    liveUrl: null,
    featured: false,
    status: "Completed",
  },
  {
    id: "project-entrepreneur-analysis",
    title: "Entrepreneur Dataset Analysis",
    category: "Data Science",
    shortDescription:
      "Explored and visualized a real-world entrepreneur dataset to uncover key behavioral patterns and business insights.",
    description:
      "Conducted extensive exploratory data analysis (EDA) on an entrepreneurship dataset utilizing Pandas and Seaborn to uncover demographic patterns, business growth indicators, and strategic success metrics.",
    technologies: ["Python", "Pandas", "Seaborn", "EDA", "Matplotlib"],
    image: null,
    githubUrl: "https://github.com/SahilHaseeb",
    liveUrl: null,
    featured: false,
    status: "Completed",
  },
  {
    id: "project-portfolio",
    title: "Developer Portfolio & CV System",
    category: "Web Development",
    shortDescription:
      "Fast, responsive, dependency-free developer portfolio featuring an interactive in-browser resume viewer and 3D UI.",
    description:
      "Crafted from scratch with high performance, accessibility (WCAG 2.1 AA), fluid clamp typography, interactive resume modal & viewer, and dark-mode cyber aesthetics. Statically deployed on Render.",
    technologies: ["HTML5", "CSS3", "JavaScript", "Render"],
    image: null,
    githubUrl: "https://github.com/SahilHaseeb/portfolio",
    liveUrl: "https://haseebsahil-portfolio.onrender.com",
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
      "Engineered automated scraping scripts utilizing BeautifulSoup, Selenium, and Requests to extract structured pricing details with rate limiting, anti-blocking routines, and structured data persistence.",
    technologies: ["Python", "BeautifulSoup", "Selenium", "Requests", "Pandas"],
    image: null,
    githubUrl: "https://github.com/SahilHaseeb",
    liveUrl: null,
    featured: false,
    status: "Completed",
  },
];
