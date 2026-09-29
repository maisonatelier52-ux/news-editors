# News Editors — Next.js Rebuild

A Next.js site for **News Editors** (home, category,
article detail, and author pages) using **Next.js 14 (App Router)**, **JavaScript**
(no TypeScript), and **Tailwind CSS**.

---

## 1. Project structure

```
news-editors/
├── app/
│   ├── layout.js                        # Root layout (Header + Footer wrap every page)
│   ├── page.js                          # Homepage
│   ├── globals.css                      # Tailwind + article/typography styles
│   ├── not-found.js                     # 404 page
│   ├── category/[slug]/page.js          # Category listing page
│   ├── author/[slug]/page.js            # Author profile page
│   └── [year]/[month]/[day]/[slug]/
│       └── page.js                      # Article detail page (WordPress-style permalink)
│
├── components/                          # Shared, reusable UI
│   ├── Header.js / MobileMenu.js        # Site header, nav, breaking-news ticker
│   ├── Footer.js                        # Footer link columns + socials
│   ├── HeroSection.js                   # Homepage featured grid
│   ├── CategorySection.js               # "Category block" reused on homepage
│   ├── LatestArticles.js                # Generic latest-posts grid
│   ├── RelatedPosts.js                  # Related-articles block (article page)
│   ├── PostCard.js                      # Article card — 4 variants (hero/horizontal/compact/minimal)
│   ├── PostMeta.js                      # Author + date + views + comments row
│   ├── CategoryBadge.js / RatingBadge.js
│   ├── Sidebar.js / SidebarWidget.js    # Sidebar + its widgets (most viewed, categories…)
│   ├── Newsletter.js                    # Newsletter box (box + inline variants)
│   ├── AdBox.js                         # Ad placeholder (sidebar/leaderboard/inline)
│   ├── Breadcrumb.js
│   ├── ShareButtons.js
│   ├── TableOfContents.js               # "In this article" jump list
│   ├── ArticleContent.js                # Renders JSON content blocks as article body
│   ├── AuthorCard.js                    # Author bio box + full profile variant
│   ├── CommentSection.js                # Static demo comments + comment form UI
│   ├── BackToTop.js
│   └── Icon.js                          # Inline SVG icon set (no external icon package)
│
├── lib/
│   └── data.js                          # All data-access helpers (reads the JSON below)
│
├── data/json/                           # ← ALL CONTENT LIVES HERE
│   ├── site.json                        # Site name, nav, footer links, socials, newsletter copy
│   ├── categories.json                  # Categories + sub-categories (Reviews > Phones, etc.)
│   ├── authors.json                     # Author profiles
│   └── posts.json                       # All articles (title, body blocks, meta, images…)
│
└── public/images/
    ├── logo/site-logo.svg               # Site logo (placeholder wordmark)
    ├── posts/                           # Article cover + inline images (placeholders)
    ├── authors/                         # Author avatars (placeholders)
    └── ads/                             # Ad placeholders (sidebar/leaderboard/inline)
```

---

## 2. Editing content (no code changes needed)

Everything text-based lives in `data/json/`:

- **Add/edit an article** → `data/json/posts.json`. Each post has:
  - `slug`, `title`, `excerpt`, `category` (must match a slug in `categories.json`),
    `author` (must match a slug in `authors.json`), `date`, `year`/`month`/`day`
    (used to build the WordPress-style URL `/2016/12/12/my-post`), `image`,
    `readingTime`, `views`, `comments`, `rating` (`null`, `{ "type": "percent", "value": 88 }`,
    or `{ "type": "score", "value": "8.9" }`), `featured`, `trending`, `toc`
    (table of contents entries), and `content` — an array of blocks:
    - `{ "type": "heading", "text": "..." }`
    - `{ "type": "paragraph", "text": "..." }`
    - `{ "type": "quote", "text": "..." }`
    - `{ "type": "list", "items": ["...", "..."] }`
    - `{ "type": "image", "src": "/images/posts/xyz.jpg", "alt": "..." }`
- **Add/edit a category** → `data/json/categories.json`. Use `"parent": "reviews"` for
  sub-categories (Phones, Laptops, etc. all sit under Reviews).
- **Add/edit an author** → `data/json/authors.json`.
- **Site-wide bits** (nav labels, footer columns, socials, newsletter copy, tag cloud)
  → `data/json/site.json`.

## 3. Replacing placeholder images

Every image referenced in the JSON already has a matching **placeholder JPG/SVG**
generated in `public/images/...` so nothing is broken out of the box. To swap in real
images, just replace the file at the same path (keep the same filename, or update the
path in the JSON) — e.g. drop a real photo in as
`public/images/posts/uber-flying-car.jpg`, replacing the placeholder of the same name.

Recommended sizes:
- Post cover images: **1200×675** (16:9)
- Author avatars: **300×300** (square)
- Sidebar ad: **300×600**
- Leaderboard ad: **970×250**
- Inline ad: **728×90**

## 4. Installation & running locally

### Prerequisites
- **Node.js 20.9+** (required by Next.js 16 — Node 18 is no longer supported)
- **npm** (comes with Node) — yarn/pnpm also work if you prefer

> This project runs on `next@16.3.0` with `react@19.2` — the current stable
> release line as of this writing. Next.js 14 (what this project originally
> shipped on) reached end-of-life in Oct 2025, so this upgrade moves it onto
> an actively-patched major version.
>
> **What changed in the upgrade:** Next.js 16 made route `params` a `Promise`
> instead of a plain object (`const { slug } = await params` instead of
> `params.slug`). All three dynamic route pages (`category/[slug]`,
> `author/[slug]`, and the article detail route) were updated for this. If you
> add new dynamic routes later, remember `params` (and `searchParams`, if you
> use it) must be awaited.
>
> **ESLint also moved to flat config.** `next lint` was removed in Next.js 16,
> and `eslint-config-next@16` requires `eslint@9+`. This project now uses
> `eslint.config.mjs` (flat config) instead of the old `.eslintrc.json`, and
> `npm run lint` runs the plain `eslint .` CLI directly.
>
> If `npm outdated next` later shows a newer version, upgrading is usually
> safe with `npm install next@latest react@latest react-dom@latest` — but
> re-check the official Next.js upgrade guide for that version first, since
> major versions (15→16, 16→17, etc.) can introduce further breaking changes
> beyond a routine `npm update`.

> **`npm audit` noise:** you may still see findings on `postcss` or other
> transitive dependencies pulled in by Next.js or eslint tooling. Check
> `npm audit` output before acting — the vulnerable-range reporting is often
> broader than what actually applies to the pinned version in use, and dev-only
> tooling (eslint, etc.) carries much lower risk than runtime dependencies. Avoid
> `npm audit fix --force` reflexively — it can jump you to a new major version
> without warning you it's doing so.

### Steps

```bash
# 1. Unzip the project and move into it
unzip news-editors.zip
cd news-editors

# 2. Install dependencies
npm install

# 3. Run the dev server
npm run dev

# 4. Open the site
# → http://localhost:3000
```

### Other scripts

```bash
npm run build   # production build
npm run start   # run the production build (after `npm run build`)
npm run lint    # run ESLint
```

### Pages you can visit once it's running

| Page | URL |
|---|---|
| Home | `http://localhost:3000/` |
| Category (Science) | `http://localhost:3000/category/science` |
| Category (Reviews sub-cat) | `http://localhost:3000/category/headphones` |
| Article detail | `http://localhost:3000/2016/12/12/of-course-uber-is-working-on-a-flying-car-project` |
| Author profile | `http://localhost:3000/author/admin` |

## 5. Notes on this rebuild

- No CMS/backend — this is a fully static, JSON-driven site. Everything is
  server-rendered at request time from the JSON files via `lib/data.js`
  (swap that file for real API/CMS calls later without touching any components).
- `next.config.js` sets `images.unoptimized: true` so the placeholder images work
  without extra configuration; remove that once you're deploying with a proper
  image host/CDN if you want Next.js's built-in image optimization.
- Tailwind's `brand` color (`#ed1c24`) drives the red accents (breaking news,
  buttons, category header on the reviews page etc.) — change it in
  `tailwind.config.js` to re-skin the whole site in one place.
- The comment form and newsletter form are UI-only (no backend wired up) — hook
  them up to your own API route or third-party service when ready.
