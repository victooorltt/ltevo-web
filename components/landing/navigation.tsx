"use client";

import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Menu, X, ChevronDown } from "lucide-react";

type NavLink = {
  name: string;
  href: string;
  dropdown?: { name: string; href: string }[];
};

const navLinks: NavLink[] = [
  { name: "Inicio", href: "/" },
  {
    name: "Servicios",
    href: "#",
    dropdown: [
      { name: "Diseño Web", href: "/servicios/diseno-web" },
      { name: "SEO y Posicionamiento", href: "/servicios/seo" },
      { name: "Mantenimiento Web", href: "/servicios/mantenimiento-web" },
    ],
  },
  { name: "Contacto", href: "/contacto" },
];

export function Navigation() {
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    // Run once on mount to set initial state
    handleScroll();

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isMobileMenuOpen]);

  const hasDarkHero =
    pathname === "/" ||
    pathname === "/contacto" ||
    pathname === "/servicios/seo" ||
    pathname === "/servicios/mantenimiento-web";
  const showWhiteText = !isScrolled && hasDarkHero;
  const floating = isScrolled || isMobileMenuOpen;

  const scrollToSection = (hash: string) => {
    const id = hash.replace(/^\/?#/, "");
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleNavClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    href: string,
  ) => {
    // Extract the hash part
    const hashIndex = href.indexOf("#");
    const hash = hashIndex !== -1 ? href.substring(hashIndex) : null;

    // If we're on the home page and the link has a hash, smooth scroll
    if (pathname === "/" && hash) {
      e.preventDefault();
      scrollToSection(hash);
    }
    // Otherwise let the browser/Next.js handle normal navigation
  };

  return (
    <header
      className={`fixed z-50 transition-all duration-500 ${
        isScrolled ? "top-4 left-4 right-4" : "top-0 left-0 right-0"
      }`}
    >
      <nav
        className={`mx-auto transition-all duration-500 max-w-[1400px] ${
          floating ? "max-w-[1200px]" : ""
        }`}
        style={{
          backgroundColor: floating
            ? "rgba(var(--background-rgb, 250,249,247), 0.8)"
            : "transparent",
          backdropFilter: floating ? "blur(20px)" : "none",
          WebkitBackdropFilter: floating ? "blur(20px)" : "none",
          borderRadius: floating ? "1rem" : "0",
          boxShadow: floating
            ? "0 1px 24px 0 rgba(0,0,0,0.06)"
            : "none",
          border: floating
            ? "1px solid rgba(0,0,0,0.08)"
            : "1px solid transparent",
          transition: "all 0.5s ease",
        }}
      >
        <div
          className={`flex items-center justify-between px-6 lg:px-8 transition-all duration-500 ${
            isScrolled ? "h-14" : "h-20"
          }`}
        >
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group">
            <span
              className={`font-display tracking-tight transition-all duration-500 ${
                isScrolled ? "text-xl" : "text-2xl"
              } ${showWhiteText ? "text-white" : "text-foreground"}`}
            >
              LTEvo
            </span>
            <span
              className={`font-mono transition-all duration-500 ${
                isScrolled ? "text-[10px] mt-0.5" : "text-xs mt-1"
              } ${showWhiteText ? "text-white/40" : "text-muted-foreground"}`}
            >
              ™
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-12">
            {navLinks.map((link) =>
              link.dropdown ? (
                <div key={link.name} className="relative group">
                  <button
                    className={`text-sm font-medium tracking-wide transition-all duration-300 relative flex items-center gap-1 ${
                      showWhiteText
                        ? "text-white/70 hover:text-white"
                        : "text-foreground/70 hover:text-foreground"
                    }`}
                  >
                    {link.name}
                    <ChevronDown
                      size={14}
                      className="transition-transform duration-300 group-hover:rotate-180"
                    />
                    <span
                      className={`absolute -bottom-1 left-0 w-0 h-px transition-all duration-300 group-hover:w-full ${
                        showWhiteText ? "bg-white" : "bg-foreground"
                      }`}
                    />
                  </button>
                  <div className="absolute top-full left-1/2 -translate-x-1/2 pt-4 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300">
                    <div className="bg-background/95 backdrop-blur-xl border border-foreground/10 rounded-sm shadow-[0_8px_30px_rgba(0,0,0,0.08)] min-w-[220px] py-2">
                      {link.dropdown.map((item) => (
                        <Link
                          key={item.name}
                          href={item.href}
                          className="block px-6 py-3 text-sm text-muted-foreground hover:text-foreground hover:bg-foreground/3 transition-all duration-200"
                        >
                          {item.name}
                        </Link>
                      ))}
                    </div>
                  </div>
                </div>
              ) : (
                <Link
                  key={link.name}
                  href={link.href}
                  onClick={(e) => handleNavClick(e, link.href)}
                  className={`text-sm font-medium tracking-wide transition-all duration-300 relative group ${
                    showWhiteText
                      ? "text-white/70 hover:text-white"
                      : "text-foreground/70 hover:text-foreground"
                  }`}
                >
                  {link.name}
                  <span
                    className={`absolute -bottom-1 left-0 w-0 h-px transition-all duration-300 group-hover:w-full ${
                      showWhiteText ? "bg-white" : "bg-foreground"
                    }`}
                  />
                </Link>
              )
            )}
          </div>

          {/* Desktop CTA */}
          <div className="hidden md:flex items-center gap-4">
            <Button
              size="sm"
              asChild
              className={`rounded-full transition-all duration-500 ${
                isScrolled ? "px-4 h-8 text-xs" : "px-6"
              } ${
                showWhiteText
                  ? "bg-white text-black hover:bg-white/90"
                  : "bg-foreground text-background hover:bg-foreground/90"
              }`}
            >
              <Link href="/contacto">Solicitar presupuesto</Link>
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className={`md:hidden p-2 transition-colors duration-300 ${
              showWhiteText ? "text-white" : "text-foreground"
            }`}
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      <div
        className={`md:hidden fixed inset-0 bg-background z-50 transition-all duration-500 ${
          isMobileMenuOpen
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        }`}
        style={{ top: 0 }}
      >
        <div className="flex flex-col h-full">
          {/* Header Bar inside Mobile Menu */}
          <div className="flex items-center justify-between px-6 h-20 border-b border-foreground/5">
            <Link
              href="/"
              onClick={() => setIsMobileMenuOpen(false)}
              className="flex items-center gap-2 group"
            >
              <span className="font-display tracking-tight text-2xl text-foreground">
                LTEvo
              </span>
              <span className="font-mono text-xs mt-1 text-muted-foreground">
                ™
              </span>
            </Link>
            <button
              onClick={() => setIsMobileMenuOpen(false)}
              className="p-2 text-foreground hover:text-muted-foreground transition-colors duration-300"
              aria-label="Close menu"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          {/* Links list */}
          <div className="flex-1 flex flex-col justify-center px-8 py-12 gap-8 overflow-y-auto">
            {navLinks.map((link, i) => (
              <div key={link.name} className="flex flex-col gap-2">
                {link.dropdown ? (
                  <>
                    <span
                      className={`block text-3xl font-sans font-medium tracking-tight text-foreground transition-all duration-500 ${
                        isMobileMenuOpen
                          ? "opacity-100 translate-y-0"
                          : "opacity-0 translate-y-4"
                      }`}
                      style={{
                        transitionDelay: isMobileMenuOpen
                          ? `${i * 75}ms`
                          : "0ms",
                      }}
                    >
                      {link.name}
                    </span>
                    <div className="flex flex-col gap-3 pl-4 border-l border-foreground/5 mt-2">
                      {link.dropdown.map((item, j) => (
                        <Link
                          key={item.name}
                          href={item.href}
                          onClick={() => setIsMobileMenuOpen(false)}
                          className={`block text-lg font-sans text-muted-foreground hover:text-foreground transition-all duration-500 ${
                            isMobileMenuOpen
                              ? "opacity-100 translate-y-0"
                              : "opacity-0 translate-y-4"
                          }`}
                          style={{
                            transitionDelay: isMobileMenuOpen
                              ? `${i * 75 + (j + 1) * 50}ms`
                              : "0ms",
                          }}
                        >
                          {item.name}
                        </Link>
                      ))}
                    </div>
                  </>
                ) : (
                  <Link
                    href={link.href}
                    onClick={(e) => {
                      handleNavClick(e, link.href);
                      setIsMobileMenuOpen(false);
                    }}
                    className={`text-3xl font-sans font-medium tracking-tight text-foreground hover:text-muted-foreground transition-all duration-500 ${
                      isMobileMenuOpen
                        ? "opacity-100 translate-y-0"
                        : "opacity-0 translate-y-4"
                    }`}
                    style={{
                      transitionDelay: isMobileMenuOpen
                        ? `${i * 75}ms`
                        : "0ms",
                    }}
                  >
                    {link.name}
                  </Link>
                )}
              </div>
            ))}
          </div>

          {/* CTA Footer */}
          <div
            className={`px-8 pb-10 pt-6 border-t border-foreground/5 transition-all duration-500 ${
              isMobileMenuOpen
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-4"
            }`}
            style={{
              transitionDelay: isMobileMenuOpen ? "300ms" : "0ms",
            }}
          >
            <Button
              className="w-full bg-foreground text-background rounded-full h-14 text-base font-sans font-medium"
              onClick={() => setIsMobileMenuOpen(false)}
              asChild
            >
              <Link href="/contacto">Solicitar presupuesto</Link>
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
}