import Image from "next/image";

interface Testimonial {
  quote: string;
  author: string;
  role: string;
  company: string;
  avatar?: string;
  source?: string;
}

const testimonials: Testimonial[] = [
  {
    quote: "Excelente trabajo al crearme una web. Muy atento a mis exigencias y rápido en solventar lo que le iba pidiendo. Muy recomendable.",
    author: "Autocaravanas Bahía",
    role: "Alquiler de autocaravanas",
    company: "en Alicante",
    avatar: "/autocaravanas-bahia-review.png",
    source: "Google",
  },
  {
    quote: "Trabajo muy bueno, atento e implicado en el proyecto. Recomendable!",
    author: "Mateo Lara",
    role: "Cliente",
    company: "Proyecto web",
    avatar: "/mateo-lara-review.png",
    source: "Google",
  },
  {
    quote: "Excelentes profesionales que han comprendido muy rápidamente lo que deseábamos crear y ha llevado el proyecto a su objetivo en muy poco tiempo.",
    author: "Carlos Esteve",
    role: "Cliente",
    company: "Desarrollo web",
    source: "Workana",
  },
  {
    quote: "Han trabajado muy rápido y eficaz. La comunicación ha sido fluida y el trato excelente. Lo recomiendo sin duda!",
    author: "Teresa García",
    role: "Cliente",
    company: "Diseño & Web",
    source: "Workana",
  },
];

function StarRating() {
  return (
    <div className="flex gap-1">
      {Array.from({ length: 5 }).map((_, i) => (
        <svg
          key={i}
          width="15"
          height="15"
          viewBox="0 0 24 24"
          fill="currentColor"
          className="text-amber-400"
        >
          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
        </svg>
      ))}
    </div>
  );
}

function TestimonialCard({ t }: { t: Testimonial }) {
  return (
    <div className="testimonial-card flex flex-col gap-6 p-8 snap-center shrink-0 w-[85vw] sm:w-auto">
      <div className="flex items-center justify-between">
        <StarRating />
        {t.source && (
          <span className="text-[11px] font-medium text-muted-foreground/70 bg-foreground/[0.03] border border-foreground/[0.06] px-2.5 py-0.5 rounded-full">
            {t.source}
          </span>
        )}
      </div>

      <p className="text-base leading-relaxed flex-1" style={{ color: "rgba(0,0,0,0.75)" }}>
        &quot;{t.quote}&quot;
      </p>

      <div
        className="flex items-center gap-3 pt-5"
        style={{ borderTop: "1px solid rgba(0,0,0,0.07)" }}
      >
        {t.avatar ? (
          <div className="w-10 h-10 rounded-full overflow-hidden shrink-0 border border-black/10 relative">
            <Image
              src={t.avatar}
              alt={t.author}
              fill
              sizes="40px"
              className="object-cover"
            />
          </div>
        ) : (
          <div
            className="w-10 h-10 rounded-full flex items-center justify-center shrink-0"
            style={{
              background: "linear-gradient(135deg, rgba(0,0,0,0.06), rgba(0,0,0,0.03))",
              border: "1px solid rgba(0,0,0,0.08)",
            }}
          >
            <span className="text-sm font-medium" style={{ color: "rgba(0,0,0,0.8)" }}>
              {t.author.charAt(0)}
            </span>
          </div>
        )}
        <div>
          <p className="text-sm font-medium" style={{ color: "rgba(0,0,0,0.85)" }}>
            {t.author}
          </p>
          <p className="text-xs" style={{ color: "rgba(0,0,0,0.4)" }}>
            {t.role} {t.company}
          </p>
        </div>
      </div>
    </div>
  );
}

export function TestimonialsSection() {
  return (
    <section className="py-24 lg:py-32 border-t border-foreground/10">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">

        <div className="flex items-center gap-4 mb-16">
          <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full text-xs font-medium text-foreground/75 bg-foreground/[0.04] border border-foreground/[0.08] tracking-wide">
            Lo que dicen nuestros clientes
          </span>
          <div className="flex-1 h-px bg-foreground/10" />
        </div>

        <div className="flex overflow-x-auto snap-x snap-mandatory scrollbar-none -mx-6 px-6 py-8 -my-8 scroll-px-6 sm:mx-0 sm:px-0 sm:py-0 sm:my-0 sm:overflow-visible sm:grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {testimonials.map((t, idx) => (
            <TestimonialCard key={idx} t={t} />
          ))}
        </div>

      </div>
    </section>
  );
}