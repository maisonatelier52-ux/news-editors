# Content, SEO & performance checklist

Use this when adding or updating an article under `data/categories/*.json`.  
Run `npm run content:audit` before build when possible.

## Required on every post

- [ ] **title**, **subtitle**, **excerpt** present
- [ ] **seo.metaTitle** (~30–60 characters; unique)
- [ ] **seo.metaDescription** (~50–155 characters; unique)
- [ ] **seo.ogImage** matches **image** (share script + SEO audit expect this)
- [ ] **image** under `/images/posts/` or `/images/illustrations/`
- [ ] **imageCaption** (used as alt / caption) and **imageCredit**
- [ ] **tags** (at least one; improves related-post scoring)
- [ ] **author** slug exists in `data/json/authors.json`
- [ ] **date** and **updatedAt** (ISO); only set updatedAt when the story truly changed
- [ ] **sources** with publisher, label, url, accessed
- [ ] **keyTakeaways** (3) and **whyItMatters**
- [ ] Body **content** ≥ ~180 words; no unsupported “we tested / sources said” claims on guide-type pieces

## Optional but valuable

- [ ] **seo.faq**: `[{ "question": "…", "answer": "…" }]` for FAQPage schema
- [ ] **seo.keywords** aligned with tags
- [ ] Internal links in body to related category or methodology pages where natural

## After content changes

1. `npm run content:audit`
2. `npm run og:generate` (or rely on `prebuild`)
3. `npm run build` (static export)

## Site-level (rarely change)

- `data/json/site.json` — `siteUrl`, `sameAs`, `newsletter.href`, `contactEmail`
- Trust pages: `/editorial-standards`, `/source-methodology`, `/right-of-reply-policy`
