#!/usr/bin/env node
/**
 * optimize-image.js — Re-comprime imágenes in-place con sharp.
 *
 * Se usa al publicar imágenes de blog nuevas (y cualquier otro asset):
 *
 *   node scripts/optimize-image.js <ruta...> [opciones]
 *
 * Opciones:
 *   --width N       Ancho máximo en px (nunca amplía; re-escala solo si la fuente es mayor).
 *   --height N      Alto máximo en px (junto a --width usa --fit, por defecto "inside").
 *   --quality Q     Calidad del codificador (1-100). Por defecto 80.
 *   --format F      webp (por defecto) | jpg | png | avif. Si cambia la extensión,
 *                   escribe un archivo nuevo en lugar de sobrescribir.
 *   --fit F         inside (por defecto) | cover | fill | contain.
 *   --force         Sobrescribe aunque el resultado pese igual o más.
 *
 * Ejemplos:
 *   node scripts/optimize-image.js public/blog/mi-post.webp --width 900 --quality 78
 *   node scripts/optimize-image.js "public/blog/*.webp" --width 900 --quality 78
 *   node scripts/optimize-image.js app/opengraph-image.png --width 1200 --height 630 --fit cover --format jpg --quality 85
 *
 * Seguridad: si el resultado pesa igual o más que el original, NO se sobrescribe
 * (salvo --force) y se deja el archivo tal cual.
 */

'use strict';

const fs = require('fs');
const path = require('path');

function usage(exitCode = 0) {
  console.log(`Uso: node scripts/optimize-image.js <ruta...> [--width N] [--height N] [--quality Q] [--format webp|jpg|png|avif] [--fit inside|cover|fill|contain] [--force]`);
  process.exit(exitCode);
}

function parseArgs(argv) {
  const opts = { quality: 80, format: 'webp', fit: 'inside', force: false, width: null, height: null };
  const files = [];
  for (let i = 0; i < argv.length; i++) {
    const a = argv[i];
    switch (a) {
      case '--width': opts.width = parseInt(argv[++i], 10); break;
      case '--height': opts.height = parseInt(argv[++i], 10); break;
      case '--quality': case '-q': opts.quality = parseInt(argv[++i], 10); break;
      case '--format': case '-f': opts.format = argv[++i].toLowerCase(); break;
      case '--fit': opts.fit = argv[++i]; break;
      case '--force': opts.force = true; break;
      case '--help': case '-h': usage(0); break;
      default:
        if (a.startsWith('--')) { console.error(`Opción desconocida: ${a}`); usage(1); }
        files.push(a);
    }
  }
  if (!files.length) usage(1);
  if (!opts.width && !opts.height && !opts.force) {
    // Sin dimensión objetivo solo tiene sentido re-codificar; permitido, pero avisamos.
    console.error('Aviso: sin --width/--height solo se re-codifica a la misma dimensión.');
  }
  return { opts, files };
}

/** Expande patrones simples con * o ? en la ruta (solo sobre el nombre base). */
function expandGlob(pattern) {
  if (!/[*?]/.test(pattern)) return [pattern];
  const dir = path.dirname(pattern);
  const base = path.basename(pattern);
  const re = new RegExp('^' + base.replace(/[.+^${}()|[\]\\]/g, '\\$&').replace(/\*/g, '.*').replace(/\?/g, '.') + '$', 'i');
  return fs
    .readdirSync(dir)
    .filter((f) => re.test(f))
    .map((f) => path.join(dir, f))
    .sort();
}

const FORMAT_BY_EXT = { webp: 'webp', jpg: 'jpeg', jpeg: 'jpeg', png: 'png', avif: 'avif' };

async function optimizeOne(file, opts) {
  if (!fs.existsSync(file)) {
    return { file, error: 'no existe' };
  }
  const beforeBytes = fs.statSync(file).size;
  const ext = (path.extname(file).slice(1) || '').toLowerCase();
  const fmt = FORMAT_BY_EXT[opts.format];
  if (!fmt) return { file, error: `formato no soportado: ${opts.format}` };

  const outPath =
    fmt === (FORMAT_BY_EXT[ext] || ext)
      ? file // mismo formato: in-place
      : file.replace(/\.[^.]+$/, '') + '.' + (fmt === 'jpeg' ? 'jpg' : fmt);

  let sharp;
  try {
    sharp = require('sharp');
  } catch {
    return { file, error: "sharp no está instalado (ejecuta: pnpm add -D sharp)" };
  }

  // IMPORTANTE: procesar desde un Buffer de memoria, nunca desde la ruta.
  // sharp (libvips) mantiene el descriptor del archivo de entrada abierto hasta
  // que el GC lo libera; en Windows eso impide sobrescribir/renombrar el
  // original (UNKNOWN/EPERM) dentro del mismo proceso.
  const inputBuf = fs.readFileSync(file);
  const meta = await sharp(inputBuf, { failOn: 'none' }).metadata();

  const resize = { fit: opts.fit, withoutEnlargement: true };
  if (opts.width) resize.width = opts.width;
  if (opts.height) resize.height = opts.height;
  let pipeline = sharp(inputBuf, { failOn: 'none' }).resize(resize);

  // JPEG no soporta alfa: aplana sobre blanco para evitar fondos negros.
  if (fmt === 'jpeg' && meta.hasAlpha) {
    pipeline = pipeline.flatten({ background: '#ffffff' });
  }

  const encodeOpts = { quality: opts.quality };
  if (fmt === 'webp' || fmt === 'avif') encodeOpts.effort = 6;
  if (fmt === 'png') delete encodeOpts.quality; // png es sin pérdidas; la calidad se ignora
  pipeline = pipeline.toFormat(fmt, encodeOpts);

  const buf = await pipeline.toBuffer();
  const gain = beforeBytes - buf.length;

  // Nunca re-codificar sin ganancia (salvo --force o cambio de formato/extension).
  if (outPath === file && gain <= 0 && !opts.force) {
    return {
      file,
      skipped: true,
      beforeBytes,
      afterBytes: buf.length,
      width: meta.width,
      height: meta.height,
      message: `sin ganancia (${buf.length} B >= ${beforeBytes} B), se conserva el original`,
    };
  }

  // Escritura atómica vía temporal + rename: en Windows, sobrescribir un archivo
  // existente puede fallar con UNKNOWN/EPERM (lock de antivirus/sincronización).
  const tmpPath = outPath + '.tmp-' + process.pid;
  try {
    fs.writeFileSync(tmpPath, buf);
    try {
      fs.renameSync(tmpPath, outPath);
    } catch {
      fs.rmSync(outPath, { force: true });
      fs.renameSync(tmpPath, outPath);
    }
  } finally {
    fs.rmSync(tmpPath, { force: true });
  }
  const outMeta = await sharp(buf).metadata();
  return {
    file,
    outPath,
    beforeBytes,
    afterBytes: buf.length,
    width: outMeta.width,
    height: outMeta.height,
    fromWidth: meta.width,
    fromHeight: meta.height,
  };
}

async function main() {
  const { opts, files } = parseArgs(process.argv.slice(2));
  const targets = files.flatMap(expandGlob);

  const results = [];
  for (const t of targets) {
    try {
      results.push(await optimizeOne(t, opts));
    } catch (err) {
      results.push({ file: t, error: err.message });
    }
  }

  const kb = (n) => (n / 1024).toFixed(1) + ' KB';
  let totalBefore = 0;
  let totalAfter = 0;
  console.log('');
  for (const r of results) {
    if (r.error) {
      console.log(`ERROR  ${r.file}: ${r.error}`);
      continue;
    }
    totalBefore += r.skipped ? 0 : r.beforeBytes;
    totalAfter += r.skipped ? 0 : r.afterBytes;
    const dims = r.width ? ` ${r.fromWidth || r.width}x${r.fromHeight || r.height} -> ${r.width}x${r.height}` : '';
    if (r.skipped) {
      console.log(`SKIP   ${r.file}${dims}  (${r.message})`);
    } else if (r.outPath !== r.file) {
      console.log(`NEW    ${r.outPath}${dims}  ${kb(r.beforeBytes)} -> ${kb(r.afterBytes)} (original conservado)`);
    } else {
      console.log(`OK     ${r.file}${dims}  ${kb(r.beforeBytes)} -> ${kb(r.afterBytes)}  (-${((gain100(r) || 0)).toFixed(1)}%)`);
    }
  }
  console.log(`\nTotal reescrito: ${kb(totalBefore)} -> ${kb(totalAfter)}\n`);

  function gain100(r) {
    return r.beforeBytes ? ((r.beforeBytes - r.afterBytes) / r.beforeBytes) * 100 : 0;
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
