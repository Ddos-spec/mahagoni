import { readdir, readFile, writeFile, cp, mkdir } from 'node:fs/promises';
import { join, dirname, basename, extname } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = fileURLToPath(new URL('../', import.meta.url));
const dist = join(root, 'dist');
const scrapedUploads = join(root, 'wp-content', 'uploads');
const distUploads = join(dist, 'wp-content', 'uploads');

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
const variantCache = new Map();

const localSrcset = async (src) => {
  const marker = '/wp-content/uploads/';
  const at = src.indexOf(marker);
  if (at < 0) return '';
  const relative = decodeURIComponent(src.slice(at + marker.length));
  const sourceFile = join(scrapedUploads, relative);
  const folder = dirname(sourceFile);
  const file = basename(sourceFile);
  const extension = extname(file);
  const stem = file.slice(0, -extension.length);
  const key = `${folder}/${stem}${extension}`;
  if (variantCache.has(key)) return variantCache.get(key);
  let names = [];
  try { names = await readdir(folder); } catch { variantCache.set(key, ''); return ''; }
  const escaped = stem.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  const extEscaped = extension.replace('.', '\\.');
  const pattern = new RegExp(`^${escaped}-(\\d+)x(\\d+)${extEscaped}$`, 'i');
  const candidates = names.map((name) => {
    const match = name.match(pattern);
    return match ? { name, width: Number(match[1]) } : null;
  }).filter(Boolean).sort((a,b)=>a.width-b.width);
  const prefix = src.slice(0, src.lastIndexOf('/') + 1);
  const value = candidates.map(({name,width}) => `${prefix}${encodeURIComponent(name).replace(/%2F/g,'/')} ${width}w`).join(', ');
  variantCache.set(key, value);
  return value;
};

const optimizeHtml = async (html) => {
  const tags = html.match(/<img\b[^>]*>/gi) ?? [];
  const replacements = new Map();
  for (const tag of tags) {
    let next = tag;
    const src = getAttr(tag, 'src');
    const isPriority = /fetchpriority="high"/i.test(tag);
    if (!/\sdecoding=/i.test(next)) next = appendAttr(next, 'decoding="async"');
    if (isPriority) {
      if (!/\sloading=/i.test(next)) next = appendAttr(next, 'loading="eager"');
    } else if (!/\sloading=/i.test(next)) next = appendAttr(next, 'loading="lazy"');
    if (!/\ssrcset=/i.test(next) && src.includes('/wp-content/uploads/')) {
      const srcset = await localSrcset(src);
      if (srcset) next = next.replace(/(\ssrc="[^"]+")/i, `$1 srcset="${srcset}" sizes="100vw"`);
    }
    replacements.set(tag, next);
  }
  let output = html;
  for (const [from,to] of replacements) output = output.replace(from,to);
  const hero = (output.match(/<img\b[^>]*fetchpriority="high"[^>]*>/i) || [])[0];
  if (hero && !/rel="preload"[^>]+as="image"/i.test(output)) {
    const src = getAttr(hero,'src');
    const srcset = getAttr(hero,'srcset');
    const images = srcset ? ` imagesrcset="${srcset}" imagesizes="100vw"` : '';
    output = output.replace('</head>', `<link rel="preload" as="image" href="${src}"${images} fetchpriority="high"></head>`);
  }
  return output;
};

const files = await walk(dist);
let changed = 0;
for (const file of files) {
  const input = await readFile(file, 'utf8');
  const output = await optimizeHtml(input);
  if (output !== input) { await writeFile(file, output); changed += 1; }
}
console.log(`Copied scraped uploads and optimized ${changed}/${files.length} HTML files.`);
