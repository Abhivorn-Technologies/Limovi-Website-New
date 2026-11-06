"use client";

import { motion } from "framer-motion";
import { Check, Minus } from "lucide-react";
import { Rays, Reveal } from "./primitives";

const rows = [
  ["Wearing new jewellery", "Buy every piece you want to wear", "Experience pieces and return them within 30 hours"],
  ["Needing a loan", "Take your gold to a lender yourself", "Apply through LIMOVI to a lending partner"],
  ["Needing cash", "Find a buyer for your gold yourself", "Sell eligible gold; credit aimed within an hour of confirmation"],
  ["Earning from gold", "Gold sits idle in a locker", "Owner Benefit when your jewellery is experienced"],
  ["Gifting", "An ornament that may never be worn", "Gift an eligible Gold Balance"],
  ["Storage", "Home or bank locker", "LIMOVI or its Custodian; ownership stays with you"],
];

// Comparison laid out like the reference: a raised, highlighted LIMOVI column
// between the row labels and the traditional way.
export function WhyLimovi() {
  return (
    <section className="relative overflow-hidden bg-lm-paper py-24 lg:py-32">
      <div className="frame grid items-center gap-12 lg:grid-cols-12">
        <Reveal className="lg:col-span-4">
          <p className="text-xs font-bold uppercase tracking-[0.18em] text-lm-blue">Why LIMOVI</p>
          <h2 className="display mt-3 text-[clamp(1.85rem,1.2rem+2.2vw,3rem)] text-lm-navy">How is LIMOVI better?</h2>
          <p className="mt-4 max-w-sm text-lg leading-relaxed text-lm-muted">
            Traditional gold is valuable but stuck. LIMOVI keeps the value and adds what gold couldn&apos;t do before.
          </p>
        </Reveal>

        <div className="lg:col-span-8">
          <div className="no-scrollbar -mx-[var(--margin)] overflow-x-auto px-[var(--margin)] lg:mx-0 lg:px-0">
            <div className="relative grid min-w-[640px] grid-cols-[1fr_1.15fr_1fr] items-stretch py-6">
              {/* labels */}
              <div className="rounded-l-[24px] border border-r-0 border-lm-line bg-white">
                <p className="flex h-[56px] items-end px-5 pb-3 text-xs font-bold uppercase tracking-[0.14em] text-lm-muted">When you&apos;re</p>
                {rows.map(([k]) => (
                  <p key={k} className="flex h-[64px] items-center border-t border-lm-line px-5 text-[15px] font-semibold text-lm-navy">
                    {k}
                  </p>
                ))}
              </div>

              {/* LIMOVI column, raised */}
              <motion.div
                initial={{ y: 30, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                viewport={{ once: true, margin: "-15% 0px" }}
                transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                className="relative z-10 -my-6 overflow-hidden rounded-[28px] bg-lm-navy text-white shadow-[0_30px_60px_-25px_rgba(11,27,58,0.6)]"
              >
                <div className="pointer-events-none absolute -right-20 -top-20 h-60 w-60 text-white/[0.07]">
                  <Rays className="lm-rays h-full w-full" count={24} hole={30} />
                </div>
                <p className="relative flex h-[80px] items-end justify-center px-5 pb-2.5 text-lg font-extrabold tracking-[0.08em]">LIMOVI</p>
                {rows.map(([k, , b], i) => (
                  <motion.p
                    key={k}
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.3 + i * 0.08 }}
                    className="relative flex h-[64px] items-center gap-3 border-t border-white/10 px-5 text-[14px] font-semibold"
                  >
                    <span className="grid h-6 w-6 shrink-0 place-items-center rounded-full bg-lm-gold text-lm-navy">
                      <Check size={14} strokeWidth={3} />
                    </span>
                    {b}
                  </motion.p>
                ))}
              </motion.div>

              {/* traditional */}
              <div className="rounded-r-[24px] border border-l-0 border-lm-line bg-white">
                <p className="flex h-[56px] items-end px-5 pb-3 text-xs font-bold uppercase tracking-[0.14em] text-lm-muted">Traditional gold</p>
                {rows.map(([k, a]) => (
                  <p key={k} className="flex h-[64px] items-center gap-2.5 border-t border-lm-line px-5 text-[14px] text-lm-muted">
                    <Minus size={14} className="shrink-0 text-rose-400" />
                    {a}
                  </p>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
