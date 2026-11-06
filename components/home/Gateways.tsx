"use client";

import { useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight, Banknote, Gem, Gift, Landmark, TrendingUp, Check, Clock, ShieldCheck, Mail } from "lucide-react";
import { Coin, Reveal, SectionHead, Tween } from "./primitives";
import {
  EXPERIENCE_CHARGE,
  ILLUSTRATIVE_RATE,
  MAX_LTV,
  OWNER_SHARE,
  gateways,
  grams,
  inr,
  type GatewayId,
} from "./data";

const icons: Record<GatewayId, typeof Gem> = {
  jewellery: Gem,
  loans: Landmark,
  liquidity: Banknote,
  wealth: TrendingUp,
  gift: Gift,
};

export function Gateways() {
  const [tab, setTab] = useState<GatewayId>("jewellery");

  const pick = (id: GatewayId) => {
    setTab(id);
    document.getElementById("gateway-explorer")?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <section id="gateways" className="bg-white py-24 lg:py-32">
      <div className="frame">
        <SectionHead
          center
          eyebrow="Five gateways"
          title={<>Everything your gold can do, <span className="text-lm-blue">in one place</span></>}
          lead="Each gateway draws on the same Gold Balance. Use one, or use all five."
        />

        {/* overview cards */}
        <div className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-6">
          {gateways.map((g, i) => (
            <Reveal key={g.id} i={i} className={i < 2 ? "lg:col-span-3" : "lg:col-span-2"}>
              <button
                onClick={() => pick(g.id)}
                className={`group relative flex h-full w-full flex-col overflow-hidden rounded-[28px] p-6 text-left transition-transform duration-300 hover:-translate-y-1 ${
                  g.tone === "gold" ? "bg-lm-cream" : "bg-lm-sky"
                }`}
              >
                <GatewayArt id={g.id} />
                <h3 className="display mt-6 text-xl text-lm-navy sm:text-2xl">{g.name}</h3>
                <p className="mt-2 text-lm-muted">{g.short}</p>
                <span className="mt-4 inline-flex items-center gap-1.5 font-bold text-lm-blue">
                  How it works <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
                </span>
              </button>
            </Reveal>
          ))}
        </div>

        {/* explorer */}
        <div id="gateway-explorer" className="scroll-mt-28 pt-20">
          <div className="no-scrollbar -mx-[var(--margin)] flex gap-2 overflow-x-auto px-[var(--margin)] pb-2 lg:mx-0 lg:justify-center lg:px-0" role="tablist">
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
                  {on && <motion.span layoutId="gw-pill" className="absolute inset-0 rounded-full bg-lm-blue" transition={{ type: "spring", stiffness: 300, damping: 30 }} />}
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
      </div>
    </section>
  );
}

/* ───────── small illustrations on the overview cards ───────── */

function GatewayArt({ id }: { id: GatewayId }) {
  if (id === "jewellery")
    return (
      <div className="relative h-40 overflow-hidden rounded-2xl bg-white">
        <Image src="/images/gold-haram.png" alt="" fill sizes="(min-width:1024px) 40vw, 90vw" className="object-contain p-3 transition-transform duration-700 group-hover:scale-110" />
        <span className="absolute left-3 top-3 rounded-full bg-emerald-50 px-2.5 py-1 text-xs font-bold text-emerald-700">Available</span>
      </div>
    );
  if (id === "loans")
    return (
      <div className="flex h-40 flex-col justify-center rounded-2xl bg-white p-5">
        <p className="text-sm text-lm-muted">Max loan on 50g</p>
        <p className="display text-3xl text-lm-navy">{inr(50 * ILLUSTRATIVE_RATE * MAX_LTV)}</p>
        <div className="mt-3 h-3 rounded-full bg-lm-sky">
          <motion.span
            className="block h-full rounded-full bg-lm-blue"
            initial={{ width: 0 }}
            whileInView={{ width: "75%" }}
            viewport={{ once: true }}
            transition={{ duration: 1.2, delay: 0.3 }}
          />
        </div>
        <p className="mt-2 text-xs font-bold text-lm-blue">75% loan-to-value</p>
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
      <div className="flex h-40 items-end gap-2 rounded-2xl bg-white p-5">
        {[30, 45, 40, 62, 70, 88].map((h, i) => (
          <motion.span
            key={i}
            className={`flex-1 rounded-t-lg ${i === 5 ? "bg-lm-gold" : "bg-lm-sky-2"}`}
            initial={{ height: 0 }}
            whileInView={{ height: `${h}%` }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: i * 0.08 }}
          />
        ))}
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
  children: React.ReactNode;
}) {
  return (
    <div className="grid gap-6 lg:grid-cols-2">
      <div className="lm-card p-6 sm:p-8">
        <h3 className="display text-[clamp(1.5rem,1.2rem+1vw,2.1rem)] text-lm-navy">{title}</h3>
        <p className="mt-3 text-lg leading-relaxed text-lm-muted">{intro}</p>
        <ol className="mt-6 space-y-3">
          {steps.map((s, i) => (
            <motion.li
              key={s}
              initial={{ opacity: 0, x: -12 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 + i * 0.06 }}
              className="flex gap-3"
            >
              <span className="grid h-7 w-7 shrink-0 place-items-center rounded-full bg-lm-sky text-sm font-bold text-lm-blue">{i + 1}</span>
              <span className="pt-0.5 text-lm-ink">{s}</span>
            </motion.li>
          ))}
        </ol>
        {notes && (
          <ul className="mt-6 space-y-2 rounded-2xl bg-lm-cream p-4">
            {notes.map((n) => (
              <li key={n} className="flex gap-2 text-[15px] text-lm-ink">
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

const BAL = 50;
const VALUE = BAL * ILLUSTRATIVE_RATE;

/* ───────── panels ───────── */

function JewelleryPanel() {
  return (
    <Panel
      title="Luxury Jewellery Cloud"
      intro="Wear premium jewellery, from everyday pieces to grand bridal sets, without buying each one. The more Gold Balance you hold, the wider the range you can access. You enjoy the jewellery; your gold stays yours."
      steps={[
        "Tap 'Experience Jewellery' and browse the catalogue with photos, gold weight and availability.",
        "LIMOVI checks that your Available Gold Balance meets the piece's minimum.",
        "Confirm the booking and your delivery address.",
        "The piece leaves the secure vault with fully insured shipping to your door.",
        "Enjoy it for your experience period (for example 7, 14 or 30 days).",
        "Send it back in the prepaid, insured packaging. After a quality check, you're free to book the next one.",
      ]}
      notes={[
        "Insured from the moment it leaves the vault until it's back and inspected.",
        "Minor cleaning is on us. Theft or accidents are covered by insurance.",
      ]}
    >
      <div className="lm-card overflow-hidden">
        <div className="grid grid-cols-2">
          <div className="relative aspect-square">
            <Image src="/images/jewellery-wedding.png" alt="Bridal wedding set" fill sizes="(min-width:1024px) 25vw, 50vw" className="object-cover" />
          </div>
          <div className="relative aspect-square">
            <Image src="/images/minimal_pendant.png" alt="Pendant and chain" fill sizes="(min-width:1024px) 25vw, 50vw" className="object-cover" />
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4 p-6">
          <div>
            <p className="font-bold text-lm-navy">Luxury Jewellery</p>
            <p className="text-sm text-lm-muted">Weddings, milestones and grand celebrations. Royal Long Haram, Temple Jhumkas, Bridal Sets.</p>
          </div>
          <div>
            <p className="font-bold text-lm-navy">Lifestyle Jewellery</p>
            <p className="text-sm text-lm-muted">Everyday elegance. Pendant & Chain, Solitaire Studs, Elegant Gold Ring.</p>
          </div>
        </div>
      </div>
      <div className="lm-card p-6">
        <p className="font-bold text-lm-navy">What each status means</p>
        <div className="mt-4 grid grid-cols-2 gap-3 text-sm">
          {[
            ["Available", "In the vault, book now", "bg-emerald-500"],
            ["On Experience", "With a member, join waitlist", "bg-lm-gold"],
            ["Under Maintenance", "Being cleaned or inspected", "bg-sky-400"],
            ["Retired", "No longer in the catalogue", "bg-slate-400"],
          ].map(([s, d, c]) => (
            <div key={s} className="rounded-2xl bg-lm-sky p-3">
              <span className="flex items-center gap-2 font-bold text-lm-navy">
                <span className={`h-2 w-2 rounded-full ${c}`} />
                {s}
              </span>
              <span className="mt-1 block text-lm-muted">{d}</span>
            </div>
          ))}
        </div>
      </div>
    </Panel>
  );
}

function LoanPanel() {
  const max = VALUE * MAX_LTV;
  const [amt, setAmt] = useState(200000);
  const pledge = amt / ILLUSTRATIVE_RATE;
  return (
    <Panel
      title="Instant Loans"
      intro="Pledge part of your Gold Balance and get a loan straight to your bank account. No branch visits, no paperwork. Loans are given by RBI-regulated NBFC partners; LIMOVI makes it simple."
      steps={[
        "Tap 'Get a Loan' to see your available gold, today's MCX rate and your maximum eligible amount.",
        "Enter how much you need. LIMOVI shows how many grams will be pledged and what stays available.",
        "Review the NBFC's offer: interest rate, tenure and EMI schedule.",
        "Accept, and the NBFC processes it digitally.",
        "Money lands in your bank via IMPS / RTGS. Pledged gold is marked 'Collateral'.",
        "Repay your EMIs. When the loan is closed, your gold is released and you get a no-due certificate.",
      ]}
      notes={[
        "Capped at 75% of your gold's value, as per RBI loan-to-value rules.",
        "Keep wearing Jewellery Cloud pieces with your remaining balance during the loan.",
        "EMI reminders 7, 3 and 1 day before each due date.",
      ]}
    >
      <Calc title="Loan calculator">
        <Slider label="Loan amount" min={10000} max={max} step={5000} value={amt} onChange={setAmt} format={inr} />
        <Rows
          rows={[
            ["Your Gold Balance", grams(BAL)],
            ["Gold rate (illustrative)", `${inr(ILLUSTRATIVE_RATE)}/g`],
            ["Maximum eligible (75% LTV)", inr(max)],
            ["Gold pledged as collateral", <Tween key="p" value={pledge} format={grams} />, "text-lm-gold"],
            ["Still available to you", <Tween key="a" value={BAL - pledge} format={grams} />],
          ]}
        />
        <p className="text-xs text-white/60">Interest rate and tenure are set by the NBFC partner and shown before you accept.</p>
      </Calc>
    </Panel>
  );
}

function LiquidityPanel() {
  const [amt, setAmt] = useState(200000);
  const g = amt / ILLUSTRATIVE_RATE;
  return (
    <Panel
      title="Instant Liquidity"
      intro="Need cash, not a loan? Convert any part of your Available Gold Balance into money at the live MCX spot rate. It's settled to your bank within minutes through Razorpay / Cashfree."
      steps={[
        "Tap 'Get Liquidity'.",
        "Enter grams or rupees. The other value fills in automatically.",
        "See the live MCX rate, the amount and the estimated settlement time.",
        "Confirm. The rate is locked at that moment.",
        "The gold is deducted and cash is sent to your primary bank account via IMPS.",
        "A receipt is emailed to you.",
      ]}
      notes={[
        "Unlike a loan, liquidity is permanent: that gold becomes cash.",
        "Taxes and charges are shown before you confirm. No hidden fees.",
        "Minimum ₹1,000. Daily limits apply as per regulations.",
      ]}
    >
      <Calc title="Liquidity calculator">
        <Slider label="Cash you need" min={1000} max={VALUE} step={1000} value={amt} onChange={setAmt} format={inr} />
        <Rows
          rows={[
            ["Gold to convert", <Tween key="g" value={g} format={grams} />, "text-lm-gold"],
            ["Remaining Gold Balance", <Tween key="r" value={BAL - g} format={grams} />],
            ["Settlement rail", "IMPS / RTGS"],
            ["Estimated time", "Within 30 minutes"],
          ]}
        />
        <div className="flex items-center gap-3 rounded-2xl bg-white/10 p-4">
          <Clock className="shrink-0 text-lm-gold" />
          <p className="text-sm text-white/85">Rate locked at confirmation, so the amount you see is the amount you get (before applicable taxes).</p>
        </div>
      </Calc>
    </Panel>
  );
}

function WealthPanel() {
  const [n, setN] = useState(5);
  const charge = VALUE * EXPERIENCE_CHARGE;
  const div = charge * OWNER_SHARE;
  return (
    <Panel
      title="Wealth Generation"
      intro="Enroll your jewellery into the Jewellery Cloud and let it earn while you're not wearing it. Every time another member experiences your piece, you get a share of the experience charge as a commercial dividend."
      steps={[
        "Enroll your jewellery through the Enroll & Experience or Investment & Experience strategy.",
        "It's stored in the LIMOVI vault and listed in the Jewellery Cloud.",
        "When another member books it, an experience charge applies (0.9% of the piece's gold value).",
        "You receive 25% of that charge as your dividend.",
        "Dividends collect in your Wealth Wallet.",
        "They're paid to your bank monthly or quarterly, with downloadable statements.",
      ]}
      notes={["Track earnings per piece, upcoming payouts and full payout history on your Wealth dashboard."]}
    >
      <Calc title="Dividend calculator">
        <Slider label="Experiences per year" min={1} max={12} step={1} value={n} onChange={setN} format={(v) => `${Math.round(v)}`} />
        <Rows
          rows={[
            ["Enrolled piece", "50.00g necklace"],
            ["Piece value (illustrative)", inr(VALUE)],
            ["Experience charge (0.9%)", inr(charge)],
            ["Your dividend per experience (25%)", inr(div), "text-lm-gold"],
            ["Estimated yearly dividend", <Tween key="y" value={div * n} format={inr} />, "text-lm-gold"],
          ]}
        />
        <p className="text-xs text-white/60">The product example assumes a conservative minimum of 5 experiences a year ({inr(div * 5)}). Actual bookings vary.</p>
      </Calc>
    </Panel>
  );
}

function GiftPanel() {
  const [opened, setOpened] = useState(false);
  return (
    <Panel
      title="Gift Gold"
      intro="A gold gift that doesn't sit in a drawer. Your loved one receives gold plus everything LIMOVI offers: jewellery experiences, financial flexibility and the chance to earn."
      steps={[
        "Tap 'Gift Gold' and choose an amount in grams or rupees.",
        "Add the recipient's name, mobile or email, and a personal message.",
        "Review and confirm. The gold is reserved from your balance.",
        "They get an SMS and email with a link to accept.",
        "Already a member? It's credited when they accept. New to LIMOVI? It's credited once their KYC is approved.",
      ]}
      notes={[
        "The gift can be accepted within 30 days. If not, the gold returns to you.",
        "Track every gift as Pending, Accepted or Expired.",
      ]}
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
              <p className="text-xs text-lm-muted">24K gold · &ldquo;Happy birthday!&rdquo;</p>
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
        <p className="mt-10 font-bold text-lm-navy">{opened ? "A gift that keeps on giving." : "Tap the envelope"}</p>
        <div className="mt-6 grid w-full max-w-sm grid-cols-3 gap-2 text-xs">
          {[
            [ShieldCheck, "Experience more"],
            [Banknote, "Unlock flexibility"],
            [TrendingUp, "Create lasting value"],
          ].map(([Icon, t]) => {
            const I = Icon as typeof Gem;
            return (
              <div key={t as string} className="flex flex-col items-center gap-2 rounded-2xl bg-white p-3 font-semibold text-lm-ink">
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
