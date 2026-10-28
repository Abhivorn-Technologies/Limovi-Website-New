'use client';

import { useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ENROL_MIN_GRAMS, ENROL_MAX_GRAMS, ENROL_DEFAULT_GRAMS, MIN_INVEST_GRAMS } from '@/lib/constants/strategyRules';

interface GramsSliderProps {
  value: number;
  onChange: (grams: number) => void;
}

const PRESETS = [50, 100, 200, 500];

export { ENROL_DEFAULT_GRAMS };

export function GramsSlider({ value, onChange }: GramsSliderProps) {
  const pct = ((value - ENROL_MIN_GRAMS) / (ENROL_MAX_GRAMS - ENROL_MIN_GRAMS)) * 100;

  const handleRange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => onChange(Number(e.target.value)),
    [onChange]
  );

  const handleInput = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const n = parseFloat(e.target.value.replace(/[^0-9.]/g, ''));
      if (!isNaN(n)) onChange(Math.min(ENROL_MAX_GRAMS, Math.max(ENROL_MIN_GRAMS, n)));
    },
    [onChange]
  );

  return (
    <div>
      {/* The amount, typed or dragged */}
      <label className="flex items-baseline gap-2 bg-[var(--color-surface)] px-4 py-3 focus-within:bg-[var(--color-tile)] transition-colors">
        <input
          type="text"
          inputMode="decimal"
          value={value}
          onChange={handleInput}
          className="display w-full bg-transparent outline-none text-[2rem] leading-none text-[var(--color-ink)] tabular"
          aria-label="Gold balance in grams"
        />
        <span className="font-medium text-[var(--color-muted)]">grams</span>
      </label>

      <div className="relative h-11 flex items-center mt-2">
        <div className="absolute inset-x-0 h-1.5 bg-[var(--color-surface-2)]" />
        <div className="absolute left-0 h-1.5 bg-[var(--color-ink)]" style={{ width: `${pct}%` }} />
        <input
          type="range"
          min={ENROL_MIN_GRAMS}
          max={ENROL_MAX_GRAMS}
          step={1}
          value={value}
          onChange={handleRange}
          className="peer absolute inset-0 w-full opacity-0 cursor-pointer z-10"
          aria-label="Gold balance grams slider"
        />
        <div
          className="absolute w-5 h-5 bg-[var(--color-accent)] pointer-events-none transition-transform duration-150 peer-active:scale-125 peer-focus-visible:outline peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-[var(--color-field)]"
          style={{ left: `calc(${pct}% - 10px)` }}
        />
      </div>

      <div className="flex items-center justify-between gap-3">
        <div className="flex gap-1" role="group" aria-label="Quick amounts">
          {PRESETS.map((g) => {
            const active = value === g;
            return (
              <button
                key={g}
                type="button"
                onClick={() => onChange(g)}
                aria-pressed={active}
                className={`h-9 px-3 text-sm font-medium tabular transition-colors duration-150 active:scale-95 ${
                  active ? 'bg-[var(--color-ink)] text-white' : 'bg-[var(--color-surface)] text-[var(--color-ink)] hover:bg-[var(--color-surface-2)]'
                }`}
              >
                {g}g
              </button>
            );
          })}
        </div>
        <span className="text-sm text-[var(--color-muted)] tabular shrink-0">
          {ENROL_MIN_GRAMS}–{ENROL_MAX_GRAMS}g
        </span>
      </div>

      {/* Minimum grams warning */}
      <AnimatePresence>
        {value < MIN_INVEST_GRAMS && (
          <motion.div
            key="min-warning"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden"
          >
            <div className="mt-3 flex items-center justify-between gap-3 bg-amber-50 px-4 py-3">
              <p className="text-sm text-amber-900">
                <span className="font-medium">Minimum {MIN_INVEST_GRAMS}g required.</span> {value}g is below the minimum gold balance.
              </p>
              <button
                type="button"
                onClick={() => onChange(MIN_INVEST_GRAMS)}
                className="shrink-0 h-9 px-3 text-sm font-medium bg-amber-900 text-white"
                aria-label={`Set to minimum ${MIN_INVEST_GRAMS}g`}
              >
                Set {MIN_INVEST_GRAMS}g
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
