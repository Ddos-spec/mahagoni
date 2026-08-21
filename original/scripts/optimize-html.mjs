import { readdir, readFile, writeFile, cp, mkdir } from 'node:fs/promises';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = fileURLToPath(new URL('../', import.meta.url));
const dist = join(root, 'dist');
const scrapedUploads = join(root, 'wp-content', 'uploads');
const distUploads = join(dist, 'wp-content', 'uploads');

// The scrape is the source of truth for imagery. Copy it into the static build so
// the rebuilt site never depends on mahoganiutama.com or a third-party image proxy.
await mkdir(join(dist, 'wp-content'), { recursive: true });
await cp(scrapedUploads, distUploads, { recursive: true, force: true });

const walk = async (dir) => {
  const entries = await readdir(dir, { withFileTypes: true });
  const files = [];
  for (const entry of entries) {
    const full = join(dir, entry.name);
    if (entry.isDirectory()) files.push(...await walk(full));
    else if (entry.isFile() && entry.name.endsWith('.html')) files.push(full);
  }
  return files;
};

const getAttr = (tag, name) => tag.match(new RegExp(`\\s${name}="([^"]+)"`, 'i'))?.[1] ?? '';
const appendAttr = (tag, attribute) => tag.replace(/\s*\/?>$/, ` ${attribute}>`);

const optimizeImageTag = (tag) => {
  let next = tag;
  const isPriority = /fetchpriority="high"/i.test(next);
  if (!/\sdecoding=/i.test(next)) next = appendAttr(next, 'decoding="async"');
  if (isPriority) {
    if (!/\sloading=/i.test(next)) next = appendAttr(next, 'loading="eager"');
  } else if (!/\sloading=/i.test(next)) {
    next = appendAttr(next, 'loading="lazy"');
  }
  return next;
};

const addHeroPreload = (html) => {
  const imageTags = html.match(/<img\b[^>]*>/gi) ?? [];
  const heroTag = imageTags.find((tag) => /fetchpriority="high"/i.test(tag));
  if (!heroTag || /rel="preload"[^>]+as="image"/i.test(html)) return html;
  const src = getAttr(heroTag, 'src');
  if (!src) return html;
  return html.replace('</head>', `<link rel="preload" as="image" href="${src}" fetchpriority="high"></head>`);
};

const files = await walk(dist);
let changed = 0;
for (const file of files) {
  const input = await readFile(file, 'utf8');
  let output = input.replace(/<img\b[^>]*>/gi, optimizeImageTag);
  output = addHeroPreload(output);
  if (output !== input) {
    await writeFile(file, output);
    changed += 1;
  }
}

console.log(`Copied scraped uploads and optimized ${changed}/${files.length} HTML files.`);
