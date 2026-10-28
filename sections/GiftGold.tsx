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
  const rotate = useTransform(scrollYProgress, (v) => (still.current ? -6 : -11 + 9 * v));
  const y = useTransform(scrollYProgress, (v) => (still.current ? 0 : 60 - 120 * v));

  return (
    <section id="gift-gold" ref={ref} className="section bg-[var(--color-deep)] text-[var(--color-deep-ink)] overflow-hidden">
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

        {/* The gift itself, large and cropped by the edge */}
        <div className="lg:col-span-6 relative -mr-[var(--margin)] lg:-mr-[12vw]" data-reveal style={{ ["--i" as string]: 2 }}>
          <motion.div
            style={{ rotate, y }}
            className="relative w-[110%] sm:w-full aspect-[1.6/1] bg-[var(--color-accent)] text-[var(--color-accent-ink)] p-[6%] flex flex-col justify-between"
            role="img"
            aria-label="A LIMOVI Gold Balance gift card: 50.00 grams of 24K gold, to Priya Sharma"
          >
            <div className="flex items-center gap-3">
              <span className="w-[9%] aspect-square bg-[var(--color-ink)] shrink-0" style={giftMask} />
              <span className="display text-[clamp(0.8125rem,1.2vw,1.125rem)] tracking-normal">LIMOVI Gold Ecosystem</span>
            </div>
            <div>
              <span className="block font-medium text-[clamp(0.8125rem,1.2vw,1.125rem)]">Gold Balance</span>
              <span className="flex items-baseline gap-3 mt-1">
                <span className="display text-[clamp(2.5rem,7vw,7rem)] tabular leading-none">50.00g</span>
                <span className="display text-[clamp(1rem,2vw,1.75rem)]">24K</span>
              </span>
              <span className="block font-medium mt-3 text-[clamp(0.8125rem,1.3vw,1.25rem)]">To: Priya Sharma</span>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
