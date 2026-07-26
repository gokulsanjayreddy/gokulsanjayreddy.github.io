# gokulsanjayreddy.github.io

Personal portfolio website for **Gokul Sanjay Reddy Chatrala**.

> A clean, minimalistic single-page portfolio built with pure HTML, CSS, and JavaScript — no frameworks, no build step. Designed for GitHub Pages.

---

## ✨ Features

- **Responsive** — looks great on mobile, tablet, and desktop.
- **Smooth animations** — scroll-reveal effects via Intersection Observer, CSS transitions on hover.
- **Lightweight** — zero dependencies beyond Google Fonts (Inter).
- **Easy to customize** — CSS variables for colors, fonts, and spacing.
- **SEO-friendly** — semantic HTML, meta tags, heading hierarchy.

---

## 📁 Project Structure

```
.
├── index.html                 # Single-page site
├── css/
│   └── style.css              # All styles with CSS variables
├── js/
│   └── script.js              # Smooth scroll, Intersection Observer, mobile nav
├── assets/
│   ├── images/                # Profile photo, project thumbnails
│   └── resume.pdf             # Your résumé (replace placeholder)
├── .github/
│   └── workflows/
│       └── deploy.yml         # GitHub Actions auto-deploy workflow
└── README.md
```

---

## 🚀 Deployment — GitHub Pages

### Option A: GitHub Actions (Recommended)

This repo includes a GitHub Actions workflow (`.github/workflows/deploy.yml`) that automatically deploys the site on every push to `main`.

1. Go to your repo → **Settings** → **Pages**.
2. Under **Source**, select **GitHub Actions**.
3. Push to `main` — the site will build and deploy automatically.
4. Your site will be live at `https://gokulsanjayreddy.github.io`.

### Option B: Serve from Branch (Simpler)

1. Go to your repo → **Settings** → **Pages**.
2. Under **Source**, select **Deploy from a branch**.
3. Choose **main** branch and **/ (root)** folder.
4. Click **Save**.
5. Your site will be live at `https://gokulsanjayreddy.github.io`.

> **Note:** Since this is a `username.github.io` repo, GitHub Pages is enabled by default. Option B is the simplest — no workflow needed.

---

## ✏️ Customization

### Content

All placeholder content is marked with `✏️ EDIT` comments in `index.html`. Search for these to find every section you need to update:

- **Hero** — tagline text
- **About** — bio paragraphs, profile photo
- **Projects** — titles, descriptions, tech tags, repo/demo links
- **Practice & Learning** — repo names, notes, links
- **Skills** — add or remove badges
- **Resume** — replace `assets/resume.pdf` with your actual file

### Theming

Edit the CSS variables at the top of `css/style.css`:

```css
:root {
  --color-accent: #4f6d8b;     /* Change accent color */
  --color-bg: #f8f9fb;         /* Background */
  --font-family: 'Inter', ...;  /* Font */
}
```

---

## 🛠 Local Development

No build step required. Just open `index.html` in a browser, or use a simple local server:

```bash
# Python
python -m http.server 8000

# Node.js (npx)
npx serve .
```

Then visit `http://localhost:8000`.

---

## 📄 License

© Gokul Sanjay Reddy Chatrala. All rights reserved.
