// Generates link-preview ("share") images for every article.
//
// Why: og:image / twitter:image are fetched by crawlers (Slack, WhatsApp,
// LinkedIn, X, iMessage ...). Several of them handle WebP poorly or not at
// all, and they all prefer a ~1.91:1 image. So each article's hero image is
// converted to a 1200x630 JPEG at public/og/<slug>.jpg, which lib/seo.js then
// uses automatically.
//
// Runs before every build (see "prebuild" in package.json) so new articles
// are picked up without any manual step. It never fails the build: if sharp
// is unavailable or an image can't be read, seo.js simply falls back to the
// original hero image.
//
// Manual run:  npm run og:generate

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const publicDir = path.join(root, 'public');
const outDir = path.join(publicDir, 'og');
const categoriesDir = path.join(root, 'data', 'categories');

const WIDTH = 1200;
const HEIGHT = 630;

let sharp;
try {
  ({ default: sharp } = await import('sharp'));
} catch {
  console.warn('[og] sharp is not available - skipping share-image generation.');
  process.exit(0);
}

fs.mkdirSync(outDir, { recursive: true });

let created = 0;
let failed = 0;

for (const file of fs.readdirSync(categoriesDir).filter((f) => f.endsWith('.json'))) {
  const { articles = [] } = JSON.parse(fs.readFileSync(path.join(categoriesDir, file), 'utf8'));

  for (const article of articles) {
    // Same source lib/seo.js uses: an explicit seo.ogImage wins over the hero.
    const source = article.seo?.ogImage || article.image;
    if (!source || /^https?:\/\//.test(source)) continue; // remote images are used as-is

    const input = path.join(publicDir, source);
    if (!fs.existsSync(input)) {
      console.warn(`[og] missing source image for "${article.slug}": ${source}`);
      failed++;
      continue;
    }

    try {
      await sharp(input)
        .resize(WIDTH, HEIGHT, { fit: 'cover', position: 'centre' })
        .jpeg({ quality: 82, mozjpeg: true })
        .toFile(path.join(outDir, `${article.slug}.jpg`));
      created++;
    } catch (error) {
      console.warn(`[og] could not convert "${article.slug}": ${error.message}`);
      failed++;
    }
  }
}

console.log(`[og] share images ready: ${created} generated${failed ? `, ${failed} skipped` : ''}.`);
