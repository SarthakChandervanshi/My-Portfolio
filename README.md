# Sarthak Chandervanshi — Personal Portfolio

Interactive personal portfolio for **Sarthak Chandervanshi**, Data Scientist & Rutgers M.S. Graduate. Built as a single-page site with scroll-driven 3D particle scenes, project detail modals, and a contact form.

**Live site:** [sarthakchandervanshi.uk](https://sarthakchandervanshi.uk)

---

## Tech stack

- **HTML / CSS / JavaScript** — single-page layout, responsive (desktop + mobile)
- **DCLogic** — component runtime (`support.js`)
- **Three.js** — particle morphing, globe, scroll-driven 3D scenes
- **Canvas** — animated project previews (RUL chart, privacy trade-off, lifestyle segmentation)
- **Web3Forms** — contact form submission
- **GitHub Pages** + **Cloudflare** — hosting & custom domain

---

## Project structure

```
.
├── index.html           # Main site (edit this)
├── support.js           # DCLogic runtime (generated — do not edit by hand)
├── config.js            # Decodes obfuscated keys from env.js at runtime
├── CNAME                # Custom domain: sarthakchandervanshi.uk
├── assets/
│   └── certs/           # Certification badge images
├── scripts/
│   └── generate-env.js  # Builds env.js from .env
├── .env.example         # Template for secrets (copy to .env)
├── NOTES.md             # Dev / preview environment notes
├── README.md
└── LICENSE
```

---

## Local preview

Copy `.env.example` to `.env`, set your Web3Forms access key, then generate runtime config:

```bash
cp .env.example .env
node scripts/generate-env.js
```

Open `index.html` in a browser, or serve the folder with any static server:

```bash
# Python
python3 -m http.server 8080

# Node (npx)
npx serve .
```

Then visit `http://localhost:8080`
