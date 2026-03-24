# Portfolio Site Migration: Static HTML → Next.js

## Overview

Migrate vladblajovan.github.io from plain static HTML to a Next.js-based site matching the RitualistApp stack (Next.js 16, React 19, TypeScript, Tailwind CSS). Add MDX-based article authoring, RSS feeds, and a resume page.

## Goals

- **Scalable articles**: MDX files in a content directory, drop-in to publish
- **RSS feeds**: Global feed + per-tag feeds
- **Same stack as RitualistApp**: Next.js 16, React 19, TypeScript, Tailwind CSS, Framer Motion
- **Static export**: GitHub Actions → GitHub Pages (no server)
- **Resume page**: Empty placeholder for now

## Decisions

| Decision | Choice | Rationale |
|----------|--------|-----------|
| Framework | Next.js 16 + React 19 + TypeScript | Match RitualistApp stack |
| Content system | next-mdx-remote + MDX files | Best balance of simplicity and flexibility for articles |
| Styling | Tailwind CSS 3.x | Match RitualistApp, already familiar |
| Animations | Simplified — theme toggle kept, animations toned down | User preference |
| RSS | Global + per-tag feeds | Discoverability per topic |
| Deployment | Static export + GitHub Actions → GitHub Pages | Same as RitualistApp, no server needed |
| Design | Recreate existing look and feel | Not a visual redesign |

## Project Structure

```
vladblajovan.github.io/
├── app/
│   ├── layout.tsx              # Root layout (nav, footer, theme provider, fonts)
│   ├── page.tsx                # Home/landing page
│   ├── globals.css             # Tailwind imports + custom styles
│   ├── articles/
│   │   ├── page.tsx            # Article listing with tag filtering
│   │   └── [slug]/
│   │       └── page.tsx        # Dynamic article renderer (loads MDX)
│   ├── resume/
│   │   └── page.tsx            # Resume page (empty placeholder)
│   ├── rss/
│   │   └── [tag]/
│   │       └── route.ts        # Per-tag RSS feed generation
│   ├── rss.xml/
│   │   └── route.ts            # Global RSS feed
│   └── sitemap.ts              # Dynamic sitemap
├── content/
│   └── articles/               # MDX article files with frontmatter
│       ├── ai-assisted-clean-architecture.mdx
│       ├── ai-assisted-wcag-accessibility-compliance.mdx
│       ├── ai-powered-debug-menus.mdx
│       ├── claude-code-crash-course.mdx
│       ├── sdui-deep-dive-parser-architecture.mdx
│       ├── server-driven-ui-mobile-guide.mdx
│       └── strong-foundations-ai-era.mdx
├── lib/
│   ├── articles.ts             # Read/parse/sort article MDX files
│   └── rss.ts                  # RSS feed generation utility
├── components/
│   ├── Navbar.tsx
│   ├── Footer.tsx
│   ├── ThemeProvider.tsx
│   ├── ArticleCard.tsx
│   ├── TagFilter.tsx
│   ├── TableOfContents.tsx
│   └── mdx/                    # Custom MDX components
├── public/
│   ├── favicon.svg
│   ├── robots.txt
│   └── images/
├── .github/
│   └── workflows/
│       └── deploy.yml
├── next.config.ts
├── tailwind.config.ts
├── tsconfig.json
├── package.json
└── postcss.config.mjs
```

## MDX Article Format

Each article is an `.mdx` file with frontmatter:

```mdx
---
title: "AI-Assisted Clean Architecture"
description: "How to leverage AI tools for clean architecture patterns"
date: "2026-03-08"
tags: ["AI", "Architecture", "Mobile Development"]
readTime: "20 min"
---

Article content in Markdown, with optional React components...
```

## Content Pipeline (lib/articles.ts)

- Read all `.mdx` files from `content/articles/`
- Parse frontmatter with `gray-matter`
- Sort by date (newest first)
- Export helpers: `getAllArticles()`, `getArticleBySlug()`, `getArticlesByTag()`, `getAllTags()`

## RSS Feed Generation (lib/rss.ts)

- Build RSS 2.0 XML from article metadata
- Global feed at `/rss.xml`
- Per-tag feeds at `/rss/[tag]` (e.g., `/rss/ai`, `/rss/architecture`)
- Include: title, description, date, link, tags
- Auto-discovery `<link>` tags in the root layout `<head>`

## Pages

### Home (`app/page.tsx`)
- Recreate current index.html: hero, about, skills/experience, contact section
- Social links (GitHub, LinkedIn, Email, Buy Me a Coffee)
- Simplified animations (fade-in on scroll, no complex keyframes)

### Articles Listing (`app/articles/page.tsx`)
- Grid of article cards with title, description, date, read time, tags
- Client-side tag filtering (same tags as current site)
- Links to individual article pages

### Article Detail (`app/articles/[slug]/page.tsx`)
- Render MDX content via next-mdx-remote
- Table of Contents sidebar with scroll highlighting
- Progress bar
- Reading time display
- Syntax highlighting (rehype-pretty-code or similar)

### Resume (`app/resume/page.tsx`)
- Empty placeholder page with basic layout

## Shared Components

- **Navbar**: Logo, nav links (Home, Articles, Resume), theme toggle, mobile hamburger menu
- **Footer**: Social links, copyright, RSS feed link
- **ThemeProvider**: Dark/light mode with system preference detection + manual toggle
- **ArticleCard**: Card component for article listings
- **TagFilter**: Tag buttons for filtering articles
- **TableOfContents**: Sidebar TOC with active section highlighting

## Deployment

GitHub Actions workflow (`.github/workflows/deploy.yml`):
1. Trigger on push to `main`
2. Node.js 20, `npm ci`, `npm run build`
3. Static export to `out/`
4. Deploy to GitHub Pages

`next.config.ts`:
- `output: 'export'` for static generation
- `trailingSlash: true`
- No `basePath` (this is the root site, unlike RitualistApp)

## Dependencies

### Production
- next, react, react-dom
- next-mdx-remote
- gray-matter (frontmatter parsing)
- framer-motion (simplified animations)
- react-icons

### Development
- typescript, @types/node, @types/react, @types/react-dom
- tailwindcss, postcss, autoprefixer
- eslint, eslint-config-next
- rehype-pretty-code (syntax highlighting)
- remark-gfm (GitHub-flavored markdown)

## Implementation Order

1. Scaffold Next.js project with TypeScript + Tailwind
2. Create root layout with Navbar, Footer, ThemeProvider
3. Build home page (port from current index.html)
4. Set up MDX content pipeline (lib/articles.ts)
5. Convert all 7 existing articles from HTML to MDX
6. Build articles listing page with tag filtering
7. Build article detail page with TOC, progress bar, syntax highlighting
8. Create resume placeholder page
9. Implement RSS feeds (global + per-tag)
10. Add sitemap generation
11. Set up GitHub Actions deployment
12. Test static export and verify all pages work
