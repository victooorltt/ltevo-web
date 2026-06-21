import { Metadata } from "next";
import Link from "next/link";
import { Navigation } from "@/components/landing/navigation";
import { FooterSection } from "@/components/landing/footer-section";
import { getAllPosts, BlogPost } from "@/lib/blog";

function formatDate(dateStr: string): string {
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

export const metadata: Metadata = {
  title: "Blog de Estrategia Web, SEO y Diseño | LTEvo",
  description: "Artículos, guías y recursos prácticos sobre diseño web, posicionamiento SEO y desarrollo técnico para hacer crecer tu negocio.",
  alternates: {
    canonical: "https://ltevo.com/blog",
  },
};

export default function BlogPage() {
  const posts = getAllPosts();
  const featuredPost = posts[0];
  const gridPosts = posts.slice(1);

  return (
    <div className="relative min-h-[100dvh] bg-background text-foreground flex flex-col font-sans selection:bg-foreground selection:text-background">
      <Navigation />
      
      {/* Hero Section */}
      <section className="pt-32 pb-16 lg:pt-40 lg:pb-24 border-b border-foreground/5">
        <div className="max-w-[1200px] mx-auto px-6">
          <div className="max-w-3xl">
            <h1 className="text-5xl lg:text-7xl font-display tracking-tight text-foreground mb-6 leading-[0.95]">
              Ideas, Estrategias y Desarrollo Web
            </h1>
            <p className="text-lg lg:text-xl text-muted-foreground leading-relaxed max-w-2xl font-light">
              Guías detalladas paso a paso sobre SEO, diseño de conversión y desarrollo a medida sin rodeos teóricos.
            </p>
          </div>
        </div>
      </section>

      {/* Blog Content */}
      <main className="flex-grow py-16 lg:py-24 max-w-[1200px] mx-auto px-6 w-full">
        {posts.length === 0 ? (
          <div className="py-20 text-center">
            <h2 className="text-3xl font-display mb-4">Aún no hay artículos publicados</h2>
            <p className="text-muted-foreground">Vuelve pronto para leer las últimas novedades.</p>
          </div>
        ) : (
          <div className="space-y-24">
            {/* Featured Post */}
            {featuredPost && (
              <article className="group relative grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
                <div className="lg:col-span-7 overflow-hidden rounded-sm border border-foreground/10 aspect-[16/10] bg-neutral-100 relative">
                  {/* Dynamic Abstract Pattern for visual interest */}
                  <div className="absolute inset-0 bg-gradient-to-tr from-stone-200 to-stone-50 flex items-center justify-center p-8 select-none">
                    <div className="absolute w-64 h-64 bg-foreground/[0.02] rounded-full blur-3xl -top-10 -left-10" />
                    <div className="absolute w-80 h-80 bg-foreground/[0.03] rounded-full blur-2xl -bottom-10 -right-10" />
                    <div className="text-center">
                      <span className="font-display text-4xl lg:text-6xl text-foreground/[0.04] font-bold block mb-2 select-none">
                        {formatDate(featuredPost.date) || "Blog"}
                      </span>
                      <span className="font-mono text-[10px] tracking-wider text-muted-foreground/60 block">
                        VOL: {featuredPost.volumen}
                      </span>
                    </div>
                  </div>
                  {/* Zoom Image container if user uploads/creates actual images later */}
                  <div className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105" 
                       style={{ backgroundImage: `url(${featuredPost.coverImage})`, opacity: 0.85 }} 
                       // Error fallback handler not needed since we fallback to the background pattern gracefully
                  />
                  <div className="absolute inset-0 bg-black/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                </div>
                
                <div className="lg:col-span-5 flex flex-col justify-center">
                  <div className="flex flex-wrap items-center gap-3 font-mono text-xs text-muted-foreground mb-4">
                    <span className="bg-foreground/5 px-2.5 py-1 rounded-full text-foreground font-semibold">
                      {formatDate(featuredPost.date)}
                    </span>
                    <span>•</span>
                    <span>{featuredPost.readingTime}</span>
                  </div>
                  
                  <Link href={`/blog/${featuredPost.slug}`}>
                    <h2 className="text-3xl lg:text-4xl font-display text-foreground leading-[1.1] mb-4 hover:underline decoration-foreground/30 underline-offset-4 decoration-1 transition-all duration-300">
                      {featuredPost.title}
                    </h2>
                  </Link>
                  
                  <p className="text-muted-foreground mb-6 leading-relaxed font-light">
                    {featuredPost.excerpt}
                  </p>
                  
                  <div className="flex items-center justify-between pt-4 border-t border-foreground/5">
                    <span className="text-xs text-muted-foreground font-mono">
                      Por <span className="text-foreground font-medium">{featuredPost.author}</span>
                    </span>
                    <Link href={`/blog/${featuredPost.slug}`} className="group/btn inline-flex items-center gap-1.5 text-sm font-semibold tracking-wide hover:gap-2.5 transition-all duration-300">
                      Leer artículo
                      <span className="font-mono transition-transform duration-300 group-hover/btn:translate-x-0.5">→</span>
                    </Link>
                  </div>
                </div>
              </article>
            )}

            {/* Grid Posts */}
            {gridPosts.length > 0 && (
              <div className="space-y-12">
                <h3 className="font-mono text-xs uppercase tracking-widest text-muted-foreground border-b border-foreground/5 pb-4">
                  Más Publicaciones
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10">
                  {gridPosts.map((post) => (
                    <article key={post.slug} className="group flex flex-col h-full border-b border-foreground/5 pb-8 md:border-b-0 md:pb-0">
                      <div className="overflow-hidden rounded-sm border border-foreground/10 aspect-[16/10] bg-neutral-100 relative mb-6">
                        <div className="absolute inset-0 bg-gradient-to-br from-stone-100 to-stone-50 flex items-center justify-center p-6 select-none">
                          <span className="font-display text-2xl lg:text-3xl text-foreground/[0.03] font-bold block mb-2 select-none text-center">
                            {formatDate(post.date) || "Blog"}
                          </span>
                        </div>
                        <div className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105" 
                             style={{ backgroundImage: `url(${post.coverImage})`, opacity: 0.85 }} 
                        />
                        <div className="absolute inset-0 bg-black/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                      </div>
                      
                      <div className="flex flex-wrap items-center gap-2 font-mono text-[10px] text-muted-foreground mb-3">
                        <span className="bg-foreground/5 px-2 py-0.5 rounded-full text-foreground">
                          {formatDate(post.date)}
                        </span>
                        <span>•</span>
                        <span>{post.readingTime}</span>
                      </div>
                      
                      <Link href={`/blog/${post.slug}`} className="mb-3 block">
                        <h4 className="text-xl font-display text-foreground leading-[1.2] hover:underline decoration-foreground/30 underline-offset-4 decoration-1 transition-all duration-300">
                          {post.title}
                        </h4>
                      </Link>
                      
                      <p className="text-sm text-muted-foreground leading-relaxed font-light mb-6 flex-grow">
                        {post.excerpt}
                      </p>
                      
                      <div className="flex items-center justify-end pt-4 border-t border-foreground/5 mt-auto">
                        <Link href={`/blog/${post.slug}`} className="group/btn inline-flex items-center gap-1 text-xs font-semibold tracking-wide">
                          Leer más
                          <span className="font-mono transition-transform duration-300 group-hover/btn:translate-x-0.5">→</span>
                        </Link>
                      </div>
                    </article>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </main>

      {/* Newsletter / CTA Section */}
      <section className="bg-stone-100 py-20 border-t border-foreground/5">
        <div className="max-w-[1200px] mx-auto px-6 text-center">
          <div className="max-w-2xl mx-auto">
            <span className="font-mono text-xs uppercase tracking-widest text-muted-foreground block mb-4">
              Suscríbete para más
            </span>
            <h2 className="text-4xl lg:text-5xl font-display tracking-tight text-foreground mb-6 leading-none">
              Estrategias de conversión directas a tu buzón
            </h2>
            <p className="text-muted-foreground leading-relaxed font-light mb-8">
              Enviamos un correo quincenal con análisis reales, errores comunes que cometen las agencias y cómo optimizar tu web para generar leads cualificados.
            </p>
            
            <form className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
              <input 
                type="email" 
                placeholder="Tu correo electrónico" 
                required
                className="flex-grow px-5 py-3 rounded-full border border-foreground/10 bg-background text-sm focus:outline-none focus:border-foreground/30 transition-all font-sans"
              />
              <button 
                type="submit" 
                className="px-6 py-3 rounded-full bg-foreground text-background text-sm font-semibold hover:bg-foreground/90 transition-all font-sans shrink-0"
              >
                Suscribirse
              </button>
            </form>
            <p className="text-[11px] text-muted-foreground/60 font-light mt-3">
              Cero spam. Te puedes desapuntar con un solo clic.
            </p>
          </div>
        </div>
      </section>

      <FooterSection />
    </div>
  );
}
