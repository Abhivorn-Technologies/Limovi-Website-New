import { Check, X } from "lucide-react";
import { Reveal, SectionHead, Rays } from "./primitives";

const rows = [
  ["Wearing new jewellery", "Buy every piece and pay making charges each time", "Experience pieces from the Jewellery Cloud"],
  ["Needing a loan", "Branch visits, paperwork and gold checks", "Fully digital, up to 75% LTV via RBI-regulated NBFCs"],
  ["Needing cash", "Sell to a jeweller at their price", "Live MCX spot rate, settled within minutes"],
  ["Earning from gold", "Gold sits idle in a locker", "Earn dividends when your enrolled piece is worn"],
  ["Gifting", "An ornament that may never be worn", "A living Gold Balance with all LIMOVI benefits"],
  ["Storage", "Home or bank locker, your risk", "Insured vault, insured shipping to your door"],
];

export function WhyLimovi() {
  return (
    <section className="relative overflow-hidden bg-white py-24 lg:py-32">
      <div className="frame">
        <SectionHead
          center
          eyebrow="Why LIMOVI"
          title={<>How is LIMOVI <span className="text-lm-blue">better?</span></>}
          lead="Traditional gold is valuable but stuck. LIMOVI keeps the value and adds everything gold couldn't do before."
        />

        <Reveal i={1} className="mt-14">
          <div className="overflow-hidden rounded-[32px] border border-lm-line">
            <div className="grid grid-cols-[1.1fr_1fr_1.2fr] bg-lm-sky text-sm font-bold sm:text-base">
              <div className="p-4 sm:p-6 text-lm-muted">When you&apos;re…</div>
              <div className="p-4 sm:p-6 text-lm-muted">Traditional gold</div>
              <div className="relative overflow-hidden bg-lm-blue p-4 text-white sm:p-6">
                <Rays className="lm-rays absolute -right-10 -top-10 h-32 w-32 text-white/15" count={20} />
                <span className="relative">With LIMOVI</span>
              </div>
            </div>
            {rows.map(([k, a, b], i) => (
              <Reveal key={k} i={i} y={12}>
                <div className="grid grid-cols-[1.1fr_1fr_1.2fr] border-t border-lm-line text-[14px] sm:text-base">
                  <div className="p-4 font-bold text-lm-navy sm:p-6">{k}</div>
                  <div className="flex gap-2 p-4 text-lm-muted sm:p-6">
                    <X size={18} className="mt-0.5 hidden shrink-0 text-rose-400 sm:block" />
                    {a}
                  </div>
                  <div className="flex gap-2 bg-lm-sky/50 p-4 font-semibold text-lm-ink sm:p-6">
                    <Check size={18} className="mt-0.5 hidden shrink-0 text-emerald-500 sm:block" />
                    {b}
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
