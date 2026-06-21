const fs = require('fs');
const path = require('path');
const readline = require('readline');

const txtPath = path.join(process.cwd(), 'Blog-web.txt');
const contentDir = path.join(process.cwd(), 'content/blog');

// Helper to sanitize slug and get filename
function getFilenameFromSlug(slug) {
  const clean = slug.replace(/^\/blog\//, '').trim();
  return `${clean}.mdx`;
}

// Helper to parse MD structure
function parseBlogTxt() {
  if (!fs.existsSync(txtPath)) {
    console.error(`Error: No se encontró el archivo Blog-web.txt en ${txtPath}`);
    process.exit(1);
  }

  const raw = fs.readFileSync(txtPath, 'utf8');
  const lines = raw.split(/\r?\n/);
  const posts = [];

  for (const line of lines) {
    if (!line.trim() || !line.includes('|')) continue;
    const parts = line.split('|').map(p => p.trim());
    if (parts.length < 9) continue;
    
    const semana = parts[1];
    if (!semana || semana.startsWith('---') || semana === 'Semana') continue;

    const title = parts[2];
    const keyword = parts[3];
    const volumen = parts[4];
    const kd = parseInt(parts[5], 10) || 0;
    const competidor = parts[6];
    const structureRaw = parts[7];
    const slug = parts[8];

    // Split structure on '·' or ',' or ';'
    const h2s = structureRaw
      ? structureRaw.split(/·|•|,/).map(h => h.trim()).filter(Boolean)
      : [];

    posts.push({
      semana,
      title,
      keyword,
      volumen,
      kd,
      competidor,
      h2s,
      slug,
      filename: getFilenameFromSlug(slug)
    });
  }

  return posts;
}

function createPostFile(post) {
  if (!fs.existsSync(contentDir)) {
    fs.mkdirSync(contentDir, { recursive: true });
  }

  const targetPath = path.join(contentDir, post.filename);
  if (fs.existsSync(targetPath)) {
    console.log(`\n⚠️  El archivo ya existe: ${targetPath}`);
    return;
  }

  const today = new Date().toISOString().split('T')[0];
  
  // Choose tags based on keywords or categories
  let tags = ['SEO', 'Marketing'];
  if (post.title.toLowerCase().includes('diseño') || post.title.toLowerCase().includes('ux') || post.title.toLowerCase().includes('ui')) {
    tags = ['Diseño Web', 'UX/UI', 'Desarrollo'];
  } else if (post.title.toLowerCase().includes('seo') || post.title.toLowerCase().includes('google') || post.title.toLowerCase().includes('search')) {
    tags = ['SEO', 'Google', 'Tráfico Web'];
  } else if (post.title.toLowerCase().includes('tienda') || post.title.toLowerCase().includes('ecommerce') || post.title.toLowerCase().includes('tpv') || post.title.toLowerCase().includes('prestashop')) {
    tags = ['E-commerce', 'Negocio Online'];
  }

  // Cover image suggestion
  const imageSlug = post.filename.replace('.mdx', '');
  const coverImage = `/images/blog/${imageSlug}.jpg`;

  // Excerpt suggestion
  const excerpt = `Aprende todo sobre ${post.keyword} en este artículo detallado de la ${post.semana} de nuestra guía de optimización web.`;

  const mdxContent = `---
title: "${post.title.replace(/"/g, '\\"')}"
date: "${today}"
author: "Equipo LTEvo"
semana: "${post.semana}"
keyword: "${post.keyword}"
volumen: "${post.volumen}"
kd: ${post.kd}
competidor: "${post.competidor}"
coverImage: "${coverImage}"
excerpt: "${excerpt}"
tags: ${JSON.stringify(tags)}
---

En esta entrega de la **${post.semana}**, abordamos en profundidad la palabra clave **${post.keyword}** con un volumen mensual estimado de **${post.volumen}** y una dificultad de **${post.kd} (KD)**. 

Entender este concepto es clave para superar a competidores como **${post.competidor}** y posicionar tu negocio en lo más alto de los resultados de búsqueda.

## Introducción

Escribe una introducción atractiva que capte la atención del lector y explique por qué este tema es crucial para su negocio o proyecto web.

${post.h2s.map(h2 => `## ${h2}\n\nEscribe el contenido para esta sección aquí...`).join('\n\n')}

## Conclusión y Próximos Pasos

Resume las ideas clave del artículo y ofrece una llamada a la acción clara para el lector.

¿Necesitas ayuda para aplicar esto en tu web? Contacta con el equipo de **LTEvo** y te asesoramos sin compromiso.
`;

  fs.writeFileSync(targetPath, mdxContent, 'utf8');
  console.log(`\n✨ ¡Artículo creado con éxito en: content/blog/${post.filename}!`);
}

function run() {
  const posts = parseBlogTxt();
  const args = process.argv.slice(2);

  // If a week is specified via arguments (e.g. node create-post.js 1)
  if (args.length > 0) {
    const search = args[0].toLowerCase();
    const match = posts.find(p => 
      p.semana.toLowerCase().includes(search) || 
      p.slug.toLowerCase().includes(search)
    );

    if (match) {
      createPostFile(match);
      process.exit(0);
    } else {
      console.log(`No se encontró ningún artículo para: "${args[0]}"`);
    }
  }

  // Interactive CLI list
  console.log('\n--- Artículos Pendientes en Blog-web.txt ---');
  posts.forEach((p, idx) => {
    const status = fs.existsSync(path.join(contentDir, p.filename)) ? '✅ [Creado]' : '📄 [Pendiente]';
    console.log(`${idx + 1}. ${p.semana}: ${p.title} ${status}`);
  });

  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });

  rl.question('\nSelecciona el número del artículo que deseas crear (o q para salir): ', (answer) => {
    const cleanAnswer = answer.trim().toLowerCase();
    if (cleanAnswer === 'q' || cleanAnswer === 'exit') {
      rl.close();
      process.exit(0);
    }

    const num = parseInt(cleanAnswer, 10);
    if (!isNaN(num) && num >= 1 && num <= posts.length) {
      const selected = posts[num - 1];
      createPostFile(selected);
    } else {
      console.log('Selección inválida.');
    }
    rl.close();
  });
}

run();
