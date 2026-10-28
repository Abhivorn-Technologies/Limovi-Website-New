"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useEffect, useRef } from "react";
import { ArrowRight } from "lucide-react";

const BENEFITS = [
  { title: "Experience More", text: "Access eligible jewellery experiences for life’s meaningful moments." },
  { title: "Unlock Flexibility", text: "Explore supported financial possibilities within the ecosystem." },
  { title: "Create Lasting Value", text: "Give access to benefits designed to extend beyond a one-time gift." },
];

const giftMask = {
  maskImage: "url(/images/gifting-eco.png)",
  WebkitMaskImage: "url(/images/gifting-eco.png)",
  maskSize: "contain",
  WebkitMaskSize: "contain",
  maskRepeat: "no-repeat",
  WebkitMaskRepeat: "no-repeat",
  maskPosition: "center",
  WebkitMaskPosition: "center",
} as const;

export function GiftGold() {
  const ref = useRef<HTMLElement>(null);
  const still = useRef(false);
  useEffect(() => {
    still.current = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  }, []);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const rotate = useTransform(scrollYProgress, (v) => (still.current ? -2 : -4 + 4 * v));
  const y = useTransform(scrollYProgress, (v) => (still.current ? 0 : 20 - 40 * v));

  return (
    <section id="gift-gold" ref={ref} className="section bg-[var(--color-deep)] text-[var(--color-deep-ink)] overflow-x-clip">
      <div className="frame grid lg:grid-cols-12 gap-x-8 gap-y-16 items-center">

        <div className="lg:col-span-6">
          <h2 className="display t-head" data-reveal style={{ ["--i" as string]: 1 }}>
            Give gold more meaning.
          </h2>
          <p className="t-lead text-[var(--color-deep-muted)] mt-6 max-w-[44ch]" data-reveal style={{ ["--i" as string]: 2 }}>
            Gift the LIMOVI ecosystem. Transform gifting into something more enduring. Give your loved ones access to a connected gold ecosystem designed to bring together value, curated jewellery experiences and greater flexibility, creating possibilities that extend well beyond the occasion.
          </p>

          <dl className="mt-10 space-y-6">
            {BENEFITS.map((b, i) => (
              <div key={b.title} data-reveal style={{ ["--i" as string]: i + 3 }}>
                <dt className="t-lead font-medium">{b.title}</dt>
                <dd className="t-body text-[var(--color-deep-muted)] mt-1">{b.text}</dd>
              </div>
            ))}
          </dl>

          <button
            onClick={() => window.dispatchEvent(new CustomEvent("open-early-access-modal"))}
            className="btn btn-accent group mt-12"
            data-reveal
            style={{ ["--i" as string]: 6 }}
          >
            Gold Balance Gift
            <ArrowRight size={18} className="transition-transform duration-200 group-hover:translate-x-1" />
          </button>
        </div>

        {/* The gift card, completely unclipped during zoom & shadow */}
        <div className="lg:col-span-6 flex justify-center lg:justify-end items-center relative py-10 px-2 sm:px-4 overflow-visible" data-reveal style={{ ["--i" as string]: 2 }}>
          <motion.div
            style={{ rotate, y }}
            className="w-full max-w-[500px] overflow-visible"
          >
            <motion.div
              whileHover={{ scale: 1.055, y: -8 }}
              whileTap={{ scale: 0.98 }}
              transition={{ type: "spring", stiffness: 320, damping: 22 }}
              className="group relative w-full aspect-[1.586/1] rounded-[22px] sm:rounded-[26px] p-[6%] sm:p-[7%] flex flex-col justify-between cursor-pointer select-none border border-[#FFE8A3]/50 bg-gradient-to-br from-[#F7DC8A] via-[#DFB44B] to-[#B38728] shadow-[0_20px_50px_-12px_rgba(0,0,0,0.6),0_0_20px_rgba(212,175,55,0.18)] transition-shadow duration-500 hover:shadow-[0_35px_80px_-15px_rgba(212,175,55,0.55),0_0_50px_rgba(255,225,120,0.35)]"
              role="img"
              aria-label="A LIMOVI Gold Balance gift card: 50.00 grams of 24K gold, to Priya Sharma"
            >
              {/* Inner sheen and watermark clipped neatly inside card radius */}
              <div className="absolute inset-0 rounded-[22px] sm:rounded-[26px] overflow-hidden pointer-events-none">
                <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-out bg-gradient-to-r from-transparent via-white/35 to-transparent pointer-events-none" />
                <div className="absolute -right-8 -bottom-8 w-48 h-48 opacity-10 pointer-events-none" style={giftMask} />
              </div>

              {/* Header */}
              <div className="relative z-10 flex items-center justify-between">
                <div className="flex items-center gap-2.5 sm:gap-3">
                  <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-[#07111F] flex items-center justify-center shrink-0 shadow-md">
                    <span className="w-5 h-5 sm:w-6 sm:h-6 bg-[#F7DC8A]" style={giftMask} />
                  </div>
                  <span className="display text-[clamp(0.85rem,1.2vw,1.15rem)] text-[#07111F] font-bold tracking-tight">
                    LIMOVI Gold Ecosystem
                  </span>
                </div>
                <span className="text-[clamp(0.6875rem,0.9vw,0.8125rem)] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full bg-[#07111F]/10 text-[#07111F] border border-[#07111F]/15 backdrop-blur-xs">
                  24K • 999 Purity
                </span>
              </div>

              {/* Body */}
              <div className="relative z-10 my-auto pt-2">
                <span className="block text-[clamp(0.75rem,1vw,0.95rem)] font-bold uppercase tracking-[0.2em] text-[#07111F]/70">
                  Gold Balance
                </span>
                <div className="flex items-baseline gap-2 sm:gap-3 mt-1">
                  <span className="display text-[clamp(2.75rem,6.5vw,5.5rem)] font-black text-[#07111F] tabular leading-none tracking-tight">
                    50.00g
                  </span>
                  <span className="display text-[clamp(1.1rem,2vw,1.75rem)] font-bold text-[#07111F]/80">
                    24K
                  </span>
                </div>
              </div>

              {/* Footer */}
              <div className="relative z-10 flex items-end justify-between border-t border-[#07111F]/15 pt-3 sm:pt-4">
                <div>
                  <span className="block text-[clamp(0.65rem,0.8vw,0.75rem)] uppercase tracking-wider text-[#07111F]/60 font-semibold">
                    Recipient
                  </span>
                  <span className="block font-bold text-[clamp(0.9rem,1.3vw,1.25rem)] text-[#07111F]">
                    To: Priya Sharma
                  </span>
                </div>
                <span className="text-[clamp(0.6875rem,0.85vw,0.8rem)] font-medium text-[#07111F]/70">
                  Digital Asset Voucher
                </span>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
