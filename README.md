# Personal Developer Portfolio

> 🌐 **Live Demo:** [haseebsahil-portfolio.onrender.com](https://haseebsahil-portfolio.onrender.com)  
> 📦 **GitHub Repository:** [github.com/SahilHaseeb/portfolio](https://github.com/SahilHaseeb/portfolio)

A professional, responsive developer portfolio website built with pure HTML, CSS, and JavaScript — no build tools required.

## Tech Stack

| Layer       | Technology                        |
|-------------|-----------------------------------|
| Structure   | HTML5 (semantic)                  |
| Styling     | Vanilla CSS (custom properties, Flexbox, Grid, clamp()) |
| Logic       | Vanilla JavaScript (ES Modules)   |
| Fonts       | Google Fonts — Inter + JetBrains Mono |
| Deployment  | Render (static site)              |

## Project Structure

```
portfolio/
├── index.html                   # Main entry point (SPA shell)
├── render.yaml                  # Render deployment config
├── .gitignore
├── README.md
│
├── public/                      # Static, unprocessed assets
│   └── assets/
│       ├── images/              # Profile photo, project screenshots, OG image
│       ├── icons/               # Favicon, social icons
│       ├── fonts/               # Self-hosted fonts (optional)
│       └── documents/           # CV/Resume PDF
│
└── src/                         # Source code
    ├── styles/
    │   ├── variables.css        # Design tokens (colors, spacing, type scale)
    │   ├── reset.css            # Modern CSS reset
    │   ├── utilities.css        # Reusable utility classes & components
    │   └── main.css             # Entry stylesheet — imports all partials
    │
    ├── js/
    │   ├── main.js              # App entry point — wires everything up
    │   ├── utils.js             # Pure helper functions
    │   └── animations.js        # Scroll-triggered animations (IntersectionObserver)
    │
    ├── components/              # Reusable UI components (navbar, footer, etc.)
    └── sections/                # One-per-section modules (hero, about, skills, etc.)
```

## Running Locally

### Option 1 — VS Code Live Server (Recommended)
1. Install the [Live Server](https://marketplace.visualstudio.com/items?itemName=ritwickdey.LiveServer) VS Code extension.
2. Open the `portfolio/` folder in VS Code.
3. Right-click `index.html` → **Open with Live Server**.
4. Your browser opens at `http://127.0.0.1:5500`.

### Option 2 — Python (built-in server, no install needed)
```bash
# Python 3
cd portfolio
python -m http.server 8080
# Open: http://localhost:8080
```

### Option 3 — Node.js (if installed)
```bash
# Using npx serve
npx serve .
# Or http-server
npx http-server .
```

## Deploying to Render

1. Push the project to a GitHub repository.
2. Log in to [Render](https://render.com).
3. Click **New → Static Site**.
4. Connect your GitHub repo.
5. Set **Publish Directory** to `.` (root).
6. Click **Create Static Site** — done!

The `render.yaml` file handles caching headers and routing automatically.

## Planned Sections

- [ ] Navbar (responsive, with mobile hamburger menu)
- [ ] Hero section
- [ ] About Me
- [ ] Skills
- [ ] Projects
- [ ] Data Science / ML Projects
- [ ] Web Scraping Projects
- [ ] Education
- [ ] Certificates & Achievements
- [ ] Contact section
- [ ] GitHub / Live project links
- [ ] Resume/CV download
- [ ] Animations
- [ ] Dark/Light theme toggle (if needed)

## Responsiveness

This portfolio is built **mobile-first** and works correctly at:

| Breakpoint | Target devices               |
|------------|------------------------------|
| < 480px    | Small phones                 |
| 480–768px  | Large phones                 |
| 768–1024px | Tablets                      |
| 1024–1280px| Laptops                      |
| 1280–1536px| Desktop monitors             |
| > 1536px   | Large / hi-res screens       |

Techniques used: CSS custom properties, `clamp()` for fluid typography, CSS Grid + Flexbox, relative units (`rem`, `%`, `vw`), `max-width` containers, responsive images.

## License

MIT — free to use and modify for personal use.
