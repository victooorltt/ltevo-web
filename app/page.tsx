import type { Metadata } from "next";
import { Navigation } from "@/components/landing/navigation";
import { HeroSection } from "@/components/landing/hero-section";
import { FeaturesSection } from "@/components/landing/features-section";
import { HowItWorksSection } from "@/components/landing/how-it-works-section";
import { MetricsSection } from "@/components/landing/metrics-section";
import { TechSection } from "@/components/landing/integrations-section";
import { TestimonialsSection } from "@/components/landing/testimonials-section";
import { LatestArticlesSection } from "@/components/landing/latest-articles-section";
import { LocalSeoSection } from "@/components/landing/local-seo-section";
import { FaqSection } from "@/components/landing/faq-section";
import { FooterSection } from "@/components/landing/footer-section";
import { PortfolioSection } from "@/components/landing/portfolio-section";
import { ContactSection } from "@/components/landing/contact-section";

export const metadata: Metadata = {
  alternates: {
    canonical: "/",
  },
};

export default function Home() {
  return (
    <main className="relative min-h-[100dvh] overflow-x-hidden">
      <Navigation />
      <HeroSection />
      <FeaturesSection />
      <HowItWorksSection />
      <MetricsSection />
      <TechSection />
      <PortfolioSection />
      <TestimonialsSection />
      <LatestArticlesSection />
      <LocalSeoSection />
      <FaqSection />
      <ContactSection />
      <FooterSection />
    </main>
  );
}
