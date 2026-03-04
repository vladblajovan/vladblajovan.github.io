# vladblajovan.github.io

Personal portfolio site for Vlad Blajovan — iOS developer building privacy-first apps.

Live at **[vladblajovan.github.io](https://vladblajovan.github.io)**

## About

A minimal, dark-mode personal site built with plain HTML + Tailwind CSS (CDN). No build step, no dependencies — just one file deployed via GitHub Pages.

## Stack

- **HTML5** — single `index.html`, no framework
- **Tailwind CSS** — loaded via CDN, configured inline
- **GitHub Pages** — zero-config hosting from `main` branch

## Structure

```
vladblajovan.github.io/
└── index.html   # The entire site
```

## Local Development

No build step needed. Open `index.html` directly in a browser, or serve it locally:

```bash
# Python (built-in)
python3 -m http.server 8080

# Node (npx)
npx serve .
```

Then visit `http://localhost:8080`.

## Deployment

Pushes to `main` automatically deploy via GitHub Pages. Settings → Pages → Source: `main` branch, `/ (root)`.

## Projects Featured

- **[Ritualist](https://ritualist.app)** — Privacy-first habit tracker for iOS. AI-powered insights, location reminders, and beautiful analytics.

## Contact

- Email: [vlad.blajovan@outlook.com](mailto:vlad.blajovan@outlook.com)
- GitHub: [@vladblajovan](https://github.com/vladblajovan)
