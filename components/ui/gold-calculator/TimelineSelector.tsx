'use client';

import { motion } from 'framer-motion';

export type TimelineKey = '1Y' | '3Y' | '5Y' | '10Y';

export const TIMELINE_YEARS: Record<TimelineKey, number> = {
  '1Y': 1,
  '3Y': 3,
  '5Y': 5,
  '10Y': 10,
};

interface TimelineSelectorProps {
  selected: TimelineKey | null;
  onSelect: (key: TimelineKey | null) => void;
}

const PRESETS: { label: string; key: TimelineKey }[] = [
  { label: '1 year', key: '1Y' },
  { label: '3 years', key: '3Y' },
  { label: '5 years', key: '5Y' },
  { label: '10 years', key: '10Y' },
];

// A segmented control: the filled block slides to the chosen period
export function TimelineSelector({ selected, onSelect }: TimelineSelectorProps) {
  return (
    <div className="grid grid-cols-4 bg-[var(--color-surface)] p-1" role="group" aria-label="Investment timeline">
      {PRESETS.map((p) => {
        const active = selected === p.key;
        return (
          <button
            key={p.key}
            type="button"
            onClick={() => { active ? onSelect(null) : onSelect(p.key); }}
            aria-pressed={active}
            className="relative h-10 text-sm font-medium tabular"
          >
            {active && (
              <motion.span
                layoutId="gc-timeline"
                className="absolute inset-0 bg-[var(--color-accent)]"
                transition={{ type: 'spring', stiffness: 420, damping: 36 }}
              />
            )}
            <span className={`relative transition-colors ${active ? 'text-[var(--color-accent-ink)]' : 'text-[var(--color-muted)] hover:text-[var(--color-ink)]'}`}>
              {p.label}
            </span>
          </button>
        );
      })}
    </div>
  );
}
