import type { ReactNode } from "react";
import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { Rays } from "@/components/home/primitives";
import { HashScroll } from "@/components/legal/HashScroll";

// Top banner for inner pages: breadcrumb, page title (h1) and a short lead.
export function PageHero({ eyebrow, title, lead }: { eyebrow: string; title: ReactNode; lead?: ReactNode }) {
  return (
    <section className="relative isolate overflow-hidden bg-gradient-to-b from-lm-sand to-lm-paper pb-12 pt-[120px] sm:pt-[140px] lg:pb-16">
      <div className="pointer-events-none absolute -right-[25vw] -top-[25vw] -z-10 h-[70vw] w-[70vw] max-h-[900px] max-w-[900px] text-lm-sky-2 opacity-70">
        <Rays className="lm-rays h-full w-full" count={36} hole={34} />
      </div>
      <HashScroll />
      <div className="frame">
        <nav aria-label="Breadcrumb" className="flex items-center gap-1.5 text-sm font-semibold text-lm-muted">
          <Link href="/" className="hover:text-lm-blue">
            Home
          </Link>
          <ChevronRight size={14} />
          <span className="text-lm-blue">{eyebrow}</span>
        </nav>
        <h1 className="display mt-5 max-w-4xl text-[clamp(2.2rem,1.4rem+3vw,3.8rem)] text-lm-navy">{title}</h1>
        {lead && <p className="mt-5 max-w-2xl text-[clamp(1.05rem,1rem+0.4vw,1.3rem)] leading-relaxed text-lm-muted">{lead}</p>}
      </div>
    </section>
  );
}
