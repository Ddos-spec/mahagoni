import { readdir, readFile, writeFile } from 'node:fs/promises';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';

const dist = fileURLToPath(new URL('../dist/', import.meta.url));
const candidateWidths = [320, 480, 640, 800, 960, 1200, 1440, 1800, 2200];

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

const maxWidthFrom = (url) => {
  const match = url.match(/(?:&|&amp;)w=(\d+)/);
  return match ? Number(match[1]) : 0;
};

const withWidth = (url, width) => url.replace(/((?:&|&amp;)w=)\d+/, `$1${width}`);

const makeSrcset = (url) => {
  const max = maxWidthFrom(url);
  if (!max) return '';
  const widths = candidateWidths.filter((width) => width < max);
  widths.push(max);
  return [...new Set(widths)].map((width) => `${withWidth(url, width)} ${width}w`).join(', ');
};

const getAttr = (tag, name) => tag.match(new RegExp(`\\s${name}="([^"]+)"`, 'i'))?.[1] ?? '';
const appendAttr = (tag, attribute) => tag.replace(/\s*\/?>$/, ` ${attribute}>`);

const optimizeImageTag = (tag) => {
  const src = getAttr(tag, 'src');
  if (!src.includes('images.weserv.nl')) return tag;

  const srcset = makeSrcset(src);
  if (!srcset) return tag;

  const isPriority = /(?:hero-media|page-hero-media)/i.test(tag) || /fetchpriority="high"/i.test(tag);
  let next = tag;

  if (!/\ssrcset=/i.test(next)) {
    next = next.replace(/(\ssrc="[^"]+")/i, `$1 srcset="${srcset}" sizes="100vw"`);
  }
  if (!/\sdecoding=/i.test(next)) next = appendAttr(next, 'decoding="async"');
  if (isPriority) {
    if (!/\sloading=/i.test(next)) next = appendAttr(next, 'loading="eager"');
    if (!/\sfetchpriority=/i.test(next)) next = appendAttr(next, 'fetchpriority="high"');
  } else if (!/\sloading=/i.test(next)) {
    next = appendAttr(next, 'loading="lazy"');
  }
  return next;
};

const addHeroPreload = (html) => {
  const imageTags = html.match(/<img\b[^>]*>/gi) ?? [];
  const heroTag = imageTags.find((tag) => /(?:hero-media|page-hero-media)/i.test(tag) || /fetchpriority="high"/i.test(tag));
  if (!heroTag || /rel="preload"[^>]+as="image"/i.test(html)) return html;

  const src = getAttr(heroTag, 'src');
  const srcset = getAttr(heroTag, 'srcset') || makeSrcset(src);
  if (!src) return html;

  const srcsetAttr = srcset ? ` imagesrcset="${srcset}" imagesizes="100vw"` : '';
  const preload = `<link rel="preload" as="image" href="${src}"${srcsetAttr} fetchpriority="high">`;
  return html.replace('</head>', `${preload}</head>`);
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

console.log(`Optimized responsive image delivery in ${changed}/${files.length} HTML files.`);
