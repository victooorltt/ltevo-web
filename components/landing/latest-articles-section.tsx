import Link from "next/link";
import Image from "next/image";
import { getAllPosts, hasRealCover, formatDate } from "@/lib/blog";

/* Sección "Últimos artículos" de la home. Server component (sin "use client"):
   el reveal es CSS scroll-driven y las imágenes van lazy por defecto.
   Sigue el patrón visual del grid de app/blog/page.tsx para que ambas
   superficies se lean como la misma familia. */
export function LatestArticlesSection() {
  const posts = getAllPosts().slice(0, 3);

  if (posts.length === 0) return null;

  return (
    <section className="py-24 lg:py-32 border-t border-foreground/10">
      <div className="max-w-[1200px] mx-auto px-6 lg:px-12">
        <div className="reveal flex items-end justify-between gap-6 mb-12 lg:mb-16">
          <div>
            <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full text-xs font-medium text-foreground/75 bg-foreground/[0.04] border border-foreground/[0.08] tracking-wide mb-3">
              Blog
            </span>
            <h2 className="text-4xl lg:text-5xl font-display tracking-tight leading-none">
              Últimos artículos
            </h2>
          </div>
          <Link
            href="/blog"
            className="group/btn hidden sm:inline-flex items-center gap-1.5 text-sm font-semibold tracking-wide hover:gap-2.5 transition-all duration-300 shrink-0"
          >
            Ver todos los artículos
            <span className="transition-transform duration-300 group-hover/btn:translate-x-0.5">→</span>
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-10">
          {posts.map((post, index) => (
            <article
              key={post.slug}
              className="reveal group flex flex-col h-full border-b border-foreground/5 pb-8 md:border-b-0 md:pb-0"
              style={{ animationDelay: `${index * 0.08}s` }}
            >
              <Link
                href={`/blog/${post.slug}`}
                className="block overflow-hidden rounded-2xl border border-foreground/[0.08] aspect-[16/10] bg-neutral-100 relative mb-6"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-stone-100 to-stone-50 flex items-center justify-center p-6 select-none">
                  <span className="font-display text-2xl lg:text-3xl text-foreground/[0.03] font-bold block mb-2 select-none text-center">
                    {formatDate(post.date) || "Blog"}
                  </span>
                </div>
                {hasRealCover(post) && (
                  <Image
                    src={post.coverImage}
                    alt={post.title}
                    fill
                    sizes="(min-width: 1024px) 370px, (min-width: 768px) 50vw, calc(100vw - 48px)"
                    className="object-cover object-center opacity-85 transition-transform duration-700 group-hover:scale-105"
                  />
                )}
                <div className="absolute inset-0 bg-black/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              </Link>

              <div className="flex flex-wrap items-center gap-2 font-sans text-xs font-medium text-muted-foreground mb-3">
                <span className="bg-foreground/5 px-2 py-0.5 rounded-full text-foreground">
                  {formatDate(post.date)}
                </span>
                <span>•</span>
                <span>{post.readingTime}</span>
              </div>

              <Link href={`/blog/${post.slug}`} className="mb-3 block">
                <h3 className="text-xl font-display text-foreground leading-[1.2] hover:underline decoration-foreground/30 underline-offset-4 decoration-1 transition-all duration-300">
                  {post.title}
                </h3>
              </Link>

              <p className="text-sm text-muted-foreground leading-relaxed font-light mb-6 flex-grow">
                {post.excerpt}
              </p>

              <div className="flex items-center justify-end pt-4 border-t border-foreground/5 mt-auto">
                <Link
                  href={`/blog/${post.slug}`}
                  className="group/link inline-flex items-center gap-1 text-xs font-semibold tracking-wide"
                >
                  Leer artículo
                  <span className="transition-transform duration-300 group-hover/link:translate-x-0.5">→</span>
                </Link>
              </div>
            </article>
          ))}
        </div>

        <div className="reveal mt-10 sm:hidden text-center">
          <Link
            href="/blog"
            className="inline-flex items-center gap-1.5 text-sm font-semibold tracking-wide"
          >
            Ver todos los artículos
            <span>→</span>
          </Link>
        </div>
      </div>
    </section>
  );
}
