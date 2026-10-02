#!/usr/bin/env node
/** Validate actual YAML + MDX, links/assets, authorship and component contracts.
 * Body uses React contract adapters; production build/browser must verify actual app components.
 * --update preserves HEAD's publication date. --all excludes drafts. No automatic SEO guarantees.
 */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { execFileSync } from 'node:child_process';
import matter from 'gray-matter';
import React from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import { compileMDX } from 'next-mdx-remote/rsc';
import remarkGfm from 'remark-gfm';
import sharp from 'sharp';

const TAGS = new Set(['SEO', 'SEO Técnico', 'Diseño Web', 'E-commerce', 'WooCommerce', 'Marketing', 'Kit Digital', 'Estrategia Web']);
const PROPS = { FlowDiagram: ['title', 'steps'], FlowStep: ['title', 'subtitle', 'badge'], TopicSilo: ['pillar', 'clusters'], SiloCluster: ['title', 'badge'], Callout: ['type', 'title'], CtaService: ['service', 'title'] };
const CTA = { seo: '/servicios/seo', 'diseno-web': '/servicios/diseno-web', 'mantenimiento-web': '/servicios/mantenimiento-web', hosting: '/servicios/hosting', 'desarrollo-web': '/servicios/desarrollo-web', 'tiendas-online': '/servicios/tiendas-online', contacto: '/contacto' };
const HTML = new Set('a abbr b blockquote br code del details div em figcaption figure h2 h3 h4 h5 h6 hr i img kbd li ol p pre s small span strong sub summary sup table tbody td th thead tr ul'.split(' '));
const read = (file) => fs.readFileSync(file, 'utf8');
const walk = (node, visit) => { visit(node); for (const child of node.children || []) walk(child, visit); };
const textOf = (node) => node.value || (node.children || []).map(textOf).join('');
const headingId = (text) => text.toLowerCase().replace(/[^\p{L}\p{N}\s-]/gu, '').trim().replace(/\s/g, '-');
const isoDate = (value) => typeof value === 'string' && /^\d{4}-\d{2}-\d{2}$/.test(value) && !Number.isNaN(Date.parse(value)) && new Date(value).toISOString().slice(0, 10) === value;
function assetFile(root, url) {
  const file = path.resolve(root, 'public', '.' + url);
  return file.startsWith(path.resolve(root, 'public') + path.sep) ? file : null;
}
function filesBelow(dir, accept) {
  if (!fs.existsSync(dir)) return [];
  return fs.readdirSync(dir, { withFileTypes: true }).flatMap((entry) => {
    const full = path.join(dir, entry.name);
    return entry.isDirectory() ? filesBelow(full, accept) : accept(entry.name) ? [full] : [];
  });
}
function routeIndex(root) {
  const routes = new Map(), app = path.join(root, 'app');
  for (const file of filesBelow(app, (name) => /^page\.(tsx|jsx|js|ts|mdx)$/.test(name))) {
    const parts = path.relative(app, path.dirname(file)).split(path.sep).filter((part) => part && !/^\(.*\)$/.test(part));
    if (!parts.some((part) => part.startsWith('[') || part.startsWith('@'))) routes.set('/' + parts.join('/'), { source: file });
  }
  for (const file of filesBelow(path.join(root, 'content/blog'), (name) => /\.mdx?$/.test(name))) {
    const post = matter(read(file));
    if (post.data.draft !== true) routes.set('/blog/' + path.basename(file).replace(/\.mdx?$/, ''), { source: file, body: post.content });
  }
  return routes;
}
function literal(expression) {
  const node = expression?.type === 'Program' ? expression.body[0]?.expression : expression;
  if (!node) throw new Error('expresión vacía');
  if (node.type === 'Literal') return node.value;
  if (node.type === 'ArrayExpression') return node.elements.map(literal);
  if (node.type === 'UnaryExpression' && node.operator === '-' && node.argument.type === 'Literal' && typeof node.argument.value === 'number') return -node.argument.value;
  if (node.type === 'ObjectExpression') return Object.fromEntries(node.properties.map((prop) => {
    if (prop.type !== 'Property' || prop.computed || prop.method || prop.kind !== 'init') throw new Error('objeto no literal');
    const key = prop.key.name ?? prop.key.value;
    if (['__proto__', 'prototype', 'constructor'].includes(key)) throw new Error('clave no admitida');
    return [key, literal(prop.value)];
  }));
  throw new Error(`solo se permiten datos literales, no ${node.type}`);
}
function jsxProps(node) {
  const props = {};
  for (const attr of node.attributes || []) {
    if (attr.type !== 'mdxJsxAttribute') throw new Error('spreads JSX no admitidos');
    if (attr.name.startsWith('on') || attr.name === 'dangerouslySetInnerHTML') throw new Error(`atributo no admitido: ${attr.name}`);
    props[attr.name] = attr.value === null ? true : typeof attr.value === 'string' ? attr.value : literal(attr.value.data?.estree);
  }
  return props;
}
function contractError(name, props) {
  if (['FlowStep', 'SiloCluster'].includes(name) && (typeof props.title !== 'string' || !props.title.trim())) return `${name} requiere title`;
  if (name === 'Callout' && props.type && !['tip', 'info', 'warning', 'success'].includes(props.type)) return 'Callout type no válido';
  if (name === 'CtaService' && (typeof props.service !== 'string' || !CTA[props.service])) return 'CtaService requiere un service explícito válido';
  if (name === 'TopicSilo' && props.pillar !== undefined && (!props.pillar || typeof props.pillar.title !== 'string')) return 'TopicSilo pillar requiere title';
  for (const key of ['steps', 'clusters']) {
    if (props[key] === undefined) continue;
    const allowed = key === 'steps' ? ['title', 'subtitle', 'badge', 'description'] : ['title', 'badge', 'desc'];
    if (!Array.isArray(props[key]) || props[key].some((item) => !item || typeof item.title !== 'string' || !item.title.trim() || Object.entries(item).some(([field, value]) => !allowed.includes(field) || typeof value !== 'string'))) return `${name} ${key} requiere objetos de texto con title y campos válidos`;
  }
  if (name === 'TopicSilo' && props.pillar && Object.entries(props.pillar).some(([field, value]) => !['title', 'badge', 'desc'].includes(field) || typeof value !== 'string')) return 'TopicSilo pillar contiene campos no válidos';
  for (const key of ['title', 'subtitle', 'badge']) if (props[key] !== undefined && typeof props[key] !== 'string') return `${name} ${key} debe ser texto`;
  return null;
}
function routeHasAnchor(root, destination, anchor) {
  if (destination.body) return [...destination.body.matchAll(/^#{2,6}\s+(.+)$/gm)].some((match) => headingId(match[1].replace(/[*`]/g, '')) === anchor) || destination.body.includes(`id="${anchor}"`);
  const pending = [destination.source], seen = new Set();
  while (pending.length) {
    const file = pending.pop();
    if (seen.has(file)) continue;
    seen.add(file);
    const source = read(file);
    if (source.includes(`id="${anchor}"`) || source.includes(`id='${anchor}'`)) return true;
    for (const match of source.matchAll(/(?:from\s+|import\s*)["'](@\/[^"']+|\.[^"']+)["']/g)) {
      const base = match[1].startsWith('@/') ? path.join(root, match[1].slice(2)) : path.resolve(path.dirname(file), match[1]);
      const next = ['', '.tsx', '.ts', '.jsx', '.js', '/index.tsx'].map((ext) => base + ext).find((candidate) => fs.existsSync(candidate) && fs.statSync(candidate).isFile());
      if (next) pending.push(next);
    }
  }
  return false;
}
export async function validatePost(slug, { root = process.cwd(), update = false } = {}) {
  const errors = [], warnings = [];
  if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(slug)) return { slug, errors: ['slug no válido'], warnings };
  const file = ['mdx', 'md'].map((ext) => path.join(root, 'content/blog', `${slug}.${ext}`)).find(fs.existsSync);
  if (!file) return { slug, errors: ['el artículo no existe'], warnings };
  let data, body;
  try { ({ data, content: body } = matter(read(file))); } catch (error) { return { slug, errors: [`YAML no válido: ${error.message}`], warnings }; }
  for (const key of ['title', 'excerpt', 'keyword', 'author', 'authorProfile', 'coverImage']) if (typeof data[key] !== 'string' || !data[key].trim()) errors.push(`falta ${key} de texto`);
  if (data.draft !== undefined && typeof data.draft !== 'boolean') errors.push('draft debe ser booleano YAML');
  if (data.draft === true) errors.push('draft: true; completar y revisar antes de publicar');
  if (!isoDate(data.date)) errors.push('date debe ser fecha real "YYYY-MM-DD" entre comillas');
  if (data.updatedAt !== undefined && !isoDate(data.updatedAt)) errors.push('updatedAt debe ser fecha real "YYYY-MM-DD" entre comillas');
  if (isoDate(data.date) && isoDate(data.updatedAt) && data.updatedAt < data.date) errors.push('updatedAt no puede ser anterior a date');
  const today = new Date().toLocaleDateString('en-CA', { timeZone: 'Europe/Madrid' });
  if (isoDate(data.date) && data.date > today) errors.push('date futura: mantener draft hasta publicación');
  if (isoDate(data.updatedAt) && data.updatedAt > today) errors.push('updatedAt futura');
  if (update) {
    if (!isoDate(data.updatedAt)) errors.push('--update requiere updatedAt');
    try {
      const old = matter(execFileSync('git', ['show', `HEAD:${path.relative(root, file).split(path.sep).join('/')}`], { cwd: root, encoding: 'utf8', stdio: ['ignore', 'pipe', 'ignore'] })).data;
      if (old.date !== data.date) errors.push('revisión debe conservar fecha original de publicación de HEAD');
    } catch { warnings.push('sin versión HEAD: comprobar fecha original manualmente'); }
  }
  if (!Array.isArray(data.tags) || !data.tags.length || data.tags.some((tag) => !TAGS.has(tag))) errors.push('tags vacíos o fuera del vocabulario editorial');
  if (String(data.seoTitle || data.title || '').length + 8 > 60) warnings.push('title largo: revisar ancho y claridad; no existe límite fijo de Google');
  if (String(data.excerpt || '').length < 80 || String(data.excerpt || '').length > 180) warnings.push('excerpt muy corto/largo: revisar descripción y tarjeta');
  const businessFile = path.join(root, 'lib/business.ts');
  if (fs.existsSync(businessFile)) {
    const businessSource = read(businessFile);
    const knownAuthor = businessSource.match(/\bauthor:\s*["']([^"']+)["']/)?.[1];
    const knownProfile = businessSource.match(/\bauthorProfile:\s*["']([^"']+)["']/)?.[1];
    if (knownAuthor && data.author !== knownAuthor) errors.push('autor no coincide con la identidad confirmada de lib/business.ts');
    if (knownProfile && data.authorProfile !== knownProfile) errors.push('authorProfile no coincide con el perfil confirmado de lib/business.ts');
  }
  if (!data.authorRole) warnings.push('verificar rol del autor/equipo en perfil; no inventar identidad');
  if (/\bTODO\b|\bTBD\b/.test(body) || /\[\s*(?:photo\s+)?placeholder[^\]]*\]|Escribe (?:el contenido|una introducción)|Resume las ideas|\bBORRADOR EDITORIAL\b|word count|volumen mensual estimado|dificultad de.*\(KD\)/i.test(body)) errors.push('restos de borrador/instrucciones o métricas editoriales en cuerpo');
  if (/```[^\n]*\n[^`]*[│├└─┌┐┘┤┬┴┼]/s.test(body)) errors.push('diagrama ASCII: usar tabla Markdown/componentes visuales');
  const routes = routeIndex(root), currentUrl = `/blog/${slug}`, links = [], images = [], headings = new Set(), definitions = new Map();
  let ctas = 0, tree, unsafe = false;
  const collect = () => (parsed) => {
    tree = parsed;
    walk(parsed, (node) => {
      if (node.type === 'definition') definitions.set(node.identifier, node.url);
      if (node.type === 'heading') { if (node.depth === 1) errors.push('H1 añadido: title ya genera H1'); headings.add(headingId(textOf(node))); }
      if (node.type === 'link') links.push(node.url);
      if (node.type === 'image') { images.push(node.url); if (!node.alt?.trim()) errors.push(`imagen sin alt: ${node.url}`); }
      if (node.type === 'mdxjsEsm') { errors.push('import/export no admitidos en artículos'); unsafe = true; }
      if (['mdxTextExpression', 'mdxFlowExpression'].includes(node.type)) {
        try { literal(node.data?.estree); } catch (error) { errors.push(`expresión MDX: ${error.message}`); unsafe = true; }
      }
      if (!['mdxJsxFlowElement', 'mdxJsxTextElement'].includes(node.type) || !node.name) return;
      if (node.name === 'h1') errors.push('H1 JSX añadido');
      if (!HTML.has(node.name) && !Object.hasOwn(PROPS, node.name)) { errors.push(`componente no registrado: ${node.name}`); unsafe = true; return; }
      let props;
      try { props = jsxProps(node); } catch (error) { errors.push(`${node.name}: ${error.message}`); unsafe = true; return; }
      if (props.id) headings.add(props.id);
      if (props.href !== undefined) links.push(props.href);
      if (props.src !== undefined) images.push(props.src);
      if (node.name === 'img') {
        if (!props.src) errors.push('img JSX sin src');
        if (!props.alt?.trim()) errors.push('img JSX sin alt');
        if (!(Number(props.width) > 0 && Number(props.height) > 0)) errors.push('img JSX requiere width y height');
      }
      if (!PROPS[node.name]) return;
      const unknown = Object.keys(props).filter((key) => !PROPS[node.name].includes(key));
      if (unknown.length) errors.push(`${node.name}: props desconocidas ${unknown.join(', ')}`);
      const problem = contractError(node.name, props); if (problem) errors.push(problem);
      if (node.name === 'CtaService' && CTA[props.service]) { ctas++; links.push(CTA[props.service]); }
    });
    walk(parsed, (node) => {
      if (['linkReference', 'imageReference'].includes(node.type)) {
        const url = definitions.get(node.identifier);
        if (!url) errors.push(`referencia sin destino: ${node.identifier}`);
        else {
          (node.type === 'linkReference' ? links : images).push(url);
          if (node.type === 'imageReference' && !node.alt?.trim()) errors.push(`imagen sin alt: ${url}`);
        }
      }
    });
    if (unsafe) throw new Error('MDX solo admite contenido y datos literales');
  };
  const components = Object.fromEntries(Object.keys(PROPS).map((name) => [name, ({ children, title, service }) => React.createElement('div', null, title, children, service && React.createElement('a', { href: CTA[service] }, 'Ver servicio'))]));
  try {
    const compiled = await compileMDX({ source: body, components, options: { mdxOptions: { remarkPlugins: [remarkGfm, collect] } } });
    renderToStaticMarkup(compiled.content);
  } catch (error) { errors.push(`MDX no compila/renderiza: ${error.message}`); }
  if (!ctas) errors.push('falta CtaService con service explícito');
  if (tree && textOf(tree).trim().split(/\s+/).length < 300) warnings.push('contenido breve: evaluar si resuelve intención; no hay longitud mínima SEO');
  const external = new Set();
  function checkLink(raw, image = false) {
    if (typeof raw !== 'string') { errors.push('enlace/imagen debe ser texto literal'); return; }
    let url;
    try { url = new URL(raw, `https://ltevo.com${currentUrl}`); } catch { errors.push(`URL no válida: ${raw}`); return; }
    if (['mailto:', 'tel:'].includes(url.protocol) && !image) return;
    if (!['https:', 'http:'].includes(url.protocol)) { errors.push(`protocolo no permitido: ${raw}`); return; }
    if (!['ltevo.com', 'www.ltevo.com'].includes(url.hostname)) { if (image) errors.push(`imagen externa: descargar y comprobar derechos/dimensiones ${raw}`); else external.add(url.href); return; }
    let pathname;
    try { pathname = decodeURIComponent(url.pathname).replace(/\/+$/, '') || '/'; } catch { errors.push(`URL mal codificada: ${raw}`); return; }
    const asset = assetFile(root, pathname);
    if (asset && fs.existsSync(asset) && fs.statSync(asset).isFile()) return;
    if (image) { errors.push(`imagen local no existe: ${raw}`); return; }
    const destination = pathname === currentUrl ? { body } : routes.get(pathname);
    if (!destination) { errors.push(`enlace interno sin página publicada: ${raw}`); return; }
    if (!url.hash) return;
    let anchor;
    try { anchor = decodeURIComponent(url.hash.slice(1)); } catch { errors.push(`anchor mal codificado: ${raw}`); return; }
    if (pathname === currentUrl ? !headings.has(anchor) : !routeHasAnchor(root, destination, anchor)) errors.push(`anchor no encontrado en ruta: ${raw}`);
  }
  for (const link of links) checkLink(link);
  if (data.authorProfile) checkLink(data.authorProfile);
  if (data.relatedSlugs !== undefined) {
    if (!Array.isArray(data.relatedSlugs)) errors.push('relatedSlugs debe ser lista');
    else for (const related of data.relatedSlugs) checkLink(`/blog/${related}`);
  }
  for (const image of images) {
    checkLink(image, true);
    const local = typeof image === 'string' && image.startsWith('/') ? assetFile(root, image.split(/[?#]/)[0]) : null;
    if (local && fs.existsSync(local)) {
      try { await sharp(local).metadata(); } catch (error) { errors.push(`imagen ilegible: ${image} (${error.message})`); }
    }
  }
  if (external.size < 2) warnings.push(`${external.size} fuentes: verificar respaldo de afirmaciones; no imponer enlaces irrelevantes`);
  if (typeof data.coverImage === 'string') {
    checkLink(data.coverImage, true);
    const cover = assetFile(root, data.coverImage);
    if (cover && fs.existsSync(cover)) {
      try {
        const size = await sharp(cover).metadata();
        if (!size.width || !size.height) errors.push('portada sin dimensiones legibles');
        else if (size.width !== 1200 || size.height !== 630) warnings.push(`portada ${size.width}x${size.height}: estándar social 1200x630; declarar dimensiones reales`);
      } catch (error) { errors.push(`portada ilegible: ${error.message}`); }
    }
  }
  if (data.socialImage !== undefined) {
    if (typeof data.socialImage !== 'string' || !data.socialImage.startsWith('/')) errors.push('socialImage debe ser una ruta local');
    else {
      checkLink(data.socialImage, true);
      const social = assetFile(root, data.socialImage);
      if (social && fs.existsSync(social)) {
        try {
          const size = await sharp(social).metadata();
          if (size.width !== 1200 || size.height !== 630) errors.push('socialImage debe medir 1200x630, como declara la plantilla social');
        } catch (error) { errors.push(`imagen social ilegible: ${error.message}`); }
      }
    }
  }
  return { slug, errors: [...new Set(errors)], warnings: [...new Set(warnings)] };
}
async function main() {
  const args = process.argv.slice(2);
  if (!args.length || args.some((arg) => arg.startsWith('--') && !['--all', '--update'].includes(arg))) throw new Error('Uso: node scripts/validate-post.mjs <slug> [--update] | --all');
  if (args.includes('--all') && args.some((arg) => !arg.startsWith('--'))) throw new Error('Usa --all o slugs, no ambos.');
  const slugs = args.includes('--all') ? filesBelow(path.join(process.cwd(), 'content/blog'), (name) => /\.mdx?$/.test(name)).filter((file) => matter(read(file)).data.draft !== true).map((file) => path.basename(file).replace(/\.mdx?$/, '')) : args.filter((arg) => !arg.startsWith('--'));
  if (!slugs.length) throw new Error('No hay artículos para validar.');
  let failures = 0;
  for (const slug of slugs) {
    const result = await validatePost(slug, { update: args.includes('--update') });
    console.log(`\n${result.errors.length ? 'FALLA' : 'OK'} ${slug}`);
    for (const warning of result.warnings) console.log(`  AVISO ${warning}`);
    for (const error of result.errors) console.log(`  ERROR ${error}`);
    failures += result.errors.length;
  }
  console.log(`\n${failures ? `${failures} errores: no publicar.` : 'Comprobaciones locales superadas. Falta revisión editorial, build y página real antes de publicar.'}`);
  process.exitCode = failures ? 1 : 0;
}
if (process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)) main().catch((error) => { console.error(error.message); process.exitCode = 1; });
