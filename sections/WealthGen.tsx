"use client";

import Image from "next/image";

// One piece, three stages: the same necklace grows as it earns
const STAGES = [
  {
    name: "Registered with the Cloud",
    text: "Your gold powers our Luxury Jewellery Cloud securely.",
    facts: [
      { label: "Registered Date", value: "27 July 2026" },
      { label: "Gold Asset", value: "50.00g (24K) Necklace" },
      { label: "Gold Asset Value", value: "₹ 7,20,000" },
    ],
    tile: "lg:col-span-3 lg:row-start-2",
    height: "h-[34vw] lg:h-[30vh]",
    scale: 1,
  },
  {
    name: "Experienced by others",
    text: "Each experience is charged at 0.9% of the Gold Asset Value.",
    facts: [
      { label: "Experience Value", value: "₹ 6,480 / Exp" },
    ],
    tile: "lg:col-start-4 lg:col-span-4 lg:row-start-2",
    height: "h-[46vw] lg:h-[44vh]",
    scale: 1.25,
  },
  {
    name: "Paid back to you",
    text: "Receive a 25% commercial dividend on every experience charge generated.",
    facts: [
      { label: "Your Dividend (25% of Gold Experience Value)", value: "+ ₹ 1,620 / Exp" },
      { label: "Total Wealth Generated (Minimum 5 Experiences)", value: "₹ 8,100 / Year" },
    ],
    tile: "lg:col-start-8 lg:col-span-5 lg:row-start-1 lg:row-span-2",
    height: "h-[62vw] lg:h-[60vh]",
    scale: 1.55,
  },
];

export function WealthGen() {
  return (
    <section id="wealth" className="section bg-[var(--color-bg)] overflow-hidden">
      <div className="frame grid grid-cols-1 lg:grid-cols-12 gap-x-[10px] gap-y-12 lg:gap-y-8 items-end">

        <div className="lg:col-span-7 lg:row-start-1 self-start lg:pr-10">
          <h2 className="display t-head text-[var(--color-ink)]" data-reveal>
            Grow wealth, not just grams.
          </h2>
          <p className="t-lead text-[var(--color-ink)] mt-6 max-w-[40ch]" data-reveal style={{ ["--i" as string]: 1 }}>
            Your gold shouldn&apos;t just sit in a locker. Turn a passive ornament into a dividend-paying asset with our Circular Economy, earning up to a <strong className="font-medium text-[var(--color-field)]">25% commercial dividend</strong>.
          </p>
          <p className="t-small text-[var(--color-muted)] mt-6" data-reveal style={{ ["--i" as string]: 2 }}>
            Dividend Payout, a commercial dividend example.
          </p>
        </div>

        {STAGES.map((st, i) => (
          <div key={st.name} className={`self-end ${st.tile}`} data-reveal style={{ ["--i" as string]: i + 1 }}>
            <div className={`relative overflow-hidden bg-black ${st.height}`}>
              <Image
                src="/images/necklace.png"
                alt={i === 0 ? "A 50 gram gold necklace registered with LIMOVI" : ""}
                fill
                sizes="(min-width: 1024px) 40vw, 100vw"
                className="object-cover"
                style={{ objectPosition: "50% 45%", transform: `scale(${st.scale})` }}
              />
            </div>
            <div className="pt-5 lg:pr-4 lg:min-h-[12.5rem]">
              <h3 className="t-lead font-medium text-[var(--color-ink)]">{st.name}</h3>
              <p className="t-body text-[var(--color-muted)] mt-1 max-w-[38ch]">{st.text}</p>
              <dl className="mt-4 space-y-1.5 tabular">
                {st.facts.map((f) => (
                  <div key={f.label} className="flex flex-wrap items-baseline justify-between gap-x-4">
                    <dt className="t-small text-[var(--color-muted)]">{f.label}</dt>
                    <dd className={`font-medium ${i === 2 ? "text-emerald-800" : "text-[var(--color-ink)]"}`}>{f.value}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
