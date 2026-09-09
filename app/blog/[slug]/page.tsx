import { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { Navigation } from "@/components/landing/navigation";
import { FooterSection } from "@/components/landing/footer-section";
import { ReadingProgressBar } from "@/components/blog/reading-progress";
import { getPostBySlug, getAllPosts, hasRealCover, formatDate } from "@/lib/blog";
import { MDXRemote } from "next-mdx-remote/rsc";
import remarkGfm from "remark-gfm";
import { blogMdxComponents } from "@/components/blog/mdx-components";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const posts = getAllPosts();
  return posts.map((post) => ({
    slug: post.slug,
  }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const resolvedParams = await params;
  const post = getPostBySlug(resolvedParams.slug);
  
  if (!post) {
    return {
      title: "Artículo no encontrado",
    };
  }

  return {
    // seoTitle (si existe) acorta el <title> SEO; el H1 visible sigue usando post.title.
    title: post.seoTitle ?? post.title,
    description: post.excerpt,
    alternates: {
      canonical: `/blog/${post.slug}`,
    },
    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: "article",
      url: `/blog/${post.slug}`,
      publishedTime: post.date,
      modifiedTime: post.date,
      authors: [post.author],
      tags: post.tags,
      // Solo declaramos images si el post tiene portada real; el fallback
      // /images/blog/default.jpg no existe y heredaría el OG global del raíz.
      ...(hasRealCover(post)
        ? {
            images: [
              {
                url: post.coverImage,
                width: 1200,
                height: 630,
                alt: post.title,
              },
            ],
          }
        : {}),
    },
  };
}

export default async function BlogDetailPage({ params }: PageProps) {
  const resolvedParams = await params;
  const post = getPostBySlug(resolvedParams.slug);

  if (!post) {
    notFound();
  }

  // Related posts: scoring por intersección de tags (case-insensitive),
  // desempate por fecha más reciente. Top 2.
  const allPosts = getAllPosts();
  const relatedPosts = allPosts
    .filter((p) => p.slug !== post.slug)
    .map((p) => ({
      post: p,
      score: (p.tags ?? []).filter((t) =>
        post.tags?.some((tt) => tt.toLowerCase() === t.toLowerCase())
      ).length,
    }))
    .sort((a, b) => b.score - a.score || (a.post.date < b.post.date ? 1 : -1))
    .slice(0, 2)
    .map((r) => r.post);

  // JSON-LD: BlogPosting + BreadcrumbList (mismo patrón que las páginas de servicio)
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "BlogPosting",
        "@id": `https://ltevo.com/blog/${post.slug}#article`,
        headline: post.title,
        description: post.excerpt,
        ...(hasRealCover(post) ? { image: `https://ltevo.com${post.coverImage}` } : {}),
        datePublished: post.date,
        dateModified: post.date,
        author: {
          "@type": "Organization",
          name: post.author,
          url: "https://ltevo.com"
        },
        publisher: {
          "@type": "Organization",
          name: "LTEvo",
          logo: {
            "@type": "ImageObject",
            url: "https://ltevo.com/icon.png"
          }
        },
        mainEntityOfPage: {
          "@type": "WebPage",
          "@id": `https://ltevo.com/blog/${post.slug}`
        },
        keywords: post.tags?.join(", "),
        inLanguage: "es"
      },
      {
        "@type": "BreadcrumbList",
        "@id": `https://ltevo.com/blog/${post.slug}#breadcrumb`,
        itemListElement: [
          {
            "@type": "ListItem",
            position: 1,
            name: "Inicio",
            item: "https://ltevo.com"
          },
          {
            "@type": "ListItem",
            position: 2,
            name: "Blog",
            item: "https://ltevo.com/blog"
          },
          {
            "@type": "ListItem",
            position: 3,
            name: post.title,
            item: `https://ltevo.com/blog/${post.slug}`
          }
        ]
      }
    ]
  };

  return (
    <div className="relative min-h-[100dvh] bg-background text-foreground flex flex-col font-sans selection:bg-foreground selection:text-background">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <ReadingProgressBar />
      <Navigation />

      {/* Article Header (Medium-Style) */}
      <header className="pt-32 pb-12 lg:pt-40 lg:pb-16 border-b border-foreground/5 text-center">
        <div className="max-w-3xl mx-auto px-6">
          <div className="flex flex-wrap justify-center items-center gap-3 font-mono text-xs text-muted-foreground mb-6">
            <span className="bg-foreground/5 px-2.5 py-1 rounded-full text-foreground font-semibold">
              {formatDate(post.date)}
            </span>
            <span>•</span>
            <span>{post.readingTime}</span>
            <span>•</span>
            <span>
              Por <span className="text-foreground font-medium">{post.author}</span>
            </span>
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-display tracking-tight text-foreground leading-[1.05] mb-8 max-w-2xl mx-auto">
            {post.title}
          </h1>
        </div>
      </header>

      {/* Cover Image (Full Width on screen, contained within post template limits) */}
      <section className="w-full max-w-[1000px] mx-auto px-6 py-8">
        <div className="aspect-[21/9] rounded-sm border border-foreground/10 overflow-hidden bg-neutral-100 relative">
          <div className="absolute inset-0 bg-gradient-to-tr from-stone-200 to-stone-50 flex items-center justify-center p-8 select-none text-center">
            <span className="font-display text-4xl lg:text-6xl text-foreground/[0.03] font-bold block select-none">
              {formatDate(post.date)}
            </span>
          </div>
          {/* Portada del artículo: visible sobre el fold al cargar → priority */}
          {hasRealCover(post) && (
            <Image
              src={post.coverImage}
              alt={post.title}
              fill
              priority
              sizes="(min-width: 1048px) 1000px, calc(100vw - 48px)"
              className="object-cover object-center opacity-90"
            />
          )}
        </div>
      </section>

      {/* Main Content Area */}
      <main className="flex-grow pb-24 px-6">
        <article className="prose prose-neutral max-w-2xl mx-auto prose-headings:font-sans prose-headings:font-bold prose-headings:tracking-tight prose-h2:text-2xl lg:text-[18px] prose-h3:text-xl lg:text-2xl prose-a:text-foreground prose-a:underline hover:prose-a:opacity-80 transition-all font-sans font-light text-base sm:text-lg leading-relaxed">
          <MDXRemote
            source={post.content}
            components={blogMdxComponents}
            options={{
              mdxOptions: {
                remarkPlugins: [remarkGfm],
              },
            }}
          />
        </article>
      </main>

      {/* Related Posts Section */}
      {relatedPosts.length > 0 && (
        <section className="bg-stone-50 py-16 border-t border-b border-foreground/5">
          <div className="max-w-4xl mx-auto px-6">
            <h3 className="font-mono text-xs uppercase tracking-widest text-muted-foreground mb-8 text-center border-b border-foreground/5 pb-4">
              Artículos Relacionados
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
              {relatedPosts.map((rPost) => (
                <article key={rPost.slug} className="group flex flex-col h-full">
                  <div className="aspect-[16/10] overflow-hidden rounded-sm border border-foreground/10 bg-neutral-100 relative mb-4">
                    <div className="absolute inset-0 bg-gradient-to-br from-stone-100 to-stone-50" />
                    {hasRealCover(rPost) && (
                      <Image
                        src={rPost.coverImage}
                        alt={rPost.title}
                        fill
                        sizes="(min-width: 768px) 400px, calc(100vw - 48px)"
                        className="object-cover object-center opacity-85 transition-transform duration-700 group-hover:scale-105"
                      />
                    )}
                  </div>
                  <div className="flex flex-wrap items-center gap-2 font-mono text-[10px] text-muted-foreground mb-2">
                    <span className="bg-foreground/5 px-2 py-0.5 rounded-full text-foreground">
                      {formatDate(rPost.date)}
                    </span>
                    <span>•</span>
                    <span>{rPost.readingTime}</span>
                  </div>
                  <Link href={`/blog/${rPost.slug}`}>
                    <h4 className="text-xl font-display text-foreground leading-[1.2] hover:underline decoration-foreground/30 underline-offset-4 decoration-1 transition-all duration-300">
                      {rPost.title}
                    </h4>
                  </Link>
                </article>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Clean CTA / Contact Section */}
      <section className="py-20 text-center bg-background border-t border-foreground/5">
        <div className="max-w-2xl mx-auto px-6">
          <span className="font-mono text-xs uppercase tracking-widest text-muted-foreground block mb-4">
            ¿Hablamos de tu proyecto?
          </span>
          <h2 className="text-4xl lg:text-5xl font-display tracking-tight text-foreground mb-6 leading-none">
            Lleva tu presencia web al siguiente nivel
          </h2>
          <p className="text-muted-foreground leading-relaxed font-light mb-8 max-w-lg mx-auto">
            Ayudamos a empresas a diseñar y desarrollar sitios web rápidos, elegantes y optimizados para Google que generan clientes reales.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              href="/contacto" 
              className="px-6 py-3 rounded-full bg-foreground text-background text-sm font-semibold hover:bg-foreground/90 transition-all font-sans"
            >
              Solicitar Presupuesto Gratis
            </Link>
            <Link 
              href="/servicios/diseno-web" 
              className="px-6 py-3 rounded-full border border-foreground/10 text-sm font-semibold hover:bg-foreground/5 transition-all font-sans"
            >
              Ver Servicios
            </Link>
          </div>
        </div>
      </section>

      <FooterSection />
    </div>
  );
}
