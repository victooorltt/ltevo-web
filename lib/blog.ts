import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { cache } from "react";
import { business } from "./business";

export interface BlogPost {
  slug: string; title: string; seoTitle?: string; date: string; updatedAt?: string;
  author: string; authorRole?: string; authorProfile?: string;
  excerpt: string; content: string; readingTime: string;
  semana: string; keyword: string; volumen: string; kd: number; competidor?: string;
  coverImage?: string; socialImage?: string; tags?: string[]; relatedSlugs?: string[]; ctaService?: string;
}
const postsDirectory = path.join(process.cwd(), "content/blog");
export function hasRealCover(post: Pick<BlogPost, "coverImage">): post is BlogPost & { coverImage: string } {
  return Boolean(post.coverImage?.startsWith("/") && fs.existsSync(path.join(process.cwd(), "public", post.coverImage)));
}
export function formatDate(dateStr: string): string {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(dateStr)) return dateStr;
  return new Date(`${dateStr}T12:00:00Z`).toLocaleDateString("es-ES", { day: "numeric", month: "long", year: "numeric", timeZone: "Europe/Madrid" });
}
function readPost(fileName: string): BlogPost | null {
  const slug = fileName.replace(/\.mdx?$/, "");
  const { data, content } = matter(fs.readFileSync(path.join(postsDirectory, fileName), "utf8"));
  const today = new Intl.DateTimeFormat("sv-SE", { timeZone: "Europe/Madrid" }).format(new Date());
  if (data.draft === true || !/^\d{4}-\d{2}-\d{2}$/.test(data.date ?? "") || data.date > today || !data.title) return null;
  const words = content.replace(/<[^>]*>|[#*`\[\]()]/g, " ").trim().split(/\s+/).filter(Boolean).length;
  return {
    slug, title: String(data.title), seoTitle: data.seoTitle, date: data.date, updatedAt: data.updatedAt,
    author: data.author || business.author, authorRole: data.authorRole, authorProfile: data.authorProfile || business.authorProfile,
    excerpt: data.excerpt || content.replace(/<[^>]*>|[#*`\[\]()]/g, " ").trim().slice(0, 155),
    content, readingTime: `${Math.max(1, Math.ceil(words / 200))} min de lectura`,
    semana: data.semana || "", keyword: data.keyword || "", volumen: data.volumen || "", kd: Number(data.kd) || 0,
    competidor: data.competidor, coverImage: data.coverImage, socialImage: data.socialImage, tags: data.tags || [],
    relatedSlugs: data.relatedSlugs || [], ctaService: data.ctaService,
  };
}
export const getAllPosts = cache(function getAllPosts(): BlogPost[] {
  if (!fs.existsSync(postsDirectory)) return [];
  return fs.readdirSync(postsDirectory).filter((name) => /\.mdx?$/.test(name)).map(readPost)
    .filter((post): post is BlogPost => post !== null)
    .sort((a, b) => b.date.localeCompare(a.date) || a.slug.localeCompare(b.slug));
});
export const getPostBySlug = cache(function getPostBySlug(slug: string): BlogPost | null {
  if (!/^[a-z0-9-]+$/.test(slug)) return null;
  const fileName = [`${slug}.mdx`, `${slug}.md`].find((name) => fs.existsSync(path.join(postsDirectory, name)));
  return fileName ? readPost(fileName) : null;
});
