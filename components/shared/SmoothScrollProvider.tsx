"use client";

import { ReactLenis } from "lenis/react";
import { useEffect, ReactNode } from "react";

export function SmoothScrollProvider({ children }: { children: ReactNode }) {
  useEffect(() => {
    if ('scrollRestoration' in window.history) {
      window.history.scrollRestoration = 'manual';
    }
    window.scrollTo(0, 0);
  }, []);

  // Visitors who ask for less motion get native scrolling
  const reduceMotion = typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  return (
    <ReactLenis root options={{ lerp: 0.1, smoothWheel: !reduceMotion, anchors: { offset: -76 } }}>
      {children}
    </ReactLenis>
  );
}
