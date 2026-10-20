/** @type {import('next').NextConfig} */
const nextConfig = {
  // Static HTML/CSS/JS export — no Node server at runtime.
  output: 'export',

  // Required for `output: 'export'`: the Image Optimization API is not
  // available without a server. Images are served as-is from /public.
  // Prefer WebP sources in content data; use ContentImage for consistent
  // loading / priority / decoding attributes (see components/ContentImage.js).
  images: {
    unoptimized: true,
  },

  // Small response hygiene (honoured by `next start`; static hosts ignore
  // headers from this file but the flag still keeps local builds clean).
  poweredByHeader: false,

  // Catch accidental side effects during development.
  reactStrictMode: true,

  // Keep URLs without trailing slash so sitemap, canonicals, and internal
  // links stay consistent with existing data/json paths.
  trailingSlash: false,
};

module.exports = nextConfig;
