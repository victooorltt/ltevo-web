#!/usr/bin/env node
/**
 * validate-post.mjs — puertas de calidad SEO de un post, antes de publicarlo.
 *
 *   node scripts/validate-post.mjs <slug>
 *   node scripts/validate-post.mjs <slug> --update   # valida como revisión
 *
 * Sale con codigo 1 si falla cualquier puerta dura, de modo que no se puede
 * "dar por bueno" el post sin ejecutar esto.
 *
 * Solo Node, sin dependencias: funciona igual en WSL, Windows, macOS y en
 * cualquier agente. Las rutas se derivan del propio arbol de `app/` y de
 * `content/blog/`, asi que no hay lista de rutas que se pueda quedar obsoleta.
 */

import fs from 'node:fs';
import path from 'node:path';

const ROOT = process.cwd();
const BLOG_DIR = path.join(ROOT, 'content', 'blog');
const APP_DIR = path.join(ROOT, 'app');
const SUFFIX = ' | LTEvo';

/* Vocabulario cerrado de tags (ver SKILL.md). Fuera de esta lista, falla. */
const ALLOWED_TAGS = new Set([
  'SEO', 'SEO Técnico', 'Diseño Web', 'E-commerce',
  'WooCommerce', 'Marketing', 'Kit Digital', 'Estrategia Web',
]);

/* ---------------------------------------------------------------- */
/*  Utilidades                                                       */
/* ---------------------------------------------------------------- */

const read = (p) => fs.readFileSync(p, 'utf8');
const exists = (p) => fs.existsSync(p);

function splitFrontmatter(raw) {
  const m = raw.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n?([\s\S]*)$/);
  if (!m) return null;
  return { fm: m[1], body: m[2] };
}

function fmValue(fm, key) {
  const m = fm.match(new RegExp(`^${key}:\\s*"(.*)"\\s*$`, 'm'));
  return m ? m[1] : undefined;
}

function fmList(fm, key) {
  const m = fm.match(new RegExp(`^${key}:\\s*\\[(.*)\\]\\s*$`, 'm'));
  if (!m) return [];
  return [...m[1].matchAll(/"([^"]*)"/g)].map((x) => x[1]);
}

/** Rutas publicas reales, derivadas de app/**\/page.tsx. */
function realRoutes() {
  const routes = new Set(['/']);
  const walk = (dir) => {
    for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
      const full = path.join(dir, entry.name);
      if (entry.isDirectory()) {
        if (['node_modules', '.next', 'api'].includes(entry.name)) continue;
        walk(full);
      } else if (entry.name === 'page.tsx') {
        const rel = path.relative(APP_DIR, path.dirname(full));
        // Las rutas dinamicas (/blog/[slug]) no son URLs publicas por si mismas.
        if (rel.includes('[')) continue;
        routes.add(rel === '' ? '/' : '/' + rel.split(path.sep).join('/'));
      }
    }
  };
  walk(APP_DIR);
  return routes;
}

function publishedSlugs() {
  if (!exists(BLOG_DIR)) return new Set();
  return new Set(
    fs.readdirSync(BLOG_DIR)
      .filter((f) => /\.mdx?$/.test(f))
      .map((f) => '/blog/' + path.basename(f).replace(/\.mdx?$/, ''))
  );
}

/** Dimensiones de cabecera, sin depender de sharp. */
function imageSize(file) {
  const b = fs.readFileSync(file);
  if (b.length < 24) return null;
  // WebP: VP8 / VP8L / VP8X
  if (b.toString('ascii', 0, 4) === 'RIFF' && b.toString('ascii', 8, 12) === 'WEBP') {
    const tag = b.toString('ascii', 12, 16);
    if (tag === 'VP8X') return { width: 1 + b.readUIntLE(24, 3), height: 1 + b.readUIntLE(27, 3) };
    if (tag === 'VP8L') {
      const n = b.readUInt32LE(21);
      return { width: (n & 0x3fff) + 1, height: ((n >> 14) & 0x3fff) + 1 };
    }
    if (tag === 'VP8 ') {
      return { width: b.readUInt16LE(26) & 0x3fff, height: b.readUInt16LE(28) & 0x3fff };
    }
  }
  // PNG
  if (b.readUInt32BE(0) === 0x89504e47) return { width: b.readUInt32BE(16), height: b.readUInt32BE(20) };
  // JPEG: recorrer marcadores hasta SOFn
  if (b[0] === 0xff && b[1] === 0xd8) {
    let i = 2;
    while (i < b.length - 9) {
      if (b[i] !== 0xff) { i++; continue; }
      const marker = b[i + 1];
      if (marker >= 0xc0 && marker <= 0xcf && ![0xc4, 0xc8, 0xcc].includes(marker)) {
        return { height: b.readUInt16BE(i + 5), width: b.readUInt16BE(i + 7) };
      }
      i += 2 + b.readUInt16BE(i + 2);
    }
  }
  return null;
}

const norm = (u) => {
  const clean = u.split('#')[0].split('?')[0].replace(/\/+$/, '');
  return clean === '' ? '/' : clean;
};

/* ---------------------------------------------------------------- */
/*  Puertas                                                          */
/* ---------------------------------------------------------------- */

const args = process.argv.slice(2).filter((a) => a !== '--update');
const slug = args[0];

if (!slug) {
  console.error('Uso: node scripts/validate-post.mjs <slug>');
  process.exit(2);
}

const file = path.join(BLOG_DIR, `${slug}.mdx`);
const fails = [];
const warns = [];
const pass = [];

function check(cond, okMsg, failMsg) {
  if (cond) pass.push(okMsg);
  else fails.push(failMsg);
  return cond;
}

if (!exists(file)) {
  console.error(`\n  NO EXISTE content/blog/${slug}.mdx\n`);
  process.exit(1);
}

const raw = read(file);
const parts = splitFrontmatter(raw);

if (!parts) {
  console.error(`\n  Frontmatter ausente o mal formado en ${slug}.mdx\n`);
  process.exit(1);
}
const { fm, body } = parts;

/* --- Puerta 1: sin placeholders ni notas internas --- */
const placeholders = raw.match(
  /\[Photo Placeholder[^\]]*\]|\[Placeholder[^\]]*\]|(?<![\w-])(TODO|TBD|FIXME)(?![\w-])/g
);
check(!placeholders, 'sin placeholders', `placeholders sin resolver: ${placeholders?.join(', ')}`);

/* --- Puerta 1b: sin diagramas ASCII ni tablas dibujadas con cajas ---
   Solo se detectan caracteres de dibujo de caja (│ ├ └ ─ ┌ ┐ ▼ ▸ ▶), que no
   aparecen en codigo real. Con un patron mas laxo (basado en pipes) saltaban
   falsos positivos en posts que no tienen ningun diagrama. */
const codeBlocks = [...body.matchAll(/```[a-z]*\r?\n([\s\S]*?)```/g)].map((m) => m[1]);
const ascii = codeBlocks.find((b) =>
  /[\u2502\u251C\u2514\u2500\u250C\u2510\u2518\u2508]{2,}/.test(b)
);
check(
  !ascii,
  'sin diagramas ASCII en bloques de codigo',
  ascii
    ? `diagrama ASCII dentro de un bloque de codigo ("${ascii.split('\n')[0].trim().slice(0, 42)}..."): en prose sale como terminal oscuro con scrollbar. Usar <FlowDiagram>, <TopicSilo> o tabla Markdown.`
    : '',
);

/* --- Puerta 2: keyword y longitudes de metadatos --- */
const keyword = (fmValue(fm, 'keyword') || '').trim().toLowerCase();
const title = fmValue(fm, 'title') || '';
const seoTitle = fmValue(fm, 'seoTitle');
const excerpt = fmValue(fm, 'excerpt') || '';

const plain = body.replace(/<[^>]+>/g, ' ');
const first100 = plain.split(/\s+/).slice(0, 100).join(' ').toLowerCase();
const h2 = [...body.matchAll(/^#{2,3}\s+(.*)$/gm)].map((m) => m[1]).join(' ').toLowerCase();

if (keyword) {
  const inH1 = keyword.includes(title.toLowerCase()) || title.toLowerCase().includes(keyword);

  check(inH1, `keyword en el H1 ("${keyword}")`, `keyword ausente del H1 ("${keyword}")`);
  check(first100.includes(keyword), 'keyword en las primeras 100 palabras', `keyword fuera de las primeras 100 palabras ("${keyword}")`);
  check(h2.includes(keyword), 'keyword en algun H2/H3', `keyword ausente de todos los H2/H3 ("${keyword}")`);
} else {
  fails.push('falta `keyword` en el frontmatter');
}

const finalTitle = seoTitle || title;
check(
  finalTitle.length + SUFFIX.length <= 60,
  `title final ${finalTitle.length + SUFFIX.length} chars (con "${SUFFIX.trim()}")`,
  `title final ${finalTitle.length + SUFFIX.length} chars, supera 60 y Google lo trunca`,
);
check(
  seoTitle !== undefined || finalTitle.length + SUFFIX.length <= 60,
  'seoTitle presente',
  'sin `seoTitle`: el title cae en el >60 de otros post',
);
check(
  excerpt.length >= 120 && excerpt.length <= 158,
  `excerpt ${excerpt.length} chars`,
  `excerpt ${excerpt.length} chars, fuera del rango 120-158`,
);

/* --- Puerta 3: enlaces internos resueltos --- */
const valid = new Set([...realRoutes(), ...publishedSlugs()].map(norm));
const broken = [...new Set(
  [...body.matchAll(/\]\((\/[^)\s]+)/g)].map((m) => m[1]).filter((h) => !norm(h).startsWith('/blog/categoria'))
)].filter((h) => !valid.has(norm(h)));

check(broken.length === 0, 'todos los enlaces internos resuelven', `enlaces internos rotos: ${broken.join(', ')}`);

/* --- Puerta 4: enlaces externos y fuentes --- */
const external = [...new Set([...body.matchAll(/\]\((https?:\/\/[^)\s]+)/g)].map((m) => m[1]))];
const words = plain.split(/\s+/).filter(Boolean).length;
const needsSource = /\d+\s*%|\b\d{2,}\s*(millones|mil)/i.test(plain);

if (words < 300) {
  fails.push(`solo ${words} palabras (minimo 300; recomendado >=1200 segun KD)`);
} else {
  pass.push(`${words} palabras`);
}

check(external.length >= 2, `${external.length} enlaces externos`, `solo ${external.length} enlaces externos (minimo 2)`);
if (needsSource) {
  warns.push('hay cifras en el texto: comprueba que cada una lleva su fuente enlazada');
}

/* --- Puerta 5: tags del vocabulario cerrado --- */
const tags = fmList(fm, 'tags');
const badTags = tags.filter((t) => !ALLOWED_TAGS.has(t));
check(badTags.length === 0, `tags correctos (${tags.join(', ')})`, `tags fuera del vocabulario: ${badTags.join(', ')}`);

/* --- Puerta 5b: autor real (aviso, no bloqueante hasta que exista /equipo) --- */
const author = (fmValue(fm, 'author') || '').trim();
if (author.toLowerCase() === 'equipo ltevo') {
  warns.push('`author` sigue siendo la entidad "Equipo LTEvo": E-E-A-T no se cumple hasta que haya autor real con pagina de perfil');
} else {
  pass.push(`autor real: ${author}`);
}

/* --- Puerta 6: la portada existe y mide 1200x630 --- */
const cover = fmValue(fm, 'coverImage');
if (!cover) {
  fails.push('falta `coverImage` en el frontmatter');
} else {
  const coverPath = path.join(ROOT, 'public', cover.replace(/^\//, ''));
  if (!exists(coverPath)) {
    fails.push(`la portada no existe: public${cover}`);
  } else {
    const size = imageSize(coverPath);
    if (!size) {
      warns.push(`no se pudo leer el tamaño de ${cover}`);
    } else {
      const ok1200 = size.width === 1200 && size.height === 630;
      if (ok1200) pass.push(`portada ${size.width}x${size.height}`);
      else fails.push(`portada ${size.width}x${size.height}; se requiere 1200x630 (og:image y recorte social)`);
    }
  }
}

/* ---------------------------------------------------------------- */
/*  Informe                                                          */
/* ---------------------------------------------------------------- */

const tag = '\x1b[';
const bold = (s) => `${tag}1m${s}${tag}0m`;
const green = (s) => `${tag}32m${s}${tag}0m`;
const red = (s) => `${tag}31m${s}${tag}0m`;
const yellow = (s) => `${tag}33m${s}${tag}0m`;

console.log(`\n  ${bold('Validacion del post')}  ${slug}\n`);
for (const p of pass) console.log(`  ${green('OK  ')} ${p}`);
for (const w of warns) console.log(`  ${yellow('AVISO')} ${w}`);
for (const f of fails) console.log(`  ${red('FALLA')} ${f}`);

console.log('');
if (fails.length) {
  console.log(red(`  ${fails.length} puerta(s) bloqueante(s) superada(s). NO publicar.\n`));
  process.exit(1);
}
console.log(green('  Todas las puertas superadas. Puedes marcar la X y publicar.\n'));
process.exit(0);