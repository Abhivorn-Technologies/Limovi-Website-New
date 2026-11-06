"use client";

import Link from "next/link";
import type { ReactNode } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowUpRight, ShieldCheck, Plus, Gem, Landmark, Banknote, TrendingUp, Gift } from "lucide-react";
import { Rays, Reveal, SectionHead } from "./primitives";
import { strategies } from "./data";

function Tile({ href, className, children, i }: { href: string; className: string; children: ReactNode; i: number }) {
  return (
    <Reveal i={i} className={className}>
      <Link
        href={href}
        className="group relative isolate flex h-full min-h-[240px] flex-col overflow-hidden rounded-[32px] p-7 transition-transform duration-500 hover:-translate-y-1 sm:p-8"
      >
        {children}
        <span className="absolute right-6 top-6 grid h-11 w-11 place-items-center rounded-full bg-white/90 text-lm-navy shadow-sm transition-transform duration-500 group-hover:rotate-45">
          <ArrowUpRight size={20} />
        </span>
      </Link>
    </Reveal>
  );
}

const serviceIcons = [
  { icon: Gem, name: "Jewellery Cloud" },
  { icon: Landmark, name: "Gold Loan" },
  { icon: Banknote, name: "Gold Liquidity" },
  { icon: TrendingUp, name: "Owner Benefit" },
  { icon: Gift, name: "Gift Gold" },
];

// Home-page map of the site: one tile per page, each with its own look.
export function ExploreGrid() {
  const reduce = useReducedMotion();
  return (
    <section className="bg-lm-paper py-24 lg:py-32">
      <div className="frame">
        <SectionHead
          center
          eyebrow="Explore LIMOVI"
          title={<>Everything about your gold, <span className="text-lm-blue">one tap away</span></>}
          lead="Start wherever you like. Each page goes deeper into one part of LIMOVI."
        />

        <div className="mt-14 grid gap-4 lg:grid-cols-6 lg:grid-rows-[auto_auto]">
          {/* How it works */}
          <Tile href="/how-it-works" i={0} className="lg:col-span-4">
            <div className="absolute inset-0 -z-10 bg-lm-blue" />
            <div className="pointer-events-none absolute -bottom-40 -right-20 -z-10 h-[420px] w-[420px] text-white/10">
              <Rays className="lm-rays h-full w-full" count={36} hole={30} />
            </div>
            <p className="text-xs font-bold uppercase tracking-[0.16em] text-lm-gold">How it works</p>
            <p className="display mt-3 max-w-md text-[clamp(1.7rem,1.2rem+1.6vw,2.6rem)] leading-[1.08] text-white">
              From locker to living gold, in four steps
            </p>
            <ol className="mt-auto flex flex-wrap gap-2 pt-8">
              {["Register & KYC", "Pick a strategy", "Build your Gold Balance", "Use your Gold Balance"].map((s, k) => (
                <motion.li
                  key={s}
                  initial={reduce ? false : { opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.3 + k * 0.15 }}
                  className="flex items-center gap-2 rounded-full bg-white/15 py-1.5 pl-1.5 pr-4 text-sm font-semibold text-white backdrop-blur"
                >
                  <span className="grid h-7 w-7 place-items-center rounded-full bg-white text-xs font-extrabold text-lm-blue">{k + 1}</span>
                  {s}
                </motion.li>
              ))}
            </ol>
          </Tile>

          {/* Services */}
          <Tile href="/services" i={1} className="lg:col-span-2 lg:row-span-2">
            <div className="absolute inset-0 -z-10 bg-gradient-to-br from-[#FFE7A3] via-lm-gold to-[#E0A21B]" />
            <p className="text-xs font-bold uppercase tracking-[0.16em] text-lm-navy/70">Services</p>
            <p className="display mt-3 text-[clamp(1.7rem,1.2rem+1.4vw,2.4rem)] leading-[1.08] text-lm-navy">Five ways to use your gold</p>
            <ul className="mt-auto space-y-2 pt-8">
              {serviceIcons.map(({ icon: Icon, name }, k) => (
                <motion.li
                  key={name}
                  initial={reduce ? false : { opacity: 0, x: -14 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.2 + k * 0.1 }}
                  className="flex items-center gap-3 rounded-2xl bg-white/70 px-3 py-2.5 font-bold text-lm-navy transition-colors group-hover:bg-white"
                >
                  <span className="grid h-8 w-8 place-items-center rounded-xl bg-lm-navy text-lm-gold">
                    <Icon size={16} />
                  </span>
                  {name}
                </motion.li>
              ))}
            </ul>
          </Tile>

          {/* Strategies */}
          <Tile href="/strategies" i={2} className="lg:col-span-2">
            <div className="absolute inset-0 -z-10 bg-lm-sky" />
            <p className="text-xs font-bold uppercase tracking-[0.16em] text-lm-blue">Strategies</p>
            <p className="display mt-3 text-2xl leading-tight text-lm-navy">Four ways to start</p>
            <div className="mt-auto flex flex-wrap gap-1.5 pt-6">
              {strategies.map((s) => (
                <span key={s.name} className="rounded-full border border-lm-blue/20 bg-white px-3 py-1 text-[13px] font-semibold text-lm-navy">
                  {s.name}
                </span>
              ))}
            </div>
          </Tile>

          {/* Safety */}
          <Tile href="/safety" i={3} className="lg:col-span-2">
            <div className="absolute inset-0 -z-10 bg-lm-navy" />
            <p className="text-xs font-bold uppercase tracking-[0.16em] text-lm-gold">Safety</p>
            <p className="display mt-3 text-2xl leading-tight text-white">How we keep your gold safe</p>
            <div className="mt-auto flex items-center gap-4 pt-6">
              <span className="relative grid h-14 w-14 place-items-center rounded-2xl bg-lm-gold text-lm-navy">
                {!reduce && <span className="absolute inset-0 animate-ping rounded-2xl bg-lm-gold/40" />}
                <ShieldCheck size={26} className="relative" />
              </span>
              <span className="text-sm text-white/70">Custody, insurance, delivery checks and data protection</span>
            </div>
          </Tile>

          {/* FAQs */}
          <Tile href="/faq" i={4} className="lg:col-span-3">
            <div className="absolute inset-0 -z-10 border-2 border-lm-line bg-white rounded-[32px]" />
            <p className="text-xs font-bold uppercase tracking-[0.16em] text-lm-blue">FAQs</p>
            <p className="display mt-3 text-2xl leading-tight text-lm-navy">Questions, answered</p>
            <div className="mt-auto flex flex-col gap-2 pt-6">
              {["What is LIMOVI?", "Who gives the gold loan?"].map((q) => (
                <span key={q} className="flex items-center justify-between rounded-2xl bg-lm-sky px-4 py-2.5 text-sm font-semibold text-lm-navy">
                  {q}
                  <Plus size={16} className="text-lm-blue" />
                </span>
              ))}
            </div>
          </Tile>

          {/* About */}
          <Tile href="/about" i={5} className="lg:col-span-3">
            <div className="absolute inset-0 -z-10 bg-gradient-to-br from-lm-navy to-lm-blue" />
            <p className="text-xs font-bold uppercase tracking-[0.16em] text-lm-gold">About LIMOVI</p>
            <p className="display mt-3 max-w-sm text-2xl leading-tight text-white">To put gold to work</p>
            <p className="mt-auto max-w-md pt-6 text-sm text-white/70">
              A 360° gold ecosystem bringing together jewellery, finance and technology for individuals and families.
            </p>
          </Tile>
        </div>
      </div>
    </section>
  );
}
