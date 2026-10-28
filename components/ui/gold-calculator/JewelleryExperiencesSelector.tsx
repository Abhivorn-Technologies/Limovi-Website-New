'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { Minus, Plus } from 'lucide-react';

interface JewelleryExperiencesSelectorProps {
  luxuryCount: number;
  setLuxuryCount: (val: number) => void;
  lifestyleCount: number;
  setLifestyleCount: (val: number) => void;
}

const MIN = 1;
const MAX = 10;

function Stepper({ label, note, value, onChange }: { label: string; note: string; value: number; onChange: (n: number) => void }) {
  return (
    <div className="flex items-center justify-between gap-4 py-3">
      <div className="min-w-0">
        <p className="font-medium text-[var(--color-ink)]">{label}</p>
        <p className="text-sm text-[var(--color-muted)]">{note}</p>
      </div>
      <div className="flex items-center shrink-0 bg-[var(--color-surface)]">
        <button
          type="button"
          onClick={() => onChange(Math.max(MIN, value - 1))}
          disabled={value <= MIN}
          className="w-10 h-10 flex items-center justify-center text-[var(--color-ink)] hover:bg-[var(--color-surface-2)] disabled:opacity-30 transition-colors active:scale-90"
          aria-label={`Fewer ${label} experiences`}
        >
          <Minus size={16} />
        </button>
        <span className="relative w-9 h-10 overflow-hidden flex items-center justify-center" aria-live="polite">
          <AnimatePresence mode="popLayout" initial={false}>
            <motion.span
              key={value}
              initial={{ y: 14, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -14, opacity: 0 }}
              transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
              className="absolute font-medium tabular text-[var(--color-ink)]"
            >
              {value}
            </motion.span>
          </AnimatePresence>
        </span>
        <button
          type="button"
          onClick={() => onChange(Math.min(MAX, value + 1))}
          disabled={value >= MAX}
          className="w-10 h-10 flex items-center justify-center text-[var(--color-ink)] hover:bg-[var(--color-surface-2)] disabled:opacity-30 transition-colors active:scale-90"
          aria-label={`More ${label} experiences`}
        >
          <Plus size={16} />
        </button>
      </div>
    </div>
  );
}

export function JewelleryExperiencesSelector({
  luxuryCount,
  setLuxuryCount,
  lifestyleCount,
  setLifestyleCount,
}: JewelleryExperiencesSelectorProps) {
  return (
    <div className="-my-1">
      <Stepper label="Luxury jewellery" note="Save 14% per experience" value={luxuryCount} onChange={setLuxuryCount} />
      <Stepper label="Lifestyle jewellery" note="Save 7% per experience" value={lifestyleCount} onChange={setLifestyleCount} />
    </div>
  );
}
