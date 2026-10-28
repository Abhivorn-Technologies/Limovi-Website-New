'use client';

import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { RefreshCw, X, AlertCircle } from 'lucide-react';

import { GramsSlider } from './GramsSlider';
import { TimelineSelector, type TimelineKey, TIMELINE_YEARS } from './TimelineSelector';
import { ResultCards } from './ResultCards';
import { StrategySelector } from './StrategySelector';
import { AnimatedNumber } from './AnimatedNumber';

import { JewelleryExperiencesSelector } from './JewelleryExperiencesSelector';
import {
  fetchGoldPrice,
  type GoldPriceData,
} from '@/lib/services/goldService';
import {
  calculateFutureProjection,
  type CalculationResult,
} from '@/lib/utils/calculator';
import type { StrategyKey } from '@/lib/constants/strategyRules';

const inr = (v: number) => `₹${new Intl.NumberFormat('en-IN').format(Math.round(Math.abs(v)))}`;

// ─── Skeleton ─────────────────────────────────────────────────────────────
function Skeleton({ className }: { className?: string }) {
  return <div className={`animate-pulse bg-[var(--color-surface-2)] ${className}`} />;
}

// ─── One step of the form ─────────────────────────────────────────────────
function Step({ title, i, children }: { title: string; i: number; children: React.ReactNode }) {
  return (
    <motion.section
      initial={{ opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.08 + i * 0.06, duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
    >
      <h3 className="font-medium text-[var(--color-ink)] mb-3">{title}</h3>
      {children}
    </motion.section>
  );
}

// ─── Main component ───────────────────────────────────────────────────────
interface GoldBalanceCalculatorProps {
  timeline: TimelineKey | null;
  setTimeline: (val: TimelineKey | null) => void;
  strategy: StrategyKey;
  setStrategy: (val: StrategyKey) => void;
  /** Unified grams input — used for ALL strategies that involve gold */
  enrolledGrams: number;
  setEnrolledGrams: (val: number) => void;
  onMinimize?: () => void;
}

export function GoldBalanceCalculator({
  timeline,
  setTimeline,
  strategy,
  setStrategy,
  enrolledGrams,
  setEnrolledGrams,
  onMinimize,
}: GoldBalanceCalculatorProps) {

  const [livePrice, setLivePrice] = useState<GoldPriceData | null>(null);
  const [result, setResult] = useState<CalculationResult | null>(null);

  const [priceLoading, setPriceLoading] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Experience counts per year (Section 6 of Blueprint Note 1)
  const [luxuryCount, setLuxuryCount] = useState(1);
  const [lifestyleCount, setLifestyleCount] = useState(1);

  // Derive years from timeline key (for future projection)
  const years = timeline ? (TIMELINE_YEARS[timeline] ?? 1) : 0;

  // ── Load live price
  const loadLivePrice = useCallback(async (forceRefresh = false) => {
    if (forceRefresh) setIsRefreshing(true);
    try {
      const p = await fetchGoldPrice(forceRefresh);
      setLivePrice(p);
      setError(null);
    } catch (e) {
      setError('Could not fetch live gold price. Showing demo data.');
      console.error(e);
    } finally {
      setPriceLoading(false);
      setIsRefreshing(false);
    }
  }, []);

  // ── Boot: load live price once, refresh every 5 min
  useEffect(() => {
    loadLivePrice();
    const iv = setInterval(() => loadLivePrice(), 5 * 60 * 1000);
    return () => clearInterval(iv);
  }, [loadLivePrice]);


  // ── Recalculate whenever any input or price changes
  useEffect(() => {
    if (!livePrice) return;

    const next = calculateFutureProjection({
      goldBalanceGrams: enrolledGrams,
      currentPricePerGram: livePrice.price,
      years,
      strategy,
      luxuryExperiencesPerYear: luxuryCount,
      lifestyleExperiencesPerYear: lifestyleCount,
    });
    setResult(next);
  }, [enrolledGrams, strategy, livePrice, years, luxuryCount, lifestyleCount]);

  const price = livePrice?.price ?? 14400;

  return (
    <div className="flex flex-col flex-1 min-h-0 bg-white text-[var(--color-ink)]">

      {/* ── HEADER ────────────────────────────────────────────────────── */}
      <div className="flex-shrink-0 px-5 pt-5 pb-4">
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0">
            <h2 className="display text-xl leading-tight">ROI calculator</h2>
            <p className="text-sm text-[var(--color-muted)] mt-1">
              Estimate your returns using live 24K gold prices.
            </p>
          </div>
          <div className="flex gap-1 shrink-0">
            <button
              onClick={() => loadLivePrice(true)}
              className="w-10 h-10 flex items-center justify-center bg-[var(--color-surface)] hover:bg-[var(--color-surface-2)] transition-colors active:scale-90"
              aria-label="Refresh gold price"
              title="Refresh live price"
            >
              <RefreshCw size={16} className={isRefreshing ? 'animate-spin' : ''} />
            </button>
            <button
              onClick={onMinimize}
              className="w-10 h-10 flex items-center justify-center bg-[var(--color-surface)] hover:bg-[var(--color-surface-2)] transition-colors active:scale-90"
              aria-label="Close calculator"
            >
              <X size={18} />
            </button>
          </div>
        </div>

        {/* Live price */}
        <div className="mt-4 flex items-center justify-between gap-3 bg-[var(--color-surface)] px-4 py-3">
          <span className="flex items-center gap-2 text-sm text-[var(--color-muted)]">
            <span className={`w-2 h-2 ${livePrice?.isLive ? 'bg-emerald-600' : 'bg-amber-500'}`} aria-hidden />
            24K gold, {livePrice?.isLive ? 'live' : 'demo'} price
          </span>
          {priceLoading ? (
            <Skeleton className="h-5 w-24" />
          ) : (
            <span className="font-medium tabular">
              <AnimatedNumber value={price} formatter={inr} />
              <span className="text-sm text-[var(--color-muted)] font-normal"> / gram</span>
            </span>
          )}
        </div>

        <AnimatePresence>
          {error && (
            <motion.p
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="mt-2 flex items-center gap-2 text-sm text-amber-900 overflow-hidden"
            >
              <AlertCircle size={15} className="shrink-0" />
              {error}
            </motion.p>
          )}
        </AnimatePresence>
      </div>

      {/* ── SCROLLABLE BODY ────────────────────────────────────────────── */}
      <div
        className="flex-1 overflow-y-auto overscroll-contain px-5 pb-6 space-y-7"
        style={{ scrollbarWidth: 'thin' }}
        data-lenis-prevent="true"
      >
        <Step title="Gold balance" i={0}>
          <GramsSlider value={enrolledGrams} onChange={setEnrolledGrams} />
          <p className="text-sm text-[var(--color-muted)] mt-3">
            Investment required{' '}
            <span className="font-medium text-[var(--color-ink)] tabular">
              <AnimatedNumber value={enrolledGrams * price} formatter={inr} />
            </span>
          </p>
        </Step>

        <Step title="Investment strategy" i={1}>
          <StrategySelector selected={strategy} onChange={setStrategy} />
        </Step>

        <Step title="Projection period" i={2}>
          <TimelineSelector selected={timeline} onSelect={setTimeline} />
        </Step>

        <Step title="Jewellery experiences per year" i={3}>
          <JewelleryExperiencesSelector
            luxuryCount={luxuryCount}
            setLuxuryCount={setLuxuryCount}
            lifestyleCount={lifestyleCount}
            setLifestyleCount={setLifestyleCount}
          />
        </Step>

        {/* ── RESULT ─────────────────────────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.32, duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="flex items-baseline justify-between gap-3 pb-4">
            <div>
              <p className="text-sm text-[var(--color-muted)]">Gold balance value</p>
              {priceLoading ? (
                <Skeleton className="h-9 w-40 mt-1" />
              ) : (
                <p className="display text-[2rem] leading-tight tabular">
                  <AnimatedNumber value={result?.currentValue ?? 0} formatter={inr} />
                </p>
              )}
            </div>
            <p className="text-sm text-[var(--color-muted)] tabular shrink-0">{enrolledGrams.toFixed(2)} g</p>
          </div>

          {priceLoading ? (
            <Skeleton className="h-56 w-full" />
          ) : result ? (
            <ResultCards result={result} strategy={strategy} enrolledGrams={enrolledGrams} />
          ) : null}
        </motion.div>
      </div>
    </div>
  );
}
