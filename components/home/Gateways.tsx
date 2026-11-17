"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";
import {
  ArrowRight,
  Banknote,
  Gem,
  Gift,
  Landmark,
  TrendingUp,
  Check,
  Clock,
  ShieldCheck,
  Mail,
  Building2,
  UserCheck,
} from "lucide-react";
import { Coin, Reveal, Tween } from "./primitives";
import { EXPERIENCE_CHARGE, OWNER_SHARE, gateways, inr, type GatewayId } from "./data";

const icons: Record<GatewayId, typeof Gem> = {
  jewellery: Gem,
  loans: Landmark,
  liquidity: Banknote,
  wealth: TrendingUp,
  gift: Gift,
};

// overview = cards only, each linking to its tab on /services (used on the homepage)
export function Gateways({ overview = false }: { overview?: boolean }) {
  const [tab, setTab] = useState<GatewayId>("jewellery");

  const pick = (id: GatewayId) => {
    setTab(id);
    document.getElementById("gateway-explorer")?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  // /services#loans opens the Gold Loan tab, and so on (also when only the hash changes)
  useEffect(() => {
    if (overview) return;
    let t = 0;
    const open = () => {
      const id = window.location.hash.slice(1) as GatewayId;
      if (!gateways.some((g) => g.id === id)) return;
      window.clearTimeout(t);
      t = window.setTimeout(() => {
        setTab(id);
        document.getElementById("gateway-explorer")?.scrollIntoView({ block: "start" });
      }, 200);
    };
    open();
    window.addEventListener("hashchange", open);
    return () => {
      window.clearTimeout(t);
      window.removeEventListener("hashchange", open);
    };
  }, [overview]);

  const cardClass = (tone: string) =>
    `group relative flex h-full w-full flex-col overflow-hidden rounded-[28px] p-6 text-left transition-transform duration-300 hover:-translate-y-1 ${
      tone === "gold" ? "bg-lm-cream" : "bg-lm-sky"
    }`;

  return (
    <section id="gateways" className="bg-lm-paper pt-6 pb-24 lg:pt-8 lg:pb-32">
      <div className="frame">

        {/* overview cards (home only; the Services page goes straight to the tabs) */}
        {overview && (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-6">
          {gateways.map((g, i) => (
            <Reveal key={g.id} i={i} className={i < 2 ? "lg:col-span-3" : "lg:col-span-2"}>
              {overview ? (
                <Link href={`/services#${g.id}`} className={cardClass(g.tone)}>
                  <GatewayArt id={g.id} />
                  <h3 className="display mt-6 text-xl text-lm-navy sm:text-2xl">{g.name}</h3>
                  <p className="mt-2 text-lm-muted">{g.short}</p>
                  <span className="mt-4 inline-flex items-center gap-1.5 font-bold text-lm-blue">
                    How it works <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
                  </span>
                </Link>
              ) : (
                <button onClick={() => pick(g.id)} className={cardClass(g.tone)}>
                  <GatewayArt id={g.id} />
                  <h3 className="display mt-6 text-xl text-lm-navy sm:text-2xl">{g.name}</h3>
                  <p className="mt-2 text-lm-muted">{g.short}</p>
                  <span className="mt-4 inline-flex items-center gap-1.5 font-bold text-lm-blue">
                    How it works <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
                  </span>
                </button>
              )}
            </Reveal>
          ))}
        </div>
        )}

        {/* explorer */}
        {!overview && (
          <div id="gateway-explorer" className="scroll-mt-28">
            <div
              className="no-scrollbar -mx-[var(--margin)] flex gap-2 overflow-x-auto px-[var(--margin)] pb-2 lg:mx-0 lg:justify-center lg:px-0"
              role="tablist"
            >
              {gateways.map((g) => {
                const Icon = icons[g.id];
                const on = tab === g.id;
                return (
                  <button
                    key={g.id}
                    role="tab"
                    aria-selected={on}
                    onClick={() => setTab(g.id)}
                    className={`relative flex shrink-0 items-center gap-2 rounded-full px-5 py-3 text-[15px] font-bold transition-colors ${
                      on ? "text-white" : "bg-lm-sky text-lm-ink hover:bg-lm-sky-2"
                    }`}
                  >
                    {on && (
                      <motion.span
                        layoutId="gw-pill"
                        className="absolute inset-0 rounded-full bg-lm-blue"
                        transition={{
                          type: "spring",
                          stiffness: 300,
                          damping: 30,
                        }}
                      />
                    )}
                    <Icon size={18} className="relative" />
                    <span className="relative">{g.name}</span>
                  </button>
                );
              })}
            </div>

            <div className="mt-8">
              <AnimatePresence mode="wait">
                <motion.div
                  key={tab}
                  initial={{ opacity: 0, y: 24 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -16 }}
                  transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                >
                  {tab === "jewellery" && <JewelleryPanel />}
                  {tab === "loans" && <LoanPanel />}
                  {tab === "liquidity" && <LiquidityPanel />}
                  {tab === "wealth" && <WealthPanel />}
                  {tab === "gift" && <GiftPanel />}
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}

/* ───────── small illustrations on the overview cards ───────── */

function GatewayArt({ id }: { id: GatewayId }) {
  if (id === "jewellery")
    return (
      <div className="relative h-40 overflow-hidden rounded-2xl bg-white">
        <Image
          src="/images/gold-haram.png"
          alt=""
          fill
          sizes="(min-width:1024px) 40vw, 90vw"
          className="object-contain p-3 transition-transform duration-700 group-hover:scale-110"
        />
        <span className="absolute left-3 top-3 rounded-full bg-lm-sky px-2.5 py-1 text-xs font-bold text-lm-blue">
          Return within 30 hrs
        </span>
      </div>
    );
  if (id === "loans")
    return (
      <div className="flex h-40 items-center justify-between gap-2 rounded-2xl bg-white px-5">
        <div className="text-center">
          <span className="mx-auto grid h-14 w-14 place-items-center rounded-2xl bg-lm-sky text-lm-blue">
            <UserCheck size={26} />
          </span>
          <p className="mt-2 text-xs font-bold text-lm-navy">LIMOVI facilitates</p>
        </div>
        <div className="relative mx-1 h-1 flex-1 overflow-hidden rounded-full bg-lm-sky">
          <motion.span
            className="absolute inset-y-0 w-1/3 rounded-full bg-lm-blue"
            animate={{ x: ["-100%", "300%"] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
          />
        </div>
        <div className="text-center">
          <span className="mx-auto grid h-14 w-14 place-items-center rounded-2xl bg-lm-blue text-white">
            <Building2 size={26} />
          </span>
          <p className="mt-2 text-xs font-bold text-lm-navy">Partner lends</p>
        </div>
      </div>
    );
  if (id === "liquidity")
    return (
      <div className="flex h-40 items-center justify-between rounded-2xl bg-white px-5">
        <Coin size={56} />
        <div className="relative mx-2 h-1 flex-1 overflow-hidden rounded-full bg-lm-sky">
          <motion.span
            className="absolute inset-y-0 w-1/3 rounded-full bg-lm-blue"
            animate={{ x: ["-100%", "300%"] }}
            transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
          />
        </div>
        <span className="grid h-14 w-14 place-items-center rounded-2xl bg-emerald-50 text-emerald-600">
          <Banknote size={26} />
        </span>
      </div>
    );
  if (id === "wealth")
    return (
      <div className="flex h-40 flex-col justify-center rounded-2xl bg-white p-5">
        <p className="text-sm text-lm-muted">Of each qualifying Experience Charge</p>
        <p className="display text-3xl text-lm-navy">25% to the owner</p>
        <div className="mt-3 h-3 rounded-full bg-lm-sky">
          <motion.span
            className="block h-full rounded-full bg-lm-gold"
            initial={{ width: 0 }}
            whileInView={{ width: "25%" }}
            viewport={{ once: true }}
            transition={{ duration: 1.2, delay: 0.3 }}
          />
        </div>
      </div>
    );
  return (
    <div className="relative grid h-40 place-items-center overflow-hidden rounded-2xl bg-white">
      <div className="relative">
        <span className="grid h-20 w-28 place-items-center rounded-xl bg-lm-blue text-white shadow-lg">
          <Mail size={30} />
        </span>
        <motion.div
          className="absolute -right-5 -top-5"
          animate={{ y: [0, -8, 0], rotate: [0, 10, 0] }}
          transition={{ duration: 3, repeat: Infinity }}
        >
          <Coin size={40} />
        </motion.div>
      </div>
    </div>
  );
}

/* ───────── shared panel parts ───────── */

function Panel({
  title,
  intro,
  steps,
  notes,
  children,
}: {
  title: string;
  intro: string;
  steps: string[];
  notes?: string[];
  children?: React.ReactNode;
}) {
  return (
    <div className={`grid gap-6 ${children ? "lg:grid-cols-2" : ""}`}>
      <div className="lm-card p-6 sm:p-8">
        <h3 className="display text-[clamp(1.5rem,1.2rem+1vw,2.1rem)] text-lm-navy">{title}</h3>
        <p className="mt-3 text-[16px] leading-relaxed text-lm-muted">{intro}</p>
        <p className="mt-7 text-xs font-bold uppercase tracking-[0.16em] text-lm-blue">How it works</p>
        <ol className="relative mt-4 space-y-2.5">
          <span className="absolute bottom-5 left-[17px] top-5 w-0.5 rounded-full bg-lm-sky-2" aria-hidden />
          {steps.map((s, i) => (
            <motion.li
              key={s}
              initial={{ opacity: 0, x: -12 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 + i * 0.07 }}
              className="relative flex items-center gap-3.5"
            >
              <span className="relative z-10 grid h-9 w-9 shrink-0 place-items-center rounded-full border-4 border-white bg-lm-blue text-[13px] font-extrabold text-white shadow-sm">
                {i + 1}
              </span>
              <span className="flex-1 rounded-2xl bg-lm-sky/70 px-4 py-2.5 text-[15px] font-medium leading-snug text-lm-navy">{s}</span>
            </motion.li>
          ))}
        </ol>
        {notes && (
          <ul className="mt-6 space-y-2 rounded-2xl bg-lm-cream p-4">
            {notes.map((n) => (
              <li key={n} className="flex gap-2 text-[14px] leading-relaxed text-lm-ink">
                <Check size={18} className="mt-0.5 shrink-0 text-lm-gold-deep" />
                {n}
              </li>
            ))}
          </ul>
        )}
      </div>
      <div className="flex flex-col gap-6">{children}</div>
    </div>
  );
}

function Slider({
  label,
  min,
  max,
  step,
  value,
  onChange,
  format,
}: {
  label: string;
  min: number;
  max: number;
  step: number;
  value: number;
  onChange: (n: number) => void;
  format: (n: number) => string;
}) {
  const fill = ((value - min) / (max - min)) * 100;
  return (
    <label className="block">
      <span className="flex items-baseline justify-between gap-4">
        <span className="font-semibold text-white/85">{label}</span>
        <span className="display text-2xl text-white">{format(value)}</span>
      </span>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="lm-range mt-3"
        style={{ ["--fill" as string]: `${fill}%` }}
      />
      <span className="flex justify-between text-xs text-white/60">
        <span>{format(min)}</span>
        <span>{format(max)}</span>
      </span>
    </label>
  );
}

function Calc({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="relative overflow-hidden rounded-[28px] bg-lm-blue p-6 text-white sm:p-8">
      <div className="absolute -right-24 -top-24 h-64 w-64 rounded-full bg-white/10" aria-hidden />
      <p className="relative text-sm font-bold uppercase tracking-[0.12em] text-lm-gold">{title}</p>
      <div className="relative mt-5 space-y-6">{children}</div>
    </div>
  );
}

function Rows({ rows }: { rows: [string, React.ReactNode, string?][] }) {
  return (
    <dl className="divide-y divide-white/15 rounded-2xl bg-white/10">
      {rows.map(([k, v, cls]) => (
        <div key={k} className="flex items-center justify-between gap-4 px-4 py-3">
          <dt className="text-white/80">{k}</dt>
          <dd className={`font-bold tabular-nums ${cls ?? "text-white"}`}>{v}</dd>
        </div>
      ))}
    </dl>
  );
}

/* ───────── panels ───────── */

function JewelleryPanel() {
  return (
    <Panel
      title="Jewellery Cloud"
      intro="Wear beautiful jewellery for your special day without buying every piece. The pieces open to you depend on your strategy and your Gold Balance."
      steps={[
        "Browse the Jewellery Cloud and pick a piece you love.",
        "Book at least 24 hours ahead. LIMOVI confirms your booking.",
        "It's delivered to your door. Just show ID or share an OTP at handover.",
        "Its condition is noted when you receive it.",
        "Enjoy it, then hand it back within 30 hours. LIMOVI arranges the pickup.",
        "LIMOVI checks the piece when it comes back, and you're done.",
      ]}
      notes={[
        "Pieces are insured through a LIMOVI-approved insurer where needed, before they reach you.",
        "Take good care of the piece while it's with you. Normal wear is fine.",
      ]}
    />
  );
}

function LoanPanel() {
  return (
    <Panel
      title="Gold Loan"
      intro="Need funds? Use your gold to get a loan from one of LIMOVI's lending partners, without the running around. LIMOVI helps you apply; the partner gives the loan."
      steps={[
        "Check if you're eligible, right in the app.",
        "LIMOVI matches you with a lending partner and helps you apply.",
        "The partner offers you a loan amount, interest rate and repayment plan.",
        "Accept the offer and sign the partner's loan papers.",
        "Repay the partner directly on the agreed schedule.",
      ]}
      notes={[
        "On Investment & Experience, you can still wear jewellery while you have a loan, using 25% of your remaining eligible Gold Balance.",
      ]}
    >
      <div className="relative overflow-hidden rounded-[28px] bg-lm-blue p-6 text-white sm:p-8">
        <div className="absolute -right-24 -top-24 h-64 w-64 rounded-full bg-white/10" aria-hidden />
        <p className="relative text-sm font-bold uppercase tracking-[0.12em] text-lm-gold">Who does what</p>
        <div className="relative mt-5 grid gap-4 sm:grid-cols-2">
          {[
            [
              "LIMOVI",
              [
                "Finds you a lending partner",
                "Helps you apply",
                "Shares your details with the partner",
                "Keeps it all in one app",
              ],
            ],
            [
              "Gold Loan Partner",
              [
                "Approves your loan",
                "Sets the amount, interest and tenure",
                "Keeps your gold safe as security",
                "Collects your repayments",
              ],
            ],
          ].map(([who, list]) => (
            <div key={who as string} className="rounded-2xl bg-white/10 p-4">
              <p className="display text-lg">{who as string}</p>
              <ul className="mt-3 space-y-2">
                {(list as string[]).map((t) => (
                  <li key={t} className="flex gap-2 text-sm text-white/85">
                    <Check size={16} className="mt-0.5 shrink-0 text-lm-gold" />
                    {t}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <Link
          href="/legal/master-customer-agreement#22-gold-loan-facilitation"
          className="relative mt-5 inline-flex items-center gap-1.5 text-sm font-bold text-white"
        >
          Read the full terms <ArrowRight size={15} />
        </Link>
      </div>
    </Panel>
  );
}

function LiquidityPanel() {
  return (
    <Panel
      title="Gold Liquidity"
      intro="Need cash, not a loan? Sell your gold or jewellery through LIMOVI and get the money straight into your bank account."
      steps={[
        "Choose what to sell: all of it or just a part.",
        "LIMOVI checks the gold's weight and purity.",
        "You get the market price. For jewellery, that's today's 22K gold price per gram on its gold weight.",
        "See the price, weight and total before you confirm.",
        "LIMOVI aims to credit your bank within an hour of confirming.",
      ]}
      notes={[
        "Once confirmed, the sale is final.",
        "Gold prices change through the day, so the price is locked only when you confirm.",
      ]}
    >
      <div className="relative overflow-hidden rounded-[28px] bg-lm-blue p-6 text-white sm:p-8">
        <div className="absolute -right-24 -top-24 h-64 w-64 rounded-full bg-white/10" aria-hidden />
        <p className="relative text-sm font-bold uppercase tracking-[0.12em] text-lm-gold">How your payout is worked out</p>
        <div className="relative mt-5 space-y-6">
          <Rows
            rows={[
              ["Applicable price × accepted weight", "Sale value"],
              ["Less TDS and GST", "−"],
              ["Less statutory deductions", "−"],
              ["Less bank and other permitted charges", "−"],
              ["Paid to your verified bank account", "Net Sale Consideration", "text-lm-gold"],
            ]}
          />
          <div className="flex items-center gap-3 rounded-2xl bg-white/10 p-4">
            <Clock className="shrink-0 text-lm-gold" />
            <p className="text-sm text-white/85">
              LIMOVI aims to credit you within one hour of confirmation, once verification, processing and banking steps are
              complete.
            </p>
          </div>
          <Link
            href="/legal/gold-liquidity-and-sale-terms"
            className="inline-flex items-center gap-1.5 text-sm font-bold text-white"
          >
            Read the Gold Liquidity terms <ArrowRight size={15} />
          </Link>
        </div>
      </div>
    </Panel>
  );
}

function WealthPanel() {
  const [value, setValue] = useState(500000);
  const charge = value * EXPERIENCE_CHARGE;
  const benefit = charge * OWNER_SHARE;
  return (
    <Panel
      title="Generate Wealth"
      intro="Your jewellery can earn for you. List it in the Jewellery Cloud, and every time someone else wears it, you earn 25% of what they pay."
      steps={[
        "Enrol jewellery you already own, or own a piece through Investment & Experience.",
        "LIMOVI lists it with photos and details. Your name stays private.",
        "Another customer books and wears it.",
        "You earn 25% of their Experience Charge.",
        "Track every booking and earning in your account.",
      ]}
      notes={[
        "Earnings depend on bookings, so they aren't guaranteed.",
      ]}
    >
      <Calc title="Generate Wealth example">
        <Slider
          label="Value of your jewellery"
          min={100000}
          max={2000000}
          step={10000}
          value={value}
          onChange={setValue}
          format={inr}
        />
        <Rows
          rows={[
            ["Experience Charge (0.9%)", <Tween key="c" value={charge} format={inr} />],
            ["Your earnings per Experience (25%)", <Tween key="b" value={benefit} format={inr} />, "text-lm-gold"],
          ]}
        />
        <p className="text-xs text-white/60">
          Per qualifying Experience, before charges, taxes and deductions. Uses the 0.9% Experience Charge in the Enrol &amp;
          Experience schedule.
        </p>
      </Calc>
    </Panel>
  );
}

function GiftPanel() {
  const [opened, setOpened] = useState(false);
  return (
    <Panel
      title="Gift Gold Ecosystem"
      intro="Give gold that can actually be used. Send part of your Gold Balance to someone you love, and they can use it on LIMOVI."
      steps={[
        "Choose how much gold to gift.",
        "Confirm it with a quick verification.",
        "Your loved one signs up, completes KYC and accepts.",
        "The gold is theirs to use.",
      ]}
      notes={["Once a gift is complete, it can't be taken back."]}
    >
      <div className="lm-card relative flex min-h-[420px] flex-col items-center justify-center overflow-hidden bg-lm-cream p-8 text-center">
        <button onClick={() => setOpened((v) => !v)} className="group relative" aria-label="Open the gift">
          <div className="relative h-40 w-60">
            <motion.div
              className="absolute left-1/2 top-4 z-0 w-48 -translate-x-1/2 rounded-xl bg-white p-4 text-left shadow-lg"
              animate={{ y: opened ? -110 : 0 }}
              transition={{ type: "spring", stiffness: 120, damping: 14 }}
            >
              <p className="text-xs font-bold uppercase tracking-[0.12em] text-lm-blue">For Ananya</p>
              <p className="display mt-1 text-2xl text-lm-navy">2.00g</p>
              <p className="text-xs text-lm-muted">Gold Balance · &ldquo;Happy birthday!&rdquo;</p>
            </motion.div>
            <div className="absolute inset-x-0 bottom-0 z-10 h-32 rounded-2xl bg-lm-blue shadow-xl" />
            <motion.div
              className="absolute inset-x-0 top-8 z-20 h-0 origin-top"
              style={{
                borderLeft: "120px solid transparent",
                borderRight: "120px solid transparent",
                borderTop: "70px solid var(--color-lm-blue-deep)",
              }}
              animate={{ rotateX: opened ? 180 : 0 }}
              transition={{ duration: 0.5 }}
            />
            <div className="absolute bottom-3 left-1/2 z-30 -translate-x-1/2">
              <Coin size={44} />
            </div>
          </div>
        </button>
        <p className="mt-10 font-bold text-lm-navy">{opened ? "A gift they can use on LIMOVI." : "Tap the envelope"}</p>
        <div className="mt-6 grid w-full max-w-sm grid-cols-3 gap-2 text-xs">
          {[
            [ShieldCheck, "Recipient KYC"],
            [Check, "Accepted"],
            [Gift, "Gift complete"],
          ].map(([Icon, t]) => {
            const I = Icon as typeof Gem;
            return (
              <div
                key={t as string}
                className="flex flex-col items-center gap-2 rounded-2xl bg-white p-3 font-semibold text-lm-ink"
              >
                <I size={18} className="text-lm-blue" />
                {t as string}
              </div>
            );
          })}
        </div>
      </div>
    </Panel>
  );
}
