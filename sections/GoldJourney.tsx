"use client";

import { ArrowRight } from "lucide-react";

const existingSteps = [
  { title: "Buy gold jewellery", desc: "Pay 15% – 20% making charges on every purchase.", outcome: "High cost every time." },
  { title: "Keep it locked", desc: "Jewellery stays idle in the locker. No returns. No use.", outcome: "Dead asset. Zero utility." },
  { title: "One jewellery experience", desc: "Limited to enjoying just one piece of jewellery.", outcome: "One jewellery experience." },
  { title: "Need money?", desc: "Go for a gold loan. Limited loan value.", outcome: "Interest & fees. Financial stress." },
  { title: "Repay loan", desc: "EMI, Interest & repayment create ongoing burden.", outcome: "Long process. Stress & obligation." },
  { title: "Redeem or sell", desc: "Sell jewellery or redeem gold after deductions.", outcome: "Deductions, wastage & emotional loss." },
  { title: "Gift old jewellery to next generation", desc: "Pass down old jewellery designs to next generation.", outcome: "Outdated designs. High remaking costs." },
];

const circularMilestones = [
  { title: "Invest in gold", desc: "Build your 24K gold balance at best value with zero wastage." },
  { title: "Unlock ecosystem", desc: "Your gold balance unlocks lifetime membership benefits." },
  { title: "Experience luxury", desc: "Wear premium jewellery anytime without paying making charges again." },
  { title: "Liquidity / loans", desc: "Withdraw cash instantly against your gold balance at prevailing prices." },
  { title: "Grow your wealth", desc: "Your gold grows in value and beats inflation over time + earn everytime with others experience on your jewellery." },
  { title: "Gift & share gold ecosystem", desc: "Gifting a luxury memory to next generation." },
  { title: "Exit on your terms", desc: "Redeem as 24K gold or get money equivalent as per policy or exit with jewellery selected." },
];

const comparisons = [
  { oldLabel: "Cost", oldValue: "15% – 20% making charges", newLabel: "Zero wastage", newValue: "Save 15% – 20% every time" },
  { oldLabel: "Liquidity", oldValue: "Locked or needs loan", newLabel: "Instant access", newValue: "Instant liquidity anytime" },
  { oldLabel: "Returns", oldValue: "No returns, only expense", newLabel: "Wealth growth", newValue: "Gold appreciates & multiplies" },
  { oldLabel: "Experience", oldValue: "Own one, wear only that", newLabel: "Endless experience", newValue: "Experience more, enjoy always" },
  { oldLabel: "One", oldValue: "Restricted to a single piece", newLabel: "Unlimited", newValue: "Access the entire Jewellery Cloud" },
];

export function GoldJourney() {
  return (
    <section className="section bg-[var(--color-bg)] overflow-hidden">
      <div className="frame">
        <div className="grid lg:grid-cols-12 gap-x-8 gap-y-6 items-end">
          <h2 className="lg:col-span-7 display t-head text-[var(--color-ink)]" data-reveal>
            Compare your journey.
          </h2>
          <p className="lg:col-span-5 t-lead text-[var(--color-muted)] max-w-[34ch]" data-reveal style={{ ["--i" as string]: 1 }}>
            Choose the smarter way to grow, enjoy &amp; access your gold.
          </p>
        </div>

        <div className="mt-14 grid lg:grid-cols-2 gap-2">
          {/* The existing journey: a straight line that ends in a locker */}
          <div className="bg-[var(--color-surface)] p-6 sm:p-10 flex flex-col" data-reveal>
            <h3 className="display t-lead text-[var(--color-ink)]">The existing gold journey</h3>
            <p className="font-medium text-[var(--color-muted)] mt-2">Traditional. Costly. Limited.</p>
            <ol className="mt-8 space-y-6 list-decimal pl-6 marker:font-medium marker:text-[var(--color-muted)]">
              {existingSteps.map((s) => (
                <li key={s.title} className="pl-1">
                  <span className="block font-medium text-[var(--color-ink)]">{s.title}</span>
                  <span className="block t-body text-[var(--color-muted)]">{s.desc}</span>
                  <span className="block t-small font-medium text-red-800 mt-1">{s.outcome}</span>
                </li>
              ))}
            </ol>
            <div className="mt-10 lg:mt-auto lg:pt-10">
              <div className="bg-[var(--color-surface-2)] p-6">
                <p className="font-medium text-[var(--color-ink)]">The result</p>
                <p className="t-body text-[var(--color-muted)] mt-1">High cost, Locked wealth, Limited access, Financial stress.</p>
                <p className="t-body font-medium text-[var(--color-ink)] mt-2">You own gold, but gold doesn&apos;t work for you.</p>
              </div>
            </div>
          </div>

          {/* LIMOVI: a loop that comes back round */}
          <div className="bg-[var(--color-field)] text-[var(--color-field-ink)] p-6 sm:p-10 flex flex-col" data-reveal style={{ ["--i" as string]: 1 }}>
            <h3 className="display t-lead">LIMOVI, the gold ecosystem</h3>
            <p className="font-medium text-[var(--color-field-muted)] mt-2">Smart. Integrated. Limitless. Invest once, experience for a lifetime.</p>
            <ol className="mt-8 space-y-6 list-decimal pl-6 marker:font-medium marker:text-[var(--color-field-muted)]">
              {circularMilestones.map((m) => (
                <li key={m.title} className="pl-1">
                  <span className="block font-medium">{m.title}</span>
                  <span className="block t-body text-[var(--color-field-muted)]">{m.desc}</span>
                </li>
              ))}
            </ol>
            <p className="t-small font-medium text-[var(--color-field-muted)] mt-6 flex items-center gap-2">
              <ArrowRight size={16} className="-rotate-90" aria-hidden />
              And back to the start: the balance keeps working.
            </p>
            <div className="mt-10 lg:mt-auto lg:pt-10">
              <div className="bg-[#004C9A] p-6">
                <p className="font-medium">The result</p>
                <p className="t-body text-[var(--color-field-muted)] mt-1">Zero wastage, Active wealth, Instant access, Financial freedom.</p>
                <p className="t-body font-medium mt-2">Your gold works for you, every single day.</p>
              </div>
            </div>
          </div>
        </div>

        {/* Head to head */}
        <div className="mt-16" data-reveal>
          <table className="w-full border-collapse text-left">
            <caption className="sr-only">The existing gold journey compared with LIMOVI</caption>
            <thead>
              <tr className="t-small text-[var(--color-muted)]">
                <th scope="col" className="font-medium pb-4 pr-6 w-1/2">Traditional</th>
                <th scope="col" className="font-medium pb-4 w-1/2 text-[var(--color-field)]">LIMOVI</th>
              </tr>
            </thead>
            <tbody>
              {comparisons.map((c) => (
                <tr key={c.oldLabel} className="border-t border-[var(--color-surface-2)] align-top">
                  <td className="py-5 pr-4 sm:pr-6">
                    <span className="block font-medium text-[var(--color-ink)]">{c.oldLabel}</span>
                    <span className="block t-body text-[var(--color-muted)]">{c.oldValue}</span>
                  </td>
                  <td className="py-5">
                    <span className="block font-medium text-[var(--color-field)]">{c.newLabel}</span>
                    <span className="block t-body text-[var(--color-ink)]">{c.newValue}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}
