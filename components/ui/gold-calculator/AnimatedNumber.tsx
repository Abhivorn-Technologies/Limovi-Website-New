'use client';

import { useEffect, useRef, useState } from 'react';

// Counts from the previous value to the new one, so changes read as movement rather than a jump
export function AnimatedNumber({
  value,
  formatter = (v) => new Intl.NumberFormat('en-IN').format(Math.round(Math.abs(v))),
  duration = 600,
}: {
  value: number;
  formatter?: (v: number) => string;
  duration?: number;
}) {
  const [displayed, setDisplayed] = useState(value);
  const from = useRef(value);
  const raf = useRef(0);

  useEffect(() => {
    const start = from.current;
    const t0 = performance.now();
    const step = (now: number) => {
      const p = Math.min((now - t0) / duration, 1);
      const e = 1 - Math.pow(1 - p, 4);
      const v = start + (value - start) * e;
      from.current = v;
      setDisplayed(v);
      if (p < 1) raf.current = requestAnimationFrame(step);
    };
    cancelAnimationFrame(raf.current);
    raf.current = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf.current);
  }, [value, duration]);

  return <>{formatter(displayed)}</>;
}
