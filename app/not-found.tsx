import type { Metadata } from "next";
import Link from "next/link";
import { Navigation } from "@/components/landing/navigation";
import { FooterSection } from "@/components/landing/footer-section";

export const metadata: Metadata = {
  title: "Página no encontrada",
  robots: { index: false, follow: false },
};

export default function NotFound() {
  return (
    <div className="relative min-h-[100dvh] bg-background text-foreground flex flex-col font-sans selection:bg-foreground selection:text-background">
      <Navigation />

      <main className="flex-grow flex items-center justify-center px-6 pt-32 pb-24 lg:pt-40">
        <div className="max-w-2xl mx-auto text-center">
          <p className="font-mono text-xs uppercase tracking-widest text-muted-foreground mb-4">
            Error 404
          </p>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-display tracking-tight text-foreground leading-[1.05] mb-6">
            Página no encontrada
          </h1>
          <p className="text-muted-foreground leading-relaxed font-light mb-10 max-w-lg mx-auto">
            Lo sentimos, la página que buscas no existe o ha cambiado de dirección. Quizá lo que buscas sigue aquí:
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/"
              className="px-6 py-3 rounded-full bg-foreground text-background text-sm font-semibold hover:bg-foreground/90 transition-all"
            >
              Volver al inicio
            </Link>
            <Link
              href="/blog"
              className="px-6 py-3 rounded-full border border-foreground/10 text-sm font-semibold hover:bg-foreground/5 transition-all"
            >
              Ver el blog
            </Link>
          </div>
        </div>
      </main>

      <FooterSection />
    </div>
  );
}
