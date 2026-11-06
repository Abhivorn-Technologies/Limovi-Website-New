"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ArrowRight, Clock, ShieldCheck, Sparkles } from "lucide-react";
import { Rays, SectionHead } from "./primitives";
import { lifestylePieces, luxuryPieces, openEarlyAccess } from "./data";

const collections = {
  Luxury: { pieces: luxuryPieces, blurb: "Grand pieces for weddings, festivals and milestones." },
  Lifestyle: { pieces: lifestylePieces, blurb: "Lighter pieces for every day, up to 55% of your Gold Balance." },
} as const;
type Collection = keyof typeof collections;

// Facts below come from the strategy schedules and the Master Agreement (see /legal).
const facts = [
  { icon: Clock, text: "Return within 30 hours of delivery" },
  { icon: ShieldCheck, text: "Insured through a LIMOVI-approved insurer where required" },
  { icon: Sparkles, text: "Condition recorded at handover and on return" },
];

export function JewelleryShowcase() {
  const reduce = useReducedMotion();
  const [tab, setTab] = useState<Collection>("Luxury");
  const [idx, setIdx] = useState(0);
  const [paused, setPaused] = useState(false);
  const pieces = collections[tab].pieces;
  const featured = pieces[idx % pieces.length];

  // gently cycle through the collection until the visitor picks a piece
  useEffect(() => {
    if (reduce || paused) return;
    const t = window.setInterval(() => setIdx((i) => (i + 1) % pieces.length), 3600);
    return () => window.clearInterval(t);
  }, [reduce, paused, pieces.length]);

  const switchTab = (c: Collection) => {
    setTab(c);
    setIdx(0);
    setPaused(false);
  };

  return (
    <section id="jewellery-cloud" className="relative isolate overflow-hidden bg-lm-navy py-24 text-white lg:py-32">
      <div className="pointer-events-none absolute inset-0 -z-10 [background:radial-gradient(50%_45%_at_15%_10%,rgba(242,185,43,0.22),transparent),radial-gradient(45%_45%_at_90%_90%,rgba(30,111,232,0.35),transparent)]" />
      <div className="pointer-events-none absolute -right-[20vw] -top-[20vw] -z-10 h-[60vw] w-[60vw] max-h-[900px] max-w-[900px] text-white/[0.04]">
        <Rays className="lm-rays h-full w-full" count={36} hole={36} />
      </div>

      <div className="frame">
        <SectionHead
          center
          light
          eyebrow="The Jewellery Cloud"
          title={<>Big jewellery dreams, <span className="text-lm-gold">without buying every piece</span></>}
          lead="Bridal sets for the wedding season, something lighter for every day. Pick a piece from the Jewellery Cloud, enjoy it, and return it within 30 hours of delivery."
        />

        <div className="mt-10 flex justify-center" role="tablist" aria-label="Collections">
          <div className="inline-flex rounded-full border border-white/15 bg-white/5 p-1.5">
            {(Object.keys(collections) as Collection[]).map((c) => (
              <button
                key={c}
                role="tab"
                aria-selected={tab === c}
                onClick={() => switchTab(c)}
                className={`relative rounded-full px-6 py-2.5 text-[15px] font-bold transition-colors ${tab === c ? "text-lm-navy" : "text-white/75 hover:text-white"}`}
              >
                {tab === c && (
                  <motion.span layoutId="jc-pill" className="absolute inset-0 rounded-full bg-lm-gold" transition={{ type: "spring", stiffness: 320, damping: 30 }} />
                )}
                <span className="relative">{c}</span>
              </button>
            ))}
          </div>
        </div>
        <p className="mt-3 text-center text-sm text-white/60">{collections[tab].blurb}</p>

        <div className="mt-12 grid items-start gap-6 lg:grid-cols-12">
          {/* featured piece */}
          <div className="min-w-0 lg:col-span-7">
            <div className="relative overflow-hidden rounded-[32px] border border-lm-gold/30 bg-black/30 p-2 shadow-[0_40px_80px_-40px_rgba(242,185,43,0.45)]">
              <div className="relative aspect-[4/3] overflow-hidden rounded-[26px]">
                <AnimatePresence mode="popLayout">
                  <motion.div
                    key={featured.src}
                    className="absolute inset-0"
                    initial={reduce ? false : { opacity: 0, scale: 1.06 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
                  >
                    <Image src={featured.src} alt={featured.name} fill sizes="(min-width:1024px) 55vw, 95vw" className="object-cover" />
                  </motion.div>
                </AnimatePresence>
                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent p-6 pt-20">
                  <p className="text-xs font-bold uppercase tracking-[0.16em] text-lm-gold">{tab}</p>
                  <p className="display mt-1 text-[clamp(1.6rem,1.2rem+1.4vw,2.4rem)]">{featured.name}</p>
                </div>
              </div>
            </div>
            <ul className="no-scrollbar mt-4 flex gap-3 overflow-x-auto pb-1" aria-label={`${tab} collection`}>
              {pieces.map((p, i) => {
                const on = p.src === featured.src;
                return (
                  <li key={p.src} className="shrink-0">
                    <button
                      onClick={() => {
                        setIdx(i);
                        setPaused(true);
                      }}
                      aria-label={`Show ${p.name}`}
                      aria-pressed={on}
                      className={`group relative block h-[72px] w-[72px] overflow-hidden rounded-2xl border-2 transition-all duration-300 sm:h-[84px] sm:w-[84px] ${
                        on ? "border-lm-gold shadow-[0_0_0_4px_rgba(242,185,43,0.18)]" : "border-white/10 opacity-60 hover:opacity-100"
                      }`}
                    >
                      <Image src={p.src} alt="" fill sizes="84px" className="object-cover transition-transform duration-700 group-hover:scale-110" />
                    </button>
                  </li>
                );
              })}
            </ul>
          </div>

          <div className="flex min-w-0 flex-col justify-center lg:col-span-5 lg:self-stretch">
            <ul className="space-y-3">
              {facts.map(({ icon: Icon, text }) => (
                <li key={text} className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-3 text-[15px] text-white/85">
                  <span className="grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-lm-gold/15 text-lm-gold">
                    <Icon size={18} />
                  </span>
                  {text}
                </li>
              ))}
            </ul>

            <button onClick={openEarlyAccess} className="lm-btn lm-btn-gold lm-shine mt-6 w-full">
              Experience Jewellery <ArrowRight size={18} />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
