"use client";

import { useEffect } from "react";
import { useLenis } from "lenis/react";
import Image from "next/image";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight, X } from "lucide-react";
import { openEarlyAccess, strategies, strategyJourneys, strategyTheme } from "./data";

type Strategy = (typeof strategies)[number];

// Small stacked thumbnails used on the card as a teaser for the walkthrough.
export function JourneyThumbs({ name }: { name: string }) {
  return (
    <span className="flex shrink-0 -space-x-3">
      {strategyJourneys[name].steps.slice(0, 3).map((st) => (
        <span key={st.title} className="relative h-8 w-8 overflow-hidden rounded-full border-2 border-white bg-white">
          <Image src={st.img} alt="" fill sizes="32px" unoptimized className={st.photo ? "object-cover" : "object-contain p-0.5"} />
        </span>
      ))}
    </span>
  );
}

// Full walkthrough: picture steps joined by arrows, then a short plan summary.
export function StrategyJourney({ s, index, onClose }: { s: Strategy | null; index: number; onClose: () => void }) {
  const lenis = useLenis();
  useEffect(() => {
    if (!s) return;
    lenis?.stop();
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      lenis?.start();
      window.removeEventListener("keydown", onKey);
    };
  }, [s, onClose, lenis]);

  return (
    <AnimatePresence>
      {s && (
        <motion.div
          key="overlay"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[1000] flex items-end justify-center bg-lm-navy/60 p-0 backdrop-blur-sm sm:items-center sm:p-6"
          onClick={onClose}
          role="dialog"
          aria-modal="true"
          aria-label={`How ${s.name} works`}
        >
          <motion.div
            initial={{ y: 60, opacity: 0, scale: 0.97 }}
            animate={{ y: 0, opacity: 1, scale: 1 }}
            exit={{ y: 40, opacity: 0 }}
            transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
            onClick={(e) => e.stopPropagation()}
            data-lenis-prevent
            className="relative max-h-[92vh] w-full max-w-6xl overflow-y-auto overscroll-contain rounded-t-[32px] bg-white sm:rounded-[32px]"
          >
            <Journey s={s} index={index} onClose={onClose} />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function Journey({ s, index, onClose }: { s: Strategy; index: number; onClose: () => void }) {
  const t = strategyTheme[s.name];
  const j = strategyJourneys[s.name];
  return (
    <>
      <span className={`sticky top-0 z-10 block h-2 ${t.band}`} />
      <div className="p-6 sm:p-10">
        <div className="flex items-start justify-between gap-4">
          <div>
            <span className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[11px] font-bold uppercase tracking-[0.12em] ${t.soft} ${t.text}`}>
              <span className={`h-2 w-2 rounded-full ${t.dot}`} />
              Strategy {index + 1} · How it works
            </span>
            <h3 className={`display mt-3 text-[clamp(1.6rem,1.2rem+1.6vw,2.5rem)] ${t.text}`}>{s.name}</h3>
            <p className="mt-1 text-lg text-lm-muted">{s.tagline}</p>
          </div>
          <button
            onClick={onClose}
            aria-label="Close"
            className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-lm-sky text-lm-navy transition-colors hover:bg-lm-sky-2"
          >
            <X size={20} />
          </button>
        </div>

        <ol className="mt-8 grid gap-4 md:grid-cols-4 md:gap-5">
          {j.steps.map((st, i) => (
            <motion.li
              key={st.title}
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15 + i * 0.12, duration: 0.5 }}
              className="relative flex gap-4 md:block"
            >
              {i < j.steps.length - 1 && (
                <motion.span
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ delay: 0.4 + i * 0.12, duration: 0.5 }}
                  className="absolute -right-5 top-[64px] z-10 hidden h-0.5 w-5 origin-left md:block"
                  style={{ background: t.hex }}
                  aria-hidden
                />
              )}
              <div className={`relative aspect-square w-28 shrink-0 overflow-hidden rounded-[24px] md:w-full md:max-h-[200px] ${st.photo ? "bg-lm-cream" : "bg-white ring-1 ring-lm-line"}`}>
                <Image
                  src={st.img}
                  alt=""
                  fill
                  sizes="(min-width:768px) 22vw, 112px"
                  unoptimized
                  priority
                  className={st.photo ? "object-cover" : "object-contain p-4"}
                />
                <span
                  className="absolute left-2.5 top-2.5 grid h-8 w-8 place-items-center rounded-full text-sm font-extrabold text-white shadow"
                  style={{ background: t.hex }}
                >
                  {i + 1}
                </span>
              </div>
              <div className="md:mt-4">
                <p className="text-lg font-bold text-lm-navy">{st.title}</p>
                <p className="mt-1 text-[15px] leading-relaxed text-lm-muted">{st.text}</p>
              </div>
            </motion.li>
          ))}
        </ol>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
          className={`mt-8 rounded-[24px] p-5 sm:p-6 ${t.soft}`}
        >
          <p className={`text-xs font-bold uppercase tracking-[0.16em] ${t.text}`}>Plan it at a glance</p>
          <dl className="mt-4 grid gap-3 sm:grid-cols-3">
            {j.plan.map(([k, v]) => (
              <div key={k} className="rounded-2xl bg-white p-4">
                <dt className="text-sm text-lm-muted">{k}</dt>
                <dd className="mt-1 font-bold leading-snug text-lm-navy">{v}</dd>
              </div>
            ))}
          </dl>
        </motion.div>

        <div className="mt-6 flex flex-col items-center gap-3 sm:flex-row sm:justify-between">
          <p className="text-sm text-lm-muted">A summary only. The strategy agreement and its schedule apply.</p>
          <div className="flex w-full flex-col gap-2 sm:w-auto sm:flex-row">
            <Link href={`/legal/${s.slug}`} className="lm-btn lm-btn-ghost">
              Read the agreement
            </Link>
            <button
              onClick={() => {
                onClose();
                openEarlyAccess();
              }}
              className="lm-btn lm-btn-blue"
            >
              Start with this <ArrowRight size={16} />
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
