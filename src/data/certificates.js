/**
 * certificates.js — Certificate and course credential repository
 *
 * Single source of truth for certifications, online specializations, and verified achievements.
 * Supports optional verification links, PDF download paths, and credential IDs.
 *
 * Supported fields:
 *  - id: {string} Unique identifier
 *  - title: {string} Certificate or course name
 *  - issuer: {string} Organization or platform (e.g. Coursera, DeepLearning.AI, University)
 *  - date: {string} Date completed or expected (e.g. "2024", "Expected 2025")
 *  - credentialId: {string|null} Optional credential ID string
 *  - image: {string|null} Optional path to certificate preview image
 *  - pdfUrl: {string|null} Optional path to certificate document in /public/assets/documents/
 *  - verifyUrl: {string|null} Optional external verification URL (e.g. Credly or platform link)
 *  - skills: {string[]} List of topics/skills validated by this certificate
 *  - status: {string} "Completed" | "In Progress" | "Planned"
 */

export const CERTIFICATES = [
  {
    id: "cert-1",
    title: "Python for Data Science and Machine Learning",
    issuer: "Course / Platform Placeholder",
    date: "2024",
    credentialId: "CERT-PY-XXXXX",
    image: null,
    pdfUrl: null, // Ready for: "/public/assets/documents/python-datascience-cert.pdf"
    verifyUrl: "https://example.com/verify-placeholder",
    skills: ["Python", "NumPy", "Pandas", "Matplotlib", "Scikit-learn"],
    status: "Completed",
  },
  {
    id: "cert-2",
    title: "Supervised Machine Learning: Regression and Classification",
    issuer: "Course / Platform Placeholder",
    date: "2024",
    credentialId: "CERT-ML-XXXXX",
    image: null,
    pdfUrl: null,
    verifyUrl: "https://example.com/verify-placeholder",
    skills: ["Machine Learning", "Linear Regression", "Logistic Regression", "Gradient Descent"],
    status: "Completed",
  },
  {
    id: "cert-3",
    title: "Web Scraping with Python & Automation",
    issuer: "Course / Platform Placeholder",
    date: "In Progress",
    credentialId: null,
    image: null,
    pdfUrl: null,
    verifyUrl: null,
    skills: ["BeautifulSoup", "Selenium", "Requests", "Data Extraction"],
    status: "In Progress",
  },
];
