"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { AnimatePresence, motion, useMotionValueEvent, useScroll, useSpring, useTransform, type MotionValue } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Rays } from "./primitives";
import { luxuryPieces } from "./data";

const pieces = luxuryPieces;
const N = pieces.length;

// Pinned "coverflow": scrolling glides the Jewellery Cloud pieces past the
// centre. The centre piece is large and flat; the others tilt away in 3D.
export function JewelleryArch() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });
  const pos = useSpring(useTransform(scrollYProgress, [0.04, 0.96], [0, N - 1], { clamp: true }), { stiffness: 140, damping: 26, mass: 0.4 });
  const bar = useTransform(scrollYProgress, [0.04, 0.96], ["0%", "100%"]);
  const [active, setActive] = useState(0);
  useMotionValueEvent(pos, "change", (v) => setActive(Math.round(v)));
  const p = pieces[active];

  return (
    <section ref={ref} style={{ height: `${N * 55 + 60}vh` }} className="relative bg-lm-navy text-white">
      <div className="sticky top-0 flex h-[100svh] flex-col overflow-hidden pb-6 pt-[92px] sm:pb-8">
        <div className="pointer-events-none absolute inset-0 [background:radial-gradient(40%_45%_at_50%_55%,rgba(242,185,43,0.16),transparent),radial-gradient(70%_50%_at_50%_100%,rgba(30,111,232,0.35),transparent)]" />
        <div className="pointer-events-none absolute left-1/2 top-1/2 h-[1000px] w-[1000px] -translate-x-1/2 -translate-y-1/2 text-white/[0.03]">
          <Rays className="lm-rays h-full w-full" count={48} hole={30} />
        </div>

        {/* heading */}
        <div className="relative shrink-0 px-5 text-center">
          <p className="text-xs font-bold uppercase tracking-[0.18em] text-lm-gold">The Jewellery Cloud</p>
          <h2 className="display mx-auto mt-2 max-w-2xl text-[clamp(1.5rem,1rem+1.8vw,2.5rem)]">
            Wear something new <span className="text-lm-gold">for every occasion</span>
          </h2>
        </div>

        {/* coverflow */}
        <div className="relative flex min-h-0 flex-1 items-center justify-center [perspective:1400px]">
          {pieces.map((pc, i) => (
            <Card key={pc.src} i={i} pos={pos} src={pc.src} name={pc.name} />
          ))}
        </div>

        {/* caption + button, always inside the viewport */}
        <div className="relative shrink-0 px-5">
          <div className="mx-auto flex max-w-3xl flex-col items-center gap-3 sm:flex-row sm:justify-between sm:gap-6">
            <div className="text-center sm:text-left">
              <AnimatePresence mode="wait">
                <motion.p
                  key={p.name}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.3 }}
                  className="display text-xl sm:text-2xl"
                >
                  {p.name}
                </motion.p>
              </AnimatePresence>
              <p className="mt-0.5 text-sm text-white/60">Experience it, then return it within 30 hours of delivery.</p>
            </div>
            <Link href="/services#jewellery" className="lm-btn lm-btn-gold lm-shine shrink-0 !min-h-[48px]">
              Explore the Jewellery Cloud <ArrowRight size={18} />
            </Link>
          </div>
          <div className="mx-auto mt-4 flex max-w-3xl items-center gap-3 text-xs font-bold tabular-nums text-white/50">
            <span className="text-lm-gold">{String(active + 1).padStart(2, "0")}</span>
            <span className="relative h-[3px] flex-1 overflow-hidden rounded-full bg-white/15">
              <motion.span style={{ width: bar }} className="absolute inset-y-0 left-0 rounded-full bg-lm-gold" />
            </span>
            <span>{String(N).padStart(2, "0")}</span>
          </div>
        </div>
      </div>
    </section>
  );
}

function Card({ i, pos, src, name }: { i: number; pos: MotionValue<number>; src: string; name: string }) {
  const d = useTransform(pos, (v) => i - v);
  const x = useTransform(d, (v) => `calc(${v} * min(62vw, 300px))`);
  const rotateY = useTransform(d, (v) => Math.max(-55, Math.min(55, -v * 38)));
  const scale = useTransform(d, (v) => 1 - Math.min(Math.abs(v), 2.5) * 0.16);
  const opacity = useTransform(d, (v) => 1 - Math.min(Math.abs(v), 2.6) * 0.32);
  const zIndex = useTransform(d, (v) => 100 - Math.round(Math.abs(v) * 10));
  const glow = useTransform(d, (v) => Math.max(0, 1 - Math.abs(v) * 1.5));

  return (
    <motion.div
      style={{ x, rotateY, scale, opacity, zIndex }}
      className="absolute aspect-[3/4] h-[min(48svh,440px)] max-h-full [transform-style:preserve-3d]"
    >
      <motion.div
        style={{ opacity: glow }}
        className="absolute -inset-3 rounded-[34px] bg-[radial-gradient(closest-side,rgba(242,185,43,0.45),transparent)] blur-xl"
      />
      <div className="relative h-full w-full overflow-hidden rounded-[28px] border border-white/15 bg-black/40 shadow-[0_40px_80px_-30px_rgba(0,0,0,0.8)]">
        <Image src={src} alt={name} fill sizes="(min-width:640px) 330px, 62vw" className="object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
      </div>
    </motion.div>
  );
}
