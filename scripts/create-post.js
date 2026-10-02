#!/usr/bin/env node
'use strict';
const fs = require('fs');
const path = require('path');
const readline = require('readline');
const matter = require('gray-matter');

const root = process.cwd();
const calendar = path.join(root, 'Blog-web.txt');
const directory = path.join(root, 'content/blog');
function parseCalendar() {
  if (!fs.existsSync(calendar)) throw new Error(`No existe ${calendar}`);
  return fs.readFileSync(calendar, 'utf8').split(/\r?\n/).flatMap((line) => {
    const cells = line.split('|').map((cell) => cell.trim());
    if (cells.length < 9 || !/^Semana\s+\d+/i.test(cells[1])) return [];
    const slug = cells[8].replace(/^\/blog\//, '').replace(/\/$/, '');
    if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(slug)) return [];
    return [{ week: cells[1], title: cells[2], keyword: cells[3], headings: (cells[7] || '').split(/[·•]/).map((item) => item.trim()).filter(Boolean), slug }];
  });
}
function createDraft(post) {
  const target = path.join(directory, `${post.slug}.mdx`);
  if (fs.existsSync(target) || fs.existsSync(path.join(directory, `${post.slug}.md`))) throw new Error(`El artículo ya existe; revisar intención antes de actualizar: ${target}`);
  const ecommerce = /tienda|commerce|tpv|prestashop/i.test(post.title);
  const design = /diseño|\bux\b|\bui\b/i.test(post.title);
  const metadata = {
    draft: true,
    title: post.title,
    seoTitle: post.title,
    date: new Date().toLocaleDateString('en-CA', { timeZone: 'Europe/Madrid' }),
    author: 'Víctor Lasheras',
    authorProfile: '/sobre-nosotros',
    authorRole: 'Diseño, desarrollo web y SEO en LTEvo',
    semana: post.week,
    keyword: post.keyword,
    coverImage: `/blog/${post.slug}.webp`,
    excerpt: '',
    tags: ecommerce ? ['E-commerce'] : design ? ['Diseño Web'] : ['SEO'],
    relatedSlugs: [],
  };
  // Visible draft marker is intentional: validator rejects unfinished scaffolding even if draft is removed.
  const body = `\nBORRADOR EDITORIAL\n\n${post.headings.map((heading) => `## ${heading}\n`).join('\n')}\n`;
  fs.mkdirSync(directory, { recursive: true });
  fs.writeFileSync(target, matter.stringify(body, metadata), { encoding: 'utf8', flag: 'wx' });
  console.log(`Borrador creado: content/blog/${post.slug}.mdx. No se publica ni aparece en el blog con draft: true.`);
  console.log('Prioriza intención y datos GSC, completa texto/fuentes/CTA/portada, revisa autoría, quita marcador y draft; valida MDX, build y página antes del push.');
}
async function main() {
  const posts = parseCalendar(), query = process.argv[2];
  if (!posts.length) throw new Error('El calendario no contiene propuestas con slugs válidos.');
  if (query) {
    const clean = query.replace(/^\/blog\//, '').replace(/\/$/, '').toLowerCase();
    const matches = posts.filter((post) => post.slug === clean || post.week.toLowerCase() === clean || post.week.match(/\d+/)?.[0] === clean);
    if (matches.length !== 1) throw new Error(`Selecciona slug exacto o número de semana: ${query}`);
    createDraft(matches[0]);
    return;
  }
  console.log('Propuestas editoriales (selecciona por intención comercial y datos, no por orden):');
  posts.forEach((post, index) => console.log(`${index + 1}. ${post.week}: ${post.title}${fs.existsSync(path.join(directory, `${post.slug}.mdx`)) ? ' [Existe]' : ''}`));
  const rl = readline.createInterface({ input: process.stdin, output: process.stdout });
  await new Promise((resolve, reject) => rl.question('Número de propuesta, o q para salir: ', (answer) => {
    rl.close();
    if (answer.trim().toLowerCase() === 'q') return resolve();
    const index = Number(answer) - 1;
    try { if (!Number.isInteger(index) || !posts[index]) throw new Error('Selección inválida.'); createDraft(posts[index]); resolve(); } catch (error) { reject(error); }
  }));
}
main().catch((error) => { console.error(error.message); process.exitCode = 1; });
