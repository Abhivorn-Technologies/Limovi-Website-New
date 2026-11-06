"use client";

import { useEffect, useRef, useState, type ReactNode, type CSSProperties } from "react";
import { motion, useInView, animate, useReducedMotion } from "framer-motion";

/** Rise-and-fade entrance, staggered by index. */
export function Reveal({
  children,
  i = 0,
  className,
  y = 28,
  as = "div",
}: {
  children: ReactNode;
  i?: number;
  className?: string;
  y?: number;
  as?: "div" | "li" | "article";
}) {
  const reduce = useReducedMotion();
  const Comp = motion[as];
  return (
    <Comp
      className={className}
      initial={reduce ? false : { opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "0px 0px -10% 0px" }}
      transition={{ duration: 0.8, delay: i * 0.08, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </Comp>
  );
}

export function Eyebrow({ children, light = false }: { children: ReactNode; light?: boolean }) {
  return (
    <span
      className={`inline-flex items-center gap-2 rounded-full px-3.5 py-1.5 text-[13px] font-bold uppercase tracking-[0.12em] ${
        light ? "bg-white/15 text-white" : "bg-lm-sky text-lm-blue"
      }`}
    >
      <span className={`h-1.5 w-1.5 rounded-full ${light ? "bg-lm-gold" : "bg-lm-blue"}`} aria-hidden />
      {children}
    </span>
  );
}

export function SectionHead({
  eyebrow,
  title,
  lead,
  center = false,
  light = false,
}: {
  eyebrow?: string;
  title: ReactNode;
  lead?: ReactNode;
  center?: boolean;
  light?: boolean;
}) {
  return (
    <div className={`${center ? "mx-auto text-center items-center" : ""} flex max-w-3xl flex-col gap-5`}>
      {eyebrow && (
        <Reveal>
          <Eyebrow light={light}>{eyebrow}</Eyebrow>
        </Reveal>
      )}
      <Reveal i={1}>
        <h2
          className={`display text-[clamp(1.85rem,1.2rem+2.2vw,3rem)] ${light ? "text-white" : "text-lm-navy"}`}
        >
          {title}
        </h2>
      </Reveal>
      {lead && (
        <Reveal i={2}>
          <p className={`text-[clamp(1.05rem,1rem+0.35vw,1.25rem)] leading-relaxed ${light ? "text-white/80" : "text-lm-muted"}`}>
            {lead}
          </p>
        </Reveal>
      )}
    </div>
  );
}

/** The logo's sunburst, drawn as rays around a circle. */
export function Rays({
  className,
  color = "currentColor",
  count = 36,
  hole = 30,
}: {
  className?: string;
  color?: string;
  count?: number;
  hole?: number;
}) {
  const rays = Array.from({ length: count }, (_, k) => {
    const a = (k / count) * Math.PI * 2;
    const w = (Math.PI / count) * 0.55;
    const r0 = hole;
    const r1 = 100;
    const p = (r: number, ang: number) => `${50 + (r / 2) * Math.cos(ang)},${50 + (r / 2) * Math.sin(ang)}`;
    return `M${p(r0, a - w * 0.4)} L${p(r1 * 1.5, a - w)} L${p(r1 * 1.5, a + w)} L${p(r0, a + w * 0.4)} Z`;
  });
  return (
    <svg viewBox="0 0 100 100" className={className} aria-hidden>
      {rays.map((d, k) => (
        <path key={k} d={d} fill={color} />
      ))}
    </svg>
  );
}

export function Coin({
  size = 64,
  label = "24K",
  className,
  style,
}: {
  size?: number;
  label?: string;
  className?: string;
  style?: CSSProperties;
}) {
  return (
    <div
      className={`lm-coin ${className ?? ""}`}
      style={{ width: size, height: size, fontSize: size * 0.24, ...style }}
      aria-hidden
    >
      <span
        className="grid place-items-center rounded-full"
        style={{
          width: size * 0.74,
          height: size * 0.74,
          border: `${Math.max(1, size * 0.03)}px solid rgba(138, 90, 0, 0.35)`,
        }}
      >
        {label}
      </span>
    </div>
  );
}

/** Number that counts up when it scrolls into view. */
export function CountUp({
  to,
  format = (n) => Math.round(n).toLocaleString("en-IN"),
  duration = 1.6,
  className,
}: {
  to: number;
  format?: (n: number) => string;
  duration?: number;
  className?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });
  const [val, setVal] = useState(0);
  useEffect(() => {
    if (!inView) return;
    const c = animate(0, to, { duration, ease: [0.16, 1, 0.3, 1], onUpdate: setVal });
    return () => c.stop();
  }, [inView, to, duration]);
  return (
    <span ref={ref} className={className}>
      {format(val)}
    </span>
  );
}

/** Smoothly tweens to a changing value (for calculators). */
export function Tween({ value, format }: { value: number; format: (n: number) => string }) {
  const [val, setVal] = useState(value);
  const prev = useRef(value);
  useEffect(() => {
    const c = animate(prev.current, value, {
      duration: 0.5,
      ease: "easeOut",
      onUpdate: (v) => {
        prev.current = v;
        setVal(v);
      },
    });
    return () => c.stop();
  }, [value]);
  return <>{format(val)}</>;
}

export function Phone({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <div
      className={`relative mx-auto w-[260px] sm:w-[280px] aspect-[9/18.5] rounded-[44px] bg-lm-navy p-[10px] shadow-[0_40px_80px_-30px_rgba(11,27,58,0.55)] ${className ?? ""}`}
    >
      <div className="absolute left-1/2 top-[18px] z-20 h-[22px] w-[84px] -translate-x-1/2 rounded-full bg-lm-navy" aria-hidden />
      <div className="relative h-full w-full overflow-hidden rounded-[36px] bg-white">{children}</div>
    </div>
  );
}

export function Stars({ n }: { n: number }) {
  return (
    <span className="inline-flex gap-1" aria-label={`${n} out of 5`}>
      {Array.from({ length: 5 }, (_, k) => (
        <span
          key={k}
          className={`h-2.5 w-6 rounded-full ${k < n ? "bg-lm-gold" : "bg-lm-sky-2"}`}
          aria-hidden
        />
      ))}
    </span>
  );
}
