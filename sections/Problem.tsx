"use client";

import Image from "next/image";

const SIDES = [
  {
    title: "Digital Gold",
    caption: "Convenient, but limited to value holding",
    image: "/images/digital_gold_app_icon.png",
    alt: "Digital gold app icon",
    points: [
      "Cannot be worn, displayed or experienced as jewellery",
      "Buying and selling may involve spreads, taxes and provider-specific charges",
      "Physical redemption or delivery may involve additional costs and conditions",
      "Offers limited connection to jewellery and lifestyle experiences",
    ],
    verdict: "Value Without Experience",
    verdictText: "Digital gold preserves your capital, but lacks any physical or lifestyle utility.",
  },
  {
    title: "Physical Jewellery",
    caption: "Meaningful to own, but less flexible",
    image: "/images/jewellry.png",
    alt: "Gold jewellery set",
    points: [
      "Making and wastage charges can increase the overall cost of ownership",
      "Often remains stored when not being worn, limiting everyday utility",
      "Accessing liquidity may involve valuation, documentation or additional processes",
      "Every style change may involve value depreciation, exchange deductions and new making charges",
      "Value remains tied to a specific piece, design and ownership journey",
    ],
    verdict: "One Experience With Limited Flexibility",
    verdictText: "You enjoy one jewellery, and its broader financial utility may remain constrained.",
  },
];

export function Problem() {
  return (
    <section className="section bg-[var(--color-bg)] overflow-hidden">
      <div className="frame">
        <h2 className="display t-display text-[var(--color-ink)] max-w-[14ch]" data-reveal>
          The gold ownership gap
        </h2>

        <div className="mt-8 grid lg:grid-cols-12 gap-x-8 gap-y-8 items-start">
          <p className="lg:col-span-7 t-lead text-[var(--color-ink)] max-w-[52ch]" data-reveal style={{ ["--i" as string]: 1 }}>
            Gold has always been a store of value and a symbol of experience, but rarely both at the same time. You either invest for the future or own jewellery to enjoy today. This fragmented approach limits your gold to a single purpose, leaving its broader potential untapped.
          </p>
          <div className="lg:col-span-5 grid grid-cols-2 gap-8" data-reveal style={{ ["--i" as string]: 2 }}>
            {SIDES.map((s) => (
              <p key={s.title} className="t-small text-[var(--color-muted)] max-w-[22ch]">
                <span className="block font-medium text-[var(--color-ink)]">{s.title}</span>
                {s.caption}
              </p>
            ))}
          </div>
        </div>

        {/* The two objects, side by side on one flat panel */}
        <div className="mt-14 grid grid-cols-2 bg-[var(--color-tile)] overflow-hidden" data-reveal="open">
          {SIDES.map((s, i) => (
            <figure key={s.title} className="relative aspect-[4/5] sm:aspect-[21/16] lg:aspect-[21/13] m-0">
              <Image
                src={s.image}
                alt={s.alt}
                fill
                sizes="50vw"
                className={`object-contain mix-blend-multiply ${i === 0 ? "p-[16%] sm:p-[18%]" : "p-[6%] scale-110"}`}
              />
              <figcaption className="absolute left-4 sm:left-8 bottom-4 sm:bottom-7 t-small font-medium text-[var(--color-ink)]">
                {s.title}
              </figcaption>
            </figure>
          ))}
        </div>

        {/* What each one costs you */}
        <div className="mt-16 grid md:grid-cols-2 gap-x-16 gap-y-14">
          {SIDES.map((s, i) => (
            <div key={s.title} className="flex flex-col" data-reveal style={{ ["--i" as string]: i }}>
              <h3 className="t-lead font-medium text-[var(--color-ink)]">{s.title}</h3>
              <ul className="mt-5 space-y-3 t-body text-[var(--color-ink)] list-disc pl-5 marker:text-[var(--color-accent)]">
                {s.points.map((p) => (
                  <li key={p}>{p}</li>
                ))}
              </ul>
              <div className="mt-8 md:mt-auto pt-0 md:pt-8">
                <div className="bg-[var(--color-surface)] px-6 py-5">
                  <h4 className="font-medium text-[var(--color-ink)]">{s.verdict}</h4>
                  <p className="t-body text-[var(--color-muted)] mt-1">{s.verdictText}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
