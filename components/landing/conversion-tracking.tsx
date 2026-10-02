"use client";

import { useEffect } from "react";
import { trackEvent } from "@/lib/analytics";

export function ConversionTracking() {
  useEffect(() => {
    try {
      if (!sessionStorage.getItem("ltevo:landing-path")) sessionStorage.setItem("ltevo:landing-path", window.location.pathname);
    } catch { /* Contact still works when storage is unavailable. */ }
    const onClick = (event: MouseEvent) => {
      const anchor = event.target instanceof Element ? event.target.closest("a[href]") : null;
      if (!(anchor instanceof HTMLAnchorElement)) return;
      if (anchor.protocol === "tel:") trackEvent("contact_click", { contact_method: "phone", page_path: window.location.pathname });
      else if (anchor.protocol === "mailto:") trackEvent("contact_click", { contact_method: "email", page_path: window.location.pathname });
      else if (anchor.origin === window.location.origin && anchor.pathname === "/contacto") {
        try { sessionStorage.setItem("ltevo:contact-source", window.location.pathname); } catch { /* no analytics dependency */ }
        trackEvent("contact_cta_click", { page_path: window.location.pathname, service: new URL(anchor.href).searchParams.get("servicio") || "" });
      }
    };
    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, []);
  return null;
}
