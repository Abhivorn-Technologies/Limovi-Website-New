"use client";

import { useEffect } from "react";
import { useLenis } from "lenis/react";

// Smooth scrolling resets the position on load, so jump to the #clause in the
// URL ourselves once the page is ready.
export function HashScroll() {
  const lenis = useLenis();
  useEffect(() => {
    const id = decodeURIComponent(window.location.hash.slice(1));
    if (!id) return;
    const t = window.setTimeout(() => {
      const el = document.getElementById(id);
      if (!el) return;
      const y = el.getBoundingClientRect().top + window.scrollY - 100;
      if (lenis) lenis.scrollTo(y, { immediate: true });
      else window.scrollTo({ top: y });
    }, 150);
    return () => window.clearTimeout(t);
  }, [lenis]);
  return null;
}
