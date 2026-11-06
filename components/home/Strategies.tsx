"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Check, ChevronDown, Minus } from "lucide-react";
import { Reveal, SectionHead, Stars } from "./primitives";
import { comparisonRows, openEarlyAccess, strategies } from "./data";

export function Strategies() {
  const [showTable, setShowTable] = useState(false);
  return (
    <section id="strategies" className="bg-lm-sky py-24 lg:py-32">
      <div className="frame">
        <SectionHead
          center
          eyebrow="Investment strategies"
          title={<>Four ways to start. <span className="text-lm-blue">Choose yours.</span></>}
          lead="After KYC, you pick a strategy. Each one mixes investing, wearing jewellery and earning in its own way. All of them start from the equivalent of 50g of 24K gold."
        />

        <div className="mt-14 grid gap-5 md:grid-cols-2 xl:grid-cols-4">
          {strategies.map((s, i) => (
            <Reveal key={s.name} i={i}>
              <article
                className={`relative flex h-full flex-col rounded-[28px] p-6 transition-transform duration-300 hover:-translate-y-1.5 ${
                  s.best ? "bg-lm-navy text-white shadow-2xl" : "bg-white text-lm-navy lm-card"
                }`}
              >
                {s.best && (
                  <span className="lm-shine absolute -top-3 left-6 rounded-full bg-lm-gold px-3 py-1 text-xs font-bold text-lm-navy">
                    Best value
                  </span>
                )}
                <h3 className="display text-xl">{s.name}</h3>
                <p className={`mt-2 ${s.best ? "text-white/75" : "text-lm-muted"}`}>{s.tagline}</p>
                <div className="mt-5 flex items-center justify-between">
                  <Stars n={s.score} />
                  <span className={`text-sm font-bold ${s.best ? "text-lm-gold" : "text-lm-blue"}`}>{s.score}/5</span>
                </div>
                <p className={`mt-5 rounded-2xl px-4 py-3 text-sm ${s.best ? "bg-white/10" : "bg-lm-sky"}`}>
                  <span className={s.best ? "text-white/70" : "text-lm-muted"}>Minimum</span>
                  <br />
                  <strong>{s.min}</strong>
                </p>
                <ul className="mt-5 flex-1 space-y-2.5">
                  {s.points.map((p) => (
                    <li key={p} className="flex gap-2 text-[15px]">
                      <Check size={18} className={`mt-0.5 shrink-0 ${s.best ? "text-lm-gold" : "text-lm-blue"}`} />
                      {p}
                    </li>
                  ))}
                </ul>
                <button onClick={openEarlyAccess} className={`lm-btn mt-6 w-full ${s.best ? "lm-btn-gold" : "lm-btn-ghost"}`}>
                  Start with this
                </button>
              </article>
            </Reveal>
          ))}
        </div>

        <div className="mt-10 text-center">
          <button
            onClick={() => setShowTable((v) => !v)}
            className="inline-flex items-center gap-2 rounded-full bg-white px-5 py-3 font-bold text-lm-blue shadow-sm hover:bg-lm-sky-2"
            aria-expanded={showTable}
          >
            {showTable ? "Hide" : "Compare all four"} strategies
            <ChevronDown size={18} className={`transition-transform ${showTable ? "rotate-180" : ""}`} />
          </button>
        </div>

        <AnimatePresence>
          {showTable && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              className="overflow-hidden"
            >
              <div className="mt-8 overflow-x-auto rounded-[28px] bg-white">
                <table className="w-full min-w-[720px] text-left">
                  <thead>
                    <tr className="border-b border-lm-line">
                      <th className="p-4 text-sm font-bold text-lm-muted">Feature</th>
                      {strategies.map((s) => (
                        <th key={s.name} className={`p-4 text-sm font-bold ${s.best ? "text-lm-blue" : "text-lm-navy"}`}>
                          {s.name}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {comparisonRows.map((r) => (
                      <tr key={r.label} className="border-b border-lm-line last:border-0">
                        <td className="p-4 font-semibold text-lm-ink">{r.label}</td>
                        {r.values.map((v, k) => (
                          <td key={k} className={`p-4 ${k === 1 ? "bg-lm-sky/60" : ""}`}>
                            {v === true ? (
                              <span className="grid h-6 w-6 place-items-center rounded-full bg-emerald-500 text-white" aria-label="Yes">
                                <Check size={14} strokeWidth={3} />
                              </span>
                            ) : v === false ? (
                              <span className="grid h-6 w-6 place-items-center rounded-full bg-slate-200 text-slate-500" aria-label="No">
                                <Minus size={14} strokeWidth={3} />
                              </span>
                            ) : (
                              <span className="text-lm-ink">{v}</span>
                            )}
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
