'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { STRATEGIES, type StrategyKey } from '@/lib/constants/strategyRules';

interface StrategySelectorProps {
  selected: StrategyKey;
  onChange: (key: StrategyKey) => void;
}

export function StrategySelector({ selected, onChange }: StrategySelectorProps) {
  const current = STRATEGIES.find((s) => s.key === selected);
  const badge = current?.badge?.replace(/⭐\s*/, '');

  return (
    <div>
      <div className="grid grid-cols-2 gap-1" role="group" aria-label="Investment strategy">
        {STRATEGIES.map((s) => {
          const isActive = selected === s.key;
          return (
            <button
              key={s.key}
              id={`strategy-tab-${s.key}`}
              type="button"
              onClick={() => onChange(s.key)}
              aria-pressed={isActive}
              className="relative h-12 px-3 text-left text-sm font-medium transition-colors duration-200 active:scale-[0.98]"
            >
              {isActive && (
                <motion.span
                  layoutId="gc-strategy"
                  className="absolute inset-0 bg-[var(--color-ink)]"
                  transition={{ type: 'spring', stiffness: 420, damping: 36 }}
                />
              )}
              {!isActive && <span className="absolute inset-0 bg-[var(--color-surface)] hover:bg-[var(--color-surface-2)] transition-colors" />}
              <span className={`relative ${isActive ? 'text-white' : 'text-[var(--color-ink)]'}`}>{s.shortLabel}</span>
            </button>
          );
        })}
      </div>

      <AnimatePresence mode="wait">
        <motion.p
          key={selected}
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -4 }}
          transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
          className="mt-3 text-sm text-[var(--color-muted)] leading-relaxed"
        >
          {badge && <span className="font-medium text-[#8A6A0E]">{badge}. </span>}
          {current?.desc}
        </motion.p>
      </AnimatePresence>
    </div>
  );
}
