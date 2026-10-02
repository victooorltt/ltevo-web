#!/usr/bin/env node
import fs from 'node:fs';
import path from 'node:path';

const input = process.argv[2];
const baseline = process.argv[3] || 'docs/seo/baseline-2026-10-02.json';
if (!input) {
  console.error('Uso: pnpm seo:compare <snapshot-nuevo.json> [snapshot-anterior.json]');
  process.exit(2);
}
const read = (file) => JSON.parse(fs.readFileSync(path.resolve(file), 'utf8'));
const current = read(input), previous = read(baseline);
if (current.siteUrl !== 'sc-domain:ltevo.com' || previous.siteUrl !== current.siteUrl) throw new Error('Propiedad incorrecta: se requiere sc-domain:ltevo.com.');
const summary = (snapshot) => snapshot.summary14;
for (const snapshot of [current, previous]) {
  if (summary(snapshot)?.range?.days !== 14 || !summary(snapshot)?.current) throw new Error('Cada snapshot necesita summary14 con 14 días completos.');
  for (const key of ['queries14', 'pairs14', 'pages14']) {
    if (!Array.isArray(snapshot[key]?.rows)) throw new Error(`Falta ${key}.rows.`);
    if (snapshot[key].startDate !== summary(snapshot).range.startDate || snapshot[key].endDate !== summary(snapshot).range.endDate) throw new Error(`${key} no coincide con el periodo de summary14.`);
    if (snapshot[key].pagination?.hasMore) throw new Error(`${key} está truncado: descarga todas las filas antes de comparar.`);
  }
}
const ratio = (metrics) => metrics.impressions ? metrics.clicks / metrics.impressions : 0;
const display = (value, decimals = 2) => Number(value).toLocaleString('es-ES', { maximumFractionDigits: decimals });
const pct = (value) => `${display(value * 100)} %`;
const periods = [summary(previous), summary(current)];
console.log(`# Revisión SEO LTEvo · ${current.capturedAt}\n`);
console.log(`Periodos completos: ${periods[0].range.startDate}–${periods[0].range.endDate} y ${periods[1].range.startDate}–${periods[1].range.endDate}.\n`);
console.log('| Métrica de propiedad | Anterior | Actual |\n|---|---:|---:|');
for (const [label, fn] of [['Clics', (x) => display(x.clicks)], ['Impresiones', (x) => display(x.impressions)], ['CTR', (x) => pct(ratio(x))], ['Posición media', (x) => display(x.avgPosition)]]) console.log(`| ${label} | ${fn(periods[0].current)} | ${fn(periods[1].current)} |`);
const commercial = /(?:diseñ(?:o|ador)|desarrollo|programaci[oó]n|mantenimiento|hosting|alojamiento|agencia seo|consultor seo|presupuesto seo|posicionamiento (?:web|seo)|seo (?:local |t[eé]cnico )?(?:oviedo|asturias|gij[oó]n|avil[eé]s))/i;
const branded = /(?:^|\s)(?:ltevo|lt evo)(?:$|\s)/i;
const selected = (snapshot) => snapshot.queries14.rows.filter((row) => commercial.test(row.keys[0]) && !branded.test(row.keys[0]));
const cohorts = [selected(previous), selected(current)];
console.log('\nLas siguientes métricas usan consultas comerciales visibles; no incluyen consultas anónimas ni equivalen a clientes.\n');
console.log('| Cohorte comercial | Anterior | Actual |\n|---|---:|---:|');
for (const [label, fn] of [['Clics', (rows) => rows.reduce((sum, row) => sum + row.clicks, 0)], ['Consultas con posición ≤10 y ≥5 impresiones', (rows) => rows.filter((r) => r.position <= 10 && r.impressions >= 5).length], ['Consultas con posición ≤3 y ≥5 impresiones', (rows) => rows.filter((r) => r.position <= 3 && r.impressions >= 5).length]]) console.log(`| ${label} | ${fn(cohorts[0])} | ${fn(cohorts[1])} |`);
console.log('\n| Consulta | Impresiones actuales | Posición anterior → actual | Clics actuales | URLs actuales |\n|---|---:|---:|---:|---|');
const prior = new Map(cohorts[0].map((row) => [row.keys[0], row]));
for (const row of cohorts[1].toSorted((a,b) => b.impressions-a.impressions).slice(0, 30)) {
  const old = prior.get(row.keys[0]);
  const urls = current.pairs14.rows.filter((pair) => pair.keys[0] === row.keys[0]).map((pair) => `${new URL(pair.keys[1]).pathname} (${display(pair.position)})`).join(', ');
  console.log(`| ${row.keys[0].replaceAll('|', '\\|')} | ${row.impressions} | ${old ? display(old.position) : 'sin datos'} → ${display(row.position)} | ${row.clicks} | ${urls.replaceAll('|', '\\|')} |`);
}
console.log('\nDecisión de revisión: valorar consultas/URLs comparables, contactos cualificados y fecha real de publicación. Una posición media mezcla días, dispositivos y ubicaciones. Con pocos clics, clasificar los cambios como señales, no como resultados concluyentes. Registrar por separado leads y clientes reales; sin GA4 no estimarlos a partir de clics.');
