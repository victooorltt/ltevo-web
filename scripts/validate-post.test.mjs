import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { execFileSync } from 'node:child_process';
import matter from 'gray-matter';
import sharp from 'sharp';
import { validatePost } from './validate-post.mjs';

async function fixture() {
  const root = fs.mkdtempSync(path.join(os.tmpdir(), 'ltevo-post-'));
  for (const directory of ['content/blog', 'public/blog', 'app/sobre-nosotros', 'app/servicios/seo', 'components', 'lib']) fs.mkdirSync(path.join(root, directory), { recursive: true });
  fs.writeFileSync(path.join(root, 'app/page.tsx'), 'import Hero from "@/components/hero"; export default function Page() { return <Hero/>; }');
  fs.writeFileSync(path.join(root, 'components/hero.tsx'), 'export default function Hero() { return <section id="servicios"/>; }');
  fs.writeFileSync(path.join(root, 'app/sobre-nosotros/page.tsx'), 'export default function Page() { return null; }');
  fs.writeFileSync(path.join(root, 'app/servicios/seo/page.tsx'), 'export default function Page() { return null; }');
  fs.writeFileSync(path.join(root, 'lib/business.ts'), 'export const business = { author: "Víctor Lasheras", authorProfile: "/sobre-nosotros" };');
  await sharp({ create: { width: 1200, height: 630, channels: 3, background: '#ffffff' } }).webp().toFile(path.join(root, 'public/blog/prueba.webp'));
  const data = { title: 'Una respuesta natural', seoTitle: 'Guía para decidir', date: '2026-06-01', author: 'Víctor Lasheras', authorProfile: '/sobre-nosotros', authorRole: 'LTEvo', keyword: 'palabra clave con variante', coverImage: '/blog/prueba.webp', excerpt: 'Una guía concreta para tomar una decisión informada sobre el servicio SEO y sus posibilidades.', tags: ['SEO'] };
  const body = '## Decidir con información\n\nTodo lo necesario se explica aquí. [Servicios](/#servicios), [Google](https://developers.google.com/search) y [Documentación](https://schema.org).\n\n<CtaService service="seo" />\n';
  const write = (changes = {}, content = body) => fs.writeFileSync(path.join(root, 'content/blog/prueba.mdx'), matter.stringify(content, { ...data, ...changes }));
  write();
  return { root, write, body, data, close: () => fs.rmSync(root, { recursive: true, force: true }) };
}

async function withFixture(fn) { const f = await fixture(); try { await fn(f); } finally { f.close(); } }

test('declared social image must exist and match the social metadata dimensions', async () => withFixture(async (f) => {
  f.write({ socialImage: '/blog/missing.jpg' });
  assert.ok((await validatePost('prueba', { root: f.root })).errors.some((error) => error.includes('missing.jpg')));
  const target = path.join(f.root, 'public/blog/social.jpg');
  await sharp({ create: { width: 640, height: 360, channels: 3, background: '#ffffff' } }).jpeg().toFile(target);
  f.write({ socialImage: '/blog/social.jpg' });
  assert.ok((await validatePost('prueba', { root: f.root })).errors.some((error) => error.includes('1200x630')));
  await sharp({ create: { width: 1200, height: 630, channels: 3, background: '#ffffff' } }).jpeg().toFile(target);
  assert.deepEqual((await validatePost('prueba', { root: f.root })).errors, []);
}));

test('natural keyword variants, normal Spanish Todo and real YAML comments pass', async () => withFixture(async (f) => {
  const file = path.join(f.root, 'content/blog/prueba.mdx');
  fs.writeFileSync(file, fs.readFileSync(file, 'utf8').replace('title: Una respuesta natural', 'title: Una respuesta natural # comentario YAML'));
  const result = await validatePost('prueba', { root: f.root });
  assert.deepEqual(result.errors, []);
}));

test('publication gates reject draft and leaked editorial scaffold', async () => withFixture(async (f) => {
  f.write({ draft: true }, f.body + '\nBORRADOR EDITORIAL');
  const result = await validatePost('prueba', { root: f.root });
  assert.ok(result.errors.some((error) => error.includes('draft: true')));
  assert.ok(result.errors.some((error) => error.includes('restos de borrador')));
}));

test('reference, absolute-domain and JSX internal links must resolve; drafts are not destinations', async () => withFixture(async (f) => {
  fs.writeFileSync(path.join(f.root, 'content/blog/oculto.mdx'), matter.stringify('Borrador', { ...f.data, draft: true }));
  f.write({}, f.body + '\n[Referencia][rota]\n\n[rota]: /no-existe\n\n<a href="https://ltevo.com/otra-rota">Roto</a>\n\n[Oculto](/blog/oculto)');
  const result = await validatePost('prueba', { root: f.root });
  for (const url of ['/no-existe', '/otra-rota', '/blog/oculto']) assert.ok(result.errors.some((error) => error.includes(url)), url);
}));

test('component names, props, explicit CTA and H1 are publication gates', async () => withFixture(async (f) => {
  f.write({}, '# Segundo H1\n\n<ComponenteInventado />\n\n<CtaService typo="seo" />\n');
  const result = await validatePost('prueba', { root: f.root });
  for (const match of ['H1 añadido', 'no registrado', 'props desconocidas', 'service explícito']) assert.ok(result.errors.some((error) => error.includes(match)), match);
}));

test('broken syntax and executable MDX expressions are rejected without execution', async () => withFixture(async (f) => {
  f.write({}, f.body + '\n<Callout type="warning">Sin cierre');
  assert.ok((await validatePost('prueba', { root: f.root })).errors.some((error) => error.includes('MDX no compila')));
  f.write({}, f.body + '\n{globalThis.__ltevoExecuted = true}');
  delete globalThis.__ltevoExecuted;
  assert.ok((await validatePost('prueba', { root: f.root })).errors.some((error) => error.includes('expresión MDX')));
  assert.equal(globalThis.__ltevoExecuted, undefined);
}));

test('local images, alt and anchors are validated', async () => withFixture(async (f) => {
  f.write({}, f.body + '\n![](/blog/no-existe.webp)\n\n[Sección](#no-existe)\n\n<a href="/#otro-id">Otro</a>');
  const result = await validatePost('prueba', { root: f.root });
  for (const match of ['sin alt', 'imagen local no existe', 'anchor no encontrado']) assert.ok(result.errors.some((error) => error.includes(match)), match);
}));

test('real dates and profile are required; updates preserve publication date from Git', async () => withFixture(async (f) => {
  f.write({ date: '2026-02-30', author: 'Autor inventado', authorProfile: '/perfil-inventado' });
  let result = await validatePost('prueba', { root: f.root });
  assert.ok(result.errors.some((error) => error.includes('date debe')));
  assert.ok(result.errors.some((error) => error.includes('identidad confirmada')));
  assert.ok(result.errors.some((error) => error.includes('/perfil-inventado')));
  f.write();
  const git = (...args) => execFileSync('git', args, { cwd: f.root, stdio: 'ignore' });
  git('init'); git('add', '.'); git('-c', 'user.name=Validator fixture', '-c', 'user.email=fixture@example.invalid', 'commit', '-m', 'fixture');
  f.write({ date: '2026-06-02', updatedAt: '2026-07-01' });
  result = await validatePost('prueba', { root: f.root, update: true });
  assert.ok(result.errors.some((error) => error.includes('fecha original')));
  f.write({ updatedAt: '2026-07-01' });
  assert.deepEqual((await validatePost('prueba', { root: f.root, update: true })).errors, []);
}));
