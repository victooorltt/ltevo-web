import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { cache } from 'react';

export interface BlogPost {
  slug: string;
  title: string;
  seoTitle?: string;
  date: string;
  author: string;
  excerpt: string;
  content: string;
  readingTime: string;
  semana: string;
  keyword: string;
  volumen: string;
  kd: number;
  competidor?: string;
  coverImage?: string;
  tags?: string[];
}

const postsDirectory = path.join(process.cwd(), 'content/blog');

/**
 * true si el post tiene una portada real. El fallback por defecto
 * (/images/blog/default.jpg) no existe: en ese caso la UI muestra el
 * patrón decorativo de fondo en lugar de una imagen rota.
 * Type guard: estrecha coverImage a string para usarla en <Image src>.
 */
export function hasRealCover(
  post: Pick<BlogPost, 'coverImage'>
): post is BlogPost & { coverImage: string } {
  return Boolean(post.coverImage) && post.coverImage !== '/images/blog/default.jpg';
}

function calculateReadingTime(content: string): string {
  const wordsPerMinute = 200;
  const cleanContent = content.replace(/[#*`[\]()\-]/g, ''); // strip markdown syntax roughly
  const numberOfWords = cleanContent.trim().split(/\s+/g).filter(Boolean).length;
  const minutes = Math.max(1, Math.ceil(numberOfWords / wordsPerMinute));
  return `${minutes} min read`;
}

/**
 * Formatea una fecha ISO "YYYY-MM-DD" a formato largo español.
 * Compartida por las páginas de blog y el sitemap.
 */
export function formatDate(dateStr: string): string {
  if (!dateStr) return "";
  const parts = dateStr.split("-");
  if (parts.length !== 3) return dateStr;
  const year = parseInt(parts[0], 10);
  const month = parseInt(parts[1], 10) - 1; // Month is 0-indexed in JS Date
  const day = parseInt(parts[2], 10);
  const date = new Date(year, month, day);
  return date.toLocaleDateString("es-ES", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

/**
 * Lectura cacheada de todos los posts (React.cache: una sola lectura del
 * filesystem por request/build aunque se llame varias veces).
 */
export const getAllPosts = cache(function getAllPosts(): BlogPost[] {
  if (!fs.existsSync(postsDirectory)) {
    return [];
  }

  const fileNames = fs.readdirSync(postsDirectory);
  const allPostsData = fileNames
    .filter((fileName) => fileName.endsWith('.mdx') || fileName.endsWith('.md'))
    .map((fileName) => {
      const slug = fileName.replace(/\.mdx?$/, '');
      const fullPath = path.join(postsDirectory, fileName);
      const fileContents = fs.readFileSync(fullPath, 'utf8');

      // Use gray-matter to parse the post metadata section
      const matterResult = matter(fileContents);
      const data = matterResult.data;

      // Extract excerpt from content if not explicitly provided
      const excerpt = data.excerpt ||
        matterResult.content
          .replace(/[#*`[\]()\-]/g, '') // strip markdown
          .trim()
          .slice(0, 160) + '...';

      return {
        slug,
        title: data.title || 'Untitled Post',
        seoTitle: data.seoTitle || undefined,
        date: data.date || new Date().toISOString().split('T')[0],
        author: data.author || 'Equipo LTEvo',
        excerpt,
        content: matterResult.content,
        readingTime: calculateReadingTime(matterResult.content),
        semana: data.semana || '',
        keyword: data.keyword || '',
        volumen: data.volumen || '',
        kd: Number(data.kd) || 0,
        competidor: data.competidor || '',
        coverImage: data.coverImage || '/images/blog/default.jpg',
        tags: data.tags || ['Estrategia'],
      } as BlogPost;
    });

  // Sort posts by date descending
  return allPostsData.sort((a, b) => (a.date < b.date ? 1 : -1));
});

export const getPostBySlug = cache(function getPostBySlug(slug: string): BlogPost | null {
  try {
    const mdxPath = path.join(postsDirectory, `${slug}.mdx`);
    const mdPath = path.join(postsDirectory, `${slug}.md`);
    let fullPath = '';

    if (fs.existsSync(mdxPath)) {
      fullPath = mdxPath;
    } else if (fs.existsSync(mdPath)) {
      fullPath = mdPath;
    } else {
      return null;
    }

    const fileContents = fs.readFileSync(fullPath, 'utf8');
    const matterResult = matter(fileContents);
    const data = matterResult.data;

    const excerpt = data.excerpt || 
      matterResult.content
        .replace(/[#*`[\]()\-]/g, '') // strip markdown
        .trim()
        .slice(0, 160) + '...';

    return {
      slug,
      title: data.title || 'Untitled Post',
      seoTitle: data.seoTitle || undefined,
      date: data.date || new Date().toISOString().split('T')[0],
      author: data.author || 'Equipo LTEvo',
      excerpt,
      content: matterResult.content,
      readingTime: calculateReadingTime(matterResult.content),
      semana: data.semana || '',
      keyword: data.keyword || '',
      volumen: data.volumen || '',
      kd: Number(data.kd) || 0,
      competidor: data.competidor || '',
      coverImage: data.coverImage || '/images/blog/default.jpg',
      tags: data.tags || ['Estrategia'],
    } as BlogPost;
  } catch {
    return null;
  }
});
