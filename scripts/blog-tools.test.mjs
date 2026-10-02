import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { spawnSync } from 'node:child_process';
import matter from 'gray-matter';
import sharp from 'sharp';

const scripts = path.dirname(fileURLToPath(import.meta.url));
const run = (name, args, cwd) => spawnSync(process.execPath, [path.join(scripts, name), ...args], { cwd, encoding: 'utf8' });
async function temporary(fn) {
  const root = fs.mkdtempSync(path.join(os.tmpdir(), 'ltevo-blog-tools-'));
  try { await fn(root); } finally { fs.rmSync(root, { recursive: true, force: true }); }
}

test('new post is an unpublished draft, without editorial metrics, and cannot overwrite a post', async () => temporary(async (root) => {
  fs.writeFileSync(path.join(root, 'Blog-web.txt'), '| Semana 19 | Cómo elegir una agencia | elegir agencia | 99999/mes | 52 | rival.invalid | Alcance · Presupuesto | /blog/elegir-agencia | |\n');
  const result = run('create-post.js', ['19'], root);
  assert.equal(result.status, 0, result.stderr);
  const post = matter(fs.readFileSync(path.join(root, 'content/blog/elegir-agencia.mdx'), 'utf8'));
  assert.equal(post.data.draft, true);
  assert.equal(post.data.author, 'Víctor Lasheras');
  assert.equal(post.data.coverImage, '/blog/elegir-agencia.webp');
  assert.ok(post.content.includes('BORRADOR EDITORIAL'));
  assert.ok(!post.content.includes('99999') && !post.content.includes('rival.invalid'));
  assert.equal(run('create-post.js', ['19'], root).status, 1);
}));

test('image force does not silently enlarge; enlargement requires explicit option', async () => temporary(async (root) => {
  const small = path.join(root, 'small.png');
  await sharp({ create: { width: 100, height: 50, channels: 3, background: '#333333' } }).png().toFile(small);
  let result = run('optimize-image.js', [small, '--width', '1200', '--height', '630', '--fit', 'cover', '--format', 'webp', '--force'], root);
  assert.equal(result.status, 0, result.stderr);
  let dimensions = await sharp(fs.readFileSync(path.join(root, 'small.webp'))).metadata();
  assert.ok(dimensions.width <= 100 && dimensions.height <= 50);
  result = run('optimize-image.js', [small, '--width', '1200', '--height', '630', '--fit', 'cover', '--format', 'webp', '--force', '--allow-enlargement'], root);
  assert.equal(result.status, 0, result.stderr);
  dimensions = await sharp(fs.readFileSync(path.join(root, 'small.webp'))).metadata();
  assert.equal(dimensions.width, 1200, result.stdout);
  assert.equal(dimensions.height, 630, result.stdout);
}));

test('invalid image input and malformed options return nonzero', async () => temporary(async (root) => {
  assert.equal(run('optimize-image.js', [path.join(root, 'missing.webp'), '--force'], root).status, 1);
  assert.equal(run('optimize-image.js', [path.join(root, '*.webp'), '--force'], root).status, 1);
  assert.equal(run('optimize-image.js', [path.join(root, 'missing.webp'), '--width', '1200px'], root).status, 1);
}));
