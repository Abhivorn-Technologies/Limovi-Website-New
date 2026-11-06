"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight, ArrowUpRight, Sparkles } from "lucide-react";
import { Rays } from "@/components/home/primitives";
import { openEarlyAccess } from "@/components/home/data";

// Closing band for inner pages: points to the next page in the journey instead
// of repeating the same big call-to-action on every page.
export function NextStep({ href, label, title, blurb }: { href: string; label: string; title: string; blurb: string }) {
  const reduce = useReducedMotion();
  return (
    <section className="bg-lm-paper px-3 pb-16 pt-4 sm:px-5 lg:pb-24">
      <div className="mx-auto grid max-w-[1320px] gap-4 lg:grid-cols-12">
        <Link
          href={href}
          className="group relative isolate overflow-hidden rounded-[36px] bg-lm-navy p-8 text-white sm:p-10 lg:col-span-8 lg:p-12"
        >
          <div className="pointer-events-none absolute -right-24 -top-24 -z-10 h-[420px] w-[420px] text-white/[0.07] transition-transform duration-[1.5s] group-hover:rotate-45">
            <Rays className="h-full w-full" count={32} hole={30} />
          </div>
          <div className="pointer-events-none absolute inset-0 -z-10 opacity-60 [background:radial-gradient(50%_60%_at_100%_100%,rgba(30,111,232,0.55),transparent)]" />
          <p className="text-xs font-bold uppercase tracking-[0.16em] text-lm-gold">Up next · {label}</p>
          <p className="display mt-4 max-w-xl text-[clamp(1.8rem,1.2rem+2vw,3rem)] leading-[1.05]">{title}</p>
          <p className="mt-4 max-w-lg text-white/70">{blurb}</p>
          <span className="mt-8 inline-flex items-center gap-3 font-bold">
            <span className="grid h-12 w-12 place-items-center rounded-full bg-white text-lm-navy transition-all duration-500 group-hover:w-20 group-hover:bg-lm-gold">
              <ArrowRight size={20} />
            </span>
            Go to {label}
          </span>
        </Link>

        <div className="relative overflow-hidden rounded-[36px] bg-lm-gold p-8 text-lm-navy sm:p-10 lg:col-span-4">
          <motion.span
            className="absolute right-8 top-8"
            animate={reduce ? undefined : { rotate: [0, 180, 360], scale: [1, 1.2, 1] }}
            transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
            aria-hidden
          >
            <Sparkles size={28} />
          </motion.span>
          <p className="text-xs font-bold uppercase tracking-[0.16em]">Be early</p>
          <p className="display mt-4 text-[clamp(1.6rem,1.2rem+1.2vw,2.2rem)] leading-[1.1]">Your gold has been waiting.</p>
          <button onClick={openEarlyAccess} className="lm-btn mt-8 w-full bg-lm-navy text-white hover:bg-black">
            Get Early Access <ArrowUpRight size={18} />
          </button>
        </div>
      </div>
    </section>
  );
}
