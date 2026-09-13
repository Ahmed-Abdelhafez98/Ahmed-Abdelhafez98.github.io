import { readdirSync, readFileSync, mkdirSync, writeFileSync } from 'node:fs';
import { join, basename } from 'node:path';
import matter from 'gray-matter';
import sharp from 'sharp';
import * as si from 'simple-icons';

const W = 1200;
const H = 630;
const OUT = 'public/covers';
const BG = '#0b0f14';
const SURFACE = '#121821';
const TEXT = '#e6edf3';
const MUTED = '#8b98a5';
const FALLBACK = '#4cc2ff';

const iconBySlug = Object.fromEntries(
  Object.values(si).filter((i) => i && i.slug && i.path).map((i) => [i.slug, i]),
);

const stackSlug = {
  php: 'php', 'php 8.2': 'php', 'php 8.3': 'php', laravel: 'laravel', 'laravel 8': 'laravel',
  sqlite: 'sqlite', typescript: 'typescript', nestjs: 'nestjs', prisma: 'prisma',
  postgresql: 'postgresql', docker: 'docker', python: 'python', 'python 3.11': 'python',
  langchain: 'langchain', ollama: 'ollama', mysql: 'mysql', 'github actions': 'githubactions',
  'node.js': 'nodedotjs', express: 'express', mongodb: 'mongodb', mongoose: 'mongoose',
  passport: 'passport', cloudinary: 'cloudinary', mapbox: 'mapbox', ejs: 'ejs', yii: 'yii',
  nginx: 'nginx', ruby: 'ruby', 'ruby on rails': 'rubyonrails', elasticsearch: 'elasticsearch',
  redis: 'redis', 'vue 2': 'vuedotjs', bootstrap: 'bootstrap', javascript: 'javascript',
  'vanilla js': 'javascript', react: 'react', 'react router': 'reactrouter', 'angular 12': 'angular',
  rxjs: 'reactivex', jwt: 'jsonwebtokens', jest: 'jest', 'socket.io': 'socketdotio',
  handlebars: 'handlebarsdotjs', kubernetes: 'kubernetes', firebase: 'firebase',
  'azure kubernetes': 'kubernetes', cloudflare: 'cloudflare', algolia: 'algolia',
  clickhouse: 'clickhouse',
};

const experienceIcons = {
  uptal: ['typescript', 'kubernetes', 'firebase', 'postgresql'],
  trufla: ['nestjs', 'mysql', 'mongodb', 'docker'],
  bayt: ['php', 'yii', 'python', 'postgresql'],
  'iti-internship': ['javascript', 'php', 'laravel', 'mysql'],
};

const esc = (s) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

const luminance = (hex) => {
  const n = parseInt(hex, 16);
  const [r, g, b] = [(n >> 16) & 255, (n >> 8) & 255, n & 255].map((c) => {
    c /= 255;
    return c <= 0.03928 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4;
  });
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
};

const accentFor = (icons) => {
  for (const i of icons) if (luminance(i.hex) > 0.12) return '#' + i.hex;
  return FALLBACK;
};

function wrap(text, max) {
  const words = text.split(' ');
  const lines = [];
  let cur = '';
  for (const w of words) {
    if ((cur + ' ' + w).trim().length > max && cur) {
      lines.push(cur);
      cur = w;
    } else cur = (cur + ' ' + w).trim();
  }
  if (cur) lines.push(cur);
  return lines;
}

function svg({ title, kind, period, icons }) {
  const accent = accentFor(icons);
  const shortTitle = title.split(':')[0];
  const rest = title.includes(':') ? title.slice(title.indexOf(':') + 1).trim() : '';
  const size = shortTitle.length > 26 ? 52 : 64;
  const titleLines = wrap(shortTitle, size === 64 ? 26 : 34).slice(0, 2);
  const subLines = rest ? wrap(rest.charAt(0).toUpperCase() + rest.slice(1), 58).slice(0, 2) : [];

  const chips = icons
    .map((ic, i) => {
      const x = 72 + i * 92;
      return `<g transform="translate(${x},72)"><rect width="72" height="72" rx="16" fill="${SURFACE}" stroke="#1f2933"/><g transform="translate(16,16) scale(1.6667)"><path d="${ic.path}" fill="${TEXT}"/></g></g>`;
    })
    .join('');

  let y = 250;
  const titleSvg = titleLines
    .map((l) => `<text x="72" y="${(y += size * 1.1)}" font-size="${size}" font-weight="700" fill="${TEXT}">${esc(l)}</text>`)
    .join('');
  y += 18;
  const subSvg = subLines
    .map((l) => `<text x="72" y="${(y += 40)}" font-size="28" fill="${MUTED}">${esc(l)}</text>`)
    .join('');

  return `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}" font-family="Segoe UI, Inter, Helvetica, Arial, sans-serif">
<rect width="${W}" height="${H}" fill="${BG}"/>
<rect x="0" y="0" width="12" height="${H}" fill="${accent}"/>
<circle cx="1080" cy="120" r="260" fill="${accent}" opacity="0.06"/>
${chips}
${titleSvg}
${subSvg}
<text x="72" y="566" font-size="22" fill="${MUTED}" letter-spacing="3">${esc(kind.toUpperCase())} · ${esc(period.toUpperCase())}</text>
<text x="1128" y="566" font-size="22" fill="${accent}" text-anchor="end" font-weight="600">Ahmed Emad</text>
</svg>`;
}

function collect(dir, kind) {
  return readdirSync(dir)
    .filter((f) => f.endsWith('.md'))
    .map((f) => {
      const slug = basename(f, '.md');
      const { data } = matter(readFileSync(join(dir, f), 'utf8'));
      const slugs =
        kind === 'Project'
          ? [...new Set((data.stack || []).filter((s) => s !== 'ReAct').map((s) => stackSlug[s.toLowerCase()]).filter(Boolean))]
          : experienceIcons[slug] || [];
      const icons = slugs.map((s) => iconBySlug[s]).filter(Boolean).slice(0, 4);
      return { slug, title: data.title, kind, period: data.period, icons };
    });
}

mkdirSync(OUT, { recursive: true });
const items = [
  ...collect('src/content/projects', 'Project'),
  ...collect('src/content/experience', 'Experience'),
];
items.push({
  slug: 'default',
  title: 'Ahmed Emad: Senior Backend Engineer. Laravel, NestJS, Python and the infrastructure they run on',
  kind: 'Portfolio',
  period: 'ahmed-abdelhafez98.github.io',
  icons: ['laravel', 'nestjs', 'python', 'postgresql'].map((s) => iconBySlug[s]),
});
for (const it of items) {
  const s = svg(it);
  await sharp(Buffer.from(s)).png({ compressionLevel: 9 }).toFile(join(OUT, `${it.slug}.png`));
  console.log(`${it.slug}.png  icons=${it.icons.map((i) => i.slug).join(',') || '-'}`);
}
