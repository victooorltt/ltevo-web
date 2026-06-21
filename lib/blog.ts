import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

export interface BlogPost {
  slug: string;
  title: string;
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

function calculateReadingTime(content: string): string {
  const wordsPerMinute = 200;
  const cleanContent = content.replace(/[#*`[\]()\-]/g, ''); // strip markdown syntax roughly
  const numberOfWords = cleanContent.trim().split(/\s+/g).filter(Boolean).length;
  const minutes = Math.max(1, Math.ceil(numberOfWords / wordsPerMinute));
  return `${minutes} min read`;
}

export function getAllPosts(): BlogPost[] {
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
}

export function getPostBySlug(slug: string): BlogPost | null {
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
  } catch (error) {
    return null;
  }
}
