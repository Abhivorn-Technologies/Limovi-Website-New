'use client';

import { motion } from 'framer-motion';
import { Check } from 'lucide-react';
import type { CalculationResult } from '@/lib/utils/calculator';
import { formatINR } from '@/lib/utils/calculator';
import type { StrategyKey } from '@/lib/constants/strategyRules';
import { VALUE_ADDED_BENEFITS } from '@/lib/constants/strategyRules';
import { AnimatedNumber } from './AnimatedNumber';

interface ResultCardsProps {
  result: CalculationResult;
  strategy: StrategyKey;
  enrolledGrams?: number;
}

const rise = {
  hidden: { opacity: 0, y: 12 },
  show: (i: number) => ({ opacity: 1, y: 0, transition: { delay: i * 0.06, duration: 0.45, ease: [0.22, 1, 0.36, 1] as const } }),
};

const inr = (v: number) => `₹${new Intl.NumberFormat('en-IN').format(Math.round(Math.abs(v)))}`;

function Row({ label, note, value, muted, dark, i }: { label: string; note?: string; value: React.ReactNode; muted?: boolean; dark?: boolean; i: number }) {
  const ink = dark ? 'text-[var(--color-deep-ink)]' : 'text-[var(--color-ink)]';
  const soft = dark ? 'text-[var(--color-deep-muted)]' : 'text-[var(--color-muted)]';
  const gain = dark ? 'text-[#9BE3B9]' : 'text-emerald-800';
  return (
    <motion.div variants={rise} custom={i} className="flex items-baseline justify-between gap-4 py-2.5">
      <div className="min-w-0">
        <p className={`text-sm ${ink}`}>{label}</p>
        {note && <p className={`text-[13px] ${soft}`}>{note}</p>}
      </div>
      <p className={`shrink-0 font-medium tabular ${muted ? soft : gain}`}>{value}</p>
    </motion.div>
  );
}

export function ResultCards({ result }: ResultCardsProps) {
  const isWealthEligible = result.wealthGenTotal > 0;

  return (
    <motion.div initial="hidden" animate="show">
      {/* Financial returns */}
      <section className="bg-[var(--color-deep)] text-[var(--color-deep-ink)] px-5 py-5">
        <motion.div variants={rise} custom={0} className="flex items-baseline justify-between gap-3">
          <p className="text-sm text-[var(--color-deep-muted)]">Total financial benefit</p>
          <p className="text-[13px] text-[var(--color-deep-muted)] tabular">{result.yearsTimeline}-year horizon</p>
        </motion.div>
        <motion.p variants={rise} custom={1} className="display text-[2.25rem] leading-none mt-2 text-[#9BE3B9] tabular">
          <AnimatedNumber value={result.totalMoneyEarnedSaved} formatter={inr} />
        </motion.p>

        <div className="mt-4">
          <Row dark i={2} label="Luxury jewellery" note="14% savings per experience" value={<AnimatedNumber value={result.luxurySavingsTotal} formatter={inr} />} />
          <Row dark i={3} label="Lifestyle jewellery" note="7% savings per experience" value={<AnimatedNumber value={result.lifestyleSavingsTotal} formatter={inr} />} />
          <Row
            dark
            i={4}
            label="Wealth generated"
            note={isWealthEligible ? '25% dividend on every experience charge, at 5 experiences a year' : '25% dividend on every experience charge'}
            value={isWealthEligible ? <AnimatedNumber value={result.wealthGenTotal} formatter={inr} /> : 'Not eligible'}
            muted={!isWealthEligible}
          />
        </div>
      </section>

      {/* What the balance unlocks */}
      <section className="mt-6">
        <motion.h3 variants={rise} custom={5} className="font-medium text-[var(--color-ink)]">
          Exclusive ecosystem benefits
        </motion.h3>
        <motion.p variants={rise} custom={6} className="text-sm text-[var(--color-muted)] mt-1">
          LIMOVI vs traditional gold loans: access liquidity and luxury experiences without repayment stress or interest.
        </motion.p>

        <div className="mt-3">
          <Row i={7} label="Instant loans" note="75% LTV" value={formatINR(result.loanEligibility, true)} />
          <Row i={8} label="Instant liquidity" value={formatINR(result.currentValue)} />
          <Row i={9} label="Gift ecosystem" value={result.isGiftEligible ? 'Unlocked' : '50g or more required'} muted={!result.isGiftEligible} />
        </div>

        <ul className="mt-3 space-y-2.5">
          {VALUE_ADDED_BENEFITS.map((benefit, i) => (
            <motion.li key={i} variants={rise} custom={10 + i} className="flex gap-2.5 text-sm">
              <Check size={16} strokeWidth={2.5} className="text-emerald-700 shrink-0 mt-0.5" aria-hidden />
              <span>
                <span className="font-medium text-[var(--color-ink)]">{benefit.title}. </span>
                <span className="text-[var(--color-muted)]">{benefit.desc}</span>
              </span>
            </motion.li>
          ))}
        </ul>
      </section>
    </motion.div>
  );
}
