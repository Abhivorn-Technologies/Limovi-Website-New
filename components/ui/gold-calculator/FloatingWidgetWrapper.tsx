'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useDragControls } from 'framer-motion';
import { Calculator } from 'lucide-react';
import { GoldBalanceCalculator } from './GoldBalanceCalculator';
import type { TimelineKey } from './TimelineSelector';
import type { StrategyKey } from '@/lib/constants/strategyRules';
import { ENROL_DEFAULT_GRAMS } from './GramsSlider';

const SESSION_KEY = 'limovi_gc_minimized';

function useIsMobile() {
  const [mobile, setMobile] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia('(max-width: 640px)');
    setMobile(mq.matches);
    const handler = (e: MediaQueryListEvent) => setMobile(e.matches);
    mq.addEventListener('change', handler);
    return () => mq.removeEventListener('change', handler);
  }, []);
  return mobile;
}

export function FloatingWidgetWrapper() {
  const [minimized, setMinimized] = useState(true);
  const [mounted, setMounted] = useState(false);
  const constraintsRef = useRef<HTMLDivElement>(null);
  const dragControls = useDragControls();
  const isMobile = useIsMobile();

  // Shared state to remember inputs when minimized / maximized
  const [timeline, setTimeline] = useState<TimelineKey | null>('3Y');
  const [strategy, setStrategy] = useState<StrategyKey>('investment_experience');
  const [enrolledGrams, setEnrolledGrams] = useState(ENROL_DEFAULT_GRAMS);

  useEffect(() => {
    const saved = sessionStorage.getItem(SESSION_KEY);
    if (saved !== null) {
      setMinimized(saved === 'true');
    } else {
      setMinimized(true);
    }
    setMounted(true);

    const handleCustomOpen = () => {
      setMinimized(false);
      sessionStorage.setItem(SESSION_KEY, 'false');
    };
    window.addEventListener('open-limovi-roi-calculator', handleCustomOpen);
    return () => window.removeEventListener('open-limovi-roi-calculator', handleCustomOpen);
  }, []);

  const minimize = () => {
    setMinimized(true);
    sessionStorage.setItem(SESSION_KEY, 'true');
  };

  const open = () => {
    setMinimized(false);
    sessionStorage.setItem(SESSION_KEY, 'false');
  };

  if (!mounted) return null;

  return (
    <>
      {/* Drag-constraint viewport (invisible) */}
      <div ref={constraintsRef} className="fixed inset-0 pointer-events-none z-[9989]" aria-hidden />

      {/* ── FAB (minimized state) ─────────────────────────────────────── */}
      <AnimatePresence>
        {minimized && (
          <motion.button
            key="fab"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 16, transition: { duration: 0.15 } }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            onClick={open}
            className="group fixed z-[9999] flex items-center gap-2.5 h-12 px-3.5 sm:px-4 bg-[var(--color-accent)] text-[var(--color-accent-ink)] font-medium cursor-pointer select-none shadow-[0_12px_30px_rgba(10,25,41,0.22)] hover:bg-[#E2BE45] transition-colors active:scale-95"
            style={isMobile ? { bottom: 84, right: 24 } : { bottom: 88, right: 24 }}
            aria-label="Open LIMOVI ROI Calculator"
          >
            <Calculator size={20} className="transition-transform duration-300 group-hover:-rotate-12" />
            <span className="hidden sm:inline">ROI calculator</span>
          </motion.button>
        )}
      </AnimatePresence>

      {/* ── CALCULATOR CARD ───────────────────────────────────────────── */}
      <AnimatePresence>
        {!minimized && (
          <>
            {/* Mobile: bottom sheet with backdrop */}
            {isMobile && (
              <motion.div
                key="mobile-backdrop"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 z-[9990] bg-[rgba(7,17,31,0.45)]"
                onClick={minimize}
              />
            )}

            <motion.div
              key="calculator"
              drag={!isMobile}
              dragListener={false}
              dragControls={dragControls}
              dragConstraints={!isMobile ? constraintsRef : undefined}
              dragElastic={0.04}
              dragMomentum={false}
              // Desktop: rises in at bottom-right. Mobile: slides up as a sheet
              initial={isMobile ? { y: '100%' } : { opacity: 0, y: 24 }}
              animate={isMobile ? { y: 0 } : { opacity: 1, y: 0 }}
              exit={isMobile ? { y: '100%', transition: { duration: 0.25 } } : { opacity: 0, y: 16, transition: { duration: 0.18 } }}
              transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
              role="dialog"
              aria-label="LIMOVI ROI Calculator"
              aria-modal="false"
              className="fixed z-[9999] flex flex-col overflow-hidden bg-white shadow-[0_24px_70px_rgba(10,25,41,0.28)]"
              style={
                isMobile
                  ? { bottom: 0, left: 0, right: 0, maxHeight: '92dvh' }
                  : { bottom: 24, right: 24, width: 'clamp(380px, 30vw, 440px)', maxHeight: 'calc(100dvh - 100px)' }
              }
            >
              {/* Top drag handle */}
              <div
                className="flex-shrink-0 flex items-center justify-center pt-2.5 cursor-grab active:cursor-grabbing"
                onPointerDown={(e) => {
                  if (!isMobile) dragControls.start(e);
                }}
                style={{ touchAction: 'none' }}
              >
                <div className="w-10 h-1 bg-[var(--color-surface-2)]" />
              </div>

              <GoldBalanceCalculator
                timeline={timeline}
                setTimeline={setTimeline}
                strategy={strategy}
                setStrategy={setStrategy}
                enrolledGrams={enrolledGrams}
                setEnrolledGrams={setEnrolledGrams}
                onMinimize={minimize}
              />
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
