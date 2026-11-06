"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { AnimatePresence, motion, useMotionValueEvent, useScroll, useTransform } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Rays } from "./primitives";

const pieces = [
  { label: "Jhumkas", name: "Temple Jhumkas", src: "/images/ear_piercing.png", pos: "left-bottom" },
  { label: "Necklace", name: "Heritage Necklace", src: "/images/necklace.png", pos: "left-top" },
  { label: "Long haram", name: "Royal Long Haram", src: "/images/long_haram.png", pos: "right-top" },
  { label: "Bridal set", name: "Bridal Wedding Set", src: "/images/jewellery-wedding.png", pos: "right-bottom" },
] as const;

const posClass: Record<(typeof pieces)[number]["pos"], string> = {
  "left-top": "left-0 top-[22%] text-right",
  "left-bottom": "left-0 bottom-[18%] text-right",
  "right-top": "right-0 top-[22%]",
  "right-bottom": "right-0 bottom-[18%]",
};

// Pinned arch display: as you scroll, the arch outline draws and the piece
// inside changes, lighting up its label (idea from the reference video).
export function JewelleryArch() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });
  const draw = useTransform(scrollYProgress, [0.02, 0.92], [0, 1]);
  const [active, setActive] = useState(0);
  useMotionValueEvent(scrollYProgress, "change", (v) => setActive(Math.min(pieces.length - 1, Math.max(0, Math.floor(v * pieces.length)))));
  const p = pieces[active];

  return (
    <section ref={ref} className="relative h-[340vh] bg-lm-navy text-white">
      <div className="sticky top-0 flex h-[100svh] flex-col items-center justify-center overflow-hidden px-4 pt-20">
        <div className="pointer-events-none absolute inset-0 opacity-70 [background:radial-gradient(45%_45%_at_50%_55%,rgba(242,185,43,0.18),transparent),radial-gradient(60%_50%_at_50%_100%,rgba(30,111,232,0.35),transparent)]" />
        <div className="pointer-events-none absolute left-1/2 top-[58%] h-[900px] w-[900px] -translate-x-1/2 -translate-y-1/2 text-white/[0.04]">
          <Rays className="lm-rays h-full w-full" count={48} hole={30} />
        </div>

        <div className="relative text-center">
          <p className="text-xs font-bold uppercase tracking-[0.18em] text-lm-gold">The Jewellery Cloud</p>
          <h2 className="display mx-auto mt-3 max-w-2xl text-[clamp(1.7rem,1.2rem+2vw,2.8rem)]">
            Wear something new <span className="text-lm-gold">for every occasion</span>
          </h2>
        </div>

        <div className="relative mt-6 w-full max-w-[760px] sm:mt-8">
          {/* labels */}
          {pieces.map((pc, i) => (
            <div key={pc.label} className={`absolute z-10 hidden w-[150px] sm:block ${posClass[pc.pos]}`}>
              <p className={`text-[10px] font-bold uppercase tracking-[0.18em] transition-colors duration-500 ${i <= active ? "text-lm-gold" : "text-white/30"}`}>
                Piece {i + 1}
              </p>
              <p className={`mt-0.5 text-lg font-bold transition-colors duration-500 ${i === active ? "text-white" : i < active ? "text-white/60" : "text-white/30"}`}>
                {pc.label}
              </p>
            </div>
          ))}

          {/* arch */}
          <div className="relative mx-auto h-[min(52svh,460px)] w-[min(70vw,340px)]">
            <div className="absolute inset-0 overflow-hidden rounded-t-full bg-black/30">
              <AnimatePresence mode="popLayout">
                <motion.div
                  key={p.src}
                  className="absolute inset-0"
                  initial={{ opacity: 0, scale: 1.08 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                >
                  <Image src={p.src} alt={p.name} fill sizes="340px" className="object-cover" />
                </motion.div>
              </AnimatePresence>
              <div className="absolute inset-0 rounded-t-full shadow-[inset_0_0_60px_20px_rgba(11,27,58,0.85)]" />
            </div>
            <svg viewBox="0 0 340 460" preserveAspectRatio="none" className="pointer-events-none absolute -inset-[10px] h-[calc(100%+20px)] w-[calc(100%+20px)] overflow-visible">
              <path d="M2,458 L2,170 A168,168 0 0 1 338,170 L338,458" fill="none" stroke="rgba(255,255,255,0.12)" strokeWidth="2" />
              <motion.path
                d="M2,458 L2,170 A168,168 0 0 1 338,170 L338,458"
                fill="none"
                stroke="#F2B92B"
                strokeWidth="3"
                strokeLinecap="round"
                style={{ pathLength: draw }}
              />
            </svg>
          </div>
          {/* pedestal */}
          <div className="mx-auto h-4 w-[min(80vw,400px)] rounded-t-md bg-gradient-to-b from-white/15 to-white/5" />
        </div>

        <div className="relative mt-6 text-center">
          <AnimatePresence mode="wait">
            <motion.p
              key={p.name}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              className="display text-xl"
            >
              {p.name}
            </motion.p>
          </AnimatePresence>
          <p className="mt-1 text-sm text-white/60">Experience it, then return it within 30 hours of delivery.</p>
          <Link href="/services#jewellery" className="mt-4 inline-flex items-center gap-2 text-sm font-bold text-lm-gold hover:underline">
            Explore the Jewellery Cloud <ArrowRight size={16} />
          </Link>
          <div className="mt-4 flex justify-center gap-1.5 sm:hidden">
            {pieces.map((pc, i) => (
              <span key={pc.label} className={`h-1.5 rounded-full transition-all ${i === active ? "w-6 bg-lm-gold" : "w-1.5 bg-white/30"}`} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
