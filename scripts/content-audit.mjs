import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const categoriesDir = path.join(root, 'data', 'categories');
const illustrationManifest = JSON.parse(fs.readFileSync(path.join(root, 'data', 'illustrations.json'), 'utf8'));
const illustrationsBySlug = new Map(illustrationManifest.items.map((item) => [item.slug, item]));
const expectedTypes = {
  us: 'Current-affairs note',
  world: 'Current-affairs note',
  business: 'Business analysis',
  finance: 'Money note',
};
const guideTypes = new Set(['Evergreen guide', 'Archive perspective']);
const unsupportedClaims = /\b(we tested|we tracked|we benchmarked|our testing|our test footage|retailers say|manufacturers say|told us|sources said)\b/i;
const errors = [];
const slugs = new Set();
const images = new Set();
let count = 0;

if (illustrationManifest.items.length !== 50 || illustrationsBySlug.size !== 50) {
  errors.push('illustration manifest must contain 50 unique article entries (the remaining post uses a regular photo)');
}

for (const directory of ['app', 'components']) {
  const files = fs.readdirSync(path.join(root, directory), { recursive: true })
    .filter((name) => /\.(?:js|jsx|ts|tsx)$/.test(name));
  for (const filename of files) {
    const source = fs.readFileSync(path.join(root, directory, filename), 'utf8');
    if (/\/images\/ads\/|\/images\/posts\/default-cover\.jpg/.test(source)) {
      errors.push(`${directory}/${filename}: unresolved placeholder image reference`);
    }
  }
}

for (const placeholder of [
  'public/images/ads/sidebar-ad.jpg',
  'public/images/ads/leaderboard-ad.jpg',
  'public/images/ads/inline-ad.jpg',
  'public/images/posts/default-cover.jpg',
]) {
  if (fs.existsSync(path.join(root, placeholder))) errors.push(`${placeholder}: placeholder asset must be removed`);
}

function words(post) {
  return post.content.flatMap((block) => [block.text || '', ...(block.items || [])]).join(' ').trim().split(/\s+/).filter(Boolean).length;
}

for (const filename of fs.readdirSync(categoriesDir).filter((name) => name.endsWith('.json'))) {
  const file = path.join(categoriesDir, filename);
  const { articles } = JSON.parse(fs.readFileSync(file, 'utf8'));
  if (!Array.isArray(articles)) errors.push(`${filename}: articles must be an array`);
  for (const post of articles || []) {
    count += 1;
    const label = `${filename}:${post.slug}`;
    if (slugs.has(post.slug)) errors.push(`${label}: duplicate slug`);
    slugs.add(post.slug);
    if (!post.title || !post.subtitle || !post.excerpt) errors.push(`${label}: missing title, subtitle or excerpt`);
    if (!Array.isArray(post.content) || words(post) < 180) errors.push(`${label}: body must contain at least 180 words`);
    if (!Array.isArray(post.keyTakeaways) || post.keyTakeaways.length !== 3) errors.push(`${label}: expected exactly three key takeaways`);
    if (!post.whyItMatters || post.whyItMatters.length < 80) errors.push(`${label}: why-it-matters note is too thin`);
    if (!post.reportingNote) errors.push(`${label}: missing reading note`);
    if (!Array.isArray(post.sources) || post.sources.length === 0) errors.push(`${label}: missing sources`);
    if (post.sources?.some((source) => !source.publisher || !source.label || !source.url || !source.accessed)) errors.push(`${label}: incomplete source entry`);

    const blockSignatures = post.content.map((block) => JSON.stringify({ type: block.type, text: block.text, items: block.items }));
    if (new Set(blockSignatures).size !== blockSignatures.length) errors.push(`${label}: duplicate content block`);

    if (expectedTypes[post.category] && post.articleType !== expectedTypes[post.category]) {
      errors.push(`${label}: expected type ${expectedTypes[post.category]}`);
    }
    if (!expectedTypes[post.category] && !guideTypes.has(post.articleType)) {
      errors.push(`${label}: expected an evergreen or archive label`);
    }
    if (guideTypes.has(post.articleType)) {
      const copy = [post.title, post.subtitle, post.excerpt, ...post.content.flatMap((block) => [block.text || '', ...(block.items || [])])].join(' ');
      if (unsupportedClaims.test(copy)) errors.push(`${label}: contains an unsupported reporting or testing phrase`);
    }

    const illustration = illustrationsBySlug.get(post.slug);
    const isIllustration = post.image?.startsWith('/images/illustrations/');
    const expectedImage = isIllustration ? `/images/illustrations/${post.slug}.webp` : post.image;
    if (isIllustration) {
      if (!illustration) errors.push(`${label}: missing illustration manifest entry`);
      if (illustration?.category !== post.category) errors.push(`${label}: illustration category mismatch`);
      if (post.image !== expectedImage) errors.push(`${label}: expected illustration image ${expectedImage}`);
      if (post.imageCaption !== illustration?.alt) errors.push(`${label}: illustration alt text is missing or stale`);
      if (post.imageCredit !== (illustration?.credit || illustrationManifest.credit)) errors.push(`${label}: illustration credit is missing or stale`);
    } else {
      if (illustration) errors.push(`${label}: photo post must not have an illustration manifest entry`);
      if (!post.image?.startsWith('/images/posts/')) errors.push(`${label}: photo posts must use an image under /images/posts/`);
      if (!post.imageCaption) errors.push(`${label}: photo caption / alt text is missing`);
      if (!post.imageCredit) errors.push(`${label}: photo credit is missing`);
    }
    if (images.has(post.image)) errors.push(`${label}: duplicate article image`);
    images.add(post.image);
    if (post.seo?.ogImage !== post.image) errors.push(`${label}: social image does not match article image`);
    if (!fs.existsSync(path.join(root, 'public', String(post.image).replace(/^\//, '')))) errors.push(`${label}: image file is missing`);
  }
}

if (count !== 51) errors.push(`expected 51 posts, found ${count}`);
if (images.size !== 51) errors.push(`expected 51 unique article images, found ${images.size}`);

if (errors.length) {
  console.error(`Content audit failed with ${errors.length} issue(s):`);
  for (const error of errors) console.error(`- ${error}`);
  process.exit(1);
}

console.log(`Content audit passed: ${count} posts, ${slugs.size} unique slugs, ${images.size} unique article images (${illustrationsBySlug.size} original illustrations, the rest regular photos), no duplicate blocks or unsupported testing claims.`);
