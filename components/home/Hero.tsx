"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight, ShieldCheck, Sparkles, Gem, Landmark, Banknote, TrendingUp, Gift } from "lucide-react";
import { Coin, CountUp, Phone, Rays } from "./primitives";
import { openEarlyAccess } from "./data";

const coins = [
  { size: 74, left: "4%", top: "14%", r: -12, d: 5.5, delay: 0.1 },
  { size: 52, left: "82%", top: "8%", r: 18, d: 6.2, delay: 0.35 },
  { size: 92, left: "86%", top: "62%", r: -6, d: 7, delay: 0.55 },
  { size: 46, left: "0%", top: "70%", r: 24, d: 5, delay: 0.75 },
  { size: 38, left: "62%", top: "88%", r: -20, d: 6.6, delay: 0.9 },
];

const quick = [
  { icon: Gem, label: "Jewellery" },
  { icon: Landmark, label: "Loan" },
  { icon: Banknote, label: "Liquidity" },
  { icon: TrendingUp, label: "Benefit" },
  { icon: Gift, label: "Gift" },
];

export function Hero() {
  const reduce = useReducedMotion();

  return (
    <section className="relative isolate overflow-hidden bg-gradient-to-b from-lm-sky via-white to-white pt-[110px] pb-16 sm:pt-[130px] lg:pb-24">
      {/* sunburst from the logo, slowly turning */}
      <div className="pointer-events-none absolute -right-[30vw] -top-[30vw] -z-10 h-[90vw] w-[90vw] max-h-[1200px] max-w-[1200px] text-lm-sky-2 opacity-70 lg:-right-[12vw] lg:-top-[18vw] lg:h-[70vw] lg:w-[70vw]">
        <Rays className="lm-rays h-full w-full" count={40} hole={34} />
      </div>

      <div className="frame grid items-center gap-14 lg:grid-cols-12">
        <div className="lg:col-span-6 xl:col-span-6">
          <motion.div
            initial={reduce ? false : { opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="inline-flex items-center gap-2 rounded-full border border-lm-line bg-white px-3 py-1.5 text-sm font-semibold text-lm-ink shadow-sm"
          >
            <Sparkles size={16} className="text-lm-gold-deep" />
            India&apos;s first 360° gold asset ecosystem
          </motion.div>

          <h1 className="display mt-6 text-[clamp(2.5rem,1.4rem+4.6vw,5.2rem)] text-lm-navy">
            {["Your gold,", "now a living", "asset."].map((line, i) => (
              <span key={line} className="block overflow-hidden pb-[0.06em]">
                <motion.span
                  className={`block ${i === 2 ? "text-lm-blue" : ""}`}
                  initial={reduce ? false : { y: "105%" }}
                  animate={{ y: 0 }}
                  transition={{ duration: 0.9, delay: 0.1 + i * 0.12, ease: [0.16, 1, 0.3, 1] }}
                >
                  {line}
                </motion.span>
              </span>
            ))}
          </h1>

          <motion.p
            initial={reduce ? false : { opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="mt-6 max-w-[34rem] text-[clamp(1.05rem,1rem+0.4vw,1.3rem)] leading-relaxed text-lm-muted"
          >
            Gold shouldn&apos;t sit idle in a locker. With LIMOVI, one <strong className="text-lm-ink">Gold Balance</strong> lets
            you experience jewellery from the Jewellery Cloud, apply for a gold loan through a lending partner, sell gold when
            you need money, earn an Owner Benefit on your jewellery and gift gold, all from one place.
          </motion.p>

          <motion.div
            initial={reduce ? false : { opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.65 }}
            className="mt-8 flex flex-wrap items-center gap-3"
          >
            <button onClick={openEarlyAccess} className="lm-btn lm-btn-blue lm-shine">
              Get Early Access <ArrowRight size={18} />
            </button>
            <a href="#how-it-works" className="lm-btn lm-btn-ghost">
              See how it works
            </a>
          </motion.div>

          <motion.ul
            initial="hidden"
            animate="show"
            variants={{ show: { transition: { staggerChildren: 0.08, delayChildren: 0.85 } } }}
            className="mt-10 grid max-w-xl grid-cols-2 gap-3 sm:grid-cols-4"
          >
            {[
              ["₹100", "minimum Digital Gold purchase"],
              ["50g", "24K equivalent to unlock services"],
              ["30 hrs", "to enjoy each Experience"],
              ["25%", "Owner Benefit on Experience Charges"],
            ].map(([big, small]) => (
              <motion.li
                key={small}
                variants={{ hidden: reduce ? {} : { opacity: 0, y: 12 }, show: { opacity: 1, y: 0 } }}
                className="rounded-2xl border border-lm-line bg-white/80 px-4 py-3 backdrop-blur"
              >
                <p className="display text-xl text-lm-navy">{big}</p>
                <p className="text-[13px] leading-tight text-lm-muted">{small}</p>
              </motion.li>
            ))}
          </motion.ul>
        </div>

        {/* phone + jewellery + coins */}
        <div className="relative lg:col-span-6 xl:col-span-6">
          <div className="relative mx-auto h-[600px] max-w-[560px] sm:h-[660px]">
            {/* glow */}
            <div className="absolute left-1/2 top-1/2 h-[420px] w-[420px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgba(242,185,43,0.35),transparent_65%)]" aria-hidden />

            {coins.map((c, i) => (
              <motion.div
                key={i}
                className="absolute z-30"
                style={{ left: c.left, top: c.top }}
                initial={reduce ? false : { y: -260, opacity: 0, rotate: -90 }}
                animate={{ y: 0, opacity: 1, rotate: 0 }}
                transition={{ type: "spring", stiffness: 70, damping: 11, delay: 0.4 + c.delay }}
              >
                <div className="lm-bob" style={{ ["--r" as string]: `${c.r}deg`, ["--d" as string]: `${c.d}s`, ["--delay" as string]: `${i * 0.4}s` }}>
                  <Coin size={c.size} label={i % 2 ? "₹" : "24K"} />
                </div>
              </motion.div>
            ))}

            <motion.div
              initial={reduce ? false : { y: 60, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 1, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
              className="absolute left-1/2 top-1/2 z-20 -translate-x-1/2 -translate-y-1/2"
            >
              <Phone>
                <HeroScreen />
              </Phone>
            </motion.div>

            <motion.div
              initial={reduce ? false : { x: 60, opacity: 0, rotate: 8 }}
              animate={{ x: 0, opacity: 1, rotate: 0 }}
              transition={{ duration: 1.1, delay: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className="absolute -right-1 bottom-0 z-30 w-[140px] sm:-right-6 sm:w-[170px]"
            >
              <div className="lm-bob rounded-[28px] border border-lm-line bg-white p-3 shadow-xl" style={{ ["--d" as string]: "6s" }}>
                <div className="relative aspect-square overflow-hidden rounded-2xl bg-white">
                  <Image src="/images/gold-haram.png" alt="Gold haram from the Jewellery Cloud" fill sizes="200px" className="object-contain" priority />
                </div>
                <p className="mt-2 text-[13px] font-bold text-lm-navy">Heritage Haram</p>
                <p className="flex items-center gap-1 text-[12px] font-semibold text-emerald-600">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" /> Available to experience
                </p>
              </div>
            </motion.div>

            <motion.div
              initial={reduce ? false : { x: -60, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 1.1, delay: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="absolute -left-6 bottom-[16%] z-30 hidden sm:block"
            >
              <div className="lm-bob flex items-center gap-3 rounded-2xl border border-lm-line bg-white px-4 py-3 shadow-xl" style={{ ["--d" as string]: "7s", ["--delay" as string]: "1s" }}>
                <span className="grid h-9 w-9 place-items-center rounded-full bg-emerald-50 text-emerald-600">
                  <ShieldCheck size={18} />
                </span>
                <div>
                  <p className="text-[13px] font-bold text-lm-navy">KYC complete</p>
                  <p className="text-[12px] text-lm-muted">Services unlocked</p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}

function HeroScreen() {
  const total = 50;
  return (
    <div className="flex h-full flex-col bg-lm-sky px-4 pt-12 pb-4 text-lm-navy">
      <div className="flex items-center justify-between">
        <p className="text-[13px] font-semibold text-lm-muted">Hi, Priya</p>
        <span className="rounded-full bg-white px-2 py-0.5 text-[10px] font-bold text-lm-blue">LIMOVI</span>
      </div>
      <div className="relative mt-3 overflow-hidden rounded-3xl bg-lm-blue p-4 text-white">
        <div className="absolute -right-10 -top-10 h-36 w-36 text-white/10">
          <Rays className="lm-rays h-full w-full" count={24} />
        </div>
        <p className="text-[11px] uppercase tracking-[0.14em] text-white/70">Total Gold Balance</p>
        <p className="display mt-1 text-[34px] leading-none">
          <CountUp to={total} format={(n) => n.toFixed(2)} />
          <span className="ml-1 text-base font-bold">g</span>
        </p>
        <p className="mt-1 text-[12px] text-white/80">24K equivalent</p>
        <div className="mt-3 flex h-2 overflow-hidden rounded-full bg-white/20">
          <span className="bg-lm-gold" style={{ width: "60%" }} />
          <span className="bg-white" style={{ width: "30%" }} />
          <span className="bg-sky-300" style={{ width: "10%" }} />
        </div>
        <div className="mt-2 flex justify-between text-[10px] text-white/80">
          <span>Invested</span>
          <span>Enrolled</span>
          <span>Gifted</span>
        </div>
      </div>

      <p className="mt-4 text-[12px] font-bold">Your gateways</p>
      <div className="mt-2 grid grid-cols-5 gap-1.5">
        {quick.map(({ icon: Icon, label }, i) => (
          <motion.div
            key={label}
            initial={{ opacity: 0, scale: 0.6 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 1.1 + i * 0.08, type: "spring", stiffness: 200, damping: 14 }}
            className="flex flex-col items-center gap-1"
          >
            <span className="grid h-10 w-10 place-items-center rounded-2xl bg-white text-lm-blue shadow-sm">
              <Icon size={18} />
            </span>
            <span className="text-[9px] font-semibold">{label}</span>
          </motion.div>
        ))}
      </div>

      <div className="mt-4 rounded-2xl bg-white p-3">
        <p className="text-[11px] font-bold">Recent activity</p>
        {[
          ["Digital Gold bought", "+0.50g", "text-emerald-600"],
          ["Jhumkas returned", "Completed", "text-lm-muted"],
          ["Gold gift accepted", "2.00g", "text-lm-blue"],
        ].map(([a, b, c]) => (
          <div key={a} className="mt-2 flex items-center justify-between text-[11px]">
            <span>{a}</span>
            <span className={`font-bold ${c}`}>{b}</span>
          </div>
        ))}
      </div>
      <div className="mt-auto rounded-2xl bg-lm-gold py-2.5 text-center text-[12px] font-bold">Experience Jewellery</div>
    </div>
  );
}
