"use client";

import { useRef, useState, useEffect, type ReactNode } from "react";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight, Minus, Plus, Clock, Landmark, Check, Gift, Vault, ArrowRight } from "lucide-react";
import { Reveal } from "./primitives";

type Feature = { title: string; body: string; tint: string; widget: ReactNode };

// Facts from the strategy agreements, the Gold Liquidity terms and the Master
// Customer & Platform Agreement (see /legal).
const features: Feature[] = [
  {
    title: "Start from ₹100",
    body: "Buy Digital Gold from ₹100 and build your Gold Balance over time.",
    tint: "from-lm-sand to-[#FFF4D6]",
    widget: (
      <div className="flex items-center justify-between rounded-2xl bg-white px-3 py-3 shadow-sm">
        <span className="grid h-7 w-7 place-items-center rounded-full bg-lm-sky text-lm-blue"><Minus size={14} /></span>
        <span className="text-xl font-extrabold text-lm-navy">₹100</span>
        <span className="grid h-7 w-7 place-items-center rounded-full bg-lm-blue text-white"><Plus size={14} /></span>
      </div>
    ),
  },
  {
    title: "Wear it, then return it",
    body: "Experience a piece from the Jewellery Cloud and return it within 30 hours of delivery.",
    tint: "from-lm-sky to-[#E4EEFF]",
    widget: (
      <div className="flex items-center gap-3 rounded-2xl bg-white px-3 py-3 shadow-sm">
        <span className="grid h-10 w-10 place-items-center rounded-xl bg-lm-gold/20 text-lm-gold-deep"><Clock size={18} /></span>
        <span>
          <span className="block text-[11px] font-semibold text-lm-muted">Return within</span>
          <span className="block text-lg font-extrabold text-lm-navy">30 hours</span>
        </span>
      </div>
    ),
  },
  {
    title: "Loans through a partner",
    body: "Apply for a gold loan through a lending partner. LIMOVI facilitates; the lender decides.",
    tint: "from-lm-sand to-[#FFF4D6]",
    widget: (
      <div className="flex items-center justify-between gap-2 rounded-2xl bg-white px-3 py-3 text-[13px] font-bold text-lm-navy shadow-sm">
        <span className="rounded-lg bg-lm-sky px-2 py-1 text-lm-blue">LIMOVI</span>
        <ArrowRight size={14} className="text-lm-muted" />
        <span className="flex items-center gap-1 rounded-lg bg-lm-navy px-2 py-1 text-white"><Landmark size={12} /> Lender</span>
      </div>
    ),
  },
  {
    title: "Cash when you need it",
    body: "Sell eligible gold. LIMOVI aims to credit your verified bank account within an hour of confirmation.",
    tint: "from-lm-sky to-[#E4EEFF]",
    widget: (
      <div className="flex items-center gap-3 rounded-2xl bg-white px-3 py-3 shadow-sm">
        <span className="grid h-10 w-10 place-items-center rounded-full bg-emerald-500 text-white"><Check size={18} /></span>
        <span>
          <span className="block text-[11px] font-semibold text-lm-muted">Bank account</span>
          <span className="block text-sm font-extrabold text-lm-navy">Proceeds credited</span>
        </span>
      </div>
    ),
  },
  {
    title: "Earn from your jewellery",
    body: "Earn an Owner Benefit of 25% of qualifying Experience Charges when others experience your piece.",
    tint: "from-lm-sand to-[#FFF4D6]",
    widget: (
      <div className="flex items-center gap-3 rounded-2xl bg-white px-3 py-3 shadow-sm">
        <svg viewBox="0 0 36 36" className="h-11 w-11 -rotate-90">
          <circle cx="18" cy="18" r="15" fill="none" stroke="#EEF5FF" strokeWidth="5" />
          <circle cx="18" cy="18" r="15" fill="none" stroke="#F2B92B" strokeWidth="5" strokeDasharray="23.6 94.2" strokeLinecap="round" />
        </svg>
        <span>
          <span className="block text-[11px] font-semibold text-lm-muted">Owner Benefit</span>
          <span className="block text-lg font-extrabold text-lm-navy">25%</span>
        </span>
      </div>
    ),
  },
  {
    title: "Gift gold",
    body: "Gift an eligible Gold Balance to someone once they complete KYC and accept it.",
    tint: "from-lm-sky to-[#E4EEFF]",
    widget: (
      <div className="flex items-center gap-3 rounded-2xl bg-white px-3 py-3 shadow-sm">
        <span className="grid h-10 w-10 place-items-center rounded-xl bg-rose-100 text-rose-500"><Gift size={18} /></span>
        <span>
          <span className="block text-[11px] font-semibold text-lm-muted">Gold gift</span>
          <span className="block text-sm font-extrabold text-lm-navy">Waiting to be accepted</span>
        </span>
      </div>
    ),
  },
  {
    title: "Still yours in custody",
    body: "Jewellery held by LIMOVI or its Custodian stays your property. Custody is not a sale.",
    tint: "from-lm-sand to-[#FFF4D6]",
    widget: (
      <div className="flex items-center gap-3 rounded-2xl bg-white px-3 py-3 shadow-sm">
        <span className="grid h-10 w-10 place-items-center rounded-xl bg-lm-navy text-lm-gold"><Vault size={18} /></span>
        <span>
          <span className="block text-[11px] font-semibold text-lm-muted">Owner</span>
          <span className="block text-sm font-extrabold text-lm-navy">You</span>
        </span>
      </div>
    ),
  },
];

export function FeatureCarousel() {
  const track = useRef<HTMLUListElement>(null);
  const [edge, setEdge] = useState({ start: true, end: false });

  const update = () => {
    const el = track.current;
    if (!el) return;
    setEdge({ start: el.scrollLeft < 8, end: el.scrollLeft + el.clientWidth > el.scrollWidth - 8 });
  };
  useEffect(() => {
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  const go = (dir: 1 | -1) => {
    const el = track.current;
    if (!el) return;
    const card = el.querySelector("li");
    el.scrollBy({ left: dir * ((card?.clientWidth ?? 300) + 16), behavior: "smooth" });
  };

  return (
    <section className="overflow-hidden bg-lm-paper py-20 lg:py-28">
      <div className="frame">
        <div className="flex items-end justify-between gap-6">
          <Reveal>
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-lm-blue">One Gold Balance</p>
            <h2 className="display mt-3 text-[clamp(1.85rem,1.2rem+2.2vw,3rem)] text-lm-navy">Everything your gold can do</h2>
          </Reveal>
          <div className="flex shrink-0 gap-2">
            {([-1, 1] as const).map((d) => (
              <button
                key={d}
                onClick={() => go(d)}
                disabled={d === -1 ? edge.start : edge.end}
                aria-label={d === -1 ? "Previous" : "Next"}
                className="grid h-11 w-11 place-items-center rounded-full border border-lm-line bg-white text-lm-navy transition-all hover:border-lm-blue hover:text-lm-blue disabled:opacity-35"
              >
                {d === -1 ? <ChevronLeft size={20} /> : <ChevronRight size={20} />}
              </button>
            ))}
          </div>
        </div>
      </div>

      <ul
        ref={track}
        onScroll={update}
        className="no-scrollbar mt-10 flex snap-x snap-mandatory gap-4 overflow-x-auto scroll-smooth px-[var(--margin)] pb-4 [scroll-padding-inline:var(--margin)] xl:px-[max(var(--margin),calc((100vw-1440px)/2+var(--margin)))]"
      >
        {features.map((f, i) => (
          <motion.li
            key={f.title}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: Math.min(i, 4) * 0.08 }}
            className="w-[78vw] max-w-[300px] shrink-0 snap-start"
          >
            <div className={`group flex h-full min-h-[320px] flex-col rounded-[28px] bg-gradient-to-b ${f.tint} p-6 transition-transform duration-500 hover:-translate-y-1.5`}>
              <h3 className="text-lg font-bold text-lm-navy">{f.title}</h3>
              <p className="mt-2 text-[14px] leading-relaxed text-lm-muted">{f.body}</p>
              <div className="mt-auto pt-8 transition-transform duration-500 group-hover:scale-[1.03]">{f.widget}</div>
            </div>
          </motion.li>
        ))}
      </ul>
    </section>
  );
}
