"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Check, Gem, Landmark, Banknote, TrendingUp, Gift, ScanFace, CreditCard, IdCard, Building2, UserRound } from "lucide-react";
import { Phone, Coin } from "./primitives";

// Every line below is taken from the LIMOVI Master Customer & Platform Agreement
// and the strategy agreements (see /legal).
const steps = [
  {
    n: "01",
    title: "Register and complete KYC",
    body: "Create your account and complete the KYC and verification that applies to the service you choose: identity, ownership, source of funds and source of gold.",
    note: "Keep your OTPs and passwords to yourself, and tell LIMOVI within 24 hours if you see a transaction you didn't authorise.",
  },
  {
    n: "02",
    title: "Pick the strategy that fits you",
    body: "Choose from four strategies: Investment Only, Investment & Experience, Enrol & Experience, or Experience Only. Each one has its own agreement that sets out what you get, what it costs and how you exit.",
    note: "Every strategy agreement is read together with the Master Customer & Platform Agreement.",
  },
  {
    n: "03",
    title: "Build your Gold Balance",
    body: "Buy Digital Gold from ₹100, add gold, coins, bars or jewellery where your strategy allows it, enrol jewellery you already own, or receive a gift. Every credit and debit is recorded in your account.",
    note: "Gold prices move. A value shown on screen isn't a guarantee of what your gold will realise.",
  },
  {
    n: "04",
    title: "Use your Gold Balance",
    body: "Once you meet the eligibility for a service, your Gold Balance opens the Jewellery Cloud, gold loans through a lending partner, Gold Liquidity, Owner Benefit and gifting.",
    note: "Your statements and transaction records are available in your account.",
  },
];

export function HowItWorks() {
  const [active, setActive] = useState(0);
  const refs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActive(Number((e.target as HTMLElement).dataset.idx));
        });
      },
      { rootMargin: "-45% 0px -45% 0px" }
    );
    refs.current.forEach((el) => el && io.observe(el));
    return () => io.disconnect();
  }, []);

  return (
    <section id="how-it-works" className="relative bg-white pt-6 pb-24 lg:pt-8 lg:pb-32">
      <div className="frame">

        <div className="grid gap-10 lg:grid-cols-2 lg:gap-20">
          {/* sticky phone (desktop) */}
          <div className="hidden lg:block">
            <div className="sticky top-[120px] flex h-[calc(100vh-160px)] max-h-[720px] items-center justify-center">
              <div className="relative">
                <div className="absolute -inset-16 -z-10 rounded-full bg-[radial-gradient(circle,rgba(30,111,232,0.16),transparent_65%)]" />
                <Phone>
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={active}
                      initial={{ opacity: 0, y: 30, scale: 0.98 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: -30, scale: 0.98 }}
                      transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
                      className="h-full"
                    >
                      <Screen idx={active} />
                    </motion.div>
                  </AnimatePresence>
                </Phone>
                <div className="absolute -left-20 top-1/2 flex -translate-y-1/2 flex-col gap-3">
                  {steps.map((s, i) => (
                    <span
                      key={s.n}
                      className={`h-10 w-1.5 rounded-full transition-all duration-500 ${i === active ? "bg-lm-blue" : "bg-lm-sky-2"}`}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* steps */}
          <div className="flex flex-col gap-8 lg:gap-0">
            {steps.map((s, i) => (
              <div
                key={s.n}
                data-idx={i}
                ref={(el) => {
                  refs.current[i] = el;
                }}
                className="lg:flex lg:min-h-[78vh] lg:items-center"
              >
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-15% 0px" }}
                  transition={{ duration: 0.7 }}
                  className={`lm-card p-6 sm:p-8 transition-colors duration-500 lg:border-transparent lg:shadow-none lg:bg-transparent ${
                    i === active ? "lg:!bg-lm-sky" : ""
                  }`}
                >
                  <span className="display text-5xl text-lm-sky-2">{s.n}</span>
                  <h3 className="display mt-3 text-[clamp(1.5rem,1.2rem+1.2vw,2.2rem)] text-lm-navy">{s.title}</h3>
                  <p className="mt-4 text-lg leading-relaxed text-lm-muted">{s.body}</p>
                  <p className="mt-4 flex gap-2 rounded-2xl bg-lm-cream px-4 py-3 text-[15px] text-lm-ink">
                    <span className="mt-1 h-2 w-2 shrink-0 rounded-full bg-lm-gold" />
                    {s.note}
                  </p>
                  {/* mobile phone preview */}
                  <div className="mt-8 lg:hidden">
                    <Phone className="!w-[230px]">
                      <Screen idx={i} />
                    </Phone>
                  </div>
                </motion.div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function Screen({ idx }: { idx: number }) {
  if (idx === 0) return <KycScreen />;
  if (idx === 1) return <StrategyScreen />;
  if (idx === 2) return <BalanceScreen />;
  return <GatewaysScreen />;
}

const shell = "flex h-full flex-col bg-lm-sky px-4 pt-12 pb-4 text-lm-navy";

function KycScreen() {
  const items = [
    { icon: UserRound, t: "Identity" },
    { icon: IdCard, t: "KYC documents" },
    { icon: Building2, t: "Bank account" },
    { icon: CreditCard, t: "Source of funds" },
    { icon: ScanFace, t: "Accept agreements" },
  ];
  return (
    <div className={shell}>
      <p className="text-[12px] font-semibold text-lm-muted">Onboarding</p>
      <p className="display mt-1 text-xl">Verify your KYC</p>
      <div className="mt-3 h-2 overflow-hidden rounded-full bg-white">
        <motion.span className="block h-full bg-lm-blue" initial={{ width: "0%" }} animate={{ width: "100%" }} transition={{ duration: 2.4 }} />
      </div>
      <ul className="mt-4 space-y-2">
        {items.map(({ icon: Icon, t }, i) => (
          <motion.li
            key={t}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 + i * 0.35 }}
            className="flex items-center gap-3 rounded-2xl bg-white px-3 py-2.5"
          >
            <span className="grid h-8 w-8 place-items-center rounded-xl bg-lm-sky text-lm-blue">
              <Icon size={16} />
            </span>
            <span className="flex-1 text-[12px] font-semibold">{t}</span>
            <motion.span
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.5 + i * 0.35, type: "spring" }}
              className="grid h-5 w-5 place-items-center rounded-full bg-emerald-500 text-white"
            >
              <Check size={12} strokeWidth={3} />
            </motion.span>
          </motion.li>
        ))}
      </ul>
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 2.3 }}
        className="mt-auto rounded-2xl bg-emerald-500 py-2.5 text-center text-[12px] font-bold text-white"
      >
        KYC complete
      </motion.div>
    </div>
  );
}

function StrategyScreen() {
  const s = [
    ["Investment Only", "Gold Balance"],
    ["Investment & Experience", "Own a piece"],
    ["Enrol & Experience", "Your jewellery"],
    ["Experience Only", "Against Security"],
  ];
  return (
    <div className={shell}>
      <p className="display text-xl">Choose a strategy</p>
      <p className="mt-1 text-[11px] text-lm-muted">Each strategy has its own agreement</p>
      <div className="mt-4 space-y-2">
        {s.map(([name, tag], i) => (
          <motion.div
            key={name}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 + i * 0.1 }}
            className={`rounded-2xl border-2 px-3 py-3 ${i === 1 ? "border-lm-blue bg-white" : "border-transparent bg-white/70"}`}
          >
            <div className="flex items-center justify-between">
              <span className="text-[12px] font-bold">{name}</span>
              <span className={`rounded-full px-2 py-0.5 text-[9px] font-bold ${i === 1 ? "bg-lm-gold text-lm-navy" : "bg-lm-sky text-lm-blue"}`}>{tag}</span>
            </div>
            {i === 1 && (
              <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.6 }} className="mt-1 text-[10px] text-lm-muted">
                80% Jewellery allocation · 22K jewellery · from 50g of 24K equivalent
              </motion.p>
            )}
          </motion.div>
        ))}
      </div>
      <div className="mt-auto rounded-2xl bg-lm-blue py-2.5 text-center text-[12px] font-bold text-white">Continue</div>
    </div>
  );
}

function BalanceScreen() {
  const rows = [
    ["Invested", 30, "bg-lm-blue"],
    ["Enrolled", 15, "bg-lm-gold"],
    ["Gifted", 5, "bg-sky-300"],
  ] as const;
  return (
    <div className={shell}>
      <p className="display text-xl">Add gold</p>
      <div className="relative mt-4 h-28">
        {[0, 1, 2].map((k) => (
          <motion.div
            key={k}
            className="absolute left-1/2"
            style={{ marginLeft: (k - 1) * 46 - 22 }}
            initial={{ y: -80, opacity: 0 }}
            animate={{ y: 40 - k * 6, opacity: 1 }}
            transition={{ delay: 0.15 + k * 0.25, type: "spring", stiffness: 120, damping: 10 }}
          >
            <Coin size={44} />
          </motion.div>
        ))}
      </div>
      <div className="rounded-3xl bg-white p-4">
        <p className="text-[11px] text-lm-muted">Total Gold Balance</p>
        <p className="display text-3xl">50.00g</p>
        <div className="mt-3 space-y-2">
          {rows.map(([label, g, c], i) => (
            <div key={label}>
              <div className="flex justify-between text-[11px]">
                <span>{label}</span>
                <span className="font-bold">{g.toFixed(2)}g</span>
              </div>
              <div className="mt-1 h-1.5 rounded-full bg-lm-sky">
                <motion.span
                  className={`block h-full rounded-full ${c}`}
                  initial={{ width: 0 }}
                  animate={{ width: `${(g / 50) * 100}%` }}
                  transition={{ delay: 0.6 + i * 0.15, duration: 0.8 }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="mt-auto rounded-2xl bg-lm-blue py-2.5 text-center text-[12px] font-bold text-white">Buy · Enrol · Receive</div>
    </div>
  );
}

function GatewaysScreen() {
  const g = [
    { icon: Gem, t: "Experience Jewellery" },
    { icon: Landmark, t: "Gold Loan" },
    { icon: Banknote, t: "Gold Liquidity" },
    { icon: TrendingUp, t: "Owner Benefit" },
    { icon: Gift, t: "Gift Gold" },
  ];
  return (
    <div className={shell}>
      <p className="display text-xl">Your services</p>
      <p className="mt-1 text-[11px] text-lm-muted">Available balance 50.00g</p>
      <div className="mt-4 grid grid-cols-2 gap-2">
        {g.map(({ icon: Icon, t }, i) => (
          <motion.div
            key={t}
            initial={{ opacity: 0, scale: 0.7 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.1 + i * 0.1, type: "spring", stiffness: 180, damping: 14 }}
            className={`flex flex-col gap-2 rounded-2xl p-3 ${i === 0 ? "col-span-2 bg-lm-gold" : "bg-white"}`}
          >
            <span className={`grid h-8 w-8 place-items-center rounded-xl ${i === 0 ? "bg-white/60" : "bg-lm-sky text-lm-blue"}`}>
              <Icon size={16} />
            </span>
            <span className="text-[11px] font-bold leading-tight">{t}</span>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
