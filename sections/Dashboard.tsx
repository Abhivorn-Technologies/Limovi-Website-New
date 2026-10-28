"use client";

import { useState } from "react";
import { Check } from "lucide-react";

const STRATEGIES = [
  { title: "Investment Only", desc: "Pure capital appreciation", highlights: [0, 1, 2, 3] },
  { title: "Enroll & Experience", desc: "Bring your existing jewellery", highlights: [0, 1, 2, 3, 4] },
  { title: "Investment & Experience", desc: "Buy new gold, access luxury and more.", highlights: [0, 1, 2, 3, 4] },
  { title: "Experience Only", desc: "Access without ownership", highlights: [0, 1, 2] },
];

const SERVICES = [
  { title: "Luxury Jewellery Cloud", desc: "Unlock premium jewellery experiences through your Gold Balance." },
  { title: "Instant Loans", desc: "Backed instantly by your Gold Balance." },
  { title: "Instant Liquidity", desc: "Convert eligible Gold Balance into cash when needed." },
  { title: "Gift Gold Ecosystem", desc: "Share your Gold Balance and its ecosystem benefits with loved ones." },
  { title: "Wealth Generation", desc: "Generate long-term value from your eligible gold assets." },
];

export function Dashboard() {
  const [hoveredStrategy, setHoveredStrategy] = useState<number | null>(null);

  return (
    <section id="platform" className="section bg-[var(--color-deep)] text-[var(--color-deep-ink)] overflow-hidden">
      <div className="frame">

        <div className="grid lg:grid-cols-12 gap-x-8 gap-y-6 items-end">
          <h2 className="lg:col-span-12 display t-head" data-reveal>
            Your gold. One connected ecosystem.
          </h2>
          <p className="lg:col-start-6 lg:col-span-7 t-body text-[var(--color-deep-muted)] max-w-[56ch]" data-reveal style={{ ["--i" as string]: 1 }}>
            Bring together cash, digital gold, coins, bars and existing jewellery through one unified Gold Balance, designed to connect investment strategies, jewellery experiences, financial access and broader ecosystem benefits.
          </p>
        </div>

        {/* Strategy picker: choosing one shows which services the Gold Balance unlocks */}
        <div className="mt-16 lg:mt-24" data-reveal style={{ ["--i" as string]: 2 }}>
          <h3 className="t-lead font-medium">Investment Strategies</h3>
          <div className="mt-5 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2" role="group" aria-label="Investment strategies">
            {STRATEGIES.map((s, i) => {
              const on = hoveredStrategy === i;
              return (
                <button
                  key={s.title}
                  onMouseEnter={() => setHoveredStrategy(i)}
                  onMouseLeave={() => setHoveredStrategy(null)}
                  onFocus={() => setHoveredStrategy(i)}
                  onBlur={() => setHoveredStrategy(null)}
                  onClick={() => setHoveredStrategy(on ? null : i)}
                  aria-pressed={on}
                  className={`text-left px-6 py-5 cursor-pointer transition-colors duration-200 ${on ? "bg-[var(--color-accent)] text-[var(--color-accent-ink)]" : "bg-[#12233A] hover:bg-[#1A2F4B]"}`}
                >
                  <span className="block font-medium t-body">{s.title}</span>
                  <span className={`block t-small mt-1 ${on ? "text-[var(--color-accent-ink)]" : "text-[var(--color-deep-muted)]"}`}>{s.desc}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Services at poster scale */}
        <div className="mt-16 lg:mt-20">
          <h3 className="t-lead font-medium text-[var(--color-deep-muted)]" data-reveal>Services &amp; Benefits</h3>
          <ul className="mt-6">
            {SERVICES.map((s, i) => {
              const isHighlighted = hoveredStrategy !== null ? STRATEGIES[hoveredStrategy].highlights.includes(i) : false;
              const isDimmed = hoveredStrategy !== null && !isHighlighted;
              return (
                <li
                  key={s.title}
                  className="grid lg:grid-cols-12 gap-x-8 gap-y-2 py-5 lg:py-6 items-baseline"
                  data-reveal
                  style={{ ["--i" as string]: i }}
                >
                  <span className={`lg:col-span-8 display t-head flex items-baseline gap-4 transition-colors duration-300 ${isDimmed ? "text-[var(--color-deep-muted)]" : "text-[var(--color-deep-ink)]"}`}>
                    {s.title}
                    <Check
                      aria-hidden
                      size={28}
                      strokeWidth={3}
                      className={`shrink-0 self-center text-[var(--color-accent)] transition-[opacity,transform] duration-300 ${isHighlighted ? "opacity-100 scale-100" : "opacity-0 scale-50"}`}
                    />
                  </span>
                  <span className="lg:col-span-4 t-body text-[var(--color-deep-muted)] max-w-[40ch]">
                    {s.desc}
                    {hoveredStrategy !== null && (
                      <span className="sr-only">{isHighlighted ? " Included." : " Not included."}</span>
                    )}
                  </span>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </section>
  );
}
