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
import { jsonLdString, SITE_URL } from "@/lib/seo";
import { contactHref } from "@/lib/services";
import { business } from "@/lib/business";
import { imageDimensions } from "@/lib/images";
import { CTA_SERVICE_CONFIG, type CtaServiceKey, blogMdxComponents } from "@/components/blog/mdx-components";

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

  const socialSize = imageDimensions(post.socialImage ?? post.coverImage);
  const authorUrl = new URL(post.authorProfile ?? business.authorProfile, SITE_URL).toString();
  return {
    // seoTitle (si existe) acorta el <title> SEO; el H1 visible sigue usando post.title.
    title: post.seoTitle ?? post.title,
    description: post.excerpt,
    alternates: {
      canonical: `/blog/${post.slug}`,
    },
    authors: [{ name: post.author, url: authorUrl }],
    twitter: { card: "summary_large_image", title: post.seoTitle ?? post.title, description: post.excerpt, images: [post.socialImage ?? post.coverImage ?? "/opengraph-image.jpg"] },
    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: "article",
      url: `/blog/${post.slug}`,
      publishedTime: post.date,
      modifiedTime: post.updatedAt ?? post.date,
      authors: [authorUrl],
      tags: post.tags,
      // Solo declaramos images si el post tiene portada real; el fallback
      // /images/blog/default.jpg no existe y heredaría el OG global del raíz.
      ...(hasRealCover(post)
        ? {
            images: [
              {
                url: post.socialImage ?? post.coverImage,
                ...socialSize,
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

  // Prioriza la selección editorial en su orden; después, afinidad de tags.
  // La fecha y el slug hacen estable el desempate.
  const allPosts = getAllPosts();
  const relatedPosts = allPosts
    .filter((p) => p.slug !== post.slug)
    .map((p) => {
      const editorialIndex = post.relatedSlugs?.indexOf(p.slug) ?? -1;
      return {
        post: p,
        score: (editorialIndex >= 0 ? 1000 - editorialIndex : 0) + (p.tags ?? []).filter((t) =>
          post.tags?.some((tt) => tt.toLowerCase() === t.toLowerCase())
        ).length / 100,
      };
    })
    .filter((item) => item.score > 0)
    .sort((a, b) => b.score - a.score || b.post.date.localeCompare(a.post.date) || a.post.slug.localeCompare(b.post.slug))
    .slice(0, 2)
    .map((r) => r.post);

  const ctaKey = post.ctaService && Object.hasOwn(CTA_SERVICE_CONFIG, post.ctaService) ? post.ctaService as CtaServiceKey : "contacto";
  const cta = CTA_SERVICE_CONFIG[ctaKey];
  const inquiryHref = ctaKey === "contacto" ? "/contacto" : contactHref(ctaKey);
  const authorUrl = new URL(post.authorProfile ?? business.authorProfile, SITE_URL).toString();

  // JSON-LD: BlogPosting + BreadcrumbList (mismo patrón que las páginas de servicio)
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "BlogPosting",
        "@id": `https://ltevo.com/blog/${post.slug}#article`,
        headline: post.title,
        url: `${SITE_URL}/blog/${post.slug}`,
        isPartOf: { "@type": "Blog", "@id": `${SITE_URL}/blog#blog`, url: `${SITE_URL}/blog`, name: "Blog de LTEvo" },
        description: post.excerpt,
        ...(hasRealCover(post) ? { image: `https://ltevo.com${post.socialImage ?? post.coverImage}` } : {}),
        datePublished: post.date,
        // Cae a `date` mientras el frontmatter no declare `updatedAt`. Antes
        // era idéntico siempre, así que una revisión del artículo era invisible.
        dateModified: post.updatedAt ?? post.date,
        author: {
          "@type": post.author === business.author ? "Person" : "Organization",
          "@id": `${authorUrl}${post.author === business.author ? "#victor-lasheras" : "#team"}`,
          name: post.author,
          url: authorUrl
        },
        publisher: {
          "@type": "Organization",
          name: "LTEvo",
          logo: {
            "@type": "ImageObject",
            url: "https://ltevo.com/logo.svg"
          }
        },
        mainEntityOfPage: {
          "@type": "WebPage",
          "@id": `https://ltevo.com/blog/${post.slug}`
        },
        // Describe el tema; las métricas editoriales nunca se imprimen.
        keywords: [post.keyword, ...(post.tags ?? [])].filter(Boolean).join(", "),
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
        dangerouslySetInnerHTML={{ __html: jsonLdString(jsonLd) }}
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
              Por <Link href={post.authorProfile ?? business.authorProfile} title={post.authorRole ?? business.authorRole} className="text-foreground font-medium underline underline-offset-4">{post.author}</Link>
            </span>
          </div>

          {post.updatedAt && <p className="text-sm text-muted-foreground mb-6">Revisado el {formatDate(post.updatedAt)}</p>}
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
      <main id="contenido" className="flex-grow pb-24 px-6">
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
            <h2 className="font-mono text-xs uppercase tracking-widest text-muted-foreground mb-8 text-center border-b border-foreground/5 pb-4">
              Artículos relacionados
            </h2>
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
                    <h3 className="text-xl font-display text-foreground leading-[1.2] hover:underline decoration-foreground/30 underline-offset-4 decoration-1 transition-all duration-300">
                      {rPost.title}
                    </h3>
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
            {cta.heading}
          </h2>
          <p className="text-muted-foreground leading-relaxed font-light mb-8 max-w-lg mx-auto">
            {cta.pitch}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href={inquiryHref}
              className="px-6 py-3 rounded-full bg-foreground text-background text-sm font-semibold hover:bg-foreground/90 transition-all font-sans"
            >
              Solicitar una propuesta
            </Link>
            <Link
              href={cta.href}
              className="px-6 py-3 rounded-full border border-foreground/10 text-sm font-semibold hover:bg-foreground/5 transition-all font-sans"
            >
              {cta.cta}
            </Link>
          </div>
        </div>
      </section>

      <FooterSection />
    </div>
  );
}
