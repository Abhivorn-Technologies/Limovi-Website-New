"use client";

import { useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight, Check, ChevronDown, Minus } from "lucide-react";
import { Reveal } from "./primitives";
import { comparisonRows, openEarlyAccess, strategies } from "./data";

// preview = homepage version: cards only, with a link to the full /strategies page
export function Strategies({ preview = false, tableOpen = false }: { preview?: boolean; tableOpen?: boolean }) {
  const [showTable, setShowTable] = useState(tableOpen);
  return (
    <section id="strategies" className="bg-lm-sky py-24 lg:py-32">
      <div className="frame">

        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
          {strategies.map((s, i) => (
            <Reveal key={s.name} i={i}>
              <article
                className={`relative flex h-full flex-col rounded-[28px] p-6 transition-transform duration-300 hover:-translate-y-1.5 ${
                  s.featured ? "bg-lm-navy text-white shadow-2xl" : "bg-white text-lm-navy lm-card"
                }`}
              >
                <h3 className="display text-xl">{s.name}</h3>
                <p className={`mt-2 ${s.featured ? "text-white/75" : "text-lm-muted"}`}>{s.tagline}</p>
                <p className={`mt-5 rounded-2xl px-4 py-3 text-sm ${s.featured ? "bg-white/10" : "bg-lm-sky"}`}>
                  <span className={s.featured ? "text-white/70" : "text-lm-muted"}>Minimum</span>
                  <br />
                  <strong>{s.min}</strong>
                </p>
                <ul className="mt-5 flex-1 space-y-2.5">
                  {s.points.map((p) => (
                    <li key={p} className="flex gap-2 text-[15px]">
                      <Check size={18} className={`mt-0.5 shrink-0 ${s.featured ? "text-lm-gold" : "text-lm-blue"}`} />
                      {p}
                    </li>
                  ))}
                </ul>
                <button onClick={openEarlyAccess} className={`lm-btn mt-6 w-full ${s.featured ? "lm-btn-gold" : "lm-btn-ghost"}`}>
                  Start with this
                </button>
                <Link
                  href={`/legal/${s.slug}`}
                  className={`mt-3 inline-flex items-center justify-center gap-1.5 text-sm font-bold ${s.featured ? "text-white/80 hover:text-white" : "text-lm-blue"}`}
                >
                  Read the agreement <ArrowRight size={15} />
                </Link>
              </article>
            </Reveal>
          ))}
        </div>

        {preview ? (
          <div className="mt-10 text-center">
            <Link
              href="/strategies"
              className="inline-flex items-center gap-2 rounded-full bg-white px-5 py-3 font-bold text-lm-blue shadow-sm hover:bg-lm-sky-2"
            >
              Compare all four strategies <ArrowRight size={18} />
            </Link>
          </div>
        ) : (
          <>
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

            <p className="mx-auto mt-6 max-w-2xl text-center text-sm text-lm-muted">
              A summary only. The strategy agreements, their schedules and the Master Customer &amp; Platform Agreement decide
              your rights and charges.
            </p>

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
                            <th key={s.name} className={`p-4 text-sm font-bold ${s.featured ? "text-lm-blue" : "text-lm-navy"}`}>
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
                                  <span
                                    className="grid h-6 w-6 place-items-center rounded-full bg-emerald-500 text-white"
                                    aria-label="Yes"
                                  >
                                    <Check size={14} strokeWidth={3} />
                                  </span>
                                ) : v === false ? (
                                  <span
                                    className="grid h-6 w-6 place-items-center rounded-full bg-slate-200 text-slate-500"
                                    aria-label="Not in this strategy"
                                  >
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
          </>
        )}
      </div>
    </section>
  );
}
